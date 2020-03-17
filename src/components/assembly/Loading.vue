<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-16 09:22:51
 * @LastEditTime: 2019-12-18 16:47:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 加载loading -->
  <div class="zptx-loading" v-if="value">
    <div
      v-if="maskClosable"
      class="zptx-loading-mask"
      :style="{'z-index':zIndex,'background-color': this.bgColor ? this.bgColor : false}"
    ></div>
    <div class="zptx-loading-wrap" :style="{'z-index':zIndex}">
      <div class="zptx-loading-content">
        <img :src="image" alt="loading" :style="styles()" />
        <span v-if="content" :style="{'color':fontColor}">{{content}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    /**
     * 加载loading的大小，可以为数字也可以字符串（small、large、default、''）
     */
    size: {
      type: String | Number,
      default: ""
    },
    /**
     * loading使用的颜色(white、blue),深色区域使用最好选择white,浅色区域选择blue
     */
    color: {
      type: String,
      default: "blue"
    },
    /**
     * loading下方的加载文字，不传不显示
     */
    content: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    zIndex: 9999999999,
    /**
     * 是否显示背景遮罩层
     */
    maskClosable: {
      type: Boolean,
      default: true
    },
    /**
     * 遮罩层背景色
     */
    bgColor: {
      type: String,
      default: ""
    },
    fontColor: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {
      image: require("../../../static/images/loading-" + this.color + ".gif")
    };
  },
  methods: {
    styles() {
      const style = {};
      if (typeof this.size == "string") {
        if (this.size == "small") {
          style.width = "50px";
          style.height = "50px";
        } else if (this.size == "large") {
          style.width = "100px";
          style.height = "100px";
        } else if (this.size == "default") {
          style.width = "80px";
          style.height = "80px";
        } else {
          style.width = "80px";
          style.height = "80px";
        }
      } else {
        style.width = this.size + "px";
        style.height = this.size + "px";
      }
      return style;
    }
  },
  watch: {
    value: {
      handler() {},
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.zptx-loading {
  .zptx-loading-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: 9999;
  }
  .zptx-loading-wrap {
    position: absolute;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99990;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .zptx-loading-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    outline: 0;
    flex-direction: column;
    z-index: 999999;
  }
}
</style>
