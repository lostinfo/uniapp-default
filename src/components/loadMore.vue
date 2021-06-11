<template>
  <view class="load-more">
    <view v-if="loading" class="load-more-content">
      <image src="/static/loading.gif"></image>
      <slot name="loadingText"><text>正在加载数据</text></slot>
    </view>
    <view v-else class="load-more-content">
      <slot name="hasMoreText" v-if="hasMore"><text>上滑查看更多内容</text></slot>
      <slot name="noMoreText" v-else><text>没有更多数据了</text></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: "loadMore",
    props: {
      loading: {
        type: Boolean,
        required: false,
        default: false
      },
      hasMore: {
        type: Boolean,
        required: false,
        default: true
      },
    },
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {},
  }
</script>

<style scoped>
  .load-more{
    background-color: transparent;
  }
  .load-more .load-more-content{
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .load-more .load-more-content image{
    width: 25px;
    height: 25px;
  }
  .load-more .load-more-content text{
    font-size: 24rpx;
    color: #999999;
  }
</style>