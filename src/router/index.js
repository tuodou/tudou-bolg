import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

export default new vueRouter({
  routes: [
    {
      name: 'root',
      path: '/',
      component: () => import('@/views/root')
    },
    {
      name: 'detail',
      path: '/detail',
      meta: {
        hideSlide: true
      },
      component: () => import('@/views/blog/blogDetail')
    },
    {
      name: 'addBlog',
      path: '/addBlog',
      meta: {
        hideSlide: true
      },
      component: () => import('@/views/blog/addBlog')
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
