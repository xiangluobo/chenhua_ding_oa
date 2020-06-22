<template>
  <section class="mod-schedule">
    <van-calendar
      :min-date="minDate"
      :max-date="maxDate"
      :poppable="false"
      :show-confirm="false"
      @select='onConfirm'
      :style="{ height: '350px' }"
    />
    <div class="mod-scheduleList">
      <div class="unit">
        <div class="title">日程内容</div>
        <div class="content">文字文字</div>
      </div>
      <div class="unit">
        <div class="title">日程内容</div>
        <div class="content">文字文字</div>
      </div>
      <div class="unit">
        <div class="title">日程内容</div>
        <div class="content">文字文字</div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { Calendar, Toast } from 'vant'
Vue.use(Calendar)
Vue.use(Toast)
export default {
  data() {
    return {
      list: [],
      showCalendar: false,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2040, 1, 31)
    }
  },
  created() {

  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.time = this.formatDate(date)
      console.log(this.time, 'this.time')
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
