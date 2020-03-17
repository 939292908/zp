<template>
  <div class="bg-box">
    <div class="message-list" @click.stop="ifCloseMessageDetailsShow">
    	<div class="message-sidebar tarbar">
    		<div class="sidebar-top">
          <div class="polygon"></div>  
        </div>
    		<div class="close-btn" @click="closeMessageModal"></div>
    		<div class="sidebar-bottom">
          <div class="polygon"></div>  
        </div>
    	</div>
    	<div class="message-cont-box">
    		<Tabs :value="name" @on-click="switchMessage">
          <TabPane label="通知消息" name="name1">
            <div class="key-word-search">
              <input type="text" placeholder="输入关键词搜索" v-model="noticeMsgPage.keyWord" @input="filterNoticeData">
              <i class="iconfont icon-sousuo"></i>
            </div>
            <div class="problem-list">
              <ul>
                <li v-for="(item,index) in noticeList" :key="index">
                  <p class="problem-title">
                    <span>{{ (index+1)+'.' }}</span>
                    <span>{{ item.GGBT }}</span>
                    <span class="news" v-show="item.new ? true : false">新通知</span>
                    <span>{{ item.FBSJ }}</span>
                  </p>
                  <div class="problem-cont">
                    <span :class=" item.show ? 'cont show' : 'cont'">{{ item.GGNR }}</span>
                    <span class="switch show" v-show="item.hide ? true : false" @click="item.show = !item.show">
                      <i>{{ item.show ? '' : '...' }}</i>
                      <i>{{ item.show ? '收起' : '展开' }}</i>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="paging">
              <Page :total="noticeMsgPage.total" show-elevator :current="noticeMsgPage.pageIndex" :page-size="noticeMsgPage.pageSize" @on-change="noticeChangPage"/>
            </div>
          </TabPane>
          <TabPane label="更新消息" name="name2">
            <div class="key-word-search">
              <input type="text" placeholder="输入关键词搜索" v-model="updateMsgPage.keyWord" @input="filterUpdateData">
              <i class="iconfont icon-sousuo"></i>
            </div>
            <div class="problem-list">
              <ul>
                <li v-for="(item,index) in updateList" :key="index">
                  <p class="problem-title">
                    <span>{{ (index+1)+'.' }}</span>
                    <span>{{ item.GGBT }}</span>
                    <span class="news" v-show="item.new ? true : false">新通知</span>
                    <span>{{ item.FBSJ }}</span>
                  </p>
                  <div class="problem-cont">
                    <!-- <div class="cont">{{ item.GGNR }}</div> -->
                    <span :class=" item.show ? 'cont show' : 'cont'">{{ item.GGNR }}</span>
                    <span class="switch show" v-show="item.hide ? true : false" @click="item.show = !item.show">
                      <i>{{ item.show ? '' : '...' }}</i>
                      <i>{{ item.show ? '收起' : '展开' }}</i>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="paging">
              <Page :total="updateMsgPage.total" show-elevator :current="updateMsgPage.pageIndex" :page-size="updateMsgPage.pageSize" @on-change="updateChangPage"/>
            </div>
          </TabPane>
          <TabPane label="反馈消息" name="name3" class="feedback-message">
            <div class="key-word-search">
              <input type="text" placeholder="输入关键词搜索" v-model="feedback.keyWord" @input="filterFeedbackData">
              <i class="iconfont icon-sousuo"></i>
            </div>
            <div class="problem-list">
              <ul>
                <li v-for="(item,index) in feedbackList" :key="index">
                  <p class="problem-title">
                    <span>{{(index+1)+'.'}}</span>
                    <span>{{item.FKNR}}</span>
                    <span class="no-reply" v-if="item.replyInfo.length ? false : true">暂无回复</span>
                    <span>{{item.FKSJ}}</span>
                  </p>
                  <div class="problem-cont" v-for="(items,indexs) in item.replyInfo" :key="indexs" v-if="item.replyInfo.length ? true : false">
                    <div class="">
                      {{items.HFNR}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="write-feedback">
              <p>意见反馈</p>
              <textarea name="" id="" cols="30" rows="10" placeholder="填写反馈内容" maxlength="440" v-model="fknr"></textarea>
              <div>
                <input type="button" value="反馈问题"  @click="feedbackProblem">
                <span>400字以内</span>
              </div>
            </div>
          </TabPane>
        </Tabs>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messageDetails',
  props: ['msgType'],
  data () {
    return {
    	//appDataList: this.modal
      fknr: '',
      token: '',
      path: this.$config.home,
      feedbackList: [],
      name: '',
      type: '通知消息',
      noticeMsgPage: {
        keyWord: '',
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      updateMsgPage: {
        keyWord: '',
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      feedback: {
        keyWord: ''
      },
      noticeList: [],
      updateList: [],
      feedbackList: []
    }
  },
  created(){
 
  },
  methods : {
    getFeedbackMessage () {
      var me = this;
      var url = me.path+'HomePageController/v1/getNews';
      var params = new URLSearchParams();
      if (this.name == 'name1') {
        params.append('params', '{"keyWord": "'+me.noticeMsgPage.keyWord+'","type": "'+me.type+'","pageIndex": "'+me.noticeMsgPage.pageIndex+'","pageSize": "'+me.noticeMsgPage.pageSize+'"}');
      }else if(this.name == 'name2'){
        params.append('params', '{"keyWord": "'+me.updateMsgPage.keyWord+'","type": "'+me.type+'","pageIndex": "'+me.updateMsgPage.pageIndex+'","pageSize": "'+me.updateMsgPage.pageSize+'"}');
      }else if(this.name == 'name3'){
        params.append('params', '{"keyWord": "'+me.feedback.keyWord+'","type": "'+me.type+'","pageIndex": " ","pageSize": " "}');
      }
      params.append('token', this.token);
      this.$axios.post(url,params).then((response)=>{
        if (response.data.code != 200) {
          return false;
        };
        //me.feedbackList = response.data.data;
        if (this.name == 'name1') {
          me.expandOrCollapse(response.data.data,'name1');
          me.noticeList = response.data.data;
          me.noticeMsgPage.total = response.data.totals; 
        }else if(this.name == 'name2'){
          me.expandOrCollapse(response.data.data,'name2');
          me.updateList = response.data.data;
          me.updateMsgPage.total = response.data.totals; 
        }else if(this.name == 'name3'){
          me.feedbackList = response.data.data;
        }
      }).catch((response)=>{
        console.log(response);
      })
    },
    expandOrCollapse (data,name) {
      data.forEach((ele,index)=> {
        ele.show = false;
        if (name == 'name1') {
          if (this.noticeMsgPage.pageIndex == 1) {
            data[0].new = true;
          }
        }else if(name == 'name2'){
          if (this.updateMsgPage.pageIndex == 1) {
            data[0].new = true;
          }
        }
        
        if (ele.GGNR) {
          if (ele.GGNR.length > 80) {
            ele.hide = true;
          }else{
            ele.hide = false;
          }
        }
      });
    },
    filterNoticeData () {
      console.log(this.noticeMsgPage.keyWord)
      this.getFeedbackMessage();
    },
    filterUpdateData () {
      console.log(this.updateMsgPage.keyWord)
      this.getFeedbackMessage();
    },
    filterFeedbackData () {
      this.getFeedbackMessage();
    },
    feedbackProblem () {
      var me = this;
      if (!me.fknr.length) {
        me.$Message.error('请输入要填写的内容！');
        return false;
      }
      var url = me.path+'HomePageController/v1/feedbackQuestion';
      var params = new URLSearchParams();
      params.append('params', '{"feedbackContent":"'+me.fknr+'"}');
      params.append('token', this.token);
      this.$axios.post(url,params).then((response)=>{
        if (response.data.code != 200) {
          return false;
        };
        me.$Message.success('反馈成功 ！');
        me.getFeedbackMessage();
        me.fknr = '';
      }).catch((response)=>{
        console.log(response);
      })
    },
    getMessageType (name) {
      name == 'name1' ?  this.type = '通知消息':
      name == 'name2' ?  this.type = '更新消息':
      name == 'name3' ?  this.type = '反馈消息': '';
      this.name = name;
      console.log(this.name,11111111111);
      //this.getFeedbackMessage();
    },
    switchMessage (name) {
      this.getMessageType(name)
    },
  	closeMessageModal () {
  		this.$emit('closeMessageModal', false);
  	},
    ifCloseMessageDetailsShow (evt) {
      if (evt.target.className == 'close-btn') {
        return false;
      }
      //this.$emit('ifCloseMessageDetailsShow', true);
      this.$emit('closeMessageModal', true);
    },
  	openNewPage (url) {
  		window.location.href = url;
  	},
    noticeChangPage (index) {
      this.noticeMsgPage.pageIndex = index;
      this.getFeedbackMessage();
    },
    updateChangPage (index) {
      this.updateMsgPage.pageIndex = index;
      this.getFeedbackMessage();
    }
  },
  computed: {
    // noticeData () {
    //   if (this.noticeMsgPage.show == false) {
    //     var data = [];
    //     this.noticeList.forEach((ele,index)=>{
    //       if(this.noticeList[index].GGNR){
    //         if (this.noticeList[index].GGNR.length > 80 ) {
    //           this.noticeList[index].GGNR = this.noticeList[index].GGNR.substring(0,79);
    //           //data.push(this.noticeList[index]);
    //         }
    //         data = this.noticeList;
    //       }
    //     })
    //     return data;
    //   }else{
    //     return data;
    //   }
    // },
    // btnText() {
    //   this.noticeList.forEach((ele,index)=>{
    //     if (this.noticeList[index].show == false) {  //对文字进行处理（枚举）
    //       return "收起"
    //     } else {
    //       return "展开"
    //     }
    //   })
      
    // }
  }
}
</script>

<style lang="less" scoped>
  .post(a){
  	position:absolute;
  }
  .post(r){
    position:relative;
  }
  .bg-box{
    .post(a);
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.5);
    z-index:999999;
    .message-list{
      width:699px;
      background: #fff;
      .post(a);
      right:0;
      top:0;
      bottom:15px;
      z-index: 998;
      .message-sidebar{
        width: 17px;
        .post(a);
        top: 0;
        bottom: 0;
        left: -17px;
        .sidebar-top{
          .post(a);
          width: 10px;
          height:28.6%;
          //height: 246px;
          top: 0;
          right: 0;
          //background: #fff;
            .polygon{
              .post(a);
              bottom:43px;
              top:0;
              left:0;
              right:0;
              width:0;
              border-right:10px solid #fff;
              border-top:0px solid transparent;
              border-bottom:10px solid transparent;
            }
          
        }
        .sidebar-bottom{
          .post(a);
          width: 10px;
          //height: 246px;
          top:71.9%;
          height:28.1%;
          bottom: 0;
          right: 0;
          //background: #fff;
            .polygon{
              .post(a);
              top:40px;
              left:0;
              right:0;
              bottom:0;
              width:0;
              border-right:10px solid #fff;
              border-top:10px solid transparent;
              border-bottom:0px solid transparent;
            }
          
        }
        .close-btn{
          .post(a);
          top: 28.6%;
          width: 17px;
          height: 43.3%;
          z-index: 99;
          cursor: pointer;
          background: url('../../../static/images/close-btn.png') 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
      .message-cont-box{
        height: 100%;
        .post(r);
        .ivu-tabs{
          height:100%;
          .ivu-tabs-bar{
          }
          .ivu-tabs-content{
            .ivu-tabs-tabpane{
              .key-word-search{
                width:295px;
                height:34px;
                margin-left: 22px;
                .post(r);
                input{
                  width:100%;
                  height:100%;
                  padding:0 36px 0 10px;
                  background:#f3f3f3;
                  border:none;
                  outline: none;
                  border-radius: 5px;
                  font-size:14px;
                  color:#000;
                }
                i{
                  .post(a);
                  right:10px;
                  top:5px;
                  font-size:20px;
                  color:#c5c5c5;
                }
              }
              .problem-list{
                font-size:14px;
                color:#7f7f7f;
                overflow-y: auto;
                .post(a);
                top:84px;
                left:28px;
                right:30px;
                bottom:0;
                //padding: 10px 30px 0 28px;
                li{
                  margin-bottom: 18px;
                  .problem-title{
                    font-size:16px;
                    color:#303030;
                    font-weight:bold;
                    overflow: hidden;
                    span:nth-child(3){
                      display: inline-block;
                      text-align: center;
                      padding:0 11px;
                      height:16px;
                      line-height:16px;
                      border-radius:4px;
                      font-size:12px;
                      color:#fff;
                      font-weight: normal;
                      position: relative;
                      top: 4px;
                      margin-left: 20px;
                    }
                    .news{
                      background:red;
                    }
                    .no-reply{
                      background:#fd8d0a;
                    }
                    span{
                      float: left;
                    }
                    span:last-child{
                      float: right;
                      font-size: 14px;
                      color: #bfbfbf;
                      font-weight: normal;
                      padding:0;
                    }
                  }
                }
              }
              .problem-cont{
                i{
                  color:#006cff;
                }
                .cont{
                  display:inline-block;
                  height:45px;
                  overflow:hidden;
                  word-wrap:break-word;
                }
                .show{
                  height:auto;
                }
                .switch{
                  cursor: pointer;
                }
              }
            }
          }
          .ivu-tabs-tabpane:nth-child(3){
            .problem-list{
              bottom:135px;
              border-bottom: 1px solid #d9d9d9;
            }
          }
        }
      }
    }
  }
	
</style>

<style lang="less">
	.problem-list::-webkit-scrollbar{width:6px;height:6px;}
	.problem-list::-webkit-scrollbar-track{border-radius:5px;background:none;}
	.problem-list::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
	.problem-list::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
	.problem-list::-webkit-scrollbar-corner{background-color:#dadada;}

  .message-cont-box{
    .ivu-tabs{
      .ivu-tabs-bar{
        margin-left: 22px !important;
      }
      .ivu-tabs-content-animated{
        position:absolute;
        top:61px;
        left:0;
        right:0;
        bottom:44px;
        .ivu-tabs-tabpane{
          position: relative;
        }
      }
    }
  }

  .paging{
    position:absolute;
    height: 44px;
    left:-10px;
    right:0;
    bottom:-44px;
    background: #f6f6f6;
    .ivu-page{
      padding: 0 30px;
      margin-top: 8px;
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
