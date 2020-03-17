<template>
  <div class="archives" @click="ifCloseAppListShow, handleWrapperClick($event)">
    <app-header v-if="isShowHeader" ref="appHeader" :items="statusList" title="谱系档案" :showSearch="false"></app-header>
    <div class="main-box">
      <searchHeader :hasLeftNav="!isShowHeader" :searchTitle="archivesSearchTitle" @getSearchText="getSearchText" :cardTotal="cardTotal"></searchHeader>
      <archivesCard ref="archivesCard" @getTotal="getTotal"></archivesCard>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/assembly/AppHeader';
import searchHeader from './components/searchHeader';
import archivesCard from './components/archivesCard';

export default {
  components: { appHeader, searchHeader, archivesCard },
  props: {
    isShowHeader: {
      type: Boolean,
      default: true
    },
    archivesSearchTitle: {
      type: String,
      default: "搜索结果"
    }
  },
  data () {
    return {
      // archivesData: {}, // 档案卡片数据
      searchData: {}, // 搜索数据
      cardTotal: 0, // 搜索总数
      statusList: {

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
  methods: {
    // 获取子组件的 搜索结果
    getSearchText ( data ) {
      this.$refs.archivesCard.getArchiveData(data);
    },
    // 获取子组件 搜索总数
    getTotal ( total ) {
      this.cardTotal = total;
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
  .archives {
    position: absolute;
    z-index: 88;
    width: 100%;
    height: 100%;
    padding-top: 68px;
    .main-box {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 0 20px;
    }
    .nav {
      padding-top: 50px;
      width: 250px;
      height: 100%;
      // border-right: 2px solid #98B5F9;
      float: left;
      .user-img {
        width: 100px;
        height: 100px;
        margin: 34px auto 18px;
        border-radius: 50%;
        overflow: hidden;
        border: 5px solid #fff;
        box-shadow:0px 0px 8px 2px rgba(0, 0, 0, 0.1);
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .user {
        text-align: center;
        font-size:14px;
        color:rgba(102,102,102,1);
        margin-bottom: 14px;
        .user-name {
          font-size:18px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          margin-right: 2px;
        }
      }
      .department {
        font-size:14px;
        font-weight:400;
        text-align: center;
        color:rgba(153,153,153,1);
        margin-bottom: 28px;
      }
      .nav-list {
        width:100%;
        li {
          height: 46px;
          font-size: 16px;
          line-height: 46px;
          padding-left: 40px;
          cursor: default;
          &.active {
            background:rgba(73,140,233,1);
            color: #fff;
          }
        }
      }
    }
    .main {
      height: 100%;
      overflow: hidden;
      position: relative;
      background:url('@{imageUrl}static/images/net.png') repeat #ffffff;
      border-left: 2px solid #98B5F9;
      .title {
        height:44px;
        line-height: 44px;
        background:rgba(202,215,233,1);
        font-size:16px;
        color:rgba(75,151,230,1);
        padding-left: 18px;
        margin-bottom: 80px;
      }
    }
  }
</style>

