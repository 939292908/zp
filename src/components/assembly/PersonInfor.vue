<template>
	<!-- <transition name="inforArea"> -->
  <div class="inforModal">
  	<div class="inforModal-sidebar">
  		<div class="sidebar-top"></div>
  		<div class="close-btn" @click="closeInforModal"></div>
  		<div class="sidebar-bottom"></div>
  	</div>
  	<div class="cont-box">
  		<div class="grid-box">
  			<div class="head-left"></div>
	  		<div class="title">
          <span v-if="allData.eneityBasicInfo ? true : false">
            {{allData.eneityBasicInfo.property.XM ? allData.eneityBasicInfo.property.XM :'' }}
          </span>
          <span v-if="allData.eneityBasicInfo ? true : false">
            {{allData.eneityBasicInfo.property.SFZHM ? '('+allData.eneityBasicInfo.property.SFZHM+')' : ''}}
          </span>
          <span v-if="allData.eneityBasicInfo ? true : false">
            {{allData.eneityBasicInfo.property.XB ? allData.eneityBasicInfo.property.XB : '' }}
          </span>
          <span v-if="allData.eneityBasicInfo ? true : false">
            {{allData.eneityBasicInfo.property.MZ ? allData.eneityBasicInfo.property.MZ : '' }}
          </span>
					<div class="return-history" @click="showHistory" v-show="historyIcon">历史记录</div>
	  			<span @click="closeInforModal" class="close-modal"><i class="iconfont close icon-guanbi1"></i></span>
	  		</div>
	  		<div class="infor-details bar">
	  			<div class="person-label">
		  			<div class="label-infor">
		  				<div class="activity-inofr">
		  					<div class="header">
                  <!-- <img v-if="allData.eneityBasicInfo[0] ? true : false" :src="$config.imgPath + allData.eneityBasicInfo[0].properties.SFZHM+'.png'"/> -->
                  <img :src="allData.imgSrc" alt="">
                </div>
		  					<div class="label">
		  						<!-- <div class="label-list" v-show="allData.type == 'expand'? true : false">
		  							<span v-for="(item,index) in allData.rybq" :key="index">{{ item }}</span>
		  						</div>
		  						
		  						<div class="risk-level" v-show="allData.type == 'mark'? true : false">
		  							<p>风险等级</p>
	                  <i-circle :percent="80" stroke-color="#f00" :size="66">
	                    <span class="demo-Circle-inner" style="font-size:24px">高</span>
	                  </i-circle> 
		  						</div> -->
		  						<!-- <div class="label-list">
		  							<span v-for="(item,index) in allData.rybq" :key="index">{{ item }}</span>
		  						</div> -->
		  						
		  						<div class="risk-level" v-show="allData.fxpf ? true : false">
		  							<p>风险等级</p>
	                  <i-circle :percent="Number(allData.fxpf)" stroke-color="#f00" :size="66">
	                    <span class="demo-Circle-inner" style="font-size:24px">{{ allData.fxpf >= 0 && allData.fxpf <= 30 ? '低' : allData.fxpf > 30 && allData.fxpf <= 60 ? '中' : allData.fxpf > 60 ? '高' : '' }}</span>
	                  </i-circle> 
		  						</div>
		  					</div>
		  				</div>
		  				<!-- <div class="edit-label">
		  					<div class="label-title">
		  						<span>标签信息</span>
		  						<span><i class="iconfont icon-bianjibiaoqian"></i>编辑标签</span>
		  					</div>
		  					<div class="label-list">
		  						<span v-show="allData.rybq == '' ? false : true " v-for="(item,index) in allData.rybq" :key="index" :class="'c'+allData.labelBgColor[index]">{{ item ? item : '' }}</span>
		  					</div>
		  				</div> -->
		  			</div>
		  			<div class="border-bottom"></div>
		  		</div>
		  		<div class="basic-infor">
		  			<div class="basic-infor-list">
		  				<p>基本信息</p>
		  				<div class="list">
		  					<!-- <ul v-if="allData.eneityBasicInfo[0] ? true : false">
                  <li>
                    <span>姓名</span>
                    <span>{{ allData.eneityBasicInfo[0].properties.XM }}</span>
                  </li>
                  <li v-for="(item,index) in allData.eneityBasicInfo[0].property_mapping" :key="index" v-show="item.TYPE == '姓名' ? false : true ">
                    <span>{{item.TYPE}}</span>
                    <span>{{item.name ? item.name : '-' }}</span>
                  </li>
		  					</ul> -->
								<ul>
                  <li v-if="item.fieleName != 'MAP_DESCRIPTION'"  v-for="(item,index) in allData.eneityBasicInfo.property_mapping" :key="index">
                    <span>{{item.showName}}</span>
                    <div :title=" item.name && item.name.length*14 > 147 ? item.name : '' ">{{item.name ? item.name : '-' }}</div>
                  </li>
		  					</ul>
		  				</div>
		  			</div>
		  		</div>
					<!-- 图谱描述的显示 -->
					<div class="basic-infor" v-if="mapDesc">
		  			<div class="basic-infor-list">
		  				<p>{{mapDesc.showName}}</p>
		  				<div class="list">
								<span>{{mapDesc.name ? mapDesc.name : '-' }}</span>
		  				</div>
		  			</div>
		  		</div>
					<!-- 关联分析放在轨迹信息的上方 -->
					<div class="association-analysis" v-if="$config.mapPageConfig.associationAnalysisLocation">
		  			<div class="type-list">
		  				<span class="list-title">关联分析</span>
		  				<Tabs ref="tabs" value="glfx0" :animated="false">
                  <TabPane :label="item.nodeType" :name="'glfx'+index" v-for="(item,index) in allData.eneityCorrelationInfo.data" :key="index">
                    <div class="tab-box scrollbar">
                      <ul>
                        <li v-for="(items,index) in item.node_Link" :key="index">
                          <div class="head">
                            <i :class="'iconfont '+item.iconTypes"></i>
                          </div>
                          <div class="relation-person">
                            <!-- <span>{{item.linkType+':'}}</span> -->
														<span>{{items.link.show}}</span>
                            <span>{{items.node.show}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </TabPane>
					    </Tabs>
		  			</div>
		  		</div>
					<!-- 如果是查看的是图谱节点类型显示是否需要显示轨迹信息,人员类型显示轨迹信息 -->
		  		<div class="activity-trajectory" v-if="($config.mapPageConfig.showGuiJiLocation)">
		  			<div class="trajectory">
		  				<span class="trajectory-title">轨迹信息</span>
		  				<Tabs value="all" @on-click="switchTrajectory">
                  <div class="time-slot" v-show="allData.eneityTrajectoryInfo.showDate ? true : false">
                    <DatePicker type="date" v-model="startDate" :options="startTimeOptions" format="yyyy-MM-dd" placeholder="开始日期" style="width: 110px" @on-change="selectStartDate"></DatePicker>
                    <span class="to">至</span>
                    <DatePicker type="date" v-model="endDate" :options="endTimeOptions" format="yyyy-MM-dd" placeholder="结束日期" style="width: 110px" @on-change="selectEndDate"></DatePicker>
                  </div>
                  <!-- 图片 -->
                  <TabPane :label="photos" name="photo" class="photoList">
                    <Timeline>
                      <TimelineItem v-for="(item,index) in allData.eneityTrajectoryInfo.photoData" :key="index">
                        <div class="avatar">
                          <img :src="item.PANURL">
                        </div>
                        <div class="content-date">
                          <p class="time">{{ item.PUSHTIME.substring(0, 10) }}</p>
                          <p class="content">{{ item.PUSHTIME.substring(11,19) }}</p>
                        </div>
                        <div class="content-infor">
                        </div>
                      </TimelineItem>
                    </Timeline>
                  </TabPane>
                  <!-- 全部 -->
                  <TabPane :label="all" name="all">
                    <Timeline>
                      <TimelineItem v-for="(items,index) in allData.eneityTrajectoryInfo.datas" :key="index">
                        <div class="icon">
                          <i :class=" items.nodeType == 'HOTEL' ? 'iconfont icon-Hotel' : items.nodeType == 'INTERNET_BAR' ? 'iconfont icon-wangba-copy' : items.nodeType == 'PERMANENT_RESIDENTS' ? 'iconfont icon-Person' : '' "></i>
                        </div>
                        <div class="content-date">
                          <p class="time">{{ items.date.substring(0, 10) }}</p>
                          <p class="content">{{ items.date.substring(11,19) }}</p>
                        </div>
                        <div class="content-infor">
                           <ul>
                            <li><span>{{ items.node.properties.name }}</span><span>{{ items.link.properties.roomNum }}</span></li>
                            <li>{{ items.node.properties.address }}</li>
                            <li><span>{{ items.nodeType == 'HOTEL' ? '同住人：' : items.nodeType == 'INTERNET_BAR' ? '同行人：' : items.nodeType == 'PERMANENT_RESIDENTS' ? '同行人：' : '' }}</span><span>{{ items.relevantPerson }}</span></li>
                           </ul>
                        </div>
                      </TimelineItem>
                    </Timeline>
                  </TabPane>
                  <TabPane :label="item.type" :name="item.name" v-for="(item,index) in allData.eneityTrajectoryInfo.dataTypes" :key="index">
                    <Timeline>
                      <TimelineItem v-for="(items,index) in allData.eneityTrajectoryInfo.datas" :key="index">
                        <div class="icon">
                          <i :class=" items.nodeType == 'HOTEL' ? 'iconfont icon-Hotel' : items.nodeType == 'INTERNET_BAR' ? 'iconfont icon-wangba-copy' : items.nodeType == 'PERMANENT_RESIDENTS' ? 'iconfont icon-Person' : '' "></i>
                        </div>
                        <div class="content-date">
                          <p class="time">{{ items.date.substring(0, 10) }}</p>
                          <p class="content">{{ items.date.substring(11,19) }}</p>
                        </div>
                        <div class="content-infor">
                           <ul>
                            <li><span>{{ items.node.properties.name }}</span><span>{{ items.link.properties.roomNum }}</span></li>
                            <li>{{ items.node.properties.address }}</li>
                            <li><span>{{ items.nodeType == 'HOTEL' ? '同住人：' : items.nodeType == 'INTERNET_BAR' ? '同行人：' : items.nodeType == 'PERMANENT_RESIDENTS' ? '同行人：' : '' }}</span><span>{{ items.relevantPerson }}</span></li>
                           </ul>
                        </div>
                      </TimelineItem>
                    </Timeline>
                  </TabPane>
					    </Tabs>
		  			</div>
		  		</div>
					<!-- 或者（默认）关联分析放在轨迹信息的下方 -->
		  		<div class="association-analysis" v-if="!$config.mapPageConfig.associationAnalysisLocation">
		  			<div class="type-list">
		  				<span class="list-title">关联分析</span>
		  				<Tabs value="glfx0" :animated="false">
                  <TabPane :label="item.nodeType" :name="'glfx'+index" v-for="(item,index) in allData.eneityCorrelationInfo.data" :key="index">
                    <div class="tab-box scrollbar">
                      <ul>
                        <li v-for="(items,index) in item.node_Link" :key="index">
                          <div class="head">
                            <i :class="'iconfont '+item.iconTypes"></i>
                          </div>
                          <div class="relation-person">
                            <!-- <span>{{item.linkType+':'}}</span> -->
														<span>{{items.link.show}}</span>
                            <span>{{items.node.show}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </TabPane>
					    </Tabs>
		  			</div>
		  		</div>
	  		</div>
        <!-- 明细信息展示 -->
        <!-- <div class="title">
          <span>明细信息</span>
        </div> 
        <div class="infor-details bar">
          
        </div> -->
  		</div>
  	</div>
  </div>
  <!-- </transition> -->
</template>

<script>
import moment from 'moment'
export default {
  name: 'PersonInfor',
  props: ['modal','node'], 
  data () {
    return {
      photos:  (h) => {
          return h('div', [
              // h('span', this.$t("message.relation.photos"))
              h('span', '图片')
          ])
      },
      all:  (h) => {
          return h('div', [
              // h('span', this.$t("message.relation.all"))
              h('span', '全部')
          ])
      },
    	labelList: [
    		{
    			value: '吸毒',
    			background: 'color1'
    		},
    		{
    			value: '前科人员',
    			background: 'color2'
    		},
    		{
    			value: '未成年',
    			background: 'color3'
    		},
    	],
      // allData: this.modal,
      startTimeOptions: {}, //开始日期设置
      endTimeOptions: {}, //结束日期设置\
      // startDate: this.modal.eneityTrajectoryInfo.startTime,
      // endDate: this.modal.eneityTrajectoryInfo.endTime,
			imgSrc: '',
			historyIcon: false,
    }
	},
	computed:{
		mapDesc() {
		  let tmp =this.modal.eneityBasicInfo && this.allData.eneityBasicInfo.property_mapping.find(c=>{
				return c.fieleName == 'MAP_DESCRIPTION'
			})
			return tmp ? tmp : null;
		},
		allData() {
			return this.modal;
		},
		startDate() {
			return this.modal.eneityTrajectoryInfo.startTime
		},
		endDate() {
			return this.modal.eneityTrajectoryInfo.endTime
		}
	},
  created(){
		// this.historyIcon = this.$route.path == '/join' ? true : false;
    //this.endDate = moment(new Date()).format('YYYY-MM-DD');
	},
	// 监听侧边框"个人信息"数据 当"关联分析"对象长度为1时，默认选中第一项
	watch:{
		modal:{
			handler(val){
				if (this.modal.eneityCorrelationInfo.data.length == 1) {
					this.$refs.tabs.activeKey = 'glfx0'; 
				}
			},
			deep:true
		}
	},
  methods : {
  	closeInforModal () {
  		//console.log(this.PersonInforShow);
			//this.PersonInforShow = false;
      this.$emit('listenToChild', false);
		},
		/**
     * 返回历史记录
     * @function showHistory
     * @author erbing
     */
		showHistory () {
			this.$emit('returnHistory');
		},
    switchTrajectory (name) {
      this.$emit('switchTrajectory', name);
    },
    selectStartDate (e) {
      //console.log(date);
      this.startDate = e;
        this.endTimeOptions = {
          disabledDate: date => {
            let startTime = this.startDate ? new Date(this.startDate).valueOf() : '';
            return date && (date.valueOf() < startTime);
          }         
        }
      this.$emit('changeTime', e , 'start');
    },
    selectEndDate (e) {
      //console.log(date);
      this.endDate = e;
        let endTime = this.endDate ? new Date(this.endDate).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
        this.startTimeOptions = {
          disabledDate(date) {
            return date && date.valueOf() > endTime;
          }
        }
      this.$emit('changeTime', e , 'end');
    }
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
		z-index:9999;
		//transform: translate3d(0, 0, 0);
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
				// height: 246px;
				top: 40px;
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
					.return-history{
						width: 80px;
						height: 30px;
						text-indent:10px;
						line-height: 30px;
						text-align: center;
						position: absolute;
						right: 70px;
						top: 50%;
						font-size: 12px;
						color: #fff;
						margin-top: -15px;
						background:url('../../../static/images/return-history.png') no-repeat;
						background-size:100% 100%;
						cursor:pointer;
					}
					.close-modal{
						width:40px;
						height:40px;
						display:inline-block;
						text-align:center;
						position:absolute;
						top:1px;
						right:12px;
						cursor:pointer;
						.iconfont{
							font-size:20px;
							// position:absolute;
							// top:1px;
							// right:12px;
							color:#fff;
						}
					}
				}
				.infor-details{
					position:absolute;
					right:10px;
					top:47px;
					bottom:0;
					/* left: 8px; */
					left: 0;
					overflow-y: auto;
					.person-label{
						position: relative;
						padding: 12px 14px 27px 6px;
						// margin-bottom: 20px;
						.label-infor{
							width: 100%;
							.activity-inofr{
								overflow: hidden;
								margin-bottom: 22px;
								.header{
									float: left;
									width: 72px;
									height: 89px;
									border-radius: 4px;
									background: #fff;
									img{
										width: 100%;
										height:100%;
									}
								}
								.label{
									// margin-left: 83px;
                  margin-left: 114px; 
									overflow: hidden;
									.label-list{
										margin-bottom: 10px;
    								overflow: hidden;
										span{
											display: inline-block;
											padding: 0 13px;
											height: 26px;
											line-height: 26px;
											font-size: 14px;
											color: #3e9bd7;
											background-color: #234191;
											border-radius: 2px;
											float: left;
											margin:0 6px 6px 0;
										}
									}
								}
								.risk-level{
									p{
										margin-bottom:10px;
                    color:rgba(58,168,251,1);
									}
									span{
										color:red;
									}
								}
							}
							.edit-label{
								.label-title{
									overflow: hidden;
									span:nth-child(1){
										color: #fff;
										font-size: 16px;
										float: left;
										margin-left: 18px;
									}
									span:nth-child(2){
										color: #fff;
										font-size: 14px;
										float: right;
										cursor: pointer;
										.iconfont{
											color:#5cb9ff;
											margin-right:6px;
										}
									}
								}
								.label-list{
									padding-left: 19px;
									span{
										display: inline-block;
										height: 26px;
										line-height: 26px;
										padding: 0px 14px;
										border-radius: 13px;
										color: #000000;
										margin-right: 10px;
										margin-top: 17px;
									}	
									span.cFF9966{
										background: #FF9966;
									}
                  span.cCC3333{
                    background: #CC3333;
                  }
                  span.c9966FF{
                    background: #9966FF;
                  }
                  span.c6699FF{
                    background: #6699FF;
                  }
                  span.cA1A1A1{
                    background: #A1A1A1;
                  }
                  span.cCC66CC{
                    background: #CC66CC;
                  }
									span.cCE3632{
										background: #CE3632;
									}
									span.cCC6633{
										background: #CC6633;
									}
									span.cCC0000{
										background: #CC0000;
									}
									span.c6B6B6B{
										background: #6B6B6B;
									}
									span.c3366CC{
										background: #3366CC;
									}
									span.c0099FF{
										background: #0099FF;
									}
									span.cFF6633{
										background: #FF6633;
									}
									span.c00CCFF{
										background: #00CCFF;
									}
									span.c797979{
										background: #797979;
									}
									span.c3399FF{
										background: #3399FF;
									}
									span.cAEAEAE{
										background: #AEAEAE;
									}
									span.cCC66FF{
										background: #CC66FF;
									}
								}
							}
						}
						.border-bottom{
							height: 1px;
							background: #254b81 !important;
							position: absolute;
							bottom: 0;
							left: 20px;
							right: 14px;
						}
					}
					.basic-infor{
						padding: 0 14px 0 19px;
						margin-bottom: 22px;
						.basic-infor-list{
							width: 100%;
							height: 100%;
							padding-bottom: 20px;
							border-bottom:1px solid #254b81 !important;
							p{
								//color: #AAAAAA;
								font-size: 16px;
							}
							.list{
                padding-left:15px;
								>span{
									font-size: 14px;
									//color: #666666;
									line-height: 28px;
								}
								ul{
									overflow: hidden;
									li{
										/* float: left; */
										line-height: 28px;
                    /* width: 242px; */
                    width: 100%;
										font-size: 14px;
										/* white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis; */
										span:nth-child(1){
											width: 75px;
											display: inline-block;
											color: #3a8bbf;
											text-align: right;
                      float: left;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin-left: 50px;
										}
										/* span:nth-child(2){
											margin-left: 35px;
											color: #fff;
                    } */
                    div{
                      white-space: normal;
                      word-break: break-all;
                      margin-left: 158px;
                      color: #fff;
                    }
									}
								}
							}
						}
					}
					.activity-trajectory{
						padding: 0 14px 0 19px;
						margin-bottom: 22px;
						position: relative;
						.trajectory{
							width: 100%;
							height: 100%;
							min-height: 200px;
							border-bottom:1px solid #254b81 !important;
							.trajectory-title{
								font-size: 16px;
								color: #fff;
								position: absolute;
								top: 0;
								left: 19px;
							}
						}
					}
					.association-analysis{
						padding: 0 14px 0 19px;
						margin-bottom: 22px;
						position: relative;
						.type-list{
							width: 100%;
							min-height: 105px;
							border-bottom: 1px solid #254b81 !important;
							.list-title{
								font-size: 16px;
								color: #fff;
								position: absolute;
								top: 0;
								left: 19px;
								// .tab-box{
							}
							.ivu-tabs{
								.ivu-tabs-content{
									.ivu-tabs-tabpane{
										.tab-box{
											width:488px;
											height:105px;
											overflow-y:hidden;
											overflow-x:auto;
											white-space: nowrap;
											ul{
												//overflow:hidden;
												// width:488px;
												// height:105px;
												// overflow-y:hidden;
												// overflow-x:scroll;
												// white-space: nowrap;
												li{
													display:inline-block;
													//float:left;
													margin-right:53px;
													text-align: center;
													.head{
														width:58px;
														height:58px;
                            line-height:58px;
														border-radius: 58px;
														display: inline-block;
                            background-color: #1d2e5a;
                            border: solid 1px #2c4483;
														img{
															width:100%;
															height:100%;
														}
                            .iconfont{
                              font-size:30px;
                              color: #5cb9ff;
                            }
													}
													.relation-person{
														font-size:14px;
														span:nth-child(1){
															color: #5cb9ff;
														}
														span:nth-child(2){
															color: #3a8bbf;
														}
													}
												}
												li:nth-child(1){
													margin-left:8px;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	// .funcArea-enter-active, .funcArea-leave-active {
	//   transition: all 10s;
	// }
	// .funcArea-enter, .funcArea-leave-active {
	//   transform: translate3d(535px, 0, 0);
	// }
</style>

<style lang="less">
	.bar::-webkit-scrollbar{width:6px;height:6px;}
	.bar::-webkit-scrollbar-track{border-radius:5px;background:none;}
	.bar::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
	.bar::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
	.bar::-webkit-scrollbar-corner{background-color:#dadada;}
  
  .ivu-tabs-tabpane::-webkit-scrollbar{width:6px;height:6px;}
  .ivu-tabs-tabpane::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .ivu-tabs-tabpane::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .ivu-tabs-tabpane::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .ivu-tabs-tabpane::-webkit-scrollbar-corner{background-color:#dadada;}

	.trajectory{
		.ivu-tabs{
      min-height:24px;
			.ivu-tabs-content{  //时间轴
        position:relative;
        .time-slot{
          position:absolute;
          right:0;
          top:-20px;
          z-index:9999;
          .to{
            color: #5cb9ff;
          }
          .ivu-date-picker{
            .ivu-date-picker-rel{
              .ivu-input-wrapper{
                .ivu-input-icon{
                  height:23px;
                  line-height:23px;
                  color: #5cb9ff;
                }
                .ivu-input{
                  border-radius:2px;
                  background:none;
                  height:23px;
                  color: #5cb9ff;
                  background-color: #1c326e;
                  border: solid 1px #375f91;
                }
              }
            }
            .ivu-select-dropdown{
              .ivu-picker-panel-body-wrapper{
                .ivu-picker-panel-body{
                  .ivu-date-picker-header{
                    .ivu-date-picker-header-label{
                      color:#495060;
                    }
                  }
                }
              }
            }
          }
        }
				.ivu-tabs-tabpane{
          max-height: 300px;
          overflow-y: auto;
          overflow-x: hidden;
					.ivu-timeline{
						.ivu-timeline-item{
							padding: 0 0 40px 0;
							.ivu-timeline-item-tail{
								left:30%;
								border-left:1px dashed  #e7e7e7;
							}
							.ivu-timeline-item-head{
								width:36px;
								height:36px;
								background:#a9c500;
								border-radius:36px;
								left:30%;
								border:none;
								margin-left:-18px;
							}
							.ivu-timeline-item-content{
								font-size:14px;
								color: #3a8bbf;
								position:relative;
								.content-date{
									width:20%;
									float:left;
									.time{
										color: #5cb9ff;
									}
									.content{
										font-size:12px;
										text-align: right;
                    width: 84%;
									}
								}
								.content-infor{
									margin-left:37%;
									li:first-child{
										// span:nth-child(1){
										// 	color:#5cb9ff;
										// 	margin-right:28px;
										// }
                    span{
                      color:#fff;
                    }
                    span:nth-child(1){
                      margin-right:28px;
                    }
									}
                  li:nth-child(2){
                    color: #7e8e9a;
                  }
                  li:last-child{
                    span{
                      color: #7e8e9a;
                    }
                  }
								}
								.icon{
									width:36px;
									height:36px;
									line-height:36px;
									text-align: center;
									position:absolute;
									left:30%;
									top:3px;
									margin-left:-18px;
									i{
										font-size:20px;
										color:#fff;
									}
								}
                .avatar{
                  width:100px;
                  height:100px;
                  position:absolute;
                  left:35%;
                  top:3px;
                  // border-radius: 100px;
                  overflow: hidden;
                  margin-left:-50px;
                  background:#a9c500;
                  img{
                    width:100%;
                    height:100%;
                  }
                }
							}
						}
					}
				}
			}
		}
	}


  .photoList{
    .ivu-timeline{
      .ivu-timeline-item{
        height:140px;
        .ivu-timeline-item-tail{
          left:35%;
          display:none;
        }
        .ivu-timeline-item-head{
          left:35%;
        }
        .ivu-timeline-item-content{
          height:112px;
        }
      }
    }
  }
	.activity-trajectory,.association-analysis{
		.ivu-tabs-bar{  //轨迹信息tab切换
			border-bottom: none;
			.ivu-tabs-nav-container{
				.ivu-tabs-nav-wrap{
					.ivu-tabs-nav-scroll{
            height: 40px;
						.ivu-tabs-nav{
							float: right;
              max-width: 330px;
              overflow-y: auto;
							.ivu-tabs-tab{
								padding-top: 0;
								color: #0473b6;
								font-size: 14px;
								//margin-right: 0;
							}
              .ivu-tabs-ink-bar{
                background-color: #fff;
              }
							.ivu-tabs-tab-active{
								// color: #009aed;
                color: #fff; 
							}
						}
            .ivu-tabs-nav::-webkit-scrollbar{width:6px;height:6px;}
            .ivu-tabs-nav::-webkit-scrollbar-track{border-radius:5px;background:none;}
            .ivu-tabs-nav::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
            .ivu-tabs-nav::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
            .ivu-tabs-nav::-webkit-scrollbar-corner{background-color:#dadada;}
					}
				}
			}
		}
	}
	

</style>

<!-- 在数据的海洋中 -->
