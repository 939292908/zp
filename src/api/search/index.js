import {
  getAxios,
  putAxios,
  patchAxios,
  postJSON,
  deleteAxios,
  postForm
} from '../../tools/request'
import {
  constantFunMap
} from '../../router/config'
import {
  getToken
} from '../../tools/authToken'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
import store from '@/store'


const joinPath = config.joinPath;
const _params = {
  token: getToken()
}

// 获取谱系档案数据
export function intelligentSearch(params) {
  params = Object.assign(JSON.parse(JSON.stringify(_params)), params)
  params = JSON.parse(JSON.stringify(params))
  //return postForm(joinPath + `areamapseriesparallelresource/v1/map/keyword`,null,params)
  return postForm(joinPath + `IntelligentSearchResource/v1/intelligentSearch`, null, params)
  //return postForm(joinPath + `MapSeriesParallelResource/v1/SeriesParallelMaps/keyword`,null,params)
}
export function intelligentSearchTp(params) {
  params = Object.assign(JSON.parse(JSON.stringify(_params)), params)
  params = JSON.parse(JSON.stringify(params))
  return postForm(joinPath + `IntelligentSearchResource/v1/intelligentSearch`, null, params)
  //return postForm(joinPath + `MapSeriesParallelResource/v1/SeriesParallelMaps/keyword`,null,params)
}
// 全文检索 - 案件/线索 tab列表
export function getDataCaseList(params) {
  params = Object.assign(JSON.parse(JSON.stringify(_params)), params)
  params = JSON.parse(JSON.stringify(params))
  return postForm(joinPath + `/IntelligentSearchResource/v1/intelligentSearch/caseclue`, null, params)
}
// 根据选中的人员获取图谱列表
// export function tpList(params) {
//   params = Object.assign(_params,params)
//   params = JSON.parse(JSON.stringify(params))
//   return postForm(joinPath + `MapSeriesParallelResource/v1/SeriesParallelMaps/keyword`,null,params)
// }



//接口修改
// 根据选中的人员获取图谱列表
export function tpList(params) {
  params = Object.assign(_params, params)
  params = JSON.parse(JSON.stringify(params))
  return postForm(joinPath + `mapmergeresource/v1/map/keyword`, null, params)
}

// --------- 谱系档案搜索 ----------
//  获取谱系档案 地区搜索筛选列表
export function getCityList() {
  return getAxios(joinPath + 'SpectrumArchiveQuery/findcitys', _params)
}
// 谱系档案搜索功能
export function getArchivesCard(params) {
  params = JSON.parse(JSON.stringify(params))
  return postJSON(joinPath + `SpectrumArchiveQuery/cardList`, params)
}
// // 获取谱系档案卡片
// export function getArchivesCard(params) {
//   params = Object.assign(JSON.parse(JSON.stringify(_params)),params)
//   params = JSON.parse(JSON.stringify(params))
//   return postForm(joinPath + `GenealogyArchivesResource/v1/GenealogyArchives/card`,null,params)
// }
