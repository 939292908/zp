<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 15:56:04
 * @LastEditTime: 2019-12-16 17:37:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="addBox">
    <div class="left-box">
      <div class="tabs">
        <div
          class="tab-nav"
          :class="{current:tabIndex==index}"
          v-for="(item,index) in tabNavs"
          :key="index"
          @click="hanldTab(index)"
        >{{item.text}}</div>
      </div>
    </div>
    <div class="right-form" ref="modal">
      <div id="personInfo" class="infoBox" v-show="tabIndex==0">
        <div class="form-header">
          <div class="title">
            人员基本信息
            <span class="notice-info">
              (
              <span class="red">*</span>为必填项）
            </span>
          </div>
        </div>
        <div class="modal-content" ref="modal">
          <Form
            class="form-panel"
            ref="personInfoForm"
            :model="form"
            :rules="personInfoRule"
            :label-width="100"
          >
            <div class="panel-form">
              <div class="panel-title">个人信息</div>
              <FormItem label="身份证号" prop="idNumber" class="lean">
                <div class="card-num-group">
                  <i-input
                    class="card-num"
                    v-model="form.idNumber"
                    @on-blur="handleGetPersonInfoByIdNumber"
                    @keyup.enter="handleGetPersonInfoByIdNumber"
                  ></i-input>
                </div>
              </FormItem>
              <FormItem label="姓名" prop="name" class="lean">
                <i-input v-model="form.name"></i-input>
              </FormItem>
              <FormItem label="照片" prop="picUrl">
                <div class="upload-avator-wrapper">
                  <label for="file" class="upload-avator">
                    <img v-if="imgSrc" :src="imgSrc" alt class="picture" />
                    <!-- <img v-if="form.picUrl" :src="form.picUrl" alt class="picture" /> -->
                    <Icon v-if="!imgSrc" type="ios-image" size="30" />
                    <input
                      ref="input"
                      id="file"
                      type="file"
                      class="upload-image-file"
                      name="file"
                      @change="handleChange($event)"
                    />
                  </label>
                  <div class="upload-action">
                    <Button
                      size="small"
                      class="upload-avator-button"
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
                    <Select v-model="form.genderValue">
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
                    <Select v-model="form.nationalityValue" filterable>
                      <Option
                        :key="index"
                        v-for="(item,index) in optionList.nationalityList"
                        :value="item.value"
                      >{{ item.displayName }}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="标签" prop="personTagList" class="personTags">
                <Select v-model="form.personTagList" multiple filterable placeholder="请选择标签(支持多选)">
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
                  v-model.trim="form.intro"
                  type="textarea"
                  :autosize="{minRows: 3,maxRows: 6}"
                  placeholder="请输入人员简介"
                ></i-input>
              </FormItem>
              <FormItem label="政治面貌" prop="politicsStatusValue">
                <Select v-model="form.politicsStatusValue">
                  <Option
                    v-for="(item,index) in optionList.politicsStatusList"
                    :value="item.value"
                    :key="index"
                  >{{ item.displayName }}</Option>
                </Select>
              </FormItem>
            </div>
            <div class="panel-form">
              <div class="panel-title"></div>
              <FormItem label="职业" prop="professionValue">
                <Select v-model="form.professionValue" filterable>
                  <Option
                    v-for="(item,index) in optionList.professionList"
                    :value="item.value"
                    :key="index"
                  >{{ item.displayName }}</Option>
                </Select>
              </FormItem>
              <Row>
                <Col span="24">
                  <FormItem label="户籍地" prop="hukouAddressPath">
                    <Cascader
                      ref="hukouAdress"
                      v-model="form.hukouAddressPath"
                      :data="optionList.proviceAddressList"
                      :load-data="loadHukouData"
                      @on-change="handleHukouAdressSelectChange"
                    ></Cascader>
                  </FormItem>
                </Col>
                <Col span="24">
                  <!-- class="detail-address"
                  style="padding-left:10px;"-->
                  <FormItem prop="hukoudetailAddress">
                    <i-input v-model="form.hukoudetailAddress" placeholder="请输入详细地址"></i-input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="现住址" prop="currentAddressPath">
                    <Cascader
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
                    <i-input v-model="form.currentdetailAddress" placeholder="请输入详细地址"></i-input>
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="服务场所" prop="servicePlace">
                <i-input v-model="form.servicePlace"></i-input>
              </FormItem>
              <!-- <Divider /> -->
              <div class="panel-title">社会信息</div>
              <FormItem label="银行卡" prop="socialBankCard">
                <i-input v-model="form.socialBankCard"></i-input>
              </FormItem>
              <FormItem label="车辆" prop="socialCar">
                <i-input v-model="form.socialCar"></i-input>
              </FormItem>
              <FormItem label="电话" prop="socialPhone">
                <i-input v-model="form.socialPhone"></i-input>
              </FormItem>
              <FormItem label="QQ号码" prop="socialQq">
                <i-input v-model="form.socialQq"></i-input>
              </FormItem>
              <FormItem label="微信号码" prop="socialWechat">
                <i-input v-model="form.socialWechat"></i-input>
              </FormItem>
            </div>
          </Form>
        </div>
        <div class="form-footer">
          <div class="btn-box">
            <Button type="primary" @click.native="handlePersonInfoSave" :disabled="isExist">保存</Button>
            <Button @click.native="closeModal">关闭</Button>
          </div>
        </div>
      </div>
      <div id="religiousInfo" class="infoBox" v-show="tabIndex==1">
        <div class="form-header">
          <div class="title">
            宗教信息
            <span class="notice-info">
              (
              <span class="red">*</span>为必填项）
            </span>
          </div>
        </div>
        <div class="modal-content" ref="modal">
          <Form
            class="form-panel"
            ref="religiousInfoForm"
            :model="religiousForm"
            :rules="religiousInfoRule"
            :label-width="100"
          >
            <div class="panel-form">
              <div class="panel-title">学经经历</div>
              <FormItem label="学经起止时间" class="lean">
                <Row>
                  <Col span="11">
                    <FormItem prop="religionStartTime">
                      <DatePicker
                        :disabled="!isPersonInfoSave"
                        style="width:90%"
                        type="month"
                        placeholder="开始时间"
                        v-model="religiousForm.religionStartTime"
                        @on-change="onStartTimeChange"
                        :options="startTimeOption"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="2">
                    <i class="iconfont icon-jianhao"></i>
                  </Col>
                  <Col span="11" push="1">
                    <FormItem prop="religionEndTime">
                      <DatePicker
                        :disabled="!isPersonInfoSave"
                        style="width:90%"
                        type="month"
                        placeholder="结束时间"
                        v-model="religiousForm.religionEndTime"
                        @on-change="onEndTimeChange"
                        :options="endTimeOption"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="学经经过" prop="religionLearnProcess">
                <i-input
                  :disabled="!isPersonInfoSave"
                  v-model="religiousForm.religionLearnProcess"
                  type="textarea"
                  :autosize="{minRows: 3,maxRows: 6}"
                  placeholder="请输入学经经过"
                ></i-input>
              </FormItem>
            </div>
            <div class="panel-form"></div>
          </Form>
        </div>
        <div class="form-footer">
          <div class="btn-box">
            <Button
              type="primary"
              :disabled="!isPersonInfoSave"
              @click.native="handleReligiousInfoSave"
            >保存</Button>
            <Button @click.native="closeModal">关闭</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as comApis from "@/api/common.js";
import { OPTIONS_LIST } from "@/api/config.js";
import * as apis from "@/api/collection/index.js";
import * as tool from "../../../../tools/units.js";
export default {
  data() {
    const idNumberValidate = (rule, value, callback) => {
      // if (this.isExist && value) {
      //   callback(new Error("人员已存在，请输入正确的身份证号"));
      // } else {
      //   if (!value) {
      //     callback(new Error("身份证号不能为空"));
      //   } else {
      //     callback();
      //   }
      // }
      if (!value) {
        callback(new Error("身份证号不能为空"));
      } else {
        let reg = this.$config.idNumberVerify;
        var r = value.trim().match(reg);

        if (r != null) {
          if (this.isExist) {
            callback(new Error("人员已存在，请输入正确的身份证号"));
          } else {
            callback();
          }
        } else {
          callback(new Error("身份证格式不正确"));
        }
      }
    };
    return {
      tabIndex: 0,
      tabNavs: [
        {
          text: "人员基础信息"
        },
        {
          text: "宗教信息"
        }
      ],
      imgSrc: "",
      showDisplayNameError: false,
      cityApis: comApis.GET_AREA_TREE_INFO,
      cityTreeProps: {
        children: "childAreaList",
        title: "displayName",
        id: "code"
      },
      optionConfig: OPTIONS_LIST,
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
      },
      religiousForm: {
        religionStartTime: "", //学经开始时间
        religionEndTime: "", //学经结束时间
        religionLearnProcess: "" //学经经过
      },
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
      personInfoRule: {
        genderValue: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "blur"
          }
        ],
        idNumber: [
          // {
          //   required: true,
          //   message: "身份证号不能为空",
          //   trigger: "blur"
          // },
          // {
          //   required: true,
          //  pattern: this.$config.idNumberVerify,
          //   message: "身份证号格式错误",
          //   trigger: "blur"
          // }
          { validator: idNumberValidate, trigger: "blur" }
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
        // socialPhone: [
        //   {
        //     pattern: /^1[3456789]\d{9}$/,
        //     message: "电话号码格式错误",
        //     trigger: "blur"
        //   }
        // ],
        nationalityValue: [
          {
            required: true,
            message: "民族不能为空",
            trigger: "change"
          }
        ]
      },
      religiousInfoRule: {
        religionStartTime: [
          {
            required: true,
            type: "date",
            message: "学经开始时间不能为空",
            trigger: "change"
          }
        ],
        religionLearnProcess: {
          required: true,
          message: "学经经过不能为空",
          trigger: "blur"
        }
      },
      optionList: {
        genderList: [], //性别
        nationalityList: [], //民族
        personTagList: [], //标签
        personStateList: [], //人员状态
        fiveOnePropertyList: [], //五位一体
        politicsStatusList: [], //政治面貌
        professionList: [], //职业
        relationTypeList: [], //关系名称
        displayNameTypeList: [], //身份/称谓
        displayNameAllTypeList: [],
        proviceAddressList: []
      },
      idNumberLoading: false,
      changeOnSelect: false,
      startTimeOption: {},
      endTimeOption: {},
      personBaokongInfo: null,
      personCaseInfo: null,
      personCaseSocialInfo: null,
      isPersonInfoSave: false,
      isExist: false
    };
  },
  mounted() {
    this.init();
    this.onStartTimeChange(this.religiousForm.religionStartTime);
    this.onEndTimeChange(this.religiousForm.religionEndTime);
  },

  methods: {
    init() {
      this.getOptionList();
    },
    hanldTab(index) {
      this.tabIndex = index;
      if (index == 1) {
        this.$refs["personInfoForm"].validate(valid => {
          if (valid && !this.isExist) {
            this.isPersonInfoSave = true;
          } else {
            this.isPersonInfoSave = false;
            if (!this.isExist) {
              this.$Message.warning({
                content: "人员基础信息不完整，无法添加宗教信息"
              });
            }
          }
        });
      }
    },
    // 回车或者失去焦点（blur）
    async handleGetPersonInfoByIdNumber() {
      let idNumber = this.form.idNumber;
      if (idNumber) {
        let res = await apis.GET_PERSON_INFO_BY_ID(idNumber);
        if (res.code == 200) {
          this.isExist = true;
          this.isPersonInfoSave = false;
        } else {
          this.isExist = false;
        }
        this.handleFormValidate();
      }
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
    // 起始时间变化
    onStartTimeChange(religionStartTime, type) {
      this.endTimeOption = {
        disabledDate(religionEndTime) {
          return (
            religionEndTime < new Date(religionStartTime) - 8.64e7 ||
            religionEndTime > Date.now()
          );
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(religionEndTime, type) {
      this.startTimeOption = {
        disabledDate(religionStartTime) {
          return (
            religionStartTime > new Date(religionEndTime) ||
            religionStartTime > Date.now()
          );
        }
      };
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
    // 绑定个人信息的值
    bindPersonFormValue(form) {
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
      this.imgSrc = form.picUrl ? this.$config.imgPath + form.picUrl : "";
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
    // 绑定宗教信息的值
    bindReligiousFormValue(form) {
      this.religiousForm.religionStartTime = form.religionStartTime
        ? this.$moment(form.religionStartTime).format("YYYY-MM")
        : "";
      if (form.religionStartTime == null) {
        this.endTimeOption = {
          disabledDate(religionEndTime) {
            return religionEndTime > Date.now();
          }
        };
      } else {
        this.endTimeOption = {
          disabledDate(religionEndTime) {
            return (
              religionEndTime < new Date(form.religionStartTime) - 8.64e7 ||
              religionEndTime > Date.now()
            );
          }
        };
      }
      if (form.religionEndTime == null) {
        this.startTimeOption = {
          disabledDate(religionStartTime) {
            return religionStartTime > Date.now();
          }
        };
      } else {
        this.startTimeOption = {
          disabledDate(religionStartTime) {
            return (
              religionStartTime > new Date(form.religionEndTime) ||
              religionStartTime > Date.now()
            );
          }
        };
      }

      this.religiousForm.religionEndTime = form.religionEndTime
        ? this.$moment(form.religionEndTime).format("YYYY-MM")
        : "";
      this.religiousForm.religionLearnProcess = form.religionLearnProcess;
    },
    // 填充表单的值
    fillFormValue() {
      let form = this.form;
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
      let professionObj = this.optionList.professionList.find(
        x => x.value == form.professionValue
      );
      form.profession = professionObj ? professionObj.displayName : "";
      this.hukouAddress.detailAddress = form.hukoudetailAddress;
      this.form.hukouAddress = this.hukouAddress;
      this.currentAddress.detailAddress = form.currentdetailAddress;
      this.form.currentAddress = this.currentAddress;
      form.religionStartTime = this.religiousForm.religionStartTime;
      form.religionEndTime = this.religiousForm.religionEndTime;
      form.religionLearnProcess = this.religiousForm.religionLearnProcess;
      return form;
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
    // 获取清单
    getOptionList() {
      //性别
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.GENDER,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.GENDER
        })
        .then(res => {
          this.optionList.genderList = res;
        });
      //民族
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.NATIONALITY,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.NATIONALITY
        })
        .then(res => {
          this.optionList.nationalityList = res;
        });
      //标签
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.PERSON_TAG,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.PERSON_TAG
        })
        .then(res => {
          this.optionList.personTagList = res;
        });
      //人员状态（大类）
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.STATE_STRONG,
          apiFun: comApis.GET_PERSON_STATE_BIG_LIST,
          params: OPTIONS_LIST.STATE_STRONG
        })
        .then(res => {
          this.optionList.personStateList = res;
          this.optionList.personStateList.forEach(x => {
            x.label = x.displayName;
            x.children = [];
            x.loading = false;
          });
        });
      //五位一体
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.FIVE_ONE_PROPERTY,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.FIVE_ONE_PROPERTY
        })
        .then(res => {
          this.optionList.fiveOnePropertyList = res;
        });
      //政治面貌
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.POLITICS_STATUS,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.POLITICS_STATUS
        })
        .then(res => {
          this.optionList.politicsStatusList = res;
        });
      //职业
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.PROFESSION,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.PROFESSION
        })
        .then(res => {
          this.optionList.professionList = res;
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
          }
        });
    },
    // 重置表单
    handleReset() {
      this.$refs["personInfoForm"].resetFields();
      this.$refs["religiousInfoForm"].resetFields();
    },
    // // 确定保存并关闭
    // handleModalSaveClose() {
    //   if (!this.isPersonInfoEdit && !this.isReligiousInfoEdit) {
    //     this.handleSubmit(["personInfoForm", "religiousInfoForm"], true);
    //   } else if (!this.isPersonInfoEdit) {
    //     this.handleSubmit(["personInfoForm"], true);
    //   } else if (!this.isReligiousInfoEdit) {
    //     this.handleSubmit(["personInfoForm", "religiousInfoForm"], true);
    //   } else {
    //     this.closeModal();
    //   }
    // },
    // 人员保存
    handlePersonInfoSave() {
      this.handleSubmit(["personInfoForm"], false);
    },
    // 宗教信息保存
    handleReligiousInfoSave() {
      this.handleSubmit(["religiousInfoForm", "personInfoForm"], true);
    },
    // 关闭页面
    closeModal() {
      // this.$refs.modal.scrollTop = 0;
      // window.opener.document.getElementById("tpList").click();
      window.close();
    },
    // 保存提交
    handleSubmit(refArr, isClosePage) {
      let _self = this;
      Promise.all(
        refArr.map(ref => {
          let p = new Promise(function(resolve, reject) {
            _self.$refs[ref].validate(valid => {
              if (valid) {
                resolve(valid);
              } else {
                reject(valid);
              }
            });
          });
          return p;
        })
      )
        .then(data => {
          if (data[0]) {
            this.save()
              .then(res => {
                this.$Message.success("保存成功！");
                this.isPersonInfoSave = true;
                if (refArr[0] == "personInfoForm") {
                  this.tabIndex = 1;
                }
              })
              .catch(res => {
                this.$Message.error("保存失败！");
              });
          } else {
            // this.isPersonInfoSave = false;
            this.$Message.error("请完善信息！");
          }
        })
        .catch(error => {
          // this.isPersonInfoSave = false;
          this.$Message.error("请完善信息！");
        });

      // var promise = new Promise((resolve, reject) => {
      //   this.$refs['personInfoForm'].validate(valid => {
      //     debugger;
      //     if (valid) {
      //       // this.save()
      //       //   .then(res => {
      //       //     resolve(res);
      //       //   })
      //       //   .catch(res => {
      //       //     reject(res);
      //       //   });
      //     } else {
      //       // this.personSaveResult = false;
      //       reject(false);
      //     }
      //   });
      // });
      // return promise;
    },
    // 保存
    save() {
      let form = this.fillFormValue();
      let params = {
        personBaokongInfo: this.personBaokongInfo,
        personCaseInfo: this.personCaseInfo,
        personCaseSocialInfo: this.personCaseSocialInfo,
        personInfo: form
      };
      var promise = new Promise((resolve, reject) => {
        apis.NEW_PATCH_PERSON_INFO_LEDGER(params).then(res => {
          if (res.code == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
    },
    handleFormValidate() {
      let arr = {
        idNumber: [
          {
            validator: this.idNumberValidate,
            trigger: "blur"
          }
        ]
      };
      Object.keys(arr).forEach(key => {
        this.$refs["personInfoForm"].validateField(key, error => {});
      });
    }
  }
};
</script>

<style lang="less">
.addBox {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  padding: 20px;
  position: absolute;
  .left-box {
    width: 126px;
    height: 100%;
    font-size: 14px;
    float: left;
    .tab-nav {
      cursor: pointer;
      border-left: 1px solid #ccc;
      padding: 0px 15px;
      margin-bottom: 5px;
      &.current {
        color: #2d8cf0;
        border-left: 2px solid #2d8cf0;
      }
    }
  }
  .right-form {
    height: 100%;
    overflow-y: auto;
    color: #333333;
    overflow-x: hidden;
    background-color: #fff;
    border: 1px solid rgba(224, 227, 230, 1);
    border-radius: 4px;
    .infoBox {
      .modal-content {
        margin-top: 20px;
      }
      .form-header {
        height: 56px;
        padding: 0 22px;
        line-height: 56px;
        position: relative;
        border-bottom: 1px solid rgba(224, 227, 230, 1);
        .title {
          font-size: 16px;
          font-weight: bold;
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
      .form-footer {
        height: 57px;
        border-top: 1px solid rgba(224, 227, 230, 1);
        position: fixed;
        bottom: 21px;
        width: calc(100% - 168px);
        background-color: #fff;
        .btn-box {
          text-align: right;
          line-height: 57px;
          button {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
@import "../../../../assets/css/form.less";
</style>
