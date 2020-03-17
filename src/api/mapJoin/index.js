/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 15:45:16
 * @LastEditTime : 2019-12-27 11:16:38
 * @LastEditors  : Please set LastEditors
 */
import {
  getAxios,
  postData,
  patchAxios,
  postJSON,
  deleteAxios,
  postForm,
  postFile,
  postAxios,
  req
} from '../../tools/request'
import {
  getToken
} from '../../tools/authToken'
import store from '@/store'
const $config = require('../../configs/config' + process.env.ENV_CONFIG).config
const _params = {
  token: getToken()
}
// 获取图形展示的数据
// export function getMapids(objs){
//   let params = Object.assign(JSON.parse(JSON.stringify(_params)),objs)
//   var data = new URLSearchParams();
//   Object.keys(params).forEach(key=>{
//     data.append(key, params[key]);
//   })
//   // /mapmergeresource/v1/map/tree/id
//   return postForm($config.joinPath + `MapSeriesParallelResource/v1/SeriesParallelMaps/tree/mapids`,data)
// }

// 获取个人信息（基本信息/查看档案基本信息）
export function getEssentialInfo(nodeId, type) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), {
    type
  })
  console.log(params, 2323);
  var data = new URLSearchParams();
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  })
  return postForm($config.joinPath + `PersonalRecordResource/v1/PersonInformation/id/${nodeId}`, data)
}

// 获取关联分析数据/查看档案关联分析
export function getCorrelationInfo(id, type) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), {
    id,
    type
  })
  console.log(params, 3333);
  var data = new URLSearchParams();
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  })
  return postForm($config.joinPath + `PersonalRecordResource/v1/associationAnalysis/id/${id}`, data)
}

// 根据关键字获取图谱列表
export function getMapsByKeyword(objs) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), objs)
  var data = new URLSearchParams();
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  })
  return postForm($config.joinPath + `MapSeriesParallelResource/v1/SeriesParallelMaps/keyword`, data)
}

// 根据单位获取图谱列表的数据
// export function getMapsByDept(objs){
//   let params = Object.assign(JSON.parse(JSON.stringify(_params)),objs)
//   var data = new URLSearchParams();
//   Object.keys(params).forEach(key=>{
//     data.append(key, params[key]);
//   })
//   return postForm($config.joinPath + `MapSeriesParallelResource/v1/SeriesParallelMaps/regions`,data)
// }





//修改的接口
// 获取图形展示的数据 (mapJoinNext)
export function getMapids(objs) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), objs)
  var data = new URLSearchParams();
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  })
  // /mapmergeresource/v1/map/tree/id
  return postForm($config.joinPath + `MapSeriesParallelResource/v1/map/tree/link/mapids`, data)
}

// 根据单位获取图谱列表的数据 (mapJoinNext)
export function getMapsByDept(objs) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), objs)
  var data = new URLSearchParams();
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  })
  return postForm($config.joinPath + `mapmergeresource/v1/map/dept/type`, data)
}

// 根据区域获取合并图谱信息
export function getMapListByDept(objs) {
  return postJSON($config.joinPath + `mapmergeresource/v1/maplist/dept/type`, objs)
}

// 根据单位获取图谱列表的数据 (mapJoinNext)-------巴州
export function getMapsByDeptBz(objs) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), objs)
  var data = new URLSearchParams();
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  })
  return postForm($config.joinPath + `/mapmergeresource/v1/map/region/type`, data)
}
// 获取宗教脉络体系概述信息
export function getReligiousOverviewDept(systemId) {
  return getAxios($config.joinPath + `/InheritanceSystemResource/v1/InheritanceSystem/system/${systemId}`)
}

// 获取人员档案信息
export const GET_PERSON_INFO_ARCHIVES = (idNumber, collectId) => {
  let tmpParams = collectId ? {
    collectId
  } : null
  return req('get', `${$config.joinPath}/archives/v1/person/${idNumber}`, null, tmpParams)
}

// 获取亲密度列表数据
export const GET_PERSON_INTIMACY_LIST = (idNumber, collectId) => {
  let tmpParams = collectId ? {
    collectId
  } : null
  return req('get', `${$config.joinPath}/archives/v1/person/Intimacy/${idNumber}`, null, tmpParams)
}

// 获取亲密度列表的详细数据
export const GET_PERSON_INTIMACY_DETAIL_LIST = (idNumber, intimacyIdNumber) => {
  return req('get', `${$config.joinPath}/archives/v1/person/Intimacy/detail`, null, {
    idNumber,
    intimacyIdNumber
  })
}

// 获取案件线索信息列表
export const GET_PERSON_CASECLUE_LIST = (idNumber) => {
  return req('get', `${$config.joinPath}/archives/v1/person/caseclue/${idNumber}`)
}

// 获取图谱档案信息
export const GET_MAP_INFO_ARCHIVES = (mapId) => {
  return req('get', `${$config.joinPath}/archives/v1/map/${mapId}`)
}

// 获取覆盖人员情况数据(人员状态)
export const POST_COVER_PERSON_STATE_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapCollectCoverPersonStatus`, params)
}

// 获取覆盖人员情况数据(五位一体)
export const POST_COVER_PERSON_FIVE_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapCollectCoverPersonFiveOneProperty`, params)
}

// 获取图谱采集单位绩效排名数据
export const POST_TP_COLLECT_PERFORMANCE_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapCollectAchievementsList`, params)
}

// 获取覆盖人员采集统计数据
export const POST_COVER_PERSON_COLLECT_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapCollectCoverPersonSummary`, params)
}

// 获取图谱采集统计数据
export const POST_TP_COLLECT_STATE_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapCollectStaticis`, params)
}

// 获取图谱汇总统计数据
export const POST_TP_SUMMARY_STATE_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapPersonCount`, params)
}

// 获取图谱状态统计数据
export const POST_MAP_STATE_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapStatusCount`, params)
}

// 看板图谱状态统计数据导出
export const POST_MAP_STATE_DASH_EXPOT_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/exportMapStatusCount`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}
// 看板图谱汇总统计数据导出
export const POST_DASH_EXPOT_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/exportMapPersonCount`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}

// 获取人员绩效统计
export const GET_PERFORMANCE_LIST = (obj) => {
  return req('post', `${$config.joinPath}/UserAchievementResource/v1/findMapPersonCount`, obj)
}

// 获取人员绩效excel表下载
export const GET_PERFORMANCE_EXCEL_URL = (obj) => {
  return req('post', `${$config.joinPath}/UserAchievementResource/v1/exportMapPersonCount`, obj, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}
// 获取人员绩效统计 合计
export const GET_PERFORMANCE_SUM_LIST = (obj) => {
  return req('post', `${$config.joinPath}/UserAchievementResource/v1/findMapPersonTotalLine`, obj)
}

// 获取系统使用统计
export const POST_SYSTEMUSAGE_STAT_LIST = (params) => {
  return req('post', `${$config.joinPath}/systemUseingResource/v1/findSystemUseingInfoList`, params)
}

// 系统使用统计列表数据导出
export const POST_SYSTEMUSEING_EXPOT_DATA = (params) => {
  return req('post', `${$config.joinPath}/systemUseingResource/v1/exportSystemUseingInfo`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}

// 获取图谱采集覆盖人员人数
export const POST_COVER_PERSON_TOTAL_DATA = (params) => {
  return req('post', `${$config.joinPath}/statisticalDashboardResource/v1/findMapCollectCoverPersonTotal`, params)
}

//获取图谱中某个人的关联图谱详细信息
export const GET_RELEVANCE_TP_INFO = () => {
  return req('get', `${$config.joinPath}/commonresource/v1/config/defaulttime`)
}

// 获取图谱采集总览
export const POST_TP_COLLECT_PANDECT_DATA = (params) => {
  return req('post', `${$config.joinPath}/DailyCollectDashboardResource/v1/dailyCollectSummaryViewer`, params)
}

// 获取采集图谱类型数据
export const POST_COLLECT_TYPE_DATA = (params) => {
  return req('post', `${$config.joinPath}/DailyCollectDashboardResource/v1/dailyCollectMapTypeViewer`, params)
}

// 获取单位图谱采集对比数据
export const POST_DEPT_COLLECT_DATA = (params) => {
  return req('post', `${$config.joinPath}/DailyCollectDashboardResource/v1/dailyCollectDeptViewer`, params)
}

// 获取单位登录次数对比数据
export const POST_DEPT_LOGINS_DATA = (params) => {
  return req('post', `${$config.joinPath}/DailyCollectDashboardResource/v1/dailyLoginDeptViewer`, params)
}

// 获取图谱登录情况统计数据
export const POST_TP_LOGINS_STAT_DATA = (params) => {
  return req('post', `${$config.joinPath}/DailyCollectDashboardResource/v1/findLoginSituation`, params)
}

// 图谱登录情况数据导出
export const POST_TP_LOGINS_STAT_EXPOT_DATA = (params) => {
  return req('post', `${$config.joinPath}/DailyCollectDashboardResource/v1/exportLoginSituation`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}

// 图谱登录情况数据导出
export const POST_PERSONINFO_EXPOT_DATA = (params) => {
  return req('post', `${$config.joinPath}/IntelligentSearchResource/v1/exportpersoncommonform`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}

// 在线采集-图谱管理-数据导出
export const DOWNLOAD_MAP_EXCEL = (params) => {
  return req('post', `${$config.joinPath}/exportdata/v1/mapmanagement/filter`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}
