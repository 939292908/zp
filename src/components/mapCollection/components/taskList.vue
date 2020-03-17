<template>
  <!-- 采集任务信息 -->
  <div class="content">
    <div class="action-wrapper">
      <div class="btns">
        <!-- <i-button type="primary" icon="ios-add" @click.native="handleAddMapClick">新建图谱</i-button> -->
        <i-button v-if="hasFunAuth(constantFunMap.FUN_Collect_Task_Upload_ID)" type="primary" icon="ios-cloud-upload" @click.native="handleShowUploadClick">采集任务上传</i-button>
      </div>
      <!-- 查询条件区域 -->
      <div class="search">
        <span class="search-label">采集任务类型:</span>
        <span class="search-value">
          <!-- <Select class="search-control" v-model="filterObj.mapType">
            <Option value="beijing">New York</Option>
          </Select> -->
          <Select class="search-control" v-model="filterObj.mapType" style="width:280px;" @on-change="changeTaskType">
            <Option :title="item.taskName" v-for="(item,index) in mapTypeList" :value="item.value" :key="index">
              {{ item.taskName }}
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
          <!-- <DatePicker class="search-control" v-model="filterObj.datePicker" type="daterange" placement="bottom-end" placeholder="输入采集时间" @on-change="changeDate()"></DatePicker> -->
          <DatePicker class="search-control" :value="filterObj.datePicker" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="输入采集时间" @on-change="changeDate" style="width:190px;"></DatePicker>
        </span>
        <span class="search-label">搜索条件:</span>
        <span class="search-value">
          <i-input class="search-input search-control" icon="ios-search" v-model="filterObj.mapName" style="width:200px;" clearable placeholder="输入图谱关键字" @keyup.enter.native="search">
          </i-input>
        </span>
        <i-button type="primary" icon="ios-search" @click.native="search">确定</i-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <div ref="wrapperMain" class="wrapper">
      <div class="wrapper-detail" ref="wrapperDetail">
        <Tabs class="map-tabs" :active-key="tabActive" @on-click="handleTabsClick" :value="tabActive">
          <!-- <Tab-pane :name="item.key" :key="item.key" v-for="item in tabs" :label="item.label + '('+ item.total + ')'">
          </Tab-pane> -->
          <Tab-pane :index="index + 1" :name="item.key" :key="item.key" v-for="(item,index) in tabs" :label="item.label">
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
    <upload-file @initList="init" v-model="showUploadDialog"></upload-file>
  </div>
</template>
<script>
import uploadFile from '../components/uploadFile'
import * as apis from '@/api/system/userManager.js'
import { getTaskList,getTypeList } from '@/api/collection/index.js'
import { hasQuery } from '../../../tools/units.js'
import { mapMixin } from '../mixin/collectionMixin'
export default {
  name: 'taskList',
  components: {
    uploadFile,
  },
  mixins:[mapMixin],
  data() {
    return {
      loading:false,
      tableHeight:300,
      allTotal:0,
      draftTotal:0,
      processTotal:0,
      rejuseTotal:0,
      waitingTotal:0,
      approveTotal:0,
      tabActive:"9",
      data: [],
      resultData:[],
      stateList:[],
      path:this.$config.mainPath,
      pagination:{
        total:0,
        currentPageIndex:1,
        pageSize:20,
      },
      visible:false,
      mapTypeList: [],
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
        }
      ],
      showUploadDialog:false
    }
  },
  created() {
    this.getTaskTypeList();
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
    // tableData(){
    //   let  data = this.data.slice((this.currentPageIndex - 1) * this.pageSize, this.currentPageIndex * this.pageSize);
    //   return data;
    // },
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
      } else {
        this.tableHeight = 300
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
      if(this.stateList.length > 0) {
        tmp = tmp.filter(x=> {
          return this.stateList.indexOf(x.state + '') != -1
        })
      }

      this.pagination.currentPageIndex = 1;
      this.data = tmp;
      this.pagination.total = tmp.length;
      this.getData();
    },
    getTaskTypeList () {
      getTypeList().then((res)=>{
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
        keyWord: this.filterObj.mapName,
        // taskName: this.filterObj.mapType
        taskNameMappingId: this.filterObj.mapType
      };
      // var param = [];
      // param.append('startTime',this.filterObj.datePicker[0]);
      // param.append('endTime',this.filterObj.datePicker[1]);
      // param.append('pageIndex',this.currentPageIndex);
      // param.append('pageSize',this.pageSize);
      // param.append('state',this.tabActive);
      // param.append('taskMapName','');
      // param.append('taskName','');
      getTaskList(param).then(res=>{
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
    // 时间变化
    changeDate (date) {
      this.filterObj.datePicker = date;
      //this.filterObj.datePicker[1] = date[1].substr(0,11)+'23:59:59'
    },
    // 改变任务类型获取数据
    changeTaskType (value) {
      this.filterObj.mapType = value;
      this.getData();
    },
    // 改变审核状态获取数据
    changeStatus (value) {
      this.tabActive = value;
      this.getData();
    },
    // 点击新建图谱按钮事件
    handleAddMapClick() {

    },
    // 点击上传按钮事件
    handleShowUploadClick() {
      this.showUploadDialog = true;
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
      this.pagination.currentPageIndex = 1;
      this.tabActive = name;
      this.getData();
      console.log(name,190);
    },
    /**
     * 查看\编辑按钮事件
     */
    handleViewClick(row, index,vType) {
      this.$router.push({
        path:'collectDetail',
        query:{
          type:this.$route.query.type,//图谱还是人员任务（1：人员，2：图谱，0：任务）
          id:row.taskId,
          vType:vType//vType(1:查看，2：编辑，3：审核)
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

    },
  }
}
// 设置列名
function setColumns(obj) {
  var columns = [
    {
      title: '采集任务类型',
      key: 'taskName'
    },
    {
      title: '任务名称',
      key: 'taskMapName',
      width: '350px',
    },
    {
      title: '采集人单位',
      key: 'deptName'
    },
    {
      title: '采集人姓名',
      key: 'createName'
    },
    {
      title: '采集时间',
      key: 'createTime',
      sortable: true,
    },
    {
      title: '审核状态',
      key: 'stateLabel',
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
      width:'160px',
      render:(h, params) => {
        // if(ture) return ();
        //vType(1:查看，2：编辑，3：审核)
        // <i-button size="small" type="text" on-click={ ($event) => obj.handleViewClick(params.row, params.index,'2') }>编辑</i-button>
        //  <i-button size="small" type="text" on-click={ ($event) => obj.handleDeleteClick(params.row, params.index) }>删除</i-button>
        return (
          <span >
            <i-button size="small" type="info" on-click={ ($event) => obj.handleViewClick(params.row, params.index,'1') }>查看</i-button>
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
    // {key:'0',label:'全部',total:obj.allTotal},
    // {key:'1',label:'草稿',total:obj.draftTotal},
    // {key:'2',label:'流转中',total:obj.processTotal},
    // {key:'3',label:'已退回',total:obj.rejuseTotal},
    // {key:'4',label:'待审核',total:obj.waitingTotal},
    // {key:'5',label:'已通过',total:obj.approveTotal}
    {key:'9',label:'全部',total:obj.allTotal},
    {key:'0',label:'草稿',total:obj.draftTotal},
    {key:'1',label:'审核中',total:obj.processTotal},
    {key:'2',label:'已通过',total:obj.approveTotal}
  ];
  var tmp = [];
  var role = '0'
  switch(role) {
    case '0':
      tmp = tabs.filter(x=>{
        return x.key != '4'
      })
      break;
    case '1':
      tmp = tabs.filter(x=>{
        return ['0','4','5'].indexOf(x.key) != -1
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

<style lang="less">
  .ivu-message{
    z-index:10018;
  }
  .action-wrapper{
    .ivu-select-dropdown::-webkit-scrollbar{width:6px;height:6px;}
    .ivu-select-dropdown::-webkit-scrollbar-track{border-radius:5px;background:none;}
    .ivu-select-dropdown::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
    .ivu-select-dropdown::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
    .ivu-select-dropdown::-webkit-scrollbar-corner{background-color:#dadada;}
  }
</style>

