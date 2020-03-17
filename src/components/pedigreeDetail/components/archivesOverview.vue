<template>
  <div class="risk-level">
    <p class="level">{{$config.mapPageConfig.riskLevelTitle}}</p>
    <div class="label">
      <div class="rowStyle">
        <span class="archivesTitle text-color">{{ this.assessData.archiveName }}</span>
      </div>
      <!-- 性别 -->
      <div class="rowStyle">
        <div class="fr">
          <span 
          v-for="(item, index) in assessData.sexTypeCount"
          :key="index"
          :class="{labelStyle:true, sexTypeCount:true, active:item.typeName==activeIndex}"
          :style="{background: item.typeName==0?'rgb(54, 164, 144)':'rgb(135, 200, 53)'}"
          :title="item.typeName==0?'男':'女'"
          @click="highlightLabel('GENDER', item, index)"
          >
            {{item.typeName==0?'男':'女'}}
            <span 
            class="count"
            :style="{background: item.typeName==0?'rgb(54, 164, 144)':'rgb(135, 200, 53)'}"
            >{{ item.count }}</span>
          </span>
        </div>
        <span class="personCount text-color">涉及人数：{{ this.assessData.personCount }}人</span>
      </div>
      <!-- 状态 -->
      <div class="rowStyle">
        <span class="text-color">状态：</span>
        <span
        v-for="(item, index) in assessData.personTypeCounts"
        :key="index"
        :class="{labelStyle:true, active:item.typeName==activeIndex}"
        :style="{background:'#'+item.color}"
        :title="item.typeName"
        @click="highlightLabel('STATE', item, index )"
        >
          {{item.typeName}}
          <span 
          class="count" 
          :style="{background:'#'+item.color}">
            {{ item.count }}
          </span>
        </span>
      </div>
      <!-- 属性 -->
      <div class="rowStyle">
        <span class="text-color">{{$config.properties.RYBQ}}：</span>
        <span
        v-for="(item, index) in assessData.labelCount"
        :key="index"
        :class="{labelStyle:true, active:item.tagName==activeIndex}"
        :style="{background:'#'+item.tagColor}"
        :title="item.tagName"
        @click="highlightLabel('RYBQ', item, index)"
        >
        <span class="text">{{item.tagName}}</span>
        <span 
          class="count" 
          :style="{background:'#'+item.tagColor}">
            {{ item.count }}
          </span>
        </span>
      </div>


      <div class="bq_list bar"></div>

    </div>
    <div class="circle">
      <i-circle
        :percent="this.assessData.riskLevel == '极高' ? 100 : this.assessData.riskLevel == '高' ? 75 : this.assessData.riskLevel == '中' ? 50 : this.assessData.riskLevel == '低' ? 25 : 0 "
        trail-color="#ffffff"
        stroke-color="#f00"
        :size="75"
      >
        <!-- <span class="demo-Circle-inner" style="font-size:21px">{{ assessData.pfTotal >= 0 && assessData.pfTotal <= 30 ? '低' : assessData.pfTotal > 30 && assessData.pfTotal <= 60 ? '中' : assessData.pfTotal > 60 ? '高' : ''}}</span> -->
        <span
          class="demo-Circle-inner"
          style="font-size:21px"
        >{{ this.assessData.riskLevel }}</span>
      </i-circle>
    </div>
    <div class="num-people">
      <ul>
        <li v-for="(val, index) in this.assessData.mapTypeCounts" :key="index">
          <span :style="{background:topTagColors[val.typeName]}">{{ val.typeName }}</span>
          <span>{{ val.count }}</span>
        </li>
        <!-- <li><span>涉案：</span><span>5</span></li>
        <li><span>涉案：</span><span>4</span></li>-->
        <!-- <div class="assess-loading" v-show="assessLoading">
          <div class="demo-spin-col" span="8">
              <Spin fix>
                  <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                  <div>加载中...</div>
              </Spin>
          </div>
        </div>-->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "archivesOverview",
  props: ["assessData"],
  data() {
    return {
      //assessData: this.assessData,
      selectPersonTag: "",
      activeIndex: -1,
      topTagColors: {
        户: "#4298c7",
        案: "#eb4826",
        朝: "#6668c6",
        境: "#8d3b65",
        社: "#bc4166",
        危: "#f19d38",
        宗: "#bf6b27",
        打: "#bc4166",
        族: "#f19d38",
        暴: "#8d3b65"
      },
      dataColor: {
        被收押人员: "#CE3632",
        被撤销特殊群体: "#FF9966",
        被撤销重点人员: "#CC3333",
        离异: "#9966FF",
        持有传播下载暴恐音视频人员: "#6699FF",
        视频: "#6699FF",
        下落不明人员: "#A1A1A1",
        迁出本县市: "#6699FF",
        一般渉稳不放心人员: "#CC66CC",
        逾期入境: "#CC6633",
        重点人员: "#CC0000",
        死亡: "#6B6B6B",
        宗教: "#3366CC",
        "宗教“两面人”": "#3366CC",
        宗教极端: "#0099FF",
        打击: "#0099FF",
        涉案: "#FF6633",
        案件: "#FF6633",
        三类: "#00CCFF",
        被击毙人员: "#797979",
        非法出境: "#CE3632",
        判刑人员: "#3399FF",
        无户籍: "#AEAEAE",
        收养: "#CC66FF",
        收教: "#D49F08",
        前科: "#CE3632",
        线索: "#D49F08",
        涉稳在逃人员: "#FF6633",
        男: "#4298c7",
        女: "#4298c7",
        未知: "#AEAEAE"
      }
    };
  },
  created() {},
  methods: {
    highlightLabel(type, item, index) {
      // 点击的 label
      let label = item.typeName || item.tagName; 
      if (label == this.activeIndex) {
        // 重置
        this.activeIndex = '';
        this.$emit("handleSelectClick", null, item, index);
      } else {
        // 高亮
        this.activeIndex = item.typeName || item.tagName; 
        if (type) {
          this.$emit("handleSelectClick", type, item, index);
        }
      }
    }
  }
};
</script>

<style lang="less">
@widthH: 100%;
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
.fr {
  float: right;
}
.risk-level {
  width: 290px;
  overflow: auto;
  max-height: 90%;
  //height:280px;
  .post(a);
  top: 70px;
  right: 30px;
  border: 4px solid #4690d1;
  z-index: 999;
  background: #c7eefe;
  .level {
    padding-left: 4%;
    height: 35px;
    line-height: 35px;
    color: #636363;
    // margin-bottom: 25px;
    font-size: 16px;
    border-bottom: 2px solid #7197b1;
    color: rgba(99, 99, 99, 1);
  }
  .tpmc {
    padding-left: 4%;
    font-size: 14px;
    line-height: 30px;
    overflow: hidden;
    /* margin-bottom: 4px; */
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 154, 237, 1);
  }
  .label {
    .rowStyle {
      padding-left: 4%;
      margin-bottom: 5px;
      .personCount {
        padding-top: 6px;
      }
      &:after{
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
      span {
        font-size: 14px;
        // color: rgba(0, 154, 237, 1);
        color: #000;
        display: block;
      }
      .text-color {
        color: #009aed;
      }
      .labelStyle {
        width: 30%;
        height: 22px;
        line-height: 20px;
        margin-right: 7px;
        margin-top: 6px;
        float: left;
        background-color: #ccc;
        text-align: center;
        border: 2px solid rgba(0, 0, 0, 0);
        box-sizing: border-box;
        position: relative;
        border-radius: 12px;
        font-size: 12px;
        cursor: pointer;
        .text {
          width: 100%;
          padding: 0 5px;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .count {
          min-width: 20px;
          height: 20px;
          text-align: center;
          line-height: 16px;
          font-size: 12px;
          color: #000;
          display: block;
          position: absolute;
          right: -8px;
          top: -10px;
          border: 2px solid rgba(18, 48, 92, 0);
          border-radius: 16px;
          padding: 0 4px;
          background-color: #ccc;
        }
        &.active {
          border: 2px solid #12305c;
          .count {
            border: 2px solid #12305c;
          }
        }
      }
      .sexTypeCount {
        width: 78px;
      }
      .archivesTitle {
        font-size: 16px;
        margin-top: 6px;
      }
    }
    .bq_list {
      padding: 10px 0;
      .bq-box {
        display: inline-block;
        position: relative;
        margin-left: 5px;
        cursor: pointer;
        .span_cor {
          display: inline-block;
          font-size: 12px;
          color: #e6e6e6;
          border-radius: 4px;
          margin-right: 6px;
          color: rgba(0, 0, 0, 1);
          width: 68px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          border: 2px solid rgba(18, 48, 92, 0);
          width: 80px;
          padding-left: 6px;
          padding-right: 6px;
          border-radius: 12px;
          background-color: #ce3632;
          white-space: nowrap;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          .corner {
            min-width: 20px;
            height: 20px;
            text-align: center;
            line-height: 16px;
            font-size: 12px;
            color: #000;
            display: block;
            position: absolute;
            right: -2px;
            top: -8px;
            border: 1px solid rgba(18, 48, 92, 0);
            border-radius: 16px;
            padding: 0 4px;
          }
          .corner.active {
            border: 2px solid rgba(18, 48, 92, 1);
          }
        }
        .span_cor.active {
          border: 2px solid rgba(18, 48, 92, 1);
        }
      }
    }
 
  }
  .circle {
    width: 75px;
    height: 75px;
    margin: 12px 28px 0 15px;
    float: left;
    .ivu-chart-circle-inner {
      span {
        color: red;
      }
    }
  }
  .num-people {
    width: 158px;
    height: 124px;
    float: left;
    p {
      font-size: 16px;
      font-weight: bold;
      color: #555555;
    }
    ul {
      height: 115px;
      li {
        width: 50%;
        font-size: 14px;
        font-weight: bold;
        color: #555555;
        overflow: hidden;
        float: left;
        margin-bottom: 8px;
        height: 22px;
        span:nth-child(1) {
          display: inline-block;
          width: 22px;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          text-align: center;
          border-radius: 3px;
          color: #fff;
          margin-right: 10px;
          font-weight: normal;
        }
        span:nth-child(2) {
          color: rgba(85, 85, 85, 1);
          font-size: 14px;
        }
      }
    }
  }
  .num-people ul::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .num-people ul::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  .num-people ul::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 1);
    border-radius: 5px;
  }
  .num-people ul::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 183, 245, 1);
  }
  .num-people ul::-webkit-scrollbar-corner {
    background-color: #dadada;
  }
}
</style>