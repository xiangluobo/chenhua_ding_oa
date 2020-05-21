/**
 * @description: 路由拦截
 * @author: Andy Burns
 */

import router from './index';

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 登录权限
  if (to.meta.requireAuth) { // 判断是否校验登录权限
    if (!window.myVue.userName) { // 判断是否登录，根据实际业务处理
      next({
        path: '/login',
        query: {
          redirect: to.fullPath // 未登录，跳转到登录页，登录后跳转回当前页。
        }
      })
      return;
    }
  }
  next()
})
