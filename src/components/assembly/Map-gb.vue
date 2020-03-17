<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime: 2019-08-07 09:22:49
 * @LastEditors: your name
 -->
<template>
  <div id="map" style="width:750;height:100%"></div>
</template>

<script>
import aks from "../../../static/vendors/gb.js";
//require(`../../../static/vendors/${locale}.js`);
export default {
  name: "Map",
  props: {
    color: {
      type: String,
      default: "#3aa8fb"
    },
    areaColor: {
      type: String,
      default: "rgba(19, 46, 115, 0.9)"
    },
    borderColor: {
      type: String,
      default: "rgba(128, 0, 126, 1)"
    }
  },
  data() {
    return {
      locale: this.$config.project.locale,
      features: "",
      aksGeoCoordMap: {
        阿克苏市: ["80.324904", "41.144744"],
        阿瓦提县: ["80.315861", "40.244391"],
        拜城县: ["81.666379", "41.990331"],
        柯坪县: ["79.056459", "40.517359"],
        乌什县: ["79.249199", "41.240071"],
        新和县: ["82.167463", "41.346201"],
        库车县: ["83.416478", "41.774741"],
        沙雅县: ["82.894191", "40.676439"],
        温宿县: ["80.1772", "41.5496"],
        莎车县: ["69.056459", "25.517359"]
      },
      systemType: [
        "荒地讲经堂",
        "阿买合苏木体系",
        "马木提·艾山体系",
        "本地宗教传承体系"
      ],

      systemData0: [],
      systemData1: [],
      systemData2: [
        // [{name: "柯坪县"},{name: "阿瓦提县",value: "0"}]
      ],
      systemData3: [],
      aksCityMapSeries: {
        type: "map",
        mapType: this.locale,
        geoIndex: 0,
        label: {
          normal: {
            show: true,
            fontSize: 20,
            textStyle: {
              color: "blue"
            }
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            show: true,
            color: "blue"
          }
        },
        data: [
          { name: "阿克苏市", value: "-1" },
          { name: "阿瓦提县", value: "-2" },
          { name: "拜城县", value: "-3" },
          { name: "柯坪县", value: "-4" },
          { name: "乌什县", value: "-5" },
          { name: "新和县", value: "-6" },
          { name: "库车县", value: "-7" },
          { name: "沙雅县", value: "-8" },
          { name: "温宿县", value: "-9" }
        ]
      }
    };
  },
  created() {
    //require(`../../../static/vendors/${this.locale}.js`);  //引入不同地州的地图包
  },
  methods: {
    init(data) {
      var myChart = this.$echarts.init(document.getElementById("map"));
      let option = this.buildOption(data);
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    getColor(value) {
      if (value <= 20) {
        return "#00ffff";
      } else if (value <= 40) {
        return "#00ff00";
      } else if (value <= 60) {
        return "#ffff00";
      } else if (value <= 80) {
        return "#ffa500";
      } else if (value <= 100) {
        return "#ff3333";
      } else {
        return "#ddd";
      }
    },
    buildOption(datas) {
      var me = this;
      if (Object.keys(datas).length > 0) {
        me.systemType = datas.name;
        me.systemData0 = datas.system[0];
        me.systemData1 = datas.system[1];
        me.systemData2 = datas.system[2];
      }

      var planePath = "arrow";
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          if (dataItem.length > 0) {
            var fromCoord = me.aksGeoCoordMap[dataItem[0].name];
            var toCoord = me.aksGeoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[1].value
              });
            }
          }
        }
        return res;
      };
      var dataRange = {
        x: "-1000 px",
        y: "-1000 px",
        splitList: [
          { start: -1, end: -1, label: "阿克苏市", color: "#cfc5de" },
          { start: -2, end: -2, label: "阿瓦提县", color: "#93a8a6" },
          { start: -3, end: -3, label: "拜城县", color: "#8688ba" },
          { start: -4, end: -4, label: "柯坪县", color: "#88a27c" },
          { start: -5, end: -5, label: "乌什县", color: "#c190a8" },
          { start: -6, end: -6, label: "新和县", color: "#a1bab4" },
          { start: -7, end: -7, label: "库车县", color: "#cecd97" },
          { start: -8, end: -8, label: "沙雅县", color: "#bb9391" },
          { start: -9, end: -9, label: "温宿县", color: "#889cae" }
        ]
      };
      var color = ["#195bb9", "#df005c", "#792ac0", "#248208"];
      var series = [];
      series.push(this.aksCityMapSeries);
      [
        [this.systemType[0], this.systemData0],
        [this.systemType[1], this.systemData1],
        [this.systemType[2], this.systemData2],
        [this.systemType[3], this.systemData3]
      ].forEach(function(item, i) {
        series.push(
          {
            name: item[0],
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 6, //箭头指向速度，值越小速度越快
              trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
              //color: 'red',
              // symbol: 'arrow', //箭头图标
              symbol: planePath, //箭头图标
              symbolSize: 8 //图标大小
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0.3 //尾迹线条曲直度
              }
            }
            //data: convertData(item[1]),
          },
          {
            name: item[0],
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {},
              emphasis: {}
            },
            symbol: "circle",
            symbolSize: function(val) {
              var dataRageValue = val[2].split(",")[0];
              var circleSize = 10;
              if (dataRageValue == 0 && val[2].split(",")[1] == 0) {
                return 0;
              }
              if (dataRageValue <= 50) return circleSize;

              var i = parseInt(dataRageValue / 100);
              circleSize = 10 + i * 2;
              if (circleSize >= 40) circleSize = 40;
              return circleSize;
            },
            itemStyle: {
              normal: {
                show: true,
                color: color[i],
                fontSize: 20
              }
            },
            data: item[1]
              ? item[1].map(function(dataItem) {
                  var dataRageValue = dataItem[1].value.split(",")[0];
                  dataRange.splitList.push({
                    start: dataRageValue,
                    end: dataRageValue,
                    label: dataItem[1].name,
                    color: color[i]
                  });
                  return {
                    name: dataItem[1].name,
                    value: me.aksGeoCoordMap[dataItem[1].name].concat([
                      dataItem[1].value
                    ])
                  };
                })
              : []
          }
        );
      });
      return {
        //series : arr
        tooltip: {
          trigger: "item",
          formatter: function(params, ticket, callback) {
            if (params.seriesType == "effectScatter") {
              var showValue = params.data.value[2].split(",");
              return (
                params.data.name +
                "<br />弟子总人数：" +
                (showValue[0] || "") +
                "<br />" +
                "亲传弟子：" +
                (showValue[1] || "")
              );
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                "->" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          }
        },
        dataRange: dataRange,
        legend: {
          orient: "vertical",
          top: "top",
          left: "left",
          data: this.systemType,
          textStyle: {
            color: "#000",
            fontSize: 15 //左上角文字大小
          },
          selectedMode: "multiple"
        },
        geo: {
          map: this.locale,
          zoom: 1.2,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          roam: true, //是否允许缩放
          zoom: 1,
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 0.1
          },
          itemStyle: {
            normal: {
              areaColor: "rgba(51, 69, 89, .5)", //地图背景色
              borderColor: "rgba(139,0,139,1)", //省市边界线
              borderWidth: 0.5
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          }
        },
        series: series,
        dataRange: dataRange
      };
    }
  },
  mounted() {
    // this.init();
  }
};
</script>

<style scoped>
</style>

