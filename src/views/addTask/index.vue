<template>
  <section class="mod-expense">
    <van-form @submit="onSubmit">
      <van-field
        v-model="taskName"
        label="*任务名称"
        type="text"
        class="mod-field"
        placeholder="请输入任务名称"
        :rules="[{ required: true, message: '请输入任务名称' }]"
      />
      <div class="mod-select">
        <div class="mod-label">*负责人</div>
        <el-select
          v-model="taskCharger"
          filterable
          remote
          allow-create
          reserve-keyword
          placeholder="请输入负责人"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.payeeAccount"
            :label="item.payeeName"
            :value="item.payeeName">
          </el-option>
        </el-select>
      </div>
      <van-field
        readonly
        clickable
        name="calendar"
        class="mod-field"
        :value="beginTime"
        :min-date='minDate'
        label="开始时间"
        right-icon="calender-o"
        placeholder="请输入开始时间"
        @click="showCalendar = true"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        class="mod-field"
        :value="endTime"
        label="结束时间"
        right-icon="calender-o"
        placeholder="请输入结束时间"
        @click="showCalendar1 = true"
      />
      <van-field
        v-model="progressRate"
        label="*进度"
        class="mod-field"
        placeholder="请输入进度"
        type="number"
        :rules="[{ required: true, message: '请输入进度' }]"
      />
      <van-field
        class="mod-field"
        v-model="importance"
        label="*重要程度"
        type="number"
        :rules="[{ required: true, message: '请输入重要程度' }]"
        placeholder="请输入重要程度"
      />
      <div class="mod-select">
        <div class="mod-label">*参与人</div>
        <el-select
          v-model="joinPeople"
          filterable
          remote
          reserve-keyword
          placeholder="请输入参与人"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.payeeName"
            :label="item.payeeName"
            :value="item.payeeName">
          </el-option>
        </el-select>
      </div>
      <van-field
        v-model="taskDetails"
        label="*任务详情"
        class="mod-field"
        placeholder="请输入任务详情"
        :rules="[{ required: true, message: '请输入任务详情' }]"
      />
      <van-field
        v-model='taskNote'
        label='备注'
        rows="3"
        autosize
        type="textarea"
        class='mod-field'
        placeholder='请输入备注'
      />
      <div style="margin: 16px;">
        <van-button square block type="info" color="#000" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-calendar v-model="showCalendar" @confirm="onConfirm" />
    <van-calendar v-model="showCalendar1" @confirm="onConfirm1" />
  </section>
</template>

<script>
import Vue from 'vue'
import { Picker, Button, Form, field, Toast, Loading, Calendar } from 'vant'
import { Select, Option } from 'element-ui'
Vue.use(Calendar)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Select)
Vue.use(Option)
export default {
  data() {
    return {
      minDate: new Date(2019, 0, 1),
      taskName: '',
      taskCharger: '',
      joinPeople: '',
      beginTime: '',
      endTime: '',
      progressRate: '',
      importance: '',
      taskDetails: '',
      taskNote: '',
      showCalendar: false,
      showCalendar1: false,
      options: [],
      loading: false
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
      this.beginTime = this.formatDate(date)
    },
    onConfirm1(date) {
      this.showCalendar1 = false
      this.endTime = this.formatDate(date)
    },
    remoteMethod (query) {
      this.$http.get('/ggpay/flowGgPay/getPayeeData', {
        params: {
          payeeName: query
        }
      }).then(res => {
        this.options = res.result
      })
    },
    onSubmit() {
      this.$http.post('/task/userTask/add', {
        taskName: this.taskName, // 付款金额
        taskCharger: this.taskCharger, // 累计付款
        joinPeople: this.joinPeople, // 合同金额
        beginTime: this.beginTime, // 收款人全称
        endTime: this.endTime,
        progressRate: this.progressRate,
        importance: this.importance,
        taskDetails: this.taskDetails,
        taskNote: this.taskNote
      }).then(res => {
        if (res.success) {
          Toast.success('保存成功')
          this.$router.push('/')
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
