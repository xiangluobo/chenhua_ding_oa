<template>
  <section class="mod-home">
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- <img src="~@/assets/images/banner.png"> -->
    </div>
    <div class="notice">
      <div class="left">
        <span class="en">公告</span>
        <van-notice-bar v-if="announcement[0]" class="ctn" :text="announcement[0].titile"/>
      </div>
      <div class="right" @click="goToAnnouncement">更多<span class="iconfont recommend">&#xe76d;</span></div>
    </div>
    <div class="content">
      <div class="process">
        <dl>
          <dt>1</dt>
          <dd>代办审批</dd>
        </dl>
        <dl>
          <dt>1</dt>
          <dd>代办审批</dd>
        </dl>
        <dl>
          <dt>1</dt>
          <dd>代办审批</dd>
        </dl>
        <dl>
          <dt>1</dt>
          <dd>代办审批</dd>
        </dl>
      </div>
      <div class="common">
        <h3>常用</h3>
        <div class="units">
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/richeng.png"><span class="dot"></span></div>
            <div class="illustration">日程</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/ribao.png"><span class="dot"></span></div>
            <div class="illustration">日报</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/renwu.png"><span class="dot"></span></div>
            <div class="illustration">任务</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/kaoqing.png"><span class="dot"></span></div>
            <div class="illustration">考勤</div>
          </div>
        </div>
      </div>
      <div class="common">
        <h3>流程管理</h3>
        <div class="units">
          <div class="unit" @click="goToProcess(item)" v-for="(item, index) in list" :key='index'>
            <div class="circle"><img :src="require(`../../assets/images/${item.appMenuIcon}`)"><span class="dot"></span></div>
            <div class="illustration">{{item.appMenuName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mod-add" @click="addNewModule">
      <img src="~@/assets/images/add.png">
    </div>
    <!-- <span class="iconfont recommend">&#xe7e6;</span> -->

    <van-popup v-model="show" position="bottom" closeable close-icon="close" :style="{ height: '100%' }" >
      <dl class="mod-create">
        <dt>快速创建</dt>
        <dd>
          <div @click="toApplication(item)" class="block" v-for="(item, index) in list" :key="`block-${index}`">
            <img :src="require(`../../assets/images/${item.appMenuIcon}`)" />
            <div class="text">{{item.appMenuName}}</div>
          </div>
        </dd>
      </dl>
    </van-popup>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Popup, Grid, GridItem, Swipe, SwipeItem, Lazyload, NoticeBar } from 'vant'
Vue.use(Popup)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(NoticeBar)
export default {
  data() {
    return {
      show: false,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      list: [],
      records: []
    }
  },
  computed: {
    ...mapGetters(['token', 'announcement'])
  },
  methods: {
    ...mapActions(['setAnnouncement']),
    goToProcess(item) {
      if (item.appMenuRouter.indexOf(';') > -1) {
        this.$router.push(item.appMenuRouter.split(';')[0])
        return
      }
      this.$router.push(item.appMenuRouter)
    },
    toApplication(item) {
      let router = item.appMenuRouter
      if (router.indexOf(';') > -1) {
        this.$router.push(router.split(';')[1])
      }
    },
    addNewModule() {
      this.show = true
    },
    // get请求
    getUserAppPermission() {
      this.$http.get('/sys/permission/getUserAppPermissionByToken', {
        params: {
          token: this.token
        }
      }).then(res => {
        this.list = res.result.filter(v => v.parentId)
        console.log(this.list, '流程权限')
      })
    },
    goToAnnouncement() {
      this.$router.push('/announcement')
    }
  },
  created() {
    this.getUserAppPermission()
    this.setAnnouncement()
  }
}
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
