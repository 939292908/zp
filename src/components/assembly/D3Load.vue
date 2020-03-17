<template>
  <!-- 加载loading -->
  <div class="loading-bg" :style="{'z-index':zIndex}" v-if="modal">
    <div class="d3-loading">
      <div class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div class="text">{{text}}</div>
        </Spin>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DLoad",
  props: {
    text: {
      type: String,
      default: "图形加载中..."
    },
    value: {
      type: Boolean,
      default: false
    },
    zIndex:1
  },
  data() {
    return {
      modal: null
    };
  },
  watch: {
    value: {
      handler(val) {
        this.modal = val;
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.loading-bg {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  .d3-loading {
    width: 365px;
    height: 98px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -182.5px;
    margin-top: -49px;
    .demo-spin-col {
      width: 100%;
      border: none;
      .ivu-spin-fix {
        border: none;
        background: none;
        .ivu-spin-text {
          .demo-spin-icon-load {
            font-size: 60px !important;
            color: #fff;
          }
          .text {
            color: #fff;
          }
        }
      }
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
    .demo-spin-col{
      height: 100px;
      position: relative;
    }
  }
}
</style>


