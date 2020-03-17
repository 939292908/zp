<!--
 * @Author: your name
 * @Date: 2019-10-15 18:59:54
 * @LastEditTime: 2019-10-23 17:11:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\project\map-web\src\components\mapJoinNext\Index.vue
 -->
<template>
  <!-- 图谱串并页面 -->
  <div class="mapjoin-container m-container" @click="handleWrapperClick($event)">
    <!-- 头部 -->
    <app-header :items="statusList" title="图谱串并" :showSearch="false"></app-header>
    <!-- D3控件区域 -->
    <div class="result-cont">
      <div id="d3" ref="d3" class="d3">
        <div class="title">
          <span class="search-result">{{'用时 ' + fetchDetail.executeTime + ' 秒'}}</span>
          <Input
            v-model="searchHighlightNode"
            placeholder="输入搜索条件"
            style="width: 300px;margin-left:50px;"
            @keyup.enter.native="searchHighlight"
          />
          <Button type="primary" icon="ios-search" @click="searchHighlight">搜索</Button>
          <span title="展开\关闭" class="count-result-panel">
            <i @click="showMapOverview = !showMapOverview" class="iconfont icon-zairumoban"></i>
          </span>
        </div>
        <!-- d3图形展示 -->
        <div class="graphical" v-show="statusList.d3Show">
          <!-- 风险要素组件 -->
          <!-- <riskLevel :assessData="assessData"></riskLevel> -->
          <!-- 图谱概述 -->
          <map-overview
            v-model="showMapOverview"
            ref="mapOverview"
            :items="commonNodes"
            @on-click="handleCommonNode"
            @on-close="handleClosePanel"
          ></map-overview>
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
      </div>
      <!-- 加载loading -->
      <loading color="white" v-model="statusList.d3Loading"></loading>
      <!-- <d-load v-model="statusList.d3Loading"></d-load> -->
    </div>
    <!-- 图谱串并按钮 -->
    <div class="dtcb" v-show="statusList.ShowMultiModal" @click="handleShowMulti">
      <span>图谱串并</span>
    </div>
    <!-- 图谱串并选择区域 @on-search-type-change="handleClear"-->
    <filter-map
      ref="filterMap"
      v-model="showFilterDialog"
      :items="statusList"
      :loading="statusList.d3Loading"
      @on-change="handleChangeTreeData"
      @on-remove="handleSelectRemove"
    ></filter-map>
    <history-map
      v-model="showHistoryDialog"
      :items="statusList"
      :data="historyData"
      :loading="statusList.d3Loading"
      @on-back="returnPrevTp"
      @on-icon-click="againGetTree"
    ></history-map>
    <!-- 个人信息、档案 -->
    <transition name="personInforArea">
      <!-- <PersonInfor
        ref="PersonInfor"
        :node="curEneityData"
        :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData"
        v-show="statusList.PersonInforShow"
        @listenToChild="hidePersonInfor"
        @switchTrajectory="switchTrajectory"
        @changeTime="changeTime"
        @returnHistory="returnHistory"
        class="personInfo">
      </PersonInfor>-->
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
      metaTitle="图谱串并"
    ></D3FilterCondition>
  </div>
</template>
<script>
import moment from "moment";
import * as d3 from "d3v4";
import appHeader from "@/components/assembly/AppHeader";
import riskLevel from "@/components/riskLevel/RiskLevel";
import mapOverview from "./components/mapOverview";
import * as apis from "@/api/mapJoin/index.js";
import * as comApis from "@/api/common.js";
import { hasQuery } from "../../tools/units.js";
import { mapJoinMixin } from "./mixin/mapJoinMixin";
// import PersonInfor from '@/components/assembly/PersonInfor'
import DLoad from "@/components/assembly/D3Load";
import { colors } from "../../../static/colors/color";
import Loading from "@/components/assembly/Loading";
import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
export default {
  name: "Join",
  components: {
    appHeader,
    riskLevel,
    // 'filterMap':()=>import('./components/filterMap'),
    filterMap: () => import("./components/filterMap"),
    historyMap: () => import("./components/historyMap"),
    mapOverview,
    // PersonInfor,
    ArchivalInfor,
    Loading,
    D3FilterCondition
    // DLoad
  },
  mixins: [mapJoinMixin],
  data() {
    return {
      tpInfo: {},
      d3Data: {},
      resultLabel: "",
      highlightNodeIDs: [],
      searchHighlightNode: "",
      locale: "",
      language: "",
      hydraType: this.$config.project.hydraType, //D3卡片展示
      hydra: "", //D3卡片展示
      keyword: "",
      tpidJoin: this.$route.query.tpid, //智能搜索页面图谱跳转过来判断（备用）
      saveName: "",
      graph: "",
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
      commonNodes: [],
      treeData: null,
      commonIds: [], // 共同人ids
      nodeDetailsAllData: {
        beginDate: "2016-01-01 00:00:00",
        endDate: "2017-03-31 23:59:59",
        allData: []
      },
      passiveID: "",
      selectedTpids: [], //勾选的图谱的IDs
      tempData: [],
      fetchDetail: {
        entity: 0,
        executeTime: 0
      },
      assessData: {
        label: "",
        personCount: 0,
        riskLevel: "",
        tpmc: "",
        personLabelCount: {}
      },
      showFilterDialog: true,
      showHistoryDialog: false,
      showMapOverview: true,
      historyData: [],
      addHistory: {},
      tempData: [],
      tplxList: [],
      treeArrData: [],
      commonNodeIds: [],
      existColors: [],
      filterConditionVisible: false,
      filterConditionParams: null,
      // currentSelectNode: null,
      // allSelectNodes: null
    };
  },
  created() {
    this.hydra = require(`../../../static/vendors/${this.hydraType}.js`); //D3卡片展示
    this.init();
    this.locale = this.$config.project.locale;
  },
  mounted() {
    this.initRender();
  },
  methods: {
    init() {
      this._getEntityLinksConfig();
    },
    initRender() {
      const me = this;
      this.opt = this.buildOpt();
      this.graph = this.hydra.default.graph(); //D3卡片展示
      this.graph.setOptions(this.opt);
      window.onresize = function() {
        let ch = document.documentElement.clientHeight;
        let cw = document.documentElement.clientWidth;
        me.graph.setSize({
          width: cw,
          height: ch - 120
        });
      };
      if (this.tpidJoin) {
        //智能搜索页面图谱跳转过来判断（备用）
        this.getTreeData(true);
      }
    },
    buildOpt() {
      var me = this;
      var width = document.getElementById("hydra").offsetWidth;
      var height = document.documentElement.clientHeight - 110;
      return {
        selector: "#hydra",
        width: width,
        height: height,
        offsetTop: 115,
        type: "tree",
        showToptag: true,
        showJoin: true,
        allowDrag: true,
        isHideMarkerOutsideClick: false,
        showFilterCondition: true,
        isHideSuperpositionBtn: true,
        allowNodeDbclick: false,
        expandlist: ["del", "lock", "expand"],
        highlightText: "",
        showToptagMenu: false,
        properties: this.$config.properties,
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
            var tpids = data.tpid.replace("#", "i").replace(":", "_"); //如果要跳转的图谱跟当前图谱一致，禁止点击
            if (!data || tpids == data.parentTpid) {
              return;
            }
            const { href } = me.$router.resolve({
              name: "ArchivesJoin",
              query: {
                tpids: data.tpid,
                rid: data.oid,
                sfzhm: data.sfzhm,
                mc: "图谱串并",
                pageName: "znss"
              }
            });
            window.open(href, "_blank");
          }
          // let tpid = encodeURIComponent(data.tpid);
        },
        tpsCreateEvt: function(data, allData, evt) {
          me.graph.createTpsList(data, allData, evt, {
            data: me.$refs.filterMap.checkAllGroup
          });
        },
        joinClickEvt: function(data) {
          var tpids = data.tpid.replace("#", "i").replace(":", "_"); //如果要跳转的图谱跟当前图谱一致，禁止点击
          if (!data || tpids == data.parentTpid) {
            return;
          }
          if (data.isSelected) {
            me.statusList.d3Loading = true;
            comApis.postMapInfoRid([data.tpid]).then(res => {
              me.statusList.d3Loading = false;
              if (res.code == 200 && res.data.length > 0) {
                let item = res.data[0];
                me.$refs.filterMap.handleAddMap(item);
                me.$Message.success("添加成功");
              } else {
                me.$Message.error("添加失败");
              }
            });
          } else {
            let item = {
              tpid: data.tpid
            };
            me.$refs.filterMap.handleRemove(item);
            me.$Message.success("已移除");
          }
        },
        mouseoutEvt: function(data) {},
        // 高级
        filterConditionClickEvt: function(data) {
          me.filterConditionVisible = true;
          me.filterConditionParams = data;
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
        },
        keypressEvt: function(keyCode) {
          // if (
          //   me.allSelectNodes &&
          //   me.allSelectNodes.nodes.length <= 0 &&
          //   me.currentSelectNode == null
          // )
          //   return;
          // let nodes = me.allSelectNodes.nodes;
          // let links = me.allSelectNodes.links;
          // let currentNodeIndex = nodes.findIndex(
          //   x => x == me.currentSelectNode
          // );
          // let nextNodeIndex = 0;
          // if (currentNodeIndex == -1) nextNodeIndex = 0;          
          // if (keyCode == "RIGHT") {
          //   if (currentNodeIndex >= nodes.length - 1) {
          //     nextNodeIndex = currentNodeIndex;
          //   } else {
          //     nextNodeIndex = currentNodeIndex + 1;
          //   }            
          // } else if (keyCode == "LEFT") {
          //   if (currentNodeIndex <= 0) {
          //     nextNodeIndex = 0;
          //   } else {
          //     nextNodeIndex = currentNodeIndex - 1;
          //   }
          // }
          // me.graph.fitDisplaySelection(nodes, links, nodes[nextNodeIndex]);
          // me.currentSelectNode = nodes[nextNodeIndex];
        }
      };
    },
    handleChangeTreeData(selectedTpids, type) {
      if (this.statusList.d3Loading) return;
      this.selectedTpids = selectedTpids.map(x => x.tpid);
      if (this.selectedTpids.length == 0) {
        this.handleClear();
      } else {
        this.getTreeData(true);
      }
    },
    // 移除选中的图谱的事件
    handleSelectRemove(selectedTpids, item, type) {
      let hydra = document.querySelector("#hydra");
      let tlist = null;
      let tlistLiIcon = null;
      if (hydra) tlist = hydra.querySelector(".tlist");
      if (tlist) tlistLiIcon = tlist.querySelectorAll(".join-icon");
      if (tlistLiIcon) {
        for (var i = 0; i < tlistLiIcon.length; i++) {
          var itemTmp = tlistLiIcon[i];
          var tpid = itemTmp.getAttribute("data-tpid");
          if (selectedTpids.tpid == tpid) {
            itemTmp.className = "join-icon iconfont icon-jiahao1";
            break;
          }
        }
      }
    },
    handleCommonNode(item) {
      // 先清除所有的选中的连线和节点
      this.clearSelectionAll();
      this.searchHighlightNode = ""
      if (item) {
        let oids = item.ids;
        let tmpArr = this.getGroupIds(oids);
        let linkIds = [];
        let nodes = [];
        let links = [];
        let arrs = tmpArr.forEach(x => {
          let source = this.graph.getNodeByParams(x[0], "id");
          let target = this.graph.getNodeByParams(x[1], "id");
          let linkObj = {
            tags: [],
            id: x[0] + "-" + x[1],
            source: source,
            target: target,
            color: item.color,
            width: 4,
            direction: "reverse"
          };
          this.graph.addLink(linkObj);
          this.graph.editNodeColor(oids, item.color);
          linkIds.push(x[0] + "-" + x[1]);
          if (nodes.indexOf(source) == -1) {
            nodes.push(source);
          }
          if (nodes.indexOf(target) == -1) {
            nodes.push(target);
          }
          links.push(linkObj);
        });
        this.graph.selectedElements(oids, linkIds);
        // 默认从第一个开始
        nodes.sort(function(a, b) {
          return a.x - b.x;
        });
        if (nodes.length > 0) {
          this.currentSelectNode = nodes[0];
        }
        this.allSelectNodes = {
          nodes: nodes,
          links: links
        };
        this.graph.fitDisplaySelection(nodes, links);
        // this.graph.centerSelection(nodes, links);
        this.initMenu();
      }
    },
    handleClosePanel() {
      this.showMapOverview = false;
    },
    handleClear() {
      document.getElementById("hydra").innerHTML = ""; //清空D3图形化
      this.historyData = [];
      this.commonNodes = [];
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
     * 获取串并树形图展示的数据
     * @function getTreeData
     * @author erbing
     */
    getTreeData(flag) {
      var me = this;
      me.commonNodes = [];
      me.treeData = [];
      me.treeArrData = [];
      me.commonNodeIds = [];
      me.existColors = [];
      me.keyword = "";
      if (flag) {
        sessionStorage.firstTpid =
          me.selectedTpids.length != 0 ? me.selectedTpids : me.tpidJoin;
        if (!this.showHistoryDialog) {
          me.historyData = []; //每次串并都会清空 历史记录
        }
        sessionStorage.passiveID = me.passiveID = "";
      }
      let params = {
        passiveID: sessionStorage.passiveID,
        tpids: me.selectedTpids.length != 0 ? me.selectedTpids : me.tpidJoin
      };
      if (!params.tpids) {
        this.handleClear();
        me.statusList.d3Loading = false;
        return;
      }
      me.statusList.d3Loading = true;
      apis.getMapids(params).then(response => {
        let resData = response.data;
        if (response.code == 200) {
          me.treeData = resData;
          this.getCommonIdByCard();
          sessionStorage.passiveID = me.passiveID =
            me.selectedTpids.length != 0 ? me.selectedTpids : me.tpidJoin;
          var data = me.parseData(resData.tpData, false);
          me.commonNodes.sort((a, b) => {
            return b.count - a.count;
          });
          me.saveName = resData.tpData.children[0].properties.TPMS;
          me.fetchDetail.entity = resData.nodeCount;
          me.fetchDetail.executeTime = resData.executeTime;
          me.initialize(data);
          me.statusList.d3Loading = false;
          if (
            me.searchHighlightNode != undefined ||
            me.$route.query.sfzhm != ""
          ) {
            //默认进去图谱展示，居中实体
            me.searchHighlight(false);
          }
        } else {
          me.statusList.d3Loading = false;
          me.$Message.error(response.msg);
        }
      });
    },
    initialize(msg) {
      document.getElementById("hydra").innerHTML = "";
      var me = this;
      this.graph.setIcons(me.iconsList);
      this.graph.init();
      me.tempData = msg;
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
            if (me.showHistoryDialog) {
              me.showHistoryDialog = false;
            }
            if (me.showFilterDialog) {
              me.showFilterDialog = false;
            }
            me.statusList.PersonInforShow = true;
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
      box.style.left = pos.x + "px";
      box.style.top = pos.y + "px";
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
          me.commonNodeIds.forEach(x => {
            if (x.id == data.id) {
              // 身份证号存在的情况下，且ID不存在，则添加
              let flag2 = me.commonNodes.some(k => {
                return k.key == data.properties.SFZHM;
              });
              if (!flag2) {
                let color = me.getColors(me.existColors);
                data.color = color;
                me.commonNodes.push({
                  key: data.properties.SFZHM,
                  color: color,
                  ids: [x.id],
                  properties: data.properties,
                  data: data,
                  count: x.count
                });
              } else {
                me.commonNodes.forEach(y => {
                  if (y.key == data.properties.SFZHM) {
                    if (y.ids.indexOf(x.id) == -1) {
                      y.ids.push(x.id);
                    }
                  }
                });
              }
            }
          });
          me.commonNodes.forEach(x => {
            if (x.key == data.properties.SFZHM) {
              data.color = x.color;
            }
          });

          for (var i = 0; i < data.children.length; i++) {
            changeImage(data.children[i]);
          }

          return data;
        } else if (data.nodeType == "QB_ZP_TP") {
          data.showProperties = ["TPMS", ""];
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
        me.commonNodeIds.forEach(x => {
          if (x.id == data.id) {
            // 身份证号存在的情况下，且ID不存在，则添加
            let flag2 = me.commonNodes.some(k => {
              return k.key == data.properties.SFZHM;
            });
            if (!flag2) {
              let color = me.getColors(me.existColors);
              data.color = color;
              me.commonNodes.push({
                key: data.properties.SFZHM,
                color: color,
                ids: [x.id],
                properties: data.properties,
                data: data,
                count: x.count
              });
            } else {
              me.commonNodes.forEach(y => {
                if (y.key == data.properties.SFZHM) {
                  if (y.ids.indexOf(x.id) == -1) {
                    y.ids.push(x.id);
                  }
                }
              });
            }
          }
        });
        me.commonNodes.forEach(x => {
          if (x.key == data.properties.SFZHM) {
            data.color = x.color;
          }
        });
        for (var i = 0; i < data.children.length; i++) {
          changeImage(data.children[i]);
        }
        return data;
      }
      return data;
    },
    // 获取数据中相同身份证号的
    getCommonIdByCard() {
      let data = [this.treeData.tpData];
      this.treeTransArray(data, "children");
      let arr = this.treeArrData.filter(x => {
        return x.nodeType == "QB_ZP_RY" && x.properties && x.properties.SFZHM;
      });
      //获取重复的身份证号
      let tmp = [];
      let cards = arr.reduce((prev, next) => {
        prev[next.properties.SFZHM] = prev[next.properties.SFZHM] + 1 || 1;
        if (prev[next.properties.SFZHM] > 1) {
          tmp.push(next.properties.SFZHM);
        }
        return prev;
      }, {});
      let nodeIds = arr
        .filter(x => {
          return tmp.indexOf(x.properties.SFZHM) != -1;
        })
        .map(k => {
          return {
            id: k.id,
            count: cards[k.properties.SFZHM]
          };
        });
      this.commonNodeIds = nodeIds;
    },
    // 相邻元素组合
    getGroupIds(oids) {
      var c = [];
      for (var i = 1; i < oids.length; i++) {
        c.push([oids[i - 1], oids[i]]);
      }
      return c;
    },
    // 两两组合ID
    getJoinGroupIds(oids) {
      debugger;
      for (var a = []; a.push([]) < oids.length; );
      var b = Math.pow(2, oids.length) - 1;
      for (var i = 1; i <= b; i++) {
        var c = [];
        for (var s = i, k = 0; s > 0; s >>= 1, k++) {
          if (s & (1 == 1)) c.push(oids[k]);
        }
        a[c.length - 1].push(c);
      }
      return a[1];
    },
    /**
     * 隐藏个人信息面板
     * @function switchTrajectory
     * @author julie
     */
    hidePersonInfor(data) {
      this.statusList.PersonInforShow = data;
    },
    /**
     * 显示历史记录面板
     * @function returnHistory
     * @author julie
     */
    returnHistory() {
      this.statusList.PersonInforShow = false;
      this.showHistoryDialog = true;
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
    handleShowMulti() {
      this.showFilterDialog = true;
    },
    /**
     * 获取所有相关配置表
     * @function getEntityLinksConfig
     * @author erbing
     */
    _getEntityLinksConfig() {
      let me = this;
      let params = {
        language: me.language
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
    },
    // 将树形结构的数据转化成一维数组
    treeTransArray(tree, key) {
      return tree.reduce((con, item) => {
        con.push(item);
        if (item[key] && item[key].length > 0)
          this.treeTransArray(item[key], key);
        return con;
      }, this.treeArrData);
    },
    /**
     * D3保存图片
     * @function closeFeedbackModal
     * @author erbing
     */
    saveAsPng() {
      this.graph.exportPic(this.saveName + "串并图");
    },
    refresh() {
      let me = this;
      me.statusList.d3Loading = true;
      var data = me.tempData;
      me.initialize(data);
      me.statusList.d3Loading = false;
    },
    /**
     * 搜索高亮相应实体
     * @function searchHighlight
     * @author erbing
     */
    searchHighlight(flag = true) {
      var me = this;
      var searchBoxText = me.searchHighlightNode || me.$route.query.sfzhm;
      if (!searchBoxText && flag) {
        me.$Message.warning("请输入查询条件！");
        return false;
      }
      me.resultLabel = searchBoxText;      
      let d3Data = this.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      //1 再次点击选取清空上一次选择的内容，并且清空高亮的ids数组 
      if(this.$refs.mapOverview) this.$refs.mapOverview.resetSelection();     
      this.clearSelectionAll() 
      if (!me.resultLabel) return;     
      //2 找到这次点击标签相关的ID，放到me.highlightNodeIDs里面
      me.filterHighlightIds(nodes);
      //3 根据找到的ID进行高亮
      if (me.highlightNodeIDs.length > 0) {
        let color = searchBoxText ? "green" : "green";
        let ids = me.highlightNodeIDs.map(x => x.data.id);
        me.graph.editNodeColor(ids, color);
        // 默认从第一个开始
        // me.highlightNodeIDs.sort(function(a, b) {
        //   return a.x - b.x;
        // });
        // if (me.highlightNodeIDs.length > 0) {
        //   this.currentSelectNode = me.highlightNodeIDs[0];
        // }
        // this.allSelectNodes = {
        //   nodes: me.highlightNodeIDs,
        //   links: []
        // };
        me.graph.fitDisplaySelection(me.highlightNodeIDs, []);
      }
    },
    clearSelectionAll() {
      // 先清除所有的选中的连线和节点
      this.commonNodes.forEach(x => {
        let tmpArrs = this.getGroupIds(x.ids);
        if (tmpArrs && tmpArrs.length > 0) {
          let tmpIds = tmpArrs.map(y => y[0] + "-" + y[1]);
          this.graph.deleteLinks(tmpIds);
        }        
      });      
      let d3Data = this.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      if (nodes.length != 0) {
        this.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
      }
      this.currentSelectNode = null;
      this.allSelectNodes = null;
      this.highlightNodeIDs = []
    },
    /**
     * 搜索，高亮相应实体方法
     * @function filterHighlightIds
     * @author erbing
     */
    filterHighlightIds(data) {
      var me = this;
      var labelObj = {};
      data.forEach(item => {
        var itemArr = item.data.properties;
        for (var i in itemArr) {
          if (
            itemArr[i] != "" &&
            typeof itemArr[i] != "number" &&
            typeof itemArr[i] != "object" &&
            item.data.nodeType != "QB_ZP_TP"
          ) {
            if (itemArr[i].indexOf(me.resultLabel) != -1) {              
              var isExist = me.highlightNodeIDs.some(x=> x === item)
              if(!isExist) {
                me.highlightNodeIDs.push(item);
              }              
            }
          }
        }
      });
    },
    // 已经设置的色值
    getColors(existColors) {
      let color = "";
      var countTimes = existColors.reduce(function(time, name) {
        if (name in time) {
          time[name]++;
        } else {
          time[name] = 1;
        }
        return time;
      }, {});
      let timeArr = [];
      Object.keys(countTimes).forEach(key => {
        timeArr.push({
          color: key,
          count: countTimes[key]
        });
      });
      if (existColors.length <= 0 || existColors.length == colors.length) {
        color = colors[0];
      } else {
        var minObj = null;
        if (existColors.length > colors.length) {
          timeArr.sort((a, b) => {
            return b.count - a.count;
          });
          let maxCount = timeArr[0].count;
          var maxObjIndex = 0;
          timeArr.forEach((x, index) => {
            if (x.count == maxCount) {
              maxObjIndex = index;
            }
          });
          maxObjIndex = maxObjIndex == timeArr.length - 1 ? 0 : maxObjIndex;
          color = colors[maxObjIndex + 1];
        } else {
          minObj = timeArr[timeArr.length - 1];
          var index = colors.findIndex(x => x == minObj.color);
          index = index != -1 ? (index == colors.length - 1 ? 0 : index) : 0;
          color = colors[index + 1];
        }
      }
      existColors.push(color);
      return color;
    }
  },
  beforeDestory() {
    sessionStorage.removeItem(this.$route.query.areaMapCodes)
  }
};
</script>
<style lang="less" scoped>
@import "./css/style.less";
</style>
<style lang="less">
@import "./css/svg.less";
</style>


