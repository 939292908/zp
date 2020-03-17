<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 09:28:39
 * @LastEditTime: 2019-12-18 16:48:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">采集看板</h2>
    </div>
    <div class="content-panel">
      <div class="tp-box">
        <div class="tp-list">
          <div class="box-header">
            <span>我采集的图谱({{tpList.mapStatisticsResult.count}})</span>
          </div>
          <div
            class="tp-item"
            :key="index"
            v-for="(item,index) in tpList.statisticalResultList"
            :style="{'background':$config.topTagColors[item.displayName]}"
            @click="handleToPage(item)"
          >
            <div class="tp-item-title">{{item.displayName}}</div>
            <div class="tp-item-count">{{item.count}}</div>
          </div>
          <loading size="small" :mask-closable="false" v-model="loadingTpmcShow"></loading>
          <!-- <div class="loading-tpmc" v-show="loadingTpmcShow" style="top:-80px">
            <div class="loader-tpmc"></div>
          </div>-->
        </div>
        <div class="workbench">
          <div class="box-header">
            <span>工作台({{tpState.mapStatisticsResult.count}})</span>
            <div class="actions-button">
              <Button
                v-if="hasUploadTaskAuth"
                type="primary"
                icon="ios-cloud-upload"
                @click="handleShowUploadClick"
              >批量采集上传</Button>
              <Dropdown v-if="hasGraphNewMapAuth" @on-click="handleSelectMaptype">
                <Button type="primary">
                  绘制新图谱
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem :key="index" :name="item.id" v-for="(item,index) in mapTypeList">
                    <span
                      :style="{'background':$config.topTagColors[item.shortName]}"
                      class="shortTag"
                    >{{item.shortName}}</span>
                    {{item.displayName}}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button v-if="hasUploadValidAuth" type="primary" @click="showVerifyDialog">采集表校验</Button>
            </div>
          </div>
          <div class="tp-status" v-show="!loadingTpmcShow">
            <div class="status-item uncommitted" @click="toUncommittedPage">
              <span>未提交</span>
              <div class="status-item-count">{{this.resultList.uncommittedCount}}</div>
              <i class="iconfont icon-weitijiao icon"></i>
            </div>
            <div class="status-item audit" @click="toAuditPage">
              <span>审核中</span>
              <div class="status-item-count">{{this.resultList.auditCount}}</div>
              <i class="iconfont icon-shenhezhong icon"></i>
            </div>
            <div class="status-item back" @click="toBackPage">
              <span>已退回</span>
              <div class="status-item-count">{{this.resultList.backCount}}</div>
              <i class="iconfont icon-tuihui icon"></i>
            </div>
          </div>
          <loading size="small" :mask-closable="false" v-model="loadingTpmcShow"></loading>
          <!-- <div class="loading-tpmc" v-show="loadingTpmcShow" style="top:-80px">
            <div class="loader-tpmc"></div>
          </div>-->
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
    <div class="content-panel">
      <div class="panel-box">
        <div class="panel-title">
          <span>辖区情况</span>
          <span class="chartsInfo">({{areaData.name || "xxx村"}}，共{{areaData.personTotal || 0}}人)</span>
        </div>
        <div id="barCharts"></div>
        <RadioGroup type="button" class="timing-btns" value="人员状态" @on-change="selectType">
          <Radio label="人员状态"></Radio>
          <Radio label="五位一体"></Radio>
        </RadioGroup>
      </div>
    </div>
    <!-- 校验模态框 -->
    <validate-file v-model="visible"></validate-file>
    <upload-file :z-index="1000" v-model="showUploadDialog"></upload-file>
  </div>
</template>
<script>
import { mapMixin } from "../mixin/mapMixin";
import * as apis from "@/api/collection/index.js";
import UploadFile from "../../mapCollection/components/uploadFile";
import ValidateFile from "../../mapCollection/components/validateFile";
import Loading from "@/components/assembly/Loading";
export default {
  name: "Dashboard",
  mixins: [mapMixin],
  components: {
    ValidateFile,
    UploadFile,
    Loading
  },
  data() {
    return {
      loadingTpmcShow: true,
      statusList: {},
      step: 0,
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
        mapStatisticsResult: {}
      },
      resultList: {
        uncommittedCount: 0,
        auditCount: 0,
        backCount: 0
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
      areaType: [],
      areaCount: [],
      dataTime: null,
      areaData: {},
      showUploadDialog: false
    };
  },
  created() {
    this.init();
  },
  computed: {
    hasGraphNewMapAuth() {
      return this.hasFunAuth(
        this.constantFunMap.FUN_Online_Dashboard_Add_Map_ID
      );
    },
    hasUploadValidAuth() {
      return this.hasFunAuth(
        this.constantFunMap.FUN_Online_Dashboard_Upload_Valid_ID
      );
    },
    hasUploadTaskAuth() {
      return this.hasFunAuth(
        this.constantFunMap.FUN_Online_Dashboard_Upload_Task_ID
      );
    }
  },
  methods: {
    init() {
      this.getMapTypeList();
      this.getMapTypeStateList();
      this.getPerformanceData();
      this.getAreaData();
    },
    initData(charts, option) {
      charts.setOption(option);
      window.addEventListener("resize", () => {
        charts.resize();
      });
    },
    handleShowAddDialog() {
      this.showAddDialog = true;
      const { href } = this.$router.resolve({
        path: "/onlineCollect/addMap",
        query: {
          mapType: this.curSelectTp,
          step: 0
        }
      });
      window.open(href, "_blank");
    },
    handleSelectMaptype(name) {
      this.curSelectTp = name;
      let title = this.mapTypeList.find(x => x.id == name).displayName;
      // sessionStorage.setItem("title", title);
      this.handleShowAddDialog();
    },
    // 点击上传按钮事件
    handleShowUploadClick() {
      this.showUploadDialog = true;
    },
    // 获取采集文件类型的数据
    getMapTypeList() {
      apis.GET_DRAW_TP_TYPE_LIST().then(res => {
        if (res.code == 200) {
          var result = res.data;
          this.mapTypeList = result;
        } else {
          this.mapTypeList = [];
        }
      });
    },
    // 获取图谱类型与状态
    getMapTypeStateList() {
      this.loadingTpmcShow = true;
      apis.GET_TP_TYPE_STATE().then(res => {
        if (res.code == 200) {
          this.loadingTpmcShow = false;
          this.tpList = res.data.mapTypeStatistics;
          this.tpState = res.data.mapVerifyStatusStatistics;
          let resultList = this.tpState.statisticalResultList;
          resultList.forEach(ele => {
            if (ele.displayName == "未提交") {
              this.resultList.uncommittedCount = ele.count;
            } else if (ele.displayName == "审核中") {
              this.resultList.auditCount = ele.count;
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
      apis.GET_PERFORMANCE_DATA().then(res => {
        if (res.code === 200) {
          // console.log(res);
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
      data.forEach(ele => {
        this.perDate.push(ele.displayName);
        this.perCount.push(ele.count);
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
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "通过审核的图谱数：{c0}"
        },
        legend: {
          data: ["通过审核的图谱数"],
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
            name: "通过审核的图谱数",
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
            // label: {
            //   normal: {
            //     show: true,
            //     position: "top",
            //     color: "#333"
            //   }
            // }
          }
        ]
      };
      this.initData(lineCharts, option);
      lineCharts.setOption(option);
    },
    // 获取辖区情况数据
    getAreaData() {
      apis.GET_AREA_DATA().then(res => {
        if (res.code === 200) {
          // console.log(res);
          this.areaData = res.data;
          this.handleAreaData(this.areaData.stateResultList);
          this.drawBarCharts();
        }
      });
    },
    // 辖区类型切换
    selectType(val) {
      let data = null;
      switch (val) {
        case "人员状态":
          data = this.areaData.stateResultList;
          break;
        case "五位一体":
          data = this.areaData.fiveOnePropertyResultList;
          break;
        default:
          break;
      }
      this.handleAreaData(data);
      this.drawBarCharts();
    },
    // 辖区图配置
    drawBarCharts() {
      var barCharts = this.$echarts.init(document.getElementById("barCharts"));
      var option = {
        title: {
          // text: 'ECharts 入门示例'
        },
        tooltip: {},
        // legend: {
        //   data: ["通过审核的图谱数"],
        //   y:"bottom"
        // },
        xAxis: {
          data: this.areaType
        },
        yAxis: {
          minInterval: 1
        },
        series: [
          {
            type: "bar",
            data: this.areaCount,
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = {
                    社会面: "#008800",
                    收押: "#cb4324",
                    收教: "#f7b940",
                    境外: "#ffe900",
                    死亡: "#6B6B6B",
                    去向不明: "#0000fe",
                    无: "#8cb8be",
                    政: "#666666",
                    宗: "#008000",
                    商: "#f49e00",
                    恐: "#333333",
                    黑: "#999999"
                  };
                  return colorList[params.name];
                }
              }
            },
            barWidth: "50%",
            barMaxWidth: 60,
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#333"
              }
            }
          }
        ]
      };
      this.initData(barCharts, option);
      barCharts.setOption(option);
    },
    // 辖区数据处理
    handleAreaData(data) {
      this.areaType = [];
      this.areaCount = [];
      data.forEach(ele => {
        this.areaType.push(ele.name);
        this.areaCount.push(ele.count);
      });
    },
    showVerifyDialog() {
      this.visible = true;
    },
    // 跳转到报送审核-未提交
    toUncommittedPage() {
      this.$bus.$emit("currentPage", 0);
    },
    // 跳转到报送审核-审核中
    toAuditPage() {
      this.$bus.$emit("currentPage", 2);
    },
    // 跳转到报送审核-已退回
    toBackPage() {
      this.$bus.$emit("currentPage", 3);
    },
    // 看板采集图谱类型跳转到图谱管理中
    handleToPage(item) {
      this.$bus.$emit("currentType", item.id);
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
.shortTag {
  display: inline-block;
  padding: 1px 3px;
  border-radius: 3px;
  color: #fff;
  margin-right: 6px;
}
</style>
