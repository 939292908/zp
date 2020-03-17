<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 19:40:17
 * @LastEditTime: 2019-11-18 17:45:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="formTpType-box">
    <Form ref="form" :model="form" :rules="rule" :label-width="labelWidth">
      <FormItem label="图谱名称" prop="mapName">
        <i-input v-if="!disable" v-model.trim="form.mapName"></i-input>
        <span v-else class="input-label">{{form.mapName}}</span>
      </FormItem>
      <!-- <FormItem v-if="showWorkObjective" label="图谱编号" prop="collectId">
        <span class="input-label">{{form.collectId}}</span>
      </FormItem>-->
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
          :afterCallback="deptAfterCallback"
          v-model="form.belongDeptDisplayName"
          placeholder
          :apiFun="deptApis"
          @on-select-change="handleDeptSelectChange"
        ></tree-filter>
        <span v-if="disable" class="input-label">{{belongDeptName}}</span>
      </FormItem>
      <FormItem label="归属区划" prop="belongAreaDisplayName">
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
          :apiFun="cityApis"
          @on-select-change="handleCitySelectChange"
        ></tree-filter>
        <span v-if="disable" class="input-label">{{belongCityAreaName}}</span>
      </FormItem>
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
      oldForm: null,
      stateFontColor: {
        提交: "#19be6b",
        通过: "#19be6b",
        退回: "#ed4014",
        审核中: "#2d8cf0"
      },
      deptApis: comApis.getDeptTree,
      cityApis: comApis.GET_AREA_TREE_INFO,
      cityParams: { dataAuth: 1 },
      belongDeptList: [], //归属部门列表
      belongCityList: [], //归属区划列表
      cityTreeProps: {
        children: "childAreaList",
        title: "displayName",
        id: "code"
      },
      deptTreeProps: {
        children: "children",
        title: "title",
        id: "id"
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
            message: "归属区划不能为空",
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
      histroyData: {},
      lastHistroy: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.isAdd && !this.$route.query.collectId) {
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
          me.setTreeInput();
          // let deptTreeData = me.$refs.deptTree.deptList;
          // let deptParseData = me.$refs.deptTree.deptArrayList;
          // me.setDeptName(deptTreeData, deptParseData, me.form.belongDeptId);

          // let cityTreeData = me.$refs.cityTree.deptList;
          // let cityParseData = me.$refs.cityTree.deptArrayList;
          // me.setCityName(cityTreeData, cityParseData);
          // let deptTreeData = me.$refs.deptTree.deptList;
          // let deptParseData = me.$refs.deptTree.deptArrayList;
          // me.setDeptName(deptTreeData, deptParseData,res.data.userDeptCode,'id');
        }
      });
    },
    setTreeInput() {
      const me = this;
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.DEPT_TREE,
          apiFun: this.deptApis,
          validParams: false,
          params: null
        })
        .then(response => {
          tool.getTreeData(
            response,
            OPTIONS_LIST.DEPT_TREE,
            OPTIONS_LIST,
            me.deptTreeProps,
            result => {
              let deptTreeData = result.treeData;
              let deptParseData = result.treeArrayData;
              me.setDeptName(deptTreeData, deptParseData, me.form.belongDeptId);
            }
          );
        });
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CITY_AREA_TREE,
          apiFun: this.cityApis,
          validParams: true,
          params: this.cityParams
        })
        .then(response => {
          tool.getTreeData(
            response,
            OPTIONS_LIST.CITY_AREA_TREE,
            OPTIONS_LIST,
            me.cityTreeProps,
            result => {
              let cityTreeData = result.treeData;
              let cityParseData = result.treeArrayData;
              me.setCityName(cityTreeData, cityParseData);
            }
          );
        });
    },
    // 选择归属部门信息
    handleDeptSelectChange(cur) {
      this.form.belongDeptId = cur.deptId;
      this.form.belongDeptName = cur.title;
    },
    // 选择归属区划信息
    handleCitySelectChange(cur) {
      this.form.belongAreaCode = cur.code;
      this.form.belongArea = cur.title;
    },
    // 保存图谱的信息
    save() {
      let me = this;
      let data = this.form;
      data.mapType = this.$parent.curSelectTp || this.$route.query.mapType;
      let req =
        !this.isAdd || this.$route.query.collectId
          ? apis.PATCH_SAVE_MAP_INFO
          : apis.POST_SAVE_MAP_INFO;
      if (!this.isAdd || this.$route.query.collectId) {
        data.collectId = this.collectId || this.$route.query.collectId;
      }
      // excel模式采集的图谱，在未采集人员情况下再次编辑，或excel模式采集，"下一步"为更新接口
      if (me.$route.query.excelStatus == 1 || me.$parent.stepOneIsSuccess) {
        req = apis.PATCH_SAVE_MAP_INFO;
        data.collectId = this.form.collectId || this.$route.query.collectId;
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
        this.oldForm = JSON.parse(JSON.stringify(this.form));
        // let deptTreeData = me.$refs.deptTree.deptList;
        // let deptParseData = me.$refs.deptTree.deptArrayList;
        // me.setDeptName(deptTreeData, deptParseData, me.form.belongDeptId);

        // let cityTreeData = me.$refs.cityTree.deptList;
        // let cityParseData = me.$refs.cityTree.deptArrayList;
        // me.setCityName(cityTreeData, cityParseData);
        me.setTreeInput();
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
        this.form.belongDeptName = deptNode.title;
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
          tool.getTreeNodePathById(cityNode.parent.id, cityNodePath, parseData);
        }
        this.belongCityAreaName = cityNodePath.title;
        this.form.belongAreaDisplayName = cityNode.title;
        this.form.belongArea = cityNode.title;
        this.form.belongAreaCode = cityNode.code;
      }
    },
    // 提交验证
    handleSubmit() {
      var promise = new Promise((resolve, reject) => {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.save()
              .then(res => {
                resolve(res);
              })
              .catch(res => {
                reject(res);
              });
          } else {
            reject();
          }
        });
      });
      return promise;
    },
    // 重置
    handleReset() {
      // this.$refs["form"].resetFields();
      // 不重置 采集人,归属部门,归属区划
      this.$refs["form"].fields.forEach(e => {
        if (
          e.prop != "collectPerson" &&
          e.prop != "belongDeptDisplayName" &&
          e.prop != "belongAreaDisplayName"
        )
          e.resetField();
      });
    },
    // 获取审核历史信息
    getHistroy() {
      apis.GET_MAP_HISTROY_DATA(this.$route.query.collectId).then(res => {
        if (res.code === 200 && res.data.auditRecordData) {
          this.showHistroy = true;
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
    },
    handleFormValidate() {
      let arr = this.rule;
      Object.keys(arr).forEach(key => {
        this.$refs["form"].validateField(key, error => {});
      });
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
    $route: {
      handler(val) {
        if (val.query.status && val.query.status != "0")
          this.$nextTick(() => this.getHistroy());
      },
      immediate: true
    },
    "$parent.$parent.$parent.mapStateView": {
      handler(val) {
        console.log("$parent.$parent.$parent.mapStateView");
      },
      immediate: true
    },
    "$parent.$parent.$parent.$parent.showDetail": {
      handler(val) {
        if (val) {
          this.init();
        }
      }
      // immediate: true
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
