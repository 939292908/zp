/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 19:40:17
 * @LastEditTime : 2019-12-26 18:24:50
 * @LastEditors  : Please set LastEditors
 */
import {
  getAxios,
  putAxios,
  postAxios,
  patchAxios,
  postJSON,
  deleteAxios,
  postForm,
  postFile,
  req
} from "../../tools/request";
import {
  getToken
} from '../../tools/authToken'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const collectPath = config.collectPath;
const joinPath = config.joinPath;
const mainPath = config.mainPath;
// 测试
const fbtcs = config.fbtcs

import store from "@/store";
const _params = {
  token: getToken()
};

// 获取图谱待审核状态(最后一次审核状态为新图谱和二次审核)的数量
export const POST_SECONDERAUDITSTATE_COUNT = params =>
  req(
    "post",
    `${collectPath}/mapauditresource/v1/auditor/map/seconderview/count`,
    params
  );

// 新 上传采集表
export function newUploadExcel(taskType, formData, collectId) {
  return postFile(
    collectPath + `onlinemapuploadresource/v1/onlinemap/upload`, {
      taskType,
      collectId
    },
    formData
  );
}
// 根据mapType 获取图谱：类型id 和 下载模板地址
export const GET_TYPE_ID_AND_URL_BY_MAP_TYPE = (obj) => {
  return req('post', `${collectPath}/onlinemapuploadresource/v1/onlinemap/upload/info`, null, obj)
}

// 上传采集表
export function uploadExcel(taskType, formData) {
  return postFile(
    collectPath + `MapCollect/v1/maps/uploadCollectForm`, {
      taskType
    },
    formData
  );
}
// 校验上传采集表
export function validateUploadExcel(taskType, formData) {
  return postFile(
    collectPath + `MapCollect/v1/maps/verifyCollectForm`, {
      taskType
    },
    formData
  );
}

// 获取采集文件类型
export function getTypeList(_token) {
  return getAxios(collectPath + `config/v1/collectfile/tasktype`);
  //return getAxios(`http://104.17.57.4:30003/mapcollect/config/v1/collectfile/tasktype`)
}

// 获取采集的图谱类型
export const GET_TP_TYPE_LIST = token =>
  req("get", `${collectPath}/MapCollect/v1/maps/type`, null, {
    token
  });

// 获取采集内容模板列表
export function templateList() {
  return getAxios(collectPath + `config/v1/collectfile/templates`);
  //return getAxios(`http://104.168.8.242:20003/mapcollect/config/v1/collectfile/templates`)
}
//根据条件获取采集任务列表
export function getTaskList(param) {
  return postJSON(
    collectPath + `/taskresource/v1/collect-task/conditions`,
    param
  );
}
//根据条件获取采集任务列表详情
export function getTaskListDetails(taskId) {
  let param = {
    taskId: taskId
  };
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), param);
  return getAxios(collectPath + `/taskresource/v1/task/id`, params);
}
//根据条件获取采集图谱列表
export function getCollectMapList(param) {
  return postJSON(
    collectPath + `/collectmapresource/v1/collect-map/conditions`,
    param
  );
  //    var data= testData();
  //    console.log("data.data.data.length="+data.data.data.length);
  //    return data;
}
//获取待审批图谱列表
export function getApproval(param) {
  return postJSON(collectPath + `/mapauditresource/v1/audit/map`, param);
}
//根据条件获取采集图谱详情
export function getCollectMapDetail(collectId) {
  let param = {
    collectId: collectId
  };
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), param);
  return getAxios(collectPath + `/taskresource/v1/task/id`, params);
  // return getAxios(collectPath + `/taskresource/v1/task/id/${collectId}`);
}
//获取所有图谱类型
export function getAllMapType() {
  return getAxios(collectPath + `/MapCollect/v1/maps/type`);
}

// 获取被打击人员分布图中饼图信息
export function getAreaDistribution(areaCode) {
  let param = {
    areaCode: areaCode
  };
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), param);
  return getAxios(
    joinPath + `distributionmapresource/v1/distribution/processedperson`,
    params
  );
}
// 获取出入境人员分布图
export function getOutBoundPerson(areaCode) {
  let param = {
    areaCode: areaCode
  };
  let params = Object.assign(JSON.parse(JSON.stringify(_params)), param);
  return getAxios(
    joinPath + `distributionmapresource/v1/distribution/outboundperson`,
    params
  );
}

// 获取可绘制的图谱类型
export const GET_DRAW_TP_TYPE_LIST = token =>
  req("get", `${collectPath}/board/v1/board/mapTypes`, null, {
    token
  });

// 获取图谱类型与状态
export const GET_TP_TYPE_STATE = token =>
  req("get", `${collectPath}/board/v1/board/mymaps`, null, {
    token
  });

//删除未提交列表
export const DELETE_MAP_LIST = data =>
  req("delete", `${collectPath}/onlinemapcollectresource/v1/onlinemap/map/id`, [data]);

// 获取图谱审核的类型与状态
export const GET_TP_AUDIT_TYPE_STATE = token =>
  req("get", `${collectPath}/board/v1/board/mymaps/audit`, null, {
    token
  });

// 获取图谱审核的绩效数据
export const GET_AUDIT_PERFORMANCE_DATA = token =>
  req("get", `${collectPath}/board/v1/board/performance/audit`, null, {
    token
  });

// 审核图谱（提交：2、批准：0、驳回：1）
export const POST_CHANGE_MAP_STATE = params =>
  req(
    "post",
    `${collectPath}/mapauditresource/v1/map/operation`,
    params
  );

// 获取图谱审核属性(图谱最后一次审核状态)的数量
export const POST_LASTAUDITSTATE_COUNT = params =>
  req(
    "post",
    `${collectPath}/mapauditresource/v1/auditor/map/lastauditstate/count`,
    params
  );

// 判断审核图谱页面权限
export const GET_MAP_AUDIT_AUTHORITY = token =>
  req("get", `${collectPath}/mapauditresource/v1/user/audit/permissions`, null, {
    token
  });

// 判断用户是否有批量审核权限
export const GET_BATCH_MAP_AUDIT_AUTHORITY = token =>
  req("get", `${collectPath}/mapauditresource/v1/user/audit/batch/permissions`, null, {
    token
  });

// 批量通过图谱
export const POST_BATCH_AUDIT_MAP = data =>
  req("post", `${collectPath}/mapauditresource/v1/map/batch/audit`, data);

// 获取绩效数据
export const GET_PERFORMANCE_DATA = token =>
  req("get", `${collectPath}/board/v1/board/performance`, null, {
    token
  });

// 获取提交人的图谱各个状态的总数
export const POST_MAP_ALL_COUNT = data =>
  req("post", `${collectPath}/mapauditresource/v1/submitter/mapcount/auditstate`, data);

// 获取审核人的图谱各个状态的总数
export const POST_MAP_ALL_COUNT_AUDIT = data =>
  req("post", `${collectPath}/mapauditresource/v1/auditor/mapcount/auditstate`, data);

// 图谱审核数据导出
export const POST_MAPAUDIT_EXPOT_DATA = (params) => {
  return req('post', `${collectPath}/mapauditresource/v1/exportAuditMap`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}

// 导出图谱excel 根据 mapId
export const GET_MAP_EXCEL_BY_MAPID = (mapId) => {
  return req('post', `${joinPath}/MapGraph/v1/map/export/`, null, {mapId}, {
    'Content-Type': 'application/json'
  }, 'blob')
}

// 获取辖区情况数据
export const GET_AREA_DATA = token =>
  req("get", `${collectPath}/board/v1/info/persons/area`, null, {
    token
  });
// 新建图谱信息被打击
export const postSavaMapProfile = data =>
  req(
    "post",
    `${collectPath}/areadistribution/v1/areamaps/mapinfo`,
    data
  );
// 保存图谱信息(新建)
export const POST_SAVE_MAP_INFO = data =>
  req(
    "post",
    `${collectPath}/onlinemapcollectresource/v1/onlinemap/mapinfo`,
    data
  );

export const PATCH_SAVE_MAP_INFO = (data) => req('patch', `${collectPath}/onlinemapcollectresource/v1/onlinemap/mapinfo`, data)

// 获取采集图谱基本信息
export const GET_MAP_INFO = collectId =>
  req(
    "get",
    `${collectPath}/onlinemapcollectresource/v1/onlinemap/mapinfo/${collectId}`
  );


// 根据审核状态获取提交用户审核图谱列表
export const POST_USER_AUDIT_LIST = params =>
  req(
    "post",
    `${collectPath}/mapauditresource/v1/submitter/map/auditstate`, params);

// 获取审核人待审核图谱列表
export const POST_TO_AUDIT_LIST = params =>
  req(
    "post",
    `${collectPath}/mapauditresource/v1/auditor/map/audit`, params);

// 根据审核结果状态获取审核人已审核、已退回图谱列表
export const POST_AUDIT_BACK_LIST = params =>
  req(
    "post",
    `${collectPath}/mapauditresource/v1/auditor/map/audited`, params);

//获取退回理由下拉列表数据
export const GET_REASON_LIST = (dictCode) => req('get', `${collectPath}/info/v1/info/persons/options`, null, {
  dictCode
})

// 获取图谱管理数据
export const GET_MAP_MANAGE_LIST = () =>
  req(
    "get",
    `${collectPath}/manage/v1/manage/conditions`
  );

// 获取图谱管理搜索结果
export const POST_MAP_MANAGER_RESULT = (data) => req('post', `${joinPath}/IntelligentSearchResource/v1/mapmanagement/filter`, data)

// 获取图谱管理-删除图谱
export const Delete_MAP_MANAGER_TP = (params) => req('delete', `${joinPath}/mapdataoperation/v1/map/id`, null, params)

// 获取无证人员列表
export const POST_ON_ID_NUMBER_LIST = (data) => req('post', `${joinPath}/IntelligentSearchResource/v1/onlinemap/persons/undocumented`, data)

// // 新建图谱关系
// export const POST_MAP_RELATION = (data) => req('post-json', `${collectPath}/onlinemapcollectresource/v1/onlinemap/map/relation`, data)
// 新建图谱关系
export const POST_MAP_RELATION = (data) => req('post-json', `${collectPath}/onlinemapcollectresource/v1/onlinemap/map/collectrelation`, data)

// 无号码
export const GET_NO_IDNUMBER = () => req('get', `${collectPath}/MapCollect/v1/maps/persons/noidnumber`, null, {
  token: store.getters.token
})

// 获取在线采集图谱基本信息
export const GET_ONLINE_MAP_TREE_BY_ID = (collectIds) => {
  return req('post', `${collectPath}/collectmapresource/v1/map/tree/id/`, collectIds)
}

// 获取在线采集图谱基本信息 (ID + 图谱类型)(不包含图谱节点)
export const GET_ONLINE_MAP_TREE_BY_ID_AND_FLAG = (obj) => {
  return req('post', `${collectPath}/collectmapresource/v1/map/graph/collectid/`, obj)
}

// 根据collectId获取采集图谱树形数据(包含图谱节点)
export const GET_ONLINE_MAP_LABEL_BY_ID = (obj) => {
  return req('post', `${collectPath}/collectmapresource/v1/map/graph/maplabel/collectid`, obj)
}

// 获取审核历史记录数据
export const GET_MAP_HISTROY_DATA = (mapId) => {
  return req('get', `${collectPath}/mapauditresource/v1/map/auditrecord/id?mapId=` + mapId)
}

// 获取人员基本信息
export const GET_PERSON_INFO_BY_ID = (idNumber) => req('get', `${collectPath}/onlinemapcollectresource/v1/onlinemap/personinfo/${idNumber}`)

// // 获取新数据结构，人员基本信息
// export const GET_NEW_PERSON_INFO_BY_ID = (idNumber, collectId) => req('get', `${collectPath}/onlinemapcollectresource/v1/onlinemap/persondetailinfo/${idNumber}?collectId=${collectId}`)
// 获取新数据结构，人员基本信息
export const GET_NEW_PERSON_INFO_BY_ID = (idNumber, collectId) => req('get', `${collectPath}/onlinemapcollectresource/v1/onlinemap/collect/personinfo/${idNumber}?mapCollectId=${collectId}`)

// 保存人员基本信息
export const PATCH_PERSON_INFO = (data) => req('patch', `${collectPath}/onlinemapcollectresource/v1/onlinemap/personinfo`, data)

// // 新 保存人员台账基本信息
export const NEW_PATCH_PERSON_INFO_LEDGER = (data) => req('patch', `${collectPath}/onlinemapcollectresource/v1/onlinemap/persondetailinfo`, data)

// 新 保存人员流水基本信息
export const NEW_PATCH_PERSON_INFO = (data) => req('patch', `${collectPath}/onlinemapcollectresource/v1/onlinemap/collect/personinfo`, data)

// excel采集，生成图谱后未添加人，再次编辑获取图谱数据
export const GET_EXCEL_MAP_STATE_BY_ID_AND_MYP_TYPE = (data) => req('get', `${collectPath}/onlinemapcollectresource/v1/mapcollect/processinfo`, null, data)

// 删除人员及关系
export const DELETE_PERSON_INFO = (data) => req('delete', `${collectPath}/onlinemapcollectresource/v1/onlinemap/map/relation`, data)

// 获取辖区内村地图列表
// 获取辖区内村地图列表 乡镇下的所有村
export function getVillageList() {
  let params = Object.assign(JSON.parse(JSON.stringify(_params)));
  return getAxios(collectPath + `/areadistribution/v1/areamaps/village`, params);
}
// 清空村&小组地图信息
export function deleteAll(path) {
  return deleteAxios(collectPath + `/areadistribution/v1/areamaps/village/` + path);
}
// 获取村绘制情况，已绘制村组，或未绘制
export function getVillageDrawState(params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/village/map/` + params);
}
// 绘制村地图
export function villageDraw(params) {
  return postJSON(collectPath + `/areadistribution/v1/areamaps/village`, params);
}
// 绘制小组地图
export function estateDraw(params) {
  return postJSON(collectPath + `/areadistribution/v1/areamaps/area`, params);
}
// 编辑村地图以及信息
export function editVillageInfo(params) {
  return putAxios(collectPath + `/areadistribution/v1/areamaps/village`, null, params);
}
// 编辑组队地图以及信息
export function editTeamInfo(params) {
  return putAxios(collectPath + `/areadistribution/v1/areamaps/area`, null, params);
}
// 删除组队地图以及信息
export function deleteTeamInfo(params) {
  return deleteAxios(collectPath + `/areadistribution/v1/areamaps/area/` + params);
}
// 删除村党委/清真寺信息
export function deleteconsiderationMosqueInfoInfo(params) {
  return deleteAxios(collectPath + `/areadistribution/v1/areamaps/agency/` + params);
}
// 保存村党委/清真寺信息
export const considerationMosqueInfo = (data) => req(
  'patch', `${collectPath}/areadistribution/v1/areamaps/agency`, data
)
// 保存村党委/清真寺坐标
export const considerationMosquePointInfo = (data) => req(
  'patch', `${collectPath}/areadistribution/v1/areamaps/agency/coordinate`, data
)
// 获取在线采集图谱概览的数据
export const GET_SUMMARY_MAP_OVERVIEW = (collectId) => req('get', `${collectPath}/collectmapresource/summary/${collectId}`)

// 上传人员照片至本地目录
export const POST_ONLINE_UPLOAD_FILE = (params, data) => req('post', `${collectPath}/onlinemapcollectresource/v1/onlinemap/upload/file`, data, params)

// 获取被打击采集地图信息
export function getCollectMapInfo(path, params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/village/process/` + path, params);
}
// 获取出入境采集地图信息
export function getCollectMapInfoEnter(path, params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/village/outbound/` + path, params);
}
// 通过隶属村获取是否绘制
export function getDrawState(params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/village/info/` + params);
}
// 更改人的坐标(打点)
export function changePoint(params) {
  return postJSON(collectPath + `/areadistribution/v1/areamaps/persons/coordinate`, params);
}
// 将已打点人员归到未打点人员{从地图上删除}
export function deleteMapInfo(path, data) {
  return deleteAxios(collectPath + `/areadistribution/v1/areamaps/persons/coordinate/` + path, data);
}
// 获取被打击处理人员信息
export function getPersonnelInfo(params, data) {
  return getAxios(`${collectPath}/areadistribution/v1/areamaps/persons/processedinfo/` + params, data);
}
// 保存被打击处理信息
export const preservedPersonnelInfoBeHit = (data) => req(
  'patch', `${collectPath}/areadistribution/v1/areamaps/persons/processedinfo/collect`, data
)
// 删除被打击处理人员
export function deletePersonnelInfo(path, data) {
  return deleteAxios(collectPath + `/areadistribution/v1/areamaps/persons/process/` + path, data);
}
// 被打击处理图谱概述Overview of Atlas
export function overviewOfAtlas(path, params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/summary/processed/` + path, params);
}
// 被打击处理图谱概述Overview of Atlas未通过，审核中
export function newOverviewOfAtlas(path, params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/summary/processed/collect/` + path, params);
}
// 出入境&&被打击处理图谱概述Overview of Atlas
export function newMapOverview(path, params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/summary/` + path, params);
}
// /areadistribution/v1/areamaps/persons/outboundinfo/{idNumber}获取出入境人员信息
export function getOutboundinfoList(path, params, data) {
  return postJSON(collectPath + `/areadistribution/v1/areamaps/persons/outboundinfo/` + path, params, data);
}
// 保存或修改出入境人员信息
export const savaEditPersonnelInfo = (data) => req(
  'patch', `${collectPath}/areadistribution/v1/areamaps/persons/outboundinfo/collect`, data
)
// 删除出入境人员信息
export const deleteEenterPersonnelInfo = (path) => req(
  'delete', `${collectPath}/areadistribution/v1/areamaps/persons/outboundInfo/` + path)

// 删除出入境人员
export function deleteEenterPersonnel(path, data) {
  return deleteAxios(collectPath + `/areadistribution/v1/areamaps/persons/outbound/` + path, data);
}

// 获取人员信息台账的搜索结果
export const POST_PERSON_INFO_RESULT = (data) => req('post', `${joinPath}/IntelligentSearchResource/v1/personmanagement/filter`, data)

// 获取关系挖掘人员关系
export const POST_PERSON_RELATION = (data) => req(
  'post', `${joinPath}/relationcheckresource/v1/relationquery`, data)

// 关系挖掘线上关系的列表/relationcheckresource/v1/getRelationMapList
export const POST_LINE_RELATION = (data) => req(
  'post', `${joinPath}/relationcheckresource/v1/getRelationMapList`, data)

// 群体分析http://172.16.3.201:20002/mapanalysis/mapgroupanalysisresource/v1/groupanalysis
export const POST_GROUP_ANALYSIS = (data) => req(
  'post', `${joinPath}/mapgroupanalysisresource/v1/groupanalysis`, data)
// 群体分析 点击连线
// 群体分析http://172.16.3.201:20002/mapanalysis/mapgroupanalysisresource/v1/groupanalysis
export const POST_LINKS_GROUP_ANALYSIS = (params) => req(
  'post', `${joinPath}/mapgroupanalysisresource/v1/groupanalysis/linkMapUsers`, null, params)
// 群体分析 点击节点
export const GET_NODES_GROUP_ANALYSIS = (data) => req(
  'post', `${joinPath}/mapgroupanalysisresource/v1/groupanalysis/mapusers`, data)
// 二次审核图谱备份
export const POST_BACKUP_MAPDATA = (data) => req(
  'post', `${collectPath}/mapauditagain/v1/mapcollect/backup/mapdata`, null, data)

// 生成无证人员身份证号
export const GET_NO_IDNUMBER_BY_DATA = data =>
  req("post", `${collectPath}/onlinemapcollectresource/v1/mapcollect/generate/idnumber`, data);

// 获取人员图谱类型统计数据
export const GET_PERSON_MAPTYPE_STAT_DATA = userId =>
  req("get", `${collectPath}/manage/v1/maptransfer/findUserMapInfo/${userId}`);

// 图谱批量转接
export const POST_BATCH_MULTITAP = data =>
  req("post", `${collectPath}/manage/v1/maptransfer/byuser`, data);

// 获取图谱列表-自定义转接
export const GET_CUSTOM_MULTITAP_MAP_LIST = userId =>
  req("get", `${collectPath}/manage/v1/maptransfer/findUserMapInfoList/${userId}`);

// 图谱自定义转接
export const POST_CUSTOM_MULTITAP = data =>
  req("post", `${collectPath}/manage/v1/maptransfer/bymapids`, data);

//
// 获取涉案涉线人员列表
export const GET_CASE_PEOPLE_LIST = caseId =>
  req("get", `${collectPath}/caseclueresource/v1/person/listview/${caseId}`);

// 新增/编辑涉案涉线人员信息
export const POST_CASE_PEOPLE_ADD_OR_EDIT = data =>
  req("post", `${collectPath}/caseclueresource/v1/person/addOrEdit`, data);

// 删除涉案涉线人员信息
export const DELETE_CASE_PEOPLE = (casePersonId) => req('delete', `${collectPath}/caseclueresource/v1/person/delete/${casePersonId}`)

// 获取案件管理列表信息
export const POST_CASE_LIST = data =>
  req("post", `${collectPath}/caseclueresource/v1/casecuepagelist`, data);

// 获取案件管理列表各状态总数
export const POST_CASE_LIST_COUNTS = data =>
  req("post", `${collectPath}/caseclueresource/v1/findCaseClueTotalCount`, data);

// 保存新增编辑案件线索信息
export const POST_SAVE_CASE_INFO = data =>
  req("post", `${collectPath}/caseclueresource/v1/addOrEdit`, data);

// 查看案件线索信息
export const GET_LOOK_CASE_INFO = caseId =>
  req("get", `${collectPath}/caseclueresource/v1/findCaseclue/${caseId}`);

// 提交案件线索归档
export const POST_ARICHIVED_CASE_INFO = caseId =>
  req("post", `${collectPath}/caseclueresource/v1/arichived`, caseId);

// 删除案件线索
export const Delete_CASE_INFO = caseId =>
  req("delete", `${collectPath}/caseclueresource/v1/delete/${caseId}`);

// 案件线索数据导出
export const POST_CASE_EXPOT_DATA = (params) => {
  return req('post', `${collectPath}/caseclueresource/v1/exportCaseClue`, params, null, {
    'Content-Type': 'application/json'
  }, 'blob')
}

//分布图展现
// 出入境记录 正式
export function newGetOutboundinfoList(path, params) {
  return postJSON(collectPath + `/areadistribution/v1/areamaps/persons/outboundinfo/` + path, params);
}
// 出入境记录 流水/areadistribution/v1/areamaps/persons/outboundinfo/collect/{idNumber}
export function newCollectGetOutboundinfoList(path, params, data) {
  return postJSON(collectPath + `/areadistribution/v1/areamaps/persons/outboundinfo/collect/` + path, params, data);
}
// 出入境信息 人员详细信息
export function newGetCollectMapInfoEnter(path, params) {
  return getAxios(collectPath + `/areadistribution/v1/areamaps/village/outbound/` + path, params);
}
// 保存被打击处理人员基础&被打击信息
export const savaPersonnelBeHitInfo = (data) => req(
  'patch', `${collectPath}/areadistribution/v1/areamaps/persons/processed/collect`, data
)
// 案件线索批量导入
export const POST_BATCH_IMPORT_CASE = formData =>
  req("post", `${collectPath}/caseclueresource/v1/uploadcaseclue`, formData);

// 更新人员状态
export const UPDATE_PERSON_STATE = params =>
  req("post", `${joinPath}/PersonalRecordResource/v1/person/state/${params.idNumber}`, params);

// 案件线索采集模板下载
export const GET_CASE_EXPOT_DOWNLOAD = () =>
  req("get", `${collectPath}/caseclueresource/v1/template/info`);

// 案件线索添加人员时根据身份证获取台账相关人员信息
export const GET_LEGER_INFOMATION = (idNumber) =>
  req("get", `${collectPath}/caseclueresource/v1/person/ledgerInfomation/${idNumber}`);

// 更新人员关系名称
export const UPDATE_PERSON_RELATION_NAME = params =>
  req("post", `${collectPath}/onlinemapcollectresource/v1/collect/person/changerelation`, params);

// 使用帮助--- 保存使用帮助/常见问题
export const savaHelp = (data) => req(
  'patch', `${collectPath}/usehelp/v1/help`, data
)
// 使用帮助--- 上传文件至本地目录在detail.vue文件内
// 使用帮助--- 删除使用帮助/常见问题及文件 all  /usehelp/v1/help/{id}
export const deleteHelpInfo = id =>
  req("delete", `${collectPath}/usehelp/v1/help/${id}`);
// 使用帮助---根据条件获取常见问题列表  /usehelp/v1/problem common problem
export const problemInfo = params =>
  req("post", `${collectPath}/usehelp/v1/problem`, params);

// 使用帮助---根据条件获取使用帮助列表
export const useHelpInfo = params =>
  req("post", `${collectPath}/usehelp/v1/help`, params);

// 使用帮助---根据条件获取帮助信息列表  all
export const helpInfoAll = params =>
  req("post", `${collectPath}/usehelp/v1/help/all`, params);

// 使用帮助---根据条件获取更新日志列表/usehelp/v1/changelog
export const changeLogInfo = params =>
  req("post", `${collectPath}/usehelp/v1/changelog`, params);

// 根据ID使用帮助/常见问题及文件
export const getHelpInfoById = (id) =>
  req("get", `${collectPath}/usehelp/v1/help/${id}`);

// 使用帮助--- 停/启用 /usehelp/v1/state/{id}

// 使用帮助---删除文件
export const deletefile = id =>
  req("delete", `${collectPath}/usehelp/v1/helpfile/${id}`);

// 村两委Party Resource清真寺
// 村两委--- 保存村两委/清真寺人员&任职信息
export const savaParty = (data) => req(
  'patch', `${collectPath}/mosque/v1/mosque`, data);

// 村两委--- 删除村两委/清真寺任职信息
export const deletePartyInfo = id =>
  req("delete", `${collectPath}/mosque/v1/mosque/${id}`);

// 村两委--- 获取村党委/清真寺信息
export const getPartyMosqueInfo = (id) => req(
  'get', `${collectPath}/areadistribution/v1/areamaps/agency/${id}`);
// 村两委--- 获取村两委/清真寺任职信息
export const partyInfoView = (id) => req(
  'get', `${collectPath}/mosque/v1/mosque/${id}`);

// 根据条件获取村两委/清真寺台账
export const mosquePageInfo = params =>
  req("post", `${collectPath}/mosque/v1/mosque`, params);

// 无证人员管理 table 列表
export const GET_NO_IDNUMBER_TABLE_LIST = params =>
  req("post", `${collectPath}/noidcardpersonmanage/v1/person/list`, params);

// 提交核实 无证人员
export const VERIFY_NO_IDNUMBER = params =>
  req("post", `${collectPath}/noidcardpersonmanage/v1/verify/commit`, params);

// 获取审核中的 无证人员信息
export const GET_NO_IDNUMBER_PERSON_INFO = params =>
  req("get", `${collectPath}/noidcardpersonmanage/v1/personinfo/verify/${params.idNumber}`, null, params);

// 审核核实无证人员信息
export const AUDIT_NO_IDNUMBER_PERSON_INFO = params =>
  req("post", `${collectPath}/noidcardpersonmanage/v1/verify/audit`, params);
// 判断登陆用户是否有审批核实无证人员权限
export const GET_AUDIT_NO_IDNUMBER_PERSON_AUTH = params =>
  req("get", `${collectPath}/noidcardpersonmanage/v1/user/audit/permissions`);

// 获取无证人员 tab 合计数
export const GET_NO_IDNUMBER_TAB_TOTAL = params =>
  req("post", `${collectPath}/noidcardpersonmanage/v1/person/list/count`, params);
// 案件线索串并分析

export const GET_CASECLUB_JOIN_NANALYSIS = data =>
  req("post", `${joinPath}/casecluealalysisresource/v1/caseclue/joinanalysis`, null, {
    idNumbers: data.join()
  });

// 案件线索选则获取人员
export const GET_CASECLUB_JOIN_PERSONS = data =>
  req("post", `${joinPath}/casecluealalysisresource/v1/caseclue/joinanalysis/showPersons`, null, {
    caseClueIds: data.join()
  });

// 获取 案线图串并数据
export const GET_CASE_MAP_JOIN_DATA = data =>
  req("post", `${joinPath}/casecluealalysisresource/v2/caseclue/joinanalysis`, null, {
    idNumbers: data.join()
  });

// 选中案线图 获取人员列表
export const GET_PERSONS_LIST_BY_CASE_MAP_ITEM = data =>
  req("post", `${joinPath}/casecluealalysisresource/v2/caseclue/joinanalysis/showPersons`, null, {
    caseClueIds: data.join()
  });

// 涉案涉线人员列表
export const GET_IDNUMBERS_BY_CASEID = (caseId) =>
  req("get", `${joinPath}/casecluealalysisresource/v1/person/idNumber/${caseId}`, null, {
    caseId
  });
// 获取案件线索串联列表
export const GET_CASECLUBJOINCOUNT_BY_CASEID = (caseId) =>
  req("post", `${collectPath}/caseclueresource/v1/caseclue/joincount/${caseId}`);

// 获取图谱编辑关系中除本人及子节点外的人员
export const GET_EXCLUDE_PERSONINFO_LIST = (idNumber, mapCollectId) =>
  req("get", `${collectPath}/onlinemapcollectresource/v1/mapperson/exclude/${idNumber}`, null, {
    mapCollectId
  });

//修改图谱人员关系
export const POST_UPDATA_PERSON_RELATION = (params) =>
  req("post", `${collectPath}/onlinemapcollectresource/v1/mapperson/modify/relation`, params);

// 移除图谱中人员关系
export const POST_REMOVE_PERSON_RELATION = (idNumber, collectId) =>
  req("post", `${collectPath}/onlinemapcollectresource/v1/mapperson/remove/relation/${idNumber}`, null, {
    collectId
  });

// 获取变更记录
export const GET_CHANGE_RECOR_BY_ID = (idNumber) =>
  req("get", `${collectPath}/collectmapresource/personcommonform/changes/${idNumber}`);
