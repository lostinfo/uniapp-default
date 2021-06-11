import http from './http_weixin'
import store from '../store'

let api = {
  login(code, detail) {
    return new Promise((resolve, reject) => {
      http.post('/login', {...detail, code: code}).then(res => {
        store.dispatch('login', res).then(res => {
          resolve()
        }).catch(err => {
          reject()
        })
      }).catch(err => {
        reject()
      })
    })
  },
  check() {
    http.post('/check').then(res => {
      if (res.status) {
        store.dispatch('refreshUser', res.user)
      }
    })
  },
  user() {
    return new Promise((resolve, reject) => {
      http.get('/user').then(res => {
        store.dispatch('refreshUser', res)
        resolve()
      })
    })
  },
  pay(url) {
    let that = this
    uni.showLoading({
      mask: true,
    })
    return new Promise((resolve, reject) => {
      http.post(url).then(res => {
        uni.hideLoading()
        uni.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success: (res2) => {
            uni.showToast({
              title: '支付成功',
            })
            resolve()
          },
          fail: (err) => {
            console.log(err)
            if (err.errMsg == 'requestPayment:fail cancel') {
              uni.showToast({
                icon: 'none',
                title: '取消支付',
              })
              reject()
            } else {
              uni.showToast({
                icon: 'none',
                title: '调用支付失败',
              })
              reject(err)
            }
          }
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default api
