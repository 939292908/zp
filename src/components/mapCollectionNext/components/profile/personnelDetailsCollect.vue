<template>
  <div class="editContent">
    <div class="mapDetail title" @click="mapChangePersonnel('map')" v-show="isMapDetail">图谱详情</div>
    <div
      class="personnelDetail title"
      @click="mapChangePersonnel('personnel')"
      v-show="!isMapDetail"
    >人员详情</div>
    <div class="substance" v-show="isMapDetail">
      <!-- 编辑图谱概述 -->
      <div class="editBtn" @click="editMapInfo(false)" v-if="mapInfoEditing">保存</div>
      <div class="editBtn" @click="editMapInfo(true)" v-else-if="hasSubmit">编辑</div>

      <div class="clear"></div>
      <div class="editMapName">
        <div class="left">图谱名称：</div>
        <div class="right" v-if="mapInfoEditing">
          <input class="ivu-input" type="text" v-model="mapInfo.mapName" placeholder="图谱名称" />
        </div>
        <div class="right" v-else>{{mapInfo.mapName}}</div>

        <div class="clear"></div>
      </div>
      <!-- 地图信息 -->
      <div class="mapSummary">
        <div class="left">图谱概述：</div>
        <div class="right" v-if="mapInfoEditing">
          <textarea
            class="ivu-textArea"
            v-model="mapInfo.mapDescription"
            placeholder="图谱概述"
            cols="20"
            rows="5"
          ></textarea>
        </div>
        <div class="right" v-else>{{mapInfo.mapDescription}}</div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="substance" v-if="!isMapDetail">
      <div class="editPersonnelInfo">
        <!-- 编辑人员信息-->
        <div
          class="editBtn"
          v-if="hasSubmit&& ((hasFunAuth(constantFunMap.FUN_Online_F_Map_Profile_Add_ID)&& $route.name=='CollectMarkerProfile')||(hasFunAuth(constantFunMap.FUN_Online_F_Map_Enter_Add_ID) && $route.name=='CollectMarkerExitEnter'))"
          @click="editPersonnelInfo()"
        >编辑</div>
      </div>

      <div class="basicInfo">
        <div class="infoLeft">
          <img
            :src="getImagePath(newMarkerObjDetail.personInfo.picUrl)"
            width="100%"
            height="100%"
            alt
          />
        </div>
        <div class="infoRight">
          <span class="name">{{newMarkerObjDetail.personInfo.name}}</span>
          <span class="card">{{newMarkerObjDetail.personInfo.idNumber}}</span>
          <span class="gender">
            <i>{{newMarkerObjDetail.personInfo.gender}}</i>
            <em>{{newMarkerObjDetail.personInfo.nationality}}</em>
          </span>
          <span class="address">
            户籍地：
            {{newMarkerObjDetail.personInfo.hukouAddress ? newMarkerObjDetail.personInfo.hukouAddress.addressTierPath : ''}}
            {{newMarkerObjDetail.personInfo.hukouAddress ? newMarkerObjDetail.personInfo.hukouAddress.detailAddress : ''}}
          </span>
        </div>
        <div class="clear"></div>
      </div>
      <div class="tag" v-if="personTagList!=''">
        <div class="labels" :key="index" v-for="(item,index) in personTagList">
          <span :title="item">{{item}}</span>
        </div>
      </div>
      <div class="tag" v-else>人员标签</div>
      <div class="infoExtend">
        <div class="state infoList">
          <span class="left">人员状态：</span>
          <span class="right">
            <i
              :style="{'background':$config.personLabel[newMarkerObjDetail.personInfo.state]}"
            >{{newMarkerObjDetail.personInfo.state}}/{{newMarkerObjDetail.personInfo.stateDetail}}</i>
          </span>
        </div>
        <!-- <div class="identity infoList">
          <span class="left">关系/身份:</span>
          <span class="right"></span>
        </div>-->
        <div class="attribute infoList act">
          <span class="left">五位一体属性：</span>
          <span class="right">
            <em
              :key="index"
              v-for="(item,index) in fiveOnePropertyList"
              :class="'iveOneProperty iconfont ' + $config.tagIconFont[item]"
              :style="{'color':$config.tagColor[item]}"
            ></em>
          </span>
        </div>
        <div class="profile infoList">
          <span class="left">人员简介：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.intro}}</span>
        </div>
        <div class="appearance infoList">
          <span class="left">政治面貌：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.politicsStatus}}</span>
        </div>
        <div class="appearance infoList">
          <span class="left">职业：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.profession}}</span>
        </div>
        <div class="address infoList">
          <span class="left">现住址：</span>
          <span class="right">
            {{newMarkerObjDetail.personInfo.currentAddress ? newMarkerObjDetail.personInfo.currentAddress.addressTierPath : ''}}
            {{newMarkerObjDetail.personInfo.currentAddress ? newMarkerObjDetail.personInfo.currentAddress.detailAddress : ''}}
          </span>
        </div>
        <div class="premises infoList">
          <span class="left">服务处所：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.servicePlace}}</span>
        </div>
      </div>

      <div class="handling" v-if="isProfile">被打击处理情况</div>
      <div class="handingLists" v-if="isProfile">
        <div class="handingList caseNumber">
          <span class="left">案件编号：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.caseCode}}</span>
        </div>
        <div class="handingList caseName">
          <span class="left">案件名称：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.caseName}}</span>
        </div>
        <div class="handingList caseName">
          <span class="left">案发时间：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.incidentTime}}</span>
        </div>
        <div class="handingList caseName">
          <span class="left">处理时间：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.processTime}}</span>
        </div>
        <div class="handingList results">
          <span class="left">处理结果：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.processResult}}</span>
        </div>
        <div class="handingList identity">
          <span class="left">涉案人员身份：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.personIdentity}}</span>
        </div>
        <div class="handingList caseType">
          <span class="left">案件类型：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.caseType}}</span>
        </div>
        <div class="handingList caseType">
          <span class="left">危害等级：</span>
          <span class="right">
            <i
              :style="'background:#'+newMarkerObjDetail.personProcessRecordInfo.caseTypeColor"
            >{{newMarkerObjDetail.personProcessRecordInfo.caseTypeColorName}}</i>
          </span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">案情：</span>
          <span class="right">{{newMarkerObjDetail.personProcessRecordInfo.caseCondition}}</span>
        </div>
      </div>
      <div class="handling" v-if="!isProfile">
        <span class="left">最新一条出入境信息</span>
        <span class="right" @click="seeInfo(newMarkerObjDetail.personInfo.idNumber)">
          查看全部记录
          <i class="iconfont icon-document"></i>
        </span>
      </div>
      <div
        class="handingLists"
        v-if="!isProfile&&newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList.length>0"
      >
        <div class="handingList caseDescription">
          <span class="left">出境时间：</span>
          <span
            class="right"
          >{{newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList[0].outBoundTime}}</span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">出境方式：</span>
          <span
            class="right"
          >{{newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList[0].outBoundWay}}</span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">出境理由：</span>
          <span
            class="right"
          >{{newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList[0].outBoundReason}}</span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">前往国家：</span>
          <span
            class="right"
          >{{newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList[0].outBoundToCountry}}</span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">出境口岸：</span>
          <span
            class="right"
          >{{newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList[0].outBoundChannel}}</span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">入境时间：</span>
          <span
            class="right"
          >{{newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList[0].entryTime}}</span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">入境口岸：</span>
          <span
            class="right"
          >{{newMarkerObjDetail.personOutboundRecordInfo.outBoundRecordList[0].entryChannel}}</span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">危害等级：</span>
          <span class="right">
            <i
              :style="'background:#'+newMarkerObjDetail.personOutboundRecordInfo.harmColor"
            >{{newMarkerObjDetail.personOutboundRecordInfo.harmLevel}}</i>
          </span>
        </div>
        <div class="handingList caseDescription">
          <span class="left">风险等级：</span>
          <span class="right">
            <i
              :style="'background:#'+newMarkerObjDetail.personOutboundRecordInfo.riskColor"
            >{{newMarkerObjDetail.personOutboundRecordInfo.riskLevel}}</i>
          </span>
        </div>
      </div>
      <!-- 社会信息 银行卡号等！ -->
      <div class="handling">社会信息</div>
      <div class="handingLists">
        <div class="handingList caseDescription">
          <span class="left">银行卡：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.socialBankCard}}</span>
        </div>
        <div class="handingList">
          <span class="left">车辆：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.socialCar}}</span>
        </div>
        <div class="handingList">
          <span class="left">电话：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.socialPhone}}</span>
        </div>
        <div class="handingList">
          <span class="left">QQ号码：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.socialQq}}</span>
        </div>
        <div class="handingList">
          <span class="left">微信号码：</span>
          <span class="right">{{newMarkerObjDetail.personInfo.socialWechat}}</span>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <!-- 固定bottom -->
    <div class="CollectorInfoList" v-show="isMapDetail">
      <div class="CollectorInfo">
        <div class="left">采集人：</div>
        <div class="right">{{villageInfo.creater}}</div>
        <div class="clear"></div>
      </div>
      <div class="CollectorInfo">
        <div class="left">归属部门：</div>
        <div class="right">{{villageInfo.belongDeptName}}</div>
        <div class="clear"></div>
      </div>
      <div class="CollectorInfo">
        <div class="left">归属区划：</div>
        <div class="right">{{villageInfo.belongAreaName}}</div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as apis from "@/api/collection/index.js";
import { GET_IMAGE_PATH } from "@/api/common.js";
export default {
  components: {},
  props: {
    hasSubmit: {
      type: Boolean,
      default: false
    },
    state: {
      type: Number,
      default: 0
    },
    villageName: {
      type: String,
      default: ""
    },
    markerObjDetail: {
      type: Object,
      default: {}
    },
    isMap: {
      type: String,
      default: "map"
    },
    villageInfo: {
      type: Object,
      default() {
        return null;
      }
    },
    mapInfo: {
      type: Object,
      default() {
        return null;
      }
    },
    isProfile: {
      type: Boolean,
      default: true
    }
  },
  data() {
    //这里存放数据
    return {
      isMapDetail: false, //是否显示地图详情
      newMarkerObjDetail: {}, //人员信息
      mapSummary: "图谱概述", //图谱概述
      mapInfoEditing: false, //图谱概述编辑
      personTagList: [], //人员标签
      fiveOnePropertyList: [] //五位一体
    };
  },
  mounted() {
    this.mapChangePersonnel(this.isMap);
  },
  watch: {
    isProfile: {
      handler(val) {},
      immediate: true
    },
    hasSubmit: {
      handler(val) {},
      immediate: true
    },
    state: {
      handler(val) {},
      immediate: true
    },
    isMap: {
      handler(val) {
        this.mapChangePersonnel(val);
      },
      immediate: true
    },
    markerObjDetail: {
      handler(val) {
        this.newMarkerObjDetail = null;
        this.newMarkerObjDetail = val;
        console.log(val);
        this.bindValue(val.personInfo);
      },
      immediate: true
    },
    mapInfo: {
      handler(val) {
        console.log(val, 1111);
      },
      immediate: true
    }
  },
  //方法集合
  methods: {
    // 查看出入境记录
    seeInfo(id) {
      this.$parent.$refs["entryExitInfo"].seeEnterInfo = true;
      this.$parent.idNumber = id;
      this.$parent.isAdd = null;
    },
    // 编辑图谱信息（名称和概述）
    editMapInfo(t) {
      const that = this;
      if (!t) {
        // 保存PATCH_SAVE_MAP_INFO
        var params = {
          belongArea: that.mapInfo.belongArea,
          belongAreaCode: that.mapInfo.belongAreaCode,
          belongDeptId: that.mapInfo.belongDeptId,
          belongDeptName: that.mapInfo.belongDeptName,
          collectId: that.mapInfo.collectId,
          collectPerson: that.mapInfo.collectPerson,
          mapDescription: that.mapInfo.mapDescription,
          mapName: that.mapInfo.mapName,
          mapType: that.mapInfo.mapType
        };
        apis.PATCH_SAVE_MAP_INFO(params).then(res => {
          if (res.code == 200) {
            that.mapInfoEditing = t;
          }
        });
      } else {
        this.mapInfoEditing = true;
      }
    },
    // 切换图谱详情和人员详情
    mapChangePersonnel(str) {
      if (str == "map") {
        this.isMapDetail = true;
      } else {
        this.isMapDetail = false;
      }
    },
    // 五位一体属性以及人员标签
    bindValue(val) {
      if (val.personTag == null) {
        this.personTagList = [];
      } else {
        this.personTagList = val.personTag.split(",");
      }
      if (val.fiveOneProperty == null) {
        this.fiveOnePropertyList = [];
      } else {
        this.fiveOnePropertyList = val.fiveOneProperty.split(",");
      }
    },
    // 编辑人员信息
    editPersonnelInfo() {
      this.$emit("personnelInfoEdit", this.newMarkerObjDetail);
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
div,
span {
  cursor: default;
}
.editContent {
  width: 340px;
  background: #ffffff;
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  position: relative;
  height: 100%;
  overflow-y: auto;
  .title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #ffffff;
    color: #000000;
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    border-bottom: 1px solid #bbbbbb;
  }
  .teams {
    width: 100%;
    padding: 11px;
    .team > div::after {
      content: ".";
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
    }
    .team:after {
      content: ".";
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
    }
  }
  .CollectorInfoList {
    width: 100%;
    margin-bottom: 20px;
    .CollectorInfo {
      margin-top: 8px;
    }
  }
  .substance {
    padding: 11px;
    width: 100%;

    .editBtn {
      width: 53px;
      height: 23px;
      border-radius: 4px;
      color: #000000;
      font-size: 14px;
      text-align: center;
      font-family: Microsoft Yahei;
      border: 1px solid rgba(187, 187, 187, 1);
      float: right;
      cursor: pointer;
    }

    .editMapName {
      input {
        width: 100%;
      }
    }
    .mapSummary {
      margin-bottom: 30px;
      textarea {
        width: 100%;
        resize: none;
        padding: 5px;
      }
    }
  }
}
.editMapName,
.mapSummary,
.CollectorInfo,
.teamName,
.teamDetail {
  width: 100%;
  height: auto;
  margin-top: 10px;
  font-size: 14px;
  .left {
    width: 33%;
    height: auto;
    float: left;
    margin-right: 5%;
    text-align: right;
  }
  .right {
    width: 62%;
    float: left;
    textarea {
      width: 100%;
      resize: none;
      padding: 5px;
    }
  }
}
.editPersonnelInfo:after {
  content: ".";
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
}
.basicInfo {
  width: 100%;
  .infoLeft {
    width: 92px;
    height: 120px;
    float: left;
    background: #cccccc;
    img {
      width: 100%;
    }
  }
  .infoRight {
    margin-left: 18px;
    float: left;
    width: 170px;
    span {
      display: block;
      margin-top: 4px;
    }
    .name {
      font-size: 14px;
      font-family: SourceHanSansSC-bold;
      font-weight: bold;
    }
    .card {
      font-size: 12px;
      font-family: SourceHanSansSC-regular;
    }
    .gender {
      font-size: 14px;
      i {
        font-style: normal;
      }
      em {
        font-style: normal;
        margin-left: 8px;
      }
    }
    .address {
      font-size: 12px;
    }
  }
}
.tag {
  width: 100%;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  min-height: 66px;
  margin-top: 14px;
  display: inline-flex;
  overflow-y: auto;
  flex-wrap: wrap;
  .labels {
    color: #515a6e;
    border: 1px solid #e8eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    margin: 2px 4px;
    padding: 1px 6px;
    border-radius: 4px;
    max-width: 99%;
    height: 27px;
    width: 47%;
    cursor: pointer;
    span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 22px;
    }
  }
}
.infoExtend {
  .infoList::after {
    content: ".";
    display: block;
    visibility: hidden;
    clear: both;
    height: 0;
  }
  .infoList {
    width: 100%;
    margin-top: 8px;
    font-size: 14px;
    .left {
      width: 32%;
      height: auto;
      float: left;
      margin-right: 7%;
      text-align: right;
    }
    .right {
      width: 61%;
      float: left;
      i {
        width: 100%;
        display: block;
        text-align: center;
        font-style: normal;
        color: #fff;
      }
      textarea {
        width: 100%;
        height: 100px;
      }
    }
  }
  .infoList.act {
    line-height: 51px;
    em {
      font-size: 24px;
    }
  }
}
.handling {
  font-size: 14px;
  color: #101010;
  font-weight: bold;
  margin-top: 16px;
  .left {
    float: left;
    line-height: 30px;
  }
  .right {
    float: right;
    left: 1317px;
    border-radius: 2px;
    padding: 2px 7px;
    font-weight: normal;
    color: rgba(51, 51, 51, 1);
    font-size: 12px;
    text-align: left;
    box-shadow: 0px 0px 0px 0px rgba(32, 29, 29, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    cursor: pointer;
    i {
      color: #5397d9;
    }
  }
  .clear {
    clear: both;
  }
}
.handling::after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
.handingLists {
  .handingList::after {
    content: ".";
    display: block;
    visibility: hidden;
    clear: both;
    height: 0;
  }
  .handingList {
    width: 100%;
    margin-top: 8px;
    font-size: 14px;
    .left {
      width: 32%;
      height: auto;
      float: left;
      margin-right: 7%;
      text-align: right;
    }
    .right {
      width: 61%;
      float: left;
      i {
        width: 100%;
        display: block;
        text-align: center;
        font-style: normal;
        color: #fff;
      }
    }
  }
}
.ivu-input {
  font-size: 14px;
}
.ivu-textArea {
  width: 100%;
  height: 100px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 14px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
}
.clear {
  clear: both;
}
</style>
