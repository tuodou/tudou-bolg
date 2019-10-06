<template>
  <div class="content-list">
    <div class="list-item" v-for="blog in blogList" :key="blog.id" @click="toDetail(blog)">
      <blog-brief :blog="blog"/>
    </div>
    <p class="no-more" v-if="noMore">更多内容正在补充中 ......</p>
    <div class="page">
      <span class="page-control" :class="pageData.page === 1 ? '' : 'active'" @click="skipPage(-1)">上一页</span>
      <span class="page-control" :class="noMore ? '' : 'active'" @click="skipPage(1)">下一页</span>
    </div>
  </div>
</template>

<script>
// import { blogList } from '@/mockData/blogMock'
import blogBrief from '@/components/blogBrief'
import { getArticalListApi } from '@/api/blog'
export default {
  name: 'blogList',
  components: {
    blogBrief
  },
  data () {
    return {
      blogList: [],
      noMore: false,
      pageData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getArticalListApi(this.pageData).then(res => {
        console.log('------', res)
        this.blogList = res.data
        this.noMore = res.data.length < this.pageData.pageSize
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
    },
    skipPage (no) {
      if (no < 0 && this.pageData.page === 1) {
        return
      }
      if (no > 0 && this.noMore) {
        return
      }
      this.pageData.page = this.pageData.page + no
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.content-list {
  position: relative;
  height: 100%;
  padding-bottom: 64px;
  .list-item {
    padding: 30px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .no-more {
    margin: 20px 0;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
  .page {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 46px;
    .page-control {
      width: 76px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #e5e5e5;
      border-radius: 4px;
      cursor: pointer;
    }
    .active {
      background: #ffe800;
      &:active {
        background: #999;
      }
    }
  }
}
</style>
