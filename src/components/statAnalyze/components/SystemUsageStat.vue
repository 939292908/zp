<!--
 * @Author: your name
 * @Date: 2019-10-31 14:07:41
 * @LastEditTime : 2019-12-27 10:04:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\performanceStat.vue
 -->
<template>
  <!-- 人员绩效统计 -->
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">系统使用统计</h2>
    </div>
    <div class="condition-box">
      <div class="search-row">
        <div class="search-label">统计选择：</div>
        <div class="search-control" style="margin-right:10px">
          <tree-filter
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
        </div>
        <div class="search-label">采集人员：</div>
        <div class="search-control">
          <Input style="width:220px" v-model="filters.userNameOrAccount" placeholder="请输入民警的姓名、警号"></Input>
        </div>
      </div>
      <div class="search-row time">
        <div class="search-label">时间选择：</div>
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
    <div class="mapManagemen-content">
      <div class="con-header">
        <span class="tpList">系统使用统计列表</span>
        <div class="table-header">
          <!-- <Select v-model="filters.category" style="width:200px" placeholder="分类查询">
            <Option
              v-for="item in categoryList"
              :value="item.value"
              :key="item.value"
            >{{ item.name }}</Option>
          </Select>-->
          <Button @click="downloadBtnClick" size="small" :loading="loadingBtn">
            <span v-if="!loadingBtn">数据导出</span>
            <span v-else>正在导出</span>
            <i class="iconfont icon-shangchuan icon-daochu"></i>
          </Button>
        </div>
      </div>
      <!-- 表 -->
      <div class="tableContent">
        <stat-table
          :tableDatas="tableDatas"
          :getExcelFn="handleExportData"
          :pageInfo="pageInfo"
          :handlePageChange="handlePageChange"
        ></stat-table>
      </div>
      <!-- loading -->
      <!-- <loading color="white" v-model="loadingShow"></loading> -->
    </div>
    <loading color="white" v-model="loadingShow"></loading>
  </div>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as comApis from "@/api/common.js";
import StatTable from "./assembly/StatTable";
import * as apis from "@/api/mapJoin/index.js";
import * as tool from "../../../tools/units.js";
import Loading from "@/components/assembly/Loading";

export default {
  name: "SystemUsageStat",
  data() {
    return {
      loadingShow: false,
      filters: {
        cityTreeData: null,
        belongDeptDisplayName: "",
        deptCode: "",
        deptPath: "",
        time: "2", //采集时间选择
        startTime: "", //采集开始时间
        endTime: "", //采集结束时间
        userNameOrAccount: "", //采集人姓名或警号
        category: "", //分类
        concreteTime: "00:00:00" //具体的时间
      },
      startTimeOption: {},
      endTimeOption: {},
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
      optionConfig: OPTIONS_LIST,
      detpTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      categoryList: [
        { name: "7日无登录用户", value: 0 },
        { name: "15日无登录用户", value: 1 },
        { name: "30日无登录用户", value: 2 },
        { name: "7日无图谱采集用户", value: 3 },
        { name: "15日无图谱采集用户", value: 4 }
      ],
      loadingBtn: false,
      deptApis: comApis.GET_DEPT_TREE_INFO,
      rankingColor: ["#F2411F", "#F9861D", "#FFCC00"],
      pageInfo: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        maxValue: 0
      },
      tableDatas: [
        {
          serialNumber: 0,
          userName: "",
          userCode: "",
          deptName: "",
          lastLoginTime: "",
          loginTimes: 0,
          collectTimes: 0,
          queryTimes: 0,
          totals: 0
        }
      ], //图谱汇总统计
      // tableHeight: 480
      dataForward: 0,
      nowDate: new Date()
    };
  },
  created() {},
  components: {
    TreeFilter,
    StatTable,
    Loading
  },
  computed: {
    perMaxWidth() {
      return this.perActivityList ? this.perActivityList[0].activeValue : 0;
    },
    unitMaxWidth() {
      return this.unitActivityList ? this.unitActivityList[0].activeValue : 0;
    }
  },
  mounted() {
    this.getConcreteTime();
  },
  methods: {
    init() {
      let params = this.setParams();
      this.getSystemUsageStatData(params);
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
        this.getWeek();
        let data =
          this.dataForward == -1
            ? this.nowDate
            : new Date(this.nowDate.getTime() + 86400000);
        this.filters.endTime =
          this.$moment(data).format("YYYY-MM-DD") + this.filters.concreteTime;
        this.onStartTimeChange(this.filters.startTime);
        this.onEndTimeChange(this.filters.endTime);
        this.init();
      });
    },
    setParams() {
      return {
        code: this.filters.deptCode || null,
        monthType: this.filters.time || null,
        tierPath: this.filters.deptPath || null,
        timeFrom: this.filters.startTime
          ? this.$moment(this.filters.startTime).format("YYYY-MM-DD HH:mm:ss")
          : null,
        timeTo: this.filters.endTime
          ? this.$moment(this.filters.endTime).format("YYYY-MM-DD HH:mm:ss")
          : null,
        pageIndex: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        userNameOrAccount: this.filters.userNameOrAccount || null
      };
    },
    // 查看条件筛选
    handleSearch() {
      this.init();
    },
    // 刷新条件
    handleRefresh() {
      this.filters = {
        cityTreeData: null,
        belongDeptDisplayName: "",
        deptCode: "",
        deptPath: "",
        time: "", //采集时间选择
        startTime: "", //采集开始时间
        endTime: "", //采集结束时间
        userNameOrAccount: "", //采集人姓名或警号
        category: "", //分类
        concreteTime: "00:00:00" //具体的时间
      };
      this.pageInfo = {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        maxValue: 0
      };
      this.onStartTimeChange(this.filters.startTime);
      this.onEndTimeChange(this.filters.endTime);
      this.init();
    },
    // 选择归属部门信息
    handleDeptSelectChange(cur) {
      this.filters.deptCode = cur.code;
      this.filters.deptPath = cur.deptPath;
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.deptPath = "";
        this.filters.deptCode = "";
      }
    },
    // 起始时间变化
    onStartTimeChange(startTime, type) {
      this.endTimeOption = {
        disabledDate(endTime) {
          return (
            endTime < new Date(startTime) ||
            endTime > Date.now() ||
            endTime > new Date(new Date(startTime).getTime() + 29 * 86400000)
          );
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(endTime, type) {
      this.startTimeOption = {
        disabledDate(startTime) {
          return (
            startTime < new Date(new Date(endTime).getTime() - 30 * 86400000) ||
            startTime > new Date(endTime) ||
            startTime > Date.now()
          );
        }
      };
    },
    // 获取个人活跃度排名情况
    getPersonalActivityData(params) {},
    // 获取单位活跃度排名情况
    getUnitActivityData(params) {},
    // 获取系统使用统计列表
    getSystemUsageStatData(params) {
      this.loadingShow = true;
      apis.POST_SYSTEMUSAGE_STAT_LIST(params).then(res => {
        if (res.code === 200) {
          this.loadingShow = false;
          this.pageInfo.total = res.data.total;
          this.tableDatas = res.data.data;
          this.pageInfo.pageIndex = res.data.pageIndex;
          this.pageInfo.maxValue = res.data.maxValue;
          res.data.data.forEach((val, index) => {
            val.serialNumber = index + 1 + (this.pageInfo.pageIndex - 1) * 10;
          });
        } else {
          this.loadingShow = false;
        }
      });
    },
    // 区域单位树切换
    changeArea(val) {},
    // 统计看板数据导出
    handleExportData() {
      let params = this.setParams();
      return apis.POST_SYSTEMUSEING_EXPOT_DATA(params).then(res => {
        let name = `系统使用统计-${this.$moment().format(
          "YYYY-MM-DD"
        )}-${Math.ceil(Math.random() * 1000000000)}.xlsx`;
        // 响应结果乱码，设置blob请求头，接收；下面再把blob转一下
        tool.getExcelByBlob(res, name);
      });
    },
    // 下载按钮click事件
    downloadBtnClick() {
      this.loadingBtn = true;
      this.handleExportData()
        .then(res => {
          this.loadingBtn = false;
        })
        .catch(error => {
          this.loadingBtn = false;
        });
    },
    // 分页Change事件
    handlePageChange(index) {
      this.pageInfo.pageIndex = index;
      this.init();
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
    }
  }
};
</script>

<style lang="less" scoped>
.table-header {
  text-align: right;
  /deep/.ivu-select {
    text-align: left;
  }
  .ivu-btn {
    float: right;
    margin-bottom: 14px;
  }
  .icon-daochu {
    position: relative;
    top: 2px;
    left: 2px;
    color: #0668c8;
    font-weight: 700;
  }
}
/deep/.dept-dropdown {
  width: 220px !important;
}
</style>
