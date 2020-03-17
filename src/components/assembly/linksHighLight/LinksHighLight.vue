<template>
  <div class="highLight-box">
    <ul>
      <li :class="{'selected': activeIndex == index}" v-for="(item,index) in this.mapIdNameMapping" :key="index" @click="highlightLabel(item, index)">
        <span :title="item.mapName">{{item.mapName}}</span>
        <span :style="{background:item.color}"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LinksHighLight',
  props: ['mapIdNameMapping'],
  data(){
    return {
      activeIndex: -1
    }
  },
  methods:{
    highlightLabel (item, index){
      item.selected = item.selected != undefined ? !item.selected : true;
      if(item.selected) {
        this.activeIndex = index
      } else {
        this.activeIndex = -1;
      }
      this.$emit('highLightMapping', item, index);
    }
  }
}
</script>

<style lang="less" scope>
    .highLight-box{
      width:256px;
      max-height:280px;
      position:absolute;
      top:60px;
      left:20px;
      padding: 5px;
      border:1px solid #4690d1;
      z-index:999;
      background:#fff;
      overflow-y:auto;
      overflow-x:hidden;
      ul{
        li{
          margin-bottom: 5px;
          position: relative;
          cursor: pointer;
          span{
            height:35px;
            display:inline-block;
            line-height:15px;
          }
          span:nth-child(1){
            width:200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span:nth-child(2){
            width:40px;
            height:10px;
            position: absolute;
            top: 4px;
            right: 0px;
          }
        }
        li.selected,li:hover{
          span:nth-child(1){
            // font-weight: bold;
            color: #0668c8;
          }
        }
      }
    }
    .highLight-box ul::-webkit-scrollbar{width:6px;height:6px;}
    .highLight-box ul::-webkit-scrollbar-track{border-radius:5px;background:none;}
    .highLight-box ul::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
    .highLight-box ul::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
    .highLight-box ul::-webkit-scrollbar-corner{background-color:#dadada;}
 
</style>