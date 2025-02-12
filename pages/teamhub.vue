<template lang="pug">
.page.page-teamhub

  teamhub-hero

  teamhub-teamwork

  teamhub-compare-pricing

  teamhub-question-and-answers

  teamhub-transform-collaboration

  download-banner
</template>

<script lang="ts" setup>
useHead({
  title: 'Affine Team Edition: Seamless Collaboration on Documents and Whiteboards',
  meta: [
    {
      name: 'description',
      content: 'Affine for Teams enables your group to easily communicate on papers and whiteboards. Unite your ideas, streamline operations, and improve teamwork.',
    },
  ],
})
</script>

<style lang="stylus">
.page.page-teamhub
  .subsection-title
    margin-bottom: fv(32, 48)

    & + .subsection-desc
      margin-top: s('calc(-1 * %s)', fv(16, 32))

  .subsection-desc
    margin-bottom: 32px
</style>
