<template>
  <div class="mod-nav">
    <dl class="report" @click="unFunction">
      <dt><img src="~@/assets/images/report.png"></dt>
      <dd>报表</dd>
    </dl>
    <div class="chengyun" @click="goHome">
      <img src="~@/assets/images/middle.png">
      <span class="charater">辰化置业</span>
      <span class="english">CHENGHUAZHIYE</span>
    </div>
    <dl class="report sec" @click="goToMine">
      <dt><img src="~@/assets/images/mine.png"></dt>
      <dd>我的</dd>
    </dl>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  name: 'Footer',
  methods: {
    goToMine() {
      if (this.$route.path === '/mine') return
      this.$router.push('/mine')
    },
    goHome() {
      if (this.$route.path === '/') return
      this.$router.push('/')
    },
    unFunction() {
      Toast('功能开发中')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mod-nav{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgb(89, 58, 34);
  overflow: hidden;
  .report{
    float: left;
    width: 33%;
    height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
    &.sec{
      position: relative;
      left: -20px;
    }
    dt{
      width: 24px;
      margin:8px auto 4px;
      img{
        display: block;
        width: 100%;
      }
    }
    dd{
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
  .chengyun{
    float: left;
    width: 33%;
    img{
      display: block;
      width: 30px;
      height: 30px;
      object-fit: contain;
      margin: 4px auto 0
    }
    .charater{
      position: relative;
      top: 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #fff ;
      transform: scale(0.80);
      margin: 0 auto
    }
    .english{
      display: block;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #f00 ;
      transform: scale(0.50);
      margin: -4px auto
    }
  }
}
</style>
