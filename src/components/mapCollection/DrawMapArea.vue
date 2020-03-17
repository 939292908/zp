<template>
  <div class='bigDrawMapArea'>
    <div class="content"> 
      <div class="mapContent" id='allMap'>
      </div>
      <div class="drawContent">
        <button @click="drawArea('polygon')">绘制多边形</button>
        <button @click="drawArea('polyline')">绘制折线</button>
        <button  @click="drawArea('marker')">绘制点</button>
      </div>
      
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import mapLists from '../../../static/vendors/baiduMap/mapInit.js'//公共方法
import mapLeft from './components/mapComponent'//地图实例
export default {
  name: 'DrawMapArea',
  components: {
    mapLeft,
  },
  data() {
    //这里存放数据
    return {
      map:null,//初始化地图map数据
      center: {lng: 80.957398, lat: 40.875185},//地图的中心点
      zoom: 9,        //地图缩放等级最小为9只能看到aks地区
      jsonName: '',   //需要请求市的json数据aks/bz
      drawingManager: {},
      legendShow:false,
      drawType: {
        polygon: BMAP_DRAWING_POLYGON,
        polyline: BMAP_DRAWING_POLYLINE,
        marker: BMAP_DRAWING_MARKER,
      }
    };
  },
  mounted() {
    // --初始化绘制工具--
    const me=this;
    me.map=mapLists.initialize('allMap', me.center.lng, me.center.lat, 9);

    me.drawingManager = new BMapLib.DrawingManager(me.map, {
      isOpen: false, //是否开启绘制模式
      enableDrawingTool: false, //是否显示工具栏
      drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_LEFT, //位置
        offset: new BMap.Size(5, 5), //偏离值
        drawingModes: [BMAP_DRAWING_MARKER, BMAP_DRAWING_POLYLINE, BMAP_DRAWING_POLYGON],
        drawingType: [
          BMAP_DRAWING_MARKER,//点
          BMAP_DRAWING_POLYLINE,//折线
          BMAP_DRAWING_POLYGON,//多边形
        ],
      },
      polylineOptions: mapLists.style(), //线的样式
      polygonOptions: mapLists.style('red','blue','1','.8','.2','solid'), //多边形的样式
    });

    // 多边形画完之后的事件
    me.drawingManager.addEventListener('polygoncomplete', me.polygonComplete)
    // marker点画完之后的事件
    me.drawingManager.addEventListener('markercomplete', me.markercomplete)
      

    
  },
  watch: {},
  //方法集合
  methods: {
    getChildCode(){},
    drawArea(type){
      this.drawingManager.setDrawingMode(this.drawType[type]);
      this.openDraw();
      
    },
    // 监听绘制多边形之后事件
    polygonComplete(e){
      var that=this;
      that.closeDraw();//关闭绘制
      //新的多边形覆盖物
      var newE = new BMap.Polygon(e.getPath(), mapLists.style('red','blue','1','.8','.2','dashed'));
      that.map.removeOverlay(e); // 删掉绘制工具绘制的多边形覆盖物
      that.map.addOverlay(newE); // 添加新的多边形覆盖物
      // newE.enableEditing();      //开启编辑边界模式
      newE.name='huang';
      newE.addEventListener('click',function(e){
        console.log(this)
        this.enableEditing(); 
        this.addEventListener('lineupdate',function(e){
          console.log(e.currentTarget.vo)
        })
      })
    },

    // 打开绘制
    openDraw(){
      this.drawingManager.open(); 
    },
    // 关闭绘制
    closeDraw(){
      this.drawingManager.close(); 
    }
  },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.bigDrawMapArea{
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: 100%;
  position: relative;
  .mapContent{
    width: 100%;
    height: 100%;
    flex: auto;
  }
  .drawContent{
    position: absolute;
    left: 0;
    top: 10px;
  }

}
</style>