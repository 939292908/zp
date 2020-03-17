import { getAxios,postData,patchAxios,postJSON,deleteAxios,postForm,postFile, postAxios } from '../../tools/request'
import Vue from 'vue'
import store from '@/store'
import { getToken } from '../../tools/authToken'
const $config = require('../../configs/config' + process.env.ENV_CONFIG).config
const _params = {
    token: getToken()
}

// 获取图形展示的数据
export function getCommonPersonForce(data){
  return postJSON($config.joinPath + `/areamapseriesparallelresource/v1/dept/common/person`,data)
}

// 获取共同人的对应单位图谱
export function getCommonPersonMapList(data,params){
  return postJSON($config.joinPath + `/areamapseriesparallelresource/v1/dept/commonperson/map`,data,params)
}