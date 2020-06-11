/**
 * @Author: Andy Burns
 * @Date: 2019-08-22 14:30:51
 */

const state = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  token: localStorage.getItem('token') || {},
  announcement: [],
  showFooter: true
}

export default state
