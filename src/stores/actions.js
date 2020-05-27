/**
 * @Author: Andy Burns
 * @Date: 2019-08-22 14:30:51
 */

import * as types from './mutation-types'
import { saveStore, removeStore } from '../utils'

export const setUserInfo = function ({ commit }, obj) {
  commit(types.SET_USERINFO, saveStore('userInfo', JSON.stringify(obj)))
}

export const signOut = function({ commit }) {
  removeStore('userInfo')
  commit(types.REMOVE_USERINFO, null)
}

export const setToken = function ({ commit }, token) {
  commit(types.SET_TOKEN, saveStore('token', token))
}

export const removeToken = function({ commit }) {
  removeStore('token')
  commit(types.REMOVE_TOKEN, null)
}
