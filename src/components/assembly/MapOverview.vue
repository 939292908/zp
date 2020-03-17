  <!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 09:21:57
 * @LastEditTime: 2019-09-19 09:47:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="map-overview">
    <div class="title">
      {{$config.mapPageConfig.riskLevelTitle}}
      <div class="btn">
        <!-- 隐藏按钮 -->
        <div class="trigger-btn" @click="handleHide">
          <i class="iconfont icon-suoxiao1"></i>
        </div>
        <!-- 图谱详情按钮 -->
        <div v-if="showDetailBtn" class="map-btn" @click="handleDetail">
          查看图谱详情
          <Icon type="ios-arrow-forward" />
        </div>
      </div>
    </div>
    <div class="map-content">
      <div :title="mapName" class="title">{{mapName}}</div>
      <!-- 涉及人数和性别 -->
      <div class="person-nums">
        <span class="person-title">
          涉及人数：
          <strong style="color:#333">{{personCount}}</strong>人
        </span>
        <div class="gender">
          <div
            :class="'labels gender-label ' + (item.typeName == activeName ? 'active' : '')"
            :key="index"
            v-for="(item,index) in sexTypeCount"
            @click="handleGenderClick(item,index)"
          >
            <div class="tag-name">
              <i v-if="item.type==0" class="iconfont icon-nan"></i>
              <i v-if="item.type==1" class="iconfont icon-nv"></i>
              {{item.typeName}}：{{item.count}}
            </div>
          </div>
        </div>
      </div>
      <!-- 状态 -->
      <div class="status">
        <div class="status-title">状态：</div>
        <div class="status-list">
          <div
            :class="'labels status-item ' + (item.typeName == activeName ? 'active' : '')"
            :key="index"
            v-for="(item,index) in personTypeCounts"
            @click="handleStatusClick(item,index)"
          >
            <div v-if="item.type!=null" class="tag-name" :style="{'background':$config.personLabel[item.typeName],'color':$config.personLabel[item.typeName] == '#ffe900' ? '#666666':'#ffffff'}">
              {{item.typeName}}：
              <strong>{{item.count}}</strong>
            </div>
          </div>
        </div>
      </div>
      <!-- 五位一体 -->
      <div class="five-one">
        <div class="five-one-title">五位一体：</div>
        <div class="five-one-list">
          <div
            :class="'labels five-one-item ' + (item.typeName == activeName ? 'active' : '')"
            :key="index"
            v-for="(item,index) in fiveOnePropertyCounts"
            :style="{color:$config.tagColor[item.typeName]}"
            @click="handleFiveOneClick(item,index)"
          >
            <i :class="'iconfont ' + fiveOneIcon[item.typeName]"></i>
            <strong>{{item.count}}</strong>
            <!-- 高亮三角形 -->
            <div class="triangle">
              <div class="one" :style="{backgroundColor:$config.tagColor[item.typeName]}"></div>
              <div class="two" :style="{backgroundColor:$config.tagColor[item.typeName]}"></div>
              <div class="three" :style="{backgroundColor:$config.tagColor[item.typeName]}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="level-line" v-if="$config.project.locale == 'aks'">
        <div class="level-line-title">涉案涉线情况：</div>
        <div class="level-line-list">
          <div
            :class="'labels level-line-item ' + (item.caseType == activeName ? 'active' : '')"
            :key="index"
            v-for="(item,index) in levelLineCounts"
            :style="{color:item.color}"
            @click="handleLevelLineClick(item,index)"
          >
            <div class="tag-name">
              {{item.caseType}}：{{item.count}}
            </div>
          </div>
        </div>
      </div>
      <!-- 属性\标签 -->
      <div class="labels-info">
        <div class="labels-title">{{$config.properties.RYBQ}}：</div>
        <div class="labels-list">
          <div
            :class="'labels labels-item ' + (item.tagName == activeName ? 'active' : '')"
            :key="index"
            v-for="(item,index) in labelCount"
            @click="handleLabelsClick(item,index)"
          >
            <div class="tag-name" :title="item.tagName">
              <span>{{item.tagName}}</span>：
              <strong>{{item.count}}</strong>
            </div>
            <!-- <span
              :style="{'background':'#'+item.tagColor,'font-color':'#'+item.fontColor}"
            >{{item.count}}</span>-->
          </div>
        </div>
      </div>
      <!-- 风险详情 -->
      <div class="risk-info" v-if="labelsInfoShow">
        <!-- 圆显示比例 -->
        <!-- :percent="this.assessData.riskLevel == '极高' ? 100 : this.assessData.riskLevel == '高' ? 75 : this.assessData.riskLevel == '中' ? 50 : this.assessData.riskLevel == '低' ? 25 : 0 " -->
        <i-circle
          class="risk-circle"
          :percent="100"
          trail-color="#ffffff"
          :stroke-color="riskColor[assessData.riskLevel]"
          :size="100"
        >
          <!-- {{riskPercent.label || '高'}} -->
          <p
            :style="{color:riskColor[assessData.riskLevel]}"
          >{{ this.assessData.riskLevel || '无风险' }}</p>
          <!-- <p class="risk-num">危害积分: xx</p> -->
        </i-circle>
        <div class="map-types">
          <div class="map-types-item" :key="index" v-for="(item,index) in mapTypeCounts">
            <span :style="{'background': $config.topTagColors[item.typeName]}">{{item.typeName}}</span>
            <span>{{item.count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CASE_CODE,CLUB_CODE } from "@/api/config.js";
export default {
  name: "MapOverview",
  props: {
    labelsInfoShow: {
      type: Boolean,
      default: true
    },
    showDetailBtn: {
      type: Boolean,
      default: true
    },
    assessData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    mapName() {
      return this.assessData.archiveName;
    },
    personCount() {
      return this.assessData.personCount;
    },
    sexTypeCount() {
      return this.assessData.sexTypeCount;
    },
    riskPercent() {
      let risk = {
        percent: 0,
        label: "无"
      };
      switch (this.assessData.riskLevel) {
        case "3":
          risk.percent = 100;
          risk.label = "高";
          break;
        case "2":
          risk.percent = 60;
          risk.label = "中";
          break;
        case "1":
          risk.percent = 40;
          risk.label = "低";
          break;
        case "无":
          risk.percent = 0;
          risk.label = "无";
          break;
      }
      return risk;
    },
    personTypeCounts() {
      return this.assessData.personTypeCounts;
    },
    fiveOnePropertyCounts() {
      return this.assessData.fiveOnePropertyCounts;
    },
    levelLineCounts() {
      let arr = this.assessData.caseClueCounts ? JSON.parse(JSON.stringify(this.assessData.caseClueCounts)) : [];
      arr.forEach(x => {
        if(x.caseType == CASE_CODE) {
          x.color = "#d74348"
        } else if(x.caseType == CLUB_CODE) {
          x.color = "#4264d7"
        }
      })
      return arr;
    },
    labelCount() {
      return this.assessData.labelCount;
    },
    mapTypeCounts() {
      return this.assessData.mapTypeCounts;
    }
  },
  data() {
    return {
      activeName: "",
      fiveOneIcon: {
        政: "icon-zheng",
        商: "icon-shang",
        宗: "icon-zong1",
        恐: "icon-kong",
        黑: "icon-hei"
      },
      riskColor: {
        极高: "#D74348",
        高: "#ED8F21",
        较高: "#ED8F21",
        中等: "#D9C91B",
        中: "#D9C91B",
        较低: "#4264D7",
        低: "#4264D7",
        无风险: "#6A6767",
        "": "#6A6767"
      }
    };
  },
  methods: {
    handleDetail() {
      this.$emit("on-show-detail");
    },
    handleHide() {
      this.$emit("on-hide");
    },
    handleReset() {
      this.activeName = ""
      this.$emit("on-reset");
    },
    // 性别 Click
    handleGenderClick(item, index) {
      if (item.typeName == this.activeName) {
        // 重置
        this.activeName = "";
        this.$emit("on-change", null, item, index);
      } else {
        // 高亮
        this.activeName = item.typeName;
        this.$emit("on-change", "genderId", item, index);
      }
    },
    // 状态 Click
    handleStatusClick(item, index) {
      if (item.typeName == this.activeName) {
        // 重置
        this.activeName = "";
        this.$emit("on-change", null, item, index);
      } else {
        // 高亮
        this.activeName = item.typeName;
        this.$emit("on-change", "stateId", item, index);
      }
    },
    // 五位一体 Click
    handleFiveOneClick(item, index) {
      if (item.typeName == this.activeName) {
        // 重置
        this.activeName = "";
        this.$emit("on-change", null, item, index);
      } else {
        // 高亮
        this.activeName = item.typeName;
        this.$emit("on-change", "fiveOnePropertyId", item, index);
      }
    },
    // 案件、线索
    handleLevelLineClick(item, index) {
      if (item.caseType == this.activeName) {
        // 重置
        this.activeName = "";
        this.$emit("on-change", null, item, index);
      } else {
        // 高亮
        this.activeName = item.caseType;
        this.$emit("on-change", "levelLine", item, index);
      }
    },
    // 属性\标签 Click
    handleLabelsClick(item, index) {
      if (item.tagName == this.activeName) {
        // 重置
        this.activeName = "";
        this.$emit("on-change", null, item, index);
      } else {
        // 高亮
        this.activeName = item.tagName;
        this.$emit("on-change", "tagId", item, index);
      }
    }
  },
  watch: {
    assessData: {
      handler(val) {},
      immediate: true,
      deep: true
    },
    labelsInfoShow: {
      handler(val) {},
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.circle-inner {
  font-size: 20px;
}
.map-overview {
  position: absolute;
  top: 20px;
  right: 15px;
  width: 350px;
  max-height: 94%;
  overflow-y: auto;
  color: #009aed;
  font-size: 14px;
  background: #fff;
  box-shadow: 0px 0px 12px -8px #000;
  z-index: 1000;
  > .title {
    color: #636363;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    padding: 0 8px;
    color: #fff;
    font-weight: 700;
    background-color: #0668c8;
    border-radius: 4px 4px 0 0;
    .btn {
      float: right;
      width: 50%;
      font-weight: normal;
      .map-btn,
      .trigger-btn {
        float: right;
        cursor: pointer;
      }
      .map-btn {
        i {
          padding-right: 8px;
          border-right: 1px solid #fff;
          margin-right: 14px;
        }
      }
      .trigger-btn {
        i {
          line-height: 38px;
        }
      }
    }
  }
  .map-content {
    padding: 8px 4px 8px;
    border: 1px solid #e3e3e3;
    > .title {
      padding: 4px 8px;
      color: #333;
      font-size: 14px;
      font-weight: 700;
      word-break: break-all;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      cursor: pointer;
    }
    .person-title,
    .status-title,
    .labels-title,
    .five-one-title,
    .level-line-title {
      padding: 4px 2px 4px 8px;
      font-size: 12px;
      color: #666;
    }
    .labels {
      // margin: 4px 4px;
      padding: 3px 2px;
      color: #666;
      border-radius: 2px;
      position: relative;
      flex-basis: 33%;
      font-size: 12px;
      display: inline-flex;
      justify-content: center;
      width: 33%;
      cursor: pointer;
      .tag-name {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        text-align: center;
        // border: 2px solid transparent;
        border: 2px solid #ccc;
        // height: 24px;
        // box-sizing: border-box;
      }
      > span {
        position: absolute;
        right: -2px;
        top: -6px;
        min-width: 20px;
        height: 20px;
        border-radius: 16px;
        text-align: center;
        background: #ddd;
        padding: 0 4px;
        border: 2px solid transparent;
      }
    }
    // .active {
    //   .tag-name {
    //     border: 2px solid #12305c;
    //   }
    // }
    .person-nums {
      display: flex;
      // justify-content: space-between;
      .gender {
        display: inline-flex;
        align-items: center;
        margin-left: 12px;
        .gender-label {
          color: #000;
          flex-basis: 50%;
          .tag-name {
            min-width: 76px;
          }
          &.active .tag-name {
            border: 2px solid #0668c8;
            color: #0668c8;
          }
          .icon-nan {
            color: #4264d7;
            font-size: 12px;
          }
          .icon-nv {
            color: #ce4343;
            font-size: 12px;
          }
        }
      }
    }
    .status-list {
      display: flex;
      flex-wrap: wrap;
      .status-item {
        color: #fff;
        .tag-name {
          border: 2px solid transparent;
        }
        &.active .tag-name {
          border: 2px solid rgba(0, 0, 0, 0.5);
        }
      }
    }
    .five-one-list {
      .five-one-item {
        width: auto;
        margin-right: 14px;
        i {
          font-size: 31px;
        }
        strong {
          position: absolute;
          left: 26px;
          top: 6px;
        }
        .triangle {
          position: absolute;
          bottom: 28px;
          left: -5px;
          display: none;
          > div {
            width: 28px;
            height: 2px;
            background-color: #999;
            position: absolute;
            border-radius: 4px;
          }
          .one {
            transform: rotate(-60deg) translate(0px, 1px);
            width: 27px;
          }
          .two {
            transform: translateX(50%) rotate(60deg);
          }
          .three {
            transform: translate(7px, 11px);
          }
        }
        &.active .triangle {
          display: block;
        }
      }
    }
    .level-line{
      display: flex;
      .level-line-title {
        flex: 0 0 100px;
      }
      .level-line-list {
        flex: auto;
        .level-line-item{
          &.active .tag-name {
            border: 2px solid #0668c8;
            // color: #0668c8;
          }
        }        
      }
    }
    .labels-list {
      display: flex;
      flex-wrap: wrap;
    }
    .labels-item {
      min-width: 50%;
      .tag-name {
        padding: 0 5px;
        display: inline-block;
        word-break: break-all;
        > span {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: inline-block;
          width: calc(100% - 38px);
          vertical-align: middle;
        }
        > strong {
          vertical-align: middle;
        }
      }
      &.active .tag-name {
        border: 2px solid #0668c8;
        color: #0668c8;
      }
    }
    .risk-info {
      padding-left: 10px;
      display: flex;
      margin-top: 20px;
      align-items: center;
      .risk-circle {
        flex: 0 0 100px;
        color: #d74348;
        font-weight: 700;
        .risk-num {
          color: #333;
          font-size: 12px;
          margin-top: 8px;
          font-weight: 400;
        }
        /deep/ svg {
          width: 100%;
          height: 100%;
        }
      }
      .map-types {
        display: flex;
        flex-wrap: wrap;
        // justify-content: center;
        flex: auto;
        .map-types-item {
          flex-basis: 50%;
          display: flex;
          justify-content: center;
          color: #ffffff;
          margin: 4px 0;
          > span:first-child {
            display: inline-block;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 12px;
            line-height: 22px;
            margin-right: 10px;
            border-radius: 4px;
          }
          > span:last-child {
            font-weight: bold;
            color: #555555;
            min-width: 24px;
          }
        }
      }
      /deep/ .ivu-chart-circle-inner {
        font-size: 16px;
      }
    }
  }
}
</style>
