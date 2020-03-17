<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime : 2019-12-23 15:12:32
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div>
    <!-- <a href="#" target="_Blank"> -->
    <div class="daochuBox">
      <Button @click="downloadBtnClick" size="small" :loading="loadingBtn">
        <span v-if="!loadingBtn">数据导出</span>
        <span v-else>正在导出</span>
        <i class="iconfont icon-shangchuan icon-daochu"></i>
      </Button>
    </div>
    <!-- </a> -->
    <Table class="rellation-table" border stripe :height="height" :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";

export default {
  name: "MapStateTable",
  computed: {
    tableDataList() {}
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 导出excel
    getExcelFn: {
      type: Function,
      default: () => {}
    },
    // 表格高
    height: {
      default: null
    }
  },
  // computed:{
  //   currentIndex() {
  //     return this.tableDatas.pageInfo.pageIndex
  //   }
  // },
  data() {
    return {
      tabeHeight: 0,
      loadingBtn: false,
      columns: [
        {
          key: "deptName",
          align: "center",
          width: 200,
          renderHeader: (h, params) => {
            return h("span", {
              domProps: {
                title: "",
                innerHTML: "单位名称"
              }
            });
          },
          // 跳转页面
          render: (h, params) => {
            if (params.index == 0) {
              return h("div", [h("p", params.row.deptName)]);
            }
            return h("div", [
              h(
                "p",
                {
                  style: {
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$emit("on-click", params.row);
                    }
                  }
                },
                params.row.deptName
              )
            ]);
          }
        },
        {
          title: "图谱状态",
          align: "center",
          children: [
            {
              title: "未提交",
              key: "unSubmit",
              align: "center"
            },
            {
              title: "审核中",
              key: "audit",
              align: "center"
            },
            {
              title: "已通过",
              key: "pass",
              align: "center"
            }
          ]
        },
        {
          title: "合计",
          key: "totals",
          align: "center",
          width: 200
        },
        {
          title: "图谱通过率",
          key: "passRate",
          align: "center",
          width: 200
        }
      ]
    };
  },
  methods: {
    // 下载按钮click事件
    downloadBtnClick() {
      this.loadingBtn = true;
      this.getExcelFn()
        .then(res => {
          this.loadingBtn = false;
        })
        .catch(error => {
          this.loadingBtn = false;
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
    text-align: center;
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
      margin: 0 4px -2px 12px;
    }
    .sumBar {
      color: #fff;
      text-align: left;
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
    .mapColor {
      background-color: #446fc0;
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
</style>
