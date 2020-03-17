<template>
  <Modal
    v-model="showModal"
    title="图谱自定义转接"
    :width="1194"
    :mask-closable="false"
    @on-cancel="cancel"
  >
    <div class="modal-body clearfix" :style="'max-height:'+maxHeight+'px'">
      <div class="modal-left">
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
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">
            <p>
              待转接图谱列表
              <i class="remark">（{{waitTpPagination.total}}）</i>
            </p>
            <Input
              search
              size="small"
              clearable
              enter-button="搜索"
              placeholder="请输入图谱关键字"
              v-model="keyword"
              @on-search="handleSearchTp"
              @on-change="handleClear"
            />
          </div>
          <div class="info-content">
            <Table
              stripe
              class="multitap-table"
              :height="360"
              :columns="columns1"
              :data="waitTpTable"
              @on-select="handleSelectTp"
              @on-select-all="handleSelectAllTp"
              @on-select-cancel="handleCancelTp"
              @on-select-all-cancel="handleCancelAllTp"
            ></Table>
            <div class="page">
              <Page
                :total="waitTpPagination.total"
                :current="waitTpPagination.pageIndex"
                :page-size="waitTpPagination.pageSize"
                show-total
                size="small"
                show-elevator
                @on-change="handleWaitTpPageChange"
              ></Page>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-right">
        <div class="info-box">
          <div class="info-title">
            <p>图谱接手人信息</p>
          </div>
          <div class="info-content">
            <Form
              ref="inheritorForm"
              :model="inheritorForm"
              :rules="inheritorRule"
              :label-width="80"
            >
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
                  @on-clear="handleInheritorDeptPath"
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
        <div class="info-box">
          <div class="info-title">
            <p>
              已选择转接图谱列表
              <i class="remark">（{{checkedTpPagination.total}}）</i>
            </p>
          </div>
          <div class="info-content">
            <Table
              stripe
              class="multitap-table"
              :height="360"
              :columns="columns2"
              :data="checkedTpTable"
            ></Table>
            <div class="page">
              <Page
                :total="checkedTpPagination.total"
                :current="checkedTpPagination.pageIndex"
                :page-size="checkedTpPagination.pageSize"
                size="small"
                show-total
                show-elevator
                @on-change="handleCheckedTpPageChange"
              ></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <p class="tpCount">
        本次共转接{{checkedTpPagination.total}}张图谱
        <i class="remark">（{{checkedTpTypeCount}}）</i>
      </p>
      <Button type="primary" @click="handleMultitap" :loading="loading">确定</Button>
      <Button @click="cancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import { removeByValue, hasQuery, uniqueArr } from "@/tools/units.js";
export default {
  name: "CustomMultitap",
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
      loading: false,
      keyword: "",
      maxHeight: 800,
      belongerForm: {
        belongDeptDisplayName: "", //单位名
        deptCode: "",
        deptPath: "",
        userName: "", //姓名
        Account: "", //警号
        phone: "" //联系方式
      },
      inheritorForm: {
        deptCode: "",
        deptPath: "",
        userName: "", //姓名
        Account: "", //警号
        phone: "" //联系方式
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
      columns1: [],
      columns2: [],
      waitTpDatas: [],
      resultData: [],
      checkedTpDatas: [],
      waitTpPagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      checkedTpPagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      belongerRule: {
        belongDeptDisplayName: [
          { required: true, message: "转接单位不能为空！", trigger: "change" }
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
      }
    };
  },
  computed: {
    waitTpTable() {
      let data = this.waitTpDatas.slice(
        (this.waitTpPagination.pageIndex - 1) * this.waitTpPagination.pageSize,
        this.waitTpPagination.pageIndex * this.waitTpPagination.pageSize
      );
      return data;
    },
    checkedTpTable() {
      let data = this.checkedTpDatas.slice(
        (this.checkedTpPagination.pageIndex - 1) *
          this.checkedTpPagination.pageSize,
        this.checkedTpPagination.pageIndex * this.checkedTpPagination.pageSize
      );
      return data;
    },
    checkedTpTypeCount() {
      let tps = [];
      this.checkedTpDatas.forEach(x => {
        tps.push(x.mapType);
      });
      var obj = tps.reduce(function(alltp, tp) {
        if (tp in alltp) {
          alltp[tp]++;
        } else {
          alltp[tp] = 1;
        }
        return alltp;
      }, {});
      let str = "";
      for (var key in obj) {
        str += key + obj[key] + "张、";
      }
      return str.slice(0, str.length - 1);
    }
  },
  mounted() {
    this.init();
  },
  beforeMount() {
    window.addEventListener("resize", e => this.resizeHandler(e));
  },
  methods: {
    resizeHandler(e) {
      this.maxHeight = e.target.innerHeight - 240;
    },
    init() {
      // Array.prototype.removeByValue = function(val) {
      //   for (var i = 0; i < this.length; i++) {
      //     if (JSON.stringify(this[i]).indexOf(JSON.stringify(val)) != -1) {
      //       this.splice(i, 1);
      //       break;
      //     }
      //   }
      // };
      this.setColumns();
    },
    setColumns() {
      let me = this;
      this.columns1 = [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("span", {
              domProps: {
                innerHTML: "序号"
              }
            });
          }
        },
        {
          title: "图谱名称",
          key: "mapName"
        },
        {
          title: "图谱类型",
          key: "mapType",
          width: 90,
          align: "center"
        },
        {
          title: "采集单位",
          key: "deptName"
        }
      ];
      this.columns2 = [
        {
          type: "index",
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("span", {
              domProps: {
                innerHTML: "序号"
              }
            });
          }
        },
        {
          title: "图谱名称",
          key: "mapName"
        },
        {
          title: "图谱类型",
          key: "mapType",
          width: 85,
          align: "center"
        },
        {
          title: "采集单位",
          key: "deptName"
        },
        {
          title: " ",
          width: 50,
          render(h, params) {
            return h("div", [
              h("Icon", {
                props: {
                  type: "md-close-circle"
                },
                style: {
                  color: "#ccc",
                  fontSize: "20px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    me.removeTp(params.row);
                  }
                }
              })
            ]);
          }
        }
      ];
    },
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
                this.$Notice.success({
                  title: "转接成功",
                  desc:
                    "本次共转接" +
                    this.checkedTpPagination.total +
                    "张图谱" +
                    "（" +
                    this.checkedTpTypeCount +
                    "）"
                });
                this.showModal = false;
                this.$emit("on-hide", this.showModal);
                this.resetForm();
                setTimeout(() => {
                  this.loading = true;
                  this.$parent.refreshData();
                  this.$nextTick(() => {
                    this.loading = false;
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
                this.loading = true;
                this.$nextTick(() => {
                  this.loading = false;
                });
              }, 500);
            });
        })
        .catch(error => {
          this.$Message.error("请完善人员信息！");
          setTimeout(() => {
            this.loading = true;
            this.$nextTick(() => {
              this.loading = false;
            });
          }, 500);
        });
    },
    multitap() {
      let data = {
        receivedUserId: this.inheritorForm.userId,
        receivedUserName: this.inheritorForm.userName,
        mapUserIdVMList: this.checkedTpDatas
      };
      var promise = new Promise(async (resolve, reject) => {
        apis.POST_CUSTOM_MULTITAP(data).then(res => {
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
    resetBelongerForm() {
      this.$refs["belongerForm"].resetFields();
      this.belongerForm = {};
      this.senderUserList = [];
      this.waitTpDatas = [];
      this.waitTpPagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    resetInheritorForm() {
      this.$refs["inheritorForm"].resetFields();
      this.inheritorForm = {};
      this.receivedUserList = [];
      this.checkedTpDatas = [];
      this.checkedTpPagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    resetForm() {
      this.resetBelongerForm();
      this.resetInheritorForm();
    },
    // 选择归属部门信息-归属人
    handleDeptSelectChangeSender(cur) {
      this.belongerForm.deptCode = cur.code;
      this.belongerForm.deptPath = cur.deptPath;
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
        this.resetBelongerForm();
      }
    },
    // 清空单位选择
    handleInheritorDeptPath(val) {
      if (val == "") {
        this.resetInheritorForm();
      }
    },
    // 分页Change事件
    handleWaitTpPageChange(index) {
      this.waitTpPagination.pageIndex = index;
    },
    handleCheckedTpPageChange(index) {
      this.checkedTpPagination.pageIndex = index;
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
        this.getWaitTpList(val);
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
    },
    // 选中待转接图谱
    handleSelectTp(selection, row) {
      this.waitTpDatas.forEach(x => {
        if (x.mapId == row.mapId) {
          x._checked = true;
        }
      });
      this.checkedTpDatas.unshift(row);
      // this.waitTpDatas.removeByValue(row);
      this.checkedTpPagination.total = this.checkedTpDatas.length;
      // this.waitTpPagination.total = this.waitTpDatas.length;
    },
    // 取消选中图谱
    handleCancelTp(selection, row) {
      delete row._checked;
      this.waitTpDatas.forEach(x => {
        if (x.mapId == row.mapId) {
          delete x._checked;
        }
      });
      removeByValue(this.checkedTpDatas, row);
      this.checkedTpPagination.total = this.checkedTpDatas.length;
    },
    // 全选按钮
    handleSelectAllTp(selection) {
      this.waitTpDatas.forEach(x => {
        selection.forEach(y => {
          if (x.mapId == y.mapId) {
            x._checked = true;
            x.index = this.waitTpPagination.pageIndex;
          }
        });
      });
      // this.checkedTpDatas = this.checkedTpDatas.concat(selection);
      // var obj = {};
      // this.checkedTpDatas = this.checkedTpDatas.reduce((item, next) => {
      //   obj[next.mapId] ? "" : (obj[next.mapId] = true && item.push(next));
      //   return item;
      // }, []);
      this.checkedTpDatas = uniqueArr(this.checkedTpDatas, selection, "mapId");

      // selection.forEach(x => {
      //   this.waitTpDatas.removeByValue(x);
      // });
      this.checkedTpPagination.total = this.checkedTpDatas.length;
      // this.waitTpPagination.total = this.waitTpDatas.length;
    },
    // 取消全选
    handleCancelAllTp() {
      this.waitTpDatas.forEach(x => {
        if (x.index == this.waitTpPagination.pageIndex) {
          delete x._checked;
          this.checkedTpDatas.forEach(y => {
            if (x.mapId == y.mapId) {
              removeByValue(this.checkedTpDatas, y);
            }
          });
        }
        this.checkedTpPagination.total = this.checkedTpDatas.length;
      });
    },
    // 请求待转接图谱列表数据
    getWaitTpList(val) {
      apis.GET_CUSTOM_MULTITAP_MAP_LIST(val).then(res => {
        if (res.code == 200) {
          this.waitTpDatas = res.data;
          this.resultData = res.data;
          this.waitTpPagination.total = res.data.length;
        }
      });
    },
    // 移除已选图谱
    removeTp(row) {
      // delete row._index;
      // delete row._rowKey;
      // removeByValue(this.checkedTpDatas, row);
      this.checkedTpDatas = this.checkedTpDatas.filter(x => {
        return x.mapId != row.mapId;
      });
      this.waitTpDatas.forEach(x => {
        if (x.mapId == row.mapId) {
          delete x._checked;
        }
      });
      this.resultData.forEach(x => {
        if (x.mapId == row.mapId) {
          delete x._checked;
        }
      });
      let arr = this.waitTpDatas;
      this.waitTpDatas = [];
      this.waitTpDatas = arr;
      this.checkedTpPagination.total = this.checkedTpDatas.length;
    },
    handleSearchTp() {
      let tmp = this.resultData;
      let mapTypeTmp = [];
      let mapNameTmp = [];
      let deptNameTmp = [];
      if (this.keyword) {
        mapTypeTmp = tmp.filter(x => {
          return hasQuery(x.mapType, this.keyword.trim());
        });
        mapNameTmp = tmp.filter(x => {
          return hasQuery(x.mapName, this.keyword.trim());
        });
        deptNameTmp = tmp.filter(x => {
          return hasQuery(x.deptName, this.keyword.trim());
        });
        mapTypeTmp = uniqueArr(mapTypeTmp, mapNameTmp, "mapId");
        mapTypeTmp = uniqueArr(mapTypeTmp, deptNameTmp, "mapId");
        tmp = mapTypeTmp;
      }
      this.waitTpDatas = tmp;
      this.waitTpPagination.total = this.waitTpDatas.length;
      this.waitTpPagination.pageIndex = 1;
    },
    handleClear() {
      if (this.keyword == "") {
        let tmp = this.resultData;
        this.waitTpDatas = tmp;
        this.waitTpPagination.total = this.waitTpDatas.length;
        this.waitTpPagination.pageIndex = 1;
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
/deep/.ivu-modal {
  top: 10%;
}
.modal-body {
  // display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  .modal-left {
    // flex: 1;
    float: left;
    width: calc(50% - 1px);
    border-right: 1px solid #e0e3e6;
  }
  .modal-right {
    // flex: 1;
    float: right;
    width: 50%;
  }
  .info-box {
    border-bottom: 1px solid #e0e3e6;
    padding: 16px;
    .info-title {
      position: relative;
      p {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      /deep/.ivu-input-group {
        width: 240px;
        position: absolute;
        right: 0;
        top: 0;
      }
      /deep/i.ivu-icon.ivu-icon-ios-close-circle.ivu-input-icon.ivu-input-icon-clear.ivu-input-icon-normal {
        right: 49px;
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
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
        .tps {
          font-size: 14px;
          text-align: center;
          .tpType {
            width: 26px;
            height: 26px;
            color: #fff;
            border-radius: 3px;

            line-height: 26px;
          }
        }
      }
    }
  }

  .page {
    margin-top: 10px;
  }
}
i.remark {
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
}
.tpCount {
  float: left;
  font-size: 14px;
}
/deep/.ivu-table table {
  width: 100% !important;
}
/deep/.ivu-table th {
  width: 100%;
}
</style>
