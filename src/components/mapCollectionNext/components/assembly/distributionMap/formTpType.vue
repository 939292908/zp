<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 19:40:17
 * @LastEditTime: 2019-10-11 16:51:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="formTpType-box">
    <Form ref="form" :model="form" :rules="rule" :label-width="labelWidth">
      <FormItem label="隶属村" prop="belongAreaDisplayName">
        <tree-filter
          v-show="!disable"
          :apiKey="optionConfig.CITY_AREA_TREE"
          :apiParams="cityParams"
          :validParams="true"
          ref="cityTree"
          select-type="leaf"
          :tree-props="cityTreeProps"
          v-model="form.belongAreaDisplayName"
          placeholder
          :afterCallback="cityAfterCallback"
          :treeData="cityTreeData"
          :apiFun="cityApis"
          @on-select-change="handleCitySelectChange"
        ></tree-filter>
        <span v-if="disable" class="input-label">{{belongCityAreaName}}</span>
      </FormItem>
      <div>
        <FormItem label="图谱名称" prop="mapName">
          <i-input v-if="!disable" v-model.trim="form.mapName"></i-input>
          <span v-else class="input-label">{{form.mapName}}</span>
        </FormItem>
        <FormItem v-if="showWorkObjective" label="图谱编号" prop="collectId">
          <span class="input-label">{{form.collectId}}</span>
        </FormItem>
        <FormItem label="图谱描述" prop="mapDescription">
          <i-input
            v-if="!disable"
            v-model.trim="form.mapDescription"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 6}"
          ></i-input>
          <Tooltip
            v-else
            max-width="330"
            :content="form.mapDescription"
            theme="light"
            :class="{hiddenTooltip : form.mapDescription ==null}"
          >
            <span class="input-label map-info">{{form.mapDescription}}</span>
          </Tooltip>
        </FormItem>
        <FormItem v-if="showWorkObjective" label="工作对象身份证号" prop="coreIdNumber">
          <span class="input-label">{{form.coreIdNumber}}</span>
        </FormItem>
        <FormItem v-if="showWorkObjective" label="工作对象姓名" prop="corePersonName">
          <span class="input-label">{{form.corePersonName}}</span>
        </FormItem>
        <FormItem label="采集人" prop="collectPerson">
          <i-input v-if="!disable" v-model="form.collectPerson"></i-input>
          <span v-else class="input-label">{{form.collectPerson}}</span>
        </FormItem>
        <FormItem label="归属部门" prop="belongDeptDisplayName">
          <tree-filter
            ref="deptTree"
            :apiKey="optionConfig.DEPT_TREE"
            v-show="!disable"
            select-type="all"
            :treeData="treeData"
            :afterCallback="deptAfterCallback"
            v-model="form.belongDeptDisplayName"
            placeholder
            :apiFun="deptApis"
            @on-select-change="handleDeptSelectChange"
          ></tree-filter>
          <span v-if="disable" class="input-label">{{belongDeptName}}</span>
        </FormItem>
      </div>
    </Form>
    <div class="histroy-box" v-if="showHistroy">
      <div class="histroy-box-header clearfix">
        <h3>图谱审核记录</h3>
        <Button class="look-btn" @click="handleHistory">
          查看明细
          <Icon type="md-list-box" />
        </Button>
      </div>
      <div class="histroy-box-content">
        <div class="stateItem" v-for="(item,index) in lastHistroy" :key="index">
          <h3 :style="{color:stateFontColor[item.auditStateValue]}">{{item.auditStateValue}}</h3>
          <p class="p-name-phone">
            <span class="auditUserName">{{item.auditUserName}}</span>
            <span class="gang">|</span>
            <span>{{item.auditUserPhone}}</span>
          </p>
          <p>{{item.auditTime}}</p>
          <p>{{item.auditDeptName}}</p>
          <p class="backReason">{{item.auditComment}}</p>
        </div>
      </div>
    </div>
    <!-- 审核历史 -->
    <audit-history
      v-model="showHistroyModel"
      v-on:handleHistroy="changeShowHistroy"
      :histroyData="histroyData"
    ></audit-history>
    <Modal
      v-model="iviewModalShowOne"
      @on-ok="messageShowOne()"
      @on-cancel="messageCancel()"
      title="提示信息"
      width="340"
    >
      <p>{{messagesOne}}</p>
    </Modal>
    <Modal
      v-model="iviewModalShowTwo"
      @on-ok="messageShowTwo()"
      @on-cancel="messageCancel()"
      title="提示信息"
      width="340"
    >
      <p>{{messagesTwo}}</p>
    </Modal>
  </div>
</template>
<script>
import * as comApis from "@/api/common.js";
import { OPTIONS_LIST } from "@/api/config.js";
import * as apis from "@/api/collection/index.js";
import * as userApis from "@/api/system/userManager.js";
import * as tool from "../../../../../tools/units.js";
import TreeFilter from "@/components/assembly/TreeFilter";
export default {
  name: "FamilyFormTpType",
  components: {
    TreeFilter,
    AuditHistory: () =>
      import("@/components/mapCollectionNext/components/assembly/auditHistory")
  },
  props: {
    // 批量采集 第一步是否成功
    stepOneIsSuccess: {
      type: Boolean,
      default: false
    },
    // 批量采集 第二步是否成功
    stepTwoIsSuccess: {
      type: Boolean,
      default: false
    },
    // 是否是编辑模式,true:查看，false：可编辑
    disable: {
      type: Boolean,
      default: false
    },
    // 是新增还是编辑
    isAdd: {
      type: Boolean,
      default: true
    },
    isFirst: {
      type: Boolean,
      default: true
    },
    collectId: {
      type: String,
      default: ""
    },
    // 工作对象身份证号码
    workObjectPersonIdNumber: {
      type: String,
      default: ""
    },
    relation: {
      type: Object,
      default() {
        return null;
      }
    },
    showWorkObjective: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String | Number,
      default: 80
    }
  },
  data() {
    return {
      isBeingHit: true, //是否是被打击
      villageName: "", //村名
      drawn: false,
      collector: false, // 是否有collectorid
      iviewModalShowOne: false, //是否显示提示框
      iviewModalShowTwo: false, //是否显示提示框
      state: 0,
      messagesOne: "", //提示信息
      messagesTwo: "", //提示信息
      sameCreater: false, //无权限创建该图谱
      form: {
        mapType: "", //图谱类型
        mapName: "", //图谱名称
        collectId: "", //采集编号
        mapDescription: "", //图谱描述
        collectPerson: "", //采集人姓名
        belongDeptId: "", //归属部门
        belongDeptName: "", //归属名称
        belongDeptDisplayName: "",
        belongArea: "", //归属区划
        belongAreaCode: "", //归属区划名称
        belongAreaDisplayName: "",
        corePersonName: "", //工作对象姓名
        coreIdNumber: "" //工作对象身份证号
      },
      stateFontColor: {
        提交: "#19be6b",
        通过: "#19be6b",
        退回: "#ed4014",
        审核中: "#2d8cf0"
      },
      deptApis: comApis.getDeptTree,
      cityApis: comApis.GET_AREA_TREE_INFO,
      cityParams: { dataAuth: 2 },
      belongDeptList: [], //归属部门列表
      belongCityList: [], //归属区划列表
      cityTreeProps: {
        children: "childAreaList",
        title: "displayName",
        id: "code"
      },
      optionConfig: OPTIONS_LIST,
      rule: {
        mapName: [
          {
            required: true,
            message: "图谱名称不能为空",
            trigger: "blur"
          }
        ],
        mapDescription: [
          {
            required: true,
            message: "图谱描述不能为空",
            trigger: "blur"
          },
          {
            max: 1200,
            message: "内容不能超过1200字",
            trigger: "blur"
          }
        ],
        collectPerson: [
          {
            required: true,
            message: "采集人不能为空",
            trigger: "blur"
          }
        ],
        belongDeptDisplayName: [
          {
            required: true,
            message: "归属部门不能为空",
            trigger: "change"
          }
        ],
        belongAreaDisplayName: [
          {
            required: true,
            message: "隶属村不能为空",
            trigger: "change"
          }
        ]
      },
      treeData: null,
      cityTreeData: null,
      belongDeptName: "",
      belongCityAreaName: "",
      showHistroy: false,
      showHistroyModel: false,
      linkPath: "", //需要跳转的path
      histroyData: {},
      lastHistroy: []
    };
  },
  created() {
    this.isBeingHit = this.$route.query.mapType == 9 ? true : false;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.isAdd) {
        //新增模式下
        let userInfo = this.$store.state.userInfo;
        this.form.collectPerson = userInfo.ruleName;
        this.getTokenUserInfo();
      } else {
        //初始化表单信息
        this.getMapInfo();
      }
    },
    // 获取登录用户的信息
    getTokenUserInfo() {
      const me = this;
      userApis.getTokenUserInfo().then(res => {
        if (res.code == 200) {
          me.form.belongDeptName = res.data.userDeptName;
          me.form.belongDeptId = res.data.userDeptId;
          me.form.belongAreaCode = res.data.userDeptAreaCode;
          let deptTreeData = me.$refs.deptTree.deptList;
          let deptParseData = me.$refs.deptTree.deptArrayList;
          me.setDeptName(deptTreeData, deptParseData, me.form.belongDeptId);

          let cityTreeData = me.$refs.cityTree.deptList;
          let cityParseData = me.$refs.cityTree.deptArrayList;
          me.setCityName(cityTreeData, cityParseData);
        }
      });
    },
    // 选择归属部门信息
    handleDeptSelectChange(cur) {
      this.form.belongDeptId = cur.deptId;
      this.form.belongDeptName = cur.title;
    },
    // 选择归属区划信息
    handleCitySelectChange(cur) {
      const that = this;
      that.form.belongAreaCode = cur.code;
      that.form.belongArea = cur.title;
      that.getMapInfoRequest(cur.code);
    },
    // 获取图谱信息
    getMapInfoRequest(code) {
      const that = this;
      return apis
        .getDrawState(code)
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            that.drawn = res.data.description == "已绘制" ? true : false;
            if (that.isBeingHit) {
              that.collector =
                res.data.mapInfo.collectId != null ? true : false;
              that.form.mapType = res.data.mapInfo.mapType; //图谱类型
              that.form.mapName = res.data.mapInfo.mapName; //图谱名称
              that.form.collectId = res.data.mapInfo.collectId; //采集编号
              that.state = res.data.mapInfo.state; //采集状态
              that.form.mapDescription = res.data.mapInfo.mapDescription; //图谱描述
              that.linkPath = "/collectMarkerProfile";
            } else {
              that.collector =
                res.data.outBoundMapInfo.collectId != null ? true : false;
              that.form.mapType = res.data.outBoundMapInfo.mapType; //图谱类型
              that.form.mapName = res.data.outBoundMapInfo.mapName; //图谱名称
              that.form.collectId = res.data.outBoundMapInfo.collectId; //采集编号
              that.state = res.data.outBoundMapInfo.state; //采集状态
              that.form.mapDescription =
                res.data.outBoundMapInfo.mapDescription; //图谱描述
              that.linkPath = "/collectMarkerExitEnter";
            }
            that.villageName = res.data.name;
            that.sameCreater = res.data.sameCreater; //图谱描述
            that.judgment();
          } else {
            console.log(res);
          }
        })
        .catch(response => {
          console.log(response);
        });
    },
    // 根据绘制提示
    messageShowOne() {
      const that = this;
      if (that.messagesOne == "无权限创建该图谱，联系绘制人！") {
        return;
      }
      var path = "";
      var query = {
        areaCode: that.form.belongAreaCode
      };
      if (that.drawn && that.form.collectId != null) {
        query = {
          areaCode: that.form.belongAreaCode,
          collectId: that.form.collectId,
          state: that.state
        };
        that.$router.push({
          path: that.linkPath, //mapReview
          query: query
        });
      } else if (!that.drawn) {
        path = "/collectDrawProfile"; // 绘制地图
        var newPath = that.$router.resolve({
          path: path, //mapReview
          query: query
        });
        window.open(newPath.href, "_blank");
      }

      // var newPath = this.$router.resolve({
      //   path: path, //mapReview
      //   query: query
      // });
      // window.open(newPath.href, '_blank');
    },
    // 根据权限提示
    messageShowTwo() {},
    messageCancel() {
      this.iviewModalShowOne = false;
      if (!this.sameCreater) {
        this.messagesTwo = "无权限创建该图谱，联系绘制人！";
        this.iviewModalShowTwo = true;
      }
    },
    judgment() {
      const that = this;
      // 第一步成功，第二步失败，不弹框
      if (that.stepOneIsSuccess && !that.stepTwoIsSuccess) {
        return false;
      } else if (!that.drawn) {
        /* that.messagesOne =
          "该村边界未绘制，边界绘制后才可以添加图谱，是否去绘制？";
        that.iviewModalShowOne = true; */
        that.$Modal.confirm({
          title: "温馨提示",
          content: "该村边界未绘制，边界绘制后才可以添加图谱，是否去绘制？",
          onOk: () => {
            // hasFunAuth(constantFunMap.PAGE_Online_Draw_Profile_ID)
            if (
              this.hasPageAuth(this.constantPageMap.PAGE_Online_Draw_Profile_ID)
            ) {
              var query = {
                areaCode: that.form.belongAreaCode
              };
              var newPath = that.$router.resolve({
                path: "/collectDrawProfile", // 绘制地图
                query: {
                  areaCode: that.form.belongAreaCode
                }
              });
              window.open(newPath.href, "_blank");
            } else {
              setTimeout(() => {
                that.$Modal.confirm({
                  title: "温馨提示",
                  content: "无地图绘制权限!",
                  onOk: () => {},
                  onCancel: () => {}
                });
              }, 500);
            }
          },
          onCancel: () => {}
        });
        return false;
      } else if (!that.sameCreater && that.form.collectId == null) {
        that.$Modal.confirm({
          title: "温馨提示",
          content: "无权限创建该图谱，请联系绘制人！",
          onOk: () => {},
          onCancel: () => {}
        });
        /* that.messagesOne = "无权限创建该图谱，请联系绘制人！";
        that.iviewModalShowOne = true; */
        return false;
      } else if (that.drawn && that.form.collectId != null) {
        /* this.messagesOne = "图谱已新建，是否去采集？";
        this.iviewModalShowOne = true;
        return false; */
        if (that.state != 2) {
          var query = {};
          query = {
            areaCode: that.form.belongAreaCode,
            collectId: that.form.collectId,
            state: that.state
          };
          that.$router.push({
            path: that.linkPath, //mapReview
            query: query
          });
        } else {
          that.$Modal.confirm({
            title: "温馨提示",
            content:
              that.villageName + "图谱已提交，暂时不能进行人员打点操作。",
            onOk: () => {},
            onCancel: () => {}
          });
        }
      }
      return true;
    },
    // 保存图谱的信息
    save() {
      this.judgment();
      var judgment = this.judgment();
      if (!judgment) {
        this.$parent.saveLoading = false;
        return;
      }
      let data = this.form;
      data.mapType = this.$parent.curSelectTp || this.$route.query.mapType;
      let req = !this.isAdd
        ? apis.PATCH_SAVE_MAP_INFO
        : apis.postSavaMapProfile;
      if (!this.isAdd) {
        data.collectId = this.collectId || this.$route.query.collectId;
      }
      var promise = new Promise((resolve, reject) => {
        req(data).then(res => {
          if (res.code == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
    },
    // 获取采集图谱基本信息
    getMapInfo() {
      const me = this;
      let collectId = this.collectId || this.$route.query.collectId;
      apis.GET_MAP_INFO(collectId).then(res => {
        if (res.code != 200) return;
        this.form = res.data;
        this.form.belongDeptDisplayName = res.data.belongDeptName;
        this.form.belongAreaDisplayName = res.data.belongArea;
        let deptTreeData = me.$refs.deptTree.deptList;
        let deptParseData = me.$refs.deptTree.deptArrayList;
        me.setDeptName(deptTreeData, deptParseData, me.form.belongDeptId);

        let cityTreeData = me.$refs.cityTree.deptList;
        let cityParseData = me.$refs.cityTree.deptArrayList;
        me.setCityName(cityTreeData, cityParseData);
        me.handleReset();
      });
    },
    deptAfterCallback(treeData, parseData) {
      this.setDeptName(treeData, parseData, this.form.belongDeptId);
    },
    cityAfterCallback(treeData, parseData) {
      if (!this.isAdd) {
        this.setCityName(treeData, parseData);
      }
    },
    setDeptName(treeData, parseData, belongDeptId, parseId = "deptId") {
      let deptNode = parseData.find(x => x[parseId] == belongDeptId);
      if (deptNode) {
        let deptNodePath = {
          title: deptNode.title,
          id: deptNode.deptId
        };
        if (deptNode.parent) {
          tool.getTreeNodePathById(deptNode.parent.id, deptNodePath, parseData);
        }
        this.belongDeptName = deptNodePath.title;
        this.form.belongDeptDisplayName = deptNode.title;
        this.form.belongDeptId = deptNode.deptId;
      }
    },
    setCityName(treeData, parseData) {
      let cityNode = parseData.find(x => x.code == this.form.belongAreaCode);
      if (cityNode) {
        let cityNodePath = {
          title: cityNode.title,
          id: cityNode.id
        };
        if (cityNode.parent) {
          tool.getTreeNodePathById(
            cityNode.parent.id,
            cityNodePath,
            parseData,
            { title: "title", id: "code" }
          );
        }
        this.belongCityAreaName = cityNodePath.title;
        this.form.belongAreaDisplayName = cityNode.title;
      }
    },
    // 提交验证
    handleSubmit() {
      const that = this;
      var promise = new Promise((resolve, reject) => {
        that.$refs["form"].validate(valid => {
          if (valid && !that.collector) {
            that
              .save()
              .then(res => {
                resolve(res);
              })
              .catch(res => {
                reject(res);
              });
          } else {
            // 如果第二步成功 并且未绘制地图，那么需要重新更新下绘制状态
            if (that.stepTwoIsSuccess && !that.drawn) {
              that.getMapInfoRequest(that.form.belongAreaCode).then(res => {
                that.judgment();
                reject();
              });
            } else {
              that.judgment();
              reject();
            }
          }
        });
      });
      return promise;
    },
    //
    // 重置
    handleReset() {
      // this.$refs["form"].resetFields();
      this.$refs["form"].fields.forEach(e => {
        if (e.prop != "collectPerson" && e.prop != "belongDeptDisplayName")
          e.resetField();
      });
      this.drawn = false;
    },
    // 获取审核历史信息
    getHistroy() {
      apis.GET_MAP_HISTROY_DATA(this.$route.query.collectId).then(res => {
        if (res.code === 200) {
          let data = res.data;
          data.mapName = this.form.mapName;
          this.histroyData = data;
          if (data.auditRecordData.length > 0) {
            let list = [];
            list = data.auditRecordData[0];
            if (list.length > 2) {
              this.lastHistroy = list.slice(list.length - 2);
            } else {
              this.lastHistroy = list;
            }
          }
        }
      });
    },
    changeShowHistroy(val) {
      this.showHistroyModel = val;
    },
    // 查看历史明细
    handleHistory() {
      this.showHistroyModel = true;
    }
  },
  watch: {
    isAdd: {
      handler(val) {},
      immediate: true
    },
    collectId: {
      handler(val) {},
      immediate: true
    },
    stepOneIsSuccess: {
      handler(val) {
        console.log(val);
        if (val) {
          // 获取图谱名称，描述
          this.getMapInfoRequest(this.form.belongAreaCode);
        }
      },
      immediate: false
    },
    "$parent.$parent.$route": {
      handler(val) {
        if (val.query.isAduit != undefined) {
          this.showHistroy = true;
          this.$nextTick(() => {
            this.getHistroy();
          });
        }
      },
      immediate: true
    },
    "$parent.$parent.$parent.mapStateView": {
      handler(val) {
        console.log("$parent.$parent.$parent.mapStateView");
      },
      immediate: true
    },
    "$parent.$parent.$parent.showDetail": {
      handler(val) {
        console.log("加载$parent.$parent.$parent.showDetail");
        if (val) {
          this.init();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .ivu-form-item {
  // margin-bottom: 12px;
  .ivu-form-item-label {
    color: #aaaaaa;
    font-size: 14px;
  }
  .ivu-form-item-content {
    color: #666666;
    font-size: 14px;
  }
}
.histroy-box {
  border-top: 1px solid #e3e3e3;
  background-color: #fafafa;
  padding: 18px;
  margin-top: 50px;
  .histroy-box-header {
    h3 {
      float: left;
      font-size: 14px;
      line-height: 2;
    }
    .look-btn {
      float: right;
    }
  }
  .stateItem {
    margin-top: 23px;
    h3 {
      font-size: 14px;
    }
    .p-name-phone {
      font-size: 13px;
      .auditUserName {
        font-weight: bold;
      }
      .gang {
        color: #cccccc;
        padding: 0 3px;
      }
    }
    .backReason {
      color: #ed4014;
    }
    font-size: 12px;
    color: #666;
  }
}
/deep/textarea.ivu-input {
  font-size: 12px;
}
</style>
