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
        v-model="payAmount"
        label="*付款金额"
        class="mod-field"
        placeholder="请输入付款金额"
        :rules="[{ required: true, message: '请输入付款金额' }]"
      />
      <van-field
        v-model="payAmountTotal"
        label="*累计付款"
        class="mod-field"
        placeholder="请输入累计付款"
        :rules="[{ required: true, message: '请输入累计付款' }]"
      />
      <van-field
        v-model="contractAmount"
        label="*合同金额"
        class="mod-field"
        placeholder="请输入合同金额"
        :rules="[{ required: true, message: '请输入合同金额' }]"
      />
      <van-field
        v-model="payeeName"
        label="*收款人全称"
        class="mod-field"
        placeholder="请输入收款人全称"
        :rules="[{ required: true, message: '请输入收款人全称' }]"
      />
      <van-field
        v-model="payeeAccount"
        label="*收款人账户"
        class="mod-field"
        placeholder="请输入收款人账户"
        :rules="[{ required: true, message: '请输入收款人账户' }]"
      />
      <van-field
        v-model="payeeBank"
        label="*开户行地址"
        class="mod-field"
        placeholder="请输入开户行地址"
        :rules="[{ required: true, message: '请输入开户行地址' }]"
      />
      <van-field
        readonly
        clickable
        class="mod-field"
        name="picker"
        :value="payTypeVal"
        label="*付款方式"
        :rules="[{ required: true, message: '请选择付款方式' }]"
        right-icon="arrow"
        placeholder="请选择付款方式"
        @click="showPayType = true"
      />
      <van-field
        v-model="payDesc"
        label="*付款说明"
        class="mod-field"
        placeholder="请输入付款说明"
        :rules="[{ required: true, message: '请输入付款说明' }]"
      />
      <van-field
        v-model="otherRequire"
        label="其它说明要求"
        class="mod-field"
        placeholder="请输入其它说明要求"
        :rules="[{ required: true, message: '请输入其它说明要求' }]"
      />
      <van-field name="uploader" class="mod-field" label="相关文件">
        <template #input>
          <van-uploader :after-read="afterRead" v-model="uploader" />
        </template>
      </van-field>
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
    <van-popup v-model="showPayType" position="bottom">
      <van-picker
        show-toolbar
        :columns="payTypeColumns"
        @confirm="onConfirmPayType"
        @cancel="showPayType = false"
      />
    </van-popup>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Popup, Picker, Button, Form, field, Uploader, Toast, Loading } from 'vant'
import { Select, Option } from 'element-ui';
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(Uploader)
Vue.use(field)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Select)
Vue.use(Option)
export default {
  data() {
    return {
      orgCode: '',
      departName: '',
      payAmount: '', // 付款金额
      payAmountTotal: '', // 累计付款
      contractAmount: '', // 合同金额
      payeeName: '', // 收款人全称
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
      uploader: [],
      relatedFile: [],
      loading: false
    }
  },
  created() {
    this.getMyProjectList()
    this.getPayType()
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
    onConfirm(item) {
      this.departName = item.departName;
      this.orgCode = item.orgCode;
      this.showPicker = false;
    },
    onSubmit() {
      this.$http.post('/ggpay/flowGgPay/add', {
        projectCode: this.orgCode,
        departName: this.departName,
        payAmount: this.payAmount, // 付款金额
        payAmountTotal: this.payAmountTotal, // 累计付款
        contractAmount: this.contractAmount, // 合同金额
        payeeName: this.payeeName, // 收款人全称
        payeeAccount: this.payeeAccount,
        payeeBank: this.payeeBank,
        payType: this.payType,
        payTypeVal: this.payTypeVal,
        payDesc: this.payDesc,
        otherRequire: this.otherRequire,
        relatedFile: this.relatedFile.join(',')
      }).then(res => {
        console.log(res, 333)
      })
    },
    afterRead(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      let formData = new FormData()
      formData.append('file', file.file)
      formData.append('biz', 'ggpay')
      this.$http.post('/sys/common/upload', formData).then(res => {
        file.status = 'success'
        file.message = '上传成功'
        this.relatedFile.push(res.message)
      }).catch(err => {
        console.log(err)
        file.status = 'failed'
        file.message = '上传失败'
      })
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
