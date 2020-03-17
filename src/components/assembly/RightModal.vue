<template>
  <!-- <transition> -->
    <Modal
        v-model="modal"
        :styles="styles"
        :closable="closable"
        class-name="right-modal"
        @on-ok="ok"
        :footer-hide=true
        :mask="mask"
        :transition-names="['right-modal-ease', 'right-modal-fade']"
        @on-cancel="cancel">
        <div class="side-modal" :style="{'left':closeLeft}">
          <div class="side-top" :style="{'border-right':'10px solid ' + themeBorderColor}" v-if="theme == 'bz' ? true : false">
            <div class="side-top-title-bg" :style="{'background':dataThemeHeaderBg}"></div>
            <div class="side-top-inner" :style="{'border-right':'9px solid ' + dataThemeBgColor}"></div>
          </div>
          <div class="side-close" :style="stylesClose" @click="cancel">
            <div class="side-close-arrow" :style="stylesCloseArrow"></div>
          </div>
          <div class="side-bottom" :style="{'border-right':'10px solid ' + themeBorderColor}" v-if="theme == 'bz' ? true : false">
            <div class="side-bottom-inner" :style="{'border-right':'9px solid ' + dataThemeBgColor}"></div>
          </div>
        </div>
        <div class="ivu-modal-header" :style="{'background':dataThemeHeaderBg}" v-if="showHeader">
          <slot name="header">
            <div class="ivu-modal-header-inner">
              {{title}}
            </div>
          </slot>
        </div>
        <div class="right-modal-body" :style="{top: showHeader ? '52px':'0px',bottom: showFooter ? '62px':'0px'}">
          <slot></slot>
        </div>
        <div class="ivu-modal-footer"  v-if="showFooter">
          <slot name="footer">

          </slot>
        </div>
    </Modal>
  <!-- </transition> -->
</template>
<script>
export default {
  name:'RightModal',
  props:{
    value:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:"Title"
    },
    mask:{
      type:Boolean,
      default:false
    },
    width:{
      type:Number,
      default:450
    },
    // 是否显示右上角的关闭按钮
    closable:{
      type:Boolean,
      default:true
    },
    // 是否允许点击遮罩层关闭
    maskClosable:{
      type:Boolean,
      default:true
    },
    okText:{
      type:String,
      default:"确定"
    },
    cancelText:{
      type:String,
      default:"取消"
    },
    showHeader:{
      type:Boolean,
      default:true
    },
    showFooter:{
      type:Boolean,
      default:false
    },
    themeBgColor:{
      type:String,
      default:"rgba(4, 28, 91, 0.99)"
    },
    themeBorderColor:{
      type:String,
      default:"#183a8e"
    },
    theme:{
      type:String,
      default:"aks"
    },
    themeHeaderBg:{
      type:String,
      default:"linear-gradient(180deg, rgba(10, 53, 167, 0.95), rgba(4, 33, 110, 0.95))"
    }
  },
  data(){
    return {
      modal:null,
      styles:null,
      closeLeft:'-17px',
      stylesClose:null,
      stylesCloseArrow:{},
      dataThemeHeaderBg:"",
      dataThemeBgColor:"",
      dataThemeBorderColor:""
    }
  },
  beforeMount() {
    window.addEventListener('resize',this.resizeHandler)
  },
  mounted(){
    this.resizeHandler();
    this.initStyle();
  },
  methods:{
    initStyle(){
      let theme = this.theme;
      let styles = {};
      switch(theme) {
        case "bz":
          this.closeLeft = '-17px'
          styles.borderRight = "18px solid #4368A0";
          styles.borderTop = "9px solid transparent";
          styles.borderBottom = "9px solid transparent";
          styles.borderLeft = "18px solid transparent";
          styles.left = '-19px'
          this.stylesClose = styles;
          this.stylesCloseArrow.marginLeft = "-5px"
          this.dataThemeHeaderBg = this.themeHeaderBg;
          this.dataThemeBgColor = this.themeBgColor;
          this.dataThemeBorderColor = this.themeBorderColor;
          break;
        case "aks":
          this.closeLeft = '0px'
          styles.borderRight = "18px solid transparent";
          styles.borderTop = "9px solid transparent";
          styles.borderBottom = "9px solid transparent";
          styles.borderLeft = "18px solid #4368A0";
          styles.left = '0'
          this.stylesClose = styles;
          this.stylesCloseArrow.marginLeft = "-15px"
          this.dataThemeHeaderBg = "#3369ae";
          this.dataThemeBgColor = "#ffffff";
          this.dataThemeBorderColor = "transparent";
          break;
      }
      this.$el.querySelector('.ivu-modal-content').style.border = '1px solid ' + this.dataThemeBorderColor;
      this.$el.querySelector('.ivu-modal-content').style.background = this.dataThemeBgColor;
    },
    resizeHandler(){
      const style = {};
      style.top = '56px'
      style.right = '0px'
      style.position = 'absolute'
      style.width = this.width + 'px'
      style.height = (document.body.clientHeight - 56 - 5) + 'px'
      this.styles = style;
    },
    ok () {
      this.modal = false;
      this.$emit('input',this.modal);
    },
    cancel () {
      this.modal = false;
      this.$emit('input',this.modal);
    }
  },
  watch:{
    value:{
      handler(val){
        this.modal = val;
      },
      immediate:true
    }
  }
}
</script>
<style lang="less" scoped>
 /deep/ .right-modal{
   overflow: hidden;
  .ivu-modal{
    .ivu-modal-content{
      border-radius:0;
      height: 100%;
      border: 1px solid #183a8e;
      background: rgba(4, 28, 91, 0.99);
      .ivu-modal-body{
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        // position: relative;
        .right-modal-body{
          padding-left: 20px;
          overflow-y: auto;
          position:absolute;
          top: 52px;
          bottom: 62px;
          width: 100%;
        }
      }
      .ivu-modal-header p, .ivu-modal-header-inner{
        color: #ffffff;
      }
      .ivu-modal-header{
        position: absolute;
        width: 100%;
        height: 52px;
        border-bottom:1px solid transparent;
        background: linear-gradient(180deg, rgba(10, 53, 167, 0.95), rgba(4, 33, 110, 0.95));
      }
      .ivu-modal-footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        border-top:1px solid transparent;
        height: 62px;
      }
      .side-modal{
        position: absolute;
        left: -17px;
        height: 100%;
        width: 17px;
        .side-top-title-bg{
          width: 9px;
          height: 52px;
          position: absolute;
          left: 1px;
          top: 0;
          border-bottom:1px solid transparent;
          background: linear-gradient(180deg, rgba(10, 53, 167, 0.95), rgba(4, 33, 110, 0.95));
          background-size: 100% 100%;
        }
        .side-top{
          position: absolute;
          width: 9px;
          height: 20.8%; 
          top: -1px;
          right: 0;
          border-right: 10px solid #183a8e;
          border-top: 0px solid transparent;
          border-bottom: 10px solid transparent;
          .side-top-inner{
            width: 8px;
            height: 106%;
            border-right: 9px solid rgba(4, 28, 91, 0.99);
            border-top: 0px solid transparent;
            border-bottom: 9px solid transparent;
            margin-left: 1px;
            margin-top: 1px;
          }
        }
        .side-close{
          position:absolute;
          top: 28%;
          width: 17px;
          height: 43.7%;
          z-index: 99;
          display: flex;
          align-items: center;
          cursor: pointer;
          border-right: 17px solid transparent;
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
          border-left: 17px solid #183a8e;
          left:0px;
          .side-close-arrow{
            display:block;
            width:0;
            height:0;
            border-width:12px 0 12px 12px;
            border-style:solid;
            border-color:transparent transparent transparent #dcd6d6;/*透明 透明 透明 黄*/
            margin-left: -14px;
          }
        }
        .side-bottom{
          position: absolute;
          width: 9px;
          height: 24.5%; 
          bottom: 0;
          right: 0;
          border-right: 10px solid #183a8e;
          border-top: 10px solid transparent;
          border-bottom: 0px solid transparent;
          .side-bottom-inner{
            width: 8px;
            height: 105%;
            border-right: 9px solid rgba(4, 28, 91, 0.99);
            border-top: 9px solid transparent;
            border-bottom: 0px solid transparent;
            margin-left: 1px;
            margin-bottom: -24px;
            position: absolute;
            top: -9px;
          }
        }
      }
    }
  }
  .right-modal-fade{
    transform: translate3d(0, 0, 0);
  }
  .right-modal-fade-enter-active, .right-modal-fade-leave-active {
    transition: all .5s;
  }
  .right-modal-fade-enter, .right-modal-fade-leave-active {
    transform: translate3d(520px, 0, 0);
  }
  .right-modal-ease{
    transform: translate3d(0, 0, 0);
  }
  .right-modal-ease-enter-active, .right-modal-ease-leave-active {
    transition: all .5s;
    transform: translate3d(0, 0, 0);
  }
  .right-modal-ease-enter, .right-modal-ease-leave-active {
    transform: translate3d(100%, 0, 0);
  }
}
</style>



