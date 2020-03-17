<template>
  <div class="result-box">
    <dept-map></dept-map>
  </div>
</template>
<script>
import DeptMap from './components/deptMap'
import MultiJoinD3 from './components/multiJoinD3'
export default {
  name:"MultiJoin",
  components:{
    DeptMap,
    MultiJoinD3
  }
}
</script>

