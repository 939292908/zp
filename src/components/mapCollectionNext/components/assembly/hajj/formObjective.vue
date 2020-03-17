<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 18:20:15
 * @LastEditTime: 2019-10-18 14:16:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <Form class="form-panel" ref="form" :model="form" :rules="rule" :label-width="100">
    <div class="panel-form">
      <!-- 身份 -->
      <div class="panel-title">成员身份</div>
      <FormItem label="成员身份" prop="peopleStatus">
        <Select :disabled="isFirst" v-model="form.peopleStatus" placeholder="请选择" filterable>
          <Option
            v-for="(item,index) in filterPeopleStatusList"
            :value="item.value"
            :key="index"
          >{{ item.displayName }}</Option>
        </Select>
        <!-- <span v-if="isFirst || disable" class="input-label">{{form.peopleStatus}}</span> -->
      </FormItem>
      <!-- 信息 -->
      <div class="panel-title">个人信息</div>
      <FormItem label="身份证号" prop="idNumber">
        <div class="card-num-group">
          <i-input
            class="card-num"
            :disabled="!hasAdd || idNumberLoading"
            v-model="form.idNumber"
            @on-blur="handleGetPersonInfoByIdNumber"
            @keyup.enter="handleGetPersonInfoByIdNumber"
          ></i-input>
          <span v-if="isAdd" class="not-id-people" @click="isShowNoIdNumberModal=true">无证人员</span>
        </div>
      </FormItem>
      <FormItem label="姓名" prop="name">
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
          <FormItem label="性别" prop="genderValue" :class="{validateStar: !isNoIdNumberAdd}">
            <Select v-model="form.genderValue" :disabled="!isNoIdNumberAdd">
              <Option
                :key="index"
                v-for="(item,index) in optionList.genderList"
                :value="item.value"
              >{{ item.displayName }}</Option>
            </Select>
            <!-- <RadioGroup v-model="form.genderValue">
            <Radio
              :key="index"
              v-for="(item,index) in optionList.genderList"
              :label="item.value"
            >{{item.displayName}}</Radio>
            </RadioGroup>-->
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem class="nationalityForm" label="民族" prop="nationalityValue" :class="{validateStar: !isNoIdNumberAdd}">
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
          :change-on-select="changeOnSelect"
          v-model="form.personStateList"
          :data="optionList.personStateList"
          :load-data="loadData"
          @on-change="handleStateChange"
          @on-visible-change="handleStateClick"
        ></Cascader>
      </FormItem>
      <!-- <FormItem label="关系/身份">
        <label>{{relationForm.relationName}}</label>
      </FormItem>-->
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
          <FormItem label="户籍地" prop="hukouAddressPath" :class="{validateStar: !isNoIdNumberAdd}">
            <!-- change-on-select -->
            <Cascader
              ref="hukouAdress"
              v-model="form.hukouAddressPath"
              :change-on-select="isNoIdNumberAdd"
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
            <i-input v-model="form.hukoudetailAddress" placeholder="请输入详细地址"></i-input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="现住址">
            <Cascader
              ref="currentAdress"
              v-model="form.currentAddressPath"
              :data="optionList.proviceAddressList"
              :load-data="loadHukouData"
              @on-change="handleCurAdressSelectChange"
              @on-visible-change="getVisibleChange"
            ></Cascader>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem>
            <i-input v-model="form.currentdetailAddress" placeholder="请输入详细地址"></i-input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="服务场所" prop="servicePlace">
        <i-input v-model="form.servicePlace"></i-input>
      </FormItem>

      <!-- 社会信息-->
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
    <!-- 添加：无证人员 模态框 -->
    <Modal
        class="noIdNumberModal"
        v-model="isShowNoIdNumberModal"
        title="无证人员"
        @on-ok="noIdNumberModalOk"
        @on-cancel="noIdNumberModalCancel"
        width="95"
        :styles="{top: '30px'}">
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
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </Form>
</template>
<script>
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import * as tool from "../../../../../tools/units.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import NoIdNumber from "../../NoIdNumber";
export default {
  name: "HajjWorkObjective",
  components: {
    TreeFilter,
    NoIdNumber
  },
  props: {
    // 是否是编辑模式,true:查看，false：可编辑
    disable: {
      type: Boolean,
      default: false
    },
    // 第一层人员数
    NodeLength: {
      type: Number,
      default: 0
    },
    // 是新增还是编辑
    isAdd: {
      type: Boolean,
      default: true
    },
    isFirst: {
      type: Boolean,
      default: true
    },
    collectId: {
      type: String,
      default: ""
    },
    personIdNumber: {
      type: String,
      default: ""
    },
    // 工作对象身份证号码
    workObjectPersonIdNumber: {
      type: String,
      default: ""
    },
    relation: {
      type: Object,
      default() {
        return null;
      }
    },
    // 人员的身份证号
    idNumber: {
      type: String,
      default: ""
    },
    // 朝觐类型 1 公朝   2  私朝
    hajjType: {
      type: String,
      default: ""
    },
  },
  data() {
    // 无证人员添加 自定义校验
    const noIdNumberValidatePass = (rule, value, callback) => {
      tool.noIdNumberValidatePass(rule, value, callback, this.isNoIdNumberAdd);
    };
    return {
      isShowNoIdNumberModal: false, // 展示 无证模态框
      tempNoIdNumber: '', // 从模态框 获取的id （模态框确认时赋给表单）
      isNoIdNumberAdd: false, // 是否是无证人员采集
      addressVisibleChange: false, // 级联选择器 地址弹窗显示状态

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
        peopleStatus: "", //成员身份
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
        currentAddress: {},
        personInfo: {}
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
      relationForm: {
        displayName: "", //身份/称谓
        displayNameCode: "", //身份/称谓
        relationName: "工作对象", //关系名称
        relationDirection: "" //关系方向
      },
      rule: {
        peopleStatus: [
          {
            required: true,
            message: "成员身份不能为空",
            trigger: "blur"
          }
        ],
        genderValue: [
          {
            validator: noIdNumberValidatePass,
            // required: true,
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
            validator: noIdNumberValidatePass,
            // required: true,
            type: "array",
            message: "户籍地不能为空",
            trigger: "change"
          }
        ],
        hukoudetailAddress: [
          {
            validator: noIdNumberValidatePass,
            // required: true,
            message: "户籍地详细地址不能为空",
            trigger: "blur"
          }
        ],
        // socialBankCard: [
        //   {
        //     pattern: /^([1-9]{1})(\d{14}|\d{18})$/,
        //     message: "银行卡号格式错误",
        //     trigger: "blur"
        //   }
        // ],
        // socialCar: [
        //   {
        //     pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
        //     message: "车牌号格式错误",
        //     trigger: "blur"
        //   }
        // ],
        // socialPhone: [
        //   {
        //     pattern: /^1[3456789]\d{9}$/,
        //     message: "电话号码格式错误",
        //     trigger: "blur"
        //   }
        // ],
        nationalityValue: {
          validator: noIdNumberValidatePass,
          // required: true,
          message: "民族不能为空",
          trigger: "change"
        }
      },
      optionList: {
        genderList: [], //性别
        peopleStatusList: [], //成员身份
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
      changeOnSelect: false
    };
  },
  computed: {
    // 其他成员编辑时 关系列表过滤工作对象选项
    filterPeopleStatusList () {
      let list = [];
      // 过滤工作对象
      list = this.isFirst ? this.optionList.peopleStatusList : this.optionList.peopleStatusList.filter(item => item.value != '12');
      // 过滤 公朝/私朝
      if (this.hajjType=='1') list = list.filter(item => (item.value != '14' && item.value != '13'));
      if (this.hajjType=='2') list = list.filter(item => item.value != '15');
      return list;
    },
    displayNameShow() {
      if (this.$route.query.step == 7) {
        return this.$parent.showEditRelation;
      } else {
        return this.isFirst;
      }
    },
    hasAdd() {
      let isAdd =
        this.$route.query.step == 7
          ? this.$parent.$parent.isAddTwo
          : this.isAdd;
      return isAdd;
    }
  },
  created() {
    // 如果第一次添加人员，默认头目
    // if (this.$route.query.step==1) { this.setPeopleStatusNoEditor() };
    // if (this.isFirst) { this.setPeopleStatusNoEditor() };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getOptionList();
      this.getDisplayList();
      let isAdd =
        this.$route.query.step == 2
          ? this.$parent.$parent.isAddTwo
          : this.isAdd;
      if (!isAdd) {
        // 获取表单的数据
        this.handleGetPersonInfoByIdNumber();
      }
    },
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
      // 赋值对应参数
      cityCodeArr.forEach((item, index)=> {
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
      })
      // 获取对应城市的字典项
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
    // 上传头像change事件
    handleChange($event) {
      // 1、参数
      let me = this;
      let getLocalImgSrc = imgSrc => me.imgSrc = imgSrc; // 获取图片本地地址
      let opt = {
        event: $event, // 1.1 事件对象
        me: me, // 1.2 
        refInput: me.$refs.input, // 1.3 绑定的input表单
        fileName: me.form.idNumber, // 1.4 文件起名
        apiFn: apis.POST_ONLINE_UPLOAD_FILE, // 1.5 上传接口
        getLocalImgSrc, // 1.6 获取图片本地地址
      }
      // 2、上传
      tool.uploadUserPic(opt)
      .then( res => { // 3、成功后得到图片地址
        me.$refs.input.value = null;
        if (res.code == 200) {
          me.form.picUrl = res.data[0];
        } else {
          me.$Message.error(res.msg);
        }
      })
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
    // 获取 普通清单
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
      //案件处理结果
      tool.getCaseResultList(this).then(res => { this.optionList.caseResultList = res });
    },
    // 获取 身份关系清单
    getDisplayList() {
      const me = this;
      let mapType = this.$route.query.mapType;
      tool.getDisplayList(mapType).then(res => {
        let arr = res[0].data.map(x => {
          return {
            value: x.id,
            displayName: x.displayName,
            id: x.typeId,
            name: x.name
          };
        });
        // 获取
        this.optionList.peopleStatusList = arr;
        // 第一次添加时 默认选中
        if (me.NodeLength == 0) {
          me.setPeopleStatusActive(arr[0].value);
        }
      });
    },

    // 获取人员信息
    handleGetPersonInfoByIdNumber() {
      let idNumber = this.form.idNumber || this.$parent.$parent.idNumber;
      let collectId = this.$route.query.collectId;
      if (!idNumber) return;
      apis.GET_NEW_PERSON_INFO_BY_ID(idNumber, collectId).then(res => {
        if (res.code == 200) {
          this.bindFormValue(res.data);
          this.$nextTick(() => this.handleFormValidate());
        } else {
          this.form.genderValue = tool.getGenderByIdNumber(idNumber); // 男"0" / 女"1"
        }
      });
    },
    // 人员状态 change 事件
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
    // 绑定表单的值
    bindFormValue(form) {
      let data = this.form;
      console.log(data, form, form.personCaseInfo);
      // 人员状态
      data.personStateList = [];
      if (form.personInfo && form.personInfo.stateValue) {
        data.personStateList.push(form.personInfo.stateValue);
      }
      if (form.stateDetailValue) {
        data.personStateList.push(form.personInfo.stateDetailValue);
      }
      //
      data.currentdetailAddress = form.personInfo.currentAddress ? form.personInfo.currentAddress.detailAddress : "";
      data.hukoudetailAddress = form.personInfo.hukouAddress ? form.personInfo.hukouAddress.detailAddress : "";

      data.hukouAddress = form.personInfo.hukouAddress;
      data.currentAddress = form.personInfo.currentAddress;
      // data.peopleStatus = '9';//成员身份（头目/...）
      data.personTagList = form.personInfo.personTagId ? form.personInfo.personTagId.split(",") : [];
      data.fiveOnePropertyList = form.personInfo.fiveOnePropertyValue ? form.personInfo.fiveOnePropertyValue.split(",") : [];
      
      // 男"0" / 女"1"
      if (!form.personInfo.genderValue && form.personInfo.genderValue!==0) form.personInfo.genderValue = tool.getGenderByIdNumber(form.personInfo.idNumber);

      this.form = Object.assign(data, form.personInfo);
      console.log(data, form.personInfo.hukouAddress, this.form);
      // 头像
      this.imgSrc = this.getImagePath(form.personInfo.picUrl);
      // 户籍地
      this.hukouAddress = form.personInfo.hukouAddress
        ? Object.assign(this.hukouAddress, form.personInfo.hukouAddress)
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
      // 现住地
      this.currentAddress = form.personInfo.currentAddress
        ? Object.assign(this.currentAddress, form.personInfo.currentAddress)
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
      this.form.personInfo.currentvillageCodeDiaplayName = this.currentAddress.addressTierPath;
      // 数组
      let hukouArr = this.hukouAddress.addressCodeTierPath
        ? this.hukouAddress.addressCodeTierPath.split("/")
        : [];
      let currentArr = this.currentAddress.addressCodeTierPath
        ? this.currentAddress.addressCodeTierPath.split("/")
        : [];
      // 绑定到表单
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
        this.$nextTick(() => {
          this.$refs["form"].validateField("personStateList", error => {});
        });
      });
    },
    // 保存
    save() {
      let me = this;
      let isAdd =
        this.$route.query.step == 2
          ? this.$parent.$parent.isAddTwo
          : this.isAdd;
      let data = {};
      let collectId = this.collectId || this.$route.query.collectId;
      if (!collectId) {
        return;
      }
      data.collectId = collectId;
      // data.workObjectPersonIdNumber = isAdd ? this.workObjectPersonIdNumber : this.personIdNumber;
      data.workObjectPersonIdNumber = this.workObjectPersonIdNumber;
      var relation = null;
      console.log(me.optionList.peopleStatusList, me.form.peopleStatus);

      relation = {
        displayName: me.optionList.peopleStatusList.filter(
          item => item.value == me.form.peopleStatus
        )[0].displayName,
        relationDirection: null,
        relationName: me.optionList.peopleStatusList.filter(
          item => item.value == me.form.peopleStatus
        )[0].displayName,
        relationType: me.form.peopleStatus
      };
      data.relation = relation;
      let form = this.fillFormValue();
      data.newPersonInfo = form;

      data.newPersonCaseInfo = null;
      let req = !isAdd ? apis.NEW_PATCH_PERSON_INFO : apis.POST_MAP_RELATION;
      // let req = apis.POST_MAP_RELATION;
      var promise = new Promise(async (resolve, reject) => {
        // 保存照片到库中
        // if(this.$refs.input.files[0] && this.$refs.input.files[0].name) {
        //   let resAvator = await this.postAvator();
        //   if(resAvator.code == 200) {
        //     data.newPersonInfo.picUrl = resAvator.data[0]
        //   }
        // }
        let tmpData = {};
        if (!isAdd) {
          //
          tmpData.personBaokongInfo = null;
          tmpData.personCaseInfo = null;
          tmpData.personInfo = data.newPersonInfo;

          tmpData.mapCollectId = collectId;
          tmpData.collectId = tmpData.personInfo.collectId;
          tmpData.taskId = tmpData.personInfo.taskId;
        } else {
          tmpData = data;
        }
        // console.log(tmpData, data);

        req(tmpData).then(res => {
          if (res.code == 200) {
            // 编辑时 单独调更新关系名称接口
            if (!isAdd) {
              let curentRelationItem = me.optionList.peopleStatusList.find(item => item.value == this.form.peopleStatus)
              let updateParams = {
                collectId: me.$route.query.collectId,
                displayName: curentRelationItem.displayName,
                idNumber: me.form.idNumber,
                parentIdNumber: null,
                relationName: curentRelationItem.name,
                relationType: curentRelationItem.value
              }
              console.log("更新关系参数",updateParams);
              apis.UPDATE_PERSON_RELATION_NAME(updateParams).then(res => {
                if (res.code != 200) {
                  me.$Message.warning("人员关系更新失败")
                };
              });
            }
            resolve(res);
          } else {
            reject(res);
          }
        });
      });

      // 清空 右击的对象
      me.$parent.$parent.currentRightMenuNode = null;

      return promise;
    },
    // 填充表单的值
    fillFormValue() {
      let form = this.form;
      // 五位一体
      form.fiveOnePropertyValue = form.fiveOnePropertyList.join();
      let fiveOnePropertyName = this.optionList.fiveOnePropertyList.filter(
        x => form.fiveOnePropertyList.indexOf(x.value) != -1
      );
      form.fiveOneProperty = fiveOnePropertyName.map(x => x.displayName).join();
      let genderObj = this.optionList.genderList.find(
        x => x.value == form.genderValue
      );
      // 性别
      form.gender = genderObj ? genderObj.displayName : "";
      // 民族
      let nationalityObj = this.optionList.nationalityList.find(
        x => x.value == form.nationalityValue
      );
      form.nationality = nationalityObj ? nationalityObj.displayName : "";
      // 人员状态 一级
      let personState = this.optionList.personStateList.find(
        x => x.value == form.personStateList[0]
      );
      form.state = personState ? personState.label : "";
      form.stateValue = personState ? personState.value : "";
      // 人员状态 二级
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
      //
      let personTagArr = this.optionList.personTagList.filter(
        x => form.personTagList.indexOf(x.value) != -1
      );
      form.personTagId = form.personTagList.join();
      form.personTag = personTagArr.map(x => x.displayName).join();
      //
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
      return form;
    },
    // 保存提交
    handleSubmit() {
      let me = this;
      var promise = new Promise((resolve, reject) => {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let flag = me.handleValidateInput();
            if (flag) {
              this.save()
                .then(res => {
                  resolve(res);
                })
                .catch(res => {
                  me.$Message.error("校验未通过");
                  reject(res);
                });
            } else {
              reject();
            }
          } else {
            me.$Message.error("校验未通过");
            reject();
          }
        });
      });
      return promise;
    },
    // 验证必填字段
    handleValidateInput() {
      if (!this.displayNameShow) {
        if (!this.relationForm.displayNameCode) {
          this.showDisplayNameError = true;
          return false;
        }
      }
      return true;
    },
    // 重置
    handleReset() {
      console.log(this.$refs["form"]);
      this.$refs["form"].resetFields();
      console.log("关闭1");
      this.imgSrc = "";
      this.$refs.input.value = null;
      this.showDisplayNameError = false;
      this.form.peopleStatus = "";

      this.relationForm = {
        displayName: "", //身份/称谓
        displayNameCode: "", //身份/称谓
        relationName: "工作对象", //关系名称
        relationDirection: "" //关系方向
      };
      this.form.personStateList = [];
      this.optionList.displayNameTypeList = [];
      this.form.currentAddressPath = [];
      this.form.currentdetailAddress = "";
    },
    handleFormValidate() {
      let arr = this.rule;
      Object.keys(arr).forEach(key => {
        this.$refs["form"].validateField(key, error => {});
      });
    },
    // 无证人员默认身份证号
    setCardID() {
      this.$refs.cardID.focus();
      this.form.cardID = "331003199609160219";
    },
    // 触发选择文件的事件
    handleTriggerFileEvent() {
      this.$refs.input.click();
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
      if (value.length == 5) {
        this.currentAddress.villageCode = selectedData[4].code;
        this.currentAddress.village = selectedData[4].label;
      }
      this.currentAddress.addressCodeTierPath = value.join("/");
      this.currentAddress.addressTierPath = selectedData
        .map(x => x.label)
        .join("/");
      // this.currentAddress.villageCode = cur.code;
      // this.currentAddress.village = cur.title;
      // this.currentAddress.addressCodeTierPath = cur.path.id;
      // this.currentAddress.addressTierPath = cur.path.title;
    },
    handleDisplayNameChange(cur) {
      // 显示关系身份
      let displayNameObj = this.optionList.displayNameTypeList.find(
        x => x.id == cur
      );
      this.relationForm.relationName = displayNameObj
        ? displayNameObj.name
        : "";
      if (cur) {
        this.showDisplayNameError = false;
      }
    },
    // 设置默认选中
    setPeopleStatusActive(type) {
      this.form.peopleStatus = type + "";
    }
  },
  watch: {
    "form.peopleStatus": {
      handler(val) {
        // 添加:人员请求时，身份关系参数
        this.relationForm.displayNameCode = val;
        let peopleStatusList = this.optionList.peopleStatusList.filter(
          item => item.value == val
        )[0];
        if (peopleStatusList) {
          this.relationForm.displayName = peopleStatusList.displayName;
        }
      },
      deep: true,
      immediate: false
    },
    relation: {
      handler(val) {
        if (val && val.relationType) {
          this.setPeopleStatusActive(val.relationType);
        }
      },
      deep: true,
      immediate: true
    },
    idNumber: {
      handler(val) {},
      immediate: true
    },
    'form.idNumber': {
      handler(val) {
        // 是否是无证人员
        this.isNoIdNumberAdd = tool.isNoIdNumberPeopleByIdNumber(val);
        // 添加模式 并且 是正常人员
        if (this.isAdd && !this.isNoIdNumberAdd) {
          this.form.genderValue = tool.getGenderByIdNumber(val); // 根据身份证 带出性别
        }
      },
      immediate: true
    },
    collectId: {
      handler(val) {},
      immediate: true
    },
    // "$parent.$parent.$parent.showWorkObjective": {
    //   handler(val) {
    //     console.log("加载$parent.$parent.$parent.showWorkObjective");
    //     if (val) {
    //       this.init();
    //     }
    //   },
    //   immediate: true
    // },
    "$parent.$parent.showWorkObjective": {
      handler(val) {
        console.log("加载$parent.$parent.showWorkObjective");
        if (val) {
          this.init();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less">
@import "../css/form.less";
</style>
