<template>
  <!-- 基础人员管理列表 -->
  <div class="content">
    <div class="action-wrapper">
      <div class="btns">
        <!-- <i-button type="primary" icon="ios-add" @click.native="handleAddMapClick">新建图谱</i-button> -->
        <!-- <i-button type="primary" icon="ios-cloud-upload" @click.native="handleShowUploadClick">采集任务上传</i-button> -->
      </div>
      <!-- 查询条件区域 -->
      <div class="search">              
        <span class="search-label">采集时间:</span>
        <span class="search-value">
          <DatePicker class="search-control" v-model="filterObj.datePicker" type="daterange" placement="bottom-end" placeholder="输入采集时间"></DatePicker>
        </span>
        <span class="search-label">姓名:</span>
        <span class="search-value">
          <i-input class="search-input search-control" icon="ios-search" v-model="filterObj.mapName" clearable placeholder="输入图谱关键字" @keyup.enter.native="search">
          </i-input>
        </span>
        <i-button type="primary" icon="ios-search" @click.native="search">确定</i-button>
      </div>        
    </div>
    <!-- 表格区域 -->
    <div ref="wrapperMain" class="wrapper">
      <div class="wrapper-detail" ref="wrapperDetail">
        <Tabs class="map-tabs" :active-key="tabActive" @on-click="handleTabsClick">
          <Tab-pane :index="index + 1" :name="item.key" :key="item.key" v-for="(item,index) in tabs" :label="item.label + '('+ item.total + ')'">          
          </Tab-pane>
        </Tabs>
        <div class="result-table">              
          <i-table ref="table" stripe  :height="tableHeight" :columns="columns" :data="tableData"></i-table>
        </div>
        <div class="result-table-page">
          <!-- <div> -->
            <Page class="table-page-small" :total="total" size="small" :current="currentPageIndex" :page-size="pageSize" show-total show-elevator @on-change="handlePageChange"></Page>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as apis from '@/api/system/userManager.js'
import { hasQuery } from '../../../tools/units.js'
import { mapMixin } from '../mixin/collectionMixin'
export default {
  name: 'personList',
  components: {
  },  
  mixins:[mapMixin],
  data() {
    return {
      tableHeight:300,
      allTotal:0,
      draftTotal:0,
      processTotal:0,
      rejuseTotal:0,
      waitingTotal:0,
      approveTotal:0,
      tabActive:"1",
      data: [],
      resultData:[],
      total:0,
      currentPageIndex:1,
      pageSize:10,
      filterObj:{
        mapType:'',
        approveState:'',
        datePicker:[],
        mapName:""
      },
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {    
    this.resizeHandler();
    this.init();
    window.onresize = this.getTableHeight;
  },
  computed:{
    tabs() {
      return setTabs(this);
    },
    columns() {
      return setColumns(this)
    },
    tableData(){
      let  data = this.data.slice((this.currentPageIndex - 1) * this.pageSize, this.currentPageIndex * this.pageSize);
      return data;
    },
  },
  methods:{
    init() {
      this.getData();
    },
    getTableHeight() {
      // 如果表格超出容器，将容器高设为表格高
      if(this.$refs.wrapperMain) {
        let mainH = this.$refs.wrapperMain.offsetHeight-120;
        let tbodyH = document.querySelector('.ivu-table-tbody').offsetHeight;
        if (tbodyH > mainH) {
          this.tableHeight = mainH;
        }
      }      
    },
    /**
     * 查询用户列表
     * @author julie
     */
    search() {      
      let filterObj = this.filterObj;
      let tmp = this.resultData;
      if(this.textFilter) {
        tmp = tmp.filter(x=> {
          return hasQuery(x.userName,this.textFilter)
              || hasQuery(x.userCode,this.textFilter)
              || hasQuery(x.userAccount,this.textFilter)
              || hasQuery(x.userDeptName,this.textFilter)
        })
      } 
      this.currentPageIndex = 1;
      this.data = tmp;
      this.total = tmp.length
    },
    /**
     * 获取用户列表数据
     * @author julie
     */
    getData() {
      let param = {

      }
      apis.getUserList().then(res=>{
        if(res.code != 200) return;
        let data = res.data.forEach(x=>{
          if(x.state == 1) {
            x._disabled = true;
          } else {
            x._disabled = false;
          }
        })
        this.data = res.data
        this.resultData = res.data;
        this.total  = res.data.length;
        this.allTotal = res.data.length;
      })
    },
    handlePageChange(pageIndex) {
      this.currentPageIndex = pageIndex;   
    },
    /**
     * Tab选项卡点击事件
     */
    handleTabsClick(name) {
      // 切换选项卡的时候清除查询条件
      this.filterObj = {
        mapType:'',
        approveState:'',
        datePicker:[],
        mapName:""
      }
      this.tabActive = name;
      console.log('tabActive',name)
    },
    /**
     * 查看按钮事件
     */
    handleViewClick(row, index,vType) {
      this.$router.push({
        path:'collectDetail',
        query:{
          type:this.$route.query.type,//图谱还是人员任务（1：人员，2：图谱，0：任务）
          id:'',
          vType:vType//vType(1:查看，2：编辑，3：审核)
        }
      })
    },
    /**
     * 编辑按钮事件
     */
    handleEditClick(row, index) {
      this.$router.push({
        path:'collectDetail',
        query:{
          type:'2',//图谱还是人员任务（1：人员，2：图谱，0：任务）
          id:'',
          vType:2//vType(1:查看，2：编辑，3：审核)
        }
      })
    },
    /**
     * 删除按钮事件
     */
    handleDeleteClick(row, index) {
      let content = '您确定要删除图谱信息吗？'
      this.$Modal.confirm({
        title: '消息',
        content: content,
        onOk: () => {          
          this._deleteMapFun(row);
        },
        onCancel: () => {       
        }
      });
    },
    /**
     * 删除图谱信息的方法
     */
    _deleteMapFun(selection) {

    }    
  }
}
// 设置列名
function setColumns(obj) {
  var columns = [
    {
      title: '采集人姓名',
      key: 'userCode'
    },
    {
      title: '人员简介',
      key: 'userAccount'
    },
    {
      title: '列表人员数',
      key: 'userDeptName',
      sortable: true,
    },
    {
      title: '采集时间',
      key: 'userDeptName'
    },
    {
      title: '采集人姓名',
      key: 'userDeptName'
    },
    {
      title: '采集人单位',
      key: 'userDeptName'
    },
    {
      title: '操作',
      key: 'state',
      width:'160px',
      render:(h, params) => {
        // if(ture) return ();
        // <i-button size="small" type="text" on-click={ ($event) => obj.handleEditClick(params.row, params.index) }>编辑</i-button>
        return (
          <span style="margin-left: -8px;">
            {
              obj.hasFunAuth(obj.constantFunMap.FUN_Collect_PersonList_View_ID) ?
                <i-button size="small" type="info" on-click={ ($event) => obj.handleViewClick(params.row, params.index,'1') }>查看</i-button>
              : ''
            }
            {
              obj.hasFunAuth(obj.constantFunMap.FUN_Collect_PersonList_Delete_ID) ?
                <i-button style="margin-left: 6px;" size="small" type="error" on-click={ ($event) => obj.handleDeleteClick(params.row, params.index) }>删除</i-button>
              : ''
            }            
          </span>
        );
      }
    }
  ];
  return columns;
}
// 设置Tabs
function setTabs(obj) {
  var tabs = [
    {key:'1',label:'全部',total:obj.allTotal},
    {key:'2',label:'草稿',total:obj.draftTotal},
    {key:'3',label:'流转中',total:obj.processTotal},
    {key:'4',label:'已退回',total:obj.rejuseTotal},
    {key:'5',label:'待审核',total:obj.waitingTotal},
    {key:'6',label:'已通过',total:obj.approveTotal}
  ];
  var tmp = [];
  var role = '3'
  switch(role) {
    case '1':
      tmp = tabs.filter(x=>{
        return x.key != '5'
      })
      break;
    case '2':
      tmp = tabs.filter(x=>{
        return ['1','5','6'].indexOf(x.key) != -1
      })
      break;
    case '3':
      tmp = tabs.filter(x=>{
        return ['1'].indexOf(x.key) != -1
      })
      break;
    default:
      tmp = tabs;
      break;
  }
  return tmp;
}

</script>
<style lang="less" scoped>
@import '../css/style.less';
</style>