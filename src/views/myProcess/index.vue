<template>
  <section class="mod-process" ref="wrapper">
    <div>
      <van-search
        v-model="keywords"
        show-action
        label=""
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <div class="mod-tabs">
        <span v-for="(item, index) in tabs" :key="item.id" :class="{active: index===currentNum}" @click="setActive(index, item)">{{ item.name }}</span>
      </div>
      <div @click="goToDetail(item)" class="mod-unit" v-for="(item, index) in list" :key="index">
        <div class="name">{{item.applyUser_dictText }}</div>
        <div class="ctn">
          <h3>{{ item.projectCode_dictText }}</h3>
          <div class="subtitle">
            {{ item.busiSummary }}
          </div>
          <div class="audit">{{item.bpmState_dictText}}</div>
        </div>
        <div class="time">{{item.applyTime | filterTime}}</div>
      </div>
      <van-loading v-if="loading" type="spinner" />
      <div v-if="!loading && tips" class="tips">{{ tips }} </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import { Search, Loading } from 'vant'
import BScroll from 'better-scroll'
Vue.use(Search)
Vue.use(Loading);
export default {
  data() {
    return {
      path: '',
      currentNum: 0,
      keywords: '',
      tips: '',
      tabs: [
        {
          bpmState: '',
          name: '全部',
          id: 1
        },
        {
          bpmState: 2,
          name: '待审核',
          id: 2
        },
        {
          bpmState: 3,
          name: '已通过',
          id: 3
        },
        {
          bpmState: 4,
          name: '未通过',
          id: 4
        }
      ],
      bpmState: '',
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
      loading: false
    };
  },
  filters: {
    filterTime(val) {
      return val.substr(0, 10)
    }
  },
  methods: {
    setActive(i, item) {
      this.bpmState = item.bpmState
      this.currentNum = i
      this.pageNo = 1
      this.list = []
      this.getList()
    },
    onSearch(val) {
      this.list = []
      this.pageNo = 1
      this.getList()
    },
    getList() {
      this.loading = true
      this.$http.get(`/flow/${this.path}`, {
        params: {
          keywords: this.keywords,
          bpmState: this.bpmState,
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
    goToDetail(item) {
      this.$router.push(`/processDetail?id=${item.id}&taskId=${item.taskId}&procInstId=${item.procInstId}&bpmState_dictText=${item.bpmState_dictText}&flowType_dictText=${item.flowType_dictText}`)
    }
  },
  created() {
    this.path = this.$route.query.path
    this.$nextTick(() => {
      this.load()
      this.getList()
    })
  },
  destroyed() {
    this.scroll.destroy()
    this.scroll = null
  }
};
</script>

<style lang="less" >
@import './style.less';
</style>
