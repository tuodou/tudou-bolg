import { Post } from '@/plugins/axios'

export const addArticalApi = (data) => {
  console.log(data)
  return Post('/artical/addArtical', data)
}

export const getArticalListApi = (data) => {
  console.log(data)
  return Post('/artical/addArticalList', data)
}

export const getArticalDetailApi = (data) => {
  console.log(data)
  return Post('/artical/getArticalDetail', data)
}

export const getRecentArticalApi = (data) => {
  console.log(data)
  return Post('/artical/getRecentArtical', data)
}

export const updateArticalApi = (data) => {
  console.log(data)
  return Post('/artical/updateArtical', data)
}
