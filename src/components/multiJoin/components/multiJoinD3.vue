<!--
 * @Author: your name
 * @Date: 2019-09-20 09:11:14
 * @LastEditTime: 2019-10-28 18:14:48
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\multiJoin\components\multiJoinD3.vue
 -->
<template>
  <div class="result" @click="statusList.uploadImg=false;statusList.personModalShow=false;statusList.newsModalShow=false;statusList.appModalShow=false;statusList.messageDetailsShow=false;statusList.guidelinesShow=false;statusList.feedbackShow=false;">
    <header>
      <div class="logo">
        <span class="proj-name">{{this.$config.project.name}}</span>
        <span class="nav"><span @click="backIndex()" style="cursor:pointer;">首页></span>区域串并</span>
      </div>
      <div class="result-search-box">
        <span class="search-btn" @click="getKeywordJzmc">
          <span>搜索一下</span>
        </span>
        <div class="input">
          <!-- <i class="iconfont icon-tianjiazhaopian" @click.stop="statusList.uploadImg=!statusList.uploadImg"></i> -->
          <!-- <i class="iconfont icon-yuyin"></i> -->
          <input type="text" v-model="keyword" @keyup.enter="getKeywordJzmc"/>
        </div>
      </div>
      <switchView ref="switchView" @viewIndex="getViewIndex"></switchView>
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
    <!-- 个人 -->
    <personModal v-show="statusList.personModalShow" ref="personModal" @openFeedbackModal="openFeedback" @openGuideModal="openGuide"></personModal>
    <!-- 消息 -->
    <newsModal v-show="statusList.newsModalShow" ref="newsModal" @openNewsModal="openMessageDetails"></newsModal>
    <!-- 应用 -->
    <transition name="appInforArea">
      <appModal v-show="statusList.appModalShow" ref="appModal" @closeAppModal="closeApp" class="app"></appModal>
    </transition>
    <!-- 使用帮助，常见问题 -->
    <transition name="guidelinesArea">
      <!-- <guidelinesModal v-show="statusList.guidelinesShow" ref="guidelines" @closeGuidelinesModal="openGuide"  @ifCloseGuidelinesShow="openGuide" class="guidelines"></guidelinesModal> -->
      <guidelinesModal v-show="statusList.guidelinesShow" ref="guidelines" @closeGuidelinesModal="closeGuidelines" class="guidelines"></guidelinesModal>
    </transition>
    <!-- 消息(通知，更新，反馈) -->
    <transition name="messageArea">
      <messageModal v-show="statusList.messageDetailsShow" ref="messageDetails" :msgType="msgType" @closeMessageModal="closeMessage" class="message"></messageModal>
    </transition>
    <!-- 意见反馈 -->
    <transition name="feedbackArea">
      <feedbackModal v-show="statusList.feedbackShow" ref="feedback" @closeFeedbackModal="closeFeedbackModal" class="feedbackModal"></feedbackModal>
    </transition>
    <!-- D3控件区域 -->
    <div class="result-cont">
      <!-- <transition name="conditionArea">
        <div class="condition-filter scrollbar" v-show="statusList.ifConditionArea">
          <div class="filter">
            <div class="condition-list scrollbar">
            </div>
          </div>
          <div class="filters-con-loading" v-show="filtersConLoading">
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
          <span class="search-result">{{'用时 ' + fetchDetail.executeTime + ' 秒'}}</span>
          <!-- <span class="search-result">{{'人员总数 ' + fetchDetail.entity + '，用时 ' + fetchDetail.executeTime + ' 秒'}}</span> -->
          <!-- <div class="toggle-btn" @click="openD3Card">
            <span v-for="(item,index) in viewList" :key="index" :class="{ viewCur:index==current}" :data-index="index"><i :class="'iconfont '+ item.class"></i></span>
          </div> -->
        </div>
        <!-- d3图形展示 -->
        <div class="graphical" v-show="statusList.d3Show">
          <!-- 风险要素组件 -->
          <riskLevel :assessData="assessData"></riskLevel>
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
          <div class="common-person">
            <ul>
              <li v-for="(item,index) in fetchDetail.frequency" :key="index" :style="{background:item.color}" @click="showKeyNode(item.id,item.color)">
                <span>{{item.name}}</span>
                <!-- <span>{{item.idNum}}</span> -->
                <span>频次：</span>
                <span>{{item.count+'次'}}</span>
              </li>
            </ul>
          </div>
          <div v-show="statusList.d3Show" id="hydra" width="1300" height="800"></div>
          <div class="loading-bg" v-show="statusList.d3Loading">
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
    <!-- 个人信息 -->
    <transition name="personInforArea">
      <PersonInfor ref="PersonInfor" :node="curEneityData" :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData" v-show="statusList.PersonInforShow" @listenToChild="hidePersonInfor" @switchTrajectory="switchTrajectory" @changeTime="changeTime" @returnHistory="returnHistory" class="personInfo"></PersonInfor>
    </transition>
    <!-- 物流，话单，资金 -->
    <transition name="nodesDetailedArea">
      <nodesDetailed ref="nodesDetailed" :modal="nodeDetailsAllData" v-show="statusList.nodesDetailedShow" class="nodesDetailed" @closeNodesDetailed="closeNodesDetailed" @changePage="changePage"></nodesDetailed>
    </transition>
    <!-- 串并筛选框 -->
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
            <div class="cont-list" v-for="(items,index) in multiJoinData" :key="index" :data-index="index">
              <ul class="condition-select multi-join">
                <!-- <li style="margin:0 0 10px 127px;">
                  <a href="javascript:void(0)">
                    {{ multiJoinData[0].filterDataLength == 0 ? '请选取地区单位' : '已选择'+multiJoinData[0].filterDataLength+'个单位' }}
                  </a>
                </li> -->
                <li class="li tp-unit">
                  <span>地区单位：</span>
                  <!-- <input type="text"> -->
                  <Dropdown trigger="click">
                    <Input v-model="searchCondition" :placeholder="multiJoinData[0].filterDataLength == 0 ? '请选取地区单位' : '已选择'+multiJoinData[0].filterDataLength+'个单位'"/>
                    <!-- <a href="javascript:void(0)">
                      {{ multiJoinData[0].filterDataLength == 0 ? '请选取单位' : '已选择'+multiJoinData[0].filterDataLength+'个单位' }}
                      <Icon type="ios-arrow-down"></Icon>
                    </a> -->
                    <DropdownMenu slot="list">
                      <!-- <Tree :filter-node-method="filterNode" :data="items.filterCondition" :multiple="true" ref="multJoinTree" @on-check-change="getGraphData" @on-toggle-expand="getData" show-checkbox></Tree> -->
                      <Tree :data="items.filterCondition" :multiple="true" ref="multJoinTree" @on-check-change="getGraphData" @on-toggle-expand="getData" show-checkbox></Tree>
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <!-- (后期备用)-->
                <li class="li tp-lx">
                  <span>图谱类型：</span>
                  <Select v-model="items.tplxValue" multiple style="width:372px" @on-change="getTplxValue">
                    <Option v-for="(item,index) in items.tplxList" :value="item.value" :key="index">
                      {{ item.name }}
                    </Option>
                  </Select>
                </li>
                <!-- <li class="li">
                  <span>身份证号：</span>
                  <input type="text" placeholder="输入身份证" v-model="items.IdCard" @change="getSfzhmData">
                </li> -->
                <!-- <li class="li">
                  <span>图谱编号：</span>
                  <input type="text" placeholder="输入图谱编号" v-model="items.tpNumber" @input="changeTpbh">
                </li>
                <li class="li">
                  <span>图谱名称：</span>
                  <input type="text" placeholder="输入图谱名称" v-model="items.tpName" @input="changeTpms">
                </li> -->
                <li class="li family-description">
                  <span>图谱名称：</span>
                  <div class="wrapper">
                    <div class="box">
                      <!-- 多选 (后期备用)-->
                      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;padding-left:10px;">
                        <Checkbox
                        :indeterminate="items.indeterminate"
                        :value="items.checkAll"
                        @click.prevent.native="handleCheckAll">
                        全选
                        </Checkbox>
                      </div>
                      <CheckboxGroup v-model="items.checkAllGroup" @on-change="checkAllGroupChange">
                          <Checkbox :label="item.tpid" v-for="(item,index) in items.AllGroup" :key="index">{{ item.tpmc }}</Checkbox>
                      </CheckboxGroup>

                      <!-- 单选 -->
                      <!-- <RadioGroup v-model="items.radio">
                        <Radio :label="item.tpid" v-for="(item,index) in items.AllGroup" :key="index">{{ item.tpmc }}
                          <p>{{ item.tppg }}</p>
                        </Radio>
                      </RadioGroup> -->
                    </div>
                    <div class="loading-tpmc" v-show="statusList.loadingTpmcShow">
                      <div class="loader-tpmc"></div>
                    </div>
                  </div>
                </li>
                <li class="page-tpmc">
                  <Page :total="items.pageTotal" :page-size="10" :current="items.pageIndex" @on-change="getPageIndex"/>
                </li>
              </ul>
              <!-- <ul class="condition-select" v-show="statusList.tpList">
                <li class="li tp-unit" style="height:540px;overflow-y:auto;">
                  <span style="margin-right:0;">图谱名称：</span>
                  <DropdownMenu slot="list" style="background: #fff;margin-left: 80px;padding-left: 20px;margin-top: 10px;">
                    <Tree :data="curtp" :multiple="true" @on-check-change="getCheckData" show-checkbox></Tree>
                  </DropdownMenu>
                </li>
              </ul> -->
            </div>
          </div>
          <div class="cont-title">
            <p>区域串并</p>
          </div>
          <div class="cont-btn">
            <span class="cancel" @click="closeMultiModal">取消串并</span>
            <span class="sure" v-if="hasFunAuth(constantFunMap.FUN_MultiJoin_StartJoin_ID)" @click="getTreeData(true)">开始串并</span>
            <!-- <span class="sure" @click="getTreeData(true)">开始串并</span> -->
          </div>
          <!-- <div class="cont-btn" v-if="statusList.tpList">
            <span class="cancel" @click="closeMultiModal">取消</span>
            <span class="sure" @click="getlapData">确定</span>
          </div> -->
        </div>
      </div>
    </transition>
    <!-- 多图串并按钮 -->
    <div class="dtcb" v-show="statusList.ShowMultiModal" @click="ShowMulti">
      <span>区域串并</span>
    </div>
    <!-- 历史记录 -->
    <transition name="historyModal">
			<div class="history" v-show="statusList.historyModalShow">
        <div class="inforModal-sidebar">
          <div class="sidebar-top"></div>
          <div class="close-btn" @click="closeHistoryModal"></div>
          <div class="sidebar-bottom"></div>
        </div>
        <div class="cont-box">
          <div class="grid-box">
            <div class="head-left"></div>
            <div class="title">
              <span>历史记录</span>
              <span @click="closeHistoryModal"><i class="iconfont close icon-guanbi1"></i></span>
            </div>
            <div class="infor-details bar">
              <div class="return"><span @click="returnPrevTp">返回</span></div>
              <Timeline>
                <TimelineItem v-for="(item,index) in historyData" :key="index">
                  <!-- <div :class="'icon '+'color'+item.color" :style="{color:item.color}"> -->
                  <div class="icon" :style="{background:item.color}" @click="againGetTree(item.id)">
                    <span>{{ item.type }}</span>
                  </div>
                  <div class="content-date">
                    <p class="time">{{ item.date.substring(0, 10) }}</p>
                    <p class="content">{{ item.date.substring(11,19) }}</p>
                  </div>
                  <div class="content-infor">
                    <ul>
                      <li><span>{{ item.name }}</span></li>
                      <li>{{ item.tplx }}</li>
                    </ul>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </div>
        </div>
      </div>
		</transition>
  </div>
</template>

<script>
import moment from 'moment'
import * as d3 from 'd3v4'
import switchView from '@/components/assembly/SwitchView'
import personModal from '@/components/assembly/PersonModal'
import newsModal from '@/components/assembly/NewsModal'
import appModal from '@/components/assembly/AppList'
import guidelinesModal from '@/components/assembly/Guidelines'
import messageModal from '@/components/assembly/MessageDetails'
import feedbackModal from '@/components/assembly/FeedBack'
import PersonInfor from '@/components/assembly/PersonInfor'
import nodesDetailed from '@/components/assembly/NodesDetailed'
import RiskLevel from '@/components/riskLevel/RiskLevel'
import * as comApis from '@/api/common.js'
export default {
  name: 'MultiJoin',
    components: {
      switchView,
      personModal,
      newsModal,
      appModal,
      guidelinesModal,
      messageModal,
      feedbackModal,
      PersonInfor,
      nodesDetailed,
      RiskLevel
    },
  data () {
    return {
      hydraType: this.$config.project.hydraType,  //D3卡片展示
      hydra: '',  //D3卡片展示
      searchCondition: '',
      result: [],
      keyword: '',
      language: '',
      tpidJoin: this.$route.query.tpid,  //智能搜索页面图谱跳转过来判断（备用）
      token: '',
      path : this.$config.home,
      iosPath : this.$config.iosPath,
      joinPath : this.$config.joinPath,
      indexHome : this.$config.indexHome,
      statusList: {
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
        MultiModal: true,
        ShowMultiModal: true,
        // conditionList: true,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false
      },
      uploadList : [],
      msgType : '',
      fetchDetail : {
        entity : 0,
        executeTime : 0,
        frequency : []
      },
      saveName : '',
      graph : '',
      nodeID: '',
      nodeType: '',
      curEneityData: {},
      curEneityAllData:{
        fxpf: '',
        rybq: [],
        imgSrc: '',
        labelBgColor: [],
        eneityBasicInfo : '',
        // eneityBasicInfo : [],
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
        },
      },
      commonIds : [], // 共同人ids
      nodeDetailsAllData: {
        beginDate:"2016-01-01 00:00:00",
        endDate:"2017-03-31 23:59:59",
        allData:[]
      },
      resultFilterCondition: [],
      multiJoinData: [
        {
          allData: [],
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
          radio: '',
          pageTotal: 0,
          pageIndex: 1
        }
      ],
      curtp : [],
      tempData: {},
      historyData: [],
      ifClearHistoryData: true,
      addHistory: {
        type: '',
        color: '',
        date: "",
        name: '',
        tplx: ''
      },
      ifAdd: true,
      assessData: {
        label: "",
        personCount: 0,
        riskLevel: "",
        tpmc:"",
        personLabelCount: {}
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
      multiJoinPassiveID: '',
      byType: '',
      nodesStatus: true,
      prevId: ''
    }
  },
  created () {
    //console.log('Join11111111111',this.$store.getters.citys);
    // if(sessionStorage.mapNumber){
    //   this.getTreeData(sessionStorage.mapNumber);
    // }
    this.hydra = require(`../../static/vendors/${this.hydraType}.js`);  //D3卡片展示
    this.getEntityLinksConfig();
    this.curEneityAllData.eneityTrajectoryInfo.endTime = moment(new Date()).format('YYYY-MM-DD');
    // if(this.$store.getters.citys.length == 0){
    //   this.getFilterCondition();
    // }
    // this.multiJoinData[0].filterCondition = this.$store.getters.citys;
    this.getFilterCondition();
  },
  mounted(){
    const me = this;
    this.opt = this.buildOpt();
    console.log(this.hydra.default.graph(),'------hydra.graph()');
    this.hydra = require(`../../static/vendors/${this.hydraType}.js`);  //D3卡片展示
    //this.graph = hydra.graph();
    this.graph = this.hydra.default.graph(); //D3卡片展示
    this.graph.setOptions(this.opt);
    this.graph.setIcons(me.iconsList);
    window.onresize = function(){
      let ch = document.documentElement.clientHeight;
      let cw = document.documentElement.clientWidth;
      console.log(cw);
      me.graph.setSize({
        //width : cw -504,
        //height : ch-115
        width : cw-255,
        height : ch-120
      });
    };
    if(this.tpidJoin){  //智能搜索页面图谱跳转过来判断（备用）
      this.getTreeData(true);
    }
  },
  watch: {
    searchCondition(val) {
      this.result = [];  //每次搜索前清空result
      if(!val){
        this.multiJoinData[0].filterCondition = this.resultFilterCondition;
      }else{
        this.search(this.resultFilterCondition,this.result);
        this.multiJoinData[0].filterCondition = this.result;
      }
    }
  },
  methods : {
    /**
     * 单位树模糊查询
     * @function search
     * @author erbing
     */
    search (data,result) {
      data.forEach((item) => {
        // 如果该数组title字段匹配搜索字段，添加该数组，此时children为空
        var temp ={};
        if(item.title.indexOf(this.searchCondition) !== -1){
          temp = {
            expand: item.expand,
            id: item.id,
            leaves: item.leaves,
            nodeKey: item.nodeKey,
            title: item.title,
            children: []
          }
          result.push(temp);
        }
        // 如果该数组有子集，递归子集children
        if (item.children) {
          if(temp.children){
            this.search(item.children,temp.children);
          }else{
            this.search(item.children,result);
          }
        }
      })
    },
    /**
     * 获取所有相关配置表
     * @function getEntityLinksConfig
     * @author erbing
     */
    getEntityLinksConfig () {
      let me = this;
      let params = new URLSearchParams();
      let url = this.joinPath +'InitializeResource/v1/getInitializeConfig?language='+me.language+'&token='+me.token;
      //params.append('token', me.token);
      this.$axios.get(url, params).then(response => {
        if (response.code != 200) {
          return false;
        }
        me.entityPropList = response.data.nodeConfig;
        me.linksPropList = response.data.linkConfig;
        // me.multiJoinData[0].tplxList = response.data.tplx;
        me.multiJoinData[0].tplxList = response.data.tplxMapping;  //配置修改
        me.iconsList = response.data.nodeIconConfig;
        me.labelColors = response.data.labelColors;
        me.iconsList.map(item=>{
          for(let i in item){
            if (i=='path_1') {
              item['path_n'] = item[i];
            }
          }
        })
        me.graph.setIcons(response.data.nodeIconConfig);
      })
      .catch(error => {
        console.log(error);
      });
    },
    setFetchDetail(entity, relation, time){
      this.fetchDetail.entity = entity;
      //this.fetchDetail.relation = relation;
      this.fetchDetail.executeTime = time;
    },
    buildOpt(){
      var me = this;
      var width = document.getElementById('hydra').offsetWidth;
      var height = document.documentElement.clientHeight - 110;
      return {
        selector : '#hydra',
        width : width,
        height: height,
        offsetTop : 115,
        type: 'tree',
        showToptag: true,
        allowDrag:true,
        allowNodeDbclick : false,
        expandlist : ["del", "lock","expand"],
        highlightText : '',
        showToptagMenu : true,
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
        },
        topTagClickEvt : function(data){
          var date = new Date();
          var nowDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          if(me.statusList.PersonInforShow){
            me.statusList.PersonInforShow = false;
          }
          if(me.statusList.MultiModal){
            me.statusList.MultiModal = false;
          }
          me.statusList.historyModalShow = true;
          if(!data){
            return;
          }
          // me.commonIds = [];
          // me.commonIds[0] = data.oid;
          me.addHistory = {
            id: data.tpid,
            type: data.type,
            color: data.color,
            date: nowDate,
            name: data.name,
            tplx: data.tpms,
            parentTpid: data.parentTpid
          }
          // me.historyData.forEach(function(item){
          //   console.log(item.id);
          //   if(item.id == data.tpid){
          //     alert('重复添加');
          //     me.ifAdd = false;
          //   }else{
          //     me.ifAdd = true;
          //   }
          // })
          // if(me.ifAdd){
          //   me.historyData.unshift(me.addHistory)
          // }

          // if(me.addHistory.length != 0){
          //   me.historyData = [];
          // }
          me.multiJoinData[0].checkAllGroup = data.tpid;
          var pid = data.parentTpid.replace('i','#').replace('_',':');
          sessionStorage.multiJoinPassiveID = pid;
          me.historyData.unshift(me.addHistory);
          me.getTreeData(false);
          console.log(data,'节点相关数据')
        },
        mouseoutEvt : function (data){
          //console.log(data,'鼠标移出事件');
        }
      }
    },
    initialize(msg) {
      document.getElementById('hydra').innerHTML = '';
      var me = this;
      this.graph.init();
      me.tempData = msg;
      // me.graph.setHighlightText(me.keyword);
      console.log(me.keyword,111);
      this.graph.load(msg);
      this.initMenu();
    },
    /**
     * 初始化D3右键按钮
     * @function searchByKeyword
     * @author erbing
     */
    initMenu(){
      var me = this;
      var data = [
        {
          text : '查看档案',
          //text : 'message.relation.viewFile',
          url : '',
          method : function () {
            //me.switchNodeViews();
            if(me.statusList.historyModalShow){
              me.statusList.historyModalShow = false;
            }
            if(me.statusList.MultiModal){
              me.statusList.MultiModal = false;
            }
            me.statusList.PersonInforShow = true;
            me.getEssentialInfo();
            //me.getTrajectoryInfo();  //获取轨迹信息（备用）
            me.getCorrelationInfo();
            //me.showPhotoList();
          }
        }
        // ,{
        //   text : '图谱叠加',
        //   url : '',
        //   method : function () {
        //     me.statusList.MultiModal = true;
        //     me.statusList.conditionList = false;
        //     me.statusList.tpList = true;
        //     me.curtp = me.changeData();
        //   }
        // }
      ];
      d3.select('.nodes').selectAll('g[type="node"]').on('contextmenu',function(e) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
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
    /**
     * 创建D3右键按钮
     * @function createRMenu
     * @author erbing
     */
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
    /**
     * 返回主页
     * @function backIndex
     * @author erbing
     */
    backIndex (){
      this.$router.push({
        path: '/index',
      });
    },
    /**
     * 上传图片功能
     * @function handleBeforeUpload
     * @author erbing
     */
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
    /**
     * 上传图片功能
     * @function handleRemove
     * @author erbing
     */
    handleRemove(file) {
      this.statusList.uploadImg=!this.statusList.uploadImg;
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    /**
     * 上传图片功能
     * @function handleFormatError
     * @author erbing
     */
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    /**
     * 上传图片功能
     * @function handleMaxSize
     * @author erbing
     */
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
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
     * 个人，消息，应用切换
     * @function getViewIndex
     * @author erbing
     */
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
      }
    },
    /**
     * 关闭个人（使用帮助，常见问题切换）
     * @
     * @author erbing
     */
    closeGuidelines (f) {
      this.statusList.guidelinesShow = f;
    },
    /**
     * 打开对应的消息弹框
     * @function openMessageDetails
     * @author erbing
     */
    openMessageDetails (txt) {
      var me = this;
      me.statusList.newsModalShow = false;
      me.msgType = 'name' + (txt+1);
      me.statusList.messageDetailsShow = true;
      this.$refs.messageDetails.getMessageType(me.msgType);
    },
    /**
     * 关闭消息弹框
     * @function closeMessage
     * @author erbing
     */
    closeMessage (f) {
      this.statusList.messageDetailsShow = f;
    },
    /**
     * 关闭应用
     * @function closeApp
     * @author erbing
     */
    closeApp (f) {
      this.statusList.appModalShow = f;
    },
    /**
     * 打开意见反馈
     * @function closeFeedbackModal
     * @author erbing
     */
    openFeedback (t) {
      this.statusList.personModalShow = false;
      this.statusList.feedbackShow = t;
    },
    /**
     * 关闭意见反馈
     * @function closeFeedbackModal
     * @author erbing
     */
    closeFeedbackModal (f){
      this.statusList.feedbackShow = f;
    },
    /**
     * D3保存图片
     * @function saveAsPng
     * @author erbing
     */
    saveAsPng(){
      this.graph.exportPic(this.saveName + '串并图');
    },
    refresh(){
      let me = this;
      me.statusList.d3Loading = true;
      var data = me.tempData;
      me.initialize(data);
      me.statusList.d3Loading = false;
    },
    /**
     * 获取个人信息（基本信息/查看档案基本信息）
     * @function getEssentialInfo
     * @author Erbing
     */
    getEssentialInfo () {
      let me = this;
      let params = new URLSearchParams();
      let url = me.joinPath+'PersonalRecordResource/v1/PersonInformation/id/'+me.nodeID+'';
      //params.append('params', JSON.stringify(arg));
      params.append('token', me.token);
      params.append('id', me.nodeID);
      params.append('type', me.curEneityData.nodeType);
      //params.append('nodeID', 'i23_34650');
      //params.append('language', me.language);  //切换语言
      // if (me.curEneityData.nodeType == 'YS_SJJZXX' || me.curEneityData.nodeType == 'YS_YHKXX' || me.curEneityData.nodeType == 'KDGSXX') {
      //   params.append('params', '{"beginDate": "'+me.beginDate+' 00-00-00","endDate":"'+me.endDate+' 23-59-59","pageIndex":"'+me.pageIndex+'","pageSize":"'+me.pageSize+'"}');
      // }
      this.$axios.post(url, params)
      .then(response => {
        if (response.code != 200) {
          return false;
        }
        // me.curEneityAllData.eneityBasicInfo = response.data.data;
        // me.curEneityAllData.eneityBasicInfo.properties = response.data.data[0].properties;
        // me.curEneityAllData.eneityBasicInfo.property_mapping = response.data.data[0].property_mapping;
        for (var i = 0; i < response.data.property_mapping.length; i++) {
          for(var prop in response.data.property){
            if (response.data.property_mapping[i].fieleName == prop) {
              response.data.property_mapping[i].name = response.data.property[prop]
            }
          }
        }
        var data = response.data.property.RYBQ;
        if(!data){
          me.curEneityAllData.rybq = [];
        }
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
        //话单信息  资金交易  物流信息 数据 （后期备用）
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
     * 获取关联分析数据/查看档案关联分析
     * @function getCorrelationInfo
     * @author Erbing
     */
    getCorrelationInfo () {
      let me = this;
      // 获取前 先清空关联分析数据
      me.curEneityAllData.eneityCorrelationInfo.data = [];

      let params = new URLSearchParams();
      let url = me.joinPath+'PersonalRecordResource/v1/associationAnalysis/id/'+me.nodeID+'';
      //params.append('params', JSON.stringify(arg));
      params.append('token', me.token);
      // params.append('nodeID', me.nodeID);
      params.append('nodeType', me.nodeType);
      //params.append('nodeType', 'QB_ZP_RY');
      // params.append('language', me.language); //语言切换
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
    /**
     * 轨迹信息切换
     * @function switchTrajectory
     * @author Erbing
     */
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
    /**
     * 隐藏个人信息面板
     * @function switchTrajectory
     * @author Erbing
     */
    hidePersonInfor (data) {
      this.statusList.PersonInforShow = data;
    },
    /**
     * 显示历史记录面板
     * @function returnHistory
     * @author Erbing
     */
    returnHistory () {
      this.statusList.PersonInforShow = false;
      this.statusList.historyModalShow = true;
    },
    /**
     * 根据时间不同加载数据 （后期备用）
     * @function switchTrajectory
     * @author Erbing
     */
    changeTime (date,type) {
      if (type == 'start') {
        this.curEneityAllData.eneityTrajectoryInfo.startTime = date;
      }else{
        this.curEneityAllData.eneityTrajectoryInfo.endTime = date;
      };
      //this.getPhotos();
    },
    /**
     * 获取轨迹信息/图片信息列表 （后期备用）
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
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 关闭 （物流，话单，资金面板） （后期备用）
     * @function getPhotos
     * @author Erbing
     */
    closeNodesDetailed (data) {
      this.statusList.nodesDetailedShow = data;
    },
    /**
     * 根据开始，结束时间的选取重新获取数据 （后期备用）
     * @function getPhotos
     * @author Erbing
     */
    changePage (date,type) {
      if (type == 'start') {
        this.beginDate = date;
      }else{
        this.endDate = date;
      };
      this.getEssentialInfo();
    },
    /**
     * 打开串并筛选条件面板
     * @function ShowMulti
     * @author erbing
     */
    ShowMulti () {
      this.statusList.ShowMultiModal = false;
      this.statusList.MultiModal = true;
      //this.statusList.conditionList = true;
    },
    /**
     * 关闭串并筛选条件面板
     * @function closeMultiModal
     * @author erbing
     */
    closeMultiModal () {
      this.statusList.MultiModal = false;
      this.statusList.ShowMultiModal = true;
      //this.statusList.conditionList = false;
      this.statusList.tpList = false;
    },
    /**
     * 获取地区（所有单位列表）数据
     * @function getFilterCondition
     * @author Zhangchan
     */
    getFilterCondition () {
      this.filtersConLoading = true;
      let me = this;
      // let params = new URLSearchParams();
      // let url = me.joinPath + 'MapStatisticsResource/v1/queryCountyTree';
      // params.append('token', me.token);
      // this.$axios.post(url,params)
      comApis.getDeptTree().then(response => {
        if(response.code == 200){
          this.filtersConLoading = false;
          var obj = response.data;
          me.multiJoinData.forEach(item => {
            console.log(item);
            //item.filterCondition = obj[0].children;
            // item.filterCondition = eval("("+response.data+")");
            item.filterCondition = response.data;
            this.$store.dispatch('citys', response.data);  //刷新页面重新存储数据到状态管理仓库
          })
          this.resultFilterCondition = obj;
          //me.filterCondition = obj[0].children;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 通过输入关键字获取图谱名称列表
     * @function getKeywordJzmc
     * @author erbing
     */
    getKeywordJzmc () {
      this.multiJoinData[0].IdCard = '';
      this.getJzmc(true);
    },
    /**
     * 通过输入身份证号获取图谱名称列表
     * @function getSfzhmData
     * @author erbing
     */
    getSfzhmData () {
      this.keyword = '';
      this.getJzmc(true);
    },
    getJzmc (flag) {
      var me = this;
      me.byType = 'byKerword';
      if(flag){
        me.multiJoinData[0].pageIndex = 1
      }
      // this.multiJoinData[0].IdCard = this.keyword;
      if(me.statusList.historyModalShow){
        me.statusList.historyModalShow = false;
      }
      if(me.statusList.PersonInforShow){
        me.statusList.PersonInforShow = false;
      }
      document.getElementById('hydra').innerHTML = '';  //清空D3图形化
      me.assessData = {
        label: "",
        personCount: 0,
        riskLevel: "",
        tpmc:""
      },
      me.multiJoinData[0].radio = '';  //清空图谱名称单选选中
      me.multiJoinData[0].allData.forEach(function(item){  //清空选中的单位节点
        item.checked = false;
      })
      me.$refs.multJoinTree[0].getCheckedAndIndeterminateNodes().forEach(function(item){
        item.indeterminate = false;  //清空半选节点
      })
      me.multiJoinData[0].filterDataLength = 0;  //清空选中的单位
      me.statusList.MultiModal = true;
      me.historyData = [];  //清空历史记录
      //this.getJzmcData();
      me.statusList.loadingTpmcShow = true;
      let url = me.joinPath + 'areamapseriesparallelresource/v1/map/keyword';
      var params = new URLSearchParams();
      params.append('keyword', me.keyword || me.multiJoinData[0].IdCard);
      params.append('token', me.token);
      params.append('pageIndex', me.multiJoinData[0].pageIndex);
      params.append('pageSize', 10);
      this.$axios.post(url, params)
      .then(response => {
        if(!response.data){
          this.$Message.warning(response.msg);
          me.multiJoinData[0].AllGroup = [];
          me.statusList.loadingTpmcShow = false;
          me.multiJoinData[0].pageTotal = 0;
          return false;
        }
        const data = response.data.data;
        me.multiJoinData[0].group = [];
        me.multiJoinData[0].radio = '';
        data.forEach(item=>{
          me.multiJoinData[0].group.push(item.tpid)
        })
        data.forEach(item=>{
          item.tppg = item.tppg.replace('{','').replace('}','');
        })
        me.statusList.loadingTpmcShow = false;
        me.multiJoinData[0].AllGroup = data;
        me.multiJoinData[0].pageTotal = response.data.total;
      })
      .catch(error => {
        me.$Message.warning('未查询到相关数据！');
        me.multiJoinData[0].AllGroup = [];
        me.multiJoinData[0].pageTotal = 0;
        me.statusList.loadingTpmcShow = false;
        //console.log(error);
      });
    },
    /**
     * 根据选取的单位，筛选出图谱名称列表
     * @function getGraphData
     * @author Zhangchan
     */
    getGraphData (data) {  //
      var me = this;
      me.keyword = '';  //根据单位选取，清空搜索关键字
      me.multiJoinData[0].allData = data;
      me.multiJoinData[0].filterDataLength = data.length;
      // var str = data.filter(function(ele){
      //   return !ele.leaves;
      // }).map(function(ele){
      //   return ele.title;
      // }).join(',')
      // if (!str){
      //   // alert('no data')
      //   return false;
      // }
      // if(this.multiJoinData[0].filterDataLength != 0 && me.multiJoinData[0].tplxValue.length != 0){
      //   me.getJzmcData();
      // }

      var str = data.map(function(ele){
        return ele.title;
      }).join(',')
      me.multiJoinData[0].filterData = str;
      if(!me.multiJoinData[0].filterData){
        me.multiJoinData[0].AllGroup = [];
        me.multiJoinData[0].pageTotal = 0;
        return false;
      }
      me.getJzmcData(true);
    },
    getData (e) {
      console.log(e,e.expand);
    },
    /**
     * 获取图谱类型
     * @function getTplxValue
     * @author Zhangchan
     */
    getTplxValue () {
      // if(this.multiJoinData[0].tplxValue.length == 0){
      //   this.multiJoinData[0].tplxValue = [];
      // }
      //if(this.multiJoinData[0].tplxValue.length != 0 && this.multiJoinData[0].filterDataLength != 0){
        this.getJzmcData()
      //}
    },
    // /**
    //  * 清空图谱类型
    //  * @function getTplxValue
    //  * @author Zhangchan
    //  */
    // clearTplxValue () {
    //   //this.multiJoinData[0].tplxValue = '';
    //   this.getJzmcData()
    // },
    /**
     * 分页点击每一页获取家族图谱名称列表
     * @function getJzmcData
     * @author erbing
     */
    getPageIndex (page) {
      var me = this;
      me.multiJoinData[0].pageIndex = page;
      if(me.byType == 'byCompany'){
        me.multiJoinData[0].indeterminate = false;
        me.multiJoinData[0].checkAll = false;

        me.multiJoinData[0].checkAllGroup = [];
        me.getJzmcData(false);
      }else {
        me.getJzmc(false);
      }
    },
    /**
     * 通过选取单位/图谱类型获取家族图谱名称列表
     * @function getJzmcData
     * @author erbing
     */
    getJzmcData (flag) {
      var me = this;
      me.byType = 'byCompany';
      if(flag){
        me.multiJoinData[0].pageIndex = 1
      }
      // let url = this.iosPath + '/GraphCollisionController/v1/getTpByFilter';
      me.statusList.loadingTpmcShow = true;
      let url = me.joinPath + 'areamapseriesparallelresource/v1/map/region/type';
      var params = new URLSearchParams();
      params.append('regions', me.multiJoinData[0].filterData);
      params.append('token', me.token);
      params.append('types', me.multiJoinData[0].tplxValue);
      params.append('pageIndex', me.multiJoinData[0].pageIndex);
      params.append('pageSize', 10);
      // params.append('tplxs', me.multiJoinData[0].tplxValue);
      // params.append('sfzhm', me.multiJoinData[0].IdCard);
      // params.append('tpbh', me.multiJoinData[0].tpNumber);
      // params.append('tpms', me.multiJoinData[0].tpName);
      // params.append('type', 'tpcb');
      this.$axios.post(url, params)
      .then(response => {
        const data = response.data.data;
        if(response.code != 200){
          this.$Message.warning(response.msg);
          me.multiJoinData[0].AllGroup = [];
          me.statusList.loadingTpmcShow = false;
          me.multiJoinData[0].pageTotal = 0;
          return false;
        }
        me.multiJoinData[0].group = [];
        me.multiJoinData[0].radio = '';
        data.forEach(item=>{
          if(!item.tppg){
            item.tppg = {危: 0, 境: 0, 户: 0, 宗: 0, 案: 0, 朝: 0, 社: 0};
          }else{
            item.tppg = item.tppg.replace('{','').replace('}','');
          }
          me.multiJoinData[0].group.push(item.tpid)
        })
        // data.forEach(item=>{
        //   item.tppg = item.tppg.replace('{','').replace('}','');
        // })
        me.statusList.loadingTpmcShow = false;
        me.multiJoinData[0].AllGroup = data;
        me.multiJoinData[0].pageTotal = response.data.total;
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 家族图谱名称全选
     * @function handleCheckAll
     * @author erbing
     */
    handleCheckAll () {
      this.multiJoinData.forEach(item => {
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
    /**
     * 家族图谱名称全选选
     * @function checkAllGroupChange
     * @author erbing
     */
    checkAllGroupChange (data) {
      this.multiJoinData.forEach(item => {
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
      console.log(this.multiJoinData[0].checkAllGroup)
    },
    /**
     * 获取串并树形图展示的数据
     * @function getTreeData
     * @author erbing
     */
    getTreeData (flag) {
      var me = this;
      // if (me.multiJoinData[0].checkAllGroup.length == 0  && !mapNumber) {
      if (me.multiJoinData[0].checkAllGroup.length == 0) {
        me.$Message.warning('请选择家族名称！');
        return false;
      };
      // var params = new URLSearchParams();
      // let url = this.iosPath + '/RiskAssessController/v1/getTpGraph';
      // if (me.multiJoinData[0].checkAllGroup.length!=0) {
      //   params.append('tpbh', me.multiJoinData[0].checkAllGroup.toString());
      // }else{
      //   params.append('tpbh', mapNumber);
      // }
      // params.append('token', me.token);
      // params.append('flag', 1);
      me.graph.setHighlightText(me.keyword);
      me.keyword = '';
      // if(!me.tpidJoin && me.multiJoinData[0].radio.length == 0){  //智能搜索页面图谱跳转过来判断（备用）
      //   me.$Message.warning('请选择图谱名称！');
      //   return false;
      // }
      if(flag){
        //sessionStorage.tpid = me.multiJoinData[0].radio;
        sessionStorage.multiJoinFirstTpid = me.multiJoinData[0].checkAllGroup;  //第一次串并保存的图谱id(历史记录返回时，需要用)
        if(!me.statusList.historyModalShow){
          me.historyData = []; //每次串并都会清空 历史记录
        }
        sessionStorage.multiJoinPassiveID = '';
      }else{
        //me.passiveID = sessionStorage.tpid;  //不是首次通过串并的，设置passiveID 为上一次串并得到的me.multiJoinData[0].radio
      }
      // if(me.multiJoinData[0].radio == me.passiveID){
      //   me.passiveID = ''
      // }

      // if(me.multiJoinData[0].radio == sessionStorage.passiveID){  //判断如果是同一个图谱,清空passiveID,(备用-----------------)
      //   sessionStorage.passiveID = '';
      // }

      var params = new URLSearchParams();
      let url = me.joinPath + 'areamapseriesparallelresource/v1/SeriesParallelMaps/tree/mapids';
      params.append('token', me.token);
      // params.append('passiveID', me.passiveID);
      params.append('passiveID', sessionStorage.multiJoinPassiveID);
      params.append('tpids', me.multiJoinData[0].checkAllGroup);
      me.statusList.d3Loading = true;
      this.$axios.post(url, params)
      .then(response => {
        //me.passiveID = me.passiveID || me.multiJoinData[0].radio;  //高亮实体

        //sessionStorage.passiveID = me.passiveID = me.multiJoinData[0].radio;  //不是首次通过串并的，设置passiveID 为上一次图谱的id
        var oid = response.data.tpData.children[0].oid;//增加 根据图谱第一条数据的id, 获取图谱的相关信息
        me.commonIds = response.data.assessData[oid].commonID;
        var data = me.parseData(response.data.tpData);
        me.statusList.MultiModal = false;
        me.statusList.ShowMultiModal = true;
        me.saveName = response.data.tpData.children[0].properties.TPMS;
        me.fetchDetail.entity = response.data.nodeCount;
        me.fetchDetail.executeTime = response.data.executeTime;
        var frequency = response.data.frequency;
        var colorList = ['#b958c1','#85c35e','#cf9e29'];
        frequency.forEach(function(item){
          //item.color = colorList.sort(()=>0.1-Math.random()).slice(0,1);
          item.color = colorList[Math.floor((Math.random()*colorList.length))];
        })
        me.fetchDetail.frequency = frequency;

        me.assessData = response.data.assessData[oid];
        var label = response.data.assessData[oid].personLabelCount;
        if(!label){
          me.assessData.personLabelCount = {}
        }else{
          me.assessData.personLabelCount = JSON.parse(label);  //标签
        }
        me.initialize(data);
        me.statusList.d3Loading = false;
        // me.multiJoinData[0].radio = '';  //清空图谱名称单选选中
        // me.multiJoinData[0].AllGroup = []; //清空图谱名称单选列表
        me.multiJoinData[0].checkAllGroup = [];  //清空图谱名称全选选中
        me.multiJoinData[0].indeterminate = false;
        //me.multiJoinData[0].checkAll = false;
        me.multiJoinData[0].tplxValue = [];   //清空图谱类型
        me.multiJoinData[0].allData.forEach(function(item){  //清空选中的单位节点
          item.checked = false;
        })
        me.$refs.multJoinTree[0].getCheckedAndIndeterminateNodes().forEach(function(item){
          item.indeterminate = false;  //清空半选节点
        })
        me.multiJoinData[0].filterDataLength = 0;  //清空选中的单位
        me.multiJoinData[0].pageTotal = 0;  //清空分页的总条数为0
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 返回到本阶段首次串并的图谱
     * @function returnPrevTp
     * @author erbing
     */
    returnPrevTp () {
      //this.multiJoinData[0].radio = sessionStorage.tpid;
      this.multiJoinData[0].checkAllGroup = sessionStorage.multiJoinFirstTpid;  //返回到首次进入的图谱，设置tid 等于首次保存的图谱id
      sessionStorage.multiJoinPassiveID = '';
      this.getTreeData(true);
    },
    /**
     * 历史记录中跳转到对应的图谱
     * @function againGetTree
     * @author erbing
     */
    againGetTree (id) {
      this.multiJoinData[0].checkAllGroup = id;
      this.getTreeData();
    },
    parseData(data, oid){
      var me = this;
      data = changeImage(data)
      function changeImage(data){
        if (data.nodeType == 'QB_ZP_RY') {
          data.image = me.$config.imgPath + data.properties.SFZHM+me.$config.imgType;
          data.properties.GXMC = data.gxmc || '空';
          data.state = data.properties.STATE;   //D3卡片展示
          if(me.hydraType == 'hydra'){
            data.showProperties = ['XM', 'GXMC', 'SFZHM'];
          }else{
            data.showProperties = ['XM','HJD', 'GXMC', 'SFZHM', 'RYBQ'];  //D3卡片展示
          }
          if (oid && data.oid == oid) {
            //data.color = 'red';
          }
        }else if(data.nodeType == 'QB_ZP_TP'){
          //data.image = me.$config.imgPath + data.properties.SFZHM+me.$config.imgType;
          data.showProperties = ['TPMS'];
          // data.color = 'red';
          // console.log(data,16271627);
          me.multiJoinData[0].tplxList.forEach(function(item){
            if(data.properties.TPLX == item.value){
              data.properties.TPLX = item.name;
            }
          })
          for(var i in me.tplxColorList){
            data.color = me.tplxColorList[data.properties.TPLX]
          }
        }
        if(me.commonIds.length && me.commonIds.indexOf(data.oid) != -1){
          data.color = 'red';
        }
        for (var i = 0; i < data.children.length; i++) {
          changeImage(data.children[i]);
        }
        return data;
      }
      return data;
    },
    /**
     * 获取选中的图谱
     * @function getCheckData
     * @author erbing
     */
    getCheckData(data){
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        if (!data[i].leaves) {
          arr.push(data[i].ids);
        }
      }
      this.checkData = arr.join(',');
    },
    /**
     * 关闭历史记录弹框
     * @function getCheckData
     * @author erbing
     */
    closeHistoryModal () {
      this.statusList.historyModalShow = false;
    },
    /**
     * 关键节点凸显
     * @function showKeyNode
     * @author erbing
     */
    showKeyNode (id,color) {
      //this.graph.showKeyNode(this.nodesStatus,id,color);
      //this.nodesStatus = !this.nodesStatus;
      if(this.prevId == id){
        if(this.nodesStatus){
          this.nodesStatus = false;
          this.graph.showKeyNode(this.nodesStatus,id,color);
        }else{
          this.nodesStatus = true;
          this.graph.showKeyNode(this.nodesStatus,id,color);
        }
      }else{
        this.nodesStatus = true;
        this.graph.showKeyNode(this.nodesStatus,id,color);
      }
      this.prevId = id;
    }
  }
}
</script>

<style lang="less" scoped>
  @widthH:100%;
  @imageUrl:'../../';
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
        background:url('@{imageUrl}static/images/logo-bg.png') 0 0 no-repeat;
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
            // line-height:50px;
            line-height:1;
            outline: none;
            border:none;
            font-size:14px;
            color:#fff;
            background:url('@{imageUrl}static/images/input.png') 0 0 no-repeat;
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
          background:url('@{imageUrl}static/images/search-btn.png') 0 0 no-repeat;
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
          background:url('@{imageUrl}static/images/check.png') 0 0 no-repeat;
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
          background:url('@{imageUrl}static/images/checked.png') 0 0 no-repeat;
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
        background:url('@{imageUrl}static/images/net.png') repeat #ffffff;
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
          //  float:right;
          //  height:44px;
          //  margin:0 14px 0 0;
          //  span{
          //    width:52px;
          //    height:44px;
          //    line-height:44px;
          //    padding-left:24px;
          //    text-align: center;
          //    display:inline-block;
          //    cursor: pointer;
          //    float: left;
          //    i{
          //      color:#8ca1bb;
          //      font-size:30px;
          //    }

          //  }
          //  .viewCur{
          //    i{
          //      color:#009aed;
          //    }
          //  }
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
            background:url('@{imageUrl}static/images/grid.png') 0 0 repeat;
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
                background:url('@{imageUrl}static/images/modal-btn.png') 0 0 no-repeat;
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
          .common-person{
            .post(a);
            top:20px;
            left:160px;
            right:350px;
            height:24px;
            z-index:999;
            ul{
              overflow:hidden;
              li{
                padding:0 15px;
                float:left;
                margin:0 0 5px 25px;
                height:24px;
                line-height:24px;
                border-radius:12px;
                cursor:pointer;
                span{
                  font-size:14px;
                  color:#000;
                  //font-weight: bold;
                }
                span:nth-child(1){
                  margin-right:5px;
                }
                span:nth-child(2){
                  //margin:0 5px;
                }
              }
            }
          }
        }
        // 卡片css
        // .card{
        //  .post(a);
        //  top:44px;
        //  left:0;
        //  bottom:0;
        //  right:0;
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

    .history{
    	transform: translate3d(0, 0, 0);
    }
		.historyModal-enter-active, .historyModal-leave-active {
		  transition: all .5s;
		}
		.historyModal-enter, .historyModal-leave-active {
		  transform: translate3d(400px, 0, 0);
    }

    .history{
      width:400px;
      padding-left: 8px;
      position:absolute;
      right:0;
      top:68px;
      bottom:6px;
      z-index: 9998;
      .inforModal-sidebar{
        width: 17px;
        position:absolute;
        top: 0;
        bottom: 0;
        left: -9px;
        .sidebar-top{
          position: absolute;
          width: 9px;
          height: 20.8%;
          // height: 246px;
          top: 40px;
          right: 0;
          background: url('@{imageUrl}static/images/sidebar-top.png') 0 0 no-repeat;
          background-size: 100% 100%;
        }
        .sidebar-bottom{
          position: absolute;
          width: 9px;
          height: 24.5%;
          // height: 246px;
          bottom: 0;
          right: 0;
          background: url('@{imageUrl}static/images/sidebar-bottom.png') 0 0 no-repeat;
          background-size: 100% 100%;
        }
        .close-btn{
          position:absolute;
          top: 28%;
          width: 17px;
          height: 43.7%;
          z-index: 99;
          cursor: pointer;
          background: url('@{imageUrl}static/images/close-btn.png') 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
      .cont-box{
        width: 100%;
        height: 100%;
        background:-webkit-linear-gradient(left top,#11296d,#0c1837);
        .grid-box{
          width: 100%;
          height: 100%;
          position:absolute;
          background:url('@{imageUrl}static/images/grid.png') repeat repeat;
          .head-left{
            width:9px;
            height:44px;
            position:absolute;
            left:-9px;
            top:0;
            background: url('@{imageUrl}static/images/vertical-line.jpg') repeat-x;
            background-size: 100% 100%;
          }
          .title{
            width: 100%;
            /* height: 47px;
            line-height: 47px; */
            height: 44px;
            line-height: 44px;
            position: relative;
            background: url('@{imageUrl}static/images/vertical-line.jpg') repeat-x;
            background-size: 100% 100%;
            span:nth-child(1){
              font-size: 16px;
              color: #fff;
              margin-left: 6px;
            }
            .iconfont{
              font-size:20px;
              position:absolute;
              top:1px;
              right:20px;
              color:#fff;
              cursor:pointer;
            }
          }
          .infor-details{
            position: absolute;
            right: 10px;
            top: 41px;
            bottom: 0;
            /* left: 8px; */
            left: 0;
            overflow-y: auto;
            .return{
              line-height: 50px;
              margin-bottom:20px;
              padding-left:24px;
              font-size:16px;
              color:#fff;
              overflow:hidden;
              span{
                display:inline-block;
                width: 80px;
                height: 30px;
                margin-top:20px;
                text-indent: 10px;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                color: #fff;
                background: url('@{imageUrl}static/images/return-history.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
              }
            }
            .ivu-timeline{
              .ivu-timeline-item{
                padding: 0 0 40px 0;
                .ivu-timeline-item-tail{
                  left:30%;
                  border-left:1px dashed  #e7e7e7;
                }
                .ivu-timeline-item-head{
                  width:36px;
                  height:36px;
                  background:#a9c500;
                  border-radius:36px;
                  left:30%;
                  border:none;
                  margin-left:-18px;
                }
                .ivu-timeline-item-content{
                  font-size:14px;
                  color: #3a8bbf;
                  position:relative;
                  .content-date{
                    width:28%;
                    float:left;
                    .time{
                      color: #5cb9ff;
                    }
                    .content{
                      font-size:12px;
                      text-align: right;
                      padding-right:24px;
                    }
                  }
                  .content-infor{
                    margin-left:45%;
                    li:first-child{
                      // span:nth-child(1){
                      // 	color:#5cb9ff;
                      // 	margin-right:28px;
                      // }
                      span{
                        color:#fff;
                      }
                      span:nth-child(1){
                        margin-right:28px;
                      }
                    }
                    li:nth-child(2){
                      color: #7e8e9a;
                    }
                    li:last-child{
                      span{
                        color: #7e8e9a;
                      }
                    }
                  }
                  .icon{
                    width:36px;
                    height:36px;
                    line-height:36px;
                    text-align: center;
                    position:absolute;
                    left:38%;
                    top:3px;
                    margin-left:-19px;
                    background:red;
                    border-radius:36px;
                    color:#fff;
                    font-size:16px;
                    cursor:pointer;
                    i{
                      font-size:20px;
                      color:#fff;
                    }
                  }
                  .color0099cc{
                    background:#0099cc;
                  }
                  .colorff3300{
                    background:#ff3300;
                  }
                  .colorcc6600{
                    background:#cc6600;
                  }
                  .colorff9900{
                    background:#ff9900;
                  }
                  .colorCC3366{
                    background:#CC3366;
                  }
                  .color993366{
                    background:#993366;
                  }
                  .color6666cc{
                    background:#6666cc;
                  }
                  .icon.avatar{
                    width:100px;
                    height:100px;
                    position:absolute;
                    left:35%;
                    top:3px;
                    // border-radius: 100px;
                    overflow: hidden;
                    margin-left:-50px;
                    background:#a9c500;
                    img{
                      width:100%;
                      height:100%;
                    }
                  }
                }
              }
            }
          }
        }
      }
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
            top:40px;
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
            //height:400px;
            .wrapper{
              width:372px;
              height:395px;
              margin-left:127px;
              position:relative;
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
          li.page-tpmc{
            ul{
              text-align:center;
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
        background:url('@{imageUrl}static/images/cancel.png') 0 0 no-repeat;
        color:#6e6e6e;
        margin:12px 19px 0 13px;
      }
      .sure{
        background:url('@{imageUrl}static/images/sure.png') 0 0 no-repeat;
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
    background:url('@{imageUrl}static/images/cb.png') 0 0 no-repeat;
    z-index: 999;
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
  @import "../assets/loading.css";
  circle,image,g[type="node"]>text,text.tagnums,g.more,g.more text{cursor:pointer;}
  text{font-family:sans-serif;font-size:10px;fill:#000000;}
  .links line{stroke-opacity:0.6;}
  #rMenu{position:absolute;width:160px;background:#e8eaec;box-shadow:#ccc 0px 0px 8px}
  #rMenu ul{padding:0;margin:0;}
  #rMenu ul li{color:#333;font-size:14px;height:34px;line-height:34px;width:100%;padding-left:5%;list-style-type:none;cursor:pointer;}
  #rMenu ul li:hover{background:#e5e5e5;}
  .svgNT{position:fixed;bottom:30px;left:323px;border:2px solid #ccc;display:none;}
  .arc{cursor:pointer;}



  div .diyFun{cursor: pointer; color: blue; text-decoration: underline; font-size: 12px;}
  g.more{display: block}
  g.nomore{display: none}
  .scrollbar::-webkit-scrollbar{width:6px;height:6px;}
  .scrollbar::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .scrollbar::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .scrollbar::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .scrollbar::-webkit-scrollbar-corner{background-color:#dadada;}

  #hydra {
    position: relative;
    .tlist {
      position: absolute;
      left: 10px;
      top: 88px;
      z-index: 999;
      background: #fff;
      -webkit-box-shadow: #ccc 0px 0px 8px;
      box-shadow: #ccc 0px 0px 8px;
      padding: 0 10px;
      max-height: 350px;
      overflow-y: auto;
      max-width: 520px;
      ul {
        padding: 5px !important;
        li {
          // .text {
          //   padding-left: 60px;
          // }
          color: #333;
          font-size: 14px;
          height: 34px;
          line-height: 34px;
          width: calc(~"100% + 10px");
          padding-left: 5%;
          list-style-type: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          padding: 0 5px;

          span {
            float: left;
            display: block;
            width: 25px;
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            text-align: center;
            border-radius: 3px;
            color: #fff;
            background: #4298c7;
            margin: 5px 5px 0 0;
            &:hover{
              opacity: 0.9;
            }
          }
          span.allStack {
            // float:left;
            // width:60px;
            // position: absolute;
            // left: 20px;
            // top: 3px;
            width: 60px;
            display: block;
            float: right;
          }
          span.filter-condition {
            float:right;
            width:auto;
            padding: 0 5px;
            display: block;
            margin: 5px 0 0 0;
            float: right;
          }
        }
        li:not(.li_allStack):hover {
          background: #e5e5e5;
        }
        // li:nth-child(1){
        //   margin-top:33px;
        // }
        // li.li_allStack{
        //   position: absolute;
        //   left:15px;
        //   top: 3px;
        //   width: calc(~'90% - 10px');
        // }
      }
    }
    .panel {
      position: absolute;
      left: 10px;
      top: 88px;
      z-index: 999;
      font-size: 16px;
      background: #fff;
      -webkit-box-shadow: #ccc 0px 0px 8px;
      box-shadow: #ccc 0px 0px 8px;
      padding: 10px;
      max-width: 600px;
      max-height: 450px;
      overflow-y: auto;
      overflow-x: hidden;
      color: #333;
    }
    .titleBox {
      position: absolute;
      z-index: 999;
      background: #fff;
      box-shadow: #ccc 0px 0px 8px;
      padding: 5px;
      font-size: 16px;
    }
  }
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
                //  margin:13px 0 3px;
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

  .loading-bg{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.5);
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



  //选取单位css
  .multi-join{
    li.tp-unit{
      .ivu-dropdown{
        position:absolute;
        width: 372px;
        background: #fff;
        //padding-left: 10px;
        border-radius: 2px;
        //border:1px solid #eaeaea;
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
      // .ivu-select{

      // }
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
      margin:0 0 10px 10px;
      .ivu-radio-wrapper{
        display:block;
        margin-top: 10px;
        p{
          margin-left:20px;
        }
      }
    }
  }

  .ivu-timeline{
    .ivu-timeline-item{
      padding: 0 0 40px 0;
      .ivu-timeline-item-tail{
        left:37.5%;
        border-left:1px dashed  #e7e7e7;
      }
      .ivu-timeline-item-head{
        width:36px;
        height:36px;
        background:none;
        // border-radius:36px;
        left:38%;
        border:none;
        margin-left:-19px;
      }
      // .ivu-timeline-item-content{
      //   font-size:14px;
      //   color: #3a8bbf;
      //   position:relative;
      //   .content-date{
      //     width:20%;
      //     float:left;
      //     .time{
      //       color: #5cb9ff;
      //     }
      //     .content{
      //       font-size:12px;
      //       text-align: right;
      //       // width: 73%;
      //     }
      //   }
      //   .content-infor{
      //     margin-left:37%;
      //     li:first-child{
      //       // span:nth-child(1){
      //       // 	color:#5cb9ff;
      //       // 	margin-right:28px;
      //       // }
      //       span{
      //         color:#fff;
      //       }
      //       span:nth-child(1){
      //         margin-right:28px;
      //       }
      //     }
      //     li:nth-child(2){
      //       color: #7e8e9a;
      //     }
      //     li:last-child{
      //       span{
      //         color: #7e8e9a;
      //       }
      //     }
      //   }
      //   .icon{
      //     width:36px;
      //     height:36px;
      //     line-height:36px;
      //     text-align: center;
      //     position:absolute;
      //     left:38%;
      //     top:3px;
      //     margin-left:-18px;
      //     i{
      //       font-size:20px;
      //       color:#fff;
      //     }
      //   }
      //   .avatar{
      //     width:100px;
      //     height:100px;
      //     position:absolute;
      //     left:35%;
      //     top:3px;
      //     // border-radius: 100px;
      //     overflow: hidden;
      //     margin-left:-50px;
      //     background:#a9c500;
      //     img{
      //       width:100%;
      //       height:100%;
      //     }
      //   }
      // }
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
