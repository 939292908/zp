<template>
  <div class="native-clansman">
    <loading color="white" v-model="statusList.archivesLoadingShow"></loading>
    <div class="top-title">
      <span>本地宗族梳理情况</span>（共{{ spectrumArchiveCount }}个）
    </div>
    <Alert class="top-info" show-icon>
      通过对
      <span>{{ householdCount.count }}</span>张
      <span>{{ householdCount.typeName }}</span>和
      <span>{{ highriskCount.count }}</span>张
      <span>{{ highriskCount.typeName }}</span>的自动关联串并，共梳理出
      <span>{{ spectrumArchiveCount }}</span>个宗族。
    </Alert>
    <div id="barCharts"></div>

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
  name: "nativeClansman",
  components:{
    Loading
  },
  data() {
    return {
      statusList: {
        archivesLoadingShow: false
      },
      label: ["100人以上","100-51人","50-31人","30-21人","20-11人","10-5人","5人以下"],
      data: [48, 65, 75, 100, 60, 40, 50],
      householdCount: 0,
      highriskCount: 0,
      spectrumArchiveCount: 0,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 初始化
    initData() {
      this.getData();
      this.getTotal();
    },
    // 获取chart数据
    getData () {
      // $axios.then(...)
      this.statusList.archivesLoadingShow = true;
      comApis.getArchivesNativeClansman()
      .then(response => {
        if (response.code == 200) {
          this.statusList.archivesLoadingShow = false;
          console.log(response.data);
          this.data = response.data.counts;
          this.label = response.data.titles;
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
      // this.data = [4, 9, 5, 7, 42, 113056, 583624];
      // this.label = ["100人以上", "100-51人", "50-31人", "30-21人", "20-11人", "10-5人", "5人以下"];
      // this.data = [4, 9, 5, 7, 42, 113056, 583624];
      // this.label = ["100人以上", "100-51人", "50-31人", "30-21人", "20-11人", "10-5人", "5人以下"];
      // // 初始化chart
      // this.initChart();
    },
    // 获取统计数
    getTotal () {
      // $axios.then(...)
      comApis.getArchivesTitleTotal()
      .then(response => {
          if (response.code == 200) {
            // this.statusList.archivesLoadingShow = false;
            console.log(response.data);

            this.householdCount = response.data.householdCount;
            this.highriskCount = response.data.highriskCount;
            this.spectrumArchiveCount = response.data.spectrumArchiveCount;
          } else {
            this.$Message.warning(response.message);
            // this.statusList.archivesLoadingShow = false;
          }
        })
        .catch(error => {
          // this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
      // this.householdCount = 42362;
      // this.highriskCount = 83712;
      // this.spectrumArchiveCount = 1182;
    },
    // 初始化chart + 页面变化重置chart
    initChart() {
      var barCharts = this.$echarts.init(document.getElementById("barCharts"));
      var option = {
        title: {
          // text: 'ECharts 入门示例'
        },
        tooltip: {},
        // legend: {
        // data: ["通过审核的图谱数"],
        // y:"bottom"
        // },
        xAxis: {
          data: this.label
        },
        yAxis: {},
        color: ["#2d89fc"],
        series: [
          {
            name: " 宗族数量",
            type: "bar",
            data: this.data,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
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
      // 点击图表事件
      barCharts.on('click', ( param ) => {
        console.log(param);
        let routeData = this.$router.resolve({
          name:'Archives',
          query:{
            familyPersonNum:param.name,
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
.native-clansman {
  padding: 0 10px;
  .top-title {
    font-size: 16px;
    line-height: 60px;
    span {
      font-weight: 700;
    }
  }
  .top-info {
    span {
      font-weight: 700;
      padding: 0 2px;
      text-decoration: underline;
    }
  }
  #barCharts {
    width: 100%;
    height: 450px;
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

