<template>
  <div class="info">
    <div class="panel-title">
      个人信息
      <span class="notice-info">
        （
        <span class="red">*</span>为必填项）
      </span>
    </div>
    <Form class="form-panel" ref="form" :model="form" :rules="personInfoRule" :label-width="100">
      <div class="panel-form">
        <FormItem label="身份证号" prop="idNumber" class="lean">
          <div class="card-num-group">
            <i-input
              class="card-num"
              :disabled="tabIndex == 2"
              v-model="form.idNumber"
              @on-blur="handleGetPersonInfoByIdNumber"
              @keyup.enter="handleGetPersonInfoByIdNumber"
            ></i-input>
          </div>
        </FormItem>
        <FormItem label="姓名" prop="name" class="lean">
          <i-input v-model="form.name" :disabled="isPersonInfoEdit"></i-input>
        </FormItem>
        <FormItem label="照片" prop="picUrl">
          <div class="upload-avator-wrapper">
            <label class="upload-avator">
              <img v-if="imgSrc" :src="imgSrc" alt class="picture" />
              <Icon v-if="!imgSrc" type="ios-image" size="30" />
              <input
                ref="input"
                id="file"
                type="file"
                class="upload-image-file"
                name="file"
                :disabled="isPersonInfoEdit"
                @change="handleChange($event)"
              />
            </label>
            <div class="upload-action">
              <Button
                size="small"
                class="upload-avator-button"
                :disabled="isPersonInfoEdit"
                @click.native="handleTriggerFileEvent"
              >
                上传
                <Icon class="upload-avator-button-icon" type="md-cloud-upload" />
              </Button>
            </div>
          </div>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="性别" prop="genderValue">
              <Select v-model="form.genderValue" disabled>
                <Option
                  :key="index"
                  v-for="(item,index) in optionList.genderList"
                  :value="item.value"
                >{{ item.displayName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem class="nationalityForm" label="民族" prop="nationalityValue">
              <Select v-model="form.nationalityValue" filterable :disabled="isPersonInfoEdit">
                <Option
                  :disabled="isPersonInfoEdit"
                  :key="index"
                  v-for="(item,index) in optionList.nationalityList"
                  :value="item.value"
                >{{ item.displayName }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="标签" prop="personTagList" class="personTags">
          <Select
            v-model="form.personTagList"
            :disabled="isPersonInfoEdit"
            multiple
            filterable
            placeholder="请选择标签(支持多选)"
          >
            <Option
              :title="item.displayName"
              v-for="(item,index) in optionList.personTagList"
              :value="item.value"
              :key="index"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="人员状态" prop="personStateList">
          <Cascader
            :disabled="isPersonInfoEdit"
            ref="personState"
            :change-on-select="changeOnSelect"
            v-model="form.personStateList"
            :data="optionList.personStateList"
            :load-data="loadData"
            @on-change="handleStateChange"
            @on-visible-change="handleStateClick"
          ></Cascader>
        </FormItem>
        <FormItem label="五位一体属性" prop="fiveOnePropertyList">
          <Select
            :disabled="isPersonInfoEdit"
            v-model="form.fiveOnePropertyList"
            multiple
            filterable
            placeholder="请选择五位一体属性(支持多选)"
          >
            <Option
              v-for="(item,index) in optionList.fiveOnePropertyList"
              :value="item.value"
              :key="index"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="人员简介" prop="intro">
          <i-input
            :disabled="isPersonInfoEdit"
            v-model.trim="form.intro"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 3}"
            placeholder="请输入人员简介"
          ></i-input>
        </FormItem>
        <FormItem label="政治面貌" prop="politicsStatusValue">
          <Select :disabled="isPersonInfoEdit" v-model="form.politicsStatusValue">
            <Option
              v-for="(item,index) in optionList.politicsStatusList"
              :value="item.value"
              :key="index"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="职业" prop="professionValue">
          <Select :disabled="isPersonInfoEdit" v-model="form.professionValue" filterable>
            <Option
              v-for="(item,index) in optionList.professionList"
              :value="item.value"
              :key="index"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="panel-form">
        <Row>
          <Col span="24">
            <FormItem label="户籍地" prop="hukouAddressPath">
              <Cascader
                :transfer="true"
                :disabled="isPersonInfoEdit"
                ref="hukouAdress"
                v-model="form.hukouAddressPath"
                :data="optionList.proviceAddressList"
                :load-data="loadHukouData"
                @on-change="handleHukouAdressSelectChange"
              ></Cascader>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="hukoudetailAddress">
              <i-input
                :disabled="isPersonInfoEdit"
                v-model="form.hukoudetailAddress"
                placeholder="请输入详细地址"
              ></i-input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="现住址" prop="currentAddressPath">
              <Cascader
                :transfer="true"
                :disabled="isPersonInfoEdit"
                ref="currentAdress"
                v-model="form.currentAddressPath"
                :data="optionList.proviceAddressList"
                :load-data="loadHukouData"
                @on-change="handleCurAdressSelectChange"
              ></Cascader>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="currentdetailAddress">
              <i-input
                :disabled="isPersonInfoEdit"
                v-model="form.currentdetailAddress"
                placeholder="请输入详细地址"
              ></i-input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="服务场所" prop="servicePlace">
          <i-input :disabled="isPersonInfoEdit" v-model="form.servicePlace"></i-input>
        </FormItem>
        <div class="around"></div>
        <FormItem label="银行卡" prop="socialBankCard">
          <i-input :disabled="isPersonInfoEdit" v-model="form.socialBankCard"></i-input>
        </FormItem>
        <FormItem label="车辆" prop="socialCar">
          <i-input :disabled="isPersonInfoEdit" v-model="form.socialCar"></i-input>
        </FormItem>
        <FormItem label="电话" prop="socialPhone">
          <i-input :disabled="isPersonInfoEdit" v-model="form.socialPhone"></i-input>
        </FormItem>
        <FormItem label="QQ号码" prop="socialQq">
          <i-input :disabled="isPersonInfoEdit" v-model="form.socialQq"></i-input>
        </FormItem>
        <FormItem label="微信号码" prop="socialWechat">
          <i-input :disabled="isPersonInfoEdit" v-model="form.socialWechat"></i-input>
        </FormItem>
      </div>

      <div class></div>
    </Form>
    <div class="panel-title">
      清真寺任职信息
      <span class="notice-info">
        （
        <span class="red">*</span>为必填项）
      </span>
    </div>
    <Form
      class="form-panel"
      ref="partyBranchInfo"
      :model="partyBranch"
      :rules="partyBranchInfoRule"
      :label-width="100"
    >
      <div class="panel-form">
        <FormItem label="职位" prop="positionValue">
          <Select
            :disabled="isPersonInfoEdit"
            v-model="partyBranch.positionValue"
            filterable
            placement="top"
          >
            <Option
              v-for="(item,index) in optionList.positionMosqueList"
              :value="item.value"
              :key="index"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="任职时间" prop="workYear">
          <Row>
            <Col span="9">
              <Select
                v-model="partyBranch.workYear"
                style="width:90%"
                placeholder="年份"
                placement="top"
                clearable
                filterable
                :disabled="isPersonInfoEdit"
                @on-change="handleStartYear"
                @on-clear="handleStartYear"
              >
                <Option
                  v-for="item in startYearList"
                  :value="item"
                  :key="item"
                  placeholder="年份"
                  clearable
                >{{ item }}年</Option>
              </Select>
            </Col>
            <Col span="9">
              <Select
                v-model="partyBranch.workMouth"
                style="width:90%"
                placeholder="月份(选填)"
                placement="top"
                clearable
                filterable
                :disabled="isPersonInfoEdit"
              >
                <Option
                  v-for="item in 12"
                  :value="item"
                  :key="item"
                  placeholder="月份(选填)"
                  clearable
                >{{ item }}月</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
      </div>
      <div class="panel-form">
        <FormItem label="分管工作" prop="work">
          <i-input :disabled="isPersonInfoEdit" v-model.trim="partyBranch.work"></i-input>
        </FormItem>
        <FormItem label="离任时间" prop="departureYear">
          <Row>
            <Col span="9">
              <Select
                v-model="partyBranch.departureYear"
                style="width:90%"
                placeholder="年份"
                placement="top"
                clearable
                filterable
                :disabled="partyBranch.single||isPersonInfoEdit"
                @on-change="handleEndYear"
                @on-clear="handleEndYear"
              >
                <Option
                  v-for="item in endYearList"
                  :value="item"
                  :key="item"
                  placeholder="年份"
                  clearable
                >{{ item }}年</Option>
              </Select>
            </Col>
            <Col span="9">
              <Select
                v-model="partyBranch.departureMouth"
                style="width:90%"
                placeholder="月份(选填)"
                placement="top"
                clearable
                filterable
                :disabled="partyBranch.single||isPersonInfoEdit"
              >
                <Option
                  v-for="item in 12"
                  :value="item"
                  :key="item"
                  placeholder="月份(选填)"
                  clearable
                >{{ item }}月</Option>
              </Select>
            </Col>
            <Col span="6">
              <Checkbox
                v-model="partyBranch.single"
                :disabled="partyBranch.departureYear!=null||partyBranch.departureMouth!=null||isPersonInfoEdit"
                @on-change="singleChange"
                style="width:100%"
              >在任</Checkbox>
            </Col>
          </Row>
        </FormItem>
      </div>
    </Form>
    <div class="btnGrounp">
      <Button type="primary" v-if="tabIndex==1" @click="saveAndClose(1)">保存并关闭</Button>
      <Button v-if="tabIndex==2" @click="closeView(2)">关闭</Button>
      <Button type="primary" v-if="tabIndex==2&&!isPersonInfoEdit" @click="saveAndClose(2)">保存</Button>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as comApis from "@/api/common.js";

import * as apis from "@/api/collection/index.js";
import * as tool from "../../../../tools/units.js";
export default {
  components: {},
  props: {
    tabIndex: {
      type: Number,
      default: 1
    },
    optionList: {
      type: Object,
      default() {
        return null;
      }
    },
    agencyId: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
    /* editState: {
      type: Boolean,
      default: false
    } */
  },
  watch: {
    tabIndex: {
      handler(val) {
        if (val == 2) {
          if (this.$parent.$parent.editState) {
            this.isPersonInfoEdit = false;
          } else {
            this.isPersonInfoEdit = true;
          }
        } else if (val == 1) {
          this.isPersonInfoEdit = false;
        }
      },
      immediate: true
    },
    optionList: {
      handler(val) {},
      immediate: true,
      deep: true
    },
    agencyId: {
      handler(val) {},
      immediate: true
    },
    id: {
      handler(val) {
        if (this.tabIndex == 2) {
          this.searchInfo(val);
        }
      },
      immediate: true
    }
    /* editState: {
      handler(val) {},
      immediate: true
    } */
  },
  data() {
    //这里存放数据
    const endTimeValidate = (rule, value, callback) => {
      if (this.partyBranch.single) {
        callback();
      } else {
        if (!value) {
          callback(new Error("离职年份不能为空"));
        } else {
          callback();
        }
      }
    };
    const startTimeValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("任职年份不能为空"));
      } else {
        callback();
      }
    };
    return {
      personInfoRule: {
        idNumber: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          },
          {
            required: true,
            pattern: this.$config.idNumberVerify,
            message: "身份证号格式错误",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[\u4E00-\u9FA5\·A-Za-z]+$/,
            message: "姓名中除了“·”、字母、汉字，不能出现其他特殊符号",
            trigger: "blur"
          }
        ],
        personStateList: [
          {
            required: true,
            type: "array",
            message: "人员状态不能为空",
            trigger: "change"
          }
        ],
        intro: [
          {
            required: true,
            message: "人员简介不能为空",
            trigger: "blur"
          }
        ],
        hukouAddressPath: [
          {
            required: true,
            type: "array",
            message: "户籍地不能为空",
            trigger: "change"
          }
        ],
        hukoudetailAddress: [
          {
            required: true,
            message: "户籍地详细地址不能为空",
            trigger: "blur"
          }
        ],
        nationalityValue: [
          {
            required: true,
            message: "民族不能为空",
            trigger: "change"
          }
        ]
      },
      partyBranchInfoRule: {
        positionValue: [
          {
            required: true,
            message: "职位不能为空",
            trigger: "change"
          }
        ],
        work: [
          {
            required: true,
            message: "分管工作不能为空",
            trigger: "blur"
          }
        ],
        workYear: [
          {
            required: true,
            validator: startTimeValidate,
            trigger: "change"
          }
        ],
        departureYear: [
          {
            required: true,
            validator: endTimeValidate,
            trigger: "change"
          }
        ]
      },
      imgSrc: "",
      isPersonInfoEdit: false, //禁止编辑

      changeOnSelect: false,
      form: {
        fiveOnePropertyList: [],
        fiveOnePropertyValue: "",
        fiveOneProperty: "", //五位一体显示值
        gender: "",
        genderValue: "0",
        idNumber: "", //身份证
        name: "", //姓名
        nationality: "", //民族
        nationalityValue: "",
        intro: "", //人员简介
        state: "", //人员状态
        stateValue: "", //人员状态值
        stateDetail: "",
        stateDetailValue: "",
        personStateList: [], //人员状态
        personTagId: "",
        personTag: "",
        personTagList: [], //标签
        picUrl: "", //图片地址
        politicsStatus: "", //政治面貌
        politicsStatusValue: "",
        profession: "", //职业
        professionValue: "",
        servicePlace: "", //服务场所
        socialBankCard: "", //社会信息-银行卡
        socialQq: "", //社会信息-qq号码
        socialCar: "", //社会信息-车辆
        socialWechat: "", //社会信息-微信号码
        socialPhone: "", //社会信息-电话
        currentvillageCodeDiaplayName: "",
        currentdetailAddress: "",
        hukouvillageCodeDiaplayName: "",
        hukoudetailAddress: "",
        hukouAddressPath: [],
        currentAddressPath: [],
        hukouAddress: {},
        currentAddress: {}
      }, //基础信息
      partyBranch: {
        position: "", //职业
        positionValue: "",
        work: "",
        workYear: null,
        departureYear: null,
        workMouth: null,
        departureMouth: null,
        single: false //在任
      }, //详细信息

      hukouAddress: {
        //户籍地址
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
        villageCodeDiaplayName: ""
      },
      currentAddress: {
        //现住址
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
        villageCodeDiaplayName: ""
      },
      maxYear: new Date().getFullYear(),
      minYear: 1899
    };
  },
  mounted() {
    // console.log(this.optionList);
  },
  computed: {
    startYearList() {
      let arr = [];
      for (let i = this.maxYear; i > 1899; i--) {
        arr.push(i);
      }
      return arr;
    },
    endYearList() {
      let arr = [];
      let year = new Date().getFullYear();
      for (let i = new Date().getFullYear(); i > this.minYear; i--) {
        arr.push(i);
      }
      return arr;
    }
  },
  //方法集合
  methods: {
    handleStartYear() {
      if (this.partyBranch.workYear == undefined) {
        this.minYear = 1899;
      } else {
        this.minYear = this.partyBranch.workYear - 1;
      }
    },
    handleEndYear() {
      if (this.partyBranch.departureYear == undefined) {
        this.maxYear = new Date().getFullYear();
      } else {
        this.maxYear = this.partyBranch.departureYear;
      }
    },
    /* handlerClearEndYear(){
      this.maxYear = this.partyBranch.departureYear;
    }, */
    searchInfo(id) {
      const that = this;
      apis.partyInfoView(id).then(res => {
        if (res.code == 200) {
          that.alonePartyInfo(res.data);
          that.partyBranchInfo(res.data);
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    partyBranchInfo(form) {
      this.partyBranch.position = form.position; //职业
      this.partyBranch.positionValue = form.positionValue;
      this.partyBranch.work = form.work;
      this.partyBranch.workYear = form.workStartTime.substring(0, 4)
        ? parseInt(form.workStartTime.substring(0, 4))
        : null;
      this.partyBranch.workMouth = form.workStartTime.substring(4, 6)
        ? parseInt(form.workStartTime.substring(4, 6))
        : null;
      if (form.workEndTime == "") {
        this.partyBranch.single = true;
      } else {
        this.partyBranch.single = false;
        this.partyBranch.departureYear = form.workEndTime.substring(0, 4)
          ? parseInt(form.workEndTime.substring(0, 4))
          : null;
        this.partyBranch.departureMouth = form.workEndTime.substring(4, 6)
          ? parseInt(form.workEndTime.substring(4, 6))
          : null;
      }
      this.$nextTick(() => {
        this.handleStartYear();
        this.handleEndYear();
      });
    },
    alonePartyInfo(form) {
      let data = this.form;
      data.currentdetailAddress = form.currentAddress
        ? form.currentAddress.detailAddress
        : "";
      data.hukoudetailAddress = form.hukouAddress
        ? form.hukouAddress.detailAddress
        : "";

      data.hukouAddress = form.hukouAddress;
      data.currentAddress = form.currentAddress;
      data.personStateList = [];
      if (form.stateValue) {
        data.personStateList.push(form.stateValue);
      }
      if (form.stateDetailValue) {
        data.personStateList.push(form.stateDetailValue);
      }
      data.personTagList = form.personTagId ? form.personTagId.split(",") : [];
      data.fiveOnePropertyList = form.fiveOnePropertyValue
        ? form.fiveOnePropertyValue.split(",")
        : [];

       // 男"0" / 女"1"
      if (!form.genderValue && form.genderValue!==0) form.genderValue = tool.getGenderByIdNumber(form.idNumber);

      this.form = Object.assign(data, form);
      this.imgSrc = form.picUrl
        ? this.$config.imgPath + form.picUrl
        : this.$config.imgPath + form.idNumber;
      this.hukouAddress = form.hukouAddress
        ? Object.assign(this.hukouAddress, form.hukouAddress)
        : {
            //户籍地址
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
            villageCodeDiaplayName: ""
          };
      this.currentAddress = form.currentAddress
        ? Object.assign(this.currentAddress, form.currentAddress)
        : {
            //户籍地址
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
            villageCodeDiaplayName: ""
          };
      this.form.currentvillageCodeDiaplayName = this.currentAddress.addressTierPath;
      let hukouArr = this.hukouAddress.addressCodeTierPath
        ? this.hukouAddress.addressCodeTierPath.split("/")
        : [];
      let currentArr = this.currentAddress.addressCodeTierPath
        ? this.currentAddress.addressCodeTierPath.split("/")
        : [];
      this.form.hukouAddressPath = hukouArr;
      this.form.currentAddressPath = currentArr;
      if (form.stateDetailValue) {
        this.changeOnSelect = false;
      } else {
        this.changeOnSelect = true;
      }
      // 初始化获取地址清单的数据
      this.getAddress(hukouArr);
      this.getAddress(currentArr);
      let stateObj = this.optionList.personStateList.find(
        x => x.value == form.stateValue
      );
      if (stateObj) this.getPersonState(stateObj.id);
    },
    // 获取人员状态信息处理
    getPersonState(stateValue) {
      const me = this;
      comApis.GET_PERSON_STATE_SMALL_LIST(stateValue).then(res => {
        res.data.forEach(x => {
          x.label = x.displayName;
        });
        let stateDetailChild = res.data;
        me.optionList.personStateList.forEach(k => {
          if (k.id == stateValue) {
            k.children = stateDetailChild;
          }
        });
        me.form.personStateList = [me.form.stateValue];
        if (me.form.stateDetailValue) {
          if (me.form.personStateList.length > 1) {
            me.form.personStateList[1] = this.form.stateDetailValue;
          } else {
            me.form.personStateList.push(this.form.stateDetailValue);
          }
        }
      });
    },
    // 获取地址
    getAddress(tmpArr) {
      if (tmpArr.length < 4) {
        return;
      }
      const me = this;
      let apiArr = [
        comApis.GET_AREA_TREE_BY_CODE(tmpArr[0]),
        comApis.GET_AREA_TREE_BY_CODE(tmpArr[1]),
        comApis.GET_AREA_TREE_BY_CODE(tmpArr[2]),
        comApis.GET_AREA_TREE_BY_CODE(tmpArr[3])
      ];
      Promise.all(apiArr).then(res => {
        let proviceChildren = res[0].data.childAreaList.map(x => {
          let obj = {
            id: x.id,
            code: x.code,
            value: x.code,
            name: x.name,
            label: x.displayName,
            parentId: x.parentId,
            parentCode: x.parentCode,
            longitude: x.longitude,
            latitude: x.latitude
          };
          if (x.expanded == true) {
            obj.loading = false;
            obj.children = [];
          }
          return obj;
        });
        let cityChildren = res[1].data.childAreaList.map(x => {
          let obj = {
            id: x.id,
            code: x.code,
            value: x.code,
            name: x.name,
            label: x.displayName,
            parentId: x.parentId,
            parentCode: x.parentCode,
            longitude: x.longitude,
            latitude: x.latitude
          };
          if (x.expanded == true) {
            obj.loading = false;
            obj.children = [];
          }
          return obj;
        });
        let countyChildren = res[2].data.childAreaList.map(x => {
          let obj = {
            id: x.id,
            code: x.code,
            value: x.code,
            name: x.name,
            label: x.displayName,
            parentId: x.parentId,
            parentCode: x.parentCode,
            longitude: x.longitude,
            latitude: x.latitude
          };
          if (x.expanded == true) {
            obj.loading = false;
            obj.children = [];
          }
          return obj;
        });
        let townChildren = res[3].data.childAreaList.map(x => {
          let obj = {
            id: x.id,
            code: x.code,
            value: x.code,
            name: x.name,
            label: x.displayName,
            parentId: x.parentId,
            parentCode: x.parentCode,
            longitude: x.longitude,
            latitude: x.latitude
          };
          if (x.expanded == true) {
            obj.loading = false;
            obj.children = [];
          }
          return obj;
        });
        me.optionList.proviceAddressList.forEach(k => {
          if (k.code == tmpArr[0]) {
            k.children = proviceChildren;
            k.children.forEach(h => {
              if (h.code == tmpArr[1]) {
                h.children = cityChildren;
                h.children.forEach(m => {
                  if (m.code == tmpArr[2]) {
                    m.children = countyChildren;
                    m.children.forEach(p => {
                      if (p.code == tmpArr[3]) {
                        p.children = townChildren;
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    },
    // 回车或者失去焦点（blur）
    handleGetPersonInfoByIdNumber() {
      const that = this;
      let idNumber = that.form.idNumber;
      // 男"0" / 女"1"
      if (!that.form.genderValue && that.form.genderValue!==0) that.form.genderValue = tool.getGenderByIdNumber(idNumber);
      
      apis.GET_PERSON_INFO_BY_ID(idNumber).then(res => {
        if ((res.code = 200)) {
          that.alonePartyInfo(res.data);
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // 触发选择文件的事件
    handleTriggerFileEvent() {
      this.$refs.input.click();
    },
    // 上传头像change事件
    handleChange($event) {
      // 1、参数
      let me = this;
      let getLocalImgSrc = imgSrc => (me.imgSrc = imgSrc); // 获取图片本地地址
      let opt = {
        event: $event, // 1.1 事件对象
        me: me, // 1.2
        refInput: me.$refs.input, // 1.3 绑定的input表单
        fileName: me.form.idNumber, // 1.4 文件起名
        apiFn: apis.POST_ONLINE_UPLOAD_FILE, // 1.5 上传接口
        getLocalImgSrc // 1.6 获取图片本地地址
      };
      // 2、上传
      tool.uploadUserPic(opt).then(res => {
        // 3、成功后得到图片地址
        me.$refs.input.value = null;
        if (res.code == 200) {
          me.form.picUrl = res.data[0];
        } else {
          me.$Message.error(res.msg);
        }
      });
    },

    // 加载户籍地数据
    loadHukouData(item, callback) {
      if (item) {
        item.loading = true;
        comApis.GET_AREA_TREE_BY_CODE(item.code).then(res => {
          if (res.code == 200) {
            if (res.data.childAreaList) {
              let arr = res.data.childAreaList.map(x => {
                let obj = {
                  id: x.id,
                  code: x.code,
                  value: x.code,
                  name: x.name,
                  label: x.displayName,
                  parentId: x.parentId,
                  parentCode: x.parentCode,
                  longitude: x.longitude,
                  latitude: x.latitude
                };
                if (x.expanded == true) {
                  obj.loading = false;
                  obj.children = [];
                }
                return obj;
              });
              item.children = arr;
            } else {
              item.children = [];
            }
          }
          item.loading = false;
          callback();
        });
      }
    },
    loadData(item, callback) {
      let me = this;
      item.loading = true;
      comApis.GET_PERSON_STATE_SMALL_LIST(item.id).then(res => {
        res.data.forEach(x => {
          x.label = x.displayName;
        });
        item.children = res.data;
        item.loading = false;
        callback();
      });
    },
    // 选择户籍地地址的事件
    handleHukouAdressSelectChange(value, selectedData) {
      if (value.length == 5 || value.length == 4) {
        this.hukouAddress.villageCode =
          selectedData[selectedData.length - 1].code;
        this.hukouAddress.village = selectedData[selectedData.length - 1].label;
      }
      this.hukouAddress.addressCodeTierPath = value.join("/");
      this.hukouAddress.addressTierPath = selectedData
        .map(x => x.label)
        .join("/");
    },
    // 选择现住址的事件
    handleCurAdressSelectChange(value, selectedData) {
      if (value.length == 0) {
        this.currentAddress = {
          //现住址
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
          villageCodeDiaplayName: ""
        };
        this.form.currentvillageCodeDiaplayName = "";
      }
      if (value.length == 5 || value.length == 4) {
        this.currentAddress.villageCode =
          selectedData[selectedData.length - 1].code;
        this.currentAddress.village =
          selectedData[selectedData.length - 1].label;
      }
      this.currentAddress.addressCodeTierPath = value.join("/");
      this.currentAddress.addressTierPath = selectedData
        .map(x => x.label)
        .join("/");
    },
    // 人员状态编辑
    handleStateClick(value) {
      this.changeOnSelect = value;
    },
    handleStateChange(value, selectedData) {
      if (value.length == 0) {
        this.form.stateValue = "";
        this.form.state = "";
        this.form.stateDetail = "";
        this.form.stateDetailValue = "";
      }
      if (value.length == 1) {
        this.form.stateValue = value[0];
        this.form.state = selectedData[0].label;
      }
      if (value.length == 2) {
        this.form.stateDetailValue = value[1];
        this.form.stateDetail = selectedData[1].label;
      }
    },
    // 在任
    singleChange(data) {
      console.log(data);
      this.$nextTick(() => {
        this.$refs["partyBranchInfo"].validateField(
          "departureYear",
          error => {}
        );
      });
    },
    // 填充表单的值
    fillFormValue() {
      let form = Object.assign(this.form, this.partyBranch);
      form.fiveOnePropertyValue = form.fiveOnePropertyList.join();
      let fiveOnePropertyName = this.optionList.fiveOnePropertyList.filter(
        x => form.fiveOnePropertyList.indexOf(x.value) != -1
      );
      form.fiveOneProperty = fiveOnePropertyName.map(x => x.displayName).join();
      let genderObj = this.optionList.genderList.find(
        x => x.value == form.genderValue
      );
      form.gender = genderObj ? genderObj.displayName : "";
      let nationalityObj = this.optionList.nationalityList.find(
        x => x.value == form.nationalityValue
      );
      form.nationality = nationalityObj ? nationalityObj.displayName : "";
      let personState = this.optionList.personStateList.find(
        x => x.value == form.personStateList[0]
      );
      form.state = personState ? personState.label : "";
      form.stateValue = personState ? personState.value : "";
      if (
        form.personStateList.length > 1 &&
        personState &&
        personState.children.length > 0
      ) {
        let stateDetailObj = personState.children.find(
          x => x.value == form.personStateList[1]
        );
        form.stateDetail = stateDetailObj ? stateDetailObj.label : "";
        form.stateDetailValue = stateDetailObj ? stateDetailObj.value : "";
      }
      let personTagArr = this.optionList.personTagList.filter(
        x => form.personTagList.indexOf(x.value) != -1
      );
      form.personTagId = form.personTagList.join();
      form.personTag = personTagArr.map(x => x.displayName).join();
      let politicsStatusObj = this.optionList.politicsStatusList.find(
        x => x.value == form.politicsStatusValue
      );
      form.politicsStatus = politicsStatusObj
        ? politicsStatusObj.displayName
        : "";
      // 职业
      let professionObj = this.optionList.professionList.find(
        x => x.value == form.professionValue
      );
      form.profession = professionObj ? professionObj.displayName : "";

      // 职位
      let positionObj = this.optionList.positionMosqueList.find(
        x => x.value == form.positionValue
      );
      form.position = positionObj ? positionObj.displayName : "";
      this.hukouAddress.detailAddress = form.hukoudetailAddress;
      this.form.hukouAddress = this.hukouAddress;
      this.currentAddress.detailAddress = form.currentdetailAddress;
      this.form.currentAddress = this.currentAddress;
      form.villageCode = this.$route.query.areaCode;
      form.collectId = this.$route.query.collectId;
      form.workMouth = form.workMouth ? form.workMouth : "";
      if (form.workMouth == "") {
        form.workStartTime = form.workYear.toString();
      } else {
        if (form.workMouth < 10) {
          form.workStartTime =
            form.workYear.toString() + "0" + form.workMouth.toString();
        } else {
          form.workStartTime =
            form.workYear.toString() + form.workMouth.toString();
        }
      }
      form.departureMouth = form.departureMouth ? form.departureMouth : "";
      if (form.single) {
        form.workEndTime = "";
      } else {
        if (form.departureMouth == "") {
          form.workEndTime = form.departureYear.toString();
        } else {
          if (form.departureMouth < 10) {
            form.workEndTime =
              form.departureYear.toString() +
              "0" +
              form.departureMouth.toString();
          } else {
            form.workEndTime =
              form.departureYear.toString() + form.departureMouth.toString();
          }
        }
      }
      form.agencyId = this.agencyId;
      form.id = this.id ? this.id : "";
      form.type = "清真寺";
      form.typeValue = "2";
      return form;
    },
    closeView(index) {
      this.$parent.$parent.closeTab(index);
      this.$parent.$parent.init();
    },
    clearData() {
      this.imgSrc = "";
      this.$refs.form.resetFields();
      this.$refs.partyBranchInfo.resetFields();
      this.partyBranch.workMouth = null;
      this.partyBranch.departureMouth = null;
    },
    // 保存并关闭
    saveAndClose(index) {
      const that = this;
      that.$refs["form"].validate(valid => {
        if (valid) {
          that.$refs["partyBranchInfo"].validate(val => {
            if (val) {
              let form = that.fillFormValue();
              // console.log(form);
              apis.savaParty(form).then(res => {
                if (res.code == 200) {
                  that.$Message.success("清真寺人员信息保存成功!");
                  console.log(res);
                  that.closeView(index);
                } else {
                  that.$Message.error(res.msg);
                }
              });
            } else {
              that.$Message.warning("请完善清真寺任职信息！");
            }
          });
        } else {
          that.$Message.warning("请完善个人信息！");
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.info {
  // overflow-y: auto;
  .panel-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 14px;
    .notice-info {
      color: #101010;
      font-size: 14px;
      font-weight: normal;
    }
    .red {
      color: red;
    }
  }
}
.form-panel {
  display: flex;
  justify-content: space-around;
  .panel-form {
    width: 44%;
  }
}

.upload-avator-wrapper {
  display: inline-flex;

  .upload-action {
    padding-left: 10px;
  }
}
.upload-avator {
  position: relative;
  display: inline-flex;
  width: 91px;
  height: 120px;
  background: #dddddd;
  border: 1px solid #d8d8d8;
  line-height: 100px;
  justify-content: center;
  align-items: center;

  .upload-image-file {
    position: absolute;
    left: -99999px;
    top: -99999px;
  }

  .picture {
    width: 100%;
    height: 100%;
  }
}

.upload-avator-button {
  margin-top: 93px;

  .upload-avator-button-icon {
    margin-left: 10px;
    font-size: 16px;
    color: #425d99;
  }
}
.btnGrounp {
  text-align: right;
  margin-top: 30px;
}
/deep/.ivu-input[disabled] {
  color: #666666;
}
/deep/.ivu-select-input[disabled] {
  color: #666666;
  -webkit-text-fill-color: #666;
}
</style>