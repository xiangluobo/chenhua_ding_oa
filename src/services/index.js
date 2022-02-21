import axios from 'axios'
import store from '../stores'
import router from '../routers'
import Vue from 'vue';
import { Toast } from 'vant'
Vue.use(Toast)
let instance = null

instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/chenhuaoa'
})

instance.interceptors.request.use(async config => {
  // const { access_token: accessToken, token_type: tokenType } = await getUser()
  // config.headers.Authorization = ` ${tokenType} ${accessToken}`
  // if (config.method === 'post') {
  //   config.data = Qs.stringify(config.data)
  // }
  if (config.url.indexOf('/flow/dealMyTodoBussi') > -1) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  if (config.url.indexOf('mLogin') === -1) {
    let token = store.state.token ? store.state.token : window.localStorage.getItem('token')
    config.headers['X-Access-Token'] = token
  }
  return config
})
instance.interceptors.response.use(res => {
  return res.data
}, ({ response }) => {
  Toast.fail(response.data.message)
  if (response.data.message === 'Token失效，请重新登录') {
    console.log('Token失效，请重新登录')
    router.push('/login')
  }
  return Promise.reject(response.data)
})

export default instance
