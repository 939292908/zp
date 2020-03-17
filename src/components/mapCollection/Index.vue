<template>
    <!-- 图谱采集入口 -->
      <div class="collection-container m-container" @click="handleWrapperClick($event)">
        <app-header 
          ref="appHeader"
          :items="statusList" 
          title="图谱采集" 
          :showSearch=false>
        </app-header>
        <div class="content">
          <div class="wrapper-box">
            <div class="wrapper-box-item" v-if="item.hasAuth()" @click="goToPage(item)" :key="index" v-for="(item,index) in pageTypes">
              <i :class="item.icon"></i>
              <div>{{item.name}}</div>
            </div>
          </div>
        </div>
        <!-- dialog -->
        <component v-if="currentTab && currentTab.component" :is="currentTab.component" v-model="visible"></component>
      </div>
    </template>
    <script>
    import appHeader from '@/components/assembly/AppHeader'
    import validateFile from './components/validateFile'
    import { mapMixin } from './mixin/collectionMixin'
    export default {
      name: 'Collection',
      components: {
        validateFile,
        appHeader
      },  
      mixins:[mapMixin],
      data() {
        return {
          statusList: {
            myNavModalShow:false,
            uploadImg : false,
            personModalShow : false,        
            newsModalShow : false,       
            appModalShow : false,
            changeLogShow : false,
            guidelinesShow : false,
            messageDetailsShow : false,
            feedbackShow : false,
            d3Show: true,
            d3Loading: false,
            PersonInforShow: false,
            nodesDetailedShow: false,
            MultiModal: false,
            ShowMultiModal: true,
            tpList: false,
            historyModalShow: false,
            loadingTpmcShow: false
          },
          currentTab:null,
          visible:false
        }
      },
      methods:{
        goToPage(item) {          
          if(item.route){
            this.$router.push({
              path:item.route,
              query:item.query
            })
            this.currentTab = null
          } else if(item.type && item.type == 'dialog') {
            this.visible = true;
            this.currentTab = item
          }
        },        
        /**
         * 返回首页
         * @author julie
         */
        backIndex() {
          this.$router.push({
            path: '/index',
          });
        },        
      }
    }
    </script>
    <style lang="less" scoped>
    @import './css/style.less';
    </style>
    <style lang="less" scoped>
    .wrapper-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 100px;
      .wrapper-box-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 232px;
        height: 254px;
        background:url(../../../static/images/collect_bg.png) 0 0 no-repeat;
        background-size: cover;
        margin: 0 30px 0;
        position: relative;
        cursor: pointer;
        &:hover{
          background:url(../../../static/images/collect_bg_hover.png) 0 0 no-repeat;
          background-size: cover;
        }
        /deep/ i {
          font-size: 70px;
          margin-bottom: 20px;
        }
        > div {
          font-weight: 600;
          font-size: 14px;
        }
        .iconfont{
          display: inline-block;
          font-family: Ionicons;
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          text-rendering: auto;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          vertical-align: middle;
        }
     }
    }
    
    </style>
    