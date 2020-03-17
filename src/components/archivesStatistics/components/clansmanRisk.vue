<template>
  <div class="clansman-risk">
    <div class="top-title">
      <span>宗族风险评估</span>（共{{total}}个）
    </div>
    <!-- echarts -->
    <div id="clansmanRiskCharts"></div>
    <ul class="circleUl">
      <li v-for="(item,index) in circleData" :key="index" class="circleLi">
        <span class="text" :style="{color:circleColor[index]}"> {{ item[2] + ':' }} </span>
        <span> {{ item[4] }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as comApis from "@/api/common.js";

export default {
  name: "clansmanRisk",
  data() {
    return {
      // 圆数据： x, y, lable, 数量, 百分比, 等级
      circleData: [
        [3, 6, "极高", 100 , '10%', 4],
        [1, 2, "高", 300, '30%', 3],
        [5, 2, "中", 200, '20%', 2],
        [7, 5, "低", 150, '15%', 1],
        [9, 2, "无", 250, '25%', 0]
      ],
      total: 0,
      // 圆颜色
      circleColor: ["#E80B0B", "#FF8300", "#FFCE0F", "#4960E1", "#c6c6c6"],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 初始化
    initData() {
      this.getData();
    },
    // 获取数据
    getData () {
      let me = this;
      // $axios.then(...)
      comApis.getArchivesClansmanRisk()
      .then(response => {
        if (response.code == 200) {
          // this.statusList.archivesLoadingShow = false;
          console.log(response.data);
          this.total = response.data.totalCount;
          let res = response.data.listDetail;
          // 处理数据
          me.buildData(res);
          // 初始化chart
          this.initChart();
        } else {
          this.$Message.warning(response.message);
          // this.statusList.archivesLoadingShow = false;
        }
      })
      .catch(error => {
        // this.statusList.archivesLoadingShow = false;
        console.log(error);
      });
      // let res = [
      //   {
      //     "riskLevel": 0,
      //     "riskValue": 251
      //   },
      //   {
      //     "riskLevel": 1,
      //     "riskValue": 149
      //   },
      //   {
      //     "riskLevel": 2,
      //     "riskValue": 199
      //   },
      //   {
      //     "riskLevel": 3,
      //     "riskValue": 301
      //   },
      //   {
      //     "riskLevel": 4,
      //     "riskValue": 100
      //   },
      // ];
      // this.total = 1000;


      // // 处理数据
      // me.buildData(res);
      // // 初始化chart
      // this.initChart();
    },
    // 构建数据
    buildData ( res ) {
       // 圆数据： x, y, lable, 数量, 百分比, 等级
      let data = [
        [9, 2, "无"],
        [7, 5, "低"],
        [5, 2, "中"],
        [1, 2, "高"],
        [3, 6, "极高"],
      ];
      res.forEach((item, index) => {
        data[index].push(item.riskValue); // 数量
        data[index].push(Math.round(item.riskValue / this.total * 10000) / 100.00 + '%');  // 百分比
        data[index].push(item.riskLevel);  // 等级
      });
      // 排序
      data.sort((a,b) => b[5]-a[5]);
      // 赋值
      this.circleData = data;
    },
    // 初始化chart
    initChart() {
      // 指定：圆最大、最小值
      var MAX = 208;
      var MIN = 108;
      // 数据：圆最大、最小值
      var maxData = Math.max.apply(Math, this.circleData.map(item => item[3]));
      var minData = Math.min.apply(Math, this.circleData.map(item => item[3]));

      var barCharts = this.$echarts.init(
        document.getElementById("clansmanRiskCharts")
      );
      var option = {
        xAxis: {
          show: false
        },
        yAxis: {
          show: false,
          boundaryGap: ['0%', '26%'], // 下上留白
        },
        series: [
          {
            data: this.circleData,
            // 设置每个圆大小
            symbolSize: (rawValue, params) => {
              let size = rawValue[3]; // 当前圆大小
              if (size == minData) {
                size = MIN;
              } else if (size == maxData) {
                size = MAX;
              } else {
                size = (size - minData)/(maxData - minData)*(MAX-MIN) + MIN;
              }
              
              params.symbolSize = size;
              return params.symbolSize;
            },
            type: "scatter",
            label: {
              show: true, //开启显示
              position: "inside", //在内部显示
              align: "center",
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 16
              },
              formatter: "{@[2]}\n\n{@[3]}"
            },
            itemStyle: {
              //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                opacity: 1,
                // 每个设置颜色
                color: params => this.circleColor[params.dataIndex]
              }
            }
          },
        ]
      };
      barCharts.setOption(option);
      // 点击图表事件
      barCharts.on('click', ( param ) => {
        console.log(param);
        let routeData = this.$router.resolve({
          name:'Archives',
          query:{
            risk: param.data[2],
          }
        })
        window.open(routeData.href, '_blank');
      });
      // 重置
      window.addEventListener("resize", () => {
        barCharts.resize();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.clansman-risk {
  padding: 0 10px;
  margin-bottom: 40px;
  .top-title {
    font-size: 20px;
    padding-top: 30px;
    span {
      font-weight: 700;
    }
  }
  #clansmanRiskCharts {
    width: 100%;
    height: 450px;
  }
  .circleUl {
    overflow: hidden;
    width: 50%;
    margin: 0 auto;
    .circleLi {
      float: left;
      width: 20%;
      font-size: 14px;
      .text {
        font-weight: 700;
      }
    }
  }
}
</style>

