<template>
  <div class="container" @click="handleWrapperClick($event)">
    <slot name="header"></slot>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ZContainer'
}
</script>
<style lang="less" scoped>
.container{
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
  .content{
    position: absolute;
    top: 68px;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
  }
}
</style>