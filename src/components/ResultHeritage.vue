<!-- 21 -->
<template>
  <div class="main_cont" @click="status.myNavModalShow =false;status.uploadImg=false;status.personModalShow=false;status.newsModalShow=false;status.appModalShow=false">
    <app-header 
      :items="status" 
      title="搜索结果" 
      :showSearch=false>
      <span @click="backSearch()" style="cursor:pointer;">智能搜索></span>
    </app-header>
    <div class="row">
      <div class="row-title">
        <span>{{'搜索到'+archivesPage.pageTotal+'个实体'}}，</span>
        <!-- <span>106条关系，</span> -->
        <span>{{ '用时'+executeTime+'秒' }}</span>
      </div>
      <div class="archives-box scrollbar">
        <div class="box" v-for ="(item,index) in datalist" :key = "item.rid">
          <div class="cont">
            <div class='div_cont'>   
              <div class="header_p" >
                <span class="name">{{item.property.XM?item.property.XM:'无'}}</span>
                <span class="check_res" v-on:click ="checkArchive(index)" @click.stop="status.PersonInforShow =true">查看档案</span>
                <div class="bg-list">
                  <div class="rybq scrollbar">
                    <span :key = "index" v-for="(item2,index) in item.property.RYBQ.split(',') "  class="previous" :style="{background: dataColor[item2]}" :title='item2'>{{item2}}</span>
                  </div>
                </div>
              </div>
              <div class="div_imgcont">
                <img class="img_width" :src="getImagePath(item.property.picUrl)">
                <!-- <img class="img_width" :src="dataImg[index]"> -->
                <div class="h_pdiv">
                  <img class="dev_line" src="../../static/images/result_img/Devider.png">
                  <div class="h_p">
                    <span class='span_cor2'>身份证号</span>
                    <span class='span_cor' :title="item.property.SFZHM?item.property.SFZHM:''">{{item.property.SFZHM?item.property.SFZHM:'无'}}</span>
                  </div>
                  <div class="h_p">
                    <span class='span_cor2'>职业</span>
                    <span class='span_cor' :title="item.property.ZY?item.property.ZY:''">{{item.property.ZY?item.property.ZY:'无'}}</span>
                  </div>
                  <div class="h_p">
                    <span class='span_cor2'>手机号</span>
                    <span class='span_cor' :title="item.property.SJHM?item.property.SJHM:''">{{item.property.SJHM?item.property.SJHM:'无'}}</span>
                  </div>
                  <div class="h_p">
                    <span class='span_cor2'>政治面貌</span>
                    <span class='span_cor' :title="item.property.ZZMM?item.property.ZZMM:''">{{item.property.ZZMM?item.property.ZZMM:'无'}}</span>
                  </div>
                </div>
              </div>
              <div style="clear: both">
                <p class="p_title">
                  <span class="span_tag"  v-bind:class='{bgcolor:activeIndex==index }' @click='setIndex(index, item.rid)'>图谱名称</span>
                  <!-- 
                    不要删，后边开发用
                    <span class="span_tag" @click="toArchives(index)">谱系档案</span>
                    -->
                    <span class="span_tag" v-bind:class='{bgcolor2:activeIndex2==index }' @click="showAr(index)">谱系档案</span>
                </p>
                <div v-if="activeIndex==index" class="tp-list-box">
                  <div v-for = "(items,index) in item.tpData" :key ='index' class="list-box scrollbar">
                      <div class="p_cont">            
                        <span class="span_title" @click="toArchivesJoin(items.tpid,item.rid)">{{items.tpms}}</span>
                        <div class="icon-list">
                          <!-- <span class="span_img1" @click = "toJoin(item.tpbh)">
                            <img src="../../static/images/result_img/r4.png" title="图谱串并">
                          </span>
                          <span class="span_img1" @click = "toOverlap(item)">
                            <img src="../../static/images/result_img/r5.png" title="图谱叠加">
                          </span>
                          <span class="span_img1"  @click="toEdit()">
                            <img src="../../static/images/result_img/remit.png" title="查看/编辑">
                          </span> -->
                          <span class="span_img1" v-if="hasFunAuth(constantFunMap.FUN_Search_Result_CHUANBING_ID)" @click="join(items.tpid,item.rid)">
                            <img src="../../static/images/result_img/r4.png" title="图谱串并">
                          </span>
                          <span class="span_img1" v-if="hasFunAuth(constantFunMap.FUN_Search_Result_DIEJIA_ID)" @click="overlaptp(items.tpid,item.rid)">
                            <img src="../../static/images/result_img/r5.png" title="图谱叠加">
                          </span>
                          <span class="span_img1" @click="toArchivesJoin(items.tpid,item.rid)">
                            <img src="../../static/images/result_img/remit.png" title="查看/编辑">
                          </span>
                        </div>
                      </div>  
                  </div>
                </div>
                <div v-if="activeIndex2==index" class="px-list-box">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-box">
      <Page :total="archivesPage.pageTotal" :page-size="archivesPage.pageSize" :current="archivesPage.pageIndex" @on-change="getPageData" show-elevator/>
    </div>
    <!-- 查看档案面板 -->
    <!-- <div class="da"> -->
    <transition name="personInforArea">
      <PersonInfor ref="PersonInfor" :node="curEneityData" :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData" v-if="status.PersonInforShow" @listenToChild="hidePersonInfor" @switchTrajectory="switchTrajectory" @changeTime="changeTime" class="personInfo"></PersonInfor>
    </transition>
    <!-- </div> -->

    <!-- 获取档案列表数据 -->
    <div class="archives-loading-bg" v-show="status.archivesLoadingShow">
      <div class="archives-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/components/assembly/AppHeader'
  import switchView from '@/components/assembly/SwitchView'
  import PersonInfor from '@/components/assembly/PersonInfor'
  import personModal from '@/components/assembly/PersonModal'
  import newsModal from '@/components/assembly/NewsModal'
  import appModal from '@/components/assembly/AppList'
  import * as commonApi from '@/api/common.js'
  import * as apis from '@/api/search/index'
	export default {
    name: 'Result',
    components: { PersonInfor,switchView,personModal,newsModal,appModal,appHeader },
    data () {
      return {
        path : this.$config.joinPath,
        token: '',
        // keyword: sessionStorage.keyword,
        keyword: this.$route.query.keyword,
        showMap: false,// 控制元素显示/隐藏 
        showRecord: false,
        activeIndex:-1,
        activeIndex2:-1,
        nodeLength : 0,
        executeTime : 0,
        datalist:[],
        dataMapList:[],
        mapNumber:'',
        curEneityData: {},
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
        status : {
          myNavModalShow:false,
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
        entityPropList: [],
        linksPropList: [],
        labelColors: [],
        uploadList: [],
        dataColor :
        {
          '被收押人员': '#CE3632',
          '被撤销特殊群体'    :  '#FF9966',
          '被撤销重点人员'    :  '#CC3333',
          '离异'  :  '9966FF',
          '持有传播下载暴恐音视频人员':  '#6699FF',
          '下落不明人员'    :  '#A1A1A1',
          '迁出本县市'      :   '#6699FF',
          '一般涉稳不放心人员'  : '#CC66CC',
          '逾期入境'   :  '#CC6633',
          '重点人员'   :   '#CC0000',
          '死亡'       : '#6B6B6B',
          '宗教'  :  '#3366CC',
          '打击'        : '#0099FF',
          '涉案' : '#FF6633',
          '三类人员'    :   '#00CCFF',
          '被击毙人员'  :   '#797979',
          '非法出境'    :   '#CE3632',
          '判刑人员'    :   '#3399FF',
          '无户籍人员'  :   '#AEAEAE',
          '收养'   : '#CC66FF'
        },
        archivesPage: {
          pageTotal: 0,
          pageSize: 12,
          pageIndex: 1
        },
        rid_id: '',
        node_type: ''
      }
    },
    methods:{
      backIndex(){
        this.$router.push({
          path: '/index',
        });
      },
      backSearch(){
        this.$router.push({
          path: '/search',
        });
      },
      toEdit(){
        window.open('http://103.229.213.147:6060/ITAP/servlet/front/JKS?type=YHDL2&PAGE=front%2FZP_SWJP.jsp%3FJZBH%3D%26ZPLX%3D%E6%B6%89%E7%A8%B3%E9%AB%98%E5%8D%B1%E4%BA%BA%E5%91%98%E5%AE%B6%E8%B0%B1%E5%9B%BE&USERID='+ sessionStorage.userName +'&PASSWORD='+ sessionStorage.passWord +'&SJH=13122223333&SFZH=000000000000000000&XM=%E7%AE%A1%E7%90%86%E5%91%98&JH=000000&TIME=&IP=&ZZJGDM=', '_blank');
      },
      setIndex(index,rid) {
          this.showRecord = false;
          this.activeIndex = (this.activeIndex == index ? -1 : index);
          this.activeIndex2 = -1;
          // this.getMap(rid);
      },
      toArchivesJoin (tpid,rid) {
        this.$router.push({
          path: '/archivesjoin',
          query: {
            tpids : tpid,
            rid : rid,
            mc : '智能搜索',
            pageName : 'znss'
          }
        });
      },
      join (tpid,rid) {
        this.$router.push({
          path: '/join',
          query: {
            tpid : tpid,
            rid : rid
          }
        });
      },
      overlaptp (tpid,rid) {
        this.$router.push({
          path: '/overlaptp',
          query: {
            tpid : tpid,
            rid : rid,
          }
        });
      },
      showMapF(index) {
        setIndex(index);
      },
      showAr(index) {
        this.activeIndex = -1;
        this.activeIndex2 = (this.activeIndex2 == index ? -1 : index);
        
      },
      checkArchive(index) {
          this.node_type = this.datalist[index].nodeType;
          this.rid_id = this.datalist[index].rid;
          // sessionStorage.setItem('imgSrc', this.dataImg[index]);
          this.curEneityAllData.imgSrc = me.getImagePath(this.datalist[index].property.picUrl);
          this.status.PersonInforShow = true;
          this.getEssentialInfo();
          this.getCorrelationInfo();
      },
      toArchives(index) {
        this.node_type = this.datalist[index].node_type;
        this.rid_id = this.datalist[index].rid;
        sessionStorage.setItem('id', this.rid_id); 
        this.$router.push({
          path: '/archives',
        });
      },
       // 点击跳转串并页面
      toJoin(mapNumber) {
        sessionStorage.mapNumber = mapNumber || '';
        this.$router.push({
          path: '/join',
        });
        // this.$router.push({
        //   name: 'Join',
        //   params: {
        //     tpbh: mapNumber
        //   }
        // });
      },
      // 跳转叠加页面
      toOverlap(item) {
        sessionStorage.mapNumber = item.tpbh || '';
        sessionStorage.djtps = item.tpms || '';
        this.$router.push({
          path: '/overlap',
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
      handleBeforeUpload(file) {
          // 创建一个 FileReader 对象
          let reader = new FileReader()
          // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
          // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
          // 读取文件作为 URL 可访问地址
          reader.readAsDataURL(file);
          const me = this;
          reader.onloadend = function (e) {
              file.url = reader.result;
              me.uploadList = [];
              me.uploadList.push(file);
              for(var i = 0; i < me.uploadList.length; i++){
                let j = me.uploadList[i].size/1024+'';
                let x = (j+'').indexOf(".");
               me.uploadList[i].sizes = j.substring(0,x);
              }
          };
      },
      handleRemove(file) {
        this.status.uploadImg=!this.status.uploadImg;
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
      getKeywordData () {
        this.getData()
      },
      /**
       * 获取谱系档案数据
       * @function getData
       * @author erbing
       */
      getData() {
        // console.log("this.path+",this.path);
        // let url = this.path + '/RiskAssessController/v1/searchRyMsg';
        // let url = this.path + 'IntelligentSearchResource/v1/intelligentSearch';
        // console.log("url+",url);
        // let params = new URLSearchParams();
        let me=this;
        // params.append('keyword', me.keyword);  
        // params.append('token', me.token);  
        // params.append('pageIndex', me.archivesPage.pageIndex);
        // params.append('pageSize', 12);
        me.status.archivesLoadingShow = true;

        let params = {
          keyword:me.keyword,
          pageIndex:me.archivesPage.pageIndex,
          pageSize:12
        }
        // this.$axios.post(url, params)
        apis.intelligentSearch(params)
        .then(response => {
          if (!response.data) {
            this.$Message.warning(response.message);
            this.status.archivesLoadingShow = false;
            this.nodeLength = 0;
            this.executeTime = 0;
            this.archivesPage.pageTotal = 0;
            this.datalist = [];
            //  this.$router.push({
            //   path: '/'
            // });
            return false;
          } 
          if (response.code == 200) {
            this.status.archivesLoadingShow = false;
            this.datalist = response.data.data;
            this.datalist.map(function(item){
              // if(!item.property.RYBQ){
              //   item.property.RYBQ = "";
              // }
              !item.property.RYBQ ? item.property.RYBQ = "" 
              : !item.property.ZY ? item.property.ZY = "" 
              : !item.property.ZZMM ? item.property.ZZMM = "" : "?";
            })
            console.log(this.datalist);
            //this.datalist = response.data.data;
            this.nodeLength = response.data.data.length;
            this.executeTime = response.data.executeTime;
            this.archivesPage.pageTotal = response.data.total;
          }
        })
        .catch(error => {
          this.status.archivesLoadingShow = false;
          console.log(error);
        });
      },
      /**
       * 获取谱系档案数据 --分页
       * @function getData
       * @author erbing
       */
      getPageData (page) {
        this.activeIndex = null;
        this.archivesPage.pageIndex = page;
        this.getData();
      },
      getMap(rid) {
        var me = this ;
        this.dataMapList  =[];
        let url = this.path + '/RiskAssessController/v1/getTpMsgByRyid';
        let params = new URLSearchParams();
        params.append('rid', rid);  
        params.append('token', this.token);
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          } 
            me.dataMapList = response.data.data.tpData;
            console.log(me.dataMapList) 
        })
        .catch(error => {
          console.log(error);
        });
      },
      openGuide (t) {
        this.status.guidelinesShow = t;
      },
      openFeedback (t) {
        this.status.personModalShow = false;
        this.status.feedbackShow = t;
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
      getEntityLinksConfig () {
        let me = this;
        commonApi.getInitializeConfig()
        .then(response => {
          if (response.code != 200) {
            return false;
          }
          me.entityPropList = response.data.nodeConfig;
          me.linksPropList = response.data.linkConfig;
          me.iconsList = response.data.nodeIconConfig;
          me.labelColors = response.data.labelColors;
          me.iconsList.map(item=>{
            for(let i in item){
              if (i=='path_1') {
                item['path_n'] = item[i];
              }
            }
          })
          //me.opt = me.buildOpt();
        })
        .catch(error => {
          console.log(error);
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
        let url = me.path+'PersonalRecordResource/v1/PersonInformation/id/'+me.rid_id+'';
        //let url = me.path+'/Vertex/v1/getNodeMsgByID';
        //params.append('params', JSON.stringify(arg));
        me.curEneityData.nodeType = 'QB_ZP_RY'
        params.append('token', me.token);
        params.append('id', me.rid_id);
        params.append('type', me.curEneityData.nodeType);
        // params.append('nodeID', me.rid_id);

        //params.append('language', me.language);  //切换语言
        // if (me.curEneityData.nodeType == 'YS_SJJZXX' || me.nodeType.node_type == 'YS_YHKXX' || me.curEneityData.nodeType == 'KDGSXX') {
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
          for (var i = 0; i < response.data.property_mapping.length; i++) {
            for(var prop in response.data.property){
              if (response.data.property_mapping[i].fieleName == prop) {
                response.data.property_mapping[i].name = response.data.property[prop]
              }
            }
          }
          var data = response.data.property;
          // if(!data){
          //   me.curEneityAllData.rybq = '';
          // }
          if (!data.RYBQ) {
            me.curEneityAllData.rybq = '' 
          }else{
            var obj = data.RYBQ.split(',');
            me.curEneityAllData.rybq = obj;  //人员标签
            me.curEneityAllData.rybq.forEach((item,index) => {
              for (var i in me.labelColors) {  
                if( item == i){
                  //console.log(me.labelColors[item]);
                  me.curEneityAllData.labelBgColor.push(me.labelColors[item])  //标签背景颜色
                }
              };
            }) 
          }
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
        params.append('nodeID', me.rid_id);
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
          me.curEneityAllData.eneityTrajectoryInfo.dataTypes = response.data.data.dataTypes;
          me.curEneityAllData.eneityTrajectoryInfo.data = response.data.data.data;
          me.curEneityAllData.eneityTrajectoryInfo.datas = response.data.data.data;
          me.curEneityAllData.eneityTrajectoryInfo.mapData = response.data.data.mapData;
          // var dtpz = me.curEneityAllData.eneityTrajectoryInfo.mapData.mrpz;
          // var data = me.curEneityAllData.eneityTrajectoryInfo.mapData;
          // var obj = JSON.stringify(dtpz); 
          // obj = (new Function("","return "+obj))();   
          // intinizMap(obj,data,"V1");
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
        let url = me.path+'PersonalRecordResource/v1/associationAnalysis/id/'+me.rid_id+'';
        //let url = me.path+'/Vertex/v1/associationAnalysis';
        //params.append('params', JSON.stringify(arg));
        params.append('token', me.token);
        //params.append('nodeID', me.rid_id);
        params.append('nodeType', me.node_type);
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
      hidePersonInfor (data) {
        this.status.PersonInforShow = data;
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
      changeTime (date,type) {
        if (type == 'start') {
          this.curEneityAllData.eneityTrajectoryInfo.startTime = date;
        }else{
          this.curEneityAllData.eneityTrajectoryInfo.endTime = date;
        };
        //this.getPhotos();
      },
    },
    created() {
      this.getData();
      this.getEntityLinksConfig();
      console.log('activeIndex+',this.activeIndex);
    }
  }
</script>

<style lang="less" scoped>
  @widthH:100%;
 /* @ellipsis:overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap*/
  
  .post(r){
    position:relative;
  }
  .post(a){
    position:absolute;
  }
  .main_cont {
    position: relative;
    z-index: 3;
    overflow: hidden;
    height:100%;
  }
  .row{
    .post(a);
    left:0;
    top:68px;
    right:0;
    bottom:100px;
    .row-title{
      margin:15px 0 0 20px;
      span{
        font-size:16px;
        font-weight:400;
        color:rgba(38,152,237,1);
      }
    }
    .archives-box{
      width:100%;
      height:100%;
      overflow-y:auto;
      .box{
        width:25%;
        float: left;
        .cont{
          padding:10px;
          .div_cont {
            // margin:10px;
            // min-width:450px;
            // min-height:220px;
            border:1px solid #317DE2;
            background-color:#12325B;
            border-radius:10px;
            overflow: hidden;
            position:relative;
            background: rgba(18,50,91,.8);
            border: 1px solid rgba(91, 120, 189, 1);
            box-shadow: 0px 0px 3px 0px rgba(49,125,226,0.5);
            border-radius: 8px;
            .div_imgcont{
              margin: 0 auto;
              padding:10px 0;
              height:150px;
              width:90%;
              .img_width {
                float: left;
                width:80px;
                height:111px;
                margin-right:20px;
                border-radius:10px;
              }
            }
          }
        }
      }
    }
  }
  .name {
    text-align:center;
    font-size:16px;
    color:#fff;
  }
  .check_res {
    display:inline-block;
    margin-left:4px;
    font-size:12px;
    color:#2698ED;

  }
  .check_res:hover {
    cursor:pointer;
  }
  .people_number {
    float:right;
    display:inline-block;
    margin-left:10px;
    width:80px;
    border-radius:4px;
    font-size:16px;
    text-align:center;
    color:#000;
    background-color:#D49F08;
  }
  .bg-list{
    overflow:hidden;
    padding-top:5px;
    height:30px;
    // overflow-x:auto;
    div{
      height:25px;
      //display: flex;
      align-items: center;
      overflow-y: hidden;
      // flex-wrap: nowrap;
      .previous{
        white-space: nowrap;
        // float:left;
        // display:inline-block;
        // max-width:100px;
        margin-right:4px;
        padding-left: 6px;
        padding-right: 6px;
        /*width:40px;*/
        border-radius:12px;
        font-size:12px;
        text-align:center;
        color:#fff;
        // background-color:#CE3632;
        // overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        overflow-x: auto;
      }
    }
  }
  .header_p {
    margin: 0 auto;
    width:90%;
    padding:10px 0;
    border-bottom: 1px dashed rgba(255,255,255,.05);
    overflow:hidden;
  }
  
  .font_style {
    text-align:left;padding-left:10px;
  }
  .div_dash {
    width:100%;
    height:0;
    border-bottom: 1px dashed #fff;
  }
  .span_tag {
    float: left;
    display:inline-block;
    width:50%;
    text-align: center;
    color: rgba(255,255,255,.4);
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .h_pdiv {
    position: relative;
    // width:250px;
    margin-left:100px;
  }
  .dev_line {
    position: absolute;
    top:30px;
    left:80px;
  }
  .h_p {
    height:32px;
    line-height: 32px;
    font-size: 14px;
    overflow:hidden;
  }
  .span_cor {
    font-size: 14px;
    color:#E6E6E6;
    // margin-left:90px;
    display:block;
    height: 31px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .span_cor2 {
    font-size:14px;
    display:block;
    float:left;
    width:90px;
    color:#5097CB;
  }
  .icon-list{
    margin-left:60%;
    overflow:hidden;
  }
  .icon-list .span_img1 {
    float:right;
    display:inline-block;
    width:33.3%;
    height:24px;
    line-height:24px;
    font-size:14px;
    text-align:center;
    cursor: pointer;
  }
  .p_title {
    background-color: rgba(255,255,255,0.05);
    height:40px;
    overflow: hidden;
    border-top:1px solid #5B78BD;
  }
  .tp-list-box{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:41px;
    overflow-y:auto;
    background:rgba(36,87,156,1);
    .list-box{
      .p_cont {
        position: relative;
        margin: 0 auto;
        width:100%;
        overflow:hidden;
        padding:10px 10px;
        border-bottom: 1px solid #5B78BD;
        .span_title {
          display:inline-block;
          width:60%;
          float:left;
          font-size:14px;
          // color:#1088E9; 
          color:#fff;
          cursor:pointer;
        }
      }
    }
  }
  .px-list-box{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:41px;
    background:rgba(36,87,156,1);
  }
  .p_cont2 {
    position: relative;
    margin: 0 auto;
    width:100%;
    min-height: 40px;
    padding:10px 10px;
    border: 0;
  }
  
  .bgcolor {
    background-color:rgba(1,115,255,0.3); 
    color:#fff;
  }
  .bgcolor2 {
    background-color:rgba(1,115,255,0.3); 
    color:#fff;
  }
  header{
    height:68px;
    .post(a);
    left:0;
    top:0;
    right:0;
    overflow:hidden;
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
          padding:0 55px 0 20px;
          height:50px;
          line-height:50px;
          outline: none;
          border:none;
          font-size:14px;
          color:#fff;
          background:url(../../static/images/input.png) 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
      .search-btn{
        .post(a);
        top:0;
        right:0;
        width:80px;
        height:33px;
        // float:right;
        line-height:33px;
        text-align: center;
        cursor: pointer;
        color:#fff;
        margin-top:9px;
        font-size:14px;
        font-weight:bold;
        display:inline-block;
        background:url(../../static/images/search-btn.png) 0 0 no-repeat;
        background-size:100% 100%;
        span{
          background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
          -webkit-background-clip: text;         /* 规定背景的划分区域 */
          -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
        }
        
      }
    }
    .r_btn{
      // width: 471px;
      width: 438px;
      height: 38px;
      // top: 12px;
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
        background:url(../../static/images/check.png) 0 0 no-repeat;
        .parallelogram{
          // width: 100%;   
          // height: 100%;   
          // background:url(../../static/images/check.png) 0 0 no-repeat;
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
        background:url(../../static/images/checked.png) 0 0 no-repeat;
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
  // 查看档案
  .personInfo{
    transform: translate3d(0, 0, 0);
  }
  .personInforArea-enter-active, .personInforArea-leave-active {
    transition: all .5s;
  }
  .personInforArea-enter, .personInforArea-leave-active {
    transform: translate3d(535px, 0, 0);
  }
  
  //应用列表弹框
  .app{
    transform: translate3d(0, 0, 0);
  }
  .appInforArea-enter-active, .appInforArea-leave-active {
    transition: all .5s;
  }
  .appInforArea-enter, .appInforArea-leave-active {
    transform: translate3d(400px, 0, 0);
  }



  @media screen and (max-width: 1620px){
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

  .page-box{
    .post(a);
    left:20px;
    bottom:20px;
    height:33px;
  }
  .archives-loading-bg{
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    z-index:99999;
    background:rgba(0,0,0,.5);
  }
</style>

<style lang="less">
  @import "../assets/loading.css";
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
  // 分页
  .page-box{
    .ivu-page{
      .ivu-page-next, 
      .ivu-page-prev{
        border:1px solid #269cdb;
        background:rgba(38,156,219,.5);
        a{
          color:#fff;
        }
      }
      .ivu-page-disabled{
        a{
          color:#666;
        }
      }
      .ivu-page-options{
        .ivu-page-options-elevator{
          input{
            text-align: center;
          }
        }
      }
      .ivu-page-item{
        border-color: #2d8cf0;
        background:rgba(38,156,219,.5);
        a{
          color:#fff;
        }
      }
      .ivu-page-item-active{
        border-color: #fff;
        a{
          color:#fff;
        }
      }
    }
  }
  
  
  
  

  .scrollbar::-webkit-scrollbar{width:6px;height:6px;}
  .scrollbar::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .scrollbar::-webkit-scrollbar-thumb{background-color:rgb(10, 60, 153);border-radius:5px;}
  .scrollbar::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .scrollbar::-webkit-scrollbar-corner{background-color:#dadada;}

  .rybq::-webkit-scrollbar{width:6px;height:5px;}
  .rybq::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .rybq::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .rybq::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .rybq::-webkit-scrollbar-corner{background-color:#dadada;}

  .tp-list-box::-webkit-scrollbar{width:6px;height:6px;}
  .tp-list-box::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .tp-list-box::-webkit-scrollbar-thumb{background-color:rgb(2, 48, 134);border-radius:5px;}
  .tp-list-box::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .tp-list-box::-webkit-scrollbar-corner{background-color:#dadada;}
  
</style>