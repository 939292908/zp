<!--
 * @Author: your name
 * @Date: 2019-11-23 15:36:06
 * @LastEditTime: 2019-11-26 14:43:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\components\caseInfo\batchImportCase.vue
 -->
<template>
  <!-- 批量导入 -->
  <Modal
    v-model="showModal"
    title="批量导入人员基础信息"
    @on-cancel="cancel"
    :width="437"
    :mask-closable="false"
  >
    <!-- 上传 -->
    <div class="upload-file-box">
      <div class="upload-file-wrapper">
        <label
          for="caseFile"
          class="upload-image-box"
          @drop.prevent="onDrop"
          @paste="handlePaste"
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false"
        >
          <!-- 上传功能input -->
          <input
            ref="input"
            id="caseFile"
            type="file"
            class="upload-image-file"
            name="file"
            @change="handleChange($event)"
          />
          <!-- 上传区域 -->
          <div class="icon-add">
            <!-- 提示 -->
            <i class="iconfont icon-shangchuanbiaodan"></i>
            <p>将Excel文件拖拽至此区域或</p>
            <p>单击本区域打开本地文件</p>
          </div>
        </label>
      </div>
      <div class="upload-reasult">
        <!-- 失败 -->
        <div class="info-box" v-if="!uploadIsOk && isExcel">
          <div class="info-top error">
            <div class="map-name" :title="fileName">{{fileName}}</div>
            <!-- <div class="map-size">{{resFileSize}}</div>
            <div class="time">{{uploadTime}}</div>-->
            <div class="icon">
              上传失败
              <i class="iconfont icon-guanbi2fill"></i>
            </div>
          </div>
          <!-- 消息列表 -->
          <ul class="msg-list">
            <li v-for="(error,index) in errorContent" :key="index">
              {{index + 1 + '.'}}
              <span v-if="error.rowNum">
                在第
                <span style="color:red;">{{error.rowNum}}</span>
                行中{{error.errorMsg}}
              </span>
              <span v-else>{{error.errorMsg}}</span>
            </li>
            <!-- <li>2.  上传文件包含<strong style="color: #0668C8">10</strong>个人员，其中<strong style="color: #E51C23">3</strong>人的人员信息与系统人员信息台账不一致</li> -->
          </ul>
        </div>
        <!-- 成功列表 -->
        <div class="process-list" v-if="uploadIsOk">
          <div class="process-item" :key="index" v-for="(file,index) in fileList">
            <!-- 成功item -->
            <div class="info-box">
              <div class="info-top success">
                <div class="map-name" :title="fileName">{{fileName}}</div>
                <!-- <div class="map-size">{{resFileSize}}</div>
                <div class="time">{{uploadTime}}</div>-->
                <div class="icon">
                  上传成功
                  <i class="iconfont icon-shangchuanchenggong"></i>
                </div>
              </div>
              <!-- 消息列表 -->
              <ul class="msg-list">
                <!-- 1 -->
                <li v-if="totalCase > 0">
                  共检索出
                  <strong style="color: #0668C8">{{totalCase}}</strong>
                  个人员并成功导入！
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button type="primary" v-show="uploadIsOk" @click="handleFinish">完成</Button>
      <Button type="primary" v-show="!uploadIsOk && isExcel" @click="handleReupload">重新导入</Button>
      <Button @click="cancel">取消</Button>
    </div>
    <Loading v-model="showLoading" size="small" :maskClosable="false"></Loading>
  </Modal>
</template>

<script>
import * as apis from "@/api/collection/index.js";
import Loading from "@/components/assembly/Loading";
export default {
  name: "batchImportPersonInfo",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLoading: false,
      showModal: false,
      isExcel: false, // 是否Excel采集 （跳转第3步，判断下一步使用的接口）
      uploadIsOk: false, // 上传是否ok
      fileSize: "", // 文件大小
      resFileSize: "", // 从后端获取的文件大小
      fileName: "", // 文件名称
      uploadTime: "", // 上传时间
      totalCase: 0, // 总案件线索数
      errorPeople: 0, // 失败人数
      errorPeopleList: [], // 失败人员列表
      dragOver: false,
      errorContent: [],
      paste: false, //是否支持粘贴上传文件
      fileList: []
    };
  },
  components: {
    Loading
  },
  methods: {
    cancel() {
      this.showModal = false;
      this.resetUpload();
    },
    handleFinish() {
      this.showModal = false;
      this.resetUpload();
      setTimeout(() => {
        this.$parent.refreshData();
      }, 500);
    },
    showBatchModal() {
      this.showModal = true;
    },
    // 上传文件接口
    post(file, callback) {
      let formData = new FormData();
      formData.append("file", file);
      // 上传案件线索文件
      apis
        .uploadExcel("T000", formData)
        .then(res => {
          callback(res);
        })
        .catch(res => {
          callback(res);
        });
    },
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
      if (postFiles.length === 0) return;
      postFiles.forEach(file => {
        this.upload(file);
      });
    },
    // 上传文件之前
    beforeUpload(file) {
      // debugger;
      // 1.存文件信息
      this.fileSize = file.size;
      // this.fileName = file.name.substr(0, file.name.lastIndexOf("."));
      // 2.本地校验
      let fileName = file.name;
      this.fileName = fileName.substr(0, fileName.lastIndexOf("."));
      let fileType = fileName.substr(fileName.lastIndexOf("."));
      // 类型
      if (!(fileType == ".xlsx" || fileType == ".xlsm")) {
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
      if (this.fileSize > 100 * 1024 * 1024) {
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
      // 上传文件之前，验证文件类型和大小是否正确
      if (!me.beforeUpload(file)) {
        me.errorContent.forEach(item => me.$Message.warning(item.errorMsg));
        return;
      }
      me.fileList = [file];
      // 验证通过,调用上传文件接口
      me.showLoading = true;
      me.post(me.fileList[0], res => {
        me.isExcel = true; // Excel采集模式
        me.showLoading = false;
        if (res.code == 200) {
          // 成功
          if (res.data.verifyPassed) {
            me.uploadIsOk = true; // 成功标记
            // 编辑进来，不需要提示
            me.$Message.success("上传成功");
            me.totalCase = res.data.validateReturnValue;
            // 失败
          } else {
            var result = res.data.errorItemList;
            me.uploadIsOk = false;
            me.errorContent = result;
            me.errorPeopleList = res.data.idNumberList; // 失败人员列表
          }
        } else {
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
    // 上传文本框change事件
    handleChange(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.clearInputFile();
    },
    // 重置
    resetUpload() {
      this.clearInputFile();
      this.uploadIsOk = false;
      this.isExcel = false;
    },
    // 清空上传
    clearInputFile() {
      this.$refs.input.value = null;
    },
    handleReupload() {
      this.$refs.input.click();
    }
  },
  watch: {
    value: {
      handler(val) {
        this.modal = val;
        if (val) {
          this.fileList = [];
          this.errorContent = [];
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
// 上传盒子
.upload-file-box {
  .upload-file-wrapper {
    border: 1px dashed #ddd;
    background-color: #fafafa;
    color: #bbb;
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
  .upload-reasult {
    margin-top: 10px;
    // 文件列表
    .process-list {
      width: 100%;
      .process-item {
        // padding: 0 24px 24px;
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
        > div {
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
        background-color: #fff1f1;
        .icon {
          color: #ce4343;
          i {
            color: #ce4343;
          }
        }
      }
      // 成功
      .info-top.success {
        border: 1px solid #239b3a;
        background-color: #f1fdf3;
        .icon {
          color: #249b3a;
          i {
            color: #249b3a;
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
          > div {
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
  }
}
</style>
