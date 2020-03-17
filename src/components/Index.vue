<template>
  <div class="index" @click="handleWrapperClick($event)">
    <div class="itap">
      <span class="name">{{this.$config.project.name}}</span>
      <span class="version" v-if="$config.project.version">{{this.$config.project.version}}</span>
    </div>

    <!-- 右上角个人 消息 应用切换 -->
    <switchView ref="switchView" v-on:viewIndex="getViewIndex"></switchView>
    <switchRightView ref="switchRightView" :items="statusList"></switchRightView>

    <!-- 背景边框 -->
    <div class="top-border"></div>
    <div class="right-border"></div>
    <div class="bottom-border"></div>
    <div class="left-border"></div>
    <!-- 背景方块 -->
    <span class="block top-block"></span>
    <span class="block right-block"></span>
    <span class="block bottom-block"></span>
    <span class="block left-block"></span>

    <!-- 四个边角 -->
    <span class="edge top-edge"></span>
    <span class="edge right-edge"></span>
    <span class="edge bottom-edge"></span>
    <span class="edge left-edge"></span>

    <div class="charts-box">
      <!-- 图表左边部分 -->
      <div class="charts charts-box-left">
        <div class="charts-box">
          <div class="charts-type">
            <div class="nav">
              <p class="charts-title">
                <span class="title-name">{{this.$config.mapType.ZJJD}}</span>
              </p>
              <div class="title">
                <i class="separate-icon"></i>
              </div>
            </div>
            <div class="charts-area">
              <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_ZONGJIAOJIDUAN_ID) ">{{ constantNoAuthData }}</div>
              <charts class="charts-ele" ref="zongjiao" :ed="zongjiao">
              </charts>
            </div>
          </div>
          <div class="charts-type">
            <div class="nav">
              <p class="charts-title">
                <span class="title-name">{{this.$config.mapType.AJGX}}</span>
              </p>
              <div class="title">
                <i class="separate-icon"></i>
                <div class="rel-drop">
                </div>
              </div>
            </div>
            <div class="charts-area">
              <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_SHEANRENYUANANJIAN_ID)">{{ constantNoAuthData }}</div>
              <charts class="charts-ele" ref="anjian" :ed="anjian">
              </charts>
            </div>
          </div>
          <div class="charts-type">
            <div class="nav">
              <p class="charts-title">
                <span class="title-name">{{this.$config.mapType.SHGX}}</span>
              </p>
              <div class="title">
                <i class="separate-icon"></i>
              </div>
            </div>
            <div class="page-box">
              <Page :total="society.allData.length" :page-size="14" :current="society.currentPage" @on-change="getPageIndex"/>
            </div>
            <div class="charts-area">
              <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_SHEANRENYUANSHEHUI_ID)">{{ constantNoAuthData }}</div>
              <charts class="charts-ele" ref="society" :ed="society"></charts>
            </div>
          </div>
        </div>
      </div>
      <!-- 图表中间部分 -->
      <div class="charts charts-box-center">
        <loading :mask-closable=false color="white" v-model="loaderMapShow"></loading>
        <div class="search-wrapper" v-if="this.$config.homeConfig.showSearch">
          <div class="box">
            <div class="search-box">
              <div class="selected-dept">
                <Dropdown 
                  trigger="custom" 
                  placement="bottom-end" 
                  @on-clickoutside="isShowDropdown = false"
                  :visible="isShowDropdown" >
                  <a href="javascript:void(0)" 
                    @click="isShowDropdown = !isShowDropdown" 
                    :title="unitListData.filterDataLength">
                    {{ unitListData.filterDataLength != '' ? unitListData.filterDataLength : '选取单位' }}
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <Tree :data="unitListData.filterCondition" :multiple="false" :show-checkbox="false" :check-strictly="true" @on-select-change="getGraphData" @on-toggle-expand="getData"></Tree>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <i-button class="search-default" @click="toRelationPage">搜索</i-button>
              <div class="input">
                <input type="text" placeholder="请输入查询关键字"  v-model="filterKeyword" @keyup.enter="toRelationPage"/>
              </div>
            </div>
          </div>
        </div>
        <div class="selected" v-if="!this.$config.homeConfig.showSearch">
          <Dropdown trigger="click">
            <a href="javascript:void(0)">
              <span style="width:80px;">
                {{ unitListData.filterDataLength != '' ? unitListData.filterDataLength : '请选取单位' }}
              </span>
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <Tree :data="unitListData.filterCondition" :multiple="false" :show-checkbox="false" :check-strictly="true" @on-select-change="getGraphData" @on-toggle-expand="getData"></Tree>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="map">
          <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_MAPDADIAN_ID)">{{ constantNoAuthData }}</div>
          <chartsMap class="charts-map" ref="map"></chartsMap>
        </div>
        <div class="record">
          <div class="title">
            <span class="title-name">{{this.$config.mapType.HJRK }}</span>
          </div>
          <div class="border-top"></div>
          <div class="border-left"></div>
          <div class="cont-box">
            <div class="record-top"></div>
            <div class="record-right"></div>
            <div class="record-bottom"></div>
            <div class="record-left"></div>
            <div class="cont">
              <div class="box">
                <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_HUJIRENKOU_ID)">{{ constantNoAuthData }}</div>
                <!-- 柱状图 -->
                <div id="bar" style="height:100%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 图表右边部分 -->
      <div class="charts charts-box-right">
        <div class="charts-box">
          <div class="charts-type">
            <div class="nav">
              <p class="charts-title">
                <span class="title-name">{{this.$config.mapType.SWGW}}</span>
              </p>
              <div class="title">
                <i class="separate-icon"></i>
              </div>
            </div>
            <div class="charts-area">
              <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_SHEWENGAOWEI_ID)">{{ constantNoAuthData }}</div>
              <charts class="charts-ele" ref="highrisk" :ed="highrisk"></charts>
            </div>
          </div>
          <div class="charts-type">
            <div class="nav">
              <p class="charts-title">
                <span class="title-name">{{this.$config.mapType.SCRY}}</span>
              </p>
              <div class="title">
                <i class="separate-icon"></i>
              </div>
            </div>
            <div class="page-box">
              <Page :total="HajjData.RowBarData.length" :page-size="12" :current="HajjData.currentPage" @on-change="getPageRbd"/>
            </div>
            <div class="charts-area">
              <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_CHAOJINGRENYUAN_ID) ">{{ constantNoAuthData}}</div>
              <div id="rowBar" style="height:100%"></div>
            </div>
          </div>
          <div class="charts-type">
            <div class="nav">
              <p class="charts-title">
                <span class="title-name">{{this.$config.mapType.CRJ}}</span>
              </p>
              <div class="title">
                <i class="separate-icon"></i>
              </div>
            </div>
            <div class="charts-area">
              <div class="no-auth" v-if="!hasFunAuth(constantFunMap.FUN_Index_CHUREJING_ID)">{{ constantNoAuthData }}</div>
              <charts class="charts-ele" ref="border" :ed="border"></charts>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import charts from '@/components/assembly/Chart'
import chartsMap from '@/components/assembly/Map'
import switchView from '@/components/assembly/SwitchView'
import switchRightView from '@/components/assembly/SwitchRightView'
import * as commonApi from '@/api/common.js'
import * as apis from '@/api/home.js'
import Loading from '@/components/assembly/Loading'
export default {
  name: 'Index',
  components: { charts, chartsMap, switchView, switchRightView, Loading},
  data () {
    return {
      isShowDropdown:false,
      statusList:{
        myNavModalShow:false,
        uploadImg:false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        messageDetailsShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        feedbackShow: false,
      },
      onlinecount:'',
      loaderMapShow: false,
      msgType: '',
      token: '',
      path: this.$config.joinPath,
      keyword : '',
      chart: '',
      myChart: '',
      myChart2: [],
      myChartLine: [],
      lineYear: [],
      barData: [],
      barDataVal: [],
      HajjData: {
        rbd: [],
        rbdv: [],
        RowBarData: [],
        RowBarDataVal: [],
        currentPage : 1,
        pageSize:12
      },
      record: '',
      unitListData : {
        filterDataLength: '',
        filterCondition: [],
        dwmc: ''
      },
      dateHJRK: [],
      dateAJGX: [],
      dateSHGX: [],
      dateSWGW: [],
      dateSCRY: [],
      dateCRJ: [],
      dateZJJD: [],
      filterKeyword:"",
      uploadList:[]
    }
  },
  computed:{
    family() {
      return {
        chartData : [],
        chartType : 'PieCicle',
        chartID : 'family',
        //zplx : '户籍人口家谱图',
        // zplx : this.$config.mapType.HJRK,
        zplx : 1,
        functionCode:this.constantFunMap.FUN_Index_HUJIRENKOU_ID
      }
    },
    society() {
      return {
        allData : [],
        chartData : [],
        chartType : 'Radar',
        chartID : 'society',
        //zplx : '涉案人员社会关系图',
        // zplx : this.$config.mapType.SHGX,
        zplx : 5,
        currentPage : 1,
        pageSize:12,
        functionCode:this.constantFunMap.FUN_Index_SHEANRENYUANSHEHUI_ID
      }
    },
    highrisk() {
      return {
        chartData : [],
        chartType : 'PieCicle',
        chartID : 'highrisk',
        // zplx : '涉稳高危人员家谱图',
        // zplx : this.$config.mapType.SWGW,
        zplx : 2,
        functionCode:this.constantFunMap.FUN_Index_SHEWENGAOWEI_ID
      }
    },
    border() {
      return  {
        chartData : [],
        chartType : 'PieCicle',
        chartID : 'border',
        // zplx : '出入境人员关系图',
        // zplx : this.$config.mapType.CRJ,
        zplx : 3,
        functionCode:this.constantFunMap.FUN_Index_CHUREJING_ID
      }
    },
    zongjiao() {
      return {
        chartData : [],
        chartType : 'PieCicle',
        chartID : 'zongjiao',
        // zplx : '宗教极端思想历史传承图',
        // zplx : this.$config.mapType.ZJJD,
        zplx : 6,
        functionCode:this.constantFunMap.FUN_Index_ZONGJIAOJIDUAN_ID
      }
    },
    sichao() {
      return {
        chartData : [],
        chartType : 'PieCicle',
        chartID : 'sichao',
        // zplx : '私朝人员关系图',
        // zplx : this.$config.mapType.SCRY,
        zplx : 7,
        functionCode:this.constantFunMap.FUN_Index_CHAOJINGRENYUAN_ID
      }
    },
    anjian() {
      return {
        chartData : [],
        chartType : 'PieCicle',
        chartID : 'anjian',
        // zplx : '涉案人员案件关系图',
        // zplx : this.$config.mapType.AJGX,
        zplx : 4,
        functionCode:this.constantFunMap.FUN_Index_SHEANRENYUANANJIAN_ID
      }
    },
  },
  mounted(){
    var me = this;
    this.getInitData();
    if(this.hasFunAuth(this.constantFunMap.FUN_Index_MAPDADIAN_ID)) this.getMapData();
  },
  created() {
    this.getFilterCondition();
  },
  methods : {

    getInitData(){
      if(this.hasFunAuth(this.constantFunMap.FUN_Index_HUJIRENKOU_ID)) this.getBarData();
      if(this.hasFunAuth(this.constantFunMap.FUN_Index_CHAOJINGRENYUAN_ID)) this.getRowBarData();
      if(this.hasFunAuth(this.constantFunMap.FUN_Index_SHEANRENYUANANJIAN_ID)) this.getChartsData(this.anjian,'/zplx4');

      if(this.hasFunAuth(this.constantFunMap.FUN_Index_ZONGJIAOJIDUAN_ID)) this.getChartsData(this.zongjiao,'/zplx6');
      if(this.hasFunAuth(this.constantFunMap.FUN_Index_SHEANRENYUANSHEHUI_ID)) this.getChartsData(this.society,'/zplx5');
      if(this.hasFunAuth(this.constantFunMap.FUN_Index_SHEWENGAOWEI_ID)) this.getChartsData(this.highrisk,'/zplx2');
      if(this.hasFunAuth(this.constantFunMap.FUN_Index_CHUREJING_ID)) this.getChartsData(this.border,'/zplx3');
    },
    getFilterCondition () {
      let me = this;
      commonApi.getDeptTree().then(response => {
        if(response.code == 200){
          var data = response.data;
          me.unitListData.filterCondition = data;
          me.$store.dispatch('citys', data);
        }else{
          me.$Message.error('获取单位失败！');
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 根据选取不同单位筛选数据
     * @
     * @author erbing
     */
    getGraphData (data,cur) {
      this.unitListData.filterDataLength = data && data.length > 0 ? data[0].title : '';
      this.unitListData.dwmc = cur.id;
      this.getInitData();
    },
    /**
     * 获取柱状图（宗教极端思想历史传承图）数据
     * 变更----获取柱状图（户籍人口家谱图）数据
     * @
     * @author erbing
     */
    getBarData () {
      let me=this;
      apis.queryCountyCount(this.family,this.unitListData.dwmc,'/zplx1')
      .then(response => {
        if (response.code == 200) {
          var data = response.data.data;
          me.barData = [];
          me.barDataVal = [];
          for(var i = 0; i < data.length; i++){
            me.barData.push(data[i].name);
            me.barDataVal.push(data[i].value)
          }
          me.drawBar();
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 获取横向柱状图（私朝人员关系图）数据
     * @
     * @author erbing
     */
    getRowBarData () {
      let me=this;
      apis.queryCountyCount(this.sichao,this.unitListData.dwmc,'/zplx7')
      .then(response => {
        if(response.code == 200){
          var data = response.data.data;
          me.HajjData.RowBarData = [];
          me.HajjData.RowBarDataVal = [];
          for(var i = 0; i < data.length; i++){
            me.HajjData.RowBarData.push(data[i].name);
            me.HajjData.RowBarDataVal.push(data[i].value)
          }
          me.HajjData.rbd = me.HajjData.RowBarData.slice((this.HajjData.currentPage-1)*12,12);
          me.HajjData.rbdv = me.HajjData.RowBarDataVal.slice((this.HajjData.currentPage-1)*12,12);
          me.drawRowBar();
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 获取折线图（涉案人员案件关系图谱）数据
     * @
     * @author erbing
     */
    getLineData (msg,type) {
      let me=this;
      apis.queryYearMonthData(this.anjian,this.unitListData.dwmc)
      .then(response => {
        if(response.code ==200){
          let data =response.data.map(x=>{
            return {
              name:x.year,
              value:x.mCount
            }
          })
          console.log('data',data)
          me[msg.chartID].data = data;
          this.$nextTick(()=>{
            this.$refs[msg.chartID].init();
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    /**
     * 柱状图，为echarts对象加载数据
     * @
     * @author erbing
     */
    initData (option){
      this.myChart = this.$echarts.init(document.getElementById('bar'));
      this.myChart.setOption(option);
      window.addEventListener('resize',()=>{
        this.myChart.resize();
      })
    },
    /**
     * 柱状图，（宗教极端思想历史传承图）初始化图表
     * @
     * @author erbing
     */
    drawBar () {
      var me = this;
      var myChart = this.$echarts.init(document.getElementById('bar'));
      var option = {
          color: ['#3398DB'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '5%',
              bottom: '3%',
              containLabel: true
          },
          dataZoom: [
              {
                type: 'slider',
                show: true,
                start: 0,
                end: 100-me.barData.length-1/me.barData.length,
                handleSize: 14,

                xAxisIndex: [0],
                handleSize: 8,//滑动条的 左右2个滑动条的大小
                height: 10,//组件高度
                left: '10%', //左边的距离
                right: '10%',//右边的距离
                bottom: 10,//右边的距离
                borderColor: "#0c1221",
                fillerColor: 'rgba(38,156,219,.3)',
                borderRadius:10,
                backgroundColor: '#33384b',//两边未选中的滑动条区域的颜色
                showDataShadow: false,//是否显示数据阴影 默认auto
                showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                realtime:true, //是否实时更新
                filterMode: 'filter',
            },
            {
                type: 'inside',
                start: 0,
                end: 100-me.barData.length-1/me.barData.length,
                show: true,
                xAxisIndex: [0],
            }
          ],
          xAxis : [
              {
                  type : 'category',
                  data : me.barData, //接口返回数据
                  axisTick: {
                      alignWithLabel: true
                  },
                  axisLabel: {
                    interval: 0,
                    rotate:40
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  splitLine: {
                    //show:false,
                    lineStyle: {
                      color:['rgba(255,255,255,0.2)'],
                      width:1,
                      type: 'dotted'
                    }
                  }
              }
          ],
          series : [

              {
                  name:'户籍人口家谱',
                  type:'bar',
                  //barWidth: '50%',
                  barWidth : 30,
                  //data:[10, 52, 200, 334, 390, 330, 220,260,50],
                  data: me.barDataVal,//接口返回数据
                  itemStyle: {
                    normal: {
                      color: function (params){
                          var colorList = [
                              ['rgba(63,166,246,1)','rgba(63,166,246,0.5)','rgba(63,166,246,0)'],
                              ['rgba(19,217,220,1)','rgba(19,217,220,0.5)','rgba(19,217,220,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(223,111,78,1)','rgba(223,111,78,0.5)','rgba(223,111,78,0)'],
                              ['rgba(20,158,75,1)','rgba(20,158,75,0.5)','rgba(20,158,75,0)'],
                              ['rgba(170,174,55,1)','rgba(170,174,55,0.5)','rgba(170,174,55,0)'],
                              ['rgba(49,124,184,1)','rgba(49,124,184,0.5)','rgba(49,124,184,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(152,124,203,1)','rgba(152,124,203,0.5)','rgba(152,124,203,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(63,166,246,1)','rgba(63,166,246,0.5)','rgba(63,166,246,0)'],
                              ['rgba(19,217,220,1)','rgba(19,217,220,0.5)','rgba(19,217,220,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(223,111,78,1)','rgba(223,111,78,0.5)','rgba(223,111,78,0)'],
                              ['rgba(20,158,75,1)','rgba(20,158,75,0.5)','rgba(20,158,75,0)'],
                              ['rgba(170,174,55,1)','rgba(170,174,55,0.5)','rgba(170,174,55,0)'],
                              ['rgba(49,124,184,1)','rgba(49,124,184,0.5)','rgba(49,124,184,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(152,124,203,1)','rgba(152,124,203,0.5)','rgba(152,124,203,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(63,166,246,1)','rgba(63,166,246,0.5)','rgba(63,166,246,0)'],
                              ['rgba(19,217,220,1)','rgba(19,217,220,0.5)','rgba(19,217,220,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(223,111,78,1)','rgba(223,111,78,0.5)','rgba(223,111,78,0)'],
                              ['rgba(20,158,75,1)','rgba(20,158,75,0.5)','rgba(20,158,75,0)'],
                              ['rgba(170,174,55,1)','rgba(170,174,55,0.5)','rgba(170,174,55,0)'],
                              ['rgba(49,124,184,1)','rgba(49,124,184,0.5)','rgba(49,124,184,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(152,124,203,1)','rgba(152,124,203,0.5)','rgba(152,124,203,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(63,166,246,1)','rgba(63,166,246,0.5)','rgba(63,166,246,0)'],
                              ['rgba(19,217,220,1)','rgba(19,217,220,0.5)','rgba(19,217,220,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(223,111,78,1)','rgba(223,111,78,0.5)','rgba(223,111,78,0)'],
                              ['rgba(20,158,75,1)','rgba(20,158,75,0.5)','rgba(20,158,75,0)'],
                              ['rgba(170,174,55,1)','rgba(170,174,55,0.5)','rgba(170,174,55,0)'],
                              ['rgba(49,124,184,1)','rgba(49,124,184,0.5)','rgba(49,124,184,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                              ['rgba(152,124,203,1)','rgba(152,124,203,0.5)','rgba(152,124,203,0)'],
                              ['rgba(181,52,180,1)','rgba(181,52,180,0.5)','rgba(181,52,180,0)'],
                          ];
                          var index =  params.dataIndex;
                          if(params.dataIndex >= colorList.length){
                            index = params.dataIndex - colorList.length
                          }
                          return new me.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [
                              {offset: 0, color: colorList[index][0]},
                              {offset: 0.4, color: colorList[index][1]},
                              {offset: 1, color: colorList[index][2]}
                            ],
                          );
                      }
                    }
                  },
                  label:{
                    normal:{
                      show: true,
                      color: '#fff',
                      position:'top'
                    }
                  }
              },
          ],
          textStyle: { //显示文字的样式
      　　　　color: '#2c78bb',
      　　},
      };
      me.initData(option);
      me.myChart.setOption(option);
    },
    /**
     * 横向柱状图，为echarts对象加载数据
     * @
     * @author erbing
     */
    initRowLineData (option){
      this.myChart2 = this.$echarts.init(document.getElementById('rowBar'));
      this.myChart2.setOption(option);
      window.addEventListener('resize',()=>{
        this.myChart2.resize();
      })
    },
    /**
     * 横向柱状图（私朝人员关系图）初始化图表
     * @
     * @author erbing
     */
    drawRowBar () {
      var me = this;
      var option = {
          title: {
              // text: '世界人口总量',
              // subtext: '数据来自网络'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['2011年', '2012年']
          },
          grid: {
              left: '1%',
              right: '8%',
              top: '10%',
              bottom: '1%',
              containLabel: true
          },
          xAxis: {
              show: false,
              type: 'value',
              boundaryGap: [0, 0.01],
              splitLine: {
                show: false
              }
          },
          yAxis: {
              inverse: true,
              type: 'category',
              data: me.HajjData.rbd,//接口返回数据
              axisLabel: {
                interval: 0,
              },
              splitArea: {  //柱条背景
                //show:true,
              },
              axisLine: {
                show:false
              }
          },
          series: [

              {
                  //name: '2012年',
                  type: 'bar',
                  silent: true,
                  barWidth:8,
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        var colorList = [
                          '#ef6c77','#f9d467','#a7fa91','#34baff','#ff903f', '#f482fe','#fe846c','#6cefb0','#1980d8',
                          '#ef6c77','#f9d467','#a7fa91','#34baff','#ff903f', '#f482fe','#fe846c','#6cefb0','#1980d8',
                          '#ef6c77','#f9d467','#a7fa91','#34baff','#ff903f', '#f482fe','#fe846c','#6cefb0','#1980d8',
                          '#ef6c77','#f9d467','#a7fa91','#34baff','#ff903f', '#f482fe','#fe846c','#6cefb0','#1980d8',
                          '#ef6c77','#f9d467','#a7fa91','#34baff','#ff903f', '#f482fe','#fe846c','#6cefb0','#1980d8'
                        ];
                          return colorList[params.dataIndex]
                      },
                      barBorderRadius: 4,
                      shadowColor: 'rgba(0,0,0,0.4)',
                      shadowBlur: 4
                    },
                    // emphasis:{
                    //   barBorderRadius: 4
                    // }
                  },
                  label:{
                    normal:{
                      show: true,
                      position:'right'
                    }
                  },
                  //data: [19325, 23438, 31000, 121594, 134141, 681807,121594, 134141, 681807]
                  data: me.HajjData.rbdv //接口返回数据
              }
          ],
          textStyle: { //显示文字的样式
      　　　　color: '#2c78bb',
      　　},
      };
      this.initRowLineData(option);
    },
    /**
     * 折线图，为echarts对象加载数据
     * @
     * @author erbing
     */
    initLine (option){
      this.myChartLine = this.$echarts.init(document.getElementById('line'));
      this.myChartLine.setOption(option);
      window.addEventListener('resize',()=>{
        this.myChartLine.resize();
      })
    },
     /**
     * 折线图（涉案人员案件关系图谱）初始化图表
     * @
     * @author erbing
     */
    drawLine () {
      var me = this;
      var option = {
          title: {
              // text: '堆叠区域图'
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              // data:['2018','2017','2016'],
              icon: 'rect',
              data: me.lineYear,
              textStyle: { //显示文字的样式
          　　　　color: '#2c78bb',
          　　},
              x: 'right',
              itemWidth: 15,
              itemHeight: 15,
          },
          color: ['#01dbfb','#ff79b2','#fada77'],
          // toolbox: {  //下载为图按钮
          //     feature: {
          //         saveAsImage: {}
          //     }
          // },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  splitLine: {
                    show:false
                  }
              }
          ],
          series : [
              {
                  name: me.myChartLine[0].year,
                  type:'line',
                  smooth: true,
                  symbolSize:0, //折线点的大小
                  stack: '案件数量',
                  areaStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                          {offset:0,color: 'rgba(100,255,247,1)'},
                          {offset:0.5,color: 'rgba(100,255,247,0.5)'},
                          {offset:1,color: 'rgba(100,255,247,0)'}
                      ]),
                    },
                  },
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        width:1
                      }
                    }
                  },
                  //data:[120, 332, 401, 334, 290, 230, 210,537,256,234,156,568]
                  data: me.myChartLine[0].mCount  //接口返回数据
              },
              {
                  //name:'2017',
                  name: me.myChartLine[1].year,
                  type:'line',
                  smooth: true,
                  symbolSize:0, //折线点的大小
                  stack: '案件数量',
                  areaStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                          {offset:0,color: 'rgba(233,125,173,1)'},
                          {offset:0.5,color: 'rgba(233,125,173,0.5)'},
                          {offset:1,color: 'rgba(233,125,173,0)'}
                      ]),
                    }
                  },
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        width:1
                      }
                    }
                  },
                  //data:[220, 382, 591, 334, 290, 330, 310,255,667,224,79,123]
                  data: me.myChartLine[1].mCount  //接口返回数据
              },
              {
                  //name:'2016',
                  name: me.myChartLine[2].year,
                  type:'line',
                  smooth: true,
                  symbolSize:0, //折线点的大小
                  stack: '案件数量',
                  areaStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                          {offset:0,color: 'rgba(247,222,131,1)'},
                          {offset:0.5,color: 'rgba(247,222,131,0.5)'},
                          {offset:1,color: 'rgba(247,222,131,0)'}
                      ]),
                    }
                  },
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        width:1
                      }
                    }
                  },
                  //data:[250, 332, 201, 554, 390, 330, 410,78,356,78,89,356]
                  data: me.myChartLine[2].mCount  //接口返回数据
              }
          ],

          textStyle: { //显示文字的样式
      　　　　color: '#2c78bb',
      　　},
      };
      this.initLine(option);
    },
    /**
     * 获取户籍人口家族图谱数据 ,涉案人员社会关系 ,涉稳高危 ,出入境。。
     * @function getFamilyData
     * @author Zhangchan
     */
    getChartsData(msg,type){
      let me=this;
      apis.queryCountyCount(msg,this.unitListData.dwmc,type)
      .then(response => {
        if (msg.chartType == 'Radar') {
          me[msg.chartID].chartData = response.data.data.map(ele=>{
            ele.max = response.data.maxNum;
            return ele;
          })
          console.log(me[msg.chartID].chartData,1111111111)
        }else{
          me[msg.chartID].chartData = response.data.data;
        }
        this.society.currentPage = 1;
        me.society.allData = me[msg.chartID].chartData;
        me[msg.chartID].chartData = me[msg.chartID].chartData.slice((this.society.currentPage-1)*14,14);
        this.$nextTick(()=>{
          this.$refs[msg.chartID].init();
        });

      })
      .catch(error => {
        console.log(error);
      });
    },
    getPageIndex (page) {  //涉案人员社会关系图谱（雷达图分页）
      this.society.currentPage = page;
      var data = this.society.allData.slice((this.society.currentPage-1)*14,this.society.currentPage*14);
      this['society'].chartData = data;
      this.$nextTick(()=>{
        this.$refs['society'].init();
      });
    },
    getPageRbd (page) {  //朝觐人员关系图谱（横向柱状图分页）
      this.HajjData.currentPage = page;
      this.HajjData.rbd = this.HajjData.RowBarData.slice((this.HajjData.currentPage-1)*12,this.HajjData.currentPage*12);
      this.HajjData.rbdv = this.HajjData.RowBarDataVal.slice((this.HajjData.currentPage-1)*12,this.HajjData.currentPage*12);
      this.drawRowBar();
    },
    /**
     * 获取地图数据
     * @function getMapData
     * @author Zhangchan
     */
    getMapData(){
      let me = this;
      me.loaderMapShow = true;
      // me.$axios.post(url, params)
      apis.queryMapTypeAllCountyDataAll(me.unitListData.dwmc)
      .then(response => {
        if(response.code == 200){
          this.$nextTick(()=>{
            this.$refs.map.init(response.data)
          })
          me.loaderMapShow = false;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    toRelationPage(){
      // 查询权限
      if(!this.hasPageAuth(this.constantPageMap.PAGE_Result_ID)) {
        this.$Message.info(this.constantNoAuthData)
        return;
      }

      var me = this;
      sessionStorage.setItem('keyword', this.filterKeyword);
      if (this.uploadList.length) {
        sessionStorage.setItem('name', this.uploadList[0].name);
        sessionStorage.setItem('url', this.uploadList[0].url);
      }else if (this.filterKeyword.length && !this.uploadList.length) {
        sessionStorage.setItem('name', '');
        sessionStorage.setItem('url', '');
      }else if (!this.filterKeyword.length && this.uploadList.length){
        sessionStorage.setItem('keyword', '');
      }

      if (!this.filterKeyword.length && !this.uploadList.length) {
        this.$Message.error('请输入要查找的关键词,或上传图片');
        return false;
      }
      me.$router.push({
        path: '/result',
        query: {
          keyword: this.filterKeyword
        }
      });
    },
    getData (e) {
      // console.log(e,1111);
    },
    /**
     * 个人，消息，应用切换
     * @
     * @author erbing
     */
    getViewIndex (index) {
      var me = this;
      this.statusList.newsModalShow = false;
      this.statusList.appModalShow = false;
      this.statusList.personModalShow = false;
      this.statusList.guidelinesShow = false;
      this.statusList.changeLogShow = false;
      if (index == '0') {
        this.statusList.personModalShow = true;
      }else if(index == '1'){
        // this.statusList.newsModalShow = true;
        this.statusList.appModalShow = true;
        this.statusList.myNavModalShow = false;
      }else if(index == '2'){
        this.statusList.appModalShow = true;
        this.statusList.myNavModalShow = false;
      }
    },
  },
  watch:{

  }
}
</script>

<style lang="less" scoped>
  @widthH:100%;
  @wh:21px;
  @border:2px solid #4a77ca;
  .post(r){
    position:relative;
  }
  .post(a){
    position:absolute;
  }
  .no-auth{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .index{
    width:@widthH;
    height:@widthH;
    .post(a);
    z-index: 999;
    overflow-x: hidden;
    overflow-y: hidden;
    /deep/ .online-count{
      left:260px;
      background: #193679;
      right: auto;
      top: 6px;
      height: 30px;
      padding: 0 6px;
    }
    .itap{
      width: 40%;
      // height:8.4%;
      height:83px;
      left: 50%;
      text-align: center;
      .post(a);
      top: 0;
      z-index: 99;
      // background-color: #183d79;
      background: url(../../static/images/itap-icon.png) 0 0 no-repeat;
      background-size: 100% 100%;
      margin-left: -20%;
      display: flex;
      justify-content: center;
      align-items: center;
      .name{
        // width:194px;
        // width:100%;
        // height:33px;
        display:inline-block;
        margin-left: 25px;
        // .post(a);
        // left:50%;
        // top:50%;
        // text-align: center;
        // margin-left:-50%;
        // margin-top:-25.5px;
        // font-size: 24px;

        color:#fff;
        background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;
        font-family:Adobe Heiti Std R;
        font-weight:normal;
        // color:rgba(255,255,255,1);
        // text-shadow:0px 3px 2px rgba(0, 0, 0, 1);
        // background:linear-gradient(0deg,rgba(255,255,255,1),rgba(116,194,255,1) 0%  100%);
        // -webkit-background-clip:text;
        // -webkit-text-fill-color:transparent;
      }
      .version {
        display:inline-block;
        color:#fff;
        background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;
        font-family:Adobe Heiti Std R;
        font-weight:normal;
        font-size: 24px;
        height: 30px;
      }
    }
    .top-border{
      height:@wh;
      border-bottom:@border;
      .post(a);
      top:0;
      left:61px;
      right:52px;
    }
    .right-border{
      width:@wh;
      border-right:@border;
      .post(a);
      right:19px;
      top:53px;
      bottom:60px;
    }
    .bottom-border{
      height:28px;
      border-top:@border;
      .post(a);
      left:61px;
      right:52px;
      bottom:0;
    }
    .left-border{
      width:29px;
      border-right:@border;
      .post(a);
      left:0;
      top:53px;
      bottom:60px;
    }
    // 背景方块
    .block{
      .post(a);
      display:inline-block;
      width:9px;
      height:9px;
      background:url(../../static/images/square.png) 0 0 no-repeat;
    }
    .top-block{
      left:24px;
      top:14px;
    }
    .right-block{
      right:24px;
      top:14px;
    }
    .bottom-block{
      right:13px;
      bottom:22px;
    }
    .left-block{
      left:24px;
      bottom:22px;
    }
    // 四个边角css
    .edge{
      .post(a);
      display:inline-block;
      width:35px;
      height:35px;
    }
    .top-edge{
      left:27px;
      top:19px;
      background:url(../../static/images/left.png) 0 0 no-repeat;
    }
    .right-edge{
      right:19px;
      top:19px;
      background:url(../../static/images/right.png) 0 0 no-repeat;
    }
    .bottom-edge{
      right:19px;
      bottom:26px;
      background:url(../../static/images/left.png) 0 0 no-repeat;
    }
    .left-edge{
      left:27px;
      bottom:26px;
      background:url(../../static/images/right.png) 0 0 no-repeat;
    }
    .charts-box{
      .post(a);
      top:21px;
      right:21px;
      bottom:28px;
      left:29px;
      overflow:hidden;
      .charts{
        float:left;
      }
      .charts-box-left{
        width:29%;
        height:100%;
        .post(r);
        .charts-box{
          .post(a);
          top:25px;
          left:21px;
          right:30px;
          bottom:0;
        }
        .charts-box:nth-child(2){
          top:33%;
        }
        .charts-box:nth-child(3){
          top:66%;
        }
      }
      .charts-box-center{
        width:41.5%;
        height:100%;
        .post(r);
        padding-top: 65px;
        .selected{
          width:@widthH;
          height:30px;
        }
        .map{
          width:@widthH;
          height:68%;
          color: #c7e9ff;
          .post(r);
          .charts-map{
            width:@widthH;
            height:@widthH;
          }
        }
        .record{
          width:@widthH;
          height:32%;
          .post(r);
          .title{
            height:25px;
            .title-name{
              font-size:16px;
              font-weight:bold;
              color:#3aa7fa;
              margin-left:19px;
              float:left;
            }
            .date-box{
              float:right;
            }
            .icon-baocun{
              font-size: 18px;
              color: #3aa8fb;
              cursor: pointer;
              margin-left:11px;
              float:right;
              position: relative;
              top: 0;
            }
          }
          .border-top{
            .post(a);
            height:2px;
            background:#2e54a5;
            left:19px;
            right: 2px;
            top: 29px;
          }
          .border-left{
            .post(a);
            top:48px;
            bottom:15px;
            left:1px;
            width:2px;
            background:#2e54a5;
          }
          .cont-box{
            .post(a);
            top:30px;
            bottom:15px;
            left:0;
            right:1px;
            border:2px solid #2e54a5;
            border-top:none;
            border-left:none;
            .record-top{
              .post(a);
              width:23px;
              height:23px;
              left:-2px;
              top:-4px;
              background:url(../../static/images/record-top.png) 0 0 no-repeat;
            }
            .record-right{
              width:20px;
              height:12px;
              .post(a);
              right:-2px;
              top:-2px;
              background:url(../../static/images/record-right.png) 0 0 no-repeat;
            }
            .record-bottom{
              width:20px;
              height:12px;
              .post(a);
              right:-2px;
              bottom:-2px;
              background:url(../../static/images/record-bottom.png) 0 0 no-repeat;
            }
            .record-left{
              width:20px;
              height:12px;
              .post(a);
              left:0;
              bottom:-2px;
              background:url(../../static/images/record-left.png) 0 0 no-repeat;
            }
            .cont{
              .post(a);
              top:15px;
              right:7px;
              bottom:16px;
              left:14px;
              .box{
                width:100%;
                height:100%;
                background: rgba(51,94,185,.1);
                .cont-left{
                  width:40.6%;
                  height:100%;
                  float:left;
                  .container{
                    height:100%;
                  }
                }
                .cont-right{
                  width:59.4%;
                  height:100%;
                  float:right;
                  border-left:1px solid #1e44a5;
                  overflow-y:auto;
                  overflow-x:hidden;
                  ul{
                    li{
                      height:30px;
                      line-height:30px;
                      font-size:14px;
                      padding-left:20px;
                      .color{
                        color:#71bdff;
                      }
                      .id{
                        width:160px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                      span{
                        display:inline-block;
                        height:30px;
                        line-height: 30px;
                        float:left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                      span:nth-child(1){
                        width:45%;
                      }
                      span:nth-child(2){
                        width:15%;
                      }
                      span:nth-child(3){
                        width:40%;
                        text-align: right;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .charts-box-right{
        width:29.5%;
        height:100%;
        .post(r);
        .charts-box{
          .post(a);
          top:25px;
          left:30px;
          right:17px;
          bottom:0;
        }
        .charts-box:nth-child(2){
          top:33%;
        }
        .charts-box:nth-child(3){
          top:66%;
        }
      }
    }
    .app{
      transform: translate3d(0, 0, 0);
    }
    .inforArea-enter-active, .inforArea-leave-active {
      transition: all .5s;
    }
    .inforArea-enter, .inforArea-leave-active {
      transform: translate3d(400px, 0, 0);
    }
    .message{
      transform: translate3d(0, 0, 0);
    }
    .messageArea-enter-active, .messageArea-leave-active {
      transition: all .5s;
    }
    .messageArea-enter, .messageArea-leave-active {
      transform: translate3d(100%, 0, 0);
    }

  }
  @media screen and (max-height: 768px) {

  }
</style>

<style lang="less">
  @import "../assets/loading.css";
  @widthH:100%;
  .post(r){
    position:relative;
  }
  .post(a){
    position:absolute;
  }
  .cont-right::-webkit-scrollbar{width:6px;height:6px;}
  .cont-right::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .cont-right::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .cont-right::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .cont-right::-webkit-scrollbar-corner{background-color:#dadada;}

  .guidelines{
    transform: translate3d(0, 0, 0);
  }
  .guidelinesArea-enter-active, .guidelinesArea-leave-active {
    transition: all .5s;
  }
  .guidelinesArea-enter, .guidelinesArea-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .feedbackModal{
    transform: translate3d(0, 0, 0);
  }
  .feedbackArea-enter-active, .feedbackArea-leave-active {
    transition: all .5s;
  }
  .feedbackArea-enter, .feedbackArea-leave-active {
    transform: translate3d(0, 259px, 0);
  }

  // 上传图片组件css
  .upload-picture{
    .ivu-upload{
      .ivu-upload-drag{
        border:1px solid rgba(0,0,0,0);
        background: none;
        color: #44b6ff;
        font-size:14px;
      }
      .ivu-upload-list{
        li{
          color: #44b6ff;
          font-size:12px;
          i{
            color: #44b6ff;
            font-size:14px;
          }
        }
      }
    }
  }
  .demo-upload-list {
    display: inline-block;
    //width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    //border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    //background: #fff;
    position: relative;
    color: #44b6ff;
    //box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 20px;
  }

  .demo-upload-list img {
      width: 100%;
      height: 100%;
  }

  .demo-upload-list-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .2);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
      display: block;
  }

  .demo-upload-list-cover i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
  }
  .charts-type{
    width:@widthH;
    height:33.3%;
    .post(r);
    .nav{
      width:100%;
      height:55px;
      .charts-title{
        height:27px;
        font-weight:bold;
        position:relative;
        .title-name{
          color: #3aa8fb;
          font-size:16px;
        }
        .date-box{
          position:absolute;
          left:170px;
          bottom:1px;
        }
      }
      .title{
        width:100%;
        height:29px;
        .post(a);
        //top:30px;
        background:url(../../static/images/chart/title-icon.png) 0 0 no-repeat;
        background-size: 100% 100%;
        .separate-icon{
          width:10px;
          height:10px;
          display:inline-block;
          top:18px;
          right:5px;
          .post(a);
          background:#5280e3;
          border-radius:10px;
        }
        .icon-baocun{
          top: -5px;
          right: 15px;
          position: absolute;
          font-size: 18px;
          color: #3aa8fb;
          cursor:pointer;
        }
        .rel-drop{
          top:-3px;
          right:30px;
          .post(a);
          // .ivu-dropdown-rel{
          //   a{
          //     color:#fff;
          //   }
          // }
          // .ivu-select-dropdown{
          //   //right:10px;
          // }
        }
      }
    }
    .charts-area{
      .post(a);
      top:57px;
      left:0;
      right:0;
      bottom:0;
      color: #c7e9ff;
      .charts-ele{
        width:@widthH;
        height:@widthH;
      }

    }
  }
  //选取单位
  .charts-box-center{
    .selected{
      .ivu-dropdown{
        position:absolute;
        // width: 372px;
        // background: #fff;
        padding-left: 10px;
        // border-radius: 2px;
        // border:1px solid #eaeaea;
        left:50%;
        margin-left:-261.5px;
        z-index:99999;
        width: 523px;
        height: 30px;
        background-color: rgba(51, 171, 255, 0.52);
        box-shadow: 0px 0px 14px 0px
          #0060ff;
        .ivu-dropdown-rel{
          height:100%;
          a{
            line-height:30px;
            font-size:16px;
            color:#6a6a6a;
            font-weight:400;
            color:rgba(199,233,255,1);
            text-shadow:0px 1px 1px rgba(0, 0, 0, 0.75);
          }
        }
        .ivu-select-dropdown{
          height:410px;
          overflow-y:auto;
          left:0 !important;
          color:#fff;
          background-color: rgba(51, 171, 255, .6);
          -webkit-box-shadow: 0px 0px 14px 0px #0060ff;
          box-shadow: 0px 0px 14px 0px #0060ff;
          .ivu-dropdown-menu{
            padding-left:10px;
            .ivu-tree{
              .ivu-tree-children{
                // li{
                //   margin:0;
                // }
                .ivu-tree-title{
                  color:#fff;
                  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.75);
                }
                .ivu-tree-title:hover{
                  background:none;
                }
                .ivu-tree-title-selected{
                  background:none;
                }
              }
            }
          }
        }
        .ivu-select-dropdown::-webkit-scrollbar{width:6px;height:6px;}
        .ivu-select-dropdown::-webkit-scrollbar-track{border-radius:5px;background:none;}
        .ivu-select-dropdown::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
        .ivu-select-dropdown::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
        .ivu-select-dropdown::-webkit-scrollbar-corner{background-color:#dadada;}
      }
    }
  }
  .charts-box-left,.charts-box-right,.charts-box-center{
    .ivu-date-picker-rel{
      .ivu-input-icon{
        height:26px;
      }
      .ivu-input{
        // height:28px;
        // background:rgba(0,0,0,0);
        // border:1px solid #3aa8fb;
        // color:#3aa8fb;
        outline:none;
        color:rgba(37,165,255,1);
        height:26px;
        background:rgba(36,107,169,0.09);
        border:1px solid rgba(46, 73, 129, 0.54);
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color: rgba(37,165,255,1);
      }
    }
    .ivu-select-dropdown{
      left:-200px !important;
      font-weight:normal;
      font-size:12px;
      z-index: 99999999;
    }
  }
  .charts-box-center{
    .ivu-select-dropdown{
      left:0 !important;
    }
  }

  .charts-box-left,
  .charts-box-right{
    .charts-type{
      .page-box{
        position:absolute;
        right:10px;
        top:10px;
        .ivu-page-item{
          display:none;
          line-height:23px;
          min-width: 25px;
        }
        .ivu-page-next,
        .ivu-page-prev{
          min-width: 25px;
          width:25px;
          height:25px;
          line-height:23px;
          display:inline-block;
          border:1px solid #269cdb;
          background:rgba(38,156,219,.5);
          a{
            color:#fff;
          }
        }
        .ivu-page-disabled a{
          color:#666;
        }
      }
    }
  }
  .search-wrapper{
    .box{
      height:50px;

      .search-box{
        width: 100%;
        height: 50px;
      }
      .search-box{
        height: 50px;
        .post(r);
        margin: 0 auto;
        width: 523px;
        .input{
          .post(a);
          left:-8px;
          right:166px;
          .iconfont{
            font-size:20px;
            color:#b7deff;
            cursor:pointer;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
          }
          i:nth-child(1){
            .post(a);
            right:55px;
            top:22px;
          }
          i:nth-child(2){
            .post(a);
            right:25px;
            top:20px;
          }
          input{
            width:100%;
            padding:0 19px;
            height:50px;
            line-height:50px;
            // text-indent: 30px;
            outline: none;
            border:none;
            font-size:14px;
            color:#c7e9ff;
            background:url(../../static/images/input.png) 0 0 no-repeat;
            background-size:100% 100%;
          }
          input::-webkit-input-placeholder{
            color:rgba(255,255,255,.5);
          }
        }
        .selected-dept{
          display: inline-block;
          .post(a);
          right: 0;
          /deep/ .ivu-dropdown{
            .ivu-dropdown-rel{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 102px;
              height: 32px;
              margin-top: 8px;
              line-height: 32px;
              padding: 0 4px;
              text-align: center;
              cursor: pointer;
              color: #fff;
              border-radius: 0;
              border: none;
              background:url(../../static/images/search-btn.png) 0 0 no-repeat;
              background-size: 100% 100%;
              a,i{
                font-size: 13px;
                font-weight: bold;
                background: -webkit-linear-gradient(top, #fff, #74c2ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            .ivu-select-dropdown{
              height:410px;
              overflow-y:auto;
              left:-422px !important;
              color:#fff;
              background-color: rgba(51, 171, 255, .6);
              -webkit-box-shadow: 0px 0px 14px 0px #0060ff;
              box-shadow: 0px 0px 14px 0px #0060ff;
              .ivu-dropdown-menu{
                padding-left:10px;
                width: 522px;
                .ivu-tree{
                  .ivu-tree-children{
                    .ivu-tree-title{
                      color:#fff;
                      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.75);
                    }
                    .ivu-tree-title:hover{
                      background:none;
                    }
                    .ivu-tree-title-selected{
                      background:none;
                    }
                  }
                }
              }
            }
            .ivu-select-dropdown::-webkit-scrollbar{width:6px;height:6px;}
            .ivu-select-dropdown::-webkit-scrollbar-track{border-radius:5px;background:none;}
            .ivu-select-dropdown::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
            .ivu-select-dropdown::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
            .ivu-select-dropdown::-webkit-scrollbar-corner{background-color:#dadada;}
          }
        }
        .search-default{
          .post(a);
          top:0;
          right: 105px;
          width: 65px;
          height: 32px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          border-radius: 0;
          border: none;
          background:url(../../static/images/search-btn.png) 0 0 no-repeat;
          background-size:100% 100%;
          margin-top: 8px;
          /deep/ span{
            font-size:13px;
            font-weight:bold;
            background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
            -webkit-background-clip: text;         /* 规定背景的划分区域 */
            -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
          }
        }
      }
    }
  }

  </style>
