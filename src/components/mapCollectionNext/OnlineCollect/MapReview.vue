<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime: 2019-12-05 14:34:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">报送审核</h2>
      <!-- 查询条件区域 -->
      <div class="action-search-input">
        <div>
          <i-input
            class="search-input search-control"
            icon="ios-search"
            style="width:350px;"
            v-model="filters.keywords"
            clearable
            placeholder="请输入身份证、图谱名称等关键词"
            @keyup.enter.native="handleSearchText"
            @on-change="handleClear"
          ></i-input>
          <Button type="primary" @click="handleSearchText">搜索</Button>
        </div>
      </div>
    </div>
    <div class="mapManagemen-content">
      <div class="con-header">
        <span class="tpList" id="tpList" @click="hanldUpdate">图谱列表</span>
        <div class="action-btns">
          <Button @click="refreshData">
            刷新
            <i class="iconfont icon-gengxin"></i>
          </Button>
        </div>
      </div>
      <!-- 查询条件区域 -->
      <div class="actions-search">
        <Row>
          <Col span="12">
            <!-- <div class="search-row">
              <div class="search-label">图谱名称:</div>
              <div class="search-control">
                <i-input
                  class="search-input search-control"
                  icon="ios-search"
                  style="width:365px;"
                  v-model="filters.tpName"
                  clearable
                  placeholder="请输入图谱名称"
                  @keyup.enter.native="handleSearchText"
                  @on-change="handleClear"
                ></i-input>
              </div>
            </div>-->
            <div class="search-row">
              <div class="search-label">采集时间:</div>
              <div class="search-control">
                <DatePicker
                  type="date"
                  placeholder="开始时间"
                  v-model="filters.startTime"
                  @on-change="onStartTimeChange"
                  :options="startTimeOption"
                ></DatePicker>
                <span>至</span>
                <DatePicker
                  type="date"
                  placeholder="结束时间"
                  v-model="filters.endTime"
                  @on-change="onEndTimeChange"
                  :options="endTimeOption"
                ></DatePicker>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="search-row">
              <div class="search-label">图谱类型:</div>
              <div class="search-control">
                <CheckboxGroup v-model="filters.tpType" @on-change="handleTpType">
                  <Checkbox
                    :key="index"
                    v-for="(item,index) in tpTypes.mapConditionVOList"
                    :label="item.value"
                  >{{item.name}}</Checkbox>
                </CheckboxGroup>
              </div>
            </div>

            <!-- <div class="search-row">
              <div class="search-label">单位选择:</div>
              <div class="search-control">
                <tree-filter
                  :apiKey="optionConfig.CURRENT_TOKEN_DEPT_TREE"
                  ref="cityTree"
                  select-type="all"
                  :tree-props="cityTreeProps"
                  v-model="filters.belongAreaDisplayName"
                  placeholder
                  :apiFun="cityApis"
                  @on-select-change="handleCitySelectChange"
                  @on-clear="handleDeptPath"
                ></tree-filter>
              </div>
            </div>-->
          </Col>
        </Row>
      </div>
      <div class="action-list">
        <!-- loading -->
        <Loading :bgColor="bgColor" v-model="archivesLoadingShow"></Loading>
        <!-- <p
          class="search-result"
        >本次搜索耗时{{fetchDetail.executeTime}}秒，搜索出{{fetchDetail.total}}条包含关键字信息的图谱</p>-->
        <Tabs
          type="card"
          :animated="false"
          :value="resParams.state | format"
          @on-click="changeState"
        >
          <TabPane :index="1" :label="`未提交(${totalCount.draftCount || 0})`" name="0">
            <c-table
              :height="tableHeight"
              :columns="columns1"
              size="small"
              :data="data"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane :index="2" :label="`审核中(${totalCount.auditCount || 0})`" name="2">
            <c-table
              :height="tableHeight"
              :columns="columns2"
              size="small"
              :data="data"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane :index="3" :label="`已退回(${totalCount.backCount || 0})`" name="3">
            <c-table
              :height="tableHeight"
              :columns="columns3"
              size="small"
              :data="data"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane :index="4" :label="`已通过(${totalCount.approveCount || 0})`" name="1">
            <c-table
              :height="tableHeight"
              :columns="columns4"
              size="small"
              :data="data"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
        </Tabs>
      </div>
      <!-- 审核历史 -->
      <audit-history
        v-model="showHistroy"
        v-on:handleHistroy="changeShowHistroy"
        :histroyData="histroyData"
      ></audit-history>
    </div>
    <!-- 提交错误信息框 -->
    <Modal v-model="errorModal" width="572" class="errorBox">
      <p slot="header" class="errorModal-header">
        <i class="iconfont icon-tishi"></i>
        <span>提交失败</span>
      </p>
      <div class="errorModal-body">
        <p class="error-title">请完善图谱相关信息</p>
        <div class="error-content" v-for="(item,index) in errorInfo.errorData" :key="item">
          <div class="cont">
            <p class="des">
              <span class="no">原因{{index+1}}：</span>
              {{item}}
            </p>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="closeErrorBox">确定</Button>
      </div>
    </Modal>
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
  name: "MapReview",
  components: {
    CTable,
    Loading,
    TreeFilter,
    // AddMapPanel: () => import("./assembly/AddMapPanel"),
    AuditHistory: () =>
      import("@/components/mapCollectionNext/components/assembly/auditHistory")
  },
  data() {
    return {
      step: 2,
      showAddDialog: false,
      curSelectTp: null, //当前选择的图谱类型
      title: "新建",
      filters: {
        keywords: "", //关键词
        tpType: [],
        personStatu: [],
        startTime: "",
        endTime: "",
        belongAreaDisplayName: "",
        cityTreeData: null,
        belongArea: "", //归属区划
        belongAreaCode: "", //归属区划名称
        deptPath: "",
        tpName: "" //图谱名称
      },
      errorInfo: {
        message: "",
        errorData: []
      },
      errorModal: false,
      showHistroy: false,
      visible: false,
      deptSearchResult: [],
      deptArrayList: [],
      tableHeight: 300,
      columns1: [],
      columns2: [],
      columns3: [],
      columns4: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      resParams: {
        pageIndex: 1,
        pageSize: 10,
        state: 0
      },
      data: [],
      archivesLoadingShow: false,
      submitDada: {},
      delectDada: {},
      totalCount: {},
      histroyData: {}, //历史记录
      tpTypes: {}, //图谱类型
      startTimeOption: {},
      endTimeOption: {},
      optionConfig: OPTIONS_LIST,
      cityTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      fetchDetail: {
        executeTime: 0,
        total: 0,
        listData: []
      },
      cityApis: comApis.GET_DEPT_TREE_INFO,
      bgColor: "rgba(255,255,255,.8)"
    };
  },
  filters: {
    format(val) {
      return val.toString();
    }
  },
  computed: {},
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler());
    if (this.$route.query.state != undefined) {
      this.resParams.state = this.$route.query.state;
    }
  },
  mounted() {
    this.init();
    this.setTimeOption();
  },
  methods: {
    init() {
      this.setColumns();
      this.getListData();
      this.getMapSearchList();
    },
    setTimeOption() {
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime > Date.now();
        }
      };
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > Date.now();
        }
      };
    },
    // 刷新
    refreshData() {
      this.filters = {
        keywords: "",
        tpType: [],
        personStatu: [],
        startTime: "",
        endTime: "",
        belongAreaDisplayName: "",
        cityTreeData: null,
        belongArea: "", //归属区划
        belongAreaCode: "", //归属区划名称
        deptPath: "",
        tpName: "" //图谱名称
      };
      this.getListData();
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
          title: "图谱类型",
          key: "typeLabel",
          width: 110,
          align: "center"
        },
        {
          title: "图谱名称",
          key: "mapName",
          width: 300
        },
        {
          title: "成员数",
          key: "personCount",
          // sortable: true,
          width: 120,
          align: "center"
        },
        {
          title: "图谱简介",
          key: "mapDescription",
          slot: "mapDescription"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
        },
        {
          title: "操作",
          key: "state",
          width: "220px",
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Submit_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.handleSubmit(params.row)}
                  >
                    提交
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_UnSubmit_Edit_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event =>
                      this.handleUncommittedView(params.row, params.index)
                    }
                  >
                    编辑
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_UnSubmit_Delete_ID
                ) ? (
                  <i-button
                    size="small"
                    type="error"
                    on-click={$event => this.handleDelete(params.row)}
                  >
                    删除
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
          title: "图谱类型",
          key: "typeLabel",
          width: 110,
          align: "center"
        },
        {
          title: "图谱名称",
          key: "mapName",
          width: 300
        },
        {
          title: "成员数",
          key: "personCount",
          // sortable: true,
          width: 100,
          align: "center"
        },
        {
          title: "图谱简介",
          key: "mapDescription",
          slot: "mapDescription"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
        },
        {
          title: "提交时间",
          key: "commitTime"
          // sortable: true
        },
        {
          title: "审核状态",
          key: "statusList",
          width: "220px",
          align: "center",
          slot: "steps"
        },
        {
          title: "操作",
          key: "state",
          width: "150px",
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Review_History_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.handleHistory(params.row)}
                  >
                    审核历史
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
          width: 60,
          align: "center"
        },
        {
          title: "图谱类型",
          key: "typeLabel",
          width: 100,
          align: "center"
        },
        {
          title: "图谱名称",
          key: "mapName"
        },
        {
          title: "退回状态",
          key: "statusList",
          width: "200px",
          align: "center",
          slot: "steps"
        },
        {
          title: "退回原因",
          key: "auditComment"
        },
        {
          title: "退回人",
          key: "endAuditUserName"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
        },
        {
          title: "退回时间",
          key: "endTime"
          // sortable: true
        },
        {
          title: "操作",
          key: "state",
          width: "200px",
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Reject_Edit_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event =>
                      this.handleBackView(params.row, params.index)
                    }
                  >
                    编辑
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Review_History_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.handleHistory(params.row)}
                  >
                    审核历史
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
          // fixed: "left",
          align: "center"
        },
        {
          title: "图谱类型",
          key: "typeLabel",
          width: 110,
          align: "center"
        },
        {
          title: "图谱名称",
          key: "mapName",
          width: "280px"
        },
        {
          title: "成员数",
          key: "personCount",
          // sortable: true,
          width: 100,
          align: "center"
        },
        {
          title: "图谱简介",
          key: "mapDescription",
          slot: "mapDescription"
          // width: "260px"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
          // width: 160
        },
        {
          title: "提交时间",
          key: "commitTime"
          // sortable: true
          // width: 160
        },
        {
          title: "通过时间",
          key: "endTime"
          // sortable: true
          // width: 160
        },
        {
          title: "操作",
          key: "state",
          width: "180px",
          align: "center",
          // fixed: "right",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_Online_MapReivew_Review_History_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.handleHistory(params.row)}
                  >
                    审核历史
                  </i-button>
                ) : (
                  ""
                )}
              </span>
            );
          }
        }
      ];
      if (this.$config.project.locale == "gb") {
        this.columns2 = this.columns2.filter(x => {
          return x.title != "审核状态";
        });
        this.columns3 = this.columns3.filter(x => {
          return x.title != "退回状态";
        });
      }
    },
    closeErrorBox() {
      this.errorModal = false;
    },
    changeState(name) {
      // console.log(name);
      this.resParams.state = name;
      this.resParams.pageIndex = 1;
      this.pagination.pageIndex = 1;
      this.getListData();
    },
    // 获取列表数据
    getListData() {
      this.archivesLoadingShow = true;
      let params = {
        // keyWord: this.filters.keywords,
        deptPath: this.filters.deptPath,
        endTime: this.filters.endTime || null,
        mapType: this.filters.tpType.join(),
        pageIndex: this.pagination.pageIndex,
        pageSize: 10,
        startTime: this.filters.startTime || null,
        mapName: this.filters.keywords,
        state: this.resParams.state
      };
      apis.POST_USER_AUDIT_LIST(params).then(res => {
        if (res.code === 200) {
          this.archivesLoadingShow = false;
          let data = res.data.data;
          data.forEach((val, index) => {
            val.mapNumber = index + 1 + (this.resParams.pageIndex - 1) * 10;
            if (val.auditLevelPath) {
              val.statusList = JSON.parse(val.auditLevelPath);
            }
          });
          this.data = data;
          this.pagination.total = res.data.total;
          this.pagination.pageIndex != 0 ? res.data.pageIndex : 1;
          this.getMapCounts();
        } else {
          this.archivesLoadingShow = false;
        }
      });
    },
    // 获取各类列表总数
    getMapCounts() {
      let params = {
        // keyWord: this.filters.keywords,
        deptPath: this.filters.deptPath,
        endTime: this.filters.endTime || null,
        mapType: this.filters.tpType.join(),
        startTime: this.filters.startTime || null,
        mapName: this.filters.keywords
      };
      apis.POST_MAP_ALL_COUNT(params).then(res => {
        if (res.code === 200) {
          this.totalCount = res.data;
        }
      });
    },
    handleSubmit(row) {
      this.submitDada = row;
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要提交该图谱吗？",
        onOk: () => {
          let params = {
            auditState: 2,
            billId: this.submitDada.collectId,
            comment: ""
          };
          apis.POST_CHANGE_MAP_STATE(params).then(res => {
            if (res.code === 200) {
              this.$Message.success("提交成功！");
              this.getListData();
            } else {
              this.errorInfo.message = res.data.message;
              this.errorInfo.errorData = [
                ...res.data.mapErrorData,
                ...res.data.relationErrorData,
                ...res.data.personErrorData
              ];
              this.errorModal = true;
            }
          });
        },
        onCancel: () => {
          this.$Message.error("取消提交！");
        }
      });
    },
    // 删除按钮
    handleDelete(row) {
      this.delectDada = row;
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要删除该图谱吗？",
        onOk: () => {
          apis.DELETE_MAP_LIST(this.delectDada.collectId).then(res => {
            console.log(res, "ok");
            if (res.code === 200) {
              this.$Message.success("删除成功！");
            } else {
              this.$Message.error(res.msg);
            }
            this.getListData();
          });
        },
        onCancel: () => {
          this.$Message.error("取消删除！");
        }
      });
    },
    // 查看审核历史
    handleHistory(row) {
      let mapId = row.collectId;
      let mapName = row.mapName;

      apis.GET_MAP_HISTROY_DATA(mapId).then(res => {
        if (res.code === 200) {
          res.data.mapName = mapName;
          this.histroyData = res.data;
        }
        this.showHistroy = true;
      });
    },
    // 分页
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getListData();
    },
    // 未提交编辑
    handleUncommittedView(row, index) {
      if (row.mapType == "9") {
        const { href } = this.$router.resolve({
          path: "/CollectMarkerProfile",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 0
          }
        });
        window.open(href, "_blank");
      } else if (row.mapType == "8") {
        const { href } = this.$router.resolve({
          path: "/collectMarkerExitEnter",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 0
          }
        });
        window.open(href, "_blank");
      } else {
        if (row.collectPersonInfoStatus == "1") {
          this.step = 0;
          this.curSelectTp = row.mapType;
          this.showAddDialog = true;
          const { href } = this.$router.resolve({
            path: "/onlineCollect/addMap",
            query: {
              step: this.step,
              collectId: row.collectId,
              mapType: this.curSelectTp,
              excelStatus: row.collectPersonInfoStatus
            }
          });
          window.open(href, "_blank");
        } else {
          this.step = 2;
          this.curSelectTp = row.mapType;
          this.showAddDialog = true;
          const { href } = this.$router.resolve({
            path: "/onlineCollect/addMap",
            query: {
              step: this.step,
              collectId: row.collectId,
              mapType: this.curSelectTp,
              status: 0
            }
          });
          window.open(href, "_blank");
        }
      }
    },
    // 已退回编辑
    handleBackView(row, index) {
      if (row.mapType == "9") {
        const { href } = this.$router.resolve({
          path: "/CollectMarkerProfile",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 3
          }
        });
        window.open(href, "_blank");
      } else if (row.mapType == "8") {
        const { href } = this.$router.resolve({
          path: "/collectMarkerExitEnter",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 3
          }
        });
        window.open(href, "_blank");
      } else {
        this.step = 2;
        this.curSelectTp = row.mapType;
        console.log(this.curSelectTpList);

        this.showAddDialog = true;
        const { href } = this.$router.resolve({
          path: "/onlineCollect/addMap",
          query: {
            step: this.step,
            collectId: row.collectId,
            mapType: this.curSelectTp,
            status: 3
          }
        });
        window.open(href, "_blank");
      }
    },

    changeShowHistroy(val) {
      this.showHistroy = val;
    },
    resizeHandler() {
      this.$nextTick(() => {
        let rightContent = this.$parent.$refs.rightContent;

        if (rightContent.clientHeight - 260 < 300) {
          this.tableHeight = 300;
        } else {
          this.tableHeight = rightContent.clientHeight - 260;
        }
      });
    },
    hanldUpdate() {
      this.getListData();
    },
    // 获取图谱管理搜索条件数据
    getMapSearchList() {
      apis.GET_MAP_MANAGE_LIST().then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.tpTypes = res.data[1];
        }
      });
    },
    // 起始时间变化
    onStartTimeChange(startTime, type) {
      this.filters.startTime = startTime
        ? this.$moment(startTime).format("YYYY-MM-DD")
        : "";
      this.pagination.pageIndex = 1;
      this.getListData();
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime) - 8.64e7 || endTime > Date.now();
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(endTime, type) {
      this.filters.endTime = endTime
        ? this.$moment(endTime).format("YYYY-MM-DD")
        : "";
      this.pagination.pageIndex = 1;
      this.getListData();
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now();
        }
      };
    },
    // 选择归属区划信息
    handleCitySelectChange(cur) {
      this.filters.belongAreaCode = cur.code;
      this.filters.belongArea = cur.title;
      this.filters.deptPath = cur.deptPath;
      this.pagination.pageIndex = 1;
      this.getListData();
    },
    // 图谱类型标签选中事件
    handleTpType(val) {
      this.pagination.pageIndex = 1;
      this.getListData();
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.deptPath = "";
        this.pagination.pageIndex = 1;
        this.getListData();
      }
    },
    handleSearchText() {
      this.pagination.pageIndex = 1;
      this.getListData();
    },
    // 清空关键词
    handleClear() {
      if (this.filters.keywords == "") {
        this.pagination.pageIndex = 1;
        this.getListData();
      }
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
.errorBox {
  /deep/.ivu-modal-body {
    max-height: 340px;
    overflow-y: auto;
  }
  .errorModal-header {
    font-size: 16px;
    i {
      color: #ce4343;
      font-size: 24px;
    }
  }
  .errorModal-body {
    .error-title {
      font-size: 14px;
      color: #999;
      margin-bottom: 15px;
    }
    .error-content {
      .cont {
        font-size: 14px;
        margin-bottom: 5px;
        .no {
          color: #ce4343;
        }
      }
    }
  }
}
</style>
