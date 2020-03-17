<template>
  <div class="switchRightView">
    <!-- 个人 -->
    <personModal
      v-show="statusList.personModalShow"
      ref="personModal"
      @openFeedbackModal="openFeedback"
      @openGuideModal="openGuide"
      @openMyNavModal="openMyNav"
      @openChangModal="openChangeLog"
    ></personModal>
    <!-- 消息 -->
    <newsModal
      v-show="statusList.newsModalShow"
      ref="newsModal"
      @openNewsModal="openMessageDetails"
    ></newsModal>
    <!-- 应用 -->
    <transition name="appInforArea">
      <appModal
        v-show="statusList.appModalShow"
        ref="appModal"
        @closeAppModal="closeApp"
        class="app"
      ></appModal>
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
    <!-- 我的导航 -->
    <transition name="guidelinesArea">
      <myNavModal v-show="statusList.myNavModalShow" @closemyNavModal="closemyNav" ref="myNavModal"></myNavModal>
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
export default {
  name: "switchRightView",
  components: {
    switchView,
    personModal,
    newsModal,
    appModal,
    guidelinesModal,
    messageModal,
    feedbackModal,
    myNavModal,
    changeLogModal
  },
  props: {
    items: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      statusList: {},
      msgType: ""
      // onlinecount:'',
    };
  },
  methods: {
    momentLoadning() {
      var wsurl = `ws://172.16.3.27:20001/idsecurity/websocket/${this.$store.state.userInfo.userName}`;
      var websocket;
      var i = 0;
      var userName = this.$store.state.userInfo.userName;
      var that = this;
      if (window.WebSocket) {
        websocket = new WebSocket(wsurl);
        //连接建立
        websocket.onopen = function(event) {
          websocket.send(userName);
        };
        //收到消息
        websocket.onmessage = function(event) {
          var msg = JSON.parse(event.data); //解析收到的json消息数据
          that.onlinecount = msg.count;
        };
        //发生错误
        websocket.onerror = function(event) {
          i++;
          console.log("Connected to WebSocket server error");
        };
        //连接关闭
        websocket.onclose = function(event) {
          i++;
          console.log("websocket Connection Closed. ");
          websocket.send(userName);
        };
      } else {
        alert("该浏览器不支持web socket");
      }
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
     * 打开我的导航 + 获取数据
     * @function openMyNav
     */
    openMyNav(t) {
      this.$refs["myNavModal"].getDataList();
      this.statusList.personModalShow = false;
      this.statusList.myNavModalShow = t;
    },
    /**
     * 关闭我的导航
     * @function closemyNav
     */
    // <!-- nav-9 -->
    closemyNav(f) {
      this.statusList.myNavModalShow = f;
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
    $onlinecount: {
      handler(val) {},
      immediate: true
    },
    onlinecount: {
      handler(val) {},
      immediate: true
    }
    // '$route': {
    //     handler: function(val,oldVal){
    //       console.log('val',oldVal);
    //     },
    //     immediate:true,
    //   },
    // $route(to,from){
    //     console.log('from.path',from.path);
    //   },
  },
  created() {
    // this.momentLoadning();
  }
};
</script>
<style lang="less" scoped>
.online-count {
  line-height: 59px;
  width: 200px;
  position: absolute;
  top: 0;
  right: 300px;
  z-index: 999;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  // .icon-person{

  // }
  i {
    position: absolute;
    top: 2px;
    left: 50px;
    .iconfont {
      font-size: 20px !important;
    }
    .icon-geren:before {
      content: "\e60f";
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
</style>




