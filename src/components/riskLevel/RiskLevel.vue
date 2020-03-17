<template>
  <div class="risk-level">
    <p class="level">{{$config.mapPageConfig.riskLevelTitle}}</p>
    <p
      class="tpmc"
      :title="this.assessData.tpmc.length*14 > 240 ? this.assessData.tpmc : '' "
    >{{ this.assessData.tpmc }}</p>
    <div class="label">
      <div class="perCount">
        <span>{{$config.mapPageConfig.perCountTitle}} {{ this.assessData.personCount }}</span>
        <!-- <span>{{ '男：'+ this.assessData.personLabelCount['男'] }}</span>
        <span>{{ '女：'+ this.assessData.personLabelCount['女'] }}</span>-->
      </div>
      <div class="person-tag">
        <span>选中{{this.$config.properties.RYBQ}}：</span>
        <span>{{selectPersonTag}}</span>
      </div>
      <div class="bq_list bar">
        <!-- <div class="bq-box" v-for="(val,key,index) in this.assessData.personLabelCount" :key="index">
          <span class='span_cor tag_bg' :style="{background:dataColor[key]}">
            {{ key }}
            <span class="corner" :style="{background:dataColor[key]}">{{ val }}</span>
          </span>
        </div>-->

        <!-- <div class="bq-box" v-for="(item,index) in this.assessData.labelCount" :key="index" @click="highlightLabel(item.name,dataColor[item.name])">
          <span class='span_cor tag_bg' :style="{background:dataColor[item.name]}">
            {{ item.name }}
            <span class="corner" :style="{background:dataColor[item.name]}">{{ item.value }}</span>
          </span>
        </div>-->
        <div
          class="bq-box"
          v-for="(item,index) in this.assessData.person_tag"
          :key="index"
          @click="highlightLabel(item.tagName,index)"
          :title="item.tagName"
        >
          <span
            :class="activeIndex == index ? 'span_cor tag_bg active' : 'span_cor tag_bg' "
            :style="{background:'#'+item.tagColor}"
          >
            {{ item.tagName }}
            <span
              :class=" activeIndex == index ? 'corner active' : 'corner' "
              :style="{background:'#'+item.tagColor}"
            >{{ item.count }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="circle">
      <i-circle
        :percent="this.assessData.riskLevel == '3' ? 100 : this.assessData.riskLevel == '2' ? 60 : this.assessData.riskLevel == '1' ? 40 : 0 "
        trail-color="#ffffff"
        stroke-color="#f00"
        :size="75"
      >
        <!-- <span class="demo-Circle-inner" style="font-size:21px">{{ assessData.pfTotal >= 0 && assessData.pfTotal <= 30 ? '低' : assessData.pfTotal > 30 && assessData.pfTotal <= 60 ? '中' : assessData.pfTotal > 60 ? '高' : ''}}</span> -->
        <span
          class="demo-Circle-inner"
          style="font-size:21px"
        >{{ this.assessData.riskLevel == '3' ? '高' : this.assessData.riskLevel == '2' ? '中' : this.assessData.riskLevel == '1' ? '低' : 0 }}</span>
      </i-circle>
    </div>
    <div class="num-people">
      <ul>
        <li v-for="(val,key,index) in this.assessData.typeCount" :key="index">
          <span :style="{background:topTagColors[key]}">{{ key }}</span>
          <span>{{ val }}</span>
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
  name: "RiskLevel",
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
    highlightLabel(label, index) {      
      this.selectPersonTag = label;
      this.activeIndex = index;
      if (label && index >= 0) {
        this.$emit("highlightNodes", label);
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
.risk-level {
  width: 290px;
  //height:280px;
  .post(a);
  top: 25px;
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
    .perCount {
      padding-left: 4%;
      margin-bottom: 5px;
      span {
        font-size: 14px;
        color: rgba(0, 154, 237, 1);
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
    .person-tag {
      padding-left: 4%;
      font-size: 14px;
      color: #009aed;
    }
  }
  .circle {
    width: 75px;
    height: 75px;
    margin: 12px 28px 0 15px;
    float: left;
    .ivu-chart-circle-inner {
      span {
        font-size: 14px;
      }
    }
  }
  .num-people {
    width: 158px;
    height: 124px;
    overflow-y: auto;
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