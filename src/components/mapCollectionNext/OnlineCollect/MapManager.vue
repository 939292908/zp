<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime: 2019-12-17 16:41:01
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">图谱管理</h2>
      <!-- 查询条件区域 -->
      <div class="action-search-input">
        <div>
          <i-input
            class="search-input search-control"
            icon="ios-search"
            style="width:350px;"
            v-model="filters.keywords"
            clearable
            placeholder="身份证、姓名、图谱名称、图谱描述"
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
        <span class="tpList">图谱列表</span>
        <div class="action-btns">
          <Button @click="refreshData">
            刷新
            <i class="iconfont icon-gengxin"></i>
          </Button>
          <Button
            @click="downloadBtnClick"
            :loading="loadingBtn"
            v-if="hasFunAuth(constantFunMap.FUN_Online_MapManager_Download_ID)"
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
              <div class="search-label">图谱标签:</div>
              <div class="search-control">
                <RadioGroup v-model="filters.tpTag" @on-change="handleTag">
                  <Radio
                    :key="index"
                    v-for="(item,index) in tpTags.mapConditionVOList"
                    :label="item.value"
                  >{{item.name}}</Radio>
                </RadioGroup>
              </div>
            </div>
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
              <div class="search-label">人员状态:</div>
              <div class="search-control">
                <CheckboxGroup v-model="filters.personStatu">
                  <Checkbox
                    :key="index"
                    v-for="(item,index) in personStatus"
                    :value="item.value"
                    :label="item.displayName"
                  ></Checkbox>
                </CheckboxGroup>
              </div>
            </div>-->
          </Col>
          <Col span="12">
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
        <!-- loading -->
        <Loading :bgColor="bgColor" v-model="archivesLoadingShow"></Loading>
        <!-- <div class="archives-loading-bg" v-show="archivesLoadingShow">
          <div class="archives-loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>-->
        <div class="action-list-heade">
          <p
            class="search-result"
          >本次搜索耗时{{fetchDetail.executeTime}}秒，搜索出{{fetchDetail.total}}条包含关键字信息的图谱</p>
          <div class="action-list-btns">
            <Button
              size="small"
              class="multitapBtn"
              @click="handleBatchMultitapModal"
              v-if="hasFunAuth(constantFunMap.FUN_Online_MapManager_BatchMultitap_ID)"
            >
              批量转接
              <i class="iconfont icon-retweet"></i>
            </Button>
            <batch-multitap-modal
              v-model="showBatchMultitapModal"
              @on-hide="showBatchMultitapModal=false"
            ></batch-multitap-modal>
            <Button
              size="small"
              class="multitapBtn"
              @click="handleCustomMultitapModal"
              v-if="hasFunAuth(constantFunMap.FUN_Online_MapManager_CustomMultitap_ID)"
            >
              自定义转接
              <i class="iconfont icon-retweet"></i>
            </Button>
            <custom-multitap-modal
              v-model="showCustomMultitapModal"
              @on-hide="showCustomMultitapModal=false"
            ></custom-multitap-modal>
            <!-- <Button type="primary" size="small">
              批量审核
              <i class="iconfont icon-yinzhang"></i>
            </Button>-->
          </div>
        </div>
        <i-table
          ref="table"
          stripe
          :height="tableHeight"
          :columns="columns"
          :data="fetchDetail.listData"
        >
          <template slot-scope="{ row, index }" slot="actionBtn">
            <i-button
              v-if="hasFunAuth(constantFunMap.FUN_Online_MapManager_View_ID)"
              size="small"
              type="primary"
              @click="handleView(row, index)"
            >查看</i-button>
            <i-button
              size="small"
              type="primary"
              @click="handleEdit(row, index)"
              :disabled="row.canEditor!=1"
              v-if="hasFunAuth(constantFunMap.FUN_Online_MapManager_Edit_ID) && filters.tpTag=='1'"
            >编辑</i-button>
            <i-button
              size="small"
              type="error"
              :disabled="row.canDel!=1"
              @click="handleDelete(row, index)"
              v-if="hasFunAuth(constantFunMap.FUN_Online_MapManager_Delete_ID)"
            >删除</i-button>
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
import * as tool from "@/tools/units.js";
import { DOWNLOAD_MAP_EXCEL } from "@/api/mapJoin/index";

export default {
  name: "MapManager",
  data() {
    return {
      loadingBtn: false,
      filters: {
        tpTag: "1",
        tpType: [],
        personStatu: [],
        keywords: "",
        startTime: "",
        endTime: "",
        belongAreaDisplayName: "",
        cityTreeData: null,
        belongArea: "", //归属区划
        belongAreaCode: "", //归属区划名称
        deptPath: ""
      },
      list: {
        deptList: []
      },
      tpTags: {}, //图谱标签
      tpTypes: {}, //图谱类型
      personStatus: [], //人员状态
      collectTime: {}, //采集时间

      visible: false,
      deptSearchResult: [],
      deptArrayList: [],
      tableHeight: 300,
      columns: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      startTimeOption: {},
      endTimeOption: {},

      fetchDetail: {
        executeTime: 0,
        total: 0,
        listData: []
      },
      optionConfig: OPTIONS_LIST,
      cityTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      cityApis: comApis.GET_DEPT_TREE_INFO,
      time: " 00:00:00",
      archivesLoadingShow: false,
      curSelectTp: null, //当前选择的图谱类型
      step: 2,
      showAddDialog: false,
      bgColor: "rgba(255,255,255,.8)",
      showBatchMultitapModal: false,
      showCustomMultitapModal: false
    };
  },
  components: {
    TreeFilter,
    Loading,
    BatchMultitapModal: () => import("../components/tpMultitap/BatchMultitap"),
    CustomMultitapModal: () => import("../components/tpMultitap/CustomMultitap")
  },
  computed: {},
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler());
  },
  created() {
    let query = this.$route.query;
    if (query.type) {
      this.filters.tpType = [query.type];
    }
    this.filters.tpTag = query.mapLabel == 0 ? query.mapLabel + "" : "1";
  },
  mounted() {
    this.onStartTimeChange(this.filters.startTime);
    this.onEndTimeChange(this.filters.endTime);
    this.init();
  },
  methods: {
    init() {
      this.setColumns();
      this.getMapSearchList();
      this.getPersonState();
      this.getMapManagerResult();
    },
    setColumns() {
      this.columns = [
        {
          title: "序号",
          key: "mapNumber",
          // width: "110px",
          // fixed: "left",
          width: 90,
          align: "center"
        },
        {
          title: "图谱类型",
          key: "typeLabel",
          width: "120px",
          align: "center"
        },
        {
          title: "图谱名称",
          key: "mapName",
          width: "250px"
        },
        {
          title: "成员数",
          key: "personCount",
          width: "110px",
          align: "center"
          // sortable: true
        },
        {
          title: "采集人",
          key: "creater"
          // width: "260px"
        },
        {
          title: "采集时间",
          key: "createTime"
          // sortable: true
          // width: 200
        },
        {
          title: "采集单位",
          key: "deptName"
          // width: 260
        },
        {
          title: "联系电话",
          key: "createPhone"
          // width: 130
        },
        {
          title: "操作",
          key: "state",
          width: "200px",
          align: "center",
          // fixed: "right",
          slot: "actionBtn"
        }
      ];
    },
    handleSearchText() {
      this.pagination.pageIndex = 1;
      this.getMapManagerResult();
    },
    handleView(row, idnex) {
      if (row.mapType == "9") {
        const { href } = this.$router.resolve({
          path: "/underAttack",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 1
          }
        });
        window.open(href, "_blank");
      } else if (row.mapType == "8") {
        const { href } = this.$router.resolve({
          path: "/exitAndEntry",
          query: {
            areaCode: row.villageCode,
            collectId: row.collectId,
            state: 1
          }
        });
        window.open(href, "_blank");
      } else {
        const { href } = this.$router.resolve({
          path: "/archivesjoin",
          query: {
            tpids: row.mapId,
            mc: "图谱管理"
          }
        });
        window.open(href, "_blank");
      }
    },
    // 编辑
    handleEdit(row, index) {
      let me = this;
      this.$Modal.confirm({
        title: "提示",
        content: "您确定要二次编辑该图谱吗？",
        onOk() {
          let data = {
            collectId: row.collectId || "",
            mapId: row.mapId || ""
          };
          apis.POST_BACKUP_MAPDATA(data).then(res => {
            if (res.code === 200) {
              let state = res.data.state;
              let collectId = res.data.collectId;
              let mapType = res.data.mapType;
              if (row.mapType == "9") {
                const { href } = me.$router.resolve({
                  path: "/CollectMarkerProfile",
                  query: {
                    areaCode: row.villageCode,
                    collectId: collectId,
                    state: state
                  }
                });
                window.open(href, "_blank");
              } else if (row.mapType == "8") {
                const { href } = me.$router.resolve({
                  path: "/collectMarkerExitEnter",
                  query: {
                    areaCode: row.villageCode,
                    collectId: collectId,
                    state: state
                  }
                });
                window.open(href, "_blank");
              } else {
                me.step = 2;
                me.curSelectTp = row.mapType;
                me.showAddDialog = true;
                const { href } = me.$router.resolve({
                  path: "/onlineCollect/addMap",
                  query: {
                    step: me.step,
                    collectId: collectId,
                    mapType: me.curSelectTp,
                    status: 1
                  }
                });
                window.open(href, "_blank");
              }
              me.pagination.pageIndex = 1;
              me.getMapManagerResult();
            } else {
              me.$Message.error(res.msg);
            }
          });
        },
        onCancel() {}
      });
    },
    // 删除
    handleDelete(row) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要删除该图谱吗？",
        onOk: () => {
          this.archivesLoadingShow = true;
          apis.Delete_MAP_MANAGER_TP({ mapIds: row.mapId }).then(res => {
            console.log(res, "ok");
            if (res.code === 200) {
              setTimeout(()=>{ // 延时刷新列表，不然列表少一条数据
                this.$Message.success("删除成功！");
                this.getMapManagerResult();
              },1000)
            } else {
              this.archivesLoadingShow = false;
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          this.$Message.error("取消删除！");
        }
      });
    },
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getMapManagerResult();
    },
    // 起始时间变化
    onStartTimeChange(startTime, type) {
      this.filters.startTime = startTime
        ? this.$moment(startTime).format("YYYY-MM-DD")
        : "";
      this.pagination.pageIndex = 1;
      this.getMapManagerResult();
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
      this.getMapManagerResult();
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now();
        }
      };
    },
    // 获取图谱管理搜索条件数据
    getMapSearchList() {
      apis.GET_MAP_MANAGE_LIST().then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.tpTags = res.data[0];
          this.tpTypes = res.data[1];
          this.collectTime = res.data[2];
        }
      });
    },
    // 获取人员状态数据
    getPersonState() {
      comApis.GET_OPTIONS_LIST("STATE_STRONG").then(res => {
        // console.log(res, "code");
        if (res.code === 200) {
          this.personStatus = res.data;
        }
      });
    },
    resizeHandler() {
      this.$nextTick(() => {
        let rightContent = this.$parent.$refs.rightContent;

        if (rightContent.clientHeight - 355 < 300) {
          this.tableHeight = 300;
        } else {
          this.tableHeight = rightContent.clientHeight - 355;
        }
      });
    },
    // 刷新选中项
    refreshData() {
      this.filters.tpTag = "1";
      this.filters.tpType = [];
      this.filters.keywords = "";
      this.filters.startTime = "";
      this.filters.endTime = "";
      this.filters.deptPath = "";
      this.pagination.pageIndex = 1;
      this.getMapManagerResult();
    },
    // 获取搜索结果
    getMapManagerResult() {
      let data = {
        deptPath: this.filters.deptPath,
        endTime: this.filters.endTime,
        flag: Number(this.filters.tpTag),
        keyWord: this.filters.keywords,
        mapType: this.filters.tpType.join(),
        pageIndex: this.pagination.pageIndex,
        pageSize: 10,
        startTime: this.filters.startTime
      };
      this.archivesLoadingShow = true;
      return apis.POST_MAP_MANAGER_RESULT(data).then(res => {
        if (res.code === 200) {
          this.archivesLoadingShow = false;
          let data = res.data.data;
          data.forEach((val, index) => {
            val.mapNumber = index + 1 + (this.pagination.pageIndex - 1) * 10;
          });
          this.fetchDetail.listData = data;
          this.fetchDetail.executeTime = res.data.executeTime;
          this.fetchDetail.total = res.data.total;
          this.pagination.total = res.data.total;
          this.pagination.pageIndex = res.data.pageIndex;
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
      this.pagination.pageIndex = 1;
      this.getMapManagerResult();
    },
    // 图谱标签选中事件
    handleTag() {
      this.pagination.pageIndex = 1;
      this.getMapManagerResult();
    },
    // 图谱类型标签选中事件
    handleTpType(val) {
      this.pagination.pageIndex = 1;
      this.getMapManagerResult();
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.filters.deptPath = "";
        this.pagination.pageIndex = 1;
        this.getMapManagerResult();
      }
    },
    // 清空关键词
    handleClear() {
      if (this.filters.keywords == "") {
        this.pagination.pageIndex = 1;
        this.getMapManagerResult();
      }
    },
    // 批量转接
    handleBatchMultitapModal() {
      this.showBatchMultitapModal = true;
    },
    // 自定义转接
    handleCustomMultitapModal() {
      this.showCustomMultitapModal = true;
    },
    // 数据导出 按钮click事件
    downloadBtnClick() {
      this.loadingBtn = true;
      this.handleExportData()
        .then(res => {
          this.loadingBtn = false;
        })
        .catch(error => {
          this.loadingBtn = false;
        });
    },
    // 数据导出
    handleExportData() {
      let params = {
        deptPath: this.filters.deptPath,
        endTime: this.filters.endTime,
        flag: Number(this.filters.tpTag),
        keyWord: this.filters.keywords,
        mapType: this.filters.tpType.join(),
        pageIndex: 1,
        pageSize: 10,
        startTime: this.filters.startTime
      };
      return DOWNLOAD_MAP_EXCEL(params).then(res => {
        let name = `图谱管理信息-${this.$moment().format("YYYY-MM-DD")}-${Math.ceil(Math.random() * 1000000000)}.xlsx`;
        // 响应结果乱码，设置blob请求头，接收；下面再把blob转一下
        tool.getExcelByBlob(res, name);
      });
    },
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
