<template>
  <div class="add">
    <div class="blog-info">
      <p class="title">
        文章标题：<input type="text" placeholder="请输入文章标题" v-model="blog.title">
      </p>
      <p class="classify">
        文章分类：<input type="text" placeholder="请输入文章分类" v-model="blog.classify.classifyName">
      </p>
      <button class="submit" @click="submitBlog">提交</button>
    </div>
    <mavon-editor
    placeholder="是时候写一篇博客了"
    v-model="blog.detail"></mavon-editor>
    <button class="submit" @click="submitBlog">提交</button>
  </div>
</template>

<script>
export default {
  name: 'addBlog',
  data () {
    return {
      blog: {
        title: '',
        classify: {},
        detail: ''
      }
    }
  },
  methods: {
    submitBlog () {
      console.log(this.blog)
    }
  }
}
</script>

<style lang="less" scoped>
@import './addBlog.less';
</style>
