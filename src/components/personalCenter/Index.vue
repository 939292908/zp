<template>
  <div class="personal-center" @click.stop="ifCloseAppListShow, handleWrapperClick($event)">
    <app-header ref="appHeader" :userData="userData" :items="statusList" title="个人中心" :showSearch="false"></app-header>
    <div class="nav">
      <!-- 头像 -->
      <!-- <div class="user-img">
        <img src="../../assets/logo.png" alt="">
      </div> -->
      <!-- 名字 -->
      <p class="user">
        <span class="user-name">{{ userData.userName }}</span>
        <span>{{ userData.userCode }}</span>
      </p>
      <!-- 部门 -->
      <p class="department">
        <span>{{ userData.userDeptName }}</span>
      </p>
      <!-- 导航 -->
      <ul class="nav-list">
        <li @click="showInformation($event)" 
        :class="{active: statusList.currentNav == '/personalCenter/info'}"
        v-if="hasPageAuth(constantPageMap.PAGE_PersonalCenter_Info_ID)"
        >基本信息</li>
        
        <li @click="showChangePassword($event)" 
        :class="{active: statusList.currentNav == '/personalCenter/pass'}"
        v-if="hasPageAuth(constantPageMap.PAGE_PersonalCenter_Update_Pass_ID)"
        >修改密码</li>

        <li @click="showChieftainManage($event)" 
        :class="{active: statusList.currentNav == 'personalCenter/chieftain'}"
        v-if="hasPageAuth(constantPageMap.PAGE_PersonalCenter_TouMianRenWu_ID)"
        >头面人物管理</li>
      </ul>
    </div>
    <div class="main">
      <!-- 头部 -->
      <p class="title">{{ titleText }}</p>
      <!-- 组件：基本信息 / 修改密码  -->
      <router-view @getUserData="getUserData"></router-view>
      <!-- <component @getUserData="getUserData" :is="statusList.currentNav"></component> -->
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/assembly/AppHeader';
// import information from './components/PersonalInformation';
// import changePassword from './components/PersonalChangePassword';
// import chieftainManage from './components/ChieftainManage';
export default {
  // , information, changePassword, chieftainManage
  components: { appHeader },
  data () {
    return {
      userData: {},
      titleText: '基本信息',
      statusList: {
        currentNav: this.$route.path,
        typeModal: "", // 右模态框 功能切换 add/remove/detail
        MultiModal: false, // 右模态框 展示
        isDeleteModal: false, // 删除确认框 展示

        uploadImg : false,
        personModalShow : false,        
        newsModalShow : false,       
        appModalShow : false,
        changeLogShow : false,
        guidelinesShow : false,
        messageDetailsShow : false,
        feedbackShow : false,
        d3Show: true,
        d3Loading: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false,
      }
    }
  },
  methods: {
    // 获取子组件 用户信息 给头部组件
    getUserData ( userData ) {
      this.userData = userData;
    },
    // 显示 基本信息
    showInformation (e) {
      this.titleText = e.target.innerText; // 切换标题
      this.statusList.currentNav='/personalCenter/info'; // 切换组件
      this.$router.push({
        path:"/personalCenter/info"
      })
    },
    // 显示 修改密码
    showChangePassword (e) {
      this.titleText = e.target.innerText;
      this.statusList.currentNav='/personalCenter/pass';
      this.$router.push({
        path:"/personalCenter/pass"
      })
    },
    // 显示 头面人物
    showChieftainManage (e) {
      this.titleText = e.target.innerText;
      this.statusList.currentNav='personalCenter/chieftain';
      this.$router.push({
        path:"/personalCenter/chieftain"
      })
    },
    ifCloseAppListShow (evt) {
      if (evt.target.className == 'close-btn') {
        return false;
      }
    }
  }

}
</script>

<style lang="less" scoped>
  @imageUrl: "../../../";
  .personal-center {
    position: absolute;
    z-index: 88;
    height: 100%;
    width: 100%;
    padding-top: 68px;
    .nav {
      padding-top: 50px;
      width: 250px;
      height: 100%;
      // border-right: 2px solid #98B5F9;
      float: left;
      .user-img {
        width: 100px;
        height: 100px;
        margin: 34px auto 18px;
        border-radius: 50%;
        overflow: hidden;
        border: 5px solid #fff;
        box-shadow:0px 0px 8px 2px rgba(0, 0, 0, 0.1);
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .user {
        text-align: center;
        font-size:14px;
        color:rgba(102,102,102,1);
        margin-bottom: 14px;
        .user-name {
          font-size:18px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          margin-right: 2px;
        }
      }
      .department {
        font-size:14px;
        font-weight:400;
        text-align: center;
        color:rgba(153,153,153,1);
        margin-bottom: 28px;
      }
      .nav-list {
        width:100%;
        li {
          height: 46px;
          font-size: 16px;
          line-height: 46px;
          padding-left: 40px;
          cursor: default;
          &.active {
            background:rgba(73,140,233,1);
            color: #fff;
          }
        }
      }
    }
    .main {
      height: 100%;
      overflow: hidden;
      position: relative;
      background:url('@{imageUrl}static/images/net.png') repeat #ffffff;
      border-left: 2px solid #98B5F9;
      .title {
        height:44px;
        line-height: 44px;
        background:rgba(202,215,233,1);
        font-size:16px;
        color:rgba(75,151,230,1);
        padding-left: 18px;
        margin-bottom: 80px;
      }
    }
  }
</style>

