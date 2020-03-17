<template>
  <!-- 区域串并页面 -->
  <div class="areaJoin-container m-container" @click="handleWrapperClick($event)">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" :title="title" :showSearch="false"></app-header>
    <!-- D3控件区域 -->
    <div class="result-cont">
      <div id="d3Circle" ref="d3Circle" class="d3">
        <div class="title">
          <span class="search-result">{{'用时 ' + fetchDetail.executeTime + ' 秒'}}</span>
          <span title="展开\关闭" class="count-result-panel">
            <i @click="showMapOverview = !showMapOverview" class="iconfont icon-zairumoban"></i>
          </span>
        </div>
        <div class="graphical" ref="graphical" v-show="statusList.d3Show">
          <!-- 图谱概述 -->
          <map-overview :tagsList="tagsList" v-model="showMapOverview" @on-select-areas="handleSelectArea"></map-overview>
          <!-- 画布按钮 -->
          <!-- <div class="func-btn-group">
            <div class="group-left">
              <ul>
                <li>
                  <i class="iconfont icon-baocun" @click="restart" title="生成谱系档案"></i>
                </li>
                <li>
                  <i class="iconfont icon-pingmukuaizhao" title="快照"></i>
                </li>
                <li>
                  <i class="iconfont icon-shuaxin" title="刷新"></i>
                </li>
                <li></li>
              </ul>
            </div>
          </div> -->
          <!-- d3图形展示 -->
          <div v-show="statusList.d3Show" id="hydraCircle" width="1300" height="800"></div>
          <!-- 加载loading -->
          <!-- <d-load v-model="statusList.d3Loading"></d-load> -->
          <loading color="white" content="图形加载中..." v-model="statusList.d3Loading"></loading>
        </div>
      </div>
    </div>
    <filterRelations v-model="showFilterRelationDialog" :postData="currentLinkArea"></filterRelations>
  </div>
</template>
<script>
import moment from 'moment';
import * as d3 from "d3v4";
import appHeader from "@/components/assembly/AppHeader";
import mapOverview from "./components/mapOverview";
import * as apis from "@/api/areaJoin/index.js";
import * as comApis from "@/api/common.js";
import { hasQuery } from "../../tools/units.js";
import { areaJoinMixin } from "./mixin/areaJoinMixin";
import hydraCircle from "./js/force";
// import DLoad from '@/components/assembly/D3Load'
import Loading from '@/components/assembly/Loading'
export default {
  name: "AreaJoin",
  components: {
    appHeader,
    filterRelations: () => import("./components/filterRelations"),
    mapOverview,
    // DLoad
    Loading
  },
  mixins: [areaJoinMixin],
  data() {
    return {
      title: "区域串并",
      hydraCircle: "", //D3卡片展示
      showMapOverview: true,
      showFilterRelationDialog: false,
      tagsList: [],
      fetchDetail: {
        executeTime: 0
      },
      currentSelectArea: [],
      currentLinkArea: [],
      isFirst: false,
      forceData:null
    };
  },
  created() {
    this.hydraCircle = hydraCircle; //D3卡片展示
    this.init();
  },
  methods: {
    // restart(){
    //   let me  = this;
    //   me.statusList.d3Loading = true;
    //   me.hydraCircle.restart();
    // },
    init() {
      let me  = this,visibilityChange;
      if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        visibilityChange = "visibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        visibilityChange = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        visibilityChange = "webkitvisibilitychange";
      } 
      document.addEventListener(visibilityChange, function() { 
        var isHidden = document.hidden || document.msHidden || document.webkitHidden; 
        if (isHidden) { 
          // 动画视频暂停 
        } else { 
          // 动画视频开始 
          if(!me.hydraCircle.isSettled() && me.forceData && Object.keys(me.forceData).length > 0){
            me.statusList.d3Loading = true;
            me.hydraCircle.restart();
          }
        } 
      });
      this.getTypes();
    },
    // 选择区域的事件
    handleSelectArea(areaList) {
      this.isFirst = true;
      this.currentSelectArea = areaList.map(x => {
        let tagsList = x.tagsList.filter(x=>x.selected)
        return {
          deptCode: x.id,
          deptName: x.title,
          mapType: tagsList.map(y => y.mapType).join()
        };
      });
      this.initForce();
    },
    handleClear() {
      document.getElementById("hydraCircle").innerHTML = ""; //清空D3图形化
    },
    // 获取标签的数据
    getTypes() {
      comApis.getMapRegionType().then(res => {
        if (res.code != 200) return;
        this.tagsList = res.data;
      });
    },
    // 获取地区之前共同联系人的力导向图的数据,加载力导向图的数据
    initForce() {
      let me = this;
      this.statusList.d3Loading = true;
      let ch = this.$refs.graphical.clientHeight;
      let cw = this.$refs.graphical.clientWidth;
      me.getCommonPersonForce().then(res => {
        me.handleClear();
        let data = genderData(me, res.data);
        me.forceData = data;
        let option = this.buildOption();
        me.hydraCircle.setOptions(option);
        me.hydraCircle.init(data);
        setTimeout(()=>{
          me.statusList.d3Loading = false;
        },500)        
        me.isFirst = false;
      });
    },
    buildOption() {
      let me = this;
      let ch = this.$refs.graphical.clientHeight;
      let cw = this.$refs.graphical.clientWidth;
      let option = {
        width: cw,
        height: ch,
        tagList: me.tagsList,
        nodeClick: function(d, event) {
        },
        // 标签点击事件
        tagClick: function(d, event, nodes) {
          me.currentSelectArea.forEach(x => {
            if (x.deptCode == d.nodeId) {
              if (d.disabled) {
                if (x.mapType) {
                  let types = x.mapType.split(",");
                  types = types.filter(y => y != d.key);
                  x.mapType = types.join();
                } else {
                  x.mapType = me.tagsList
                    .filter(y => {
                      return y.mapType != d.key;
                    })
                    .map(y => y.mapType)
                    .join();
                }
              } else {
                let types = x.mapType ? x.mapType.split(",") : [];
                types.push(d.key);
                x.mapType =
                  types.length == me.tagsList.length
                    ? me.tagsList.map(y => y.mapType).join()
                    : types.join();
              }
            }
          });
          me.initForce();
        },
        // 双击事件，打开串并关系模态框
        linkDbClick: function(d, event) {
          let tmp = [];
          tmp.push(
            {
              deptCode: d.source.id,
              deptName: d.source.name,
              mapType: d.source.tags.filter(x=>!x.disabled).map(x => x.mapType).join()
            },
            {
              deptCode: d.target.id,
              deptName: d.target.name,
              mapType: d.target.tags.filter(x=>!x.disabled).map(x => x.mapType).join()
            }
          );
          me.currentLinkArea = tmp;
          me.showFilterRelationDialog = true;
        },
        completed: function() {
          console.log("completed")
          me.statusList.d3Loading = false;
          // me.statusList.d3Loading = false;
        }
      };
      return option;
    },
    getCommonPersonForce() {
      var m1 = moment();
      const me = this;
      var promise = new Promise((resolve, reject) => {
        apis
          .getCommonPersonForce(me.currentSelectArea)
          .then(res => {            
            var m2 = moment();
            me.fetchDetail.executeTime = m2.diff(m1, 'seconds', true)
            if (res.code != 200) return;
            resolve(res);
          })
          .catch(res => {
            reject(res);
          });
      }).catch((e) => {});
      return promise;
    }
  }
};
// 整合数据
function genderData(vueObj, datas) {
  let data = {};
  data.nodes = datas.nodes.map(node => {
    let tagList = [];
    vueObj.currentSelectArea
      .filter(tg => tg.deptCode == node.id)
      .forEach(tg => {
        if (vueObj.isFirst) {
          let tmpArr = tg.mapType.split(',')
          let tmpMapTypes = node.properties.containsLabel.filter(x=>{            
            return tmpArr.indexOf(x.mapType.toString()) != -1
          }).map(x => x.mapType).join();
          tg.mapType = tmpMapTypes
        }
        let tags = tg.mapType.split(",");
        if (!tg.mapType) {
          node.properties.containsLabel.forEach(x => (x.disabled = true));
          tagList = node.properties.containsLabel;
        } else {
          node.properties.containsLabel.forEach(x => {
            if (tags.indexOf(x.mapType.toString()) != -1) {
              x.disabled = false;
            } else {
              x.disabled = true;
            }
          });
          tagList = node.properties.containsLabel;
        }
      });
    return {
      id: node.id,
      name: node.properties.deptName,
      color: "#2195D7",
      icon: "",
      tags: tagList
    };
  });
  data.links = datas.links.map(link => {
    return {
      id: link.id,
      source: link.source,
      target: link.target,
      label: link.properties.count.toString()
    };
  });
  return data;
}
</script>
<style lang="less" scoped>
@import "./css/style.less";
</style>
<style lang="less">
@import "./css/svg.less";
.links .link-active {
  stroke: #009aed;
  stroke-width: 3px;
}
.link-active text {
  fill: #009aed;
  font-size: 16px;
  font-weight: 600;
}
// .nodes circle {
//   pointer-events: all;
//   stroke: none;
//   stroke-width: 40px;
// }
</style>