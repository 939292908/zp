<template>
  <div class="operationHeader">
    <div class="left">
      <!-- 搜索 -->
      <div class="inputContainer">
        <input
          type="text"
          v-model="searchContent"
          @keyup.enter="clickSearch(searchContent)"
          placeholder="请输入身份证号码或者姓名"
        />
        <i class="iconfont icon-guanbi1" @click="clearSearchContent()"></i>
      </div>
      <button @click="clickSearch(searchContent)">搜索</button>
    </div>
    <div class="right">
      <div
        class="modifyMap"
        @click="toParent('edit')"
        v-if="hasSubmit&& ((hasFunAuth(constantFunMap.FUN_Online_F_Map_Profile_Draw_ID)&& $route.name=='CollectMarkerProfile')||(hasFunAuth(constantFunMap.FUN_Online_F_Map_Enter_Draw_ID) && $route.name=='CollectMarkerExitEnter'))"
      >
        修改地图
        <i class="iconfont icon-bianjibiaoqian"></i>
      </div>
      <div class="mapStaff" @click="toParent('overview')">
        图谱概览
        <i class="iconfont icon-zairumoban"></i>
      </div>
      <div
        class="addStaff"
        @click="toParent('add')"
        v-if="hasSubmit&& ((hasFunAuth(constantFunMap.FUN_Online_F_Map_Profile_Add_ID)&& $route.name=='CollectMarkerProfile')||(hasFunAuth(constantFunMap.FUN_Online_F_Map_Enter_Add_ID) && $route.name=='CollectMarkerExitEnter'))"
      >
        添加人员
        <i class="iconfont icon-jiahao"></i>
      </div>
      <div class="staffList" @click="toParent('list')">
        人员列表
        <i class="iconfont icon-liebiaoxianshi"></i>
      </div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';state
export default {
  props: {
    state: {
      type: Number,
      default: 0
    },
    hasSubmit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    state: {
      handler(val) {},
      immediate: true
    },
    hasSubmit: {
      handler(val) {},
      immediate: true
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      searchContent: "" //搜索内容
    };
  },
  mounted() {
    console.log(this.$route.name);
  },
  watch: {},
  //方法集合
  methods: {
    // 点击搜索
    clickSearch(data) {
      this.$parent.searchContent(data);
    },
    // 清除搜索内容
    clearSearchContent() {
      this.searchContent = "";
    },
    // 人员列表
    toParent(i) {
      if (i == "edit") {
        this.$router.push({
          path: "/collectDrawProfile", //archivesmap
          query: {
            areaCode: this.$route.query.areaCode,
            collectId: this.$route.query.collectId,
            state: this.$route.query.state
          }
        });
      } else if (i == "overview" || i == "list") {
        this.$emit("toFatherFun", i);
      } else if (this.hasSubmit) {
        this.$emit("toFatherFun", i);
      }
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.operationHeader {
  width: 100%;
  height: 42px;
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  .act {
    cursor: no-drop;
  }
  .left {
    float: left;
    align-items: center;
    justify-content: center;
    display: flex;
    margin: 6px 0 0 25px;
    .inputContainer {
      position: relative;
      input {
        width: 225px;
        height: 28px;
        line-height: 17px;
        border-radius: 2px;
        color: #999999;
        font-size: 12px;
        text-align: left;
        border: 1px solid #e0e3e6;
        padding: 2px 7px;
        outline: none;
      }
      i {
        position: absolute;
        top: 4px;
        right: 8px;
        cursor: pointer;
      }
    }
    button {
      width: 60px;
      height: 28px;
      border-radius: 2px;
      background-color: #0668c8;
      color: #ffffff;
      font-size: 14px;
      text-align: center;
      margin-left: 8px;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }
  .right {
    float: right;
    margin: 7px 11px 0 0;
    div {
      display: inline-block;
      padding: 0 6px;
      height: 28px;
      line-height: 26px;
      background-color: #ffffff;
      color: #000000;
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
      border: 1px solid rgba(187, 187, 187, 1);
      cursor: pointer;
      i {
        font-size: 16px;
        color: #0567c6;
        vertical-align: middle;
      }
    }
  }
}
</style>