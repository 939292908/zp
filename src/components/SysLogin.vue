<template>
  <div class="login">
    <img class="login-bg" src="../../static/images/login/login-bg.png" />
    <loading color="white" v-model="loginLoading"></loading>
    <div class="bg-icon"></div>
    <div class="login-box">
      <div class="name" v-if="this.$config.project.locale !='bz'">
        <span>{{this.$config.project.name}}</span>
      </div>
      <div class="form">
        <div class="form-box">
          <ul v-if="activeIndex == 0">
            <li class="username">
              <span></span>
              <input type="text" v-model="userName" @keyup.enter="toIndexPage" />
            </li>
            <li class="password">
              <span></span>
              <input type="password" v-model="passWord" @keyup.enter="toIndexPage" />
            </li>
            <li class="login-btn" @click="toIndexPage">登录</li>
          </ul>
          <ul v-if="activeIndex == 1">
            <img class="pki-img" src="../../static/images/login/pki.png" />
          </ul>
          <ul>
            <li class="login-type">
              <span @click="toDefaultPage">密码登录</span>
              <span @click="toOauthPage">PKI 登录</span>
              <span @click="toFacePage">人脸/指纹登录</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  permissionList,
  hasPermission,
  setPagePermissions
} from "../permissions.js";
import { constantRouterMap } from "../router";
import { guid } from "../tools/units";
import Loading from "@/components/assembly/Loading";
export default {
  name: "Login",
  components: {
    Loading
  },
  data() {
    return {
      loginLoading: false,
      path: this.$config.bzLogin,
      userName: "",
      passWord: "",
      activeIndex: 1
    };
  },
  created() {
    // console.log('token',this.$store.state.token)
    //this.$i18n.locale='ch';
  },
  methods: {
    // switchLanguage (name) {
    //   this.$i18n.locale = name;
    // },
    toFacePage() {
      // this.activeIndex = 0
    },
    toOauthPage() {
      this.activeIndex = 1;
      let state = guid();
      this.$store.dispatch("getPkiClientAuthInfo").then(response => {
        window.location.href = `${response.uiasUrl}uias/${response.onUri}?response_type=code&scope=read,write&client_id=${response.clientId}&state=${state}&redirect_uri=${response.redirectUri}`;
      });
    },
    toDefaultPage() {
      this.activeIndex = 0;
    },
    toIndexPage() {
      var me = this;
      var url = me.path;
      me.loginLoading = true;
      this.$axios
        .post(url, {
          account: me.userName,
          password: me.passWord
        })
        .then(response => {
          if (response.code == 200) {
            let res = response.data;
            this.$store.commit("SET_TOKEN", res.access_token);
            this.$store.commit("SET_USERINFO", {
              userName: res.user_account,
              ruleName: res.user_name,
              dataAuth: res.dataAuth,
              dataAuthAreaCode: res.dataAuthAreaCode
            });
            this.$store.commit("REMOVE_OPTION_LIST", []);
            // 获取权限
            this._updatePermissions(data => {
              me.loginLoading = false;
              if (data && data.length > 0) {
                // 如果数据权限为本人的话且在线采集看板有权限，跳转在线采集看板页面，否则跳转首页
                if (res.dataAuth == "4") {
                  let flag = this.hasPageAuth(
                    this.constantPageMap.PAGE_Online_Dashboard_ID
                  );
                  if (flag) {
                    me.$Message.success("登录成功 ！");
                    me.$router.push({
                      path: "/onlineCollect/dashboard"
                    });
                  } else {
                    this.$Message.error("无首页的权限访问，请联系管理员");
                  }
                } else {
                  if (this.hasPageAuth(this.constantPageMap.PAGE_NewIndex_ID)) {
                    me.$Message.success("登录成功 ！");
                    me.$router.push({
                      path: "/index"
                    });
                  } else {
                    this.$Message.error("无首页的权限访问，请联系管理员");
                  }
                }
              } else {
                this.$Message.error("无权限访问，请联系管理员");
              }
            });
          } else {
            me.$Message.error(response.msg);
            me.loginLoading = false;
          }
        })
        .catch(error => {
          me.loginLoading = false;
        });
    },
    /**
     * 更新权限数据
     */
    _updatePermissions(callback) {
      // 跟新权限缓存状态
      permissionList()
        .then(res => {
          let resu1 = res[0];
          let resu2 = res[1];
          setPagePermissions(constantRouterMap, resu1, resu2);
          this.$router.options.routes = constantRouterMap;
          this.$store.commit("permissions", constantRouterMap);
          callback(resu1.data);
        })
        .catch(res => {
          callback();
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
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  .login-bg {
    width: @widthH;
    height: @widthH;
    .post(a);
  }
  .bg-icon {
    // width:925px;
    width: 834px;
    //height:808px;
    height: 717px;
    .post(a);
    left: 4.4%;
    top: 10.2%;
    background: url(../../static/images/login/bg-icon.png) 0 0 no-repeat;
    background-size: @widthH @widthH;
  }
  .login-box {
    width: 516px;
    .post(a);
    // top:24.5%;
    top: 18%;
    right: 12.9%;
    .name {
      width: 100%;
      color: #84caf9;
      font-size: 24px;
      span {
        margin-left: 20px;
      }
    }
    .form {
      width: 100%;
      height: 478px;
      background: url(../../static/images/login/login-box.png) 0 0 no-repeat;
      background-size: @widthH @widthH;
      overflow: hidden;
      .form-box {
        width: 362px;
        height: 314px;
        margin: 84px auto;
        // margin:84px 0 0 67px;
        ul {
          li {
            width: 100%;
            height: 50px;
            &.imgpki {
              width: 100%;
              height: 233px;
              margin-bottom: 50px;
              background: url(../../static/images/pki.png) -20px 0 no-repeat;
            }
          }
          .username {
            .post(r);
            margin-bottom: 30px;
            span {
              .post(a);
              display: inline-block;
              width: 47px;
              height: 46px;
              border-right: 2px solid #c8d2dd;
              left: 2px;
              top: 2px;
              background: url(../../static/images/login/username.png) center
                center no-repeat;
            }
            input {
              width: 362px;
              height: 50px;
              //line-height:50px;
              line-height: 1;
              border: 2px solid #c8d2dd;
              outline: none;
              color: #56595f;
              font-size: 14px;
              padding: 0 10px 0 74px;
            }
          }
          .password {
            .post(r);
            margin-bottom: 38px;
            span {
              .post(a);
              display: inline-block;
              width: 47px;
              height: 46px;
              border-right: 2px solid #c8d2dd;
              left: 2px;
              top: 2px;
              background: url(../../static/images/login/password.png) center
                center no-repeat;
            }
            input {
              width: 362px;
              height: 50px;
              line-height: 50px;
              border: 2px solid #c8d2dd;
              outline: none;
              color: #56595f;
              font-size: 14px;
              padding: 0 10px 0 74px;
            }
          }
          .login-btn {
            margin-bottom: 53px;
            width: 362px;
            height: 50px;
            line-height: 50px;
            background-color: #177bbd;
            text-align: center;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
          }
          .login-type {
            width: 362px;
            height: 43px;
            span {
              width: 104px;
              height: 43px;
              line-height: 43px;
              text-align: center;
              color: #c3ffff;
              font-size: 14px;
              float: left;
              cursor: pointer;
              display: inline-block;
              background: url(../../static/images/login/btn-check.png) 0 0
                no-repeat;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:nth-child(2) {
              margin: 0 25px;
            }
          }
        }
      }
    }
  }
}
.pki-img {
  width: 100%;
  border: 1px dashed #888888;
}
@media screen and (max-width: 1600px) {
  .login {
    .bg-icon {
      // width:462.5px;
      // height:404px;
      width: 648px;
      height: 558px;
      .post(a);
      left: 4.4%;
      top: 5.2%;
      background: url(../../static/images/login/bg-icon.png) 0 0 no-repeat;
      background-size: @widthH @widthH;
    }
    .login-box {
      // width:310px;
      width: 366px;
      .name {
        font-size: 20px;
      }
      .form {
        // height:289px;
        height: 339px;
        .form-box {
          margin: 42px auto;
          width: 258px;
          height: 255px;
          ul {
            li {
              height: 36px;
              &.imgpki {
                width: 100%;
                height: 233px;
                // margin-bottom:50px;
                // background:url(../../static/images/pki.png) -20px 0 no-repeat;
                margin-bottom: 0;
                background: url(../../static/images/pki.png) 0 0 no-repeat;
                background-size: 100% 100%;
              }
            }
            .username {
              .post(r);
              margin-bottom: 20px;
              span {
                .post(a);
                display: inline-block;
                width: 36px;
                height: 32px;
                border-right: 2px solid #c8d2dd;
                left: 2px;
                top: 2px;
                background: url(../../static/images/login/username.png) center
                  center no-repeat;
              }
              input {
                width: 100%;
                height: 36px;
                //line-height:36px;
                line-height: 1;
                border: 2px solid #c8d2dd;
                outline: none;
                color: #56595f;
                font-size: 14px;
                padding: 0 10px 0 45px;
              }
            }
            .password {
              .post(r);
              margin-bottom: 25px;
              span {
                .post(a);
                display: inline-block;
                width: 36px;
                height: 32px;
                border-right: 2px solid #c8d2dd;
                left: 2px;
                top: 2px;
                background: url(../../static/images/login/password.png) center
                  center no-repeat;
              }
              input {
                width: 100%;
                height: 36px;
                line-height: 36px;
                border: 2px solid #c8d2dd;
                outline: none;
                color: #56595f;
                font-size: 14px;
                padding: 0 10px 0 45px;
              }
            }
            .login-btn {
              margin-bottom: 37px;
              width: 100%;
              height: 36px;
              line-height: 36px;
              background-color: #177bbd;
              text-align: center;
              font-size: 12px;
              color: #fff;
              cursor: pointer;
            }
            .login-type {
              width: 100%;
              height: 31px;
              span {
                width: 74px;
                height: 31px;
                line-height: 31px;
                text-align: center;
                color: #c3ffff;
                font-size: 12px;
                float: left;
                cursor: pointer;
                display: inline-block;
                background: url(../../static/images/login/btn-check.png) 0 0
                  no-repeat;
                background-size: 100% 100%;
              }
              span:nth-child(2) {
                margin: 0 18px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.login {
  .loginLoading {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 9999;
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
      font-size: 60px;
    }
    .login-load-text {
      color: #2d8cf0;
      font-size: 16px;
    }
    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .demo-spin-col {
      width: 400px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -200px;
      margin-top: -50px;
      .ivu-spin-show-text {
        background: rgba(255, 255, 255, 0);
        .ivu-spin-main {
          .ivu-spin-dot {
            display: inline-block !important;
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
}

.load {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}
.load-body {
  width: 60px;
  height: 26px;
  border-radius: 5px;
}
.load-body {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-90%);
}
.load-body > tr > th {
  text-align: center;
}
.loading1,
.loading2,
.loading3 {
  width: 15px;
  height: 26px;
  border-radius: 4px;
  margin: 0 auto;
  background-color: #fff;
}
.loading1 {
  -webkit-animation: load-img1 1s infinite linear;
  animation: load-img1 1s infinite linear;
}
.loading2 {
  -webkit-animation: load-img2 1s infinite linear;
  animation: load-img2 1s infinite linear;
}
.loading3 {
  -webkit-animation: load-img3 1s infinite linear;
  animation: load-img3 1s infinite linear;
}
@-webkit-keyframes load-img1 {
  0% {
    background: red;
    height: 20px;
    margin: 0 auto;
  }
  25% {
    background: #ff0;
    height: 26px;
    margin: -4px auto;
  }
  50% {
    background: #00f;
    height: 20px;
    margin: 0 auto;
  }
  75% {
    background: green;
    height: 26px;
    margin: -4px auto;
  }
  100% {
    background: red;
    height: 20px;
    margin: 0 auto;
  }
  // 0%{background:#4899cf;height:20px;margin:0 auto}
  // 25%{background:#3481b4;height:26px;margin:-4px auto}
  // 50%{background:#276e9d;height:20px;margin:0 auto}
  // 75%{background:#185984;height:26px;margin:-4px auto}
  // 100%{background:#0d4468;height:20px;margin:0 auto}
}
// @keyframes load-img1{
//   0%{background:red;height:20px;margin:0 auto}
//   25%{background:#FF0;height:26px;margin:-4px auto}
//   50%{background:#00F;height:20px;margin:0 auto}
//   75%{background:green;height:26px;margin:-4px auto}
//   100%{background:red;height:20px;margin:0 auto}
// }
@-webkit-keyframes load-img2 {
  0% {
    background: #ff0;
    height: 26px;
    margin: -4px auto;
  }
  25% {
    background: red;
    height: 20px;
    margin: 0 auto;
  }
  50% {
    background: green;
    height: 26px;
    margin: -4px auto;
  }
  75% {
    background: #00f;
    height: 20px;
    margin: 0 auto;
  }
  100% {
    background: #ff0;
    height: 26px;
    margin: -4px auto;
  }
  // 0%{background:#0d4468;height:26px;margin:-4px auto}
  // 25%{background:#4899cf;height:20px;margin:0 auto}
  // 50%{background:#3481b4;height:26px;margin:-4px auto}
  // 75%{background:#276e9d;height:20px;margin:0 auto}
  // 100%{background:#185984;height:26px;margin:-4px auto}
}
// @keyframes load-img2{
//   0%{background:#FF0;height:26px;margin:-4px auto}
//   25%{background:red;height:20px;margin:0 auto}
//   50%{background:green;height:26px;margin:-4px auto}
//   75%{background:#00F;height:20px;margin:0 auto}
//   100%{background:#FF0;height:26px;margin:-4px auto}
// }
@-webkit-keyframes load-img3 {
  0% {
    background: #00f;
    height: 20px;
    margin: 0 auto;
  }
  25% {
    background: green;
    height: 26px;
    margin: -4px auto;
  }
  50% {
    background: #ff0;
    height: 20px;
    margin: 0 auto;
  }
  75% {
    background: red;
    height: 26px;
    margin: -4px auto;
  }
  100% {
    background: #00f;
    height: 20px;
    margin: 0 auto;
  }
  // 0%{background:#185984;height:20px;margin:0 auto}
  // 25%{background:#0d4468;height:26px;margin:-4px auto}
  // 50%{background:#4899cf;height:20px;margin:0 auto}
  // 75%{background:#3481b4;height:26px;margin:-4px auto}
  // 100%{background:#276e9d;height:20px;margin:0 auto}
}
// @keyframes load-img3{
//   0%{background:#00F;height:20px;margin:0 auto}
//   25%{background:green;height:26px;margin:-4px auto}
//   50%{background:#FF0;height:20px;margin:0 auto}
//   75%{background:red;height:26px;margin:-4px auto}
//   100%{background:#00F;height:20px;margin:0 auto}
// }

.login {
  .ivu-dropdown {
    width: 85px;
    position: absolute;
    right: 50px;
    top: 25px;
    z-index: 99999;
    .ivu-dropdown-rel {
      .ivu-btn {
        width: 100%;
        padding: 5px 5px 6px;
      }
    }
    .ivu-select-dropdown {
      .ivu-dropdown-menu {
        min-width: 100%;
      }
    }
  }
}
</style>
