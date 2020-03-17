<!--
 * @Author: your name
 * @Date: 2019-12-16 16:18:16
 * @LastEditTime: 2019-12-18 18:17:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\CommitteeLedger\detail\basicInfoForm.vue
 -->
<template>
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
        <i-input v-model="form.name" disabled></i-input>
      </FormItem>
      <FormItem label="照片" prop="picUrl">
        <div class="upload-avator-wrapper">
          <label for="file" class="upload-avator">
            <img v-if="imgSrc" :src="imgSrc" alt class="picture" />
            <!-- <img v-if="form.picUrl" :src="form.picUrl" alt class="picture" /> -->
            <Icon v-if="!imgSrc" type="ios-image" size="30" />
            <input ref="input" id="file" type="file" class="upload-image-file" name="file" disabled />
          </label>
          <div class="upload-action">
            <Button size="small" class="upload-avator-button" disabled>
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
            <Select v-model="form.nationalityValue" filterable disabled>
              <Option
                disabled
                :key="index"
                v-for="(item,index) in optionList.nationalityList"
                :value="item.value"
              >{{ item.displayName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="标签" prop="personTagList" class="personTags">
        <Select v-model="form.personTagList" disabled multiple filterable placeholder="请选择标签(支持多选)">
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
          disabled
          ref="personState"
          v-model="form.personStateList"
          :data="optionList.personStateList"
          :load-data="loadData"
          :change-on-select="changeOnSelect"
          @on-visible-change="handleStateClick"
        ></Cascader>
      </FormItem>
      <FormItem label="五位一体属性" prop="fiveOnePropertyList">
        <Select
          disabled
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
          disabled
          v-model.trim="form.intro"
          type="textarea"
          :autosize="{minRows: 3,maxRows: 6}"
          placeholder="请输入人员简介"
        ></i-input>
      </FormItem>
      <FormItem label="政治面貌" prop="politicsStatusValue">
        <Select disabled v-model="form.politicsStatusValue">
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
        <Select disabled v-model="form.professionValue" filterable>
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
              disabled
              ref="hukouAdress"
              v-model="form.hukouAddressPath"
              :data="optionList.proviceAddressList"
            ></Cascader>
          </FormItem>
        </Col>
        <Col span="24">
          <!-- class="detail-address"
          style="padding-left:10px;"-->
          <FormItem prop="hukoudetailAddress">
            <i-input disabled v-model="form.hukoudetailAddress" placeholder="请输入详细地址"></i-input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="现住址" prop="currentAddressPath">
            <Cascader
              disabled
              ref="currentAdress"
              v-model="form.currentAddressPath"
              :data="optionList.proviceAddressList"
            ></Cascader>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem prop="currentdetailAddress">
            <i-input disabled v-model="form.currentdetailAddress" placeholder="请输入详细地址"></i-input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="服务场所" prop="servicePlace">
        <i-input disabled v-model="form.servicePlace"></i-input>
      </FormItem>
      <!-- <Divider /> -->
      <div class="panel-title">社会信息</div>
      <FormItem label="银行卡" prop="socialBankCard">
        <i-input disabled v-model="form.socialBankCard"></i-input>
      </FormItem>
      <FormItem label="车辆" prop="socialCar">
        <i-input disabled v-model="form.socialCar"></i-input>
      </FormItem>
      <FormItem label="电话" prop="socialPhone">
        <i-input disabled v-model="form.socialPhone"></i-input>
      </FormItem>
      <FormItem label="QQ号码" prop="socialQq">
        <i-input disabled v-model="form.socialQq"></i-input>
      </FormItem>
      <FormItem label="微信号码" prop="socialWechat">
        <i-input disabled v-model="form.socialWechat"></i-input>
      </FormItem>
    </div>
  </Form>
</template>

<script>
import * as tool from "@/tools/units";
import * as comApis from "@/api/common";
export default {
  name: "basicInfoForm",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      imgSrc: "",
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
      personInfoRule: {
        genderValue: [
          {
            required: true,
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
            trigger: "change"
          }
        ]
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
      changeOnSelect: false
    };
  },
  mounted() {
    this.getOptionList();
  },
  methods: {
    // 人员状态编辑
    handleStateClick(value) {
      this.changeOnSelect = value;
    },
    // 获取清单
    getOptionList() {
      //性别
      tool.getGenderList(this).then(res => {
        this.optionList.genderList = res;
      });
      //民族
      tool.getNationalityList(this).then(res => {
        this.optionList.nationalityList = res;
      });
      //标签
      tool.getPersonTagList(this).then(res => {
        this.optionList.personTagList = res;
        console.log(this.optionList.personTagList);
      });
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
      tool.getFiveOneList(this).then(res => {
        this.optionList.fiveOnePropertyList = res;
      });
      //政治面貌
      tool.getPoliticsStatusList(this).then(res => {
        this.optionList.politicsStatusList = res;
      });
      //职业
      tool.getProfessionList(this).then(res => {
        this.optionList.professionList = res;
      });
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
    loadData(item, callback) {
      tool.loadPersonStateData(item, callback);
    },
    // 绑定表单的值
    bindFormValue(form) {
      let data = this.form;
      data.currentdetailAddress = form.currentAddress
        ? form.currentAddress.detailAddress
        : "";
      data.hukoudetailAddress = form.hukouAddress
        ? form.hukouAddress.detailAddress
        : "";

      data.hukouAddress = form.hukouAddress;
      data.currentAddress = form.currentAddress;
      data.personTagList = form.personTagId ? form.personTagId.split(",") : [];
      data.fiveOnePropertyList = form.fiveOnePropertyValue
        ? form.fiveOnePropertyValue.split(",")
        : [];

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
    // 用cityCodeArr设置地址列表 (配合change-on-select使用)
    getAddress(cityCodeArr) {
      tool.setAddressByCodeArr(cityCodeArr, this.optionList.proviceAddressList);
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
      });
    }
  },
  watch: {
    data: {
      handler(val) {
        this.bindFormValue(val);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/form.less";
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
