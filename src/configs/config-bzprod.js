/*
 * @Author: itap
 * @Date:   2018-09-25 10:03:15
 * @Last Modified by:   itap
 * @Last Modified time: 2019-05-29 23:57:40
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
  // login: 'http://104.152.4.59:8760/userLogin/login',
  // home : 'http://104.152.4.59:9091/iTap-PlusHomepage/IndexController',
  // iosPath: 'http://104.152.4.59:2489/iTap_OrientService',
  // imgPath : 'http://104.152.4.59/sfzh/zpxp/',

  // 巴州项目地址
  // bzLogin: 'http://172.16.6.184:20001/idsecurity/UserLoginResource/v1/auth/login',
  // joinPath: 'http://172.16.6.184:20002/mapanalysis/',
  // mainPath: 'http://172.16.6.184:20001/',
  // collectPath: 'http://172.16.6.184:20003/mapcollect/MapCollect',

  imgPath: 'http://172.16.6.184/sfzh/zpxp/',
  helpFilePath: "http://172.16.6.184/helpfile/",
  bzLogin: 'http://172.16.6.184:20001/idsecurity/UserLoginResource/v1/auth/login',
  joinPath: 'http://172.16.6.184:20002/mapanalysis/',
  mainPath: 'http://172.16.6.184:20001/',
  commonPath: "http://172.16.6.184:20005/",
  logPath: "http://172.16.6.184:20004/",
  collectPath: 'http://172.16.6.184:20003/mapcollect/',
  webSocket: '172.16.6.184:20001',
  baiduMapPath: 'http://172.16.11.16:8866/',
  imgType: '.jpg',
  fileDownloadPath: 'http://172.16.6.184/file_list/',

  project: {
    name: '智谱',
    version: "",
    hydraType: 'hydraCard',
    locale: 'bz',
    highlightColor: {
      work_object: 'black'
    },
    copyright: '',
    localSuffix: '',
    isShowBg: true
  },
  mapType: {
    HJRK: '户籍人口家谱图',
    AJGX: '涉案人员案件关系图',
    SHGX: '涉案人员社会关系图',
    ZJJD: '宗教极端思想历史传承图',
    SWGW: '涉稳高危人员家谱图',
    SCRY: '私朝人员关系图',
    CRJ: '出入境人员关系图'
  },
  properties: {
    profession: "焊工",
    HJD: "地址",
    STATE: "状态",
    RYBQ: "属性",
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
  topTagColors: { //标签颜色
    '户': '#4298c7',
    '族': '#f19d38',
    '危': '#f19d38',
    '案': '#eb4826',
    '宗': '#bf6b27',
    '打': '#ff0000',
    '境': '#993399',
    '暴': '#8d3b65',
    '社': '#bc4166',
    '朝': '#6668c6',
  },
  tagColor: { //五位一体颜色
    '政': '#666666',
    '宗': '#008000',
    '商': '#f49e00',
    '恐': '#333333',
    '黑': '#999999'
  },
  tagIconFont: {
    '政': 'icon-zheng',
    '宗': 'icon-zong1',
    '商': 'icon-shang',
    '恐': 'icon-kong',
    '黑': 'icon-hei'
  },
  personLabel: { //人员状态颜色
    '社会面': '#008800',
    '收押': '#cb4324',
    '收教': '#f7b940',
    '境外': '#ffe900',
    '死亡': '#6B6B6B',
    '去向不明': '#0000fe'
  },
  idNumberVerify: /^(\d{17}[\d|x|X]|\d{15}|WZ\d{16}|Y\d{17}|0000\d{14})$/, // 身份证正则校验
}
