import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

export default new vueRouter({
  mode: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
      component: () => import('@/views/root')
    },
    {
      name: 'detail',
      path: '/detail',
      component: () => import('@/views/blog/blogDetail')
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
