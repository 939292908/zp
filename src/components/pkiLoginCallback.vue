<!--
 * @Description: PKI登录回调重定向页面
 * @Author: your name
 * @Date: 2019-08-15 18:20:15
 * @LastEditTime: 2019-12-12 17:59:00
 * @LastEditors: Please set LastEditors
 -->
 <template>
  <div>正在处理中...</div>
</template>
<script>
import Vue from "vue";
import * as apis from "@/api/system/userManager.js";
import router from "../router";
import store from "../store/index.js";
import VueCookies from "vue-cookies";
import {
  permissionList,
  hasPermission,
  setPagePermissions,
  getPagesById
} from "../permissions.js";
import { constantRouterMap } from "../router";
// 更新权限
function updatePermissions(router, store, callback) {
  // 跟新权限缓存状态
  permissionList()
    .then(res => {
      let resu1 = res[0];
      let resu2 = res[1];
      setPagePermissions(constantRouterMap, resu1, resu2);
      router.options.routes = constantRouterMap;
      store.commit("permissions", constantRouterMap);
      callback(resu1.data);
    })
    .catch(res => {
      callback();
    });
}
// 是否有页面权限
function hasPageAuth(router, pageId) {
  let routes = router.options.routes;
  let pages = [];
  getPagesById(routes, pageId, pages);
  // console.log('pages',pages)
  let _hasAuth = pages.some(to => {
    return to.meta.requiresAuth ? to.meta.hasAuth : true;
  });
  return _hasAuth;
}
export default {
  name: "PKILoginCallback",
  beforeRouteEnter(to, from, next) {
    console.log("PKILoginCallback");
    const $this = Vue.prototype;
    if (to.query && to.query.code) {
      console.log("code", to.query.code);
      // next(false)
      store
        .dispatch("getPkiClientAuthInfo")
        .then(response => {
          let dataP = {
            clientId: response.clientId,
            code: to.query.code,
            redirectUri: response.redirectUri,
            uiasUrl: response.uiasUrl
          };
          apis
            .pkiLogin(dataP)
            .then(response => {
              let loginData = response.data;
              if (response.code == 200) {
                store.commit("SET_TOKEN", loginData.access_token);
                store.commit("SET_USERINFO", {
                  userName: loginData.user_account,
                  ruleName: loginData.user_name,
                  dataAuth: loginData.dataAuth,
                  dataAuthAreaCode: loginData.dataAuthAreaCode,
                  sessionId: loginData.pkiSessionId
                });
                store.commit("REMOVE_OPTION_LIST", []);
                // 获取权限
                updatePermissions(router, store, data => {
                  console.log("data", data, loginData);
                  if (data && data.length > 0) {
                    if (loginData.dataAuth == "4") {
                      let flag = hasPageAuth(
                        router,
                        $this.$bus.constantPageMap.PAGE_Online_Dashboard_ID
                      );
                      if (flag) {
                        $this.$Message.success({ content: "登录成功！" });
                        next({
                          path: "/onlineCollect/dashboard"
                        });
                      } else {
                        $this.$Message.error({
                          content: "无首页的权限访问，请联系管理员"
                        });
                        next({
                          path: "/"
                        });
                      }
                    } else {
                      let _hasAuthIndex = hasPageAuth(
                        router,
                        $this.$bus.constantPageMap.PAGE_NewIndex_ID
                      );
                      console.log("_hasAuthIndex", _hasAuthIndex);
                      if (_hasAuthIndex) {
                        $this.$Message.success({ content: "登录成功！" });
                        next({
                          path: "/index"
                        });
                      } else {
                        $this.$Message.error({
                          content: "无首页的权限访问，请联系管理员"
                        });
                        next({
                          path: "/"
                        });
                      }
                    }
                  } else {
                    $this.$Message.error({
                      content: "无权限访问，请联系管理员"
                    });
                    next({
                      path: "/"
                    });
                  }
                });
              } else {
                $this.$Message.error({ content: response.msg });
                store.dispatch("exitLogout", loginData.pkiSessionId);
                next({
                  path: "/"
                });
              }
            })
            .catch(res => {
              $this.$Message.error({ content: res.msg || res.message });
              store.dispatch("exitLogout");
              next({
                path: "/"
              });
            });
        })
        .catch(res => {
          $this.$Message.error({ content: "获取认证信息失败" });
          store.dispatch("exitLogout");
          next({
            path: "/"
          });
        });
    } else {
      next({
        path: "/"
      });
    }
  }
};
</script>
