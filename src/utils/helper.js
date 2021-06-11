import {baseURL} from "@/utils/config"

export default {
  getUrl(url) {
    if (/^http(s)?:\/\/.+/.test(url)) {
      return url
    }
    if (/^\/\/.+/.test(url)) {
      return url
    }
    return baseURL + (/^\//.test(url) ? url : '/' + url)
  },
  getUrlRelativePath(url) {
    let arrUrl = url.split("//")
    let start = arrUrl[1].indexOf("/")
    let relUrl = arrUrl[1].substring(start)
    if (relUrl.indexOf("?") != -1) {
      relUrl = relUrl.split("?")[0]
    }
    return relUrl
  },
  getUrlQuery(url) {
    let arrUrl = url.split("?")
    if (arrUrl[1]) {
      return arrUrl[1]
    }
    return ''
  },
  getUrlParam(url, name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = url.match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  },
  navigateTo(e) {
    // 限二级页面
    let url = e.currentTarget.dataset.url
    if (url === undefined) {
      return
    }
    let needLogin = e.currentTarget.dataset.needLogin
    needLogin = needLogin === undefined ? false : needLogin
    if (needLogin && !this.$store.state.user) {
      uni.navigateTo({
        url: '/pages/login/login?redirect=' + encodeURIComponent(url),
      })
    } else {
      uni.navigateTo({
        url: url,
      })
    }
  },
}