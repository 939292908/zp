<!--
 * @Author: your name
 * @Date: 2019-11-13 15:28:15
 * @LastEditTime: 2019-11-18 10:34:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\assembly\StackBarEcharts.vue
 -->
<template>
  <div :id="id" class="barCharts"></div>
</template>

<script>
export default {
  name: "stackBarEcharts",
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
      default: "tpPandectEchart"
    }
  },
  methods: {
    // 覆盖人员情况配置
    drawBarCharts() {
      let me = this;
      let series = me._reBuildSeries();
      let dataZoomStart = 100 - 2600 / series[0].values.length;
      var barCharts = me.$echarts.init(document.getElementById(this.id));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data:['已审核','未审核'],
          top: "0",
          right: "2%"
        },
        xAxis: {
          data: me.data.xlineData,
          axisLabel: {
            interval: 0
          }
          // data: ["2019-11-13", "2019-11-14"],
          // axisLabel: {
          //   formatter: (value, index) => {
          //     return value.slice(5, value.length);
          //     console.log(value);
          //   }
          // }
        },
        yAxis: {
          minInterval: 1
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "12%",
          containLabel: true
        },
        dataZoom: {
          type: "inside",
          start: dataZoomStart,
          end: 100,
          zoomLock: true
        },
        series: series
      };
      me.initData(barCharts, option);
      barCharts.setOption(option);
      //legend切换事件上进行total的重 计算
      barCharts.on("legendselectchanged", function(params) {
        var legends = params.selected;
        var keys = Object.keys(legends);
        var totals = me._reBuildTotal(barCharts, legends, keys);
        var reSeries = me._reBuildSeries(totals);
        barCharts.setOption({ series: reSeries });
      });
    },
    initData(charts, option) {
      charts.setOption(option);
      window.addEventListener("resize", () => {
        charts.resize();
      });
    },
    // 构建汇总系列
    _buildTotalSerie(totals) {
      var isZero = this._isAllZero(totals);
      var serie = {};
      serie = {
        name: "总计",
        type: "bar",
        stack: "图谱采集",
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0)"
          }
        },
        label: {
          normal: {
            position: "insideBottom",
            show: true,
            textStyle: {
              color: "#000",
              fontStyle: "normal",
              fontSize: "14"
            },
            formatter: function(params) {
              return "总计 " + params.data;
            }
          }
        },
        data: totals
      };
      if (isZero === false) {
        serie.label = {
          normal: {
            position: "insideBottom",
            show: true,
            textStyle: {
              color: "#000",
              fontStyle: "normal",
              fontSize: "14"
            },
            formatter: function(params) {
              return "总计 " + params.data;
            }
          }
        };
      } else {
        serie.label = {
          normal: {
            position: "insideBottom",
            textStyle: {
              color: "#000",
              fontStyle: "normal",
              fontSize: "14"
            },
            formatter: function(params) {
              return 0;
            }
          },
          emphasis: {
            position: "insideBottom",
            textStyle: {
              color: "#000",
              fontStyle: "normal",
              fontSize: "16",
              fontWeight: "bold"
            },
            formatter: function(params) {
              return 0;
            }
          }
        };
      }
      return serie;
    },
    //重新组织serices里面的数据变成想要的加总数组
    _reBuildTotal(barCharts, legends, keys) {
      var series = barCharts.getOption().series;
      var totalLength = series[0].data.length;
      var totals = [];
      for (var k = 0; k < totalLength; k++) {
        totals[k] = 0;
      }
      for (var i = 0; i < series.length - 1; i++) {
        var name = series[i].name;
        for (var j = 0; j < series[i].data.length; j++) {
          if (legends[keys[i]] === true) {
            totals[j] += series[i].data[j];
          }
        }
      }
      return totals;
    },
    _isAllZero(totals) {
      for (var i = 0; i < totals.length; i++) {
        if (totals[i] !== 0) {
          return false;
        }
      }
      return true;
    },
    //  计算汇总系列的数据
    _calculateTotalValues(series) {
      let seriesTotal = [];
      let seriesTotalLength = 0;
      if (series.length > 0) {
        seriesTotalLength = series[0].values.length;
      }
      for (var k = 0; k < seriesTotalLength; k++) {
        seriesTotal[k] = 0;
      }
      for (var i = 0; i < series.length; i++) {
        for (var j = 0; j < series[i].values.length; j++) {
          seriesTotal[j] += series[i].values[j];
        }
      }
      return seriesTotal;
    },
    //重新构件series数组
    _reBuildSeries(reTotals = null) {
      let series = JSON.parse(JSON.stringify(this.data.barData)) || [];
      series.forEach(x => {
        x.stack = "图谱采集";
        x.type = "bar";
        x.data = x.values;
        x.barMinHeight = 15;
        x.barMaxWidth = 60;
        x.label = {
          normal: {
            show: true,
            position: "inside"
          }
        };
        if (x.name == "未审核") {
          x.itemStyle = {
            normal: {
              color: "#3AA1FF"
            }
          };
        } else {
          x.itemStyle = {
            normal: {
              color: "#446FBF"
            }
          };
        }
      });
      var serie = {};
      if (reTotals) {
        serie = this._buildTotalSerie(reTotals);
      } else {
        // 添加汇总系列
        let totals = this._calculateTotalValues(series);
        serie = this._buildTotalSerie(totals);
      }
      series.push(serie);
      return series;
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
