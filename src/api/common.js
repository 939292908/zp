/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 18:36:52
 * @LastEditTime: 2019-11-18 18:40:42
 * @LastEditors: Please set LastEditors
 */
import {
  getAxios,
  putAxios,
  patchAxios,
  postJSON,
  deleteAxios,
  postForm,
  req,
  postAxios,
  postData
} from '../tools/request'
import {
  getToken
} from '../tools/authToken'
const config = require('../configs/config' + process.env.ENV_CONFIG).config
const joinPath = config.joinPath;
const mainPath = config.mainPath;
const collectPath = config.collectPath;
const logPath = config.logPath;
const _params = {
  token: getToken()
}
// 获取部门树
export function getDeptTree() {
  return getAxios(joinPath + `MapStatisticsResource/v1/queryCountyTree`, _params)
}

// 获取巴州下辖区县单位
export function queryCounty() {
  return getAxios(joinPath + `MapStatisticsResource/v1/queryCounty`, _params)
}

// 获取县级单位
export function queryCountyAuth(fid = 0, auth = 1) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), {
    fid,
    auth
  })
  return getAxios(joinPath + `MapStatisticsResource/v1/queryCountyAuth`, params)
}

// 获取县级单位下所有子集单位的数据
export function queryCountyTreeAuth(fid, auth = 1) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), {
    fid,
    auth
  })
  return getAxios(joinPath + `MapStatisticsResource/v1/queryCountyTreeAuth`, params)
}

// 获取实体的配置
export function getInitializeConfig(objs) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), objs)
  return getAxios(joinPath + `/InitializeResource/v1/getInitializeConfig`, params)
}

// 根据客户获取图谱标识
export function getMapRegionType() {
  return getAxios(joinPath + `commonresource/v1/map/region/type`)
}
// /commonresource/v1/map/code
// 根据图谱编号获取图谱列表
export function getMapListByCode(data) {
  return postJSON(joinPath + `commonresource/v1/map/code`, data)
}

export function getMapByOrgTreeId(mapIds) {
  return postForm(joinPath + 'commonresource/v1/map/ora/tree/id', null, {
    mapIds
  })
}

// 在单位表中获取行政区域信息
export function getCountyLevel(level) {
  return getAxios(joinPath + `commonresource/v1/regin/${level}`)
}

// 根据客户获取图谱标识
export function getQueryCountyTreeByQHCode(qhCode) {
  return getAxios(joinPath + `commonresource/v1/queryCountyTreeByQHCode`, {
    qhCode
  })
}

// 获取我的导航列表
export function getMyNavList() {
  return getAxios(joinPath + `NavigationResource/v1/queryUserNavigation`, _params)
}

// 添加我的导航列表
export function addMyNavItem(data) {
  return postJSON(joinPath + `NavigationResource/v1/usernavigation`, data)
}

// 删除的导航列表
export function delMyNavItem(naviIDs) {
  return deleteAxios(joinPath + `NavigationResource/v1/usernavigation`, {
    naviIDs
  })
}

// 编辑的导航列表
export function upDataMyNavItem(data) {
  return putAxios(joinPath + `NavigationResource/v1/usernavigation`, null, data, {
    'Content-Type': 'application/json'
  })
}

// 获取个人中心用户信息
export function getPersonalCenter() {
  return getAxios(mainPath + 'idsecurity/UserResource/v1/auth/users-resources/selectinfo', _params)
}
// 修改用户信息
export function upDataPersonalCenter(data) {
  return postJSON(mainPath + 'idsecurity/UserResource/v1/auth/users-resources/modifyuserinfo', data)
}
// 修改密码
export function ChangePassword(data) {
  return postJSON(mainPath + 'idsecurity/UserResource/v1/auth/users-resources/modifypwd', data)
}


// ---------- 谱系档案----------
// 获取 谱系档案-看板-汇总条
export function getArchivesTitleTotal() {
  return getAxios(joinPath + 'SpectrumArchiveDashboardResource/totalView', _params)
}

// 获取 谱系档案-看板-本地宗族梳理柱状图
export function getArchivesNativeClansman() {
  return getAxios(joinPath + 'SpectrumArchiveDashboardResource/personCountView', _params)
}

// 获取 谱系档案-看板-宗族风险评估气泡图
export function getArchivesClansmanRisk() {
  return getAxios(joinPath + 'SpectrumArchiveDashboardResource/riskLevelAssessment', _params)
}

// 获取 谱系档案-高风险宗族排名
export function getClansmanRiskRank(data) {
  return postJSON(joinPath + 'SpectrumArchiveDashboardResource/highRiskLevel', data)
}

// 获取 谱系档案-跨地区联姻
export function getRegionMarriage() {
  return getAxios(joinPath + 'SpectrumArchiveDashboardResource/diffAreaMarrigage', _params)
}

// 获取 谱系档案-跨县市联姻
export function getCountyMarriage() {
  return getAxios(joinPath + 'SpectrumArchiveDashboardResource/diffCountyMarrigage', _params)
}

// 获取 谱系档案-图谱概述
export function getOverview(archiveId) {
  return getAxios(joinPath + `SpectrumArchiveQuery/summary/${archiveId}`)
}

// 获取 谱系档案-图谱详情-树形数据
export function getFamilyarchive(id) {
  return getAxios(joinPath + `/familyarchive/v1/tree/${id}`)
}

// 获取 谱系档案-图谱详情-图谱关联
export function getRelevantmap(id) {
  return getAxios(joinPath + `/familyarchive/v1/relevantmap/${id}`)
}

// 获取 谱系档案-图谱详情-姻亲关联
export function getMarriagemap(id) {
  return getAxios(joinPath + `/familyarchive/v1/Marriagemap/${id}`)
}

// 获取 谱系档案-图谱详情-构成汇总
export function getMapTotal(id) {
  return getAxios(joinPath + `SpectrumArchiveQuery/summary/mapsummary/${id}`)
}
// 获取 谱系档案-图谱详情-跨地区联姻信息
export function getMarriageInfo(id) {
  return getAxios(joinPath + `SpectrumArchiveQuery/summary/marriageInfo/${id}`)
}


// 获取当前用户的区划树
export const GET_AREA_TREE_INFO = (params) => req('get', `${collectPath}/info/v1/info/areaTree`, null, params)

// 获取当前用户的单位树
export const GET_DEPT_TREE_INFO = () => req('get', `${collectPath}/info/v1/info/deptTree?dataAuth=2`)

// 根据字典CODE获取当前用户的字典项配置
export const GET_OPTIONS_LIST = (dictCode) => req('get', `${collectPath}/info/v1/info/persons/options`, null, {
  dictCode
})

//获取人员状态(大类)
export const GET_PERSON_STATE_BIG_LIST = () => req('get', `${collectPath}/dicommonresource/configdictionarytree/STATE_STRONG`)
//获取人员状态(细类)
export const GET_PERSON_STATE_SMALL_LIST = (dictCode) => req('get', `${collectPath}/dicommonresource/configdictionarytree/STATE_DETAIL/${dictCode}`)

// 根据字典CODE父级CODE父级ID获取当前用户的级联字典项配置
export const GET_OPTIONS_CASCADE_LIST = (dictCode, parentId) => req('get', `${collectPath}/info/v1/info/persons/options/cascade`, null, {
  dictCode,
  parentId
})

// 根据图谱类型ID获取对应关系
export const GET_MAP_RELATIONS = (mapTypeID) => req('get', `${collectPath}/info/v1/info/maps/relations`, null, {
  mapTypeID
})

// 根据图谱类型id获取图谱配置信息
export const GET_MAP_CONFIG_BY_MAP_TYPE = (mapTypeID) => req('get', `${joinPath}/commonresource/v1/mapconfig/${mapTypeID}`)

// 获取一层区划树
export const GET_AREA_TREE_BY_CODE = (areaCode) => req('get', `${collectPath}/info/v1/info/areaTree/${areaCode}`)

export const GET_IMAGE_PATH = (picUrl) => {
  return picUrl ? config.imgPath + picUrl : './static/images/avator.png';
}

// 获取图谱信息
export function postMapInfoRid(data) {
  return postJSON(`${joinPath}/commonresource/v1/maplistinfo/rid`, data)
}

// 获取archivesjoin页面 图谱概述
export function GET_JOIN_MAP_OVERVIEW(mapId) {
  return postForm(joinPath + `commonresource/v1/map/summary`, null, {
    mapId
  })
}

// 获取关系类型图谱列表信息
export function GET_RELATION_MAP_INFO(data) {
  return postJSON(`${joinPath}/commonresource/v1/relevant/person/map/info`, data);
}

// 获取图谱展示页面初始化接口
export const GET_ArchivesJoin_Graph_Data = (data) => {
  return req('post-json', `${joinPath}/MapGraph/v1/map/graph`, data)
}

// 获取图谱展示页面初始化接口(带有串并参数)
export const GET_ArchivesJoin_And_PassiveId_Data = (data) => {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), {
    passiveID: data.passiveID,
    tpids: data.tpids
  })
  return req('post', `${joinPath}/MapSeriesParallelResource/v1/SeriesParallelMaps/tree/mapids`, null, params)
}

// 查询部门下所属用户
export const GET_DEPT_PERSON_LIST = (deptCode) => req('get', `${mainPath}/idsecurity/UserResource/v1/auth/users-resources/findUserListByDeptCode/${deptCode}`)

// 获取人员状态 所有树结构列表
export const GET_PERSON_STATE_ALL_LIST = dictCode =>
  req("get", `${collectPath}/dicommonresource/configtree/code/${dictCode}`);

// 获取 日志列表
export const GET_LOG_LIST = params =>
  req('post', `${logPath}/operationlog/logView/v1/pagedata`, params)

// 获取 日志详情
export const GET_LOG_DETAIL = id =>
  req("get", `${logPath}/operationlog/logView/v1/logDetail/${id}`);
