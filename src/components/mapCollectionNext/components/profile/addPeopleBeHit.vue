<template>
  <Modal v-model="showModal" fullscreen :closable="false" footer-hide>
    <div class="left-anchor">
      <div class="tabs">
        <div
          class="tab-nav"
          :class="{current:tabIndex==index}"
          v-for="(item,index) in tabNavs"
          :key="index"
          @click="hanldTab('#info'+index,index)"
        >{{item.text}}</div>
      </div>
    </div>
    <div class="right-form" id="right-form">
      <baseInfo
        ref="right-form"
        id="info0"
        :idNumber="idNumber"
        :isAdd="isAdd"
        :villageName="villageName"
        @select-change="getId"
      ></baseInfo>
      <baseInfoBeHit
        ref="baseBeHit"
        v-show="showBeHit"
        id="info1"
        :idNumber="idNumber"
        :isAdd="isAdd"
      ></baseInfoBeHit>
    </div>
    <div class="footer-action">
      <Button type="primary" v-if="isStepOne" @click.native="nextStep()">下一步</Button>
      <Button type="primary" v-if="isStepOne" @click.native="handleModalClose()">关闭</Button>
      <Button type="primary" v-if="!isStepOne" @click.native="saveAndClose()">保存并关闭</Button>
      <Button type="primary" v-if="!isAdd" @click.native="deleteBeHitPerson()">删除人员</Button>
      <Button type="primary" v-if="!isStepOne" @click.native="handleModalClose()">取消</Button>
      <!-- <Button type="primary" v-if="!isAdd" @click.native="deleteBeHitPerson">删除人员</Button>
      <Button type="primary" @click.native="handleModalClose">关闭</Button>-->
    </div>
  </Modal>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import baseInfo from "./addPeopleBaseInfo";
import baseInfoBeHit from "./beHitInfo";
import * as apis from "@/api/collection/index.js";
export default {
  props: {
    idNumber: {
      type: String,
      default: ""
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    villageName: {
      type: String,
      default: ""
    }
  },
  watch: {
    idNumber: {
      handler(val) {},
      immediate: true
    },
    isAdd: {
      handler(val) {
        if (val) {
          this.showBeHit = !val;
        }
        this.isStepOne = val;
      },
      immediate: true
    },
    villageName: {
      handler(val) {},
      immediate: true
    }
  },
  components: {
    baseInfo,
    baseInfoBeHit
  },
  data() {
    //这里存放数据
    return {
      isStepOne: true,
      longitude: "0",
      latitude: "0",
      showModal: false,
      showBeHit: false, //隐藏被打击信息
      shownextStep: true, //隐藏被打击信息
      tabIndex: 0,
      tabNavs: [
        {
          text: "人员基础信息"
        },
        {
          text: "被打击信息"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  //方法集合
  methods: {
    // 保存基本信息以及被打击信息
    saveAndClose() {
      const that = this;
      var baseInfo = that.$refs["right-form"].fillFormValue();
      var baseHit = that.$refs["baseBeHit"].fillFormValue();
      that.$refs["baseBeHit"].$refs["beHitInfoForm"].validate(valid => {
        if (valid) {
          var params = {};
          params.longitude = that.longitude;
          params.latitude = that.latitude;
          Object.assign(params, baseHit, baseInfo);
          apis.savaPersonnelBeHitInfo(params).then(res => {
            if (res.code == 200) {
              // console.log(res);
              that.$Message.success("保存成功");
              that.closeModal();
            } else {
              that.$Message.error(res.msg);
            }
          });
        } else {
          that.$Message.error("必填项缺失");
        }
      });
    },
    // 下一步不保存
    nextStep() {
      const that = this;
      that.$refs["right-form"].nextStep();
    },
    // 删除被打击人员信息
    deleteBeHitPerson() {
      const that = this;
      console.log(that.$parent.markerObjDetail.personInfo.idNumber);
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要删除该人员吗?",
        onOk: () => {
          let idNumber = that.$parent.markerObjDetail.personInfo.idNumber;
          let collectId = {
            collectId: that.$route.query.collectId
          };
          apis.deletePersonnelInfo(idNumber, collectId).then(res => {
            if (res.code == 200) {
              that.showModal = false;
              that.$Message.success("删除成功");
              that.$refs["right-form"].handleReset();
              if (that.$refs["baseBeHit"]) {
                that.$refs["baseBeHit"].handleReset();
              }
            } else {
              that.showModal = false;
              that.$Message.error("删除失败");
            }
            that.$parent.initLoad(2);
          });
        }
      });
    },
    // 获取基础信息中的IDNumber
    getId(v) {
      this.$refs["baseBeHit"].caseInfo(v);
    },
    // 取消并关闭
    handleModalClose() {
      if (
        !this.$refs["right-form"].isPersonInfoEdit ||
        !this.$refs["baseBeHit"].isBeHitInfoEdit ||
        !this.$refs["baseBeHit"].beHitInfoComplete
      ) {
        this.$refs["baseBeHit"].isBeHitInfoEdit = false;
        if (this.$refs["right-form"].form.idNumber != "") {
          this.$Modal.confirm({
            title: "温馨提示",
            content: "内容未保存，确定离开该页面？",
            onOk: () => {
              this.$refs["right-form"].handleReset();
              if (this.$refs["baseBeHit"]) {
                this.$refs["baseBeHit"].handleReset();
              }
              // this.judge();
              this.showModal = false;
              this.$parent.initLoad(2);
            },
            onCancel: () => {}
          });
        } else {
          this.closeModal();
        }
      } else {
        this.closeModal();
      }
    },
    // 关闭页面
    closeModal() {
      // this.$refs.modal.scrollTop = 0;
      this.showModal = false;
      // this.judge();
      this.$refs["right-form"].handleReset();
      this.$refs["baseBeHit"].handleReset();
      this.$parent.initLoad(2);
    },
    judge() {
      if (this.isAdd) {
        this.$refs["right-form"].isPersonInfoEdit = false;
      } else {
        this.$refs["right-form"].isPersonInfoEdit = true;
      }
    },
    hanldTab(selector, index) {
      this.tabIndex = index;
      var anchor = document.querySelector(selector);
      document.querySelector("#right-form").scrollTop = anchor.offsetTop - 17;
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
/deep/ .ivu-modal-content {
  .ivu-modal-body {
    .left-anchor {
      width: 126px;
      height: 100%;
      float: left;
      .tabs {
        .tab-nav.current {
          color: #2d8cf0;
          border-left: 2px solid #2d8cf0;
          padding-left: 14px;
        }
        .tab-nav {
          cursor: pointer;
          border-left: 1px solid #ccc;
          padding: 0px 15px;
          margin-bottom: 5px;
        }
      }
    }
    .right-form {
      height: 100%;
      overflow-y: auto;
      color: #333333;
      overflow-x: hidden;
    }
    /deep/.ivu-input[disabled],
    fieldset[disabled] .ivu-input,
    /deep/.ivu-select-disabled .ivu-select-selection,
    /deep/.ivu-select-input[disabled] {
      color: #666;
    }
    /deep/.ivu-select-input[disabled][placeholder^="è¯·é€‰æ‹©"] {
      -webkit-text-fill-color: #ccc;
    }
    /deep/.ivu-select-input[disabled] {
      -webkit-text-fill-color: #666;
    }
    .footer-action {
      position: absolute;
      width: calc(100% + 20px);
      bottom: 0;
      left: -20px;
      border-top: 1px solid #e8eaec;
      padding: 12px 18px;
      text-align: right;
      background-color: #fff;
      button {
        background-color: #2db7f5;
        border-color: #2db7f5;
      }
    }
  }
}

/deep/.ivu-modal-content {
  .ivu-modal-header {
    display: none;
  }
  .ivu-modal-body {
    background-color: #f7f7f7;
    padding: 20px 20px 58px 20px;
  }
}
/deep/.ivu-anchor-ink-ball {
  border-radius: 0;
  height: 16px;
  width: 2px;
  border: none;
  background-color: #2d8cf0;
  transform: translate(-50%, -2px);
}
/deep/.ivu-anchor-link {
  font-size: 14px;
}

/deep/.ivu-input[disabled],
fieldset[disabled] .ivu-input,
/deep/.ivu-select-disabled .ivu-select-selection,
/deep/.ivu-select-input[disabled] {
  color: #666;
}
/deep/.ivu-select-input[disabled][placeholder^="请选择"] {
  -webkit-text-fill-color: #ccc;
}
/deep/.ivu-select-input[disabled] {
  -webkit-text-fill-color: #666;
}
</style>