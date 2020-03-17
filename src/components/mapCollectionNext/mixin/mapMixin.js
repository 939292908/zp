/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 12:04:19
 * @LastEditTime: 2019-09-17 10:36:05
 * @LastEditors: Please set LastEditors
 */
/**
 * 图谱采集的混入功能
 */
export const mapMixin = {
  data() {
    return {
      statusList: {
        myNavModalShow: false,
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        MultiModal: false,
        ShowMultiModal: true,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false
      },
      pageTypes: [{
          name: '采集任务',
          icon: 'iconfont icon-renwuliebiao',
          route: '/collectList',
          query: {
            type: '0', //图谱还是人员任务（1：人员，2：图谱，0：任务）
            title: '采集任务列表'
          },
          component: "taskList"
        },
        {
          name: '图谱列表',
          icon: 'iconfont icon-tupucaiji',
          route: '/collectList',
          query: {
            type: '2', //图谱还是人员任务（1：人员，2：图谱，0：任务）
            title: '图谱列表'
          },
          component: "mapList"
        },
        {
          name: '人员列表',
          icon: 'iconfont icon-renyuanliebiao',
          route: '/collectList',
          query: {
            type: '1', //图谱还是人员任务（1：人员，2：图谱，0：任务）
            title: '人员列表'
          },
          component: "personList"
        },
        {
          name: '采集上传校验',
          icon: 'iconfont icon-ziduanxiaoyan',
          type: 'dialog',
          component: "validateFile"
        }
      ],
      topTagColors: {
        '户': '#4298c7',
        '案': '#eb4826',
        '朝': '#6668c6',
        '境': '#8d3b65',
        '社': '#bc4166',
        '危': '#f19d38',
        '宗': '#bf6b27',
        '打': '#bc4166',
        '族': '#f19d38',
        '境': '#6668c6',
        '暴': '#8d3b65',
        '族': '#f19d38',
      },
      tplxColorList: {
        '户籍人口家谱图': '#4298c7',
        '涉案人员案件关系图': '#eb4826',
        '私朝人员关系图': '#6668c6',
        '朝觐人员关系图': '#6668c6',
        '出入境人员关系图': '#8d3b65',
        '涉案人员社会关系图': '#bc4166',
        '涉稳高危人员家谱图': '#f19d38',
        '宗教极端思想历史传承图': '#bf6b27',
        '家族族谱关系图': '#f19d38',
        '历年危安涉案（事）件涉案（线）人员网络关系图': '#eb4826',
        '宗教极端思想传承图': '#bf6b27',
        '历年被打击处理人员分布示意图': '#bc4166',
        '出入境人员分布图': '#6668c6',
        '境外涉恐涉暴人员网络关系图': '#8d3b65'
      },
      personLabel: {
        '社会面': '#008800',
        '收押': '#cb4324',
        '收教': '#f7b940',
        '境外': '#ffe900',
        '死亡': '#6B6B6B',
        '去向不明': '#0000fe'
      },
      mapTypeList: [{
          "id": "1",
          "name": "户籍人口家谱图",
          "displayName": "户籍人口家谱图",
          "shortName": "户",
          "mapComponent": "HouseholdFormTpType",
          "objectComponent": "HouseholdWorkObjective",
          "objectViewComponent": "HouseholdWorkObjectiveView",
          "mapGraphComponent": "HouseholdMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "添加父母",
            right: "添加配偶",
            bottom: "添加子女",
            left: "",
          }
        },
        {
          "id": "2",
          "name": "涉稳高危人员家谱图",
          "displayName": "家族族谱关系图",
          "shortName": "族",
          "mapComponent": "FamilyFormTpType",
          "objectComponent": "FamilyWorkObjective",
          "objectViewComponent": "FamilyWorkObjectiveView",
          "mapGraphComponent": "FamilyMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "添加父母",
            right: "添加配偶",
            bottom: "添加子女",
            left: "",
          }
        },
        {
          "id": "3",
          "name": "出入境人员关系图",
          "displayName": "出入境人员关系图",
          "shortName": "境",
          "mapComponent": "EntryExitRelationFormTpType",
          "objectComponent": "EntryExitRelationFormObjective",
          "objectViewComponent": "EntryExitRelationView",
          "mapGraphComponent": "EntryExitRelationMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "",
            right: "",
            bottom: "",
            left: "",
          }
        },
        {
          "id": "4",
          "name": "涉案人员案件关系图",
          "displayName": "历年危安涉案（事）件涉案（线）人员网络关系图",
          "shortName": "案",
          "mapComponent": "CaseFormTpType",
          "objectComponent": "CaseWorkObjective",
          "objectViewComponent": "CaseWorkObjectiveView",
          "mapGraphComponent": "CaseMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "",
            right: "添加",
            bottom: "",
            left: "",
          }
        },
        {
          "id": "7",
          "name": "私朝人员关系图",
          "displayName": "朝觐人员关系图",
          "shortName": "朝",
          "mapComponent": "HajjFormTpType",
          "objectComponent": "HajjWorkObjective",
          "objectViewComponent": "HajjWorkObjectiveView",
          "mapGraphComponent": "HajjMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "",
            right: "添加",
            bottom: "",
            left: "",
          }
        },
        {
          "id": "6",
          "name": "宗教极端思想历史传承图",
          "displayName": "宗教极端思想传承图",
          "shortName": "宗",
          "mapComponent": "ReligiousFormTpType",
          "objectComponent": "ReligiousWorkObjective",
          "objectViewComponent": "ReligiousWorkObjectiveView",
          "mapGraphComponent": "ReligiousMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "添加师傅",
            right: "",
            bottom: "添加弟子",
            left: "",
          }
        },
        {
          "id": "9",
          "name": "历年来被打击处理人员分布图",
          "displayName": "历年被打击处理人员分布示意图",
          "shortName": "打",
          "mapComponent": "distributionMapFormTpType",
          "objectComponent": "DistributionMapWorkObjective",
          "objectViewComponent": "DistributionWorkObjectiveView",
          "action": {
            top: "添加父母",
            right: "添加配偶",
            bottom: "添加子女",
            left: "",
          }
        },
        {
          "id": "8",
          "name": "出入境人员分布示意图",
          "displayName": "出入境人员分布图",
          "shortName": "境",
          "mapComponent": "distributionMapFormTpType",
          "objectComponent": "DistributionMapWorkObjective",
          "objectViewComponent": "DistributionWorkObjectiveView"
        },
        {
          "id": "10",
          "name": "境外涉恐涉暴人员网络关系图",
          "displayName": "境外涉恐涉暴人员网络关系图",
          "shortName": "暴",
          "mapComponent": "EntryExitFormTpType",
          "objectComponent": "EntryExitWorkObjective",
          "objectViewComponent": "EntryExitWorkObjectiveView",
          "mapGraphComponent": "EntryExitMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "",
            right: "",
            bottom: "",
            left: "",
          }
        },
        {
          "id": "5",
          "name": "涉案人员社会关系图",
          "displayName": "涉案人员社会关系图",
          "shortName": "社",
          "mapComponent": "SocietyFormTpType",
          "objectComponent": "SocietyWorkObjective",
          "objectViewComponent": "SocietyWorkObjectiveView",
          "mapGraphComponent": "SocietyMapGraph",
          "objectTitle": "工作对象的基本信息",
          "action": {
            top: "",
            right: "",
            bottom: "",
            left: "",
          }
        }
      ]
    }
  },
  methods: {
    /**
     * 窗口大小调整
     * @function resizeHandler
     * @author julie
     */
    resizeHandler(height = 110) {
      this.$nextTick(() => {
        if (this.$refs.wrapperDetail) {
          let wrapperDetailHeight = this.$refs.wrapperDetail.clientHeight
          if (wrapperDetailHeight - height < 300) {
            this.tableHeight = 300
          } else {
            this.tableHeight = wrapperDetailHeight - height
          }
        } else {
          this.tableHeight = 300
        }
      });
    },
    /**
     * 返回首页
     * @author julie
     */
    backIndex() {
      this.$router.push({
        path: '/index',
      });
    },
    /**
     * 返回采集列表页
     * @author julie
     */
    backList() {
      let query = this.pageTypes.find(x => {
        return x.query.type == this.$route.query.type
      }).query;
      this.$router.push({
        path: '/collectList',
        query: query
      });
    },
    /**
     * 返回采集入口首页
     * @author julie
     */
    backCollection() {
      this.$router.push({
        path: '/collect',
      });
    },
    /**
     * 容器点击事件
     * @author julie
     */
    // handleWrapperClick(event) {
    //   this.statusList.uploadImg = false;
    //   this.statusList.personModalShow = false;
    //   this.statusList.newsModalShow = false;
    //   let appElement = document.querySelector('div.app-list.app')
    //   if(event.path.indexOf(appElement) == -1) {
    //     this.statusList.appModalShow=false;
    //   }
    //   // this.statusList.appModalShow = false;
    //   this.statusList.messageDetailsShow = false;
    //   this.statusList.guidelinesShow = false;
    //   this.statusList.feedbackShow = false;
    //   this.statusList.myNavModalShow = false;
    // },
    /**
     * 个人，消息，应用切换
     * @function getViewIndex
     * @author erbing
     */
    getViewIndex(index) {
      this.statusList.newsModalShow = false;
      this.statusList.appModalShow = false;
      this.statusList.personModalShow = false;
      if (index == '0') {
        this.statusList.personModalShow = true;
      } else if (index == '1') {
        this.statusList.newsModalShow = true;
      } else if (index == '2') {
        this.statusList.appModalShow = true;
      }
    },
  }
}
