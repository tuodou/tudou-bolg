<template>
  <div class="add">
    <div class="blog-info">
      <p class="title item">
        文章标题：<input type="text" placeholder="请输入文章标题" v-model="blog.title"/>
      </p>
      <p class="classify item">
        文章分类：<input type="text" placeholder="请输入文章分类" v-model="blog.classify"/>
      </p>
      <p class="auth item">
        文章作者：<input type="text" placeholder="请输入文章作者" v-model="blog.auth"/>
      </p>
      <p class="brief item">
        文章简介：<textarea type="text" style="width: 700px;" rows="7" maxlength="300" placeholder="请输入文章简介" v-model="blog.brief" />
      </p>
      <div class="blog-img item">
        封面图片：<input type="file" multiple="multiple" accept="image/*" @change="uploadImage($event.target.files[0])"/>
        <div class="img">
          <img v-if="blog.img" :src="blog.img">
        </div>
      </div>
      <div class="common-btn active" style="margin: 20px 0;" @click="submitBlog">提交</div>
    </div>
    <mavon-editor
      placeholder="是时候写一篇博客了"
      v-model="blog.detail"
      ref="md"
      @imgAdd="addImage"
      @imgDel="delImage"
    ></mavon-editor>
    <div class="common-btn active" style="margin: 20px 0;" @click="submitBlog">提交</div>
  </div>
</template>

<script>
import { uploadImage } from '@/untils/upload'
import { addArticalApi, updateArticalApi, getArticalDetailApi } from '@/api/blog'
export default {
  name: 'addBlog',
  data () {
    return {
      isEdit: false,
      blog: {
        title: '',
        img: '',
        auth: '',
        brief: '',
        classify: '',
        detail: ''
      }
    }
  },
  created () {
    this.initBlog()
  },
  beforeRouteLeave (to, from, next) {
    console.log(to, from)
    if (this.isEdit && to.name === 'detail') {
      to.query.id = this.id
    }
    next()
  },
  methods: {
    initBlog () {
      let id = this.$route.query.id
      if (id) {
        this.isEdit = true
        this.id = +id
        getArticalDetailApi({id}).then(res => {
          this.blog = res
        }).catch(err => {
          console.log(err)
        })
      }
    },
    submitBlog () {
      let api = this.isEdit ? updateArticalApi : addArticalApi
      api(this.blog).then(res => {
        console.log(res)
        if (this.isEdit) {
          this.$router.back()
        } else {
          this.blog = {
            title: '',
            img: '',
            auth: '',
            brief: '',
            classify: '',
            detail: ''
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addImage (pos, file) {
      uploadImage(file, 'blog_content_image', promise => {
        promise.then(res => {
          this.$refs.md.$img2Url(pos, res.path)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    delImage (pos) {
      console.log(pos)
    },
    uploadImage (img) {
      uploadImage(img, 'blog_img', promise => {
        promise.then(res => {
          this.blog.img = res.path
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './addBlog.less';
</style>
