<template>
	<div class="result">
		<header>
			<div class="logo">
				<span class="proj-name">iTap 4.0</span>
		  </div>
		</header>
		<div class="result-cont">
			<div class="result-cont-title">
				<span class="title">{{type == 'YS_SJJZXX' ? '话单详细' : type == 'YS_YHKXX' ? '资金交易信息' : type == 'KDGSXX' ? '物流信息' : '' }}</span>
				<div class="date">
					<span class="call-record">{{'共'+page.total+'条'+(type == 'YS_SJJZXX' ? '通话' : type == 'YS_YHKXX' ? '资金交易' : type == 'KDGSXX' ? '物流' : '')+'记录'}}</span>
          <DatePicker type="date" v-model="startDate" :options="startTimeOptions" format="yyyy-MM-dd" placeholder="开始日期" style="width: 110px" @on-change="selectStartDate"></DatePicker>
          <span class="to">至</span>
          <DatePicker type="date" v-model="endDate" :options="endTimeOptions" format="yyyy-MM-dd" placeholder="结束日期" style="width: 110px" @on-change="selectEndDate"></DatePicker>
				</div>
			</div>
			<div class="result-cont-table">
				<Table stripe :columns="mxTypeData.thead" :data="mxTypeData.typeOfData" @on-row-click="handleRowClick"></Table>
			</div>
		</div>
		<footer>
			<Page :total="page.total" show-elevator :current="page.pageIndex" :page-size="page.pageSize" @on-change="changPage"/>
		</footer>
	</div>
</template>

<script>
import moment from 'moment'
	export default {
		name: 'DetailsPage',
		data (){
			return {
				path : this.$config.relation,
        token: '',
        type: this.$route.query.type,
        id: this.$route.query.id,
        startTimeOptions: {}, //开始日期设置
	      endTimeOptions: {}, //结束日期设置\
	      startDate: this.$route.query.startDate,
	      endDate: this.$route.query.endDate,
	      totals: '',
	      page: {
	      	pageIndex: 1,
					pageSize: 10,
					total: 0
	      },
	      mxTypeData: {
	      	typeOfData : [],
	      	thead: [],
		      hdTableHead: [
		        {
					    title: '',
					    key: 'sort',
					    renderHeader: (h, index) => {   //设置表头为空
			          return h('div', {
	                domProps: {
	                    innerHTML: ''
	                }
			          });
		          },
						},
		        {
					    title: '机主姓名',
					    key: 'JZXM'
						},
						{
					    title: '机主证件号码',
					    key: 'JZZJHM'
						},
						{
					    title: '机主电话号码',
					    key: 'JZDHHM'
						},
						{
					    title: '对方姓名',
					    key: 'DF_XM'
						},
						{
					    title: '对方证件号码',
					    key: 'DF_ZJHM'
						},
						{
					    title: '对方电话号码',
					    key: 'DF_YDDH'
						},
						{
					    title: '通话类型',
					    key: 'TH_LX'
						},
						{
					    title: '通话开始时间',
					    key: 'TH_KSSJ'
						},
						{
					    title: '通话结束时间',
					    key: 'TH_JSSJ'
						},
						{
					    title: '通话时长',
					    key: 'TH_THSC',
					    render: (h, params) => {
                return h('div', [
                  h('span', {
                  }, (params.row.TH_THSC+'分钟'))
                ]);
              }
						},
		      ],
		      wlTableHead: [
		        {
					    title: '',
					    key: 'sort',
					    renderHeader: (h, index) => {   //设置表头为空
			          return h('div', {
	                domProps: {
	                    innerHTML: ''
	                }
			          });
		          },
						},
		        {
					    title: '承运商',
					    key: 'KDGS_DZMC'
						},
						{
					    title: '货物名称',
					    key: 'HW_WPMC'
						},
						{
					    title: '运单号码',
					    key: 'YDH'
						},
						{
					    title: '发货人',
					    key: 'JJR_XM'
						},
						{
					    title: '发货人手机',
					    key: 'JJR_LXDH'
						},
						{
					    title: '发货地址',
					    key: 'SFD'
						},
						{
					    title: '发货时间',
					    key: 'JJSJ'
						},
						{
					    title: '收货人',
					    key: 'SJR_XM'
						},
						{
					    title: '收货人手机',
					    key: 'SJR_XM'
						},
						{
					    title: '收货地址',
					    key: 'SJD'
						},
						{
					    title: '收货时间',
					    key: 'SHSJ'
						},
		      ],
		      zjTableHead: [
		        {
					    title: '',
					    key: 'sort',
					    renderHeader: (h, index) => {   //设置表头为空
			          return h('div', {
	                domProps: {
	                    innerHTML: ''
	                }
			          });
		          },
						},
		        {
					    title: '姓名',
					    key: 'DJR_XM'
						},
						{
					    title: '身份证号码',
					    key: 'DJR_GMSFHM'
						},
						{
					    title: '联系电话',
					    key: 'DJR_LXDH'
						},
						{
					    title: '银行账户',
					    key: '50000000000057265411'
						},
						{
					    title: '开户银行',
					    key: 'KHYX_DWMC'
						},
						{
					    title: '交易类型',
					    key: 'JYFX'
						},
						{
					    title: '交易时间',
					    key: 'JYSJ'
						},
						{
					    title: '交易银行账号',
					    key: 'JYYH_ZH'
						},
						{
					    title: '交易银行',
					    key: 'JYYX_DWMC'
						},
						{
					    title: '交易人姓名',
					    key: 'JYR_XM'
						},
						{
					    title: '交易人身份号码',
					    key: 'JYR_GMSFHM'
						},
						{
					    title: '交易金额',
					    key: 'JYJE_JE'
						},
		      ]
	      }
			}
		},
		methods:{
			handleRowClick (data) {
				console.log(data)
			},
    	selectStartDate (e) {
	      //console.log(date);
	      this.starttime = e;
	        this.endTimeOptions = {
	          disabledDate: date => {
	            let startTime = this.starttime ? new Date(this.starttime).valueOf() : '';
	            return date && (date.valueOf() < startTime);
	          }
	        }
        this.startDate = e;
        this.getALLData();
	    },
	    selectEndDate (e) {
	      //console.log(date);
	      this.endtime = e;
	        let endTime = this.endtime ? new Date(this.endtime).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
	        this.startTimeOptions = {
	          disabledDate(date) {
	            return date && date.valueOf() > endTime;
	          }
	        }
	      this.endDate = e;
        this.getALLData();
	    },
	    changPage (index) {
	    	this.page.pageIndex = index;
	    	this.getALLData();
	    },
	    getALLData () {
	    	let me = this;
        let params = new URLSearchParams();
        let url = me.path+'/Vertex/v1/getNodeMsgByID';
        params.append('token', me.token);
        params.append('nodeID', me.id);
        params.append('params', '{"beginDate": "'+moment(this.startDate).format('YYYY-MM-DD')+' 00-00-00","endDate":"'+moment(this.endDate).format('YYYY-MM-DD')+' 23-59-59","pageIndex":"'+me.page.pageIndex+'","pageSize":"'+me.page.pageSize+'"}');
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
          //话单信息  资金交易  物流信息 数据
          for (var i = 0; i < response.data.data[0].LSXX.data.length; i ++) {
          	response.data.data[0].LSXX.data[i].sort = i+1;
          }
          me.mxTypeData.typeOfData = response.data.data[0].LSXX.data;
          me.page.total = response.data.data[0].LSXX.totals;
          console.log(response.data.data)
        })
        .catch(error => {
          console.log(error);
        });
	    }
    },
		mounted(){

		},
		created(){
			this.type == 'YS_SJJZXX' ? 
			this.mxTypeData.thead = this.mxTypeData.hdTableHead : 
			this.type == 'YS_YHKXX' ? 
			this.mxTypeData.thead = this.mxTypeData.zjTableHead : 
			this.type == 'KDGSXX' ? 
			this.mxTypeData.thead = this.mxTypeData.wlTableHead : '';
			this.getALLData();
		},
		beforeDestroy () {
	    console.log("我已经离开了！")
		}
	}
</script>

<style lang="less" scoped>
  @widthH:100%;
  .post(r){
		position:relative;
  }
  .post(a){
		position:absolute;
  }
	.result{
		width:@widthH;
		height:@widthH;
		position:absolute;
		left:0;
		top:0;
		bottom:0;
		color: #68a4f6;
		overflow-x:hidden;
		overflow-y:hidden;
		.result-cont{
			.post(a);
			left:0;
			top:70px;
			right:0;
			bottom:46px;
			.result-cont-title{
				width: 100%;
				height: 44px;
				background-color: #c7d7eb;
				overflow: hidden;
				border-radius: 6px 6px 0px 0px;
				.title{
					float:left;
					line-height: 44px;
          font-size: 16px;
          margin-left: 23px;
          color:#303030;
				}
				.date{
					float:right;
          height:44px;
          margin-right: 23px;
          .call-record{
          	color: #2698ed;
          	font-size: 16px;
          	line-height: 44px;
          	margin-right: 35px;
          }
          .to{
        		color: #303030;
        	}
				}
			}
			.result-cont-table{
				.post(a);
				top:44px;
				left:0;
				right:0;
				bottom:0;
				background: #fff;
			}
		}
		footer{
			.post(a);
			height: 46px;
			left:0;
			right:0;
			bottom:0;
			overflow-x:hidden;
			background: #f6f6f6;
		}
  }   
</style>

<style lang="less">
	.date{
    .ivu-date-picker{
    	/* position: relative; */
    	top: -2px;
      .ivu-date-picker-rel{
        .ivu-input-wrapper{
          .ivu-input-icon{
            height:23px;
            line-height:23px;
            color: #303030;
          }
          .ivu-input{
            border-radius:2px;
            height:23px;
            line-height:23px;
            color: #303030;
            border: solid 1px #b5c8df;
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
  span.ivu-date-picker-cells-cell{
    color:#495060;
  }
  .ivu-date-picker-cells-focused{
    em{
      background: #2d8cf0;
      color: #fff;
    }
  }
  
  .result-cont-table{
  	.ivu-table-wrapper{
  		height: 100%;
	  	.ivu-table-default{
	  		color: #58718c;
		  	.ivu-table-header{
		  		height: 49px;
		  		table{
		  			thead{
		  				tr{
		  					height: 49px;
		  				}
		  			}
		  		}
		  	}
				.ivu-table-body{
					position: absolute;
			    left: 0;
			    top: 49px;
			    bottom: 0;
			    right: 5px;
			    overflow-y: auto;
			    overflow-x: hidden;
			    .ivu-table-tbody{
			    	color: #505050;
			    	.ivu-table-row-hover{
			    		td{
			    			background: #bfe0f8;
			    		}
			    	}
			    }
				}
				.ivu-table-body::-webkit-scrollbar{width:6px;height:6px;}
				.ivu-table-body::-webkit-scrollbar-track{border-radius:5px;background:none;}
				.ivu-table-body::-webkit-scrollbar-thumb{background-color:rgba(151,151,151,.5);border-radius:5px;}
				.ivu-table-body::-webkit-scrollbar-thumb:hover{background-color:rgba(151,151,151,1);}
				.ivu-table-body::-webkit-scrollbar-corner{background-color:#dadada;}
			}
		}
  }
  
  footer{
  	.ivu-page{
  		padding: 0 30px;
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

</style>


