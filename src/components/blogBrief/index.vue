<template>
  <div class="blog-item">
    <img :src="blog.img" :alt="blog.title">
    <div class="item-content">
      <p class="title">{{blog.title}}</p>
      <p class="publish-time">发布日期：{{blog.publishTime}}</p>
      <p class="brief">{{blog.brief}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogBrief',
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
