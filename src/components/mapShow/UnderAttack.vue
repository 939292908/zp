<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 09:13:45
 * @LastEditTime: 2019-10-16 18:42:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bigMarkerMapArea" @click="handleWrapperClick($event)">
    <app-header ref="appHeader" :items="statusList" title="被打击分布图展示" :showSearch="false"></app-header>
    <div class="header">
      <operationHeader @toFatherFun="getFun" :state="state" :hasSubmit="hasSubmit"></operationHeader>
    </div>
    <div class="markerContent">
      <div class="markerContentLeft">
        <!-- 地图 -->
        <div class="mapContent" id="allMap"></div>
        <div class="mapTitle village">{{villageName}}</div>
        <div class="operation">
          <!-- <Button
            type="primary"
            v-if="hasAduit && hasFunAuth(constantFunMap.FUN_Online_F_Map_Profile_Resolve_ID)"
            :disabled="resolveLoading"
            @click.native="handleResolveClick"
          >通过</Button>-->
          <!-- <Button
            type="error"
            v-if="hasAduit && hasFunAuth(constantFunMap.FUN_Online_F_Map_Profile_Reject_ID)"
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
          ></detailsCollect>
          <personnelList
            ref="list"
            :state="state"
            :hasSubmit="hasSubmit"
            :colorHome="colorHome"
            :listsDone="listsDone"
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
    <!-- 人员简述 'left:'+sketchLeft+';top:'+sketchTop-->
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
        <span>危害等级</span>
        <i :style="'background:#'+donePersonnelInfo.personProcessRecordInfo.caseTypeColor"></i>
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
            <span :class="li.dataRight&&li.typeId != '9' ? '':'ccc'" :title="li.tpms">{{li.tpms}}</span>
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
import mapLists from "../../../static/vendors/baiduMap/mapInit.js"; //公共方法
import mapOverview from "@/components/assembly/MapOverview";
import * as apis from "@/api/collection/index.js";
import * as common from "@/api/common.js";
import Loading from "@/components/assembly/Loading";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
// import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";//展示页人员详情
import ArchivalInfor from "@/components/mapShow/components/archivalInfor"; //展示页人员详情
import considerationAndMosque from "@/components/mapCollectionNext/components/considerationAndMosque/considerationAndMosque";

export default {
  name: "UnderAttack",
  components: {
    appHeader,
    operationHeader,
    detailsCollect,
    personnelList,
    mapOverview,
    Loading,
    D3FilterCondition,
    ArchivalInfor,
    considerationAndMosque
  },
  data() {
    //这里存放数据
    return {
      isAddcm: false, //是否允许添加
      detailType: "", //展示内容 person / map
      mapType: "", //展示内容 person / map
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
        // conditionList: true,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        isShowMap: false,
        showMapOverview: true
      },
      changeHomeColor: false, //房屋颜色是否发生改变
      considerationAndMosqueShow: true,
      // resolveLoading: false,
      filterConditionVisible: false,
      filterConditionParams: null,
      userId: "", //当前用户Id
      cursorHome: false, //手势变为房子
      isProfile: true, //非被打击
      title: "被打击处理人员信息", //非被打击
      // isRefuse: false,
      state: 1, //审核状态
      // refuseLoading: false,
      /* refuse: {
        refuseMsg: "", // 驳回理由
        commentId: "" //退回理由选中id
      }, */
      /* rules: {
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
      homeLeft: 0,
      homeTop: 0,
      sketchShow: false, //人员简述隐藏
      donePersonnelInfo: {
        personInfo: {
          name: "",
          idNumber: "",
          state: "",
          picUrl: ""
        }, //人员信息
        personProcessRecordInfo: {
          caseTypeColor: ""
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
      markerObjDetail: {}, //marker详情//当前编辑人员信息
      editInfoState: false, //编辑状态
      idNumber: "", //身份证编号
      isAdd: true, //添加人员/编辑人员 true/false
      labelsInfoShow: false, //隐藏属性
      assessData: {},
      coordinate: {}, //右键获取坐标
      screenString: "", //判断
      screenIndex: null, //判断
      typeName: {
        genderId: "genderValue",
        stateId: "stateValue",
        fiveOnePropertyId: "fiveOnePropertyValue"
      },
      archivesLoadingShow: false, //laoding
      sketchStyle: "",
      toList: [],
      toListKey: "",
      showList: false,
      fixedStyle: "",
      imgPath: "", //图片
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
  computed: {
    watchInfo() {
      return this.donePersonnelInfo.personInfo.picUrl;
    }
    /* hasAduit() {
      let isAduit = this.$route.query.isAduit;
      if (isAduit == undefined) return false;
      return isAduit && (isAduit == "true" || isAduit == true) ? true : false;
    } */
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
  watch: {
    watchInfo: {
      handler(val) {
        this.imgPath = this.getImagePath(val);
      },
      immediate: true
    },
    idNumber: {
      handler(val) {},
      immediate: true
    }
  },
  mounted() {
    const that = this;
    that.$refs["archivalInfor"].mapType = "9";
    common.getPersonalCenter().then(res => {
      if (res.code == 200) {
        that.userId = res.data.userId;
      }
    });
  },
  //方法集合
  methods: {
    // 接收参数

    // 小卡片
    senior() {
      const me = this;
      var data = {};
      data.color = me.donePersonnelInfo.color;
      data.mapId = me.donePersonnelInfo.mapId;
      data.name = me.donePersonnelInfo.name;
      data.sfzhm = me.donePersonnelInfo.idNumber;
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
      if (this.showList) {
        this.sketchShow = true;
      } else {
        this.sketchShow = false;
      }
    },
    // 跳转图谱
    toarchivesjoin(data) {
      const me = this;
      if (data.typeId == "8" && data.dataRight) {
        const { href } = me.$router.resolve({
          name: "CollectMarkerExitEnter",
          query: {
            state: "1",
            collectId: data.collectId,
            areaCode: data.villageCode
          }
        });
        window.open(href, "_blank");
      } else if (data.typeId == "9" && data.dataRight) {
        return;
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
      this.toListKey = key;
      this.toList = data;
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
        /* if (that.hasSubmit) {
          markerMenu.addItem(
            new BMap.MenuItem("添加人员", that.rightAddPersonnel.bind(polygon))
          );
        } */
        polygon.index = that.teamArr.length;
        that.teamArr.push(border);
        that.teamPolygonArr.push(polygon);
        polygon.addContextMenu(markerMenu);
        that.map.addOverlay(polygon);
        that.keyPoint(polygon);
      }
    },

    // 判断是否在存范围之内
    isvillageArea(e) {
      // var allMap = document.getElementById('allMap');
      // allMap.classList.remove('dragging');
      this.map.setDefaultCursor("pointer");
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
          // console.log(obj)
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
        fontSize: "14px",
        border: "none",
        background: "none",
        fontWeight: "600"
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
      that.detailType = "person";
      that.statusList.PersonInforShow = true;
      that.idNumber = that.markerObjDetail.personInfo.idNumber;
      /* that.rightContent = "map";
      that.isMap = "personnel"; */
    },
    // 添加人员/人员列表
    getFun(data) {
      if (data == "list") {
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
        idNumber: obj.personInfo.idNumber,
        latitude: point.lat,
        longitude: point.lng,
        mapId: that.villageMapID,
        collectId: that.collectId
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
          e.personProcessRecordInfo.longitude,
          e.personProcessRecordInfo.latitude
        );
      }
      var color = mapLists.color(
        list[changeIndex].personProcessRecordInfo.caseTypeColorName
      );
      /* if (
        that.$route.query.state == 1 &&
        that.$route.query.sfzhm != undefined
      ) {
        var sfzhmList = that.$route.query.sfzhm;
        if (sfzhmList.indexOf(list[changeIndex].personInfo.idNumber) != "-1") {
          color = mapLists.color(
            list[changeIndex].personProcessRecordInfo.caseTypeColorName
          );
        } else {
          color = "ccc";
        }
      } */
      if (color == undefined) {
        color = "red";
      }
      var markerMenu = new BMap.ContextMenu(); //创建右键菜单
      var myIcon = that.myIcon(that.colorHome[color]); //icon
      // console.log('marker_' + list[changeIndex].idNumber);
      var marker = new BMap.Marker(point, { icon: myIcon, id: "marker_" }); // 创建点
      marker.oldIndex = index; //赋值，旧的序号，如果是原来的点拖动，值不变
      marker.index = changeIndex; //赋值，新的序号，如果是原来的点拖动，值不变
      marker.idNumber = list[changeIndex].personInfo.idNumber; //赋值，如果是原来的点拖动，值不变
      marker.colorName =
        list[changeIndex].personProcessRecordInfo.caseTypeColorName || "红"; //赋值，如果是原来的点拖动，值不变
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
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      // marker.setIcon(that.myIcon(that.colorHome['red']));
      // label.hide()
      that.markerListArr[changeIndex] = marker;
      that.labelListArr[changeIndex] = label;
      /* if (
        that.hasSubmit &&
        that.hasFunAuth(that.constantFunMap.FUN_Online_F_Map_Profile_Delete_ID)
      ) {
        markerMenu.addItem(
          new BMap.MenuItem("删除", that.removeMarker.bind(marker))
        ); //添加右键removeMarker
      } */
      markerMenu.addItem(
        new BMap.MenuItem("查看详细信息", that.viewPersonDetails.bind(marker))
      ); //添加右键查看详细信息
      // label创建完成
      marker.addEventListener("mouseover", that.personnelSketch); //mouseover
      /*var optionsInfo = { width: 100, height: 270, message: "" };
      var content = "221049199909235929";
      var infoWindow = new BMap.InfoWindow(content, optionsInfo);
      marker.addEventListener("mouseover", function() {
        this.map.openInfoWindow(infoWindow, point);
      }); */
      /* marker.addEventListener("mouseout", function() {
        that.sketchShow = false;
      }); */
      marker.addEventListener("mousedown", function(e) {
        that.sketchShow = false;
        that.eventObj = e;
      });
      /* if (
        that.hasSubmit &&
        that.hasFunAuth(that.constantFunMap.FUN_Online_F_Map_Profile_Add_ID)
      ) {
        marker.enableDragging(); //开启marker拖拽
        marker.addEventListener("dragend", that.markerDraagend); //绑定移动marker之后事件
      } */
      that.markerIndex = undefined;
    },
    /* openInfo(e){
      this.openInfoWindow(infoWindow);
    }, */
    // 移入显示人员简述
    personnelSketch(e) {
      this.donePersonnelInfo = this.listsDone[e.target.index];
      this.sketchLeft = e.pixel.x + 15;
      this.sketchTop = e.pixel.y - 100;
      this.sketchShow = true;
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
        .deleteMapInfo(marker.markerObj.idNumber, params)
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
    /* mousedownClear() {
      this.markerIndex = undefined;
    }, */

    // 显示详情
    handleShowDetail() {
      /* this.rightContent = "map";
      this.isMap = "map"; */
      this.detailType = "map";
      this.statusList.PersonInforShow = true;
    },

    initLoad(i = 1) {
      const that = this;
      that
        .initLoading(i)
        .then(res => {
          if (res == 1) {
            that.archivesLoadingShow = false;
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
            that.isAdd = null;
          }
        })
        .catch(res => {
          console.log(res);
          that.archivesLoadingShow = false;
        });
    },
    // 状态操作
    /*stateFun() {
      this.hasSubmit = false;
      if (this.$route.query.isAudit != null) {
        this.hasSubmit = false;
      } else {
        if (this.state == 0 || this.state == 3) {
          this.hasSubmit = true;
        }
      } 
    },*/
    initLoading(i) {
      // 发送请求，获取是否已经绘制过地图
      const that = this;
      // console.log(this.$config.personLabel);//人员状态
      var params = { collectId: that.$route.query.collectId };

      var promise = new Promise(async (resolve, reject) => {
        apis.getCollectMapInfo(that.$route.query.areaCode, params).then(res => {
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
    }, */
    /* isSubmission() {
      const that = this;
      var params = {
        auditState: 2,
        billId: that.$route.query.collectId
      }; */
    /* apis.POST_CHANGE_MAP_STATE(params).then(res => {
        window.close();
        window.opener.location.reload();
      }); */
    /* apis.POST_CHANGE_MAP_STATE(params).then(res => {
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
    }, */
    //  拒绝
    /* patRefuse() {
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
    }, */
    // cancelPatRefuse
    /* cancelPatRefuse() {
      this.handleReset();
    }, */
    // 重置表单验证
    /* handleReset() {
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
    }, */
    /* mouseoverChangeCursor(e) {
      const that = this;
      if (that.markerIndex == undefined) return;
      var color = mapLists.color(
        this.listsUnfinished[this.markerIndex].personProcessRecordInfo
          .caseTypeColorName
      );
      var allMap = document.getElementById("allMap");
      allMap.classList.add("dragging");
      var cursorString =
        "url(./static/vendors/baiduMap/images/" + color + ".cur) 8 8,default";
      this.map.setDefaultCursor(cursorString);
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
<style lang="less" scoped>
// @import "./components/assembly/css/graph.less";
</style>
<style lang='less' scoped>
//@import url(); 引入公共css类
.modal-content {
  height: calc(100% - 93px) !important;
}
.map-overview {
  max-height: 86% !important;
}
.dragging {
  /deep/path {
    cursor: inherit !important;
  }
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
    z-index: 0;
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
        // cursor: url('../../../static/vendors/baiduMap/images/b.png') 8 8;
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
          padding-left: 5%;
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
  .home {
    position: fixed;
    width: 28px;
    height: 24px;
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

#ivu-modal-328011 .ivu-modal-close {
  right: 8px;
  top: 8px;
}
.editOrAdd /deep/.ivu-modal-wrap {
  .ivu-modal-content {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    // padding: 20px;
  }
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

