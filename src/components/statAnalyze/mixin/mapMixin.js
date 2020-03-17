/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 12:04:19
 * @LastEditTime: 2019-11-08 14:39:22
 * @LastEditors: Please set LastEditors
 */
/**
 * 统计分析的混入功能
 */
export const mapMixin = {
  data() {
    return {
      statusList: {
        myNavModalShow: false,
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        MultiModal: false,
        ShowMultiModal: true,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false
      },
    }
  },
  methods: {
    /**
     * 窗口大小调整
     * @function resizeHandler
     * @author julie
     */
    resizeHandler(height = 110) {
      this.$nextTick(() => {
        if (this.$refs.wrapperDetail) {
          let wrapperDetailHeight = this.$refs.wrapperDetail.clientHeight
          if (wrapperDetailHeight - height < 300) {
            this.tableHeight = 300
          } else {
            this.tableHeight = wrapperDetailHeight - height
          }
        } else {
          this.tableHeight = 300
        }
      });
    },
    /**
     * 容器点击事件
     * @author julie
     */
    // handleWrapperClick(event) {
    //   this.statusList.uploadImg = false;
    //   this.statusList.personModalShow = false;
    //   this.statusList.newsModalShow = false;
    //   let appElement = document.querySelector('div.app-list.app')
    //   if (event.path.indexOf(appElement) == -1) {
    //     this.statusList.appModalShow = false;
    //   }
    //   // this.statusList.appModalShow = false;
    //   this.statusList.messageDetailsShow = false;
    //   this.statusList.guidelinesShow = false;
    //   this.statusList.feedbackShow = false;
    //   this.statusList.myNavModalShow = false;
    // },
    /**
     * 个人，消息，应用切换
     * @function getViewIndex
     * @author erbing
     */
    getViewIndex(index) {
      this.statusList.newsModalShow = false;
      this.statusList.appModalShow = false;
      this.statusList.personModalShow = false;
      if (index == '0') {
        this.statusList.personModalShow = true;
      } else if (index == '1') {
        this.statusList.newsModalShow = true;
      } else if (index == '2') {
        this.statusList.appModalShow = true;
      }
    },
  }
}
