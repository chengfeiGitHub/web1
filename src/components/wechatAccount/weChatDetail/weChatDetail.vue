<template>
  <div class="col-sm-12 margin-top-small">
    <div class="console-sub-title">
      <span>公众号详情</span>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top-small">
      <button @click="backToUpPage" class="btn btn-default" style="float:right"><i class="el-icon-back"></i>返回主界面</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取其他页面传递过来的参数，
      weChatSub: this.$route.params.weChatSub
    }
  },
  created () {
    // 这里要调用获取公众号详情的接口
  },
  methods: {

    // 跳转到主界面
    backToUpPage: function () {
      this.$router.push({name: 'mainInterface'})
    }

  }
}
</script>

<style scoped>
</style>
