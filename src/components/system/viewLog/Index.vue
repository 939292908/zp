<template>
  <div class="permission-container" @click="handleWrapperClick($event)">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="查询日志" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">查询日志</div>
        <div class="wrapper-detail" ref="wrapperDetail">
          <div class="search">
            <label>查询日志</label>
            <i-input class="search-input" size="large" v-model="keyWord" clearable placeholder="请搜索日志" @keyup.enter.native="onSearch">
              <i-button class="search-btn" slot="append" icon="ios-search" @click.native="onSearch"></i-button>
            </i-input>
          </div>
          <!-- 列表 -->
          <template class="result-table">
            <Table ref="userTable" stripe border :height="tableHeight" :columns="columns" :data="tableData">
              <template slot-scope="{ row }" slot="action">
                <i-Button v-if="hasFunAuth(constantFunMap.FUN_ViewLog_View_ID)" @click="viewClick(row)" class="buttom-margin" type="primary" size="small">查看</i-Button>
              </template>
            </Table>
          </template>
          <!-- 分页 -->
          <div style="margin: 10px;overflow: hidden">
            <div>
              <Page
                :total="pageData.total"
                :current="pageData.currentPageIndex"
                :page-size="pageData.pageSize"
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
    <right-dialog title="日志详细信息" :showOkBtn="false" :statusList="statusList" @close="closeMultiModal">
      <!-- 内容表单 -->
      <i-form ref="form" :model="formDate" :label-width="80">
        <Form-item label="操作时间">
          <i-input v-model="formDate.operateTime" disabled></i-input>
        </Form-item>

        <Form-item label="用户名">
          <i-input v-model="formDate.userName" disabled></i-input>
        </Form-item>

        <Form-item label="用户账号">
          <i-input v-model="formDate.userAccount" disabled></i-input>
        </Form-item>

        <Form-item label="用户单位">
          <i-input v-model="formDate.organization" disabled></i-input>
        </Form-item>

        <Form-item label="IP">
          <i-input v-model="formDate.terminalId" disabled></i-input>
        </Form-item>

        <Form-item label="模块">
          <i-input v-model="formDate.operateType" disabled></i-input>
        </Form-item>

        <Form-item label="操作内容">
          <i-input v-model="formDate.operateCondition" disabled></i-input>
        </Form-item>
      </i-form>
    </right-dialog>

  </div>
</template>
<script>
import appHeader from "@/components/assembly/AppHeader";
import rightDialog from '@/components/assembly/RightDialog';
import SideBar from "@/components/assembly/Sidebar";
import switchRightView from "@/components/assembly/SwitchRightView";
import * as commonApi from "@/api/common.js";
import { hasQuery } from "../../../tools/units.js";
export default {
  name: "ViewLog",
  components: {
    switchRightView,
    SideBar,
    appHeader,
    rightDialog
  },
  data() {
    return {
      statusList: {
        MultiModal: false, // 右模态框 展示
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
      // 搜索
      keyWord: "",
      // 表头
      columns: [
        {
          title: "操作时间",
          key: "operateTime"
        },
        {
          title: "用户",
          key: "userName"
        },
        {
          title: "用户单位",
          key: "organization"
        },
        {
          title: "IP",
          key: "terminalId"
        },
        {
          title: "操作内容",
          key: "operateCondition"
        },
        {
          title: "操作",
          width: "100px",
          align: "center",
          slot: "action"
        }
      ],
      // 表 data
      tableData: [],
      // 侧边框 data
      formDate: {
        operateTime: "", //操作时间
        userName: "", //用户名
        userAccount: "", //用户账号
        organization: "", //用户单位	
        terminalId: "", //IP
        operateType: "", //模块
        operateCondition: "", //操作内容
      },
      // 分页
      pageData: {
        total: 0,
        currentPageIndex: 1,
        pageSize: 10,
      },
      tableHeight: 300,
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
      this.getLogList();
    },
    // 获取日志列表
    getLogList() {
      let params = {
        orderString: this.keyWord,
        pageIndex: this.pageData.currentPageIndex,
        pageSize: this.pageData.pageSize,
      }
      commonApi.GET_LOG_LIST(params).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.pageData.total = res.data.total;
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    // 查看
    viewClick(row) {
      this.showModal();
      console.log(row);
      Object.assign(this.formDate, row);
      this.getLogDetail(row.id);
    },
    // 获取日志详情
    getLogDetail(id) {
      commonApi.GET_LOG_DETAIL(id).then(res => {
        if (res.code == 200) {
          console.log(res.data);
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    // 初始化 模态框
    resetModal() {
      this.$refs["form"].resetFields();
    },
    // 模态框 show
    showModal() {
      this.statusList.MultiModal = true;
    },
    // 模态框 close
    closeMultiModal() {
      this.resetModal();
      this.statusList.MultiModal = false;
    },
    // 搜索
    onSearch() {
      this.getLogList();
      // this.$Message.success("搜索："+this.keyWord);
    },
    // 分页 change
    handlePageChange(pageIndex) {
      this.pageData.currentPageIndex = pageIndex;
      this.getLogList();
    },
    // table高
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
  @import "./css/Index.less";
</style>
