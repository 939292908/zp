<template>
  <!-- 地区区域选择 -->
  <div class="map-overview" v-show="model" :style="{'width':width + 'px','height': height + 'px'}">
    <div class="level">{{title}}
      <i @click="handleClose" class="iconfont icon-guanbi2fill close-panel"></i>
      <i @click="handleFilterDeptList" class="iconfont icon-liebiaoxianshi close-panel"></i>
    </div>
    <div class="same-list" style="width:100%;height:calc( 100% - 35px )">
      <div class="dept-map" id="map" style="width:100%;height:100%;"></div>
    </div>
    <filter-dept
      v-model="showFilterDeptDialog"
      :regions="currentArea"
      :showType="showType"
      @on-ok="handleSelectArea"
      @on-cancel="handleCancelArea"
      @on-item-change="handleChangeArea">
    </filter-dept>
  </div>
</template>
<script>
import * as comApis from '@/api/common.js'
import { areaJoinMixin } from '../mixin/areaJoinMixin'
export default {
  name:"MapOverview",
  components:{
    'filterDept':()=>import('./filterDept'),
  },
  mixins:[areaJoinMixin],
  props:{
    title:{
      type:String,
      default:'地图区域选择'
    },
    items:{
      type:Array,
      default(){
        return [];
      }
    },
    width:{
      type:String,
      default:'380'
    },
    height:{
      type:String,
      default:'350'
    },
    value:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
      locale: this.$config.project.locale,
      list:[],
      model:true,
      showFilterDeptDialog:false,
      mapData:[],
      serieData:[],
      checkAreas:[],
      option:null,   
      currentArea:null,
      showType:null,
      myChart:null
    }
  },
  created(){
		require(`../../../../static/vendors/${this.locale}.js`);  //引入不同地州的地图包
	},
  mounted(){
    this.init();
  },
  methods:{
    init(){
      var me = this;
      this.myChart = this.$echarts.init(document.getElementById('map'));
      this.myChart.on('click', function (params){
        if (params.seriesType === 'map' || params.seriesType === 'scatter') {
          me.showType = 1;
          let cur = me.mapData.filter(x=>{
            return x.qhDeptName.indexOf(params.name) != -1
          })
          me.currentArea = cur.length > 0 ? cur[0] : {};
          // 判断点击的区域是否存在，存在取消选中，不存在则添加选中
          let flag = me.option.geo.regions.some(area=>{
            return area.name == params.name
          })
          if(flag) {
            // me.option.geo.regions = me.option.geo.regions.filter(area=>{
            //   return area.name != params.name
            // })
            me.showFilterDeptDialog = true;
          } else {
            let colorExists = me.option.geo.regions.map(y=>{
              return y.emphasis.itemStyle.areaColor
            })
            let colors = me.colors.filter(key => !colorExists.includes(key))
            let tmpArr = [{
              name: params.name,
              selected: true,
              emphasis:{
                itemStyle: {
                  areaColor: colors.length > 0 ? colors[0]: '#d22330',
                  color: '#4a4b4b'
                },
              }
            }];
            me.option.geo.regions = [
              ...me.option.geo.regions,
              ...tmpArr
            ]
            me.showFilterDeptDialog = true;
          }
          me.myChart.setOption(me.option,true)
        }
      })
      comApis.getCountyLevel(2).then(res=>{
        if(this.$config.project.locale == 'bz'){
          res.data.forEach(x=>{
            x.qhDeptName = x.qhDeptName.replace("县","").replace("市","")
          })
        }        
        me.mapData = res.data;
        var coordinate = {};
        var tmp = [];
        res.data.forEach(x=>{
          coordinate[x.qhDeptCode] = [x.LATITUDE,x.LONGITUDE]
        })
        tmp = res.data.map(x=>{
          return {
            name:x.qhDeptName,
            value:100,
            id:x.qhDeptCode
          }
        })
        var arr = {
          coordinate:coordinate,
          data:tmp
        }
        this.option = this.buildOption(arr);
			  me.myChart.setOption(this.option,true);
      })
    },
    setAreaFill(checkedList){
      let me = this;
      // 首先给添加的数据去重
      let deptPaths = checkedList.map(x=>x.deptPath)
      if(deptPaths.length <= 0) {
        me.option.geo.regions = [];
      } else {
        let areaNames = [];     
        checkedList.forEach(x=>{
          let cur = me.mapData.find(k=>{
            return x.deptPath.indexOf(k.deptPath) != -1
          })          
          if(areaNames.indexOf(cur.qhDeptName) == -1) {
            areaNames.push(cur.qhDeptName)
          }
        })   
        let regions = [];
        areaNames.forEach(x=>{
          let colorExists = regions.map(y=>{
            return y.emphasis.itemStyle.areaColor
          })
          let colors = me.colors.filter(key => !colorExists.includes(key))
          regions.push({
            name: x,
            selected: true,
            emphasis:{
              itemStyle: {
                areaColor: colors.length > 0 ? colors[0]: '#d22330',
                color: '#4a4b4b'
              },
            }
          })
        })
        me.option.geo.regions = regions;
      }
      me.myChart.setOption(me.option,true)
    },
    buildOption(datas){
      let defaultColor = {
        color:'#4a4b4b',
        emphasisColor:'#ffffff',
        areaColor:'#fff',
        emphasisAreaColor:'#2B91B7',
        borderColor:'rgba(70, 144, 209,1)'
      }
      var temp = {
				bottom : '2%',
				top : '1%'
      }
      if(this.$config.project.localSuffix =='-aks') {
        defaultColor = {
          color:'#4a4b4b',
          emphasisColor:'#ffffff',
          areaColor:'#fff',
          emphasisAreaColor:'#2B91B7',
          borderColor:'rgba(70, 144, 209,1)'
        }
      }
      var geoCoordMap = datas.coordinate;  //获取经纬度坐标
      var data = datas.data;
      this.serieData = Object.keys(geoCoordMap).map((x,index)=>{
        return {
          name:x,
          id:x,
          value:100,
          color:this.colors[index]
        }
      })
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].id];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              id:data[i].id,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
			let arr = data.map((x,index)=>{
        return {
          id:x.id,
          name:x.name,
          type: 'scatter',
          geoIndex: 0,
          z: 0,
					coordinateSystem: 'geo',
					data: convertData(data),
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						},
						emphasis: {
							show: true
						}
					},
					itemStyle:{
            normal:{label:{show:true}},
            emphasis:{
              label:{
                show:true
              },
              borderColor:'yellow',
              areaColor: 'red'              
            }
          },
				}
      })
      let mapSerie = [
          {
            type: 'map',
            roam:true,
            zoom:1,
            scaleLimit:{min:1,max:5},
            geoIndex: 0,
            z: 0,
            selectedMode:'multiple',
            coordinateSystem: 'geo',
            data: convertData(this.serieData),
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle:{
              normal:{label:{show:true}},
              emphasis:{
                label:{
                  show:true
                },
                borderColor:'yellow',
                areaColor: 'red'              
              }
            },
          },
        ]
			return {
				color:this.colors,
				geo : {
          show :  true,
          roam: true,
          zoom:1.2,          
          scaleLimit:{min:1,max:20},
          map : this.locale,
          regions: [],
          label:{
            show:true,
            color:defaultColor.color
          },
					itemStyle : {
						areaColor : defaultColor.areaColor,
						borderColor : defaultColor.borderColor
					},
					emphasis : {
						label : {
							show : true,
							color: defaultColor.emphasisColor
						},
						itemStyle : {
							areaColor : defaultColor.emphasisAreaColor,
						}
					}
        },
				series : [
          ...mapSerie,
          // ...arr
        ]
			};
    },
    handleFilterDeptList(){
      this.showType = 2
      this.currentArea = null;
      this.showFilterDeptDialog = true;
    },
    // 选择选中的区域进行图形计算
    handleSelectArea(list){
      let tmp = [...list];
      this.$emit('on-select-areas',tmp)
    },
    handleCancelArea(list){
      let tmp = [...list];
      this.setAreaFill(tmp);
    },
    handleChangeArea(list){
      let tmp = [...list];
      if(this.currentArea){
        tmp.push(this.currentArea);
      }      
      this.setAreaFill(tmp);
    },
    // 点击列表数据的事件
    handleClick(item){
      this.$emit('on-click',item)
    },
    handleClose() {
      this.model = false;
      this.$emit('input',this.model)
      this.$emit('on-close')
    }
  },
  watch:{
    items:{
      handler(val){
        this.list = val
      },
      deep:true,
      immediate:true
    },
    tagsList:{
      handler(val){
      },
      immediate:true
    },
    value:{
      handler(val){
        this.model = val
      },
      immediate:true
    }
  }

}
</script>
<style lang="less" scoped>
.map-overview{
  width: 290px;
  position: absolute;
  top: 25px;
  right: 30px;
  border: 4px solid #4690d1;
  z-index: 1000;
  background: rgba(199, 238, 254,0.9);
  min-height: 200px;
  .level {
    padding-left: 4%;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    border-bottom: 2px solid #7197b1;
    color: #636363;    
    .level-nums{
      color:#4690d1;
    }
    .close-panel {
      float: right;
      margin-right: 10px;
      color: #4690d1;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .same-list{
    padding: 6px;
    cursor: pointer;
    max-height: 300px;
    overflow-y: auto;
    .same-list-item{
      padding: 4px;
      margin-bottom: 8px;
      position: relative;
      span{
        display: block;
        &:first-child{
          font-size: 14px;
        }
        &:last-child{
          color: #818181;
        }
      }
      .tag{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        text-align: center;
        right: 10px;
        top: 13px;
        line-height: 16px;
      }
    }
  }
  .same-list::-webkit-scrollbar{width:6px;height:6px;}
  .same-list::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .same-list::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .same-list::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .same-list::-webkit-scrollbar-corner{background-color:#dadada;}
}
</style>



