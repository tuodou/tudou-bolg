<template>
  <div class="slide">
    <div class="search">
      <input type="text" placeholder="请输入搜索内容" />
      <i></i>
    </div>
    <div class="about-auth slide-item">
      <p class="title">关于土豆</p>
      <img src="https://ccdn.goodq.top/caches/12b950de0b6f318cc63ff1bd6f5cb577/aHR0cHM6Ly81NWM5YjFhNDQ4Yzg0LnQ3My5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMTUvMDgvYWFlYWJlMTcwNzFiNGJjMDE2MGQwODBiZmIwNmRkZDcuanBn.jpg">
      <p class="introduction">
        成功的秘诀，在永不改变既定的目的。
      </p>
    </div>
    <div class="recent slide-item">
      <p class="title">最新文章</p>
      <div class="recent-item" v-for="blog in blogList" :key="blog.id" @click="toDetail(blog)">
        <div class="img">
          <img :src="blog.img">
        </div>
        <div class="blog-info">
          <p class="blog-title">{{blog.title}}</p>
          <p class="time">发布日期：{{blog.cTime | formateTime}}</p>
        </div>
      </div>
    </div>
    <div class="others slide-item">
      <p class="title">每日三句</p>
      <div v-for="(sentence, index) in dailySentence" :key="index">
        <p class="sentence-text">{{sentence.text}}</p>
        <p class="sentence-auth"> —— {{sentence.auth}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { sentences } from "../../mockData/blogMock";
import { getRecentArticalApi } from "@/api/blog"
export default {
  name: 'slide',
  data () {
    return {
      blogList: [],
      sentences
    }
  },
  created () {
    this.getRecent()
  },
  computed: {
    dailySentence () {
      return this.sentences.filter(() => Math.random() > 0.5).slice(0, 3)
    }
  },
  methods: {
    getRecent () {
      getRecentArticalApi({}).then(res => {
        this.blogList = res
      }).catch(err => {
        console.log(err)
      })
    },
    toDetail (blog) {
      this.$router.push({
        name: 'detail',
        query: {
          id: blog.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
