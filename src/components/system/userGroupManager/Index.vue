<!--
 * @Author: your name
 * @Date: 2019-09-25 15:05:49
 * @LastEditTime: 2019-11-06 14:29:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\system\userGroupManager\Index.vue
 -->
<template>
  <div class="permission-container" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="用户组管理" :showSearch="false"></app-header>
    <side-bar></side-bar>
    <div class="content">
      <div class="wrapper">
        <div class="title">用户组信息列表</div>
        <div class="wrapper-detail" ref="wrapperDetail">
          <div class="search">
            <label>用户组信息</label>
            <i-input
              class="search-input"
              size="large"
              v-model="textFilter"
              clearable
              placeholder="请搜索用户组"
              @keyup.enter.native="search"
              @on-change="handleClear"
            >
              <i-button class="search-btn" slot="append" icon="ios-search" @click.native="search"></i-button>
            </i-input>
            <div class="table-actions">
              <span
                class="button-primary"
                @click.prevent="showUserModel"
                v-if="hasFunAuth(constantFunMap.FUN_UserGroup_Add_ID)"
              >添加组</span>
            </div>
          </div>
          <div class="result-table">
            <i-table
              ref="userTable"
              border
              stripe
              :height="tableHeight"
              :columns="columns"
              :data="tableData"
            ></i-table>
          </div>
          <div style="margin: 10px;overflow: hidden">
            <div>
              <Page
                :total="total"
                :current="currentPageIndex"
                :page-size="pageSize"
                show-total
                show-elevator
                @on-change="handlePageChange"
              ></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户详细信息 -->
    <transition name="multiStr">
      <div class="multi-str" v-show="statusList.MultiModal">
        <div class="condition-modal">
          <div class="multi-sidebar tarbar">
            <div class="sidebar-top">
              <div class="polygon"></div>
            </div>
            <div class="close-btn" @click="closeMultiModal">
              <img src="../../../../static/images/close-btn2.png" alt />
            </div>
            <div class="sidebar-bottom">
              <div class="polygon"></div>
            </div>
          </div>
          <div class="cont-box">
            <i-form
              ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="100"
            >
              <Form-item label="用户组名称" prop="groupName">
                <i-input v-model="formValidate.groupName" :maxlength="25" placeholder="请输入用户组名称"></i-input>
              </Form-item>
              <Form-item label="用户组描述" prop="groupDescription">
                <i-input
                  type="textarea"
                  :rows="4"
                  :maxlength="1000"
                  v-model="formValidate.groupDescription"
                  placeholder="请输入用户组描述..."
                ></i-input>
              </Form-item>
              <Form-item label="功能权限" prop="funPermission" v-if="!isAdd">
                <div class="funPermission-box">
                  <Tree :data="permissionList" show-checkbox multiple ref="funPermission"></Tree>
                </div>
              </Form-item>
              <Form-item label="数据权限" prop="dataAuthSetting">
                <RadioGroup v-model="formValidate.dataAuthSetting" style="margin-top: -6px;">
                  <Radio
                    :key="index"
                    :label="item.value"
                    :value="item.value"
                    v-for="(item,index) in dataAuthList"
                  >
                    <span>{{item.displayName}}</span>
                  </Radio>
                </RadioGroup>
              </Form-item>
            </i-form>
            <div class="group-roles">
              <div
                class="items"
                :title="item.roleDescription"
                :key="index"
                v-for="(item,index) in roleList"
              >{{item.roleName}}</div>
            </div>
          </div>
          <div class="cont-title">
            <p>用户组详细信息</p>
          </div>
          <div class="cont-btn">
            <span class="cancel" @click="closeMultiModal">取消</span>
            <span class="sure" :loading="loading" :disabled="loading" @click="save">保存</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 添加用户到组 -->
    <add-users v-model="addUsersModalVisible" :group="formValidate" @on-ok="handleUserGroup"></add-users>
  </div>
</template>
<script>
import { OPTIONS_LIST } from "@/api/config.js";
import appHeader from "@/components/assembly/AppHeader";
import switchView from "@/components/assembly/SwitchView";
import switchRightView from "@/components/assembly/SwitchRightView";
import SideBar from "@/components/assembly/Sidebar";
import addUsers from "./components/AddUsers";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/system/userGroupManager.js";
import { hasQuery } from "../../../tools/units.js";
export default {
  name: "Permission",
  components: {
    switchView,
    switchRightView,
    addUsers,
    SideBar,
    appHeader
  },
  data() {
    return {
      loading: false,
      isAdd: false,
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
        ShowMultiModal: true,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      },
      msgType: "",
      textFilter: "",
      columns: [
        // {
        //   type: 'selection',
        //   width: 35,
        //   align: 'center',
        //   className:'user-checkbox'
        // },
        {
          title: "用户组",
          key: "groupName",
          render: (h, params) => {
            return this.hasFunAuth(
              this.constantFunMap.FUN_UserGroup_Edit_ID
            ) ? (
              <div
                class="define-user"
                on-click={$event => this.handleClick(params.row, params.index)}
              >
                {params.row.groupName}
              </div>
            ) : (
              <div class="define-user">{params.row.groupName}</div>
            );
          }
        },
        {
          title: "用户组描述",
          key: "groupDescription"
        },
        {
          title: "操作",
          render: (h, params) => {
            return (
              <div>
                <div
                  class="group-action"
                  on-click={$event =>
                    this.handleOpenClick(params.row, params.index)
                  }
                >
                  <i class="iconfont icon-duorenyonghu2"></i>
                  <span>添加用户</span>
                </div>
                {this.hasFunAuth(this.constantFunMap.FUN_UserGroup_Delete_ID) &&
                params.row.groupId != "1" ? (
                  <div
                    class="group-action"
                    on-click={$event =>
                      this.handleDeleteClick(params.row, params.index)
                    }
                  >
                    <i class="iconfont icon-chexiao"></i>
                    <span>删除</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          }
        }
      ],
      tableHeight: 300,
      data: [],
      resultData: [],
      total: 0,
      currentPageIndex: 1,
      pageSize: 10,
      path: this.$config.mainPath + "idsecurity",
      formValidate: {
        groupId: "",
        groupName: "", //组名
        groupDescription: "", //组描述
        dataAuthSetting: "4" //数据权限
      },
      ruleValidate: {
        groupName: [
          { required: true, message: "用户组名不能为空", trigger: "blur" }
        ]
      },
      roleList: [],
      dataAuthList: [],
      permissionList: [],
      addUsersModalVisible: false
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
    this.init();
  },
  computed: {
    tableData() {
      let data = this.data.slice(
        (this.currentPageIndex - 1) * this.pageSize,
        this.currentPageIndex * this.pageSize
      );
      return data;
    }
  },
  methods: {
    init() {
      this.getData();
      this.getOptionData();
    },
    /**
     * 保存用户组信息
     */
    save() {
      // 验证必填项是否必填
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.formValidate.groupId) {
            // 编辑
            this._editGroupInfo();
          } else {
            // 新增
            this._addGroupInfo();
          }
        }
      });
    },
    /**
     * 查询用户列表
     * @author julie
     */
    search() {
      let tmp = this.resultData;
      if (this.textFilter) {
        tmp = tmp.filter(x => {
          return hasQuery(x.groupName, this.textFilter);
        });
      }
      this.currentPageIndex = 1;
      this.data = tmp;
      this.total = tmp.length;
    },
    handleClear() {
      if (this.textFilter == "") {
        let tmp = this.resultData;
        this.currentPageIndex = 1;
        this.data = tmp;
        this.total = tmp.length;
      }
    },
    /**
     * 获取用户组列表数据
     * @author julie
     */
    getData() {
      apis.getGroupList().then(res => {
        if (res.code != 200) return;
        this.data = res.data;
        this.resultData = res.data;
        this.total = res.data.length;
      });
    },
    /**
     * 获取清单数据
     */
    getOptionData() {
      //政治面貌
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.DATA_AUTH,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.DATA_AUTH
        })
        .then(res => {
          this.dataAuthList = res;
        });
    },
    handlePageChange(pageIndex) {
      this.currentPageIndex = pageIndex;
    },
    handleUserGroup() {
      this.getData();
    },
    handleOpenClick(row, index) {
      let form = JSON.parse(JSON.stringify(row));
      this.formValidate = form;
      this.addUsersModalVisible = true;
    },
    /**
     * 删除事件
     */
    handleDeleteClick(row, index) {
      this.$Modal.confirm({
        title: "消息",
        content: `您确定要删除该用户组吗？`,
        onOk: () => {
          this._deleteGroup(row, index);
        },
        onCancel: () => {}
      });
    },
    /**
     * 编辑打开模态框
     */
    handleClick(row, index) {
      let form = JSON.parse(JSON.stringify(row));
      this.formValidate = form;
      this._getGroupRoles(form.groupId);
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
      this.getRoleTreeData([row.groupId]);
      this.isAdd = false;
    },
    /**
     * 打开用户面板
     * @author erbing
     */
    showUserModel() {
      this.roleList = [];
      this.formValidate = {
        groupId: "",
        groupName: "", //组名
        groupDescription: "", //组描述
        dataAuthSetting: "4" //数据权限
      };
      this.isAdd = true;
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
    },
    /**
     * 关闭用户面板
     * @function closeMultiModal
     * @author erbing
     */
    closeMultiModal() {
      this.$refs["formValidate"].resetFields();
      this.roleList = [];
      this.statusList.MultiModal = false;
      this.statusList.ShowMultiModal = true;
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
     * 获取用户组关联的角色信息
     */
    _getGroupRoles(groupId) {
      apis.getGroupRoleList(groupId).then(res => {
        if (res.code != 200) return;
        this.roleList = res.data;
      });
    },
    /**
     * 添加用户组信息
     */
    _addGroupInfo() {
      let data = this.formValidate;
      apis
        .addGroupInfo(data)
        .then(res => {
          this.loading = false;
          if (res.code != 200) {
            this.$Message.error(res.message);
          } else {
            this.$Message.success("保存成功");
            this.getData();
            this.closeMultiModal();
          }
        })
        .catch(res => {
          this.loading = false;
          console.log("新增异常", res);
        });
    },
    /**
     * 编辑用户组信息
     */
    _editGroupInfo() {
      let data = this.formValidate;
      apis
        .editGroupInfo(data)
        .then(res => {
          this.loading = false;
          if (res.code != 200) {
            this.$Message.error(res.message);
          } else {
            this.$Message.success("保存成功");
            this.getData();
            this.closeMultiModal();
          }
        })
        .catch(res => {
          this.loading = false;
          console.log("编辑异常", res);
        });
    },
    /**
     * 删除用户组信息
     */
    _deleteGroup(row, index) {
      apis.deleteGroup(row.groupId).then(res => {
        if (res.code == 200) {
          this.getData();
          this.$Message.success("删除成功");
        } else {
          this.$Message.error(res.message);
        }
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
    resizeHandler() {
      this.$nextTick(() => {
        if (this.$refs.wrapperDetail) {
          let wrapperDetailHeight = this.$refs.wrapperDetail.clientHeight;
          if (wrapperDetailHeight - 190 < 300) {
            this.tableHeight = 300;
          } else {
            this.tableHeight = wrapperDetailHeight - 190;
          }
        }
      });
    },
    // 禁用权限
    _disabledCheckbox(data) {
      data.forEach(x => {
        x.disableCheckbox = true;
        if (x.children.length > 0) {
          this._disabledCheckbox(x.children);
        }
      });
      return data;
    },
    getRoleTreeData(groudIds) {
      apis.getGroupRoleTreeList(groudIds).then(res => {
        if (res.code != 200) return;
        let data = res.data;
        data.forEach(x => {
          x.expand = true;
        });
        data = this._disabledCheckbox(data);
        // if(!this.hasFunAuth(this.constantFunMap.FUN_Role_TreeCheckbox_ID))  data = this._disabledCheckbox(data);
        this.permissionList = data;
      });
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
.group-roles {
  border-top: 1px solid #d8d8d8;
  padding: 20px 0;
  .items {
    color: #515a6e;
    display: inline-block;
    padding: 6px 10px;
    background: #ffffff;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    margin: 5px;
    cursor: pointer;
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
.button-primary {
  float: right;
  display: inline-block;
  width: 93px;
  height: 36px;
  margin-top: 12px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  background: url("@{imageUrl}static/images/sure.png") 0 0 no-repeat;
  color: #ffffff;
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
      padding: 20px 40px;
      color: #333;
      .search {
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        padding: 20px 15px;
        position: relative;
        .search-input {
          width: 500px;
          /deep/ .ivu-input-icon-clear {
            right: 81px !important;
          }
        }
        .search-btn {
          width: 80px;
        }
        .search-checkbox {
          margin-left: 15px;
        }
        > label {
          padding-right: 20px;
          width: 120px;
        }
      }
      .table-actions {
        position: absolute;
        right: 0;
        button {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
.multi-str {
  transform: translate3d(0, 0, 0);
  width: 534px;
  //background: rgba(4, 28, 91, 0.99);
  background: #f6f6f6;
  position: absolute;
  right: 0;
  top: 69px;
  bottom: 6px;
  z-index: 9998;
  border-left: none;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.5);
}
.multiStr-enter-active,
.multiStr-leave-active {
  transition: all 0.5s;
}
.multiStr-enter,
.multiStr-leave-active {
  transform: translate3d(534px, 0, 0);
}
.condition-modal {
  .multi-sidebar {
    width: 24px;
    .post(a);
    top: 0;
    bottom: 0;
    left: -25px;
    .sidebar-top {
      .post(a);
      width: 9px;
      height: 28.6%;
      top: 0;
      right: 1px;
      .polygon {
        .post(a);
        bottom: 43px;
        top: 0;
        left: 0;
        right: 0;
        width: 0;
        // border-right:10px solid #f6f6f6;
        // border-top:0px solid transparent;
        // border-bottom:10px solid transparent;
      }
    }
    .sidebar-bottom {
      .post(a);
      width: 9px;
      top: 71.9%;
      height: 28.1%;
      bottom: 0;
      right: 1px;
      .polygon {
        .post(a);
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
        width: 0;
      }
    }
    .close-btn {
      .post(a);
      top: 28.6%;
      width: 24px;
      height: 43.3%;
      z-index: 99;
      cursor: pointer;
      background-size: 100% 100%;
      right: -1px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .cont-box {
    width: 100%;
    padding: 10px 20px;
    position: absolute;
    top: 44px;
    bottom: 61px;
    background: #f6f6f6;
    overflow-y: auto;
    .cont-list {
      padding: 20px 0;
      .condition-select {
        .li {
          margin-bottom: 20px;
          overflow: hidden;
          span {
            color: #303030;
            font-size: 14px;
            margin-right: 57px;
            float: left;
          }
          input {
            width: 372px;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            font-size: 14px;
            color: #6a6a6a;
            display: inline-block;
            border-radius: 2px;
            border: 1px solid #eaeaea;
            background: #fff;
            outline: none;
          }
        }
        li.tp-unit {
          height: 30px;
          line-height: 30px;
        }
        li.tp-lx {
          overflow: hidden;
        }
        li.family-description {
          overflow: hidden;
          //height:400px;
          .wrapper {
            width: 372px;
            height: 395px;
            margin-left: 127px;
            position: relative;
            .box {
              width: 372px;
              height: 395px;
              border-radius: 2px;
              background: #fff;
              float: left;
              font-size: 14px;
              color: #6a6a6a;
              border: 1px solid #eaeaea;
            }
          }
        }
        li.page-tpmc {
          ul {
            text-align: center;
          }
        }
      }
    }
  }
  .funPermission-box {
    width: 100%;
    height: 270px;
    border: 1px solid #dddfe4;
    border-radius: 5px;
    overflow-y: auto;
    background: #fff;
    padding: 0 10px;
    /deep/.ivu-checkbox-disabled.ivu-checkbox-checked .ivu-checkbox-inner {
      background-color: #f3f3f3;
      border-color: #ccc;
    }
    /deep/.ivu-checkbox-disabled.ivu-checkbox-checked
      .ivu-checkbox-inner:after {
      border-color: #aaa;
    }
  }
  .cont-title {
    width: 534px;
    height: 44px;
    position: absolute;
    top: 0;
    //left: -10px;
    right: 0;
    background: #f6f6f6;
    border-bottom: 1px solid #d8d8d8;
    p {
      font-size: 16px;
      color: #0090ea;
      line-height: 44px;
      padding-left: 10px;
    }
  }
  .cont-btn {
    width: 534px;
    height: 61px;
    background: #fff;
    position: absolute;
    bottom: 0;
    //left: -10px;
    right: 0;
    border-top: 1px solid #d8d8d8;
    span {
      display: inline-block;
      width: 93px;
      height: 36px;
      margin-top: 12px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      float: right;
    }
    .cancel {
      background: url("@{imageUrl}static/images/cancel.png") 0 0 no-repeat;
      color: #6e6e6e;
      margin: 12px 19px 0 13px;
    }
    .sure {
      background: url("@{imageUrl}static/images/sure.png") 0 0 no-repeat;
      color: #ffffff;
    }
  }
}
</style>
<style lang="less" >
.result-table {
  .ivu-table-body::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .ivu-table-body::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  .ivu-table-body::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 1);
    border-radius: 5px;
  }
  .ivu-table-body::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 183, 245, 1);
  }
  .ivu-table-body::-webkit-scrollbar-corner {
    background-color: #dadada;
  }
}
.user-checkbox {
  > div {
    padding-left: 2px;
    padding-right: 2px;
  }
}
.group-action {
  font-size: 14px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 2px 8px;
  display: inline-block;
  cursor: default;
  margin-right: 10px;
  i {
    margin-right: 8px;
  }
}
.define-user {
  height: 32px;
  line-height: 32px;
  border: 1px solid #e8eaec !important;
  color: #515a6e !important;
  background: #fff !important;
  padding: 0 12px;
  display: inline-block;
  cursor: pointer;
}
</style>



