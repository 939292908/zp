<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime: 2019-08-22 17:41:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2>辖区地图</h2>
    </div>
    <div class="mapManagemen-content" v-if="villageLists!=''">
      <div class="townshipName">{{townshipName}}</div>
      <ul class="villageList">
        <li v-for="(item,index) in villageLists" :key="index">
          <router-link
            :to="{name:'CollectDrawProfile',query:{areaCode:item.code}}"
            tag="a"
            target="_blank"
            class="content"
          >
            <div class="img" :id="'mapImg'+index"></div>
            <div class="drawn">{{item.name}}</div>
            <div :class="['draw',{drawed : item.description=='已绘制'}]">
              {{item.description}}
              <i
                class="iconfont icon-shangchuanchenggong"
                v-if="item.description=='已绘制'"
              ></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>{{errorMessage}}</div>
    <loading color="white" v-model="archivesLoadingShow"></loading>
  </div>
</template>
<script>
// import * as comApis from "@/api/collection.index.js";
import * as apis from "@/api/collection/index.js";
import Loading from "@/components/assembly/Loading";
export default {
  name: "MapJurisdiction",
  data() {
    return {
      townshipName: "", //乡镇名称
      villageLists: [], //村列表
      villageList: [], //村列表分页
      errorMessage: "", //错误信息
      pageSize: 7, //每页显示数量
      archivesLoadingShow: false //加载中
    };
  },
  components: {
    Loading
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const that = this;
      that.archivesLoadingShow = true;
      apis
        .getVillageList()
        .then(res => {
          if (res.code == 200) {
            that.townshipName = res.data.areaName;
            that.villageLists = res.data.villageList;
            that.archivesLoadingShow = false; //加载完成
            this.$nextTick(() => {
              this.initMap();
            });
          } else {
            console.log(res.msg);
            that.errorMessage = "数据加载失败！";
            that.archivesLoadingShow = false; //加载完成
          }
        })
        .catch(response => {
          console.log(response);
          that.errorMessage = "数据加载失败！";
          that.archivesLoadingShow = false; //加载完成
        });
    },
    // 提示警告
    instance(content) {
      this.$Message.info(content);
    },
    initMap() {
      for (let i = 0; i < this.villageLists.length; i++) {
        var map = new BMap.Map("mapImg" + i); // 创建Map实例
        var point = new BMap.Point(
          this.villageLists[i].longitude,
          this.villageLists[i].latitude
        ); // 创建点坐标
        map.centerAndZoom(point, 17);
        map.disableDragging();
      }
    }
  }
};
</script>
<style lang="less" scope>
.archives-loading-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
}
.townshipName {
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
}
.villageList {
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  li {
    width: 20%;
    float: left;
    line-height: 20px;
    text-align: center;
    .content {
      margin: 10px;
      padding: 5px;
      color: #000000;
      overflow: hidden;
      text-align: center;
      border: 1px solid #bbbbbb;
      display: block;
      .img {
        width: 100%;
        height: 130px;
        // background: #cccccc;
      }
      .drawn {
        font-size: 15px;
        margin-top: 10px;
      }
      .draw.drawed {
        color: #249b3a;
      }
      .draw {
        font-size: 13px;
        margin-top: 2px;
        color: #a8acb3;
      }
    }
  }
}
.BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none;
}
.villageList::after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
</style>
