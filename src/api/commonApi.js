import { Post } from '@/plugins/axios'

export const uploadImageApi = (data) => {
  console.log(data)
  return Post('/upload/image', data)
}
