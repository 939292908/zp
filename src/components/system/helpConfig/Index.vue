<template>
  <div class="permission-container" @click="handleWrapperClick($event)">
    <!-- 头部 -->
    <app-header ref="appHeader" :items="statusList" title="帮助配置" :showSearch="false"></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">帮助配置</div>
        <div class="wrapper-detail" ref="wrapperDetail">
          <div class="search">
            <label>信息搜索</label>
            <i-input
              class="search-input"
              size="large"
              v-model="textFilter"
              clearable
              placeholder="请搜索标题、内容"
              @keyup.enter.native="search"
            >
              <i-button class="search-btn" slot="append" icon="ios-search" @click.native="search"></i-button>
            </i-input>
            <div class="table-actions">
              <span
                class="button-primary"
                v-if="hasFunAuth(constantFunMap.FUN_HelpConfig_Add_ID)"
                @click.prevent="addItem"
              >
                添加帮助
                <!-- <i class="iconfont icon-jiahao"></i> -->
              </span>
            </div>
          </div>
          <template class="result-table">
            <Table
              stripe
              ref="helpTable"
              :height="tableHeight"
              :columns="columns"
              :data="tableData"
            >
              <template slot-scope="{ row }" slot="action">
                <div>
                  <i-Button @click="edit(row)" class="buttom-margin" type="info" size="small">编辑</i-Button>
                  <i-Button @click="remove(row)" class="buttom-margin" type="error" size="small">删除</i-Button>
                </div>
              </template>
            </Table>
          </template>
          <Page
            class="pageInfo"
            :total="total"
            :page-size="pageSize"
            :current="pageIndex"
            show-total
            @on-change="pageInfo"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import switchView from "@/components/assembly/SwitchView";
import appHeader from "@/components/assembly/AppHeader";
import rightDialog from "@/components/assembly/RightDialog";
import SideBar from "@/components/assembly/Sidebar";
import switchRightView from "@/components/assembly/SwitchRightView";
import * as apis from "@/api/collection/index.js";
import { hasQuery } from "../../../tools/units.js";
export default {
  name: "HelpConfig",
  components: {
    // switchView,
    switchRightView,
    SideBar,
    appHeader,
    rightDialog
  },
  data() {
    return {
      loading: false,
      statusList: {
        typeModal: "", // 右模态框 功能切换 add/remove/detail
        MultiModal: false, // 右模态框 展示
        isDeleteModal: false, // 删除确认框 展示
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      },
      textFilter: "", //搜索 筛选条件
      tableHeight: 540,
      tableData: [],
      pageIndex: 1, //当前页码
      pageSize: 10, //每页条数
      total: 0 //数据总数
    };
  },
  beforeMount() {},
  computed: {
    columns: {
      get() {
        const me = this;
        return [
          {
            title: "序号",
            type: "index",
            width: 70,
            align: "center"
          },
          {
            title: "标题",
            key: "title",
            width: 150
          },
          {
            title: "发布类型",
            key: "type",
            width: 120
          },
          {
            title: "内容",
            key: "content",
            render(h, params) {
              let row = params.row;
              return <span>{me.transText(row.intro)}</span>;
            }
          },
          {
            title: "创建人",
            key: "creater",
            width: 170
          },
          {
            title: "更新时间",
            key: "updateTime",
            width: 170
          },
          {
            title: "操作",
            slot: "action",
            width: 150,
            align: "center"
          }
        ];
      }
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    /**
     * 帮助配置
     * @author huangjun
     */
    // 初始化 获取所有帮助信息 helpInfoAll
    initialize() {
      var params = {
        keyWord: this.textFilter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      this.searchHelpInfoAll(params);
    },
    pageInfo(number) {
      this.pageIndex = number;
      var params = {
        keyWord: this.textFilter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      this.searchHelpInfoAll(params);
    },
    transText(html) {
      // var html = this.tableData[index].intro;
      if (html == null) return "";
      var newHtml = html
        .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
        .replace(/<[^>]+?>/g, "")
        .replace(/\s+/g, " ")
        .replace(/ /g, " ")
        .replace(/>/g, " ");
      // console.log(newHtml);
      return newHtml.substring(0, 30) + "...";
    },
    searchHelpInfoAll(data) {
      const that = this;
      apis.helpInfoAll(data).then(res => {
        if (res.code == 200) {
          // that.$Message.error(res.msg);
          // console.log(res.data);
          that.total = res.data.total;
          that.tableData = res.data.data;
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    search() {
      const that = this;
      /* if (!that.textFilter) {
        that.$Message.warning("搜索内容不能为空！");
      } else {
        
      } */
      var params = {
        keyWord: that.textFilter,
        pageIndex: that.pageIndex,
        pageSize: that.pageSize
      };
      this.searchHelpInfoAll(params);
    },
    // 跳转到详情
    addItem() {
      const { href } = this.$router.resolve({
        name: "HelpConfigDetail",
        query: {
          add: true
        }
      });
      window.location.href = href;
    },
    edit(params) {
      console.log(params.id);
      const { href } = this.$router.resolve({
        name: "HelpConfigDetail",
        query: {
          add: false,
          id: params.id
        }
      });
      window.location.href = href;
    },
    remove(params) {
      const that = this;
      that.$Modal.confirm({
        title: "温馨提示",
        content: "是否删除标题是" + params.title + "的" + params.type + "？",
        onOk: () => {
          that.deleteInfo(params);
        },
        onCancel: () => {}
      });
    },
    deleteInfo(params) {
      const that = this;
      apis.deleteHelpInfo(params.id).then(res => {
        if (res.code == 200) {
          that.$Message.success("删除成功");
          that.initialize();
        } else {
          that.$Message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@widthH: 100%;
@imageUrl: "../../../../";
@borderColor: #dcdfe6;
.content {
  position: absolute;
  left: 240px;
  top: 68px;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  .wrapper {
    position: absolute;
    top: 2px;
    left: 0;
    right: 0;
    bottom: 6px;
    background: url("@{imageUrl}static/images/net.png") repeat #ffffff;
    border: solid 2px #91b5ff;
    border-radius: 5px 5px 0 0;
    box-shadow: 0px 0px 9px #666 inset;
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
  }
  .wrapper-detail {
    position: absolute;
    top: 41px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    padding: 20px 40px;
    color: #333;
    .search {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      padding: 20px 0;
      position: relative;
      .search-input {
        width: 500px;
        /deep/ .ivu-input-icon-clear {
          right: 81px !important;
        }
      }
      .search-btn {
        width: 80px;
      }
      .search-checkbox {
        margin-left: 15px;
      }
      > label {
        padding-right: 20px;
        width: 120px;
      }
    }
    .table-actions {
      position: absolute;
      right: 0px;
      top: 8px;
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
      button {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
/deep/.ivu-btn-info {
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}
/deep/.pageInfo.ivu-page {
  text-align: center;
  margin-top: 8px;
}
</style>
