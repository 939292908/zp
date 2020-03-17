<template>
  <!-- 图谱任务信息 -->
  <div class="collection-form">
    <!-- 表单 -->
    <Row style="margin-bottom:15px;">
      <i-form ref="formItem" :model="formItem" :rules="rule" :label-width="100">        
        <Row>
          <!-- <Col :span="colSpan">
            <Form-item label="图谱编号:" prop="userAccount">
              <span class="input-value" v-if="isView">{{formItem.collectTask.}}</span>
              <i-input v-else v-model="formItem.userAccount" :maxlength=25 placeholder="请输入账号"></i-input>
            </Form-item> 
          </Col> -->
            <Col :span="colSpan">
              <Form-item label="图谱名称:" prop="collectTask.mapName">
                <span class="input-value" v-if="isView">{{formItem.collectTask.mapName}}</span>
                <i-input v-else v-model="formItem.collectTask.mapName" :maxlength=25 placeholder="请输入账号"></i-input>
              </Form-item>
            </Col>
            <Col :span="colSpan">
              <Form-item label="图谱类型:" prop="collectTask.mapTypeName">
                <span class="input-value" v-if="isView">{{formItem.collectTask.mapTypeName}}</span>
                <Select v-else v-model="formItem.collectTask.mapTypeName">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </Form-item>
            </Col>
            <Col :span="colSpan">
            <Form-item label="主人员姓名:" prop="userAccount">
              <span class="input-value" v-if="isView">{{formItem.collectTask.corePersonName}}</span>
              <i-input v-else v-model="formItem.collectTask.corePersonName" :maxlength=25 placeholder=""></i-input>
            </Form-item>
          </Col>
          <Col :span="colSpan">
            <Form-item label="主人员身份证:" prop="collectTask.corePersonIdNumber">
              <span class="input-value" v-if="isView">{{formItem.collectTask.corePersonIdNumber}}</span>
              <i-input v-else v-model="formItem.collectTask.corePersonIdNumber" :maxlength=25 placeholder=""></i-input>
            </Form-item>
          </Col>
        </Row>
        <Row>
            <Col :span="colSpan">
              <Form-item label="图谱人员数:" prop="collectTask.personCount">
                <span class="input-value" v-if="isView">{{formItem.collectTask.personCount}}</span>
                <!-- <i-input v-model="formItem.userAccount" :maxlength=25 placeholder="请输入账号"></i-input> -->
              </Form-item> 
            </Col>
          <Col :span="colSpan">
            <Form-item label="图谱关系数:" prop="collectTask.relationCount">
              <span class="input-value" v-if="isView">{{formItem.collectTask.relationCount}}</span>
              <!-- <i-input v-model="formItem.userAccount" :maxlength=25 placeholder="请输入账号"></i-input> -->
            </Form-item>
          </Col>
          <Col :span="colSpan">
            <Form-item label="采集时间:" prop="collectTask.createTime">
              <span class="input-value" v-if="isView">{{formItem.collectTask.createTime}}</span>
              <!-- <i-input v-model="formItem.userAccount" :maxlength=25 placeholder="请输入账号"></i-input> -->
              <!-- <DatePicker type="date" v-model="formItem.userDeptName" placeholder="采集时间"></DatePicker> -->
            </Form-item>
          </Col>
          <Col :span="colSpan">
            <Form-item label="采集人姓名:" prop="collectTask.creater">
              <span class="input-value" v-if="isView">{{formItem.collectTask.creater}}</span>
              <!-- <i-input v-model="formItem.userAccount" :maxlength=25 placeholder="请输入账号"></i-input> -->
            </Form-item> 
          </Col>
        </Row> 
        <Row>
            <Col span="24">
              <Form-item label="采集人单位:" prop="collectTask.deptName">
                <span class="input-value" v-if="isView">{{formItem.collectTask.deptName}}</span>
                <!-- <i-input v-model="formItem.userAccount" :maxlength=25 placeholder="请输入账号"></i-input> -->
              </Form-item>
            </Col>
        </Row> 
        <Row>
          <Col span="24">
            <Form-item label="图谱说明:" prop="userDeptName">
              <span class="input-value" v-if="isView">{{formItem.collectTask.mapDescription}}</span>
              <Input v-else v-model="formItem.collectTask.mapDescription" type="textarea" placeholder="图谱说明..." />
            </Form-item>
          </Col>
        </Row>
      </i-form>
    </Row>
    <!-- 表格 -->
    <Row>
      <div class="result-table">              
        <i-table ref="table" stripe  :height="tableHeight" :columns="columns" :data="relations"></i-table>
      </div>
      <div class="result-table-page">
        <Page class="table-page-small" :total="total" size="small" :current="currentPageIndex" :page-size="pageSize" show-total show-elevator @on-change="handlePageChange"></Page>
      </div>
    </Row>
    <!-- 操作按钮 -->
    <Row>
      <div class="detail-footer">
        <i-button @click.native="backList">返回</i-button>
        <i-button type="primary" v-if="vType == '2'" @click.native="handleSaveClick">保存</i-button>
        <i-button type="primary" v-if="vType == '3'" @click.native="handleRejectClick">驳回</i-button>
        <i-button type="primary" v-if="vType == '3'" @click.native="handleApproveClick">同意</i-button>
      </div>
    </Row>
    <!-- 审批意见 -->
    <approvePane 
      v-model="showApproveDialog" 
      :title="approveTitle" 
      :item="approveItem"
      @ok-callback="handleApproveCallback"></approvePane>
  </div>
</template>
<script>
import { mapMixin } from '../mixin/collectionMixin'
import { getTaskListDetails, getCollectMapDetail } from '@/api/collection/index.js'
export default {
  name:"CollectionMap",
  mixins:[mapMixin],
  props:{
    // 默认显示预览图谱的效果
    //vType(1:查看，2：编辑，3：审核)
    vType:{
      type:[String,Number],
      default:'1'
    },
    // 查看的数据的key值
    id:{
      type:String,
      default:''
    }
  },
  components:{
    'approvePane':()=>import('./approvePane')
  },
  data() {
    var  validateIdNumber = function(rule, value, callback){
      if(!value){
        return callback(new Error("请输入身份证号"));
      }else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)){
        return callback(new Error("身份证格式不正确"))
      }else{
        callback();
      }
    };
    return {
      taskId: this.$route.query.id,
      collectId: this.$route.query.id,
      allData: [],
      colSpan:6,
      model:null,
      total:0,
      currentPageIndex:1,      
      pageSize:10,
      data: [],
      resultData:[],
      tableHeight:300,
      formItem: {
        idNumber: '',//身份证号
        userAccount: '',//账号
        userCode: '',//警号
        userDeptId: '',//部门id
        userDeptName: '',//部门名称
        userId: '',//用户id
        userName: '',//用户名
        state: true, //账号状态
        collectTask: {
          collectId: "8b9a345e74391ff4e055000000000001",
          createTime: "2019-06-18 21:36:48",
          creater: "蓝灯",
          deptName: null,
          mapDescription: "包括头面人物历史背景，思想来源，脉络体系，影响区域，感染人数，社会危害等一个总体概述",
          mapName: "乃孜尔的宗教极端思想传承图",
          mapTypeName: "宗教极端思想传承图",
          personCount: 8,
          relationCount: 8,
          state: "审核中",
          taskMapName: "1县2乡3村乃孜尔11的宗教极端思想传承图(关系采集表)"
        }
      },
      relations: [],
      rule: {
        idNumber: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          {validator: validateIdNumber,trigger: 'blur'}
        ],
        userAccount: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        userCode: [
          { required: true, message: '警号不能为空', trigger: 'blur' }
        ],
        userDeptName: [
          { required: true, message: '部门不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
      },
      approveItem:null,//审批信息
      approveTitle:"",//审批标题
      showApproveDialog:false,
    }
  },
  created () {
    this.getDetail();
  },
  computed:{
    isView() {
      return this.vType == '1' || this.vType == '3'
    },
    columns() {
      return setColumns(this)
    },
    tableData(){
      // let  data = this.data.slice((this.currentPageIndex - 1) * this.pageSize, this.currentPageIndex * this.pageSize);
      // return data;
    }
  },
  methods:{
    //获取详情数据
    getDetail () {
      //  采集任务列表 详情(vType == 1)
      if (this.vType == 1) {
        var id = this.taskId;
        getTaskListDetails(id).then((res)=>{
          if (res.code == 200) {
            var result= res.data;
            this.formItem.collectTask = result.collectMapVM;
            // this.relations = result.relations;
            this.allData = result.relations;
            this.total = result.relations.length;
            this.relations = this.allData.slice((this.currentPageIndex - 1) * this.pageSize, this.currentPageIndex * this.pageSize);
          } else {
            
          }
        })
      //  图谱列表 详情(vType == 3)
      } else if (this.vType == 3) {
         var id = this.collectId;
          getCollectMapDetail(id).then((res)=>{
            if (res.code == 200) {
              var result= res.data;
              this.formItem.collectTask = result.collectMapVM;
              // this.relations = result.relations;
              this.allData = result.relations;
              this.total = result.relations.length;
              this.relations = this.allData.slice((this.currentPageIndex - 1) * this.pageSize, this.currentPageIndex * this.pageSize);
            } else {
            
            }
          })
      }
    },
    handleDeptClick() {

    },
    // 切换页事件
    handlePageChange(pageIndex) {
      this.currentPageIndex = pageIndex;   
      this.relations = this.allData.slice((this.currentPageIndex - 1) * this.pageSize, this.currentPageIndex * this.pageSize);
    },
    /**
     * 保存按钮事件
     */
    handleSaveClick() {

    },
    /**
     * 审批按钮事件
     */
    handleApproveClick(row, index) {
      this.approveTitle = '同意';
      this.approveItem = {
        id:this.$route.query.id,
        type:"1"//1'同意，2'驳回
      }
      this.showApproveDialog = true;
    },
    /**
     * 驳回按钮事件
     */
    handleRejectClick(row, index) {
      this.approveTitle = '驳回';
      this.approveItem = {
        id:this.$route.query.id,
        type:"2"//1'同意，2'驳回
      }
      this.showApproveDialog = true;
    },
    // 审批动作完成回调事件
    handleApproveCallback() {

    },
    /**
     * 审批同意图谱信息方法
     */
    _approveMapFun(row) {

    },
    /**
     * 驳回图谱信息方法
     */
    _rejectMapFun(row) {

    },
  }
}
// 设置列名
function setColumns(obj) {
  var columns = [
    {
      title: '主姓名',
      key: 'parentPersonName',
      sortable: true
    },
    {
      title: '主身份证号',
      key: 'parentIdNumber',
      sortable: true
    },
    {
      title: '关系名称',
      key: 'relationName',
      sortable: true,
    },
    {
      title: '关系人姓名',
      key: 'childPersonName',
      sortable: true
    },
    {
      title: '关系人身份证号',
      key: 'childIdNumber',
      sortable: true
    },
  ];
  return columns;
}
</script>
<style lang="less" scoped>
@import '../css/style.less';
.input-value{
  color:rgba(153,153,153,1);
}
</style>
