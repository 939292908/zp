<template>
  <div class="result" @click="status.personModalShow=false;status.newsModalShow=false;status.appModalShow=false;status.messageDetailsShow=false;status.guidelinesShow=false;status.uploadImg=false;">
    <header>
      <div class="logo">
        <span class="proj-name">{{this.$config.project.name}}</span>
        <!-- <span class="nav"><span>{{ $t('message.relation.home') }}></span>{{ $t('message.relation.searchResult') }}</span> -->
        <span class="nav">
          <span @click="backIndex()" style="cursor:pointer;">首页></span>
          <span @click="backSearchTp()" style="cursor:pointer;">以人搜图></span>
          <span class="nav-cur">搜索结果</span>
        </span>
      </div>
      <div class="result-search-box">
        <span class="search-btn" @click="getByRyData">
          <span>搜索一下</span>
        </span>
        <div class="input">
          <!-- <i class="iconfont icon-tianjiazhaopian" @click.stop="status.uploadImg=!status.uploadImg"></i> -->
          <!-- <i class="iconfont icon-yuyin"></i> -->
          <input type="text" v-model="keyword" @keyup.enter="getByRyData"/>
        </div>
      </div>
      <switchView ref="switchView" v-on:viewIndex="getViewIndex"></switchView>
    </header>

    <!-- 语言切换 -->
    <!-- <SwitchLanguage ref="SwitchLanguage" v-on:switchLanguage="switchLanguage"></SwitchLanguage> -->

    <!-- 上传图片 -->
    <div class="upload-picture" v-show="status.uploadImg" @click.stop="status.uploadImg=!status.uploadImg">
      <ul class="upload-list" @click.stop="status.uploadImg=!status.uploadImg">
        <li v-for="(item,index) in uploadList" :key="index">
          <span class="img"><i class="iconfont icon-tupian"></i></span>
          <span class="name">{{item.name}}</span>
          <span class="size">{{item.sizes+'KB'}}</span>
          <span class="progress"><Progress :percent="100"></Progress></span>
          <!-- <span @click.native="handleRemove(item)"><i class="iconfont icon-guanbi2fill"></i></span> -->
          <Icon type="md-close-circle" @click.native="handleRemove(item)"></Icon>
        </li>
      </ul>
      <Upload 
        ref="upload" 
        :show-upload-list="false" 
        :format="['jpg','jpeg','png']" 
        :max-size="2048" 
        :before-upload="handleBeforeUpload" 
        :on-format-error="handleFormatError" 
        :on-exceeded-size="handleMaxSize" 
        type="drag" 
        action="http://10.23.66.142:2489/iTap_OrientService/Vertex/v1/searchByKeyword">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击上传文件，或者直接将文件拖到这里</p>
        </div>
      </Upload>
    </div>
    <!-- 个人弹框 -->
    <personModal v-show="status.personModalShow" ref="personModal" @openGuideModal="openGuide" v-on:openFeedbackModal="openFeedback" @switchLanguage="switchLanguage"></personModal>

    <!-- 消息框 -->
    <newsModal v-show="status.newsModalShow" ref="newsModal" @openNewsModal="openMessageDetails"></newsModal>

    <!-- 消息详情侧边弹框 -->
    <transition name="messageArea">
      <messageModal v-show="status.messageDetailsShow" ref="messageDetails" :msgType="msgType" @closeMessageModal="closeMessage" class="message"></messageModal>
    </transition>

    <!-- 应用列表弹框 -->
    <transition name="appInforArea">
      <appModal v-show="status.appModalShow" ref="appModal" @closeAppModal="closeApp" class="app"></appModal>
    </transition>

    <!-- 使用帮助，常见问题 -->
    <!-- <transition name="guidelinesArea">
      <guidelinesModal v-show="status.guidelinesShow" ref="guidelines" @closeGuidelinesModal="openGuide"  @ifCloseGuidelinesShow="openGuide" class="guidelines"></guidelinesModal>
    </transition> -->

    <!-- 意见反馈输入框 -->
    <transition name="feedbackArea">
      <feedbackModal v-show="status.feedbackShow" ref="feedback" @closeFeedbackModal="closeFeedbackModal" class="feedbackModal"></feedbackModal>
    </transition>

    <div class="result-cont">
      <div id="d3" class="d3">
        <div class="title">
          <span class="tplx-title">{{ tplx.title }}</span>
          <span class="search-result title-span">{{'人员总数 ' + fetchDetail.entity}}</span>
          <span v-show="fetchDetail.entity>10 && fetchDetail.show ? true : false " class="title-span">{{'，显示前 '+fetchDetail.showNum}}</span>
          <span class="title-span">{{'，用时 ' + fetchDetail.executeTime + ' 秒'}}</span>
          <!-- <div class="toggle-btn" @click="openD3Card">
            <span v-for="(item,index) in viewList" :key="index" :class="{ viewCur:index==current}" :data-index="index"><i :class="'iconfont '+ item.class"></i></span>
          </div> -->
        </div>
        <!-- d3图形展示 -->
        <div class="graphical" v-show="status.d3Show">
          <!-- 风险要素组件 -->
          <riskLevel :assessData="assessData"></riskLevel>
          <div class="func-btn-group">
            <div class="group-left">
              <ul>
                <li><i class="iconfont icon-baocun"></i></li>
                <li><i class="iconfont icon-pingmukuaizhao" @click="saveAsPng"></i></li>
                <li><i class="iconfont icon-shuaxin"></i></li>
                <!-- <li><i class="iconfont icon-dayin"></i></li> -->
                <li></li>
              </ul>
            </div> 
            <!-- <div class="group-right">
              <ul>
                <li><i class="iconfont icon-zuzhi"></i></li>
                <li><i class="iconfont icon-guanxiquan"></i></li>
                <li><i class="iconfont icon-lujingjisuan"></i></li>
              </ul>
            </div> -->
          </div>
          <div v-show="status.d3Show" id="hydra" width="1300" height="800"></div>
          <div class="loading-bg" v-show="d3Loading">
            <div class="d3-loading" >
              <div class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div class="text">图形加载中...</div>
                </Spin>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
    <!-- 查看档案面板 -->
    <transition name="personInforArea">
      <PersonInfor ref="PersonInfor" :node="curEneityData" :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData" v-show="status.PersonInforShow" @listenToChild="hidePersonInfor" @switchTrajectory="switchTrajectory" @changeTime="changeTime" class="personInfo"></PersonInfor>
    </transition> 

    <transition name="nodesDetailedArea">
      <nodesDetailed ref="nodesDetailed" :modal="nodeDetailsAllData" v-show="status.nodesDetailedShow" class="nodesDetailed" @closeNodesDetailed="closeNodesDetailed" @changePage="changePage"></nodesDetailed>
    </transition>
  </div>
</template>

<script>
  import moment from 'moment'
  import * as d3 from 'd3v4'
  import hydra from '../../../static/vendors/hydraCardHeritage.js'
  import PersonInfor from '@/components/assembly/PersonInfor'
  import switchView from '@/components/assembly/SwitchView'
  import personModal from '@/components/assembly/PersonModal'
  import nodesDetailed from '@/components/assembly/NodesDetailed'
  import newsModal from '@/components/assembly/NewsModal'
  import appModal from '@/components/assembly/AppList'
  import messageModal from '@/components/assembly/MessageDetails'
  import feedbackModal from '@/components/assembly/FeedBack'
  import SwitchLanguage from '@/components/assembly/SwitchLanguage'
  import RiskLevel from '@/components/riskLevel/RiskLevel'

  export default {
    name: 'Visualition',
    components: { 
      PersonInfor, 
      switchView, 
      personModal,
      nodesDetailed, 
      newsModal, 
      appModal, 
      messageModal, 
      feedbackModal, 
      SwitchLanguage,
      RiskLevel
    },
    data (){
      return {
        //hydraType: this.$config.project.hydraType,  //D3卡片展示
        hydraType: 'hydraCardHeritage',
        hydra: '',  //D3卡片展示
        bh: [],
        temp : {},
        current: '',
        path : this.$config.joinPath,
        token: '',
        txid : '',
        filterLoading: false,
        assessLoading: false,
        d3Loading: false,
        language : 'ch',
        curEneityData: {},
        beginDate:"2016-01-01",
        endDate:"2017-12-31",
        pageIndex: 1,
        pageSize: 50,
        tplx:{
          filterCondition: '',
          starts: 0,
          types: '',
          sizes: 10,
          index: '',
          title: ''
        },
        /**
       * 当前实体所有数据/实体
       * @object curEneity
       * @author LiErbing
       */
        //icons: icons,
        labelColors: [],
        tplxMapping: [],
        assessData: {
          label: "", 
          personCount: 0, 
          riskLevel: "",
          tpmc:"",
          personLabelCount: {}
        },
        iconsList: [],
        curEneityAllData:{
          fxpf: '',
          type: 'mark',
          rybq: [],
          imgSrc: '',
          labelBgColor: [],
          eneityBasicInfo : '',
          eneityTrajectoryInfo : {
            //dataTypes: ["all","PERMANENT_RESIDENTS", "INTERNET_BAR", "HOTEL"],
            dataTypes: [],
            data: [],
            datas: [],
            mapData: [],
            photoData: [],
            startTime: "2018-01-01",
            endTime: '',
            showDate : false,
            photoNode : [],
            //isShow : '',
            // photoData: {
            //   '0': '0.png', 
            //   '1': '1.png', 
            //   '2': '2.png'
            // }
          },
          eneityCorrelationInfo : {
            data: []
          }
        },
        modalCur: 0,
        current: 0,
        entityModalTitle : '添加实体',
        nodeID: '',
        nodeType: '',
        status : {
          personModalShow: false,
          newsModalShow: false,
          appModalShow: false,
          messageDetailsShow:false,
          changeLogShow: false,
          guidelinesShow: false,
          feedbackShow: false, 
          d3Show: true,
          cardShow: false,
          ModalShow: false,
          PersonInforShow: false,
          nodesDetailedShow: false,
          addModalShow: false,
          uploadImg: false,
          links: false,
          entity: true,
          hasSource : true
        },
        d3BtnIcon: 'd3-show.png',
        cardBtnIcon: 'card-hide.png',
        // condition: ['011','111'],
        //value1: '01',
        conditions: ['01','11'],
        uploadList: [],
        FilterItem: [],
        FunctinItem: [],
        entity: [],
        relationshipModal: [],
        showlist : ['01',11],
        d3Data : {},
        opt : {},
        FilterIndex: '',
        FunctinIndex: '',
        FunctinIndexs: '',
        name: '',
        msgType: '',
        tempJson : '',
        // keyword: sessionStorage.keywordTp,
        keyword: this.$route.query.keyword,
        systemId: this.$route.query.id,
        qParams : {
          keyword: this.$route.query.keyword,
          depth:2,
          nodeNames:[],
          linkNames:[], 
          filters:{}
        },
        fetchDetail : {
          entity : 0,
          executeTime : 0,
          showNum : 10,
          show: true
        },
        //graph : hydra.graph(),
        graph : '',
        viewList : [
          {
            class: 'icon-guanxituxianshi'
          },
          {
            class: 'icon-liebiaoxianshi'
          },
          {
            class: 'icon-quanping1'
          }
        ],
        entityPropList: [],
        linksPropList: [],
        displayList : {
          entity : [],
          links : []
        },
        lineColors: [
          {
            value: 'red',
            label: '红色',
            type: 'red'
          },
          {
            value: 'gray',
            label: '灰色',
            type: 'gray'
          },
          {
            value: 'blue',
            label: '蓝色',
            type: 'blue'
          },
          {
            value: 'purple',
            label: '紫色',
            type: 'purple'
          },
          {
            value: 'green',
            label: '绿色',
            type: 'green'
          },
          {
            value: 'pink',
            label: '粉色',
            type: 'pink'
          }
        ],
        nodeDetailsAllData: {
          beginDate:"2016-01-01 00:00:00",
          endDate:"2017-03-31 23:59:59",
          allData:[]
        },
        topTagColors : {
          '户' : '#4298c7',
          '案' : '#eb4826',
          '朝' : '#6668c6',
          '境' : '#8d3b65',
          '社' : '#bc4166',
          '危' : '#f19d38',
          '宗' : '#bf6b27'	
        },
        tplxColorList : {  //图谱类型图标颜色
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
      }
    },
    mounted () {
      //this.value1 = '01'
    },
    methods:{
      backIndex(){
        this.$router.push({
          path: '/index',
        });
      },
      backSearchTp(){
        this.$router.push({
          path: '/searchtp',
        });
      },
      /**
     * 根据systemId获取数据
     * @function getDataBySystemId
     * @author erbing
     */
      getDataBySystemId () {
        let me = this;
        var params = new URLSearchParams();
        params.append('systemId', this.systemId);
        params.append('token', this.token);
        // let url = this.path + '/RiskAssessController/v1/searchGraphByRy';
        let url = this.path + '/InheritanceSystemResource/v1/InheritanceSystem/name';
        me.d3Loading = true;
        this.$axios.post(url, params)
        .then(response => {
          if(!response.data){
            me.d3Loading = false;
            document.getElementById('hydra').innerHTML = '';
            me.$Message.warning(response.message);
            return false;
          }
          if(response.code == 200){
            me.d3Loading = false;
            var data = me.parseData(response.data.children,false);
            me.initialize(response.data.children);
            me.temp = data;
            me.fetchDetail.entity = response.data.total;
            me.fetchDetail.executeTime = response.data.executeTime;
            me.fetchDetail.show = true;
          }
        })
        .catch(error => {
          //this.$Message.warning(response.data.msg);
          me.d3Loading = false;
          console.log(error);
        });
      },
      getByKeyWord (index) {
        let me = this;
        me.filterLoading = true;
        let params = new URLSearchParams();
        let url = me.path + '/RiskAssessController/v1/allTplxs';
        //params.append('keyword', '652801201606197316');  
        params.append('token', me.token);
        params.append('start', me.tplx.starts);
        params.append('size', me.tplx.sizes);
        params.append('type', me.tplx.types);
        this.$axios.post(url, params).then(response => {
          if (response.data.code != 200) {
            this.filterLoading = false;
            return false;
          }
          this.filterLoading = false;
          if(this.tplx.index != ''){
            console.log(response.data.data[0].properties);
            //me.tplx.filterCondition[this.tplx.index].properties = [];
            me.tplx.filterCondition[this.tplx.index].properties = response.data.data[0].properties;
          }else{
            me.tplx.filterCondition = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      saveAsPng(){
        this.graph.exportPic(this.temp.children[0].properties.XM + '的关系图');
      },
      getEntityLinksConfig () {
        let me = this;
        let params = new URLSearchParams();
        let url = me.path+'/InitializeResource/v1/getInitializeConfig?&token='+me.token;
        // let url = me.path+'/Initialize/v1/getInitializeConfig?language='+me.language+'&token='+me.token;
        //params.append('token', me.token);
        this.$axios.get(url, params).then(response => {
          if (response.code != 200) {
            return false;
          }
          me.entityPropList = response.data.nodeConfig;
          me.linksPropList = response.data.linkConfig;
          me.iconsList = response.data.nodeIconConfig;
          me.labelColors = response.data.labelColors;
          me.tplxMapping = response.data.tplxMapping;
          me.iconsList.map(item=>{
            for(let i in item){
              if (i=='path_1') {
                item['path_n'] = item[i];
              }
            }
          })
          me.opt = me.buildOpt();
          //me.searchByKeyword();
          me.getDataBySystemId();
        })
        .catch(error => {
          console.log(error);
        });
      },
      getViewIndex (index) {
        var me = this;
        me.status.newsModalShow = false;
        me.status.appModalShow = false;
        me.status.personModalShow = false;
        if (index == '0') {
          me.status.personModalShow = true;
        }else if(index == '1'){    
          me.status.newsModalShow = true;
        }else if(index == '2'){
          me.status.appModalShow = true;
        }
      },
      openMessageDetails (txt) {
        var me = this;
        me.status.newsModalShow = false;
        me.msgType = 'name' + (txt+1);
        me.status.messageDetailsShow = true;
        this.$refs.messageDetails.getMessageType(me.msgType);
      },
      closeApp (f) {
        this.status.appModalShow = f;
      },
      closeMessage (f) {
        this.status.messageDetailsShow = f;
      },
      hidePersonInfor (data) {
        this.status.PersonInforShow = data;
      },

      closeNodesDetailed (data) {
        this.status.nodesDetailedShow = data;
      },
      changePage (date,type) {
        if (type == 'start') {
          this.beginDate = date;
        }else{
          this.endDate = date;
        };
        this.getEssentialInfo();
      },
      changeTime (date,type) {
        if (type == 'start') {
          this.curEneityAllData.eneityTrajectoryInfo.startTime = date;
        }else{
          this.curEneityAllData.eneityTrajectoryInfo.endTime = date;
        };
        this.getPhotos();
      },
      openGuide (t) {
        this.status.guidelinesShow = t;
      },
      switchTrajectory (name) {
        if (name == 'all') {
          this.curEneityAllData.eneityTrajectoryInfo.datas = this.curEneityAllData.eneityTrajectoryInfo.data;
          return false;
        };
        this.curEneityAllData.eneityTrajectoryInfo.datas = [];
        //this.curEneityAllData.eneityTrajectoryInfo.datas = this.curEneityAllData.eneityTrajectoryInfo.data;
        for (var i = 0; i < this.curEneityAllData.eneityTrajectoryInfo.data.length; i ++) {
          if (this.curEneityAllData.eneityTrajectoryInfo.data[i].nodeType == name) {
            this.curEneityAllData.eneityTrajectoryInfo.datas.push(this.curEneityAllData.eneityTrajectoryInfo.data[i]);
            //this.curEneityAllData.eneityTrajectoryInfo.datas.splice(i,1);
            // return this.curEneityAllData.eneityTrajectoryInfo.datas;
          }
        }
        console.log(name);
        console.log(this.curEneityAllData.eneityTrajectoryInfo.datas);
      },
      // closeGuidelines (f) {
      //  this.status.guidelinesShow = f;
      // },
      // ifCloseGuidelines (t) {
      //  this.status.guidelinesShow = t;
      // },
      openFeedback (t) {
        this.status.personModalShow = false;
        this.status.feedbackShow = t;
      },
      closeFeedbackModal (f){
        this.status.feedbackShow = f;
      },
      switchModal (evt){
        evt.stopPropagation();
        var obj = evt.target.tagName.toLocaleLowerCase() == 'div' ? evt.target : evt.target.parentNode;
        this.modalCur = obj.dataset.index;
      },
      checkStatus () {
        this.filterCondition.forEach(ele=>ele.check=false);
      },
      openD3Card (evt) {  //切换D3 卡片页面
        evt.stopPropagation();
        var obj = evt.target.tagName.toLocaleLowerCase() == 'span' ? evt.target : evt.target.parentNode;
        this.current = obj.dataset.index;
        this.switchView(obj.dataset.index);
      },
      switchView (index) {
        var me = this, viewStatus, changeW;
        var d3 = document.getElementById('d3');
        function execD3View(){
          me.status.ifFunctionalArea = !viewStatus;
          me.status.ifConditionArea = !viewStatus;
          d3.style.right = viewStatus ? '13px' : '247px';
          d3.style.left = viewStatus ? '13px' : '247px';
          me.viewList[2].class = viewStatus ? 'icon-suoping' : 'icon-quanping1';
          changeW = {
            width : viewStatus ? document.documentElement.clientWidth-28 : document.documentElement.clientWidth-498,
            height : viewStatus ? document.documentElement.clientHeight-120 : document.documentElement.clientHeight-120 
          } 
          me.graph.setSize(changeW,parseInt(d3.style.left));
        }
        switch(index)
        {
          case '0':
            me.status.ifFunctionalArea = true;
            me.status.ifConditionArea = true;
            d3.style.right = '247px';
            d3.style.left = '247px';
            me.status.d3Show = true;
            me.status.cardShow = false;
            viewStatus = false;
            execD3View();
            break;
          case '1':
            me.status.ifFunctionalArea = false;
            me.status.ifConditionArea = true;
            d3.style.right = '13px';
            d3.style.left = '247px';
            me.status.d3Show = false;
            me.status.cardShow = true;
            break;
          case '2':
            viewStatus = me.viewList[2].class == 'icon-quanping1';
            execD3View();
            break;
          //default:
        }
      },
      // setWH () {
      //   let me = this;
      //   let ch = document.documentElement.clientHeight;
      //   let cw = document.documentElement.clientWidth;
      //   me.graph.setSize({
      //     width : cw,
      //     height : ch
      //   });
      // },
      buildOpt(){
       var me = this;
       var width = document.getElementById('hydra').offsetWidth;
       var height = document.documentElement.clientHeight - 110;
       return {
        selector : '#hydra',
        width : width,
        height: height,
        type: 'tree',
        allowNodeDbclick : true,
        useOverlap : false, //启用叠加
			  //overlapData : [],	//叠加数据，需要在useOverlap为true时使用
        expandlist : ["del", "lock","expand"],
        properties : this.$config.properties,
        bgclick (){
          return false;
        },
        expandEvt (obj,data,i){
         switch(obj.type){
           case 'edit' :
           break;
           case 'del' :
             let o = me.graph.getSelection();
             me.graph.setElementsDeleted(o.node,o.link);
           break;
           case 'expand' :
             me.expandEntity(data);
           break;
           case 'add' :
           break;
           case 'lock' :
           break;
         }
        }
       }
      },
      /**
       * 扩展实体
       * @function expandEntity
       * @author Zhangchan
       */
      expandEntity(msg){
        console.log(msg.data,8888888);
        // if (msg.data.nodeType == 'QB_ZP_RY') {
        //   this.getTpByTpbhs(msg.data.id, msg.data.tpbhs);
        // }else if(msg.data.nodeType == 'QB_ZP_TP'){
        //   this.getTpGraph(msg.data.id, msg.data.properties.TPBH);
        // }
        if (msg.data.nodeType == 'QB_ZP_RY') {
          this.getTpByTpbhs(msg.data.id, msg.data.tpids);
        }else if(msg.data.nodeType == 'QB_ZP_TP'){
          this.getTpGraph(msg.data.id, msg.data.id);
        }
      },
      addData(id, data, msg, type){
        if (data.id == id) {
          if (type == 'push') {
            data.children.push(msg);
          }else{
            data.children = msg;
          }
          return false;
        }
        for (var i = 0; i < data.children.length; i++) {
          this.addData(id, data.children[i], msg, type);
        }
      },
      initialize(msg) {
        console.log(msg,713713);
        //有用
        document.getElementById('hydra').innerHTML = '';
        this.graph.setOptions(this.opt);
        this.graph.init();
        this.loadIcons(msg);
      },
      parseData(data,flag){
        var me = this;

        data = changeImage(data)
        function changeImage(data){
          //if (data.nodeType == 'QB_ZP_RY') {
            //data.image = me.$config.imgPath + data.properties.SFZHM + me.$config.imgType;
            //data.properties.GXMC = data.gxmc;
            // data.showProperties = ['XM', 'GXMC', 'SFZHM'];
            //data.state = data.properties.STATE;   //D3卡片展示
            //data.showProperties = ['XM','HJD', 'GXMC', 'SFZHM', 'RYBQ'];  //D3卡片展示
            if(me.hydraType == 'hydra'){
              //data.showProperties = ['XM', 'GXMC', 'SFZHM'];
            }else{
              //data.showProperties = ['XM','HJD', 'GXMC', 'SFZHM', 'RYBQ'];  //D3卡片展示
            }
          //}else if(data.nodeType == 'QB_ZP_TP'){
            // data.image = me.$config.imgPath + data.properties.SFZHM+".png";
            // data.showProperties = ['TPLX'];
            //data.showProperties = ['TPMS'];  //显示具体的图谱名称
            // data.isShow = flag;
            // me.tplxMapping.forEach(function(item){
            //   if(data.properties.TPLX == item.value){
            //     data.properties.TPLX = item.name;
            //   }
            // })
            // for(var i in me.tplxColorList){
            //   data.color = me.tplxColorList[data.properties.TPLX];
            // }
          }
          // for (var i = 0; i < data.children.length; i++) {
          //   changeImage(data.children[i]);
          // }
          return data;
        //}
        return data;
      },
      loadIcons (msg) {
        //有用
        var me  = this;
        me.graph.setIcons(me.iconsList);
        me.graph.load(msg); 
        me.initMenu();
      },
      createRMenu (data,pos,obj) {
        //有用
       var lis = [], box, ul;
       if (document.querySelector('#rMenu')) {
         box = document.querySelector('#rMenu')
         box.style.display = 'block';
         ul = box.querySelector('ul');
         ul.innerHTML = '';
       }else{
         box = document.createElement('div');
         box.id = 'rMenu';
         ul = document.createElement('ul');
         box.appendChild(ul);
         document.querySelector('#hydra').appendChild(box)
       }
       box.style.left = pos.x + 'px';
       box.style.top = pos.y + 'px';   
       for (var i = 0; i < data.length; i++) {
         lis[i] = document.createElement('li');
         // lis[i].innerText = this.$t(data[i].text);
         lis[i].innerText = data[i].text;
         lis[i].setAttribute('url',data[i].url);
         lis[i].onclick = data[i].method;
         // lis[i].onclick = function(){
         //    data[i].method()
         // };
         ul.appendChild(lis[i]);
       }
      },
      switchNodeViews () {
        var me = this;
        me.status.PersonInforShow = false;
        me.status.nodesDetailedShow = false;
      },
      initMenu(){
        //有用
        var me = this;
        var data = [
          {
            text : '查看档案',
            //text : 'message.relation.viewFile',
            url : '',
            method : function () {
              me.switchNodeViews();
              me.status.PersonInforShow = true;
              me.getEssentialInfo();
              //me.getTrajectoryInfo();  ()
              me.getCorrelationInfo();
              me.showPhotoList();
            }  
          }
        ];
        d3.select('.nodes').selectAll('g[type="node"]').on('contextmenu',function(e) {
          d3.event.preventDefault();
          d3.event.stopPropagation();
          //e = e.data;
          if (['rect', 'text'].indexOf(d3.event.srcElement.tagName) != -1 || !e.data.exist) return false;
          //-255 -120 为临时值，需要获取左侧宽和顶部高
          me.createRMenu(data,{x:d3.event.pageX+50,y:d3.event.pageY-120},e); 
          me.curEneityData = e.data;
          me.nodeID = e.data.nodeType == 'QB_ZP_TP' ? e.data.id : e.data.oid;
          // me.nodeID = e.data.oid;
          console.log(e.data,1111111111);
          //me.nodeType = e.nodeType;
          me.nodeType = e.data.nodeType;
        });
      },
      showPhotoList () {
        var me = this;
        if (!me.curEneityAllData.eneityTrajectoryInfo.showDate) {
          return;
        }
        me.curEneityAllData.eneityTrajectoryInfo.photoNode.forEach(ele => {
          me.curEneityAllData.eneityTrajectoryInfo.showDate = false;
          if (ele == me.nodeID) {
            me.curEneityAllData.eneityTrajectoryInfo.showDate = true;
            me.getPhotos()
          }
        });
      },
      /**
       * 获取基本信息/查看档案基本信息
       * @function getEssentialInfo
       * @author Erbing
       */
      getEssentialInfo () {
        let me = this;
        let params = new URLSearchParams();
        //let url = me.path+'/Vertex/v1/getNodeMsgByID';
        let url = me.path+'PersonalRecordResource/v1/PersonInformation/id/'+me.nodeID+'';
        //params.append('params', JSON.stringify(arg));
        
        params.append('token', me.token);
        params.append('id', me.nodeID);
        params.append('type', me.curEneityData.nodeType);
        // params.append('nodeID', me.nodeID);
        // params.append('language', me.language);  //切换语言
        // if (me.curEneityData.nodeType == 'YS_SJJZXX' || me.curEneityData.nodeType == 'YS_YHKXX' || me.curEneityData.nodeType == 'KDGSXX') {
        //   params.append('params', '{"beginDate": "'+me.beginDate+' 00-00-00","endDate":"'+me.endDate+' 23-59-59","pageIndex":"'+me.pageIndex+'","pageSize":"'+me.pageSize+'"}');
        // }
        this.$axios.post(url, params)
        .then(response => {
          if (response.code != 200) {
            return false;
          }
          // for (var i = 0; i < response.data.data[0].property_mapping.length; i++) {
          //   for(var prop in response.data.data[0].properties){
          //     if (response.data.data[0].property_mapping[i].NAME == prop) {
          //       response.data.data[0].property_mapping[i].name = response.data.data[0].properties[prop]
          //     }
          //   }
          // }
          // me.curEneityAllData.fxpf = response.data.data[0].properties.FXPF;
          // var data = response.data.data[0].properties.RYBQ;
          // if (data) {
          //   var obj = data.split(',');
          //     me.curEneityAllData.rybq = obj;  //人员标签
          //       me.curEneityAllData.rybq.forEach((item,index) => {
          //         for (var i in me.labelColors) {  
          //           if( item == i){
          //             console.log(me.labelColors[item]);
          //             me.curEneityAllData.labelBgColor.push(me.labelColors[item])  //标签背景颜色
          //           }
          //         };
          //       })     
          // };
          // me.curEneityAllData.eneityBasicInfo = response.data.data;
          // me.nodeDetailsAllData.allData = response.data.data;
          for (var i = 0; i < response.data.property_mapping.length; i++) {
            for(var prop in response.data.property){
              if (response.data.property_mapping[i].fieleName == prop) {
                response.data.property_mapping[i].name = response.data.property[prop]
              }
            }
          }
          var data = response.data.property.RYBQ;
          if (data) {
            var obj = data.split(',');
              me.curEneityAllData.rybq = obj;  //人员标签
                me.curEneityAllData.rybq.forEach((item,index) => {
                  for (var i in me.labelColors) {  
                    if( item == i){
                      //console.log(me.labelColors[item]);
                      me.curEneityAllData.labelBgColor.push(me.labelColors[item])  //标签背景颜色
                    }
                  };
                })     
          }else{
            me.curEneityAllData.rybq = [];
          }
          me.curEneityAllData.imgSrc = this.$config.imgPath + response.data.property.ID_NUMBER + this.$config.imgType;
          me.curEneityAllData.eneityBasicInfo = response.data;
          me.nodeDetailsAllData.allData = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      },
      /**
       * 获取轨迹信息/查看档案轨迹信息
       * @function getTrajectoryInfo
       * @author Erbing
       */
      getTrajectoryInfo () {
        let me = this;
        let params = new URLSearchParams();
        let url = me.path+'/GraphicalController/v1/nodePathAnalysis';
        //params.append('params', JSON.stringify(arg));
        params.append('token', me.token);
        params.append('nodeID', me.nodeID);
        params.append('language', me.language); //语言切换
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
          me.curEneityAllData.eneityTrajectoryInfo.dataTypes = response.data.data.dataTypes;
          me.curEneityAllData.eneityTrajectoryInfo.data = response.data.data.data;
          me.curEneityAllData.eneityTrajectoryInfo.datas = response.data.data.data;
          me.curEneityAllData.eneityTrajectoryInfo.mapData = response.data.data.mapData;
          var dtpz = me.curEneityAllData.eneityTrajectoryInfo.mapData.mrpz;
          var data = me.curEneityAllData.eneityTrajectoryInfo.mapData;
          var obj = JSON.stringify(dtpz); 
          obj = (new Function("","return "+obj))();   
          intinizMap(obj,data,"V1");
        })
        .catch(error => {
          console.log(error);
        });
      },
      /**
       * 获取轨迹信息/图片信息列表
       * @function getPhotos
       * @author Erbing
       */
      getPhotos () {
        let me = this;
        let params = new URLSearchParams();
        let url = me.path+'/GraphicalController/v1/getPathPhoto'; 
        params.append('token', me.token);
        params.append('base64', sessionStorage.url);
        params.append('startTime', me.curEneityAllData.eneityTrajectoryInfo.startTime);
        params.append('endTime', me.curEneityAllData.eneityTrajectoryInfo.endTime+'');
        params.append('page', 1);
        params.append('pageSize', 100);
        this.$axios.post(url, params).then(response => {
          if (response.data.code != 200) {
            return false;
          }
          me.curEneityAllData.eneityTrajectoryInfo.photoData = response.data.data;
          if (!me.curEneityAllData.eneityTrajectoryInfo.photoData.length) {
            me.curEneityAllData.eneityTrajectoryInfo.showDate = false;
            console.log(me.curEneityAllData.eneityTrajectoryInfo.showDate);
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      /**
       * 获取关联分析数据/查看档案关联分析
       * @function getCorrelationInfo
       * @author Erbing
       */
      getCorrelationInfo () {
        let me = this;
        // 获取前 先清空关联分析数据
        me.curEneityAllData.eneityCorrelationInfo.data = [];
      
        let params = new URLSearchParams();
        //let url = me.path+'/Vertex/v1/associationAnalysis';
        let url = me.path+'PersonalRecordResource/v1/associationAnalysis/id/'+me.nodeID+'';
        //params.append('params', JSON.stringify(arg));
        params.append('token', me.token);
        //params.append('nodeID', me.nodeID);
        params.append('type', me.nodeType);
        //params.append('language', me.language); //语言切换
        this.$axios.post(url, params)
        .then(response => {
          if (response.code != 200) {
            return false;
          }
          for (var j = 0; j < response.data.resultData.length; j ++) {
            for (var y = 0; y < this.iconsList.length; y ++) {
              if ( this.iconsList[y].type == response.data.resultData[j].iconType) {
                response.data.resultData[j].iconTypes = this.iconsList[y].avatar;
                if (response.data.resultData[j].nodeName == 'CZRK') {
                  for(var x = 0; x < response.data.resultData[j].node_Link.length; x ++){
                    if (response.data.resultData[j].node_Link[x].node.properties.XB == '女') {
                      response.data.resultData[j].iconTypes = this.iconsList[y].avatar_1;
                    }
                  }
                }
              }
            }
          }
          me.curEneityAllData.eneityCorrelationInfo.data = response.data.resultData;
          console.log(me.curEneityAllData.eneityCorrelationInfo.data);
        })
        .catch(error => {
          console.log(error);
        });
      },
      // setFetchDetail(entity, relation, time){
      //   this.fetchDetail.entity = entity;
      //   this.fetchDetail.relation = relation;
      //   this.fetchDetail.executeTime = time;
      // },
      uploadImages () {
        this.uploadImg = true;
      },
      switchLanguage (name) {
        //this.$i18n.locale = name;
        //this.$refs.switchView.switchLanguage(name);
      },
      handleBeforeUpload(file) {
          // 创建一个 FileReader 对象
          let reader = new FileReader()
          // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
          // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
          // 读取文件作为 URL 可访问地址
          reader.readAsDataURL(file);
          const me = this;
          me.uploadList = [];
          reader.onloadend = function (e) {
              file.url = reader.result;
              //console.log(file.url);
              if (file.name.indexOf('jpg') == -1 && file.name.indexOf('png') == -1) {
                me.uploadList = [];
                return false;
              };
              me.uploadList.push(file);
              for(var i = 0; i < me.uploadList.length; i++){
                let j = me.uploadList[i].size/1024+'';
                let x = (j+'').indexOf(".");
                me.uploadList[i].sizes = j.substring(0,x);
              };
          };       
          //console.log(file.url);
      },
      handleRemove(file) {
        this.uploadImg=!this.uploadImg;
        this.uploadList.splice(this.uploadList.indexOf(file), 1);
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },
      // getByRyData () {
      //   sessionStorage.setItem('keyword', this.keyword);
      //   if (this.uploadList.length) {
      //     sessionStorage.setItem('name', this.uploadList[0].name);
      //     sessionStorage.setItem('url', this.uploadList[0].url);
      //   }else if (this.keyword.length && !this.uploadList.length) {
      //     sessionStorage.setItem('name', '');
      //     sessionStorage.setItem('url', '');
      //   }else if (!this.keyword.length && this.uploadList.length){
      //     sessionStorage.setItem('keyword', '');
      //   }

      //   if (!this.keyword.length && !this.uploadList.length) {
      //     this.$Message.error('请输入要查找的关键词,或上传图片');
      //     return false;
      //   };
      //   this.searchByKeyword();
      // },
      getByRyData () {
        if(!this.keyword){
          this.$Message.warning('请输入查询关键字');
          return;
        }
        this.searchByKeyword();
      },
      /**
       * 根据关键字搜索的结果
       * @function searchByKeyword
       * @author erbing
       */
      searchByKeyword(){
        var me = this;
        var params = new URLSearchParams();
        params.append('keyword', this.keyword);
        params.append('token', this.token);
        params.append('pageIndex', 1);
        params.append('pageSize', 10);
        // let url = this.path + '/RiskAssessController/v1/searchGraphByRy';
        let url = this.path + 'IntelligentSearchResource/v1/searchGraphByPerson';
        me.d3Loading = true;
        this.$axios.post(url, params)
        .then(response => {
          if(!response.data){
            me.d3Loading = false;
            document.getElementById('hydra').innerHTML = '';
            me.$Message.warning(response.message);
            return false;
          }
          if(response.code == 200){
            me.d3Loading = false;
            var data = me.parseData(response.data.tpData,false)
            me.initialize(data);
            me.temp = data;
            me.fetchDetail.entity = response.data.total;
            me.fetchDetail.executeTime = response.data.executeTime;
            me.fetchDetail.show = true;
          }
        })
        .catch(error => {
          //this.$Message.warning(response.data.msg);
          me.d3Loading = false;
          console.log(error);
        });
      },
      /**
       * 实体类型为人员的扩展
       * @function getTpByTpbhs
       * @author erbing
       */
      getTpByTpbhs(id, ids){
        if (!ids) {
          alert('无法扩展，请重新查询！')
          return false
        }
        var me = this;
        var params = new URLSearchParams();
        params.append('ids', ids);
        params.append('token', this.token);
        //let url = this.path + 'RiskAssessController/v1/getTpByTpbhs';
        let url = this.path + 'IntelligentSearchResource/v1/vertex/id';
        me.d3Loading = true;
        this.$axios.post(url, params)
        .then(response => {
          me.d3Loading = false;
          var data = response.data;
          for (var i = 0; i < data.length; i++) {
            // for(var j = 0; j < me.tplxMapping.length; j++){
            //   if(data[i].properties.TPLX == me.tplxMapping[j].value){
                //data[i].properties.TPLX = me.tplxMapping[j].name;
                data[i] = me.parseData(data[i],false);
            //   }
            // }
          }
          // if(!response.data.data.assessData){
          //   me.assessData = {
          //     label: "", 
          //     personCount: 0, 
          //     riskLevel: "",
          //     tpmc:"",
          //     personLabelCount: {}
          //   }
          // }
          me.addData(id, me.temp, data, '=');
          me.graph.load(me.temp);
          me.initMenu();
        })
        .catch(error => {
          me.d3Loading = false;
          console.log(error);
        });
      },
      /**
       * 实体类型为图谱的扩展
       * @function getTpGraph
       * @author erbing
       */
      getTpGraph(id, ids){
        var me = this;
        var params = new URLSearchParams();
        params.append('ids', ids);
        params.append('flag', 0);
        params.append('token', this.token);
        // let url = this.path + '/RiskAssessController/v1/getTpGraph';
        let url = this.path + 'IntelligentSearchResource/v1/mapTreeData/id';
        me.d3Loading = true;
        this.$axios.post(url, params)
        .then(response => {
          if(response.code == 200){
            me.d3Loading = false;
            var data =me.parseData(response.data.tpData.children[0],false)
            me.addData(id, me.temp, data.children, '=');
            me.graph.load(me.temp);
            me.fetchDetail.entity = response.data.nodeCount;
            me.fetchDetail.executeTime = response.data.executeTime;
            me.fetchDetail.show = false;
            me.initMenu();
            me.assessData = response.data.assessData[ids];
            var label = response.data.assessData[ids].personLabelCount;
            if(!label){
              me.assessData.personLabelCount = {};
            }else{
              me.assessData.personLabelCount = JSON.parse(label);  //标签
            }
          }
        })
        .catch(error => {
          me.d3Loading = false;
          console.log(error);
        });
      },
      delDuplicate(data,isShow){
        let me = this;
        me.showProperties(data,isShow);
        return data.filter(ele=>!me.d3Data.nodes.filter(el=>el.vid==ele.vid).length);
      },
      showProperties (data,isShow) {
        var me = this;
        data.forEach(ele => {
          me.entityPropList.forEach(el=>{
            if (ele.nodeType == el.name) {
              ele.showProperties = el.showProp;
            }
          });
          if (isShow) {
            //ele.image = '/static/avatar/' + ele.properties.RYZP;
            //ele.image = 'http://104.152.4.59/sfzh/' + ele.properties.SFZHM+".png";
            ele.image = this.$config.imgPath + ele.properties.SFZHM + this.$config.imgType
          }
        });
      },
      parseLinks(data){
        data.forEach(ele => {
          ele.properties.relation = ele.properties.GXMC;
          ele.showProperties = ['relation'];
        });
        return data;
      },
      /**
       * 保存快照 
       * @function saveAsJson
       * @author Zhangchan
       */
      saveAsJson(){
        let data = this.graph.exportJson();
        let json = {
          nodes : data.nodes.filter(ele=>{
            delete ele.image;
            return !!ele.isEdit;
          }),
          links : data.links.filter(ele=>{
            
            delete ele.properties.relation;
            return !!ele.isEdit;
          })
        }
        let url = this.path + '/GraphicalController/v1/saveHistoryGraphToDatabase', me = this;
        let params = new URLSearchParams();
        params.append('txid', this.txid);
        params.append('graphData', JSON.stringify(data));
        params.append('token', this.token);
        this.$axios.post(url, params)
        .then(response => {
          window.open(me.path + '/GraphicalController/v1/saveHistoryGraphToLocal?txid=' + me.txid + '&token=' + me.token, '_blank');
        })
        .catch(error => {
          console.log(error);
        });
      },
      /**
       * 离开页面清除缓存 removeRedisKey
       * @function unload
       * @author Zhangchan
       */
      unload(){

      }
    },
    computed: {   

    },
    watch :{

    },
    mounted(){
      const me = this;
      // this.searchByKeyword();
      this.opt.height = document.documentElement.clientHeight-120;
      this.opt.width = document.documentElement.clientWidth-255;
      window.onresize = function(){
        let ch = document.documentElement.clientHeight;
        let cw = document.documentElement.clientWidth;
        me.graph.setSize({
          width : cw-255,
          height : ch-120
        });
      };
    },
    created(){
      //this.$i18n.locale='ch';
      this.hydra = require(`../../../static/vendors/${this.hydraType}.js`);  //D3卡片展示
      this.graph = this.hydra.default.graph(); //D3卡片展示
      this.getEntityLinksConfig();
      this.curEneityAllData.eneityTrajectoryInfo.endTime = moment(new Date()).format('YYYY-MM-DD');
    },
    beforeDestroy () {
      //this.unload();
    }
  }
</script>

<style lang="less" scoped>
  @widthH:100%;
  .post(r){
    position:relative;
  }
  .post(a){
    position:absolute;
  }
  .cur{
    color:#fff;
    background: #1573c3;
    border:none;
    border-bottom: solid 1px rgba(37, 82, 176, 0.5);  
  }
  .result{
    width:@widthH;
    height:@widthH;
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    color: #68a4f6;
    overflow-x:hidden;
    overflow-y:hidden;
    .bg{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    header{
      height:68px;
      .post(a);
      left:0;
      top:0;
      right:0;
      overflow:hidden;
      .logo{
        width:570px;
        height:64px;
        line-height: 64px;
        float:left;
        background:url(../../../static/images/logo-bg.png) 0 0 no-repeat;
        .proj-name{
          font-size: 20px;
          font-weight: bold;
          margin-left:28px;
          color: #ffffff;
          //text-shadow: -2px 2px 3px #000;
          
          background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
          -webkit-background-clip: text;         /* 规定背景的划分区域 */
          -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
          
        }
        .nav{
          // margin-left:70px;
          .post(a);
          left:386px;
          top:0;
          font-size:14px;
          font-weight:400;
          color:rgba(98,128,199,1);
          text-shadow:0px 1px 1px rgba(0, 0, 0, 0.75);
          .nav-cur{
            color: #fff;
            text-shadow:0px 1px 1px rgba(0, 0, 0, 0.75);
          }
        }
      }
      .result-search-box{
        width: 27.8%;
        height: 47px;
        .post(a);
        top: 5px;
        left:50%;
        margin-left:-13.9%;
        z-index: 99;
        .input{
          .post(a);
          left:0;
          right:77px;
          .iconfont{
            font-size:20px;
            color:#b7deff;
            cursor:pointer;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
          }
          i:nth-child(1){
            .post(a);
            // right:55px;
            right:20px;
            top:12px;
          }
          i:nth-child(2){
            .post(a);
            right:25px;
            top:10px;
          }
          input{
            width:100%;
            padding:0 90px 0 20px;
            height:50px;
            line-height:50px;
            outline: none;
            border:none;
            font-size:14px;
            color:#fff;
            background:url(../../../static/images/input.png) 0 0 no-repeat;
            background-size:100% 100%;
          }
        }
        .search-btn{
          .post(a);
          top:0;
          right:0;
          width:80px;
          height:34px;
          line-height:33px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          margin-top:8px;
          font-size:14px;
          font-weight:bold;
          display:inline-block;
          background:url(../../../static/images/search-btn.png) 0 0 no-repeat;
          background-size:100% 100%;
          span{
            background:-webkit-linear-gradient(top,#fff,#74c2ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
        }
      }
      .r_btn{
        width: 438px;
        height: 38px;
        top: 10px; 
        right: 18px;
        .post(a);
        .btn{
          width:157px;
          height:38px;
          line-height:38px;
          float:left;
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
          .post(a);
          background:url(../../../static/images/check.png) 0 0 no-repeat;
          .parallelogram{
            // width: 100%;   
            // height: 100%;   
            // background:url(../../../static/images/check.png) 0 0 no-repeat;
            // background-size:100%;
            // float:right;
            // transform:skew(-30deg);   
            // -webkit-transform: skew(-30deg);   
            // -moz-transform: skew(-30deg);   
            // -o-transform:skew(-30deg);   
            // -ms-transform:skew(-30deg);   
            // background-color: #1753df;    
          }
          span:nth-child(2){
            background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
            -webkit-background-clip: text;         /* 规定背景的划分区域 */
            -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
          }
        }
        .current{
          background:url(../../../static/images/checked.png) 0 0 no-repeat;
        }
        .personal{
          //left: 33px;
          left:0;
        }
        .news{
          //left: 173px;
          left:140px;
        }
        .app{
          //left: 314px;
          left:280px;
        }
      }
    }
    .upload-picture{
      width: 27.8%;
      min-height:153px;
      .post(a);
      top:47px;
      left:50%;
      margin-left:-13.9%;
      //height: 118px;
      z-index:99999;
      background-color: rgba(2, 18, 58, 0.8);
      box-shadow: 0px 5px 14px 0px 
        #011435;
      .upload-list{
        li{
          color: #44b6ff;
          .img{
            margin: 0 10px 0 10px;
            position: relative;
            top: 3px;
            .iconfont{
              font-size:20px;
            }
          }
          .name{
            display: inline-block;
            line-height: 24px;
          }
          .size{
            position: relative;
            top: 1px;
            margin: 0 20px;
          }
          .progress{
            display:inline-block;
            width:200px;
            height:30px;
          }
          .ivu-icon{
            font-size:17px;
            cursor: pointer;
            position: relative;
            top: 1px;
          }
        }
      }
    }
    .app{
      transform: translate3d(0, 0, 0);
    }
    .appInforArea-enter-active, .appInforArea-leave-active {
      transition: all .5s;
    }
    .appInforArea-enter, .appInforArea-leave-active {
      transform: translate3d(400px, 0, 0);
    }
    .message{
      transform: translate3d(0, 0, 0);
    }
    .messageArea-enter-active, .messageArea-leave-active {
      transition: all .5s;
    }
    .messageArea-enter, .messageArea-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    .result-cont{
      .post(a);
      left:0;
      top:68px;
      right:0;
      bottom:0;
      overflow-x:hidden;
      .condition-filter-mark{
        top:0;
        left:0;
        bottom:6px;
        // width:241px;
        width:278px;
        background-color: rgba(37,83,176,0.2);
        border: solid 1px #183e85;
        border-left:none;
        overflow-y:scroll;
        overflow-x:hidden;
        .post(a);
        .filter{
          .post(r);
          margin:1px 0 7px 0;
          padding-left: 2px;
          //border-bottom:1px solid #183e85;
          .title{
            color: #3aa8fb;
            font-size: 14px;
          }
          .separate-icon{
            width:6px;
            height:3px;
            background:#55a9f8;
            display:inline-block;
            .post(a);
            right:0;
            bottom:-2px;
          }
          .condition-list{
            // max-height:322px;
            overflow-y:auto; 
          }
        }
      }
      .d3{
        .post(a);
        top:2px;
        left:0;
        right:0; 
        bottom:6px;
        background:url(../../../static/images/net.png) repeat #ffffff;
        border: solid 2px #91b5ff;
        border-radius:5px 5px 0 0;
        -moz-box-shadow: 0px 0px 9px #666 inset;
        -webkit-box-shadow: 0px 0px 9px #666 inset;
        box-shadow: 0px 0px 9px #666 inset;
        .title{
          position: absolute;
          top: -3px;
          left: -2px;
          right: -2px;
          border-radius:5px 5px 0 0;
          height: 44px;
          line-height: 44px;
          background-color: #c7d7eb;
          overflow:hidden;
          .tplx-title{
            font-size:16px;
            color: #2698ed;
            margin-left:16px;
            float:left;
          }
          .search-result{
            margin-left:16px;
            float:left;
          }
          .title-span{
            font-size:16px;
            color: #2698ed;
            // margin-left:20px;
          }
        }
        .add-modal{
          width:377px;
          .post(a);
          right:5px;
          top:58px;
          z-index:9999;
          background: -webkit-linear-gradient(left top, #11296d, #0c1837) ;
          .head{
            width:100%;
            height:46px;
            line-height:46px;
            background-image: linear-gradient(180deg, rgba(10, 53, 167, 0.95) 0%, rgba(4, 33, 110, 0.95) 100%), linear-gradient(#ffffff, #ffffff);
            background-blend-mode: normal, normal;
            border-bottom:1px solid #163da8;
            overflow:hidden;
            .add-title{
              font-size:16px;
              color:#fff;
              margin-left:17px;
              float:left;
            }
            .close-add-modal{
              cursor: pointer;
              margin-right:10px;
              float:right;
              height:46px;
              line-height:46px;
              display: inline-block;
              .iconfont{
                font-size:20px;
                color:#fff;
              }
            }
          }
          .icon{
            width:198px;
            height:6px;
            position:absolute;
            z-index:9999;
            bottom:0;
            left:50%;
            margin-left:-99px;
            border-width:0 5px 6px 5px;
            border-style:none solid solid;
            border-color:transparent transparent #fff;   
            //border-color:rgba(255,255,255,0.8);
          }
          .content{
            padding:12px 13px 20px 16px;
            max-height:300px;
            overflow-y: auto;
            position:relative;
            background:url(../../../static/images/grid.png) 0 0 repeat;
            ul{
              margin-bottom:20px;
              li.li{
                overflow:hidden;
                margin-bottom:10px;
                .property-title{
                  display:inline-block;
                  width:64px;
                  color: #3a8bbf;
                  float:left;
                }
                input{
                  color: #5cb9ff;
                  text-indent: 6px;
                  width:277px;
                  height:30px;
                  line-height:30px;
                  outline: none;
                  border:1px solid #1f3b87;
                  background:#061339;
                }
                label{
                  color: #3a8bbf;
                }
              }
              .stzj{
                margin-bottom:11px; 
                textarea{
                  width:277px;
                  height:90px;
                  border:1px solid #1f3b87;
                  background:#061339;
                  outline: none;
                  color: #5cb9ff;
                  text-indent: 6px;
                  resize:none;
                }
              }
              .stlx{
                input{
                  height: 44px;
                }
              }
              .gxx{
                input{
                  height: 44px;
                }
              }
            }
            .btn{
              width:100%;
              height:42px;
              overflow:hidden;
              span{
                width:99px;
                line-height:42px;
                height:42px;
                text-align: center;
                float:right;
                color: #bce2ff;
                font-size: 14px;
                cursor:pointer;
                background:url(../../../static/images/modal-btn.png) 0 0 no-repeat;
              }
              span:nth-child(1){
                margin-left:7px;
              }
            }
          }
        }
        .graphical{
          .post(a);
          // top: 44px;
          top:41px; 
          left: 0;
          bottom: 0;
          right: 0;
          overflow:hidden;
          // .risk-level{
          //   width:285px;
          //   height:198px;
          //   .post(a);
          //   top:25px;
          //   right:30px;
          //   border:4px solid #4690d1;
          //   z-index:999;
          //   background: #c7eefe;
          //   .level{
          //     padding-left: 4%;
          //     height:35px;
          //     line-height: 35px;
          //     color:#636363;
          //     // margin-bottom: 25px;
          //     font-size: 16px;
          //     border-bottom: 2px solid #7197b1;
          //     color:rgba(99,99,99,1);
          //   }
          //   .tpmc{
          //     padding-left: 4%;
          //     font-size:14px;
          //     line-height:30px;
          //     overflow: hidden;
          //     margin-bottom: 4px;
          //     text-overflow: ellipsis;
          //     white-space: nowrap;
          //     color:rgba(0,154,237,1);
          //   }
          //   .circle{
          //     width:75px;
          //     height:75px;
          //     margin:12px 28px 0 15px;
          //     float:left;
          //     .ivu-chart-circle-inner{
          //       span{
          //         font-size: 14px;
          //       }
          //     }
          //   }
          //   .num-people{
          //     width:158px;
          //     height:124px;
          //     overflow-y: auto;
          //     float:left;
          //     p{
          //       font-size: 16px;
          //       font-weight: bold;
          //       color:#555555;
          //     }
          //     ul{
          //       height: 115px;
          //       li{
          //         width:50%;
          //         font-size: 14px;
          //         font-weight: bold;
          //         color:#555555;
          //         overflow:hidden;
          //         float: left;
          //         margin-bottom:8px;
          //         span:nth-child(1){
          //           display:inline-block;
          //           width: 22px;
          //           height: 22px;
          //           line-height: 22px;
          //           font-size: 12px;
          //           text-align: center;
          //           border-radius: 3px;
          //           color: #fff;
          //           margin-right:10px;
          //           font-weight:normal;
          //         }
          //         span:nth-child(2){
          //           color:rgba(85,85,85,1);
          //           font-size:14px;
          //         }
          //       }
          //     }
          //   }
          //   .num-people ul::-webkit-scrollbar{width:6px;height:6px;}
          //   .num-people ul::-webkit-scrollbar-track{border-radius:5px;background:none;}
          //   .num-people ul::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
          //   .num-people ul::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
          //   .num-people ul::-webkit-scrollbar-corner{background-color:#dadada;}
          // }
          .func-btn-group{
            .post(a);
            top:20px;
            left:0;
            height:30px;
            z-index:999;
            .group-left{
              float:left;
              // margin-top:13px;
              height:30px;
              ul{
                overflow:hidden;
                li{
                  float:left;
                  color:#899aae;
                  text-align: center;
                  line-height:30px;
                  margin-left:21px;
                  cursor:pointer;
                  .iconfont{
                    font-size:20px;
                  }
                }
                li:last-child{
                  width:1px;
                  height:23px;
                  background:#b4c4d9;
                  position:relative;
                  top:5px;
                  display:none;
                }
              }
            }
            .group-right{
              float:left;
              // margin-top:13px;
              margin-left:21px;
              height:30px;
              border-radius:2px;
              ul{
                overflow:hidden;
                li{
                  float:left;
                  // width:38px;
                  height:30px;
                  color:#899aae;
                  background:#edf2f8;
                  text-align: center;
                  line-height:30px;
                  cursor:pointer;
                  border:1px solid #c8d3e1;
                  .iconfont{
                    font-size:20px;
                  }
                }
                li:nth-child(1){
                  width:39px;
                  border-right:none;
                  border-radius:2px 0 0 2px;
                  .iconfont{
                    font-size:24px;
                  }
                }
                li:nth-child(2){
                  width:40px;
                  .iconfont{
                    font-size:25px;
                  }
                }
                li:nth-child(3){
                  width:39px;
                  border-left:none;
                  border-radius:0 2px 2px 0;
                }
              }
            }
          }
        }
      }
    }
    .personInfo{
      transform: translate3d(0, 0, 0);
    }
    .personInforArea-enter-active, .personInforArea-leave-active {
      transition: all .5s;
    }
    .personInforArea-enter, .personInforArea-leave-active {
      transform: translate3d(535px, 0, 0);
    }
    
    .nodesDetailed{
      transform: translate3d(0, 0, 0);
    }
    .nodesDetailedArea-enter-active, .nodesDetailedArea-leave-active {
      transition: all .5s;
    }
    .nodesDetailedArea-enter, .nodesDetailedArea-leave-active {
      transform: translate3d(535px, 0, 0);
    }

    .guidelines{
      transform: translate3d(0, 0, 0);
    }
    .guidelinesArea-enter-active, .guidelinesArea-leave-active {
      transition: all .5s;
    }
    .guidelinesArea-enter, .guidelinesArea-leave-active {
      transform: translate3d(100%, 0, 0);
    }

    .feedbackModal{
      transform: translate3d(0, 0, 0);
    }
    .feedbackArea-enter-active, .feedbackArea-leave-active {
      transition: all .5s;
    }
    .feedbackArea-enter, .feedbackArea-leave-active {
      transform: translate3d(0, 259px, 0);
    }
  }
  

  @media screen and (max-width: 1620px){
    .result{
      header{
        .result-search-box{
          left:59%;
        }
        .r_btn{
          width:306px;
          .personal{
            // left:0;
            left:-1px;
          }
          .btn{
            width:117px;
          }
          .news{
            // left:98px;
            left:98px;
          }
          .app{
            // left:196px;
            left:197px;
          }
        }
      }
      .upload-picture{
        left:59%;
      }
    }
  }
</style>

<style lang="less">
  #hydra{position: relative;}
  circle,image,g[type="node"]>text,text.tagnums,g.more,g.more text{cursor:pointer;}
  text{font-family:sans-serif;font-size:10px;fill:#000000;}
  .links line{stroke-opacity:0.6;}
  #rMenu{position:absolute;width:160px;background:#e8eaec;box-shadow:#ccc 0px 0px 8px}
  #rMenu ul{padding:0;margin:0;}
  #rMenu ul li{color:#333;font-size:14px;height:34px;line-height:34px;width:100%;padding-left:5%;list-style-type:none;cursor:pointer;}
  #rMenu ul li:hover{background:#e5e5e5;}
  .svgNT{position:fixed;bottom:30px;left:323px;border:2px solid #ccc;}
  .arc{cursor:pointer;}



  div .diyFun{cursor: pointer; color: blue; text-decoration: underline; font-size: 12px;}
  g.more{display: block}
  g.nomore{display: none}
  .scrollbar::-webkit-scrollbar{width:6px;height:6px;}
  .scrollbar::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .scrollbar::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .scrollbar::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .scrollbar::-webkit-scrollbar-corner{background-color:#dadada;}
  
  .ivu-message{
    z-index:99999;
  }
  
  // 上传图片组件css
  .upload-picture{
    .ivu-upload{
      .ivu-upload-drag{
        border:1px solid rgba(0,0,0,0);
        background: none;
        color: #44b6ff;
        font-size:14px;
      }
      .ivu-upload-list{
        li{
          color: #44b6ff;
          font-size:12px;
          i{
            color: #44b6ff;
            font-size:14px;
          }
        }
      }
    }
  }

  .ivu-chart-circle{
    svg{
      width:100%;
      height:100%;
    }
    .ivu-chart-circle-inner{
      span{
        color:red;
      }
    }
  }

  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .demo-spin-col{
      height: 100px;
      position: relative;
      border: 1px solid #eee;
  }
  .filter-loading{
    width: 278px;
    height: 100px;
    .demo-spin-col{
      margin-left:90px;
      border:none;
      .ivu-spin-fix{
        border:none;
        background:none;
      }
    }
  }
  .assess-loading{
    width: 100%;
    height: 100%;
    .demo-spin-col{
      width:100%;
      border:none;
      .ivu-spin-fix{
        border:none;
        background:none;
      }
    }
  }
  .loading-bg{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.5);
    z-index:99999;
    .d3-loading{
      width:365px;
      height:98px;
      position:absolute;
      left:50%;
      top:50%;
      margin-left:-182.5px;
      margin-top:-49px;
      .demo-spin-col{
        width:100%;
        border:none;
        .ivu-spin-fix{
          border:none;
          background:none;
          .ivu-spin-text{
            .demo-spin-icon-load{
              font-size:60px !important;
              color: #fff;
            }
            .text{
              color: #fff;
            }
          }
        }
      }
    }
  }
  .ivu-select-dropdown::-webkit-scrollbar{width:6px;height:6px;}
  .ivu-select-dropdown::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .ivu-select-dropdown::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .ivu-select-dropdown::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .ivu-select-dropdown::-webkit-scrollbar-corner{background-color:#dadada;}
</style>
