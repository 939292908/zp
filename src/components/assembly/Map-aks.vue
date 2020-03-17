<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:22:49
 * @LastEditTime: 2019-08-07 09:22:49
 * @LastEditors: your name
 -->
<template>
  <div id="map" style="width:750;height:100%"></div>
</template>

<script>
import aks from '../../../static/vendors/aks.js';
//require(`../../../static/vendors/${locale}.js`);
export default {
	name: 'Map',
	props:{
		color: {
			type: String,
			default:'#3aa8fb'
		},
		areaColor:{
			type:String,
			default:'rgba(19, 46, 115, 0.9)'
		},
		borderColor:{
			type:String,
			default:'rgba(128, 0, 126, 1)'
		}
	},
  data () {
    return {
		locale: this.$config.project.locale,
		//geoCoordMap: this.$config.geoCoordMap
		// pointData: [], //点位数据
		// lineData: [], //连线数据
		// center: [], //目标点坐标
		features: '',
		//targetCoord: '', //目标点坐标
		aksGeoCoordMap: {
			'阿克苏市': ["80.634904", "40.684744"],
      "阿瓦提县": ["80.415861", "40.014391"],
			"拜城县": ["81.466379", "41.999331"],
			"柯坪县": ["79.336459", "40.517359"],
			"乌什县": ["79.249199", "41.120071"],
			"新和县": ["82.297463", "41.336201"],
			"库车县": ["83.406478", "41.874741"],
			"沙雅县": ["82.894191", "40.676439"],
			"温宿县": ["80.1172", "41.6596"],
			"莎车县": ["69.056459", "25.517359"]
    },
    // aksGeoCoordMap: {
    //     阿克苏市: ["80.324904", "41.144744"],
    //     阿瓦提县: ["80.315861", "40.244391"],
    //     拜城县: ["81.666379", "41.990331"],
    //     柯坪县: ["79.056459", "40.517359"],
    //     乌什县: ["79.249199", "41.240071"],
    //     新和县: ["82.167463", "41.346201"],
    //     库车县: ["83.416478", "41.774741"],
    //     沙雅县: ["82.894191", "40.676439"],
    //     温宿县: ["80.1772", "41.5496"],
    //     莎车县: ["69.056459", "25.517359"]
    //   },
		// system: [
		// 	['荒地讲经堂',this.systemData1],
		// 	['阿买合苏木体系',this.systemData2],
		// 	['马木提·艾山体系', this.systemData3],
		// 	['本地宗教传承体系', this.systemData4]
		// ],
		systemType: ['荒地讲经堂','阿买合苏木体系','马木提·艾山体系','本地宗教传承体系'],

		systemData0: [
			// [{name: "莎车县"},{name: "库车县",value: "174"}],
			// [{name: "莎车县"},{name: "新和县",value: "158"}],
			// [{name: "莎车县"},{name: "柯坪县",value: "277"}],
			// // [{name: "莎车县"},{name: "沙依巴克区",value: "277"}],
			// [{name: "莎车县"},{name: "莎车县",value: "1"}],
			// [{name: "莎车县"},{name: "阿克苏市",value: "1303"}],
			// [{name: "莎车县"},{name: "阿瓦提县",value: "95"}]
		],
		systemData1: [
			// [{name: "阿克苏市"},{name: "阿瓦提县",value: "0"}],
			// [{name: "阿克苏市"},{name: "拜城县",value: "0"}],
			// [{name: "皮山县"},{name: "乌鲁木齐市",value: "1"}],
			// [{name: "皮山县"},{name: "新和县",value: "152"}],
			// [{name: "皮山县"},{name: "柯坪县",value: "4"}],
			// [{name: "皮山县"},{name: "沙雅县",value: "108"}],
			// [{name: "皮山县"},{name: "皮山县",value: "1"}],
			// [{name: "皮山县"},{name: "阿克苏市",value: "4"}],
			// [{name: "皮山县"},{name: "阿瓦提县",value: "370"}]
		],
		systemData2: [
			// [{name: "阿克苏市"},{name: "阿瓦提县",value: "1"}],
			// [{name: "阿克苏市"},{name: "拜城县",value: "2"}],
			// [{name: "阿克苏市"},{name: "柯坪县",value: "3"}],
			// [{name: "阿克苏市"},{name: "乌什县",value: "4"}],
			// [{name: "阿克苏市"},{name: "新和县",value: "5"}],
			// [{name: "阿克苏市"},{name: "库车县",value: "6"}],
			// [{name: "阿克苏市"},{name: "沙雅县",value: "7"}],
			// [{name: "阿克苏市"},{name: "温宿县",value: "8"}]

			// [{name: '阿克苏市'},{name: "",value: ""}],
			// [{name: '阿瓦提县'},{name: "",value: ""}],
			// [{name: '拜城县'},{name: "",value: ""}],
			// [{name: '柯坪县'},{name: "",value: ""}],
			// [{name: '乌什县'},{name: "",value: ""}],
			// [{name: '新和县'},{name: "",value: ""}],
			// [{name: '库车县'},{name: "",value: ""}],
			// [{name: '沙雅县'},{name: "",value: ""}],
			// [{name: '温宿县'},{name: "",value: ""}],
			// [{name: "柯坪县"},{name: "柯坪县",value: "0"}],
			// [{name: "柯坪县"},{name: "阿瓦提县",value: "0"}]
		],
		systemData3: [

		],
		aksCityMapSeries: {
      type:'map',
			mapType:this.locale,
			geoIndex:0,
			label: {
				normal: {
					show: true,
					fontSize: 20,
					textStyle: {
						color:'blue'
					}
				},
				emphasis: {
					show: true
				}
			},
			itemStyle: {
				normal: {
					show: true,
					color: 'blue'
				}
			},
			data: [
				{name: "阿克苏市",value: "-1"},
				{name: "阿瓦提县",value: "-2"},
				{name: "拜城县",value: "-3"},
				{name: "柯坪县",value: "-4"},
				{name: "乌什县",value: "-5"},
				{name: "新和县",value: "-6"},
				{name: "库车县",value: "-7"},
				{name: "沙雅县",value: "-8"},
				{name:'温宿县',value:"-9"}
			]
		}
    }
	},
	created(){
		//require(`../../../static/vendors/${this.locale}.js`);  //引入不同地州的地图包
	},
  methods : {
  	init(data){
  		var myChart = this.$echarts.init(document.getElementById('map'));
  		// myChart.on('click', function (params) {
  		// 	console.log(params);
  		// })
		//console.log(data,1414141);
		let option = this.buildOption(data);
		myChart.setOption(option);
		window.addEventListener('resize',()=>{
			myChart.resize();
		})
	  },
	getColor(value) {
		if (value <= 20) {
			return '#00ffff';
		} else if (value <= 40) {
			return '#00ff00';
		} else if (value <= 60) {
			return '#ffff00'
		} else if (value <= 80) {
			return '#ffa500';
		} else if (value <= 100) {
			return '#ff3333';
		} else {
			return '#ddd';
		}
	},
  	buildOption(datas){
			var me = this;
			if(datas){
				me.systemType = datas.name;
				me.systemData0 = datas.system[0];
				me.systemData1 = datas.system[1];
				me.systemData2 = datas.system[2];
			}

			// me.systemData4 = datas.system[3];
			//var geoCoordMap = this.geoCoordMap;
			// var pointData = []; //点位数据
			// var lineData = []; //连线数据
			// var center = []; //目标点坐标
			// var targetCoord; //目标点坐标
			// var geoCoordMap = datas.coordinate;  //获取经纬度坐标



			// var data = datas.data;
			// var arr = [],res,keys=[];
			// for (var i = 0; i < data.length; i++) {
			// 	res = [];
			// 	keys.push(data[i].zplx);

			// 	for (var j = 0; j < data[i].qxarr.length; j++) {
			// 		var geoCoord = geoCoordMap[data[i].qxarr[j].id];
			// 		if (geoCoord) {
			// 			res.push({
			// 				name: data[i].qxarr[j].name,
			// 				//value: data[i].qxarr[j].value
			// 				value: geoCoord.concat(data[i].qxarr[j].value),
			// 			});
			// 		}
			// 	}
			// 	arr.push({
			// 		name: data[i].zplx,
			// 		type: 'scatter',
			// 		coordinateSystem: 'geo',
			// 		data: res,
			// 		// symbolSize: function (val) {
			// 		// 	//return 5;
			// 		// 	var item = 0;
			// 		// 	if (val[2] < 10) {
			// 		// 		item = val[2]*3;
			// 		// 	}else if(val >= 10 && val < 100){
			// 		// 		item  = 10 + val/10;
			// 		// 	}else if(val >= 100 && val < 1000){
			// 		// 		item  = 20 + val/100;
			// 		// 	}else{
			// 		// 		item  = 30 + Number(1000..toString().slice(0,2));
			// 		// 	}
			// 		// 	return item;
			// 		// },
			// 		// label: {
			// 		// 	normal: {
			// 		// 		formatter: '{b}',
			// 		// 		position: 'right',
			// 		// 		show: true
			// 		// 	},
			// 		// 	emphasis: {
			// 		// 		show: true
			// 		// 	}
			// 		// },
			// 		// itemStyle: {

			// 		// }
			// 	})
			// }
			// console.log('keys',keys,arr)
			// var sheight = document.documentElement.clientHeight;
			// var swidth = document.documentElement.clientWidth;
			// console.log(swidth/sheight, 'height/width');
			// var ch = document.documentElement.clientHeight >768;
			// var temp = {
			// 	bottom : ch ? '2%' : '2%',
			// 	top : ch ? '5%' : '5%'
			// }

			// //获取目标点坐标
			// aksMapData.city.forEach(function(item){
			// 	// if (target == item.properties.name) {
			// 	// 	this.targetCoord = item.properties.center;
			// 	// 	return false;
			// 	// }
			// 	targetCoord = item.properties.center;
			// })
			// //匹配点位坐标 和 连线的坐标
			// this.cityData.forEach(function(ele,i){
			// 	aksMapData.city.forEach(function(item,j){
			// 		if (item.properties.name === ele.name) {
			// 			//if (ele.name !== target) {
			// 				//debugger;
			// 				console.log(lineData,182182);
			// 				lineData.push({
			// 					coords: [
			// 						item.properties.center,
			// 						targetCoord
			// 					],
			// 					lineStyle: {
			// 						color: me.getColor(ele.value)
			// 					}
			// 				});
			// 			//}
			// 			pointData.push({
			// 				name: ele.name,
			// 				// value: item.properties.center.concat(ele.name, ele.value)
			// 				value: (ele.name, ele.value)
			// 			});
			// 			return false;
			// 		}
			// 	})
			// })
			//var data = me.aksToData;
			var planePath = 'arrow';
			// var	systemData1 = me.systemData1;
			// var	systemData2 = me.systemData2;
			// var	systemData3 = me.systemData3;
			// var	systemData4 = me.systemData4;
			//var planePath = 'path://M700.4 267.8C700.4 385.9 616.1 502 512 502c-104.1 0-188.4-116.1-188.4-234.2S408 64.1 512 64.1c104.1 0.1 188.4 85.6 188.4 203.7z m-67 269.2L509.5 893.4 390.6 537c-63.4 0-117.6 19.9-161.9 54.6C149.6 653.7 102 763.5 89.9 892.8c-2 21.8-3.1 44.2-3.1 67h850.4c0-233.5-107.9-422.8-303.8-422.8zM448 601.8l64 200.9 64-200.9-64-67-64 67z';
			var convertData = function(data) {
				var res = [];
				for(var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					var fromCoord = me.aksGeoCoordMap[dataItem[0].name];
					var toCoord = me.aksGeoCoordMap[dataItem[1].name];
					if(fromCoord && toCoord) {
						res.push({
							fromName: dataItem[0].name,
							toName: dataItem[1].name,
							coords: [fromCoord,toCoord],
							value: dataItem[1].value
						});
					}
				}
				return res;
			};
			var dataRange={
					x:'-1000 px',
					y:'-1000 px',
			 		splitList:[
						{start:-1,end:-1,label:'阿克苏市',color:'#cfc5de'},
						{start:-2,end:-2,label:'阿瓦提县',color:'#93a8a6'},
						{start:-3,end:-3,label:'拜城县',color:'#8688ba'},
						{start:-4,end:-4,label:'柯坪县',color:'#88a27c'},
						{start:-5,end:-5,label:'乌什县',color:'#c190a8'},
						{start:-6,end:-6,label:'新和县',color:'#a1bab4'},
						{start:-7,end:-7,label:'库车县',color:'#cecd97'},
						{start:-8,end:-8,label:'沙雅县',color:'#bb9391'},
						{start:-9,end:-9,label:'温宿县',color:'#889cae'}

					]
				}
			var color = ['#195bb9','#df005c','#792ac0','#248208'];
			var series = [];
			series.push(this.aksCityMapSeries);
			[[this.systemType[0],this.systemData0],[this.systemType[1],this.systemData1],[this.systemType[2], this.systemData2],[this.systemType[3], this.systemData3]].forEach(function(item, i) {
				series.push({
						name: item[0],
						type: 'lines',
						zlevel: 2,
						effect: {
							show: true,
							period: 6, //箭头指向速度，值越小速度越快
							trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
							//color: 'red',
							// symbol: 'arrow', //箭头图标
							symbol: planePath, //箭头图标
							symbolSize: 8, //图标大小
						},
						lineStyle: {
							normal: {
								color: color[i],
								width: 1, //尾迹线条宽度
								opacity: 1, //尾迹线条透明度
								curveness: .3 //尾迹线条曲直度
							}
						},
						//data: convertData(item[1]),
					}, {
						name: item[0],
						type: 'effectScatter',
						coordinateSystem: 'geo',
						zlevel: 2,
						rippleEffect: { //涟漪特效
							period: 4, //动画时间，值越小速度越快
							brushType: 'stroke', //波纹绘制方式 stroke, fill
							scale: 3 //波纹圆环最大限制，值越大波纹越大
						},
						label: {
							normal: {
								// show: true,
								// position: 'right', //显示位置
								// offset: [5, 0], //偏移设置
								// formatter: function(params){//圆环显示文字
								// 	return params.data.name;
								// },
								// fontSize: 20
							},
							emphasis: {
								// show: true,
					 			// color: "#f60"
							}
						},
						symbol: 'circle',
						symbolSize: function(val) {

							// return val[2]/10; //圆环大小
              var dataRageValue=val[2].split(',')[0];
              var circleSize=10;
              if (dataRageValue == 0 && val[2].split(",")[1] == 0) {
                return 0;
              }
              if (dataRageValue <= 50) return circleSize;

              var i = parseInt(dataRageValue / 100);
              circleSize = 10 + i * 2;
              if (circleSize >= 40) circleSize = 40;
              return circleSize;
              // return 50
						},
						itemStyle: {
							normal: {
								show: true,
								color: color[i],
                fontSize: 20,
                // opacity:0.3
							}
						},
						data: item[1].map(function(dataItem) {
							var dataRageValue=dataItem[1].value.split(',')[0];
							dataRange.splitList.push({
								start:dataRageValue,end:dataRageValue,label:dataItem[1].name,color:color[i]
								}
              );
							return {
								name: dataItem[1].name,
								value: me.aksGeoCoordMap[dataItem[1].name].concat([dataItem[1].value])
							};
						})

					},
					//被攻击点
					// {
					// 	type: 'scatter',
					// 	coordinateSystem: 'geo',
					// 	zlevel: 2,
					// 	rippleEffect: {
					// 		period: 4,
					// 		brushType: 'stroke',
					// 		scale: 4
					// 	},
					// 	label: {
					// 		normal: {
					// 			show: true,
					// 			position: 'right',
					// 			//offset:[5, 0],
					// 			color: '#0f0',
					// 			formatter: '{b}',
					// 			textStyle: {
					// 				color: "#0f0"
					// 			}
					// 		},
					// 		emphasis: {
					// 			show: true,
					// 			color: "#f60"
					// 		}
					// 	},
					// 	symbol: 'pin',
					// 	symbolSize: 50,
					// 	data: [{
					// 		name: item[0],
					// 		value: me.aksGeoCoordMap[item[0]].concat([10]),
					// 	}],
					// }
				);
			});
			return {
				//series : arr
				tooltip: {
					trigger: 'item',
					// backgroundColor: 'rgba(255, 255, 255, 0)',
					// borderColor: '#FFFFCC',
					// showDelay: 0,
					// hideDelay: 0,
					// enterable: true,
					// transitionDuration: 0,
					// extraCssText: 'z-index:100',
					formatter: function(params, ticket, callback) {
						//console.log(params,11111);
						//根据业务自己拓展要显示的内容
						// var res = "";
						// var name = params.name;
						// var value = params.value[params.seriesIndex + 1];
						// res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
						// return res;

						// var tempStr = params.data.value[2];
						// var tempArr = tempStr.split(',');
						// var a = tempArr[0];
						// var b = tempArr[1];

						if(params.seriesType == 'effectScatter'){
							var showValue=params.data.value[2].split(',');
							// console.log(showValue);
							// console.log(showValue[0]);
							// console.log(showValue[1]);
							// return "传承脉络: " +params.data.name+"" +params.data.value[2];
							return params.data.name+"<br />弟子总人数：" +(showValue[0] || "")+"<br />"+'亲传弟子：'+ (showValue[1] || "");
							//return params.data.name+"" +a+"<br />"+'亲传弟子：'+b;
						}else if(params.seriesType == "lines"){
							return params.data.fromName+"->" +params.data.toName+"<br />" +params.data.value;
						}else{
							return params.name;
						}
					}
				},
				dataRange:dataRange,
				// dataRange: {
				// 	X: 'left',
				// 	y: 'center',
				// 	splitList: [
				// 		{start: 300, color: '#F7BB37'},
				// 		{start: 200,end: 300, color: '#F7BB37'},
				// 		{start: 100,end: 200, color: '#F7BB37'},
				// 		{start: 50,end: 100, color: '#F7BB37'},
				// 		{start: 0,end: 50, color: '#F7BB37'},
				// 	],
				// 	color:['#f35000','#f39800','#9977e4','#284b83','#2ec8ca']
				// },
				// selectedMode: false,

				//backgroundColor:"#fff",
				// visualMap: { //图例值控制
				// 	min: 0,
				// 	max: 1,
				// 	calculable: true,
				// 	show: true,
				// 	color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
				// 	textStyle: {
				// 		color: '#fff'
				// 	}
				// },


				// data: [
				// 	{name: '阿克苏市',value: 46},
				// 	{name: '拜城县',value: 200},
				// 	{name: '阿瓦提县',value: 5},
				// 	{name: '拜城县',value: 15},
				// 	{name: '柯坪县',value: 267},
				// 	{name: '乌什县',value: 56},
				// 	{name: '新和县',value: 189},
				// 	{name: '库车县',value: 8},
				// 	{name: '沙雅县',value: 89},
				// 	{name: '温宿县',value: 0}
				// ],
				legend: {
					orient: 'vertical',
					top: "top",
					left: "left",
					data: this.systemType,
					textStyle: {
						color: '#000',
						fontSize: 15  //左上角文字大小
					},
					selectedMode: 'multiple'
				},
				geo: { 
					map: this.locale,
					zoom: 1.2,
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true,
              color: '#fff'
						}
					},
          roam: true, //是否允许缩放
          zoom: 1,
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 0.1
          },
					itemStyle: {
						normal: {
							// color: 'rgba(51, 69, 89, .5)', //地图背景色
							// borderColor: '#516a89', //省市边界线00fcff 516a89
							// borderWidth: 1
							// areaColor: 'rgba(0,24,110,0.3)',  //地图背景色
							areaColor: 'rgba(51, 69, 89, .5)',  //地图背景色
							borderColor: 'rgba(139,0,139,1)', //省市边界线
							borderWidth: 0.5
						},
						emphasis: {
							//color: 'rgba(37, 43, 61, .5)' //悬浮背景
							areaColor: '#2B91B7'
						}
					},
					// data: [
					// 	{name: '阿克苏市', selected: false, value: 46},
					// 	{name: '拜城县', selected: false, value: 200},
					// 	{name: '阿瓦提县', selected: false, value: 5},
					// 	{name: '拜城县', selected: false, value: 15},
					// 	{name: '柯坪县', selected: false, value: 267},
					// 	{name: '乌什县', selected: false, value: 56},
					// 	{name: '新和县', selected: false, value: 189},
					// 	{name: '库车县', selected: false, value: 8},
					// 	{name: '沙雅县', selected: false, value: 89},
					// 	{name: '温宿县', selected: false, value: 0}
					// ],

				},
				series: series,
				dataRange:dataRange
				// dataRange:{
				// 	x:'-1000 px',
				// 	y:'-1000 px',
			 	// 	splitList:[
				// 		{start:-1,end:-1,label:'阿克苏市',color:'#cfc5de'},
				// 		{start:-2,end:-2,label:'阿瓦提县',color:'#f1ebd1'},
				// 		{start:-3,end:-3,label:'拜城县',color:'#feffdb'},
				// 		{start:-4,end:-4,label:'柯坪县',color:'#e0cee4'},
				// 		{start:-5,end:-5,label:'乌什县',color:'#fde8cd'},
				// 		{start:-6,end:-6,label:'新和县',color:'#e4f1d7'},
				// 		{start:-7,end:-7,label:'库车县',color:'#fffed7'},
				// 		{start:-8,end:-8,label:'沙雅县',color:'#dccee7'},
				// 		{start:358,end:358,label:'柯坪县',color:'red'},
				// 		{start:74,end:74,label:'阿瓦提县',color:'red'}
				// 	]
				// }
			};
  	},
  },
  mounted(){

  	// this.init();
  }
}
</script>

<style scoped>
</style>

