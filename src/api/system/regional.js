import {
  getAxios,
  putAxios,
  patchAxios,
  postJSON,
  deleteAxios,
  postAxios,
  req,
} from '../../tools/request'
import {
  constantFunMap
} from '../../router/config'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const path = config.commonPath
const collectPath =  config.collectPath
import { getToken } from '../../tools/authToken'

// 保存列表的数据
// export function saveList(data) {
//   return postJSON(`http://172.16.11.177:20005/maindata/urbanruralarea/v1/updatearea`,data)
// }
// export function addList(data) {
//   return postJSON(`http://172.16.11.177:20005/maindata/urbanruralarea/v1/addarea`,data)
// }
// export function stopList(data) {
//   return postJSON(`http://172.16.11.177:20005/maindata/urbanruralarea/v1/stoparea`,data)
// }
export function deleteDate(data) {
  return deleteAxios(`${collectPath}info/v1/info/areaTree/${data}`)
}
//保存数据
export function saveList(data) {
  return postJSON(`${path}maindata/urbanruralarea/v1/updatearea`,data)
}
//添加数据
export function addList(data) {
  return postJSON(`${path}maindata/urbanruralarea/v1/addarea`,data)
}

//停用数据
export function stopList(data) {
  return postJSON(`${path}maindata/urbanruralarea/v1/stoparea`,data)
}

//获取各级省市区的数据
export const GET_AREA_TREE_BY_CODE = (areaCode) => req('get', `${path}maindata/urbanruralarea/v1/simpleareatree/${areaCode}`)
// export const GET_AREA_TREE_BY_CODE = (areaCode) => req('get', `http://172.16.11.177:20005/maindata/urbanruralarea/v1/simpleareatree/${areaCode}`)
// 获取全国各级区市的数量
export const getRegionalCount = () => req('get', `${path}maindata/urbanruralarea/v1/count`)





