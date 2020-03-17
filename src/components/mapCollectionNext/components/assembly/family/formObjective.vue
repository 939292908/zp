<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 18:20:15
 * @LastEditTime: 2019-11-13 10:35:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <Form class="form-panel" ref="form" :model="form" :rules="rule" :label-width="100">
    <div class="panel-form">
      <div class="panel-title" v-if="!displayNameShow">关系信息</div>
      <FormItem class="ivu-form-item-required" v-if="!displayNameShow" label="身份/称谓">
        <Select
          :disabled="!hasAdd"
          v-model="relationForm.displayNameCode"
          @on-change="handleDisplayNameChange"
        >
          <Option
            :key="index"
            v-for="(item,index) in optionList.displayNameTypeList"
            :value="item.id"
          >{{ item.displayName }}</Option>
        </Select>
        <div v-if="showDisplayNameError" class="ivu-form-item-error-tip">身份/称谓不能为空</div>
      </FormItem>
      <div class="panel-title">人员信息</div>
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
          <!-- <Button :disabled="idNumberLoading" @click.native="getNoIdNumber">无证人员</Button> -->
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
          ref="personState"
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
          <FormItem label="现住址" prop="currentAddressPath">
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
  name: "FamilyFormObjective",
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
    }
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
      relationForm: {
        displayName: "", //身份/称谓
        displayNameCode: "", //身份/称谓
        relationName: "工作对象", //关系名称
        relationDirection: "" //关系方向
      },
      rule: {
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
        // currentAddressPath: [
        //   {
        //     required: true,
        //     type: "array",
        //     message: "现住址不能为空",
        //     trigger: "change"
        //   }
        // ],
        // currentdetailAddress: [
        //   {
        //     required: true,
        //     message: "现住址详细地址不能为空",
        //     trigger: "blur"
        //   }
        // ],
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
    displayNameShow() {
      return this.$route.query.step == 2
        ? this.$parent.$parent.showEditRelation
        : this.isFirst;
    },
    hasAdd() {
      let isAdd =
        this.$route.query.step == 2
          ? this.$parent.$parent.isAddTwo
          : this.isAdd;
      return isAdd;
    }
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
    // 身份关系清单
    getDisplayList() {
      const me = this;
      let mapType = me.$parent.curSelectTp || me.$route.query.mapType || "2";
      tool.getDisplayList(mapType).then(res => {
        me.displayNameAllTypeList = res[0].data;
        let displayNameTypeListTmp = res[0].data;
        if (me.relation) {
          let arr = [];
          let writeList = [];
          switch (me.relation.type) {
            case "top":
              writeList = ["64", "65"];
              break;
            case "right":
              writeList = ["3", "4"];
              break;
            case "bottom":
              writeList = ["5", "6"];
              break;
            case "-1": //如果右键编辑节点，type设置为-1，这身份/称谓字段不能编辑
              writeList = [];
              break;
          }
          if (writeList.length > 0) {
            arr = displayNameTypeListTmp.filter(
              x => writeList.indexOf(x.id) != -1
            );
          } else {
            arr = displayNameTypeListTmp;
          }
          me.optionList.displayNameTypeList = arr;
          let isAdds =
            me.$route.query.step == 2
              ? me.$parent.$parent.isAddTwo
              : me.isAdd;
          if (isAdds) {
            if (me.optionList.displayNameTypeList.length > 0) {
              if (me.relation.type == "right") {
                //配偶
                me.relationForm.displayNameCode = "4";
              } else {
                me.relationForm.displayNameCode = me.optionList.displayNameTypeList[0].id;
              }
              me.handleValidateInput();
            }
          } else {
            if (me.relation.node) {
              // 判断一下编辑的节点是不是第一个父节点
              let node = me.relation.node;
              let gxmc = node.data.gxmc;
              if (!gxmc && node.parent && (node.parent.data.nodeType == "QB" || node.parent.data.nodeType == 'QB_ZP_TP')) {
                if (node.data.properties.GENDER == "男") {
                  gxmc = "父亲";
                } else {
                  gxmc = "母亲";
                }
              } 
              let displayNameObj = me.optionList.displayNameTypeList.find(
                x => x.displayName == gxmc
              );
              if (displayNameObj)
                me.relationForm.displayNameCode = displayNameObj.id;
              me.handleValidateInput();
            }
          }
        }
      });
    },

    // 回车或者失去焦点（blur）
    handleGetPersonInfoByIdNumber() {
      let idNumber = this.form.idNumber || this.$parent.$parent.idNumber;
      let collectId = this.$route.query.collectId;
      if (!idNumber) return;
        apis.GET_NEW_PERSON_INFO_BY_ID(idNumber, collectId).then(res => {
          if (res.code == 200) {
            this.bindFormValue(res.data.personInfo);
            this.$nextTick(() => this.handleFormValidate());
          } else {
            this.form.genderValue = tool.getGenderByIdNumber(idNumber); // 男"0" / 女"1"
          }
        });
    },
    // 绑定表单的值
    bindFormValue(form) {
      let data = this.form;
      data.currentdetailAddress = form.currentAddress ? form.currentAddress.detailAddress : "";
      data.hukoudetailAddress = form.hukouAddress ? form.hukouAddress.detailAddress : "";

      data.hukouAddress = form.hukouAddress;
      data.currentAddress = form.currentAddress;
      data.personTagList = form.personTagId ? form.personTagId.split(",") : [];
      data.fiveOnePropertyList = form.fiveOnePropertyValue ? form.fiveOnePropertyValue.split(",") : [];

      // 男"0" / 女"1"
      if (!form.genderValue && form.genderValue!==0) form.genderValue = tool.getGenderByIdNumber(form.idNumber);

      this.form = Object.assign(data, form);
      this.imgSrc = this.getImagePath(form.picUrl);
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
      if (this.relationForm.displayNameCode && this.relation) {
        let displayNameObj = this.optionList.displayNameTypeList.find(
          x => x.id == this.relationForm.displayNameCode
        );
        let type = "";
        if (this.relation.type == "top") type = "UP"; //向上关系
        if (this.relation.type == "right") type = "PARALLEL"; //平行关系
        if (this.relation.type == "bottom") type = "DOWN"; //向下关系
        if (this.relation.type == "left") type = "PARALLEL"; //平行关系
        relation = {
          displayName: displayNameObj.displayName,
          relationDirection: type,
          relationName: displayNameObj.name
        };
      }
      data.relation = relation;
      let form = this.fillFormValue();
      data.newPersonInfo = form;
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
          tmpData = {
            collectId: data.newPersonInfo.collectId,
            mapCollectId: collectId,
            personBaokongInfo: null,
            personCaseInfo: null,
            personInfo: data.newPersonInfo,
            taskId: data.newPersonInfo.taskId
          };
        } else {
          tmpData = data;
        }
        req(tmpData).then(res => {
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
      form.stateDetail = "";
      form.stateDetailValue = "";
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
      return form;
    },
    // 保存提交
    handleSubmit() {
      var promise = new Promise((resolve, reject) => {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let flag = this.handleValidateInput();
            if (flag) {
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
          } else {
            reject(false);
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
      this.$refs["form"].resetFields();
      this.imgSrc = "";
      this.$refs.input.value = null;
      this.showDisplayNameError = false;
      this.relationForm = {
        displayName: "", //身份/称谓
        displayNameCode: "", //身份/称谓
        relationName: "工作对象", //关系名称
        relationDirection: "" //关系方向
      };
      this.form.personStateList = [];
      this.optionList.displayNameTypeList = [];
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
  },
  watch: {
    relation: {
      handler(val) {},
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
    "$parent.$parent.showWorkObjective": {
      handler(val) {
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
