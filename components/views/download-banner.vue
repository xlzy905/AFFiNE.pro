<template lang="pug">
.download-banner
  .limit-container
    .blue-card
      .flex.gap-4.content-row
        .left-part.flex.flex-col.justify-start
          h2.section-title.text-left Write Smarter, Work Better with AFFiNE
          p.section-desc Explore the features today, collaborate tomorrow.
          track-link.download-handler(
            to="/download"
            action="Button"
            :params="{ resolve: 'Download App', placement: 'DownloadBanner' }"
          )
            el-button(size="large") Download App
        .right-part
          .cover-img.cover
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.download-banner
  padding-top: fluid-value(40, 60)
  padding-bottom: fluid-value(60, 100)

  .blue-card
    min-height: 370px;
    color: white;
    background: brand();
    border-radius: 12px;
    padding: fv(32, 49)
    overflow hidden

  .content-row
    gap: 42px

    @media (max-width: 1023px)
      flex-direction: column

  .left-part
    flex: 435

  .right-part
    flex: 510
    min-height: fv(200, 321)
    position relative

    .cover
      position absolute
      top: 8px
      border-radius: 12px
      background-image: url('/download/hello-cover.png')
      aspect-ratio: 2520/1630
      width: fv(500, 930)

  .section-title
    font-weight: 500;
    font-size: fv(30, 48)
    line-height: 119%;
    letter-spacing: -0.04em;
    color: #FFFFFF;

  .section-desc
    margin: fv(8, 8) 0;
    font-size: 16px;
    line-height: 24px;

  .section-title,
  .section-desc
    text-align: left

  .download-handler
    margin-top: 16px

    .el-button
      min-width: 213px
      color: brand()
      border-color: white

      &:hover
        background: rgba(255, 255, 255, 0.9)
        border-color: rgba(255, 255, 255, 0.9)
</style>
