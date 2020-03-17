/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 09:11:15
 * @LastEditTime: 2019-09-23 15:07:21
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
const config = require('../configs/config' + process.env.ENV_CONFIG).config
import {
  getPkiClientInfo,
  loginOut
} from '../api/system/userManager'
import {
  getToken,
  setToken,
  setUserInfo,
  getUserInfo,
  removeToken,
  removeUserInfo
} from '../tools/authToken.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    citys: [],
    userInfo: getUserInfo(),
    permissions: [],
    token: getToken(),
    optionList: [],
    pkiClientInfo: null,
    addressList: null,
    onlinecount: ''
  },
  mutations: {
    citys(state, data) {
      state.citys = data;
    },
    permissions(state, data) {
      state.permissions = data;
    },
    token(state, data) {
      state.token = data;
    },
    SET_USERINFO(state, data) {
      let info = getUserInfo()
      Object.assign(info, data)
      setUserInfo(info)
      state.userInfo = info;
    },
    SET_TOKEN(state, data) {
      if (window.$websocket && window.$websocket.readyState != '3') {
        window.$websocket.close()
        window.$websocket = null
      }
      state.token = data;
      setToken(data)
    },
    REMOVE_TOKEN(state) {
      state.token = "";
      removeToken();
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {};
      removeUserInfo();
    },
    REMOVE_OPTION_LIST: (state) => {
      state.optionList = []
    },
    SET_OPTION_BY_KEY: (state, data) => {
      state.optionList.push(data);
    },
    SET_PKI_CLIENT_INFO: (state, data) => {
      state.pkiClientInfo = data;
    },
    SET_ADDRESS_LIST_INFO: (state, data) => {
      state.addressList.push(data);
    }
  },
  getters: {
    citys(state) {
      return state.citys;
    },
    permissions(state) {
      return state.permissions;
    },
    token(state) {
      return state.token
    }
  },
  actions: {
    citys(context, data) {
      context.commit('citys', data);
    },
    permissions(context, data) {
      context.commit('permissions', data);
    },
    token(context, data) {
      context.commit('token', data);
    },
    // 获取缓存中清单的数据
    getOptionsByKey({
      commit,
      state
    }, option) {
      // 首先判断是否有当前KEY的清单数据，
      let optionObj = state.optionList.find(x => x.key == option.key)
      if (optionObj) {
        // 判断是否需要验证参数是否一致，一致取缓存的值，不一致，请求最新
        if (option.validParams == true) {
          var flag = typeof option.params == 'string' ?
            (option.params == optionObj.params) :
            (JSON.stringify(option.params) == JSON.stringify(optionObj.params))
          if (flag) {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(optionObj.data));
              resolve(data);
            });
          } else {
            return new Promise((resolve, reject) => {
              option.apiFun(option.params).then(response => {
                if (response.code === 200) {
                  let data = response.data
                  commit('SET_OPTION_BY_KEY', {
                    key: option.key,
                    params: option.params,
                    data: data
                  })
                  resolve(data)
                } else {
                  reject(response)
                }
              }).catch(error => {
                reject(error)
              })
            })
          }
        } else {
          return new Promise((resolve, reject) => {
            let data = JSON.parse(JSON.stringify(optionObj.data));
            resolve(data);
          });
        }

      } else {
        // 如果清单的KEY值不存在，则先调用接口在返回当前KEY的值
        return new Promise((resolve, reject) => {
          option.apiFun(option.params).then(response => {
            if (response.code === 200) {
              let data = response.data
              commit('SET_OPTION_BY_KEY', {
                key: option.key,
                params: option.params,
                data: data
              })
              resolve(data)
            } else {
              reject(response)
            }
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    // 根据KEY清除对应的缓存
    removeOptionByKey({ state }, keyList) {
      for (var i = 0; i < state.optionList.length; i++) {
        if (keyList.indexOf(state.optionList[i].key) != -1) {
          state.optionList.splice(i, 1)
        }
      }
    },
    // 根据系统客户获取PKI认证信息
    getPkiClientAuthInfo({
      commit,
      state
    }) {
      if (state.pkiClientInfo && state.pkiClientInfo.locale == config.project.locale) {
        return new Promise((resolve, reject) => {
          let data = state.pkiClientInfo;
          resolve(data);
        });
      } else {
        return new Promise((resolve, reject) => {
          getPkiClientInfo().then(response => {
            if (response.code === 200) {
              const data = response.data
              data.locale = config.project.locale
              commit('SET_PKI_CLIENT_INFO', data)
              resolve(data)
            } else {
              reject(response)
            }
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    // 获取和设置地址的缓存，缓存code码
    getAddressListInfo({
      commit,
      state
    }, option) {
      // 首先判断是否有当前KEY的清单数据，
      let optionObj = state.addressList.find(x => x.key == option.params)
      if (optionObj) {
        // 判断是否需要验证参数是否一致，一致取缓存的值，不一致，请求最新
        if (option.validParams == true) {
          var flag = typeof option.params == 'string' ?
            (option.params == optionObj.params) :
            (JSON.stringify(option.params) == JSON.stringify(optionObj.params))
          if (flag) {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(optionObj.data));
              resolve(data);
            });
          } else {
            return new Promise((resolve, reject) => {
              option.apiFun(option.params).then(response => {
                if (response.code === 200) {
                  const data = response.data
                  commit('SET_ADDRESS_LIST_INFO', {
                    key: option.key,
                    params: option.params,
                    data: data
                  })
                  resolve(data)
                } else {
                  reject(response)
                }
              }).catch(error => {
                reject(error)
              })
            })
          }
        } else {
          return new Promise((resolve, reject) => {
            let data = JSON.parse(JSON.stringify(optionObj.data));
            resolve(data);
          });
        }
      } else {
        // 如果清单的KEY值不存在，则先调用接口在返回当前KEY的值
        return new Promise((resolve, reject) => {
          option.apiFun(option.params).then(response => {
            if (response.code === 200) {
              const data = response.data
              commit('SET_ADDRESS_LIST_INFO', {
                key: option.key,
                params: option.params,
                data: data
              })
              resolve(data)
            } else {
              reject(response)
            }
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    // 退出登录
    exitLogout({
      dispatch,
      commit,
      state
    }, sessionId) {
      loginOut().then(response => {
        if (window.$websocket) {
          window.$websocket.close()
          window.$websocket = null
        }
        // 如果sessionId有值的话，则需要进行PKI的单点退出
        let tmpSessionId = ""
        if (sessionId) {
          tmpSessionId = sessionId
        } else {
          let userInfo = getUserInfo();
          tmpSessionId = userInfo ? userInfo.sessionId : ""
        }
        if (tmpSessionId) {
          dispatch('getPkiClientAuthInfo').then(response => {
            Vue.prototype.$jsonp(`${response.uiasUrl}uias/uias/shotOff?sessionId=${tmpSessionId}`).then(res => {
            })
          });
        }
        commit('permissions', [])
        commit('REMOVE_OPTION_LIST', [])
        commit('REMOVE_TOKEN')
        commit('REMOVE_USERINFO')
        sessionStorage.clear()
      })
    }
  }
})

export default store
