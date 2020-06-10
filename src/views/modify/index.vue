<template>
  <section class="mod-modify">
    <van-form @submit="onSubmit">
      <van-field
        v-model="oldpassword"
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
        v-model="confirmpassword"
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
import { mapGetters, mapActions } from 'vuex'
import {
  Form,
  field,
  Button,
  Toast
} from 'vant'
Vue.use(Button)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
export default {
  data() {
    return {
      username: '',
      oldpassword: '',
      password: '',
      confirmpassword: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['signOut', 'removeToken']),
    onSubmit(values) {
      this.$http.put('/sys/setUserPassword', {
        username: this.userInfo.username,
        oldpassword: this.oldpassword,
        password: this.password,
        confirmpassword: this.confirmpassword
      }).then(res => {
        if (res.success) {
          this.signOut()
          this.removeToken()
          Toast.success('注销成功')
          this.$router.push('/login')
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
