<template>
  <div class="useHelp" @click.stop="ifCloseChangeLogShow">
    <div class="title">
      更新日志
      <!-- <i class="iconfont icon-guanbi1 close" @click="closeGuidelinesShow"></i> -->
      <Icon @click="closeChangeLogShow" class="close-nav close-btn" type="md-close" />
    </div>
    <div class="content">
      <div class="articleList">
        <div
          v-for="(item,index) in changeLogInfoList"
          :key="index"
          :class="index == openIndex?'act list':'list'"
        >
          <div class="crterTime"></div>
          <div class="resume">{{item.title}}</div>
          <div class="articleContent">
            <div class="introShow" v-html="item.intro"></div>
            <div class="open" @click="openInfo(index)">
              <span>
                <i class="iconfont icon-xiangxia1"></i>
              </span>
            </div>
            <div class="close" @click="closeInfo(index)">
              <span>
                <i class="iconfont icon-xiangshang"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Page
        class="pageInfo"
        :total="total"
        size="small"
        :page-size="pageSize"
        :current="pageIndex"
        @on-change="changePageInfo"
        show-total
      />
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as apis from "@/api/collection/index.js";
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      changeLogInfoList: [],
      openIndex: null
    };
  },
  mounted() {
    this.init();
  },
  watch: {},
  //方法集合
  methods: {
    openInfo(index) {
      this.openIndex = index;
    },
    closeInfo(index) {
      this.openIndex = null;
    },
    init() {
      const that = this;
      var params = {
        pageIndex: that.pageIndex,
        pageSize: that.pageSize
      };
      that.requestChangeLog(params);
    },
    changePageInfo(number) {
      const that = this;
      var params = {
        pageIndex: number,
        pageSize: that.pageSize
      };
      this.requestChangeLog(params);
    },
    // 请求用户帮助列表
    requestChangeLog(params) {
      const that = this;
      apis.changeLogInfo(params).then(res => {
        if (res.code == 200) {
          that.changeLogInfoList = res.data.data;
          that.total = res.data.total;
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    closeChangeLogShow() {
      this.$emit("closeChangeLogModal", false);
    },
    ifCloseChangeLogShow(evt) {
      if (evt.target.className == "close-btn") {
        return false;
      }
      // this.closeChangeLogShow();
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.useHelp {
  // position: absolute;
  position: fixed;
  right: 0;
  top: 67px;
  z-index: 99998;
  width: 29.5%;
  height: calc(100% - 67px;);
  background: #ffffff;
  box-shadow: 0px 7px 20px 0px rgba(40, 71, 117, 0.4) !important;
  .title {
    width: 100%;
    height: 42px;
    line-height: 42px;
    // background: #0668c8;
    text-align: center;
    position: relative;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    background: #0668c8;
    border-bottom: 1px solid #0668c8;
    .close-nav {
      font-size: 24px;
      float: right;
      line-height: 42px;
      padding-right: 4px;
      cursor: pointer;
    }
    .close {
      position: absolute;
      right: 7px;
      color: #ffffff;
    }
  }
  .content {
    font-size: 12px;
    color: #666666;
    // height: 100%;
    overflow-y: auto;
    height: calc(100% - 32px);

    .articleList {
      height: 100%;
      overflow: auto;
      position: relative;
      padding: 0 14px 20px 20px;
      .list {
        padding: 16px 0;
        border-bottom: 1px solid #ececec;
        .resume {
          color: #666666;
          font-size: 14px;
          margin-bottom: 7px;
          font-weight: bold;
        }
        .articleContent {
          max-height: 76px;
          overflow: hidden;
          position: relative;
          .introShow {
            // height: 64px;
          }
        }
        .open,
        .close {
          text-align: center;
          position: absolute;
          bottom: -7px;
          left: 0;
          width: 100%;
          height: 36px;
          background-image: linear-gradient(
            -180deg,
            rgba(245, 246, 247, 0) 0,
            #ffffff 95%
          );
          span {
            cursor: pointer;
            display: block;

            cursor: pointer;
            display: block;
            position: absolute;
            bottom: 0;
            left: 49%;
            z-index: 99999;
            i {
              color: #999;
            }
          }
        }
        .close {
          span {
            display: none;
          }
        }

        .template {
          .li {
            display: inline-block;
            padding: 6px 5px 2px;
            i {
              color: #0668c8;
              font-size: 14px;
            }
            a {
              font-size: 12px;
              color: #333333;
              text-decoration: underline;
            }
          }
        }
      }
      .list.act {
        .articleContent {
          max-height: 100% !important;
        }
        .open {
          span {
            display: none;
          }
        }
        .close {
          position: inherit;
          height: 22px;
          span {
            display: block;
          }
        }
      }
    }
  }
}
/deep/.pageInfo.ivu-page {
  width: 100%;
  height: 36px;
  text-align: center;
  position: absolute;
  bottom: 0px;
  left: 12px;
  background: #ffffff;
}
</style>
