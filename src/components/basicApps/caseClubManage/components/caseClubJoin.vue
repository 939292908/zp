<template>
  <!-- 模态框身份证搜索-->
  <Modal
    v-model="modal"
    :mask-closable="false"
    @on-cancel="handleClose"
    width="80%"
    title="案件线索串并列表"
    class-name="case-club-join"
  >
    <div
      class="action-button"
      v-if="hasPageAuth(constantPageMap.PAGE_BasicApps_CaseClubNanalysis_ID)"
    >
      <i-button type="primary" @click="handleCaseClubJoin">可视化展示</i-button>
    </div>
    <c-table
      :height="tableHeight"
      :columns="columns"
      size="small"
      :data="tableData"
      @on-change-page="handlePageChange"
      :pagination="pagination"
    ></c-table>
    <div slot="footer" class="modalFooter">
      <i-button size="large" class="cancel" @click="handleClose()">关闭</i-button>
    </div>
  </Modal>
</template>
<script>
import CTable from "@/components/mapCollectionNext/components/ITable";
import { GET_CASECLUBJOINCOUNT_BY_CASEID } from "@/api/collection/index";
import { transferParameters } from "@/tools/units.js";
export default {
  name: "CaseClubJoin",
  components: {
    CTable
  },
  data() {
    return {
      modal: this.value,
      tableHeight: 400,
      columns: [
        {
          title: "编号",
          key: "no",
          width: 200,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "类别",
          key: "category",
          width: 90,
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          // sortable: true,
          width: 90,
          align: "center"
        },
        {
          title: "来源",
          key: "source",
          // sortable: true,
          width: 90,
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          width: 90,
          align: "center"
        },
        {
          title: "涉案(线)人数",
          key: "personCount",
          width: 110,
          align: "center"
        },
        {
          title: "采集单位",
          key: "deptName"
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
              </span>
            );
          }
        }
      ],
      tableAllData: [],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  props: {
    value: Boolean,
    caseId: String
  },
  methods: {
    init() {
      GET_CASECLUBJOINCOUNT_BY_CASEID(this.caseId).then(res => {
        if (res.code == 200) {
          this.tableAllData = res.data;
          this.getPageData();
          this.pagination.total = res.data.length;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    getPageData() {
      let arr = this.tableAllData.slice(this.pagination.pageSize * (this.pagination.pageIndex - 1), this.pagination.pageSize * (this.pagination.pageIndex))
      this.tableData = arr;
    },
    // 分页
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getPageData();
    },
    // 列表中查看按钮事件
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
    handleCaseClubJoin() {
      let params = this.caseId;
      transferParameters(this, "/caseClubAnalysis", params, null, "caseIds");
    },
    // 关闭按钮事件
    handleClose() {
      this.modal = false;
      this.$emit("input", this.modal);
    }
  },
  watch: {
    value: {
      handler(val) {
        this.modal = val;
        if (this.caseId && val) {
          this.pagination = {
            total: 0,
            pageIndex: 1,
            pageSize: 10
          };
          this.init();
        }
      },
      immediate: true
    },
    caseId: {
      handler(val) {
        // if (this.value && val) {
        //   this.pagination = {
        //     total: 0,
        //     pageIndex: 1,
        //     pageSize: 10
        //   };
        //   this.init();
        // }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.action-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>