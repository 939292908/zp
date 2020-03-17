<template>
  <div class="areabinding-container">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="区划绑定" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content" @click="hideRightMenu">
      <div class="wrapper">
        <div class="title">区划绑定</div>
        <div class="header-search">
          <div>
            <i-form ref="formValidate" :model="formValidate" :label-width="100" inline>
              <Form-item label="单位选择">
                <i-input v-model="formValidate.deptId" v-show="false"></i-input>
                <tree-filter
                  style="width:300px"
                  key="2"
                  ref="deptTree"
                  :apiKey="optionConfig.DEPT_TREE"
                  select-type="all"
                  :afterCallback="deptAfterCallback"
                  v-model="formValidate.deptName"
                  placeholder="请选择公安单位"
                  :apiFun="deptApis"
                  @on-select-change="getSelectData"
                ></tree-filter>
              </Form-item>
              <Form-item label="关键字搜索">
                <i-input
                  style="width:300px;"
                  clearable
                  v-model="formValidate.keyword"
                  placeholder="请输入公安单位或行政区划的关键字"
                  @keyup.enter.native="handleSearch()"
                ></i-input>
              </Form-item>
              <Form-item>
                <Button type="primary" @click="handleSearch()">搜索</Button>
              </Form-item>
            </i-form>
          </div>
        </div>
        <div class="wrapper-detail" ref="wrapperDetail">
          <div class="wrapper-content">
            <loading :mask-closable="false" color="blue" v-model="tableLoading"></loading>
            <Table
              highlight-row
              stripe
              border
              :columns="columns"
              :data="areaData"
              :height="tableHeight"
            >
              <template slot-scope="{ row, index }" slot="action">
                <div class="table-slot">
                  <div class="slot-item">
                    <!-- item -->
                    <div 
                      class="city-item" 
                      v-for="(item,childIndex) in row.children" 
                      :key="childIndex"
                      @contextmenu.prevent="rightClickCity($event, item)">
                      <span class="icon-mo" v-if="item.areaCode==item.defaultAreaCode"></span>
                      <span :title="item.areaName">{{item.areaDisplayName}}</span>
                      <i v-if="hasFunAuth(constantFunMap.FUN_AreaBinding_Delete_ID)" @click="handleDeleteArea(row,item)" class="iconfont icon-guanbi1"></i>
                    </div>
                  </div>
                  <!-- btn -->
                  <div v-if="hasFunAuth(constantFunMap.FUN_AreaBinding_Add_ID)" @click="handleAddAreaModal(row, index)" class="slot-add">
                    <i class="iconfont icon-jiahao1"></i>
                  </div>
                </div>
              </template>
            </Table>
            <div style="margin: 10px;overflow: hidden">
              <div>
                <!-- <Page
                  :total="pagination.total"
                  :current="pagination.pageIndex"
                  :page-size="pagination.pageSize"
                  show-total
                  show-elevator
                  @on-change="handlePageChange"
                ></Page>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="addModalVisible"
      width="600"
      :mask-closable=false
      :title="'区划选择' + (currentSelectDept ? ' - ' +currentSelectDept.deptName: '')"
    >
      <div class="slot-content">
        <loading :mask-closable="false" color="blue" v-model="areaTreeLoading"></loading>
        <Tree
          class="dept-tree"
          ref="tree"
          show-checkbox
          multiple
          :data="resultAreaTreeData"
          check-directly
          @on-check-change="handleCheckChange"
          @on-select-change="handleSelectChange"
        ></Tree>
      </div>
      <div class="slot-footer" slot="footer">
        <i-button :disabled="areaTreeSaveLoading" @click="handleSave" type="primary">保存</i-button>
        <i-button @click="handleCancel">取消</i-button>
      </div>
    </Modal>
    <!-- 右击菜单 -->
    <!-- <ul class="right-menu">
      <li></li>
    </ul> -->
  </div>
</template>
<script>
import appHeader from "@/components/assembly/AppHeader";
import SideBar from "@/components/assembly/Sidebar";
import switchRightView from "@/components/assembly/SwitchRightView";
import TreeFilter from "@/components/assembly/TreeFilter";
import Loading from "@/components/assembly/Loading";
import * as apis from "@/api/system/unitmaintenance.js";
import * as apiCom from "@/api/common.js";
import * as tool from "../../../tools/units.js";
import { OPTIONS_LIST } from "@/api/config.js";
export default {
  components: {
    switchRightView,
    SideBar,
    appHeader,
    TreeFilter,
    Loading
  },
  props: {},
  data() {
    return {
      curRightCity: {}, // 当前右击城市
      optionConfig: OPTIONS_LIST,
      deptApis: apiCom.getDeptTree,
      tableHeight: 300,
      tableLoading: false,
      areaTreeLoading: false,
      areaTreeSaveLoading: false,
      currentSelectDept: null, //当前操作的单位的对象
      areaTreeData: [],
      resultAreaTreeData: [],
      deptList: [],
      addModalVisible: false, //模态框
      pagination: {
        total: 10,
        pageIndex: 1,
        pageSize: 10
      },
      areaData: [],
      columns: [
        {
          title: "公安单位",
          key: "deptName",
          width: "420px"
        },
        {
          title: "行政区划",
          key: "children",
          slot: "action"
        }
      ],
      visible: false,
      formValidate: {
        deptId: "",
        deptCode: "",
        deptName: "",
        keyword: ""
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
      },
      treeProps: {
        children: "childAreaList",
        title: "displayName",
        id: "code"
      }
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
    window.addEventListener('mousewheel',this.hideRightMenu,false); // 滚动隐藏右击菜单
  },
  methods: {
    // 城市 右击事件
    rightClickCity(e, item) {
      console.log(e, item);
      // 保存当前右击城市
      this.curRightCity = item;
      // 菜单 click 事件
      let setDefaultClick = () => {
        console.log(1111,this.curRightCity);
        let params = {
          deptId: this.curRightCity.deptId,
          areaId: this.curRightCity.areaId,
        }
        this.setDefaultArea(params);
      }
      // 创建菜单
      this.createRightMenu(e, {setDefaultClick});
    },
    // 创建右击菜单
    createRightMenu(e, clicks) {
      // 清除
      let menu = document.querySelector('#right-menu');
      // if (menu) menu.remove();
      if (menu) {
        // 展示
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';
        menu.style.display = 'block';
      } else {
        // 创建
        let box = document.querySelector('.wrapper-detail');
        // ul
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'right-menu');
        // li
        var li = document.createElement('li');
        li.innerText = "设为默认";
        li.onclick = clicks.setDefaultClick;
        // 定位
        ul.style.left = e.clientX + 'px';
        ul.style.top = e.clientY + 'px';
        // 添加
        ul.appendChild(li);
        box.appendChild(ul);
      }
    },
    // 隐藏菜单
    hideRightMenu(){
      let menu = document.querySelector('#right-menu');
      if (menu) menu.style.display = 'none';
    },
    // 设置默认区划
    setDefaultArea(params) {
      apis.SET_DEFAULT_AREA(params).then(res => {
        if (res.code == 200) {
          this.$Message.success("设置成功！");
          this.getTableData();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 初始化获取区划树的数据
    initRegionalData() {
      let me = this;
      apiCom.GET_AREA_TREE_INFO().then(res => {
        if (res.code == 200) {
          let data = [];
          if (Array.isArray(res.data)) {
            data = res.data;
          } else {
            data = [res.data];
          }
          if (data[0]) {
            if (!data[0].title)
              data[0].title = data[0][me.treeProps.title] || "";
            delete data[0][me.treeProps.title];
            if (!data[0].children) {
              data[0].children = data[0][me.treeProps.children] || [];
              delete data[0][me.treeProps.children];
            }
            if (!data[0].expand) data[0].expand = true;
          }
          this.parseTreeData(data[0].children);
          this.areaTreeData = JSON.parse(JSON.stringify(data));
          this.resultAreaTreeData = data;
        }
      });
    },
    // 单位树的回调方法，设置初始化数据
    deptAfterCallback(treeData, parseData) {
      this.setDeptName(treeData, parseData, null);
    },
    // 设置单位的初始化数据
    setDeptName(treeData, parseData, belongDeptId, parseId = "deptId") {
      let deptNode = null;
      if (belongDeptId) {
        deptNode = parseData.find(x => x[parseId] == belongDeptId);
      } else {
        deptNode = treeData.length > 0 ? treeData[0] : null;
      }
      if (deptNode) {
        this.formValidate.deptCode = deptNode.id;
        this.formValidate.deptId = deptNode.deptId;
        this.formValidate.deptName = deptNode.title;
        this.getSelectData(deptNode);
      }
    },
    handleSearch() {
      let params = {
        deptId: this.formValidate.deptId,
        keyword: this.formValidate.keyword
      };
      this.getTableData();
    },
    handleSave() {
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      let checkedIndeterminateNodes = this.$refs.tree.getCheckedAndIndeterminateNodes();
      let nodeIds = this.getNeedNodes();
      if (nodeIds.length <= 0) {
        this.$Message.info("请至少选择一条数据进行绑定");
        return;
      }
      this.areaTreeSaveLoading = true;
      let areaIdList = nodeIds.map(x => x.id);
      let data = {
        areaList: areaIdList,
        deptId: this.currentSelectDept.deptId
      };
      apis.POST_ADD_UNIT_BINDING(data).then(res => {
        this.areaTreeSaveLoading = false;
        if (res.code == 200) {
          this.$Message.success("保存成功！");
          this.addModalVisible = false;
          this.getTableData();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 获取需要的节点
    getNeedNodes() {
      // 如果节点的children全部选中，则获取父级的code,否则添加节点自己的code
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      let checkedIndeterminateNodes = this.$refs.tree.getCheckedAndIndeterminateNodes();
      let nodeIds = [];
      let unNeedNodeIds = [];
      for (let i = 0; i < checkedNodes.length; i++) {
        let node = checkedNodes[i];
        let isExistUnSelected = node.children.some(x => x.checked == false);
        let isExist = nodeIds.some(
          x => x.code == node.code || x.code == node.parentCode
        );
        let existNode = unNeedNodeIds.some(x => x.code == node.code);
        if (!isExistUnSelected && !isExist && !existNode) {
          nodeIds.push(node);
        }
        let checkNodes = node.children.filter(x => x.checked);
        if (checkNodes.length == node.children.length) {
          node.children.forEach(x => {
            unNeedNodeIds.push(x);
          });
        }
      }
      // checkedNodes.forEach(node => {
      //   let isExistUnSelected = node.children.some(x => x.checked == false);
      //   let isExist = nodeIds.some(
      //     x => x.code == node.code || x.code == node.parentCode
      //   );
      //   if (!isExistUnSelected && !isExist) {
      //     nodeIds.push(node);
      //   }
      // });
      return nodeIds;
    },
    handleCancel() {
      this.addModalVisible = false;
    },
    //弹出模态框
    handleAddAreaModal(row, index) {
      this.addModalVisible = true;
      this.currentSelectDept = row;
      this.areaTreeLoading = true;
      this.computedAreaList();
      this.areaTreeLoading = false;
    },
    // 计算获取模态框中单位树的数据
    computedAreaList() {
      let treeData = JSON.parse(JSON.stringify(this.areaTreeData));
      let areaList = this.currentSelectDept.children;
      this.parseTreeData(treeData, areaList);
      this.resultAreaTreeData = treeData;
    },
    // 获取选中的单位的数据并加载下级单位的数据
    getSelectData(cur) {
      this.formValidate.deptCode = cur.id;
      this.formValidate.deptId = cur.deptId;
      this.formValidate.deptName = cur.title;
      this.visible = false;
      this.getTableData();
    },
    // 获取表格数据
    getTableData() {
      // 获取table数据
      let deptId = this.formValidate.deptId;
      if (deptId) {
        this.tableLoading = true;
        this.apiUnitFn()
          .then(res => {
            this.tableLoading = false;
            let tempData = res.data;
            // 根据deptId进行数据去重
            let deptIdList = [];
            let deptAreaList = [];
            tempData.forEach(x => {
              if (deptIdList.indexOf(x.deptId) == -1) {
                deptIdList.push(x.deptId);
              }
            });
            deptIdList.forEach(x => {
              let item = {};
              let obj = tempData.find(it => it.deptId == x);
              let children = tempData.filter(
                it => it.deptId == x && it.areaId != null
              );
              item.deptId = obj.deptId;
              item.deptCode = obj.deptCode;
              item.deptName = obj.deptName;
              item.children = children;
              deptAreaList.push(item);
            });
            console.log("deptAreaList", deptAreaList);
            this.areaData = deptAreaList;
          })
          .catch(res => {
            this.tableLoading = false;
          });
      }
    },
    // 获取单位数据接口
    apiUnitFn() {
      let params = {
        deptId: this.formValidate.deptId,
        keyWord: this.formValidate.keyword
      };
      let promise = new Promise((resolve, reject) => {
        apis
          .GET_UNIT_BINDING_LIST(params)
          .then(res => {
            if (res.code == 200) {
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch(res => {
            reject(res);
          });
      });
      return promise;
    },
    // 删除当前单位绑定的区划选项
    handleDeleteArea(row, item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "你确定要删除当前绑定的数据吗？",
        onOk: () => {
          let data = {
            areaId: item.areaId,
            deptId: row.deptId
          };
          this.tableLoading = true;
          apis.DELETE_UNIT_BINDING(data).then(res => {
            this.tableLoading = false;
            if (res.code == 200) {
              this.$Message.success("删除成功!");
              // 刷新Table数据
              this.getTableData();
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    // 单位树的关闭与打开
    handleOpen() {
      this.visible = !this.visible;
    },
    handleSelectChange(data, cur) {
      // this.$set(cur, "expand", !cur.expand);
    },
    handleCheckChange(data, cur) {
      // this.$set(cur, "expand", !cur.expand);
    },
    resizeHandler() {
      this.$nextTick(() => {
        if (this.$refs.wrapperDetail) {
          let wrapperDetailHeight = this.$refs.wrapperDetail.clientHeight;
          if (wrapperDetailHeight - 90 < 300) {
            this.tableHeight = 300;
          } else {
            this.tableHeight = wrapperDetailHeight - 90;
          }
        } else {
          this.tableHeight = 300;
        }
      });
    },
    parseTreeData(data, areaList = []) {
      data.forEach(x => {
        if (x.hasOwnProperty(this.treeProps.title)) {
          let title = x[this.treeProps.title] || "";
          delete x[this.treeProps.title];
          x.title = title;
        }
        if (x.hasOwnProperty(this.treeProps.children)) {
          let children = x[this.treeProps.children] || [];
          delete x[this.treeProps.children];
          x.children = children;
        }
        if (!x.hasOwnProperty("expand")) {
          x.expand = false;
        }
        if (areaList.length > 0) {
          let flag = areaList.some(it => x.id == it.areaId);
          if (flag) {
            x.checked = true;
          } else {
            x.checked = false;
          }
        }
        if (x.children.length > 0) {
          this.parseTreeData(x.children, areaList);
        }
      });
    }
  },
  created() {
    this.initRegionalData();
  },
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
.table-slot {
  position: relative;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  div.slot-item {
    width: 100%;
    > .city-item {
      width: auto;
      margin: 4px 0;
      min-width: 140px;
      max-width: 200px;
      height: 26px;
      text-indent: 3px;
      line-height: 24px;
      border: 1px solid #0668c8; //#2698ed
      margin-right: 10px;
      border-radius: 2px;
      cursor: pointer;
      display: inline-flex;
      > span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon-mo {
        width: 22px;
        height: 16px;
        background: url("../../../../static/images/personLabel/moreng.png") 0 0 no-repeat;
      }
      > i.iconfont {
        flex: 0 0 24px;
        &:hover {
          cursor: pointer;
          color: #2698ed;
        }
      }
    }
  }
  .slot-add {
    width: 35px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c7d7eb;
    border: 1px solid #a0acbc;
    border-radius: 2px;
    flex: 0 0 40px;
  }
}
.slot-footer {
  overflow: hidden;
  span {
    float: right;
    width: 40px;
    height: 20px;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    border: 1px solid @borderColor;
    border-radius: 2px;
    cursor: default;
    &:first-child {
      margin-left: 5px;
    }
    &:last-child {
      color: #fcfcfc;
      background-color: #184af0;
    }
  }
}
.slot-content {
  .dept-tree {
    max-height: 360px;
    overflow-y: auto;
    line-height: 20px;
    padding: 0 4px;
    height: 360px;
  }
}
.areabinding-container {
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
      }
      .header-search {
        height: 60px;
        // background-color: #91b5ff;
        padding: 16px 40px 0 40px;
        position: absolute;
        line-height: 60px;
        top: 40px;
        left: -2px;
        right: -2px;
        /deep/.ivu-btn-primary {
          margin-left: -82px !important;
        }
        .header-btn {
          width: 50px;
          height: 28px;
          background-color: blue;
        }
      }
    }
    .wrapper-detail {
      position: absolute;
      top: 80px;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      padding: 20px 40px;
      color: #333;
      .wrapper-content {
        height: 100%;
        position: relative;
      }
    }
  }
}
/deep/ #right-menu {
  position: fixed;
  width: 100px;
  background: #fff;
  box-shadow: #ccc 0px 0px 8px;
  z-index: 999;
  li {
    color: #333;
    font-size: 14px;
    height: 34px;
    line-height: 34px;
    width: 100%;
    padding-left: 5%;
    list-style-type: none;
    cursor: pointer;
  }
}
</style>


<style lang="less" scoped>
.ivu-checkbox-group {
  padding-left: 20px;
}
</style>

