<!--
 * @Author: your name
 * @Date: 2019-11-21 11:57:00
 * @LastEditTime : 2019-12-26 14:21:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\components\caseInfo\addCaseInfo.vue
 -->
<template>
  <div class="info-box">
    <div class="left-anchor">
      <Anchor show-ink container=".right-form">
        <AnchorLink href="#caseInfo" title="案件线索信息" />
        <AnchorLink href="#casePersonInfo" title="涉案(线)人员" />
      </Anchor>
    </div>
    <div class="right-form">
      <div class="infoItem" id="caseInfo">
        <div class="form-header">
          <div class="title">
            案件线索信息
            <span class="notice-info">
              （
              <span class="red">*</span>为必填项）
            </span>
          </div>
          <div class="btn-box" v-if="canEdit">
            <Button
              size="small"
              @click="(isCaseEdit=false)"
              v-show="isCaseEdit"
              :disabled="isDisAbled"
            >
              编辑
              <i class="iconfont icon-bianji"></i>
            </Button>
            <Button
              class="save"
              size="small"
              type="primary"
              v-show="!isCaseEdit"
              @click="handleSave"
            >
              保存
              <i class="iconfont icon-baocun"></i>
            </Button>
            <Button size="small" @click="handleCanclEdit" v-show="!isCaseEdit">取消编辑</Button>
          </div>
        </div>
        <div class="form-content">
          <CaseInfoForm :isCaseEdit="isCaseEdit" ref="caseInfoForm"></CaseInfoForm>
          <div class="caseBtns">
            <Button type="primary" @click="saveCase" v-if="!canEdit">保存并下一步</Button>
          </div>
        </div>
      </div>
      <div class="infoItem" id="casePersonInfo" v-if="canEdit">
        <div class="form-header">
          <div class="title">涉案（线）人员信息</div>
          <div class="btn-box">
            <Button size="small" :disabled="isDisAbled" @click="handleAddPerson">
              添加新人员
              <i class="iconfont icon-jiahao"></i>
            </Button>
          </div>
        </div>
        <div class="form-content">
          <casePersonInfo ref="casePersonInfo"></casePersonInfo>
        </div>
      </div>
    </div>
    <div class="footer-action">
      <Button
        type="primary"
        v-if="canEdit && hasFunAuth(constantFunMap.FUN_BasicApps_CaseManager_View_Submit_ID) && showSubmitBtn"
        @click="handleSubmit"
      >提交</Button>
      <!-- 未提交删除案件 -->
      <Button
        type="error"
        v-if="canEdit && hasFunAuth(constantFunMap.FUN_BasicApps_CaseManager_Uncommitted_Delect_ID) && query.state==0"
        @click="handleDelect"
      >删除案件线索</Button>
      <!-- 已归档删除案件 -->
      <Button
        type="error"
        v-if="canEdit && hasFunAuth(constantFunMap.FUN_BasicApps_CaseManager_Archived_Delect_ID) && showDelBtn"
        @click="handleDelect"
      >删除案件线索</Button>
      <Button @click="handleClose">关闭</Button>
    </div>
  </div>
</template>

<script>
import CaseInfoForm from "./caseInfoForm";
import casePersonInfo from "./casePersonInfo";
import * as apis from "@/api/collection/index.js";
export default {
  data() {
    return {
      canEdit: false,
      isDisAbled: false,
      isCaseEdit: true,
      caseId: this.$route.query.caseId,
      state: this.$route.query.state,
      query: this.$route.query
    };
  },
  components: {
    CaseInfoForm,
    casePersonInfo
  },
  computed: {
    showSubmitBtn() {
      if (this.query.state == 1) {
        return false;
      } else {
        return true;
      }
    },
    showDelBtn() {
      if (this.query.state == 1 && this.query.status == 2) {
        return false;
      } else if (this.query.state == 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // 取消案件编辑
    handleCanclEdit() {
      this.$refs.caseInfoForm.resetForm();
      this.isCaseEdit = true;
    },
    saveCase() {
      let me = this;
      this.$refs.caseInfoForm
        .handleSubmit()
        .then(res => {
          this.caseId = res.data.id;
          me.canEdit = true;
          me.$Message.success("保存成功");
        })
        .catch(error => {
          let errorMsg =
            error != false ? error.msg || "保存失败" : "请完善表单信息";
          if (errorMsg != null || errorMsg != undefined)
            me.$Message.error(errorMsg);
        });
    },
    handleSave() {
      let me = this;
      this.$refs.caseInfoForm
        .handleSubmit()
        .then(res => {
          this.caseId = res.data.id;
          this.isCaseEdit = true;
          me.$Message.success("保存成功");
        })
        .catch(error => {
          let errorMsg =
            error != false ? error.msg || "保存失败" : "请完善表单信息";
          if (errorMsg != null || errorMsg != undefined)
            me.$Message.error(errorMsg);
        });
    },
    //添加案件线索人员
    handleAddPerson() {
      this.$refs.casePersonInfo.addBtnClick(this.caseId);
    },
    handleClose() {
      if (window.opener.document.getElementById("tpList")) {
        window.opener.document.getElementById("tpList").click();
      }
      window.close();
    },
    handleSubmit() {
      let caseId = this.caseId;
      let me = this;
      if (caseId) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "您确定要提交该案件线索吗？",
          onOk: () => {
            apis.POST_ARICHIVED_CASE_INFO([caseId]).then(res => {
              if (res.code === 200) {
                this.$Message.success("提交成功！");
                window.parent.opener.location.reload();
                setTimeout(() => {
                  window.close();
                }, 500);
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {
            this.$Message.error("取消提交！");
          }
        });
      }
    },
    handleDelect() {
      let caseId = this.caseId;
      if (caseId) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "您确定要删除该案件线索吗？",
          onOk: () => {
            apis.Delete_CASE_INFO([caseId]).then(res => {
              debugger;
              if (res.code === 200) {
                this.$Message.success("删除成功！");
                window.parent.opener.location.reload();
                setTimeout(() => {
                  window.close();
                }, 500);
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {
            this.$Message.error("取消删除！");
          }
        });
      }
    }
  },
  watch: {
    "$route.query.status": {
      handler(val) {
        if (val) {
          if (val == 0) {
            this.canEdit = false;
          }
          if (val == 1) {
            this.canEdit = true;
          }
          if (val == 2) {
            this.canEdit = true;
            this.isDisAbled = true;
          }
        }
      },
      immediate: true
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
        max-height: 562px;
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
