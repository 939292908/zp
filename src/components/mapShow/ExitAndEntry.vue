<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 09:13:45
 * @LastEditTime: 2019-11-19 11:02:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bigMarkerMapArea" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="出入境分布图展示" :showSearch="false"></app-header>
    <div class="header">
      <operationHeader @toFatherFun="getFun" :state="state" :hasSubmit="hasSubmit"></operationHeader>
    </div>
    <div class="markerContent">
      <div class="markerContentLeft">
        <div class="mapContent" id="allMap"></div>
        <div class="mapTitle village">{{villageName}}</div>
        <div class="operation">
          <!-- <Button
            type="primary"
            @click="submission()"
            v-if="hasSubmit && hasFunAuth(constantFunMap.FUN_Online_F_Map_Enter_Submit_ID) && villageInfo.createId == userId"
          >提交</Button>
          <Button
            type="primary"
            v-if="hasAduit && hasFunAuth(constantFunMap.FUN_Online_F_Map_Enter_Resolve_ID)"
            :disabled="resolveLoading"
            @click.native="handleResolveClick"
          >通过</Button> 
          <Button
            type="error"
            v-if="hasAduit && hasFunAuth(constantFunMap.FUN_Online_F_Map_Enter_Reject_ID)"
            @click.native="handleRejectClick"
          >退回</Button>-->
          <Button @click.native="handleCloseEvent">关闭</Button>
        </div>
        <transition name="showMessage">
          <div v-show="flag" class="centerMessageText">
            <i class="ivu-icon ivu-icon-ios-information-circle"></i>
            {{errorMessage}}
          </div>
        </transition>
        <div class="markerRight" v-if="rightContent=='map'||rightContent=='list'">
          <detailsCollect
            :state="state"
            :hasSubmit="hasSubmit"
            :isMap="isMap"
            :villageName="villageName"
            :markerObjDetail="markerObjDetail"
            :villageInfo="villageInfo"
            :mapInfo="mapInfo"
            :collectId="collectId"
            :isProfile="isProfile"
            v-if="rightContent=='map'"
            @personnelInfoEdit="editDetailInfo"
          ></detailsCollect>
          <personnelList
            ref="list"
            :state="state"
            :hasSubmit="hasSubmit"
            :listsDone="listsDone"
            :colorHome="colorHome"
            :listsUnfinished="listsUnfinished"
            @toMapMarker="getmarkerIndex"
            @toGetPersonnelDetail="getPersonnelListDetail"
            v-if="rightContent=='list'"
          ></personnelList>
        </div>
        <mapOverview
          v-if="rightContent=='overview'"
          :assessData="assessData"
          :labelsInfoShow="labelsInfoShow"
          @on-show-detail="handleShowDetail"
          @on-change="handleItem"
          @on-hide="mapOverviewHide"
          :showDetailBtn="true"
        ></mapOverview>
      </div>
    </div>
    <!-- 审核状态 -->
    <!-- <Modal
      v-model="isRefuse"
      title="图谱审核退回理由"
      @on-ok="patRefuse"
      @on-cancel="cancelPatRefuse"
      :loading="refuseLoading"
    >
      <Form class="refuse-modal" :rules="rules" :model="refuse" ref="refuse" :label-width="80">
        <FormItem prop="commentId" label="退回理由">
          <Select v-model="refuse.commentId" style="width:260px">
            <Option
              v-for="item in reasonList"
              :value="item.value"
              :key="item.value"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="refuseMsg" label="具体描述">
          <i-input
            type="textarea"
            v-model="refuse.refuseMsg"
            style="width:260px"
            :rows="4"
            placeholder="请填写退回理由的具体信息"
          ></i-input>
        </FormItem>
      </Form>
    </Modal>-->
    <!-- 人员简述 'left:'+sketchLeft+';top:'+sketchTop  sketchShow=true-->
    <div
      class="sketch"
      v-show="sketchShow"
      :style="sketchStyle"
      @mouseover="sketchOver"
      @mouseout="sketchOut"
    >
      <span class="img">
        <img :src="imgPath" width="100%" height="100%" alt />
        <i
          class="state"
          :style="'background:'+$config.personLabel[donePersonnelInfo.personInfo.state]"
        >{{donePersonnelInfo.personInfo.state}}</i>
      </span>
      <span class="name">{{donePersonnelInfo.personInfo.name}}</span>
      <span class="idNumber">{{donePersonnelInfo.personInfo.idNumber}}</span>
      <div class="color">
        <div class="left">
          <span>危害等级</span>
          <i
            :style="'background:#'+(donePersonnelInfo.personOutboundRecordInfo.harmColor?donePersonnelInfo.personOutboundRecordInfo.harmColor:'ccc')"
          ></i>
        </div>
        <div class="right">
          <span>风险等级</span>
          <i
            :style="'background:#'+(donePersonnelInfo.personOutboundRecordInfo.riskColor?donePersonnelInfo.personOutboundRecordInfo.riskColor:'ccc')"
          ></i>
        </div>
      </div>
      <div class="mapType" @mouseout="mapForOut()">
        <div
          class="mapFor"
          v-for="(link, key, index) in donePersonnelInfo.personLinkMap"
          :key="index"
          :style="'background:'+$config.topTagColors[key]"
          :class="(index+1)%4==0?'lastMapFor':''"
          @mouseover="mapForOver($event,link,key)"
        >
          {{key}}
          <i :style="'background:'+$config.topTagColors[key]">{{link | itemLength}}</i>
        </div>
        <div
          class="tlist"
          :style="fixedStyle"
          v-show="showList"
          @mouseover="tlistOver()"
          @mouseout="tlistOut()"
        >
          <div class="senior">
            <span>相关图谱：</span>
            <span class="more" v-show="!(toListKey=='境'||toListKey=='打')" @click="senior">更多信息</span>
          </div>
          <div class="t" v-for="(li,i) in toList" :key="i" @click="toarchivesjoin(li)">
            <i v-if="!li.dataRight" class="iconfont icon-suoding"></i>
            <span :class="li.dataRight&&li.typeId != '8' ? '':'ccc'" :title="li.tpms">{{li.tpms}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 人员信息 -->
    <ArchivalInfor
      v-show="statusList.PersonInforShow"
      @listenToChild="hidePersonInfor"
      :markerObjDetail="markerObjDetail"
      :idNumber="idNumber"
      :detailType="detailType"
      :mapInfo="mapInfo"
      ref="archivalInfor"
    ></ArchivalInfor>
    <!-- 出入境记录 -->
    <personnelEntryExitInfo ref="entryExitInfo" :idNumber="idNumber"></personnelEntryExitInfo>
    <!-- loading -->
    <loading color="white" v-model="archivesLoadingShow"></loading>
    <!-- 高级查询模态窗 -->
    <D3FilterCondition v-model="filterConditionVisible" :params="filterConditionParams"></D3FilterCondition>
    <!-- consideration 村党委 mosque 清真寺-->
    <considerationAndMosque
      ref="considerationAndMosque"
      v-model="considerationAndMosqueShow"
      :isAddcm="isAddcm"
      :villageAllInfo="villageInfo"
    ></considerationAndMosque>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import appHeader from "@/components/assembly/AppHeader";
import operationHeader from "@/components/mapCollectionNext/components/profile/operationCollect";
import detailsCollect from "@/components/mapCollectionNext/components/profile/personnelDetailsCollect"; //right
import personnelList from "@/components/mapCollectionNext/components/profile/personnelList"; //right
import enterRecord from "@/components/mapCollectionNext/components/profile/enterRecord"; //出入境记录
import mapLists from "../../../static/vendors/baiduMap/mapInit"; //公共方法
import mapOverview from "@/components/assembly/MapOverview";
import * as apis from "@/api/collection/index.js";
import * as common from "@/api/common.js";
import Loading from "@/components/assembly/Loading";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
import personnelEntryExitInfo from "@/components/mapCollectionNext/components/assembly/entryExitInfo/personnelEntryExitInfo";
import ArchivalInfor from "@/components/mapShow/components/archivalInfor"; //展示页人员详情
import considerationAndMosque from "@/components/mapCollectionNext/components/considerationAndMosque/considerationAndMosque";
export default {
  name: "CollectMarkerExitEnter",
  components: {
    appHeader,
    operationHeader,
    detailsCollect,
    personnelList,
    enterRecord,
    mapOverview,
    Loading,
    D3FilterCondition,
    personnelEntryExitInfo,
    ArchivalInfor,
    considerationAndMosque
  },
  data() {
    //这里存放数据
    return {
      isAddcm: false, //是否允许添加
      detailType: "", //展示内容 person / map
      mapType: "8", //展示内容 person / map
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
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      },
      changeHomeColor: false, //房屋颜色是否发生改变
      considerationAndMosqueShow: true,
      name: "",
      // resolveLoading: false,
      filterConditionVisible: false,
      filterConditionParams: null,
      recordLists: [], //添加为空，编辑为该条信息
      stepIndex: 1, //1基本信息，2出入境记录
      saveText: "保存", //saveText保存 或保存并下一步
      havaStepTwo: true, //添加人员保存并填写下一项
      dragOver: false,
      isProfile: false, //非被打击
      title: "出入境人员信息", //非被打击
      // isRefuse: false,
      state: 1, //审核状态
      // refuseLoading: false,
      /* refuse: {
        refuseMsg: "", // 驳回理由
        commentId: "" //退回理由选中id
      },
      rules: {
        commentId: [
          { required: true, message: "退回理由不能为空", trigger: "change" }
        ],
        refuseMsg: [
          {
            required: true,
            message: "退回理由具体描述不能为空",
            trigger: "blur"
          }
        ]
      }, */
      reasonList: [], //退回理由下拉列表
      saveLoading: false,
      collectId: "",
      flag: false, //提示信息隐藏
      errorMessage: "", //提示信息
      map: null, //初始化地图map数据
      center: { lng: 80.162348, lat: 41.00913 }, //地图的中心点80.162348,41.00913
      zoom: 17, //地图缩放等级最小为9只能看到aks地区
      villageMapID: "", //村ID
      mapInfo: {}, //图谱信息
      villageInfo: {}, //村信息
      villageDrawStyle: mapLists.style(
        "red",
        "#ffffff",
        "1",
        ".8",
        ".2",
        "solid"
      ), //村边界样式
      teamDrawStyle: mapLists.style(
        "#6f7174",
        "#a3a7ad",
        "1",
        ".8",
        ".2",
        "dashed"
      ), //小队绘制样式
      hamletBorder: [], //村边界
      teamArr: [], //组队信息详细列表
      teamPolygonArr: [], //组,用来判断是否在边界内
      teamAllInfo: [], //组队信息
      eventObj: {}, //当前拖拽对象
      polygon: {},
      villageName: "",
      rightContent: "overview", //地图和人员详情
      isMap: "map", //右边默认显示map详情还是人员列表
      sketchLeft: 0,
      sketchTop: 0,
      sketchShow: false, //人员简述隐藏
      donePersonnelInfo: {
        personInfo: {
          name: "",
          idNumber: "",
          state: "",
          picUrl: ""
        }, //人员信息
        personOutboundRecordInfo: {
          harmColor: "",
          riskColor: ""
        }, //出入境信息
        personLinkMap: {} //关系图谱
      }, //over显示的人员
      personList: [], //所有人员
      listsDone: [], //完成打点人员
      listsUnfinished: [], //未完成打点人员
      markerIndex: undefined,
      markerListArr: [],
      labelListArr: [],
      colorHome: {
        src: require("../../../static/vendors/baiduMap/images/home.png"),
        red: require("../../../static/vendors/baiduMap/images/r.png"),
        orange: require("../../../static/vendors/baiduMap/images/o.png"),
        yellow: require("../../../static/vendors/baiduMap/images/y.png"),
        blue: require("../../../static/vendors/baiduMap/images/b.png"),
        ccc: require("../../../static/vendors/baiduMap/images/ccc.png"),
        qzs: require("../../../static/vendors/baiduMap/images/qzs.png"),
        dw: require("../../../static/vendors/baiduMap/images/dw.png")
      },
      columns1: [
        { type: "index", width: 40, align: "center" },
        { title: "出境时间", key: "outBoundTime", align: "center" },
        { title: "出境方式", key: "outBoundWay", align: "center" },
        { title: "出境理由", key: "outBoundReason", align: "center" },
        { title: "出境前往国家", key: "outBoundToCountry", align: "center" },
        { title: "出境口岸（通道）", key: "outBoundChannel", align: "center" },
        { title: "入境时间", key: "entryTime", align: "center" },
        { title: "入境口岸（通道）", key: "entryChannel", align: "center" },
        { title: "危害等级", key: "harmLevel", width: 90, align: "center" },
        { title: "风险等级", key: "riskLevel", width: 90, align: "center" }
      ],
      modalShow: false,
      markerObjDetail: {}, //marker详情//当前编辑人员信息
      editInfoState: false, //编辑状态
      idNumber: "", //身份证编号
      isAdd: true, //添加人员/编辑人员 true/false
      labelsInfoShow: false, //隐藏属性
      assessData: {
        archiveName: "",
        personCount: 0,
        riskLevel: "无",
        labelCount: [],
        personTypeCounts: [],
        mapTypeCounts: [],
        sexTypeCount: [],
        fiveOnePropertyCounts: null
      }, //概述
      coordinate: {}, //右键获取坐标
      enterRecordShow: false, //出入境记录是否显示
      pageIndex: 1, //当前页数
      pageSize: 5, //一页条数
      total: 0, //总条数
      screenString: "", //判断
      screenIndex: null, //判断
      typeName: {
        genderId: "genderValue",
        stateId: "stateValue",
        fiveOnePropertyId: "fiveOnePropertyValue"
      },
      nextOne: true,
      archivesLoadingShow: false, //loading
      showList: false, //showList
      sketchStyle: "",
      toList: [],
      toListKey: "",
      fixedStyle: "", //固定样式
      imgPath: "", //图片
      userId: "", //当前用户Id
      seeEnterInfo: false, //出入境记录查看
      hasSubmit: false, //不存在提交按钮
      mosqueList: null,
      partyList: null
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "CollectHardAddMap") {
      window.location.reload();
    }
    next();
  },
  created() {
    this.archivesLoadingShow = true;
    this.initLoad();
  },
  watch: {
    watchInfo: {
      handler(val) {
        this.imgPath = this.getImagePath(val);
      },
      immediate: true
    }
  },
  computed: {
    /* sketchStyle() {
      return "left:" + this.sketchLeft + "px;top:" + this.sketchTop + "px;";
    }, */
    watchInfo() {
      return this.donePersonnelInfo.personInfo.picUrl;
    }
    /* hasAduit() {
      let isAduit = this.$route.query.isAduit;
      if (isAduit == undefined) return false;
      return isAduit && (isAduit == "true" || isAduit == true) ? true : false;
    }, */
    // 是否有提交按钮
    /*hasSubmit() {
      // 如果是审核页面过来,不可以进行提交和编辑
      let isAduit = this.$route.query.isAduit;
      if (isAduit != undefined) return false;
      let state = this.$route.query.state;
      if (state == undefined) return true;
      return state == 0 || state == 3 ? true : false; 
      return false;
    }*/
  },
  mounted() {
    // console.log(getUserInfo());
    const that = this;
    that.$refs["archivalInfor"].mapType = "8";
    common.getPersonalCenter().then(res => {
      if (res.code == 200) {
        that.userId = res.data.userId;
      }
    });
  },
  //方法集合
  methods: {
    senior() {
      const me = this;
      var data = {};
      data.color = me.donePersonnelInfo.personInfo.harmColor;
      data.mapId = me.donePersonnelInfo.personInfo.mapId;
      data.name = me.donePersonnelInfo.personInfo.name;
      data.sfzhm = me.donePersonnelInfo.personInfo.idNumber;
      data.type = me.toListKey;
      data.tpid = me.toList[me.toList.length - 1].tpid;
      data.tpms = me.toList[me.toList.length - 1].tpms;
      data.tps = me.toList;
      data.parentTpid = "";
      data.relationName = "";
      me.filterConditionVisible = true;
      me.filterConditionParams = data;
    },
    // 移入图谱名称
    tlistOver() {
      this.showList = true;
    },
    tlistOut() {
      this.showList = false;
    },
    // 移入
    sketchOver() {
      this.sketchShow = true;
    },
    sketchOut() {
      /* if (this.showList) {
        this.sketchShow = true;
      } else {

      } */
      this.sketchShow = false;
    },
    // 跳转图谱
    toarchivesjoin(data) {
      const me = this;
      if (data.typeId == "8" && data.dataRight) {
        return;
      } else if (data.typeId == "9" && data.dataRight) {
        const { href } = me.$router.resolve({
          name: "CollectMarkerProfile",
          query: {
            state: "1",
            collectId: data.collectId,
            areaCode: data.villageCode
          }
        });
        window.open(href, "_blank");
      } else if (data.dataRight) {
        const { href } = me.$router.resolve({
          name: "ArchivesJoin",
          query: {
            tpids: data.mapId,
            mc: "出入境人员分布图",
            collectId: me.$route.query.collectId,
            areaCode: me.$route.query.areaCode
          }
        });
        window.open(href, "_blank");
      }
    },
    mapForOver(e, data, key) {
      this.fixedStyle = "left:" + e.x + "px;top:" + e.y + "px;";

      this.toList = data;
      this.toListKey = key;
      this.showList = true;
    },
    mapForOut(data) {
      this.showList = false;
    },
    // 初始化地图
    init() {
      const me = this;
      me.map = mapLists.initialize(
        "allMap",
        me.center.lng,
        me.center.lat,
        me.zoom
      ); //初始化地图
      me.map.addOverlay(
        new BMap.Marker({ lng: me.center.lng, lat: me.center.lat })
      );
      me.map.disableDoubleClickZoom(); //禁止双击map
      me.map.addEventListener("mouseup", me.isvillageArea);
      me.map.addEventListener("click", me.initColor);
      me.drawVillageBorder(); // 添加虚假多边形---村
      me.drawTeamBorder(); // 添加虚假多边形---组
      me.addPersonnelMarker(); // 向村内添加人员
      me.considerationAndMosqueMarker();
      me.searchContent(me.$route.query.sfzhm);
      me.screenString = "";
      me.screenIndex = null;
    },
    considerationAndMosqueMarker() {
      const that = this;
      var mosqueList = that.mosqueList;
      var partyList = that.partyList;
      for (let i = 0; i < mosqueList.length; i++) {
        var point = new BMap.Point(
          mosqueList[i].longitude,
          mosqueList[i].latitude
        );
        var marker = new BMap.Marker(point, {
          icon: that.myIcon(that.colorHome["qzs"])
        });
        marker.markerObj = mosqueList[i];
        marker.name = "mosque";
        var label = new BMap.Label(
          mosqueList[i].name,
          mapLists.opts(point, -90, 12)
        );
        label.setStyle({
          display: "inline",
          fontSize: "12px",
          background: "none",
          border: "none",
          width: "180px",
          textAlign: "center"
        });
        marker.addEventListener("click", that.showconsiderationAndMosqueInfo); //绑定事件单击显示个人信息
        that.map.addOverlay(marker);
        that.map.addOverlay(label);
      }
      for (let i = 0; i < partyList.length; i++) {
        var point = new BMap.Point(
          partyList[i].longitude,
          partyList[i].latitude
        );
        var marker = new BMap.Marker(point, {
          icon: that.myIcon(that.colorHome["dw"])
        });
        marker.markerObj = partyList[i];
        marker.name = "consideration";
        var label = new BMap.Label(
          partyList[i].name,
          mapLists.opts(point, -90, 12)
        );
        label.setStyle({
          display: "inline",
          fontSize: "12px",
          background: "none",
          border: "none",
          width: "180px",
          textAlign: "center"
        });
        marker.addEventListener("click", that.showconsiderationAndMosqueInfo); //绑定事件单击显示个人信息
        that.map.addOverlay(marker);
        that.map.addOverlay(label);
      }
    },
    showconsiderationAndMosqueInfo(e) {
      // considerationAndMosque
      let id = e.target.markerObj.id;
      if (e.target.name == "consideration") {
        this.$refs["considerationAndMosque"].showConsideration(id);
      } else {
        this.$refs["considerationAndMosque"].showMosque(id);
      }
    },
    // 村边界绘制
    drawVillageBorder() {
      const that = this;
      var hamletBorderPoint = [];
      var allOverlay = that.map.getOverlays();
      for (var i = 0; i < allOverlay.length; i++) {
        that.map.removeOverlay(allOverlay[i]);
      }
      for (var i in that.hamletBorder) {
        hamletBorderPoint.push(
          new BMap.Point(that.hamletBorder[i].lng, that.hamletBorder[i].lat)
        );
      }
      that.polygon = new BMap.Polygon(hamletBorderPoint, that.villageDrawStyle);
      that.map.addOverlay(that.polygon);
      that.map.setViewport(hamletBorderPoint);
    },
    // 组、队绘制
    drawTeamBorder() {
      const that = this;
      for (let i = 0; i < that.teamAllInfo.length; i++) {
        var info = that.teamAllInfo[i];
        var border = JSON.parse(info.border);
        var teamBorderPoint = [];
        var markerMenu = new BMap.ContextMenu();
        for (let x in border) {
          teamBorderPoint.push(new BMap.Point(border[x].lng, border[x].lat));
        }
        var polygon = new BMap.Polygon(teamBorderPoint, that.teamDrawStyle);
        polygon.name = "dui";
        if (that.hasSubmit) {
          markerMenu.addItem(
            new BMap.MenuItem("添加人员", that.rightAddPersonnel.bind(polygon))
          );
        }
        polygon.index = that.teamArr.length;
        that.teamArr.push(border);
        that.teamPolygonArr.push(polygon);
        polygon.addContextMenu(markerMenu);
        that.map.addOverlay(polygon);
        that.keyPoint(polygon);
      }
    },
    // 右键直接添加人员
    rightAddPersonnel(e, ee, polygon) {
      this.coordinate = e;
      /* this.modalShow = true;
      this.$refs.addmodal.init(); */
      this.getFun("add");
      this.$refs.addmodal.longitude = e.lng;
      this.$refs.addmodal.latitude = e.lat;
    },
    // 判断是否在存范围之内
    isvillageArea(e) {
      this.map.setDefaultCursor("pointer");
      var allMap = document.getElementById("allMap");
      allMap.classList.remove("dragging");
      if (this.$refs.list != undefined) {
        this.$refs.list.indexStyle = null;
      }
      var result = this.teamPolygonArr.some(function(team) {
        return BMapLib.GeoUtils.isPointInPolygon(e.point, team);
      });
      var markerIndex = this.markerIndex;
      if (result && markerIndex != null) {
        if (e.target.markerObj != null) {
          this.moveMarker(e, 2);
          this.changePoint(e.target.markerObj, e.point);
        } else {
          var obj = this.listsUnfinished[markerIndex];
          console.log(obj);
          this.changePoint(obj, e.point);
          this.moveMarker(e, 1);
        }
      }
      this.markerIndex = undefined;
    },
    // 多边形重心
    keyPoint(polygon) {
      var vo = polygon.vo;
      var point = this.borderCenter(vo);
      var marker = new BMap.Marker(point);
      var labelString = this.teamAllInfo[polygon.index].name;
      var label = new BMap.Label(labelString, mapLists.opts(point, 0, 0)); // 创建文本标注对象
      label.setStyle({
        color: "#333",
        fontSize: "12px",
        border: "none",
        background: "none"
      });
      this.map.addOverlay(label);
    },
    // 添加已打点人员
    addPersonnelMarker() {
      const that = this;
      for (let x = 0; x < that.listsDone.length; x++) {
        that.moveMarker(that.listsDone[x], 3, x);
      }
    },
    // 提示警告
    instance(c) {
      // this.$Message.warning(content);
      const that = this;
      that.flag = true;
      setTimeout(function() {
        that.flag = false;
      }, 2000);
    },
    // 人员列表
    getmarkerIndex(data) {
      this.markerIndex = data;
    },
    // 点击获取人员信息
    getPersonnelListDetail(key, i) {
      const that = this;
      if (key == 1) {
        that.markerObjDetail = that.listsDone[i];
      } else {
        that.markerObjDetail = that.listsUnfinished[i];
      }
      /* that.rightContent = "map";
      that.isMap = "personnel"; */
      that.detailType = "person";
      that.statusList.PersonInforShow = true;
      that.idNumber = that.markerObjDetail.personInfo.idNumber;
    },
    // 添加人员/人员列表
    getFun(data) {
      if (data == "add") {
        this.modalShow = true;
        this.enterRecordShow = false;
        this.$refs.addmodal.init();
        this.havaStepTwo = true;
        this.$refs.addmodal.newDisabledInput = false;
        this.$refs.addmodal.disabledInput = false;
        this.isAdd = true;
      } else if (data == "list") {
        this.modalShow = false; //添加人员隐藏
        this.rightContent = data; //人员列表隐藏
      } else {
        this.rightContent = data; //概述
      }
    },
    // 拖拽结束之后的事件
    markerDraagend(e) {
      var result = this.teamPolygonArr.some(function(team) {
        return BMapLib.GeoUtils.isPointInPolygon(e.point, team);
      });
      console.log(result);

      this.map.removeOverlay(this.labelListArr[e.target.index]);
      this.map.removeOverlay(this.markerListArr[e.target.index]);

      if (result) {
        this.moveMarker(e, 2, e.target.index);
        this.changePoint(e.target.markerObj, e.point);
      } else {
        e.point = this.eventObj.point;
        this.moveMarker(e, 2, e.target.index);
        this.changePoint(e.target.markerObj, this.eventObj.point);
      }
    },
    changePoint(obj, point) {
      const that = this;
      var params = {
        collectId: that.collectId,
        idNumber: obj.personInfo.idNumber,
        latitude: point.lat,
        longitude: point.lng,
        mapId: that.villageMapID
      };
      apis
        .changePoint(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            that.overviewOfAtlas();
          } else {
            that.errorMessage = res.msg;
            that.instance();
          }
        })
        .catch(response => {
          that.errorMessage = "数据加载失败！";
          that.instance();
        });
    },
    // 移动marker，或者从marker拖拽过来时that.changePoint(e.target.markerObj,e.point)
    moveMarker(e, i = 1, index) {
      //i代表是从未打点人员拖拽还是（1），地图拖拽（2，已打点人员）
      const that = this;
      that.sketchShow = false;
      var changeIndex, list, point;
      if (i == 1) {
        point = e.point;
        that.listsDone.push(that.listsUnfinished[that.markerIndex]); //向已完成打点中添加打点已完成的marker
        that.listsUnfinished.splice(that.markerIndex, 1, null); //删除原来未打点的marker
        list = that.listsDone; //未打点
        changeIndex = that.listsDone.length - 1; //新的序号是移动之后的已打点的长度
      } else if (i == 2) {
        list = that.listsDone; //已打点
        changeIndex = index;
        point = new BMap.Point(e.point.lng, e.point.lat);
      } else {
        list = that.listsDone; //已打点
        changeIndex = index;
        point = new BMap.Point(
          e.personOutboundRecordInfo.longitude,
          e.personOutboundRecordInfo.latitude
        );
      }
      var color = mapLists.color(
        list[changeIndex].personOutboundRecordInfo.harmLevel
      );

      /* if (
        that.$route.query.state == 1 &&
        that.$route.query.sfzhm != undefined
      ) {
        var sfzhmList = that.$route.query.sfzhm;
        if (sfzhmList.indexOf(list[changeIndex].personInfo.idNumber) != "-1") {
          color = mapLists.color(
            list[changeIndex].personOutboundRecordInfo.harmLevel
          );
        } else {
          color = "ccc";
        }
      } */

      var markerMenu = new BMap.ContextMenu(); //创建右键菜单
      if (color == undefined) {
        color = "red";
      }
      var myIcon = that.myIcon(that.colorHome[color]); //icon
      var marker = new BMap.Marker(point, { icon: myIcon }); // 创建点
      marker.oldIndex = index; //赋值，旧的序号，如果是原来的点拖动，值不变
      marker.index = changeIndex; //赋值，新的序号，如果是原来的点拖动，值不变
      marker.idNumber = list[changeIndex].personInfo.idNumber; //赋值，如果是原来的点拖动，值不变
      marker.colorName =
        list[changeIndex].personOutboundRecordInfo.harmLevel || "红"; //赋值，如果是原来的点拖动，值不变
      marker.markerObj = list[changeIndex]; //添加信息
      that.map.addOverlay(marker); //添加点到地图
      marker.addEventListener("click", that.getpersonnelDetail); //绑定事件单击显示个人信息
      marker.addContextMenu(markerMenu); //添加右键‘删除’
      // 创建label
      var labelString = "<p>" + list[changeIndex].personInfo.name + "</p>";
      var label = new BMap.Label(labelString, mapLists.opts(point, -90, 12)); // 创建文本标注对象
      label.setStyle({
        display: "inline",
        fontSize: "12px",
        background: "none",
        border: "none",
        width: "180px",
        textAlign: "center"
      });
      that.map.addOverlay(label);
      // label.hide()
      that.markerListArr[changeIndex] = marker;
      that.labelListArr[changeIndex] = label;
      // if(that.hasSubmit && that.hasFunAuth(that.constantFunMap.FUN_Online_F_Map_Enter_Delete_ID)){
      /* if (that.hasSubmit) {
        markerMenu.addItem(
          new BMap.MenuItem("删除", that.removeMarker.bind(marker))
        ); //添加右键removeMarker
      } */
      markerMenu.addItem(
        new BMap.MenuItem("查看详细信息", that.viewPersonDetails.bind(marker))
      ); //添加右键查看详细信息
      // label创建完成
      marker.addEventListener("mouseover", that.personnelSketch); //mouseover
      marker.addEventListener("mousedown", function(e) {
        that.sketchShow = false;
        that.eventObj = e;
      });
      // this.nextOne = true;
      if (
        that.hasSubmit &&
        that.hasFunAuth(that.constantFunMap.FUN_Online_F_Map_Enter_Add_ID)
      ) {
        // if(that.hasSubmit){

        marker.enableDragging(); //开启marker拖拽

        marker.addEventListener("dragstart", function(e) {
          // that.nextOne = true;
          that.map.removeOverlay(that.labelListArr[e.target.index]);
        });

        if (that.nextOne) {
          marker.addEventListener("dragend", that.markerDraagend); //绑定移动marker之后事件
        }
      }
      that.markerIndex = undefined;
    },
    // 移入显示人员简述
    personnelSketch(e) {
      // console.log(e);
      this.donePersonnelInfo = this.listsDone[e.target.index];
      this.sketchLeft = e.pixel.x + 15;
      this.sketchTop = e.pixel.y - 100;
      this.sketchShow = true;
      this.showList = false;
      this.sketchStyle =
        "left:" + this.sketchLeft + "px;top:" + this.sketchTop + "px;";
    },
    // 人员详情personnelDetail
    getpersonnelDetail(e) {
      /* this.rightContent = "map";
      // 点击事件 获取markerIndex 右边显示人员信息
      this.markerObjDetail = e.target.markerObj;
      this.isMap = "personnel"; */
      this.getPersonnelListDetail(1, e.target.index);
    },
    // 查看人员详细信息
    viewPersonDetails(e, ee, marker) {
      const that = this;
      that.getPersonnelListDetail(1, marker.index);
    },
    removeMarker(e, ee, marker) {
      const that = this;
      var params = {
        collectId: that.collectId,
        mapId: that.villageMapID
      };
      apis
        .deleteMapInfo(marker.markerObj.personInfo.idNumber, params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            that.listsUnfinished.push(that.listsDone[marker.index]);
            that.listsDone.splice(marker.index, 1, null);
            that.map.removeOverlay(that.labelListArr[marker.index]);
            that.map.removeOverlay(marker);
            that.overviewOfAtlas();
          } else {
            that.errorMessage = res.msg;
            that.instance();
          }
        })
        .catch(response => {
          that.errorMessage = "数据加载失败！";
          that.instance();
        });
    },
    // get组队中心点
    borderCenter(list) {
      var lngAdd = 0,
        latAdd = 0;
      for (let i = 0; i < list.length; i++) {
        lngAdd += list[i].lng;
        latAdd += list[i].lat;
      }
      return { lng: lngAdd / list.length, lat: latAdd / list.length };
    },
    // marker点的图片
    myIcon(src) {
      return new BMap.Icon(
        src, // 图片
        new BMap.Size(28, 24), // 视窗大小
        {
          imageSize: new BMap.Size(28, 24), // 引用图片实际大小
          imageOffset: new BMap.Size(0, 0) // 图片相对视窗的偏移
        }
      );
    },
    // 鼠标按下清除未打点人员markerIndex
    mousedownClear() {
      this.markerIndex = undefined;
    },
    // 编辑人员详细信息
    editDetailInfo(data) {
      this.modalShow = true;
      this.enterRecordShow = true;
      this.idNumber = data.personInfo.idNumber;
      this.getOutboundinfoList();
      this.markerObjDetail = data;
      console.log(this.markerObjDetail);
      this.isAdd = false;
      this.havaStepTwo = false;
      this.$refs.addmodal.disabledInput = true;
      this.$refs.addmodal.newDisabledInput = true;
      /* this.$refs.enterRecord.latitude = data.latitude;
      this.$refs.enterRecord.longitude = data.longitude; */
    },
    // 显示详情
    handleShowDetail() {
      /* this.rightContent = "map";
      this.isMap = "map"; */
      this.detailType = "map";
      this.statusList.PersonInforShow = true;
    },
    // 取消
    cancel() {
      this.$refs.modal.scrollTop = 0;
      this.$refs.addmodal.handleReset();
      this.coordinate = {};
      this.idNumber = "";
      this.modalShow = false;
      this.saveLoading = false;
      this.rightContent = "list";
      this.initLoad(2);
    },
    // 关闭添加页
    cancelAdd() {
      if (this.recordLists.length == 0 && this.enterRecordShow) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "该人员的出入境记录为空，是否需要继续添加出入境记录？",
          onOk: () => {},
          onCancel: () => {
            this.cancel();
          }
        });
      } else {
        this.cancel();
      }
    },
    // 编辑人员信息
    editPersonnelInfo() {
      this.havaStepTwo = true;
      this.$refs.addmodal.disabledInput = false;
      this.$refs.addmodal.newDisabledInput = false;
      this.saveLoading = false;
    },
    // 编辑或添加出入境信息
    editAddRecord(add = true) {
      this.$refs.enterRecord.editList(false);
      this.$refs.enterRecord.editAddTitle = "添加出入境记录";
      this.$refs.enterRecord.$refs["enterRecord"].resetFields();
    },
    // 保存并关闭数据
    handleModalSaveClose() {
      const me = this;
      me.saveLoading = true;
      this.$refs.addmodal
        .handleSubmit()
        .then(res => {
          me.$refs.addmodal.disabledInput = true;
          me.$refs.addmodal.newDisabledInput = true;
          me.enterRecordShow = true;
          me.havaStepTwo = false;
          me.$Message.success("保存成功");
          // me.name = me.$refs.addmodal.form.name;
          me.idNumber = me.$refs.addmodal.form.idNumber;
          me.stepIndex = 2;
        })
        .then(res => {
          var right = document.getElementById("right");
          right.scrollTop = right.scrollHeight;
        })
        .catch(error => {
          let errorMsg =
            error != false ? error.msg || "保存失败" : "请完善表单信息";
          me.saveLoading = false;
          if (errorMsg != null || errorMsg != undefined)
            me.$Message.error(errorMsg);
        });
    },
    handleModalDeleteClose() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定删除当前人员吗？",
        onOk: () => {
          this.ishandleModalDeleteClose();
        },
        onCancel: () => {}
      });
    },
    // 删除人员信息，彻底删除
    ishandleModalDeleteClose() {
      this.$refs.modal.scrollTop = 0;
      const me = this;
      me.$refs.addmodal.handleSubmitDelete().then(res => {
        if (res.code == 200) {
          me.$refs.addmodal.handleReset();
          me.$Message.success("删除成功");
          me.initLoad(2);
          me.rightContent = "overview";
          me.modalShow = false;
        } else {
          me.$Message.error("删除失败");
        }
      });
    },
    initLoad(i = 1) {
      const that = this;
      that
        .initLoading(i)
        .then(res => {
          if (res == 1) {
            that.archivesLoadingShow = false;
            that.$Notice.config({
              top: 260,
              duration: 3
            });
            that.$Notice.info({
              title: "打点人员结果",
              render: h => {
                return h(
                  "span",
                  {
                    style: {
                      fontSize: "14px",
                      color: "#000000"
                    }
                  },
                  [
                    "已打点人员",
                    h(
                      "a",
                      {
                        style: {
                          color: "#0068b7",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }
                      },
                      that.listsDone.length
                    ),
                    ",未打点人员",
                    h(
                      "a",
                      {
                        style: {
                          color: "#0068b7",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }
                      },
                      that.listsUnfinished.length
                    )
                  ]
                );
              }
            });
            that.init();
          } else {
            that.drawVillageBorder(); // 添加虚假多边形---村
            that.drawTeamBorder(); // 添加虚假多边形---组
            that.addPersonnelMarker(); // 向村内添加人员
          }
        })
        .catch(res => {
          console.log(res);
          that.archivesLoadingShow = false;
        });
    },
    // 状态操作
    stateFun() {
      if (this.$route.query.isAudit != null) {
        this.hasSubmit = false;
      } else {
        if (this.state == 0 || this.state == 3) {
          this.hasSubmit = true;
        }
      }
    },
    initLoading(i) {
      // 发送请求，获取是否已经绘制过地图
      const that = this;
      // console.log(this.$config.personLabel);//人员状态
      var params = { collectId: that.$route.query.collectId };
      var promise = new Promise(async (resolve, reject) => {
        apis
          .newGetCollectMapInfoEnter(that.$route.query.areaCode, params)
          .then(res => {
            if (res.code == 200) {
              console.log(res);
              that.hamletBorder = JSON.parse(res.data.villageInfo.border);
              that.teamAllInfo = res.data.groupInfoList;
              that.mosqueList = res.data.mosqueList;
              that.partyList = res.data.partyList;
              that.listsUnfinished = res.data.personList;
              that.listsDone = res.data.coordinatedPersonList;
              that.villageInfo = res.data.villageInfo;
              that.mapInfo = res.data.mapInfo;
              that.villageName = res.data.villageInfo.name;
              that.villageMapID = res.data.villageInfo.id;
              that.center.lng = res.data.villageInfo.longitude;
              that.center.lat = res.data.villageInfo.latitude;
              that.collectId = that.$route.query.collectId;
              that.state = res.data.mapInfo.state;
              that.teamArr = [];
              that.teamPolygonArr = [];
              that.idNumber = "";
              that.overviewOfAtlas();
              resolve(i);
            } else {
              reject(res);
            }
          });
      });
      return promise;
    },
    // 被打击人员图谱概述
    overviewOfAtlas() {
      const that = this;
      var params = {
        // mapId: that.villageMapID,
        collectId: that.$route.query.collectId
      };
      apis.newMapOverview(that.$route.query.areaCode, params).then(res => {
        if (res.code == 200) {
          that.screenString = "";
          that.screenIndex = null;
          that.assessData = res.data;
        }
      });
    },
    // 提交后返回看板页面
    /* submission() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "是否确定提交该图谱？",
        onOk: () => {
          this.isSubmission();
        },
        onCancel: () => {}
      });
    },
    isSubmission() {
      const that = this;
      var params = {
        auditState: 2,
        billId: that.$route.query.collectId
      };
      apis.POST_CHANGE_MAP_STATE(params).then(res => {
        if (res.code === 200) {
          window.close();
          window.opener.location.reload();
        } else {
          var error = "";
          res.data.relationErrorData.forEach(x => {
            error += "<p>" + x + "</p>";
          });
          setTimeout(() => {
            that.$Modal.error({
              title: res.msg,
              content: error,
              onOk: () => {},
              onCancel: () => {}
            });
          }, 500);
        }
      });
    }, */
    /* handleRejectClick() {
      apis.GET_REASON_LIST("AUDIT_BACK_REASON").then(res => {
        if (res.code === 200) {
          this.reasonList = res.data;
        }
      });
      this.isRefuse = true;
    },
    //  拒绝
    patRefuse() {
      this.$refs.refuse.validate(valid => {
        // 表单验证
        if (valid) {
          this.refuseLoading = true; // 加载状态
          let params = {
            auditState: 1,
            billId: this.$route.query.collectId,
            comment: this.refuse.refuseMsg,
            commentId: this.refuse.commentId
          };
          apis
            .POST_CHANGE_MAP_STATE(params)
            .then(res => {
              if (res.code === 200) {
                this.$Message.success("退回成功！");
                this.refuseLoading = false; // 关闭加载状态
                this.isRefuse = false; // 关闭当前模态
                window.opener.location.reload();
                setTimeout(() => {
                  window.close();
                }, 800);
              } else {
                this.$Message.success("退回失败！");
              }
            })
            .catch(() => {
              this.isRefuse = false;
              this.refuseLoading = false;
            });
        } else {
          setTimeout(() => {
            this.isRefuse = true;
            this.refuseLoading = false;
            this.$nextTick(() => {
              this.refuseLoading = true;
            });
          }, 0);
        }
      });
    },
    // cancelPatRefuse
    cancelPatRefuse() {
      this.handleReset();
    },
    // 重置表单验证
    handleReset() {
      this.$refs.refuse.resetFields();
    }, */
    handleCloseEvent() {
      /* if (this.hasSubmit) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "您确定要关闭当前页面吗？",
          onOk: () => {
            if (this.$route.query.state == "0") {
              window.opener.document.getElementById("tpList").click();
            }

            window.close();
          },
          onCancel: () => {}
        });
      } else {
        if (this.$route.query.state == "0") {
          window.opener.document.getElementById("tpList").click();
        }
        window.close();
      } */
      window.close();
    },
    // 通过审核事件
    /* handleResolveClick() {
      this.resolveLoading = true;
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要批准该图谱吗？",
        loading: true,
        onOk: () => {
          let params = {
            auditState: 0,
            billId: this.$route.query.collectId,
            comment: ""
          };
          apis.POST_CHANGE_MAP_STATE(params).then(res => {
            this.resolveLoading = false;
            this.$Modal.remove();
            if (res.code === 200) {
              this.$Message.success("审核成功！");
              window.opener.location.reload();
              setTimeout(() => {
                window.close();
              }, 800);
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          this.resolveLoading = false;
        }
      });
    },
    mouseoverChangeCursor(e) {
      const that = this;
      if (that.markerIndex == undefined) return;
      var color = mapLists.color(
        this.listsUnfinished[this.markerIndex].personOutboundRecordInfo
          .harmLevel
      );
      if (color == undefined) {
        color = "red";
      }
      var allMap = document.getElementById("allMap");
      allMap.classList.add("dragging");
      var cursorString =
        "url(./static/vendors/baiduMap/images/" + color + ".cur) 8 8,default";
      this.map.setDefaultCursor(cursorString);
    }, */
    /* pageInfo(number) {
      console.log(number);
      this.pageIndex = number;
      this.getOutboundinfoList(this.$refs["addmodal"].form.idNumber);
    },
    pageSizeInfo(number) {
      console.log(number);
      this.pageSize = number;
      this.getOutboundinfoList(this.$refs["addmodal"].form.idNumber);
    },
    // 获取出入境信息
    getOutboundinfoList(id = null) {
      debugger
      let idNumber = id || this.idNumber;
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      var villageCode = { villageCode: this.$route.query.areaCode };
      apis.newGetOutboundinfoList(idNumber, params).then(res => {
        if (res.code == 200) {
          console.log(res);
          
          this.recordLists = res.data.data;
          this.total = res.data.total;
        }
      });
    }, */
    // 图谱概览筛选
    handleItem(type, item, index) {
      const that = this;
      that.changeHomeColor = true; //房屋颜色发生改变
      if (type == null) {
        that.screenString = "";
        that.screenIndex = null;
        that.reloadMarker();
        return;
      }
      var list = [];
      that.listsDone.forEach(i => {
        if (i == null) {
          return;
        }
        if (type.toLowerCase() == "tagid") {
          if (i.personInfo.personTagId == null) {
            list.push(i.personInfo.idNumber);
          } else {
            var tagList = i.personInfo.personTagId.split(",");
            var isTag = tagList.some(li => {
              return li == item.tagId;
            });
            if (!isTag) {
              list.push(i.personInfo.idNumber);
            }
          }
        } else if (type == "fiveOnePropertyId") {
          if (i.personInfo.fiveOnePropertyValue == null) {
            list.push(i.personInfo.idNumber);
          } else {
            var fiveId = i.personInfo.fiveOnePropertyValue.split(",");
            var isFive = fiveId.some(li => {
              return li == item.type;
            });
            if (!isFive) {
              list.push(i.personInfo.idNumber);
            }
          }
        } else if (type == "levelLine") {
          if (
            i.personcaseClueStatsInfo == null ||
            i.personcaseClueStatsInfo.length <= 0
          ) {
            list.push(i.personInfo.idNumber);
          } else {
            var isExistCaseClue =
              item.idNumbers.indexOf(i.personInfo.idNumber) != -1;
            if (!isExistCaseClue) {
              list.push(i.personInfo.idNumber);
            }
          }
        } else if (i.personInfo[that.typeName[type]] != item.type) {
          list.push(i.personInfo.idNumber);
        }
      });
      var allOverlays = that.map.getOverlays();
      var allMarkers = [];
      allOverlays.forEach(i => {
        if (i.idNumber != undefined) {
          i.setIcon(that.myIcon(that.colorHome[mapLists.color(i.colorName)]));
          allMarkers.push(i);
        }
      });
      list.forEach(x => {
        allMarkers.forEach(y => {
          if (x == y.idNumber) {
            y.setIcon(that.myIcon(that.colorHome["ccc"]));
          }
        });
      });
      // console.log(allMarkers);
    },
    mapOverviewHide() {
      this.rightContent = "";
    },
    reloadMarker() {
      const that = this;
      var allOverlays = that.map.getOverlays();
      allOverlays.forEach(i => {
        if (i.idNumber != undefined) {
          i.setIcon(that.myIcon(that.colorHome[mapLists.color(i.colorName)]));
        }
      });
    },
    stepIndexChange(selector, index) {
      this.stepIndex = index;
      // this.$el.querySelector(selector).scrollIntoView();
      var anchor = document.querySelector(selector);
      document.querySelector("#right").scrollTop = anchor.offsetTop - 17;
    },
    // 颜色还原
    initColor() {
      const that = this;
      if (that.changeHomeColor) {
        var allOverlays = that.map.getOverlays(); //获取所有的覆盖物
        allOverlays.map(a => {
          if (a.idNumber != undefined) {
            a.setIcon(that.myIcon(that.colorHome[mapLists.color(a.colorName)]));
          }
        });
      }
    },
    // 搜索框定位
    searchContent(content) {
      if (!content) return;
      const that = this;
      that.changeHomeColor = true; //房屋颜色发生改变
      var allOverlays = that.map.getOverlays(); //获取所有的覆盖物
      var allMarkers = []; //获取所有的marker覆盖物
      allOverlays.map(a => {
        if (a.idNumber != undefined) {
          a.setIcon(that.myIcon(that.colorHome[mapLists.color(a.colorName)]));
          allMarkers.push(a);
        }
      });
      allMarkers.map(y => {
        if (
          !(
            y.idNumber.indexOf(content) != -1 ||
            y.markerObj.personInfo.name.indexOf(content) != -1
          )
        ) {
          y.setIcon(that.myIcon(that.colorHome["ccc"]));
        }
      });
    },
    //隐藏个人信息面板
    hidePersonInfor(data) {
      this.statusList.PersonInforShow = data;
      this.detailType = "";
    }
  },
  filters: {
    itemLength(val) {
      return val.length;
    }
  }
};
</script>
<style lang='less' scoped>
// @import "mapCollectionNext/components/profile/css/collectMap.less";
//@import url(); 引入公共css类
.closeBtn {
  cursor: pointer;
  padding: 5px;
  position: absolute;
  right: 5px;
  top: 5px;
  i {
    font-size: 18px;
    color: #aaa;
  }
}
.map-overview {
  max-height: 86% !important;
}
.bigMarkerMapArea {
  width: 100%;
  height: 100%;
  .header {
    position: relative;
    z-index: 11;
    top: 68px;
  }
  .markerContent {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    padding-top: 110px;
    .markerContentLeft {
      width: 100%;
      height: 100%;
      flex: auto;
      position: relative;
      .operation {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 56px;
        line-height: 59px;
        text-align: center;
        background: #ffffff;
        vertical-align: middle;
        div {
          padding: 7px 22px;
          display: initial;
          font-size: 14px;
          cursor: pointer;
          border-radius: 4px;
        }
        .left {
          background: #0076ff;
          color: #ffffff;
          border: 1px solid #0076ff;
          margin-right: 10px;
        }
        .right {
          border: 1px solid #666666;
        }
      }
      .village {
        position: absolute;
        left: 18px;
        top: 18px;
        color: #000000;
        font-size: 18px;
        text-align: left;
        font-weight: bold;
      }
      .mapContent {
        width: 100%;
        height: 100%;
      }
      .markerRight {
        width: 340px;
        position: absolute;
        right: 0;
        top: 0;
        /* .map-overview{
          background: #ffffff;
          border: 1px solid #bbbbbb;
          color: #333333;
          > .title{
            border-bottom: 1px solid #bbbbbb;
          }
        } */
      }
    }
    .markerRight {
      width: 340px;
      height: 100%;
    }
  }
  .main {
    max-width: 1200px;
    margin: 0 auto;
  }
  .sketch {
    position: fixed;
    background: #ffffff;
    width: 150px;
    border: 6px solid #eeeeee;
    text-align: center;
    .img {
      width: 90px;
      height: 116px;
      background: #bbbbbb;
      display: block;
      margin: 6px auto 0;
      position: relative;
      .state {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 18px;
        text-align: center;
        font-style: normal;
        background: #a8acb3;
        color: #f4f5f6;
      }
    }
    .name {
      color: #000000;
      font-weight: 700;
      margin-top: 6px;
      display: block;
    }
    .idNumber {
      color: #666666;
    }
    .mapType {
      border-top: 1px solid #e3e3e3;
      margin: 6px 10px;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      .mapFor {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 2px;
        color: rgba(255, 255, 255, 1);
        font-size: 11px;
        text-align: center;
        position: relative;
        cursor: pointer;
        margin: 6px 12px 6px 0;
        i {
          position: absolute;
          top: -7px;
          right: -7px;
          border-radius: 50%;
          color: #ffffff;
          width: 14px;
          height: 14px;
          line-height: 14px;
          color: rgba(255, 255, 255, 1);
          font-size: 8px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 1);
          font-style: normal;
        }
      }
      .lastMapFor {
        margin-right: 0;
      }
      .tlist {
        position: fixed;
        z-index: 1001;
        max-height: 250px;
        display: block;
        background: #ffffff;
        box-shadow: #ccc 0px 0px 8px;
        padding: 5px 10px;
        overflow-y: auto;
        .senior {
          text-align: left;
          cursor: pointer;
          margin: 3px 0;
          span {
            display: inline-block;
            margin: 5px 0 0 0;
            padding: 0 5px;
            height: 25px;
            line-height: 25px;
          }
          span.more {
            width: 58px;
            height: 25px;
            font-size: 12px;
            text-align: center;
            border-radius: 3px;
            color: #fff;
            background: #4298c7;
            float: right;
          }
        }
        .ccc {
          color: #aaaaaa;
        }
        .t {
          color: #333;
          font-size: 14px;
          height: 34px;
          line-height: 34px;
          width: 100%;
          list-style-type: none;
          white-space: nowrap;
          cursor: pointer;
          text-align: left;
          max-width: 520px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          i {
            font-style: normal;
          }
        }
        .t:hover {
          background: #cac8c3;
        }
      }
    }
    .color {
      border-top: 1px solid #e3e3e3;
      text-align: center;
      margin: 6px 10px;
      padding: 4px 0px;
      div {
        float: left;
        width: 50%;
        span {
          color: #333333;
          display: block;
          text-align: center;
        }
        i {
          display: block;
          width: 18px;
          height: 18px;
          margin: 0 auto;
        }
      }
    }
    .color:after {
      content: ".";
      visibility: hidden;
      height: 0;
      clear: both;
      display: block;
    }
  }
  .sketch::after {
    content: ".";
    width: 0;
    height: 0;
    position: absolute;
    left: -20px;
    top: 43%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right: 10px solid #ffffff;
    clear: both;
    z-index: 2;
  }
}

.showMessage-enter,
.showMessage-leave-to {
  opacity: 0;
}
.showMessage-enter-active,
.showMessage-leave-active {
  transition: opacity 1s;
}
.centerMessageText {
  position: absolute;
  top: 50px;
  left: 48%;
  display: inline;
  background: #fff;
  pointer-events: all;
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  i {
    color: rgb(105, 105, 250);
  }
}
.ivu-modal-body {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;

  // padding: 0 16px;
  .title {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    flex: 0 0 48px;
    align-items: center;
    padding-left: 16px;
    border-bottom: 1px solid #e0e3e6;
    padding: 12px 0 12px 16px;
    .notice-info {
      font-size: 14px;
      .red {
        color: #ed4014;
      }
    }
  }
  .form-panel.ivu-form {
    margin-top: 20px;
  }

  .modal-content {
    height: calc(100% - 40px);
    padding: 15px;
    overflow: auto;
  }
}
.exitEnter /deep/.ivu-modal-content .ivu-modal-body {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f7f7f7;
  .left {
    width: 153px;
    height: 100%;
    background: #f7f7f7;
    position: relative;
    .item {
      height: 50px;
      padding-left: 20px;
      margin-top: 20px;
      margin-left: 20px;
      border-left: 1px solid #cccccc;
      div {
        height: 20px;
        line-height: 20px;
        a {
          color: #333333;
        }
      }
      .stepOne {
        margin-bottom: 10px;
      }
      div.act a {
        color: #0668c8;
      }
      .stepOne.act::after {
        content: "";
        display: block;
        width: 2px;
        height: 20px;
        background: #0668c8;
        position: absolute;
        top: 20px;
        bottom: 0;
        left: 20px;
        z-index: 3;
      }
      .stepTwo.act::after {
        content: "";
        display: block;
        width: 2px;
        height: 20px;
        background: #0668c8;
        position: absolute;
        top: 50px;
        bottom: 0;
        left: 20px;
        z-index: 3;
      }
    }
    /* .item::after{
      content: "";
      display: block;
      width: 1px;
      height: 50px;
      background: #cccccc;
      position: absolute;
      top: 20px;
      bottom: 0;
      left: 20px;
      z-index: 1;
    } */
  }
  .right {
    width: 100%;
    height: 100%;
    border: 1px solid #e0e3e6;
    background: #f7f7f7;
    overflow: auto;
    margin-right: 19px;
    .topAddPersonnelInfo {
      background: #ffffff;
      padding-bottom: 20px;
      .foot {
        width: 60%;
        margin: 0 auto;
        text-align: right;
        button {
          color: #ffffff !important;
          background-color: #2db7f5;
        }
      }
    }
    .bottomenterInfo {
      background: #ffffff;
      margin-top: 20px;
      .infoTitle::after {
        content: ".";
        height: 0;
        display: block;
        clear: both;
        visibility: hidden;
      }
      .infoTitle {
        font-size: 16px;
        font-weight: bold;
        padding: 12px 16px;
        border-bottom: 1px solid #e0e3e6;
        .titleLeft {
          float: left;
          color: #333333;
        }
        .titleRight {
          // display: inline-block;
          cursor: pointer;
          text-align: center;
          width: 60px;
          height: 26px;
          line-height: 26px;
          font-size: 13px;
          float: right;
          border: 1px solid #bbbbbb;
          i {
            margin-left: 4px;
            color: #0668c8;
            font-size: 13px;
          }
        }
      }
      .enterRecord {
        padding: 15px 90px 60px;
      }
      .pageInfo {
        text-align: center;
      }
    }
  }
}
.dragging {
  /deep/path {
    cursor: inherit !important;
  }
}
.exit {
  text-align: right;
  padding: 16px;
  background: #ffffff;
  margin-top: 20px;
}
/deep/ .anchorBL img {
  display: none;
}

/deep/ .BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none;
}

/deep/.BMap_contextMenu {
  width: 160px;
  background: #fff;
  -webkit-box-shadow: #ccc 0px 0px 8px;
  box-shadow: #ccc 0px 0px 8px;
  z-index: 1001;
  div {
    width: 100% !important;
    margin: 0 !important;
    span {
      color: #333;
      font-size: 14px;
      height: 34px;
      line-height: 30px;
      display: inline-block;
      padding-left: 5%;
      list-style-type: none;
      cursor: pointer;
      line-height: 30px;
    }
    &:hover {
      background: #e5e5e5;
    }
  }
}
</style>
