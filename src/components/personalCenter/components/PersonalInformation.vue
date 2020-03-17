<template>
  <div>
    <i-form class="user-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <Form-item label="姓名：" prop="userName">
          <i-input v-model="formValidate.userName" :maxlength="25"></i-input>
        </Form-item>
        <Form-item label="身份证号：" prop="idNumber">
          <i-input v-model="formValidate.idNumber" disabled></i-input>
        </Form-item>
        <Form-item label="警号：" prop="userCode">
          <i-input v-model="formValidate.userCode" disabled></i-input>
        </Form-item>
        <Form-item label="手机号码：" prop="phone">
          <i-input v-model="formValidate.phone"></i-input>
        </Form-item>
        <Form-item label="隶属单位：" prop="userDeptName">
          <i-input v-model="formValidate.userDeptName" disabled></i-input>
        </Form-item>
        <!-- 头像 -->
          <!-- 上传 -->
          <!-- :show-upload-list="false" -->
        <!-- <div class="editorPhoto">
          <div class="photo">
            <img :src="formValidate.imgUrl" alt="">
          </div>
          <Upload 
          action="//jsonplaceholder.typicode.com/posts/"
          :on-success="upDataPhotoSuccess"
          :on-error="upDataPhotoError"
          >
            <Button class="btn-photo">修改头像</Button>
          </Upload>
        </div> -->
    </i-form>
    <div class="updata-btn">
      <div @click="goback">取消</div>
      <div v-if="hasFunAuth(constantFunMap.FUN_Center_Info_Edit_ID)" class="save-btn" @click="upData">保存</div>
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
        imgUrl: 'https://c-ssl.duitang.com/uploads/item/201612/06/20161206090051_PhYtV.jpeg',
        userName: '',
        idNumber: '',
        userCode: '',
        phone: '',
        userDeptName: '',
      },
      // 表单校验
      ruleValidate: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          { max: 20, message: "长度不超过20位", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: this.validatephone, trigger: "blur" }
        ]
      },
    }
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取用户数据
    getData(){
      comApis.getPersonalCenter().then(response => {
        if(response.code == 200){
          // 1.赋值给表单
          this.formValidate = response.data;
          // 2.请求的数据传给 => personalCenter组件 => 头部组件
          let userData = JSON.parse(JSON.stringify(response.data));
          this.$emit('getUserData',userData);
        } else {
          this.$Message.warning(response.message);
        }   
      })
    },
    // 修改用户数据
    upData(){
      this.$refs["formValidate"].validate( isOk => {
        if ( isOk ) {
          let data = this.formValidate;
          let me = this;
          comApis.upDataPersonalCenter(data).then(response => {
            if(response.code == 200){
              me.getData();
              // console.log(this.formValidate);
              // console.log(this.formValidate.userName,this.formValidate.userAccount);
              // 更新cookie中 用户信息
              me.$store.commit('SET_USERINFO',{
                userName:this.formValidate.userAccount,
                ruleName:this.formValidate.userName
              })              
              this.$Message.success('信息修改成功');              
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
    goback() {
      this.$router.push({
        path:"/index"
      });
    },
    // 图片上传成功
    upDataPhotoSuccess (file) {
      console.log(file);
      // const reader = new FileReader()
      // reader.readAsDataURL(file)
      // reader.onload = () => {
      //     const _base64 = reader.result
      //     this.imgUrl = _base64;
      //     console.log(_base64)
      // }
    },
    // 图片上传失败
    upDataPhotoError (file) {
      console.log(file);
      this.$Message.warning('图片上传失败');
    },
    // 校验手机号
    validatephone (rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("手机号格式不正确"));
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
  position: relative;
}
.updata-btn {
  overflow: hidden;
  padding: 30px 0 0 420px;
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
      color:#fff;
    }
  }
}
.editorPhoto {
  position: absolute;
  top: 0;
  left: 640px;
  input {
    display: none;
  }
  .photo {
    width: 142px;
    height: 142px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      // height: 100%;
    }
  }
  .btn-photo {
    width: 120px;
    height: 40px;
    // line-height:40px;
    color:rgba(102,102,102,1);
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    display: block;
    margin: 14px auto;
    width:119px;
    height:40px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(219,219,219,1);
    box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius:4px;
  }
}
</style>

