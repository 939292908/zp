<!--
 * @Author: your name
 * @Date: 2019-11-18 11:03:07
 * @LastEditTime : 2019-12-20 10:13:41
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\components\tpMultitap\BatchMultitap.vue
 -->
<template>
  <Modal
    v-model="showModal"
    title="图谱批量转接"
    @on-ok="handleMultitap"
    @on-cancel="cancel"
    :width="414"
    :mask-closable="false"
    :loading="loading"
  >
    <div class="modal-body">
      <div class="info-box">
        <div class="info-title">
          <p>图谱当前归属人信息</p>
        </div>
        <div class="info-content">
          <Form ref="belongerForm" :model="belongerForm" :rules="belongerRule" :label-width="80">
            <FormItem label="单位选择" prop="belongDeptDisplayName">
              <tree-filter
                :apiKey="optionConfig.CURRENT_TOKEN_DEPT_TREE"
                ref="deptTree"
                select-type="all"
                :tree-props="detpTreeProps"
                v-model="belongerForm.belongDeptDisplayName"
                placeholder="请选择单位"
                :apiFun="deptApis"
                @on-select-change="handleDeptSelectChangeSender"
                @on-clear="handleDeptPath"
                style="width:286px"
              ></tree-filter>
            </FormItem>
            <FormItem label="姓名" prop="userName">
              <Select
                filterable
                v-model="belongerForm.userName"
                style="width:286px"
                @on-change="handleSelectUserName"
              >
                <Option
                  v-for="item in senderUserList"
                  :value="item.userId"
                  :key="item.userId"
                >{{ item.userName }}</Option>
              </Select>
            </FormItem>
            <FormItem label style="margin-bottom:0">
              <div class="item-cont item-infoDes">
                <div class="infoDes">
                  警号：
                  <span>{{belongerForm.userCode}}</span>
                </div>
                <div class="infoDes">
                  联系方式：
                  <span>{{belongerForm.phone}}</span>
                </div>
              </div>
            </FormItem>
          </Form>
          <div class="tpList" v-if="unSubmitTpList.length>0">
            <div class="tpType-header">
              <div class="label"></div>
              <div class="types">
                <div
                  class="type"
                  v-for="(item,index) in unSubmitTpList"
                  :key="index"
                  :style="{backgroundColor:$config.topTagColors[item.typeName]}"
                >{{item.typeName}}</div>
              </div>
            </div>
            <div class="state-body">
              <div class="state">
                <div class="label">已通过</div>
                <div class="conuts">
                  <div
                    class="count"
                    v-for="(item,index) in completedTpList"
                    :key="index"
                  >{{item.count}}</div>
                </div>
              </div>
              <div class="state">
                <div class="label">审核中</div>
                <div class="conuts">
                  <div
                    class="count"
                    v-for="(item,index) in applyingTpList"
                    :key="index"
                  >{{item.count}}</div>
                </div>
              </div>
              <div class="state" style="border-bottom: none;">
                <div class="label">未提交</div>
                <div class="conuts">
                  <div
                    class="count"
                    v-for="(item,index) in unSubmitTpList"
                    :key="index"
                  >{{item.count}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-title">
          <p>图谱接手人信息</p>
        </div>
        <div class="info-content">
          <Form ref="inheritorForm" :model="inheritorForm" :rules="inheritorRule" :label-width="80">
            <FormItem label="单位选择" prop="belongDeptDisplayName">
              <tree-filter
                :apiKey="optionConfig.CURRENT_TOKEN_DEPT_TREE"
                ref="deptTree"
                select-type="all"
                :tree-props="detpTreeProps"
                v-model="inheritorForm.belongDeptDisplayName"
                placeholder="请选择单位"
                :apiFun="deptApis"
                @on-select-change="handleDeptSelectChangeReceived"
                @on-clear="handleDeptPath"
                style="width:286px"
              ></tree-filter>
            </FormItem>
            <FormItem label="姓名" prop="userName">
              <Select
                filterable
                v-model="inheritorForm.userName"
                style="width:286px"
                @on-change="handleSelectInheritorUserName"
              >
                <Option
                  v-for="item in receivedUserList"
                  :value="item.userId"
                  :key="item.userId"
                >{{ item.userName }}</Option>
              </Select>
            </FormItem>
            <FormItem label style="margin-bottom:0">
              <div class="item-cont item-infoDes">
                <div class="infoDes">
                  警号：
                  <span>{{inheritorForm.userCode}}</span>
                </div>
                <div class="infoDes">
                  联系方式：
                  <span>{{inheritorForm.phone}}</span>
                </div>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
export default {
  name: "BatchMultitapModal",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TreeFilter
  },
  data() {
    return {
      showModal: false,
      loading: true,
      belongerForm: {
        belongDeptDisplayName: "", //单位名
        deptCode: "",
        deptPath: "",
        userName: "", //姓名
        userCode: "", //警号
        userId: "", //归属人Id
        phone: "" //联系方式
      },
      inheritorForm: {
        belongDeptDisplayName: "", //单位名
        deptCode: "",
        deptPath: "",
        userId: "", //接收人Id
        userName: "", //姓名
        userCode: "", //警号
        phone: "" //联系方式
      },
      belongerRule: {
        belongDeptDisplayName: [
          { required: true, message: "归属单位不能为空！", trigger: "change" }
        ],
        userName: [
          { required: true, message: "归属人姓名不能为空", trigger: "change" }
        ]
      },
      inheritorRule: {
        belongDeptDisplayName: [
          { required: true, message: "转接单位不能为空！", trigger: "change" }
        ],
        userName: [
          { required: true, message: "接手人姓名不能为空", trigger: "change" }
        ]
      },
      optionConfig: OPTIONS_LIST,
      detpTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      deptApis: comApis.GET_DEPT_TREE_INFO,
      senderUserList: [],
      receivedUserList: [],
      unSubmitTpList: [],
      applyingTpList: [],
      completedTpList: []
    };
  },
  methods: {
    handleMultitap() {
      let _self = this;
      Promise.all(
        ["belongerForm", "inheritorForm"].map(ref => {
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
          this.multitap()
            .then(res => {
              if (res.code == 200) {
                this.$Notice.config({
                  top: 120
                });
                // let unSubmitStr = "";
                // let completedStr = "";
                // let applyingStr = "";
                let sum =
                  res.data.applying + res.data.mapCount + res.data.unSubmit;

                // this.unSubmitTpList.forEach(x => {
                //   unSubmitStr += x.typeName + "：" + x.count + " 张、";
                // });
                // this.completedTpList.forEach(x => {
                //   completedStr += x.typeName + "：" + x.count + " 张、";
                // });
                // this.applyingTpList.forEach(x => {
                //   applyingStr += x.typeName + "：" + x.count + " 张、";
                // });
                this.$Notice.success({
                  title: "转接成功",
                  desc:
                    "本次共转接" +
                    sum +
                    "张图谱（" +
                    "已通过：" +
                    res.data.mapCount +
                    "张，" +
                    "审核中：" +
                    res.data.applying +
                    "张，" +
                    "未提交：" +
                    res.data.unSubmit +
                    "张" +
                    ")"
                });
                this.showModal = false;
                this.$emit("on-hide", this.showModal);

                this.resetForm();
                setTimeout(() => {
                  this.loading = false;
                  this.$parent.refreshData();
                  this.$nextTick(() => {
                    this.loading = true;
                  });
                }, 500);
              }
            })
            .catch(error => {
              this.$Notice.error({
                title: "转接失败！",
                desc: error.msg
              });
              setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                  this.loading = true;
                });
              }, 500);
            });
        })
        .catch(error => {
          this.$Message.error("请完善人员信息！");
          setTimeout(() => {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 500);
        });
    },
    multitap() {
      let userName = this.receivedUserList.filter(x => {
        return x.userId == this.inheritorForm.userName;
      })[0].userName;
      let data = {
        receivedUserId: this.inheritorForm.userId,
        receivedUserName: userName,
        senderUserId: this.belongerForm.userId
      };
      var promise = new Promise(async (resolve, reject) => {
        apis.POST_BATCH_MULTITAP(data).then(res => {
          if (res.code == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
    },
    cancel() {
      this.showModal = false;
      this.$emit("on-hide", this.showModal);
      this.resetForm();
    },
    resetForm() {
      this.$refs["belongerForm"].resetFields();
      this.$refs["inheritorForm"].resetFields();
      this.belongerForm = {};
      this.inheritorForm = {};
      this.senderUserList = [];
      this.receivedUserList = [];
      this.unSubmitTpList = [];
      this.completedTpList = [];
      this.applyingTpList = [];
    },
    // 选择归属部门信息
    // 选择归属部门信息-归属人
    handleDeptSelectChangeSender(cur) {
      this.belongerForm.deptCode = cur.code;
      this.belongerForm.deptPath = cur.deptPath;
      this.senderUserList = [];
      this.unSubmitTpList = [];
      this.applyingTpList = [];
      this.completedTpList = [];
      this.belongerForm.userName = "";
      this.belongerForm.userCode = "";
      this.belongerForm.userId = "";
      this.belongerForm.phone = "";
      if (cur.code) {
        comApis.GET_DEPT_PERSON_LIST(cur.code).then(res => {
          if (res.code == 200) {
            this.senderUserList = res.data;
          }
        });
      }
    },
    // 选择归属部门信息-转接人
    handleDeptSelectChangeReceived(cur) {
      this.inheritorForm.deptCode = cur.code;
      this.inheritorForm.deptPath = cur.deptPath;
      this.receivedUserList = [];
      this.inheritorForm.userName = "";
      this.inheritorForm.userCode = "";
      this.inheritorForm.userId = "";
      this.inheritorForm.phone = "";
      if (cur.code) {
        comApis.GET_DEPT_PERSON_LIST(cur.code).then(res => {
          if (res.code == 200) {
            this.receivedUserList = res.data;
          }
        });
      }
    },
    // 清空单位选择
    handleDeptPath(val) {
      if (val == "") {
        this.resetForm();
      }
    },
    // 选中人员姓名带出信息
    handleSelectUserName(val) {
      if (val) {
        let userInfo = this.senderUserList.filter(x => {
          return x.userId == val;
        });
        this.belongerForm.userId = val;
        this.belongerForm.userCode = userInfo[0].userCode;
        this.belongerForm.phone = userInfo[0].phone;
        apis.GET_PERSON_MAPTYPE_STAT_DATA(val).then(res => {
          if (res.code == 200) {
            this.unSubmitTpList = res.data.unSubmit;
            this.applyingTpList = res.data.applying;
            this.completedTpList = res.data.completed;
          }
        });
      }
    },
    // 选中接手人员姓名带出信息
    handleSelectInheritorUserName(val) {
      if (val) {
        this.inheritorForm.userId = val;
        let userInfo = this.receivedUserList.filter(x => {
          return x.userId == val;
        });
        this.inheritorForm.userCode = userInfo[0].userCode;
        this.inheritorForm.phone = userInfo[0].phone;
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.showModal = val;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.ivu-modal-body {
  padding: 0;
}
.modal-body {
  .info-box {
    border-bottom: 1px solid #e0e3e6;
    padding: 16px;
    .info-title {
      p {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 15px;
      }
    }
    .info-content {
      .item-cont.item-infoDes {
        display: flex;
        width: 100%;
        .infoDes {
          flex: 1;
          color: #999;
          font-size: 13px;
          line-height: 1.5;
          span {
            color: #666;
          }
        }
      }
      .tpList {
        background-color: #f4f5f5;
        margin-top: 10px;
        .label {
          width: 60px;
          height: 36px;
          line-height: 36px;
          text-align: center;
        }
        .tpType-header {
          display: flex;
          align-items: center;
          padding: 5px 0;
          border-bottom: 1px solid #e3e3e3;
          .types {
            display: flex;
            justify-content: space-around;
            width: 100%;
            .type {
              width: 24px;
              height: 24px;
              text-align: center;
              line-height: 24px;
              border-radius: 3px;
              color: #fff;
            }
          }
        }
        .state-body {
          .state {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e3e3e3;
            .conuts {
              width: 100%;
              display: flex;
              justify-content: space-around;
            }
          }
        }
      }
    }
  }
}
</style>
