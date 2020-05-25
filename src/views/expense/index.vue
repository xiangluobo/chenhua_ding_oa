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
        name="picker"
        :value="value"
        label="所在项目部"
        right-icon="arrow"
        placeholder="点击选择城市"
        @click="showPicker = true"
      />
      <van-field
        v-model="value2"
        name="validator"
        label="报销合计"
        placeholder="无需填写自动计算"
        readonly
      />
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader :before-read="beforeRead" v-model="uploader" />
        </template>
      </van-field>

      <dl class="mod-expsense-detail">
        <dt>
          <div class="name">报销明细</div>
          <div class="add">新增</div>
        </dt>
        <dd>
          <div class="mod-report">
            <div class="report">
              <div class="project">报销项目</div>
              <div class="summary">摘要</div>
              <div class="money">报销金额</div>
            </div>
            <div class="report">
              <van-radio name="1"></van-radio>
              <van-field v-model="value" label="" placeholder="请输入报销项目" />
              <van-field v-model="value" label="" placeholder="请输入摘要" />
              <van-field v-model="value" label="" placeholder="点击上传" />
            </div>
            <div class="report">
              <van-radio name="1"></van-radio>
              <van-field v-model="value" label="" placeholder="请输入报销项目" />
              <van-field v-model="value" label="" placeholder="请输入摘要" />
              <van-field v-model="value" label="" placeholder="点击上传" />
            </div>
            <div class="report">
              <van-radio name="1"></van-radio>
              <van-field v-model="value" label="" placeholder="请输入报销项目" />
              <van-field v-model="value" label="" placeholder="请输入摘要" />
              <van-field v-model="value" label="" placeholder="点击上传" />
            </div>
          </div>
        </dd>
      </dl>

      <div style="margin: 16px;">
        <van-button square block type="info" color="#000" native-type="submit">
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
import { Popup, Picker, Button, Form, field, Uploader, Radio } from 'vant'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(Uploader)
Vue.use(field)
Vue.use(Radio)
export default {
  data() {
    return {
      value: '',
      value2: '',
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false
    }
  },
  created() {
    console.log(process.env.VUE_APP_ERUDA, '====', process.env.VUE_APP_TEXT)
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onSubmit() {},
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
