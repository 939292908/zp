<!--
 * @Description: 家族在线图像绘制
 * @Author: your name
 * @Date: 2019-08-16 19:13:35
 * @LastEditTime: 2019-10-24 17:55:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="d3">
    <!-- d3 -->
    <div class="hydra" id="hydra"></div>
    <!-- 图谱概述 -->
    <map-overview
      ref="mapOverview"
      v-show="$parent.showOverview"
      @on-show-detail="handleShowDetail"
      @on-change="handleSelectClick"
      :assessData="assessData"
      @on-hide="$parent.showOverview=false"
      :showDetailBtn="true"
    ></map-overview>

    <!-- 右击 查看详情信息 -->
    <template v-if="showDetailDrawer">
      <Drawer :zIndex="1009" width="512" :closable="false" v-model="showDetail">
        <Tabs v-model="tabIndex" type="card">
          <TabPane name="t0" :index="1" label="图谱详情">
            <div class="card-action">
              <i-button v-if="mapStateView && isCanEdit" @click="mapStateView = false">编辑</i-button>
              <i-button v-if="!mapStateView" @click="handleMapEditCancelClick">取消</i-button>
              <i-button
                type="primary"
                v-if="!mapStateView"
                :disabled="mapStateViewSaveLoading"
                @click="handleMapEditSaveClick"
              >保存</i-button>
            </div>
            <CaseFormTpType
              ref="formTpType"
              class="form-map"
              :disable="mapStateView"
              :isAdd="isAdd"
              :collectId="collectId"
              :showWorkObjective="true"
              :label-width="130"
            ></CaseFormTpType>
          </TabPane>
          <template v-if="showPersonInfoTab">
            <TabPane name="t1" :index="2" label="人员详情">
              <div class="card-action">
                <i-button v-if="isCanEdit" @click="handlePersonEditClick">编辑</i-button>
              </div>
              <CaseFormObjectiveView ref="formObjectiveView" :idNumber="idNumber"></CaseFormObjectiveView>
            </TabPane>
          </template>
        </Tabs>
      </Drawer>
    </template>
    <!-- 右击 编辑 模态框 :z-index="modalIndex"-->
    <template v-show="showWorkObjectiveModal">
      <Modal
        v-model="showWorkObjective"
        :fullscreen="true"
        :footer-hide="true"
        @on-cancel="handleModalCancel"
      >
        <div class="modal-body">
          <div class="modal-content map-collect-work-objective">
            <div class="title">
              {{titleWork}}
              <span class="notice-info">
                (
                <span class="red">*</span>为必填项)
              </span>
            </div>
            <div class="modal-content" ref="modal">
              <CaseWorkObjective
                ref="form"
                titleWork="titleWork"
                :collectId="collectId"
                :isFirst="isFirstworkObject"
                :idNumber="idNumber"
                :isAdd="isAddTwo"
                :relation="relation"
                :personIdNumber="personIdNumber"
                :workObjectPersonIdNumber="workObjectPersonIdNumber"
                :NodeLength="NodeLength"
                :gxmc="gxmc"
              ></CaseWorkObjective>
            </div>
          </div>
          <div class="footer-action">
            <Button
              v-if="hasFunAuth(constantFunMap.FUN_Online_R_Graph_AddEdit_ID)"
              type="primary"
              :disabled="saveLoading"
              @click.native="handleModalSaveClose"
            >保存并关闭</Button>
            <Button
              v-if="showDeletePerson && hasFunAuth(constantFunMap.FUN_Online_R_Graph_Delete_Person_ID)"
              @click.native="handleModalDelete"
            >删除人员</Button>
            <Button @click.native="handleModalCancel">关闭</Button>
          </div>
        </div>
      </Modal>
    </template>
  </div>
</template>
<script>
import { graphData } from "./mock1.js";
import * as d3 from "d3v4";
// import CaseWorkObjective from "./formObjective";
import {
  getModalMaxIndex,
  createRMenu,
  setMenuData
} from "../../../../../tools/units.js";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import { mapMixin } from "../../../mixin/mapMixin";
export default {
  name: "CaseMapGraph",
  mixins: [mapMixin],
  components: {
    MapOverview: () => import("@/components/assembly/MapOverview"),
    CaseWorkObjective: () => import("./formObjective"),
    // CaseFormObjectiveView: () => import("./formObjectiveView"),
    CaseFormObjectiveView: () => import("../personObjectView"),
    CaseFormTpType: () => import("./formTpType")
  },
  // props: {
  //   // 图谱结构
  //   graphType: {
  //     type: String,
  //     default: "level"
  //   }
  // },
  data() {
    return {
      PeopleStatusActive: "", // 点击添加 添加页默认选中(头目/骨干/...)
      gxmc: "", // 关系名称
      loadModal: false,
      titleWork: "加载人员信息",
      collectId: this.$route.query.collectId,
      tabIndex: "t0",
      saveLoading: false,
      hydra: null,
      graph: null,
      opt: null,
      mapFlag: "2",
      iconsList: [],
      graphData: {},
      tmpData: {},
      entityPropList: [],
      linksPropList: [],
      tplxList: [],
      iconsList: [],
      labelColors: [],
      showWorkObjective: false,
      showWorkObjectiveModal: false,
      showDetail: false,
      showDetailDrawer: false,
      currentNode: null,
      currentRightMenuNode: null,
      assessData: {
        archiveName: "",
        personCount: 0,
        sexTypeCount: [],
        riskLevel: "",
        personTypeCounts: [],
        labelCount: [],
        mapTypeCounts: []
      }, //图谱概述页面的数据
      mapStateView: true,
      mapStateViewSaveLoading: false,
      workObjectPersonIdNumber: "", //关系人的工作对象
      personIdNumber: "", //当前选中节点的身份证号
      coreIdNumber: "", //工作对象
      relation: null,
      isAdd: false,
      isAddTwo: false,
      showPersonInfoTab: false,
      isFirstworkObject: true, //为true时在编辑和新增工作对象时不显示,
      mapTypeOptions: []
    };
  },
  computed: {
    // 第一层人员数
    NodeLength() {
      if (this.mapFlag == "0") {
        return -1;
      } else {
        if (this.tmpData.length) {
          let tmp = this.tmpData.find(x => x.data.type == "8");
          return tmp ? tmp.data.nodes.length : 0;
        } else {
          return 0;
        }
      }
    },
    isCanEdit() {
      // 如果是审核页面过来,不可以进行提交和编辑
      let isAduit = this.$route.query.isAduit;
      if (isAduit != undefined) return false;
      let isEdit = this.$route.query.isEdit;
      if (isEdit == undefined)
        return (
          true &&
          this.hasFunAuth(this.constantFunMap.FUN_Online_R_Graph_AddEdit_ID)
        );
      let flag = isEdit && (isEdit == "true" || isEdit == true) ? true : false;
      return (
        flag &&
        this.hasFunAuth(this.constantFunMap.FUN_Online_R_Graph_AddEdit_ID)
      );
    },
    modalIndex() {
      let tmpIndex = getModalMaxIndex();
      return tmpIndex + 2;
    },
    idNumber() {
      return this.currentRightMenuNode
        ? this.currentRightMenuNode.properties.SFZHM
        : "";
    },
    // 是否能够 删除操作
    showDeletePerson() {
      if (this.isFirstworkObject || !this.currentRightMenuNode) {
        // 是第一个工作对象
        return false;
      } else {
        // 当前元素 不是 工作对象
        // return this.currentRightMenuNode.id != this.tmpData[1].data.nodes[0].id;
        return this.currentRightMenuNode.id != this.coreIdNumber;
      }
    },
    showEditRelation() {
      // 判断是否是第一个工作对象
      if (this.isFirstworkObject) return true;
      // 不是工作对象的情况下，验证节点的连线是否有多个
      if (this.relation && this.relation.node) {
        // debugger;
        // 编辑
        if (this.relation.type == "-1") {
          let node = this.relation.node;
          // 如果父节点和子节点存在
          var hasParent = node.parent
            ? node.parent.data.nodeType == "QB_ZP_RY"
              ? true
              : false
            : false;
          if (hasParent && node.children && node.children.length) return true;
          // 不存在父节点，存在子节点或无子节点
          if (!hasParent) return false;
          // 存在父节点，不存在子节点
          if (hasParent && !node.children) return false;
        } else {
          return false;
        }
      }
      return true;
    }
  },
  created() {
    this.hydra = this.$parent.hydra; //D3卡片展示
    this._getEntityLinksConfig();
    this.getMapTypeList();
    this.getMapInfo();
    this.$parent.isViewBtnShow = true;
  },
  mounted() {
    this.initRender();
    if (this.$refs.form) {
      this.$refs.form.init();
    }
  },
  methods: {
    // 初始化图形
    initRender() {
      const me = this;
      this.graph = this.hydra.graph(); //D3卡片展示
      this.opt = this.buildOpt();
      this.graph.setOptions(this.opt);
      window.onresize = function() {
        var width = document.getElementById("hydra").offsetWidth;
        if (width == 0) width = document.body.clientWidth;
        var height = document.getElementById("hydra").offsetHeight;
        if (height == 0)
          height =
            document.body.clientHeight - (me.$route.query.isAduit ? 108 : 48);
        me.graph.setSize({
          width: width,
          height: height
        });
      };
      let collectId = this.$route.query.collectId;
      if (collectId) {
        this.getGraphData();
        this.getMapOverview();
      }
    },
    // 设置初始选项
    buildOpt(type) {
      const me = this;
      var width = document.getElementById("hydra").offsetWidth;
      if (width == 0) width = document.body.clientWidth;
      var height = document.getElementById("hydra").offsetHeight;
      if (height == 0)
        height =
          document.body.clientHeight - (this.$route.query.isAduit ? 108 : 48);
      var nodeEditConfig = this.mapTypeList.find(
        x => x.id == this.$route.query.mapType
      ).action;
      let option = {
        selector: "#hydra",
        width: width,
        height: height,
        offsetTop: 55,
        type: type || "level",
        workObjectTitle: "头目",
        showToptag: true,
        allowDrag: true,
        allowThumbnail: false,
        allowNodeDbclick: false,
        expandlist: ["del", "lock", "expand"],
        highlightText: "",
        showToptagMenu: true, //标签上移展示菜单
        isHideSuperpositionBtn: true,
        properties: this.$config.properties,
        showFilterCondition: true,
        // 高级
        filterConditionClickEvt: function(data) {
          me.$parent.filterConditionVisible = true;
          me.$parent.filterConditionParams = data;
        },
        bgclick() {
          return false;
        },
        topTagClickEvt: function(data) {
          console.log(data, 12333);
          if (data.typeId == "8") {
            const { href } = me.$router.resolve({
              path: "/exitAndEntry",
              query: {
                areaCode: data.villageCode,
                collectId: data.collectId,
                sfzhm: data.sfzhm,
                state: 1
              }
            });
            window.open(href, "_blank");
          } else if (data.typeId == "9") {
            const { href } = me.$router.resolve({
              path: "/underAttack",
              query: {
                areaCode: data.villageCode,
                collectId: data.collectId,
                sfzhm: data.sfzhm,
                state: 1
              }
            });
            window.open(href, "_blank");
          } else {
            console.log(data);
            me.centerNodeName = data.name;
            me.historyCenterNodeName = data.name;
            var tpid = data.tpid.replace("#", "i").replace(":", "_"); //如果要跳转的图谱跟当前图谱一致，禁止点击
            if (!data || tpid == data.parentTpid) {
              return;
            }
            var date = new Date();
            var nowDate = me.$moment(date).format("YYYY-MM-DD HH:mm:ss");
            if (me.statusList.PersonInforShow) {
              me.statusList.PersonInforShow = false;
            }
            if (me.statusList.MultiModal) {
              me.statusList.MultiModal = false;
            }
            if (!data) {
              return;
            }
            me.tpids = data.tpid;
            me.rid = [];
            me.rid.push(data.oid); //哪个实体进入高亮绿色
            me.stackmMarriageParam = []; //清空之前叠加的图谱id
            // me.getTreeData(false);
            const { href } = me.$router.resolve({
              name: "ArchivesJoin",
              query: {
                tpids: data.mapId,
                sfzhm: data.sfzhm,
                mc: me.$route.query.mc || "在线采集"
              }
            });
            window.open(href, "_blank");
          }
        },
        mouseoutEvt: function(data) {},
        // 添加按钮 事件
        sideButtonEvt: function(node, sideButton, event) {
          // debugger;
          // console.log(
          //   "sideButtonEvt",
          //   node,
          //   sideButton,
          //   event,
          //   me.isFirstworkObject
          // );
          // 如果数据第一层有人
          if (me.NodeLength > 0) {
            me.PeopleStatusActive = node.data.type; // 默认选中
          }
          me.isAddTwo = true;
          me.isFirstworkObject = false;
          me.showWorkObjective = true;
          me.showWorkObjectiveModal = true;
          console.log(me.PeopleStatusActive);

          if (me.$refs.form) {
            me.$refs.form.setPeopleStatusActive(me.PeopleStatusActive); // 传给子组件 默认选中项
          }

          me.currentNode = {
            node: node,
            type: sideButton
          };
          me.currentRightMenuNode = null;
          // console.log(me.tmpData[0].data.nodes[0].data.properties.SFZHM,me.isFirstworkObject);
          // me.personIdNumber = node.data.properties.SFZHM;
          // 非工作对象添加 每次保存根节点(头目)id，用于添加其他人的请求参数
          if (me.tmpData[1].data.nodes.length > 0) {
            me.workObjectPersonIdNumber =
              me.tmpData[1].data.nodes[0].properties.SFZHM;
          }
          me.relation = {
            node: node,
            type: sideButton
          };
          // console.log("sideButtonEvt", node, sideButton, event);
        },
        // 案件线索的点击事件
        caseClueEvt: function(data) {
          if (
            data.name == me.$parent.CASE_CODE ||
            data.name == me.$parent.CLUB_CODE
          ) {
            const { href } = me.$router.resolve({
              path: "/caseClubList",
              query: {
                sfzhm: data.sfzhm
              }
            });
            window.open(href, "_blank");
          }
        }
      };
      if (option.type == "levelTree") {
        option.tree = {
          treeW: 350,
          treeH: 280
        };
      } else {
        option.tree = {
          treeW: 350,
          treeH: 240
        };
      }

      if (nodeEditConfig && this.isCanEdit && me.mapFlag == "2") {
        nodeEditConfig.isEdit = true;
        nodeEditConfig.borderColor = "#d7d7d7";
        option.node = nodeEditConfig;
      } else {
        option.node = {
          isEdit: false
        };
      }
      return option;
    },
    // 高亮错误卡片
    highlightErrCard(idNumbers) {
      if(!idNumbers) return;
      // 1. 排他
      let nodes = this.graph.getData().nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      let allIds = nodes.map(x => x.data.id);
      this.graph.editNodeColor(allIds, "#d7d7d7");
      // 2. 高亮 / 居中
      let errNodes = idNumbers.map(idNumber => nodes.find(x => x.data.properties.SFZHM == idNumber));
      let errIds = errNodes.map(x => x.data.id);
      this.graph.editNodeColor(errIds, "red");
      this.graph.centerSelection(errNodes, []);
    },
    // 请求时 数据的结构 0：树形图，1:社会分组图，2：层次图
    setMapFlag(mapType) {
      let type = "2";
      switch (mapType) {
        case "levelTree":
          type = "3";
          break;
        case "level":
          type = "2";
          break;
        case "tree":
          type = "0";
          break;
      }
      this.mapFlag = type; // mapFlag: 2, // 请求数据的格式
    },
    // 获取画布的数据
    getGraphData(mapType) {
      const me = this;
      // me.$parent.d3Loading = true;
      let startTime = new Date().getTime();
      let collectId = this.$route.query.collectId;
      let collectIds = [collectId];
      this.setMapFlag(mapType);
      let obj = {
        // 请求参数
        collectIds: collectIds,
        flag: me.mapFlag == "3" ? "2" : me.mapFlag
        // flag: 2
      };
      this.opt = this.buildOpt(mapType);
      this.graph.setOptions(this.opt);
      if (this.$refs.mapOverview) this.$refs.mapOverview.handleReset();
      apis.GET_ONLINE_MAP_LABEL_BY_ID(obj).then(res => {
        // 时间
        let endTime = new Date().getTime();
        let diffSecond = (endTime - startTime) / 1000;
        me.$parent.exectueTime = diffSecond;
        me.$parent.d3Loading = false;
        if (res.code != 200) {
          me.$Message.error(res.msg);
          return;
        }
        if (me.mapFlag == "0") {
          me.tmpData = JSON.parse(JSON.stringify(res.data));
          me.$parent.showWorkButton = false;
          let treeData = res.data;
          me.initialize(me.parseTreeData(treeData, false));
          return;
        }
        if (res.data.length > 0 && me.mapFlag != "0") {
          me.tmpData = JSON.parse(JSON.stringify(res.data[0]));
          // 判断是否是第一个添加人，显示添加工作对象btn
          if (me.mapFlag == "2" && me.tmpData[1].data.nodes.length == 0) {
            me.$parent.showWorkButton = true;
          } else {
            me.$parent.showWorkButton = false;
          }
          // 画图
          if (me.mapFlag == "2") {
            let levelData = res.data[0].filter(x => x.id != 0);
            me.initialize(me.parseLevelData(levelData, true));
          } else if (me.mapFlag == "3") {
            let tmpTest = res.data[0].some(
              x => x.data.type == "8" && x.data.nodes.length > 0
            );
            if (tmpTest) {
              me.initialize(me.parseLevelData(res.data[0], false));
            } else {
              document.getElementById("hydra").innerHTML = "";
            }
          }
        }
      });
    },
    // 格式化层次图 数据
    parseLevelData(data, flag) {
      data.forEach(item => {
        var nodes = item.data.nodes;
        nodes.forEach(x => {
          if (x.nodeType == "QB_ZP_TP") {
            x.isShow = flag;
          }
          if (x.nodeType == "QB_ZP_RY") {
            x.image = this.getImagePath(x.properties.picUrl);
          }
        });
      });
      return data;
    },
    // 格式化树形图 数据
    parseTreeData(data, flag) {
      var me = this;
      data = changeImage(data);
      function changeImage(data) {
        if (data.nodeType == "QB_ZP_RY") {
          data.image = me.getImagePath(data.properties.picUrl);
          data.properties.GXMC = data.gxmc || "空";
          data.state = data.properties.STATE; //D3卡片展示
          for (var i = 0; i < data.children.length; i++) {
            changeImage(data.children[i]);
          }
          return data;
        } else if (data.nodeType == "QB_ZP_TP") {
          data.isShow = flag;
          me.tplxList.forEach(function(item) {
            if (data.properties.TPLX == item.value) {
              data.properties.TPLX = item.name;
            }
          });
        }
        for (var i = 0; i < data.children.length; i++) {
          changeImage(data.children[i]);
        }
        return data;
      }
      return data;
    },
    // 获取图谱概览的数据
    getMapOverview() {
      let collectId = this.$route.query.collectId;
      apis.GET_SUMMARY_MAP_OVERVIEW(collectId).then(res => {
        if (res.code == 200) {
          this.assessData = res.data;
        }
      });
    },
    // 获取采集图谱基本信息
    getMapInfo() {
      const me = this;
      let collectId = this.$route.query.collectId;
      apis.GET_MAP_INFO(collectId).then(res => {
        if (res.code != 200) return;
        me.coreIdNumber = res.data.coreIdNumber;
      });
    },
    // 初始化画布的数据
    initialize(data) {
      document.getElementById("hydra").innerHTML = "";
      const me = this;
      this.graph.setIcons(me.iconsList);
      this.graph.init();
      me.graphData = data;
      this.graph.load(data);
      this.initMenu();
    },
    // 右键菜单
    initMenu() {
      var me = this;
      d3.select(".nodes")
        .selectAll('g[type="node"]')
        .on("contextmenu", function(e) {
          d3.event.preventDefault();
          d3.event.stopPropagation();
          // 保存右击节点
          me.currentRightMenuNode = e.data;
          me.gxmc = e.data.gxmc;
          // click事件
          let menuClicks = {
            lookClick(event) {
              me.loadModal = true;
              me.isAddTwo = true;
              me.showDetail = true;
              me.showDetailDrawer = true;
              me.tabIndex = "t1";
              me.showPersonInfoTab = true;
              let d3Data = me.graph.getData();
              // let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
              let nodes = d3Data.nodes;

              // 判断是否是第一次创建的工作对象
              me.personIdNumber = me.currentRightMenuNode.properties.SFZHM;
              if (me.isFirstworkObject) {
                me.workObjectPersonIdNumber = "";
                me.relation = null;
              } else {
                me.workObjectPersonIdNumber =
                  me.currentRightMenuNode.properties.SFZHM;
                let nodeTmp = me.graph.getNodeByParams(
                  me.currentRightMenuNode.id,
                  "id",
                  "level"
                );
                me.relation = {
                  node: nodeTmp,
                  type: "-1" //如果右键编辑节点，type设置为-1，这身份/称谓字段不能编辑
                };
                console.log(
                  me.relation,
                  "======",
                  me.currentRightMenuNode.id,
                  nodeTmp
                );
              }
            }
          };
          // 创建菜单
          createRMenu(
            "rMenu",
            setMenuData(me, menuClicks, null, me.opt.type == "level"), // 菜单data数据
            { x: d3.event.pageX + 20, y: d3.event.pageY - 54 },
            e,
            { width: 345, height: 306, top: 0, left: 160 }
          );
        });
    },
    handleSearch() {},
    // 关闭模态框
    handleModalCancel() {
      this.$refs.modal.scrollTop = 0;
      // 初始选中层级
      this.showDetail = false;
      this.showWorkObjective = false;
      this.$refs.form.handleReset();
      this.isAddTwo = !this.isAddTwo;
    },
    // 添加工作对象事件
    handleAddWorkObjectEvent() {
      const me = this;
      me.isAddTwo = true;
      me.showPersonInfoTab = false;
      me.isFirstworkObject = true;
      me.workObjectPersonIdNumber = "";
      me.personIdNumber = "";
      me.relation = null;
      me.showWorkObjective = true;
      me.showWorkObjectiveModal = true;
    },
    // 保存并关闭数据
    handleModalSaveClose() {
      this.$refs.modal.scrollTop = 0;
      const me = this;
      me.saveLoading = true;
      this.$refs.form
        .handleSubmit()
        .then(res => {
          if (res.code == 200) {
            this.showWorkObjective = false;
            me.isAddTwo = !me.isAddTwo;
            me.$Message.success("保存成功");
          }
          this.$refs.form.handleReset(); // 重置
          me.saveLoading = false;
          this.getGraphData(me.$parent.currentViewType);
          this.getMapOverview();
          // 如果是新增人员且是添加第一个工作对象，添加完后需要刷新一下图谱信息
          if (me.isAddTwo && me.isFirstworkObject) {
            me.getMapInfo();
          }
        })
        .catch(error => {
          // let errorMsg =
          // error != false ? error.msg || "保存失败" : "请完善表单信息";
          let errorMsg = "";
          if (error != false) {
            errorMsg = error && error.msg ? error.msg : "保存失败";
          } else {
            errorMsg = "请完善表单信息";
          }

          me.saveLoading = false;
          if (errorMsg != null || errorMsg != undefined)
            me.$Message.error(errorMsg);
        });
    },
    // 删除人员(根据人的身份证号进行删除)
    handleModalDelete() {
      this.$refs.modal.scrollTop = 0;
      this.$Modal.confirm({
        title: "温馨提示",
        content: "您确定要删除该人员吗?",
        onOk: () => {
          let data = {
            collectId: this.$route.query.collectId,
            childIdNumber: this.personIdNumber
          };
          apis.DELETE_PERSON_INFO(data).then(res => {
            if (res.code == 200) {
              this.getGraphData(this.$parent.currentViewType);
              this.getMapOverview();
              this.showWorkObjective = false;
              this.isAddTwo = !this.isAddTwo;
              this.$Message.success("删除成功");
              this.$refs.form.handleReset(); // 重置
            } else {
              this.$Message.error("删除失败");
            }
          });
        }
      });
    },
    // 显示详情
    handleShowDetail() {
      this.loadModal = true;
      this.showDetail = true;
      this.showDetailDrawer = true;
      this.showPersonInfoTab = false;
      this.tabIndex = "t0";
    },
    handleMapEditCancelClick() {
      if (this.$refs.formTpType) {
        this.$refs.formTpType.form = JSON.parse(
          JSON.stringify(this.$refs.formTpType.oldForm)
        );
        this.$refs.formTpType.setTreeInput();
      }
      this.mapStateView = true;
    },
    // 保存图谱信息
    handleMapEditSaveClick() {
      const me = this;
      me.mapStateViewSaveLoading = true;
      this.$refs.formTpType
        .handleSubmit()
        .then(res => {
          me.mapStateViewSaveLoading = false;
          me.$refs.formTpType.getMapInfo();
          me.mapStateView = true;
          // me.$Message.success('保存成功')
        })
        .catch(error => {
          me.$Message.error("保存失败");
          me.mapStateViewSaveLoading = false;
          console.log("验证失败");
        });
    },
    // 人员详情中的编辑按钮事件
    handlePersonEditClick() {
      const me = this;
      this.showDetail = false;
      this.showWorkObjective = true;
      this.showWorkObjectiveModal = true;
      this.isAddTwo = false;
      let d3Data = me.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      if (
        nodes.length > 0 &&
        me.currentRightMenuNode.properties.SFZHM != me.coreIdNumber
      ) {
        me.isFirstworkObject = false;
      } else {
        me.isFirstworkObject = true;
      }
      // 判断是否是第一次创建的工作对象
      me.personIdNumber = me.currentRightMenuNode.properties.SFZHM;
      if (me.isFirstworkObject) {
        me.workObjectPersonIdNumber = "";
        me.relation = null;
      } else {
        me.workObjectPersonIdNumber = me.currentRightMenuNode.properties.SFZHM;
        // alert('编辑')
        // debugger
        let nodeTmp = me.graph.getNodeByParams(
          me.currentRightMenuNode.id,
          "id"
        );
        me.relation = {
          node: nodeTmp,
          type: "-1" //如果右键编辑节点，type设置为-1，这身份/称谓字段不能编辑
        };
      }
    },
    // 图谱概述click事件，type：哪个字段查 item：点击对象
    handleSelectClick(type, item, index) {
      const me = this;
      let d3Data = me.graph.getData();
      let nodes = [];
      // 层次图 获取nodes
      // if (me.graphType == "level") {
      //   d3Data.nodes.forEach(item => {
      //     item.data.nodes.forEach(item => nodes.push(item));
      //   });
      //   // 树形图 获取nodes
      // } else if (me.graphType == "levelTree") {
      nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      // }

      // console.log(type, item.type, item.typeName, item.tagName, nodes);

      // 先清除选中
      if (nodes.length > 0) {
        me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
      }
      // 获取选中的值进行查询
      let arr = [];
      switch (type) {
        case "genderId":
          arr = nodes.filter(x => {
            return x.data && x.data.properties.genderId == item.type;
          });
          break;
        case "fiveOnePropertyId": //五位一体
          arr = nodes.filter(x => {
            return (
              x.data &&
              x.data.properties.fiveOnePropertyId.indexOf(item.type) != -1
            );
          });
          break;
        case "levelLine": //案件线索
          arr = nodes.filter(x => {
            return (
              x.data && item.idNumbers.indexOf(x.data.properties.SFZHM) != -1
            );
          });
          break;
        case "stateId": //人员属性
          arr = nodes.filter(x => {
            return (
              x.data &&
              x.data.properties.stateId == (item.type == "无" ? "" : item.type)
            );
          });
          break;
        case "tagId": //人员标签
          arr = nodes.filter(x => {
            return x.data && x.data.properties.tagId.indexOf(item.tagId) != -1;
          });
          break;
      }
      if (arr.length > 0) {
        // 高亮居中
        me.graph.editNodeColor(arr.map(x => x.data.id), "green");
        me.graph.centerSelection(arr, []);
      } else {
        // 重置
        me.graph.editNodeColor(nodes.map(x => x.data.id), "#d7d7d7");
        me.graph.centerSelection(nodes, []);
      }
    },
    /**
     * 获取所有相关配置表
     * @function getEntityLinksConfig
     * @author erbing
     */
    _getEntityLinksConfig() {
      let me = this;
      let params = {
        language: me.language
      };
      comApis.getInitializeConfig(params).then(res => {
        if (res.code != 200) {
          return false;
        }
        let data = res.data;
        me.entityPropList = data.nodeConfig || [];
        me.linksPropList = data.linkConfig || [];
        me.tplxList = data.tplxMapping || [];
        me.iconsList = data.nodeIconConfig || [];
        me.labelColors = data.labelColors || [];
        me.iconsList.map(item => {
          for (let i in item) {
            if (i == "path_1") {
              item["path_n"] = item[i];
            }
          }
        });
      });
    },
    // 获取采集文件类型的数据
    getMapTypeList() {
      apis.GET_DRAW_TP_TYPE_LIST().then(res => {
        if (res.code == 200) {
          var result = res.data;
          this.mapTypeOptions = result;
        } else {
          this.mapTypeOptions = [];
        }
      });
    }
  }
  // watch: {
  //   // 监听切换 层次图/树形图
  //   graphType: {
  //     handler(val) {
  //       this.initRender(val);
  //     },
  //     immediate: false
  //   }
  // }
};
</script>
<style lang="less" scoped>
@import "../css/graph.less";
</style>
