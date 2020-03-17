/*
 * @Author: your name
 * @Date: 2019-09-25 15:05:49
 * @LastEditTime: 2019-10-29 22:05:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\api\system\userGroupManager.js
 */
import { getAxios,putAxios,patchAxios,postJSON,deleteAxios } from '../../tools/request'
import {constantFunMap} from '../../router/config'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const path = config.mainPath + "idsecurity";

// 获取用户组列表数据
export function getGroupList() {
  return getAxios(path + '/UserGroupResource/v1/auth/groups')
}

// 获取用户组关联的角色信息
export function getGroupRoleList(groupId) {
  return getAxios(path + `/UserGroupResource/v1/auth/group-roles/${groupId}`)
}

// 添加用户组信息
export function addGroupInfo(data) {
  return postJSON(path + `/UserGroupResource/v1/auth/groups`,data)
}

// 编辑用户组信息
export function editGroupInfo(data) {
  return putAxios(path + `/UserGroupResource/v1/auth/groups`,null,data)
}

// 删除用户组信息
export function deleteGroup(groupId) {
  return deleteAxios(path + `/UserGroupResource/v1/auth/groups/${groupId}`)
}

// 获取用户和组信息的列表数据
export function getGroupUserListData(data) {
  return postJSON(path + `/UserResource/v1/auth/pageuserForGroupSet`,data)
}

// 添加用户到用户组
export function addUserToGroup(data) {
  return postJSON(path + `/UserGroupResource/v1/auth/users-group`,data)
}

// 获取角色对应的树信息
export function getGroupRoleTreeList(groupIds) {
  return postJSON(path + `/RoleResource/v1/auth/group-resources/`,groupIds)
}

// 向用户组中添加或删除用户
export function addOrDelUserToGroup(data) {
  return postJSON(path + `/UserGroupResource/v1/auth/groupUserSet`,data)
}
