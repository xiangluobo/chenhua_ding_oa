/**
 * @description: 路由拦截
 * @author: Andy Burns
 */

import router from './index'
import store from '../stores'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 检测路由配置中是否有requireAuth这个meta属性
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断是否已登录
    if (store.getters.token) {
      next()
    } else {
      // 未登录则跳转到登录界面
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})
