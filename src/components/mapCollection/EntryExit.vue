<template>
  <div class="profileBig" @click="handleWrapperClick($event)">
    <div class="header">
      <app-header :items="statusList" title="出入境人员分布图"></app-header>
    </div>
    <div class="content">
      <div class="contentLeft">
        <mapLeft
          :idName="idName"
          :center="center"
          :zoom="zoom"
          :jsonName="jsonName"
          :childShowInfo="childShowInfo"
          :areaSummary="areaSummary"
          :mapDistributionData="mapDistributionData"
          :damage="damage"
          :profileName="profileName"
          @childToParent="getChildCode"
        ></mapLeft>
        <div class="leftTop">
          <div :class="{'act':!levelSelect}" @click="selectDisplay($event,'damage')">危害等级</div>
          <div :class="{'act':levelSelect}" @click="selectDisplay($event,'')">风险等级</div>
        </div>
      </div>
      <mapRight
        :areaName="areaName"
        :errorMessage="errorMessage"
        :personnelStatisticalResult="personnelStatisticalResult"
        @click="handleWrapperClick($event)"
      >
        <div slot="content" class="infoBig">
          <div class="contentHuman">
            <div v-if="errorMessage">{{errorMessage}}</div>
            <div
              v-else
              class="personnelStatistical"
              v-for="(item,index) in personnelStatisticalResult"
              :key="index"
            >
              <div class="infoName">
                <span class="left">{{item.name}}</span>
                <span class="right" v-if="index==0">{{item.statisticalResultList[0].count}}人</span>
              </div>
              <div class="information" v-for="(it,i) in item.statisticalResultList" :key="i">
                <span class="left" v-if="it.name!=''">{{it.name}}：</span>
                <span class="right" v-if="it.name!=''">{{it.count}}人</span>
                <span class="clear"></span>
              </div>
            </div>
          </div>
        </div>
      </mapRight>
    </div>
    <!-- loading -->
    <loading color="white" v-model="archivesLoadingShow"></loading>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import appHeader from "@/components/assembly/AppHeader";
import mapLists from "../../../static/vendors/baiduMap/mapInit.js";
import * as comApis from "@/api/collection/index.js";
import mapLeft from "./components/mapComponent";
import mapRight from "./components/mapRightData";
import Loading from "@/components/assembly/Loading";
export default {
  name: "Profile",
  components: {
    appHeader,
    mapLeft,
    mapRight,
    Loading
  },
  data() {
    //这里存放数据
    return {
      statusList: {
        myNavModalShow: false,
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
        MultiModal: false,
        ShowMultiModal: true,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false
      },
      idName: "nameAll",
      jsonName: "aks",
      center: {
        lng: 80.957398,
        lat: 40.875185
      },
      zoom: 8,
      map: null,
      mapDistributionData: [],
      personnelStatisticalResultMap: {},
      personnelStatisticalResult: [],
      areaCode: "",
      warningInfoList: [],
      AreaDistribution: {}, //乡镇数据，
      areaSummary: {}, //地区信息
      areaName: "", //地区名
      errorMessage: "",
      childShowInfo: false,
      levelSelect: false,
      damage: true,
      profileName: "entryExit",
      archivesLoadingShow: false //loading
    };
  },
  beforeCreate() {
    let areaCode = this.$route.query.areaCode;
    if (areaCode) {
      let villageCode = areaCode.substring(
        areaCode.length - 3,
        areaCode.length
      );
      if (villageCode != "000") {
        comApis.getDrawState(areaCode).then(res => {
          if (res.code == 200) {
            if (res.data.createId == null) {
              this.$Message.error("该村的辖区地图未绘制！");
              window.history.back();
            } else {
              this.$router.push({
                path: "/exitAndEntry",
                query: {
                  areaCode,
                  collectId: res.data.outBoundMapInfo.collectId
                }
              });
            }
          }
        });
      }
    }
  },
  mounted() {
    var me = this;
    me.getInfo();
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    // 子组件传参父组件改变数据
    getChildCode(code) {
      this.personnelStatisticalResult = this.personnelStatisticalResultMap[
        code
      ];
      if (this.areaSummary.area.areaCode == code) {
        this.areaName = this.areaSummary.area.areaName;
      } else {
        this.mapDistributionData.forEach(item => {
          if (item.areaCode == code) {
            this.areaName = item.areaName;
          }
        });
      }
    },
    // 点击饼图进入乡镇或者村
    getAreaDistribution() {
      this.mapDistributionData = this.AreaDistribution.mapDistributionData;
      this.personnelStatisticalResultMap = this.AreaDistribution.personnelStatisticalResultMap;
      this.warningInfoList = this.AreaDistribution.warningInfoList;
      this.areaSummary = this.AreaDistribution.areaSummary;
      this.areaName = this.AreaDistribution.areaSummary.area.areaName;
      this.areaCode = this.AreaDistribution.areaSummary.area.areaCode;
      this.personnelStatisticalResult = this.personnelStatisticalResultMap[
        this.areaCode
      ];
      // 执行之后，子组件监听传值
      this.childShowInfo = true;
    },
    // 获取信息
    getInfo() {
      const _that = this;
      _that.archivesLoadingShow = true;
      comApis
        .getOutBoundPerson(_that.$route.query.areaCode)
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            _that.AreaDistribution = res.data;
            // console.log(me.AreaDistribution)
            _that.getAreaDistribution();
          } else {
            console.log(res.msg);
            _that.errorMessage = "数据加载失败！";
          }
          _that.archivesLoadingShow = false;
        })
        .catch(response => {
          console.log(response);
          _that.errorMessage = "数据加载失败！";
          _that.archivesLoadingShow = false;
        });
    },
    // 选择展示内容
    selectDisplay(e, d) {
      if (e.target.className != "act" && d == "") {
        // 更改数据
        this.levelSelect = !this.levelSelect;
        this.damage = false;
      } else if (e.target.className != "act" && d == "damage") {
        // 更改数据
        this.levelSelect = !this.levelSelect;
        this.damage = true;
      }
    }
    // handleWrapperClick(event) {
    //   this.statusList.uploadImg=false;
    //   this.statusList.personModalShow=false;
    //   this.statusList.newsModalShow=false;
    //   let appElement = document.querySelector('div.app-list.app')
    //   if(event.path.indexOf(appElement) == -1) {
    //     this.statusList.appModalShow=false;
    //   }
    //   this.statusList.messageDetailsShow=false;
    //   this.statusList.guidelinesShow=false;
    //   this.statusList.feedbackShow=false;
    //   this.statusList.myNavModalShow = false;
    //   // this.statusList.personModalShow = false;
    //   // this.statusList.newsModalShow = false;
    //   // this.statusList.appModalShow = false;
    // }
  },
  filters: {
    sum: value => {
      return value.statisticalResultList
        .map(x => x.count)
        .reduce((sum, item) => {
          return sum + item;
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./css/style.less";
</style>
<style lang='less' scoped>
//@import url(); 引入公共css类
@red: #ef271d;
@ora: #ed8f21;
@yel: #e4d52b;
@blu: #184af0;
.infoBig {
  overflow-y: auto;
  height: 100%;
  padding-bottom: 30px;
}
.profileBig {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 68px;
  .contentLeft {
    flex: auto;
    width: 100%;
    height: 100%;
    position: relative;
    .leftTop {
      position: absolute;
      left: 10px;
      top: 10px;
      background: #ffffff;
      border-radius: 10px;
      border: 1px solid #cccccc;
      div {
        width: 100px;
        height: 38px;
        line-height: 32px;
        text-align: center;
        float: left;
        background: #ffffff;
        color: #000000;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        border: 3px solid #ffffff;
      }
      div.act {
        color: #ffffff;
        background: #184af0;
        border-radius: 8px;
      }
    }
  }
}

.infoShow {
  width: 300px;
  height: auto;
  flex: 0 0 300px;
  overflow: hidden;
  .title {
    width: 100%;
    height: 58px;
    background: rgba(228, 229, 230, 1);
    span {
      display: inline-block;
      margin-left: 20px;
      color: #2e3192;
      line-height: 58px;
      font-size: 22px;
    }
  }

  .contentHuman {
    padding: 10px 20px 50px;
    overflow-y: auto;
    height: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .personnelStatistical {
      display: block;
      width: 100%;
      margin-bottom: 10px;
      .infoName {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        .right {
          float: right;
        }
      }
      .information {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        margin-left: 24px;
        span {
          display: block;
        }
        .left {
          float: left;
          color: #555555;
        }
        .right {
          float: right;
          color: #363636;
        }
      }
    }
    :nth-child(2).personnelStatistical {
      width: 46%;
      float: left;
    }
    :nth-child(3).personnelStatistical {
      width: 46%;
      float: left;
      margin-left: 8%;
    }
  }
}
/deep/ .anchorBL img {
  display: none;
}
/deep/ .BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none;
}
</style>
