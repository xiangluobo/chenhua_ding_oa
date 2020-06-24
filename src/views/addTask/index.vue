<template>
  <section class="mod-expense">
    <van-form @submit="onSubmit">
      <van-field
        v-model="payAmount"
        label="*任务名称"
        type="text"
        class="mod-field"
        placeholder="请输入任务名称"
        :rules="[{ required: true, message: '请输入任务名称' }]"
      />
      <div class="mod-select">
        <div class="mod-label">*负责人</div>
        <el-select
          v-model="payeeName"
          filterable
          remote
          @change="onChange"
          reserve-keyword
          placeholder="请输入负责人"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.payeeName"
            :label="item.payeeName"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <van-field
        readonly
        clickable
        name="calendar"
        class="mod-field"
        :value="beginTime"
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
        v-model="payeeAccount"
        label="*进度"
        class="mod-field"
        placeholder="请输入合同金额"
        :rules="[{ required: true, message: '请输入合同金额' }]"
      />
      <van-field
        readonly
        clickable
        class="mod-field"
        name="picker"
        :value="payTypeVal"
        label="*重要程度"
        :rules="[{ required: true, message: '请输入重要程度' }]"
        right-icon="arrow"
        placeholder="请输入重要程度"
        @click="showPayType = true"
      />
      <div class="mod-select">
        <div class="mod-label">*参与人</div>
        <el-select
          v-model="payeeName"
          filterable
          remote
          @change="onChange"
          reserve-keyword
          placeholder="请输入参与人"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.payeeName"
            :label="item.payeeName"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <van-field
        v-model="payeeBank"
        label="*任务详情"
        class="mod-field"
        placeholder="请输入任务详情"
        :rules="[{ required: true, message: '请输入任务详情' }]"
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
      <div style="margin: 16px;">
        <van-button square block type="info" color="#000" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model="showPayType" position="bottom">
      <van-picker
        show-toolbar
        :columns="payTypeColumns"
        @confirm="onConfirmPayType"
        @cancel="showPayType = false"
      />
    </van-popup>
    <van-calendar v-model="showCalendar" @confirm="onConfirm" />
    <van-calendar v-model="showCalendar1" @confirm="onConfirm1" />
  </section>
</template>

<script>
import Vue from 'vue'
import { Popup, Picker, Button, Form, field, Toast, Loading, Calendar } from 'vant'
import { Select, Option } from 'element-ui'
Vue.use(Calendar)
Vue.use(Popup)
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
      beginTime: '',
      endTime: '',
      remark: '',
      showCalendar: false,
      showCalendar1: false,
      payAmount: '', // 付款金额
      payAmountTotal: '', // 累计付款
      contractAmount: '', // 合同金额
      payeeName: {}, // 收款人全称
      payeeAccount: '',
      payeeBank: '',
      payType: '',
      payTypeVal: '',
      payDesc: '',
      otherRequire: '',
      showPicker: false,
      showPayType: false,
      columns: [],
      payTypeColumns: [],
      options: [],
      loading: false
    }
  },
  created() {
    this.getMyProjectList()
    this.getPayType()
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
    onChange () {
      let { payAmountTotal, payeeAccount, payeeBank } = this.payeeName
      this.payAmountTotal = payAmountTotal
      this.payeeAccount = payeeAccount
      this.payeeBank = payeeBank
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
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result
      })
    },
    getPayType() {
      this.$http.get('/sys/dict/getDictItems/oa_pay_type').then(res => {
        this.payTypeColumns = res.result
      })
    },
    onConfirmPayType(item) {
      this.payType = item.value
      this.payTypeVal = item.text;
      this.showPayType = false;
    },
    onSubmit() {
      this.$http.post('/ggpay/flowGgPay/add', {
        payAmount: this.payAmount, // 付款金额
        payAmountTotal: this.payAmountTotal, // 累计付款
        contractAmount: this.contractAmount, // 合同金额
        payeeName: this.payeeName.payeeName, // 收款人全称
        payeeAccount: this.payeeAccount,
        payeeBank: this.payeeBank,
        payType: this.payType,
        payTypeVal: this.payTypeVal,
        payDesc: this.payDesc,
        otherRequire: this.otherRequire,
        relatedFile: this.relatedFile.join(',')
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
