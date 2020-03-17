<template>
  <div class="clansman-risk-rank">
    <div class="top-title">
      <span>辖区高风险宗族排名</span>
    </div>
    <p class="rankText">高风险宗族前 100 名</p>
    <!-- <Table highlight-row ref="currentRowTable" :columns="columns" :data="data1"></Table> -->
        <!-- 表格 -->
    <Table stripe size="large" ref="currentRowTable" :columns="columns" :data="tableData"></Table>
    <!-- 分页 -->
    <div class="page" style="margin: 10px;overflow: hidden">
      <div>
        <Page
          :total="total"
          :current="currentPageIndex"
          :page-size="pageSize"
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

export default {
  data() {
    return {
      columns: [
        {
          title: " ",
          width: 20,
        },
        {
          title: "排名",
          key: "rn",
          width: 120,
          render: (h, params) => {
            if (params.row.rn == 1) {
              return  <div class="rank-top oneColor">{params.row.rn}</div>
            } else if (params.row.rn == 2) {
              return  <div class="rank-top twoColor">{params.row.rn}</div>
            } else if (params.row.rn == 3) {
              return  <div class="rank-top threeColor">{params.row.rn}</div>
            } else {
              return  <div class="rank-top">{params.row.rn}</div>
            }
          }
        },
        {
          title: "宗族名称",
          key: "archiveName",
          render: (h, params) => {
            return h("div",
              {
                style: {
                    cursor: "pointer"
                  },
                on: {
                  click: () => {
                    let routeData = this.$router.resolve({
                    path:'/pedigreeDetail',
                    query:{
                      archiveId: params.row.archiveId,
                      title: params.row.archiveName,
                      mc:'谱系档案'
                    }
                  });
                  window.open(routeData.href, "_blank");
                  }
                }
              },
                params.row.archiveName
            )
          }
        },
        {
          title: "成员人数",
          key: "personCount",
          width: 140,
          render: (h, params) => {
            return h("div",
              {
                style: {
                  marginLeft: "25px"
                }
              },
                params.row.personCount
            )
          }
        },
        {
          title: "风险积分",
          width: 160,
          key: "riskLevel",
          render: (h, params) => {
            return h("div",
              {
                style: {
                  // marginLeft: "18px"
                }
              },
                params.row.riskLevel+`(${params.row.riskScore})`
            )
          }
        }
      ],
      tableData: [
        // {
        //   rn: 1,
        //   archiveName: "XXX的谱系",
        //   personCount: 18,
        //   riskLevel: "极高",
        // },
        // {
        //   rn: 2,
        //   archiveName: "XXX的谱系",
        //   personCount: 24,
        //   riskLevel: "高",
        // },
      ],
      total: 100, // 分页
      currentPageIndex: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      let data = {
        pageIndex: this.currentPageIndex,
        pageSize: this.pageSize
      };
      comApis.getClansmanRiskRank(data)
      .then(response => {
        if (response.code == 200) {
          // this.statusList.archivesLoadingShow = false;
          console.log(response.data);
          this.tableData = response.data.data;
        } else {
          this.$Message.warning(response.message);
          // this.statusList.archivesLoadingShow = false;
        }
      })
      .catch(error => {
        // this.statusList.archivesLoadingShow = false;
        console.log(error);
      });
      // this.tableData = []
    },
    // 点击同步分页
    handlePageChange(pageIndex) {
      this.currentPageIndex = pageIndex;
      this.getData();
    },
  }
};
</script>

<style lang="less" scoped>
.clansman-risk-rank {
  padding: 0 10px;
  margin-bottom: 40px;
  .top-title {
    font-size: 20px;
    line-height: 80px;
    span {
      font-weight: 700;
    }
  }
  .rankText {
    font-size: 20px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
    background-color: rgb(86, 119, 252);
    color: #fff;
  }
  /deep/ .rank-top {
    // background-color: yellow;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;
    // margin: 0 auto;
    &.oneColor {
      background-color: rgb(242,65,31);
      color: #fff;
    }
    &.twoColor {
      background-color: rgb(249,134,29);
      color: #fff;
    }
    &.threeColor {
      background-color: rgb(255,204,0);
      color: #fff;
    }
  }
}
</style>

