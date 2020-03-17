import { getAxios,putAxios,patchAxios,postJSON,deleteAxios,postAxios } from '../../tools/request'
import {constantFunMap} from '../../router/config'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const path = config.mainPath + "idsecurity";

// 获取角色列表的数据
export function getRoleList(){
  return getAxios(path + '/RoleResource/v1/auth/roles')
}
// 获取角色对应的树信息
export function getRoleTreeList(roleid) {
  return getAxios(path + `/RoleResource/v1/auth/roles-resources/${roleid}`)
}
// 树节点勾选状态更新
export function addNodesCheck(data) {
  return postJSON(path + `/RoleResource/v1/auth/roles-resources`,data)
}
// 添加角色组信息
export function addRoleGroup(roleId,groupId) {
  return postAxios(path + `/RoleResource/v1/auth/roles-groups/${roleId}/${groupId}`)
}
// 删除角色组信息
export function deleteRoleGroupInfo(roleId,groupId) {
  return deleteAxios(path + `/RoleResource/v1/auth/roles-groups/${roleId}/${groupId}`)
}

// 删除角色组中的用户组
export function deleteRoleGroup(roleId) {
  return deleteAxios(path + `/RoleResource/v1/auth/roles-groups/${roleId}`)
}

// 删除角色信息
export function deleteRoleInfo(roleId) {
  return deleteAxios(path + `/RoleResource/v1/auth/roles/${roleId}`)
}

// 添加页面节点
export function addPageNode(data) {
  return postJSON(path + `/PermissionResource/v1/auth/savePage`,data)
}

// 添加功能节点
export function addFunNode(data) {
  return postJSON(path + `/PermissionResource/v1/auth/saveResource`,data)
}

// 添加角色信息
export function addRoleInfo(data) {
  return postJSON(path + `/RoleResource/v1/auth/roles`,data)
} 

// 编辑角色信息
export function editRoleInfo(data) {
  return putAxios(path + `/RoleResource/v1/auth/roles/${data.roleId}`,null,data)
}

// 根据角色获取选中的用户组的信息
export function getRoleGroupInfo(roleId) {
  return getAxios(path + `/RoleResource/v1/auth/roles-groups/${roleId}`)
}