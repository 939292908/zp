<template>
  <div>
    <!-- 搜索 -->
    <searchHeader title="跨地区联姻情况" :isShowSearch="false"></searchHeader>
    <p class="title-text">跨地区联姻情况 （共{{allTotal}}个）</p>
    <!-- 饼图 -->
    <div class="chart-content clearfix">
      <!-- 1 -->
      <div class="chart left-box">
        <regionMarriageEchart id="NJchart" ref="NJchart" :data="Ndata"></regionMarriageEchart>
      </div>
      <!-- 2 -->
      <div class="chart right-box">
        <regionMarriageEchart id="BJchart" ref="BJchart" :data="Bdata"></regionMarriageEchart>
      </div>
    </div>
    <loading color="white" v-model="statusList.archivesLoadingShow"></loading>
    <!-- loading -->
    <!-- <div class="archives-loading-bg" v-show="statusList.archivesLoadingShow">
      <div class="archives-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div> -->
  </div>
</template>

<script>
import searchHeader from "../components/searchHeader";
import regionMarriageEchart from "../components/regionMarriageEchart";
import * as comApis from "@/api/common.js";
import Loading from '@/components/assembly/Loading'
export default {
  name: "",
  components: { searchHeader, regionMarriageEchart,Loading},
  data() {
    return {
      statusList: {
        archivesLoadingShow: false,
      },
      Ndata: {
        total: 0,
        region: "南疆",
        label: [],
        chartData: [
          // { value: 400, name: "喀什", color: "rgb(58,161,255)" },
          // { value: 210, name: "和田", color: "rgb(54,203,203)" },
          // { value: 170, name: "阿克苏", color: "rgb(78,203,115)" },
          // { value: 130, name: "巴州", color: "rgb(241,212,55)" },
          // { value: 90, name: "克州", color: "rgb(242,99,123)" }
        ]
      },
      Bdata: {
        total: 0,
        region: "北疆",
        label: [],
        chartData: []
      }
    };
  },
  computed: {
    allTotal() {
      return this.Ndata.total + this.Bdata.total;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      this.statusList.archivesLoadingShow = true;
      comApis
        .getRegionMarriage()
        .then(response => {
          if (response.code == 200) {
            this.statusList.archivesLoadingShow = false;
            this.buildData(this.Ndata, response.data[1]);
            this.buildData(this.Bdata, response.data[0]);
            this.$refs.NJchart.initDate();
            this.$refs.BJchart.initDate();
            console.log(this.Ndata, this.Bdata);
          } else {
            this.$Message.warning(response.message);
            this.statusList.archivesLoadingShow = false;
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
    },
    // 构建数据
    buildData(data, res) {
      // data = {
      //   region: "", // 南疆/北疆
      //   chartData: [], // 数据
      //   label: [], // 项
      //   total: 0 // 总数
      // };
      data.region = res.areaName;
      // data.chartData = res.merriageCounts;
      res.merriageCounts.forEach(item =>
        data.chartData.push({
          name: item.typeName,
          value: item.count,
          code: item.code
        })
      );
      res.merriageCounts.forEach(item => (data.total += item.count));
      res.merriageCounts.forEach(item => data.label.push(item.typeName));
      return data;
    },
  }
};
</script>

<style lang="less" scoped>
.title-text {
  font-size: 16px;
  font-weight: 700;
  padding-left: 20px;
  padding-top: 20px;
}
.left-box {
  float: left;
}
.right-box {
  float: right;
}

.chart-content {
  .chart {
    width: 46%;
    height: 460px;
  }
}
.card-content {
  overflow: hidden;
  padding: 10px;
  margin: 20px 20px 0px;
  .card {
    width: 44%;
  }
}
.archives-loading-bg{
  position:fixed;
  right:0;
  bottom:0;
  background:rgba(0,0,0,.5);
  // width: calc(100% - 252px);
  // height: calc(100% - 68px);
  width: 100%;
  height: 100%;
}
</style>

