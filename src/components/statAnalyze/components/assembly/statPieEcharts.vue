<!--
 * @Author: your name
 * @Date: 2019-10-31 17:13:50
 * @LastEditTime: 2019-11-27 17:18:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\statAnalyze\components\assembly\statPieEcharts.vue
 -->
<template>
  <div class="echartsBox">
    <!-- 饼图 -->
    <div class="chartBox" :id="id"></div>
    <div class="legends">
      <ul>
        <li v-for="(item,index) in data.chartData" :key="index">
          <span :style="{'background-color':$config.topTagColors[item.name]}">{{item.name}}</span>
          <i>{{item.value | format}}</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMixin } from "../../mixin/mapMixin";
export default {
  name: "StatPieEcharts",
  mixins: [mapMixin],
  props: {
    data: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: "tpStatEchart"
    }
  },
  data() {
    return {};
  },
  filters: {
    format(val) {
      return val.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
    }
  },
  mounted() {
    this.initDate();
  },
  methods: {
    initDate() {
      this.initChart();
    },
    initChart() {
      let me = this;
      var barCharts = this.$echarts.init(document.getElementById(me.id));
      // 配置
      var option = {
        title: [
          {
            text: me.data.region,
            subtext: me.data.total + "",
            textAlign: "center",
            x: "49%",
            y: "48%",
            textStyle: {
              fontSize: 14,
              color: "#666",
              fontWeight: 400
            },
            subtextStyle: {
              fontSize: 28,
              color: "#666",
              fontWeight: "bold",
              fontFamily: "Arial"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "图谱采集统计",
            type: "pie",
            radius: ["37%", "75%"],
            center: ["50%", "58%"],
            selectedMode: "single",
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                  // color: '#000'
                },
                formatter: function(params, ticket, callback) {
                  let format = params.data.name + ":" + params.percent + "%";
                  return format;
                }
              }
            },
            data: me.data.chartData,
            // 每项样式
            itemStyle: {
              normal: {
                // color: params => params.data.color
                color: params => {
                  return this.$config.topTagColors[params.name];
                  console.log(params);
                  // me.echartsColor[params.dataIndex],
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 画chart
      barCharts.setOption(option);
      // 重置
      window.addEventListener("resize", () => {
        barCharts.resize();
      });
    }
  }
};
</script>
<style lang="less">
.echartsBox {
  width: 100%;
  height: 100%;
  .chartBox {
    width: 100%;
    height: 100%;
  }
  .legends {
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 80px;
    position: absolute;
    right: 15px;
    top: 0;
    ul {
      li {
        font-size: 12px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          color: #fff;
          border-radius: 3px;
          margin-right: 5px;
        }
        i {
          text-align: right;
          font-style: normal;
        }
      }
    }
  }
}
</style>
