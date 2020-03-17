<template>
  <div class="permission-container" @click="handleWrapperClick($event)">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="红名单" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">红名单</div>
        <div class="wrapper-detail" ref="wrapperDetail">
          <div class="search">
            <label>人员搜索</label>
            <i-input class="search-input" size="large" v-model="textFilter" clearable placeholder="请搜索用户名、身份证号" @keyup.enter.native="search">
              <i-button class="search-btn" slot="append" icon="ios-search" @click.native="search"></i-button>
            </i-input>
            <div class="table-actions">
              <span class="button-primary" v-if="hasFunAuth(constantFunMap.FUN_RedList_Add_ID)" @click.prevent="addItem">添加</span>
            </div>
          </div>
          <!-- 列表 -->
          <template class="result-table">
            <Table ref="userTable" stripe border :height="tableHeight" :columns="columns" :data="tableData">
              <!-- <template slot-scope="{ row }" slot="userName">
                <span>{{ row.userName }}</span>
              </template>

              <template slot-scope="{ row }" slot="idNumber">
                <span>{{ row.idNumber }}</span>
              </template> -->

              <template slot-scope="{ row }" slot="action">
                <div>
                  <i-Button v-if="hasFunAuth(constantFunMap.FUN_RedList_Search_ID)" @click="detailItem(row)" class="buttom-margin" type="success" size="small">查看</i-Button>
                  <i-Button v-if="hasFunAuth(constantFunMap.FUN_RedList_Edit_ID)" @click="editorItem(row)" class="buttom-margin" type="info" size="small">修改</i-Button>
                  <i-Button v-if="hasFunAuth(constantFunMap.FUN_RedList_Delete_ID)" @click="isDelete(row)" class="buttom-margin" type="error" size="small">删除</i-Button>
                </div>
              </template>
            </Table>
          </template>
          <!-- 分页 -->
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

    <!-- 右侧详情框 -->
    <right-dialog title="用户详细信息" :showOkBtn="statusList.typeModal!='detail'" :statusList="statusList" @close="closeMultiModal" @ok="uploadModal">
      <!-- 内容表单 -->
      <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="用户名" prop="userName">
          <i-input v-if="statusList.typeModal=='add'" v-model="formValidate.userName" :maxlength="25" placeholder="请输入用户名"></i-input>
          <i-input v-if="statusList.typeModal=='editor'" v-model="formValidate.userName" :maxlength="25" placeholder="请输入用户名"></i-input>
          <span v-if="statusList.typeModal=='detail'">{{ formValidate.userName }}</span>
        </Form-item>
        <Form-item label="身份证号" prop="idNumber">
          <i-input v-if="statusList.typeModal=='add'" v-model="formValidate.idNumber" placeholder="请输入身份证号"></i-input>
          <i-input v-else-if="statusList.typeModal=='editor'" v-model="formValidate.idNumber" placeholder="请输入身份证号"></i-input>
          <span v-if="statusList.typeModal=='detail'">{{ formValidate.idNumber }}</span>
        </Form-item>
      </i-form>
    </right-dialog>

    <!-- 删除确认框 -->
    <template>
      <Modal v-model="statusList.isDeleteModal" title="请确认您的操作！" @on-ok="removeItem" >
        <p>是否删除！</p>
      </Modal>
    </template>
  </div>
</template>
<script>
// import switchView from "@/components/assembly/SwitchView";
import appHeader from "@/components/assembly/AppHeader";
import rightDialog from '@/components/assembly/RightDialog';
import SideBar from "@/components/assembly/Sidebar";
import switchRightView from "@/components/assembly/SwitchRightView";
import * as apis from "@/api/system/userManager.js";
import { hasQuery } from "../../../tools/units.js";
export default {
  name: "Permission",
  components: {
    // switchView,
    switchRightView,
    SideBar,
    appHeader,
    rightDialog
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
    return {
      loading: false,
      statusList: {
        typeModal: "", // 右模态框 功能切换 add/remove/detail
        MultiModal: false, // 右模态框 展示
        isDeleteModal: false, // 删除确认框 展示
        uploadImg : false,
        personModalShow : false,
        newsModalShow : false,
        appModalShow : false,
        changeLogShow : false,
        guidelinesShow : false,
        messageDetailsShow : false,
        feedbackShow : false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false,
      },
      ItemRow: {}, // 点击增删改查时 用户信息
      textFilter: "", // 搜索
      // 表头
      columns: [
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "身份证号",
          key: "idNumber"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      tableHeight: 300,
      data: [],
      resultData: [],
      stateList: [],
      // 模态框 data
      formValidate: {
        userName: "", //用户名
        idNumber: "", //身份证号
        userAccount: "", //账号
        userDeptId: "", //部门id
        userDeptName: "", //部门名称
        userId: "" //用户id
      },
      // 模态框 校验
      ruleValidate: {
        idNumber: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIdNumber, trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ]
      },
      path: this.$config.mainPath,
      total: 0,
      currentPageIndex: 1,
      pageSize: 10,
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
      // 截取对应页 列表
      let data = this.data.slice(
        (this.currentPageIndex - 1) * this.pageSize,
        this.currentPageIndex * this.pageSize
      );
      return data;
    }
  },
  methods: {
    // 初始化
    init() {
      this.getData();
    },
    /**
     * 获取 用户列表
     */
    getData() {
      apis.getUserList().then(res => {
        if (res.code != 200) return;
        this.data = res.data;
        this.resultData = res.data;
        this.total = res.data.length;
      });
    },
    /**
     * 增
     */
    addItem() {
      this.statusList.typeModal = "add";
      this.resetModal(); // 初始化 模态框
      this.showModal();  // 展示 模态框
    },
    // 删除 模态框
    isDelete(row) {
      this.ItemRow = row;
      this.statusList.isDeleteModal = true;
    },
    // 删
    removeItem() {
      let row = this.ItemRow;
      this.$Message.success(`${row.userName}删除成功！`);
    },
    // 改
    editorItem(row) {
      this.statusList.typeModal = "editor";
      this.statusList.MultiModal = true;
      this.itemDataToModal(row);
    },
    // 详情
    detailItem(row) {
      this.statusList.typeModal = "detail";
      this.statusList.MultiModal = true;
      this.itemDataToModal(row);
    },
    // 初始化 模态框
    resetModal() {
      this.$refs["formValidate"].resetFields();
    },
    // 展示 模态框
    showModal() {
      this.statusList.MultiModal = true;
    },
    // 关闭 模态框
    closeMultiModal() {
      this.resetModal();
      this.statusList.MultiModal = false;
    },
    // 在此同步 模态框 要展示的数据
    itemDataToModal(row) {
      this.formValidate.userName = row.userName;
      this.formValidate.idNumber = row.idNumber;
    },
    // 保存 模态框
    uploadModal() {
      this.$refs["formValidate"].validate( isOK => {
        if(isOK) {
          // this.save();
        }
      })
      .then(res => {
          this.$Message.success('上传成功！');
        })
      .catch(error => {
          this.$Message.error('上传失败！');
        });
    },
    /**
     * 保存用户信息
     */
    save() {
      // 验证必填项是否必填
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
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
      let tmp = this.resultData;
      if (this.textFilter) {
        tmp = tmp.filter(x => {
          return (
            hasQuery(x.userName, this.textFilter) ||
            hasQuery(x.userCode, this.textFilter) ||
            hasQuery(x.userAccount, this.textFilter) ||
            hasQuery(x.userDeptName, this.textFilter)
          );
          // || hasQuery(x.userDeptId,this.textFilter)
        });
      }
      if (this.stateList.length > 0) {
        tmp = tmp.filter(x => {
          return this.stateList.indexOf(x.state + "") != -1;
        });
      }
      this.currentPageIndex = 1;
      this.data = tmp;
      this.total = tmp.length;
    },
    /**
     * 点击分页同步当前页
     */
    handlePageChange(pageIndex) {
      this.currentPageIndex = pageIndex;
    },
    /**
     * 添加用户信息
     */
    _addUserInfo() {
      let data = JSON.parse(JSON.stringify(this.formValidate));
      data.state = data.state ? "1" : "0";
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
      // debugger;
      let data = JSON.parse(JSON.stringify(this.formValidate));
      data.state = data.state ? "1" : "0";
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
    // // 全屏事件
    // handleWrapperClick(event) {
    //   this.$refs['appHeader'].statusList.uploadImg=false;
    //   this.$refs['appHeader'].statusList.personModalShow=false;
    //   this.$refs['appHeader'].statusList.newsModalShow=false;
    //   this.$refs['appHeader'].statusList.appModalShow=false;
    //   this.$refs['appHeader'].statusList.messageDetailsShow=false;
    //   this.$refs['appHeader'].statusList.guidelinesShow=false;
    //   this.$refs['appHeader'].statusList.feedbackShow=false;
    //   this.$refs['appHeader'].statusList.myNavModalShow=false;
    // },
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
// my style
.buttom-margin {
  margin-right: 10px;
}
</style>
