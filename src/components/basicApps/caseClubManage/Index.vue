<template>
  <div class="containter" @click="handleWrapperClick($event)">
    <app-header :items="statusList" title="案件线索管理" :showSearch="false"></app-header>
    <div ref="rightContent" class="content">
      <div class="mapManagemen-header">
        <h2 class="map-title">案件线索管理</h2>
        <!-- 查询条件区域 -->
        <div class="actions-button" ref="actionsButton">
          <Input
            search
            clearable
            enter-button="搜索"
            v-model="filters.keyword"
            @on-change="handleClearKeyword"
            @on-search="handleSearch"
            placeholder="请输入案件名称、姓名、身份证等关键字"
            style="width:400px"
          />
          <Button
            type="primary"
            @click="handleToAddCasePage"
            v-if="hasFunAuth(constantFunMap.FUN_BasicApps_CaseManager_Add_ID)"
          >新建案件线索</Button>
          <a v-if="downloadUrl" :href="downloadUrl" target="_Blank">
            <Button
              type="primary"
              v-if="hasFunAuth(constantFunMap.FUN_BasicApps_CaseManager_Download_ID)"
            >下载模板</Button>
          </a>
          <Button
            type="primary"
            @click="handleShowBatchModal"
            v-if="hasFunAuth(constantFunMap.FUN_BasicApps_CaseManager_Import_ID)"
          >批量导入</Button>
          <BatchImportCase ref="batchImportCase"></BatchImportCase>
        </div>
      </div>
      <div class="mapManagemen-content">
        <div class="con-header">
          <span class="tpList" id="tpList" @click="hanldUpdate">案件线索列表</span>
          <div class="action-btns">
            <Button @click="refreshData" ref="refreshBtn">
              刷新
              <i class="iconfont icon-gengxin"></i>
            </Button>
            <Button
              @click="downloadBtnClick"
              :loading="loadingBtn"
              v-if="hasFunAuth(constantFunMap.FUN_BasicApps_CaseManager_EXPOT_ID)"
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
                <div class="search-label">类别:</div>
                <div class="search-control">
                  <CheckboxGroup v-model="filters.caseClass" @on-change="handleCaseClass">
                    <Checkbox
                      :key="index"
                      v-for="(item,index) in optionList.caseClassList"
                      :label="item.value"
                    >{{item.displayName}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
              <div class="search-row">
                <div class="search-label">来源:</div>
                <div class="search-control">
                  <Select
                    clearable
                    filterable
                    v-model="filters.caseSource"
                    style="width:365px"
                    @on-change="handleCaseSource"
                  >
                    <Option
                      v-for="item in optionList.caseSourceList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.displayName }}</Option>
                  </Select>
                </div>
              </div>
              <div class="search-row">
                <div class="search-label">状态:</div>
                <div class="search-control">
                  <Select
                    clearable
                    filterable
                    v-model="filters.caseState"
                    style="width:365px"
                    @on-change="handleCaseState"
                  >
                    <Option
                      v-for="item in optionList.caseStateList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.displayName }}</Option>
                  </Select>
                </div>
              </div>

              <div class="search-row">
                <div class="search-label">单位选择:</div>
                <div class="search-control">
                  <tree-filter
                    style="width:365px"
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
              <div class="search-row">
                <div class="search-label">采集时间:</div>
                <div class="search-control">
                  <DatePicker
                    type="date"
                    placeholder="开始时间"
                    v-model="filters.collectTimeStart"
                    @on-change="oncollectTimeStartChange"
                    :options="collectTimeStartOption"
                  ></DatePicker>
                  <span>至</span>
                  <DatePicker
                    type="date"
                    placeholder="结束时间"
                    v-model="filters.collectTimeEnd"
                    @on-change="oncollectTimeEndChange"
                    :options="collectTimeEndOption"
                  ></DatePicker>
                </div>
              </div>
            </Col>
            <Col span="12">
              <div class="search-row">
                <div class="search-label">类型:</div>
                <div class="search-control">
                  <CheckboxGroup v-model="filters.caseType" @on-change="handleCaseType">
                    <Checkbox
                      :key="index"
                      v-for="(item,index) in optionList.caseTypeList"
                      :label="item.value"
                    >{{item.displayName}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>

              <div class="search-row">
                <div class="search-label">立案时间:</div>
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
              <div class="search-row">
                <div class="search-label">案（线）发现地:</div>
                <div class="search-control">
                  <Cascader
                    style="width:365px"
                    ref="hukouAdress"
                    change-on-select
                    v-model="filters.caseAddressPath"
                    :data="optionList.proviceAddressList"
                    :load-data="loadHukouData"
                    @on-change="handleCaseAdressSelectChange"
                    @on-visible-change="getVisibleChange"
                  ></Cascader>
                </div>
              </div>
              <div class="search-row">
                <div class="search-label">案（线）办理地:</div>
                <div class="search-control">
                  <Cascader
                    style="width:365px"
                    ref="hukouAdress"
                    change-on-select
                    v-model="filters.caseHandleAddressPath"
                    :data="optionList.proviceAddressList"
                    :load-data="loadHukouData"
                    @on-change="handleCaseHandleAdressSelectChange"
                    @on-visible-change="getVisibleChange"
                  ></Cascader>
                </div>
              </div>
              <div class="search-row">
                <div class="search-label">串并数:</div>
                <div class="search-control">
                  <Input v-model="filters.joinCount" type="number" @keyup.enter.native="handleJoinCount" placeholder="请选择串并数" style="width: 200px" />
                </div>
              </div>
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
            @on-click="changeState"
            :value="filters.archived | format"
          >
            <TabPane :index="1" :label="`未提交(${totalCount.unArchived})`" name="0">
              <c-table
                :height="tableHeight"
                :columns="columns1"
                size="small"
                :data="tableData"
                @on-change-page="handlePageChange"
                :pagination="pagination"
                @on-sort-change="handleSortChange"
              ></c-table>
            </TabPane>
            <TabPane :index="2" :label="`已归档(${totalCount.archived})`" name="1">
              <c-table
                :height="tableHeight"
                :columns="columns2"
                size="small"
                :data="tableData"
                @on-change-page="handlePageChange"
                :pagination="pagination"
                @on-sort-change="handleSortChange"
              ></c-table>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
    <case-club-join ref="caseClubJoin" v-model="caseClubJoinShow" :case-id="currentCaseId"></case-club-join>
  </div>
</template>
<script>
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import CTable from "@/components/mapCollectionNext/components/ITable";
import Loading from "@/components/assembly/Loading";
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as tool from "@/tools/units.js";
import BatchImportCase from "./components/batchImportCase";
import appHeader from "@/components/assembly/AppHeader";
import CaseClubJoin from "./components/caseClubJoin";
export default {
  name: "CaseClubList",
  components: {
    appHeader,
    CTable,
    Loading,
    TreeFilter,
    BatchImportCase,
    CaseClubJoin
  },
  filters: {
    format(val) {
      return val.toString();
    }
  },
  data() {
    return {
      loadingBtn: false,
      statusList: {
        myNavModalShow: false,
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
        loadingTpmcShow: false
      },
      showAddDialog: false,
      loadingBtn: false,
      filters: {
        keyword: "", //关键字
        archived: 1, //案件状态（0-未提交,1-已归档）
        caseClass: [], //案件类别
        caseSource: "", //案件来源
        caseAddressPath: [], //案发地
        joinCount: null, //串并数
        caseHandleAddressPath: [], //案件办理地
        belongAreaDisplayName: "", //归属区划名称
        belongArea: "", //归属区划
        belongAreaId: "",
        deptPath: "",
        caseType: [], //案件类型
        caseState: "", //案件状态
        startTime: "", //立案时间
        endTime: "", //结案时间
        collectTimeStart: "", //采集时间
        collectTimeEnd: "", //采集时间
        orderString: null //串并数默认降序
      },
      caseAddress: {
        //案件发生地
        province: "",
        provinceCode: "",
        city: "",
        cityCode: "",
        county: "",
        countyCode: "",
        town: "",
        townCode: "",
        detailAddress: "",
        village: "",
        villageCode: "",
        addressCodeTierPath: "",
        addressTierPath: "",
        villageCodeDiaplayName: ""
      },
      caseHandleAddress: {
        //案件办理地
        province: "",
        provinceCode: "",
        city: "",
        cityCode: "",
        county: "",
        countyCode: "",
        town: "",
        townCode: "",
        detailAddress: "",
        village: "",
        villageCode: "",
        addressCodeTierPath: "",
        addressTierPath: "",
        villageCodeDiaplayName: ""
      },

      optionList: {
        caseTypeList: [], //案件类型
        caseClassList: [], //案件类别
        caseSourceList: [], //案件来源
        caseStateList: [], //案件状态
        proviceAddressList: [] //案件地址
      },

      tableHeight: 300,
      columns1: [],
      columns2: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      totalCount: {
        archived: 0, //已归档数
        unArchived: 0 //未提交数
      },
      tableData: [],
      archivesLoadingShow: false,
      tpTypes: {}, //图谱类型
      startTimeOption: {},
      endTimeOption: {},
      collectTimeStartOption: {},
      collectTimeEndOption: {},
      optionConfig: OPTIONS_LIST,
      cityTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      cityApis: comApis.GET_DEPT_TREE_INFO,
      bgColor: "rgba(255,255,255,.8)",
      downloadUrl: "",
      addressVisibleChange: false, // 级联选择器 地址弹窗显示状态
      caseClubJoinShow: false,
      currentCaseId: ""
    };
  },
  watch: {
    "filters.joinCount": {
      handler(val) {
        this.$nextTick(()=>{
          this.filters.joinCount = val < 0 ? 0 : this.filters.joinCount;
        })
      },
      immediate: true
    }
  },
  created() {
    let idNumber = this.$route.query.sfzhm;
    if (idNumber) {
      this.filters.keyword = idNumber;
      this.filters.archived = 1;
      this.handleSearch();
    }
  },
  computed: {},
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler());
  },
  mounted() {
    this.getOptionList();
    this.setColumns();
    this.init();
    this.timeOption();
    // this.onStartTimeChange(this.filters.startTime);
    // this.onEndTimeChange(this.filters.endTime);
    this.handleDownload();
  },
  methods: {
    init() {
      let data = this.setParams();
      this.getListData(data);
    },
    // 获取各个状态的总数
    getCounts(params) {
      apis.POST_CASE_LIST_COUNTS(params).then(res => {
        if (res.code == 200) {
          this.totalCount = res.data;
        }
      });
    },
    // 参数
    setParams() {
      return {
        keyword: this.filters.keyword || null,
        archived: this.filters.archived,
        category:
          this.filters.caseClass.length != 0 ? this.filters.caseClass : null,
        county: this.caseAddress.countyCode || null,
        dateFrom: this.filters.startTime
          ? this.$moment(this.filters.startTime).format("YYYY-MM-DD")
          : null,
        dateTo: this.filters.endTime
          ? this.$moment(this.filters.endTime).format("YYYY-MM-DD")
          : null,
        collectTimeStart: this.filters.collectTimeStart
          ? this.$moment(this.filters.collectTimeStart).format("YYYY-MM-DD")
          : null,
        collectTimeEnd: this.filters.collectTimeEnd
          ? this.$moment(this.filters.collectTimeEnd).format("YYYY-MM-DD")
          : null,
        deptId: this.filters.belongAreaId || null,
        deptTierPath: this.filters.deptPath || null,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
        source: this.filters.caseSource || null,
        state: this.filters.caseState || null,
        town: this.caseAddress.townCode || null,
        village: this.caseAddress.villageCode || null,
        type: this.filters.caseType.length != 0 ? this.filters.caseType : null,
        proceCounty: this.caseHandleAddress.countyCode || null,
        proceTown: this.caseHandleAddress.townCode || null,
        proceVillage: this.caseHandleAddress.villageCode || null,
        orderString: this.filters.orderString,
        joinCount: this.filters.joinCount
      };
    },
    // 刷新
    refreshData() {
      this.filters = {
        keyword: "", //关键字
        archived: 1, //案件状态（0-未提交,1-已归档）
        caseClass: [], //案件类别
        caseSource: "", //案件来源
        caseAddressPath: [], //案发地
        caseHandleAddressPath: [], //案件办理地
        belongAreaDisplayName: "", //归属区划名称
        belongArea: "", //归属区划
        belongAreaId: "",
        deptPath: "",
        caseType: [], //案件类型
        caseState: "", //案件状态
        startTime: "", //立案时间
        endTime: "", //结案时间
        collectTimeStart: "", //采集时间
        collectTimeEnd: "", //采集时间
        orderString: null //串并数默认降序
      };
      this.caseAddress = {};
      this.caseHandleAddress = {};
      this.pagination.pageIndex = 1;
      this.init();
    },
    hanldUpdate() {
      this.pagination.pageIndex = 1;
      this.init();
    },
    setColumns() {
      this.columns1 = [
        {
          title: "编号",
          key: "no",
          width: 230,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "类别",
          key: "category",
          width: 140,
          align: "center"
        },
        {
          title: "来源",
          key: "source",
          // sortable: true,
          width: 140,
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          width: 140,
          align: "center"
        },
        {
          title: "涉案(线)人数",
          key: "personCount",
          width: 150,
          align: "center"
        },
        {
          title: "采集单位",
          key: "deptName"
        },
        {
          title: "采集时间",
          key: "collectTime",
          sortable: "custom"
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
                  this.constantFunMap.FUN_BasicApps_CaseManager_Submit_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.handleSubmitCaseInfo(params.row)}
                  >
                    提交
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasFunAuth(
                  this.constantFunMap.FUN_BasicApps_CaseManager_Edit_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.handleEditCaseInfo(params.row)}
                  >
                    编辑
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasFunAuth(
                  this.constantFunMap.FUN_BasicApps_CaseManager_Delect_ID
                ) ? (
                  <i-button
                    size="small"
                    type="error"
                    on-click={$event => this.handleDelectCaseInfo(params.row)}
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
          title: "编号",
          key: "no",
          width: 210,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "类别",
          key: "category",
          width: 120,
          align: "center"
        },
        {
          title: "来源",
          key: "source",
          width: 120,
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          width: 120,
          align: "center"
        },
        {
          title: "涉案(线)人数",
          key: "personCount",
          width: 130,
          align: "center"
        },
        {
          title: "采集单位",
          key: "deptName"
        },
        {
          title: "采集时间",
          key: "collectTime",
          sortable: "custom"
        },
        {
          title: "采集人",
          key: "creater"
        },
        {
          title: "归档时间",
          key: "lastUpdateTime",
          sortable: "custom"
        },
        {
          title: "串并数",
          key: "joinCount",
          sortable: "custom",
          align: "center",
          render: (h, params) => {
            return (
              <span
                class="caseJoinSpan"
                on-click={$event => this.handleCaseClubModalEvent(params.row)}
              >
                {params.row.joinCount}
              </span>
            );
          }
        },
        {
          title: "操作",
          key: "state",
          width: "320px",
          align: "center",
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_BasicApps_CaseManager_View_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event =>
                      this.handleArchiveLookCaseInfo(params.row)
                    }
                  >
                    查看
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasFunAuth(
                  this.constantFunMap.FUN_BasicApps_CaseManager_Archive_Edit_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event =>
                      this.handleArchiveEditCaseInfo(params.row)
                    }
                  >
                    编辑
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasPageAuth(
                  this.constantPageMap.PAGE_BasicApps_CaseClubNanalysis_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.handleCaseClubJoin(params.row)}
                  >
                    串并分析
                  </i-button>
                ) : (
                  ""
                )}
                {this.hasPageAuth(this.constantPageMap.PAGE_BasicApps_CaseMapJoin_ID) ? 
                (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event => this.toCaseMapJoin(params.row)}
                  >
                  案线图串并
                  </i-button>
                ) : ("")}
              </span>
            );
          }
        }
      ];
    },
    changeState(name) {
      this.filters.archived = name;
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 获取列表数据
    getListData(data) {
      this.archivesLoadingShow = true;
      apis.POST_CASE_LIST(data).then(res => {
        this.archivesLoadingShow = false;
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.pagination.total = res.data.total;
          this.pagination.pageIndex = res.data.pageIndex;

          this.getCounts(data);
        }
      });
    },
    // 分页
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.init();
    },
    // 排序
    handleSortChange(column) {
      if (column.order == "normal") {
        this.filters.orderString = "";
      } else {
        this.filters.orderString = column.key + " " + column.order;
        this.pagination.pageIndex = 1;
        this.init();
      }
    },
    resizeHandler() {
      this.$nextTick(() => {
        let rightContent = this.$refs.rightContent;

        if (rightContent.clientHeight - 410 < 300) {
          this.tableHeight = 300;
        } else {
          this.tableHeight = rightContent.clientHeight - 410;
        }
      });
    },
    // 获取筛选条件字典项
    getOptionList() {
      //案件类别
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_CATEGORY,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_CATEGORY
        })
        .then(res => {
          this.optionList.caseClassList = res;
        });
      //案件类型
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_TYPE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_TYPE
        })
        .then(res => {
          this.optionList.caseTypeList = res;
        });
      //案件来源
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_SOURCE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_SOURCE
        })
        .then(res => {
          this.optionList.caseSourceList = res;
        });
      //案件状态
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_STATE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_STATE
        })
        .then(res => {
          this.optionList.caseStateList = res;
        });
      //获取省的数据
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.BELONG_PROVICE,
          apiFun: comApis.GET_AREA_TREE_BY_CODE,
          validParams: true,
          params: "Root"
        })
        .then(res => {
          if (res) {
            // 把新疆的数据放在最前面
            let tmpArr = res.childAreaList.filter(x => {
              return x.code != "650000000000";
            });
            let tmpCodeArr = res.childAreaList.filter(x => {
              return x.code == "650000000000";
            });
            let tmp_arr = tmpCodeArr.concat(tmpArr);
            let arr = tmp_arr.map(x => {
              return {
                id: x.id,
                code: x.code,
                value: x.code,
                name: x.name,
                label: x.displayName,
                parentId: x.parentId,
                parentCode: x.parentCode,
                longitude: x.longitude,
                latitude: x.latitude,
                loading: false,
                children: []
              };
            });
            this.optionList.proviceAddressList = arr;
          }
        });
    },
    timeOption() {
      let me = this;
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime > Date.now();
        }
      };
      this.startTimeOption = this.endTimeOption;
      this.collectTimeStartOption = this.endTimeOption;
      this.collectTimeEndOption = this.endTimeOption;
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
    // 起始时间变化
    oncollectTimeStartChange(startTime, type) {
      this.filters.collectTimeStart = startTime
        ? this.$moment(startTime).format("YYYY-MM-DD")
        : "";
      this.pagination.pageIndex = 1;
      this.init();
      this.collectTimeEndOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime) - 8.64e7 || endTime > Date.now();
        }
      };
    },
    // 结束时间变化
    oncollectTimeEndChange(endTime, type) {
      this.filters.collectTimeEnd = endTime
        ? this.$moment(endTime).format("YYYY-MM-DD")
        : "";
      this.pagination.pageIndex = 1;
      this.init();
      this.collectTimeStartOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now();
        }
      };
    },
    handleSearch() {
      if (this.filters.keyword) {
        this.pagination.pageIndex = 1;
        this.init();
      }
    },
    handleClearKeyword() {
      if (this.filters.keyword == "") {
        this.pagination.pageIndex = 1;
        this.init();
      }
    },
    // 选择归属区划信息
    handleCitySelectChange(cur) {
      this.filters.belongAreaId = cur.id;
      this.filters.belongArea = cur.title;
      this.filters.deptPath = cur.deptPath;
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.deptPath = "";
        this.filters.belongAreaId = "";
        this.pagination.pageIndex = 1;
        this.init();
      }
    },
    // 级联选择器 加载下一级'户籍地址'
    loadHukouData(item, callback) {
      if (!this.addressVisibleChange) return; //弹窗关闭状态' 跳过loadData方法 (否则影响显示结果)
      tool.loadAddressData(item, callback);
    },
    // 选择案发地地址的事件
    handleCaseAdressSelectChange(value, selectedData) {
      this.caseAddress = {};
      if (value.length == 0) {
        this.pagination.pageIndex = 1;
        this.init();
      }

      if (value.length == 1) {
        this.caseAddress.provinceCode =
          selectedData[selectedData.length - 1].code;
        this.caseAddress.province = selectedData[selectedData.length - 1].label;
      }
      if (value.length == 2) {
        this.caseAddress.cityCode = selectedData[selectedData.length - 1].code;
        this.caseAddress.city = selectedData[selectedData.length - 1].label;
      }
      if (value.length == 3) {
        this.caseAddress.countyCode =
          selectedData[selectedData.length - 1].code;
        this.caseAddress.county = selectedData[selectedData.length - 1].label;
      }
      if (value.length == 4) {
        this.caseAddress.townCode = selectedData[selectedData.length - 1].code;
        this.caseAddress.town = selectedData[selectedData.length - 1].label;
      }
      if (value.length == 5 || value.length == 4) {
        this.caseAddress.villageCode =
          selectedData[selectedData.length - 1].code;
        this.caseAddress.village = selectedData[selectedData.length - 1].label;
      }
      this.caseAddress.addressCodeTierPath = value.join("/");
      this.caseAddress.addressTierPath = selectedData
        .map(x => x.label)
        .join("/");
    },
    // 选择案件办理地地址的事件
    handleCaseHandleAdressSelectChange(value, selectedData) {
      this.caseHandleAddress = {};
      if (value.length == 0) {
        this.pagination.pageIndex = 1;
        this.init();
      }

      if (value.length == 1) {
        this.caseHandleAddress.provinceCode =
          selectedData[selectedData.length - 1].code;
        this.caseHandleAddress.province =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 2) {
        this.caseHandleAddress.cityCode =
          selectedData[selectedData.length - 1].code;
        this.caseHandleAddress.city =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 3) {
        this.caseHandleAddress.countyCode =
          selectedData[selectedData.length - 1].code;
        this.caseHandleAddress.county =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 4) {
        this.caseHandleAddress.townCode =
          selectedData[selectedData.length - 1].code;
        this.caseHandleAddress.town =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 5 || value.length == 4) {
        this.caseHandleAddress.villageCode =
          selectedData[selectedData.length - 1].code;
        this.caseHandleAddress.village =
          selectedData[selectedData.length - 1].label;
      }
      this.caseHandleAddress.addressCodeTierPath = value.join("/");
      this.caseHandleAddress.addressTierPath = selectedData
        .map(x => x.label)
        .join("/");
    },
    // 获取地址弹窗状态
    getVisibleChange(value) {
      this.addressVisibleChange = value;
      if (!value) {
        this.pagination.pageIndex = 1;
        this.init();
      }
    },
    // 采集模板下载
    handleDownload() {
      apis.GET_CASE_EXPOT_DOWNLOAD().then(res => {
        if (res.data) {
          this.downloadUrl = this.$config.fileDownloadPath + res.data.url;
        }
      });
    },
    // 批量导入案件
    handleShowBatchModal() {
      this.$refs.batchImportCase.showBatchModal();
    },
    // 新增案件线索
    handleToAddCasePage() {
      const { href } = this.$router.resolve({
        path: "/caseManager/addCaseInfo",
        query: {
          status: 0, // status: 0 -新增，1-编辑，2-查看
          state: 0 // state: 0-未提交, 1-归档
        }
      });
      window.open(href, "_blank");
    },
    // 提交案件信息
    handleSubmitCaseInfo(row) {
      let caseId = row.id;
      if (caseId) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "您确定要提交编号为" + row.no + "的案件线索吗？",
          onOk: () => {
            apis.POST_ARICHIVED_CASE_INFO([caseId]).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$Message.success("提交成功！");
                this.init();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {
            this.$Message.error("取消提交！");
          }
        });
      }
    },
    handleDelectCaseInfo(row) {
      let caseId = row.id;
      if (caseId) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "您确定要删除编号为" + row.no + "的案件线索吗？",
          onOk: () => {
            apis.Delete_CASE_INFO([caseId]).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$Message.success("删除成功！");
              } else {
                this.$Message.error(res.msg);
              }
              this.init();
            });
          },
          onCancel: () => {
            this.$Message.error("取消删除！");
          }
        });
      }
    },
    // 未提交编辑案件信息
    handleEditCaseInfo(row) {
      const { href } = this.$router.resolve({
        path: "/caseManager/addCaseInfo",
        query: {
          status: 1,
          state: 0,
          caseId: row.id
        }
      });
      window.open(href, "_blank");
    },
    // 未提交查看案件信息
    handleLookCaseInfo(row) {
      const { href } = this.$router.resolve({
        path: "/caseManager/addCaseInfo",
        query: {
          caseId: row.id,
          status: 2,
          state: 0
        }
      });
      window.open(href, "_blank");
    },
    // 已归档编辑案件信息
    handleArchiveEditCaseInfo(row) {
      const { href } = this.$router.resolve({
        path: "/caseManager/addCaseInfo",
        query: {
          status: 1,
          state: 1,
          caseId: row.id
        }
      });
      window.open(href, "_blank");
    },
    // 已归档传并分析按钮事件
    handleCaseClubJoin(row) {
      let params = row.id;
      tool.transferParameters(
        this,
        "/caseClubAnalysis",
        params,
        null,
        "caseIds"
      );
    },
    // 已归档传并分析按钮事件
    toCaseMapJoin(row) {
      let params = row.id;
      tool.transferParameters(
        this,
        "/caseMapJoin",
        params,
        null,
        "caseIds"
      );
    },
    // 已归档-打开串并分析弹出框事件
    handleCaseClubModalEvent(row) {
      this.caseClubJoinShow = true;
      this.currentCaseId = row.id;
    },
    // 已归档查看案件信息
    handleArchiveLookCaseInfo(row) {
      const { href } = this.$router.resolve({
        path: "/caseManager/addCaseInfo",
        query: {
          caseId: row.id,
          status: 2,
          state: 1
        }
      });
      window.open(href, "_blank");
    },
    // 串并数筛选
    handleJoinCount() {
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 案件类别筛选
    handleCaseClass() {
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 案件来源筛选
    handleCaseSource() {
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 案件类型筛选
    handleCaseType() {
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 案件状态筛选
    handleCaseState() {
      this.pagination.pageIndex = 1;
      this.init();
    },
    // 案件线索数据导出
    handleExportData() {
      let params = this.setParams();
      return apis.POST_CASE_EXPOT_DATA(params).then(res => {
        if (res.type == "application/json") {
          let reader = new FileReader();
          reader.readAsText(res, "utf-8");
          reader.onload = e => {
            let msg = JSON.parse(reader.result).msg;
            this.$Message.error(msg);
          };
        } else {
          let name = `案件线索数据-${this.$moment().format(
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
  }
};
</script>
<style lang="less" scoped>
@import "./css/style.less";
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
.actions-button {
  display: flex;
  /deep/.ivu-input-icon {
    right: 57px;
  }
}
.container .content .actions-search .search-row {
  padding: 5px 4px;
}
/deep/ .caseJoinSpan {
  cursor: pointer;
  color: #2d8cf0;
  text-decoration: underline;
}
</style>
