/*
 * @Author: itap
 * @Date:   2018-09-25 10:03:15
 * @Last Modified by:   itap
 * @Last Modified time: 2019-03-21 21:51:09
 */
// export const config = {
//   //relation : 'http://172.16.3.29:2488/iTap_OrientService',
//   relation : 'http://ITAP-ORIENTSERVICE-V4.landaudev.com/iTap_OrientService:801',
//   login : 'http://itap-userlogin-v4.landaudev.com/userLogin/login:801',
//   home : 'http://itap-plushomepage-v4.landaudev.com/iTap-PlusHomepage/:801',
//   project : {
//   	name : '',
//   	copyright : ''
//   }
// }
export const config = {
  login: 'http://104.152.4.59:8760/userLogin/login',
  home: 'http://104.152.4.59:9091/iTap-PlusHomepage/IndexController',
  iosPath: 'http://104.152.4.59:2489/iTap_OrientService',
  imgPath: 'http://104.152.4.59/sfzh/zpxp/',
  fileDownloadPath: 'http://104.152.4.59/file_list/',
  helpFilePath: "http://104.152.4.59/helpfile/",
  // 巴州项目地址
  bzLogin: 'http://172.16.6.184:20001/idsecurity/UserLoginResource/v1/auth/login',
  joinPath: 'http://172.16.6.184:20002/mapanalysis/',
  mainPath: 'http://172.16.6.184:20001/',
  commonPath: "http://172.16.6.184:20005/",
  logPath: "http://172.16.6.184:20004/",
  collectPath: 'http://172.16.6.184:20003/mapcollect/MapCollect',
  webSocket: '172.16.6.184:20001',

  imgType: '.png',
  project: {
    name: '巴州涉稳重点人员图谱式管理系统',
    version: "",
    copyright: ''
  },
  mapType: {
    HJRK: '户籍人口家谱图谱',
    AJGX: '涉案人员案件关系图谱',
    SHGX: '涉案人员社会关系图谱',
    ZJJD: '宗教极端思想历史传承图谱',
    SWGW: '涉稳高危人员家族图谱',
    SCRY: '朝觐人员关系图谱',
    CRJ: '出入境人员关系图谱'
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
    showSearch: false,
    showTreeDept: false, //首页是否显示单位选择框
  },
  // 图谱页面信息的配置
  mapPageConfig: {
    riskLevelTitle: "风险要素",
    perCountTitle: "家庭总人数:",
    associationAnalysisLocation: true, //关联分析在轨道信息的上面
    showGuiJiLocation: false, //查看档案-图谱node是否显示轨迹信息
  },
  idNumberVerify: /^(\d{17}[\d|x|X]|\d{15}|WZ\d{16}|Y\d{17}|0000\d{14})$/, // 身份证正则校验
}
