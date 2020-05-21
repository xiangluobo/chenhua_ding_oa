import axios from 'axios'

let instance = null

instance = axios.create({
  baseURL: '/'
})

instance.interceptors.request.use(async config => {
  // const { access_token: accessToken, token_type: tokenType } = await getUser()
  // config.headers.Authorization = ` ${tokenType} ${accessToken}`
  // if (config.method === 'post') {
  //   config.data = Qs.stringify(config.data)
  // }
  console.log(config, 888)
  return config
})
instance.interceptors.response.use(res => {
  return res.data
}, ({ response }) => {
  return Promise.reject(response.data)
})

export default instance
