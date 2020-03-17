<template>
  <div id="map" style="width:100%;height:100%;"></div>
</template>

<script>
import cityMap from '../../../static/showMap/citymap.js'
//import chinaData from '../../../static/showMap/china.json'
import chinaData from '../../../static/showMap/city/652800.json'
// import '../../../static/showMap/'
export default {
  name: 'ShowMap',
  data () {
    return {
      provinces : {
        //23个省
        "台湾": "taiwan",
        "河北": "hebei",
        "山西": "shanxi",
        "辽宁": "liaoning",
        "吉林": "jilin",
        "黑龙江": "heilongjiang",
        "江苏": "jiangsu",
        "浙江": "zhejiang",
        "安徽": "anhui",
        "福建": "fujian",
        "江西": "jiangxi",
        "山东": "shandong",
        "河南": "henan",
        "湖北": "hubei",
        "湖南": "hunan",
        "广东": "guangdong",
        "海南": "hainan",
        "四川": "sichuan",
        "贵州": "guizhou",
        "云南": "yunnan",
        "陕西": "shanxi1",
        "甘肃": "gansu",
        "青海": "qinghai",
        //5个自治区
        "新疆": "xinjiang",
        "广西": "guangxi",
        "内蒙古": "neimenggu",
        "宁夏": "ningxia",
        "西藏": "xizang",
        //4个直辖市
        "北京": "beijing",
        "天津": "tianjin",
        "上海": "shanghai",
        "重庆": "chongqing",
        //2个特别行政区
        "香港": "xianggang",
        "澳门": "aomen"
      },
      name: '',
      data: [],
      myChart: null,
      chartData: []
    }
  },
  created () {
    console.log(cityMap)
  },
  methods: {
    init () {
      this.myChart = this.$echarts.init(document.getElementById('map'));
      // myChart.on('click', function () {
      //   console.log(i,j,k);
      // })

      //直辖市和特别行政区-只有二级地图，没有三级地图
      var special = ["北京","天津","上海","重庆","香港","澳门"];
      var mapdata = [];
      //绘制全国地图
      
      //var d = [];
      this.chartData = [];
      for( var i=0;i<chinaData.features.length;i++ ){
        this.chartData.push({
          name:chinaData.features[i].properties.name
        })
      }
      mapdata = this.chartData;
      //注册地图
      this.$echarts.registerMap('bz',chinaData);
      //绘制地图
      this.renderMap('bz',this.chartData);

      var me = this;
      this.myChart.on('click', function (params) {
        console.log( params );
        if( params.name in me.provinces ){
          //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          me.$axios.get('/static/showMap/province/'+me.provinces[params.name]+'.json').then((res)=> {
            me.$echarts.registerMap( params.name, res.data);
            me.data = res.data;
            //var d = [];
            this.chartData = [];
            for( var i = 0;i < me.data.features.length;i++ ){
              this.chartData.push({
                name:me.data.features[i].properties.name
              })
            }
            me.renderMap(params.name,this.chartData);
          },(err)=> {
            console.log(err);
          })
        }else if( params.seriesName in me.provinces ){
          //如果是【直辖市/特别行政区】只有二级下钻
          if(  special.indexOf( params.seriesName ) >=0  ){
            me.renderMap('bz',mapdata);
          }else{
            //显示县级地图
            me.$axios.get('/static/showMap/city/'+cityMap[params.name]+'.json').then((res)=> {
            me.$echarts.registerMap( params.name, res.data);
            me.data = res.data;
            //d = [];
            this.chartData = [];
            for( var i=0;i<me.data.features.length;i++ ){
              this.chartData.push({
                name:me.data.features[i].properties.name
              })
            }
              console.log(this.chartData);
              me.renderMap(params.name,this.chartData);
            },(err)=> {
              console.log(err);
            })
          } 
        }else{
          me.renderMap('bz',mapdata);
        }
      });
      // let option = this.buildOption(this.chinaData);
      // myChart.setOption(option);
      window.addEventListener('resize',()=>{
        this.myChart.resize();
      })
    },
    buildOption (data) {
      var opt = {
        // backgroundColor: '#000',
        backgroundColor: 'rgba(0,0,0,0)',
        title : {
          //text: 'Echarts3 中国地图下钻至县级',
          //subtext: '三级下钻',
          //link:'http://www.ldsun.com',
          left: 'center',
          textStyle:{
            color: '#fff',
            fontSize:16,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
          },
          subtextStyle:{
            color: '#ccc',
            fontSize:13,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          },
          iconStyle:{
            normal:{
              color:'#fff'
            }
          }
        },
        series: data,
        animationDuration:1000,
        animationEasing:'cubicOut',
        animationDurationUpdate:1000 
      };
      console.log(opt.series);
      return opt
      // return {
      //   // backgroundColor: '#000',
      //   backgroundColor: 'rgba(0,0,0,0)',
      //   title : {
      //     //text: 'Echarts3 中国地图下钻至县级',
      //     //subtext: '三级下钻',
      //     //link:'http://www.ldsun.com',
      //     left: 'center',
      //     textStyle:{
      //       color: '#fff',
      //       fontSize:16,
      //       fontWeight:'normal',
      //       fontFamily:"Microsoft YaHei"
      //     },
      //     subtextStyle:{
      //       color: '#ccc',
      //       fontSize:13,
      //       fontWeight:'normal',
      //       fontFamily:"Microsoft YaHei"
      //     }
      //   },
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{b}'
      //   },
      //   toolbox: {
      //     show: true,
      //     orient: 'vertical',
      //     left: 'right',
      //     top: 'center',
      //     feature: {
      //       dataView: {readOnly: false},
      //       restore: {},
      //       saveAsImage: {}
      //     },
      //     iconStyle:{
      //       normal:{
      //         color:'#fff'
      //       }
      //     }
      //   },
      //   series: data,
      //   animationDuration:1000,
      //   animationEasing:'cubicOut',
      //   animationDurationUpdate:1000     
      // }
    },
    renderMap (map,data) {
      console.log(map,data)
      //this.buildOption.option.title.subtext = map;
      //this.buildOption.option.series = [ 
      var opt = {
          // backgroundColor: '#000',
        backgroundColor: 'rgba(0,0,0,0)',
        title : {
          //text: 'Echarts3 中国地图下钻至县级',
          //subtext: '三级下钻',
          //link:'http://www.ldsun.com',
          left: 'center',
          textStyle:{
            color: '#fff',
            fontSize:16,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
          },
          subtextStyle:{
            color: '#ccc',
            fontSize:13,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          },
          iconStyle:{
            normal:{
              color:'#fff'
            }
          }
        },
        geo: {
          layoutCenter: ['30%', '1%'],
          layoutSize: 100
        },
        series: [
          {
            name: map,
            type: 'map',
            mapType: map,
            roam: false,
            nameMap:{
              'bz':map
            },
            label: {
              normal:{
                show:true,
                textStyle:{
                  //color:'#999',
                  color:'#71bdff',
                  fontSize:13
                }  
              },
              emphasis: {
                show: true,
                textStyle:{
                  color:'#fff',
                  fontSize:13
                }
              }
            },
            itemStyle: {
              normal: {
                //areaColor: '#323c48',
                areaColor: '#132d70',
                borderColor: 'dodgerblue'
              },
              emphasis: {
                areaColor: 'darkorange'
              }
            },
            data:data
          }
        ],
        animationDuration:1000,
        animationEasing:'cubicOut',
        animationDurationUpdate:1000
      }
      // var series = [
      //   {
      //     name: map,
      //     type: 'map',
      //     mapType: map,
      //     roam: false,
      //     nameMap:{
      //       'china':map
      //     },
      //     label: {
      //       normal:{
      //         show:true,
      //         textStyle:{
      //           color:'#999',
      //           fontSize:13
      //         }  
      //       },
      //       emphasis: {
      //         show: true,
      //         textStyle:{
      //           color:'#fff',
      //           fontSize:13
      //         }
      //       }
      //     },
      //     itemStyle: {
      //       normal: {
      //         //areaColor: '#323c48',
      //         areaColor: '#132d70',
      //         borderColor: 'dodgerblue'
      //       },
      //       emphasis: {
      //         areaColor: 'darkorange'
      //       }
      //     },
      //     data:data
      //   } 
      // ];
      //var opt = this.buildOption(series);
      //return opt;
      //渲染地图
      //console.log(this.chartData);
      //document.getElementById('map').innnerHTML='';
      //var myChart = this.$echarts.init(document.getElementById('map'));
      // myChart.setOption(this.buildOption(series));
      this.myChart.setOption(opt);
    }
  },
  mounted(){
    //this.init();
  }
}
</script>

<style scoped>
  
</style>