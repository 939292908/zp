<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 09:19:11
 * @LastEditTime: 2019-11-15 13:30:04
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
            <div>{{form.personInfo.name}}</div>
            <div>{{form.personInfo.idNumber}}</div>
            <div>
              <span class="gender">{{form.personInfo.gender}}</span>
              <span>{{form.personInfo.nationality}}</span>
            </div>
            <div>户籍地：{{(form.personInfo.hukouAddress && form.personInfo.hukouAddress.addressTierPath || "") + "" + (form.personInfo.hukouAddress && form.personInfo.hukouAddress.detailAddress || "")}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 人员标签容器 -->
    <div class="person-label">
      <div class="labels" :key="index" v-for="(item,index) in form.personInfo.personTagInfo">
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
            :style="{'background':$config.personLabel[form.personInfo.state]}"
          >{{form.personInfo.state}} - {{form.personInfo.stateDetail}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">关系/身份：</div>
        <div class="form-content">{{currentRightMenuNode && currentRightMenuNode.gxmc}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">五位一体属性：</div>
        <div class="form-content">
          <i
            :key="index"
            v-for="(item,index) in form.personInfo.fiveOnePropertyList"
            :class="'iveOneProperty iconfont ' + $config.tagIconFont[item]"
            :style="{'color':$config.tagColor[item]}"
          ></i>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">人员简介：</div>
        <div class="form-content">{{form.personInfo.intro}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">政治面貌：</div>
        <div class="form-content">{{form.personInfo.politicsStatus}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">职业：</div>
        <div class="form-content">{{form.personInfo.profession}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">现住址：</div>
        <div
          class="form-content"
        >{{(form.personInfo.currentAddress && form.personInfo.currentAddress.addressTierPath || "") + '' + (form.personInfo.currentAddress && form.personInfo.currentAddress.detailAddress || "")}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">服务场所：</div>
        <div class="form-content">{{form.personInfo.servicePlace}}</div>
      </div>
    </div>
    <!-- 人员社会信息 -->
    <div class="panel-title panel-info border">社会信息</div>
    <div class="form-info">
      <div class="form-item">
        <div class="form-label">银行卡：</div>
        <div class="form-content">{{form.personInfo.socialBankCard}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">车辆：</div>
        <div class="form-content">{{form.personInfo.socialCar}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">电话：</div>
        <div class="form-content">{{form.personInfo.socialPhone}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">QQ号码：</div>
        <div class="form-content">{{form.personInfo.socialQq}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">微信号码：</div>
        <div class="form-content">{{form.personInfo.socialWechat}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as apis from "@/api/collection/index.js";
export default {
  name: "HajjFormObjectiveView",
  props: {
    currentRightMenuNode: {
      type: Object,
      default: {}
    },
    idNumber: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        personBaokongInfo: null,
        personCaseInfo: {
          collectId: "",
          personDescription: "",
          personProcessResult: "",
          personProcessResultValue: ""
        },
        personInfo: {
          createTime: "",
          creater: "",
          currentAddress: {
            addressCodeTierPath: "",
            addressTierPath: "",
            city: "",
            cityCode: "",
            county: "",
            countyCode: "",
            detailAddress: "",
            province: "",
            provinceCode: "",
            town: "",
            townCode: "",
            village: "",
            villageCode: ""
          },
          fiveOneProperty: "",
          fiveOnePropertyValue: "",
          gender: "",
          genderValue: "",
          hukouAddress: {
            addressCodeTierPath: "",
            addressTierPath: "",
            city: "",
            cityCode: "",
            county: "",
            countyCode: "",
            detailAddress: "",
            province: "",
            provinceCode: "",
            town: "",
            townCode: "",
            village: "",
            villageCode: ""
          },
          idNumber: "",
          intro: "",
          name: "",
          nationality: "",
          nationalityValue: "",
          personTag: null,
          personTagId: null,
          picUrl: "",
          politicsStatus: null,
          politicsStatusValue: null,
          profession: "",
          professionValue: "",
          religionEndTime: "",
          religionLearnProcess: "",
          religionStartTime: "",
          servicePlace: null,
          socialBankCard: null,
          socialCar: null,
          socialPhone: null,
          socialQq: null,
          socialWechat: null,
          state: "",
          stateDetail: "",
          stateDetailValue: "",
          stateValue: "",
          updateId: "",
          updateTime: "",
          updater: ""
        }
      }
    };
  },
  computed: {
    formatPicUrl() {
      return this.getImagePath(this.form.personInfo.picUrl);
    }
  },
  mounted() {},
  methods: {
    // 获取人员信息
    getPersonInfoByIdNumber() {
      let idNumber = this.idNumber;
      let collectId = this.$route.query.collectId;
      if (idNumber) {
        apis.GET_NEW_PERSON_INFO_BY_ID(idNumber, collectId).then(res => {
          if (res.code == 200) {
            // 绑定表单
            this.bindFormValue(res.data);
          }
        });
      }
    },
    // 绑定表单的值
    bindFormValue(form) {
      let data = {
        personInfo: {}
      };
      data.personInfo.personStateList = [
        form.personInfo.stateValue,
        form.personInfo.stateDetailValue
      ];
      data.personInfo.personTagList = form.personInfo.personTag
        ? form.personInfo.personTag.split(",")
        : [];
      data.personInfo.fiveOnePropertyList = form.personInfo.fiveOneProperty
        ? form.personInfo.fiveOneProperty.split(",")
        : [];
      this.form = form;
      this.form.personInfo = Object.assign(form.personInfo, data.personInfo);
      console.log(data.personInfo, this.form);
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
</style>
