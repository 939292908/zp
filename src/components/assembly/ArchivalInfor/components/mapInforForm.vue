<!--
 * @Author: your name
 * @Date: 2019-10-22 09:59:27
 * @LastEditTime: 2019-11-15 13:19:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\project\map-web\src\components\assembly\ArchivalInfor\components\mapInforForm.vue
 -->
<template>
  <div class="form-objective-view">
    <div class="form-info">
      <div class="form-item">
        <div class="form-label">图谱名称：</div>
        <div class="form-content">{{form.mapName}}</div>
      </div>
      <div class="form-item" v-if="mapType!='8'&&mapType!='9'">
        <div class="form-label">图谱编号：</div>
        <div class="form-content">{{form.mapCode}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">图谱描述：</div>
        <Tooltip
          max-width="330"
          :content="form.mapDescription"
          theme="light"
          :class="{hiddenTooltip : form.mapDescription ==null}"
        >
          <div class="form-content map-info">{{form.mapDescription}}</div>
        </Tooltip>
      </div>
      <div class="form-item" v-if="mapType=='4'">
        <div class="form-label">案件编号：</div>
        <div class="form-content">{{form.caseCode}}</div>
      </div>
      <div class="form-item" v-if="mapType=='4'">
        <div class="form-label">案件类别：</div>
        <div class="form-content">{{form.caseType}}</div>
      </div>
      <div class="form-item" v-if="mapType=='4'">
        <div class="form-label" style="min-width:138px">三党两集团一组织：</div>
        <div class="form-content">{{form.caseBelongThreeOne}}</div>
      </div>
      <div class="form-item" v-if="mapType=='4'">
        <div class="form-label" style="min-width:138px">案件涉及专案情况：</div>
        <div class="form-content">{{form.caseProjectInfo}}</div>
      </div>

      <div class="form-item" v-if="mapType!='8'&&mapType!='9'">
        <div class="form-label" style="min-width:138px">工作对象身份证号：</div>
        <div class="form-content">{{form.coreIdNumber}}</div>
      </div>
      <div class="form-item" v-if="mapType!='8'&&mapType!='9'">
        <div class="form-label">工作对象姓名：</div>
        <div class="form-content">{{form.corePersonName}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">采集人：</div>
        <div class="form-content">{{form.collectPerson}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">归属部门：</div>
        <div class="form-content">{{form.belongDeptName}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">归属区划：</div>
        <div class="form-content">{{form.belongArea}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">创建时间：</div>
        <div class="form-content">{{form.createTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">更新时间：</div>
        <div class="form-content">{{form.updateTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apis from "@/api/mapJoin/index.js";
export default {
  name: "MapInfoForm",
  props: {
    mapId: {
      type: String,
      default: ""
    },
    mapType: {
      type: String,
      default: ""
    },
    mapInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      form: {
        mapType: "", //图谱类型
        mapName: "", //图谱名称
        mapCode: "", //图谱编号
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
        coreIdNumber: "", //工作对象身份证号
        createTime: "", //创建时间
        updateTime: "", //更新时间
        caseCode: "", //案件编号
        caseTypeValue: "", //案件类别
        caseProjectInfo: "", //案件涉及专案情况
        caseBelongThreeOneValue: "" //三党两集团一组织
      }
    };
  },
  methods: {
    getMapInfo() {
      let mapId = this.mapId;
      if (mapId) {
        apis.GET_MAP_INFO_ARCHIVES(mapId).then(res => {
          if (res.code == 200) {
            if (res.data != null) {
              this.form = res.data;
              // let userInfo = this.$store.state.userInfo;
              // this.form.collectPerson = userInfo.ruleName;
            }
          }
        });
      }
    }
  },
  watch: {
    mapId: {
      handler(val) {
        this.getMapInfo();
      },
      immediate: true
    },
    mapInfo: {
      handler(val) {
        console.log(this.mapType);
        this.form = val;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
@import "./form.less";
</style>
