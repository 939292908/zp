<template>
  <Modal
    v-model="modal1"
    class="infoModal"
    width="80%"
    footer-hide
    :title="villageAllInfo.name+'村两委详情'"
    :mask-closable="false"
    @on-ok="ok"
    @on-cancel="closeModal"
  >
    <div class="information">
      <div class="actionTab">
        <div
          :class="tabIndex == index?'tab act':'tab'"
          v-for="(item,index) in tabList"
          :key="index"
          v-if="showTabList.indexOf(index)!=-1"
        >
          <span @click="actionDetail(index)">{{item.name}}</span>
          <i @click.stop="closeTab(index)" v-if="index != 0" class="iconfont icon-guanbi1"></i>
        </div>
      </div>
      <div class="actionContent">
        <div class="content" v-show="tabIndex == 0">
          <div class="summary">
            <h3>{{villageAllInfo.name}}村两委概述</h3>
            <div class="summaryContent">{{agencyIntro}}</div>
          </div>
          <div class="villageListInfo">
            <div class="partyBranch">村两委班子任职人员</div>
            <div class="addBtn" v-if="isAddcm">
              <Button size="small" class="multitapBtn" @click="addPartyBranch">
                <i class="iconfont icon-jiahao"></i>
                添加人员
              </Button>
            </div>
          </div>
          <Table :columns="columns1" :data="partyBranchList">
            <template slot-scope="{ row, index }" slot="action">
              <Button size="small" style="margin-right: 5px" @click="editInfo(row,index,'view')">查看</Button>
              <Button
                type="primary"
                v-if="isAddcm"
                size="small"
                style="margin-right: 5px"
                @click="editInfo(row,index,'edit')"
              >编辑</Button>
              <Button type="error" v-if="isAddcm" size="small" @click="deleteInfo(row,index)">删除</Button>
            </template>
          </Table>
          <Page
            class="pageInfo"
            :total="total"
            :page-size="pageSize"
            :current="pageIndex"
            show-total
            @on-change="pageInfo"
          />
        </div>

        <div class="content" v-show="tabIndex == 1">
          <add ref="add" :optionList="optionList" :tabIndex="tabIndex" :agencyId="agencyId"></add>
        </div>
        <div class="content" v-show="tabIndex == 2">
          <edit
            ref="edit"
            :optionList="optionList"
            :tabIndex="tabIndex"
            :agencyId="agencyId"
            :id="id"
            :editState="editState"
          ></edit>
        </div>
        <div class="bottom" v-show="tabIndex == 0">
          <Button @click="closeModal(index)">关闭</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import edit from "./cEditView";
import add from "./cAdd";
import * as apis from "@/api/collection/index.js";
export default {
  components: {
    edit,
    add
  },
  props: {
    villageAllInfo: {
      type: Object,
      default() {
        return null;
      }
    },
    optionList: {
      type: Object,
      default() {
        return null;
      }
    },
    isAddcm: {
      type: Boolean,
      default: false
    },
    agencyId: {
      type: String,
      default: ""
    }
  },
  watch: {
    villageAllInfo: {
      handler(val) {},
      immediate: true,
      deep: true
    },
    optionList: {
      handler(val) {},
      immediate: true,
      deep: true
    },
    isAddcm: {
      handler(val) {},
      immediate: true
    },
    agencyId: {
      handler(val) {
        if (val) {
          this.getPartyMosqueInfo();
        }
      },
      immediate: true
    }
  },
  data() {
    //这里存放数据
    return {
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      modal1: false,
      tabIndex: 0,
      showTabList: "0",
      editState: null, //编辑true或者查看false
      tabList: [
        { name: "村两委详情", val: "detail" },
        { name: "添加人员", val: "add" },
        { name: "编辑人员", val: "edit" }
      ],
      columns1: [
        {
          title: "序号",
          width: "90",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 170,
          align: "center"
        },
        {
          title: "民族",
          key: "nationality",
          align: "center"
        },
        {
          title: "户籍地",
          key: "domicile"
        },
        {
          title: "职位",
          key: "position",
          align: "center"
        },
        {
          title: "任职时间",
          key: "workStartTime",
          width: 85,
          align: "center",
          render(h, params) {
            let time = "";
            if (params.row.workStartTime) {
              time =
                params.row.workStartTime.length > 4
                  ? params.row.workStartTime.substring(0, 4) +
                    "-" +
                    params.row.workStartTime.substring(4, 6)
                  : params.row.workStartTime;
            }
            return h("p", {}, time);
          }
        },
        {
          title: "离任时间",
          key: "workEndTime",
          width: 85,
          align: "center",
          render(h, params) {
            let time = "在任";
            if (params.row.workEndTime) {
              time =
                params.row.workEndTime.length > 4
                  ? params.row.workEndTime.substring(0, 4) +
                    "-" +
                    params.row.workEndTime.substring(4, 6)
                  : params.row.workEndTime;
            }
            return h("p", {}, time);
          }
        },
        {
          title: "分管工作",
          key: "work"
        },
        {
          title: "操作",
          slot: "action",
          width: 190,
          align: "center"
        }
      ],
      partyBranchList: [],
      id: "",
      agencyIntro: ""
    };
  },
  mounted() {
    // 村两委台账信息
    this.init();
    // console.log(this.optionList);
  },
  //方法集合
  methods: {
    init() {
      var params = {
        villageCode: this.$route.query.areaCode,
        agencyId: this.agencyId,
        typeValue: "1",
        pageIndex: 1,
        pageSize: this.pageSize
      };
      this.mosquePageInfo(params);
    },
    // getInfo
    getPartyMosqueInfo() {
      const that = this;
      apis.getPartyMosqueInfo(that.agencyId).then(res => {
        if (res.code == 200) {
          console.log(res);
          that.agencyIntro = res.data.description;
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // pageInfo
    mosquePageInfo(params) {
      const that = this;
      apis.mosquePageInfo(params).then(res => {
        if (res.code == 200) {
          that.total = res.data.total;
          that.partyBranchList = res.data.data;
          // that.agencyIntro = res.data.data[0].agencyIntro;
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    addPartyBranch() {
      this.showTabList = this.showTabList + "1";
      this.tabIndex = 1;
      this.editState = true;
      this.id = "";
      this.$refs["add"].clearData();
    },
    // 点击tab
    actionDetail(index) {
      this.tabIndex = index;
    },
    // 关闭tab页
    closeTab(index) {
      this.showTabList = this.showTabList.split(index).join();
      if (index == 2) {
        if (this.showTabList.indexOf("1") != -1) {
          this.tabIndex = 1;
        } else {
          this.tabIndex = 0;
        }
        this.editState = null;
        this.id = "";
      } else {
        this.tabIndex = 0;
      }
      this.$refs["add"].clearData();
    },
    // 添加
    addInfo() {},
    // 编辑
    editInfo(row, index, state) {
      // str.replace(/1/g, "")
      if (state == "edit") {
        this.editState = true;
        this.tabList[2].name = "编辑人员";
      } else {
        this.editState = false;
        this.tabList[2].name = "查看人员";
      }
      this.tabIndex = 2;
      this.showTabList = this.showTabList + "2";
      // console.log(row);
      this.id = row.id;
    },
    // 删除
    deleteInfo(row, index) {
      const that = this;
      that.$Modal.confirm({
        title: "温馨提示",
        content: "是否删除" + row.name + "？",
        onOk() {
          apis.deletePartyInfo(row.id).then(res => {
            if (res.code === 200) {
              if (row.id == that.id) {
                that.closeTab(2);
              }
              that.init();
              that.$Message.success(row.name + "删除成功！");
            } else {
              that.$Message.error(res.msg);
            }
          });
        },
        onCancel() {}
      });
    },
    // 分页
    pageInfo(number) {
      var params = {
        villageCode: this.$route.query.areaCode,
        agencyId: this.agencyId,
        typeValue: "1",
        pageIndex: number,
        pageSize: this.pageSize
      };
      this.mosquePageInfo(params);
    },
    ok() {},
    closeModal() {
      if (this.showTabList.indexOf("1") != -1) {
        this.closeTab(1);
      } else if (this.showTabList.indexOf("1") != -1) {
        this.closeTab(2);
      }
      this.modal1 = false;
      this.showTabList = "0";
      this.tabIndex = 0;
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
/deep/.actionContent {
  border-left: 1px solid #e0e3e6;
  position: relative;
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    right: 0;
    padding: 10px 27px;
    text-align: right;
    background: #ffffff;
    z-index: 333;
    border-top: 1px solid #e0e3e6;
  }
  .content {
    padding: 25px 22px 30px;
    position: relative;
    overflow-y: auto;
    height: 700px;
    .summary {
      width: 50%;
      margin-bottom: 20px;
      h3 {
        font-size: 15px;
        color: #333333;
        font-weight: bold;
      }
      .summaryContent {
        width: 512px;
        height: auto;
        color: rgba(102, 102, 102, 1);
        font-size: 12px;
      }
    }
    .villageListInfo {
      margin-bottom: 20px;
      .partyBranch {
        height: 16px;
        color: #333333;
        font-size: 14px;
        text-align: left;
        float: left;
        font-weight: bold;
      }
      .addBtn {
        float: right;
        button {
          font-size: 13px;
          i {
            font-size: 14px;
          }
        }
      }
    }

    .summary::after,
    .villageListInfo::after,
    .pageInfo::after {
      content: ".";
      display: block;
      clear: both;
      height: 0;
      visibility: hidden;
    }
  }
}
/deep/.pageInfo {
  width: 100%;
  height: 36px;
  margin: 24px 0 40px;
  text-align: center;
  background: #ffffff;
}
</style>