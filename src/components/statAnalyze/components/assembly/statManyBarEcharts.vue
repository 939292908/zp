<!--
 * @Author: your name
 * @Date: 2019-11-01 13:41:21
 * @LastEditTime: 2019-11-29 16:41:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\assembly\statBarEcharts.vue
 -->
<template>
  <div :id="id" class="barCharts"></div>
</template>

<script>
export default {
  name: "manyBarEcharts",
  props: {
    data: {
      type: Object,
      default: null
    },
    colorList: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: "collectTypeEchart"
    }
  },
  methods: {
    // 覆盖人员情况配置
    drawBarCharts() {
      let me = this;
      me.data.barData.forEach(x => {
        x.type = "bar";
        x.data = x.values;
        // x.barMinHeight = 15;
        x.barMaxWidth = 30;
        // x.barWidth = 12;
        x.label = {
          normal: {
            show: true,
            position: "top",
            distance: 0,
            color: "#333",
            formatter: ["{c|{c}}", "{a|{a}}"].join("\n"),
            rich: {
              c: {
                color: "#333",
                align: "center"
              },
              a: {
                padding: [2, 2, 2, 2]
              }
            }
            // formatter: params => {
            //   return params.value
            //     .toString()
            //     .toString()
            //     .replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
            // }
          }
        };
        x.itemStyle = {
          normal: {
            color: function(params) {
              return me.$config.topTagColors[params.seriesName];
            }
          }
        };
      });
      let dataZoomStart = 100 - 650 / me.data.barData[0].values.length;
      var barCharts = me.$echarts.init(document.getElementById(this.id));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          // data:['直接访问','邮件营销']
          top: "0",
          right: "2%",
          itemWidth: 18,
          itemHeight: 18,
          formatter: name => {
            let target = 0;
            me.data.typeNameAndCountColors.forEach(x => {
              if (x.typeName == name) {
                target = x.count || 0;
              }
            });
            let arr = ["{a|" + name + "}", "{b|" + target + "}"];
            return arr.join(" ");
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 12,
                // backgroundColor:"#38A837",
                padding: [0, 5, 2, -20],
                borderRadius: 3,
                color: "#fff"
              },
              b: {
                fontSize: 12,
                padding: [0, 0, 2, 0],
                align: "center"
              }
            }
          }
        },
        xAxis: {
          data: me.data.xlineData
        },
        yAxis: {
          minInterval: 1
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "15%",
          containLabel: true
        },
        dataZoom: {
          type: "inside",
          start: dataZoomStart,
          end: 100,
          zoomLock: true
        },
        series: me.data.barData
      };
      me.initData(barCharts, option);
      barCharts.setOption(option);
    },
    initData(charts, option) {
      charts.setOption(option);
      window.addEventListener("resize", () => {
        charts.resize();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.barCharts {
  width: 100%;
  height: 100%;
}
</style>
