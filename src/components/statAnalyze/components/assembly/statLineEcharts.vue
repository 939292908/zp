<!--
 * @Author: your name
 * @Date: 2019-11-13 15:28:15
 * @LastEditTime: 2019-11-15 15:12:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\assembly\StackBarEcharts.vue
 -->
<template>
  <div :id="id" class="barCharts"></div>
</template>

<script>
export default {
  name: "statLineEcharts",
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
      default: "deptCollectEchart"
    }
  },
  methods: {
    // 覆盖人员情况配置
    drawBarCharts() {
      let me = this;
      me.data.barData.forEach((x,index) => {
        x.type = "line";
        // x.stack = "单位";
        let isSetting = false;
        let max = Math.max.apply(null, x.values)
        let datas = x.values.map((c,cIndex)=>{
          let item = {};
          item.value = c;
          //  || (max == 0 && cIndex == 0)
          if((!isSetting && c > 0)) {
            item.label = {
              show:true,
              formatter: x.name,
              position: 'right'
            }
            isSetting = true
          }
          return item;
        })
        x.data = datas;
      });
      let dataZoomStart = 100 - 2600 / me.data.barData[0].values.length;
      var barCharts = me.$echarts.init(document.getElementById(this.id));
      var option = {
        tooltip: {
          trigger: "axis"
          // formatter: function(params) {
          //   let str = "";
          //   for (let i = 0; i < params.length; i++) {
          //     str += params[i].seriesName + "：" + params[i].value + "</br>";
          //   }
          //   return str;
          // }
        },
        dataZoom: {
          type: "inside",
          start: dataZoomStart,
          end: 100,
          zoomLock: true
        },
        legend: {
          top: "0",
          right: "2%",
          icon: "circle",
          type: "scroll",
          width: "60%"
        },
        xAxis: {
          data: me.data.xlineData,
          boundaryGap: false,
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          minInterval: 1
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "8%",
          containLabel: true
        },
        // dataZoom: {
        //   type: "slider",
        //   start: 50,
        //   end: 100
        // },
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
