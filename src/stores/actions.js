/**
 * @Author: Andy Burns
 * @Date: 2019-08-22 14:30:51
 */

import * as types from './mutation-types'
import { removeStore } from '../utils'

export const setUserInfo = function ({ commit }, obj) {
  window.sessionStorage.setItem('userInfo', JSON.stringify(obj))
  commit(types.SET_USERINFO, obj)
}

export const signOut = function({ commit }) {
  removeStore('userInfo')
  commit(types.REMOVE_USERINFO, null)
}

export const setToken = function ({ commit }, token) {
  window.sessionStorage.setItem('token', token)
  commit(types.SET_TOKEN, token)
}

export const removeToken = function({ commit }) {
  removeStore('token')
  commit(types.REMOVE_TOKEN, null)
}

export const setAnnouncement = function({ commit }) {
  window.myVue.$http.get('/sys/sysAnnouncementSend/getMyAnnouncementSend', {
    params: {
      msgCategory: 1,
      pageSize: 10,
      pageNo: 1
    }
  }).then(res => {
    commit(types.ANNOUNCEMENT, res.result.records)
  })
}
