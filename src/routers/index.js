/**
 * @description: 路由
 * @author: Andy Burns
 */

import Vue from 'vue';
import Router from 'vue-router';

const Hello = () => import(/* webpackChunkName: "hello" */ '@/views/hello');
const login = () => import(/* webpackChunkName: "login" */ '@/views/login');

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'hello',
    component: Hello,
    meta: {
      title: '首页',
      requireAuth: false // 登录权限
    }
  },
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {
      title: '登录页'
    }
  }
];

const router = new Router({
  mode: 'history',
  // mode: 'hash',
  routes
})

export default router;
