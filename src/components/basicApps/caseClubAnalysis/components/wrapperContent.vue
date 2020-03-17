<template>
  <div class="d3GraphContainer">
    <scale
      ref="scale"
      v-if="graphResponseData && graphResponseData.nodes.length > 0"
      class="scale"
      v-model="scale"
      :ratio="ratio"
      @on-change="handleDistanceChange"
    ></scale>
    <div id="hydra" class="d3Graph"></div>
  </div>
</template>
<script>
import * as d3 from "d3v4";
import {
  getModalMaxIndex,
  createRMenu,
  topTagClickFn,
  caseClueFn,
  hasQuery
} from "../../../../tools/units.js";
import hydra from "../../../../../static/vendors/hydraCard.js";
import Scale from "./scale";
import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
import {
  GET_CASECLUB_JOIN_NANALYSIS,
  GET_CASECLUB_JOIN_PERSONS
} from "@/api/collection/index.js";
export default {
  name: "zGraph",
  components: {
    Scale
  },
  data() {
    return {
      hydra: hydra,
      opt: null,
      graph: null,
      filterConditionVisible: false,
      filterConditionParams: null,
      currentNode: null,
      graphResponseData: null,
      tmpData: null,
      scale: 600,
      ratio: [600, 3000, 5000, 7000, 8000],
      currentSelectNode: null
    };
  },
  methods: {
    // 图谱类型筛选
    typeFilter(arr) {
      const that = this;
      if (!(arr && arr.length)) {
        arr = this.$parent.$parent.$refs.wHeader.typeValue;
      }
      if (that.graphResponseData.nodes == undefined) return;
      let dataAll = JSON.parse(JSON.stringify(that.graphResponseData));
      const nodes = dataAll.nodes;
      var tmpNodes = nodes.filter(data => {
        return arr.indexOf(data.nodeType) != -1;
      });
      let noArr = this.$parent.$parent.$refs.wHeader.typeList.filter(
        x => arr.indexOf(x.id) == -1
      );
      let noArrIds = noArr.map(x => x.id);
      let noSelectedNodes = nodes.filter(data => {
        return noArrIds.indexOf(data.nodeType) != -1;
      });
      var tmpNodeIds = noSelectedNodes.map(node => node.id);
      var tmpLinks = [];
      if (tmpNodeIds.length > 0) {
        tmpLinks = dataAll.links.filter(link => {
          return !(
            tmpNodeIds.indexOf(link.source) != -1 ||
            tmpNodeIds.indexOf(link.target) != -1
          );
        });
      } else {
        tmpLinks = dataAll.links;
      }
      that.$set(that.tmpData, "nodes", tmpNodes);
      that.$set(that.tmpData, "links", tmpLinks);
      that.getGraphData();
      console.log("tmpData", that.tmpData);
    },
    // 关键字查询方法(案件线索名称、类型、单位)
    keywordFilter(keyword) {
      if (keyword == null || keyword == "") return;
      let d3Data = this.graph.getData();
      let nodes = d3Data.nodes;
      // 清空选中
      if (nodes.length > 0) {
        this.graph.editNodeColor(nodes.map(x => x.id), "");
      }
      let arr = nodes.filter(x => {
        return (
          hasQuery(x.nodeType, keyword) ||
          (x.properties && hasQuery(x.properties.name, keyword)) ||
          (x.properties && hasQuery(x.properties.linkUserId, keyword)) ||
          (x.properties && hasQuery(x.properties.deptName, keyword))
        );
      });
      console.log(arr,keyword);

      if (arr.length > 0 && keyword) {
        let oids = arr.map(x => x.id);
        this.graph.editNodeColor(oids, "green");
        this.graph.highlightAndCenterSelection(arr, []);
      } else {
        this.graph.highlightAndCenterSelection(arr, []);
      }
    },
    // 初始化
    initRender() {
      this.hydra = hydra;
      this.opt = this.buildOpt();
      this.graph = this.hydra.graph(); //D3卡片展示
      this.graph.setOptions(this.opt);
      window.addEventListener("resize", this.resizeHandler);
    },
    // 初始化根据身份证号获取图形数据
    initMapData(params) {
      let that = this;
      GET_CASECLUB_JOIN_NANALYSIS(params)
        .then(res => {
          this.$parent.$parent.graphLoading = false;
          if (res.code == 200) {
            let data = res.data;
            if (
              data.matchedUserInfo.length <= 0 &&
              data.unMatchIds.length <= 0
            ) {
              this.$parent.$parent.searchResult.idNumberTotals = 0;
              this.$Message.info("没有相关身份证号的匹配信息！");
              return;
            }
            this.$parent.$parent.searchModal = false;
            this.graphResponseData = JSON.parse(JSON.stringify(data));
            this.$parent.$parent.searchResult.idNumberTotals =
              data.matchedUserInfo.length + data.unMatchIds.length;
            this.tmpData = data;
            this.typeFilter();
            // 加载通知消息
            this._getNotice();
          } else {
            this.$Message.error(res.msg);
          }          
        })
        .catch(res => {
          this.$parent.$parent.graphLoading = false;
        });
    },
    buildOpt() {
      const me = this;
      var width = document.getElementById("hydra").offsetWidth;
      var height = document.documentElement.clientHeight - 130;
      let option = {
        selector: "#hydra",
        width: width,
        height: height,
        useForce: true,
        offsetTop: 115,
        type: "forceCircle", //social,level,forceCard
        showToptag: true,
        showToptagMenu: true,
        isHideSuperpositionBtn: true,
        allowMulituple: true,
        allowDrag: true,
        allowThumbnail: false,
        allowNodeDbclick: false,
        showFilterCondition: true,
        // 单击节点
        selectNode: function(data) {
          console.log("selectNode", data);
          if (data.length > 1) {
            me.$parent.$parent.currentNodeType = "l";
          } else {
            me.$parent.$parent.currentNodeType = "c";
          }
          me.currentSelectNode = data;
          let params = data.map(x => x.id);
          me._getSelectPersonList(params);
        },
        // 单击连线
        linkClick: function(d, event) {
          console.log("linkClick", d, event);
          me.$parent.$parent.currentNodeType = "l";
          me.currentSelectNode = [d.source, d.target];
          let params = [d.source.id, d.target.id];
          me._getSelectPersonList(params);
        }
      };
      return option;
    },
    getGraphData() {
      const me = this;
      let tmpData = me.tmpData;
      tmpData = this.parseForceCard(tmpData);
      // debugger;
      me.initialize(tmpData);
    },
    // 初始化画布的数据
    initialize(data) {
      document.getElementById("hydra").innerHTML = "";
      const me = this;
      this.graph.init();
      this.graph.load(data);
      this.initMenu();
    },
    initMenu() {
      var me = this;
      var data = [
        {
          text: "查看档案",
          url: "",
          method: function(event) {
            // let d3Data = me.graph.getData();
            // let nodes = d3Data.nodes.filter(x => x.nodeType == "QB_ZP_RY");
            // me.statusList.PersonInforShow = true;
            // me.tpInfo = me.d3Data;
          }
        }
      ];
      d3.select(".nodes")
        .selectAll('g[type="node"]')
        .on("contextmenu", function(e) {
          d3.event.preventDefault();
          d3.event.stopPropagation();          
        });
    },
    parseForceCard(data) {
      const that = this;
      data.nodes.forEach(x => {
        x.properties.mapName = x.properties.name;
        x.properties.personCount = x.properties.count;
        x.properties.totalPersonCount = x.properties.total;
        x.properties.nodePathText = x.nodeType;
        x.properties.circleFill =
          x.nodeType == "案件" ? "rgb(215, 67, 72)" : "rgb(66, 100, 215)";
        x.properties.circleStroke =
          x.nodeType == "案件" ? "rgb(215, 67, 72)" : "rgb(66, 100, 215)";
        x.properties.circleTextFill = "#ffffff";
      });
      return data;
    },
    resizeHandler(height = 125) {
      this.$nextTick(() => {
        let ch = document.documentElement.clientHeight;
        let cw = document.documentElement.clientWidth;
        this.graph.setSize({
          width: cw,
          height: ch - height
        });
      });
    },
    _getNotice() {
      let that = this;
      that.$Notice.config({
        top: 130,
        duration: 10
      });
      that.$Notice.info({
        title: "身份证查询结果",
        render: h => {
          return h(
            "span",
            {
              style: {
                fontSize: "14px",
                color: "#000000"
              }
            },
            [
              "已匹配身份证数",
              h(
                "a",
                {
                  style: {
                    color: "#0068b7",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }
                },
                that.tmpData.matchedUserInfo.length
              ),
              ",未匹配身份证",
              h(
                "a",
                {
                  style: {
                    color: "#0068b7",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }
                },
                that.tmpData.unMatchIds.length
              )
            ]
          );
        }
      });
    },
    _getSelectPersonList(params) {
      GET_CASECLUB_JOIN_PERSONS(params).then(res => {
        if (res.code == 200) {
          this.$parent.$parent.drawerVisible = true;
          this.$parent.$parent.searchResult.matchList = res.data;
          this.$parent.$parent.searchResult.nodeList = this.currentSelectNode;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 改变力导向连线的距离
    handleDistanceChange(distance) {
      this.graph.setForceDistance(distance);
    }
  },
  mounted() {},
  beforeDestory() {
    window.addEventListener("resize", null);
  }
};
</script>
<style lang="less" scoped>
.d3GraphContainer {
  background: #f7f7f7;
  width: 100%;
  height: calc(100% - 57px);
  position: relative;
  .d3Graph {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .scale {
    z-index: 9;
  }
  /deep/.link-active {
    stroke: rgb(34, 150, 255);
    stroke-width: 3px;
  }
  /deep/.link-text-active text,
  /deep/.link-text-active tspan {
    fill: rgb(34, 150, 255);
  }
}
</style>