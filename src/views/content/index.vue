<template>
  <div class="content-list">
    <div class="list-item" v-for="blog in blogList" :key="blog.id" @click="toDetail(blog)">
      <blog-brief :blog="blog"/>
    </div>
  </div>
</template>

<script>
import { blogList } from '@/mockData/blogMock'
import blogBrief from '@/components/blogBrief'
export default {
  name: 'blogList',
  components: {
    blogBrief
  },
  data () {
    return {
      blogList
    }
  },
  methods: {
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
  .list-item {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
