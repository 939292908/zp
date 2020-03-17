/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 15:05:49
 * @LastEditTime: 2019-11-07 09:16:35
 * @LastEditors: Please set LastEditors
 */
import VueCookies from 'vue-cookies'
const TokenKey = 'PEACOCK_TOKEN_CF826AFC_1821_4AF0_8185_6D0EB68E4923'
const UserInfoKey = 'PEACOCK_USERINFO_CF826AFC_1821_4AF0_8185_6D0EB68E4923'

export function getToken() {
  return VueCookies.get(TokenKey)
}

export function setToken(token) {
  return VueCookies.set(TokenKey, token)
}

export function removeToken() {
  return VueCookies.remove(TokenKey)
}

//个人信息
export function setUserInfo(data) {
  return VueCookies.set(UserInfoKey, data)
}

export function getUserInfo() {
  let userInfo = VueCookies.get(UserInfoKey)
  return userInfo || JSON.parse('{}');
}

export function removeUserInfo() {
  return VueCookies.remove(UserInfoKey)
}
