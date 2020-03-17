<!--
 * @Author: your name
 * @Date: 2019-10-31 13:49:11
 * @LastEditTime : 2019-12-24 16:26:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\Dashboard.vue
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">统计看板</h2>
    </div>
    <div class="condition-box">
      <div class="search-row">
        <div class="search-label">统计选择：</div>
        <div class="search-control">
          <RadioGroup v-model="filters.area" @on-change="changeArea">
            <Radio :key="index" v-for="(item,index) in areaList" :label="item.value">{{item.name}}</Radio>
          </RadioGroup>
        </div>
        <div class="search-control">
          <tree-filter
            v-if="filters.area=='1'"
            :apiKey="optionConfig.CURRENT_TOKEN_DEPT_TREE"
            ref="deptTree"
            select-type="all"
            :tree-props="detpTreeProps"
            v-model="filters.belongDeptDisplayName"
            placeholder="请选择单位"
            :apiFun="deptApis"
            @on-select-change="handleDeptSelectChange"
            @on-clear="handleDeptPath"
          ></tree-filter>
          <tree-filter
            v-if="filters.area=='2'"
            :apiKey="optionConfig.CITY_AREA_TREE"
            :apiParams="cityParams"
            ref="deptTree"
            select-type="all"
            :tree-props="cityTreeProps"
            v-model="filters.belongDeptDisplayName"
            placeholder="请选择区域"
            :apiFun="cityApis"
            @on-select-change="handleDeptSelectChange"
            @on-clear="handleDeptPath"
          ></tree-filter>
        </div>
      </div>
      <div class="search-row time">
        <div class="search-label">采集时间：</div>
        <div class="search-control">
          <RadioGroup v-model="filters.time" @on-change="handleCheckTime">
            <Radio :key="index" v-for="(item,index) in timeList" :label="item.value">{{item.name}}</Radio>
          </RadioGroup>
        </div>
        <span class="line">|</span>
        <div class="search-control">
          <DatePicker
            type="datetime"
            placeholder="开始时间"
            v-model="filters.startTime"
            @on-change="onStartTimeChange"
            :options="startTimeOption"
          ></DatePicker>
          <span>至</span>
          <DatePicker
            type="datetime"
            placeholder="结束时间"
            v-model="filters.endTime"
            @on-change="onEndTimeChange"
            :options="endTimeOption"
          ></DatePicker>
        </div>
        <Button type="primary" @click="handleSearch">查看</Button>
        <Button @click="handleRefresh">刷新</Button>
      </div>
    </div>
    <div class="content-panel">
      <div class="tp-box">
        <div class="tp-list">
          <div class="box-header">
            <span>图谱采集统计</span>
          </div>
          <div class="stat-content">
            <pie-echart id="tpStatEchart" ref="tpStatEchart" :data="tpStatData"></pie-echart>
          </div>
        </div>
        <div class="tp-list">
          <div class="box-header">
            <span>
              单位绩效排名
              <i class="remark">（图谱审核完成）</i>
            </span>
          </div>
          <div class="stat-list-content">
            <div class="ranking-list" v-if="hasChild">
              <div class="list" v-for="(item,index) in performanceList" :key="index">
                <span
                  :style="{'background-color':rankingColor[index]}"
                  class="ranking-icon"
                >{{index+1}}</span>
                <p class="ranking-cont">
                  <span class="detpName" @click="handlePage(item)">{{item.name}}</span>
                  <span>{{item.count | format}}</span>
                </p>
              </div>
            </div>
            <p v-if="!hasChild" class="hint">{{hasChildMsg}}</p>
          </div>
        </div>
      </div>
      <div class="tp-box">
        <div class="tp-list">
          <div class="box-header">
            <span>覆盖人员采集统计</span>
            <i class="remark">（人数：{{coverNumber | format}}）</i>
          </div>
          <div class="stat-content">
            <!-- <pie-echart id="personStatEchart" ref="personStatEchart" :data="personStatData"></pie-echart> -->
            <bar-echart
              id="personStatEchart"
              ref="personStatEchart"
              :data="personStatData"
              :colorList="$config.topTagColors"
            ></bar-echart>
          </div>
        </div>
        <div class="tp-list">
          <div class="box-header">
            <span>
              覆盖人员情况
              <i v-if="coverType=='0'" class="remark">（人数：{{coverNumber | format}}）</i>
            </span>
            <RadioGroup
              size="small"
              type="button"
              class="timing-btns"
              v-model="coverType"
              @on-change="selectType"
            >
              <Radio
                :key="index"
                v-for="(item,index) in coverTypeList"
                :label="item.value"
              >{{item.name}}</Radio>
            </RadioGroup>
          </div>
          <div class="stat-list-content">
            <bar-echart
              id="coversPerStatEchart"
              ref="coversPerStatEchart"
              :data="barData"
              :colorList="personStatColor"
            ></bar-echart>
          </div>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box">
        <div class="table-title">
          <span class="title">
            图谱状态统计
            <i class="remark">（{{tpCollectArea}}）</i>
          </span>
          <!-- <Button class="deriveBtn">数据导出</Button> -->
        </div>
        <div class="table-box">
          <map-state-table
            :data="stateTableData"
            :height="tableHeight"
            :getExcelFn="handleStateExportData"
            @on-click="handleToStatePage"
          ></map-state-table>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box">
        <div class="table-title">
          <span class="title">
            图谱汇总统计
            <i class="remark">（{{tpCollectArea}}）</i>
          </span>
          <!-- <Button class="deriveBtn">数据导出</Button> -->
        </div>
        <div class="table-box">
          <map-table
            :tableDatas="tableDatas"
            :page="false"
            :height="tableHeight"
            :getExcelFn="handleExportData"
            @on-click="handleToPage"
          ></map-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import Loading from "@/components/assembly/Loading";
import * as comApis from "@/api/common.js";
import PieEchart from "./assembly/statPieEcharts";
import BarEchart from "./assembly/statBarEcharts";
import MapTable from "./assembly/MapTable";
import MapStateTable from "./assembly/MapStateTable";
import * as apis from "@/api/mapJoin/index.js";
import * as tool from "../../../tools/units.js";
export default {
  name: "Dashboard",
  data() {
    return {
      filters: {
        area: "1", //统计区域选择
        cityTreeData: null,
        belongDeptDisplayName: "",
        deptCode: "",
        deptPath: "",
        time: "", //采集时间选择
        startTime: "", //采集开始时间
        endTime: "", //采集结束时间
        concreteTime: "00:00:00" //具体的时间
      },
      cityParams: { dataAuth: 1 },
      startTimeOption: {},
      endTimeOption: {},
      areaList: [
        // {
        //   value: "2",
        //   name: "按区域"
        // },
        {
          value: "1",
          name: "按单位"
        }
      ],
      timeList: [
        {
          value: "1",
          name: "当天"
        },
        {
          value: "2",
          name: "本周"
        },
        {
          value: "3",
          name: "本月"
        }
      ],
      coverType: "0",
      coverTypeList: [
        {
          value: "0",
          name: "人员状态"
        },
        {
          value: "1",
          name: "五位一体"
        }
      ],
      optionConfig: OPTIONS_LIST,
      detpTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      cityTreeProps: {
        children: "childAreaList",
        title: "displayName",
        id: "id"
      },
      deptApis: comApis.GET_DEPT_TREE_INFO,
      cityApis: comApis.GET_AREA_TREE_INFO,
      tpCollectArea: "", //图谱汇总统计地区
      coverNumber: 0,
      tpStatData: {
        total: 0,
        region: "图谱数",
        label: [],
        chartData: []
      },
      // personStatData: {
      //   total: 0,
      //   region: "人员数",
      //   label: [],
      //   chartData: []
      // },
      personStatData: [],
      performanceList: [],
      rankingColor: ["#F2411F", "#F9861D", "#FFCC00"],
      barData: [],
      tableList: [],
      tableDatas: {
        title: "单位名称",
        pageInfo: {
          total: 600,
          pageIndex: 1,
          pageSize: 10
        },
        data: [
          {
            deptName: "总计",
            totalDTO: { rytotal: 0, tptotal: 0 },
            RY2: 0,
            RY4: 0,
            RY5: 0,
            RY6: 0,
            RY8: 0,
            RY9: 0,
            RY10: 0,
            TP2: 0,
            TP4: 0,
            TP5: 0,
            TP6: 0,
            TP8: 0,
            TP9: 0,
            TP10: 0
          }
        ]
      }, //图谱汇总统计
      stateTableData: [], //图谱状态统计
      tableHeight: 480,
      personStatColor: {
        社会面: "#008800",
        收押: "#cb4324",
        收教: "#f7b940",
        境外: "#ffe900",
        死亡: "#6B6B6B",
        去向不明: "#0000fe",
        空: "#8cb8be",
        政: "#666666",
        宗: "#008000",
        商: "#f49e00",
        恐: "#333333",
        黑: "#999999"
      },
      nowDate: new Date(),
      dataForward: 0,
      hasChild: true,
      hasChildMsg: ""
    };
  },
  filters: {
    format(val) {
      return val.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
    }
  },
  components: {
    TreeFilter,
    PieEchart,
    BarEchart,
    MapTable,
    MapStateTable
  },
  created() {
    let path = this.$route.query.query;
    if (path) {
      var data = sessionStorage.getItem(path);
      this.filters = JSON.parse(data);
      // this.filters.belongDeptDisplayName = this.filters.deptName;
      this.init();
    }
  },
  mounted() {
    let me = this;
    this.getConcreteTime();
    this.init();
    this.onStartTimeChange(this.filters.startTime);
    this.onEndTimeChange(this.filters.endTime);
  },
  methods: {
    init() {
      let params = this.setParams();
      this.getTpStatData(params);
      this.getCoverPerStatStateData(params);
      this.getDetpPerformanceData(params);
      this.getCoverPersonCollectData(params);
      this.getTpSummaryStatData(params);
      this.getCoverPerTotal(params);
      this.getMapstateData(params);
    },
    setParams() {
      return {
        areaOrDept: this.filters.area,
        code: this.filters.deptCode || null,
        monthType: this.filters.time || null,
        tierPath: this.filters.deptPath || null,
        timeFrom: this.filters.startTime
          ? this.$moment(this.filters.startTime).format("YYYY-MM-DD HH:mm:ss")
          : null,
        timeTo: this.filters.endTime
          ? this.$moment(this.filters.endTime).format("YYYY-MM-DD HH:mm:ss")
          : null
      };
    },
    // 获取具体的时间段
    getConcreteTime() {
      apis.GET_RELEVANCE_TP_INFO().then(res => {
        if (res.code === 200) {
          this.dataForward = res.data.dataForward;
          this.filters.concreteTime =
            res.data.dataForward == -1
              ? " " + res.data.dataValue + ":00"
              : " 00:00:00";
        }
      });
    },
    // 查看条件筛选
    handleSearch() {
      this.init();
    },
    // 刷新条件
    handleRefresh() {
      this.filters = {
        area: "1", //统计区域选择
        cityTreeData: null,
        belongDeptDisplayName: "",
        deptCode: "",
        deptPath: "",
        time: "", //采集时间选择
        startTime: "", //采集开始时间
        endTime: "" //采集结束时间
      };
      this.init();
    },
    // 选择归属部门信息
    handleDeptSelectChange(cur) {
      this.filters.deptCode = cur.code;
      this.filters.deptPath = cur.deptPath;
      return cur;
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.deptPath = "";
        this.filters.deptCode = "";
        // this.pagination.pageIndex = 1;
        // this.getMapManagerResult();
      }
    },
    // 起始时间变化
    onStartTimeChange(startTime, type) {
      // this.filters.startTime = startTime
      //   ? this.$moment(startTime).format("YYYY-MM-DD")
      //   : "";
      // this.pagination.pageIndex = 1;
      // this.getMapManagerResult();
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime) - 8.64e7 || endTime > Date.now();
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(endTime, type) {
      // this.filters.endTime = endTime
      //   ? this.$moment(endTime).format("YYYY-MM-DD")
      //   : "";
      // this.pagination.pageIndex = 1;
      // this.getMapManagerResult();
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now();
        }
      };
    },
    // 获取图谱状态统计
    getMapstateData(params) {
      let me = this;
      apis.POST_MAP_STATE_DATA(params).then(res => {
        if (res.code == 200) {
          me.stateTableData = res.data;
          if (me.filters.belongDeptDisplayName == "") {
            this.$store
              .dispatch("getOptionsByKey", {
                key: OPTIONS_LIST.DEPT_TREE,
                apiFun: this.deptApis,
                validParams: false,
                params: null
              })
              .then(response => {
                me.tpCollectArea = response.displayName;
              });
          } else {
            let area = me.filters.belongDeptDisplayName.split("/");
            me.tpCollectArea = area[area.length - 1];
          }
        }
      });
    },
    // 获取图谱采集统计
    getTpStatData(params) {
      apis.POST_TP_COLLECT_STATE_DATA(params).then(res => {
        if (res.code === 200) {
          this.tpStatData.chartData = res.data;
          this.tpStatData.total = 0;
          this.tpStatData.chartData.forEach(x => {
            this.tpStatData.total += x.count;
            x.name = x.typeName;
            x.value = x.count;
          });

          this.$refs.tpStatEchart.initDate();
        }
      });
    },
    // 获取覆盖人员采集统计
    getCoverPersonCollectData(params) {
      apis.POST_COVER_PERSON_COLLECT_DATA(params).then(res => {
        if (res.code === 200) {
          this.personStatData = res.data;
          // this.personStatData.total = 0;
          // this.personStatData.chartData.forEach(x => {
          //   this.personStatData.total += x.count;
          //   x.name = x.typeName;
          //   x.value = x.count;
          // });
          this.$nextTick(() => {
            this.$refs.personStatEchart.drawBarCharts();
          });
        }
      });
    },
    // 获取覆盖人员情况(五位一体)
    getCoverPerStatFiveData(params) {
      apis.POST_COVER_PERSON_FIVE_DATA(params).then(res => {
        if (res.code === 200) {
          this.barData = res.data;
          this.$nextTick(() => {
            this.$refs.coversPerStatEchart.drawBarCharts();
          });
        }
      });
    },
    // 获取覆盖人员情况(人员状态)
    getCoverPerStatStateData(params) {
      apis.POST_COVER_PERSON_STATE_DATA(params).then(res => {
        if (res.code === 200) {
          this.barData = res.data;
          this.$nextTick(() => {
            this.$refs.coversPerStatEchart.drawBarCharts();
          });
        }
      });
    },
    // 获取覆盖人员总数
    getCoverPerTotal(params) {
      apis.POST_COVER_PERSON_TOTAL_DATA(params).then(res => {
        if (res.code === 200) {
          this.coverNumber = res.data;
        }
      });
    },
    // 获取单位采集绩效排名情况
    getDetpPerformanceData(params) {
      apis.POST_TP_COLLECT_PERFORMANCE_DATA(params).then(res => {
        if (res.code === 200) {
          this.performanceList = res.data;
          this.hasChild = true;
        } else {
          this.hasChild = false;
          this.hasChildMsg = res.msg;
        }
      });
    },
    // 辖区类型切换
    selectType(val) {
      let params = this.setParams();
      switch (val) {
        case "0":
          this.getCoverPerStatStateData(params);
          break;
        case "1":
          this.getCoverPerStatFiveData(params);
          break;
        default:
          break;
      }
    },
    // 获取图谱汇总统计数据
    getTpSummaryStatData(params) {
      let me = this;
      apis.POST_TP_SUMMARY_STATE_DATA(params).then(res => {
        if (res.code === 200) {
          let obj = {
            rytotal: res.data[0].rytotal,
            tptotal: res.data[0].tptotal
          };
          res.data[0].totalDTO = obj;
          let ryArr = [];
          let tpArr = [];
          let arr = res.data.slice(1);
          arr.forEach(x => {
            for (var key in x) {
              if (key.indexOf("rytotal") != -1) {
                ryArr.push(x[key]);
              }
              if (key.indexOf("tptotal") != -1) {
                tpArr.push(x[key]);
              }
            }
          });
          res.data[0].maxPersonValue = Math.max(...ryArr);
          res.data[0].maxMapValue = Math.max(...tpArr);
          me.tableDatas.data = res.data.sort((a, b) => {
            return b.tptotal - a.tptotal;
          });
          if (me.filters.belongDeptDisplayName == "") {
            this.$store
              .dispatch("getOptionsByKey", {
                key: OPTIONS_LIST.DEPT_TREE,
                apiFun: this.deptApis,
                validParams: false,
                params: null
              })
              .then(response => {
                me.tpCollectArea = response.displayName;
              });
          } else {
            let area = me.filters.belongDeptDisplayName.split("/");
            me.tpCollectArea = area[area.length - 1];
          }
        }
      });
    },
    // 区域单位树切换
    changeArea(val) {
      this.filters.belongDeptDisplayName = "";
    },

    // 统计看板数据导出
    handleExportData() {
      let params = this.setParams();
      return apis.POST_DASH_EXPOT_DATA(params).then(res => {
        let name = `图谱汇总统计-${this.$moment().format(
          "YYYY-MM-DD"
        )}-${Math.ceil(Math.random() * 1000000000)}.xlsx`;
        // 响应结果乱码，设置blob请求头，接收；下面再把blob转一下
        tool.getExcelByBlob(res, name);
      });
    },
    // 图谱状态统计数据导出
    handleStateExportData() {
      let params = this.setParams();
      return apis.POST_MAP_STATE_DASH_EXPOT_DATA(params).then(res => {
        let name = `图谱状态统计-${this.$moment().format(
          "YYYY-MM-DD"
        )}-${Math.ceil(Math.random() * 1000000000)}.xlsx`;
        // 响应结果乱码，设置blob请求头，接收；下面再把blob转一下
        tool.getExcelByBlob(res, name);
      });
    },
    // 获取当天时间
    getToday() {
      let data =
        this.dataForward == -1
          ? new Date(this.nowDate.getTime() - 86400000)
          : this.nowDate;
      this.filters.startTime =
        this.$moment(data).format("YYYY-MM-DD") + this.filters.concreteTime;
    },
    // 获取本周的时间
    getWeek() {
      var weekFirstDay =
        this.dataForward == -1
          ? new Date(this.nowDate - this.nowDate.getDay() * 86400000)
          : new Date(this.nowDate - (this.nowDate.getDay() - 1) * 86400000);
      this.filters.startTime =
        this.$moment(weekFirstDay).format("YYYY-MM-DD") +
        this.filters.concreteTime;
    },
    // 获取本月时间
    getMouth() {
      // var monthFirstDay = new Date(
      //   this.nowDate.getFullYear(),
      //   this.nowDate.getMonth(),
      //   1
      // );
      var monthFirstDay =
        this.dataForward == -1
          ? new Date(this.nowDate - this.nowDate.getDate() * 86400000)
          : new Date(this.nowDate - (this.nowDate.getDate() - 1) * 86400000);
      this.filters.startTime =
        this.$moment(monthFirstDay).format("YYYY-MM-DD") +
        this.filters.concreteTime;
    },
    handleCheckTime(val) {
      switch (val) {
        case "1":
          this.getToday();
          break;
        case "2":
          this.getWeek();
          break;
        case "3":
          this.getMouth();
          break;
        default:
          break;
      }
      let data =
        this.dataForward == -1
          ? this.nowDate
          : new Date(this.nowDate.getTime() + 86400000);
      this.filters.endTime =
        this.$moment(data).format("YYYY-MM-DD") + this.filters.concreteTime;
      this.onStartTimeChange(this.filters.startTime);
      this.onEndTimeChange(this.filters.endTime);
    },
    // 点击排名跳转
    handlePage(row) {
      if (row) {
        let filter = {
          area: this.filters.area, //统计区域选择
          cityTreeData: this.filters.cityTreeData,
          belongDeptDisplayName: row.name,
          deptCode: row.code,
          deptPath: row.path,
          time: this.filters.time, //采集时间选择
          startTime: this.filters.startTime, //采集开始时间
          endTime: this.filters.endTime, //采集结束时间
          concreteTime: this.filters.concreteTime //具体的时间
        };
        tool.transferParameters(
          this,
          "/statAnalyze/dashboard",
          JSON.stringify(filter)
        );
        if (this.$route.query.query) {
          sessionStorage.removeItem(this.$route.query.query);
        }
      }
    },
    handleToPage(row) {
      if (row) {
        let filter = {
          area: this.filters.area, //统计区域选择
          cityTreeData: this.filters.cityTreeData,
          belongDeptDisplayName: row.deptName,
          deptCode: row.deptCode,
          deptPath: row.deptPath,
          time: this.filters.time, //采集时间选择
          startTime: this.filters.startTime, //采集开始时间
          endTime: this.filters.endTime, //采集结束时间
          concreteTime: this.filters.concreteTime //具体的时间
        };
        // this.filters.deptCode = row.deptCode;
        // this.filters.deptPath = row.deptPath;
        // this.filters.deptName = row.deptName;
        tool.transferParameters(
          this,
          "/statAnalyze/dashboard",
          JSON.stringify(filter)
        );
        if (this.$route.query.query) {
          sessionStorage.removeItem(this.$route.query.query);
        }
      }
    },
    handleToStatePage(row) {
      if (row) {
        let filter = {
          area: this.filters.area, //统计区域选择
          cityTreeData: this.filters.cityTreeData,
          belongDeptDisplayName: row.deptName,
          deptCode: row.deptCode,
          deptPath: row.deptPath,
          time: this.filters.time, //采集时间选择
          startTime: this.filters.startTime, //采集开始时间
          endTime: this.filters.endTime, //采集结束时间
          concreteTime: this.filters.concreteTime //具体的时间
        };
        // this.filters.deptCode = row.deptCode;
        // this.filters.deptPath = row.deptPath;
        // this.filters.deptName = row.deptName;
        tool.transferParameters(
          this,
          "/statAnalyze/dashboard",
          JSON.stringify(filter)
        );
        if (this.$route.query.query) {
          sessionStorage.removeItem(this.$route.query.query);
        }
      }
    }
  },
  watch: {
    // $route: {
    //   handler: function(val) {
    //     if (val.query.filter == "true") {
    //       this.receiveMsg();
    //     }
    //   },
    //   // 深度观察监听
    //   deep: true,
    //   immediate: true
    // }
  }
};
</script>

<style lang="less" scoped>
.stat-list-content {
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
  padding: 0 20px;
  .ranking-list {
    .list {
      border-bottom: 1px dashed #e3e3e3;
      height: 44px;
      display: flex;
      align-items: center;
      &:nth-child(-n + 3) .ranking-icon {
        color: #fff;
      }
      .ranking-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 2px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        margin-right: 15px;
      }

      .ranking-cont {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        width: 100%;
        .detpName {
          cursor: pointer;
        }
      }
    }
  }
}
/deep/.ivu-radio-group-button .ivu-radio-wrapper-checked,
.ivu-radio-group-button .ivu-radio-wrapper:hover {
  color: #fff;
  background-color: #3985ed;
}
.timing-btns {
  position: absolute;
  right: 24px;
  top: 0;
}

/deep/.dept-dropdown {
  width: 300px !important;
}
.hint {
  color: #ccc;
  text-align: center;
  line-height: 200px;
}
</style>
