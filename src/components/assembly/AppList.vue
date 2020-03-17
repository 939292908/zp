<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 19:42:00
 * @LastEditTime: 2019-12-13 17:56:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 导航 -->
  <div class="app-list">
    <div class="content-box">
      <!-- 分类 -->
      <!-- v-if="showItem[index]" -->
      <div class="classify" v-for="(item1, index) in appList" :key="index" v-show="item1.isShow">
        <div class="title-text">{{ item1.title }}</div>
        <ul>
          <!-- 导航 -->
          <li
            v-for="(item2, index) in item1.data"
            :key="index"
            v-show="item2.isShow"
            :fn="authShow(item1, item2, item2.authMethod)"
          >
            <router-link
              tag="a"
              target="_self"
              :to="{name: item2.routerName , path: typeof item2.routerPath == 'function' ? item2.routerPath() : item2.routerPath, query:typeof item2.query == 'function' ? item2.query() : (item2.query || null)}"
            >
              <!-- icon 图标 -->
              <div class="icon-box" :style="{backgroundColor: item2.bgc}">
                <i :class="'iconfont ' + item2.icon"></i>
              </div>
              <!-- 名称 -->
              <div class="label-text">{{ item2.label }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-btn" @click.prevent="closeAppModal"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  title: 分类标题
      //  label: 导航名称
      //  icon: 图标
      //  bgc: 背景色
      //  isShow: false, 是否显示 (默认不显示，通过验证才显示)
      //  routerName: 跳转的路由名称
      //  routerPath: 跳转的路由路径
      //  authMethod(): 权限
      appList: [
        // 分类 1
        {
          title: "基础应用",
          isShow: false,
          data: [
            {
              label: "综合门户",
              icon: "icon-fangzi-copy",
              bgc: "#21B0DF",
              isShow: false,
              routerName: "Dashboard",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Index_ID);
              }
            },
            {
              label: "智能搜索",
              icon: "icon-jiansuo1",
              bgc: "#21B0DF",
              isShow: false,
              routerName: "Search",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Search_ID);
              }
            },
            {
              label: "全文检索",
              icon: "icon-jiansuo",
              bgc: "#21B0DF",
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
              bgc: "#21B0DF",
              isShow: false,
              routerName: "SearchTp",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_SearchTp_ID);
              }
            },
            {
              label: "案件线索管理",
              icon: "icon-anjian",
              bgc: "#21B0DF",
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
            },
            {
              label: "我的图谱",
              icon: "icon-yanyuantupu",
              bgc: "#21B0DF",
              isShow: false,
              routerName: "",
              authMethod: () => {
                return false;
              }
            }
          ]
        },
        // 分类 2
        {
          title: "图谱业务流应用",
          isShow: false,
          data: [
            {
              label: "图谱采集",
              icon: "icon-fill",
              bgc: "#4D97DF",
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
              bgc: "#4D97DF",
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
              bgc: "#4D97DF",
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
              },
              isShow: false,
              authMethod: () => {
                let flag =
                  this.hasPageAuth(
                    this.constantPageMap.PAGE_MapAduit_Dashboard_ID
                  ) ||
                  this.hasPageAuth(this.constantPageMap.PAGE_MapAduit_List_ID);
                return flag;
              }
            }
          ]
        },
        // 分类 3
        {
          title: "图谱分析应用",
          isShow: false,
          data: [
            {
              label: "谱系档案",
              icon: "icon-document",
              bgc: "#20BDB7",
              isShow: false,
              routerName: "ArchivesStatistics",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Archives_ID);
              }
            },
            {
              label: "图谱串并",
              icon: "icon-related",
              bgc: "#20BDB7",
              isShow: false,
              routerName: "Join",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Join_ID);
              }
            },
            {
              label: "区域串并",
              icon: "icon-guanlian",
              bgc: "#20BDB7",
              isShow: false,
              routerName: "AreaJoin",
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_MultiJoin_ID);
              }
            },
            {
              label: "宗教传承脉络梳理",
              icon: "icon-tuoputu",
              bgc: "#20BDB7",
              isShow: false,
              routerName: "",
              authMethod: () => {
                return false;
              }
            },
            {
              label: "被打击人员分布",
              icon: "icon-fenbu",
              bgc: "#20BDB7",
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
              authMethod: () => {
                return this.hasPageAuth(this.constantPageMap.PAGE_Profile_ID);
              }
            },
            {
              label: "出入境人员分布",
              icon: "icon-fenbu",
              bgc: "#20BDB7",
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
            },
            {
              label: "图谱采集情况分析",
              icon: "icon-fenxi",
              bgc: "#20BDB7",
              isShow: false,
              routerName: "",
              authMethod: () => {
                return false;
              }
            },
            {
              label: "关系挖掘",
              icon: "icon-baoliubihuanshuju",
              bgc: "#20BDB7",
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
              bgc: "#20BDB7",
              isShow: false,
              routerPath: "/groupAnalyse",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_Group_Analyse_ID
                );
              }
            },
            {
              label: "图谱采集统计分析",
              icon: "icon-fenxi1",
              bgc: "#20BDB7",
              isShow: false,
              routerPath: "/statAnalyze/dashboard",
              authMethod: () => {
                return this.hasPageAuth(
                  this.constantPageMap.PAGE_StatDashboard_ID
                );
              }
            },
            {
              label: "案线串并",
              icon: "icon-icon-test",
              bgc: "#20BDB7",
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
              bgc: "#20BDB7",
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
        // 分类 4
        {
          title: "系统管理",
          isShow: false,
          data: [
            {
              label: "后台管理",
              icon: "icon-chilun",
              bgc: "#21B0DF",
              isShow: false,
              routerName: this.$nextTick(() => {
                let my = this.appList
                  .find(item => item.title == "系统管理")
                  .data.find(item => item.label == "后台管理");
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
  methods: {
    /**
     * 根据'权限' 显示 '导航和分类'
     * classify(分类) nav(导航) auth(权限)
     */
    authShow(classify, nav, auth) {
      this.$nextTick(() => {
        let hasAuth = auth(); // 权限
        if (hasAuth) {
          classify.isShow = true;
        } // show 分类
        nav.isShow = hasAuth; // show 导航
      });
    },

    // 关闭列表
    closeAppModal() {
      if (this.$parent.appModalShow) {
        this.$parent.appModalShow = false;
      }
      if (this.$parent.statusList) {
        this.$parent.statusList.appModalShow = false;
      }
      if (this.$parent.status) {
        this.$parent.status.appModalShow = false;
      }
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
    }
  }
};
</script>
<style lang='less' scoped>
.app-list {
  width: 372px;
  height: 100%;
  position: fixed;
  z-index: 99999;
  right: 0;
  padding: 0 20px 20px 40px;
  top: 67px;
  // overflow: auto;
  overflow-y: auto;
  .content-box {
    padding-bottom: 44px;
    .classify {
      &:not(:last-child) {
        border-bottom: 1px solid #e3e3e3;
      }
      .title-text {
        font-size: 14px;
        font-weight: 700;
        color: #333;
        padding: 20px 0 16px;
        cursor: default;
        &::before {
          content: "";
          display: block;
          float: left;
          height: 14px;
          border-left: 3px solid #0668c8;
          margin: 4px 4px 0 0;
        }
      }
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 50%;
          margin-bottom: 20px;
          padding-left: 8px;
          position: relative;
          a {
            display: block;
            overflow: hidden;
          }
          .icon-box {
            width: 48px;
            height: 48px;
            float: left;
            margin-right: 10px;
            border-radius: 4px;
            text-align: center;
            line-height: 48px;
            background-color: #4791db;
            i {
              font-size: 24px;
              color: #fff;
            }
          }
          .label-text {
            width: 4.5em;
            color: #676b75;
            font-size: 14px;
            display: inline-block;
            position: absolute;
            top: 48%;
            transform: translate(0, -50%);
          }
        }
      }
    }
  }
  .close-btn {
    position: absolute;
    top: 28.6%;
    left: 0;
    width: 12px;
    height: 25%;
    z-index: 9999;
    cursor: pointer;
    background: url("../../../static/images/app/sidebar-center.png") 0 0
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>
