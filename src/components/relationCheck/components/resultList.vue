<template>
  <div class="resultList">
    <div class="resultOne" v-if="result=='one'">
      <div class="resultListHeader">
        <span>共 {{unmatchArr.length}} 条关系（图谱列表）</span>
        <i class="iconfont icon-guanbi1" @click="closeRight()"></i>
      </div>
      <div class="resultListContent one relation">
        <div class="line">
          <!-- <img :src="getImagePath(donePersonnelInfo.picUrl)" alt=""> -->
          <div class="img left">
            <img :src="linksInfo.source.image" alt />
          </div>
          <div class="basicsInfo right">
            <div
              class="name li"
              :title="linksInfo.source.properties.XM"
            >{{linksInfo.source.properties.XM}}</div>
            <div class="id">{{linksInfo.source.properties.SFZHM}}</div>
          </div>
        </div>
        <div class="line">
          <!-- <img :src="getImagePath(donePersonnelInfo.picUrl)" alt=""> -->
          <div class="img left">
            <img :src="linksInfo.target.image" alt />
          </div>
          <div class="basicsInfo right">
            <div
              class="name li"
              :title="linksInfo.target.properties.XM"
            >{{linksInfo.target.properties.XM}}</div>
            <div class="id">{{linksInfo.target.properties.SFZHM}}</div>
          </div>
        </div>
        <div class="dashed">
          <i class="iconfont icon-lianjie"></i>
        </div>
        <!-- <div class="line"></div> -->
        <div
          class="list"
          v-for="(item,index) in unmatchArr"
          :key="index"
          :class="item.dataRight?'':'ban'"
          @click="toArchivesjoin(item)"
        >
          <div class="left">
            <span :style="{'background':$config.topTagColors[item.shortName]}">{{item.shortName}}</span>

            <!--  -->
          </div>
          <div class="right">
            <span class="map" :title="item.mapName">
              <i class="iconfont" :class="item.dataRight?'':'icon-suoding'"></i>
              {{item.mapName}}
            </span>
            <span class="number">
              涉及人数：
              <i>{{item.userCount}}</i>
            </span>
            <span class="address" :title="item.deptName">{{item.deptName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="resultTwo" v-if="result=='two'">
      <div class="resultListHeader">
        <div>
          已匹配到的身份证号（
          <span>{{matchedUserInfoLength}}</span>&nbsp;）
        </div>
        <i class="iconfont icon-guanbi1" @click="closeRight()"></i>
      </div>
      <div class="resultListContent items one" ref="itemOne">
        <div
          class="item"
          v-for="(item,index) in tmpData.matchedUserInfo"
          :key="index"
          @click="filterPersonnel(item)"
        >
          <div class="imgColor">
            <img data-v-a0e7921e :src="getImagePath(item.picUrl)" width="100%" height="100%" alt />
          </div>
          <div class="itemInfo">
            <span class="itemName">{{item.userName}}</span>
            <span class="IDCard">{{item.idNumber}}</span>
            <span class="state">标签数：{{item.tagCount}}</span>
          </div>
          <div class="arrowRight">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
      <div class="resultListHeader">
        <div class="un">
          未匹配到的身份证号（
          <span>{{unMatchIdsLength}}</span>&nbsp;）
        </div>
      </div>
      <!-- <div class="resultListContent items two" :style="maxHeight" v-if="unMatchIdsLength>0"> -->
      <div class="resultListContent items two" v-if="unMatchIdsLength>0">
        <table cellspacing="0" cellpadding="0" border="0">
          <thead class="thead">
            <tr>
              <th class="center" width="70px">序号</th>
              <th class="left relation">
                身份证号
                <i class="iconfont icon-document" @click="copyObjFunction()"></i>
              </th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr v-for="(item,index) in tmpData.unMatchIds" :key="index">
              <td class="center">{{index+1}}</td>
              <td class="left">{{item}}</td>
            </tr>
          </tbody>
        </table>
        <textarea name="copy" id="copyObj" cols="30" rows="10" v-model="copyObj"></textarea>
        <!-- <div class="list">{{x}}</div> -->
      </div>
    </div>
    <div class="resultThree" v-if="result=='three'">
      <div class="resultListHeader">
        <span>图谱关联列表</span>
        <i class="iconfont icon-guanbi1" @click="closeRight()"></i>
      </div>
      <div class="resultListContent person">
        <div class="personInfo">
          <div class="listTheme" v-if="dispute&&linksInfo.properties!=undefined">
            <div class="name">
              <i
                :style="{'background':$config.topTagColors[linksInfo.properties.mapTypeName]}"
              >{{linksInfo.properties.mapTypeName}}</i>
              <span
                :class="linksInfo.properties.dataRight ? '':'ccc'"
                :title="linksInfo.properties.mapName"
                @click="toArchivesjoin(linksInfo.properties)"
              >
                <i v-if="!linksInfo.properties.dataRight" class="iconfont icon-suoding"></i>
                {{linksInfo.properties.mapName}}
              </span>
            </div>
            <div class="count">
              图谱相关人员列表：
              <span>{{linksInfo.properties.personCount}}/{{linksInfo.properties.totalPersonCount}}</span>
              <span></span>
            </div>
          </div>
          <div class="listTheme" v-if="!dispute&&linksInfo.properties!=undefined">
            <div class="name">
              <i
                :style="{'background':$config.topTagColors[linksInfo.target.properties.mapTypeName]}"
              >{{linksInfo.target.properties.mapTypeName}}</i>
              <span
                :class="linksInfo.target.properties.dataRight ? '':'ccc'"
                :title="linksInfo.target.properties.mapName"
                @click="toArchivesjoin(linksInfo.target.properties)"
              >
                <i v-if="!linksInfo.target.properties.dataRight" class="iconfont icon-suoding"></i>
                {{linksInfo.target.properties.mapName}}
              </span>
            </div>
            <div class="name">
              <i
                :style="{'background':$config.topTagColors[linksInfo.source.properties.mapTypeName]}"
              >{{linksInfo.source.properties.mapTypeName}}</i>
              <span
                :class="linksInfo.source.properties.dataRight ? '':'ccc'"
                :title="linksInfo.source.properties.mapName"
                @click="toArchivesjoin(linksInfo.source.properties)"
              >
                <i v-if="!linksInfo.source.properties.dataRight" class="iconfont icon-suoding"></i>
                {{linksInfo.source.properties.mapName}}
              </span>
            </div>
            <div class="alike">
              <div class="alikeLeft">
                相同人员列表：
                <span>{{unmatchArr.length}}</span>
              </div>
              <div
                class="alikeRight"
                :class="linksInfo.source.properties.dataRight&&linksInfo.target.properties.dataRight?'edit':''"
                @click="toJoin()"
              >图谱串并</div>
            </div>
            <div class="position">
              <i class="iconfont icon-lianjie"></i>
            </div>
          </div>
          <div class="lists" v-for="(item,index) in unmatchArr" :key="index">
            <person-card :key="index" :user="item"></person-card>
            <!-- <div class="listsLeft">
              <img :src="getImagePath(item.properties.picUrl)" height="95" alt />
              <span
                :style="'background:'+$config.personLabel[item.properties.STATE]"
                :title="item.properties.STATE"
              >{{item.properties.STATE}}</span>
            </div>
            <div class="listRight">
              <div class="name" :title="item.properties.XM">{{item.properties.XM}}</div>
              <div class="idNumber">{{item.properties.SFZHM}}</div>
              <div class="address" :title="item.properties.HJD">{{item.properties.HJD}}</div>
              <div class="riskLevel-caseClub">
                <div class="riskLevel-item" v-if="item.riskLevel">
                  <span :title="item.riskLevel.levelLabel + ': '+ item.riskLevel.score" :style="{'background':item.riskLevel.color,'border':'1px solid ' + item.riskLevel.color,'color':'#ffffff'}">
                    {{item.riskLevel.levelLabel + ': '+ item.riskLevel.score}}
                  </span>
                </div>
                <template v-if="$config.project.locale == 'aks' && item.caseClueStats">
                  <div class="caseClub-item" 
                    :key="index" 
                    v-for="(caseObj,index) in item.caseClueStats" 
                    @click="handleCaseClubClick(caseObj,item)">
                    <span :title="caseObj.name + ': '+ caseObj.count" :style="{'border': '1px solid ' + caseClubColor(caseObj.name),'color':caseClubColor(caseObj.name)}">
                      {{caseObj.name + ': '+ caseObj.count}}
                    </span>
                  </div>
                </template>                
              </div>
              <div class="tags">
                {{$config.properties.RYBQ}}数：{{item.properties.FIVE_ONE_PROPERTY | fiveOneLength}}
                <i
                  v-for="(i,k) in item.properties.FIVE_ONE_PROPERTY.split(',')"
                  :key="k"
                  :class="'iveOneProperty iconfont ' + $config.tagIconFont[i]"
                  :style="{'color':$config.tagColor[i]}"
                  :title="i"
                ></i>
              </div>
              <div class="mapType">
                <div
                  class="mapTypeFor"
                  v-for="(type, k, s) in item.tplxs"
                  :key="s"
                  :style="'background:'+$config.topTagColors[k]"
                  :class="(index+1)%4==0?'lastMapFor':''"
                >
                  {{k}}
                  <i :style="'background:'+$config.topTagColors[k]">{{type | itemLength}}</i>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import { transferParameters } from "@/tools/units.js";
import { CASE_CODE, CLUB_CODE } from "@/api/config.js";
import personCard from "@/components/assembly/personCard";
export default {
  props: {
    result: {
      type: String, //身份证为匹配信息或已查找信息
      default: ""
    },
    unmatchArr: {
      type: Array,
      default: null
    },
    tmpData: {
      type: Object,
      default() {
        return null;
      }
    },
    linksInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    dispute: {
      type: Boolean,
      default: false
    }
  },
  components: { personCard },
  data() {
    //这里存放数据
    return {
      caseCodeKey:CASE_CODE,//案件KEY
      clubCodeKey:CLUB_CODE,//线索KEY
      copyObj: "", //copy
      // offsetHeight: 0, //height
      unMatchIdsLength: 0,
      matchedUserInfoLength: 0,
      fiveOnePropertyList: []
    };
  },
  computed: {
    // maxHeight() {
    //   return "max-height: calc(100% - " + this.offsetHeight + "px)";
    // }
  },
  mounted() {
    console.log(this.linksInfo);
    // const that = this;
    // if (that.$refs.itemOne) {
    //   that.offsetHeight = that.$refs.itemOne.offsetHeight + 72;
    // } else {
    //   that.offsetHeight = 0;
    // }
    // console.log(that.offsetHeight);
  },
  watch: {
    dispute: {
      handler(val) {},
      immediate: true
    },
    linksInfo: {
      handler(val) {},
      immediate: true
    },
    result: {
      handler(val) {},
      immediate: true
    },
    unmatchArr: {
      handler(val) {
        if (this.$parent.result == "three") {
        }
      },
      immediate: true
    },
    tmpData: {
      handler(val) {
        if (val.unMatchIds == undefined) {
          this.unMatchIdsLength = 0;
          this.matchedUserInfoLength = 0;
        } else {
          this.unMatchIdsLength = val.unMatchIds.length;
          this.matchedUserInfoLength = val.matchedUserInfo.length;
        }
        if (this.unMatchIdsLength > 0) {
          this.copyObj = val.unMatchIds.join(",");
        } else {
          this.copyObj = "";
        }
        console.log("tmpData", val);
      },
      immediate: true,
      deep: true
    }
  },
  //方法集合
  methods: {
    //图谱串并
    toJoin() {
      if (
        this.linksInfo.source.properties.dataRight &&
        this.linksInfo.target.properties.dataRight
      ) {
        var areaMapCodes =
          this.linksInfo.source.properties.mapCode +
          "," +
          this.linksInfo.target.properties.mapCode;
        let params = areaMapCodes
        let path = '/join'
        transferParameters(this,path,params,null,'areaMapCodes')
      }
    },
    // 跳转
    toArchivesjoin(data) {
      var mc = "";
      var sfzhm = "";
      if (this.$route.name == "GroupAnalyse") {
        mc = "群体分析";
        sfzhm = this.unmatchArr.map(x=>x.id).join();
      } else {
        mc = "关系挖掘";
        sfzhm =
          this.linksInfo.target.properties.SFZHM +
          "," +
          this.linksInfo.source.properties.SFZHM;
      }
      if (data.dataRight) {
        var query = {
          tpids: data.mapId,
          mc: mc
        };
        transferParameters(this, "/archivesjoin", sfzhm, query);
        /* const { href } = this.$router.resolve({
          path: "/archivesjoin",
          query: {
            tpids: data.mapId,
            mc: mc
          }
        });
        window.open(href, "_blank"); */
      }
    },
    // 案件线索点击事件
    handleCaseClubClick(caseClubItem,item) {
      if(caseClubItem.name == CASE_CODE || caseClubItem.name == CLUB_CODE) {
        const { href } = this.$router.resolve({
          path: "/caseClubList",
          query: {
            sfzhm: item.properties.SFZHM
          }
        });
        window.open(href, "_blank");
      }
    },
    caseClubColor(val) {
      if(val == this.caseCodeKey) {
        return '#d74348'
      } else if(val == this.clubCodeKey) {
        return '#4264d7'
      }
      return '#d74348'
    },
    filterPersonnel(data) {
      this.$parent.filterText = data.idNumber;
      this.$parent.searchRelation();
      console.log(this.$parent.filterText);
    },
    // 赋值
    copyObjFunction() {
      let doc = document.getElementById("copyObj");
      doc.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
    },
    // 关闭
    closeRight() {
      this.$parent.resultListShow = false;
    }
  },
  filters: {
    fiveOneLength: function(val) {
      var newArr = [];
      if (val != "") {
        newArr = val.split(",");
      }
      return newArr.length;
    },
    itemLength(val) {
      return val.length;
    },    
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.resultList {
  width: 300px;
  height: 100%;
  background: #ffffff;
  position: absolute;
  right: 0;
  top: 0;
  border-left: 1px solid #e3e3e3;
  z-index: 999;

  .resultListHeader {
    position: relative;
    text-align: center;
    padding: 7px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #e3e3e3;
    div {
      span {
        font-weight: bold;
      }
    }
    .un {
      color: #e60012;
    }
    i {
      position: absolute;
      top: 6px;
      right: 7px;
      color: #757171;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .resultTwo .resultListHeader {
    text-align: left;
    padding: 7px 12px;
  }

  /* .two {
    height: calc(~"100% - 36px");
  } */
  .resultListContent {
    padding: 16px 12px;
    // overflow-y: auto;
    // height: 100%;
    .line {
      padding: 4px;
      margin-bottom: 8px;
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;
      .left.img {
        height: 100%;
        padding: 2px 4px 2px 2px;
        flex: 1 1 42px;
        img {
          height: 100%;
        }
      }
      .right.basicsInfo {
        padding-left: 2px;
        flex: 1 1 auto;
        width: calc(100% - 50px);
        div.li {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .name {
          font-size: 14px;
        }
        .id {
          font-size: 12px;
          color: #818181;
        }
      }
    }
    .dashed {
      width: 30%;
      height: 60px;
      position: absolute;
      right: 14px;
      top: 40px;
      border: 1px dashed #bbbbbb;
      border-left: 0px dashed #bbbbbb;
      z-index: -1;
      i {
        position: absolute;
        top: 16px;
        right: -8px;
      }
    }
    .item {
      width: 100%;
      height: 80px;
      color: #000000;
      font-size: 14px;
      font-family: Roboto;
      border-bottom: 1px solid #e3e3e3;
      padding: 12px;
      cursor: pointer;
      .imgColor {
        width: 52px;
        height: 55px;
        text-align: center;
        float: left;
      }
      .itemInfo {
        float: left;
        margin-left: 9px;
        span {
          display: block;
        }
        .itemName {
          font-size: 14px;
          color: #333333;
          font-family: SourceHanSansSC-bold;
        }
        .IDCard {
          font-size: 12px;
          color: #999999;
          font-family: SourceHanSansSC-reqular;
        }
        .state {
          font-size: 12px;
          color: #999999;
          font-family: SourceHanSansSC-reqular;
        }
      }
      .arrowRight {
        float: right;
        line-height: 57px;
        color: #aaaaaa;
      }
    }
    table {
      width: 100%;
      font-size: 12px;
      border-collapse: collapse;
      border: 1px solid #e3e3e3;
      border-bottom: 0px solid #e3e3e3;
      .center {
        text-align: center;
      }
      .left {
        text-align: left;
      }
      .thead {
        background: #e8eaeb;
        color: #101010;
        font-weight: bold;
        .relation {
          position: relative;
          i {
            position: absolute;
            top: 2px;
            right: 10px;
            color: #969899;
          }
        }
        tr {
          height: 28px;
        }
      }
      .tbody {
        tr {
          height: 34px;
          border-bottom: 1px solid #e3e3e3;
        }
      }
    }

    .list {
      width: 100%;
      height: 84px;
      line-height: 20px;
      border-radius: 4px;
      text-align: center;
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
      border: 1px solid #e3e3e3;
      margin-bottom: 12px;
      padding: 10px 13px;
      cursor: pointer;
      .left {
        float: left;
        width: 10%;
        span {
          width: 20px;
          height: 20px;
          display: block;
          line-height: 20px;
          border-radius: 2px;
          background-color: rgba(56, 168, 55, 1);
          color: #ffffff;
          font-size: 12px;
          text-align: center;
          margin-top: 4px;
        }
      }
      .right {
        float: left;
        width: 90%;
        text-align: left;
        padding-left: 8px;
        span {
          display: block;
          font-size: 12px;
          color: #666666;
          i {
            color: #0668c8;
            font-style: normal;
          }
        }
        .map {
          font-size: 14px;
          font-weight: bold;
          color: #666666;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          i {
            color: #9f9f9f;
          }
        }
        .address {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .resultOne,
  .resultTwo,
  .resultThree {
    height: 100%;
  }
  .resultListContent.one.relation {
    height: calc(~"100% - 58px");
    overflow-y: auto;
    position: relative;
    .ban {
      background: #eeeeee;
      cursor: no-drop;
    }
  }
  .resultListContent.items.one {
    padding: 0;
    max-height: calc(58% - 36px);
    overflow-y: auto;
  }
  .resultListContent.items.two {
    max-height: calc(42% - 36px);
    height: auto;
    overflow-y: auto;
  }
  .resultListContent.person {
    height: calc(~"100% - 36px");
    overflow-y: auto;

    .personInfo {
      width: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(227, 227, 227, 1);
      padding: 20px 6px;
      .listTheme {
        padding-left: 10px;
        position: relative;
        .name {
          color: rgba(51, 51, 51, 1);
          font-size: 14px;
          text-align: left;
          margin-bottom: 8px;
          font-weight: bold;
          width: 85%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: #ffffff;
          .ccc {
            color: #aaaaaa;
          }
          i {
            font-style: normal;
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 2px;
            color: rgba(255, 255, 255, 1);
            font-size: 12px;
            text-align: center;
            font-weight: 400;
          }
          span {
            cursor: pointer;
          }
          .iconfont {
            color: #aaaaaa;
            margin-right: 0;
            font-size: 16px;
          }
        }
        .count {
          height: 23px;
          color: rgba(102, 102, 102, 1);
          font-size: 14px;
          text-align: left;
          span {
            color: #0668c8;
          }
        }
        .alike {
          left: 1171px;
          color: rgba(102, 102, 102, 1);
          font-size: 14px;
          text-align: left;
          margin: 10px 0;
          .alikeLeft {
            float: left;
          }
          .alikeRight {
            float: right;
            text-align: center;
            cursor: pointer;
            width: 72px;
            height: 26px;
            line-height: 26px;
            border-radius: 2px;
            background-color: #dddddd;
            color: rgba(255, 255, 255, 1);
            font-size: 12px;
            box-shadow: 0px 0px 0px 0px rgba(32, 29, 29, 1);
          }
          .alikeRight.edit {
            background-color: rgba(6, 104, 200, 1);
          }
        }
        .alike::after {
          content: ".";
          height: 0;
          clear: both;
          visibility: hidden;
          display: block;
        }
        .position {
          width: 80%;
          height: 29px;
          position: absolute;
          right: 7px;
          top: 10px;
          border: 1px dashed #bbbbbb;
          border-left: 0px dashed #bbbbbb;
          z-index: -1;
          i {
            position: absolute;
            top: 2px;
            right: -8px;
          }
        }
      }
      .lists {
        width: 100%;
        height: 120px;
        left: 1161px;
        border-radius: 2px;
        text-align: left;
        margin-bottom: 12px;
        box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(204, 204, 204, 1);
        .listsLeft {
          float: left;
          img {
            width: 76px;
            height: 95px;
            display: block;
          }
          span {
            display: block;
            width: 76px;
            height: 23px;
            line-height: 23px;
            border-radius: 0px 0px 0px 2px;
            color: rgba(255, 255, 255, 1);
            font-size: 12px;
            text-align: center;
          }
        }
        .listRight {
          float: left;
          margin-left: 9px;
          padding: 2px 0;
          line-height: 1.2;
          width: calc(100% - 89px);
          cursor: pointer;
          .mapType {
            .mapTypeFor {
              display: inline-block;
              width: 16px;
              height: 16px;
              line-height: 16px;
              border-radius: 2px;
              color: rgba(255, 255, 255, 1);
              font-size: 11px;
              text-align: center;
              position: relative;
              cursor: pointer;
              margin: 6px 4px 6px 0;
              i {
                position: absolute;
                top: -7px;
                right: -7px;
                border-radius: 50%;
                color: #ffffff;
                width: 14px;
                height: 14px;
                line-height: 14px;
                color: rgba(255, 255, 255, 1);
                font-size: 8px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 1);
                font-style: normal;
              }
            }
          }
          .name {
            width: 100%;
            height: 21px;
            color: rgba(51, 51, 51, 1);
            font-size: 14px;
            text-align: left;
            font-weight: bold;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .idNumber {
            color: rgba(51, 51, 51, 1);
            font-size: 12px;
            text-align: left;
          }
          .address {
            color: rgba(153, 153, 153, 1);
            font-size: 12px;
            text-align: left;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .tags {
            color: rgba(51, 51, 51, 1);
            font-size: 12px;
            text-align: left;
          }
          .riskLevel-caseClub{
            > div{
              display: inline-block;
              // margin: 1px 3px 1px 0;           
              > span{
                border-radius:1px;
                width: 54px;
                padding: 2px 0 2px 2px;
                display: inline-block;
                overflow: hidden;
              }
            }
            .caseClub-item{
              &:nth-child(2){
                margin: 1px 3px 1px 0;
              }
              &:last-child{
                margin: 1px 0px 1px 0;
              }
            }
          }
        }
      }
    }
  }
}
#copyObj {
  opacity: 0;
  width: 1px;
  height: 1px;
  border: none;
}
</style>