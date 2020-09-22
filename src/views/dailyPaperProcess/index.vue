<template>
  <section class="mod-process" ref="wrapper">
    <div>
      <div class="mod-tabs">
        <span v-for="(item, index) in tabs" :key="item.id" :class="{active: index===currentNum}" @click="setActive(index, item)">{{ item.name }}</span>
      </div>
      <div @click="goToDetail(item)" class="mod-unit" v-for="(item, index) in list" :key="index">
        <div class="name">{{item.createBy_dictText}}</div>
        <div class="time">{{item.createTime}}</div>
      </div>
      <van-loading v-if="loading" type="spinner" />
      <div v-if="!loading && tips" class="tips">{{ tips }} </div>
      <van-popup v-model="show">
        <div @click="onEdit" class="dialogBtns" v-if="item.createBy == userInfo.username">编辑</div>
        <div @click="onEdit" class="dialogBtns" v-else>查看</div>
        <div @click="onDelete" class="dialogBtns" v-if="item.createBy == userInfo.username">删除</div>
      </van-popup>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import { Loading, Popup, Toast } from 'vant'
import BScroll from 'better-scroll'
Vue.use(Loading)
Vue.use(Popup)
Vue.use(Toast)
export default {
  data() {
    return {
      id: 1,
      currentNum: 0,
      tips: '',
      tabs: [
        {
          name: '按揭日报',
          id: 1
        },
        {
          name: '销售日报',
          id: 2
        },
        {
          name: '通用日报',
          id: 3
        }
      ],
      list: [],
      pageNo: 1,
      pageSize: 10,
      scroll: null,
      options: {
        pullUpLoad: {
          threshold: -10
        },
        click: true, // better-scroll 默认会阻止浏览器的原生 click 事件
        probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
        startY: 0,
        scrollbar: true,
        eventPassthrough: 'horizontal' // 模拟纵向滚动，而横向的滚动还是保留原生滚动
      },
      loading: false,
      show: false,
      status: 1,
      projectCode: '',
      todayVisit: '',
      todayCall: '',
      todayLotDeal: '',
      item: '',
      userInfo: JSON.parse(window.localStorage.getItem('userInfo'))
    };
  },
  methods: {
    setActive(i, item) {
      this.status = item.id
      this.currentNum = i
      this.pageNo = 1
      this.list = []
      this.getList()
    },
    getList() {
      this.loading = true
      let url = ''
      if (this.status === 1) {
        url = '/report/anjieData/list'
      } else if (this.status === 2) {
        url = '/report/xiaoshouData/list'
      } else {
        url = '/report/reportCommon/list'
      }
      this.$http.get(url, {
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.loading = false
        // 加载状态结束
        if (this.pageNo === 1) {
          this.list = []
          this.list = res.result.records
          this.scroll.scrollTo(0, 0)
        } else {
          this.list = this.list.concat(res.result.records)
        }
        if (res.result.records && res.result.records.length === 0) {
          this.tips = '没有更多数据了！'
        }
        this.scroll.finishPullUp();
        this.scroll.refresh()
      })
    },
    load() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, this.options)
        this.scroll.on('scroll', (obj) => {
          // if(obj.y <0 || ( obj.y==0 && this.list && this.list.length==0)){
          //   this.addBg = true
          // }
        })
        this.scroll.on('pullingUp', () => {
          this.pageNo++
          this.getList();
        })
      } else {
        this.scroll.refresh()
      }
    },
    onEdit () {
      var item = this.item

      var isSelf = 0
      if (item.createBy === this.userInfo.username) {
        isSelf = 1
      }
      if (this.status === 1) {
        this.$router.push(`/addMortgageData?id=${item.id}&projectCode=${item.projectCode}&isSelf=${isSelf}`)
      } else if (this.status === 2) {
        this.$router.push(`/addSalesData?id=${item.id}&projectCode=${item.projectCode}&todayVisit=${item.todayVisit}&todayLotDeal=${item.todayLotDeal}&todayCall=${item.todayCall}&isSelf=${isSelf}`)
      } else {
        this.$router.push(`/addDayCommData?id=${item.id}&reportTitle=${item.reportTitle}&reportDate=${item.reportDate}&reportContent=${item.reportContent}&isSelf=${isSelf}`)
      }
    },
    onDelete () {
      if (this.status === 1) {
        this.$http.delete('/report/anjieData/delete', {
          params: {
            id: this.id
          }
        }).then(res => {
          this.show = false
          this.getList()
          if (res.success) {
            Toast.success(res.message)
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http.delete('/report/xiaoshouData/delete', {
          params: {
            id: this.id
          }
        }).then(res => {
          this.show = false
          this.getList()
          if (res.success) {
            Toast.success(res.message)
          } else {
            Toast.fail(res.message)
          }
        })
      }
    },
    goToDetail(item) {
      /* this.todayVisit = item.todayVisit
      this.todayCall = item.todayCall
      this.todayLotDeal = item.todayLotDeal
      this.id = item.id
      this.projectCode = item.projectCode */
      this.item = item
      this.show = true
    },
    destroyed() {
      this.scroll.destroy()
      this.scroll = null
    }
  },
  created() {
    this.$nextTick(() => {
      this.load()
      this.getList()
    })
  }
};
</script>

<style lang="less" >
@import './style.less';
</style>
