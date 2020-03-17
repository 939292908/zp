<template>
  <div class="dept-map">
    <charts-map class="charts-map" ref="map"></charts-map>
  </div>
</template>
<script>
import chartsMap from '@/components/assembly/Map'
export default {
  name:'DeptMap',
  components:{
    chartsMap
  }
}
</script>

