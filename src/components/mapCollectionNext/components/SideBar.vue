<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 09:09:18
 * @LastEditTime: 2019-12-17 15:03:25
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
      // navs: [
      //   {
      //     title: "看板",
      //     hasAuth:this.hasPageAuth(this.constantPageMap.PAGE_Online_Dashboard_ID),
      //     route: {
      //       path: "/onlineCollect/dashboard"
      //     }
      //   },
      //   {
      //     title: "图谱管理",
      //     hasAuth:this.hasPageAuth(this.constantPageMap.PAGE_Online_MapManager_ID),
      //     route: {
      //       path: "/onlineCollect/mapManager"
      //     }
      //   },
      //   {
      //     title: "报送审核",
      //     hasAuth:this.hasPageAuth(this.constantPageMap.PAGE_Online_MapReview_ID),
      //     route: {
      //       path: "/onlineCollect/mapReview"
      //     }
      //   },
      //   // {
      //   //   title: "批量上传",
      //   //   route: {}
      //   // },
      //   // {
      //   //   title: "维护图谱",
      //   //   route: {}
      //   // },
      //   // {
      //   //   title: "人员基础信息台账",
      //   //   route: {}
      //   // },
      //   // {
      //   //   title: "历年来村两委",
      //   //   route: {}
      //   // },
      //   // {
      //   //   title: "历年来依麻木",
      //   //   route: {}
      //   // },
      //   // {
      //   //   title: "头面人物",
      //   //   route: {}
      //   // },
      //   {
      //     title: "辖区地图",
      //     hasAuth:this.hasPageAuth(this.constantPageMap.PAGE_Online_BelongAreaMapList_ID),
      //     route: {
      //       path: "/onlineCollect/mapJurisdiction"
      //     }
      //   }
      // ],
      curIndex: 0
    };
  },
  computed: {
    navs() {
      let list = [
        {
          title: "看板",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_Online_Dashboard_ID
          ),
          route: {
            path: "/onlineCollect/dashboard"
          }
        },
        {
          title: "图谱管理",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_Online_MapManager_ID
          ),
          route: {
            path: "/onlineCollect/mapManager"
          }
        },
        {
          title: "报送审核",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_Online_MapReview_ID
          ),
          route: {
            path: "/onlineCollect/mapReview"
          }
        },
        // {
        //   title: "批量上传",
        //   route: {}
        // },
        // {
        //   title: "维护图谱",
        //   route: {}
        // },
        // {
        //   title: "人员基础信息台账",
        //   route: {}
        // },
        // {
        //   title: "历年来村两委",
        //   route: {}
        // },
        // {
        //   title: "历年来依麻木",
        //   route: {}
        // },
        // {
        //   title: "头面人物",
        //   route: {}
        // },
        // {
        //   title: "历年来村两委教职人员",
        //   hasAuth: this.hasPageAuth(
        //     this.constantPageMap.PAGE_Online_CommitteeLedger_ID
        //   ),
        //   route: {
        //     path: "/onlineCollect/committeeLedger"
        //   }
        // },
        // {
        //   title: "历年来清真寺教职人员",
        //   hasAuth: this.hasPageAuth(
        //     this.constantPageMap.PAGE_Online_MosqueLedger_ID
        //   ),
        //   route: {
        //     path: "/onlineCollect/mosqueLedger"
        //   }
        // },
        {
          title: "辖区地图",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_Online_Draw_Profile_ID
          ),
          route: {
            path: "/onlineCollect/mapJurisdiction"
          }
        }
        // {
        //   title: "无证人员管理",
        //   hasAuth: this.hasPageAuth(
        //     this.constantPageMap.PAGE_Online_NoIdNumberManager_ID
        //   ),
        //   route: {
        //     path: "/onlineCollect/noIdNumberManager"
        //   }
        // }
        // {
        //   title: "案件线索管理",
        //   hasAuth: this.hasPageAuth(
        //     this.constantPageMap.PAGE_Online_CaseManager_ID
        //   ),
        //   route: {
        //     path: "/caseClubList"
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
    // this.navs = this.navs.findIndex(val => {
    //   return val.route.path == this.$route.path && val.hasAuth;
    // });
    // this.$nextTick(() => {
    //   if (this.$config.project.locale == "bz") {
    //     this.navs.pop();
    //   }
    // });
  },
  methods: {
    handleClick(item, index) {
      this.curIndex = index;
      this.$emit("on-click", index, item);
    }
  },
  mounted() {
    this.$bus.$on("currentPage", index => {
      let obj = {
        title: "报送审核",
        route: {
          path: "/onlineCollect/mapReview",
          query: {
            state: index
          }
        }
      };
      this.handleClick(obj, 2);
      // this.$bus.$emit("showPage", index);
    });
    this.$bus.$on("currentType", id => {
      let obj = {
        title: "图谱管理",
        route: {
          path: "/onlineCollect/mapManager",
          query: {
            type: id
          }
        }
      };
      this.handleClick(obj, 1);
      // this.$bus.$emit("showPage", index);
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


