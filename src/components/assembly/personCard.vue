<!--人员卡片信息-->
<template>
  <div class="person-card-wrapper">
    <!-- 卡片信息 -->
    <div
      class="person-card"
      v-if="item"
      v-click-outside="handleClose"
      @mousedown.prevent="handleMouseDown($event)"
      @contextmenu.prevent="handleContextmenuEvent($event)"
    >
      <div class="left">
        <img :src="getImagePath((item.properties && item.properties.picUrl))" alt />
        <span
          :style="'background:' + (item.properties && item.properties.STATE ? $config.personLabel[item.properties.STATE] : '#ccc')"
          :title="item.properties && item.properties.STATE"
        >{{(item.properties && item.properties.STATE) || '空'}}</span>
      </div>
      <div class="right">
        <div
          class="name"
          :title="item.properties && item.properties.XM"
        >{{item.properties && item.properties.XM}}</div>
        <div class="idNumber">{{item.properties && item.properties.SFZHM}}</div>
        <div
          class="address"
          :title="item.properties && item.properties.HJD"
        >{{item.properties && item.properties.HJD}}</div>
        <div class="riskLevel-caseClub">
          <div class="riskLevel-item" v-if="item.riskLevel">
            <span
              :title="item.riskLevel.levelLabel + ': '+ item.riskLevel.score"
              :style="{'background':item.riskLevel.color,'border':'1px solid ' + item.riskLevel.color,'color':'#ffffff'}"
            >{{item.riskLevel.levelLabel + ': '+ item.riskLevel.score}}</span>
          </div>
          <template v-if="$config.project.locale == 'aks' && item.caseClueStats">
            <div
              class="caseClub-item"
              :key="index"
              v-for="(caseObj,index) in item.caseClueStats"
              @click="handleCaseClubClick(caseObj,item)"
            >
              <span
                :title="caseObj.name + ': '+ caseObj.count"
                :style="{'border': '1px solid ' + caseClubColor(caseObj.name),'color':caseClubColor(caseObj.name)}"
              >{{caseObj.name + ': '+ caseObj.count}}</span>
            </div>
          </template>
        </div>
        <div class="tags">
          {{$config.properties.RYBQ}}数：{{(item.properties && item.properties.FIVE_ONE_PROPERTY) | fiveOneLength}}
          <template
            v-if="item.properties && item.properties.FIVE_ONE_PROPERTY"
          >
            <i
              v-for="(i,k) in item.properties.FIVE_ONE_PROPERTY.split(',')"
              :key="k"
              :class="'iveOneProperty iconfont ' + $config.tagIconFont[i]"
              :style="{'color':$config.tagColor[i]}"
              :title="i"
            ></i>
          </template>
        </div>
        <div class="mapType" v-if="item.tplxs">
          <div
            class="mapTypeFor"
            v-for="(type, k, i) in item.tplxs"
            :key="i"
            :style="'background:' + $config.topTagColors[k]"
            :class="(i+1)%4==0?'lastMapFor':''"
            @mouseenter.prevent="handleTagsMouseEnter($event, item, type, k, i)"
          >
            {{k}}
            <i :style="'background:' + $config.topTagColors[k]">{{type | itemLength}}</i>
          </div>
        </div>
      </div>
    </div>
    <!-- 右键菜单 -->
    <div
      ref="contextmenu"
      v-transfer-dom
      data-transfer="true"
      @contextmenu.prevent
      v-show="contextmenuVisible"
      class="person-contextmenu"
      :style="contextmenuStyle"
    >
      <ul>
        <li
          :key="index"
          v-for="(item,index) in menuList"
          @click.stop.prevent="item.method(item,index)"
        >{{item.name}}</li>
      </ul>
    </div>
    <!-- 个人信息 -->
    <transition name="personInforArea">
      <ArchivalInfor v-if="personInforVisible" @listenToChild="hidePersonInfor" :tpInfo="tpInfo"></ArchivalInfor>
    </transition>
    <!-- 图谱关系列表数据 -->
    <template v-if="showTags && currentSelectMapTag">
      <div
        class="person-card-tag-list"
        ref="tagList"
        v-transfer-dom
        data-transfer="true"
        @contextmenu.prevent
        v-show="tagListVisible"
        :style="tpInfoStyle"
      >
        <div class="top-label">
          <span class="title">相关图谱:</span>
          <span class="filter-condition" @click.stop.prevent="handleFilterConditionEvent">更多信息</span>
          <!-- <span class="allStack">全部叠加</span> -->
        </div>
        <div class="list">
          <ul>
            <li
              :class="{'no-auth':!item.dataRight}"
              :key="index"
              v-for="(item,index) in currentSelectMapTag.list"
              @click.stop.prevent="handleTagItemClick(item,index)"
            >
              <i v-if="!item.dataRight" class="lock-icon iconfont icon-suoding"></i>
              <span>{{item.tpms}}</span>
            </li>
            <!-- <li>
              <span>颠覆世俗的快乐发生了电风扇地方势力对抗手动阀手动阀手动阀手动阀</span>
            </li>-->
          </ul>
        </div>
      </div>
    </template>
    <!-- 高级查询模态窗 -->
    <D3FilterCondition
      v-model="filterConditionVisible"
      :params="filterConditionParams"
      :meta-title="metaTitle"
    ></D3FilterCondition>
  </div>
</template>
<script>
import { CASE_CODE, CLUB_CODE } from "@/api/config.js";
import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
import D3FilterCondition from "@/components/assembly/D3FilterCondition";
import TransferDom from "@/directives/transfer-dom";
import { directive as clickOutside } from "v-click-outside-x";
import { getModalMaxIndex, topTagClickFn } from "@/tools/units.js";
export default {
  name: "person-card",
  props: {
    user: {
      type: Object,
      default: () => null
    },
    showTags: {
      type: Boolean,
      default: true
    },
    metaTitle: {
      type: String,
      default: "智能搜索"
    }
  },
  directives: { TransferDom, clickOutside },
  components: {
    ArchivalInfor,
    D3FilterCondition
  },
  computed: {
    item() {
      return this.user;
    }
  },
  data() {
    let _this = this;
    return {
      contextmenuVisible: false,
      personInforVisible: false,
      menuList: [
        {
          name: "查看档案",
          method(item, index) {
            _this.personInforVisible = true;
            _this.tpInfo = _this.item;
            _this.contextmenuVisible = false;
          }
        }
      ],
      contextmenuStyle: {},
      tpInfo: null,
      tpInfoStyle: {},
      tagListVisible: false,
      currentSelectMapTag: null,
      filterConditionVisible: false,
      filterConditionParams: null
    };
  },
  methods: {
    handleCaseClubClick(caseClubItem, item) {
      if (caseClubItem.name == CASE_CODE || caseClubItem.name == CLUB_CODE) {
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
      if (val == CASE_CODE) {
        return "#d74348";
      } else if (val == CLUB_CODE) {
        return "#4264d7";
      }
      return "#d74348";
    },
    handleMouseDown(event) {
      if (event.button != 2) {
        this.contextmenuVisible = false;
        this.tagListVisible = false;
      } else {
        event.preventDefault();
        this.tagListVisible = false;
        this.handleContextmenuEvent(event);
      }
    },
    // 右键事件
    handleContextmenuEvent(event) {
      // 排他
      document.querySelectorAll(".person-contextmenu").forEach(item => item.style.display = "none");
      if (this.$refs.contextmenu) this.$refs.contextmenu.style.display = "block";

      this.contextmenuVisible = true;
      this.$nextTick(() => {
        let contextmenuEl = this.$refs.contextmenu;
        let winWidth = document.documentElement.offsetWidth;
        let winHeight = document.documentElement.offsetHeight;
        const style = {};
        if (contextmenuEl) {
          let left = event.x;
          let top = event.y;
          let cELWidth = contextmenuEl.offsetWidth;
          let cELHeight = contextmenuEl.offsetHeight;
          if (event.x + cELWidth > winWidth) {
            left = event.x - (event.x + cELWidth - winWidth);
          }
          if (event.y + cELHeight > winHeight) {
            top = event.y - (event.y + cELHeight - winHeight);
          }
          style.top = top + "px";
          style.left = left - 10 + "px";
          style.zIndex = getModalMaxIndex() + 1;
          // style.zIndex = 99;
          this.contextmenuStyle = style;
        }
      });
    },
    hidePersonInfor() {
      this.personInforVisible = false;
    },
    // 点击卡片外部出发关闭悬浮层事件
    handleClose() {
      this.contextmenuVisible = false;
      this.tagListVisible = false;
    },
    // 关联图谱类型鼠标悬浮事件
    handleTagsMouseEnter(event, item, type, k, i) {
      // 排他
      document.querySelectorAll(".person-card-tag-list").forEach(item => item.style.display = "none");
      if (this.$refs.tagList) this.$refs.tagList.style.display = "block";

      this.tagListVisible = true;
      this.contextmenuVisible = false;
      this.currentSelectMapTag = {
        type: k,
        list: type
      };
      this.$nextTick(() => {
        let tagEl = this.$refs.tagList;
        let winWidth = document.documentElement.offsetWidth;
        let winHeight = document.documentElement.offsetHeight;
        let cBBox = event.target.getBoundingClientRect();
        const style = {};
        if (tagEl) {
          let left = cBBox.left;
          let top = cBBox.bottom;
          let cELWidth = tagEl.offsetWidth;
          let cELHeight = tagEl.offsetHeight;
          if (left + cELWidth > winWidth) {
            left = left - (left + cELWidth - winWidth);
          }
          if (top + cELHeight > winHeight) {
            top = cBBox.top - cELHeight;
          }
          style.top = top + "px";
          style.left = left - 15 + "px";
          style.zIndex = getModalMaxIndex() + 1;
          this.tpInfoStyle = style;
        }
      });
    },
    // 关联图谱列表中项的点击事件
    handleTagItemClick(item, index) {
      let user = this.user;
      let data = {
        tpid: item.tpid,
        tpms: item.tpms,
        mapId: item.mapId,
        collectId: item.collectId,
        villageCode: item.villageCode,
        typeId: item.typeId,
        color: user.color,
        name: user.properties.XM,
        relationName: user.gxmc || user.typeName,
        type: this.currentSelectMapTag.type,
        oid: user.oid,
        tpids: user.tpids,
        parentTpid: user.tpid,
        sfzhm: user.properties.SFZHM,
        dataRight: item.dataRight
      }
      this.tagListVisible = false;
      topTagClickFn(data, this.metaTitle, this);
    },
    // 更多信息事件
    handleFilterConditionEvent() {
      let user = this.item;
      let data = {
        mapId: user.mapId,
        tpid: user.tpid,
        color: user.color,
        name: user.properties.XM,
        relationName: user.gxmc || user.typeName,
        type: this.currentSelectMapTag.type,
        oid: user.oid,
        parentTpid: user.tpid,
        tps: this.currentSelectMapTag.list,
        sfzhm: user.properties.SFZHM
      };
      this.filterConditionVisible = true;
      this.filterConditionParams = data;
      this.tagListVisible = false;
    }
  },
  filters: {
    fiveOneLength: function(val) {
      var newArr = [];
      if (val) {
        newArr = val.split(",");
      }
      return newArr.length;
    },
    itemLength(val) {
      return val.length;
    }
  }
};
</script>
<style lang="less" scoped>
.person-card {
  width: 100%;
  height: 120px;
  border-radius: 2px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(204, 204, 204, 1);
  display: flex;
  .left {
    flex: 0 0 81px;
    display: flex;
    flex-direction: column;
    img {
      width: 76px;
      height: 95px;
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
  .right {
    flex: auto;
    display: flex;
    flex-direction: column;
    padding: 2px 0;
    line-height: 1.2;
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
        margin: 6px 4px 2px 0;
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
      width: 181px;
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
      margin-bottom: 3px;
      width: 181px;
    }
    .tags {
      color: rgba(51, 51, 51, 1);
      font-size: 12px;
      text-align: left;
    }
    .riskLevel-caseClub {
      > div {
        display: inline-block;
        // margin: 1px 3px 1px 0;
        > span {
          border-radius: 1px;
          width: 54px;
          padding: 2px 0 2px 2px;
          display: inline-block;
          overflow: hidden;
        }
      }
      .caseClub-item {
        &:nth-child(2) {
          margin: 1px 3px 1px 0;
        }
        &:last-child {
          margin: 1px 0px 1px 0;
        }
      }
    }
  }
}
.person-contextmenu {
  position: fixed;
  box-shadow: #ccc 0px 0px 8px;
  background: #e8eaec;
  border-radius: 2px;
  ul {
    padding: 0;
    margin: 0;
    li {
      color: #333;
      font-size: 14px;
      height: 34px;
      line-height: 34px;
      list-style-type: none;
      cursor: pointer;
      padding: 0 8px;
      min-width: 160px;
      &:hover {
        background: #e5e5e5;
      }
    }
  }
}
.person-card-tag-list {
  position: absolute;
  z-index: 1001;
  max-height: 250px;
  min-width: 280px;
  background: #fff;
  box-shadow: #ccc 0px 0px 8px;
  padding: 8px 10px 2px;
  overflow-y: auto;
  max-width: 520px;
  color: #333;
  font-size: 14px;
  .top-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    .filter-condition {
      width: auto;
      padding: 0 5px;
      display: inline-block;
      float: right;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      text-align: center;
      border-radius: 3px;
      color: #fff;
      background: #4298c7;
      cursor: pointer;
    }
  }

  .list {
    ul {
      li {
        height: 34px;
        line-height: 34px;
        list-style-type: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        &:hover {
          background: #e5e5e5;
        }
        > span {
          width: 100%;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &.no-auth {
          color: #ccc;
          i, span {
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>