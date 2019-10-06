<template>
  <div class="add">
    <div class="blog-info">
      <p class="title">
        文章标题：<input type="text" placeholder="请输入文章标题" v-model="blog.title"/>
      </p>
      <p class="classify">
        文章分类：<input type="text" placeholder="请输入文章分类" v-model="blog.classify"/>
      </p>
      <p class="auth">
        文章作者：<input type="text" placeholder="请输入文章作者" v-model="blog.auth"/>
      </p>
      <p class="brief">
        文章简介：<textarea type="text" placeholder="请输入文章简介" v-model="blog.brief" />
      </p>
      <p class="blog-img">
        封面图片：<input type="file" multiple="multiple" accept="image/*" @change="uploadImage($event.target.files[0])"/>
        <img v-if="blog.img" :src="blog.img">
      </p>
      <button class="submit" @click="submitBlog">提交</button>
    </div>
    <mavon-editor
      placeholder="是时候写一篇博客了"
      v-model="blog.detail"
      ref="md"
      @imgAdd="addImage"
      @imgDel="delImage"
    ></mavon-editor>
    <button class="submit" @click="submitBlog">提交</button>
  </div>
</template>

<script>
import { uploadImage } from '@/untils/upload'
import { addArtical } from '@/api/blog'
export default {
  name: 'addBlog',
  data () {
    return {
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
  methods: {
    submitBlog () {
      addArtical(this.blog).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    addImage (pos, file) {
      uploadImage(file, 'blog_content_image', promise => {
        promise.then(res => {
          this.$refs.md.$img2Url(pos, res.data.path)
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
          this.blog.img = res.data.path
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
