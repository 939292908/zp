<template>
  <div class="profileBig" @click="handleWrapperClick($event)">
    <div class="header">
      <app-header :items="statusList" title="被打击人员分布图"></app-header>
    </div>
    <div class="content">
      <div class="contentLeft">
        <mapLeft
          :damage="damage"
          :idName="idName"
          :center="center"
          :zoom="zoom"
          :jsonName="jsonName"
          :childShowInfo="childShowInfo"
          :areaSummary="areaSummary"
          :mapDistributionData="mapDistributionData"
          @childToParent="getChildCode"
        ></mapLeft>
      </div>

      <mapRight
        :areaName="areaName"
        :errorMessage="errorMessage"
        :personnelStatisticalResult="personnelStatisticalResult"
      ></mapRight>
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
      damage: false,
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
                path: "/underAttack",
                query: {
                  areaCode,
                  collectId: res.data.mapInfo.collectId
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
        .getAreaDistribution(_that.$route.query.areaCode)
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
    .personnelStatistical {
      display: block;
      width: 100%;
      margin-top: 10px;
      .infoName {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #363636;
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
  }
}
.clear {
  clear: both;
}
/deep/ .anchorBL img {
  display: none;
}
/deep/ .BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none;
}
</style>
