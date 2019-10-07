import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/assets/styles/index.less'

import { formateTime } from '@/untils/formate'
Vue.filter('formateTime', formateTime)
// markdown 编辑器引入
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
