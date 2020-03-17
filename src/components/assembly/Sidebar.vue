<template>
  <div class="side-bars">
    <Menu
      :active-name="activeName"
      :open-names="['p1']"
      @on-select="navigateTo"
    >
      <Submenu key="p1" name="p1">
        <template slot="title">
          <Icon type="ios-paper"></Icon>后台管理
        </template>
        <Menu-item
          key="1-1"
          v-if="hasPageAuth(constantPageMap.PAGE_UserManager_ID)"
          :name="constantPageMap.PAGE_UserManager_ID"
          >用户管理</Menu-item
        >
        <Menu-item
          key="1-2"
          v-if="hasPageAuth(constantPageMap.PAGE_UserGroupManager_ID)"
          :name="constantPageMap.PAGE_UserGroupManager_ID"
          >用户组管理</Menu-item
        >
        <Menu-item
          key="1-3"
          v-if="hasPageAuth(constantPageMap.PAGE_Permission_ID)"
          :name="constantPageMap.PAGE_Permission_ID"
          >权限管理</Menu-item
        >
        <Menu-item
          key="1-4"
          v-if="hasPageAuth(constantPageMap.PAGE_RedList_ID)"
          :name="constantPageMap.PAGE_RedList_ID"
          >红名单</Menu-item
        >
        <Menu-item
          key="1-5"
          v-if="hasPageAuth(constantPageMap.PAGE_Regional_ID)"
          :name="constantPageMap.PAGE_Regional_ID"
          >行政区划维护</Menu-item
        >
        <Menu-item
          key="1-6"
          v-if="hasPageAuth(constantPageMap.PAGE_UnitMaintenance_ID)"
          :name="constantPageMap.PAGE_UnitMaintenance_ID"
          >单位维护</Menu-item
        >
        <Menu-item
          key="1-7"
          v-if="hasPageAuth(constantPageMap.PAGE_AreaBinding_ID)"
          :name="constantPageMap.PAGE_AreaBinding_ID"
          >区划绑定</Menu-item
        >
        <Menu-item
          key="1-8"
          v-if="hasPageAuth(constantPageMap.PAGE_CodeMaintenance_ID)"
          :name="constantPageMap.PAGE_CodeMaintenance_ID"
          >字典表维护</Menu-item
        >
        <Menu-item
          key="1-9"
          v-if="hasPageAuth(constantPageMap.PAGE_PersonLabel_ID)"
          :name="constantPageMap.PAGE_PersonLabel_ID"
          >人员标签管理</Menu-item
        >
        <Menu-item
          key="1-10"
          v-if="hasPageAuth(constantPageMap.PAGE_HelpConfig_ID)"
          :name="constantPageMap.PAGE_HelpConfig_ID"
          >帮助配置</Menu-item
        >
        <Menu-item
          key="1-11"
          v-if="hasPageAuth(constantPageMap.PAGE_ViewLog_ID)"
          :name="constantPageMap.PAGE_ViewLog_ID"
          >查询日志</Menu-item
        >
      </Submenu>
    </Menu>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  props: {
    active: {
      type: String,
      default: ""
    }
  },
  computed: {
    activeName() {
      return this.active || this.$route.meta.id;
    }
  },
  methods: {
    navigateTo(name) {
      if (name.indexOf("p") <= -1) {
        let route = this.$router.options.routes.find(x => {
          return x.meta.id == name;
        });
        this.$router.push(route);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@imageUrl: "../../../";
.side-bars {
  top: 68px;
  left: 0;
  bottom: 6px;
  position: absolute;
  overflow-x: hidden;
  width: 235px;
  /deep/ .ivu-menu {
    width: 100% !important;
    color: #d6e3ff;
  }
  /deep/ .ivu-menu-light {
    background: transparent;
  }
  /deep/ .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
    border-right: 1px solid transparent;
  }
  /deep/
    .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #d6e3ff;
    background: #132348;
    border-right: 1px solid #39f;
    z-index: 2;
  }
  /deep/ .ivu-menu-vertical.ivu-menu-light:after {
    background: transparent;
  }
}
</style>
