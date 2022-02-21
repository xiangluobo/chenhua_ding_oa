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
        type="number"
        class="mod-field"
        placeholder="请输入付款金额"
        :rules="[{ required: true, message: '请输入付款金额' }]"
      />
      <van-field
        v-model="contractAmount"
        label="*合同金额"
        type="number"
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
        v-model="payAmountTotal"
        label="*累计付款"
        type="number"
        class="mod-field"
        placeholder="请输入累计付款"
        :rules="[{ required: true, message: '请输入累计付款' }]"
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
      />
      <van-field name="uploader" class="mod-field" label="相关文件">
        <template #input>
          <van-uploader accept=".xlsx,.xls,.docx,.doc,.png,.jpg,.jpeg,.bmp" :before-delete="uploadDelete" :after-read='afterRead' v-model='fileList' />
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
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(Uploader)
Vue.use(field)
Vue.use(Toast)
Vue.use(Loading)
export default {
  data() {
    return {
      departName: '',
      payAmount: '', // 付款金额
      payAmountTotal: '', // 累计付款
      contractAmount: '', // 合同金额
      payeeName: '', // 收款人全称
      payeeAccount: '',
      payeeBank: '',
      payType: '4',
      payTypeVal: '转账支付',
      payDesc: '',
      otherRequire: '',
      showPicker: false,
      showPayType: false,
      columns: [],
      payTypeColumns: [],
      uploader: [],
      relatedFile: [],
      options: [],
      loading: false,
      states: ['Alabama', 'Alaska'],
      busiId: 0,
      id: 0,
      formData: {},
      fileList: []
    }
  },
  created() {
    this.getMyProjectList()
    this.getPayType()
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
    uploadDelete (item) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].url === item.url) {
          this.fileList.splice(i, 1)
          break
        }
      }
      this.relatedFile = this.fileList.map(v => v.url.replace(/http:\/\/127.0.0.1:8080\/chenhuaoa\/sys\/common\/static\//g, ''))
    },
    getDetail () {
      this.$http.get('/ggpay/flowGgPay/queryById', {
        params: {
          id: this.busiId
        }
      }).then(res => {
        let result = res.result
        this.formData = result;
        this.id = result.id
        this.projectCode = result.projectCode
        this.departName = this.columns.find(v => v.orgCode === this.projectCode).departName
        this.payAmount = result.payAmount
        this.payAmountTotal = result.payAmountTotal
        this.contractAmount = result.contractAmount
        this.payeeName = result.payeeName
        this.payeeAccount = result.payeeAccount
        this.payeeBank = result.payeeBank
        this.payType = result.payType
        this.payTypeVal = this.payTypeColumns.find(v => +v.value === this.payType).text
        this.payDesc = result.payDesc
        this.otherRequire = result.otherRequire
        if (result.relatedFile) {
          this.relatedFile = result.relatedFile.split(',')
          let fileList = this.relatedFile.map(v => {
            return {
              url: `http://127.0.0.1:8080/chenhuaoa/sys/common/static/${v}`
            }
          })
          this.fileList = fileList
        }
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
    onConfirm(item) {
      this.departName = item.departName;
      this.projectCode = item.orgCode;
      this.showPicker = false;
    },
    onSubmit() {
      if (this.id) {
        this.formData.projectCode = this.projectCode
        this.formData.departName = this.departName
        this.formData.payAmount = this.payAmount
        this.formData.payAmountTotal = this.payAmountTotal
        this.formData.contractAmount = this.contractAmount
        this.formData.payeeName = this.payeeName
        this.formData.payeeAccount = this.payeeAccount
        this.formData.payeeBank = this.payeeBank
        this.formData.payType = this.payType
        this.formData.payTypeVal = this.payTypeVal
        this.formData.payDesc = this.payDesc
        this.formData.otherRequire = this.otherRequire
        this.formData.relatedFile = this.relatedFile.join(',')
        this.$http.put('/ggpay/flowGgPay/edit', this.formData).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http.post('/ggpay/flowGgPay/add', {
          projectCode: this.projectCode,
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
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      }
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
