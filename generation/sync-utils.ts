import fs from "fs-extra";
import path from "node:path";
import { rootDir } from "./utils";
import { WorkspacePage, WorkspacePageContent } from "affine-reader/blog";

export async function loadContents<Dir extends 'blog' | 'templates' | 'templates-v2'>(dir: Dir) {
  try {
    const existingBlogMetas = new Map<string, Dir extends 'blog' ? WorkspacePageContent : TemplateContentFileMeta>();
    const files = await fs.readdir(path.join(rootDir, "content", dir));
    for (const file of files) {
      const content = await fs.readJson(path.join(rootDir, "content", dir, file), "utf8");
      existingBlogMetas.set(content.id, content);
    }
    return existingBlogMetas;
  } catch {
    return new Map<string, Dir extends 'blog' ? WorkspacePageContent : TemplateContentFileMeta>();
  }
}

export async function loadPageMetas(): Promise<WorkspacePage[]> {
  try {
    const pageMetas = await fs.readJson(path.join(rootDir, "content", "page-metas.json"), "utf8");
    return pageMetas;
  } catch {
    return [];
  }
}

export async function savePageMetas(pageMetas: WorkspacePage[]) {
  await fs.writeJson(path.join(rootDir, "content", "page-metas.json"), pageMetas, {
    spaces: "  ",
    encoding: "utf8",
  });
}

export async function loadTemplateMetas(): Promise<({
  templates: WorkspacePage[];
} & WorkspacePage)[]> {
  try {
    const templateMetas = await fs.readJson(path.join(rootDir, "content", "template-metas.json"), "utf8");
    return templateMetas;
  } catch {
    return [];
  }
}

export async function saveTemplateMetas(templateMetas: ({
  templates: WorkspacePage[];
} & WorkspacePage)[]) {
  await fs.writeJson(path.join(rootDir, "content", "template-metas.json"), templateMetas, {
    spaces: "  ",
    encoding: "utf8",
  });
}
