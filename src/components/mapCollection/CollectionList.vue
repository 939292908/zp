<template>
  <div class="collection-container m-container" @click="handleWrapperClick($event)">
    <app-header 
      ref="appHeader"
      :items="statusList" 
      :title="$route.query.title" 
      :showSearch=false>
      <span @click="backCollection()" style="cursor:pointer;">图谱采集></span>
    </app-header>
    <!-- 中间内容区域 -->
    <component :is="currentTabComponent"></component>
  </div>
</template>
<script>
import appHeader from '@/components/assembly/AppHeader'
import uploadFile from './components/uploadFile'
import { mapMixin } from './mixin/collectionMixin'
import taskList from './components/taskList'
import mapList from './components/mapList'
import personList from './components/personList'
export default {
  name: 'CollectionList',
  components: {
    appHeader,
    uploadFile,
    taskList,
    mapList,
    personList
    // 'taskList':()=>import('./components/taskList'),//采集任务组建
    // 'mapList':()=>import('./components/mapList'),//图谱管理
    // 'personList':()=>import('./components/personList'),//人员列表
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
    }
  },
  mounted() {
    this.init();
  },
  computed:{
    // 根据路由参数类型显示当前的组件信息
    currentTabComponent() {
      let type = this.$route.query.type || '0';
      return this.pageTypes.find(x=>{
        return x.query.type == type
      }).component;
    }
  },
  methods:{
    init() {
      
    },    
  }
}

</script>
<style lang="less" scoped>
@import './css/style.less';
</style>