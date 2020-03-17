<template>
  <div class="contentHeader">
    <div class="idNumberInput" @click="idNumberInput()">
      输入身份证号
      <i class="iconfont icon-geren1"></i>
    </div>
    <div class="screenInput">
      <div class="screenLeft">
        <span>图谱类型：</span>
        <CheckboxGroup label="图谱类型：" v-model="newMapType" @on-change="handleMapType">
          <Checkbox
            :key="index"
            v-for="(item,index) in mapTypeList"
            :label="item.id"
            :style="{'background':item.backgroundColor,'color':item.color}"
          >{{item.shortName}}({{mapTypeCount[item.id]||0}})</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
    <div class="searchInput">
      <div class="searchCenter" v-show="searchBtnShow">
        <div class="inputContainer">
          <input
            type="text"
            v-model="idNumber"
            :placeholder="placeholder"
            @keyup.enter="searchClick"
          />
          <i class="iconfont icon-guanbi1" @click="idNumberClear"></i>
        </div>
        <button @click="searchClick">搜索</button>
        <span>用时 {{executeTime}} 秒</span>
        <span>节点数：{{mLength}}，连线数：{{nLength}}</span>
      </div>
    </div>
    <div class="lookupInput">
      <span class="left" v-if="linkDefine" @click="handleMethod()">{{linkName}}</span>
      <span class="right" @click="changeResultList()">身份证列表 ({{idLength}})</span>
      <!-- <i class="unmatched">{{idLength}}</i> -->
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as apis from "@/api/collection/index.js";
import { transferParameters } from "@/tools/units.js";
export default {
  props: {
    unmatched: {
      type: Number, //未匹配到的数据
      default: 0
    },
    tmpData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    searchBtnShow: {
      type: Boolean,
      default: false
    },
    mapTypeList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    mapType: {
      type: Array,
      default: () => {
        return [];
      }
    },
    filtrationMapType: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    //这里存放数据
    return {
      newMapType: [], //
      mapTypeCount: {}, //
      idLength: 0,
      mLength: 0,
      nLength: 0,
      executeTime: null,
      idNumber: "",
      placeholder: "请输入姓名、身份证号码",
      linkName: "", //关系挖掘 / 群体分析
      linkPath: "", //relationCheck / groupAnalyse
      linkDefine: false //是否有跳转权限
    };
  },
  created() {
    if (this.$route.name == "GroupAnalyse") {
      this.placeholder = "请输入图谱名称或图谱类型";
      this.linkName = "关系挖掘";
      this.linkPath = "relationCheck";
      this.linkDefine = this.hasPageAuth(
        this.constantPageMap.PAGE_Relation_Check_ID
      );
    } else {
      this.placeholder = "请输入姓名、身份证号码";
      this.linkName = "群体分析";
      this.linkPath = "groupAnalyse";
      this.linkDefine = this.hasPageAuth(
        this.constantPageMap.PAGE_Group_Analyse_ID
      );
    }
  },
  mounted() {},
  watch: {
    mapTypeList: {
      handler(val) {},
      immediate: true,
      deep: true
    },
    mapType: {
      handler(val) {
        this.newMapType = val;
      },
      immediate: true
    },
    filtrationMapType: {
      handler(val) {},
      immediate: true
    },
    searchBtnShow: {
      handler(val) {},
      immediate: true
    },
    unmatched: {
      handler(val) {},
      immediate: true
    },
    tmpData: {
      handler(val) {
        if (val.unMatchIds == undefined) {
          this.idLength = 0;
        } else {
          this.idLength = val.unMatchIds.length + val.matchedUserInfo.length;
          this.executeTime = val.executeTime;
          this.nLength = val.links.length;
          this.mLength = val.nodes.length;
          this.mapCount(val.mapTypeCount);
        }
      },
      immediate: true,
      deep: true
    }
  },
  //方法集合
  methods: {
    // 图谱数量
    mapCount(data) {
      this.mapTypeCount = {};
      data.map(x => {
        this.mapTypeCount[x.type] = x.count;
      });
    },
    idNumberClear() {
      this.idNumber = "";
    },
    // 图谱类型筛选
    handleMapType(val) {
      this.$parent.handleMapType(val);
      this.$parent.filter();
    },
    searchClick() {
      this.$parent.filterText = this.idNumber;
      this.$parent.searchRelation();
      console.log(this.$parent.filterText);
    },
    // 显示身份证搜索模态框
    idNumberInput() {
      this.$parent.searchModal = true;
      this.$parent.scale = 800;
      this.$parent.ratioIndex = 0;
    },
    // 未匹配到的身份证号
    changeResultList() {
      const that = this;
      if (that.$parent.resultListShow && that.$parent.result == "two") {
        that.$parent.resultListShow = false;
      } else {
        that.$parent.resultListShow = true;
        that.$parent.result = "two";
      }
    },
    // 关系挖掘// 群体分析
    handleMethod() {
      let query = { sfzhm: this.$parent.idNumberString };
      let params = JSON.stringify(query);
      transferParameters(this, this.linkPath, params);
    }
  }
};
</script>
<style lang='less' scoped>
.contentHeader {
  padding: 11px 14px 15px 14px;
  background: #ffffff;
  display: flex;

  border-bottom: 1px solid #e3e3e3;
  .idNumberInput {
    flex: 0 0 116px;
    border-radius: 2px;
    background: #0668c8;
    color: #ffffff;
    font-size: 13px;
    width: 116px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
  .screenInput {
    margin-left: 30px;
    text-align: center;
    padding: 2px 0;
    cursor: pointer;
    .screenLeft {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .searchInput {
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    .searchCenter {
      display: flex;
      justify-content: center;
      align-items: center;
      .inputContainer {
        position: relative;
        input {
          width: 225px;
          height: 30px;
          line-height: 17px;
          border-radius: 2px;
          color: rgba(153, 153, 153, 1);
          font-size: 12px;
          text-align: left;
          border: 1px solid rgba(224, 227, 230, 1);
          padding: 2px 7px;
          outline: none;
        }
        i {
          position: absolute;
          top: 4px;
          right: 8px;
        }
      }
      button {
        width: 60px;
        height: 30px;
        border-radius: 2px;
        background-color: rgba(6, 104, 200, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
        margin-left: 8px;
        border: none;
        outline: none;
      }
      span {
        margin-left: 6px;
      }
    }
  }
  .lookupInput {
    flex: 0 0 200px;
    // height: 30px;

    border-radius: 2px;
    background-color: #ffffff;
    color: rgba(51, 51, 51, 1);
    font-size: 13px;
    display: flex;
    vertical-align: middle;
    justify-content: space-around;
    align-items: center;
    span {
      display: inline-block;
      text-align: center;
      user-select: none;
      padding: 4px 10px;
      cursor: pointer;
    }
    .left {
      color: #ffffff;
      background: #0668c8;
      border: 1px solid #0668c8;
    }
    .right {
      background: #ffffff;
      border: 1px solid rgb(215, 218, 219);
    }
    .unmatched {
      font-size: 12px;
      position: relative;
      border-radius: 50%;
      height: 16px;
      width: 16px;
      background: #ce4343;
      color: #ffffff;
      font-style: initial;
    }
  }
}
</style>