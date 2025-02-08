<template lang="pug">
.teamhub-compare-pricing
  .limit-container
    h2.subsection-title.headline-5.max-w-500px Simple, Transparent Pricing for Every Team
    p.subsection-desc.para-base.max-w-500px Whether you choose Cloud or Self-Hosted, the features are the same — only the hosting differs.

    .pricing-list.flex.gap-4
      .pricing-card.pricing-cloud
        .cover-part
        .upper-part
          h3.card-title.headline-2 Cloud Version
          .card-desc Pay per user/month with a free trial to get started
        nuxt-link.card-action( to="/pricing?type=cloud#table" ) See Detailed Pricing

      .pricing-card.pricing-selfhosted
        .cover-part
        .upper-part
          h3.card-title.headline-2 Self Hosted
          .card-desc Pay per user/month with a free trial to get started
        nuxt-link.card-action( to="/pricing?type=selfhost#table" ) See Detailed Pricing
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.teamhub-compare-pricing
  padding: fv(30, 70) 0

  .pricing-list
    @media $mediaInMobile
      flex-direction: column

  .pricing-card
    display: flex
    flex-direction: column

    flex: 1
    padding: 24px
    padding-top: 0
    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    min-height: 360px

    .cover-part
      background-repeat: no-repeat
      width: 100%
      height: 225px
      position relative
      margin-bottom: 16px

      &:after
        content: ''
        position absolute
        bottom: 0
        width: 100%
        height: 40px
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)

    .card-title
      margin-bottom: 4px
      margin-top: 0

    .list-item
      list-style: none
      margin-bottom: 8px
      display: flex
      align-items: center

      &:before
        content: ' '
        display: flex
        width: 6px
        height: 6px
        border-radius: 50%
        background-color: brand()
        margin-right: 8px

    .card-action
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.02em;
      color: brand()
      margin-top: 16px

      &:hover
        color: brand(80)

  .pricing-cloud
    .cover-part
      background-image: url(/teamhub/pricing-cloud.png);
      background-position: center top;
      background-size: 680px 225px

  .pricing-selfhosted
    .cover-part
      background-image: url(/teamhub/pricing-selfhosted.png);
      background-position: center top;
      background-size: 680px 225px
</style>
