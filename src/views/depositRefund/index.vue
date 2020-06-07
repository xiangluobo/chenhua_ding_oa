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
        class="mod-field"
        placeholder="请输入面积"
        :rules="[{ required: true, message: '请输入面积' }]"
      />
      <van-field
        v-model="totalPrice"
        label="*总价"
        class="mod-field"
        placeholder="请输入总价"
        :rules="[{ required: true, message: '请输入总价' }]"
      />
      <van-field
        v-model="refundAmount"
        label="*最终退款额"
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
