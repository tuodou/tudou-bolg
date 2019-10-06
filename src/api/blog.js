import { Post } from '@/plugins/axios'

export const addArtical = (data) => {
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
