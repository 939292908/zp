<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 09:09:18
 * @LastEditTime: 2019-09-29 14:10:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="map" style="width:750;height:100%"></div>
</template>

<script>
//import '../../../static/vendors/ht.js';
//require(`../../../static/vendors/${locale}.js`);
export default {
  name: "Map",
  data() {
    return {
      locale: this.$config.project.locale
      //geoCoordMap: this.$config.geoCoordMap
    };
  },
  created() {
    require(`../../../static/vendors/${this.locale}.js`); //引入不同地州的地图包
  },
  methods: {
    init(data) {
      var myChart = this.$echarts.init(document.getElementById("map"));
      myChart.on("click", function(params) {
        console.log(params);
        console.log(12121);
      });
      let option = this.buildOption(data);
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    buildOption(datas) {
      var geoCoordMap = datas.coordinate; //获取经纬度坐标
      var data = datas.data;
      var arr = [],
        res,
        keys = [];

      for (var i = 0; i < data.length; i++) {
        res = [];
        keys.push(data[i].zplx);

        for (var j = 0; j < data[i].qxarr.length; j++) {
          var geoCoord = geoCoordMap[data[i].qxarr[j].id];
          if (geoCoord) {
            res.push({
              name: data[i].qxarr[j].name,
              value: geoCoord.concat(data[i].qxarr[j].value)
            });
          }
        }
        arr.push({
          name: data[i].zplx,
          type: "scatter",
          coordinateSystem: "geo",
          data: res,
          symbolSize: function(val) {
            var item = 0;
            if (val[2] < 10) {
              item = val[2] * 3;
            } else if (val >= 10 && val < 100) {
              item = 10 + val / 10;
            } else if (val >= 100 && val < 1000) {
              item = 20 + val / 100;
            } else {
              item = 30 + Number((1000).toString().slice(0, 2));
            }
            return item;
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {}
        });
      }
      var sheight = document.documentElement.clientHeight;
      var swidth = document.documentElement.clientWidth;
      var ch = document.documentElement.clientHeight > 768;
      var temp = {
        bottom: ch ? "2%" : "2%",
        top: ch ? "5%" : "5%"
      };
      // 进行对arr数据的反转(2019-08-07 julie.wang)
      arr.reverse();
      console.log("arr", arr);
      return {
        color: [
          "#d22330",
          "#ff8400",
          "#ffea00",
          "#00ffcc",
          "#53c1ff",
          "#a800ff",
          "#63b81e"
        ],
        tooltip: {
          trigger: "item",
          formatter: function(params, ticket, callback) {
            var $name = params.name;
            var $val = params.value[2];
            var res = $name + $val;
            return res;
          }
        },
        legend: {
          data: keys,
          bottom: temp.bottom,
          itemGap: 15,
          textStyle: {
            color: "#71bdff",
            fontSize: 12
          }
        },
        geo: {
          show: true,
          map: this.locale,
          left: "10%",
          roam: true,
          zoom: 1,
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 0.1
          },
          top: temp.top,
          // center: ['10%', '10%'],
          itemStyle: {
            areaColor: "rgba(19, 46, 115, 0.9)",
            borderColor: "rgba(22, 121, 202, 1)"
          },
          emphasis: {
            label: {
              show: true,
              color: "#fff"
            },
            itemStyle: {
              areaColor: "rgba(19, 46, 115, 0.9)"
            }
          }
        },
        series: arr
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
