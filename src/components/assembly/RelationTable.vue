<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime: 2019-11-29 14:13:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <Table
    class="rellation-table"
    border
    stripe
    :height="tabeHeight"
    :columns="this.tpCount.columns1"
    :data="this.tpCount.tableData"
  ></Table>
</template>
<script>
export default {
  props: ["tpCount"],
  data() {
    return {
      tabeHeight: 0
    };
  },
  mounted() {
    this.getTabeHeight();
    window.onresize = this.getTabeHeight;
  },
  methods: {
    getTabeHeight() {
      let record = this.$parent.$refs.record;
      if (record) {
        this.tabeHeight = this.$parent.$refs.record.clientHeight - 70;
      }
      // this.tabeHeight = document.querySelector(".record").offsetHeight - 70;
    }
  }
};
</script>

<style lang="less" scoped>
.rellation-table {
  /deep/.ivu-table-cell,
  /deep/.ivu-table td,
  /deep/.ivu-table th {
    padding: 2px 0;
    width: 100%;
    text-align: center;
    height: 24px !important;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 1);
    border-radius: 5px;
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 183, 245, 1);
  }
  /deep/.ivu-table-overflowY::-webkit-scrollbar-corner {
    background-color: #dadada;
  }

  /deep/ th {
    cursor: default;
    font-size: 14px;
  }
  /deep/ td {
    font-size: 14px;
  }
}
</style>
