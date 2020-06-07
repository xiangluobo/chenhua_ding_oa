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
      orgCode: '',
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
      columns: []
    }
  },
  created() {
    this.getMyProjectList()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result
      })
    },
    onConfirm(item) {
      this.departName = item.departName
      this.orgCode = item.orgCode
      this.showPicker = false
    },
    onSubmit() {
      this.$http.post('/rc/flowRcRefund/add', {
        projectCode: this.orgCode,
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
