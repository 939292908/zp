<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 09:28:39
 * @LastEditTime: 2019-12-11 14:34:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">审核看板</h2>
    </div>
    <div class="content-panel">
      <div class="tp-box">
        <div class="tp-list">
          <div class="box-header">
            <span>我审核的图谱({{tpList.mapStatisticsResult.count}})</span>
          </div>
          <div
            class="tp-item"
            :key="index"
            v-for="(item,index) in tpList.statisticalResultList"
            @click="toMapReview(item)"
            :style="{'background':$config.topTagColors[item.displayName]}"
          >
            <div class="tp-item-title">{{item.displayName}}</div>
            <div class="tp-item-count">{{item.count}}</div>
          </div>
          <!-- <div class="loading-tpmc" v-show="loadingTpmcShow" style="top:-80px">
            <div class="loader-tpmc"></div>
          </div>-->
          <loading size="small" :mask-closable="false" v-model="loadingTpmcShow"></loading>
        </div>
        <div class="workbench">
          <div class="box-header">
            <span>工作台({{tpState.mapStatisticsResult.count}})</span>
          </div>
          <div class="tp-status" v-show="!loadingTpmcShow">
            <div class="status-item audit" @click="toAuditPage">
              <span>待审核</span>
              <div class="status-item-count">{{this.resultList.auditCount}}</div>
              <i class="iconfont icon-daishenhe icon"></i>
            </div>
            <div class="status-item pass" @click="toPassPage">
              <span>已通过</span>
              <div class="status-item-count">{{this.resultList.passCount}}</div>
              <i class="iconfont icon-yitongguo icon"></i>
            </div>
            <div class="status-item back" @click="toBackPage">
              <span>已退回</span>
              <div class="status-item-count">{{this.resultList.backCount}}</div>
              <i class="iconfont icon-tuihui icon"></i>
            </div>
          </div>
          <!-- <div class="loading-tpmc" v-show="loadingTpmcShow" style="top:-80px">
            <div class="loader-tpmc"></div>
          </div>-->
          <loading size="small" :mask-closable="false" v-model="loadingTpmcShow"></loading>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box">
        <div class="panel-title">
          <span>我的绩效</span>
        </div>
        <div id="lineCharts"></div>
        <RadioGroup
          type="button"
          class="timing-btns"
          :value="performanceTpye[0]"
          @on-change="selectTime"
        >
          <Radio :label="item" v-for="(item,index) in performanceTpye" :key="index"></Radio>
        </RadioGroup>
      </div>
    </div>
    <!-- <div class="content-panel">
      <div class="panel-title">
        <span>辖区情况</span>
      </div>
      <div class="panel-box">
        待定
        <span class="chartsInfo">{{villageName}}村，共{{personTotal}}人</span>
        <div id="barCharts"></div>
        <RadioGroup type="button" class="timing-btns" value="人员状态">
          <Radio label="人员状态"></Radio>
          <Radio label="五位一体"></Radio>
        </RadioGroup>
      </div>
    </div>-->
    <!-- loading -->
  </div>
</template>
<script>
import * as apis from "@/api/collection/index.js";
import Loading from "@/components/assembly/Loading";
export default {
  name: "Dashboard",
  components: {
    Loading
  },
  data() {
    return {
      loadingTpmcShow: false,
      statusList: {},
      showAddDialog: false,
      dialogStyles: {
        // height:'450px'
      },
      title: "新建",
      mapTypeList: [],
      curSelectTp: null, //当前选择的图谱类型
      visible: false,
      tpList: {
        mapStatisticsResult: {},
        statisticalResultList: {}
      },
      tpState: {
        mapStatisticsResult: {},
        statisticalResultList: {}
      },
      performanceData: {
        dayList: {},
        weekList: {},
        monthList: {},
        yearList: {}
      },
      performanceTpye: [],
      perDate: [],
      perCount: [],
      perCountNum: [],
      dataTime: null,
      resultList: {
        auditCount: 0,
        passCount: 0,
        backCount: 0
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPerformanceData();
      this.getMapTypeStateList();
    },
    initData(charts, option) {
      charts.setOption(option);
      window.addEventListener("resize", () => {
        charts.resize();
      });
    },
    handleShowAddDialog() {
      this.showAddDialog = true;
    },
    handleSelectMaptype(name) {
      this.curSelectTp = name;
      this.title =
        "新的" + this.mapTypeList.find(x => x.id == name).displayName;
      this.handleShowAddDialog();
      console.log("handleSelectMaptype", name);
    },
    // 跳转到图谱审核
    toMapReview(item) {
      this.$router.push({
        path: "/auditCollect/mapReview",
        query: {
          type: item.id,
          state: 0
        }
      });
    },
    // 获取图谱类型与状态
    getMapTypeStateList() {
      this.loadingTpmcShow = true;
      apis.GET_TP_AUDIT_TYPE_STATE().then(res => {
        if (res.code == 200) {
          this.loadingTpmcShow = false;
          // console.log(res, 111);
          this.tpList = res.data.mapTypeStatistics;
          this.tpState = res.data.mapVerifyStatusStatistics;
          let resultList = this.tpState.statisticalResultList;
          resultList.forEach(ele => {
            if (ele.displayName == "待审核") {
              this.resultList.auditCount = ele.count;
            } else if (ele.displayName == "已通过") {
              this.resultList.passCount = ele.count;
            } else if (ele.displayName == "已退回") {
              this.resultList.backCount = ele.count;
            }
          });
        } else {
          this.loadingTpmcShow = false;
        }
      });
    },
    // 获取绩效数据
    getPerformanceData() {
      apis.GET_AUDIT_PERFORMANCE_DATA().then(res => {
        if (res.code === 200) {
          // console.log(res, 222);
          var list = res.data.mapMasterResultList;
          this.performanceData.dayList = list[0].statisticalResultList;
          this.performanceData.weekList = list[1].statisticalResultList;
          this.performanceData.monthList = list[2].statisticalResultList;
          this.performanceData.yearList = list[3].statisticalResultList;
          // console.log(this.performanceData.yearList);

          list.forEach(ele => {
            this.performanceTpye.push(ele.mapStatisticsResult.displayName);
          });
          this.handlePerformanceData(this.performanceData.dayList);
          this.drawLineCharts();
        }
      });
    },
    // 绩效时间切换
    selectTime(val) {
      let data = null;
      switch (val) {
        case this.performanceTpye[0]:
          data = this.performanceData.dayList;
          break;
        case this.performanceTpye[1]:
          data = this.performanceData.weekList;
          break;
        case this.performanceTpye[2]:
          data = this.performanceData.monthList;
          break;
        case this.performanceTpye[3]:
          data = this.performanceData.yearList;
          break;
        default:
          break;
      }
      this.handlePerformanceData(data);
      this.drawLineCharts();
    },
    // 绩效数据处理
    handlePerformanceData(data) {
      this.perDate = [];
      this.perCount = [];
      this.perCountNum = [];
      data.forEach(ele => {
        this.perDate.push(ele.displayName);
        this.perCount.push(ele.count);
        this.perCountNum.push(ele.countNum);
      });
    },
    // 绩效图配置
    drawLineCharts() {
      var lineCharts = this.$echarts.init(
        document.getElementById("lineCharts")
      );
      var option = {
        title: {
          // text: 'ECharts 入门示例'
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            let str = "";
            for (let i = 0; i < params.length; i++) {
              str += params[i].seriesName + "：" + params[i].value + "</br>";
            }
            return str;
          }
        },
        legend: {
          data: ["通过的图谱数", "退回的图谱数"],
          y: "top",
          right: "300px"
        },
        xAxis: {
          data: this.perDate,
          boundaryGap: false
        },
        yAxis: {
          minInterval: 1
        },
        series: [
          {
            name: "通过的图谱数",
            type: "line",
            data: this.perCount,
            itemStyle: {
              normal: {
                color: "#2d89fc",
                lineStyle: {
                  color: "#2d89fc"
                }
              }
            }
          },
          {
            name: "退回的图谱数",
            type: "line",
            data: this.perCountNum,
            itemStyle: {
              normal: {
                color: "#00c463",
                lineStyle: {
                  color: "#00c463"
                }
              }
            }
          }
        ]
      };
      this.initData(lineCharts, option);
      lineCharts.setOption(option);
    },
    // 辖区情况
    // drawBarCharts() {
    //   var barCharts = this.$echarts.init(document.getElementById("barCharts"));
    //   var option = {
    //     title: {
    //       // text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     // legend: {
    //     //   data: ["通过审核的图谱数"],
    //     //   y:"bottom"
    //     // },
    //     xAxis: {
    //       data: ["收押", "收教", "境外", "死亡", "去向不明", "社会面"]
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: "通过审核的图谱数",
    //         type: "bar",
    //         data: [48, 65, 75, 100, 60, 40],
    //         itemStyle: {
    //           normal: {
    //             color: function(params) {
    //               let colorList = {
    //                 社会面: "#008800",
    //                 收押: "#cb4324",
    //                 收教: "#f7b940",
    //                 境外: "#ffe900",
    //                 死亡: "#6B6B6B",
    //                 去向不明: "#0000fe",
    //                 政: "#666666",
    //                 宗: "#008000",
    //                 商: "#f49e00",
    //                 恐: "#333333",
    //                 黑: "#999999"
    //               };
    //               return colorList[params.name];
    //             }
    //           }
    //         },
    //         barMaxWidth: "50%"
    //       }
    //     ]
    //   };
    //   this.initData(barCharts, option);
    //   barCharts.setOption(option);
    // },
    showVerifyDialog() {
      this.visible = true;
    },
    // 跳转到图谱审核-待审核
    toAuditPage() {
      this.$bus.$emit("currentAuditPage", 2);
    },
    // 跳转到图谱审核-已通过
    toPassPage() {
      this.$bus.$emit("currentAuditPage", 0);
    },
    // 跳转到报送审核-已退回
    toBackPage() {
      this.$bus.$emit("currentAuditPage", 1);
    }
  },
  mounted() {
    // this.drawLineCharts();
    // this.drawBarCharts();
  }
};
</script>
<style lang="less" scoped>
/deep/ .add-map-panel {
  .ivu-modal-content,
  .ivu-modal-body {
    height: 100%;
    padding: 0;
  }
}
/deep/.ivu-radio-group-button .ivu-radio-wrapper-checked,
.ivu-radio-group-button .ivu-radio-wrapper:hover {
  color: #fff;
  background-color: #3985ed;
}
</style>
