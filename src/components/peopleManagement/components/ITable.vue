<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime: 2019-11-06 14:04:45
 * @LastEditors: Please set LastEditors
 -->
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <template>
  <div class="custom-table">
    <!-- 步骤条 -->
    <i-table ref="table" stripe :height="calcHeight" :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="steps">
        <div class="steps">
          <div class="step" v-for="(item,index) in row.statusList" :key="index">
            <span
              class="step-icon"
              :style="{backgroundColor: statusColor[item.state]}"
            >{{item.levelName}}</span>
            <span class="step-status" :style="{color: statusColor[item.state]}">{{item.stateValue}}</span>
            <span class="step-line" :style="{backgroundColor: statusColor[item.state]}"></span>
          </div>
        </div>
      </template>
      <template slot="mapDescription" slot-scope="{ row, index }">
        <Tooltip
          max-width="330"
          :content="row.mapDescription"
          theme="light"
          :class="{hiddenTooltip : row.mapDescription ==null}"
        >
          <div>
            <span class="ivu-table-cell-tooltip-content">{{row.mapDescription}}</span>
          </div>
        </Tooltip>
      </template>
      <!-- 人员简介slot -->
      <template slot="personIntro" slot-scope="{ row, index }">
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
    </i-table>
    <Page
      class="custom-table-page"
      :total="getPage.total"
      :size="size"
      :current="getPage.pageIndex"
      :page-size="getPage.pageSize"
      :show-total="showTotal"
      :show-elevator="showElevator"
      @on-change="handlePageChange"
    ></Page>
  </div>
</template>
<script>
export default {
  name: "CTable",
  props: {
    // 是否需要分页
    isShowPage: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default() {
        return {
          total: 0,
          pageIndex: 1,
          pageSize: 10
        };
      }
    },
    size: {
      type: String,
      default: ""
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    showElevator: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    height: {
      type: String | Number,
      default: "300"
    }
  },
  computed: {
    getPage() {
      let obj = Object.assign(this.page, this.pagination);
      return obj;
    },
    calcHeight() {
      return this.isShowPage ? this.height - 45 : this.height;
    }
  },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      statusColor: {
        1: "#5abc35",
        0: "#487deb",
        2: "#ef4c47",
        3: "#b7b7b7"
      }
    };
  },
  methods: {
    handlePageChange(pageIndex) {
      this.page.pageIndex = pageIndex;
      this.$emit("on-change-page", pageIndex);
    }
  }
};
</script>
<style lang="less" scoped>
.custom-table-page {
  margin-top: 10px;
}
/deep/.ivu-table table {
  width: 100% !important;
}
/deep/.ivu-table td,
/deep/.ivu-table th {
  width: 100%;
}
.steps {
  width: 100%;
  .step {
    width: 33.33%;
    float: left;
    font-size: 12px;
    padding: 6px 0;
    position: relative;
    .step-icon {
      display: block;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #b7b7b7;
      text-align: center;
      line-height: 28px;
      color: #fff;
      margin: 0 auto;
      margin-bottom: 2px;
    }
    .step-line {
      position: absolute;
      top: 20px;
      left: -14px;
      width: 28px;
      height: 2px;
      background-color: #b7b7b7;
    }
    &:first-child .step-line {
      display: none;
    }
  }
}
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
</style>


