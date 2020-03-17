<template>
  <!-- 串并筛选框 -->
  <right-dialog v-model="modal" :showFooter="true" title="图谱串并" @close="closeMultiModal">
    <div class="cont-box" ref="contBox">
      <!-- 查询类别 -->
      <div class="row-search-type">
        <RadioGroup v-model="searchType" @on-change="handleTypeChange">
          <Radio label="1">按单位查询</Radio>
          <Radio label="2">按姓名、身份证查询</Radio>
        </RadioGroup>
      </div>
      <!-- 查询区域 -->
      <Row class="row-search">
        <Col :span="24">
          <Dropdown
            v-if="searchType == '1'"
            ref="deptDropdown"
            class="dept-dropdown"
            trigger="custom"
            :visible="visible"
            @on-clickoutside="handleOpenBlur"
          >
            <!-- @on-blur="handleOpenBlur" -->
            <Input
              @on-focus="handleOpen"
              v-model="filterSearch.filterDept"
              clearable
              :placeholder="filterSearch.filterDept ? filterSearch.filterDept: '请选取地区单位'"
            />
            <DropdownMenu ref="deptDropdownItems" slot="list">
              <Tree
                ref="tree"
                :data="resultDeptList"
                :multiple="false"
                :show-checkbox="false"
                :check-strictly="true"
                @on-select-change="handleSelectChange"
                v-if="resultDeptList.length > 0"
              ></Tree>
              <div style="text-align:center;" v-if="resultDeptList.length <= 0">
                <!-- loading -->
                数据加载中
                <div class="ivu-spin ivu-spin-large text-loading">
                  <div class="ivu-spin-main">
                    <span class="ivu-spin-dot"></span>
                    <div class="ivu-spin-text"></div>
                  </div>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            v-if="searchType == '2'"
            ref="nameDropdown"
            class="dept-dropdown name"
            trigger="custom"
            :visible="visibleName"
            @on-clickoutside="handleNameBlur"
          >
            <Input
              @on-focus="handleOpenName"
              v-model="filterSearch.name"
              @input="remoteMethod"
              clearable
              :placeholder="filterSearch.name ? filterSearch.name: '请输入姓名、身份证号'"
            />
            <DropdownMenu ref="nameDropdownItems" slot="list">
              <!-- 0.结果下拉列表 -->
              <div
                v-show="remoteOptions.length > 0 && !isShowSearchLoading"
                v-for="option in remoteOptions"
                :key="option.value"
                @click="handleNameSelectd(option.value)"
              >
                <div class="name-sfzh-item option-item">
                  <div class="option-item-label">{{option.label}}</div>
                  <div class="option-item-value">{{option.value}}</div>
                </div>
              </div>
              <!-- 1.无搜索结果 -->
              <div
                style="text-align:center;"
                v-show="filterSearch.name != '' && !isShowSearchLoading && remoteOptions.length <= 0"
              >无搜索结果</div>
              <!-- 2.请输入内容 -->
              <div
                style="text-align:center;"
                v-show="filterSearch.name == '' && remoteOptions.length <= 0"
              >请输入内容</div>
              <!-- 3.loading -->
              <div style="text-align:center;" v-show="isShowSearchLoading">
                正在搜索
                <div class="ivu-spin ivu-spin-large text-loading">
                  <div class="ivu-spin-main">
                    <span class="ivu-spin-dot"></span>
                    <div class="ivu-spin-text"></div>
                  </div>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      <!-- 图谱类型 -->
      <div class="row-search-maptype">
        <span class="maptype-title">图谱类型：</span>
        <CheckboxGroup label="图谱类型：" v-model="mapType" @on-change="handleMapType">
          <Checkbox
            :key="index"
            v-for="(item,index) in mapTypeList"
            :label="item.id"
            :style="{'background':item.backgroundColor,'color':item.color}"
          >{{item.shortName}}</Checkbox>
        </CheckboxGroup>
      </div>
      <!-- 图谱列表区域 -->
      <div class="select-result-title">图谱列表：</div>
      <div class="search-result-list">
        <div class="box" ref="scrollBox" :style="{height: (boxHeight * 0.57) + 'px'}">
          <div
            :class="filterMapStatus(item)? 'selected' : ''"
            class="box-items"
            v-for="(item,index) in allGroupList"
            :key="index"
          >
            <div class="left">
              <div
                class="tags"
                :style="{'background':$config.topTagColors[item.label]}"
                :key="index"
              >{{ item.label }}</div>
              <div class="info">
                <div>{{ item.tpmc }}{{ item.deptName ? ` (${item.deptName})` : '' }}</div>
                <div>{{ item.tppg ? item.tppg.replace('{','').replace('}','') : '' }}</div>
              </div>
            </div>
            <div class="right">
              <i
                @click="handleAddMap(item)"
                v-if="!filterMapStatus(item)"
                class="iconfont icon-jiahao1"
              ></i>
              <i
                @click="handleRemove(item)"
                v-if="filterMapStatus(item)"
                class="iconfont success icon-xuanze"
              ></i>
            </div>
          </div>
        </div>
        <!-- <div class="loading-tpmc" v-show="loadingTpmcShow">
          <div class="loader-tpmc"></div>
        </div>-->
        <loading color="blue" :maskClosable=false v-model="loadingTpmcShow"></loading>
      </div>
      <!-- 已选择列表区域 -->
      <div class="select-result-title">
        已选择图谱：
        <span class="remove-all" @click="handleRemoveAll">
          <i class="iconfont icon-qingkong"></i>
          清空
        </span>
      </div>
      <div class="select-result-list">
        <div class="box" :style="{height: (boxHeight * 0.43) + 'px'}">
          <div class="box-items selected" v-for="(item,index) in checkAllGroup" :key="index">
            <div class="left">
              <div
                class="tags"
                :style="{'background':$config.topTagColors[item.label]}"
                :key="index"
              >{{item.label}}</div>
              <div class="info">
                <div>{{ item.tpmc }}{{ item.deptName ? ` (${item.deptName})` : '' }}</div>
                <div>{{ item.tppg ? item.tppg.replace('{','').replace('}','') : '' }}</div>
              </div>
            </div>
            <div class="right">
              <i @click="handleRemove(item)" class="iconfont icon-jianhao"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cont-btn" slot="footer">
      <span class="sure" :class="{'disabled':loading || !hasStartJoinAuth}" @click="handleOk">开始串并</span>
    </div>
  </right-dialog>
</template>
<script>
import rightDialog from "@/components/assembly/RightDialog";
import * as comApis from "@/api/common.js";
import * as searchApis from "@/api/search/index.js";
import * as apis from "@/api/mapJoin/index.js";
import { mapJoinMixin } from "../mixin/mapJoinMixin";
import { debounce, removeCancelTokenByUrl } from "@/tools/units.js";
import { GET_DRAW_TP_TYPE_LIST } from "@/api/collection/index.js";
import Loading from "@/components/assembly/Loading";
export default {
  name: "FilterMap",
  components: {
    rightDialog,
    Loading
  },
  mixins: [mapJoinMixin],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    items: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchType: this.$route.query.areaMapCodes ? "" : "1",
      filterSearch: {
        name: "",
        keyword: "",
        dept: "",
        deptId: "",
        filterDept: ""
      },
      remoteOptions: [],
      remoteList: [],
      deptList: [],
      deptArrayList: [],
      deprSearchResult: [],
      remoteLoading: false,
      loadingTpmcShow: false,
      isShowSearchLoading: false,
      modal: false,
      checkAllGroup: [],
      allGroupList: [],
      groupList: [],
      statusList: {},
      imageUrl: "../../..",
      scroll: true,
      pageSize: 20,
      pageIndex: 1,
      totalNums: 1, //总页数
      scrollTop: 0,
      isQuery: false,
      personTPList: [],
      boxHeight: 320,
      visible: false,
      visibleName: false,
      mapType: [],
      mapTypeList: []
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
    this.$nextTick(() => {
      this.$refs.scrollBox.addEventListener("scroll", this.handleScroll);
    });
    this.getMapTypeList();
  },
  computed: {
    hasStartJoinAuth() {
      return this.hasFunAuth(this.constantFunMap.FUN_Join_StartJoin_ID);
    },
    resultDeptList() {
      if (this.filterSearch.filterDept) {
        this.deprSearchResult = [];
        this.filterMethod(this.deptList, this.deprSearchResult);
        return this.deprSearchResult;
      } else {
        return this.deptList;
      }
    }
  },
  methods: {
    // 获取图谱类型列表
    getMapTypeList() {
      GET_DRAW_TP_TYPE_LIST().then(res => {
        if (res.code == 200) {
          let data = res.data;
          data = data.filter(x => {
            return x.id != "8" && x.id != "9";
          });
          data.forEach(x => {
            if (this.mapType.indexOf(x.id) == -1) {
              x.backgroundColor = this.$config.topTagColors[x.shortName];
              x.color = "#ffffff";
            } else {
              x.backgroundColor = "#fff";
              x.color = "#515a6e";
            }
          });
          this.mapType = data.map(x => x.id);
          this.mapTypeList = data;
        }
      });
    },
    handleMapType(val) {
      this.mapTypeList.map(x => {
        if (val.indexOf(x.id) == -1) {
          x.backgroundColor = "#fff";
          x.color = "#515a6e";
        } else {
          x.backgroundColor = this.$config.topTagColors[x.shortName];
          x.color = "#ffffff";
        }
      });
      this.mapType = val;
      this.pageIndex = 1;
      this.totalNums = 1;
      this.loadingTpmcShow = false;
      this.allGroupList = [];
      if (!this.searchType) {
        this.getMapListFromArea();
        return;
      }
      if (this.searchType == "1") {
        this.getMapsListByDept();
      }
      if (this.searchType == "2" && this.filterSearch.keyword) {
        let keyword = this.filterSearch.keyword;
        this.getTpList(keyword);
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
            deptId: item.deptId,
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
    // 加载图谱类型
    filterTags(items) {
      let tmpObj = {};
      if (items) {
        let objs = JSON.parse(items);
        Object.keys(objs).forEach(x => {
          if (objs[x] > 0) {
            tmpObj[x] = objs[x];
          }
        });
      }
      return tmpObj;
    },
    // 过滤图谱状态，判断该图谱是否已被选中
    filterMapStatus(item) {
      return this.checkAllGroup.some(x => {
        return x.tpid == item.tpid;
      });
    },
    // 查询人员
    remoteMethod: debounce(function() {
      let query = this.filterSearch.name;
      let apiUrl =
        this.$config.joinPath +
        `IntelligentSearchResource/v1/intelligentSearch`;
      removeCancelTokenByUrl(apiUrl);
      // let cancelArr = window.axiosCancel;
      // cancelArr.forEach((ele, index) => {
      //   ele.cancel("取消了请求") // 在失败函数中返回这里自定义的错误信息
      //   delete window.axiosCancel[index]
      // })
      if (query !== "") {
        this.getPersonData(query);
      } else {
        this.remoteOptions = [];
      }
    }, 200),
    handleOpen() {
      this.visible = true;
    },
    handleOpenBlur() {
      this.visible = false;
    },
    handleOpenName() {
      this.visibleName = true;
    },
    handleNameBlur() {
      console.log("blur");
      this.visibleName = false;
    },
    // 切换查询类型1：根据部门进行查询，2：根据人员进行查询
    handleTypeChange() {
      this.clearData();
      this.mapTypeList.map(x => {
        x.backgroundColor = this.$config.topTagColors[x.shortName];
        x.color = "#ffffff";
      });
      this.mapType = this.mapTypeList.map(x => x.id);
      // 查询类型切换
      this.$emit("on-search-type-change");
    },
    // 置空数据
    clearData() {
      this.pageIndex = 1;
      this.totalNums = 1;
      this.filterSearch = {
        name: "",
        dept: "",
        keyword: "",
        filterDept: ""
      };
      // this.remoteOptions = [];
      this.loadingTpmcShow = false;
      this.allGroupList = [];
      // this.checkAllGroup = [];
    },
    // 添加图谱
    handleAddMap(item) {
      let flag = this.checkAllGroup.some(x => {
        return x.tpid == item.tpid;
      });
      if (!flag) {
        //this.checkAllGroup = [];
        this.checkAllGroup.push(item);
        // this.$nextTick(() => {
        //   this.$emit("on-change", this.checkAllGroup, 1);
        // });
      }
    },
    // 移除图谱
    handleRemove(item) {
      let arr = this.checkAllGroup.filter(x => {
        return x.tpid != item.tpid;
      });
      this.checkAllGroup = arr;
      this.$nextTick(() => {
        this.$emit("on-remove", item, this.checkAllGroup, 0);
      });
    },
    // 清空全部选中的
    handleRemoveAll() {
      this.checkAllGroup = [];
      // this.$nextTick(() => {
      //   this.$emit("on-change", this.checkAllGroup, 2);
      // });
    },
    handleOk() {
      let hasFun = this.hasStartJoinAuth;
      if (!hasFun) return;
      this.$nextTick(() => {
        this.$emit("on-change", this.checkAllGroup, 2);
      });
    },
    // 点击选中一个人员
    handleNameSelectd(value) {
      this.clearData();
      if (value) {
        this.filterSearch.name = value;
        this.filterSearch.keyword = value;
        this.visibleName = false;
        if (this.searchType != "2") return;
        this.getTpList(value);
      }
    },
    // 树-点击选择一个节点
    handleSelectChange(data, cur) {
      this.clearData();
      this.filterSearch.dept = cur.id;
      this.filterSearch.deptId = cur.deptId;
      this.filterSearch.filterDept = cur.title;
      this.$refs.deptDropdown.handleClick();
      this.visible = false;
      this.getMapsListByDept();
    },
    handleFocus() {
      this.$refs.deptDropdown.handleClick();
    },
    // 鼠标离开检测当前值是否是单位的数据
    handleBlur() {
      // let tmp = this.deptArrayList.filter(x => {
      //   return x.title == this.filterSearch.filterDept;
      // });
      // if (tmp.length <= 0) {
      //   this.filterSearch.filterDept = "";
      //   this.filterSearch.dept = "";
      // }
    },
    /**
     * 获取部门树的数据
     */
    getDeptData() {
      comApis.getDeptTree().then(response => {
        if (response.code == 200) {
          this.deptList = response.data;
          this.treeTransArray(response.data, "children");
        }
      });
    },
    // 获取图谱列表的数据（从区域串并页面跳转过来）
    getMapListFromArea() {
      let me = this;
      this.loadingTpmcShow = true;
      if (this.searchType != "") {
        this.loadingTpmcShow = false;
        return;
      }
      let mapCodes = sessionStorage.getItem(this.$route.query.areaMapCodes);
      let data = {
        mapCodes: mapCodes && mapCodes.split(","),
        mapTypes: this.mapType,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      comApis.getMapListByCode(data).then(res => {
        me.loadingTpmcShow = false;
        if (this.searchType != "") return;
        if (res.code != 200) return;
        let data = res.data;
        if (me.pageIndex === 1) {
          me.allGroupList = data.data;
          me.pageIndex = data.pageIndex;
          me.totalNums = data.pages;
          if (me.$route.query.tpid) {
            me.checkAllGroup =
              me.allGroupList.length > 0 ? [me.allGroupList[0]] : [];
          }
        } else {
          me.allGroupList = [...me.allGroupList, ...data.data];
        }
        ++me.pageIndex;
      });
    },
    /**
     * 获取人员数据
     */
    getPersonData(query) {
      let me = this;
      this.remoteLoading = true;
      this.isShowSearchLoading = true;
      let params = {
        keyword: query,
        pageIndex: 1,
        pageSize: 20
      };
      searchApis
        .intelligentSearch(params)
        .then(response => {
          if (!response.code == "200") {
            this.$Message.warning(response.msg);
            me.remoteLoading = false;
            me.isShowSearchLoading = false;
            return;
          }
          if (response.code == 200) {
            me.remoteList = response.data.data;
            setTimeout(() => {
              let list = me.remoteList.map(item => {
                return {
                  value: item.property.SFZHM,
                  label: item.property.XM
                };
              });
              me.remoteOptions = list;
              me.remoteLoading = false;
              me.isShowSearchLoading = false;
            }, 200);
          } else {
            me.remoteLoading = false;
            me.isShowSearchLoading = false;
            me.remoteOptions = [];
          }
        })
        .catch(() => {
          me.remoteLoading = false;
          me.isShowSearchLoading = false;
          me.remoteOptions = [];
        });
    },
    // 根据选中的人员获取图谱列表
    getTpList(value) {
      let me = this;
      me.remoteLoading = true;
      let params = {
        keyword: value,
        pageIndex: 1,
        pageSize: 20,
        mapTypes: this.mapType.join(",")
      };
      searchApis
        .tpList(params)
        .then(response => {
          if (this.searchType != "2") {
            me.remoteLoading = false;
            return;
          }
          if (response.code != 200) {
            this.$Message.warning(response.msg);
            me.remoteLoading = false;
          }
          if (response.code == 200) {
            me.personTPList = response.data;
            me.getMapsListByKeyword();
          }
        })
        .catch(() => {
          me.remoteLoading = false;
          me.remoteOptions = [];
        });
    },
    // 根据人关键字获取图谱列表
    getMapsListByKeyword() {
      let me = this;
      this.loadingTpmcShow = true;
      setTimeout(() => {
        me.loadingTpmcShow = false;
        const data = me.personTPList;
        if (this.pageIndex === 1) {
          this.allGroupList = data.data;
          this.pageIndex = data.pageIndex;
          this.totalNums = data.pages;
        } else {
          this.allGroupList = [...this.allGroupList, ...data.data];
        }
        ++this.pageIndex;
      }, 500);
    },
    // 根据单位获取图谱列表
    getMapsListByDept() {
      this.loadingTpmcShow = true;
      comApis.queryCountyTreeAuth(this.filterSearch.dept).then(res => {
        let resgions = res.data.length > 0 ? res.data[0].deptPath : "";
        let params = {
          deptPath: resgions,
          types: this.mapType,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        let apiAxios = "";
        if (this.searchType != "1") {
          this.loadingTpmcShow = false;
          return;
        }
        apiAxios = apis.getMapListByDept(params);
        apiAxios.then(response => {
          this.loadingTpmcShow = false;
          if (this.searchType != "1") return;
          if (!response.data) {
            this.$Message.warning(response.msg);
            return;
          }
          const data = response.data;
          if (this.pageIndex === 1) {
            this.allGroupList = data.data;
            this.pageIndex = data.pageIndex;
            this.totalNums = data.pages;
          } else {
            this.allGroupList = [...this.allGroupList, ...data.data];
          }
          ++this.pageIndex;
        });
      });
    },
    // 关闭模态框
    closeMultiModal() {
      this.$emit("close");
      this.modal = false;
      this.$emit("input", this.modal);
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
    // 滚动到底部加载数据
    handleScroll() {
      let scrollTop = this.$refs.scrollBox.scrollTop;
      let scrollHeight = this.$refs.scrollBox.scrollHeight;
      let offsetHeight = this.$refs.scrollBox.offsetHeight;
      if (
        offsetHeight + scrollTop + 20 >= scrollHeight &&
        scrollTop >= this.scrollTop
      ) {
        if (this.pageIndex > this.totalNums) {
          return;
        } else {
          if (!this.loadingTpmcShow) {
            if (this.searchType == "1") {
              this.getMapsListByDept();
            } else if (this.searchType == "2") {
              this.getMapsListByKeyword();
            } else {
              this.getMapListFromArea();
            }
          }
        }
      }
      this.scrollTop = scrollTop;
    },
    getPageData(data) {
      let me = this;
      return data.slice(
        (me.pageIndex - 1) * me.pageSize,
        me.pageIndex * me.pageSize
      );
    }
  },
  watch: {
    items: {
      handler(val) {
        this.statusList = val;
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(val) {
        this.modal = val;
        if (this.modal) {
          this.getDeptData();
          if (!this.searchType) this.getMapListFromArea();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../css/style.less";
@import "../../../assets/loading.css";
@imageUrl: "../../../../";
.row-search-maptype {
  display: flex;
  margin-top: 15px;
  align-items: center;
  .maptype-title {
    font-size: 14px;
    flex: 0 0 75px;
  }
  /deep/.ivu-checkbox-group-item {
    font-size: inherit;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 2px 8px;
    font-size: 13px;
  }
  /deep/.ivu-checkbox {
    display: none;
  }
  /deep/label.ivu-checkbox-wrapper.ivu-checkbox-group-item.ivu-checkbox-wrapper-checked.ivu-checkbox-default {
    // background-color: #fff !important;
    color: #333;
  }
}

.check-all {
  border-bottom: 1px solid #e9e9e9;
  padding: 4px 6px;
}
.cont-box {
  height: 100%;
}
.search-result-list {
  background: #ffffff;
  border: 1px solid #eaeaea;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
  .box {
    overflow: auto;
    min-height: 200px;
    height: 200px;
    color: #818181;
  }
}
.box-items {
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  .right {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .iconfont {
      font-size: 18px;
      margin-left: 5px;
      font-weight: bold;
      color: #b9b7b7;
    }
    .iconfont.success {
      color: #15d45a;
    }
  }
  .left {
    width: 100%;
    position: relative;
    // top: -10px;
    .tags {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 2px;
      width: 22px;
      text-align: center;
      border-radius: 3px;
      color: #ffffff;
      margin-right: 4px;
    }
    .info {
      float: left;
      padding-left: 26px;
    }
  }
  p {
    position: absolute;
    top: 30px;
    left: 27px;
  }
  &:hover {
    background: #f5f3f3;
  }
}
.box::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.box::-webkit-scrollbar-track {
  border-radius: 5px;
  background: none;
}
.box::-webkit-scrollbar-thumb {
  background-color: rgba(32, 76, 157, 1);
  border-radius: 5px;
}
.box::-webkit-scrollbar-thumb:hover {
  background-color: rgba(45, 183, 245, 1);
}
.box::-webkit-scrollbar-corner {
  background-color: #dadada;
}
.select-result-list {
  background: #ffffff;
  border: 1px solid #eaeaea;
  margin-top: 10px;
  min-height: 120px;
  .box {
    overflow: auto;
    min-height: 150px;
    height: 150px;
    color: #818181;
  }
}
.select-result-title {
  padding: 10px 0 0 0;
  color: #333333;
  font-size: 14px;
  .remove-all {
    float: right;
    color: #68a4f6;
    cursor: pointer;
  }
}
/deep/ .name-sfzh-item {
  cursor: pointer;
  padding: 4px 10px;
  &:hover {
    background: #f3f3f3;
  }
}
.option-item-label {
  color: #313131;
}
.option-item-value {
  color: #818181;
  padding: 4px 0 0 0;
}
/deep/ .ivu-radio-wrapper {
  font-size: 14px;
}
.row-search-type {
  margin-bottom: 8px;
}
.cont-btn {
  .sure {
    display: inline-block;
    width: 93px;
    height: 36px;
    margin-top: 12px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    float: right;
    background: url("@{imageUrl}static/images/sure.png") 0 0 no-repeat;
    color: #ffffff;
    margin-right: 15px;
  }
  .disabled {
    opacity: 0.5;
  }
}
.text-loading {
  display: inline-block;
  .ivu-spin-dot {
    width: 20px;
    height: 20px;
    -webkit-animation: ani-spin-bounce 1.2s 0s ease-in-out infinite;
  }
}
</style>



