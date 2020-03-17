/*
 * @Author: itap
 * @Date:   2018-09-25 10:03:15
 * @Last Modified by:   itap
 * @Last Modified time: 2019-05-29 23:57:27
 */

export const config = {
  // bzLogin: 'http://104.17.57.4:30001/idsecurity/UserLoginResource/v1/auth/login',
  // joinPath: 'http://104.17.57.4:30002/mapanalysis/',
  // mainPath: 'http://104.17.57.4:30001/',
  // collectPath: 'http://104.17.57.4:30003/mapcollect/',
  bzLogin: 'http://104.168.2.90:20001/idsecurity/UserLoginResource/v1/auth/login',
  joinPath: 'http://104.168.2.90:20002/mapanalysis/',
  mainPath: 'http://104.168.2.90:20001/',
  commonPath: "http://104.168.2.90:20005/",
  logPath: "http://104.168.2.90:20004/",
  collectPath: 'http://104.168.2.90:20003/mapcollect/',
  webSocket: '104.168.2.90:20001',
  imgPath: 'http://104.168.2.90/sfzh/zpxp/',
  imgType: '.jpg',
  fileDownloadPath: 'http://104.168.2.90/file_list/',
  helpFilePath: "http://104.168.2.90/helpfile/",
  baiduMapPath: 'http://104.168.2.90/maps/aks/',
  project: {
    name: '阿克苏智谱管理应用系统',
    version: "",
    locale: 'aks',
    hydraType: 'hydraCard',
    highlightColor: {
      work_object: 'black'
    },
    copyright: '',
    localSuffix: '-aks',
    isShowBg: false,
    showOnlyPkiLogin: true //仅使用PKI登录
  },
  mapType: {
    HJRK: '户籍人口家谱图',
    HJRK: '宗教极端思想传承图统计',
    AJGX: '涉危安案（事）（件）人员关系图',
    SHGX: '历年被打击处理人员分布示意图',
    ZJJDBar: '宗教极端思想传承图',
    ZJJD: '宗教极端思想传承体系',
    SWGW: '涉案家族关系图',
    SCRY: '出入境人员分布图',
    CRJ: '境外涉恐涉暴人员关系图'
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
