<template>
  <div id="app">
    <div class="nav">
      <img class="blog-icon" src="./assets/images/sign.jpg">
      <div class="blog-title">
        <p>土豆的博客</p>
        <p>dove tom</p>
      </div>
      <div class="router-link"></div>
    </div>
    <div class="content">
      <div class="content-main">
        <router-view></router-view>
      </div>
      <div class="content-slide" v-if="!$route.meta.hideSlide">
        <slide />
      </div>
    </div>
    <div class="footer">
      <p class="footer-content">永远相信边上的人比自己聪明</p>
      <p class="copy-right">Copyright © 浙ICP备19019129号</p>
    </div>
  </div>
</template>

<script>
import slide from '@/views/slide'
export default {
  name: 'App',
  components: {
    slide
  }
}
</script>

<style lang="less" scoped>
#app {
  overflow: hidden;
  max-width: 1180px;
  min-width: 750px;
  margin: 20px auto;
  background: #fff;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    border-bottom: 1px solid #e5e5e5;
    .blog-icon {
      height: 70px;
      margin: 15px 0;
    }
    .blog-title {
      margin-left: 15px;
      p:first-child {
        font-weight: bold;
        font-size: 20px;
      }
      p:last-child {
        text-align: justify;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .router-link {
      flex: 1;
    }
  }
  .content {
    display: flex;
    width: 100%;
    padding: 20px 40px;
    &-main {
      flex: 1;
      max-width: 100%;
      margin-right: 20px;
    }
    &-slide {
      width: 260px;
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 128px;
    font-size: 16px;
    color: #fff;
    background: #474747;
    &-content {
      margin-bottom: 15px;
      font-size: 20px;
    }
  }
}
</style>
