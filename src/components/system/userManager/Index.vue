<!--
 * @Author: your name
 * @Date: 2019-10-14 18:01:26
 * @LastEditTime: 2019-12-10 18:45:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\system\userManager\Index.vue
 -->
<template>
  <div class="permission-container" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="用户管理" :showSearch="false"></app-header>
    <side-bar></side-bar>
    <div class="content">
      <div class="wrapper">
        <div class="title">用户信息列表</div>
        <div class="wrapper-detail" ref="wrapperDetail">
          <div class="search">
            <div class="userInfo search-item">
              <label>用户信息</label>
              <i-input
                class="search-input"
                size="large"
                v-model="textFilter"
                clearable
                placeholder="请搜索用户名、警号、账号、身份证号"
                @keyup.enter.native="search"
                @on-change="handleClear"
              >
                <i-button class="search-btn" slot="append" icon="ios-search" @click.native="search"></i-button>
              </i-input>
            </div>
            <div class="state search-item">
              <span class="labels">状态:</span>
              <Checkbox-group
                class="search-checkbox"
                v-model="stateList"
                @on-change="handleStateClick"
              >
                <Checkbox
                  :key="index"
                  v-for="(item,index) in userStateList"
                  :label="item.id"
                  :style="{'background':item.backgroundColor,'color':item.color}"
                >{{item.shortName}}</Checkbox>
                <!-- <Checkbox  label="1" value="1">开放</Checkbox>
                <Checkbox label="0" value="0">冻结</Checkbox>-->
              </Checkbox-group>
            </div>
            <div class="state search-item">
              <span class="labels">是否允许密码登录:</span>
              <Checkbox-group
                class="search-checkbox"
                v-model="loginStateValue"
                @on-change="handleLoginStateClick"
              >
                <Checkbox
                  :key="index"
                  v-for="(item,index) in loginStateList"
                  :label="item.id"
                  :style="{'background':item.backgroundColor,'color':item.color}"
                >{{item.shortName}}</Checkbox>
              </Checkbox-group>
            </div>
            <div class="table-actions">
              <span
                class="button-primary"
                v-if="hasFunAuth(this.constantFunMap.FUN_User_Add_ID)"
                @click.prevent="showUserModel"
              >添加</span>
            </div>
          </div>
          <div class="search">
            <div class="search-item">
              <label>部门名称</label>
              <tree-filter
                key="2"
                ref="deptTree"
                :apiKey="optionConfig.DEPT_TREE"
                select-type="all"
                v-model="deptNameFilter"
                placeholder
                :apiFun="deptApis"
                @on-clear="handleClearDept"
                @on-select-change="handleDeptSelectChange"
              ></tree-filter>
            </div>
            <div class="search-item">
              <label style="margin-left:30px">用户组名称</label>
              <Select
                v-model="groupFilter"
                clearable
                filterable
                style="width:400px"
                @on-change="handleSelectGroup"
              >
                <Option
                  v-for="item in userGroupList"
                  :value="item.groupId"
                  :key="item.groupId"
                >{{ item.groupName }}</Option>
              </Select>
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
            >
              <template slot="userGroup" slot-scope="{ row, index }">
                <div
                  v-for="(item,index) in row.groupList"
                  :key="index"
                  :title="item.groupName"
                  class="define-user"
                  @click="handleClickGroup(row,index)"
                >{{item.groupName}}</div>
              </template>
            </i-table>
          </div>
          <div style="margin: 10px;overflow: hidden">
            <div>
              <Page
                :total="pagination.total"
                :current="pagination.pageIndex"
                :page-size="pagination.pageSize"
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
          <div class="cont-box" v-show="!isGroup">
            <i-form
              ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="80"
            >
              <Form-item label="账号" prop="userAccount">
                <i-input v-model="formValidate.userAccount" :maxlength="25" placeholder="请输入账号"></i-input>
              </Form-item>
              <Form-item label="用户名" prop="userName">
                <i-input v-model="formValidate.userName" :maxlength="25" placeholder="请输入用户名"></i-input>
              </Form-item>
              <Form-item label="警号" prop="userCode">
                <i-input v-model="formValidate.userCode" :maxlength="25" placeholder="请输入警号"></i-input>
              </Form-item>
              <Form-item label="手机号" prop="phone">
                <i-input v-model="formValidate.phone" :maxlength="13" placeholder="请输入手机号"></i-input>
              </Form-item>
              <Form-item label="身份证号" prop="idNumber">
                <i-input v-model="formValidate.idNumber" placeholder="请输入身份证号"></i-input>
              </Form-item>
              <Form-item label="部门" prop="userDeptName">
                <i-input v-model="formValidate.userDeptId" v-show="false"></i-input>
                <Dropdown class="dept-dropdown" trigger="custom" :visible="visible">
                  <span class="dept-dropdown-text" @click="handleOpen">
                    {{ formValidate.userDeptName ? formValidate.userDeptName : '请选取部门' }}
                    <Icon type="ios-arrow-down"></Icon>
                  </span>
                  <DropdownMenu slot="list">
                    <Tree
                      :data="deptList"
                      :multiple="false"
                      :show-checkbox="false"
                      :check-strictly="true"
                      @on-select-change="getSelectData"
                    ></Tree>
                  </DropdownMenu>
                </Dropdown>
              </Form-item>
              <Form-item label="隶属用户组" prop="groupIds">
                <Select v-model="formValidate.groupIds" multiple>
                  <Option
                    v-for="item in userGroupList"
                    :value="item.groupId"
                    :key="item.groupId"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
              <Form-item label="功能权限" prop="funPermission">
                <div class="funPermission-box">
                  <Tree :data="permissionList" show-checkbox multiple></Tree>
                </div>
              </Form-item>
              <Form-item label="是否允许密码登录" prop="allowAccountLogin">
                <i-switch
                  :disabled="this.$Administration.toLowerCase() == formValidate.userId.toLowerCase()"
                  v-model="formValidate.allowAccountLogin"
                ></i-switch>
              </Form-item>
              <Form-item label="状态" prop="state">
                <i-switch
                  :disabled="!formValidate.userId || (formValidate.userId && this.$Administration.toLowerCase() == formValidate.userId.toLowerCase())"
                  v-model="formValidate.state"
                ></i-switch>
              </Form-item>
            </i-form>
          </div>
          <div class="cont-box" v-show="isGroup">
            <i-form
              ref="groupFormValidate"
              :model="groupFormValidate"
              :rules="ruleValidate"
              :label-width="100"
            >
              <Form-item label="用户组名称" prop="groupName">
                <i-input
                  disabled
                  v-model="groupFormValidate.groupName"
                  :maxlength="25"
                  placeholder="请输入用户组名称"
                ></i-input>
              </Form-item>
              <Form-item label="用户组描述" prop="groupDescription">
                <i-input
                  disabled
                  type="textarea"
                  :rows="4"
                  :maxlength="50"
                  v-model="groupFormValidate.groupDescription"
                  placeholder="请输入用户组描述..."
                ></i-input>
              </Form-item>
              <Form-item label="功能权限" prop="funPermission">
                <div class="funPermission-box">
                  <Tree :data="permissionList" show-checkbox multiple ref="funPermission"></Tree>
                </div>
              </Form-item>
              <Form-item label="数据权限" prop="dataAuthSetting">
                <RadioGroup v-model="groupFormValidate.dataAuthSetting" style="margin-top: -6px;">
                  <Radio
                    disabled
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
            <p>用户详细信息</p>
          </div>
          <div class="cont-btn">
            <span class="cancel" @click="closeMultiModal">取消</span>
            <span
              class="sure"
              :loading="loading"
              :disabled="loading"
              v-if="!isGroup"
              @click="save"
            >保存</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import appHeader from "@/components/assembly/AppHeader";
import TreeFilter from "@/components/assembly/TreeFilter";
import SideBar from "@/components/assembly/Sidebar";
import * as apis from "@/api/system/userManager.js";
import { hasQuery } from "../../../tools/units.js";
import * as groupApis from "@/api/system/userGroupManager.js";
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";
export default {
  name: "Permission",
  components: {
    SideBar,
    appHeader,
    TreeFilter
  },
  data() {
    var validateIdNumber = function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入身份证号"));
      } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        return callback(new Error("身份证格式不正确"));
      } else {
        callback();
      }
    };
    var validateUserAccount = function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入账号"));
      } else if (/[\u4E00-\u9FA5]/g.test(value)) {
        return callback(new Error("账号不能为中文"));
      } else {
        callback();
      }
    };
    return {
      optionConfig: OPTIONS_LIST,
      deptApis: comApis.getDeptTree,
      isGroup: false,
      loading: false,
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
      deptIdFilter: "",
      deptNameFilter: "",
      groupFilter: "",
      columns: [
        {
          title: "用户名",
          key: "userName",
          render: (h, params) => {
            return this.hasFunAuth(this.constantFunMap.FUN_User_Edit_ID) ? (
              <div
                title={params.row.userName}
                class="define-user"
                on-click={$event => this.handleClick($event, params.row)}
              >
                {params.row.userName}
              </div>
            ) : (
              <div title={params.row.userName} class="define-user">
                {params.row.userName}
              </div>
            );
          }
        },
        {
          title: "账号",
          key: "userAccount"
        },
        {
          title: "警号",
          key: "userCode"
        },
        {
          title: "身份证号",
          key: "idNumber"
        },
        // {
        //   title: '部门编号',
        //   key: 'userDeptId'
        // },
        {
          title: "部门名称",
          key: "userDeptName"
        },
        {
          title: "隶属用户组",
          key: "userGroup",
          slot: "userGroup"
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            return h("div", [
              h("div", {
                style: {
                  width: "54px",
                  height: "22px",
                  position: "absolute",
                  zIndex: 1
                },
                on: {
                  click: () => {
                    this.handleBeforeChange(params.row, params.index);
                  }
                }
              }),
              h("i-switch", {
                //数据库1是已处理，0是未处理
                props: {
                  type: "primary",
                  value: params.row.state == 1, //控制开关的打开或关闭状态，官网文档属性是value
                  disabled: !this.hasFunAuth(
                    this.constantFunMap.FUN_User_State_ID
                  )
                },
                on: {
                  // "on-change": value => {
                  //   //触发事件是on-change,用双引号括起来，
                  //   //参数value是回调值，并没有使用到
                  //   this.handleSwitchClick(value, params.row, params.index); //params.index是拿到table的行序列，可以取到对应的表格值
                  // },
                }
              })
            ]);
          }
        },
        {
          title: "是否允许密码登录",
          key: "allowAccountLogin",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                //数据库1是已处理，0是未处理
                props: {
                  type: "primary",
                  value: params.row.allowAccountLogin == 1, //控制开关的打开或关闭状态，官网文档属性是value
                  disabled: true
                },
                style: {
                  marginRight: "5px"
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "reset",
          render: (h, params) => {
            return (
              <span>
                <i-button
                  size="small"
                  type="primary"
                  on-click={$event => this.handleResetPwd(params.row)}
                >
                  重置密码
                </i-button>
              </span>
            );
          }
        }
      ],
      tableHeight: 300,
      data: [],
      resultData: [],
      stateList: [],
      userState: null,
      formValidate: {
        idNumber: "", //身份证号
        phone: "", //手机号
        userAccount: "", //账号
        userCode: "", //警号
        userDeptId: "", //部门id
        userDeptName: "", //部门名称
        userId: "", //用户id
        userName: "", //用户名
        state: true, //账号状态
        allowAccountLogin: false, //是否允许密码登录
        groupIds: [], //隶属部门
        ipAddress: "", //ip地址
        password: "" //默认密码
      },
      groupFormValidate: {
        groupId: "",
        groupName: "", //组名
        groupDescription: "", //组描述
        dataAuthSetting: "4" //数据权限
      },
      ruleValidate: {
        idNumber: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIdNumber, trigger: "blur" }
        ],
        userAccount: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { validator: validateUserAccount, trigger: "blur" }
        ],
        userCode: [
          { required: true, message: "警号不能为空", trigger: "blur" }
        ],
        userDeptName: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: this.validatephone, trigger: "blur" }
        ]
      },
      path: this.$config.mainPath,
      deptList: [],
      visible: false,
      userGroupList: [],
      permissionList: [],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      roleList: [],
      dataAuthList: [],
      userStateList: [
        {
          displayName: "开放",
          id: "1",
          name: "开放",
          shortName: "开放",
          backgroundColor: "#fff",
          color: "#333"
        },
        {
          displayName: "冻结",
          id: "0",
          name: "冻结",
          shortName: "冻结",
          backgroundColor: "#fff",
          color: "#333"
        }
      ],
      loginState: null,
      loginStateValue: [],
      loginStateList: [
        {
          displayName: "启用",
          id: "1",
          name: "启用",
          shortName: "启用",
          backgroundColor: "#fff",
          color: "#333"
        },
        {
          displayName: "禁用",
          id: "0",
          name: "禁用",
          shortName: "禁用",
          backgroundColor: "#fff",
          color: "#333"
        }
      ]
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
    this.init();
  },
  methods: {
    init() {
      this.getData();
      this.getDeptData();
      this.getGroupList();
      this.getOptionData();
    },
    // 用户组
    handleSelectGroup(val) {
      this.search();
    },
    // 清除单位选中
    handleClearDept(val) {
      this.deptIdFilter = "";
      this.deptNameFilter = val;
      this.search();
    },
    // 单位
    handleDeptSelectChange(cur) {
      this.deptIdFilter = cur.deptId;
      this.deptNameFilter = cur.title;
      this.search();
    },
    /**
     * 获取用户组关联的角色信息
     */
    _getGroupRoles(groupId) {
      groupApis.getGroupRoleList(groupId).then(res => {
        if (res.code != 200) return;
        this.roleList = res.data;
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
    // 校验手机号
    validatephone(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    },
    /**
     * 保存用户信息
     */
    save() {
      // 验证必填项是否必填
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          if (this.loading == true) {
            return;
          }
          this.loading = true;
          if (this.formValidate.userId) {
            // 编辑
            this._editUserInfo();
          } else {
            // 新增
            this._addUserInfo();
          }
        }
      });
    },
    /**
     * 查询用户列表
     * @author julie
     */
    search() {
      this.pagination.pageIndex = 1;
      this.getData();
    },
    /**
     * 状态查询
     */
    handleStateClick(arr) {
      this.userStateList.map(x => {
        if (arr.indexOf(x.id) == -1) {
          x.backgroundColor = "#fff";
          x.color = "#333";
        } else {
          x.backgroundColor = "#1b8ae7";
          x.color = "#ffffff";
        }
      });
      this.userState = arr.length > 1 ? null : parseInt(arr[0]);
      this.search();
    },
    handleLoginStateClick(arr) {
      this.loginStateList.map(x => {
        if (arr.indexOf(x.id) == -1) {
          x.backgroundColor = "#fff";
          x.color = "#333";
        } else {
          x.backgroundColor = "#1b8ae7";
          x.color = "#ffffff";
        }
      });
      this.loginState = arr.length > 1 ? null : parseInt(arr[0]);
      this.search();
    },
    // 清空关键词
    handleClear() {
      if (this.textFilter == "") {
        this.search();
      }
    },
    /**
     * 获取用户列表数据
     * @author julie
     */
    getData() {
      // 添加部门和是否允许密码登录条件
      let params = {
        keyWords: this.textFilter,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
        userState: this.userState,
        deptId: this.deptIdFilter,
        allowAccountLogin: this.loginState,
        groupId: this.groupFilter
      };
      apis.getUserList(params).then(res => {
        if (res.code != 200) return;
        // res.data = res.data.filter(x=>{
        //   return this.$Administration.toLowerCase() != x.userId.toLowerCase()
        // })
        let data = res.data;
        this.tableData = data.data;
        this.pagination.total = data.total;
        this.pagination.pageIndex = data.pageIndex;
      });
    },
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getData();
    },
    /**
     * 获取部门树的数据
     */
    getDeptData() {
      apis.getDeptListData().then(res => {
        if (res.code != 200) return;
        this.deptList = res.data;
      });
    },
    getSelectData(data, cur) {
      this.formValidate.userDeptId = cur.deptInfo.deptId;
      this.formValidate.userDeptName = cur.deptInfo.deptName;
      this.visible = false;
    },
    handleOpen() {
      this.visible = true;
    },
    handleBeforeChange(row, index) {
      if (this.hasFunAuth(this.constantFunMap.FUN_User_State_ID)) {
        let me = this;
        let content =
          row.state == 0
            ? "您确定要开放该人员状态吗?"
            : "您确定要禁用该人员状态吗";
        this.$Modal.confirm({
          title: "消息",
          content: content,
          onOk() {
            me.tableData[index].state = row.state == 0 ? "1" : "0";
            let value = row.state == 0;
            me._updateUserState(value, row, index);
          },
          onCancel() {}
        });
      }
    },
    handleSwitchClick(value, row, index) {
      let content = !value
        ? "您确定要冻结该人员状态吗?"
        : "您确定要开放该人员状态吗";
      this.$Modal.confirm({
        title: "消息",
        content: content,
        onOk: () => {
          this._updateUserState(value, row, index);
        },
        onCancel: () => {
          row.state = !value ? "1" : "0";
          this.data[index].state = row.state;
        }
      });
    },
    /**
     * 编辑打开模态框
     */
    handleClick(event, row) {
      let form = JSON.parse(JSON.stringify(row));
      form.state = row.state == 1 ? true : false;
      form.allowAccountLogin = row.allowAccountLogin == 1 ? true : false;
      this.formValidate = form;
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
      this.visible = false;
      let arr = [];
      row.groupList.forEach(x => {
        arr.push(x.groupId);
      });
      this.formValidate.groupIds = arr;
      this.getRoleTreeData(arr);
      this.isGroup = false;
    },
    handleClickGroup(row, index) {
      let form = JSON.parse(JSON.stringify(row.groupList[index]));
      this.groupFormValidate = form;
      this._getGroupRoles(form.groupId);
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
      this.isGroup = true;
      this.getRoleTreeData([form.groupId]);
    },
    /**
     * 打开用户面板
     * @author erbing
     */
    showUserModel() {
      this.formValidate = {
        idNumber: "", //身份证号
        phone: "", //手机号
        userAccount: "", //账号
        userCode: "", //警号
        userDeptId: "", //部门id
        userDeptName: "", //部门名称
        userId: "", //用户id
        userName: "", //用户名
        state: true, //账号状态
        allowAccountLogin: false,
        groupIds: [], //隶属部门
        ipAddress: "", //ip地址
        password: "123456" //默认密码
      };
      this.statusList.MultiModal = true;
      this.statusList.ShowMultiModal = false;
      this.getRoleTreeData(this.formValidate.groupIds);
      this.isGroup = false;
    },
    /**
     * 关闭用户面板
     * @function closeMultiModal
     * @author erbing
     */
    closeMultiModal() {
      this.$refs["formValidate"].resetFields();
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
    //   // debugger;
    //   // let writeList = [document.querySelector('.button-primary'),document.querySelector('.multi-str')]
    //   // for(var i = 0; i< writeList.length; i++) {
    //   //   var tag = writeList[i]
    //   //   if(tag != event.target) {
    //   //     this.statusList.MultiModal = false;
    //   //     this.statusList.ShowMultiModal = true;
    //   //   }
    //   // }
    // },
    /**
     * 添加用户信息
     */
    _addUserInfo() {
      let data = JSON.parse(JSON.stringify(this.formValidate));
      data.state = data.state ? "1" : "0";
      data.allowAccountLogin = data.allowAccountLogin ? "1" : "0";
      apis
        .addUserData(data)
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
     * 编辑用户信息
     */
    _editUserInfo() {
      let data = JSON.parse(JSON.stringify(this.formValidate));
      data.state = data.state ? "1" : "0";
      data.allowAccountLogin = data.allowAccountLogin ? "1" : "0";
      apis
        .editUserData(data)
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
     * 更新用户状态
     */
    _updateUserState(value, row, index) {
      let state = value ? "1" : "0";
      apis.updateUserState(row.userId, state).then(res => {
        if (res.code != 200) {
          row.state = !value ? "1" : "0";
          this.data[index].state = row.state;
          this.$Message.error(res.message);
        } else {
          row.state = value ? "1" : "0";
          this.data[index].state = row.state;
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
    resizeHandler() {
      this.$nextTick(() => {
        if (this.$refs.wrapperDetail) {
          let wrapperDetailHeight = this.$refs.wrapperDetail.clientHeight;
          if (wrapperDetailHeight - 190 < 300) {
            this.tableHeight = 300;
          } else {
            this.tableHeight = wrapperDetailHeight - 190;
          }
        } else {
          this.tableHeight = 300;
        }
      });
    },
    getRoleTreeData(groupIds) {
      groupApis.getGroupRoleTreeList(groupIds).then(res => {
        if (res.code != 200) return;
        let data = res.data;
        data.forEach(x => {
          x.expand = true;
        });
        data = this._disabledCheckbox(data);
        // if(!this.hasFunAuth(this.constantFunMap.FUN_Role_TreeCheckbox_ID))  data = this._disabledCheckbox(data);
        this.permissionList = data;
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
    getGroupList() {
      groupApis.getGroupList().then(res => {
        if (res.code != 200) return;
        this.userGroupList = res.data;
      });
    },
    handleResetPwd(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `您确定要重置密码吗？`,
        onOk: () => {
          this.resetPwd(row.userId);
        },
        onCancel: () => {}
      });
    },
    resetPwd(id) {
      apis.resetPwd(id).then(res => {
        if (res.code == 200) {
          this.$Message.success("密码重置成功");
        } else {
          this.$Message.error("密码重置失败");
        }
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
    left: 240px;
    top: 68px;
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
        margin-bottom: 15px;
        padding: 0 15px;
        position: relative;
        display: flex;
        align-items: center;
        .search-input {
          width: 500px;
          /deep/ .ivu-input-icon-clear {
            right: 81px !important;
          }
        }
        .search-item {
          display: inline-flex;
          align-items: center;
          .labels {
            margin-left: 20px;
          }
          > label {
            padding-right: 20px;
            width: 120px;
          }
          /deep/.dept-dropdown {
            width: 419px;
          }
        }
        .search-btn {
          width: 80px;
        }
        /deep/ .search-checkbox {
          margin-left: 15px;
          .ivu-checkbox-group-item {
            font-size: inherit;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 2px 8px;
            font-size: 13px;
          }
          .ivu-checkbox {
            display: none;
          }
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
  /deep/.ivu-input[disabled],
  fieldset[disabled] .ivu-input {
    background-color: #fdfdfd;
    color: #aaa;
  }
  /deep/ .dept-dropdown {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: default;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    .dept-dropdown-text {
      display: inline-block;
      width: 100%;
      cursor: default;
      i {
        position: absolute;
        right: 2px;
        top: 6px;
      }
    }
    .ivu-select-dropdown {
      max-height: 300px !important;
      overflow-y: auto;
      left: 0 !important;
      top: 22px !important;
    }
    .ivu-select-dropdown::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .ivu-select-dropdown::-webkit-scrollbar-track {
      border-radius: 5px;
      background: none;
    }
    .ivu-select-dropdown::-webkit-scrollbar-thumb {
      background-color: rgba(32, 76, 157, 1);
      border-radius: 5px;
    }
    .ivu-select-dropdown::-webkit-scrollbar-thumb:hover {
      background-color: rgba(45, 183, 245, 1);
    }
    .ivu-select-dropdown::-webkit-scrollbar-corner {
      background-color: #dadada;
    }
  }
}
</style>
<style lang="less" >
.define-tag-open .ivu-tag-dot-inner {
  background: #0c6 !important;
}
.define-tag-close .ivu-tag-dot-inner {
  background: #354052 !important;
}
.define-user {
  height: 32px;
  max-width: 100%;
  line-height: 32px;
  border: 1px solid #e8eaec !important;
  color: #515a6e !important;
  background: #fff !important;
  padding: 0 12px;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5px;
  margin-right: 5px;
}
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
</style>



