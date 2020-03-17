<template>
  <z-container ref="container">
    <app-header slot="header" :items="statusList" title="案线图串并" :showSearch="false"></app-header>
    <div slot="content" class="wrapper">
      <!-- 头部按钮和查询区域 -->
      <w-header
        ref="wHeader"
        :data="searchResult"
        :filterCount="filterCount"
        @on-list="handleListEvent"
        @on-type-filter="handleTypeFilter"
        @on-text-filter="handleKeywordFilter"
        @getFilterData="getFilterData"
      ></w-header>
      <!-- 中间图形展示区域 -->
      <z-graph ref="graph" :filterData="filterData" @getMapTypeCount="getMapTypeCount"></z-graph>
      <!-- 右侧身份列表展示区域 -->
      <w-right
        ref="wRight"
        v-model="drawerVisible"
        :node-type="currentNodeType"
        :data="searchResult"
        @on-item-click="handleIdNumberClick"
      ></w-right>
      <!-- loading -->
      <loading color="white" v-model="graphLoading"></loading>
      <!-- 模态框身份证搜索-->
      <Modal
        v-model="searchModal"
        :mask-closable="false"
        :loading="loading"
        width="80%"
        title="请输入身份证号"
        class-name="search-modal"
      >
        <Input
          class="searchInput"
          v-model="idNumberString"
          @on-blur="handleAreaBlur"
          type="textarea"
          :placeholder="placeholderInfo"
        />
        <span class="searchSpan">
          已输入
          <i>{{idAmount}}</i> 个身份证号
        </span>
        <div slot="footer" class="modalFooter">
          <i-button size="large" class="clear" @click="handleClear()">
            <i class="iconfont icon-qingkong"></i>清空
          </i-button>
          <i-button type="info" size="large" class="search" @click="handleOk()">查询</i-button>
          <i-button size="large" class="cancel" @click="handleCancel()">取消</i-button>
        </div>
      </Modal>
    </div>
  </z-container>
</template>
<script>
import appHeader from "@/components/assembly/AppHeader";
import zContainer from "@/components/assembly/Container";
import zGraph from "./components/wrapperContent";
import wHeader from "./components/wrapperHeader";
import wRight from "./components/wrapperRight/index";
import * as apis from "@/api/collection/index.js";
import Loading from "@/components/assembly/Loading";
export default {
  name: "CaseClubAnalysis",
  components: {
    appHeader,
    zContainer,
    zGraph,
    wHeader,
    wRight,
    Loading
  },
  data() {
    return {
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
      // 总数
      filterCount: {
        mapTypeCount: [],
        caseTypeCount: []
      },
      // 筛选条件
      filterData: {},
      graphLoading: false,
      drawerVisible: false,
      currentNodeType: "l", //当前选中的节点
      loading: false,
      searchModal: true,
      idAmount: 0,
      idNumberString: "",
      // idNumberString:
      //   "652911111111111110,320826198604246878,3208261986022469571,320826198601246325,652901197001011112,320826198603246615,320826198603246618,3208261986032469871",
      idNumberResult: [],
      placeholderInfo:
        "身份证输入间隔支持：回车、逗号和分号。\n\n示例一：\n\n652801196312XXXXXX\n652801196312XXXXXX\n652801196312XXXXXX\n\n示例二：\n652801196312XXXXXX，652801196312XXXXXX，652801196312XXXXXX",
      searchResult: {
        idNumberTotals: 0,
        idNumberList: [],
        matchList: [],
        unMatchList: [],
        nodeList: []
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getFilterData(data) {
      this.filterData = data;
    },
    getMapTypeCount(data) {
      this.filterCount.mapTypeCount = data;
    },
    init() {
      // 如果参数中存在案件线索的ID，则新型获取案件线索中的身份证列表信息，进行展示
      if (this.$route.query.caseIds) {
        let caseIds = sessionStorage.getItem(this.$route.query.caseIds);
        sessionStorage.removeItem(this.$route.query.caseIds);
        this.getIdNumbersById(caseIds);
      } else {
        this.searchModal = true;
      }
    },
    // 有页面跳转过来 初始化（在头部组件加载完毕调用了）
    getIdNumberInit(){
      if (this.$route.query.query != undefined) {
        var data = JSON.parse(sessionStorage.getItem(this.$route.query.query));
        if (data == undefined) return;
        this.idNumberString = data.sfzhm;
        sessionStorage.removeItem(this.$route.query.query);
        this.handleOk();
      }
    },
    // 案件线索类型筛选
    handleTypeFilter(val) {
      this.$refs.graph.typeFilter(val);
      this.drawerVisible = false;
    },
    // 关键字筛选
    handleKeywordFilter(val) {
      this.$refs.graph.keywordFilter(val);
      this.drawerVisible = false;
    },
    // 身份列表按钮点击事件
    handleListEvent() {
      if (this.currentNodeType == "p") {
        this.drawerVisible = !this.drawerVisible;
      } else {
        this.drawerVisible = true;
      }
      this.currentNodeType = "p";
      let response = JSON.parse(
        JSON.stringify(this.$refs.graph.graphResponseData)
      );
      this.searchResult.matchList = response.matchedUserInfo;
      this.searchResult.unMatchList = response.unMatchIds;
    },
    // 获取案件线索中人员身份账号
    getIdNumbersById(caseIds) {
      apis.GET_IDNUMBERS_BY_CASEID(caseIds).then(res => {
        if (res.code == 200) {
          this.idNumberString = res.data.join(",");
          this.searchModal = true;
          this.handleOk();
        }
      });
    },
    // Textarea鼠标失去焦点事件
    handleAreaBlur() {
      var string = this.idNumberString;
      var newArray = [];
      this.idNumberResult = [];
      string = string.replace(/[,，;；\n\r]/g, ",");
      string = string.replace(/\s/g, "");
      newArray = string.split(",");
      newArray = Array.from(new Set(newArray));
      newArray.map(arr => {
        if (arr !== "" && arr != undefined) {
          this.idNumberResult.push(arr);
        }
      });
      this.idAmount = this.idNumberResult.length;
    },
    // 弹出框-身份证-清空事件
    handleClear() {
      this.idNumberString = "";
    },
    // 弹出框-确定事件
    handleOk() {
      this.handleAreaBlur();
      if (this.idNumberResult.length <= 0) return;
      // 调用画布数据
      this.graphLoading = true;
      this.filterData = {
        caseType: this.$refs.wHeader.typeValue,
        mapType: this.$refs.wHeader.mapType
      }
      console.log(this.filterData);
      this.drawerVisible = false;
      this.$refs.graph.initRender();
      this.$refs.graph.initMapData(this.idNumberResult);
    },
    // 弹出框-取消事件
    handleCancel() {
      this.searchModal = false;
    },
    // 身份证列表点击查询图形高亮事件
    handleIdNumberClick(item, index) {
      this.$refs.graph.keywordFilter(item.idNumber);
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
/deep/ .search-modal {
  .ivu-modal {
    height: 80%;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        height: calc(100% - 114px);
        .searchInput {
          width: 100%;
          height: calc(100% - 12px);
          margin-bottom: 2px;
          textarea {
            width: 100%;
            height: 100%;
            line-height: 20px;
            border-radius: 4px;
            color: #333333;
            font-size: 14px;
            -webkit-box-shadow: 0px 0px 0px 0px #201d1d;
            box-shadow: 0px 0px 0px 0px #201d1d;
            border: 1px solid #cccccc;
            padding: 8px;
            resize: none;
          }
        }
        .searchSpan {
          font-size: 12px;
        }
      }
      .modalFooter {
        button.clear {
          float: left;
          .iconfont {
            color: #0668c8;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>