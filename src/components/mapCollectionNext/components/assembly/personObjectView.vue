<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 15:03:16
 * @LastEditTime: 2019-11-15 13:26:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="form-objective-view" ref="formView" @click="handleOutside($event)">
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
              <template v-if="$config.project.locale == 'aks'">
                <span
                  :key="index"
                  :class="item.className"
                  v-for="(item,index) in personcaseClueStatsInfo"
                >{{ item.name+": "+item.count}}</span>
              </template>
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
    <!-- 涉案涉线情况 -->
    <template v-if="$config.project.locale == 'aks' && personCaseClueInfo && personCaseClueInfo.length>0">
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
            :style="{'background':$config.personLabel[form.personInfo.state],'color':$config.personLabel[form.personInfo.state] == '#ffe900' ? '#666666' : '#ffffff'}"
          >{{form.personInfo.state}} - {{form.personInfo.stateDetail}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">关系/身份：</div>
        <div class="form-content">{{form.personCaseInfo ? form.personCaseInfo.personIdentity:""}}</div>
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
    <!-- 人员社会关系情况 -->
    <div
      v-if="['5'].indexOf($route.query.mapType) != -1 && !displayNameShow"
      class="panel-title panel-info border"
    >社会关系情况</div>
    <div v-if="['5'].indexOf($route.query.mapType) != -1 && !displayNameShow" class="form-info">
      <div class="form-item">
        <div class="form-label">关系/身份：</div>
        <div class="form-content">{{relation.node}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">提供何种帮助：</div>
        <div
          class="form-content"
        >{{form.personCaseSocialInfo ? form.personCaseSocialInfo.helpType : ""}}</div>
      </div>
    </div>
    <!-- 人员学经经历 -->
    <div v-if="['6'].indexOf($route.query.mapType) != -1" class="panel-title panel-info border">学经经历</div>
    <div v-if="['6'].indexOf($route.query.mapType) != -1" class="form-info">
      <div class="form-item">
        <div class="form-label">学经起止时间：</div>
        <div class="form-content">
          <span>{{form.personReligionInfo ? form.personReligionInfo.religionStartTime : ""}}</span>
          <span>
            <i class="iconfont icon-jianhao"></i>
          </span>
          <span>{{form.personReligionInfo ? form.personReligionInfo.religionEndTime : ""}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">学经经过：</div>
        <div
          class="form-content"
        >{{form.personReligionInfo ? form.personReligionInfo.religionLearnProcess : ""}}</div>
      </div>
    </div>
    <!-- 案件信息 -->
    <div v-if="['4'].indexOf($route.query.mapType) != -1" class="panel-title panel-info border">案件信息</div>
    <div v-if="['4'].indexOf($route.query.mapType) != -1" class="form-info">
      <div class="form-item">
        <div class="form-label">涉案人员身份：</div>
        <div class="form-content">{{form.personCaseInfo ? form.personCaseInfo.personIdentity:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">处理结果：</div>
        <div
          class="form-content"
        >{{form.personCaseInfo ? form.personCaseInfo.personProcessResult:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">涉及案件身份不明人员情况说明：</div>
        <div class="form-content">{{form.personCaseInfo ? form.personCaseInfo.personDescription:""}}</div>
      </div>
    </div>
    <!-- 被打击信息 -->
    <div v-if="mapType == '8'" class="panel-title panel-info border">
      <span>最新一条出入境信息</span>
      <span class="rightAll" @click="seeInfo(markerObjDetail.personInfo.idNumber)">
        查看全部记录
        <i class="iconfont icon-document"></i>
      </span>
    </div>
    <div
      v-if="mapType == '8'&&form.personOutboundRecordInfo.outBoundRecordList[0]"
      class="form-info"
    >
      <div class="form-item">
        <div class="form-label">出境时间：</div>
        <div
          class="form-content"
        >{{form.personOutboundRecordInfo.outBoundRecordList[0].outBoundTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境方式：</div>
        <div
          class="form-content"
        >{{form.personOutboundRecordInfo.outBoundRecordList[0].outBoundWay}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境理由：</div>
        <div
          class="form-content"
        >{{form.personOutboundRecordInfo.outBoundRecordList[0].outBoundReason}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">前往国家：</div>
        <div
          class="form-content"
        >{{form.personOutboundRecordInfo.outBoundRecordList[0].outBoundToCountry}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境口岸：</div>
        <div
          class="form-content"
        >{{form.personOutboundRecordInfo.outBoundRecordList[0].outBoundChannel}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">入境时间：</div>
        <div class="form-content">{{form.personOutboundRecordInfo.outBoundRecordList[0].entryTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">入境口岸：</div>
        <div
          class="form-content"
        >{{form.personOutboundRecordInfo.outBoundRecordList[0].entryChannel}}</div>
      </div>

      <div class="form-item">
        <div class="form-label">危害等级：</div>
        <div class="form-content">
          <i
            class="color"
            :style="'background:#'+form.personOutboundRecordInfo.harmColor"
          >{{form.personOutboundRecordInfo.harmLevel}}</i>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">风险等级：</div>
        <div class="form-content">
          <i
            class="color"
            :style="'background:#'+form.personOutboundRecordInfo.riskColor"
          >{{form.personOutboundRecordInfo.riskLevel}}</i>
        </div>
      </div>
    </div>
    <!-- 被打击信息 -->
    <div v-if="mapType == '9'" class="panel-title panel-info border">被打击处理情况</div>
    <div v-if="mapType == '9'" class="form-info">
      <div class="form-item">
        <div class="form-label">案件编号：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.caseCode:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">案件名称：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.caseName:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">案发时间：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.incidentTime:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">处理时间：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.processTime:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">处理结果：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.processResult:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">涉案人员身份：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.personIdentity:""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">案件类型：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.caseType:""}}</div>
      </div>
      <div class="form-item" v-if="form.personProcessRecordInfo!=null">
        <div class="form-label">危害等级：</div>
        <div class="form-content">
          <i
            class="color"
            :style="'background:#'+form.personProcessRecordInfo.caseTypeColor"
          >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.caseTypeColorName:""}}</i>
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">案情：</div>
        <div
          class="form-content"
        >{{form.personProcessRecordInfo ? form.personProcessRecordInfo.caseCondition:""}}</div>
      </div>
    </div>
    <!-- 境外涉恐涉暴人员信息 -->
    <div
      v-if="['10','3'].indexOf($route.query.mapType) != -1"
      class="panel-title panel-info border"
    >境外涉恐涉暴人员信息</div>
    <div v-if="['10','3'].indexOf($route.query.mapType) != -1" class="form-info">
      <div class="form-item">
        <div class="form-label">边控情况：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.sideControl : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">追逃情况：</div>
        <div class="form-content">{{form.personBaokongInfo ? form.personBaokongInfo.pursuit : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出入境时间：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.outboundEntryTime : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境方法：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.outboundWay : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出境通道：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.outboundChanne : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">暴恐人员类别：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.personType : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label" style="margin-left:-20px;flex:0 0 140px">暴恐人员境外现状：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.overseasStatus : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">目前所在国家：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.currentCountry : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出入境详情：</div>
        <div
          class="form-content"
        >{{form.personBaokongInfo ? form.personBaokongInfo.outboundDetails : ""}}</div>
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
    <!-- 出境信息 -->
    <div v-if="['3'].indexOf($route.query.mapType) != -1" class="panel-title panel-info border">出境信息</div>
    <div v-if="['3'].indexOf($route.query.mapType) != -1" class="form-info">
      <div class="form-item">
        <div class="form-label">出境时间：</div>
        <div
          class="form-content"
        >{{form.newPersonOutboundRelationInfo ? form.newPersonOutboundRelationInfo.outboundTime : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">是否注销中国国籍：</div>
        <div
          class="form-content"
        >{{form.newPersonOutboundRelationInfo ? form.newPersonOutboundRelationInfo.outboundIscancel : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">出国证件种类：</div>
        <div
          class="form-content"
        >{{form.newPersonOutboundRelationInfo ? form.newPersonOutboundRelationInfo.outboundCertificatetype : ""}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">证件号：</div>
        <div
          class="form-content"
        >{{form.newPersonOutboundRelationInfo ? form.newPersonOutboundRelationInfo.outboundNumber : ""}}</div>
      </div>
    </div>
    <!-- 亲密度(暂时只给阿克苏使用) -->
    <template v-if="$config.project.locale == 'aks'">
      <div class="panel-title panel-info border">亲密度</div>
      <div class="form-info">
        <i-table
          class="affinity-table"
          ref="affinityTable"
          :columns="affinityColumns"
          :data="affinityTableData"
          stripe
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
import * as apis from "@/api/collection/index.js";
import * as apiJoin from "@/api/mapJoin/index.js";
import MyPoptip from "@/components/assembly/MyPoptip/index";
import { transferParameters, sum } from "@/tools/units.js";
export default {
  name: "CaseFormObjectiveView",
  components: {
    MyPoptip
  },
  props: {
    idNumber: {
      type: String,
      default: ""
    },
    isFirst: {
      type: Boolean,
      default: true
    },
    relation: {
      type: Object,
      default() {
        return null;
      }
    },
    mapType: {
      type: String,
      default: "0"
    },
    markerObjDetail: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      form: {
        personCaseSocialInfo: null, //社会
        personReligionInfo: null, //宗教
        newPersonOutboundRelationInfo: null, //出入境关系图
        personBaokongInfo: null, //暴恐信息
        personCaseInfo: null, //案件
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
          religionEndTime: null,
          religionLearnProcess: "",
          religionStartTime: null,
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
      return this.getImagePath(this.form.personInfo.picUrl);
    },
    displayNameShow() {
      return this.isFirst;
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
    // 获取人员的亲密度列表数据
    getPersonIntimacyList() {
      let idNumber = this.idNumber;
      let collectId = this.$route.query.collectId;
      apiJoin.GET_PERSON_INTIMACY_LIST(idNumber, collectId).then(res => {
        if (res.code == 200) {
          this.affinityTableData = res.data;
        }
      });
    },
    // 获取人员的亲密度详细数据列表
    getPersonIntimacyDetailList(event, row) {
      let idNumber = this.idNumber;
      let intimacyIdNumber = row.idNumber;
      apiJoin
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
      apiJoin.GET_PERSON_CASECLUE_LIST(idNumber).then(res => {
        if (res.code == 200) {
          let data = res.data;
          console.log(res.data);
          this.personCaseClueInfo = data;
        } else {
          this.$Message.error(res.msg);
        }
      });
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
      if (form.personBaokongInfo) {
        if (form.personBaokongInfo.outboundEntryTime) {
          form.personBaokongInfo.outboundEntryTime = this.$moment(
            form.personBaokongInfo.outboundEntryTime
          ).format("YYYY-MM-DD");
        }
        this.form.personBaokongInfo = form.personBaokongInfo;
      }
      if (form.personOutboundRelationInfo) {
        if (form.personOutboundRelationInfo.outboundTime) {
          form.personOutboundRelationInfo.outboundTime = this.$moment(
            form.personOutboundRelationInfo.outboundTime
          ).format("YYYY-MM-DD");
        }
        this.form.newPersonOutboundRelationInfo =
          form.personOutboundRelationInfo;
      }
      // 宗教学经经历
      if (
        form.personInfo &&
        (form.personInfo.religionStartTime || form.personInfo.religionEndTime)
      ) {
        let startTime = null;
        if (form.personInfo.religionStartTime) {
          startTime = this.$moment(form.personInfo.religionStartTime).format(
            "YYYY-MM"
          );
        }
        let endTime = null;
        if (form.personInfo.religionEndTime) {
          endTime = this.$moment(form.personInfo.religionEndTime).format(
            "YYYY-MM"
          );
        }
        this.form.personReligionInfo = {
          religionStartTime: startTime,
          religionEndTime: endTime,
          religionLearnProcess: form.personInfo.religionLearnProcess
        };
      }
      // 被打击时间
      if (
        form.personProcessRecordInfo &&
        (form.personProcessRecordInfo.incidentTime &&
          form.personProcessRecordInfo.processTime)
      ) {
        form.personProcessRecordInfo.incidentTime = this.$moment(
          form.personProcessRecordInfo.incidentTime
        ).format("YYYY-MM");
        form.personProcessRecordInfo.processTime = this.$moment(
          form.personProcessRecordInfo.processTime
        ).format("YYYY-MM");
      }
      // 出入境时间
      if (
        form.personOutboundRecordInfo &&
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
      }
      // 社会关系图信息
      if (form.personCaseSocialInfo) {
        this.form.personCaseSocialInfo = form.personCaseSocialInfo;
      }
    },
    seeInfo(idNumber) {
      // console.log(this.$parent.$parent.$parent.$parent.$parent);
      this.$parent.$parent.$parent.$parent.$parent.$refs[
        "entryExitInfo"
      ].seeEnterInfo = true;
      this.$parent.$parent.$parent.$parent.$parent.idNumber = idNumber;
      this.$parent.$parent.$parent.$parent.$parent.isAdd = null;
      /* this.$parent.$refs["entryExitInfo"].seeEnterInfo = true;
      this.$parent.idNumber = id;
      this.$parent.isAdd = null; */
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
      let idNumbers = [
        item.idNumber,
        row.parent.idNumber,
        this.idNumber
      ].join();
      let query = {
        sfzhm: idNumbers
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
    idNumber: {
      handler(val) {
        if (
          (this.mapType == "8" || this.mapType == "9") &&
          Object.keys(this.markerObjDetail).length > 0
        ) {
          this.bindFormValue(this.markerObjDetail);
        }
        this.init();
      },
      immediate: true
    },
    mapType: {
      handler(val) {},
      immediate: true
    },
    markerObjDetail: {
      handler(val) {
        if (!val) return;
        if (
          (this.mapType == "8" || this.mapType == "9") &&
          Object.keys(val).length > 0
        ) {
          this.bindFormValue(this.markerObjDetail);
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/formView.less");
</style>
