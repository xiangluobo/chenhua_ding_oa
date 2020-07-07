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
        v-model="telephone"
        label="*手机号码"
        class="mod-field"
        type="number"
        placeholder="请输入手机号码"
        :rules="[{ required: true, message: '请输入手机号码' }]"
      />
      <van-field
        v-model="houseNo"
        label="*房号栋号"
        class="mod-field"
        placeholder="请输入房号栋号"
        :rules="[{ required: true, message: '请输入房号栋号' }]"
      />
      <van-field
        v-model="houseArea"
        label="*面积(㎡)"
        type="number"
        class="mod-field"
        placeholder="请输入面积"
        :rules="[{ required: true, message: '请输入面积' }]"
      />
      <van-field
        v-model="totalPrice"
        label="*总价"
        type="number"
        class="mod-field"
        placeholder="请输入总价"
        :rules="[{ required: true, message: '请输入总价' }]"
      />
      <van-field
        v-model="refundAmount"
        label="*最终退款额"
        type="number"
        class="mod-field"
        placeholder="请输入最终退款额"
        :rules="[{ required: true, message: '请输入最终退款额' }]"
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
        v-model="buyDesc"
        label="购房交付情况"
        class="mod-field"
        placeholder="请输入购房交付情况"
      />
      <van-field
        v-model="refundReason"
        label="退房原因"
        class="mod-field"
        placeholder="请输入退房原因"
      />
      <van-field
        v-model="handleTips"
        label="处理意见"
        class="mod-field"
        placeholder="请输入处理意见"
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
      custName: '',
      identityNo: '',
      telephone: '',
      houseNo: '',
      houseArea: '',
      totalPrice: '',
      refundAmount: '',
      bankUser: '',
      bankAccount: '',
      bankName: '',
      bankAddr: '',
      buyDesc: '',
      refundReason: '',
      handleTips: '',
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
      this.$http.get('/djfk/flowDjfkRefund/queryById', {
        params: {
          id: this.busiId
        }
      }).then(res => {
        let result = res.result
        this.formData = result;
        this.id = result.id
        this.orgCode = result.sysOrgCode
        this.departName = this.columns.find(v => v.orgCode === this.orgCode).departName
        this.bankAccount = result.bankAccount
        this.bankAddr = result.bankAddr
        this.bankName = result.bankName
        this.bankUser = result.bankUser
        this.custName = result.custName
        this.identityNo = result.identityNo
        this.telephone = result.telephone
        this.houseNo = result.houseNo
        this.houseArea = result.houseArea
        this.totalPrice = result.totalPrice
        this.refundAmount = result.refundAmount
        this.buyDesc = result.buyDesc
        this.refundReason = result.refundReason
        this.handleTips = result.handleTips
      })
    },
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
      if (this.id) {
        this.formData.projectCode = this.orgCode
        this.formData.custName = this.custName
        this.formData.identityNo = this.identityNo
        this.formData.bankUser = this.bankUser
        this.formData.bankAccount = this.bankAccount
        this.formData.bankName = this.bankName
        this.formData.bankAddr = this.bankAddr
        this.formData.telephone = this.telephone
        this.formData.houseNo = this.houseNo
        this.formData.houseArea = this.houseArea
        this.formData.totalPrice = this.totalPrice
        this.formData.refundAmount = this.refundAmount
        this.formData.buyDesc = this.buyDesc
        this.formData.refundReason = this.refundReason
        this.formData.handleTips = this.handleTips
        this.$http.put('/djfk/flowDjfkRefund/edit', this.formData).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http.post('/djfk/flowDjfkRefund/add', {
          projectCode: this.orgCode,
          custName: this.custName,
          identityNo: this.identityNo,
          telephone: this.telephone,
          houseNo: this.houseNo,
          houseArea: this.houseArea,
          totalPrice: this.totalPrice,
          refundAmount: this.refundAmount,
          bankUser: this.bankUser,
          bankAccount: this.bankAccount,
          bankName: this.bankName,
          bankAddr: this.bankAddr,
          buyDesc: this.buyDesc,
          refundReason: this.refundReason,
          handleTips: this.handleTips
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
