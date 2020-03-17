<!--
 * @Author: your name
 * @Date: 2019-10-31 13:49:11
 * @LastEditTime: 2019-11-09 16:12:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\Dashboard.vue
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">系统使用统计</h2>
    </div>
    <div class="condition-box">
      <div class="search-row">
        <div class="search-label">统计选择：</div>
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
        <div class="search-label">时间选择：</div>
        <div class="search-control">
          <RadioGroup v-model="filters.time">
            <Radio :key="index" v-for="(item,index) in timeList" :label="item.value">{{item.name}}</Radio>
          </RadioGroup>
        </div>
        <span class="line">|</span>
        <div class="search-control">
          <DatePicker
            type="date"
            placeholder="开始时间"
            v-model="filters.startTime"
            @on-change="onStartTimeChange"
            :options="startTimeOption"
          ></DatePicker>
          <span>至</span>
          <DatePicker
            type="date"
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
    <!-- <div class="content-panel">
      <div class="tp-box">
        <div class="tp-list">
          <div class="box-header">
            <span>
              个人活跃度排名
              <i class="remark">（前10名）</i>
            </span>
          </div>
          <div class="stat-list-content">
            <div class="ranking-list">
              <div class="list" v-for="(item,index) in perActivityList" :key="index">
                <div class="list-left">
                  <span
                    :style="{'background-color':rankingColor[index]}"
                    class="ranking-icon"
                  >{{index+1}}</span>
                  <p>{{item.name}}</p>
                </div>
                <div class="list-right">
                  <span>{{item.count}}</span>
                  <p class="ranking-cont">
                    <span
                      class="activity"
                      :style="{width:item.activeValue/perMaxWidth*100 + '%'}"
                    >{{item.activeValue}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tp-list">
          <div class="box-header">
            <span>
              单位活跃度排名
              <i class="remark">（前10名）</i>
            </span>
          </div>
          <div class="stat-list-content">
            <div class="ranking-list">
              <div class="list" v-for="(item,index) in unitActivityList" :key="index">
                <div class="list-left">
                  <span
                    :style="{'background-color':rankingColor[index]}"
                    class="ranking-icon"
                  >{{index+1}}</span>
                  <p>{{item.name}}</p>
                </div>
                <div class="list-right">
                  <span
                    class="activity"
                    :style="{width:item.activeValue/unitMaxWidth*100 + '%'}"
                  >{{item.activeValue}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <div class="content-panel">
      <div class="panel-box">
        <div class="table-title">
          <span>系统使用统计列表</span>
        </div>
        <div class="table-box">
          <stat-table :tableDatas="tableDatas"></stat-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as comApis from "@/api/common.js";
import StatTable from "./assembly/StatTable";
import * as apis from "@/api/mapJoin/index.js";
import * as tool from "../../../tools/units.js";
export default {
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
        category: "" //分类
      },
      startTimeOption: {},
      endTimeOption: {},
      timeList: [
        {
          value: "1",
          name: "3天"
        },
        {
          value: "2",
          name: "7天"
        },
        {
          value: "3",
          name: "30天"
        },
        {
          value: "4",
          name: "60天"
        }
      ],
      optionConfig: OPTIONS_LIST,
      detpTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      deptApis: comApis.GET_DEPT_TREE_INFO,
      perActivityList: [
        {
          name: "依米提·达吾提",
          count: 474310,
          activeValue: 325
        },
        {
          name: "李士赳",
          count: 474336,
          activeValue: 308
        },
        {
          name: "沙特尔·木沙",
          count: 474342,
          activeValue: 295
        },
        {
          name: "阿什利杨·阿扎提",
          count: 474310,
          activeValue: 265
        }
      ],
      unitActivityList: [
        {
          name: "依米提·达吾提",
          activeValue: 325
        },
        {
          name: "李士赳",
          activeValue: 308
        },
        {
          name: "沙特尔·木沙",
          activeValue: 295
        },
        {
          name: "阿什利杨·阿扎提",
          activeValue: 265
        }
      ],
      rankingColor: ["#F2411F", "#F9861D", "#FFCC00"],
      tableDatas: {
        pageInfo: {
          total: 0,
          pageIndex: 1,
          pageSize: 10
        },
        data: []
      } //图谱汇总统计
      // tableHeight: 480
    };
  },
  components: {
    TreeFilter,
    StatTable
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
    this.init();
    this.onStartTimeChange(this.filters.startTime);
    this.onEndTimeChange(this.filters.endTime);
  },
  methods: {
    init() {
      let params = this.setParams();
      this.getSystemUsageStatData();
    },
    setParams() {
      return {
        areaOrDept: this.filters.area,
        code: this.filters.deptCode || null,
        monthType: this.filters.time || null,
        tierPath: this.filters.deptPath || null,
        timeFrom: this.filters.startTime
          ? this.$moment(this.filters.startTime).format("YYYY-MM-DD")
          : null,
        timeTo: this.filters.endTime
          ? this.$moment(this.filters.endTime).format("YYYY-MM-DD")
          : null
      };
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
        endTime: "", //采集结束时间
        category: "" //分类
      };
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
      this.filters.startTime = startTime
        ? this.$moment(startTime).format("YYYY-MM-DD")
        : "";
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime) - 8.64e7 || endTime > Date.now();
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(endTime, type) {
      this.filters.endTime = endTime
        ? this.$moment(endTime).format("YYYY-MM-DD")
        : "";
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now();
        }
      };
    },
    // 获取个人活跃度排名情况
    getPersonalActivityData(params) {},
    // 获取单位活跃度排名情况
    getUnitActivityData(params) {},
    // 获取系统使用统计列表
    getSystemUsageStatData(params) {},
    // 区域单位树切换
    changeArea(val) {},
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
    }
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
      justify-content: space-between;
      &:nth-child(-n + 3) .ranking-icon {
        color: #fff;
      }
      .list-left {
        display: flex;
        flex: 1;
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
      }
      .list-right {
        display: flex;
        flex: 2;
        justify-content: space-between;
        .ranking-cont {
          width: 282px;
        }
        .activity {
          display: inline-block;
          padding-left: 5px;
          height: 21px;
          font-size: 13px;
          color: #fff;
          background-color: #eca349;
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
.table-title {
  height: 36px;
  width: 100%;
  span {
    font-size: 16px;
    font-weight: bold;
    line-height: 36px;
    margin-left: 10px;
  }
}

.table-box {
  width: 100%;
  padding: 10px;
  /deep/.ivu-table-overflowY {
    overflow-x: hidden;
  }
  margin-top: -43px;
}
</style>
