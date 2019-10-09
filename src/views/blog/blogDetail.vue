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
            <img src="../../assets/images/weibo_icon.png">
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
      <!--<div class="common-btn active" @click="tiEditArtical">修改</div>-->
  </div>
</template>

<script>
// import { getBlogDetailApi } from '@/mockData/blogMock'
import { getArticalDetailApi } from '@/api/blog'
export default {
  name: 'blogDetail',
  data () {
    return {
      id: 1,
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
  },
  methods: {
    getBlogDetail () {
      getArticalDetailApi({ id: this.id }).then(res => {
        this.blog = res
      }).catch(err => {
        console.log(err)
      })
    },
    backToList () {
      this.$router.back()
    },
    tiEditArtical () {
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
