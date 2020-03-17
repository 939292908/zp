<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime: 2019-11-14 15:38:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tableBox">
    <!-- </a> -->
    <Table stripe class="rellation-table" :height="tableHeight" :columns="columns" :data="tableDatas"></Table>
    <!-- 分页 -->
    <div class="page" v-if="page">
      <div>
        <Page
          :total="pageInfo.total"
          :current="currentIndex"
          :page-size="pageInfo.pageSize"
          show-total
          show-elevator
          @on-change="handlePageChange"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";

export default {
  name: "StatTable",
  components: {},
  computed: {
    tableDataList() {}
  },
  props: {
    // 表格数据
    tableDatas: {
      type: Array,
      default() {
        return [];
      }
    },
    // 分页事件
    handlePageChange: {
      type: Function,
      default: () => {}
    },
    // 是否需要分页
    page: {
      type: Boolean,
      default: true
    },
    pageInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tabeHeight: 0,
      currentIndex: 1,
      columns: [],
      tableHeight: 380
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler());
  },
  mounted() {
    this.setColumns();
  },
  methods: {
    setColumns() {
      let me = this;
      this.columns = [
        {
          title: "序号",
          key: "serialNumber",
          width: 80,
          align: "center"
        },
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "警号",
          key: "userCode",
          width: 100
        },
        {
          title: "单位名称",
          key: "deptName"
        },
        {
          title: "最后登录时间",
          key: "lastLoginTime"
        },
        {
          title: "登录系统次数",
          key: "loginTimes",
          align: "center"
        },
        {
          title: "系统查询次数",
          key: "queryTimes",
          align: "center"
        },
        {
          title: "图谱采集次数",
          key: "collectTimes",
          width: 120,
          align: "center"
        },
        {
          title: "系统使用次数统计",
          key: "totals",
          width: 160,
          className: "sum-th",
          // 进度条
          render: (h, params) => {
            let maxWidth = 135; // 最大宽100%
            let mapBarWidth =
              me.pageInfo.maxValue == 0
                ? 0
                : params.row.totals / me.pageInfo.maxValue; // 系统使用数 与 最大比例
            let isOutMap =
              mapBarWidth * maxWidth < (params.row.totals + "").length * 9 + 4; // 数字是否溢出（图）
            return h("div", [
              h(
                "p",
                {
                  class: "sumBar mapColor",
                  style: {
                    width: mapBarWidth * 100 + "%", // 百分比宽

                    // 数字溢出，样式修改
                    color: isOutMap ? "#000" : "",
                    paddingLeft: isOutMap ? mapBarWidth * maxWidth + "px" : ""
                  }
                },
                params.row.totals
                  .toString()
                  .replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,")
              )
            ]);
          }
        }
      ];
    },
    resizeHandler() {
      this.$nextTick(() => {
        let rightContent = this.$parent.$parent.$refs.rightContent;

        if (rightContent.clientHeight - 335 < 300) {
          this.tableHeight = 300;
        } else {
          this.tableHeight = rightContent.clientHeight - 335;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.rellation-table {
  /deep/.ivu-table-cell,
  /deep/.ivu-table td,
  /deep/.ivu-table th {
    padding: 2px 0;
    width: 100%;
    // text-align: center;
    // height: 24px !important;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 1);
    border-radius: 5px;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 183, 245, 1);
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-corner {
    background-color: #dadada;
  }

  /deep/ th {
    cursor: default;
    font-size: 12px;
  }
  /deep/ td {
    font-size: 12px;
  }
  /deep/ .sum-th .ivu-table-cell {
    overflow: visible;
    padding: 6px 12px;
    .peoplNumIcon {
      display: inline-block;
      height: 12px;
      width: 12px;
      margin: 0 4px -2px 0;
    }
    .sumBar {
      color: #fff;
      text-align: left;
      padding-left: 4px;
      white-space: nowrap; // 一行显示
      max-width: 100%;
    }
    .mapNumIcon {
      display: inline-block;
      height: 12px;
      width: 12px;
      margin: 0 4px -2px 12px;
    }
    .mapColor {
      background-color: #3aa1ff;
    }
    .total-th {
      width: 50%;
      float: left;
      // &.bd-left {
      //   width: calc(50% - 1px);
      //   border-left: 1px solid #e8eaec;
      // }
      p {
        margin-bottom: 2px;
      }
    }
  }
  /deep/ .one-row {
    font-weight: 700;
  }
}
.page {
  margin-top: 30px;
}
.daochuBox {
  overflow: hidden;
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
/deep/ .sum-th .ivu-table-cell {
  overflow: visible;
  padding: 6px 12px;
  .peoplNumIcon {
    display: inline-block;
    height: 12px;
    width: 12px;
    margin: 0 4px -2px 12px;
  }
  .sumBar {
    color: #fff;
    text-align: left;
    padding-left: 4px;
    white-space: nowrap; // 一行显示
    max-width: 100%;
  }
  .peoplColor {
    background-color: #3aa1ff;
  }
  .mapNumIcon {
    display: inline-block;
    height: 12px;
    width: 12px;
    margin: 0 4px -2px 0;
  }
  .total-th {
    width: 50%;
    float: left;
    // &.bd-left {
    //   width: calc(50% - 1px);
    //   border-left: 1px solid #e8eaec;
    // }
    p {
      margin-bottom: 2px;
    }
  }
}
</style>
