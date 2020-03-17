<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 09:10:43
 * @LastEditTime: 2019-10-31 14:30:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="collection-container m-container" @click="handleWrapperClick($event)">
    <app-header :items="statusList" title="统计分析" :showSearch="false"></app-header>
    <div class="collection-content" ref="content" :style="{width:contentWidth}">
      <side-bar ref="sideBar" @on-click="handleSideBarClick"></side-bar>
      <div class="right-content" ref="rightContent">
        <router-view />
        <!-- <component ref="comContent" :is="currentComponent"></component> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapMixin } from "./mixin/mapMixin";
import appHeader from "@/components/assembly/AppHeader";
import SideBar from "./components/SideBar";
export default {
  name: "CollectHome",
  components: {
    appHeader,
    SideBar
  },
  mixins: [mapMixin],
  data() {
    return {
      curIndex: 0,
      contentWidth: "100%",
      contentHeight: 540
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  created() {
    this.resizeHandler();
  },
  methods: {
    handleSideBarClick(index, item) {
      this.curIndex = index;
      this.$router.push(item.route);
    },
    resizeHandler(height = 70) {
      this.$nextTick(() => {
        if (this.$refs.content) {
          let body = document.body;
          if (body.clientHeight - height < 600) {
            // this.contentHeight = 600 - height;
          } else {
            // this.contentHeight = body.clientHeight - height;
          }
          if (body.clientWidth < 1200) {
            this.contentWidth = "1200px";
          } else {
            this.contentWidth = "100%";
          }
        } else {
          // this.contentHeight = 600 - height;
          this.contentWidth = "100%";
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./css/style.less";
</style>
