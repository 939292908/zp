<template>
  <define-modal v-model="modal" title="串并关系" @on-close="cancel" @on-ok="ok" :showFooterButton="false">
    <div class="modal-content">
      <div class="search">
        <i-input
          class="search-input"
          size="large"
          v-model="textFilter"
          clearable
          placeholder="请搜索相关人员姓名"
          @keyup.enter.native="search"
          icon="ios-search"
        >
          <!-- <i-button class="search-btn" slot="append" icon="ios-search" @click.native="search"></i-button> -->
        </i-input>
      </div>
      <div class="table">
          <!-- :loading="loading" -->
        <i-table
          class="dialog-table"
          ref="userTable"
          stripe
          border
          :height="tableHeight"
          :columns="columns"
          :data="tableData"
        ></i-table>
        <loading size="small" bg-color="rgba(255,255,255,0.5)" v-model="loading"></loading>
      </div>
      <div class="dialog-table-page">
        <Page
          :total="total"
          size="small"
          :current="pageIndex"
          :page-size="pageSize"
          show-total
          show-elevator
          @on-change="handlePageChange"
        ></Page>
      </div>
    </div>
  </define-modal>
</template>
<script>
import DefineModal from "@/components/assembly/DefineModal";
import { transferParameters, hasQuery } from "@/tools/units.js";
import * as apis from "@/api/areaJoin/index.js";
import Loading from '@/components/assembly/Loading'
export default {
  name: "FilterRelations",
  components: {
    DefineModal,
    Loading
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selects: {
      type: [Object, Array],
      default() {
        return null;
      }
    },
    // 点击的连线的数据
    postData: {
      type: [Array],
      default: null
    }
  },
  data() {
    let me = this;
    return {
      modal: false, //模态框的显示
      textFilter: "",
      tableHeight: 300,
      data: [],
      resultData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      loading:true
    };
  },
  computed: {
    columns() {
      return [
        {
          title: "相关人员姓名",
          key: "name"
        },
        {
          title: this.postData.length > 0 ? this.postData[0].deptName : " ",
          key: "sourceDeptMap",
          render: (h, params) => {
            let row = params.row;
            return (
              <span>
                {row.sourceDeptMap.mapBaseMsgs.length > 1 ? (
                  <span>
                    <span class="map-item-title">
                      {row.sourceDeptMap.mapBaseMsgs[0].mapName}                    
                    </span>
                    <poptip class="map-item-poptip" popper-class="map-item-poptip-transfer" transfer word-wrap width="200">
                      <span class="more">
                        +
                        {row.sourceDeptMap.mapBaseMsgs.length -1}
                      </span>
                      <div slot="content">
                        <ul class="ivu-poptip-ul">
                          {
                            this._l(row.sourceDeptMap.mapBaseMsgs,(x)=>{
                              return (
                                <li>{x.mapName}</li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </poptip>
                  </span>
                ) : (
                  <span class="map-item-title">
                    {row.sourceDeptMap.mapBaseMsgs
                      .map(x => x.mapName)
                      .join(",")}
                  </span>
                )}
              </span>
            );
          }
        },
        {
          title: this.postData.length > 1 ? this.postData[1].deptName : " ",
          key: "targetDeptMap",
          render: (h, params) => {
            let row = params.row;
            return (
              <span>
                {row.targetDeptMap.mapBaseMsgs.length > 1 ? (
                  <span>
                    <span class="map-item-title">
                      {row.targetDeptMap.mapBaseMsgs[0].mapName}                    
                    </span>
                    <poptip class="map-item-poptip" popper-class="map-item-poptip-transfer" transfer word-wrap width="200">
                      <span class="more">
                        +
                        {row.targetDeptMap.mapBaseMsgs.length -1}
                      </span>
                      <div slot="content">
                        <ul class="ivu-poptip-ul">
                          {
                            this._l(row.targetDeptMap.mapBaseMsgs,(x)=>{
                              return (
                                <li>{x.mapName}</li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </poptip>
                  </span>
                ) : (
                  <span class="map-item-title">
                    {row.targetDeptMap.mapBaseMsgs
                      .map(x => x.mapName)
                      .join(",")}
                  </span>
                )}
              </span>
            );
          }
        },
        {
          title: "操作",
          width:'90px',
          render: (h, params) => {
            return (
              <i-button size="small" on-click={$event => this.handleShowClick(params.row)}>
                查看
              </i-button>
            );
          }
        }
      ];
    },
    tableData() {
      return this.data;
    }
  },
  methods: {
    /**
     * 查询用户列表
     * @author julie
     */
    search() {
      this.pageIndex = 1;
      this.getData();
    },
    /**
     * 获取用户列表数据
     * @author julie
     */
    getData() {
      let data = {
        keyword:this.textFilter,
        param:this.postData
      };
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      this.loading = true;
      apis.getCommonPersonMapList(data, params).then(res => {
        this.loading = false;
        if (res.code != 200) return;
        this.data = res.data.data;
        this.resultData = res.data.data;
        this.total = res.data.total;
      });
    },
    handlePageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getData();
    },
    handleShowClick(row) {
      let sourceMapCodes = row.sourceDeptMap.mapBaseMsgs.map(x=>x.mapCode)
      let targetMapCodes = row.targetDeptMap.mapBaseMsgs.map(x=>x.mapCode)
      let mapCodes= sourceMapCodes.concat(targetMapCodes).join();
      let params = mapCodes
      let path = '/join'
      transferParameters(this,path,params,null,'areaMapCodes')
    },
    // 取消关闭按钮事件
    cancel() {
      this.modal = false;
      this.$emit("input", this.modal);
    },
    // 点击确定按钮事件
    ok() {
      this.modal = false;
      this.$emit("input", this.modal);
    }
  },
  watch: {
    value: {
      handler(val) {
        this.modal = val;
        if (this.modal) {
          this.data = [];
          this.pageIndex = 1;
          this.resultData = [];
          this.total = 0;
          this.getData();
        }
      },
      immediate: true
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
    /deep/ .dialog-table{
      .ivu-table-body::-webkit-scrollbar{width:6px;height:6px;}
      .ivu-table-body::-webkit-scrollbar-track{border-radius:5px;background:none;}
      .ivu-table-body::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
      .ivu-table-body::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
      .ivu-table-body::-webkit-scrollbar-corner{background-color:#dadada;}
    }
  }
  .dialog-table-page {
    margin-top: 10px;
  }
  /deep/ .map-item-poptip{
    .map-item-title{
      cursor: pointer;
    }
    .ivu-poptip-rel{      
      .more{
        cursor: pointer;
        margin-left: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 1px 6px;
        background: rgba(221, 221, 221,0.5);
      }
      .iconfont{
        margin-left: 10px;
        cursor: pointer;
        color: #2698ed;
      }
    }
    
  }  
}
</style>
<style lang="less">
/deep/ .map-item-poptip-transfer{
  ul.ivu-poptip-ul{
    li{
      padding: 6px 0;
      cursor: pointer;
      list-style: square;
      margin-left: 15px;
      &:hover{
        color: #2698ed;
      }
    }
  }
  .ivu-poptip-inner{
    overflow-y: auto;
    max-height: 200px;
  }
}
</style>
