import Vue from 'vue'
import axios from 'axios'

const axiosX = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 3000
})

axiosX.interceptors.request.use(function (config) {
  console.log(config)
  return config
}, function (err) {
  return Promise.reject(err)
})

axiosX.interceptors.response.use(function (response) {
  let res
  if (response && (Number(response.status) === 200 || Number(response.status) === 304)) {
    res = response.data
  }
  if (res) {
    if (res.success) {
      return res.data
    } else {
      return Promise.reject(res)
    }
  }
}, function (err) {
  console.log('errr', err)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '登录超时，请重新登录'
    window.sessionStorage.clear()
  }
  return Promise.reject(err)
})

const Post = (url='/', data={}) => {
  return axiosX.post(url, data)
}
const Get = (url='/', data={}) => {
  return axiosX.get(url, data)
}

Vue.$Post = Post
Vue.$Get = Get

export {Post, Get}
