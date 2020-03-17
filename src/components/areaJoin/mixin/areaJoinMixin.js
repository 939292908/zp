/**
 * 图谱采集的混入功能
 */  
export const areaJoinMixin = {
  data(){
    return {
      statusList: {
        myNavModalShow: false,
        uploadImg : false,
        personModalShow : false,        
        newsModalShow : false,       
        appModalShow : false,
        changeLogShow : false,
        guidelinesShow : false,
        messageDetailsShow : false,
        feedbackShow : false,
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
      topTagColors : {
        '户' : '#4298c7',
        '案' : '#eb4826',
        '朝' : '#6668c6',
        '境' : '#8d3b65',
        '社' : '#bc4166',
        '危' : '#f19d38',
        '宗' : '#bf6b27',
        '打' : '#bc4166',
        '族' : '#f19d38',
        '境' : '#6668c6',
        '暴' : '#8d3b65',
        '族' : '#f19d38',	
      },
      tplxColorList : {
        '户籍人口家谱图'  : '#4298c7',
        '涉案人员案件关系图' : '#eb4826',
        '私朝人员关系图' : '#6668c6',
        '朝觐人员关系图' : '#6668c6',
        '出入境人员关系图' : '#8d3b65',
        '涉案人员社会关系图' : '#bc4166',
        '涉稳高危人员家谱图' : '#f19d38',
        '涉稳高危人员家族图' : '#f19d38',
        '宗教极端思想历史传承图' : '#bf6b27',
        '家族族谱关系图' : '#f19d38',
        '历年危安涉案（事）件涉案（线）人员网络关系图' : '#eb4826',
        '宗教极端思想传承图' : '#bf6b27',
        '历年被打击处理人员分布示意图' : '#bc4166',
        '出入境人员分布图' : '#6668c6',
        '境外涉恐涉暴人员网络关系图' : '#8d3b65'
      }, 
      colors:['#cfc5de', '#b8f2a7', '#8688ba', '#88a27c', '#c190a8', '#a1bab4', '#cecd97','#bb9391','#9dc5ea','#e6dd77']
    }
  },
  methods: {
    /**
     * 窗口大小调整
     * @function resizeHandler
     * @author julie
     */
    resizeHandler() {
      this.$nextTick(()=>{
        if(this.$refs.graphical) {
          let ch = this.$refs.graphical.clientHeight
          let cw = this.$refs.graphical.clientWidth
          this.hydra.setSize({
            width : cw,
            height : ch
          });
        } else {
          this.hydra.setSize({
            width : 1300,
            height : 600
          });
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
    // 两两组合ID
    getGroupIds(oids) {
      for (var a = []; a.push([]) < oids.length; );
      var b = Math.pow(2, oids.length) - 1;
      for (var i = 1; i <= b; i++) {
        var c = [];
        for (var s = i, k = 0; s > 0; s >>= 1, k++) {
          if (s & (1 == 1)) c.push(oids[k]);
        }
        a[c.length - 1].push(c);
      }
      return a[1];
    },
  }
}