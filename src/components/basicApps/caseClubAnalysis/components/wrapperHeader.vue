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
          <CheckboxGroup style="margin-left:10px;" v-model="typeValue" @on-change="handleMapType">
            <Checkbox
              :key="index"
              v-for="(item,index) in typeList"
              :label="item.id"
              :style="{'background':item.backgroundColor,'color':item.color}"
            >{{item.shortName}}</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <div class="search-items">
        
        <div class="search">
          <i-input v-model="keyword" clearable placeholder="请输入关键字" @keyup.enter="handleSearch">
            <Icon type="ios-search" slot="suffix" @click="handleSearch" />
          </i-input>
          <i-button style="margin-left:10px;" size="small" type="primary" @click="handleSearch">搜索</i-button>
        </div>
      </div>
    </div>
    <div class="actions right-actions">
      <i-button
        v-if="hasPageAuth(constantPageMap.PAGE_Relation_Check_ID)"
        size="small"
        type="primary"
        @click="handleRelationCheck"
      >关系挖掘</i-button>
      <i-button
        v-if="hasPageAuth(constantPageMap.PAGE_Group_Analyse_ID)"
        size="small"
        type="primary"
        style="margin-left: 8px;"
        @click="handleGroupAnalysisCheck"
      >群体分析</i-button>
      <!-- <i-button
        v-if="hasPageAuth(constantPageMap.PAGE_BasicApps_CaseMapJoin_ID)"
        size="small"
        type="primary"
        style="margin-left: 8px;"
        @click="handleToCaseMapJoin"
      >案线图串并</i-button> -->
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
export default {
  name: "WHeader",
  data() {
    return {
      typeValue: ["案件", "线索"],
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
    }
  },
  methods: {
    // 案件、线索类型筛选
    handleMapType(val) {
      this.typeList.map(x => {
        if (val.indexOf(x.id) == -1) {
          x.backgroundColor = "#ffffff";
          x.color = "#515a6e";
        } else {
          x.backgroundColor = "rgb(6, 104, 200)";
          x.color = "#ffffff";
        }
      });
      this.$emit("on-type-filter", val);
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
    // 案线图串并
    handleToCaseMapJoin() {
      let query = { sfzhm: this.$parent.$parent.idNumberString };
      let params = JSON.stringify(query);
      transferParameters(this, "/caseMapJoin", params);
    },
    // 打开输入身份证号弹出框
    showIdNumberDialog() {
      this.$parent.$parent.searchModal = true;
    },
    // 身份列表按钮事件
    handleIdNumberListEvent() {
      this.$emit("on-list");
    }
  }
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