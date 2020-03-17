/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 15:15:42
 * @LastEditTime: 2019-10-29 21:38:17
 * @LastEditors: Please set LastEditors
 */
import {
  getAxios,
  putAxios,
  patchAxios,
  postJSON,
  deleteAxios,
  postAxios
} from '../../tools/request'
import {
  constantFunMap
} from '../../router/config'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const path = config.mainPath + "idsecurity";

// const paths = config.sockets;
// 获取用户列表
export function getUserList(data) {
  return postJSON(path + '/UserResource/v1/auth/pageuser',data)
}
// 获取部门树的数据
export function getDeptListData() {
  return getAxios(path + '/DeptResource/v1/auth/depts')
}
// 添加用户信息
export function addUserData(data) {
  return postJSON(path + `/UserResource/v1/auth/users`, data)
}
// 编辑用户信息
export function editUserData(data) {
  return putAxios(path + `/UserResource/v1/auth/users`, null, data)
}

// 更新用户状态
export function updateUserState(userId, state) {
  return patchAxios(path + `/UserResource/v1/auth/users/${userId}/${state}`)
}

// 获取当前账号的用户信息
export function getTokenUserInfo() {
  return getAxios(`${path}/UserLoginResource/v1/auth/loginuser/info`)
}

// PKI根据token登录系统
export function pkiLogin(data) {
  return postJSON(`${path}/pkicertification/v1/pki/certification`, data)
}

// 根据系统客户获取PKI认证信息
export function getPkiClientInfo() {
  let pkiLocale = config.project.locale == 'gb' ? 'xjgb' : config.project.locale
  return getAxios(`${path}/pkicertification/v1/pki/config/${pkiLocale}`)
}

// 获取项目页面的权限数据
export function getPageRoles() {
  return getAxios(`${path}/UserResource/v1/auth/users-resources/page`)
}
// 根据页面ID获取页面功能点的权限
export function getPageFunById(pageId) {
  return getAxios(`${path}/UserResource/v1/auth/users-resources/${pageId}`)
}
//用户退出
export function loginOut() {
  return getAxios(`${path}/UserLoginResource/v1/auth/loginOut`)
}
//重置密码
export function resetPwd(id) {
  return patchAxios(`${path}/UserResource/v1/auth/users/${id}`)
}
