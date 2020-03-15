import { Post } from '@/plugins/axios'

export const getCommentServer = (data) => {
  console.log(data)
  return Post('/comment/getComment', data)
}

export const createCommentServer = (data) => {
  console.log(data)
  return Post('/comment/addComment', data)
}

export const likeCommentServer = (data) => {
  console.log(data)
  return Post('/comment/likeComment', data)
}

export const hateCommentServer = (data) => {
  console.log(data)
  return Post('/comment/hateComment', data)
}
