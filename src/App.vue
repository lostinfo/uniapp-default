<script>
import Vue from 'vue'

export default {
  onLaunch: function () {
    console.log('App Launch')
    let that = this
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif

        // #ifdef MP-WEIXIN || MP-QQ
        Vue.prototype.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          Vue.prototype.Custom = capsule;
          // Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
          Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        }
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif

        that.$store.commit('common/setSystemInfo', e)
      }
    })
    that.$store.dispatch('auth/autoLogin')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
@import "colorui/main.css";
@import "colorui/icon.css";
</style>

<style lang="scss">
@import "styles/app.scss";
</style>
