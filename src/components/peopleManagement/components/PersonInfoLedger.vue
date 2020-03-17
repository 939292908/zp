<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime : 2019-12-26 18:33:27
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="right-content-box">
    <div class="mapManagemen-header">
      <h2 class="map-title">人员基础信息管理</h2>
      <!-- 查询条件区域 -->
      <div class="action-search-input">
        <div>
          <i-input
            class="search-input search-control"
            icon="ios-search"
            style="width:350px;"
            v-model="filters.keywords"
            clearable
            placeholder="人员姓名，身份证号"
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
        <span class="tpList" id="tpList" @click="hanldUpdate">人员列表</span>
        <div class="action-btns">
          <Button @click="refreshData">
            刷新
            <i class="iconfont icon-gengxin"></i>
          </Button>
          <Button
            type="primary"
            @click="addNewPersonInfo"
            v-if="hasFunAuth(constantFunMap.FUN_MapAduit_PersonDetailInfo_Add_ID)"
          >
            新增
            <i class="iconfont icon-jiahao"></i>
          </Button>
          <Button
            @click="downloadBtnClick"
            :loading="loadingBtn"
            v-if="hasFunAuth(constantFunMap.FUN_MapAduit_PersonDetailInfo_EXPOT_ID)"
          >
            <span v-if="!loadingBtn">数据导出</span>
            <span v-else>正在导出</span>
            <i class="iconfont icon-shangchuan icon-daochu"></i>
          </Button>
          <Button
            type="primary"
            @click="handleBatchImport"
            v-if="hasFunAuth(constantFunMap.FUN_MapAduit_PersonDetailInfo_Import_ID)"
          >
            批量导入
            <i class="iconfont icon-daoru"></i>
          </Button>
        </div>
      </div>
      <!-- 查询条件区域 -->
      <div class="actions-search">
        <div class="search-row">
          <div class="search-label">五位一体:</div>
          <div class="search-control">
            <CheckboxGroup v-model="filters.fiveOneProperty" @on-change="handlefiveOneProperty">
              <Checkbox
                :key="index"
                v-for="(item,index) in fiveOnePropertyList"
                :label="item.value"
              >{{item.displayName}}</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div class="search-row">
          <div class="search-label">人员状态:</div>
          <div class="search-control">
            <CheckboxGroup v-model="filters.personStatu" @on-change="handlepersonStatu">
              <Checkbox
                :key="index"
                v-for="(item,index) in personStatus"
                :label="item.value"
              >{{item.displayName}}</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div class="search-row">
          <div class="search-label">人员标签:</div>
          <div class="search-control">
            <Select
              class="personTags"
              style="width:400px"
              v-model="filters.personTags"
              multiple
              filterable
              placeholder="请选择要筛选的人员标签(支持多选)"
              @on-change="handlepersonTags"
            >
              <Option
                :title="item.displayName"
                v-for="(item,index) in personTagList"
                :value="item.value"
                :key="index"
              >{{ item.displayName }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <div class="action-list">
        <!-- loading -->
        <Loading :bgColor="bgColor" v-model="archivesLoadingShow"></Loading>
        <p
          class="search-result"
        >本次搜索耗时{{fetchDetail.executeTime}}秒，搜索出{{fetchDetail.total}}条包含关键字信息的人员</p>
        <i-table
          ref="table"
          stripe
          :height="tableHeight"
          :columns="columns"
          :data="fetchDetail.listData"
        >
          <!-- 查看slot -->
          <template slot-scope="{ row, index }" slot="actionBtn">
            <i-button size="small" type="primary" @click="handleView(row, index)">查看</i-button>
          </template>

          <!-- 状态下拉slot -->
          <template slot-scope="{ row }" slot="peopleState">
            <!-- @on-change="peopleStateChange" -->
            <!-- @on-visible-change="peopleStateChange" -->
            <Cascader
              :change-on-select="changeOnSelect"
              v-model="row.stateStrongArr"
              :data="peopleStateList"
              :load-data="loadData"
              :clearable="false"
              @click.native="peopleStateClick(row)"
              @on-change="peopleStateChange"
            ></Cascader>
          </template>

          <!-- 人员简介slot -->
          <template slot="intro" slot-scope="{ row, index }">
            <Tooltip
              max-width="330"
              :content="row.intro"
              theme="light"
              :class="{hiddenTooltip : row.intro ==null}"
            >
              <div>
                <span class="ivu-table-cell-tooltip-content">{{row.intro}}</span>
              </div>
            </Tooltip>
          </template>

          <!-- 风险等级slot -->
          <template slot="riskLevel" slot-scope="{ row }">
            <div class="riskLevel" :style="{background:row.riskLevel.color}">
              <span>{{row.riskLevel.levelLabel}} :</span>
              <span>{{row.riskLevel.score}}</span>
            </div>
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
    <!-- <person-info-modal v-model="showModal" @changeModal="hanldShowModal" :idNumber="idNumber"></person-info-modal> -->
    <batch-import-personInfo ref="batchImportPersonInfo"></batch-import-personInfo>
  </div>
</template>
<script>
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import PersonInfoModal from "./assembly/personInfoForm";
import * as tool from "../../../tools/units.js";
import Loading from "@/components/assembly/Loading";
import { POST_PERSONINFO_EXPOT_DATA } from "@/api/mapJoin/index";
import BatchImportPersonInfo from "./assembly/batchImportPersonInfo";
export default {
  name: "PersonInfoLedger",
  data() {
    return {
      loadingBtn: false,
      peopleStateList: [], // 人员状态列表
      tempPeopleItemData: {}, // 点击人员状态 保存人信息
      tempPeopleStateStr: "", // 点击人员状态 保存状态
      changeOnSelect: true, // 人员状态 change-on-select
      filters: {
        fiveOneProperty: [],
        personStatu: [],
        personTags: [],
        keywords: ""
      },
      list: {
        deptList: []
      },
      personStatus: [], //人员状态
      personTagList: [], //人员标签
      fiveOnePropertyList: [], //五位一体
      visible: false,
      tableHeight: 300,
      columns: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      fetchDetail: {
        executeTime: 0,
        total: 0,
        listData: []
      },
      archivesLoadingShow: false,
      bgColor: "rgba(255,255,255,.8)"
    };
  },
  components: {
    TreeFilter,
    PersonInfoModal,
    Loading,
    BatchImportPersonInfo
  },
  computed: {},
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler());
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setColumns();
      this.getSearchData();
      this.getPersonStateAllList().then(res => {
        this.getPersonInfoResult();
      });
    },
    setColumns() {
      this.columns = [
        {
          title: "序号",
          key: "mapNumber",
          width: 110,
          align: "center"
        },
        {
          title: "人员姓名",
          key: "name",
          width: "180px"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: "180px"
        },
        {
          title: "户籍地址",
          key: "domicil"
          // width: "260px"
          // sortable: true
        },
        {
          title: "人员状态",
          key: "stateStrong",
          width: 140,
          slot: "peopleState"
        },
        {
          title: "五位一体",
          key: "fiveOneProperty",
          width: 110,
          align: "center"
        },
        {
          title: "人员简介",
          key: "intro",
          slot: "intro"
          // width: 210
        },
        {
          title: "风险等级",
          key: "riskLevel",
          width: 110,
          align: "center",
          slot: "riskLevel"
        },
        {
          title: "操作",
          key: "state",
          width: "90px",
          align: "center",
          // fixed: "right",
          slot: "actionBtn"
        }
      ];
    },
    handleSearchText() {
      this.pagination.pageIndex = 1;
      this.getPersonInfoResult();
    },
    // 人员状态所有字典项
    getPersonStateAllList() {
      //人员状态（大类 + 细类）
      return tool.getPersonStateAllList(this).then(res => {
        if (res.code == 200) {
          this.peopleStateList = res.data;
        }
      });
    },
    // 根据codeArr获取 二级人员状态
    // setPersonStateChildByValue(codeArr, peopleStateList,item) {
    //   if (codeArr.length && peopleStateList.length) {
    //     tool.setPersonStateChildByValue(codeArr, peopleStateList).then((res)=>{
    //       console.log(this.peopleStateList);
    //         // this.changeOnSelect = true;
    //     });
    //   }
    // },
    // 加载下一级'人员状态' 级联选择器
    loadData(item, callback) {
      tool.loadPersonStateData(item, callback);
    },
    // 人员状态click事件
    peopleStateClick(row) {
      console.log(row);
      this.tempPeopleItemData = row; // 人员信息
      this.tempPeopleStateStr = this.tempPeopleItemData.stateStrongArr.join(
        ","
      ); // 人员状态
    },
    // // 人员状态下拉框事件
    // peopleStateChange(flag) {
    //   // this.changeOnSelect = flag;
    //   if (!flag && this.tempPeopleStateStr != this.tempPeopleItemData.stateStrongArr.join(',') ) { // 关闭 并且 状态前后有变化
    //     debugger
    // 人员状态下拉框事件
    peopleStateChange(value, data) {
      console.log(value, data, this.tempPeopleItemData);
      if (this.tempPeopleStateStr != value.join(",")) {
        // 状态前后有变化
        let itemPeople = this.tempPeopleItemData; // 当前编辑的人
        let idNumber = itemPeople.idNumber; // 1、身份证
        let stateStrongValue = value[0]; // 2、大类value
        let stateDetailValue = value[1]; // 3、细类value
        let stateStrong = data[0] ? data[0].displayName : ""; // 4、大类displayName
        let stateDetail = data[1] ? data[1].displayName : ""; // 5、细类displayName

        // let stateStrongItemData = this.peopleStateList.find(item => item.value == stateStrongValue);
        // let stateDetailItemData = stateStrongItemData ? stateStrongItemData.children.find(item => item.value == stateDetailValue) : {};
        // let stateStrong = stateStrongItemData ? stateStrongItemData.displayName : ""; // 4、大类displayName
        // let stateDetail = stateDetailItemData ? stateDetailItemData.displayName : ""; // 5、细类displayName
        // 调更新接口
        let params = {
          idNumber,
          stateStrong,
          stateStrongValue,
          stateDetail,
          stateDetailValue
        };
        apis.UPDATE_PERSON_STATE(params).then(res => {
          if (res.code == 200) {
            this.$Message.info("编辑成功");
          } else {
            this.$Message.error("编辑失败");
          }
        });
      }
    },
    // 查看
    handleView(row, idnex) {
      const { href } = this.$router.resolve({
        path: "/peopleManagement/personInfoDetails",
        query: {
          idNumber: row.idNumber
        }
      });
      window.open(href, "_blank");
    },
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getPersonInfoResult();
    },
    // 获取搜索条件数据
    getSearchData() {
      comApis.GET_OPTIONS_LIST("STATE_STRONG").then(res => {
        if (res.code === 200) {
          this.personStatus = res.data;
        }
      });
      comApis.GET_OPTIONS_LIST("FIVE_ONE_PROPERTY").then(res => {
        if (res.code === 200) {
          this.fiveOnePropertyList = res.data;
        }
      });
      //标签
      tool.getPersonTagList(this).then(res => {
        this.personTagList = res;
      });
    },
    resizeHandler() {
      this.$nextTick(() => {
        let rightContent = this.$parent.$refs.rightContent;

        if (rightContent.clientHeight - 394 < 300) {
          this.tableHeight = 300;
        } else {
          this.tableHeight = rightContent.clientHeight - 394;
        }
      });
    },
    // 刷新选中项
    refreshData() {
      this.filters.fiveOneProperty = [];
      this.filters.personTags = [];
      this.filters.personStatu = [];
      this.filters.keywords = "";
      this.pagination.pageIndex = 1;
      this.getPersonInfoResult();
    },
    setParams() {
      return {
        fiveOnePropertyValue: this.filters.fiveOneProperty.join(),
        keyWord: this.filters.keywords,
        pageIndex: this.pagination.pageIndex,
        pageSize: 10,
        personTagValue: this.filters.personTags.join(),
        stateStrongValue: this.filters.personStatu.join()
      };
    },
    // 获取搜索结果
    getPersonInfoResult() {
      let params = this.setParams();
      this.archivesLoadingShow = true;
      apis.POST_PERSON_INFO_RESULT(params).then(res => {
        if (res.code === 200) {
          this.archivesLoadingShow = false;
          let data = res.data.data;
          data.forEach((val, index) => {
            val.mapNumber = index + 1 + (this.pagination.pageIndex - 1) * 10;
          });
          // 人员状态表单的值 需要数组类型
          let newData = data.map(item => {
            item.stateStrongArr = [];
            if (item.stateStrongValue)
              item.stateStrongArr.push(item.stateStrongValue);
            if (item.stateDetailValue)
              item.stateStrongArr.push(item.stateDetailValue);
            // item.stateStrongArr = ["3" ,"1"];
            // this.changeOnSelect = !item.stateStrongArr.length;
            // this.setPersonStateChildByValue(item.stateStrongArr, this.peopleStateList,item);
            return item;
          });
          this.fetchDetail.listData = newData;
          this.fetchDetail.executeTime = res.data.executeTime;
          this.fetchDetail.total = res.data.total;
          this.pagination.total = res.data.total;
          this.pagination.pageIndex = res.data.pageIndex;
        } else {
          this.archivesLoadingShow = false;
        }
      });
    },
    // 清空关键词
    handleClear() {
      if (this.filters.keywords == "") {
        this.pagination.pageIndex = 1;
        this.getPersonInfoResult();
      }
    },
    // 五位一体筛选
    handlefiveOneProperty(val) {
      this.pagination.pageIndex = 1;
      this.getPersonInfoResult();
    },
    // 人员状态筛选
    handlepersonStatu(val) {
      this.pagination.pageIndex = 1;
      this.getPersonInfoResult();
    },
    // 人员标签筛选
    handlepersonTags(val) {
      this.pagination.pageIndex = 1;
      this.getPersonInfoResult();
    },
    hanldUpdate() {
      this.getPersonInfoResult();
    },
    addNewPersonInfo() {
      const { href } = this.$router.resolve({
        path: "/peopleManagement/newPersonInfo"
      });
      window.open(href, "_blank");
    },
    // 统计看板数据导出
    handleExportData() {
      let params = this.setParams();
      return POST_PERSONINFO_EXPOT_DATA(params).then(res => {
        if (res.type == "application/json") {
          let reader = new FileReader();
          reader.readAsText(res, "utf-8");
          reader.onload = e => {
            let msg = JSON.parse(reader.result).msg;
            this.$Message.error(msg);
          };
        } else {
          let name = `人员基础信息-${this.$moment().format(
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
    },
    // 批量导入
    handleBatchImport() {
      this.$refs.batchImportPersonInfo.showBatchModal();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.hiddenTooltip .ivu-tooltip-inner {
  display: none;
}
/deep/.ivu-tooltip {
  width: 100%;
}
/deep/.ivu-tooltip-inner {
  max-height: 280px;
  overflow-y: auto;
  min-width: 0;
}
/deep/.ivu-checkbox-group-item {
  font-size: inherit;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0 5px;
  font-size: 13px;
}
/deep/.ivu-checkbox {
  display: none;
}
/deep/label.ivu-checkbox-wrapper.ivu-checkbox-group-item.ivu-checkbox-wrapper-checked.ivu-checkbox-default {
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
    top: 23px !important;
    height: calc(100% - 23px) !important;
  }
}
/deep/.ivu-checkbox + span {
  margin-right: 0;
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
.riskLevel {
  padding: 2px 8px;
  width: 66px;
  margin: 0 auto;
  color: #fff;
  border-radius: 2px;
}
</style>
