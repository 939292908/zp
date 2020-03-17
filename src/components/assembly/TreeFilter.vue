<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 18:36:52
 * @LastEditTime: 2019-12-11 14:19:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <Dropdown
    ref="deptDropdown"
    class="dept-dropdown"
    trigger="custom"
    :visible="visible"
    @on-clickoutside="handleClose"
  >
    <i-input
      :disabled="disabled"
      @on-focus="handleShow"
      v-model="filterDept"
      clearable
      :placeholder="placeholder"
      @on-change="handleFilterChange"
    ></i-input>
    <Icon class="tree-input-icon" @click.native="handleShow" type="ios-arrow-down"></Icon>
    <DropdownMenu ref="deptDropdownItems" slot="list">
      <Tree
        :disabled="disabled"
        class="dept-tree"
        ref="tree"
        :data="resultDeptList"
        :multiple="false"
        :show-checkbox="false"
        :check-strictly="true"
        @on-select-change="handleSelectChange"
        v-if="resultDeptList.length > 0 && visible"
      ></Tree>
      <div class="dept-no-data" v-if="resultDeptList.length <= 0">
        <Spin fix>{{filterDept ? '暂无数据':'加载中...'}}</Spin>
      </div>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import * as tool from "../../tools/units.js";
import { OPTIONS_LIST } from "@/api/config.js";
export default {
  name: "TreeFilter",
  props: {
    value: {
      type: String
    },
    props: {
      type: Object,
      default() {
        return {
          filterDept: "title"
        };
      }
    },
    treeProps: {
      type: Object,
      default() {
        return {
          title: "title",
          id: "id",
          children: "children"
        };
      }
    },
    placeholder: {
      type: String,
      default: ""
    },
    // 请求接口的方法
    apiFun: {
      type: Function
    },
    apiKey: {
      type: String,
      default: ""
    },
    apiParams: {
      type: Object,
      default() {
        return null;
      }
    },
    // 是否需要验证参数是否相等
    validParams: {
      type: Boolean,
      default: false
    },
    // 请求结束后的回调方法
    afterCallback: {
      type: Function
    },
    // TreeData(如果data有值，有先选择treeData的值)
    treeData: {
      type: Array | Object
    },
    // 选择节点后的回调事件
    selectAfterFun: {
      type: Function
    },
    // 节点是否可以点击，all:表示所有节点可选中点击，否则只有叶子节点可以选中点击
    selectType: {
      type: String,
      default: "all"
    },
    showAllPath: {
      type: Boolean,
      default: true
    },
    // 禁用状态
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      deprSearchResult: [],
      deptList: [],
      filterDept: "",
      deptArrayList: [],
      resultDeptList: []
    };
  },
  computed: {
    // resultDeptList() {
    //   if (this.filterDept) {
    //     // debugger;
    //     // let filterTxt = "";
    //     // if (this.showAllPath) {
    //     //   let arr = this.filterDept.split("/");
    //     //   filterTxt = arr[arr.length - 1];
    //     // } else {
    //     //   filterTxt = this.filterDept;
    //     // }
    //     // this.deprSearchResult = [];
    //     // tool.filterTreeMethod(
    //     //   filterTxt,
    //     //   this.deptList,
    //     //   this.deprSearchResult
    //     // );
    //     // return this.deprSearchResult;
    //   } else {
    //     // return this.deptList;
    //   }
    //   return this.deptList;
    // }
  },
  methods: {
    handleShow() {
      this.visible = true;
      this.handleFilterChange();
    },
    handleClose() {
      this.visible = false;
    },
    // 树-点击选择一个节点
    handleSelectChange(data, cur) {
      if (
        this.selectType == "leaf" &&
        cur.children &&
        cur.children.length > 0
      ) {
        this.$set(cur, "expand", !cur.expand);
        // this.$refs.tree.$on('toggle-expand', node => this.$refs.tree.$emit('on-toggle-expand', node));
        // cur.expand = cur.expand ? !cur.expand : true;
        // this.filterDept = ""
      } else {
        let curNodeTitle = cur[this.props.filterDept];
        if (this.showAllPath) {
          // 获取全路径
          var nodePath = {
            title: cur.title,
            id: cur.id
          };
          var nodeDeptPath = { code: cur.code };
          if (!cur.deptPath) {
            tool.getTreeNodePathByCode(
              cur.parentCode,
              nodeDeptPath,
              this.deptArrayList
            );
            cur.deptPath = "/" + nodeDeptPath.code;
          }
          if (cur.parent) {
            tool.getTreeNodePathById(
              cur.parent.id,
              nodePath,
              this.deptArrayList
            );
          }
          cur.path = nodePath;

          curNodeTitle = nodePath.title;
        }

        this.filterDept = curNodeTitle;
        this.$refs.deptDropdown.handleClick();
        this.visible = false;
        this.$emit("input", this.filterDept);
        this.$emit("on-select-change", cur);
      }
    },
    /**
     * 获取部门树的数据
     */
    getDeptData() {
      if (this.treeData) {
        if (this.treeProps) {
          var data = this.treeData;
          data.title = data[this.treeProps.title] || "";
          data.children = data[this.treeProps.children] || [];
          data.expand = true;
          this.parseTreeData(data.children);
          if (Array.isArray(data)) {
          } else {
            data = [data];
          }
        }
        this.deptList = data;
        tool.treeTransArray(
          data,
          "children",
          this.deptArrayList,
          this.treeProps
        );
        if (this.afterCallback)
          this.afterCallback(this.deptList, this.deptArrayList);
      } else {
        let me = this;
        this.$store
          .dispatch("getOptionsByKey", {
            key: this.apiKey,
            apiFun: this.apiFun,
            validParams: this.validParams,
            params: this.apiParams
          })
          // this.apiFun()
          .then(response => {
            // if (response.code == 200) {
            var data = response;
            // var data = response.data;
            if (Array.isArray(data)) {
              data = data;
            } else {
              data = [data];
            }
            if (
              me.apiKey == OPTIONS_LIST.CITY_AREA_TREE ||
              me.apiKey == OPTIONS_LIST.CURRENT_TOKEN_DEPT_TREE
            ) {
              if (data[0]) {
                if (!data[0].title)
                  data[0].title = data[0][me.treeProps.title] || "";
                delete data[0][me.treeProps.title];
                if (!data[0].children) {
                  data[0].children = data[0][me.treeProps.children] || [];
                  delete data[0][me.treeProps.children];
                }
                if (!data[0].expand) data[0].expand = true;
              }
              if (data[0].children) me.parseTreeData(data[0].children);
            }
            tool.treeTransArray(data, "children", me.deptArrayList);
            var resultData = JSON.parse(JSON.stringify(data));
            me.deptList = resultData;
            me.resultDeptList = resultData;
            if (me.afterCallback)
              me.afterCallback(me.deptList, me.deptArrayList);
            // }
          });
      }
    },
    parseTreeData(data) {
      data.forEach(x => {
        if (x.hasOwnProperty(this.treeProps.title)) {
          let title = x[this.treeProps.title] || "";
          delete x[this.treeProps.title];
          x.title = title;
        }
        if (x.hasOwnProperty(this.treeProps.children)) {
          let children = x[this.treeProps.children] || [];
          delete x[this.treeProps.children];
          x.children = children;
        }
        if (!x.hasOwnProperty("expand")) {
          x.expand = false;
        }
        if (x.children.length > 0) {
          this.parseTreeData(x.children);
        }
      });
    },
    // 将树形结构的数据转化成一维数组
    treeTransArray(tree, key) {
      return tree.reduce((con, item) => {
        con.push(item);
        if (item[key] && item[key].length > 0) {
          item[key].forEach(x => {
            if (this.treeProps) {
              x.parent = {
                name: item[this.treeProps.title],
                id: item[this.treeProps.id]
              };
            } else {
              x.parent = {
                name: item.title,
                id: item.id
              };
            }
          });
          this.treeTransArray(item[key], key);
        }
        return con;
        ("");
      }, this.deptArrayList);
    },
    getNodePathById(parentId, obj) {
      let parent = this.deptArrayList.find(
        x => x[this.treeProps.id] == parentId
      );
      if (parent) {
        obj.title = parent[this.treeProps.title] + "/" + obj.title;
        obj.id = parent[this.treeProps.id] + "/" + obj.id;
        if (parent.parent) {
          this.getNodePathById(parent.parent.id, obj);
        }
      }
      return obj;
    },
    handleFilterChange() {
      // debugger;
      // if (this.filterDept) {
      //   let filterTxt = "";
      //   if (this.showAllPath) {
      //     let arr = this.filterDept.split("/");
      //     filterTxt = arr[arr.length - 1];
      //   } else {
      //     filterTxt = this.filterDept;
      //   }
      //   this.deprSearchResult = [];
      //   tool.filterTreeMethod(filterTxt, this.deptList, this.deprSearchResult);
      //   this.resultDeptList = this.deprSearchResult;
      // } else {
      //   this.resultDeptList = this.deptList;
      //   if (!this.visible) {
      //     this.handleClear();
      //   }
      // }
      if (!this.visible) {
        this.handleClear();
      }
      return this.resultDeptList;
    },
    handleClear() {
      this.$emit("on-clear", this.filterDept);
    }
  },
  beforeDestroy() {
    if (this.$refs.tree) {
      this.$refs.tree.$destroy();
    }
  },
  watch: {
    value: {
      handler(val) {
        this.filterDept = val;
      },
      immediate: true
    },
    apiFun: {
      handler(val) {
        if (val) {
          this.getDeptData();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.dept-dropdown {
  width: 100%;
}
.dept-no-data {
  text-align: center;
  padding: 15px 20px;
}
.dept-tree {
  max-height: 300px;
  overflow-y: auto;
  line-height: 20px;
  padding: 0 4px;
  height: 288px;
}
.tree-input-icon {
  position: absolute;
  right: 10px;
  top: 12px;
}
</style>
