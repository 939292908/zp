<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime : 2019-12-23 15:11:26
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
    <Table
      class="rellation-table"
      border
      stripe
      :height="height"
      :columns="columns"
      :data="this.tableDatas.data"
    ></Table>
    <!-- 分页 -->
    <div class="page" v-if="page">
      <div>
        <Page
          :total="tableDatas.pageInfo.total"
          :current="currentIndex"
          :page-size="tableDatas.pageInfo.pageSize"
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
  name: "MapTable",
  components: {},
  created() {
    this.getMapNameToSetTableHeader();
  },
  filters: {
    format(val) {
      return val.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
    }
  },
  computed: {
    tableDataList() {}
  },
  props: {
    // 表格数据
    tableDatas: {
      type: Object,
      default: {}
    },
    // 分页事件
    handlePageChange: {
      type: Function,
      default: () => {}
    },
    // 导出excel
    getExcelFn: {
      type: Function,
      default: () => {}
    },
    // 表格高
    height: {
      default: null
    },
    // 是否需要分页
    page: {
      type: Boolean,
      default: true
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
      maxPeople: this.tableDatas.data[0].maxPersonValue, // 最大人数
      maxMap: this.tableDatas.data[0].maxMapValue, // 最大图谱数
      currentIndex: 1,
      loadingBtn: false,
      columns: [],
      columnsAll: [
        // 1
        {
          flag: true, // 过滤标记
          fixed: "left",
          width: 160,
          key: "deptName",
          renderHeader: (h, params) => {
            return h("span", {
              domProps: {
                title: "",
                innerHTML: this.tableDatas.title || "采集人员"
              }
            });
          },
          // 跳转页面
          render: (h, params) => {
            // console.log(params);

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
        // 1
        {
          flag: 1, // 过滤标记
          val: "户",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            // 1.1
            {
              key: "tp1",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            // 1.2
            {
              key: "ry1",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        {
          flag: 6, // 过滤标记
          val: "宗",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            // 2.1
            {
              key: "tp6",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            // 2.2
            {
              key: "ry6",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 3
        {
          flag: 2, // 过滤标记
          val: "族",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp2",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry2",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 4
        {
          flag: 4, // 过滤标记
          val: "案",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp4",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry4",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 5
        {
          flag: 5, // 过滤标记
          val: "社",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp5",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry5",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 6
        {
          flag: 8, // 过滤标记
          val: "境",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp8",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry8",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 7
        {
          flag: 10, // 过滤标记
          val: "暴",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp10",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry10",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 8
        {
          flag: 9, // 过滤标记
          val: "打",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp9",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry9",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 9
        {
          flag: 7, // 过滤标记
          val: "朝",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp7",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry7",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 10
        {
          flag: 3, // 过滤标记
          val: "境",
          renderHeader: (h, params) => {
            var val = params.column;
            return h("span", {
              domProps: {
                title: "",
                innerHTML: val.val
              }
            });
          },
          children: [
            {
              key: "tp3",
              val: "图",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            },
            {
              key: "ry3",
              val: "人",
              renderHeader: (h, params) => {
                var val = params.column;
                return h("span", {
                  domProps: {
                    title: "",
                    innerHTML: val.val
                  }
                });
              }
            }
          ]
        },
        // 进度条 表头
        {
          flag: true, // 过滤标记
          fixed: "right",
          width: 160,
          key: "totalDTO",
          className: "sum-th",
          renderHeader: (h, params) => {
            return h("div", [
              h("div", "合计"),
              h("div", [
                h("span", { class: "mapNumIcon mapColor" }),
                h("span", "图谱数"),
                h("span", { class: "peoplNumIcon peoplColor" }),
                h("span", "人员数")
              ])
            ]);
          },
          // 进度条
          render: (h, params) => {
            // 合计 无进度条
            if (params.index == 0) {
              return h("div", [
                h("div", { class: "total-th  bd-left" }, [
                  h("p", "图"),
                  h(
                    "p",
                    params.row.totalDTO.tptotal
                      .toString()
                      .replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,")
                  )
                ]),
                h("div", { class: "total-th" }, [
                  h("p", "人"),
                  h(
                    "p",
                    params.row.totalDTO.rytotal
                      .toString()
                      .replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,")
                  )
                ])
              ]);
            }
            
            let maxWidth = 135; // 最大宽100%
            let peopleBarWidth = params.row.totalDTO.rytotal / this.maxPeople; // 人数占 最大人数的比例
            let mapBarWidth = params.row.totalDTO.tptotal / this.maxMap; // 图谱占 最大图谱数的比例
            let isOutPeople = peopleBarWidth * maxWidth < (params.row.totalDTO.rytotal + "").length * 9 + 4; // 数字是否溢出（人）
            let isOutMap = mapBarWidth * maxWidth < (params.row.totalDTO.tptotal + "").length * 9 + 4; // 数字是否溢出（图）
            return h("div", [
              h(
                "p",
                {
                  class: "sumBar mapColor",
                  style: {
                    width: mapBarWidth * 100 + "%", // 百分比宽
                    color: isOutMap ? "#000" : "",  // 数字溢出
                    paddingLeft: isOutMap ? mapBarWidth * maxWidth + "px" : ""  // 数字溢出
                  }
                },
                [
                  h(
                    "span",
                    { style: { marginLeft: "4px" } },
                    params.row.totalDTO.tptotal.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,")
                    // +`/${this.maxMap}`
                  )
                ]
              ),
              h(
                "p",
                {
                  class: "sumBar peoplColor",
                  style: {
                    width: peopleBarWidth * 100 + "%", // 百分比宽
                    marginTop: "4px",
                    color: isOutPeople ? "#000" : "", // 数字溢出
                    paddingLeft: isOutPeople ? peopleBarWidth * maxWidth + "px" : ""  // 数字溢出
                  }
                },
                [
                  h(
                    "span",
                    { style: { marginLeft: "4px" } },
                    params.row.totalDTO.rytotal.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,")
                    // +`/${this.maxPeople}`
                  )
                ]
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 设置类名
    rowClassName(row, index) {
      if (index === 0) {
        return "one-row";
      }
      return "";
    },
    // 获取需要显示的图谱简称 设置表头
    getMapNameToSetTableHeader() {
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.SHORT_MAP_TYPE_FOR_ANALYSIS,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.SHORT_MAP_TYPE_FOR_ANALYSIS
        })
        .then(res => {
          this.columns = this.columnsAll.filter(
            item =>
              item.flag === true || res.some(ele => ele.value == item.flag)
          );
          // console.log(this.columns);
        });
    },
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
  },
  watch: {
    // 获取最大 人/图数
    tableDatas: {
      handler(val) {
        this.maxPeople = val.data[0].maxPersonValue; // 最大人数
        this.maxMap = val.data[0].maxMapValue; // 最大图谱数
        this.currentIndex = val.pageInfo.pageIndex;
        // console.log(this.tableDatas);
      },
      deep: true,
      immediate: true
    },
    pageIndex: {
      handler(val) {
        // console.log(val, 11111);
      },
      immediate: true
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
