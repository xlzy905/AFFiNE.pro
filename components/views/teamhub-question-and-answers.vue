<template lang="pug">
.teamhub-question-and-answers
  .limit-container
    h2.subsection-title.headline-5.max-w-700px Question & Answers
    el-collapse.teamhub-qna-collapse
      el-collapse-item(
        v-for="item in qnaList"
        :key="item.question"
        :name="item.question"
      )
        template(#title)
          h3.item-question
            | {{ item.question }}
        p.item-answer(
          v-html="item.answer"
        )
</template>

<script setup lang="ts">
const activeNames = ref()

type QnAItem = {
  question: string
  answer: string
}

const qnaList: QnAItem[] = [
  {
    question: 'What’s the difference between Cloud and Self-Hosted?',
    answer: 'The Cloud Version is fully managed by Affine, offering easy setup, automatic updates, and secure storage. The Self-Hosted Version gives you full control over hosting and data security, allowing for customization and compliance with your team’s requirements. For more information,please check out the <a href="/pricing">Pricing Page</a>.'
  },
  {
    question: 'Are the features the same in both versions?',
    answer: `Yes! Both the Cloud and Self-Hosted versions offer the same features, including Page Docs, Edgeless Whiteboard, and collaborative tools—only the hosting and data management differ.`
  },
  {
    question: 'Can I switch between Cloud and Self-Hosted versions?',
    answer: `Yes, you can migrate between the two versions, though some setup may be required for the Self-Hosted version. Our team can help you with this transition.`
  },
  {
    question: 'Is there a free trial available for the Cloud Version?',
    answer: `Yes, the Cloud Version offers a free trial so you can explore all features and determine if it’s the right fit for your team.`
  },
  {
    question: 'How is my data handled in the Cloud Version?',
    answer: `In the Cloud Version, your data is securely stored on Affine’s servers, with encryption and robust security protocols in place.`
  },
  {
    question: 'Do you offer support for both versions?',
    answer: `Yes, we provide expert support for both the Cloud and Self-Hosted versions, as well as community support through Discord, GitHub, and the Affine online community.`
  },
]
</script>

<style lang="stylus">
.teamhub-question-and-answers
  .teamhub-qna-collapse
    background: #FFFFFF
    border: 1px solid #E3E2E4
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15)
    border-radius: 16px
    overflow hidden
    --el-collapse-header-height: 56px
    --el-collapse-border-color: #E3E2E4

    .el-collapse-item__arrow
      transform: rotate(90deg);

    .el-collapse-item__arrow.is-active
      transform: rotate(-90deg);

    .el-collapse-item
      border-bottom: 1px solid var(--el-collapse-border-color)

      &.is-active
        .el-collapse-item__header
          transition: 0ms

      &:not(.is-active):hover
        .el-collapse-item__header
          background: #f9f9f9

      &__header
        padding: 16px 34px 14px 24px
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #424149 !important
        border: none !important
        height: auto
        transition: 318ms
        position: relative
        z-index 2
        text-align: left

      &__wrap
        border: none !important
        position relative
        top: -8px

      &__content
        padding: 0 24px 10px
        font-size: 16px;
        line-height: 24px;
        color: #8E8D91;
        position relative
        z-index 3

        a
         color: var(--brand)

         &:hover
           text-decoration: underline

      &__arrow
        position relative
        right: -10px
        margin-right: 0
        color: #77757D
        font-weight: 400
        path
          stroke-width: 20px
          stroke: currentColor

    .item-question
      font-weight: 500
      font-family: Inter, sans-serif
      font-size: inherit
      line-height: inherit
      letter-spacing: inherit
      color: inherit
      margin: 0

    .item-answer
      white-space: pre-line
      margin: 0
</style>
