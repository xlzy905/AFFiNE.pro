<template lang="pug">
.product-navbar
  nuxt-link.nav-sub-item.flex.gap-3.mb-2px(
    :class="[ `item-${item.icon}` ]"
    :key="item.link"
    :to="item.link"
    @click="onClick"
    v-for="item in navItems"
  )
    nuxt-icon(
      :name="item.icon"
    )
    .text-part
      .item-name.mb-2px {{ item.name }}
      .item-desc {{ item.desc }}
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

const props = defineProps<{
  onClick?: () => void
}>()

const navItems = [
  {
    name: 'AFFiNE AI',
    desc: 'Your AI Partner Helps You Better',
    icon: 'AI-blue',
    link: '/ai'
  },
]
</script>

<style lang="stylus">
.product-navbar

  .nav-sub-item
    padding: 6px 12px
    border-radius: 4px
    transition: 218ms

    &:last-child
      @media $mediaInMobile
        margin-bottom: 8px

    .item-name,
    .item-desc
      font-size: fluid-value(14, 14)
      font-weight: 500
      line-height: 1.5

    .item-name
      letter-spacing: (-0.2/14em)
      color: #000000

    .item-desc
      line-height: 22px
      color: var(--Black-Tertiary, #8E8D91);
      font-weight: 400

    .nuxt-icon
      font-size: fluid-value(20, 24)
      color: #77757D99
      transition: 218ms

    &:hover
      background: var(--black-04, rgba(0, 0, 0, 0.04))

  .item-AI-blue
    .nuxt-icon
      color: #1E96EB

</style>
