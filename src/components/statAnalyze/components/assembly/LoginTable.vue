<!--
 * @Author: your name
 * @Date: 2019-11-14 15:15:58
 * @LastEditTime: 2019-11-14 18:28:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\assembly\LoginTable.vue
 -->
<template>
  <div class="login-box">
    <Table stripe class="rellation-table" border :height="height" :columns="columns" :data="tableDatas"></Table>
  </div>
</template>

<script>
export default {
  name: "LoginTable",
  props: {
    // 表格数据
    tableDatas: {
      type: Array,
      default() {
        return [];
      }
    },
    // 表格高
    height: {
      default: null
    }
  },
  data() {
    return {
      columns: [
        {
          // flag: true, // 过滤标记
          title: "单位",
          width: 160,
          align: "center",
          key: "deptName",
          slot: "jumpPage",
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
        {
          title: "总体情况",
          align: "center",
          children: [
            {
              title: "总人数",
              align: "center",
              key: "total",
              width: 100
            },
            {
              title: "登录人数",
              align: "center",
              key: "totalLogin",
              width: 100
            },
            {
              title: "登录率",
              align: "center",
              key: "totalLoginPercent",
              width: 100,
              className: "sum-th",
              render: (h, params) => {
                let maxWidth = 100; // 最大宽100%
                let mapBarWidth =
                  params.row.totalLoginPercent == 0
                    ? 0
                    : parseInt(params.row.totalLoginPercent * 100);

                let isOutMap =
                  (mapBarWidth * maxWidth) / 100 <
                  (mapBarWidth + "%").length * 9 + 4; // 数字是否溢出（图）
                return h("div", [
                  h(
                    "p",
                    {
                      class: "sumBar",
                      style: {
                        width: mapBarWidth == 0 ? 0 : mapBarWidth + "%", // 百分比宽

                        // 数字溢出，样式修改
                        color: isOutMap ? "#000" : "",
                        paddingLeft:
                          mapBarWidth == 0
                            ? ""
                            : isOutMap
                            ? (mapBarWidth / 100) * maxWidth + "px"
                            : "4px"
                      }
                    },
                    mapBarWidth + "%"
                  )
                ]);
              }
            }
          ]
        },
        {
          title: "权限登录情况",
          align: "center",
          children: [
            {
              title: "分县局",
              align: "center",
              children: [
                {
                  title: "总人数",
                  align: "center",
                  key: "county"
                },
                {
                  title: "登录人数",
                  align: "center",
                  key: "countyLogin"
                },
                {
                  title: "登录率",
                  align: "center",
                  key: "countyLoginPercent",
                  className: "sum-th",
                  render: (h, params) => {
                    let maxWidth = 100; // 最大宽100%
                    let mapBarWidth =
                      params.row.countyLoginPercent == 0
                        ? 0
                        : parseInt(params.row.countyLoginPercent * 100);

                    let isOutMap =
                      (mapBarWidth * maxWidth) / 100 <
                      (mapBarWidth + "%").length * 9 + 4; // 数字是否溢出（图）
                    return h("div", [
                      h(
                        "p",
                        {
                          class: "sumBar",
                          style: {
                            width: mapBarWidth == 0 ? 0 : mapBarWidth + "%", // 百分比宽

                            // 数字溢出，样式修改
                            color: isOutMap ? "#000" : "",
                            paddingLeft:
                              mapBarWidth == 0
                                ? ""
                                : isOutMap
                                ? (mapBarWidth / 100) * maxWidth + "px"
                                : "4px"
                          }
                        },
                        mapBarWidth + "%"
                      )
                    ]);
                  }
                }
              ]
            },
            {
              title: "派出所",
              align: "center",
              children: [
                {
                  title: "总人数",
                  align: "center",
                  key: "station"
                },
                {
                  title: "登录人数",
                  align: "center",
                  key: "stationLogin"
                },
                {
                  title: "登录率",
                  align: "center",
                  key: "stationLoginPercent",
                  className: "sum-th",
                  render: (h, params) => {
                    let maxWidth = 100; // 最大宽100%
                    let mapBarWidth =
                      params.row.stationLoginPercent == 0
                        ? 0
                        : parseInt(params.row.stationLoginPercent * 100);

                    let isOutMap =
                      (mapBarWidth * maxWidth) / 100 <
                      (mapBarWidth + "%").length * 9 + 4; // 数字是否溢出（图）
                    return h("div", [
                      h(
                        "p",
                        {
                          class: "sumBar",
                          style: {
                            width: mapBarWidth == 0 ? 0 : mapBarWidth + "%", // 百分比宽

                            // 数字溢出，样式修改
                            color: isOutMap ? "#000" : "",
                            paddingLeft:
                              mapBarWidth == 0
                                ? ""
                                : isOutMap
                                ? (mapBarWidth / 100) * maxWidth + "px"
                                : "4px"
                          }
                        },
                        mapBarWidth + "%"
                      )
                    ]);
                  }
                }
              ]
            },
            {
              title: "警务室",
              align: "center",
              children: [
                {
                  title: "总人数",
                  align: "center",
                  key: "room"
                },
                {
                  title: "登录人数",
                  align: "center",
                  key: "roomLogin"
                },
                {
                  title: "登录率",
                  align: "center",
                  key: "roomLoginPercent",
                  className: "sum-th",
                  render: (h, params) => {
                    let maxWidth = 100; // 最大宽100%
                    let mapBarWidth =
                      params.row.roomLoginPercent == 0
                        ? 0
                        : parseInt(params.row.roomLoginPercent * 100);

                    let isOutMap =
                      (mapBarWidth * maxWidth) / 100 <
                      (mapBarWidth + "%").length * 9 + 4; // 数字是否溢出（图）
                    return h("div", [
                      h(
                        "p",
                        {
                          class: "sumBar",
                          style: {
                            width: mapBarWidth == 0 ? 0 : mapBarWidth + "%", // 百分比宽

                            // 数字溢出，样式修改
                            color: isOutMap ? "#000" : "",
                            paddingLeft:
                              mapBarWidth == 0
                                ? ""
                                : isOutMap
                                ? (mapBarWidth / 100) * maxWidth + "px"
                                : "4px"
                          }
                        },
                        mapBarWidth + "%"
                      )
                    ]);
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
/deep/ .sum-th .ivu-table-cell {
  overflow: visible;
  padding: 6px 12px;
  .sumBar {
    color: #fff;
    text-align: left;
    // padding-left: 4px;
    white-space: nowrap; // 一行显示
    max-width: 100%;
    background-color: #3aa1ff;
  }
}
</style>
