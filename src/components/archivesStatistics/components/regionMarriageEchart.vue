<template>
  <div class="regionMarriageEchart">
    <!-- 饼图 -->
    <div class="chartBox" :id="id"></div>
    <!-- 底部 -->
    <div class="region-marriage-card">
    <ul class="region-list ">
      <li v-for="(item,index) in data.chartData" :key="index">
        <div class="region-main">
          <div class="icon" :style="{backgroundColor: colors[index]}" ></div>
          <div class="content">
          <div class="region">{{ item.name }}</div>
          <div class="num">{{ item.value }}</div>
        </div>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
  name: "regionMarriageEchart",
  data() {
    return {
      colors: [
        // "rgb(58,161,255)",
        // "rgb(54,203,203)",
        // "rgb(78,203,115)",
        // "rgb(241,212,55)",
        // "rgb(242,99,123)",
          "#f68e56",
          "#f26c4f",
          "#00bff3",
          "#7accc8",
          "#a3d39c",
          "#82ca9c",
          "#3cb878",
          "#7cc576",
          "#0054a6",
          "#f7941d",
          "#f69679",
          "#f49ac1",
          "#605ca8",
          "#00a99d"
        ]
      // data: {
      //   total: 1500,
      //   region: '南疆',
      //   label: ["喀什", "和田", "阿克苏", "巴州", "克州"],
      //   chartData: [
      //     { value: 400, name: "喀什", color: "rgb(58,161,255)" },
      //     { value: 210, name: "和田", color: "rgb(54,203,203)" },
      //     { value: 170, name: "阿克苏", color: "rgb(78,203,115)" },
      //     { value: 130, name: "巴州", color: "rgb(241,212,55)" },
      //     { value: 90, name: "克州", color: "rgb(242,99,123)" },
      //   ]
      // }
    };
  },
  // props: ['data', 'id'],
  props: {
    data: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: "regionMarriageEchart"
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
            text: me.data.region + "        ",
            x:'center',
            y: '14',
            // left: "2%",
            textStyle: {
              fontSize: 18,
              color: "#333",
            },
          },
          {
            text: "          (" + me.data.total + ")",
            x:'center',
            y: '16',
            // left: "2%",
            textStyle: {
              fontSize: 16,
              color: "#666",
              fontWeight: 'normal',
            },
          },
          {
            text: me.data.region,
            subtext: me.data.total+'',
            textAlign: "center",
            x: "49%",
            y: "43%",
            textStyle: {
              fontSize: 12,
              color: "#666",
              fontWeight: 400
            },
            subtextStyle: {
              fontSize: 16,
              color: "#666"
            },
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // graphic: {
        //   //图形中间文字
        //   type: "text",
        //   left: "center",
        //   top: "center",
        //   style: {
        //     text: me.data.region + "\n" + me.data.total,
        //     textAlign: "center",
        //     fill: "#333",
        //     fontSize: 20
        //   }
        // },
        // // 交互点击legend
        // legend: {
        //   // orient: 'vertical',
        //   // top: 'middle',
        //   bottom: 0,
        //   left: "center",
        //   data: me.data.label
        // },
        series: [
          {
            name: "跨地区联姻",
            type: "pie",
            radius: ["34%", "56%"],
            center: ["50%", "50%"],
            selectedMode: "single",
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 15
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
                color: params => me.colors[params.dataIndex]
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
      // 点击图表事件
      barCharts.on('click', function (param){
        console.log(param);
        let routeData = me.$router.resolve({
          name:'Archives',
          query:{
            region: param.data.code,
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
<style lang='less' scoped>
.regionMarriageEchart {
  width: 100%;
  height: 100%;
  .chartBox {
    width: 100%;
    height: 100%;
  }
  .region-marriage-card {
    margin-right: -20px;
    margin-top: -30px;
  .region-list {
    overflow: hidden;
    width: 50%;
    margin: 0 auto 20px;
    li {
      float: left;
      width: 33.33%;
      text-align: center;
      box-sizing: border-box;
      margin-top: 16px;
      // padding-right: 20px;
      .region-main {
        position: relative;
        overflow: hidden;
        .icon {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          // left: 50%;
        }
        .content {
          margin-left: 20px;
          text-align: left;
          cursor: default;
          .region {
            font-size: 14px;
            font-family: SourceHanSansSC-regular;
          }
          .num {
            font-size: 18px;
            color: rgb(51, 51, 51);
            font-family: Arial;
          }
        }
      }
    }
  }
}
}
</style>
