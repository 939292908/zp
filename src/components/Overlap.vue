<template>
	<div class="result" @click="myNavModalShow=false;statusList.uploadImg=false;statusList.personModalShow=false;statusList.newsModalShow=false;statusList.appModalShow=false;statusList.messageDetailsShow=false;statusList.guidelinesShow=false;statusList.feedbackShow=false;">
		<header> 
			<div class="logo">
				<span class="proj-name">{{this.$config.project.name}}</span>
				<!-- <span class="nav"><span>{{ $t('message.relation.home') }}></span>{{ $t('message.relation.searchResult') }}</span> -->
        <span class="nav"><span @click="backIndex()" style="cursor:pointer;">首页></span>图谱叠加</span>
		  </div>
      <div class="result-search-box">
        <span class="search-btn" @click="getJzmc">
          <span>搜索一下</span>
        </span>
        <div class="input">
          <i class="iconfont icon-tianjiazhaopian" @click.stop="statusList.uploadImg=!statusList.uploadImg"></i>
          <!-- <i class="iconfont icon-yuyin"></i> -->
          <input type="text" v-model="keyword" @keyup.enter="getJzmc"/>
        </div>
      </div>
  		<switchView ref="switchView" v-on:viewIndex="getViewIndex"></switchView>
		</header>
 
    <!-- 上传图片 -->
    <div class="upload-picture" v-show="statusList.uploadImg" @click.stop="statusList.uploadImg=!statusList.uploadImg">
      <ul class="upload-list" @click.stop="statusList.uploadImg=!statusList.uploadImg">
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
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击上传文件，或者直接将文件拖到这里</p>
        </div>
      </Upload>
    </div>
    <!-- 我的导航 -->
    <transition name="guidelinesArea">
      <myNavModal v-show="myNavModalShow" @closemyNavModal="closemyNav" ref="myNavModal"></myNavModal>
    </transition>

    <!-- 个人弹框 -->
	  <personModal v-show="statusList.personModalShow" ref="personModal" @openMyNavModal="openMyNav" @openGuideModal="openGuide" @openFeedbackModal="openFeedback" @switchLanguage="switchLanguage"></personModal>

	  <!-- 消息框 -->
		<newsModal v-show="statusList.newsModalShow" ref="newsModal" @openNewsModal="openMessageDetails"></newsModal>

    <!-- 消息详情侧边弹框 -->
		<transition name="messageArea">
			<messageModal v-show="statusList.messageDetailsShow" ref="messageDetails" :msgType="msgType" @closeMessageModal="closeMessage" class="message"></messageModal>
		</transition>

	  <!-- 应用列表弹框 -->
	  <transition name="appInforArea">
			<appModal v-show="statusList.appModalShow" ref="appModal" @closeAppModal="closeApp" class="app"></appModal>
		</transition>

		<!-- 使用帮助，常见问题 -->
    <transition name="guidelinesArea">
      <guidelinesModal v-show="statusList.guidelinesShow" ref="guidelines" @closeGuidelinesModal="closeGuidelines" class="guidelines"></guidelinesModal>
    </transition>

		<!-- 意见反馈输入框 -->
		<transition name="feedbackArea">
			<feedbackModal v-show="statusList.feedbackShow" ref="feedback" @closeFeedbackModal="closeFeedbackModal" class="feedbackModal"></feedbackModal>
		</transition>

		<div class="result-cont">
			<!-- <transition name="conditionArea">
				<div class="condition-filter scrollbar" v-show="statusList.ifConditionArea">
					<div class="filter">
						<div class="condition-list scrollbar">
						</div>
					</div>
          <div class="filters-con-loading" v-show="statusList.filtersConLoading">
            <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
            </Col>
          </div>
				</div>
			</transition> -->
      <div id="d3" class="d3">
        <div class="title">
          <!-- <span class="search-result">{{'人员总数 ' + fetchDetail.entity + '，用时 ' + fetchDetail.executeTime + ' 秒'}}</span> -->
          <!-- <div class="toggle-btn" @click="openD3Card">
            <span v-for="(item,index) in viewList" :key="index" :class="{ viewCur:index==current}" :data-index="index"><i :class="'iconfont '+ item.class"></i></span>
          </div> -->
        </div>
        <!-- d3图形展示 -->
        <div class="graphical">
          <div class="func-btn-group">
            <div class="group-left">
              <ul>
                <!-- <li><i class="iconfont icon-baocun" title="生成谱系档案"></i></li> -->
                <li><i class="iconfont icon-pingmukuaizhao" @click="saveAsPng" title="快照"></i></li>
                <li><i class="iconfont icon-shuaxin" @click="refresh" title="刷新"></i></li>
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
          <div v-show="statusList.d3Show" id="hydra" width="1300" height="800"></div>
          <div class="d3-loading" v-show="statusList.d3Loading">
            <div class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>图形加载中...</div>
                </Spin>
            </div>
          </div>
        </div>  
      </div>
		</div>

    <!-- <Tree :data="filterCondition" :multiple="true" @on-select-change="getGraphData" @on-toggle-expand="getData"></Tree> -->
		<transition name="personInforArea">
			<PersonInfor ref="PersonInfor" :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData" v-if="statusList.PersonInforShow" @listenToChild="hidePersonInfor" @switchTrajectory="switchTrajectory" @changeTime="changeTime" class="personInfo"></PersonInfor>
		</transition>
    <transition name="nodesDetailedArea">
      <nodesDetailed ref="nodesDetailed" :modal="nodeDetailsAllData" v-if="statusList.nodesDetailedShow" class="nodesDetailed" @closeNodesDetailed="closeNodesDetailed" @changePage="changePage"></nodesDetailed>
    </transition>
    
    <!-- 叠加筛选框 -->
    <!-- <appModal v-show="statusList.appModalShow" ref="appModal" @closeAppModal="closeApp" @ifCloseAppListShow="ifCloseAppListShow" class="app"></appModal> -->
    
    <transition name="multiStr">
      <div class="multi-str" v-show="statusList.MultiModal">
        <div class="condition-modal">
          <div class="multi-sidebar tarbar">
            <div class="sidebar-top">
              <div class="polygon"></div>  
            </div>
            <div class="close-btn" @click="closeMultiModal">
              <img src="../../static/images/close-btn2.png" alt="">
            </div>
            <div class="sidebar-bottom">
              <div class="polygon"></div>  
            </div>
          </div>
          <!-- <div class="cont-box" @click.stop="statusList.MultiModal=true"> -->
          <div class="cont-box">
            <div class="cont-list" v-for="(items,index) in multiStrData" :key="index" :data-index="index">
              <ul class="condition-select" v-show="statusList.conditionList">
                <li class="li">
                  <div style="margin-right: 85px;overflow:hidden;">
                    <p style="margin-right:10px;">图谱名称：</p>
                    <span style="margin-right:10px;margin-left:80px;position:relative;top:-18px;">{{djtps}}</span>
                  </div>
                  <!-- <div style="margin-right: 85px;overflow:hidden;">
                    <p style="margin-right:10px;">图谱编号：</p>
                    <span style="margin-right:10px;margin-left:80px;position:relative;top:-18px;">{{mapNumber}}</span>
                  </div> -->
                  <!-- <input type="text" placeholder=""  v-model="djtps"> -->
                </li>
                <li class="li tp-unit">
                  <span>地区单位：</span>
                  <!-- <input type="text"> -->
                  <Dropdown trigger="click">
                    <a href="javascript:void(0)">
                      {{ multiStrData[0].filterDataLength == 0 ? '请选取单位' : '已选择'+multiStrData[0].filterDataLength+'个单位' }}
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <Tree :data="items.filterCondition" :multiple="true" @on-check-change="getGraphData" @on-toggle-expand="getData" show-checkbox></Tree>
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <!-- <li class="li tp-lx">
                  <span>图谱类型：</span>
                  <input type="text">
                  <Select v-model="items.tplxValue" multiple style="width:372px" @on-change="getTplxValue">
                    <Option v-for="item in items.tplxList" :value="item.value" :key="item.value">
                      {{ item.label }}
                    </Option>
                  </Select>
                </li> -->
                <!-- <li class="li">
                  <span>身份证号：</span>
                  <input type="text" placeholder="输入身份证" v-model="items.IdCard" @input="changeSfzhm">
                </li>
                <li class="li">
                  <span>图谱编号：</span>
                  <input type="text" placeholder="输入图谱编号" v-model="items.tpNumber" @input="changeTpbh">
                </li>
                <li class="li">
                  <span>图谱名称：</span>
                  <input type="text" placeholder="输入图谱名称" v-model="items.tpName" @input="changeTpms">
                </li> -->
                <li class="li family-description">
                  <span>图谱名称：</span>
                  <div class="box">
                    <!-- 多选 -->
                    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;padding-left:10px;">
                    <Checkbox
                      :indeterminate="items.indeterminate"
                      :value="items.checkAll"
                      @click.prevent.native="handleCheckAll">全选</Checkbox>
                    </div>
                    <CheckboxGroup v-model="items.checkAllGroup" @on-change="checkAllGroupChange">
                        <Checkbox :label="item.tpbh" v-for="(item,index) in items.AllGroup" :key="index">{{ item.tpms }}</Checkbox>
                    </CheckboxGroup>

                    <!-- 单选 -->
                    <!-- <RadioGroup v-model="items.radio">
                      <Radio :label="item.tpbh" v-for="(item,index) in items.AllGroup" :key="index">{{ item.tpms }}</Radio>
                    </RadioGroup> -->
                  </div>
                </li>
              </ul>
              <ul class="condition-select" v-show="statusList.tpList">
                <li class="li tp-unit" style="height:540px;overflow-y:auto;">
                  <span style="margin-right:0;">图谱名称：</span>
                  <!-- <input type="text"> -->
                  <DropdownMenu slot="list" style="background: #fff;margin-left: 80px;padding-left: 20px;margin-top: 10px;">
                    <Tree :data="curtp" :multiple="true" @on-check-change="getCheckData" show-checkbox></Tree>
                  </DropdownMenu>
                </li>
              </ul>
            </div>
          </div>
          <div class="cont-title">
            <p>图谱叠加</p>
          </div>
          <div class="cont-btn">
            <span class="cancel" @click="closeMultiModal">取消叠加</span>
            <span class="sure" @click="getTreeData">开始叠加</span>
          </div>
          <!-- <div class="cont-btn" v-if="statusList.tpList">
            <span class="cancel" @click="closeMultiModal">取消</span>
            <span class="sure" @click="getlapData">确定</span>
          </div> -->
        </div>
      </div>
    </transition>

    <!-- 筛选串并按钮 -->
    <div class="dtcb" v-show="statusList.ShowMultiModal" @click="ShowMulti">
      <span>图谱叠加</span>
    </div>
	</div>
</template>

<script>
  import moment from 'moment'
  import * as d3 from 'd3v4'

  import hydra from '../../static/vendors/hydra.js'
  import PersonInfor from '@/components/assembly/PersonInfor'
  import switchView from '@/components/assembly/SwitchView'
  import personModal from '@/components/assembly/PersonModal'
  import nodesDetailed from '@/components/assembly/NodesDetailed'
	import newsModal from '@/components/assembly/NewsModal'
  import appModal from '@/components/assembly/AppList'
  import guidelinesModal from '@/components/assembly/Guidelines'
	import messageModal from '@/components/assembly/MessageDetails'
	import feedbackModal from '@/components/assembly/FeedBack'
  import myNavModal from '@/components/assembly/MyNav'

	export default {
		name: 'Overlap',
		components: { myNavModal, hydra, PersonInfor, switchView, personModal, nodesDetailed, newsModal, appModal,guidelinesModal, messageModal, feedbackModal},
		data(){
			return {
        myNavModalShow:false, 
        multiStrData: [
          {
            filterCondition: [],
            filterData: [],
            filterDataLength: 0,
            tplxList: [],
            tplxValue: [],
            IdCard: '',
            tpNumber: '',
            tpName: '',
            indeterminate: false,
            checkAll: false,
            group: [],
            AllGroup: [],
            checkAllGroup: [],
            radio: ''
          }
        ], 
        labelColors: [],     
				path : this.$config.home,
        iosPath : this.$config.iosPath,
        token: '',
        txid : '',
        language : 'ch',
        djtps : '',
        mapNumber : '',
        curEneityData: {},
        beginDate:"2016-01-01",
        endDate:"2017-12-31",
        pageIndex: 1,
        pageSize: 50,
        //icons: icons,
        iconsList: [],
        curtp : [],
        checkData : '',
        tempData : {},
        saveName : '',
        curEneityAllData:{
          fxpf: '',
          rybq: [],
          labelBgColor: [],
          eneityBasicInfo : '',
          eneityTrajectoryInfo : {
            dataTypes: [],
            data: [],
            datas: [],
            mapData: [],
            photoData: [],
            startTime: "2018-01-01",
            endTime: '',
            showDate : false,
            photoNode : []
          },
          eneityCorrelationInfo : {
            data: []
          }
        },
        modalCur: 0,
        current: 0,
        nodeID: '',
        nodeType: '',
        statusList : {
          MultiModal: true,
          ShowMultiModal: true,
          conditionList: true,
          tpList: false,
				  personModalShow: false,
          newsModalShow: false,
				  appModalShow: false,
          messageDetailsShow:false,
          changeLogShow: false,
				  guidelinesShow: false,
				  feedbackShow: false,
          ifConditionArea: true,
          ifFunctionalArea: true,
          filtersConLoading: false,
          d3Show: true,
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
        condition: ['011','111'],
        conditions: ['01','11'],
        uploadList: [],
				FilterItem: [],
        FunctinItem: [],
        filter:[],
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
        keyword: sessionStorage.keyword,
				qParams : {
					keyword: sessionStorage.keyword,
					depth:2,
			    nodeNames:[],
  				linkNames:[], 
				  filters:{}
				},
				fetchDetail : {
          entity : 0,
          executeTime : 0
        },
        // graph : hydra.graph(),
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
        rels: [{
          source : '15d0d84356314beba9a66361513180a3',
          target : '9fe2dfdda9904cbaa7295bb7c91fbf9b',
          color : '',
          text : '徒弟1',
          id : 'id001'
        },{
          source : 'a2fc8f5ab77441cea8311eb51ad0ab90',
          target : '15d0d84356314beba9a66361513180a3',
          text : '新疆维吾尔',
          id : 'id002'
        },{
          source : 'a2fc8f5ab77441cea8311eb51ad0ab90',
          target : '15d0d84356314beba9a66361513180a3',
          text : '啦啦啦啦啦啦啦',
          id : 'id003'
        }]
			}
		},
    created(){
      var citys = [{citys:'shanghai'},{citys:'beijing'}];
      this.$store.dispatch('citys', citys); 
      sessionStorage.citys = JSON.stringify(citys);
      this.getEntityLinksConfig();
      this.getFilterCondition();
      console.log(sessionStorage.mapNumber.length)
      if(sessionStorage.mapNumber){
        this.djtps = sessionStorage.djtps;
        this.mapNumber = sessionStorage.mapNumber;
        //this.djtps = sessionStorage.tpms;
        //this.getTreeData(sessionStorage.mapNumber);
      }
      this.curEneityAllData.eneityTrajectoryInfo.endTime = moment(new Date()).format('YYYY-MM-DD');
    },
    mounted(){
      const me = this;
      this.opt = this.buildOpt();
      this.graph.setOptions(this.opt); 
      window.onresize = function(){
        let ch = document.documentElement.clientHeight;
        let cw = document.documentElement.clientWidth;
        me.graph.setSize({
          //width : cw -504,
          //height : ch-115
          width : cw-255,
          height : ch-120
        });
      };
      //this.graph.setOverlap(this.rels);
      //this.graph.load()
    },
    beforeDestroy () {
      //this.unload();
    },
		methods:{
      backIndex(){
        this.$router.push({
          path: '/index',
        });
      },
      toRelationPage () {
        sessionStorage.setItem('keyword', this.keyword);
        if (this.uploadList.length) {
          sessionStorage.setItem('name', this.uploadList[0].name);
          sessionStorage.setItem('url', this.uploadList[0].url);
        }else if (this.keyword.length && !this.uploadList.length) {
          sessionStorage.setItem('name', '');
          sessionStorage.setItem('url', '');
        }else if (!this.keyword.length && this.uploadList.length){
          sessionStorage.setItem('keyword', '');
        }

        if (!this.keyword.length && !this.uploadList.length) {
          this.$Message.error('请输入要查找的关键词,或上传图片');
          return false;
        };
        this.searchByKeyword(true);
      },
      searchByKeyword(type){
        var me = this;
        var params = new URLSearchParams();
        params.append('keyword', this.keyword);
        params.append('pictures', '{"name": "'+sessionStorage.name+'","url":"'+sessionStorage.url+'"}');
        params.append('depth', 0);
        params.append('token', this.token);
        params.append('language', me.language); //语言切换
        let url = this.path + '/Vertex/v1/searchByKeyword';
        //let url = 'http://172.16.3.158:2488/iTap_OrientService/Vertex/v1/searchByKeyword';
        this.$axios.post(url, params)
        .then(response => {
          const data = response.data.data;
          if (response.status != 200) {
            //alert(response.data.msg);
            me.$Message.error(response.data.msg);
            return false;
          }
          me.txid = data.txid;
          //me.filter = me.buildFilter(data.filter);  //左边条件筛选数据
          me.entity = me.buildEntity(data.node_count);
          me.relationshipModal = me.buildRelation(data.link_count);
          if (response.data.data.photoNode.length != 0) {
            me.curEneityAllData.eneityTrajectoryInfo.showDate = true;
            me.curEneityAllData.eneityTrajectoryInfo.photoNode = response.data.data.photoNode;
          }else{
            me.curEneityAllData.eneityTrajectoryInfo.showDate = false;
          };
          me.d3Data = {  //实体信息过滤
            "nodes" : me.parseNodes(data.nodes,true),
            "links" : me.parseLinks(data.links)
          };
          me.setFetchDetail(data.nodes.length, data.links.length, data.executeTime)
          me.uploadList = '';  //清空上传图片列表
          if (type) {
            me.graph.load(me.d3Data);
            me.initMenu();
          }else{
            me.initialize(me.d3Data);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
        this.statusList.uploadImg=!this.statusList.uploadImg;
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
      switchLanguage (name) {
        //this.$i18n.locale = name;
        //this.language = name;
        this.getEntityLinksConfig();
        //this.$refs.switchView.switchLanguage(name);
      },
      /**
       * 关闭图形可视化筛选条件面板
       * @function closeMultiModal
       * @author erbing
       */
      closeMultiModal () {
        
        this.statusList.ShowMultiModal = true;
        this.statusList.conditionList = false;
        this.statusList.tpList = false;
        this.statusList.MultiModal = false;
      },
      /**
       * 打开图形可视化筛选条件面板
       * @function ShowMulti
       * @author erbing
       */
      ShowMulti () {
        this.statusList.ShowMultiModal = false;
        this.statusList.MultiModal = true;
        this.statusList.conditionList = true;
      },
      /**
       * 获取右侧筛选条件地区单位列表数据
       * @function expandEntity
       * @author Zhangchan
       */
      getFilterCondition () {
        //this.statusList.filtersConLoading = true;
        let me = this;
        let params = new URLSearchParams();
        let url = me.path + '/querCountyTree';
        params.append('token', me.token);
        this.$axios.post(url,params).then(response => {
          //this.statusList.filtersConLoading = false;
          var obj = response.data;
          // me.multiStrData.forEach(item => {
          //   console.log(item);
          //   //item.filterCondition = obj[0].children;
          //   item.filterCondition = response.data;
          // })
          me.multiStrData[0].filterCondition = response.data;
          //me.filterCondition = obj[0].children;        
        })
        .catch(error => {
          console.log(error);
        });
      },
      //家族名称全选
      handleCheckAll () {
        this.multiStrData.forEach(item => {
          if (item.indeterminate) {
            item.checkAll = false;
          } else {
            item.checkAll = !item.checkAll;
          }
          item.indeterminate = false;
          if (item.checkAll) {
            item.checkAllGroup = item.group;
          } else {
            item.checkAllGroup = [];
          }
        })

      },
      //家族名称单选
      checkAllGroupChange (data) {
        this.multiStrData.forEach(item => {
          if (data.length === item.group.length) {
            item.indeterminate = false;
            item.checkAll = true;
          } else if (data.length > 0) {
              item.indeterminate = true;
              item.checkAll = false;
          } else {
              item.indeterminate = false;
              item.checkAll = false;
          }
        })
      },
      getData (e) {
        console.log(e,e.expand);
      },
      getGraphData (data) {  //筛选条件选取
        this.multiStrData[0].filterDataLength = data.length;
        // var str = data.filter(function(ele){
        //   return !ele.leaves;
        // }).map(function(ele){
        //   return ele.title;
        // }).join(',')
        // if (!str){
        //   // alert('no data')
        //   return false;
        // }
        var str = data.map(function(ele){
          return ele.title;
        }).join(',')
        if (!str){
          return false;
        }
        this.multiStrData[0].filterData = str;
        var me = this;
        if(this.multiStrData[0].filterDataLength != 0){
          me.getJzmcData();
        }
       
      },
      getTplxValue () {
        //console.log(this.multiStrData[0].tplxValue)
        // if(this.multiStrData[0].tplxValue.length !=0 && this.multiStrData[0].filterData.length !=0){
          //this.getJzmcData();
        // }
        if(this.multiStrData[0].tplxValue.length != 0 && this.multiStrData[0].filterDataLength != 0){
          this.getJzmcData()
        }
      },
      changeSfzhm () {
        this.getJzmcData();
      },
      changeTpbh () {
        this.getJzmcData();
      },
      changeTpms () {
        this.getJzmcData();
      },
      getJzmc () {
        this.multiStrData[0].IdCard = this.keyword;
        this.statusList.MultiModal = true;
        this.multiStrData[0].checkAll = false;
        this.multiStrData[0].checkAllGroup = [];
        this.getJzmcData();
      },
      /**
       * 获取家族名称列表
       * @function getJzmcData
       * @author erbing
       */
      getJzmcData () {
        var me = this;
        let url = this.iosPath + '/GraphCollisionController/v1/getTpByFilter';
        var params = new URLSearchParams();
        params.append('regions', me.multiStrData[0].filterData);
        params.append('token', me.token);
        params.append('tplxs','户籍人口家谱图');
        params.append('type','tpdj');
        params.append('sfzhm', me.multiStrData[0].IdCard);
        params.append('tpbh', me.multiStrData[0].tpNumber);
        params.append('tpms', me.multiStrData[0].tpName);
        this.$axios.post(url, params)
        .then(response => {
          const data = response.data.data;
          data.forEach(item=>{
            me.multiStrData[0].group.push(item.tpbh)
          })
          me.multiStrData[0].AllGroup = data;
          console.log(data)
        })
        .catch(error => {
          console.log(error);
        });
      },
      /**
       * 获取树图展示的数据
       * @function expandEntity
       * @author erbing
       */
      getTreeData (tpbhs) {
        var me = this;
        var params = new URLSearchParams();
        let url = this.iosPath + '/GraphMergeController/v1/tpMerge';
        // params.append('tpbhs', sessionStorage.mapNumber ? tpbhs : me.multiStrData[0].checkAllGroup.toString());
        if (me.multiStrData[0].checkAllGroup.length!=0) {
          params.append('tpbhs', me.multiStrData[0].checkAllGroup.toString());  
        }else{
          params.append('tpbhs', tpbhs);
        }
        params.append('token', me.token);
        me.statusList.d3Loading = true;
        this.$axios.post(url, params)
        .then(response => {
          if(!response.data.data){
            me.statusList.d3Loading = false;
            alert(response.data.msg);
            return;
          }
          var data = me.parseData(response.data.data.tpData);
          me.statusList.MultiModal = false;
          me.statusList.ShowMultiModal = true;
          me.saveName = response.data.tpData.children[0].properties.TPMS;
          me.fetchDetail.entity = response.data.data.nodeCount;
          me.fetchDetail.executeTime = response.data.data.executeTime;
          me.initialize(data);
          me.statusList.d3Loading = false;
        })
        .catch(error => {
          console.log(error);
        });
      },
      parseData(data, oid){
        var me = this;
        data = changeImage(data)
        function changeImage(data){
          if (data.nodeType == 'QB_ZP_RY') {
            // data.image = me.$config.imgPath + data.properties.SFZHM+".png";
            data.properties.GXMC = data.gxmc;
            if(data.properties.sfgtlxr){
              data.color = 'red';
            }
            data.showProperties = ['XM', 'GXMC', 'SFZHM'];
            if (oid && data.oid == oid) {
              data.color = 'red';
            }
          }else if(data.nodeType == 'QB_ZP_TP'){
            // data.image = me.$config.imgPath + data.properties.SFZHM+".png";
            data.showProperties = ['TPMS'];
          }
          for (var i = 0; i < data.children.length; i++) {
            changeImage(data.children[i]);
          }
          return data;
        }
        return data;
      },
      /**
       * 获取所有配置
       * @function expandEntity
       * @author erbing
       */
      getEntityLinksConfig () {
        let me = this;
        let params = new URLSearchParams();
        let url = this.iosPath +'/Initialize/v1/getInitializeConfig?language='+me.language+'&token='+me.token;
        //params.append('token', me.token);
        this.$axios.get(url, params).then(response => {
          if (response.data.code != 200) {
            return false;
          }
          // me.entityPropList = response.data.data.nodeConfig;
          // me.linksPropList = response.data.data.linkConfig;
          me.multiStrData[0].tplxList = response.data.data.tplx;
          // me.iconsList = response.data.data.nodeIconConfig;
          me.labelColors = response.data.data.labelColors;
          me.iconsList.map(item=>{
            for(let i in item){
              if (i=='path_1') {
                item['path_n'] = item[i];
              }
            }
          })
          me.graph.setIcons(me.iconsList);

        })
        .catch(error => {
          console.log(error);
        });
      },
      closeAddModal () {
        this.statusList.addModalShow = false;
      },
			getViewIndex (index) {
	  		var me = this;
        me.statusList.newsModalShow = false;
        me.statusList.appModalShow = false;
        me.statusList.personModalShow = false;
        if (index == '0') {
          me.statusList.personModalShow = true;
        }else if(index == '1'){    
          me.statusList.newsModalShow = true;
        }else if(index == '2'){
          me.statusList.appModalShow = true;
          me.myNavModalShow = false;
        }
      },
      /**
       * 打开我的导航
       * @function openMyNav
       */
      openMyNav (t) {
        this.$refs['myNavModal'].getDataList();
        this.statusList.personModalShow = false;
        this.myNavModalShow = t;
        // alert(121)
      },
      /**
       * 关闭我的导航
       * @function closemyNav
       */
      closemyNav (f) {
        this.myNavModalShow = f;
      },
	  	openMessageDetails (txt) {
	  		var me = this;
	  		me.statusList.newsModalShow = false;
        me.msgType = 'name' + (txt+1);
				me.statusList.messageDetailsShow = true;
        this.$refs.messageDetails.getMessageType(me.msgType);
	  	},
	  	closeApp (f) {
	  		this.statusList.appModalShow = f;
	  	},
	  	closeMessage (f) {
	  		this.statusList.messageDetailsShow = f;
	  	},
			hidePersonInfor (data) {
				this.statusList.PersonInforShow = data;
			},
      closeNodesDetailed (data) {
        this.statusList.nodesDetailedShow = data;
      },
      /**
       * 打开个人（使用帮助，常见问题）
       * @function openGuide
       * @author erbing
       */
      openGuide (t) {
        this.statusList.personModalShow = false;
        this.statusList.guidelinesShow = t;
        this.$refs.guidelines.getType('使用帮助');
      },
      /**
       * 关闭个人（使用帮助，常见问题切换）
       * @
       * @author erbing
       */
      closeGuidelines (f) {
        this.statusList.guidelinesShow = f;
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
      },
	  	openFeedback (t) {
	  		this.statusList.personModalShow = false;
	  		this.statusList.feedbackShow = t;
	  	},
	  	closeFeedbackModal (f){
	  		this.statusList.feedbackShow = f;
	  	},
			switchModal (evt){
				evt.stopPropagation();
				var obj = evt.target.tagName.toLocaleLowerCase() == 'div' ? evt.target : evt.target.parentNode;
				this.modalCur = obj.dataset.index;
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
					me.statusList.ifFunctionalArea = !viewStatus;
				  me.statusList.ifConditionArea = !viewStatus;
					d3.style.right = viewStatus ? '13px' : '247px';
					d3.style.left = viewStatus ? '13px' : '247px';
					me.viewList[2].class = viewStatus ? 'icon-suoping' : 'icon-quanping1';
					// changeW = {
					// 	width : viewStatus ? 1248 : 760,
					// 	height : viewStatus ? 810 : 810
					// }
          
          changeW = {
            width : viewStatus ? document.documentElement.clientWidth-28 : document.documentElement.clientWidth-498,
            height : viewStatus ? document.documentElement.clientHeight-120 : document.documentElement.clientHeight-120 
          } 
					me.graph.setSize(changeW,parseInt(d3.style.left));
				}
				switch(index)
				{
					case '0':
					  me.statusList.ifFunctionalArea = true;
					  me.statusList.ifConditionArea = true;
						d3.style.right = '247px';
						d3.style.left = '247px';
						me.statusList.d3Show = true;
		        viewStatus = false;
		        execD3View();
					  break;
					case '1':
					  me.statusList.ifFunctionalArea = false;
					  me.statusList.ifConditionArea = true;
						d3.style.right = '13px';
						d3.style.left = '247px';
						me.statusList.d3Show = false;
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
      var width = '';
      var height = '';
       return {
        selector : '#hydra',
        width : width,
        height: height,
        type: 'tree',
        allowDrag:true,
        allowNodeDbclick : false,
        useOverlap: true,
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
			initialize(msg) {
        document.getElementById('hydra').innerHTML = '';
        var me = this;
        this.graph.init();
        me.tempData = msg;
        this.graph.load(msg);
        this.initMenu();
      },
		  createRMenu (data,pos,obj) {
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
          ul.appendChild(lis[i]);
        }
      },
      switchNodeViews () {
        var me = this;
        me.statusList.PersonInforShow = false;
        me.statusList.nodesDetailedShow = false;
      },
      changeData(){
        var arr = [],  tplxs = this.curEneityData.tplxs;
        var tphs = this.tempData.children.map(function(ele){
          return ele.properties.TPBH;
        });
        for (var key in tplxs) {
          arr.push({
            title : key,
            leaves : true,
            children : tplxs[key].filter(function(ele){
              return tphs.indexOf(ele.tpbh) == -1;
            }).map(function(ele){
               return {
                title : ele.tpms,
                children : [],
                ids : ele.tpbh,
                leaves : false
               } 
            })
          })
        }
        return arr.filter(function(ele){
          return ele.children.length;
        });
      },
			initMenu(){
        var me = this;
        var data = [
          {
            // text : '查看档案',
            text : 'message.relation.viewFile',
            url : '',
            method : function () {
              me.switchNodeViews();
              me.statusList.PersonInforShow = true;
              me.getEssentialInfo();
              me.getTrajectoryInfo();
              me.getCorrelationInfo();
              me.showPhotoList();
            }  
          },{

            text : '图谱叠加',
            url : '',
            method : function () {
              me.statusList.MultiModal = true;
              me.statusList.conditionList = false;
              me.statusList.tpList = true;
              me.curtp = me.changeData();
            }  
          }
        ];
				d3.select('.nodes').selectAll('g[type="node"]').on('contextmenu',function(e) {
					d3.event.preventDefault();
          d3.event.stopPropagation();
          var selector = document.querySelector("#hydra");
          var panel = selector.querySelector('.panel');
          if(panel) panel.style.display = 'none'
					if (['rect', 'text'].indexOf(d3.event.srcElement.tagName) != -1 || !e.data.exist) return false;
					//-255 -120 为临时值，需要获取左侧宽和顶部高
          // me.createRMenu(data,{x:d3.event.pageX-255,y:d3.event.pageY-120},e); 
          me.createRMenu(data,{x:d3.event.pageX+50,y:d3.event.pageY-120},e); 
					me.curEneityData = e.data;
          me.nodeID = e.data.oid;
          //me.nodeType = e.nodeType;
          me.nodeType = e.data.nodeType;
          console.log(e);
          //me.nodeDetailsAllData.nodeType = e.nodeType;
          //me.getTrajectoryInfo();
				});
        
			},
      getCheckData(data){
        var arr = [];
        for (var i = 0; i < data.length; i++) {
          if (!data[i].leaves) {
            arr.push(data[i].ids); 
          }
        }
        this.checkData = arr.join(',');
      },
      getlapData(){
        var me = this;
        if (this.checkData.length == 0) {
          me.$Message.warning('请选择图谱！');
          return false;
        };
        var params = new URLSearchParams();
        let url = this.iosPath + '/RiskAssessController/v1/getTpGraph';
        params.append('tpbh', this.checkData);
        params.append('token', me.token);
        params.append('flag', 1);
        this.$axios.post(url, params)
        .then(response => {
          var sdata = response.data.data.tpData.children;
          if (sdata.length ==1) {
            me.tempData.children.push(sdata[0]);
          }else if(sdata.length > 1){
            me.tempData.children = me.tempData.children.concat(sdata);
          }
          var data = me.parseData(me.tempData, me.curEneityData.oid);
          me.graph.load(data);
          me.initMenu();
          me.statusList.tpList = false;
          me.statusList.MultiModal = false;
        })
        .catch(error => {
          console.log(error);
        });
      },
      showPhotoList () {
        var me = this;
        if (!me.curEneityAllData.eneityTrajectoryInfo.showDate) {
          return;
        }
        me.curEneityAllData.eneityTrajectoryInfo.photoNode.forEach(ele => {
          //me.curEneityAllData.eneityTrajectoryInfo.isShow = false;
          me.curEneityAllData.eneityTrajectoryInfo.showDate = false;
          if (ele == me.nodeID) {
            //me.curEneityAllData.eneityTrajectoryInfo.isShow = true;
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
        let url = me.iosPath+'/Vertex/v1/getNodeMsgByID';
        //params.append('params', JSON.stringify(arg));
        params.append('token', me.token);
        params.append('nodeID', me.nodeID);
        params.append('language', me.language);  //切换语言
        if (me.curEneityData.nodeType == 'YS_SJJZXX' || me.curEneityData.nodeType == 'YS_YHKXX' || me.curEneityData.nodeType == 'KDGSXX') {
          params.append('params', '{"beginDate": "'+me.beginDate+' 00-00-00","endDate":"'+me.endDate+' 23-59-59","pageIndex":"'+me.pageIndex+'","pageSize":"'+me.pageSize+'"}');
        }
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
          // me.curEneityAllData.eneityBasicInfo = response.data.data;
          // me.curEneityAllData.eneityBasicInfo.properties = response.data.data[0].properties;
          // me.curEneityAllData.eneityBasicInfo.property_mapping = response.data.data[0].property_mapping;
          for (var i = 0; i < response.data.data[0].property_mapping.length; i++) {
            for(var prop in response.data.data[0].properties){
              if (response.data.data[0].property_mapping[i].NAME == prop) {
                response.data.data[0].property_mapping[i].name = response.data.data[0].properties[prop]
              }
            }
          }
          var data = response.data.data[0].properties.RYBQ;
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
          }
          //话单信息  资金交易  物流信息 数据
          me.curEneityAllData.eneityBasicInfo = response.data.data;
          me.nodeDetailsAllData.allData = response.data.data;
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
        let url = me.iosPath+'/GraphicalController/v1/nodePathAnalysis';
        //params.append('params', JSON.stringify(arg));
        params.append('token', me.token);
        params.append('nodeID', me.nodeID);
        params.append('language', me.language); //语言切换
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
          //me.curEneityAllData.eneityTrajectoryInfo = response.data.data
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
        //let url = 'http://172.16.3.158:2488/iTap_OrientService/GraphicalController/v1/getPathPhoto';
        
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
        let url = me.iosPath+'/Vertex/v1/associationAnalysis';
        //params.append('params', JSON.stringify(arg));
        params.append('token', me.token);
        params.append('nodeID', me.nodeID);
        params.append('nodeType', me.nodeType);
        params.append('language', me.language); //语言切换
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
          for (var j = 0; j < response.data.data.resultData.length; j ++) {
            for (var y = 0; y < this.iconsList.length; y ++) {
              if ( this.iconsList[y].type == response.data.data.resultData[j].iconType) {
                response.data.data.resultData[j].iconTypes = this.iconsList[y].avatar;
                if (response.data.data.resultData[j].nodeName == 'CZRK') {
                  for(var x = 0; x < response.data.data.resultData[j].node_Link.length; x ++){
                    if (response.data.data.resultData[j].node_Link[x].node.properties.XB == '女') {
                      response.data.data.resultData[j].iconTypes = this.iconsList[y].avatar_1;
                    }
                  }
                }
              }
            }
          }
          me.curEneityAllData.eneityCorrelationInfo.data = response.data.data.resultData;
          console.log(me.curEneityAllData.eneityCorrelationInfo.data);
        })
        .catch(error => {
          console.log(error);
        });
      },
			setFetchDetail(entity, relation, time){
				this.fetchDetail.entity = entity;
				this.fetchDetail.relation = relation;
				this.fetchDetail.executeTime = time;
			},
			searchByKeyword(str){
				
			},
      delDuplicate(data,isShow){
        let me = this;
        me.showProperties(data,isShow);
        return data.filter(ele=>!me.d3Data.nodes.filter(el=>el.vid==ele.vid).length);
      },
      parseNodes(data,isShow){
        let me = this;
        me.showProperties(data,isShow);
        return data;
      },
      showProperties (data,isShow) {
        var me = this;
        data.forEach(ele => {
          me.entityPropList.forEach(el=>{
            if (ele.nodeType == el.name) {
              //ele.showProp = el.showProp
              ele.showProperties = el.showProp;
            }
          });
          // if (isShow) {
          //   ele.image =  me.$config.imgPath + ele.properties.SFZHM+".png";
          // }
        });
      },
      saveAsPng(){
        this.graph.exportPic(this.saveName + '叠加图');
      },
      refresh(){
        let me = this;
        me.statusList.d3Loading = true;
        var data = me.tempData;
        me.initialize(data);
        me.statusList.d3Loading = false;
      },
      /**
       * 离开页面清除缓存 removeRedisKey
       * @function unload
       * @author Zhangchan
       */
			unload(){
        // console.log('我离开了！');
        // let url = this.path + '/Vertex/v1/removeRedisKey', me = this;
        // let params = new URLSearchParams();
        // params.append('keyword', this.keyword);
        // params.append('token', this.token);
        // this.$axios.post(url, params)
        // .then(response => {
        //   console.log(response)
        // })
        // .catch(error => {
        //   console.log(error);
        // });
			}
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
  	// background-color: rgba(58, 192, 255, 0.4) !important;
	  // border: solid 1px rgba(101, 176, 247, 0.6) !important;
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
			//background:pink;
			.logo{
				width:479px;
				height:64px;
				line-height: 64px;
				float:left;
				background:url(../../static/images/logo-bg.png) 0 0 no-repeat;
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
					color:#d6e3ff;
					text-shadow: -2px 2px 3px #000;
          font-size: 14px;
					span{
						color: #6280c7;
						text-shadow: -2px 2px 3px #000;
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
			.condition-filter{
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
			.conditionArea-enter-active {
			  transition: all .5s;
			}
			.conditionArea-leave-active {
			  transition: all .1s;
			}
			.conditionArea-enter, .conditionArea-leave-active {
			  transform: translate3d(-246px, 0, 0);
			}
			.functional-area{
				top:0;
				right:0;
				bottom:6px;
				width:242px;
				.post(a);
				background-color: rgba(37,83,176,0.2);
				border: solid 1px #183e85;
				border-right:none;
				transform: translate3d(0, 0, 0);
				.title{
					color: #3aa8fb;
					font-size:14px;
					margin:12px 0 0 5px;
				}
			}
			.funcArea-enter-active {
			  transition: all .5s;
			}
			.funcArea-leave-active {
			  transition: all .1s;
			}
			.funcArea-enter, .funcArea-leave-active {
			  transform: translate3d(242px, 0, 0);
			}
			.d3{
				.post(a);
				top:2px;
				left:0;
        right:0; 
				bottom:6px;
				background:url(../../static/images/net.png) repeat #ffffff;
				border: solid 2px #91b5ff;
        border-radius:5px 5px 0 0;
        -moz-box-shadow: 0px 0px 9px #666 inset;
        -webkit-box-shadow: 0px 0px 9px #666 inset;
        box-shadow: 0px 0px 9px #666 inset;
        // -moz-box-shadow: inset 0px 0px 9px 1px #666;
        // -webkit-box-shadow: inset 0px 0px 9px 1px #666;
        // box-shadow: inset 0px 0px 9px 1px #666;
				.title{
					//width:100%;
          position: absolute;
          top: -3px;
          left: -2px;
          right: -2px;
          border-radius:5px 5px 0 0;
					height: 44px;
					line-height: 44px;
					background-color: #c7d7eb;
					overflow:hidden;
					.search-result{
						font-size:16px;
						color: #2698ed;
						margin-left:16px;
						float:left;
					}
					// .toggle-btn{
					// 	float:right;
					// 	height:44px;
					// 	margin:0 14px 0 0;
					// 	span{
					// 		width:52px;
					// 		height:44px;
					// 		line-height:44px;
					// 		padding-left:24px;
					// 		text-align: center;
					// 		display:inline-block;
					// 		cursor: pointer;
					// 		float: left;
					// 		i{
					// 			color:#8ca1bb;
					// 			font-size:30px;
					// 		}
							
					// 	}
					// 	.viewCur{
					// 		i{
					// 			color:#009aed;
					// 		}
					// 	}
					// }
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
            background:url(../../static/images/grid.png) 0 0 repeat;
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
                background:url(../../static/images/modal-btn.png) 0 0 no-repeat;
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
				// 卡片css
				// .card{
				// 	.post(a);
				// 	top:44px;
				// 	left:0;
				// 	bottom:0;
				// 	right:0;
				// }
        // .card{
        //   top:27px;
        // } 
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
  @media screen and (max-width:1366px){
  	.result{
      header{
        .r_btn{
          width:306px;
        }
      }
			.result-cont{
				.d3{
					.title{
						.search-result{
							font-size:14px;
						}
						.toggle-btn{
							height: 30px;
							span{
								width:44px;
								height:30px;
								line-height:30px;
								i{
									font-size:20px;
								}
								.viewCur{
									color:#009aed;
								}
							}
						}
					}
          .graphical{
            // top:30px;
            top:27px;
          }
          .card{
            top:27px;
          }
				}
			}
  	}
  }
  //条件筛选框css
  .multi-str{
    transform: translate3d(0, 0, 0);
    width: 534px;
    //background: rgba(4, 28, 91, 0.99);
    background: #f6f6f6;
    position: absolute;
    right: 0;
    top: 69px;
    bottom: 6px;
    z-index: 9998;
    border-left: none;
    box-shadow:-2px 0px 10px rgba(0,0,0,.5);
  }
  .multiStr-enter-active, .multiStr-leave-active {
    transition: all .5s;
  }
  .multiStr-enter, .multiStr-leave-active {
    transform: translate3d(534px, 0, 0);
  }
  .condition-modal{
    .multi-sidebar{
      width: 24px;
      .post(a);
      top: 0;
      bottom: 0;
      left: -25px;
      .sidebar-top{
        .post(a);
        width: 9px;
        height:28.6%;
        top: 0;
        right: 1px;
        .polygon{
          .post(a);
          bottom:43px;
          top:0;
          left:0;
          right:0;
          width:0;
          // border-right:10px solid #f6f6f6;
          // border-top:0px solid transparent;
          // border-bottom:10px solid transparent;
        }
      }
      .sidebar-bottom{
        .post(a);
        width: 9px;
        top:71.9%; 
        height: 28.1%; 
        bottom: 0;
        right: 1px;
        .polygon{
          .post(a);
          top:40px;
          left:0;
          right:0;
          bottom:0;
          width:0;
          // border-right:10px solid #f6f6f6;
          // border-top:10px solid transparent;
          // border-bottom:0px solid transparent;
        }
      }
      .close-btn{
        .post(a);
        top: 28.6%; 
        width: 24px;
        height: 43.3%; 
        z-index: 99;
        cursor: pointer;
        //background: url('../../static/images/close-btn2.png') 0 0 no-repeat;
        background-size:100% 100%;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .cont-box{
      width: 100%;
      padding-left:20px;
      // padding-right:15px;
      padding-right:6px;
      position: absolute;
      top: 44px;
      bottom: 61px;
      background:#f6f6f6;
      overflow-y:auto;
      .cont-list{
        padding:20px 0;
        //border-bottom:1px solid #d8d8d8;
        .condition-select{
          .li{
            margin-bottom:20px;
            overflow:hidden;
            span{
              color:#303030;
              font-size:14px;
              margin-right:57px;
              float:left;
            }
            input{
              width:372px;
              height:30px;
              line-height:30px;
              text-indent:10px;
              font-size:14px;
              color:#6a6a6a;
              display:inline-block;
              border-radius:2px;
              border:1px solid #eaeaea;
              background:#fff;
              outline:none;
            }
          }
          li.tp-unit{
            height:30px;
            line-height:30px;
          }
          li.tp-lx{
            overflow:hidden;
          }
          li.family-description{
            overflow:hidden;
            height:400px;
            .box{
              width:372px;
              height:395px;
              border-radius:2px;
              background:#fff;
              float:left;
              font-size:14px;
              color:#6a6a6a;
              border:1px solid #eaeaea;
            }
          }
        }
      }
    }
    .cont-title{
      width:534px;
      height:44px;
      position:absolute;
      top:0;
      //left: -10px;
      right:0;
      background:#f6f6f6;
      border-bottom:1px solid #d8d8d8;
      p{
        font-size:16px;
        color:#0090ea;
        line-height:44px;
        padding-left:10px;
      }
    }
    .cont-btn{
      width: 534px;
      height: 61px;
      background:#fff;
      position: absolute;
      bottom: 0;
      //left: -10px;
      right: 0;
      border-top: 1px solid #d8d8d8;
      span{
        display:inline-block;
        width:93px;
        height:36px;
        margin-top:12px;
        line-height:36px;
        text-align:center;
        cursor:pointer;
        float:right;
      }
      .cancel{
        background:url('../../static/images/cancel.png') 0 0 no-repeat;
        color:#6e6e6e;
        margin:12px 19px 0 13px;
      }
      .sure{
        background:url('../../static/images/sure.png') 0 0 no-repeat;
        color:#ffffff;
      }
    }
  }
  .dtcb{
    width:43px;
    height:134px;
    color:#fff;
    font-size:14px;
    position:absolute;
    right:0;
    top:50%;
    cursor:pointer;
    margin-top:-67px;
    text-align:center;
    background:url('../../static/images/cb.png') 0 0 no-repeat;
    span{
      display:inline-block;
      width:20px;
      margin-top:25px;
      text-shadow: -1px 2px 1px rgba(0, 0, 0, 0.77);
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
  #hydra .titleBox{
    position:absolute;
    z-index:999;
    background:#fff;
    box-shadow: #ccc 0px 0px 8px;
    padding:5px;
    font-size:16px;
  }
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
	.ivu-collapse-simple{
		border:none;
		background:none;
		.ivu-collapse-item{
			border:none;
			.ivu-collapse-header{
        background: #23345a;
        height:40px;
				padding-left:16px;
				font-size:12px;
        //color:#fff;
        color: #3287c6;
        margin-bottom: 1px;
        position: relative;
				i{
					// margin-right:3px;
					// position:relative;
					// top:-2px;
          margin-right:3px;
          position:absolute;
          right:6px; 
          top: 10px;
				}
				i:before{
					font-size: 18px;
				}
			}
			.ivu-collapse-content{
				background:none;
				padding:0;
				.ivu-collapse-content-box{
					overflow:hidden;
					padding-bottom:0;
				}
			}
		}
	}

	.condition-list{
		.ivu-collapse-simple{
			.ivu-collapse-item{
				.ivu-collapse-content{
					.ivu-collapse-content-box{
						overflow:hidden;
						padding-bottom:0;
						ul{
							li{
								// width: 100%;
                width:262px;
								height: 44px;
								//background-color: rgba(27, 155, 237, 0.1);
                border:none;
								border-bottom: solid 1px rgba(37, 82, 176, 0.5);
								cursor: pointer;
								line-height: 44px;
								text-indent: 18px;
								// float:left;
								margin-left:10px;
								color: #68a4f6;
								font-size:12px;
                .iconfont{
                  margin-right:12px;
                }
							}
							.cur{
						  	color:#fff;
						  	background: #1573c3;
							  // border: solid 1px rgba(101, 176, 247, 0.6);
                border:none;
                border-bottom: solid 1px rgba(37, 82, 176, 0.5); 
						  }
						}
					}
				}
			}
		}
	}
	.function-list{
    top:33px;
		right:0;
		bottom:0;
		left:5px;
		overflow-y:auto;
		position:absolute;
		.ivu-collapse-simple{
			.ivu-collapse-item{
				.ivu-collapse-content{
					.ivu-collapse-content-box{
						overflow:hidden;
						padding-bottom:0;
						ul{
							li{
								width: 107px;
								// height: 70px;
								height: 83px;
                background-color: rgba(27, 155, 237, 0.1);
								border: solid 1px rgba(37, 82, 176, 0.5);
								cursor: pointer;
								text-align: center;
								float:left;
								margin:0 4px 5px 0;
								color: #68a4f6;
								font-size:12px;
								// img{
								// 	margin:13px 0 3px;
								// }
								i{
									font-size:25px;
									margin-top:5px;
									display: inline-block;
								}
							}
              li:hover{
                color:#fff;
                background-color: rgba(58, 192, 255, 0.4);
                border: solid 1px rgba(101, 176, 247, 0.6);
              }
							.cur{
								color:#fff;
						  	// background-color: rgba(58, 192, 255, 0.4);
							  // border: solid 1px rgba(101, 176, 247, 0.6)
							  background: #1573c3;
                border:none;
                border-bottom: solid 1px rgba(37, 82, 176, 0.5); 
              }
						}
					}
				}
			}
		}
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

  .select .ivu-select{
    width:277px;
    height: 30px;
    background: #061339;
    .ivu-select-selection{
      background-color: #061339;
      border-radius: 0;
      border: none;
      box-shadow:none;
      .ivu-select-input{
        color: #5cb9ff;
        height: 30px;
        line-height: 30px;
        border: 1px solid #1f3b87;
      }
      input::-webkit-input-placeholder {
        color: #5cb9ff;
      }
      .ivu-select-placeholder{
        color: #5cb9ff;
        height: 30px;
        line-height: 30px;
      }
      .ivu-select-selected-value{
        color: #5cb9ff;
        height: 30px;
        line-height: 30px;
      }
    }
    .ivu-select-dropdown{
      background-image: linear-gradient(135deg, 
        rgba(5, 32, 103, 0.95) 0%, 
        rgba(0, 11, 40, 0.95) 100%), 
      linear-gradient(
        #f6f6f6, 
        #f6f6f6);
      background-blend-mode: normal, 
        normal;
      border: solid 1px #368ecc;
      .ivu-select-dropdown-list{
        overflow:hidden;
        width:277px;
        .ivu-select-item{
          // width: 65px;
          height: 30px;
          line-height: 30px;
          // border-radius: 2px;
          //float:left;
          margin:0 0 5px 3px;
          padding:0;
          clear:none;
          color: #5cb9ff;
          text-align: left;
          white-space:normal;
          position: relative;
          .avatar{
            width:100%;
            height:25px;
            text-align: center;
            margin: 2px 0 0;
            // span{
            //   width:25px !important;
            //   height:25px;
            //   display:block !important;
            //   overflow: hidden;
            //   margin:0 auto;
            //   img{
            //     width:100%;
            //     height:100%;
            //   }
            // }
            i{
              font-size:25px;
              color:#0099fc;
            }
          }
          .icon-xuanze{
            position: absolute;
            right: 0;
            top: 0;
            color:rgba(0, 11, 40, 0);
          }
        }
        .ivu-select-item-selected{
          background-color: #223c82;
          font-size: 12px;
          .icon-xuanze{
            position: absolute;
            right: 0;
            top: 0;
            color:#fecb01;
          }
        }
        .ivu-select-item:hover{
          background-color: #223c82;
        }
      }
    }
  }
  .stlx .ivu-select{
    .ivu-select-dropdown{
      .ivu-select-dropdown-list{
        .ivu-select-item{
          width: 65px;
          height: 51px;
          float:left;
          text-align: center;
          border-radius: 2px;
          overflow:hidden; 
          text-overflow:ellipsis; 
          white-space:nowrap; 
        }
      }
    }
  }
  .gxx .ivu-select{
    width:277px;
    height: 30px;
    background: #061339;
    .ivu-select-selection{
      background-color: #061339;
      border-radius: 0;
      border: none;
      box-shadow:none;
      .ivu-select-input{
        color: #5cb9ff;
        height: 30px;
        line-height: 30px;
        border: 1px solid #1f3b87;
      }
      input::-webkit-input-placeholder {
        color: #5cb9ff;
      }
    }
    .ivu-select-dropdown{
      background-image: linear-gradient(135deg, 
      rgba(5, 32, 103, 0.95) 0%, 
      rgba(0, 11, 40, 0.95) 100%), 
      linear-gradient(
        #f6f6f6, 
        #f6f6f6);
      background-blend-mode: normal, 
        normal;
      border: solid 1px #368ecc;
      .ivu-select-dropdown-list{
        .ivu-select-item{
          width:100%;
          height:30px;
          margin:0;
          color: #5cb9ff;
          text-align: center;
          span{
            display: inline-block;
            width: 100px;
            height: 1px;
          }
          .red{
            background: red;
          }
          .gray{
            background: gray;
          }
          .blue{
            background: blue;
          }
          .purple{
            background: purple;
          }
          .green{
            background: green;
          }
          .pink{
            background: pink;
          }
        }
      }
      .ivu-select-item-selected{
        background-color: #223c82;
        font-size: 12px;
      }
      .ivu-select-item:hover{
        background-color: #223c82;
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
          }
        }
      }
    }
  }



  //选取单位css
  .condition-select{
    li.tp-unit{
      .ivu-dropdown{
        position:absolute;
        width: 372px;
        background: #fff;
        padding-left: 10px;
        border-radius: 2px;
        border:1px solid #eaeaea;
        .ivu-dropdown-rel{
          a{
            font-size:14px;
            color:#6a6a6a;
          }
        }
        .ivu-select-dropdown{
          height:410px;
          overflow-y:auto;
          left:0 !important;
          .ivu-dropdown-menu{
            padding-left:10px;
            .ivu-tree{
              .ivu-tree-children{
                li{
                  margin:0;
                }
              }
            }
          }
        }
      }
    }
    li.tp-lx{
      overflow:hidden;
      .ivu-select{

      }
    }
    li.family-description{
      .box{
        .ivu-checkbox-group{
          height:359px;
          overflow-y:auto;
          padding-left: 10px;
          .ivu-checkbox-group-item{
            display:block;
            margin-bottom:5px;
          }
        }
      }
    }
  }

  //单选
  li.family-description .box{
    overflow-y:scroll;
    .ivu-radio-group{
      margin-left:10px;
      .ivu-radio-wrapper{
        display:block;
        margin-top: 10px;
      }
    }
  }
  
  
  .box::-webkit-scrollbar{width:6px;height:6px;}
  .box::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .box::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .box::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .box::-webkit-scrollbar-corner{background-color:#dadada;}


  .ivu-checkbox-group::-webkit-scrollbar{width:6px;height:6px;}
  .ivu-checkbox-group::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .ivu-checkbox-group::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .ivu-checkbox-group::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .ivu-checkbox-group::-webkit-scrollbar-corner{background-color:#dadada;}

  .ivu-select-dropdown::-webkit-scrollbar{width:6px;height:6px;}
  .ivu-select-dropdown::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .ivu-select-dropdown::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .ivu-select-dropdown::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .ivu-select-dropdown::-webkit-scrollbar-corner{background-color:#dadada;}
</style>
