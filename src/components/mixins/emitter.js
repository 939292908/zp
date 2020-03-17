/**
 * 权限页面功能点的混入
 */
import {
  getPagePermissions,
  getPagesById
} from '../../permissions'
import {
  constantPageMap,
  constantFunMap,
  NO_AUTH_DATA
} from '../../router/config'
import Vue from 'vue'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
import store from '../../store'

function momentLoadning(callback) {
  var userName = store.state.userInfo.userName;
  var path = config.webSocket;
  var wsurl = `ws://${path}/idsecurity/websocket/${userName}`;
  if (!userName) {
    callback({
      success: false
    });
  }
  if (window.WebSocket) {
    if ((window.$websocket && (window.$websocket.readyState == '3')) || !window.$websocket) {
      try {
        window.$websocket = new WebSocket(wsurl);
        // 建立连接
        window.$websocket.onopen = function (event) {
          // debugger;
          window.$websocket.send(userName);
        }
      } catch (e) {
        callback({
          success: false
        })
        return;
      }
    }
    if (window.$websocket) {
      //收到消息
      window.$websocket.onmessage = function (event) {
        if (event.data.indexOf('{') != -1) {
          var msg = JSON.parse(event.data); //解析收到的json消息数据
          msg.success = true
          callback(msg)
        } else {
          callback({
            success: false
          })
        }
      }
      //发生错误
      window.$websocket.onerror = function (event) {
        i++;
        console.log("Connected to WebSocket server error");
        window.$websocket.close()
        window.$websocket = null
        callback({
          success: false
        });
      }
      //连接关闭
      window.$websocket.onclose = function (event) {
        i++;
        console.log('websocket Connection Closed. ');
        // window.$websocket.send(userName);
      }
    } else {
      callback({
        success: false
      })
    }
  } else {
    callback({
      success: false
    })
    console.log('该浏览器不支持web socket');
  }
}

export const roleMixin = {
  beforeRouteEnter(to, from, next) {
    // console.log('emitter')
    // 判断该页面是否需要验证权限或者页面的编号是否为空
    // 如果不需要验证权限或者ID为空，则直接进行下一步
    // 如果需要验证页面权限，加载页面的功能点权限，并且将功能点的权限添加到路由上
    if (to.meta.requiresAuth && to.meta.id) {
      // console.log('emitter验证权限')
      if (to.meta.hasAuth) {
        getPagePermissions(to.meta.id).then(res => {
          let c = to.meta.functions.concat(res.data)
          to.meta.functions = c
          momentLoadning((msg) => {
            if (msg && msg.success) {
              store.state.onlinecount = msg.count
            }
          })
          next()
        }).catch(res => {
          // console.log('emitter-catch',res)
          if (res && res.code == 300) {
            // console.log('emitter-catch-token',res)
            store.dispatch('exitLogout')
            next({
              path: '/'
            })
          } else {
            next(false)
          }
        })
      } else {
        // console.log('emitter-hasAuth')
        next(false)
      }
    } else {
      // console.log('emitter不需要验证权限')
      momentLoadning((msg) => {
        if (msg && msg.success) {
          store.state.onlinecount = msg.count
        }
      })
      next()
    }
  },
  data() {
    return {
      constantPageMap: constantPageMap,
      constantFunMap: constantFunMap,
      constantNoAuthData: NO_AUTH_DATA,
      onlinecount: ""
    }
  },
  methods: {
    /**
     * 判断功能点是否有操作权限(当前路由)
     * @param {功能点的Code} functionCode
     */
    hasFunAuth(functionCode) {
      let isAuth = this.$route.matched.some(recode => {
        return recode.meta.functions.some(x => {
          return x.functionCode == functionCode
        })
      })
      return isAuth
    },
    /**
     * 判断是否有该页面的权限
     * @param {页面的ID} pageId
     */
    hasPageAuth(pageId) {
      let routes = this.$router.options.routes
      let pages = [];
      getPagesById(routes, pageId, pages);
      let _hasAuth = pages.some(to => {
        return to.meta.requiresAuth ? to.meta.hasAuth : true
      })
      return _hasAuth ? true : false;
    },
    /**
     * 判断是否有后台管理菜单权限
     */
    hasManCenterAuth() {
      let hasUser = this.hasPageAuth(this.constantPageMap.PAGE_UserManager_ID)
      let hasUserGroup = this.hasPageAuth(this.constantPageMap.PAGE_UserGroupManager_ID)
      let hasPermission = this.hasPageAuth(this.constantPageMap.PAGE_Permission_ID)
      let hasRedList = this.hasPageAuth(this.constantPageMap.PAGE_RedList_ID)
      let hasRegional = this.hasPageAuth(this.constantPageMap.PAGE_Regional_ID)
      let hasUnitMaintenance = this.hasPageAuth(this.constantPageMap.PAGE_UnitMaintenance_ID)
      let hasAreaBinding = this.hasPageAuth(this.constantPageMap.PAGE_AreaBinding_ID)
      let hasCodeMaintenance = this.hasPageAuth(this.constantPageMap.PAGE_CodeMaintenance_ID)
      let hasPersonLabel = this.hasPageAuth(this.constantPageMap.PAGE_PersonLabel_ID)
      let hasHelpConfig = this.hasPageAuth(this.constantPageMap.PAGE_HelpConfig_ID)
      return hasUser || hasUserGroup || hasPermission || hasRedList || hasRegional || hasUnitMaintenance || hasAreaBinding || hasCodeMaintenance || hasPersonLabel || hasHelpConfig;
    },
    /**
     * 判断是否有人员管理权限
     */
    hasManManagementAuth() {
      let hasPersonInfo = this.hasPageAuth(this.constantPageMap.PAGE_MapAduit_Person_Ledger_ID)
      let hasCommittee = this.hasPageAuth(this.constantPageMap.PAGE_Online_CommitteeLedger_ID)
      let hasMosque = this.hasPageAuth(this.constantPageMap.PAGE_Online_MosqueLedger_ID)
      let hasNoIdNumber = this.hasPageAuth(this.constantPageMap.PAGE_Online_NoIdNumberManager_ID)
      return hasPersonInfo || hasCommittee || hasMosque || hasNoIdNumber;
    },
    /**
     * 全屏点击事件
     */
    handleWrapperClick(event) {
      if (this.$refs["appHeader"] && this.$refs["appHeader"].statusList) {
        this.$refs["appHeader"].statusList.uploadImg = false;
        this.$refs["appHeader"].statusList.personModalShow = false;
        this.$refs["appHeader"].statusList.newsModalShow = false;
        var appElement = document.querySelector('div.app-list.app')
        if (appElement != undefined && event) {
          // if (event.path.indexOf(appElement) == -1) {
          //   this.$refs["appHeader"].statusList.appModalShow = false;
          // }
          let isExist = false
          for (var i = 0; i < event.path.length; i++) {
            var dom = event.path[i]
            if (dom == appElement) {
              isExist = true
            }
          }
          if (!isExist) {
            this.$refs["appHeader"].statusList.appModalShow = false;
          }
        }
        // this.$refs["appHeader"].statusList.appModalShow = false;
        this.$refs["appHeader"].statusList.messageDetailsShow = false;
        this.$refs["appHeader"].statusList.guidelinesShow = false;
        this.$refs["appHeader"].statusList.changeLogShow = false;
        this.$refs["appHeader"].statusList.feedbackShow = false;
        this.$refs["appHeader"].statusList.myNavModalShow = false;
      } else if (this.statusList) {
        this.statusList.uploadImg = false;
        this.statusList.personModalShow = false;
        this.statusList.newsModalShow = false;
        this.statusList.messageDetailsShow = false;
        this.statusList.guidelinesShow = false;
        this.statusList.changeLogShow = false;
        this.statusList.feedbackShow = false;
        this.statusList.myNavModalShow = false;
        var appElement = document.querySelector('div.app-list.app')
        if (appElement != undefined && event) {
          // if (event.path.indexOf(appElement) == -1) {
          //   this.statusList.appModalShow = false;
          // }
          let isExist = false
          for (var i = 0; i < event.path.length; i++) {
            var dom = event.path[i]
            if (dom == appElement) {
              isExist = true
            }
          }
          if (!isExist) {
            this.statusList.appModalShow = false;
          }
        }
      }
    },
    getImagePath(picUrl) {
      // 判断传参是否包含文件类型
      let dateTime = new Date().getTime();
      if (picUrl) {
        var types = ['.jpg', '.png', '.jpeg', '.bmp']
        let flag = types.some(x => {
          return picUrl.indexOf(x) != -1
        });
        return flag ? config.imgPath + picUrl + '?t=' + dateTime : config.imgPath + picUrl + config.imgType + '?t=' + dateTime
      } else {
        return config.imgPath + null + '?t=' + dateTime;
      }
      // return picUrl ? config.imgPath + picUrl : './static/images/avator.png';
    },
  }
}
