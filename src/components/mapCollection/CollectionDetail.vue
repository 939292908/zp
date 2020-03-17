<template>
  <div class="collection-container m-container" @click="handleWrapperClick($event)">
    <app-header 
      :items="statusList" 
      title="详情" 
      :showSearch=false>
      <span @click="backCollection()" style="cursor:pointer;">图谱采集></span>
      <span @click="backList()" style="cursor:pointer;">{{parentPageTitle}}></span>
    </app-header>
    <div class="content-detail">
      <div class="wrapper">        
        <div class="wrapper-detail" ref="wrapperDetail" style="padding: 4px 0;">
          <div class="wrapper-title">
            <!-- {{collectionName}} -->
          </div>
          <Tabs 
            v-if="$route.query.vType == '3'"             
            class="map-tabs" 
            :active-key="tabActive" 
            @on-click="handleTabsClick">
            <Tab-pane :index="index+1" :name="item.key" :key="item.key" v-for="(item, index) in tabs" :label="item.label">          
            </Tab-pane>
          </Tabs>
          <div class="wrapper-content" :style="{top:$route.query.vType == '3' ? '110px':'60px'}">            
            <component :is="currentTabComponent" keep-alive v-bind="currentTabComponentProps"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appHeader from '@/components/assembly/AppHeader'
import switchView from '@/components/assembly/SwitchView'
import SideBar from '@/components/assembly/Sidebar'
import switchRightView from '@/components/assembly/SwitchRightView'
import * as apis from '@/api/system/userManager.js'
import { hasQuery } from '../../tools/units.js'
import { mapMixin } from './mixin/collectionMixin'
import { getTaskListDetails } from '@/api/collection/index.js'
export default {
  name: 'Permission',
  components: {
    switchView,
    switchRightView,
    SideBar,
    appHeader,
    // collectionMap
    'collectionMap':()=>import('./components/collectionMapBasic'),
    'collectionPerson':()=>import('./components/collectionPersonBasic')
  },
  mixins:[mapMixin],  
  data() {
    return {
      taskId: this.$route.query.id,
      loading:false,
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
      tabActive:"1", 
      path:this.$config.mainPath,
      visible:false,
      collectionName:'地木拉提家族图谱',
      tableHeight:300
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler(160))
  },
  mounted() {    
    this.resizeHandler(160);
    this.init();
  },
  computed:{
    tabs() {
      return setTabs(this);
    },
    currentTabComponent() {
      let type = this.tabActive;
      if(this.$route.query.type == '1'){//
        type = '2'
      } 
      return this.tabs.find(x=>{
        return x.key == type
      }).component
    },
    currentTabComponentProps() {
      return {
        id:this.$route.query.id,
        vType:this.$route.query.vType,//vType(1:查看，2：编辑，3：审核)
        tableHeight:this.tableHeight
      }
    },
    parentPageTitle(){
      let query = this.pageTypes.find(x=>{
        return x.query.type == this.$route.query.type
      });
      return query.query.title
    }
  },
  methods:{
    init() {
    },
    /**
     * Tab选项卡点击事件
     */
    handleTabsClick(name) {
      this.tabActive = name;
      console.log('tabActive',name)
    },    
  }
}
// 设置Tabs
function setTabs(obj) {
  var tabs = [
    {key:'1',label:'图谱信息',component:'collectionMap'},
    {key:'2',label:'人员信息',component:'collectionPerson'}
  ];
  return tabs;
}

</script>
<style lang="less" scoped>
@import './css/style.less';
/deep/ .ivu-form-item{
  margin-bottom: 8px;
}
/deep/ .map-tabs{
  .ivu-tabs-nav-scroll{
    padding: 0 15px;
  }
}
</style>