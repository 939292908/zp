<template>
  <div class="card">
    <div class="card-left">
      <div class="card-list scrollbar">
        <Row :gutter="16">
            <Col span="6" v-for="(item,index) in modal" :key="index">
              <!-- <div class="box" @click="viewTheFile"> -->
                <div class="card-col">
                  <!-- <div class="cont-box"> -->
                    <div class="card-col-head">
                      <span class="name">{{ item.name }}</span>
                      <div class="head-icon">
                        <span v-for="(items,index) in item.label" :key="index">{{ items.value }}</span>
                      </div>
                    </div>
                    <div class="card-col-cont">
                      <div class="cont-box">
                        <div class="cont-box-left">
                          <div class="avtor">
                            
                          </div>
                        </div>
                        <div class="cont-box-right">
                          <ul>
                            <li>
                              <span>{{ item.card }}</span>
                              <span>{{ item.cardNum }}</span>
                            </li>
                            <li class="li">
                              <span>{{ item.contactAddress }}</span>
                              <span>{{ item.contactAddress }}</span>
                            </li>
                            <li class="li">
                              <span>{{ item.contactNum }}</span>
                              <span>{{ item.phone }}</span>
                            </li>
                            <li>
                              <span>{{ item.entryPeron }}</span>
                              <span>{{ item.entryName }}</span>
                            </li>
                            <li>
                              <span>{{ item.entryCompany }}</span>
                              <span>{{ item.company }}</span>
                            </li>
                            <li>
                              <span>{{ item.entryDate }}</span>
                              <span>{{ item.date }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  <!-- </div> -->
                </div>
              <!-- </div> -->
            </Col>
        </Row>
      </div>
      <div class="paging">
        <Page :total="100" show-elevator />
      </div>
    </div>
		<div class="card-right">
      <div class="card-right-person">
        <div class="person-profiles">
          <div class="view-file-btn">
            <span>查看档案</span>
          </div>
          <div class="person-profiles-avatar">
            <div class="avatar">
              <img src="../../../static/images/person-label-head.png">
            </div>
            <div class="profiles">
              <p>王刚</p>
              <p>432231198707081121</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-right-title">
        <div class="box">
          <h2>相关信息</h2>
        </div>
      </div>
      <div class="card-right-cont">
        <Tabs value="name1">
          <TabPane label="人员" name="name1">
            <div>
              <ul>
                <li>
                  <span><img src="../../../static/images/person-label-head.png"></span>
                  <span>张某某</span>
                  <span>510151198202121154</span>
                </li>
                <li>
                  <span><img src="../../../static/images/person-label-head.png"></span>
                  <span>张某某</span>
                  <span>510151198202121154</span>
                </li>
                <li>
                  <span><img src="../../../static/images/person-label-head.png"></span>
                  <span>张某某</span>
                  <span>510151198202121154</span>
                </li>
                <li>
                  <span><img src="../../../static/images/person-label-head.png"></span>
                  <span>张某某</span>
                  <span>510151198202121154</span>
                </li>
                <li>
                  <span><img src="../../../static/images/person-label-head.png"></span>
                  <span>张某某</span>
                  <span>510151198202121154</span>
                </li>
                <li>
                  <span><img src="../../../static/images/person-label-head.png"></span>
                  <span>张某某</span>
                  <span>510151198202121154</span>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane label="车辆" name="name2">
            <div>
              <ul>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane label="手机" name="name3">
            <div>
              <ul>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane label="银行卡" name="name4">
            <div>
              <ul>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane label="社交软件" name="name5">
            <div>
              <ul>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane label="房产" name="name6">
            <div>
              <ul>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    modal:Array
  },
  data () {
    return {
    	pageNum: '10'
    }
  },
  methods : {
    viewTheFile (e) {
      //e.stopPropagation();
      let target = e.target;
      let tagName = target.tagName.toLowerCase();
      console.log(target.className)
    }
  }
}
</script>

<style lang="less" scoped>
  .post(r){
		position:relative;
  }
  .post(a){
		position:absolute;
  }
	.card{
		//position: relative;
		.post(a);
		top:41px;
		left:0;
		bottom:0;
		right:0;
    background:#fff;
    .card-left{
      .post(a);
      top:0;
      left:0;
      bottom:0;
      right:30%;
  		.card-list{
  			position:absolute;
  			top:26px;
  			bottom:44px;
  			left:0;
  			right:0;
  			overflow:auto;
  			.ivu-row{
  				margin-left:18px !important;
  				margin-right:18px !important;
  				height:100%;
  				.ivu-col-span-6{
  					height:25%;
  					min-height:190px;
  					//min-width:270px;
            // .box{
              //height:90%;
    					.card-col{
    						height:90%;
    						position:relative;
    						background-color: #ffffff;
    						box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.13);
    						border-radius: 8px;
    						.card-col-head{
    							width:100%;
    							height: 31px;
    							line-height: 31px;
    							border-radius: 8px 8px 0 0;
    							background-color: #a2b5cb;
    							.name{
    								float:left;
    								font-size:14px;
    								color:#fff;
    								margin-left:13px;
    							}
    							.head-icon{
    								float:right;
    								margin-right:8px;
    								span{
    									width:47px;
    									height:23px;
    									line-height:17px;
    									margin-top:6px;
    									font-size:12px;
    									color:#fff;
    									text-align: center;
    									margin-left: 10px;
        							display: inline-block;
        							background:url(../../../static/images/label-icon.png) 0 0 no-repeat;
    								}
    							}
    						}
    						.card-col-cont{
    							position:absolute;
    							top:31px;
    							left:0;
    							right:0;
    							bottom:0;
    							padding:12px 8px;
    							.cont-box{
    								width:100%;
    								height:100%;
    								overflow: hidden;
    								.cont-box-left{
    									// width:47px;
    									width:13%;
    									float:left;
    									height:100%;
    									//background:blue;
    								}
    								.cont-box-right{
    									// margin-left:55px;
    									background-color:#e5e5e5;
    									margin-left:15%;
    									height:100%;
    									border-radius:4px;
    									ul{
    										height:100%;
    										li{
    											height:16.66%;
    											//line-height:16.66%;
    											overflow: hidden;
    											white-space: nowrap;
    											text-overflow: ellipsis;
    											color: #303030;
    											span:nth-child(1){
    												width:48px;
    												color: #8792a1;
    												font-size:12px;
    												margin:0 15px 0 8px;
    												display:inline-block;
    											}
    											span:nth-child(2){
    												color: #303030;
    												font-size:12px;
    												//display:inline-block;
    											}
    										}
    										li.li{
    											background-color: #f2f2f2;
    										}
    									}
    								}
    							}
    						}
    					}
            // }
  				}
  			}
  		}
  		.paging{
  			height: 44px;
  			background: #f6f6f6;
  			.post(a);
  			bottom: 0;
  			left: 0;
  			right: 0;
  			padding: 0 26px;
  		}
    }
    .card-right{
      .post(a);
      top:0;
      width:30%;
      bottom:0;
      right:0;
      border-left:1px solid #e0e0e0;
      background:#f6f6f6;
      .card-right-person{
        width:100%;
        height:93px;
        position:relative;
        .person-profiles{
          .post(a);
          top:18px;
          right:13px;
          bottom:23px;
          left:17px;
          overflow:hidden;
          .person-profiles-avatar{
            margin-right:70px;
            height:100%;
            overflow:hidden;
            .avatar{
              width:42px;
              border-radius:3px;
              height:100%;
              float:left;
              img{
                width:100%;
                height:100%;
                border-radius:3px;
              }
            }
            .profiles{
              margin-left:42px;
              padding-left:16px;
              height:100%;
              color:#303030;
              p:nth-child(1){
                font-size:16px;
                color: #303030;
              }
              p:nth-child(2){
                font-size:14px;
                color: #303030;
              }
            }
          }
          .view-file-btn{
            float: right; 
            width: 70px;
            height:100%;
            span{
              width: 70px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              font-size:14px;
              color:#fff;
              cursor:pointer;
              display:inline-block;
              background: #307ee2;
              border-radius: 2px;
            }
          }
        }
      }
      .card-right-title{
        width:100%;
        height:32px;
        border-bottom:1px solid #d2d2d2;
        .box{
          width:100%;
          height:31px;
          border-bottom:1px solid #d9d9d9;
          background: -webkit-linear-gradient(#fff, #e7e7e7);
          h2{
            line-height: 31px;
            text-indent:20px;
            font-size:16px;
            color:#303030;
          }
        }
      }
      .card-right-cont{
        .post(a);
        top:124px;
        left:0;
        bottom:0;
        right:0;
      }
    }
	}
</style>

<style lang="less">
	.paging{
		.ivu-page{
			margin-top: 11px;
			li{
				width: 24px;
				min-width: 24px;
				height: 24px;
				line-height: 24px;
				margin-right: 13px;
				a{
					width: 100%;
					height: 100%;
					margin: 0;
					text-align: center;
					color: #303030;
				}
			}
			.ivu-page-item-active{
				background: #2d62bb;
				border-color: #2d62bb;
				a{
					color: #fff;
				}
			}
			.ivu-page-options{
				float: right;
				color: #303030;
				.ivu-page-options-elevator{
					input{
						text-align: center;
						height: 24px;
					}
				}
			}
		}
	}

  .card-right-cont{
    .ivu-tabs{
      height: 100%;
      .ivu-tabs-content-animated{
        position: absolute;
        left: 0;
        top: 52px;
        bottom: 0;
        right: 0;
        .ivu-tabs-tabpane{
          /* width: auto;
          position: absolute;
          left: 4.4%;
          top: 52px;
          bottom: 0;
          right: 6.3%;
          overflow-y: auto; */
          height: 100%;
          position: relative;
          ul{
            position: absolute;
            left: 4.4%;
            top: 0;
            bottom: 0;
            /* right: 6.3%; */
            right: 5.3%;
            overflow-y: auto;
            li{
              height: 85px;
              line-height: 85px;
              overflow: hidden;
              border-bottom:1px solid #eaeaea;
              span{
                float: left;
                display: inline-block;
                color: #303030;
                font-size: 14px;
              }
              span:nth-child(1){
                width: 42px;
                height: 52px;
                border-radius: 5px;
                margin-top: 15px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              span:nth-child(2){
                width: 25.5%;
                margin-left: 16px;
              }
            }
          }
          ul::-webkit-scrollbar{width:6px;height:6px;}
          ul::-webkit-scrollbar-track{border-radius:5px;background:none;}
          ul::-webkit-scrollbar-thumb{background-color:rgba(151,151,151,.5);border-radius:5px;}
          ul::-webkit-scrollbar-thumb:hover{background-color:rgba(151,151,151,1);}
          ul::-webkit-scrollbar-corner{background-color:#dadada;}
        }
      }
    } 
  }
</style>
