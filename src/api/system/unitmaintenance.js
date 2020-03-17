import { req } from '../../tools/request'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const path = config.commonPath
//获取各级单位的数据
export const GET_UNIT_TREE_BY_CODE = (deptCode) => req('get', `${path}maindata/auth/v1/auth/dept/${deptCode}`);

//获取单位的汇总数据的统计
export const GET_UNIT_STATISTIC = () => req('get', `${path}maindata/auth/v1/auth/dept`);

//添加单位区划详情
export const POST_ADD_UNIT = (data) => req('post-json', `${path}maindata/auth/v1/auth/add`, data);

//修改单位区划详情
export const POST_UPDATE_UNIT = (data) => req('post-json', `${path}maindata/auth/v1/auth/dept`, data);

//停用\启用单位区划详情
export const POST_UPDATE_UNIT_STATE = (data) => req('post-json', `${path}maindata/auth/v1/auth/state`, data);

// 获取单位层级的数据
export const GET_UNIT_LEVEL_LIST = () => req('get',`${path}maindata/auth/v1/auth/level`)


// 单位绑定-获取单位-区划映射
export const GET_UNIT_BINDING_LIST = (params) => {
  return req('get',`${path}/maindata/binding/v1/binding/map`,null,params)
}

// 单位绑定-添加单位区划绑定
export const POST_ADD_UNIT_BINDING = (data) => {
  return req('post-json',`${path}/maindata/binding/v1/binding/map`, data)
}

// 修改部门默认绑定区划信息
export const SET_DEFAULT_AREA = (data) => {
  return req('post',`${path}/maindata/binding/v1/dept/default/area`,null, data)
}

// 单位绑定-删除单位区划绑定
export const DELETE_UNIT_BINDING = (data) => {
  return req('delete',`${path}/maindata/binding/v1/binding/map`, data)
}
