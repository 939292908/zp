<template>
  <div class="inforModal">
    <div class="inforModal-sidebar">
      <div class="sidebar-top"></div>
      <div class="close-btn" @click="closeTrackMap"></div>
      <div class="sidebar-bottom"></div>
    </div>
    <div class="cont-box">
      <div class="grid-box">
        <div class="head-left"></div>
        <div class="title">
          <span>轨迹地图</span>
          <span @click="closeTrackMap"><i class="iconfont close icon-guanbi1"></i></span>
        </div>
        <div class="infor-details">
          <div id="map">
            <!-- <div class="mapBox">
              <img src="../../static/images/map.png" />
            </div> -->
            <div class="tab_wrap tab_gjfbxx">
              <div class="map" id="map_box">
                <div  id="allmap" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0px;"></div>
              </div>
              
            </div>

            <!-- <div class="row" style="">
              <div class="MapPlayBar-progress-wrap">
                <div class="MapPlayBar-progress-inner">
                  <div class="MapPlayBar-progress-bar" id="MapPlayBarBrogress">
                  </div>
                </div>
              </div>
              <div class="ctr_progress">
                <span style="position: relative;top:0;" class="play-speed">播放速度:<input class="progress_time" type="text" id="BFJG" :value="value" v-show="show"></span>
                <span class="change-speed" @click="changeSpeed">
                  <span>慢</span>
                  <span class="checked">中</span>
                  <span>快</span>
                </span>
                <span class="progress_stop" id="map_play" onclick="javascript:play()"/></span>
              </div>
            </div>
            <div class="MapPlayBar-progress-text" id="MapPlayBarMsg">
            </div> -->
          </div>
        </div>
      </div>
    </div>
   <!--  <remote-script src='../../../static/map/BAIDU/js/TextIconOverlay_min.js'></remote-script> 
    <remote-script src='../../../static/map/BAIDU/js/MarkerClusterer_min.js'></remote-script> 
    <remote-script src='../../../static/map/BAIDU/js/BD_main.js'></remote-script> -->
  </div>
</template>

<script>
 import '../../../static/map/BAIDU/bmap.css'
export default {
  name: 'TrackMap',
  props: ['modal'], 
  data () {
    return {
      allData: this.modal,
      //path : this.$config.path,
      // RQLX: '',
      // SFZHM: '',
      // dtpz:"",
      // show: false,
      // value: 1
    }
  },
  created(){
    
  },
  methods : {
    closeTrackMap () {
      this.$emit('closeTrackMap', false);
    },
    init () {
      var dtpz = this.allData.mrpz;
      var data = this.allData;
      var obj = JSON.stringify(dtpz); 
      obj = (new Function("","return "+obj))();   
      intinizMap(obj,data,"V1");
      zhezhao()
    }
  },
  created(){//在html渲染之前调用 
    // this.token = $.parseJSON(sessionStorage.getItem('ssion')).token;
    // this.RQLX = $.parseJSON(sessionStorage.getItem('ssion')).RQLX;
    // this.SFZHM = $.parseJSON(sessionStorage.getItem('ssion')).SFZHM; 
    //this.mapSetting();
  },
  mounted() {//在html渲染之后调用 
    //this.getMapData();  
    //this.init();
  }
}
</script>

<style lang="less" scoped>/* 218 */
  .inforModal{
    width:535px;
    padding-left: 8px;
    position:absolute;
    right:0;
    top:68px;
    bottom:6px;
    z-index: 999;
    .inforModal-sidebar{
      width: 17px;
      position:absolute;
      top: 0;
      bottom: 0;
      left: -9px;
      .sidebar-top{
        position: absolute;
        width: 9px;
        height: 20.8%; 
        //height: 246px;
        top: 44px;
        right: 0;
        background: url('../../../static/images/sidebar-top.png') 0 0 no-repeat;
         background-size: 100% 100%; 
      }
      .sidebar-bottom{
        position: absolute;
        width: 9px;
        height: 24.5%; 
        // height: 246px;
        bottom: 0;
        right: 0;
        background: url('../../../static/images/sidebar-bottom.png') 0 0 no-repeat;
         background-size: 100% 100%; 
      }
      .close-btn{
        position:absolute;
        top: 28%;
        width: 17px;
        height: 43.7%;
        z-index: 99;
        cursor: pointer;
        background: url('../../../static/images/close-btn.png') 0 0 no-repeat;
        background-size:100% 100%;
      }
    }
    .cont-box{
      width: 100%;
      height: 100%; 
      background:-webkit-linear-gradient(left top,#11296d,#0c1837);
      .grid-box{
        width: 100%;
        height: 100%;
        position:absolute;
        background:url('../../../static/images/grid.png') repeat repeat;
        .head-left{
          width:9px;
          height:44px;
          position:absolute;
          left:-9px;
          top:0;
          background: url('../../../static/images/vertical-line.jpg') repeat-x;
          background-size: 100% 100%;
        }
        .title{
          width: 100%;
          /* height: 47px;
          line-height: 47px; */
          height: 44px;
          line-height: 44px;
          position: relative;
          background: url('../../../static/images/vertical-line.jpg') repeat-x;
          background-size: 100% 100%;
          span:nth-child(1){
            font-size: 16px;
            color: #fff;
            margin-left: 6px;
          }
          span:nth-child(2){
            font-size: 12px;
            color: #fff;
          }
          span:nth-child(3){
            font-size: 14px;
            margin: 0 10px 0 16px;
            color: #5cb9ff;
          }
          span:nth-child(4){
            font-size: 14px;
            color: #5cb9ff;
          }
          .iconfont{
            font-size:20px;
            position:absolute;
            top:1px;
            right:12px;
            color:#fff;
            cursor:pointer;
          }
        }
        .infor-details{
          position:absolute;
          right:8px;
          top:45px;
          bottom:0;
          /* left: 8px; */
          left: 0;
          overflow-y: auto;
          position:absolute;
          border-left: 2px solid #163367;
          #map{
            position:absolute;
            top:0;
            left:0;
            right: 0;
            bottom: 0;
            .change-speed{
              display:inline-block;
              width:122px;
              height:30px;
              border:1px solid #5ab0f8;
              border-radius:30px;
              position:relative;
              top:7px;
              span{
                width:40px;
                height:28px;
                line-height:30px;
                text-align: center;
                display:inline-block;
                float:left;
                cursor: pointer;
                background:#fff;
                color:#5ab0f8;
              }
              span:nth-child(1){
                border-radius:30px 0 0 30px;
              }
              span:nth-child(2){
                
              }
              span:nth-child(3){
                border-radius:0 30px 30px 0;
              }
              .checked{
                background:#5ab0f8;
                color:#fff;
              }
            }
          }
        }
      }
    }
  }
</style>

<style>
 @import '../../../static/map/BAIDU/bmap.css';
</style>

<!-- 在数据的海洋中 -->
