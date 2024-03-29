import { getAxios,putAxios,patchAxios,postJSON,deleteAxios,postForm } from '../../../tools/request'
import {constantFunMap} from '../../../router/config'
import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
Vue.use(Router)
const config = require('../../../configs/config' + process.env.ENV_CONFIG).config
const joinPath = config.joinPath;

 // 配置
let opt = {
  showSelfDisciple: true, // show亲传弟子
  showChieftain: true, // show头面人物
};

// 获取主人员数据(第一层)
export function getData(params){
  return postJSON(joinPath + `/InheritanceSystemResource/v1/InheritanceSystem/mainperson`,params)
}
// 获取地区所有人员数据（第二层）
export function getDataArea(params){
  //return postJSON(joinPath + `/InheritanceSystemResource/v1/InheritanceSystem/person/area`,params)
  return postJSON(joinPath + `/InheritanceSystemResource/v1/InheritanceSystem/disciple/area`,params)
}

import * as d3 from 'd3'
import Util from '../base/util.js'
class OrgChart {
  constructor() {
    this.d3 = d3,
    this.systemId = '',
    this.allData = [],
    this.init()
    // this.path = this.$config.joinPath,
  }

  init() {
    this.initVariables()
    this.initCanvas()
    this.initVirtualNode()
    this.setCanvasListener()
  }

  initVariables() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.padding = 20
    // tree node size
    this.nodeWidth = 180
    this.nodeHeight = 280
    // org unit size
    this.unitPadding = 20
    this.unitWidth = 140
    this.unitHeight = 120
    // animation duration
    this.duration = 600
    this.scale = 1.0
  }
  getId(id){
    this.systemId = id;
  }
  draw(data, option) {
    opt = Object.assign(opt, option);
    // console.log(opt);
    this.data = this.d3.hierarchy(data)
    this.treeGenerator = this.d3
      .tree()
      .nodeSize([this.nodeWidth, this.nodeHeight])
    this.update()

    let self = this
    this.d3.timer(function() {
      self.drawCanvas()
    })
    this.treeData = this.treeGenerator(this.data)
    let nodes = this.treeData.descendants()
    nodes.forEach((item)=>{
      if(item.depth > 0 ){
        self.toggleTreeNode(item);
      }
    })
    self.update(nodes)
  }

  update(targetTreeNode) {
    this.treeData = this.treeGenerator(this.data)
    let nodes = this.treeData.descendants()
    let links = this.treeData.links()

    let animatedStartX = 0
    let animatedStartY = 0
    let animatedEndX = 0
    let animatedEndY = 0
    if (targetTreeNode) {
      animatedStartX = targetTreeNode.x0
      animatedStartY = targetTreeNode.y0
      animatedEndX = targetTreeNode.x
      animatedEndY = targetTreeNode.y
    }

    this.updateOrgUnits(
      nodes,
      animatedStartX,
      animatedStartY,
      animatedEndX,
      animatedEndY
    )
    this.updateLinks(
      links,
      animatedStartX,
      animatedStartY,
      animatedEndX,
      animatedEndY
    )

    this.addColorKey()
    this.bindNodeToTreeData()
  }

  updateOrgUnits(
    nodes,
    animatedStartX,
    animatedStartY,
    animatedEndX,
    animatedEndY
  ) {
    let orgUnitSelection = this.virtualContainerNode
      .selectAll('.orgUnit')
      .data(nodes, d => d['colorKey'])

    orgUnitSelection
      .attr('class', 'orgUnit')
      .attr('x', function(data) {
        return data.x0
      })
      .attr('y', function(data) {
        return data.y0
      })
      .transition()
      .duration(this.duration)
      .attr('x', function(data) {
        return data.x
      })
      .attr('y', function(data) {
        return data.y+50
      })
      .attr('fillStyle', '#ff0000')

    orgUnitSelection
      .enter()
      .append('orgUnit')
      .attr('class', 'orgUnit')
      .attr('x', animatedStartX)
      .attr('y', animatedStartY)
      .transition()
      .duration(this.duration)
      .attr('x', function(data) {
        return data.x
      })
      .attr('y', function(data) {
        return data.y
      })
      .attr('fillStyle', '#ff0000')

    orgUnitSelection
      .exit()
      .transition()
      .duration(this.duration)
      .attr('x', animatedEndX)
      .attr('y', animatedEndY)
      .remove()

    // record origin index for animation
    nodes.forEach(treeNode => {
      treeNode['x0'] = treeNode.x
      treeNode['y0'] = treeNode.y
    })

    orgUnitSelection = null
  }

  updateLinks(
    links,
    animatedStartX,
    animatedStartY,
    animatedEndX,
    animatedEndY
  ) {
    let linkSelection = this.virtualContainerNode
      .selectAll('.link')
      .data(links, function(d) {
        return d.source['colorKey'] + ':' + d.target['colorKey']
      })

    linkSelection
      .attr('class', 'link')
      .attr('sourceX', function(linkData) {
        return linkData.source['x00']
      })
      .attr('sourceY', function(linkData) {
        return linkData.source['y00']
      })
      .attr('targetX', function(linkData) {
        return linkData.target['x00']
      })
      .attr('targetY', function(linkData) {
        return linkData.target['y00']
      })
      .transition()
      .duration(this.duration)
      .attr('sourceX', function(linkData) {
        return linkData.source.x
      })
      .attr('sourceY', function(linkData) {
        return linkData.source.y
      })
      .attr('targetX', function(linkData) {
        return linkData.target.x
      })
      .attr('targetY', function(linkData) {
        return linkData.target.y
      })

    linkSelection
      .enter()
      .append('link')
      .attr('class', 'link')
      .attr('sourceX', animatedStartX)
      .attr('sourceY', animatedStartY)
      .attr('targetX', animatedStartX)
      .attr('targetY', animatedStartY)
      .transition()
      .duration(this.duration)
      .attr('sourceX', function(link) {
        return link.source.x
      })
      .attr('sourceY', function(link) {
        return link.source.y
      })
      .attr('targetX', function(link) {
        return link.target.x
      })
      .attr('targetY', function(link) {
        return link.target.y
      })

    linkSelection
      .exit()
      .transition()
      .duration(this.duration)
      .attr('sourceX', animatedEndX)
      .attr('sourceY', animatedEndY)
      .attr('targetX', animatedEndX)
      .attr('targetY', animatedEndY)
      .remove()

    // record origin data for animation
    links.forEach(treeNode => {
      treeNode.source['x00'] = treeNode.source.x
      treeNode.source['y00'] = treeNode.source.y
      treeNode.target['x00'] = treeNode.target.x
      treeNode.target['y00'] = treeNode.target.y
    })
    linkSelection = null
  }

  initCanvas() {
    this.container = this.d3.select('#org-chart-container')
    this.canvasNode = this.container
      .append('canvas')
      .attr('class', 'orgChart')
      .attr('width', this.width)
      .attr('height', this.height)
    this.hiddenCanvasNode = this.container
      .append('canvas')
      .attr('class', 'orgChart')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('display', 'none')
    this.context = this.canvasNode.node().getContext('2d')
    this.context.translate(this.width / 2, this.padding)
    this.hiddenContext = this.hiddenCanvasNode.node().getContext('2d')
    this.hiddenContext.translate(this.width / 2, this.padding)
  }

  initVirtualNode() {
    let virtualContainer = document.createElement('root')
    this.virtualContainerNode = this.d3.select(virtualContainer)
    this.colorNodeMap = {}
  }

  addColorKey() {
    // give each node a unique color
    let self = this
    this.virtualContainerNode.selectAll('.orgUnit').each(function() {
      let node = self.d3.select(this)
      let newColor = Util.randomColor()
      while (self.colorNodeMap[newColor]) {
        newColor = Util.randomColor()
      }
      node.attr('colorKey', newColor)
      node.data()[0]['colorKey'] = newColor
      self.colorNodeMap[newColor] = node
    })
  }

  bindNodeToTreeData() {
    // give each node a unique color
    let self = this
    this.virtualContainerNode.selectAll('.orgUnit').each(function() {
      let node = self.d3.select(this)
      let data = node.data()[0]
      data['node'] = node
    })
  }

  drawCanvas() {
    this.drawShowCanvas()
    this.drawHiddenCanvas()
  }

  drawShowCanvas() {
    this.context.clearRect(-50000, -10000, 100000, 100000)

    let self = this
    // draw links
    this.virtualContainerNode.selectAll('.link').each(function() {
      let node = self.d3.select(this)
      let linkPath = self.d3
        .linkVertical()
        .x(function(d) {
          return d.x
        })
        .y(function(d) {
          return d.y
        })
        .source(function() {
          return { x: node.attr('sourceX'), y: node.attr('sourceY') }
        })
        .target(function() {
          return { x: node.attr('targetX'), y: node.attr('targetY') }
        })
      let path = new Path2D(linkPath())
      self.context.stroke(path)
    })

    this.virtualContainerNode.selectAll('.orgUnit').each(function() {
      let node = self.d3.select(this)
      let treeNode = node.data()[0]
      let data = treeNode.data
      //console.log(data.properties.areaName,350350);
      
      self.context.fillStyle = '#009aed'  //实体背景色
      if(data.properties.areaName == '疆内' || data.properties.areaName == '疆外'){
        self.context.fillStyle = '#df005c'
      }
      let indexX = Number(node.attr('x')) - self.unitWidth / 2
      let indexY = Number(node.attr('y')) - self.unitHeight / 2

      // draw unit outline rect (if you want to modify this line ===>   please modify the same line in `drawHiddenCanvas`)
      let selfUnitHeight = self.unitHeight
      if(data.properties.label == 'village'){
        selfUnitHeight = selfUnitHeight - 25;
      }
      Util.roundRect(
        self.context,
        indexX,
        indexY,
        self.unitWidth,
        selfUnitHeight,
        4,
        true,
        false  //表格边框线显示
      )

      Util.text(
        self.context,
        data.properties.areaName.substring(0,9),
        indexX + self.unitPadding-10,
        indexY + self.unitPadding,
        '20px',
        '#ffffff'
      )
      // Util.text(self.context, data.title, indexX + self.unitPadding, indexY + self.unitPadding + 30, '20px', '#000000')
      let maxWidth = self.unitWidth - 2 * self.unitPadding
      if(data.properties.areaName.length>9){
        var dzY = 49;
        var qcdzY = 73;
        var hdzY = 97;
        Util.wrapText(
          self.context,
          data.properties.areaName.substring(9),
          indexX + self.unitPadding-10,
          indexY + self.unitPadding + 24,
          maxWidth,
          20
        )
      }else{
        var dzY = 24;
        var qcdzY = 49;
        var hdzY = 74;
      }
      
      Util.wrapText(
        self.context,
        // data.title,
        '弟子总人数：'+data.properties.count+'',
        //'亲传弟子人数：'+data.properties.childCount+'',
        indexX + self.unitPadding-10,
        indexY + self.unitPadding + dzY,
        maxWidth,
        20
      )
      if (opt.showSelfDisciple) {
        Util.wrapText(
          self.context,
          // data.title,
          //'弟子总人数：'+data.properties.count+'',
          '亲传弟子人数：'+data.properties.childCount+'',
          indexX + self.unitPadding-10,
          indexY + self.unitPadding + qcdzY,
          maxWidth,
          20
        )
      }
      if (opt.showChieftain) {
        let labelTmp =  data.properties.label
        if(labelTmp != 'village'){
          let tmpL = "";
          switch(labelTmp) {
            case "root":
              tmpL = "地区头面人物数："
              break;
            case "county":
              tmpL = "县市头面人物数："
              break;
            case "town":
              tmpL = "乡镇头面人物数："
              break;
          }
          Util.wrapText(
            self.context,
            // data.title,
            //'弟子总人数：'+data.properties.count+'',
            tmpL +data.properties.headerCount+'',
            indexX + self.unitPadding-10,
            indexY + self.unitPadding + hdzY,
            maxWidth,
            20
          )
        }
      }
      
    })
  }

  /**
   * fill the node outline with colorKey color
   */
  drawHiddenCanvas() {
    this.hiddenContext.clearRect(-50000, -10000, 100000, 100000)

    let self = this
    this.virtualContainerNode.selectAll('.orgUnit').each(function() {
      let node = self.d3.select(this)
      self.hiddenContext.fillStyle = node.attr('colorKey')
      Util.roundRect(
        self.hiddenContext,
        Number(node.attr('x')) - self.unitWidth / 2,
        Number(node.attr('y')) - self.unitHeight / 2,
        self.unitWidth,
        self.unitHeight,
        4,
        true,
        false
      )
    })
  }

  setCanvasListener() {
    this.setClickListener()
    this.setContextmenuListener()
    this.setDragListener()
    this.setMouseWheelZoomListener()
  }

  setClickListener() {
    let self = this
    this.canvasNode.node().addEventListener('click', e => {    
      var r_box = d3.select(document.getElementById('id_r_box'));   
      r_box.style('display','none');//每次单击都要把之前显示的菜单隐藏哦  
      let colorStr = Util.getColorStrFromCanvas(
        self.hiddenContext,
        e.layerX,
        e.layerY
      )
      let node = self.colorNodeMap[colorStr]
      if (node) {
        // let treeNodeData = node.data()[0]
        // self.hideChildren(treeNodeData, true)
        self.toggleTreeNode(node.data()[0])
        self.update(node.data()[0])
        //console.log(node.data()[0],382283);
      }
    })
  }
  //右键弹框
  setContextmenuListener () {
    let self = this;
    let oNode = this.canvasNode.node();
    // var r_box = document.createElement('div');
    var r_box = document.getElementById('id_r_box');
    var cont = document.getElementById('org-chart-container');
    r_box.style.display = "none";//每次右键都要把之前显示的菜单隐藏哦
    oNode.oncontextmenu = function(e){
      let colorStr = Util.getColorStrFromCanvas(
        self.hiddenContext,
        e.layerX,
        e.layerY
      )
      let node = self.colorNodeMap[colorStr]; 
      if (node) {
        //console.log(node.data()[0],666);
        let nodeData = node.data()[0];        
        let areaName = nodeData.data.properties.areaName;
        let label = nodeData.data.properties.label;
        let param = {
          pageIndex: 1,
          pageSize: 20,
          systemId: self.systemId,
          areaName: areaName,
          label: label
        }
        if(label == 'root'){
          var type = getData;
        }else{
          var type = getDataArea;
        }
        type(param).then(response => {
          if(response.code ==200){
            var data = response.data.mainPerson.data;
            self.allData = data;
            getMainPersonData(param,response.data,type,areaName,label);
            //渲染dom
            var oEv=e || event                        
            var l=oEv.clientX
            var t=oEv.clientY
            // r_box.id='id_r_box';
            // r_box.className='class_r_box';
            // var htmlStr = '<table width="400" border="none" cellspacing="0" cellpadding="0">'+
            //     '<thead>'+
            //       '<th align="center">照片</th>'+
            //       '<th align="center">姓名</th>'+
            //       '<th align="center">身份证</th>'+
            //       '<th align="center">地址</th>'+
            //       '<th align="center">状态</th>'+
            //     '</thead>';
            // for (var i = 0;i < self.allData.length; i++) {
            //   htmlStr += '<tr>'
            //     +'<td align="left"><img src=" '+imgPath+self.allData[i].idNumber+ '.jpg'+' " alt=""/></td>'
            //       +'<td align="center"> '+self.allData[i].name+' </td>'
            //       +'<td align="center"> '+self.allData[i].idNumber+' </td>'
            //       +'<td align="center"> '+self.allData[i].currentAddress+' </td>'
            //       +'<td align="center"> '+self.allData[i].stateStrong+' </td>'
            //     '</tr>';
            // }
            // r_box.innerHTML = htmlStr+'</table>';
            
            // var htmlStr = '<div class="list">'+
            //     '<div class="title">'+
            //       '<p>亲传弟子列表</p>'+
            //     '</div>';
            // for (var i = 0;i < self.allData.length; i++) {  
            //   htmlStr +='<div class="box">'
            //             +'<div class="box-left">'
            //               +'<img src=" '+imgPath+self.allData[i].idNumber+ '.jpg'+' " alt=""/>'
            //               +'<span> '+self.allData[i].stateStrong+' </span>'
            //             +'</div>'
            //             +'<div class="box-right">'
            //               +'<p> '+self.allData[i].name+' </p>'
            //               +'<p> '+self.allData[i].idNumber+' </p>'
            //               +'<p> '+self.allData[i].currentAddress+' </p>'
            //             +'</div>'
            //           +'</div>'
            //         '</div>';
            // }
            // r_box.innerHTML = htmlStr+'</div>';
            
            r_box.style.position='absolute';
            r_box.style.left=l+'px';
            r_box.style.top=t+'px';
            r_box.style.display = "block";
            //cont.appendChild(r_box);
          }
        })
        .catch(error => {
          console.log(error);
        });
        return false;
      }
      r_box.style.display = "none";//每次右键其他区域都要把之前显示的菜单隐藏哦
      return false;
    }
  }

  // getAllData(nodeData){
  //   console.log(this.allData)
  //   console.log(nodeData);
  //   console.log(joinPath,490);
  //   let areaName = nodeData.data.properties.areaName;
  //   let label = nodeData.data.properties.label;
  //   let param = {
  //     pageIndex: 1,
  //     pageSize: 20,
  //     systemId: this.systemId,
  //     areaName: areaName,
  //     label: label
  //   }
  //   getData(param).then(response => {
  //     if(response.code ==200){
  //       var data = response.data.data;
  //       this.allData = data;
  //       console.log(this.allData,494494);
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  setMouseWheelZoomListener() {
    let self = this
    this.canvasNode.node().addEventListener('mousewheel', event => {
      event.preventDefault()
      if (event.deltaY < 0) {
        self.bigger()
      } else {
        self.smaller()
      }
    })
  }

  setDragListener() {
    this.onDrag_ = false
    this.dragStartPoint_ = { x: 0, y: 0 }
    let self = this
    this.canvasNode.node().onmousedown = function(e) {
      self.dragStartPoint_.x = e.x
      self.dragStartPoint_.y = e.y
      self.onDrag_ = true
    }

    this.canvasNode.node().onmousemove = function(e) {
      if (!self.onDrag_) {
        return
      }
      self.context.translate(
        (e.x - self.dragStartPoint_.x) / self.scale,
        (e.y - self.dragStartPoint_.y) / self.scale
      )
      self.hiddenContext.translate(
        (e.x - self.dragStartPoint_.x) / self.scale,
        (e.y - self.dragStartPoint_.y) / self.scale
      )
      self.dragStartPoint_.x = e.x
      self.dragStartPoint_.y = e.y
    }

    this.canvasNode.node().onmouseout = function(e) {
      if (self.onDrag_) {
        self.onDrag_ = false
      }
    }

    this.canvasNode.node().onmouseup = function(e) {
      if (self.onDrag_) {
        self.onDrag_ = false
      }
    }
  }

  toggleTreeNode(treeNode) {
    //console.log(treeNode,594594);
    if (treeNode.children) {
      treeNode._children = treeNode.children
      treeNode.children = null
    } else {
      treeNode.children = treeNode._children
      treeNode._children = null
    }
  }

  bigger() {
    if (this.scale > 7) return
    this.clearCanvas_()
    this.scale = (this.scale * 5) / 4
    this.context.scale(5 / 4, 5 / 4)
    this.hiddenContext.scale(5 / 4, 5 / 4)
  }

  smaller() {
    if (this.scale < 0.1) return
    this.clearCanvas_()

    this.scale = (this.scale * 4) / 5
    this.context.scale(4 / 5, 4 / 5)
    this.hiddenContext.scale(4 / 5, 4 / 5)
  }

  clearCanvas_() {
    this.context.clearRect(-1000000, -10000, 2000000, 2000000)
    this.hiddenContext.clearRect(-1000000, -10000, 2000000, 2000000)
  }
}

export default OrgChart
