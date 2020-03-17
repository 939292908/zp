<template>
  <div class="personModal">
    <div class="modal-top"></div>
    <ul>
      <li @click="openPersonalCenter" class="head item">
        <div>
          <p :title="name">{{name}}</p>
          <p>{{roleName}}</p>
        </div>
        <span class="img"></span>
      </li>
      <li @click="openMyNavModal" class="item">
        <i class="iconfont icon-lianjie"></i>
        <span>我的导航</span>
      </li>
      <li @click="openGuidelinesModal" class="item">
        <i class="iconfont icon-shiyongbangzhu"></i>
        <span>使用帮助</span>
      </li>
      <li @click="openChangLogModal" class="item">
        <i class="iconfont icon-xiewenzhang"></i>
        <span>更新日志</span>
      </li>
      <!-- <li @click="openFeedback" class="item">
        <i class="iconfont icon-xiewenzhang"></i>
        <span>意见反馈</span>
      </li>-->
      <!-- <li class="item pmsn-setting" v-if="hasManCenterAuth()">
				<i class="iconfont icon-xiewenzhang"></i>
				<Dropdown placement="right-start">
            <DropdownItem name="language">
								<span @click.stop>后台管理</span>
                <Icon type="ios-arrow-forward"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
                <DropdownItem name="ch" v-if="hasPageAuth(constantPageMap.PAGE_UserManager_ID)">
									<router-link tag="a" to="/userManager">用户管理</router-link>
								</DropdownItem>
                <DropdownItem name="en" v-if="hasPageAuth(constantPageMap.PAGE_UserGroupManager_ID)">
									<router-link tag="a" to="/userGroupManager" >用户组管理</router-link>
								</DropdownItem>
								<DropdownItem name="en">
									<router-link tag="a" to="/permission" v-if="hasPageAuth(constantPageMap.PAGE_Permission_ID)">权限管理</router-link>
								</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </li>-->
      <li @click="exitLogon" class="item">
        <i class="iconfont icon-logout"></i>
        <span>退出登录</span>
      </li>
      <!-- <li class="pmsn-setting">
				<i class="iconfont icon-language"></i>
				<Dropdown placement="right-start" @on-click="switchLanguage">
            <DropdownItem name="language">
                {{language}}
                <Icon type="ios-arrow-forward"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
                <DropdownItem name="ch">ch</DropdownItem>
                <DropdownItem name="en">en</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </li>-->
    </ul>

    <!-- 我的导航侧边框 -->
    <!-- <transition name="appInforArea">
      <myNavModal v-show="statusList.myNavModalShow" @closemyNavModal="closemyNav" ref="myNavModal"></myNavModal>
    </transition>-->
  </div>
</template>

<script>
// import myNavModal from '@/components/assembly/MyNav'

export default {
  name: "personModal",
  // props:{
  // 	// 修改的数据传给了appHeader组件显示
  // 	userData:{
  // 		type:Object,
  // 		default:null
  // 	}
  // },
  props: ["userData"],
  watch: {
    userData: {
      handler(val) {
        this.name = val.userName;
      },
      immediate: false,
      deep: true
    }
  },
  data() {
    return {
      name: this.$store.state.userInfo.ruleName,
      roleName: this.$store.state.userInfo.userName,
      token: "",
      path: this.$config.home,
      language: "language",
      //exitLogin: this.$config.exit,
      personData: []
      // statusList: {
      // 	myNavModalShow: true,
      // }
    };
  },
  created() {},
  methods: {
    // switchLanguage (name) {
    // 	if (name == 'language') {
    // 		return;
    // 	}
    // 	this.language = name;
    //      this.$emit('switchLanguage', name);
    // },
    // show 个人中心
    openPersonalCenter(evt) {
      evt.stopPropagation();
      let flag =
        this.hasPageAuth(this.constantPageMap.PAGE_PersonalCenter_Info_ID) ||
        this.hasPageAuth(
          this.constantPageMap.PAGE_PersonalCenter_Update_Pass_ID
        ) ||
        this.hasPageAuth(
          this.constantPageMap.PAGE_PersonalCenter_TouMianRenWu_ID
        );
      if (!flag) {
        this.$Message.warning(this.constantNoAuthData);
        return;
      }
      if (this.hasPageAuth(this.constantPageMap.PAGE_PersonalCenter_Info_ID)) {
        this.$router.push({
          path: "/personalCenter/info"
        });
        return;
      }
      if (
        this.hasPageAuth(
          this.constantPageMap.PAGE_PersonalCenter_Update_Pass_ID
        )
      ) {
        this.$router.push({
          path: "/personalCenter/pass"
        });
        return;
      }
      if (
        this.hasPageAuth(
          this.constantPageMap.PAGE_PersonalCenter_TouMianRenWu_ID
        )
      ) {
        this.$router.push({
          path: "/personalCenter/chieftain"
        });
        return;
      }
    },
    // show 我的导航
    openMyNavModal(evt) {
      evt.stopPropagation();
      var obj =
        evt.target.tagName.toLocaleLowerCase() == "li"
          ? evt.target
          : evt.target.parentNode;
      this.$emit("openMyNavModal", true);
    },
    openGuidelinesModal(evt) {
      // debugger;
      evt.stopPropagation();
      var obj =
        evt.target.tagName.toLocaleLowerCase() == "li"
          ? evt.target
          : evt.target.parentNode;
      this.$emit("openGuideModal", true);
    },
    openChangLogModal(evt) {
      // debugger;
      evt.stopPropagation();
      var obj =
        evt.target.tagName.toLocaleLowerCase() == "li"
          ? evt.target
          : evt.target.parentNode;
      this.$emit("openChangModal", true);
    },
    openFeedback(evt) {
      evt.stopPropagation();
      var obj =
        evt.target.tagName.toLocaleLowerCase() == "li"
          ? evt.target
          : evt.target.parentNode;
      this.$emit("openFeedbackModal", true);
    },
    getPersonData() {
      var me = this;
      var url = me.path + "HomePageController/v1/queryCurrentUserInfo";
      var params = new URLSearchParams();
      params.append("token", me.token);
      this.$axios
        .post(url, params)
        .then(response => {
          if (response.data.code == 200) {
            me.personData = response.data.data;
          } else {
            console.log(response.data.message);
          }
        })
        .catch(response => {
          console.log(response);
        });
    },
    // 退出登录
    exitLogon() {
      var me = this;
      // this.$store.commit('permissions',[])
      // this.$store.commit('REMOVE_OPTION_LIST',[])
      // let userInfo = this.$store.state.userInfo
      // // 如果sessionId有值的话，则需要进行PKI的单点退出
      // let sessionId = userInfo.sessionId;
      // if(sessionId) {
      // 	this.$store.dispatch("getPkiClientAuthInfo").then(response=>{
      // 		this.$jsonp(`${response.uiasUrl}uias/uias/shotOff?sessionId=${sessionId}`).then(res=>{
      // 		})
      // 	})
      // }
      // this.$store.commit('REMOVE_TOKEN')
      // this.$store.commit('REMOVE_USERINFO')
      // debugger;
      //  /UserLoginResource/v1/auth/loginOut
      this.$store.dispatch("exitLogout");
      me.$router.push({
        path: "/"
      });
      // sessionStorage.clear()

      // var url = me.path+'HomePageController/v1/exitSystem';
      //  var params = new URLSearchParams();
      // params.append('token', me.token);
      //  this.$axios.post(url,params).then((response)=>{
      //      if (response.data.code == 200) {
      //  		me.$router.push({
      //        path: '/',
      //      });
      //  	}else{
      //  		alert(response.data.msg);
      //  		me.$router.push({
      //        path: '/',
      //      });
      //  	}
      //    }).catch((response)=>{
      //      console.log(response);
      //    })
    },
    /**
     * 关闭我的导航
     * @function closemyNav
     */
    closemyNav(f) {
      this.statusList.myNavModalShow = f;
    }
  }
};
</script>

<style lang="less" scoped>
.post(a) {
  position: absolute;
}
.personModal {
  width: 134px;
  //height:186px;
  .post(a);
  // right:308px;
  right: 174px;
  top: 50px;
  z-index: 999999;
  background-color: #17337f;
  box-shadow: 0px 0px 10px 0px rgba(36, 106, 172, 0.75);
  border: solid 1px #256cb0;
  .modal-top {
    width: 70px;
    height: 6px;
    .post(a);
    top: -1px;
    left: 50%;
    margin-left: -35px;
    background: url(../../../static/images/person-modal-top.png) 0 0 no-repeat;
  }
  ul {
    .item,
    .pmsn-setting {
      height: 33px;
      line-height: 33px;
      i {
        margin: 0 15px;
        color: #9ca6c1;
      }
      span {
        color: #fff;
        font-size: 14px;
      }
    }
    .pmsn-setting {
      .ivu-icon {
        margin-left: 5px;
      }
    }
    .item:hover {
      cursor: pointer;
      background: #264496;
    }
    .item:nth-child(1) {
      overflow: hidden;
      height: 65px;
      background: #264496;
    }
    .head {
      .img {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 30px;
        float: left;
        margin: 18px 12px 0 7px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      div {
        width: 100%;
        float: right;
        padding-left: 42px;
        margin-top: 16px;
        padding-right: 10px;
        p {
          line-height: 18px;
          font-size: 12px;
          height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:nth-child(1) {
          color: #fff;
        }
        p:nth-child(2) {
          color: #6fabfc;
          // position:relative;
          // top:-2px;
        }
      }
    }
  }
}
@media screen and (max-width: 1620px) {
  header {
    .result-search-box {
      left: 59%;
    }
    .r_btn {
      width: 306px;
      .personal {
        // left:0;
        left: -1px;
      }
      .btn {
        width: 117px;
      }
      .news {
        // left:98px;
        left: 98px;
      }
      .app {
        // left:196px;
        left: 197px;
      }
    }
  }

  .personModal {
    // right:192px;
    right: 154px;
    width: 126px;
  }
  .newsModal {
    right: 92px;
  }
  .my-nav-ico {
    font-size: 16px;
  }
}
</style>

<style lang="less">
.pmsn-setting {
  position: relative;
  .iconfont {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    // font-size:16px !important;
    // margin: 0 15px !important;
    // 	color: #9ca6c1 !important;
  }
  .ivu-dropdown {
    width: 100%;
    .ivu-dropdown-rel {
      .ivu-dropdown-item {
        padding-left: 50px;
        color: #fff;
      }
      .ivu-dropdown-item:hover {
        background: #264496;
      }
    }
    .ivu-select-dropdown {
      background-color: rgb(23, 51, 127);
      border-radius: 0px;
      box-shadow: rgba(36, 106, 172, 0.75) 0px 0px 10px 0px;
      li {
        a {
          color: #ffffff !important;
        }
        &:hover {
          background: #264496;
        }
      }
    }
  }
}
</style>
