<template>
  <!-- 人员基础信息 -->
  <div class="collection-person">
    <!-- 表格 -->
    <div class="result-table">              
      <i-table ref="table" stripe  :height="setTableHeight" :columns="columns" :data="tableData"></i-table>
    </div>
    <div class="result-table-page">
      <Page class="table-page-small" :total="total" size="small" :current="currentPageIndex" :page-size="pageSize" show-total show-elevator @on-change="handlePageChange"></Page>
    </div>
  </div>
</template>
<script>
import { mapMixin } from '../mixin/collectionMixin'
export default {
  name:"CollectionPerson",
  mixins:[mapMixin],
  props:{
    // 默认显示预览图谱的效果
    //vType(1:查看，2：编辑，3：审核)
    vType:{
      type:String,
      default:'1'
    },
    // 查看的数据的key值
    id:{
      type:String,
      default:''
    },
    tableHeight:{
      type:Number,
      default:300
    }
  },
  data() {
    return {
      model:null,
      total:0,
      currentPageIndex:1,      
      pageSize:10,
      data: [],
      resultData:[],
    }
  },
  computed:{
    columns() {
      return setColumns(this)
    },
    tableData(){
      let  data = this.data.slice((this.currentPageIndex - 1) * this.pageSize, this.currentPageIndex * this.pageSize);
      return data;
    },
    setTableHeight() {
      if(this.$route.query.type == '1') {
        return this.tableHeight + 50;
      } else {
        return this.tableHeight
      }
    }
  },
  methods:{
    init() {
        this.getData();
    },
    // 获取数据
    getData() {

    },
    // 切换页事件
    handlePageChange(pageIndex) {
      this.currentPageIndex = pageIndex;   
    },    
  }
}
// 设置列名
function setColumns(obj) {
  var columns = [
    {
      title: '姓名',
      key: 'userCode'
    },
    {
      title: '身份证号',
      key: 'userAccount'
    },
    {
      title: '性别',
      key: 'userDeptName',
      sortable: true,
    },
    {
      title: '族别',
      key: 'userDeptName'
    },
    {
      title: '户籍地',
      key: 'userDeptName'
    },
    {
      title: '现住址',
      key: 'userDeptName'
    },
    {
      title: '服务场所',
      key: 'userDeptName'
    },
    {
      title: '职业',
      key: 'userDeptName'
    },
    {
      title: '政治面貌',
      key: 'userDeptName'
    },
    {
      title: '五位一体属性',
      key: 'userDeptName'
    },
  ];
  return columns;
}
</script>
<style lang="less" scoped>
@import '../css/style.less';
</style>
