<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 09:37:38
 * @LastEditTime: 2019-09-25 15:26:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login">
    <img src="../../static/images/login/bg-login-gb.png" class="bg" alt />
    <div class="bg-icon"></div>
    <div class="login-header">
      <img src="../../static/images/login/gb-icon.png" class="gb-icon" alt />
      <!-- <p class="gb-title">新疆公安涉稳智谱平台</p> -->
      <p class="gb-title">{{this.$config.project.name}}</p>
    </div>
    <div class="login-area">
      <img src="../../static/images/login/gb-u.png" alt />
      <span class="login-btn" @click="toOauthPage">PKI登录</span>
    </div>
  </div>
</template>

<script>
import { guid } from "../tools/units";
export default {
  data() {
    return {};
  },
  methods: {
    toOauthPage() {
      let state = guid();
      this.$store.dispatch("getPkiClientAuthInfo").then(response => {
        window.location.href = `${response.uiasUrl}uias/${response.onUri}?response_type=code&scope=read,write&client_id=${response.clientId}&state=${state}&redirect_uri=${response.redirectUri}`;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  .bg {
    width: 100%;
    height: 100%;
  }
  .bg-icon {
    width: 37.8%;
    max-width: 789px;
    height: 80.2%;
    max-height: 843px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 9.2%;
    background: url("../../static/images/login/bg-icon-gb.png") 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .login-header {
    position: absolute;
    top: 6.8%;
    left: 3.3%;
    .gb-icon {
      width: 119px;
      height: 124px;
      display: inline-block;
      vertical-align: middle;
    }
    .gb-title {
      font-size: 40px;
      font-weight: bold;
      color: #b7e8ff;
      display: inline-block;
      vertical-align: middle;
      margin-left: 28px;
    }
  }
  .login-area {
    position: absolute;
    bottom: 4.6%;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 124px;
      height: 87px;
      vertical-align: middle;
    }
    .login-btn {
      cursor: pointer;
      vertical-align: middle;
      display: inline-block;
      width: 160px;
      height: 48px;
      background: linear-gradient(
        0deg,
        rgba(25, 152, 219, 0.8),
        rgba(25, 152, 219, 0.2)
      );
      border: 1px solid rgba(4, 107, 186, 1);
      color: #c3ffff;
      font-size: 16px;
      text-align: center;
      line-height: 46px;
    }
  }
}
@media screen and (max-width: 1600px) {
  .login {
    .login-header {
      .gb-icon {
        width: 99px;
        height: 103px;
      }
      .gb-title {
        font-size: 33px;
        margin-left: 23px;
      }
    }
    .login-area {
      img {
        width: 103px;
        height: 70px;
      }
      .login-btn {
        width: 133px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
      }
    }
  }
}
</style>
