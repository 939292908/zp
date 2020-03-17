<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:05
 * @LastEditTime: 2019-08-07 09:22:05
 * @LastEditors: your name
 -->
<template>
  <!-- 上传图片 -->
  <Modal
    :value="modal"
    :width="597"
    :z-index="10000"
    :mask-closable="false"
    title="上传照片"
    class="upload-image-dialog"
    @on-cancel="cancel"
  >
    <div class="upload-image-body">
      <Row>
        <Col span="8">
          <label for="file" class="upload-image-box">
            <span v-if="!fileInfo.path" class="icon-add">
              <i class="iconfont icon-jiahao1"></i>
            </span>
            <img v-if="fileInfo.path" :src="fileInfo.base64" alt />
            <input
              id="file"
              type="file"
              class="upload-image-file"
              name="file"
              @change="uploadFile($event)"
            />
          </label>
        </Col>
        <Col span="16">
          <label v-if="error" class="upload-image-info">
            <Icon type="md-alert" />
            {{error}}
          </label>
        </Col>
      </Row>
      <div class="upload-image-desc">仅支持jpg / png 图片文件,且文件小于5MB</div>
    </div>
    <div slot="footer">
      <i-button type="text" @click="cancel">取消</i-button>
      <i-button type="text" :loading="loading" :disabled="loading" @click="ok">确定</i-button>
    </div>
  </Modal>
</template>
<script>
import { postFile } from "../../tools/request";
export default {
  name: "UploadImage",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    idNumber: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      modal: false,
      fileInfo: {
        path: false
      },
      error: "",
      path: this.$config.collectPath
    };
  },
  methods: {
    cancel() {
      this.modal = false;
      this.$emit("input", this.modal);
    },
    ok() {
      this.loading = true;
      if (!this.fileInfo.file) {
        this.$Message.info("请选择图片");
        this.loading = false;
        return;
      }
      let formData = new FormData();
      formData.append("file", this.fileInfo.file);
      let params = {
        fileSuffix: this.fileInfo.fileSuffix
      };
      postFile(
        this.path + `/v1/maps/persons/photos/${this.idNumber}`,
        params,
        formData
      )
        .then(res => {
          this.loading = false;
          if (res.code == 200) {
            this.fileInfo.fileName = res.data.fileName;
            this.$Message.success("上传成功");
            this.modal = false;
            this.$emit("input", this.modal);
            this.$emit("upload-callback", this.fileInfo);
          } else {
            this.error = res.msg;
          }
        })
        .catch(res => {
          this.error = "上传失败";
          this.loading = false;
        });
    },
    // 上传文件
    uploadFile(event) {
      let file = event.target.files[0];
      if (!file) {
        return;
      }
      let fileName = file.name;
      let fileType = fileName.substr(fileName.lastIndexOf("."));
      if (!(fileType == ".jpg" || fileType == ".png" || fileType == ".jpeg")) {
        this.clearInputFile(event.target);
        this.error = "仅支持jpg / png 图片文件";
        return;
      }
      let fileSize = file.size;
      if (fileSize > 5 * 1024 * 1024) {
        this.clearInputFile(event.target);
        this.error = "图片文件的大小最大不能超过5MB";
        return;
      }
      this.error = "";
      this.fileInfo.file = file;
      this.fileInfo.fileSuffix = fileType;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let me = this;
      reader.onloadend = e => {
        me.fileInfo.path = true;
        me.fileInfo.base64 = reader.result;
      };
    },
    clearInputFile(f) {
      try {
        f.value = "";
        if (f.value) {
          f.type = "text";
          f.type = "file";
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.modal = val;
        if (val) {
          this.fileInfo = {
            path: false
          };
          this.error = "";
          this.loading = false;
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@imageUrl: "../../../";
/deep/ .ivu-modal {
  .ivu-modal-header {
    border-bottom: 1px solid transparent;
    .ivu-modal-header p,
    .ivu-modal-header-inner {
      color: #bce2ff;
      font-size: 16px;
    }
  }
  .ivu-modal-content {
    background: url("@{imageUrl}static/images/feedback-bg.png") 0 0 no-repeat;
    height: 259px;
    box-shadow: none;
    transform: scale(0.9, 0.9);
    font-size: 14px;
  }
  .ivu-modal-close .ivu-icon-ios-close {
    color: #ffffff;
  }
  .ivu-modal-footer {
    border-top: 1px solid transparent;
    padding: 12px 18px 12px 18px;
    text-align: right;
    position: absolute;
    width: 100%;
    bottom: 8px;
    button {
      background: url("@{imageUrl}static/images/btn-entity.png") 0 0 no-repeat;
      width: 93px;
      color: #bce2ff;
      font-size: 14px;
    }
  }
  .upload-image-body {
    color: #bce2ff;
  }
  .upload-image-box {
    width: 103px;
    height: 103px;
    border: 1px dashed #194d7e;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: #7e9fd1;
    box-shadow: 0 0 2px #7e9fd1;
    .icon-add {
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
}
</style>


