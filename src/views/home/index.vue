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
      <div class="left"><span class="en">公告</span><span class="ctn" v-html="records[0].titile"></span></div>
      <div class="right">更多<span class="iconfont recommend">&#xe76d;</span></div>
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
          <van-grid :gutter="5" :border="false" :column-num="4">
            <van-grid-item>
              <img src="~@/assets/images/fukuanshenqing.png" />
              <div class="text">付款申请</div>
            </van-grid-item>
            <van-grid-item>
              <img src="~@/assets/images/fukuanshenqing.png" />
              <div class="text">付款申请</div>
            </van-grid-item>
            <van-grid-item>
              <img src="~@/assets/images/fukuanshenqing.png" />
              <div class="text">付款申请</div>
            </van-grid-item>
            <van-grid-item>
              <img src="~@/assets/images/fukuanshenqing.png" />
              <div class="text">付款申请</div>
            </van-grid-item>
          </van-grid>
          <van-grid :gutter="5" :border="false" :column-num="4">
            <van-grid-item>
              <img src="~@/assets/images/fukuanshenqing.png" />
              <div class="text">付款申请</div>
            </van-grid-item>
            <van-grid-item>
              <img src="~@/assets/images/fukuanshenqing.png" />
              <div class="text">付款申请</div>
            </van-grid-item>
          </van-grid>
        </dd>
      </dl>
    </van-popup>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Popup, Grid, GridItem, Swipe, SwipeItem, Lazyload } from 'vant'
Vue.use(Popup)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
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
    ...mapGetters(['token'])
  },
  methods: {
    goToProcess(item) {
      this.$router.push(item.appMenuRouter)
    },
    addNewModule() {
      this.show = true
    },
    getMyAnnouncementSend() {
      this.$http.get('/sys/sysAnnouncementSend/getMyAnnouncementSend', {
        params: {
          msgCategory: 1,
          pageSize: 10,
          pageNo: 1
        }
      }).then(res => {
        this.records = res.result.records
        console.log(res, 888)
      })
    },
    // get请求
    getUserAppPermission() {
      this.$http.get('/sys/permission/getUserAppPermissionByToken', {
        params: {
          token: this.token
        }
      }).then(res => {
        this.list = res.result.filter(v => v.parentId)
        console.log(this.list)
      })
    }
  },
  created() {
    this.getUserAppPermission()
    this.getMyAnnouncementSend()
    console.log(process.env.VUE_APP_ERUDA, '====', process.env.VUE_APP_TEXT)
  }
}
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
