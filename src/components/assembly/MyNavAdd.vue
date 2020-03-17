<template>
  <div class="add-modal">
    <div class="title">
      <span v-if="statusList.modalType=='editor'" class="editor-title">编辑导航链接</span>
      <span v-if="statusList.modalType=='add'" class="add-title">添加导航链接</span>
      <Icon @click="closeModal(statusList.modalType)" class="close-modal" type="md-close" />
    </div>
    <i-Form
        ref="formValidate"
        :model="formData"
        label-position="left"
        :label-width="70"
        :rules="ruleValidate"
        class="nav-form"
      >
        <FormItem label="名称" prop="name">
          <i-Input class="nav-input" v-model="formData.name"></i-Input>
        </FormItem>
        <FormItem label="链接" prop="src">
          <i-Input class="nav-input" v-model="formData.src"></i-Input>
        </FormItem>
        <FormItem label="排序" >
          <!-- <i-Input class="nav-input" v-model="formData.sort"></i-Input> -->
          <template>
            <InputNumber :max="999" :min="1" v-model="formData.sort"></InputNumber>
          </template>
        </FormItem>
      </i-Form>
      <div slot="footer" class="footer-btn">
        <div class="reset-btn" @click="resetFormDate();">重置</div>
        <div @click="closeModal(statusList.modalType)">取消</div>
        <div v-if="statusList.modalType=='add'" @click="addItem()">确定</div>
        <div v-if="statusList.modalType=='editor'" @click="editorItem()">确定</div>
      </div>
  </div>
</template>

<script>
import * as comApis from '@/api/common.js'

export default {
  name:"myNavAdd",
  props: ['statusList','itemData'],
  watch: {
    // 监听父传来的编辑对象
    itemData() {
      console.log(this.itemData);
      // 编辑对象 给表单
      this.formData = this.itemData;
      console.log(this.formData);
    }
  },
  data () {
    return {
      formData: {
        id:'',
        name:'',
        src:'',
        sort: 0,
      },
      loading: false,
      // statusList: {
      //   showAddModal: true, // 模态框 展示
      // },
      // 模态框 校验
      ruleValidate: {
        name: [
          { required: true, message: "标签名不能为空", trigger: "blur" },
          { max: 20, message: "长度不超过20", trigger: "blur" }
        ],
        src: [
          { required: true, message: "链接不能为空", trigger: "blur" },
          { max: 200, message: "长度不超过200", trigger: "blur" }
          ],
        // sort: [
        //   { required: true, message: "链接不能为空", trigger: "blur" },
        //   { min: 0, message: "请输入0-999", trigger: "blur" },
        //   { max: 999, message: "请输入0-999", trigger: "blur" }
        //   ]
      },
    }
  },
  methods: {
    // 添加
    addItem() {
      this.$refs["formValidate"].validate(isOK => {
        // 表单校验通过
        if (isOK) {
          // 1.添加 更新数据
            console.log(this.formData); 
            let data = {
              name: this.formData.name,
              sort: this.formData.sort,
              src: this.formData.src
            }
          comApis.addMyNavItem(data).then(response => {
            let me = this;
            if(response.code == 200){
              console.log('请求了导航列表数据！');
              console.log(response);
              this.$emit('getDataList'); // 父重新请求 列表数据
              this.$Message.success("添加成功！");
              this.resetFormDate();
              this.closeModal(this.statusList.modalType);
            } else {
              this.$Message.warning(response.msg);
            }     
          })
          .catch(error => {
            console.log(error);
          });
        }
      });
    },
    // 更新
    editorItem() {
      this.$refs["formValidate"].validate(isOK => {
        // 表单校验通过
        if (isOK) {
          // 1.添加 更新数据
            console.log(this.formData); 
            comApis.upDataMyNavItem(this.formData).then(response => {
            let me = this;
            if(response.code == 200){
              console.log('请求了导航列表数据！');
              console.log(response);
              this.$emit('getDataList'); // 父重新请求 列表数据
              this.$Message.success("编辑成功！");
              this.resetFormDate();
              this.closeModal(this.statusList.modalType);
            } else {
              this.$Message.warning("编辑失败！");
            }   
      })
      .catch(error => {
        console.log(error);
        });
      }
      });
    },
    // 关闭 模态框 modalType：editor/add/''
    closeModal(modalType) {
      this.$emit('isShowModal', false,modalType);
    },
    // 重置表单
    resetFormDate() {
      this.$refs["formValidate"].resetFields(); // 初始化 模态框
    },
  }
}
</script>

<style lang="less" scoped>
  .add-modal {
    position: absolute;
    top: 16%;
    left: -108%;
    background-color: rgba(4, 28, 91, 0.99);
    width: 376px;
    height: 290px;
    z-index: 999999;
    .title {
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      color: #fff;
      padding-left: 16px;
      cursor: default;
      background:linear-gradient(180deg,rgba(10,53,167,0.95),rgba(4,33,110,0.95));
      border-bottom: 1px solid rgba(22,61,168,1);
      .close-modal {
        font-size: 24px;
        float: right;
        line-height: 44px;
        padding-right: 16px;
        cursor: pointer;
      }
    }
    .nav-form {
      margin: 24px 14px;
      /deep/input {
        height: 30px;
        background:rgba(6,19,57,1);
        border: 1px solid rgba(22,61,168,1);
        color:rgba(92,185,255,1);
        font-size: 12px;
        border-radius: none;
      }
      /deep/label {
        font-size: 12px;
        color:rgba(58,139,191,1);
        padding-left: 10px;
        &::before {
          content: '';
          display: none;
        }
      }
      /deep/.ivu-form-item-required .ivu-form-item-label::after {
        content: '*';
        display: inline-block;
        margin-left: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed4014;
      }
    }
    .footer-btn {
      >div {
        float: right;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color:rgba(188,226,255,1);
        cursor: pointer;
        margin-right: 10px;
        background: url(../../../static/images/modal-btn.png) no-repeat center center;
        &.reset-btn {
          float: left;
          margin-left: 20px;
        }
      }
    }
  }
</style>

