<template>
  <div class="mapDetails">
    <Form ref="form" :model="form" :rules="rule" :label-width="labelWidth">
      <FormItem label="图谱名称" prop="mapName">
        <i-input v-if="!disable" v-model.trim="form.mapName"></i-input>
        <span v-else class="input-label">{{form.mapName}}</span>
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

      <FormItem label="采集人" prop="collectPerson">
        <span class="input-label">{{villageInfo.creater}}</span>
      </FormItem>
      <!-- 归属部门 -->
      <FormItem label="归属部门" prop="belongDeptDisplayName">
        <span class="input-label">{{villageInfo.belongDeptName}}</span>
      </FormItem>
      <!-- 归属区划 -->
      <FormItem label="归属区划" prop="belongAreaDisplayName">
        <span class="input-label">{{villageInfo.belongAreaName}}</span>
      </FormItem>
    </Form>
    <!-- 历史 -->
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
//例如：import 《组件名称》 from '《组件路径》';
import { OPTIONS_LIST } from "@/api/config.js";
import * as apis from "@/api/collection/index.js";
export default {
  components: {
    AuditHistory: () =>
      import("@/components/mapCollectionNext/components/assembly/auditHistory")
  },
  props: {
    labelWidth: {
      type: String | Number,
      default: 80
    },
    villageInfo: {
      type: Object,
      default() {
        return null;
      }
    },
    mapInfo: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    //这里存放数据
    return {
      showHistroy: false, // show 历史
      showHistroyModel: false,
      histroyData: {},
      lastHistroy: [],
      stateFontColor: {
        提交: "#19be6b",
        通过: "#19be6b",
        退回: "#ed4014",
        审核中: "#2d8cf0"
      },
      disable: true, //true:查看，false：可编辑
      form: {
        mapName: "",
        mapDescription: ""
      },
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
        ]
      }
    };
  },
  mounted() {},

  //方法集合
  methods: {
    // 取消编辑
    cancelMapInfo() {
      const that = this;
      that.disable = true;
      that.$emit("get-true", true);
      that.form.mapName = that.mapInfo.mapName;
      that.form.mapDescription = that.mapInfo.mapDescription;
    },
    // 保存图谱信息
    saveMapInfo() {
      const that = this;
      that.$refs["form"].validate(valid => {
        if (valid) {
          var params = {
            belongArea: that.mapInfo.belongArea,
            belongAreaCode: that.mapInfo.belongAreaCode,
            belongDeptId: that.mapInfo.belongDeptId,
            belongDeptName: that.mapInfo.belongDeptName,
            collectId: that.mapInfo.collectId,
            collectPerson: that.mapInfo.collectPerson,
            mapDescription: that.form.mapDescription,
            mapName: that.form.mapName,
            mapType: that.mapInfo.mapType
          };
          apis.PATCH_SAVE_MAP_INFO(params).then(res => {
            if (res.code == 200) {
              that.disable = true;
              that.$emit("get-true", true);
              that.$Message.success("保存成功！");
            }
          });
        } else {
          that.$Message.error("图谱必填项错误！");
        }
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
    // 查看历史明细
    handleHistory() {
      this.showHistroyModel = true;
    },
    // 历史 change
    changeShowHistroy(val) {
      this.showHistroyModel = val;
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
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.$nextTick(() => this.getHistroy());
      },
      immediate: true
    },
    villageInfo: {
      handler(val) {},
      immediate: true
    },
    mapInfo: {
      handler(val) {
        this.form = JSON.parse(JSON.stringify(val));
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.mapDetails {
  padding-top: 12px;
  height: calc(100% - 32px);
  overflow: auto;
}
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
.longLabel {
  position: relative;
  /deep/ label {
    width: 130px !important;
    position: absolute;
    left: -50px;
  }
}
/deep/textarea.ivu-input {
  font-size: 12px;
}
</style>
