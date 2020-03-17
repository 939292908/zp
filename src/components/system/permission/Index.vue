<template>
  <div class="permission-container" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="权限设置" :showSearch="false"></app-header>
    <side-bar></side-bar>
    <div class="content">
      <div class="wrapper">
        <div class="title">功能权限配置</div>
        <div class="wrapper-detail">
          <div class="wrapper-left">
            <div class="wrapper-title">
              <span>角色</span>
              <span
                class="wrapper-title-action"
                v-if="hasFunAuth(constantFunMap.FUN_Role_Add_ID)"
                @click="showAddRoleModal(null)"
              >
                <i class="iconfont icon-duorenyonghu2"></i>增加角色
              </span>
            </div>
            <div class="wrapper-grid">
              <div
                class="wrapper-grid-item"
                :class="{'active': n == activeIndex}"
                :key="n"
                v-for="(item,n) in roleList"
              >
                <div class="item-title" @click.stop.prevent="handleCurrentRow(item,n)">
                  <span @click.stop.prevent="showAddRoleModal(item)">{{item.roleName}}</span>
                </div>
                <!-- <div class="item-info"><i class="iconfont icon-duorenyonghu2"></i>5人</div> -->
                <div class="item-action">
                  <Poptip class="item-poptip" placement="right" v-if="hasShowListIcon(item)">
                    <i class="iconfont icon-liebiaoxianshi"></i>
                    <div slot="content">
                      <ul class="ivu-poptip-ul">
                        <li
                          v-if="hasFunAuth(constantFunMap.FUN_Role_AddUserGroup_ID)"
                          @click.stop.prevent="showSelectUsersModal(item,n)"
                        >
                          <i class="iconfont icon-duorenyonghu2"></i> 选择用户组
                        </li>
                        <!-- <li @click.stop.prevent="handleDeleteGroup(item,n)"><i class="iconfont icon-chexiao"></i> 删除用户组</li> -->
                        <li
                          v-if="hasFunAuth(constantFunMap.FUN_Role_Delete_ID) && item.roleId != '1'"
                          @click.stop.prevent="showDeleteUsersModal(item,n)"
                        >
                          <i class="iconfont icon-shanchuxuanzhong"></i> 删除角色
                        </li>
                      </ul>
                    </div>
                  </Poptip>
                </div>
              </div>
            </div>
          </div>
          <div class="wrapper-right">
            <Tree
              class="tree-role-list"
              ref="tree"
              :data="treeList"
              show-checkbox
              @on-check-change="handleTreeCheckChange"
              :render="renderContent"
            ></Tree>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加角色信息 -->
    <add-role v-model="addRoleModalVisible" :role="curRole" @on-ok="handleSave"></add-role>
    <!-- 添加用户组 -->
    <add-users v-model="addUsersModalVisible" :role="curRole" @check-change="handleUserChange"></add-users>
    <!-- 节点信息的编辑和新增 -->
    <right-dialog
      :title="dialogTitle"
      :statusList="statusList"
      @close="closeMultiModal"
      @ok="handleNodeSave"
    >
      <i-form
        ref="formPage"
        :model="formPage"
        :rules="rulePage"
        :label-width="100"
        v-if="nodeType == '1'"
      >
        <Form-item v-if="formPage.pageId" label="页面编码" prop="pageId">
          <i-input readonly disabled v-model="formPage.pageId" placeholder="请输入页面ID"></i-input>
        </Form-item>
        <Form-item label="页面编号" prop="pageCode">
          <i-input v-model="formPage.pageCode" :maxlength="25" placeholder="请输入页面编号"></i-input>
        </Form-item>
        <Form-item label="页面名称" prop="pageName">
          <i-input v-model="formPage.pageName" :maxlength="25" placeholder="请输入页面名称"></i-input>
        </Form-item>
        <Form-item label="页面路由" prop="routePath">
          <i-input v-model="formPage.routePath" placeholder="请输入页面路由"></i-input>
        </Form-item>
        <Form-item label="页面类型" prop="groupDescription">
          <radio-group v-model="formPage.pageType">
            <radio label="1" key="1">真实路径</radio>
            <radio label="2" key="2">虚拟路径</radio>
          </radio-group>
        </Form-item>
      </i-form>
      <i-form
        ref="formFun"
        :model="formFun"
        :rules="ruleFun"
        :label-width="100"
        v-if="nodeType == '2'"
      >
        <Form-item v-if="formFun.functionCode" label="功能编号" prop="functionCode">
          <i-input readonly disabled v-model="formFun.functionCode" placeholder="请输入功能编号"></i-input>
        </Form-item>
        <Form-item label="功能名称" prop="functionName">
          <i-input v-model="formFun.functionName" :maxlength="25" placeholder="请输入功能名称"></i-input>
        </Form-item>
        <Form-item label="接口地址" prop="interfaceAddress">
          <i-input v-model="formFun.interfaceAddress" placeholder="请输入接口地址"></i-input>
        </Form-item>
      </i-form>
    </right-dialog>
  </div>
</template>
<script>
import appHeader from "@/components/assembly/AppHeader";
import switchView from "@/components/assembly/SwitchView";
import rightDialog from "@/components/assembly/RightDialog";
import switchRightView from "@/components/assembly/SwitchRightView";
import sideBar from "@/components/assembly/Sidebar";
import addRole from "./components/AddRoles";
import addUsers from "./components/AddUsers";
import {
  permissionList,
  hasPermission,
  setPagePermissions
} from "../../../permissions.js";
import { constantRouterMap } from "../../../router";
import * as apis from "@/api/system/role.js";
export default {
  name: "Permission",
  components: {
    switchView,
    switchRightView,
    addRole,
    addUsers,
    rightDialog,
    sideBar,
    appHeader
  },
  data() {
    return {
      statusList: {
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        MultiModal: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      },
      msgType: "",
      activeIndex: 0,
      addRoleModalVisible: false,
      addUsersModalVisible: false,
      path: this.$config.mainPath + "idsecurity",
      roleList: [],
      treeList: [],
      curRole: null,
      treeCheckNodes: [],
      dialogTitle: "节点信息",
      formPage: {
        pageCode: "", //页面编码
        pageDepth: null, //页面深度
        pageId: "", //页面ID
        pageName: "",
        pageType: "1", //页面类型
        parentsPageId: 0, //父级页面ID
        routePath: "" //页面路由
      },
      rulePage: {
        pageCode: [
          { required: true, message: "页面编号不能为空", trigger: "blur" }
        ],
        pageName: [
          { required: true, message: "页面名称不能为空", trigger: "blur" }
        ],
        routePath: [
          { required: true, message: "页面路由不能为空", trigger: "blur" }
        ]
      },
      formFun: {
        functionName: "",
        interfaceAddress: "",
        pageId: null,
        resourceCode: "",
        resourceId: null
      },
      ruleFun: {
        functionName: [
          { required: true, message: "功能点名称不能为空", trigger: "blur" }
        ]
        // functionCode: [
        //   { required: true, message: '功能点Code不能为空', trigger: 'blur' }
        // ],
        // interfaceAddress: [
        //   { required: true, message: '接口地址不能为空', trigger: 'blur' }
        // ],
      },
      nodeType: "1"
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {
      apis.getRoleList().then(res => {
        if (res.code != 200) return;
        this.roleList = res.data.filter(x => {
          return x.roleId != "1";
        });
        if (this.roleList.length > 0) {
          console.log(this.roleList[0].roleId);
          this.getRoleTreeData(this.roleList[0].roleId);
        }
      });
    },
    getRoleTreeData(roleid) {
      apis.getRoleTreeList(roleid).then(res => {
        if (res.code != 200) return;
        let data = res.data;
        data.forEach(x => {
          x.expand = true;
        });
        if (!this.hasFunAuth(this.constantFunMap.FUN_Role_TreeCheckbox_ID))
          data = this._disabledCheckbox(data);
        this.treeList = data;
      });
    },
    hasShowListIcon(item) {
      let flag =
        this.hasFunAuth(this.constantFunMap.FUN_Role_AddUserGroup_ID) ||
        (this.hasFunAuth(this.constantFunMap.FUN_Role_Delete_ID) &&
          item.roleId != "1");
      return flag;
    },
    _disabledCheckbox(data) {
      data.forEach(x => {
        x.disableCheckbox = true;
        if (x.children.length > 0) {
          this._disabledCheckbox(x.children);
        }
      });
      return data;
    },
    handleCurrentRow(role, index) {
      if (this.activeIndex != index) {
        this.getRoleTreeData(role.roleId);
      }
      this.activeIndex = index;
    },
    handleSave() {
      this.getData();
    },
    /**
     * 保存用户组信息
     */
    handleNodeSave() {
      if (this.nodeType == "1") {
        //页面节点的添加
        // 验证必填项是否必填
        this.$refs["formPage"].validate(valid => {
          if (valid) {
            this._pageNodeSaveInfo();
          }
        });
      } else {
        //功能点节点的添加
        this.$refs["formFun"].validate(valid => {
          if (valid) {
            this._funNodeSaveInfo();
          }
        });
      }
    },
    /**
     * 树节点勾选状态更新
     */
    handleTreeCheckChange(nodes) {
      console.log(nodes);
      let tmpNodes = nodes.filter(x => {
        return x.children && x.children.length <= 0;
      });
      let ids = tmpNodes.map(x => {
        return x.resourceInfo && x.resourceInfo.resourceId;
      });
      let data = {
        roleID: this.roleList[this.activeIndex].roleId,
        resourceIDs: ids
      };
      apis.addNodesCheck(data).then(res => {
        if (res.code != 200) {
          this.$Message.error(res.message);
        } else {
          this._updatePermissions();
          // this.getRoleTreeData(this.roleList[this.activeIndex].roleId)
        }
      });
    },
    /**
     * 打开添加角色的模态框
     * @author julie.wang
     */
    showAddRoleModal(role) {
      document.querySelector(".permission-container").click();
      this.curRole = role;
      this.addRoleModalVisible = true;
    },
    /**
     * 显示选择用户的模态框
     */
    showSelectUsersModal(item, n) {
      document.querySelector(".permission-container").click();
      this.curRole = item;
      this.addUsersModalVisible = true;
    },
    /**
     * 删除角色的事件
     */
    showDeleteUsersModal(item, n) {
      document.querySelector(".permission-container").click();
      this.$Modal.confirm({
        title: "消息",
        content: "您确定要删除该角色信息吗？",
        onOk: () => {
          this._deleteRoleInfo(item, n);
        },
        onCancel: () => {}
      });
    },
    /**
     * 删除角色关联的用户组的数据
     */
    handleDeleteGroup(item, index) {
      this.$Modal.confirm({
        title: "消息",
        content: "您确定要删除该角色关联的用户组信息吗？",
        onOk: () => {
          this._deleteRoleGroupInfo(item, n);
        },
        onCancel: () => {}
      });
    },
    /**
     * 用户组,角色信息选择发生变化时
     */
    handleUserChange() {
      // this._updatePermissions();
    },
    /**
     * 关闭用户面板
     * @function closeMultiModal
     * @author erbing
     */
    closeMultiModal() {
      if (this.nodeType == "1") {
        this.$refs["formPage"].resetFields();
      } else {
        this.$refs["formFun"].resetFields();
      }
      this.statusList.MultiModal = false;
      this.statusList.ShowMultiModal = true;
    },
    /**
     * 更新权限数据
     */
    _updatePermissions() {
      // 跟新权限缓存状态
      permissionList()
        .then(res => {
          let resu1 = res[0];
          let resu2 = res[1];
          setPagePermissions(
            constantRouterMap,
            resu1,
            resu2,
            true,
            this.$route,
            this.constantPageMap.PAGE_Permission_ID
          );
          // constantRouterMap.forEach(x=>{
          //   x.meta.hasAuth = false;
          //   let pageRoles = resu1.data;
          //   let pageRole = pageRoles.find(c=>{
          //     return c.pageId == x.meta.id
          //   })
          //   if(pageRole) x.meta.hasAuth = true
          //   if(x.meta.id == this.constantPageMap.PAGE_Permission_ID) {
          //     let c = this.$route.meta.functions.concat(resu2.data)
          //     x.meta.functions = c
          //   }
          // })
          this.$router.options.routes = constantRouterMap;
          this.$store.commit("permissions", constantRouterMap);
        })
        .catch(res => {});
    },
    /**
     * 删除角色关联的用户组信息
     */
    _deleteRoleGroupInfo(item, index) {
      apis.deleteRoleGroup(item.roleId).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    /**
     * 删除角色信息
     */
    _deleteRoleInfo(item, index) {
      apis.deleteRoleInfo(item.roleId).then(res => {
        if (res.code == 200) {
          this.getData();
          this._updatePermissions();
          this.$Message.success("删除成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    /**
     * 页面节点的新增保存
     */
    _pageNodeSaveInfo() {
      let data = {
        pageCode: this.formPage.pageCode,
        pageDepth: this.formPage.pageDepth,
        pageName: this.formPage.pageName,
        pageType: this.formPage.pageType,
        parentsPageId: this.formPage.parentsPageId,
        routePath: this.formPage.routePath
      };
      if (this.formPage.pageId) {
        data.pageId = this.formPage.pageId;
      }
      apis.addPageNode(data).then(res => {
        if (res.code == 200) {
          this.$Message.success("操作成功");
          this.closeMultiModal();
          this.getRoleTreeData(this.roleList[this.activeIndex].roleId);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    /**
     * 功能节点的新增保存
     */
    _funNodeSaveInfo() {
      let data = {
        functionName: this.formFun.functionName,
        interfaceAddress: this.formFun.interfaceAddress,
        pageId: this.formFun.pageId,
        resourceCode: this.formFun.resourceCode
      };
      if (this.formFun.resourceId) {
        data.resourceId = this.formFun.resourceId;
      }
      apis.addFunNode(data).then(res => {
        if (res.code == 200) {
          this.$Message.success("操作成功");
          this.closeMultiModal();
          this.getRoleTreeData(this.roleList[this.activeIndex].roleId);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    /**
     * 返回首页
     * @author julie
     */
    backIndex() {
      this.$router.push({
        path: "/index"
      });
    },
    /**
     * 个人，消息，应用切换
     * @function getViewIndex
     * @author erbing
     */
    getViewIndex(index) {
      this.statusList.newsModalShow = false;
      this.statusList.appModalShow = false;
      this.statusList.personModalShow = false;
      if (index == "0") {
        this.statusList.personModalShow = true;
      } else if (index == "1") {
        this.statusList.newsModalShow = true;
      } else if (index == "2") {
        this.statusList.appModalShow = true;
      }
    },
    /**
     * 容器点击事件
     * @author julie
     */
    // handleWrapperClick(event) {
    //   this.statusList.uploadImg=false;
    //   this.statusList.personModalShow=false;
    //   this.statusList.newsModalShow=false;
    //   this.statusList.appModalShow=false;
    //   this.statusList.messageDetailsShow=false;
    //   this.statusList.guidelinesShow=false;
    //   this.statusList.feedbackShow=false;
    // },
    renderContents(h, { root, node, data }) {
      return (
        <span class="tree-item">
          <span
            class="tree-item-text"
            on-click={$event => this.handleNodeClick($event, root, node, data)}
          >
            {data.title}
          </span>
        </span>
      );
    },
    renderContent(h, { root, node, data }) {
      return (
        <span class="tree-item">
          <span
            class="tree-item-text"
            on-click={$event => this.handleNodeClick($event, root, node, data)}
          >
            {data.title}
          </span>
          {data.pageInfo ? (
            <poptip class="tree-item-poptip" placement="right">
              <i
                class="iconfont icon-jiahao"
                on-click={$event =>
                  this.handlePoptipClick($event, root, node, data)
                }
              ></i>
              <div slot="content">
                <ul class="ivu-poptip-ul">
                  {this.hasFunAuth(
                    this.constantFunMap.FUN_Role_EditTreeNodePage_ID
                  ) ? (
                    <li
                      on-click={$event =>
                        this.handleChildClick($event, root, node, data)
                      }
                    >
                      <i class="iconfont icon-guanxi"></i> 添加子页面
                    </li>
                  ) : (
                    ""
                  )}
                  {this.hasFunAuth(
                    this.constantFunMap.FUN_Role_EditTreeNodePage_ID
                  ) ? (
                    <li
                      on-click={$event =>
                        this.handleSameClick($event, root, node, data)
                      }
                    >
                      <i class="iconfont icon-gongtonglinju"></i> 添加同级页面
                    </li>
                  ) : (
                    ""
                  )}
                  {this.hasFunAuth(
                    this.constantFunMap.FUN_Role_EditTreeNodePage_ID
                  ) ? (
                    <li
                      on-click={$event =>
                        this.handleFunClick($event, root, node, data)
                      }
                    >
                      <i class="iconfont icon-gongtonglinju"></i> 添加功能点
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </poptip>
          ) : (
            ""
          )}
        </span>
      );
    },
    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    /**
     * 子集节点点击事件
     */
    handleChildClick(event, root, node, data) {
      this.nodeType = "1";
      this.formPage = {
        pageCode: "", //页面编码
        pageDepth: data.pageInfo.pageDepth + 1, //页面深度
        pageId: "", //页面ID
        pageName: "",
        pageType: "1", //页面类型
        parentsPageId: data.pageInfo.pageId, //父级页面ID
        routePath: "" //页面路由
      };
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
    },
    /**
     * 同级页面点击事件
     */
    handleSameClick(event, root, node, data) {
      this.nodeType = "1";
      this.formPage = {
        pageCode: "", //页面编码
        pageDepth: data.pageInfo.pageDepth, //页面深度
        pageId: "", //页面ID
        pageName: "",
        pageType: "1", //页面类型
        parentsPageId: data.pageInfo.parentsPageId, //父级页面ID
        routePath: "" //页面路由
      };
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
    },
    /**
     * 添加功能点事件
     */
    handleFunClick(event, root, node, data) {
      (this.nodeType = "2"),
        (this.formFun = {
          functionName: "",
          interfaceAddress: "",
          pageId: data.pageInfo.pageId,
          resourceCode: "",
          resourceId: null
        });
      this.formFun.pageId = data.pageInfo.pageId;
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
    },
    /**
     * 点击加好图标的事件
     */
    handlePoptipClick(event, root, node, data) {
      this.statusList.MultiModal = false;
      this.statusList.ShowMultiModal = false;
    },
    /**
     * 点击当前节点事件(编辑)
     */
    handleNodeClick(event, root, node, data) {
      if (data.pageInfo) {
        this.nodeType = "1";
        let form = JSON.parse(JSON.stringify(data.pageInfo));
        form.pageType = form.pageType + "";
        this.formPage = form;
      } else {
        this.nodeType = "2";
        let form = JSON.parse(JSON.stringify(data.resourceInfo));
        this.formFun = form;
      }
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
    }
  }
};
</script>
<style lang="less" scoped>
@widthH: 100%;
@imageUrl: "../../../../";
@borderColor: #dcdfe6;
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
.icons-item {
  font-size: 32px;
}

.ivu-poptip-ul {
  color: #333;
  text-align: left;
  li {
    padding: 8px 0;
    border-bottom: 1px solid @borderColor;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      color: #68a4f6;
      cursor: pointer;
    }
    > i.iconfont {
      margin-right: 8px;
    }
  }
}
.item-poptip {
  width: 30px;
  height: 30px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  background: #aab5c4;
  border-radius: 100%;
  color: #fff;
}
.permission-container {
  width: @widthH;
  height: @widthH;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  color: #68a4f6;
  overflow-x: hidden;
  overflow-y: hidden;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .content {
    .post(a);
    left: 0;
    top: 68px;
    left: 240px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    .wrapper {
      position: absolute;
      top: 2px;
      left: 0;
      right: 0;
      bottom: 6px;
      background: url("@{imageUrl}static/images/net.png") repeat #ffffff;
      border: solid 2px #91b5ff;
      border-radius: 5px 5px 0 0;
      box-shadow: 0px 0px 9px #666 inset;
      .title {
        position: absolute;
        top: -3px;
        left: -2px;
        right: -2px;
        border-radius: 5px 5px 0 0;
        height: 44px;
        line-height: 44px;
        background-color: #c7d7eb;
        overflow: hidden;
        font-size: 16px;
        padding-left: 16px;
        color: #2698ed;
      }
    }
    .wrapper-detail {
      position: absolute;
      top: 41px;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      display: flex;
      padding: 20px 40px;
      color: #333;
      .wrapper-left {
        width: 560px;
        height: 100%;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid @borderColor;
        background: #ffffff;
        .wrapper-title {
          height: 70px;
          line-height: 70px;
          font-size: 18px;
          padding: 0 20px;
          border-bottom: 1px solid @borderColor;
        }
        .wrapper-grid {
          height: calc(100% - 70px);
          overflow-y: auto;
          width: 100%;
        }
        .wrapper-grid::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .wrapper-grid::-webkit-scrollbar-track {
          border-radius: 5px;
          background: none;
        }
        .wrapper-grid::-webkit-scrollbar-thumb {
          background-color: rgba(32, 76, 157, 1);
          border-radius: 5px;
        }
        .wrapper-grid::-webkit-scrollbar-thumb:hover {
          background-color: rgba(45, 183, 245, 1);
        }
        .wrapper-grid::-webkit-scrollbar-corner {
          background-color: #dadada;
        }
        .wrapper-title-action {
          display: inline-block;
          float: right;
          font-size: 14px;
          cursor: default;
          > i.iconfont {
            margin-right: 10px;
          }
        }
        .wrapper-grid-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid @borderColor;
          .item-title {
            font-weight: 600;
            font-size: 14px;
            text-decoration: underline;
            padding: 2px 4px;
            width: 100%;
            padding: 20px 15px;
          }
          .item-action {
            width: 50px;
            padding: 20px 0;
          }
          .item-info {
            color: #aab5c4;
            display: none;
            i.iconfont {
              margin-right: 8px;
            }
          }
          &:hover {
            color: #68a4f6;
            background: #f7f7f7;
            cursor: pointer;
            .item-info {
              display: block;
            }
          }
          &.active {
            background: rgba(45, 140, 240, 0.2);
            color: #68a4f6;
            .item-info {
              display: block;
            }
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .wrapper-right {
        width: 100%;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid @borderColor;
        background: #ffffff;
        padding: 20px 0 20px 20px;
        .ivu-tree {
          height: 100%;
          overflow-y: auto;
        }
        .ivu-tree::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .ivu-tree::-webkit-scrollbar-track {
          border-radius: 5px;
          background: none;
        }
        .ivu-tree::-webkit-scrollbar-thumb {
          background-color: rgba(32, 76, 157, 1);
          border-radius: 5px;
        }
        .ivu-tree::-webkit-scrollbar-thumb:hover {
          background-color: rgba(45, 183, 245, 1);
        }
        .ivu-tree::-webkit-scrollbar-corner {
          background-color: #dadada;
        }
      }
    }
  }
  @media screen and (max-width: 1366px) {
    .permission-container {
      header {
      }
    }
  }
}
</style>

<style lang="less">
.tree-role-list {
  .tree-item-text {
    margin-right: 8px;
    display: inline-block;
    cursor: default;
  }
  .tree-item-poptip {
    .ivu-poptip-popper {
      padding: 0 0px 0 10px;
    }
    .ivu-poptip-body {
      padding: 8px 0;
      .ivu-poptip-ul {
        padding: 0 !important;
        li {
          padding: 0 8px !important;
          cursor: pointer;
          &:hover {
            color: #68a4f6;
          }
        }
      }
    }
  }
}
</style>

