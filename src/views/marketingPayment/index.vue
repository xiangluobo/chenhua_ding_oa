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
        type="number"
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
        type="number"
        :rules="[{ required: true, message: '请输入合同金额' }]"
      />
      <div class="mod-select">
        <div class="mod-label">*收款人全称</div>
        <el-select
          v-model="payeeName"
          filterable
          remote
          reserve-keyword
          placeholder="请输入收款人全称"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <van-field
        v-model="payeeAccount"
        label="*收款人账号"
        class="mod-field"
        placeholder="请输入收款人账号"
        :rules="[{ required: true, message: '请输入收款人账号' }]"
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
        label="其它要求说明"
        class="mod-field"
        placeholder="请输入其它要求说明"
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
import { Popup, Picker, Button, Form, field, Uploader, Toast } from 'vant'
import { Select, Option } from 'element-ui'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Uploader)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
Vue.use(Select)
Vue.use(Option)
export default {
  data() {
    return {
      orgCode: '',
      departName: '',
      payAmount: '',
      payAmountTotal: '',
      contractAmount: '',
      payeeName: '',
      payeeAccount: '',
      payeeBank: '',
      payType: '',
      payTypeVal: '',
      payDesc: '',
      otherRequire: '',
      uploader: [],
      relatedFile: [],
      showPicker: false,
      showPayType: false,
      columns: [],
      payTypeColumns: [],
      options: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"]
    }
  },
  created() {
    this.getMyProjectList()
    this.getPayType()
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    })
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
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
    },
    onSubmit() {
      this.$http.post('/yxpay/flowYxPay/add', {
        projectCode: this.orgCode,
        payAmount: this.payAmount,
        payAmountTotal: this.payAmountTotal,
        contractAmount: this.contractAmount,
        payeeName: this.payeeName,
        payeeAccount: this.payeeAccount,
        payeeBank: this.payeeBank,
        payType: this.payType,
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
