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
      <div class="unit" v-for="(item, index) in options" :key="index">
        <div class="title" @click="onEdit(item)">日程内容</div>
        <div class="content" @click="onEdit(item)">{{ item.scheContent }} (备注: {{item.scheRemarks}})</div>
        <van-button class="delete" type="info" @click="onDelete(item.id)" >删除</van-button>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { Calendar, Toast, Button } from 'vant'
Vue.use(Calendar)
Vue.use(Button)
Vue.use(Toast)
export default {
  data() {
    return {
      scheDate: this.ChangeDateFormat(new Date()),
      options: [],
      showCalendar: false,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2040, 1, 31)
    }
  },
  created() {
    this.getMySchedules()
  },
  methods: {
    onEdit (item) {
      this.$router.push(`/createSchedule?id=${item.id}&scheDate=${item.scheDate}&scheRemarks=${item.scheRemarks}&scheContent=${item.scheContent}`)
    },
    onDelete (id) {
      this.$http.delete('/schedule/userSchedule/delete', {
        params: {
          id: id
        }
      }).then(res => {
        this.getMySchedules()
        if (res.success) {
          Toast.success('删除成功')
        } else {
          Toast.fail(res.message)
        }
      })
    },
    ChangeDateFormat(val) {
      if (val != null) {
        var year = val.getFullYear()
        var month = val.getMonth() + 1
        var date = val.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (date < 10) {
          date = '0' + date
        }
        var time =
          year +
          '-' +
          month +
          '-' +
          date;
        return time
      }
      return ''
    },
    onConfirm(date) {
      this.scheDate = this.ChangeDateFormat(date)
      this.getMySchedules()
    },
    getMySchedules () {
      this.$http.get('/schedule/userSchedule/listByDate', {
        params: {
          scheDate: this.scheDate
        }
      }).then(res => {
        this.options = res.result
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
