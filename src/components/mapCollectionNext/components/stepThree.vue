<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 19:13:35
 * @LastEditTime: 2019-12-17 09:44:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="d3-container" id="d3-container">
    <div class="title">
      <span>
        用时
        <span class="title-weight">{{exectueTime}}</span> 秒
      </span>
      <i-input
        v-model="filterText"
        clearable
        placeholder="查询姓名、身份证号"
        style="width: 300px;margin-left:50px;"
        @keyup.enter.native="handleSearch"
      ></i-input>
      <i-button type="primary" icon="ios-search" @click.native="handleSearch">搜索</i-button>
      <!-- 视图切换 -->
      <!-- 先隐藏 -->
      <div class="trigger-view">
        <!-- <div class="trigger-view" v-if="isViewBtnShow"> -->
        <div class="text">视图:</div>
        <div
          v-if="['4','7'].indexOf($route.query.mapType) != -1"
          @click="triggerViewClick('level')"
          :class="{'view-btn':true, active:currentViewType=='level'}"
        >层次图</div>
        <div
          v-if="['4','7'].indexOf($route.query.mapType) != -1"
          @click="triggerViewClick('levelTree')"
          :class="{'view-btn':true, active:currentViewType=='levelTree'}"
        >树形层次图</div>
        <div
          v-if="['3','10','5'].indexOf($route.query.mapType) != -1"
          @click="triggerViewClick('social')"
          :class="{'view-btn':true, active:currentViewType=='social'}"
        >树形分组图</div>
        <div
          @click="triggerViewClick('tree')"
          :class="{'view-btn':true, active:currentViewType=='tree'}"
        >树形图</div>
      </div>
      <span :class="'header-icon ' + (showOverview ? 'icon-active': '')">
        <i @click="handleExpand" title="展开/折叠" class="iconfont icon-zairumoban"></i>
      </span>
    </div>
    <div class="content" :style="{height:hasFooter ? 'calc(100% - 108px)':'calc(100% - 48px)'}">
      <div class="error-box" v-if="errorInfo.errorData.length>0">
        <span class="error-btn" @click="toggleClick">
          <i class="iconfont icon-tishi"></i>错误原因
        </span>
        <div :class="['error-tips',{hidden:hiddenClass}]">
          <div class="cont" v-for="(item,index) in errorInfo.errorData" :key="item">
            <p class="des">
              <span class="no">原因{{index+1}}：</span>
              {{item}}
            </p>
          </div>
        </div>
      </div>
      <component ref="mapGraph" :is="curComponent" :graphType="currentViewType"></component>
    </div>
    <div class="footer-action" v-if="hasFooter">
      <Button type="primary" v-if="hasSubmit" @click.native="handleSubmitClick">提交</Button>
      <Button type="primary" v-if="showWorkobjectButton" @click.native="handleAddWorkClick">添加工作对象</Button>
      <Button
        type="primary"
        v-if="hasAduit && hasFunAuth(constantFunMap.FUN_Online_R_Graph_Resolve_ID)"
        :disabled="resolveLoading"
        @click.native="handleResolveClick"
      >通过</Button>
      <Button
        type="error"
        v-if="hasAduit && hasFunAuth(constantFunMap.FUN_Online_R_Graph_Reject_ID)"
        @click.native="handleRejectClick"
      >退回</Button>
      <Button @click.native="handleCloseEvent">关闭</Button>
    </div>
    <!-- <d3-load v-model="d3Loading" class="loading-bg"></d3-load> -->
    <loading color="white" v-model="d3Loading"></loading>
    <!-- 退回模态框 -->
    <Modal
      v-model="isRefuse"
      title="图谱审核退回理由"
      @on-ok="patRefuse"
      @on-cancel="cancel"
      :loading="refuseLoading"
      width="420"
      :mask-closable="false"
    >
      <Form class="refuse-modal" :rules="rules" :model="refuse" ref="refuse" :label-width="80">
        <FormItem prop="commentId" label="退回理由">
          <Select v-model="refuse.commentId" style="width:260px">
            <Option
              v-for="item in reasonList"
              :value="item.value"
              :key="item.value"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="refuseMsg" label="具体描述">
          <i-input
            type="textarea"
            v-model="refuse.refuseMsg"
            style="width:260px"
            :rows="4"
            placeholder="请填写退回理由的具体信息"
          ></i-input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="errorModal" width="572" class="errorBox">
      <p slot="header" class="errorModal-header">
        <i class="iconfont icon-tishi"></i>
        <span>提交失败</span>
      </p>
      <div class="errorModal-body">
        <p class="error-title">请完善图谱相关信息</p>
        <div class="error-content" v-for="(item,index) in errorInfo.errorData" :key="item">
          <div class="cont">
            <p class="des">
              <span class="no">原因{{index+1}}：</span>
              {{item}}
            </p>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="closeErrorBox">确定</Button>
      </div>
    </Modal>
    <!-- 高级查询模态窗 -->
    <D3FilterCondition
      v-model="filterConditionVisible"
      :params="filterConditionParams"
      metaTitle="在线采集"
    ></D3FilterCondition>
  </div>
</template>
<script>
import D3Load from "@/components/assembly/D3Load";
import { mapMixin } from "../mixin/mapMixin";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import { CASE_CODE, CLUB_CODE } from "@/api/config.js";
import hydra from "../../../../static/vendors/hydraCard.js";
import Loading from "@/components/assembly/Loading";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
export default {
  name: "StepThree",
  mixins: [mapMixin],
  components: {
    Loading,
    // FamilyMapGraph,
    FamilyMapGraph: () => import("./assembly/family/mapGraph"),
    HouseholdMapGraph: () => import("./assembly/household/mapGraph"),
    CaseMapGraph: () => import("./assembly/case/mapGraph"),
    ReligiousMapGraph: () => import("./assembly/religious/mapGraph"),
    EntryExitMapGraph: () => import("./assembly/entryExit/mapGraph"),
    EntryExitRelationMapGraph: () =>
      import("./assembly/entryExitRelationMap/mapGraph"),
    SocietyMapGraph: () => import("./assembly/society/mapGraph"),
    HajjMapGraph: () => import("./assembly/hajj/mapGraph"),
    D3FilterCondition
  },
  data() {
    return {
      hydra: null,
      hiddenClass: false,
      isRefuse: false,
      resolveLoading: false,
      refuseLoading: false,
      filterText: "",
      exectueTime: 0,
      d3Loading: false,
      showOverview: true,
      showWorkButton: false,
      isViewBtnShow: false, // 是否显示视图按钮(由子组件控制)
      currentViewType: "tree", // 当前视图type level层次 levelTree树形
      refuse: {
        refuseMsg: "", // 驳回理由
        commentId: "" //退回理由选中id
      },
      reasonList: [], //退回理由下拉列表
      rules: {
        commentId: [
          { required: true, message: "退回理由不能为空", trigger: "change" }
        ],
        refuseMsg: [
          {
            required: true,
            message: "退回理由具体描述不能为空",
            trigger: "blur"
          }
        ]
      },
      errorInfo: {
        message: "",
        errorData: []
      },
      errorModal: false,
      filterConditionVisible: false,
      filterConditionParams: null,
      CASE_CODE: CASE_CODE,
      CLUB_CODE: CLUB_CODE
    };
  },
  computed: {
    // 根据 mapType，在配置项中找对应的组件名
    curComponent() {
      let curSelectTp = this.$route.query.mapType;
      let cur = this.mapTypeList.find(x => x.id == curSelectTp);
      return cur ? cur.mapGraphComponent : "";
    },
    hasAduit() {
      let isAduit = this.$route.query.isAduit;
      if (isAduit == undefined) return false;
      return isAduit && (isAduit == "true" || isAduit == true) ? true : false;
    },
    // 是否有提交按钮
    hasSubmit() {
      // 如果是审核页面过来,不可以进行提交和编辑
      let isAduit = this.$route.query.isAduit;
      if (isAduit != undefined) return false;
      let status = this.$route.query.status;
      if (status == undefined) {
        return (
          true &&
          this.hasFunAuth(this.constantFunMap.FUN_Online_R_Graph_Submit_ID)
        );
      }
      let flag = status == 0 || status == 3 || status == 1 ? true : false;
      return (
        flag &&
        this.hasFunAuth(this.constantFunMap.FUN_Online_R_Graph_Submit_ID)
      );
    },
    showWorkobjectButton() {
      return (
        this.showWorkButton &&
        this.hasFunAuth(this.constantFunMap.FUN_Online_R_Graph_AddEdit_ID)
      );
    },
    hasFooter() {
      return true;
    }
  },
  created() {
    this.hydra = hydra;
    this.setCurrentViewType();
  },
  methods: {
    setCurrentViewType() {
      if (["4", "7"].indexOf(this.$route.query.mapType) != -1) {
        this.currentViewType = "level";
      } else if (["3", "10", "5"].indexOf(this.$route.query.mapType) != -1) {
        this.currentViewType = "social";
      } else {
        this.currentViewType = "tree";
      }
    },
    closeErrorBox() {
      this.errorModal = false;
    },
    // 点击 视图按钮
    triggerViewClick(type) {
      this.currentViewType = type; // 保存当前类型 高亮
      this.$refs.mapGraph.getGraphData(this.currentViewType);
    },
    handleSearch() {
      let map = this.$refs.mapGraph;
      let d3Data = map.graph.getData();
      let nodes = [];
      // if (d3Data.nodes[0].data.nodes != undefined) {
      //   d3Data.nodes.forEach(x => {
      //     let childs = x.data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      //     nodes.push.apply(nodes, childs);
      //   });
      // } else {
      nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      // }
      // 清空选中
      if (nodes.length > 0) {
        map.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
      }
      let arr = nodes.filter(x => {
        return (
          x.data.properties.SFZHM == this.filterText ||
          x.data.properties.XM.indexOf(this.filterText) != -1
        );
      });
      if (arr.length > 0) {
        let oids = arr.map(x => x.data.id);
        map.graph.editNodeColor(oids, "green");
        map.graph.centerSelection(arr, []);
      }
    },
    // 展开、折叠
    handleExpand() {
      this.showOverview = !this.showOverview;
    },
    handleRejectClick() {
      apis.GET_REASON_LIST("AUDIT_BACK_REASON").then(res => {
        if (res.code === 200) {
          this.reasonList = res.data;
        }
      });
      this.isRefuse = true;
    },
    //  拒绝
    patRefuse() {
      this.$refs.refuse.validate(valid => {
        // 表单验证
        if (valid) {
          this.refuseLoading = true; // 加载状态
          let params = {
            auditState: 1,
            billId: this.$route.query.collectId,
            comment: this.refuse.refuseMsg,
            commentId: this.refuse.commentId
          };
          apis
            .POST_CHANGE_MAP_STATE(params)
            .then(res => {
              if (res.code === 200) {
                this.$Message.success("退回成功！");
                this.refuseLoading = false; // 关闭加载状态
                this.isRefuse = false; // 关闭当前模态
                window.opener.location.reload();
                setTimeout(() => {
                  window.close();
                }, 800);
              } else {
                this.$Message.success("退回失败！");
              }
            })
            .catch(() => {
              this.isRefuse = false;
              this.refuseLoading = false;
            });
        } else {
          setTimeout(() => {
            this.isRefuse = true;
            this.refuseLoading = false;
            this.$nextTick(() => {
              this.refuseLoading = true;
            });
          }, 0);
        }
      });
    },
    // 重置表单验证
    handleReset() {
      this.$refs.refuse.resetFields();
    },
    // 通过审核事件
    handleResolveClick() {
      if (this.resolveLoading) return;
      this.resolveLoading = true;
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要批准该图谱吗？",
        loading: true,
        onOk: () => {
          let params = {
            auditState: 0,
            billId: this.$route.query.collectId,
            comment: ""
          };
          apis.POST_CHANGE_MAP_STATE(params).then(res => {
            this.resolveLoading = false;
            this.$Modal.remove();
            if (res.code === 200) {
              this.$Message.success("审核成功！");
              window.opener.location.reload();
              setTimeout(() => {
                window.close();
              }, 800);
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          this.resolveLoading = false;
        }
      });
    },
    // 如果当前图形没有根节点的话显示添加工作对象按钮及事件
    handleAddWorkClick() {
      this.$refs.mapGraph.handleAddWorkObjectEvent();
    },
    // 提交
    handleSubmitClick() {
      let map = this.$refs.mapGraph;
      let d3Data = map.graph.getData();

      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      console.log(nodes);

      // 获取 level层次图 nodes
      // if (this.$refs.mapGraph.opt.type == "level") {
      //   console.log(d3Data, nodes);
      //   nodes = [];
      //   d3Data.nodes.forEach(x => {
      //     x.data.nodes.forEach(item => {
      //       if (item.data.nodeType == "QB_ZP_RY") nodes.push(item);
      //     });
      //   });
      // }
      if (nodes.length <= 0) {
        this.$Message.warning("请至少添加一个人员对象！");
        return;
      }
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要提交该图谱吗？",
        onOk: () => {
          let params = {
            auditState: 2,
            billId: this.$route.query.collectId,
            comment: ""
          };
          apis.POST_CHANGE_MAP_STATE(params).then(res => {
            if (res.code === 200) {
              this.$Message.success("提交成功！");
              window.parent.opener.location.reload();
              window.close();
            } else {
              // let error = "";
              // res.data.personErrorData.forEach(x => {
              //   error += "<p>" + x + "</p>";
              // });
              // this.$Modal.error({
              //   title: res.data.message,
              //   content: error,
              //   width: 525
              // });
              this.errorInfo.message = res.data.message;
              this.errorInfo.errorData = [
                ...res.data.mapErrorData,
                ...res.data.relationErrorData,
                ...res.data.personErrorData
              ];
              this.errorModal = true;
              // 高亮错误卡片
              if (this.$refs.mapGraph.highlightErrCard) {
                this.$refs.mapGraph.highlightErrCard(res.data.errorIdNumber);
              }
            }
          });
        },
        onCancel: () => {
          this.$Message.error("取消提交！");
        }
      });
    },
    handleCloseEvent() {
      if (this.hasSubmit || this.showWorkobjectButton) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "您确定要关闭当前页面吗？",
          onOk: () => {
            if (this.$route.query.status == "0") {
              window.opener.document.getElementById("tpList").click();
            }
            window.close();
          },
          onCancel: () => {}
        });
      } else {
        if (this.$route.query.status == "0") {
          window.opener.document.getElementById("tpList").click();
        }
        window.close();
      }
    },
    cancel() {
      this.handleReset();
    },
    toggleClick() {
      this.hiddenClass = !this.hiddenClass;
    }
  },
  watch: {
    collectId: {
      handler(val) {},
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@imageBaseUrl: "../../../../";
.footer-action {
  width: 100%;
  flex: 0 0 60px;
  justify-content: center !important;
  padding: 15px 20px;
  border-top: 1px solid #ddd;
  background: #fff;
  /deep/ button {
    margin: 0 4px;
    min-width: 80px;
  }
}
.d3-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    height: 44px;
    line-height: 44px;
    background: #c7d7eb;
    color: #2698ed;
    font-size: 16px;
    padding-left: 20px;
    .trigger-view {
      display: inline-block;
      vertical-align: middle;
      > div {
        float: left;
      }
      .text {
        margin-top: -3px;
        margin-left: 4px;
      }
      .view-btn {
        float: left;
        line-height: 25px;
        background-color: #fff;
        padding: 0 8px;
        border-radius: 4px;
        margin-top: 7px;
        margin-left: 6px;
        font-size: 12px;
        cursor: pointer;
        &.active {
          background-color: #57a3f3;
          color: #fff;
        }
      }
    }
    .title-weight {
      font-weight: bold;
      padding: 0 4px;
    }
    .header-icon {
      right: 20px;
      color: #999999;
      position: relative;
      top: 2px;
      float: right;
    }
    .icon-active {
      color: #2698ed;
    }
  }
  .content {
    height: calc(100% - 48px);
    background: url("@{imageBaseUrl}static/images/net.png") repeat #ffffff;
    position: relative;
    .hydra {
      height: 100%;
      width: 100%;
      position: relative;
    }
    .error-box {
      position: absolute;
      top: 21px;
      left: 17px;
      z-index: 99;
      .error-btn {
        font-size: 12px;
        border: 1px solid #e3e3e3;
        background-color: #fff;
        padding: 5px;
        border-radius: 4px;
        cursor: pointer;
        i {
          color: #ce4343;
          font-size: 18px;
          vertical-align: middle;
          padding-right: 3px;
        }
      }
      .error-tips {
        border: 1px solid #e0e3e6;
        background-color: #fff;
        box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 10px;
        max-width: 425px;
        max-height: 240px;
        overflow-y: auto;
        overflow-x: hidden;
        .cont {
          font-size: 12px;
          margin-bottom: 5px;
          .no {
            color: #ce4343;
          }
        }
      }
      .hidden {
        display: none;
      }
    }
  }
}
.loading-bg {
  z-index: 11;
}
.refuse-modal {
  margin: 15px;
}
// /deep/.ivu-modal {
//   width: 420px !important;
// }
.errorBox {
  /deep/.ivu-modal-body {
    max-height: 340px;
    overflow-y: auto;
  }
  .errorModal-header {
    font-size: 16px;
    i {
      color: #ce4343;
      font-size: 24px;
    }
  }
  .errorModal-body {
    .error-title {
      font-size: 14px;
      color: #999;
      margin-bottom: 15px;
    }
    .error-content {
      .cont {
        font-size: 14px;
        margin-bottom: 5px;
        .no {
          color: #ce4343;
        }
      }
    }
  }
}
</style>
