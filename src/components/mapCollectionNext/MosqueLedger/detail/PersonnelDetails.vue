<!--
 * @Author: your name
 * @Date: 2019-11-21 11:57:00
 * @LastEditTime: 2019-12-18 09:42:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\components\caseInfo\addCaseInfo.vue
 -->
<template>
  <div class="info-box">
    <div class="left-anchor">
      <Anchor show-ink container=".right-form">
        <AnchorLink href="#basicInfo" title="人员基本信息" />
        <AnchorLink href="#committeeInfo" title="清真寺任职信息" />
      </Anchor>
    </div>
    <div class="right-form">
      <div class="infoItem" id="basicInfo">
        <div class="form-header">
          <div class="title">
            人员基本信息
            <span class="notice-info">
              （
              <span class="red">*</span>为必填项）
            </span>
          </div>
        </div>
        <div class="form-content">
          <basicInfoForm ref="basicInfoForm" :data="formData"></basicInfoForm>
        </div>
      </div>
      <div class="infoItem" id="committeeInfo">
        <div class="form-header">
          <div class="title">
            清真寺任职信息
            <span class="notice-info">
              （
              <span class="red">*</span>为必填项）
            </span>
          </div>
        </div>
        <div class="form-content">
          <mosqueInfoForm ref="mosqueInfoForm" :data="formData"></mosqueInfoForm>
        </div>
      </div>
    </div>
    <div class="footer-action">
      <Button @click="handleClose">关闭</Button>
    </div>
  </div>
</template>

<script>
import basicInfoForm from "./basicInfoForm";
import mosqueInfoForm from "./mosqueInfoForm";
import * as apis from "@/api/collection/index.js";
export default {
  data() {
    return {
      formData: {}
    };
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      apis.partyInfoView(id).then(res => {
        if (res.code == 200) {
          this.formData = res.data;
        }
      });
    }
  },
  components: {
    basicInfoForm,
    mosqueInfoForm
  },
  methods: {
    handleClose() {
      window.close();
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
  display: flex;
  .left-anchor {
    padding: 20px;
    padding-right: 0;
    // background-color: #ccc;
    /deep/.ivu-anchor-ink-ball {
      border-radius: 0;
      height: 16px;
      width: 2px;
      border: none;
      background-color: #2d8cf0;
    }
    /deep/.ivu-anchor-link {
      font-size: 14px;
    }
  }
  .right-form {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 56px;
    .infoItem {
      width: 100%;
      background-color: #fff;
      border: 1px solid #e0e3e6;
      margin-bottom: 20px;
      .form-header {
        height: 56px;
        padding: 0 22px;
        line-height: 56px;
        position: relative;
        border-bottom: 1px solid rgba(224, 227, 230, 1);
        .title {
          font-size: 16px;
          font-weight: bold;
          .notice-info {
            color: #101010;
            font-size: 14px;
            font-weight: normal;
          }
          .red {
            color: red;
          }
        }
        .btn-box {
          position: absolute;
          right: 22px;
          top: -2px;
          i {
            font-size: 13px;
            color: #0668c8;
          }
          i.hidden {
            color: #ccc;
          }
          .save {
            margin-right: 5px;
            i {
              color: #fff;
              font-size: 12px;
            }
          }
        }
      }
      .form-content {
        padding: 20px;
        .caseBtns {
          text-align: right;
        }
      }
    }
  }
  .footer-action {
    height: 56px;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #e0e3e6;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 99;
    button {
      margin-right: 15px;
    }
  }
}
</style>
