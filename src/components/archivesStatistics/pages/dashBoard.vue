<template>
  <div>
    <searchHeader title='谱系档案'></searchHeader>
    <nativeClansman></nativeClansman>
    <clansmanRisk></clansmanRisk>
    <clansmanRiskRank></clansmanRiskRank>
  </div>
</template>

<script>
import searchHeader from '../components/searchHeader';
import nativeClansman from '../components/nativeClansman';
import clansmanRisk from '../components/clansmanRisk';
import clansmanRiskRank from '../components/clansmanRiskRank';

export default {
  components: { searchHeader, nativeClansman, clansmanRisk, clansmanRiskRank }
}
</script>

<style lang="less" scoped>
.board-header {
    height: 65px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    margin-top: 10px;
  h3 {
    float: left;
    font-size: 24px;
  }
  .search {
    width: 65%;
    float: right;
    .ivu-input-wrapper {
      float: right;
      width: 80%;
      margin-right: 20px;
    }
    button {
      float: right;
    }
  }
}
</style>

