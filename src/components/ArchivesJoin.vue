<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 09:08:39
 * @LastEditTime: 2019-10-30 15:06:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="archivesJoin" class="result" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="图谱展示" :showSearch="false">
      <span @click="backArchives()" style="cursor:pointer;">{{ mc+'>' }}</span>
    </app-header>
    <!-- D3控件区域 -->
    <div class="result-cont">
      <div id="d3Graph" class="d3Graph">
        <div class="title">
          <span class="search-result">{{'用时 ' + fetchDetail.executeTime + ' 秒'}}</span>
          <Input
            v-model="searchHighlightNode"
            placeholder="输入搜索条件"
            style="width: 300px;margin-left:50px;"
            @keyup.enter.native="searchHighlight(1)"
          />
          <Button type="primary" icon="ios-search" @click="searchHighlight(1)">搜索</Button>
          <!-- 图谱切换按钮 -->
          <div class="map-change" v-if="opt">
            <span class="text">视图:</span>
            <template v-if="isShowMapTypeViewBtn">
              <span
                v-if="showViewButton(['4','7'])"
                @click="triggerViewClick('level')"
                :class="{'view-btn':true, active: opt.type == 'level'}"
              >层次图</span>
              <span
                v-if="showViewButton(['4','7'])"
                @click="triggerViewClick('levelTree')"
                :class="{'view-btn':true, active: opt.type =='levelTree'}"
              >树形层次图</span>
              <span
                v-if="showViewButton(['3','10','5'])"
                @click="triggerViewClick('social')"
                :class="{'view-btn':true, active: opt.type =='social'}"
              >树形分组图</span>
            </template>
            <span
              @click="triggerViewClick('tree')"
              :class="{'view-btn':true, active: opt.type == 'tree'}"
            >树形图</span>
          </div>
          <!-- 导出按钮 -->
          <Button
            size="small"
            style="marginLeft:8px"
            @click="downloadBtnClick"
            :loading="loadingBtn"
          >
            <span v-if="!loadingBtn">数据导出</span>
            <span v-else>正在导出</span>
            <i class="iconfont icon-shangchuan icon-daochu" style="color:#0668c8;font-weight: 700;position: relative;top: 2px;"></i>
          </Button>
          <!--  -->
          <span title="图谱概述展开\图谱概述关闭" class="count-result-panel">
            <i
              @click="statusList.showMapOverview = !statusList.showMapOverview"
              class="iconfont icon-zairumoban"
            ></i>
          </span>
          <div
            title="图谱串并"
            class="count-result-panel-relevance"
            @click="mapMerge"
            v-if="this.hasPageAuth(this.constantPageMap.PAGE_Join_ID)"
          >
            <span>
              <em>图谱串并</em>
              <i class="iconfont icon-guanlian1"></i>
            </span>
          </div>
          <div
            title="关系挖掘"
            class="count-result-panel-relevance"
            @click="analyze('/relationCheck')"
            v-if="this.hasPageAuth(this.constantPageMap.PAGE_Relation_Check_ID)"
          >
            <span>
              <em>关系挖掘</em>
              <i class="iconfont icon-baoliubihuanshuju"></i>
            </span>
          </div>
          <div
            title="群体分析"
            class="count-result-panel-relevance"
            @click="analyze('/groupAnalyse')"
            v-if="this.hasPageAuth(this.constantPageMap.PAGE_Group_Analyse_ID)"
          >
            <span>
              <em>群体分析</em>
              <i class="iconfont icon-duoren"></i>
            </span>
          </div>
        </div>
        <!-- d3图形展示 -->
        <div class="graphical" v-show="statusList.d3Show">
          <!-- 风险要素组件
          <riskLevel v-show="statusList.showMapOverview" :assessData="assessData" ref="risk" @highlightNodes="highlightNodes"></riskLevel>-->
          <!-- 图谱概述组件 -->
          <MapOverview
            v-show="statusList.showMapOverview"
            :assessData="newAssessData"
            ref="risk"
            @on-hide="statusList.showMapOverview = false"
            @on-change="handleSelectClick"
            @on-show-detail="handleViewMapInfo"
          ></MapOverview>
          <!-- 连线变色高亮 -->
          <linksHighLight
            v-show="setLinks.mapIdNameMapping.length > 0"
            :mapIdNameMapping="setLinks.mapIdNameMapping"
            @highLightMapping="highLightMapping"
          ></linksHighLight>
          <div class="func-btn-group">
            <div class="group-left">
              <ul>
                <!-- <li><i class="iconfont icon-baocun" title="生成谱系档案"></i></li> -->
                <li>
                  <i class="iconfont icon-pingmukuaizhao" @click="saveAsPng" title="快照"></i>
                </li>
                <li>
                  <i class="iconfont icon-shuaxin" @click="refresh" title="刷新"></i>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
          <div v-show="statusList.d3Show" id="hydra" width="1300" height="800"></div>
        </div>
        <loading v-model="statusList.d3Loading" color="white" content="图形加载中"></loading>
      </div>
    </div>
    <!-- 个人信息 -->
    <transition name="personInforArea">
      <ArchivalInfor
        v-show="statusList.PersonInforShow"
        @listenToChild="hidePersonInfor"
        :tpInfo="tpInfo"
      ></ArchivalInfor>
    </transition>
    <!-- 高级查询模态窗 -->
    <D3FilterCondition
      v-model="filterConditionVisible"
      :params="filterConditionParams"
      :isShowOption="true"
    ></D3FilterCondition>
  </div>
</template>

<script>
import moment from "moment";
import appHeader from "@/components/assembly/AppHeader";
import * as d3 from "d3v4";
import hydra from "../../static/vendors/hydraCard.js";
import MapOverview from "@/components/assembly/MapOverview";
import linksHighLight from "@/components/assembly/linksHighLight/LinksHighLight";
import Loading from "@/components/assembly/Loading";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/mapJoin/index.js";
import { CASE_CODE, CLUB_CODE } from "@/api/config.js";
import md5 from "@/md5/md5.js";
import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
import * as tool from "@/tools/units.js";
import {
  transferParameters,
  createRMenu,
  topTagClickFn,
  caseClueFn
} from "@/tools/units.js";
export default {
  name: "Join",
  components: {
    Loading,
    MapOverview,
    linksHighLight,
    appHeader,
    ArchivalInfor,
    D3FilterCondition
  },
  data() {
    return {
      loadingBtn: false,
      opt: null,
      mapFlag: "", //图谱展示效果类型，0:tree,2:level,1:social,2:levelTree
      filterConditionVisible: false,
      filterConditionParams: null,
      tpInfo: {},
      d3Data: {},
      hydra: "", //D3卡片展示
      keyword: "",
      language: "",
      tpids: this.$route.query.tpids,
      passiveID: this.$route.query.passiveID,
      rid: [], //从哪个进入的图谱，显示绿色高亮的id
      mc: this.$route.query.mc,
      pageName: this.$route.query.pageName,
      token: "",
      path: this.$config.home,
      joinPath: this.$config.joinPath,
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
        // conditionList: true,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        isShowMap: false,
        showMapOverview: true
      },
      fetchDetail: {
        entity: 0,
        executeTime: 0
      },
      saveName: "",
      graph: {},
      nodeID: "",
      nodeType: "",
      curEneityData: {},
      curEneityAllData: {
        fxpf: "",
        rybq: [],
        imgSrc: "",
        labelBgColor: [],
        eneityBasicInfo: "",
        // eneityBasicInfo : [],
        eneityTrajectoryInfo: {
          dataTypes: [],
          data: [],
          datas: [],
          mapData: [],
          photoData: [],
          startTime: "2018-01-01",
          endTime: "",
          showDate: false,
          photoNode: []
        },
        eneityCorrelationInfo: {
          data: []
        }
      },
      commonIds: [], // 共同人ids
      highlight: {}, //户主，头目，宗教师傅等ids
      commonPersonIdNumbers: [], // 共同人的身份账号(两张图进行比较的共同联系人)
      tempData: {},
      //图谱概述页面的
      newAssessData: {
        archiveName: "",
        personCount: 0,
        sexTypeCount: [],
        riskLevel: "",
        personTypeCounts: [],
        labelCount: [],
        mapTypeCounts: []
      },
      assessData: {
        label: "",
        personCount: 0,
        riskLevel: "",
        tpmc: "",
        person_tag: [],
        personLabelCount: {}
      },
      tpData: [],
      mergeLinksData: [],
      resultNodes: [],
      resultLabel: "",
      resultId: [],
      highlightNodeIDs: [],
      searchHighlightNode: "",
      stackmMarriageParam: [
        // {
        //   commandType: 'combine',
        //   nodeId: '#25:594728',
        //   mainMapId: '#26:594726',
        //   targetMapId: '#25:594728'
        // }
      ],
      stackmMarriageParamAll: [],
      treeDataParam: {
        commandType: "combine",
        nodeId: "",
        mainMapId: "",
        targetMapId: ""
      },
      setLinks: {
        //连线变色高亮
        mapIdNameMapping: [],
        resultLinks: [],
        ids: []
      },
      isClear: "",
      comparedId: "",
      centerNodeName: "",
      historyCenterNodeName: "",
      flag: null
    };
  },
  computed: {
    // 是否显示图形展示切换的按钮
    isShowMapTypeViewBtn() {
      let tpids = this.$route.query.tpids;
      let flag = tpids ? (tpids.split(",").length == 1 ? true : false) : false;
      return this.opt && this.setLinks.mapIdNameMapping.length == 1 && flag;
    },
    d3MapData() {
      let tmp = {};
      tmp.properties = {};
      if (this.setLinks.mapIdNameMapping.length > 0) {
        tmp = this.setLinks.mapIdNameMapping[
          this.setLinks.mapIdNameMapping.length - 1
        ];
        tmp.properties = {
          MAP_ID: tmp.mapOraId,
          mapType: tmp.mapType
        };
      }
      return tmp;
    }
  },
  created() {
    if (!this.rid.length) {
      this.rid.push(this.$route.query.rid); //首次进来高亮绿色的那个id
    }

    //if(!sessionStorage.achiveJoinHighlightId){
    sessionStorage.achiveJoinHighlightId = this.$route.query.rid;
    //}

    this.getEntityLinksConfig();
    this.getTreeData(true);
  },
  mounted() {
    const me = this;
    this.graph = hydra.graph(); //D3卡片展示
    this.opt = this.buildOpt();
    this.graph.setOptions(this.opt);
    this.getMapOverview();
    window.onresize = function() {
      let ch = document.documentElement.clientHeight;
      let cw = document.documentElement.clientWidth;
      me.graph.setSize({
        width: cw - 255,
        height: ch - 120
      });
    };
  },
  methods: {
    showViewButton(types) {
      if (types) {
        return types.indexOf(this.setLinks.mapIdNameMapping[0].mapType) != -1;
      } else {
        return false;
      }
    },
    // 关系挖掘 群体分析跳转
    analyze(path) {
      let d3Data = this.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");

      let idNumberArr = nodes.map(x => x.data.properties.SFZHM);
      let idNumbers = idNumberArr.join();
      // mapType
      let mapTypes = this.setLinks.mapIdNameMapping.map(x => x.mapType);
      let mapType = Array.from(new Set(mapTypes)).join();
      console.log(idNumbers, mapType);
      let query = {
        sfzhm: idNumbers,
        mapType: mapType
      };
      let params = JSON.stringify(query);
      transferParameters(this, path, params);
      /* const { href } = this.$router.resolve({
        name: name,
        query: {
          sfzhm: idNumbers,
          mapType: mapType
        }
      });
      window.open(href, '_blank'); */
    },
    // 图谱串并
    mapMerge() {
      let mapCodes = this.setLinks.mapIdNameMapping.map(x => x.mapCode);
      let newMapCodes = mapCodes.join();
      let params = newMapCodes;
      let path = "/join";
      transferParameters(this, path, params, null, "areaMapCodes");
    },
    // 获取图谱概述的数据
    getMapOverview(id) {
      let mapId = this.$route.query.tpids;
      id && (mapId = id);
      comApis.GET_JOIN_MAP_OVERVIEW(mapId).then(res => {
        if (res.code == 200) {
          // console.log(res.data);

          this.newAssessData = res.data;
        }
      });
    },
    // 点击标签 根据item.typeName 高亮相应实体
    handleSelectClick(type, item, index) {
      const me = this;
      let d3Data = me.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      if (nodes.length <= 0) {
        return;
      }
      // 先清除选中
      if (nodes.length > 0) {
        me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
      }
      // 获取选中的值进行查询
      let arr = [];
      switch (type) {
        case "genderId":
          arr = nodes.filter(x => {
            return x.data && x.data.properties.genderId == item.type;
          });
          break;
        case "fiveOnePropertyId": //五位一体
          arr = nodes.filter(x => {
            return (
              x.data &&
              x.data.properties.fiveOnePropertyId.indexOf(item.type) != -1
            );
          });
          break;
        case "levelLine": //案件线索
          arr = nodes.filter(x => {
            return (
              x.data && item.idNumbers.indexOf(x.data.properties.SFZHM) != -1
            );
          });
          break;
        case "stateId": //人员属性
          arr = nodes.filter(x => {
            return (
              x.data &&
              x.data.properties.stateId == (item.type == "无" ? "" : item.type)
            );
          });
          break;
        case "tagId": //人员标签
          arr = nodes.filter(x => {
            return x.data && x.data.properties.tagId.indexOf(item.tagId) != -1;
          });
          break;
      }

      if (arr.length > 0) {
        // 高亮居中
        me.graph.editNodeColor(arr.map(x => x.data.id), "green");
        me.graph.centerSelection(arr, []);
      } else {
        // 重置
        me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
        me.graph.centerSelection(nodes, []);
      }
    },
    // 点击查看图谱详情
    handleViewMapInfo() {
      this.statusList.PersonInforShow = true;
      this.tpInfo = this.d3MapData;
    },
    /**
     * 获取所有相关配置表
     * @function getEntityLinksConfig
     * @author erbing
     */
    getEntityLinksConfig() {
      let me = this;
      let params = new URLSearchParams();
      let url =
        this.joinPath +
        "InitializeResource/v1/getInitializeConfig?language=" +
        me.language +
        "&token=" +
        me.token;
      //params.append('token', me.token);
      this.$axios
        .get(url, params)
        .then(response => {
          if (response.code != 200) {
            return false;
          }
          me.entityPropList = response.data.nodeConfig || [];
          me.linksPropList = response.data.linkConfig || [];
          me.iconsList = response.data.nodeIconConfig || [];
          me.labelColors = response.data.labelColors || [];
          me.assessData.personTag = response.data.personTag; //风险要素人员面板人员标签
          me.iconsList.map(item => {
            for (let i in item) {
              if (i == "path_1") {
                item["path_n"] = item[i];
              }
            }
          });
          me.graph.setIcons(response.data.nodeIconConfig);
        })
        .catch(error => {
          // console.log(error);
        });
    },
    buildOpt(reOption = null) {
      var me = this;
      var width = document.getElementById("hydra").offsetWidth;
      var height = document.documentElement.clientHeight - 110;
      let option = {
        selector: "#hydra",
        width: width,
        height: height,
        offsetTop: 115,
        type: "tree",
        showToptag: true, //是否显示卡片底部图谱标签
        allowDrag: true,
        allowNodeDbclick: false,
        showFilterCondition: true,
        highlightText: "",
        showToptagMenu: true,
        properties: this.$config.properties,
        topTagClickEvt: function(data) {
          debugger;
          let mc = me.$route.query.mc || "智能搜索";
          topTagClickFn(data, mc, me);

          // if (!data) {
          //   return;
          // }
          // if (data.typeId == "8") {
          //   const { href } = me.$router.resolve({
          //     path: "/exitAndEntry",
          //     query: {
          //       areaCode: data.villageCode,
          //       collectId: data.collectId,
          //       sfzhm: data.sfzhm,
          //       state: 1
          //     }
          //   });
          //   window.open(href, "_blank");
          // } else if (data.typeId == "9") {
          //   const { href } = me.$router.resolve({
          //     path: "/underAttack",
          //     query: {
          //       areaCode: data.villageCode,
          //       collectId: data.collectId,
          //       sfzhm: data.sfzhm,
          //       state: 1
          //     }
          //   });
          //   window.open(href, "_blank");
          // } else {
          //   var tpid = data.tpid.replace("#", "i").replace(":", "_"); //如果要跳转的图谱跟当前图谱一致，禁止点击
          //   if (
          //     !data ||
          //     tpid == data.parentTpid ||
          //     data.mapId == data.parentTpid
          //   ) {
          //     return;
          //   }
          //   me.statusList.PersonInforShow = false;
          //   me.statusList.MultiModal = false;
          //   // me.tpids = data.tpid;
          //   me.rid = [];
          //   me.rid.push(data.oid); //哪个实体进入高亮绿色
          //   me.stackmMarriageParam = []; //清空之前叠加的图谱id
          //   // me.getTreeData(false);
          //   let passiveID = data.parentTpid.replace("i", "#").replace("_", ":");
          //   const { href } = me.$router.resolve({
          //     name: "ArchivesJoin",
          //     query: {
          //       tpids: data.tpid,
          //       rid: me.rid.join(),
          //       sfzhm: data.sfzhm,
          //       passiveID: passiveID,
          //       mc: me.$route.query.mc || "智能搜索",
          //       pageName: me.pageName
          //     }
          //   });
          //   window.open(href, "_blank");
          // }
        },
        //叠加
        stackClickEvt: function(data) {
          me.stackFn(data);
        },
        //姻亲叠加
        marriageClickEvt: function(data) {
          me.marriageFn(data);
        },
        //全部叠加
        allStackClickEvt: function(data) {
          me.allStackFn(data);
        },
        mouseoutEvt: function(data) {},
        // 高级
        filterConditionClickEvt: function(data) {
          me.filterConditionVisible = true;
          me.filterConditionParams = data;
        },
        // 案件线索的点击事件
        caseClueEvt: function(data) {
          caseClueFn(data, me);
          // if (data.name == CASE_CODE || data.name == CLUB_CODE) {
          //   const { href } = me.$router.resolve({
          //     path: "/caseClubList",
          //     query: {
          //       sfzhm: data.sfzhm
          //     }
          //   });
          //   window.open(href, "_blank");
          // }
        }
      };
      if (reOption) {
        Object.assign(option, reOption);
      }
      return option;
    },
    // 叠加
    stackFn(data) {
      let me = this;
      me.updateGraphType("");
      me.centerNodeName = data.name;
      me.historyCenterNodeName = data.name;
      var tpid = data.tpid.replace("#", "i").replace(":", "_");
      if (!data || tpid == data.parentTpid || data.mapId == data.parentTpid) {
        //如果要叠加的图谱跟当前图谱一致，禁止点击
        return;
      }
      me.rid = [];
      me.rid.push(data.oid); //哪个实体进入高亮绿色
      me.treeDataParam.commandType = "combine";
      me.treeDataParam.nodeId = data.oid.replace("i", "#").replace("_", ":"); //当前点击的实体id
      me.treeDataParam.mainMapId = data.parentTpid
        .replace("i", "#")
        .replace("_", ":"); //当前图谱的id
      me.treeDataParam.targetMapId = data.tpid; //要跳转的图谱id
      // 判断当前的参数是否已经选择过，选过不添加，否则添加
      var treeDataObj = JSON.parse(JSON.stringify(me.treeDataParam));
      // || x.targetMapId == treeDataObj.targetMapId
      var isExist = me.stackmMarriageParam.some(x => x == treeDataObj);
      if (!isExist) {
        me.stackmMarriageParam.push(treeDataObj);
      }
      me.treeDataParam.commandType = "combine";
      me.treeDataParam.nodeId = "";
      me.treeDataParam.mainMapId = "";
      me.treeDataParam.targetMapId = "";
      me.isClear = false;
      me.getTreeDatas("stack", me.isClear);
    },
    // 姻亲
    marriageFn(data) {
      debugger;
      let me = this;
      me.updateGraphType("");
      me.centerNodeName = data.name;
      me.historyCenterNodeName = data.name;
      var tpid = data.tpid.replace("#", "i").replace(":", "_");
      if (!data || tpid == data.parentTpid || data.mapId == data.parentTpid) {
        //如果要叠加的姻亲图谱跟当前图谱一致，禁止点击
        return;
      }
      let redList = ["配偶", "妻子", "前配偶", "前妻", "丈夫", "前夫"];
      if (
        !data.relationName ||
        redList.indexOf(data.relationName) == -1 ||
        ((tpid == data.parentTpid || data.mapId == data.parentTpid) &&
          redList.indexOf(data.relationName) != -1)
      ) {
        return false;
      }
      me.rid = [];
      me.rid.push(data.oid); //哪个实体进入高亮绿色
      me.treeDataParam.commandType = "marry";
      me.treeDataParam.nodeId = data.oid.replace("i", "#").replace("_", ":"); //当前点击的实体id
      me.treeDataParam.mainMapId = data.parentTpid
        .replace("i", "#")
        .replace("_", ":"); //当前图谱的id
      me.treeDataParam.targetMapId = data.tpid; //要跳转的图谱id
      var treeDataObj = JSON.parse(JSON.stringify(me.treeDataParam));
      me.stackmMarriageParam.push(treeDataObj);
      me.treeDataParam.commandType = "marry";
      me.treeDataParam.nodeId = "";
      me.treeDataParam.mainMapId = "";
      me.treeDataParam.targetMapId = "";
      me.isClear = false;
      me.getTreeDatas("marry", me.isClear);
    },
    // 全部叠加
    allStackFn(data) {
      let me = this;
      me.updateGraphType("");
      var tpid = data.tpid;
      var parentTpid = data.parentTpid.replace("i", "#").replace("_", ":");
      if (
        data.tps.length == 1 &&
        (tpid == parentTpid || data.mapId == parentTpid)
      ) {
        return;
      }
      var tps = data.tps;
      //console.log(tps,702702);
      tps.forEach(function(item) {
        //item.tpid = item.tpid.replace('#','i').replace(':','_');
        if (parentTpid != item.tpid || parentTpid != item.mapId) {
          me.treeDataParam.commandType = "combine";
          me.treeDataParam.nodeId = data.oid
            .replace("i", "#")
            .replace("_", ":"); //当前点击的实体id
          me.treeDataParam.mainMapId = data.parentTpid
            .replace("i", "#")
            .replace("_", ":"); //当前图谱的id
          me.treeDataParam.targetMapId = item.tpid; //要跳转的图谱id
          var treeDataObj = JSON.parse(JSON.stringify(me.treeDataParam));
          me.stackmMarriageParamAll.push(treeDataObj);
        }
      });
      me.treeDataParam.commandType = "combine";
      me.treeDataParam.nodeId = "";
      me.treeDataParam.mainMapId = "";
      me.treeDataParam.targetMapId = "";
      me.isClear = true;
      me.getTreeDatas("stackAll", me.isClear);
      me.stackmMarriageParamAll = []; //每次全部叠加之后清除当前全部叠加的图谱
      me.stackmMarriageParam = []; //每次全部叠加之后清除之前单个图谱累积叠加后的图谱
    },
    initialize(msg) {
      document.getElementById("hydra").innerHTML = "";
      var me = this;
      me.graph.init();
      me.tempData = JSON.parse(JSON.stringify(msg));
      // me.graph.setHighlightText(me.keyword);
      // console.log(me.keyword,111);
      me.graph.load(msg);
      //me.graph.showKeyNode(true);
      me.initMenu();
    },
    /**
     * 初始化D3右键按钮
     * @function initMenu
     * @author erbing
     */
    initMenu() {
      var me = this;
      var data = [
        {
          text: "查看档案",
          url: "",
          method: function() {
            me.statusList.PersonInforShow = true;
            console.log(me.d3Data);

            me.tpInfo = me.d3Data;
          }
        }
      ];
      d3.select(".nodes")
        .selectAll('g[type="node"]')
        .on("contextmenu", function(e) {
          d3.event.preventDefault();
          d3.event.stopPropagation();
          var selector = document.querySelector("#hydra");
          var panel = selector.querySelector(".panel");
          if (panel) panel.style.display = "none";
          if (e.data.nodeType == "QB_ZP_TP") return;
          // 创建菜单
          createRMenu(
            "rMenu",
            data, // 菜单data数据
            { x: d3.event.pageX + 5, y: d3.event.pageY - 120 },
            e
          );
          me.curEneityData = e.data;
          me.nodeID = e.data.oid;
          me.nodeType = e.data.nodeType;
          me.d3Data = e.data;
        });
    },
    /**
     * 返回主页
     * @function backIndex
     * @author erbing
     */
    backIndex() {
      this.$router.push({
        path: "/index"
      });
    },
    /**
     * 返回谱系档案列表
     * @function backArchives
     * @author erbing
     */
    backArchives() {
      if (this.mc == "智能搜索") {
        this.$router.push({
          path: "/search"
        });
      } else if (this.mc == "全文检索") {
        this.$router.push({
          path: "/fullTextSearch"
        });
      } else if (this.mc == "图谱串并") {
        this.$router.push({
          path: "/join"
        });
      } else if (this.mc == "谱系档案") {
        this.$router.push({
          path: "/archives"
        });
      } else if (this.mc == "图谱管理") {
        this.$router.push({
          path: "/onlineCollect/mapManager"
        });
      } else if (this.mc == "在线采集") {
        this.$router.push({
          path: "/onlineCollect/dashboard"
        });
      } else if (this.mc == "关系挖掘") {
        this.$router.push({
          path: "/relationCheck"
        });
      } else if (this.mc == "群体分析") {
        this.$router.push({
          path: "/groupAnalyse"
        });
      } else if (this.mc == "以人搜图") {
        this.$router.push({
          path: "/searchtp"
        });
      } else if (this.mc == "出入境人员分布图") {
        this.$router.push({
          path: "/collectMarkerExitEnter",
          query: {
            collectId: this.$route.query.collectId,
            areaCode: this.$route.query.areaCode,
            state: "1"
          }
        });
      } else if (this.mc == "被打击人员分布图") {
        this.$router.push({
          path: "/collectMarkerProfile",
          query: {
            collectId: this.$route.query.collectId,
            areaCode: this.$route.query.areaCode,
            state: "1"
          }
        });
      } else if (this.mc == "案线串并") {
        this.$router.push({
          path: "/caseClubAnalysis"
        });
      } else {
        this.$router.push({
          path: "/archives"
        });
      }
    },
    /**
     * 搜索高亮相应实体
     * @function searchHighlight
     * @author erbing
     */
    searchHighlight(type, isInit = false) {
      var me = this;
      let query = sessionStorage.getItem(me.$route.query.query);
      var searchBoxText =
        type == 1
          ? me.searchHighlightNode
          : me.$route.query.sfzhm || query || me.centerNodeName;
      if (!searchBoxText && !me.mc && !me.centerNodeName) {
        me.$Message.warning("请输入查询条件！");
        return false;
      }
      if (type == 1) {
        me.resultLabel = searchBoxText;
      } else if (me.centerNodeName) {
        me.resultLabel = me.centerNodeName;
      } else {
        me.resultLabel = searchBoxText;
      }
      me.resultNodes = [];
      me.resultId = [];
      //1 再次点击选取清空上一次选择的内容，并且清空高亮的ids数组
      let d3Data = this.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      if (!isInit) {
        if (nodes.length != 0) {
          me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
          me.highlightNodeIDs = [];
        }
      }
      if (!me.resultLabel) return;
      //2 找到这次点击标签相关的ID，放到me.highlightNodeIDs里面
      me.filterHighlightIds(nodes, me.resultNodes);
      //3 根据找到的ID进行高亮
      if (me.highlightNodeIDs.length > 0) {
        let color = type == 1 ? "green" : me.centerNodeName ? "red" : "green";
        me.graph.editNodeColor(me.highlightNodeIDs.map(x => x.data.id), color);
        me.graph.centerSelection(me.highlightNodeIDs, []);
      } else {
        me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
        me.graph.centerSelection(nodes, []);
      }
    },
    /**
     * 搜索，点击标签高亮相应实体方法
     * @function filterHighlightIds
     * @author erbing
     */
    filterHighlightIds(data, resultNodes) {
      var me = this;
      var labelObj = {};
      data.forEach(item => {
        var itemArr = item.data.properties;
        for (var i in itemArr) {
          if (
            itemArr[i] != "" &&
            typeof itemArr[i] != "object" &&
            item.data.nodeType != "QB_ZP_TP"
          ) {
            let tmpVal = itemArr[i];
            let labels = me.resultLabel.split(",");
            if (
              tmpVal.indexOf(me.resultLabel) != -1 ||
              labels.indexOf(tmpVal) != -1
            ) {
              //存在这个Label
              labelObj = {
                labelId: item.data.id,
                children: []
              };
              resultNodes.push(labelObj.labelId);
              me.highlightNodeIDs.push(item);
            }
          }
        }
      });
      // var labelObj = {};
      // data.forEach(function(item) {
      //   var itemArr = item.properties;
      //   for (var i in itemArr) {
      //     if (
      //       itemArr[i] != "" &&
      //       typeof itemArr[i] != "object" &&
      //       item.nodeType != "QB_ZP_TP"
      //     ) {
      //       if (itemArr[i].indexOf(me.resultLabel) != -1) {
      //         //存在这个Label
      //         labelObj = {
      //           labelId: item.id,
      //           children: []
      //         };
      //         resultNodes.push(labelObj.labelId);
      //         me.highlightNodeIDs.push(item);
      //       }
      //     }
      //   }
      //   // 如果该数组有子集，递归子集children
      //   if (item.children) {
      //     if (labelObj.children) {
      //       me.filterHighlightIds(item.children, labelObj.children);
      //     } else {
      //       me.filterHighlightIds(item.children, resultNodes);
      //     }
      //   }
      // });
    },
    // 左侧图谱叠加Mapping点击事件
    highLightMapping(item, index) {
      const me = this;
      let d3Data = me.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      // 先清除选中
      if (nodes.length > 0) {
        me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
      }
      if (item.selected) {
        // 查询当前图谱的ID
        let selectNodes = nodes.filter(x => x.data.tpid == item.mapId);
        if (selectNodes.length > 0) {
          let color = "green";
          me.graph.editNodeColor(selectNodes.map(x => x.data.id), color);
          me.graph.centerSelection(selectNodes, []);
        }
      } else {
        this.refresh();
      }
    },
    /**
     * D3保存图片
     * @function saveAsPng
     * @author erbing
     */
    saveAsPng() {
      this.graph.exportPic(this.saveName);
    },
    refresh() {
      let me = this;
      me.statusList.d3Loading = true;
      var data = JSON.parse(JSON.stringify(me.tempData));
      me.initialize(data);
      me.links();
      me.statusList.d3Loading = false;
      me.centerNodeName = me.historyCenterNodeName;
      me.searchHighlight(null, true);
      me.centerNodeName = "";
    },
    /**
     * 隐藏个人信息面板
     * @function hidePersonInfor
     * @author Erbing
     */
    hidePersonInfor(data) {
      this.statusList.PersonInforShow = data;
    },
    /**
     * 获取串并树形图展示的数据
     * @function getTreeData
     * @author erbing
     */
    getTreeData(flag) {
      let me = this;
      // if (me.passiveID) {
      //   this.getTreeGraphDataByPassiveId(flag);
      // } else {
      this.getTreeGraphDataByFlag(flag);
      // }
    },
    getTreeGraphDataByPassiveId(flag) {
      var me = this;
      let apiFn = null,
        params = null;
      apiFn = comApis.GET_ArchivesJoin_And_PassiveId_Data;
      params = {
        passiveID: me.$route.query.passiveID || "",
        tpids: me.$route.query.tpids
      };
      me.statusList.d3Loading = true;
      // this.$axios
      //   .post(url, params)
      apiFn(params)
        .then(response => {
          me.statusList.d3Loading = false;
          if (response.code != 200) return;
          var oid = response.data.tpData.children[0].oid; //增加 根据图谱第一条数据的id, 获取图谱的相关信息
          me.commonIds = response.data.assessData[oid].commonID;

          me.highlight = response.data.highlight; //户主实体边框设置黑色
          var data = me.parseData(response.data.tpData, false);
          me.tpData = {};
          me.tpData = response.data.tpData; //图谱合并连线/高亮

          me.saveName = response.data.tpData.children[0].properties.TPMS;
          me.fetchDetail.entity = response.data.nodeCount;
          me.fetchDetail.executeTime = response.data.executeTime;
          me.assessData = response.data.assessData[oid];

          var mapData = response.data.mapIdNameMapping; //连线高亮
          mapData.forEach(function(item) {
            item.color = "#" + md5(item.mapName + item.mapId).substring(0, 6);
          });
          me.setLinks.mapIdNameMapping = mapData;
          var label = response.data.assessData[oid].labelCount; //风险要素面板人员标签
          me.assessData.person_tag = label;

          me.initialize(data);
          me.links();
          if (me.centerNodeName != "") {
            me.highlightNodeIDs = [];
          }
          if (me.$route.query.sfzhm != "") {
            //默认进去图谱展示，居中实体
            me.searchHighlight();
          }
          me.centerNodeName = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 初始化获取图形展示数据
    getTreeGraphDataByFlag(flag) {
      var me = this;
      let apiFn = null,
        params = null;
      apiFn = comApis.GET_ArchivesJoin_Graph_Data;
      params = {
        flag: me.mapFlag == "3" ? "2" : me.mapFlag,
        mapIds: [me.$route.query.tpids],
        passiveID: me.$route.query.passiveID || ""
      };
      me.statusList.d3Loading = true;
      apiFn(params)
        .then(response => {
          me.statusList.d3Loading = false;
          if (response.code != 200) {
            return;
          }
          let resResult = response.data;
          if (me.mapFlag == "") {
            me.updateGraphType(resResult.mapType);
          } else {
            me.updateGraphType(resResult.mapType, true);
          }
          // 共同联系人的身份证号
          me.commonPersonIdNumbers = resResult.commonPerson;
          let graphData = resResult.graphData;
          // var oid = graphData.children[0].oid; //增加 根据图谱第一条数据的id, 获取图谱的相关信息
          let mapData = [];
          var data = me.parseData(
            graphData,
            false,
            mapData,
            resResult.mapType,
            me.mapFlag != ""
          );
          me.tpData = {};
          me.tpData = graphData; //图谱合并连线/高亮

          me.saveName =
            mapData.length > 0 ? mapData[0].mapName : new Date().getTime();
          me.fetchDetail.executeTime = resResult.executeTime;
          //连线高亮
          mapData.forEach(function(item) {
            item.color = "#000000";
          });
          me.setLinks.mapIdNameMapping = mapData;
          me.initialize(data);
          if (me.centerNodeName != "") {
            me.highlightNodeIDs = [];
          }
          if (
            me.searchHighlightNode != undefined ||
            me.$route.query.sfzhm != ""
          ) {
            //默认进去图谱展示，居中实体
            me.searchHighlight(null, true);
          }
          me.centerNodeName = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
    triggerViewClick(mapType) {
      let option = null;
      switch (mapType) {
        case "level":
          this.mapFlag = "2";
          break;
        case "levelTree":
          this.mapFlag = "3";
          break;
        case "social":
          this.mapFlag = "1";
          break;
        default:
          this.mapFlag = "0";
          break;
      }
      this.getTreeData(true);
    },
    // 更新画布类型
    updateGraphType(mapType, flag) {
      // 0:tree,2:level,1:social,3:levelTree
      let option = null;
      if (flag) {
        switch (this.mapFlag) {
          case "2":
            option = {
              type: "level",
              allowThumbnail: false,
              tree: {
                treeW: 350,
                treeH: 280
              }
            };
            break;
          case "3":
            option = {
              type: "levelTree",
              allowThumbnail: false
            };
            break;
          case "1":
            option = {
              type: "social",
              tree: {
                treeW: 700,
                treeH: 240
              }
            };
            break;
          default:
            break;
        }
      } else {
        switch (mapType) {
          case "4":
          case "7":
            option = {
              type: "level",
              allowThumbnail: false,
              tree: {
                treeW: 350,
                treeH: 280
              }
            };
            break;
          case "3":
          case "10":
          case "5":
            option = {
              type: "social",
              tree: {
                treeW: 700,
                treeH: 240
              }
            };
            break;
          default:
            break;
        }
      }
      this.opt = this.buildOpt(option);
      this.graph.setOptions(this.opt);
    },
    /**
     * 连线高亮
     * @function links
     * @author erbing
     */
    links() {
      // this.setLinks.ids = [];
      let mapIds = this.setLinks.mapIdNameMapping;
      if (
        mapIds.length > 0 &&
        mapIds.length == 1 &&
        (this.opt.type == "level" || this.opt.type == "levelSocial")
      ) {
        this.setLinksHighLight(this.tpData);
      } else {
        this.setLinksHighLight(this.tpData.children);
      }
    },
    /**
     * 连线高亮方法
     * @function setLinksHighLight
     * @author erbing
     */
    setLinksHighLight(data) {
      //图谱的所有数据
      var me = this;
      if (data) {
        me.setLinks.ids = [];
        //第二种方法
        me.setLinks.mapIdNameMapping.forEach(function(item) {
          data.forEach(function(ele) {
            if (ele.tpid != "" && ele.nodeType != "QB_ZP_TP") {
              if (item.mapId == ele.tpid) {
                me.setLinks.ids.push(ele.id);
                me.graph.editLinkColor(me.setLinks.ids, item.color);
              }
            }
            if (ele.children) {
              me.setLinksHighLight(ele.children);
            }
          });
        });
      }
    },
    /**
     * 获取叠加，姻亲关系树形图展示的数据
     * @function getTreeDatas
     * @author erbing
     */
    getTreeDatas(type, clear) {
      var me = this;
      me.setLinks.mapIdNameMapping = []; //清空左上角色值表
      var stackType = null;
      if (type == "stackAll") {
        stackType = me.stackmMarriageParamAll;
      } else {
        stackType = me.stackmMarriageParam;
      }
      var data = {
        param: JSON.stringify(stackType)
      };
      var params = new URLSearchParams();
      let url = me.joinPath + "MapSuperpositionResource/v1/map/combine";
      params.append("param", data.param);
      me.statusList.d3Loading = true;
      // 获取叠加后 图谱概述 (id:点击的图谱id)
      if (stackType && stackType.length > 0)
        this.getMapOverview(stackType[stackType.length - 1].targetMapId);
      // this.getMapOverview(me.stackmMarriageParam[me.stackmMarriageParam.length-1].targetMapId);
      // 获取叠加后 图谱
      this.$axios
        .post(url, params)
        .then(response => {
          if (response.code == 200) {
            if (type == "stack" || type == "stackAll" || "") {
              //判断叠加姻亲，还是其他类型
              var data = me.parseData(response.data.tpData, false);
            } else {
              me.comparedId = response.data.tpData.id;
              var data = me.parseData(response.data.tpData, true);
            }

            me.graph.disabledOverlap(true); //图谱合并连线
            me.mergeData = data; //图谱合并连线
            me.tpData = {};
            me.tpData = response.data.tpData; //图谱合并连线/高亮
            me.assessData = response.data.tpAssessDto;
            var mapData = response.data.mapIdNameMapping; //连线高亮
            mapData.forEach(function(item) {
              item.color = "#" + md5(item.mapName + item.mapId).substring(0, 6);
            });
            me.setLinks.mapIdNameMapping = mapData;

            var label = response.data.tpAssessDto.labelCount; //风险要素面板人员标签
            me.assessData.person_tag = label;
            me.initialize(data); //初始化
            me.links();
            me.statusList.d3Loading = false;

            //图谱姻亲叠加连线
            //me.commonIds = response.data.commonId;
            if (type != "stack" && type != "stackAll") {
              me.comparedId = me.tpData.id;
              me.parseData(me.tpData, true);
              // const data = response.data.links;
              me.mergeLinksData = response.data.links;
              const linksData = response.data.links;

              linksData.forEach(function(item) {
                item.text = item.linkName + " -- " + item.tpName;
                item.color = "#fd00fc";
              });
              me.graph.disabledOverlap(false);
              me.graph.setOverlap(linksData);
              me.graph.load(me.mergeData);
              me.initMenu();
            }
            // me.assessData = {  //叠加没有返回风险要素面板数据，清空面板上次数据
            //   label: "",
            //   personCount: 0,
            //   riskLevel: "",
            //   tpmc:"",
            //   personLabelCount: {}
            // }
            //me.stackmMarriageParam = [];  //清空传参数组

            if (me.centerNodeName != "") {
              //叠加，姻亲叠加图谱展示，居中实体
              me.highlightNodeIDs = [];
              me.searchHighlight();
            }
            me.centerNodeName = "";
            //me.highlightNodeIDs = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    parseData(data, flag, mapData, mapType, isMapFlag) {
      let writeLevelList = ["4", "7"];
      let writeSocialList = ["3", "10", "5"];
      let tmpMapType = mapType;
      if (isMapFlag) {
        if (this.mapFlag == "2" || this.mapFlag == "3") {
          tmpMapType = "4";
        } else if (this.mapFlag == "1") {
          tmpMapType = "3";
        }
      }
      if (writeLevelList.indexOf(tmpMapType) != -1) {
        if (data.length > 0) {
          let tmpData = data[0].filter(x => x.id != "0");
          if (isMapFlag && this.mapFlag == "3") {
            tmpData = data[0];
          }
          let mapNodeTypeData = data[0].find(x => x.id == "0");
          if (mapNodeTypeData && mapData) {
            let nodeData = mapNodeTypeData.data.nodes[0];
            mapData.push({
              mapCode: nodeData.properties.mapCode,
              mapId: nodeData.properties.mapId,
              mapName: nodeData.properties.mapName,
              mapOraId: nodeData.properties.mapId,
              mapType: nodeData.properties.mapType
            });
          }
          return this.parseLevelData(tmpData, flag, mapData);
        } else {
          return [];
        }
      } else if (writeSocialList.indexOf(tmpMapType) != -1) {
        let tmpData = this.parseSocialData(data);
        return this.parseTreeData(tmpData, flag, mapData);
      } else {
        return this.parseTreeData(data, flag, mapData);
      }
    },
    // 格式化层次图 数据
    parseLevelData(data, flag, mapData) {
      let me = this;
      data.forEach(item => {
        var nodes = item.data.nodes;
        nodes.forEach(x => {
          if (x.nodeType == "QB_ZP_TP") {
            x.isShow = flag;
          }
          if (x.nodeType == "QB_ZP_RY") {
            x.image = me.getImagePath(x.properties.picUrl);
            let isCommon =
              me.commonPersonIdNumbers.indexOf(x.properties.SFZHM) != -1
                ? true
                : false;
            if (me.commonPersonIdNumbers.length > 0 && isCommon) {
              x.color = "red";
              x.borderColor = "red";
            }
          }
        });
      });
      return data;
    },
    parseSocialData(data) {
      if (data.children) {
        data.children.forEach(item => {
          if (item.children && item.children.length > 0) {
            this.parseSocialData(item);
          }
          if (item.schildren && item.schildren.length > 0) {
            this.parseSocialData(item);
          }
        });
      }
      return data;
    },
    parseTreeData(data, flag, mapData) {
      var me = this;
      data = changeImage(data);
      function changeImage(data) {
        if (data.nodeType == "QB_ZP_RY") {
          data.image = me.getImagePath(data.properties.picUrl);
          data.properties.GXMC = data.gxmc || "空";
          let isCommon =
            me.commonPersonIdNumbers.indexOf(data.properties.SFZHM) != -1
              ? true
              : false;
          if (me.commonPersonIdNumbers.length > 0 && isCommon) {
            data.color = "red";
            data.borderColor = "red";
          }
        } else if (data.nodeType == "QB_ZP_TP") {
          data.isShow = flag;
          if (mapData) {
            mapData.push({
              mapCode: data.properties.mapCode,
              mapId: data.properties.mapId,
              mapName: data.properties.mapName,
              mapOraId: data.properties.mapId,
              mapType: data.properties.mapType
            });
          }
          if (flag == true) {
            data.comparedId = me.comparedId; //姻亲叠的时候，需要隐藏的线的起始点id
          }
        }
        if (me.commonIds.length && me.commonIds.indexOf(data.oid) != -1) {
          data.color = "red";
          data.borderColor = "red";
        }
        if (Object.keys(me.highlight).length !== 0) {
          for (var i in me.highlight) {
            for (var j in me.$config.project.highlightColor) {
              if (
                i == j &&
                me.highlight[i].length &&
                me.highlight[i].indexOf(data.oid) != -1
              ) {
                data.color = me.$config.project.highlightColor[j];
                // data.borderColor = me.$config.project.highlightColor[j];
              }
            }
          }
        }
        if (me.rid.length && me.rid.indexOf(data.oid) != -1) {
          data.borderColor = "red";
          data.color = "red";
        }
        for (var i = 0; i < data.children.length; i++) {
          changeImage(data.children[i]);
        }
        return data;
      }
      return data;
    },
    // 下载按钮click事件
    downloadBtnClick() {
      this.loadingBtn = true;
      tool.getExcelByMapId(this.tpids, '图谱数据')
        .then(res => {
          this.loadingBtn = false;
        })
        .catch(error => {
          this.loadingBtn = false;
        });
    }
  },
  beforeDestory() {
    sessionStorage.removeItem(this.$route.query.query);
  }
};
</script>

<style lang="less" scoped>
@widthH: 100%;
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
.result {
  width: @widthH;
  height: @widthH;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  color: #68a4f6;
  overflow-x: hidden;
  overflow-y: hidden;
  .result-cont {
    .post(a);
    left: 0;
    top: 68px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    .d3Graph {
      .post(a);
      top: 2px;
      left: 0;
      right: 0;
      bottom: 6px;
      background: url(../../static/images/net.png) repeat #ffffff;
      border: solid 2px #91b5ff;
      border-radius: 5px 5px 0 0;
      -moz-box-shadow: 0px 0px 9px #666 inset;
      -webkit-box-shadow: 0px 0px 9px #666 inset;
      box-shadow: 0px 0px 9px #666 inset;
      .title {
        //width:100%;
        position: absolute;
        top: -3px;
        left: -2px;
        right: -2px;
        border-radius: 5px 5px 0 0;
        height: 44px;
        line-height: 44px;
        background-color: #ffffff;
        overflow: hidden;
        border-bottom: 1px solid #f0f0f0;
        .search-result {
          font-size: 16px;
          color: #2698ed;
          margin-left: 16px;
          float: left;
        }
        .count-result-panel {
          float: right;
          margin-right: 20px;
          color: #3659d9;
          font-weight: bold;
          cursor: pointer;
          i {
            font-size: 20px;
            color: #666666;
          }
        }
        .count-result-panel-relevance {
          float: right;
          margin-right: 20px;
          color: #333;
          font-weight: bold;
          cursor: pointer;
          span {
            border: 1px solid #cccccc;
            display: inline-block;
            height: 29px;
            line-height: 27px;
            font-style: normal;
            padding: 0 9px;
            vertical-align: middle;
          }
          em {
            font-style: normal;
            margin-right: 6px;
            font-weight: normal;
          }
          i {
            font-size: 20px;
            color: #0567c6;
            vertical-align: middle;
          }
        }

        // .toggle-btn{
        //  float:right;
        //  height:44px;
        //  margin:0 14px 0 0;
        //  span{
        //    width:52px;
        //    height:44px;
        //    line-height:44px;
        //    padding-left:24px;
        //    text-align: center;
        //    display:inline-block;
        //    cursor: pointer;
        //    float: left;
        //    i{
        //      color:#8ca1bb;
        //      font-size:30px;
        //    }

        //  }
        //  .viewCur{
        //    i{
        //      color:#009aed;
        //    }
        //  }
        // }
      }
      .map-change {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        .text {
          margin-left: 4px;
          font-size: 16px;
        }
        .view-btn {
          line-height: 25px;
          background-color: #fff;
          padding: 0 8px;
          border-radius: 4px;
          margin-left: 6px;
          font-size: 12px;
          display: inline-block;
          height: 25px;
          cursor: pointer;
          border: 1px solid #57a3f3;
          &.active {
            background-color: #57a3f3;
            color: #fff;
          }
        }
      }
      .graphical {
        .post(a);
        // top: 44px;
        top: 41px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
        .func-btn-group {
          .post(a);
          top: 20px;
          left: 0;
          height: 30px;
          z-index: 999;
          .group-left {
            float: left;
            // margin-top:13px;
            height: 30px;
            ul {
              overflow: hidden;
              li {
                float: left;
                color: #899aae;
                text-align: center;
                line-height: 30px;
                margin-left: 21px;
                cursor: pointer;
                .iconfont {
                  font-size: 20px;
                }
              }
              li:last-child {
                width: 1px;
                height: 23px;
                background: #b4c4d9;
                position: relative;
                top: 5px;
                display: none;
              }
            }
          }
          .group-right {
            float: left;
            // margin-top:13px;
            margin-left: 21px;
            height: 30px;
            border-radius: 2px;
            ul {
              overflow: hidden;
              li {
                float: left;
                // width:38px;
                height: 30px;
                color: #899aae;
                background: #edf2f8;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
                border: 1px solid #c8d3e1;
                .iconfont {
                  font-size: 20px;
                }
              }
              li:nth-child(1) {
                width: 39px;
                border-right: none;
                border-radius: 2px 0 0 2px;
                .iconfont {
                  font-size: 24px;
                }
              }
              li:nth-child(2) {
                width: 40px;
                .iconfont {
                  font-size: 25px;
                }
              }
              li:nth-child(3) {
                width: 39px;
                border-left: none;
                border-radius: 0 2px 2px 0;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .result {
    .result-cont {
      .d3Graph {
        .title {
          .search-result {
            font-size: 14px;
          }
          .toggle-btn {
            height: 30px;
            span {
              width: 44px;
              height: 30px;
              line-height: 30px;
              i {
                font-size: 20px;
              }
              .viewCur {
                color: #009aed;
              }
            }
          }
        }
        .graphical {
          // top:30px;
          top: 40px;
        }
        .card {
          top: 27px;
        }
      }
    }
  }
}
/deep/ .map-overview {
  z-index: 1000 !important;
}
</style>

<style lang="less">
@import "../assets/loading.css";
circle,
image,
g[type="node"] > text,
text.tagnums,
g.more,
g.more text {
  cursor: pointer;
}
.links line {
  stroke-opacity: 0.6;
}
#rMenu {
  position: absolute;
  width: 160px;
  background: #e8eaec;
  box-shadow: #ccc 0px 0px 8px;
}
#rMenu ul {
  padding: 0;
  margin: 0;
}
#rMenu ul li {
  color: #333;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
  width: 100%;
  padding-left: 5%;
  list-style-type: none;
  cursor: pointer;
}
#rMenu ul li:hover {
  background: #e5e5e5;
}
.svgNT {
  position: absolute;
  bottom: 30px;
  left: 25px;
  border: 2px solid #ccc;
  display: block;
}
.arc {
  cursor: pointer;
}

div .diyFun {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  font-size: 12px;
}
g.more {
  display: block;
}
g.nomore {
  display: none;
}

#archivesJoin {
  #hydra {
    position: relative;
    .tlist {
      position: absolute;
      left: 10px;
      top: 88px;
      z-index: 999;
      background: #fff;
      -webkit-box-shadow: #ccc 0px 0px 8px;
      box-shadow: #ccc 0px 0px 8px;
      padding: 0 10px;
      max-height: 350px;
      overflow-y: auto;
      max-width: 520px;
      ul {
        padding: 5px !important;
        li {
          // .text {
          //   padding-left: 60px;
          // }
          color: #333;
          font-size: 14px;
          height: 34px;
          line-height: 34px;
          width: calc(~"100% + 10px");
          padding-left: 5%;
          list-style-type: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          padding: 0 5px;

          span {
            float: left;
            display: block;
            width: 25px;
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            text-align: center;
            border-radius: 3px;
            color: #fff;
            background: #4298c7;
            margin: 5px 5px 0 0;
            &:hover {
              opacity: 0.9;
            }
          }
          span.allStack {
            // float:left;
            // width:60px;
            // position: absolute;
            // left: 20px;
            // top: 3px;
            float: right;
            width: 60px;
            display: block;
          }
          span.filter-condition {
            width: auto;
            padding: 0 5px;
            display: block;
            margin: 5px 0 0 0;
            float: right;
          }
        }
        li:not(.li_allStack):hover {
          background: #e5e5e5;
        }
        // li:nth-child(1){
        //   margin-top:33px;
        // }
        // li.li_allStack{
        //   position: absolute;
        //   left:15px;
        //   top: 3px;
        //   width: calc(~'90% - 10px');
        // }
      }
    }
    .panel {
      position: absolute;
      left: 10px;
      top: 88px;
      z-index: 999;
      font-size: 16px;
      background: #fff;
      -webkit-box-shadow: #ccc 0px 0px 8px;
      box-shadow: #ccc 0px 0px 8px;
      padding: 10px;
      max-width: 600px;
      max-height: 450px;
      overflow-y: auto;
      overflow-x: hidden;
      color: #333;
    }
    .titleBox {
      position: absolute;
      z-index: 999;
      background: #fff;
      box-shadow: #ccc 0px 0px 8px;
      padding: 5px;
      font-size: 16px;
    }
  }
}
</style>
