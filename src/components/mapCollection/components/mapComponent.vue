<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 18:04:06
 * @LastEditTime: 2019-09-29 16:07:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mapComponentBig" :idName="idName" :zoom="zoom" :jsonName="jsonName">
    <div :id="idName" class="allmap"></div>
    <!-- 图例关 -->
    <div class="legend" v-show="!legend" v-if="legendShow">
      <span class="left">图例</span>
      <span class="right" @click="openLegend()">
        展开
        <i class="iconfont icon-fold"></i>
      </span>
    </div>
    <!-- 图例开 -->
    <div class="openLegend" v-show="legend" v-if="legendShow">
      <div class="legendTitle">
        <span class="left">图例</span>
        <span class="right" @click="closeLegend()">
          收起
          <i class="iconfont icon-unfold"></i>
        </span>
      </div>
      <div class="legendContent">
        <div class="contentCenter">
          <div class="integral">积分</div>
          <div class="dengji">区域预警等级</div>
          <div class="miniPieChart">
            <div class="miniName">迷你饼图</div>
            <canvas class="pieChart" id="mini"></canvas>
          </div>

          <div class="level">
            <div
              class="l1"
              :style="'background:'+item.color"
              v-for="(item,index) in colorArr"
              :key="index"
            >
              <i>人数</i>
              <em v-if="!legendInfo">{{item.name}}</em>
              <em v-else>{{item.colorName}}</em>
              <span>{{item.jifen}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import mapLists from "../../../../static/vendors/baiduMap/mapInit.js";
import * as comApis from "@/api/collection/index.js";
export default {
  name: "mapComponent",
  props: {
    idName: {
      type: String,
      default: "allmap"
    },
    center: {
      type: Object,
      default: () => {
        return { lng: 80.957398, lat: 40.875185 };
      }
    },
    zoom: {
      type: Number,
      default: 8
    },
    jsonName: {
      type: String,
      default: "aks"
    },
    mapDistributionData: {
      type: Array,
      default: null
    },
    areaSummary: {
      type: Object,
      default: null
    },
    childShowInfo: {
      type: Boolean,
      default: false
    },
    damage: {
      type: Boolean,
      default: false
    },
    profileName: {
      type: String,
      default: "profile"
    },
    legendShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    //这里存放数据
    return {
      map: null, //初始化地图map数据
      features: {}, //县区边界

      colorArr: [
        { color: "#ef271d", jifen: "4分/人", name: "暴", colorName: "红" },
        { color: "#ed8f21", jifen: "3分/人", name: "伊", colorName: "橙" },
        { color: "#e4d52b", jifen: "2分/人", name: "宗", colorName: "黄" },
        { color: "#184af0", jifen: "1分/人", name: "防/个", colorName: "蓝" }
      ], //图例部分信息
      legend: false, //图例是否显示
      legendInfo: false
    };
  },
  watch: {
    childShowInfo: {
      handler(newName) {
        if (newName) {
          this.getAreaPoint();
          this.changeOver();
        }
      },
      immediate: true,
      deep: true
    },
    damage: {
      handler(newName, oldName) {
        if (newName != oldName) {
          this.changeOver();
        }
      },
      immediate: true,
      deep: true
    },
    areaSummary: {
      handler(val) {},
      immediate: true,
      deep: true
    }
  },
  mounted() {
    var me = this;
    me.map = mapLists.initialize(
      me.idName,
      me.center.lng,
      me.center.lat,
      me.zoom
    ); //设置地图id,中心点lng,lat,地图缩放等级
    if (this.jsonName != "") {
      me.getAreaPoint();
    }
    me.legendInfo = window.location.href.includes("entryExit");
    me.openLegend();
  },

  //方法集合
  methods: {
    // -- 加载县区边界坐标--
    getAreaPoint() {
      // 加载地区的边界
      this.$axios
        .get("./static/vendors/baiduMap/" + this.jsonName + ".json")
        .then(response => {
          this.features = response.features;
          this.drawBorder();
        })
        .catch(response => {
          console.log(response);
        });
    },
    // 获取json信息绘制边界
    // ---绘制---
    drawBorder() {
      const newData = [];
      const items = [];
      let level = 0;
      this.features.forEach(f => {
        let item = {};
        let coordinates = [];
        // 添加level，坐标
        this.treeTransArray(f.geometry.coordinates, coordinates, f.properties);
        let tmp = coordinates.map(x => x.level);
        let uniuqeArr = Array.from(new Set([...tmp]));
        uniuqeArr.forEach(level => {
          let tmpArr = coordinates
            .filter(x => {
              return x.level == level;
            })
            .map(point => {
              return point.data;
            });
          items.push(tmpArr);
          // 绘制边界函数
          this.getPointArrToDraw(tmpArr);
        });
      });
    },
    // --遍历绘制点--
    treeTransArray(data, coordinates, properties, level = 0) {
      return data.reduce((con, item) => {
        if (
          item.length == 2 &&
          !Array.isArray(item[0]) &&
          !Array.isArray(item[1])
        ) {
          con.push({
            data: new BMap.Point(item[0], item[1]),
            properties: properties,
            level: level
          });
        } else {
          level++;
          this.treeTransArray(item, coordinates, properties, level);
        }
        return con;
      }, coordinates);
    },
    // --通过绘制点point获取多边形Polygon--
    getPointArrToDraw(tmpArr) {
      // 绘制边界
      let PolygonArr = new BMap.Polygon(tmpArr, mapLists.style());
      this.map.addOverlay(PolygonArr);
      PolygonArr.addEventListener("click", function(e) {
        console.log(e);
        PolygonArr.setFillColor("red");
      });
      PolygonArr.addEventListener("click", function(e) {
        console.log(e);
        PolygonArr.setFillColor("none");
      });
    },
    // --切换页面，地图等级--
    changeOver() {
      if (this.areaSummary.area == undefined) return;
      let areaLevel = this.areaSummary.area.areaLevel;
      let lng = this.areaSummary.area.longitude;
      let lat = this.areaSummary.area.latitude;

      if (areaLevel == "village" || areaLevel == "village") {
        this.map.centerAndZoom(new BMap.Point(lng, lat), 15);
      } else if (areaLevel == "town" || areaLevel == "township") {
        this.map.centerAndZoom(new BMap.Point(lng, lat), 10);
      }
      this.infoShow();
      this.map.addEventListener("click", this.returnToAreaCode);
    },
    // --向父组件传值，areaCode用于切换右边信息展示--
    returnToAreaCode(e) {
      let code = "";
      if (e.fb != null && e.fb.V.className == "BMapLabel") {
        // 点击label
        code = e.fb.areaCode;
      } else {
        // 点击地图
        code = this.areaSummary.area.areaCode;
        // console.log('11',this.areaSummary.area.areaCode,e)
      }
      this.$emit("childToParent", code);
    },
    // --展示窗口--
    infoShow() {
      const that = this;
      // 清空Marker
      let labels = document.querySelectorAll(".BMapLabel");
      // 使用原生写法、chrome低版本不兼容forEach
      for (var i = 0; i < labels.length; i++) {
        var dom = labels[i];
        dom.parentNode.removeChild(dom);
      }
      /* labels.forEach(x => {
        x.parentNode.removeChild(x);
      }); */
      for (let i = 0; i < that.mapDistributionData.length; i++) {
        let toStringFirst = "";
        let areaCode = that.mapDistributionData[i].areaCode;
        let lng = that.mapDistributionData[i].longitude;
        let lat = that.mapDistributionData[i].latitude;
        let name = that.legendInfo ? "EntryExit" : "Profile";
        const { href } = this.$router.resolve({
          name: name,
          query: {
            areaCode: areaCode
          }
        });
        // window.open(href, '_blank');
        // 横向排
        let divMove = "";
        if (that.damage) {
          divMove = mapLists.divMove(
            that.mapDistributionData[i].damageAreaWarningInfo,
            i,
            that.mapDistributionData[i].personTotals,
            that.mapDistributionData[i].areaName,
            that.mapDistributionData[i].damageAreaColor,
            that.mapDistributionData[i].damageScoreTotal
          );
        } else {
          divMove = mapLists.divMove(
            that.mapDistributionData[i].areaWarningInfo,
            i,
            that.mapDistributionData[i].personTotals,
            that.mapDistributionData[i].areaName,
            that.mapDistributionData[i].areaColor,
            that.mapDistributionData[i].scoreTotal
          );
        }
        if (that.areaSummary.area.areaLevel == "village") {
          toStringFirst =
            '<div class="huang" onmouseover="rectMouseover(this)" onmouseout="rectMouseout(this)" id="c' +
            i +
            '" >' +
            divMove +
            "</div>"; //ondblclick="openALink('+"'"+areaCode+"'"+')"
        } else {
          toStringFirst =
            '<div class="huang" onmouseover="rectMouseover(this)" onmouseout="rectMouseout(this)" id="c' +
            i +
            '" ondblclick="window.open(' +
            "'" +
            href +
            "'" +
            ')">' +
            divMove +
            "</div>";
          // console.log(toStringFirst);
        }
        var point = new BMap.Point(lng, lat);
        var marker = new BMap.Marker(point); // 创建标注

        // dragend拖拽结束后触发事件
        // marker.enableDragging();
        // marker.addEventListener('dragend',markerDragendAfter)
        that.map.addOverlay(marker);
        var label = new BMap.Label(
          toStringFirst,
          mapLists.opts(new BMap.Point(lng, lat), -95, -58)
        );
        label.setStyle({
          fontSize: "12px",
          color: "white",
          backgroundColor: "none",
          border: "none"
        });
        label.areaCode = areaCode;
        if (that.areaSummary.area.areaLevel == "village") {
          label.addEventListener("dblclick", that.openALink);
        }

        // x向地图添加标注
        that.map.addOverlay(label);
        console.log("label", label);
      }
      /* that.$nextTick(() => {
        that.addEvent();
      }); */
    },
    addEvent() {
      const that = this;
      // console.log(2);
      for (let i = 0; i < that.mapDistributionData.length; i++) {
        // 出入境
        if (that.damage) {
          mapLists.divMove(
            that.mapDistributionData[i].damageAreaWarningInfo,
            i,
            that.mapDistributionData[i].personTotals,
            that.mapDistributionData[i].areaName,
            that.mapDistributionData[i].damageAreaColor,
            that.mapDistributionData[i].damageScoreTotal
          );
        } else {
          mapLists.divMove(
            that.mapDistributionData[i].areaWarningInfo,
            i,
            that.mapDistributionData[i].personTotals,
            that.mapDistributionData[i].areaName,
            that.mapDistributionData[i].areaColor,
            that.mapDistributionData[i].scoreTotal
          );
        }
      }
    },
    openALink(e) {
      console.log(e.target.areaCode);
      var path = "";
      var query = {};
      if (!this.legendInfo) {
        // 被打击
        path = "/underAttack";
      } else {
        // 出入境
        path = "/exitAndEntry";
      }
      comApis.getDrawState(e.target.areaCode).then(res => {
        if (res.code == 200) {
          if (res.data.mapInfo.collectId != null && !this.legendInfo) {
            query = {
              collectId: res.data.mapInfo.collectId,
              areaCode: e.target.areaCode,
              state: 1
            };
            let route = this.$router.resolve({
              path: path,
              query: query
            });
            window.open(route.href, "_blank");
          } else if (
            res.data.outBoundMapInfo.collectId != null &&
            this.legendInfo
          ) {
            query = {
              collectId: res.data.outBoundMapInfo.collectId,
              areaCode: e.target.areaCode,
              state: 1
            };
            let route = this.$router.resolve({
              path: path,
              query: query
            });
            window.open(route.href, "_blank");
          } else {
            this.$Message.info("该村图谱未创建！");
          }
        }
      });
      /* var path = '/collectMarkerProfile';
      var query = {};
      comApis.getDrawState(code).then(res=>{
        if(res.code == 200){
          if(res.data.mapInfo!=null&&!isEntryExit){
            path = '/collectMarkerProfile';
            query = {
              collectId: res.data.mapInfo.collectId,
              areaCode: code,
              state: 1
            }
            let route = path+'?collectId= '+res.data.mapInfo.collectId+'&areaCode='+code+'&state=1';

            window.open(route,'_blank')
          };

        }
      }) */
    },
    // 关闭图例
    closeLegend() {
      this.legend = !this.legend;
    },
    //打开图例
    openLegend() {
      this.legend = !this.legend;
      this.mini();
    },
    // 迷你饼图
    mini() {
      const that = this;
      const mini = document.getElementById("mini");
      const ctx = mini.getContext("2d");
      // 设置画布宽高
      mini.width = 48;
      mini.height = 48;
      //定义起始角度
      var tempAngle = -90;
      //定圆心位置
      var x0 = 24,
        y0 = 24;
      //定半径长度
      var radius = 24;
      // 绘制扇形和小方块
      const infoB = [6, 15, 10, 69];
      for (let x = 0; x < infoB.length; x++) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        //当前扇形角度
        const angle = (infoB[x] / 100) * 360;
        //当前扇形起始绘制弧度
        const startAngle = (tempAngle * Math.PI) / 180;
        //当前扇形借结束绘制弧度
        const endAngle = ((tempAngle + angle) * Math.PI) / 180;
        //绘制扇形
        ctx.arc(x0, y0, radius, startAngle, endAngle);
        ctx.strokeStyle = "transparent"; //canvas边界透明
        ctx.stroke();
        //填充扇形
        ctx.fillStyle = that.colorArr[x].color;
        ctx.fill();
        tempAngle += angle;
      }
    }
  }
};
var indexLabel = 0;
window.rectMouseover = function(e) {
  // console.log(e.style)
  indexLabel = e.parentElement.style.zIndex;
  e.parentElement.style.zIndex = 1;
  e.childNodes[3].style.display = "inline-block";
};
window.rectMouseout = function(e) {
  // console.log(e.style)
  e.parentElement.style.zIndex = indexLabel;
  e.childNodes[3].style.display = "none";
};
window.openALink = function(code) {
  var isEntryExit = window.location.href.includes("entryExit");
  var path = "/collectMarkerProfile";
  var query = {};
  comApis.getDrawState(code).then(res => {
    if (res.code == 200) {
      if (res.data.mapInfo != null && !isEntryExit) {
        path = "/collectMarkerProfile";
        query = {
          collectId: res.data.mapInfo.collectId,
          areaCode: code,
          state: 1
        };
        let route =
          path +
          "?collectId= " +
          res.data.mapInfo.collectId +
          "&areaCode=" +
          code +
          "&state=1";

        window.open(route, "_blank");
      }
    }
  });
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.mapComponentBig {
  width: 100%;
  height: 100%;
  position: relative;
  .allmap {
    width: 100%;
    height: 100%;
    font-size: 14px;
    /deep/.cou {
      width: 120px;
      height: 30px;
      color: #ffffff;
      background: #ffffff;
      margin-left: -20px;
      margin-top: 6px;
      border-radius: 15px;
    }
  }
  .legend {
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 1px solid #cccbcb;
    background: #fff;
    .left {
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      margin-right: 20px;
    }
    .right {
      cursor: pointer;
      font-size: 12px;
      color: #515a6e;
    }
  }
  .openLegend {
    width: 447px;
    height: 146px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(221, 222, 226, 1);
    position: absolute;
    bottom: 0;
    right: 0;
    animation: widthAni 0.5s linear;
    padding: 12px 16px 0;
    .legendTitle {
      .left {
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: inline-block;
      }
      .right {
        float: right;
        cursor: pointer;
      }
    }
    .legendContent {
      width: 100%;
      .contentCenter {
        margin: 16px auto 0;
        div {
          vertical-align: middle;
          display: inline-block;
          font-size: 16px;
        }
        .integral {
          width: 54px;
          height: 31px;
          text-align: center;
          line-height: 28px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(237, 143, 33, 1);
          box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.3);
          border-radius: 2px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(237, 143, 33, 1);
          margin-left: -4px;
        }
        .dengji {
          width: 110px;
          height: 31px;
          text-align: center;
          line-height: 31px;
          background: rgba(237, 143, 33, 1);
          box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.3);
          color: #fff;
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          margin-left: -4px;
        }
        .miniPieChart {
          position: relative;
          .miniName {
            position: absolute;
            top: -17px;
            left: 0;
            font-size: 12px;
          }
        }
        .pieChart {
          vertical-align: middle;
          display: inline-block;
        }

        .level > div {
          width: 38px;
          height: 31px;
          position: relative;
          text-align: center;
          margin-left: 6px;
          box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.3);
          border-radius: 2px;
          i {
            width: 100%;
            line-height: 31px;
            color: #ffffff;
            font-size: 12px;
          }
          em {
            position: absolute;
            left: 0;
            bottom: -20px;
            font-size: 14px;
            font-style: inherit;
            width: 100%;
          }
          span {
            position: absolute;
            left: 0;
            bottom: -40px;
            line-height: 20px;
            font-size: 12px;
            width: 100%;
          }
        }
      }
    }
  }
}

/deep/ .huangjun {
  text-align: center;
  font-size: 16px;
  .drawSpan {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 8px;
    box-shadow: 0 1px 4px #585353;
  }
  .rect {
    margin-bottom: 10px;
  }
  .tag-rect {
    height: 38px;
    min-width: 38px;
    padding: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 4px #585353;
    font-size: 14px;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
/deep/ .huang {
  text-align: center;
  font-size: 16px;
  .score {
    display: inline-block;
    vertical-align: middle;
    padding: 6px 2px;
    // box-shadow: 0 1px 4px #585353;
    font-size: 12px;
    background: #fff;
  }
  .drawSpan {
    display: inline-block;
    vertical-align: middle;
    padding: 4px 10px;
    border-radius: 0px;
    box-shadow: 0 1px 4px #585353;
    height: 30px;
  }
  canvas {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
  }
  :hover .rect {
    display: inline-block;
  }
  .rect {
    display: none;
    vertical-align: middle;
    .tag-rect {
      float: left;
      height: 32px;
      min-width: 38px;
      padding: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px #585353;
      margin-left: 8px;
      font-size: 14px;
    }
  }
}
@keyframes widthAni {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
