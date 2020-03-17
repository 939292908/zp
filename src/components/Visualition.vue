<!--
 * @Author: your name
 * @Date: 2019-10-15 18:59:54
 * @LastEditTime: 2019-10-28 18:15:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\Visualition.vue
 -->
<template>
  <div id="visualition" class="result" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="图谱展示" :showSearch="false">
      <span @click="backSearchTp()" style="cursor:pointer;">{{ navTitle }}></span>
    </app-header>

    <div class="result-cont">
      <div id="d3" class="d3">
        <div class="title">
          <span class="tplx-title">{{ tplx.title }}</span>
          <span class="search-result title-span">{{'人员总数 ' + fetchDetail.entity}}</span>
          <span
            v-show="fetchDetail.entity>10 && fetchDetail.show ? true : false "
            class="title-span"
          >{{'，显示前 '+fetchDetail.showNum}}</span>
          <span class="title-span">{{'，用时 ' + fetchDetail.executeTime + ' 秒'}}</span>
          <span title="图谱概述展开\图谱概述关闭" class="count-result-panel">
            <i
              @click="statusList.showMapOverview = !statusList.showMapOverview"
              class="iconfont icon-zairumoban"
            ></i>
          </span>
        </div>
        <!-- d3图形展示 -->
        <div class="graphical" v-show="statusList.d3Show">
          <!-- 图谱概述组件 -->
          <!-- @on-change="handleSelectClick" -->
          <MapOverview
            v-show="statusList.showMapOverview"
            :assessData="newAssessData"
            ref="risk"
            @on-hide="statusList.showMapOverview = false"
            @on-change="handleSelectClick"
          ></MapOverview>

          <div class="func-btn-group">
            <div class="group-left">
              <ul>
                <!-- <li><i class="iconfont icon-baocun"></i></li> -->
                <li>
                  <i class="iconfont icon-pingmukuaizhao" @click="saveAsPng"></i>
                </li>
                <li>
                  <i class="iconfont icon-shuaxin" @click="refresh"></i>
                </li>
                <!-- <li><i class="iconfont icon-dayin"></i></li> -->
                <li></li>
              </ul>
            </div>
            <!-- <div class="group-right">
              <ul>
                <li><i class="iconfont icon-zuzhi"></i></li>
                <li><i class="iconfont icon-guanxiquan"></i></li>
                <li><i class="iconfont icon-lujingjisuan"></i></li>
              </ul>
            </div>-->
          </div>
          <!-- d3 -->
          <div v-show="statusList.d3Show" id="hydra" width="1300" height="800"></div>
          <!-- loading -->
          <loading color="white" v-model="d3Loading"></loading>
        </div>
      </div>
    </div>
    <!-- 查看档案面板 -->
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
      metaTitle="以人搜图"
    ></D3FilterCondition>
  </div>
</template>

<script>
import appHeader from "@/components/assembly/AppHeader";
import * as comApis from "@/api/common.js";
import moment from "moment";
import * as d3 from "d3v4";
import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
import MapOverview from "@/components/assembly/MapOverview";
import Loading from "@/components/assembly/Loading";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
import hydra from "../../static/vendors/hydraCard.js";
export default {
  name: "Visualition",
  components: {
    ArchivalInfor,
    MapOverview,
    appHeader,
    Loading,
    D3FilterCondition
  },
  data() {
    return {
      tpInfo: {},
      d3Data: {},
      nodes: [], // 图谱人员nodes
      currentMapId: "", // 当前扩展的图谱id
      currentClickNode: null, //当前点击的节点
      navTitle: "以人搜图",
      hydra: null, //D3卡片展示
      temp: {},
      current: "",
      path: this.$config.joinPath,
      token: "",
      txid: "",
      filterLoading: false,
      d3Loading: false,
      language: "ch",
      curEneityData: {},
      beginDate: "2016-01-01",
      endDate: "2017-12-31",
      pageIndex: 1,
      pageSize: 50,
      tplx: {
        filterCondition: "",
        starts: 0,
        types: "",
        sizes: 10,
        index: "",
        title: ""
      },
      /**
       * 当前实体所有数据/实体
       * @object curEneity
       * @author LiErbing
       */
      //icons: icons,
      labelColors: [],
      tplxMapping: [],
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
      iconsList: [],
      curEneityAllData: {
        fxpf: "",
        type: "mark",
        rybq: [],
        imgSrc: "",
        labelBgColor: [],
        eneityBasicInfo: "",
        eneityTrajectoryInfo: {
          //dataTypes: ["all","PERMANENT_RESIDENTS", "INTERNET_BAR", "HOTEL"],
          dataTypes: [],
          data: [],
          datas: [],
          mapData: [],
          photoData: [],
          startTime: "2018-01-01",
          endTime: "",
          showDate: false,
          photoNode: []
          //isShow : '',
          // photoData: {
          //   '0': '0.png',
          //   '1': '1.png',
          //   '2': '2.png'
          // }
        },
        eneityCorrelationInfo: {
          data: []
        }
      },
      current: 0,
      nodeID: "",
      nodeType: "",
      statusList: {
        myNavModalShow: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        messageDetailsShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        feedbackShow: false,
        d3Show: true,
        cardShow: false,
        ModalShow: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        addModalShow: false,
        uploadImg: false,
        links: false,
        entity: true,
        hasSource: true,
        showMapOverview: true
      },
      entity: [],
      opt: {},
      name: "",
      keyword: this.$route.query.keyword,
      fetchDetail: {
        entity: 0,
        executeTime: 0,
        showNum: 10,
        show: true
      },
      graph: "",
      entityPropList: [],
      linksPropList: [],
      tpIdArr: [],
      filterConditionVisible: false,
      filterConditionParams: null
    };
  },
  methods: {
    backIndex() {
      this.$router.push({
        path: "/index"
      });
    },
    backSearchTp() {
      if (this.navTitle == "全文检索") {
        this.$router.push({
          path: "/fullTextResult"
        });
      } else {
        this.$router.push({
          path: "/searchtp"
        });
      }
    },
    // 获取图谱概览的数据
    getMapOverview(mapId) {
      comApis.GET_JOIN_MAP_OVERVIEW(mapId).then(res => {
        if (res.code == 200) {
          // console.log(res.data);
          this.newAssessData = res.data;
        }
      });
    },
    // 获取新扩展图谱nodes;  data：新图谱data数据
    getNodes(data, key = "data") {
      data = data.children ? data : { children: data };
      data.children.forEach(item => {
        let node = key ? item[key] : item;
        if (node.properties && node.properties.SFZHM) {
          this.nodes.push(item);
        }
        if (item.children) {
          this.getNodes(item, key);
        }
      });
      return this.nodes;
    },
    // 点击 高亮实体
    handleSelectClick(type, item, index) {
      const me = this;
      // 获取新扩展图谱 nodes;
      me.getNodes(
        me.graph
          .getData()
          .nodes.filter(item => item.data.id == this.currentMapId)
      );

      // 清除选中
      if (me.nodes.length > 0) {
        me.graph.editNodeColor(me.nodes.map(x => x.data.id), "#d7d7d7");
      }
      // 获取选中的值进行查询
      let arr = [];
      switch (type) {
        case "genderId":
          arr = me.nodes.filter(x => {
            return x.data.properties.genderId == item.type;
          });
          break;
        case "fiveOnePropertyId": //五位一体
          arr = me.nodes.filter(x => {
            return x.data.properties.fiveOnePropertyId.indexOf(item.type) != -1;
          });
          break;
        case "levelLine": //案件线索
          arr = me.nodes.filter(x => {
            return (
              x.data && item.idNumbers.indexOf(x.data.properties.SFZHM) != -1
            );
          });
          break;
        case "stateId": //人员属性
          arr = me.nodes.filter(x => {
            return (
              x.data.properties.stateId == (item.type == "无" ? "" : item.type)
            );
          });
          break;
        case "tagId": //人员标签
          arr = me.nodes.filter(x => {
            return x.data.properties.tagId.indexOf(item.tagId) != -1;
          });
          break;
      }
      // console.log(item.type,type,me.nodes,arr);
      if (arr.length > 0) {
        // 高亮居中
        me.graph.editNodeColor(arr.map(x => x.data.id), "green");
        me.graph.centerSelection(arr, []);
      } else {
        // 重置
        me.graph.editNodeColor(me.nodes.map(x => x.data.id), "#d7d7d7");
        me.graph.centerSelection(me.nodes, []);
      }
    },
    getByKeyWord(index) {
      let me = this;
      me.filterLoading = true;
      let params = new URLSearchParams();
      let url = me.path + "/RiskAssessController/v1/allTplxs";
      //params.append('keyword', '652801201606197316');
      params.append("token", me.token);
      params.append("start", me.tplx.starts);
      params.append("size", me.tplx.sizes);
      params.append("type", me.tplx.types);
      this.$axios
        .post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            this.filterLoading = false;
            return false;
          }
          this.filterLoading = false;
          if (this.tplx.index != "") {
            console.log(response.data.data[0].properties);
            //me.tplx.filterCondition[this.tplx.index].properties = [];
            me.tplx.filterCondition[this.tplx.index].properties =
              response.data.data[0].properties;
          } else {
            me.tplx.filterCondition = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveAsPng() {
      this.graph.exportPic(this.temp.children[0].properties.XM + "的关系图");
    },
    refresh() {
      let me = this;
      me.d3Loading = true;
      var data = me.temp;
      me.initialize(data);
      me.d3Loading = false;
    },
    getEntityLinksConfig() {
      let me = this;
      comApis
        .getInitializeConfig()
        .then(response => {
          if (response.code != 200) {
            return false;
          }
          me.entityPropList = response.data.nodeConfig || [];
          me.linksPropList = response.data.linkConfig || [];
          me.iconsList = response.data.nodeIconConfig || [];
          me.labelColors = response.data.labelColors || [];
          me.tplxMapping = response.data.tplxMapping || [];
          me.iconsList.map(item => {
            for (let i in item) {
              if (i == "path_1") {
                item["path_n"] = item[i];
              }
            }
          });
          me.opt = me.buildOpt();
          me.searchByKeyword();
        })
        .catch(error => {
          console.log(error);
        });
    },
    hidePersonInfor(data) {
      this.statusList.PersonInforShow = data;
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
        showToptag: true, //是否显示卡片底部图谱标签
        allowNodeDbclick: true,
        useOverlap: false, //启用叠加
        expandlist: ["expand"], //"del", , "lock"
        showToptagMenu: true,
        isHideSuperpositionBtn: true,
        properties: this.$config.properties,
        showFilterCondition: true,
        // 高级
        filterConditionClickEvt: function(data) {
          me.filterConditionVisible = true;
          me.filterConditionParams = data;
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
            var tpid = data.tpid.replace("#", "i").replace(":", "_"); //如果要跳转的图谱跟当前图谱一致，禁止点击
            if (
              !data ||
              tpid == data.parentTpid ||
              data.mapId == data.parentTpid
            ) {
              return;
            }
            me.statusList.PersonInforShow = false;
            //rid哪个实体进入高亮绿色
            // me.getTreeData(false);
            let passiveID = data.parentTpid.replace("i", "#").replace("_", ":");
            const { href } = me.$router.resolve({
              name: "ArchivesJoin",
              query: {
                tpids: data.tpid,
                rid: data.oid,
                sfzhm: data.sfzhm,
                passiveID: passiveID,
                mc: me.$route.query.mc || "以人搜图",
                pageName: me.pageName
              }
            });
            window.open(href, "_blank");
          }
        },
        bgclick() {
          return false;
        },
        // 节点的双击事件
        nodeDblClick(node) {
          me.currentClickNode = node;
          let nodes = me.graph.getData().nodes;
          // 先清空还原
          // let nodeRys = nodes.filter(x=>x.data.nodeType == 'QB_ZP_RY')
          // let nodeTp = nodes.filter(x=>x.data.nodeType == 'QB_ZP_TP')
          // me.graph.editNodeColor(nodeRys.map(x => x.data.id), "#d7d7d7");
          // nodeTp.forEach(tp=>{
          //   me.graph.editNodeColor([tp.data.id], me.$config.topTagColors[tp.data.properties.label]);
          // })
          // 再设置选中效果
          if (node.data.nodeType != "QB_ZP_TP") {
            me.graph.editNodeColor([node.data.id], "green");
          }
          // me.graph.centerSelection([node], []);
          // me.graph.selectedElements(node.data.id, []);
        },
        expandEvt(obj, node, i) {
          switch (obj.type) {
            case "edit":
              break;
            case "del":
              // let o = me.graph.getSelection();
              // me.graph.setElementsDeleted(o.node, o.link);
              break;
            case "expand":
              me.expandEntity(node);
              break;
            case "add":
              break;
            case "lock":
              break;
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
     * 扩展实体
     * @function expandEntity
     * @author Zhangchan
     */
    expandEntity(msg) {
      if (msg.data.nodeType == "QB_ZP_RY") {
        if (msg.data.children.length > 0) {
          this.$Message.warning("该人员已扩展！");
          return;
        }
        this.getTpByTpbhs(msg.data.id, msg.data.tpids);
      } else if (msg.data.nodeType == "QB_ZP_TP") {
        if (this.tpIdArr.length > 0) {
          var isExpand = this.tpIdArr.some(
            item => item == msg.data.properties.TPBH
          );
          if (isExpand) {
            this.$Message.warning("该图谱已扩展！");
            return false;
          }
        }
        this.tpIdArr.push(msg.data.properties.TPBH);
        this.getTpGraph(msg.data.id, msg.data.id);
      }
    },
    addData(id, data, msg, type) {
      if (data.id == id) {
        if (type == "push") {
          data.children.push(msg);
        } else {
          data.children = msg;
        }
        return false;
      }
      for (var i = 0; i < data.children.length; i++) {
        this.addData(id, data.children[i], msg, type);
      }
    },
    initialize(msg) {
      //有用
      document.getElementById("hydra").innerHTML = "";
      this.graph.setOptions(this.opt);
      this.graph.init();
      this.loadIcons(msg);
    },
    parseData(data, flag) {
      var me = this;
      data = changeImage(data);
      function changeImage(data) {
        if (data.nodeType == "QB_ZP_RY") {
          data.image = me.getImagePath(data.properties.picUrl);
          data.properties.GXMC = data.gxmc;
          data.state = data.properties.STATE; //D3卡片展示
        } else if (data.nodeType == "QB_ZP_TP") {
          data.isShow = flag;
          me.tplxMapping.forEach(function(item) {
            if (data.properties.TPLX == item.value) {
              data.properties.TPLX = item.name;
            }
          });
        }
        for (var i = 0; i < data.children.length; i++) {
          changeImage(data.children[i]);
        }
        return data;
      }
      return data;
    },
    loadIcons(msg) {
      //有用
      var me = this;
      me.graph.setIcons(me.iconsList);
      me.graph.load(msg);
      me.initMenu();
    },
    createRMenu(data, pos, obj) {
      //有用
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
        // lis[i].innerText = this.$t(data[i].text);
        lis[i].innerText = data[i].text;
        lis[i].setAttribute("url", data[i].url);
        lis[i].onclick = data[i].method;
        // lis[i].onclick = function(){
        //    data[i].method()
        // };
        ul.appendChild(lis[i]);
      }
    },
    switchNodeViews() {
      var me = this;
      me.statusList.PersonInforShow = false;
      me.statusList.nodesDetailedShow = false;
    },
    initMenu() {
      //有用
      var me = this;
      var data = [
        {
          text: "查看档案",
          //text : 'message.relation.viewFile',
          url: "",
          method: function() {
            me.switchNodeViews();
            me.statusList.PersonInforShow = true;
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
          //e = e.data;
          // if (['rect', 'text'].indexOf(d3.event.srcElement.tagName) != -1 || !e.data.exist) return false;
          //-255 -120 为临时值，需要获取左侧宽和顶部高
          me.createRMenu(
            data,
            { x: d3.event.pageX + 50, y: d3.event.pageY - 120 },
            e
          );
          me.curEneityData = e.data;
          me.nodeID = e.data.nodeType == "QB_ZP_TP" ? e.data.id : e.data.oid;
          // me.nodeID = e.data.oid;
          console.log(e.data, 1111111111);
          //me.nodeType = e.nodeType;
          me.nodeType = e.data.nodeType;
          me.d3Data = e.data;
        });
    },
    getByRyData() {
      if (!this.keyword) {
        this.$Message.warning("请输入查询关键字");
        return;
      }
      this.searchByKeyword();
    },
    /**
     * 根据关键字搜索的结果
     * @function searchByKeyword
     * @author erbing
     */
    searchByKeyword() {
      var me = this;
      var params = new URLSearchParams();
      params.append("keyword", this.keyword);
      params.append("token", this.token);
      params.append("pageIndex", 1);
      params.append("pageSize", 10);
      // let url = this.path + '/RiskAssessController/v1/searchGraphByRy';
      let url = this.path + "IntelligentSearchResource/v1/searchGraphByPerson";
      me.d3Loading = true;
      this.$axios
        .post(url, params)
        .then(response => {
          if (!response.data) {
            me.d3Loading = false;
            document.getElementById("hydra").innerHTML = "";
            me.$Message.warning(response.message);
            return false;
          }
          if (response.code == 200) {
            me.d3Loading = false;
            var data = me.parseData(response.data.tpData, false);
            me.initialize(data);
            me.temp = data;
            me.fetchDetail.entity = response.data.total;
            me.fetchDetail.executeTime = response.data.executeTime;
            me.fetchDetail.show = true;
          }
        })
        .catch(error => {
          //this.$Message.warning(response.data.msg);
          me.d3Loading = false;
          console.log(error);
        });
    },
    /**
     * 实体类型为人员的扩展
     * @function getTpByTpbhs
     * @author erbing
     */
    getTpByTpbhs(id, ids) {
      if (!ids) {
        alert("无法扩展，请重新查询！");
        return false;
      }
      var me = this;
      var params = new URLSearchParams();
      params.append("ids", ids);
      params.append("token", this.token);
      //let url = this.path + 'RiskAssessController/v1/getTpByTpbhs';
      let url = this.path + "IntelligentSearchResource/v1/vertex/id";
      me.d3Loading = true;
      this.$axios
        .post(url, params)
        .then(response => {
          me.d3Loading = false;
          var data = response.data;
          for (var i = 0; i < data.length; i++) {
            // for(var j = 0; j < me.tplxMapping.length; j++){
            //   if(data[i].properties.TPLX == me.tplxMapping[j].value){
            //data[i].properties.TPLX = me.tplxMapping[j].name;
            data[i] = me.parseData(data[i], false);
            //   }
            // }
          }
          // if(!response.data.data.assessData){
          //   me.assessData = {
          //     label: "",
          //     personCount: 0,
          //     riskLevel: "",
          //     tpmc:"",
          //     personLabelCount: {}
          //   }
          // }
          me.addData(id, me.temp, data, "=");
          me.graph.load(me.temp);
          if (this.currentClickNode) {
            let tmps = [this.currentClickNode];
            data.forEach(x => {
              let tmNode = me.graph.getNodeByParams(
                x.id,
                "id",
                this.currentClickNode.data.id
              );
              tmps.push(tmNode);
            });
            // 获取添加的节点的ID
            me.graph.centerSelection(tmps, []);
          }
          me.initMenu();
        })
        .catch(error => {
          me.d3Loading = false;
          console.log(error);
        });
    },
    /**
     * 实体类型为图谱的扩展
     * @function getTpGraph
     * @author erbing
     */
    getTpGraph(id, ids) {
      this.getMapOverview(ids); // 获取 图谱概述信息
      this.currentMapId = ids;

      var me = this;
      var params = new URLSearchParams();
      params.append("ids", ids);
      params.append("flag", 0);
      params.append("token", this.token);
      // let url = this.path + '/RiskAssessController/v1/getTpGraph';
      let url = this.path + "IntelligentSearchResource/v1/mapTreeData/id";
      me.d3Loading = true;
      this.$axios
        .post(url, params)
        .then(response => {
          if (response.code == 200 && response.data.tpData) {
            me.d3Loading = false;
            var data = me.parseData(response.data.tpData.children[0], false);
            me.addData(id, me.temp, data.children, "=");
            me.graph.load(me.temp);
            me.fetchDetail.entity = response.data.nodeCount;
            me.fetchDetail.executeTime = response.data.executeTime;
            me.fetchDetail.show = false;
            me.initMenu();
            me.assessData = response.data.assessData[ids];

            var label = response.data.assessData[id].labelCount; //风险要素面板人员标签
            me.assessData.person_tag = label;
            // var label = response.data.assessData[ids].personLabelCount;
            // if(!label){
            //   me.assessData.personLabelCount = {};
            // }else{
            //   me.assessData.personLabelCount = JSON.parse(label);  //标签
            // }
            if (this.currentClickNode) {
              me.getNodes(data.children, "");
              let tmps = [this.currentClickNode];
              let commonNodes = [];
              let parentNode = this.currentClickNode.parent
                ? this.currentClickNode.parent.data
                : null;
              me.nodes.forEach(x => {
                let tmNode = me.graph.getNodeByParams(x.id, "id");
                if (
                  x.properties.SFZHM ==
                  (parentNode && parentNode.properties.SFZHM)
                ) {
                  commonNodes.push(tmNode);
                }
                tmps.push(tmNode);
              });
              // 设置当前同当前节点相同人员的进行高亮
              if (commonNodes.length > 0) {
                me.graph.editNodeColor(
                  commonNodes.map(x => x.data.id),
                  "green"
                );
              }
              // 获取添加的节点的ID
              me.graph.centerSelection(tmps, []);
            }

            // 保存每次获取的nodes
            me.nodes = [];
            // me.getNodes(response.data.tpData.children[0]);
            // console.log("人员nodes=========",me.nodes,me.graph.getData());
          }
        })
        .catch(error => {
          me.d3Loading = false;
          console.log(error);
        });
    },
    showProperties(data, isShow) {
      var me = this;
      data.forEach(ele => {
        me.entityPropList.forEach(el => {
          if (ele.nodeType == el.name) {
            ele.showProperties = el.showProp;
          }
        });
        if (isShow) {
          //ele.image = '/static/avatar/' + ele.properties.RYZP;
          //ele.image = 'http://104.152.4.59/sfzh/' + ele.properties.SFZHM+".png";
          ele.image =
            this.$config.imgPath + ele.properties.SFZHM + this.$config.imgType;
        }
      });
    },
    parseLinks(data) {
      data.forEach(ele => {
        ele.properties.relation = ele.properties.GXMC;
        ele.showProperties = ["relation"];
      });
      return data;
    },
    /**
     * 保存快照
     * @function saveAsJson
     * @author Zhangchan
     */
    saveAsJson() {
      let data = this.graph.exportJson();
      let json = {
        nodes: data.nodes.filter(ele => {
          delete ele.image;
          return !!ele.isEdit;
        }),
        links: data.links.filter(ele => {
          delete ele.properties.relation;
          return !!ele.isEdit;
        })
      };
      let url =
          this.path + "/GraphicalController/v1/saveHistoryGraphToDatabase",
        me = this;
      let params = new URLSearchParams();
      params.append("txid", this.txid);
      params.append("graphData", JSON.stringify(data));
      params.append("token", this.token);
      this.$axios
        .post(url, params)
        .then(response => {
          window.open(
            me.path +
              "/GraphicalController/v1/saveHistoryGraphToLocal?txid=" +
              me.txid +
              "&token=" +
              me.token,
            "_blank"
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    const me = this;
    this.opt.height = document.documentElement.clientHeight - 120;
    this.opt.width = document.documentElement.clientWidth - 255;
    window.onresize = function() {
      let ch = document.documentElement.clientHeight;
      let cw = document.documentElement.clientWidth;
      me.graph.setSize({
        width: cw - 255,
        height: ch - 120
      });
    };
  },
  created() {
    //this.$i18n.locale='ch';
    !this.$route.query.name
      ? (this.navTitle = "以人搜图")
      : (this.navTitle = this.$route.query.name);
    this.hydra = hydra;
    this.graph = this.hydra.graph(); //D3卡片展示
    this.getEntityLinksConfig();
    this.curEneityAllData.eneityTrajectoryInfo.endTime = moment(
      new Date()
    ).format("YYYY-MM-DD");
  },
  beforeDestroy() {
    //this.unload();
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
    .condition-filter-mark {
      top: 0;
      left: 0;
      bottom: 6px;
      // width:241px;
      width: 278px;
      background-color: rgba(37, 83, 176, 0.2);
      border: solid 1px #183e85;
      border-left: none;
      overflow-y: scroll;
      overflow-x: hidden;
      .post(a);
      .filter {
        .post(r);
        margin: 1px 0 7px 0;
        padding-left: 2px;
        //border-bottom:1px solid #183e85;
        .title {
          color: #3aa8fb;
          font-size: 14px;
        }
        .separate-icon {
          width: 6px;
          height: 3px;
          background: #55a9f8;
          display: inline-block;
          .post(a);
          right: 0;
          bottom: -2px;
        }
        .condition-list {
          // max-height:322px;
          overflow-y: auto;
        }
      }
    }
    .d3 {
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
        position: absolute;
        top: -3px;
        left: -2px;
        right: -2px;
        border-radius: 5px 5px 0 0;
        height: 44px;
        line-height: 44px;
        background-color: #c7d7eb;
        overflow: hidden;
        .tplx-title {
          font-size: 16px;
          color: #2698ed;
          margin-left: 16px;
          float: left;
        }
        .search-result {
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
          }
        }
        .title-span {
          font-size: 16px;
          color: #2698ed;
          // margin-left:20px;
        }
      }
      .add-modal {
        width: 377px;
        .post(a);
        right: 5px;
        top: 58px;
        z-index: 9999;
        background: -webkit-linear-gradient(left top, #11296d, #0c1837);
        .head {
          width: 100%;
          height: 46px;
          line-height: 46px;
          background-image: linear-gradient(
              180deg,
              rgba(10, 53, 167, 0.95) 0%,
              rgba(4, 33, 110, 0.95) 100%
            ),
            linear-gradient(#ffffff, #ffffff);
          background-blend-mode: normal, normal;
          border-bottom: 1px solid #163da8;
          overflow: hidden;
          .add-title {
            font-size: 16px;
            color: #fff;
            margin-left: 17px;
            float: left;
          }
          .close-add-modal {
            cursor: pointer;
            margin-right: 10px;
            float: right;
            height: 46px;
            line-height: 46px;
            display: inline-block;
            .iconfont {
              font-size: 20px;
              color: #fff;
            }
          }
        }
        .icon {
          width: 198px;
          height: 6px;
          position: absolute;
          z-index: 9999;
          bottom: 0;
          left: 50%;
          margin-left: -99px;
          border-width: 0 5px 6px 5px;
          border-style: none solid solid;
          border-color: transparent transparent #fff;
          //border-color:rgba(255,255,255,0.8);
        }
        .content {
          padding: 12px 13px 20px 16px;
          max-height: 300px;
          overflow-y: auto;
          position: relative;
          background: url(../../static/images/grid.png) 0 0 repeat;
          ul {
            margin-bottom: 20px;
            li.li {
              overflow: hidden;
              margin-bottom: 10px;
              .property-title {
                display: inline-block;
                width: 64px;
                color: #3a8bbf;
                float: left;
              }
              input {
                color: #5cb9ff;
                text-indent: 6px;
                width: 277px;
                height: 30px;
                line-height: 30px;
                outline: none;
                border: 1px solid #1f3b87;
                background: #061339;
              }
              label {
                color: #3a8bbf;
              }
            }
            .stzj {
              margin-bottom: 11px;
              textarea {
                width: 277px;
                height: 90px;
                border: 1px solid #1f3b87;
                background: #061339;
                outline: none;
                color: #5cb9ff;
                text-indent: 6px;
                resize: none;
              }
            }
            .stlx {
              input {
                height: 44px;
              }
            }
            .gxx {
              input {
                height: 44px;
              }
            }
          }
          .btn {
            width: 100%;
            height: 42px;
            overflow: hidden;
            span {
              width: 99px;
              line-height: 42px;
              height: 42px;
              text-align: center;
              float: right;
              color: #bce2ff;
              font-size: 14px;
              cursor: pointer;
              background: url(../../static/images/modal-btn.png) 0 0 no-repeat;
            }
            span:nth-child(1) {
              margin-left: 7px;
            }
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
        // .risk-level{
        //   width:285px;
        //   height:198px;
        //   .post(a);
        //   top:25px;
        //   right:30px;
        //   border:4px solid #4690d1;
        //   z-index:999;
        //   background: #c7eefe;
        //   .level{
        //     padding-left: 4%;
        //     height:35px;
        //     line-height: 35px;
        //     color:#636363;
        //     // margin-bottom: 25px;
        //     font-size: 16px;
        //     border-bottom: 2px solid #7197b1;
        //     color:rgba(99,99,99,1);
        //   }
        //   .tpmc{
        //     padding-left: 4%;
        //     font-size:14px;
        //     line-height:30px;
        //     overflow: hidden;
        //     margin-bottom: 4px;
        //     text-overflow: ellipsis;
        //     white-space: nowrap;
        //     color:rgba(0,154,237,1);
        //   }
        //   .circle{
        //     width:75px;
        //     height:75px;
        //     margin:12px 28px 0 15px;
        //     float:left;
        //     .ivu-chart-circle-inner{
        //       span{
        //         font-size: 14px;
        //       }
        //     }
        //   }
        //   .num-people{
        //     width:158px;
        //     height:124px;
        //     overflow-y: auto;
        //     float:left;
        //     p{
        //       font-size: 16px;
        //       font-weight: bold;
        //       color:#555555;
        //     }
        //     ul{
        //       height: 115px;
        //       li{
        //         width:50%;
        //         font-size: 14px;
        //         font-weight: bold;
        //         color:#555555;
        //         overflow:hidden;
        //         float: left;
        //         margin-bottom:8px;
        //         span:nth-child(1){
        //           display:inline-block;
        //           width: 22px;
        //           height: 22px;
        //           line-height: 22px;
        //           font-size: 12px;
        //           text-align: center;
        //           border-radius: 3px;
        //           color: #fff;
        //           margin-right:10px;
        //           font-weight:normal;
        //         }
        //         span:nth-child(2){
        //           color:rgba(85,85,85,1);
        //           font-size:14px;
        //         }
        //       }
        //     }
        //   }
        //   .num-people ul::-webkit-scrollbar{width:6px;height:6px;}
        //   .num-people ul::-webkit-scrollbar-track{border-radius:5px;background:none;}
        //   .num-people ul::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
        //   .num-people ul::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
        //   .num-people ul::-webkit-scrollbar-corner{background-color:#dadada;}
        // }
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
</style>

<style lang="less">
#visualition {
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
  left: 20px;
  border: 2px solid #ccc;
  display: block;
}
.arc {
  cursor: pointer;
}
g.more {
  display: block;
}
g.nomore {
  display: none;
}
</style>
