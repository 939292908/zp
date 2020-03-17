<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 10:35:16
 * @LastEditTime: 2019-09-02 11:23:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 上传和模板下载-->
  <div>
    <!-- 第 1 步 -->
    <div class="step step-one">
      <!-- 标题 -->
      <div class="title">
        <div class="step-title" v-if="step">{{step}}</div>
        <div class="map">
          <div class="map-type">{{uploadTitle}}</div>
          <a v-if="downloadUrl && excelStatus!=1" :href="downloadUrl" target="_Blank">
            <Button size="small">采集模板下载<i class="iconfont icon-xiazai"></i></Button>
          </a>
        </div>
      </div>
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
            <div v-if="!uploadIsOk" class="icon-add">
              <!-- 失败 -->
              <div class="info-box" v-if="!uploadIsOk && isExcel">
                <div class="info-top error">
                  <div class="map-name">{{fileName}}</div>
                  <div class="map-size">{{resFileSize}}</div>
                  <div class="time">{{uploadTime}}</div>
                  <div class="icon">上传失败<i class="iconfont icon-guanbi2fill"></i></div>
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
                <!-- 需补充信息的人员名单 -->
                <div class="people-list-title" v-if="errorPeopleList">需要补充人员名单：</div>
                <ul class="people-list">
                  <li v-for="(item, index) in errorPeopleList" :key="index">
                    <div class="name">{{index+1}}、{{item.NAME}}</div>
                    <div class="idCard">{{item.IDNUMBER}}</div>
                  </li>
                </ul>
              </div>
              <!-- 提示 -->
              <i v-if="!isExcel" class="iconfont icon-shangchuanbiaodan"></i>
              <p>将Excel文件拖拽至此区域或</p>
              <p>单击本区域打开本地文件</p>
            </div>
          </label>
          <!-- 成功列表 -->
          <div class="process-list" v-if="uploadIsOk">
            <div class="process-item" :key="index" v-for="(file,index) in fileList">
              <!-- 成功item -->
              <div class="info-box">
                <div class="info-top success">
                  <div class="map-name" :title="fileName">{{fileName}}</div>
                  <div class="map-size">{{resFileSize}}</div>
                  <div class="time">{{uploadTime}}</div>
                  <div class="icon">上传成功<i class="iconfont icon-shangchuanchenggong"></i></div>
                </div>
                <!-- 消息列表 -->
                <ul class="msg-list">
                  <!-- 1 -->
                  <li v-if="totalPeople > 0">
                    共检索出
                    <strong style="color: #0668C8">{{totalPeople}}</strong>
                    个人员，其中
                    <strong style="color: #0668C8">{{successPeople}}</strong>
                    人在系统人员信息台账中已建立信息，剩余
                    <strong style="color: #0668C8">{{errorPeople}}</strong>
                    人需补充信息。
                  </li>
                  <!-- 2 -->
                  <li v-if="mapType=='T000'">
                    增加了
                    <strong style="color: #0668C8">{{uploadPeople}}</strong>
                    个人员信息，已经成功同步到系统人员信息台账。
                  </li>
                </ul>
                <!-- 需补充信息的人员名单 -->
                <div class="people-list-title" v-if="errorPeopleList.length>0">需要补充人员名单：</div>
                <ul class="people-list">
                  <li v-for="(item, index) in errorPeopleList" :key="index">
                    <div class="name">{{index+1}}、{{item.NAME}}</div>
                    <div class="idCard">{{item.IDNUMBER}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
    value: {
      type: Boolean,
      default: false
    },
    // 上传接口
    uploadExcelFn: {
      type: Function,
    },
    // 成功回调
    success: {
      type: Function,
    },
    // 获取是否Excel采集
    setIsExcel: {
      type: Function,
    },
    // 上传的图谱类型
    mapType: {
      type: String,
      default: "T002"
    },
    // 第几步
    step: {
      type: String,
      default: ""
    },
    // 图谱类型title
    uploadTitle: {
      type: String,
      default: ""
    },
    // input id
    id: {
      type: String,
      default: "file"
    },
    // 下载模板url地址
    downloadUrl: {
      type: String,
      default: ""
    },
    // excel采集第一步获取的collectId （第二步上传使用）
    collectId: {
      type: String,
      default: ""
    },
    // 第二步上传成功人数 (取第一步失败人数)
    uploadPeople: {
      type: Number,
      default: 0
    },
    // 图谱excel采集状态，"1" excel采集了图谱，未采集人
    excelStatus: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      isExcel: false, // 是否Excel采集 （跳转第3步，判断下一步使用的接口）
      uploadIsOk: false, // 上传是否ok
      fileSize: "", // 文件大小
      resFileSize: "", // 从后端获取的文件大小
      fileName: "", // 文件名称
      uploadTime: "", // 上传时间
      totalPeople: 0, // 总人数
      successPeople: 0, // 成功人数
      errorPeople: 0, // 失败人数
      errorPeopleList: [], // 失败人员列表
      dragOver: false,
      errorContent: [],
      paste: false, //是否支持粘贴上传文件
      fileList: []
    };
  },
  computed: {
  },
  created() {
    // 如果是excel模式采集的图谱，在未采集人情况下，再次点击编辑直接获取图谱信息
    if ( this.excelStatus == 1 ) {
      this.upload();
    }
  },
  methods: {
    // 上传文件接口
    post(file, callback) {
      if ( this.excelStatus == 1 ) {
        let collectId = this.$route.query.collectId;
        let mapType = this.$route.query.mapType;
        apis.GET_EXCEL_MAP_STATE_BY_ID_AND_MYP_TYPE({collectId, mapType})
        .then(res => {
          callback(res);
        })
        .catch(res => {
          callback(res);
        });
      } else {
      let formData = new FormData();
      formData.append("file", file);
      // 父级传过来的 上传接口
      this.uploadExcelFn(this.mapType, formData, this.collectId)
        .then(res => {
          callback(res);
        })
        .catch(res => {
          callback(res);
        });
      }
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
      // this.fileName = file.name.substr(0,file.name.lastIndexOf("."));
      // 2.本地校验
      let fileName = file.name;
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
      // excel采集再编辑进来 不校验
      if (me.excelStatus != 1) {
        // 上传文件之前，验证文件类型和大小是否正确
        if (!me.beforeUpload(file)) {
          me.errorContent.forEach(item => me.$Message.warning(item.errorMsg));
          return;
        };
      }
      me.$emit('setLoading',true);
      me.fileList = [file];
      // 验证通过,调用上传文件接口
      me.post(me.fileList[0], res => {
        me.$emit('setLoading',false);
        me.isExcel = true; // Excel采集模式
        me.setIsExcel && me.setIsExcel(me.isExcel); // 状态传递给父级
        me.uploadTime = me.$moment().format('YYYY-MM-DD HH:mm:ss'); // 成功时间
        if (res.code == 200) {
          // 成功
          if (res.data.verifyPassed || me.excelStatus == 1) {
            me.uploadIsOk = true; // 成功标记
            // 编辑进来，不需要提示
            me.excelStatus != 1 && me.$Message.success("上传成功");
            let isPass = res.data.idNumberList.length == 0; //如果没有失败人员，（那么第二步直接算成功，放开下一步按钮）
            me.success(res, isPass); // 成功回调 传值给父级
            me.totalPeople = res.data.onlineMapInfo ? res.data.onlineMapInfo.peopleCount : 0; // 总人数
            me.errorPeople = res.data.idNumberList.length; // 失败人数
            me.successPeople = me.totalPeople - me.errorPeople; // 成功人数
            me.errorPeopleList = res.data.idNumberList; // 失败人员列表
            me.errorContent = [];
            me.fileName = res.data.onlineMapInfo.fileName; // 文件名
            me.resFileSize = res.data.onlineMapInfo.fileSize; // 文件大小
            me.uploadTime = res.data.onlineMapInfo.uploadTime; // 上传时间
            // 失败
          } else {
            var result = res.data.errorItemList;
            me.errorContent = result;
            me.errorPeopleList = res.data.idNumberList; // 失败人员列表
            console.log(res,me.errorPeopleList);
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
.step {
  margin-right: 14px;
  padding-bottom: 20px;
  .title {
    .step-title {
      color: #0668C8;
      font-size: 14px;
      font-weight: 700;
    }
    .map {
      overflow: hidden;
      height: 38px;
      .map-type {
        float: left;
        color: #666;
        font-size: 14px;
        line-height: 38px;
      }
      .ivu-btn {
        float: right;
        i {
          color: #0668C8;
          font-size: 16px;
          margin-left: 6px;
        }
      }
    }
  }
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
}
</style>
