import { instantiateReader } from "affine-reader/template-v2";
import fs from "fs-extra";
import stringify from "json-stable-stringify";
import path from "node:path";

import { createHash } from "node:crypto";

import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { rootDir } from "./utils";
import { loadContents, loadPageMetas, savePageMetas } from "./sync-utils";

const reader = instantiateReader({
  workspaceId: "qf73AF6vzWphbTJdN7KiX",
  target: "https://app.affine.pro",
  blogBasePath: '/template'
});

const R2_BUCKET = "affine-cdn";
const R2_PREFIX = "template-snapshots";

const uploadTemplateSnapshot = (() => {
  const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  let existingSnapshots: string[] | undefined;

  return async function upload(key: string, buffer: Buffer) {
    if (!process.env.R2_ACCESS_KEY_ID) {
      return;
    }
    if (!existingSnapshots) {
      const c0 = new ListObjectsV2Command({
        Bucket: R2_BUCKET,
        Prefix: R2_PREFIX,
      });
      const response = await r2.send(c0);
      existingSnapshots = response.Contents?.map((c) =>
        c.Key?.replace(R2_PREFIX + "/", "")
      ).filter((k) => k !== undefined) as string[];
      console.log("existingSnapshots", existingSnapshots);
    }
    console.log("key", key);

    if (existingSnapshots.includes(key + ".zip")) {
      return;
    }

    const c1 = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: `${R2_PREFIX}/${key}.zip`,
      Body: buffer,
      ContentType: "application/zip",
    });
    await r2.send(c1);
  };
})();

async function crawlTemplates() {
  const processed = new Map<string, { slug: string; title: string }>();
  const pages = await reader.getDocPageMetas();

  if (!pages) {
    throw new Error("No pages found");
  }

  const existingPageMetas = await loadPageMetas();
  const existingTemplates = await loadContents('templates-v2');

  const visitedSlugs = new Set<string>();

  await fs.ensureDir(path.join(rootDir, "public", "templates", "snapshots"));

  console.log("crawling categories...");

  const categories = await reader.getCategoryList();

  if (!categories) {
    throw new Error("No categories found");
  }

  for (const [categoryIndex, categoryPage] of categories.categoryPages.entries()) {
    const category = await reader.getCategory(categoryPage.id);

    if (!category) {
      console.log(`no category for ${categoryPage.id}`);
      continue;
    }

    for (const [index, templatePage] of category.pages.entries()) {
      // skip refetch template if it is not updated
      const featured = index === 0;
      const oldExistingTemplate = existingTemplates.get(templatePage.id);
      const oldUserTemplateMeta = existingPageMetas.find(
        (meta) => meta.id === oldExistingTemplate?.templateId
      );

      // @ts-ignore
      let newTemplate: TemplateContentFileMeta = {
        ...oldExistingTemplate,
        index,
        featured,
        intro: featured ? category.description : undefined,
        cateTitle: category.title,
        cateName: category.name,
        cateSlug: category.name.toLowerCase().replaceAll(" ", "-"),
        cateIndex: categoryIndex,
      };

      if (newTemplate.updatedDate !== templatePage.updatedDate) {
        const template = await reader.getTemplate(templatePage.id);
        if (!template) {
          console.log(`no template for ${templatePage.id}`);
        } else {
          Object.assign(newTemplate, template);
        }
      }

      if (!newTemplate.slug) {
        console.log(`no slug for ${newTemplate.id}`);
        continue;
      }

      const userTemplateMeta = pages.find(
        (meta) => meta.id === newTemplate.templateId
      );

      // @ts-ignore
      delete newTemplate.properties;
      // @ts-ignore
      delete newTemplate.parsedBlocks;
      // @ts-ignore
      delete newTemplate.linkedPages;

      if (oldUserTemplateMeta?.updatedDate !== userTemplateMeta?.updatedDate || newTemplate.templateId !== oldUserTemplateMeta?.id) {
        const zip = await reader.getDocSnapshot(newTemplate.templateId);
        if (!zip) {
          console.log(`no snapshot for ${newTemplate.templateId}`);
          continue;
        }
        const buffer = Buffer.from(await zip.arrayBuffer());
        const hash = createHash("sha256")
          .update(newTemplate.updatedDate?.toString() || "")
          .digest("hex")
          .slice(0, 8);
        console.log(`uploading ${newTemplate.templateId}.${hash} to ${R2_BUCKET}`);
        await uploadTemplateSnapshot(`${newTemplate.templateId}.${hash}`, buffer);
        const snapshotUrl = `https://cdn.affine.pro/${R2_PREFIX}/${newTemplate.templateId}.${hash}.zip`;

        const params = new URLSearchParams({
          workspaceId: reader.workspaceId,
          docId: newTemplate.templateId,
          pageId: newTemplate.id, // deprecated
          name: newTemplate.title || newTemplate.id,
          mode: newTemplate.templateMode || "page",
          snapshotUrl,
        });

        newTemplate.slug = newTemplate.slug.replaceAll("/", "");
        processed.set(newTemplate.templateId, {
          slug: newTemplate.slug,
          title: newTemplate.title || "",
        });

        newTemplate = {
          ...newTemplate,
          useTemplateUrl: `https://app.affine.pro/template/import?${params.toString()}`,
          previewUrl: `https://app.affine.pro/template/preview?${params.toString()}`,
        };
      }
      await fs.ensureDir(path.join(rootDir, "content", "templates-v2"));
      await fs.writeFile(
        path.join(rootDir, "content", "templates-v2", `${newTemplate.slug}.json`),
        stringify(newTemplate, { space: "  " })
      );
      visitedSlugs.add(newTemplate.slug!);
      console.log(`saved ${newTemplate.slug}`);
    }
  }

  // check if there are duplicate slugs
  const reversedProcessed = Array.from(processed.entries()).reduce(
    (acc, [id, meta]) => {
      acc[meta.slug] ??= [];
      acc[meta.slug].push({ title: meta.title, id });
      return acc;
    },
    {} as Record<string, { title: string; id: string }[]>
  );

  let hasDuplicate = false;

  for (const [slug, metas] of Object.entries(reversedProcessed)) {
    if (metas.length > 1) {
      console.log(
        `Duplicate slug: ${slug} - ${metas
          .map((m) => `${m.title} (${m.id})`)
          .join(", ")}`
      );
      hasDuplicate = true;
    }
  }

  if (hasDuplicate) {
    throw new Error("Duplicate slugs found");
  }

  for (const [id, meta] of existingTemplates.entries()) {
    if (meta.slug && !visitedSlugs.has(meta.slug)) {
      console.log(`Deleting ${meta.title} (${id})`);
      await fs.unlink(path.join(rootDir, "content", "templates-v2", meta.slug.replaceAll("/", "") + ".json"));
    }
  }

  await savePageMetas(pages);
}

async function main() {
  const start = Date.now();
  console.log("Sync Template Start");
  await crawlTemplates();
  console.log(`Sync Template Done in ${Date.now() - start}ms`);
  process.exit(0);
}

main();
