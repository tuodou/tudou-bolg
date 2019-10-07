<template>
  <div class="blog-item">
    <div class="img">
      <img :src="blog.img" :alt="blog.title">
    </div>
    <div class="item-content">
      <p class="title">{{blog.title}}</p>
      <p class="publish-time">发布日期：{{blog.cTime | formateTime}}</p>
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
