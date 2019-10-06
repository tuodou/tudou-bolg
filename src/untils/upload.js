import { uploadImageApi } from '@/api/commonApi'
export const uploadImage = function (img, fileName, cb) {
  console.log(333, img)
  let reader = new FileReader()
  reader.readAsDataURL(img)
  reader.onload = e => {
    let form = new FormData()
    form.append('image', e.target.result)
    form.append('fileName', fileName)
    cb(uploadImageApi(form))
  }
}
