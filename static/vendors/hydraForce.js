// import * as d3 from 'd3v4';

// var hydra =
// /******/ (function(modules) { // webpackBootstrap
// /******/ 	// The module cache
// /******/ 	var installedModules = {};
// /******/
// /******/ 	// The require function
// /******/ 	function __webpack_require__(moduleId) {
// /******/
// /******/ 		// Check if module is in cache
// /******/ 		if(installedModules[moduleId]) {
// /******/ 			return installedModules[moduleId].exports;
// /******/ 		}
// /******/ 		// Create a new module (and put it into the cache)
// /******/ 		var module = installedModules[moduleId] = {
// /******/ 			i: moduleId,
// /******/ 			l: false,
// /******/ 			exports: {}
// /******/ 		};
// /******/
// /******/ 		// Execute the module function
// /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
// /******/
// /******/ 		// Flag the module as loaded
// /******/ 		module.l = true;
// /******/
// /******/ 		// Return the exports of the module
// /******/ 		return module.exports;
// /******/ 	}
// /******/
// /******/
// /******/ 	// expose the modules object (__webpack_modules__)
// /******/ 	__webpack_require__.m = modules;
// /******/
// /******/ 	// expose the module cache
// /******/ 	__webpack_require__.c = installedModules;
// /******/
// /******/ 	// define getter function for harmony exports
// /******/ 	__webpack_require__.d = function(exports, name, getter) {
// /******/ 		if(!__webpack_require__.o(exports, name)) {
// /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
// /******/ 		}
// /******/ 	};
// /******/
// /******/ 	// define __esModule on exports
// /******/ 	__webpack_require__.r = function(exports) {
// /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
// /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
// /******/ 		}
// /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
// /******/ 	};
// /******/
// /******/ 	// create a fake namespace object
// /******/ 	// mode & 1: value is a module id, require it
// /******/ 	// mode & 2: merge all properties of value into the ns
// /******/ 	// mode & 4: return value when already ns object
// /******/ 	// mode & 8|1: behave like require
// /******/ 	__webpack_require__.t = function(value, mode) {
// /******/ 		if(mode & 1) value = __webpack_require__(value);
// /******/ 		if(mode & 8) return value;
// /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
// /******/ 		var ns = Object.create(null);
// /******/ 		__webpack_require__.r(ns);
// /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
// /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
// /******/ 		return ns;
// /******/ 	};
// /******/
// /******/ 	// getDefaultExport function for compatibility with non-harmony modules
// /******/ 	__webpack_require__.n = function(module) {
// /******/ 		var getter = module && module.__esModule ?
// /******/ 			function getDefault() { return module['default']; } :
// /******/ 			function getModuleExports() { return module; };
// /******/ 		__webpack_require__.d(getter, 'a', getter);
// /******/ 		return getter;
// /******/ 	};
// /******/
// /******/ 	// Object.prototype.hasOwnProperty.call
// /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
// /******/
// /******/ 	// __webpack_public_path__
// /******/ 	__webpack_require__.p = "";
// /******/
// /******/
// /******/ 	// Load entry module and return exports
// /******/ 	return __webpack_require__(__webpack_require__.s = 0);
// /******/ })
// /************************************************************************/
// /******/ ([
// /* 0 */
// /***/ (function(module, exports, __webpack_require__) {

// __webpack_require__(1);
// var webixv = {};

// webixv.version = '2.0.1';
// webixv.graph = __webpack_require__(5);

// module.exports = webixv;

// /***/ }),
// /* 1 */
// /***/ (function(module, exports) {

// // removed by extract-text-webpack-plugin

// /***/ }),
// /* 2 */,
// /* 3 */,
// /* 4 */,
// /* 5 */
// /***/ (function(module, exports, __webpack_require__) {

// var selfURL = document.getElementsByTagName('script')[document.getElementsByTagName('script').length -1].src;
// module.exports = function () {
// 	/**
//    * 定义命名空间
//    * @namespace graph
//    */
// 	var graph = {},
// 		opt = {
// 			selecter : '#webixv',
// 			width : 800,
// 			height : 600,
// 			circle : {
// 				r : 32,
// 				color : "#fff",
// 				stroke: "#009AED",
// 				strokeSelectd: "#ABC700",
// 				strokefixed: "#C9C9C9",
// 				selected : "#fff",
// 				zoomColor : "blue",
// 				fixedColor : '#a1a1a1',
// 				fillColor : '#f2f2f2'
// 			}, 
// 			NTConfig : {
// 				NTViewArea_Stroke : 'blue', 
// 				NTViewArea_StrokeWidth : 1, 
// 				NTRect_Fill : 'white', 
// 				NTNode_Stroke : 'red', 
// 				NTNode_StrokeWidth : 1, 
// 				NTNode_Fill : 'red', 
// 				NTLink_Stroke : 'red',
// 				NTLink_StrokeWidth : 1,
// 				NTLink_Fill : 'none',
// 				NTSelected_Stroke : 'blue',
// 				NTSelected_StrokeWidth : 1,
// 				NTSelected_Fill : 'blue',
// 				ThumbnailSize : .2 //默认略缩图缩放比
// 			},
// 			useNT:false,
// 			icons : [],
// 			useForce : true, //启用力导向 默认值均为false
// 			selectNode : function(){},
// 			selectLink : function(){},
// 			expandEvt : function(){},
// 			bgclick : function(){} 
// 		},
// 		tools = __webpack_require__(6)(graph),
// 		Node = __webpack_require__(7)(graph),
// 		Link = __webpack_require__(8)(graph),		
// 		//saveAsPng = __webpack_require__(9)(graph),
// 		license = __webpack_require__(10)(graph),
// 		nodeObjs = [],
// 		linkObjs = [],
// 		graphContainer,container,bg_rect,simulation,
// 		node, nodeGroup,link, linkGroup,
// 		linkText, linkTextGroup,
// 		isdraged = false,
// 		initIsFinish = false,
// 		initOnce = true,
// 		svg_scale = 1, 
// 		svg_offsetX = 0, 
// 		svg_offsetY = 0,//当前缩放比
// 		useAdapt = false,
// 		selectedNodesArr = [],
// 		selectedLinkLabelsArr = [],
// 		selectedLinkLabelRectsArr = [],
// 		eventType = '', //键盘触发事件的类型
// 		simulationEventType = '', //模拟按键类型
// 		touching = false, 
// 		area_x, area_y, area_w, area_h, //框选用变量
// 		BoxArea, g_main, g_o,
// 		g_main_init = false,
// 		delObjArr = [],
// 		repeatViewId = {}, //key是viewid, val是对应的nodeid
// 		repeatNodes = {}, //key是重复的nodeid, val是被取代的nodeid
// 		ThumbnailTR = {},
// 		NT, NTNode, NTLink, NTRect, NTViewArea, NTSelected,
// 		js5, stop_ticked = false, tick=0,
// 		dataIsInit = false,
// 		filterTypeArray = []
// 		;
	
// 	/**测试 start**/
// 	var startTime = null;
// 	var forceStart = null;
// 	var forceEnd = null;
// 	var renderEnd = null;
// 	var ntStart = null;
// 	var ntEnd = null;
// 	var tickCount = 0;
// 	function calculateTime (start, end) {
// 		return (end - start)/1000 + 's';
// 	}
// 	/**测试 end**/
// 	//渲染dom
// 	function redrawContent(){
// 		node = nodeGroup.selectAll("g").data(nodeObjs);
// 		node = node.enter().append("g")
// 						.attr("type", "node")
// 						.attr("nodeType",function(d){ 
// 							return d.nodeType; 
// 						})
// 						.attr("id", function(d) { 
// 							return 'node-' + d.id;
// 						})
// 						.merge(node);
// 		simulation.nodes(nodeObjs)
// 			.on("tick", ticked)
// 			.on("end", ticked_end);
//     simulation
// 	    .force("link")
// 	    .links(linkObjs);
	    
//     var circles = node.append('circle')
//     		.attr('class', 'clrcle')
// 				.attr('r', function(d) {
// 					return opt.circle.r*(!d.exist ? 0.65 : 1);
// 				})
// 				.attr('fill',function (d) {
// 					if (!d.exist || (d.exist && d.image)) {
// 						return '#ffffff';
// 					}
// 					return d.color ? '#fff' : d.icon.fill;
// 				}).attr('stroke', function(d){
// 					return !d.exist ? '#a1a1a1' : (d.color || d.icon.color);
// 				}).attr('stroke-width', function(d){
// 					return !d.exist ? 3 : 5;
// 				});
// 		node.append('path')
// 			.attr('d', function(d){ 
// 				return  d.exist && d.image ? '' : d.icon.path
// 			})
// 			.attr('fill', function(d){
// 				return !d.exist ? '#a1a1a1' : (d.color || d.icon.color);
// 			})
// 			.attr('transform', function(d) {
// 				if (!d.exist) {
// 					return 'translate(-14,-15)scale(0.028)';
// 				} 
// 				return 'translate(-23,-24)scale(0.045)';
// 			});

// 		node.append('image')
// 			.attr('xlink:href', function(d){ 
// 				return d.exist ? d.image : '';
// 			})
// 			.attr('style',function(d) {
// 				return (!d.image || !d.exist)  ? 'display:none' : '';
// 			})
// 			.attr('width', 65)
// 			.attr('height', 75)
// 			.attr('transform', function(d) {
// 				return 'translate(-19,-22)scale(0.58)';
// 			});
			
// 		node.insert('rect',':first-child')
// 			.attr('class','noderect')
// 			.attr('style',function(d) {
// 				if (!d.exist || !d.getPropLength()) {
// 					return 'display:none';
// 				}
// 			})
// 			.attr('stroke',function(d){
// 				return d.color || d.icon.color;
// 			})
// 			.attr('stroke-width',1)
// 			.attr('fill','#f2f2f2');
		
// 		node.append("text")
// 			.attr('id',function(d){ return 'node-label-'+d.id; })
// 	    .attr('y',opt.circle.r+10).attr('text-anchor','middle')
// 	    .selectAll('tspan')
// 	    .data(function(d) {
// 				var a = d.getPropList(), arr=[];
// 				if (a.length > 3) {
// 					arr = a.slice(0,2);
// 					arr.push('...');
// 				}else{
// 					arr = a;
// 				}
// 	      return arr;
// 	    }).enter().append('tspan').attr('dy', function(d, i) {
// 	        return 14;
// 	    }).attr('x', -1).text(function(d) {
// 	        return d;
// 	    });

// 		link = linkGroup.selectAll("path").data(linkObjs).enter().append("path")
// 			.attr("id", function(d) { return "link-" + d.id; })
// 			.attr("source", function(d) { return "node-" + d.source.id; })
// 			.attr("target", function(d) { return "node-" + d.target.id; })
// 			.attr("stroke-width", function(d) { return Math.sqrt(d.value); })
// 			.attr("stroke",function(d){ return d.color==undefined||d.color==""?"#999":d.color; })
// 			.attr("fill","none");
	
//     linkText = linkTextGroup.selectAll("g").data(linkObjs).enter();  
			
//     linkText = linkText.append("g")
// 	    .attr("id", function(d){ return "link-label-"+d.id; })
// 	    .attr("source", function(d){ return "link-label-"+d.source.id; }) 
// 	    .attr("target", function(d){ return "link-label-"+d.target.id; })
// 	    .attr('text-anchor','middle')
// 	    .attr('cursor','pointer')
// 	    .attr('style', function(d){ 
// 	    	return d.source == d.target ? 'display:none' : 'display:block';
// 	    });
	    

//     linkText.append("text")
// 	    .attr('type','linktext')
// 	    .attr("id", function(d){ return "link-text-"+d.id; })
// 	    .selectAll('tspan').data(function(d) {
// 	      return [d.getPropList()[0]];
// 	    })
// 	    .enter()
// 	    .append('tspan')
// 	    .attr('x',0)
// 	    .attr('dy',function(text,i,arr){
// 	    	return i==0? (arr.length-1)*-15/2:15;
// 	    })
// 	    .text(function(d) {
// 	        return d;
// 	    })
// 	    .attr('fill','#666');
    
// 		linkText.insert('rect',':first-child')
// 			.attr('class', 'linkrect')
// 			.attr('fill','#fff')
// 			.attr("fill-opacity", function(d) {
// 				return !d.getPropLength() ? 0 : 1;
// 			})
// 			.attr('stroke', '#ccc')
// 			.attr('stroke-width',function(d) {
// 				return !d.getPropLength() ? 0 : 1;
// 			})
// 			.attr('id',function(d){ return 'link-label-rect-'+d.id;} )
// 			.attr('linkid',function(d){ return d.id;} )
			
// 			.attr('width',function(d){
// 				return d.getPropWidth();
// 			})
// 			.attr('height',function(d){
// 				return d.getPropHeight();
// 			})
// 			.attr('x',function(d){
// 				return 0;
// 			})
// 			.attr('y',function(d){
// 				return -2;
// 			})
// 			.attr('rx', 16)
// 			.attr('ry', 16);

// 		var ellipsis = linkText.append('g')
// 			.attr('class', 'ellipsis')
// 			.attr('style', 'display:none');

// 		ellipsis.append('circle')
// 			.attr('r', 14)
// 			.attr('fill', '#fff')
// 			.attr('stroke-width', 1)
// 			.attr('stroke', '#dadada')
// 		ellipsis.append('text')
// 			.attr('style', 'font-size:16px')
// 			.text('...')

// 		var more = linkText.append('g')
//     	.attr('class', function(d){
//     		return d.getPropLength() > 1 ? 'more' :'nomore'
//     	});
//     more.append('circle')
// 			.attr('r',5)
// 			.attr('fill', '#fff')
// 			.attr('stroke-width', 1)
// 			.attr('stroke', '#8b8b8b')
// 		more.append('text').text('...')
// 		//显示标签
//     addEvent ();
// 	}

// 	function dragstarted(d) {
// 		if (d.isfixed) return;
// 		//simulation.alphaMin(0.001);
// 	  if (!d3.event.active && opt.useForce)
// 	      simulation.alphaTarget(1).restart();
// 	  d.fx = d.x;
// 	  d.fy = d.y;
// 		//isdraged = true;
// 	}

// 	function dragged(d) {
// 		if (d.isfixed) return;
// 		d.fx = d3.event.x;
// 		d.fy = d3.event.y;
// 		if (!opt.useForce) {
// 			draw();
// 		}
// 		//选中效果
// 		linkTextGroup/*.selectAll(show_link_labels_id)*/.selectAll('rect')
// 		.attr("transform", function(d) {
// 			var x = d.getCenter().x-d.getPropWidth()/2;
// 			var y = d.getCenter().y-d.getPropHeight()/2; 
// 			return "translate(" + x + "," + y + ")";
// 		});
// 	}

// 	function dragended(d) {
// 		draw();
// 		if (opt.useForce) {
// 			if (!d3.event.active)
// 	      simulation.alphaTarget(0);
// 			d.fx = null;
// 	  	d.fy = null;
// 		}
// 		Thumbnail();
// 	}

// 	//绘制
// 	function draw() {
// 		//性能检测 --start
// 		tickCount++;
// 		//性能检测 --end
// 		//drawNode
//     node
// 	    .attr("transform", function(d) {
// 	      //return "translate(" + d.x + "," + d.y + ")";
// 	      return 'translate('+d.x+','+d.y+')' + (d.useKeyNode ? 'scale('+ d.nodeScale +')' : '');
// 	    }).attr("x", function(d) {
// 	    	if (!opt.useForce || d.isfixed) {
//     			d.x = d.fx || d.x;
//     			d.fx = d.x;
//     		}
// 	      return d.x;
// 	    }).attr("y", function(d) {
// 	    	if (!opt.useForce || d.isfixed) {
//     			d.y = d.fy || d.y;
// 	    		d.fy = d.y;
// 	    	}
// 	      return d.y;
// 	    });
	    
// 		drawPathBezier(link);	    
// 		linkText.selectAll("[type='linktext']")
// 			.attr("transform", function(d) {
// 				return "translate(" + d.getCenter().x + "," + d.getCenter().y + ")";	
// 			});
		
// 		linkTextGroup.selectAll('rect')
// 			.attr("transform", function(d) {
// 				var x = d.getCenter().x - d.getPropWidth()/2;
// 				var y = d.getCenter().y - d.getPropHeight()/2;

// 				return "translate(" + x + "," + y + ")";
// 			});
// 		//待完善
// 		linkTextGroup.selectAll('g.ellipsis')
// 			.attr('transform', function(d) {
// 				var pos = d.getCenter();
// 				return "translate("+(pos.x-2)+","+(pos.y-2)+")";
// 			});
// 		linkTextGroup.selectAll('g.more')
// 			.attr('transform', function(d){
// 				var pos = d.getCenter();
// 				var x = pos.x + d.getPropWidth()/2 -10;
// 				var y = pos.y-2;
// 				return "translate("+ x +","+ y +")";
// 			});
// 	}

// 	function drawPathBezier(ele){
// 		ele.attr("d",function(d){
// 			//判断同nodes的link
// 			var linksArr = [];
// 			if(d['BothNodeLinks']){
// 				linksArr = d['BothNodeLinks'];
// 			}else{
// 				var sid = d.source.id, tid = d.target.id;
// 				ele.filter(function(e){
// 					if(
// 						(e.source.id==sid && e.target.id==tid) ||
// 						(e.target.id==sid && e.source.id==tid)
// 					){
// 						linksArr.push(e.id);
// 					}
// 				});
// 			}
// 			if(linksArr.indexOf(d.id) == 0){
// 				linkGroup.select('#link-mark-path-'+d.id).selectAll('animateMotion')
// 					.attr('path',function(item){
// 						if('reverse' == item.direction){
// 							return "M"+d.target.x+","+d.target.y+" L"+d.source.x+","+d.source.y;
// 						}else{
// 							return "M"+d.source.x+","+d.source.y+" L"+d.target.x+","+d.target.y;
// 						}
// 					});
				
// 				if('reverse' == d.direction){
// 					return "M"+d.target.x+","+d.target.y+" L"+d.source.x+","+d.source.y;
// 				}else{
// 					return "M"+d.source.x+","+d.source.y+" L"+d.target.x+","+d.target.y;
// 				}
// 			}else{
// 				var index = linksArr.indexOf(d.id);
// 				var sx = d.source.x, sy = d.source.y;
// 	    	var tx = d.target.x, ty = d.target.y;
// 	    	var spx = sx, spy = sy, tpx = tx, tpy = ty, py = 25;
// 	    	var a = Math.abs(sx - tx);
// 	    	var b = Math.abs(sy - ty);
// 	    	var c = Math.sqrt(a*a+b*b);
// 	    	var pyX = (py*b)/c * Math.ceil(index/2);
// 	    	var pyY = (py*a)/c * Math.ceil(index/2);
// 				if(index%2 == 1){
// 					//t在s的第几象限
// 			    	if(tx>sx){
// 			    		if(ty>sy){
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx-=pyX, spy+=pyY; tpx-=pyX, tpy+=pyY;
// 			    			}else{
// 			    				spx-=pyX, spy+=pyY; tpx-=pyX, tpy+=pyY;
// 			    			}
// 			    		}else{
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx+=pyX, spy+=pyY; tpx+=pyX, tpy+=pyY;
// 			    			}else{
// 			    				spx+=pyX, spy+=pyY; tpx+=pyX, tpy+=pyY;
// 			    			}
// 			    		}
// 			    	}else{
// 			    		if(ty>sy){
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx-=pyX, spy-=pyY, tpx-=pyX, tpy-=pyY;
// 			    			}else{
// 			    				spx-=pyX, spy-=pyY, tpx-=pyX, tpy-=pyY;
// 			    			}
// 			    		}else{
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx+=pyX, spy-=pyY, tpx+=pyX, tpy-=pyY;
// 			    			}else{
// 			    				spx+=pyX, spy-=pyY, tpx+=pyX, tpy-=pyY;
// 			    			}
// 			    		}
// 			    	}
// 				}else{
// 					//t在s的第几象限
// 			    	if(tx>sx){
// 			    		if(ty>sy){
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx+=pyX, spy-=pyY; tpx+=pyX, tpy-=pyY;
// 			    			}else{
// 			    				spx+=pyX, spy-=pyY; tpx+=pyX, tpy-=pyY;
// 			    			}
// 			    		}else{
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx-=pyX, spy-=pyY; tpx-=pyX, tpy-=pyY;
// 			    			}else{
// 			    				spx-=pyX, spy-=pyY; tpx-=pyX, tpy-=pyY;
// 			    			}
// 			    		}
// 			    	}else{
// 			    		if(ty>sy){
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx+=pyX, spy+=pyY, tpx+=pyX, tpy+=pyY;
// 			    			}else{
// 			    				spx+=pyX, spy+=pyY, tpx+=pyX, tpy+=pyY;
// 			    			}
// 			    		}else{
// 			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
// 			    				spx-=pyX, spy+=pyY, tpx-=pyX, tpy+=pyY;
// 			    			}else{
// 			    				spx-=pyX, spy+=pyY, tpx-=pyX, tpy+=pyY;
// 			    			}
// 			    		}
// 			    	}	
// 				}
				
// 				linkGroup.select('#link-mark-path-'+d.id).selectAll('animateMotion')
// 					.attr('path',function(item){
// 						if('reverse' == item.direction){
// 							return "M"+tx+","+ty+" C"+tpx+","+tpy+" "+spx+","+spy+" "+sx+","+sy;
// 						}else{
// 							return "M"+sx+","+sy+" C"+spx+","+spy+" "+tpx+","+tpy+" "+tx+","+ty;
// 						}
// 					});
				
// 				if('reverse' == d.direction){
// 					return "M"+tx+","+ty+" C"+tpx+","+tpy+" "+spx+","+spy+" "+sx+","+sy;
// 				}else{
// 					return "M"+sx+","+sy+" C"+spx+","+spy+" "+tpx+","+tpy+" "+tx+","+ty;
// 				}
// 			}
// 	  });
// 	}
	
// 	function ticked_end() {
// 		if(!opt.useNT) return;
// 		//性能检测 --start
// 		if (opt.useForce) {
// 			forceEnd = new Date().getTime();
// 			//console.log('加载实体个数：', nodeObjs.length)
// 			//console.log('加载关系个数：', linkObjs.length)
// 			//console.log('\n力导向开启到结束时间差',calculateTime(forceStart, forceEnd))
// 		}
// 		//性能检测 --end
// 	  draw();
// 	  viewData();
// 		Thumbnail();
// 	  if (opt.useForce) {
// 			initIsFinish = true;
// 			//性能检测
// 			//console.log('渲染次数：',tickCount);
// 			//性能检测
// 		}
//     if (initOnce) {
//     	// graph.displayAdapt();
//     	initOnce = false;
//     }
// 	}

// 	function ticked() {
// 		tick++;
// 		draw();
// 		if (!opt.useForce) {
// 			simulation.stop();
// 			forceEnd = new Date().getTime();
// 			//console.log('渲染次数：',tickCount);
// 			//console.log('力导向启动与结束时间差：', calculateTime(forceStart, forceEnd));
// 			//console.log('计算结束,与数据加载时间差（不使用力导向）-', calculateTime(startTime, forceEnd));
// 		}
// 		// if (tick >= 50) {
// 		// 	simulation.stop();
// 		// }
// 		graphContainer.attr('style','display:block;');
// 		if(!stop_ticked){
// 			viewData();
// 			Thumbnail();
// 		}
// 	}

// 	function zoomed() {
// 		if (useAdapt) {
// 			d3.event.transform.k = svg_scale;
// 			d3.event.transform.x = svg_offsetX;
// 			d3.event.transform.y = svg_offsetY;
// 			useAdapt = false;
// 		}
// 		svg_scale = d3.event.transform.k;
// 		svg_offsetX = d3.event.transform.x;
// 		svg_offsetY = d3.event.transform.y;
//     	container.attr("transform", "translate(" + svg_offsetX + "," + svg_offsetY + ")scale(" + svg_scale + ")");
    
// 		node.attr("transform",function(d){
// 			if (d.useKeyNode) {
// 				d.nodeScale = svg_scale <= 1 ? 1.5/svg_scale : svg_scale >= 1.5 ? 1 : 1.5;
// 			}else{
// 				d.nodeScale = 1;
// 			}
// 			return 'translate('+d.x+','+d.y+')' + (d.useKeyNode ? 'scale('+ d.nodeScale +')' : '');
// 		});
// 		draw();
// 		viewData();
// 		var glinks = d3.select('g.link-labels');
// 		glinks.selectAll('g.ellipsis').attr('style', 'display:' + (svg_scale < 0.8 ? 'block' : 'none'));
// 		glinks.selectAll('rect.linkrect,text[type="linktext"],g.more').attr('style', 'display:' + (svg_scale < 0.8 ? 'none' : 'block'));	
// 	}
	
// 	//获取显示区域对象
// 	function getViewArea(){
// 		var offset_x=0,offset_y=0;
// 		var svg_w = Number(d3.select('svg').attr('width'));
// 		var svg_h = Number(d3.select('svg').attr('height'));
// 		try{
// 	    	//svg宽高
// 			svg_w = svg_w / svg_scale;
// 			svg_h = svg_h / svg_scale;
			
// 			//可视区域左上角, 相对svg中心点的偏移    
// 			offset_x = svg_offsetX / svg_scale *-1;
// 			offset_y = svg_offsetY / svg_scale *-1;
// 		}catch(e){
// 			//console.log(e);
// 		}
		
// 		var view_min_x = offset_x;
// 		var view_max_x = offset_x + svg_w;
// 		var view_min_y = offset_y;
// 		var view_max_y = offset_y + svg_h;
		
// 		return [[view_min_x,view_min_y],[view_max_x,view_max_y]];
// 	}
	
// 	function viewData(all,fun){
// 		redrawNodeRect();
// 		if(fun){ fun(); }
// 		TNViewArea();
// 	}

// 	//绘制node rect背景
// 	function redrawNodeRect() {
// 		nodeGroup.selectAll('g[type="node"]').selectAll('rect.noderect')
// 			.attr('y',opt.circle.r+8)
// 	    .attr('x',function(d){
// 				return d.getPropWidth()*-0.5 -20;
// 			})
// 		  .attr('width',function(d){
// 				return d.getPropWidth() + 40;
// 			})
// 			.attr('height',function(d){
// 				return d.getPropLength()>3 && !d.isShowAll ? 52 : (d.getPropHeight()+8);
// 			})
// 			.attr('rx',function(d){
// 				return (d.getPropLength() < 3 ? d.getPropLength() : 3)*18/2;
// 			})
// 			.attr('ry',function(d){
// 				return (d.getPropLength() < 3 ? d.getPropLength() : 3)*18/2;
// 			});
// 	}
	
// 	//事件绑定
// 	function addEvent () {
// 		node.call(d3.drag()
// 			.on("start", dragstarted)
// 			.on("drag", dragged)
// 			.on("end", dragended))
// 			.on('mouseover', function() {
// 				if (!isdraged) {
// 					document.querySelector('.nodes').appendChild(this);
// 				}
// 			});
// 		node.on("click", evtClickNode);
//     link.on("click.link", evtClickLink);
//     linkText.on("click.linkText", evtClickLink);
//     linkText.on("click.more", evtShowLinkMore);
//     linkText.on("mouseover", function(){
//     	this.remove();
//     	document.querySelector('.link-labels').appendChild(this);
//     });
// 		d3.select('body').on('keydown', evtKeydown);
// 		d3.select('body').on('keyup', evtkeyup);
// 		bg_rect.on('click.rect', bgclick);
// 		bg_rect.on('dblclick', function(){
// 			opt.bgclickEvt();
// 		});
// 		node.on('dblclick', evtExpandMenu);	
// 		document.querySelector('body').onclick = function (e) {
// 			if (e.target.tagName != 'path') {
// 				d3.selectAll('g.exMenuGroup').remove();
// 			}
// 			var box = document.querySelector('#rMenu');
// 			if (box) {
// 				box.style.display = 'none';
// 			}
// 		};
// 		NTRect.on("click.nt", evtClickNT);
// 	}

// 	//扩展菜单
// 	function evtExpandMenu (di) {
// 		if (!di.exist) return false;
// 		var me = this;
// 		d3.selectAll('g.exMenuGroup').remove();
// 		var dataset=[{
// 			text : '编辑',
// 			color : '#03509a',
// 			hColor : '#efa10b',
// 			type : 'edit',
// 			path : 'M649.118225 40.89351H143.783911C64.85209 40.89351 0 103.953634 0 181.733477V883.202699C0 961.025207 64.766759 1024 144.637228 1024h720.284861c79.955801 0 144.637228-63.102791 144.637228-140.925299V394.422734h-72.105285v488.651967c0 39.081918-32.426045 70.697312-72.531943 70.697312H144.637228c-40.105898 0-72.531943-31.572728-72.531943-70.61198V181.733477c0-38.911254 32.426045-70.61198 71.721292-70.61198h505.291648V40.89351z m-196.604232 465.953735a34.474006 34.474006 0 0 0 0 49.663049 36.735296 36.735296 0 0 0 50.98569 0L1013.399243 59.965144a34.474006 34.474006 0 0 0 0-49.663048 36.735296 36.735296 0 0 0-50.985689 0L452.513993 506.847245z',
// 			value : 5
// 		},{
// 			text : '删除',
// 			color : '#1464b2',
// 			hColor : '#efa10b',
// 			type : 'del',
// 			path : 'M568.96 512.064l326.336-326.336a39.232 39.232 0 1 0-55.552-55.552L513.408 456.512l-326.4-326.336a39.232 39.232 0 1 0-55.552 55.552l326.4 326.336L131.584 838.4a39.232 39.232 0 1 0 55.552 55.552l326.336-326.336 326.336 326.336c15.36 15.232 40.192 15.232 55.552 0a39.36 39.36 0 0 0 0-55.552l-326.4-326.336z',
// 			value : 5
// 		},{
// 			text : '锁定',
// 			color : '#297dce',
// 			hColor : '#efa10b',
// 			type : 'lock',
// 			path : 'M270.118128 307.243574C270.118128 173.883915 378.618553 65.361702 512 65.361702 645.35966 65.361702 753.860085 173.883915 753.860085 307.243574L753.860085 354.914043 270.118128 354.914043 270.118128 307.243574ZM827.914894 354.914043 819.221787 354.914043 819.221787 305.740255C819.221787 305.217362 819.091064 304.716255 819.069277 304.215149 817.413447 136.213787 680.371745 0 512 0 343.606468 0 206.564766 136.213787 204.908936 304.215149 204.887149 304.738043 204.756426 305.217362 204.756426 305.740255L204.756426 354.914043 196.085106 354.914043C130.004426 354.914043 76.255319 408.663149 76.255319 474.722043L76.255319 635.468255C76.255319 653.529872 90.874553 668.149106 108.93617 668.149106 126.976 668.149106 141.617021 653.529872 141.617021 635.468255L141.617021 474.722043C141.617021 444.699234 166.040511 420.253957 196.085106 420.253957L827.914894 420.253957C857.937702 420.253957 882.382979 444.699234 882.382979 474.722043L882.382979 796.693787C882.382979 904.344511 842.664851 948.267574 745.341277 948.267574L278.636936 948.267574C181.313362 948.267574 141.617021 904.344511 141.617021 796.693787 141.617021 778.653957 126.976 764.012936 108.93617 764.012936 90.874553 764.012936 76.255319 778.653957 76.255319 796.693787 76.255319 940.642043 144.340426 1013.629277 278.636936 1013.629277L745.341277 1013.629277C879.659574 1013.629277 947.744681 940.642043 947.744681 796.693787L947.744681 474.722043C947.744681 408.663149 893.973787 354.914043 827.914894 354.914043ZM511.991285 835.716902C536.828732 835.716902 557.025498 815.040817 557.025498 789.615115L557.025498 680.766094C578.159115 665.66754 591.03537 640.677583 591.03537 614.031796 591.03537 569.237243 555.565753 532.7872 511.991285 532.7872 468.416817 532.7872 432.9472 569.237243 432.9472 614.031796 432.9472 640.677583 445.845243 665.689328 467.000647 680.766094L467.000647 789.615115C467.000647 815.040817 487.175626 835.716902 511.991285 835.716902Z',
// 			value : 5
// 		},{
// 			text : '扩展',
// 			color : '#4498e9',
// 			hColor : '#efa10b',
// 			type : 'expand',
// 			path : 'M99.5 284.8h61.3v-74l260.3 260.3 43.4-43.4L198.8 162h84.8v-61.4H99.5zM869.1 825.8L603.4 560 560 603.4l260.3 260.4h-73.9v61.3h184.1V741h-61.4zM160.1 742.4H98.7v184.1h184.2v-61.3h-68.6l263.1-263.1-43.4-43.4-273.9 273.9zM742 102v61.3h90.2l-263 263.1 43.4 43.4 252.2-252.2v68.5h61.4V102z',
// 			value : 5
// 		},{
// 			text : '添加',
// 			color : '#4faafe',
// 			hColor : '#efa10b',
// 			type : 'add',
// 			path : 'M451.318 451.318h-364.036c-33.754 0-60.734 27.168-60.734 60.682 0 33.747 27.191 60.682 60.734 60.682h364.036v364.036c0 33.754 27.168 60.734 60.682 60.734 33.747 0 60.682-27.191 60.682-60.734v-364.036h364.036c33.754 0 60.734-27.168 60.734-60.682 0-33.747-27.191-60.682-60.734-60.682h-364.036v-364.036c0-33.754-27.168-60.734-60.682-60.734-33.747 0-60.682 27.191-60.682 60.734v364.036z',
// 			value : 5
// 		}];
// 		var exMenuGroup = d3.select(this)
// 												.append('g')
// 												.attr('class', 'exMenuGroup');
// 		var pie = d3.pie();
// 		var arc = d3.arc().innerRadius(80).outerRadius(40);
// 		var arcs = exMenuGroup.selectAll("g.arc")
// 			.data(pie(dataset.map(function(ele) {
// 				return ele.value;
// 			})))
// 			.enter()
// 			.append("g")
// 			.attr("class","arc")
// 			.attr("alt",function(d,i){
// 				return dataset[i].text;
// 			})
// 			.on('dblclick',function(d,i){
// 				opt.expandEvt(dataset[i],di,i);
// 				d3.selectAll('g.exMenuGroup').remove();
// 			});
// 		arcs.append("path")
// 			.attr("fill",function(d,i){
// 				return dataset[i].color;
// 			})
// 			.attr("d",arc)
// 			.on('mouseover',function(d, i){
// 				d3.select(this)
// 				.attr('fill',dataset[i].hColor);
// 			})
// 			.on('mouseout',function(d,i){
// 				d3.select(this)
// 				.attr('fill',dataset[i].color);
// 			});		
// 		arcs.append("path")
// 			.attr("d",function(d,i){
// 				return dataset[i].path;
// 			})
// 			.attr("fill","#fff")
// 			.attr("txet-anchor","middle")
//       .attr("transform",function(d,i){
//       	return "translate(" + (arc.centroid(d)[0]-10) + "," + (arc.centroid(d)[1]-10) + ")scale(0.02)";
//       });
// 	}
	
// 	function evtClickNode(data) {
// 		var srcElement = d3.event.srcElement;
// 		if (['rect', 'tspan'].indexOf(srcElement.tagName) != -1 && 'ctrl' != eventType) {
// 			data.isShowAll = !data.isShowAll;
// 			var text = nodeGroup.select('#node-' + data.id).select('text');

// 			text.selectAll('tspan').data([]).exit().remove();
// 			text.selectAll('tspan').data(function() {
// 					var a = data.getPropList(), arr=[];
//     			if (!data.isShowAll && a.length >3) {
//     				arr = a.slice(0,2);
//     				arr.push('...');
//     			}else{
//     				arr = a;
//     			}
// 	        return arr;
// 				}).enter().append('tspan').attr('dy', function(d, i) {
// 	        return 14;
// 		    }).attr('x', -1).text(function(d) {
// 		        return d;
// 		    });
// 		  redrawNodeRect();

// 		}
// 		//点击tags circle或者text.tagnums   
// 		if (srcElement.tagName == 'circle' && srcElement.classList.value == 'tagcircle' || srcElement.tagName == 'text' && srcElement.classList.value == 'tagnums') {
// 			var tag = d3.select('#node-' + data.id).select('g.tag');
// 			tag.select('text.list').attr('style', 'display:' + (data.showTags ? 'block' : 'none'));
// 			tag.select('rect.tagrect').attr('style', 'display:' + (data.showTags ? 'block' : 'none'));
// 			data.showTags = !data.showTags;
// 		}
// 		if ('shift' == eventType) {
	
// 		} else if ('ctrl' == eventType) {
// 			var id_index = selectedNodesArr.indexOf('#node-' + data.id);
// 			if (id_index == -1) {
// 				selectedNodes([data.id]);
// 			} else {
// 				selectedNodesArr.splice(id_index, 1);
// 				nodeGroup.select('#node-' + data.id).attr('class','');
// 				nodeGroup.select('#node-label-' + data.id).attr('class','');
// 				nodeGroup.select('#node-' + data.id).selectAll('rect.noderect').remove();
// 			}
// 		}
	
// 		else {
// 			clearAllSelection();
// 			selectedNodes([data.id]);
// 		}
		
// 		Thumbnail();
// 	}

// 	function evtClickLink(data){
// 		if ('shift' == eventType) {
	
// 		} else if ('ctrl' == eventType) {
// 			var id_index = selectedLinkLabelsArr.indexOf('#link-label-' + data.id);
// 			if(id_index == -1){
// 				selectedLinks([data.id]);
// 			} else {
// 				selectedLinkLabelsArr.splice(id_index, 1);
// 				selectedLinkLabelRectsArr.splice(id_index, 1);
				
// 				linkTextGroup.selectAll('#link-label-'+data.id).select("[type='linktext']").attr('class','');
// 				linkTextGroup.selectAll('#link-label-rect-'+data.id).remove();
// 			}
// 		}
		
// 		else{
// 			clearAllSelection();
// 			selectedLinks([data.id]);
// 		}
// 	}

// 	function evtClickNT(){
// 		var ntsvg = document.getElementsByClassName('svgNT')[0].getBBox(),
// 			x = d3.event.offsetX/ThumbnailTR.k-(ntsvg.width/1)-opt.width/2,
// 		  	y = d3.event.offsetY/ThumbnailTR.k-(ntsvg.height/1)-opt.height/2
// 			;
// 		setTransform(-x, -y, svg_scale);
// 		TNViewArea();
// 	}

// 	function evtKeydown() {
// 		if (d3.event.shiftKey) {
// 			evtKeydown_shift();
// 		} else if (d3.event.ctrlKey) {
// 			evtKeydown_ctrl();
// 		}
// 	}

// 	function evtKeydown_shift(){
// 		eventType = 'shift';
// 		if(!g_main_init){
// 			g_main_init = true;
// 			g_o = g_main.append("g");
// 			g_o.attr("fill", "none")
// 				.attr("pointer-events", "all")
// 				.style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
// 				.on('mousedown.rect touchstart.rect', evtRectBoxSelection);
// 			var arr = getViewArea();
// 			var view_min_x = arr[0][0];
// 			var view_max_x = arr[1][0];
// 			var view_min_y = arr[0][1];
// 			var view_max_y = arr[1][1];	
// 			g_o.append("rect")
// 				.attr("class","overlay")
// 				.attr("pointer-events","all")
// 				.attr("cursor","crosshair")
// 				.attr("x",view_min_x).attr("y",view_min_y)
// 				.attr("width",view_max_x-view_min_x).attr("height",view_max_y-view_min_y);
// 			g_o.append("rect")
// 				.attr("class","selection")
// 				.attr("cursor", "move")
// 				.attr("fill", "#777")
// 				.attr("fill-opacity", 0.3)
// 				.attr("stroke", "#000000")
// 				.attr("shape-rendering", "crispEdges");
// 		}
// 	}
	
// 	function evtKeydown_ctrl(){
// 		eventType = 'ctrl';
// 		if (d3.event.keyCode == 65) {
// 			d3.event.returnValue = false;
// 			graph.selectedAll();
// 		}
// 	}
	
// 	function evtkeyup() {
// 		if ('shift' == eventType) {
// 			evtKeyup_shift();
// 		} else if ('ctrl' == eventType) {
			
// 		}	
// 		eventType = '';
// 	}
	
// 	function evtKeyup_shift(){
// 		evtRectEnd();
// 	}

// 	//关系超过两条事 显示更多关系
// 	function evtShowLinkMore () {}

// 	//按下shift时事件
// 	function evtRectBoxSelection(){
// 		if('shift' == eventType){
// 			touching = true;
//       var me = this, p0 = d3.mouse(me);
// 			var view = d3.select(d3.event.view)
// 				          .on("mousemove.rect", function(){
// 				          	evtRectMove(me, p0)
// 				          }, true)
// 				          .on("mouseup.rect", evtRectMouseup, true);
// 		}
// 	}
	
// 	//按下shift时事件
// 	function evtRectMove(me, p0){
// 		//关闭鼠标左键拖动整个画布的效果
// 		d3.event.stopImmediatePropagation();
// 		var p1 = d3.mouse(me);
// 		if(p0[0] > p1[0]){
// 			area_x = p1[0], area_w = p0[0]-p1[0];
// 		}else{
// 			area_x = p0[0], area_w = p1[0]-p0[0];
// 		}
// 		if(p0[1] > p1[1]){
// 			area_y = p1[1], area_h = p0[1]-p1[1];
// 		}else{
// 			area_y = p0[1], area_h = p1[1]-p0[1];
// 		}
		
// 		if(!BoxArea){
// 			BoxArea = g_main.append('rect')
// 				.attr('id','rect-move-box')
// 				.attr('x', area_x).attr('y',area_y)
// 				.attr('width',area_w).attr('height',area_h)
// 				.attr("fill", "#777")
// 	            .attr("fill-opacity", 0.3)
// 	            .attr("stroke", "#000000")
// 	            .attr("shape-rendering", "crispEdges")
// 				;
// 		}else{
// 			BoxArea.attr('x', area_x).attr('y', area_y)
// 				.attr('width',area_w).attr('height',area_h);
// 		}
// 	}

// 	//按下shift时事件
// 	function evtRectMouseup(){
// 	  if(touching){
// 			evtRectEnd();
// 		}
// 	}

// 	//按下shift时事件
// 	function evtRectEnd(){
// 		var view = d3.select(d3.event.view)
//         .on("mousemove.rect", null, true)
//         .on("mouseup.rect", null, true);
//     var nodes = [];
//   	if(BoxArea){
//     	BoxArea.remove(); BoxArea = null;
//     	//根据选择区域, 过滤nodes
//     	var selectedNodes = nodeGroup.selectAll("[type='node']")
// 									        	.filter(function(item,i){
// 															var now_x = item.x;
// 												    	var now_y = item.y;
// 												    	var flag = (now_x <= (area_x+area_w) && now_x >= area_x ) && (now_y <= (area_y+area_h) && now_y >= area_y );
// 												    	if(flag){ nodes.push(item.id); }
// 															return flag;
// 														});
//     }
// 	if(g_o){
// 		g_o.remove(); g_o = null;
// 	}
//     g_main_init = false;
    
//     if(nodes.length > 0){
//     	clearAllSelection();
//     	graph.selectedElements(nodes, []);
//     }
// 	if(simulationEventType == 'shift'){
// 		eventType = '';
// 		simulationEventType = '';
// 	}
//     touching = false;
// 	}

// 	function bgclick(){
// 		if(simulationEventType == 'shift'){
// 			evtKeydown_shift();
// 		}else if(simulationEventType == 'ctrl'){
// 			evtKeydown_ctrl();
// 		}else if(simulationEventType == ''){
// 			clearAllSelection();
// 		}
// 	}
	
// 	//选中的实体（多个）
// 	function selectedNodes(idsArr){
// 		var node_ids = [], node_label_ids = [];
// 		for(var i=0;i<idsArr.length;i++){
// 			var id = idsArr[i];
// 			if(selectedNodesArr.indexOf('#node-' + id)<0){
// 				node_ids.push('#node-' + id);
// 				node_label_ids.push('#node-label-' + id);
// 				selectedNodesArr.push('#node-' + id);
// 			}
// 		}
// 		if(node_ids.length == 0) return;
// 		var selectFroup = nodeGroup.selectAll(node_ids.toString()).attr('class','selected');
// 		redrawNode(selectFroup);
// 		nodeGroup.selectAll(node_label_ids.toString()).attr('class','selected');
// 		// node.append('path')
// 		opt.selectNode && opt.selectNode(graph.getSelection().node);
// 	}

// 	//选中的关系（多个）
// 	function selectedLinks(idsArr){
// 		var link_label_ids = [], link_ids = [];
// 		for(var i=0;i<idsArr.length;i++){
// 			var id = idsArr[i];
// 			if(selectedLinkLabelsArr.indexOf('#link-label-' + id)<0){
// 				link_ids.push('#link-'+id);
// 				link_label_ids.push('#link-label-' + id);
// 				selectedLinkLabelsArr.push('#link-label-' + id);
// 				selectedLinkLabelRectsArr.push('#link-label-rect-' + id);
// 			}
// 		}
// 		if(link_label_ids.length == 0) return;
		
// 		var link_label = linkTextGroup.selectAll(link_label_ids.toString());
// 		link_label.select('rect').attr('stroke',function (d) {
// 			return d.color || '#2296ff';
// 		});
// 		link_label.select("[type='linktext']").attr('class','selected');
// 		var link_data = linkGroup.selectAll(link_ids.toString()).data();
// 		link_data = link_data.filter(function(item){
// 			return 'forward' == item.direction || "reverse" == item.direction;
// 		});
// 		var link_marker = linkGroup.data(link_data).append("path")
// 		.attr("id", function(d){ return "link-mark-path-"+d.id; })
// 		.attr("d", "M2,-4 L10,0 L2,4 L6,0 L2,-4")
// 		.attr("markerWidth", "12").attr("markerHeight", "12").attr("viewBox", "0 0 12 12")
// 		.attr("orient", "auto").attr("stroke", "red").attr("stroke-width", "2")
// 		.append("animateMotion")
// 		.attr("begin","0s").attr("dur","3s").attr("rotate","auto").attr("repeatCount","indefinite")
// 		.attr("path",function(d){
// 			return linkGroup.select('#link-'+d.id).attr('d');
// 		});
// 		opt.selectLink && opt.selectLink(link_ids);
// 	}
	
// 	//选中的元素
// 	function selectElements(node_ids, link_ids){
// 		selectedNodes(node_ids);
// 		selectedLinks(link_ids);
// 		Thumbnail();
// 	}
	
// 	//清除选中的关系
// 	function clearLinkSelection(){
// 		if (selectedLinkLabelsArr.length > 0) {
// 			linkTextGroup.selectAll(selectedLinkLabelsArr.toString()).selectAll('text').attr('class','');
// 			linkTextGroup.selectAll(selectedLinkLabelsArr.toString()).select('rect').attr('stroke', '#ccc');
// 			var link_path_marker = [];
// 			for(var i=0;i<selectedLinkLabelsArr.length;i++){
// 				var nid = selectedLinkLabelsArr[i].replace('label','mark-path');
// 				link_path_marker.push(nid);
// 			}
// 			linkGroup.selectAll(link_path_marker.toString()).remove();
// 			selectedLinkLabelsArr = [];selectedLinkLabelRectsArr = [];
// 		}
// 	}
	
// 	//清除选中的实体
// 	function clearNodeSelection(){
// 		if (selectedNodesArr.length > 0) {
// 			var s_node = nodeGroup.selectAll(selectedNodesArr.toString());
// 			s_node.attr('class','');
// 			s_node.selectAll('text').filter(function(ele) {
// 				return !ele.tags.length;
// 			}).attr('class','');
// 			if(svg_scale > 0.5){
// 				s_node.select('circle').attr('r',function(d) {
// 					return opt.circle.r*(!d.exist ? 0.65 : 1);
// 				});
// 			}
// 			s_node.select('circle')
// 				.attr('stroke',function(d){
// 					return !d.exist ? '#a1a1a1' : d.isfixed ? opt.circle.fixedColor : (d.color || d.icon.color);
// 				})
// 				.attr('stroke-width', function(d){
// 					return !d.exist ? 3 : 5;
// 				})
// 				.attr('fill',function(d){
// 					if (!d.exist || (d.exist && d.image)) {
// 						return '#ffffff';
// 					}
// 					return d.isfixed ? opt.circle.fillColor : d.color ? '#fff' : d.icon.fill;
// 				})
// 				.filter(function(ele){
// 					return ele.useKeyNode;
// 				});
// 			s_node.select('g.lock').selectAll('circle')
// 				.attr('fill', opt.circle.fixedColor);
// 			s_node.select('path').attr('fill', function(d){
// 				if (!d.exist) {
// 					return '#a1a1a1';
// 				}
// 				return  d.isfixed ? opt.circle.fixedColor : (d.color || d.icon.color);
// 			});
// 			s_node.select('rect.noderect').attr('stroke', function(d){
// 				return d.isfixed ? opt.circle.fixedColor : (d.color || d.icon.color);
// 			});
// 			selectedNodesArr = [];
// 		}
// 	}
	
// 	//清除选中的元素
// 	function clearAllSelection(){
// 		clearNodeSelection();
// 		clearLinkSelection();
// 		Thumbnail();
// 	}

// 	function addElement () {
// 		graph.clearDOM();
// 		redrawContent();
// 		draw();
// 		viewData();
// 		Thumbnail();
// 	}
	
// 	function parseData (msg) {
// 		for (var i = 0; i < msg.nodes.length; i++) {
// 			nodeObjs.push(new Node(msg.nodes[i]));
// 		}
// 		for (var j = 0; j < msg.links.length; j++) {
// 			linkObjs.push(new Link(msg.links[j]));
// 		}
// 	}
	
// 	//a1是目标区域, a2是需要缩放的区域, sc是默认缩放比
// 	function AreaSelfAdaption(a1,a2,sc){
// 		var rx,ry,rc=sc;
// 		rc = (a2.height/a1.height)>rc? rc:(a2.height/a1.height);
// 		rc = (a2.width/a1.width)>rc? rc:(a2.width/a1.width);
// 		rc = rc*0.9;
// 		var boxWidth = parseInt(d3.select(opt.selector).style('width'));
// 		var boxHeight = parseInt(d3.select(opt.selector).style('height'));
// 		var viewWidth = document.getElementById(container.attr('id')).getBBox().width;
// 		if(a1.width > a2.width && a1.height > a2.height){
// 			rx = rx>Math.abs(a1.x)? rx:Math.abs(a1.x)-Math.abs(a1.x)+((boxWidth-154)/2)-((viewWidth*rc)/2);
// 			ry = ry>Math.abs(a1.y)? ry:Math.abs(a1.y)-Math.abs(a1.y)+(boxHeight/4);
// 		}else if(a1.width > a2.width){
// 			rx = Math.abs((a2.width*rc/2) - (Math.abs(a1.x)+(a1.width*rc/2)))*rc;
// 			ry = ((a1.y+a1.height)/2 - a2.height*rc/2)*rc;
// 		}else if(a1.height > a2.height){
// 			rx = (boxWidth-154)/2-((a1.width*rc)/2);
// 			ry = Math.abs((a2.height*rc/2) - (Math.abs(a1.y)+(a1.height*rc/2)))*rc;
// 		}else{
// 			rx = a1.x; ry = a1.y;  
// 		}
// 		return {x:rx,y:ry,k:rc};
// 	}
	
// 	function Thumbnail(){
// 		renderEnd = new Date().getTime();
// 		//console.log('图形渲染所用时间', calculateTime(forceEnd, renderEnd));
// 		//console.log('全部耗时', calculateTime(startTime, renderEnd));
	
// 		// return;
// 		var s = 100;
// 		var va = document.getElementById('viewArea').getBBox();
// 		var ntsvg = document.getElementsByClassName('svgNT')[0].getBBox();
// 		va.height += s; va.width += s;
// 		ThumbnailTR = AreaSelfAdaption(
// 			va, ntsvg, opt.NTConfig.ThumbnailSize, true
// 		);
// 		ThumbnailTR.x = (ThumbnailTR.x+s/2)*ThumbnailTR.k; ThumbnailTR.y = (ThumbnailTR.y+s/2)*ThumbnailTR.k;
// 		NT.attr("transform",'translate('+ThumbnailTR.x+','+ThumbnailTR.y+')scale('+ThumbnailTR.k+')');
		
// 		var NPath = "",LPath = "",SPath = "",ColorPath={};
// 		var r = opt.circle.r;
// 		node.filter(function(item,i){
// 			var x = item.x, y = item.y;
// 			var p = "M "+x+", "+y+" m -"+r+", 0 a "+r+","+r+" 0 1,0 "+(r*2)+",0 a "+r+","+r+" 0 1,0 -"+(r*2)+",0 ";
// 			if(item.color){
// 				ColorPath[item.color] || ( ColorPath[item.color] = "" );
// 				ColorPath[item.color] += p;
// 			}else if(selectedNodesArr.indexOf('#node-'+item.id)>=0){
// 				SPath += p;
// 			}else{
// 				NPath += p;
// 			}
// 		});
// 		link.filter(function(item,i){
// 			LPath += d3.select('#link-'+item.id).attr("d")+" ";
// 		});
// 		NTNode.attr("d",NPath); NTLink.attr("d",LPath); NTSelected.attr("d",SPath);
// 		for(var c in ColorPath){
// 			var ntc = NT.select('#NTColor-'+c.replace('#','-'));
// 			if(ntc.size()>0){
// 				ntc.select("path").attr("d",ColorPath[c]);
// 			}else{
// 				NT.append("g").attr("id","NTColor-"+c.replace('#','-'),true).append("path")
// 				.attr("stroke-width",1).attr("stroke",c).attr("fill",c).attr("d",ColorPath[c]);
// 			}
// 		}
// 		//console.log('缩略图渲染时间差', calculateTime(renderEnd, new Date().getTime()));
// 	}

// 	function TNViewArea(){
// 		var va = getViewArea();
// 		va[0][0] = va[0][0]*ThumbnailTR.k+ThumbnailTR.x;
// 		va[0][1] = va[0][1]*ThumbnailTR.k+ThumbnailTR.y;
// 		va[1][0] = va[1][0]*ThumbnailTR.k;
// 		va[1][1] = va[1][1]*ThumbnailTR.k;
// 		var w = opt.width*ThumbnailTR.k/svg_scale;
// 		var h = opt.height*ThumbnailTR.k/svg_scale;
// 		var svgNT = d3.select('.svgNT');
// 		var svgW = parseInt(svgNT.attr('width')), svgH = parseInt(svgNT.attr('height'));
		
// 		var x,y,w,h;
// 		if((va[1][0]-va[0][0])<svgW){
// 			if(va[0][0]<0){
// 				x = 0, w = w+va[0][0];
// 			}else{
// 				x = va[0][0];
// 			}
// 		}else if(va[0][0] > 0){
// 			x = va[0][0];
// 		}else{
// 			x = 0;
// 			w = va[1][0];
// 		}
		
// 		if((va[1][1]-va[0][1])<svgH){
// 			if(va[0][1]<0){
// 				y = 0, h = h+va[0][1];
// 			}else{
// 				y = va[0][1];
// 			}
// 		}else if(va[0][1]>0){
// 			y = va[0][1];
// 		}else{
// 			y = 0;
// 			h = va[1][1];
// 		}
		
// 		//最后校验
// 		x = x<0?0:x;
// 		y = y<0?0:y;
// 		w = w+x>svgW?svgW-x:w;
// 		h = h+y>svgH?svgH-y:h;
// 		if(!isNaN(x||y||w||h) && w>0 && h>0){
// 			NTViewArea.attr("d","M"+x+","+y+"h"+w+"v"+h+"h-"+w+"z");
// 		}
// 	}
	
// 	function redrawNode(group){
// 		group.select('circle').attr('r', function(d) {
// 			if (!d.exist) {
// 				return opt.circle.r*0.65;
// 			}
// 			return opt.circle.r
// 		})
// 		.attr('stroke', function(d){
// 			if (!d.exist) {
// 				return '#a1a1a1';
// 			}
// 			if (d.exist && d.image) {
// 				return '#f62400';
// 			}
// 			return d.color || d.icon.color;
// 		})
// 		.attr('stroke-width', function(d){
// 			return !d.exist ? 3 : 5;
// 		})
// 		.attr('fill', function(d){
// 			if (!d.exist ||(d.exist && d.image)) {
// 				return '#ffffff';
// 			}
// 			return d.isfixed ? opt.circle.fillColor : (d.color || d.icon.color);
// 		});
// 		group.select('g.lock').selectAll('circle')
// 		.attr('fill',function (d) {
// 			return opt.circle.fixedColor
// 		});
// 		group.select('path').attr('fill', function(d){
// 			if (!d.exist) {
// 				return '#a1a1a1';
// 			}
// 			return !d.isfixed ?'#fff' : opt.circle.fixedColor;
// 		});
// 		group.select('rect.noderect').attr('stroke', function(d){
// 			return d.color || d.icon.color;
// 		});
// 	}
	
// 	function setTransform(x,y,k){
// 		var thatZoom = graphContainer._groups[0][0].__zoom;
// 		thatZoom.x = svg_offsetX = x;
// 		thatZoom.y = svg_offsetY = y;
// 		thatZoom.k = svg_scale = k;
		
// 		container
// 			.transition()
// 			.duration(1000)
// 			.attr('transform','translate('+x+','+y+')scale('+k+')');
			
// 	}

// 	//初始化
// 	function initialize(){
// 		var width = opt.width, height = opt.height;
// 		simulation = d3.forceSimulation()
// 	    .force("link", d3.forceLink().id(function(d) {return d.id;}).distance(200))
// 	    .force("charge", d3.forceManyBody().strength(-1000).distanceMax(800))
// 	    .force("center", d3.forceCenter(width / 2, height / 2))
// 			.force('collision', d3.forceCollide(1).strength(0.5));
		
// 		var zoom = d3.zoom()
// 			.duration(150)
// 			.scaleExtent([.35,2])
// 			.extent([[-1, -1], [width + 1, height + 1]])
// 			.on("zoom", zoomed);
// 		d3.select(opt.selector).attr('position', 'relative');
// 		graphContainer = d3.select(opt.selector)
// 			.append("svg")
// 			.classed("svgGraph", true)
// 			.attr("width", opt.width)
// 			.attr("height", opt.height)
// 			.attr('style','display:none;')
// 			.call(zoom).on('dblclick.zoom', null);
        
// 		var nsvg = graphContainer.append("g");
// 		bg_rect = nsvg.append('rect')
//             .attr("width", "100%")
// 						.attr("height", "100%")
//             .style('fill', 'white')
//             .style('fill-opacity', 0);
// 		container = nsvg.append("g").attr("id","viewArea");
// 		g_main = container.append("g");
// 		linkGroup = container.append("g").attr("class", "links");
// 		linkTextGroup = container.append("g").attr("class", "link-labels");
// 		nodeGroup = container.append("g").attr("class", "nodes");

// 		NT = d3.select(opt.selector)
// 					.append("svg").classed("svgNT", true)
// 					.attr('style',function(){
// 						return opt.useNT ? '' : 'display:none';
// 					})
// 					.attr("width", opt.width*opt.NTConfig.ThumbnailSize)
// 					.attr("height", opt.height*0.3);
// 		NTRect = NT.append('rect')
// 							.attr("width", "100%")
// 							.attr("height", "100%")
// 							.style('fill', opt.NTConfig.NTRect_Fill);
// 		NTViewArea = NT.append('path')
// 									.attr('fill','none')
// 									.attr('stroke',opt.NTConfig.NTViewArea_Stroke)
// 									.attr('stroke-width',opt.NTConfig.NTViewArea_StrokeWidth)
// 									.attr("d","M0,0 L0,100 L100,100 L100,0 L0,0")
// 									.attr("fill-opacity", 0);
// 		NT = NT.append("g")
// 					.attr("transform","scale("+opt.NTConfig.ThumbnailSize+")")
// 					.attr('id','NT');
// 		NTNode = NT.append("g")
// 							.classed("NTNode",true)
// 							.append("path")
// 							.attr("stroke-width",opt.NTConfig.NTNode_StrokeWidth)
// 							.attr("stroke",opt.NTConfig.NTNode_Stroke)
// 							.attr("fill",opt.NTConfig.NTNode_Fill);
// 		NTLink = NT.append("g")
// 							.classed("NTLink",true)
// 							.append("path")
// 							.attr("stroke-width",opt.NTConfig.NTLink_StrokeWidth)
// 							.attr("stroke",opt.NTConfig.NTLink_Stroke)
// 							.attr("fill",opt.NTConfig.NTLink_Fill);
// 		NTSelected = NT.append("g")
// 									.classed("NTSelected",true)
// 									.append("path")
// 									.attr("stroke-width",opt.NTConfig.NTSelected_StrokeWidth)
// 									.attr("stroke",opt.NTConfig.NTSelected_Stroke)
// 									.attr("fill",opt.NTConfig.NTSelected_Fill);	
// 	}

// 	function testOpt() {
// 		if (!opt.icons.length) {
// 			alert('icons不存在！')
// 			return false;
// 		}
// 		return true;
// 	}
	
// 	/**
// 	 * 设置配置项属性 --对内
// 	 * @function setOptions
// 	 * @param {Object} msg - 配置参数
// 	 */
// 	graph.setOptions = function (msg) {
// 		for (var key in msg) {
// 			if (['circle', 'NTConfig'].indexOf(key) == -1) {
// 				opt[key] = msg[key] || opt[key];
// 			}
// 		}
// 		if(msg.circle){
// 			for (var key in msg.circle) {
// 				opt.circle[key] = msg.circle[key] || opt.circle[key]
// 			}
// 		}
// 		if (opt.NTConfig) {
// 			for (var key in msg.NTConfig) {
// 				opt.NTConfig[key] = msg.NTConfig[key] || opt.NTConfig[key]
// 			}
// 		}
// 	};
// 	/**
// 	 * 获取配置项
// 	 * @function getOptions
// 	 * @returns {Object}
// 	 */
// 	graph.getOptions = function () {
// 		return opt;
// 	};
// 	/**
// 	 * 设置icons
// 	 * @function setIcons
// 	 * @param {data} msg - 配置icons
// 	 */
// 	graph.setIcons = function (data) {
// 		if (data === undefined || data.length == 0) {
// 			alert('缺少icon图标');
// 			return false;
// 		}
// 		opt.icons = data;
// 	};
// 	/**
// 	 * 获取icons配置
// 	 * @function getIcons
// 	 * @returns {object}
// 	 */
// 	graph.getIcons = function () {
// 		return opt.icons;
// 	};
// 	/**
// 	 * 重启 - 对内
// 	 * @function restart
// 	 */
// 	graph.restart= function () {
// 		initIsFinish = false;
// 		isdraged = false;
// 		/**测试**/
// 		forceStart = new Date().getTime();
// 		/**测试**/
// 		simulation.restart();
// 		simulation.alpha(1);
// 	};
// 	/**
// 	 * 清除全部 - 对内
// 	 * @function clear
// 	 */
// 	graph.clear = function () {
// 		initOnce = true;
// 		nodeObjs = [];
// 		linkObjs = [];
// 		repeatViewId = {};
// 		repeatNodes = {};
// 		graph.clearDOM();
// 		nodeGroup.selectAll("g").data([]).exit().remove();
// 		linkGroup.selectAll("path").data([]).exit().remove();
// 		linkTextGroup.selectAll("g").data([]).exit().remove();
// 	};
// 	/**
// 	 * 清除DOM - 对内
// 	 * @function clearDOM
// 	 */
// 	graph.clearDOM = function () {
// 		linkGroup.selectAll('*').remove();
// 		nodeGroup.selectAll('*').remove();
// 		linkTextGroup.selectAll('*').remove();
// 	};
// 	/**
// 	 * 初始化svg
// 	 * @function init
// 	 */
// 	graph.init = function () {
// 		license.test(initialize,selfURL);
// 	}
// 	/**
// 	 * 载入数据
// 	 * @function load
// 	 * @param {object} msg - 需要载入的数据
// 	 */
// 	graph.load = function (msg) {
// 		if (!testOpt()) {
// 			return false;
// 		}
// 		startTime = new Date();
// 		//console.log('加载数据-',startTime)
// 		graph.clear();
// 		for (var i = 0; i < msg.nodes.length; i++) {
// 			var d = msg.nodes[i];
// 			if(repeatViewId[d.vid] == undefined){ //vid不存在
// 				repeatViewId[d.vid] = d.id;
// 			}else{ //vid已存在
// 				repeatNodes[d.id] = repeatViewId[d.vid];
// 				msg.nodes.splice(i,1);
// 			}
// 		}
// 		for (var j = 0; j < msg.links.length; j++) {
// 			repeatNodes[msg.links[j].source] && (msg.links[j].source = repeatNodes[msg.links[j].source]);
// 			repeatNodes[msg.links[j].target] && (msg.links[j].target = repeatNodes[msg.links[j].target]);
// 		}
// 		parseData (msg);
// 		graph.removeElements(msg)
// 		graph.restart();
// 		//console.log('加载实体个数：', nodeObjs.length)
// 		//console.log('加载关系个数：', linkObjs.length)
// 		redrawContent();
// 	};
// 	/**
// 	 * 添加单个实体
// 	 * @function addNode
// 	 * @param {object} ele - 单个实体数据
// 	 */
// 	graph.addNode = function (ele) {
// 		nodeObjs.push(new Node(ele));
// 		addElement();
// 	};
// 	/**
// 	 * 添加单个关系
// 	 * @function addLink
// 	 * @param {object} ele - 单个关系数据
// 	 */
// 	graph.addLink = function (ele) {
// 		linkObjs.push(new Link(ele));
// 		addElement();
// 	};
// 	/**
// 	 * 通过id移除关系数据
// 	 * @function removeLinkDataById
// 	 * @param {string} id - 需要移除的对象的id
// 	 */
// 	graph.removeLinkDataById = function(id){
// 		linkObjs = linkObjs.filter(function(ele){
// 			return ele.id != id;
// 		});
// 	};
// 	/**
// 	 * 通过起始点获取关系对象
// 	 * @function getLinkBySourceAndTarget
// 	 * @param {string} source - 起点对象id
// 	 * @param {string} target - 终点对象id
// 	 * @returns {Array}
// 	 */
// 	graph.getLinkBySourceAndTarget = function(source,target){
// 		return linkObjs.filter(function(ele){
// 			return (ele.source == source || ele.source == target) && (ele.target == source || ele.target == target);
// 		});
// 	};
// 	/**
// 	 * 关键词查询
// 	 * @function search
// 	 * @param {string} text - 关键词
// 	 */
// 	graph.search = function(text){
// 		if (!text) {
// 			alert('请输入要查找的内容！');
// 			return false;
// 		}
// 		var searchNodes = nodeObjs.filter(function(ele){
// 			if (!ele.exist) return false;
// 			if (ele.showProperties && ele.showProperties.length) {
// 				for (var i = 0; i < ele.showProperties.length; i++) {
// 					if((''+ele.properties[ele.showProperties[i]]).indexOf(text) != -1){
// 						return true;
// 					}
// 				}
// 			}else{
// 				for (var key in ele.properties) {
// 					if((''+ele.properties[key]).indexOf(text) != -1){
// 						return true;
// 					}
// 				}
// 			}
// 			return false;
// 		});
		
// 		var searchLinks = linkObjs.filter(function(ele){
// 			if (ele.showProperties && ele.showProperties.length) {
// 				for (var i = 0; i < ele.showProperties.length; i++) {
// 					if((''+ele.properties[ele.showProperties[i]]).indexOf(text) != -1){
// 						return true;
// 					}
// 				}
// 			}else{
// 				for (var key in ele.properties) {
// 					if((''+ ele.properties[key]).indexOf(text) != -1){
// 						return true;
// 					}
// 				}
// 			}
// 			return false;
// 		});

// 		if (!searchNodes.length && !searchLinks.length) {
// 			return false;
// 		}
// 		graph.selectedElements(searchNodes.map(function(ele) {
// 			return ele.id;
// 		}), searchLinks.map(function(ele) {
// 			return ele.id;
// 		}),'te');
// 		graph.centerSelection (searchNodes, searchLinks);
// 	};
// 	/**
// 	 * 通过标签查询
// 	 * @function searchByTag
// 	 * @param {string} tag - 标签
// 	 */
// 	graph.searchByTag = function(tag){
// 		var searchNodes = nodeObjs.filter(function(ele){
// 			for (var i = 0; i < ele.tags.length; i++) {
// 				if (tag == ele.tags[i]) {
// 					return true;
// 				}
// 			}
// 			return false;
// 		});
		
// 		var searchLinks = linkObjs.filter(function(ele){
// 			for (var i = 0; i < ele.tags.length; i++) {
// 				if (tag == ele.tags[i]) {
// 					return true;
// 				}
// 			}
// 			return false;
// 		});
// 		if (!searchNodes.length && !searchLinks.length) {
// 			return false;
// 		}
// 		/*
// 		graph.selectedElements(searchNodes.map(function(ele) {
// 			return ele.id;
// 		}), searchLinks.map(function(ele) {
// 			return ele.id;
// 		}));
// 		graph.centerSelection (searchNodes, searchLinks);
// 		*/
// 		return {
// 			nodes : searchNodes.map(function(ele) {
// 				return ele.id;
// 			}),
// 			links : searchLinks.map(function(ele) {
// 				return ele.id;
// 			})
// 		}
// 	}
// 	/**
// 	 * 居中选中
// 	 * @function centerSelection
// 	 * @param {Array} nodes - 选中的实体
// 	 * @param {Array} links - 选中的关系
// 	 */
// 	graph.centerSelection = function(nodes, links) {
// 		var arr = [];
// 		for (var i = 0; i < nodes.length; i++) {
// 			arr[i] =  nodes[i];
// 		}
// 		for (var i = 0; i < links.length; i++) {
// 			if (arr.indexOf(links[i].source) == -1) {
// 				arr.push(links[i].source);
// 			}
// 			if (arr.indexOf(links[i].target) == -1) {
// 				arr.push(links[i].target);
// 			}
// 		}
// 		var arrx = arr.map(function(ele) {
// 			return ele.x?ele.x:false;
// 		}).sort(function(a, b) {
// 			return a - b;
// 		});
// 		var arry = arr.map(function(ele) {
// 			return ele.y?ele.y:false;
// 		}).sort(function(a, b) {
// 			return a - b;
// 		});
// 		//待完善
// 		/**
// 			translate x,y 计算，
// 			即va.x/y计算 需要考虑arrx[0] 大于/小于 0
// 		**/
// 		var sh = (arry[arry.length-1]+100) - (arry[0] > 0 ? 0 : arry[0]);
// 		var sw = (arrx[arrx.length-1]+100) - (arrx[0] > 0 ? 0 : arrx[0]);
// 		var va = {
// 			height : sw,
// 			width : sh,
// 			x : (opt.width-(sw + 100))/2,
// 			y : (opt.height-(sh + 100))/2
// 		};
// 		// va.height += 100; va.width += 100;
// 		var sc = AreaSelfAdaption(
// 			va, {width:opt.width,height:opt.height}, 1
// 		);
// 		graph.selectedElements(nodes.map(function(ele){
// 			return ele.id;
// 		}), links.map(function(ele){
// 			return ele.id;
// 		}));
// 		setTransform(sc.x,sc.y,sc.k);
// 		viewData();
// 	};
// 	/**
// 	 * 锁定/解锁
// 	 * @function fixedNode
// 	 * @param {array} ids - nodeId数组
// 	 * @param {boolean} type - 状态
// 	 */
// 	graph.fixedNode = function (ids, type) {
// 		//var ids = graph.getSelection().node;
// 		nodeObjs.forEach(function(ele) {
// 			if (type == ele.isfixed) return;
// 			if (ids.indexOf(ele.id) !=-1) {
// 				ele.isfixed = type;
// 				var obj = d3.select('#node-' + ele.id);
// 				obj.select('circle')
// 					.attr('fill', function(d) {
// 						if (d.exist && d.image) {
// 							return '#fff';
// 						}
// 						return type ? opt.circle.fillColor : (d.color || d.icon.color);
// 					})
// 					.attr('stroke-width', function(d){
// 						return !d.exist ? 3 : 5;
// 					})
// 					.attr('stroke', function (d) {
// 						if (d.exist && d.image) {
// 							return '#f62400';
// 						}
// 						return d.color || d.icon.color;
// 					});
// 				obj.select('path').attr('fill', function (d) {
// 					if (!type) {
// 						d.fx = null;
// 						d.fy = null;
// 					}
// 					return type ? opt.circle.fixedColor  : '#fff';
// 				});
// 				obj.select('rect.noderect').attr('stroke', function (d) {
// 					return d.color || d.icon.color;
// 				});
// 				if (type) {
// 					var lock = obj.append('g').attr('class', 'lock');
// 						lock.append('circle').attr('transform', 'translate(0,-'+ opt.circle.r +')');
// 						lock.append('circle').attr('transform', 'translate('+ opt.circle.r +',0)');
// 						lock.append('circle').attr('transform', 'translate(0,'+ opt.circle.r +')');
// 						lock.append('circle').attr('transform', 'translate(-'+ opt.circle.r +',0)');
// 						lock.selectAll('circle').attr('r', 6).attr('stroke-width', 2).attr('stroke', '#fff').attr('fill', '#a1a1a1');
// 				}else{
// 					obj.select('g.lock').remove();
// 				}
// 			}
// 		});
// 	};
// 	/**
// 	 * 启用/禁用力导向
// 	 * @function useForce
// 	 * @param {boolean} type - 状态
// 	 */
// 	graph.useForce = function (type) {
// 		opt.useForce = type;
// 		if (type) {
// 			nodeObjs.forEach(function(ele){
// 				ele.fx = null;
// 				ele.fy = null;
// 			});
// 			simulation.restart();
// 		}
// 	};
	
// 	/**
// 	 * 获取选中对象 实体和线
// 	 * @function getSelection
// 	 * @returns {Object}
// 	 */
// 	graph.getSelection = function () {
// 		return {
// 			node : selectedNodesArr.map(function(ele){
// 				return ele.replace(/\#node\-/,"")
// 			}),
// 			link : selectedLinkLabelsArr.map(function(ele){
// 				return ele.replace(/\#link\-label\-/,"")
// 			})
// 		};
// 	};
// 	/**
// 	 * 获取数据
// 	 * @function getData
// 	 * @param {boolean} type - 类型(true关系带两端对象;false不带)
// 	 * @returns {Object} 
// 	 */
// 	graph.getData = function(type){
// 		var data = JSON.parse(JSON.stringify({
// 				links : linkObjs,
// 				nodes : nodeObjs
// 			}));
// 		if(type){
// 			return data;
// 		}else{
// 			return {
// 				links : data.links.map(function(link){
// 					link.source = link.source.id;
// 					link.target = link.target.id;
// 					return link;
// 				}), 
// 				nodes : data.nodes
// 			};
// 		}
// 	};
// 	/**
// 	 * 通过类型选取node
// 	 * @function selectedByType
// 	 * @param {String} nodeType - 类型
// 	 */
// 	graph.selectedByType = function (nodeType) {
// 		graph.selectedElements(nodeObjs.filter(function(ele) {
// 			return ele.nodeType == nodeType;
// 		}).map(function(ele){
// 			return ele.id;
// 		}),[]);
// 	}
// 	/**
// 	 * 导出数据(废弃)
// 	 * @function exportJson
// 	 * @returns {Object} 
// 	 */
// 	graph.exportJson = function(){
// 		// nodeObjs.forEach(ele=>{
// 		// 	nodeObjs.forEach(obj=>{
// 		// 		if(obj.id == ele.id){
// 		// 			ele.x = obj.x;
// 		// 			ele.y = obj.y;
// 		// 			ele.fx = obj.fx;
// 		// 			ele.fy = obj.fy;
// 		// 		}
// 		// 	});
// 		// });
// 		return graph.getData();
// 	};
	
// 	/**
// 	 * 设置关键节点
// 	 * @function setKeyNodes
// 	 * @param {array} nodeIds - nodeIds数组
// 	 * @param {boolean} type - 节点凸显状态
// 	 */
// 	graph.setKeyNodes = function(nodeIds, type){
// 		nodeObjs.map(function(node){
// 			if(nodeIds.indexOf(node.id)>=0){
// 				node.isKeyNode = type;
// 			}else{
// 				node.isKeyNode = !type;
// 			}
// 		})
// 	}
	
// 	/**
// 	 * 关键节点凸显/恢复
// 	 * @function showKeyNode
// 	 * @param {boolean} type - 节点凸显状态
// 	 */
// 	graph.showKeyNode = function(type) {
// 		var ids = nodeObjs.filter(function(ele){
// 			if (ele.isKeyNode) {
// 				ele.useKeyNode = type;
// 			}
// 			return ele.isKeyNode;
// 		}).map(function(ele){
// 			return '#node-' + ele.id;
// 		}).toString();
// 		viewData();
// 		Thumbnail();
// 		if(ids.length>0){
// 			nodeGroup.selectAll(ids).attr('transform',function(d){
// 				if (d.useKeyNode) {
// 					d.nodeScale = svg_scale <= 1 ? 1.5/svg_scale : svg_scale >= 1.5 ? 1 : 1.5;
// 				}else{
// 					d.nodeScale = 1;
// 				}
// 				return 'translate('+d.x+','+d.y+')' + (type ? 'scale('+ d.nodeScale +')' : '');
// 			});
// 		}
// 	};
	
// 	/**
// 	 * 加标签(废弃)
// 	 * @function addTag
// 	 * @param {Number} ids - 标签编号
// 	 * @param {String} text - 标签内容
// 	 */
// 	graph.addTag = function (ids,text) {
// 		console.log(ids,text,'num,text')
// 		if (!selectedNodesArr.length && !selectedLinkLabelsArr.length ) {
// 			alert('请选中实体或关系！');
// 			return false;
// 		}
// 		if (selectedNodesArr.length) {
// 			graph.addNodeTag(ids,text);
// 		}
// 		if (selectedLinkLabelsArr.length) {
// 			graph.addLinkTag(ids,text);
// 		}
// 	}
	
// 	/**
// 	 * 删除实体标签
// 	 * @function addTag
// 	 * @param {array} nodes - 标签编号
// 	 * @param {String} text - 标签内容
// 	 */
// 	graph.delNodeTag = function(nodes,text){
// 		d3.selectAll('#node-'+nodes.join(',#node-')).each(function(ele) {
// 			//删除标签
// 			//处理标签数据
// 			ele.tags = ele.tags.filter(function(el) {
// 				return el != text
// 			});
// 			nodeObjs.forEach(function(el) {
// 				if (el.id == ele.id) {
// 					el.tags = ele.tags;
// 				}
// 			});
			
// 			redrawNodeTag(this,ele.tags);
// 		});
// 	}
	
// 	/**
// 	 * 添加实体标签
// 	 * @function addNodeTag
// 	 * @param {Array} nodes - nodeId数组
// 	 * @param {String} text - 标签内容
// 	 */
// 	graph.addNodeTag = function (nodes,text) {
// 		d3.selectAll('#node-'+nodes.join(',#node-')).each(function(ele) {
// 			//添加标签
// 			//处理标签数据
// 			var samel = ele.tags.filter(function(el) {
// 				return el == text
// 			}).length;
// 			if (!samel) {
// 				ele.tags.push(text);
// 			}
// 			nodeObjs.forEach(function(el) {
// 				if (el.id == ele.id) {
// 					el.tags = ele.tags;
// 				}
// 			});
// 			console.log(this,ele.tags,'321331')
// 			redrawNodeTag(this,ele.tags);
// 		});
// 	}
	
// 	function redrawNodeTag(node,tags){
// 		var tag = d3.select(node).selectAll('.tag'), tagText;
// 		var rh = Number(d3.select(node).select('rect.noderect').attr('height'));
// 		var rw = Number(d3.select(node).select('rect.noderect').attr('width'));
// 		if (!tag.size()) {
// 			tag = d3.select(node)
// 				.append('g')
// 				.attr('class','tag') 
// 				.attr('transform','translate('+ (-14-rw/2) +','+ (opt.circle.r + rh/2 +6) +')');
// 			tag.append('rect').attr('class', 'tagrect');
// 			tag.append('text').attr('class', 'list');
// 		}

// 		if(tags.length>0){
			 

// 			tag.select('rect.tagrect')
// 				.attr('y', rh/2 +7)
// 				.attr('x', 14)
// 				.attr('fill', '#f2f2f2')
// 				.attr('rx', 10)
// 				.attr('ry', 10)
// 				.attr('height', function (d) {
// 					return d.tags.length*14 + 10;
// 				})
// 				.attr('width', function(d) {
// 					var arr = tags.map(function(el) {
// 						return el.length;
// 					}).sort(function(a, b) {
// 						return b - a;
// 					});
// 					var sw = (arr[0] > 10 ? 10 : arr[0])*10+34;
// 					return sw > rw ? sw : rw;
// 				})
				
			
// 			if (!tag.select('circle').size()) {
// 				tag.append('circle')
// 					.attr('class', 'tagcircle')
// 					.attr('r', 10)
// 					.attr('stroke-width', 1)
// 					.attr('stroke', '#ccc')
// 					.attr('fill', '#efefef');
// 				tag.append('text')
// 					.attr('class','tagnums')
// 					.attr('fill', 'red')
// 					.attr('text-anchor', 'middle')
// 					.attr('transform', 'translate(0,4)')
// 					.text(tags.length);
					
// 			}else{
// 				tag.select('text.tagnums').text(tags.length);
// 			};
// 			tag.select('text.list').selectAll('tspan').data([]).exit().remove();
// 			tag.select('text.list')
// 				.attr('y', rh/2 +7)
// 				.selectAll('tspan')
// 				.data(tags)
// 				.enter()
// 				.append('tspan')
// 				.attr('x', 30)
// 				.attr('dy', 14)
// 				.text(function(d){
// 					return d;
// 				});
// 		}else{
// 			tag.remove();
// 		}
// 	}
	
// 	/**
// 	 * 添加关系tag
// 	 * @function addLinkTag
// 	 * @param {Number} num - 标签编号
// 	 * @param {String} text - 标签内容
// 	 */
// 	graph.addLinkTag = function (num,text) {
// 		d3.selectAll(selectedLinkLabelsArr.join(',')).each(function(ele) {
// 			var tag = d3.select(this).selectAll('.tag'), tagText;
// 			var trans = d3.select(this).select('[type="linktext"]').attr('transform').match(/\(.+\)/)[0].slice(1,-1).split(',');
// 			var textsize = d3.select(this).select('[type="linktext"]').selectAll('text').size();
// 			if (!tag.size()) {
// 				tag = d3.select(this)
// 					.append('g')
// 					.attr('class','tag')
// 					.attr('transform','translate('+ trans[0] +','+ (trans[1] + (textsize == 2 ? 5 : 15)) +')');
// 			}
// 			if (tag.select('[alt="'+ num +'"]').size()) {
// 				tagText = tag.select('[alt="'+ num +'"]');
// 				tagText.select('.tagnum').text(num);
// 				tagText.select('.tagtext').text(text);
// 				for (var i = 0; i < ele.tags.length; i++) {
// 					if(ele.tags[i].num == num){
// 						ele.tags[i].text = text;
// 					};
// 				};
// 			}else{
// 				tagText = tag.append('text')
// 					.attr('y',tag.selectAll('text').size()*26)
// 					.attr('alt',num);
// 				tagText.append('tspan')
// 					.attr('class','tagnum')
// 					.attr('fill','red')
// 					.attr('font-size',18)
// 					.text(num);
// 				tagText.append('tspan')
// 					.attr('class','tagtext')
// 					.attr('fill','black')
// 					.text(text);
// 				ele.tags.push({
// 					num : num,
// 					text : text
// 				});
// 			};
// 		});
// 	}
// 	/* GCQ  */
// 	/**
// 	 * 清除选中 clearAllSelection
// 	 * @function clearAllSelection
// 	 */
// 	graph.clearAllSelection = function(){
// 		clearAllSelection();
// 	}
	
// 	/**
// 	 * 选中node or link  selectedElements
// 	 * @function selectedElements
// 	 * @param {Array} nodes - 实体id
// 	 * @param {Array} links - 关系id
// 	 */
// 	graph.selectedElements = function(nodes,links,te){
// 		clearAllSelection();
// 		selectElements(nodes,links);
// 	};
// 	/**
// 	 * 反选 
// 	 * @function invertSelection
// 	 */
// 	graph.invertSelection = function(){
// 		var invert_ids = [];
// 		node.filter(function(d){
// 			if(selectedNodesArr.indexOf('#node-'+d.id) == -1){
// 				invert_ids.push(d.id);
// 			}
// 			return false;
// 		});
// 		clearAllSelection();
// 		selectElements(invert_ids,[]);
// 	};
// 	/**
// 	 * 全选 selectedAll
// 	 * @function selectedAll
// 	 */
// 	graph.selectedAll = function(){
// 		clearAllSelection();
// 		var invert_ids = [];
// 		node.filter(function(d){
// 			if(selectedNodesArr.indexOf(d.id) == -1){
// 				invert_ids.push(d.id);
// 			}
// 			return false;
// 		});
// 		selectElements(invert_ids,[]);
// 	};
// 	/**
// 	 * 根据ID删除 
// 	 * @function romoveElementsById
// 	 * @param {Array} nodeids - 实体id
// 	 * @param {Array} linkids - 关系id
// 	 */
// 	graph.romoveElementsById = function(nodeids, linkids) {
// 		var delObj = {};
// 		var temp_link_arr = [], temp_link_label_arr = [];
// 		if(nodeids.length>0){
// 			var temp_nodeids = [];
// 			for (var i = 0; i < nodeids.length; i++) {
// 				var id = nodeids[i];
// 				temp_nodeids.push('#node-'+id);
// 				var link_s = "[source='node-" + id + "']";
// 				var link_t = "[target='node-" + id + "']";
// 				temp_link_arr.push(link_s);
// 				temp_link_arr.push(link_t);

// 				var link_label_s = "[source='link-label-" + id + "']";
// 				var link_label_t = "[target='link-label-" + id + "']";
// 				temp_link_label_arr.push(link_label_s);
// 				temp_link_label_arr.push(link_label_t);
				
// 				var index = selectedNodesArr.indexOf('#node-'+id);
// 				if(index >= 0){
// 					selectedNodesArr.splice(index,1);
// 				}
				
// 				var data = nodeGroup.select('#node-'+id).data();
// 				if(data.length>0){
// 					delete repeatViewId[data[0].vid];
// 				};
// 			}
			
// 			var t = nodeGroup.selectAll(temp_nodeids.toString());
// 			delObj['nodes'] = t.data();
// 			delObj['nodes'].forEach(function(item,index){
// 				if(!item.color){
// 					return false;
// 				}
// 				NT.select('#NTColor-'+item.color.replace('#','-')).remove();
// 			})
// 			t.remove();
// 			nodeObjs = graph.removeDeleted(nodeObjs,delObj['nodes']);
// 			node = graph.removeDeleted(node,delObj['nodes']);
// 		}
		
// 		if(linkids.length>0 || temp_link_arr.length>0){
// 			var temp_linkids = [], temp_linkTextids = [], temp_linkMark = [];
// 			var del_links_arr = [];
// 			for(var i = 0; i<linkids.length; i++){
// 				temp_linkids.push('#link-'+linkids[i]);
// 				temp_linkTextids.push('#link-label-'+linkids[i]);
// 				temp_linkMark.push('#link-mark-path-'+linkids[i]);
// 			}
			
// 			if(temp_linkids.length>0){
// 				linkTextGroup.selectAll(temp_linkTextids.toString()).remove();
// 				linkGroup.selectAll(temp_linkMark.toString()).remove();
				
// 				var t = linkGroup.selectAll(temp_linkids.toString());
// 				del_links_arr = t.data();
// 				t.remove();
// 				//删除对应的link
// 				del_links_arr.map(function(ele){
// 					temp_link_arr.push('#link-'+ele.id); return false;
// 				});
// 			}
			
// 			if(temp_link_arr.length>0) {
// 				t = linkGroup.selectAll(temp_link_arr.toString());
// 				del_links_arr = del_links_arr.concat(t.data());
// 				t.remove();
// 			}
// 			delObj['links'] = del_links_arr;
// 			linkObjs = graph.removeDeleted(linkObjs,delObj['links']);
// 			link = graph.removeDeleted(link,delObj['links']);
// 			linkText = graph.removeDeleted(linkText,delObj['links']);
			
// 			for(var i in del_links_arr){
// 				var index = selectedLinkLabelsArr.indexOf('#link-label-'+del_links_arr[i].id);
// 				if(index >= 0){
// 					selectedLinkLabelsArr.splice(index,1);
// 					selectedLinkLabelRectsArr.splice(index,1);
// 				};
// 			};
// 		}
		
// 		delObj = JSON.parse(JSON.stringify(delObj));
// 		if(delObj.nodes == undefined) { delObj['nodes'] = []; }
// 		if(delObj.links == undefined) { delObj['links'] = []; }
// 		var d_links = delObj['links'].filter(function(ele){
// 			ele['source'] = ele['source'].id;
// 			ele['target'] = ele['target'].id;
// 			return ele;
// 		});
// 		delObj['links'] = d_links;
		
// 		if(temp_link_label_arr.length>0){
// 			linkTextGroup.selectAll(temp_link_label_arr.toString()).remove();
// 		}
// 		if (JSON.stringify(delObj) === '{}') {
// 			return false;
// 		}else{
// 			delObjArr.push(delObj);
// 			draw();Thumbnail();
// 		};
// 	}
// 	/**
// 	 * 清除已删除项(数据)
// 	 * @function removeDeleted
// 	 * @param {object} obj 
// 	 * @param {Array} item
// 	 * @returns {Array}
// 	 */
// 	graph.removeDeleted = function (obj,item) {
// 		return obj.filter(function(ele){
// 			return item.map(function(el){
// 				return el.id;
// 			}).indexOf(ele.id) == -1;
// 		});
// 	}
// 	/**
// 	 * 撤销删除
// 	 * @function revokeDeleted
// 	 */
// 	graph.revokeDeleted = function() {
// 		if(delObjArr.length>0){
// 			var delObj = delObjArr[delObjArr.length-1];
// 			delObjArr.splice(delObjArr.length-1, 1);
// 			graph.addElements(delObj);
// 		}else{
// 			console.log('没有需要撤销的数据');
// 		};
// 	};
// 	/**
// 	 * 编辑元素
// 	 * @function editElement
// 	 * @param {String} id - id
// 	 * @param {String} key - key
// 	 * @param {String} val - 值
// 	 * @param {boolean} hidden - false:修改 properties true:修改hiddenProperties
// 	 */
// 	graph.editElement = function(id, key, val, hidden) {
// 		var last_selected = d3.select('[id*='+id+']');
// 		if(last_selected.size() == 1){
// 			//修改绑定属性
// 			var pro = last_selected.data()[0];
// 			if(hidden){
// 				pro['hiddenProperties'] = pro['hiddenProperties']?pro['hiddenProperties']:{};
// 				pro['hiddenProperties'][key] = val; 
// 			}else{
// 				pro['properties'] = pro['properties']?pro['properties']:{};
// 				pro['properties'][key] = val;
// 			}
// 			pro['showProperties'].indexOf(key)<0 && pro['showProperties'].push(key);
// 			if('node' == pro.type){
// 				last_selected.select('text').selectAll('tspan').data([]).exit().remove();
// 				last_selected.select('text').selectAll('tspan').data(function(){
// 					if (pro.isShowAll) {
// 						return pro.getPropList();
// 					}else{
// 						var arr = pro.getPropList().slice(0,2);
// 						arr.push('...');
// 						return arr;
// 					}
// 				}).enter().append('tspan').attr('dy', function(d, i) {
// 					return 14;
// 				}).attr('x', -1).text(function(d) {
// 					return d;
// 				});
// 			}else if('link' == pro.type){
// 				//关系修改 暂未实现
// 				var link_label = linkTextGroup.select('#link-label-'+pro.id);
// 				link_label.select("text[type='linktext']").selectAll("tspan").remove();
// 				link_label.select("text[type='linktext']")
// 				.selectAll('tspan').data(function(d) {
// 				  return [d.getPropList()[0]];
// 				}).enter().append('tspan').attr('x',0)
// 			    .attr('dy',function(text,i,arr){
// 			    	return i==0? (arr.length-1)*-15/2:15;
// 			    }).text(function(d) {
// 			        return d;
// 			    });
			    
// 				link_label.select('.linkrect')
// 				.attr('width',function(d){
// 					return document.getElementById('link-text-' + d.id).getBBox().width + (d.getPropLength() >1 ? 40 : 30);
// 				})
// 				.attr('height',function(d){
// 					return document.getElementById('link-text-' + d.id).getBBox().height +15;
// 				});
// 			};
// 		};
// 	};
// 	/**
// 	 * 选取两端和对端   selectedPath 选取路径上的节点(node,link)
// 	 * @function selectedBothEnds
// 	 * @param {Array} nodeids - 实体id
// 	 * @param {Array} linkids - 关系id
// 	 * @param {String} selectedPath
// 	 */
// 	graph.selectedBothEnds = function(nodeids, linkids, selectedPath){
// 		var s_nodes = [], s_links = [];
// 		if(nodeids.length>0){
// 			selectedPath && (s_nodes = nodeids);
// 			linkObjs.filter(function(ele){
// 				return nodeids.indexOf(ele.source.id)>=0 || nodeids.indexOf(ele.target.id)>=0;
// 			}).map(function(link){
// 				var end1id = link.source.id;
// 				var end2id = link.target.id;
// 				if(selectedPath){
// 					s_links.push(link.id);
// 					if(s_nodes.indexOf(end1id)==-1){ s_nodes.push(end1id); }
// 					if(s_nodes.indexOf(end2id)==-1){ s_nodes.push(end2id); }
// 				}else{
// 					if(s_nodes.indexOf(end1id)==-1 && nodeids.indexOf(end1id) == -1){ s_nodes.push(end1id); }
// 					if(s_nodes.indexOf(end2id)==-1 && nodeids.indexOf(end2id) == -1){ s_nodes.push(end2id); }
// 				};
// 			});
			
// 		}
		
// 		if(linkids.length>0){
// 			linkObjs.filter(function(ele){
// 				return linkids.indexOf(ele.id)>=0;
// 			}).map(function(link){
// 				var end1id = link.source.id;
// 				var end2id = link.target.id;
// 				selectedPath && s_links.push(link.id);
// 				s_nodes.push(end1id); s_nodes.push(end2id);
// 			});
// 		}
// 		graph.selectedElements(s_nodes, s_links);
// 	}
// 	/**
// 	 * 根据link获得两端node
// 	 * @function getLinkNodes
// 	 * @param {String} id - 关系id
// 	 * @returns {Object}
// 	 */
// 	graph.getLinkNodes = function(id){
// 		var l = linkObjs.filter(function(ele){
// 			return id == ele.id;
// 		});
// 		return {
// 			"source" : l[0].getSource(),
// 			"target" : l[0].getTarget()
// 		};
// 	}
// 	/**
// 	 * 根据node获得link
// 	 * @function getNodeLinks
// 	 * @param {String} id - 实体id
// 	 * @returns {Array}
// 	 */
// 	graph.getNodeLinks = function(id){
// 		var n = nodeObjs.filter(function(ele){
// 			return id == ele.id;
// 		});
// 		return n.length>0?n[0].getLinks():[];
// 	}
// 	/**
// 	 * 获得可视区域
// 	 * @function getViewArea
// 	 * @returns {object}
// 	 */
// 	graph.getViewArea = function(){
// 		return getViewArea();
// 	}
// 	/**
// 	 * 批量删除nodes/links
// 	 * @function removeElements
// 	 * @param {array} new_data - 新数据
// 	 */
// 	graph.removeElements = function (data) {
// 		nodeGroup.selectAll("g").data(data.nodes).exit().remove();
// 		linkGroup.selectAll("path").data(data.links).exit().remove();
// 		linkTextGroup.selectAll("g").data(data.links).exit().remove();
// 	} 
	
// 	/**
// 	 * 获得当前Nodes所有类型
// 	 * @function getNodeTypes
// 	 * @returns {array}
// 	 */
// 	graph.getNodeTypes = function(){
// 		var nodeType = new Object();
// 		nodeObjs.map(function(node){
// 			nodeType[node.nodeType] = true;
// 		});
		
// 		var arr = [];
// 		for(var k in nodeType){
// 			arr.push(k);
// 		}
		
// 		return arr;
// 	}
	
// 	/**
// 	 * 批量添加nodes/links
// 	 * @function addElements
// 	 * @param {array} new_data - 添加的数据
// 	 */
// 	graph.addElements = function (new_data) {
// 		if(!dataIsInit){ dataIsInit = true; graph.load(new_data); return; }
		
// 		linkGroup.selectAll('*').remove();
// 		nodeGroup.selectAll('*').remove();
// 		linkTextGroup.selectAll('*').remove();
		
// 		if(new_data.nodes && new_data.nodes.length){
// 			var new_nodeObjs = [], new_data_nodes = [];
// 			for (var i = 0; i < new_data.nodes.length; i++) {
// 				var d = new_data.nodes[i];
// 				if(repeatViewId[d.vid] == undefined){ //vid不存在
// 					repeatViewId[d.vid] = d.id;
// 					new_nodeObjs.push(new Node(d));
// 					new_data_nodes.push(d);
// 				}else{ //vid已存在
// 					repeatNodes[d.id] = repeatViewId[d.vid];
// 				};
// 			}
// 			nodeObjs = nodeObjs.concat(new_nodeObjs);
// 		}
// 		if(new_data.links && new_data.links.length){
// 			var new_linkObjs = [], new_data_links = [];
// 			for (var i = 0; i < new_data.links.length; i++) {
// 				var l = new_data.links[i];
// 				if(repeatNodes[l.source] != undefined){ l.source = repeatNodes[l.source]; }
// 				if(repeatNodes[l.target] != undefined){ l.target = repeatNodes[l.target]; }
// 				new_linkObjs.push(new Link(l));
// 				new_data_links.push(l);
// 			}
// 			linkObjs = linkObjs.concat(new_linkObjs);
// 		}
		
// 		redrawContent();
// 		draw();
// 		viewData();
// 		Thumbnail();
// 		count = 0; addEvent();
// 	};
// 	/**
// 	 * 窗口自适应
// 	 * @function displayAdapt
// 	 */
// 	graph.displayAdapt = function(){
// 		var va = document.getElementById('viewArea').getBBox();
// 		va.height += 100; va.width += 100;
// 		var sc = AreaSelfAdaption(
// 			va, {width:opt.width,height:opt.height}, 1
// 		);
// 		setTransform(sc.x,sc.y,sc.k);
// 		viewData();
// 	};
// 	/**
// 	 * 设置svg大小
// 	 * @function setSize
// 	 * @param {object} size - svg大小
// 	 * @param {Number} num - 略缩图距离浏览器左边的距离（可以省略）
// 	 */
// 	graph.setSize = function (size,num) {
// 		d3.select('svg')
// 		.attr('width', size.width)
// 		.attr('height', size.height);
// 		if (!document.querySelector('.svgGraph')) {
// 			return false;
// 		}
// 		var svgGraph = document.querySelector('.svgGraph').getBoundingClientRect();
// 		d3.select('svg.svgNT').attr('style', 'left:' + ((svgGraph.left || num)+25) + 'px');
// 		graph.displayAdapt();
// 	}
// 	/**
// 	 * 导出图片
// 	 * @function exportPic
// 	 * @param {String} name 导出的文件名
// 	 */
// 	graph.exportPic = function(name){
// 		stop_ticked = true;
// 		var limit = 100;
// 		// var va = document.getElementById('viewArea').getBBox();
// 		// d3.select('.svgGraph').attr('width',va.width+limit).attr('height',va.height+limit);
		
// 		// var svg = document.getElementsByClassName('svgGraph')[0].getBBox();
// 		// var tr = 'translate('+ (-va.x+limit/2)+','+ (-va.y+limit/2) +')scale(1)';
// 		// container.attr('transform',tr);
// 		// viewData(true);
		
// 		// saveAsPng.saveSvgAsPng(document.querySelector("svg"), name + ".png");//保存成图片
// 		// saveAsPng.svgAsDataUri(document.querySelector("svg"), {}, function(uri) {//转换成base64编码
//     //         var img = new Image();
//     //         img.src = uri;
//     //         var canvas = document.createElement('canvas');
//     //         var content = canvas.getContext('2d');
//     //         img.onload = function(){
// 		// 		content.drawImage(img,0,0);
//     //             canvas.toDataURL();
//     //             d3.select('.svgGraph').attr('width',opt.width).attr('height',opt.height);
// 		// 		container.attr('transform','translate('+svg_offsetX+','+svg_offsetY+')scale('+svg_scale+')');
// 		// 		viewData();
// 		// 		stop_ticked = false;
//     //         };
//     //     });
// 	}
	
// 	/**
// 	 * 导出图片
// 	 * @function exportPicForBase64
// 	 * @param {function} fun 回调函数,会把base64传入
// 	 * @return {string} base64 当前svg的base64
// 	 */
// 	graph.exportPicForBase64 = function(fun){
// 		stop_ticked = true;
// 		var limit = 100;
// 		var va = document.getElementById('viewArea').getBBox();
// 		d3.select('.svgGraph').attr('width',va.width+limit).attr('height',va.height+limit);
		
// 		var svg = document.getElementsByClassName('svgGraph')[0].getBBox();
// 		var tr = 'translate('+ (-va.x+limit/2)+','+ (-va.y+limit/2) +')scale(1)';
// 		container.attr('transform',tr);
// 		viewData(true);
		
// 		saveAsPng.svgAsPngUri(document.querySelector("svg"), {}, function(uri) {//转换成base64编码
//             fun(uri);
//         });	
// 	}
	
// 	/**
// 	 * 获取重复数据
// 	 * @function getRepeatData
// 	 * @param {Array} msg
// 	 * @returns {Object}
// 	 */
// 	graph.getRepeatData = function(msg){
// 		return {
// 			viewId:repeatViewId, 
// 			nodesId:repeatNodes
// 		};
// 	}
// 	/**
// 	 * 选取单个对象
// 	 * @function select
// 	 * @param {string} ids - 查询id
// 	 * @returns {Array}
// 	 */
// 	graph.select = function(ids){
// 		return d3.select(ids);
// 	}
// 	/**
// 	 * 选取多个对象
// 	 * @function selectAll
// 	 * @param {string} ids - 查询ids
// 	 * @returns {Array}
// 	 */
// 	graph.selectAll = function(ids){
// 		return d3.selectAll(ids);
// 	}
// 	/**
// 	 * 修改实体颜色
// 	 * @function editNodeColor
// 	 * @param {Array} ids - 需要修改的id
// 	 * @param {string} color - 色值
// 	 */
// 	graph.editNodeColor = function(ids, color){
// 		if(ids.length == 0){ return ; }
// 		var nids = ids.map(function(ele){
// 			return '#node-'+ele;
// 		});
// 		var group = nodeGroup.selectAll(nids.toString());
// 		var data = group.data();
// 		data.map(function(ele){ ele.color = color; });
// 		redrawNode(group);
// 		NT.selectAll('[id*=NTColor-]').remove();
// 		Thumbnail();
// 	};
// 	/**
// 	 * 修改关系颜色
// 	 * @function editLinkColor
// 	 * @param {Array} ids - 需要修改的关系的id
// 	 * @param {string} color - 色值
// 	 */
// 	graph.editLinkColor = function(ids, color){
// 		if(ids.length == 0){ return ; }
// 		var lids=[],llids=[];
// 		for(var i in ids){
// 			lids.push('#link-'+ids[i]);
// 			llids.push('#link-label-'+ids[i]);
// 		}
// 		var group = d3.selectAll(lids.toString());
// 		var data = group.data();
// 		data.map(function(ele){ ele.color = color; });
// 		group.attr("stroke",color);
		
// 		var link_label = linkTextGroup.selectAll(llids.toString());
// 		link_label.select('rect').attr('stroke',function (d) {
// 			return d.color || '#2296ff';
// 		});
// 	};
// 	/**
// 	 * 修改关系连线宽度
// 	 * @function editLinkWidth
// 	 * @param {Array} ids - 需要修改的关系的id
// 	 * @param {Number} w - 宽度
// 	 */
// 	graph.editLinkWidth = function(ids, w){
// 		if(ids.length == 0){ return ; }
// 		var lids = ids.map(function(ele){
// 			return '#link-'+ele;
// 		});
// 		var group = d3.selectAll(lids.toString());
// 		var data = group.data();
// 		data.map(function(ele){ ele.value = w; });
// 		group.attr("stroke-width", w);
// 	};

	
// 	/**
// 	 * 模拟触发按键事件
// 	 * @function simulationEvent
// 	 * @param {String} type - 事件类型 ctrl/shift
// 	 */
// 	graph.simulationEvent = function(type){
// 		simulationEventType = type;
// 		bgclick();
// 	};
	
	
// 	/**
// 	 * 根据ID获得node数据
// 	 * @function getNodeDataById
// 	 * @param {String} id - nodeId
// 	 * @returns {object}
// 	 */
// 	graph.getNodeDataById = function(id){
// 		var node = graph.getData().nodes.filter(function(node){
// 			return node.id == id;
// 		});
// 		if(node.length>0){
// 			return node[0];
// 		}else{
// 			return null;
// 		}
// 	}
	
	
// 	/**
// 	 * 设置过滤类型
// 	 * @function setFilterType
// 	 * @param {String} type - 隐藏的类型
// 	 * @param {boolean} hide - 是否隐藏
// 	 */
// 	graph.setFilterType = function(type,hide){
// 		//filterTypeArray
// 		if(hide){
			
// 		}else{
			
// 		}
// 	}
	
// 	return graph;
// };

// /***/ }),
// /* 6 */
// /***/ (function(module, exports) {

// /**
//  * 画图方法
//  */
// module.exports = (function () {

// 	var tools = {};
// 	tools.test = function() {
// 		console.log(222)
// 	}

// 	tools.test = function() {
// 		console.log(222)
// 	}
// 	tools.calStrWidth = function(str,w){
//     //calculate string width
//     var full = (function(str){
//       var re=/[\u4E00-\u9FA5]|[\uff00-\uffff]|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5/g;
//       if(re.test(str)){
//         return str.match(re).length;
//       }else{
//         return 0 ;
//       }
//     }(str));
//     var len =str.length;
//     return Math.ceil((len + full)*w/2);
//   }

// 	return function () {
// 		return tools;
// 	};
// })();


// // module.exports = function () {

// //   var tools = {};
// //   tools.test = function() {
// //     console.log(222)
// //   }

// //   tools.test = function() {
// //     console.log(222)
// //   }
// //   tools.calStrWidth = function(str,w){
// //     //calculate string width
// //     var full = (function(str){
// //       re=/[\u4E00-\u9FA5]|[\uff00-\uffff]|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5/g;
// //       if(re.test(str)){
// //         return str.match(re).length;
// //       }else{
// //         return 0 ;
// //       }
// //     }(str));
// //     var len =str.length;
// //     return Math.ceil((len + full)*w/2);
// //   }

// //   return tools;
// // };


// /***/ }),
// /* 7 */
// /***/ (function(module, exports, __webpack_require__) {

// var tools = __webpack_require__(6)()
// module.exports = function (graph) {
// 	/**
// 	 * 实体对象
// 	 * @class Node
// 	 * @constructor Node
// 	 * @property {string} type - 类型
// 	 * @property {Array} links - 关系
// 	 * @property {Array} tags  - 标签
// 	 * @property {Boolean} isfixed - 锁定状态
// 	 * @property {Boolean} useKeyNode - 关键节点
// 	 * @property {Boolean} isShowAll - 是否全部展示
// 	 * @property {Boolean} showTags - 标签显示状态
// 	 * @property {Number} nodeScale - 实体缩放大小
// 	 * @property {String} icon - 实体图标
// 	 */
// 	function Node(data){
// 		for (var key in data) {
// 			this[key] = data[key];
// 		}
// 		this.type = 'node';
// 		this.links = [];
// 		this.tags = [];
// 		this.isfixed = false;
// 		this.useKeyNode = false;
// 		this.isShowAll = false;
// 		this.showTags = false;
// 		this.nodeScale = 1;
// 		this.icon = this.getIcon();
// 	}
// 	Node.prototype = {
// 		/**
// 		 * 获取 nodeType
// 		 * @function getType
// 		 * @memberof Node.prototype
// 		 * @returns {String}
// 		 */
// 		getType :  function() {
// 			return this.nodeType;
// 		},
// 		/**
// 		 * 获取 vid
// 		 * @function getKey
// 		 * @memberof Node.prototype
// 		 * @returns {String}
// 		 */
// 		getKey :  function() {
// 			return this.vid;
// 		},
// 		/**
// 		 * 获取 关系
// 		 * @function getLinks
// 		 * @memberof Node.prototype
// 		 * @returns {Array}
// 		 */
// 		getLinks : function () {
// 			var me = this;
// 			return graph.getData().links.filter(function(ele){
// 				return ele.source == me.id || ele.target == me.id;
// 			});
// 		},
// 		/**
// 		 * 获取 id
// 		 * @function getId
// 		 * @memberof Node.prototype
// 		 * @returns {String}
// 		 */
// 		getId : function () {
// 			return this.id;
// 		},
// 		/**
// 		 * 获取 选中项
// 		 * @function getSelection
// 		 * @memberof Node.prototype
// 		 * @returns {Array}
// 		 */
// 		getSelection : function(){
// 			return d3.select('#node-' + this.id);
// 		},
// 		/**
// 		 * 获取 与实体相连的实体
// 		 * @function getSiblings
// 		 * @memberof Node.prototype
// 		 * @returns {Array}
// 		 */
// 		getSiblings : function () {
// 			var arr = [],temp = '';
// 			var objs = this.getLinks();
// 			for (var i = 0; i < objs.length; i++) {
// 				temp = this.id == objs[i].source ? objs[i].target : objs[i].source;
// 				if (arr.indexOf(temp) == -1) {
// 					arr.push(temp);
// 				}
// 			}
// 			return arr;
// 		},
// 		/**
// 		 * 获取 实体properties
// 		 * @function getPropList
// 		 * @memberof Node.prototype
// 		 * @returns {Array}
// 		 */
// 		getPropList : function() {
// 			var arr = [];
// 			for(var key in this.properties){
// 				//清除空值 && (!this.showProperties.length || this.showProperties.indexOf(key) != -1)
// 				if (this.properties[key] && (!this.showProperties ? true : (!this.showProperties.length || this.showProperties.indexOf(key) != -1))) {
// 					arr.push(this.properties[key]);
// 				}
// 			}
// 			return arr;
// 		},
// 		/**
// 		 * 获取 实体properties最大宽
// 		 * @function getPropWidth
// 		 * @memberof Node.prototype
// 		 * @returns {Number}
// 		 */
// 		getPropWidth: function () {
// 			var lenArr = this.getPropList().map(function(ele){
// 				return tools.calStrWidth(ele.toString(), 10)
// 			})
// 			lenArr = lenArr.sort(function(a, b) {
// 				return b - a;
// 			});
// 			if (lenArr.length) {
// 				return lenArr[0]
// 			}
// 			return 0;
// 		},
// 		/**
// 		 * 获取 实体properties最大高
// 		 * @function getPropHeight
// 		 * @memberof Node.prototype
// 		 * @returns {Number}
// 		 */
// 		getPropHeight: function() {
// 			return this.getPropLength()*(12+4);
// 		},
// 		/**
// 		 * 获取 实体properties数据的length属性
// 		 * @function getPropLength
// 		 * @memberof Node.prototype
// 		 * @returns {Number}
// 		 */
// 		getPropLength : function() {
// 			return this.getPropList().length;
// 		},
// 		/**
// 		 * 获取 实体 icon
// 		 * @function getIcon
// 		 * @memberof Node.prototype
// 		 * @returns {String}
// 		 */
// 		getIcon : function(){
// 			var icons = graph.getIcons(), sex = ['女', 0, 'female'];	
// 			for (var i = 0; i < icons.length; i++) {
// 				if (icons[i].type == this.iconType) {
// 					if (sex.indexOf(this.properties.XB) != -1 || sex.indexOf(this.properties.gender) != -1) {
// 						var icon = {}
// 						for (var key in icons[i]) {
// 							icon[key] = icons[i][key];
// 						}
// 						icon.path = icons[i].path_n;
// 						return icon;
// 					}
// 					return icons[i];
// 				}
// 			}
// 		},
// 		/**
// 		 * 设置 实体 color 属性
// 		 * @function setColor
// 		 * @memberof Node.prototype
// 		 * @param {String} color - 色值
// 		 */
// 		setColor : function(color){
// 			graph.editNodeColor([this.id],color);
// 		}
// 	}
// 	return Node;
// };


// /***/ }),
// /* 8 */
// /***/ (function(module, exports, __webpack_require__) {

// var tools = __webpack_require__(6)()
// module.exports = function (graph) {
// 	/**
// 	 * 关系对象
// 	 * @class Link
// 	 * @constructor Link
// 	 * @property {string} type - 类型
// 	 * @property {Array} tags  - 标签
// 	 */
// 	function Link(data){
// 		for (var key in data) {
// 			this[key] = data[key];
// 		}
// 		this.type = 'link';
// 		this.tags = [];
// 	}
// 	Link.prototype = {
// 		/**
// 		 * 获取 source
// 		 * @function getSource
// 		 * @memberof Link.prototype
// 		 * @returns {String}
// 		 */
// 		getSource : function() {
// 			return this.source;
// 		},
// 		/**
// 		 * 获取 target
// 		 * @function getTarget
// 		 * @memberof Link.prototype
// 		 * @returns {String}
// 		 */
// 		getTarget : function() {
// 			return this.target;
// 		},
// 		/**
// 		 * 获取 id
// 		 * @function getId
// 		 * @memberof Link.prototype
// 		 * @returns {String}
// 		 */
// 		getId : function() {
// 			return this.id;
// 		},
// 		/**
// 		 * 获取 关系properties
// 		 * @function getPropList
// 		 * @memberof Link.prototype
// 		 * @returns {Array}
// 		 */
// 		getPropList : function() {
// 			var arr = [];
// 			for(var key in this.properties){
// 				//清除空值 && (!this.showProperties.length || this.showProperties.indexOf(key) != -1)
// 				if (this.properties[key] && (!this.showProperties ? true : (!this.showProperties.length || this.showProperties.indexOf(key) != -1))) {
// 					arr.push(this.properties[key]);
// 				}
// 			}
// 			return arr;
// 		},
// 		/**
// 		 * 获取 关系properties最大宽
// 		 * @function getPropWidth
// 		 * @memberof Link.prototype
// 		 * @returns {Number}
// 		 */
// 		getPropWidth: function () {
// 			var lenArr = this.getPropList().map(function(ele){
// 				return tools.calStrWidth(ele.toString(), 10)
// 			})
// 			lenArr = lenArr.sort(function(a, b) {
// 				return b - a;
// 			});
// 			if (lenArr.length) {
// 				return lenArr[0] + (this.getPropLength() >1 ? 40 : 35)
// 			}
// 			return 0;
// 		},
// 		/**
// 		 * 获取 关系properties最大高
// 		 * @function getPropHeight
// 		 * @memberof Link.prototype
// 		 * @returns {Number}
// 		 */
// 		getPropHeight: function() {
// 			return 16+15;
// 		},
// 		/**
// 		 * 获取 关系properties数据的length属性
// 		 * @function getPropLength
// 		 * @memberof Link.prototype
// 		 * @returns {Number}
// 		 */
// 		getPropLength : function() {
// 			return this.getPropList().length;
// 		},
// 		/**
// 		 * 获取 中心点
// 		 * @function getCenter
// 		 * @memberof Link.prototype
// 		 * @returns {Object}
// 		 */
// 		getCenter : function() {
// 			var x = (this.source.x + this.target.x)/2;
// 			var y = (this.source.y + this.target.y)/2;
// 			return {
// 				x : x,
// 				y : y
// 			};
// 		},
// 		/**
// 		 * 设置 关系 color 属性
// 		 * @function setColor
// 		 * @memberof Link.prototype
// 		 * @param {String} color - 色值
// 		 */
// 		setColor : function(color){
// 			graph.editLinkColor([this.id],color);
// 		},
// 		/**
// 		 * 设置 关系联系 width 属性
// 		 * @function setWidth
// 		 * @memberof Link.prototype
// 		 * @param {Number} num - 宽度值
// 		 */
// 		setWidth : function(num){
// 			graph.editLinkWidth([this.id], num);
// 		}
// 	}
// 	return Link;
// };

// /***/ }),
// /* 9 */
// /***/ (function(module, exports, __webpack_require__) {

// var __WEBPACK_AMD_DEFINE_RESULT__;/**
//  * 将svg保存为png图片
//  */
// module.exports = function () {
// //---svg2png start---
// 	var out$ =  true && exports ||  true && {} || this;

//   var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

//   function isElement(obj) {
//     return obj instanceof HTMLElement || obj instanceof SVGElement;
//   }

//   function requireDomNode(el) {
//     if (!isElement(el)) {
//       throw new Error('an HTMLElement or SVGElement is required; got ' + el);
//     }
//   }

//   function isExternal(url) {
//     return url && url.lastIndexOf('http',0) == 0 && url.lastIndexOf(window.location.host) == -1;
//   }

//   function inlineImages(el, callback) {
//     requireDomNode(el);

//     var images = el.querySelectorAll('image'),
//         left = images.length,
//         checkDone = function() {
//           if (left === 0) {
//             callback();
//           }
//         };

//     checkDone();
//     for (var i = 0; i < images.length; i++) {
//       (function(image) {
//         var href = image.getAttributeNS("http://www.w3.org/1999/xlink", "href");
//         if (href) {
//           if (isExternal(href.value)) {
//             console.warn("Cannot render embedded images linking to external hosts: "+href.value);
//             return;
//           }
//         }
//         var canvas = document.createElement('canvas');
//         var ctx = canvas.getContext('2d');
//         var img = new Image();
//         img.crossOrigin = "Anonymous";
//         href = href || image.getAttribute('href');
//         if (href) {
//           img.src = href;
//           img.onload = function() {
//             canvas.width = img.width;
//             canvas.height = img.height;
//             ctx.drawImage(img, 0, 0);
//             image.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL('image/png'));
//             left--;
//             checkDone();
//           }
//           img.onerror = function() {
//             console.log("Could not load "+href);
//             left--;
//             checkDone();
//           }
//         } else {
//           left--;
//           checkDone();
//         }
//       })(images[i]);
//     }
//   }

//   function styles(el, selectorRemap) {
//     var css = "";
//     var sheets = document.styleSheets;
//     for (var i = 0; i < sheets.length; i++) {
//       try {
//         var rules = sheets[i].cssRules;
//       } catch (e) {
//         console.warn("Stylesheet could not be loaded: "+sheets[i].href);
//         continue;
//       }

//       if (rules != null) {
//         for (var j = 0; j < rules.length; j++) {
//           var rule = rules[j];
//           if (typeof(rule.style) != "undefined") {
//             var match, selectorText;

//             try {
//               selectorText = rule.selectorText;
//             } catch(err) {
//               console.warn('The following CSS rule has an invalid selector: "' + rule + '"', err);
//             }

//             try {
//               if (selectorText) {
//                 match = el.querySelector(selectorText);
//               }
//             } catch(err) {
//               console.warn('Invalid CSS selector "' + selectorText + '"', err);
//             }

//             if (match) {
//               var selector = selectorRemap ? selectorRemap(rule.selectorText) : rule.selectorText;
//               css += selector + " { " + rule.style.cssText + " }\n";
//             } else if(rule.cssText.match(/^@font-face/)) {
//               css += rule.cssText + '\n';
//             }
//           }
//         }
//       }
//     }
//     return css;
//   }

//   function getDimension(el, clone, dim) {
//     var v = (el.viewBox && el.viewBox.baseVal && el.viewBox.baseVal[dim]) ||
//       (clone.getAttribute(dim) !== null && !clone.getAttribute(dim).match(/%$/) && parseInt(clone.getAttribute(dim))) ||
//       el.getBoundingClientRect()[dim] ||
//       parseInt(clone.style[dim]) ||
//       parseInt(window.getComputedStyle(el).getPropertyValue(dim));
//     return (typeof v === 'undefined' || v === null || isNaN(parseFloat(v))) ? 0 : v;
//   }

//   function reEncode(data) {
//     data = encodeURIComponent(data);
//     data = data.replace(/%([0-9A-F]{2})/g, function(match, p1) {
//       var c = String.fromCharCode('0x'+p1);
//       return c === '%' ? '%25' : c;
//     });
//     return decodeURIComponent(data);
//   }

//   out$.svgAsDataUri = function(el, options, cb) {
//     requireDomNode(el);

//     options = options || {};
//     options.scale = options.scale || 1;
//     options.responsive = options.responsive || false;
//     var xmlns = "http://www.w3.org/2000/xmlns/";

//     inlineImages(el, function() {
//       var outer = document.createElement("div");
//       var clone = el.cloneNode(true);
//       var width, height;
//       if(el.tagName == 'svg') {
//         width = options.width || getDimension(el, clone, 'width');
//         height = options.height || getDimension(el, clone, 'height');
//       } else if(el.getBBox) {
//         var box = el.getBBox();
//         width = box.x + box.width;
//         height = box.y + box.height;
//         clone.setAttribute('transform', clone.getAttribute('transform').replace(/translate\(.*?\)/, ''));

//         var svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
//         svg.appendChild(clone)
//         clone = svg;
//       } else {
//         console.error('Attempted to render non-SVG element', el);
//         return;
//       }

//       clone.setAttribute("version", "1.1");
//       if (!clone.getAttribute('xmlns')) {
//         clone.setAttributeNS(xmlns, "xmlns", "http://www.w3.org/2000/svg");
//       }
//       if (!clone.getAttribute('xmlns:xlink')) {
//         clone.setAttributeNS(xmlns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
//       }

//       if (options.responsive) {
//         clone.removeAttribute('width');
//         clone.removeAttribute('height');
//         clone.setAttribute('preserveAspectRatio', 'xMinYMin meet');
//       } else {
//         clone.setAttribute("width", width * options.scale);
//         clone.setAttribute("height", height * options.scale);
//       }

//       clone.setAttribute("viewBox", [
//         options.left || 0,
//         options.top || 0,
//         width,
//         height
//       ].join(" "));

//       var fos = clone.querySelectorAll('foreignObject > *');
//       for (var i = 0; i < fos.length; i++) {
//         if (!fos[i].getAttributeNS('xml', 'xmlns')) {
//           fos[i].setAttributeNS(xmlns, "xmlns", "http://www.w3.org/1999/xhtml");
//         }
//       }

//       outer.appendChild(clone);

//       var css = styles(el, options.selectorRemap);
//       var s = document.createElement('style');
//       s.setAttribute('type', 'text/css');
//       s.innerHTML = "<![CDATA[\n" + css + "\n]]>";
//       var defs = document.createElement('defs');
//       defs.appendChild(s);
//       clone.insertBefore(defs, clone.firstChild);

//       var svg = doctype + outer.innerHTML;
//       var uri = 'data:image/svg+xml;base64,' + window.btoa(reEncode(svg));
//       if (cb) {
//         cb(uri);
//       }
//     });
//   }

//   out$.svgAsPngUri = function(el, options, cb) {
//     requireDomNode(el);

//     out$.svgAsDataUri(el, options, function(uri) {
//       var image = new Image();
//       image.crossOrigin = "Anonymous";
//       image.onload = function() {
//         var canvas = document.createElement('canvas');
//         canvas.width = image.width;
//         canvas.height = image.height;
//         var context = canvas.getContext('2d');
//         if(options && options.backgroundColor){
//           context.fillStyle = options.backgroundColor;
//           context.fillRect(0, 0, canvas.width, canvas.height);
//         }
//         context.drawImage(image, 0, 0);
//         var a = document.createElement('a'), png;
//         try {
//           png = canvas.toDataURL('image/png');
//         } catch (e) {
//           if ((typeof SecurityError !== 'undefined' && e instanceof SecurityError) || e.name == "SecurityError") {
//             console.error("Rendered SVG images cannot be downloaded in this browser.");
//             return;
//           } else {
//             throw e;
//           }
//         }
//         cb(png);
//       }
//       image.onerror = function() {
//         console.error(
//           'There was an error loading the data URI as an image on the following SVG\n',
//           window.atob(uri.slice(26)), '\n',
//           "Open the following link to see browser's diagnosis\n",
//           uri);
//       }
//       image.src = uri;
//     });
//   }

//   function download(name, uri) {
//     var a = document.createElement('a');
//     a.download = name;
//     a.href = uri;
//     document.body.appendChild(a);
//     a.addEventListener("click", function(e) {
//       a.parentNode.removeChild(a);
//     });
//     a.click();
//   }

//   out$.saveSvg = function(el, name, options) {
//     requireDomNode(el);

//     options = options || {};
//     out$.svgAsDataUri(el, options, function(uri) {
//       download(name, uri);
//     });
//   }

//   out$.saveSvgAsPng = function(el, name, options) {
//     requireDomNode(el);

//     options = options || {};
//     out$.svgAsPngUri(el, options, function(uri) {
//       download(name, uri);
//     });
//   }

//   // if define is defined create as an AMD module
//   if (true) {
//     !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
//       return out$;
//     }).call(exports, __webpack_require__, exports, module),
// 				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//   }


// 	return out$;
// };


// /***/ }),
// /* 10 */
// /***/ (function(module, exports, __webpack_require__) {

// var __WEBPACK_AMD_DEFINE_RESULT__;/**
// 	licence 校验
// **/
// module.exports = function () {
// 	var licence =  {},
// 		openTime = new Date().getTime(),
// 		license, js5, appjs, init_callback
// 	;

	
// 	//获得md5 -- end
// 	function getLic(callback){
// 		var licURL = appjs.substr(0,appjs.lastIndexOf('/')+1)+'hydra.lic';
// 		//console.log('licURL',licURL);
// 		d3.html(licURL, function(a,b) {
// 			license = d3.select(b)._groups[0][0].textContent;
// 			//console.log('license',license);
// 			if(typeof license == 'undefined') {
// 				console.log('获取lic失败, 地址'+licURL);
// 			}else{
// 				callback();
// 			}
// 		});
// 	}
	
// 	function valLic(){
// 		var v = true;
// 		var k = function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('b/a 9 c/f+e d 8+3+1+0 4 7+6 5/q/p+2 o/t+r+s n/i h g++j/m+l k=',30,30,'7bM|s46Zu2CSuA5MZVIbu5CTiUuXtsyteglye0csQys||vF4oLTOp3uXMRoqF|54qpsbYLRNI9ZyFri2VgxsrFDKVZHswq1TfdNWHQkLBxXEECQQDxxQmmMc94Wnon|UkumY5OnAkEAmbV3ofJkMAasdc1|Asr|KNVNsRg3lT6j6lJ5HxhUUNZPpqHZeErDDvRbPvhzyjxN65EgFsKSh84oZKT7|FRm|ukptRBRs0Edi0MWBCiWEPVyH9SyKvAd1KlS7M3d9V4NVYRxpdaPG7lrWJlJw87rG|m5ZgSORUW8OgByb30uhB89r9j8V|MIICXAIBAAKBgQCRKiQPr5hqvQ61IG72zO5K|0yyzJe96Ds|AoGAYDVovwim4J86XysGwAVkLUnhguqG0yoAi8C2tUvRyQDvJOOIPfNAnphPXSrR|KWheOHusu4hwIDAQAB|apX0c4eNFBkjnV61goxrFYPHI5ZAbsIYJP|3V|oXhovJelb6P6PSpSaFy1z4t40lmV8C1ba0kfzHianA5vKI8thoHARrkEOP7sDg3T|RoXBSq0lWxE3QJBAIrY|ph87QT7M9UZ|dTRM3utvkMxGl3seykbwsFNlVUfDd1cUrYU5xnLSW18|MWUyI|6AECQD9HJXvA3uFkCTlosrRlSVA7HD5ej04VyBrHxb|nEZqn0WfiU0bEFMe5JKEzpNBfRaKEfrTARRNHiO1pw7f|lk7pjb8tra|xQkZ80qXoAHNzJSKzfxRL79chHI3v8N|MH|ert|krbNOq19LQIQJAatAcdTpoaMnAUfCuXEazZksfg5eQ|L8XqDZ'.split('|'),0,{});
// 		var domain = document.domain;
// 		var crypt = new LE();
// 		crypt.sprk('-----BEGIN RSA PRIVATE KEY-----\n'+k+'\n-----END RSA PRIVATE KEY-----');
// 		var d = crypt.dect(license);
// 		var da = d.split('\n');
// 		if(openTime > parseInt(da[0])){ v = false; }
// 		var sa = da[1].split(',');
// 		if(sa.indexOf(domain)<0){ v = false; }
// 		js5 = da[2];
// 		if(v){
// 			protectScript(init_callback);
// 		}else{
// 			console.log('lic解析失败');
// 		}
// 	}	
	
// 	function protectScript(callback){
// 		callback();
// 		/*
// 		d3.html(appjs, function(a,b) {
// 			var v = true;
// 			var html = d3.select(b)._groups[0][0].textContent;
// 			var jsMd5 = md5(html);
// 			//console.log('html',jsMd5);
// 			if(jsMd5==js5){
// 				//console.log('lic校验成功 success');
// 				callback();
// 			}else{
// 				console.log('文件校验失败');
// 			}
// 		});
// 		*/
// 	}
	
// 	licence.test = function (callback, jsUrl) {
// 		// appjs = jsUrl;
// 		// init_callback = callback;
//     // getLic(valLic);
//     callback();
// 	}
	
// 	//rsa
// 	!function(t,e){ true?e(exports):undefined}(this,function(t){"use strict";var e="0123456789abcdefghijklmnopqrstuvwxyz";function a(t){return e.charAt(t)}function i(t,e){return t&e}function u(t,e){return t|e}function r(t,e){return t^e}function n(t,e){return t&~e}function s(t){if(0==t)return-1;var e=0;return 0==(65535&t)&&(t>>=16,e+=16),0==(255&t)&&(t>>=8,e+=8),0==(15&t)&&(t>>=4,e+=4),0==(3&t)&&(t>>=2,e+=2),0==(1&t)&&++e,e}function o(t){for(var e=0;0!=t;)t&=t-1,++e;return e}var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function c(t){var e,i,r="";for(e=0;e+3<=t.length;e+=3)i=parseInt(t.substring(e,e+3),16),r+=h.charAt(i>>6)+h.charAt(63&i);for(e+1==t.length?(i=parseInt(t.substring(e,e+1),16),r+=h.charAt(i<<2)):e+2==t.length&&(i=parseInt(t.substring(e,e+2),16),r+=h.charAt(i>>2)+h.charAt((3&i)<<4));0<(3&r.length);)r+="=";return r}function f(t){var e,i="",r=0,n=0;for(e=0;e<t.length&&"="!=t.charAt(e);++e){var s=h.indexOf(t.charAt(e));s<0||(0==r?(i+=a(s>>2),n=3&s,r=1):1==r?(i+=a(n<<2|s>>4),n=15&s,r=2):2==r?(i+=a(n),i+=a(s>>2),n=3&s,r=3):(i+=a(n<<2|s>>4),i+=a(15&s),r=0))}return 1==r&&(i+=a(n<<2)),i}var l,p=function(t,e){return(p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};var g,d=function(t){var e;if(void 0===l){var i="0123456789ABCDEF",r=" \f\n\r\t \u2028\u2029";for(l={},e=0;e<16;++e)l[i.charAt(e)]=e;for(i=i.toLowerCase(),e=10;e<16;++e)l[i.charAt(e)]=e;for(e=0;e<r.length;++e)l[r.charAt(e)]=-1}var n=[],s=0,o=0;for(e=0;e<t.length;++e){var h=t.charAt(e);if("="==h)break;if(-1!=(h=l[h])){if(void 0===h)throw new Error("Illegal character at offset "+e);s|=h,2<=++o?(n[n.length]=s,o=s=0):s<<=4}}if(o)throw new Error("Hex encoding incomplete: 4 bits missing");return n},v={decode:function(t){var e;if(void 0===g){var i="= \f\n\r\t \u2028\u2029";for(g=Object.create(null),e=0;e<64;++e)g["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)]=e;for(e=0;e<i.length;++e)g[i.charAt(e)]=-1}var r=[],n=0,s=0;for(e=0;e<t.length;++e){var o=t.charAt(e);if("="==o)break;if(-1!=(o=g[o])){if(void 0===o)throw new Error("Illegal character at offset "+e);n|=o,4<=++s?(r[r.length]=n>>16,r[r.length]=n>>8&255,r[r.length]=255&n,s=n=0):n<<=6}}switch(s){case 1:throw new Error("Base64 encoding incomplete: at least 2 bits missing");case 2:r[r.length]=n>>10;break;case 3:r[r.length]=n>>16,r[r.length]=n>>8&255}return r},re:/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,unarmor:function(t){var e=v.re.exec(t);if(e)if(e[1])t=e[1];else{if(!e[2])throw new Error("RegExp out of sync");t=e[2]}return v.decode(t)}},m=1e13,y=function(){function t(t){this.buf=[+t||0]}return t.prototype.mulAdd=function(t,e){var i,r,n=this.buf,s=n.length;for(i=0;i<s;++i)(r=n[i]*t+e)<m?e=0:r-=(e=0|r/m)*m,n[i]=r;0<e&&(n[i]=e)},t.prototype.sub=function(t){var e,i,r=this.buf,n=r.length;for(e=0;e<n;++e)(i=r[e]-t)<0?(i+=m,t=1):t=0,r[e]=i;for(;0===r[r.length-1];)r.pop()},t.prototype.toString=function(t){if(10!=(t||10))throw new Error("only base 10 is supported");for(var e=this.buf,i=e[e.length-1].toString(),r=e.length-2;0<=r;--r)i+=(m+e[r]).toString().substring(1);return i},t.prototype.valueOf=function(){for(var t=this.buf,e=0,i=t.length-1;0<=i;--i)e=e*m+t[i];return e},t.prototype.simplify=function(){var t=this.buf;return 1==t.length?t[0]:this},t}(),b="…",T=/^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,S=/^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;function E(t,e){return t.length>e&&(t=t.substring(0,e)+b),t}var w,D=function(){function i(t,e){this.hexDigits="0123456789ABCDEF",t instanceof i?(this.enc=t.enc,this.pos=t.pos):(this.enc=t,this.pos=e)}return i.prototype.get=function(t){if(void 0===t&&(t=this.pos++),t>=this.enc.length)throw new Error("Requesting byte offset "+t+" on a stream of length "+this.enc.length);return"string"==typeof this.enc?this.enc.charCodeAt(t):this.enc[t]},i.prototype.hexByte=function(t){return this.hexDigits.charAt(t>>4&15)+this.hexDigits.charAt(15&t)},i.prototype.hexDump=function(t,e,i){for(var r="",n=t;n<e;++n)if(r+=this.hexByte(this.get(n)),!0!==i)switch(15&n){case 7:r+="  ";break;case 15:r+="\n";break;default:r+=" "}return r},i.prototype.isASCII=function(t,e){for(var i=t;i<e;++i){var r=this.get(i);if(r<32||176<r)return!1}return!0},i.prototype.parseStringISO=function(t,e){for(var i="",r=t;r<e;++r)i+=String.fromCharCode(this.get(r));return i},i.prototype.parseStringUTF=function(t,e){for(var i="",r=t;r<e;){var n=this.get(r++);i+=n<128?String.fromCharCode(n):191<n&&n<224?String.fromCharCode((31&n)<<6|63&this.get(r++)):String.fromCharCode((15&n)<<12|(63&this.get(r++))<<6|63&this.get(r++))}return i},i.prototype.parseStringBMP=function(t,e){for(var i,r,n="",s=t;s<e;)i=this.get(s++),r=this.get(s++),n+=String.fromCharCode(i<<8|r);return n},i.prototype.parseTime=function(t,e,i){var r=this.parseStringISO(t,e),n=(i?T:S).exec(r);return n?(i&&(n[1]=+n[1],n[1]+=+n[1]<70?2e3:1900),r=n[1]+"-"+n[2]+"-"+n[3]+" "+n[4],n[5]&&(r+=":"+n[5],n[6]&&(r+=":"+n[6],n[7]&&(r+="."+n[7]))),n[8]&&(r+=" UTC","Z"!=n[8]&&(r+=n[8],n[9]&&(r+=":"+n[9]))),r):"Unrecognized time: "+r},i.prototype.parseInteger=function(t,e){for(var i,r=this.get(t),n=127<r,s=n?255:0,o="";r==s&&++t<e;)r=this.get(t);if(0===(i=e-t))return n?-1:0;if(4<i){for(o=r,i<<=3;0==(128&(+o^s));)o=+o<<1,--i;o="("+i+" bit)\n"}n&&(r-=256);for(var h=new y(r),a=t+1;a<e;++a)h.mulAdd(256,this.get(a));return o+h.toString()},i.prototype.parseBitString=function(t,e,i){for(var r=this.get(t),n="("+((e-t-1<<3)-r)+" bit)\n",s="",o=t+1;o<e;++o){for(var h=this.get(o),a=o==e-1?r:0,u=7;a<=u;--u)s+=h>>u&1?"1":"0";if(s.length>i)return n+E(s,i)}return n+s},i.prototype.parseOctetString=function(t,e,i){if(this.isASCII(t,e))return E(this.parseStringISO(t,e),i);var r=e-t,n="("+r+" byte)\n";(i/=2)<r&&(e=t+i);for(var s=t;s<e;++s)n+=this.hexByte(this.get(s));return i<r&&(n+=b),n},i.prototype.parseOID=function(t,e,i){for(var r="",n=new y,s=0,o=t;o<e;++o){var h=this.get(o);if(n.mulAdd(128,127&h),s+=7,!(128&h)){if(""===r)if((n=n.simplify())instanceof y)n.sub(80),r="2."+n.toString();else{var a=n<80?n<40?0:1:2;r=a+"."+(n-40*a)}else r+="."+n.toString();if(r.length>i)return E(r,i);n=new y,s=0}}return 0<s&&(r+=".incomplete"),r},i}(),x=function(){function c(t,e,i,r,n){if(!(r instanceof R))throw new Error("Invalid tag value.");this.stream=t,this.header=e,this.length=i,this.tag=r,this.sub=n}return c.prototype.typeName=function(){switch(this.tag.tagClass){case 0:switch(this.tag.tagNumber){case 0:return"EOC";case 1:return"BOOLEAN";case 2:return"INTEGER";case 3:return"BIT_STRING";case 4:return"OCTET_STRING";case 5:return"NULL";case 6:return"OBJECT_IDENTIFIER";case 7:return"ObjectDescriptor";case 8:return"EXTERNAL";case 9:return"REAL";case 10:return"ENUMERATED";case 11:return"EMBEDDED_PDV";case 12:return"UTF8String";case 16:return"SEQUENCE";case 17:return"SET";case 18:return"NumericString";case 19:return"PrintableString";case 20:return"TeletexString";case 21:return"VideotexString";case 22:return"IA5String";case 23:return"UTCTime";case 24:return"GeneralizedTime";case 25:return"GraphicString";case 26:return"VisibleString";case 27:return"GeneralString";case 28:return"UniversalString";case 30:return"BMPString"}return"Universal_"+this.tag.tagNumber.toString();case 1:return"Application_"+this.tag.tagNumber.toString();case 2:return"["+this.tag.tagNumber.toString()+"]";case 3:return"Private_"+this.tag.tagNumber.toString()}},c.prototype.content=function(t){if(void 0===this.tag)return null;void 0===t&&(t=1/0);var e=this.posContent(),i=Math.abs(this.length);if(!this.tag.isUniversal())return null!==this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(e,e+i,t);switch(this.tag.tagNumber){case 1:return 0===this.stream.get(e)?"false":"true";case 2:return this.stream.parseInteger(e,e+i);case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(e,e+i,t);case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(e,e+i,t);case 6:return this.stream.parseOID(e,e+i,t);case 16:case 17:return null!==this.sub?"("+this.sub.length+" elem)":"(no elem)";case 12:return E(this.stream.parseStringUTF(e,e+i),t);case 18:case 19:case 20:case 21:case 22:case 26:return E(this.stream.parseStringISO(e,e+i),t);case 30:return E(this.stream.parseStringBMP(e,e+i),t);case 23:case 24:return this.stream.parseTime(e,e+i,23==this.tag.tagNumber)}return null},c.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+(null===this.sub?"null":this.sub.length)+"]"},c.prototype.toPrettyString=function(t){void 0===t&&(t="");var e=t+this.typeName()+" @"+this.stream.pos;if(0<=this.length&&(e+="+"),e+=this.length,this.tag.tagConstructed?e+=" (constructed)":!this.tag.isUniversal()||3!=this.tag.tagNumber&&4!=this.tag.tagNumber||null===this.sub||(e+=" (encapsulates)"),e+="\n",null!==this.sub){t+="  ";for(var i=0,r=this.sub.length;i<r;++i)e+=this.sub[i].toPrettyString(t)}return e},c.prototype.posStart=function(){return this.stream.pos},c.prototype.posContent=function(){return this.stream.pos+this.header},c.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)},c.prototype.toHexString=function(){return this.stream.hexDump(this.posStart(),this.posEnd(),!0)},c.decodeLength=function(t){var e=t.get(),i=127&e;if(i==e)return i;if(6<i)throw new Error("Length over 48 bits not supported at position "+(t.pos-1));if(0===i)return null;for(var r=e=0;r<i;++r)e=256*e+t.get();return e},c.prototype.getHexStringValue=function(){var t=this.toHexString(),e=2*this.header,i=2*this.length;return t.substr(e,i)},c.decode=function(t){var r;r=t instanceof D?t:new D(t,0);var e=new D(r),i=new R(r),n=c.decodeLength(r),s=r.pos,o=s-e.pos,h=null,a=function(){var t=[];if(null!==n){for(var e=s+n;r.pos<e;)t[t.length]=c.decode(r);if(r.pos!=e)throw new Error("Content size is not correct for container starting at offset "+s)}else try{for(;;){var i=c.decode(r);if(i.tag.isEOC())break;t[t.length]=i}n=s-r.pos}catch(t){throw new Error("Exception while decoding undefined length content: "+t)}return t};if(i.tagConstructed)h=a();else if(i.isUniversal()&&(3==i.tagNumber||4==i.tagNumber))try{if(3==i.tagNumber&&0!=r.get())throw new Error("BIT STRINGs with unused bits cannot encapsulate.");h=a();for(var u=0;u<h.length;++u)if(h[u].tag.isEOC())throw new Error("EOC is not supposed to be actual content.")}catch(t){h=null}if(null===h){if(null===n)throw new Error("We can't skip over an invalid tag with undefined length at offset "+s);r.pos=s+Math.abs(n)}return new c(e,o,n,i,h)},c}(),R=function(){function t(t){var e=t.get();if(this.tagClass=e>>6,this.tagConstructed=0!=(32&e),this.tagNumber=31&e,31==this.tagNumber){for(var i=new y;e=t.get(),i.mulAdd(128,127&e),128&e;);this.tagNumber=i.simplify()}}return t.prototype.isUniversal=function(){return 0===this.tagClass},t.prototype.isEOC=function(){return 0===this.tagClass&&0===this.tagNumber},t}(),B=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],A=(1<<26)/B[B.length-1],O=function(){function b(t,e,i){null!=t&&("number"==typeof t?this.fromNumber(t,e,i):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e))}return b.prototype.toString=function(t){if(this.s<0)return"-"+this.negate().toString(t);var e;if(16==t)e=4;else if(8==t)e=3;else if(2==t)e=1;else if(32==t)e=5;else{if(4!=t)return this.toRadix(t);e=2}var i,r=(1<<e)-1,n=!1,s="",o=this.t,h=this.DB-o*this.DB%e;if(0<o--)for(h<this.DB&&0<(i=this[o]>>h)&&(n=!0,s=a(i));0<=o;)h<e?(i=(this[o]&(1<<h)-1)<<e-h,i|=this[--o]>>(h+=this.DB-e)):(i=this[o]>>(h-=e)&r,h<=0&&(h+=this.DB,--o)),0<i&&(n=!0),n&&(s+=a(i));return n?s:"0"},b.prototype.negate=function(){var t=M();return b.ZERO.subTo(this,t),t},b.prototype.abs=function(){return this.s<0?this.negate():this},b.prototype.compareTo=function(t){var e=this.s-t.s;if(0!=e)return e;var i=this.t;if(0!=(e=i-t.t))return this.s<0?-e:e;for(;0<=--i;)if(0!=(e=this[i]-t[i]))return e;return 0},b.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+U(this[this.t-1]^this.s&this.DM)},b.prototype.mod=function(t){var e=M();return this.abs().divRemTo(t,null,e),this.s<0&&0<e.compareTo(b.ZERO)&&t.subTo(e,e),e},b.prototype.modPowInt=function(t,e){var i;return i=t<256||e.isEven()?new I(e):new N(e),this.exp(t,i)},b.prototype.clone=function(){var t=M();return this.copyTo(t),t},b.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},b.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24},b.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<16>>16},b.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},b.prototype.toByteArray=function(){var t=this.t,e=[];e[0]=this.s;var i,r=this.DB-t*this.DB%8,n=0;if(0<t--)for(r<this.DB&&(i=this[t]>>r)!=(this.s&this.DM)>>r&&(e[n++]=i|this.s<<this.DB-r);0<=t;)r<8?(i=(this[t]&(1<<r)-1)<<8-r,i|=this[--t]>>(r+=this.DB-8)):(i=this[t]>>(r-=8)&255,r<=0&&(r+=this.DB,--t)),0!=(128&i)&&(i|=-256),0==n&&(128&this.s)!=(128&i)&&++n,(0<n||i!=this.s)&&(e[n++]=i);return e},b.prototype.equals=function(t){return 0==this.compareTo(t)},b.prototype.min=function(t){return this.compareTo(t)<0?this:t},b.prototype.max=function(t){return 0<this.compareTo(t)?this:t},b.prototype.and=function(t){var e=M();return this.bitwiseTo(t,i,e),e},b.prototype.or=function(t){var e=M();return this.bitwiseTo(t,u,e),e},b.prototype.xor=function(t){var e=M();return this.bitwiseTo(t,r,e),e},b.prototype.andNot=function(t){var e=M();return this.bitwiseTo(t,n,e),e},b.prototype.not=function(){for(var t=M(),e=0;e<this.t;++e)t[e]=this.DM&~this[e];return t.t=this.t,t.s=~this.s,t},b.prototype.shiftLeft=function(t){var e=M();return t<0?this.rShiftTo(-t,e):this.lShiftTo(t,e),e},b.prototype.shiftRight=function(t){var e=M();return t<0?this.lShiftTo(-t,e):this.rShiftTo(t,e),e},b.prototype.getLowestSetBit=function(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+s(this[t]);return this.s<0?this.t*this.DB:-1},b.prototype.bitCount=function(){for(var t=0,e=this.s&this.DM,i=0;i<this.t;++i)t+=o(this[i]^e);return t},b.prototype.testBit=function(t){var e=Math.floor(t/this.DB);return e>=this.t?0!=this.s:0!=(this[e]&1<<t%this.DB)},b.prototype.setBit=function(t){return this.changeBit(t,u)},b.prototype.clearBit=function(t){return this.changeBit(t,n)},b.prototype.flipBit=function(t){return this.changeBit(t,r)},b.prototype.add=function(t){var e=M();return this.addTo(t,e),e},b.prototype.subtract=function(t){var e=M();return this.subTo(t,e),e},b.prototype.multiply=function(t){var e=M();return this.multiplyTo(t,e),e},b.prototype.divide=function(t){var e=M();return this.divRemTo(t,e,null),e},b.prototype.remainder=function(t){var e=M();return this.divRemTo(t,null,e),e},b.prototype.divideAndRemainder=function(t){var e=M(),i=M();return this.divRemTo(t,e,i),[e,i]},b.prototype.modPow=function(t,e){var i,r,n=t.bitLength(),s=F(1);if(n<=0)return s;i=n<18?1:n<48?3:n<144?4:n<768?5:6,r=n<8?new I(e):e.isEven()?new P(e):new N(e);var o=[],h=3,a=i-1,u=(1<<i)-1;if(o[1]=r.convert(this),1<i){var c=M();for(r.sqrTo(o[1],c);h<=u;)o[h]=M(),r.mulTo(c,o[h-2],o[h]),h+=2}var f,l,p=t.t-1,g=!0,d=M();for(n=U(t[p])-1;0<=p;){for(a<=n?f=t[p]>>n-a&u:(f=(t[p]&(1<<n+1)-1)<<a-n,0<p&&(f|=t[p-1]>>this.DB+n-a)),h=i;0==(1&f);)f>>=1,--h;if((n-=h)<0&&(n+=this.DB,--p),g)o[f].copyTo(s),g=!1;else{for(;1<h;)r.sqrTo(s,d),r.sqrTo(d,s),h-=2;0<h?r.sqrTo(s,d):(l=s,s=d,d=l),r.mulTo(d,o[f],s)}for(;0<=p&&0==(t[p]&1<<n);)r.sqrTo(s,d),l=s,s=d,d=l,--n<0&&(n=this.DB-1,--p)}return r.revert(s)},b.prototype.modInverse=function(t){var e=t.isEven();if(this.isEven()&&e||0==t.signum())return b.ZERO;for(var i=t.clone(),r=this.clone(),n=F(1),s=F(0),o=F(0),h=F(1);0!=i.signum();){for(;i.isEven();)i.rShiftTo(1,i),e?(n.isEven()&&s.isEven()||(n.addTo(this,n),s.subTo(t,s)),n.rShiftTo(1,n)):s.isEven()||s.subTo(t,s),s.rShiftTo(1,s);for(;r.isEven();)r.rShiftTo(1,r),e?(o.isEven()&&h.isEven()||(o.addTo(this,o),h.subTo(t,h)),o.rShiftTo(1,o)):h.isEven()||h.subTo(t,h),h.rShiftTo(1,h);0<=i.compareTo(r)?(i.subTo(r,i),e&&n.subTo(o,n),s.subTo(h,s)):(r.subTo(i,r),e&&o.subTo(n,o),h.subTo(s,h))}return 0!=r.compareTo(b.ONE)?b.ZERO:0<=h.compareTo(t)?h.subtract(t):h.signum()<0?(h.addTo(t,h),h.signum()<0?h.add(t):h):h},b.prototype.pow=function(t){return this.exp(t,new V)},b.prototype.gcd=function(t){var e=this.s<0?this.negate():this.clone(),i=t.s<0?t.negate():t.clone();if(e.compareTo(i)<0){var r=e;e=i,i=r}var n=e.getLowestSetBit(),s=i.getLowestSetBit();if(s<0)return e;for(n<s&&(s=n),0<s&&(e.rShiftTo(s,e),i.rShiftTo(s,i));0<e.signum();)0<(n=e.getLowestSetBit())&&e.rShiftTo(n,e),0<(n=i.getLowestSetBit())&&i.rShiftTo(n,i),0<=e.compareTo(i)?(e.subTo(i,e),e.rShiftTo(1,e)):(i.subTo(e,i),i.rShiftTo(1,i));return 0<s&&i.lShiftTo(s,i),i},b.prototype.isProbablePrime=function(t){var e,i=this.abs();if(1==i.t&&i[0]<=B[B.length-1]){for(e=0;e<B.length;++e)if(i[0]==B[e])return!0;return!1}if(i.isEven())return!1;for(e=1;e<B.length;){for(var r=B[e],n=e+1;n<B.length&&r<A;)r*=B[n++];for(r=i.modInt(r);e<n;)if(r%B[e++]==0)return!1}return i.millerRabin(t)},b.prototype.copyTo=function(t){for(var e=this.t-1;0<=e;--e)t[e]=this[e];t.t=this.t,t.s=this.s},b.prototype.fromInt=function(t){this.t=1,this.s=t<0?-1:0,0<t?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0},b.prototype.fromString=function(t,e){var i;if(16==e)i=4;else if(8==e)i=3;else if(256==e)i=8;else if(2==e)i=1;else if(32==e)i=5;else{if(4!=e)return void this.fromRadix(t,e);i=2}this.t=0,this.s=0;for(var r=t.length,n=!1,s=0;0<=--r;){var o=8==i?255&+t[r]:C(t,r);o<0?"-"==t.charAt(r)&&(n=!0):(n=!1,0==s?this[this.t++]=o:s+i>this.DB?(this[this.t-1]|=(o&(1<<this.DB-s)-1)<<s,this[this.t++]=o>>this.DB-s):this[this.t-1]|=o<<s,(s+=i)>=this.DB&&(s-=this.DB))}8==i&&0!=(128&+t[0])&&(this.s=-1,0<s&&(this[this.t-1]|=(1<<this.DB-s)-1<<s)),this.clamp(),n&&b.ZERO.subTo(this,this)},b.prototype.clamp=function(){for(var t=this.s&this.DM;0<this.t&&this[this.t-1]==t;)--this.t},b.prototype.dlShiftTo=function(t,e){var i;for(i=this.t-1;0<=i;--i)e[i+t]=this[i];for(i=t-1;0<=i;--i)e[i]=0;e.t=this.t+t,e.s=this.s},b.prototype.drShiftTo=function(t,e){for(var i=t;i<this.t;++i)e[i-t]=this[i];e.t=Math.max(this.t-t,0),e.s=this.s},b.prototype.lShiftTo=function(t,e){for(var i=t%this.DB,r=this.DB-i,n=(1<<r)-1,s=Math.floor(t/this.DB),o=this.s<<i&this.DM,h=this.t-1;0<=h;--h)e[h+s+1]=this[h]>>r|o,o=(this[h]&n)<<i;for(h=s-1;0<=h;--h)e[h]=0;e[s]=o,e.t=this.t+s+1,e.s=this.s,e.clamp()},b.prototype.rShiftTo=function(t,e){e.s=this.s;var i=Math.floor(t/this.DB);if(i>=this.t)e.t=0;else{var r=t%this.DB,n=this.DB-r,s=(1<<r)-1;e[0]=this[i]>>r;for(var o=i+1;o<this.t;++o)e[o-i-1]|=(this[o]&s)<<n,e[o-i]=this[o]>>r;0<r&&(e[this.t-i-1]|=(this.s&s)<<n),e.t=this.t-i,e.clamp()}},b.prototype.subTo=function(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);i<n;)r+=this[i]-t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r-=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r-=t[i],e[i++]=r&this.DM,r>>=this.DB;r-=t.s}e.s=r<0?-1:0,r<-1?e[i++]=this.DV+r:0<r&&(e[i++]=r),e.t=i,e.clamp()},b.prototype.multiplyTo=function(t,e){var i=this.abs(),r=t.abs(),n=i.t;for(e.t=n+r.t;0<=--n;)e[n]=0;for(n=0;n<r.t;++n)e[n+i.t]=i.am(0,r[n],e,n,0,i.t);e.s=0,e.clamp(),this.s!=t.s&&b.ZERO.subTo(e,e)},b.prototype.squareTo=function(t){for(var e=this.abs(),i=t.t=2*e.t;0<=--i;)t[i]=0;for(i=0;i<e.t-1;++i){var r=e.am(i,e[i],t,2*i,0,1);(t[i+e.t]+=e.am(i+1,2*e[i],t,2*i+1,r,e.t-i-1))>=e.DV&&(t[i+e.t]-=e.DV,t[i+e.t+1]=1)}0<t.t&&(t[t.t-1]+=e.am(i,e[i],t,2*i,0,1)),t.s=0,t.clamp()},b.prototype.divRemTo=function(t,e,i){var r=t.abs();if(!(r.t<=0)){var n=this.abs();if(n.t<r.t)return null!=e&&e.fromInt(0),void(null!=i&&this.copyTo(i));null==i&&(i=M());var s=M(),o=this.s,h=t.s,a=this.DB-U(r[r.t-1]);0<a?(r.lShiftTo(a,s),n.lShiftTo(a,i)):(r.copyTo(s),n.copyTo(i));var u=s.t,c=s[u-1];if(0!=c){var f=c*(1<<this.F1)+(1<u?s[u-2]>>this.F2:0),l=this.FV/f,p=(1<<this.F1)/f,g=1<<this.F2,d=i.t,v=d-u,m=null==e?M():e;for(s.dlShiftTo(v,m),0<=i.compareTo(m)&&(i[i.t++]=1,i.subTo(m,i)),b.ONE.dlShiftTo(u,m),m.subTo(s,s);s.t<u;)s[s.t++]=0;for(;0<=--v;){var y=i[--d]==c?this.DM:Math.floor(i[d]*l+(i[d-1]+g)*p);if((i[d]+=s.am(0,y,i,v,0,u))<y)for(s.dlShiftTo(v,m),i.subTo(m,i);i[d]<--y;)i.subTo(m,i)}null!=e&&(i.drShiftTo(u,e),o!=h&&b.ZERO.subTo(e,e)),i.t=u,i.clamp(),0<a&&i.rShiftTo(a,i),o<0&&b.ZERO.subTo(i,i)}}},b.prototype.invDigit=function(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var e=3&t;return 0<(e=(e=(e=(e=e*(2-(15&t)*e)&15)*(2-(255&t)*e)&255)*(2-((65535&t)*e&65535))&65535)*(2-t*e%this.DV)%this.DV)?this.DV-e:-e},b.prototype.isEven=function(){return 0==(0<this.t?1&this[0]:this.s)},b.prototype.exp=function(t,e){if(4294967295<t||t<1)return b.ONE;var i=M(),r=M(),n=e.convert(this),s=U(t)-1;for(n.copyTo(i);0<=--s;)if(e.sqrTo(i,r),0<(t&1<<s))e.mulTo(r,n,i);else{var o=i;i=r,r=o}return e.revert(i)},b.prototype.chunkSize=function(t){return Math.floor(Math.LN2*this.DB/Math.log(t))},b.prototype.toRadix=function(t){if(null==t&&(t=10),0==this.signum()||t<2||36<t)return"0";var e=this.chunkSize(t),i=Math.pow(t,e),r=F(i),n=M(),s=M(),o="";for(this.divRemTo(r,n,s);0<n.signum();)o=(i+s.intValue()).toString(t).substr(1)+o,n.divRemTo(r,n,s);return s.intValue().toString(t)+o},b.prototype.fromRadix=function(t,e){this.fromInt(0),null==e&&(e=10);for(var i=this.chunkSize(e),r=Math.pow(e,i),n=!1,s=0,o=0,h=0;h<t.length;++h){var a=C(t,h);a<0?"-"==t.charAt(h)&&0==this.signum()&&(n=!0):(o=e*o+a,++s>=i&&(this.dMultiply(r),this.dAddOffset(o,0),o=s=0))}0<s&&(this.dMultiply(Math.pow(e,s)),this.dAddOffset(o,0)),n&&b.ZERO.subTo(this,this)},b.prototype.fromNumber=function(t,e,i){if("number"==typeof e)if(t<2)this.fromInt(1);else for(this.fromNumber(t,i),this.testBit(t-1)||this.bitwiseTo(b.ONE.shiftLeft(t-1),u,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(e);)this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(b.ONE.shiftLeft(t-1),this);else{var r=[],n=7&t;r.length=1+(t>>3),e.nextBytes(r),0<n?r[0]&=(1<<n)-1:r[0]=0,this.fromString(r,256)}},b.prototype.bitwiseTo=function(t,e,i){var r,n,s=Math.min(t.t,this.t);for(r=0;r<s;++r)i[r]=e(this[r],t[r]);if(t.t<this.t){for(n=t.s&this.DM,r=s;r<this.t;++r)i[r]=e(this[r],n);i.t=this.t}else{for(n=this.s&this.DM,r=s;r<t.t;++r)i[r]=e(n,t[r]);i.t=t.t}i.s=e(this.s,t.s),i.clamp()},b.prototype.changeBit=function(t,e){var i=b.ONE.shiftLeft(t);return this.bitwiseTo(i,e,i),i},b.prototype.addTo=function(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);i<n;)r+=this[i]+t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r+=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r+=t[i],e[i++]=r&this.DM,r>>=this.DB;r+=t.s}e.s=r<0?-1:0,0<r?e[i++]=r:r<-1&&(e[i++]=this.DV+r),e.t=i,e.clamp()},b.prototype.dMultiply=function(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp()},b.prototype.dAddOffset=function(t,e){if(0!=t){for(;this.t<=e;)this[this.t++]=0;for(this[e]+=t;this[e]>=this.DV;)this[e]-=this.DV,++e>=this.t&&(this[this.t++]=0),++this[e]}},b.prototype.multiplyLowerTo=function(t,e,i){var r=Math.min(this.t+t.t,e);for(i.s=0,i.t=r;0<r;)i[--r]=0;for(var n=i.t-this.t;r<n;++r)i[r+this.t]=this.am(0,t[r],i,r,0,this.t);for(n=Math.min(t.t,e);r<n;++r)this.am(0,t[r],i,r,0,e-r);i.clamp()},b.prototype.multiplyUpperTo=function(t,e,i){--e;var r=i.t=this.t+t.t-e;for(i.s=0;0<=--r;)i[r]=0;for(r=Math.max(e-this.t,0);r<t.t;++r)i[this.t+r-e]=this.am(e-r,t[r],i,0,0,this.t+r-e);i.clamp(),i.drShiftTo(1,i)},b.prototype.modInt=function(t){if(t<=0)return 0;var e=this.DV%t,i=this.s<0?t-1:0;if(0<this.t)if(0==e)i=this[0]%t;else for(var r=this.t-1;0<=r;--r)i=(e*i+this[r])%t;return i},b.prototype.millerRabin=function(t){var e=this.subtract(b.ONE),i=e.getLowestSetBit();if(i<=0)return!1;var r=e.shiftRight(i);B.length<(t=t+1>>1)&&(t=B.length);for(var n=M(),s=0;s<t;++s){n.fromInt(B[Math.floor(Math.random()*B.length)]);var o=n.modPow(r,this);if(0!=o.compareTo(b.ONE)&&0!=o.compareTo(e)){for(var h=1;h++<i&&0!=o.compareTo(e);)if(0==(o=o.modPowInt(2,this)).compareTo(b.ONE))return!1;if(0!=o.compareTo(e))return!1}}return!0},b.prototype.square=function(){var t=M();return this.squareTo(t),t},b.prototype.gcda=function(t,e){var i=this.s<0?this.negate():this.clone(),r=t.s<0?t.negate():t.clone();if(i.compareTo(r)<0){var n=i;i=r,r=n}var s=i.getLowestSetBit(),o=r.getLowestSetBit();if(o<0)e(i);else{s<o&&(o=s),0<o&&(i.rShiftTo(o,i),r.rShiftTo(o,r));var h=function(){0<(s=i.getLowestSetBit())&&i.rShiftTo(s,i),0<(s=r.getLowestSetBit())&&r.rShiftTo(s,r),0<=i.compareTo(r)?(i.subTo(r,i),i.rShiftTo(1,i)):(r.subTo(i,r),r.rShiftTo(1,r)),0<i.signum()?setTimeout(h,0):(0<o&&r.lShiftTo(o,r),setTimeout(function(){e(r)},0))};setTimeout(h,10)}},b.prototype.fromNumberAsync=function(t,e,i,r){if("number"==typeof e)if(t<2)this.fromInt(1);else{this.fromNumber(t,i),this.testBit(t-1)||this.bitwiseTo(b.ONE.shiftLeft(t-1),u,this),this.isEven()&&this.dAddOffset(1,0);var n=this,s=function(){n.dAddOffset(2,0),n.bitLength()>t&&n.subTo(b.ONE.shiftLeft(t-1),n),n.isProbablePrime(e)?setTimeout(function(){r()},0):setTimeout(s,0)};setTimeout(s,0)}else{var o=[],h=7&t;o.length=1+(t>>3),e.nextBytes(o),0<h?o[0]&=(1<<h)-1:o[0]=0,this.fromString(o,256)}},b}(),V=function(){function t(){}return t.prototype.convert=function(t){return t},t.prototype.revert=function(t){return t},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i)},t.prototype.sqrTo=function(t,e){t.squareTo(e)},t}(),I=function(){function t(t){this.m=t}return t.prototype.convert=function(t){return t.s<0||0<=t.compareTo(this.m)?t.mod(this.m):t},t.prototype.revert=function(t){return t},t.prototype.reduce=function(t){t.divRemTo(this.m,null,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}(),N=function(){function t(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}return t.prototype.convert=function(t){var e=M();return t.abs().dlShiftTo(this.m.t,e),e.divRemTo(this.m,null,e),t.s<0&&0<e.compareTo(O.ZERO)&&this.m.subTo(e,e),e},t.prototype.revert=function(t){var e=M();return t.copyTo(e),this.reduce(e),e},t.prototype.reduce=function(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var e=0;e<this.m.t;++e){var i=32767&t[e],r=i*this.mpl+((i*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[i=e+this.m.t]+=this.m.am(0,r,t,e,0,this.m.t);t[i]>=t.DV;)t[i]-=t.DV,t[++i]++}t.clamp(),t.drShiftTo(this.m.t,t),0<=t.compareTo(this.m)&&t.subTo(this.m,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}(),P=function(){function t(t){this.m=t,this.r2=M(),this.q3=M(),O.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t)}return t.prototype.convert=function(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var e=M();return t.copyTo(e),this.reduce(e),e},t.prototype.revert=function(t){return t},t.prototype.reduce=function(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);0<=t.compareTo(this.m);)t.subTo(this.m,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}();function M(){return new O(null)}function q(t,e){return new O(t,e)}"Microsoft Internet Explorer"==navigator.appName?(O.prototype.am=function(t,e,i,r,n,s){for(var o=32767&e,h=e>>15;0<=--s;){var a=32767&this[t],u=this[t++]>>15,c=h*a+u*o;n=((a=o*a+((32767&c)<<15)+i[r]+(1073741823&n))>>>30)+(c>>>15)+h*u+(n>>>30),i[r++]=1073741823&a}return n},w=30):"Netscape"!=navigator.appName?(O.prototype.am=function(t,e,i,r,n,s){for(;0<=--s;){var o=e*this[t++]+i[r]+n;n=Math.floor(o/67108864),i[r++]=67108863&o}return n},w=26):(O.prototype.am=function(t,e,i,r,n,s){for(var o=16383&e,h=e>>14;0<=--s;){var a=16383&this[t],u=this[t++]>>14,c=h*a+u*o;n=((a=o*a+((16383&c)<<14)+i[r]+n)>>28)+(c>>14)+h*u,i[r++]=268435455&a}return n},w=28),O.prototype.DB=w,O.prototype.DM=(1<<w)-1,O.prototype.DV=1<<w;O.prototype.FV=Math.pow(2,52),O.prototype.F1=52-w,O.prototype.F2=2*w-52;var j,L,H=[];for(j="0".charCodeAt(0),L=0;L<=9;++L)H[j++]=L;for(j="a".charCodeAt(0),L=10;L<36;++L)H[j++]=L;for(j="A".charCodeAt(0),L=10;L<36;++L)H[j++]=L;function C(t,e){var i=H[t.charCodeAt(e)];return null==i?-1:i}function F(t){var e=M();return e.fromInt(t),e}function U(t){var e,i=1;return 0!=(e=t>>>16)&&(t=e,i+=16),0!=(e=t>>8)&&(t=e,i+=8),0!=(e=t>>4)&&(t=e,i+=4),0!=(e=t>>2)&&(t=e,i+=2),0!=(e=t>>1)&&(t=e,i+=1),i}O.ZERO=F(0),O.ONE=F(1);var K=function(){function t(){this.i=0,this.j=0,this.S=[]}return t.prototype.init=function(t){var e,i,r;for(e=0;e<256;++e)this.S[e]=e;for(e=i=0;e<256;++e)i=i+this.S[e]+t[e%t.length]&255,r=this.S[e],this.S[e]=this.S[i],this.S[i]=r;this.i=0,this.j=0},t.prototype.next=function(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]},t}();var k,_,z=256,Z=null;if(null==Z){Z=[];var G=void(_=0);if(window.crypto&&window.crypto.getRandomValues){var $=new Uint32Array(256);for(window.crypto.getRandomValues($),G=0;G<$.length;++G)Z[_++]=255&$[G]}var Y=function(t){if(this.count=this.count||0,256<=this.count||z<=_)window.removeEventListener?window.removeEventListener("mousemove",Y,!1):window.detachEvent&&window.detachEvent("onmousemove",Y);else try{var e=t.x+t.y;Z[_++]=255&e,this.count+=1}catch(t){}};window.addEventListener?window.addEventListener("mousemove",Y,!1):window.attachEvent&&window.attachEvent("onmousemove",Y)}function J(){if(null==k){for(k=new K;_<z;){var t=Math.floor(65536*Math.random());Z[_++]=255&t}for(k.init(Z),_=0;_<Z.length;++_)Z[_]=0;_=0}return k.next()}var X=function(){function t(){}return t.prototype.nextBytes=function(t){for(var e=0;e<t.length;++e)t[e]=J()},t}();var Q=function(){function t(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}return t.prototype.doPublic=function(t){return t.modPowInt(this.e,this.n)},t.prototype.doPrivate=function(t){if(null==this.p||null==this.q)return t.modPow(this.d,this.n);for(var e=t.mod(this.p).modPow(this.dmp1,this.p),i=t.mod(this.q).modPow(this.dmq1,this.q);e.compareTo(i)<0;)e=e.add(this.p);return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)},t.prototype.setPublic=function(t,e){null!=t&&null!=e&&0<t.length&&0<e.length?(this.n=q(t,16),this.e=parseInt(e,16)):console.error("Invalid RSA public key")},t.prototype.enct=function(t){var e=function(t,e){if(e<t.length+11)return console.error("Message too long for RSA"),null;for(var i=[],r=t.length-1;0<=r&&0<e;){var n=t.charCodeAt(r--);n<128?i[--e]=n:127<n&&n<2048?(i[--e]=63&n|128,i[--e]=n>>6|192):(i[--e]=63&n|128,i[--e]=n>>6&63|128,i[--e]=n>>12|224)}i[--e]=0;for(var s=new X,o=[];2<e;){for(o[0]=0;0==o[0];)s.nextBytes(o);i[--e]=o[0]}return i[--e]=2,i[--e]=0,new O(i)}(t,this.n.bitLength()+7>>3);if(null==e)return null;var i=this.doPublic(e);if(null==i)return null;var r=i.toString(16);return 0==(1&r.length)?r:"0"+r},t.prototype.setPrivate=function(t,e,i){null!=t&&null!=e&&0<t.length&&0<e.length?(this.n=q(t,16),this.e=parseInt(e,16),this.d=q(i,16)):console.error("Invalid RSA private key")},t.prototype.setPrivateEx=function(t,e,i,r,n,s,o,h){null!=t&&null!=e&&0<t.length&&0<e.length?(this.n=q(t,16),this.e=parseInt(e,16),this.d=q(i,16),this.p=q(r,16),this.q=q(n,16),this.dmp1=q(s,16),this.dmq1=q(o,16),this.coeff=q(h,16)):console.error("Invalid RSA private key")},t.prototype.generate=function(t,e){var i=new X,r=t>>1;this.e=parseInt(e,16);for(var n=new O(e,16);;){for(;this.p=new O(t-r,1,i),0!=this.p.subtract(O.ONE).gcd(n).compareTo(O.ONE)||!this.p.isProbablePrime(10););for(;this.q=new O(r,1,i),0!=this.q.subtract(O.ONE).gcd(n).compareTo(O.ONE)||!this.q.isProbablePrime(10););if(this.p.compareTo(this.q)<=0){var s=this.p;this.p=this.q,this.q=s}var o=this.p.subtract(O.ONE),h=this.q.subtract(O.ONE),a=o.multiply(h);if(0==a.gcd(n).compareTo(O.ONE)){this.n=this.p.multiply(this.q),this.d=n.modInverse(a),this.dmp1=this.d.mod(o),this.dmq1=this.d.mod(h),this.coeff=this.q.modInverse(this.p);break}}},t.prototype.dect=function(t){var e=q(t,16),i=this.doPrivate(e);return null==i?null:function(t,e){var i=t.toByteArray(),r=0;for(;r<i.length&&0==i[r];)++r;if(i.length-r!=e-1||2!=i[r])return null;++r;for(;0!=i[r];)if(++r>=i.length)return null;var n="";for(;++r<i.length;){var s=255&i[r];s<128?n+=String.fromCharCode(s):191<s&&s<224?(n+=String.fromCharCode((31&s)<<6|63&i[r+1]),++r):(n+=String.fromCharCode((15&s)<<12|(63&i[r+1])<<6|63&i[r+2]),r+=2)}return n}(i,this.n.bitLength()+7>>3)},t.prototype.generateAsync=function(t,e,n){var s=new X,o=t>>1;this.e=parseInt(e,16);var h=new O(e,16),a=this,u=function(){var e=function(){if(a.p.compareTo(a.q)<=0){var t=a.p;a.p=a.q,a.q=t}var e=a.p.subtract(O.ONE),i=a.q.subtract(O.ONE),r=e.multiply(i);0==r.gcd(h).compareTo(O.ONE)?(a.n=a.p.multiply(a.q),a.d=h.modInverse(r),a.dmp1=a.d.mod(e),a.dmq1=a.d.mod(i),a.coeff=a.q.modInverse(a.p),setTimeout(function(){n()},0)):setTimeout(u,0)},i=function(){a.q=M(),a.q.fromNumberAsync(o,1,s,function(){a.q.subtract(O.ONE).gcda(h,function(t){0==t.compareTo(O.ONE)&&a.q.isProbablePrime(10)?setTimeout(e,0):setTimeout(i,0)})})},r=function(){a.p=M(),a.p.fromNumberAsync(t-o,1,s,function(){a.p.subtract(O.ONE).gcda(h,function(t){0==t.compareTo(O.ONE)&&a.p.isProbablePrime(10)?setTimeout(i,0):setTimeout(r,0)})})};setTimeout(r,0)};setTimeout(u,0)},t.prototype.sign=function(t,e,i){var r=function(t,e){if(e<t.length+22)return console.error("Message too long for RSA"),null;for(var i=e-t.length-6,r="",n=0;n<i;n+=2)r+="ff";return q("0001"+r+"00"+t,16)}((W[i]||"")+e(t).toString(),this.n.bitLength()/4);if(null==r)return null;var n=this.doPrivate(r);if(null==n)return null;var s=n.toString(16);return 0==(1&s.length)?s:"0"+s},t.prototype.verify=function(t,e,i){var r=q(e,16),n=this.doPublic(r);return null==n?null:function(t){for(var e in W)if(W.hasOwnProperty(e)){var i=W[e],r=i.length;if(t.substr(0,r)==i)return t.substr(r)}return t}(n.toString(16).replace(/^1f+00/,""))==i(t).toString()},t}();var W={md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",ripemd160:"3021300906052b2403020105000414"};var tt={};tt.lang={extend:function(t,e,i){if(!e||!t)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var r=function(){};if(r.prototype=e.prototype,t.prototype=new r,(t.prototype.constructor=t).superclass=e.prototype,e.prototype.constructor==Object.prototype.constructor&&(e.prototype.constructor=e),i){var n;for(n in i)t.prototype[n]=i[n];var s=function(){},o=["toString","valueOf"];try{/MSIE/.test(navigator.userAgent)&&(s=function(t,e){for(n=0;n<o.length;n+=1){var i=o[n],r=e[i];"function"==typeof r&&r!=Object.prototype[i]&&(t[i]=r)}})}catch(t){}s(t.prototype,i)}}};var et={};void 0!==et.asn1&&et.asn1||(et.asn1={}),et.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var e=t.toString(16);return e.length%2==1&&(e="0"+e),e},this.bigIntToMinTwosComplementsHex=function(t){var e=t.toString(16);if("-"!=e.substr(0,1))e.length%2==1?e="0"+e:e.match(/^[0-7]/)||(e="00"+e);else{var i=e.substr(1).length;i%2==1?i+=1:e.match(/^[0-7]/)||(i+=2);for(var r="",n=0;n<i;n++)r+="f";e=new O(r,16).xor(t).add(O.ONE).toString(16).replace(/^-/,"")}return e},this.getPEMStringFromHex=function(t,e){return hextopem(t,e)},this.newObject=function(t){var e=et.asn1,i=e.DERBoolean,r=e.DERInteger,n=e.DERBitString,s=e.DEROctetString,o=e.DERNull,h=e.DERObjectIdentifier,a=e.DEREnumerated,u=e.DERUTF8String,c=e.DERNumericString,f=e.DERPrintableString,l=e.DERTeletexString,p=e.DERIA5String,g=e.DERUTCTime,d=e.DERGeneralizedTime,v=e.DERSequence,m=e.DERSet,y=e.DERTaggedObject,b=e.ASN1Util.newObject,T=Object.keys(t);if(1!=T.length)throw"key of param shall be only one.";var S=T[0];if(-1==":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":"+S+":"))throw"undefined key: "+S;if("bool"==S)return new i(t[S]);if("int"==S)return new r(t[S]);if("bitstr"==S)return new n(t[S]);if("octstr"==S)return new s(t[S]);if("null"==S)return new o(t[S]);if("oid"==S)return new h(t[S]);if("enum"==S)return new a(t[S]);if("utf8str"==S)return new u(t[S]);if("numstr"==S)return new c(t[S]);if("prnstr"==S)return new f(t[S]);if("telstr"==S)return new l(t[S]);if("ia5str"==S)return new p(t[S]);if("utctime"==S)return new g(t[S]);if("gentime"==S)return new d(t[S]);if("seq"==S){for(var E=t[S],w=[],D=0;D<E.length;D++){var x=b(E[D]);w.push(x)}return new v({array:w})}if("set"==S){for(E=t[S],w=[],D=0;D<E.length;D++){x=b(E[D]);w.push(x)}return new m({array:w})}if("tag"==S){var R=t[S];if("[object Array]"===Object.prototype.toString.call(R)&&3==R.length){var B=b(R[2]);return new y({tag:R[0],explicit:R[1],obj:B})}var A={};if(void 0!==R.explicit&&(A.explicit=R.explicit),void 0!==R.tag&&(A.tag=R.tag),void 0===R.obj)throw"obj shall be specified for 'tag'.";return A.obj=b(R.obj),new y(A)}},this.jsonToASN1HEX=function(t){return this.newObject(t).getEncodedHex()}},et.asn1.ASN1Util.oidHexToInt=function(t){for(var e="",i=parseInt(t.substr(0,2),16),r=(e=Math.floor(i/40)+"."+i%40,""),n=2;n<t.length;n+=2){var s=("00000000"+parseInt(t.substr(n,2),16).toString(2)).slice(-8);if(r+=s.substr(1,7),"0"==s.substr(0,1))e=e+"."+new O(r,2).toString(10),r=""}return e},et.asn1.ASN1Util.oidIntToHex=function(t){var h=function(t){var e=t.toString(16);return 1==e.length&&(e="0"+e),e},e=function(t){var e="",i=new O(t,10).toString(2),r=7-i.length%7;7==r&&(r=0);for(var n="",s=0;s<r;s++)n+="0";i=n+i;for(s=0;s<i.length-1;s+=7){var o=i.substr(s,7);s!=i.length-7&&(o="1"+o),e+=h(parseInt(o,2))}return e};if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var i="",r=t.split("."),n=40*parseInt(r[0])+parseInt(r[1]);i+=h(n),r.splice(0,2);for(var s=0;s<r.length;s++)i+=e(r[s]);return i},et.asn1.ASN1Object=function(){this.getLengthHexFromValue=function(){if(void 0===this.hV||null==this.hV)throw"this.hV is null or undefined.";if(this.hV.length%2==1)throw"value hex must be even length: n="+"".length+",v="+this.hV;var t=this.hV.length/2,e=t.toString(16);if(e.length%2==1&&(e="0"+e),t<128)return e;var i=e.length/2;if(15<i)throw"ASN.1 length too long to represent by 8x: n = "+t.toString(16);return(128+i).toString(16)+e},this.getEncodedHex=function(){return(null==this.hTLV||this.isModified)&&(this.hV=this.getFreshValueHex(),this.hL=this.getLengthHexFromValue(),this.hTLV=this.hT+this.hL+this.hV,this.isModified=!1),this.hTLV},this.getValueHex=function(){return this.getEncodedHex(),this.hV},this.getFreshValueHex=function(){return""}},et.asn1.DERAbstractString=function(t){et.asn1.DERAbstractString.superclass.constructor.call(this),this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(this.s)},this.setStringHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?this.setString(t):void 0!==t.str?this.setString(t.str):void 0!==t.hex&&this.setStringHex(t.hex))},tt.lang.extend(et.asn1.DERAbstractString,et.asn1.ASN1Object),et.asn1.DERAbstractTime=function(t){et.asn1.DERAbstractTime.superclass.constructor.call(this),this.localDateToUTC=function(t){return utc=t.getTime()+6e4*t.getTimezoneOffset(),new Date(utc)},this.formatDate=function(t,e,i){var r=this.zeroPadding,n=this.localDateToUTC(t),s=String(n.getFullYear());"utc"==e&&(s=s.substr(2,2));var o=s+r(String(n.getMonth()+1),2)+r(String(n.getDate()),2)+r(String(n.getHours()),2)+r(String(n.getMinutes()),2)+r(String(n.getSeconds()),2);if(!0===i){var h=n.getMilliseconds();if(0!=h){var a=r(String(h),3);o=o+"."+(a=a.replace(/[0]+$/,""))}}return o+"Z"},this.zeroPadding=function(t,e){return t.length>=e?t:new Array(e-t.length+1).join("0")+t},this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(t)},this.setByDateValue=function(t,e,i,r,n,s){var o=new Date(Date.UTC(t,e-1,i,r,n,s,0));this.setByDate(o)},this.getFreshValueHex=function(){return this.hV}},tt.lang.extend(et.asn1.DERAbstractTime,et.asn1.ASN1Object),et.asn1.DERAbstractStructured=function(t){et.asn1.DERAbstractString.superclass.constructor.call(this),this.setByASN1ObjectArray=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array=t},this.appendASN1Object=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array.push(t)},this.asn1Array=new Array,void 0!==t&&void 0!==t.array&&(this.asn1Array=t.array)},tt.lang.extend(et.asn1.DERAbstractStructured,et.asn1.ASN1Object),et.asn1.DERBoolean=function(){et.asn1.DERBoolean.superclass.constructor.call(this),this.hT="01",this.hTLV="0101ff"},tt.lang.extend(et.asn1.DERBoolean,et.asn1.ASN1Object),et.asn1.DERInteger=function(t){et.asn1.DERInteger.superclass.constructor.call(this),this.hT="02",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new O(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.bigint?this.setByBigInteger(t.bigint):void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},tt.lang.extend(et.asn1.DERInteger,et.asn1.ASN1Object),et.asn1.DERBitString=function(t){if(void 0!==t&&void 0!==t.obj){var e=et.asn1.ASN1Util.newObject(t.obj);t.hex="00"+e.getEncodedHex()}et.asn1.DERBitString.superclass.constructor.call(this),this.hT="03",this.setHexValueIncludingUnusedBits=function(t){this.hTLV=null,this.isModified=!0,this.hV=t},this.setUnusedBitsAndHexValue=function(t,e){if(t<0||7<t)throw"unused bits shall be from 0 to 7: u = "+t;var i="0"+t;this.hTLV=null,this.isModified=!0,this.hV=i+e},this.setByBinaryString=function(t){var e=8-(t=t.replace(/0+$/,"")).length%8;8==e&&(e=0);for(var i=0;i<=e;i++)t+="0";var r="";for(i=0;i<t.length-1;i+=8){var n=t.substr(i,8),s=parseInt(n,2).toString(16);1==s.length&&(s="0"+s),r+=s}this.hTLV=null,this.isModified=!0,this.hV="0"+e+r},this.setByBooleanArray=function(t){for(var e="",i=0;i<t.length;i++)1==t[i]?e+="1":e+="0";this.setByBinaryString(e)},this.newFalseArray=function(t){for(var e=new Array(t),i=0;i<t;i++)e[i]=!1;return e},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t&&t.toLowerCase().match(/^[0-9a-f]+$/)?this.setHexValueIncludingUnusedBits(t):void 0!==t.hex?this.setHexValueIncludingUnusedBits(t.hex):void 0!==t.bin?this.setByBinaryString(t.bin):void 0!==t.array&&this.setByBooleanArray(t.array))},tt.lang.extend(et.asn1.DERBitString,et.asn1.ASN1Object),et.asn1.DEROctetString=function(t){if(void 0!==t&&void 0!==t.obj){var e=et.asn1.ASN1Util.newObject(t.obj);t.hex=e.getEncodedHex()}et.asn1.DEROctetString.superclass.constructor.call(this,t),this.hT="04"},tt.lang.extend(et.asn1.DEROctetString,et.asn1.DERAbstractString),et.asn1.DERNull=function(){et.asn1.DERNull.superclass.constructor.call(this),this.hT="05",this.hTLV="0500"},tt.lang.extend(et.asn1.DERNull,et.asn1.ASN1Object),et.asn1.DERObjectIdentifier=function(t){var h=function(t){var e=t.toString(16);return 1==e.length&&(e="0"+e),e},s=function(t){var e="",i=new O(t,10).toString(2),r=7-i.length%7;7==r&&(r=0);for(var n="",s=0;s<r;s++)n+="0";i=n+i;for(s=0;s<i.length-1;s+=7){var o=i.substr(s,7);s!=i.length-7&&(o="1"+o),e+=h(parseInt(o,2))}return e};et.asn1.DERObjectIdentifier.superclass.constructor.call(this),this.hT="06",this.setValueHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.setValueOidString=function(t){if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var e="",i=t.split("."),r=40*parseInt(i[0])+parseInt(i[1]);e+=h(r),i.splice(0,2);for(var n=0;n<i.length;n++)e+=s(i[n]);this.hTLV=null,this.isModified=!0,this.s=null,this.hV=e},this.setValueName=function(t){var e=et.asn1.x509.OID.name2oid(t);if(""===e)throw"DERObjectIdentifier oidName undefined: "+t;this.setValueOidString(e)},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?t.match(/^[0-2].[0-9.]+$/)?this.setValueOidString(t):this.setValueName(t):void 0!==t.oid?this.setValueOidString(t.oid):void 0!==t.hex?this.setValueHex(t.hex):void 0!==t.name&&this.setValueName(t.name))},tt.lang.extend(et.asn1.DERObjectIdentifier,et.asn1.ASN1Object),et.asn1.DEREnumerated=function(t){et.asn1.DEREnumerated.superclass.constructor.call(this),this.hT="0a",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new O(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},tt.lang.extend(et.asn1.DEREnumerated,et.asn1.ASN1Object),et.asn1.DERUTF8String=function(t){et.asn1.DERUTF8String.superclass.constructor.call(this,t),this.hT="0c"},tt.lang.extend(et.asn1.DERUTF8String,et.asn1.DERAbstractString),et.asn1.DERNumericString=function(t){et.asn1.DERNumericString.superclass.constructor.call(this,t),this.hT="12"},tt.lang.extend(et.asn1.DERNumericString,et.asn1.DERAbstractString),et.asn1.DERPrintableString=function(t){et.asn1.DERPrintableString.superclass.constructor.call(this,t),this.hT="13"},tt.lang.extend(et.asn1.DERPrintableString,et.asn1.DERAbstractString),et.asn1.DERTeletexString=function(t){et.asn1.DERTeletexString.superclass.constructor.call(this,t),this.hT="14"},tt.lang.extend(et.asn1.DERTeletexString,et.asn1.DERAbstractString),et.asn1.DERIA5String=function(t){et.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="16"},tt.lang.extend(et.asn1.DERIA5String,et.asn1.DERAbstractString),et.asn1.DERUTCTime=function(t){et.asn1.DERUTCTime.superclass.constructor.call(this,t),this.hT="17",this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{12}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date))},tt.lang.extend(et.asn1.DERUTCTime,et.asn1.DERAbstractTime),et.asn1.DERGeneralizedTime=function(t){et.asn1.DERGeneralizedTime.superclass.constructor.call(this,t),this.hT="18",this.withMillis=!1,this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{14}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date),!0===t.millis&&(this.withMillis=!0))},tt.lang.extend(et.asn1.DERGeneralizedTime,et.asn1.DERAbstractTime),et.asn1.DERSequence=function(t){et.asn1.DERSequence.superclass.constructor.call(this,t),this.hT="30",this.getFreshValueHex=function(){for(var t="",e=0;e<this.asn1Array.length;e++){t+=this.asn1Array[e].getEncodedHex()}return this.hV=t,this.hV}},tt.lang.extend(et.asn1.DERSequence,et.asn1.DERAbstractStructured),et.asn1.DERSet=function(t){et.asn1.DERSet.superclass.constructor.call(this,t),this.hT="31",this.sortFlag=!0,this.getFreshValueHex=function(){for(var t=new Array,e=0;e<this.asn1Array.length;e++){var i=this.asn1Array[e];t.push(i.getEncodedHex())}return 1==this.sortFlag&&t.sort(),this.hV=t.join(""),this.hV},void 0!==t&&void 0!==t.sortflag&&0==t.sortflag&&(this.sortFlag=!1)},tt.lang.extend(et.asn1.DERSet,et.asn1.DERAbstractStructured),et.asn1.DERTaggedObject=function(t){et.asn1.DERTaggedObject.superclass.constructor.call(this),this.hT="a0",this.hV="",this.isExplicit=!0,this.asn1Object=null,this.setASN1Object=function(t,e,i){this.hT=e,this.isExplicit=t,this.asn1Object=i,this.isExplicit?(this.hV=this.asn1Object.getEncodedHex(),this.hTLV=null,this.isModified=!0):(this.hV=null,this.hTLV=i.getEncodedHex(),this.hTLV=this.hTLV.replace(/^../,e),this.isModified=!1)},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.tag&&(this.hT=t.tag),void 0!==t.explicit&&(this.isExplicit=t.explicit),void 0!==t.obj&&(this.asn1Object=t.obj,this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)))},tt.lang.extend(et.asn1.DERTaggedObject,et.asn1.ASN1Object);var it=function(i){function r(t){var e=i.call(this)||this;return t&&("string"==typeof t?e.parseKey(t):(r.hasPrivateKeyProperty(t)||r.hasPublicKeyProperty(t))&&e.parsePropertiesFrom(t)),e}return function(t,e){function i(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}(r,i),r.prototype.parseKey=function(t){try{var e=0,i=0,r=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t)?d(t):v.unarmor(t),n=x.decode(r);if(3===n.sub.length&&(n=n.sub[2].sub[0]),9===n.sub.length){e=n.sub[1].getHexStringValue(),this.n=q(e,16),i=n.sub[2].getHexStringValue(),this.e=parseInt(i,16);var s=n.sub[3].getHexStringValue();this.d=q(s,16);var o=n.sub[4].getHexStringValue();this.p=q(o,16);var h=n.sub[5].getHexStringValue();this.q=q(h,16);var a=n.sub[6].getHexStringValue();this.dmp1=q(a,16);var u=n.sub[7].getHexStringValue();this.dmq1=q(u,16);var c=n.sub[8].getHexStringValue();this.coeff=q(c,16)}else{if(2!==n.sub.length)return!1;var f=n.sub[1].sub[0];e=f.sub[0].getHexStringValue(),this.n=q(e,16),i=f.sub[1].getHexStringValue(),this.e=parseInt(i,16)}return!0}catch(t){return!1}},r.prototype.gprbk=function(){var t={array:[new et.asn1.DERInteger({int:0}),new et.asn1.DERInteger({bigint:this.n}),new et.asn1.DERInteger({int:this.e}),new et.asn1.DERInteger({bigint:this.d}),new et.asn1.DERInteger({bigint:this.p}),new et.asn1.DERInteger({bigint:this.q}),new et.asn1.DERInteger({bigint:this.dmp1}),new et.asn1.DERInteger({bigint:this.dmq1}),new et.asn1.DERInteger({bigint:this.coeff})]};return new et.asn1.DERSequence(t).getEncodedHex()},r.prototype.gprbkB64=function(){return c(this.gprbk())},r.prototype.gpubk=function(){var t=new et.asn1.DERSequence({array:[new et.asn1.DERObjectIdentifier({oid:"1.2.840.113549.1.1.1"}),new et.asn1.DERNull]}),e=new et.asn1.DERSequence({array:[new et.asn1.DERInteger({bigint:this.n}),new et.asn1.DERInteger({int:this.e})]}),i=new et.asn1.DERBitString({hex:"00"+e.getEncodedHex()});return new et.asn1.DERSequence({array:[t,i]}).getEncodedHex()},r.prototype.gpubkB64=function(){return c(this.gpubk())},r.wordwrap=function(t,e){if(!t)return t;var i="(.{1,"+(e=e||64)+"})( +|$\n?)|(.{1,"+e+"})";return t.match(RegExp(i,"g")).join("\n")},r.prototype.gprk=function(){var t="-----BEGIN RSA PRIVATE KEY-----\n";return t+=r.wordwrap(this.gprbkB64())+"\n",t+="-----END RSA PRIVATE KEY-----"},r.prototype.gpuk=function(){var t="-----BEGIN PUBLIC KEY-----\n";return t+=r.wordwrap(this.gpubkB64())+"\n",t+="-----END PUBLIC KEY-----"},r.hasPublicKeyProperty=function(t){return(t=t||{}).hasOwnProperty("n")&&t.hasOwnProperty("e")},r.hasPrivateKeyProperty=function(t){return(t=t||{}).hasOwnProperty("n")&&t.hasOwnProperty("e")&&t.hasOwnProperty("d")&&t.hasOwnProperty("p")&&t.hasOwnProperty("q")&&t.hasOwnProperty("dmp1")&&t.hasOwnProperty("dmq1")&&t.hasOwnProperty("coeff")},r.prototype.parsePropertiesFrom=function(t){this.n=t.n,this.e=t.e,t.hasOwnProperty("d")&&(this.d=t.d,this.p=t.p,this.q=t.q,this.dmp1=t.dmp1,this.dmq1=t.dmq1,this.coeff=t.coeff)},r}(Q),rt=function(){function t(t){t=t||{},this.default_key_size=parseInt(t.default_key_size,10)||1024,this.default_public_exponent=t.default_public_exponent||"010001",this.log=t.log||!1,this.key=null}return t.prototype.setKey=function(t){this.log&&this.key&&console.warn("A key was already set, overriding existing."),this.key=new it(t)},t.prototype.sprk=function(t){this.setKey(t)},t.prototype.spuk=function(t){this.setKey(t)},t.prototype.dect=function(t){try{return this.getKey().dect(f(t))}catch(t){return!1}},t.prototype.enct=function(t){try{return c(this.getKey().enct(t))}catch(t){return!1}},t.prototype.sign=function(t,e,i){try{return c(this.getKey().sign(t,e,i))}catch(t){return!1}},t.prototype.verify=function(t,e,i){try{return this.getKey().verify(t,f(e),i)}catch(t){return!1}},t.prototype.getKey=function(t){if(!this.key){if(this.key=new it,t&&"[object Function]"==={}.toString.call(t))return void this.key.generateAsync(this.default_key_size,this.default_public_exponent,t);this.key.generate(this.default_key_size,this.default_public_exponent)}return this.key},t.prototype.gprk=function(){return this.getKey().gprk()},t.prototype.gprkB64=function(){return this.getKey().gprbkB64()},t.prototype.gpuk=function(){return this.getKey().gpuk()},t.prototype.gpukB64=function(){return this.getKey().gpubkB64()},t.version="3.0.0-rc.1",t}();window.LE=rt,t.LE=rt,t.default=rt,Object.defineProperty(t,"__esModule",{value:!0})});

// 	//获得md5 -- start
// 	function safeAdd (x, y) {
//     var lsw = (x & 0xffff) + (y & 0xffff)
//     var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
//     return (msw << 16) | (lsw & 0xffff)
//   }

//   /*
//   * Bitwise rotate a 32-bit number to the left.
//   */
//   function bitRotateLeft (num, cnt) {
//     return (num << cnt) | (num >>> (32 - cnt))
//   }

//   /*
//   * These functions implement the four basic operations the algorithm uses.
//   */
//   function md5cmn (q, a, b, x, s, t) {
//     return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
//   }
//   function md5ff (a, b, c, d, x, s, t) {
//     return md5cmn((b & c) | (~b & d), a, b, x, s, t)
//   }
//   function md5gg (a, b, c, d, x, s, t) {
//     return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
//   }
//   function md5hh (a, b, c, d, x, s, t) {
//     return md5cmn(b ^ c ^ d, a, b, x, s, t)
//   }
//   function md5ii (a, b, c, d, x, s, t) {
//     return md5cmn(c ^ (b | ~d), a, b, x, s, t)
//   }

//   /*
//   * Calculate the MD5 of an array of little-endian words, and a bit length.
//   */
//   function binlMD5 (x, len) {
//     /* append padding */
//     x[len >> 5] |= 0x80 << (len % 32)
//     x[((len + 64) >>> 9 << 4) + 14] = len

//     var i
//     var olda
//     var oldb
//     var oldc
//     var oldd
//     var a = 1732584193
//     var b = -271733879
//     var c = -1732584194
//     var d = 271733878

//     for (i = 0; i < x.length; i += 16) {
//       olda = a
//       oldb = b
//       oldc = c
//       oldd = d

//       a = md5ff(a, b, c, d, x[i], 7, -680876936)
//       d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
//       c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
//       b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
//       a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
//       d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
//       c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
//       b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
//       a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
//       d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
//       c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
//       b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
//       a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
//       d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
//       c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
//       b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

//       a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
//       d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
//       c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
//       b = md5gg(b, c, d, a, x[i], 20, -373897302)
//       a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
//       d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
//       c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
//       b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
//       a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
//       d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
//       c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
//       b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
//       a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
//       d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
//       c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
//       b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

//       a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
//       d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
//       c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
//       b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
//       a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
//       d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
//       c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
//       b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
//       a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
//       d = md5hh(d, a, b, c, x[i], 11, -358537222)
//       c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
//       b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
//       a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
//       d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
//       c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
//       b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

//       a = md5ii(a, b, c, d, x[i], 6, -198630844)
//       d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
//       c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
//       b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
//       a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
//       d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
//       c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
//       b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
//       a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
//       d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
//       c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
//       b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
//       a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
//       d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
//       c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
//       b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

//       a = safeAdd(a, olda)
//       b = safeAdd(b, oldb)
//       c = safeAdd(c, oldc)
//       d = safeAdd(d, oldd)
//     }
//     return [a, b, c, d]
//   }

//   /*
//   * Convert an array of little-endian words to a string
//   */
//   function binl2rstr (input) {
//     var i
//     var output = ''
//     var length32 = input.length * 32
//     for (i = 0; i < length32; i += 8) {
//       output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
//     }
//     return output
//   }

//   /*
//   * Convert a raw string to an array of little-endian words
//   * Characters >255 have their high-byte silently ignored.
//   */
//   function rstr2binl (input) {
//     var i
//     var output = []
//     output[(input.length >> 2) - 1] = undefined
//     for (i = 0; i < output.length; i += 1) {
//       output[i] = 0
//     }
//     var length8 = input.length * 8
//     for (i = 0; i < length8; i += 8) {
//       output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
//     }
//     return output
//   }

//   /*
//   * Calculate the MD5 of a raw string
//   */
//   function rstrMD5 (s) {
//     return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
//   }

//   /*
//   * Calculate the HMAC-MD5, of a key and some data (raw strings)
//   */
//   function rstrHMACMD5 (key, data) {
//     var i
//     var bkey = rstr2binl(key)
//     var ipad = []
//     var opad = []
//     var hash
//     ipad[15] = opad[15] = undefined
//     if (bkey.length > 16) {
//       bkey = binlMD5(bkey, key.length * 8)
//     }
//     for (i = 0; i < 16; i += 1) {
//       ipad[i] = bkey[i] ^ 0x36363636
//       opad[i] = bkey[i] ^ 0x5c5c5c5c
//     }
//     hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
//     return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
//   }

//   /*
//   * Convert a raw string to a hex string
//   */
//   function rstr2hex (input) {
//     var hexTab = '0123456789abcdef'
//     var output = ''
//     var x
//     var i
//     for (i = 0; i < input.length; i += 1) {
//       x = input.charCodeAt(i)
//       output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
//     }
//     return output
//   }

//   /*
//   * Encode a string as utf-8
//   */
//   function str2rstrUTF8 (input) {
//     return unescape(encodeURIComponent(input))
//   }

//   /*
//   * Take string arguments and return either raw or hex encoded strings
//   */
//   function rawMD5 (s) {
//     return rstrMD5(str2rstrUTF8(s))
//   }
//   function hexMD5 (s) {
//     return rstr2hex(rawMD5(s))
//   }
//   function rawHMACMD5 (k, d) {
//     return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
//   }
//   function hexHMACMD5 (k, d) {
//     return rstr2hex(rawHMACMD5(k, d))
//   }

//   function md5 (string, key, raw) {
//     if (!key) {
//       if (!raw) {
//         return hexMD5(string)
//       }
//       return rawMD5(string)
//     }
//     if (!raw) {
//       return hexHMACMD5(key, string)
//     }
//     return rawHMACMD5(key, string)
//   }

//   if (true) {
//     !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
//       return md5
//     }).call(exports, __webpack_require__, exports, module),
// 				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
//   } else {}
	
// 	return licence;
// };


// /***/ })
// /******/ ]);

// export default hydra;

import * as d3 from 'd3v4';

var hydra =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
var webixv = {};

webixv.version = '2.0.1';
webixv.graph = __webpack_require__(5);

module.exports = webixv;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var selfURL = document.getElementsByTagName('script')[document.getElementsByTagName('script').length -1].src;
module.exports = function () {
	/**
   * 定义命名空间
   * @namespace graph
   */
	var graph = {},
		opt = {
			selecter : '#hydra',
			width : 800,
			height : 600,
			circle : {
				r : 32,
				color : "#fff",
				stroke: "#009AED",
				strokeSelectd: "#ABC700",
				strokefixed: "#C9C9C9",
				selected : "#fff",
				zoomColor : "blue",
				fixedColor : '#a1a1a1',
				fillColor : '#f2f2f2'
			}, 
			NTConfig : {
				NTViewArea_Stroke : 'blue', 
				NTViewArea_StrokeWidth : 1, 
				NTRect_Fill : 'white', 
				NTNode_Stroke : 'red', 
				NTNode_StrokeWidth : 1, 
				NTNode_Fill : 'red', 
				NTLink_Stroke : 'red',
				NTLink_StrokeWidth : 1,
				NTLink_Fill : 'none',
				NTSelected_Stroke : 'blue',
				NTSelected_StrokeWidth : 1,
				NTSelected_Fill : 'blue',
				ThumbnailSize : .2 //默认略缩图缩放比
			},
			properties:{
				profession:"焊工",
				HJD:"地址",
				STATE:"状态",
				RYBQ:"标签数:",
				politicsStatus:"",
				STATE_COLOR:"",
				XM:"姓名",
				phone:"电话",
				PERSON_ID:"编号",
				FIVE_ONE_PROPERTY:"",
				GENDER:"性别",
				PERSON_DESCRIPTION:"备注",
				SFZHM:"身份证号"
			},
			useNT:false,
			icons : [],
			useForce : true, //启用力导向 默认值均为false
			selectNode : function(){},
			selectLink : function(){},
			expandEvt : function(){},
			bgclick : function(){} 
		},
		tools = __webpack_require__(6)(graph),
		Node = __webpack_require__(7)(graph),
		Link = __webpack_require__(8)(graph),		
		//saveAsPng = __webpack_require__(9)(graph),
		license = __webpack_require__(10)(graph),
		nodeObjs = [],
		linkObjs = [],
		graphContainer,container,bg_rect,simulation,
		node, nodeGroup,link, linkGroup,
		linkText, linkTextGroup,
		isdraged = false,
		initIsFinish = false,
		initOnce = true,
		svg_scale = 1, 
		svg_offsetX = 0, 
		svg_offsetY = 0,//当前缩放比
		useAdapt = false,
		selectedNodesArr = [],
		selectedLinkLabelsArr = [],
		selectedLinkLabelRectsArr = [],
		eventType = '', //键盘触发事件的类型
		simulationEventType = '', //模拟按键类型
		touching = false, 
		area_x, area_y, area_w, area_h, //框选用变量
		BoxArea, g_main, g_o,
		g_main_init = false,
		delObjArr = [],
		repeatViewId = {}, //key是viewid, val是对应的nodeid
		repeatNodes = {}, //key是重复的nodeid, val是被取代的nodeid
		ThumbnailTR = {},
		NT, NTNode, NTLink, NTRect, NTViewArea, NTSelected,
		js5, stop_ticked = false, tick=0,
		dataIsInit = false,
		filterTypeArray = []
		;
	
	/**测试 start**/
	var startTime = null;
	var forceStart = null;
	var forceEnd = null;
	var renderEnd = null;
	var ntStart = null;
	var ntEnd = null;
	var tickCount = 0;
	function calculateTime (start, end) {
		return (end - start)/1000 + 's';
	}
	/**测试 end**/
	//渲染dom
	function redrawContent(){
		node = nodeGroup.selectAll("g").data(nodeObjs);
		node = node.enter().append("g")
						.attr("type", "node")
						.attr("nodeType",function(d){ 
							return d.nodeType; 
						})
						.attr("id", function(d) { 
							return 'node-' + d.id;
						})
						.merge(node);
		simulation.nodes(nodeObjs)
			.on("tick", ticked)
			.on("end", ticked_end);
    simulation
	    .force("link")
	    .links(linkObjs);
	    
    var circles = node.append('circle')
    		.attr('class', 'clrcle')
				.attr('r', function(d) {
					return opt.circle.r*(!d.exist ? 0.65 : 1);
				})
				.attr('fill',function (d) {
					if (!d.exist || (d.exist && d.image)) {
						return '#ffffff';
					}
					return d.color ? '#fff' : d.icon.fill;
				}).attr('stroke', function(d){
					return !d.exist ? '#a1a1a1' : (d.color || d.icon.color);
				}).attr('stroke-width', function(d){
					return !d.exist ? 3 : 5;
				});
		node.append('path')
			.attr('d', function(d){ 
				return  d.exist && d.image ? '' : d.icon.path
			})
			.attr('fill', function(d){
				return !d.exist ? '#a1a1a1' : (d.color || d.icon.color);
			})
			.attr('transform', function(d) {
				if (!d.exist) {
					return 'translate(-14,-15)scale(0.028)';
				} 
				return 'translate(-23,-24)scale(0.045)';
			});

		node.append('image')
			.attr('xlink:href', function(d){ 
				return d.exist ? d.image : '';
			})
			.attr('style',function(d) {
				return (!d.image || !d.exist)  ? 'display:none' : '';
			})
			.attr('width', 65)
			.attr('height', 75)
			.attr('transform', function(d) {
				return 'translate(-19,-22)scale(0.58)';
			});
			
		node.insert('rect',':first-child')
			.attr('class','noderect')
			.attr('style',function(d) {
				if (!d.exist || !d.getPropLength()) {
					return 'display:none';
				}
			})
			.attr('stroke',function(d){
				return d.color || d.icon.color;
			})
			.attr('stroke-width',1)
			.attr('fill','#f2f2f2');
		
		node.append("text")
			.attr('id',function(d){ return 'node-label-'+d.id; })
	    .attr('y',opt.circle.r+10).attr('text-anchor','middle')
	    .selectAll('tspan')
	    .data(function(d) {
				var a = d.getPropList(), arr=[];
				if (a.length > 3) {
					arr = a.slice(0,2);
					arr.push('...');
				}else{
					arr = a;
				}
	      return arr;
	    }).enter().append('tspan').attr('dy', function(d, i) {
	        return 14;
	    }).attr('x', -1).text(function(d) {
	        return d;
	    });

		link = linkGroup.selectAll("path").data(linkObjs).enter().append("path")
			.attr("id", function(d) { return "link-" + d.id; })
			.attr("source", function(d) { return "node-" + d.source.id; })
			.attr("target", function(d) { return "node-" + d.target.id; })
			.attr("stroke-width", function(d) { return Math.sqrt(d.value); })
			.attr("stroke",function(d){ return d.color==undefined||d.color==""?"#999":d.color; })
			.attr("fill","none");
	
    linkText = linkTextGroup.selectAll("g").data(linkObjs).enter();  
			
    linkText = linkText.append("g")
	    .attr("id", function(d){ return "link-label-"+d.id; })
	    .attr("source", function(d){ return "link-label-"+d.source.id; }) 
	    .attr("target", function(d){ return "link-label-"+d.target.id; })
	    .attr('text-anchor','middle')
	    .attr('cursor','pointer')
	    .attr('style', function(d){ 
	    	return d.source == d.target ? 'display:none' : 'display:block';
	    });
	    

    linkText.append("text")
	    .attr('type','linktext')
	    .attr("id", function(d){ return "link-text-"+d.id; })
	    .selectAll('tspan').data(function(d) {
	      return [d.getPropList()[0]];
	    })
	    .enter()
	    .append('tspan')
	    .attr('x',0)
	    .attr('dy',function(text,i,arr){
	    	return i==0? (arr.length-1)*-15/2:15;
	    })
	    .text(function(d) {
	        return d;
	    })
	    .attr('fill','#666');
    
		linkText.insert('rect',':first-child')
			.attr('class', 'linkrect')
			.attr('fill','#fff')
			.attr("fill-opacity", function(d) {
				return !d.getPropLength() ? 0 : 1;
			})
			.attr('stroke', '#ccc')
			.attr('stroke-width',function(d) {
				return !d.getPropLength() ? 0 : 1;
			})
			.attr('id',function(d){ return 'link-label-rect-'+d.id;} )
			.attr('linkid',function(d){ return d.id;} )
			
			.attr('width',function(d){
				return d.getPropWidth();
			})
			.attr('height',function(d){
				return d.getPropHeight();
			})
			.attr('x',function(d){
				return 0;
			})
			.attr('y',function(d){
				return -2;
			})
			.attr('rx', 16)
			.attr('ry', 16);

		var ellipsis = linkText.append('g')
			.attr('class', 'ellipsis')
			.attr('style', 'display:none');

		ellipsis.append('circle')
			.attr('r', 14)
			.attr('fill', '#fff')
			.attr('stroke-width', 1)
			.attr('stroke', '#dadada')
		ellipsis.append('text')
			.attr('style', 'font-size:16px')
			.text('...')

		var more = linkText.append('g')
    	.attr('class', function(d){
    		return d.getPropLength() > 1 ? 'more' :'nomore'
    	});
    more.append('circle')
			.attr('r',5)
			.attr('fill', '#fff')
			.attr('stroke-width', 1)
			.attr('stroke', '#8b8b8b')
		more.append('text').text('...')
		//显示标签
    addEvent ();
	}

	function dragstarted(d) {
		if (d.isfixed) return;
		//simulation.alphaMin(0.001);
	  if (!d3.event.active && opt.useForce)
	      simulation.alphaTarget(1).restart();
	  d.fx = d.x;
	  d.fy = d.y;
		//isdraged = true;
	}

	function dragged(d) {
		if (d.isfixed) return;
		d.fx = d3.event.x;
		d.fy = d3.event.y;
		if (!opt.useForce) {
			draw();
		}
		//选中效果
		linkTextGroup/*.selectAll(show_link_labels_id)*/.selectAll('rect')
		.attr("transform", function(d) {
			var x = d.getCenter().x-d.getPropWidth()/2;
			var y = d.getCenter().y-d.getPropHeight()/2; 
			return "translate(" + x + "," + y + ")";
		});
	}

	function dragended(d) {
		draw();
		if (opt.useForce) {
			if (!d3.event.active)
	      simulation.alphaTarget(0);
			d.fx = null;
	  	d.fy = null;
		}
		Thumbnail();
	}

	//绘制
	function draw() {
		//性能检测 --start
		tickCount++;
		//性能检测 --end
		//drawNode
    node
	    .attr("transform", function(d) {
				//console.log(d,'力导向位置');
	      //return "translate(" + d.x + "," + d.y + ")";
				return 'translate('+d.x+','+d.y+')' + (d.useKeyNode ? 'scale('+ d.nodeScale +')' : '');
	    }).attr("x", function(d) {
	    	if (!opt.useForce || d.isfixed) {
    			d.x = d.fx || d.x;
    			d.fx = d.x;
    		}
	      return d.x;
	    }).attr("y", function(d) {
	    	if (!opt.useForce || d.isfixed) {
    			d.y = d.fy || d.y;
	    		d.fy = d.y;
	    	}
	      return d.y;
	    });
	    
		drawPathBezier(link);	    
		linkText.selectAll("[type='linktext']")
			.attr("transform", function(d) {
				return "translate(" + d.getCenter().x + "," + d.getCenter().y + ")";	
			});
		
		linkTextGroup.selectAll('rect')
			.attr("transform", function(d) {
				var x = d.getCenter().x - d.getPropWidth()/2;
				var y = d.getCenter().y - d.getPropHeight()/2;

				return "translate(" + x + "," + y + ")";
			});
		//待完善
		linkTextGroup.selectAll('g.ellipsis')
			.attr('transform', function(d) {
				var pos = d.getCenter();
				return "translate("+(pos.x-2)+","+(pos.y-2)+")";
			});
		linkTextGroup.selectAll('g.more')
			.attr('transform', function(d){
				var pos = d.getCenter();
				var x = pos.x + d.getPropWidth()/2 -10;
				var y = pos.y-2;
				return "translate("+ x +","+ y +")";
			});
	}

	function drawPathBezier(ele){
		ele.attr("d",function(d){
			//判断同nodes的link
			var linksArr = [];
			if(d['BothNodeLinks']){
				linksArr = d['BothNodeLinks'];
			}else{
				var sid = d.source.id, tid = d.target.id;
				ele.filter(function(e){
					if(
						(e.source.id==sid && e.target.id==tid) ||
						(e.target.id==sid && e.source.id==tid)
					){
						linksArr.push(e.id);
					}
				});
			}
			if(linksArr.indexOf(d.id) == 0){
				linkGroup.select('#link-mark-path-'+d.id).selectAll('animateMotion')
					.attr('path',function(item){
						if('reverse' == item.direction){
							return "M"+d.target.x+","+d.target.y+" L"+d.source.x+","+d.source.y;
						}else{
							return "M"+d.source.x+","+d.source.y+" L"+d.target.x+","+d.target.y;
						}
					});
				
				if('reverse' == d.direction){
					return "M"+d.target.x+","+d.target.y+" L"+d.source.x+","+d.source.y;
				}else{
					return "M"+d.source.x+","+d.source.y+" L"+d.target.x+","+d.target.y;
				}
			}else{
				var index = linksArr.indexOf(d.id);
				var sx = d.source.x, sy = d.source.y;
	    	var tx = d.target.x, ty = d.target.y;
	    	var spx = sx, spy = sy, tpx = tx, tpy = ty, py = 25;
	    	var a = Math.abs(sx - tx);
	    	var b = Math.abs(sy - ty);
	    	var c = Math.sqrt(a*a+b*b);
	    	var pyX = (py*b)/c * Math.ceil(index/2);
	    	var pyY = (py*a)/c * Math.ceil(index/2);
				if(index%2 == 1){
					//t在s的第几象限
			    	if(tx>sx){
			    		if(ty>sy){
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx-=pyX, spy+=pyY; tpx-=pyX, tpy+=pyY;
			    			}else{
			    				spx-=pyX, spy+=pyY; tpx-=pyX, tpy+=pyY;
			    			}
			    		}else{
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx+=pyX, spy+=pyY; tpx+=pyX, tpy+=pyY;
			    			}else{
			    				spx+=pyX, spy+=pyY; tpx+=pyX, tpy+=pyY;
			    			}
			    		}
			    	}else{
			    		if(ty>sy){
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx-=pyX, spy-=pyY, tpx-=pyX, tpy-=pyY;
			    			}else{
			    				spx-=pyX, spy-=pyY, tpx-=pyX, tpy-=pyY;
			    			}
			    		}else{
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx+=pyX, spy-=pyY, tpx+=pyX, tpy-=pyY;
			    			}else{
			    				spx+=pyX, spy-=pyY, tpx+=pyX, tpy-=pyY;
			    			}
			    		}
			    	}
				}else{
					//t在s的第几象限
			    	if(tx>sx){
			    		if(ty>sy){
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx+=pyX, spy-=pyY; tpx+=pyX, tpy-=pyY;
			    			}else{
			    				spx+=pyX, spy-=pyY; tpx+=pyX, tpy-=pyY;
			    			}
			    		}else{
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx-=pyX, spy-=pyY; tpx-=pyX, tpy-=pyY;
			    			}else{
			    				spx-=pyX, spy-=pyY; tpx-=pyX, tpy-=pyY;
			    			}
			    		}
			    	}else{
			    		if(ty>sy){
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx+=pyX, spy+=pyY, tpx+=pyX, tpy+=pyY;
			    			}else{
			    				spx+=pyX, spy+=pyY, tpx+=pyX, tpy+=pyY;
			    			}
			    		}else{
			    			if(Math.abs(spx-tpx) > Math.abs(spy-tpy)){
			    				spx-=pyX, spy+=pyY, tpx-=pyX, tpy+=pyY;
			    			}else{
			    				spx-=pyX, spy+=pyY, tpx-=pyX, tpy+=pyY;
			    			}
			    		}
			    	}	
				}
				
				linkGroup.select('#link-mark-path-'+d.id).selectAll('animateMotion')
					.attr('path',function(item){
						if('reverse' == item.direction){
							return "M"+tx+","+ty+" C"+tpx+","+tpy+" "+spx+","+spy+" "+sx+","+sy;
						}else{
							return "M"+sx+","+sy+" C"+spx+","+spy+" "+tpx+","+tpy+" "+tx+","+ty;
						}
					});
				
				if('reverse' == d.direction){
					return "M"+tx+","+ty+" C"+tpx+","+tpy+" "+spx+","+spy+" "+sx+","+sy;
				}else{
					return "M"+sx+","+sy+" C"+spx+","+spy+" "+tpx+","+tpy+" "+tx+","+ty;
				}
			}
	  });
	}
	
	function ticked_end() {
		if(!opt.useNT) return;
		//性能检测 --start
		if (opt.useForce) {
			forceEnd = new Date().getTime();
			//console.log('加载实体个数：', nodeObjs.length)
			//console.log('加载关系个数：', linkObjs.length)
			//console.log('\n力导向开启到结束时间差',calculateTime(forceStart, forceEnd))
		}
		//性能检测 --end
	  draw();
	  viewData();
		Thumbnail();
	  if (opt.useForce) {
			initIsFinish = true;
			//性能检测
			//console.log('渲染次数：',tickCount);
			//性能检测
		}
    if (initOnce) {
    	// graph.displayAdapt();
    	initOnce = false;
    }
	}

	function ticked() {
		tick++;
		draw();
		if (!opt.useForce) {
			simulation.stop();
			forceEnd = new Date().getTime();
			//console.log('渲染次数：',tickCount);
			//console.log('力导向启动与结束时间差：', calculateTime(forceStart, forceEnd));
			//console.log('计算结束,与数据加载时间差（不使用力导向）-', calculateTime(startTime, forceEnd));
		}
		// if (tick >= 50) {
		// 	simulation.stop();
		// }
		graphContainer.attr('style','display:block;');
		if(!stop_ticked){
			viewData();
			Thumbnail();
		}
	}

	function zoomed() {
		if (useAdapt) {
			d3.event.transform.k = svg_scale;
			d3.event.transform.x = svg_offsetX;
			d3.event.transform.y = svg_offsetY;
			useAdapt = false;
		}
		svg_scale = d3.event.transform.k;
		svg_offsetX = d3.event.transform.x;
		svg_offsetY = d3.event.transform.y;
    	container.attr("transform", "translate(" + svg_offsetX + "," + svg_offsetY + ")scale(" + svg_scale + ")");
    
		node.attr("transform",function(d){
			if (d.useKeyNode) {
				d.nodeScale = svg_scale <= 1 ? 1.5/svg_scale : svg_scale >= 1.5 ? 1 : 1.5;
			}else{
				d.nodeScale = 1;
			}
			return 'translate('+d.x+','+d.y+')' + (d.useKeyNode ? 'scale('+ d.nodeScale +')' : '');
		});
		draw();
		viewData();
		var glinks = d3.select('g.link-labels');
		glinks.selectAll('g.ellipsis').attr('style', 'display:' + (svg_scale < 0.8 ? 'block' : 'none'));
		glinks.selectAll('rect.linkrect,text[type="linktext"],g.more').attr('style', 'display:' + (svg_scale < 0.8 ? 'none' : 'block'));	
	}
	
	//获取显示区域对象
	function getViewArea(){
		var offset_x=0,offset_y=0;
		var svg_w = Number(d3.select('svg').attr('width'));
		var svg_h = Number(d3.select('svg').attr('height'));
		try{
	    	//svg宽高
			svg_w = svg_w / svg_scale;
			svg_h = svg_h / svg_scale;
			
			//可视区域左上角, 相对svg中心点的偏移    
			offset_x = svg_offsetX / svg_scale *-1;
			offset_y = svg_offsetY / svg_scale *-1;
		}catch(e){
			//console.log(e);
		}
		
		var view_min_x = offset_x;
		var view_max_x = offset_x + svg_w;
		var view_min_y = offset_y;
		var view_max_y = offset_y + svg_h;
		
		return [[view_min_x,view_min_y],[view_max_x,view_max_y]];
	}
	
	function viewData(all,fun){
		redrawNodeRect();
		if(fun){ fun(); }
		TNViewArea();
	}

	//绘制node rect背景
	function redrawNodeRect() {
		nodeGroup.selectAll('g[type="node"]').selectAll('rect.noderect')
			.attr('y',opt.circle.r+8)
	    .attr('x',function(d){
				return d.getPropWidth()*-0.5 -20;
			})
		  .attr('width',function(d){
				return d.getPropWidth() + 40;
			})
			.attr('height',function(d){
				return d.getPropLength()>3 && !d.isShowAll ? 52 : (d.getPropHeight()+8);
			})
			.attr('rx',function(d){
				return (d.getPropLength() < 3 ? d.getPropLength() : 3)*18/2;
			})
			.attr('ry',function(d){
				return (d.getPropLength() < 3 ? d.getPropLength() : 3)*18/2;
			});
	}
	
	//事件绑定
	function addEvent () {
		node.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended))
			.on('mouseover', function() {
				if (!isdraged) {
					document.querySelector('.nodes').appendChild(this);
				}
			});
		node.on("click", evtClickNode);
    link.on("click.link", evtClickLink);
    linkText.on("click.linkText", evtClickLink);
    linkText.on("click.more", evtShowLinkMore);
    linkText.on("mouseover", function(){
    	this.remove();
    	document.querySelector('.link-labels').appendChild(this);
    });
		d3.select('body').on('keydown', evtKeydown);
		d3.select('body').on('keyup', evtkeyup);
		bg_rect.on('click.rect', bgclick);
		bg_rect.on('dblclick', function(){
			opt.bgclickEvt();
		});
		node.on('dblclick', evtExpandMenu);	
		document.querySelector('body').onclick = function (e) {
			if (e.target.tagName != 'path') {
				d3.selectAll('g.exMenuGroup').remove();
			}
			var box = document.querySelector('#rMenu');
			if (box) {
				box.style.display = 'none';
			}
		};
		NTRect.on("click.nt", evtClickNT);
	}

	//扩展菜单
	function evtExpandMenu (di) {
		if (!di.exist) return false;
		var me = this;
		d3.selectAll('g.exMenuGroup').remove();
		var dataset=[{
			text : '编辑',
			color : '#03509a',
			hColor : '#efa10b',
			type : 'edit',
			path : 'M649.118225 40.89351H143.783911C64.85209 40.89351 0 103.953634 0 181.733477V883.202699C0 961.025207 64.766759 1024 144.637228 1024h720.284861c79.955801 0 144.637228-63.102791 144.637228-140.925299V394.422734h-72.105285v488.651967c0 39.081918-32.426045 70.697312-72.531943 70.697312H144.637228c-40.105898 0-72.531943-31.572728-72.531943-70.61198V181.733477c0-38.911254 32.426045-70.61198 71.721292-70.61198h505.291648V40.89351z m-196.604232 465.953735a34.474006 34.474006 0 0 0 0 49.663049 36.735296 36.735296 0 0 0 50.98569 0L1013.399243 59.965144a34.474006 34.474006 0 0 0 0-49.663048 36.735296 36.735296 0 0 0-50.985689 0L452.513993 506.847245z',
			value : 5
		},{
			text : '删除',
			color : '#1464b2',
			hColor : '#efa10b',
			type : 'del',
			path : 'M568.96 512.064l326.336-326.336a39.232 39.232 0 1 0-55.552-55.552L513.408 456.512l-326.4-326.336a39.232 39.232 0 1 0-55.552 55.552l326.4 326.336L131.584 838.4a39.232 39.232 0 1 0 55.552 55.552l326.336-326.336 326.336 326.336c15.36 15.232 40.192 15.232 55.552 0a39.36 39.36 0 0 0 0-55.552l-326.4-326.336z',
			value : 5
		},{
			text : '锁定',
			color : '#297dce',
			hColor : '#efa10b',
			type : 'lock',
			path : 'M270.118128 307.243574C270.118128 173.883915 378.618553 65.361702 512 65.361702 645.35966 65.361702 753.860085 173.883915 753.860085 307.243574L753.860085 354.914043 270.118128 354.914043 270.118128 307.243574ZM827.914894 354.914043 819.221787 354.914043 819.221787 305.740255C819.221787 305.217362 819.091064 304.716255 819.069277 304.215149 817.413447 136.213787 680.371745 0 512 0 343.606468 0 206.564766 136.213787 204.908936 304.215149 204.887149 304.738043 204.756426 305.217362 204.756426 305.740255L204.756426 354.914043 196.085106 354.914043C130.004426 354.914043 76.255319 408.663149 76.255319 474.722043L76.255319 635.468255C76.255319 653.529872 90.874553 668.149106 108.93617 668.149106 126.976 668.149106 141.617021 653.529872 141.617021 635.468255L141.617021 474.722043C141.617021 444.699234 166.040511 420.253957 196.085106 420.253957L827.914894 420.253957C857.937702 420.253957 882.382979 444.699234 882.382979 474.722043L882.382979 796.693787C882.382979 904.344511 842.664851 948.267574 745.341277 948.267574L278.636936 948.267574C181.313362 948.267574 141.617021 904.344511 141.617021 796.693787 141.617021 778.653957 126.976 764.012936 108.93617 764.012936 90.874553 764.012936 76.255319 778.653957 76.255319 796.693787 76.255319 940.642043 144.340426 1013.629277 278.636936 1013.629277L745.341277 1013.629277C879.659574 1013.629277 947.744681 940.642043 947.744681 796.693787L947.744681 474.722043C947.744681 408.663149 893.973787 354.914043 827.914894 354.914043ZM511.991285 835.716902C536.828732 835.716902 557.025498 815.040817 557.025498 789.615115L557.025498 680.766094C578.159115 665.66754 591.03537 640.677583 591.03537 614.031796 591.03537 569.237243 555.565753 532.7872 511.991285 532.7872 468.416817 532.7872 432.9472 569.237243 432.9472 614.031796 432.9472 640.677583 445.845243 665.689328 467.000647 680.766094L467.000647 789.615115C467.000647 815.040817 487.175626 835.716902 511.991285 835.716902Z',
			value : 5
		},{
			text : '扩展',
			color : '#4498e9',
			hColor : '#efa10b',
			type : 'expand',
			path : 'M99.5 284.8h61.3v-74l260.3 260.3 43.4-43.4L198.8 162h84.8v-61.4H99.5zM869.1 825.8L603.4 560 560 603.4l260.3 260.4h-73.9v61.3h184.1V741h-61.4zM160.1 742.4H98.7v184.1h184.2v-61.3h-68.6l263.1-263.1-43.4-43.4-273.9 273.9zM742 102v61.3h90.2l-263 263.1 43.4 43.4 252.2-252.2v68.5h61.4V102z',
			value : 5
		},{
			text : '添加',
			color : '#4faafe',
			hColor : '#efa10b',
			type : 'add',
			path : 'M451.318 451.318h-364.036c-33.754 0-60.734 27.168-60.734 60.682 0 33.747 27.191 60.682 60.734 60.682h364.036v364.036c0 33.754 27.168 60.734 60.682 60.734 33.747 0 60.682-27.191 60.682-60.734v-364.036h364.036c33.754 0 60.734-27.168 60.734-60.682 0-33.747-27.191-60.682-60.734-60.682h-364.036v-364.036c0-33.754-27.168-60.734-60.682-60.734-33.747 0-60.682 27.191-60.682 60.734v364.036z',
			value : 5
		}];
		var exMenuGroup = d3.select(this)
												.append('g')
												.attr('class', 'exMenuGroup');
		var pie = d3.pie();
		var arc = d3.arc().innerRadius(80).outerRadius(40);
		var arcs = exMenuGroup.selectAll("g.arc")
			.data(pie(dataset.map(function(ele) {
				return ele.value;
			})))
			.enter()
			.append("g")
			.attr("class","arc")
			.attr("alt",function(d,i){
				return dataset[i].text;
			})
			.on('dblclick',function(d,i){  //扩展下一层改成双击事件
				opt.expandEvt(dataset[i],di,i);
				d3.selectAll('g.exMenuGroup').remove();
			});
		arcs.append("path")
			.attr("fill",function(d,i){
				return dataset[i].color;
			})
			.attr("d",arc)
			.on('mouseover',function(d, i){
				d3.select(this)
				.attr('fill',dataset[i].hColor);
			})
			.on('mouseout',function(d,i){
				d3.select(this)
				.attr('fill',dataset[i].color);
			});		
		arcs.append("path")
			.attr("d",function(d,i){
				return dataset[i].path;
			})
			.attr("fill","#fff")
			.attr("txet-anchor","middle")
      .attr("transform",function(d,i){
      	return "translate(" + (arc.centroid(d)[0]-10) + "," + (arc.centroid(d)[1]-10) + ")scale(0.02)";
      });
	}
	
	function evtClickNode(data) {
		var srcElement = d3.event.srcElement;
		if (['rect', 'tspan'].indexOf(srcElement.tagName) != -1 && 'ctrl' != eventType) {
			data.isShowAll = !data.isShowAll;
			var text = nodeGroup.select('#node-' + data.id).select('text');

			text.selectAll('tspan').data([]).exit().remove();
			text.selectAll('tspan').data(function() {
					var a = data.getPropList(), arr=[];
    			if (!data.isShowAll && a.length >3) {
    				arr = a.slice(0,2);
    				arr.push('...');
    			}else{
    				arr = a;
    			}
	        return arr;
				}).enter().append('tspan').attr('dy', function(d, i) {
	        return 14;
		    }).attr('x', -1).text(function(d) {
		        return d;
		    });
		  redrawNodeRect();

		}
		//点击tags circle或者text.tagnums   
		if (srcElement.tagName == 'circle' && srcElement.classList.value == 'tagcircle' || srcElement.tagName == 'text' && srcElement.classList.value == 'tagnums') {
			var tag = d3.select('#node-' + data.id).select('g.tag');
			tag.select('text.list').attr('style', 'display:' + (data.showTags ? 'block' : 'none'));
			tag.select('rect.tagrect').attr('style', 'display:' + (data.showTags ? 'block' : 'none'));
			data.showTags = !data.showTags;
		}
		if ('shift' == eventType) {
	
		} else if ('ctrl' == eventType) {
			var id_index = selectedNodesArr.indexOf('#node-' + data.id);
			if (id_index == -1) {
				selectedNodes([data.id]);
			} else {
				selectedNodesArr.splice(id_index, 1);
				nodeGroup.select('#node-' + data.id).attr('class','');
				nodeGroup.select('#node-label-' + data.id).attr('class','');
				nodeGroup.select('#node-' + data.id).selectAll('rect.noderect').remove();
			}
		}
	
		else {
			clearAllSelection();
			selectedNodes([data.id]);
		}
		
		Thumbnail();
	}

	function evtClickLink(data){
		if ('shift' == eventType) {
	
		} else if ('ctrl' == eventType) {
			var id_index = selectedLinkLabelsArr.indexOf('#link-label-' + data.id);
			if(id_index == -1){
				selectedLinks([data.id]);
			} else {
				selectedLinkLabelsArr.splice(id_index, 1);
				selectedLinkLabelRectsArr.splice(id_index, 1);
				
				linkTextGroup.selectAll('#link-label-'+data.id).select("[type='linktext']").attr('class','');
				linkTextGroup.selectAll('#link-label-rect-'+data.id).remove();
			}
		}
		
		else{
			clearAllSelection();
			selectedLinks([data.id]);
		}
	}

	function evtClickNT(){
		var ntsvg = document.getElementsByClassName('svgNT')[0].getBBox(),
			x = d3.event.offsetX/ThumbnailTR.k-(ntsvg.width/1)-opt.width/2,
		  	y = d3.event.offsetY/ThumbnailTR.k-(ntsvg.height/1)-opt.height/2
			;
		setTransform(-x, -y, svg_scale);
		TNViewArea();
	}

	function evtKeydown() {
		if (d3.event.shiftKey) {
			evtKeydown_shift();
		} else if (d3.event.ctrlKey) {
			evtKeydown_ctrl();
		}
	}

	function evtKeydown_shift(){
		eventType = 'shift';
		if(!g_main_init){
			g_main_init = true;
			g_o = g_main.append("g");
			g_o.attr("fill", "none")
				.attr("pointer-events", "all")
				.style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
				.on('mousedown.rect touchstart.rect', evtRectBoxSelection);
			var arr = getViewArea();
			var view_min_x = arr[0][0];
			var view_max_x = arr[1][0];
			var view_min_y = arr[0][1];
			var view_max_y = arr[1][1];	
			g_o.append("rect")
				.attr("class","overlay")
				.attr("pointer-events","all")
				.attr("cursor","crosshair")
				.attr("x",view_min_x).attr("y",view_min_y)
				.attr("width",view_max_x-view_min_x).attr("height",view_max_y-view_min_y);
			g_o.append("rect")
				.attr("class","selection")
				.attr("cursor", "move")
				.attr("fill", "#777")
				.attr("fill-opacity", 0.3)
				.attr("stroke", "#000000")
				.attr("shape-rendering", "crispEdges");
		}
	}
	
	function evtKeydown_ctrl(){
		eventType = 'ctrl';
		if (d3.event.keyCode == 65) {
			d3.event.returnValue = false;
			graph.selectedAll();
		}
	}
	
	function evtkeyup() {
		if ('shift' == eventType) {
			evtKeyup_shift();
		} else if ('ctrl' == eventType) {
			
		}	
		eventType = '';
	}
	
	function evtKeyup_shift(){
		evtRectEnd();
	}

	//关系超过两条事 显示更多关系
	function evtShowLinkMore () {}

	//按下shift时事件
	function evtRectBoxSelection(){
		if('shift' == eventType){
			touching = true;
      var me = this, p0 = d3.mouse(me);
			var view = d3.select(d3.event.view)
				          .on("mousemove.rect", function(){
				          	evtRectMove(me, p0)
				          }, true)
				          .on("mouseup.rect", evtRectMouseup, true);
		}
	}
	
	//按下shift时事件
	function evtRectMove(me, p0){
		//关闭鼠标左键拖动整个画布的效果
		d3.event.stopImmediatePropagation();
		var p1 = d3.mouse(me);
		if(p0[0] > p1[0]){
			area_x = p1[0], area_w = p0[0]-p1[0];
		}else{
			area_x = p0[0], area_w = p1[0]-p0[0];
		}
		if(p0[1] > p1[1]){
			area_y = p1[1], area_h = p0[1]-p1[1];
		}else{
			area_y = p0[1], area_h = p1[1]-p0[1];
		}
		
		if(!BoxArea){
			BoxArea = g_main.append('rect')
				.attr('id','rect-move-box')
				.attr('x', area_x).attr('y',area_y)
				.attr('width',area_w).attr('height',area_h)
				.attr("fill", "#777")
	            .attr("fill-opacity", 0.3)
	            .attr("stroke", "#000000")
	            .attr("shape-rendering", "crispEdges")
				;
		}else{
			BoxArea.attr('x', area_x).attr('y', area_y)
				.attr('width',area_w).attr('height',area_h);
		}
	}

	//按下shift时事件
	function evtRectMouseup(){
	  if(touching){
			evtRectEnd();
		}
	}

	//按下shift时事件
	function evtRectEnd(){
		var view = d3.select(d3.event.view)
        .on("mousemove.rect", null, true)
        .on("mouseup.rect", null, true);
    var nodes = [];
  	if(BoxArea){
    	BoxArea.remove(); BoxArea = null;
    	//根据选择区域, 过滤nodes
    	var selectedNodes = nodeGroup.selectAll("[type='node']")
									        	.filter(function(item,i){
															var now_x = item.x;
												    	var now_y = item.y;
												    	var flag = (now_x <= (area_x+area_w) && now_x >= area_x ) && (now_y <= (area_y+area_h) && now_y >= area_y );
												    	if(flag){ nodes.push(item.id); }
															return flag;
														});
    }
	if(g_o){
		g_o.remove(); g_o = null;
	}
    g_main_init = false;
    
    if(nodes.length > 0){
    	clearAllSelection();
    	graph.selectedElements(nodes, []);
    }
	if(simulationEventType == 'shift'){
		eventType = '';
		simulationEventType = '';
	}
    touching = false;
	}

	function bgclick(){
		if(simulationEventType == 'shift'){
			evtKeydown_shift();
		}else if(simulationEventType == 'ctrl'){
			evtKeydown_ctrl();
		}else if(simulationEventType == ''){
			clearAllSelection();
		}
	}
	
	//选中的实体（多个）
	function selectedNodes(idsArr){
		var node_ids = [], node_label_ids = [];
		for(var i=0;i<idsArr.length;i++){
			var id = idsArr[i];
			if(selectedNodesArr.indexOf('#node-' + id)<0){
				node_ids.push('#node-' + id);
				node_label_ids.push('#node-label-' + id);
				selectedNodesArr.push('#node-' + id);
			}
		}
		if(node_ids.length == 0) return;
		var selectFroup = nodeGroup.selectAll(node_ids.toString()).attr('class','selected');
		redrawNode(selectFroup);
		nodeGroup.selectAll(node_label_ids.toString()).attr('class','selected');
		// node.append('path')
		opt.selectNode && opt.selectNode(graph.getSelection().node);
	}

	//选中的关系（多个）
	function selectedLinks(idsArr){
		var link_label_ids = [], link_ids = [];
		for(var i=0;i<idsArr.length;i++){
			var id = idsArr[i];
			if(selectedLinkLabelsArr.indexOf('#link-label-' + id)<0){
				link_ids.push('#link-'+id);
				link_label_ids.push('#link-label-' + id);
				selectedLinkLabelsArr.push('#link-label-' + id);
				selectedLinkLabelRectsArr.push('#link-label-rect-' + id);
			}
		}
		if(link_label_ids.length == 0) return;
		
		var link_label = linkTextGroup.selectAll(link_label_ids.toString());
		link_label.select('rect').attr('stroke',function (d) {
			return d.color || '#2296ff';
		});
		link_label.select("[type='linktext']").attr('class','selected');
		var link_data = linkGroup.selectAll(link_ids.toString()).data();
		link_data = link_data.filter(function(item){
			return 'forward' == item.direction || "reverse" == item.direction;
		});
		var link_marker = linkGroup.data(link_data).append("path")
		.attr("id", function(d){ return "link-mark-path-"+d.id; })
		.attr("d", "M2,-4 L10,0 L2,4 L6,0 L2,-4")
		.attr("markerWidth", "12").attr("markerHeight", "12").attr("viewBox", "0 0 12 12")
		.attr("orient", "auto").attr("stroke", "red").attr("stroke-width", "2")
		.append("animateMotion")
		.attr("begin","0s").attr("dur","3s").attr("rotate","auto").attr("repeatCount","indefinite")
		.attr("path",function(d){
			return linkGroup.select('#link-'+d.id).attr('d');
		});
		opt.selectLink && opt.selectLink(link_ids);
	}
	
	//选中的元素
	function selectElements(node_ids, link_ids){
		selectedNodes(node_ids);
		selectedLinks(link_ids);
		Thumbnail();
	}
	
	//清除选中的关系
	function clearLinkSelection(){
		if (selectedLinkLabelsArr.length > 0) {
			linkTextGroup.selectAll(selectedLinkLabelsArr.toString()).selectAll('text').attr('class','');
			linkTextGroup.selectAll(selectedLinkLabelsArr.toString()).select('rect').attr('stroke', '#ccc');
			var link_path_marker = [];
			for(var i=0;i<selectedLinkLabelsArr.length;i++){
				var nid = selectedLinkLabelsArr[i].replace('label','mark-path');
				link_path_marker.push(nid);
			}
			linkGroup.selectAll(link_path_marker.toString()).remove();
			selectedLinkLabelsArr = [];selectedLinkLabelRectsArr = [];
		}
	}
	
	//清除选中的实体
	function clearNodeSelection(){
		if (selectedNodesArr.length > 0) {
			var s_node = nodeGroup.selectAll(selectedNodesArr.toString());
			s_node.attr('class','');
			s_node.selectAll('text').filter(function(ele) {
				return !ele.tags.length;
			}).attr('class','');
			if(svg_scale > 0.5){
				s_node.select('circle').attr('r',function(d) {
					return opt.circle.r*(!d.exist ? 0.65 : 1);
				});
			}
			s_node.select('circle')
				.attr('stroke',function(d){
					return !d.exist ? '#a1a1a1' : d.isfixed ? opt.circle.fixedColor : (d.color || d.icon.color);
				})
				.attr('stroke-width', function(d){
					return !d.exist ? 3 : 5;
				})
				.attr('fill',function(d){
					if (!d.exist || (d.exist && d.image)) {
						return '#ffffff';
					}
					return d.isfixed ? opt.circle.fillColor : d.color ? '#fff' : d.icon.fill;
				})
				.filter(function(ele){
					return ele.useKeyNode;
				});
			s_node.select('g.lock').selectAll('circle')
				.attr('fill', opt.circle.fixedColor);
			s_node.select('path').attr('fill', function(d){
				if (!d.exist) {
					return '#a1a1a1';
				}
				return  d.isfixed ? opt.circle.fixedColor : (d.color || d.icon.color);
			});
			s_node.select('rect.noderect').attr('stroke', function(d){
				return d.isfixed ? opt.circle.fixedColor : (d.color || d.icon.color);
			});
			selectedNodesArr = [];
		}
	}
	
	//清除选中的元素
	function clearAllSelection(){
		clearNodeSelection();
		clearLinkSelection();
		Thumbnail();
	}

	function addElement () {
		graph.clearDOM();
		redrawContent();
		draw();
		viewData();
		Thumbnail();
	}
	
	function parseData (msg) {
		for (var i = 0; i < msg.nodes.length; i++) {
			nodeObjs.push(new Node(msg.nodes[i]));
		}
		for (var j = 0; j < msg.links.length; j++) {
			linkObjs.push(new Link(msg.links[j]));
		}
	}
	
	//a1是目标区域, a2是需要缩放的区域, sc是默认缩放比
	function AreaSelfAdaption(a1,a2,sc){
		var rx,ry,rc=sc;
		rc = (a2.height/a1.height)>rc? rc:(a2.height/a1.height);
		rc = (a2.width/a1.width)>rc? rc:(a2.width/a1.width);
		rc = rc*0.9;
		var boxWidth = parseInt(d3.select(opt.selector).style('width'));
		var boxHeight = parseInt(d3.select(opt.selector).style('height'));
		var viewWidth = document.getElementById(container.attr('id')).getBBox().width;
		if(a1.width > a2.width && a1.height > a2.height){
			rx = rx>Math.abs(a1.x)? rx:Math.abs(a1.x)-Math.abs(a1.x)+((boxWidth-154)/2)-((viewWidth*rc)/2);
			ry = ry>Math.abs(a1.y)? ry:Math.abs(a1.y)-Math.abs(a1.y)+(boxHeight/4);
		}else if(a1.width > a2.width){
			rx = Math.abs((a2.width*rc/2) - (Math.abs(a1.x)+(a1.width*rc/2)))*rc;
			ry = ((a1.y+a1.height)/2 - a2.height*rc/2)*rc;
		}else if(a1.height > a2.height){
			rx = (boxWidth-154)/2-((a1.width*rc)/2);
			ry = Math.abs((a2.height*rc/2) - (Math.abs(a1.y)+(a1.height*rc/2)))*rc;
		}else{
			rx = a1.x; ry = a1.y;  
		}
		return {x:rx,y:ry,k:rc};
	}
	
	function Thumbnail(){
		renderEnd = new Date().getTime();
		//console.log('图形渲染所用时间', calculateTime(forceEnd, renderEnd));
		//console.log('全部耗时', calculateTime(startTime, renderEnd));
	
		// return;
		var s = 100;
		var va = document.getElementById('viewArea').getBBox();
		var ntsvg = document.getElementsByClassName('svgNT')[0].getBBox();
		va.height += s; va.width += s;
		ThumbnailTR = AreaSelfAdaption(
			va, ntsvg, opt.NTConfig.ThumbnailSize, true
		);
		ThumbnailTR.x = (ThumbnailTR.x+s/2)*ThumbnailTR.k; ThumbnailTR.y = (ThumbnailTR.y+s/2)*ThumbnailTR.k;
		NT.attr("transform",'translate('+ThumbnailTR.x+','+ThumbnailTR.y+')scale('+ThumbnailTR.k+')');
		
		var NPath = "",LPath = "",SPath = "",ColorPath={};
		var r = opt.circle.r;
		node.filter(function(item,i){
			var x = item.x, y = item.y;
			var p = "M "+x+", "+y+" m -"+r+", 0 a "+r+","+r+" 0 1,0 "+(r*2)+",0 a "+r+","+r+" 0 1,0 -"+(r*2)+",0 ";
			if(item.color){
				ColorPath[item.color] || ( ColorPath[item.color] = "" );
				ColorPath[item.color] += p;
			}else if(selectedNodesArr.indexOf('#node-'+item.id)>=0){
				SPath += p;
			}else{
				NPath += p;
			}
		});
		link.filter(function(item,i){
			LPath += d3.select('#link-'+item.id).attr("d")+" ";
		});
		NTNode.attr("d",NPath); NTLink.attr("d",LPath); NTSelected.attr("d",SPath);
		for(var c in ColorPath){
			var ntc = NT.select('#NTColor-'+c.replace('#','-'));
			if(ntc.size()>0){
				ntc.select("path").attr("d",ColorPath[c]);
			}else{
				NT.append("g").attr("id","NTColor-"+c.replace('#','-'),true).append("path")
				.attr("stroke-width",1).attr("stroke",c).attr("fill",c).attr("d",ColorPath[c]);
			}
		}
		//console.log('缩略图渲染时间差', calculateTime(renderEnd, new Date().getTime()));
	}

	function TNViewArea(){
		var va = getViewArea();
		va[0][0] = va[0][0]*ThumbnailTR.k+ThumbnailTR.x;
		va[0][1] = va[0][1]*ThumbnailTR.k+ThumbnailTR.y;
		va[1][0] = va[1][0]*ThumbnailTR.k;
		va[1][1] = va[1][1]*ThumbnailTR.k;
		var w = opt.width*ThumbnailTR.k/svg_scale;
		var h = opt.height*ThumbnailTR.k/svg_scale;
		var svgNT = d3.select('.svgNT');
		var svgW = parseInt(svgNT.attr('width')), svgH = parseInt(svgNT.attr('height'));
		
		var x,y,w,h;
		if((va[1][0]-va[0][0])<svgW){
			if(va[0][0]<0){
				x = 0, w = w+va[0][0];
			}else{
				x = va[0][0];
			}
		}else if(va[0][0] > 0){
			x = va[0][0];
		}else{
			x = 0;
			w = va[1][0];
		}
		
		if((va[1][1]-va[0][1])<svgH){
			if(va[0][1]<0){
				y = 0, h = h+va[0][1];
			}else{
				y = va[0][1];
			}
		}else if(va[0][1]>0){
			y = va[0][1];
		}else{
			y = 0;
			h = va[1][1];
		}
		
		//最后校验
		x = x<0?0:x;
		y = y<0?0:y;
		w = w+x>svgW?svgW-x:w;
		h = h+y>svgH?svgH-y:h;
		if(!isNaN(x||y||w||h) && w>0 && h>0){
			NTViewArea.attr("d","M"+x+","+y+"h"+w+"v"+h+"h-"+w+"z");
		}
	}
	
	function redrawNode(group){
		group.select('circle').attr('r', function(d) {
			if (!d.exist) {
				return opt.circle.r*0.65;
			}
			return opt.circle.r
		})
		.attr('stroke', function(d){
			if (!d.exist) {
				return '#a1a1a1';
			}
			if (d.exist && d.image) {
				return '#f62400';
			}
			return d.color || d.icon.color;
		})
		.attr('stroke-width', function(d){
			return !d.exist ? 3 : 5;
		})
		.attr('fill', function(d){
			if (!d.exist ||(d.exist && d.image)) {
				return '#ffffff';
			}
			return d.isfixed ? opt.circle.fillColor : (d.color || d.icon.color);
		});
		group.select('g.lock').selectAll('circle')
		.attr('fill',function (d) {
			return opt.circle.fixedColor
		});
		group.select('path').attr('fill', function(d){
			if (!d.exist) {
				return '#a1a1a1';
			}
			return !d.isfixed ?'#fff' : opt.circle.fixedColor;
		});
		group.select('rect.noderect').attr('stroke', function(d){
			return d.color || d.icon.color;
		});
	}
	
	function setTransform(x,y,k){
		var thatZoom = graphContainer._groups[0][0].__zoom;
		thatZoom.x = svg_offsetX = x;
		thatZoom.y = svg_offsetY = y;
		thatZoom.k = svg_scale = k;
		
		container
			.transition()
			.duration(1000)
			.attr('transform','translate('+x+','+y+')scale('+k+')');
			
	}

	//初始化
	function initialize(){
		var width = opt.width, height = opt.height;
		simulation = d3.forceSimulation()
	    .force("link", d3.forceLink().id(function(d) {return d.id;}).distance(200))
	    .force("charge", d3.forceManyBody().strength(-2000).distanceMax(1400))
			.force("center", d3.forceCenter(width / 2, height / 2))
			//.force("collide", d3.forceCollide(opt.circle.r + 40).iterations(4));
			//.force("collide", d3.forceCollide(d => d.radius * 2).strength(4));
			.force('collision', d3.forceCollide(1).strength(1));
		
		var zoom = d3.zoom()
			.duration(150)
			.scaleExtent([.35,2])
			.extent([[-1, -1], [width + 1, height + 1]])
			.on("zoom", zoomed);
		d3.select(opt.selector).attr('position', 'relative');
		graphContainer = d3.select(opt.selector)
			.append("svg")
			.classed("svgGraph", true)
			.attr("width", opt.width)
			.attr("height", opt.height)
			.attr('style','display:none;')
			.call(zoom).on('dblclick.zoom', null);
        
		var nsvg = graphContainer.append("g");
		bg_rect = nsvg.append('rect')
            .attr("width", "100%")
						.attr("height", "100%")
            .style('fill', 'white')
            .style('fill-opacity', 0);
		container = nsvg.append("g").attr("id","viewArea");
		g_main = container.append("g");
		linkGroup = container.append("g").attr("class", "links");
		linkTextGroup = container.append("g").attr("class", "link-labels");
		nodeGroup = container.append("g").attr("class", "nodes");

		NT = d3.select(opt.selector)
					.append("svg").classed("svgNT", true)
					.attr('style',function(){
						return opt.useNT ? '' : 'display:none';
					})
					.attr("width", opt.width*opt.NTConfig.ThumbnailSize)
					.attr("height", opt.height*0.3);
		NTRect = NT.append('rect')
							.attr("width", "100%")
							.attr("height", "100%")
							.style('fill', opt.NTConfig.NTRect_Fill);
		NTViewArea = NT.append('path')
									.attr('fill','none')
									.attr('stroke',opt.NTConfig.NTViewArea_Stroke)
									.attr('stroke-width',opt.NTConfig.NTViewArea_StrokeWidth)
									.attr("d","M0,0 L0,100 L100,100 L100,0 L0,0")
									.attr("fill-opacity", 0);
		NT = NT.append("g")
					.attr("transform","scale("+opt.NTConfig.ThumbnailSize+")")
					.attr('id','NT');
		NTNode = NT.append("g")
							.classed("NTNode",true)
							.append("path")
							.attr("stroke-width",opt.NTConfig.NTNode_StrokeWidth)
							.attr("stroke",opt.NTConfig.NTNode_Stroke)
							.attr("fill",opt.NTConfig.NTNode_Fill);
		NTLink = NT.append("g")
							.classed("NTLink",true)
							.append("path")
							.attr("stroke-width",opt.NTConfig.NTLink_StrokeWidth)
							.attr("stroke",opt.NTConfig.NTLink_Stroke)
							.attr("fill",opt.NTConfig.NTLink_Fill);
		NTSelected = NT.append("g")
									.classed("NTSelected",true)
									.append("path")
									.attr("stroke-width",opt.NTConfig.NTSelected_StrokeWidth)
									.attr("stroke",opt.NTConfig.NTSelected_Stroke)
									.attr("fill",opt.NTConfig.NTSelected_Fill);	
	}

	function testOpt() {
		if (!opt.icons.length) {
			console.log('icons不存在！')
			return false;
		}
		return true;
	}
	
	/**
	 * 设置配置项属性 --对内
	 * @function setOptions
	 * @param {Object} msg - 配置参数
	 */
	graph.setOptions = function (msg) {
		for (var key in msg) {
			if (['circle', 'NTConfig'].indexOf(key) == -1) {
				opt[key] = msg[key] || opt[key];
			}
		}
		if(msg.circle){
			for (var key in msg.circle) {
				opt.circle[key] = msg.circle[key] || opt.circle[key]
			}
		}
		if (opt.NTConfig) {
			for (var key in msg.NTConfig) {
				opt.NTConfig[key] = msg.NTConfig[key] || opt.NTConfig[key]
			}
		}
	};
	/**
	 * 获取配置项
	 * @function getOptions
	 * @returns {Object}
	 */
	graph.getOptions = function () {
		return opt;
	};
	/**
	 * 设置icons
	 * @function setIcons
	 * @param {data} msg - 配置icons
	 */
	graph.setIcons = function (data) {
		if (data === undefined || data.length == 0) {
			alert('缺少icon图标');
			return false;
		}
		opt.icons = data;
	};
	/**
	 * 获取icons配置
	 * @function getIcons
	 * @returns {object}
	 */
	graph.getIcons = function () {
		return opt.icons;
	};
	/**
	 * 重启 - 对内
	 * @function restart
	 */
	graph.restart= function () {
		initIsFinish = false;
		isdraged = false;
		/**测试**/
		forceStart = new Date().getTime();
		/**测试**/
		simulation.restart();
		simulation.alpha(1);
	};
	/**
	 * 清除全部 - 对内
	 * @function clear
	 */
	graph.clear = function () {
		initOnce = true;
		nodeObjs = [];
		linkObjs = [];
		repeatViewId = {};
		repeatNodes = {};
		graph.clearDOM();
		nodeGroup.selectAll("g").data([]).exit().remove();
		linkGroup.selectAll("path").data([]).exit().remove();
		linkTextGroup.selectAll("g").data([]).exit().remove();
	};
	/**
	 * 清除DOM - 对内
	 * @function clearDOM
	 */
	graph.clearDOM = function () {
		linkGroup.selectAll('*').remove();
		nodeGroup.selectAll('*').remove();
		linkTextGroup.selectAll('*').remove();
	};
	/**
	 * 初始化svg
	 * @function init
	 */
	graph.init = function () {
		if(!license.test){
			initialize()
		}else{
			license.test(initialize);
		}
		
	}
	/**
	 * 载入数据
	 * @function load
	 * @param {object} msg - 需要载入的数据
	 */
	graph.load = function (msg) {
		if (!testOpt()) {
			return false;
		}
		startTime = new Date();
		//console.log('加载数据-',startTime)
		graph.clear();
		for (var i = 0; i < msg.nodes.length; i++) {
			var d = msg.nodes[i];
			if(repeatViewId[d.vid] == undefined){ //vid不存在
				repeatViewId[d.vid] = d.id;
			}else{ //vid已存在
				repeatNodes[d.id] = repeatViewId[d.vid];
				msg.nodes.splice(i,1);
			}
		}
		for (var j = 0; j < msg.links.length; j++) {
			repeatNodes[msg.links[j].source] && (msg.links[j].source = repeatNodes[msg.links[j].source]);
			repeatNodes[msg.links[j].target] && (msg.links[j].target = repeatNodes[msg.links[j].target]);
		}
		parseData (msg);
		graph.removeElements(msg)
		graph.restart();
		//console.log('加载实体个数：', nodeObjs.length)
		//console.log('加载关系个数：', linkObjs.length)
		redrawContent();
	};
	/**
	 * 添加单个实体
	 * @function addNode
	 * @param {object} ele - 单个实体数据
	 */
	graph.addNode = function (ele,id) {
		//console.log(ele,id,5442);	
		var me = this;
		nodeObjs.push(new Node(ele,id));
		console.log("www-nodeOgjs",nodeObjs);
		addElement();
	};
	/**
	 * 添加单个关系
	 * @function addLink
	 * @param {object} ele - 单个关系数据
	 */
	graph.addLink = function (ele) {
		linkObjs.push(new Link(ele));
		addElement();
	};
	/**
	 * 通过id移除关系数据
	 * @function removeLinkDataById
	 * @param {string} id - 需要移除的对象的id
	 */
	graph.removeLinkDataById = function(id){
		linkObjs = linkObjs.filter(function(ele){
			return ele.id != id;
		});
	};
	/**
	 * 通过起始点获取关系对象
	 * @function getLinkBySourceAndTarget
	 * @param {string} source - 起点对象id
	 * @param {string} target - 终点对象id
	 * @returns {Array}
	 */
	graph.getLinkBySourceAndTarget = function(source,target){
		return linkObjs.filter(function(ele){
			return (ele.source == source || ele.source == target) && (ele.target == source || ele.target == target);
		});
	};
	/**
	 * 关键词查询
	 * @function search
	 * @param {string} text - 关键词
	 */
	graph.search = function(text){
		if (!text) {
			alert('请输入要查找的内容！');
			return false;
		}
		var searchNodes = nodeObjs.filter(function(ele){
			if (!ele.exist) return false;
			if (ele.showProperties && ele.showProperties.length) {
				for (var i = 0; i < ele.showProperties.length; i++) {
					if((''+ele.properties[ele.showProperties[i]]).indexOf(text) != -1){
						return true;
					}
				}
			}else{
				for (var key in ele.properties) {
					if((''+ele.properties[key]).indexOf(text) != -1){
						return true;
					}
				}
			}
			return false;
		});
		
		var searchLinks = linkObjs.filter(function(ele){
			if (ele.showProperties && ele.showProperties.length) {
				for (var i = 0; i < ele.showProperties.length; i++) {
					if((''+ele.properties[ele.showProperties[i]]).indexOf(text) != -1){
						return true;
					}
				}
			}else{
				for (var key in ele.properties) {
					if((''+ ele.properties[key]).indexOf(text) != -1){
						return true;
					}
				}
			}
			return false;
		});

		if (!searchNodes.length && !searchLinks.length) {
			return false;
		}
		graph.selectedElements(searchNodes.map(function(ele) {
			return ele.id;
		}), searchLinks.map(function(ele) {
			return ele.id;
		}),'te');
		graph.centerSelection (searchNodes, searchLinks);
	};
	/**
	 * 通过标签查询
	 * @function searchByTag
	 * @param {string} tag - 标签
	 */
	graph.searchByTag = function(tag){
		var searchNodes = nodeObjs.filter(function(ele){
			for (var i = 0; i < ele.tags.length; i++) {
				if (tag == ele.tags[i]) {
					return true;
				}
			}
			return false;
		});
		
		var searchLinks = linkObjs.filter(function(ele){
			for (var i = 0; i < ele.tags.length; i++) {
				if (tag == ele.tags[i]) {
					return true;
				}
			}
			return false;
		});
		if (!searchNodes.length && !searchLinks.length) {
			return false;
		}
		/*
		graph.selectedElements(searchNodes.map(function(ele) {
			return ele.id;
		}), searchLinks.map(function(ele) {
			return ele.id;
		}));
		graph.centerSelection (searchNodes, searchLinks);
		*/
		return {
			nodes : searchNodes.map(function(ele) {
				return ele.id;
			}),
			links : searchLinks.map(function(ele) {
				return ele.id;
			})
		}
	}
	/**
	 * 居中选中
	 * @function centerSelection
	 * @param {Array} nodes - 选中的实体
	 * @param {Array} links - 选中的关系
	 */
	graph.centerSelection = function(nodes, links) {
		var arr = [];
		for (var i = 0; i < nodes.length; i++) {
			arr[i] =  nodes[i];
		}
		for (var i = 0; i < links.length; i++) {
			if (arr.indexOf(links[i].source) == -1) {
				arr.push(links[i].source);
			}
			if (arr.indexOf(links[i].target) == -1) {
				arr.push(links[i].target);
			}
		}
		var arrx = arr.map(function(ele) {
			return ele.x?ele.x:false;
		}).sort(function(a, b) {
			return a - b;
		});
		var arry = arr.map(function(ele) {
			return ele.y?ele.y:false;
		}).sort(function(a, b) {
			return a - b;
		});
		//待完善
		/**
			translate x,y 计算，
			即va.x/y计算 需要考虑arrx[0] 大于/小于 0
		**/
		var sh = (arry[arry.length-1]+100) - (arry[0] > 0 ? 0 : arry[0]);
		var sw = (arrx[arrx.length-1]+100) - (arrx[0] > 0 ? 0 : arrx[0]);
		var va = {
			height : sw,
			width : sh,
			x : (opt.width-(sw + 100))/2,
			y : (opt.height-(sh + 100))/2
		};
		// va.height += 100; va.width += 100;
		var sc = AreaSelfAdaption(
			va, {width:opt.width,height:opt.height}, 1
		);
		graph.selectedElements(nodes.map(function(ele){
			return ele.id;
		}), links.map(function(ele){
			return ele.id;
		}));
		setTransform(sc.x,sc.y,sc.k);
		viewData();
	};
	/**
	 * 锁定/解锁
	 * @function fixedNode
	 * @param {array} ids - nodeId数组
	 * @param {boolean} type - 状态
	 */
	graph.fixedNode = function (ids, type) {
		//var ids = graph.getSelection().node;
		nodeObjs.forEach(function(ele) {
			if (type == ele.isfixed) return;
			if (ids.indexOf(ele.id) !=-1) {
				ele.isfixed = type;
				var obj = d3.select('#node-' + ele.id);
				obj.select('circle')
					.attr('fill', function(d) {
						if (d.exist && d.image) {
							return '#fff';
						}
						return type ? opt.circle.fillColor : (d.color || d.icon.color);
					})
					.attr('stroke-width', function(d){
						return !d.exist ? 3 : 5;
					})
					.attr('stroke', function (d) {
						if (d.exist && d.image) {
							return '#f62400';
						}
						return d.color || d.icon.color;
					});
				obj.select('path').attr('fill', function (d) {
					if (!type) {
						d.fx = null;
						d.fy = null;
					}
					return type ? opt.circle.fixedColor  : '#fff';
				});
				obj.select('rect.noderect').attr('stroke', function (d) {
					return d.color || d.icon.color;
				});
				if (type) {
					var lock = obj.append('g').attr('class', 'lock');
						lock.append('circle').attr('transform', 'translate(0,-'+ opt.circle.r +')');
						lock.append('circle').attr('transform', 'translate('+ opt.circle.r +',0)');
						lock.append('circle').attr('transform', 'translate(0,'+ opt.circle.r +')');
						lock.append('circle').attr('transform', 'translate(-'+ opt.circle.r +',0)');
						lock.selectAll('circle').attr('r', 6).attr('stroke-width', 2).attr('stroke', '#fff').attr('fill', '#a1a1a1');
				}else{
					obj.select('g.lock').remove();
				}
			}
		});
	};
	/**
	 * 启用/禁用力导向
	 * @function useForce
	 * @param {boolean} type - 状态
	 */
	graph.useForce = function (type) {
		opt.useForce = type;
		if (type) {
			nodeObjs.forEach(function(ele){
				ele.fx = null;
				ele.fy = null;
			});
			simulation.restart();
		}
	};
	
	/**
	 * 获取选中对象 实体和线
	 * @function getSelection
	 * @returns {Object}
	 */
	graph.getSelection = function () {
		return {
			node : selectedNodesArr.map(function(ele){
				return ele.replace(/\#node\-/,"")
			}),
			link : selectedLinkLabelsArr.map(function(ele){
				return ele.replace(/\#link\-label\-/,"")
			})
		};
	};
	/**
	 * 获取数据
	 * @function getData
	 * @param {boolean} type - 类型(true关系带两端对象;false不带)
	 * @returns {Object} 
	 */
	graph.getData = function(type){
		var data = JSON.parse(JSON.stringify({
				links : linkObjs,
				nodes : nodeObjs
			}));
		if(type){
			return data;
		}else{
			return {
				links : data.links.map(function(link){
					link.source = link.source.id;
					link.target = link.target.id;
					return link;
				}), 
				nodes : data.nodes
			};
		}
	};
	/**
	 * 通过类型选取node
	 * @function selectedByType
	 * @param {String} nodeType - 类型
	 */
	graph.selectedByType = function (nodeType) {
		graph.selectedElements(nodeObjs.filter(function(ele) {
			return ele.nodeType == nodeType;
		}).map(function(ele){
			return ele.id;
		}),[]);
	}
	/**
	 * 导出数据(废弃)
	 * @function exportJson
	 * @returns {Object} 
	 */
	graph.exportJson = function(){
		// nodeObjs.forEach(ele=>{
		// 	nodeObjs.forEach(obj=>{
		// 		if(obj.id == ele.id){
		// 			ele.x = obj.x;
		// 			ele.y = obj.y;
		// 			ele.fx = obj.fx;
		// 			ele.fy = obj.fy;
		// 		}
		// 	});
		// });
		return graph.getData();
	};
	
	/**
	 * 设置关键节点
	 * @function setKeyNodes
	 * @param {array} nodeIds - nodeIds数组
	 * @param {boolean} type - 节点凸显状态
	 */
	graph.setKeyNodes = function(nodeIds, type){
		nodeObjs.map(function(node){
			if(nodeIds.indexOf(node.id)>=0){
				node.isKeyNode = type;
			}else{
				node.isKeyNode = !type;
			}
		})
	}
	
	/**
	 * 关键节点凸显/恢复
	 * @function showKeyNode
	 * @param {boolean} type - 节点凸显状态
	 */
	graph.showKeyNode = function(type) {
		var ids = nodeObjs.filter(function(ele){
			if (ele.isKeyNode) {
				ele.useKeyNode = type;
			}
			return ele.isKeyNode;
		}).map(function(ele){
			return '#node-' + ele.id;
		}).toString();
		viewData();
		Thumbnail();
		if(ids.length>0){
			nodeGroup.selectAll(ids).attr('transform',function(d){
				if (d.useKeyNode) {
					d.nodeScale = svg_scale <= 1 ? 1.5/svg_scale : svg_scale >= 1.5 ? 1 : 1.5;
				}else{
					d.nodeScale = 1;
				}
				return 'translate('+d.x+','+d.y+')' + (type ? 'scale('+ d.nodeScale +')' : '');
			});
		}
	};
	
	/**
	 * 加标签(废弃)
	 * @function addTag
	 * @param {Number} ids - 标签编号
	 * @param {String} text - 标签内容
	 */
	graph.addTag = function (ids,text) {
		console.log(ids,text,'num,text')
		if (!selectedNodesArr.length && !selectedLinkLabelsArr.length ) {
			alert('请选中实体或关系！');
			return false;
		}
		if (selectedNodesArr.length) {
			graph.addNodeTag(ids,text);
		}
		if (selectedLinkLabelsArr.length) {
			graph.addLinkTag(ids,text);
		}
	}
	
	/**
	 * 删除实体标签
	 * @function addTag
	 * @param {array} nodes - 标签编号
	 * @param {String} text - 标签内容
	 */
	graph.delNodeTag = function(nodes,text){
		d3.selectAll('#node-'+nodes.join(',#node-')).each(function(ele) {
			//删除标签
			//处理标签数据
			ele.tags = ele.tags.filter(function(el) {
				return el != text
			});
			nodeObjs.forEach(function(el) {
				if (el.id == ele.id) {
					el.tags = ele.tags;
				}
			});
			
			redrawNodeTag(this,ele.tags);
		});
	}
	
	/**
	 * 添加实体标签
	 * @function addNodeTag
	 * @param {Array} nodes - nodeId数组
	 * @param {String} text - 标签内容
	 */
	graph.addNodeTag = function (nodes,text) {
		d3.selectAll('#node-'+nodes.join(',#node-')).each(function(ele) {
			//添加标签
			//处理标签数据
			var samel = ele.tags.filter(function(el) {
				return el == text
			}).length;
			if (!samel) {
				ele.tags.push(text);
			}
			nodeObjs.forEach(function(el) {
				if (el.id == ele.id) {
					el.tags = ele.tags;
				}
			});
			console.log(this,ele.tags,'321331')
			redrawNodeTag(this,ele.tags);
		});
	}
	
	function redrawNodeTag(node,tags){
		var tag = d3.select(node).selectAll('.tag'), tagText;
		var rh = Number(d3.select(node).select('rect.noderect').attr('height'));
		var rw = Number(d3.select(node).select('rect.noderect').attr('width'));
		if (!tag.size()) {
			tag = d3.select(node)
				.append('g')
				.attr('class','tag') 
				.attr('transform','translate('+ (-14-rw/2) +','+ (opt.circle.r + rh/2 +6) +')');
			tag.append('rect').attr('class', 'tagrect');
			tag.append('text').attr('class', 'list');
		}

		if(tags.length>0){
			 

			tag.select('rect.tagrect')
				.attr('y', rh/2 +7)
				.attr('x', 14)
				.attr('fill', '#f2f2f2')
				.attr('rx', 10)
				.attr('ry', 10)
				.attr('height', function (d) {
					return d.tags.length*14 + 10;
				})
				.attr('width', function(d) {
					var arr = tags.map(function(el) {
						return el.length;
					}).sort(function(a, b) {
						return b - a;
					});
					var sw = (arr[0] > 10 ? 10 : arr[0])*10+34;
					return sw > rw ? sw : rw;
				})
				
			
			if (!tag.select('circle').size()) {
				tag.append('circle')
					.attr('class', 'tagcircle')
					.attr('r', 10)
					.attr('stroke-width', 1)
					.attr('stroke', '#ccc')
					.attr('fill', '#efefef');
				tag.append('text')
					.attr('class','tagnums')
					.attr('fill', 'red')
					.attr('text-anchor', 'middle')
					.attr('transform', 'translate(0,4)')
					.text(tags.length);
					
			}else{
				tag.select('text.tagnums').text(tags.length);
			};
			tag.select('text.list').selectAll('tspan').data([]).exit().remove();
			tag.select('text.list')
				.attr('y', rh/2 +7)
				.selectAll('tspan')
				.data(tags)
				.enter()
				.append('tspan')
				.attr('x', 30)
				.attr('dy', 14)
				.text(function(d){
					return d;
				});
		}else{
			tag.remove();
		}
	}
	
	/**
	 * 添加关系tag
	 * @function addLinkTag
	 * @param {Number} num - 标签编号
	 * @param {String} text - 标签内容
	 */
	graph.addLinkTag = function (num,text) {
		d3.selectAll(selectedLinkLabelsArr.join(',')).each(function(ele) {
			var tag = d3.select(this).selectAll('.tag'), tagText;
			var trans = d3.select(this).select('[type="linktext"]').attr('transform').match(/\(.+\)/)[0].slice(1,-1).split(',');
			var textsize = d3.select(this).select('[type="linktext"]').selectAll('text').size();
			if (!tag.size()) {
				tag = d3.select(this)
					.append('g')
					.attr('class','tag')
					.attr('transform','translate('+ trans[0] +','+ (trans[1] + (textsize == 2 ? 5 : 15)) +')');
			}
			if (tag.select('[alt="'+ num +'"]').size()) {
				tagText = tag.select('[alt="'+ num +'"]');
				tagText.select('.tagnum').text(num);
				tagText.select('.tagtext').text(text);
				for (var i = 0; i < ele.tags.length; i++) {
					if(ele.tags[i].num == num){
						ele.tags[i].text = text;
					};
				};
			}else{
				tagText = tag.append('text')
					.attr('y',tag.selectAll('text').size()*26)
					.attr('alt',num);
				tagText.append('tspan')
					.attr('class','tagnum')
					.attr('fill','red')
					.attr('font-size',18)
					.text(num);
				tagText.append('tspan')
					.attr('class','tagtext')
					.attr('fill','black')
					.text(text);
				ele.tags.push({
					num : num,
					text : text
				});
			};
		});
	}
	/* GCQ  */
	/**
	 * 清除选中 clearAllSelection
	 * @function clearAllSelection
	 */
	graph.clearAllSelection = function(){
		clearAllSelection();
	}
	
	/**
	 * 选中node or link  selectedElements
	 * @function selectedElements
	 * @param {Array} nodes - 实体id
	 * @param {Array} links - 关系id
	 */
	graph.selectedElements = function(nodes,links,te){
		clearAllSelection();
		selectElements(nodes,links);
	};
	/**
	 * 反选 
	 * @function invertSelection
	 */
	graph.invertSelection = function(){
		var invert_ids = [];
		node.filter(function(d){
			if(selectedNodesArr.indexOf('#node-'+d.id) == -1){
				invert_ids.push(d.id);
			}
			return false;
		});
		clearAllSelection();
		selectElements(invert_ids,[]);
	};
	/**
	 * 全选 selectedAll
	 * @function selectedAll
	 */
	graph.selectedAll = function(){
		clearAllSelection();
		var invert_ids = [];
		node.filter(function(d){
			if(selectedNodesArr.indexOf(d.id) == -1){
				invert_ids.push(d.id);
			}
			return false;
		});
		selectElements(invert_ids,[]);
	};
	/**
	 * 根据ID删除 
	 * @function romoveElementsById
	 * @param {Array} nodeids - 实体id
	 * @param {Array} linkids - 关系id
	 */
	graph.romoveElementsById = function(nodeids, linkids) {
		var delObj = {};
		var temp_link_arr = [], temp_link_label_arr = [];
		if(nodeids.length>0){
			var temp_nodeids = [];
			for (var i = 0; i < nodeids.length; i++) {
				var id = nodeids[i];
				temp_nodeids.push('#node-'+id);
				var link_s = "[source='node-" + id + "']";
				var link_t = "[target='node-" + id + "']";
				temp_link_arr.push(link_s);
				temp_link_arr.push(link_t);

				var link_label_s = "[source='link-label-" + id + "']";
				var link_label_t = "[target='link-label-" + id + "']";
				temp_link_label_arr.push(link_label_s);
				temp_link_label_arr.push(link_label_t);
				
				var index = selectedNodesArr.indexOf('#node-'+id);
				if(index >= 0){
					selectedNodesArr.splice(index,1);
				}
				
				var data = nodeGroup.select('#node-'+id).data();
				if(data.length>0){
					delete repeatViewId[data[0].vid];
				};
			}
			
			var t = nodeGroup.selectAll(temp_nodeids.toString());
			delObj['nodes'] = t.data();
			delObj['nodes'].forEach(function(item,index){
				if(!item.color){
					return false;
				}
				NT.select('#NTColor-'+item.color.replace('#','-')).remove();
			})
			t.remove();
			nodeObjs = graph.removeDeleted(nodeObjs,delObj['nodes']);
			node = graph.removeDeleted(node,delObj['nodes']);
		}
		
		if(linkids.length>0 || temp_link_arr.length>0){
			var temp_linkids = [], temp_linkTextids = [], temp_linkMark = [];
			var del_links_arr = [];
			for(var i = 0; i<linkids.length; i++){
				temp_linkids.push('#link-'+linkids[i]);
				temp_linkTextids.push('#link-label-'+linkids[i]);
				temp_linkMark.push('#link-mark-path-'+linkids[i]);
			}
			
			if(temp_linkids.length>0){
				linkTextGroup.selectAll(temp_linkTextids.toString()).remove();
				linkGroup.selectAll(temp_linkMark.toString()).remove();
				
				var t = linkGroup.selectAll(temp_linkids.toString());
				del_links_arr = t.data();
				t.remove();
				//删除对应的link
				del_links_arr.map(function(ele){
					temp_link_arr.push('#link-'+ele.id); return false;
				});
			}
			
			if(temp_link_arr.length>0) {
				t = linkGroup.selectAll(temp_link_arr.toString());
				del_links_arr = del_links_arr.concat(t.data());
				t.remove();
			}
			delObj['links'] = del_links_arr;
			linkObjs = graph.removeDeleted(linkObjs,delObj['links']);
			link = graph.removeDeleted(link,delObj['links']);
			linkText = graph.removeDeleted(linkText,delObj['links']);
			
			for(var i in del_links_arr){
				var index = selectedLinkLabelsArr.indexOf('#link-label-'+del_links_arr[i].id);
				if(index >= 0){
					selectedLinkLabelsArr.splice(index,1);
					selectedLinkLabelRectsArr.splice(index,1);
				};
			};
		}
		
		delObj = JSON.parse(JSON.stringify(delObj));
		if(delObj.nodes == undefined) { delObj['nodes'] = []; }
		if(delObj.links == undefined) { delObj['links'] = []; }
		var d_links = delObj['links'].filter(function(ele){
			ele['source'] = ele['source'].id;
			ele['target'] = ele['target'].id;
			return ele;
		});
		delObj['links'] = d_links;
		
		if(temp_link_label_arr.length>0){
			linkTextGroup.selectAll(temp_link_label_arr.toString()).remove();
		}
		if (JSON.stringify(delObj) === '{}') {
			return false;
		}else{
			delObjArr.push(delObj);
			draw();Thumbnail();
		};
	}
	/**
	 * 清除已删除项(数据)
	 * @function removeDeleted
	 * @param {object} obj 
	 * @param {Array} item
	 * @returns {Array}
	 */
	graph.removeDeleted = function (obj,item) {
		return obj.filter(function(ele){
			return item.map(function(el){
				return el.id;
			}).indexOf(ele.id) == -1;
		});
	}
	/**
	 * 撤销删除
	 * @function revokeDeleted
	 */
	graph.revokeDeleted = function() {
		if(delObjArr.length>0){
			var delObj = delObjArr[delObjArr.length-1];
			delObjArr.splice(delObjArr.length-1, 1);
			graph.addElements(delObj);
		}else{
			console.log('没有需要撤销的数据');
		};
	};
	/**
	 * 编辑元素
	 * @function editElement
	 * @param {String} id - id
	 * @param {String} key - key
	 * @param {String} val - 值
	 * @param {boolean} hidden - false:修改 properties true:修改hiddenProperties
	 */
	graph.editElement = function(id, key, val, hidden) {
		var last_selected = d3.select('[id*='+id+']');
		if(last_selected.size() == 1){
			//修改绑定属性
			var pro = last_selected.data()[0];
			if(hidden){
				pro['hiddenProperties'] = pro['hiddenProperties']?pro['hiddenProperties']:{};
				pro['hiddenProperties'][key] = val; 
			}else{
				pro['properties'] = pro['properties']?pro['properties']:{};
				pro['properties'][key] = val;
			}
			pro['showProperties'].indexOf(key)<0 && pro['showProperties'].push(key);
			if('node' == pro.type){
				last_selected.select('text').selectAll('tspan').data([]).exit().remove();
				last_selected.select('text').selectAll('tspan').data(function(){
					if (pro.isShowAll) {
						return pro.getPropList();
					}else{
						var arr = pro.getPropList().slice(0,2);
						arr.push('...');
						return arr;
					}
				}).enter().append('tspan').attr('dy', function(d, i) {
					return 14;
				}).attr('x', -1).text(function(d) {
					return d;
				});
			}else if('link' == pro.type){
				//关系修改 暂未实现
				var link_label = linkTextGroup.select('#link-label-'+pro.id);
				link_label.select("text[type='linktext']").selectAll("tspan").remove();
				link_label.select("text[type='linktext']")
				.selectAll('tspan').data(function(d) {
				  return [d.getPropList()[0]];
				}).enter().append('tspan').attr('x',0)
			    .attr('dy',function(text,i,arr){
			    	return i==0? (arr.length-1)*-15/2:15;
			    }).text(function(d) {
			        return d;
			    });
			    
				link_label.select('.linkrect')
				.attr('width',function(d){
					return document.getElementById('link-text-' + d.id).getBBox().width + (d.getPropLength() >1 ? 40 : 30);
				})
				.attr('height',function(d){
					return document.getElementById('link-text-' + d.id).getBBox().height +15;
				});
			};
		};
	};
	/**
	 * 选取两端和对端   selectedPath 选取路径上的节点(node,link)
	 * @function selectedBothEnds
	 * @param {Array} nodeids - 实体id
	 * @param {Array} linkids - 关系id
	 * @param {String} selectedPath
	 */
	graph.selectedBothEnds = function(nodeids, linkids, selectedPath){
		var s_nodes = [], s_links = [];
		if(nodeids.length>0){
			selectedPath && (s_nodes = nodeids);
			linkObjs.filter(function(ele){
				return nodeids.indexOf(ele.source.id)>=0 || nodeids.indexOf(ele.target.id)>=0;
			}).map(function(link){
				var end1id = link.source.id;
				var end2id = link.target.id;
				if(selectedPath){
					s_links.push(link.id);
					if(s_nodes.indexOf(end1id)==-1){ s_nodes.push(end1id); }
					if(s_nodes.indexOf(end2id)==-1){ s_nodes.push(end2id); }
				}else{
					if(s_nodes.indexOf(end1id)==-1 && nodeids.indexOf(end1id) == -1){ s_nodes.push(end1id); }
					if(s_nodes.indexOf(end2id)==-1 && nodeids.indexOf(end2id) == -1){ s_nodes.push(end2id); }
				};
			});
			
		}
		
		if(linkids.length>0){
			linkObjs.filter(function(ele){
				return linkids.indexOf(ele.id)>=0;
			}).map(function(link){
				var end1id = link.source.id;
				var end2id = link.target.id;
				selectedPath && s_links.push(link.id);
				s_nodes.push(end1id); s_nodes.push(end2id);
			});
		}
		graph.selectedElements(s_nodes, s_links);
	}
	/**
	 * 根据link获得两端node
	 * @function getLinkNodes
	 * @param {String} id - 关系id
	 * @returns {Object}
	 */
	graph.getLinkNodes = function(id){
		var l = linkObjs.filter(function(ele){
			return id == ele.id;
		});
		return {
			"source" : l[0].getSource(),
			"target" : l[0].getTarget()
		};
	}
	/**
	 * 根据node获得link
	 * @function getNodeLinks
	 * @param {String} id - 实体id
	 * @returns {Array}
	 */
	graph.getNodeLinks = function(id){
		var n = nodeObjs.filter(function(ele){
			return id == ele.id;
		});
		return n.length>0?n[0].getLinks():[];
	}
	/**
	 * 获得可视区域
	 * @function getViewArea
	 * @returns {object}
	 */
	graph.getViewArea = function(){
		return getViewArea();
	}
	/**
	 * 批量删除nodes/links
	 * @function removeElements
	 * @param {array} new_data - 新数据
	 */
	graph.removeElements = function (data) {
		nodeGroup.selectAll("g").data(data.nodes).exit().remove();
		linkGroup.selectAll("path").data(data.links).exit().remove();
		linkTextGroup.selectAll("g").data(data.links).exit().remove();
	} 
	
	/**
	 * 获得当前Nodes所有类型
	 * @function getNodeTypes
	 * @returns {array}
	 */
	graph.getNodeTypes = function(){
		var nodeType = new Object();
		nodeObjs.map(function(node){
			nodeType[node.nodeType] = true;
		});
		
		var arr = [];
		for(var k in nodeType){
			arr.push(k);
		}
		
		return arr;
	}
	
	/**
	 * 批量添加nodes/links
	 * @function addElements
	 * @param {array} new_data - 添加的数据
	 */
	graph.addElements = function (new_data) {
		if(!dataIsInit){ dataIsInit = true; graph.load(new_data); return; }
		
		linkGroup.selectAll('*').remove();
		nodeGroup.selectAll('*').remove();
		linkTextGroup.selectAll('*').remove();
		
		if(new_data.nodes && new_data.nodes.length){
			var new_nodeObjs = [], new_data_nodes = [];
			for (var i = 0; i < new_data.nodes.length; i++) {
				var d = new_data.nodes[i];
				if(repeatViewId[d.vid] == undefined){ //vid不存在
					repeatViewId[d.vid] = d.id;
					new_nodeObjs.push(new Node(d));
					new_data_nodes.push(d);
				}else{ //vid已存在
					repeatNodes[d.id] = repeatViewId[d.vid];
				};
			}
			nodeObjs = nodeObjs.concat(new_nodeObjs);
		}
		if(new_data.links && new_data.links.length){
			var new_linkObjs = [], new_data_links = [];
			for (var i = 0; i < new_data.links.length; i++) {
				var l = new_data.links[i];
				if(repeatNodes[l.source] != undefined){ l.source = repeatNodes[l.source]; }
				if(repeatNodes[l.target] != undefined){ l.target = repeatNodes[l.target]; }
				new_linkObjs.push(new Link(l));
				new_data_links.push(l);
			}
			linkObjs = linkObjs.concat(new_linkObjs);
		}
		
		redrawContent();
		draw();
		viewData();
		Thumbnail();
		count = 0; addEvent();
	};
	/**
	 * 窗口自适应
	 * @function displayAdapt
	 */
	graph.displayAdapt = function(){
		var va = document.getElementById('viewArea').getBBox();
		va.height += 100; va.width += 100;
		var sc = AreaSelfAdaption(
			va, {width:opt.width,height:opt.height}, 1
		);
		setTransform(sc.x,sc.y,sc.k);
		viewData();
	};
	/**
	 * 设置svg大小
	 * @function setSize
	 * @param {object} size - svg大小
	 * @param {Number} num - 略缩图距离浏览器左边的距离（可以省略）
	 */
	graph.setSize = function (size,num) {
		d3.select('svg')
		.attr('width', size.width)
		.attr('height', size.height);
		if (!document.querySelector('.svgGraph')) {
			return false;
		}
		var svgGraph = document.querySelector('.svgGraph').getBoundingClientRect();
		d3.select('svg.svgNT').attr('style', 'left:' + ((svgGraph.left || num)+25) + 'px');
		graph.displayAdapt();
	}
	/**
	 * 导出图片
	 * @function exportPic
	 * @param {String} name 导出的文件名
	 */
	graph.exportPic = function(name){
		stop_ticked = true;
		var limit = 100;
		var va = document.getElementById('viewArea').getBBox();
		d3.select('.svgGraph').attr('width',va.width+limit).attr('height',va.height+limit);
		
		var svg = document.getElementsByClassName('svgGraph')[0].getBBox();
		var tr = 'translate('+ (-va.x+limit/2)+','+ (-va.y+limit/2) +')scale(1)';
		container.attr('transform',tr);
		viewData(true);
		
		saveAsPng.saveSvgAsPng(document.querySelector("svg"), name + ".png");//保存成图片
		saveAsPng.svgAsDataUri(document.querySelector("svg"), {}, function(uri) {//转换成base64编码
            var img = new Image();
            img.src = uri;
            var canvas = document.createElement('canvas');
            var content = canvas.getContext('2d');
            img.onload = function(){
				content.drawImage(img,0,0);
                canvas.toDataURL();
                d3.select('.svgGraph').attr('width',opt.width).attr('height',opt.height);
				container.attr('transform','translate('+svg_offsetX+','+svg_offsetY+')scale('+svg_scale+')');
				viewData();
				stop_ticked = false;
            };
        });
	}
	
	/**
	 * 导出图片
	 * @function exportPicForBase64
	 * @param {function} fun 回调函数,会把base64传入
	 * @return {string} base64 当前svg的base64
	 */
	graph.exportPicForBase64 = function(fun){
		stop_ticked = true;
		var limit = 100;
		var va = document.getElementById('viewArea').getBBox();
		d3.select('.svgGraph').attr('width',va.width+limit).attr('height',va.height+limit);
		
		var svg = document.getElementsByClassName('svgGraph')[0].getBBox();
		var tr = 'translate('+ (-va.x+limit/2)+','+ (-va.y+limit/2) +')scale(1)';
		container.attr('transform',tr);
		viewData(true);
		
		saveAsPng.svgAsPngUri(document.querySelector("svg"), {}, function(uri) {//转换成base64编码
            fun(uri);
        });	
	}
	
	/**
	 * 获取重复数据
	 * @function getRepeatData
	 * @param {Array} msg
	 * @returns {Object}
	 */
	graph.getRepeatData = function(msg){
		return {
			viewId:repeatViewId, 
			nodesId:repeatNodes
		};
	}
	/**
	 * 选取单个对象
	 * @function select
	 * @param {string} ids - 查询id
	 * @returns {Array}
	 */
	graph.select = function(ids){
		return d3.select(ids);
	}
	/**
	 * 选取多个对象
	 * @function selectAll
	 * @param {string} ids - 查询ids
	 * @returns {Array}
	 */
	graph.selectAll = function(ids){
		return d3.selectAll(ids);
	}
	/**
	 * 修改实体颜色
	 * @function editNodeColor
	 * @param {Array} ids - 需要修改的id
	 * @param {string} color - 色值
	 */
	graph.editNodeColor = function(ids, color){
		if(ids.length == 0){ return ; }
		var nids = ids.map(function(ele){
			return '#node-'+ele;
		});
		var group = nodeGroup.selectAll(nids.toString());
		var data = group.data();
		data.map(function(ele){ ele.color = color; });
		redrawNode(group);
		NT.selectAll('[id*=NTColor-]').remove();
		Thumbnail();
	};
	/**
	 * 修改关系颜色
	 * @function editLinkColor
	 * @param {Array} ids - 需要修改的关系的id
	 * @param {string} color - 色值
	 */
	graph.editLinkColor = function(ids, color){
		if(ids.length == 0){ return ; }
		var lids=[],llids=[];
		for(var i in ids){
			lids.push('#link-'+ids[i]);
			llids.push('#link-label-'+ids[i]);
		}
		var group = d3.selectAll(lids.toString());
		var data = group.data();
		data.map(function(ele){ ele.color = color; });
		group.attr("stroke",color);
		
		var link_label = linkTextGroup.selectAll(llids.toString());
		link_label.select('rect').attr('stroke',function (d) {
			return d.color || '#2296ff';
		});
	};
	/**
	 * 修改关系连线宽度
	 * @function editLinkWidth
	 * @param {Array} ids - 需要修改的关系的id
	 * @param {Number} w - 宽度
	 */
	graph.editLinkWidth = function(ids, w){
		if(ids.length == 0){ return ; }
		var lids = ids.map(function(ele){
			return '#link-'+ele;
		});
		var group = d3.selectAll(lids.toString());
		var data = group.data();
		data.map(function(ele){ ele.value = w; });
		group.attr("stroke-width", w);
	};

	
	/**
	 * 模拟触发按键事件
	 * @function simulationEvent
	 * @param {String} type - 事件类型 ctrl/shift
	 */
	graph.simulationEvent = function(type){
		simulationEventType = type;
		bgclick();
	};
	
	
	/**
	 * 根据ID获得node数据
	 * @function getNodeDataById
	 * @param {String} id - nodeId
	 * @returns {object}
	 */
	graph.getNodeDataById = function(id){
		var node = graph.getData().nodes.filter(function(node){
			return node.id == id;
		});
		if(node.length>0){
			return node[0];
		}else{
			return null;
		}
	}
	
	
	/**
	 * 设置过滤类型
	 * @function setFilterType
	 * @param {String} type - 隐藏的类型
	 * @param {boolean} hide - 是否隐藏
	 */
	graph.setFilterType = function(type,hide){
		//filterTypeArray
		if(hide){
			
		}else{
			
		}
	}
	
	return graph;
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * 画图方法
 */
module.exports = (function () {

	var tools = {};
	tools.test = function() {
		console.log(222)
	}

	tools.test = function() {
		console.log(222)
	}
	tools.calStrWidth = function(str,w){
    //calculate string width
    var full = (function(str){
      var re=/[\u4E00-\u9FA5]|[\uff00-\uffff]|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5/g;
      if(re.test(str)){
        return str.match(re).length;
      }else{
        return 0 ;
      }
    }(str));
    var len =str.length;
    return Math.ceil((len + full)*w/2);
  }

	return function () {
		return tools;
	};
})();


// module.exports = function () {

//   var tools = {};
//   tools.test = function() {
//     console.log(222)
//   }

//   tools.test = function() {
//     console.log(222)
//   }
//   tools.calStrWidth = function(str,w){
//     //calculate string width
//     var full = (function(str){
//       re=/[\u4E00-\u9FA5]|[\uff00-\uffff]|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5/g;
//       if(re.test(str)){
//         return str.match(re).length;
//       }else{
//         return 0 ;
//       }
//     }(str));
//     var len =str.length;
//     return Math.ceil((len + full)*w/2);
//   }

//   return tools;
// };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var tools = __webpack_require__(6)()
module.exports = function (graph) {
	/**
	 * 实体对象
	 * @class Node
	 * @constructor Node
	 * @property {string} type - 类型
	 * @property {Array} links - 关系
	 * @property {Array} tags  - 标签
	 * @property {Boolean} isfixed - 锁定状态
	 * @property {Boolean} useKeyNode - 关键节点
	 * @property {Boolean} isShowAll - 是否全部展示
	 * @property {Boolean} showTags - 标签显示状态
	 * @property {Number} nodeScale - 实体缩放大小
	 * @property {String} icon - 实体图标
	 */
	function Node(data,id){
		console.log(data,id,6697);

		for (var key in data) {
			this[key] = data[key];
			console.log(data[key]);
		}
		this.type = 'node';
		this.links = [];
		this.tags = [];
		this.isfixed = false;
		this.useKeyNode = false;
		this.isShowAll = false;
		this.showTags = false;
		this.nodeScale = 1;
		this.icon = this.getIcon();
		console.log("www-node",this);
	}
	Node.prototype = {
		/**
		 * 获取 nodeType
		 * @function getType
		 * @memberof Node.prototype
		 * @returns {String}
		 */
		getType :  function() {
			return this.nodeType;
		},
		/**
		 * 获取 vid
		 * @function getKey
		 * @memberof Node.prototype
		 * @returns {String}
		 */
		getKey :  function() {
			return this.vid;
		},
		/**
		 * 获取 关系
		 * @function getLinks
		 * @memberof Node.prototype
		 * @returns {Array}
		 */
		getLinks : function () {
			var me = this;
			return graph.getData().links.filter(function(ele){
				return ele.source == me.id || ele.target == me.id;
			});
		},
		/**
		 * 获取 id
		 * @function getId
		 * @memberof Node.prototype
		 * @returns {String}
		 */
		getId : function () {
			return this.id;
		},
		/**
		 * 获取 选中项
		 * @function getSelection
		 * @memberof Node.prototype
		 * @returns {Array}
		 */
		getSelection : function(){
			return d3.select('#node-' + this.id);
		},
		/**
		 * 获取 与实体相连的实体
		 * @function getSiblings
		 * @memberof Node.prototype
		 * @returns {Array}
		 */
		getSiblings : function () {
			var arr = [],temp = '';
			var objs = this.getLinks();
			for (var i = 0; i < objs.length; i++) {
				temp = this.id == objs[i].source ? objs[i].target : objs[i].source;
				if (arr.indexOf(temp) == -1) {
					arr.push(temp);
				}
			}
			return arr;
		},
		/**
		 * 获取 实体properties
		 * @function getPropList
		 * @memberof Node.prototype
		 * @returns {Array}
		 */
		getPropList : function() {
			var arr = [];
			//console.log(this.properties,6788);
			for(var key in this.properties){
				//清除空值 && (!this.showProperties.length || this.showProperties.indexOf(key) != -1)
				if (this.properties[key] && (!this.showProperties ? true : (!this.showProperties.length || this.showProperties.indexOf(key) != -1))) {
					arr.push(this.properties[key]);
				}
			}
			return arr;
		},
		/**
		 * 获取 实体properties最大宽
		 * @function getPropWidth
		 * @memberof Node.prototype
		 * @returns {Number}
		 */
		getPropWidth: function () {
			var lenArr = this.getPropList().map(function(ele){
				return tools.calStrWidth(ele.toString(), 10)
			})
			lenArr = lenArr.sort(function(a, b) {
				return b - a;
			});
			if (lenArr.length) {
				return lenArr[0]
			}
			return 0;
		},
		/**
		 * 获取 实体properties最大高
		 * @function getPropHeight
		 * @memberof Node.prototype
		 * @returns {Number}
		 */
		getPropHeight: function() {
			return this.getPropLength()*(12+4);
		},
		/**
		 * 获取 实体properties数据的length属性
		 * @function getPropLength
		 * @memberof Node.prototype
		 * @returns {Number}
		 */
		getPropLength : function() {
			return this.getPropList().length;
		},
		/**
		 * 获取 实体 icon
		 * @function getIcon
		 * @memberof Node.prototype
		 * @returns {String}
		 */
		getIcon : function(){
			var icons = graph.getIcons(), sex = ['女', 0, 'female'];	
			for (var i = 0; i < icons.length; i++) {
				if (icons[i].type == this.iconType) {
					if (sex.indexOf(this.properties.XB) != -1 || sex.indexOf(this.properties.gender) != -1) {
						var icon = {}
						for (var key in icons[i]) {
							icon[key] = icons[i][key];
						}
						icon.path = icons[i].path_n;
						return icon;
					}
					return icons[i];
				}
			}
		},
		/**
		 * 设置 实体 color 属性
		 * @function setColor
		 * @memberof Node.prototype
		 * @param {String} color - 色值
		 */
		setColor : function(color){
			graph.editNodeColor([this.id],color);
		}
	}
	return Node;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var tools = __webpack_require__(6)()
module.exports = function (graph) {
	/**
	 * 关系对象
	 * @class Link
	 * @constructor Link
	 * @property {string} type - 类型
	 * @property {Array} tags  - 标签
	 */
	function Link(data){
		for (var key in data) {
			this[key] = data[key];
		}
		this.type = 'link';
		this.tags = [];
	}
	Link.prototype = {
		/**
		 * 获取 source
		 * @function getSource
		 * @memberof Link.prototype
		 * @returns {String}
		 */
		getSource : function() {
			return this.source;
		},
		/**
		 * 获取 target
		 * @function getTarget
		 * @memberof Link.prototype
		 * @returns {String}
		 */
		getTarget : function() {
			return this.target;
		},
		/**
		 * 获取 id
		 * @function getId
		 * @memberof Link.prototype
		 * @returns {String}
		 */
		getId : function() {
			return this.id;
		},
		/**
		 * 获取 关系properties
		 * @function getPropList
		 * @memberof Link.prototype
		 * @returns {Array}
		 */
		getPropList : function() {
			var arr = [];
			for(var key in this.properties){
				//清除空值 && (!this.showProperties.length || this.showProperties.indexOf(key) != -1)
				if (this.properties[key] && (!this.showProperties ? true : (!this.showProperties.length || this.showProperties.indexOf(key) != -1))) {
					arr.push(this.properties[key]);
				}
			}
			return arr;
		},
		/**
		 * 获取 关系properties最大宽
		 * @function getPropWidth
		 * @memberof Link.prototype
		 * @returns {Number}
		 */
		getPropWidth: function () {
			var lenArr = this.getPropList().map(function(ele){
				return tools.calStrWidth(ele.toString(), 10)
			})
			lenArr = lenArr.sort(function(a, b) {
				return b - a;
			});
			if (lenArr.length) {
				return lenArr[0] + (this.getPropLength() >1 ? 40 : 35)
			}
			return 0;
		},
		/**
		 * 获取 关系properties最大高
		 * @function getPropHeight
		 * @memberof Link.prototype
		 * @returns {Number}
		 */
		getPropHeight: function() {
			return 16+15;
		},
		/**
		 * 获取 关系properties数据的length属性
		 * @function getPropLength
		 * @memberof Link.prototype
		 * @returns {Number}
		 */
		getPropLength : function() {
			return this.getPropList().length;
		},
		/**
		 * 获取 中心点
		 * @function getCenter
		 * @memberof Link.prototype
		 * @returns {Object}
		 */
		getCenter : function() {
			var x = (this.source.x + this.target.x)/2;
			var y = (this.source.y + this.target.y)/2;
			return {
				x : x,
				y : y
			};
		},
		/**
		 * 设置 关系 color 属性
		 * @function setColor
		 * @memberof Link.prototype
		 * @param {String} color - 色值
		 */
		setColor : function(color){
			graph.editLinkColor([this.id],color);
		},
		/**
		 * 设置 关系联系 width 属性
		 * @function setWidth
		 * @memberof Link.prototype
		 * @param {Number} num - 宽度值
		 */
		setWidth : function(num){
			graph.editLinkWidth([this.id], num);
		}
	}
	return Link;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * 将svg保存为png图片
 */
module.exports = function () {
//---svg2png start---
	var out$ =  true && exports ||  true && {} || this;

  var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

  function isElement(obj) {
    return obj instanceof HTMLElement || obj instanceof SVGElement;
  }

  function requireDomNode(el) {
    if (!isElement(el)) {
      throw new Error('an HTMLElement or SVGElement is required; got ' + el);
    }
  }

  function isExternal(url) {
    return url && url.lastIndexOf('http',0) == 0 && url.lastIndexOf(window.location.host) == -1;
  }

  function inlineImages(el, callback) {
    requireDomNode(el);

    var images = el.querySelectorAll('image'),
        left = images.length,
        checkDone = function() {
          if (left === 0) {
            callback();
          }
        };

    checkDone();
    for (var i = 0; i < images.length; i++) {
      (function(image) {
        var href = image.getAttributeNS("http://www.w3.org/1999/xlink", "href");
        if (href) {
          if (isExternal(href.value)) {
            console.warn("Cannot render embedded images linking to external hosts: "+href.value);
            return;
          }
        }
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.crossOrigin = "Anonymous";
        href = href || image.getAttribute('href');
        if (href) {
          img.src = href;
          img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            image.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL('image/png'));
            left--;
            checkDone();
          }
          img.onerror = function() {
            console.log("Could not load "+href);
            left--;
            checkDone();
          }
        } else {
          left--;
          checkDone();
        }
      })(images[i]);
    }
  }

  function styles(el, selectorRemap) {
    var css = "";
    var sheets = document.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
      try {
        var rules = sheets[i].cssRules;
      } catch (e) {
        console.warn("Stylesheet could not be loaded: "+sheets[i].href);
        continue;
      }

      if (rules != null) {
        for (var j = 0; j < rules.length; j++) {
          var rule = rules[j];
          if (typeof(rule.style) != "undefined") {
            var match, selectorText;

            try {
              selectorText = rule.selectorText;
            } catch(err) {
              console.warn('The following CSS rule has an invalid selector: "' + rule + '"', err);
            }

            try {
              if (selectorText) {
                match = el.querySelector(selectorText);
              }
            } catch(err) {
              console.warn('Invalid CSS selector "' + selectorText + '"', err);
            }

            if (match) {
              var selector = selectorRemap ? selectorRemap(rule.selectorText) : rule.selectorText;
              css += selector + " { " + rule.style.cssText + " }\n";
            } else if(rule.cssText.match(/^@font-face/)) {
              css += rule.cssText + '\n';
            }
          }
        }
      }
    }
    return css;
  }

  function getDimension(el, clone, dim) {
    var v = (el.viewBox && el.viewBox.baseVal && el.viewBox.baseVal[dim]) ||
      (clone.getAttribute(dim) !== null && !clone.getAttribute(dim).match(/%$/) && parseInt(clone.getAttribute(dim))) ||
      el.getBoundingClientRect()[dim] ||
      parseInt(clone.style[dim]) ||
      parseInt(window.getComputedStyle(el).getPropertyValue(dim));
    return (typeof v === 'undefined' || v === null || isNaN(parseFloat(v))) ? 0 : v;
  }

  function reEncode(data) {
    data = encodeURIComponent(data);
    data = data.replace(/%([0-9A-F]{2})/g, function(match, p1) {
      var c = String.fromCharCode('0x'+p1);
      return c === '%' ? '%25' : c;
    });
    return decodeURIComponent(data);
  }

  out$.svgAsDataUri = function(el, options, cb) {
    requireDomNode(el);

    options = options || {};
    options.scale = options.scale || 1;
    options.responsive = options.responsive || false;
    var xmlns = "http://www.w3.org/2000/xmlns/";

    inlineImages(el, function() {
      var outer = document.createElement("div");
      var clone = el.cloneNode(true);
      var width, height;
      if(el.tagName == 'svg') {
        width = options.width || getDimension(el, clone, 'width');
        height = options.height || getDimension(el, clone, 'height');
      } else if(el.getBBox) {
        var box = el.getBBox();
        width = box.x + box.width;
        height = box.y + box.height;
        clone.setAttribute('transform', clone.getAttribute('transform').replace(/translate\(.*?\)/, ''));

        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
        svg.appendChild(clone)
        clone = svg;
      } else {
        console.error('Attempted to render non-SVG element', el);
        return;
      }

      clone.setAttribute("version", "1.1");
      if (!clone.getAttribute('xmlns')) {
        clone.setAttributeNS(xmlns, "xmlns", "http://www.w3.org/2000/svg");
      }
      if (!clone.getAttribute('xmlns:xlink')) {
        clone.setAttributeNS(xmlns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
      }

      if (options.responsive) {
        clone.removeAttribute('width');
        clone.removeAttribute('height');
        clone.setAttribute('preserveAspectRatio', 'xMinYMin meet');
      } else {
        clone.setAttribute("width", width * options.scale);
        clone.setAttribute("height", height * options.scale);
      }

      clone.setAttribute("viewBox", [
        options.left || 0,
        options.top || 0,
        width,
        height
      ].join(" "));

      var fos = clone.querySelectorAll('foreignObject > *');
      for (var i = 0; i < fos.length; i++) {
        if (!fos[i].getAttributeNS('xml', 'xmlns')) {
          fos[i].setAttributeNS(xmlns, "xmlns", "http://www.w3.org/1999/xhtml");
        }
      }

      outer.appendChild(clone);

      var css = styles(el, options.selectorRemap);
      var s = document.createElement('style');
      s.setAttribute('type', 'text/css');
      s.innerHTML = "<![CDATA[\n" + css + "\n]]>";
      var defs = document.createElement('defs');
      defs.appendChild(s);
      clone.insertBefore(defs, clone.firstChild);

      var svg = doctype + outer.innerHTML;
      var uri = 'data:image/svg+xml;base64,' + window.btoa(reEncode(svg));
      if (cb) {
        cb(uri);
      }
    });
  }

  out$.svgAsPngUri = function(el, options, cb) {
    requireDomNode(el);

    out$.svgAsDataUri(el, options, function(uri) {
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        if(options && options.backgroundColor){
          context.fillStyle = options.backgroundColor;
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.drawImage(image, 0, 0);
        var a = document.createElement('a'), png;
        try {
          png = canvas.toDataURL('image/png');
        } catch (e) {
          if ((typeof SecurityError !== 'undefined' && e instanceof SecurityError) || e.name == "SecurityError") {
            console.error("Rendered SVG images cannot be downloaded in this browser.");
            return;
          } else {
            throw e;
          }
        }
        cb(png);
      }
      image.onerror = function() {
        console.error(
          'There was an error loading the data URI as an image on the following SVG\n',
          window.atob(uri.slice(26)), '\n',
          "Open the following link to see browser's diagnosis\n",
          uri);
      }
      image.src = uri;
    });
  }

  function download(name, uri) {
    var a = document.createElement('a');
    a.download = name;
    a.href = uri;
    document.body.appendChild(a);
    a.addEventListener("click", function(e) {
      a.parentNode.removeChild(a);
    });
    a.click();
  }

  out$.saveSvg = function(el, name, options) {
    requireDomNode(el);

    options = options || {};
    out$.svgAsDataUri(el, options, function(uri) {
      download(name, uri);
    });
  }

  out$.saveSvgAsPng = function(el, name, options) {
    requireDomNode(el);

    options = options || {};
    out$.svgAsPngUri(el, options, function(uri) {
      download(name, uri);
    });
  }

  // if define is defined create as an AMD module
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return out$;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }


	return out$;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
	licence 校验
**/
module.exports = function () {
	var licence =  {},
		openTime = new Date().getTime(),
		license, js5, appjs, init_callback
	;

	
	//获得md5 -- end
	function getLic(callback){
		var licURL = appjs.substr(0,appjs.lastIndexOf('/')+1)+'hydra.lic';
		//console.log('licURL',licURL);
		d3.html(licURL, function(a,b) {
			license = d3.select(b)._groups[0][0].textContent;
			//console.log('license',license);
			if(typeof license == 'undefined') {
				console.log('获取lic失败, 地址'+licURL);
			}else{
				callback();
			}
		});
	}
	
	function valLic(){
		var v = true;
		var k = function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('b/a 9 c/f+e d 8+3+1+0 4 7+6 5/q/p+2 o/t+r+s n/i h g++j/m+l k=',30,30,'7bM|s46Zu2CSuA5MZVIbu5CTiUuXtsyteglye0csQys||vF4oLTOp3uXMRoqF|54qpsbYLRNI9ZyFri2VgxsrFDKVZHswq1TfdNWHQkLBxXEECQQDxxQmmMc94Wnon|UkumY5OnAkEAmbV3ofJkMAasdc1|Asr|KNVNsRg3lT6j6lJ5HxhUUNZPpqHZeErDDvRbPvhzyjxN65EgFsKSh84oZKT7|FRm|ukptRBRs0Edi0MWBCiWEPVyH9SyKvAd1KlS7M3d9V4NVYRxpdaPG7lrWJlJw87rG|m5ZgSORUW8OgByb30uhB89r9j8V|MIICXAIBAAKBgQCRKiQPr5hqvQ61IG72zO5K|0yyzJe96Ds|AoGAYDVovwim4J86XysGwAVkLUnhguqG0yoAi8C2tUvRyQDvJOOIPfNAnphPXSrR|KWheOHusu4hwIDAQAB|apX0c4eNFBkjnV61goxrFYPHI5ZAbsIYJP|3V|oXhovJelb6P6PSpSaFy1z4t40lmV8C1ba0kfzHianA5vKI8thoHARrkEOP7sDg3T|RoXBSq0lWxE3QJBAIrY|ph87QT7M9UZ|dTRM3utvkMxGl3seykbwsFNlVUfDd1cUrYU5xnLSW18|MWUyI|6AECQD9HJXvA3uFkCTlosrRlSVA7HD5ej04VyBrHxb|nEZqn0WfiU0bEFMe5JKEzpNBfRaKEfrTARRNHiO1pw7f|lk7pjb8tra|xQkZ80qXoAHNzJSKzfxRL79chHI3v8N|MH|ert|krbNOq19LQIQJAatAcdTpoaMnAUfCuXEazZksfg5eQ|L8XqDZ'.split('|'),0,{});
		var domain = document.domain;
		var crypt = new LE();
		crypt.sprk('-----BEGIN RSA PRIVATE KEY-----\n'+k+'\n-----END RSA PRIVATE KEY-----');
		var d = crypt.dect(license);
		var da = d.split('\n');
		if(openTime > parseInt(da[0])){ v = false; }
		var sa = da[1].split(',');
		if(sa.indexOf(domain)<0){ v = false; }
		js5 = da[2];
		if(v){
			protectScript(init_callback);
		}else{
			console.log('lic解析失败');
		}
	}	
	
	function protectScript(callback){
		callback();
		/*
		d3.html(appjs, function(a,b) {
			var v = true;
			var html = d3.select(b)._groups[0][0].textContent;
			var jsMd5 = md5(html);
			//console.log('html',jsMd5);
			if(jsMd5==js5){
				//console.log('lic校验成功 success');
				callback();
			}else{
				console.log('文件校验失败');
			}
		});
		*/
	}
	
	
	//rsa
	!function(t,e){ true?e(exports):undefined}(this,function(t){"use strict";var e="0123456789abcdefghijklmnopqrstuvwxyz";function a(t){return e.charAt(t)}function i(t,e){return t&e}function u(t,e){return t|e}function r(t,e){return t^e}function n(t,e){return t&~e}function s(t){if(0==t)return-1;var e=0;return 0==(65535&t)&&(t>>=16,e+=16),0==(255&t)&&(t>>=8,e+=8),0==(15&t)&&(t>>=4,e+=4),0==(3&t)&&(t>>=2,e+=2),0==(1&t)&&++e,e}function o(t){for(var e=0;0!=t;)t&=t-1,++e;return e}var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function c(t){var e,i,r="";for(e=0;e+3<=t.length;e+=3)i=parseInt(t.substring(e,e+3),16),r+=h.charAt(i>>6)+h.charAt(63&i);for(e+1==t.length?(i=parseInt(t.substring(e,e+1),16),r+=h.charAt(i<<2)):e+2==t.length&&(i=parseInt(t.substring(e,e+2),16),r+=h.charAt(i>>2)+h.charAt((3&i)<<4));0<(3&r.length);)r+="=";return r}function f(t){var e,i="",r=0,n=0;for(e=0;e<t.length&&"="!=t.charAt(e);++e){var s=h.indexOf(t.charAt(e));s<0||(0==r?(i+=a(s>>2),n=3&s,r=1):1==r?(i+=a(n<<2|s>>4),n=15&s,r=2):2==r?(i+=a(n),i+=a(s>>2),n=3&s,r=3):(i+=a(n<<2|s>>4),i+=a(15&s),r=0))}return 1==r&&(i+=a(n<<2)),i}var l,p=function(t,e){return(p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};var g,d=function(t){var e;if(void 0===l){var i="0123456789ABCDEF",r=" \f\n\r\t \u2028\u2029";for(l={},e=0;e<16;++e)l[i.charAt(e)]=e;for(i=i.toLowerCase(),e=10;e<16;++e)l[i.charAt(e)]=e;for(e=0;e<r.length;++e)l[r.charAt(e)]=-1}var n=[],s=0,o=0;for(e=0;e<t.length;++e){var h=t.charAt(e);if("="==h)break;if(-1!=(h=l[h])){if(void 0===h)throw new Error("Illegal character at offset "+e);s|=h,2<=++o?(n[n.length]=s,o=s=0):s<<=4}}if(o)throw new Error("Hex encoding incomplete: 4 bits missing");return n},v={decode:function(t){var e;if(void 0===g){var i="= \f\n\r\t \u2028\u2029";for(g=Object.create(null),e=0;e<64;++e)g["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)]=e;for(e=0;e<i.length;++e)g[i.charAt(e)]=-1}var r=[],n=0,s=0;for(e=0;e<t.length;++e){var o=t.charAt(e);if("="==o)break;if(-1!=(o=g[o])){if(void 0===o)throw new Error("Illegal character at offset "+e);n|=o,4<=++s?(r[r.length]=n>>16,r[r.length]=n>>8&255,r[r.length]=255&n,s=n=0):n<<=6}}switch(s){case 1:throw new Error("Base64 encoding incomplete: at least 2 bits missing");case 2:r[r.length]=n>>10;break;case 3:r[r.length]=n>>16,r[r.length]=n>>8&255}return r},re:/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,unarmor:function(t){var e=v.re.exec(t);if(e)if(e[1])t=e[1];else{if(!e[2])throw new Error("RegExp out of sync");t=e[2]}return v.decode(t)}},m=1e13,y=function(){function t(t){this.buf=[+t||0]}return t.prototype.mulAdd=function(t,e){var i,r,n=this.buf,s=n.length;for(i=0;i<s;++i)(r=n[i]*t+e)<m?e=0:r-=(e=0|r/m)*m,n[i]=r;0<e&&(n[i]=e)},t.prototype.sub=function(t){var e,i,r=this.buf,n=r.length;for(e=0;e<n;++e)(i=r[e]-t)<0?(i+=m,t=1):t=0,r[e]=i;for(;0===r[r.length-1];)r.pop()},t.prototype.toString=function(t){if(10!=(t||10))throw new Error("only base 10 is supported");for(var e=this.buf,i=e[e.length-1].toString(),r=e.length-2;0<=r;--r)i+=(m+e[r]).toString().substring(1);return i},t.prototype.valueOf=function(){for(var t=this.buf,e=0,i=t.length-1;0<=i;--i)e=e*m+t[i];return e},t.prototype.simplify=function(){var t=this.buf;return 1==t.length?t[0]:this},t}(),b="…",T=/^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,S=/^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;function E(t,e){return t.length>e&&(t=t.substring(0,e)+b),t}var w,D=function(){function i(t,e){this.hexDigits="0123456789ABCDEF",t instanceof i?(this.enc=t.enc,this.pos=t.pos):(this.enc=t,this.pos=e)}return i.prototype.get=function(t){if(void 0===t&&(t=this.pos++),t>=this.enc.length)throw new Error("Requesting byte offset "+t+" on a stream of length "+this.enc.length);return"string"==typeof this.enc?this.enc.charCodeAt(t):this.enc[t]},i.prototype.hexByte=function(t){return this.hexDigits.charAt(t>>4&15)+this.hexDigits.charAt(15&t)},i.prototype.hexDump=function(t,e,i){for(var r="",n=t;n<e;++n)if(r+=this.hexByte(this.get(n)),!0!==i)switch(15&n){case 7:r+="  ";break;case 15:r+="\n";break;default:r+=" "}return r},i.prototype.isASCII=function(t,e){for(var i=t;i<e;++i){var r=this.get(i);if(r<32||176<r)return!1}return!0},i.prototype.parseStringISO=function(t,e){for(var i="",r=t;r<e;++r)i+=String.fromCharCode(this.get(r));return i},i.prototype.parseStringUTF=function(t,e){for(var i="",r=t;r<e;){var n=this.get(r++);i+=n<128?String.fromCharCode(n):191<n&&n<224?String.fromCharCode((31&n)<<6|63&this.get(r++)):String.fromCharCode((15&n)<<12|(63&this.get(r++))<<6|63&this.get(r++))}return i},i.prototype.parseStringBMP=function(t,e){for(var i,r,n="",s=t;s<e;)i=this.get(s++),r=this.get(s++),n+=String.fromCharCode(i<<8|r);return n},i.prototype.parseTime=function(t,e,i){var r=this.parseStringISO(t,e),n=(i?T:S).exec(r);return n?(i&&(n[1]=+n[1],n[1]+=+n[1]<70?2e3:1900),r=n[1]+"-"+n[2]+"-"+n[3]+" "+n[4],n[5]&&(r+=":"+n[5],n[6]&&(r+=":"+n[6],n[7]&&(r+="."+n[7]))),n[8]&&(r+=" UTC","Z"!=n[8]&&(r+=n[8],n[9]&&(r+=":"+n[9]))),r):"Unrecognized time: "+r},i.prototype.parseInteger=function(t,e){for(var i,r=this.get(t),n=127<r,s=n?255:0,o="";r==s&&++t<e;)r=this.get(t);if(0===(i=e-t))return n?-1:0;if(4<i){for(o=r,i<<=3;0==(128&(+o^s));)o=+o<<1,--i;o="("+i+" bit)\n"}n&&(r-=256);for(var h=new y(r),a=t+1;a<e;++a)h.mulAdd(256,this.get(a));return o+h.toString()},i.prototype.parseBitString=function(t,e,i){for(var r=this.get(t),n="("+((e-t-1<<3)-r)+" bit)\n",s="",o=t+1;o<e;++o){for(var h=this.get(o),a=o==e-1?r:0,u=7;a<=u;--u)s+=h>>u&1?"1":"0";if(s.length>i)return n+E(s,i)}return n+s},i.prototype.parseOctetString=function(t,e,i){if(this.isASCII(t,e))return E(this.parseStringISO(t,e),i);var r=e-t,n="("+r+" byte)\n";(i/=2)<r&&(e=t+i);for(var s=t;s<e;++s)n+=this.hexByte(this.get(s));return i<r&&(n+=b),n},i.prototype.parseOID=function(t,e,i){for(var r="",n=new y,s=0,o=t;o<e;++o){var h=this.get(o);if(n.mulAdd(128,127&h),s+=7,!(128&h)){if(""===r)if((n=n.simplify())instanceof y)n.sub(80),r="2."+n.toString();else{var a=n<80?n<40?0:1:2;r=a+"."+(n-40*a)}else r+="."+n.toString();if(r.length>i)return E(r,i);n=new y,s=0}}return 0<s&&(r+=".incomplete"),r},i}(),x=function(){function c(t,e,i,r,n){if(!(r instanceof R))throw new Error("Invalid tag value.");this.stream=t,this.header=e,this.length=i,this.tag=r,this.sub=n}return c.prototype.typeName=function(){switch(this.tag.tagClass){case 0:switch(this.tag.tagNumber){case 0:return"EOC";case 1:return"BOOLEAN";case 2:return"INTEGER";case 3:return"BIT_STRING";case 4:return"OCTET_STRING";case 5:return"NULL";case 6:return"OBJECT_IDENTIFIER";case 7:return"ObjectDescriptor";case 8:return"EXTERNAL";case 9:return"REAL";case 10:return"ENUMERATED";case 11:return"EMBEDDED_PDV";case 12:return"UTF8String";case 16:return"SEQUENCE";case 17:return"SET";case 18:return"NumericString";case 19:return"PrintableString";case 20:return"TeletexString";case 21:return"VideotexString";case 22:return"IA5String";case 23:return"UTCTime";case 24:return"GeneralizedTime";case 25:return"GraphicString";case 26:return"VisibleString";case 27:return"GeneralString";case 28:return"UniversalString";case 30:return"BMPString"}return"Universal_"+this.tag.tagNumber.toString();case 1:return"Application_"+this.tag.tagNumber.toString();case 2:return"["+this.tag.tagNumber.toString()+"]";case 3:return"Private_"+this.tag.tagNumber.toString()}},c.prototype.content=function(t){if(void 0===this.tag)return null;void 0===t&&(t=1/0);var e=this.posContent(),i=Math.abs(this.length);if(!this.tag.isUniversal())return null!==this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(e,e+i,t);switch(this.tag.tagNumber){case 1:return 0===this.stream.get(e)?"false":"true";case 2:return this.stream.parseInteger(e,e+i);case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(e,e+i,t);case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(e,e+i,t);case 6:return this.stream.parseOID(e,e+i,t);case 16:case 17:return null!==this.sub?"("+this.sub.length+" elem)":"(no elem)";case 12:return E(this.stream.parseStringUTF(e,e+i),t);case 18:case 19:case 20:case 21:case 22:case 26:return E(this.stream.parseStringISO(e,e+i),t);case 30:return E(this.stream.parseStringBMP(e,e+i),t);case 23:case 24:return this.stream.parseTime(e,e+i,23==this.tag.tagNumber)}return null},c.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+(null===this.sub?"null":this.sub.length)+"]"},c.prototype.toPrettyString=function(t){void 0===t&&(t="");var e=t+this.typeName()+" @"+this.stream.pos;if(0<=this.length&&(e+="+"),e+=this.length,this.tag.tagConstructed?e+=" (constructed)":!this.tag.isUniversal()||3!=this.tag.tagNumber&&4!=this.tag.tagNumber||null===this.sub||(e+=" (encapsulates)"),e+="\n",null!==this.sub){t+="  ";for(var i=0,r=this.sub.length;i<r;++i)e+=this.sub[i].toPrettyString(t)}return e},c.prototype.posStart=function(){return this.stream.pos},c.prototype.posContent=function(){return this.stream.pos+this.header},c.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)},c.prototype.toHexString=function(){return this.stream.hexDump(this.posStart(),this.posEnd(),!0)},c.decodeLength=function(t){var e=t.get(),i=127&e;if(i==e)return i;if(6<i)throw new Error("Length over 48 bits not supported at position "+(t.pos-1));if(0===i)return null;for(var r=e=0;r<i;++r)e=256*e+t.get();return e},c.prototype.getHexStringValue=function(){var t=this.toHexString(),e=2*this.header,i=2*this.length;return t.substr(e,i)},c.decode=function(t){var r;r=t instanceof D?t:new D(t,0);var e=new D(r),i=new R(r),n=c.decodeLength(r),s=r.pos,o=s-e.pos,h=null,a=function(){var t=[];if(null!==n){for(var e=s+n;r.pos<e;)t[t.length]=c.decode(r);if(r.pos!=e)throw new Error("Content size is not correct for container starting at offset "+s)}else try{for(;;){var i=c.decode(r);if(i.tag.isEOC())break;t[t.length]=i}n=s-r.pos}catch(t){throw new Error("Exception while decoding undefined length content: "+t)}return t};if(i.tagConstructed)h=a();else if(i.isUniversal()&&(3==i.tagNumber||4==i.tagNumber))try{if(3==i.tagNumber&&0!=r.get())throw new Error("BIT STRINGs with unused bits cannot encapsulate.");h=a();for(var u=0;u<h.length;++u)if(h[u].tag.isEOC())throw new Error("EOC is not supposed to be actual content.")}catch(t){h=null}if(null===h){if(null===n)throw new Error("We can't skip over an invalid tag with undefined length at offset "+s);r.pos=s+Math.abs(n)}return new c(e,o,n,i,h)},c}(),R=function(){function t(t){var e=t.get();if(this.tagClass=e>>6,this.tagConstructed=0!=(32&e),this.tagNumber=31&e,31==this.tagNumber){for(var i=new y;e=t.get(),i.mulAdd(128,127&e),128&e;);this.tagNumber=i.simplify()}}return t.prototype.isUniversal=function(){return 0===this.tagClass},t.prototype.isEOC=function(){return 0===this.tagClass&&0===this.tagNumber},t}(),B=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],A=(1<<26)/B[B.length-1],O=function(){function b(t,e,i){null!=t&&("number"==typeof t?this.fromNumber(t,e,i):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e))}return b.prototype.toString=function(t){if(this.s<0)return"-"+this.negate().toString(t);var e;if(16==t)e=4;else if(8==t)e=3;else if(2==t)e=1;else if(32==t)e=5;else{if(4!=t)return this.toRadix(t);e=2}var i,r=(1<<e)-1,n=!1,s="",o=this.t,h=this.DB-o*this.DB%e;if(0<o--)for(h<this.DB&&0<(i=this[o]>>h)&&(n=!0,s=a(i));0<=o;)h<e?(i=(this[o]&(1<<h)-1)<<e-h,i|=this[--o]>>(h+=this.DB-e)):(i=this[o]>>(h-=e)&r,h<=0&&(h+=this.DB,--o)),0<i&&(n=!0),n&&(s+=a(i));return n?s:"0"},b.prototype.negate=function(){var t=M();return b.ZERO.subTo(this,t),t},b.prototype.abs=function(){return this.s<0?this.negate():this},b.prototype.compareTo=function(t){var e=this.s-t.s;if(0!=e)return e;var i=this.t;if(0!=(e=i-t.t))return this.s<0?-e:e;for(;0<=--i;)if(0!=(e=this[i]-t[i]))return e;return 0},b.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+U(this[this.t-1]^this.s&this.DM)},b.prototype.mod=function(t){var e=M();return this.abs().divRemTo(t,null,e),this.s<0&&0<e.compareTo(b.ZERO)&&t.subTo(e,e),e},b.prototype.modPowInt=function(t,e){var i;return i=t<256||e.isEven()?new I(e):new N(e),this.exp(t,i)},b.prototype.clone=function(){var t=M();return this.copyTo(t),t},b.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},b.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24},b.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<16>>16},b.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},b.prototype.toByteArray=function(){var t=this.t,e=[];e[0]=this.s;var i,r=this.DB-t*this.DB%8,n=0;if(0<t--)for(r<this.DB&&(i=this[t]>>r)!=(this.s&this.DM)>>r&&(e[n++]=i|this.s<<this.DB-r);0<=t;)r<8?(i=(this[t]&(1<<r)-1)<<8-r,i|=this[--t]>>(r+=this.DB-8)):(i=this[t]>>(r-=8)&255,r<=0&&(r+=this.DB,--t)),0!=(128&i)&&(i|=-256),0==n&&(128&this.s)!=(128&i)&&++n,(0<n||i!=this.s)&&(e[n++]=i);return e},b.prototype.equals=function(t){return 0==this.compareTo(t)},b.prototype.min=function(t){return this.compareTo(t)<0?this:t},b.prototype.max=function(t){return 0<this.compareTo(t)?this:t},b.prototype.and=function(t){var e=M();return this.bitwiseTo(t,i,e),e},b.prototype.or=function(t){var e=M();return this.bitwiseTo(t,u,e),e},b.prototype.xor=function(t){var e=M();return this.bitwiseTo(t,r,e),e},b.prototype.andNot=function(t){var e=M();return this.bitwiseTo(t,n,e),e},b.prototype.not=function(){for(var t=M(),e=0;e<this.t;++e)t[e]=this.DM&~this[e];return t.t=this.t,t.s=~this.s,t},b.prototype.shiftLeft=function(t){var e=M();return t<0?this.rShiftTo(-t,e):this.lShiftTo(t,e),e},b.prototype.shiftRight=function(t){var e=M();return t<0?this.lShiftTo(-t,e):this.rShiftTo(t,e),e},b.prototype.getLowestSetBit=function(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+s(this[t]);return this.s<0?this.t*this.DB:-1},b.prototype.bitCount=function(){for(var t=0,e=this.s&this.DM,i=0;i<this.t;++i)t+=o(this[i]^e);return t},b.prototype.testBit=function(t){var e=Math.floor(t/this.DB);return e>=this.t?0!=this.s:0!=(this[e]&1<<t%this.DB)},b.prototype.setBit=function(t){return this.changeBit(t,u)},b.prototype.clearBit=function(t){return this.changeBit(t,n)},b.prototype.flipBit=function(t){return this.changeBit(t,r)},b.prototype.add=function(t){var e=M();return this.addTo(t,e),e},b.prototype.subtract=function(t){var e=M();return this.subTo(t,e),e},b.prototype.multiply=function(t){var e=M();return this.multiplyTo(t,e),e},b.prototype.divide=function(t){var e=M();return this.divRemTo(t,e,null),e},b.prototype.remainder=function(t){var e=M();return this.divRemTo(t,null,e),e},b.prototype.divideAndRemainder=function(t){var e=M(),i=M();return this.divRemTo(t,e,i),[e,i]},b.prototype.modPow=function(t,e){var i,r,n=t.bitLength(),s=F(1);if(n<=0)return s;i=n<18?1:n<48?3:n<144?4:n<768?5:6,r=n<8?new I(e):e.isEven()?new P(e):new N(e);var o=[],h=3,a=i-1,u=(1<<i)-1;if(o[1]=r.convert(this),1<i){var c=M();for(r.sqrTo(o[1],c);h<=u;)o[h]=M(),r.mulTo(c,o[h-2],o[h]),h+=2}var f,l,p=t.t-1,g=!0,d=M();for(n=U(t[p])-1;0<=p;){for(a<=n?f=t[p]>>n-a&u:(f=(t[p]&(1<<n+1)-1)<<a-n,0<p&&(f|=t[p-1]>>this.DB+n-a)),h=i;0==(1&f);)f>>=1,--h;if((n-=h)<0&&(n+=this.DB,--p),g)o[f].copyTo(s),g=!1;else{for(;1<h;)r.sqrTo(s,d),r.sqrTo(d,s),h-=2;0<h?r.sqrTo(s,d):(l=s,s=d,d=l),r.mulTo(d,o[f],s)}for(;0<=p&&0==(t[p]&1<<n);)r.sqrTo(s,d),l=s,s=d,d=l,--n<0&&(n=this.DB-1,--p)}return r.revert(s)},b.prototype.modInverse=function(t){var e=t.isEven();if(this.isEven()&&e||0==t.signum())return b.ZERO;for(var i=t.clone(),r=this.clone(),n=F(1),s=F(0),o=F(0),h=F(1);0!=i.signum();){for(;i.isEven();)i.rShiftTo(1,i),e?(n.isEven()&&s.isEven()||(n.addTo(this,n),s.subTo(t,s)),n.rShiftTo(1,n)):s.isEven()||s.subTo(t,s),s.rShiftTo(1,s);for(;r.isEven();)r.rShiftTo(1,r),e?(o.isEven()&&h.isEven()||(o.addTo(this,o),h.subTo(t,h)),o.rShiftTo(1,o)):h.isEven()||h.subTo(t,h),h.rShiftTo(1,h);0<=i.compareTo(r)?(i.subTo(r,i),e&&n.subTo(o,n),s.subTo(h,s)):(r.subTo(i,r),e&&o.subTo(n,o),h.subTo(s,h))}return 0!=r.compareTo(b.ONE)?b.ZERO:0<=h.compareTo(t)?h.subtract(t):h.signum()<0?(h.addTo(t,h),h.signum()<0?h.add(t):h):h},b.prototype.pow=function(t){return this.exp(t,new V)},b.prototype.gcd=function(t){var e=this.s<0?this.negate():this.clone(),i=t.s<0?t.negate():t.clone();if(e.compareTo(i)<0){var r=e;e=i,i=r}var n=e.getLowestSetBit(),s=i.getLowestSetBit();if(s<0)return e;for(n<s&&(s=n),0<s&&(e.rShiftTo(s,e),i.rShiftTo(s,i));0<e.signum();)0<(n=e.getLowestSetBit())&&e.rShiftTo(n,e),0<(n=i.getLowestSetBit())&&i.rShiftTo(n,i),0<=e.compareTo(i)?(e.subTo(i,e),e.rShiftTo(1,e)):(i.subTo(e,i),i.rShiftTo(1,i));return 0<s&&i.lShiftTo(s,i),i},b.prototype.isProbablePrime=function(t){var e,i=this.abs();if(1==i.t&&i[0]<=B[B.length-1]){for(e=0;e<B.length;++e)if(i[0]==B[e])return!0;return!1}if(i.isEven())return!1;for(e=1;e<B.length;){for(var r=B[e],n=e+1;n<B.length&&r<A;)r*=B[n++];for(r=i.modInt(r);e<n;)if(r%B[e++]==0)return!1}return i.millerRabin(t)},b.prototype.copyTo=function(t){for(var e=this.t-1;0<=e;--e)t[e]=this[e];t.t=this.t,t.s=this.s},b.prototype.fromInt=function(t){this.t=1,this.s=t<0?-1:0,0<t?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0},b.prototype.fromString=function(t,e){var i;if(16==e)i=4;else if(8==e)i=3;else if(256==e)i=8;else if(2==e)i=1;else if(32==e)i=5;else{if(4!=e)return void this.fromRadix(t,e);i=2}this.t=0,this.s=0;for(var r=t.length,n=!1,s=0;0<=--r;){var o=8==i?255&+t[r]:C(t,r);o<0?"-"==t.charAt(r)&&(n=!0):(n=!1,0==s?this[this.t++]=o:s+i>this.DB?(this[this.t-1]|=(o&(1<<this.DB-s)-1)<<s,this[this.t++]=o>>this.DB-s):this[this.t-1]|=o<<s,(s+=i)>=this.DB&&(s-=this.DB))}8==i&&0!=(128&+t[0])&&(this.s=-1,0<s&&(this[this.t-1]|=(1<<this.DB-s)-1<<s)),this.clamp(),n&&b.ZERO.subTo(this,this)},b.prototype.clamp=function(){for(var t=this.s&this.DM;0<this.t&&this[this.t-1]==t;)--this.t},b.prototype.dlShiftTo=function(t,e){var i;for(i=this.t-1;0<=i;--i)e[i+t]=this[i];for(i=t-1;0<=i;--i)e[i]=0;e.t=this.t+t,e.s=this.s},b.prototype.drShiftTo=function(t,e){for(var i=t;i<this.t;++i)e[i-t]=this[i];e.t=Math.max(this.t-t,0),e.s=this.s},b.prototype.lShiftTo=function(t,e){for(var i=t%this.DB,r=this.DB-i,n=(1<<r)-1,s=Math.floor(t/this.DB),o=this.s<<i&this.DM,h=this.t-1;0<=h;--h)e[h+s+1]=this[h]>>r|o,o=(this[h]&n)<<i;for(h=s-1;0<=h;--h)e[h]=0;e[s]=o,e.t=this.t+s+1,e.s=this.s,e.clamp()},b.prototype.rShiftTo=function(t,e){e.s=this.s;var i=Math.floor(t/this.DB);if(i>=this.t)e.t=0;else{var r=t%this.DB,n=this.DB-r,s=(1<<r)-1;e[0]=this[i]>>r;for(var o=i+1;o<this.t;++o)e[o-i-1]|=(this[o]&s)<<n,e[o-i]=this[o]>>r;0<r&&(e[this.t-i-1]|=(this.s&s)<<n),e.t=this.t-i,e.clamp()}},b.prototype.subTo=function(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);i<n;)r+=this[i]-t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r-=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r-=t[i],e[i++]=r&this.DM,r>>=this.DB;r-=t.s}e.s=r<0?-1:0,r<-1?e[i++]=this.DV+r:0<r&&(e[i++]=r),e.t=i,e.clamp()},b.prototype.multiplyTo=function(t,e){var i=this.abs(),r=t.abs(),n=i.t;for(e.t=n+r.t;0<=--n;)e[n]=0;for(n=0;n<r.t;++n)e[n+i.t]=i.am(0,r[n],e,n,0,i.t);e.s=0,e.clamp(),this.s!=t.s&&b.ZERO.subTo(e,e)},b.prototype.squareTo=function(t){for(var e=this.abs(),i=t.t=2*e.t;0<=--i;)t[i]=0;for(i=0;i<e.t-1;++i){var r=e.am(i,e[i],t,2*i,0,1);(t[i+e.t]+=e.am(i+1,2*e[i],t,2*i+1,r,e.t-i-1))>=e.DV&&(t[i+e.t]-=e.DV,t[i+e.t+1]=1)}0<t.t&&(t[t.t-1]+=e.am(i,e[i],t,2*i,0,1)),t.s=0,t.clamp()},b.prototype.divRemTo=function(t,e,i){var r=t.abs();if(!(r.t<=0)){var n=this.abs();if(n.t<r.t)return null!=e&&e.fromInt(0),void(null!=i&&this.copyTo(i));null==i&&(i=M());var s=M(),o=this.s,h=t.s,a=this.DB-U(r[r.t-1]);0<a?(r.lShiftTo(a,s),n.lShiftTo(a,i)):(r.copyTo(s),n.copyTo(i));var u=s.t,c=s[u-1];if(0!=c){var f=c*(1<<this.F1)+(1<u?s[u-2]>>this.F2:0),l=this.FV/f,p=(1<<this.F1)/f,g=1<<this.F2,d=i.t,v=d-u,m=null==e?M():e;for(s.dlShiftTo(v,m),0<=i.compareTo(m)&&(i[i.t++]=1,i.subTo(m,i)),b.ONE.dlShiftTo(u,m),m.subTo(s,s);s.t<u;)s[s.t++]=0;for(;0<=--v;){var y=i[--d]==c?this.DM:Math.floor(i[d]*l+(i[d-1]+g)*p);if((i[d]+=s.am(0,y,i,v,0,u))<y)for(s.dlShiftTo(v,m),i.subTo(m,i);i[d]<--y;)i.subTo(m,i)}null!=e&&(i.drShiftTo(u,e),o!=h&&b.ZERO.subTo(e,e)),i.t=u,i.clamp(),0<a&&i.rShiftTo(a,i),o<0&&b.ZERO.subTo(i,i)}}},b.prototype.invDigit=function(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var e=3&t;return 0<(e=(e=(e=(e=e*(2-(15&t)*e)&15)*(2-(255&t)*e)&255)*(2-((65535&t)*e&65535))&65535)*(2-t*e%this.DV)%this.DV)?this.DV-e:-e},b.prototype.isEven=function(){return 0==(0<this.t?1&this[0]:this.s)},b.prototype.exp=function(t,e){if(4294967295<t||t<1)return b.ONE;var i=M(),r=M(),n=e.convert(this),s=U(t)-1;for(n.copyTo(i);0<=--s;)if(e.sqrTo(i,r),0<(t&1<<s))e.mulTo(r,n,i);else{var o=i;i=r,r=o}return e.revert(i)},b.prototype.chunkSize=function(t){return Math.floor(Math.LN2*this.DB/Math.log(t))},b.prototype.toRadix=function(t){if(null==t&&(t=10),0==this.signum()||t<2||36<t)return"0";var e=this.chunkSize(t),i=Math.pow(t,e),r=F(i),n=M(),s=M(),o="";for(this.divRemTo(r,n,s);0<n.signum();)o=(i+s.intValue()).toString(t).substr(1)+o,n.divRemTo(r,n,s);return s.intValue().toString(t)+o},b.prototype.fromRadix=function(t,e){this.fromInt(0),null==e&&(e=10);for(var i=this.chunkSize(e),r=Math.pow(e,i),n=!1,s=0,o=0,h=0;h<t.length;++h){var a=C(t,h);a<0?"-"==t.charAt(h)&&0==this.signum()&&(n=!0):(o=e*o+a,++s>=i&&(this.dMultiply(r),this.dAddOffset(o,0),o=s=0))}0<s&&(this.dMultiply(Math.pow(e,s)),this.dAddOffset(o,0)),n&&b.ZERO.subTo(this,this)},b.prototype.fromNumber=function(t,e,i){if("number"==typeof e)if(t<2)this.fromInt(1);else for(this.fromNumber(t,i),this.testBit(t-1)||this.bitwiseTo(b.ONE.shiftLeft(t-1),u,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(e);)this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(b.ONE.shiftLeft(t-1),this);else{var r=[],n=7&t;r.length=1+(t>>3),e.nextBytes(r),0<n?r[0]&=(1<<n)-1:r[0]=0,this.fromString(r,256)}},b.prototype.bitwiseTo=function(t,e,i){var r,n,s=Math.min(t.t,this.t);for(r=0;r<s;++r)i[r]=e(this[r],t[r]);if(t.t<this.t){for(n=t.s&this.DM,r=s;r<this.t;++r)i[r]=e(this[r],n);i.t=this.t}else{for(n=this.s&this.DM,r=s;r<t.t;++r)i[r]=e(n,t[r]);i.t=t.t}i.s=e(this.s,t.s),i.clamp()},b.prototype.changeBit=function(t,e){var i=b.ONE.shiftLeft(t);return this.bitwiseTo(i,e,i),i},b.prototype.addTo=function(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);i<n;)r+=this[i]+t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r+=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r+=t[i],e[i++]=r&this.DM,r>>=this.DB;r+=t.s}e.s=r<0?-1:0,0<r?e[i++]=r:r<-1&&(e[i++]=this.DV+r),e.t=i,e.clamp()},b.prototype.dMultiply=function(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp()},b.prototype.dAddOffset=function(t,e){if(0!=t){for(;this.t<=e;)this[this.t++]=0;for(this[e]+=t;this[e]>=this.DV;)this[e]-=this.DV,++e>=this.t&&(this[this.t++]=0),++this[e]}},b.prototype.multiplyLowerTo=function(t,e,i){var r=Math.min(this.t+t.t,e);for(i.s=0,i.t=r;0<r;)i[--r]=0;for(var n=i.t-this.t;r<n;++r)i[r+this.t]=this.am(0,t[r],i,r,0,this.t);for(n=Math.min(t.t,e);r<n;++r)this.am(0,t[r],i,r,0,e-r);i.clamp()},b.prototype.multiplyUpperTo=function(t,e,i){--e;var r=i.t=this.t+t.t-e;for(i.s=0;0<=--r;)i[r]=0;for(r=Math.max(e-this.t,0);r<t.t;++r)i[this.t+r-e]=this.am(e-r,t[r],i,0,0,this.t+r-e);i.clamp(),i.drShiftTo(1,i)},b.prototype.modInt=function(t){if(t<=0)return 0;var e=this.DV%t,i=this.s<0?t-1:0;if(0<this.t)if(0==e)i=this[0]%t;else for(var r=this.t-1;0<=r;--r)i=(e*i+this[r])%t;return i},b.prototype.millerRabin=function(t){var e=this.subtract(b.ONE),i=e.getLowestSetBit();if(i<=0)return!1;var r=e.shiftRight(i);B.length<(t=t+1>>1)&&(t=B.length);for(var n=M(),s=0;s<t;++s){n.fromInt(B[Math.floor(Math.random()*B.length)]);var o=n.modPow(r,this);if(0!=o.compareTo(b.ONE)&&0!=o.compareTo(e)){for(var h=1;h++<i&&0!=o.compareTo(e);)if(0==(o=o.modPowInt(2,this)).compareTo(b.ONE))return!1;if(0!=o.compareTo(e))return!1}}return!0},b.prototype.square=function(){var t=M();return this.squareTo(t),t},b.prototype.gcda=function(t,e){var i=this.s<0?this.negate():this.clone(),r=t.s<0?t.negate():t.clone();if(i.compareTo(r)<0){var n=i;i=r,r=n}var s=i.getLowestSetBit(),o=r.getLowestSetBit();if(o<0)e(i);else{s<o&&(o=s),0<o&&(i.rShiftTo(o,i),r.rShiftTo(o,r));var h=function(){0<(s=i.getLowestSetBit())&&i.rShiftTo(s,i),0<(s=r.getLowestSetBit())&&r.rShiftTo(s,r),0<=i.compareTo(r)?(i.subTo(r,i),i.rShiftTo(1,i)):(r.subTo(i,r),r.rShiftTo(1,r)),0<i.signum()?setTimeout(h,0):(0<o&&r.lShiftTo(o,r),setTimeout(function(){e(r)},0))};setTimeout(h,10)}},b.prototype.fromNumberAsync=function(t,e,i,r){if("number"==typeof e)if(t<2)this.fromInt(1);else{this.fromNumber(t,i),this.testBit(t-1)||this.bitwiseTo(b.ONE.shiftLeft(t-1),u,this),this.isEven()&&this.dAddOffset(1,0);var n=this,s=function(){n.dAddOffset(2,0),n.bitLength()>t&&n.subTo(b.ONE.shiftLeft(t-1),n),n.isProbablePrime(e)?setTimeout(function(){r()},0):setTimeout(s,0)};setTimeout(s,0)}else{var o=[],h=7&t;o.length=1+(t>>3),e.nextBytes(o),0<h?o[0]&=(1<<h)-1:o[0]=0,this.fromString(o,256)}},b}(),V=function(){function t(){}return t.prototype.convert=function(t){return t},t.prototype.revert=function(t){return t},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i)},t.prototype.sqrTo=function(t,e){t.squareTo(e)},t}(),I=function(){function t(t){this.m=t}return t.prototype.convert=function(t){return t.s<0||0<=t.compareTo(this.m)?t.mod(this.m):t},t.prototype.revert=function(t){return t},t.prototype.reduce=function(t){t.divRemTo(this.m,null,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}(),N=function(){function t(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}return t.prototype.convert=function(t){var e=M();return t.abs().dlShiftTo(this.m.t,e),e.divRemTo(this.m,null,e),t.s<0&&0<e.compareTo(O.ZERO)&&this.m.subTo(e,e),e},t.prototype.revert=function(t){var e=M();return t.copyTo(e),this.reduce(e),e},t.prototype.reduce=function(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var e=0;e<this.m.t;++e){var i=32767&t[e],r=i*this.mpl+((i*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[i=e+this.m.t]+=this.m.am(0,r,t,e,0,this.m.t);t[i]>=t.DV;)t[i]-=t.DV,t[++i]++}t.clamp(),t.drShiftTo(this.m.t,t),0<=t.compareTo(this.m)&&t.subTo(this.m,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}(),P=function(){function t(t){this.m=t,this.r2=M(),this.q3=M(),O.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t)}return t.prototype.convert=function(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var e=M();return t.copyTo(e),this.reduce(e),e},t.prototype.revert=function(t){return t},t.prototype.reduce=function(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);0<=t.compareTo(this.m);)t.subTo(this.m,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}();function M(){return new O(null)}function q(t,e){return new O(t,e)}"Microsoft Internet Explorer"==navigator.appName?(O.prototype.am=function(t,e,i,r,n,s){for(var o=32767&e,h=e>>15;0<=--s;){var a=32767&this[t],u=this[t++]>>15,c=h*a+u*o;n=((a=o*a+((32767&c)<<15)+i[r]+(1073741823&n))>>>30)+(c>>>15)+h*u+(n>>>30),i[r++]=1073741823&a}return n},w=30):"Netscape"!=navigator.appName?(O.prototype.am=function(t,e,i,r,n,s){for(;0<=--s;){var o=e*this[t++]+i[r]+n;n=Math.floor(o/67108864),i[r++]=67108863&o}return n},w=26):(O.prototype.am=function(t,e,i,r,n,s){for(var o=16383&e,h=e>>14;0<=--s;){var a=16383&this[t],u=this[t++]>>14,c=h*a+u*o;n=((a=o*a+((16383&c)<<14)+i[r]+n)>>28)+(c>>14)+h*u,i[r++]=268435455&a}return n},w=28),O.prototype.DB=w,O.prototype.DM=(1<<w)-1,O.prototype.DV=1<<w;O.prototype.FV=Math.pow(2,52),O.prototype.F1=52-w,O.prototype.F2=2*w-52;var j,L,H=[];for(j="0".charCodeAt(0),L=0;L<=9;++L)H[j++]=L;for(j="a".charCodeAt(0),L=10;L<36;++L)H[j++]=L;for(j="A".charCodeAt(0),L=10;L<36;++L)H[j++]=L;function C(t,e){var i=H[t.charCodeAt(e)];return null==i?-1:i}function F(t){var e=M();return e.fromInt(t),e}function U(t){var e,i=1;return 0!=(e=t>>>16)&&(t=e,i+=16),0!=(e=t>>8)&&(t=e,i+=8),0!=(e=t>>4)&&(t=e,i+=4),0!=(e=t>>2)&&(t=e,i+=2),0!=(e=t>>1)&&(t=e,i+=1),i}O.ZERO=F(0),O.ONE=F(1);var K=function(){function t(){this.i=0,this.j=0,this.S=[]}return t.prototype.init=function(t){var e,i,r;for(e=0;e<256;++e)this.S[e]=e;for(e=i=0;e<256;++e)i=i+this.S[e]+t[e%t.length]&255,r=this.S[e],this.S[e]=this.S[i],this.S[i]=r;this.i=0,this.j=0},t.prototype.next=function(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]},t}();var k,_,z=256,Z=null;if(null==Z){Z=[];var G=void(_=0);if(window.crypto&&window.crypto.getRandomValues){var $=new Uint32Array(256);for(window.crypto.getRandomValues($),G=0;G<$.length;++G)Z[_++]=255&$[G]}var Y=function(t){if(this.count=this.count||0,256<=this.count||z<=_)window.removeEventListener?window.removeEventListener("mousemove",Y,!1):window.detachEvent&&window.detachEvent("onmousemove",Y);else try{var e=t.x+t.y;Z[_++]=255&e,this.count+=1}catch(t){}};window.addEventListener?window.addEventListener("mousemove",Y,!1):window.attachEvent&&window.attachEvent("onmousemove",Y)}function J(){if(null==k){for(k=new K;_<z;){var t=Math.floor(65536*Math.random());Z[_++]=255&t}for(k.init(Z),_=0;_<Z.length;++_)Z[_]=0;_=0}return k.next()}var X=function(){function t(){}return t.prototype.nextBytes=function(t){for(var e=0;e<t.length;++e)t[e]=J()},t}();var Q=function(){function t(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}return t.prototype.doPublic=function(t){return t.modPowInt(this.e,this.n)},t.prototype.doPrivate=function(t){if(null==this.p||null==this.q)return t.modPow(this.d,this.n);for(var e=t.mod(this.p).modPow(this.dmp1,this.p),i=t.mod(this.q).modPow(this.dmq1,this.q);e.compareTo(i)<0;)e=e.add(this.p);return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)},t.prototype.setPublic=function(t,e){null!=t&&null!=e&&0<t.length&&0<e.length?(this.n=q(t,16),this.e=parseInt(e,16)):console.error("Invalid RSA public key")},t.prototype.enct=function(t){var e=function(t,e){if(e<t.length+11)return console.error("Message too long for RSA"),null;for(var i=[],r=t.length-1;0<=r&&0<e;){var n=t.charCodeAt(r--);n<128?i[--e]=n:127<n&&n<2048?(i[--e]=63&n|128,i[--e]=n>>6|192):(i[--e]=63&n|128,i[--e]=n>>6&63|128,i[--e]=n>>12|224)}i[--e]=0;for(var s=new X,o=[];2<e;){for(o[0]=0;0==o[0];)s.nextBytes(o);i[--e]=o[0]}return i[--e]=2,i[--e]=0,new O(i)}(t,this.n.bitLength()+7>>3);if(null==e)return null;var i=this.doPublic(e);if(null==i)return null;var r=i.toString(16);return 0==(1&r.length)?r:"0"+r},t.prototype.setPrivate=function(t,e,i){null!=t&&null!=e&&0<t.length&&0<e.length?(this.n=q(t,16),this.e=parseInt(e,16),this.d=q(i,16)):console.error("Invalid RSA private key")},t.prototype.setPrivateEx=function(t,e,i,r,n,s,o,h){null!=t&&null!=e&&0<t.length&&0<e.length?(this.n=q(t,16),this.e=parseInt(e,16),this.d=q(i,16),this.p=q(r,16),this.q=q(n,16),this.dmp1=q(s,16),this.dmq1=q(o,16),this.coeff=q(h,16)):console.error("Invalid RSA private key")},t.prototype.generate=function(t,e){var i=new X,r=t>>1;this.e=parseInt(e,16);for(var n=new O(e,16);;){for(;this.p=new O(t-r,1,i),0!=this.p.subtract(O.ONE).gcd(n).compareTo(O.ONE)||!this.p.isProbablePrime(10););for(;this.q=new O(r,1,i),0!=this.q.subtract(O.ONE).gcd(n).compareTo(O.ONE)||!this.q.isProbablePrime(10););if(this.p.compareTo(this.q)<=0){var s=this.p;this.p=this.q,this.q=s}var o=this.p.subtract(O.ONE),h=this.q.subtract(O.ONE),a=o.multiply(h);if(0==a.gcd(n).compareTo(O.ONE)){this.n=this.p.multiply(this.q),this.d=n.modInverse(a),this.dmp1=this.d.mod(o),this.dmq1=this.d.mod(h),this.coeff=this.q.modInverse(this.p);break}}},t.prototype.dect=function(t){var e=q(t,16),i=this.doPrivate(e);return null==i?null:function(t,e){var i=t.toByteArray(),r=0;for(;r<i.length&&0==i[r];)++r;if(i.length-r!=e-1||2!=i[r])return null;++r;for(;0!=i[r];)if(++r>=i.length)return null;var n="";for(;++r<i.length;){var s=255&i[r];s<128?n+=String.fromCharCode(s):191<s&&s<224?(n+=String.fromCharCode((31&s)<<6|63&i[r+1]),++r):(n+=String.fromCharCode((15&s)<<12|(63&i[r+1])<<6|63&i[r+2]),r+=2)}return n}(i,this.n.bitLength()+7>>3)},t.prototype.generateAsync=function(t,e,n){var s=new X,o=t>>1;this.e=parseInt(e,16);var h=new O(e,16),a=this,u=function(){var e=function(){if(a.p.compareTo(a.q)<=0){var t=a.p;a.p=a.q,a.q=t}var e=a.p.subtract(O.ONE),i=a.q.subtract(O.ONE),r=e.multiply(i);0==r.gcd(h).compareTo(O.ONE)?(a.n=a.p.multiply(a.q),a.d=h.modInverse(r),a.dmp1=a.d.mod(e),a.dmq1=a.d.mod(i),a.coeff=a.q.modInverse(a.p),setTimeout(function(){n()},0)):setTimeout(u,0)},i=function(){a.q=M(),a.q.fromNumberAsync(o,1,s,function(){a.q.subtract(O.ONE).gcda(h,function(t){0==t.compareTo(O.ONE)&&a.q.isProbablePrime(10)?setTimeout(e,0):setTimeout(i,0)})})},r=function(){a.p=M(),a.p.fromNumberAsync(t-o,1,s,function(){a.p.subtract(O.ONE).gcda(h,function(t){0==t.compareTo(O.ONE)&&a.p.isProbablePrime(10)?setTimeout(i,0):setTimeout(r,0)})})};setTimeout(r,0)};setTimeout(u,0)},t.prototype.sign=function(t,e,i){var r=function(t,e){if(e<t.length+22)return console.error("Message too long for RSA"),null;for(var i=e-t.length-6,r="",n=0;n<i;n+=2)r+="ff";return q("0001"+r+"00"+t,16)}((W[i]||"")+e(t).toString(),this.n.bitLength()/4);if(null==r)return null;var n=this.doPrivate(r);if(null==n)return null;var s=n.toString(16);return 0==(1&s.length)?s:"0"+s},t.prototype.verify=function(t,e,i){var r=q(e,16),n=this.doPublic(r);return null==n?null:function(t){for(var e in W)if(W.hasOwnProperty(e)){var i=W[e],r=i.length;if(t.substr(0,r)==i)return t.substr(r)}return t}(n.toString(16).replace(/^1f+00/,""))==i(t).toString()},t}();var W={md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",ripemd160:"3021300906052b2403020105000414"};var tt={};tt.lang={extend:function(t,e,i){if(!e||!t)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var r=function(){};if(r.prototype=e.prototype,t.prototype=new r,(t.prototype.constructor=t).superclass=e.prototype,e.prototype.constructor==Object.prototype.constructor&&(e.prototype.constructor=e),i){var n;for(n in i)t.prototype[n]=i[n];var s=function(){},o=["toString","valueOf"];try{/MSIE/.test(navigator.userAgent)&&(s=function(t,e){for(n=0;n<o.length;n+=1){var i=o[n],r=e[i];"function"==typeof r&&r!=Object.prototype[i]&&(t[i]=r)}})}catch(t){}s(t.prototype,i)}}};var et={};void 0!==et.asn1&&et.asn1||(et.asn1={}),et.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var e=t.toString(16);return e.length%2==1&&(e="0"+e),e},this.bigIntToMinTwosComplementsHex=function(t){var e=t.toString(16);if("-"!=e.substr(0,1))e.length%2==1?e="0"+e:e.match(/^[0-7]/)||(e="00"+e);else{var i=e.substr(1).length;i%2==1?i+=1:e.match(/^[0-7]/)||(i+=2);for(var r="",n=0;n<i;n++)r+="f";e=new O(r,16).xor(t).add(O.ONE).toString(16).replace(/^-/,"")}return e},this.getPEMStringFromHex=function(t,e){return hextopem(t,e)},this.newObject=function(t){var e=et.asn1,i=e.DERBoolean,r=e.DERInteger,n=e.DERBitString,s=e.DEROctetString,o=e.DERNull,h=e.DERObjectIdentifier,a=e.DEREnumerated,u=e.DERUTF8String,c=e.DERNumericString,f=e.DERPrintableString,l=e.DERTeletexString,p=e.DERIA5String,g=e.DERUTCTime,d=e.DERGeneralizedTime,v=e.DERSequence,m=e.DERSet,y=e.DERTaggedObject,b=e.ASN1Util.newObject,T=Object.keys(t);if(1!=T.length)throw"key of param shall be only one.";var S=T[0];if(-1==":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":"+S+":"))throw"undefined key: "+S;if("bool"==S)return new i(t[S]);if("int"==S)return new r(t[S]);if("bitstr"==S)return new n(t[S]);if("octstr"==S)return new s(t[S]);if("null"==S)return new o(t[S]);if("oid"==S)return new h(t[S]);if("enum"==S)return new a(t[S]);if("utf8str"==S)return new u(t[S]);if("numstr"==S)return new c(t[S]);if("prnstr"==S)return new f(t[S]);if("telstr"==S)return new l(t[S]);if("ia5str"==S)return new p(t[S]);if("utctime"==S)return new g(t[S]);if("gentime"==S)return new d(t[S]);if("seq"==S){for(var E=t[S],w=[],D=0;D<E.length;D++){var x=b(E[D]);w.push(x)}return new v({array:w})}if("set"==S){for(E=t[S],w=[],D=0;D<E.length;D++){x=b(E[D]);w.push(x)}return new m({array:w})}if("tag"==S){var R=t[S];if("[object Array]"===Object.prototype.toString.call(R)&&3==R.length){var B=b(R[2]);return new y({tag:R[0],explicit:R[1],obj:B})}var A={};if(void 0!==R.explicit&&(A.explicit=R.explicit),void 0!==R.tag&&(A.tag=R.tag),void 0===R.obj)throw"obj shall be specified for 'tag'.";return A.obj=b(R.obj),new y(A)}},this.jsonToASN1HEX=function(t){return this.newObject(t).getEncodedHex()}},et.asn1.ASN1Util.oidHexToInt=function(t){for(var e="",i=parseInt(t.substr(0,2),16),r=(e=Math.floor(i/40)+"."+i%40,""),n=2;n<t.length;n+=2){var s=("00000000"+parseInt(t.substr(n,2),16).toString(2)).slice(-8);if(r+=s.substr(1,7),"0"==s.substr(0,1))e=e+"."+new O(r,2).toString(10),r=""}return e},et.asn1.ASN1Util.oidIntToHex=function(t){var h=function(t){var e=t.toString(16);return 1==e.length&&(e="0"+e),e},e=function(t){var e="",i=new O(t,10).toString(2),r=7-i.length%7;7==r&&(r=0);for(var n="",s=0;s<r;s++)n+="0";i=n+i;for(s=0;s<i.length-1;s+=7){var o=i.substr(s,7);s!=i.length-7&&(o="1"+o),e+=h(parseInt(o,2))}return e};if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var i="",r=t.split("."),n=40*parseInt(r[0])+parseInt(r[1]);i+=h(n),r.splice(0,2);for(var s=0;s<r.length;s++)i+=e(r[s]);return i},et.asn1.ASN1Object=function(){this.getLengthHexFromValue=function(){if(void 0===this.hV||null==this.hV)throw"this.hV is null or undefined.";if(this.hV.length%2==1)throw"value hex must be even length: n="+"".length+",v="+this.hV;var t=this.hV.length/2,e=t.toString(16);if(e.length%2==1&&(e="0"+e),t<128)return e;var i=e.length/2;if(15<i)throw"ASN.1 length too long to represent by 8x: n = "+t.toString(16);return(128+i).toString(16)+e},this.getEncodedHex=function(){return(null==this.hTLV||this.isModified)&&(this.hV=this.getFreshValueHex(),this.hL=this.getLengthHexFromValue(),this.hTLV=this.hT+this.hL+this.hV,this.isModified=!1),this.hTLV},this.getValueHex=function(){return this.getEncodedHex(),this.hV},this.getFreshValueHex=function(){return""}},et.asn1.DERAbstractString=function(t){et.asn1.DERAbstractString.superclass.constructor.call(this),this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(this.s)},this.setStringHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?this.setString(t):void 0!==t.str?this.setString(t.str):void 0!==t.hex&&this.setStringHex(t.hex))},tt.lang.extend(et.asn1.DERAbstractString,et.asn1.ASN1Object),et.asn1.DERAbstractTime=function(t){et.asn1.DERAbstractTime.superclass.constructor.call(this),this.localDateToUTC=function(t){return utc=t.getTime()+6e4*t.getTimezoneOffset(),new Date(utc)},this.formatDate=function(t,e,i){var r=this.zeroPadding,n=this.localDateToUTC(t),s=String(n.getFullYear());"utc"==e&&(s=s.substr(2,2));var o=s+r(String(n.getMonth()+1),2)+r(String(n.getDate()),2)+r(String(n.getHours()),2)+r(String(n.getMinutes()),2)+r(String(n.getSeconds()),2);if(!0===i){var h=n.getMilliseconds();if(0!=h){var a=r(String(h),3);o=o+"."+(a=a.replace(/[0]+$/,""))}}return o+"Z"},this.zeroPadding=function(t,e){return t.length>=e?t:new Array(e-t.length+1).join("0")+t},this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(t)},this.setByDateValue=function(t,e,i,r,n,s){var o=new Date(Date.UTC(t,e-1,i,r,n,s,0));this.setByDate(o)},this.getFreshValueHex=function(){return this.hV}},tt.lang.extend(et.asn1.DERAbstractTime,et.asn1.ASN1Object),et.asn1.DERAbstractStructured=function(t){et.asn1.DERAbstractString.superclass.constructor.call(this),this.setByASN1ObjectArray=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array=t},this.appendASN1Object=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array.push(t)},this.asn1Array=new Array,void 0!==t&&void 0!==t.array&&(this.asn1Array=t.array)},tt.lang.extend(et.asn1.DERAbstractStructured,et.asn1.ASN1Object),et.asn1.DERBoolean=function(){et.asn1.DERBoolean.superclass.constructor.call(this),this.hT="01",this.hTLV="0101ff"},tt.lang.extend(et.asn1.DERBoolean,et.asn1.ASN1Object),et.asn1.DERInteger=function(t){et.asn1.DERInteger.superclass.constructor.call(this),this.hT="02",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new O(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.bigint?this.setByBigInteger(t.bigint):void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},tt.lang.extend(et.asn1.DERInteger,et.asn1.ASN1Object),et.asn1.DERBitString=function(t){if(void 0!==t&&void 0!==t.obj){var e=et.asn1.ASN1Util.newObject(t.obj);t.hex="00"+e.getEncodedHex()}et.asn1.DERBitString.superclass.constructor.call(this),this.hT="03",this.setHexValueIncludingUnusedBits=function(t){this.hTLV=null,this.isModified=!0,this.hV=t},this.setUnusedBitsAndHexValue=function(t,e){if(t<0||7<t)throw"unused bits shall be from 0 to 7: u = "+t;var i="0"+t;this.hTLV=null,this.isModified=!0,this.hV=i+e},this.setByBinaryString=function(t){var e=8-(t=t.replace(/0+$/,"")).length%8;8==e&&(e=0);for(var i=0;i<=e;i++)t+="0";var r="";for(i=0;i<t.length-1;i+=8){var n=t.substr(i,8),s=parseInt(n,2).toString(16);1==s.length&&(s="0"+s),r+=s}this.hTLV=null,this.isModified=!0,this.hV="0"+e+r},this.setByBooleanArray=function(t){for(var e="",i=0;i<t.length;i++)1==t[i]?e+="1":e+="0";this.setByBinaryString(e)},this.newFalseArray=function(t){for(var e=new Array(t),i=0;i<t;i++)e[i]=!1;return e},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t&&t.toLowerCase().match(/^[0-9a-f]+$/)?this.setHexValueIncludingUnusedBits(t):void 0!==t.hex?this.setHexValueIncludingUnusedBits(t.hex):void 0!==t.bin?this.setByBinaryString(t.bin):void 0!==t.array&&this.setByBooleanArray(t.array))},tt.lang.extend(et.asn1.DERBitString,et.asn1.ASN1Object),et.asn1.DEROctetString=function(t){if(void 0!==t&&void 0!==t.obj){var e=et.asn1.ASN1Util.newObject(t.obj);t.hex=e.getEncodedHex()}et.asn1.DEROctetString.superclass.constructor.call(this,t),this.hT="04"},tt.lang.extend(et.asn1.DEROctetString,et.asn1.DERAbstractString),et.asn1.DERNull=function(){et.asn1.DERNull.superclass.constructor.call(this),this.hT="05",this.hTLV="0500"},tt.lang.extend(et.asn1.DERNull,et.asn1.ASN1Object),et.asn1.DERObjectIdentifier=function(t){var h=function(t){var e=t.toString(16);return 1==e.length&&(e="0"+e),e},s=function(t){var e="",i=new O(t,10).toString(2),r=7-i.length%7;7==r&&(r=0);for(var n="",s=0;s<r;s++)n+="0";i=n+i;for(s=0;s<i.length-1;s+=7){var o=i.substr(s,7);s!=i.length-7&&(o="1"+o),e+=h(parseInt(o,2))}return e};et.asn1.DERObjectIdentifier.superclass.constructor.call(this),this.hT="06",this.setValueHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.setValueOidString=function(t){if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var e="",i=t.split("."),r=40*parseInt(i[0])+parseInt(i[1]);e+=h(r),i.splice(0,2);for(var n=0;n<i.length;n++)e+=s(i[n]);this.hTLV=null,this.isModified=!0,this.s=null,this.hV=e},this.setValueName=function(t){var e=et.asn1.x509.OID.name2oid(t);if(""===e)throw"DERObjectIdentifier oidName undefined: "+t;this.setValueOidString(e)},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?t.match(/^[0-2].[0-9.]+$/)?this.setValueOidString(t):this.setValueName(t):void 0!==t.oid?this.setValueOidString(t.oid):void 0!==t.hex?this.setValueHex(t.hex):void 0!==t.name&&this.setValueName(t.name))},tt.lang.extend(et.asn1.DERObjectIdentifier,et.asn1.ASN1Object),et.asn1.DEREnumerated=function(t){et.asn1.DEREnumerated.superclass.constructor.call(this),this.hT="0a",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new O(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},tt.lang.extend(et.asn1.DEREnumerated,et.asn1.ASN1Object),et.asn1.DERUTF8String=function(t){et.asn1.DERUTF8String.superclass.constructor.call(this,t),this.hT="0c"},tt.lang.extend(et.asn1.DERUTF8String,et.asn1.DERAbstractString),et.asn1.DERNumericString=function(t){et.asn1.DERNumericString.superclass.constructor.call(this,t),this.hT="12"},tt.lang.extend(et.asn1.DERNumericString,et.asn1.DERAbstractString),et.asn1.DERPrintableString=function(t){et.asn1.DERPrintableString.superclass.constructor.call(this,t),this.hT="13"},tt.lang.extend(et.asn1.DERPrintableString,et.asn1.DERAbstractString),et.asn1.DERTeletexString=function(t){et.asn1.DERTeletexString.superclass.constructor.call(this,t),this.hT="14"},tt.lang.extend(et.asn1.DERTeletexString,et.asn1.DERAbstractString),et.asn1.DERIA5String=function(t){et.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="16"},tt.lang.extend(et.asn1.DERIA5String,et.asn1.DERAbstractString),et.asn1.DERUTCTime=function(t){et.asn1.DERUTCTime.superclass.constructor.call(this,t),this.hT="17",this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{12}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date))},tt.lang.extend(et.asn1.DERUTCTime,et.asn1.DERAbstractTime),et.asn1.DERGeneralizedTime=function(t){et.asn1.DERGeneralizedTime.superclass.constructor.call(this,t),this.hT="18",this.withMillis=!1,this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{14}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date),!0===t.millis&&(this.withMillis=!0))},tt.lang.extend(et.asn1.DERGeneralizedTime,et.asn1.DERAbstractTime),et.asn1.DERSequence=function(t){et.asn1.DERSequence.superclass.constructor.call(this,t),this.hT="30",this.getFreshValueHex=function(){for(var t="",e=0;e<this.asn1Array.length;e++){t+=this.asn1Array[e].getEncodedHex()}return this.hV=t,this.hV}},tt.lang.extend(et.asn1.DERSequence,et.asn1.DERAbstractStructured),et.asn1.DERSet=function(t){et.asn1.DERSet.superclass.constructor.call(this,t),this.hT="31",this.sortFlag=!0,this.getFreshValueHex=function(){for(var t=new Array,e=0;e<this.asn1Array.length;e++){var i=this.asn1Array[e];t.push(i.getEncodedHex())}return 1==this.sortFlag&&t.sort(),this.hV=t.join(""),this.hV},void 0!==t&&void 0!==t.sortflag&&0==t.sortflag&&(this.sortFlag=!1)},tt.lang.extend(et.asn1.DERSet,et.asn1.DERAbstractStructured),et.asn1.DERTaggedObject=function(t){et.asn1.DERTaggedObject.superclass.constructor.call(this),this.hT="a0",this.hV="",this.isExplicit=!0,this.asn1Object=null,this.setASN1Object=function(t,e,i){this.hT=e,this.isExplicit=t,this.asn1Object=i,this.isExplicit?(this.hV=this.asn1Object.getEncodedHex(),this.hTLV=null,this.isModified=!0):(this.hV=null,this.hTLV=i.getEncodedHex(),this.hTLV=this.hTLV.replace(/^../,e),this.isModified=!1)},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.tag&&(this.hT=t.tag),void 0!==t.explicit&&(this.isExplicit=t.explicit),void 0!==t.obj&&(this.asn1Object=t.obj,this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)))},tt.lang.extend(et.asn1.DERTaggedObject,et.asn1.ASN1Object);var it=function(i){function r(t){var e=i.call(this)||this;return t&&("string"==typeof t?e.parseKey(t):(r.hasPrivateKeyProperty(t)||r.hasPublicKeyProperty(t))&&e.parsePropertiesFrom(t)),e}return function(t,e){function i(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}(r,i),r.prototype.parseKey=function(t){try{var e=0,i=0,r=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t)?d(t):v.unarmor(t),n=x.decode(r);if(3===n.sub.length&&(n=n.sub[2].sub[0]),9===n.sub.length){e=n.sub[1].getHexStringValue(),this.n=q(e,16),i=n.sub[2].getHexStringValue(),this.e=parseInt(i,16);var s=n.sub[3].getHexStringValue();this.d=q(s,16);var o=n.sub[4].getHexStringValue();this.p=q(o,16);var h=n.sub[5].getHexStringValue();this.q=q(h,16);var a=n.sub[6].getHexStringValue();this.dmp1=q(a,16);var u=n.sub[7].getHexStringValue();this.dmq1=q(u,16);var c=n.sub[8].getHexStringValue();this.coeff=q(c,16)}else{if(2!==n.sub.length)return!1;var f=n.sub[1].sub[0];e=f.sub[0].getHexStringValue(),this.n=q(e,16),i=f.sub[1].getHexStringValue(),this.e=parseInt(i,16)}return!0}catch(t){return!1}},r.prototype.gprbk=function(){var t={array:[new et.asn1.DERInteger({int:0}),new et.asn1.DERInteger({bigint:this.n}),new et.asn1.DERInteger({int:this.e}),new et.asn1.DERInteger({bigint:this.d}),new et.asn1.DERInteger({bigint:this.p}),new et.asn1.DERInteger({bigint:this.q}),new et.asn1.DERInteger({bigint:this.dmp1}),new et.asn1.DERInteger({bigint:this.dmq1}),new et.asn1.DERInteger({bigint:this.coeff})]};return new et.asn1.DERSequence(t).getEncodedHex()},r.prototype.gprbkB64=function(){return c(this.gprbk())},r.prototype.gpubk=function(){var t=new et.asn1.DERSequence({array:[new et.asn1.DERObjectIdentifier({oid:"1.2.840.113549.1.1.1"}),new et.asn1.DERNull]}),e=new et.asn1.DERSequence({array:[new et.asn1.DERInteger({bigint:this.n}),new et.asn1.DERInteger({int:this.e})]}),i=new et.asn1.DERBitString({hex:"00"+e.getEncodedHex()});return new et.asn1.DERSequence({array:[t,i]}).getEncodedHex()},r.prototype.gpubkB64=function(){return c(this.gpubk())},r.wordwrap=function(t,e){if(!t)return t;var i="(.{1,"+(e=e||64)+"})( +|$\n?)|(.{1,"+e+"})";return t.match(RegExp(i,"g")).join("\n")},r.prototype.gprk=function(){var t="-----BEGIN RSA PRIVATE KEY-----\n";return t+=r.wordwrap(this.gprbkB64())+"\n",t+="-----END RSA PRIVATE KEY-----"},r.prototype.gpuk=function(){var t="-----BEGIN PUBLIC KEY-----\n";return t+=r.wordwrap(this.gpubkB64())+"\n",t+="-----END PUBLIC KEY-----"},r.hasPublicKeyProperty=function(t){return(t=t||{}).hasOwnProperty("n")&&t.hasOwnProperty("e")},r.hasPrivateKeyProperty=function(t){return(t=t||{}).hasOwnProperty("n")&&t.hasOwnProperty("e")&&t.hasOwnProperty("d")&&t.hasOwnProperty("p")&&t.hasOwnProperty("q")&&t.hasOwnProperty("dmp1")&&t.hasOwnProperty("dmq1")&&t.hasOwnProperty("coeff")},r.prototype.parsePropertiesFrom=function(t){this.n=t.n,this.e=t.e,t.hasOwnProperty("d")&&(this.d=t.d,this.p=t.p,this.q=t.q,this.dmp1=t.dmp1,this.dmq1=t.dmq1,this.coeff=t.coeff)},r}(Q),rt=function(){function t(t){t=t||{},this.default_key_size=parseInt(t.default_key_size,10)||1024,this.default_public_exponent=t.default_public_exponent||"010001",this.log=t.log||!1,this.key=null}return t.prototype.setKey=function(t){this.log&&this.key&&console.warn("A key was already set, overriding existing."),this.key=new it(t)},t.prototype.sprk=function(t){this.setKey(t)},t.prototype.spuk=function(t){this.setKey(t)},t.prototype.dect=function(t){try{return this.getKey().dect(f(t))}catch(t){return!1}},t.prototype.enct=function(t){try{return c(this.getKey().enct(t))}catch(t){return!1}},t.prototype.sign=function(t,e,i){try{return c(this.getKey().sign(t,e,i))}catch(t){return!1}},t.prototype.verify=function(t,e,i){try{return this.getKey().verify(t,f(e),i)}catch(t){return!1}},t.prototype.getKey=function(t){if(!this.key){if(this.key=new it,t&&"[object Function]"==={}.toString.call(t))return void this.key.generateAsync(this.default_key_size,this.default_public_exponent,t);this.key.generate(this.default_key_size,this.default_public_exponent)}return this.key},t.prototype.gprk=function(){return this.getKey().gprk()},t.prototype.gprkB64=function(){return this.getKey().gprbkB64()},t.prototype.gpuk=function(){return this.getKey().gpuk()},t.prototype.gpukB64=function(){return this.getKey().gpubkB64()},t.version="3.0.0-rc.1",t}();window.LE=rt,t.LE=rt,t.default=rt,Object.defineProperty(t,"__esModule",{value:!0})});

	//获得md5 -- start
	function safeAdd (x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRotateLeft (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5cmn (q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff (a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  function md5gg (a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  function md5hh (a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii (a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMD5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[((len + 64) >>> 9 << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMD5 (s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHMACMD5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUTF8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMD5 (s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  function hexMD5 (s) {
    return rstr2hex(rawMD5(s))
  }
  function rawHMACMD5 (k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  function hexHMACMD5 (k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return md5
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
	licence.test = function (callback, jsUrl) {
		// appjs = jsUrl;
		// init_callback = callback;
	// getLic(valLic);
	callback();
	}
	return licence;
};


/***/ })
/******/ ]);
export default hydra;