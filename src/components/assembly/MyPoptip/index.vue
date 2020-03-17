<template>
  <div
    :class="'my-popip-popper ' + popperClass"
    v-if="visible"
    :style="styles"
    :x-placement="placement"
    :data-transfer="transfer"
  >
    <div class="popip-content">
      <div class="poptip-arrow"></div>
      <div class="poptip-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { oneOf } from "@/tools/units.js";
import clickOutside from "@/directives/clickoutside.js";
import TransferDom from "@/directives/transfer-dom.js";
export default {
  name: "MyPoptip",
  directives: { clickOutside, TransferDom },
  props: {
    value: Boolean,
    placement: {
      type: String,
      default: "top-end"
    },
    width: {
      type: [String, Number]
    },
    transfer: {
      type: Boolean,
      default() {
        return true;
      }
    },
    popperClass: {
      type: String,
      default: ""
    },
    // default by css: 8px 16px
    padding: {
      type: String
    },
    zIndex: {
      type: Number,
      default: 10
    },
    myStyles: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      visible: null,
      tIndex: 1000,
      popperStyles: null
    };
  },
  computed: {
    styles() {
      let style = {};

      if (this.width) {
        style.width = `${this.width}px`;
      }
      if (this.transfer) style["z-index"] = 1060 + this.tIndex;
      if (this.myStyles) {
        Object.assign(style, this.myStyles);
      }
      if (this.popperStyles) {
        Object.assign(style, this.popperStyles);
      }
      return style;
    }
  },
  methods: {
    calPopperStyles(event, parentNode,container) {
      let target = event
        ? event.target
        : { offsetTop: 16, offsetLeft: 16, scrollTop: 0, scrollLeft: 0 };
      let tableOffsetTop = parentNode.offsetTop;
      let targetBBox = target.getBoundingClientRect()
      let containerBBox = container.getBoundingClientRect();
      let targetTop = targetBBox.top;
      let targetLeft = target.offsetLeft + target.scrollLeft;//targetBBox.x
      // 计算内容的高度
      let contentHeight = this.$el.clientHeight;
      let styles = {};
      styles.top = (container.scrollTop + targetTop - contentHeight - containerBBox.top - targetBBox.height / 2) + "px";
      styles.left = targetLeft + "px";
      this.popperStyles = styles;
    }
  },
  mounted() {},
  watch: {
    value: {
      handler(val) {
        this.visible = val;
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.my-popip-popper {
  min-width: 150px;
  display: block;
  visibility: visible;
  font-size: 12px;
  line-height: 1.5;
  position: absolute;
  z-index: 1060;
  color: #333;
  .popip-content {
    .poptip-arrow {
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border-color: transparent;
      border-style: solid;
      &::after {
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-color: transparent;
        border-style: solid;
        content: "";
        border-width: 7px;
      }
    }
    .poptip-inner {
      width: 100%;
      background-color: #fff;
      background-clip: padding-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
      padding: 8px 16px;
    }
  }
}

.my-popip-popper[x-placement^="top"] .poptip-arrow {
  bottom: 3px;
  border-width: 7px 7px 0;
  border-top-color: rgba(217, 217, 217, 0.5);
}
.my-popip-popper[x-placement^="top"] .poptip-arrow:after {
  content: " ";
  bottom: 1px;
  margin-left: -7px;
  border-bottom-width: 0;
  border-top-width: 7px;
  border-top-color: #fff;
}
.my-popip-popper[x-placement="top-end"] .poptip-arrow {
  right: 16px;
  bottom: -8px;
}
</style>