<!--
 * @Author: your name
 * @Date: 2019-12-09 09:42:15
 * @LastEditTime: 2019-12-11 20:53:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\system\codeMaintenance\index.vue
 -->
<template>
  <div class="codeMaintenance-container">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="字典表维护" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">字典表维护</div>
        <div class="header-search">
          <label class="header-label">字典搜索</label>
          <i-input
            class="search-input"
            size="large"
            v-model="filters.keyWord"
            style="width:499px"
            @on-change="handleClear"
            clearable
            placeholder="请搜索字典编码、字典项、字典显示名称"
            @keyup.enter.native="handleSearch"
          >
            <i-button
              class="search-btn"
              slot="append"
              icon="ios-search"
              style="width:80px"
              @click.native="handleSearch"
            ></i-button>
          </i-input>
          <div class="state">
            <span class="label">状态：</span>
            <CheckboxGroup v-model="filters.state" @on-change="handleChangeState">
              <Checkbox
                :key="index"
                v-for="(item,index) in stateList"
                :label="item.value"
              >{{item.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div class="table-actions">
            <span
              class="button-primary"
              v-if="hasFunAuth(constantFunMap.FUN_CodeMaintenance_Add_ID)"
              @click="handleAddCode"
            >添加</span>
          </div>
        </div>
        <div class="wrapper-detail">
          <div class="wrapper-content" ref="wrapperDetail">
            <Table stripe :columns="columns" :data="tableData" :height="tableHeight"></Table>
            <div class="page-box">
              <Page
                :total="pagination.total"
                :current="pagination.pageIndex"
                :page-size="pagination.pageSize"
                show-total
                show-elevator
                @on-change="handlePageChange"
              ></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加编辑弹框 -->
    <right-dialog
      title="字典表详细信息"
      :showOkBtn="showOkBtn"
      :statusList="statusList"
      @close="closeMultiModal"
      @ok="uploadModal"
    >
      <Form ref="form" :model="form" :rules="rules" :label-width="100">
        <FormItem label="字典编码" prop="dictCode">
          <Input v-model="form.dictCode" placeholder="请输入字典编码" :disabled="!isAdd"></Input>
        </FormItem>
        <FormItem label="字典项" prop="dictName">
          <Input v-model="form.dictName" placeholder="请输入字典项" :disabled="!isAdd"></Input>
        </FormItem>
        <FormItem label="字典显示名称" prop="displayName">
          <Input v-model="form.displayName" placeholder="请输入字典显示名称" :disabled="!isAdd"></Input>
        </FormItem>
        <FormItem label="字典值" prop="dictValue">
          <Input v-model="form.dictValue" placeholder="请输入字典值" :disabled="!isAdd"></Input>
        </FormItem>
        <FormItem label="背景颜色值" prop="color">
          <ColorPicker :disabled="!showOkBtn" v-model="form.color" />
           <span style="color: #515a6e">{{form.color.indexOf("#") == 0 ? form.color.substr(1) : form.color}}</span>
        </FormItem>
        <FormItem label="分值" prop="score">
          <Input v-model="form.score" placeholder="分值范围0-100" :disabled="!showOkBtn"></Input>
        </FormItem>
        <FormItem label="排序" prop="dictOrder">
          <Input v-model="form.dictOrder" placeholder="排序范围1-9999" :disabled="!showOkBtn"></Input>
        </FormItem>
        <FormItem label="状态" prop="state">
          <i-switch :disabled="isAdd || !showOkBtn" v-model="form.state"></i-switch>
        </FormItem>
      </Form>
    </right-dialog>
  </div>
</template>

<script>
import appHeader from "@/components/assembly/AppHeader";
import SideBar from "@/components/assembly/Sidebar";
import * as apis from "@/api/system/codemaintenance";
import rightDialog from "@/components/assembly/RightDialog";
export default {
  data() {
    return {
      filters: {
        state: ['1'],
        keyWord: ""
      },
      form: {
        clientId: "",
        color: "",
        dictCode: "",
        dictId: "",
        dictName: "",
        dictOrder: "",
        dictValue: "",
        displayName: "",
        score: "",
        state: true
      },
      isAdd: true,
      rules: {
        dictCode: {
          required: true,
          message: "字典编码不能为空！",
          trigger: "blur"
        },
        dictName: {
          required: true,
          message: "字典项不能为空！",
          trigger: "blur"
        },
        displayName: {
          required: true,
          message: "字典显示名称不能为空！",
          trigger: "blur"
        },
        dictValue: {
          required: true,
          message: "字典值不能为空！",
          trigger: "blur"
        },
        score: { 
          validator: this.validateScore, trigger: 'blur' 
        },
        dictOrder: { 
          validator: this.validateTagOrder, trigger: 'blur' 
        },
      },

      statusList: {
        MultiModal: false,
        isDeleteModal: false, // 删除确认框 展示
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      },
      tableHeight: 300,
      stateList: [
        {
          name: "启用",
          value: "1"
        },
        {
          name: "停用",
          value: "0"
        }
      ],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      columns: [
        {
          title: "序号",
          key: "ordinal",
          width: 90
        },
        {
          title: "字典编码",
          key: "dictCode",
          width: 200
        },
        {
          title: "字典项",
          key: "dictName"
        },
        {
          title: "字典显示名称",
          key: "displayName"
        },
        {
          title: "字典值",
          key: "dictValue",
          align: "center"
        },
        {
          title: "背景颜色值",
          key: "color",
          render: (h, params) => {
            let backgroundColor = "";
            if (params.row.color) {
              backgroundColor =
              params.row.color.indexOf("#") == 0 ? params.row.color.substr(1) : params.row.color
            }
            return h("div", [
              h("span", {
                style: {
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  borderRadius: "3px",
                  marginRight: "5px",
                  backgroundColor: "#"+backgroundColor,
                  verticalAlign: "middle",
                  border: params.row.color ? "1px solid #333" : ""
                }
              }),
              h(
                "span",
                {
                  style: {
                    verticalAlign: "middle"
                  }
                },
                backgroundColor
              )
            ]);
          }
        },
        {
          title: "分值",
          key: "score",
          align: "center",
          width: 90
        },
        {
          title: "排序",
          key: "dictOrder",
          width: 80
        },
        {
          title: "状态",
          key: "state",
          width: 90,
          render: (h, params) => {
            return h("div", [
              h("div", {
                style: {
                  width: "54px",
                  height: "22px",
                  position: "absolute",
                  zIndex: 1
                },
                on: {
                  click: () => {
                    this.handleBeforeChange(params.row, params.index);
                  }
                }
              }),
              h("i-switch", {
                //数据库1是已处理，0是未处理
                props: {
                  type: "primary",
                  value: params.row.state == 1, //控制开关的打开或关闭状态，官网文档属性是value
                  disabled: !this.hasFunAuth(
                    this.constantFunMap.FUN_CodeMaintenance_State_ID
                  )
                },
                on: {
                  // "on-change": value => {
                  //   //触发事件是on-change,用双引号括起来，
                  //   //参数value是回调值，并没有使用到
                  //   this.handleSwitchClick(value, params.row, params.index); //params.index是拿到table的行序列，可以取到对应的表格值
                  // },
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          align: "center",
          width: 90,
          render: (h, params) => {
            return (
              <span>
                {this.hasFunAuth(
                  this.constantFunMap.FUN_CodeMaintenance_View_ID
                ) ? (
                  <i-button
                    size="small"
                    type="primary"
                    on-click={$event =>
                      this.handleView(params.row, params.index)
                    }
                  >
                    查看
                  </i-button>
                ) : (
                  ""
                )}
              </span>
            );
          }
        }
      ],
      tableData: []
    };
  },
  computed: {
    showOkBtn() {
      if (this.isAdd) {
        return true;
      }
      return this.hasFunAuth(this.constantFunMap.FUN_CodeMaintenance_Edit_ID);
    }
  },
  components: {
    appHeader,
    SideBar,
    rightDialog
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.init();
    this.resizeHandler();
  },
  methods: {
    init(index) {
      this.pagination.pageIndex = index || 1;
      this.getCodeList();
    },
    closeMultiModal() {
      this.resetForm();
      this.statusList.MultiModal = false;
    },
    uploadModal() {
      let req = this.Add ? apis.POST_ADD_CODE_DATA : apis.PATCH_EDIT_CODE_DATA;
      this.$refs.form.validate(valid => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form));
          form.state = form.state ? 1 : 0;
          form.dictOrder = form.dictOrder ? form.dictOrder : 9999;
          form.color = form.color.indexOf("#") == 0 ? form.color.substr(1) : form.color
          req(form).then(res => {
            if (res.code == 200) {
              if (this.Add) {
                this.$Message.success("添加成功！");
              } else {
                this.$Message.success("编辑成功！");
              }
              this.init();
              this.closeMultiModal();
            } else {
              this.$Message.error("添加失败！");
            }
          });
        } else {
          this.$Message.error("请完善信息！");
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    getCodeList() {
      let parmas = {
        keyWord: this.filters.keyWord,
        state: this.filters.state.length > 1 ? "" : this.filters.state.join(),
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      };
      apis.POST_CODE_LIST_DATA(parmas).then(res => {
        if (res.code == 200) {
          let data = res.data.data;
          data.forEach((val, index) => {
            val.ordinal = index + 1 + (this.pagination.pageIndex - 1) * 10;
          });
          this.tableData = data;
          this.pagination.total = res.data.total;
        }
      });
    },
    handleView(row) {
      this.isAdd = false;
      this.statusList.MultiModal = true;
      let form = JSON.parse(JSON.stringify(row));
      form.state = form.state == 1;
      form.color = form.color ? form.color : "";
      this.form = form;
    },
    handleAddCode() {
      this.isAdd = true;
      this.statusList.MultiModal = true;
    },
    handleBeforeChange(row, index) {
      if (this.hasFunAuth(this.constantFunMap.FUN_CodeMaintenance_State_ID)) {
        let me = this;
        let content =
          row.state == 0
            ? "你确定要启用该字典项吗？"
            : "你确定要停用该字典项吗？";
        this.$Modal.confirm({
          title: "消息",
          content: content,
          onOk() {
            let form = JSON.parse(JSON.stringify(row));
            form.state = form.state == 0 ? 1 : 0;
            me.tableData[index].state = row.state == 0 ? 1 : 0;
            apis.PATCH_EDIT_CODE_DATA(form).then(res => {});
          },
          onCancel() {}
        });
      }
    },
    handleSwitchClick(value, row, index) {},
    handlePageChange(index) {
      this.init(index);
    },
    handleSearch() {
      this.init();
    },
    handleClear(e) {
      if (e.target.value == "") {
        this.init();
      }
    },
    handleChangeState() {
      this.init();
    },
    resizeHandler() {
      this.$nextTick(() => {
        if (this.$refs.wrapperDetail) {
          let wrapperDetailHeight = this.$refs.wrapperDetail.clientHeight;
          if (wrapperDetailHeight - 90 < 300) {
            this.tableHeight = 300;
          } else {
            this.tableHeight = wrapperDetailHeight - 90;
          }
        } else {
          this.tableHeight = 300;
        }
      });
    },
    // 校验分值
    validateScore(rule, value, callback) {
      if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'));
      } else {
        +value >= 0 && +value <= 100 ? callback() : callback(new Error('分值范围0-100'));
      }
    },
    // 校验排序
    validateTagOrder(rule, value, callback) {
      if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'));
      } else {
        +value > 0 && +value < 10000 ? callback() : callback(new Error('排序范围1-9999'));
      }
    }
  }
};
</script>

<style lang="less" scoped>
@widthH: 100%;
@imageUrl: "../../../../";
@borderColor: #dcdfe6;
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
.codeMaintenance-container {
  width: @widthH;
  height: @widthH;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  color: #68a4f6;
  overflow-x: hidden;
  overflow-y: hidden;
  .content {
    .post(a);
    left: 240px;
    top: 67px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    .wrapper {
      position: absolute;
      top: 2px;
      left: 0;
      right: 0;
      bottom: 6px;
      border: solid 2px #91b5ff;
      border-radius: 5px 5px 0 0;
      box-shadow: 0px 0px 9px #666 inset;
      background: url("@{imageUrl}static/images/net.png") repeat #ffffff;
      .title {
        position: absolute;
        top: -3px;
        left: -2px;
        right: -2px;
        border-radius: 5px 5px 0 0;
        height: 44px;
        line-height: 44px;
        background-color: #c7d7eb;
        overflow: hidden;
        font-size: 16px;
        padding-left: 16px;
        color: #2698ed;
      }
      .header-search {
        height: 60px;
        // background-color: #91b5ff;
        padding: 60px 40px;
        position: absolute;
        top: 40px;
        left: -2px;
        right: -2px;
        display: flex;
        align-items: center;
        .header-label {
          padding-right: 20px;
          width: 120px;
          color: #333;
        }
        /deep/.ivu-btn-primary {
          margin-left: -82px !important;
        }
        /deep/.ivu-input-icon {
          right: 80px;
        }
        .state {
          display: flex;
          align-items: center;
          color: #333;
          font-size: 14px;
          .label {
            padding-left: 20px;
            padding-right: 15px;
          }
          /deep/.ivu-checkbox-group-item {
            font-size: inherit;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 3px 12px;
            font-size: 14px;
          }
          /deep/.ivu-checkbox {
            display: none;
          }
          /deep/.ivu-checkbox-wrapper {
            margin-right: 20px;
          }
          /deep/label.ivu-checkbox-wrapper.ivu-checkbox-group-item.ivu-checkbox-wrapper-checked.ivu-checkbox-default {
            background-color: #1b8ae7;
            color: #fff;
          }
        }

        .table-actions {
          position: absolute;
          right: 40px;
          button {
            font-size: 14px;
            font-weight: 600;
          }
          .button-primary {
            float: right;
            display: inline-block;
            width: 93px;
            height: 36px;
            margin-top: 12px;
            line-height: 36px;
            text-align: center;
            cursor: pointer;
            background: url("@{imageUrl}static/images/sure.png") 0 0 no-repeat;
            color: #ffffff;
          }
        }
      }
    }
    .wrapper-detail {
      position: absolute;
      top: 165px;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      padding: 0 40px;
      color: #333;
      .wrapper-content {
        height: 100%;
        position: relative;
        .page-box {
          margin-top: 20px;
        }
      }
    }
  }
  /deep/.ivu-input[disabled],
  fieldset[disabled] .ivu-input {
    background-color: #fdfdfd;
    color: #aaa;
  }
}
</style>
