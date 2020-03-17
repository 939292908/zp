/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime: 2019-09-19 10:52:19
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from './tools/request'
import VueJsonp from 'vue-jsonp'
import VueCookies from 'vue-cookies'
import echarts from 'echarts'
import {
  usingHelp
} from './tools/usingHelp'
import 'babel-polyfill'
import 'url-search-params-polyfill'
import {
  roleMixin
} from './components/mixins/emitter.js'
import './assets/css/theme.less'
import VueLazyload from 'vue-lazyload'
import Moment from 'moment'


Vue.use(VueLazyload);
Vue.use(VueJsonp)
Vue.use(iView)
Vue.use(VueCookies)
Vue.use(Vuex)
Vue.mixin(roleMixin)

Vue.config.productionTip = false
Vue.prototype.$onlinecount = ""
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$config = require('./configs/config' + process.env.ENV_CONFIG).config
Vue.prototype.usingHelp = usingHelp
Vue.prototype.$cookies = VueCookies
Vue.prototype.$Administration = "8659bd31dffb4f91e053b30f640aa13c"
Vue.prototype.$bus = new Vue()
Vue.prototype.$moment = Moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mixins: [roleMixin],
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
