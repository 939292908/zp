<template>
  <div class="wrapper">
    <div class="list">
      <div class="title">
        案件、线索、图谱关联列表
        <i class="iconfont icon-guanbi1" @click="handleClose"></i>
      </div>
      <div class="content">
        <div class="item-content">
          <div class="item-header">
            <div class="title" :key="index" v-for="(item,index) in data.nodeList">
              <!-- icon -->
              <span
                class="node-type"
                :style="nodeTypeStyle(item)"
              >{{item.nodeType == "QB_ZP_TP" ? item.properties.mapTypeName : item.nodeType}}</span>
              <!-- name -->
              <span
                @click="handleCaseClubManage(item)"
                class="node-name"
              >{{item.nodeType == "QB_ZP_TP" ? item.properties.mapName :item.properties.name}}</span>
            </div>
            <div class="title-desc">
              案件、线索、图谱相关人员列表:
              <span>{{data.matchList.length}}</span>
            </div>
          </div>
          <!-- 搜索 -->
          <div class="search">
            <i-input v-model="keyword" clearable placeholder="请输入关键字" @keyup.enter="handleSearch">
              <Icon type="ios-search" slot="suffix" @click="handleSearch" />
            </i-input>
            <i-button style="margin-left:10px;" size="small" type="primary" @click="handleSearch">搜索</i-button>
          </div>
          <!-- 列表 -->
          <div class="showMsg" v-if="showMsg">无搜索结果</div>
          <div
            :class="'item ' + (index == avtiveIndex ? 'active' : false)"
            :key="index"
            v-for="(item,index) in personList"
            @click="handleItemEvent(item, index)"
          >
            <person-card :key="index" :user="item"></person-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import personCard from "@/components/assembly/personCard";
import { transferParameters } from "@/tools/units.js";
export default {
  name: "zCaseClub",
  components: {
    personCard
  },
  data() {
    return {
      keyword: "",
      personList: [],
      copyObj: "",
      avtiveIndex: -1
    };
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          matchList: [
            // {
            //   properties: {
            //     picUrl: null,
            //     STATE: "",
            //     XM: "板合提亚尔·巴拉提z",
            //     SFZHM: "652900197801010128",
            //     HJD: "",
            //     riskLevel: {
            //       levelLabel: "",
            //       score: "",
            //       color: ""
            //     },
            //     caseClueStats: {
            //       name: "",
            //       count: ""
            //     },
            //     FIVE_ONE_PROPERTY: "",
            //     tplxs: {}
            //   }
            // }
          ]
        };
      }
    }
  },
  computed: {
    showMsg() {
      return this.personList.length == 0 
    }
  },
  methods: {
    // 搜索事件
    handleSearch() {
      if(!this.keyword || this.keyword == "") {
        this.personList = this.data.matchList;
      } else {
        this.personList = this.data.matchList.filter(item => item.properties.STATE && item.properties.STATE.indexOf(this.keyword) != -1)
      }
    },
    nodeTypeStyle(item) {
      const style = {};
      style.background =
        item.nodeType == "QB_ZP_TP"
          ? this.$config.topTagColors[item.properties.mapTypeName]
          : item.nodeType == "案件"
          ? "rgb(215, 67, 72)"
          : "rgb(66, 100, 215)";
      return style;
    },
    // 关闭事件
    handleClose() {
      this.$emit("on-close");
    },
    // 案件线索名称点击
    handleCaseClubManage(item) {
      if (item.nodeType == "QB_ZP_TP") {
        // 跳转图谱
        let hasAuth = this.hasPageAuth(
          this.constantPageMap.PAGE_D3_Show_ID
        );
        if (hasAuth && item.properties.dataRight) {
          var query = {
            tpids: item.properties.mapId,
            mc: '案线图串并'
          };
          let sfzhm = item.properties.idNumbers.join();
          transferParameters(this, "/archivesjoin", sfzhm, query);          
        }
      } else {
        // 跳转案件
        let hasAuth = this.hasPageAuth(
          this.constantPageMap.PAGE_BasicApps_CaseInfoShow_ID
        );
        if (hasAuth) {
          const { href } = this.$router.resolve({
            path: "/caseManager/addCaseInfo",
            query: {
              caseId: item.id,
              status: 2, // status: 0 -新增，1-编辑，2-查看
              state: 1 // state: 0-未提交, 1-归档
            }
          });
          window.open(href, "_blank");
        }
      }
    },
    handleItemEvent(item, index) {}
  },
  watch: {
    'data.matchList': {
      handler(val) {
        this.personList = val;
      },
      immediate: true
    },
  }
};
</script>
<style lang="less" scoped>
.search {
  display: inline-flex;
  align-items: center;
  margin-bottom: 6px;
  /deep/ .ivu-input {
    width: 198px;
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
  /deep/ button {
    height: 28px;
    border-radius: 1px;
    min-width: 48px;
    padding: 1px 10px 2px;
  }
}
.list {
  overflow: hidden;
  > .title {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #e3e3e3;
    padding: 0 12px;
    position: relative;
    text-align: center;
    > span {
      font-weight: bold;
    }
    > i {
      position: absolute;
      right: 15px;
      cursor: pointer;
    }
  }
  .content {
    overflow-y: auto;
    padding: 16px 12px;
    .showMsg {
      text-align: center;
      margin-top: 20px;
    }
    .item-content {
      width: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(227, 227, 227, 1);
      padding: 6px 6px 20px;
      .item-header {
        font-size: 14px;
        > .title {
          margin-bottom: 8px;
          .node-type {
            display: inline-block;
            padding: 3px 12px;
            background: #666666;
            color: #ffffff;
            border-radius: 2px;
            margin-right: 6px;
          }
          .node-name {
            font-weight: bold;
            color: rgb(16, 16, 16);
            cursor: pointer;
          }
        }
        > .title-desc {
          margin-bottom: 2px;
          color: #666666;
          > span {
            font-weight: bold;
            color: #0668c8;
            margin-left: 4px;
          }
        }
      }
    }
  }
  .person-card-wrapper {
    margin-bottom: 12px;
  }
}
</style>
