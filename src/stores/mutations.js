/**
 * @Author: Andy Burns
 * @Date: 2019-08-22 14:30:51
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO](state, obj) {
    state.userInfo = obj
  },
  [types.REMOVE_USERINFO](state, obj) {
    state.userInfo = null
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.REMOVE_TOKEN](state) {
    state.token = ''
  },
  [types.ANNOUNCEMENT](state, announcement) {
    state.announcement = announcement
  }
}

export default mutations
