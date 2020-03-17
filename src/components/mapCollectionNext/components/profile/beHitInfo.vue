<template>
  <div id="personInfo" class="infoBox">
    <div class="form-header">
      <div class="title">
        被打击信息
        <span class="notice-info">
          (
          <span class="red">*</span>为必填项）
        </span>
      </div>
      <!-- <div class="btn-box">
        <Button size="small" @click="editBeHit" v-if="isBeHitInfoEdit">
          编辑
          <i class="iconfont icon-bianji"></i>
        </Button>
        <Button
          class="save"
          size="small"
          type="primary"
          v-if="!isBeHitInfoEdit"
          @click="savePersonInfo"
        >
          保存
          <i class="iconfont icon-baocun"></i>
        </Button>
        <Button size="small" @click="cancelPersonInfoEdit" v-if="!isBeHitInfoEdit">取消编辑</Button>
      </div>-->
    </div>
    <div class="modal-content" ref="modal">
      <Form
        class="form-panel"
        ref="beHitInfoForm"
        :model="form"
        :rules="personInfoRule"
        :label-width="100"
      >
        <div class="panel-form">
          <div class="panel-title">被打击处理情况</div>
          <FormItem label="案件编号" prop="caseCode">
            <i-input v-model="form.caseCode" :disabled="isBeHitInfoEdit"></i-input>
          </FormItem>
          <FormItem label="案发时间" prop="incidentTime">
            <DatePicker
              v-model="form.incidentTime"
              type="month"
              placeholder="选择案发时间"
              @on-change="onStartTimeChange"
              :options="startTimeOption"
              :disabled="isBeHitInfoEdit"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
          <FormItem label="处理时间" prop="processTime">
            <DatePicker
              v-model="form.processTime"
              type="month"
              placeholder="选择处理时间"
              @on-change="onEndTimeChange"
              :options="endTimeOption"
              :disabled="isBeHitInfoEdit"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
          <FormItem label="案件名称" prop="caseName">
            <i-input v-model="form.caseName" :disabled="isBeHitInfoEdit"></i-input>
          </FormItem>
          <FormItem label="处理结果" prop="processResultValue">
            <Select v-model="form.processResultValue" :disabled="isBeHitInfoEdit">
              <Option
                v-for="(item,index) in optionList.processResultList"
                :value="item.value"
                :key="index"
              >{{ item.displayName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="涉案人员身份" prop="personIdentityValue">
            <Select v-model="form.personIdentityValue" :disabled="isBeHitInfoEdit">
              <Option
                v-for="(item,index) in optionList.identityOfCaseList"
                :value="item.value"
                :key="index"
              >{{ item.displayName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="案件类型" prop="caseTypeValue">
            <Select v-model="form.caseTypeValue" :disabled="isBeHitInfoEdit">
              <Option
                v-for="(item,index) in optionList.caseTypeList"
                :value="item.value"
                :key="index"
              >{{ item.displayName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="案情" prop="caseCondition">
            <i-input
              v-model="form.caseCondition"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              :disabled="isBeHitInfoEdit"
            ></i-input>
          </FormItem>
        </div>
        <div class="panel-form"></div>
        <!-- <div class="btn">
          <Button type="primary" v-if="!isBeHitInfoEdit" @click="savePersonInfo">保存</Button>
          <Button type="primary" @click="editBeHit" v-if="isBeHitInfoEdit">编辑</Button>
        </div>-->
      </Form>
    </div>
    <!-- <div class="form-footer">
        <div class="btn-box">
          <Button type="primary" @click.native="handlePersonInfoSave" :disabled="isExist">保存</Button>
          <Button @click.native="closeModal">关闭</Button>
        </div>
    </div>-->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as comApis from "@/api/common.js";
import { OPTIONS_LIST } from "@/api/config.js";
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
    }
  },
  watch: {
    idNumber: {
      handler(val) {
        this.caseInfo(val);
      },
      immediate: true
    },
    isAdd: {
      handler(val) {
        // this.isBeHitInfoEdit = !val;
      },
      immediate: true
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      beginForm: {}, //还原最先的人员信息 取消编辑按钮
      isBeHitInfoEdit: false, //是否可编辑
      imgSrc: "", //人员头像
      form: {
        caseCode: "", //案件编号
        caseName: "", //案件名称
        incidentTime: "", //案发时间
        processTime: "", //处理时间
        processResult: "", //处理结果
        processResultValue: "", //处理结果
        personIdentity: "", //涉案人员身份
        personIdentityValue: "", //涉案人员身份
        caseType: "", //案件类型
        caseTypeValue: "", //案件类型
        caseCondition: "" //案情
      },
      optionList: {
        processResultList: [], //处理结果
        identityOfCaseList: [], //成员身份
        caseTypeList: [] //案件类型
      },
      personInfoRule: {
        caseCode: {
          required: true,
          message: "案件编号不能为空",
          trigger: "blur"
        },
        incidentTime: {
          required: true,
          type: "date",
          message: "案发时间不能为空",
          trigger: "change"
        },
        processTime: {
          required: true,
          type: "date",
          message: "处理时间不能为空",
          trigger: "change"
        },
        caseName: {
          required: true,
          message: "案件名称不能为空",
          trigger: "blur"
        },
        caseCondition: {
          required: true,
          message: "案件详情不能为空",
          trigger: "blur"
        },
        processResultValue: {
          required: true,
          message: "处理结果不能为空",
          trigger: "change"
        },
        personIdentityValue: {
          required: true,
          message: "涉案人员身份不能为空",
          trigger: "change"
        },
        caseTypeValue: {
          required: true,
          message: "案件类型不能为空",
          trigger: "change"
        }
      },
      changeOnSelect: false, //人员状态
      isPersonInfoSave: false,
      isExist: false,
      startTimeOption: {},
      endTimeOption: {},
      beHitInfoComplete: false //被打击信息是否完整
    };
  },
  mounted() {
    this.init();
    this.onStartTimeChange("");
    this.onEndTimeChange("");
    // this.bindPersonFormValue(this.behitInfo);
  },
  //方法集合
  methods: {
    /* editBeHit() {
      if (this.$parent.$parent.$refs["right-form"].isPersonInfoEdit) {
        this.isBeHitInfoEdit = false;
      } else {
        this.$Message.error("人员基础信息未保存！");
      }
    }, */
    // 起始时间变化
    onStartTimeChange(religionStartTime, type) {
      this.endTimeOption = {
        disabledDate(religionEndTime) {
          return (
            religionEndTime < new Date(religionStartTime) - 8.64e7 ||
            religionEndTime > Date.now()
          );
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(religionEndTime, type) {
      this.startTimeOption = {
        disabledDate(religionStartTime) {
          return (
            religionStartTime > new Date(religionEndTime) ||
            religionStartTime > Date.now()
          );
        }
      };
    },
    // 保存被打击信息
    savePersonInfo() {
      const that = this;
      /* let form = that.fillFormValue();
      console.log();
      form.latitude = this.$parent.$parent.latitude;
      form.longitude = this.$parent.$parent.longitude;
      form.idNumber = this.$parent.$parent.$refs["right-form"].form.idNumber;
      form.collectId = that.$route.query.collectId; */
      this.form.incidentTime = this.form.incidentTime
        ? this.$moment(this.form.incidentTime)._d
        : "";
      this.form.processTime = this.form.processTime
        ? this.$moment(this.form.processTime)._d
        : "";
      that.$refs["beHitInfoForm"].validate(valid => {
        let form = that.fillFormValue();
        form.latitude = this.$parent.$parent.latitude;
        form.longitude = this.$parent.$parent.longitude;
        form.idNumber = this.$parent.$parent.$refs["right-form"].form.idNumber;
        form.name = this.$parent.$parent.$refs["right-form"].form.name;
        form.collectId = that.$route.query.collectId;
        if (valid) {
          apis.preservedPersonnelInfoBeHit(form).then(res => {
            if (res.code == 200) {
              // resolve(res);
              that.beginForm = form;
              that.isBeHitInfoEdit = true;
              that.$Message.success("保存成功");
              that.bindPersonFormValue(res.data);
              that.beHitInfoComplete = true;
            } else {
              that.beHitInfoComplete = false;
              that.$Message.error(res.msg);
            }
          });
        } else {
          that.beHitInfoComplete = false;
          that.$Message.error("缺少必填项！");
        }
      });
    },
    // 填充表单的值
    fillFormValue() {
      let form = this.form;
      // 案件结果
      let processResultObj = this.optionList.processResultList.find(
        x => x.value == form.processResultValue
      );
      form.processResult = processResultObj ? processResultObj.displayName : "";
      // 类型
      let caseTypeObj = this.optionList.caseTypeList.find(
        x => x.value == form.caseTypeValue
      );
      form.caseType = caseTypeObj ? caseTypeObj.displayName : "";
      // 成员身份personIdentityValue
      let personIdentityObj = this.optionList.identityOfCaseList.find(
        x => x.value == form.personIdentityValue
      );
      form.personIdentity = personIdentityObj
        ? personIdentityObj.displayName
        : "";
      this.form.incidentTime = this.form.incidentTime
        ? this.$moment(this.form.incidentTime)._d
        : "";
      this.form.processTime = this.form.processTime
        ? this.$moment(this.form.processTime)._d
        : "";
      return form;
    },
    // 记录之前的打击信息并还原
    cancelPersonInfoEdit() {
      this.$refs["beHitInfoForm"].resetFields();
      this.bindPersonFormValue(this.beginForm);
      this.isBeHitInfoEdit = true;
    },
    // 加载optionList字典项
    init() {
      this.getOptionList();
    },
    caseInfo(val) {
      const that = this;
      let collectId = { collectId: that.$route.query.collectId };
      if (!val) return;
      apis.getPersonnelInfo(val, collectId).then(res => {
        that.handleReset();
        if (res.code == 200) {
          console.log(res);
          if (res.data != null) {
            var valueArr = Object.values(res.data);
            var result = valueArr.every(x => {
              return x == null;
            });
            if (result) {
              that.beHitInfoComplete = false;
            } else {
              that.beHitInfoComplete = true;
            }
            // that.beHitInfoComplete = result ? !result : result;
            /* if(result){
              that.beHitInfoComplete = true
              }; */
            that.form = res.data;
            // that.isBeHitInfoEdit = true;
            that.beginForm = res.data;
            that.bindPersonFormValue(res.data);
          } else {
            that.beHitInfoComplete = false;
            return;
          }
        }
      });
    },
    // 重置
    handleReset() {
      this.$refs["beHitInfoForm"].resetFields();
    },
    handleFormValidate() {
      let arr = {};
      Object.keys(arr).forEach(key => {
        this.$refs["personInfoForm"].validateField(key, error => {});
      });
    },
    // 绑定个人信息的值
    bindPersonFormValue(form) {
      let data = JSON.parse(JSON.stringify(this.form));
      /* data.caseCode = form.caseCode; //案件编号
      data.caseCondition = form.caseCondition; //案情
      data.personIdentity = form.personIdentity;
      data.processResult = form.processResult;
      data.caseType = form.caseType;
      data.incidentTime = form.incidentTime; //案发时间
      data.processTime = form.processTime; //处理时间 */
      // 判断一下 //案发时间//处理时间
      this.form = Object.assign(data, form);
      this.form.incidentTime = data.incidentTime
        ? this.$moment(data.incidentTime).format("YYYY-MM")
        : "";
      this.form.processTime = form.processTime
        ? this.$moment(form.processTime).format("YYYY-MM")
        : "";
    },
    // 获取清单
    getOptionList() {
      //处理结果
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_PROCESS_RESULT,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_PROCESS_RESULT
        })
        .then(res => {
          this.optionList.processResultList = res;
        });
      //成员身份
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_RELATION,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_RELATION
        })
        .then(res => {
          this.optionList.identityOfCaseList = res;
        });
      //案件类型
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_TYPE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_TYPE
        })
        .then(res => {
          this.optionList.caseTypeList = res;
        });
    }
    // 保存提交
    /* handleSubmit(refArr, isClosePage) {
      let _self = this;
      Promise.all(
        refArr.map(ref => {
          let p = new Promise(function(resolve, reject) {
            _self.$refs[ref].validate(valid => {
              if (valid) {
                resolve(valid);
              } else {
                reject(valid);
              }
            });
          });
          return p;
        })
      )
        .then(data => {
          if (data[0]) {
            this.save()
              .then(res => {
                this.$Message.success("保存成功！");
                this.isPersonInfoSave = true;
                if (refArr[0] == "personInfoForm") {
                  this.tabIndex = 1;
                }
              })
              .catch(res => {
                this.$Message.error("保存失败！");
              });
          } else {
            this.$Message.error("请完善信息！");
          }
        })
        .catch(error => {
          this.$Message.error("请完善信息！");
        });
    },
    // 保存
    save() {
      let form = this.fillFormValue();
      console.table(form);

      var promise = new Promise((resolve, reject) => {
        apis.preservedPersonnelInfoBeHit(form).then(res => {
          if (res.code == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
    } */
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.infoBox {
  background-color: #fff;
  border: 1px solid rgba(224, 227, 230, 1);
  margin-bottom: 20px;
  padding-bottom: 57px;
  border-radius: 4px;
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
  .modal-content {
    padding: 26px;
    padding-bottom: 42px;
    position: relative;
    .btn {
      position: absolute;
      right: 114px;
      bottom: 10px;
      button {
        color: #ffffff;
        background-color: #2db7f5;
        outline: none;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 5px 15px 6px;
        font-size: 12px;
        border-radius: 4px;
        border: none;
      }
    }
  }
}
.form-panel {
  display: flex;
  justify-content: space-around;
}

.panel-right {
  width: 30%;

  .panel-form {
    width: 100%;
  }
}

.panel-form {
  &:first-child {
    margin-right: 50px;
  }

  width: 30%;

  .icon-jianhao {
    font-size: 30px;
    color: #999;
    vertical-align: middle;
  }

  .upload-avator {
    position: relative;
    display: inline-flex;
    width: 91px;
    height: 120px;
    background: #dddddd;
    border: 1px solid #d8d8d8;
    line-height: 100px;
    justify-content: center;
    align-items: center;

    .upload-image-file {
      position: absolute;
      left: -99999px;
      top: -99999px;
    }

    .picture {
      width: 100%;
      height: 100%;
    }
  }

  .upload-avator-button {
    margin-top: 93px;

    .upload-avator-button-icon {
      margin-left: 10px;
      font-size: 16px;
      color: #425d99;
    }
  }

  .card-num-group {
    display: inline-flex;
    width: 100%;

    .card-num {
      margin-right: 4px;
    }
  }
}

.panel-title {
  // border-left: 4px solid #0090ea;
  padding: 0 10px;
  font-size: 14px;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  color: rgb(102, 102, 102);
  height: 21px;
}

.panel-info {
  color: #333333;
  font-size: 16px;
}

.border {
  border-left: 4px solid #0090ea;
  text-align: left;
}

.detail-address {
  /deep/ .ivu-form-item-content {
    margin-left: 0 !important;
  }

  /deep/ .ivu-form-item-error-tip {
    padding-left: 10px;
  }
}

.divider-form {
  margin: 24px 20px 24px 30px !important;
}

/deep/ .ivu-select-dropdown {
  max-width: 600px;
}

.upload-avator-wrapper {
  display: inline-flex;

  .upload-action {
    padding-left: 10px;
  }
}

.twoRowLabel {
  /deep/label {
    line-height: 1.6 !important;
  }
}

.lean label.ivu-form-item-label:before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed4014;
}

.overseasPerson label.ivu-form-item-label {
  padding-left: 27px;
  line-height: 1.2;
  padding-top: 3px;
}

.nationalityForm {
  /deep/ .ivu-form-item-label {
    width: 60px !important;
  }

  /deep/ .ivu-form-item-content {
    margin-left: 60px !important;
  }
}

.person-label {
  display: inline-flex;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  flex-wrap: wrap;

  .labels {
    width: 30%;
    margin: 0 10px 5px 0;

    span {
      width: 100%;
      display: inline-block;
      border-radius: 4px;
      padding: 2px 3px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: default;
    }
  }
}
</style>