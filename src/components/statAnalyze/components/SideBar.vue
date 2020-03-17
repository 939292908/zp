<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 14:59:49
 * @LastEditTime: 2019-11-15 18:39:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="side-bar-collection">
    <ul>
      <li
        :class="curIndex == index ? 'active' : ''"
        :key="index"
        v-for="(item,index) in navs"
        @click="handleClick(item,index)"
      >
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SideBarCollection",
  data() {
    return {
      curIndex: 0
    };
  },
  computed: {
    navs() {
      let list = [
        {
          title: "统计看板",
          hasAuth: this.hasPageAuth(this.constantPageMap.PAGE_StatDashboard_ID),
          route: {
            path: "/statAnalyze/dashboard"
          }
        },
        {
          title: "人员绩效统计",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_PerformanceStat_ID
          ),
          route: {
            path: "/statAnalyze/performanceStat"
          }
        },
        {
          title: "每日采集情况统计",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_DailyCollectionStat_ID
          ),
          route: {
            path: "/statAnalyze/dailyCollectionStat"
          }
        },
        {
          title: "系统使用统计",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_SystemUsageStat_ID
          ),
          route: {
            path: "/statAnalyze/systemUsageStat"
          }
        }
      ];
      let arr = list.filter(val => {
        return val.hasAuth;
      });
      this.curIndex = arr.findIndex(val => {
        return val.route.path == this.$route.path && val.hasAuth;
      });
      return arr;
    }
  },
  created() {
    this.curIndex = this.navs.findIndex(val => {
      return val.route.path == this.$route.path && val.hasAuth;
    });
  },
  methods: {
    handleClick(item, index) {
      this.curIndex = index;
      this.$emit("on-click", index, item);
    }
  }
};
</script>
<style lang="less" scoped>
.side-bar-collection {
  flex: 0 0 240px;
  > ul {
    padding: 10px 0;
  }
  li {
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      // background: #2d8cf0;
      color: #2d8cf0;
    }
  }
  li.active {
    background: #2d8cf0;
    color: #ffffff;
  }
}
</style>


