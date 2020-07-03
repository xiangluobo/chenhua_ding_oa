<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">日程基本信息</div>
    </div>
    <van-form>
      <van-field
        v-model='scheContent'
        label='*日程内容'
        rows="3"
        autosize
        type="textarea"
        class='mod-field'
        placeholder='请输入日程内容'
        :rules="[{ required: true, message: '请输入日程内容'}]"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        class="mod-field"
        :value="scheDate"
        label="日程时间"
        right-icon="calender-o"
        placeholder="请输入日程时间"
        @click="showCalendar = true"
      />
      <van-field
        v-model='scheRemarks'
        label='备注'
        rows="3"
        autosize
        type="textarea"
        class='mod-field'
        placeholder='请输入备注'
      />
    </van-form>
    <div style="margin: 16px;">
      <van-button square block type="info" color="#000" @click="onSubmit">
        提交
      </van-button>
    </div>
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
      scheContent: '',
      scheDate: '',
      scheRemarks: '',
      showCalendar: false,
      minDate: new Date(2019, 0, 1)
    }
  },
  created() {
    let { id, scheDate, scheRemarks, scheContent } = this.$route.query
    if (id) {
      this.id = id
      this.scheDate = scheDate
      this.scheRemarks = scheRemarks
      this.scheContent = scheContent
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
      this.scheDate = this.ChangeDateFormat(date)
    },
    onSubmit() {
      if (this.id) {
        this.$http
          .put('/schedule/userSchedule/edit', {
            id: this.id,
            scheContent: this.scheContent,
            scheDate: this.scheDate,
            scheRemarks: this.scheRemarks
          })
          .then(res => {
            if (res.success) {
              Toast.success('编辑成功')
              this.$router.push('/mySchedule')
            } else {
              Toast.fail(res.message)
            }
          })
      } else {
        this.$http
          .post('/schedule/userSchedule/add', {
            scheContent: this.scheContent,
            scheDate: this.scheDate,
            scheRemarks: this.scheRemarks
          })
          .then(res => {
            if (res.success) {
              Toast.success('新建成功')
              this.$router.push('/mySchedule')
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
