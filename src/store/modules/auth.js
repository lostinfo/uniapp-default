import {loginByWechatCode, loginByAlipayCode, user as getUser} from "@/api/api"

const AUTHORIZATION_NAME = 'authorization_name'

const state = () => ({
  auto_login: false,
  has_login: false,
  user: null,
  authorization: uni.getStorageSync(AUTHORIZATION_NAME),
  wechat_user: null,
  alipay_user: null,
  student_index: 0,
})

const getters = {
  chooseStudent: (state) => {
    if (!state.user) return null
    if (state.user.students.length < 1) return null
    return state.user.students[state.student_index]
  },
  students: (state) => {
    if (!state.user) return []
    return state.user.students
  },
}

const actions = {
  login({commit}, {user, authorization}) {
    return new Promise((resolve, reject) => {
      commit('setUser', user)
      commit('setAuthorization', authorization)
      resolve()
    })
  },
  autoLogin({commit}) {
    uni.login({
      success: function (res) {
        let code = res.code
        uni.showLoading({mask: true,title: '加载中'})
        // 微信小程序
        /* #ifdef MP-WEIXIN */
        console.log('微信小程序登录')
        loginByWechatCode(code).then(res => {
          uni.hideLoading()
          if (res.bind_wechat) {
            commit('setUser', res.user)
            commit('setAuthorization', res.authorization)
          } else {
            commit('setWeChatUser', res.wechat_user)
          }
          commit('setAutoLogin')
        }).catch(err => {
          uni.hideLoading()
          console.log('wechat login fail:', err)
        })
        /* #endif */

        // 支付宝小程序
        /* #ifdef MP-ALIPAY */
        console.log('支付宝小程序登录')
        loginByAlipayCode(code).then(res => {
          uni.hideLoading()
          if (res.bind_alipay) {
            commit('setUser', res.user)
            commit('setAuthorization', res.authorization)
          } else {
            commit('setAlipayUser', res.alipay_user)
          }
          commit('setAutoLogin')
        }).catch(err => {
          uni.hideLoading()
          console.log('alipay login fail:', err)
        })
        /* #endif */
      },
      fail: function () {
        uni.hideLoading()
      }
    })
  },
  refreshUser({commit}) {
    getUser().then(res => {
      commit('setUser', res)
    })
  },
  waitLogin({commit}) {
    return new Promise((resolve, reject) => {
      let sleep_count = 0
      let sh = setInterval(() => {
        if (this.state.auth.user !== null) {
          clearInterval(sh)
          resolve()
        }
        if (sleep_count > 100) {
          clearInterval(sh)
          reject()
        }
        sleep_count++
      }, 200)
    })
  },
  // 微信自动登录是否执行完成
  waitAutoLogin({commit}) {
    return new Promise((resolve, reject) => {
      let sleep_count = 0
      let sh = setInterval(() => {
        if (this.state.auth.auto_login) {
          clearInterval(sh)
          console.log('11111111')
          resolve()
        }
        if (sleep_count > 100) {
          clearInterval(sh)
          console.log('222')

          reject()
        }
        sleep_count++
      }, 200)
    })
  },
  // 退出
  logout({commit}) {
    commit('unsetUser')
    commit('unsetAuthorization')
  },
  chooseStudent({commit}, student_index) {
    commit('setStudentIndex', student_index)
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user
    state.has_login = true
  },
  unsetUser(state) {
    state.user = null
    state.auto_login = false
  },
  setAuthorization(state, authorization) {
    state.authorization = authorization
    uni.setStorageSync(AUTHORIZATION_NAME, authorization)
  },
  unsetAuthorization(state) {
    state.authorization = null
    uni.removeStorageSync(AUTHORIZATION_NAME)
  },
  setWeChatUser(state, wechat_user) {
    state.wechat_user = wechat_user
  },
  setAlipayUser(state, alipay_user) {
    state.alipay_user = alipay_user
  },
  setAutoLogin(state) {
    state.auto_login = true
  },
  setStudentIndex(state, student_index) {
    state.student_index = student_index
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
