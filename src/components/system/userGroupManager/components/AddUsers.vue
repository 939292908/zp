<!--
 * @Author: your name
 * @Date: 2019-09-25 15:05:49
 * @LastEditTime: 2019-10-30 14:09:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\system\userGroupManager\components\AddUsers.vue
 -->
<template>
  <Modal :value="model" :width="650" title="添加用户到组" @on-cancel="cancel">
    <div class="body">
      <div class="search">
        <i-input
          class="search-input"
          v-model="textFilter"
          placeholder="请搜索用户名、警号、账号、部门"
          clearable
          @keyup.enter.native="search"
          @on-change="handleClear"
        >
          <i-button slot="append" class="search-btn" icon="ios-search" @click.native="search"></i-button>
        </i-input>
      </div>
      <div class="result-table">
        <i-table
          ref="userTable"
          border
          stripe
          height="300"
          :columns="columns"
          :data="data"
          @on-select-all="handleCheckAll"
          @on-select-all-cancel="handleCheckAllCancel"
          @on-select="handleCheck"
          @on-select-cancel="handleCheckCancel"
        ></i-table>
      </div>
      <div class="pages">
        <Page
          :total="pagination.total"
          show-total
          show-elevator
          @on-change="handlePageChange"
          :current="pagination.pageIndex"
        />
      </div>
    </div>
    <div slot="footer">
      <i-button type="primary" @click="cancel">关闭</i-button>
      <!-- <i-button type="primary" v-if="hasFunAuth(constantFunMap.FUN_UserGroup_AddUser_ID)" :loading="loading" :disabled="loading" @click="ok">确定</i-button> -->
    </div>
  </Modal>
</template>
<script>
import * as apis from "@/api/system/userGroupManager.js";
import * as apiUser from "@/api/system/userManager.js";
import { hasQuery } from "../../../../tools/units.js";
export default {
  name: "AddUsers",
  props: {
    value: {
      type: Boolean,
      defalut: false
    },
    group: {
      type: Object,
      defalut: null
    }
  },
  data() {
    return {
      model: true,
      textFilter: "",
      indeterminate: false,
      checkAll: false,
      loading: false,
      columns: [
        {
          type: "selection",
          width: 56,
          align: "center"
          // renderHeader:(h,params) => {
          //   var self = this
          //   return h('Checkbox', {
          //     props: {
          //       value: self.checkAll,
          //       indeterminate:self.indeterminate,
          //       // disabled:!this.hasFunAuth(this.constantFunMap.FUN_UserGroup_AddUser_ID)
          //     },
          //     on:{
          //       'on-change':(value)=>{
          //         this.handleCheckAll(value)
          //       }
          //     }
          //   });
          // },
          // render:(h,params) => {
          //   return h('Checkbox', {
          //     props: {
          //       value: params.row.flag,
          //       // disabled:!this.hasFunAuth(this.constantFunMap.FUN_UserGroup_AddUser_ID)
          //       //       || (params.row.userId.toLowerCase() == this.$Administration.toLowerCase() && this.group && this.group.groupId == '1')
          //     },
          //     on:{
          //       'on-change':(value)=>{
          //         this.handleCheckAllGroup(value,params.row)
          //       }
          //     }
          //   });
          // }
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "警号",
          key: "userCode"
        },
        {
          title: "账号",
          key: "userAccount"
        },
        {
          title: "部门名称",
          key: "userDeptName"
        }
      ],
      data: [],
      resultData: [],
      path: this.$config.mainPath,
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 20
      },
      groupUsers: {
        groupID: "",
        method: "",
        userIDs: []
      }
    };
  },
  methods: {
    /**
     * 查询事件
     * @author julie
     */
    search() {
      this.pagination.pageIndex = 1;
      this.getData();
    },
    // 清空关键词
    handleClear() {
      if (this.textFilter == "") {
        this.search();
      }
    },
    /**
     * 获取用户列表数据
     * @author julie
     */
    getData() {
      let params = {
        groupId: this.group.groupId,
        keyWords: this.textFilter,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      };
      apis.getGroupUserListData(params).then(res => {
        if (res.code == 200) {
          let data = res.data;
          this.data = data.data;
          this.pagination.total = data.total;
          this.pagination.pageIndex = data.pageIndex;
          this.data.forEach(x => {
            x._checked = x.flag;
          });
        }
      });
    },
    handlePageChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getData();
    },
    // handleCheckAll(value) {
    //   if (this.indeterminate) {
    //     this.checkAll = false;
    //   } else {
    //     this.checkAll = value;
    //   }
    //   if(this.group && this.group.groupId == '1' && !value) {
    //     this.indeterminate = true;
    //   } else {
    //     this.indeterminate = false;
    //   }
    //   this.data.forEach(x=>{
    //     // 当前不是超级管理组且用户不是超级管理员
    //     if(!(x.userId.toLowerCase() == this.$Administration.toLowerCase() && this.group && this.group.groupId == '1')) {
    //       x.isChecked = value
    //     }

    //   })
    // },
    // handleCheckAllGroup(value,row) {
    //   this.data.forEach(x=>{
    //     if(x.userId == row.userId){
    //       x.isChecked = value
    //       return;
    //     }
    //   })
    //   let count = this.data.filter(x=>{
    //     return x.isChecked
    //   })
    //   if (count.length === this.data.length) {
    //     this.indeterminate = false;
    //     this.checkAll = true;
    //   } else if (count.length > 0) {
    //     this.indeterminate = true;
    //     this.checkAll = false;
    //   } else {
    //     this.indeterminate = false;
    //     this.checkAll = false;
    //   }
    // },
    // 全选按钮
    handleCheckAll(selection) {
      this.groupUsers.userIDs = [];
      selection.forEach(x => {
        this.groupUsers.userIDs.push(x.userId);
      });
      this.groupUsers.method = "add";
      this.addOrDelUserToGroup();
    },
    // 取消全选
    handleCheckAllCancel(selection) {
      this.groupUsers.userIDs = [];
      this.data.forEach(x => {
        this.groupUsers.userIDs.push(x.userId);
      });
      this.groupUsers.method = "del";
      this.addOrDelUserToGroup();
    },
    // 选中某项
    handleCheck(row) {
      this.groupUsers.userIDs = [];
      this.groupUsers.userIDs.push(row[0].userId);
      this.groupUsers.method = "add";
      this.addOrDelUserToGroup();
    },
    // 除去某项
    handleCheckCancel(selection,row) {
      this.groupUsers.userIDs = [];
      this.groupUsers.userIDs.push(row.userId);
      this.groupUsers.method = "del";
      this.addOrDelUserToGroup();
    },
    // 从用户组中添加或移除用户
    addOrDelUserToGroup() {
      this.groupUsers.groupID = this.group.groupId;
      apis.addOrDelUserToGroup(this.groupUsers).then(res => {
        if (res.code == 200) {
          if (this.groupUsers.method == "add") {
            this.$Message.success("添加成功");
          } else {
            this.$Message.success("移除成功");
          }
        }
      });
    },
    /**
     * 确定事件
     * @author julie
     */
    // ok() {
    //   this.loading = true;
    //   let sections = this.resultData.filter(x=>{
    //     return x.isChecked
    //   })
    //   // if(sections.length <= 0) {
    //   //   this.$Message.info('请至少选择一个用户');
    //   //   this.loading = false;
    //   //   return;
    //   // }
    //   this._addUsersToGroup(sections,()=>{
    //     this.modal = false;
    //     this.$emit('input',this.modal)
    //     this.$emit('on-ok',sections)
    //   })
    // },
    /**
     * 取消事件
     * @author julie
     */
    cancel() {
      this.modal = false;
      this.$emit("input", this.modal);
    },
    _addUsersToGroup(sections, callback) {
      let data = {
        groupID: this.group.groupId,
        userIDs: sections.map(x => {
          return x.userId;
        })
      };
      apis.addUserToGroup(data).then(res => {
        this.loading = false;
        if (res.code == 200) {
          callback();
          this.$Message.success("操作成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  },
  watch: {
    value: {
      handler(val) {
        this.model = val;
        this.textFilter = "";
        if (val) {
          this.getData();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.search {
  margin-bottom: 10px;
  .search-input {
    width: 400px;
    /deep/ .ivu-input-icon-clear {
      right: 61px !important;
    }
    .search-btn {
      width: 60px;
    }
  }
}
</style>
<style lang="less" scoped>
.user-checkbox {
  > div {
    padding-left: 2px;
    padding-right: 2px;
  }
}
.pages {
  margin-top: 15px;
}
</style>
