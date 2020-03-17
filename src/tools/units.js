/**
 * 查询
 * @param {字段值} content
 * @param {查询值} query
 */
import * as comApis from "@/api/common.js";
import * as apis from "@/api/collection/index.js";

import {
  OPTIONS_LIST,
  CASE_CODE,
  CLUB_CODE
} from "@/api/config.js";
import {
  GET_ALL_PERSON_LABEL_LIST
} from "@/api/system/personLabel";

export function hasQuery(content, query) {
  if (query == '') {
    return true
  }
  content = content + ''
  if (content) {
    return content.toLowerCase().indexOf(query.toLowerCase()) > -1
  } else {
    return false
  }
}
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 获取页面中Modal的Z-Index的最大值,默认最小值是1000
export function getModalMaxIndex() {
  let doms = document.querySelectorAll('.v-transfer-dom')
  let tmpIndex = 0;
  for (var i = 0; i < doms.length; i++) {
    let zIndex = parseInt(doms[i].lastChild.style.zIndex)
    if (tmpIndex < zIndex) {
      tmpIndex = zIndex;
    }
  }
  return tmpIndex === 0 ? 1000 : tmpIndex;
}
// 创建菜单面板 // child：子菜单{ width: 345, height: 306, top: 0, left: 160}
export function createRMenu(id, data, pos, obj, child = {}) {
  // 创建前 先隐藏
  var selector = document.querySelector("#hydra");
  var panel = selector.querySelector(".panel");
  if (panel) panel.style.display = "none";

  var lis = [],
    box, ul;
  // 浏览器 宽高
  let windowW = document.body.offsetWidth;
  let windowH = document.body.offsetHeight;
  if (document.querySelector('#' + id)) {
    box = document.querySelector('#' + id)
    box.style.display = 'block';
    ul = box.querySelector('ul');
    ul.innerHTML = '';
  } else {
    box = document.createElement('div');
    box.id = id;
    ul = document.createElement('ul');
    box.appendChild(ul);
    document.querySelector('#hydra').appendChild(box)
  }
  // 计算 菜单位置
  let directionX = pos.x + 160 > windowW ? pos.x - 190 : pos.x;
  let directionY = pos.y + 34 * data.length + 100 > windowH ? pos.y - 34 * data.length + 30 : pos.y;
  // 设置
  box.style.left = directionX + 'px';
  box.style.top = directionY + 'px';

  for (var i = 0; i < data.length; i++) {
    lis[i] = document.createElement('li');
    lis[i].innerText = data[i].text;
    if (data[i].url) lis[i].setAttribute('url', data[i].url);
    lis[i].onclick = data[i].method;
    ul.appendChild(lis[i]);
    var childLis = [];
    // 创建子菜单
    if (data[i].children && data[i].children.length > 0) {
      var childUl = document.createElement('ul');
      childUl.setAttribute('class', 'child-items');
      // 子菜单 宽高位置
      let W = child.width || 345;
      let H = child.height || 306;
      let X = child.left || 160;
      let Y = child.top || 0;
      // 计算 子菜单方向
      let childDirectionX = pos.x + 160 + W > windowW ? 'right' : 'left';
      let childDirectionY = pos.y + 34 * data.length + H > windowH ? 'bottom' : 'top';
      // 设置
      childUl.style[childDirectionX] = X + 'px';
      childUl.style[childDirectionY] = Y + 'px';

      lis[i].appendChild(childUl)
      for (var j = 0; j < data[i].children.length; j++) {
        var items = data[i].children[j];
        childLis[j] = document.createElement('li')
        childLis[j].innerText = items.text;
        if (items.url) childLis[j].setAttribute('url', items.url);
        childLis[j].onclick = items.method;
        childUl.appendChild(childLis[j]);
      }
    }
  }
}

// 创建菜单Data  // setClicks、setOpt选填，可自定义设置对应的参数
export function setMenuData(me, setClicks, setOpt, isCanEdit = null, isCanEditRelation = null, isCanDelRelation = null) {
  // 1. 默认配置
  let opt = {
    isCanEdit: isCanEdit != null ? isCanEdit && me.isCanEdit : me.isCanEdit, // 是否可编辑
    isCanEditRelation: isCanEditRelation != null ? isCanEditRelation && me.isCanEditRelation : me.isCanEditRelation, // 关系是否可编辑
    isCanDelRelation: isCanDelRelation != null ? isCanDelRelation && me.isCanDelRelation : me.isCanDelRelation, // 关系是否可删除
    currentRightMenuNode: me.currentRightMenuNode, // 右击的node
    mapTypeOptions: me.mapTypeOptions // 可新建的图谱列表
  }
  // 2、默认click事件
  let clicks = {
    // 查看
    lookClick(event) {
      me.loadModal = true;
      me.isAddTwo = true;
      me.showDetailDrawer = true;
      me.showDetail = true;
      // 是图谱就不展示 "人员详情"
      if (me.currentRightMenuNode.nodeType == "QB_ZP_TP") {
        me.tabIndex = "t0";
        me.showPersonInfoTab = false;
      } else {
        me.tabIndex = "t1";
        me.showPersonInfoTab = true;
      }
      let d3Data = me.graph.getData();
      let nodes = d3Data.nodes.filter(x => x.data.nodeType == "QB_ZP_RY");
      if (
        nodes.length > 1 &&
        me.currentRightMenuNode.properties.SFZHM != me.coreIdNumber
      ) {
        me.isFirstworkObject = false;
      } else {
        me.isFirstworkObject = true;
      }
      // 判断是否是第一次创建的工作对象
      me.personIdNumber = me.currentRightMenuNode.properties.SFZHM;
      if (me.isFirstworkObject) {
        me.workObjectPersonIdNumber = "";
        me.relation = null;
      } else {
        me.workObjectPersonIdNumber =
          me.currentRightMenuNode.properties.SFZHM;
        let nodeTmp = me.graph.getNodeByParams(
          me.currentRightMenuNode.id,
          "id"
        );
        me.relation = {
          node: nodeTmp,
          type: "-1" //如果右键编辑节点，type设置为-1，这身份/称谓字段不能编辑
        };
      }
    },
    // 编辑
    editorClick() {
      me.showPersonInfoTab = false;
      me.handlePersonEditClick();
    },
    // 关系编辑
    editorRelationClick() {
      me.showPersonInfoTab = false;
      me.handleRelationEditClick(opt.currentRightMenuNode);
    },
    // 删除关系
    delRelationClick() {
      me.showPersonInfoTab = false;
      me.handleRelationDelClick(opt.currentRightMenuNode);
    },
    // 添加
    addClick() {
      event.preventDefault();
      event.stopPropagation();
    },
  }
  // 自定义设置
  if (setOpt) {
    setOpt.isCanEdit && (opt.isCanEdit = setOpt.isCanEdit);
    setOpt.isCanEditRelation && (opt.isCanEditRelation = setOpt.isCanEditRelation);
    setOpt.isCanDelRelation && (opt.isCanDelRelation = setOpt.isCanDelRelation);
    setOpt.currentRightMenuNode && (opt.currentRightMenuNode = setOpt.currentRightMenuNode);
    setOpt.mapTypeOptions && (opt.mapTypeOptions = setOpt.mapTypeOptions);
  }
  // 自定义设置
  if (setClicks) {
    setClicks.lookClick && (clicks.lookClick = setClicks.lookClick);
    setClicks.editorClick && (clicks.editorClick = setClicks.editorClick);
    setClicks.editorRelationClick && (clicks.editorRelationClick = setClicks.editorRelationClick);
    setClicks.delRelationClick && (clicks.delRelationClick = setClicks.delRelationClick);
    setClicks.addClick && (clicks.addClick = setClicks.addClick);
  }
  // 是否是 图谱节点
  let isMapNode = opt.currentRightMenuNode && opt.currentRightMenuNode.nodeType == "QB_ZP_TP";

  // 菜单列表
  var dataList = [];
  // 1 ---去除是否可以编辑的选项，opt.isCanEdit &&，“查看详细信息”总是显示---julie.wang 2019/12/16
  if (!isMapNode) {
    dataList.push({
      text: "查看详细信息",
      url: "",
      method: clicks.lookClick
    })
  }
  // 2
  if (opt.isCanEdit && !isMapNode) {
    dataList.push({
      text: "编辑",
      url: "",
      method: clicks.editorClick
    });
  }
  // 3
  if (opt.mapTypeOptions.length > 0 && opt.isCanEdit && !isMapNode) {
    let options = {
      text: "为此人新建图谱",
      url: "",
      method: clicks.addClick
    };
    let children = opt.mapTypeOptions.map(x => {
      return {
        text: x.displayName,
        url: x.id,
        method: function (event) {
          event.preventDefault();
          event.stopPropagation();
          let mapType = event.target.getAttribute("url");
          me.$Modal.confirm({
            title: "温馨提示",
            content: "您确定要离开当前页面吗?",
            onOk: () => {
              const {
                href
              } = me.$router.resolve({
                path: "/onlineCollect/addMap",
                query: {
                  mapType: mapType,
                  step: 0
                }
              });
              window.open(href, "_blank");
            }
          });
        }
      };
    });
    options.children = children;
    dataList.push(options);
  }
  // 4
  if (opt.isCanEditRelation && !isMapNode) {
    dataList.push({
      text: "编辑关系",
      url: "",
      method: clicks.editorRelationClick
    });
  }
  // 5
  if (opt.isCanDelRelation && !isMapNode) {
    dataList.push({
      text: "删除关系",
      url: "",
      method: clicks.delRelationClick
    });
  }
  return dataList;
}

// 转化树节点为一维数组
export function treeTransArray(tree, key = "children", data, treeProps = {
  children: 'children',
  title: 'title',
  id: "id"
}) {
  return tree.reduce((con, item) => {
    con.push(item);
    if (item[key] && item[key].length > 0) {
      item[key].forEach(x => {
        x.parent = {
          name: item[treeProps.title],
          id: item[treeProps.id]
        }
      })
      treeTransArray(item[key], key, data, treeProps);
    }
    return con;
  }, data);
}

// 获取选择树节点的路径
export function getTreeNodePathById(parentId, obj, data, treeProps = {
  children: 'children',
  title: 'title',
  id: "id"
}) {
  let parent = data.find(x => x[treeProps.id] == parentId);
  if (parent) {
    obj.title = parent[treeProps.title] + "/" + obj.title;
    obj.id = parent[treeProps.id] + "/" + obj.id;
    if (parent.parent) {
      getTreeNodePathById(parent.parent.id, obj, data, treeProps)
    }
  }
  return obj
}

// 获取选择树节点的路径deptPath
export function getTreeNodePathByCode(parentCode, obj, data, treeProps = {
  children: 'children',
  title: 'title',
  code: "code"
}) {
  let parent = data.find(x => x[treeProps.code] == parentCode);
  if (parent) {
    obj.code = parent[treeProps.code] + "/" + obj.code;
    if (parent.parentCode) {
      getTreeNodePathByCode(parent.parentCode, obj, data, treeProps)
    }
  }
  return obj
}

export function filterTreeMethod(filterText, data, result, treeProps = {
  children: 'children',
  title: 'title',
  id: "id"
}) {
  data.forEach(item => {
    // 如果该数组title字段匹配搜索字段，添加该数组，此时children为空
    var temp = {};
    if (item[treeProps.title].indexOf(filterText) !== -1) {
      temp = {
        expand: item.expand,
        id: item.id,
        deptId: item.deptId,
        leaves: item.leaves,
        nodeKey: item.nodeKey,
        title: item.title,
        children: []
      }
      temp.children = []
      result.push(temp);
    }
    // 如果该数组有子集，递归子集children
    if (item.children) {
      if (temp.children) {
        filterTreeMethod(filterText, item.children, temp.children, treeProps);
      } else {
        filterTreeMethod(filterText, item.children, result, treeProps);
      }
    }
  });
}


/**
 * 更新树的值信息
 * @param {data} data
 * @param {更新的值对象} obj
 */
export function updateTreeData(data, obj, nodeKey) {
  data.forEach(item => {
    let keys = Object.keys(obj)
    keys.forEach(key => {
      item[key] = obj[key];
    })
    // 如果该数组有子集，递归子集children
    if (item[nodeKey]) {
      updateTreeData(item[nodeKey], obj)
    }
  });
}
export function removeTreeData(data, obj, nodeKey) {
  data.forEach(item => {
    let keys = Object.keys(obj)
    keys.forEach(key => {
      delete item[key];
    })
    // 如果该数组有子集，递归子集children
    if (item[nodeKey]) {
      updateTreeData(item[nodeKey], obj)
    }
  });
}

/**
 * js正则实现用户输入银行卡号的控制及格式化
 * @param {银行卡号} bankNo
 */
export function formatBankNo(bankNo) {
  if (bankNo.value == "") return;
  var account = new String(bankNo.value);
  account = account.substring(0, 22); /*帐号的总数, 包括空格在内 */
  if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
    /* 对照格式 */
    if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
      var accountNumeric = accountChar = "",
        i;
      for (i = 0; i < account.length; i++) {
        accountChar = account.substr(i, 1);
        if (!isNaN(accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
      }
      account = "";
      for (i = 0; i < accountNumeric.length; i++) {
        /* 可将以下空格改为-,效果也不错 */
        if (i == 4) account = account + " "; /* 帐号第四位数后加空格 */
        if (i == 8) account = account + " "; /* 帐号第八位数后加空格 */
        if (i == 12) account = account + " "; /* 帐号第十二位后数后加空格 */
        account = account + accountNumeric.substr(i, 1)
      }
    }
  } else {
    account = " " + account.substring(1, 5) + " " + account.substring(6, 10) + " " + account.substring(14, 18) + "-" + account.substring(18, 25);
  }
  if (account != bankNo.value) bankNo.value = account;
}
/**
 * JS 获取GUID
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 取消除当前请求外的所有请求
 */
export function removeAllCancelToken() {
  let cancelArr = window.axiosCancel;
  cancelArr.forEach((ele, index) => {
    ele.cancel("取消了请求") // 在失败函数中返回这里自定义的错误信息
    delete window.axiosCancel[index]
  })
}

/**
 * 根据接口请求地址取消promise请求
 * @param {url} url
 */
export function removeCancelTokenByUrl(url) {
  let cancelArr = window.axiosCancel;
  cancelArr.forEach((ele, index) => {
    if (ele.url == url) {
      ele.cancel("取消了请求") // 在失败函数中返回这里自定义的错误信息
      delete window.axiosCancel[index]
    }
  })
}

// 获取树形结构的数据
export function getTreeData(data, apiKey, OPTIONS_LIST, treeProps = {
  children: 'children',
  title: 'title',
  id: "id"
}, callback) {
  if (Array.isArray(data)) {
    data = data;
  } else {
    data = [data];
  }
  if (apiKey == OPTIONS_LIST.CITY_AREA_TREE || apiKey == OPTIONS_LIST.CURRENT_TOKEN_DEPT_TREE) {
    if (data[0]) {
      if (!data[0].title)
        data[0].title = data[0][treeProps.title] || "";
      delete data[0][treeProps.title]
      if (!data[0].children) {
        data[0].children = data[0][treeProps.children] || [];
        delete data[0][treeProps.children]
      }
      if (!data[0].expand) data[0].expand = true;
    }
    parseTreeData(data[0].children, treeProps);
  }
  var deptArrayList = [];
  treeTransArray(
    data,
    'children',
    deptArrayList
  );
  var deptList = JSON.parse(JSON.stringify(data));
  var result = {
    treeData: deptList,
    treeArrayData: deptArrayList
  }
  if (callback) {
    callback(result)
  } else {
    return {
      treeData: deptList,
      treeArrayData: deptArrayList
    }
  }
}

export function parseTreeData(data, treeProps = {
  children: 'children',
  title: 'title',
  id: "id"
}) {
  data.forEach(x => {
    if (x.hasOwnProperty(treeProps.title)) {
      let title = x[treeProps.title] || "";
      delete x[treeProps.title];
      x.title = title;
    }
    if (x.hasOwnProperty(treeProps.children)) {
      let children = x[treeProps.children] || [];
      delete x[treeProps.children];
      x.children = children;
    }
    if (!x.hasOwnProperty('expand')) {
      x.expand = false
    }
    if (x.children.length > 0) {
      parseTreeData(x.children, treeProps);
    }
  });
}

export function getNodePathById(deptArrayList, parentId, obj, format = '/', treeProps = {
  children: 'children',
  title: 'title',
  id: "id"
}) {
  let parent = deptArrayList.find(
    x => x[treeProps.id] == parentId
  );
  if (parent) {
    obj.title = parent[treeProps.title] + format + obj.title;
    obj.id = parent[treeProps.id] + format + obj.id;
    if (parent.parent) {
      getNodePathById(deptArrayList, parent.parent.id, obj, format, treeProps);
    }
  }
  return obj;
}

// 下载文件blob转成excel
export function getExcelByBlob(blobObj, excelName='表格') {
  if (blobObj.size > 0) {
    const saveLink = document.createElement('a');
    if ('download' in saveLink) {
      saveLink.download = excelName;
      saveLink.style.display = 'none';
      document.body.appendChild(saveLink);
      try {
        const blob = blobObj;
        const url = URL.createObjectURL(blob);
        saveLink.href = url;
        saveLink.onclick = () => requestAnimationFrame(() => URL.revokeObjectURL(url));
      } catch (e) {
        console.warn('This browser does not support object URLs. Falling back to string URL.');
        saveLink.href = blobObj;
      }
      saveLink.click();
      document.body.removeChild(saveLink);
    }
  }
}

// 下载excel图谱 根据 mapId
export function getExcelByMapId(mapId, excelName) {
  return new Promise((resolve,reject) => {
    apis.GET_MAP_EXCEL_BY_MAPID(mapId).then(res => {
      if (res.type == "application/json") { // 结果报错
        resolve()
        let reader = new FileReader();
        reader.readAsText(res, "utf-8");
        reader.onload = e => {
          let msg = JSON.parse(reader.result).msg;
          this.$Message.error(msg);
        };
      } else { // 结果正常
        reject()
        let suffix = '.xlsx'
        let tiem = new Date().toLocaleDateString(); 
        excelName = `${excelName}-${tiem}-${Math.ceil(Math.random() * 1000000000)}${suffix}`;
        getExcelByBlob(res, excelName); // 响应结果乱码，设置blob请求头，接收；下面再把blob转一下
      }
    });
  })
}

// 传参
export function transferParameters(me, path, params, data = null, key = 'query') {
  let query = Math.random().toString(36).slice(-8);
  sessionStorage.setItem(query, params);
  if (data) {
    data[key] = query
  } else {
    data = {}
    data[key] = query
  }
  const {
    href
  } = me.$router.resolve({
    path: path,
    query: data
  });
  window.open(href, "_blank");
  // var data = sessionStorage.getItem('key');
  // sessionStorage.removeItem('key');
}

// =============== 采集的方法提取 ===============

// 地址：用codeArr获取子集地址  填充到proviceAddressList省列表
export function setAddressByCodeArr(tmpArr, proviceAddressList) {
  if (!tmpArr.some(item => item) || tmpArr.some((item, index) => !item && tmpArr.some((ele, i) => i > index && ele))) return; // 没有code 或 出现断层 return
  // 1、城市code
  let oneCode = tmpArr[0]; // 省code
  let twoCode = tmpArr[1]; // 市code
  let threeCode = tmpArr[2]; // 区code
  let fourCode = tmpArr[3]; // 镇code
  // 2、请求 Promise.all
  let apiArr = [
    comApis.GET_AREA_TREE_BY_CODE(oneCode),
    comApis.GET_AREA_TREE_BY_CODE(twoCode),
    comApis.GET_AREA_TREE_BY_CODE(threeCode),
    comApis.GET_AREA_TREE_BY_CODE(fourCode)
  ];
  return Promise.all(apiArr).then(res => {
    // 3、构建结果
    let buildCityData = function (data) {
      let newData = {
        id: data.id,
        code: data.code,
        value: data.code,
        name: data.name,
        label: data.displayName,
        parentId: data.parentId,
        parentCode: data.parentCode,
        longitude: data.longitude,
        latitude: data.latitude
      };
      if (data.expanded == true) {
        newData.loading = false;
        newData.children = [];
      }
      return newData;
    }
    // 4、字典项结果
    let proviceChildren = res[0].data.childAreaList ? res[0].data.childAreaList.map(x => buildCityData(x)) : []; //省 子集
    let cityChildren = res[1].data.childAreaList ? res[1].data.childAreaList.map(x => buildCityData(x)) : []; //市 子集
    let countyChildren = res[2].data.childAreaList ? res[2].data.childAreaList.map(x => buildCityData(x)) : []; //区 子集
    let townChildren = res[3].data.childAreaList ? res[3].data.childAreaList.map(x => buildCityData(x)) : []; //镇 子集
    // 5、填充到表单
    proviceAddressList.forEach(oneItem => {
      // 对应省 子集
      if (oneItem.code == oneCode) {
        if (!oneItem.children || !oneItem.children.length) oneItem.children = proviceChildren;
        oneItem.children.forEach(twoItem => {
          // 对应市 子集
          if (twoItem.code == twoCode) {
            if (!twoItem.children || !twoItem.children.length) twoItem.children = cityChildren;
            twoItem.children.forEach(threeItem => {
              // 对应区 子集
              if (threeItem.code == threeCode) {
                if (!threeItem.children || !threeItem.length) threeItem.children = countyChildren;
                threeItem.children.forEach(fourItem => {
                  // 对应镇 子集
                  if (fourItem.code == fourCode) {
                    if (!fourItem.children || !fourItem.length) fourItem.children = townChildren;
                  }
                });
              }
            });
          }
        });
      }
    });
    console.log("this.optionList.proviceAddressList", proviceAddressList);
  });
}
// 填充阿克苏地区选中列表
export function setAksCityAddressByCodeArr(tmpArr, cityAddressList) {
  let oneCode = tmpArr[0]; // 地区code
  let apiArr = [
    comApis.GET_AREA_TREE_BY_CODE(oneCode)
  ];
  return Promise.all(apiArr).then(res => {
    // 3、构建结果
    let buildCityData = function (data) {
      let newData = {
        id: data.id,
        code: data.code,
        value: data.code,
        name: data.name,
        label: data.displayName,
        parentId: data.parentId,
        parentCode: data.parentCode,
        longitude: data.longitude,
        latitude: data.latitude
      };
      // if (data.expanded == true) {
      //   newData.loading = false;
      //   newData.children = [];
      // }
      return newData;
    }
    // 4、字典项结果
    let countyChildren = res[0].data ? res[0].data.childAreaList.map(x => buildCityData(x)) : []; //区 子集
    cityAddressList.forEach(oneItem => {
      // 对应区 子集
      if (oneItem.code == oneCode) {
        oneItem.children = countyChildren;
      }
    });
  });
}
// 人员状态：用一级value获取对应子集 并填充
export function setPersonStateChildByValue(codeArr, peopleStateList) {
  let value = codeArr[0];
  return comApis.GET_PERSON_STATE_SMALL_LIST(value).then(res => {
    res.data.forEach(x => x.label = x.displayName);
    peopleStateList.forEach(item => {
      if (item.value == value) item.children = res.data;
    });
  });
}
// 加载下一级'人员状态'列表 级联选择器
export function loadPersonStateData(item, callback) {
  let me = this;
  item.loading = true;
  comApis.GET_PERSON_STATE_SMALL_LIST(item.id).then(res => {
    res.data.forEach(x => {
      x.label = x.displayName;
    });
    item.children = res.data;
    item.loading = false;
    callback();
  });
}

// 加载下一级'户籍地址'列表 级联选择器
export function loadAddressData(item, callback) {
  if (item) {
    item.loading = true;
    return comApis.GET_AREA_TREE_BY_CODE(item.code).then(res => {
      if (res.code == 200) {
        if (res.data.childAreaList) {
          let arr = res.data.childAreaList.map(x => {
            let obj = {
              id: x.id,
              code: x.code,
              value: x.code,
              name: x.name,
              label: x.displayName,
              parentId: x.parentId,
              parentCode: x.parentCode,
              longitude: x.longitude,
              latitude: x.latitude
            };
            if (x.expanded == true) {
              obj.loading = false;
              obj.children = [];
            }
            return obj;
          });
          item.children = arr;
        } else {
          item.children = [];
        }
      }
      item.loading = false;
      callback();
    });
  }
}

// 加载阿克苏地区下的城市，乡镇，不包括村
export function loadAksCityAddressData(item, callback) {
  if (item) {
    item.loading = true;
    return comApis.GET_AREA_TREE_BY_CODE(item.code).then(res => {
      if (res.code == 200) {
        if (res.data.childAreaList) {
          let arr = res.data.childAreaList.map(x => {
            let obj = {
              id: x.id,
              code: x.code,
              value: x.code,
              name: x.name,
              label: x.displayName,
              parentId: x.parentId,
              parentCode: x.parentCode,
              longitude: x.longitude,
              latitude: x.latitude
            };
            // if (x.expanded == true) {
            //   obj.loading = false;
            //   obj.children = [];
            // }
            return obj;
          });
          item.children = arr;
        } else {
          item.children = [];
        }
      }
      item.loading = false;
      callback();
    });
  }
}

// 上传用户头像
export function uploadUserPic(opt) {
  // 参数
  let event = opt.event; // 1. event: 事件对象
  let me = opt.me; // 2. me: this
  let refInput = opt.refInput; // 3. refInput: 绑定的input表单
  let fileName = opt.fileName; // 4. fileName: 文件起名
  let apiFn = opt.apiFn; // 5. apiFn: 上传接口
  let getLocalImgSrc = opt.getLocalImgSrc; // 6. getLocalImgSrc: 获取图片本地地址
  // 上传文件之前
  let beforeUpload = function (file, me, refInput) {
    // 验证文件类型和大小
    let fileName = file.name;
    let fileType = fileName.substr(fileName.lastIndexOf("."));
    let fileTypes = [".png", ".jpg", ".jpeg"];
    // if (!(fileType == me.$config.imgType)) {
    if (fileTypes.indexOf(fileType.toLowerCase()) == -1) {
      refInput.value = null;
      me.$Message.warning(
        "仅支持 " + fileTypes.join(";") + " 格式的图片文件"
      );
      // me.$Message.warning(
      //   "仅支持 " + me.$config.imgType + " 格式的图片文件"
      // );
      return false;
    }
    let fileSize = file.size;
    if (fileSize > 20 * 1024 * 1024) {
      refInput.value = null;
      me.$Message.warning("图片文件的大小最大不能超过20MB");
      return false;
    }
    return true;
  }
  // 正式上传
  let postPic = function (refInput, fileName) {
    let params = {
      fileName: fileName
    };
    let data = new FormData();
    data.append("files", refInput.files[0]);
    return apiFn(params, data);
  }

  var filePath = event.target.files[0];
  // 1、校验
  if (!beforeUpload(filePath, me, refInput)) return new Promise(reject => reject());
  var fr = new FileReader();
  // 2、预览本地文件
  fr.onload = () => getLocalImgSrc && getLocalImgSrc(fr.result);
  fr.readAsDataURL(filePath);
  // 3、上传
  return new Promise(resolve => postPic(refInput, fileName).then(res => resolve(res)));
}

// '无证人员添加' 自定义校验必填项
export function noIdNumberValidatePass(rule, value, callback, isNoIdNumberAdd) {
  if (!(value && value.toString().length) && !isNoIdNumberAdd) {
    callback(new Error('不能为空'));
  } else {
    callback();
  }
}

// 根据身份证 获取性别
export function getGenderByIdNumber(idNumber) {
  let gender = ""; // 0 : 男 / 1 : 女
  if (idNumber.length == 15) {
    gender = idNumber.substr(idNumber.length - 1, 1) % 2 == 0 ? "1" : "0";
  }
  if (idNumber.length == 18) {
    gender = idNumber.substr(idNumber.length - 2, 1) % 2 == 0 ? "1" : "0";
  }
  return gender;
}

// 根据身份证 判断'是否是无证人员'
export function isNoIdNumberPeopleByIdNumber(idNumber) {
  var reg = /^(WZ|Y|0000)/;
  return reg.test(idNumber);
}
// ========== 字典项方法 ==========
// 身份关系 字典项
export function getDisplayList(mapType) {
  let arr = [comApis.GET_MAP_RELATIONS(mapType)];
  return Promise.all(arr);
}

// 性别 字典项
export function getGenderList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.GENDER,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.GENDER
    })
}

// 民族 字典项
export function getNationalityList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.NATIONALITY,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.NATIONALITY
    })
}

// 标签 字典项
export function getPersonTagList(me) {
  let buildData = function (data) {
    let newData = [];
    data.forEach(item => {
      var newItem = {
        dictOrder: item.tagOrder,
        displayName: item.tagName,
        value: item.tagId,
      }
      newData.push(newItem);
    })
    return newData;
  }
  // 老接口
  // return me.$store.dispatch(
  //   "getOptionsByKey", {
  //     key: OPTIONS_LIST.PERSON_TAG,
  //     apiFun: comApis.GET_OPTIONS_LIST,
  //     params: OPTIONS_LIST.PERSON_TAG
  //   })
  // 新接口
  return GET_ALL_PERSON_LABEL_LIST().then(res => new Promise((resolve, reject) => res.code == 200 ? resolve(buildData(res.data)) : reject()));
}

// 人员状态（大类） 字典项
export function getPersonStateList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.STATE_STRONG,
      apiFun: comApis.GET_PERSON_STATE_BIG_LIST,
      params: OPTIONS_LIST.STATE_STRONG
    })
}

// 人员状态 所有列表（大类 + 细类） 字典项
export function getPersonStateAllList() {
  return comApis.GET_PERSON_STATE_ALL_LIST('STATE_STRONG')
}

// 五位一体 字典项
export function getFiveOneList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.FIVE_ONE_PROPERTY,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.FIVE_ONE_PROPERTY
    })
}

// 政治面貌 字典项
export function getPoliticsStatusList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.POLITICS_STATUS,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.POLITICS_STATUS
    })
}

// 职业 字典项
export function getProfessionList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.PROFESSION,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.PROFESSION
    })
}

// 获取省的数据 字典项
export function getProviceAddressList(me) {
  return me.$store.dispatch("getOptionsByKey", {
    key: OPTIONS_LIST.BELONG_PROVICE,
    apiFun: comApis.GET_AREA_TREE_BY_CODE,
    validParams: true,
    params: "Root"
  })
}

// 案
// 案件处理结果 字典项
export function getCaseResultList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.CASE_PROCESS_RESULT,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.CASE_PROCESS_RESULT
    })
}

// 暴
// 是否是境外涉恐涉暴人员 字典项
export function getIsOverseasPersonList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.OVERSEAS_SKSB_PERSON,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.OVERSEAS_SKSB_PERSON
    })
}

// 边控情况 字典项
export function getSideControlList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.BKQK,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.BKQK
    })
}

// 追逃情况 字典项
export function getPursuitList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.ZTQK,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.ZTQK
    })
}

// 出境方法 字典项
export function getOutboundWayList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.EXIT_MEASURES,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.EXIT_MEASURES
    })
}

// 人员类别 字典项
export function getPersonTypeList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.EXIT_PERSON_CATEGORY,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.EXIT_PERSON_CATEGORY
    })
}

// 境外现状 字典项
export function getOverseasStatusList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.EXIT_PRESENT,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.EXIT_PRESENT
    })
}

// 目前所在国家 字典项
export function getCurrentCountryList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.OUTBOUND_TO_COUNTRY,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.OUTBOUND_TO_COUNTRY
    })
}
// 境(关系)
// 出国证件种类 字典项
export function getCertificateList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.OUTBOUND_CERTIFICATE_TYPE,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.OUTBOUND_CERTIFICATE_TYPE
    })
}

// 是否注销中国国籍 字典项
export function getChineseNationalityList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.OUTBOUND_IS_CANCEL,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.OUTBOUND_IS_CANCEL
    })
}

// 村两委职位 字典项
export function getPartyPositionList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.PARTY_POSITION,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.PARTY_POSITION
    })
}

// 清真寺职位 字典项
export function getMosquePositionList(me) {
  return me.$store.dispatch(
    "getOptionsByKey", {
      key: OPTIONS_LIST.MOSQUE_POSITION,
      apiFun: comApis.GET_OPTIONS_LIST,
      params: OPTIONS_LIST.MOSQUE_POSITION
    })
}
// -----------------------------

// 移除数组中对应项
export function removeByValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]).indexOf(JSON.stringify(val)) != -1) {
      arr.splice(i, 1);
      break;
    }
  }
}

// // 合并两个数组并去重
// export function uniqueArr(arrs, key) {
//   if (arrs.length <= 1) {
//     return arrs
//   }
//   for (let i = 1; i < arrs.length; i++) {
//     arrs[0] = arrs[0].concat(i)
//     var obj = {};
//     arrs[0].reduce((item, next) => {
//       obj[next[key]] ? "" : (obj[next[key]] = true && item.push(next));
//       return item;
//     }, []);
//   }
//   return arrs[0]
// }
export function uniqueArr(arr1, arr2, key) {
  arr1 = arr1.concat(arr2);
  var obj = {};
  return arr1.reduce((item, next) => {
    obj[next[key]] ? "" : (obj[next[key]] = true && item.push(next));
    return item;
  }, []);
}
// 数组求和
export function sum(arr) {
  if (arr && arr.length) {
    return arr.reduce(function (prev, curr, idx, arr) {
      return prev + curr;
    });
  } else {
    return 0;
  }
}

// 人员卡片关联图谱列表点击事件
export function topTagClickFn(data, mc, me) {
  if (!data) {
    return;
  }
  if (!data.dataRight) {
    return;
  }
  if (data.typeId == "8") {
    const {
      href
    } = me.$router.resolve({
      path: "/exitAndEntry",
      query: {
        areaCode: data.villageCode,
        collectId: data.collectId,
        sfzhm: data.sfzhm,
        state: 1
      }
    });
    window.open(href, "_blank");
  } else if (data.typeId == "9") {
    const {
      href
    } = me.$router.resolve({
      path: "/underAttack",
      query: {
        areaCode: data.villageCode,
        collectId: data.collectId,
        sfzhm: data.sfzhm,
        state: 1
      }
    });
    window.open(href, "_blank");
  } else {
    var tpid = data.tpid.replace("#", "i").replace(":", "_"); //如果要跳转的图谱跟当前图谱一致，禁止点击
    if (
      !data ||
      tpid == data.parentTpid ||
      data.mapId == data.parentTpid
    ) {
      return;
    }
    const {
      href
    } = me.$router.resolve({
      name: "ArchivesJoin",
      query: {
        tpids: data.tpid,
        sfzhm: data.sfzhm,
        mc: mc,
        pageName: ""
      }
    });
    window.open(href, "_blank");
  }
}
// 案件线索点击事件
export function caseClueFn(data, me) {
  if (data.name == CASE_CODE || data.name == CLUB_CODE) {
    const {
      href
    } = me.$router.resolve({
      path: "/caseClubList",
      query: {
        sfzhm: data.sfzhm
      }
    });
    window.open(href, "_blank");
  }
}
