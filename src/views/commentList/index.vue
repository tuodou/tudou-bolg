<template>
  <div class="comment">
    <div class="comment-item-wrapper" v-for="comment in commentList" :key="comment.commentId">
      <comment-item :articalId="articalId" :comment="comment" @commentChange="$emit('commentChange')"/>
    </div>
  </div>
</template>

<script>
import commentItem from "./commentItem"
export default {
  name: 'commentList',
  components: {
    commentItem
  },
  props: {
    articalId: {
      type: [String, Number],
      default: ''
    },
    commentList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      name: 'comment list'
    }
  }
}
</script>
<style lang="less" scoped>
.comment-item-wrapper {
  padding: 10px 0;
  border-bottom: 1px solid #e5e9ef;
  &:last-child {
    border-bottom: none;
  }
}
</style>
