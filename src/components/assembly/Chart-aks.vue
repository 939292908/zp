<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime: 2019-08-29 09:41:10
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div :id="ed.chartID"></div>
</template>

<script>
export default {
  name: 'Chart',
	// props : ['ed'],
	props : {
		ed:{
			type:Object,
		},
		color: {
			type: String,
			default:'#3aa8fb'
		},
		totalColor:{
			type:String,
			default:'#DFE1E3'
		}
	},
  data () {
    return {
    	
    }
  },
  methods : {
  	init (){
  		let myChart = this.$echarts.init(document.getElementById(this.ed.chartID));
  		if (['Pie','PieCicle','Radar'].indexOf(this.ed.chartType) != -1) {
  			this.ed.chartData.forEach(ele=>ele.value = Number(ele.value));
  		}
			let option = this.buildOption();
			myChart.setOption(option);
			window.addEventListener('resize',()=>{
        		myChart.resize();
			})
  	},
  	getValByName(name){
  		return this.ed.chartData.filter(ele=>ele.name == name)[0].value;
  	},
  	buildOption(){
  		switch(this.ed.chartType){
  			case 'Pie' :
  				return this.buildPieData();
  				break;
  			case 'PieCicle' :
					return this.buildPieCicleData();
  				break;
  			case 'Bar' :
  				return this.buildBarData();
					break;
				case 'RowBar' :
					return this.buildRowBarData();
					break;
  			case 'Radar' :
  				return this.buildRadarData();
  				break;	
  			case 'Line' :
  				return this.buildLineData();
  				break;	
  		}
  	},
  	buildPieData(){

  		let colors = [
    		{
					from : 'rgba(65, 173, 255, 1)',
					to : 'rgba(65, 173, 255, 0.5)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				},{
					from : 'rgba(156, 38, 152, 0.5)',
					to : 'rgba(156, 38, 152, 1)'
				}
			];
  		let legendData = [], itemData = [], me = this;
  		for (var i = 0; i < this.ed.chartData.length; i++) {
  			legendData[i] = {
  				name : this.ed.chartData[i].name,
  				value : this.ed.chartData[i].value,
					icon : this.ed.iconPath + this.ed.chartData[i].TYPE + '.png'
				};
  			itemData[i] = {
					value: this.ed.chartData[i].value, 
					name: this.ed.chartData[i].name ,
					itemStyle : {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0, color: colors[i].from
							}, {
								offset: 1, color: colors[i].to
							}],
							globalCoord: false
						}
					},
				};
  		}
  		var total = this.ed.chartData.map(ele=>ele.value).reduce((a, b) => a + b);
  		 return {
				legend: {
					orient: 'vertical',
					align : 'top',
					itemGap :10,
					itemWidth : 20,
					itemHeight :15,
					padding: 0,
					left: '2%',
					top:'15%',
					textStyle : {
						color : '#3aa8fb',
						fontSize: 12
					},
					data: legendData,
					formatter : function (name) {
				    return '\n\n\n'+name + me.getValByName(name) + '人';
					}
				},
				series: [
					{
						type:'pie',
						radius: [0, '45%'],
						center: ['65%', '50%'],
						hoverAnimation: false,
						label: {
							position: 'inner',
							padding: [-70, 0, 0, 0],
							textBorderColor  : 'transparent',
							formatter :['{title|总量}','{c}'].join('\n'),
							fontSize :20,
							rich : {
				        title: {
				            color: '#3aa8fb',
				            fontSize :12,
				            height: 40
				        }
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						itemStyle : {
							color: {
							  type: 'linear',
							  x: 0,
							  y: 0,
							  x2: 1,
							  y2: 0.5,
							  colorStops: [{
							      offset: 0, color: '#2344a0'
							  }, {
							      offset: 1, color: '#1a3685'
							  }],
							  globalCoord: false
							},
							borderWidth : 0
						},
						data:[
							{value: total, name:'总量'}
						]
					},
					{
						type:'pie',
						hoverAnimation: false,
						radius: ['45%', '70%'],
						center: ['65%', '50%'],
						label: {
							show: false
						},
						data: itemData
					}
				]
			};
		},
		// 左2，右1，右2
  	buildPieCicleData(r){
			var _this = this;
  		var colors = ['#0068b7', '#00ffff', '#ec6941', '#f6b37f', '#57a72f','#842cad', '#f29c9f', '#b10c3e', '#8e7332'];
  		var legendData = [], itemData = [], me = this;
  		for (var i = 0; i < this.ed.chartData.length; i++) {
  			legendData[i] = {
  				name : this.ed.chartData[i].name,
					icon : 'circle'
			  };
			  // console.log(this.ed.chartData[i].personCount,210210);
  			itemData[i] = {
					//value: this.ed.chartID == 'family' ? this.ed.chartData[i].value+this.ed.chartData[i].personCount : this.ed.chartData[i].value, 
					value: this.ed.chartData[i].value, 
					name: this.ed.chartData[i].name,
					itemStyle : {

					},
				};
		  }
		  var total = this.ed.chartData.map(ele=>ele.value).reduce((a, b) => a + b);
  		 return {
			   color : colors,
			   tooltip : {
				   trigger: 'item',
				   formatter: '{a} <br/>{b}: {c} ({d}%)'
			   },
				legend: {
					type : 'scroll',
					orient: 'vertical',
					//right: '1%',
					//right: -50,
					right: window.screen.width <= 1366 ? 45 : '25%',
					top : '10%',
					itemGap : 15,
					data: legendData,
					formatter : function (name) {
						var arr = [
								'{a|'+ name +'}',
								'{b|'+ me.getValByName(name) +'}',
						]
						return arr.join('')
				    // return name + ' ' + me.getValByName(name);
					},
					textStyle : {
						// color : this.color,						
						rich:{
							a:{
								color:this.color,
								padding:[0,15,0,0],
								fontSize: 15
							},
							b:{
								color:this.totalColor,
								fontSize: 15
							}
						}
					}
				},
				series: [
					{
						name:'百分比',
						type:'pie',
						hoverAnimation: false,
						radius: ['50%', '51%'],
						center: ['20%', '50%'],
						label: {
							position: 'inner',
							padding: [-90, 0, 0, 0],
							textBorderColor  : 'transparent',
							formatter :['{title|总量}','{total|{c}}'].join('\n'),
							fontSize :20,
							rich : {
				        title: {
			            color: this.color,
			            fontSize :20,
			            height: 25
								},
								total: {
									color: this.totalColor,
									fontSize :20,
								}
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						itemStyle : {
							color : '#5483ef'
						},
						data:[
							{value: total, name:'总量'}
						]
					},
					{
						// name:'人口统计详细',
						name:'百分比',
						type:'pie',
						legendHoverLink : false,
						hoverAnimation: false,
						radius: ['60%', '70%'],
						center: ['20%', '50%'],
						startAngle : 200,
						label: {
							show: false
						},
						itemStyle : {
							borderWidth : 40
						},
						data: itemData
					}
				]
			};
  	},
  	buildBarData(){
  		var colors = [
    		{
	  			from : 'rgba(63,166,246,1)',
	  			to : 'rgba(63,166,246,0)'
	  		},{
	  			from : 'rgba(19,217,220,1)',
	  			to : 'rgba(19,217,220,0)'
	  		},{
	        from : 'rgba(181,52,180,1)',
	        to : 'rgba(181,52,180,0)'
		    },{
        	from : 'rgba(223,111,78,1)',
	        to : 'rgba(223,111,78,0)'
		    }
  		]
  		var item = [], value = [];
  		for (var i = 0; i < this.ed.data.length; i++) {
  			item[i] = this.ed.data[i].name;
  			value[i] = {
							value : this.ed.data[i].value,
							itemStyle : {
								color: {
							    type: 'linear',
							    x: 0,
							    y: 0,
							    x2: 0,
							    y2: 1,
							    colorStops: [{
							        offset: 0, color: colors[i].from
							    }, {
							        offset: 1, color: colors[i].to
							    }],
							    globalCoord: false
								}
							}
						}
  		}
  		return {
				xAxis: {
					type: 'category',
					axisLine : {
				  	lineStyle : {
				  		color : '#4289ce'
				  	}
				  },
				  axisTick : {
				  	show : false
				  },
					data: item
				},
				yAxis: {
					type: 'value',
				  axisLine : {
				  	show : false
				  },
				  axisLabel : {
				  	color : '#4289ce'
				  },
				  axisTick : {
				  	show : false
				  },
				  splitLine : {
				  	lineStyle : {
				  		color : '#3c7bb6',
				  		type : 'dashed'
				  	}
				  }
				},
				series: [{
					data: value,
					type: 'bar',
					barMaxWidth : 36,
					label : {
						show : true,
						position : 'top',
						color : this.color
					},
					itemStyle : {

					}
				}]
			};
  	},
  	buildRadarData(){
  		var value = this.ed.chartData.map(ele=>ele.value)
			return {
				tooltip: {},
				radar: {
					// shape: 'circle',
					splitNumber: 5,
					radius :'65%',
					center : ['45%', '47%'],
					name: {
						textStyle: {
							color: '#2c77b9',
							fontSize: 15
						},
					},
					axisLine : {
						lineStyle : {
							color : 'rgb(25, 56, 100)'
						}
					},
					splitLine : {
						lineStyle : {
							color : 'rgb(16, 42, 81)'
						}
					},
					splitArea : {
						show: true,
						areaStyle : {
							color : ['rgba(44, 119, 186, 0.5)', 'rgba(44, 119, 186, 0.4)', 'rgba(44, 119, 186, 0.3)', 'rgba(44, 119, 186, 0.2)', 'rgba(44, 119, 186, 0.1)']
						}
					},
					indicator: this.ed.chartData
				},
				series: [{
					name: '场所统计',
					type: 'radar',
					symbolSize : 4,
					label : {
						distance :10
					},
					lineStyle : {
						opacity : 0
					},
					areaStyle: {
						color : 'rgba(225, 42, 193, 0.3)'
					},
					data : [
						{
							value : value
						}
					]
				}]
			};
  	},
  	buildLineData(){
  		var item = [], value = [];
  		for (var i = 0; i < this.ed.data.length; i++) {
  			item[i] = this.ed.data[i].name;
  			value[i] = this.ed.data[i].value;
  		}
			return {
				color: '#4289ce',
				xAxis: {
				  type: 'category',
				  boundaryGap: false,
				  axisLine : {
				  	lineStyle : {
				  		color : '#4289ce'
				  	}
				  },
				  axisTick : {
				  	show : false
				  },
				  data: item
				},
				yAxis: {
				  type: 'value',
				  axisLine : {
				  	show : false
				  },
				  axisLabel : {
				  	color : '#4289ce'
				  },
				  axisTick : {
				  	show : false
				  },
				  nameGap: 30,
				  splitLine : {
				  	lineStyle : {
				  		color : '#3c7bb6',
				  		type : 'dashed'
				  	}
				  }
				},
				series: [{
					name : '电话统计',
					smooth: true,
					symbolSize : 8,
				  data: value,
				  type: 'line',
				  lineStyle : {
				  	color : '#46aefe',
				  	width : 3
				  },
				  areaStyle: {
				  	color: {
						    type: 'linear',
						    x: 0,
						    y: 0,
						    x2: 0,
						    y2: 1,
						    colorStops: [{
						        offset: 0, color: 'rgba(99,187,255,1)'
						    }, {
						        offset: 1, color: 'rgba(99,187,255,0)'
						    }],
						    globalCoord: false
						} 
				  }
				}]
			};
		},
		buildRowBarData() {
			var item = [], value = [];
			var chartData = this.ed.chartData;
  		for (var i = 0; i < chartData.length; i++) {
  			item[i] = chartData[i].name;
  			value[i] = chartData[i].value;
  		}
			var option = {
        title: {
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["2011年", "2012年"]
        },
        grid: {
          left: "1%",
          right: "8%",
          top: "10%",
          bottom: "1%",
          containLabel: true
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          inverse: true,
          type: "category",
          data: item, //接口返回数据
          axisLabel: {
            interval: 0,
            fontSize: 15
          },
          splitArea: {
            //柱条背景
            //show:true,
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            silent: true,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#ef6c77",
                    "#f9d467",
                    "#a7fa91",
                    "#34baff",
                    "#ff903f",
                    "#f482fe",
                    "#fe846c",
                    "#6cefb0",
                    "#1980d8",
                    "#ef6c77",
                    "#f9d467",
                    "#a7fa91",
                    "#34baff",
                    "#ff903f",
                    "#f482fe",
                    "#fe846c",
                    "#6cefb0",
                    "#1980d8",
                    "#ef6c77",
                    "#f9d467",
                    "#a7fa91",
                    "#34baff",
                    "#ff903f",
                    "#f482fe",
                    "#fe846c",
                    "#6cefb0",
                    "#1980d8",
                    "#ef6c77",
                    "#f9d467",
                    "#a7fa91",
                    "#34baff",
                    "#ff903f",
                    "#f482fe",
                    "#fe846c",
                    "#6cefb0",
                    "#1980d8",
                    "#ef6c77",
                    "#f9d467",
                    "#a7fa91",
                    "#34baff",
                    "#ff903f",
                    "#f482fe",
                    "#fe846c",
                    "#6cefb0",
                    "#1980d8"
                  ];
                  return colorList[params.dataIndex];
                },
                barBorderRadius: 4,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 4
              }
            },
            label: {
              normal: {
                show: true,
                position: "right"
              }
            },
            data: value //接口返回数据
          }
        ],
        textStyle: {
          //显示文字的样式
          color: "#2c78bb"
        }
			};
			return option;
		}
  }
}
</script>

<style scoped>

</style>
