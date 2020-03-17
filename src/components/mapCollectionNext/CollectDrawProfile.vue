<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 17:08:19
 * @LastEditTime: 2019-09-27 11:05:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bigDrawMapArea">
    <div class="content">
      <!-- left 绘制功能 -->
      <div class="drawFunction">
        <!-- 村级边界绘制 -->
        <div
          class="fun"
          @click="startDrawVillageBorder()"
          :class="{'act':selectFunIndex==1,'disabled':!hasVillageAuth||!this.editState}"
        >
          <i class="iconfont icon-gangbi"></i>
          <span class="mt10">村级边界绘制</span>
        </div>
        <!-- 小队/组边界绘制 -->
        <div
          class="fun"
          @click="startDrawTeamBorder()"
          :class="{'act':selectFunIndex==2,'disabled':!hasVillageAuth||!editState}"
        >
          <i class="iconfont icon-gangbi"></i>
          <span>小队/组边界绘制</span>
        </div>
        <!-- <div class="fun" @click="closeDraw()">
          <i class="iconfont icon-gangbi"></i>
          <span>关闭边界绘制</span>
        </div>-->
        <!-- 村两委 -->
        <div
          class="fun"
          @click="addVillageCommittee()"
          :class="{'act':selectFunIndex==4,'disabled':!hasVillageAuth||!editState||considerationArr.length>=1}"
        >
          <i class="iconfont icon-xingxing"></i>
          <span class="mt10">添加党委</span>
        </div>
        <!-- 清真寺 -->
        <div
          class="fun"
          @click="addMosque()"
          :class="{'act':selectFunIndex==5,'disabled':!hasVillageAuth||!editState||mosqueArr.length>=1}"
        >
          <i class="iconfont icon-qingzhensi"></i>
          <span class="mt10">添加清真寺</span>
        </div>
        <!-- 删除辖区地图 -->
        <div
          class="fun"
          @click="clearMapBorder()"
          :class="{'act':selectFunIndex==3,'disabled':!hasVillageAuth||!editState}"
        >
          <i class="iconfont icon-qingkong"></i>
          <span class="mt10">删除辖区地图</span>
        </div>
      </div>
      <!-- center 地图 -->
      <div class="contentLeft">
        <div class="mapContent" id="allMap"></div>
        <div class="mapTitle village">
          <i class="iconfont icon-fanhui" v-if="fromLink" @click="previousPage()"></i>
          {{villageName}}
        </div>
        <transition name="showMessage">
          <div v-show="flag" class="centerMessageText">
            <i class="ivu-icon ivu-icon-ios-information-circle"></i>
            {{errorMessage}}
          </div>
        </transition>
      </div>
      <!-- right 地图详情 编辑 -->
      <detailsRight
        :villageName="villageName"
        :villageInfo="villageInfo"
        :teamList="teamList"
        :editState="editState"
        :villageAllInfo="villageAllInfo"
        @villageInfoToFather="getVillageInfo"
      ></detailsRight>
    </div>
    <!-- 小队小区的名称和概述添加和修改 -->
    <!-- 绘制小队后填写信息 -->
    <Modal
      v-model="teamModalShow"
      :title="teamTypeTitle"
      :closable="true"
      :mask-closable="false"
      @on-cancel="cancelTeam(teamTitleEdit)"
      width="360"
    >
      <Form ref="itemInfo" :model="itemInfo" :label-width="120" :rules="ruleValidateTeam">
        <FormItem label="小队/组边界名称:" prop="nameItem">
          <i-input v-model="itemInfo.nameItem" placeholder="小队/组边界名称:..."></i-input>
        </FormItem>
        <FormItem label="小队/组边界概述:" prop="detailItem">
          <Input
            v-model="itemInfo.detailItem"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 4}"
            placeholder="小队/组边界概述..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="info" size="large" @click="enterTureTeam('itemInfo')" v-if="!teamTitleEdit">确定</Button>
        <Button type="info" size="large" @click="preserveEditSummary('itemInfo')" v-else>保存</Button>
        <Button type="info" size="large" @click="cancelTeam(teamTitleEdit)">取消</Button>
      </div>
    </Modal>
    <!-- 村概述添加和修改 -->
    <!-- 绘制村后填写信息 -->
    <Modal
      v-model="villageModalShow"
      :title="villageTypeTitle"
      :closable="true"
      :mask-closable="false"
      @on-cancel="cancelVillage()"
      width="360"
    >
      <Form ref="villageInfo" :model="villInfo" :label-width="120" :rules="ruleValidateVillage">
        <FormItem label="村边界概述:" prop="detailItem">
          <Input
            v-model="villInfo.detailItem"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 4}"
            placeholder="村边界概述..."
          />
        </FormItem>
      </Form>
      <!-- <div class="name">
          <div class="left">村边界概述:</div>
          <div class="right"><textarea v-model="villageInfo" name="" id="" cols="30" rows="5"></textarea></div>
      </div>-->
      <div slot="footer">
        <Button type="info" size="large" @click="enterTureVillage('villageInfo')">确定</Button>
        <Button type="info" size="large" @click="cancelVillage()">取消</Button>
      </div>
    </Modal>
    <!-- 删除小队-->
    <Modal
      v-model="deleteInfo"
      width="360"
      title="删除小队/组边界以及信息"
      @on-ok="deleteBorderInfo(true)"
      @on-cancel="deleteBorderInfo(false)"
    >
      <div style="text-align:center">
        <p>是否确定删除小队/组边界以及信息？</p>
      </div>
    </Modal>
    <!-- 添加或编辑党委 -->
    <Modal
      v-model="considerationModalShow"
      :title="considerationTitle"
      :closable="true"
      :mask-closable="false"
      @on-cancel="cancelConsideration(considerationInfoEdit)"
      width="360"
    >
      <Form
        ref="considerationInfo"
        :model="considerationInfo"
        :label-width="100"
        :rules="ruleValidateConsideration"
      >
        <FormItem label="党委名称:" prop="nameItem">
          <i-input v-model="considerationInfo.nameItem" placeholder="党委名称:..."></i-input>
        </FormItem>
        <FormItem label="党委概述:" prop="detailItem">
          <Input
            v-model="considerationInfo.detailItem"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 4}"
            placeholder="党委概述..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="info"
          size="large"
          @click="enterTureConsideration('considerationInfo')"
          v-if="!considerationInfoEdit"
        >确定</Button>
        <Button
          type="info"
          size="large"
          @click="holdConsiderationInfo('considerationInfo')"
          v-else
        >保存</Button>
        <Button type="info" size="large" @click="cancelConsideration(considerationInfoEdit)">取消</Button>
      </div>
    </Modal>
    <!-- 添加或编辑清真寺 -->
    <Modal
      v-model="mosqueModalShow"
      :title="mosqueTitle"
      :closable="true"
      :mask-closable="false"
      @on-cancel="cancelMosque(mosqueInfoEdit)"
      width="360"
    >
      <Form ref="mosqueInfo" :model="mosqueInfo" :label-width="100" :rules="ruleValidateMosque">
        <FormItem label="清真寺名称:" prop="nameItem">
          <i-input v-model="mosqueInfo.nameItem" placeholder="清真寺名称:..."></i-input>
        </FormItem>
        <FormItem label="清真寺概述:" prop="detailItem">
          <Input
            v-model="mosqueInfo.detailItem"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 4}"
            placeholder="清真寺概述..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="info"
          size="large"
          @click="enterTureMosque('mosqueInfo')"
          v-if="!mosqueInfoEdit"
        >确定</Button>
        <Button type="info" size="large" @click="holdMosqueInfo('mosqueInfo')" v-else>保存</Button>
        <Button type="info" size="large" @click="cancelMosque(mosqueInfoEdit)">取消</Button>
      </div>
    </Modal>
    <!-- consideration 村党委 mosque 清真寺-->
    <considerationAndMosque ref="considerationAndMosque" v-model="considerationAndMosqueShow" :isAddcm="isAddcm" :villageAllInfo="villageAllInfo"></considerationAndMosque>
    <!-- loading -->
    <loading color="white" v-model="archivesLoadingShow"></loading>
  </div>
</template>

<script>
import detailsRight from "./components/profile/detailsCollect";
import mapLists from "../../../static/vendors/baiduMap/mapInit.js";
import * as apis from "@/api/collection/index.js";
import * as comApis from "@/api/common.js";
import { OPTIONS_LIST } from "@/api/config.js";
import Loading from "@/components/assembly/Loading";
import considerationAndMosque from "./components/considerationAndMosque/considerationAndMosque";
export default {
  name: "CollectDrawProfile",
  components: {
    detailsRight,
    Loading,
    considerationAndMosque
  },
  data() {
    //这里存放数据
    return {
      isAddcm:false,//是否允许添加
      considerationModalShow: false, //党委添加或编辑模态框显示
      considerationTitle: "填写添加党委名称以及概述", //党委添加或编辑
      considerationInfoEdit: false, //是否是编辑党委名称以及概述
      considerationPoint: {
        lat: "0",
        lng: "0"
      }, //党委坐标
      mosqueModalShow: false, //清真寺添加或编辑模态框显示
      mosqueTitle: "填写添加清真寺名称以及概述", //清真寺添加或编辑
      mosqueInfoEdit: false, //是否是编辑清真寺名称以及概述
      mosquePoint: {
        lat: "0",
        lng: "0"
      }, //清真寺坐标
      flag: false,
      archivesLoadingShow: false,
      considerationAndMosqueShow: true,
      errorMessage: "", //数据加载错误
      map: null, //初始化地图map数据
      center: { lng: 79.053224, lat: 40.534712 }, //地图的中心点79.053224,40.534712
      zoom: 16, //地图缩放等级最小为9只能看到aks地区
      drawingManager: {}, //绘制点线面
      drawType: {
        //绘制类型点线面
        marker: BMAP_DRAWING_MARKER,
        polygon: BMAP_DRAWING_POLYGON,
        polyline: BMAP_DRAWING_POLYLINE
      },
      drawingState: null, //''村未绘制，'cun'村已绘制， 'dui'队已绘制
      teamModalShow: false, //添加小队名称以及概述模态框
      villageModalShow: false, //添加村概述模态框
      villageName: "", //获取的村名称
      villageMapID: "", //获取的村地图ID
      villageInfo: "", //模态框内的村概述
      villageAllInfo: {}, //进入时村信息
      teamAllInfo: {}, //进入时队信息
      villageDrawStyle: mapLists.style(
        "red",
        "#ffffff",
        "1",
        ".8",
        ".2",
        "solid"
      ), //村边界样式
      teamTitleEdit: false, //是否是编辑小队名称以及概述
      editSummaryIndex: null, //当前编辑的小队index
      teamTypeTitle: "填写添加小区名称以及概述", //绘制小区
      villageTypeTitle: "填写添加村概述", //绘制村
      selectFunIndex: 0,
      checkedSelect: 99, //绘制小队/村
      estateDrawing: false, //绘制中
      team: false, //可绘制社区，多次绘制
      considerationArr: [], //村党委数组vo
      mosqueArr: [], //清真寺数组vo
      teamArr: [], //社区，队，存入数组vo
      teamList: [], //社区，队，存入数组右边信息部分info
      teamDrawStyle: mapLists.style(
        "#6f7174",
        "#a3a7ad",
        "1",
        ".8",
        ".2",
        "dashed"
      ), //小队绘制样式
      // 党委信息
      considerationAllInfo: {},
      considerationInfo: {
        nameItem: "",
        detailItem: ""
      },
      // 清真寺信息
      mosqueAllInfo: {},
      mosqueInfo: {
        nameItem: "",
        detailItem: ""
      },
      //模态框内的小队名称和概述
      itemInfo: {
        nameItem: "",
        detailItem: ""
      },
      //模态框内的小队名称和概述
      villInfo: {
        detailItem: ""
      },
      ruleValidateConsideration: {
        nameItem: [
          {
            required: true,
            message: "党委名称不能为空",
            trigger: "blur"
          }
        ]
      },
      ruleValidateMosque: {
        nameItem: [
          {
            required: true,
            message: "清真寺名称不能为空",
            trigger: "blur"
          }
        ]
      },
      ruleValidateTeam: {
        nameItem: [
          {
            required: true,
            message: "小队/组边界名称不能为空",
            trigger: "blur"
          }
        ],
        detailItem: [
          {
            required: true,
            message: "小队/组边界概述不能为空",
            trigger: "blur"
          }
        ]
      },
      ruleValidateVillage: {
        detailItem: [
          { required: true, message: "村概述不能为空", trigger: "blur" }
        ]
      },
      editStart: false, //编辑模式开启无法绘制或编辑其他小队
      rightEvent: null, //右键操作的对象e
      hamlet: [], //保存后村的point
      isPolygonInside: true, //多边形的点是否在村边界之外
      currentEvent: {}, //当前的对象
      markerList: [], //多边形重心点
      labelList: [], //多边形重心label 组或队名称
      considerationList: [], //党委名称
      mosqueList: [], //清真寺名称
      deleteInfo: false, //删除信息提示
      editInfo: false, //取消编辑边界信息提示
      editState: true, //是否可编辑
      fromLink: false, //是否来自采集页面
      linkName: "", //给个返回按钮-name
      linkQuery: {}, //给个返回按钮-query
      fullPath: "", //给个返回按钮-fullPath
      markerMenuVillage: null, //村右键
      considerationMenuTeam: [], //党委右键
      mosqueMenuTeam: [], //清真寺右键
      markerMenuTeam: [], //小组、队右键
      agencyTypeList: [], //组织列表
      colorHome: {
        qzs: require("../../../static/vendors/baiduMap/images/qzs.png"),
        dw: require("../../../static/vendors/baiduMap/images/dw.png")
      }
    };
  },
  computed: {
    // 编辑边界绘制权限
    hasVillageAuth() {
      return this.hasFunAuth(
        this.constantFunMap.FUN_Online_F_Map_Graph_Edit_ID
      );
    }
  },
  created() {
    // 初始化
    this.initLoad();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(from);
      if (from.name != null) {
        vm.fromLink = true;
        vm.linkName = from.name;
        vm.linkQuery = from.query;
        vm.fullPath = from.fullPath;
        console.log(from);
      } else {
        vm.fromLink = false;
      }
      /* if (
        from.name == "CollectMarkerProfile" ||
        from.name == "CollectMarkerExitEnter"
      ) {} */
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "CollectHardAddMap") {
      window.location.reload();
    }
    next();
  },
  mounted() {
    this.$store
      .dispatch("getOptionsByKey", {
        key: OPTIONS_LIST.AGENCY_TYPE,
        apiFun: comApis.GET_OPTIONS_LIST,
        params: OPTIONS_LIST.AGENCY_TYPE
      })
      .then(res => {
        this.agencyTypeList = res;
      });
  },
  //方法集合
  methods: {
    // 添加村委
    addVillageCommittee() {
      if (this.considerationArr.length >= 1) return;
      this.selectFunIndex = 4;
      this.considerationInfoEdit = false;
      this.considerationTitle = "填写添加党委名称以及概述";
      this.drawArea("marker");
    },
    // 添加清镇市
    addMosque() {
      if (this.mosqueArr.length >= 1) return;
      this.selectFunIndex = 5;
      this.mosqueInfoEdit = false;
      this.mosqueTitle = "填写添加清真寺名称以及概述";
      this.drawArea("marker");
    },
    // 删除辖区地图
    clearMapBorder() {
      if (!this.villageMapID) return;
      this.$Modal.confirm({
        title: "删除辖区地图",
        content: "是否确认删除？该操作无法撤销！",
        onOk: () => {
          this.deleteAllMap();
        },
        onCancel: () => {}
      });
    },
    deleteAllMap() {
      const that = this;
      console.log(this.villageMapID);
      apis.deleteAll(this.villageMapID).then(res => {
        if (res.code == 200) {
          that.$Message.success("辖区地图删除成功！");
          // window.location.reload();
          that.initLoad();
        }
      });
    },
    init() {
      const me = this;
      me.map = mapLists.initialize(
        "allMap",
        me.center.lng,
        me.center.lat,
        me.zoom
      ); // --初始化map--
      me.map.disableDoubleClickZoom();
      me.drawingManager = new BMapLib.DrawingManager(me.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        polygonOptions: mapLists.style("red", "blue", "1", ".8", ".2", "solid") //多边形的样式
      });
      // 多边形画完之后的事件
      me.drawingManager.addEventListener(
        "polygoncomplete",
        me.polygonsComplete
      );
      me.drawingManager.addEventListener("markercomplete", me.markercomplete);

      /* me.map.addEventListener('click',function(e){
        var allOverlay = me.map.getOverlays();
        for(let i = 0; i<allOverlay.length; i++){
          if(allOverlay[i].name!='cun'&&allOverlay[i].name!='dui'&&allOverlay[i].UQ=="Polygon"){
            console.log(allOverlay[i]);
          }
        }
      }) */
    },
    mosqueMarker() {
      const that = this;
      var mosqueArr = that.mosqueArr;
      for (let i = 0; i < mosqueArr.length; i++) {
        var markerMenu = new BMap.ContextMenu();
        var point = new BMap.Point(
          mosqueArr[i].longitude,
          mosqueArr[i].latitude
        );
        var marker = new BMap.Marker(point, {
          icon: that.myIcon(that.colorHome["qzs"])
        });
        marker.name = "mosque";
        marker.index = that.mosqueList.length;
        marker.markerObj = mosqueArr[i];
        var label = new BMap.Label(
          mosqueArr[i].name,
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
        that.map.addOverlay(marker);
        that.map.addOverlay(label);
        that.mosqueList.push(label);
        that.rightMosque(marker, 1, marker.index);
        marker.addEventListener("click", that.showconsiderationAndMosqueInfo); //绑定事件单击显示个人信息
        if (that.hasVillageAuth) {
          marker.enableDragging(); //开启marker拖拽
          marker.addEventListener("dragend", that.markerMosqueDraagend); //绑定移动marker之后事件
        }
      }
    },
    considerationMarker() {
      const that = this;
      var considerationArr = that.considerationArr;
      for (let i = 0; i < considerationArr.length; i++) {
        var markerMenu = new BMap.ContextMenu();
        var point = new BMap.Point(
          considerationArr[i].longitude,
          considerationArr[i].latitude
        );
        var marker = new BMap.Marker(point, {
          icon: that.myIcon(that.colorHome["dw"])
        });
        marker.name = "consideration";
        marker.index = that.considerationList.length;
        marker.markerObj = considerationArr[i];
        var label = new BMap.Label(
          considerationArr[i].name,
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
        that.map.addOverlay(marker);
        that.map.addOverlay(label);
        that.considerationList.push(label);
        that.rightConsideration(marker, 1, marker.index);
        marker.addEventListener("click", that.showconsiderationAndMosqueInfo); //绑定事件单击显示个人信息
        if (that.hasVillageAuth) {
          marker.enableDragging(); //开启marker拖拽
          marker.addEventListener("dragend", that.markerConsiderationDraagend); //绑定移动marker之后事件
        }
      }
    },
    showconsiderationAndMosqueInfo(e) {
      // considerationAndMosque
      console.log(id);
      let id='';
      if(e.target.markerObj == undefined){
        if(e.target.name == "consideration"){
          id = this.considerationArr[e.target.index].id;
        }else{
          id = this.mosqueArr[e.target.index].id;
        }
      }else{
        id = e.target.markerObj.id;
      }
      if (e.target.name == "consideration") {
        this.$refs["considerationAndMosque"].showConsideration(id);
      } else {
        this.$refs["considerationAndMosque"].showMosque(id);
      }
    },
    // 未绘制
    undrawn(Point) {
      const that = this;
      var marker = new BMap.Marker(Point); // 创建点
      that.map.addOverlay(marker); //如果未绘制中心点打点，提示可以返回上一步
      var labelString =
        '<div class="drawNull"><span>' +
        that.villageName +
        '</span><a onclick="javascript:window.close();">更换位置</a><div>';
      var label = new BMap.Label(labelString, mapLists.opts(Point, -100, -120)); // 创建文本标注对象
      label.setStyle({
        width: "200px",
        fontSize: "14px",
        height: "80px",
        border: "none"
      });
      that.map.addOverlay(label);
    },
    // 如果该村已经绘制 获取坐标 绘制
    hamletDrawn() {
      const that = this;
      var allOverlay = that.map.getOverlays();
      for (var i = 0; i < allOverlay.length; i++) {
        if (
          allOverlay[i].name != "consideration" &&
          allOverlay[i].name != "mosque"
        ) {
          that.map.removeOverlay(allOverlay[i]);
        }
        // that.map.removeOverlay(allOverlay[i]);
      }
      var polygon = {};
      // var markerMenu = new BMap.ContextMenu();
      var hamletBorderPoint = [];
      for (var i in that.hamlet) {
        hamletBorderPoint.push(
          new BMap.Point(that.hamlet[i].lng, that.hamlet[i].lat)
        );
      }
      polygon = new BMap.Polygon(hamletBorderPoint, that.villageDrawStyle);
      polygon.name = "cun";
      if (this.hasVillageAuth && this.editState) {
        that.rightClickFunctionEdit(polygon, 1);
      }
      that.map.addOverlay(polygon);
    },
    // 组已经绘制 获取坐标 绘制
    teamDrawn(groupInfoList) {
      const that = this;
      that.teamAllInfo = groupInfoList;
      for (let i = 0; i < that.teamAllInfo.length; i++) {
        // console.log(that.teamAllInfo[i]);
        var markerMenu = new BMap.ContextMenu();
        var info = that.teamAllInfo[i];
        var border = JSON.parse(info.border);
        var teamBorderPoint = [];
        for (let x in border) {
          teamBorderPoint.push(new BMap.Point(border[x].lng, border[x].lat));
        }
        // console.log(teamBorderPoint);
        var polygon = new BMap.Polygon(teamBorderPoint, that.teamDrawStyle);
        polygon.name = "dui";
        polygon.index = that.teamArr.length;
        that.teamList.push({
          name: info.name,
          id: info.id,
          detail: info.description
        });
        that.teamArr.push(border);
        if (that.hasVillageAuth && that.editState) {
          that.rightClickFunctionEditTeam(polygon, 1, polygon.index);
          /* polygon.addContextMenu(markerMenu); */
        }
        that.map.addOverlay(polygon);
        that.keyPoint(polygon);
      }
    },
    // 开始绘制村边界
    startDrawVillageBorder() {
      if (!this.hasVillageAuth || !this.editState) return;
      if (this.drawingState == "") {
        this.selectFunIndex = 1;
        this.allOverlay(); // 清除中心点
        this.drawArea("polygon"); //多边形绘制开启
      } else if (this.editStart) {
        this.errorMessage = "请保存绘制区域";
        this.instance();
      } else {
        this.errorMessage = "村边界已经绘制完成";
        this.instance();
      }
    },
    // 开始绘制组队边界
    startDrawTeamBorder() {
      if (!this.hasVillageAuth || !this.editState) return;
      if (this.editStart) {
        this.errorMessage = "请保存绘制区域";
        this.instance();
      } else if (this.drawingState == "cun" || this.drawingState == "dui") {
        if (this.estateDrawing) return;
        this.selectFunIndex = 2;
        if (this.drawingManager._isOpen) {
          this.closeDraw();
          return;
        }
        this.drawArea("polygon"); //多边形绘制开启
        this.estateDrawing = true;
      } else if (this.drawingState == "") {
        this.errorMessage = "先绘制村边界";
        this.instance();
      }
    },
    // // 清除中心点
    allOverlay() {
      var allOverlay = this.map.getOverlays();
      for (var i = 0; i < allOverlay.length; i++) {
        if (
          allOverlay[i].point != null &&
          allOverlay[i].point.lng == this.center.lng &&
          allOverlay[i].point.lat == this.center.lat
        ) {
          this.map.removeOverlay(allOverlay[i]);
        }
      }
    },
    // 绘制多边形
    drawArea(type) {
      this.drawingManager.setDrawingMode(this.drawType[type]);
      this.openDraw();
    },
    // 村取消
    cancelVillage() {
      const that = this;
      var allOverlay = that.map.getOverlays();
      for (var i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i].name == "cun") {
          this.map.removeOverlay(allOverlay[i]);
        }
      }
      that.drawingState = "";
      that.villageModalShow = false;
    },
    // 党委打点取消
    cancelConsideration(is) {
      const that = this;
      if (!is) {
        // 绘制时取消
        that.considerationArr.pop();
        var allOverlay = that.map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++) {
          if (
            allOverlay[i].name == "consideration" &&
            allOverlay[i].index == that.considerationArr.length
          ) {
            that.map.removeOverlay(allOverlay[i]);
          }
        }
        that.considerationModalShow = false;
      } else {
        that.considerationModalShow = false;
      }
    },
    // 清真寺打点取消
    cancelMosque(is) {
      const that = this;
      if (!is) {
        // 绘制时取消
        that.mosqueArr.pop();
        var allOverlay = that.map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++) {
          if (
            allOverlay[i].name == "mosque" &&
            allOverlay[i].index == that.mosqueArr.length
          ) {
            that.map.removeOverlay(allOverlay[i]);
          }
        }
        that.mosqueModalShow = false;
      } else {
        that.mosqueModalShow = false;
      }
    },
    // 组/队取消
    cancelTeam(is) {
      const that = this;
      if (!is) {
        // 绘制时取消
        that.teamArr.pop();
        var allOverlay = that.map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++) {
          if (
            allOverlay[i].name == "dui" &&
            allOverlay[i].index == that.teamArr.length
          ) {
            that.map.removeOverlay(allOverlay[i]);
          }
        }
        that.teamModalShow = false;
      } else {
        // 编辑时取消
        this.teamModalShow = false;
      }
    },
    // 取消边界编辑
    callOfEdit(e, ee, Polygon) {
      // this.initLoad(2);
      console.log(this.teamArr[Polygon.index]);
      const that = this;
      if (that.editStart && that.rightEvent == Polygon) {
        that.initLoad(2);
        Polygon.disableEditing();
      }
    },
    // 多边形绘制完毕后派发事件
    polygonsComplete(e) {
      if (e.vo.length >= 3) {
        this.polygonComplete(e);
      } else {
        this.map.removeOverlay(e);
        this.errorMessage = "重新绘制";
        this.instance();
        this.estateDrawing = false;
      }
    },
    // 绘制点完成后派发事件
    markercomplete(e) {
      const that = this;
      var point = new BMap.Point(e.point.lng, e.point.lat);
      var markerMenu = new BMap.ContextMenu();
      var newMarker = null;
      that.closeDraw(); //关闭绘制
      if (that.selectFunIndex == 4) {
        newMarker = new BMap.Marker(point, {
          icon: that.myIcon(that.colorHome["dw"])
        }); // 创建点 */
        newMarker.name = "consideration";
        newMarker.index = that.considerationArr.length;
        that.considerationModalShow = true;
        that.considerationInfo.nameItem = "";
        that.considerationInfo.detailItem = "";
        that.considerationPoint.lat = newMarker.point.lat;
        that.considerationPoint.lng = newMarker.point.lng;
      } else if (that.selectFunIndex == 5) {
        newMarker = new BMap.Marker(point, {
          icon: that.myIcon(that.colorHome["qzs"])
        }); // 创建点 */
        newMarker.name = "mosque";
        newMarker.index = that.mosqueArr.length;
        that.mosqueModalShow = true;
        that.mosqueInfo.nameItem = "";
        that.mosqueInfo.detailItem = "";
        that.mosquePoint.lat = newMarker.point.lat;
        that.mosquePoint.lng = newMarker.point.lng;
      }
      that.currentEvent = newMarker;
      that.map.removeOverlay(e); //清除点绘制新坐标
      that.map.addOverlay(newMarker); // 添加新的多边形覆盖物
      newMarker.addEventListener("click", that.showconsiderationAndMosqueInfo); //绑定事件单击显示个人信息
      if (that.selectFunIndex == 4) {
        that.rightConsideration(newMarker, 1, newMarker.index);
        if (that.hasVillageAuth) {
          newMarker.enableDragging(); //开启marker拖拽
          newMarker.addEventListener(
            "dragend",
            that.markerConsiderationDraagend
          ); //绑定移动marker之后事件
        }
      } else if (that.selectFunIndex == 5) {
        that.rightMosque(newMarker, 1, newMarker.index);
        if (that.hasVillageAuth) {
          newMarker.enableDragging(); //开启marker拖拽
          newMarker.addEventListener("dragend", that.markerMosqueDraagend); //绑定移动marker之后事件
        }
      }

      /* if (that.hasVillageAuth) {
        newMarker.enableDragging(); //开启marker拖拽
        newMarker.addEventListener("dragend", that.markerDraagend); //绑定移动marker之后事件
      } */
    },
    markerConsiderationDraagend(e) {
      const that = this;
      that.currentEvent = e.target;
      var params = {
        id: that.considerationArr[e.target.index].id,
        latitude: e.point.lat,
        longitude: e.point.lng
      };
      apis.considerationMosquePointInfo(params).then(res => {
        if (res.code == 200) {
          console.log(res);
          that.considerationAllInfo = res.data;
          that.considerationArr[e.target.index] = res.data;
          that.$Message.success("坐标修改成功！");
          console.log(that.considerationArr);
          // 设置点样式以及label
          that.addLabel(that.currentEvent, "consideration");
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    markerMosqueDraagend(e) {
      const that = this;
      that.currentEvent = e.target;
      var params = {
        id: that.mosqueArr[e.target.index].id,
        latitude: e.point.lat,
        longitude: e.point.lng
      };
      apis.considerationMosquePointInfo(params).then(res => {
        if (res.code == 200) {
          console.log(res);
          that.mosqueAllInfo = res.data;
          that.mosqueArr[e.target.index] = res.data;
          that.$Message.success("坐标修改成功！");
          console.log(that.mosqueArr);
          // 设置点样式以及label
          that.addLabel(that.currentEvent, "mosque");
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // 右键党委编辑或删除
    rightConsideration(marker, state, index) {
      // considerationMenuTeam
      // 如果存在右键先清除
      const that = this;
      if (
        that.considerationMenuTeam[index] != null &&
        that.considerationMenuTeam[index].xa.length >= 1
      ) {
        that.map.removeContextMenu(that.considerationMenuTeam[index]);
      }
      that.considerationMenuTeam[index] = new BMap.ContextMenu();
      that.considerationMenuTeam[index].addItem(
        new BMap.MenuItem(
          "编辑名称/概述",
          that.editConsiderationInfo.bind(marker)
        )
      );
      that.considerationMenuTeam[index].addItem(
        new BMap.MenuItem("删除", that.deleteConsiderationInfo.bind(marker))
      );
      marker.addContextMenu(that.considerationMenuTeam[index]);
    },
    editConsiderationInfo(e, ee, Preserve) {
      this.currentEvent = Preserve;
      this.considerationModalShow = true;
      this.considerationInfoEdit = true;
      this.considerationInfo.nameItem = this.considerationArr[
        Preserve.index
      ].name;
      this.considerationInfo.detailItem = this.considerationArr[
        Preserve.index
      ].description;
    },
    // 右键清真寺编辑或删除
    rightMosque(marker, state, index) {
      // considerationMenuTeam
      // 如果存在右键先清除
      const that = this;
      if (
        that.mosqueMenuTeam[index] != null &&
        that.mosqueMenuTeam[index].xa.length >= 1
      ) {
        that.map.removeContextMenu(that.mosqueMenuTeam[index]);
      }
      that.mosqueMenuTeam[index] = new BMap.ContextMenu();
      that.mosqueMenuTeam[index].addItem(
        new BMap.MenuItem("编辑名称/概述", that.editMosqueInfo.bind(marker))
      );
      that.mosqueMenuTeam[index].addItem(
        new BMap.MenuItem("删除", that.deleteMosqueInfo.bind(marker))
      );
      marker.addContextMenu(that.mosqueMenuTeam[index]);
    },
    editMosqueInfo(e, ee, Preserve) {
      this.currentEvent = Preserve;
      this.mosqueModalShow = true;
      this.mosqueInfoEdit = true;
      this.mosqueInfo.nameItem = this.mosqueArr[Preserve.index].name;
      this.mosqueInfo.detailItem = this.mosqueArr[Preserve.index].description;
    },
    // 删除党委
    deleteConsiderationInfo(e, ee, Preserve) {
      const that = this;
      var title = "村党委信息删除";
      var content = "是否删除当前村党委信息？";
      that.$Modal.confirm({
        title: title,
        content: content,
        onOk() {
          apis
            .deleteconsiderationMosqueInfoInfo(
              that.considerationArr[Preserve.index].id
            )
            .then(res => {
              if (res.code === 200) {
                that.map.removeOverlay(Preserve);
                that.map.removeOverlay(that.considerationList[Preserve.index]);
                that.considerationList.splice(Preserve.index, 1, null);
                that.considerationArr.splice(Preserve.index, 1, null);
                var considerationNum = that.considerationArr.every(a => {
                  return a == null;
                });
                if (considerationNum) {
                  that.considerationList = [];
                  that.considerationArr = [];
                }
              } else {
                that.$Message.success(res.msg);
              }
            });
        },
        onCancel() {}
      });
    },
    // 删除清真寺
    deleteMosqueInfo(e, ee, Preserve) {
      const that = this;
      var title = "清真寺信息删除";
      var content = "是否删除当前清真寺信息？";
      that.$Modal.confirm({
        title: title,
        content: content,
        onOk() {
          apis
            .deleteconsiderationMosqueInfoInfo(
              that.mosqueArr[Preserve.index].id
            )
            .then(res => {
              if (res.code === 200) {
                that.map.removeOverlay(Preserve);
                that.map.removeOverlay(that.mosqueList[Preserve.index]);
                that.mosqueList.splice(Preserve.index, 1, null);
                that.mosqueArr.splice(Preserve.index, 1, null);
                var mosqueNum = that.mosqueArr.every(a => {
                  return a == null;
                });
                if (mosqueNum) {
                  that.mosqueList = [];
                  that.mosqueArr = [];
                }
              } else {
                that.$Message.success(res.msg);
              }
            });
        },
        onCancel() {}
      });
    },
    // 监听绘制多边形之后事件
    polygonComplete(e) {
      var that = this;
      that.estateDrawing = false;
      that.closeDraw(); //关闭绘制
      var markerMenu = new BMap.ContextMenu();
      var newE = null; //新的多边形覆盖物
      if (that.drawingState == "") {
        // 绘制村完成
        newE = new BMap.Polygon(e.getPath(), that.villageDrawStyle);
        that.drawingState = "cun";
        newE.name = "cun";
        that.hamlet = newE.vo;
        that.currentEvent = newE;
        that.villageModalShow = true;
        that.map.removeOverlay(e); // 删掉绘制工具绘制的多边形覆盖物
        that.map.addOverlay(newE); // 添加新的多边形覆盖物
        that.rightClickFunctionEdit(newE, 1);
      } else {
        //绘制队完成
        newE = new BMap.Polygon(e.getPath(), that.teamDrawStyle);
        newE.name = "dui";
        newE.index = that.teamArr.length;
        that.teamArr.push(newE.vo);
        that.currentEvent = newE;
        // 弹出框
        that.teamModalShow = true;
        that.teamTitleEdit = false;
        that.teamTypeTitle = "填写添加小区名称以及概述";
        that.itemInfo.nameItem = "";
        that.itemInfo.detailItem = "";
        that.map.removeOverlay(e); // 删掉绘制工具绘制的多边形覆盖物
        that.map.addOverlay(newE); // 添加新的多边形覆盖物
        that.rightClickFunctionEditTeam(newE, 1, newE.index);
      }
    },
    // 发送请求，保存村边界
    villageBorderDrawTo() {
      const that = this;
      var border = JSON.stringify(that.hamlet);
      var point = that.borderCenter(that.hamlet);
      var paramsTo = {
        border: border,
        code: this.$route.query.areaCode,
        description: this.villageInfo,
        name: this.villageName,
        latitude: point.lat,
        longitude: point.lng
      };
      apis
        .villageDraw(paramsTo)
        .then(res => {
          // console.log(res)
          if (res.code == 200) {
            that.villageMapID = res.data.villageMapID;
          } else {
            that.errorMessage = "数据加载失败！";
            that.instance(that.errorMessage);
          }
        })
        .catch(response => {
          that.errorMessage = "数据加载失败！";
          that.instance(that.errorMessage);
        });
    },
    // rightClickFunction 0 编辑中 1已完成
    rightClickFunctionEdit(Polygon, state) {
      const that = this;
      /* if (that.markerMenuVillage != null) {
        Polygon.removeContextMenu(that.markerMenuVillage);
      } */
      if (
        that.markerMenuVillage != null &&
        that.markerMenuVillage.xa.length >= 1
      ) {
        that.map.removeContextMenu(that.markerMenuVillage);
      }
      // Polygon.remove(that.markerMenuVillage);
      that.markerMenuVillage = new BMap.ContextMenu();
      if (state == 1) {
        that.markerMenuVillage.addItem(
          new BMap.MenuItem("编辑边界", that.addEventEdit.bind(Polygon))
        );
      } else {
        that.markerMenuVillage.addItem(
          new BMap.MenuItem("取消编辑", that.callOfEdit.bind(Polygon))
        );
        that.markerMenuVillage.addItem(
          new BMap.MenuItem("保存", that.addEventEditPreserve.bind(Polygon))
        );
      }

      Polygon.addContextMenu(that.markerMenuVillage);
    },
    // rightClickFunction
    rightClickFunctionEditTeam(Polygon, state, index) {
      const that = this;

      if (
        that.markerMenuTeam[index] != null &&
        that.markerMenuTeam[index].xa.length >= 1
      ) {
        that.map.removeContextMenu(that.markerMenuTeam[index]);
      }
      that.markerMenuTeam[index] = new BMap.ContextMenu();
      if (state == 1) {
        that.markerMenuTeam[index].addItem(
          new BMap.MenuItem("编辑名称/概述", that.editSummary.bind(Polygon))
        );
        that.markerMenuTeam[index].addItem(
          new BMap.MenuItem("删除", that.removePolygon.bind(Polygon))
        );
        that.markerMenuTeam[index].addItem(
          new BMap.MenuItem("编辑边界", that.addEventEdit.bind(Polygon))
        );
      } else {
        that.markerMenuTeam[index].addItem(
          new BMap.MenuItem("取消编辑", that.callOfEdit.bind(Polygon))
        );
        that.markerMenuTeam[index].addItem(
          new BMap.MenuItem("保存", that.addEventEditPreserve.bind(Polygon))
        );
      }

      Polygon.addContextMenu(that.markerMenuTeam[index]);
    },
    // 右键编辑
    addEventEdit(e, ee, Polygon) {
      // console.log(this.markerMenu.getItem(0).disable());
      const that = this;
      if (!that.editStart) {
        that.editStart = true;
        that.rightEvent = Polygon;

        Polygon.enableEditing();
        that.editingPoint = Polygon.vo;
        if (that.rightEvent.name == "cun") {
          that.rightClickFunctionEdit(Polygon, 0);
        } else {
          that.rightClickFunctionEditTeam(Polygon, 0, Polygon.index);
        }
      } else {
        that.errorMessage = "请先绘制完成！";
        that.instance("请先绘制完成！");
      }
    },
    // 编辑之后保存
    addEventEditPreserve(e, ee, Preserve) {
      console.log(Preserve);
      const that = this;
      // api.editVillageInfo()
      if (that.editStart && Preserve == that.rightEvent) {
        that.editStart = false;
        Preserve.disableEditing();
        if (Preserve.name == "cun") {
          that.hamlet = Preserve.vo;
          var point = that.borderCenter(that.hamlet);
          var border = JSON.stringify(Preserve.vo);
          var paramsTo = {
            id: that.villageMapID,
            border: border,
            latitude: point.lat,
            longitude: point.lng,
            code: that.$route.query.areaCode,
            description: "",
            name: ""
          };
          that.rightClickFunctionEdit(Preserve, 1);
          that.toPreserveVillage(paramsTo);
        } else if (Preserve.name == "dui") {
          that.teamArr.splice(Preserve.index, 1, Preserve.vo);
          that.keyPoint(Preserve);
          console.log(this.teamList[Preserve.index]);

          var point = that.borderCenter(Preserve.vo);
          var border = JSON.stringify(Preserve.vo);
          var paramsTo = {
            border: border,
            description: "",
            id: that.teamList[Preserve.index].id,
            latitude: point.lat,
            longitude: point.lng,
            name: "",
            villageCode: that.$route.query.areaCode,
            villageId: that.villageMapID,
            villageMapId: that.villageMapID
          };
          that.rightClickFunctionEditTeam(Preserve, 1, Preserve.index);
          that.toPreserveTeam(paramsTo);
        }
      }
    },
    // 保存编辑后的信息
    toPreserveVillage(paramsTo) {
      const that = this;
      apis
        .editVillageInfo(paramsTo)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            that.villageAllInfo = res.data;
          } else {
            that.errorMessage = "数据加载失败！";
            that.instance(that.errorMessage);
          }
        })
        .catch(response => {
          that.errorMessage = "数据加载失败！";
          that.instance(that.errorMessage);
        });
    },
    toPreserveTeam(paramsTo) {
      const that = this;
      apis
        .editTeamInfo(paramsTo)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            // that.villageAllInfo = res.data;
            that.villageAllInfo.updateTime = res.data.updateTime;
            that.villageAllInfo.updater = res.data.updater;
          } else {
            that.errorMessage = "数据加载失败！";
            that.instance(that.errorMessage);
          }
        })
        .catch(response => {
          that.errorMessage = "数据加载失败！";
          that.instance(that.errorMessage);
        });
    },
    // 删除信息
    deleteBorderInfo(t) {
      const that = this;
      var Polygon = this.rightEvent;
      if ((Polygon == that.rightEvent || !that.editStart) && t) {
        apis
          .deleteTeamInfo(that.teamList[Polygon.index].id)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              that.editStart = false;
              that.isPolygonInside = true;
              that.map.removeOverlay(Polygon);
              that.map.removeOverlay(that.markerList[Polygon.index]);
              that.map.removeOverlay(that.labelList[Polygon.index]);
              that.markerList.splice(Polygon.index, 1, null);
              that.labelList.splice(Polygon.index, 1, null);
              that.teamList.splice(Polygon.index, 1, null);
              that.teamArr.splice(Polygon.index, 1, null);
              that.initLoad(2);
            } else {
              that.errorMessage = res.msg || "数据加载失败！";
              that.instance();
            }
          })
          .catch(error => {
            that.errorMessage = error.msg;
            that.instance();
          });
      }
    },
    // 删除小队、小区
    removePolygon(e, ee, Polygon) {
      if (this.editStart) {
        this.errorMessage = "边界编辑中无法删除！";
        this.instance();
      } else {
        this.rightEvent = Polygon;
        this.deleteInfo = true;
      }
    },
    // 保存党委名称和概述
    holdConsiderationInfo(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          var params = {
            agencyType: "村党委",
            agencyTypeValue: "1",
            description: that.considerationInfo.detailItem,
            id: that.considerationArr[that.currentEvent.index].id,
            latitude: that.considerationArr[that.currentEvent.index].lat,
            longitude: that.considerationArr[that.currentEvent.index].lng,
            name: that.considerationInfo.nameItem,
            villageCode: that.$route.query.areaCode
          };
          console.log(params);
          apis.considerationMosqueInfo(params).then(res => {
            if (res.code == 200) {
              console.log(res);
              that.considerationInfo.nameItem = "";
              that.considerationInfo.detailItem = "";
              that.considerationModalShow = false;
              that.considerationAllInfo = res.data;
              that.considerationArr[that.currentEvent.index] = res.data;
              that.$Message.success("村党委信息修改成功！");
              console.log(that.considerationArr);
              // 设置点样式以及label
              that.addLabel(that.currentEvent, "consideration");
            } else {
              that.$Message.error(res.msg);
              that.map.removeOverlay(that.currentEvent);
            }
          });
        }
      });
    },
    // 保存清真寺名称和概述
    holdMosqueInfo(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          var params = {
            agencyType: "清真寺",
            agencyTypeValue: "2",
            description: that.mosqueInfo.detailItem,
            id: that.mosqueArr[that.currentEvent.index].id,
            latitude: that.mosqueArr[that.currentEvent.index].lat,
            longitude: that.mosqueArr[that.currentEvent.index].lng,
            name: that.mosqueInfo.nameItem,
            villageCode: that.$route.query.areaCode
          };
          console.log(params);
          apis.considerationMosqueInfo(params).then(res => {
            if (res.code == 200) {
              console.log(res);
              that.mosqueInfo.nameItem = "";
              that.mosqueInfo.detailItem = "";
              that.mosqueModalShow = false;
              that.mosqueAllInfo = res.data;
              that.mosqueArr[that.currentEvent.index] = res.data;
              that.$Message.success("村党委信息修改成功！");
              // 设置点样式以及label
              that.addLabel(that.currentEvent, "mosque");
            } else {
              that.$Message.error(res.msg);
              that.map.removeOverlay(that.currentEvent);
            }
          });
        }
      });
    },
    // 确认党委名称，概述
    enterTureConsideration(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          var params = {
            agencyType: "村党委",
            agencyTypeValue: "1",
            description: that.considerationInfo.detailItem,
            id: "",
            latitude: that.considerationPoint.lat,
            longitude: that.considerationPoint.lng,
            name: that.considerationInfo.nameItem,
            villageCode: that.$route.query.areaCode
          };
          console.log(params);
          apis.considerationMosqueInfo(params).then(res => {
            if (res.code == 200) {
              console.log(res);
              that.considerationModalShow = false;
              that.considerationAllInfo = res.data;
              that.considerationArr[that.currentEvent.index] = res.data;
              that.$Message.success("村党委添加成功！");
              // 设置点样式以及label
              that.addLabel(that.currentEvent, "consideration");
            } else {
              that.$Message.error(res.msg);
              that.map.removeOverlay(that.currentEvent);
            }
          });
        }
      });
    },
    // 确认清真寺名称，概述
    enterTureMosque(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          var params = {
            agencyType: "清真寺",
            agencyTypeValue: "2",
            description: that.mosqueInfo.detailItem,
            id: "",
            latitude: that.mosquePoint.lat,
            longitude: that.mosquePoint.lng,
            name: that.mosqueInfo.nameItem,
            villageCode: that.$route.query.areaCode
          };
          console.log(params);
          apis.considerationMosqueInfo(params).then(res => {
            if (res.code == 200) {
              console.log(res);
              that.mosqueModalShow = false;
              that.mosqueAllInfo = res.data;
              that.mosqueArr[that.currentEvent.index] = res.data;
              that.$Message.success("清真寺添加成功！");
              console.log(that.mosqueArr);
              // 设置点样式以及label
              that.addLabel(that.currentEvent, "mosque");
            } else {
              that.$Message.error(res.msg);
              that.map.removeOverlay(that.currentEvent);
            }
          });
        }
      });
    },
    // 确认绘制队边界，名称，概述
    enterTureTeam(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        var someOne = that.teamList.some(r => {
          return r != null && r.name == that.itemInfo.nameItem;
        });
        if (someOne) {
          // that.cancelTeam(that.teamTitleEdit);
          that.$Message.error("确认名称/概述格式,不可重复!");
          return;
        } else if (valid && !someOne) {
          that.teamList.push({
            name: that.itemInfo.nameItem,
            id: null,
            detail: that.itemInfo.detailItem
          });
          that.keyPoint(that.currentEvent);
          that.teamModalShow = false;
          // 发送请求ajax
          that.estateBorderDrawTo(
            that.itemInfo.nameItem,
            that.itemInfo.detailItem
          );
          that.itemInfo.nameItem = "";
          that.itemInfo.detailItem = "";
        }
      });
    },
    // estateDraw
    estateBorderDrawTo(nameItem, detailItem) {
      const that = this;
      var markerListIndex = that.currentEvent.index;
      var point = that.markerList[markerListIndex].point;
      var border = JSON.stringify(that.currentEvent.vo);
      var paramsTo = {
        border: border,
        description: detailItem,
        latitude: point.lat,
        longitude: point.lng,
        name: nameItem,
        villageCode: that.$route.query.areaCode,
        villageId: that.villageMapID,
        villageMapId: that.villageMapID
      };
      // apis.estateDraw
      apis
        .estateDraw(paramsTo)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            that.teamList[that.teamList.length - 1].id = res.data.areaID;
          } else {
            that.errorMessage = res.msg;
            that.instance(that.errorMessage);
            that.map.removeOverlay(that.currentEvent);
          }
        })
        .catch(error => {
          that.errorMessage = error.msg;
          that.instance();
        });
    },
    // 确认村边界概述
    enterTureVillage(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          that.villageInfo = that.villInfo.detailItem;
          that.villageModalShow = false;
          that.villageBorderDrawTo();
        }
      });
    },
    // 添加村党委以及清真寺label
    addLabel(marker, type) {
      const that = this;
      var point = new BMap.Point(marker.point.lng, marker.point.lat);

      var name = "";
      if (type == "consideration") {
        that.map.removeOverlay(that.considerationList[marker.index]);
        name = that.considerationArr[marker.index].name;
      } else if (type == "mosque") {
        that.map.removeOverlay(that.mosqueList[marker.index]);
        name = that.mosqueArr[marker.index].name;
      }
      var label = new BMap.Label(name, mapLists.opts(point, -90, 12));
      label.setStyle({
        display: "inline",
        fontSize: "12px",
        background: "none",
        border: "none",
        width: "180px",
        textAlign: "center"
      });

      that.map.addOverlay(label);
      if (type == "consideration") {
        that.considerationList.splice(marker.index, 1, label);
      } else {
        that.mosqueList.splice(marker.index, 1, label);
      }
    },
    // 多边形重心
    keyPoint(polygon) {
      var vo = polygon.vo;
      var point = this.borderCenter(vo);
      var marker = new BMap.Marker(point);
      this.map.removeOverlay(this.markerList[polygon.index]);
      this.map.removeOverlay(this.labelList[polygon.index]);
      var label = new BMap.Label(
        this.teamList[polygon.index].name,
        mapLists.opts(point, -10, -5)
      ); // 创建文本标注对象
      label.setStyle({
        color: "#333",
        fontSize: "14px",
        border: "none",
        background: "none",
        fontWeight: "600"
      });
      this.map.addOverlay(label);
      this.markerList.splice(polygon.index, 1, marker);
      this.labelList.splice(polygon.index, 1, label);
    },
    // 编辑小队概述
    editSummary(e, ee, marker) {
      const that = this;
      if (marker.name == "dui") {
        that.editSummaryIndex = marker.index;
        that.itemInfo.nameItem = that.teamList[marker.index].name;
        that.itemInfo.detailItem = that.teamList[marker.index].detail;
        that.teamTypeTitle = "编辑小区名称以及概述";
        that.teamTitleEdit = true;
        that.teamModalShow = true;
        that.currentEvent = marker;
      }
    },
    // 保存小队概述
    preserveEditSummary(name) {
      const that = this;
      that.teamTypeTitle = "填写添加小区名称以及概述";
      that.teamTitleEdit = false;
      that.$refs[name].validate(valid => {
        if (valid) {
          that.teamModalShow = false;
          that.teamList[that.editSummaryIndex].name = that.itemInfo.nameItem;
          that.teamList[that.editSummaryIndex].detail =
            that.itemInfo.detailItem;
          that.keyPoint(that.currentEvent);
          that.itemInfo.nameItem = "";
          that.itemInfo.detailItem = "";
          var paramsTo = {
            border: "",
            description: that.teamList[that.editSummaryIndex].detail,
            id: that.teamList[that.editSummaryIndex].id,
            latitude: 0,
            longitude: 0,
            name: that.teamList[that.editSummaryIndex].name,
            villageCode: that.$route.query.areaCode,
            villageId: that.villageMapID,
            villageMapId: that.villageMapID
          };
          that.toPreserveTeam(paramsTo);
          // console.log()
        } else {
          // that.$Message.error('Fail!');
        }
      });

      //
    },
    // 接收保存的村概述
    getVillageInfo(data) {
      this.villageInfo = data;
      var paramsTo = {
        id: this.villageMapID,
        border: "",
        latitude: 0,
        longitude: 0,
        code: this.$route.query.areaCode,
        description: data,
        name: ""
      };
      this.toPreserveVillage(paramsTo);
    },
    // 打开绘制
    openDraw() {
      this.drawingManager.open();
    },
    // 关闭绘制
    closeDraw() {
      this.drawingManager.close();
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
    polygonArea(p0, p1, p2) {
      let area = 0;
      area =
        p0.lng * p1.lat +
        p1.lng * p2.lat +
        p2.lng * p0.lat -
        p1.lng * p0.lat -
        p2.lng * p1.lat -
        p0.lng * p2.lat;
      return area / 2;
    },
    borderCenter(points) {
      let sumX = 0;
      let sumY = 0;
      let sumArea = 0;
      let p1 = points[1];
      let p2 = null;
      let area = 0;
      for (let i = 2; i < points.length; i++) {
        p2 = points[i];
        area = this.polygonArea(points[0], p1, p2);
        sumArea += area;
        sumX += (points[0].lng + p1.lng + p2.lng) * area;
        sumY += (points[0].lat + p1.lat + p2.lat) * area;
        p1 = p2;
      }
      return {
        lng: sumX / sumArea / 3,
        lat: sumY / sumArea / 3
      };
    },
    initLoading() {
      // 发送请求，获取是否已经绘制过地图
      const that = this;
      var promise = new Promise(async (resolve, reject) => {
        apis.getVillageDrawState(that.$route.query.areaCode).then(res => {
          console.log(res);
          if (res.code == 200) {
            that.villageAllInfo = res.data.villageInfo;
            that.considerationArr = res.data.partyList;
            that.considerationList = [];
            that.mosqueArr = res.data.mosqueList;
            that.mosqueList = [];
            that.villageName = res.data.villageInfo.name;
            that.villageInfo = res.data.villageInfo.description;
            that.villageMapID = res.data.villageInfo.id;
            that.center.lng = res.data.villageInfo.longitude;
            that.center.lat = res.data.villageInfo.latitude;
            that.hamlet = JSON.parse(res.data.villageInfo.border);
            that.villInfo.detailItem = "";
            that.drawingState = "";
            that.editStart = false;
            that.teamList = [];
            that.markerMenuVillage = null; //村右键
            that.markerMenuTeam = []; //小组、队右键
            that.considerationMenuTeam = []; //小组、队右键
            that.mosqueMenuTeam = []; //小组、队右键
            that.teamList = [];
            that.teamArr = [];
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
    },
    initLoad(i = 1) {
      const that = this;
      that.archivesLoadingShow = true;
      that
        .initLoading(i)
        .then(res => {
          if (i == 1) {
            that.init();
          }
          if (res.data.villageInfo.border != null) {
            that.drawingState = "cun";
            that.hamletDrawn();
            if (res.data.groupInfoList != "") {
              that.teamDrawn(res.data.groupInfoList);
            }
          } else {
            var Point = new BMap.Point(that.center.lng, that.center.lat);
            that.undrawn(Point);
          }
          that.archivesLoadingShow = false;
          // 打点村党委
          that.considerationMarker();
          // 打点清真寺
          that.mosqueMarker();
        })
        .catch(res => {
          console.log(res);
          that.archivesLoadingShow = false;
        });
    },
    previousPage() {
      if (this.fullPath == "") return;
      const { href } = this.$router.resolve({
        name: this.linkName,
        query: this.linkQuery
      });
      window.location.href = href;
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
    }
  }
};
window.onunload = function(e) {
  if (window.opener && !window.opener.closed) {
    self.window.opener.location.reload();
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.bigDrawMapArea {
  width: 100%;
  height: 100%;
  .archives-loading-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
  }
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  .drawFunction {
    width: 118px;
    height: 100%;
    padding: 18px;
    text-align: center;
    border-right: 1px solid #dddddd;
    .fun {
      width: 86px;
      height: 80px;
      line-height: 20px;
      border-radius: 3px;
      color: #000000;
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
      border: 1px solid #999999;
      margin-top: 16px;
      padding: 4px;
      cursor: pointer;
      i {
        font-size: 30px;
        display: block;
        margin-top: 10px;
        color: #666;
      }
      span {
        font-size: 12px;
      }
    }
    .fun span.mt10 {
      display: block;
      margin-top: 10px;
    }
    .fun.act {
      border: 2px solid rgba(0, 118, 255, 1);
    }
  }
  .contentLeft {
    width: 100%;
    height: 100%;
    position: relative;
    .mapContent {
      width: 100%;
      height: 100%;
      flex: auto;
    }
    .village {
      position: absolute;
      left: 18px;
      top: 18px;
      color: #000000;
      font-size: 18px;
      text-align: left;
      font-weight: bold;
      padding: 8px 18px 8px 15px;
      background: #ffffff;
      i {
        margin-right: 8px;
        color: #0668c8;
      }
    }
  }
}
/deep/.drawNull {
  text-align: center;
  font-size: 14px;
  color: #353535;
  width: 200px;
  padding: 16px;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(170, 170, 170, 1);
  font-family: Roboto;
  border: 1px solid rgba(227, 227, 227, 1);
  span {
    display: block;
    margin-bottom: 10px;
  }
  a {
    color: #ffffff;
    padding: 2px 4px;
    border-radius: 2px;
    background: #0076ff;
    box-shadow: 3px 3px 5px 0px rgba(170, 170, 170, 1);
  }
}
/deep/.BMap_contextMenu {
  padding: 8px;
  width: 160px;
  div span {
    margin-top: 6px;
    display: inline-block;
  }
}
// 模态框
.ivu-modal-body .name,
.ivu-modal-body .detail {
  margin-top: 10px;
  .left {
    float: left;
    margin-right: 10px;
  }
  textarea {
    resize: none;
    font-size: 12px;
  }
}
/deep/textarea.ivu-input {
  font-size: 12px;
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
.showMessage-enter,
.showMessage-leave-to {
  opacity: 0;
}
.showMessage-enter-active,
.showMessage-leave-active {
  transition: opacity 1s;
}
/deep/ .anchorBL img {
  display: none;
}
/deep/ .BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none;
}
</style>
