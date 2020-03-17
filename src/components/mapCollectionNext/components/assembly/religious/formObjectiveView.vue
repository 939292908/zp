<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-18 21:45:34
 * @LastEditTime: 2019-11-15 13:30:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="form-objective-view">
    <!-- 人员基础信息 -->
    <div class="person-info">
      <div class="form-item profile-info">
        <div class="form-label">
          <div class="avator-image">
            <img v-if="this.idNumber" v-lazy="formatPicUrl" />
          </div>
        </div>
        <div class="form-content">
          <div class="profile">
            <div>{{form.name}}</div>
            <div>{{form.idNumber}}</div>
            <div>
              <span class="gender">{{form.gender}}</span>
              <span>{{form.nationality}}</span>
            </div>
            <div>户籍地：{{(form.hukouAddress && form.hukouAddress.addressTierPath || "") + "" + (form.hukouAddress && form.hukouAddress.detailAddress || "")}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 人员标签容器 -->
    <div class="person-label">
      <div class="labels" :key="index" v-for="(item,index) in form.personTagInfo">
        <span
          :title="item.tagName"
          :style="{'background':'#'+item.tagColor,'color':'#'+item.fontColor}"
        >{{item.tagName}}</span>
      </div>
    </div>
    <!-- 人员简介和其他信息 -->
    <div class="panel-title panel-info border">基础信息</div>
    <div class="form-info">
      <div class="form-item">
        <div class="form-label">人员状态：</div>
        <div class="form-content">
          <span
            class="personState"
            :style="{'background':$config.personLabel[form.state]}"
          >{{form.state}} - {{form.stateDetail}}</span>
        </div>
      </div>
      <!-- <div class="form-item">
        <div class="form-label">关系/身份：</div>
        <div class="form-content">{{form.relationName}}</div>
      </div>-->
      <div class="form-item">
        <div class="form-label">五位一体属性：</div>
        <div class="form-content">
          <i
            :key="index"
            v-for="(item,index) in form.fiveOnePropertyList"
            :class="'iveOneProperty iconfont ' + $config.tagIconFont[item]"
            :style="{'color':$config.tagColor[item]}"
          ></i>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">人员简介：</div>
        <div class="form-content">{{form.intro}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">政治面貌：</div>
        <div class="form-content">{{form.politicsStatus}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">职业：</div>
        <div class="form-content">{{form.profession}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">现住址：</div>
        <div
          class="form-content"
        >{{(form.currentAddress && form.currentAddress.addressTierPath || "") + '' + (form.currentAddress && form.currentAddress.detailAddress || "")}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">服务场所：</div>
        <div class="form-content">{{form.servicePlace}}</div>
      </div>
    </div>
    <!-- 人员学经经历 -->
    <div class="panel-title panel-info border">学经经历</div>
    <div class="form-info">
      <div class="form-item">
        <div class="form-label">学经起止时间：</div>
        <div class="form-content">
          <span>{{form.religionStartTime}}</span>
          <span>
            <i class="iconfont icon-jianhao"></i>
          </span>
          <span>{{form.religionEndTime}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">学经经过：</div>
        <div class="form-content">{{form.religionLearnProcess}}</div>
      </div>
    </div>
    <!-- 人员社会信息 -->
    <div class="panel-title panel-info border">社会信息</div>
    <div class="form-info">
      <div class="form-item">
        <div class="form-label">银行卡：</div>
        <div class="form-content">{{form.socialBankCard}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">车辆：</div>
        <div class="form-content">{{form.socialCar}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">电话：</div>
        <div class="form-content">{{form.socialPhone}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">QQ号码：</div>
        <div class="form-content">{{form.socialQq}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">微信号码：</div>
        <div class="form-content">{{form.socialWechat}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as apis from "@/api/collection/index.js";
export default {
  name: "ReligiousFormObjectiveView",
  props: {
    idNumber: {
      type: String,
      default: ""
    }
  },
  // filters: {
  //   format(val) {
  //     console.log(val);
  //     return this.$moment(val).format("YYYY-MM");
  //   }
  // },
  data() {
    return {
      form: {
        fiveOnePropertyList: [],
        fiveOnePropertyValue: "",
        fiveOneProperty: "", //五位一体显示值
        gender: "",
        genderValue: "",
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
        personTagInfo: [], //人员标签信息
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
        displayName: "", //身份/称谓
        displayNameCode: "", //身份/称谓
        relationName: "工作对象", //关系名称
        relationDirection: "", //关系方向
        religionStartTime: "", //学经开始时间
        religionEndTime: "", //学经结束时间
        religionLearnProcess: "", //学经经过
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
        }
      }
    };
  },
  computed: {
    formatPicUrl() {
      return this.getImagePath(this.form.picUrl);
    }
  },
  mounted() {},
  methods: {
    // 回车或者失去焦点（blur）
    getPersonInfoByIdNumber() {
      let idNumber = this.idNumber;
      let collectId = this.$route.query.collectId;
      if (idNumber) {
        apis.GET_NEW_PERSON_INFO_BY_ID(idNumber, collectId).then(res => {
          if (res.code == 200) {
            this.bindFormValue(res.data.personInfo);
          }
        });
      }
    },
    // 绑定表单的值
    bindFormValue(form) {
      let data = {};
      data.personStateList = [form.stateValue, form.stateDetailValue];
      data.personTagList = form.personTag ? form.personTag.split(",") : [];
      data.fiveOnePropertyList = form.fiveOneProperty
        ? form.fiveOneProperty.split(",")
        : [];
      data.religionStartTime = form.religionStartTime
        ? this.$moment(form.religionStartTime).format("YYYY-MM")
        : "";
      data.religionEndTime = form.religionEndTime
        ? this.$moment(form.religionEndTime).format("YYYY-MM")
        : "";
      this.form = Object.assign(form, data);
    }
  },
  watch: {
    collectId: {
      handler(val) {},
      immediate: true
    },
    idNumber: {
      handler(val) {
        console.log("idNumber  asasdasd", val);
        this.getPersonInfoByIdNumber();
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.form-objective-view {
  padding: 10px 20px;
}
/deep/ .form-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  .form-label {
    color: #aaaaaa;
    font-size: 14px;
    padding: 10px 12px 10px 0;
    width: 120px;
    text-align: right;
    line-height: 1;
    display: inline-block;
    flex: 0 0 120px;
  }
  .form-content {
    color: #666666;
    font-size: 14px;
    display: inline-block;
  }
}
.profile-info {
  display: flex;
  align-items: center;
  .avator-image {
    width: 74px;
    height: 96px;
    background: #ddd;
    margin-left: 20px;
    border-top: 1px solid #ddd;
    padding: 2px;
    img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .profile {
    > div {
      padding-bottom: 4px;
    }
    .gender {
      margin-right: 15px;
    }
  }
}
.person-label {
  display: inline-flex;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  flex-wrap: wrap;

  .labels {
    width: 30%;
    margin: 0 10px 5px 0;

    span {
      width: 100%;
      display: inline-block;
      border-radius: 4px;
      padding: 2px 3px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: default;
    }
  }
}
.personState {
  padding: 2px 12px;
  border-radius: 3px;
  color: #ffffff;
}
.iveOneProperty {
  font-size: 24px;
}

.border {
  border-left: 4px solid #0090ea;
  text-align: left;
}
.panel-info {
  color: #333333;
  font-size: 16px;
}
.panel-title {
  padding: 0 10px;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  color: #666666;
  height: 21px;
}
</style>
