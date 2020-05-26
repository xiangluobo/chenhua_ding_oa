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
        :value="value"
        label="所在项目部"
        :rules="[{ required: true, message: '请输入正确内容' }]"
        right-icon="arrow"
        placeholder="请选择项目部"
        @click="showPicker = true"
      />
      <div class="mod-select">
        <div class="mod-label">人员选择</div>
        <el-select v-model="value3" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
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
      <van-field
        v-model="value"
        name="validator"
        label="付款方式"
        class="mod-field"
        placeholder="无需填写自动计算"
        :rules="[{ validator, message: '请输入正确内容' }]"
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
          <van-uploader :before-read="beforeRead" v-model="uploader" />
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
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
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
      value: '',
      value2: '',
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      list: [
        {
          checked: false,
          project: '',
          summary: '',
          money: ''
        }
      ],
      loading: false,
      value1: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value3: ''
    }
  },
  created() {
  },
  methods: {
    validator(val) {
      return /1\d{10}/.test(val)
    },
    onConfirm(value) {
      this.value = value;
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
    beforeRead(file) {
      console.log(file)
      if (file.type !== 'image/jpeg') {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
