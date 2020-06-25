<template>
  <section class="mod-taskDetail">
    <div class="mod-head">
      <div class="left">
        <div class="name">任务名称</div>
        <div class="time">截止时间： 2020-03-23</div>
        <div class="extend">紧急程度：重要</div>
        <div class="status">未完成</div>
      </div>
      <div class="middle">
        <van-circle v-model="currentRate" :rate="50"  layer-color="#ebedf0" color="#f00" :size="70" :speed="100" :text="text" />
      </div>
      <div class="right">
        任务负责人姓名
      </div>
    </div>
    <dl class="mod-startTime">
      <dt>
        <span>开始时间</span>
        <span>开始时间</span>
      </dt>
      <dd>
        <span>参与人</span>
        <span>姓名</span>
        <span>姓名</span>
        <span>姓名</span>
      </dd>
    </dl>
    <div class="mod-explanation">追加说明</div>
    <div class="explanation">
      <div class="title">姓名 2020-07-12</div>
      <div class="content">
        文本内容
        文本内容
        文本内容
        文本内容
      </div>
    </div>
    <div class="mod-input">
      <van-field
        v-model="sms"
        clearable
        label=""
        placeholder="请输入追加说明"
      >
        <template #button>
          <van-button size="small" color="#000">提交</van-button>
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
      currentRate: 0,
      text: '任务进度51',
      sms: ''
    }
  },
  created() {
  },
  methods: {
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
      this.$http.post('/ggpay/flowGgPay/add', {
        projectCode: this.orgCode,
        departName: this.departName,
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
