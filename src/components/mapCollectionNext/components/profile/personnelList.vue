<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 17:08:20
 * @LastEditTime: 2019-09-24 14:25:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div
    class="bigPersonnelList"
    @mouseout="mouseoutList()"
    @mouseup="mouseupList()"
    onselectstart="return false"
  >
    <div class="listsUnfinished">
      <div class="title">
        未完成打点人员 ({{listsUnfinishedLength}}人)&nbsp;
        <i class="icon iconfont icon-tishi"></i>请将人员拖拽至地图上
      </div>
      <div
        class="list"
        v-for="(item, i) in listsUnfinished"
        :key="i"
        v-if="item!=null&&item.personInfo!=null"
        :class="{'act':indexStyle==i}"
        @mousedown="mousedownList(2,i)"
        @click="showPersonnelDetail(2,i,item.personInfo.idNumber)"
      >
        <div class="imgColor">
          <img
            :src="getImagePath(item.personInfo.picUrl)"
            @mousedown="imgDrag($event)"
            width="100%"
            height="100%"
            alt
          />
        </div>
        <div class="listInfo">
          <span class="listName">{{item.personInfo.name}}</span>
          <span class="IDCard">{{item.personInfo.idNumber}}</span>
          <span
            class="state"
            v-if="$config.project.locale=='aks'"
          >标签数：{{item.personInfo.personTagId | tagNumber}}</span>
          <span class="state" v-else>属性数：{{item.personInfo.personTagId | tagNumber}}</span>
        </div>
        <div class="arrowRight">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
    <div class="listsDone">
      <div class="title">已完成打点人员 ({{listsDoneLength}}人)</div>
      <div
        class="list"
        v-for="(item, i) in listsDone"
        :key="i"
        v-if="item!=null&&item.personInfo!=null"
        @mousedown="mousedownList(1,i)"
        @click="showPersonnelDetail(1,i,item.personInfo.idNumber)"
      >
        <div class="imgColor">
          <img
            :src="getImagePath(item.personInfo.picUrl)"
            @mousedown="imgDrag($event)"
            width="100%"
            height="100%"
            alt
          />
        </div>
        <div class="listInfo">
          <span class="listName">{{item.personInfo.name}}</span>
          <span class="IDCard">{{item.personInfo.idNumber}}</span>
          <span
            class="state"
            v-if="$config.project.locale=='aks'"
          >标签数：{{item.personInfo.personTagId | tagNumber}}</span>
          <span class="state" v-else>属性数：{{item.personInfo.personTagId | tagNumber}}</span>
        </div>
        <div class="arrowRight">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  components: {},
  props: {
    hasSubmit: {
      type: Boolean,
      default: false
    },
    state: {
      type: Number,
      default: 0
    },
    listsDone: {
      type: Array,
      default: []
    },
    listsUnfinished: {
      type: Array,
      default: []
    },
    colorHome: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  watch: {
    hasSubmit: {
      handler(val) {},
      immediate: true
    },
    state: {
      handler(val) {},
      immediate: true
    },
    listsDone: {
      handler(val) {
        this.listsDoneLength = this.length(val);
      },
      deep: true,
      immediate: true
    },
    listsUnfinished: {
      handler(val) {
        this.listsUnfinishedLength = this.length(val);
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    //这里存放数据
    return {
      moveToMap: false,
      moveToMapI: undefined,
      moveToMapIndex: undefined,
      listsDoneLength: 0,
      listsUnfinishedLength: 0,
      indexStyle: null
    };
  },
  mounted() {
    this.listsDoneLength = this.listsDone.length;
    this.listsUnfinishedLength = this.listsUnfinished.length;
  },
  //方法集合
  methods: {
    mousedownList(i, index) {
      this.moveToMap = true;
      this.moveToMapI = i;
      this.moveToMapIndex = index;
    },
    mouseupList() {
      this.indexStyle = null;
      this.moveToMap = false;
      this.moveToMapI = null;
      this.moveToMapIndex = null;
    },
    mouseoutList() {
      if (
        this.moveToMap &&
        this.hasSubmit &&
        ((this.hasFunAuth(
          this.constantFunMap.FUN_Online_F_Map_Profile_Add_ID
        ) &&
          this.$route.name == "CollectMarkerProfile") ||
          (this.hasFunAuth(this.constantFunMap.FUN_Online_F_Map_Enter_Add_ID) &&
            this.$route.name == "CollectMarkerExitEnter"))
      ) {
        this.indexStyle = this.moveToMapIndex;
        this.$emit("toMapMarker", this.moveToMapI, this.moveToMapIndex);
        this.moveToMap = false;
      }
    },
    showPersonnelDetail(key, i, data) {
      //key=1,已打点人员
      this.$emit("toGetPersonnelDetail", key, i);
      this.$parent.searchContent(data);
    },
    length(val) {
      var length = val.length;
      for (var i = 0; i < val.length; i++) {
        if (val[i] == null) {
          length--;
        }
      }
      return length;
    },
    imgDrag(e) {
      e.preventDefault();
    }
  },
  filters: {
    tagNumber(val) {
      if (val == null) return 0;
      var tagNumber = val.split(",");
      return tagNumber.length;
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.bigPersonnelList {
  width: 340px;
  background: #ffffff;
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  position: relative;
  height: 100%;
  overflow-y: auto;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  .listsDone,
  .listsUnfinished {
    .title {
      width: 100%;
      height: 32px;
      line-height: 32px;
      background-color: #ededed;
      color: #000000;
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
      border-bottom: 1px solid #bbbbbb;
      text-align: left;
      padding-left: 8px;
      i {
        color: #2d8cf0;
        vertical-align: middle;
      }
    }
    .list {
      width: 100%;
      height: 80px;
      color: #000000;
      font-size: 14px;
      font-family: Roboto;
      border-bottom: 1px solid #bbbbbb;
      padding: 12px;
      cursor: pointer;
      .arrowRight {
        float: right;
        line-height: 57px;
        color: #aaaaaa;
      }
      .imgColor {
        width: 52px;
        height: 55px;
        text-align: center;
        float: left;
      }
      .listInfo {
        float: left;
        margin-left: 9px;
        span {
          display: block;
        }
        .listName {
          font-size: 14px;
          color: #333333;
          font-family: SourceHanSansSC-bold;
        }
        .IDCard,
        .state {
          font-size: 12px;
          color: #999999;
          font-family: SourceHanSansSC-reqular;
        }
      }
    }
  }
  .listsUnfinished .list.act {
    background: #e8e8e8;
  }
}
</style>
