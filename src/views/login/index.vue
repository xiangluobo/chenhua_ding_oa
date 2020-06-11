<template>
  <div class="mod-login">
    <div class="mod-logo">
      <img src="~@/assets/images/logo.png">
    </div>
    <div class="mod-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="账户名"
          label=""
          left-icon="manager"
          placeholder="账户名"
          :rules="[{ required: true, message: '账户名' }]"
        />
        <van-field
          style="margin:20px 0 10px"
          v-model="password"
          type="password"
          name="密码"
          left-icon="lock"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="width:150px;">
          <van-checkbox v-model="checked" checked-color="rgb(182, 154, 106)" shape="square">记住密码</van-checkbox>
        </div>
        <div style="margin: 30px 20px;">
          <van-button round block type="default" native-type="submit">
            立即提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex'
import { Form, field, button, checkbox, Toast } from 'vant';
Vue.use(Form)
Vue.use(field)
Vue.use(button)
Vue.use(checkbox)
Vue.use(Toast)
export default {
  data() {
    return {
      username: '',
      password: '',
      checked: true
    }
  },
  created() {
    this.showFooter(false)
  },
  methods: {
    ...mapActions(['setUserInfo', 'setToken', 'showFooter']),
    onSubmit(values) {
      this.login()
    },
    // post请求
    login() {
      let loading = this.$loading()
      this.$http.post('/sys/mLogin', {
        username: this.username,
        password: this.password
      }).then(res => {
        loading.close()
        if (res.success) {
          let result = res.result
          Toast.success('登录成功')
          result.userInfo.userRole = result.userRole
          result.userInfo.userDepart = result.userDepart
          this.setUserInfo(result.userInfo)
          this.setToken(result.token)
          this.$router.push('/')
        } else {
          Toast.fail(res.message)
        }
      })
    }
  },
  beforeDestroy() {
    this.showFooter(true)
  }
}
</script>
<style lang="less">
.mod-login{
  width: 100%;
  height: 100vh;
  background-image: url("~@/assets/images/login.png");
  background-size: 100% 100%;
  .mod-logo{
    width: 100%;
    padding-top: 90px;
    img{
      width: 100px;
      margin: 0 auto;
      display: block;
    }
  }
  .mod-form{
    width: 80%;
    margin: 40px auto;
    .van-cell{
      border-radius: 3px;
      padding: 10px;
      background: rgb(239, 232, 223);
      .van-icon{
        margin-right: 10px;
        position: relative;
        top: -1px;
        font-size: 20px;
        color: rgb(182, 154, 106);
      }
    }
    .van-checkbox__label{
      color: rgb(239, 232, 223)
    }
    .van-button--default{
      background: rgb(239, 232, 223);
      color: rgb(182, 154, 106);
    }
  }
}
</style>
