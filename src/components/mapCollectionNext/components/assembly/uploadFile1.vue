<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 10:35:16
 * @LastEditTime: 2019-09-02 11:23:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 上传 -->
  <div class="upload-file-box">
    <div class="upload-wrapper" style>
      <label
        :for="id"
        class="upload-image-box"
        @drop.prevent="onDrop"
        @paste="handlePaste"
        @dragover.prevent="dragOver = true"
        @dragleave.prevent="dragOver = false"
      >
      <!-- 上传功能input -->
        <input
          ref="input"
          :id="id"
          type="file"
          class="upload-image-file"
          name="file"
          @change="handleChange($event)"
        />
        <!-- 上传区域 -->
        <div v-if="!isSuccess" class="icon-add">
          <!-- 失败 -->
          <slot name="errorMsg">
            <div class="info-box" v-if="!isSuccess && isUpload">
              <div class="info-top error">
                <div class="map-name">{{fileName}}</div>
                <div class="map-size">{{resFileSize}}</div>
                <div class="time">{{uploadTime}}</div>
                <div class="icon">上传失败<i class="iconfont icon-guanbi2fill"></i></div>
              </div>
            </div>
          </slot>
          <!-- 提示 -->
          <i v-if="!isUpload" class="iconfont icon-shangchuanbiaodan"></i>
          <p>将Excel文件拖拽至此区域或</p>
          <p>单击本区域打开本地文件</p>
        </div>
      </label>
      <!-- 成功列表 -->
      <div class="process-list" v-if="isSuccess">
        <div class="process-item" :key="index" v-for="(file,index) in fileList">
          <slot name="successMsg">
            <!-- 成功item -->
            <div class="info-box">
              <div class="info-top success">
                <div class="map-name" :title="fileName">{{fileName}}</div>
                <div class="map-size">{{resFileSize}}</div>
                <div class="time">{{uploadTime}}</div>
                <div class="icon">上传成功<i class="iconfont icon-shangchuanchenggong"></i></div>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { uploadExcel } from "@/api/collection/index.js";
import * as apis from "@/api/collection/index.js";

export default {
  props: {
    // input id (页面出现多个组件时使用)
    id: {
      type: String,
      default: "file"
    },
    // 是否需要本地校验
    isLocalVerify: { 
      type: Boolean,
      default: true
    },
    // 校验规则
    verify: {
      type: Object,
      default: () => {
        return {
          type: [".xlsx", ".xlsm"],
          size: 100,
        }
      }
    },
    // 本地文件校验通过后回调 (参数为上传的内容)
    getFileData: {
      type: Function,
      default: () => {}
    },
    // 是否上传成功
    isSuccess: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isUpload: false, // 是否上传过

      isExcel: false, // 是否Excel采集 （跳转第3步，判断下一步使用的接口）
      uploadIsOk: false, // 上传是否ok
      fileSize: "", // 文件大小
      resFileSize: "", // 从后端获取的文件大小
      fileName: "", // 文件名称
      uploadTime: "", // 上传时间
      dragOver: false,
      errorContent: [],
      paste: false, // 是否支持粘贴上传文件
      fileList: []
    };
  },
  created() {
  
  },
  methods: {
    // 拖拽松开事件
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
    // 多文件上传
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files);
      if (postFiles.length !== 0) postFiles.forEach(file => this.upload(file));
    },
    // 上传文件之前
    beforeUpload(file) {
      // 1、存信息
      this.fileSize = file.size; // 文件大小
      this.uploadTime = this.$moment().format('YYYY-MM-DD HH:mm:ss'); // 时间
      // this.fileName = file.name.substr(0,file.name.lastIndexOf(".")); // 文件名
      // 2、校验
      let fileName = file.name;
      let fileType = fileName.substr(fileName.lastIndexOf("."));
      // 类型
      if (!this.verify.type.some(item => fileType == item)) {
      // if (!(fileType == ".xlsx" || fileType == ".xlsm")) {
        this.clearInputFile();
        this.errorContent = [
          {
            rowNum: null,
            columnNum: null,
            errorMsg: "仅支持xls / xlsx 格式的Excel文件"
          }
        ];
        return false;
      }
      // 大小
      if (this.fileSize > this.verify.size * 1024 * 1024) {
      // if (this.fileSize > 100 * 1024 * 1024) {
        this.clearInputFile();
        this.errorContent = [
          {
            rowNum: null,
            columnNum: null,
            errorMsg: "Excel文件的大小最大不能超过100MB"
          }
        ];
        return false;
      }
      return true;
    },
    // 正式上传
    upload(file) {
      var me = this;
      // 是否需要本地校验
      if (this.isLocalVerify) {
        if (!me.beforeUpload(file)) {
          me.errorContent.forEach(item => me.$Message.warning(item.errorMsg));
          return;
        }
      }
      me.isUpload = true; // 标记上传过
      // 文件
      let formData = new FormData();
      formData.append("file", file);
      // 可接受 file 文件
      me.getFileData(formData);
    },
    // 上传文本框change事件
    handleChange(e) {
      const files = e.target.files;
      if (!files) return;
      this.uploadFiles(files);
      this.clearInputFile();
    },
    // 重置
    resetUpload() {
      this.clearInputFile();
      this.isSuccess = false;
      this.isUpload = false;
    },
    // 清空上传
    clearInputFile() {
      this.$refs.input.value = null;
    },
    handleReupload() {
      this.$refs.input.click();
    }
  },
};
</script>

<style lang="less" scoped>
// 上传盒子
.upload-file-box {
  border: 1px dashed #ddd;
  // 文件列表
  .process-list {
    width: 100%;
    .process-item {
      padding: 0 24px 24px;
    }
  }
  // 消息
  .info-box {
    .info-top {
      height: 36px;
      line-height: 36px;
      padding: 0 12px;
      border-radius: 4px;
      overflow: hidden;
      color: #333;
      >div {
        float: left;
        padding-right: 14px;
      }
      .map-name {
        padding-right: 10px;
        width: 32%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .icon {
        float: right;
        padding-right: 0;
        i {
          font-size: 22px;
          padding-left: 6px;
          vertical-align: middle;
        }
      }
    }
    // 失败
    .info-top.error {
      border: 1px solid rgba(205, 67, 67, 1);
      background-color: #FFF1F1;
      .icon {
        color: #CE4343;
        i {
          color: #CE4343;
          }
      }
    }
    // 成功
    .info-top.success {
      border: 1px solid #239B3A;
      background-color: #F1FDF3;
      .icon {
        color: #249B3A;
        i {
          color: #249B3A;
          }
      }
    }
    // 消息列表
    .msg-list {
      text-align: left;
      color: #999;
      font-size: 14px;
      margin: 14px 0 20px;
      max-height: 120px;
      overflow: auto;
      li {
        padding-bottom: 4px;
      }
    }
    // 人员列表
    .people-list-title {
      color: #999;
      font-size: 14px;
      text-align: left;
    }
    .people-list {
      color: #999;
      font-size: 14px;
      text-align: left;
      margin-bottom: 8px;
      max-height: 128px;
      overflow: auto;
      // overflow: hidden;
      li {
        padding-top: 4px;
        overflow: hidden;
        >div {
          float: left;
        }
        .name {
          float: left;
          width: 36%;
          margin-right: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
  }
  .upload-image-box {
    width: 100%;
    height: 140px;
    position: relative;
    padding: 15px;
    .icon-add {
      text-align: center;
      position: relative;
      padding: 0 24px;
      > span {
        font-size: 14px;
      }
      i {
        // color: #227547;
        font-size: 30px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      border: 0;
    }
    .upload-image-file {
      position: absolute;
      top: -1000000px;
    }
  }
}
</style>
