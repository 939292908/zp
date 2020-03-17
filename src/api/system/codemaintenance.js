/*
 * @Author: your name
 * @Date: 2019-12-09 14:42:05
 * @LastEditTime: 2019-12-09 18:05:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\api\system\codemaintenance.js
 */
import {
  req
} from '../../tools/request'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const path = config.commonPath

//获取字典列表数据
export const POST_CODE_LIST_DATA = (parmas) => req('post', `${path}maindata/configdictionarymaintain/v1/list`, parmas);

//添加字典列表数据
export const POST_ADD_CODE_DATA = (parmas) => req('post', `${path}maindata/configdictionarymaintain/v1/config`, parmas);

//编辑字典列表数据
export const PATCH_EDIT_CODE_DATA = (parmas) => req('patch', `${path}maindata/configdictionarymaintain/v1/config`, parmas);
