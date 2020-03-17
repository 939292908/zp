<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-18 21:45:34
 * @LastEditTime : 2019-12-27 11:12:54
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="form-objective-view" ref="formView" @click="handleOutside($event)">
    <!-- 人员基础信息 -->
    <div class="person-info">
      <div class="form-item profile-info">
        <div class="form-label person-form-label">
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
            <div class="risk-anjian-group" v-if="personScoreInfo">
              <template v-if="personScoreInfo.totalScore <= 0">
                <span
                  class="risk"
                  :style="{'background': personScoreInfo.color,'border':('1px solid ' + personScoreInfo.color)}"
                >{{ personScoreInfo.level + ": " + personScoreInfo.totalScore}}</span>
              </template>
              <Poptip v-else width="400" :transfer="true" trigger="hover">
                <span
                  class="risk"
                  :style="{'background': personScoreInfo.color,'border':('1px solid ' + personScoreInfo.color)}"
                >{{ personScoreInfo.level + ": " + personScoreInfo.totalScore}}</span>
                <div class="api" slot="content">
                  <div class="tip">个人风险积分: {{ personScoreInfo.totalScore }}</div>
                  <i-table
                    class="risk-table"
                    ref="mapTables"
                    :show-header="false"
                    border
                    stripe
                    max-height="300"
                    :columns="columns"
                    :data="tableData"
                  ></i-table>
                </div>
              </Poptip>
              <!-- <template v-if="$config.project.locale == 'aks'">
                <span
                  :key="index"
                  :class="item.className"
                  v-for="(item,index) in personcaseClueStatsInfo"
                >{{ item.name+": "+item.count}}</span>
              </template>-->
            </div>
            <div>户籍地：{{(form.hukouAddress && form.hukouAddress.addressTierPath || form.currentAddress && form.currentAddress.addressInfo || "")}}</div>
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
    <!-- 涉案涉线情况 -->
    <template
      v-if="$config.project.locale == 'aks' && personCaseClueInfo && personCaseClueInfo.length>0"
    >
      <div class="panel-title panel-info border">涉案涉线情况</div>
      <!-- 案件/线索 -->
      <div :key="index" class="form-info caseline-class" v-for="(item,index) in personCaseClueInfo">
        <div class="title">{{item.caseType + '(' + item.count + ')'}}</div>
        <div class="content">
          <div class="labels" :key="indexD" v-for="(itemD,indexD) in item.details">
            <span :title="itemD.category">{{itemD.category + ': ' + itemD.count}}</span>
          </div>
        </div>
      </div>
    </template>
    <!-- 人员简介和其他信息 -->
    <div class="panel-title panel-info border">基础信息</div>
    <div class="form-info">
      <div class="form-item">
        <div class="form-label">人员状态：</div>
        <div class="form-content">
          <span
            class="personState"
            :style="{'background':$config.personLabel[form.state],'color':$config.personLabel[form.state] == '#ffe900' ? '#666666' : '#ffffff'}"
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
            :style="{'color':$config[localColor][item]}"
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
        >{{(form.currentAddress && form.currentAddress.addressTierPath || form.currentAddress && form.currentAddress.addressInfo || "")}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">服务场所：</div>
        <div class="form-content">{{form.servicePlace}}</div>
      </div>
    </div>
    <!-- 人员学经经历 -->
    <div
      class="panel-title panel-info border"
      v-if="showPersonReligionInfo && !onlyShowBasicInformation"
    >学经经历</div>
    <div class="form-info" v-if="showPersonReligionInfo && !onlyShowBasicInformation">
      <div class="form-item">
        <div class="form-label">学经起止时间：</div>
        <div class="form-content">
          <span>{{personReligionInfoDTO.religionStartTime}}</span>
          <span>
            <i class="iconfont icon-jianhao"></i>
          </span>
          <span>{{personReligionInfoDTO.religionEndTime}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">学经经过：</div>
        <div class="form-content">{{personReligionInfoDTO.religionLearnProcess}}</div>
      </div>
    </div>
    <!-- 案件信息 -->
    <div
      class="panel-title panel-info border"
      v-if="showPersonCaseInfo && !onlyShowBasicInformation"
    >案件信息</div>
    <div class="form-info" v-if="showPersonCaseInfo && !onlyShowBasicInformation">
      <div class="form-item">
        <div class="form-label">涉案人员身份：</div>
        <div class="form-content">{{personCaseInfo ? personCaseInfo.personIdentity:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">处理结果：</div>
        <div class="form-content">{{personCaseInfo ? personCaseInfo.personProcessResult:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label" style="min-width:124px">涉及案件身份不明人员情况说明：</div>
        <div class="form-content">{{personCaseInfo ? personCaseInfo.personDescription:""}}</div>
      </div>
    </div>
    <!-- 被打击信息 -->
    <div class="panel-title panel-info border" v-if="showPersonProcessRecordInfo">被打击处理情况</div>
    <div class="form-info" v-if="showPersonProcessRecordInfo">
      <div class="form-item">
        <div class="form-label">案件编号：</div>
        <div class="form-content">{{personProcessRecordInfo.caseCode}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">案件名称：</div>
        <div class="form-content">{{personProcessRecordInfo.caseName}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">案发时间：</div>
        <div class="form-content">{{personProcessRecordInfo.incidentTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">处理时间：</div>
        <div class="form-content">{{personProcessRecordInfo.processTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">处理结果：</div>
        <div class="form-content">{{personProcessRecordInfo.processResult}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">涉案人员身份：</div>
        <div class="form-content">{{personProcessRecordInfo.personIdentity}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">案件类型：</div>
        <div class="form-content">{{personProcessRecordInfo.caseType}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">危害等级：</div>
        <div class="form-content">
          <i
            class="color"
            :style="'background:#'+personProcessRecordInfo.caseTypeColor"
          >{{personProcessRecordInfo.caseTypeColorName}}</i>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">案情：</div>
        <div class="form-content">{{personProcessRecordInfo.caseCondition}}</div>
      </div>
    </div>
    <!-- 出入境信息 -->
    <div class="panel-title panel-info border" v-if="showPersonOutboundRecordInfo">最新一条出入境信息</div>
    <div class="form-info" v-if="showPersonOutboundRecordInfo">
      <!-- personOutboundRecordInfo -->
      <div class="form-item">
        <div class="form-label">出境时间：</div>
        <div class="form-content">{{personOutboundRecordInfo.outBoundRecordList[0].outBoundTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境方式：</div>
        <div class="form-content">{{personOutboundRecordInfo.outBoundRecordList[0].outBoundWay}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境理由：</div>
        <div class="form-content">{{personOutboundRecordInfo.outBoundRecordList[0].outBoundReason}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">前往国家：</div>
        <div
          class="form-content"
        >{{personOutboundRecordInfo.outBoundRecordList[0].outBoundToCountry}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境口岸：</div>
        <div class="form-content">{{personOutboundRecordInfo.outBoundRecordList[0].outBoundChannel}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">入境时间：</div>
        <div class="form-content">{{personOutboundRecordInfo.outBoundRecordList[0].entryTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">入境口岸：</div>
        <div class="form-content">{{personOutboundRecordInfo.outBoundRecordList[0].entryChannel}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">危害等级：</div>
        <div class="form-content">
          <i
            class="color"
            :style="'background:#'+personOutboundRecordInfo.harmColor"
          >{{personOutboundRecordInfo.harmLevel}}</i>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">风险等级：</div>
        <div class="form-content">
          <i
            class="color"
            :style="'background:#'+personOutboundRecordInfo.riskColor"
          >{{personOutboundRecordInfo.riskLevel}}</i>
        </div>
      </div>
    </div>
    <!-- 境外涉恐涉暴人员信息 -->
    <div
      class="panel-title panel-info border"
      v-if="showPersonBaokongInfo && !onlyShowBasicInformation"
    >境外涉恐涉暴人员信息</div>
    <div class="form-info" v-if="showPersonBaokongInfo && !onlyShowBasicInformation">
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
        <div class="form-label" style="min-width:138px">暴恐人员境外现状：</div>
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
    <!-- 人员社会关系情况 -->
    <div
      class="panel-title panel-info border"
      v-if="showPersonSocialInfo && !onlyShowBasicInformation"
    >社会关系情况</div>
    <div class="form-info" v-if="showPersonSocialInfo && !onlyShowBasicInformation">
      <div class="form-item">
        <div class="form-label">关系/身份：</div>
        <div class="form-content">{{personCaseSocialInfo.personIdentity}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">提供何种帮助：</div>
        <div class="form-content">{{personCaseSocialInfo.helpType}}</div>
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
    <!-- 亲密度(暂时只给阿克苏使用) -->
    <template v-if="$config.project.locale == 'aks'">
      <div class="panel-title panel-info border">亲密度</div>
      <div class="form-info">
        <i-table
          class="affinity-table"
          ref="affinityTable"
          stripe
          :columns="affinityColumns"
          :data="affinityTableData"
          height="280"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button
              class="ralationClass"
              size="small"
              @click.stop.prevent="handleShowDetail($event,row,index)"
            >查看详情</Button>
          </template>
        </i-table>
      </div>
      <my-poptip
        ref="myPoptip"
        class="myPoptip"
        width="400"
        placement="top-end"
        v-model="visibleAffinity"
        :myStyles="styleAffinity"
      >
        <!-- : {{ affinityDetailTotal }} -->
        <div class="tip">亲密度: {{ affinityDetailTotal }}</div>
        <div class="risk-table-box" style="max-height:280px;">
          <i-table
            class="risk-table"
            ref="affinityDetailTables"
            :show-header="false"
            border
            stripe
            :max-height="280"
            :columns="affinityDetailColumns"
            :data="affinityDetailTableData"
          ></i-table>
        </div>
      </my-poptip>
    </template>
  </div>
</template>
<script>
import * as apis from "@/api/mapJoin/index.js";
import MyPoptip from "@/components/assembly/MyPoptip/index";
import { transferParameters, sum } from "@/tools/units.js";
export default {
  name: "PersonInfoForm",
  components: {
    MyPoptip
  },
  props: {
    idNumber: {
      type: String,
      default: ""
    },
    collectId: {
      type: String,
      default: ""
    },
    // 只展示基础信息
    onlyShowBasicInformation: {
      type: Boolean,
      default: false
    },
    markerObjDetail: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      showPersonBaokongInfo: false,
      showPersonCaseInfo: false,
      showPersonReligionInfo: false,
      showPersonSocialInfo: false,
      showPersonProcessRecordInfo: false, //被打击
      showPersonOutboundRecordInfo: false, //出入境
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
          addressInfo: "",
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
          addressInfo: "",
          village: "",
          villageCode: "",
          addressCodeTierPath: "",
          addressTierPath: "",
          villageCodeDiaplayName: ""
        }
      },
      personReligionInfoDTO: {
        religionStartTime: "", //学经开始时间
        religionEndTime: "", //学经结束时间
        religionLearnProcess: "" //学经经过
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
      },
      personProcessRecordInfo: {
        caseCode: "",
        caseCondition: "",
        caseName: "",
        caseType: "",
        caseTypeColor: "",
        caseTypeColorName: "",
        caseTypeValue: "8",
        incidentTime: null,
        personIdentity: "",
        personIdentityValue: "",
        processResult: "",
        processResultValue: "",
        processTime: null
      },
      personOutboundRecordInfo: {
        harmColor: null,
        harmLevel: null,
        outBoundCollectList: [],
        outBoundRecordList: [
          {
            collectTime: "",
            county: "",
            countyCode: "",
            entryChannel: "",
            entryTime: null,
            harmLevel: "",
            outBoundChannel: "",
            outBoundReason: "",
            outBoundTime: null,
            outBoundToCountry: "",
            outBoundWay: "",
            riskLevel: ""
          }
        ],
        riskColor: null,
        riskLevel: null
      },
      personCaseInfo: {
        collectId: "",
        personDescription: "",
        personProcessResult: "",
        personProcessResultValue: ""
      },
      personCaseSocialInfo: {
        helpTypeValue: "", //提供何种帮助
        helpType: "", //提供何种帮助显示
        personIdentity: "", //涉案人员身份值
        personIdentityCode: "" //涉案人员身份编号
      },
      personScoreInfo: null,
      personcaseClueStatsInfo: [],
      personCaseClueInfo: [], //案件线索信息
      columns: [
        {
          title: "大类",
          key: "parentName",
          align: "center",
          width: "100px",
          render: (h, params) => {
            let data = params.row;
            return <div>{data.parentName}</div>;
          }
        },
        {
          title: "细类",
          key: "name",
          className: "sub-column",
          render: (h, params) => {
            let data = params.row;
            return (
              <div class="detailCountList sub-item">
                {this._l(data.children, item => {
                  return (
                    <div>
                      <span>{item.name}</span>
                      <span>{item.score}</span>
                    </div>
                  );
                })}
              </div>
            );
          }
        }
      ],
      tableData: [],
      // 亲密度列表
      affinityColumns: [
        //亲密度
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "分值",
          key: "count"
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          className: "action-class"
        }
      ],
      affinityTableData: [],
      // 亲密度详情列表
      affinityDetailColumns: [
        //亲密度
        {
          title: "数据类别",
          key: "name",
          align: "center",
          width: "90px",
          render: (h, params) => {
            let data = params.row;
            return <div>{data.name}</div>;
          }
        },
        {
          title: "细类",
          key: "name",
          className: "sub-column",
          width: "180px",
          render: (h, params) => {
            let data = params.row;
            return (
              <div class="detailCountList sub-item">
                {this._l(data.children, item => {
                  if (data.key == "sameMap") {
                    if (item.dataAuth) {
                      return (
                        <div class="sameMap">
                          <span
                            class="left"
                            on-click={$event =>
                              this.handleSameMapClick(data, item)
                            }
                          >
                            {item.name}
                          </span>
                          <span>{item.score || 1}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div class="sameMap">
                          <span class="left">
                            <i class="lock-icon iconfont icon-suoding"></i>
                            {item.name}
                          </span>
                          <span>{item.score || 1}</span>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div class="sameContract">
                        <div class="left">
                          <span>{item.name}</span>
                          <span>{item.id}</span>
                        </div>
                        <div>
                          <span>{item.score || 1}</span>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            );
          }
        },
        {
          title: "操作",
          key: "name",
          className: "sub-column",
          render: (h, params) => {
            let data = params.row;
            return (
              <div class="detailCountList sub-item">
                {this._l(data.children, item => {
                  if (data.key == "sameMap") {
                    return (
                      <div class="sameMap">
                        <span></span>
                      </div>
                    );
                  } else {
                    return (
                      <div class="sameContract">
                        <i-button
                          class="ralationClass"
                          size="small"
                          on-click={$event =>
                            this.handleRelationClick(data, item)
                          }
                        >
                          关系挖掘
                        </i-button>
                      </div>
                    );
                  }
                })}
              </div>
            );
          }
        }
      ],
      affinityDetailTableData: [],
      affinityDetailTotal: 0,
      visibleAffinity: false,
      styleAffinity: null,
      rowIndex: -1
    };
  },
  computed: {
    formatPicUrl() {
      return this.getImagePath(this.form.picUrl);
    },
    localColor() {
      return this.$config.project.locale == "bz" ? "tagColorBz" : "tagColor";
    }
  },
  methods: {
    init() {
      this.visibleAffinity = false;
      this.getPersonInfoByIdNumber();
      if (this.$config.project.locale == "aks") {
        this.getPersonIntimacyList();
        this.getPersonCaseClueList();
      }
    },
    // 回车或者失去焦点（blur）
    getPersonInfoByIdNumber() {
      let idNumber = this.idNumber;
      let collectId = this.collectId;
      if (idNumber) {
        apis.GET_PERSON_INFO_ARCHIVES(idNumber, collectId).then(res => {
          if (res.code == 200) {
            if (res.data != null) {
              this.bindFormValue(res.data);
            }
          }
        });
      }
    },
    // 获取人员的亲密度列表数据
    getPersonIntimacyList() {
      let idNumber = this.idNumber;
      let collectId = this.collectId;
      if (idNumber) {
        apis.GET_PERSON_INTIMACY_LIST(idNumber, collectId).then(res => {
          if (res.code == 200) {
            this.affinityTableData = res.data;
          }
        });
      }
    },
    // 获取人员的亲密度详细数据列表
    getPersonIntimacyDetailList(event, row) {
      let idNumber = this.idNumber;
      let intimacyIdNumber = row.idNumber;
      apis
        .GET_PERSON_INTIMACY_DETAIL_LIST(idNumber, intimacyIdNumber)
        .then(res => {
          if (res.code == 200) {
            let data = res.data;
            let sameMap = data.sameMap;
            let sameContract = data.sameContract;
            let arr = [];
            if (sameMap.length > 0) {
              arr.push({
                parent: row,
                key: "sameMap",
                name: "同图谱",
                children: sameMap
              });
            }
            if (sameContract.length > 0) {
              arr.push({
                parent: row,
                key: "sameContract",
                name: "共同关系人",
                children: sameContract
              });
            }
            let scoreMapArr = sameMap.map(x => {
              return x.score || 1;
            });
            let scoreContractArr = sameContract.map(x => {
              return x.score || 1;
            });
            this.affinityDetailTotal = sum(scoreMapArr) + sum(scoreContractArr);
            this.affinityDetailTableData = arr;
            let parentNode = this.$refs.affinityTable.$el;
            let container = this.$refs.formView;
            this.$nextTick(() => {
              this.$refs.myPoptip.calPopperStyles(event, parentNode, container);
            });
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    // 获取人员的案件线索列表
    getPersonCaseClueList() {
      let idNumber = this.idNumber;
      if (idNumber) {
        apis.GET_PERSON_CASECLUE_LIST(idNumber).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.personCaseClueInfo = data;
          } else {
            this.$Message.error(res.msg);
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
      if (form.personBaokongInfo != null) {
        form.personBaokongInfo.outboundEntryTime = form.personBaokongInfo
          .outboundEntryTime
          ? this.$moment(form.personBaokongInfo.outboundEntryTime).format(
              "YYYY-MM-DD"
            )
          : "";
        this.personBaokongInfo = form.personBaokongInfo;
        this.showPersonBaokongInfo = true;
      }
      if (form.personProcessRecordInfo != null) {
        form.personProcessRecordInfo.incidentTime = form.personProcessRecordInfo
          .incidentTime
          ? this.$moment(form.personProcessRecordInfo.incidentTime).format(
              "YYYY-MM"
            )
          : "";
        form.personProcessRecordInfo.processTime = form.personProcessRecordInfo
          .processTime
          ? this.$moment(form.personProcessRecordInfo.processTime).format(
              "YYYY-MM"
            )
          : "";
        this.personProcessRecordInfo = form.personProcessRecordInfo;
        this.showPersonProcessRecordInfo = true;
      }
      if (
        form.personOutboundRecordInfo != null &&
        form.personOutboundRecordInfo.outBoundRecordList[0] != undefined
      ) {
        form.personOutboundRecordInfo.outBoundRecordList[0].outBoundTime = form
          .personOutboundRecordInfo.outBoundRecordList[0].outBoundTime
          ? this.$moment(
              form.personOutboundRecordInfo.outBoundRecordList[0].outBoundTime
            ).format("YYYY-MM-DD")
          : "";
        form.personOutboundRecordInfo.outBoundRecordList[0].entryTime = form
          .personOutboundRecordInfo.outBoundRecordList[0].entryTime
          ? this.$moment(
              form.personOutboundRecordInfo.outBoundRecordList[0].entryTime
            ).format("YYYY-MM-DD")
          : "";
        this.personOutboundRecordInfo = form.personOutboundRecordInfo;
        this.showPersonOutboundRecordInfo = true;
      }
      if (form.personCaseInfo != null) {
        this.personCaseInfo = form.personCaseInfo;
        this.showPersonCaseInfo = true;
      }
      if (form.personCaseSocialInfo != null) {
        this.personCaseSocialInfo = form.personCaseSocialInfo;
        this.showPersonSocialInfo = true;
      }
      if (form.personReligionInfoDTO != null) {
        form.personReligionInfoDTO.religionStartTime = form
          .personReligionInfoDTO.religionStartTime
          ? this.$moment(form.personReligionInfoDTO.religionStartTime).format(
              "YYYY-MM"
            )
          : "";
        form.personReligionInfoDTO.religionEndTime = form.personReligionInfoDTO
          .religionEndTime
          ? this.$moment(form.personReligionInfoDTO.religionEndTime).format(
              "YYYY-MM"
            )
          : "";
        this.personReligionInfoDTO = form.personReligionInfoDTO;
        this.showPersonReligionInfo = true;
      }
      if (form.personScoreInfo != null) {
        this.personScoreInfo = form.personScoreInfo;
        this.bindRiskLevelData();
      }
      // if (form.personcaseClueStatsInfo) {
      //   let arr = form.personcaseClueStatsInfo;
      //   arr.forEach(x => {
      //     if (x.name == "案件") {
      //       x.className = "anjian";
      //     } else if (x.name == "线索") {
      //       x.className = "line";
      //     }
      //   });
      //   this.personcaseClueStatsInfo = arr;
      // }
    },
    // 绑定风险等级的数据
    bindRiskLevelData() {
      let tableData = [];
      let childrenState = [];
      let childStateObj = {};
      let rowState = {
        parentName: "人员状态",
        name: "",
        score: "",
        dictId: "",
        children: []
      };
      let stateStrong = this.personScoreInfo.stateStrong;
      if (stateStrong) {
        childStateObj = {
          parentName: "人员状态",
          dictId: stateStrong.dictId,
          name: stateStrong.name,
          score: stateStrong.score
        };
      }
      let stateDetail = this.personScoreInfo.stateDetail;
      if (stateDetail) {
        let tmp = {
          parentName: "人员状态",
          dictId: stateStrong.dictId,
          name: childStateObj.name + " / " + stateDetail.name,
          score: childStateObj.score + stateDetail.score
        };
        childStateObj = tmp;
      }
      if (stateStrong || stateDetail) {
        childrenState.push(childStateObj);
        rowState.children = childrenState;
        tableData.push(rowState);
      }
      let rowTag = {
        parentName: "人员" + this.$config.properties.RYBQ,
        name: "",
        score: "",
        dictId: "",
        children: []
      };
      let tagInfo = this.personScoreInfo.tagInfo;
      if (tagInfo && tagInfo.length > 0) {
        tagInfo.forEach(x => {
          x.parentName = rowTag.parentName;
        });
        rowTag.children = tagInfo;
        tableData.push(rowTag);
      }
      // 添加案件线索
      if (this.$config.project.locale == "aks") {
        let caseInfo = JSON.parse(
          JSON.stringify(this.personScoreInfo.caseInfo)
        );
        let countArr = caseInfo.map(x => x.count);
        let countTotalCase = eval(countArr.join("+"));
        let rowCase = {
          parentName: `案件(${countTotalCase})`,
          name: "",
          score: "",
          dictId: "",
          children: []
        };
        if (caseInfo && caseInfo.length > 0) {
          caseInfo.forEach(x => {
            x.parentName = rowCase.parentName;
            x.name = `${x.name} : ${x.count}`;
          });
          rowCase.children = caseInfo;
          tableData.push(rowCase);
        }
        let clueInfo = JSON.parse(
          JSON.stringify(this.personScoreInfo.clueInfo)
        );
        let countClueArr = clueInfo.map(x => x.count);
        let countTotalClue = eval(countClueArr.join("+"));
        let rowClue = {
          parentName: `线索(${countTotalClue})`,
          name: "",
          score: "",
          dictId: "",
          children: []
        };
        if (clueInfo && clueInfo.length > 0) {
          clueInfo.forEach(x => {
            x.parentName = rowClue.parentName;
            x.name = `${x.name} : ${x.count}`;
          });
          rowClue.children = clueInfo;
          tableData.push(rowClue);
        }
      }
      this.tableData = tableData;
    },
    handleShowDetail(event, row, index) {
      if (this.rowIndex != index) {
        this.visibleAffinity = true;
      } else {
        this.visibleAffinity = !this.visibleAffinity;
      }
      if (this.visibleAffinity) {
        this.getPersonIntimacyDetailList(event, row);
      }
      this.rowIndex = index;
    },
    handleSameMapClick(row, item) {
      let data = {
        tpids: item.id,
        rid: "",
        passiveID: "",
        mc: this.$route.query.mc || "智能搜索",
        pageName: ""
      };
      let query = [row.parent.idNumber, this.idNumber].join();
      let path = "/archivesjoin";
      transferParameters(this, path, query, data);
    },
    handleRelationClick(row, item) {
      let path = "/relationCheck";
      let idNumbers = [item.id, row.parent.idNumber, this.idNumber].join();
      let query = {
        sfzhm: idNumbers,
        idNumber: item.id
      };
      let params = JSON.stringify(query);
      transferParameters(this, path, params);
    },
    handleOutside(event) {
      let elePath = event.path;
      let isExist = false;
      var appElement = document.querySelector(".myPoptip");
      if (appElement) {
        for (var i = 0; i < elePath.length; i++) {
          let dom = elePath[i];
          if (dom == appElement) {
            isExist = true;
          }
        }
        if (!isExist) {
          this.visibleAffinity = false;
        }
      }
    }
  },
  watch: {
    collectId: {
      handler(val) {},
      immediate: true
    },
    markerObjDetail: {
      handler(val) {
        if (val && Object.keys(val).length > 0) {
          this.bindFormValue(val);
        }
      },
      immediate: true,
      deep: true
    },
    idNumber: {
      handler(val) {
        this.init();
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "./form.less";
</style>
