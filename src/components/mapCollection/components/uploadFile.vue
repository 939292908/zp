<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 09:09:18
 * @LastEditTime: 2019-10-08 14:40:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 上传图片 -->
  <Modal v-model="modal" :width="741" :z-index="zIndex" :mask-closable="false" @on-cancel="cancel">
    <div class="modal-bg">
      <div class="modal-top-line-bg"></div>
      <div class="modal-top-bg"></div>
    </div>
    <!-- 下拉框 -->
    <div class="header-title">
      <span class>上传采集信息</span>
    </div>
    <div class="upload-image-body">
      <div class="search">
        <span>选择采集文件类型：</span>
        <span class="search-value">
          <Select ref="mapType" class="search-control" v-model="mapType" style="width:280px;">
            <Option
              :title="item.taskName"
              v-for="(item,index) in mapTypeList"
              :value="item.value"
              :label="item.taskName"
              :key="index"
            >{{ item.taskName }}</Option>
          </Select>
        </span>
      </div>
      <!-- 上传和模板下载-->
      <Row>
        <Col span="24">
          <!-- 上传文件区域 -->
          <div class="upload-wrapper" style>
            <label
              for="fileUpload"
              class="upload-image-box"
              @drop.prevent="onDrop"
              @paste="handlePaste"
              @dragover.prevent="dragOver = true"
              @dragleave.prevent="dragOver = false"
            >
              <span v-if="fileList.length <= 0" class="icon-add">
                <i class="iconfont icon-shangchuanbiaodan"></i>
                <span>点击上传文件，或者直接将文件拖到这里</span>
              </span>
              <div class="process-list" v-if="fileList.length > 0">
                <div class="process-item" :key="index" v-for="(file,index) in fileList">
                  <div class="process-file">
                    <i class="iconfont icon-Excel"></i>
                    <span>{{file.name}}</span>
                  </div>
                  <div class="process-status">
                    <div class="upload-process">
                      <span>{{ uploadFilesStatusObj && uploadFilesStatusObj.value}}</span>
                      <br v-if="uploadFilesStatus == 'error' || uploadFilesStatus == 'complete'" />
                      <span
                        v-if="uploadFilesStatus == 'error' || uploadFilesStatus == 'complete'"
                        class="upload-reupload"
                        @click.prevent="handleReupload"
                      >重新上传</span>
                    </div>
                    <div class="upload-icon">
                      <!-- <Icon class="upload-icon-process" type="ios-loading" /> -->
                      <Icon
                        v-if="uploadFilesStatusObj"
                        :class="'upload-icon-' + uploadFilesStatusObj.key"
                        :type="uploadFilesStatusObj.type"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <input
                ref="input"
                id="fileUpload"
                type="file"
                class="upload-image-file"
                name="file"
                @change.prevent="handleChange($event)"
              />
            </label>
            <!-- 如果有错误信息显示 -->
            <div class="upload-error-box" v-if="errorContent.length > 0">
              <div class="upload-line"></div>
              <div class="upload-error-wrapper">
                <p class="error-title">错误信息:</p>
                <div class="error-list">
                  <div
                    :key="index"
                    v-if="errorContent.length>0 ? true : false"
                    v-for="(error,index) in errorContent"
                  >
                    <span v-if="error.rowNum">
                      <!-- {{ '在第'+ error.rowNum +'行第'+ error.columnNum +'列中发现'+ error.errorMsg}} -->
                      在第
                      <span style="color:red;">{{error.rowNum}}</span>
                      行{{ error.columnNum > 0 ? '第 ' : ''}}<span v-if="error.columnNum > 0" style="color:red;">{{error.columnNum}}</span>{{error.columnNum > 0 ?' 列' : ''}}中{{error.errorMsg}}
                    </span>
                    <span v-else>{{error.errorMsg}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 模板下载区域 -->
          <div class="template-wrapper">
            <p class="template-title">采集内容模板下载：</p>
            <ul class="templste-list">
              <li :key="index" v-for="(file,index) in templateList">
                <a :href="fileDownloadPath+file.url">{{file.linkName}}</a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
    <!-- 底部按钮区域 -->
    <div class="footer">
      <!-- 备用 -->
      <div class="footer-left">
        <!-- <i-button v-if="uploadFilesStatus == 'complete'" type="text" @click="handleDownload">下载文件</i-button>
        <span v-if="uploadFilesStatus == 'complete'">已将上述错误信息在Excel中注明<br/>可下载后直接修改</span>-->
      </div>
      <div class="footer-right">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="text" :loading="loading" :disabled="loading" @click="ok">确定</i-button>
      </div>
    </div>
  </Modal>
</template>
<script>
import {
  uploadExcel,
  getTypeList,
  templateList
} from "@/api/collection/index.js";
export default {
  name: "UploadFile",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 10000
    }
  },
  computed: {
    uploadFilesStatusObj() {
      let item = this.uploadStatus.find(x => {
        return x.key == this.uploadFilesStatus;
      });
      return item;
    }
  },
  data() {
    return {
      paste: false, //是否支持粘贴上传文件
      loading: false,
      modal: false, //上传模态框的显示
      dragOver: false,
      fileList: [],
      errorContent: [],
      path: this.$config.collectPath,
      uploadFilesStatus: "",
      fileDownloadPath: this.$config.fileDownloadPath,
      uploadStatus: [
        {
          key: "process",
          value: "上传中...",
          type: "ios-loading"
        },
        {
          key: "error", //前台静态验证如果上传验证有问题的状态,
          value: "上传失败",
          type: "md-warning"
        },
        {
          key: "complete", //接口调用如果上传验证有问题的状态,
          value: "上传失败",
          type: "md-warning"
        },
        {
          key: "success",
          value: "已上传",
          type: "md-checkmark-circle"
        }
      ],
      mapTypeList: [], //采集文件类型集合
      mapType: "T006", //采集文件类型
      templateList: [] //可下载的模板文件集合
    };
  },
  created() {
    //this.getMapTypeList();
  },
  mounted(){
    this.getInit();
  },
  methods: {
    getInit() {
      this.getMapTypeList();
      this.getTemplateList();
    },
    // 获取采集文件类型的数据
    getMapTypeList() {
      getTypeList().then(res => {
        if (res.code == 200) {
          var result = res.data;
          result.forEach(function(item) {
            item.value = item.id;
          });
          this.mapTypeList = result;
        } else {
          this.mapTypeList = [];
        }
      });
    },
    // 获取下载的模板的数据
    getTemplateList() {
      //var arr = [];
      // for(var i = 0; i< 12; i++) {
      //   arr.push({
      //     name:'历年危安案(事)件涉案(线)人员网络关系图'+i,
      //     path:'历年危安案(事)件涉案(线)人员网络关系图'
      //   })
      // }

      templateList().then(res => {
        if (res.code == 200) {
          var arr = res.data;
          this.templateList = arr;
        }
      });
    },
    // 取消关闭按钮事件
    cancel() {
      this.modal = false;
      this.mapType = null
      this.$refs.mapType.reset();
      this.fileList = []
      this.errorContent = []
      this.loading = false
      this.$emit("input", this.modal);
    },
    // 点击确定按钮事件
    ok() {
      this.modal = false;
      this.$emit("input", this.modal);
      this.$emit("upload-callback", this.fileList);
    },
    handleReupload() {
      this.$refs.input.click();
    },
    onDrop(e) {
      this.dragOver = false;
      this.uploadFiles(e.dataTransfer.files);
    },
    // 粘贴事件
    handlePaste(e) {
      if (this.paste) {
        this.uploadFiles(e.clipboardData.files);
      }
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files);
      if (postFiles.length === 0) return;
      postFiles.forEach(file => {
        this.upload(file);
      });
    },
    // 上传文本框change事件
    handleChange(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.clearInputFile();
    },
    clearInputFile() {
      this.$refs.input.value = null;
    },
    // 上传文件之前
    beforeUpload(file) {
      // 验证是否选择了上传的文件类型
      if (!this.mapType) {
        this.errorContent = [
          {
            rowNum: null,
            columnNum: null,
            errorMsg: "请选择采集文件类型"
          }
        ];
        this.uploadFilesStatus = "error";
        return false;
      }
      // 验证文件类型和大小
      let fileName = file.name;
      let fileType = fileName.substr(fileName.lastIndexOf("."));
      if (!(fileType == ".xls" || fileType == ".xlsx" || fileType == ".xlsm")) {
        this.clearInputFile();
        this.errorContent = [
          {
            rowNum: null,
            columnNum: null,
            errorMsg: "仅支持xls / xlsx / xlsm 格式的Excel文件"
          }
        ];
        this.uploadFilesStatus = "error";
        return false;
      }
      let fileSize = file.size;
      if (fileSize > 100 * 1024 * 1024) {
        this.clearInputFile();
        this.errorContent = [
          {
            rowNum: null,
            columnNum: null,
            errorMsg: "Excel文件的大小最大不能超过100MB"
          }
        ];
        this.uploadFilesStatus = "error";
        return false;
      }
      return true;
    },
    // 正式上传
    upload(file) {
      var me = this;
      me.fileList = [file];
      // 上传文件之前，验证文件类型和大小是否正确
      if (!me.beforeUpload(file)) return;
      // 文件验证正确,调用上传文件接口
      me.uploadFilesStatus = "process";
      me.post(me.fileList[0], res => {
        if (res.code == 200) {
          if (res.data.verifyPassed) {
            me.uploadFilesStatus = "success";
            me.$Message.success("上传成功");
            me.$emit("initList");
            me.errorContent = [];
          } else {
            var result = res.data.errorItemList;
            me.uploadFilesStatus = "complete";
            me.errorContent = result;
          }
        } else {
          me.uploadFilesStatus = "complete";
          me.errorContent = [
            {
              rowNum: null,
              columnNum: null,
              errorMsg: res.msg || res.message
            }
          ];
        }
      });
    },
    // 上传失败文件的下载事件
    handleDownload() {},
    // 下载文件
    _download(file) {},
    // 上传文件接口
    post(file, callback) {
      let formData = new FormData();
      formData.append("file", file);

      uploadExcel(this.mapType, formData)
        .then(res => {
          callback(res);
        })
        .catch(res => {
          callback(res);
        });
    }
  },
  watch: {
    value: {
      handler(val) {
        this.modal = val;
        if(val){
          this.mapType = 'T006'
          this.fileList = []
          this.errorContent = []
          this.loading = false
          // this.getInit();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../css/style.less";
</style>
<style lang="less" scoped>
@imageUrl: "../../../../";
.search {
  padding: 15px 0;
}
/deep/ .ivu-modal {
  .ivu-modal-content {
    width: 741px;
    height: 520px;
    max-height: 563px;
    min-height: 450px;
    background: transparent;
    position: relative;
  }
  .ivu-modal-close .ivu-icon-ios-close {
    color: #ffffff;
  }
  .footer {
    border-top: 1px solid transparent;
    padding: 12px 18px 12px 18px;
    position: absolute;
    width: 100%;
    bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer-left {
      display: inline-flex;
      align-items: center;
      > span {
        display: inline-block;
        margin-left: 10px;
        color: rgba(82, 102, 147, 1);
      }
    }
    button {
      background: url("@{imageUrl}static/images/btn-entity.png") 0 0 no-repeat;
      width: 93px;
      color: #bce2ff;
      font-size: 14px;
    }
  }
  .upload-image-body {
    color: #bce2ff;
    position: absolute;
    top: 50px;
    bottom: 66px;
    width: 100%;
    padding: 0 16px;
    overflow-y: auto;
  }
  .upload-image-body::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .upload-image-body::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  .upload-image-body::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 1);
    border-radius: 5px;
  }
  .upload-image-body::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 183, 245, 1);
  }
  .upload-image-body::-webkit-scrollbar-corner {
    background-color: #dadada;
  }
  .upload-wrapper {
    border: 1px dashed #194d7e;
    box-shadow: 0 0 2px #7e9fd1;
    background: #7e9fd1;
    width: 100%;
    color: #3b5694;
    font-size: 14px;
  }
  .upload-line {
    border-top: 1px dashed rgba(25, 56, 100, 1);
    width: 96%;
    margin: 0 auto;
  }
  .upload-error-wrapper {
    padding: 0 0 15px 15px;
    max-height: 110px;
    overflow-y: auto;
    margin-top: 15px;
  }
  .error-title {
    font-weight: 600;
    padding-bottom: 4px;
  }
  .error-list {
    color: #526693;
    padding-right: 15px;
  }
  .template-wrapper {
    margin-top: 15px;
  }
  .template-title {
    padding-bottom: 10px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .templste-list {
    li a {
      text-decoration: underline;
    }
    li {
      float: left;
      margin-right: 15px;
      padding: 4px 0;
    }
  }
  .upload-error-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .upload-error-wrapper::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  .upload-error-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 0.4);
    border-radius: 5px;
  }
  .upload-error-wrapper::-webkit-scrollbar-thumb:hover {
    background-color: #204c9d;
  }
  .upload-error-wrapper::-webkit-scrollbar-corner {
    background-color: #dadada;
  }
  .upload-image-box {
    width: 100%;
    height: 120px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    .icon-add {
      display: inline-flex;
      align-items: center;
      position: relative;
      left: 50px;
      > span {
        font-size: 14px;
      }
      i {
        color: #425d99;
        font-size: 30px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  .upload-image-desc {
    margin-top: 10px;
    color: #485c91;
    font-size: 14px;
  }
  .upload-image-info {
    height: 103px;
    line-height: 103px;
    display: inline-block;
    width: 100%;
    font-size: 14px;
    i {
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .upload-image-file {
    position: absolute;
    top: -1000px;
  }
  .process-list {
    width: 100%;
    .process-item {
      display: flex;
      align-items: center;
      padding: 0 15px;
      font-weight: 600;
      .process-file {
        width: 100%;
        > i {
          font-size: 40px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(54, 142, 204, 1);
          padding: 12px;
        }
        > span {
          max-width: 360px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .process-status {
        width: 160px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .upload-reupload {
          font-weight: 500;
          text-decoration: underline;
          color: rgba(191, 213, 246, 1);
        }
        .upload-icon {
          i {
            font-size: 30px;
            color: rgba(171,205,255,1);
          }
        }
      }
    }
  }
  .header-title {
    width: 200px;
    font-size: 16px;
    font-weight: 400;
    color: #8ebeef;
    position: absolute;
    padding: 9px 16px;
  }
  .header-top-bg {
    width: 613px;
    height: 41px;
    background: rgba(20, 47, 120, 1);
  }
  .modal-bg {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(15, 41, 99, 1),
      rgba(39, 70, 150, 1)
    );
    border: 1px solid;
    border-image: linear-gradient(
        180deg,
        rgba(39, 70, 148, 1),
        rgba(19, 43, 101, 1)
      )
      1 1;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
    position: absolute;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .modal-top-bg {
    height: 66px;
    position: absolute;
    width: 555px;
    right: -2px;
    border-top: 39px solid #142f78;
    border-left: 26px solid transparent;
    top: 0px;
  }
  .modal-top-line-bg {
    width: 189px;
    height: 15px;
    position: absolute;
    top: -12px;
    left: -1px;
    border-radius: 4px;
    border-right: 5.5px solid transparent;
    border-bottom: 7.5px solid #274694;
  }
  .ivu-modal-header,
  .ivu-modal-footer {
    display: none;
  }
  .ivu-modal-body {
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .upload-icon-process {
    animation: rotate 3s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
}
</style>

<style lang="less">
.ivu-modal-body {
  .ivu-select-dropdown::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .ivu-select-dropdown::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  .ivu-select-dropdown::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 1);
    border-radius: 5px;
  }
  .ivu-select-dropdown::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 183, 245, 1);
  }
  .ivu-select-dropdown::-webkit-scrollbar-corner {
    background-color: #dadada;
  }
}
</style>
