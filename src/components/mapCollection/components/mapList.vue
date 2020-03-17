<template>
  <!-- 图谱审核列表 -->
  <div class="content">
    <div class="action-wrapper">
      <div class="btns">
        <!-- <i-button type="primary" icon="ios-add" @click.native="handleAddMapClick">新建图谱</i-button> -->
        <!-- <i-button type="primary" icon="ios-cloud-upload" @click.native="handleShowUploadClick">采集任务上传</i-button> -->
      </div>
      <!-- 查询条件区域 -->
      <div class="search">
        <span class="search-label">图谱类型:</span>
        <span class="search-value">
            <Select class="search-control" v-model="filterObj.mapType" @on-change="changeMapType" style="width:300px;">
                <Option :title="item.NAME" v-for="(item,index) in mapTypeList" :value="item.VALUE" :key="index">
                  {{ item.NAME }}
                </Option>
              </Select>
        </span>
        <span class="search-label">审核状态:</span>
        <span class="search-value">
          <Select class="search-control" v-model="tabActive" style="width:100px;" @on-change="changeStatus">
            <Option :title="item.statusName" v-for="(item,index) in statusList" :value="item.value" :key="index">
              {{ item.statusName }}
            </Option>
        </Select>
        </span>
        <span class="search-label">采集时间:</span>
        <span class="search-value">
          <DatePicker class="search-control" v-model="filterObj.datePicker" format="yyyy-MM-dd" style="width:300px;" type="daterange" placement="bottom-end" @on-change="changeDate" placeholder="输入采集时间"></DatePicker>
        </span>
        <span class="search-label">图谱名称:</span>
        <span class="search-value">
          <i-input class="search-input search-control" icon="ios-search" style="width:350px;" v-model="filterObj.mapName" clearable placeholder="输入图谱关键字" @keyup.enter.native="search">
          </i-input>
        </span>
        <i-button type="primary" icon="ios-search" @click.native="search">确定</i-button>
      </div>        
    </div>
    <!-- 表格区域 -->
    <div ref="wrapperMain" class="wrapper">
       <div class="wrapper-detail" ref="wrapperDetail"><!--{{tabs.length}}-{{pagination.total}}-{{tabs}}-{{params}} -->
        <Tabs class="map-tabs" :active-key="tabActive"  :value="tabActive" @on-click="handleTabsClick">
          <!-- <Tab-pane :name="item.key" :key="item.key" v-for="item in tabs" :label="item.label + '('+ item.total + ')'">          
          </Tab-pane> -->
          <Tab-pane :index="index+1" :name="item.key"  :key="item.key" v-for="(item, index) in tabs" :label="item.label">          
            </Tab-pane>
        </Tabs>
        <div class="result-table">              
          <i-table ref="table" stripe  :height="tableHeight" :columns="columns" :data="data"></i-table>
        </div>
        <div class="result-table-page">
          <!-- <div> -->
            <Page class="table-page-small" :total="pagination.total" size="small" :current="pagination.currentPageIndex" :page-size="pagination.pageSize" show-total show-elevator @on-change="handlePageChange"></Page>
          <!-- </div> -->
        </div>
      </div>
    </div>    
  </div>
</template>
<script>
import * as apis from '@/api/collection/index.js'
import { hasQuery } from '../../../tools/units.js'
import { mapMixin } from '../mixin/collectionMixin'
export default {
  name: 'mapList',
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
      tabActive:"9",
      params:{},
      data: [],
      mapTypeList: [],
      resultData:[],
      pagination:{
        total:0,
        currentPageIndex:1,
        pageSize:20,   
      },
      filterObj:{
        mapType:'',
        approveState:'9',
        datePicker:[],
        mapName:""
      }, 
      statusList: [
        {
          value: '9',
          statusName: '全部'
        },
        {
          value: '0',
          statusName: '草稿'
        },
        {
          value: '1',
          statusName: '审核中'
        },
        {
          value: '2',
          statusName: '已通过'
        },
        {
          value: '3',
          statusName: '待审批'
        }
      ]  
    }
  },
  created() {
    this.getAllMapTypeList();
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
     }
     //,
    // tableData(){
    //   let  data = this.data.slice((this.pagination.currentPageIndex - 1) * this.pagination.pageSize, this.pagination.currentPageIndex * this.pagination.pageSize);
    //   return data;
    // }
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
      this.pagination.currentPageIndex = 1;
      this.data = tmp;
      this.pagination.total = tmp.length;
      this.getData();
    },
    /**
     * 获取用户列表数据
     * @author julie
     */
    getData() {
      let param = {
        startTime: this.filterObj.datePicker[0],
        endTime: this.filterObj.datePicker[1],
        pageIndex: this.pagination.currentPageIndex,
        pageSize: this.pagination.pageSize,
        state: this.tabActive,
        // taskMapName: this.filterObj.mapName,
        keyWord: this.filterObj.mapName
      };
      this.params=param;
      console.log("param="+JSON.stringify(param));
      apis.getCollectMapList(param).then(res=>{
        if(res.code != 200) return;
        let data = res.data.data.forEach(x=>{
          if(x.state == 1) {
            x._disabled = true;
          } else {
            x._disabled = false;
          }
        })
        this.data = res.data.data;
        this.resultData = res.data.data;
        this.pagination.total  = res.data.total;
      })
    },
    getAllMapTypeList () {
      apis.getAllMapType().then((res)=>{
        if(res.code == 200) {
          var result= res.data;
          result.forEach(function(item){
            item.value = item.id;
          })
          this.mapTypeList = result;     
        } else {
          this.mapTypeList = []
        }
      })
    },
    changeDate (date) {
      this.filterObj.datePicker = date;
      //this.filterObj.datePicker[1] = date[1].substr(0,11)+'23:59:59'
    },
    // 改变图谱类型获取数据
    changeMapType (value) {
      this.filterObj.mapType = value;
      //this.getData();
      if(this.tabActive ==3){
        this.getPendApprovalData();
      }else{
        this.getData();
      }
    },
    // 改变审核状态获取数据
    changeStatus (value) {
      this.tabActive = value;
      if(this.tabActive ==3){
        this.getPendApprovalData();
      }else{
        this.getData();
      } 
    },
    handlePageChange(pageIndex) {
      this.pagination.currentPageIndex = pageIndex;   
      this.getData();
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
      if(this.tabActive ==3){
        this.getPendApprovalData();
      }else{
        this.getData();
      }
    },
    /**
     * 审批按钮事件
     */
    handleApproveClick(row, index,vType) {
      this.$router.push({
        path:'collectDetail',
        query:{
          type:this.$route.query.type,//图谱还是人员任务（1：人员，2：图谱，0：任务）
          id:row.collectId,
          vType:vType//vType(1:查看，2：编辑，3：审核)
        }
      });
    },
    /**
     * 获取待审批数据
     */
    getPendApprovalData() {
      let param = {
        startTime: this.filterObj.datePicker[0],
        endTime: this.filterObj.datePicker[1],
        pageIndex: this.pagination.currentPageIndex,
        pageSize: this.pagination.pageSize,
        state: this.tabActive,
        mapType: this.filterObj.mapType,
        keyWord: this.filterObj.mapName
      };
      this.params=param;
      console.log("param="+JSON.stringify(param));
      apis.getApproval(param).then(res=>{
        if(res.code != 200) return;
        let data = res.data.data.forEach(x=>{
          if(x.state == 1) {
            x._disabled = true;
          } else {
            x._disabled = false;
          }
        })
        this.data = res.data.data;
        this.resultData = res.data.data;
        this.pagination.total  = res.data.total;
      })
    }
  }
}
// 设置列名
function setColumns(obj) {
  var columns = [
    {
      title: '图谱名称',
      key: 'mapName',
      width: '350px'
    },
    {
      title: '图谱类型',
      key: 'mapTypeName'
    },
    {
      title: '图谱人员数',
      key: 'personCount',
      sortable: true,
    },
    {
      title: '图谱关系数',
      key: 'relationCount',
      sortable: true,
    },
    {
      title: '采集时间',
      key: 'createTime',
      sortable: true,
    },
    {
      title: '采集人姓名',
      key: 'creater',
      sortable: true,
    },
    {
      title: '采集人单位',
      key: 'deptName',
      sortable: true,
    },
    {
      title: '审核状态',
      key: 'state',
      render:(h, params) => {
        let row = params.row;
        let color = {
          '1':'#3795E3',
          '0':'#4A9450'
        }
        return (
          <span data={row.state} style={'color:' + color[row.state]}>{row.state}</span>
        )
      }
    },
    {
      title: '操作',
      key: 'state',
      width:'100px',
      render:(h, params) => {
        return (
          <span style="margin-left: -8px;">
            {
              obj.hasFunAuth(obj.constantFunMap.FUN_Collect_List_View_ID) ?
                <i-button size="small" type="info" on-click={ ($event) => obj.handleApproveClick(params.row, params.index,'3') }>查看</i-button>
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
    {key:'9',label:'全部',total:obj.allTotal},
    {key:'0',label:'草稿',total:obj.draftTotal},
    {key:'1',label:'审核中',total:obj.processTotal},
    {key:'2',label:'已通过',total:obj.approveTotal},
    {key:'3',label:'待审批',total:obj.approveTotal}
  ];
  // var tmp = [];
  // var role = '2'
  // switch(role) {
  //   case '1':
  //     tmp = tabs.filter(x=>{
  //       return x.key != '5'
  //     })
  //     break;
  //   case '2':
  //     tmp = tabs.filter(x=>{
  //       return ['1','5','6'].indexOf(x.key) != -1
  //     })
  //     break;
  //   default:
  //     tmp = tabs;
  //     break;
  // }
  // return tmp;
  return tabs;
}

</script>
<style lang="less" scoped>
@import '../css/style.less';
</style>