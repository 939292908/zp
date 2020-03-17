<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">每日采集情况统计看板</h2>
    </div>
    <div class="condition-box">
      <div class="search-row">
        <div class="search-label">单位选择：</div>
        <div class="search-control">
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
      </div>
      <div class="search-row time">
        <div class="search-label">统计时间：</div>
        <div class="search-control">
          <RadioGroup v-model="filters.time" @on-change="handleCheckTime">
            <Radio :key="index" v-for="(item,index) in timeList" :label="item.value">{{item.name}}</Radio>
          </RadioGroup>
        </div>
        <span class="line">|</span>
        <div class="search-control">
          <DatePicker
            type="daterange"
            placeholder="请选择日期"
            v-model="filters.daterange"
            :options="daterangeOption"
            @on-change="handleTime"
            style="width: 200px"
          ></DatePicker>
        </div>
        <Button type="primary" @click="handleSearch">查看</Button>
        <Button @click="handleRefresh">刷新</Button>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box stat-box">
        <div class="panel-title">
          <span>图谱采集总览</span>
        </div>
        <div class="panel-echart">
          <StackBarEcharts ref="tpPandectEchart" id="tpPandectEchart" :data="tpPandectData"></StackBarEcharts>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box stat-box">
        <div class="panel-title">
          <span>采集图谱类型</span>
        </div>
        <div class="panel-echart">
          <statManyBarEcharts
            ref="collectTypeEchart"
            id="collectTypeEchart"
            :data="collectTypeData"
          ></statManyBarEcharts>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box stat-box">
        <div class="panel-title">
          <span>单位图谱采集对比</span>
        </div>
        <div class="panel-echart">
          <statLineEcharts ref="deptCollectEchart" id="deptCollectEchart" :data="deptCollectData"></statLineEcharts>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box stat-box">
        <div class="panel-title">
          <span>单位登录次数对比</span>
        </div>
        <div class="panel-echart">
          <statLineEcharts ref="deptLoginsEchart" id="deptLoginsEchart" :data="deptLoginsData"></statLineEcharts>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="panel-box">
        <div class="table-title">
          <div class="title-box">
            <span class="title">图谱登录情况统计</span>
            <i class="remark">（{{tpCollectArea}}）</i>
          </div>
          <div class="activeBtn-box">
            <div class="search-control">
              <DatePicker
                type="daterange"
                placeholder="请选择日期"
                v-model="loginFilters.daterange"
                :options="daterangeOption"
                @on-change="handleLoginTime"
                style="width: 200px"
              ></DatePicker>
              <Button type="primary" @click="handleLoginSearch">查看</Button>
              <Button @click="handleLoginRefresh">刷新</Button>
              <Button @click="downloadBtnClick" size="small" :loading="loadingBtn">
                <span v-if="!loadingBtn">数据导出</span>
                <span v-else>正在导出</span>
                <i class="iconfont icon-shangchuan icon-daochu"></i>
              </Button>
            </div>
          </div>
        </div>
        <div class="table-box login-table">
          <LoginTable :height="tableHeight" :tableDatas="tableDatas" @on-click="handleToPage"></LoginTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/mapJoin/index.js";
import * as tool from "../../../tools/units.js";
import StackBarEcharts from "./assembly/StackBarEcharts";
import StatManyBarEcharts from "./assembly/statManyBarEcharts";
import StatLineEcharts from "./assembly/statLineEcharts";
import LoginTable from "./assembly/LoginTable";
export default {
  name: "DailyCollectionStat",
  data() {
    return {
      filters: {
        cityTreeData: null,
        belongDeptDisplayName: "",
        deptCode: "",
        deptPath: "",
        time: "1", //采集时间选择
        daterange: [new Date(new Date().getTime() - 86400000 * 6), new Date()], //日期间隔
        startTime: new Date(new Date().getTime() - 86400000 * 6), //采集开始时间
        endTime: new Date() //采集结束时间
        // concreteTime: "00:00:00" //具体的时间
      },
      loginFilters: {
        daterange: [new Date(), new Date()], //日期间隔
        startTime: new Date(), //采集开始时间
        endTime: new Date() //采集结束时间
      },
      cityParams: { dataAuth: 1 },
      startTimeOption: {},
      endTimeOption: {},
      daterangeOption: {
        disabledDate(date) {
          return date > Date.now();
        }
      },
      timeList: [
        {
          value: "1",
          name: "7日"
        },
        {
          value: "2",
          name: "15日"
        },
        {
          value: "3",
          name: "30日"
        }
      ],
      optionConfig: OPTIONS_LIST,
      detpTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      deptApis: comApis.GET_DEPT_TREE_INFO,
      tpCollectArea: "",
      barData: [],
      tableList: [],
      tableHeight: 600,
      tpPandectData: {},
      collectTypeData: {},
      deptCollectData: {},
      deptLoginsData: {},
      tableDatas: [],
      loadingBtn: false
    };
  },
  components: {
    TreeFilter,
    StackBarEcharts,
    StatManyBarEcharts,
    StatLineEcharts,
    LoginTable
  },
  mounted() {
    let me = this;
    // this.getConcreteTime();
    this.init();
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
  methods: {
    init() {
      let params = this.setParams();
      this.getTpCollectPandectData(params);
      this.getCollectTypeData(params);
      this.getDeptCollectData(params);
      this.getDeptLoginsData(params);
      let loginParams = this.setLoginParams();
      this.getTpLoginsStatData(loginParams);
    },
    setParams() {
      return {
        deptPath: this.filters.deptPath || null,
        timeFrom: this.filters.startTime
          ? this.$moment(this.filters.startTime).format("YYYY-MM-DD")
          : null,
        timeTo: this.filters.endTime
          ? this.$moment(this.filters.endTime).format("YYYY-MM-DD")
          : null
      };
    },
    setLoginParams() {
      return {
        deptPath: this.filters.deptPath || null,
        timeFrom: this.loginFilters.startTime
          ? this.$moment(this.loginFilters.startTime).format("YYYY-MM-DD")
          : null,
        timeTo: this.loginFilters.endTime
          ? this.$moment(this.loginFilters.endTime).format("YYYY-MM-DD")
          : null
      };
    },
    // 选择日期
    handleTime(datas) {
      this.filters.startTime = datas[0];
      this.filters.endTime = datas[1];
      this.filters.time = "";
    },
    handleLoginTime(datas) {
      this.loginFilters.startTime = datas[0];
      this.loginFilters.endTime = datas[1];
    },
    // 查看条件筛选
    handleSearch() {
      if (this.filters.daterange[0] == "") {
        this.$Message.error("请选择要查看的时间");
      } else {
        this.init();
      }
    },
    handleLoginSearch() {
      if (this.loginFilters.daterange[0] == "") {
        this.$Message.error("请选择要查看的时间");
      } else {
        let params = this.setLoginParams();
        this.getTpLoginsStatData(params);
      }
    },
    // 刷新条件
    handleRefresh() {
      this.filters = {
        cityTreeData: null,
        belongDeptDisplayName: "",
        deptCode: "",
        deptPath: "",
        time: "1", //采集时间选择
        daterange: [new Date(new Date().getTime() - 86400000 * 6), new Date()], //日期间隔
        startTime: new Date(new Date().getTime() - 86400000 * 6), //采集开始时间
        endTime: new Date() //采集结束时间
        // concreteTime: "00:00:00" //具体的时间
      };
      this.init();
    },
    handleLoginRefresh() {
      this.loginFilters = {
        daterange: [new Date(), new Date()], //日期间隔
        startTime: new Date(), //采集开始时间
        endTime: new Date() //采集结束时间
      };
      this.handleLoginSearch();
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
        // this.pagination.pageIndex = 1;
        // this.getMapManagerResult();
      }
    },
    // 获取图谱采集总览
    getTpCollectPandectData(params) {
      apis.POST_TP_COLLECT_PANDECT_DATA(params).then(res => {
        if (res.code == 200) {
          this.tpPandectData = res.data;
          this.$nextTick(() => {
            this.$refs.tpPandectEchart.drawBarCharts();
          });
        }
      });
    },
    // 获取采集图谱类型数据
    getCollectTypeData(params) {
      apis.POST_COLLECT_TYPE_DATA(params).then(res => {
        if (res.code == 200) {
          this.collectTypeData = res.data;
          this.$nextTick(() => {
            this.$refs.collectTypeEchart.drawBarCharts();
          });
        }
      });
    },
    // 获取单位图谱采集对比数据
    getDeptCollectData(params) {
      apis.POST_DEPT_COLLECT_DATA(params).then(res => {
        if (res.code == 200) {
          this.deptCollectData = res.data;
          this.$nextTick(() => {
            this.$refs.deptCollectEchart.drawBarCharts();
          });
        }
      });
    },
    // 获取单位登录次数对比数据
    getDeptLoginsData(params) {
      apis.POST_DEPT_LOGINS_DATA(params).then(res => {
        if (res.code == 200) {
          this.deptLoginsData = res.data;
          this.$nextTick(() => {
            this.$refs.deptLoginsEchart.drawBarCharts();
          });
        }
      });
    },
    // 获取图谱汇总统计数据
    getTpLoginsStatData(params) {
      let me = this;
      apis.POST_TP_LOGINS_STAT_DATA(params).then(res => {
        if (res.code == 200) {
          me.tableDatas = res.data;
          if (me.filters.belongDeptDisplayName == "") {
            me.$store
              .dispatch("getOptionsByKey", {
                key: OPTIONS_LIST.DEPT_TREE,
                apiFun: me.deptApis,
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
    // 统计看板数据导出
    handleExportData() {
      let params = this.setLoginParams();
      return apis.POST_TP_LOGINS_STAT_EXPOT_DATA(params).then(res => {
        let name = `图谱登录情况统计-${this.$moment().format(
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
    // 获取7日的起止时间
    getSevenDay() {
      this.filters.daterange = [
        new Date(new Date().getTime() - 86400000 * 6),
        new Date()
      ];
    },
    // 获取15日的起止时间
    getFifteenDay() {
      this.filters.daterange = [
        new Date(new Date().getTime() - 86400000 * 14),
        new Date()
      ];
    },
    // 获取30日的起止时间
    getThirtyDay() {
      this.filters.daterange = [
        new Date(new Date().getTime() - 86400000 * 29),
        new Date()
      ];
    },
    handleCheckTime(val) {
      switch (val) {
        case "1":
          this.getSevenDay();
          break;
        case "2":
          this.getFifteenDay();
          break;
        case "3":
          this.getThirtyDay();
          break;
        default:
          break;
      }
      this.filters.startTime = this.filters.daterange[0];
      this.filters.endTime = this.filters.daterange[1];
    },
    handleToPage(row) {
      if (row) {
        let filter = {
          cityTreeData: this.filters.cityTreeData,
          belongDeptDisplayName: row.deptName,
          deptCode: row.deptCode,
          deptPath: row.deptPath,
          time: this.filters.time, //采集时间选择
          daterange: this.filters.time, //日期间隔
          startTime: this.filters.startTime, //采集开始时间
          endTime: this.filters.endTime //采集结束时间
          // concreteTime: "00:00:00" //具体的时间
        };
        // this.filters.deptCode = row.deptCode;
        // this.filters.deptPath = row.deptPath;
        // this.filters.deptName = row.deptName;
        tool.transferParameters(
          this,
          "/statAnalyze/dailyCollectionStat",
          JSON.stringify(filter)
        );
        if (this.$route.query.query) {
          sessionStorage.removeItem(this.$route.query.query);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.dept-dropdown {
  width: 300px !important;
}
.activeBtn-box {
  .ivu-btn {
    // margin-bottom: 14px;
  }
  .icon-daochu {
    position: relative;
    top: 2px;
    left: 2px;
    color: #0668c8;
    font-weight: 700;
  }
}
.table-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 0 10px;
  .title {
    margin-left: 0;
  }
}
</style>
