<template>
  <section class="mod-process">
    <van-search v-model="value" @search="onSearch" placeholder="请输入搜索关键词" />
    <div class="mod-tabs">
      <span v-for="(item, index) in tabs" :key="item.id" :class="{active: index===currentNum}" @click="setActive(index)">{{ item.name }}</span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
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
      </div>
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
      currentNum: 0,
      tabs: [
        {
          name: '全部',
          id: 1
        },
        {
          name: '待审核',
          id: 2
        },
        {
          name: '待审核',
          id: 3
        },
        {
          name: '待审核',
          id: 4
        }
      ],
      value: '',
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    setActive(i) {
      this.currentNum = i
    },
    onSearch(val) {
      Toast(val);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
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
