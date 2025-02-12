<template lang="pug">
.teamhub-teamwork
  .limit-container
    h2.subsection-title.headline-5.max-w-500px.text-center Teamwork Simplified: Cloud or Self-Managed AFFiNE

    .teamwork-list.flex
      .teamwork-card(
        v-for="(teamwork, i) in teamworks"
        :key="teamwork.label"
        :class="[`card-${i}`]"
      )
        .teamwork-cover(
          :style="{ backgroundImage: `url(${teamwork.cover})` }"
        )
        .content-wrapper
          .teamwork-label {{ teamwork.label }}
          h3.teamwork-title.headline-2 {{ teamwork.title }}
</template>

<script setup lang="ts">
const teamworks = [
  {
    cover: '/teamhub/teamwork-page.png',
    title: 'Streamline content creation and document sharing',
    label: 'page docs'
  },
  {
    cover: '/teamhub/teamwork-edgeless.png',
    title: 'Brainstorm and plan on a limitless canvas',
    label: 'edgeless'
  },
  {
    cover: '/teamhub/teamwork-database.png',
    title: 'Organize, track, and manage team data effortlessly',
    label: 'database'
  },
  {
    cover: '/teamhub/teamwork-journal.png',
    title: 'Keep project updates and reflections all in one place',
    label: 'journal'
  },
]
</script>

<style lang="stylus">
.teamhub-teamwork
  padding-top: fv(70, 150)
  padding-bottom: fv(30, 50)

  .subsection-title
    margin-left: auto
    margin-right: auto

  .teamwork-list
    gap: 16px
    flex-wrap: wrap

    @media (max-width: 900px)
      flex-direction: column
      align-items: center

  .teamwork-card
    display: flex
    flex-direction: column
    background: #FFFFFF
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15)
    border-radius: 16px
    flex: 1 0 40%
    overflow: hidden
    max-width: 530px

    @media $mediaInMobile
      &.card-0
        .teamwork-cover
          background-image: url(/teamhub/teamwork-page-mobile.png) !important

      &.card-2,
      &.card-3
        .teamwork-cover
          background-position: left

    .content-wrapper
      padding: 18px fv(24, 28) 24px fv(24, 28)

    .teamwork-cover
      background-size: cover
      background-position: center
      width: 100%
      height: 225px

    .teamwork-title
      color: #000
      max-width: 430px
      margin: 0
      font-size: fv(20, 24)

    .teamwork-label
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #8E8D91;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      padding: 2px 4px;
      display: inline-flex;
      margin-bottom: 8px

</style>
