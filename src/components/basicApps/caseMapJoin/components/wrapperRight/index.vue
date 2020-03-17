<template>
  <Drawer
    width="300"
    :closable="false"
    :mask="false"
    :mask-closable="false"
    class-name="drawer-list"
    v-model="drawerVisible"
  >
    <template v-if="nodeType">
      <component
        :is="currentComponent"
        :data="data"
        @on-close="handleClose"
        @on-item-click="handleItemEvent"
      ></component>
    </template>
  </Drawer>
</template>
<script>
import zPerson from "./personIdNumbers";
import zCaseClub from "./caseClubInfos";
import zLinePerson from "./lineSamePersons";
export default {
  name: "ZDrawer",
  components: {
    zPerson,
    zCaseClub,
    zLinePerson
  },
  data() {
    return {
      drawerVisible: false,
      currentComponent: null
    };
  },
  props: {
    value: Boolean,
    data: Object,
    nodeType: {
      type: String | Number,
      default: "p"
    }
  },
  methods: {
    // 复制事件
    handleCopyEvent() {
      let arr = this.data.unMatchList.map(x => x.idNumber);
      this.copyObj = arr.join(",");
      this.$nextTick(() => {
        let doc = document.getElementById("copyObj");
        doc.select();
        document.execCommand("Copy");
        this.$Message.info("复制成功");
      });
    },
    // 关闭事件
    handleClose() {
      this.drawerVisible = false;
      this.$emit("input", this.drawerVisible);
    },
    // 已匹配的身份证号点击事件
    handleItemEvent(item, index) {
      this.avtiveIndex = index;
      this.$emit("on-item-click", item, index);
    }
  },
  watch: {
    value: {
      handler(val) {
        this.drawerVisible = val;
        if (val) {
          switch (this.nodeType) {
            case "p":
              this.currentComponent = "zPerson";
              break;
            case "c":
              this.currentComponent = "zCaseClub";
              break;
            case "l":
              this.currentComponent = "zLinePerson";
              break;
          }
        }
      },
      immediate: true
    },
    nodeType: {
      handler(val) {
        if (val) {
          switch (val) {
            case "p":
              this.currentComponent = "zPerson";
              break;
            case "c":
              this.currentComponent = "zCaseClub";
              break;
            case "l":
              this.currentComponent = "zLinePerson";
              break;
          }
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .drawer-list {
  top: 125px;
  .ivu-drawer {
    top: 125px;
    bottom: 0;
    height: inherit;
  }
  .ivu-drawer-body {
    padding: 0;
    /deep/ .wrapper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
