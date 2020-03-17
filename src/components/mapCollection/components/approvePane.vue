<template>
  <!-- 审批意见填写 -->
  <Modal
    :value="modal"
    :width="741"
    :z-index=10000
    :mask-closable=false
    @on-cancel="cancel">    
    <div class="modal-bg">
      <div class="modal-top-line-bg"></div>
      <div class="modal-top-bg"></div>
    </div>
    <!-- 头部 -->
    <div class="header-title">
      <span>{{title}}</span>
    </div>
    <!-- 内容 -->
    <div class="form-body">
      <div class="input-box">
        <!-- :rules="this.item && this.item.type == '2' ? rule : {}" -->
        <i-form ref="formItem" :model="formItem" :label-width="0">  
          <div class="textarea-box">
            <Form-item label="" prop="approveValue">
              <Input 
                v-model="formItem.approveValue" 
                type="textarea" 
                :maxlength=400 
                :rows="4" 
                placeholder="请填写意见"
                @on-blur="ruleValidate" />
            </Form-item>
            <div class="error">{{errorMessage}}</div> 
            <span>
              400字以内
            </span>
          </div>
        </i-form>
      </div>    
    </div>
    <!-- 底部按钮区域 -->
    <div class="footer">
      <div class="footer-right">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="text" :loading="loading" :disabled="loading" @click="ok">确定</i-button>
      </div>
    </div>   
  </Modal>
</template>
<script>
import { uploadExcel } from '@/api/collection/index.js'
export default {
  name:'ApprovePane',
  props:{
    value:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default:""
    },
    // 接受传过来的信息
    item:{
      type:Object,
      default:null
    }
  },
  data() {
    return {
      loading:false,
      modal:false,//上传模态框的显示,
      formItem:{
        approveValue:""
      },
      errorMessage:""
    }
  },
  methods:{
    getInit() {
    },
    // 取消关闭按钮事件
    cancel() {
      this.modal = false;
      this.$emit('input',this.modal);
    },
    // 点击确定按钮事件
    ok() {
      let validate = this.ruleValidate();
      if(validate) {
        this.post((res)=>{
          // 操作成功
          this.modal = false;
          this.$emit('input',this.modal);
          this.$emit('ok-callback',this.formItem.approveValue)
        })
      }       
    },
    ruleValidate() {
      this.errorMessage = ''
      if(this.item && this.item.type == '2' && !this.formItem.approveValue) {
        this.errorMessage = '请填写意见'
        return false;
      }
      return true;
    },
    // 调用接口
    post(callback) {

    }
  },
  watch:{
    value:{
      handler(val) {
        this.modal = val;
        if(val){          
          this.loading = false
          this.formItem.approveValue = ""
          this.errorMessage = ''
          this.getInit();
        }
      },
      immediate:true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../css/style.less';
</style>
<style lang="less" scoped>
@imageUrl:'../../../../';
/deep/ .ivu-modal{
  .ivu-modal-content{
    width:741px;
    height: 278px;
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
    justify-content: flex-end;
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
  .form-body{
    color: #bce2ff;
    position: absolute;
    top: 50px;
    bottom: 66px;
    width: 100%;
    padding: 15px 16px;    
    .textarea-box{
      padding: 5px;
      position: relative;
      margin: 0 auto 4px;
      background-size: 100% 100%;
      background: rgba(126,159,209,1);
      border: 1px solid rgba(54, 142, 204, 1);
      border-radius: 4px;
      textarea {
        width: 100%;
        padding: 10px 20px;
        border: none;
        resize: none;
        outline: none;
        color: #526693;
        font-size: 14px;
        background: rgba(0, 0, 0, 0);
      }
      span{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        color: #526693;
        font-size: 14px;
        position: absolute;
        bottom: 6px;
        left: 6px;
        right: 6px;
        text-align: right;
        padding-right: 10px;
        padding-top: 2px;
        top: 107px;
      }
      .error {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        color: #ed4014;
        font-size: 12px;
        position: absolute;
        bottom: 6px;
        left: 16px;
        right: 6px;
        text-align: left;
        padding-right: 10px;
        padding-top: 2px;
        top: 107px;
      }
    }
  }
  .header-title{
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