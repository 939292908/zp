<template>
  <div class="regional-container">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="单位维护" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">
          单位维护
          <span class="title-area">
            (
            <span
              :key="index"
              v-for="(item,index) in unitLevelList"
            >{{ item.name + ": " + item.totalCount }}</span>
            )
          </span>
        </div>
        <div class="wrapper-detail">
          <div class="wrapper-content">
            <!-- 左侧单位列表数据 -->
            <div class="wrapper-left">
              <ul>
                <li :key="index" v-for="(item,index) in unitLevelList">
                  <span class="wrapper-left-padding">
                    {{item.name}}:
                    <p>({{item.list.length}})</p>
                  </span>
                  <ul class="wrapper-left-inline">
                    <li
                      v-for="(child,childIndex) in item.list"
                      :key="childIndex"
                      :class="{actives: item.selectedChildIndex == childIndex ? true : false}"
                      @click="handleEditUnitItemEvent(child,childIndex,item,index)"
                      :style="{border: child.state==0 ? '1px solid orange' : null}"
                    >{{child.deptName}}</li>
                    <span v-if="item.type != '1'"  @click="handleAddUnitItemEvent(item,index)">
                      <i class="iconfont icon-jiahao1"></i>
                    </span>
                  </ul>
                </li>
              </ul>
            </div>
            <!-- 右侧表单 -->
            <div class="wrapper-right">
              <div class="wrapper-right-title">{{ !isAdd ? '单位详情' : '单位详情添加' }}</div>
              <div class="wrapper-right-messagecontent">
                <div class="wrapper-right-areamessage">
                  <i-form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="80"
                  >
                    <Form-item label="上级单位名称:">
                      <span>{{formValidate.parentDeptName || '无'}}</span>
                    </Form-item>
                    <Form-item label="单位编码:" prop="deptCode">
                      <i-input v-model="formValidate.deptCode" :disabled="!isAdd" placeholder="单位编码"></i-input>
                    </Form-item>
                    <Form-item label="单位名称:" prop="deptName">
                      <i-input v-model="formValidate.deptName" placeholder="单位名称" @input="handleDeptNameChange"></i-input>
                    </Form-item>
                    <Form-item label="别名:" prop="deptDisplayName">
                      <i-input v-model="formValidate.deptDisplayName" placeholder="别名"></i-input>
                    </Form-item>
                    <Form-item label="坐标经度:" prop="latitude">
                      <i-input v-model="formValidate.latitude" placeholder="坐标经度"></i-input>
                    </Form-item>
                    <Form-item label="坐标纬度:">
                      <i-input v-model="formValidate.longitude" placeholder="坐标纬度"></i-input>
                    </Form-item>
                    <Form-item label="显示顺序:">
                      <i-input v-model="formValidate.seq" placeholder="显示顺序"></i-input>
                    </Form-item>
                  </i-form>
                </div>
                <div class="wrapper-right-personmessage"></div>
              </div>
              <div class="wrapper-right-bottom">
                <div>
                  <span
                    class="state-btn"
                    v-if="hasFunAuth(constantFunMap.FUN_UnitMaintenance_STOP_ID) && isShow && !isAdd"
                    @click="handleStop()"
                    style="background-color: #ff8000;"
                  >停用</span>
                  <span
                    class="state-btn"
                    style="background-color: green;"
                    v-if="hasFunAuth(constantFunMap.FUN_UnitMaintenance_STOP_ID) && !isShow && !isAdd"
                    @click="handleStart()"
                  >启用</span>
                </div>
                <div>
                  <span
                    class="save-btn"
                    v-if="hasFunAuth(constantFunMap.FUN_UnitMaintenance_SAVE_ID)"
                    @click="handleSave()"
                  >保存</span>
                  <span class="cancel-btn" @click="handleReset()">取消</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appHeader from "@/components/assembly/AppHeader";
import SideBar from "@/components/assembly/Sidebar";
import switchRightView from "@/components/assembly/SwitchRightView";
import * as apis from "@/api/system/unitmaintenance.js";
import { OPTIONS_LIST } from "@/api/config.js";
export default {
  components: {
    switchRightView,
    SideBar,
    appHeader
  },
  props: {},
  data() {
    return {
      rootCode:"0", 
      unitLevelList: [//{name: "省级",type: "1",list: [],selected: false,totalCount: 0,selectedChildIndex: -1}
        // {
        //   name: "省级",
        //   type: "1",
        //   list: [],
        //   selected: false, //当前选中或者点击的单位级别的数据
        //   totalCount: 0,
        //   selectedChildIndex: -1
        // },
        // {
        //   name: "厅级",
        //   type: "2",
        //   list: [],
        //   selected: false,
        //   totalCount: 0,
        //   selectedChildIndex: -1
        // },
        // {
        //   name: "区划",
        //   type: "3",
        //   list: [],
        //   selected: false,
        //   totalCount: 0,
        //   selectedChildIndex: -1
        // }
      ],
      currentSelectedItemList: [], //当前选中的列表项（根据单位级别数据进行去重）
      isShow: true,
      isAdd: true, //区分查看和编辑的title
      formValidate: {
        parentDeptId:"",
        parentDeptCode: "",
        parentDeptName: "",
        deptCode: "", //单位编码
        deptName: "", //单位名称
        deptDisplayName: "",//单位的显示名称
        latitude: "", //经度
        longitude: "", //维度
        seq: null, //顺序
        createPeople: "", //创建人
        createTime: "", //创建时间
        editorPeople: "", //修改人
        editorTime: "", //修改时间
        state: 0,//0:停用状态,1:启用状态
        id: "" //主键id值
      },
      ruleValidate: {
        deptCode: [
          { required: true, message: "单位编码不能为空", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        latitude: [
          {
            pattern: /^\d{1,8}(\.\d{1,8})?$/,
            message: "坐标格式错误",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            pattern: /^\d{1,8}(\.\d{1,8})?$/,
            message: "坐标格式错误",
            trigger: "blur"
          }
        ]
      },
      statusList: {
        isDeleteModal: false, // 删除确认框 展示
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      }
    };
  },
  methods: {
    // 编辑单位项事件
    handleEditUnitItemEvent(child, childIndex, item, index) {
      this.isAdd = false;
      this.setCurrentSelectedItemList(child, childIndex, item, index);
      this.reFreshListByLevelType();
      this.handleReset();
      this.initFormValidate(child);
    },
    // 添加单位项事件(加号按钮事件)
    handleAddUnitItemEvent(item, index) {
      let parentObj = this.getParentUnit(item);
      if (!parentObj) {
        return false;
      }
      this.isAdd = true;
      this.isShow = true;
      this.setCurrentSelectedItemList(null, null, item, index);
      this.handleReset();
      this.formValidate.parentDeptCode = parentObj.deptCode;
      this.formValidate.parentDeptName = parentObj.deptName;
      this.formValidate.parentDeptId = parentObj.deptId;
    },
    // 设置当前选中的单位级别和选中的单位项
    setCurrentSelectedItemList(child, childIndex, item, index) {
      if (this.isAdd) {
        this.unitLevelList.forEach(x => {
          if (x.type == item.type) {
            x.selected = true;
          } else {
            x.selected = false;
          }
        });
      } else {
        this.unitLevelList.forEach(x => {
          if (x.type == item.type) {
            x.selected = true;
            // 设置列表中单位项的悬着
            item.list.forEach((it, itIndex) => {
              if (it.deptCode == child.deptCode) {
                it.selected = true;
                x.selectedChildIndex = itIndex;
              } else {
                it.selected = false;
              }
            });
          } else {
            x.selected = false;
          }
        });
      }
    },
    // 获取当前选中的单位级别和选中的单位项
    getCurrentSelectedItemList() {
      let selectedList = this.unitLevelList.filter(x => {
        return x.selected
      });
      return selectedList;
    },
    // 获取当前选中的单位级别下的单位对象
    getCurrentSelectedUnitItem() {
      let selectedList = this.getCurrentSelectedItemList()
      let unitObj = null
      if(selectedList && selectedList.length > 0) {
        unitObj = selectedList[0].list.find(x=>x.selected)
      }
      return unitObj
    },
    // 获取父级对象
    getParentUnit(item) {
      let parentUnit = {};
      let type = item.type;
      if (type != "1") {
        type = (parseInt(item.type) - 1).toString();
      }
      let levelUnit = this.unitLevelList.find(x => x.type == type);
      if (levelUnit) {
        let unitItem = levelUnit.list.find(x => x.selected);
        if (unitItem) {
          parentUnit.deptName = unitItem.deptName;
          parentUnit.deptCode = unitItem.deptCode;
          parentUnit.deptId = unitItem.deptId
        } else {
          if (item.type == "1") {
            let tmpUnit = levelUnit.list.length > 0 ? levelUnit.list[0] : null;
            parentUnit.deptName = tmpUnit ? tmpUnit.parentDeptName : "";
            parentUnit.deptCode = tmpUnit ? tmpUnit.parentDeptCode : this.rootCode;
            parentUnit.deptId = tmpUnit ? tmpUnit.parentDeptId : this.rootCode;
          } else {
            this.$Message.info("请选择上级单位");
            return false;
          }
        }
      }
      return parentUnit;
    },
    // 获取当前地区级别的数据
    getUnitLevelList() {
      var promise = new Promise((resolve,reject)=>{
        apis.GET_UNIT_LEVEL_LIST().then(res=>{
          if(res.code == 200) {
            let result = res.data;
            let list = result.map((x,index)=>{
              return {
                name: x,
                type: (index + 1).toString(),
                list: [],
                selected: false, //当前选中或者点击的单位级别的数据
                totalCount: 0,
                selectedChildIndex: -1
              }
            })
            this.unitLevelList = list
            resolve(result)
          } else {
            reject([])
          }
        })
      });
      return promise;
    },
    // 获取单位数据统计
    getUnitStatistic() {
      apis.GET_UNIT_STATISTIC().then(res => {
        if (res.code == 200) {
          if (res.data && res.data.length > 0) {
            let data = res.data
            this.unitLevelList.forEach((x, index) => {
              x.totalCount = data[index].deptCount
            });
          }
        }
      });
    },
    //初始划省数据
    initUnitList() {
      var me = this;
      var root = this.rootCode;
      // 获取当前地区级别列表数据
      this.getUnitLevelList().then((result)=>{
        this.apiUnitFn(root).then(res => {
          me.unitLevelList.forEach((x, index) => {
            if (index == 0) {
              let childList = res.data;
              let deptCode = ""
              let items = {}
              childList.forEach((it,itIndex)=>{
                if(itIndex == 0) {
                  it.selected = true;
                  deptCode = it.deptCode
                  items = it;
                }
              })
              x.list = childList;
              x.selected = false
              x.selectedChildIndex = 0
              // 初始化获取第二层的数据
              if(deptCode) {                
                this.isAdd = false;
                this.isShow = true;
                this.initFormValidate(items)
                this.apiUnitFn(deptCode).then(childRes=>{
                  me.unitLevelList.forEach((childIt,childItIndex) => {
                    if(childItIndex == 1) {
                      childIt.list = childRes.data;
                      childIt.selected = false
                      childIt.selectedChildIndex = -1
                    }
                  })
                })
              }
            } else {
              x.list = [];
              x.selected = false
              x.selectedChildIndex = -1
            }
          });
        });    
        this.getUnitStatistic();    
      })      
    },
    // 获取单位数据接口
    apiUnitFn(deptCode) {
      let promise = new Promise((resolve, reject) => {
        apis.GET_UNIT_TREE_BY_CODE(deptCode).then(res => {
          if (res.code == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
    },
    //初始化表单数据
    initFormValidate(items) {
      this.formValidate.parentDeptName = items.parentDeptName;
      this.formValidate.parentDeptId = items.parentDeptId;
      this.formValidate.parentDeptCode = items.parentDeptCode;
      this.formValidate.deptDisplayName = items.deptDisplayName;
      this.formValidate.deptName = items.deptName;      
      this.formValidate.deptId = items.deptId;
      this.formValidate.deptCode = items.deptCode;
      this.formValidate.latitude = items.latitude;
      this.formValidate.longitude = items.longitude;
      this.formValidate.seq = items.seq;
      this.isShow = items.state == 0 ? true : false;
      this.formValidate.createPeople = items.creater;
      this.formValidate.createTime = items.createTime
        ? this.$moment(items.createTime).format("YYYY-MM-DD")
        : null;
      this.formValidate.editorPeople = items.updater;
      this.formValidate.editorTime = items.updateTime
        ? this.$moment(items.updateTime).format("YYYY-MM-DD")
        : null;
    },
    // 根据级别和code获取数据,isSame:true获取当前级别的数据，false:获取下级的数据
    reFreshListByLevelType(isSame = false, unitObj = null) {
      let currentUnit = this.getCurrentSelectedItemList();
      if (currentUnit && currentUnit.length > 0) {
        if (isSame) {
          let currentType = parseInt(currentUnit[0].type).toString();
          let parentObj = this.getParentUnit(currentUnit[0]);
          let deptCode = "";
          if (parentObj) deptCode = parentObj.deptCode;
          if (deptCode) {
            this.apiUnitFn(deptCode).then(res => {
              this.unitLevelList.forEach(x => {
                if (x.type == currentType) {
                  let list = res.data;
                  list.forEach((it, index) => {
                    if (it.deptCode == unitObj.deptCode) {
                      it.selected = true;
                      x.selectedChildIndex = index;
                    } else {
                      it.selected = false;
                    }
                  });
                  x.list = list;
                }
              });
            });
          }
        } else {
          if (
            currentUnit[0].type ==
            this.unitLevelList[this.unitLevelList.length - 1].type
          ) {
            return;
          }
          let currentType = (parseInt(currentUnit[0].type) + 1).toString();
          let unitItem = currentUnit[0].list.find(x => x.selected);
          let deptCode = "";
          if (unitItem) deptCode = unitItem.deptCode;
          if (deptCode) {
            this.apiUnitFn(deptCode).then(res => {
              this.unitLevelList.forEach(x => {
                if (x.type == currentType) {
                  x.list = res.data;
                  x.selectedChildIndex = -1;
                } else if (x.type > currentType) {
                  x.list = [];
                  x.selectedChildIndex = -1;
                }
              });
            });
          }
        }
      }
    },
    handleDeptNameChange() {
      this.formValidate.deptDisplayName = this.formValidate.deptName;
    },
    // 编辑，新增保存数据事件
    handleSave() {
      var me = this;
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          me.formValidate.state = 1;
          var data = {
            deptId: me.formValidate.deptId,
            deptCode: me.formValidate.deptCode,
            deptName: me.formValidate.deptName,
            deptDisplayName: me.formValidate.deptDisplayName,
            parentDeptCode: me.formValidate.parentDeptCode,
            parentDeptId: me.formValidate.parentDeptId,
            latitude: me.formValidate.latitude,
            longitude: me.formValidate.longitude,
            seq: me.formValidate.seq,
            state: me.formValidate.state,
            id: me.formValidate.id
          };
          this.$Modal.confirm({
            title: "确认保存",
            onOk: () => {
              // 保存接口
              let apiFn = me.isAdd ? apis.POST_ADD_UNIT : apis.POST_UPDATE_UNIT;
              apiFn(data).then(res => {
                if (res.code == 200) {
                  me.$Message.success("保存成功!");
                  if(me.isAdd) {
                    me.getUnitStatistic();
                  }
                  me.initFormValidate(res.data);
                  // 调用刷新当前级别的列表数据
                  me.reFreshListByLevelType(true, res.data);
                  me.removeOptionByKey()
                  me.isSave = true;
                  me.isAdd = false;
                } else {
                  me.$Message.error(res.msg);
                }
              });
            }
          });
        } else {
          this.$Message.error("请完善表单信息!");
        }
      });
    },
    removeOptionByKey() {
      this.$store.dispatch('removeOptionByKey',[OPTIONS_LIST.DEPT_TREE,OPTIONS_LIST.CURRENT_TOKEN_DEPT_TREE])
    },
    handleReset() {
      for (var key in this.formValidate) {
        this.formValidate[key] = "";
      }
      this.$refs["formValidate"].resetFields();
    },
    handleStop() {
      this.updateUnitState('0')
    },
    handleStart() {
      this.updateUnitState('1')
    },
    // 修改单位状态，1代表启用事件，0代表停用事件
    updateUnitState(type) {
      let me = this;
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          var data = {
            deptId: me.formValidate.deptId,
            deptCode: me.formValidate.deptCode,
            deptName: me.formValidate.deptName,
            deptDisplayName: me.formValidate.deptDisplayName,
            parentDeptCode: me.formValidate.parentDeptCode,
            parentDeptId: me.formValidate.parentDeptId,
            latitude: me.formValidate.latitude,
            longitude: me.formValidate.longitude,
            seq: me.formValidate.seq,
            state: null,
          };
          let info = ""
          let title = ""
          if(type == '1') {
            me.formValidate.state = 1;
            data.state = me.formValidate.state;
            info = '停用确定'
            title = "确认停用"
          } else {
            me.formValidate.state = 0;
            data.state = me.formValidate.state;
            info = '启用确定'
            title = "确认启用"
          }
          this.$Modal.confirm({
            title: title,
            onOk: () => {
              apis.POST_UPDATE_UNIT_STATE(data).then(res => {
                if (res.code == 200) {
                  me.$Message.info(info);
                  let unitObj = me.getCurrentSelectedUnitItem()
                  me.initFormValidate(unitObj);
                  me.reFreshListByLevelType(true,unitObj)
                  me.removeOptionByKey()
                  if(type == '1') {
                    me.isShow = true;
                  } else {
                    me.isShow = false;
                  }                  
                } else {
                  me.$Message.error(res.msg);
                }
              });
            }
          });          
        } else {
          this.$Message.error("请完善表单信息!");
        }
      });      
    }
  },
  created() {
    this.initUnitList();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@widthH: 100%;
@imageUrl: "../../../../";
@borderColor: #dcdfe6;
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
.regional-container {
  width: @widthH;
  height: @widthH;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  color: #68a4f6;
  overflow-x: hidden;
  overflow-y: hidden;
  .content {
    .post(a);
    left: 240px;
    top: 67px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    background: #fff;
    .wrapper {
      position: absolute;
      top: 2px;
      left: 0;
      right: 0;
      bottom: 6px;
      border: solid 2px #91b5ff;
      border-radius: 5px 5px 0 0;
      box-shadow: 0px 0px 9px #666 inset;
      .title {
        position: absolute;
        top: -3px;
        left: -2px;
        right: -2px;
        border-radius: 5px 5px 0 0;
        height: 44px;
        line-height: 44px;
        background-color: #c7d7eb;
        overflow: hidden;
        font-size: 16px;
        padding-left: 16px;
        color: #2698ed;
        .title-area {
          font-size: 14px;
          margin-left: 15px;
          span {
            display: inline-block;
            height: 15px;
            margin-top: 15px;
            line-height: 15px;
            padding: 0 15px;
            border-right: solid 2px #91b5ff;
            &:first-child {
              padding-left: 5px;
            }
            &:last-child {
              border-right: none;
              margin-right: 0;
              padding-right: 5px;
            }
          }
        }
      }
    }
    .wrapper-detail {
      position: absolute;
      top: 41px;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      padding: 20px 40px;
      color: #333;
      .wrapper-title {
        width: 100%;
        height: 70px;
        line-height: 70px;
        font-size: 18px;
        padding: 0 20px;
        border: 1px solid @borderColor;
        background: #ffffff;
      }
      .wrapper-content {
        // padding: 20px 40px;
        height: 100%;
        display: flex;
        border: 1px solid @borderColor;
        .wrapper-left {
          width: 100%;
          height: 100%;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-right: 1px solid @borderColor;
          background: #ffffff;
          height: calc(100%);
          overflow-y: auto;
          ul {
            li {
              overflow: hidden;
              border-top: 1px solid @borderColor;
              border-bottom: 1px solid @borderColor;
              padding: 15px 0;
              &:first-child {
                border-top: none;
              }
              &:last-child {
                border-bottom: none;
              }
              .wrapper-left-padding {
                padding-left: 20px;
                width: 100px;
                margin-top: 6px;
                float: left;
                max-height: 40px;
                line-height: 30px;
                p {
                  line-height: 20px;
                }
              }
              .wrapper-left-inline {
                width: calc(100% - 100px);
                min-height: 27px;
                float: right;
                // background-color: blue;
                overflow: hidden;
                font-size: 12px;
                text-align: center;
                .active {
                  background-color: #0668c8;
                  color: #fff;
                }
                .actives {
                  border: 1px solid #0668c8 !important;
                  color: #0668c8 !important;
                }
                li {
                  float: left;
                  padding: 2px 8px;
                  border: 1px solid #ccc;
                  border-radius: 2px;
                  margin-right: 10px;
                  margin-top: 10px;
                  color: #333;
                  line-height: 20px;
                  cursor: pointer;
                  min-width: 84px;
                  min-height: 27px;
                }
                span {
                  float: left;
                  width: 50px;
                  min-height: 23px !important;
                  text-align: center;
                  background-color: #c7d7eb;
                  margin-right: 10px;
                  margin-top: 10px;
                  cursor: pointer;
                  padding-top: 3px;
                  vertical-align: top;
                }
              }
            }
          }
          .wrapper-grid::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .wrapper-grid::-webkit-scrollbar-track {
            border-radius: 5px;
            background: none;
          }
          .wrapper-grid::-webkit-scrollbar-thumb {
            background-color: rgba(32, 76, 157, 1);
            border-radius: 5px;
          }
          .wrapper-grid::-webkit-scrollbar-thumb:hover {
            background-color: rgba(45, 183, 245, 1);
          }
          .wrapper-grid::-webkit-scrollbar-corner {
            background-color: #dadada;
          }
        }
        .wrapper-right {
          flex: 0 0 300px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background: #ffffff;
          border-left: 1px solid @borderColor;
          .wrapper-right-title {
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
            font-size: 16px;
            background-color: #c7d7eb;
          }
          .wrapper-right-messagecontent {
            // height:100%;
            height: calc(100% - 88px);
            display: flex;
            flex-direction: column;
            .wrapper-right-areamessage {
              flex: 1;
              padding-top: 15px;
              padding-right: 20px;
            }
          }
          .wrapper-right-bottom {
            height: 44px;
            padding: 10px;
            border-top: 1px solid @borderColor;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              span {
                width: 40px;
                height: 20px;
                line-height: 18px;
                font-size: 12px;
                text-align: center;
                border: 1px solid @borderColor;
                border-radius: 2px;
                display: inline-block;
                cursor: default;
                &.state-btn {
                  float: left;
                  background-color: #ff8000;
                  color: #fcfcfc;
                }
                &.save-btn {
                  margin-right: 10px;
                  color: #fcfcfc;
                  background-color: #184af0;
                }
              }
            }
          }
          .ivu-tree {
            height: 100%;
            overflow-y: auto;
          }
          .ivu-tree::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .ivu-tree::-webkit-scrollbar-track {
            border-radius: 5px;
            background: none;
          }
          .ivu-tree::-webkit-scrollbar-thumb {
            background-color: rgba(32, 76, 157, 1);
            border-radius: 5px;
          }
          .ivu-tree::-webkit-scrollbar-thumb:hover {
            background-color: rgba(45, 183, 245, 1);
          }
          .ivu-tree::-webkit-scrollbar-corner {
            background-color: #dadada;
          }
        }
      }
    }
  }
}
</style>


<style lang="less" scoped>
.ivu-form .ivu-form-item-label {
  padding: 12px 12px 10px 0;
  padding-top: 12px !important;
}
.ivu-form-item-content {
  line-height: 20px !important;
}
.ivu-form-item {
  margin-bottom: 3px !important;
  vertical-align: top;
  .ivu-input-wrapper {
    .ivu-form-item-error-tip {
      z-index: 1000 !important;
    }
  }
}
.ivu-input {
  height: 20px;
}

input {
  line-height: 1 !important;
  height: 20px !important;
  border-radius: 0 !important;
}
.ivu-input .ivu-input-default {
  line-height: 1 !important;
  height: 20px !important;
  border-radius: 0 !important;
}
.tree-role-list {
  .tree-item-text {
    margin-right: 8px;
    display: inline-block;
    cursor: default;
  }
  .tree-item-poptip {
    .ivu-poptip-popper {
    }
    .ivu-poptip-inner {
      width: 60px !important;
    }
    .ivu-poptip-body {
      width: 60px !important;
      height: 20px !important;
      padding: 0 !important;
      .ivu-poptip-ul {
        padding: 0 !important;
        overflow: hidden;
        i {
          display: inline-block;
          margin-right: 5px;
        }
        li {
          width: 15px;
          // padding: 0 8px !important;
          cursor: pointer;
          float: left;
          &:hover {
            color: #68a4f6;
          }
        }
      }
    }
  }
}
</style>

