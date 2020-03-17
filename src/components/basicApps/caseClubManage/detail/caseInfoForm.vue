<template>
  <Form ref="caseInfoModal" :model="caseInfoForm" :rules="rules" :label-width="120">
    <div class="form-box">
      <div class="panel-form">
        <FormItem label="案件线索编号" prop="no">
          <Input disabled v-model="caseInfoForm.no" placeholder="案件编号"></Input>
          <!-- <span v-show="canEdit">{{caseInfoForm.no}}</span> -->
        </FormItem>
        <FormItem label="案件线索名称" prop="name">
          <Input :disabled="canEdit" v-model="caseInfoForm.name" placeholder="请输入案件线索名称"></Input>
        </FormItem>
        <FormItem label="案件线索类别" prop="category">
          <Select
            :disabled="canEdit"
            filterable
            v-model="caseInfoForm.category"
            placeholder="请选择案件类别"
          >
            <Option
              v-for="(item,index) in optionList.categoryList"
              :value="item.value"
              :key="index"
            >{{item.displayName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="案件线索类型" prop="type">
          <Select :disabled="canEdit" filterable v-model="caseInfoForm.type" placeholder="请选择案件类型">
            <Option
              v-for="(item,index) in optionList.typeList"
              :value="item.value"
              :key="index"
            >{{item.displayName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="来源" prop="source">
          <Select
            :disabled="canEdit"
            filterable
            v-model="caseInfoForm.source"
            placeholder="请选择案件来源"
          >
            <Option
              v-for="(item,index) in optionList.sourceList"
              :value="item.value"
              :key="index"
            >{{item.displayName}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="panel-form">
        <FormItem label="立案时间" prop="caseTime">
          <DatePicker
            :disabled="canEdit"
            style="width:100%"
            type="date"
            placeholder="请选择立案时间"
            v-model="caseInfoForm.caseTime"
            @on-change="onStartTimeChange"
            :options="startTimeOption"
          ></DatePicker>
        </FormItem>
        <FormItem label="结案时间" prop="caseEndTime">
          <DatePicker
            :disabled="canEdit"
            style="width:100%"
            type="date"
            placeholder="请选择结案时间"
            v-model="caseInfoForm.caseEndTime"
            @on-change="onEndTimeChange"
            :options="endTimeOption"
          ></DatePicker>
        </FormItem>
        <FormItem label="案件线索状态" prop="state">
          <Select
            :disabled="canEdit"
            filterable
            v-model="caseInfoForm.state"
            placeholder="请选择案件线索状态"
          >
            <Option
              v-for="(item,index) in optionList.stateList"
              :value="item.value"
              :key="index"
            >{{item.displayName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="案（线）发现地" prop="caseAddressPath">
          <Cascader
            :disabled="canEdit"
            ref="caseAddress"
            change-on-select
            v-model="caseInfoForm.caseAddressPath"
            :data="optionList.proviceAddressList"
            :load-data="loadHukouData"
            @on-change="handleCaseAdressSelectChange"
            @on-visible-change="getVisibleChange"
          ></Cascader>
        </FormItem>
        <FormItem label="案（线）办理地" prop="caseHandleAddressPath">
          <Cascader
            :disabled="canEdit"
            change-on-select
            v-model="caseInfoForm.caseHandleAddressPath"
            :data="optionList.proviceAddressList"
            :load-data="loadHukouData"
            @on-change="handleCaseHandleAdressSelectChange"
            @on-visible-change="getVisibleChange"
          ></Cascader>
        </FormItem>
      </div>
    </div>
    <FormItem label="简要案情" prop="intro" style="width:80%;margin:0 auto;margin-bottom:20px;">
      <Input
        :disabled="canEdit"
        v-model="caseInfoForm.intro"
        type="textarea"
        :autosize="{minRows: 4,maxRows: 6}"
        placeholder="请输入简要案情"
      ></Input>
    </FormItem>
  </Form>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import * as tool from "@/tools/units.js";
export default {
  name: "caseInfoForm",
  props: {
    isCaseEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const caseHandleAddressValidator = (rule, value, callback) => {
      if (!this.caseHandleAddressRule) {
        callback(new Error("案（线）办理地不能为空！"));
      } else {
        callback();
      }
    };
    const caseAddressValidator = (rule, value, callback) => {
      if (!this.caseAddressRule) {
        callback(new Error("案（线）发现地不能为空！"));
      } else {
        callback();
      }
    };
    return {
      canEdit: this.isCaseEdit,
      caseInfoForm: {
        no: null, //案件线索编号
        name: null, //案件线索名称
        category: null, //案件线索类别
        type: null, //案件线索类型
        source: null, //来源
        intro: null, //简要案情
        caseTime: null, //立案时间
        caseEndTime: null, //结案时间
        state: null, //案件线索状态

        //案件发生地
        caseAddressPath: [], //案（线）发生地
        province: "",
        provinceCode: "",
        city: "",
        cityCode: "",
        county: "",
        countyCode: "",
        town: "",
        townCode: "",
        detailAddress: "",
        village: "",
        villageCode: "",
        addressCodeTierPath: "",
        addressTierPath: "",
        villageCodeDiaplayName: "",

        //案件办理地
        caseHandleAddressPath: [], //案（线）发生地
        proceProvince: "",
        proceProvinceCode: "",
        proceCity: "",
        proceCityCode: "",
        proceCounty: "",
        proceCountyCode: "",
        proceTown: "",
        proceTownCode: "",
        proceDetailAddress: "",
        proceVillage: "",
        proceVillageCode: "",
        proceAddressCodeTierPath: "",
        proceAddressTierPath: "",
        proceVillageCodeDiaplayName: ""
      },
      rules: {
        name: [
          { required: true, message: "案件线索名称不能为空！", trigger: "blur" }
        ],
        category: [
          {
            required: true,
            message: "案件线索类别不能为空！",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "案件线索类型不能为空！",
            trigger: "change"
          }
        ],
        source: [
          {
            required: true,
            message: "案件线索来源不能为空！",
            trigger: "change"
          }
        ],
        intro: [
          { required: true, message: "简要案情不能为空！", trigger: "blur" }
        ],
        caseTime: [
          {
            required: true,
            message: "立案时间不能为空！",
            trigger: "change",
            pattern: /.+/
          }
        ],
        caseAddressPath: [
          {
            required: true,
            validator: caseAddressValidator,
            trigger: "change",
            type: "array"
          }
        ],
        caseHandleAddressPath: [
          {
            required: true,
            validator: caseHandleAddressValidator,
            trigger: "change",
            type: "array"
          }
        ],
        state: [
          {
            required: true,
            message: "案件线索状态不能为空！",
            trigger: "change"
          }
        ]
      },
      optionList: {
        typeList: [], //案件类型
        categoryList: [], //案件类别
        sourceList: [], //案件来源
        stateList: [], //案件状态
        proviceAddressList: [] //案件地址
      },
      addressVisibleChange: false, // 级联选择器 地址弹窗显示状态
      startTimeOption: {},
      endTimeOption: {},
      beginForm: {},
      caseId: "",
      caseAddressRule: null,
      caseHandleAddressRule: null
    };
  },
  mounted() {
    this.getOptionList();
    this.onStartTimeChange(this.caseInfoForm.caseTime);
    this.onEndTimeChange(this.caseInfoForm.caseEndTime);
  },
  methods: {
    // 清空校验
    resetForm() {
      this.$refs["caseInfoModal"].resetFields();
      this.bindFormValue(this.caseId);
    },
    // 获取筛选条件字典项
    getOptionList() {
      //案件类别
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_CATEGORY,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_CATEGORY
        })
        .then(res => {
          this.optionList.categoryList = res;
        });
      //案件类型
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_TYPE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_TYPE
        })
        .then(res => {
          this.optionList.typeList = res;
        });
      //案件来源
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_SOURCE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_SOURCE
        })
        .then(res => {
          this.optionList.sourceList = res;
        });
      //案件状态
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.CASE_CLUE_STATE,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.CASE_CLUE_STATE
        })
        .then(res => {
          this.optionList.stateList = res;
        });
      //获取省的数据
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.BELONG_PROVICE,
          apiFun: comApis.GET_AREA_TREE_BY_CODE,
          validParams: true,
          params: "Root"
        })
        .then(res => {
          if (res) {
            // 把新疆的数据放在最前面
            let tmpArr = res.childAreaList.filter(x => {
              return x.code != "650000000000";
            });
            let tmpCodeArr = res.childAreaList.filter(x => {
              return x.code == "650000000000";
            });
            let tmp_arr = tmpCodeArr.concat(tmpArr);
            let arr = tmp_arr.map(x => {
              return {
                id: x.id,
                code: x.code,
                value: x.code,
                name: x.name,
                label: x.displayName,
                parentId: x.parentId,
                parentCode: x.parentCode,
                longitude: x.longitude,
                latitude: x.latitude,
                loading: false,
                children: []
              };
            });
            this.optionList.proviceAddressList = arr;
            let caseId = this.$route.query.caseId;
            this.caseId = caseId;
            if (caseId) {
              this.bindFormValue(caseId);
            }
          }
        });
    },
    // 保存提交
    handleSubmit() {
      var promise = new Promise((resolve, reject) => {
        this.$refs["caseInfoModal"].validate(valid => {
          if (valid) {
            this.save()
              .then(res => {
                resolve(res);
              })
              .catch(res => {
                reject(res);
              });
          } else {
            reject(false);
          }
        });
      });
      return promise;
    },
    save() {
      let form = this.settleForm();
      var promise = new Promise((resolve, reject) => {
        apis.POST_SAVE_CASE_INFO(form).then(res => {
          if (res.code == 200) {
            this.canEdit = true;
            this.caseInfoForm.no = res.data.no;
            this.caseId = res.data.id;
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
    },
    // 整理表单内容
    settleForm() {
      let form = this.caseInfoForm;
      form.caseTime = form.caseTime
        ? this.$moment(form.caseTime).format("YYYY-MM-DD")
        : null;
      form.caseEndTime = form.caseEndTime
        ? this.$moment(form.caseEndTime).format("YYYY-MM-DD")
        : null;
      return form;
    },
    // 绑定表单的值
    bindFormValue(caseId) {
      if (caseId) {
        apis.GET_LOOK_CASE_INFO(caseId).then(res => {
          if (res.code == 200) {
            let form = res.data;
            form.caseTime = form.caseTime ? new Date(form.caseTime) : null;
            form.caseEndTime = form.caseEndTime
              ? new Date(form.caseEndTime)
              : null;
            form.caseAddressPath = [
              form.provinceCode,
              form.cityCode,
              form.countyCode,
              form.townCode,
              form.villageCode
            ];
            form.caseHandleAddressPath = [
              form.proceProvinceCode,
              form.proceCityCode,
              form.proceCountyCode,
              form.proceTownCode,
              form.proceVillageCode
            ];
            this.caseAddressRule = tool.setAddressByCodeArr(
              form.caseAddressPath,
              this.optionList.proviceAddressList
            );
            this.caseHandleAddressRule = tool.setAddressByCodeArr(
              form.caseHandleAddressPath,
              this.optionList.proviceAddressList
            );

            this.caseInfoForm = form;
          }
        });
      }
    },
    // 级联选择器 加载下一级'户籍地址'
    loadHukouData(item, callback) {
      if (!this.addressVisibleChange) return; //弹窗关闭状态' 跳过loadData方法 (否则影响显示结果)
      tool.loadAddressData(item, callback);
    },
    // 选择案发地地址的事件
    handleCaseAdressSelectChange(value, selectedData) {
      this.caseAddressRule = value != 0;
      if (value.length == 1) {
        this.caseInfoForm.provinceCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.province =
          selectedData[selectedData.length - 1].label;
        this.caseInfoForm.cityCode = null;
        this.caseInfoForm.countyCode = null;
        this.caseInfoForm.townCode = null;
        this.caseInfoForm.villageCode = null;
      }
      if (value.length == 2) {
        this.caseInfoForm.cityCode = selectedData[selectedData.length - 1].code;
        this.caseInfoForm.city = selectedData[selectedData.length - 1].label;
        this.caseInfoForm.countyCode = null;
        this.caseInfoForm.townCode = null;
        this.caseInfoForm.villageCode = null;
      }
      if (value.length == 3) {
        this.caseInfoForm.countyCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.county = selectedData[selectedData.length - 1].label;
        this.caseInfoForm.townCode = null;
        this.caseInfoForm.villageCode = null;
      }
      if (value.length == 4) {
        this.caseInfoForm.townCode = selectedData[selectedData.length - 1].code;
        this.caseInfoForm.town = selectedData[selectedData.length - 1].label;
        this.caseInfoForm.villageCode = null;
      }
      if (value.length == 5 || value.length == 4) {
        this.caseInfoForm.villageCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.village = selectedData[selectedData.length - 1].label;
      }
      this.caseInfoForm.addressCodeTierPath = value.join("/");
      this.caseInfoForm.addressTierPath = selectedData
        .map(x => x.label)
        .join("/");
    },
    // 选择案线办理地的事件
    handleCaseHandleAdressSelectChange(value, selectedData) {
      this.caseHandleAddressRule = value != 0;
      if (value.length == 0) {
        this.caseAddress = {};
      }
      if (value.length == 1) {
        this.caseInfoForm.proceProvinceCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.proceProvince =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 2) {
        this.caseInfoForm.proceCityCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.proceCity =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 3) {
        this.caseInfoForm.proceCountyCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.proceCounty =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 4) {
        this.caseInfoForm.proceTownCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.proceTown =
          selectedData[selectedData.length - 1].label;
      }
      if (value.length == 5 || value.length == 4) {
        this.caseInfoForm.proceVillageCode =
          selectedData[selectedData.length - 1].code;
        this.caseInfoForm.proceVillage =
          selectedData[selectedData.length - 1].label;
      }
      this.caseInfoForm.proceAddressCodeTierPath = value.join("/");
      this.caseInfoForm.proceAddressTierPath = selectedData
        .map(x => x.label)
        .join("/");
    },
    // 获取地址弹窗状态
    getVisibleChange(value) {
      this.addressVisibleChange = value;
    },
    // 起始时间变化
    onStartTimeChange(caseTime, type) {
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(caseTime) - 8.64e7 || endTime > Date.now();
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(caseEndTime, type) {
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(caseEndTime) || startTime > Date.now();
        }
      };
    }
  },
  watch: {
    isCaseEdit: {
      handler(val) {
        this.canEdit = val;
      },
      immediate: true
    },
    "$route.query.status": {
      handler(val) {
        if (val) {
          if (val == 0) {
            this.canEdit = false;
          }
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.form-box {
  display: flex;
  justify-content: space-around;
  .panel-form {
    width: 30%;
  }
}
/deep/.ivu-input[disabled],
fieldset[disabled] .ivu-input,
/deep/.ivu-select-disabled .ivu-select-selection,
/deep/.ivu-select-input[disabled] {
  color: #666;
}
/deep/.ivu-select-input[disabled][placeholder^="请选择"] {
  -webkit-text-fill-color: #ccc;
}
/deep/.ivu-select-input[disabled] {
  -webkit-text-fill-color: #666;
}
</style>
