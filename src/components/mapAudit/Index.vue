<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 14:58:51
 * @LastEditTime: 2019-08-26 15:10:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="collection-container m-container" @click="handleWrapperClick($event)">
    <app-header :items="statusList" title="图谱审核" :showSearch="false"></app-header>
    <div
      class="collection-content"
      ref="content"
      :style="{width:contentWidth,height:contentHeight+'px'}"
    >
      <side-bar ref="sideBar" @on-click="handleClick"></side-bar>
      <div class="right-content" ref="rightContent">
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMixin } from "./mixin/mapMixin";
import appHeader from "@/components/assembly/AppHeader";
import SideBar from "./components/SideBar";
import * as apis from "@/api/collection/index.js";
export default {
  name: "CollectHome",
  components: {
    appHeader,
    SideBar,
    Dashboard: () => import("./components/Dashboard"),
    MapReview: () => import("./components/MapReview")
  },
  mixins: [mapMixin],
  data() {
    return {
      componentsList: ["Dashboard", "MapReview"],
      curIndex: 0,
      contentWidth: "100%",
      contentHeight: 540
    };
  },
  computed: {
    currentComponent() {
      return this.componentsList[this.curIndex];
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  created() {
    this.resizeHandler();
    // this.judgeAuthority();
  },
  methods: {
    handleClick(index) {
      this.curIndex = index;
    },
    resizeHandler(height = 70) {
      this.$nextTick(() => {
        if (this.$refs.content) {
          let body = document.body;
          if (body.clientHeight - height < 600) {
            this.contentHeight = 600 - height;
          } else {
            this.contentHeight = body.clientHeight - height;
          }
          if (body.clientWidth < 1200) {
            this.contentWidth = "1200px";
          } else {
            this.contentWidth = "100%";
          }
        } else {
          this.contentHeight = 600 - height;
          this.contentWidth = "100%";
        }
      });
    },
    // 权限判断
    judgeAuthority() {
      apis.GET_MAP_AUDIT_AUTHORITY().then(res => {
        if (res.code === 200) {
          console.log(res.data, 888);

          if (
            !this.hasPageAuth(this.constantPageMap.PAGE_Result_ID) &&
            !res.data
          ) {
            this.$Message.info(this.constantNoAuthData);
            return;
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./css/style.less";
</style>


