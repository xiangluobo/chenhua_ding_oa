import axios from 'axios'
import store from '../stores'
import router from '../routers'
let instance = null

instance = axios.create({
  baseURL: 'http://101.37.159.72:8080/chenhuaoa'
})

instance.interceptors.request.use(async config => {
  // const { access_token: accessToken, token_type: tokenType } = await getUser()
  // config.headers.Authorization = ` ${tokenType} ${accessToken}`
  // if (config.method === 'post') {
  //   config.data = Qs.stringify(config.data)
  // }
  if (config.url.indexOf('mLogin') === -1) {
    let token = store.state.token ? store.state.token : window.sessionStorage.getItem('token')
    config.headers['X-Access-Token'] = token
  }
  return config
})
instance.interceptors.response.use(res => {
  return res.data
}, ({ response }) => {
  if (response.data.message === 'Token失效，请重新登录') {
    console.log('Token失效，请重新登录')
    router.push('/login')
    return
  }
  return Promise.reject(response.data)
})

export default instance
