<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 18:20:15
 * @LastEditTime: 2019-11-13 10:34:41
 * @LastEditors: Please set LastEditors
 -->
<template>
    <Modal
      :value="isShowModal"
      :title="title"
      @on-ok="ok"
      width="420"
      :mask-closable="false"
      @on-cancel="cancel">
      <slot></slot>
      <div slot="footer" class="modal-footer-box">
        <Button type="text" size="large" v-if="showCancelBtn" @click="cancel">{{cancelBtnText}}</Button>
        <Button type="primary" size="large" v-if="showOkBtn" @click="ok">{{okBtnText}}</Button>
        <!-- <div class="footer-right">
          <div class="modal-footer-btns">
            <div class="btn ok-btn" v-if="showOkBtn" @click="ok">{{okBtnText}}</div>
            <div class="btn cancel-btn" v-if="showCancelBtn" @click="cancel">{{cancelBtnText}}</div>
          </div>
        </div> -->
      </div>
  </Modal>
</template>
<script>
export default {
  name: "Panel",
  props: {
    // 模态框状态
    isShowModal: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 确认
    ok: {
      type: Function,
      default: () => {}
    },
    // 关闭
    cancel: {
      type: Function,
      default: () => {}
    },
    // ok按钮文字
    okBtnText: {
      type: String,
      default: "确认"
    },
    // cancel按钮文字
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    // 显示ok按钮
    showOkBtn: {
      type: Boolean,
      default: true
    },
    // 显示cancel按钮
    showCancelBtn: {
      type: Boolean,
      default: true
    },
  },
  mounted() {
    
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {},
};
</script>
<style lang="less" scoped>
.modal-footer-box {
  overflow: hidden;
  .footer-right {
    float: right;
    box-sizing: border-box;
    padding: 12px 0;
  }
  .modal-footer-btns {
    float: right;
    .btn {
      float: left;
      width: 78px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      margin-right: 12px;
      cursor: pointer;
      border: 1px solid #000;
      border-radius: 2px;
      border: 1px solid #ccc;
      background-color: #fff;
      color: #333;
    }
    .ok-btn {
      border: 1px solid rgba(0,0,0,0);
      background-color: #0668C8;
      color: #fff;
    }
  }
}
/deep/ .ivu-modal-header-inner {
  font-size: 14px!important;
}
</style>
