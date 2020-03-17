import { getAxios,putAxios,patchAxios,postJSON,deleteAxios,postForm } from '../tools/request'
import { getToken } from '../tools/authToken'
const config = require('../configs/config' + process.env.ENV_CONFIG).config
const joinPath = config.joinPath;
const _params = {
  token:getToken()
}

// 首页图形的数据
export function queryCountyCount(chart,fid,type){
  // let headers = { functionCode:chart.functionCode}
  let params = Object.assign(JSON.parse(JSON.stringify(_params)),{
    zplx:chart.zplx,
    fid
  })
  params = JSON.parse(JSON.stringify(params))
  return getAxios(joinPath + `MapStatisticsResource/v1/queryCountyCount`+type,params)
}

// 涉案人员案件关系图谱
export function queryYearMonthData(chart,fid){
  let params = Object.assign(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(_params)))),{
    zplx:chart.zplx,
    fid
  })
  params = JSON.parse(JSON.stringify(params));
  return getAxios(joinPath + `MapStatisticsResource/v1/queryYearMonthData`,params) 
}

// 获取地图数据
export function queryMapTypeAllCountyDataAll(fid) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)),{
    fid
  })
  return getAxios(joinPath + `MapStatisticsResource/v1/queryMapTypeAllCountyDataAll`,params)
}

//宗教极端思想传承体系
export function queryInheritanceSystemCount(){
  return getAxios(joinPath+`MapStatisticsResource/v1/queryInheritanceSystemCount`) 
}

//获取阿克苏地图数据
export function queryothercountyperson(fid) {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)),{
    fid
  })
  return getAxios(joinPath + `MapStatisticsResource/v1/queryothercountyperson`,params)
}


//七类图谱各县市数量统计表
export function queryMapPersonCount(fid){
  let params = Object.assign(JSON.parse(JSON.stringify(_params)),{
    fid
  })
  return getAxios(joinPath + `MapStatisticsResource/v1/queryMapPersonCount`,params) 
}

//根据宗教极端思想来源名称获取对应的tpid
// export function getTpid(name) {
//   let params = Object.assign(JSON.parse(JSON.stringify(_params)),{
//     name
//   })
//   return postForm(joinPath + `taskresource/v1/map/name`,`name:${name}`)
// }

