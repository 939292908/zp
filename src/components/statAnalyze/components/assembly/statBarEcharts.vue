<!--
 * @Author: your name
 * @Date: 2019-11-01 13:41:21
 * @LastEditTime : 2019-12-27 09:37:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\assembly\statBarEcharts.vue
 -->
<template>
  <div :id="id" class="barCharts"></div>
</template>

<script>
export default {
  name: "barEcharts",
  props: {
    data: {
      type: Array,
      default: []
    },
    colorList: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: "personStatEchart"
    }
  },
  methods: {
    // 覆盖人员情况配置
    drawBarCharts() {
      let me = this;
      var barCharts = me.$echarts.init(document.getElementById(this.id));
      let areaType = [];
      let areaCount = [];
      me.data.forEach(ele => {
        areaType.push(ele.typeName);
        areaCount.push(ele.count);
      });
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          data: areaType
        },
        yAxis: {
          minInterval: 1
        },
        series: [
          {
            type: "bar",
            data: areaCount,
            itemStyle: {
              normal: {
                color: function(params) {
                  return me.colorList[params.name];
                }
              }
            },
            barWidth: "50%",
            barMaxWidth: 60,
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#333",
                formatter: params => {
                  return params.value
                    .toString()
                    .toString()
                    .replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
                }
              }
            }
          }
        ]
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
