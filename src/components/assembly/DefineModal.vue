<template>
  <!-- 模态框 -->
  <Modal
    ref="modal"
    class-name="define-modal"
    :id="id"
    :value="modal"
    :width="width"
    :z-index="zIndex"
    :mask-closable=false
    @on-cancel="cancel">    
    <div class="modal-bg">
      <div class="modal-top-line-bg" :style="{width: titleWidth - 11 +'px'}"></div>
      <div class="modal-top-bg" :style="{width: width - (titleWidth - 11) + 3 +'px'}"></div>
    </div>
    <!-- 下拉框 -->
    <div class="modal-header-title" :style="{width: titleWidth+'px'}">
      <span class="">{{title}}</span>
    </div>
    <div class="modal-body">
      <slot></slot>
    </div>
    <!-- 底部按钮区域 -->
    <div class="footer" v-if="showFooterButton">
      <div class="footer-left">
        <slot name="footer-left"></slot>
      </div>
      <div class="footer-right">
        <slot name="footer-right">
          <i-button type="text" @click="cancel">取消</i-button>
          <i-button type="text" :loading="disabled" :disabled="disabled" @click="ok">确定</i-button>
        </slot>
      </div>
    </div>   
  </Modal>
</template>
<script>
export default {
  name:'DefineModal',
  props:{
    value:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default:'消息'
    },
    width:{
      type:[String,Number],
      default:'741'
    },
    height:{
      type:[String,Number],
      default:'520'
    },
    titleWidth:{
      type:[String,Number],
      default:'200'
    },
    id:{
      type:String,
      default:'ivu-modal-'+(''+Math.random()).match(/[^0\.]\d{5}/)[0]
    },
    disabled:{
      type:Boolean,
      default:false
    },
    beforeClose:Function,
    zIndex:{
      type:Number,
      default:1000
    },
    showFooterButton:{
      type:Boolean,
      default:true
    }
  },
  mounted(){
    let modal = document.querySelector('#'+this.id)
    if(modal) modal.querySelector('.ivu-modal-content').style.height = this.height + 'px';
  },
  data() {
    return {
      modal:false,//上传模态框的显示
    }
  },
  methods:{
    // 取消关闭按钮事件
    cancel() {
      this.modal = false;
      this.$emit('input',this.modal);
      this.$emit('on-close')
    },
    // 点击确定按钮事件
    ok() {
      if (typeof this.beforeClose === 'function') {
        let validate = this.beforeClose();
        if(validate) this.hide();
      } else {
        this.hide();
      }
    },
    hide(){
      this.modal = false;
      this.$emit('input',this.modal);
      this.$emit('on-ok')
    }
  },
  watch:{
    value:{
      handler(val) {
        this.modal = val;        
      },
      immediate:true
    }
  }
}
</script>
<style lang="less" scoped>
@imageUrl:'../../../';
/deep/ .ivu-modal{
  .ivu-modal-content{
    width:100%;
    height: 520px;
    background: transparent;  
    position: relative;
  }
  .ivu-modal-close .ivu-icon-ios-close{
    color: #ffffff;
  }
  .footer {
    border-top: 1px solid transparent;
    padding: 12px 18px 12px 18px;
    position: absolute;
    width: 100%;
    bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer-left{
      display: inline-flex;
      align-items: center;
      >span{
        display: inline-block;
        margin-left: 10px;
        color: rgba(82,102,147,1);
      }
    }
    button {
      background:url('@{imageUrl}static/images/btn-entity.png') 0 0 no-repeat;
      width: 93px;
      color: #bce2ff;
      font-size: 14px;
    }
  }
  .modal-body{
    color: #bce2ff;
    position: absolute;
    top: 50px;
    bottom: 66px;
    width: 100%;
    padding: 0 16px;
    overflow-y: auto;
  }
  .modal-body::-webkit-scrollbar{width:6px;height:6px;}
  .modal-body::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .modal-body::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .modal-body::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .modal-body::-webkit-scrollbar-corner{background-color:#dadada;}
  .modal-header-title{
    width: 200px;
    font-size: 16px;
    font-weight: 400;
    color: #8ebeef;
    position: absolute;
    padding: 9px 16px;
  }
  .modal-bg{
    width: 100%;
    height: 100%;
    background:linear-gradient(0deg,rgba(15,41,99,1),rgba(39,70,150,1));
    border:1px solid;
    border-image:linear-gradient(180deg, rgba(39,70,148,1), rgba(19,43,101,1)) 1 1;
    box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 1);
    position: absolute;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .modal-top-bg{
    height: 66px;
    position: absolute;
    width: 555px;
    right: -2px;
    border-top: 39px solid #142f78;
    border-left: 26px solid transparent;
    top: 0px;
  }
  .modal-top-line-bg {
    width: 189px;
    height: 15px;
    position: absolute;
    top: -12px;
    left: -1px;
    border-radius: 4px;
    border-right: 5.5px solid transparent;
    border-bottom: 7.5px solid #274694;
  }
  .ivu-modal-header,.ivu-modal-footer{
    display: none;
  }
  .ivu-modal-body{
    padding: 0;
    width: 100%;
    height: 100%;
  }
}
</style>