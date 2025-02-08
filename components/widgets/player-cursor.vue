<template lang="pug">
.player-cursor(
  ref="$el"
  :style="{ '--stroke': stroke, '--fill': fill }"
)
  .suspend-layer
    icon-player-arrow(
      v-if="arrow"
      :class="`dir-${arrow}`"
    )
    .player-name {{ name }}
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string,
  text?: string,
  stroke?: string,
  fill: string,
  arrow?: 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom',
}>(), {
})

const $el = ref()
</script>

<style lang="stylus">
.player-cursor
  display: inline-flex
  position relative
  z-index 10
  user-select none

  .player-name
    display: inline-flex
    align-items: center
    padding: 2px 8px
    background: var(--fill)
    white-space: pre;
    background-clip: border-box;
    background-origin: border-box;
    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    min-height: 25px;
    color: white;
    font-size: 15.0857px;
    line-height: 1;
    letter-spacing: -0.02em;
    box-shadow: 0px 1.16667px 7px rgba(0, 0, 0, 0.16);

  .icon-player-arrow
    filter: drop-shadow(0px 2.33333px 4.66667px rgba(0, 0, 0, 0.2));
    position absolute

    &.dir-left-top
      transform: translate3d(-70%, -90%, 0);
      left: 0
      top: 0

    &.dir-right-bottom
      transform: rotate(165.39deg) translate3d(-60%, -98%, 0);
      right: 0
      bottom: 0

</style>
