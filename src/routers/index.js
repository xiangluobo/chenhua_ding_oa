/**
 * @description: 路由
 * @author: Andy Burns
 */

import Vue from 'vue';
import Router from 'vue-router';

const home = () => import(/* webpackChunkName: "home" */ '@/views/home')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login')
const process = () => import(/* webpackChunkName: "process" */ '@/views/process')
const processDetail = () => import(/* webpackChunkName: "processDetail" */ '@/views/processDetail')
const expense = () => import(/* webpackChunkName: "expense" */ '@/views/expense')
const paymentApplication = () => import(/* webpackChunkName: "paymentApplication" */ '@/views/paymentApplication')
const mine = () => import(/* webpackChunkName: "mine" */ '@/views/mine')
const modify = () => import(/* webpackChunkName: "modify" */ '@/views/modify')

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'index',
    component: home,
    meta: {
      title: '首页',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/process',
    name: 'process',
    component: process,
    meta: {
      title: '流程列表',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/processDetail',
    name: 'processDetail',
    component: processDetail,
    meta: {
      title: '流程详情',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/expense',
    name: 'expense',
    component: expense,
    meta: {
      title: '费用报销申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/paymentApplication',
    name: 'paymentApplication',
    component: paymentApplication,
    meta: {
      title: '付款申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '我的',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/modify',
    name: 'modify',
    component: modify,
    meta: {
      title: '修改密码',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/login',
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
