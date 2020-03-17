<template>
  <div>
    <header>
      <div class="logo">
        <span
          :class="'proj-name ' + ((($config.project.name.split('').length -1) == index) ? 'last' : '') "
          :key="index"
          v-for="(item,index) in $config.project.name.split('')"
        >{{item}}</span>
        <span v-if="$config.project.version" class="proj-version">{{this.$config.project.version}}</span>
        <span class="nav">
          <span @click="backIndex" style="cursor:pointer;">首页></span>
          <slot></slot>
          <span :title="title">{{title}}</span>
        </span>
      </div>
      <div v-if="showSearch" class="result-search-box">
        <span class="search-btn" @click="handleSearch">
          <span>搜索一下</span>
        </span>
        <div class="input">
          <!-- :class="this.$config.project.locale == 'bz' ? search-bgc : '' " -->
          <input
            :class="this.$config.project.locale == 'bz' ? 'search-bgc' : '' "
            type="text"
            v-model="keywords"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <!-- 头部导航 -->
      <switchView ref="switchView" @viewIndex="getViewIndex"></switchView>
    </header>
    <!-- 列表 -->

    <!-- 个人 -->
    <personModal
      v-show="statusList.personModalShow"
      ref="personModal"
      :userData="userData"
      @openMyNavModal="openMyNav"
      @openFeedbackModal="openFeedback"
      @openGuideModal="openGuide"
      @openChangModal="openChangeLog"
    ></personModal>
    <!-- 消息 -->
    <newsModal
      v-show="statusList.newsModalShow"
      ref="newsModal"
      @openNewsModal="openMessageDetails"
    ></newsModal>
    <!-- 侧边模态框 -->
    <!-- 应用 -->
    <transition name="appInforArea">
      <appModal
        v-show="statusList.appModalShow"
        ref="appModal"
        @closeAppModal="closeApp"
        class="app"
      ></appModal>
    </transition>
    <!-- 我的导航 -->
    <transition name="appInforArea">
      <myNavModal v-show="statusList.myNavModalShow" @closemyNavModal="closemyNav" ref="myNavModal"></myNavModal>
    </transition>
    <!-- 使用帮助，常见问题 -->
    <transition name="guidelinesArea">
      <guidelinesModal
        v-show="statusList.guidelinesShow"
        ref="guidelines"
        @closeGuidelinesModal="closeGuidelines"
        class="guidelines"
      ></guidelinesModal>
    </transition>
    <!-- 更新日志 -->
    <transition name="changeLogArea">
      <changeLogModal
        v-show="statusList.changeLogShow"
        ref="changeLog"
        @closeChangeLogModal="closeChangeLog"
        class="changeLog"
      ></changeLogModal>
    </transition>
    <!-- 消息(通知，更新，反馈) -->
    <transition name="messageArea">
      <messageModal
        v-show="statusList.messageDetailsShow"
        ref="messageDetails"
        :msgType="msgType"
        @closeMessageModal="closeMessage"
        class="message"
      ></messageModal>
    </transition>
    <!-- 意见反馈 -->
    <transition name="feedbackArea">
      <feedbackModal
        v-show="statusList.feedbackShow"
        ref="feedback"
        @closeFeedbackModal="closeFeedbackModal"
        class="feedbackModal"
      ></feedbackModal>
    </transition>
    <!-- 物流，话单，资金 -->
    <transition name="nodesDetailedArea">
      <nodesDetailed
        ref="nodesDetailed"
        :modal="nodeDetailsAllData"
        v-show="statusList.nodesDetailedShow"
        class="nodesDetailed"
        @closeNodesDetailed="closeNodesDetailed"
        @changePage="changePage"
      ></nodesDetailed>
    </transition>
  </div>
</template>
<script>
import switchView from "@/components/assembly/SwitchView";
import personModal from "@/components/assembly/PersonModal";
import newsModal from "@/components/assembly/NewsModal";
import appModal from "@/components/assembly/AppList";
import guidelinesModal from "@/components/assembly/Guidelines";
import messageModal from "@/components/assembly/MessageDetails";
import feedbackModal from "@/components/assembly/FeedBack";
import myNavModal from "@/components/assembly/MyNav";
import changeLogModal from "@/components/assembly/ChangeLog";
import nodesDetailed from "@/components/assembly/NodesDetailed";
import { truncate } from "fs";

export default {
  name: "AppHeader",
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Object,
      default: null
    },
    userData: {
      type: Object,
      default: null
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    nodeDetailsAllData: {
      type: Object,
      default: null
    },
    keyword: {
      type: String,
      default: ""
    }
  },
  components: {
    switchView,
    personModal,
    newsModal,
    appModal,
    guidelinesModal,
    messageModal,
    feedbackModal,
    myNavModal,
    nodesDetailed,
    changeLogModal
  },
  data() {
    return {
      statusList: {
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false,
        changeLogShow: false
      },
      msgType: "",
      keywords: ""
    };
  },
  methods: {
    handleSearch() {
      this.$emit("on-search", this.keywords);
    },
    /**
     * 个人，消息，应用切换
     * @function getViewIndex
     * @author erbing
     */
    getViewIndex(index) {
      this.statusList.newsModalShow = false;
      this.statusList.appModalShow = false;
      this.statusList.personModalShow = false;
      this.statusList.myNavModalShow = false;
      this.statusList.guidelinesShow = false;
      this.statusList.changeLogShow = false;
      if (index == "0") {
        this.statusList.personModalShow = true;
      } else if (index == "1") {
        // this.statusList.newsModalShow = true;
        this.statusList.appModalShow = true;
        // this.$$refs['personModal'].statusList.myNavModalShow = false;
        this.statusList.myNavModalShow = false;
      } else if (index == "2") {
        this.statusList.appModalShow = true;
        // this.$$refs['personModal'].statusList.myNavModalShow = false;
        this.statusList.myNavModalShow = false;
      }
    },
    backIndex() {
      let userInfo = this.$store.state.userInfo;
      let dataAuth = userInfo.dataAuth;
      if (dataAuth == "4") {
        this.$router.push({
          path: "/onlineCollect/dashboard"
        });
      } else {
        this.$router.push({
          path: "/index"
        });
      }
    },
    /**
     * 打开我的导航 + 请求数据
     * @function openMyNav
     */
    openMyNav(t) {
      this.$refs["myNavModal"].getDataList();
      this.statusList.personModalShow = false;
      this.statusList.myNavModalShow = t;
      // alert(121)
    },
    /**
     * 打开个人（使用帮助，常见问题）
     * @function openGuide
     * @author erbing
     */
    openGuide(t) {
      this.statusList.personModalShow = false;
      this.statusList.guidelinesShow = t;
      this.$refs.guidelines.getType("使用帮助");
    },
    /**
     * 打开更新日志
     * @function openChangeLog
     * @author huang
     */
    openChangeLog(t) {
      this.statusList.personModalShow = false;
      this.statusList.changeLogShow = t;
      // this.$refs.guidelines.getType("使用帮助");
    },
    /**
     * 打开对应的消息弹框
     * @function openMessageDetails
     * @author erbing
     */
    openMessageDetails(txt) {
      var me = this;
      me.statusList.newsModalShow = false;
      me.msgType = "name" + (txt + 1);
      me.statusList.messageDetailsShow = true;
      this.$refs.messageDetails.getMessageType(me.msgType);
    },
    /**
     * 关闭应用
     * @function closeApp
     * @author erbing
     */
    closeApp(f) {
      this.statusList.appModalShow = f;
    },
    /**
     * 关闭我的导航
     * @function closemyNav
     */
    closemyNav(f) {
      this.statusList.myNavModalShow = f;
    },
    /**
     * 打开意见反馈
     * @function closeFeedbackModal
     * @author erbing
     */
    openFeedback(t) {
      this.statusList.personModalShow = false;
      this.statusList.feedbackShow = t;
    },
    /**
     * 关闭意见反馈
     * @function closeFeedbackModal
     * @author erbing
     */
    closeFeedbackModal(f) {
      this.statusList.feedbackShow = f;
    },
    /**
     * 关闭个人（使用帮助，常见问题切换）
     * @
     * @author erbing
     */
    closeGuidelines(f) {
      this.statusList.guidelinesShow = f;
    },
    /**
     * 关闭更新日志
     * @
     * @author huang
     */
    //
    closeChangeLog(f) {
      this.statusList.changeLogShow = f;
    },
    /**
     * 关闭消息弹框
     * @function closeMessage
     * @author erbing
     */
    closeMessage(f) {
      this.statusList.messageDetailsShow = f;
    },
    /**
     * 关闭 （物流，话单，资金面板） （后期备用）
     * @function getPhotos
     * @author Erbing
     */
    closeNodesDetailed(data) {
      this.statusList.nodesDetailedShow = data;
    },
    /**
     * 根据开始，结束时间的选取重新获取数据 （后期备用）
     * @function getPhotos
     * @author Erbing
     */
    changePage(date, type) {
      this.$emit("on-change-page", date, type);
    }
  },
  watch: {
    items: {
      handler(val) {
        this.statusList = val;
      },
      immediate: true,
      deep: true
    },
    keyword: {
      handler(val) {
        this.keywords = val;
      },
      immediate: true
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
@imageUrl: "../../../";
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
header {
  height: 68px;
  .post(a);
  left: 0;
  top: 0;
  right: 0;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(27, 65, 127, 1) 0%,
    rgba(20, 56, 115, 1) 100%
  );
  z-index: 10;
  //background:pink;
  .logo {
    padding-left: 28px;
    width: auto;
    height: 68px;
    // line-height: 64px;
    float: left;
    position: relative;
    display: inline-flex;
    align-items: center;
    .bz-editor {
      display: none;
    }
    // background-color: blue;
    // background:linear-gradient(180deg,rgba(27,65,127,1) 0%,rgba(20,56,115,1) 100%);
    // background:url('@{imageUrl}static/images/logo-bg.png') 0 0 no-repeat;
    .proj-name {
      // min-width: 200px;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      //text-shadow: -2px 2px 3px #000;
      background: -webkit-linear-gradient(top, #fff, #74c2ff); /* 背景色渐变 */
      -webkit-background-clip: text; /* 规定背景的划分区域 */
      -webkit-text-fill-color: transparent; /* 防止字体颜色覆盖 */
    }
    .proj-version {
      font-size: 12px;
      color: #c0d3e9;
      background: #2c579e;
      border-radius: 1px;
      display: inline-block;
      padding: 2px 8px;
      margin-left: 10px;
    }
    .nav {
      // margin-left:70px;
      .post(r);
      left: 60px;
      // top: -2px;
      color: #d6e3ff;
      text-shadow: -2px 2px 3px #000;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      span {
        color: #6280c7;
        text-shadow: -2px 2px 3px #000;
        &:last-child {
          color: #cecaca;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 130px;
        }
      }
      &:before {
        content: " ";
        width: 1px;
        height: 21px;
        border-left: 1px solid;
        left: -27px;
        position: absolute;
        top: 0;
      }
    }
  }

  .result-search-box {
    width: 27.8%;
    height: 47px;
    .post(a);
    top: 5px;
    left: 50%;
    margin-left: -13.9%;
    z-index: 99;
    display: inline-flex;
    align-items: center;
    .input {
      .post(a);
      left: 0;
      right: 77px;
      .iconfont {
        font-size: 20px;
        color: #b7deff;
        cursor: pointer;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
      }
      i:nth-child(1) {
        .post(a);
        right: 20px;
        top: 12px;
      }
      i:nth-child(2) {
        .post(a);
        right: 25px;
        top: 10px;
      }
      input {
        width: 100%;
        padding: 0 20px 0 20px;
        height: 50px;
        // line-height:50px;
        line-height: 1;
        outline: none;
        border: none;
        font-size: 14px;
        color: #fff;
        background: url("@{imageUrl}static/images/input.png") 0 0 no-repeat;
        background-size: 100% 100%;
      }
    }
    .search-btn {
      .post(a);
      top: 0;
      right: 0;
      width: 80px;
      height: 33px;
      // float:right;
      line-height: 33px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      margin-top: 9px;
      font-size: 14px;
      font-weight: bold;
      display: inline-block;
      background: url("@{imageUrl}static/images/search-btn.png") 0 0 no-repeat;
      background-size: 100% 100%;
      .search-bgc {
        background-color: yellow;
      }
      span {
        background: -webkit-linear-gradient(
          top,
          #fff,
          #74c2ff
        ); /* 背景色渐变 */
        -webkit-background-clip: text; /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent; /* 防止字体颜色覆盖 */
      }
    }
  }
}
.app {
  transform: translate3d(0, 0, 0);
}
.appInforArea-enter-active,
.appInforArea-leave-active {
  transition: all 0.5s;
}
.appInforArea-enter,
.appInforArea-leave-active {
  transform: translate3d(400px, 0, 0);
}
.message {
  transform: translate3d(0, 0, 0);
}
.messageArea-enter-active,
.messageArea-leave-active {
  transition: all 0.5s;
}
.messageArea-enter,
.messageArea-leave-active {
  transform: translate3d(100%, 0, 0);
}
.personInfo {
  transform: translate3d(0, 0, 0);
}
.personInforArea-enter-active,
.personInforArea-leave-active {
  transition: all 0.5s;
}
.personInforArea-enter,
.personInforArea-leave-active {
  transform: translate3d(535px, 0, 0);
}
.nodesDetailed {
  transform: translate3d(0, 0, 0);
}
.nodesDetailedArea-enter-active,
.nodesDetailedArea-leave-active {
  transition: all 0.5s;
}
.nodesDetailedArea-enter,
.nodesDetailedArea-leave-active {
  transform: translate3d(535px, 0, 0);
}

.guidelines {
  transform: translate3d(0, 0, 0);
}
.guidelinesArea-enter-active,
.guidelinesArea-leave-active {
  transition: all 0.5s;
}
.guidelinesArea-enter,
.guidelinesArea-leave-active {
  transform: translate3d(100%, 0, 0);
}
.changeLog {
  transform: translate3d(0, 0, 0);
}
.changeLogArea-enter-active,
.changeLogArea-leave-active {
  transition: all 0.5s;
}
.changeLogArea-enter,
.changeLogArea-leave-active {
  transform: translate3d(100%, 0, 0);
}
.feedbackModal {
  transform: translate3d(0, 0, 0);
}
.feedbackArea-enter-active,
.feedbackArea-leave-active {
  transition: all 0.5s;
}
.feedbackArea-enter,
.feedbackArea-leave-active {
  transform: translate3d(0, 259px, 0);
}

.history {
  transform: translate3d(0, 0, 0);
}
.historyModal-enter-active,
.historyModal-leave-active {
  transition: all 0.5s;
}
.historyModal-enter,
.historyModal-leave-active {
  transform: translate3d(400px, 0, 0);
}
@media screen and (max-width: 1620px) {
  header {
    .result-search-box {
      left: 51%;
    }
    .r_btn {
      width: 306px;
      .personal {
        // left:0;
        left: -1px;
      }
      .btn {
        width: 117px;
      }
      .news {
        // left:98px;
        left: 98px;
      }
      .app {
        // left:196px;
        left: 197px;
      }
    }
  }
  .upload-picture {
    left: 59%;
  }
}
</style>



