<!--
 * @Author: your name
 * @Date: 2019-10-22 09:57:39
 * @LastEditTime: 2019-11-25 15:22:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\project\map-web\src\components\assembly\ArchivalInfo\archivalInfo.vue
 -->
<template>
  <!-- 档案信息 -->
  <div class="inforModal-wrap" @click.self="handleModel">
    <div class="inforModal">
      <div class="inforModal-sidebar">
        <div class="close-btn" @click="closeInforModal"></div>
      </div>
      <div class="cont-box">
        <div class="grid-box">
          <div class="title">
            <span @click="closeInforModal" class="close-modal">
              <i class="iconfont close icon-guanbi1"></i>
            </span>
          </div>
        </div>
        <personInforForm
          :idNumber="idNumber"
          :collectId="collectId"
          v-if="showPersonInfo"
          :markerObjDetail="markerObjDetail"
          :onlyShowBasicInformation="onlyShowBasicInformation"
        ></personInforForm>
        <MapInforForm v-if="showMapInfo" :mapId="mapId" :mapType="mapType" :mapInfo="mapInfo"></MapInforForm>
      </div>
    </div>
  </div>
</template>

<script>
import PersonInforForm from "@/components/assembly/ArchivalInfor/components/personInforForm";
import MapInforForm from "@/components/assembly/ArchivalInfor/components/mapInforForm";
export default {
  name: "ArchivalInforShow",
  props: {
    idNumber: {
      type: String,
      default: ""
    },
    markerObjDetail: {
      type: Object,
      default() {
        return {};
      }
    },
    detailType: {
      type: String,
      default: ""
    },
    mapInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    // 只展示基础信息
    onlyShowBasicInformation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPersonInfo: false,
      showMapInfo: false,
      // idNumber: "",
      collectId: "",
      mapId: "",
      mapType: ""
    };
  },
  components: {
    PersonInforForm,
    MapInforForm
  },
  methods: {
    closeInforModal() {
      this.$emit("listenToChild", false);
    },
    handleModel() {
      this.$emit("listenToChild", false);
    }
  },
  watch: {
    markerObjDetail: {
      handler(val) {}
    },
    detailType: {
      handler(val) {
        if (val == "person") {
          this.showPersonInfo = true;
          this.showMapInfo = false;
        }
        if (val == "map") {
          this.showPersonInfo = false;
          this.showMapInfo = true;
        }
      }
    },
    mapInfo: {
      handler(val) {}
    },
    idNumber: {
      handler(val) {}
    }
  }
};
</script>
<style lang="less" scoped>
.inforModal-wrap {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  outline: 0;
}
.inforModal {
  width: 529px;
  position: absolute;
  right: 0;
  top: 68px;
  bottom: 6px;
  z-index: 1003;
  .inforModal-sidebar {
    width: 17px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -17px;
    .close-btn {
      position: absolute;
      top: 28%;
      width: 17px;
      height: 43.7%;
      z-index: 99;
      cursor: pointer;
      background: url("../../../../static/images/close-btn.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
  }
  .cont-box {
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(left top, #11296d, #0c1837);
    .grid-box {
      width: 100%;
      height: 100%;
      position: absolute;
      background: url("../../../../static/images/grid.png") repeat repeat;
      .title {
        width: 100%;
        /* height: 47px;
  				line-height: 47px; */
        height: 44px;
        line-height: 44px;
        position: relative;
        background: url("../../../../static/images/vertical-line.jpg") repeat-x;
        background-size: 100% 100%;
        .close-modal {
          width: 40px;
          height: 40px;
          display: inline-block;
          text-align: center;
          position: absolute;
          top: 1px;
          right: 12px;
          cursor: pointer;
          .iconfont {
            font-size: 20px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
