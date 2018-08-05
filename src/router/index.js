import Vue from 'vue'
import Router from 'vue-router'
import mainInterfaec from '@/components/wechatAccount/mainInterface/mainInterface'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainInterfaec',
      component: mainInterfaec
    }
  ]
})
