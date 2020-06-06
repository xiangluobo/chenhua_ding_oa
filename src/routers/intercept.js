/**
 * @description: 路由拦截
 * @author: Andy Burns
 */

import router from './index';
import store from '../stores'
// 路由导航守卫
router.beforeEach((to, from, next) => {
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
