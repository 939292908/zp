<!-- 21 -->
<template>
  <div class="main_cont" @click="status.myNavModalShow=false;status.uploadImg=false;status.personModalShow=false;status.newsModalShow=false;status.appModalShow=false">
    <app-header 
      :items="statusList" 
      title="谱系档案" 
      @on-search="getPxda"
      :showSearch=true>
    </app-header>
    <div class="result-cont">
      <!-- <transition name="conditionArea">
        <div class="condition-filter scrollbar" v-show="status.ifConditionArea">
          <div class="filter">
            <div class="condition-list scrollbar">
            </div>
          </div>
          <div class="filters-con-loading" v-show="filtersConLoading">
            <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
            </Col>
          </div>
        </div>
      </transition> -->
      <div id="d3" class="d3">
        <div class="title">
          <!-- <span class="search-result">{{person.name+'('+person.idcard+')'+ '谱系档案'}}</span> -->
          <!-- <div class="toggle-btn" @click="openD3Card">
            <span v-for="(item,index) in viewList" :key="index" :class="{ viewCur:index==current}" :data-index="index"><i :class="'iconfont '+ item.class"></i></span>
          </div> -->
        </div>
        <!-- d3图形展示 -->
        <div class="graphical" v-show="status.d3Show">
          <div class="func-btn-group">
            <div class="group-left">
              <ul>
                <li><i class="iconfont icon-baocun" title="生成谱系档案"></i></li>
                <!-- <li><i class="iconfont icon-pingmukuaizhao" @click="saveAsPng"></i></li> -->
                <li><i class="iconfont icon-pingmukuaizhao"  title="快照"></i></li>
                <li><i class="iconfont icon-shuaxin" title="刷新"></i></li>
                <!-- <li><i class="iconfont icon-dayin"></i></li> -->
                <li></li>
              </ul>
            </div> 
            <!-- <div class="group-right">
              <ul>
                <li><i class="iconfont icon-zuzhi"></i></li>
                <li><i class="iconfont icon-guanxiquan"></i></li>
                <li><i class="iconfont icon-lujingjisuan"></i></li>
              </ul>
            </div> -->
          </div>
          <div v-show="status.d3Show" id="webixv" width="1300" height="800"></div>
          <div style="position:absolute;left:150px;right:150px;top:50px;bottom:50px;" v-show="D3ImgShow">
            <img src="../../static/images/D3.png" alt="" style="width:100%;">
          </div>
          <!-- <div class="d3-loading" v-show="d3Loading">
            <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>图形加载中...</div>
                </Spin>
            </Col>
          </div> -->
        </div>  
      </div>
    </div>    
    <!-- 查看档案面板 -->
    <!-- <transition name="personInforArea">
      <PersonInfor ref="PersonInfor" :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData" v-if="status.PersonInforShow" @listenToChild="hidePersonInfor" @switchTrajectory="switchTrajectory" @changeTime="changeTime" class="personInfo"></PersonInfor>
    </transition> -->
    <transition name="personInforArea">
      <div class="inforModal" v-show="status.PersonInforShow">
        <div class="inforModal-sidebar">
          <div class="sidebar-top"></div>
          <div class="close-btn" @click="closeInforModal"></div>
          <div class="sidebar-bottom"></div>
        </div>
        <div class="cont-box">
          <div class="grid-box">
            <div class="head-left"></div>
            <div class="title">
              <!-- <span v-if="allData.eneityBasicInfo[0] ? true : false">
                {{allData.eneityBasicInfo[0].properties.XM ? allData.eneityBasicInfo[0].properties.XM :'' }}
              </span>
              <span v-if="allData.eneityBasicInfo[0] ? true : false">
                {{allData.eneityBasicInfo[0].properties.SFZHM ? '('+allData.eneityBasicInfo[0].properties.SFZHM+')' : ''}}
              </span>
              <span v-if="allData.eneityBasicInfo[0] ? true : false">
                {{allData.eneityBasicInfo[0].properties.XB ? allData.eneityBasicInfo[0].properties.XB : '' }}
              </span>
              <span v-if="allData.eneityBasicInfo[0] ? true : false">
                {{allData.eneityBasicInfo[0].properties.MZ ? allData.eneityBasicInfo[0].properties.MZ : '' }}
              </span> -->
              <span class="title-infor">
                <!--<span>搜索到56个实体，</span>
                <span>106条关系，</span>-->
                <span>搜索用时 {{executeTime}} 秒</span>
              </span>
              <span @click="closeInforModal" class="guanbi"><i class="iconfont close icon-guanbi1"></i></span>
            </div>
            <div class="infor-details bar">
              <div class='div_cont' v-for="(item,index) in cardData" :key="index">      
                <p class="header_p">
                  <span class="name">{{ item.ryData.XM }}</span>
                </p>
                <div class="div_imgcont">
                  <img class="img_width" src="../../static/images/result_img/headimg.png" >
                  <div class="h_pdiv">
                    <img class="dev_line" src="../../static/images/result_img/Devider.png">
                    <p class="h_p">
                      <span class='span_cor2'>家庭总人数：</span>
                      <span class='span_cor cor_fz'>{{ item.ryTotal }}</span>
                    </p>
                    <p class="h_p">
                      <span class='span_cor2 '>家族图谱数：</span>
                      <span class='span_cor cor_fz'>{{ item.tpTotal }}</span>
                    </p>
                    <div class="h_p_2">
                      <span class='span_cor2 '>人员标签</span>
                      <div class="bq_list ">
                        <span class='span_cor tag_bg' :style="{background: getColor(items)}"  v-for="(items,index) in item.rybq" :title="items" :key="index" >{{items }}</span>
                      </div>  
                    </div>
                    <div class="h_p_2 tag_div">
                      <span class='span_cor2'>案线索标签</span>
                      <div class="bq_list  ">
                        <span class='span_cor tag_bg' :style="{background: getColor(items)}"   v-for="(items,index) in item.axbq" :title="items" :key="index">{{items }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="clear: both">
                  <p class="p_title">
                    <span class="span_ptitle" :class='{ta_bg: activeIndex == index}' v-on:click='showMapTable(index)'>图谱名称</span>
                  </p>
                  <div v-show="status.showMap">
                    <table class="table_cont">
                      <tr class="table_tr">
                        <th>图谱名称</th>
                        <th>风险等级</th>
                        <th>操作</th>
                      </tr>
                      <tr class="table_tr" v-for="(items,index) in item.tpData" :key="index">
                        <td>{{ items.tpms }}</td>
                        <td :class="items.fxdj == '高' ? 'fxdjG' : items.fxdj == '中' ?  
                        'fxdjZ' : items.fxdj == '低' ? 'fxdjD' : '' ">{{ items.fxdj }}</td>
                        <td>
                          <span class="span_img2" @click="toJoin(items)">
                            <img src="../../static/images/result_img/r4.png" title="图谱串并">
                          </span>
                          <span class="span_img2" @click="toOverlap(items)">
                            <img src="../../static/images/result_img/r5.png" title="图谱叠加">
                          </span>
                          <span class="span_img2" @click="toEdit()">
                            <img src="../../static/images/result_img/remit.png" title="查看/编辑">
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
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
    </transition>
    <!-- 谱系档案面板按钮 -->
    <div class="dtcb" v-show="status.pxdaShow" @click="openPxda">
      <span>谱系档案</span>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/components/assembly/AppHeader'
  import switchView from '@/components/assembly/SwitchView'
  import personModal from '@/components/assembly/PersonModal'
  import newsModal from '@/components/assembly/NewsModal'
  import appModal from '@/components/assembly/AppList'
	export default {
    name: 'Archives',
    components: { switchView,personModal,newsModal,appModal,appHeader },
    data () {
        return {
            path : this.$config.iosPath,
            token: "",
            //keyword: sessionStorage.keyword,
            keyword: '',
            showMap: false,// 控制元素显示/隐藏 
            showRecord: false,
            activeIndex:null,
            datalist:[],
            executeTime : 0,
            node_type: 'QB_ZP_RY',
            rid_id: sessionStorage.id,
            curEneityData: {},
            status : {
              myNavModalShow:false,
              PersonInforShow : true,
              uploadImg: false,
              personModalShow: false,
              newsModalShow: false,
              appModalShow: false,
              d3Show: true,
              pxdaShow: false,
              showMap: false
            },
            entityPropList: [],
            linksPropList: [],
            labelColors: [],
            uploadList: [],
            cardData: [],
            person: {
              name : '王刚',
              idcard : '34267811826363'
            },
            dataColor :
            {
              '收押': '#CE3632',
              '被撤销特殊群体'    :  '#FF9966',
              '被撤销重点人员'    :  '#CC3333',
              '离异'  :  '9966FF',
              '持有传播下载暴恐音视频人员':  '#6699FF',
              '视频':  '#6699FF',
              '下落不明'    :  '#A1A1A1',
              '迁出'      :   '#6699FF',
              '一般涉稳不放心人员'  : '#CC66CC',
              '逾期入境'   :  '#CC6633',
              '重点人员'   :   '#CC0000',
              '死亡'       : '#6B6B6B',
              '宗教'  :  '#3366CC',
              '宗教极端'  :  '#0099FF',
              '打击'        : '#0099FF',
              '涉案' : '#FF6633',
              '案件' : '#FF6633',
              '三类'    :   '#00CCFF',
              '被击毙'  :   '#797979',
              '非法出境'    :   '#CE3632',
              '判刑'    :   '#3399FF',
              '无户籍'  :   '#AEAEAE',
              '收养'   : '#CC66FF',
              '收教': '#D49F08',
              '前科':'#CE3632',
              '线索': '#D49F08',
              '涉稳在逃人员':'#FF6633',
              
            },
            D3ImgShow: false
        }
    },
    methods:{
      getColor(text) {
          var text2 = text.replace(/\d.+/,'');
          for(var key in this.dataColor){
              if(text2.includes(key)){
                // console.log("key",key);
                  return this.dataColor[key];
              }
          }
      },
      showMapTable(index) { 
        this.status.showMap = !this.status.showMap;
        this.activeIndex = (this.activeIndex == index ? -1 : index);
      },
      closeInforModal () {
        this.status.PersonInforShow = false;
        this.status.pxdaShow = true;
      },
      openPxda () {
        this.status.PersonInforShow = true;
        this.status.pxdaShow = false;
      },
      setIndex(index) {         
          this.activeIndex = index; 
      },
      toJoin(mapNumber) {
        // sessionStorage.mapNumber = mapNumber || '';
        sessionStorage.mapNumber = 'cbefcd76493e487b949fea212a81d1c1';
        this.$router.push({
          path: '/join',
        });
      },
      backIndex(){
        this.$router.push({
          path: '/index',
        });
      },
      toEdit(){
        window.open('http://103.229.213.147:6060/ITAP/servlet/front/JKS?type=YHDL2&PAGE=front%2FZP_SWJP.jsp%3FJZBH%3D%26ZPLX%3D%E6%B6%89%E7%A8%B3%E9%AB%98%E5%8D%B1%E4%BA%BA%E5%91%98%E5%AE%B6%E8%B0%B1%E5%9B%BE&USERID='+ sessionStorage.userName +'&PASSWORD='+ sessionStorage.passWord +'&SJH=13122223333&SFZH=000000000000000000&XM=%E7%AE%A1%E7%90%86%E5%91%98&JH=000000&TIME=&IP=&ZZJGDM=', '_blank');
      },
      toOverlap(item) {
        sessionStorage.mapNumber = item.tpid || '';
        sessionStorage.djtps = item.tpms || '';
        this.$router.push({
          path: '/overlap',
        });
      },
      getPxda () {
        this.getPxdaMsgByID();
      },
      getPxdaMsgByID () {
        let url = this.path + '/RiskAssessController/v1/getPxdaMsgByID';
        let params = new URLSearchParams();
        let me=this;
        params.append('token', me.token);  
        // params.append('id', me.rid_id);
        params.append('id', '');
        params.append('sfzhm', me.keyword);
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          } 
          if (response.data.code == 200) {
            var data = [];
            data = response.data.data.pxdaData;
            me.executeTime = response.data.data.executeTime;
            data.forEach(function(item){
              item.rybq = item.rybq.split(',');
              item.axbq = item.axbq.split(',');
            })
            me.cardData = data;
            me.D3ImgShow = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      getViewIndex (index) {
        var me = this;
        me.status.newsModalShow = false;
        me.status.appModalShow = false;
        me.status.personModalShow = false;
        if (index == '0') {
          me.status.personModalShow = true;
        }else if(index == '1'){    
          me.status.newsModalShow = true;
        }else if(index == '2'){
          me.status.appModalShow = true;
        }
      },
      handleBeforeUpload(file) {
          // 创建一个 FileReader 对象
          let reader = new FileReader()
          // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
          // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
          // 读取文件作为 URL 可访问地址
          reader.readAsDataURL(file);
          const me = this;
          reader.onloadend = function (e) {
              file.url = reader.result;
              me.uploadList = [];
              me.uploadList.push(file);
              for(var i = 0; i < me.uploadList.length; i++){
                let j = me.uploadList[i].size/1024+'';
                let x = (j+'').indexOf(".");
               me.uploadList[i].sizes = j.substring(0,x);
              }
          };
      },
      handleRemove(file) {
        this.status.uploadImg=!this.status.uploadImg;
        this.uploadList.splice(this.uploadList.indexOf(file), 1);
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },      
      openGuide (t) {
        this.status.guidelinesShow = t;
      },
      openFeedback (t) {
        this.status.personModalShow = false;
        this.status.feedbackShow = t;
      },
      openMessageDetails (txt) {
        var me = this;
        me.status.newsModalShow = false;
        me.msgType = 'name' + (txt+1);
        me.status.messageDetailsShow = true;
        this.$refs.messageDetails.getMessageType(me.msgType);
      },
      closeApp (f) {
        this.status.appModalShow = f;
      },
      getEntityLinksConfig () {
        let me = this;
        let params = new URLSearchParams();
        let url = me.path+'/Initialize/v1/getInitializeConfig?&token='+me.token;
        //params.append('token', me.token);
        this.$axios.get(url, params).then(response => {
          if (response.data.code != 200) {
            return false;
          }
          me.entityPropList = response.data.data.nodeConfig;
          me.linksPropList = response.data.data.linkConfig;
          me.iconsList = response.data.data.nodeIconConfig;
          me.labelColors = response.data.data.labelColors;
          me.iconsList.map(item=>{
            for(let i in item){
              if (i=='path_1') {
                item['path_n'] = item[i];
              }
            }
          })
          me.opt = me.buildOpt();
        })
        .catch(error => {
          console.log(error);
        });
      },
      hidePersonInfor (data) {
        this.status.PersonInforShow = data;
      },
    },
    created() {
      console.log(this.rid_rd);
      this.getPxdaMsgByID();
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
  .main_cont {
    position: relative;
    z-index: 3;
    overflow: hidden;
    height:100%;
  }
  .row{
    .post(a);
    left:0;
    top:68px;
    right:0;
    bottom:0;
  }
  header{
    height:68px;
    .post(a);
    left:0;
    top:0;
    right:0;
    overflow:hidden;
    //background:pink;
    .logo{
      width:570px;
      height:64px;
      line-height: 64px;
      float:left;
      background:url(../../static/images/logo-bg.png) 0 0 no-repeat;
      .proj-name{
        font-size: 20px;
        font-weight: bold;
        margin-left:28px;
        color: #ffffff;
        //text-shadow: -2px 2px 3px #000;
        
        background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
        
      }
      .nav{
        // margin-left:70px;
        .post(a);
        left:386px;
        top:0;
        font-size:14px;
        font-weight:400;
        color:rgba(98,128,199,1);
        text-shadow:0px 1px 1px rgba(0, 0, 0, 0.75);
        .nav-cur{
          color: #fff;
          text-shadow:0px 1px 1px rgba(0, 0, 0, 0.75);
        }
      }
    }
    .result-search-box{
      width: 27.8%;
      height: 47px;
      .post(a);
      top: 5px;
      left:50%;
      margin-left:-13.9%;
      z-index: 99;
      .input{
        .post(a);
        left:0;
        right:77px;
        .iconfont{
          font-size:20px;
          color:#b7deff;
          cursor:pointer;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
        i:nth-child(1){
          .post(a);
          right:20px;
          top:12px;
        }
        i:nth-child(2){
          .post(a);
          right:25px;
          top:10px;
        }
        input{
          width:100%;
          padding:0 55px 0 20px;
          height:50px;
          line-height:50px;
          outline: none;
          border:none;
          font-size:14px;
          color:#fff;
          background:url(../../static/images/input.png) 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
      .search-btn{
        .post(a);
        top:0;
        right:0;
        width:80px;
        height:33px;
        // float:right;
        line-height:33px;
        text-align: center;
        cursor: pointer;
        color:#fff;
        margin-top:9px;
        font-size:14px;
        font-weight:bold;
        display:inline-block;
        background:url(../../static/images/search-btn.png) 0 0 no-repeat;
        background-size:100% 100%;
        span{
          background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
          -webkit-background-clip: text;         /* 规定背景的划分区域 */
          -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
        }
        
      }
    }
    .r_btn{
      // width: 471px;
      width: 438px;
      height: 38px;
      // top: 12px;
      top: 10px; 
      right: 18px;
      .post(a);
      .btn{
        width:157px;
        height:38px;
        line-height:38px;
        float:left;
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        .post(a);
        background:url(../../static/images/check.png) 0 0 no-repeat;
        .parallelogram{
          // width: 100%;   
          // height: 100%;   
          // background:url(../../static/images/check.png) 0 0 no-repeat;
          // background-size:100%;
          // float:right;
          // transform:skew(-30deg);   
          // -webkit-transform: skew(-30deg);   
          // -moz-transform: skew(-30deg);   
          // -o-transform:skew(-30deg);   
          // -ms-transform:skew(-30deg);   
          // background-color: #1753df;    
        }
        span:nth-child(2){
          background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
          -webkit-background-clip: text;         /* 规定背景的划分区域 */
          -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
        }
      }
      .current{
        background:url(../../static/images/checked.png) 0 0 no-repeat;
      }
      .personal{
        //left: 33px;
        left:0;
      }
      .news{
        //left: 173px;
        left:140px;
      }
      .app{
        //left: 314px;
        left:280px;
      }
    }
  }
  .upload-picture{
    width: 27.8%;
    min-height:153px;
    .post(a);
    top:47px;
    left:50%;
    margin-left:-13.9%;
    //height: 118px;
    z-index:99999;
    background-color: rgba(2, 18, 58, 0.8);
    box-shadow: 0px 5px 14px 0px 
      #011435;
    .upload-list{
      li{
        color: #44b6ff;
        .img{
          margin: 0 10px 0 10px;
          position: relative;
          top: 3px;
          .iconfont{
            font-size:20px;
          }
        }
        .name{
          display: inline-block;
          line-height: 24px;
        }
        .size{
          position: relative;
          top: 1px;
          margin: 0 20px;
        }
        .progress{
          display:inline-block;
          width:200px;
          height:30px;
        }
        .ivu-icon{
          font-size:17px;
          cursor: pointer;
          position: relative;
          top: 1px;
        }
      }
    }
  }
  .result-cont{
      .post(a);
      left:0;
      top:68px;
      right:0;
      bottom:0;
      overflow-x:hidden;
      .condition-filter-mark{
        top:0;
        left:0;
        bottom:6px;
        // width:241px;
        width:278px;
        background-color: rgba(37,83,176,0.2);
        border: solid 1px #183e85;
        border-left:none;
        overflow-y:scroll;
        overflow-x:hidden;
        .post(a);
        .filter{
          .post(r);
          margin:1px 0 7px 0;
          padding-left: 2px;
          //border-bottom:1px solid #183e85;
          .title{
            color: #3aa8fb;
            font-size: 14px;
          }
          .separate-icon{
            width:6px;
            height:3px;
            background:#55a9f8;
            display:inline-block;
            .post(a);
            right:0;
            bottom:-2px;
          }
          .condition-list{
            // max-height:322px;
            overflow-y:auto; 
          }
        }
      }
      .d3{
        .post(a);
        top:2px;
        left:0;
        right:0; 
        bottom:6px;
        background:url(../../static/images/net.png) repeat #ffffff;
        border: solid 2px #91b5ff;
        border-radius:5px 5px 0 0;
        -moz-box-shadow: 0px 0px 9px #666 inset;
        -webkit-box-shadow: 0px 0px 9px #666 inset;
        box-shadow: 0px 0px 9px #666 inset;
        .title{
          position: absolute;
          top: -3px;
          left: -2px;
          right: -2px;
          border-radius:5px 5px 0 0;
          height: 44px;
          line-height: 44px;
          background-color: #c7d7eb;
          overflow:hidden;
          .tplx-title{
            font-size:16px;
            color: #2698ed;
            margin-left:16px;
            float:left;
          }
          .search-result{
            font-size:16px;
            color: #2698ed;
            margin-left:16px;
            float:left;
          }
        }
        .add-modal{
          width:377px;
          .post(a);
          right:5px;
          top:58px;
          z-index:9999;
          background: -webkit-linear-gradient(left top, #11296d, #0c1837) ;
          .head{
            width:100%;
            height:46px;
            line-height:46px;
            background-image: linear-gradient(180deg, rgba(10, 53, 167, 0.95) 0%, rgba(4, 33, 110, 0.95) 100%), linear-gradient(#ffffff, #ffffff);
            background-blend-mode: normal, normal;
            border-bottom:1px solid #163da8;
            overflow:hidden;
            .add-title{
              font-size:16px;
              color:#fff;
              margin-left:17px;
              float:left;
            }
            .close-add-modal{
              cursor: pointer;
              margin-right:10px;
              float:right;
              height:46px;
              line-height:46px;
              display: inline-block;
              .iconfont{
                font-size:20px;
                color:#fff;
              }
            }
          }
          .icon{
            width:198px;
            height:6px;
            position:absolute;
            z-index:9999;
            bottom:0;
            left:50%;
            margin-left:-99px;
            border-width:0 5px 6px 5px;
            border-style:none solid solid;
            border-color:transparent transparent #fff;   
            //border-color:rgba(255,255,255,0.8);
          }
          .content{
            padding:12px 13px 20px 16px;
            max-height:300px;
            overflow-y: auto;
            position:relative;
            background:url(../../static/images/grid.png) 0 0 repeat;
            ul{
              margin-bottom:20px;
              li.li{
                overflow:hidden;
                margin-bottom:10px;
                .property-title{
                  display:inline-block;
                  width:64px;
                  color: #3a8bbf;
                  float:left;
                }
                input{
                  color: #5cb9ff;
                  text-indent: 6px;
                  width:277px;
                  height:30px;
                  line-height:30px;
                  outline: none;
                  border:1px solid #1f3b87;
                  background:#061339;
                }
                label{
                  color: #3a8bbf;
                }
              }
              .stzj{
                margin-bottom:11px; 
                textarea{
                  width:277px;
                  height:90px;
                  border:1px solid #1f3b87;
                  background:#061339;
                  outline: none;
                  color: #5cb9ff;
                  text-indent: 6px;
                  resize:none;
                }
              }
              .stlx{
                input{
                  height: 44px;
                }
              }
              .gxx{
                input{
                  height: 44px;
                }
              }
            }
            .btn{
              width:100%;
              height:42px;
              overflow:hidden;
              span{
                width:99px;
                line-height:42px;
                height:42px;
                text-align: center;
                float:right;
                color: #bce2ff;
                font-size: 14px;
                cursor:pointer;
                background:url(../../static/images/modal-btn.png) 0 0 no-repeat;
              }
              span:nth-child(1){
                margin-left:7px;
              }
            }
          }
        }
        .graphical{
          .post(a);
          // top: 44px;
          top:41px; 
          left: 0;
          bottom: 0;
          right: 0;
          overflow:hidden;
          .risk-level{
            width:285px;
            height:198px;
            .post(a);
            top:25px;
            right:30px;
            border:4px solid #4690d1;
            z-index:999;
            background: #c7eefe;
            .level{
              padding-left: 4%;
              height:35px;
              line-height: 35px;
              color:#636363;
              margin-bottom: 25px;
              font-size: 16px;
              font-weight: bold;
              border-bottom: 2px solid #7197b1;
            }
            .circle{
              width:75px;
              height:75px;
              margin:12px 28px 0 15px;
              float:left;
              .ivu-chart-circle-inner{
                span{
                  font-size: 14px;
                }
              }
            }
            .num-people{
              width:158px;
              height:130px;
              float:left;
              p{
                font-size: 16px;
                font-weight: bold;
                color:#555555;
              }
              ul{
                overflow-y: auto;
                height: 105px;
                li{
                  height:20px;
                  font-size: 14px;
                  font-weight: bold;
                  color:#555555;
                  overflow:hidden;
                }
              }
            }
            .num-people ul::-webkit-scrollbar{width:6px;height:6px;}
            .num-people ul::-webkit-scrollbar-track{border-radius:5px;background:none;}
            .num-people ul::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
            .num-people ul::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
            .num-people ul::-webkit-scrollbar-corner{background-color:#dadada;}
          }
          .func-btn-group{
            .post(a);
            top:20px;
            left:0;
            height:30px;
            z-index:999;
            .group-left{
              float:left;
              // margin-top:13px;
              height:30px;
              ul{
                overflow:hidden;
                li{
                  float:left;
                  color:#899aae;
                  text-align: center;
                  line-height:30px;
                  margin-left:21px;
                  cursor:pointer;
                  .iconfont{
                    font-size:20px;
                  }
                }
                li:last-child{
                  width:1px;
                  height:23px;
                  background:#b4c4d9;
                  position:relative;
                  top:5px;
                  display:none;
                }
              }
            }
            .group-right{
              float:left;
              // margin-top:13px;
              margin-left:21px;
              height:30px;
              border-radius:2px;
              ul{
                overflow:hidden;
                li{
                  float:left;
                  // width:38px;
                  height:30px;
                  color:#899aae;
                  background:#edf2f8;
                  text-align: center;
                  line-height:30px;
                  cursor:pointer;
                  border:1px solid #c8d3e1;
                  .iconfont{
                    font-size:20px;
                  }
                }
                li:nth-child(1){
                  width:39px;
                  border-right:none;
                  border-radius:2px 0 0 2px;
                  .iconfont{
                    font-size:24px;
                  }
                }
                li:nth-child(2){
                  width:40px;
                  .iconfont{
                    font-size:25px;
                  }
                }
                li:nth-child(3){
                  width:39px;
                  border-left:none;
                  border-radius:0 2px 2px 0;
                }
              }
            }
          }
        }
      }
  }
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
        background: url('../../static/images/sidebar-top.png') 0 0 no-repeat;
         background-size: 100% 100%; 
      }
      .sidebar-bottom{
        position: absolute;
        width: 9px;
         height: 24.5%; 
        // height: 246px;
        bottom: 0;
        right: 0;
        background: url('../../static/images/sidebar-bottom.png') 0 0 no-repeat;
         background-size: 100% 100%; 
      }
      .close-btn{
        position:absolute;
        top: 28%;
        width: 17px;
        height: 43.7%;
        z-index: 99;
        cursor: pointer;
        background: url('../../static/images/close-btn.png') 0 0 no-repeat;
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
        background:url('../../static/images/grid.png') repeat repeat;
        .head-left{
          width:9px;
          height:44px;
          position:absolute;
          left:-9px;
          top:0;
          background: url('../../static/images/vertical-line.jpg') repeat-x;
          background-size: 100% 100%;
        }
        .title{
          width: 100%;
          /* height: 47px;
          line-height: 47px; */
          height: 44px;
          line-height: 44px;
          position: relative;
          background: url('../../static/images/vertical-line.jpg') repeat-x;
          background-size: 100% 100%;
          // span:nth-child(1){
          //   font-size: 16px;
          //   color: #fff;
          //   margin-left: 6px;
          // }
          // span:nth-child(2){
          //   font-size: 12px;
          //   color: #fff;
          // }
          // span:nth-child(3){
          //   font-size: 14px;
          //   margin: 0 10px 0 16px;
          //   color: #5cb9ff;
          // }
          // span:nth-child(4){
          //   font-size: 14px;
          //   color: #5cb9ff;
          // }
          .title-infor{
            span{
              font-size:16px;
              color:#fff;
            }
          }
          .iconfont{
            font-size:20px;
            // position:absolute;
            // top:1px;
            // right:12px;
            color:#fff;
            cursor:pointer;
          }
        }
        .guanbi{
          width:44px;
          height:44px;
          position:absolute;
          right:8px;
          top:0;
          text-align: center;
        }
        .infor-details{
          position:absolute;
          right:10px;
          top:47px;
          bottom:0;
          /* left: 8px; */
          left: 0;
          overflow-y: auto;
        }
      }
    }
  }
  .div_cont {
    float: left;
    margin:20px;
    width:477px;
    min-height:220px;
    border:1px solid #317DE2;
    background-color:#12325B;
    border-radius:10px;
    overflow: hidden;
  }
  .header_p {
    margin: 0 auto;
    width:90%;
    padding:10px 0;
    border-bottom: 1px dashed rgba(255,255,255,.05);

  }
  
 .img_width {
    float: left;
    margin-top:10px;
    margin-right:20px;
    width:80px;
    border-radius:10px;
 }
  .font_style {
    text-align:left;padding-left:10px;
  }
  .div_dash {
    width:100%;
    height:0;
    border-bottom: 1px dashed #fff;
  }
  .span_tag {
    float: left;
    display:inline-block;
    width:50%;
    text-align: center;
    color:#1088E9;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .span_ptitle {
    display:inline-block;
    width:100%;
    text-align: center;
    color:#1088E9;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .h_pdiv {
    float:left;
    position: relative;
    width:280px;
  }
  .dev_line {
    position: absolute;
    top:30px;
    left:96px;
  }
  .h_p {
    position: relative;
    min-height:20px;
    font-size: 14px;
  }
 
  .h_p_2 {
    position: relative;
    min-height:20px;
    font-size: 14px;
    .bq_list{
      margin-left:119px;
      width: 200px;
    }
  }
  .span_cor {
    display:inline-block;
    font-size: 12px;
    color:#E6E6E6;
    border-radius:4px;
    margin-right:6px;
    color:rgba(0,0,0,1);
    width:68px;
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .span_align {
    height:40px;
    line-height: 40px;
  }
  
  .span_img1 {
    float:right;
    display:inline-block;
    margin-left:10px;
    width:40px;
    height:24px;
    line-height:24px;
    font-size:14px;
    text-align:center;
    cursor: pointer;
  }
  .span_img2 {
    float:right;
    display:inline-block;
    width:40px;
    height:24px;
    line-height:24px;
    font-size:14px;
    text-align:center;
    cursor: pointer;
  }
  .p_title {
    background-color: rgba(255,255,255,0.05);
    height:40px;overflow: hidden;
    border-top:1px solid #5B78BD;
  }
  .p_cont {
    margin: 0 auto;
    width:100%;
    padding:10px 10px;
    border-bottom: 1px solid #5B78BD;
  }
  .p_cont2 {
    margin: 0 auto;
    width:100%;
    padding:10px 10px;
    border: 0;
  }
  .span_title {
    display:inline-block;
    margin-left:4px;
    font-size:14px;
    color:#1088E9;
  }
  .white {
    background-color:rgba(1,115,255,0.3);
    color: #fff;
  }
  .bor_color {
    border:1px solid #0173FF;
    box-shadow:0px 0px 12px 0px rgba(24,123,255,0.6);
  }
  .table_bg {
    background-color: #12325B;
    color:#6CB4EC;
    font-size:14px;
  }

  .table_cont {
    width:100%;
    .table_tr {
      height:40px;
      line-height: 40px;
      color:#6CB4EC;
      th {
        width:33.33%;
        font-size: 14px;
      }
      td{
        width: 33.33%;
        text-align: center;
        font-size:14px;
        color:#6CB4EC;
        border-top: 1px solid rgba(255,255,255,.05);
      }
      .fxdjG{
        color:rgba(181,42,42,1);
      }
      .fxdjZ{
        color:rgba(209,193,85,1);
      }
      .fxdjD{
        color:rgba(108,180,236,1);
      }
    }
  }
  // .main_cont {
  //   position: relative;
  //   z-index: 3;
  //   overflow: hidden;
  // }
  .name {
    text-align:center;
    font-size:16px;
    color:#fff;
  }
  .check_res {
    display:inline-block;
    margin-left:4px;
    font-size:16px;
    color:#2698ED;
    cursor: pointer;
  }
  .div_imgcont {
    margin: 0 auto;
    padding:10px 0;
    height:150px;
    width:90%;

  }
  .people_number {
    float:right;
    display:inline-block;
    margin-left:10px;
    width:80px;
    border-radius:4px;
    font-size:16px;
    text-align:center;
    color:#000;
    background-color:#D49F08;
  }
  .previous {
    float:right;
    display:inline-block;
    margin-right:4px;
    padding-left: 4px;
    padding-right: 4px;
    /*width:40px;*/
    border-radius:4px;
    font-size:16px;
    text-align:center;
    color:#000;
    background-color:#CE3632;
  }
  .header_p {
    margin: 0 auto;
    width:90%;
    padding:10px 0;
    border-bottom: 1px dashed rgba(255,255,255,.05);

  }
  
 .img_width {
    float: left;
    margin-top:10px;
    margin-right:20px;
    width:80px;
    border-radius:10px;
 }
  .font_style {
    text-align:left;padding-left:10px;
  }
  .div_dash {
    width:100%;
    height:0;
    border-bottom: 1px dashed #fff;
  }
  .span_tag {
    float: left;
    display:inline-block;
    width:50%;
    text-align: center;
    color:#1088E9;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .span_ptitle {
    display:inline-block;
    width:100%;
    text-align: center;
    color:#1088E9;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .h_pdiv {
    float:left;
    position: relative;
    width:280px;
  }
  .span_cor2 {
    float: left;
    display:inline-block;
    font-size:14px;
    color:#5097CB;
  }
  .span_img2 {
    float:right;
    display:inline-block;
    width:40px;
    height:24px;
    line-height:24px;
    font-size:14px;
    text-align:center;
    cursor: pointer;
  }
 
  .tag_bg {
    width:50px;
    padding-left:6px;
    padding-right:6px;
    border-radius:12px;
    background-color: #CE3632;
    white-space: nowrap; 
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ta_bg {
    background-color: rgba(1,115,255,0.3);
    color: #fff;
  }
  .p_title {
    background-color: rgba(255,255,255,0.05);
    height:40px;overflow: hidden;
    border-top:1px solid #5B78BD;
  }
  .p_cont {
    margin: 0 auto;
    width:100%;
    padding:10px 10px;
    border-bottom: 1px solid #5B78BD;
  }
  .p_cont2 {
    margin: 0 auto;
    width:100%;
    padding:10px 10px;
    border: 0;
  }
  .span_title {
    display:inline-block;
    margin-left:4px;
    font-size:14px;
    color:#1088E9;
  }
  .white {
    background-color:rgba(1,115,255,0.3);
    color: #fff;
  }
  .bor_color {
    border:1px solid #0173FF;
    box-shadow:0px 0px 12px 0px rgba(24,123,255,0.6);
  }
  .table_bg {
    background-color: #12325B;
    color:#6CB4EC;
    font-size:14px;
  }
  .cor_fz {
    color:#E6E6E6;
  }

  .dtcb{
    width:43px;
    height:134px;
    color:#fff;
    font-size:14px;
    position:absolute;
    right:0;
    top:50%;
    cursor:pointer;
    margin-top:-67px;
    text-align:center;
    background:url('../../static/images/cb.png') 0 0 no-repeat;
    span{
      display:inline-block;
      width:20px;
      margin-top:25px;
      text-shadow: -1px 2px 1px rgba(0, 0, 0, 0.77);
    }
  }
  // 查看档案
  .inforModal{
    transform: translate3d(0, 0, 0);
  }
  .personInforArea-enter-active, .personInforArea-leave-active {
    transition: all .5s;
  }
  .personInforArea-enter, .personInforArea-leave-active {
    transform: translate3d(535px, 0, 0);
  }
  
  //应用列表弹框
  .app{
    transform: translate3d(0, 0, 0);
  }
  .appInforArea-enter-active, .appInforArea-leave-active {
    transition: all .5s;
  }
  .appInforArea-enter, .appInforArea-leave-active {
    transform: translate3d(400px, 0, 0);
  }


  @media screen and (max-width: 1620px){
    header{
      .result-search-box{
        left:59%;
      }
      .r_btn{
        width:306px;
        .personal{
          // left:0;
          left:-1px;
        }
        .btn{
          width:117px;
        }
        .news{
          // left:98px;
          left:98px;
        }
        .app{
          // left:196px;
          left:197px;
        }
      }
    }
    .upload-picture{
      left:59%;
    }
  }
</style>

<style lang="less">
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
  .bar::-webkit-scrollbar{width:6px;height:6px;}
  .bar::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .bar::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .bar::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .bar::-webkit-scrollbar-corner{background-color:#dadada;}
</style>