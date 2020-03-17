<template>
  <div class="layout-container pedigree-detail" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" :title="pedigreeName" :showSearch="true" @on-search="toArchives">
      <span @click="backArchives" style="cursor:pointer;">谱系档案></span>
    </app-header>
    <div id="outer" class="outer">
      <div class="inner">
        <!-- 家族图谱 -->
        <div class="content-box">
         
          <d3-show 
            class="main" 
            ref="graphical">
          </d3-show>
        </div>
        <div class="info">
          <div class="label">构成宗族图谱情况</div>
          <Alert class="top-info" show-icon>
            通过对
            <span>{{ householdMapCount.count }}</span>张
            <span>{{ householdMapCount.typeName }}</span>和
            <span>{{ highRiskMapCount.count }}</span>张
            <span>{{ highRiskMapCount.typeName }}</span>的自动关联串并，梳理出
            <span>{{ rootUserName }}</span>的宗族图谱。
          </Alert>
        </div>
        <!-- 联姻关联 -->
        <div class="content-box">
          <p class="content-title">姻亲关联（{{marriageRelationNum}}）</p>
          <div class="main">
            <marriage-relation @getMarriageRelationNum="getMarriageRelationNum" ref="marriageRelation"></marriage-relation>
          </div>
        </div>
        <!-- 图谱关联 -->
        <div class="content-box">
          <p class="content-title">图谱关联（{{atlasRelationNum}}）</p>
          <div class="main">
            <atlas-relation @getAatlasRelationNum="getAatlasRelationNum" ref="atlasRelation"></atlas-relation>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import appHeader from "@/components/assembly/AppHeader";
import marriageRelation from "@/components/pedigreeDetail/components/MarriageRelation";
import atlasRelation from "@/components/pedigreeDetail/components/AtlasRelation";
import * as comApis from '@/api/common.js'
import D3Show from './components/D3Show'
export default {
  name:'PedigreeDetail',
  components: {
    appHeader,
    marriageRelation,
    atlasRelation,
    D3Show
  },
  data() {
    return {
      householdMapCount: 0,
      highRiskMapCount: 0,
      rootUserName: "",

      statusList: {
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false,
      },
      pedigreeName: this.$route.query.title,  
      archiveId:this.$route.query.archiveId,
      atlasRelationNum: 0,
      marriageRelationNum: 0,
      
    };
  },
  created() {
    this.getMapTotal();
  },
  methods: {
    getAatlasRelationNum(num) {
      this.atlasRelationNum = num;
    },
    getMarriageRelationNum(num) {
      this.marriageRelationNum = num;
    },
    // 跳转
    backArchives() {
      this.$router.push("./archives");
    },
    // 搜索
    toArchives (searchText) {
      this.$router.push({
        name:'Archives',
        query:{
          searchText:searchText
        }
      });
    },
    // 获取汇总数
    getMapTotal() {
      comApis.getMapTotal(this.$route.query.archiveId)
      .then(response => {
          if (response.code == 200) {
            this.householdMapCount =response.data.householdMapCount;
            this.highRiskMapCount =response.data.highRiskMapCount;
            this.rootUserName =response.data.rootUserName;
          } else {
            this.$Message.warning(response.message);
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
    },
    // // 全屏事件
    // handleWrapperClick(event) {
    //   this.$refs['appHeader'].statusList.uploadImg=false;
    //   this.$refs['appHeader'].statusList.personModalShow=false;
    //   this.$refs['appHeader'].statusList.newsModalShow=false;
    //   this.$refs['appHeader'].statusList.appModalShow=false;
    //   this.$refs['appHeader'].statusList.messageDetailsShow=false;
    //   this.$refs['appHeader'].statusList.guidelinesShow=false;
    //   this.$refs['appHeader'].statusList.feedbackShow=false;
    //   this.$refs['appHeader'].statusList.myNavModalShow=false;
    // }
  }
};
</script>

<style lang="less" scoped>
  @import './css/index.less';
</style>

