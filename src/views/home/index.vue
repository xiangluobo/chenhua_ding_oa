<template>
  <section class="mod-home">
    <div class="banner">
      <van-swipe :autoplay="5000">
        <van-swipe-item>
          <img :src="require(`../../assets/images/banner1.png`)" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="require(`../../assets/images/banner2.png`)" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="require(`../../assets/images/banner3.png`)" />
        </van-swipe-item>
      </van-swipe>
      <!-- <img src="~@/assets/images/banner.png"> -->
    </div>
    <div class="notice">
      <div class="left">
        <span class="en">公告</span>
        <van-notice-bar v-if="announcement[0]" @click="goToAnnouncementDetail(0)" class="ctn" :text="announcement[0].titile"/>
      </div>
      <div class="right" @click="goToAnnouncement">更多<span class="iconfont recommend">&#xe76d;</span></div>
    </div>
    <div class="content">
      <div class="process">
        <dl @click="goToApproval('',0,'/flow/getMyTodoBussiList')">
          <dt>{{ dataCount.daibanShenpiCount }}</dt>
          <dd>待办审批</dd>
        </dl>
        <dl @click="goToSchedule">
          <dt>{{ dataCount.jinriRichengCount }}</dt>
          <dd>今日日程</dd>
        </dl>
        <dl @click="goToApproval(2,1,'/flow/getMyUnderBussiList')">
          <dt>{{ dataCount.weiwanjieLiuchengCount }}</dt>
          <dd>未完结流程</dd>
        </dl>
        <dl>
          <dt>{{ dataCount.weiwanjieRenwuCount }}</dt>
          <dd>未完结任务</dd>
        </dl>
      </div>
      <div class="common">
        <h3>常用</h3>
        <div class="units">
          <div class="unit" @click="goToSchedule">
            <div class="circle"><img src="~@/assets/images/richeng.png"><span class="dot"></span></div>
            <div class="illustration">日程</div>
          </div>
          <div class="unit" @click="goToDailyPaper">
            <div class="circle"><img src="~@/assets/images/ribao.png"><span class="dot"></span></div>
            <div class="illustration">日报</div>
          </div>
          <div class="unit" @click="goToTaskList">
            <div class="circle"><img src="~@/assets/images/renwu.png"><span class="dot"></span></div>
            <div class="illustration">任务</div>
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

    <!-- <van-popup v-model="show" position="bottom" closeable close-icon="close" :style="{ height: '100%' }" >
      <dl class="mod-create">
        <dt>快速创建</dt>
        <dd>
          <div @click="toApplication(item)" class="block" v-for="(item, index) in list" :key="`block-${index}`">
            <img :src="require(`../../assets/images/${item.appMenuIcon}`)" />
            <div class="text">{{item.appMenuName}}</div>
          </div>
        </dd>
      </dl>
    </van-popup> -->
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Grid, GridItem, Swipe, SwipeItem, Lazyload, NoticeBar } from 'vant'
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(NoticeBar)
export default {
  data() {
    return {
      list: [],
      records: [],
      dataCount: {}
    }
  },
  computed: {
    ...mapGetters(['token', 'announcement'])
  },
  methods: {
    ...mapActions(['setAnnouncement']),
    goToTaskList () {
      this.$router.push('/taskList')
    },
    goToDailyPaper () {
      this.$router.push('/dailyPaperProcess')
    },
    goToSchedule () {
      this.$router.push('/mySchedule')
    },
    getProcessingDataCount() {
      this.$http.get('/sys/user/getProcessingDataCount').then(res => {
        this.dataCount = res.result
      })
    },
    goToApproval(bpmState, isWwj, api) {
      this.$router.push(`/approvalProcess?bpmState=${bpmState}&isWwj=${isWwj}&api=${api}`)
    },
    goToProcess(item) {
      if (item.appMenuRouter.indexOf(';') > -1) {
        this.$router.push(item.appMenuRouter.split(';')[0])
        return
      }
      this.$router.push(item.appMenuRouter)
    },
    goToAnnouncementDetail(index) {
      this.$router.push(`/announcementDetail?num=${index}`)
    },
    addNewModule() {
      this.$router.push('/create')
    },
    // get请求
    getUserAppPermission() {
      let loading = this.$loading()
      this.$http.get('/sys/permission/getUserAppPermissionByToken', {
        params: {
          token: this.token
        }
      }).then(res => {
        loading.close()
        this.list = res.result.filter(v => v.parentId)
      }).catch(() => {
        loading.close()
      })
    },
    goToAnnouncement() {
      this.$router.push('/announcement')
    }
  },
  created() {
    this.getUserAppPermission()
    this.setAnnouncement()
    this.getProcessingDataCount()
  }
}
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
