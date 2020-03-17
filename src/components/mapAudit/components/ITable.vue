<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 16:55:18
 * @LastEditTime: 2019-11-04 19:32:00
 * @LastEditors: Please set LastEditors
 -->
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <template>
  <div class="custom-table">
    <!-- 步骤条 -->
    <i-table
      @on-select-all="handleSelectAll"
      @on-selection-change="handleSelect"
      ref="table"
      stripe
      :height="calcHeight"
      :columns="columns"
      :data="data"
    >
      <template slot-scope="{ row, index }" slot="steps">
        <div class="steps">
          <div class="step">
            <span class="step-icon" :style="{backgroundColor: statusColor[status.police]}">所</span>
            <span class="step-status" :style="{color: statusColor[status.police]}">{{status.police}}</span>
          </div>
          <div class="step">
            <span class="step-icon" :style="{backgroundColor: statusColor[status.city]}">县市</span>
            <span class="step-status" :style="{color: statusColor[status.city]}">{{status.city}}</span>
            <span class="step-line" :style="{backgroundColor: statusColor[status.city]}"></span>
          </div>
          <div class="step">
            <span class="step-icon" :style="{backgroundColor: statusColor[status.area]}">地区</span>
            <span class="step-status" :style="{color: statusColor[status.area]}">{{status.area}}</span>
            <span class="step-line" :style="{backgroundColor: statusColor[status.area]}"></span>
          </div>
        </div>
      </template>
      <template slot-scope="{ row }" slot="lastAuditState">
            <span :class="{redFont: row.lastAuditState=='退回'}">{{ row.lastAuditState }}</span>
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
    },
    status: {
      type: Object,
      default() {
        return {};
      }
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
        通过: "#5abc35",
        审核中: "#487deb",
        退回: "#ef4c47",
        "": "#b7b7b7"
      }
    };
  },
  methods: {
    handlePageChange(pageIndex) {
      this.page.pageIndex = pageIndex;
      this.$emit("on-change-page", pageIndex);
    },
    // 全选
    handleSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    // 全选
    handleSelect(selection) {
      this.$emit("on-selection-change", selection);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ td .redFont {
  color: #d10;
}
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
  }
}
</style>


