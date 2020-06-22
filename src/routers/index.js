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
const announcement = () => import(/* webpackChunkName: "announcement" */ '@/views/announcement')
const announcementDetail = () => import(/* webpackChunkName: "announcementDetail" */ '@/views/announcementDetail')
const priceDiscount = () => import(/* webpackChunkName: "priceDiscount" */ '@/views/priceDiscount')
const pledgeRefund = () => import(/* webpackChunkName: "pledgeRefund" */ '@/views/pledgeRefund')
const depositRefund = () => import(/* webpackChunkName: "depositRefund" */ '@/views/depositRefund')
const marketingPayment = () => import(/* webpackChunkName: "marketingPayment" */ '@/views/marketingPayment')
const propertySalary = () => import(/* webpackChunkName: "propertySalary" */ '@/views/propertySalary')
const marketingSalary = () => import(/* webpackChunkName: "marketingSalary" */ '@/views/marketingSalary')
const approvedProcess = () => import(/* webpackChunkName: "approvedProcess" */ '@/views/approvedProcess')
const marketingExpense = () => import(/* webpackChunkName: "marketingExpense" */ '@/views/marketingExpense')
const create = () => import(/* webpackChunkName: "create" */ '@/views/create')
const approvalProcess = () => import(/* webpackChunkName: "approvalProcess" */ '@/views/approvalProcess')
const myProcess = () => import(/* webpackChunkName: "myProcess" */ '@/views/myProcess')
const mortgageStatistic = () => import(/* webpackChunkName: "mortgageStatistic" */ '@/views/mortgageStatistic')
const report = () => import(/* webpackChunkName: "report" */ '@/views/report')
const createSchedule = () => import(/* webpackChunkName: "createSchedule" */ '@/views/createSchedule')
const mySchedule = () => import(/* webpackChunkName: "mySchedule" */ '@/views/mySchedule')
const salesStatistics = () => import(/* webpackChunkName: "salesStatistics" */ '@/views/salesStatistics')
const addMortgageData = () => import(/* webpackChunkName: "addMortgageData" */ '@/views/addMortgageData')
const addSalesData = () => import(/* webpackChunkName: "report" */ '@/views/addSalesData')
const dailyPaperProcess = () => import(/* webpackChunkName: "dailyPaperProcess" */ '@/views/dailyPaperProcess')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: home,
    meta: {
      title: '辰华OA',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/createSchedule',
    name: 'createSchedule',
    component: createSchedule,
    meta: {
      title: '新建日程',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/mySchedule',
    name: 'mySchedule',
    component: mySchedule,
    meta: {
      title: '我的日程',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/dailyPaperProcess',
    name: 'dailyPaperProcess',
    component: dailyPaperProcess,
    meta: {
      title: '日报',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/salesStatistics',
    name: 'salesStatistics',
    component: salesStatistics,
    meta: {
      title: '销售统计',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/addMortgageData',
    name: 'addMortgageData',
    component: addMortgageData,
    meta: {
      title: '按揭数据添加',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/addSalesData',
    name: 'addSalesData',
    component: addSalesData,
    meta: {
      title: '销售数据添加',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/report',
    name: 'report',
    component: report,
    meta: {
      title: '报表',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/mortgageStatistic',
    name: 'mortgageStatistic',
    component: mortgageStatistic,
    meta: {
      title: '按揭统计',
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
    path: '/myProcess',
    name: 'myProcess',
    component: myProcess,
    meta: {
      title: '我的流程列表',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/create',
    name: 'create',
    component: create,
    meta: {
      title: '快速创建',
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
    path: '/marketingExpense',
    name: 'marketingExpense',
    component: marketingExpense,
    meta: {
      title: '营销费用报销申请',
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
    path: '/announcement',
    name: 'announcement',
    component: announcement,
    meta: {
      title: '公告',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/announcementDetail',
    name: 'announcementDetail',
    component: announcementDetail,
    meta: {
      title: '公告详情',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/priceDiscount',
    name: 'priceDiscount',
    component: priceDiscount,
    meta: {
      title: '价格优惠申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/pledgeRefund',
    name: 'pledgeRefund',
    component: pledgeRefund,
    meta: {
      title: '认筹退款申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/depositRefund',
    name: 'depositRefund',
    component: depositRefund,
    meta: {
      title: '定金/房款退款申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/marketingPayment',
    name: 'marketingPayment',
    component: marketingPayment,
    meta: {
      title: '营销付款申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/propertySalary',
    name: 'propertySalary',
    component: propertySalary,
    meta: {
      title: '房产工资发放申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/marketingSalary',
    name: 'marketingSalary',
    component: marketingSalary,
    meta: {
      title: '营销工资发放申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/approvedProcess',
    name: 'approvedProcess',
    component: approvedProcess,
    meta: {
      title: '通用审批流程申请',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/approvalProcess',
    name: 'approvalProcess',
    component: approvalProcess,
    meta: {
      title: '代办审批流程列表',
      requireAuth: true // 登录权限
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  }
];

const router = new Router({
  mode: 'history',
  // mode: 'hash',
  routes
})

export default router;
