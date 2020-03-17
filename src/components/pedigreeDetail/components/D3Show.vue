<!--
 * @Author: your name
 * @Date: 2019-10-15 18:59:54
 * @LastEditTime: 2019-10-28 18:12:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\project\map-web\src\components\pedigreeDetail\components\D3Show.vue
 -->
<template>
  <div class="graphical" ref="graphical">
    <div class="content-title top-title">
      <!-- 用时 -->
      <span class="time">{{'用时 ' + executeTime + ' 秒'}}</span>
      <!-- 搜索 -->
      <div class="search-box">
        <Input
          v-model="searchHighlightText"
          placeholder="输入搜索条件"
          style="width: 300px;margin-left:50px;"
          @keyup.enter.native="searchHighlight"
        />
        <Button type="primary" icon="ios-search" @click="searchHighlight">搜索</Button>
      </div>
      <!-- 小工具 -->
      <ul class="tool">
        <li>
          <i class="iconfont icon-pingmukuaizhao" @click="saveAsPng" title="快照"></i>
        </li>
        <li>
          <i class="iconfont icon-shuaxin" @click="refresh" title="刷新"></i>
        </li>
      </ul>
      <!-- 切换按钮 -->
      <span title="展开\关闭" class="trigger">
        <i
          @click="statusList.isShowMapOverview=!statusList.isShowMapOverview"
          class="iconfont icon-zairumoban"
        ></i>
      </span>
      <!-- 图谱名 -->
      <span class="pedigree-name">{{pedigreeName}}</span>
      <!-- 联姻按钮列表 -->
      <div class="location-box" v-if="marriageBtnList.length">
        <!-- <div class="location-box"  v-if="false"> -->
        <div ref="marriageBox" :class="{'marriage-box': true, 'showMoreBtn': isShowMore}">
          <span>跨地区联姻：</span>
          <ul class="marriage-btns">
            <li
              :class="{'active-marriage': item.typeName == activeTypeName}"
              v-show="index < showLength"
              v-for="(item, index) in marriageBtnList"
              :key="index"
              @click="marriageBtnClick(item)"
            >{{item.typeName}}({{item.count}})</li>
            <!-- <li class="btn-item">乌鲁fsdfsasdgasd木齐市(2)</li>
            <li class="btn-item">乌鲁木齐市(3)</li>
            <li class="btn-item">乌鲁木齐市(4)</li>
            <li class="btn-item">乌鲁木齐市(5)</li>-->
          </ul>
          <Icon
            class="more-btn"
            :type="isShowMore ? 'ios-arrow-up':'ios-arrow-down'"
            v-if="marriageBtnList.length > 3"
            @click="ShowMoreBtnClick"
          />
        </div>
      </div>
    </div>

    <!-- d3图形展示 -->
    <div id="hydra"></div>
    <!-- 图谱概述组件 -->
    <MapOverview
      v-show="statusList.isShowMapOverview"
      :assessData="assessData"
      ref="risk"
      @on-hide="statusList.isShowMapOverview = false"
      @on-change="handleSelectClick"
    ></MapOverview>
    <!-- 加载loading -->
    <!-- <d-load v-model="d3Loading"></d-load> -->
    <loading color="white" v-model="d3Loading"></loading>
    <!-- <history-map
      v-model="showHistoryDialog"
      :items="statusList"
      :data="historyData"
      @on-back="returnPrevTp"
      @on-icon-click="againGetTree">
    </history-map>-->
    <!-- 个人信息、档案 -->
    <transition name="personInforArea">
      <!-- <PersonInfor
        ref="PersonInfor"
        :node="curEneityData"
        :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData"
        v-show="showPersonInfor"
        @listenToChild="hidePersonInfor"
        @switchTrajectory="switchTrajectory"
        @changeTime="changeTime"
        @returnHistory="returnHistory"
        class="personInfo"
      ></PersonInfor>-->
      <ArchivalInfor v-show="showPersonInfor" @listenToChild="hidePersonInfor" :tpInfo="tpInfo"></ArchivalInfor>
    </transition>
    <!-- 高级查询模态窗 -->
    <D3FilterCondition
      v-model="filterConditionVisible"
      :params="filterConditionParams"
      metaTitle="谱系档案"
    ></D3FilterCondition>
  </div>
</template>
<script>
import moment from "moment";
import * as d3 from "d3v4";
import DLoad from "@/components/assembly/D3Load";
import PersonInfor from "@/components/assembly/PersonInfor";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/mapJoin/index.js";
// import archivesOverview from './archivesOverview'
import MapOverview from "@/components/assembly/MapOverview";
import Loading from "@/components/assembly/Loading";
import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
export default {
  name: "D3Show",
  components: {
    MapOverview,
    // DLoad,
    Loading,
    // PersonInfor,
    ArchivalInfor,
    D3FilterCondition,
    historyMap: () => import("../components/historyMap")
  },
  props: {
    items: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      marriageBtnList: [], // 联姻按钮列表
      isShowMore: false, // 展示更多按钮
      activeTypeName: "", // 选中的联姻按钮
      tpInfo: {},
      d3Data: {},
      pedigreeName: this.$route.query.title, // 档案名
      searchHighlightText: "", // 页内搜索高亮
      executeTime: 0,
      statusList: {
        showMapOverview: true,
        isShowMapOverview: true
      },
      assessData: {
        // archiveName: "xx图谱名称",
        // personCount: 10,
        // riskLevel: "3",
        // personTypeCounts: [
        //   {
        //     typeName: "死亡",
        //     count: 1,
        //   },
        //   {
        //     typeName: "社会面",
        //     count: 2,
        //   },
        // ],
        // mapTypeCounts: [
        //   {
        //     typeName: "社",
        //     count: 1,
        //   },
        //   {
        //     typeName: "宗",
        //     count: 2,
        //   },
        //   {
        //     typeName: "暴",
        //     count: 1,
        //   },
        //   {
        //     typeName: "户",
        //     count: 4,
        //   },
        //   {
        //     typeName: "案",
        //     count: 3,
        //   },
        // ],
        // sexTypeCount: [
        //   {
        //     typeName: 1,
        //     count: 1,
        //   },
        //   {
        //     typeName: 0,
        //     count: 2,
        //   },
        // ],
        // labelCount: [
        //   {
        //     tagId:'T0075',
        //     score:5,
        //     tagName:'大户家族1',
        //     tagColor:'F898DA',
        //     fontColor:'FFFFFF',
        //     clientId:'CLIENT_00003',
        //     count:10
        //   },
        //   {
        //     tagId:'T0075',
        //     score:5,
        //     tagName:'大户家族2',
        //     tagColor:'F898DA',
        //     fontColor:'FFFFFF',
        //     clientId:'CLIENT_00003',
        //     count:10
        //   },
        // ],
        // // label: "",
        // // personCount: 0,
        // // riskLevel: "",
        // // tpmc:"",
        // // person_tag: [],
        // // personLabelCount: {}
      },
      resultLabel: "",
      resultNodes: [],
      resultId: [],
      highlightNodeIDs: [],
      tpData: {},

      hydraType: this.$config.project.hydraType, //D3卡片展示
      hydra: null, //D3卡片展示
      opt: null,
      graph: null,
      nodeID: "",
      nodeType: "",
      curEneityData: {},
      curEneityAllData: {
        fxpf: "",
        rybq: [],
        imgSrc: "",
        labelBgColor: [],
        eneityBasicInfo: "",
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
      treeData: [],
      tempTreeData: [],
      treeArrData: [],
      entityPropList: [],
      linksPropList: [],
      tplxList: [],
      iconsList: [],
      selectedTpids: null,
      tpidJoin: null,
      passiveID: "",
      // showHistoryDialog:false,
      // historyData:[],
      addHistory: {},
      d3Loading: false,
      showPersonInfor: false,
      saveName: this.$route.query.title,
      filterConditionVisible: false,
      filterConditionParams: null
    };
  },
  computed: {
    // 显示几个联姻按钮
    showLength() {
      return this.isShowMore ? 9999 : 3;
    }
  },
  created() {
    this.hydra = require(`../../../../static/vendors/${this.hydraType}.js`); //D3卡片展示
    this.init();
  },
  mounted() {
    this.initRender();
  },
  methods: {
    onHideClick() {
      statusList.isShowMapOverview = false;
    },
    // 显示更多
    ShowMoreBtnClick() {
      // 设置宽不变
      this.$refs.marriageBox.style.width =
        this.$refs.marriageBox.clientWidth + 1 + "px";
      this.isShowMore = !this.isShowMore;
    },
    init() {
      this._getEntityLinksConfig();
      this.getOverview(this.$route.query.archiveId);
      this.getMarriageInfo(this.$route.query.archiveId);
    },
    // 初始化渲染d3图形
    initRender() {
      const me = this;
      this.opt = this.buildOpt();
      this.graph = this.hydra.default.graph(); //D3卡片展示
      this.graph.setOptions(this.opt);
      this.getTreeData(true);
    },
    buildOpt() {
      var me = this;
      var width = document.getElementById("hydra").offsetWidth;
      return {
        selector: "#hydra",
        width: width,
        height: 580,
        offsetTop: 115,
        selectorScroll: "#outer",
        isHideSuperpositionBtn: true,
        type: "tree",
        showToptag: true,
        allowDrag: true,
        allowNodeDbclick: false,
        expandlist: ["del", "lock", "expand"],
        highlightText: "",
        showToptagMenu: true,
        properties: this.$config.properties,
        showFilterCondition: true,
        // 高级
        filterConditionClickEvt: function(data) {
          me.filterConditionVisible = true;
          me.filterConditionParams = data;
        },
        bgclick() {
          return false;
        },
        topTagClickEvt: function(data) {
          if (!data) {
            return;
          }
          if (data.typeId == "8") {
            const { href } = me.$router.resolve({
              path: "/exitAndEntry",
              query: {
                areaCode: data.villageCode,
                collectId: data.collectId,
                sfzhm: data.sfzhm,
                state: 1
              }
            });
            window.open(href, "_blank");
          } else if (data.typeId == "9") {
            const { href } = me.$router.resolve({
              path: "/underAttack",
              query: {
                areaCode: data.villageCode,
                collectId: data.collectId,
                sfzhm: data.sfzhm,
                state: 1
              }
            });
            window.open(href, "_blank");
          } else {
            var date = new Date();
            var nowDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
            if (me.showPersonInfor) {
              me.showPersonInfor = false;
            }
            me.addHistory = {
              id: data.tpid,
              type: data.type,
              color: data.color,
              date: nowDate,
              name: data.name,
              tplx: data.tpms
            };
            me.selectedTpids = data.tpid;
            // me.historyData.unshift(me.addHistory);
            // 点击菜单的图谱列表，跳转
            console.log(data);

            let routeData = me.$router.resolve({
              path: "/archivesjoin",
              query: {
                tpids: data.tpid,
                sfzhm: data.sfzhm,
                // rid:
                mc: "谱系档案"
              }
            });
            window.open(routeData.href, "_blank");
          }
        },
        // 案件线索的点击事件
        caseClueEvt: function(data) {
          if (data.name == CASE_CODE || data.name == CLUB_CODE) {
            const { href } = me.$router.resolve({
              path: "/caseClubList",
              query: {
                sfzhm: data.sfzhm
              }
            });
            window.open(href, "_blank");
          }
        }
      };
    },
    /**
     * 获取图谱概述 数据
     * @function getOverview
     */
    getOverview(id) {
      comApis
        .getOverview(id)
        .then(response => {
          if (response.code == 200) {
            // this.statusList.archivesLoadingShow = false;
            // console.log(response);
            // response.data.sexTypeCount.sort((a,b)=>a.typeName-b.typeName);// 男女排序
            this.assessData = response.data;
          } else {
            this.$Message.warning(response.message);
            // this.statusList.archivesLoadingShow = false;
          }
        })
        .catch(error => {
          // this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
    },
    // 获取跨地区联姻 按钮列表
    getMarriageInfo(id) {
      comApis
        .getMarriageInfo(id)
        .then(res => {
          if (res.code == 200) {
            this.marriageBtnList = res.data;
            // this.marriageBtnList = [
            //   {type: null, typeName: "克拉玛依市", count: 1, personIdNumber: "650204197801010128"},
            //   {type: null, typeName: "克拉222222玛依市", count: 1, personIdNumber: "460967198704170977"},
            //   {type: null, typeName: "克拉玛33依市", count: 1, personIdNumber: "652900197801010128"},
            //   {type: null, typeName: "克拉玛444依市", count: 1, personIdNumber: "652923197801010127"},
            //   {type: null, typeName: "克拉555555555玛依市", count: 1, personIdNumber: "652223198507259975"},
            // ];
          } else {
            this.$Message.warning(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 联姻按钮 点击高亮
    marriageBtnClick(item) {
      this.$refs.risk.activeName = "";
      let ids = [];
      if (this.activeTypeName == item.typeName) {
        this.handleSelectClick("SFZHM", ids); // 高亮卡片
        this.activeTypeName = -1;
      } else {
        ids = item.personIdNumber.split(",");
        this.handleSelectClick("SFZHM", ids); // 高亮卡片
        this.activeTypeName = item.typeName; // 高亮按钮
      }
    },
    // 点击标签 根据item.typeName 高亮相应实体
    handleSelectClick(type, item, index) {
      this.activeTypeName = ""; // 联姻按钮清除选中

      const me = this;
      let d3Data = me.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
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
        case "SFZHM": //身份证 (item为一个数组)
          let ids = item;
          arr = nodes.filter(x => {
            return (
              x.data &&
              ids.some(id => x.data.properties.SFZHM.indexOf(id) != -1)
            );
          });
          break;
      }
      // console.log(item.type, type, nodes, arr);

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
    // 搜索页面人员 高亮
    searchHighlight() {
      // console.log(this.searchHighlightText);
      const me = this;
      let d3Data = me.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      // 先清除选中
      if (nodes.length > 0) {
        me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
      }
      // 获取选中的值进行查询
      let arr = [];
      // 过滤出 包含搜索结果的人员node
      arr = nodes.filter(x => {
        for (var k in x.data.properties) {
          if (x.data.properties[k].indexOf(this.searchHighlightText) != -1) {
            return true;
          }
        }
      });
      // console.log(this.searchHighlightText,nodes,arr);

      if (arr.length > 0) {
        let oids = arr.map(x => x.data.id);
        me.graph.editNodeColor(oids, "green");
        me.graph.centerSelection(arr, []);
      }
    },
    /**
     * 获取树形图展示的数据
     * @function getTreeData
     * @author erbing
     */
    getTreeData(flag) {
      // debugger;
      var me = this;
      me.treeData = [];
      me.treeArrData = [];
      me.graph.setHighlightText(me.keyword);
      me.keyword = "";
      if (flag) {
        sessionStorage.firstTpid = me.selectedTpids || me.tpidJoin;
        // if(!this.showHistoryDialog){
        // me.historyData = []; //每次串并都会清空 历史记录
        // }
        sessionStorage.passiveID = me.passiveID = "";
      }
      let params = {
        passiveID: sessionStorage.passiveID,
        tpids: me.selectedTpids || me.tpidJoin
      };
      me.d3Loading = true;
      let id = this.$route.query.archiveId;
      comApis.getFamilyarchive(id).then(response => {
        let resData = response.data.tpData;
        me.executeTime = response.data.executeTime;
        if (response.code == 200) {
          me.treeData = resData;
          sessionStorage.passiveID = me.passiveID =
            me.selectedTpids || me.tpidJoin;
          // test
          // var oid = response.data.tpData.children[0].oid;//增加 根据图谱第一条数据的id, 获取图谱的相关信息
          // me.assessData = response.data.assessData[oid];
          console.log(response);

          var data = me.parseData(resData, false);

          me.tpData = {};
          me.tpData = response.data.tpData; //图谱合并连线/高亮

          me.initialize(data);
        }
        me.d3Loading = false;
      });
    },
    initialize(msg) {
      document.getElementById("hydra").innerHTML = "";
      var me = this;
      this.graph.setIcons(me.iconsList);
      this.graph.init();
      me.tempTreeData = msg;
      this.graph.load(msg);
      this.initMenu();
    },
    /**
     * 初始化D3右键按钮
     * @function searchByKeyword
     * @author erbing
     */
    initMenu() {
      var me = this;
      var data = [
        {
          text: "查看档案",
          url: "",
          method: function() {
            // if(me.showHistoryDialog){
            //   me.showHistoryDialog = false;
            // }
            me.showPersonInfor = true;
            me.tpInfo = me.d3Data;
            // me.getEssentialInfo();
            // me.getCorrelationInfo();
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
          // if (['rect', 'text'].indexOf(d3.event.srcElement.tagName) != -1 || !e.data.exist) return false;
          me.createRMenu(
            data,
            { x: d3.event.pageX + 50, y: d3.event.pageY - 120 },
            e
          );
          me.curEneityData = e.data;
          me.nodeID = e.data.oid;
          me.nodeType = e.data.nodeType;
          me.d3Data = e.data;
        });
    },
    /**
     * 创建D3右键按钮
     * @function createRMenu
     * @author erbing
     */
    createRMenu(data, pos, obj) {
      var lis = [],
        box,
        ul;
      if (document.querySelector("#rMenu")) {
        box = document.querySelector("#rMenu");
        box.style.display = "block";
        ul = box.querySelector("ul");
        ul.innerHTML = "";
      } else {
        box = document.createElement("div");
        box.id = "rMenu";
        ul = document.createElement("ul");
        box.appendChild(ul);
        document.querySelector("#hydra").appendChild(box);
      }
      box.style.left = pos.x - 50 + "px";
      let scrollTop = this.opt.selectorScroll
        ? document.querySelector(this.opt.selectorScroll).scrollTop
        : 0;
      box.style.top = pos.y - 10 + scrollTop + "px";
      for (var i = 0; i < data.length; i++) {
        lis[i] = document.createElement("li");
        lis[i].innerText = data[i].text;
        lis[i].setAttribute("url", data[i].url);
        lis[i].onclick = data[i].method;
        ul.appendChild(lis[i]);
      }
    },
    parseData(data, flag) {
      var me = this;
      data = changeImage(data);
      function changeImage(data) {
        if (data.nodeType == "QB_ZP_RY") {
          data.image = me.getImagePath(data.properties.picUrl);
          data.properties.GXMC = data.gxmc || "空";
          data.state = data.properties.STATE; //D3卡片展示
          if (me.hydraType == "hydra") {
            data.showProperties = ["XM", "GXMC", "SFZHM"];
          } else {
            data.showProperties = ["XM", "HJD", "GXMC", "SFZHM", "RYBQ"]; //D3卡片展示
          }
          for (var i = 0; i < data.children.length; i++) {
            changeImage(data.children[i]);
          }
          return data;
        } else if (data.nodeType == "QB_ZP_TP") {
          data.showProperties = ["TPMS"];
          data.isShow = flag;
          me.tplxList.forEach(function(item) {
            if (data.properties.TPLX == item.value) {
              data.properties.TPLX = item.name;
            }
          });
          for (var i in me.tplxColorList) {
            data.color = me.tplxColorList[data.properties.TPLX];
          }
        }
        for (var i = 0; i < data.children.length; i++) {
          changeImage(data.children[i]);
        }
        return data;
      }
      return data;
    },
    /**
     * D3保存图片
     * @function closeFeedbackModal
     * @author erbing
     */
    saveAsPng() {
      console.log(this.saveName);

      this.graph.exportPic(this.saveName);
    },
    refresh() {
      let me = this;
      me.d3Loading = true;
      var data = me.tempTreeData;
      me.initialize(data);
      me.d3Loading = false;
    },
    handleClear() {
      document.getElementById("hydra").innerHTML = ""; //清空D3图形化
      // this.historyData = [];
      me.assessData = {
        label: "",
        personCount: 0,
        riskLevel: "",
        tpmc: ""
      };
    },
    /**
     * 隐藏个人信息面板
     * @function switchTrajectory
     * @author julie
     */
    hidePersonInfor(data) {
      this.showPersonInfor = data;
    },
    /**
     * 显示历史记录面板
     * @function returnHistory
     * @author julie
     */
    returnHistory() {
      this.showPersonInfor = false;
      // this.showHistoryDialog = true;
    },
    /**
     * 轨迹信息切换
     * @function switchTrajectory
     * @author Erbing
     */
    switchTrajectory(name) {
      if (name == "all") {
        this.curEneityAllData.eneityTrajectoryInfo.datas = this.curEneityAllData.eneityTrajectoryInfo.data;
        return false;
      }
      this.curEneityAllData.eneityTrajectoryInfo.datas = [];
      this.curEneityAllData.eneityTrajectoryInfo.data.forEach(x => {
        if (x.nodeType == name)
          this.curEneityAllData.eneityTrajectoryInfo.datas.push(x);
      });
    },
    /**
     * 根据时间不同加载数据 （后期备用）
     * @function changeTime
     * @author Erbing
     */
    changeTime(date, type) {
      if (type == "start") {
        this.curEneityAllData.eneityTrajectoryInfo.startTime = date;
      } else {
        this.curEneityAllData.eneityTrajectoryInfo.endTime = date;
      }
    },
    /**
     * 返回到本阶段首次串并的图谱
     * @function returnPrevTp
     * @author julie
     */
    returnPrevTp() {
      this.selectedTpids = sessionStorage.firstTpid.split(","); //返回到首次进入的图谱，设置tid 等于首次保存的图谱id
      sessionStorage.passiveID = "";
      this.getTreeData(true);
    },
    /**
     * 历史记录中跳转到对应的图谱
     * @function againGetTree
     * @author julie
     */
    againGetTree(id) {
      this.selectedTpids = [id];
      this.getTreeData();
    },
    /**
     * 获取所有相关配置表
     * @function getEntityLinksConfig
     * @author erbing
     */
    _getEntityLinksConfig() {
      let me = this;
      let params = {
        language: ""
      };
      comApis.getInitializeConfig(params).then(res => {
        if (res.code != 200) {
          return false;
        }
        let data = res.data;
        me.entityPropList = data.nodeConfig;
        me.linksPropList = data.linkConfig;
        me.tplxList = data.tplxMapping;
        me.iconsList = data.nodeIconConfig;
        me.labelColors = data.labelColors;
        me.assessData.personTag = res.data.personTag; //风险要素人员面板人员标签
        me.iconsList.map(item => {
          for (let i in item) {
            if (i == "path_1") {
              item["path_n"] = item[i];
            }
          }
        });
      });
    },
    /**
     * 获取个人信息（基本信息/查看档案基本信息）
     * @function getEssentialInfo
     * @author Erbing
     */
    getEssentialInfo() {
      let me = this;
      apis
        .getEssentialInfo(me.nodeID, me.curEneityData.nodeType)
        .then(response => {
          if (response.code != 200) {
            return false;
          }
          let allData = response.data;
          allData.property_mapping.forEach(x => {
            Object.keys(allData.property).forEach(prop => {
              if (x.fieleName == prop) {
                x.name = allData.property[prop];
              }
            });
          });
          var data = allData.property.RYBQ;
          if (!data) {
            me.curEneityAllData.rybq = [];
          }
          if (data) {
            var obj = data.split(",");
            me.curEneityAllData.rybq = obj; //人员标签
            me.curEneityAllData.rybq.forEach((item, index) => {
              for (var i in me.labelColors) {
                if (item == i) {
                  me.curEneityAllData.labelBgColor.push(me.labelColors[item]); //标签背景颜色
                }
              }
            });
          }
          //话单信息  资金交易  物流信息 数据 （后期备用）
          me.curEneityAllData.imgSrc =
            this.$config.imgPath +
            allData.property.ID_NUMBER +
            this.$config.imgType;
          me.curEneityAllData.eneityBasicInfo = allData;
          me.nodeDetailsAllData.allData = allData;
        });
    },
    /**
     * 获取关联分析数据/查看档案关联分析
     * @function getCorrelationInfo
     * @author julie
     */
    getCorrelationInfo() {
      let me = this;
      // 获取前 先清空关联分析数据
      me.curEneityAllData.eneityCorrelationInfo.data = [];

      apis.getCorrelationInfo(me.nodeID, me.nodeType).then(response => {
        if (response.code != 200) {
          return false;
        }
        let allData = response.data;
        allData.resultData.forEach(x => {
          let iconTypeObj = this.iconsList.find(y => y.type == x.iconType);
          if (iconTypeObj) {
            x.iconTypes = iconTypeObj.avatar;
            if (x.nodeName == "CZRK") {
              x.node_Link.forEach(node_Link => {
                if (node_Link.node.properties.XB == "女") {
                  x.iconTypes = iconTypeObj.avatar_1;
                }
              });
            }
          }
        });
        me.curEneityAllData.eneityCorrelationInfo.data = allData.resultData;
      });
    }
  },
  watch: {
    items: {
      handler(val) {
        this.statusList = val;
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.graphical {
  height: 580px;
  padding: 0;
  .content-title {
    border-radius: 5px 5px 0 0;
    height: 44px;
    line-height: 44px;
    background-color: #c7d7eb;
    position: relative;
    // overflow: hidden;
    .time {
      font-size: 16px;
      color: #2698ed;
      margin-left: 16px;
      float: left;
    }
    .search-box {
      position: relative;
      top: -3px;
      float: left;
    }
    .tool {
      float: left;
      color: #899aae;
      margin-left: 20px;
      li {
        float: left;
        margin-left: 16px;
        cursor: pointer;
        i {
          font-size: 20px;
        }
      }
    }
    .trigger {
      float: right;
      margin-right: 20px;
      color: #3659d9;
      font-weight: bold;
      cursor: pointer;
      i {
        font-size: 20px;
      }
    }
    .pedigree-name {
      position: absolute;
      top: 40px;
      left: 16px;
      font-size: 14px;
      color: #101010;
      font-weight: 700;
    }
    .location-box {
      position: relative;
      float: left;
      width: 600px;
      .marriage-box {
        float: left;
        margin-left: 32px;
        background-color: #fff;
        padding-left: 100px;
        z-index: 99;
        position: absolute;
        // overflow: hidden;
        height: 42px;
        color: #333;

        // max-width: 450px;
        padding-right: 30px;
        &.showMoreBtn {
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
          height: auto;
        }
        .more-btn {
          position: absolute;
          right: 14px;
          top: 10px;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
        }
        > span {
          position: absolute;
          left: 0;
          margin-left: 20px;
        }
        .marriage-btns {
          // position: absolute;
          // right: 420px;
          // top: 50px;
          // z-index: 9;
          padding-top: 10px;
          // overflow: hidden;
          // max-width: 320px;
          li {
            float: left;
            margin-right: 8px;
            margin-bottom: 10px;
            height: 26px;
            line-height: 22px;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 0 6px;
            border-radius: 2px;
          }
          .active-marriage {
            color: #fff;
            background-color: #0668c8;
          }
        }
      }
    }
  }
  .top-title {
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
  .func-btn-group {
    position: absolute;
    z-index: 999;
    top: 20px;
    height: 30px;
    display: inline-block;
    .group-left {
      float: left;
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
  }
  /deep/ .tlist {
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
        .text {
          padding-left: 0px;
        }
        color: #333;
        font-size: 14px;
        height: 34px;
        line-height: 34px;
        width: calc(~"100% + 10px");
        padding-left: 5%;
        list-style-type: none;
        white-space: nowrap;
        cursor: pointer;
        padding: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        label {
          cursor: pointer;
        }
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
        }
        span.allStack {
          // float:left;
          // width:60px;
          // position: absolute;
          // left: 20px;
          // top: 3px;
          width: 60px;
          display: block;
          float: right;
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
  /deep/.titleBox {
    position: absolute;
    z-index: 999;
    background: #fff;
    box-shadow: #ccc 0px 0px 8px;
    padding: 5px;
    font-size: 16px;
  }
  /deep/.panel {
    position: absolute;
    left: 10px;
    top: 88px;
    z-index: 9999;
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
  /deep/ .inforModal {
    position: fixed;
  }
}
#hydra {
  position: relative;
  .tlist {
    position: fixed;
    left: 10px;
    top: 88px;
    z-index: 999;
    background: #fff;
    -webkit-box-shadow: #ccc 0px 0px 8px;
    box-shadow: #ccc 0px 0px 8px;
    padding: 0 10px;
    max-height: 350px;
    overflow-y: auto;
    ul {
      padding: 5px !important;
      li {
        .text {
          padding-left: 60px;
        }
        color: #333;
        font-size: 14px;
        height: 34px;
        line-height: 34px;
        width: calc(~"100% + 10px");
        padding-left: 5%;
        list-style-type: none;
        white-space: nowrap;
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
        }
        span.allStack {
          // float:left;
          // width:60px;
          // position: absolute;
          // left: 20px;
          // top: 3px;
          width: 60px;
          display: block;
        }
      }
      li:hover {
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
}
/deep/.map-overview {
  top: 46px !important;
  max-height: 86% !important;
}
</style>
<style lang="less">
.graphical {
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
    bottom: 10px;
    left: 0;
    border: 2px solid #ccc;
    display: none;
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
}
</style>


