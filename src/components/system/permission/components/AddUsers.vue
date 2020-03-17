<!--
 * @Author: your name
 * @Date: 2019-09-25 15:05:49
 * @LastEditTime: 2019-10-31 10:48:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\system\permission\components\AddUsers.vue
 -->
<template>
  <Modal
    :value="model"
    :width="650"
    title="请选择用户组"
    @on-cancel="cancel">
    <div class="body">
      <div class="search">
        <i-input v-model="textFilter" placeholder="请搜索组名" clearable @keyup.enter.native="search">
          <i-button slot="append" icon="ios-search" @click.native="search"></i-button>
        </i-input>
      </div>
      <div class="result-table">
        <i-table ref="userTable" stripe border height="300" :columns="columns" :data="data"></i-table>
      </div>
    </div>
    <div slot="footer">
      <i-button type="text" @click="cancel">取消</i-button>
      <!-- <i-button type="primary" @click="ok">确定</i-button> -->
    </div>
  </Modal>
</template>
<script>
import { hasQuery } from '../../../../tools/units.js'
import * as apis from '@/api/system/role.js'
import * as apiGroup from '@/api/system/userGroupManager.js'
export default {
  name: 'AddUsers',
  props:{
    value:{
      type:Boolean,
      defalut:false
    },
    role:{
      type:Object,
      defalut:null
    }
  },
  data() {
    return {
      model:true,
      textFilter:'',
      checkAll:false,
      indeterminate:false,
      columns: [
        {
          key: 'isChecked',
          width: 56,
          title:"",
          // renderHeader:(h,params) => {
          //   var self = this
          //   return h('Checkbox', {
          //     props: {
          //       value: self.checkAll,
          //       indeterminate:self.indeterminate,
          //       disabled:true,
          //     },
          //     on:{
          //       'on-change':(value)=>{
          //         this.handleCheckAll(value)
          //       }
          //     }
          //   });
          // },
          render:(h,params) => {
            return h('Checkbox', {
              props: {
                value: params.row.isChecked
              },
              on:{
                'on-change':(value)=>{
                  this.handleCheckAllGroup(value,params.row)
                }
              }
            });
          }
        },
        {
          title: '用户组',
          key: 'groupName',
        },
        {
          title: '用户组描述',
          key: 'groupDescription'
        }
      ],
      data: [],
      resultData:[],
      total:0,
      path:this.$config.mainPath + 'idsecurity',
    }
  },
  methods:{
    /**
     * 查询事件
     * @author julie
     */
    search() {
      let tmp = this.resultData;
      if(this.textFilter) {
        tmp = tmp.filter(x=> {
          return hasQuery(x.groupName,this.textFilter)
        })
      }
      this.data = tmp;
      this.total = tmp.length
    },
    /**
     * 获取用户列表数据
     * @author julie
     */
    getData() {
      let urls = [apis.getRoleGroupInfo(this.role.roleId),
                  apiGroup.getGroupList()]
      Promise.all(urls).then(response=>{
        var checkedUser = response[0]
        var allUser = response[1]
        let data = allUser.data;
        let checkedUsers = checkedUser.data;
        data.forEach(x=>{
          let item = checkedUsers.find(c=>{
            return c.groupId == x.groupId
          })
          x.isChecked = item ? true : false
        })
        this._checkBoxState(data)
        this.data = data
        this.resultData = data;
        this.total  = data.length;
      })
    },
    handleCheckAll(value) {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      this.data.forEach(x=>{
        x.isChecked = value
      })
    },
    handleCheckAllGroup(value,row) {
      this.data.forEach(x=>{
        if(x.groupId == row.groupId){
          x.isChecked = value
          return;
        }
      })
      this._checkBoxState(this.data)
      if(value) {
        this._addRoleGroupInfo(row,(error)=>{
          this.data.forEach(x=>{
            if(x.groupId == row.groupId){
              x.isChecked = !value
              return;
            }
          })
          this._checkBoxState(this.data)
        })
      } else {
        this._deleteRoleGroupInfo(row,(error)=>{
          this.data.forEach(x=>{
            if(x.groupId == row.groupId){
              x.isChecked = !value
              return;
            }
          })
          this._checkBoxState(this.data)
        })
      }
    },
    _addRoleGroupInfo(row,callback){
      apis.addRoleGroup(this.role.roleId,row.groupId).then(res=>{
        if(res.code != 200) {
          callback()
          this.$Message.error(res.message)
        } else {
          this.$emit('check-change')
        }
      })
    },
    _deleteRoleGroupInfo(row,callback){
      apis.deleteRoleGroupInfo(this.role.roleId,row.groupId).then(res=>{
        if(res.code != 200) {
          callback()
          this.$Message.error(res.message)
        } else {
          this.$emit('check-change')
        }
      })
    },
    _checkBoxState(data) {
      let count = data.filter(x=>{
        return x.isChecked
      })
      if (count.length === data.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (count.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    /**
     * 确定事件
     * @author julie
     */
    ok() {
      let sections = this.data.filter(x=>{
        return x.isChecked
      })
      if(sections.length <= 0) {
        this.$Message.info('请至少选择一个用户组');
        return;
      }
      this.modal = false;
      this.$emit('input',this.modal)
      this.$emit('saveSelectUser',sections)
    },
    /**
     * 取消事件
     * @author julie
     */
    cancel() {
      this.modal = false;
      this.$emit('input',this.modal)
    }
  },
  watch:{
    value:{
      handler(val) {
        this.model = val
        this.textFilter = ""
        if(val && this.role) {
          this.getData();
        }
      },
      immediate:true
    }
  }
}
</script>
<style lang="less" scoped>
.search{
  margin-bottom: 10px;
  width: 300px;
  /deep/ .ivu-input-icon-clear {
      right: 44px !important;
    }
}

</style>
<style lang="less">
  .user-checkbox{
    >div{
      padding-left: 2px;
      padding-right: 2px;
    }

  }
</style>




