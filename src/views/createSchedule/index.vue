<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">日程基本信息</div>
    </div>
    <van-form>
      <van-field
        v-model='content'
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
        :value="time"
        label="日程时间"
        right-icon="calender-o"
        placeholder="请输入日程时间"
        @click="showCalendar = true"
      />
      <van-field
        v-model='remark'
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
     <van-calendar v-model="showCalendar" @confirm="onConfirm" />
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
      content: '',
      time: '',
      remark: '',
      showCalendar: false
    }
  },
  created() {

  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.showCalendar = false
      this.time = this.formatDate(date)
    },
    onSubmit() {
      if (!this.departName) {
        Toast.fail('请选择项目部')
        return false
      }
      if (this.flowYxExpenseItemsList.some(v => !v.expenseType || !v.expenseRemark || !v.expenseAmount)) {
        Toast.fail('报销明细填写有问题，请仔细检查')
        return false
      }
      this.$http
        .post('/yxexpense/flowYxExpense/add', {
          expenseTotal: this.expenseTotal,
          projectCode: this.orgCode,
          relatedFile: this.relatedFile.join(','),
          flowYxExpenseItemsList: this.flowYxExpenseItemsList
        })
        .then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
