<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">申请人</div>
      <div class="role">{{userInfo.realname}}</div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        class="mod-field"
        name="picker"
        :value="departName"
        label="*所在项目部"
        :rules="[{ required: true, message: '请选择项目部' }]"
        right-icon="arrow"
        placeholder="请选择项目部"
        @click="showPicker = true"
      />
      <van-field
        v-model="vipCardNo"
        label="*VIP卡号"
        class="mod-field"
        placeholder="请输入VIP卡号"
        :rules="[{ required: true, message: '请输入VIP卡号' }]"
      />
      <van-field
        v-model="custName"
        label="*客户姓名"
        class="mod-field"
        placeholder="请输入客户姓名"
        :rules="[{ required: true, message: '请输入客户姓名' }]"
      />
      <van-field
        v-model="identityNo"
        label="*身份证号"
        class="mod-field"
        placeholder="请输入身份证号"
        :rules="[{ required: true, message: '请输入身份证号' }]"
      />
      <van-field
        v-model="rcAmount"
        label="*认筹金额"
        class="mod-field"
        placeholder="请输入认筹金额"
        type="number"
        :rules="[{ required: true, message: '请输入认筹金额' }]"
      />
      <van-field
        v-model="bankUser"
        label="*银行户主"
        class="mod-field"
        placeholder="请输入银行户主"
        :rules="[{ required: true, message: '请输入银行户主' }]"
      />
      <van-field
        v-model="bankAccount"
        label="*银行账号"
        class="mod-field"
        placeholder="请输入银行账号"
        :rules="[{ required: true, message: '请输入银行账号' }]"
      />
      <van-field
        v-model="bankName"
        label="*银行名称"
        class="mod-field"
        placeholder="请输入银行名称"
        :rules="[{ required: true, message: '请输入银行名称' }]"
      />
      <van-field
        v-model="bankAddr"
        label="*支行地址"
        class="mod-field"
        placeholder="请输入支行地址"
        :rules="[{ required: true, message: '请输入支行地址' }]"
      />
      <van-field
        v-model="remarks"
        label="备注"
        class="mod-field"
        placeholder="请输入备注"
      />
      <van-field
        v-model="refundDesc"
        label="退款情况说明"
        class="mod-field"
        placeholder="请输入退款情况说明"
      />
      <div style="margin: 16px;">
        <van-button square block type="info" color="#000" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="departName"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Popup, Picker, Button, Form, field, Toast } from 'vant'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
export default {
  data() {
    return {
      departName: '',
      vipCardNo: '',
      custName: '',
      identityNo: '',
      rcAmount: '',
      bankUser: '',
      bankAccount: '',
      bankName: '',
      bankAddr: '',
      remarks: '',
      refundDesc: '',
      showPicker: false,
      columns: [],
      busiId: 0,
      id: 0,
      formData: {}
    }
  },
  created() {
    this.getMyProjectList()
    this.busiId = this.$route.query.busiId || 0
    if (this.busiId) {
      setTimeout(() => {
        this.getDetail()
      }, 500)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getDetail () {
      this.$http.get('/rc/flowRcRefund/queryById', {
        params: {
          id: this.busiId
        }
      }).then(res => {
        let result = res.result
        this.formData = result;
        this.id = result.id
        this.procInstId = result.procInstId
        this.projectCode = result.projectCode
        this.departName = this.columns.find(v => v.orgCode === this.projectCode).departName
        this.bankAccount = result.bankAccount
        this.bankAddr = result.bankAddr
        this.bankName = result.bankName
        this.bankUser = result.bankUser
        this.custName = result.custName
        this.identityNo = result.identityNo
        this.rcAmount = result.rcAmount
        this.refundDesc = result.refundDesc
        this.remarks = result.remarks
        this.vipCardNo = result.vipCardNo
      })
    },
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result
      })
    },
    onConfirm(item) {
      this.departName = item.departName
      this.projectCode = item.orgCode
      this.showPicker = false
    },
    onSubmit() {
      if (this.id) {
        this.formData.projectCode = this.projectCode
        this.formData.vipCardNo = this.vipCardNo
        this.formData.custName = this.custName
        this.formData.identityNo = this.identityNo
        this.formData.rcAmount = this.rcAmount
        this.formData.bankUser = this.bankUser
        this.formData.bankAccount = this.bankAccount
        this.formData.bankName = this.bankName
        this.formData.bankAddr = this.bankAddr
        this.formData.remarks = this.remarks
        this.formData.refundDesc = this.refundDesc
        this.$http.put('/rc/flowRcRefund/edit', this.formData).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http.post('/rc/flowRcRefund/add', {
          projectCode: this.projectCode,
          vipCardNo: this.vipCardNo,
          custName: this.custName,
          identityNo: this.identityNo,
          rcAmount: this.rcAmount,
          bankUser: this.bankUser,
          bankAccount: this.bankAccount,
          bankName: this.bankName,
          bankAddr: this.bankAddr,
          remarks: this.remarks,
          refundDesc: this.refundDesc
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
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
