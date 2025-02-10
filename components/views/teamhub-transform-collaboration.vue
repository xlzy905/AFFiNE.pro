<template lang="pug">
.teamhub-transform-collaboration
  .limit-container
    h2.subsection-title.headline-5.max-w-700px Ready to Transform Your Team Collaboration?

    .collaboration-list.flex.gap-4
      .collaboration-card.collaboration-cloud
        .upper-part
          h3.card-title.headline-2 Cloud
          .card-list
            .para-base.list-item Real-time Collaboration
            .para-base.list-item Data Backups
            .para-base.list-item Scalability
        nuxt-link.card-action( :to="PATH.LOGIN" target="_blank") Start with Cloud for Free

      .collaboration-card.collaboration-selfhosted
        .upper-part
          h3.card-title.headline-2 Self Hosted
          .card-list
            .para-base.list-item Data Security
            .para-base.list-item Data Backups
            .para-base.list-item Scalability
        nuxt-link.card-action( to="https://docs.affine.pro/docs/self-host-affine" target="_blank" ref="nofollow" ) Explore Self-Hosting Options
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants';
</script>

<style lang="stylus">
.teamhub-transform-collaboration
  padding: fv(30, 70) 0

  .collaboration-list
    @media $mediaInMobile
      flex-direction: column

  .collaboration-card
    display: flex
    flex-direction: column
    justify-content: space-between

    flex: 1
    padding: 24px
    background: #FFFFFF;
    background-repeat: no-repeat
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    min-height: 263px

    .card-title
      margin-bottom: 8px
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

      &:hover
        color: brand(80)

  .collaboration-cloud
    background-image: url(/teamhub/collaboration-cloud.png);
    background-position: right top;
    background-size: 355px 225px

  .collaboration-selfhosted
    background-image: url(/teamhub/collaboration-selfhosted.png);
    background-position: right top;
    background-size: 362px 225px
</style>
