<template>
  <define-modal
    v-model="visible"
    title="关联图谱信息"
    width="840"
    @on-close="cancel"
    @on-ok="ok"
    :showFooterButton="false"
  >
    <div class="modal-content">
      <div class="table">
        <i-table
          class="dialog-table"
          ref="mapTables"
          stripe
          border
          :height="tableHeight"
          :columns="columns"
          :data="tableData"
        >
          <!-- 本人的身份 slot -->
          <template slot="displayName" slot-scope="{ row, index }">
            <Tooltip
              v-for="(item, index) in row.children" :key="index" 
              max-width="330"
              :content="item.displayName"
              theme="light"
              :class="{hiddenTooltip : item.displayName ==null}"
            >
              <div class="sub-item">
                <!-- <div class="ivu-table-cell-tooltip-content">{{item.displayName}}</div> -->
                <div class="ivu-table-cell-tooltip-content"><div class="text-cut">{{item.displayName}}</div></div>
              </div>
            </Tooltip>
          </template>
        </i-table>
        <loading size="small" bg-color="rgba(255,255,255,0.5)" v-model="loading"></loading>
      </div>
    </div>
  </define-modal>
</template>
<script>
import DefineModal from "@/components/assembly/DefineModal";
// import { hasQuery } from "../../../tools/units.js";
import { GET_RELATION_MAP_INFO } from "@/api/common.js";
import Loading from "@/components/assembly/Loading";
export default {
  name: "FilterCondition",
  components: {
    DefineModal,
    Loading
  },
  props: {
    value: Boolean,
    params: {
      type: Array | Object,
      default() {
        return null;
      }
    },
    metaTitle: {
      type: String,
      default: "智能搜索"
    },
    isShowOption: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: null,
      textFilter: "",
      tableHeight: 400,
      data: [],
      resultData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      loading: true
    };
  },
  computed: {
    columns_backup() {
      let me = this;
      let columns = [
        {
          title: "图谱名称",
          key: "mapName",
          width: "200px",
          render: (h, params) => {
            let data = params.row;
            let tmpList = me.params.tps.filter(x => {
              return x.mapId == data.mapId;
            });
            let tmpMap = tmpList.length > 0 ? tmpList[0] : null;
            if (tmpMap && tmpMap.dataRight) {
              return (
                <span
                  class="map-name"
                  on-click={$event => this.handleShowClick(params.row)}
                >
                  {params.row.mapName}
                </span>
              );
            } else {
              return (
                <span class="map-name-noauth" style="color:#ccc;">
                  <i class="lock-icon iconfont icon-suoding"></i>
                  {params.row.mapName}
                </span>
              );
            }
          }
        },
        {
          title: "根节点",
          key: "rootName",
          width: "170px",
          render: (h, params) => {
            return (
              <div>
                <div>{params.row.rootName}</div>
                <div>{params.row.rootIdNumber}</div>
              </div>
            );
          }
        },
        {
          title: "重复出现/总人数",
          key: "repeatedCount",
          width: "130px",
          render: (h, params) => {
            return (
              <span>{params.row.repeatedCount + " / " + params.row.count}</span>
            );
          }
        },
        {
          title: "本人的身份",
          key: "displayName",
          // slot: "displayName",
        },
        {
          title: "子节点数",
          key: "childCount",
          width: "90px"
        }
      ];
      if (this.isShowOption) {
        columns.push({
          title: "操作",
          width: "100px",
          render: (h, params) => {
            let data = params.row;
            let tmpList = me.params.tps.filter(x => {
              let tpid = x.tpid.replace("#", "i").replace(":", "_");
              return me.params.parentTpid == tpid;
            });
            let mapId = tmpList.length > 0 ? tmpList[0].mapId : "";
            if (mapId == data.mapId) {
              //如果要叠加的图谱跟当前图谱一致，禁止点击
              return (
                <div>
                  <span class="map-button stack no-auth-button">叠</span>
                  <span class="map-button marriage no-auth-button">姻</span>
                </div>
              );
            } else {
              let redList = ["配偶", "妻子", "前配偶", "前妻", "丈夫", "前夫"];
              if (data.displayName && redList.indexOf(data.displayName) == -1) {
                return (
                  <div>
                    <span
                      on-click={$event => this.handleStackClick(params.row)}
                      class="map-button stack"
                    >
                      叠
                    </span>
                    <span class="map-button marriage no-auth-button">姻</span>
                  </div>
                );
              } else {
                return (
                  <div>
                    <span
                      on-click={$event => this.handleStackClick(params.row)}
                      class="map-button stack"
                    >
                      叠
                    </span>
                    <span
                      on-click={$event => this.handleMarriageClick(params.row)}
                      class="map-button marriage"
                    >
                      姻
                    </span>
                  </div>
                );
              }
            }
          }
        });
      }
      return columns;
    },
    columns() {
      let me = this;
      let columns = [
        {
          title: "图谱名称",
          key: "idNumber",
          className: "sub-column",
          width: "200px",
          render: (h, params) => {
            let data = params.row;
            return (
              <div class="mapNameList sub-item">
                {this._l(data.children, item => {
                  let tmpList = me.params.tps.filter(x => {
                    return x.mapId == item.mapId;
                  });
                  let tmpMap = tmpList.length > 0 ? tmpList[0] : null;
                  if (tmpMap && tmpMap.dataRight) {
                    return (
                      <div
                        class="map-name"
                        on-click={$event => this.handleShowClick(item)}
                      >
                        {item.mapName}
                      </div>
                    );
                  } else {
                    return (
                      <div class="map-name-noauth" style="color:#ccc;">
                        <i class="lock-icon iconfont icon-suoding"></i>
                        {item.mapName}
                      </div>
                    );
                  }
                })}
              </div>
            );
          }
        },
        {
          title: "根节点",
          key: "idNumberName",
          width: "170px",
          render: (h, params) => {
            let data = params.row;
            return (
              <div>
                <div>{data.idNumberName}</div>
                <div>{data.idNumber}</div>
              </div>
            );
          }
        },
        {
          title: "重复出现/总人数",
          key: "idNumber",
          width: "130px",
          className: "sub-column",
          render: (h, params) => {
            let data = params.row;
            return (
              <div class="repeatedCountList sub-item">
                {this._l(data.children, item => {
                  return <div>{item.repeatedCount + " / " + item.count}</div>;
                })}
              </div>
            );
          }
        },
        {
          title: "本人的身份",
          // key: "idNumber",
          slot: "displayName",
          className: "sub-column",
          // render: (h, params) => {
          //   let data = params.row;
          //   return (
          //     <div class="displayNameList sub-item">
          //       {this._l(data.children, item => {
          //         return <div>{item.displayName}</div>;
          //       })}
          //     </div>
          //   );
          // }
        },
        {
          title: "子节点数",
          key: "idNumber",
          className: "sub-column",
          width: "90px",
          render: (h, params) => {
            let data = params.row;
            return (
              <div class="childCountList sub-item">
                {this._l(data.children, item => {
                  return <div>{item.childCount}</div>;
                })}
              </div>
            );
          }
        }
      ];
      if (this.isShowOption) {
        columns.push({
          title: "操作",
          className: "sub-column",
          width: "100px",
          render: (h, params) => {
            let data = params.row;
            return (
              <div class="operationList sub-item">
                {this._l(data.children, item => {
                  let tmpList = me.params.tps.filter(x => {
                    let tpid = x.tpid.replace("#", "i").replace(":", "_");
                    return me.params.parentTpid == tpid;
                  });
                  let mapId = tmpList.length > 0 ? tmpList[0].mapId : "";
                  if (mapId == item.mapId) {
                    //如果要叠加的图谱跟当前图谱一致，禁止点击
                    return (
                      <div>
                        <span class="map-button stack no-auth-button">叠</span>
                        <span class="map-button marriage no-auth-button">
                          姻
                        </span>
                      </div>
                    );
                  } else {
                    let redList = [
                      "配偶",
                      "妻子",
                      "前配偶",
                      "前妻",
                      "丈夫",
                      "前夫"
                    ];
                    if (
                      item.displayName &&
                      redList.indexOf(item.displayName) == -1
                    ) {
                      return (
                        <div>
                          <span
                            on-click={$event => this.handleStackClick(item)}
                            class="map-button stack"
                          >
                            叠
                          </span>
                          <span class="map-button marriage no-auth-button">
                            姻
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <span
                            on-click={$event => this.handleStackClick(item)}
                            class="map-button stack"
                          >
                            叠
                          </span>
                          <span
                            on-click={$event => this.handleMarriageClick(item)}
                            class="map-button marriage"
                          >
                            姻
                          </span>
                        </div>
                      );
                    }
                  }
                })}
              </div>
            );
          }
        });
      }
      return columns;
    },
    tableData() {
      // 根据身份证进行数据分组
      let idNumberList = [];
      this.data.forEach(x => {
        if (idNumberList.indexOf(x.rootIdNumber) == -1) {
          idNumberList.push(x.rootIdNumber);
        }
      });
      let resultList = [];
      idNumberList.forEach(id => {
        let item = {};
        let itemList = this.data.filter(x => x.rootIdNumber == id);
        item.idNumber = id;
        item.idNumberName = itemList.length > 0 ? itemList[0].rootName : "";
        item.children = itemList;
        resultList.push(item);
      });
      return resultList;
      // return this.data;
    }
  },
  methods: {
    // 查询事件
    handleSearch() {
      this.pageIndex = 1;
      this.getData();
    },
    // 点击查看按钮事件
    handleShowClick(data) {
      let me = this;
      if (data.mapType == "8") {
        const { href } = me.$router.resolve({
          path: "/exitAndEntry",
          query: {
            areaCode: data.villageCode,
            collectId: data.collectId,
            state: 1
          }
        });
        window.open(href, "_blank");
      } else if (data.mapType == "9") {
        const { href } = me.$router.resolve({
          path: "/underAttack",
          query: {
            areaCode: data.villageCode,
            collectId: data.collectId,
            state: 1
          }
        });
        window.open(href, "_blank");
      } else {
        let tmpList = me.params.tps.filter(x => {
          return x.mapId == data.mapId;
        });
        let tpid = tmpList.length > 0 ? tmpList[0].tpid : "";
        let passiveID = me.params.parentTpid
          ? me.params.parentTpid.replace("i", "#").replace("_", ":")
          : "";
        const { href } = me.$router.resolve({
          name: "ArchivesJoin",
          query: {
            tpids: tpid,
            rid: "",
            sfzhm: me.params.sfzhm,
            passiveID: passiveID,
            mc: me.metaTitle,
            pageName: ""
          }
        });
        window.open(href, "_blank");
      }
    },
    // 叠加
    handleStackClick(data) {
      let tmpList = this.params.tps.filter(x => {
        return x.mapId == data.mapId;
      });
      let param = {
        tpid: tmpList.length > 0 ? tmpList[0].tpid : "",
        tpms: data.mapName,
        color: this.params.color,
        name: this.params.name,
        relationName: this.params.relationName,
        type: this.params.type,
        oid: this.params.oid,
        parentTpid: this.params.parentTpid
      };
      this.$emit("on-stack", param, data);
      this.$parent.stackFn && this.$parent.stackFn(param, data);
      this.cancel();
    },
    // 姻亲
    handleMarriageClick(data) {
      let tmpList = this.params.tps.filter(x => {
        return x.mapId == data.mapId;
      });
      let param = {
        tpid: tmpList.length > 0 ? tmpList[0].tpid : "",
        tpms: data.mapName,
        color: this.params.color,
        name: this.params.name,
        relationName: this.params.relationName,
        type: this.params.type,
        oid: this.params.oid,
        parentTpid: this.params.parentTpid
      };
      this.$emit("on-marriage", param, data);
      this.$parent.marriageFn && this.$parent.marriageFn(param, data);
      this.cancel();
    },
    handlePageChange() {
      this.pageIndex = pageIndex;
      this.getData();
    },
    getData() {
      let params = this.params;
      let relevantMapIds = params.tps.map(x => {
        return x.mapId;
      });
      let data = {
        idNumber: params.sfzhm,
        mapId: params.mapId,
        relevantMapIds: relevantMapIds
      };
      this.loading = true;
      GET_RELATION_MAP_INFO(data).then(res => {
        this.loading = false;
        if (res.code != 200) return;
        this.data = res.data;
        this.resultData = res.data;
        this.total = res.data.length;
      });
    },
    // 取消关闭按钮事件
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
    },
    // 点击确定按钮事件
    ok() {
      this.visible = false;
      this.$emit("input", this.visible);
    }
  },
  watch: {
    value: {
      handler(val) {
        this.visible = val;
      },
      immediate: true
    },
    params: {
      handler(val) {
        if (this.value && val) {
          this.getData();
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  .search {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
    .search-input {
      width: 400px;
    }
  }
  .table {
    padding: 0 2px;
    /deep/ .dialog-table {
      .sub-item > div {
        min-width: 0;
        height: 48px;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #e8eaec;
        display: flex;
        align-items: center;
        padding-left: 18px;
        padding-right: 18px;
      }
      .text-cut {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
      }
      td.sub-column {
        .ivu-tooltip {
          width: 100%;
        }
        .ivu-table-cell {
          padding-left: 0;
          padding-right: 0;
        }
      }
      .map-name {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .map-name-noauth {
        cursor: pointer;
      }
      .map-button {
        width: 25px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        border-radius: 3px;
        color: #fff;
        background: #4298c7;
        margin: 5px 5px 0 0;
        display: inline-block;
        cursor: default;
      }
      .no-auth-button {
        background: rgb(204, 204, 204);
      }
      .ivu-table-body::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .ivu-table-body::-webkit-scrollbar-track {
        border-radius: 5px;
        background: none;
      }
      .ivu-table-body::-webkit-scrollbar-thumb {
        background-color: rgba(32, 76, 157, 1);
        border-radius: 5px;
      }
      .ivu-table-body::-webkit-scrollbar-thumb:hover {
        background-color: rgba(45, 183, 245, 1);
      }
      .ivu-table-body::-webkit-scrollbar-corner {
        background-color: #dadada;
      }
    }
  }
  .dialog-table-page {
    margin-top: 10px;
  }
  /deep/ .map-item-poptip {
    .map-item-title {
      cursor: pointer;
    }
    .ivu-poptip-rel {
      .more {
        cursor: pointer;
        margin-left: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 1px 6px;
        background: rgba(221, 221, 221, 0.5);
      }
      .iconfont {
        margin-left: 10px;
        cursor: pointer;
        color: #2698ed;
      }
    }
    ul {
      li {
        padding: 6px 0;
        cursor: pointer;
        &:hover {
          color: #2698ed;
        }
      }
    }
    .ivu-poptip-inner {
      overflow-y: auto;
      height: 200px;
    }
  }
}
</style>