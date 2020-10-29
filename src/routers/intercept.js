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
  document.title = to.meta.title
  // 检测路由配置中是否有requireAuth这个meta属性
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断是否已登录
    if (store.getters.token) {
      // 判断是否需要缓存
      console.log('to.path:' + to.path + ' | from.path' + from.path)
      if ((to.path === '/processDetail' && from.path === '/approvalProcess') ||
        (to.path === '/processDetail' && from.path === '/process') ||
        (to.path === '/processDetail' && from.path === '/myProcess') ||
        (to.path === '/taskDetail' && from.path === '/taskList') ||
        (to.path === '/addDayCommData' && from.path === '/dailyPaperProcess') ||
        (to.path === '/addMortgageData' && from.path === '/dailyPaperProcess') ||
        (to.path === '/addSalesData' && from.path === '/dailyPaperProcess')) {
        // 让列表页缓存，即不刷新
        from.meta.keepAlive = true;
        window.localStorage.setItem('isRefresh', false)
        console.log(0)
      } else if ((to.path === '/approvalProcess' && from.path === '/processDetail') ||
        (to.path === '/process' && from.path === '/processDetail') ||
        (to.path === '/myProcess' && from.path === '/processDetail') ||
        (to.path === '/taskList' && from.path === '/taskDetail') ||
        (to.path === '/dailyPaperProcess' && from.path === '/addDayCommData') ||
        (to.path === '/dailyPaperProcess' && from.path === '/addMortgageData') ||
        (to.path === '/dailyPaperProcess' && from.path === '/addSalesData')) {
        // 让列表页缓存，即不刷新
        to.meta.keepAlive = true;
        window.localStorage.setItem('isRefresh', false)
        console.log(1)
      } else if ((to.path === '/approvalProcess' && from.path === '/') ||
        (to.path === '/process' && from.path === '/') ||
        (to.path === '/myProcess' && from.path === '/mine') ||
        (to.path === '/myProcess' && from.path === '/') ||
        (to.path === '/taskList' && from.path === '/') ||
        (to.path === '/dailyPaperProcess' && from.path === '/') ||
        (to.path === '/dailyPaperProcess' && from.path === '/') ||
        (to.path === '/dailyPaperProcess' && from.path === '/')) {
        // 让列表页缓存，即不刷新
        // to.meta.keepAlive = true;
        // window.localStorage.setItem('isRefresh', true)
        console.log(2)
      } else {
        from.meta.keepAlive = false;
        to.meta.keepAlive = false;
        window.localStorage.setItem('isRefresh', true)
        console.log(3)
      }
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
