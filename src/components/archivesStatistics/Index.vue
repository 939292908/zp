<template>
  <div class="archives-statistics" @click.stop="ifCloseAppListShow, handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="谱系档案" :showSearch="false"></app-header>
    <div class="nav">
      <!-- 导航 -->
      <ul class="nav-list">
        <li v-if="hasFunAuth(constantFunMap.FUN_Archives_Dashboard_ID)" @click="showDashBoard($event)" :class="{active: statusList.navContent == 'dashBoard'}">看板</li>
        <li v-if="hasFunAuth(constantFunMap.FUN_Archives_List_ID)" @click="showArchives($event)" :class="{active: statusList.navContent == 'archives'}">谱系档案管理</li>
        <li v-if="hasFunAuth(constantFunMap.FUN_Archives_Area_M_ID)" @click="showRegionMarriage($event)" :class="{active: statusList.navContent == 'regionMarriage'}">跨地区联姻情况</li>
        <li v-if="hasFunAuth(constantFunMap.FUN_Archives_Country_M_ID)" @click="showCountyMarriage($event)" :class="{active: statusList.navContent == 'countyMarriage'}">跨县市联姻情况</li>
      </ul>
    </div>
    <div class="main">
      <!-- 组件 切换  -->
      <component :isShowHeader="false" archivesSearchTitle="谱系档案管理" :is="statusList.navContent"></component>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/assembly/AppHeader';
import dashBoard from './pages/dashBoard';
import archives from '@/components/archives/Index';
import regionMarriage from './pages/regionMarriage';
import countyMarriage from './pages/countyMarriage';
export default {
  name: "archivesStatistics",
  components: { appHeader, dashBoard, archives, regionMarriage, countyMarriage },
  data () {
    return {
      userData: {},
      statusList: {
        navContent: '', 
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
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false,
      }
    }
  },
  created(){
    this.statusList.navContent = this.initComponent();
  },
  methods: {
    // 初始化组件
    initComponent(){
      if(this.hasFunAuth(this.constantFunMap.FUN_Archives_Dashboard_ID)) return 'dashBoard'
      if(this.hasFunAuth(this.constantFunMap.FUN_Archives_List_ID)) return 'archives'
      if(this.hasFunAuth(this.constantFunMap.FUN_Archives_Area_M_ID)) return 'regionMarriage'
      if(this.hasFunAuth(this.constantFunMap.FUN_Archives_Country_M_ID)) return 'countyMarriage'
    },
    // 显示 看板
    showDashBoard () {
      this.statusList.navContent='dashBoard'; // 切换组件
    },
    // 显示 谱系档案管理
    showArchives () {
      this.statusList.navContent='archives';
    },
    // 显示 跨地区联姻
    showRegionMarriage () {
      this.statusList.navContent='regionMarriage';
    },
    // 显示 夸县市联姻
    showCountyMarriage () {
      this.statusList.navContent='countyMarriage';
    },
    ifCloseAppListShow (evt) {
      if (evt.target.className == 'close-btn') {
        return false;
      }
    }
  }

}
</script>

<style lang="less" scoped>
  @imageUrl: "../../../";
  .archives-statistics {
    position: absolute;
    z-index: 88;
    height: 100%;
    width: 100%;
    padding-top: 68px;
    .nav {
      padding-top: 10px;
      width: 250px;
      height: 100%;
      // border-right: 2px solid #98B5F9;
      float: left;
      .nav-list {
        width:100%;
        li {
          height: 49px;
          font-size: 14px;
          line-height: 49px;
          padding-left: 40px;
          cursor: default;
          &:hover {
            color: #2d8cf0;
          }
          &.active {
            background:#2d8cf0;
            color: #fff;
          }
        }
      }
    }
    .main {
      height: 100%;
      overflow: auto;
      position: relative;
      background:url('@{imageUrl}static/images/net.png') repeat #ffffff;
      border-left: 2px solid #98B5F9;
      padding: 20px;
      padding-top: 2px;
    }
  }
  .archives {
    margin-left: -20px;
    height: auto!important;
    min-height: 100% !important;
    padding-top: 0!important;
  }
</style>

