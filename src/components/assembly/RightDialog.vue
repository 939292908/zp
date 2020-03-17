<template>
   <transition name="multiStr">
      <div class="multi-str" v-show="modal || (statusList && statusList.MultiModal)">
        <div class="condition-modal">
          <div class="multi-sidebar tarbar">
            <div class="sidebar-top">
              <div class="polygon"></div>  
            </div>
            <div class="close-btn" @click="closeMultiModal">
              <img src="../../../static/images/close-btn2.png" alt="">
            </div>
            <div class="sidebar-bottom">
              <div class="polygon"></div>  
            </div>
          </div>
          <div class="cont-box" :style="{bottom:showFooter ? '61px': '0'}">
            <slot></slot>
          </div>
          <div class="cont-title">
            <p>{{title}}</p>
          </div>
          <div class="cont-btn" v-if="showFooter">            
            <slot name="footer">  
              <span class="cancel" v-if="showCloseBtn" @click="closeMultiModal">{{closeBtn}}</span>
              <span class="sure" :class="{'disabled':okLoading}" v-if="showOkBtn" @click="save">{{okBtn}}</span>          
            </slot>            
          </div>
        </div>
      </div>
    </transition>
</template>
<script>
export default {
  name:"RightDialog",
  props:{
    title:{
      type:String,
      default:""
    },
    value:{
      type:Boolean,
      default:false
    },
    statusList:{
      type:Object,
      default:null
    },
    showCloseBtn:{
      type:Boolean,
      default:true
    },
    showOkBtn:{
      type:Boolean,
      default:true
    },
    closeBtn:{
      type:String,
      default:'取消'
    },
    okBtn:{
      type:String,
      default:'保存'
    },
    showFooter:{
      type:Boolean,
      default:true
    },
    beforeClose:Function,
    okLoading:false
  },
  data() {
    return {
      modal:null
    }
  },
  methods:{
    /**
     * 关闭用户面板
     * @function closeMultiModal
     * @author erbing
     */
    closeMultiModal () {
      this.$emit('close')      
      this.modal = false
      this.$emit('input',this.modal)
    },
    hide(){
      this.$emit('ok')
      this.modal = false
      this.$emit('input',this.modal)
    },
    save() {
      if (typeof this.beforeClose === 'function') {
        let validate = this.beforeClose();
        if(validate) this.hide();
      } else {
        this.hide();
      }
    }
  },
  watch:{
    value:{
      handler(val){
        this.modal = val
      },
      immediate:true,
    }
  }
}
</script>
<style lang="less" scoped>
@imageUrl:'../../../';
.post(r){
  position:relative;
}
.post(a){
  position:absolute;
}
.multi-str{
  transform: translate3d(0, 0, 0);
  width: 534px;
  //background: rgba(4, 28, 91, 0.99);
  background: #f6f6f6;
  position: absolute;
  right: 0;
  top: 69px;
  bottom: 6px;
  z-index: 9998;
  border-left: none;
  box-shadow:-2px 0px 10px rgba(0,0,0,.5);
}
.multiStr-enter-active, .multiStr-leave-active {
  transition: all .5s;
}
.multiStr-enter, .multiStr-leave-active {
  transform: translate3d(534px, 0, 0);
}
.condition-modal{
  .multi-sidebar{
    width: 24px;
    .post(a);
    top: 0;
    bottom: 0;
    left: -25px;
    .sidebar-top{
      .post(a);
      width: 9px;
      height:28.6%;
      top: 0;
      right: 1px;
      .polygon{
        .post(a);
        bottom:43px;
        top:0;
        left:0;
        right:0;
        width:0;
        // border-right:10px solid #f6f6f6;
        // border-top:0px solid transparent;
        // border-bottom:10px solid transparent;
      }
    }
    .sidebar-bottom{
      .post(a);
      width: 9px;
      top:71.9%; 
      height: 28.1%; 
      bottom: 0;
      right: 1px;
      .polygon{
        .post(a);
        top:40px;
        left:0;
        right:0;
        bottom:0;
        width:0;
      }
    }
    .close-btn{
      .post(a);
      top: 28.6%; 
      width: 24px;
      height: 43.3%; 
      z-index: 99;
      cursor: pointer;
      background-size:100% 100%;
      right: -1px;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .cont-box{
    width: 100%;
    padding:10px 20px;
    position: absolute;
    top: 44px;
    bottom: 61px;
    background:#f6f6f6;
    overflow-y:auto;
    .cont-list{
      padding:20px 0;
      .condition-select{
        .li{
          margin-bottom:20px;
          overflow:hidden;
          span{
            color:#303030;
            font-size:14px;
            margin-right:57px;
            float:left;
          }
          input{
            width:372px;
            height:30px;
            line-height:30px;
            text-indent:10px;
            font-size:14px;
            color:#6a6a6a;
            display:inline-block;
            border-radius:2px;
            border:1px solid #eaeaea;
            background:#fff;
            outline:none;
          }
        }
        li.tp-unit{
          height:30px;
          line-height:30px;
        }
        li.tp-lx{
          overflow:hidden;
        }
        li.family-description{
          overflow:hidden;
          //height:400px;
          .wrapper{
            width:372px;
            height:395px;
            margin-left:127px;
            position:relative;
            .box{
              width:372px;
              height:395px;
              border-radius:2px;
              background:#fff;
              float:left;
              font-size:14px;
              color:#6a6a6a;
              border:1px solid #eaeaea;
            }
          }
        }
        li.page-tpmc{
          ul{
            text-align:center;
          }
        }
      }
    }
  }
  .cont-title{
    width:534px;
    height:44px;
    position:absolute;
    top:0;
    //left: -10px;
    right:0;
    background:#f6f6f6;
    border-bottom:1px solid #d8d8d8;
    p{
      font-size:16px;
      color:#0090ea;
      line-height:44px;
      padding-left:10px;
    }
  }
  .cont-btn{
    width: 534px;
    height: 61px;
    background:#fff;
    position: absolute;
    bottom: 0;
    //left: -10px;
    right: 0;
    border-top: 1px solid #d8d8d8;
    span{
      display:inline-block;
      width:93px;
      height:36px;
      margin-top:12px;
      line-height:36px;
      text-align:center;
      cursor:pointer;
      float:right;
    }
    .cancel{
      background:url('@{imageUrl}static/images/cancel.png') 0 0 no-repeat;
      color:#6e6e6e;
      margin:12px 19px 0 5px;
    }
    .sure{
      background:url('@{imageUrl}static/images/sure.png') 0 0 no-repeat;
      color:#ffffff;
      margin-right: 15px;
    }
    .disabled{
      opacity: 0.5;
    }
  }
}
</style>


