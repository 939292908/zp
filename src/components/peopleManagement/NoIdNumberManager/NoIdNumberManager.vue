<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime: 2019-12-05 14:34:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="noIdNumberManager-header">
      <h2 class="map-title">无证人员管理</h2>
      <!-- 查询条件区域 -->
      <div class="action-search-input">
        <div>
          <i-input
            class="search-input search-control"
            icon="ios-search"
            style="width:350px;"
            v-model="filters.keywords"
            clearable
            placeholder="请输入身份证、姓名"
            @keyup.enter.native="handleSearchText"
            @on-change="handleClear"
          ></i-input>
          <Button type="primary" id="searchBtn" @click="handleSearchText">搜索</Button>
        </div>
      </div>
    </div>
    <div class="noIdNumberManager-content">
      <div class="con-header">
        <span class="tpList" id="tpList">无证人员列表</span>
        <div class="action-btns">
          <Button @click="resetData">
            刷新
            <i class="iconfont icon-gengxin"></i>
          </Button>
        </div>
      </div>
      <!-- 查询条件区域 -->
      <div class="actions-search">
        <Row>
          <Col span="12">
            <div class="search-row">
              <div class="search-label">人员状态:</div>
              <div class="search-control">
                <CheckboxGroup v-model="filters.personType" @on-change="handleTpType">
                  <Checkbox
                    :key="index"
                    v-for="(item,index) in filterOptionList.personStatuOption"
                    :label="item.value"
                  >{{item.displayName}}</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="search-row">
              <div class="search-label">单位选择:</div>
              <div class="search-control">
                <tree-filter
                  :apiKey="optionConfig.CURRENT_TOKEN_DEPT_TREE"
                  ref="cityTree"
                  select-type="all"
                  :tree-props="cityTreeProps"
                  v-model="filters.belongAreaDisplayName"
                  placeholder="请选择单位"
                  :apiFun="cityApis"
                  @on-select-change="handleCitySelectChange"
                  @on-clear="handleDeptPath"
                ></tree-filter>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <Row>
              <Col span="12">
                <div class="search-row">
                  <div class="search-label verify-label">需落查:</div>
                  <div class="search-control">
                    <CheckboxGroup v-model="filters.isNeedVerify" @on-change="handleTpType">
                      <Checkbox
                        :key="index"
                        v-for="(item,index) in filterOptionList.isNeedVerifyOption"
                        :label="item.value"
                      >{{item.name}}</Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <!-- table tab -->
      <div class="action-list">
        <!-- loading -->
        <Loading :bgColor="bgColor" v-model="tableLoadingShow"></Loading>
        <p
          class="search-result"
        >本次搜索耗时{{titleDetail.executeTime}}秒，搜索出{{titleDetail.total}}条包含关键字信息的图谱</p>
        <Tabs type="card" :animated="false" :value="filters.state | format" @on-click="tabChange">
          <TabPane :index="1" :label="`待核实(${totalCount[0] || 0})`" name="0">
            <c-table
              :height="tableHeight"
              :columns="columns1"
              size="small"
              :data="tableData"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane :index="2" :label="`审核中(${totalCount[2] || 0})`" name="1">
            <c-table
              :height="tableHeight"
              :columns="columns2"
              size="small"
              :data="tableData"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane v-if="isAuditAuth" :index="3" :label="`待审核(${totalCount[2] || 0})`" name="2">
            <c-table
              :height="tableHeight"
              :columns="columns3"
              size="small"
              :data="tableData"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane :index="4" :label="`已归档(${totalCount[1] || 0})`" name="3">
            <c-table
              :height="tableHeight"
              :columns="columns4"
              size="small"
              :data="tableData"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane :index="5" :label="`已退回(${totalCount[3] || 0})`" name="4">
            <c-table
              :height="tableHeight"
              :columns="columns5"
              size="small"
              :data="tableData"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import CTable from "../components/ITable";
import Loading from "@/components/assembly/Loading";
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
export default {
  name: "NoIdNumberManager",
  components: {
    CTable,
    Loading,
    TreeFilter
  },
  data() {
    return {
      isAuditAuth: false, //是否有审批无证人员权限
      curSelectTp: null, //当前选择的图谱类型
      filters: {
        keywords: "", //关键词
        personType: [], // 人员状态
        isNeedVerify: [], // 是否需要核实
        state: this.$route.query.state ? this.$route.query.state : "0", // 当前 tab
        belongDeptId: "" //单位id
      },
      tableHeight: 300,
      columns1: [],
      columns2: [],
      columns3: [],
      columns4: [],
      columns5: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [], //表格数据
      tableLoadingShow: false, //表格Loading
      submitCurData: {}, //当前data
      delectCurData: {}, //当前data
      totalCount: {}, //tab总数
      // 筛选器的列表
      filterOptionList: {
        personStatuOption: [], //人员状态option
        isNeedVerifyOption: [
          {
            value: 1,
            name: "是"
          },
          {
            value: 0,
            name: "否"
          }
        ]
      },
      titleDetail: {
        // 详情标题
        executeTime: 0,
        total: 0
      },
      bgColor: "rgba(255,255,255,.8)",
      optionConfig: OPTIONS_LIST,
      cityTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },

      cityApis: comApis.GET_DEPT_TREE_INFO
    };
  },
  // 过滤器
  filters: {
    format(val) {
      return val.toString();
    }
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.setColumns(); //设置表头
      this.getPersonStateOption(); // 筛选列表
      this.getCurTableData(); //获取tableData
      this.getAuditAuth(); // 获取审批无证人员权限
      this.resizeHandler();
      window.onresize = this.resizeHandler;
    },
    // 获取列表数据
    getCurTableData() {
      this.tableLoadingShow = true;
      // 参数
      let params = {
        auditState: null,
        belongDeptId: this.filters.belongDeptId,
        needCollect:
          this.filters.isNeedVerify.length == 1
            ? this.filters.isNeedVerify[0]
            : "",
        stateStrong: this.filters.personType,
        keyWord: this.filters.keywords,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      };
      // 接口
      let req = apis.GET_NO_IDNUMBER_TABLE_LIST;
      switch (this.filters.state) {
        case "0":
          params.auditState = 0;
          break;

        case "1":
          params.auditState = 2;
          break;

        case "2":
          params.auditState = 2;
          break;

        case "3":
          params.auditState = 1;
          break;

        case "4":
          params.auditState = 3;
          break;

        default:
          this.$Message.error("获取失败！");
          return;
      }
      // 请求
      req(params).then(res => {
        if (res.code === 200) {
          this.tableLoadingShow = false;
          let data = res.data.data;
          // 加序号
          data.forEach(
            (val, index) =>
              (val.mapNumber = index + 1 + (this.pagination.pageIndex - 1) * 10)
          );
          // table 数据
          this.tableData = data;
          // 分页
          this.pagination.total = res.data.total;
          // 标题详情
          this.titleDetail.executeTime = res.data.executeTime;
          this.titleDetail.total = res.data.total;
          // tab 合计
          this.getMapCounts(params);
        } else {
          this.tableLoadingShow = false;
          this.$Message.error("获取失败！");
        }
      });
    },
    // 核实 click
    editorClick(row) {
      console.log("核实", row);
      let query = {
        type: 1,
        idNumber: row.idNumber
      };
      if (this.filters.state == "4") {
        query.auditComment = row.auditComment; //退回原因
        query.auditDeptName = row.auditDeptName; //退回部门
        query.lastAuditUser = row.lastAuditUser; //退回人
      }
      this.toVerifyPage(query);
    },
    // 查看 click
    viewClick(row) {
      console.log("查看", row);
      let query = {
        type: 2,
        idNumber: row.idNumber,
        auditId: row.auditId
      };
      this.toVerifyPage(query);
    },
    // 审核 click
    auditClick(row) {
      console.log("审核", row);
      let query = {
        type: 3,
        idNumber: row.idNumber,
        auditId: row.auditId
      };
      this.toVerifyPage(query);
    },
    // 跳转 核实页面
    toVerifyPage(query) {
      const { href } = this.$router.resolve({
        path: "/onlineCollect/verifyLayout",
        query
      });
      window.open(href, "_blank");
    },
    // 归属区划 Change 事件
    handleCitySelectChange(cur) {
      this.filters.belongDeptId = cur.id;
      this.pagination.pageIndex = 1;
      this.getCurTableData();
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.deptPath = "";
        this.pagination.pageIndex = 1;
        this.getCurTableData();
      }
    },
    // 刷新
    resetData() {
      (this.filters = {
        keywords: "", //关键词
        personType: [], // 人员状态
        isNeedVerify: [], // 是否需要核实
        state: this.$route.query.state ? this.$route.query.state : "0", // 当前 tab
        belongDeptId: "" //单位id
      }),
        this.getCurTableData();
    },
    setColumns() {
      this.columns1 = [
        {
          title: "序号",
          key: "mapNumber",
          width: 80,
          align: "center"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 220
        },
        {
          title: "姓名",
          key: "name",
          width: 240
        },
        {
          title: "人员简介",
          // key: "intro",
          slot: "personIntro"
        },
        {
          title: "人员状态",
          width: 240,
          render: (h, params) => {
            let data = params.row;
            return (
              <div>
                {data.stateStrong +
                  (data.stateDetail ? " / " + data.stateDetail : "")}
              </div>
            );
          }
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_UnSubmit_Edit_ID
                ) || true ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event =>
                      this.editorClick(params.row, params.index)
                    }
                  >
                    核实
                  </i-button>
                ) : (
                  ""
                )}
              </span>
            );
          }
        }
      ];
      this.columns2 = [
        {
          title: "序号",
          key: "mapNumber",
          width: 80,
          align: "center"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 220,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 240
        },
        {
          title: "人员简介",
          // key: "intro",
          slot: "personIntro"
        },
        {
          title: "人员状态",
          align: "center",
          width: 240,
          render: (h, params) => {
            let data = params.row;
            return (
              <div>
                {data.stateStrong +
                  (data.stateDetail ? " / " + data.stateDetail : "")}
              </div>
            );
          }
        },
        {
          title: "提交时间",
          key: "commitTime",
          width: 185
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Review_History_ID
                ) || true ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.viewClick(params.row)}
                  >
                    查看
                  </i-button>
                ) : (
                  ""
                )}
              </span>
            );
          }
        }
      ];
      this.columns3 = [
        {
          title: "序号",
          key: "mapNumber",
          width: 80,
          align: "center"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 220,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 240
        },
        {
          title: "人员简介",
          // key: "intro",
          slot: "personIntro"
        },
        {
          title: "申请单位",
          key: "auditDeptName"
        },
        {
          title: "提交人",
          key: "commitUser"
        },
        {
          title: "提交时间",
          key: "commitTime",
          width: 185
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Review_History_ID
                ) || true ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.auditClick(params.row)}
                  >
                    审核
                  </i-button>
                ) : (
                  ""
                )}
              </span>
            );
          }
        }
      ];
      this.columns4 = [
        {
          title: "序号",
          key: "mapNumber",
          width: 80,
          align: "center"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 220,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 240
        },
        {
          title: "人员简介",
          // key: "intro",
          slot: "personIntro"
        },
        {
          title: "人员状态",
          align: "center",
          width: 240,
          render: (h, params) => {
            let data = params.row;
            return (
              <div>
                {data.stateStrong +
                  (data.stateDetail ? " / " + data.stateDetail : "")}
              </div>
            );
          }
        },
        {
          title: "提交时间",
          key: "commitTime",
          width: 185
        },
        {
          title: "通过时间",
          key: "lastAuditTime",
          width: 185
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Review_History_ID
                ) || true ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.viewClick(params.row)}
                  >
                    查看
                  </i-button>
                ) : (
                  ""
                )}
              </span>
            );
          }
        }
      ];
      this.columns5 = [
        {
          title: "序号",
          key: "mapNumber",
          width: 80,
          align: "center"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 220,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 240
        },
        {
          title: "人员简介",
          // key: "intro",
          slot: "personIntro"
        },
        {
          title: "退回原因",
          key: "auditComment"
        },
        {
          title: "退回人",
          key: "lastAuditUser"
          // sortable: true
        },
        {
          title: "退回时间",
          key: "lastAuditTime"
          // sortable: true
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Review_History_ID
                ) || true ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.editorClick(params.row)}
                  >
                    核实
                  </i-button>
                ) : (
                  ""
                )}
              </span>
            );
          }
        }
      ];
    },
    // Tab change 事件
    tabChange(val) {
      this.filters.state = val;
      this.pagination.pageIndex = 1;
      this.getCurTableData();
    },
    // 获取各类列表总数
    getMapCounts(params) {
      apis.GET_NO_IDNUMBER_TAB_TOTAL(params).then(res => {
        if (res.code === 200) {
          this.totalCount = res.data;
        }
      });
    },
    // 分页 Change 事件
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getCurTableData();
    },
    // 设置table高
    resizeHandler() {
      let height = window.screen.height - 500;
      this.tableHeight = height > 200 ? height : 200;
    },
    // 获取人员状态option
    getPersonStateOption() {
      comApis.GET_OPTIONS_LIST("STATE_STRONG").then(res => {
        if (res.code === 200) {
          this.filterOptionList.personStatuOption = res.data;
        }
      });
    },
    // 图谱类型标签选中事件
    handleTpType(val) {
      this.pagination.pageIndex = 1;
      this.getCurTableData();
    },
    // 搜索click事件
    handleSearchText() {
      this.pagination.pageIndex = 1;
      this.getCurTableData();
    },
    // 清空关键词
    handleClear() {
      if (this.filters.keywords == "") {
        this.pagination.pageIndex = 1;
        this.getCurTableData();
      }
    },
    // 获取审批无证人员权限
    getAuditAuth() {
      apis.GET_AUDIT_NO_IDNUMBER_PERSON_AUTH().then(res => {
        if (res.code === 200) {
          this.isAuditAuth = res.data;
        } else {
          this.isAuditAuth = false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .add-map-panel {
  .ivu-modal-content,
  .ivu-modal-body {
    height: 100%;
    padding: 0;
  }
}
/deep/.ivu-checkbox-group-item,
.ivu-radio-wrapper {
  font-size: inherit;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0 5px;
  font-size: 13px;
}
/deep/.ivu-radio-wrapper {
  padding: 3px 5px;
}
/deep/.ivu-checkbox,
/deep/.ivu-radio {
  display: none;
}
/deep/label.ivu-checkbox-wrapper.ivu-checkbox-group-item.ivu-checkbox-wrapper-checked.ivu-checkbox-default,
.ivu-radio-wrapper.ivu-radio-group-item.ivu-radio-wrapper-checked.ivu-radio-default {
  background-color: #0668c8;
  color: #fff;
}
.search-result {
  font-size: 12px;
  color: #93989d;
  margin-bottom: 5px;
}
.action-list {
  position: relative;
  /deep/.zptx-loading-mask {
    top: 73px !important;
    height: calc(100% - 110px) !important;
  }
}
// .verify-label {
//   flex: 0 0 70px!important;
// }
</style>
