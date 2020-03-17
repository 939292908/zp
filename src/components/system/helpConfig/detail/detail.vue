<template>
  <div class="permission-container" @click="handleWrapperClick($event)">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="帮助配置" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">{{ datailTitle }}</div>
        <div class="wrapper-detail" ref="wrapperDetail">
          <Form ref="form" :model="form" :rules="ruleForm" :label-width="100">
            <div class="top">
              <div class="left">
                <FormItem prop="title" label="标题">
                  <i-Input type="text" v-model="form.title" placeholder="请输入标题"></i-Input>
                </FormItem>
              </div>
              <div class="right">
                <FormItem prop="typeValue" label="发布类型">
                  <Select v-model="form.typeValue" style="width:260px">
                    <Option
                      v-for="item in publishTypeList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.displayName }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
          </Form>
          <div class="tinymce">
            <label class="ivu-form-item-label" style="width: 100px;">内容</label>
            <div class="editer">
              <editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
            </div>
          </div>
          <div class="enclosure" v-if="form.typeValue!=3">
            <div class="enclosureTitle">附件</div>
            <div class="enclosureContent">
              <Upload
                multiple
                type="drag"
                :action="postUrl"
                :on-success="fileSuccess"
                :before-upload="fileBefore"
              >
                <div style="padding: 12px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>将附件文件拖拽至此区域，或单击本区域打开本地文件</p>
                </div>
              </Upload>
            </div>
          </div>
          <div class="fileList" v-if="!isAdd&& form.typeValue!=3">
            <div class="fileListTitle"></div>
            <div class="fileListContent">
              <Table border :columns="columns" :data="fileList">
                <template slot-scope="{ row, index }" slot="action">
                  <Icon type="md-close-circle" size="24" @click="remove(row,index)" />
                </template>
              </Table>
            </div>
          </div>
          <div class="enable">
            <div class="enableTitle">是否启用</div>
            <div class="enableContent">
              <i-switch v-model="switchVal" @on-change="switchChange" />
            </div>
          </div>
          <div class="operation">
            <div class="operationTitle"></div>
            <div class="operationContent">
              <div class="btngroup">
                <div class="btn save" @click="saveAndClose()">保存并关闭</div>
                <div class="btn delete" @click="deleteInfo()" v-if="$route.query.add == 'false'">删除</div>
                <div class="btn cancel" @click="cancelPointOut()">取消</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import switchView from "@/components/assembly/SwitchView";
import appHeader from "@/components/assembly/AppHeader";
import rightDialog from "@/components/assembly/RightDialog";
import SideBar from "@/components/assembly/Sidebar";
import switchRightView from "@/components/assembly/SwitchRightView";
import * as apis from "@/api/collection/index.js";
import * as comApis from "@/api/common.js";
import { OPTIONS_LIST } from "@/api/config.js";

import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
export default {
  name: "HelpConfigDetail",
  components: {
    // switchView,
    switchRightView,
    SideBar,
    appHeader,
    rightDialog,
    Editor
  },
  data() {
    return {
      postUrl: this.$config.collectPath + "/usehelp/v1/help/file/",
      columns: [
        {
          type: "index",
          title: "序号",
          width: 80,
          align: "center"
        },
        {
          title: "文件名称",
          key: "fileName"
        },
        {
          title: "大小",
          key: "fileSize"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ], //文件展示
      isAdd: null, //是否是添加
      file: [], //上传的文件
      fileList: [], //上传的文件
      datailTitle: "",
      publishTypeList: [], //发布类型下拉列表
      statusList: {
        typeModal: "", // 右模态框 功能切换 add/remove/detail
        MultiModal: false, // 右模态框 展示
        isDeleteModal: false, // 删除确认框 展示
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      },
      switchVal: true, //开启
      form: {
        title: "",
        type: "",
        typeValue: ""
      },
      ruleForm: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        typeValue: [
          { required: true, message: "发布类型不能为空", trigger: "change" }
        ]
      },
      tinymceHtml: "请输入帮助信息的具体内容",
      init: {
        language_url: require("../../../../../static/tinymce/zh_CN.js"),
        language: "zh_CN",
        skin_url: require("../../../../../static/tinymce/skins/lightgray/skin.min.css"),
        height: 300,
        selector: "textarea", // change this value according to your HTML
        max_height: 300,
        min_height: 300,
        plugins: "link lists code colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough  fontsizeselect  forecolor backcolor  alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false,
        menubar: false //菜单禁用
      }
    };
  },
  beforeMount() {},
  mounted() {
    const that = this;
    tinymce.init({});
    that.initialize();
    if (that.$route.query.add == "true") {
      that.isAdd = true;
      that.datailTitle = "新建帮助信息";
    } else if (that.$route.query.add == "false") {
      that.isAdd = false;
      that.datailTitle = "编辑帮助信息";
      that.getHelpInfoById();
    }
  },
  methods: {
    /**
     * 新增编辑配置
     * @author huangjun
     */
    // 删除文件deletefile
    remove(params, index) {
      const that = this;
      that.$Modal.confirm({
        title: "温馨提示",
        content: "是否删除" + params.linkName + "文件？",
        onOk: () => {
          that.deletefile(params, index);
        },
        onCancel: () => {}
      });
    },
    deletefile(params, index) {
      const that = this;
      apis.deletefile(params.fileId).then(res => {
        if (res.code == 200) {
          console.log(res);
          that.$Message.success("文件删除成功！");
          that.fileList.splice(index, 1);
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // 编辑进入
    getHelpInfoById() {
      const that = this;
      apis.getHelpInfoById(this.$route.query.id).then(res => {
        if (res.code == 200) {
          console.log(res);
          that.tinymceHtml = res.data.intro;
          that.form.type = res.data.type;
          that.form.title = res.data.title;
          that.form.typeValue = res.data.typeValue;
          that.fileList = res.data.files;
          if (res.data.state == "1") {
            that.switchVal = true;
          } else {
            that.switchVal = false;
          }
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // 上传之前
    fileBefore(file) {
      const that = this;
      console.log(file);
      that.file.push(file);
    },
    // 上传成功后
    fileSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    // 保存并关闭
    saveAndClose() {
      const that = this;
      that.$refs["form"].validate(valid => {
        if (valid) {
          if (
            that.tinymceHtml == "请输入帮助信息的具体内容" ||
            !that.tinymceHtml
          ) {
            that.$Message.error("请填写发布内容！");
          } else {
            var id = "";
            if (!this.isAdd) {
              id = that.$route.query.id;
            }
            let type = this.publishTypeList.find(
              x => x.value == that.form.typeValue
            );
            var params = {
              id: id,
              intro: that.tinymceHtml,
              state: that.switchVal ? "1" : "0",
              title: that.form.title,
              type: type.displayName,
              typeValue: that.form.typeValue
            };
            console.log(params);
            that.saveHelpInfo(params);
          }
        } else {
          that.$Message.error("请填写发布标题以及类型！");
        }
      });
      // if(this.tinymceHtml ){}
    },
    saveHelpInfo(data) {
      const that = this;
      apis.savaHelp(data).then(res => {
        if (res.code == 200) {
          that.$Message.success("信息保存成功！");
          if (that.file.length == 0) {
            that.cancelEdit();
          } else {
            that.uploadFiles(res.data.id);
          }

          // that.cancelEdit();
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    uploadFiles(id) {
      const that = this;

      var url = that.postUrl + id;
      //多个文件上传
      for (var i = 0; i < that.file.length; i++) {
        let formData = new FormData(); //创建 formData 对象

        formData.append("file", that.file[i]); // 文件对象
        that.postUploadFile(url, formData, i);
      }
    },
    postUploadFile(url, formData, i) {
      const that = this;
      that.$axios.post(url, formData).then(resu => {
        if (resu.code == 200) {
          if (i + 1 == that.file.length) {
            that.cancelEdit();
          }
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // 删除
    deleteInfo() {
      const that = this;
      that.$Modal.confirm({
        title: "温馨提示",
        content:
          "是否删除标题是" + that.form.title + "的" + that.form.type + "？",
        onOk: () => {
          that.deleteInfoById();
        },
        onCancel: () => {}
      });
    },
    deleteInfoById() {
      const that = this;
      apis.deleteHelpInfo(that.$route.query.id).then(res => {
        if (res.code == 200) {
          that.$Message.success("删除成功");
          that.cancelEdit();
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    cancelPointOut() {
      const that = this;
      that.$Modal.confirm({
        title: "温馨提示",
        content: "是否离开当前页面？",
        onOk: () => {
          that.cancelEdit();
        },
        onCancel: () => {}
      });
    },
    // 取消
    cancelEdit() {
      const { href } = this.$router.resolve({
        name: "HelpConfig"
      });
      window.location.href = href;
    },
    switchChange(status) {
      console.log(this.switchVal);
      if (status) {
        this.$Message.info("启用");
      } else {
        this.$Message.info("不启用");
      }
    },
    // 发布类型选择
    initialize() {
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.PUBLISH_TYPE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.PUBLISH_TYPE
        })
        .then(res => {
          this.publishTypeList = res;
        });
    }
  }
};
</script>
<style lang="less" scoped>
@widthH: 100%;
@imageUrl: "../../../../../";
@borderColor: #dcdfe6;
.content {
  position: absolute;
  left: 240px;
  top: 68px;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  .wrapper {
    position: absolute;
    top: 2px;
    left: 0;
    right: 0;
    bottom: 6px;
    background: url("@{imageUrl}static/images/net.png") repeat #ffffff;
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
  }
  .wrapper-detail {
    position: absolute;
    top: 41px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    padding: 20px 40px;
    color: #333;

    .tinymce {
      width: 100%;
      label {
        width: 98px;
        display: block;
        text-align: right;
        float: left;
        font-size: 12px;
        color: #515a6e;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
      }
      label::before {
        content: "*";
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed4014;
      }
      .editer {
        width: calc(100% - 114px);
        float: left;
      }
    }
    .enclosure {
      margin-top: 20px;
      .enclosureTitle {
        width: 98px;
        display: block;
        text-align: right;
        float: left;
        font-size: 12px;
        color: #515a6e;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
      }
      .enclosureContent {
        width: calc(100% - 112px);
        float: left;
      }
    }
    .enable {
      margin-top: 20px;
      .enableTitle {
        width: 98px;
        display: block;
        text-align: right;
        float: left;
        font-size: 12px;
        color: #515a6e;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
      }
      .enableContent {
        width: calc(100% - 112px);
        float: left;
        margin-top: 5px;
      }
    }
    .fileList {
      margin-top: 20px;
      .fileListTitle {
        width: 98px;
        display: block;
        text-align: right;
        float: left;
        font-size: 12px;
        color: #515a6e;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
      }
      .fileListContent {
        width: calc(100% - 112px);
        float: left;
      }
    }
    .operation {
      margin-top: 20px;
      .operationTitle {
        width: 98px;
        display: block;
        text-align: right;
        float: left;
        font-size: 12px;
        color: #515a6e;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
      }
      .operationContent {
        width: calc(100% - 112px);
        float: left;
        .btngroup {
          float: right;
          display: flex;
          cursor: pointer;
          .btn {
            padding: 4px 8px;
            font-size: 13px;
            text-align: center;
            border-radius: 2px;
            margin-right: 11px;
          }
          .save {
            color: #ffffff;
            border: #0668c8;
            background: #0668c8;
          }
          .delete {
            color: #ffffff;
            border: #d55459;
            background: #d55459;
          }
          .cancel {
            color: #333333;
            border: 1px solid #cccccc;
            background: #ffffff;
          }
        }
      }
    }
  }
}
.tinymce::after,
.enclosure::after,
.enable::after,
.fileList::after,
.operation::after {
  content: ".";
  clear: both;
  height: 0;
  visibility: hidden;
  display: block;
}
/deep/.ivu-form {
  .top::after {
    content: ".";
    clear: both;
    height: 0;
    visibility: hidden;
    display: block;
  }
  .top {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    width: 100%;
    .left {
      width: 40%;
      float: left;
      input {
        width: 340px;
      }
    }
    .right {
      float: right;
      width: 40%;
      .ivu-select-selection {
        width: 340px;
      }
      .ivu-select-dropdown {
        width: 340px;
      }
    }
  }
}
/deep/.mce-tinymce.mce-container.mce-panel {
  .mce-container.mce-menubar.mce-toolbar.mce-first {
    display: none;
  }
}
.mce-btn.mce-active,
.mce-btn.mce-active:hover,
.mce-btn.mce-active:focus,
.mce-btn.mce-active:active {
  background: #3399ff;
}
.mce-container-body.mce-flow-layout {
  display: none;
}
</style>
