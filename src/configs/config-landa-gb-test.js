/*
 * @Author: itap
 * @Date:   2018-09-25 10:03:15
 * @Last Modified by:   itap
 * @Last Modified time: 2019-05-29 23:57:27
 */

export const config = {
  bzLogin: 'http://192.168.0.184:20001/idsecurity/UserLoginResource/v1/auth/login',
  joinPath: 'http://192.168.0.184:20002/mapanalysis/',
  mainPath: 'http://192.168.0.184:20001/',
  commonPath: "http://192.168.0.184:20005/",
  logPath: "http://192.168.0.184:20004/",
  collectPath: 'http://192.168.0.184:20003/mapcollect/',
  webSocket: '192.168.0.184:20001',
  imgPath: 'http://192.168.0.184/sfzh/zpxp/',
  fileDownloadPath: 'http://192.168.0.184/file_list/',
  helpFilePath: "http://192.168.0.184/helpfile/",
  baiduMapPath: 'http://192.168.0.184/maps/aks/',
  imgType: '.jpg',
  project: {
    name: '新疆公安“智谱”平台',
    version: "",
    locale: 'gb',
    hydraType: 'hydraCard',
    highlightColor: {
      work_object: 'black'
    },
    copyright: '',
    localSuffix: '-aks',
    isShowBg: false,
    showOnlyPkiLogin: false //仅使用PKI登录
  },
  mapType: {
    AJGX: '图谱B', //涉危安案（事）（件）人员关系图
    SHGX: '图谱E', //历年被打击处理人员分布示意图
    ZJJDBar: '图谱A', //宗教极端思想传承图
    ZJJD: '图谱G', //宗教极端思想传承体系
    SWGW: '图谱C', //涉案家族关系图
    SCRY: '图谱F', //出入境人员分布图
    CRJ: '图谱D' //境外涉恐涉暴人员关系图
  },
  properties: {
    profession: "焊工",
    HJD: "地址",
    STATE: "状态",
    RYBQ: "标签",
    politicsStatus: "",
    STATE_COLOR: "",
    XM: "姓名",
    phone: "电话",
    PERSON_ID: "编号",
    FIVE_ONE_PROPERTY: "",
    GENDER: "性别",
    PERSON_DESCRIPTION: "备注",
    SFZHM: "身份证号"
  },
  homeConfig: {
    showSearch: true,
    showTreeDept: false, //首页是否显示单位选择框
  },
  // 图谱页面信息的配置
  mapPageConfig: {
    riskLevelTitle: "图谱概述",
    perCountTitle: "涉及总人数:",
    associationAnalysisLocation: true, //关联分析在轨道信息的上面
    showGuiJiLocation: false, //查看档案-图谱node是否显示轨迹信息
  },
  geoCoordMap: {

  },
  idNumberVerify: /^(\d{17}[\d|x|X]|\d{15}|WZ\d{16}|Y\d{17}|0000\d{14})$/, // 身份证正则校验
}
