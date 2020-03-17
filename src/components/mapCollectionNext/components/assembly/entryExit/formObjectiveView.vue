<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 06:57:19
 * @LastEditTime: 2019-11-15 13:28:44
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
    <!-- 境外涉恐涉暴人员信息 -->
    <div class="panel-title panel-info border">境外涉恐涉暴人员信息</div>
    <div class="form-info">
      <div class="form-item">
        <div class="form-label">边控情况：</div>
        <div class="form-content">{{personBaokongInfo.sideControl}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">追逃情况：</div>
        <div class="form-content">{{personBaokongInfo.pursuit}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出入境时间：</div>
        <div class="form-content">{{personBaokongInfo.outboundEntryTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境方法：</div>
        <div class="form-content">{{personBaokongInfo.outboundWay}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境通道：</div>
        <div class="form-content">{{personBaokongInfo.outboundChannel}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">暴恐人员类别：</div>
        <div class="form-content">{{personBaokongInfo.personType}}</div>
      </div>
      <div class="form-item">
        <div class="form-label" style="margin-left:-20px;flex:0 0 140px">暴恐人员境外现状：</div>
        <div class="form-content">{{personBaokongInfo.overseasStatus}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">目前所在国家：</div>
        <div class="form-content">{{personBaokongInfo.currentCountry}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出入境详情：</div>
        <div class="form-content">{{personBaokongInfo.outboundDetails}}</div>
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
  name: "FamilyFormObjectiveView",
  props: {
    idNumber: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
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
        isOverseasPerson: "", //是否是境外涉恐涉暴人员
        currentvillageCodeDiaplayName: "",
        currentdetailAddress: "",
        hukouvillageCodeDiaplayName: "",
        hukoudetailAddress: "",
        hukouAddressPath: [],
        currentAddressPath: [],
        hukouAddress: {},
        currentAddress: {},
        personCaseInfo: {}
      },
      personBaokongInfo: {
        sideControlValue: "", //边控情况
        sideControl: "", //边控情况显示
        pursuitValue: "", //追逃情况
        pursuit: "", //追逃情况显示
        outboundEntryTime: "", //出入境时间
        entryExitDate: "", //出入境日期
        entryExitTime: "", //出入境具体时间
        // outboundTypeValue: "", //出境方式
        // outboundType: "", //出境方式显示
        outboundWayValue: "", //出境方法
        outboundWay: "", //出境方法显示
        outboundChannelValue: "", //出境通道
        outboundChannel: "", //出境通道显示
        personTypeValue: "", //人员类别
        personType: "", //人员类别显示
        overseasStatusValue: "", //境外现状
        overseasStatus: "", //境外现状显示
        currentCountryValue: "", //目前所在国家
        currentCountry: "", //目前所在国家显示
        outboundDetails: "" //出入境详情
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
            this.bindFormValue(res.data);
          }
        });
      }
    },
    // 绑定表单的值
    bindFormValue(form) {
      let data = {};
      data.personStateList = [
        form.personInfo.stateValue,
        form.personInfo.stateDetailValue
      ];
      data.personTagList = form.personInfo.personTag
        ? form.personInfo.personTag.split(",")
        : [];
      data.fiveOnePropertyList = form.personInfo.fiveOneProperty
        ? form.personInfo.fiveOneProperty.split(",")
        : [];
      this.form = Object.assign(form.personInfo, data);
      if (form.personBaokongInfo) {
        if (form.personBaokongInfo.outboundEntryTime) {
          form.personBaokongInfo.outboundEntryTime = this.$moment(form.personBaokongInfo.outboundEntryTime).format("YYYY-MM-DD");
        }
        this.personBaokongInfo = form.personBaokongInfo;
      } else {
        this.personBaokongInfo = {
          sideControlValue: "", //边控情况
          sideControl: "", //边控情况显示
          pursuitValue: "", //追逃情况
          pursuit: "", //追逃情况显示
          outboundEntryTime: "", //出入境时间
          entryExitDate: "", //出入境日期
          entryExitTime: "", //出入境具体时间
          // outboundTypeValue: "", //出境方式
          // outboundType: "", //出境方式显示
          outboundWayValue: "", //出境方法
          outboundWay: "", //出境方法显示
          outboundChannelValue: "", //出境通道
          outboundChannel: "", //出境通道显示
          personTypeValue: "", //人员类别
          personType: "", //人员类别显示
          overseasStatusValue: "", //境外现状
          overseasStatus: "", //境外现状显示
          currentCountryValue: "", //目前所在国家
          currentCountry: "", //目前所在国家显示
          outboundDetails: "" //出入境详情
        }
      }
      // form.personBaokongInfo.outboundEntryTime = 
      // (form.personBaokongInfo && form.personBaokongInfo.outboundEntryTime) ? this.$moment(form.personBaokongInfo.outboundEntryTime).format("YYYY-MM-DD") : "";
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
