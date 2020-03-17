<template>
  <div class="details d3">
    <template v-if="showDetailDrawer">
      <Drawer
        :zIndex="1009"
        width="512"
        :closable="false"
        v-model="showDetail"
        @on-close="closeDrawer"
      >
        <Tabs v-model="tabIndex" type="card">
          <TabPane name="t0" :index="1" label="图谱详情">
            <div class="card-action">
              <i-button v-if="mapStateView&&hasSubmit" @click="handleMapEditClick">编辑</i-button>
              <i-button v-if="!mapStateView" @click="handleMapCancelClick">取消</i-button>
              <i-button v-if="!mapStateView" type="primary" @click="handleMapSaveClick">保存</i-button>
            </div>
            <mapDetail
              ref="mapDetail"
              :villageInfo="villageInfo"
              :mapInfo="mapInfos"
              :labelWidth="labelWidth"
              @get-true="mapStateViewShow"
            ></mapDetail>
          </TabPane>
          <template v-if="showPersonInfoTab">
            <TabPane name="t1" :index="2" label="人员详情">
              <div class="card-action">
                <i-button
                  v-if="isCanEdit&&hasSubmit&& ((hasFunAuth(constantFunMap.FUN_Online_F_Map_Profile_Add_ID)&& $route.name=='CollectMarkerProfile')||(hasFunAuth(constantFunMap.FUN_Online_F_Map_Enter_Add_ID) && $route.name=='CollectMarkerExitEnter'))"
                  @click="handlePersonEditClick"
                >编辑</i-button>
              </div>
              <personInfoObj
                ref="personInfoObj"
                :idNumber="markerObjDetail.personInfo.idNumber"
                :mapType="mapType"
                :markerObjDetail="markerObjDetail"
              ></personInfoObj>
            </TabPane>
          </template>
        </Tabs>
      </Drawer>
    </template>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as apis from "@/api/collection/index.js";
import personInfoObj from "../../assembly/personObjectView"; //人员详情
import mapDetail from "./mapDetail"; //图谱详情
export default {
  components: {
    personInfoObj,
    mapDetail
  },
  props: {
    idNumber: {
      type: String,
      default: ""
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
    },
    mapType: {
      type: String,
      default: ""
    },
    markerObjDetail: {
      type: Object,
      default() {
        return null;
      }
    },
    hasSubmit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mapInfos: {}
    };
  },
  watch: {
    idNumber: {
      handler(val) {},
      immediate: true
    },
    villageInfo: {
      handler(val) {},
      immediate: true
    },
    mapInfo: {
      handler(val) {
        if (val) {
          this.mapInfos = val;
        }
      },
      immediate: true
    },
    mapType: {
      handler(val) {},
      immediate: true
    },
    markerObjDetail: {
      handler(val) {},
      immediate: true
    },
    hasSubmit: {
      handler(val) {},
      immediate: true
    }
  },
  data() {
    //这里存放数据
    return {
      showDetail: false, //
      showDetailDrawer: true, //
      isCanEdit: true, //人员编辑按钮
      mapStateView: true, //图谱编辑按钮
      tabIndex: "t1", //切换
      showPersonInfoTab: false,
      labelWidth: 130
    };
  },
  mounted() {},

  //方法集合
  methods: {
    // 取消
    handleMapCancelClick() {
      this.$refs["mapDetail"].cancelMapInfo();
    },
    // 子组件传值
    mapStateViewShow(data) {
      this.mapStateView = data;
    },
    // 编辑人员
    handlePersonEditClick() {
      this.showDetail = false;
      this.$parent.editDetailInfo(this.$refs["personInfoObj"].form);
    },
    // 编辑图谱信息
    handleMapEditClick() {
      this.$refs["mapDetail"].disable = false;
      this.mapStateView = false;
    },
    // 保存图谱信息
    handleMapSaveClick() {
      const that = this;
      this.showDetail = false;
      that.$refs["mapDetail"].saveMapInfo();
      that.$parent.overviewOfAtlas();
    },
    closeDrawer() {
      this.$emit("clear-id", "close");
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@import "../../assembly/css/graph.less";
</style>
