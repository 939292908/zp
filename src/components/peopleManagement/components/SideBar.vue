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
      curIndex: 0
    };
  },
  computed: {
    navs() {
      let list = [
        {
          title: "人员基础信息管理",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_MapAduit_Person_Ledger_ID
          ),
          route: {
            path: "/peopleManagement/personInfoLedger"
          }
        },
        {
          title: "历年来村两委班子人员",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_Online_CommitteeLedger_ID
          ),
          route: {
            path: "/peopleManagement/committeeLedger"
          }
        },
        {
          title: "历年来清真寺教职人员",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_Online_MosqueLedger_ID
          ),
          route: {
            path: "/peopleManagement/mosqueLedger"
          }
        },
        {
          title: "无证人员管理",
          hasAuth: this.hasPageAuth(
            this.constantPageMap.PAGE_Online_NoIdNumberManager_ID
          ),
          route: {
            path: "/peopleManagement/noIdNumberManager"
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
  },
  mounted() {}
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


