<template>
  <div class="wrapper-header">
    <div class="actions left-actions">
      <div class="buttion-items">
        <i-button size="small" type="primary" @click.native="showIdNumberDialog">
          输入身份证号
          <i style="margin-left:8px;" class="iconfont icon-geren1"></i>
        </i-button>
        <div class="search">
          <span>案件、线索类型:</span>
          <CheckboxGroup style="margin-left:10px;" v-model="typeValue" @on-change="handleCaseType">
            <Checkbox
              :key="index"
              v-for="(item,index) in typeList"
              :label="item.id"
              :style="{
                'background': typeValue.indexOf(item.id) == -1 ? '#fff' : 'rgb(6, 104, 200)',
                'color': typeValue.indexOf(item.id) == -1 ? '#515a6e' : '#fff'}"
            >{{item.shortName}}</Checkbox>
          </CheckboxGroup>
        </div>
        <div class="search">
          <span>图谱类型：</span>
          <CheckboxGroup label="图谱类型：" v-model="mapType" @on-change="handleMapType">
            <Checkbox
              :key="index"
              v-for="(item,index) in mapTypeList"
              :label="item.id"
              :style="{
                'background': mapType.indexOf(item.id) == -1 ? '#fff' : $config.topTagColors[item.shortName],
                'color': mapType.indexOf(item.id) == -1 ? '#515a6e' : '#fff'}"
            >{{item.shortName}}({{showCount(item)||0}})</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <div class="search-items">
        
        <div class="search">
          <i-input v-model="keyword" clearable placeholder="请输入关键字" @keyup.enter="handleSearch">
            <Icon type="ios-search" slot="suffix" @click="handleSearch" />
          </i-input>
          <i-button style="margin-left:10px;" size="small" type="primary" @click="handleSearch">搜索</i-button>
          <span class="info">用时 {{titleInfo.time}} 秒，节点数：{{titleInfo.nodeCount}}，连线数：{{titleInfo.linkCount}}</span>
        </div>
      </div>
    </div>
    <div class="actions right-actions">
      <i-button
        v-if="hasPageAuth(constantPageMap.PAGE_Relation_Check_ID) && false"
        size="small"
        type="primary"
        @click="handleRelationCheck"
      >关系挖掘</i-button>
      <i-button
        v-if="hasPageAuth(constantPageMap.PAGE_Group_Analyse_ID) && false"
        size="small"
        type="primary"
        style="margin-left: 8px;"
        @click="handleGroupAnalysisCheck"
      >群体分析</i-button>
      <i-button
        size="small"
        style="margin-left:10px;"
        @click.native="handleIdNumberListEvent"
      >身份证列表 ({{data.idNumberTotals}})</i-button>
    </div>
  </div>
</template>
<script>
import { transferParameters } from "@/tools/units.js";
import * as apis from "@/api/collection/index.js";
export default {
  name: "WHeader",
  data() {
    return {
      // 案件类型value
      typeValue: ["案件", "线索"],
      // 案件类型list
      typeList: [
        {
          id: "案件",
          backgroundColor: "rgb(6, 104, 200)",
          color: "#fff",
          name: "案件",
          shortName: "案件"
        },
        {
          id: "线索",
          backgroundColor: "rgb(6, 104, 200)",
          color: "#fff",
          name: "线索",
          shortName: "线索"
        }
      ],
      mapType: [], // 图谱类型value
      mapTypeList: [], // 图谱类型list
      filtrationMapType: [], //图谱展示传递过来的图谱类型
      filterMap: [], //图谱筛选条件
      filterValues: [], //被筛选掉的条件
      keyword: ""
    };
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          idNumberTotals: 0
        };
      }
    },
    filterCount: {
      type: Object,
      default() {
        return {
          mapTypeCount: [],
        };
      }
    },
  },
  computed: {
    titleInfo() {
      let data = this.$parent.$parent.$refs.graph.tmpData;
      if (data) {
        let time = data.executeTime || 0;
        let nodeCount = data.nodes.length || 0;
        let linkCount = data.links.length || 0;
        return {time, nodeCount, linkCount}
      } else {
        return {time: 0, nodeCount: 0, linkCount: 0}
      }
    }
  },
  created() {
    // this.getInitMapType();
  },
  mounted() {
    this.getSearchData();
  },
  methods: {
    // 展示总数
    showCount(item) {
      if (this.filterCount.mapTypeCount.length) {
        return this.filterCount.mapTypeCount.find(ele => ele.type == item.id).count;
      }
    },
    // // 图谱展示传递过来的图谱类型
    // getInitMapType() {
    //   if (this.$route.query.query != undefined) {
    //     var data = JSON.parse(sessionStorage.getItem(this.$route.query.query));
    //     if (data == undefined) return;
    //     if (data.mapType != undefined) {
    //       this.filtrationMapType = data.mapType.split(",");
    //     }
    //     this.idNumberString = data.sfzhm;
    //     sessionStorage.removeItem(this.$route.query.query);
    //   }
    // },
    // 获取图谱类型
    getSearchData() {
      apis.GET_DRAW_TP_TYPE_LIST().then(res => {
        if (res.code == 200) {
          // 筛选列表
          this.mapTypeList = res.data.filter(x => x.id != 8 && x.id != 9); //排除 2个分布图
          // 默认选中
          this.mapType = this.mapTypeList
            .filter(x => this.filtrationMapType.indexOf(x.id) == -1)
            .map(x => x.id);
          // 未选中的
          this.filterValues = this.filtrationMapType;
          // 选中的
          this.filterMap = this.mapType;
          // 初始化 别的页面带身份证跳过来
          this.$parent.$parent.getIdNumberInit();
        } else {
          this.mapTypeList = [];
          this.mapType = [];
        }
      });
    },
    // 案件、线索筛选 click
    handleCaseType(val) {
      let params = {
        caseType: this.typeValue,
        mapType: this.mapType
      }
      // 传参
      this.$emit("getFilterData", params);
      this.$emit("on-type-filter", params);
    },
    // 图谱筛选 click
    handleMapType(val) {
      let params = {
        caseType: this.typeValue,
        mapType: this.mapType
      }
      // ??
      let filterValues = this.mapTypeList
        .filter(x => val.indexOf(x.id) == -1)
        .map(x => x.id);
      this.filterMap = val;
      this.filterValues = filterValues;
      // 传参
      this.$emit("getFilterData", params);
      this.$emit("on-type-filter", params);
    },
    // 关键字查询
    handleSearch() {
      this.$emit("on-text-filter", this.keyword);
    },
    // 关系挖掘事件
    handleRelationCheck() {
      let query = { sfzhm: this.$parent.$parent.idNumberString };
      let params = JSON.stringify(query);
      transferParameters(this, "/relationCheck", params);
    },
    // 群体分析事件
    handleGroupAnalysisCheck() {
      let query = { sfzhm: this.$parent.$parent.idNumberString };
      let params = JSON.stringify(query);
      transferParameters(this, "/groupAnalyse", params);
    },
    // 打开输入身份证号弹出框
    showIdNumberDialog() {
      this.$parent.$parent.searchModal = true;
    },
    // 身份列表按钮事件
    handleIdNumberListEvent() {
      this.$emit("on-list");
    }
  },
};
</script>
<style lang="less" scoped>
.wrapper-header {
  display: flex;
  height: 57px;
  padding: 0 14px;
  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  align-items: center;
  justify-content: space-between;
  .actions {
    display: inline-flex;
    .search {
      display: inline-flex;
      align-items: center;
      margin-left: 30px;
      position: relative;
      .info {
        position: absolute;
        left: 300px;
        width: 236px;
      }
      /deep/ .ivu-input {
        width: 225px;
      }
      /deep/ .ivu-checkbox-group {
        .ivu-checkbox-group-item {
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 2px 8px;
          font-size: 13px;
        }
        .ivu-checkbox {
          display: none;
        }
      }
    }
    &.left-actions {
      flex: auto;
      padding-right: 90px;
      justify-content: space-between;
    }
    &.right-actions {
      flex: 0 0 260px;
      justify-content: flex-end;
    }
    /deep/ button {
      height: 30px;
      border-radius: 1px;
      min-width: 60px;
      padding: 1px 10px 2px;
    }
    /deep/ .ivu-btn-primary {
      background: rgb(6, 104, 200);
    }
    // /deep/ .ivu-btn-default {
    //   height: 32px;
    //   border-radius: 1px;
    //   min-width: 60px;
    //   padding: 1px 10px 2px;
    // }
  }
}
</style>