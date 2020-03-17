<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 09:11:15
 * @LastEditTime: 2019-09-20 09:11:15
 * @LastEditors: your name
 -->
<template>
  <div id="org-chart-container">
    <div id="m-cont" class="menu-container">
      <!-- <v-layout row>
        <v-btn @click="bigger()">+</v-btn>
        <v-btn @click="smaller()">-</v-btn>
      </v-layout>

      <v-card>
        <v-card-title>
          <div slot="header" class="action-title">
            <span>Support actions</span>
          </div>
          <div v-for="action in supportActions" :key="action" class="action-item">
            {{'* ' + action}}
          </div>
        </v-card-title>
      </v-card>-->
    </div>
    <div id="id_r_box" class="class_r_box">
      <div class="list">
        <div class="title">
          <span
            v-if="mainPerson.mainPersonData.label=='village'"
            @click="handleChangeType('totalPeople')"
            :class="'hd ' + (currentPane == 'totalPeople' ? 'selected': '')"
          >弟子总人数列表</span>
          <span
            @click="handleChangeType('qc')"
            :class="'qc ' + (currentPane == 'qc' ? 'selected': '')"
          >{{isLocalSystemPage ? '弟子列表' : '亲传弟子列表'}}</span>
          <span
            v-if="mainPerson.mainPersonData.label!='village' && !isLocalSystemPage"
            @click="handleChangeType('hd')"
            :class="'hd ' + (currentPane == 'hd' ? 'selected': '')"
          >头面人物列表</span>
        </div>
        <div class="areaDistribution">
          <ul>
            <li v-for="(item,index) in mainPerson.mainPersonData.areaDistribution" :key="index">
              <span>{{item.areaName+'：'}}</span>
              <span>{{item.count+'人'}}</span>
            </li>
          </ul>
        </div>
        <div class="cont-box">
          <div
            class="box"
            v-for="(item,index) in mainPerson.mainPersonData.data"
            :key="index"
            @click="toResult(item.idNumber)"
          >
            <div class="box-left">
              <img :src=" imgPath+item.idNumber+'.jpg' " alt />
              <span
                :style="{background:personLabel[item.stateStrong == null ? '空' : item.stateStrong]}"
              >{{item.stateStrong == null ? '空' : item.stateStrong}}</span>
            </div>
            <div class="box-right">
              <p>{{item.name}}</p>
              <p>{{item.idNumber}}</p>
              <p :title="item.currentAddress">{{item.currentAddress}}</p>
            </div>
          </div>
        </div>
      </div>
      <Page
        class="table-page-small"
        :total="mainPerson.mainPersonData.total"
        size="small"
        :current="mainPerson.mainPersonData.currentPageIndex"
        :page-size="mainPerson.mainPersonData.pageSize"
        show-total
        show-elevator
        @on-change="handlePageChange"
      ></Page>
    </div>
    <religious-overview :isShowSelfDisciple="!isLocalSystemPage"></religious-overview>
  </div>
</template>

<script>
import OrgChart from "./org-chart";
import Vue from "vue";
import { generateOrgChartData } from "../base/data-generator";
import ReligiousOverview from "./religiousOverview";

export default Vue.extend({
  name: "Heritage",
  data() {
    // data:{
    //     data: null,
    //     orgChart: null,
    //     supportActions: [
    //       'click node to toggle',
    //       'drag canvas',
    //       'use mouse wheel to zoom',
    //       'button control to zoom'
    //     ],
    // },
    return {
      path: this.$config.joinPath,
      imgPath: this.$config.imgPath,
      token: "",
      data: null,
      orgChart: null,
      isLocalSystemPage: this.$route.query.id == 4, // 是否 本地体系
      optChart: {
        showSelfDisciple: this.$route.query.id != 4, // show亲传弟子
        showChieftain: this.$route.query.id != 4, // show头面人物
      },
      supportActions: [
        "click node to toggle",
        "drag canvas",
        "use mouse wheel to zoom",
        "button control to zoom"
      ],
      systemId: this.$route.query.id,
      resultNodes: [],
      mainPerson: {
        params: {},
        mainPersonData: {
          areaDistribution: [],
          data: [],
          pages: 0,
          currentPageIndex: 1,
          pageSize: 20,
          total: 0
        }
      },
      personLabel: {
        社会面: "#008800",
        收押: "#cb4324",
        收教: "#f7b940",
        境外: "#ffe900",
        死亡: "#6B6B6B",
        去向不明: "#0000fe",
        空: "#ccc"
      },
      currentPane: "qc"
    };
  },
  components: {
    ReligiousOverview
  },
  created() {
    this.getDataBySystemId();
    //this.data = generateOrgChartData(10);
  },
  mounted() {
    // this.orgChart = new OrgChart()
    // this.orgChart.draw(this.data)
    window.getMainPersonData = this.getMainPersonData;
  },
  methods: {
    getDataBySystemId() {
      let me = this;
      me.resultNodes = [];
      var params = new URLSearchParams();
      params.append("systemId", this.systemId);
      params.append("token", this.token);
      let url =
        this.path + "/InheritanceSystemResource/v1/InheritanceSystem/name";
      this.$axios
        .post(url, params)
        .then(response => {
          if (!response.data) {
            me.d3Loading = false;
            me.$Message.warning(response.message);
            return false;
          }
          if (response.code == 200) {
            let data = response.data;
            this.initData(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //初始化数据，默认显示
    initData(data) {
      let me = this;
      let temp = data;
      me.data = temp;
      this.orgChart = new OrgChart();
      this.orgChart.systemId = this.systemId;
      this.orgChart.draw(me.data, me.optChart);
    },
    test() {
      this.orgChart.draw(this.data, me.optChart);
    },
    bigger() {
      this.orgChart.bigger();
    },
    smaller() {
      this.orgChart.smaller();
    },
    handleChangeType(type) {
      if (this.currentPane != type) {
        this.mainPerson.mainPersonData.currentPageIndex = 1;
        this.getData();
      }
      this.currentPane = type;
    },
    getMainPersonData(params, data, type, areaName, label) {
      let me = this;
      me.currentPane = "qc";
      let temp = "";
      if (me.currentPane == "qc") {
        temp = data.mainPerson;
      } else {
        temp = data.headerPerson;
      }
      me.mainPerson.params = params;
      me.mainPerson.mainPersonData.areaDistribution = temp.areaDistribution;
      me.mainPerson.mainPersonData.data = temp.data;
      me.mainPerson.mainPersonData.currentPageIndex = temp.pageIndex;
      me.mainPerson.mainPersonData.pages = temp.pages;
      me.mainPerson.mainPersonData.total = temp.total;
      me.mainPerson.mainPersonData.type = type;
      me.mainPerson.mainPersonData.areaName = areaName;
      me.mainPerson.mainPersonData.label = label;
    },
    handlePageChange(pageIndex) {
      let me = this;
      me.mainPerson.mainPersonData.currentPageIndex = pageIndex;
      me.getData();
    },
    getData() {
      var me = this;
      let param = {
        pageIndex: me.mainPerson.mainPersonData.currentPageIndex,
        pageSize: me.mainPerson.mainPersonData.pageSize,
        systemId: me.systemId,
        areaName: me.mainPerson.mainPersonData.areaName,
        label: me.mainPerson.mainPersonData.label
      };
      // 展示的数据
      me.mainPerson.mainPersonData.type(param).then(response => {
        if (response.code == 200) {
          var data = response.data;
          let temp = "";
          // 亲传
          if (me.currentPane == "qc") {
            temp = data.mainPerson;
            // 总人数
          } else if (me.mainPerson.mainPersonData.label == "village") {
            temp = data.villagePeople;
            // 头面人物
          } else {
            temp = data.headerPerson;
          }

          me.mainPerson.mainPersonData.areaDistribution = temp.areaDistribution;
          me.mainPerson.mainPersonData.data = temp.data;
          me.mainPerson.mainPersonData.currentPageIndex = temp.pageIndex || 1;
          me.mainPerson.mainPersonData.pages = temp.pages;
          me.mainPerson.mainPersonData.total = temp.total;
        }
      });
    },
    toResult(idNumber) {
      var route = this.$router.resolve({
        path: "/result",
        query: {
          keyword: idNumber
        },
        target: "_blank"
      });
      window.open(route.href, "_blank");
    }
  }
});
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.orgChart {
  border: 1px solid black;
  height: 100%;
}

.menu-container {
  position: absolute;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 156px;
  display: flex;
  align-items: center;
  flex-direction: column;
  vertical-align: top;
  width: 400px;
  height: 100%;
  display: none;
  background-color: rgba(238, 237, 236, 0.5);
}
.action-title {
  font-size: 28px;
}

.action-item {
  font-size: 24px;
}
</style>

<style lang="less">
/*右键菜单弹框*/
#org-chart-container {
  overflow: hidden;
  #id_r_box {
    /* max-width: 600px; */
    background: #fff;
    -webkit-box-shadow: #ccc 0px 0px 8px;
    box-shadow: #ccc 0px 0px 8px;
    padding: 10px;
    border: 1px solid #ccc;
    display: none;
    /* table,td{
        border:1px solid #e8eaec;
        img{
          width: 55px;
          height: 75px;
          display: inline-block;
        }
      }
      table{
        width:100%;
        border-collapse: collapse;
        th,td{
          padding:5px;
        }
      } */
    .list {
      max-width: 952px;
      overflow: hidden;
      border: 1px solid #ccc;
      border-bottom: none;
      .title {
        border-bottom: 1px solid #ccc;
        padding: 5px;
        span {
          display: inline-block;
          padding: 4px 15px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 4px;
        }
        span.selected {
          background: #ddd;
        }
      }
      .areaDistribution {
        ul {
          overflow: hidden;
          padding-left: 15px;
          border-bottom: 1px solid #ccc;
          li {
            float: left;
            list-style: none;
            margin-right: 20px;
            line-height: 30px;
            font-size: 14px;
          }
        }
      }
      .cont-box {
        overflow: hidden;
        max-height: 480px;
        overflow-y: auto;
        .box {
          float: left;
          overflow: hidden;
          width: 236px;
          padding: 10px;
          border: 1px solid #ccc;
          border-top: none;
          border-left: none;
          cursor: pointer;
          .box-left {
            width: 80px;
            float: left;
            text-align: center;
            img {
              width: 80px;
              height: 110px;
            }
            span {
              width: 100%;
              height: 18px;
              display: inline-block;
              position: relative;
              top: -4px;
              color: #fff;
              vertical-align: top;
            }
          }
          .box-right {
            width: 120px;
            float: left;
            margin-left: 8px;
            text-align: left;
            p {
              margin-bottom: 5px;
            }
            p:nth-child(1) {
              font-weight: bold;
              color: #000;
            }
          }
        }
      }
    }
  }
}
#id_r_box .cont-box::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
#id_r_box .cont-box::-webkit-scrollbar-track {
  border-radius: 5px;
  background: none;
}
#id_r_box .cont-box::-webkit-scrollbar-thumb {
  background-color: rgba(32, 76, 157, 1);
  border-radius: 5px;
}
#id_r_box .cont-box::-webkit-scrollbar-thumb:hover {
  background-color: rgba(45, 183, 245, 1);
}
#id_r_box .cont-box::-webkit-scrollbar-corner {
  background-color: #dadada;
}
</style>
