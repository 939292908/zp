<template>
  <!-- 图谱概述，显示图谱中相同的节点的数据 -->
  <div class="map-overview" v-show="model">
    <div class="level">
      {{title}}
      <span class="level-nums">{{list.length}}</span>
      <i @click="handleClose" class="iconfont icon-suoxiao1 close-panel"></i>
    </div>
    <div
      class="same-list"
      :style="{'height': hasRGAuth ? 'calc(100% - 90px)' : 'calc(100% - 35px)'}"
    >
      <div
        :style="{'border':'2px solid ' + item.color,'box-shadow': oldItem == item  ? '0px 0px 6px 0px ' + item.color : 'none'}"
        class="same-list-item"
        v-for="(item,index) in list"
        :key="index"
        @click.stop.prevent="handleClick(item)"
      >
        <div class="img">
          <!-- <img v-lazy="getImagePath(item.properties.picUrl)" alt /> -->
          <img :src="getImagePath(item.properties.picUrl)" alt />
        </div>
        <div class="info">
          <span
            :title="item.properties ? item.properties.XM : ''"
          >{{item.properties ? item.properties.XM : ''}}</span>
          <span>{{item.properties ? item.properties.SFZHM : ''}}</span>
        </div>
        <div class="tag">
          <span :style="{'border':'2px solid ' + item.color}">{{item.count}}</span>
        </div>
      </div>
    </div>
    <div class="map-overview-footer" v-if="hasRGAuth">
      <i-button
        type="primary"
        v-if="this.hasPageAuth(this.constantPageMap.PAGE_Relation_Check_ID)"
        :disabled="list.length <= 1"
        @click.native="handleMethod('/relationCheck')"
      >关系挖掘</i-button>
      <i-button
        type="primary"
        v-if="this.hasPageAuth(this.constantPageMap.PAGE_Group_Analyse_ID)"
        :disabled="list.length <= 1"
        @click.native="handleMethod('/groupAnalyse')"
      >群体分析</i-button>
    </div>
  </div>
</template>
<script>
import { transferParameters } from "@/tools/units.js";
export default {
  name: "MapOverview",
  props: {
    title: {
      type: String,
      default: "共同联系人:"
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      model: true,
      oldItem: null
    };
  },
  computed: {
    hasRGAuth() {
      return (
        this.hasPageAuth(this.constantPageMap.PAGE_Relation_Check_ID) ||
        this.hasPageAuth(this.constantPageMap.PAGE_Group_Analyse_ID)
      );
    }
  },
  methods: {
    // 点击列表数据的事件
    handleClick(item) {
      if (
        this.oldItem &&
        this.oldItem.properties.SFZHM == item.properties.SFZHM
      ) {
        this.oldItem = null
      } else {
        this.oldItem = item
      }
      this.$emit("on-click", this.oldItem);
    },
    // 清除选中
    resetSelection() {      
      this.oldItem = null;
    },
    handleClose() {
      this.model = false;
      this.$emit("input", this.model);
      this.$emit("on-close");
    },
    // 关系挖掘// 群体分析
    handleMethod(path) {
      let data = this.list.map(item => item.properties.SFZHM);
      let query = { sfzhm: data.join() };
      let params = JSON.stringify(query);
      transferParameters(this, path, params);
    }
  },
  watch: {
    items: {
      handler(val) {
        this.list = val;
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(val) {
        this.model = val;
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.map-overview {
  width: 350px;
  position: absolute;
  top: 25px;
  right: 30px;
  z-index: 1000;
  background: #fff;
  min-height: 200px;
  box-shadow: 0px 0px 12px -8px #000;
  height: 70%;
  .level {
    padding: 0 8px;
    height: 35px;
    line-height: 35px;
    border-bottom: 2px solid #7197b1;
    color: #ffffff;
    background-color: #0668c8;
    border-radius: 4px 4px 0 0;
    font-size: 12px;
    font-weight: 700;
    .level-nums {
      color: #ffffff;
    }
    .close-panel {
      float: right;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .same-list {
    padding: 6px;
    margin-right: 3px;
    cursor: pointer;
    height: calc(100% - 90px);
    overflow-y: auto;
    position: absolute;
    bottom: 50px;
    top: 36px;
    width: 100%;
    .same-list-item {
      padding: 4px;
      margin-bottom: 8px;
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;
      .info {
        padding-left: 2px;
        flex: 1 1 auto;
        width: calc(100% - 90px);
        span {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:first-child {
            font-size: 14px;
          }
          &:last-child {
            color: #818181;
          }
        }
      }
      .img {
        height: 100%;
        padding: 2px 4px 2px 2px;
        flex: 1 1 42px;
        img {
          height: 100%;
        }
      }
      .tag {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          max-width: 48px;
          border-radius: 4px;
          text-align: center;
          padding: 0 6px;
        }
        flex: 1 1 48px;
      }
    }
  }
  .map-overview-footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    width: 100%;
    border-top: 1px solid #ccc;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    > button {
      width: 40%;
      background: #0668c8;
    }
  }
  .same-list::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .same-list::-webkit-scrollbar-track {
    border-radius: 5px;
    background: none;
  }
  .same-list::-webkit-scrollbar-thumb {
    background-color: rgba(32, 76, 157, 1);
    border-radius: 5px;
  }
  .same-list::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 183, 245, 1);
  }
  .same-list::-webkit-scrollbar-corner {
    background-color: #dadada;
  }
}
</style>



