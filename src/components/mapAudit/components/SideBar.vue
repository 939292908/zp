<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 14:59:49
 * @LastEditTime: 2019-11-29 17:18:45
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
          title: "看板",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_MapAduit_Dashboard_ID
          ),
          route: {
            path: "/auditCollect/dashboard"
          }
        },
        {
          title: "图谱审核",
          hasAuth: this.hasPageAuth(this.constantPageMap.PAGE_MapAduit_List_ID),
          route: {
            path: "/auditCollect/mapReview"
          }
        }
        // {
        //   title: "人员基础信息管理",
        //   hasAuth: this.hasPageAuth(
        //     this.constantPageMap.PAGE_MapAduit_Person_Ledger_ID
        //   ),
        //   route: {
        //     path: "/auditCollect/personInfoLedger"
        //   }
        // }
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
  },
  mounted() {
    this.$bus.$on("currentAuditPage", index => {
      let obj = {
        title: "图谱审核",
        route: {
          path: "/auditCollect/mapReview",
          query: {
            state: index
          }
        }
      };
      this.handleClick(obj, 1);
    });
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


