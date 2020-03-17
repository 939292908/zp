<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 11:12:18
 * @LastEditTime: 2019-09-20 17:47:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="religiousOverview-box">
    <div class="over-show" v-show="isShowOver">
      <div class="over-header">
        <span>宗教脉络体系概述</span>
        <span class="control" @click="changeOver">
          <i class="iconfont icon-suoxiao1"></i>
        </span>
      </div>
      <div class="over-content">
        <p class="regName">{{religiousInfo.systemName}}</p>
        <p class="allPersonNum">
          弟子总人数：
          <span>{{religiousInfo.totalCount}}</span>
        </p>
        <p class="selfPersonNum" v-if="isShowSelfDisciple">
          亲传弟子人数：
          <span>{{religiousInfo.studentCount}}</span>
        </p>
        <div
          class="desBox"
          :style="'max-height:'+boxHeight +'px'"
          v-html="religiousInfo.description"
        ></div>
        <p :class="{unfold: isUnfoldAll, regain: !isUnfoldAll}" @click="unfoldAll">
          <i v-show="isUnfoldAll" class="iconfont icon-xiangxia1"></i>
          <i v-show="!isUnfoldAll" class="iconfont icon-xiangshang"></i>
        </p>
      </div>
    </div>
    <div class="over-hide" v-show="!isShowOver">
      <p>
        宗教脉络体系概述
        <i @click="changeOver" class="iconfont icon-fangda"></i>
      </p>
    </div>
  </div>
</template>

<script>
import * as apis from "@/api/mapJoin/index.js";
export default {
  props: {
    // 亲传弟子人数
    isShowSelfDisciple: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      isShowOver: true,
      isUnfoldAll: true,
      religiousInfo: {},
      boxHeight: 300
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    changeOver() {
      this.isShowOver = !this.isShowOver;
    },
    getInfo() {
      let systemId = this.$route.query.id;
      apis.getReligiousOverviewDept(systemId).then(res => {
        if (res.code === 200) {
          this.religiousInfo = res.data;
        }
      });
    },
    unfoldAll() {
      this.isUnfoldAll = !this.isUnfoldAll;
      this.boxHeight = this.isUnfoldAll ? 300 : window.innerHeight - 265;
      window.addEventListener("resize", e => {
        this.boxHeight = this.isUnfoldAll ? 300 : e.target.innerHeight - 265;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.religiousOverview-box {
  position: fixed;
  right: 20px;
  top: 20px;
  .over-show {
    width: 304px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e3e3e3;
    box-shadow: 2px 2px 10px 0 #aaa;
    .over-header {
      height: 38px;
      background-color: #0668c8;
      color: #fff;
      font-size: 12px;
      padding: 0 15px;
      line-height: 38px;
      .control {
        float: right;
        cursor: pointer;
      }
    }
    .over-content {
      padding: 15px;
      color: #333333;
      .regName {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .allPersonNum,
      .selfPersonNum {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
        span {
          color: #333;
          font-family: Arial;
          font-weight: bold;
        }
      }
      .desBox {
        color: #666;
        overflow-y: auto;
        margin: 20px 0;
        p {
          line-height: 1.5;
        }
      }
    }
    .unfold {
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      color: #999;
    }
    .regain {
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      color: #999;
    }
  }
  .over-hide {
    width: 34px;
    background-color: #0668c8;
    border-radius: 4px;
    padding: 6px 11px 0 11px;
    color: #fff;
    font-size: 12px;
    line-height: 1.3;
    i {
      font-size: 12px;
      line-height: 2;
      cursor: pointer;
    }
  }
}
</style>
