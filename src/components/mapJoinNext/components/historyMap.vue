<template>
  <!-- 串并筛选框 -->
  <right-dialog 
    class="history-map"
    v-model="modal"
    :showFooter=false
    title="历史记录"
    @close="closeMultiModal">
    <div class="infor-details bar">
      <div class="return"><span @click="handleBack">返回</span></div>
      <Timeline>
        <TimelineItem v-for="(item,index) in historyData" :key="index">
          <div class="icon" :style="{background:item.color}" @click="againGetTree(item.id)">
          <span>{{ item.type }}</span>
          </div>
          <div class="content-date">
          <p class="time">{{ item.date.substring(0, 10) }}</p>
          <p class="content">{{ item.date.substring(11,19) }}</p>
          </div>
          <div class="content-infor">
          <ul>
              <li><span>{{ item.name }}</span></li>
              <li>{{ item.tplx }}</li>
          </ul>
          </div>
        </TimelineItem>
      </Timeline>
  </div>
  </right-dialog>
</template>
<script>
import rightDialog from '@/components/assembly/RightDialog'
import * as comApis from '@/api/common.js'
import { mapJoinMixin } from '../mixin/mapJoinMixin'
export default {
  name:'HistoryMap',
  components:{
    rightDialog
  },
  mixins:[mapJoinMixin],
  props:{
    value:{
      type:Boolean,
      default:false
    },
    items:{
      type:Object,
      default:null
    },
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {      
      modal:false,
      statusList:{},
      imageUrl:'../../..',
    }
  },
  mounted(){
      
  },
  computed:{
    historyData() {
      return this.data;
    }
  },
  methods:{   
    againGetTree(id){
      this.$emit('on-icon-click',id)
    },
    handleBack(){
      this.$emit('on-back')
    },
    closeMultiModal() {
      this.$emit('close')      
      this.modal = false
      this.$emit('input',this.modal)
    },    
  },
  watch:{    
    items:{
      handler(val){
        this.statusList = val
      },
      deep:true,
      immediate:true
    },
    value:{
      handler(val){
        this.modal = val
        if(this.modal) {
        //   this.getDeptData();
        }
      },
      immediate:true,
    }
  }
}
</script>
<style lang="less" scoped>
@import '../css/style.less';
@import "../../../assets/loading.css";
@imageUrl:'../../../../';
.infor-details{
  overflow-y: auto;
  .return{
    line-height: 50px;
    margin-bottom:20px;
    padding-left:24px;
    font-size:16px;
    color:#fff;
    overflow:hidden;
    span{
      display:inline-block;
      width: 80px;
      height: 30px;
      margin-top:20px;
      text-indent: 10px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background: url('@{imageUrl}static/images/return-history.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  /deep/ .ivu-timeline{
    .ivu-timeline-item{
      padding: 0 0 40px 0;
      .ivu-timeline-item-tail{
        left:37.5%;
        border-left:1px dashed  #e7e7e7;
      }
      .ivu-timeline-item-head{
        display: none;
        // width:36px;
        // height:36px;
        // background:#a9c500;
        // border-radius:36px;
        // left:30%;
        // border:none;
        // margin-left:-18px;
      }
      .ivu-timeline-item-content{
        font-size:14px;
        color: #3a8bbf;
        position:relative;
        .content-date{
          width:28%;
          float:left;
          text-align: right;
          padding-right:24px;
          .time{
            color: #5cb9ff;
            font-size: 14px;
          }
          .content{
            font-size:12px;
            text-align: right;
          }
        }
        .content-infor{
          margin-left:45%;
          li:first-child{
            span{
              color:#fff;
            }
            span:nth-child(1){
              margin-right:28px;
            }
          }
          li:nth-child(2){
            color: #7e8e9a;
          }
          li:last-child{
            span{
              color: #7e8e9a;
            }
          }
        }
        .icon{
          width:36px;
          height:36px;
          line-height:36px;
          text-align: center;
          position:absolute;
          left:38%;
          top:3px;
          margin-left:-19px;
          background:red;
          border-radius:36px;
          color:#fff;
          font-size:16px;
          cursor:pointer;
          i{
            font-size:20px;
            color:#fff;
          }
        }
      }
    }
  }
}
.history-map{
  /deep/ .condition-modal{
    .cont-title{
      p{
        color: #ffffff !important;
      }
    }
  }
}
</style>



