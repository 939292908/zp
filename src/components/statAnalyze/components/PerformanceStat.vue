<!--
 * @Author: your name
 * @Date: 2019-10-31 14:07:41
 * @LastEditTime: 2019-12-02 11:47:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\performanceStat.vue
 -->
<template>
  <!-- 人员绩效统计 -->
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">人员绩效统计</h2>
    </div>
    <!-- 筛选 -->
    <Filtrate :searchClick="searchChange" :resetPage="resetPage"></Filtrate>
    <div class="mapManagemen-content">
      <div class="con-header">
        <span class="tpList">人员绩效列表</span>
      </div>
      <!-- 表 -->
      <div class="tableContent">
        <MapTable
          ref="mapTable"
          :tableDatas="tableDatas"
          :reqData="reqData"
          :handlePageChange="handlePageChange"
          :height="tableHeight"
          :getExcelFn="getExcelFn"
        ></MapTable>
      </div>
      <!-- loading -->
      <loading color="white" v-model="loadingShow"></loading>
    </div>
  </div>
</template>

<script>
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import * as mapJoinApis from "@/api/mapJoin/index.js";
import { getExcelByBlob } from "../../../tools/units.js";

import Loading from "@/components/assembly/Loading";
import MapTable from "./assembly/MapTable";
import Filtrate from "./assembly/Filtrate";

export default {
  name: "PerformanceStat",
  components: {
    MapTable,
    Filtrate,
    Loading
  },
  mounted() {
    // this.getTableData(this.reqData, true);
    // this.setTableHeight();
    // window.onresize = () => this.setTableHeight();
  },
  data() {
    return {
      tableHeight: null,
      tempTotal: {}, // 缓存合计
      excelUrl: "", //导出excel地址
      loadingShow: false,
      // 请求参数
      reqData: {
        code: null,
        tierPath: null,
        monthType: "2", // 天/周/月
        userNameOrAccount: null, //采集人员
        timeFrom: null,
        timeTo: null,
        pageIndex: "1",
        pageSize: "10"
      },
      tableDatas: {
        pageInfo: {
          total: 0,
          pageIndex: 1,
          pageSize: 10
        },
        data: [
          {
            deptName: "总计",
            totalDTO: { rytotal: 100, tptotal: 10 },
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
      }
    };
  },
  methods: {
    // 获取表格数据 （需两个接口拼接） reqData：参数；isGetTotal：是否需要请求合计
    getTableData(reqData, isGetTotal) {
      this.loadingShow = true;

      reqData = this.buildData(reqData); // 构建数据

      let arr = [mapJoinApis.GET_PERFORMANCE_LIST(reqData)]; // 1. 获取绩效列表
      if (isGetTotal) arr.push(mapJoinApis.GET_PERFORMANCE_SUM_LIST(reqData)); // 2. 获取总计
      // 全部成功 再拼接
      Promise.all(arr)
        .then(res => {
          this.loadingShow = false;
          if (res[0].code == 200) {
            this.tableDatas.pageInfo.total = res[0].data.total;
            this.tableDatas.data = res[0].data.data;
          }
          if (res[1] && res[1].code == 200) {
            this.tempTotal = res[1].data.mapPersonCountDTO;
            // 人员，图谱 最大最小值
            this.tempTotal.maxPersonValue = res[1].data.maxPersonValue;
            this.tempTotal.maxMapValue = res[1].data.maxMapValue;
            this.tempTotal.minPersonValue = res[1].data.minPersonValue;
            this.tempTotal.minMapValue = res[1].data.minMapValue;
          }
          // 每次都将缓存添加tableDatas中
          this.tableDatas.data.unshift(this.tempTotal);
        })
        .catch(err => {
          this.loadingShow = false;
          this.$Message.warning("获取失败");
        });
    },
    buildData(data) {
      // 处理 时间格式
      if (data.timeFrom) {
        data.timeFrom = this.$moment(data.timeFrom).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        console.log(data.timeFrom);
      } else {
        data.timeFrom = null;
      }
      // 处理 时间格式
      if (data.timeTo) {
        data.timeTo = this.$moment(data.timeTo).format("YYYY-MM-DD HH:mm:ss");
      } else {
        data.timeTo = null;
      }
      data = JSON.parse(JSON.stringify(data));
      return data;
    },
    // 搜索事件
    searchChange(searchData) {
      this.reqData = searchData;
      this.getTableData(this.reqData, true);
    },
    // 分页Change事件
    handlePageChange(index) {
      this.tableDatas.pageInfo.pageIndex = index;
      this.reqData.pageIndex = index;
      this.getTableData(this.reqData);
    },
    // 重置分页
    resetPage() {
      this.tableDatas.pageInfo.pageIndex = 1;
    },
    // 设置表格高
    setTableHeight() {
      this.tableHeight = document.documentElement.clientHeight - 460;
    },
    // 获取excel
    getExcelFn() {
      return mapJoinApis.GET_PERFORMANCE_EXCEL_URL(this.reqData).then(res => {
        console.log(res);
        let name = `人员绩效统计-${this.$moment().format(
          "YYYY-MM-DD"
        )}-${Math.ceil(Math.random() * 1000000000)}.xlsx`;
        // 响应结果乱码，设置blob请求头，接收；下面再把blob转一下
        getExcelByBlob(res, name);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.con-header {
  height: auto !important;
}
</style>
