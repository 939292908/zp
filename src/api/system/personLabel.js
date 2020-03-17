/*
 * @Author: your name
 * @Date: 2019-12-09 14:42:05
 * @LastEditTime: 2019-12-09 14:46:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\api\system\codemaintenance.js
 */
import { req } from '../../tools/request'
const config = require('../../configs/config' + process.env.ENV_CONFIG).config
const path = config.commonPath

//获取人员标签列表数据
export const GET_PERSON_LABEL_LIST = (data) => req('post',`${path}/maindata/persontagmaintain/v1/list`,data);

//新增人员标签
export const ADD_PERSON_LABE = (data) => req('post',`${path}/maindata/persontagmaintain/v1/tag`,data);

//编辑人员标签
export const EDITOR_PERSON_LABE = (data) => req('patch',`${path}/maindata/persontagmaintain/v1/tag`,data);

//获取所有人员标签（字典项）
export const GET_ALL_PERSON_LABEL_LIST = () => req('get',`${path}/maindata/persontagmaintain/v1/alldata`);
