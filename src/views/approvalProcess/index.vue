<template>
  <section class="mod-process">
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
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
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
      <!-- <div class="mod-unit">
        <div class="name">姓名</div>
        <div class="ctn">
          <h3>姓名提交的申请内容</h3>
          <div class="subtitle">
            标题文字<br>
            标题文字
            标题文字
          </div>
          <div class="audit">审核通过</div>
        </div>
        <div class="time">前天</div>
      </div>
      <div class="mod-unit">
        <div class="name">姓名</div>
        <div class="ctn">
          <h3>姓名提交的申请内容</h3>
          <div class="subtitle">
            标题文字<br>
            标题文字
            标题文字
          </div>
          <div class="audit">审核通过</div>
        </div>
        <div class="time">前天</div>
      </div> -->
    </van-list>
  </section>
</template>

<script>
import Vue from 'vue';
import { Search, Toast, List } from 'vant';
Vue.use(Search);
Vue.use(List);
export default {
  data() {
    return {
      type: '',
      currentNum: 0,
      tabs: [
        {
          bpmState: 1,
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
      keywords: '',
      bpmState: 2,
      list: [],
      loading: false,
      finished: false,
      pageNo: 1,
      pageSize: 5
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
      this.onLoad()
    },
    onSearch(val) {
      this.list = []
      this.pageNo = 1
      this.onLoad()
    },
    onLoad() {
      this.$http.get('/flow/getMyTodoBussiList', {
        params: {
          keywords: this.keywords,
          bpmState: this.bpmState,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(res => {
        // 加载状态结束
        this.loading = false
        let records = res.result.records
        if (records.length) {
          this.pageNo += 1
          this.list = this.list.concat(records)
        } else {
          this.finished = true
        }
      })
    },
    goToDetail(item) {
      this.$router.push(`/processDetail?id=${item.id}&taskId=${item.taskId}&procInstId=${item.procInstId}&bpmState_dictText=${item.bpmState_dictText}`)
    }
  },
  created() {
    this.onLoad()
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
