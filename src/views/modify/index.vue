<template>
  <section class="mod-modify">
    <van-form @submit="onSubmit">
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="原密码"
        placeholder=""
        :rules="[{ required: true, message: '请填写原密码' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="修改密码"
        placeholder=""
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="确认密码"
        placeholder=""
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <div style="margin: 286px 20px 0;">
        <van-button color="rgb(182,154,106)" block type="info" native-type="submit">
          <span style="color:#000; font-weight:400">保存</span>
        </van-button>
      </div>
    </van-form>
  </section>
</template>

<script>
import Vue from 'vue'
import {
  Form,
  field,
  Button
} from 'vant'
Vue.use(Button)
Vue.use(Form)
Vue.use(field)
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
