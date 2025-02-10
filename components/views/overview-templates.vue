<template lang="pug">
.overview-templates
  .limit-container.flex.flex-col
    .title-row.flex.justify-between.items-end.gap-6
      h2.section-title.section-grad-title Ready-to-Use Templates for Any Project
      nuxt-link(
        to="/templates"
      )
        el-button(
          type="default"
          size="large"
        ) Find your ideal template now

  .templates-list.flex
    .mask-layer
      .left-mask
      .right-mask
      .bottom-mask

    .template-card(
      v-for="template in templates"
      :class="template.type === 'placeholder' ? 'is-placeholder' : 'is-card'"
    )
      nuxt-link(
        v-if="template.path"
        :to="template.path"
      )
        nuxt-icon.text-40px.mb-4( :name="template.icon" filled)

        .name-row.flex.justify-between.items-center
          .name {{ template.name }}
          nuxt-icon.text-24px( name="ArrowRightBig2" filled)

</template>

<script setup lang="ts">
const templates = [
  {
    type: 'placeholder',
  },
  {
    name: 'Digital Planner',
    icon: 'template-digital-planner',
    path: '/templates/category-digital-planner',
  },
  {
    name: 'Story Board',
    icon: 'template-story-board',
    path: '/templates/category-storyboard-template',
  },
  {
    name: 'Cornell Notes',
    icon: 'template-cornell-notes',
    path: '/templates/category-cornell-notes-template',
  },
  {
    name: 'One Pager',
    icon: 'template-one-pager',
    path: '/templates/category-one-pager-template-free',
  },
  {
    type: 'placeholder'
  },

  {
    type: 'placeholder'
  },
  {
    name: 'Checklist',
    icon: 'template-checkbox',
    path: '/templates/category-checklist-template',
  },
  {
    name: 'Vision Board',
    icon: 'template-pen',
    path: '/templates/category-vision-board-template',
  },
  {
    name: 'Itinerary template',
    icon: 'template-itinerary',
    path: '/templates/category-free-travel-itinerary-template',
  },
  {
    type: 'placeholder'
  },
  {
    type: 'placeholder'
  },

  {
    type: 'placeholder'
  },
  {
    type: 'placeholder'
  },
  {
    type: 'placeholder'
  },
  {
    type: 'placeholder'
  },
  {
    type: 'placeholder'
  },
  {
    type: 'placeholder'
  },
]
</script>

<style lang="stylus">
.overview-templates
  padding-top: fv(40, 60)

  .templates-list
    gap: 30px
    width: 1590px
    margin: 0 auto
    margin-top: fv(36, 48)
    flex-wrap: wrap
    position relative

    @media $mediaInMiddleScreen
      width: 980px
      justify-content: flex-start
      padding: 0 fv(20, 32)

    @media (max-width: 830px)
      width: 100%
      gap: 24px
      flex-direction: column
      padding-bottom: 40px

    .mask-layer
      position absolute
      z-index 2
      min-width: 1440px
      width: 100%
      height 100%
      pointer-events none

      @media $mediaInMiddleScreen
        display none

      .left-mask
        position absolute
        width: 150px
        left: 0
        height: 100%
        background: linear-gradient(270deg, rgba(248, 248, 247, 0) 0%, #F8F8F7 100%);

      .right-mask
        position absolute
        width: 150px
        right: 0
        height: 100%
        background: linear-gradient(270deg,  #F8F8F7 0%, rgba(248, 248, 247, 0) 100%);

      .bottom-mask
        width: 100%
        position absolute
        height: 126px
        bottom: 0
        background: linear-gradient(to bottom, rgba(248, 248, 247, 0) 0%, #F8F8F7 100%);

  .template-card
    flex: 0
    height: 144px
    min-width: 240px

    @media $mediaInMobile
      width: 100%

    &.is-card
      background: #FFFFFF;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      transition: 218ms

      &:hover
        background: rgba(0, 0, 0, 0.04);

    &.is-placeholder
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;

      @media $mediaInMiddleScreen
        display: none

    a
      display: flex
      flex-direction: column
      height 100%
      padding: 32px

    .name
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      letter-spacing: -0.02em;
      color: #000000;

  .title-row
    @media $mediaInSmallScreen
      flex-direction: column
      align-items: flex-start

  .section-title
    text-align: left
    letter-spacing: -0.05em;
    line-height: 1.2
    max-width: 700px
    font-size: fv(32, 60)
</style>
