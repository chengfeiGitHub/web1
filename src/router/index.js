import Vue from 'vue'
import Router from 'vue-router'
import mainInterface from '@/components/wechatAccount/mainInterface/mainInterface'
import weChatDetail from '@/components/wechatAccount/weChatDetail/weChatDetail'
Vue.use(Router)
// 需要跳轉的頁面都這這裡聲明
export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainInterface',
      component: mainInterface
    },
    {
      path: '/deTail',
      name: 'weChatDetail',
      component: weChatDetail
    }
  ]
})
