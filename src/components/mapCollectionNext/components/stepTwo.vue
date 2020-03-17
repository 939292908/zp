<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 16:56:13
 * @LastEditTime: 2019-08-19 15:07:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="modal-content map-collect-work-objective">
    <div class="title">{{title}}
      <span class="notice-info">(<span class="red">*</span>为必填项)</span>
    </div>
    <div class="modal-content">
      <component ref="form" 
        :is="curComponent" 
        :collectId="collectId" 
        :isFirst="isFirst"
        :idNumber="idNumber" 
        :workObjectPersonIdNumber="workObjectPersonIdNumber"
        :relation="relation"></component>
    </div>
  </div>
</template>
<script>
import { mapMixin } from "../mixin/mapMixin";
// import FamilyWorkObjective from './family/formObjective'
// import ReligiousWorkObjective from './religious/formObjective'
// import CaseWorkObjective from './case/formObjective'
// import EntryExitWorkObjective from './entryExit/formObjective'
// import SocietyWorkObjective from './society/formObjective'
// import HajjWorkObjective from './hajj/formObjective'
export default {
  name: "StepTwo",
  mixins:[mapMixin],
  components: {
    // FamilyWorkObjective,
    // ReligiousWorkObjective,
    // CaseWorkObjective,
    // EntryExitWorkObjective,
    // SocietyWorkObjective,
    // HajjWorkObjective,
    FamilyWorkObjective: () => import("./assembly/family/formObjective"),
    HouseholdWorkObjective: () => import("./assembly/household/formObjective"),
    ReligiousWorkObjective: () => import("./assembly/religious/formObjective"),
    CaseWorkObjective: () => import("./assembly/case/formObjective"),
    EntryExitWorkObjective: () => import("./assembly/entryExit/formObjective"),
    EntryExitRelationFormObjective: () => import("./assembly/entryExitRelationMap/formObjective"),
    SocietyWorkObjective: () => import("./assembly/society/formObjective"),
    HajjWorkObjective: () => import("./assembly/hajj/formObjective")
  },
  props: {
    titleWork:{
      type: String,
      default: ""
    },
    curSelectTp: {
      type: String,
      default: ""
    },
    collectId:{
      type: String,
      default: ""
    },
    isFirst:{
      type: Boolean,
      default: true
    },
    workObjectPersonIdNumber:{
      type: String,
      default: ""
    },
    relation:{
      type:Object,
      default() {
        return null;
      }
    },
    idNumber:{
      type: String,
      default: ""
    },
  },
  computed: {
    curComponent() {
      let curSelectTp = this.$route.query.mapType;
      let cur = this.mapTypeList.find(x => x.id == curSelectTp);
      return cur ? cur.objectComponent : "";
    },
    title() {
      let curSelectTp = this.$route.query.mapType;
      let cur = this.mapTypeList.find(x => x.id == curSelectTp);
      return this.titleWork || (cur ? cur.objectTitle : "")
    }
  },
  watch:{
    collectId: {
      handler(val) {
      },
      immediate:true
    },
  }
};
</script>
<style lang="less" scoped>
.map-collect-work-objective {
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
  }
  .modal-content {
    height: calc(100% - 40px);
    padding: 15px;
    overflow: auto;
  }
}
.notice-info{
  font-size: 14px;
  .red{
    color: #ed4014;
  }
}
</style>

