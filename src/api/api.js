import request from "@/utils/request"

export function uploadImage(file_path, form_data = {}) {
  return request.uploadFile('/upload/image/students', file_path, 'image', form_data)
}

export function uploadVideo(file_path, dir = 'guardian', form_data = {},) {
  return request.uploadFile(`/upload/video/${dir}`, file_path, 'video', form_data)
}

// 微信小程序
export function loginByWechatCode(code) {
  return request.post('/login/code', {
    code: code, from: 'wechat'
  })
}

// 支付宝小程序
export function loginByAlipayCode(code) {
  return request.post('/login/code', {
    code: code, from: 'alipay'
  })
}

export function user() {
  return request.post('/user')
}

export function register(data) {
  return request.post('/register', data)
}

// 退出并解绑微信
export function logout() {
  return request.post('/logout')
}
