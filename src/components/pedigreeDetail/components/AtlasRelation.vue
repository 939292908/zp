<template>
  <!-- :height="tableHeight" -->
  <i-table
    class="relevant-table"
    ref="relevantmap"
    :loading="loading"
    stripe
    border
    :height="tableHeight"
    :columns="columns"
    :data="tableData"
  ></i-table>
</template>
<script>
import * as comApis from "@/api/common.js";
export default {
  computed: {
    tableHeight() {
      return this.tableData.length > 7 ? 374 : "";
    }
  },
  data() {
    return {
      tableData: [
        // {mapName:'名称1'},
        // {mapName:'名称2'},
        // {mapName:'名称3'},
      ],
      columns: [
        {
          title: "图谱类型",
          key: "mapType",
          width: 85,
          render: (h, params) => {
            return h("div",
              {
                style: {
                  textAlign: "center",
                  // background: "red"
                }
              },
                params.row.mapType
            )
          }
        },
        {
          title: "图谱名称",
          key: "mapName",
          width: 360,
          render: (h, params) => {
            let row = params.row;    
            let opt = [              
              h(
                "div",
                {
                  style: {
                    cursor: "default",
                    border: "1px solid blue",
                    color: "blue",
                    borderRadius: "2px",
                    padding: "0 4px",
                    minWidth: "70px",
                    textAlign: "center",
                    float: "right",
                    marginLeft: "4px",
                    display: row.compose ? "block" : "none"
                  }
                },
                "构成该图谱"
              ),
              h(
                "div",
                {
                  style: {
                    cursor: "default",
                    float: "right",
                    border: "1px solid red",
                    color: "red",
                    borderRadius: "2px",
                    padding: "0 4px",
                    minWidth: "70px",
                    textAlign: "center",
                    float: "right",
                    marginLeft: "4px",
                    display: row.marriage ? "block" : "none"
                  }
                },
                "姻亲"
              ),
              h(
                "div",
                {
                  attrs: {
                    title: row.mapName
                  },
                  style: {
                    color: row.dataAuthRight ? '#515a6e' : '#959191',
                    cursor: "pointer",
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    wordBreak: 'break-all',
                  },
                  on: {
                    click: () => {
                      if(row.dataAuthRight) this.handleDetailClick(row);
                    }
                  }
                },
                row.mapName
              )
            ]
            if(!row.dataAuthRight){
              let ele = h(
                "icon",
                {
                  class: 'iconfont icon-suoding',
                  style: {
                    marginRight: "4px",
                    float: "left",
                    color: '#ccc'
                  }
                }
              )
              opt.splice(0,0,ele)
            }     
            return h("div", opt);
            // return (
            //   <div>
            //     <div class="mapName" on-click={$event => this.handleDetailClick(row)}>
            //       {row.mapName}
            //     </div>
            //     <div class="mapLabel">构成该图谱</div>
            //   </div>
            // );
          }
        },
        {
          title: "涉及人数",
          key: "mapPersonCount",
          sortable: true,
          width: 110,
          render: (h, params) => {
            return h("div",
              {
                style: {
                  textAlign: "center"
                }
              },
                params.row.mapPersonCount
            )
          }
        },
        {
          title: "涉及本宗族成员人数",
          key: "relevantPersonCount",
          sortable: true,
          width: 165,
           render: (h, params) => {
            return h("div",
              {
                style: {
                  textAlign: "center"
                }
              },
                params.row.relevantPersonCount
            )
          }
        },
        {
          title: "涉及本宗族成员姓名",
          key: "personInfo",
          render: (h, params) => {
            let row = params.row;
            return (
              <div class="personInfo">
                <ul>
                  {this._l(row.personInfo, x => {
                    return (
                      <li
                        title={x.name}
                        class="nameList one-row-text"
                        on-click={$event => this.handlePersonClick(row)}
                      >
                        {x.name}
                      </li>
                      // <span on-click={$event => this.handlePersonClick(row)}>{x.name}</span>
                    );
                  })}
                </ul>
              </div>
            );
          }
        }
      ],
      loading: false
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    // 路由跳转到对应图谱
    handleDetailClick(row) {
      let routeData = this.$router.resolve({
        name: "ArchivesJoin",
        query: {
          tpids: row.mapId,
          rid: row.mapCode,
          mc: "谱系档案",
          pageName: "图形展示"
        }
      });
      window.open(routeData.href, "_blank");
    },
    handlePersonClick(row) {},
    getData() {
      this.loading = true;
      comApis.getRelevantmap(this.$route.query.archiveId).then(res => {
        this.loading = false;
        if (res.code != 200) return;
        this.tableData = res.data;
        this.$emit("getAatlasRelationNum", this.tableData.length);
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .personInfo {
  .nameList {
    display: inline-block;
    padding: 2px 6px;
    width: 20%;
    float: left;
    cursor: pointer;
    &::before {
      content: "";
      display: block;
      float: left;
      width: 5px;
      height: 5px;
      background-color: #000;
      margin: 0.6em 0.4em 0 0;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  .one-row-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
/deep/ .mapName {
  cursor: pointer;
  float: left;
  &:hover {
    text-decoration: underline;
  }
}
/deep/ .mapLabel {
  cursor: default;
  float: right;
  border: 1px solid red;
  color: red;
  border-radius: 2px;
  padding: 0 4px;
}
</style>
