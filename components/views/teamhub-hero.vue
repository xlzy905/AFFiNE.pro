<template lang="pug">
.teamwork-hero
  .limit-container.relative
    .flex.flex-col.items-center
      h1.hero-title.flex.flex-col.items-center
        .line-1 &nbsp;AFFiNE for&nbsp;
        .line-2
          span.inline-teams
            | teams
            .teams-avatars
          | &nbsp;and&nbsp;
          span.inline-more
            span.more-text more
            client-only
              .more-bg.pre-enter
                .more-end-cursor
                player-cursor.enther-cursor( name="Enther" fill="#1e96eb" )
      p.hero-desc Collaborate seamlessly with AFFiNE Team, available in Cloud and Self-Hosted versions
      team-entry-button( placement="landing_page" size="large" )
    client-only
      .cursors-layer(  :class="{ 'need-anim': !$device.isMobile }" )
        player-cursor.marketing-cursor( name="Marketing team" fill="#7B61FF" arrow="right-bottom" )
        player-cursor.development-cursor( name="Development team" fill="#FF8A00" arrow="left-top" )
    .hero-cover
</template>

<script setup lang="ts">
import gsap from 'gsap'

const $device = useDevice();
let controlTl: gsap.core.Timeline

const setupAnimation = () => {
  if ($device.isMobile) return

  const timelineOptions = { paused: true, defaults: { duration: 1 }}
  const marketingCursorTl = gsap.timeline(timelineOptions)
  const developmentCursorTl = gsap.timeline(timelineOptions)
  const moreBgTl = gsap.timeline(timelineOptions)
  controlTl = gsap.timeline(timelineOptions)

  marketingCursorTl
    .fromTo('.marketing-cursor', {
      x: -100,
      y: -50
    }, {
      x: 0,
      y: 0,
      duration: 0.5
    })
    .fromTo('.marketing-cursor .icon-player-arrow', {
      opacity: 0,
    }, {
      opacity: 1,
    }, '<')
    .fromTo('.marketing-cursor .player-name', {
      scale: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      transformOrigin: 'right bottom'
    }, '<0.2')

    developmentCursorTl
      .fromTo('.development-cursor', {
        x: 100,
        y: 50
      }, {
        x: 0,
        y: 0,
        duration: 0.5
      })
      .fromTo('.development-cursor .icon-player-arrow', {
        opacity: 0,
      }, {
        opacity: 1,
      }, '<')
      .fromTo('.development-cursor .player-name', {
        scale: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        transformOrigin: 'left top'
      }, '<0.2')

  moreBgTl
    .fromTo('.more-bg', {
      opacity: 0,
      // width: '0'
    }, {
      opacity: 1,
      width: '100%'
    })

  controlTl
    .to(moreBgTl, { progress: 1, duration: 0.5, ease: 'linear' })
    .to(marketingCursorTl, { progress: 1, duration: 0.7, ease: 'linear' }, '<0.3')
    .to(developmentCursorTl, { progress: 1, duration: 0.7, ease: 'linear' }, '<0.2')

  controlTl.play()
}

onActivated(() => {
  setTimeout(() => {
    setupAnimation()
  }, 500)
})

onDeactivated(() => {
  if (controlTl) {
    controlTl.progress(0)
    controlTl.paused(true)
  }
})
</script>

<style lang="stylus">
.teamwork-hero
  padding-top: 60px

  .cursors-layer
    position absolute
    top: -80px
    height: fv(280, 320)
    width: 100%
    max-width: 1050px
    min-width: 540px
    left: 50%
    transform: translateX(-50%)
    pointer-events none

    @media (max-width: 385px)
      height: 215px

    &.need-anim
      .icon-player-arrow,
      .player-name
        opacity 0

    .suspend-layer
      animation: anim-suspend var(--duration, 3s) ease-in-out infinite

    .player-cursor
      position absolute
      @media $mediaInMobile
        transform: scale(0.8)

    .marketing-cursor
      top: 50px
      left: fv(20, 40)
      --suspend-x: 5%

    .development-cursor
      right: 0
      bottom: 0
      --suspend-x: 5%

      .suspend-layer
        animation-delay: -1s

  .hero-title
    font-weight: 500;
    max-width: 830px
    font-size: fv(40, 90);
    line-height: (70/90);
    text-align: center;
    letter-spacing: -0.05em;
    color: #000000;
    margin: 0
    margin-bottom: 16px

    @media $mediaInMobile
      line-height: 1;

    ::selection
      background: transparent
      color: brand()

    .inline-teams
      display: inline-block
      align-items: flex-end
      color: brand()

    .teams-avatars
      display: inline-flex
      margin-left: 0.2em
      margin-right: -0.05em
      margin-bottom: -0.065em
      width 1.5em
      aspect-ratio: 278/128
      background-image: url('/teamhub/teams-avatars.png')
      background-size: contain

    .inline-more
      display: inline-flex
      position relative

      .more-text
        position relative
        z-index 2

      .more-bg
        background: brand(10)
        position absolute
        width: 100%
        height: 78%
        bottom: 0

        &.pre-enter
          opacity 0

      .enther-cursor
        position absolute
        right: 2px
        top: 4px
        transform: translate3d(100%, -100%, 0)

        @media $mediaInMobile
          display: none

      .more-end-cursor
        --width: 0.04em
        position absolute
        right: calc(-1 * var(--width))
        width: var(--width)
        height: 100%
        background: brand()
        // animation: blinking 1.2s linear infinite

  .hero-desc
    font-weight: 500;
    font-size: fv(16, 20);
    line-height: 1.35;
    text-align: center;
    letter-spacing: -0.02em;
    color: #424149;
    max-width: 550px
    margin: 0
    margin-bottom: fv(0, 36)

  .hero-cover
    margin-top: 50px
    width: 100%
    background-size: contain
    background-image: url('/teamhub/household-management.png')
    aspect-ratio: 2160/1320
    box-shadow: 1px 18px 39px 0px rgba(0, 0, 0, 0.15), 5px 71px 71px 0px rgba(0, 0, 0, 0.09), 12px 160px 96px 0px rgba(0, 0, 0, 0.05), 20px 284px 114px 0px rgba(0, 0, 0, 0.01), 32px 443px 124px 0px rgba(0, 0, 0, 0.00)
    border-radius: 8px
</style>
