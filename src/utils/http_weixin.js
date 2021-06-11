let Fly = require('flyio/dist/npm/wx')
let http = new Fly()
import { apiURL } from './config'

http.config.baseURL = apiURL

http.config.headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}

import store from '../store'

//添加请求拦截器
http.interceptors.request.use((request)=>{
  let authorization = store.state.authorization
  if (authorization !== null) {
    request.headers['Authorization'] = 'Bearer ' + authorization
  }
  return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
http.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    return new Promise((resolve, reject) => {
      let message = err.response.data.message ? err.response.data.message : ''
      let showModal = false
      switch (err.status) {
        case 401:
          store.commit('unsetUser')
          store.commit('unsetAuthorization')
          uni.navigateTo({
            url: '/pages/login/login'
          })
          message = '请登录'
          break
        case 422:
          if (err.response.data.hasOwnProperty('errors') && Object.keys(err.response.data.errors).length > 0) {
            message = ""
            showModal = true
            for (let key in err.response.data.errors) {
              for (let msg of err.response.data.errors[key]) {
                message += msg + "\n"
              }
            }
          }
        default:
          break
      }
      uni.hideLoading()
      if (showModal) {
        uni.showModal({
          title: '提示',
          showCancel: false,
          content: message
        })
      } else {
        uni.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
        })
      }
      let response_data = null
      if (err.response !== undefined && err.response.data != undefined) {
        response_data = err.response.data
      }
      setTimeout(() => {
        reject(response_data)
      }, 1000)
    })
  }
)

http.uploadFile =(url, file_path, form_data) => {
  form_data = form_data || {}
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: http.config.baseURL + url,
      filePath: file_path,
      name: 'file',
      header: {
        'Authorization': 'Bearer ' + store.state.authorization,
      },
      formData: form_data,
      success: (res) => {
        if (res.statusCode == 200) {
          resolve(JSON.parse(res.data))
        } else {
          reject('文件上传失败')
        }
      },
      fail: (err) => {
        console.log(err)
        reject('文件上传失败')
      }
    })
  })
}

export default http
