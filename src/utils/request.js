let Fly = require('flyio/dist/npm/wx')
const service = new Fly()
import {API_URL} from '@/utils/config'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

service.config.baseURL = API_URL

service.config.headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}

import store from '@/store'

//添加请求拦截器
service.interceptors.request.use((request) => {
  let authorization = store.state.auth.authorization
  if (authorization !== null) {
    request.headers['Authorization'] = 'Bearer ' + authorization
  }
  return request
})

service.interceptors.response.use(
  (response) => {
    try {
      // eslint-disable-next-line no-prototype-builtins
      if (response.headers.hasOwnProperty('content-type') && response.headers['content-type'].includes('application/json') >= 0) {
        if (response.data.status == 200) {
          return response.data.data
        }
        let message = response.data.message
        let errors = []
        // eslint-disable-next-line no-prototype-builtins
        if (response.data.data.hasOwnProperty('errors') && response.data.data.errors) {
          for (let key in response.data.data.errors) {
            errors.push(...response.data.data.errors[key])
          }
        }
        uni.hideLoading()
        if (errors.length > 0) {
          uni.showModal({
            title: '提示',
            showCancel: false,
            content: message + '；' + errors.join('\n')
          })
        } else {
          uni.showToast({
            title: message,
            icon: 'none',
            duration: 2000,
          })
        }
        return Promise.reject(response.data)
      } else {
        //body
        return response.data
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  (error) => {
    console.log(error)
    let status = error.response.status
    switch (status) {
      case 401:
      // todo login
    }
    uni.hideLoading()
    uni.showToast({
      title: error.response && error.response.data.message || codeMessage[error.response.status] || '您的网络发生异常，无法连接服务器',
      icon: 'none',
      duration: 2000,
    })
    setTimeout(() => {
      return Promise.reject(error.response.data)
    }, 1000)
  }
)

service.uploadFile = (url, file_path, file_type, form_data) => {
  form_data = form_data || {}
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: service.config.baseURL + url,
      filePath: file_path,
      name: 'file',
      fileType: file_type, // 文件类型，image/video/audio	仅支付宝小程序，且必填。
      header: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + store.state.auth.authorization,
      },
      formData: form_data,
      success: (res) => {
        if (res.statusCode == 200) {
          let data = JSON.parse(res.data)
          if (data.status == 200) {
            resolve(data)
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
            })
            reject('文件上传失败')
          }
        } else {
          uni.showToast({
            title: '文件上传失败',
            icon: 'none',
            duration: 2000,
          })
          reject('文件上传失败')
        }
      },
      fail: (err) => {
        console.log('uploadFiles上传图片失败', err)
        reject('文件上传失败')
      }
    })
  })
}

export default service
