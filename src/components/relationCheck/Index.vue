<!--
 * @Author: your name
 * @Date: 2019-10-28 09:12:56
 * @LastEditTime: 2019-10-28 09:44:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\relationCheck\Index.vueonselectstart="return false;"
 -->
<template>
  <div class="relationCheck" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="关系挖掘" :showSearch="false"></app-header>
    <div class="content">
      <relationCheckHeader
        :mapTypeList="mapTypeList"
        :mapType="mapType"
        :filtrationMapType="filtrationMapType"
        :tmpData="tmpData"
        :searchBtnShow="searchBtnShow"
        ref="relationCheckHeader"
        :unmatched="unmatched"
      ></relationCheckHeader>
      <div class="contentCenter">
        <resultList
          v-if="resultListShow"
          ref="resultList"
          :result="result"
          :unmatchArr="unmatchArr"
          :tmpData="tmpData"
          :linksInfo="linksInfo"
        ></resultList>
        <!-- <div class="name">{{relationCheckName}}</div> -->
        <div id="hydra" class="hydra" style="width:100%;height:100%"></div>
        <!-- 线长比例 800 3000 5000 8000 :class="'i'+index"-->
        <div class="scale" v-if="allData.links != undefined">
          <div
            v-for="(item,index) in ratio"
            class="i"
            :key="index"
            :class="index==ratioIndex?'light':''"
            @click="changeRatio(item,index)"
          >{{item}}</div>
          <div class="add circle" @click="changescale('add')">+</div>
          <div class="sub circle" @click="changescale('sub')">-</div>
          <input
            type="range"
            max="8000"
            min="800"
            value="800"
            @change="rangeChange($event)"
            v-model="scale"
            :style="inputStyle"
          />
        </div>
      </div>
    </div>
    <!--档案信息  -->
    <transition name="personInforArea">
      <ArchivalInfor
        v-show="statusList.PersonInforShow"
        @listenToChild="hidePersonInfor"
        :tpInfo="tpInfo"
      ></ArchivalInfor>
    </transition>
    <!-- 模态框身份证搜索 @keyup.enter="ok" -->
    <Modal
      v-model="searchModal"
      :mask-closable="false"
      :loading="loading"
      width="80%"
      title="请输入身份证号"
      class="searchId"
    >
      <div class="screenInput">
        <div class="screenLeft">
          <span>图谱类型：</span>
          <CheckboxGroup label="图谱类型：" v-model="mapType" @on-change="handleMapType">
            <Checkbox
              :key="index"
              v-for="(item,index) in mapTypeList"
              :label="item.id"
              :style="{'background':item.backgroundColor,'color':item.color}"
            >{{item.shortName}}</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <Input
        class="searchInput"
        v-model="idNumberString"
        @blur="blurText()"
        type="textarea"
        :placeholder="placeholderInfo"
      />
      <!-- <textarea
        class="searchInput"
        v-model="idNumberString"
        :placeholder="placeholderInfo"
        spellcheck="false"
      ></textarea>-->
      <span class="searchSpan">
        已输入
        <i>{{idAmount}}</i>个身份证号
      </span>
      <div slot="footer" class="modalFooter">
        <button size="large" class="clear" @click="clear()">
          <i class="iconfont icon-qingkong"></i>清空
        </button>
        <Button type="info" size="large" class="search" @click="ok()">查询</Button>
        <Button type="info" size="large" class="cancel" @click="cancel()">取消</Button>
      </div>
    </Modal>
    <!-- loading -->
    <loading color="white" v-model="archivesLoadingShow"></loading>
    <!-- 高级查询模态窗 -->
    <D3FilterCondition
      v-model="filterConditionVisible"
      :params="filterConditionParams"
      metaTitle="关系挖掘"
    ></D3FilterCondition>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as d3 from "d3v4";
import { getModalMaxIndex, createRMenu } from "../../tools/units.js";
import appHeader from "@/components/assembly/AppHeader";
import resultList from "./components/resultList";
import relationCheckHeader from "./components/relationCheckHeader";
// import * as comApis from "@/api/common.js";
import { CASE_CODE,CLUB_CODE } from "@/api/config.js";
import * as apis from "@/api/collection/index.js";
import hydra from "../../../static/vendors/hydraCard.js";
import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
import Loading from "@/components/assembly/Loading";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
export default {
  components: {
    appHeader,
    resultList,
    relationCheckHeader,
    Loading,
    ArchivalInfor,
    D3FilterCondition
  },
  data() {
    //这里存放数据
    return {
      tpInfo: {},
      d3Data: {},
      statusList: {
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
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      },
      relationCheckName: "关系挖掘", //relationCheckName
      unmatched: 0, //未匹配到的数据
      searchModal: true, //模态框默认显示
      idAmount: 0, //身份证数量
      placeholderInfo:
        "身份证输入间隔支持：回车、逗号和分号。\n\n示例一：\n\n652801196312XXXXXX\n652801196312XXXXXX\n652801196312XXXXXX\n\n示例二：\n652801196312XXXXXX，652801196312XXXXXX，652801196312XXXXXX",
      idNumberString: "", //身份证
      hightlightSfzhm: "",
      unmatchArr: [],
      resultListShow: false, //展示右边展示信息
      result: "", //身份证为匹配信息或已查找信息
      notempty: [], //搜索的身份证号码
      tmpData: {}, //请求后的结果
      allData: {}, //请求后的结果
      relationCheckMapListVM: {}, //点击线传值
      linksInfo: {}, //点击线返回的值
      hydra: null,
      graph: null,
      opt: null,
      loading: false,
      searchBtnShow: false, //搜索框隐藏
      filterText: "", //搜索框内容
      filterMap: [], //图谱筛选条件
      nodeType: "",
      archivesLoadingShow: false,
      ratio: [800, 3000, 5000, 7000, 8000],
      ratioIndex: 0,
      scale: 800,
      filterConditionVisible: false,
      filterConditionParams: null,
      mapTypeList: [], //图谱类型
      mapType: [], //图谱类型
      filtrationMapType: [] //图谱展示传递过来的图谱类型
    };
  },
  created() {
    if (this.$route.query.query != undefined) {
      var data = JSON.parse(sessionStorage.getItem(this.$route.query.query));
      if (data == undefined) return;
      if (data.mapType != undefined) {
        this.filtrationMapType = data.mapType.split(",");
      }
      this.idNumberString = data.sfzhm;
      this.hightlightSfzhm = data.idNumber
      sessionStorage.removeItem(this.$route.query.query);
      this.ok();
    }
    /* if (this.$route.query.mapType != undefined) {
      this.filtrationMapType = this.$route.query.mapType.split(",");
    }
    if (this.$route.query.sfzhm != undefined) {
      this.idNumberString = this.$route.query.sfzhm;
      this.ok();
    } */
  },
  computed: {
    inputStyle: function() {
      let percent = (this.scale - 800) / 72;
      return (
        "background:linear-gradient(to right, #76b0f7, white " +
        percent +
        "%, white)"
      );
    }
  },
  mounted() {
    const me = this;
    me.getSearchData();
    me.initLevel();
  },
  watch: {
    result: {
      handler(val) {},
      immediate: true
    },
    tmpData: {
      handler(val) {},
      immediate: true,
      deep: true
    },
    unmatchArr: {
      handler(val) {},
      immediate: true,
      deep: true
    }
  },
  //方法集合
  methods: {
    // 图谱类型筛选
    handleMapType(val) {
      this.mapTypeList.map(x => {
        if (val.indexOf(x.id) == -1) {
          x.backgroundColor = "#fff";
          x.color = "#515a6e";
        } else {
          x.backgroundColor = this.$config.topTagColors[x.shortName];
          x.color = "#ffffff";
        }
      });
      // $config.topTagColors[item.shortName]
      let filterValues = this.mapTypeList
        .filter(x => val.indexOf(x.id) == -1)
        .map(x => x.id);
      this.filterMap = val;
      this.filterValues = filterValues;
      // this.filter();
      // console.log(this.mapType.join());
    },
    // 获取图谱类型
    getSearchData() {
      apis.GET_DRAW_TP_TYPE_LIST().then(res => {
        if (res.code == 200) {
          var result = res.data;
          this.mapTypeList = result;
          let data = res.data;
          data.forEach(x => {
            if (this.filtrationMapType.indexOf(x.id) == -1) {
              x.backgroundColor = this.$config.topTagColors[x.shortName];
              x.color = "#ffffff";
            } else {
              x.backgroundColor = "#fff";
              x.color = "#515a6e";
            }
          });
          this.mapType = data
            .filter(x => this.filtrationMapType.indexOf(x.id) == -1)
            .map(x => x.id);
          // filterValues 未选中的图谱类型
          // filterMap    选中的图谱类型
          this.filterValues = this.filtrationMapType;
          this.filterMap = this.mapType;
        } else {
          this.mapTypeList = [];
          this.mapType = [];
        }
      });
    },
    // 连线长度
    changescale(i) {
      if (i == "add") {
        if (this.ratioIndex < this.ratio.length - 1) {
          this.ratioIndex++;
        }
        this.scale = this.ratio[this.ratioIndex];
      } else {
        if (this.ratioIndex <= 0) {
          this.ratioIndex = 0;
        } else {
          this.ratioIndex--;
        }
        this.scale = this.ratio[this.ratioIndex];
      }
      this.graph.setForceDistance(this.scale);
    },
    rangeChange(e) {
      if (this.allData.links == undefined) return;
      if (this.scale > 900 && this.scale <= 3200) {
        this.ratioIndex = 1;
        this.scale = 3000;
      } else if (this.scale > 3200 && this.scale <= 5200) {
        this.ratioIndex = 2;
        this.scale = 5000;
      } else if (this.scale > 5200 && this.scale <= 7200) {
        this.ratioIndex = 3;
        this.scale = 7000;
      } else if (this.scale > 7200) {
        this.ratioIndex = 4;
        this.scale = 8000;
      } else {
        this.ratioIndex = 0;
        this.scale = 800;
      }
      this.graph.setForceDistance(this.scale);
    },
    // 已匹配未匹配人员数量提示信息

    /**
     * 隐藏个人信息面板
     * @function switchTrajectory
     * @author Erbing
     */
    hidePersonInfor(data) {
      this.statusList.PersonInforShow = data;
    },
    filter() {
      // this.filterMap
      const that = this;
      if (that.allData.links == undefined) return;
      // that.archivesLoadingShow = true;
      let dataAll = JSON.parse(JSON.stringify(that.allData));
      const links = dataAll.links;
      var tmpLinks = links.filter(data => {
        var filter = that.filterMap.some(f => {
          return f == data.mapType;
        });
        return filter;
      });
      that.$set(that.tmpData, "links", tmpLinks);
      that.resultListShow = false;
      that.result = "";
      that.getGraphData();
      // 高亮共同联系人卡片
      if(this.hightlightSfzhm) {
        let d3Data = this.graph.getData();
        let nodes = d3Data.nodes.filter(x => x.nodeType == "QB_ZP_RY");
        let arr = nodes.filter(x => {
          return (
            x.properties.SFZHM == this.hightlightSfzhm
          );
        });
        if (arr.length > 0) {
          let oids = arr.map(x => x.id);
          this.graph.editNodeColor(oids, "green");
        }
      }
    },
    // 搜索
    searchRelation() {
      if (this.filterText == null || this.filterText == "") return;
      let d3Data = this.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.nodeType == "QB_ZP_RY");
      // 清空选中
      if (nodes.length > 0) {
        this.graph.editNodeColor(nodes.map(x => x.id), "#d7d7d7");
      }
      let arr = nodes.filter(x => {
        return (
          x.properties.SFZHM == this.filterText ||
          x.properties.XM.indexOf(this.filterText) != -1
        );
      });
      if (arr.length > 0) {
        let oids = arr.map(x => x.id);
        this.graph.editNodeColor(oids, "green");
        // this.graph.centerSelection(arr, []);
        this.graph.highlightAndCenterSelection(arr, []);
      }
    },
    initLevel() {
      const that = this;
      that.hydra = hydra;
      that.opt = that.buildOpt();
      that.graph = that.hydra.graph(); //D3卡片展示
      that.graph.setOptions(that.opt);
      window.onresize = function() {
        let ch = document.documentElement.clientHeight;
        let cw = document.documentElement.clientWidth;
        console.log(cw);
        that.graph.setSize({
          //width : cw -504,
          //height : ch-115
          width: cw,
          height: ch - 125
        });
      };
    },
    blurText() {
      const that = this;
      var string = that.idNumberString;
      var newArray = [];
      that.notempty = [];
      string = string.replace(/[,，;；\n\r]/g, ",");
      string = string.replace(/\s/g, "");
      newArray = string.split(",");
      newArray = Array.from(new Set(newArray));
      newArray.map(arr => {
        if (arr !== "" && arr != undefined) {
          that.notempty.push(arr);
        }
      });
      // console.log(that.notempty);
      that.idAmount = that.notempty.length;
    },
    // 点击查找
    ok() {
      if (this.$refs.relationCheckHeader != undefined) {
        this.$refs.relationCheckHeader.idNumber = "";
      }
      this.blurText();
      //发送请求
      if (this.notempty.length >= 1) {
        this.toAxios();
      }
    },
    // changeRatio
    changeRatio(data, index) {
      if (this.allData.links == undefined) return;
      this.ratioIndex = index;
      this.scale = data;
      this.graph.setForceDistance(data);
    },

    // 请求
    toAxios() {
      const that = this;
      that.archivesLoadingShow = true;
      apis
        .POST_PERSON_RELATION(that.notempty)
        .then(res => {
          if (res.code == 200) {
            // console.log(res.data);
            if (
              res.data.unMatchIds.length == 0 &&
              res.data.matchedUserInfo.length == 0
            ) {
              that.idAmount = 0;
              that.$Message.info("没有相关身份证号的匹配信息！");
            } else {
              that.tmpData = res.data;
              that.allData = JSON.parse(JSON.stringify(res.data));
              // that.getGraphData();
              that.filter();
              that.searchBtnShow = true;
              that.searchModal = false;
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
            }
            that.loading = false;
          }
          that.archivesLoadingShow = false;
        })
        .catch(() => {
          that.loading = false;
          that.archivesLoadingShow = false;
        });
    },
    // 设置初始选项
    buildOpt() {
      const me = this;
      var width = document.getElementById("hydra").offsetWidth;
      var height = document.getElementById("hydra").offsetHeight || 800;
      let option = {
        selector: "#hydra",
        width: width,
        height: height,
        useForce: true,
        offsetTop: 115,
        type: "forceCard", //social,level,forceCard
        showToptag: true,
        showToptagMenu: true,
        isHideSuperpositionBtn: true,
        allowDrag: true,
        allowThumbnail: false,
        allowNodeDbclick: false,
        showFilterCondition: true,
        expandlist: ["del", "lock", "expand"],
        highlightText: "",
        node: {
          //节点的配置信息
          isEdit: false, //是否扩展编辑操作按钮,默认为false
          borderColor: "#d7d7d7",
          top: "",
          right: "添加",
          bottom: "",
          left: ""
        },
        tree: {
          treeW: 300,
          treeH: 200
        },
        bgclick() {
          return false;
        },
        topTagClickEvt: function(data) {
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
            const { href } = me.$router.resolve({
              name: "ArchivesJoin",
              query: {
                tpids: data.tpid,
                sfzhm: data.sfzhm,
                mc: "关系挖掘",
                pageName: ""
              }
            });
            window.open(href, "_blank");
          }
        },
        mouseoutEvt: function(data) {},
        linkClick: function(d, event) {
          // console.log("linkClick", d, event);
          me.linksInfo = d;
          me.relationCheckMapListVM = {
            mapType: d.mapType,
            userIdOne: d.source.id,
            userIdTwo: d.target.id
          };
          apis
            .POST_LINE_RELATION(me.relationCheckMapListVM)
            .then(res => {
              if (res.code == 200) {
                console.log(res);
                me.resultListShow = true;
                me.result = "one";
                me.unmatchArr = res.data;
              }
            })
            .catch(res => {
              console.log(res);
            });

          /* let tmpList = JSON.parse(JSON.stringify(d.mapList));
          tmpList.forEach(x => {
            x.linkShortName = d.linkShortName;
          });
          me.unmatchArr = tmpList; */
        },
        // linkDbClick: function(d, event) {
        //   console.log("linkDbClick", d, event);
        //   me.resultListShow = true;
        //   me.result = "one";
        //   me.unmatchArr = d.mapList;
        // },
        completed: function() {
          // me.archivesLoadingShow = false;
        },
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
        }
      };
      return option;
    },
    // 获取画布的数据
    getGraphData() {
      const me = this;
      // setTimeout(() => {
      let tmpData = me.tmpData;
      tmpData = this.parseForceCard(tmpData);
      me.initialize(tmpData);
      // }, 500);
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
            let d3Data = me.graph.getData();
            let nodes = d3Data.nodes.filter(x => x.nodeType == "QB_ZP_RY");
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
          createRMenu(
            "rMenu",
            data,
            { x: d3.event.pageX + 5, y: d3.event.pageY - 120 },
            e
          );
          me.d3Data = e;
        });
    },
    parseForceCard(data) {
      const that = this;
      data.nodes.forEach(x => {
        x.image = that.getImagePath(x.properties.picUrl);
      });
      return data;
    },
    cancel() {
      this.searchModal = false;
    },
    clear() {
      this.idNumberString = "";
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@import "css/graph.less";
.relationCheck {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  .content {
    position: absolute;
    left: 0;
    top: 68px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    height: calc(100% - 68px);
    .contentCenter {
      background: #f7f7f7;
      width: 100%;
      height: calc(100% - 57px);
      position: relative;
      .scale {
        position: absolute;
        top: 100px;
        left: -20px;
        width: 58px;
        height: 150px;
        cursor: pointer;
        .circle {
          height: 24px;
          width: 24px;
          line-height: 18px;
          border-radius: 50%;
          border: 2px solid #ccc;
          position: absolute;
          left: 52px;
          text-align: center;
          font-size: 24px;
          background: #fbf3f3;
        }
        .add {
          top: -59%;
        }
        .sub {
          top: 54%;
        }
        input[type="range"] {
          -webkit-appearance: none;
          transform: rotate(-90deg);
          outline: none;
          border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: 10px;
          border-radius: 10px; /*将轨道设为圆角的*/
          box-shadow: 0 1px 1px #def3f8, inset 0 2px 2px #4a4a4b; /*轨道内置阴影效果*/
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
          background: #ffffff;
          border-radius: 50%; /*外观设置为圆形*/
          border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
          box-shadow: 0 0.125em 0.125em #3b4547; /*添加底部阴影*/
        }

        .light {
          color: #0668c8;
        }
        .i {
          position: absolute;
          left: 80px;
          display: block;
          width: 50px;
          cursor: pointer;
        }
        .i:nth-child(5) {
          top: -42%;
        }
        .i:nth-child(4) {
          position: absolute;
          top: -28%;
        }
        .i:nth-child(3) {
          position: absolute;
          top: -8%;
        }
        .i:nth-child(2) {
          position: absolute;
          top: 12%;
        }
        .i:nth-child(1) {
          position: absolute;
          top: 38%;
        }
      }
      .name {
        position: absolute;
        top: 25px;
        left: 25px;
        color: #333333;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
/deep/.ivu-checkbox-group-item {
  font-size: inherit;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 13px;
}
/deep/.ivu-checkbox {
  display: none;
}
/deep/label.ivu-checkbox-wrapper.ivu-checkbox-group-item.ivu-checkbox-wrapper-checked.ivu-checkbox-default {
  background-color: #0668c8;
  color: #fff;
}
.search-result {
  font-size: 12px;
  color: #93989d;
  margin-bottom: 5px;
}
.action-list {
  position: relative;
  .archives-loading-bg {
    top: 64px !important;
    background: #fff !important;
  }
}
/deep/.ivu-checkbox + span {
  margin-right: 0;
}
// 身份证搜索
.searchId /deep/.ivu-modal {
  height: 80%;
  .ivu-modal-content {
    height: 100%;
    .ivu-modal-body {
      padding: 0 26px 26px 26px;
      height: calc(100% - 112px);
      .screenLeft {
        display: flex;
        align-items: center;
        padding: 11px 14px 11px 0;
      }
      .searchInput {
        width: 100%;
        height: calc(100% - 42px);
        margin-bottom: 2px;
        textarea {
          width: 100%;
          height: 100%;
          line-height: 20px;
          border-radius: 4px;
          color: rgba(51, 51, 51, 1);
          font-size: 14px;
          box-shadow: 0px 0px 0px 0px rgba(32, 29, 29, 1);
          border: 1px solid rgba(204, 204, 204, 1);
          padding: 8px;
          resize: none;
        }
      }
      span.searchSpan {
        font-size: 12px;
        i {
          color: #0668c8;
          font-style: normal;
        }
      }
    }
    .ivu-modal-footer {
      button.clear {
        float: left;
        color: #515a6e;
        background-color: #ffffff;
        padding: 6px 15px 6px 15px;
        font-size: 14px;
        border-radius: 4px;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        border: 1px solid #cccccc;
        outline: none;
        i {
          color: #0668c8;
        }
      }
    }
  }
}
/deep/.link-active {
  stroke: rgb(34, 150, 255);
  stroke-width: 3px;
}
/deep/.link-text-active text,
/deep/.link-text-active tspan {
  fill: rgb(34, 150, 255);
}
/deep/.ivu-modal .cancel.ivu-btn.ivu-btn-info.ivu-btn-large {
  color: #515a6e;
  background-color: #ffffff;
  border-color: #cccccc;
}
/deep/ .titleBox {
  z-index: 999;
  background: #fff;
  box-shadow: #ccc 0px 0px 8px;
  padding: 5px;
  font-size: 16px;
}
/deep/ .hydra {
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
  }
}
.ivu-notice .ivu-notice-content-with-icon {
  span {
    font-size: 14px;
  }
}
.personInforArea-enter-active,
.personInforArea-leave-active {
  transition: all 0.5s;
}
.personInforArea-enter,
.personInforArea-leave-active {
  transform: translate3d(535px, 0, 0);
}
</style>
