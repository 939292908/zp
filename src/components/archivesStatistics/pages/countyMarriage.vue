<template>
  <div>
    <searchHeader title='跨县市联姻情况' :isShowSearch="false"></searchHeader>
    <countyMarriageEchart></countyMarriageEchart>
    
  </div>
</template>

<script>
import searchHeader from '../components/searchHeader';
import countyMarriageEchart from '../components/countyMarriageEchart';

export default {
  components: { searchHeader, countyMarriageEchart }

}
</script>

<style lang="less" scoped>

</style>

