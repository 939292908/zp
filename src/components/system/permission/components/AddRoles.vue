<template>
  <Modal
    :value="model"
    title="角色信息"
    @on-cancel="cancel">
    <div class="body">
      <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="角色名称" prop="roleName">
            <i-input v-model="formValidate.roleName" :maxlength=25 placeholder="请输入角色名称"></i-input>
        </Form-item>
        <Form-item label="角色描述" prop="roleDescription">
            <i-input v-model="formValidate.roleDescription" :maxlength=1000 type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入角色描述"></i-input>
        </Form-item>
      </i-form>
    </div>
    <div slot="footer">
      <i-button type="text" @click="cancel">取消</i-button>
      <i-button type="primary" @click="ok">确定</i-button>
    </div>
  </Modal>
</template>
<script>
import * as apis from '@/api/system/role.js'
export default {
  name: 'AddRole',
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
      formValidate: {
        roleId: '',
        roleName: '',
        roleDescription: '',
        // status: false
      },
      ruleValidate: {
        roleName: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ],
      },
      path:this.$config.mainPath + 'idsecurity',
    }
  },
  methods:{
    ok() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          // 验证通过
          if(this.role) {
            this._eidtRoleInfo(()=>{
              this.$emit('on-ok',this.formValidate)
            })
          } else {
            this._addRoleInfo(()=>{
              this.$emit('on-ok',this.formValidate)
            });
          }
        }
      })
    },
    cancel() {
      this.modal = false;
      this.$emit('input',this.modal)
      this.$refs['formValidate'].resetFields();
    },
    // 添加角色信息
    _addRoleInfo(callback) {
      let data = this.formValidate
      apis.addRoleInfo(data).then(res=>{
        if(res.code == 200) {
          this.modal = false;
          this.$emit('input',this.modal)
          this.$refs['formValidate'].resetFields();
          this.$Message.success('添加成功')
          callback();
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    // 添加角色信息
    _eidtRoleInfo(callback) {
      let data = this.formValidate
      apis.editRoleInfo(data).then(res=>{
        if(res.code == 200) {
          this.modal = false;
          this.$emit('input',this.modal)
          this.$refs['formValidate'].resetFields();
          this.$Message.success('编辑成功')
          callback();
        } else {
          this.$Message.error(res.message)
        }
      })
    },
  },
  watch:{
    value:{
      handler(val) {
        this.model = val
        if(val && this.role) {
          this.formValidate = JSON.parse(JSON.stringify(this.role))
        }        
      },
      immediate:true
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-form .ivu-form-item-label{
  font-weight: 600;
  font-size: 14px;
}
</style>


