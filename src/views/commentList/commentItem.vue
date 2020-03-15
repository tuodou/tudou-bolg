<template>
  <div :class="['comment-item', {'sub-comment': comment.parentId}]">
    <img class="user-logo" :src="comment.userLogo || defaultLogo"/>
    <div class="comment-wrapper">
      <div class="content">
        <div class="user-name">
          <span class="cur-name">{{comment.userName}}</span>
          <span class="reply-title" v-show="comment.parentId">回复</span>
          <span class="reply-name" v-show="comment.parentId">@{{comment.parentName}}</span>
        </div>
        <div class="content-text">{{comment.content}}</div>
      </div>
      <div class="info">
        <div class="info-time">{{comment.createTime | formateTime}}</div>
        <div class="info-icon-wrapper"><i class="icon like-icon" @click="like($event, comment)" />{{comment.likeNum || ''}}</div>
        <div class="info-icon-wrapper"><i class="icon hate-icon" @click="hate($event, comment)" />{{comment.hateNum || ''}}</div>
        <div class="reply-btn" @click="toReplyComment(comment)">回复</div>
      </div>
      <div class="reply-box" v-if="activeComment.commentId === comment.commentId">
        <textarea
          class="reply-input"
          :placeholder="`回复：@${comment.userName}`"
          rows="3"
          v-model="replyComment"/>
        <div class="operation-btn">
          <div class="btn submit" @click="submitComment">发表评论</div>
          <div class="btn cancel" @click="cancelComment">取消</div>
        </div>
      </div>
      <template v-if="comment.children && comment.children.length">
        <comment-item
          v-for="subComment in comment.children"
          :key="subComment.commentId"
          :comment="subComment"/>
      </template>
    </div>
  </div>
</template>

<script>
import { createCommentServer, likeCommentServer, hateCommentServer } from '@/api/comment'
export default {
  name: 'commentItem',
  props: {
    articalId: {
      type: [String, Number],
      default: 0
    },
    comment: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      defaultLogo: require('@/assets/images/default_user_logo.png'),
      showReply: true,
      activeComment: {},
      replyComment: ''
    }
  },
  methods: {
    /**
    * @function 点击回复
    * @params {String} commentId 回复的评论id
    */
    toReplyComment (comment) {
      this.activeComment = comment
    },
    /**
    * @function 提交评论
    */
    submitComment () {
      console.log('submit comment', this.activeComment, this.replyComment)
      if (!this.replyComment) return
      createCommentServer({
        articalId: this.articalId,
        parentId: this.activeComment.commentId,
        parendName: this.activeComment.userName,
        content: this.replyComment
      }).then(res => {
        this.$emit('commentChange')
        this.cancelComment()
      })
    },
    like (e, comment) {
      console.log(e.target.classList)
      let addNum = 1
      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active')
        addNum = -1
      } else {
        e.target.classList.add('active')
      }
      comment.likeNum += addNum
      likeCommentServer({ commentId: comment.commentId, addNum })
    },
    hate (e, comment) {
      let addNum = 1
      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active')
        addNum = -1
      } else {
        e.target.classList.add('active')
      }
      comment.hateNum += addNum
      hateCommentServer({ commentId: comment.commentId, addNum }).then(res => {
        this.$emit('commentChange')
      })
    },
    /**
    * @function 取消评论
    */
    cancelComment () {
      this.activeComment = {}
      this.replyComment = ''
    }
  }
}
</script>
<style lang="less" scoped>
@import './commentItem';
</style>
