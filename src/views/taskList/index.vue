<template>
  <section class="mod-taskList" ref="wrapper">
    <div>
      <div class="mod-tabs">
        <span v-for="(item, index) in tabs" :key="item.id" :class="{active: index===currentNum}" @click="setActive(index, item)">{{ item.name }}</span>
      </div>
      <div @click="goToDetail(item)" class="mod-unit" v-for="(item, index) in list" :key="index">
        <div class="ctn">
          <div class="title">{{ item.taskName }}</div>
          <div class="subtitle">
            创建人 {{ item.taskCharger }}
          </div>
          <div class="audit">创建时间 {{item.createTime}}</div>
        </div>
        <div class="persontage">
          <van-circle v-model="item.progressRate" :rate="item.progressRate"  layer-color="#ebedf0" color="#f00" :size="50" :speed="100" :text="`${item.progressRate}%`" />
        </div>
      </div>
      <van-loading v-if="loading" type="spinner" />
      <div v-if="!loading && tips" class="tips">{{ tips }} </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import { Search, Loading, Circle } from 'vant'
import BScroll from 'better-scroll'
Vue.use(Search)
Vue.use(Loading)
Vue.use(Circle)
export default {
  data() {
    return {
      currentNum: 0,
      tips: '',
      tabs: [
        {
          name: '未完成',
          id: 0
        },
        {
          name: '已完成',
          id: 100
        }
      ],
      progressRate: 0,
      list: [],
      pageNo: 1,
      pageSize: 5,
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
    }
  },
  filters: {
    filterTime(val) {
      return val.substr(0, 10)
    }
  },
  methods: {
    setActive(i, item) {
      this.progressRate = item.id
      this.currentNum = i
      this.pageNo = 1
      this.list = []
      this.getList()
    },
    getList() {
      this.loading = true
      this.$http.get('/task/userTask/list', {
        params: {
          progressRate: this.progressRate,
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
      this.$router.push(`/taskDetail?id=${item.id}`)
    },
    destroyed() {
      this.scroll.destroy()
      this.scroll = null
    }
  },
  created() {
    // this.type = this.$route.query.type
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
