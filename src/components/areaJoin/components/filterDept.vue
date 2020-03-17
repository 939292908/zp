<template>
  <define-modal
    v-model="modal"
    title="区域选择"
    @on-close="cancel"
    @on-ok="ok"
    :before-close="handleBeforeClose"
  >
    <div class="modal-content">
      <div class="item left">
        <div class="title">{{selects ? selects.name : ''}}区域:</div>
        <div class="box">
          <div class="box-con">
            <div class="search">
              <Input clearable v-model="filterTreeValue" suffix="ios-search" placeholder="请输入关键词" />
            </div>
            <div class="tree-data">
              <Tree class="filter-map-dept" :data="resultDeptList" :render="renderContent"></Tree>
              <!-- <Spin size="large" v-if="loading"></Spin> -->
              <loading size="small" :mask-closable="false" v-model="loading"></loading>
            </div>
          </div>
        </div>
      </div>
      <div class="item right">
        <div class="title">已选区域:</div>
        <div class="box">
          <div class="box-con">
            <div class="search">
              <Input clearable v-model="filterCheckValue" suffix="ios-search" placeholder="请输入关键词" />
            </div>
            <div class="tree-data">
              <div class="list" :key="index" v-for="(item,index) in filterCheckList">
                <div class="list-item">
                  <span>{{item.title}}</span>
                  <div class="tags">
                    <div
                      :style="{'background': tag.selected ? $config.topTagColors[tag.mapLabel] : '#ccc'}"
                      :key="tagIndex"
                      v-for="(tag,tagIndex) in item.tagsList"
                      @click="handleTagClick(tag,tagIndex,item)"
                    >{{tag.mapLabel}}</div>
                  </div>
                </div>
                <i @click="handleRemove(item)" class="iconfont icon-guanbi2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </define-modal>
</template>
<script>
import DefineModal from "@/components/assembly/DefineModal";
import { hasQuery } from "../../../tools/units.js";
import * as comApis from "@/api/common.js";
import * as searchApis from "@/api/search/index.js";
import * as apis from "@/api/mapJoin/index.js";
import Loading from "@/components/assembly/Loading";
export default {
  name: "FilterDept",
  components: {
    DefineModal,
    Loading
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    regions: {
      //当前选择的区域的对象
      type: [Object, Array, String],
      default() {
        return null;
      }
    },
    selects: {
      type: [Object, Array],
      default() {
        return null;
      }
    },
    showType: {
      type: Number,
      default: 1 // 1:代表选择地图显示，2：代表显示全部的单位列表
    }
  },
  data() {
    return {
      modal: false, //模态框的显示
      deptList: [],
      deptArrayList: [],
      deprSearchResult: [],
      checkList: [],
      filterTreeValue: "",
      filterCheckValue: "",
      loading: true
    };
  },
  computed: {
    filterCheckList() {
      return this.checkList.filter(x => {
        return hasQuery(x.title, this.filterCheckValue);
      });
    },
    resultDeptList() {
      if (this.filterTreeValue) {
        this.deprSearchResult = [];
        this.filterMethod(this.deptList, this.deprSearchResult);
        return this.deprSearchResult;
      } else {
        return this.deptList;
      }
    },
    tagsList() {
      let list = this.$parent.$parent.tagsList;
      if (list) {
        list.forEach(x => {
          x.selected = true;
        });
        return list;
      } else {
        return [];
      }
    }
  },
  methods: {
    /**
     * 获取部门树的数据
     */
    getDeptData() {
      console.log(
        "$parent.$parent.tagsList",
        this.$parent.$parent.tagsList,
        this.$parent.tagsList
      );
      this.deptList = [];
      this.deptArrayList = [];
      this.deprSearchResult = [];
      if (this.showType == 1) {
        this.loading = true;
        comApis
          .getQueryCountyTreeByQHCode(this.regions.qhDeptCode)
          .then(response => {
            this.loading = false;
            if (response.code == 200) {
              this.deptList = response.data;
              this.treeTransArray(response.data, "children");
            }
          });
      } else if (this.showType == 2) {
        this.loading = true;
        comApis.getDeptTree().then(response => {
          this.loading = false;
          if (response.code == 200) {
            this.deptList = response.data;
            this.treeTransArray(response.data, "children");
          }
        });
      }
    },
    /**
     * 单位树模糊查询
     * @function search
     * @author erbing
     */
    filterMethod(data, result) {
      data.forEach(item => {
        // 如果该数组title字段匹配搜索字段，添加该数组，此时children为空
        var temp = {};
        if (item.title.indexOf(this.filterSearch.filterDept) !== -1) {
          temp = {
            expand: item.expand,
            id: item.id,
            leaves: item.leaves,
            nodeKey: item.nodeKey,
            title: item.title,
            children: []
          };
          result.push(temp);
        }
        // 如果该数组有子集，递归子集children
        if (item.children) {
          if (temp.children) {
            this.filterMethod(item.children, temp.children);
          } else {
            this.filterMethod(item.children, result);
          }
        }
      });
    },
    // 将树形结构的数据转化成一维数组
    treeTransArray(tree, key) {
      return tree.reduce((con, item) => {
        con.push(item);
        if (item[key] && item[key].length > 0)
          this.treeTransArray(item[key], key);
        return con;
      }, this.deptArrayList);
    },
    handleTagClick(tag, tagIndex, item) {
      this.$set(tag, "selected", !tag.selected);
      this.checkList.push.apply(this.checkList, []);
    },
    // 移除选项
    handleRemove(data) {
      this.checkList = this.checkList.filter(x => {
        return x.id != data.id;
      });
      this.$emit("on-item-change", this.checkList);
    },
    // 点击树节点时触发
    handleSelectChange(event, root, node, data) {
      data.expand = !data.expand;
    },
    // 添加选项
    handleAddClick(event, root, node, data) {
      let flag = this.checkList.some(x => {
        return x.id == data.id;
      });
      if (flag) {
        this.checkList = this.checkList.filter(x => {
          return x.id != data.id;
        });
      } else {
        data.tagsList = JSON.parse(JSON.stringify(this.tagsList));
        this.checkList.push(data);
      }
      this.$emit("on-item-change", this.checkList);
    },
    // 渲染内容
    renderContent(h, { root, node, data }) {
      return (
        <span class="tree-item">
          <span
            data={data.id}
            title={data.title}
            class="tree-item-text"
            on-click={$event =>
              this.handleSelectChange($event, root, node, data)
            }
          >
            {data.title}
          </span>
          {this.checkList.some(x => x.id == data.id) ? (
            <i
              data={data.id}
              class={"tree-item-icon iconfont icon-xuanzhong selected"}
              on-click={$event => this.handleRemove(data)}
            ></i>
          ) : (
            <i
              data={data.id}
              class={"tree-item-icon iconfont icon-tianjia"}
              on-click={$event => this.handleAddClick($event, root, node, data)}
            ></i>
          )}
        </span>
      );
    },
    /**
     * 单位树模糊查询
     * @function search
     * @author erbing
     */
    filterMethod(data, result) {
      data.forEach(item => {
        // 如果该数组title字段匹配搜索字段，添加该数组，此时children为空
        var temp = {};
        if (item.title.indexOf(this.filterTreeValue) !== -1) {
          temp = {
            expand: item.expand,
            id: item.id,
            leaves: item.leaves,
            nodeKey: item.nodeKey,
            title: item.title,
            children: []
          };
          result.push(temp);
        }
        // 如果该数组有子集，递归子集children
        if (item.children) {
          if (temp.children) {
            this.filterMethod(item.children, temp.children);
          } else {
            this.filterMethod(item.children, result);
          }
        }
      });
    },
    // 取消关闭按钮事件
    cancel() {
      this.modal = false;
      this.$emit("input", this.modal);
      this.$emit("on-cancel", this.checkList);
    },
    handleBeforeClose() {
      if (this.checkList.length <= 1) {
        this.$Message.error("请至少选择两个单位");
        return false;
      }
      return true;
    },
    // 点击确定按钮事件
    ok() {
      this.modal = false;
      this.$emit("input", this.modal);
      this.$emit("on-ok", this.checkList);
    },
    // 更新已经选择的数据
    updateSelectList() {
      let data = this.$parent.$parent.hydraCircle.getData()
      let nodes = data.nodes
      this.checkList.forEach(x=>{
        let itemNode = nodes.find(n=>{
          return n.id == x.id
        })
        if(itemNode) {
          let nodeTags = itemNode.tags
          let tagsList = x.tagsList.forEach(tag => {
            let nodeTag = nodeTags.find(t=>{
              return t.mapType == tag.mapType
            })
            if(nodeTag) {
              tag.selected = !nodeTag.disabled
            }
          })
        }
      })
    }
  },
  watch: {
    value: {
      handler(val) {
        this.modal = val;
        if (this.modal && this.regions == null) {
          this.getDeptData();
        }
        if(this.modal) {
          this.updateSelectList()
        }
      },
      immediate: true
    },
    regions: {
      handler(val, oldVal) {
        if (val != oldVal || val == null) {
          this.getDeptData();
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.modal-content {
  display: flex;
  height: 100%;
  .item {
    .title {
      padding: 10px 0px;
      font-size: 14px;
    }
    .box {
      border: 1px solid rgba(54, 142, 204, 1);
      height: calc(100% - 42px);
      width: 100%;
      .box-con {
        background: rgba(126, 159, 209, 1);
        height: 100%;
        padding: 6px;
        width: 100%;
        .search {
          padding-bottom: 5px;
          /deep/ .ivu-input {
            background: rgba(211, 224, 244, 0.4);
            border: 1px solid rgba(95, 117, 173, 1);
          }
          /deep/ .ivu-input::placeholder {
            color: #5970ab;
          }
        }
        .tree-data {
          height: calc(100% - 39px);
          overflow: auto;
          position: relative;
          .list {
            border-bottom: 1px solid rgba(25, 56, 100, 0.1);
            padding: 6px 12px 6px 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            span {
              color: #3b5694;
              display: inline-block;
            }
            .tags {
              div {
                display: inline-block;
                color: #fff;
                margin: 1px 2px;
                border-radius: 2px;
                font-size: 12px;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                cursor: pointer;
              }
            }
          }
          /deep/ .ivu-spin {
            position: absolute;
            top: 90px;
            left: 50%;
          }
        }
      }
    }
  }
  .left {
    padding-right: 20px;
    width: 400px;
    height: 100%;
    .tree-data {
      width: 372px;
    }
  }
  .right {
    width: 300px;
    height: 100%;
  }
}
</style>
<style lang="less">
.filter-map-dept {
  .ivu-tree-arrow {
    font-size: 14x;
    i {
      margin-top: -14px;
    }
  }
  .tree-item {
    font-size: 14px;
    // display: inline-block;
    cursor: pointer;
    .tree-item-text {
      color: #3b5694;
      display: inline-block;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tree-item-icon {
      float: right;
      margin-right: 12px;
    }
    .tree-item-icon.selected {
      color: #3b5694;
      // font-size: 22px;
      // margin-right: 10px;
    }
  }
  .ivu-tree-children {
    > li {
      .tree-item-text {
        width: calc(100% - 50px);
      }
      .ivu-tree-children {
        > li {
          .tree-item-text {
            width: calc(100% - 60px);
          }
          .ivu-tree-children {
            > li {
              .tree-item-text {
                width: calc(100% - 90px);
              }
              .ivu-tree-children {
                > li {
                  .tree-item-text {
                    width: calc(100% - 90px);
                  }
                  .ivu-tree-children {
                    > li {
                      .tree-item-text {
                        width: calc(100% - 100px);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
