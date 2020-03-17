<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 16:56:13
 * @LastEditTime: 2019-10-16 21:20:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="modal-content map-collect-add">
    <div class="header">
      <div class="title">
        {{title}}
        <span class="notice-info">
          (
          <span class="red">*</span>为必填项)
        </span>
      </div>
    </div>
    <div class="content">
      <!-- 方式一 -->
      <div class="left modal-content-item">
        <div class="title">
          <span>方式一:</span>手动创建
        </div>
        <div class="box">
          <component ref="form" 
          :is="curComponent" 
          :collectId="collectId" 
          :isAdd="isAdd" 
          :isExcel="$parent.isExcel"
          :stepOneIsSuccess="stepOneIsSuccess"
          :stepTwoIsSuccess="stepTwoIsSuccess"
          ></component>
        </div>
      </div>
      <!-- 方式二 -->
      <div class="right modal-content-item">
        <div class="title">
          <span>方式二:</span>上传采集表创建
          <div class="reset-btn" v-if="mapType && excelStatus!=1 && isShowStepTwo" @click="resetUpload">重置</div>
        </div>
        <!-- 临时，敬请期待 -->
        <div v-if="!mapType || !isShowStepTwo" class="msg-card">功能待完善，敬请期待！</div>
        <div v-else class="box box-two">
          <!-- 第一步 -->
          <upload-file
            v-model="model"
            ref="fileOne"
            id="fileOne"
            :uploadExcelFn="newUploadExcel"
            :success="stepOneSuccessFn"
            :setIsExcel="getStepOneIsExcel"
            :mapType="mapType"
            :downloadUrl="downloadUrl"
            step="第一步"
            :uploadTitle="'上传'+mapName"
            :excelStatus="excelStatus"
            @setLoading="setLoading"
            class="upload-wrapper-file"
          ></upload-file>

          <!-- 第二步 -->
          <upload-file
            v-model="model"
            v-if="stepOneIsSuccess"
            ref="fileTwo"
            id="fileTwo"
            :uploadExcelFn="newUploadExcel"
            :success="stepTwoSuccessFn"
            mapType="T000"
            :collectId="ExcelCollectId"
            step="第二步"
            uploadTitle="上传人员基础信息表"
            :uploadPeople="uploadPeople"
            @setLoading="setLoading"
            class="upload-wrapper-file"
          ></upload-file>

          <!-- 第三步 -->
          <upload-file
            v-model="model"
            v-if="stepTwoIsSuccess && mapTypeThree=='T010'"
            ref="filethree"
            id="filethree"
            :uploadExcelFn="newUploadExcel"
            :success="stepThreeSuccessFn"
            :mapType="mapTypeThree"
            :collectId="ExcelCollectId"
            step="第三步"
            :uploadTitle="uploadTitleThree"
            @setLoading="setLoading"
            class="upload-wrapper-file"
          ></upload-file>
        </div>
      </div>
      <!-- 或 -->
      <div class="center">
        <span>或</span>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer-action">
      <!-- 在Loading，或第二步未完成且是Excel模式采集时，禁用 -->
      <Button
        type="primary"
        :disabled="saveLoading || (!stepTwoIsSuccess && $parent.isExcel)"
        @click.native="handleNext"
      >下一步</Button>
      <Button @click.native="handlePrev">取消并返回</Button>
    </div>
    <loading color="white" v-model="archivesLoadingShow"></loading>
  </div>
</template>
<script>
import {
  newUploadExcel,
  GET_TYPE_ID_AND_URL_BY_MAP_TYPE
} from "@/api/collection/index.js";
import { mapMixin } from "../mixin/mapMixin";
import Loading from "@/components/assembly/Loading";
import * as comApis from "@/api/common.js";

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    curSelectTp: {
      type: String,
      default: ""
    },
    // 是新增还是编辑
    isAdd: {
      type: Boolean,
      default: true
    },
    collectId: {
      type: String,
      default: ""
    },
    isFirst: {
      type: Boolean,
      default: true
    },
    workObjectPersonIdNumber: {
      type: String,
      default: ""
    },
    relation: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  mixins: [mapMixin],
  name: "StepOne",
  components: {
    Loading,
    FamilyFormTpType: () => import("./assembly/family/formTpType"),
    HouseholdFormTpType: () => import("./assembly/household/formTpType"),
    ReligiousFormTpType: () => import("./assembly/religious/formTpType"),
    CaseFormTpType: () => import("./assembly/case/formTpType"),
    EntryExitFormTpType: () => import("./assembly/entryExit/formTpType"),
    EntryExitRelationFormTpType: () => import("./assembly/entryExitRelationMap/formTpType"),
    SocietyFormTpType: () => import("./assembly/society/formTpType"),
    HajjFormTpType: () => import("./assembly/hajj/formTpType"),
    distributionMapFormTpType: () =>
      import("./assembly/distributionMap/formTpType"),
    // entryExitMapFormTpType: () => import("./entryExitMap/formTpType"),
    UploadFile: () => import("./assembly/uploadFile")
  },
  created() {
    // 获取初始化资源
    this.initData();
  },
  computed: {
    curComponent() {
      let curSelectTp = this.curSelectTp || this.$route.query.mapType;
      let cur = this.mapTypeList.find(x => x.id == curSelectTp);
      return cur ? cur.mapComponent : "";
    },
    title() {
      return "新加" + this.mapName;
    },
    // 是否展示第二步
    isShowStepTwo() {
      let type = this.$route.query.mapType;
      return this.showStepTwoTypeArr.some(item => item == type); // type 是否在 arr 中
    }
  },
  data() {
    return {
      model: false,
      saveLoading: false,
      newUploadExcel, // 上传Excel 接口
      stepOneIsSuccess: false, // 第一步是否成功
      stepTwoIsSuccess: false, // 第二步是否成功
      mapType: "", // 图谱类型id: "T002"
      mapTypeThree: "", // 第三步图谱类型id
      uploadTitleThree: "", // 第三步title
      downloadUrl: "", // 下载模板 地址
      ExcelCollectId: "", // 第一步获取的collectId （第二步上传使用）
      uploadPeople: 0, // 第二步上传成功人数 (取第一步失败人数)
      excelStatus: this.$route.query.excelStatus, // excel采集状态
      archivesLoadingShow: false, // Loading
      mapName: "", // 图谱名称
      showStepTwoTypeArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 可以批量采集的 图谱type
    };
  },
  methods: {
    // 下一步
    handleNext() {
      this.saveLoading = true;
      this.$emit("on-next", this.saveLoading);
    },
    // 上一步
    handlePrev() {
      this.$emit("on-prev");
    },
    // 第一步 上传成功回调
    stepOneSuccessFn(res, isPass) {
      // 如果没有失败人员，（那么第二步直接算成功，放开下一步按钮）
      if (isPass) this.stepTwoIsSuccess = true;
      // 1.成功标记
      this.stepOneIsSuccess = true;
      // 2.将结果赋给表单，供修改
      // 老表单
      let formData = this.$refs.form.form;
      // 需更新
      let data = res.data.onlineMapInfo;
      let newFormData = {};
        // 公共
      newFormData.mapType = this.$route.query.mapType; //图谱类型
      newFormData.mapName = data.mapName; //图谱名称
      newFormData.collectId = data.collectID; //采集编号
      newFormData.mapDescription = data.mapDescription; //图谱描述
      newFormData.collectPerson = data.collectPerson; //采集人姓名
        // 案件
      if (data.caseCode) newFormData.caseCode = data.caseCode; //案件编号
      if (data.caseTypeValue) newFormData.caseTypeValue = data.caseTypeValue; //案件类别
      if (data.caseBelongThreeOneValue) newFormData.caseBelongThreeOneValue = data.caseBelongThreeOneValue; //三党两集团一组织
      if (data.caseProjectInfo) newFormData.caseProjectInfo = data.caseProjectInfo; //案件情况
        // 分布图
      if (data.area) newFormData.belongAreaCode = data.area.villageCode; //分布区划 code
      if (data.area) newFormData.belongAreaDisplayName = data.area.addressTierPath; //分布图隶属村 文字
        // 朝觐
      if (data.pilgrimageStartTime) newFormData.pilgrimageStartTime = data.pilgrimageStartTime; //朝觐开始时间
      if (data.pilgrimageEndTime) newFormData.pilgrimageEndTime = data.pilgrimageEndTime; //朝觐结束时间
      if (data.intermediaryTime) newFormData.pilgrimageIntermediaryTime = data.intermediaryTime; //中介时间
      if (data.pilgrimageType) newFormData.pilgrimageType = data.pilgrimageType; //朝觐类型
      if (data.pilgrimageTypeValue) newFormData.pilgrimageTypeValue = data.pilgrimageTypeValue; //朝觐类型value

      // 合并表单
      this.$refs.form.form = { ...formData, ...newFormData };
      // 校验
      this.$nextTick(() => {
        this.$refs.form.handleFormValidate && this.$refs.form.handleFormValidate();
      });
      // 3.保存collectId (第二步上传使用)
      this.ExcelCollectId = data.collectID;
      // 4.保存失败人数（第二步成功时展示）
      this.uploadPeople = res.data.idNumberList.length;
    },
    // 第二步 上传成功回调
    stepTwoSuccessFn(res, isPass) {
      //1.成功标记
      this.stepTwoIsSuccess = true;
    },
    // 第三步 上传成功回调
    stepThreeSuccessFn(res, isPass) {
      // alert('第三步上传成功')
    },
    // 初始化数据
    initData() {
      this.getMapNameById();
      this.getTypeIdAndUrlById();
    },
    // 根据id获取图谱配置项
    getMapNameById () {
      comApis.GET_MAP_CONFIG_BY_MAP_TYPE(this.$route.query.mapType)
      .then(res => {
        if (res.code == 200) {
          this.mapName = res.data.name;
        }
      })
    },
    // 获取TypeID 和 下载模板地址
    getTypeIdAndUrlById() {
      GET_TYPE_ID_AND_URL_BY_MAP_TYPE({ mapType: this.$route.query.mapType })
      .then(res => {
        if (res.code == 200) {
          // 类型 id
          if (res.data.taskList.length > 1) {
            // this.mapType = res.data.taskList.find(
            //   item => item.mapTypeId == this.$route.query.mapType
            // ).id;
            // 第一步mapType
            this.mapType = res.data.taskList[0].id;
            // 第三步mapType,title
            console.log(res);
            this.mapTypeThree =  res.data.taskList[1] ? res.data.taskList[1].id : "";
            this.uploadTitleThree =  res.data.taskList[1] ? res.data.taskList[1].taskName : "";
            
          }
          // 下载地址
          if (res.data.templateList.length > 0) {
            this.downloadUrl = this.$config.fileDownloadPath + res.data.templateList[0].url;
          }
        }
      })
    },
    // 设置父级IsExcel采集状态
    getStepOneIsExcel(type) {
      this.$parent.isExcel = type; // 状态传递
    },
    // 设置Loading
    setLoading(type) {
      this.archivesLoadingShow = type;
    },
    // 重置
    resetUpload() {
      this.$refs.form.handleReset(); // 表单
      this.$parent.isExcel = false; // 用Excel采集
      this.stepOneIsSuccess = false; // 第一步
      this.stepTwoIsSuccess = false; // 第二步
      this.$refs.fileOne && this.$refs.fileOne.resetUpload(); // 组件重置
      this.$refs.fileTwo && this.$refs.fileTwo.resetUpload(); // 组件重置
    }
  },
  watch: {
    collectId: {
      handler(val) {},
      immediate: true
    },
    value: {
      handler(val) {
        this.model = val;
      }
    },
    isAdd: {
      handler(val) {},
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.map-collect-add {
  position: relative;
  display: flex;
  flex-direction: column;
  .modal-content {
    height: 100%;
  }
  .modal-content-item {
    flex: 1;
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      flex: 0 0 30px;
      padding-left: 30px;
      font-weight: 700;
      margin-bottom: 8px;
      span {
        font-size: 14px;
        margin-right: 20px;
        color: #aaaaaa;
      }
    }
    .box {
      // flex: auto;
      // padding-left: 30px;
      height: 100%;
      // height: calc(100% - 135px);
      overflow: auto;
      padding-left: 50px;
      padding-right: 30px;
      // &::-webkit-scrollbar {
      //   display:none
      // }
    }
    .box-two {
      padding-right: 0px;
    }
    /deep/ .footer {
      flex: 0 0 38px;
      text-align: right;
      button {
        margin: 0 8px;
      }
    }
  }
  .left {
    padding-right: 20px;
    .box {
      width: calc(90% - 30px);
      margin-left: 40px;
      padding-top: 20px;
    }
  }
  .right {
    padding-left: 20px;
    border-left: 1px solid rgba(227, 227, 227, 1);
    position: relative;
    .box {
      width: calc(100% - 86px);
      margin-left: 60px;
    }
  }
  .center {
    position: absolute;
    top: 30%;
    left: 50%;
    border: 1px solid #ddd;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    margin-left: -16px;
    background: #fff;
  }
  .content {
    display: flex;
    width: 100%;
    height: calc(100% - 108px);
    flex: auto;
    padding: 0 16px;
  }
  /deep/ .header {
    flex: 0 0 48px;
    text-align: left;
    padding: 6px 20px;
    border-bottom: 1px solid rgba(224, 227, 230, 1);
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: bold;
    button {
      margin: 0 4px;
      min-width: 80px;
    }
  }
  /deep/ .footer-action {
    flex: 0 0 60px;
    text-align: right;
    padding: 6px 20px;
    border-top: 1px solid rgba(224, 227, 230, 1);
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 56px;
    button {
      margin: 0 4px;
      min-width: 80px;
    }
  }
}
/deep/ .upload-wrapper-file {
  background: #ffffff;
  color: #b3b3b3;
  .upload-file-box {
    margin: 0px;
    background: rgb(250, 250, 250);
  }
}
.down-button-icon {
  margin-left: 10px;
  font-size: 16px;
  color: #227547;
}
.notice-info {
  font-size: 14px;
  .red {
    color: #ed4014;
  }
}
.msg-card {
  text-align: center;
  position: absolute;
  top: 45%;
  width: 100%;
  font-size: 16px;
}
.reset-btn {
  float: right;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #dcdee2;
  line-height: 1.5;
  padding: 5px 15px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, border 0.2s linear;
  margin-right: 44px;
  &:hover {
    color: #57a3f3;
    border-color: #57a3f3;
  }
}
</style>
