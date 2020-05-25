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
      <div class="left"><span class="en">公告</span><span class="ctn">公告公告公告公告公告公告</span></div>
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
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/fukuanshenqing.png"><span class="dot"></span></div>
            <div class="illustration">付款申请</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/feiyongbaoxiao.png"><span class="dot"></span></div>
            <div class="illustration">费用报销</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/jiageyouhui.png"><span class="dot"></span></div>
            <div class="illustration">价格优惠</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/renchoutuikuan.png"><span class="dot"></span></div>
            <div class="illustration">认筹退款</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/dinjingtuikuan.png"><span class="dot"></span></div>
            <div class="illustration">定金退款</div>
          </div>
          <div class="unit">
            <div class="circle"><img src="~@/assets/images/tongyongshenpi.png"><span class="dot"></span></div>
            <div class="illustration">通用审批</div>
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
      ]
    }
  },
  methods: {
    addNewModule() {
      this.show = true
    }
  },
  created() {
    console.log(process.env.VUE_APP_ERUDA, '====', process.env.VUE_APP_TEXT)
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
