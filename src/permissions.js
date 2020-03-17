import {constantPageMap} from './router/config'
import {getPageRoles,getPageFunById} from './api/system/userManager'
import Vue from 'vue'
/**
 * 获取权限列表
 */
export function permissionList() {
  var promise = new Promise((resolve,reject) =>{
    let urls = [getPageRoles(),
                getPageFunById(constantPageMap.PAGE_Common_ID)]
    Promise.all(urls).then(res=>{
      if(res[0].code != 200 || res[1].code != 200) {
        reject(res)
      } else {
        resolve(res)
      } 
    }).catch(res=>{
      reject(res)
    })
  })  
  return promise;
}

/**
 * 当前页面是否有权限
 * @param {当前路由} to 
 * @param {路由数组} constantRouterMap 
 */
export function hasPermission(to, constantRouterMap) {
  if(!to.meta.id || !to.meta.requiresAuth) return true;
  return to.meta.hasAuth;
  // return constantRouterMap.some(role => to.meta.id == role.meta.id && role.meta.requiresAuth && to.meta.hasAuth)
}
/**
 * 当前页面对应的功能权限
 * @param {页面对应的Code} pageId 
 */
export function getPagePermissions(pageId) {
  var promise = new Promise((resolve,reject) =>{
    getPageFunById(pageId).then(res=>{
      if(res.code != 200 ) {
        reject(res)
      } else {
        resolve(res)
      }      
    }).catch(res=>{
      reject(res)
    })
  })  
  return promise;
}

/**
 * 设置页面权限
 * @param {路由数据} routerdata 
 * @param {有权限的数据} pageData 
 * @param {公用功能点的数据} funsData 
 */
export function setPagePermissions(routerdata,pageData,funsData,isApplyFun = false,route = null,pageId = ""){
  routerdata.forEach(x => {
    x.meta.hasAuth = false;
    let pageRoles = pageData.data;
    let pageRole = pageRoles.find(c => {
      return c.pageId == x.meta.id
    })
    if (pageRole) {
      x.meta.hasAuth = true      
    }
    if(isApplyFun) {
      if(x.meta.id == pageId) {
        let c = route.meta.functions.concat(funsData.data)
        x.meta.functions = c
      } 
    } else {
      x.meta.functions = funsData.data
    }    
    if(x.children && x.children.length) {
      setPagePermissions(x.children,pageData,funsData,isApplyFun,route,pageId)
    }
  })
  return routerdata;
}

// 根据页面ID获取数据
export function getPagesById(routes,pageId,pages) {
  return routes.reduce((list,item)=>{
    if(item.meta.id == pageId) {
      list.push(item)
    }
    if(item.children && item.children.length) {
      getPagesById(item.children,pageId,pages)
    }
    return list;
  },pages)
}