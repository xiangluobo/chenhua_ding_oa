/**
 * @Author: Andy Burns
 * @Date: 2019-08-22 14:30:51
 */

const state = {
  userInfo: sessionStorage.getItem('userInfo') || null,
  token: sessionStorage.getItem('token') || {}
}

export default state
