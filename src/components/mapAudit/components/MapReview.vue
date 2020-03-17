<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime: 2019-12-18 17:11:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">图谱审核</h2>
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
        <span class="tpList">图谱列表</span>
        <div class="action-btns">
          <Button @click="refreshData">
            刷新
            <i class="iconfont icon-gengxin"></i>
          </Button>
          <Button
            @click="downloadBtnClick"
            :loading="loadingBtn"
            v-if="hasFunAuth(constantFunMap.FUN_MapAduit_AduitList_EXPOT_ID)"
          >
            <span v-if="!loadingBtn">数据导出</span>
            <span v-else>正在导出</span>
            <i class="iconfont icon-shangchuan icon-daochu"></i>
          </Button>
        </div>
      </div>
      <!-- 查询条件区域 -->
      <div class="actions-search">
        <Row>
          <Col span="12">
            <div class="search-row">
              <div class="search-label">待审核状态:</div>
              <div class="search-control">
                <div
                  :key="index"
                  v-for="(item,index) in mapAuditList"
                  :class="{radioItem: true, active: item.id==filters.mapAuditValue}"
                  @click="handleMapAudit(item.id)"
                >{{item.name}}({{item.count || 0}})</div>
              </div>
            </div>
            <div class="search-row">
              <div class="search-label">图谱属性:</div>
              <div class="search-control">
                <div
                  :key="index"
                  v-for="(item,index) in mapStatusList"
                  :class="{radioItem: true, active: item.id==filters.mapStatusValue}"
                  @click="handleMapStatus(item.id)"
                >{{item.name}}({{item.count || 0}})</div>
              </div>
            </div>

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
            <div class="search-row">
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
            </div>
          </Col>
        </Row>
      </div>
      <div class="action-list">
        <Loading :bgColor="bgColor" v-model="archivesLoadingShow"></Loading>
        <!-- <p
          class="search-result"
        >本次搜索耗时{{fetchDetail.executeTime}}秒，搜索出{{fetchDetail.total}}条包含关键字信息的图谱</p>-->
        <Button
          class="batchPass"
          type="primary"
          v-if="batchPermissions"
          @click="handleBatchPass"
        >批量审核</Button>
        <Tabs
          type="card"
          :animated="false"
          :value="reqParams.state | format"
          @on-click="changeState"
        >
          <TabPane :index="1" :label="`待审核(${totalCount.auditCount || 0})`" name="2">
            <c-table
              :height="tableHeight"
              :columns="columns1"
              size="small"
              :data="data"
              @on-change-page="handlePageChange"
              :pagination="pagination"
              @on-select-all="handleSelectAll"
              @on-selection-change="handleSelect"
            ></c-table>
          </TabPane>
          <TabPane :index="2" :label="`已通过(${totalCount.approveCount || 0})`" name="0">
            <c-table
              :height="tableHeight"
              :columns="columns2"
              size="small"
              :data="data"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
          <TabPane :index="3" :label="`已退回(${totalCount.backCount || 0})`" name="1">
            <c-table
              :height="tableHeight"
              :columns="columns3"
              size="small"
              :data="data"
              @on-change-page="handlePageChange"
              :pagination="pagination"
            ></c-table>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <Modal v-model="errorModal" width="480" class="errorBox">
      <p slot="header" style="color:#2d8cf0;fontSize:16px">
        <Icon type="md-information-circle" />
        <span>审核结果</span>
      </p>
      <p style="fontSize:14px" v-for="item in auditResults" :key="item">{{item}}</p>
      <div slot="footer">
        <Button type="primary" @click="closeErrorBox">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import CTable from "./ITable";
import Loading from "@/components/assembly/Loading";
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as tool from "../../../tools/units.js";
export default {
  name: "MapReview",
  components: {
    CTable,
    Loading,
    TreeFilter
  },
  data() {
    return {
      loadingBtn: false,
      errorModal: false,
      visible: false,
      deptSearchResult: [],
      deptArrayList: [],
      tableHeight: 300,
      columns1: [], //待审核
      columns2: [], //已审核
      columns3: [], //已退回
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      list: {
        tpTags: [
          {
            label: "全部",
            key: "0"
          },
          {
            label: "我的图谱",
            key: "1"
          }
        ],
        tpTypes: [
          {
            label: "宗",
            key: "0"
          },
          {
            label: "案",
            key: "1"
          },
          {
            label: "家",
            key: "2"
          },
          {
            label: "暴",
            key: "3"
          },
          {
            label: "打",
            key: "4"
          },
          {
            label: "境外",
            key: "5"
          },
          {
            label: "社",
            key: "6"
          }
        ],
        personStatus: [
          {
            label: "收押",
            key: "0"
          },
          {
            label: "收教",
            key: "1"
          },
          {
            label: "死亡",
            key: "2"
          },
          {
            label: "境外",
            key: "3"
          },
          {
            label: "去向不明",
            key: "4"
          },
          {
            label: "社会面",
            key: "5"
          }
        ],
        deptList: []
      },
      filters: {
        tpType: [],
        personStatu: [],
        startTime: "",
        endTime: "",
        belongAreaDisplayName: "",
        cityTreeData: null,
        belongArea: "", //归属区划
        belongAreaCode: "", //归属区划名称
        deptPath: "",
        tpName: "", //图谱名称
        mapStatusValue: "", //图谱属性值
        mapAuditValue: "", //审核属性值
        keywords: "" //关键词
      },
      mapStatusList: [
        {
          id: "0",
          name: "新提交",
          count: 0
        },
        {
          id: "1",
          name: "退回",
          count: 0
        }
      ], //图谱属性列表
      mapAuditList: [
        {
          id: "0",
          name: "新图谱",
          count: 0
        },
        {
          id: "1",
          name: "二次编辑",
          count: 0
        }
      ], //审核属性列表
      totalCount: {},
      data: [],
      reqParams: {
        pageIndex: 1,
        pageSize: 10,
        state: 2
      },
      archivesLoadingShow: false,
      approveData: {},
      isRefuse: false, // 驳回申请模态
      refuseLoading: true,
      refuse: {
        refuseMsg: "" // 驳回理由
      },
      batchPermissions: false,
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
      bgColor: "rgba(255,255,255,.8)",
      batchTpList: [],
      auditResults: [],
      auditResultsStr: ""
    };
  },
  filters: {
    format(val) {
      return val.toString();
    }
  },
  computed: {
    resultDeptList() {
      if (this.filters.dept) {
        this.deptSearchResult = [];
        this.filterMethod(this.list.deptList, this.deptSearchResult);
        return this.deptSearchResult;
      } else {
        return this.list.deptList;
      }
    }
  },
  created() {
    if (this.$route.query.type) this.filters.tpType = [this.$route.query.type];
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler());
    if (this.$route.query.state != undefined) {
      this.reqParams.state = this.$route.query.state;
    }
  },
  mounted() {
    this.init();
    this.getDeptData();
    this.getPrimissions();
    this.getMapSearchList();
    this.onStartTimeChange(this.filters.startTime);
    this.onEndTimeChange(this.filters.endTime);
  },
  methods: {
    init() {
      this.getStateList();
      this.getMapCounts();
      this.getLastauditstateCount();
      this.getSeconderAuditstateCount();
      // this.setColumns();
    },
    // 刷新
    refreshData() {
      this.filters = {
        tpType: [],
        personStatu: [],
        startTime: "",
        endTime: "",
        belongAreaDisplayName: "",
        cityTreeData: null,
        belongArea: "", //归属区划
        belongAreaCode: "", //归属区划名称
        deptPath: "",
        tpName: "", //图谱名称
        mapStatusValue: "", //图谱属性值
        mapAuditValue: "", //审核属性值
        keywords: "" //关键词
      };
      this.init();
    },
    getPrimissions() {
      apis.GET_BATCH_MAP_AUDIT_AUTHORITY().then(res => {
        if (res.code === 200) {
          this.batchPermissions = res.data;
          this.setColumns();
        }
      });
    },
    setColumns() {
      this.columns1 = [
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
          key: "mapName",
          width: "240px"
        },
        {
          title: "采集人",
          key: "creater"
        },
        {
          title: "采集单位",
          key: "deptName"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
        },
        {
          title: "提交时间",
          key: "commitTime",
          sortable: true
        },
        {
          title: "待审核状态",
          key: "secondReview",
          align: "center",
          width: 100
        },
        {
          title: "属性",
          key: "lastAuditState",
          align: "center",
          width: 100
        },

        {
          title: "操作",
          key: "state",
          width: "120px",
          align: "center",
          render: (h, params) => {
            return (
              <span>
                <i-button
                  size="small"
                  type="primary"
                  on-click={$event =>
                    this.handleApprovePage(params.row, params.index)
                  }
                >
                  审核
                </i-button>
              </span>
            );
          }
        }
      ];
      this.columns2 = [
        {
          title: "序号",
          key: "mapNumber",
          width: 60
        },
        {
          title: "图谱类型",
          key: "typeLabel",
          width: 100
        },
        {
          title: "图谱名称",
          key: "mapName",
          width: 240
        },
        {
          title: "采集人",
          key: "creater"
        },
        {
          title: "采集单位",
          key: "deptName"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
        },
        {
          title: "提交时间",
          key: "commitTime",
          sortable: true
        },
        {
          title: "通过时间",
          key: "endTime",
          sortable: true
        },
        {
          title: "操作",
          key: "state",
          width: "110px",
          align: "center",
          render: (h, params) => {
            return (
              <i-button
                size="small"
                type="primary"
                on-click={$event =>
                  this.handlePassView(params.row, params.index)
                }
              >
                查看
              </i-button>
            );
          }
        }
      ];
      this.columns3 = [
        {
          title: "序号",
          key: "mapNumber",
          width: 60
        },
        {
          title: "图谱类型",
          key: "typeLabel",
          width: 100
        },
        {
          title: "图谱名称",
          key: "mapName",
          width: 240
        },
        {
          title: "采集人",
          key: "creater"
        },
        {
          title: "采集单位",
          key: "deptName"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
        },
        {
          title: "提交时间",
          key: "commitTime",
          sortable: true
        },
        {
          title: "退回时间",
          key: "endTime",
          sortable: true
        },
        {
          title: "退回原因",
          key: "auditComment"
        },
        {
          title: "操作",
          key: "state",
          width: "90px",
          align: "center",
          render: (h, params) => {
            return (
              <i-button
                size="small"
                type="primary"
                on-click={$event => this.handleBackView(params.row, params)}
              >
                查看
              </i-button>
            );
          }
        }
      ];
      if (this.batchPermissions) {
        this.columns1.unshift({
          type: "selection",
          width: 50
        });
      }
    },
    changeState(name) {
      this.reqParams.state = name;
      this.reqParams.pageIndex = 1;
      this.pagination.pageIndex = 1;
      this.init();
    },
    setParams() {
      let params = {
        // keyWord:this.filters.keywords,
        deptPath: this.filters.deptPath,
        endTime: this.filters.endTime || null,
        mapType: this.filters.tpType.join(),
        pageIndex: this.pagination.pageIndex,
        pageSize: 10,
        startTime: this.filters.startTime || null,
        mapName: this.filters.keywords,
        state: this.reqParams.state,
        lastAuditState: this.filters.mapStatusValue,
        secondReview: this.filters.mapAuditValue
      };
      return params;
    },
    // 获取各类列表总数
    getMapCounts() {
      let params = {
        // keyWord:this.filters.keywords,
        deptPath: this.filters.deptPath,
        endTime: this.filters.endTime || null,
        mapType: this.filters.tpType.join(),
        startTime: this.filters.startTime || null,
        mapName: this.filters.keywords,
        lastAuditState: this.filters.mapStatusValue,
        secondReview: this.filters.mapAuditValue
      };
      apis.POST_MAP_ALL_COUNT_AUDIT(params).then(res => {
        if (res.code === 200) {
          this.totalCount = res.data;
        }
      });
    },
    // 获取各状态的列表数据
    getStateList() {
      this.archivesLoadingShow = true;
      let req =
        this.reqParams.state == 2
          ? apis.POST_TO_AUDIT_LIST
          : apis.POST_AUDIT_BACK_LIST;
      let params = this.setParams();
      req(params).then(res => {
        if (res.code === 200) {
          this.archivesLoadingShow = false;
          let data = res.data.data;
          data.forEach((val, index) => {
            val.mapNumber = index + 1 + (this.reqParams.pageIndex - 1) * 10;
          });
          this.data = data;
          this.pagination.total = res.data.total;
          // this.fetchDetail.executeTime = res.data.executeTime;
          // this.fetchDetail.total = res.data.total;
          this.pagination.pageIndex =
            res.data.pageIndex != 0 ? res.data.pageIndex : 1;
        } else {
          this.archivesLoadingShow = false;
        }
      });
    },
    // 获取图谱最后一次审核状态的数量
    getLastauditstateCount() {
      let params = this.setParams();
      apis.POST_LASTAUDITSTATE_COUNT(params).then(res => {
        if (res.code === 200) {
          res.data.forEach(x => {
            if (x.id == 0) {
              this.mapStatusList[0].count = x.count;
            } else {
              this.mapStatusList[1].count = x.count;
            }
          });
        }
      });
    },
    // 获取图谱最后一次审核状态的数量
    getSeconderAuditstateCount() {
      let params = this.setParams();
      apis.POST_SECONDERAUDITSTATE_COUNT(params).then(res => {
        if (res.code === 200) {
          res.data.forEach(x => {
            if (x.id == 0) {
              this.mapAuditList[0].count = x.count;
            } else {
              this.mapAuditList[1].count = x.count;
            }
          });
        }
      });
    },
    // 退回按钮
    handleBack(row) {
      this.backData = row;
      this.isRefuse = true;
    },
    // 跳转到审批页面
    handleApprovePage(row, index) {
      if (row.mapType == "9") {
        const { href } = this.$router.resolve({
          path: "/CollectMarkerProfile",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 2,
            isAduit: true
          }
        });
        window.open(href, "_blank");
      } else if (row.mapType == "8") {
        const { href } = this.$router.resolve({
          path: "/collectMarkerExitEnter",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 2,
            isAduit: true
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
            isAduit: true,
            status: 2
          }
        });
        window.open(href, "_blank");
      }
    },
    handleBackView(row, index) {
      if (row.mapType == "9") {
        const { href } = this.$router.resolve({
          path: "/CollectMarkerProfile",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 3,
            isAduit: false
          }
        });
        window.open(href, "_blank");
      } else if (row.mapType == "8") {
        const { href } = this.$router.resolve({
          path: "/collectMarkerExitEnter",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            isAduit: false,
            status: 3
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
            isAduit: false,
            status: 3
          }
        });
        window.open(href, "_blank");
      }
    },
    handlePassView(row, index) {
      if (row.mapType == "9") {
        const { href } = this.$router.resolve({
          path: "/CollectMarkerProfile",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 1,
            isAduit: false
          }
        });
        window.open(href, "_blank");
      } else if (row.mapType == "8") {
        const { href } = this.$router.resolve({
          path: "/collectMarkerExitEnter",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 1,
            isAduit: false
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
            isAduit: false,
            status: 1
          }
        });
        window.open(href, "_blank");
      }
    },
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.init();
    },
    handleOpenDept() {
      this.visible = true;
    },
    handleCloseDept() {
      this.visible = false;
    },
    handleDeptSelectChange(data, cur) {
      this.filters.dept = cur.title;
      this.filters.deptId = cur.deptId;
      this.filters.deptName = cur.id;
      this.$refs.deptDropdown.handleClick();
      this.visible = false;
    },
    getDeptData() {
      comApis.getDeptTree().then(response => {
        if (response.code == 200) {
          this.list.deptList = response.data;
          this.treeTransArray(response.data, "children");
        }
      });
    },
    // 将树形结构的数据转化成一维数组
    treeTransArray(tree, key) {
      return tree.reduce((con, item) => {
        con.push(item);
        if (item[key] && item[key].length > 0)
          this.treeTransArray(item[key], key);
        return con;
      }, this.deptArrayList);
    },
    /**
     * 单位树模糊查询
     * @function search
     * @author erbing
     */
    filterMethod(data, result) {
      data.forEach(item => {
        // 如果该数组title字段匹配搜索字段，添加该数组，此时children为空
        var temp = {};
        if (item.title.indexOf(this.filters.dept) !== -1) {
          temp = {
            expand: item.expand,
            id: item.id,
            deptId: item.deptId,
            leaves: item.leaves,
            nodeKey: item.nodeKey,
            title: item.title,
            children: []
          };
          result.push(temp);
        }
        // 如果该数组有子集，递归子集children
        if (item.children) {
          if (temp.children) {
            this.filterMethod(item.children, temp.children);
          } else {
            this.filterMethod(item.children, result);
          }
        }
      });
    },
    resizeHandler() {
      this.$nextTick(() => {
        let rightContent = this.$parent.$refs.rightContent;
        if (rightContent.clientHeight - 345 < 300) {
          this.tableHeight = 300;
        } else {
          this.tableHeight = rightContent.clientHeight - 345;
        }
      });
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
      this.init();
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
      this.init();
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
      this.init();
    },
    // 图谱类型标签选中事件
    handleTpType(val) {
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 图谱属性标签选中事件
    handleMapStatus(val) {
      console.log(this.filters.mapStatusValue, val);
      this.filters.mapStatusValue =
        this.filters.mapStatusValue == val ? "" : val;
      this.pagination.pageIndex = 1;
      this.init();
    },
    handleMapAudit(val) {
      console.log(this.filters.mapAuditValue, val);
      this.filters.mapAuditValue = this.filters.mapAuditValue == val ? "" : val;
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.deptPath = "";
        this.pagination.pageIndex = 1;
        this.init();
      }
    },
    handleSearchText() {
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 清空关键词
    handleClear() {
      if (this.filters.tpName == "") {
        this.pagination.pageIndex = 1;
        this.init();
      }
    },
    // 批量通过事件
    handleBatchPass() {
      let me = this;
      if (me.batchTpList.length <= 0) {
        this.$Modal.warning({
          title: "提示",
          content: "批量审核无法执行，请先选择图谱！"
        });
      } else {
        let tpNum = me.batchTpList.length;
        this.$Modal.confirm({
          title: "提示",
          content: "已选择" + tpNum + "个图谱，请确认是否批量审核通过？",
          onOk() {
            apis.POST_BATCH_AUDIT_MAP(me.batchTpList).then(res => {
              me.errorModal = true;
              if (res.code === 200) {
                me.auditResults = res.data.message
                  ? res.data.message.split(";")
                  : [];
                me.auditResultsStr = res.data.message ? res.data.message : "";
              } else {
                me.auditResults = [res.msg];
                me.auditResultsStr = "";
              }
            });
          },
          onCancel() {}
        });
      }
    },
    closeErrorBox() {
      this.errorModal = false;
      console.log(this.auditResultsStr);

      if (this.auditResultsStr.indexOf("审批通过") != -1) {
        this.init();
      }
    },
    // 全选
    handleSelectAll(selection) {
      this.batchTpList = [];
      selection.forEach(x => {
        this.batchTpList.push(x.collectId);
      });
    },
    // 取消全选
    // handleSelectAllCancel() {
    //   this.batchTpList = [];
    //   console.log(this.batchTpList);
    // },
    // 选中某个
    handleSelect(selection) {
      this.batchTpList = [];
      selection.forEach(x => {
        this.batchTpList.push(x.collectId);
      });
    },
    handleExportData() {
      let params = this.setParams();
      return apis.POST_MAPAUDIT_EXPOT_DATA(params).then(res => {
        if (res.type == "application/json") {
          let reader = new FileReader();
          reader.readAsText(res, "utf-8");
          reader.onload = e => {
            let msg = JSON.parse(reader.result).msg;
            this.$Message.error(msg);
          };
        } else {
          let name = `图谱审核数据-${this.$moment().format(
            "YYYY-MM-DD"
          )}-${Math.ceil(Math.random() * 1000000000)}.xlsm`;
          // 响应结果乱码，设置blob请求头，接收；下面再把blob转一下
          tool.getExcelByBlob(res, name);
        }
      });
    },
    // 下载按钮click事件
    downloadBtnClick() {
      this.loadingBtn = true;
      this.handleExportData()
        .then(res => {
          this.loadingBtn = false;
        })
        .catch(error => {
          this.loadingBtn = false;
        });
    }
  },
  watch: {
    isRefuse(val) {
      if (!val) {
        this.$refs.refuse.resetFields();
        this.refuse = {};
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
.search-control {
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
}
.action-btns {
  button {
    font-size: 13px;
    i {
      font-size: 14px;
    }
    .icon-daochu {
      position: relative;
      top: 2px;
      left: 2px;
      color: #0668c8;
      font-weight: 700;
      font-size: 16px;
    }
  }
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
.batchPass {
  position: absolute;
  right: 0;
  top: -10px;
  z-index: 2;
}
.errorBox {
  /deep/.ivu-modal-body {
    max-height: 340px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.radioItem {
  float: left;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0 5px;
  margin-right: 8px;
  cursor: pointer;
  line-height: 22px;
  user-select: none;
  &.active {
    background-color: #0668c8;
    color: #fff;
  }
}
</style>
