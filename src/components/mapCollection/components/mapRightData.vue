<template>
    <div class="infoShow">
      <slot name='title'>
        <div class="title"><span v-if="areaName!=null">{{areaName}}</span></div>
      </slot>
      <slot name='content'>
        <div class="contentHuman">
          <div v-if="errorMessage">{{errorMessage}}</div>
          <div v-else class="personnelStatistical" v-for="(item,index) in personnelStatisticalResult" :key="index">
            <div class="infoName" >
              <span class="left">{{item.name}}</span>
              <span class="right" v-if="index==0">{{item.statisticalResultList[0].count}}人</span>
            </div>
            <div class="information" v-for="(it,i) in item.statisticalResultList" :key="i">
              <span class="left" v-if="it.name!=''">{{it.name}}：</span> 
              <span class="right" v-if="it.name!=''" >{{it.count}}人</span>
              <span class="clear"></span>
            </div>
          </div>
        </div>
      </slot>
      
      
    </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props:{
    areaName:{
      type: String,
      default: '',
    },
    errorMessage:{
      type: String,
      default: '',
    },
    personnelStatisticalResult:{
      type: Array,
      default: null,
    },
  },
  components: {},
  data() {
//这里存放数据
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
    //方法集合
  methods: {},
  filters:{
    sum : value=>{
      return value.statisticalResultList.map(x=>x.count).reduce((sum,item)=>{return sum + item})
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.infoShow{
  width: 300px;
  height:auto;
  flex: 0 0 300px;
  overflow: hidden;
  z-index:3;
  background: #ffffff;
  .title{
    width: 100%;
    height:58px;
    background:rgba(228,229,230,1);
    span{
      display: inline-block;
      margin-left: 20px;
      color: #2E3192;
      line-height: 58px;
      font-size: 22px;
    }
  }
  .contentHuman{
    
    padding: 10px 20px 64px;
    overflow-y: auto;
    height: 100%;
    .personnelStatistical{
      display: block;
      width: 100%;
      margin-top: 10px;
      .infoName{
        font-size:18px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        .right{
          float: right;
        }
      }
      .information{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        margin-left: 24px;
        span{
          display: block;
        }
        .left{
          float: left;
          color:#555555;
        }
        .right{
          float: right;
          color: #363636;
        }
      }
    }
    
  }
}
.clear{
  clear: both;
}
</style>