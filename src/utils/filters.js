import helper from "@/utils/helper"

export default {
  getPrice: (price) => {
    price = price || 0
    return price.toFixed(2)
  },
  getAbsPrice: (price) => {
    price = price || 0
    return Math.abs(price).toFixed(2)
  },
  getPath: (url) => {
    return helper.getUrl(url)
  },
  repeatName: (str) => {
    if (str === '1111111') return '每天'
    if (str === '0111110') return '工作日'
    let temp = []
    for (let [index, val] of Object.entries(str)) {
      if (index === '0' && val === '1') {
        temp.push('周日')
      }
      if (index === '1' && val === '1') {
        temp.push('周一')
      }
      if (index === '2' && val === '1') {
        temp.push('周二')
      }
      if (index === '3' && val === '1') {
        temp.push('周三')
      }
      if (index === '4' && val === '1') {
        temp.push('周四')
      }
      if (index === '5' && val === '1') {
        temp.push('周五')
      }
      if (index === '6' && val === '1') {
        temp.push('周六')
      }
    }
    return temp.length ? temp.join('、') : '永不'
  },
  // 电话号码隐藏中间4位
  getSecurityMobile(value) {
    if (Number(value) && String(value).length === 11) {
      let mobile = String(value)
      let reg = /^(\d{3})\d{6}(\d{2})$/
      return mobile.replace(reg, '$1******$2')
    } else {
      return value
    }
  },
}