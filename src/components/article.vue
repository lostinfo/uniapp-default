<template>
  <view class="padding-sm">
    <rich-text :nodes="content" class="margin-tb-xl" v-if="content != ''"></rich-text>
    <view v-if="loading">
      <view class="cu-load bg-white loading"></view>
    </view>
    <view v-if="has_error">
      <view class="cu-load bg-red erro"></view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "Article",
    props: {
      code: {
        required: true,
        type: String,
      },
    },
    data() {
      return {
        loading: true,
        has_error: false,
        content: '',
      }
    },
    mounted() {
      this.getArticle()
    },
    methods: {
      getArticle() {
        let that = this
        that.$http.get('/articles/' + that.code + '/content').then(res => {
          that.loading = false
          that.content = res.content
        }).catch(err => {
          that.loading = false
          that.has_error = true
        })
      },
    },
  }
</script>

<style scoped>

</style>
