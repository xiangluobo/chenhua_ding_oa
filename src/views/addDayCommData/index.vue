<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">通用日报信息</div>
    </div>
    <van-form @submit='onSubmit'>
      <van-field
        v-model="reportTitle"
        label="*日报标题"
        type="text"
        class="mod-field"
        placeholder="请输入日报标题"
        :rules="[{ required: true, message: '请输入日报标题' }]"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        class="mod-field"
        :value="reportDate"
        label="*日报时间"
        right-icon="calender-o"
        placeholder="请输入日报时间"
        @click="showCalendar = true"
      />
      <van-field
        v-model='reportContent'
        label='*日报内容'
        rows="3"
        autosize
        type="textarea"
        class='mod-field'
        placeholder='请输入日报内容'
        :rules="[{ required: true, message: '请输入日报内容'}]"
      />
      <div style="margin: 16px;">
        <van-button square block type="info" color="#000" native-type='submit'>提交</van-button>
      </div>
    </van-form>
    <van-calendar :min-date='minDate' v-model="showCalendar" @confirm="onConfirm" />
  </section>
</template>

<script>
  import Vue from 'vue'
  import { Calendar, Button, Form, field, Toast } from 'vant'
  Vue.use(Calendar)
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(field)
  Vue.use(Toast)
  export default {
    data() {
      return {
        id: 0,
        reportTitle: '',
        reportDate: this.ChangeDateFormat(new Date()),
        reportContent: '',
        showCalendar: false,
        minDate: new Date(2019, 0, 1)
      }
    },
    created() {
      let { id, reportTitle, reportDate, reportContent } = this.$route.query
      if (id) {
        this.id = id
        this.reportTitle = reportTitle
        this.reportDate = reportDate
        this.reportContent = reportContent
      }
    },
    methods: {
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
        this.showCalendar = false
        this.reportDate = this.ChangeDateFormat(date)
      },
      onSubmit() {

        if (this.id) {
          this.$http.put('/report/reportCommon/edit', {
              id: this.id,
              reportTitle: this.reportTitle,
              reportDate: this.reportDate,
              reportContent: this.reportContent
            })
            .then(res => {
              if (res.success) {
                Toast.success('编辑成功')
                this.$router.push('/')
              } else {
                Toast.fail(res.message)
              }
            })
        } else {
          this.$http.post('/report/reportCommon/add', {
              reportTitle: this.reportTitle,
              reportDate: this.reportDate,
              reportContent: this.reportContent
            })
            .then(res => {
              if (res.success) {
                Toast.success('新建成功')
                this.$router.push('/')
              } else {
                Toast.fail(res.message)
              }
            })
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" >
  @import './style.less';
</style>
