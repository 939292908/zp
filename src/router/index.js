/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 22:08:55
 * @LastEditTime : 2019-12-26 14:26:16
 * @LastEditors  : Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SysLogin from '@/components/SysLogin'
import PKILoginCallback from '@/components/pkiLoginCallback'
import VueCookies from 'vue-cookies'
import {
  permissionList,
  hasPermission,
  setPagePermissions
} from '../permissions.js'
import store from '@/store'
import {
  Message
} from 'iview'
import {
  constantPageMap
} from './config'
import OnlineLayout from '@/components/mapCollectionNext/OnlineLayout'
import OnlineAuditLayout from '@/components/mapAudit/Layout'
import personManagementLayout from '@/components/peopleManagement/Layout'

Vue.use(Router)
const config = require('../configs/config' + process.env.ENV_CONFIG).config
let localSuffix = config.project.locale == 'bz' ? '' : '-' + config.project.locale

let loginSuffix = config.project.locale == 'gb' ? '-' + config.project.locale : ''
const hasAuth = false
export const constantRouterMap = [{ //登录
    path: '/',
    name: 'Login',
    component: resolve => require(['@/components/Login' + loginSuffix], resolve),
    meta: {
      id: "",
      hasAuth: hasAuth,
      requiresAuth: false,
      functions: []
    }
  },
  { //登录
    path: '/zHdl_ZP',
    name: 'zHdl_ZP',
    component: SysLogin,
    meta: {
      id: "",
      hasAuth: hasAuth,
      requiresAuth: false,
      functions: []
    }
  },
  { //登录回调重定向页面
    path: '/pkiLoginCallback',
    name: 'PKILoginCallback',
    component: PKILoginCallback,
    meta: {
      id: "",
      hasAuth: hasAuth,
      requiresAuth: false,
      functions: []
    }
  },
  { //公用管理配置（虚拟）
    path: '',
    name: '',
    meta: {
      id: constantPageMap.PAGE_Common_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //综合门户
    path: '/index',
    name: 'Index',
    //component: resolve => require(['@/components/Index-aks'], resolve),
    component: resolve => require(['@/components/comprehensivePortal/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_NewIndex_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //首页
    path: '/dashboard',
    name: 'Dashboard',
    //component: resolve => require(['@/components/Index-aks'], resolve),
    component: resolve => require(['@/components/Index' + localSuffix], resolve),
    meta: {
      id: constantPageMap.PAGE_Index_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //智能搜索
    path: '/search',
    name: 'Search',
    //component: Search,
    component: resolve => require(['@/components/Search'], resolve),
    meta: {
      id: constantPageMap.PAGE_Search_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //全文检索
    path: '/fullTextSearch',
    name: 'FullTextSearch',
    component: resolve => require(['@/components/fullTextSearch/FullSearch'], resolve),
    meta: {
      id: constantPageMap.PAGE_FullSearch_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //以人搜图
    path: '/searchtp',
    name: 'SearchTp',
    component: resolve => require(['@/components/SearchTp'], resolve),
    meta: {
      id: constantPageMap.PAGE_SearchTp_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //智能搜索结果
    path: '/result',
    name: 'Result',
    component: resolve => require(['@/components/Result'], resolve),
    meta: {
      id: constantPageMap.PAGE_Search_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //以人搜图结果
    path: '/visualition',
    name: 'Visualition',
    component: resolve => require(['@/components/Visualition'], resolve),
    meta: {
      id: constantPageMap.PAGE_SearchTp_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //全文检索结果
    path: '/fullTextResult',
    name: 'FullTextResult',
    component: resolve => require(['@/components/fullTextSearch/FullTextResult'], resolve),
    meta: {
      id: constantPageMap.PAGE_FullSearch_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //搜索结果(宗教传承体系)
    path: '/resultheritage',
    name: 'ResultHeritage',
    component: resolve => require(['@/components/ResultHeritage'], resolve),
    meta: {
      id: constantPageMap.PAGR_Heritage_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //案件线索管理
    path: '/caseClubList',
    name: 'CaseClubList',
    component: resolve => require(['@/components/basicApps/caseClubManage/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_BasicApps_CaseManager_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //案件管理-案件信息展示
    path: '/caseManager/addCaseInfo',
    name: 'CaseManagerAddCaseInfo',
    component: resolve => require(['@/components/basicApps/caseClubManage/detail/addCaseInfo'], resolve),
    meta: {
      id: constantPageMap.PAGE_BasicApps_CaseInfoShow_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //123456 peopleManagement
    path: '/peopleManagement',
    name: 'PeopleManagement',
    component: personManagementLayout,
    meta: {
      id: constantPageMap.PAGE_People_Management_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
    children: [{
        // 图谱审核-人员信息台账
        path: 'personInfoLedger',
        name: 'PersonInfoLedger',
        component: resolve => require(['@/components/peopleManagement/components/PersonInfoLedger'], resolve),
        meta: {
          id: constantPageMap.PAGE_MapAduit_Person_Ledger_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      { //村两委台账
        path: 'committeeLedger',
        name: 'CommitteeLedger',
        component: resolve => require(['@/components/peopleManagement/CommitteeLedger/CommitteeLedger'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_CommitteeLedger_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      { //清真寺台账
        path: 'mosqueLedger',
        name: 'MosqueLedger',
        component: resolve => require(['@/components/peopleManagement/MosqueLedger/MosqueLedger'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_MosqueLedger_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      { // 无证人员管理
        path: 'noIdNumberManager',
        name: 'NoIdNumberManager',
        component: resolve => require(['@/components/peopleManagement/NoIdNumberManager/NoIdNumberManager'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_NoIdNumberManager_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        },
      },

    ]
  },
  {
    path: '/mosqueLedger/personnelDetails',
    name: 'mosqueDetails',
    component: resolve => require(['@/components/peopleManagement/MosqueLedger/detail/PersonnelDetails'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_MosqueLedger_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  {
    path: '/committeeLedger/personnelDetails',
    name: 'PersonnelDetails',
    component: resolve => require(['@/components/peopleManagement/CommitteeLedger/detail/PersonnelDetails'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_CommitteeLedger_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { // 核实无证人员页面
    path: '/onlineCollect/verifyLayout',
    name: 'VerifyLayout',
    component: resolve => require(['@/components/peopleManagement/NoIdNumberManager/components/verifyLayout'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_NoIdNumberVerify_ID,
      hasAuth: hasAuth,
      requiresAuth: false,
      functions: []
    }
  },
  { //案件线索图形分析
    path: '/caseClubAnalysis',
    name: 'CaseClubAnalysis',
    component: resolve => require(['@/components/basicApps/caseClubAnalysis/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_BasicApps_CaseClubNanalysis_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //案线图串并
    path: '/caseMapJoin',
    name: 'CaseMapJoin',
    component: resolve => require(['@/components/basicApps/caseMapJoin/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_BasicApps_CaseMapJoin_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //图谱叠加
    path: '/overlaptp',
    name: 'OverlapTp',
    component: resolve => require(['@/components/OverlapTp'], resolve),
    meta: {
      id: constantPageMap.PAGE_OverlapTp_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //图谱串并
    path: '/join',
    name: 'Join',
    component: resolve => require(['@/components/mapJoinNext/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_Join_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //区域串并
    path: '/multiJoin',
    name: 'AreaJoin',
    component: resolve => require(['@/components/areaJoin/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_MultiJoin_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //图谱合并
    path: '/merge',
    name: 'merge',
    component: resolve => require(['@/components/Merge'], resolve),
    meta: {
      id: constantPageMap.PAGE_Merge_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //谱系档案力导向
    path: '/archivesmap',
    name: 'ArchivesMap',
    component: resolve => require(['@/components/ArchivesMap'], resolve),
    meta: {
      id: constantPageMap.PAGE_ArchivesMap_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //谱系档案串并结果\图形展示页面
    path: '/archivesjoin',
    name: 'ArchivesJoin',
    component: resolve => require(['@/components/ArchivesJoin'], resolve),
    meta: {
      id: constantPageMap.PAGE_D3_Show_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //谱系档案 统计看板
    path: '/archivesStatistics',
    name: 'ArchivesStatistics',
    component: resolve => require(['@/components/archivesStatistics/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_Archives_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //谱系档案
    path: '/archives',
    name: 'Archives',
    component: resolve => require(['@/components/archives/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_Archives_List_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //谱系档案详情页面
    path: '/pedigreeDetail',
    name: 'PedigreeDetail',
    component: resolve => require(['@/components/pedigreeDetail/Index.vue'], resolve),
    meta: {
      id: constantPageMap.PAGE_Archives_Detail_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //巴州图谱采集
    path: '/collectOld',
    name: 'CollectOld',
    component: resolve => require(['@/components/collection/Collect'], resolve),
    meta: {
      id: constantPageMap.PAGE_Map_Collect_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //阿克苏图谱采集
    path: '/collect',
    name: 'Collect',
    component: resolve => require(['@/components/mapCollection/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_Map_Collect_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //图谱采集任务列表
    path: '/collectTaskList',
    name: 'CollectTaskList',
    component: resolve => require(['@/components/mapCollection/CollectionList'], resolve),
    meta: {
      id: constantPageMap.PAGE_Map_Collect_Task_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //图谱采集管理列表
    path: '/collectList',
    name: 'CollectList',
    component: resolve => require(['@/components/mapCollection/CollectionList'], resolve),
    meta: {
      id: constantPageMap.PAGE_Map_Collect_List_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //图谱采集人员列表
    path: '/collectPersonList',
    name: 'CollectPersonList',
    component: resolve => require(['@/components/mapCollection/CollectionList'], resolve),
    meta: {
      id: constantPageMap.PAGE_Map_Collect_PersonList_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //图谱采集管理详细列表
    path: '/collectDetail',
    name: 'CollectDetail',
    component: resolve => require(['@/components/mapCollection/CollectionDetail'], resolve),
    meta: {
      id: constantPageMap.PAGE_Map_Collect_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //阿克苏图谱采集-手绘采集-在线采集
    path: '/onlineCollect',
    name: 'OnlineCollect',
    component: OnlineLayout,
    meta: {
      id: constantPageMap.PAGE_Online_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
    children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/Dashboard'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_Dashboard_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      {
        path: 'mapManager',
        name: 'MapManager',
        component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/MapManager'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_MapManager_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      // 无证人员管理
      // {
      //   path: 'noIdNumberManager',
      //   name: 'NoIdNumberManager',
      //   component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/NoIdNumberManager/NoIdNumberManager'], resolve),
      //   meta: {
      //     id: constantPageMap.PAGE_Online_NoIdNumberManager_ID,
      //     hasAuth: hasAuth,
      //     requiresAuth: true,
      //     functions: []
      //   },
      // },
      {
        path: 'mapReview',
        name: 'MapReview',
        component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/MapReview'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_MapReview_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      {
        path: 'mapJurisdiction',
        name: 'MapJurisdiction',
        component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/MapJurisdiction'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_Draw_Profile_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      { //村两委台账
        path: 'committeeLedger',
        name: 'CommitteeLedger',
        component: resolve => require(['@/components/mapCollectionNext/CommitteeLedger/CommitteeLedger'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_CommitteeLedger_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      { //清真寺台账
        path: 'mosqueLedger',
        name: 'MosqueLedger',
        component: resolve => require(['@/components/mapCollectionNext/MosqueLedger/MosqueLedger'], resolve),
        meta: {
          id: constantPageMap.PAGE_Online_MosqueLedger_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
    ]
  },
  { //阿克苏图谱采集-手绘采集新增(第三步)
    path: '/onlineCollect/addMap',
    name: 'CollectHardAddMap',
    component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/AddMap'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_RelationMapShow_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //阿克苏图谱采集-手绘采集新增(第一步)
    path: '/onlineCollect/addMapInfo',
    name: 'CollectHardAddMapInfo',
    component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/AddMap'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_RelationMapShow_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //阿克苏图谱采集-手绘采集新增(第二步)
    path: '/onlineCollect/addMapObject',
    name: 'CollectHardAddMapObject',
    component: resolve => require(['@/components/mapCollectionNext/OnlineCollect/AddMap'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_RelationMapShow_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //阿克苏图谱采集-手绘采集-图谱审批
    path: '/auditCollect',
    name: 'AuditCollect',
    component: OnlineAuditLayout,
    meta: {
      id: constantPageMap.PAGE_MapAduit_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
    children: [{
        path: 'dashboard',
        name: 'AuditDashboard',
        component: resolve => require(['@/components/mapAudit/components/Dashboard'], resolve),
        meta: {
          id: constantPageMap.PAGE_MapAduit_Dashboard_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      {
        // 图谱审核-图谱管理
        path: 'mapReview',
        name: 'AuditMapReview',
        component: resolve => require(['@/components/mapAudit/components/MapReview'], resolve),
        meta: {
          id: constantPageMap.PAGE_MapAduit_List_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      // {
      //   // 图谱审核-人员信息台账
      //   path: 'personInfoLedger',
      //   name: 'PersonInfoLedger',
      //   component: resolve => require(['@/components/mapAudit/components/PersonInfoLedger'], resolve),
      //   meta: {
      //     id: constantPageMap.PAGE_MapAduit_Person_Ledger_ID,
      //     hasAuth: hasAuth,
      //     requiresAuth: true,
      //     functions: []
      //   }
      // }
    ]
  },
  { // 图谱审核-人员信息详情
    path: '/peopleManagement/personInfoDetails',
    name: 'PersonInfoDetails',
    component: resolve => require(['@/components/peopleManagement/components/assembly/personInfoForm'], resolve),
    meta: {
      id: constantPageMap.PAGE_MapAduit_Person_Ledger_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { // 图谱审核-新增人员信息详情
    path: '/peopleManagement/newPersonInfo',
    name: 'newPersonInfo',
    component: resolve => require(['@/components/peopleManagement/components/assembly/newPersonInfoForm'], resolve),
    meta: {
      id: constantPageMap.PAGE_MapAduit_Person_Ledger_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //用户管理页面
    path: '/userManager',
    name: 'UserManager',
    component: resolve => require(['@/components/system/userManager/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_UserManager_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //用户组管理页面
    path: '/userGroupManager',
    name: 'UserGroupManager',
    component: resolve => require(['@/components/system/userGroupManager/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_UserGroupManager_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //权限配置页面
    path: '/permission',
    name: 'Permission',
    component: resolve => require(['@/components/system/permission/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_Permission_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //红名单页面
    path: '/redList',
    name: 'RedList',
    component: resolve => require(['@/components/system/redList/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_RedList_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //人员标签管理
    path: '/personLabel',
    name: 'PersonLabel',
    component: resolve => require(['@/components/system/personLabel/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_PersonLabel_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //帮助配置
    path: '/helpConfig',
    name: 'HelpConfig',
    component: resolve => require(['@/components/system/helpConfig/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_HelpConfig_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //查询日志
    path: '/viewLog',
    name: 'ViewLog',
    component: resolve => require(['@/components/system/viewLog/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_ViewLog_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //帮助配置详情
    path: '/helpConfigDetail',
    name: 'HelpConfigDetail',
    component: resolve => require(['@/components/system/helpConfig/detail/detail'], resolve),
    meta: {
      id: constantPageMap.PAGE_HelpConfig_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //行政区域
    path: '/regional',
    name: 'Regional',
    component: resolve => require(['@/components/system/regional/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_Regional_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //单位维护
    path: '/unitmaintenance',
    name: 'unitmaintenance',
    component: resolve => require(['@/components/system/unitMaintenance/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_UnitMaintenance_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //区划绑定
    path: '/areaBinding',
    name: 'areaBinding',
    component: resolve => require(['@/components/system/areaBinding/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_AreaBinding_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //字典表维护
    path: '/codeMaintenance',
    name: 'CodeMaintenance',
    component: resolve => require(['@/components/system/codeMaintenance/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_CodeMaintenance_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { // 个人中心
    path: '/personalCenter',
    name: 'PersonalCenter',
    component: resolve => require(['@/components/personalCenter/Index.vue'], resolve),
    meta: {
      id: constantPageMap.PAGE_PersonalCenter_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
    children: [{
        path: 'info',
        name: 'PersonalInformation',
        component: resolve => require(['@/components/personalCenter/components/PersonalInformation'], resolve),
        meta: {
          id: constantPageMap.PAGE_PersonalCenter_Info_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        },
      },
      {
        path: 'pass',
        name: 'PersonalChangePassword',
        component: resolve => require(['@/components/personalCenter/components/PersonalChangePassword'], resolve),
        meta: {
          id: constantPageMap.PAGE_PersonalCenter_Update_Pass_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        },
      },
      {
        path: 'chieftain',
        name: 'ChieftainManage',
        component: resolve => require(['@/components/personalCenter/components/ChieftainManage'], resolve),
        meta: {
          id: constantPageMap.PAGE_PersonalCenter_TouMianRenWu_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        },
      },
    ]
  },
  { //宗教传承脉络
    path: '/heritage',
    name: 'Heritage',
    // component: resolve => require(['@/components/religiousHeritage/components/OrgChart'], resolve),
    component: resolve => require(['@/components/religiousHeritage/components/OrgChart'], resolve),
    meta: {
      id: constantPageMap.PAGR_Heritage_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //被打击人员分布图
    path: '/profile',
    name: 'Profile',
    component: resolve => require(['@/components/mapCollection/Profile'], resolve),
    meta: {
      id: constantPageMap.PAGE_Profile_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //出入境人员分布图
    path: '/entryExit',
    name: 'EntryExit',
    component: resolve => require(['@/components/mapCollection/EntryExit'], resolve),
    meta: {
      id: constantPageMap.PAGE_EntryExit_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //被打击人员分布图-地图绘制
    path: '/collectDrawProfile',
    name: 'CollectDrawProfile',
    component: resolve => require(['@/components/mapCollectionNext/CollectDrawProfile'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_Draw_Profile_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
  },
  { //被打击人员分布图-人员打点
    path: '/collectMarkerProfile',
    name: 'CollectMarkerProfile',
    component: resolve => require(['@/components/mapCollectionNext/CollectMarkerProfile'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_Marker_Profile_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //被打击人员分布图展示
    path: '/underAttack',
    name: 'UnderAttack',
    component: resolve => require(['@/components/mapShow/UnderAttack'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_Marker_Profile_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //出入境人员分布图展示
    path: '/exitAndEntry',
    name: 'ExitAndEntry',
    component: resolve => require(['@/components/mapShow/ExitAndEntry'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_Marker_Enter_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  { //出入境人员分布图-人员打点
    path: '/collectMarkerExitEnter',
    name: 'CollectMarkerExitEnter',
    component: resolve => require(['@/components/mapCollectionNext/CollectMarkerExitEnter'], resolve),
    meta: {
      id: constantPageMap.PAGE_Online_Marker_Enter_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  // 关系挖掘
  {
    path: '/relationCheck',
    name: 'RelationCheck',
    component: resolve => require(['@/components/relationCheck/Index'], resolve),
    meta: {
      id: constantPageMap.PAGE_Relation_Check_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }
  },
  // 群体分析
  {
    path: '/groupAnalyse',
    name: 'GroupAnalyse',
    component: resolve => require(['@/components/relationCheck/GroupAnalyse'], resolve),
    meta: {
      id: constantPageMap.PAGE_Group_Analyse_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    }

  },
  { //统计分析
    path: '/statAnalyze',
    name: 'StatAnalyze',
    component: resolve => require(['@/components/statAnalyze/Layout'], resolve),
    meta: {
      id: constantPageMap.PAGE_StatAnalyze_ID,
      hasAuth: hasAuth,
      requiresAuth: true,
      functions: []
    },
    children: [{
        //统计看板
        path: 'dashboard',
        name: 'StatDashboard',
        component: resolve => require(['@/components/statAnalyze/components/Dashboard'], resolve),
        meta: {
          id: constantPageMap.PAGE_StatDashboard_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      {
        // 人员绩效统计
        path: 'performanceStat',
        name: 'PerformanceStat',
        component: resolve => require(['@/components/statAnalyze/components/PerformanceStat'], resolve),
        meta: {
          id: constantPageMap.PAGE_PerformanceStat_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      {
        // 每日情况采集统计
        path: 'dailyCollectionStat',
        name: 'DailyCollectionStat',
        component: resolve => require(['@/components/statAnalyze/components/DailyCollectionStat'], resolve),
        meta: {
          id: constantPageMap.PAGE_DailyCollectionStat_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      },
      {
        // 系统使用统计
        path: 'systemUsageStat',
        name: 'SystemUsageStat',
        component: resolve => require(['@/components/statAnalyze/components/SystemUsageStat'], resolve),
        meta: {
          id: constantPageMap.PAGE_SystemUsageStat_ID,
          hasAuth: hasAuth,
          requiresAuth: true,
          functions: []
        }
      }
    ]
  }
]
//serverConfig.BASE_ENV_PATH
let router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  mode: 'history',
  // base: process.env.NODE_ENV !== 'development' ? serverConfig.BASE_ENV_PATH : "",
  routes: constantRouterMap
})
//路由全局守卫
router.beforeEach((to, from, next) => {
  let cancelArr = window.axiosCancel;
  cancelArr.forEach((ele, index) => {
    ele.cancel("取消了请求") // 在失败函数中返回这里自定义的错误信息
    delete window.axiosCancel[index]
  })
  // 如果当前用户的数据权限为本人权限4,如果点击跳转首页，进行判断要进行跳转在线采集看板
  var dataAuth = store.state.userInfo && store.state.userInfo.dataAuth
  if (config.project.locale == 'bz' && to.path == '/index' && from.path != '/onlineCollect/dashboard') {
    next({
      path: "/dashboard"
    })
    return;
  }
  if (dataAuth == '4' && to.path == '/index' && from.path != '/onlineCollect/dashboard') {
    next({
      path: "/onlineCollect/dashboard"
    })
    return;
  }
  let writeList = ['Login', 'PKILoginCallback', 'zHdl_ZP'] // 不需要登录的白名单
  if (writeList.indexOf(to.name) != -1) {
    next()
  } else {
    if (store.state.token) {
      if (store.getters.permissions.length === 0) { //判断权限是否存在，不存在加载权限数据
        permissionList().then(res => {
          let resu1 = res[0]
          let resu2 = res[1]
          setPagePermissions(constantRouterMap, resu1, resu2)
          router.options.routes = constantRouterMap
          store.commit('permissions', constantRouterMap)
          if (hasPermission(to, constantRouterMap)) {
            next();
          } else {
            Message.error('无权限访问，请联系管理员')
            store.commit('permissions', [])
            console.log('无-permissions数据，没权限')
            next(false) //当前路由无权限访问
          }
        }).catch(res => {
          Message.error('无权限访问，请联系管理员')
          store.commit('permissions', [])
          console.log('无permissions数据-异常', res)
          next(false) //当前路由无权限访问
        })
        return;
      } else {
        if (hasPermission(to, constantRouterMap)) {
          next();
        } else {
          // console.log('有permissions数据，没权限')
          Message.error('无权限访问，请联系管理员')
          next(false) //当前路由无权限访问
        }
      }
    } else {
      // 退出登录页
      Message.error('当前无登录信息，请重新登录')
      // console.log('退出登录页')
      next({
        path: '/',
        // query:{
        //   redirect:to.fullPath
        // }
      })
    }
  }
})
export default router
