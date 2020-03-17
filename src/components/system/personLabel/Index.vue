<!--
 * @Author: your name
 * @Date: 2019-12-09 09:42:15
 * @LastEditTime: 2019-12-09 14:59:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\system\personLabel\index.vue
 -->
<template>
  <div class="personLabel-container">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="人员标签管理" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">人员标签管理</div>
        <div class="header-search">
          <!-- <Input
            search
            enter-button="搜索"
            v-model="filters.keyWord"
            placeholder="请搜索标签名称"
            style="width:470px"
            clearable
            @keyup.enter.native="getPersonLabelList"
            @on-search="getPersonLabelList"
          /> -->
          <label class="header-label">标签搜索</label>
          <i-input
            class="search-input"
            size="large"
            v-model="filters.keyWord"
            style="width:499px"
            clearable
            placeholder="请搜索标签名称"
            @keyup.enter.native="getPersonLabelList"
          >
            <i-button
              class="search-btn"
              slot="append"
              icon="ios-search"
              style="width:80px"
              @click.native="getPersonLabelList"
            ></i-button>
          </i-input>
          <!-- 状态过滤 -->
          <div class="state">
            <span class="label">状态：</span>
            <CheckboxGroup 
            v-model="filters.state"
            @on-change="checkboxStateChange">
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
              v-if="hasFunAuth(constantFunMap.FUN_PersonLabel_Add_ID)"
              @click.prevent="showAddModal"
            >添加</span>
          </div>
        </div>
        <div class="wrapper-detail">
          <!-- 表格 -->
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

    <!-- 右侧详情框 -->
    <right-dialog title="人员标签信息" :showOkBtn="modalType=='add' || modalType=='editor'" :statusList="statusList" @close="closeMultiModal" @ok="okBtnClick">
      <!-- 内容表单 -->
      <i-form ref="formValidate" :model="formData" :rules="rules" :label-width="92">
        <Form-item v-if="modalType!='add'" label="标签ID" prop="tagId">
          <i-input :disabled="true" v-model="formData.tagId" :maxlength="25" placeholder="请输入标签ID"></i-input>
        </Form-item>

        <Form-item label="标签名称" prop="tagName">
          <i-input :disabled="modalType=='view' || modalType=='editor'" v-model="formData.tagName" :maxlength="25" placeholder="请输入标签名称"></i-input>
        </Form-item>

        <Form-item label="标签字体颜色" prop="fontColor">
          <ColorPicker :disabled="modalType=='view'" v-model="formData.fontColor"/>
          <span style="color: #515a6e"> {{formData.fontColor.indexOf("#") == 0 ? formData.fontColor.substr(1) : formData.fontColor}}</span>
        </Form-item>

        <Form-item label="标签背景颜色" prop="tagColor">
          <ColorPicker :disabled="modalType=='view'" v-model="formData.tagColor"/>
          <span style="color: #515a6e"> {{formData.tagColor.indexOf("#") == 0 ? formData.tagColor.substr(1) : formData.tagColor}}</span>
        </Form-item>

        <Form-item label="分值" prop="score">
          <i-input :disabled="modalType=='view'" v-model="formData.score" :maxlength="25" placeholder="分值范围0-100"></i-input>
        </Form-item>

        <Form-item label="排序" prop="tagOrder">
          <i-input :disabled="modalType=='view'" v-model="formData.tagOrder" :maxlength="25" placeholder="排序范围1-9999"></i-input>
        </Form-item>

        <Form-item label="状态" prop="state">
          <i-switch :disabled="modalType=='view'" :value="formStateBtnValue" @on-change="stateBtnChangeForm" />
        </Form-item>

        <Form-item label="备注" prop="demo">
          <i-input :disabled="modalType=='view'" v-model="formData.demo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="2000" placeholder="请输入备注"></i-input>
        </Form-item>
       
      </i-form>
    </right-dialog>
  </div>
</template>

<script>
import appHeader from "@/components/assembly/AppHeader";
import SideBar from "@/components/assembly/Sidebar";
import rightDialog from '@/components/assembly/RightDialog';
import * as apis from "@/api/system/personLabel";
export default {
  components: {
    appHeader,
    SideBar,
    rightDialog
  },
  data() {
    return {
      modalType: "", // 侧边框功能: add / editor / view
      // 筛选params
      filters: {
        state: ['1'], // 1启用 0停用
        keyWord: ""
      },
      // 侧边框 表单data
      formData: {
        clientId: "", // 用户ID
        tagId: "", // 标签ID
        tagName: "", // 标签名称
        fontColor: "", // 字体颜色
        tagColor: "", // 背景颜色
        score: null, // 分值
        tagOrder: 9999, // 排序
        state: 1, // 状态 开 1 / 关 0
        demo: "", // 备注
      },
      statusList: {
        isDeleteModal: false, // 删除确认框 展示
        MultiModal: false, // 右侧模态框 切换
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
      // 分页
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      // 表头
      columns: [
        {
          title: "序号",
          key: "serialNumber",
          align: "center",
          width: 70
        },
        {
          title: "标签ID",
          key: "tagId",
          width: 80
        },
        {
          title: "标签名称",
          key: "tagName"
        },
        {
          title: "标签字体颜色",
          key: "fontColor",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h("span", {
                style: {
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  borderRadius: "3px",
                  marginRight: "5px",
                  backgroundColor: "#"+params.row.fontColor,
                  verticalAlign: "middle",
                  border: params.row.fontColor ? "1px solid #333" : ""
                }
              }),
              h(
                "span",
                {
                  style: {
                    verticalAlign: "middle"
                  }
                },
                params.row.fontColor
              )
            ]);
          }
        },
        {
          title: "标签背景颜色",
          key: "tagColor",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h("span", {
                style: {
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  borderRadius: "3px",
                  marginRight: "5px",
                  backgroundColor: "#"+params.row.tagColor,
                  verticalAlign: "middle",
                  border: params.row.tagColor ? "1px solid #333" : ""
                }
              }),
              h(
                "span",
                {
                  style: {
                    verticalAlign: "middle"
                  }
                },
                params.row.tagColor
              )
            ]);
          }
        },
        {
          title: "分值",
          key: "score",
          align: "center",
          width: 70
        },
        {
          title: "排序",
          key: "tagOrder",
          width: 80
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          width: 80,
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
                    this.handleSwitchChange(params.row, params.index); //params.index是拿到table的行序列，可以取到对应的表格值
                  }
                }
              }),
              h("i-switch", {
                //数据库1是开启，0是关闭
                props: {
                  type: "primary",
                  value: params.row.state == 1, //控制开关的打开或关闭状态，官网文档属性是value
                  disabled: !this.hasFunAuth(
                    this.constantFunMap.FUN_PersonLabel_State_ID
                  )
                },
                style: {
                  marginRight: "5px"
                },
                // on: {
                //   "on-change": value => {
                //     //触发事件是on-change,用双引号括起来，
                //     //参数value是回调值，并没有使用到
                //     // this.handleSwitchChange(value, params.row, params.index); //params.index是拿到table的行序列，可以取到对应的表格值
                //   }
                // }
              })
            ]);
          }
        },
        {
          title: "操作",
          align: "center",
          width: 140,
          render: (h, params) => {
            return (
              <div>
                <span style="margin: 0 4px">
                  {this.hasFunAuth( this.constantFunMap.FUN_PersonLabel_View_ID ) ? (
                    <i-button
                      size="small"
                      type="primary"
                      on-click={$event => this.showViewModal(params.row)}
                    >
                      查看
                    </i-button>
                  ) : ("")}
                </span>
                <span  style="margin: 0 4px">
                  {this.hasFunAuth( this.constantFunMap.FUN_PersonLabel_Editor_ID ) ? (
                    <i-button
                      size="small"
                      type="primary"
                      on-click={$event => this.showEditorModal(params.row)}
                    >
                      编辑
                    </i-button>
                  ) : ("")}
                </span>
              </div>
            );
          }
        }
      ],
      // 表格data
      tableData: [],
      // 模态框 校验
      rules: {
        tagName: [
          { required: true, message: "标签名称不能为空", trigger: "blur" }
        ],
        score: [
          { validator: this.validateScore, trigger: 'blur' },
        ],
        tagOrder: [
          {validator: this.validateTagOrder, trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.init();
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.resizeHandler(); // 初始化tabel高
  },
  computed: {
    // 表单中 状态按钮value
    formStateBtnValue() {
      return this.formData.state == 1;
    }
  },
  methods: {
    init() {
      this.getPersonLabelList();
    },
    // 获取人员标签列表
    getPersonLabelList() {
      let params = {
        keyWord: this.filters.keyWord,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
        state:  this.filters.state.length == 1 ? this.filters.state[0] : ""
      }
      apis.GET_PERSON_LABEL_LIST(params).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;
          // 添加序号字段
          this.tableData.map((item, index) => item.serialNumber = (this.pagination.pageIndex-1)*this.pagination.pageSize+index+1);
          // 颜色值不能为null
          this.tableData.map((item, index) => item.fontColor = item.fontColor ? item.fontColor : "");
          this.tableData.map((item, index) => item.tagColor = item.tagColor ? item.tagColor : "");
          // 分页
          this.pagination.total = res.data.total;
        }
      });
    },
    // 状态筛选 change 事件
    checkboxStateChange(value) {
      this.filters.state = value;
      this.pagination.pageIndex = 1;
      this.getPersonLabelList();
    },
    // 分页 change 事件
    handlePageChange(value) {
      this.pagination.pageIndex = value;
      this.getPersonLabelList();
    },
    // form开关 change 事件
    stateBtnChangeForm (value) {
      this.formData.state = value ? 1 : 0;
    },
    // table开关 change 事件
    handleSwitchChange(row, index) {
      let me = this;
        let content = row.state == 1 ? "是否停用该标签？" : "是否启用该标签？";
        me.$Modal.confirm({
          title: "消息",
          content: content,
          onOk() {
            me.formData = JSON.parse(JSON.stringify(row));
            me.formData.state = me.formData.state == 0 ? 1 : 0;
            me.saveEditor();
          },
          onCancel() {}
        });


    },
    // 初始化 侧边框
    resetModal() {
      this.$refs["formValidate"].resetFields();
    },
    // show 侧边框
    showModal() {
      this.statusList.MultiModal = true;
    },
    // show 添加框
    showAddModal() {
      this.modalType = 'add';
      this.showModal();
    },
    // show 编辑框
    showEditorModal(row) {
      this.modalType = 'editor';
      this.formData = JSON.parse(JSON.stringify(row));
      // console.log(row,this.formData);
      this.showModal();
    },
    // show 查看框
    showViewModal(row) {
      this.modalType = 'view';
      this.formData = JSON.parse(JSON.stringify(row));
      this.showModal();
    },
    // show 模态框
    closeMultiModal() {
      this.resetModal();
      this.statusList.MultiModal = false;
    },
    // 侧边框 保存按钮 click 事件
    okBtnClick() {
      this.$refs["formValidate"].validate( isOK => {
        if(isOK) {
          switch (this.modalType) {
            case "add":
              this.saveAdd();
              break;
            case "editor":
              this.saveEditor();
              break;
            default:
              return this.$Message.error(`保存失败！`);
          }
          // 关闭侧边框
          this.closeMultiModal();
        } else {
          this.$Message.error(`验证未通过！`);
        }
      })
    },
    // 构建请求参数
    buildParams(params) {
      let newParams = JSON.parse(JSON.stringify(params));
      newParams.fontColor = newParams.fontColor.indexOf("#") == 0 ? newParams.fontColor.substr(1) : newParams.fontColor;
      newParams.tagColor = newParams.tagColor.indexOf("#") == 0 ? newParams.tagColor.substr(1) : newParams.tagColor;
      return newParams;
    },
    // 添加接口
    saveAdd() {
      let params = this.buildParams(this.formData);
      // console.log('添加表单：', params);
      apis.ADD_PERSON_LABE(params)
      .then(res => {
        if (res.code == 200) {
          this.getPersonLabelList();
          this.$Message.success(`添加成功！`);
        } else {
          this.$Message.error(res.msg);
        }
      })
      .catch(error => {
          this.$Message.error(`添加失败！`);
      });
    },
    // 编辑接口
    saveEditor() {
      let params = this.buildParams(this.formData);
      // console.log('编辑表单：', params);
      apis.EDITOR_PERSON_LABE(params)
      .then(res => {
        if (res.code == 200) {
          this.getPersonLabelList();
          this.$Message.success(`编辑成功！`);
        } else {
          this.$Message.error(res.msg);
        }
      })
      .catch(error => {
          this.$Message.error(`编辑失败！`);
      });
    },
    // 设置table高度
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
.personLabel-container {
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
        color: #333;
        .header-label {
          padding-right: 20px;
          width: 120px;
          color: #333;
        }
        /deep/.ivu-btn-primary {
          margin-left: -82px !important;
        }
        /deep/.ivu-input-icon {
          right: 80px !important;
        }
        .state {
          display: flex;
          align-items: center;
          .label {
            padding-left: 20px;
          }
          /deep/.ivu-checkbox-group-item {
            font-size: inherit;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 2px 7px;
            font-size: 13px;
          }
          /deep/.ivu-checkbox {
            display: none;
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
      top: 160px;
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
}
</style>
