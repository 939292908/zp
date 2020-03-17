<!--
 * @Author: your name
 * @Date: 2019-11-21 11:57:00
 * @LastEditTime: 2019-12-02 14:28:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\components\verifyInfo\addCaseInfo.vue
 -->
<template>
  <div class="verifyLayout-box">
    <div class="left-anchor">
      <Anchor show-ink container=".right-form">
        <AnchorLink href="#verifyInfo" title="核实身份" />
        <AnchorLink href="#personInfo" title="人员基本信息" />
      </Anchor>
    </div>
    <div class="right-form">
      <!-- 大表单form -->
      <Form ref="form" :model="form" :rules="rule" :label-width="115">
        <!-- form-Top -->
        <div class="infoItem" id="verifyInfo">
          <!-- 头部 -->
          <div class="form-header">
            <div class="title"> 核实身份<span class="notice-info">（<span class="red">*</span>为必填项）</span></div>
            <div v-if="query.auditComment" class="btn-box"><Button size="small" @click="modalShow.reasonModalShow = true" ><Icon type="ios-alert-outline" class="back-icon"/>退回原因</Button> </div>
          </div>
          <!-- 表单 -->
          <div class="form-content">
              <Row>
                <Col span="8" offset="4">
                  <FormItem label="需落查" prop="needCollect" placeholder="是否需落查" >
                    <i-col span="12">
                      <Select :disabled="isDisabled" v-model="form.needCollect" placeholder="是否需落查" @on-change="needVerifyChange">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                      </Select>
                    </i-col>
                  </FormItem>
                  <!-- <FormItem label="真实身份证号" prop="realIdNumber" :class="{validateStar: isNeedCollect}"> -->
                  <FormItem label="真实身份证号" prop="realIdNumber">
                    <i-input 
                    :disabled="!isNeedCollect || isDisabled" 
                    type="text" 
                    v-model="form.realIdNumber" 
                    @on-blur="getPersonInfoByIdNumber(form.realIdNumber)"
                    @keyup.enter="getPersonInfoByIdNumber(form.realIdNumber)"
                    placeholder="请输入真实身份证号"></i-input>
                  </FormItem>

                  <!-- <FormItem label="真实姓名" prop="realName" :class="{validateStar: isNeedCollect}"> -->
                  <FormItem label="真实姓名" prop="realName">
                    <!-- :disabled="!isNeedCollect|| isDisabled"  -->
                    <i-input 
                    :disabled="isDisabled" 
                    type="text" 
                    v-model="form.realName" 
                    placeholder="请输入真实姓名"></i-input>
                  </FormItem>
                </Col>

                <Col span="8" >
                  <FormItem label="核实经过" prop="verifyRecord">
                    <i-input 
                    :disabled="isDisabled"
                    v-model="form.verifyRecord" 
                    type="textarea" 
                    :autosize="{minRows: 6.6,maxRows: 6.6}" 
                    placeholder="请输入核实经过"></i-input>
                  </FormItem>
                </Col>
              </Row>
          </div>
        </div>

        <!-- form-Bottom -->
        <div class="infoItem" id="personInfo">
          <!-- title -->
          <div class="form-header">
            <div class="title">
              人员基本信息<span class="notice-info">（<span class="red">*</span>为必填项）</span>
            </div>
          </div>
          <!-- 表单 -->
          <div class="form-content">
            <div class="form-panel" >
              <div class="panel-form">
                <!-- 信息 -->
                <div class="panel-title">个人信息</div>
                <!-- 虚拟 -->
                <div class="virtual-box">
                  <FormItem label="虚拟身份证号" prop="idNumber">
                    <div class="card-num-group">
                      <i-input
                        :disabled="true"
                        class="card-num"
                        v-model="form.idNumber"
                      ></i-input>
                    </div>
                  </FormItem>
                  <FormItem label="虚拟姓名" prop="name">
                    <!-- <i-input :disabled="isNeedCollect || isDisabled" v-model="form.name"></i-input> -->
                    <i-input :disabled="true" v-model="form.name"></i-input>
                  </FormItem>
                </div>
                <!-- 真实 -->
                <!-- <div class="real-box" v-if="isNeedCollect"> -->
                <div class="real-box">
                  <!-- <FormItem label="真实身份证号" prop="realIdNumber" :class="{validateStar: isNeedCollect}"> -->
                  <FormItem label="真实身份证号" :class="{validateStar: isNeedCollect}">
                    <div class="card-num-group">
                      <i-input disabled v-model="form.realIdNumber"></i-input>
                    </div>
                  </FormItem>
                  <!-- <FormItem label="真实姓名" prop="realName" :class="{validateStar: isNeedCollect}"> -->
                  <FormItem label="真实姓名" :class="{validateStar: isNeedCollect}">
                    <i-input disabled v-model="form.realName"></i-input>
                  </FormItem>
                </div>
                <FormItem label="照片" prop="picUrl">
                  <div class="upload-avator-wrapper">
                    <label for="file" class="upload-avator">
                      <img v-if="imgSrc" :src="imgSrc" alt class="picture" />
                      <Icon v-if="!imgSrc" type="ios-image" size="30" />
                      <input
                        :disabled="isDisabled"
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
                        :disabled="isDisabled"
                        size="small"
                        class="upload-avator-button"
                        @click.native="handleTriggerFileEvent"
                      >上传<Icon class="upload-avator-button-icon" type="md-cloud-upload" />
                      </Button>
                    </div>
                  </div>
                </FormItem>
                <Row>
                  <Col span="12">
                    <FormItem label="性别" prop="genderValue" :class="{validateStar: !isNoIdNumberAdd}">
                      <Select 
                      :disabled="!isNoIdNumberAdd || isDisabled"
                      v-model="form.genderValue"
                      >
                        <Option
                          :key="index"
                          v-for="(item,index) in optionList.genderList"
                          :value="item.value"
                        >{{ item.displayName }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem class="nationalityForm" label="民族" prop="nationalityValue" :class="{validateStar: !isNoIdNumberAdd}">
                      <Select :disabled="isDisabled" v-model="form.nationalityValue" filterable>
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
                  <Select :disabled="isDisabled" v-model="form.personTagList" multiple filterable placeholder="请选择标签(支持多选)">
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
                    :disabled="isDisabled"
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
                    :disabled="isDisabled"
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
                    :disabled="isDisabled"
                    v-model.trim="form.intro"
                    type="textarea"
                    :autosize="{minRows: 3,maxRows: 6}"
                    placeholder="请输入人员简介"
                  ></i-input>
                </FormItem>
                <FormItem label="政治面貌" prop="politicsStatusValue">
                  <Select :disabled="isDisabled" v-model="form.politicsStatusValue">
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
                  <Select :disabled="isDisabled" v-model="form.professionValue" filterable>
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
                        :disabled="isDisabled"
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
                    <FormItem prop="hukoudetailAddress">
                      <i-input :disabled="isDisabled" v-model="form.hukoudetailAddress" placeholder="请输入详细地址"></i-input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem label="现住址">
                      <Cascader
                        :disabled="isDisabled"
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
                      <i-input :disabled="isDisabled" v-model="form.currentdetailAddress" placeholder="请输入详细地址"></i-input>
                    </FormItem>
                  </Col>
                </Row>
                <FormItem label="服务场所" prop="servicePlace">
                  <i-input :disabled="isDisabled" v-model="form.servicePlace"></i-input>
                </FormItem>

                <!-- 社会信息-->
                <div class="panel-title">社会信息</div>
                <FormItem label="银行卡" prop="socialBankCard">
                  <i-input :disabled="isDisabled" v-model="form.socialBankCard"></i-input>
                </FormItem>
                <FormItem label="车辆" prop="socialCar">
                  <i-input :disabled="isDisabled" v-model="form.socialCar"></i-input>
                </FormItem>
                <FormItem label="电话" prop="socialPhone">
                  <i-input :disabled="isDisabled" v-model="form.socialPhone"></i-input>
                </FormItem>
                <FormItem label="QQ号码" prop="socialQq">
                  <i-input :disabled="isDisabled" v-model="form.socialQq"></i-input>
                </FormItem>
                <FormItem label="微信号码" prop="socialWechat">
                  <i-input :disabled="isDisabled" v-model="form.socialWechat"></i-input>
                </FormItem>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>

    <!-- 底部 -->
    <div class="footer-action">
      <Button v-if="type=='1'" type="primary" @click="handleSubmit">提交审核</Button>
      <Button v-if="type=='3'" type="primary" @click="modalShow.passModalShow=true">通过</Button>
      <Button v-if="type=='3'" type="error" @click="modalShow.sendBackModalShow=true">退回</Button>
      <Button @click="handleClose">取消</Button>
    </div>

    <!-- 弹框-退回原因 -->
    <Panel class="reason" :isShowModal="modalShow.reasonModalShow" :ok="cancelReasonModal" :showCancelBtn="false" okBtnText="关闭" title="退回原因">
      <div class="text">{{query.auditComment}}</div>
      <div class="info">
        <span>{{query.auditDeptName}}</span>
        <span>{{query.lastAuditUser}}</span>
        <!-- <span>18057416824</span> -->
      </div>
    </Panel>
    <!-- 弹框-审核通过 -->
    <Panel :isShowModal="modalShow.passModalShow" :ok="okPassModal" :cancel="cancelPassModal" okBtnText="确认通过" title="确认通过">
      <Row class="passModal-title">
        <i-col span="10" offset="5">虚拟身份</i-col>
        <i-col span="8">真实身份</i-col>
      </Row>
      <Row class="passModal-text">
        <i-col span="5">姓名： </i-col>
        <i-col span="10">{{form.name}}</i-col>
        <i-col span="8" class="icon-box"><Icon class="icon" type="md-arrow-forward"/>{{form.realName}}</i-col>
      </Row>
      <Row class="passModal-text">
        <i-col span="5">身份证号： </i-col>
        <i-col span="10">{{form.idNumber}}</i-col>
        <i-col span="8" class="icon-box"><Icon class="icon" type="md-arrow-forward" />{{form.realIdNumber}}</i-col>
      </Row>
      <div class="passModal-info">
        注意：确认通过后将会更新该人员相关的所有图谱信息，该操作不可撤销！ 确认是否通过？
      </div>
    </Panel>
    <!-- 弹框-审核退回 -->
    <Panel :isShowModal="modalShow.sendBackModalShow" :ok="oksendBackModal" :cancel="cancelsendBackModal" title="无证人员信息变更退回">
      <Form :rules="sendBackRule" :model="sendBackForm" ref="sendBackForm" :label-width="80">
        <!-- <Row>
          <i-col span="6" class="send-back-msg">退回理由</i-col>
          <i-col span="16">
            <Input v-model="sendBackForm.sendBackInfo" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="请填写退回理由的具体信息" />
          </i-col>
        </Row> -->
        <FormItem prop="sendBackInfo" label="退回理由">
          <i-input
            type="textarea"
            v-model="sendBackForm.sendBackInfo"
            style="width:260px"
            :autosize="{minRows: 4,maxRows: 4}"
            placeholder="请填写退回理由的具体信息"
          ></i-input>
        </FormItem>
       </Form>
    </Panel>
  </div>
</template>

<script>
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";
import * as tool from "../../../../../tools/units.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import Panel from "./panel";
export default {
  components: { TreeFilter, Panel },
  data() {
    // 校验真实身份证
    const realIdNumberValidatePass = (rule, value, callback) => {
      if (!(value && value.toString().length) && this.isNeedCollect) {
        callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    // 无证人员添加 自定义校验
    const noIdNumberValidatePass = (rule, value, callback) => {
      tool.noIdNumberValidatePass(rule, value, callback, this.isNoIdNumberAdd);
    };
    return {
      type: this.$route.query.type, // 1：核实 2：查看 3：审核
      query: this.$route.query, //url参数
      modalShow: {
        reasonModalShow: false, // 退回原因
        sendBackModalShow: false, // 审核退回
        passModalShow: false, // 审核通过
      },
      auditState: "", // 审核状态 0：通过 1：退回
      sendBackForm: {
        sendBackInfo: "", // 退回理由
      },
      // ===============
      form: {
        // form Top
        needCollect: "1", //需落查 1:是 2:否
        realIdNumber: "", //真实身份证号
        realName: "", //真实姓名
        verifyRecord: "", //核实经过
        // form Bottom
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
      addressVisibleChange: false, // 级联选择器 地址弹窗显示状态
      imgSrc: "",
      cityApis: comApis.GET_AREA_TREE_INFO,
      cityTreeProps: {
        children: "childAreaList",
        title: "displayName",
        id: "code"
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
      sendBackRule: {
        sendBackInfo: [
          {
            required: true,
            message: "退回理由不能为空",
            trigger: "blur"
          }
        ],
      },
      rule: {
        needCollect: [
          {
            required: true,
            message: "是否需落查",
            trigger: "blur"
          }
        ],
        realIdNumber: [
          {
            required: true,
            // validator: realIdNumberValidatePass,
            message: "真实身份证号不能为空",
            trigger: "change"
          },
          {
            // required: true,
            pattern: this.isNeedCollect ? /^(\d{17}[\d|x|X]|\d{15})$/ : /^(\d{17}[\d|x|X]|\d{15}|WZ\d{16}|Y\d{17}|0000\d{14})$/,
            message: "身份证号格式错误",
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            // validator: realIdNumberValidatePass,
            message: "姓名不能为空",
            trigger: "change"
          },
          {
            // required: true,
            pattern: /^[\u4E00-\u9FA5\·A-Za-z]+$/,
            message: "姓名中除了“·”、字母、汉字，不能出现其他特殊符号",
            trigger: "blur"
          }
        ],
        verifyRecord: [
          {
            required: true,
            message: "核实经过不能为空",
            trigger: "blur"
          }
        ],
        // ===============
        genderValue: [
          {
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
            pattern: this.$config.idNumberVerify,
            message: "身份证号格式错误",
            trigger: "blur"
          }
        ],
        name: [
          // {
          //   required: true,
          //   message: "姓名不能为空",
          //   trigger: "blur"
          // },
          // {
          //   required: true,
          //   pattern: /^[\u4E00-\u9FA5\·A-Za-z]+$/,
          //   message: "姓名中除了“·”、字母、汉字，不能出现其他特殊符号",
          //   trigger: "blur"
          // }
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
            type: "array",
            message: "户籍地不能为空",
            trigger: "change"
          }
        ],
        hukoudetailAddress: [
          {
            validator: noIdNumberValidatePass,
            required: true,
            message: "户籍地详细地址不能为空",
            trigger: "blur"
          }
        ],
        nationalityValue: {
          validator: noIdNumberValidatePass,
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
        displayNameAllTypeList: [],
        proviceAddressList: []
      },
      idNumberLoading: false,
      changeOnSelect: false
    };
  },
  computed: {
    // 是否禁用
    isDisabled() {
      return this.type != '1';
    },
    // 需落查
    isNeedCollect() {
      return this.form.needCollect=='1';
    },
    // 是否无证添加
    isNoIdNumberAdd() {
      return this.form.needCollect!='1';
    },
    // 审核中 的页面
    isVerifying() {
      return this.type=='2' || this.type=='3';
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 需落查 change 事件
    needVerifyChange(val) {
      if (val=="0") { // 否
        this.$refs["form"].validate();
        this.form.realName = this.form.name;
        this.form.realIdNumber = this.form.idNumber;
      } else {
        this.form.realName ="";
        this.form.realIdNumber ="";
      }
    },
    // 原因Modal-关闭
    cancelReasonModal() {
      this.modalShow.reasonModalShow = false;
    },
    // 提交审核
    handleSubmit() {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否提交审核</p>',
        onOk: () => {
          var promise = new Promise((resolve, reject) => {
          this.$refs["form"].validate(valid => {
            if (valid) {
              this.save()
                .then(res => resolve(res))
                .catch(res => reject(res));
            } else {
              reject();
            }
          });
        });
        return promise;
        },
        onCancel: () => {
            // this.$Message.info('Clicked cancel');
        }
      })
    },
    // 退回Modal-确认
    oksendBackModal() {
      this.$refs["sendBackForm"].validate(valid => {
        if (valid) {
          this.auditState = 1;
          this.auditApi();
          this.modalShow.sendBackModalShow = false;
        }
      })
    },
    // 关闭
    cancelsendBackModal() {
      this.modalShow.sendBackModalShow = false;
    },
    // 通过Modal-确认
    okPassModal() {
      this.auditState = 0;
      this.auditApi();
      this.modalShow.passModalShow = false;
    },
    // 关闭
    cancelPassModal() {
      this.modalShow.passModalShow = false;
    },
    // 审核接口
    auditApi() {
      let params = {
        auditState: this.auditState,
        billId: this.form.idNumber,
        comment: this.sendBackForm.sendBackInfo,
        commentId: null
      }
      apis.AUDIT_NO_IDNUMBER_PERSON_INFO(params).then(res => {
        if (res.code == 200) {
          this.$Message.success('提交成功！');
          this.handleClose();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 关闭页面
    handleClose() {
      window.opener.document.getElementById("searchBtn").click();
      window.close();
    },
    // ============= form Bottom =============
    init() {
      this.getOptionList();// 字典项
      if(this.query.idNumber) this.form.idNumber = this.query.idNumber;
      this.getPersonInfoByIdNumber();// 获取人员信息
    },
    // 获取地址弹窗状态
    getVisibleChange(value) {
      this.addressVisibleChange = value;
    },
    // 用cityCodeArr设置地址列表 (change-on-select使用)
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
    // 加载下一级'人员状态' 级联选择器
    loadData(item, callback) {
      tool.loadPersonStateData(item, callback);
    },
    // 加载下一级'户籍地址' 级联选择器
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
    // 获取人员信息
    getPersonInfoByIdNumber(idNumber) {
      let flag = !!idNumber; //是否获取的真实身份信息
      idNumber = flag ? idNumber : this.form.idNumber;
      if (!idNumber) return;
      let req = null;
      let params = null;
      if(this.isVerifying) { // 查看、审核 (页面)
        params = {
          idNumber,
          auditId: this.query.auditId
        };
        req = apis.GET_NO_IDNUMBER_PERSON_INFO;
      } else { // 提交核实 (页面)
        params = idNumber;
        req = apis.GET_NEW_PERSON_INFO_BY_ID;
      }
      req(params).then(res => {
        if (res.code == 200) {
          this.bindFormValue(res.data, flag);
          this.$nextTick(() => this.handleFormValidate());
        } else {
          this.form.genderValue = tool.getGenderByIdNumber(idNumber); // 男"0" / 女"1"
        }
      });
    },
    // 人员状态 弹框 事件
    handleStateClick(value) {
      this.changeOnSelect = value;
    },
    // 人员状态 change 事件
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
    // 请求结果 绑定到表单
    bindFormValue(form, flag) {
      let data = this.form;
      if(this.isVerifying) form = {personInfo: form}; // 审核中的页面 调了其他接口，数据要包一层
      if(flag) {
        form.personInfo.realName = form.personInfo.name; //真实姓名
        form.personInfo.idNumber = this.form.idNumber;
        form.personInfo.name = this.form.name;
      }; // 查真实idNumber，赋值真实姓名，虚拟身份证 和 姓名字段不更新
      if(form.personInfo.needCollect === 0 || form.personInfo.needCollect === 1) form.personInfo.needCollect = form.personInfo.needCollect.toString(); // 需落查
      
      console.log(data, form);

      // ============== 以下是 personInfo 的表单数据 ==============
      data.currentdetailAddress = form.personInfo.currentAddress ? form.personInfo.currentAddress.detailAddress : "";
      data.hukoudetailAddress = form.personInfo.hukouAddress ? form.personInfo.hukouAddress.detailAddress : "";
      data.hukouAddress = form.personInfo.hukouAddress;
      data.currentAddress = form.personInfo.currentAddress;
      data.personTagList = form.personInfo.personTagId ? form.personInfo.personTagId.split(",") : [];
      data.fiveOnePropertyList = form.personInfo.fiveOnePropertyValue ? form.personInfo.fiveOnePropertyValue.split(",") : [];
     
      // 男"0" / 女"1"
      if (!form.personInfo.genderValue && form.personInfo.genderValue!==0) form.personInfo.genderValue = tool.getGenderByIdNumber(form.personInfo.idNumber);

      this.form = Object.assign(data, form.personInfo);
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
      // 地址数组
      let hukouArr = this.hukouAddress.addressCodeTierPath ? this.hukouAddress.addressCodeTierPath.split("/") : [];
      let currentArr = this.currentAddress.addressCodeTierPath ? this.currentAddress.addressCodeTierPath.split("/") : [];
      // 绑定到表单
      this.form.hukouAddressPath = hukouArr;
      this.form.currentAddressPath = currentArr;
      // 初始化获取地址清单的数据 (此处调用，异步发起多个请求，比load-data更快加载所有地址)
      this.getAddress(hukouArr);
      this.getAddress(currentArr);
      this.changeOnSelect = !form.stateDetailValue;
      let stateObj = this.optionList.personStateList.find( x => x.value == form.personInfo.stateValue );
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
      let params = this.buildReqParams();
      // let req = apis.NEW_PATCH_PERSON_INFO;
      let req = apis.VERIFY_NO_IDNUMBER;
      var promise = new Promise((resolve, reject) => {
        console.log(params);
        req(params).then(res => {
          if (res.code == 200) {
            me.$Message.success("提交成功!");
            resolve(res);
            this.handleClose();
          } else {
            me.$Message.error(res.msg ? res.msg : "提交失败!");
            reject(res);
          }
        });
      });
      return promise;
    },
    // 填充表单的值
    buildReqParams() {
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
      // 城市分级赋值
      let cityCodeArr = form.hukouAddress.addressCodeTierPath.split("/");
      let cityArr = form.hukouAddress.addressTierPath.split("/");
      // 赋值对应参数
      cityCodeArr.forEach((item, index)=> {
        if (index == 0) {
          form.hukouAddress.provinceCode = item;
          form.hukouAddress.province = cityArr[index];
        }
        if (index == 1) {
          form.hukouAddress.cityCode = item;
          form.hukouAddress.city = cityArr[index];
        }
        if (index == 2) {
          form.hukouAddress.countyCode = item;
          form.hukouAddress.county = cityArr[index];
        }
        if (index == 3) {
          form.hukouAddress.townCode = item;
          form.hukouAddress.town = cityArr[index];
        }
        if (index == 4) {
          form.hukouAddress.villageCode = item;
          form.hukouAddress.village = cityArr[index];
        }
      })
      return form;
    },
    // 重置
    handleReset() {
      console.log(this.$refs["form"]);
      this.$refs["form"].resetFields();
      console.log("关闭1");
      this.imgSrc = "";
      this.$refs.input.value = null;

      this.form.personStateList = [];
      this.form.currentAddressPath = [];
      this.form.currentdetailAddress = "";
    },
    // 校验表单
    handleFormValidate() {
      let rule = this.rule;
      Object.keys(rule).forEach(key => {
        if(key!='realIdNumber' && key!='realName' && key!='verifyRecord') {
          this.$refs["form"].validateField(key, error => {});
        }
      });
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
      // this.hukouAddress.villageCode = cur.code;
      // this.hukouAddress.village = cur.title;
      // this.hukouAddress.addressCodeTierPath = cur.path.id;
      // this.hukouAddress.addressTierPath = cur.path.title;
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
  },
};
</script>

<style lang="less" scoped>
@import "../css/form.less";
.back-icon {
  font-size: 16px!important;
  color: #ed4014!important;
  font-weight: 700;
  margin-right: 4px;
  margin-top: -3px;
}
// 退回原因
.reason {
  .text {
    font-size: 14px;
    color: #666;
    line-height: 28px;
    padding: 0 6px;
  }
  .info {
    font-size: 12px;
    color: #999;
    text-align: right;
    padding-top: 16px;
    > span {
      padding: 0 8px 0 4px;
    }
    > span:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }
}
// 审核退回
.send-back-msg {
  text-align: right;
  color: #666;
  padding-right: 22px;
}
// 审核通过
.passModal-title {
  margin: 4px 0 10px;
  // font-size: 14px;
  color: #101010;
  font-weight: 700;
}
// 审核通过
.passModal-text {
  color: #666;
  margin-bottom: 10px;
  .icon-box {
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
// 审核通过
.passModal-info {
  padding: 14px 18px;
  line-height: 26px;
  border-radius: 4px;
  background-color: rgba(255, 244, 231, 1);
  color: rgba(237, 143, 33, 1);
  font-size: 14px;
}
</style>
