<template>
  <section class="mod-taskDetail">
    <div class="mod-head">
      <div class="left">
        <div class="name">{{ content.taskName }}</div>
        <div class="time">截止时间： {{ content.endTime }}</div>
        <div class="extend">紧急程度：{{ content.importanceName }}</div>
        <div class="status" v-if="content.progressRate == 100">已完成</div>
        <div class="status" v-else>未完成</div>
      </div>
      <div class="middle" style="visibility: hidden">
        <van-circle v-model="content.progressRate" :rate="content.progressRate"  layer-color="#ebedf0" color="#f00" :size="70" :speed="100" :text="`任务进度${content.progressRate}%`" />
      </div>
      <div class="right">
        任务负责人{{ content.taskChargerName }}
      </div>
    </div>
    <dl class="mod-startTime">
      <dt>
        <span>开始时间</span>
        <span>{{ content.beginTime }}</span>
      </dt>
      <dd>
        <span>参与人</span>
        <span>{{ content.joinPeopleName }}</span>
      </dd>
    </dl>
    <div class="mod-explanation">追加说明</div>
    <div v-if="list.length">
      <div class="explanation" v-for="(item, index) in list" :key="index">
        <div class="title">{{ item.userName }} {{ item.createTime }}</div>
        <div class="content">
          {{ item.explainContent }}
        </div>
      </div>
    </div>
    <div class="mod-input">
      <van-field
        v-model="explainContent"
        clearable
        label=""
        placeholder="请输入追加说明"
      >
        <template #button>
          <van-button size="small" @click="onSubmit" color="#000">提交</van-button>
        </template>
      </van-field>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { Toast, Circle, Field, Button } from 'vant'
Vue.use(Toast)
Vue.use(Circle)
Vue.use(Field)
Vue.use(Button)
export default {
  data() {
    return {
      explainContent: '',
      id: '',
      content: {},
      list: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
    this.getMoreDetail()
  },
  methods: {
    getMoreDetail () {
      this.$http.get('/task/userTask/queryExplain', {
        params: {
          taskId: this.id
        }
      }).then(res => {
        this.list = res.result
      })
    },
    getDetail () {
      this.$http.get('/task/userTask/queryById', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.content = res.result
      })
    },
    onSubmit() {
      this.$http.post('/task/userTask/addExplain', {
        explainContent: this.explainContent,
        taskId: this.id
      }).then(res => {
        this.explainContent = ''
        if (res.success) {
          this.getMoreDetail()
          Toast.success('提交成功')
        } else {
          Toast.fail(res.message)
        }
      })
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
