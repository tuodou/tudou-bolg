<template>
  <div class="blog-root">
   <blog-content />
   <div class="reply-box">
      <textarea
        class="reply-input"
        placeholder="请自觉遵守互联网相关的政策法规，严禁发色情、暴力、反动的言论。"
        rows="3"
        v-model="commentContent"/>
      <div class="operation-btn">
        <div class="btn submit" @click="submitComment">发表评论</div>
        <div class="btn cancel" @click="cancelComment">取消</div>
      </div>
    </div>
   <comment-list :commentList="comment" @commentChange="getComment"/>
  </div>
</template>

<script>
import blogContent from '@/views/content'
import commentList from '@/views/commentList'

import { getCommentServer, createCommentServer } from '@/api/comment'
export default {
  name: 'app',
  components: {
    blogContent,
    commentList
  },
  data () {
    return {
      commentContent: '',
      comment: []
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    getComment () {
      getCommentServer({}).then(res => {
        this.comment = res.list
      })
    },
    submitComment () {
      console.log('submit comment:', this.commentContent)
      if (!this.commentContent) return
      createCommentServer({
        content: this.commentContent
      }).then(res => {
        alert('发表评论成功')
      })
      this.cancelComment()
    },
    cancelComment () {
      this.commentContent = ''
    }
  }
}
</script>

<style lang="less" scoped>
.reply-box {
  .reply-input {
    width: 100%;
    padding: 5px 10px;
  }
  .operation-btn {
    display: flex;
    align-items: center;
    height: 26px;
    margin: 5px 0 10px 0;
    line-height: 26px;
    font-size: 12px;
    .btn {
      box-sizing: content-box;
      height: 100%;
      padding: 0 4px;
      line-height: 26px;
      color: #00a1d6;
      border: 1px solid #00a1d6;
      border-radius: 4px;
      cursor: pointer;
      &:first-child {
        margin-right: 20px;
      }
      &:hover {
        background: #e5e9ef;
      }
    }
  }
}
</style>
