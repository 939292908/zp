/**
 * 图谱采集的混入功能
 */
export const mapJoinMixin = {
  data() {
    return {
      statusList: {
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
        loadingTpmcShow: false,
        myNavModalShow: false,
      },
      topTagColors: {
        '户': '#4298c7',
        '案': '#eb4826',
        '朝': '#6668c6',
        '境': '#8d3b65',
        '社': '#bc4166',
        '危': '#f19d38',
        '宗': '#bf6b27',
        '打': '#bc4166',
        '族': '#f19d38',
        '境': '#6668c6',
        '暴': '#8d3b65',
        '族': '#f19d38',
      },
      tplxColorList: {
        '户籍人口家谱图': '#4298c7',
        '涉案人员案件关系图': '#eb4826',
        '私朝人员关系图': '#6668c6',
        '朝觐人员关系图': '#6668c6',
        '出入境人员关系图': '#8d3b65',
        '涉案人员社会关系图': '#bc4166',
        '涉稳高危人员家谱图': '#f19d38',
        '涉稳高危人员家族图': '#f19d38',
        '宗教极端思想历史传承图': '#bf6b27',
        '家族族谱关系图': '#f19d38',
        '历年危安涉案（事）件涉案（线）人员网络关系图': '#eb4826',
        '宗教极端思想传承图': '#bf6b27',
        '历年被打击处理人员分布示意图': '#bc4166',
        '出入境人员分布图': '#6668c6',
        '境外涉恐涉暴人员网络关系图': '#8d3b65'
      },
    }
  },
  methods: {
    /**
     * 窗口大小调整
     * @function resizeHandler
     * @author julie
     */
    resizeHandler(height = 110, boxH = 180) {
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
        if (this.$refs.contBox) {
          let boxHeight = this.$refs.contBox.clientHeight
          if (boxHeight - boxH < 350) {
            this.boxHeight = 350
          } else {
            this.boxHeight = boxHeight - boxH
          }
        } else {
          this.boxHeight = 350
        }
      });
    },
    /**
     * 容器点击事件
     * @author julie
     */
    // handleWrapperClick(event) {
    //   this.statusList.uploadImg=false;
    //   this.statusList.personModalShow=false;
    //   this.statusList.newsModalShow=false;
    //   let appElement = document.querySelector('div.app-list.app')
    //   if(event.path.indexOf(appElement) == -1) {
    //     this.statusList.appModalShow=false;
    //   }
    //   // this.statusList.appModalShow=false;
    //   this.statusList.messageDetailsShow=false;
    //   this.statusList.guidelinesShow=false;
    //   this.statusList.feedbackShow=false;
    //   this.statusList.myNavModalShow = false;
    // },
  }
}
