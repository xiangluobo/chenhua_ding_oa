<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">申请人</div>
      <div class="role">管理员</div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        class="mod-field"
        name="picker"
        :value="departName"
        label="所在项目部"
        :rules="[{ required: true, message: '请输入正确内容' }]"
        right-icon="arrow"
        placeholder="请选择项目部"
        @click="showPicker = true"
      />
      <van-field
        v-model="value"
        name="validator"
        label="付款金额"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="value"
        name="validator"
        label="累计付款"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="value"
        name="validator"
        label="合同金额"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="value"
        name="validator"
        label="收款人全称"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="value"
        name="validator"
        label="收款人账户"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="value"
        name="validator"
        label="开户行地址"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- <van-field
        v-model="value"
        name="validator"
        label="付款方式"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      /> -->
      <van-field
        readonly
        clickable
        class="mod-field"
        name="picker"
        :value="payType"
        label="付款方式"
        :rules="[{ required: true, message: '请选择付款方式' }]"
        right-icon="arrow"
        placeholder="付款方式"
        @click="showPayType = true"
      />
      <van-field
        v-model="value"
        name="validator"
        label="付款说明"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="value"
        name="validator"
        label="其它说明要求"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <van-field name="uploader" class="mod-field" label="相关文件">
        <template #input>
          <van-uploader :after-read="afterRead" v-model="uploader" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button square block type="info" color="#000" @click="onSubmit">
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
      checked: false,
      departName: '',
      id: '',
      payType: '',
      payTypeVal: '',
      showPicker: false,
      showPayType: false,
      columns: [],
      payTypeColumns: [],
      value: '',
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      list: [
        {
          checked: false,
          project: '',
          summary: '',
          money: ''
        }
      ],
      loading: false
    }
  },
  created() {
    this.getMyProjectList()
    this.getPayType()
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
    validator(val) {
      return /1\d{10}/.test(val)
    },
    onConfirmPayType(item) {
      this.payType = item.text
      this.payTypeVal = item.value;
      this.showPayType = false;
    },
    onConfirm(item) {
      this.id = item.id
      this.departName = item.departName;
      this.showPicker = false;
    },
    onSubmit() {
      // this.loading = false
      // if (!this.value) {
      //   Toast.fail('请选择项目部')
      //   return false
      // }
      // if (this.list.some(v => !v.project || !v.summary || !v.money)) {
      //   Toast.fail('报销明细填写有问题，请仔细检查')
      //   return false
      // }
      // this.loading = true
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
        // let imgPath = res.message
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
