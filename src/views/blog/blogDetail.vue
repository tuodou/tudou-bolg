<template>
  <div class="detail">
    <div class="blog-header">
      <div class="blog-info">
        <p class="title">{{blog.title}}</p>
        <div class="others-info">
          <span class="publish-time margin-right-64">发布日期：{{blog.cTime | formateTime}}</span>
          <span class="read-times margin-right-64">阅读次数：{{blog.views}}</span>
          <span class="classify margin-right-64">分类：{{blog.classify}}</span>
          <div class="share">
            <span>分享到：</span>
            <img src="../../assets/images/wechat_icon.png">
            <img @click="shareToSina" src="../../assets/images/weibo_icon.png">
            <img src="../../assets/images/qq_icon.png">
          </div>
        </div>
        <img class="blog-img" :src="blog.img">
      </div>
      <span class="back" @click="backToList">返回</span>
    </div>
    <mavon-editor
      placeholder="这是一篇没有内容的博客，作者有点懒。。。"
      :editable="false"
      :subfield="false"
      :defaultOpen="'preview'"
      :boxShadow="false"
      :toolbarsFlag="false"
      :value="blog.detail"></mavon-editor>
      <!--<div class="common-btn active" @click="toEditArtical">修改</div>-->
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
    <comment-list :articalId="blog.id" :commentList="comment" @commentChange="getComment"/>
  </div>
</template>

<script>
import commentList from '../commentList'
import { getArticalDetailApi } from '@/api/blog'
import { getCommentServer, createCommentServer } from '@/api/comment'

export default {
  name: 'blogDetail',
  components: {
    commentList
  },
  data () {
    return {
      id: 1,
      comment: [],
      commentContent: '',
      blog: {
        title: '',
        img: '',
        detail: '',
        classify: ''
      }
    }
  },
  created() {
    this.id = +(this.$route.query.id || 1)
    this.getBlogDetail()
    this.getComment()
  },
  methods: {
    getBlogDetail () {
      getArticalDetailApi({ id: this.id }).then(res => {
        this.blog = res
      }).catch(err => {
        console.log(err)
      })
    },
    getComment () {
      console.log('get comment list')
      getCommentServer({ articalId: this.id }).then(res => {
        this.comment = res.list
      })
    },
    submitComment () {
      console.log('submit comment:', this.commentContent)
      if (!this.commentContent) return
      createCommentServer({
        articalId: this.id,
        content: this.commentContent
      }).then(res => {
        this.getComment()
        this.cancelComment()
      })
    },
    cancelComment () {
      this.commentContent = ''
    },
    backToList () {
      this.$router.back()
    },
    shareToSina () {
      window.open('http://service.weibo.com/share/share.php?url='+document.location.href+'?sharesource=weibo&title='+this.blog.title+'&pic='+this.blog.img+'&appkey=2706825840')
    },
    toEditArtical () {
      this.$router.push({
        name: 'addBlog',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './blogDetail.less';
</style>
