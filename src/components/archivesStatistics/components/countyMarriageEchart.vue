<template>
  <div>
    <p class="title-text">跨县市联姻情况 （共{{marriageTotal}}个）</p>
    <!-- chart -->
    <div id="countyMarriageEchart"></div>
    <!-- 卡片 -->
    <ul class="region-list">
      <li v-for="(item,index) in cardData" :key="index">
        <div class="num">{{ item.value }}</div>
        <div class="region">{{ item.name }}</div>
      </li>
    </ul>
    <loading color="white" v-model="statusList.archivesLoadingShow"></loading>
    <!-- loading -->
    <!-- <div class="archives-loading-bg" v-show="statusList.archivesLoadingShow">
      <div class="archives-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as comApis from "@/api/common.js";
import Loading from '@/components/assembly/Loading'
export default {
  name: "countyMarriageEchart",
  components:{
    Loading
  },
   data() {
    return {
      statusList: {
        archivesLoadingShow: false
      },
      label: [],
      data: [],
      cardData: []
    };
  },
  computed: {
    marriageTotal () {
      let total = 0;
      this.data.forEach(item => total += item)
      return total;
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 初始化
    initData() {
      this.getData();
    },
    // 获取chart数据
    getData () {
      this.statusList.archivesLoadingShow = true;
      // $axios.then(...)
      comApis
        .getCountyMarriage()
        .then(response => {
          if (response.code == 200) {
            this.statusList.archivesLoadingShow = false;
            let data = [];
            let label = [];
            response.data.forEach(item => {
              data.push(item.count);
              label.push(item.typeName);
            })
            this.data = data;
            this.label = label;
            // 构建card数据
            this.getCardData();
            // 初始化chart
            this.initChart();
          } else {
            this.$Message.warning(response.message);
            this.statusList.archivesLoadingShow = false;
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
      // this.data = [85, 103, 142, 251, 367, 491, 672, 868, 1234];
      // this.label = ["博湖县","和硕县", "和静县", "且末县", "若羌县", "尉犁县", "轮台县", "焉耆县", "库尔勒市"];
      // // 构建card数据
      // this.getCardData();
      // // 初始化chart
      // this.initChart();
    },
    // 构建渲染卡片data
    getCardData () {
      this.data.forEach((item, index) => {
        this.cardData.push({value:item, name: this.label[index]});
      })
    },
    // 初始化chart + 页面变化重置chart
    initChart() {
      var barCharts = this.$echarts.init(document.getElementById("countyMarriageEchart"));
      var option = {
        title: {
          // text: 'ECharts 入门示例'
        },
        tooltip: {},
        // legend: {
        // data: ["通过审核的图谱数"],
        // y:"bottom"
        // },
        xAxis: {},
        yAxis: {
          data: this.label
        },
        color: ["#2d89fc"],
        series: [
          {
            name: " 跨县市联姻",
            type: "bar",
            data: this.data,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#2d89fc",
                    fontSize: 16
                  }
                }
              }
            },
            // itemStyle:{
            //   normal: {
            //     color:"#2d89fc"
            //   }
            // },
            barMaxWidth: "50%"
          }
        ]
      };
      barCharts.setOption(option);
      // 重置
      window.addEventListener("resize", () => {
        barCharts.resize();
      });
    }
  }
};
</script>

<style lang='less' scoped>
.title-text {
  font-size: 16px;
  font-weight: 700;
  padding-left: 20px;
  padding-top: 20px;
}
#countyMarriageEchart {
  width: 100%;
  height: 450px;
}
.region-list {
  overflow: hidden;
  padding-top: 10px;
  margin-right: -20px;
  li {
    float: left;
    width: 20%;
    text-align: center;
    box-sizing: border-box;
    padding-right: 20px;
    .num {
      height: 50px;
      line-height: 50px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
    .region {
      font-size: 16px;
    }
  }
}
.archives-loading-bg{
  position: fixed;
  right:0;
  bottom:0;
  background:rgba(0,0,0,.5);
  // width: calc(100% - 252px);
  // height: calc(100% - 68px);
  width: 100%;
  height: 100%;
}
</style>
