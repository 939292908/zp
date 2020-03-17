<template>
  <div class="editContent">
    <div class="title">地图详情</div>
    <div class="substance">
      <div
        class="editBtn"
        @click="editSummary()"
        v-if="hasEditAuth && villageInfo!=''&&villageEditSummary&&villageAllInfo.border!=null"
      >编辑</div>
      <div
        class="editBtn"
        @click="preserveSummary()"
        v-if="hasEditAuth && !villageEditSummary&&villageAllInfo.border!=null"
      >保存</div>
      <div class="clear"></div>
      <div class="editMapName">
        <div class="left">村级边界名称：</div>
        <div class="right" v-if="villageName!=''">{{villageName}}</div>
        <div class="clear"></div>
      </div>
      <!-- 地图信息 -->
      <div class="mapSummary">
        <div class="left">村级边界概述：</div>
        <div class="right" v-show="villageEditSummary&&villageInfo!=''">{{villageInfo}}</div>
        <div class="right" v-show="!villageEditSummary">
          <textarea name v-model="villageInfoEditing" id cols="30" rows="3"></textarea>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- 小队 -->
    <div class="teams" v-if="teamList!=''">
      <div v-for="(item , i) in teamList" :key="i" class="team" v-if="item!=null">
        <div class="teamName">
          <div class="left">小队/组边界名称：</div>
          <div class="right">{{item.name}}</div>
        </div>
        <div class="teamDetail">
          <div class="left">小队/组边界概述：</div>
          <div class="right">{{item.detail}}</div>
        </div>
      </div>
    </div>
    <!-- 固定bottom -->
    <div class="CollectorInfoList">
      <div class="CollectorInfo">
        <div class="left">归属区划：</div>
        <div class="right">{{villageAllInfo.belongAreaName}}</div>
        <div class="clear"></div>
      </div>
      <div class="CollectorInfo">
        <div class="left">归属部门：</div>
        <div class="right">{{villageAllInfo.belongDeptName}}</div>
        <div class="clear"></div>
      </div>
      <div class="CollectorInfo">
        <div class="left">创建时间：</div>
        <div class="right">{{villageAllInfo.createTime}}</div>
        <div class="clear"></div>
      </div>
      <div class="CollectorInfo">
        <div class="left">最后修改人：</div>
        <div class="right">{{villageAllInfo.creater}}</div>
        <div class="clear"></div>
      </div>
      <div class="CollectorInfo">
        <div class="left">最后修改时间：</div>
        <div class="right">{{villageAllInfo.updateTime}}</div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- <dir>*绘制完成小队/组之后才可以向地图添加人员</dir> -->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  components: {},
  props: {
    villageName: {
      type: String,
      default: ""
    },
    villageInfo: {
      type: String,
      default: ""
    },
    teamList: {
      type: Array,
      default: []
    },
    villageAllInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    //这里存放数据
    return {
      villageEditSummary: true,
      villageInfoEditing: ""
    };
  },
  computed: {
    hasEditAuth() {
      return this.hasFunAuth(
        this.constantFunMap.FUN_Online_F_Map_Graph_Edit_ID
      );
    }
  },
  mounted() {},
  //方法集合
  methods: {
    // 编辑概述
    editSummary() {
      this.villageEditSummary = false;
      this.villageInfoEditing = this.villageInfo;
    },
    // 保存概述
    preserveSummary() {
      this.villageEditSummary = true;
      this.$emit("villageInfoToFather", this.villageInfoEditing);
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.editContent {
  flex: 0 0 340px;
  flex-direction: row-reverse;
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
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
    background: #f4f4f4;
    .team {
      padding: 13px;
      border: 1px solid #d7d7d7;
      background: #ffffff;
      margin-bottom: 10px;
      border-radius: 4px;
    }
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
    .CollectorInfo {
      margin-top: 8px;
    }
  }
  .substance {
    padding-top: 11px;
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
      margin-right: 20px;
      cursor: pointer;
    }

    .editMapName {
      input {
        width: 100%;
      }
    }
    .mapSummary {
      margin-bottom: 10px;
      textarea {
        width: 93%;
        resize: none;
        padding: 5px;
      }
    }
  }
}
.teamName,
.teamDetail,
.teamId {
  width: 100%;
  height: auto;
  margin-top: 10px;
  font-size: 14px;
  .left {
    color: #666666;
    font-size: 12px;
  }
  .right {
    color: #000000;
    font-size: 14px;
    overflow-y: auto;
  }
}
.teamDetail .right {
  max-height: 60px;
  overflow-y: scroll;
}
.editMapName,
.mapSummary,
.CollectorInfo {
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
.clear {
  clear: both;
}
</style>