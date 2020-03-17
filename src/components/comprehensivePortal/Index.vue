<!--
 * @Author: your name
 * @Date: 2019-12-11 18:24:45
 * @LastEditTime: 2019-12-13 17:39:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\comprehensivePortal\index.vue
 -->
<template>
  <!-- 综合门户 -->
  <div class="portal-container" @click="handleWrapperClick($event)">
    <!-- 头部 -->
    <div class="itap">
      <span class="name">{{this.$config.project.name}}</span>
      <span class="version" v-if="$config.project.version">{{this.$config.project.version}}</span>
    </div>
    <!-- 右上角 ( 个人 / 消息 / 应用 ) 切换 -->
    <switchView ref="switchView" v-on:viewIndex="getViewIndex"></switchView>
    <switchRightView ref="switchRightView" :items="statusList"></switchRightView>
    <!-- <app-header ref="appHeader" :items="statusList" :showSearch="false"></app-header> -->
    <!-- 主体 -->
    <div class="container">
      <div class="search-action">
        <!-- <Input
          search
          placeholder="请输入关键字"
          @on-search="handleSearch"
          v-model="keyword"
          style="width:400px"
          size="large"
        />
        <Button type="primary" @on-click="handleSearch" size="large">全文检索</Button>-->
        <div class="search-box">
          <i-button class="search-default" @click="handleSearch">全文检索</i-button>
          <div class="input">
            <input type="text" placeholder="请输入查询关键字" v-model="keyword" @keyup.enter="handleSearch" />
          </div>
        </div>
      </div>
      <div class="apps-content">
        <div
          class="app-cont show"
          v-for="(item,index) in appList"
          :key="index"
          v-show="item.isShow"
        >
          <div class="display-box">
            <div class="title">
              <i :class="'iconfont '+item.icon"></i>
              <p>
                {{item.name}}
                <span>({{item.children.length}})</span>
              </p>
            </div>
            <div class="app-tab">
              <span
                v-for="(it,i) in item.children"
                :key="i"
                v-if="i<5"
                v-show="it.isShow"
                :fn="authShow(item, it, it.authMethod)"
              >
                {{it.label}}
                <i v-if="i<4 && i< item.children.length-1">|</i>
              </span>
            </div>
          </div>
          <div class="list-box">
            <div class="title">
              <p>
                {{item.name}}
                <span>({{item.children.length}})</span>
              </p>
            </div>
            <div class="list-cont">
              <div
                class="list-item"
                v-for="(it,i) in item.children"
                :key="i"
                v-show="it.isShow"
                :fn="authShow(item, it, it.authMethod)"
              >
                <router-link
                  tag="a"
                  target="_self"
                  :to="{name: it.routerName , path: typeof it.routerPath == 'function' ? it.routerPath() : it.routerPath, query:typeof it.query == 'function' ? it.query() : (it.query || null)}"
                >
                  <i :class="'iconfont '+it.icon"></i>
                  <span>{{it.label}}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import switchView from "@/components/assembly/SwitchView";
import switchRightView from "@/components/assembly/SwitchRightView";
export default {
  name: "comprehensivePortal",
  data() {
    return {
      keyword: "",
      expant: -1,
      statusList: {
        uploadImg: false,
        myNavModalShow: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        messageDetailsShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        feedbackShow: false
      },
      image:
        "./static/images/search/full-search" +
        this.$config.project.localSuffix +
        ".png",
      appList: [
        {
          name: "基础应用",
          icon: "icon-application",
          isShow: false,
          children: [
            {
              label: "综合门户",
              icon: "icon-fangzi-copy",
              isShow: false,
              routerName: "Dashboard",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Index_ID);
              }
            },
            {
              label: "智能搜索",
              icon: "icon-jiansuo1",
              isShow: false,
              routerName: "Search",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Search_ID);
              }
            },
            {
              label: "全文检索",
              icon: "icon-jiansuo",
              isShow: false,
              routerName: "FullTextSearch",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_FullSearch_ID
                );
              }
            },
            {
              label: "以人搜图",
              icon: "icon-renqun",
              isShow: false,
              routerName: "SearchTp",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_SearchTp_ID);
              }
            },
            {
              label: "案件线索管理",
              icon: "icon-anjian",
              isShow: false,
              routerName: "CaseClubList",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_BasicApps_CaseManager_ID
                );
              }
            },
            {
              label: "人员管理",
              icon: "icon-renyuanguanli",
              bgc: "#21B0DF",
              isShow: false,
              routerPath: () => {
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_MapAduit_Person_Ledger_ID
                  )
                )
                  return "/peopleManagement/personInfoLedger";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_CommitteeLedger_ID
                  )
                )
                  return "/peopleManagement/committeeLedger";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_MosqueLedger_ID
                  )
                )
                  return "/peopleManagement/mosqueLedger";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_NoIdNumberManager_ID
                  )
                )
                  return "/peopleManagement/noIdNumberManager";
              },
              authMethod: () => {
                return this.hasManManagementAuth();
              }
            }
          ]
        },
        {
          name: "图谱业务流应用",
          icon: "icon-guanliantupu",
          isShow: false,
          children: [
            {
              label: "图谱采集",
              icon: "icon-fill",
              isShow: false,
              routerName: "Collect",
              // routerName: this.$config.project.locale == 'bz' ? 'CollectOld' : 'Collect',
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_Map_Collect_ID
                );
              }
            },
            {
              label: "在线采集",
              icon: "icon-fill",
              routerPath: () => {
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_Dashboard_ID
                  )
                )
                  return "/onlineCollect/dashboard";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_MapManager_ID
                  )
                )
                  return "/onlineCollect/mapManager";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_MapReview_ID
                  )
                )
                  return "/onlineCollect/mapReview";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_Draw_Profile_ID
                  )
                )
                  return "/onlineCollect/mapJurisdiction";
              },
              isShow: false,
              authMethod: () => {
                let flag =
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_Dashboard_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_MapManager_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_MapReview_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_Draw_Profile_ID
                  );
                return flag;
              }
            },
            {
              label: "图谱审核",
              icon: "icon-pizhun",
              routerPath: () => {
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_MapAduit_Dashboard_ID
                  )
                )
                  return "/auditCollect/dashboard";
                if (
                  this.hasPageAuth(this.constantPageMap.PAGE_MapAduit_List_ID)
                )
                  return "/auditCollect/mapReview";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_MapAduit_Person_Ledger_ID
                  )
                )
                  return "/auditCollect/personInfoLedger";
              },
              isShow: false,
              authMethod: () => {
                let flag =
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_MapAduit_Dashboard_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_MapAduit_List_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_MapAduit_Person_Ledger_ID
                  );
                return flag;
              }
            }
          ]
        },
        {
          name: "图谱分析应用",
          icon: "icon-lianjiebiao",
          isShow: false,
          children: [
            {
              label: "谱系档案",
              icon: "icon-document",
              isShow: false,
              routerName: "ArchivesStatistics",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Archives_ID);
              }
            },
            {
              label: "图谱串并",
              icon: "icon-related",
              isShow: false,
              routerName: "Join",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Join_ID);
              }
            },
            {
              label: "区域串并",
              icon: "icon-guanlian",
              isShow: false,
              routerName: "AreaJoin",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_MultiJoin_ID);
              }
            },
            {
              label: "关系挖掘",
              icon: "icon-baoliubihuanshuju",
              isShow: false,
              routerPath: "/relationCheck",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_Relation_Check_ID
                );
              }
            },
            {
              label: "群体分析",
              icon: "icon-duoren",
              isShow: false,
              routerPath: "/groupAnalyse",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_Group_Analyse_ID
                );
              }
            },
            {
              label: "案线串并",
              icon: "icon-anjian",
              isShow: false,
              routerName: "CaseClubAnalysis",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_BasicApps_CaseClubNanalysis_ID
                );
              }
            },
            {
              label: "案线图串并",
              icon: "icon-icon-test",
              isShow: false,
              routerName: "CaseMapJoin",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_BasicApps_CaseMapJoin_ID
                );
              }
            },
          ]
        },
        {
          name: "辖区分布图",
          icon: "icon-jiqifenbu",
          isShow: false,
          children: [
            {
              label: "被打击人员分布",
              icon: "icon-fenbu",
              isShow: false,
              query: () => {
                let dataAuthAreaCode = this.$store.state.userInfo
                  .dataAuthAreaCode;
                if (!(dataAuthAreaCode == null || dataAuthAreaCode == "")) {
                  return {
                    areaCode: dataAuthAreaCode
                  };
                }
              },
              routerPath: "/profile",
              // routerName: "Profile",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Profile_ID);
              }
            },
            {
              label: "出入境人员分布",
              icon: "icon-fenbu",
              isShow: false,
              query: () => {
                let dataAuthAreaCode = this.$store.state.userInfo
                  .dataAuthAreaCode;
                if (!(dataAuthAreaCode == null || dataAuthAreaCode == "")) {
                  return {
                    areaCode: dataAuthAreaCode
                  };
                }
              },
              routerPath: "/entryExit",
              // routerName: "EntryExit", //
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_EntryExit_ID);
              }
            }
          ]
        },
        {
          name: "图谱采集统计分析",
          icon: "icon-tongji",
          isShow: false,
          children: [
            {
              label: "图谱采集统计分析",
              icon: "icon-fenxi1",
              bgc: "#20BDB7",
              isShow: false,
              routerPath: () => {
                if (
                  this.hasPageAuth(this.constantPageMap.PAGE_StatDashboard_ID)
                )
                  return "/statAnalyze/dashboard";
                if (
                  this.hasPageAuth(this.constantPageMap.PAGE_PerformanceStat_ID)
                )
                  return "/statAnalyze/performanceStat";
                if (
                  this.hasPageAuth(this.constantPageMap.PAGE_SystemUsageStat_ID)
                )
                  return "/statAnalyze/systemUsageStat";
                if (
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_DailyCollectionStat_ID
                  )
                )
                  return "/statAnalyze/dailyCollectionStat";
              },
              authMethod: () => {
                let flag =
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_StatDashboard_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_PerformanceStat_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_SystemUsageStat_ID
                  ) ||
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_DailyCollectionStat_ID
                  );
                return flag;
              }
            }
          ]
        },
        {
          name: "系统管理",
          icon: "icon-guanli",
          isShow: false,
          children: [
            {
              label: "后台管理",
              icon: "icon-chilun",
              isShow: false,
              routerName: this.$nextTick(() => {
                let my = this.appList
                  .find(item => item.name == "系统管理")
                  .children.find(item => item.label == "后台管理");
                my.routerName = this.goPageName();
              }),
              authMethod: () => {
                return this.hasManCenterAuth();
              }
            }
          ]
        }
      ]
    };
  },
  components: {
    switchView,
    switchRightView
  },
  methods: {
    getViewIndex(index) {
      var me = this;
      this.statusList.newsModalShow = false;
      this.statusList.appModalShow = false;
      this.statusList.personModalShow = false;
      this.statusList.guidelinesShow = false;
      this.statusList.changeLogShow = false;
      if (index == "0") {
        this.statusList.personModalShow = true;
      } else if (index == "1") {
        // this.statusList.newsModalShow = true;
        this.statusList.appModalShow = true;
        this.statusList.myNavModalShow = false;
      } else if (index == "2") {
        this.statusList.appModalShow = true;
        // <!-- nav-7 -->
        this.statusList.myNavModalShow = false;
      }
    },
    handleSearch() {
      // 查询权限
      if (!this.hasPageAuth(this.constantPageMap.PAGE_FullSearch_ID)) {
        this.$Message.warning("无全文检索权限！");
        return;
      }
      if (!this.keyword) {
        this.$Message.error("请输入要搜索的关键词！");
        return;
      }
      this.$router.push({
        path: "/fullTextResult",
        query: {
          keyword: this.keyword
        }
      });
    },
    // 获取跳转后台管理的router name
    goPageName() {
      let pages = [
        this.constantPageMap.PAGE_UserManager_ID,
        this.constantPageMap.PAGE_UserGroupManager_ID,
        this.constantPageMap.PAGE_Permission_ID,
        this.constantPageMap.PAGE_RedList_ID,
        this.constantPageMap.PAGE_Regional_ID,
        this.constantPageMap.PAGE_UnitMaintenance_ID,
        this.constantPageMap.PAGE_AreaBinding_ID,
        this.constantPageMap.PAGE_CodeMaintenance_ID,
        this.constantPageMap.PAGE_PersonLabel_ID,
        this.constantPageMap.PAGE_HelpConfig_ID
      ];
      let arr = this.$router.options.routes.filter(x => {
        return pages.indexOf(x.meta.id) != -1 && x.meta.hasAuth;
      });
      arr.sort((a, b) => {
        return a.meta.id - b.meta.id;
      });
      if (arr.length) {
        return arr[0].name;
      }
      return "";
    },
    authShow(classify, nav, auth) {
      this.$nextTick(() => {
        let hasAuth = auth(); // 权限
        if (hasAuth) {
          classify.isShow = true;
        } // show 分类
        nav.isShow = hasAuth; // show 导航
      });
    }
  }
};
</script>

<style lang="less" scoped>
@widthH: 100%;
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
.portal-container {
  background: #f7f7f7 url("../../../static/images/indexBg.png") no-repeat bottom;
  background-size: 100% 84%;
  width: 100%;
  height: 100%;
  .itap {
    width: 100%;
    // height:8.4%;
    height: 67px;
    left: 0;
    text-align: center;
    .post(a);
    top: 0;
    z-index: 99;
    background-color: #183d79;
    display: flex;
    align-items: center;
    .name {
      height: 67px;
      line-height: 67px;
      display: inline-block;
      text-align: left;
      margin-left: 28px;
      font-size: 22px;
      color: #fff;
      background: -webkit-linear-gradient(top, #fff, #74c2ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: Adobe Heiti Std R;
      font-weight: normal;
      letter-spacing: 2px;
    }
    .version {
      font-size: 12px;
      color: #c0d3e9;
      background: #2c579e;
      border-radius: 1px;
      display: inline-block;
      padding: 2px 8px;
      margin-left: 10px;
    }
  }
  .container {
    .post(a);
    top: 68px;
    width: 100%;
    .search-action {
      width: 600px;
      position: absolute;
      top: 110px;
      left: 50%;
      transform: translateX(-50%);
      .search-box {
        width: 100%;
        height: 74px;
        position: absolute;
        z-index: 99;
        .search-default {
          .post(a);
          top: 0;
          right: 0;
          width: 104px;
          height: 48px;
          text-align: center;
          cursor: pointer;
          color: #fff;
          border-radius: 0;
          border: none;
          background: linear-gradient(0deg, #3562a3, #4b81c5);
          background-size: 100% 100%;
          margin-top: 13px;
          /deep/ span {
            font-size: 16px;
            font-weight: bold;
            background: -webkit-linear-gradient(
              top,
              #fff,
              #74c2ff
            ); /* 背景色渐变 */
            -webkit-background-clip: text; /* 规定背景的划分区域 */
            -webkit-text-fill-color: transparent; /* 防止字体颜色覆盖 */
          }
        }
        .input {
          .post(a);
          left: 0;
          right: 96px;
          top: 12px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          .iconfont {
            font-size: 20px;
            color: #b7deff;
            cursor: pointer;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
          }
          i:nth-child(1) {
            .post(a);
            right: 55px;
            top: 22px;
          }
          i:nth-child(2) {
            .post(a);
            right: 25px;
            top: 20px;
          }
          input {
            width: 100%;
            padding: 0 90px 0 30px;
            height: 50px;
            line-height: 50px;
            // text-indent: 30px;
            outline: none;
            border: none;
            font-size: 16px;
            color: #818181;
            background: #fff;
            background-size: 100% 100%;
          }
          input::-webkit-input-placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
    .apps-content {
      max-width: 960px;
      margin: 235px auto;
      .app-cont {
        .post(r);
        float: left;
        width: 300px;
        height: 220px;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 4px;

        .display-box,
        .list-box {
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
          width: 100%;
          transition: all 0.5s ease-in-out;
          -moz-transition: all 0.5s ease-in-out; /* Firefox 4 */
          -webkit-transition: all 0.5s ease-in-out; /* Safari and Chrome */
          -o-transition: all 0.5s ease-in-out; /* Opera */
          background-color: #fff;
          height: 100%;
        }
        .display-box {
          opacity: 1;

          .title {
            text-align: center;
            padding-top: 30px;
            i {
              font-size: 58px;
              color: #0668c8;
            }
            p {
              font-size: 16px;
              font-weight: bold;

              span {
                font-size: 14px;
                font-weight: normal;
              }
            }
          }
          .app-tab {
            padding: 10px 40px;
            color: #666;
            font-size: 12px;
            text-align: center;
            span {
              line-height: 1.8;
            }
            i {
              font-style: normal;
              padding: 0 3px;
            }
          }
        }
        .list-box {
          opacity: 0;
          overflow: hidden;
          // background-color: #eaf4fd;
          border: 2px solid rgba(6, 104, 200, 0.5);
          box-shadow: 0 4px 10px 0 rgba(6, 104, 200, 0.5);
          border-radius: 4px;
          .post(a);
          top: 0;
          left: 0;
          .title {
            text-align: center;
            margin-top: 18px;
            p {
              font-size: 16px;
              font-weight: bold;

              span {
                font-size: 14px;
                font-weight: normal;
              }
            }
          }
          .list-cont {
            padding: 15px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            max-height: calc(100% - 30px);
            overflow-y: auto;
            .list-item {
              border: 1px solid #bbb;
              background-color: #fff;
              border-radius: 2px;
              font-size: 14px;
              margin-bottom: 15px;
              height: 37px;
              line-height: 37px;
              cursor: pointer;
              a {
                display: inline-block;
                width: 100%;
                height: 100%;
              }

              i {
                font-size: 18px;
                color: #0668c8;
                padding: 0 12px;
              }
              span {
                padding: 0 18px 0 4px;
                color: #333;
              }
            }
            .list-item:hover {
              background-color: #0668c8;
              color: #fff;
              span,
              i {
                color: #fff;
              }
            }
          }
        }
      }
      .show:hover {
        .display-box {
          opacity: 0;
          // transform: scale(0.5);
        }
        .list-box {
          opacity: 1;
        }
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .container {
      .search-action {
        top: 40px;
      }
      .apps-content {
        margin: 145px auto;
      }
    }
  }
}
</style>
