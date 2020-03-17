<template>
  <div id="personInfo" class="infoBox">
    <div class="form-header">
      <div class="title">
        人员基本信息
        <span class="notice-info">
          (
          <span class="red">*</span>为必填项）
        </span>
      </div>
      <!-- <div class="btn-box">
        <Button size="small" @click="(isPersonInfoEdit=false)" v-if="isPersonInfoEdit">
          编辑
          <i class="iconfont icon-bianji"></i>
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
      </div>-->
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
          <FormItem label="隶属村">
            <span>{{villageName}}</span>
          </FormItem>
          <FormItem label="身份证号" prop="idNumber">
            <div class="card-num-group">
              <i-input
                v-model="form.idNumber"
                :disabled="isPersonInfoEdit"
                @on-blur="handleGetPersonInfoByIdNumber"
                @keyup.enter="handleGetPersonInfoByIdNumber"
                :class="{error:showIdNumberError}"
              ></i-input>
              <span v-if="isAdd" class="not-id-people" @click="isShowNoIdNumberModal=true">无证人员</span>
              <div v-if="showIdNumberError" class="ivu-form-item-error-tip">此身份证人员已添加</div>
            </div>
          </FormItem>
          <FormItem label="姓名" prop="name" class="lean">
            <i-input :disabled="isPersonInfoEdit" v-model="form.name"></i-input>
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
                  :disabled="isPersonInfoEdit"
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
              <FormItem label="性别" prop="genderValue" :class="{validateStar: !isNoIdNumberAdd}">
                <Select v-model="form.genderValue" :disabled="!isNoIdNumberAdd || isPersonInfoEdit">
                  <Option
                    :key="index"
                    v-for="(item,index) in optionList.genderList"
                    :value="item.value"
                  >{{ item.displayName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem
                class="nationalityForm"
                label="民族"
                prop="nationalityValue"
                :class="{validateStar: !isNoIdNumberAdd}"
              >
                <Select v-model="form.nationalityValue" filterable :disabled="isPersonInfoEdit">
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
              ref="personState"
              :disabled="isPersonInfoEdit"
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
              :disabled="isPersonInfoEdit"
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
              :disabled="isPersonInfoEdit"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 6}"
              placeholder="请输入人员简介"
            ></i-input>
          </FormItem>
          <FormItem label="政治面貌" prop="politicsStatusValue">
            <Select v-model="form.politicsStatusValue" :disabled="isPersonInfoEdit">
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
            <Select v-model="form.professionValue" filterable :disabled="isPersonInfoEdit">
              <Option
                v-for="(item,index) in optionList.professionList"
                :value="item.value"
                :key="index"
              >{{ item.displayName }}</Option>
            </Select>
          </FormItem>
          <Row>
            <Col span="24">
              <FormItem
                label="户籍地"
                prop="hukouAddressPath"
                :class="{validateStar: !isNoIdNumberAdd}"
              >
                <Cascader
                  ref="hukouAdress"
                  v-model="form.hukouAddressPath"
                  :change-on-select="isNoIdNumberAdd"
                  :disabled="isPersonInfoEdit"
                  :data="optionList.proviceAddressList"
                  :load-data="loadHukouData"
                  @on-change="handleHukouAdressSelectChange"
                  @on-visible-change="getVisibleChange"
                ></Cascader>
              </FormItem>
            </Col>
            <Col span="24">
              <!-- class="detail-address"
              style="padding-left:10px;"-->
              <FormItem prop="hukoudetailAddress">
                <i-input
                  v-model="form.hukoudetailAddress"
                  :disabled="isPersonInfoEdit"
                  placeholder="请输入详细地址"
                ></i-input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="现住址" prop="currentAddressPath">
                <Cascader
                  ref="currentAdress"
                  v-model="form.currentAddressPath"
                  :disabled="isPersonInfoEdit"
                  :data="optionList.proviceAddressList"
                  :load-data="loadHukouData"
                  @on-change="handleCurAdressSelectChange"
                  @on-visible-change="getVisibleChange"
                ></Cascader>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="currentdetailAddress">
                <i-input
                  v-model="form.currentdetailAddress"
                  :disabled="isPersonInfoEdit"
                  placeholder="请输入详细地址"
                ></i-input>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="服务场所" prop="servicePlace">
            <i-input v-model="form.servicePlace" :disabled="isPersonInfoEdit"></i-input>
          </FormItem>
          <!-- <Divider /> -->
          <div class="panel-title">社会信息</div>
          <FormItem label="银行卡" prop="socialBankCard">
            <i-input v-model="form.socialBankCard" :disabled="isPersonInfoEdit"></i-input>
          </FormItem>
          <FormItem label="车辆" prop="socialCar">
            <i-input v-model="form.socialCar" :disabled="isPersonInfoEdit"></i-input>
          </FormItem>
          <FormItem label="电话" prop="socialPhone">
            <i-input v-model="form.socialPhone" :disabled="isPersonInfoEdit"></i-input>
          </FormItem>
          <FormItem label="QQ号码" prop="socialQq">
            <i-input v-model="form.socialQq" :disabled="isPersonInfoEdit"></i-input>
          </FormItem>
          <FormItem label="微信号码" prop="socialWechat">
            <i-input v-model="form.socialWechat" :disabled="isPersonInfoEdit"></i-input>
          </FormItem>
        </div>
        <div class="btn">
          <!-- <Button type="primary" v-if="isStepOne" @click.native="nextStep()">下一步</Button>
          <Button type="primary" v-if="isStepOne" @click.native="closeAdd()">关闭</Button>-->
          <!-- <Button type="primary" @click.native="savePersonInfo" v-if="!isPersonInfoEdit">保存并下一步</Button>
          <Button type="primary" @click="(isPersonInfoEdit=false)" v-if="isPersonInfoEdit">编辑</Button>-->
        </div>
      </Form>
    </div>
    <!-- <div class="form-footer">
        <div class="btn-box">
          <Button type="primary" @click.native="handlePersonInfoSave" :disabled="isExist">保存</Button>
          <Button @click.native="closeModal">关闭</Button>
        </div>
    </div>-->
    <!-- 添加：无证人员 模态框 -->
    <Modal
      class="noIdNumberModal"
      v-model="isShowNoIdNumberModal"
      title="无证人员"
      @on-ok="noIdNumberModalOk"
      @on-cancel="noIdNumberModalCancel"
      width="95"
      :styles="{top: '30px'}"
    >
      <!-- 无证人员table组件 -->
      <NoIdNumber
        ref="noIdNumber"
        @getNoIdNumberfromTable="getNoIdNumberfromTable"
        @getNoIdNumberDataByAdd="getNoIdNumberDataByAdd"
        @cancelClickToAdd="cancelClickToAdd"
      ></NoIdNumber>
      <div slot="footer" class="noIdNumber-footer-box">
        <div class="footer-left">
          <div class="noIdNumber-footer-btns">
            <div class="btn ok-btn" @click="noIdNumberModalOk">确认选用</div>
            <div class="btn cancel-btn" @click="noIdNumberModalCancel">取消</div>
          </div>
        </div>
        <div class="footer-right"></div>
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as comApis from "@/api/common.js";
import { OPTIONS_LIST } from "@/api/config.js";
import * as apis from "@/api/collection/index.js";
import * as tool from "../../../../tools/units.js";
import NoIdNumber from "../NoIdNumber";
export default {
  props: {
    listsDone: {
      type: Array,
      default() {
        return [];
      }
    },
    listsUnfinished: {
      type: Array,
      default() {
        return [];
      }
    },
    idNumber: {
      type: String,
      default: ""
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    villageName: {
      type: String,
      default: ""
    }
  },
  watch: {
    villageName: {
      handler(val) {},
      immediate: true
    },
    listsDone: {
      handler(val) {},
      immediate: true
    },
    listsUnfinished: {
      handler(val) {},
      immediate: true
    },
    isAdd: {
      handler(val) {
        // this.isPersonInfoEdit = !val;
      },
      immediate: true
    },
    idNumber: {
      handler(val) {
        // 编辑人员
        if (!val) {
          return;
        }
        if (this.$parent.$parent.isAdd != null) {
          if (this.$parent.$parent.isAdd.toString() == "false") {
            this.form.idNumber = val;
            this.handleGetPersonInfoByIdNumber();
          }
        }
      },
      immediate: true
    },
    "form.idNumber": {
      handler(val) {
        // 是否是无证人员
        this.isNoIdNumberAdd = tool.isNoIdNumberPeopleByIdNumber(val);
        // 添加模式 并且 是正常人员
        if (this.isAdd && !this.isNoIdNumberAdd) {
          this.form.genderValue = tool.getGenderByIdNumber(val); // 根据身份证 带出性别
        }
      },
      immediate: true
    }
  },
  components: {
    NoIdNumber
  },
  data() {
    const noIdNumberValidatePass = (rule, value, callback) => {
      tool.noIdNumberValidatePass(rule, value, callback, this.isNoIdNumberAdd);
    };
    //这里存放数据
    return {
      isStepOne: true,
      isShowNoIdNumberModal: false, // 展示 无证模态框
      tempNoIdNumber: "", // 从模态框 获取的id （模态框确认时赋给表单）
      isNoIdNumberAdd: false, // 是否是无证人员采集
      addressVisibleChange: false, // 级联选择器 地址弹窗显示状态
      beginForm: {}, //还原最先的人员信息 取消编辑按钮
      isPersonInfoEdit: false, //是否可编辑
      imgSrc: "", //人员头像
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
      personInfoRule: {
        genderValue: [
          {
            // required: true,
            validator: noIdNumberValidatePass,
            message: "性别不能为空",
            trigger: "blur"
          }
        ],
        idNumber: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[0-9a-zA-Z]{18,19}$/,
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
            // required: true,
            validator: noIdNumberValidatePass,
            type: "array",
            message: "户籍地不能为空",
            trigger: "change"
          }
        ],
        hukoudetailAddress: [
          {
            // required: true,
            validator: noIdNumberValidatePass,
            message: "户籍地详细地址不能为空",
            trigger: "blur"
          }
        ],
        nationalityValue: [
          {
            // required: true,
            validator: noIdNumberValidatePass,
            message: "民族不能为空",
            trigger: "change"
          }
        ]
      },
      changeOnSelect: false, //人员状态
      isPersonInfoSave: false,
      isExist: false,
      showIdNumberError: false,
      // isAdd: true,
      isReligiousInfoEdit: true
    };
  },

  mounted() {
    this.init();
  },

  //方法集合
  methods: {
    // 从模态框中获取 无证人员id
    getNoIdNumberfromTable(idNumber) {
      this.tempNoIdNumber = idNumber; // 临时存无证人员id
    },
    // 确认 - 无证人员
    noIdNumberModalOk() {
      if (!this.tempNoIdNumber) {
        this.$Message.warning("请选择无证人员");
        return;
      }
      this.isShowNoIdNumberModal = false;
      // 临时id赋值到表单
      this.form.idNumber = this.tempNoIdNumber;
      this.handleGetPersonInfoByIdNumber();
      this.$refs.noIdNumber.resetData();
      this.tempNoIdNumber = "";
    },
    // 关闭 - 无证人员
    noIdNumberModalCancel() {
      this.isShowNoIdNumberModal = false;
      this.$refs.noIdNumber.showLoading = false;
      this.$refs.noIdNumber.resetData();
      this.tempNoIdNumber = "";
    },
    // 模态框中添加无证人员后，确认按钮事件 带出信息
    getNoIdNumberDataByAdd(data) {
      console.log(data);
      this.form.idNumber = data.WZIdNumber;
      this.form.genderValue = data.gender;
      this.form.hukouAddressPath = data.areaCodeList;
      // 户籍地信息
      this.hukouAddress.villageCode = data.villageCode;
      this.hukouAddress.village = data.village;
      this.hukouAddress.addressCodeTierPath = data.addressCodeTierPath;
      this.hukouAddress.addressTierPath = data.addressTierPath;
      let cityCodeArr = data.addressCodeTierPath.split("/");
      let cityArr = data.addressTierPath.split("/");
      cityCodeArr.forEach((item, index) => {
        if (index == 0) {
          this.hukouAddress.provinceCode = item;
          this.hukouAddress.province = cityArr[index];
        }
        if (index == 1) {
          this.hukouAddress.cityCode = item;
          this.hukouAddress.city = cityArr[index];
        }
        if (index == 2) {
          this.hukouAddress.countyCode = item;
          this.hukouAddress.county = cityArr[index];
        }
        if (index == 3) {
          this.hukouAddress.townCode = item;
          this.hukouAddress.town = cityArr[index];
        }
        if (index == 4) {
          this.hukouAddress.villageCode = item;
          this.hukouAddress.village = cityArr[index];
        }
      });
      this.getAddress(cityCodeArr);
      this.isShowNoIdNumberModal = false;
    },
    // 添加无证人员的 关闭按钮事件
    cancelClickToAdd() {
      this.isShowNoIdNumberModal = false;
    },
    // 获取地址弹窗状态
    getVisibleChange(value) {
      this.addressVisibleChange = value;
    },
    // 用cityCodeArr设置地址列表 (配合change-on-select使用)
    getAddress(cityCodeArr) {
      tool.setAddressByCodeArr(cityCodeArr, this.optionList.proviceAddressList);
    },
    // 加载optionList字典项
    init() {
      this.getOptionList();
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
    //上传照片开始 触发选择文件的事件
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

    // 人员状态选择开始 人员状态编辑
    handleStateClick(value) {
      this.changeOnSelect = value;
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
    // 人员状态选择
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
    // 级联选择器 加载下一级'人员状态'
    loadData(item, callback) {
      tool.loadPersonStateData(item, callback);
    },
    // 级联选择器 加载下一级'户籍地址'
    loadHukouData(item, callback) {
      if (this.isNoIdNumberAdd && !this.addressVisibleChange) return; // '无证人员 并且 弹窗关闭状态' 跳过loadData方法 (否则影响显示结果)
      tool.loadAddressData(item, callback);
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
    // 重置表单
    handleReset() {
      this.$refs["personInfoForm"].resetFields();
      this.imgSrc = "";
      this.$refs.input.value = null;
    },
    // 回车或者失去焦点（blur）
    handleGetPersonInfoByIdNumber() {
      let idNumber = this.form.idNumber;
      let collectId = this.$route.query.collectId;
      if (idNumber) {
        // this.$parent.$parent.$refs["baseBeHit"].caseInfo(idNumber);
        this.$emit("select-change", this.form.idNumber);
        if (this.listsDone && this.listsDone.length > 0) {
          var listsDone = this.listsDone.some(x => {
            return x.idNumber == idNumber;
          });
        }
        if (this.listsUnfinished && this.listsUnfinished.length > 0) {
          var listsUnfinished = this.listsUnfinished.some(x => {
            return x.idNumber == idNumber;
          });
        }
        if (this.isAdd) {
          if (listsDone || listsUnfinished) {
            this.showIdNumberError = true;
          } else {
            this.showIdNumberError = false;
          }
        } else {
          this.showIdNumberError = false;
        }
        let idNumber = this.form.idNumber;
        let res = apis.GET_NEW_PERSON_INFO_BY_ID(idNumber, collectId);
        res.then(res => {
          if (res.code == 200) {
            this.isExist = true;
            this.isPersonInfoSave = false;
            this.beginForm = res.data;
            this.bindPersonFormValue(res.data.personInfo);
          } else {
            this.isExist = false;
          }
          /* this.$nextTick(() => {
            this.handleFormValidate();
          }); */
          if (idNumber && res.gender == null) {
            // 男"0" / 女"1"
            if (!this.form.genderValue && this.form.genderValue!==0) this.form.genderValue = tool.getGenderByIdNumber(idNumber);
            this.form.idNumber = idNumber;
          }
        });
      }
    },
    handleFormValidate() {
      let arr = this.personInfoRule;
      Object.keys(arr).forEach(key => {
        this.$refs["personInfoForm"].validateField(key, error => {});
      });
    },
    // 取消人员信息编辑
    /*cancelPersonInfoEdit() {
      this.$refs["personInfoForm"].resetFields();
      this.bindPersonFormValue(this.beginForm);
      this.isPersonInfoEdit = true;
    },
    // 关闭closeAdd
    closeAdd() {
      this.$parent.$parent.handleModalClose();
    },*/
    // 下一步nextStep
    nextStep() {
      const that = this;
      that.$refs["personInfoForm"].validate(valid => {
        if (valid) {
          that.$parent.$parent.isStepOne = false;
          that.$parent.$parent.showBeHit = true;
          that.$parent.$parent.getId(that.form.idNumber);
          that.$nextTick(() => {
            that.$parent.$parent.hanldTab("#info1", 1);
          });
        } else {
          that.$Message.error("必填项缺失");
        }
      });
    },
    savePersonInfo() {
      // this.handleSubmit(["personInfoForm"], false);
      const that = this;
      that.$refs["personInfoForm"].validate(valid => {
        if (valid) {
          let form = that.fillFormValue();
          let collectId = this.$route.query.collectId;
          let params = {
            personBaokongInfo: this.personBaokongInfo,
            personCaseInfo: this.personCaseInfo,
            personCaseSocialInfo: this.personCaseSocialInfo,
            personInfo: form,
            mapCollectId: collectId,
            collectId: "",
            taskId: ""
          };
          apis
            .NEW_PATCH_PERSON_INFO(params)
            .then(res => {
              if (res.code == 200) {
                that.$Message.success("保存成功！");
                that.isPersonInfoEdit = false;
                if (that.isAdd) {
                  that.$parent.$parent.showBeHit = true;
                  that.$parent.$parent.getId(this.form.idNumber);
                }
              } else {
                that.$Message.error(res.msg);
              }
            })
            .catch(res => {
              that.$Message.error("保存失败！");
            });
        } else {
          that.$Message.error("必填项缺失");
        }
      });
    },
    // 保存
    save() {
      let form = this.fillFormValue();
      let collectId = this.$route.query.collectId;
      let params = {
        personBaokongInfo: this.personBaokongInfo,
        personCaseInfo: this.personCaseInfo,
        personCaseSocialInfo: this.personCaseSocialInfo,
        personInfo: form,
        mapCollectId: collectId,
        collectId: "",
        taskId: ""
      };
      var promise = new Promise((resolve, reject) => {
        apis.NEW_PATCH_PERSON_INFO(params).then(res => {
          if (res.code == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
      return promise;
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
      form.collectId = this.$route.query.collectId;
      form.mapCollectId = this.$route.query.collectId;
      return form;
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.infoBox {
  background-color: #fff;
  border: 1px solid rgba(224, 227, 230, 1);
  margin-bottom: 20px;
  border-radius: 4px;
}
.form-panel {
  display: flex;
  justify-content: space-around;
}

.panel-right {
  width: 30%;

  .panel-form {
    width: 100%;
  }
}
.upload-avator-wrapper {
  display: inline-flex;

  .upload-action {
    padding-left: 10px;
  }
}
.panel-form {
  &:first-child {
    margin-right: 50px;
  }

  width: 30%;

  .icon-jianhao {
    font-size: 30px;
    color: #999;
    vertical-align: middle;
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

  .card-num-group {
    display: inline-flex;
    width: 100%;

    .card-num {
      margin-right: 4px;
    }
  }
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
.form-panel {
  display: flex;
  /* overflow: auto;
  overflow-x: hidden; */
  justify-content: space-around;
  .panel-title {
    padding: 0 10px;
    font-size: 14px;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
    font-weight: 600;
    color: #666666;
    height: 21px;
  }
  .formRight {
    width: 30%;
  }
  .formLeft {
    width: 30%;
    margin-right: 50px;
    .upload-avator {
      position: relative;
      display: inline-block;
      width: 90px;
      height: 100px;
      background: #dddddd;
      border: 1px solid #d8d8d8;
      line-height: 100px;
      text-align: center;

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
  }
  /deep/.error input {
    border: 1px solid red;
  }
}
.modal-content {
  padding-bottom: 62px;
  position: relative;
  .btn {
    position: absolute;
    right: 114px;
    bottom: 30px;
    button {
      color: #ffffff;
      background-color: #2db7f5;
      outline: none;
      display: inline-block;
      margin-bottom: 0;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      padding: 5px 15px 6px;
      font-size: 12px;
      border-radius: 4px;
      border: none;
    }
  }
}
// 无证人员 模态框底部
.noIdNumber-footer-box {
  overflow: hidden;
  .footer-left {
    float: left;
    width: 60%;
    box-sizing: border-box;
    padding: 12px 0;
    border-right: 1px solid #e8eaec;
    // box-sizing: content-box!important;
  }
  .footer-right {
    float: left;
  }
  .noIdNumber-footer-btns {
    float: right;
    .btn {
      float: left;
      width: 78px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      margin-right: 12px;
      cursor: pointer;
      border: 1px solid #000;
      border-radius: 2px;
      border: 1px solid #ccc;
      background-color: #fff;
      color: #333;
    }
    .ok-btn {
      border: 1px solid rgba(0, 0, 0, 0);
      background-color: #0668c8;
      color: #fff;
    }
  }
}
.noIdNumberModal {
  /deep/ .ivu-modal-body {
    padding: 0 16px;
  }
  /deep/ .ivu-modal-footer {
    padding: 0 18px;
  }
}
// 校验小红心
/deep/.validateStar .ivu-form-item-label:before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed4014;
}
// 表单 身份证
.card-num-group {
  display: inline-flex;
  width: 100%;
  position: relative;
  .not-id-people {
    position: absolute;
    right: 10px;
    top: 6px;
    border: 1px solid #0668c8;
    color: #0668c8;
    width: 60px;
    height: 20px;
    line-height: 17px;
    border-radius: 2px;
    background-color: rgba(239, 246, 253, 1);
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
  .card-num {
    margin-right: 4px;
  }
}
</style>