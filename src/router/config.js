/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 09:12:58
 * @LastEditTime : 2019-12-26 11:39:14
 * @LastEditors  : Please set LastEditors
 */
/**
 * 页面ID清单
 */
export const constantPageMap = {
  PAGE_Index_ID: '1', //综合门户

  PAGE_NewIndex_ID: '184', //首页(菜单页)

  PAGE_OldIndex_ID: '184', //原首页

  PAGE_Search_ID: '2', //智能搜索

  PAGE_Result_ID: '3', //搜索结果

  PAGE_SearchTp_ID: '4', //以人搜图

  PAGE_Visualition_ID: '5', //以人搜图结果

  PAGE_FullSearch_ID: '23', //全文检索
  PAGE_FullSearchResult_ID: '25', //全文检索结果页

  PAGE_BasicApps_CaseManager_ID: '182', //基础应用-案件/线索管理
  PAGE_BasicApps_CaseInfoShow_ID: '183', //基础应用-案件/线索详细信息展示页面

  PAGE_People_Management_ID: '198', //人员管理
  PAGE_BasicApps_CaseClubNanalysis_ID: '203', //基础应用-案件/线索分析
  PAGE_BasicApps_CaseMapJoin_ID: '205', //基础应用-案件/案线图串并

  PAGE_Join_ID: '6', //图谱串并

  PAGE_MultiJoin_ID: '7', //区域串并

  PAGE_OverlapTp_ID: '8', //图谱叠加

  PAGE_Archives_ID: '9', //谱系档案
  PAGE_Archives_List_ID: '38', //谱系档案查看列表页面
  PAGE_Archives_Detail_ID: '39', //谱系档案详情页面

  PAGR_Heritage_ID: '21', //传承脉络树形展示

  PAGE_Profile_ID: '43', //被打击人员分布图
  PAGE_EntryExit_ID: '44', //出入境人员分布图
  PAGE_Relation_Check_ID: '98', //关系挖掘
  PAGE_Group_Analyse_ID: '142', //群体分析

  PAGE_Map_Collect_ID: "45", //图谱采集
  PAGE_Map_Collect_Task_ID: "48", //图谱采集任务
  PAGE_Map_Collect_List_ID: "49", //图谱采集列表
  PAGE_Map_Collect_PersonList_ID: "78", //图谱采集人员列表

  PAGE_Online_ID: '46', //在线采集
  PAGE_Online_Dashboard_ID: '50', //在线采集-看板
  PAGE_Online_MapManager_ID: '51', //在线采集-图谱管理
  PAGE_Online_MapReview_ID: '52', //在线采集-报送审核
  PAGE_Online_BelongAreaMapList_ID: '55', //在线采集-辖区地图-列表页面
  PAGE_Online_RelationMapShow_ID: '56', //在线采集关系图图形展示页面
  PAGE_Online_Draw_Profile_ID: '58', //在线采集-地图绘制-被打击人员分布图
  PAGE_Online_Marker_Profile_ID: '59', //在线采集-人员打点-被打击人员分布图

  PAGE_Online_CommitteeLedger_ID: '200', //在线采集-历年来村两委教职人员管理
  PAGE_Online_MosqueLedger_ID: '201', //在线采集-历年来清真寺教职人员管理

  PAGE_Online_Marker_Enter_ID: '79', //在线采集-人员打点-被打击人员分布图
  PAGE_Online_NoIdNumberManager_ID: '202', //在线采集-无证人员管理
  PAGE_Online_NoIdNumberVerify_ID: '204', //在线采集-无证人员核实页面

  PAGE_MapAduit_ID: '47', //图谱审核
  PAGE_MapAduit_Dashboard_ID: '57', //图谱审核看板页面
  PAGE_MapAduit_List_ID: '53', //图谱审核列表页面
  PAGE_MapAduit_Person_Ledger_ID: '199', //图谱审核人员基本信息台账页面

  PAGE_D3_Show_ID: '54', //D3图形展示页面

  PAGE_Manager_ID: '12', //系统管理页面
  PAGE_UserManager_ID: '13', //用户管理页面
  PAGE_UserGroupManager_ID: '14', //用户组管理页面
  PAGE_Permission_ID: '15', //权限配置页面
  PAGE_RedList_ID: '22', //红名单
  PAGE_Regional_ID: '118', //行政区划维护
  PAGE_UnitMaintenance_ID: '158', //单位维护
  PAGE_AreaBinding_ID: '159', //区划绑定
  PAGE_CodeMaintenance_ID: '178', //字典表维护
  PAGE_PersonLabel_ID: '179', //人员标签管理
  PAGE_HelpConfig_ID: '180', //帮助配置
  PAGE_ViewLog_ID: '218', //查询日志

  PAGE_Common_ID: '16', //公用信息页面
  PAGE_PersonalCenter_ID: '24', //个人中心
  PAGE_PersonalCenter_Info_ID: '40', //个人中心-基本信息
  PAGE_PersonalCenter_Update_Pass_ID: '41', //个人中心-修改密码
  PAGE_PersonalCenter_TouMianRenWu_ID: '42', //个人中心-头面人物

  PAGE_ArchivesMap_ID: '9', //谱系档案力导向
  PAGE_ArchivesJoin_ID: '9', //谱系档案串并结果
  PAGE_Collect_ID: '11', //图谱采集
  PAGE_Merge_ID: '17', //图谱合并页面
  PAGE_Collect_Old_ID: '18', //老图谱采集
  PAGE_PedigreeDetail_ID: '20', //图谱详情
  PAGE_ArchivesStatistics_ID: '26', //图谱档案 看板统计
  PAGE_MapAudit_ID: '27', //图谱审核

  PAGE_StatAnalyze_ID: '138', //统计分析
  PAGE_StatDashboard_ID: '139', //统计看板
  PAGE_PerformanceStat_ID: '140', //人员绩效统计
  PAGE_SystemUsageStat_ID: '141', //系统使用统计
  PAGE_DailyCollectionStat_ID: '160', //每日采集情况统计
}
/**
 * 功能点Code清单
 */
export const constantFunMap = {
  //首页(菜单页)
  FUN_NewIndex_View_ID: "18401", //首页-查看

  // 用户管理
  FUN_User_Search_ID: '1301', //查询用户列表
  FUN_User_Add_ID: '1302', //新增用户
  FUN_User_State_ID: '1303', //冻结/激活用户
  FUN_User_Edit_ID: '1304', //编辑用户

  // 用户组管理
  FUN_UserGroup_Search_ID: '1401', //查询用户组列表
  FUN_UserGroup_Add_ID: '1402', //新增用户组
  FUN_UserGroup_Edit_ID: '1403', //编辑用户组
  FUN_UserGroup_Delete_ID: "1404", //删除用户组
  FUN_UserGroup_AddUser_ID: "1405", //向用户组中添加用户

  // 红名单
  FUN_RedList_Search_ID: '2202', //查询红名单列表
  FUN_RedList_Add_ID: '2201', //新增红名单
  FUN_RedList_Edit_ID: '2204', //编辑红名单
  FUN_RedList_Delete_ID: "2203", //删除红名单

  // 帮助配置
  FUN_HelpConfig_Add_ID: '18001', //新增

  // 查询日志
  FUN_ViewLog_View_ID: '21801', //查看

  //行政区划维护
  FUN_Regional_SAVE_ID: '118802', //保存功能
  FUN_Regional_STOP_ID: '1188803', //停用功能11801
  FUN_Regional_START_ID: '11801', //启用功能

  //单位维护
  FUN_UnitMaintenance_SAVE_ID: '15801', //保存功能
  FUN_UnitMaintenance_STOP_ID: '158802', //停用功能

  //区划绑定
  FUN_AreaBinding_Add_ID: "1599903", //添加功能
  FUN_AreaBinding_Delete_ID: "159902", //删除功能
  FUN_AreaBinding_View_ID: "15901", //查看功能

  //字典表维护
  FUN_CodeMaintenance_Add_ID: "178802", //添加功能
  FUN_CodeMaintenance_Edit_ID: "1788803", //编辑功能
  // FUN_CodeMaintenance_Delete_ID: "159902", //删除功能
  FUN_CodeMaintenance_View_ID: "17801", //查看功能
  FUN_CodeMaintenance_State_ID: "17888804", //启用/停用字典项

  //人员标签管理
  FUN_PersonLabel_Add_ID: "179902", //添加功能
  FUN_PersonLabel_Editor_ID: "17901", //编辑功能
  FUN_PersonLabel_View_ID: "1799903", //查看功能
  FUN_PersonLabel_State_ID: "17999904", //状态 启用/停用

  // 权限配置管理
  FUN_Role_Search_ID: '1501', //查看角色列表
  FUN_Role_Add_ID: '1502', //新增角色
  FUN_Role_Edit_ID: '1504', //编辑角色
  FUN_Role_Delete_ID: "1503", //删除角色
  FUN_Role_TreeCheckbox_ID: "1505", //编辑角色权限（树checkbox）
  FUN_Role_AddUserGroup_ID: "1506", //编辑角色用户组绑定
  FUN_Role_EditTreeNodePage_ID: "1507", //编辑树节点页面信息
  FUN_Role_EditTreeNodeFun_ID: "1508", //编辑树节点功能点信息

  // 首页（BZ）
  FUN_Index_HUJIRENKOU_ID: "0101", //户籍人口家谱图谱
  FUN_Index_SHEWENGAOWEI_ID: "0102", //涉稳高危人员家族图谱
  FUN_Index_SHEANRENYUANANJIAN_ID: "0103", //涉案人员案件关系图谱
  FUN_Index_CHAOJINGRENYUAN_ID: "0104", //朝觐人员关系图谱
  FUN_Index_SHEANRENYUANSHEHUI_ID: "0105", //涉案人员社会关系图谱
  FUN_Index_ZONGJIAOJIDUAN_ID: "0106", //宗教极端思想历史传承图谱
  FUN_Index_CHUREJING_ID: "0107", //出入境人员关系图谱
  // 首页（AKS）
  FUN_Index_ZONG_JIAO_JI_DUAN_R_ID: "0112", //宗教极端思想传承体系(aks)
  FUN_Index_ZONG_JIAO_JI_DUAN_Map_View_ID: "0118", //宗教极端思想传承体系(aks)
  FUN_Index_JIA_ZU_R_ID: "0114", //家族族谱关系图(aks)
  FUN_Index_LI_NIAN_BEI_DA_JI_F_ID: "0111", //历年被打击处理人员分布示意图(aks)
  FUN_Index_JING_WAI_SHE_BAO_R_ID: "0115", //境外涉恐涉暴人员网络关系图(aks)
  FUN_Index_MAP_SUMMARY_ID: "0117", //图谱汇总统计(aks)
  FUN_Index_CHU_RU_JING_F_ID: "0116", //出入境人员分布图(aks)
  FUN_Index_SHE_AN_REN_YUAN_AN_JIAN_R_ID: "0113", //涉案人员案件关系图(aks)
  // 首页（BZ/AKS）
  FUN_Index_MAPDADIAN_ID: "0108", //地图打点

  // 智能搜索
  FUN_Search_Data_ID: "0201", //搜索
  FUN_Search_Result_DIEJIA_ID: "0301", //搜索结果图谱叠加
  FUN_Search_Result_CHUANBING_ID: "0203", //搜索结果图谱串并
  FUN_Search_Result_PUXIDANGAN_ID: "0202", //搜索结果谱系档案

  // 以人搜索
  FUN_SearchTp_Data_ID: "0401", //搜索

  // 全文检索
  FUN_SearchFull_Data_ID: "2301", //搜索

  // 基础应用-案件管理
  FUN_BasicApps_CaseManager_View_ID: '18201', //基础应用-案件管理-查看
  FUN_BasicApps_CaseManager_Edit_ID: '182222205', //基础应用-案件管理-未提交编辑
  FUN_BasicApps_CaseManager_Archive_Edit_ID: '18222204', //基础应用-案件管理-已归档编辑
  FUN_BasicApps_CaseManager_Add_ID: '1822222206', //基础应用-案件线索-新增
  FUN_BasicApps_CaseManager_Download_ID: '18222222207', //基础应用-案件线索-下载模板
  FUN_BasicApps_CaseManager_Import_ID: '182222222208', //基础应用-案件线索-批量导入
  FUN_BasicApps_CaseManager_EXPOT_ID: '182222222209', //基础应用-案件线索-数据导出
  FUN_BasicApps_CaseManager_Submit_ID: '182202', //基础应用-案件管理-提交
  FUN_BasicApps_CaseManager_Delect_ID: '1822203', //基础应用-案件管理-删除
  // 基础应用-案件线索管理-详情展示页面
  FUN_BasicApps_CaseManager_View_Submit_ID: '18301', //基础应用-案件线索详情展示-提交
  FUN_BasicApps_CaseManager_Uncommitted_Delect_ID: '183302', //基础应用-案件线索详情展示-未提交删除案件
  FUN_BasicApps_CaseManager_Archived_Delect_ID: '1833303', //基础应用-案件线索详情展示-已归档删除案件

  // 图谱叠加
  FUN_OverlapTp_View_ID: "0801", //查看图谱列表
  FUN_OverlapTp_Showpic_ID: "0802", //展示图形
  FUN_OverlapTp_StartAdd_ID: "0803", //开始叠加

  // 图谱窜并
  FUN_Join_View_ID: "0601", //查看图谱列表
  FUN_Join_StartJoin_ID: "0602", //开始窜并
  FUN_Join_RelationCheck_ID: "0603", //关系挖掘
  FUN_Join_GroupAnalysis_ID: "0604", //群体分析

  // 区域串并
  FUN_MultiJoin_View_ID: "0701", //查看图谱列表
  FUN_MultiJoin_StartJoin_ID: "0702", //开始窜并

  // 谱系档案
  FUN_Archives_Dashboard_ID: "0903", //看板
  FUN_Archives_Country_M_ID: "0906", //跨县市联姻情况
  FUN_Archives_Area_M_ID: "0905", //跨地区联姻情况
  FUN_Archives_List_ID: "0904", //谱系档案管理
  FUN_Archives_Search_ID: "0901", //搜索
  FUN_Archives_View_ID: "0902", //谱系档案D3查看(力导向)

  // 传承脉络树形展示
  FUN_Heritage_View_ID: '2101', //传承脉络树形展示

  // 被打击人员分布图
  FUN_Profile_View_ID: '4301', //被打击人员分布图

  // 传承脉络树形展示
  FUN_EntryExit_View_ID: '4401', //传承脉络树形展示

  // 图谱采集
  FUN_Collect_Upload_Valid_ID: "4501", //采集上传校验
  FUN_Collect_Task_Upload_ID: "4801", //采集任务上传
  FUN_Collect_List_View_ID: "4901", //图谱列表查看按钮
  FUN_Collect_List_Delete_ID: "4902", //图谱列表删除按钮
  FUN_Collect_PersonList_View_ID: "7802", //图谱人员列表查看按钮
  FUN_Collect_PersonList_Delete_ID: "7801", //图谱人员列表删除按钮
  FUN_Collect_Add_ID: "1101", //新增图谱
  FUN_Collect_Edit_ID: "1102", //更新图谱
  FUN_Collect_Delete_ID: "1103", //删除图谱

  // 在线采集
  FUN_Online_Dashboard_Add_Map_ID: '5001', //在线采集-看板-绘制新图谱
  FUN_Online_Dashboard_Upload_Valid_ID: '5002', //在线采集-看板-采集表校验
  FUN_Online_Dashboard_Upload_Task_ID: '5003', //在线采集-看板-批量采集上传
  FUN_Online_MapManager_View_ID: '5101', //在线采集-图谱管理-查看
  FUN_Online_MapManager_Edit_ID: '5102', //在线采集-图谱管理-编辑
  FUN_Online_MapManager_BatchMultitap_ID: '5103', //在线采集-图谱管理-批量转接
  FUN_Online_MapManager_CustomMultitap_ID: '5104', //在线采集-图谱管理-自定义转接
  FUN_Online_MapManager_Delete_ID: '5105', //在线采集-图谱管理-删除图谱
  FUN_Online_MapManager_Download_ID: '5106', //在线采集-图谱管理-数据导出

  FUN_Online_MapReivew_UnSubmit_Edit_ID: '5202', //在线采集-报送审核-编辑（未提交状态下）
  FUN_Online_MapReivew_UnSubmit_Delete_ID: '5203', //在线采集-报送审核-删除（未提交状态下））
  FUN_Online_MapReivew_Reject_Edit_ID: '5205', //在线采集-报送审核-编辑（已退回状态下）
  FUN_Online_MapReivew_Resolve_Edit_ID: '5206', //在线采集-报送审核-编辑（已通过状态下）
  FUN_Online_MapReivew_Submit_ID: '5201', //在线采集-报送审核-提交
  FUN_Online_MapReivew_Review_History_ID: '5204', //在线采集-报送审核-审核历史

  // 在线采集详情页-关系图谱
  FUN_Online_R_Graph_AddEdit_ID: '5605', //在线采集详情页-关系图谱-新增编辑功能
  FUN_Online_R_Graph_Delete_Person_ID: '5606', //在线采集详情页-关系图谱-删除人员功能
  FUN_Online_R_Graph_Submit_ID: '5602', //在线采集详情页-关系图谱-提交功能
  FUN_Online_R_Graph_Resolve_ID: '5603', //在线采集详情页-关系图谱-通过功能
  FUN_Online_R_Graph_Reject_ID: '5604', //在线采集详情页-关系图谱-退回功能
  FUN_Online_R_Graph_Edit_Relation_ID: '5607', //在线采集详情页-关系图谱-编辑关系功能
  FUN_Online_R_Graph_Remove_Relation_ID: '5608', //在线采集详情页-关系图谱-删除关系功能

  // 在线采集-地图采集-被打击
  FUN_Online_F_Map_Profile_View_ID: '5901', //在线采集-地图采集-查看
  FUN_Online_F_Map_Profile_Add_ID: '5902', //在线采集-地图采集-新增/编辑
  FUN_Online_F_Map_Profile_Submit_ID: '5903', //在线采集-地图采集-提交
  FUN_Online_F_Map_Profile_Resolve_ID: '5904', //在线采集-地图采集-通过
  FUN_Online_F_Map_Profile_Reject_ID: '5906', //在线采集-地图采集-退回
  FUN_Online_F_Map_Profile_Delete_ID: '5905', //在线采集-地图采集-删除人员
  FUN_Online_F_Map_Profile_Draw_ID: '5907', //在线采集-地图采集-返回绘制页面

  // 在线采集-地图采集-出入境
  FUN_Online_F_Map_Enter_View_ID: '7901', //在线采集-地图采集-查看
  FUN_Online_F_Map_Enter_Add_ID: '7902', //在线采集-地图采集-新增/编辑
  FUN_Online_F_Map_Enter_Submit_ID: '7903', //在线采集-地图采集-提交
  FUN_Online_F_Map_Enter_Resolve_ID: '7904', //在线采集-地图采集-通过
  FUN_Online_F_Map_Enter_Reject_ID: '7905', //在线采集-地图采集-退回
  FUN_Online_F_Map_Enter_Delete_ID: '7906', //在线采集-地图采集-删除人员
  FUN_Online_F_Map_Enter_Draw_ID: '7907', //在线采集-地图采集-返回绘制页面
  // 在线采集-地图绘制
  FUN_Online_F_Map_Graph_View_ID: '5801', //在线采集-地图绘制-查看
  FUN_Online_F_Map_Graph_Edit_ID: '5802', //在线采集-地图绘制-编辑

  // 在线采集-村两委台账
  FUN_Online_CommitteeLedger_View_ID: "20001", // 在线采集-村两委台账-查看

  // 在线采集-清真寺台账
  FUN_Online_MosqueLedger_View_ID: "20101", // 在线采集-清真寺台账-查看

  // 图谱审核
  FUN_MapAduit_Dashboard_View_ID: '5701', //图谱审核-看板-查看
  FUN_MapAduit_AduitList_Review_ID: '5301', //图谱审核-图谱审核-审核
  FUN_MapAduit_AduitList_View_ID: '5302', //图谱审核-图谱审核-查看
  FUN_MapAduit_AduitList_EXPOT_ID: '5303', //图谱审核-图谱审核-数据导出
  FUN_MapAduit_PersonDetailInfo_View_ID: '19901', //图谱审核-人员台账详细信息-查看
  FUN_MapAduit_PersonDetailInfo_Edit_ID: '199902', //图谱审核-人员台账详细信息-编辑
  FUN_MapAduit_PersonDetailInfo_Add_ID: '1999903', //图谱审核-人员台账详细信息-新增
  FUN_MapAduit_PersonDetailInfo_EXPOT_ID: '19999904', //图谱审核-人员台账详细信息-数据导出
  FUN_MapAduit_PersonDetailInfo_Import_ID: '19999905', //图谱审核-人员台账详细信息-批量导入

  // 图形展示页面
  FUN_D3_Map_Show_ID: '5401', //图形展示页面

  // 个人中心
  FUN_Center_Info_Edit_ID: '4001', //基本信息-编辑
  FUN_Center_Update_Pass_Edit_ID: '4101', //修改密码-编辑
  FUN_Center_TouMianRenWu_Edit_ID: '4201', //头面人物-编辑
  FUN_Center_TouMianRenWu_Delete_ID: '4202', //头面人物-删除
  FUN_Center_TouMianRenWu_Add_ID: '4203', //头面人物-新增

  // 公共页面
  FUN_Common_Dept_ID: "1601", //单位选择
  FUN_Common_Map_ID: "1602", //图谱查看
  FUN_Common_PerInfo_ID: "1603", //个人信息查看
  FUN_Common_PerRelation_ID: "1604", //个人信息关联分析
  FUN_Common_MapType_ID: "1605", //获取图谱类型
  FUN_Common_Employee_ID: "1606", //获取人员信息
  FUN_Common_AddEmployee_ID: "1607", //获取添加人员所需数据
  FUN_Common_UploadImage_ID: "1608", //上传人员图片
  FUN_Common_NoCard_ID: "1609", //生成无身份证人员ID
  FUN_Common_InitSetting_ID: "1610", //获取初始化配置信息
  FUN_Common_MyNav_ID: "1610", //我的导航

  // 统计分析
  FUN_StatAnalyze_Dashboard_View_ID: "13901", //统计分析看板查看
  FUN_StatAnalyze_PerformanceStat_View_ID: "14001", //人员绩效统计查看
  FUN_StatAnalyze_SystemUsageStat_View_ID: "14101", //系统使用统计查看
  FUN_StatAnalyze_DailyCollectionStat_View_ID: "16001", //每日采集情况统计查看
}

export const NO_AUTH_DATA = "无访问数据的权限";
