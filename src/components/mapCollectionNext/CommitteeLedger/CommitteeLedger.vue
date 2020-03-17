<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime : 2019-12-20 10:45:08
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">历年来村两委班子人员</h2>
      <!-- 查询条件区域 -->
      <div class="action-search-input">
        <div>
          <i-input
            class="search-input search-control"
            icon="ios-search"
            style="width:350px;"
            v-model="filters.keywords"
            clearable
            placeholder="人员姓名、身份证"
            @keyup.enter.native="handleSearchText"
            @on-change="handleClear"
          ></i-input>
          <Button type="primary" @click="handleSearchText">搜索</Button>
        </div>
      </div>
    </div>
    <!-- 管理内容 -->
    <div class="mapManagemen-content">
      <div class="con-header">
        <span class="tpList">人员列表</span>
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
            <div class="search-row">
              <div class="search-label">职位:</div>
              <div class="search-control">
                <Select
                  clearable
                  filterable
                  v-model="filters.position"
                  style="width:130px"
                  @on-change="handlePosition"
                >
                  <Option
                    v-for="item in optionList.positionList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.displayName }}</Option>
                </Select>
              </div>
            </div>
            <div class="search-row">
              <div class="search-label">五位一体:</div>
              <div class="search-control">
                <CheckboxGroup v-model="filters.fiveOneProperty" @on-change="handleFiveOneProperty">
                  <Checkbox
                    :key="index"
                    v-for="(item,index) in optionList.fiveOnePropertyList"
                    :label="item.value"
                  >{{item.displayName}}</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
            <div class="search-row">
              <div class="search-label">归属区划:</div>
              <div class="search-control">
                <tree-filter
                  :apiKey="optionConfig.CITY_AREA_TREE"
                  :apiParams="cityParams"
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
          <Col span="12">
            <div class="search-row">
              <div class="search-label">人员状态:</div>
              <div class="search-control">
                <CheckboxGroup v-model="filters.personState" @on-change="handleSate">
                  <Checkbox
                    :key="index"
                    v-for="(item,index) in optionList.personStateList"
                    :label="item.value"
                  >{{item.displayName}}</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
            <div class="search-row">
              <div class="search-label">在任时间:</div>
              <div class="search-control">
                <DatePicker
                  type="month"
                  placeholder="开始时间"
                  v-model="filters.startTime"
                  @on-change="onStartTimeChange"
                  :options="startTimeOption"
                ></DatePicker>
                <span>至</span>
                <DatePicker
                  type="month"
                  placeholder="结束时间"
                  v-model="filters.endTime"
                  @on-change="onEndTimeChange"
                  :options="endTimeOption"
                ></DatePicker>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div class="action-list">
        <!-- loading -->
        <Loading :bgColor="bgColor" v-model="archivesLoadingShow"></Loading>
        <div class="action-list-heade">
          <p
            class="search-result"
          >本次搜索耗时{{pagination.executeTime}}秒，搜索出{{pagination.total}}个包含关键字信息的人员</p>
        </div>
        <i-table ref="table" stripe :height="tableHeight" :columns="columns" :data="tableList">
          <template slot-scope="{ row, index }" slot="actionBtn">
            <i-button
              v-if="hasFunAuth(constantFunMap.FUN_Online_CommitteeLedger_View_ID)"
              size="small"
              type="primary"
              @click="handleView(row, index)"
            >查看</i-button>
          </template>
        </i-table>
      </div>
      <div class="result-table-page">
        <Page
          class="table-page-small"
          :total="pagination.total"
          size="small"
          :current="pagination.pageIndex"
          :page-size="pagination.pageSize"
          show-total
          show-elevator
          @on-change="handlePageChange"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import Loading from "@/components/assembly/Loading";
import * as tool from "@/tools/units";
export default {
  name: "CommitteeLedger",
  data() {
    return {
      filters: {
        position: "", //职位
        personState: [], //人员状态
        fiveOneProperty: [], //五位一体
        keywords: "",
        startTime: "", //任职开始时间
        endTime: "", //任职结束时间
        belongAreaDisplayName: "",
        belongArea: "", //归属区划
        belongAreaCode: "", //归属区划名称
        deptPath: "",
        typeValue: "1"
      },

      optionList: {
        positionList: [],
        personStateList: [],
        fiveOnePropertyList: []
      },
      tableHeight: 300,
      columns: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        executeTime: 0
      },
      tableList: [],
      startTimeOption: {},
      endTimeOption: {},
      optionConfig: OPTIONS_LIST,
      cityParams: { dataAuth: 1 },
      cityTreeProps: {
        children: "childAreaList",
        title: "displayName",
        id: "id"
      },
      cityApis: comApis.GET_AREA_TREE_INFO,
      archivesLoadingShow: false,
      bgColor: "rgba(255,255,255,.8)"
    };
  },
  components: {
    TreeFilter,
    Loading
  },
  computed: {},
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler());
  },
  mounted() {
    this.onStartTimeChange(this.filters.startTime);
    this.onEndTimeChange(this.filters.endTime);
    this.getOptionList();
    this.setColumns();
    this.init();
  },
  methods: {
    init(index) {
      this.pagination.pageIndex = index || 1;
      this.getListData();
    },
    getOptionList() {
      //五位一体
      tool.getFiveOneList(this).then(res => {
        this.optionList.fiveOnePropertyList = res;
      });
      //人员状态（大类）
      tool.getPersonStateList(this).then(res => {
        this.optionList.personStateList = res;
      });
      //职位
      tool.getPartyPositionList(this).then(res => {
        this.optionList.positionList = res;
      });
    },
    setColumns() {
      this.columns = [
        {
          title: "序号",
          key: "order",
          width: 80,
          align: "center"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 170
        },
        {
          title: "户籍地址",
          key: "domicile",
          width: 220
          // sortable: true
        },
        {
          title: "职位",
          key: "position",
          width: 120
        },
        {
          title: "任职时间",
          key: "workStartTime",
          width: 100,
          align: "center",
          render(h, params) {
            let time = "";
            if (params.row.workStartTime) {
              time =
                params.row.workStartTime.length > 4
                  ? params.row.workStartTime.substring(0, 4) +
                    "-" +
                    params.row.workStartTime.substring(4, 6)
                  : params.row.workStartTime;
            }
            return h("p", {}, time);
          }
        },
        {
          title: "离任时间",
          key: "workEndTime",
          width: 100,
          align: "center",
          render(h, params) {
            let time = "在任";
            if (params.row.workEndTime) {
              time =
                params.row.workEndTime.length > 4
                  ? params.row.workEndTime.substring(0, 4) +
                    "-" +
                    params.row.workEndTime.substring(4, 6)
                  : params.row.workEndTime;
            }
            return h("p", {}, time);
          }
        },
        {
          title: "分管工作",
          key: "work"
          // width: 130
        },
        {
          title: "归属村",
          key: "village"
          // width: 130
        },
        {
          title: "村委会/社区名称",
          key: "agencyName"
          // width: 130
        },
        {
          title: "操作",
          key: "state",
          width: "140px",
          align: "center",
          // fixed: "right",
          slot: "actionBtn"
        }
      ];
    },
    handleSearchText() {
      this.init();
    },
    handleView(row, idnex) {
      const { href } = this.$router.resolve({
        path: "/committeeLedger/personnelDetails",
        query: {
          id: row.id
        }
      });
      window.open(href, "_blank");
    },
    handlePageChange(pageIndex) {
      this.init(pageIndex);
    },
    // 起始时间变化
    onStartTimeChange(startTime, type) {
      this.init();
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime) - 8.64e7 || endTime > Date.now();
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(endTime, type) {
      this.init();
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now();
        }
      };
    },
    resizeHandler() {
      this.$nextTick(() => {
        let rightContent = this.$parent.$refs.rightContent;

        if (rightContent.clientHeight - 387 < 300) {
          this.tableHeight = 300;
        } else {
          this.tableHeight = rightContent.clientHeight - 387;
        }
      });
    },
    // 刷新选中项
    refreshData() {
      this.filters.position = ""; //职位
      this.filters.personState = []; //人员状态
      this.filters.fiveOneProperty = []; //五位一体
      this.filters.keywords = "";
      this.filters.startTime = ""; //任职开始时间
      this.filters.endTime = ""; //任职结束时间
      this.filters.belongAreaDisplayName = "";
      this.filters.belongArea = ""; //归属区划
      this.filters.belongAreaCode = ""; //归属区划名称
      this.filters.deptPath = "";
      this.init();
    },
    // 获取搜索结果
    getListData() {
      let params = {
        fiveOnePropertyValue: this.filters.fiveOneProperty.join(),
        keyWord: this.filters.keywords,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
        positionValue: this.filters.position,
        stateStrongValue: this.filters.personState.join(),
        typeValue: this.filters.typeValue,
        villageCode: this.filters.belongAreaCode,
        workStartTime: this.filters.startTime
          ? this.$moment(this.filters.startTime).format("YYYYMM")
          : "",
        workEndTime: this.filters.endTime
          ? this.$moment(this.filters.endTime).format("YYYYMM")
          : ""
      };
      this.archivesLoadingShow = true;
      apis.mosquePageInfo(params).then(res => {
        if (res.code === 200) {
          this.archivesLoadingShow = false;
          let data = res.data.data;
          data.forEach((val, index) => {
            val.order = index + 1 + (this.pagination.pageIndex - 1) * 10;
          });
          this.tableList = data;
          this.pagination.executeTime = res.data.executeTime;
          this.pagination.total = res.data.total;
        } else {
          this.archivesLoadingShow = false;
        }
      });
    },
    // 选择归属区划信息
    handleCitySelectChange(cur) {
      this.filters.belongAreaCode = cur.code;
      this.filters.belongArea = cur.title;
      this.filters.deptPath = cur.deptPath;
      this.init();
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.belongAreaCode = "";
        this.init();
      }
    },
    // 清空关键词
    handleClear() {
      if (this.filters.keywords == "") {
        this.init();
      }
    },
    // 职位
    handlePosition() {
      this.init();
    },
    // 五位一体
    handleFiveOneProperty() {
      this.init();
    },
    // 人员状态
    handleSate() {
      this.init();
    }
  }
};
</script>
<style lang="less" scoped>
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
.result-table-page {
  margin-top: 10px;
}
.search-result {
  font-size: 12px;
  color: #93989d;
  margin-bottom: 5px;
}
.action-btns {
  button {
    font-size: 13px;
    i {
      font-size: 14px;
    }
  }
}
.action-list {
  position: relative;
  /deep/.zptx-loading-mask {
    top: 77px !important;
    height: calc(100% - 77px) !important;
  }
}
.action-list-heade {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .action-list-btns {
    margin-bottom: 5px;
    i {
      font-size: 14px;
    }
    .multitapBtn {
      i {
        color: #0668c8;
      }
    }
  }
}
</style>
