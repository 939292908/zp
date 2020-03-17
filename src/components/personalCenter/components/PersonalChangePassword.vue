<template>
  <div>
    <i-form class="user-form" ref="passwordForm" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <Form-item label="原始密码：" prop="oldPassword">
          <i-input 
          v-model="formValidate.oldPassword" 
          :maxlength="20" 
          type="password" 
          autocomplete="off" 
          ></i-input>
        </Form-item>
        <Form-item label="新密码：" prop="newPassword">
          <i-input v-model="formValidate.newPassword" :maxlength="20" type="password" autocomplete="off"></i-input>
        </Form-item>
        <Form-item label="确认新密码：" prop="truePassword">
          <i-input v-model="formValidate.truePassword" :maxlength="20" type="password" autocomplete="off"></i-input>
        </Form-item>
    </i-form>

    <div class="updata-btn" v-if="hasFunAuth(constantFunMap.FUN_Center_Update_Pass_Edit_ID)">
      <div @click="resetForm">重置</div>
      <div class="save-btn" @click="changePassword">保存</div>
    </div>
  </div>
</template>

<script>
import * as comApis from '@/api/common.js'

export default {
  data () {
    return {
      // 表单数据
      formValidate: {
        oldPassword: '',
        newPassword: '',
        truePassword: '',
      },
      // 表单校验
      ruleValidate: {
        oldPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "长度不小于6位", trigger: "blur" },
          { max: 16, message: "长度不超过16位", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "长度不小于6位", trigger: "blur" },
          { max: 16, message: "长度不超过16位", trigger: "blur" },
          { validator: this.validatePassword, trigger: "blur" }
        ],
        truePassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "长度不小于6位", trigger: "blur" },
          { max: 16, message: "长度不超过16位", trigger: "blur" },
          { validator: this.validatePassword, trigger: "blur" },
          { validator: this.validateTruePassword, trigger: "blur" }
        ],
      },
    }
  },
  created () {

  },
  methods: {
    // 修改密码
    changePassword(){
      this.$refs["passwordForm"].validate( isOk => {
        if ( isOk ) {
          let data = this.formValidate;
          let me = this;
          comApis.ChangePassword(data).then(response => {
            if(response.code == 200){
              this.$refs['passwordForm'].resetFields();
              this.$Message.success('密码修改成功');
            } else {
              this.$Message.warning(response.msg);
            } 
          })
           .catch(error => {
            console.log(error);
          });
        }
      })
    },
    resetForm () {
      this.$refs['passwordForm'].resetFields();
    },

    // 校验密码
    validatePassword (rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value)) {
        return callback(new Error("密码必须为字母和数字"));
      } else {
        callback();
      }
    },
    // 校验输入的两次密码相同
    validateTruePassword (rule, value, callback) {
      if (value !== this.formValidate.newPassword) {
        return callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    }
  }

}
</script>

<style lang="less" scoped>
@imageUrl: "../../../../";
/deep/ .user-form {
  width: 400px;
  margin-left: 100px;
}
.updata-btn {
  overflow: hidden;
  padding: 30px 0 0 190px;
  >div {
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    margin-right: 10px;
    background: url("@{imageUrl}static/images/modal-btn-aks.png") no-repeat center center;
    &.save-btn {
      background: url("@{imageUrl}static/images/sure.png") no-repeat center center;
      color: #fff;
    }
  }
}
</style>
