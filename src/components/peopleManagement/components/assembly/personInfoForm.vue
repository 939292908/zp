<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 10:39:19
 * @LastEditTime: 2019-12-18 18:07:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <Modal v-model="showModal" fullscreen :closable="false" footer-hide>
    <div class="left-anchor">
      <Anchor show-ink container=".right-form" :scroll-offset="20" :offset-bottom="0">
        <AnchorLink href="#personInfo" title="人员基础信息" />
        <AnchorLink href="#religiousInfo" title="宗教信息" />
      </Anchor>
    </div>
    <div class="right-form" ref="modal">
      <div id="personInfo" class="infoBox">
        <div class="form-header">
          <div class="title">
            人员基本信息
            <span class="notice-info">
              （
              <span class="red">*</span>为必填项）
            </span>
          </div>
          <div class="btn-box">
            <Button
              :disabled="!hasFunAuth(constantFunMap.FUN_MapAduit_PersonDetailInfo_Edit_ID)"
              size="small"
              @click="(isPersonInfoEdit=false)"
              v-if="isPersonInfoEdit"
            >
              编辑
              <i
                class="iconfont icon-bianji"
                :class="{hidden : !hasFunAuth(constantFunMap.FUN_MapAduit_PersonDetailInfo_Edit_ID)}"
              ></i>
            </Button>
            <Button
              class="save"
              size="small"
              type="primary"
              v-if="!isPersonInfoEdit"
              @click="savePersonInfo"
            >
              保存
              <i class="iconfont icon-baocun"></i>
            </Button>
            <Button size="small" @click="cancelPersonInfoEdit" v-if="!isPersonInfoEdit">取消编辑</Button>
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
                  <i-input class="card-num" disabled v-model="form.idNumber"></i-input>
                </div>
              </FormItem>
              <FormItem label="姓名" prop="name" class="lean">
                <i-input v-model="form.name" :disabled="isPersonInfoEdit"></i-input>
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
                    <Select v-model="form.genderValue" :disabled="isPersonInfoEdit">
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
                  :autosize="{minRows: 3,maxRows: 6}"
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
            </div>
            <div class="panel-form">
              <div class="panel-title"></div>
              <FormItem label="职业" prop="professionValue">
                <Select :disabled="isPersonInfoEdit" v-model="form.professionValue" filterable>
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
                  <!-- class="detail-address"
                  style="padding-left:10px;"-->
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
              <!-- <Divider /> -->
              <div class="panel-title">社会信息</div>
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
          </Form>
        </div>
      </div>
      <div id="religiousInfo" class="infoBox">
        <div class="form-header">
          <div class="title">
            宗教信息
            <span class="notice-info">
              (
              <span class="red">*</span>为必填项）
            </span>
          </div>
          <div class="btn-box">
            <Button
              :disabled="!hasFunAuth(constantFunMap.FUN_MapAduit_PersonDetailInfo_Edit_ID)"
              size="small"
              @click="(isReligiousInfoEdit=false)"
              v-if="isReligiousInfoEdit"
            >
              编辑
              <i
                :class="{hidden : !hasFunAuth(constantFunMap.FUN_MapAduit_PersonDetailInfo_Edit_ID)}"
                class="iconfont icon-bianji"
              ></i>
            </Button>
            <Button
              class="save"
              size="small"
              type="primary"
              v-if="!isReligiousInfoEdit"
              @click="saveReligiousInfo"
            >
              保存
              <i class="iconfont icon-baocun"></i>
            </Button>
            <Button size="small" @click="cancelReligiousInfoEdit" v-if="!isReligiousInfoEdit">取消编辑</Button>
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
                        :disabled="isReligiousInfoEdit"
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
                        :disabled="isReligiousInfoEdit"
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
                  :disabled="isReligiousInfoEdit"
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
      </div>
    </div>
    <div class="footer-action">
      <div class="change-record-btn" @click="changeRecordModalShow=true">
        <i class="iconfont icon-jilu"></i>变更记录 ({{changeRecordDataList.length}})
      </div>
      <Button type="primary" @click.native="handleModalSaveClose">确定</Button>
      <Button @click.native="handleModalClose">取消</Button>
    </div>
    <!-- 变更记录 -->
    <MyPanel class="changeRecord" :isShowModal="changeRecordModalShow" :ok="cancelChangeRecordModal" :cancel="cancelChangeRecordModal" :showCancelBtn="false" okBtnText="关闭" title="变更记录">
      <ul v-if="changeRecordDataList.length>0">
        <li v-for="(item, index) in changeRecordDataList" :key="index">
          <div class="title">
            <span class="text">{{item.changeBatch}}</span>
            <span class="time">( {{item.changeDate}} )</span>
          </div>
          <div class="changeContent">
            <Row class="item" v-for="(ele, i) in item.details" :key="i">
              <i-col span="5">{{ele.displayName}}： </i-col>
              <i-col span="10" class="old-info">{{ele.oldValue}}</i-col>
              <i-col span="8" class="new-info"><Icon class="icon" type="md-arrow-forward"/>{{ele.newValue}}</i-col>
            </Row>
          </div>
          <div class="info">
            <span>{{item.deptName}}</span>
            <span>{{item.userName}}</span>
            <span>{{item.phone}}</span>
          </div>
        </li>
      </ul>
      <div v-else>暂无变更记录！</div>
    </MyPanel>
  </Modal>
</template>

<script>
import * as comApis from "@/api/common.js";
import { OPTIONS_LIST } from "@/api/config.js";
import * as apis from "@/api/collection/index.js";
import * as tool from "../../../../tools/units.js";
import MyPanel from "@/components/assembly/MyPanel";

export default {
  components: { MyPanel },
  data() {
    const nationalityValueValidate = (rule, value, callback) => {
      if (this.isPersonInfoEdit) {
        callback();
      } else {
        if (!value) {
          callback(new Error("民族不能为空"));
        } else {
          callback();
        }
      }
    };
    return {
      showModal: true,
      changeRecordModalShow: false, // 变更记录模态框 开关
      changeRecordDataList: [], // 变更记录模 data
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
        // idNumber: [
        //   {
        //     required: true,
        //     message: "身份证号不能为空",
        //     trigger: "blur"
        //   },
        //   {
        //     required: true,
        //     pattern: this.$config.idNumberVerify,
        //     message: "身份证号格式错误",
        //     trigger: "blur"
        //   }
        // ],
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
            validator: nationalityValueValidate,
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
      isPersonInfoEdit: true,
      isReligiousInfoEdit: true,
      changeOnSelect: false,
      startTimeOption: {},
      endTimeOption: {},
      beginForm: {},
      personBaokongInfo: null,
      personCaseInfo: null,
      personCaseSocialInfo: null
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.getData();
    this.onStartTimeChange(this.religiousForm.religionStartTime);
    this.onEndTimeChange(this.religiousForm.religionEndTime);
  },

  methods: {
    init() {
      this.getOptionList();
      this.getChangeRecordData();
    },
    // 获取变更记录data
    getChangeRecordData() {
      let idNumber = this.$route.query.idNumber;
      apis.GET_CHANGE_RECOR_BY_ID(idNumber).then(res => {
        if (res.code = 200) {
          this.changeRecordDataList = res.data;
        }
      });
    },
    getData() {
      let idNumber = this.$route.query.idNumber;
      apis.GET_PERSON_INFO_BY_ID(idNumber).then(res => {
        if ((res.code = 200)) {
          this.beginForm = res.data;
          this.bindPersonFormValue(res.data);
          this.bindReligiousFormValue(res.data);
        }
      });
    },
    // 关闭 变更记录
    cancelChangeRecordModal() {
      this.changeRecordModalShow = false;
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
    //
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
      tool.getGenderList(this).then(res => { this.optionList.genderList = res });
      //民族
      tool.getNationalityList(this).then(res => { this.optionList.nationalityList = res });
      //标签
      tool.getPersonTagList(this).then(res => { this.optionList.personTagList = res });
      //人员状态（大类）
      tool.getPersonStateList(this).then(res => {
        this.optionList.personStateList = res;
          this.optionList.personStateList.forEach(x => {
            x.label = x.displayName;
            x.children = [];
            x.loading = false;
          });
      });
      //五位一体
      tool.getFiveOneList(this).then(res => { this.optionList.fiveOnePropertyList = res });
      //政治面貌
      tool.getPoliticsStatusList(this).then(res => { this.optionList.politicsStatusList = res });
      //职业
      tool.getProfessionList(this).then(res => { this.optionList.professionList = res });
      //获取省的数据
      tool.getProviceAddressList(this).then(res => {
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
    // 确定保存并关闭
    handleModalSaveClose() {
      if (!this.isPersonInfoEdit && !this.isReligiousInfoEdit) {
        this.handleSubmit(["personInfoForm", "religiousInfoForm"], true);
      } else if (!this.isPersonInfoEdit) {
        this.handleSubmit(["personInfoForm"], true);
      } else if (!this.isReligiousInfoEdit) {
        this.handleSubmit(["personInfoForm", "religiousInfoForm"], true);
      } else {
        this.closeModal();
      }
    },
    // 关闭页面
    closeModal() {
      // this.$refs.modal.scrollTop = 0;
      window.opener.document.getElementById("tpList").click();
      window.close();
    },
    // 取消并关闭
    handleModalClose() {
      if (!this.isPersonInfoEdit || !this.isReligiousInfoEdit) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "修改内容未保存，确定离开该页面？",
          onOk: () => {
            this.handleReset();
            this.isPersonInfoEdit = true;
            this.isReligiousInfoEdit = true;
            this.closeModal();
          },
          onCancel: () => {}
        });
      } else {
        this.closeModal();
      }
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
          console.log(data);
          if (data[0]) {
            this.save()
              .then(res => {
                this.$Message.success("保存成功！");
                if (refArr[0] == "personInfoForm") {
                  this.isPersonInfoEdit = true;
                } else if (refArr[0] == "religiousInfoForm") {
                  this.religiousInfoForm = true;
                } else {
                  this.isPersonInfoEdit = true;
                  this.isReligiousInfoEdit = true;
                }
                if (isClosePage) {
                  this.handleReset();
                  this.closeModal();
                }
              })
              .catch(res => {
                this.$Message.error("保存失败！");
              });
          } else {
            this.$Message.error("请完善信息！");
          }
        })
        .catch(error => {
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
    // 个人信息保存
    savePersonInfo() {
      this.handleSubmit(["personInfoForm"], false);
      // return new Promise((resolve, reject) => {
      //   this.handleSubmit(["personInfoForm"])
      //   .then(res => {
      //     this.$Message.success("保存成功！");
      //     this.isPersonInfoEdit = true;
      //     resolve(true)
      //   })
      //   .catch(error => {
      //     this.personSaveResult = false;
      //     this.$Message.error("保存失败！");
      //     reject(false)
      //   });
      // })
    },
    // 保存宗教信息，需要验证人员信息和宗教信息
    saveReligiousInfo() {
      this.handleSubmit(["religiousInfoForm", "personInfoForm"], false);
      // return new Promise((resolve, reject) => {
      //   this.handleSubmit(["personInfoForm","religiousInfoForm"])
      //   .then(res => {
      //     this.$Message.success("保存成功！");
      //     this.isReligiousInfoEdit = true;
      //     resolve(true)
      //   })
      //   .catch(error => {
      //     this.handleSubmit("personInfoForm").catch(error => {
      //       this.$Message.error("保存失败！");
      //     });
      //     this.$Message.error("保存失败！");
      //     reject(false)
      //   });
      // })
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
    // 取消人员信息编辑
    cancelPersonInfoEdit() {
      this.$refs["personInfoForm"].resetFields();
      this.bindPersonFormValue(this.beginForm);
      this.isPersonInfoEdit = true;
    },
    // 取消宗教信息编辑
    cancelReligiousInfoEdit() {
      this.$refs["religiousInfoForm"].resetFields();
      this.bindReligiousFormValue(this.beginForm);
      this.isReligiousInfoEdit = true;
    }
    // 宗教信息编辑
    // religiousInfoEdit() {
    //   this.handleSubmit(["personInfoForm"])
    //     .then(res => {
    //       this.isReligiousInfoEdit = false;
    //     })
    //     .catch(error => {
    //       this.isPersonInfoEdit = false;
    //       this.$Message.success("请先补全人员基本信息！");
    //     });
    // }
  }
};
</script>

<style lang="less" scoped>
// 变更记录 modal
.changeRecord {
  li {
    &:not(:last-child) {
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e3e6;
      margin-bottom: 16px;
    }
    .title {
      margin-bottom: 10px;
      .text {
        color: #333;
        font-weight: 700;
      }
      .time {
        color: #999;
      }
    }
    .changeContent {
      .item {
        color: #666;
        margin-bottom: 10px;
        .old-info {
          min-height: 1px;
          padding-right: 30px;
        }
        .new-info {
          position: relative;
          .icon {
            position: absolute;
            left: -24px;
            top: 3px;
            font-size: 14px;
            color: #249B3A;
          }
        }
      }
    }
    .info {
      font-size: 12px;
      color: #999;
      text-align: right;
      > span {
        padding: 0 8px 0 4px;
      }
      > span:not(:last-child) {
        border-right: 1px solid #ccc;
      }
    }
  }
  /deep/ .ivu-modal-body {
    max-height: 300px;
    overflow-y: auto;
  }
}
/deep/.ivu-modal-content {
  .ivu-modal-header {
    display: none;
  }
  .ivu-modal-body {
    background-color: #f7f7f7;
    padding: 20px 20px 58px 20px;
  }
}
/deep/.ivu-anchor-ink-ball {
  border-radius: 0;
  height: 16px;
  width: 2px;
  border: none;
  background-color: #2d8cf0;
  transform: translate(-50%, -2px);
}
/deep/.ivu-anchor-link {
  font-size: 14px;
}
.left-anchor {
  width: 126px;
  height: 100%;
  float: left;
}
.right-form {
  height: 100%;
  overflow-y: auto;
  color: #333333;
  overflow-x: hidden;
  .infoBox {
    background-color: #fff;
    border: 1px solid rgba(224, 227, 230, 1);
    margin-bottom: 20px;
    border-radius: 4px;
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
      .btn-box {
        position: absolute;
        right: 22px;
        top: -2px;
        i {
          font-size: 13px;
          color: #0668c8;
        }
        i.hidden {
          color: #ccc;
        }
        .save {
          margin-right: 5px;
          i {
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }
    .modal-content {
      padding: 26px;
    }
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
.footer-action {
  position: absolute;
  width: calc(100% + 20px);
  bottom: 0;
  left: -20px;
  border-top: 1px solid #e8eaec;
  padding: 12px 18px;
  text-align: right;
  background-color: #fff;
  .change-record-btn {
    border-radius: 2px;
    color: rgba(51, 51, 51, 1);
    font-size: 12px;
    text-align: center;
    box-shadow: 0px 0px 0px 0px rgba(32, 29, 29, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    float: left;
    margin-left: 34px;
    line-height: 26px;
    padding: 0 8px;
    cursor: pointer;
    i {
      vertical-align: middle;
      color: #0668C8;
      margin-right: 4px;
    }
  }
}
</style>
<style lang="less">
@import "../../../../assets/css/form.less";
</style>
