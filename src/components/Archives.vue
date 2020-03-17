<!-- 21 -->
<template>
  <div 
  class="main_cont" 
  @click="myNavModalShow=false;
  statusList.uploadImg=false;
  statusList.personModalShow=false;
  statusList.newsModalShow=false;
  statusList.appModalShow=false">
    <app-header 
      ref="appHeader"
      :items="statusList" 
      title="谱系档案" 
      :showSearch=true
      @on-search="getPxda">
    </app-header>
   
    <!-- 上传图片 -->
    <div class="upload-picture" v-show="statusList.uploadImg" @click.stop="statusList.uploadImg=!statusList.uploadImg">
      <ul class="upload-list" @click.stop="statusList.uploadImg=!statusList.uploadImg">
        <li v-for="(item,index) in uploadList" :key="index">
          <span class="img"><i class="iconfont icon-tupian"></i></span>
          <span class="name">{{item.name}}</span>
          <span class="size">{{item.sizes+'KB'}}</span>
          <span class="progress"><Progress :percent="100"></Progress></span>
          <!-- <span @click.native="handleRemove(item)"><i class="iconfont icon-guanbi2fill"></i></span> -->
          <Icon type="md-close-circle" @click.native="handleRemove(item)"></Icon>
        </li>
      </ul>
      <Upload 
        ref="upload" 
        :show-upload-list="false" 
        :format="['jpg','jpeg','png']" 
        :max-size="2048" 
        :before-upload="handleBeforeUpload" 
        :on-format-error="handleFormatError" 
        :on-exceeded-size="handleMaxSize" 
        type="drag" 
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击上传文件，或者直接将文件拖到这里</p>
        </div>
      </Upload>
    </div>
    <!-- main主体 -->
    <div class="result-cont">
      <!-- 搜索 -->
      <div class="archives-search-box">
        <div class="search">
          <Input v-model="searchText" search @on-search="onSearch" placeholder="输入姓名、身份证号、地址信息搜索，多个条件用空格隔开" />
          <Button class="search-btn" @click="onSearch(searchText)">搜索</Button>
        </div>
      </div>
      <!-- title -->
      <div class="result-cont-title">
        <span>{{'搜索到'+archivesCard.total+'个实体'}}，</span>
        <!-- <span>106条关系，</span> -->
        <span>{{ '用时'+archivesCard.executeTime+'秒' }}</span>
      </div>
      <!-- 档案列表 -->
      <div class="archives-box bar">
        <div class="box" v-for="(item,index) in archivesCard.cardData" :key="index">
          <div class="cont">
            <div class='div_cont'>  
              <div class="tp_box" :title="item.name" @click="toArchivesMap(item)">    
                <p class="header_p">
                  <span class="name">{{ item.name }}</span>
                </p>
                <div class="div_imgcont">
                  <div class="h_pdiv">
                    <img class="dev_line" src="../../static/images/result_img/Devider.png">
                    <p class="h_p">
                      <span class='span_cor2'>家庭总人数：</span>
                      <span class='span_cor cor_fz'>{{ item.personCount }}</span>
                    </p>
                    <p class="h_p">
                      <span class='span_cor2 '>家族图谱数：</span>
                      <span class='span_cor cor_fz'>{{ item.spectrumArchiveMaps.length }}</span>
                    </p>
                    <div class="h_p_2">
                      <span class='span_cor2 '>人员标签</span>
                      <div class="bq_list bar">
                        <div class="bq-box" v-for="(val,key,index) in item.personLabel" :key="index">
                          <span class='span_cor tag_bg' :style="{background:dataColor[key]}" :title="key">
                            {{ key }}
                            <span class="corner" :style="{background:dataColor[key]}">{{ val }}</span>
                          </span>
                        </div>
                      </div>  
                    </div>
                    <!-- <div class="h_p_2 tag_div">
                      <span class='span_cor2'>案线索标签</span>
                      <div class="bq_list  ">
                        <span class='span_cor tag_bg' :style="{background: getColor(items)}"   v-for="(items,index) in item.axbq" :title="items" :key="index">{{items }}</span>
                      </div>
                    </div> -->
                    <p class="h_p">
                      <span class='span_cor2 '>风险等级：</span>
                      <span class='span_cor cor_fz'>{{ item.riskLevel }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div style="clear: both">
                <p class="p_title">
                  <span class="span_ptitle" :class='{ta_bg: activeIndex == index}' v-on:click='showMapTable(index,item.archiveId)'>图谱名称</span>
                </p>
                <div v-if="activeIndex==index" class="p-cont bar">
                  <table class="table_cont">
                    <tr class="table_tr">
                      <th>图谱名称</th>
                      <th>风险等级</th>
                      <!-- <th>操作</th> -->
                    </tr>
                    <tr class="table_tr" v-for="(items,index) in item.spectrumArchiveMaps" :key="index">
                      <td class="fxdtP" :title="items.mapName" @click="toArchivesJoin(items.mapId)">{{ items.mapName }}</td>
                      <td :class="items.riskLevel == '高' ? 'fxdjG' : items.riskLevel == '中' ?  
                      'fxdjZ' : items.riskLevel == '低' ? 'fxdjD' : '' ">{{ items.riskLevel }}</td>
                      <!-- <td>
                        <span class="span_img2" @click="toJoin(items)">
                          <img src="../../static/images/result_img/r4.png" title="图谱串并">
                        </span>
                        <span class="span_img2" @click="toOverlap(items)">
                          <img src="../../static/images/result_img/r5.png" title="图谱叠加">
                        </span>
                        <span class="span_img2" @click="toEdit()">
                          <img src="../../static/images/result_img/remit.png" title="查看/编辑">
                        </span>
                      </td> -->
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 我的导航 -->
    <transition name="appInforArea">
      <myNavModal v-show="myNavModalShow" @closemyNavModal="closemyNav" ref="myNavModal"></myNavModal>
    </transition>

    <!-- 个人弹框 -->
    <personModal v-show="statusList.personModalShow" ref="personModal" @openMyNavModal="openMyNav"  @openGuideModal="openGuide" v-on:openFeedbackModal="openFeedback"></personModal>

    <!-- 消息框 -->
    <newsModal v-show="statusList.newsModalShow" ref="newsModal" @openNewsModal="openMessageDetails"></newsModal>

    <!-- 应用列表弹框 -->
    <transition name="appInforArea">
      <appModal v-show="statusList.appModalShow" ref="appModal" @closeAppModal="closeApp" class="app"></appModal>
    </transition>
    <!-- 查看档案面板 -->
    <!-- <transition name="personInforArea">
      <PersonInfor ref="PersonInfor" :modal="!curEneityAllData.eneityTrajectoryInfo.dataTypes ? '' : curEneityAllData" v-if="statusList.PersonInforShow" @listenToChild="hidePersonInfor" @switchTrajectory="switchTrajectory" @changeTime="changeTime" class="personInfo"></PersonInfor>
    </transition> -->
    
    <!-- 谱系档案面板按钮 -->
    <div class="dtcb" v-show="statusList.pxdaShow" @click="openPxda">
      <span>谱系档案</span>
    </div>

    <div class="page-box">
      <Page :total="archivesCard.total" :page-size="archivesCard.pageSize" :current="archivesCard.pageIndex" @on-change="getArchivesCardData" show-elevator/>
    </div>

    <!-- 获取谱系档案loading -->
    <div class="archives-loading-bg" v-show="statusList.archivesLoadingShow">
      <div class="archives-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/components/assembly/AppHeader'
  import personModal from '@/components/assembly/PersonModal'
  import newsModal from '@/components/assembly/NewsModal'
  import appModal from '@/components/assembly/AppList'
  import myNavModal from '@/components/assembly/MyNav'
	export default {
    name: 'Archives',
    components: { myNavModal, appHeader,personModal,newsModal,appModal },
    data () {
        return {
            myNavModalShow:false, 
            path : this.$config.joinPath,
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
            statusList : {
              PersonInforShow : true,
              uploadImg: false,
              personModalShow: false,
              newsModalShow: false,
              appModalShow: false,
              d3Show: true,
              pxdaShow: false,
              showMap: false,
              archivesLoadingShow: false
            },
            entityPropList: [],
            linksPropList: [],
            labelColors: [],
            uploadList: [],
            archivesCard: {
              cardData: [],
              pageIndex: 1,
              pageSize: 12,
              total: 0,
              executeTime: 0
            },
            person: {
              name : '王刚',
              idcard : '34267811826363'
            },
            dataColor :
            {
              '被收押人员': '#CE3632',
              '被撤销特殊群体'    :  '#FF9966',
              '被撤销重点人员'    :  '#CC3333',
              '离异'  :  '#9966FF',
              '持有传播下载暴恐音视频人员':  '#6699FF',
              '视频':  '#6699FF',
              '下落不明人员'    :  '#A1A1A1',
              '迁出本县市'      :   '#6699FF',
              '一般渉稳不放心人员'  : '#CC66CC',
              '逾期入境'   :  '#CC6633',
              '重点人员'   :   '#CC0000',
              '死亡'       : '#6B6B6B',
              '宗教'  :  '#3366CC',
              '宗教“两面人”'  :  '#3366CC',
              '宗教极端'  :  '#0099FF',
              '打击'        : '#0099FF',
              '涉案' : '#FF6633',
              '案件' : '#FF6633',
              '三类'    :   '#00CCFF',
              '被击毙人员'  :   '#797979',
              '非法出境'    :   '#CE3632',
              '判刑人员'    :   '#3399FF',
              '无户籍'  :   '#AEAEAE',
              '收养'   : '#CC66FF',
              '收教': '#D49F08',
              '前科':'#CE3632',
              '线索': '#D49F08',
              '涉稳在逃人员':'#FF6633', 
            },
            //D3ImgShow: false
        }
    },
    created() {
      // 获取其他页面跳转来携带的 搜索结果
      this.keyword = this.$route.query.searchText || '';
      this.getPxdaMsgByID();
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
      showMapTable(index,id) { 
        console.log(index,id);
        console.log(this.activeIndex);
        // this.statusList.showMap = !this.statusList.showMap;
        this.activeIndex = (this.activeIndex == index ? -1 : index);
      },
      toArchivesMap (item) {
        // 判断是否有访问页面的权限
        // if(this.hasPageAuth(this.constantPageMap.PAGE_ArchivesMap_ID)){
        // 力导向页面的权限
        if(this.hasFunAuth(this.constantFunMap.FUN_Archives_View_ID)){
          this.$router.push({
            path: '/pedigreeDetail',//archivesmap
            query: {
              archiveId : item.archiveId,
              title : item.name,
              mc : '谱系档案'
            }
          });
        } else {
          this.$Message.info(this.constantNoAuthData)
        }         
      },
      toArchivesJoin (tpid) {
        // 判断是否有访问页面的权限
        // if(this.hasPageAuth(this.constantPageMap.PAGE_ArchivesJoin_ID)){
        // 共用页面功能点图谱查看权限
        if(this.hasFunAuth(this.constantFunMap.FUN_Common_Map_ID)){
          this.$router.push({
            path: '/archivesjoin',
            query: {
              tpids : tpid,
              mc : '谱系档案'
            }
          });
        } else {
          this.$Message.info(this.constantNoAuthData)
        } 
      },
      closeInforModal () {
        this.statusList.PersonInforShow = false;
        this.statusList.pxdaShow = true;
      },
      openPxda () {
        this.statusList.PersonInforShow = true;
        this.statusList.pxdaShow = false;
      },
      // setIndex(index) {         
      //   this.activeIndex = index; 
      // },
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
      getPxda (searchText) {
        this.archivesCard.pageIndex = 1;
        this.keyword = searchText;
        this.getPxdaMsgByID();
      },
      /**
       * 获取谱系档案数据
       * @function getData
       * @author erbing
       */
      getPxdaMsgByID () {
        //let url = this.path + '/RiskAssessController/v1/getPxdaMsgByID';
        let url = this.path + 'GenealogyArchivesResource/v1/GenealogyArchives/card';
        let params = new URLSearchParams();
        let me=this;
        params.append('token', me.token);
        params.append('keyword', me.keyword);  
        params.append('pageIndex', me.archivesCard.pageIndex);
        params.append('pageSize', me.archivesCard.pageSize);
        // params.append('id', me.rid_id);
        // params.append('id', '');
        // params.append('sfzhm', me.keyword);
        this.statusList.archivesLoadingShow = true;
        this.$axios.post(url, params)
        .then(response => {
          if (response.code == 200) {
            this.statusList.archivesLoadingShow = false;
            var data = [];
            data = response.data.data;
            // data.forEach(function(item){
            //   item.rybq = item.rybq.split(',');
            //   item.axbq = item.axbq.split(',');
            // })
            me.archivesCard.cardData = data;
            me.archivesCard.executeTime = response.data.executeTime;
            me.archivesCard.total = response.data.total;
            //me.D3ImgShow = true;
          }else{
            me.$Message.warning(response.message);
            me.statusList.archivesLoadingShow = false;
            me.archivesCard.cardData = [];
            me.archivesCard.executeTime = 0;
            me.archivesCard.total = 0;
            //me.D3ImgShow = true;
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
      },
      /**
       * 获取谱系档案数据--分页
       * @function getData
       * @author erbing
       */
      getArchivesCardData (page) {
        this.activeIndex = null;
        this.archivesCard.pageIndex = page;
        this.getPxdaMsgByID();
      },
      getViewIndex (index) {
        var me = this;
        me.statusList.newsModalShow = false;
        me.statusList.appModalShow = false;
        me.statusList.personModalShow = false;
        if (index == '0') {
          me.statusList.personModalShow = true;
        }else if(index == '1'){    
          me.statusList.newsModalShow = true;
        }else if(index == '2'){
          me.statusList.appModalShow = true;
          me.myNavModalShow = false;
        }
      },
          /**
     * 打开我的导航
     * @function openMyNav
     */
    openMyNav (t) {
      this.$refs['myNavModal'].getDataList();
      this.statusList.personModalShow = false;
      this.myNavModalShow = t;
      // alert(121)
    },
    /**
     * 关闭我的导航
     * @function closemyNav
     */
    closemyNav (f) {
      this.myNavModalShow = f;
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
        this.statusList.uploadImg=!this.statusList.uploadImg;
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
        this.statusList.guidelinesShow = t;
      },
      openFeedback (t) {
        this.statusList.personModalShow = false;
        this.statusList.feedbackShow = t;
      },
      openMessageDetails (txt) {
        var me = this;
        me.statusList.newsModalShow = false;
        me.msgType = 'name' + (txt+1);
        me.statusList.messageDetailsShow = true;
        this.$refs.messageDetails.getMessageType(me.msgType);
      },
      closeApp (f) {
        this.statusList.appModalShow = f;
      },
      getEntityLinksConfig () {
        let me = this;
        let params = new URLSearchParams();
        let url = me.path+'/Initialize/v1/getInitializeConfig?&token='+me.token;
        //params.append('token', me.token);
        this.$axios.get(url, params).then(response => {
          if (response.code != 200) {
            return false;
          }
          me.entityPropList = response.data.nodeConfig;
          me.linksPropList = response.data.linkConfig;
          me.iconsList = response.data.nodeIconConfig;
          me.labelColors = response.data.labelColors;
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
        this.statusList.PersonInforShow = data;
      }
    },
  }
</script>

<style lang="less" scoped>
  @widthH:100%;
  .archives-search-box {
    overflow: hidden;
    .search {
      width: 50%;
      margin-top: 20px;
      margin-left: 100px;
      .ivu-input-wrapper {
        float: left;
        width: 80%;
        margin-right: 20px;
        /deep/ input {
          border: 1px solid rgb(108,129,244);
          border-radius: 0;
        }
      }
      button {
        float: left;
        background-color:rgb(108,129,244);
        color: #fff;
      }
    }
  }
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
    left: 0;
    top: 68px;
    right: 0;
    bottom: 100px;
    .result-cont-title{
      margin:15px 0 0 20px;
      span{
        font-size:16px;
        font-weight:400;
        color:rgba(38,152,237,1);
      }
    }
    .archives-box{
      width:100%;
      height:100%;
      overflow-y:auto;
      .box{
        width:25%;
        float: left;
        .cont{
          padding:10px;
          overflow: hidden;
          .div_cont {
            border:1px solid #317DE2;
            background-color:#12325B;
            border-radius:10px;
            overflow: hidden;
            position:relative;
            background: rgba(18,50,91,.8);
            border: 1px solid rgba(91, 120, 189, 1);
            box-shadow: 0px 0px 3px 0px rgba(49,125,226,0.5);
            border-radius: 8px;
            .tp_box{
              cursor: pointer;
              .header_p {
                margin: 0 auto;
                width:90%;
                padding:10px 0;
                border-bottom: 1px dashed rgba(255,255,255,.05);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .name {
                  text-align:center;
                  font-size:16px;
                  color:#fff;
                }
              }
              .div_imgcont{
                margin: 0 auto;
                padding:10px 0;
                //height:150px;
                overflow:hidden;
                width:90%;
                .img_width {
                  float: left;
                  width:80px;
                  height:111px;
                  margin-right:20px;
                  border-radius:10px;
                }
              }
            }
          }
        }
      }
    }
  }
  .page-box{
    .post(a);
    left:20px;
    bottom:20px;
    height:33px;
  }
  .archives-loading-bg{
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    z-index:99999;
    background:rgba(0,0,0,.5);
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
  .header_p {
    margin: 0 auto;
    width:90%;
    padding:10px 0;
    border-bottom: 1px dashed rgba(255,255,255,.05);
    text-align: center;
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
    width:100%;
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
      overflow-x: auto;
      padding: 10px 0;
      height: 68px;
      // width: 200px;
      .bq-box{
        display:inline-block;
        position:relative;
        margin-left:5px;
      }
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
    .corner{
      width:20px;
      height:20px;
      text-align: center;
      line-height:16px;
      font-size:12px;
      color:#000;
      display:block;
      position:absolute;
      right:-2px;
      top:-8px;
      border:1px solid rgba(18,48,92,1);
      border-radius:50%;
    }
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
    width: 33.3%;
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
  .p-cont {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 41px;
    overflow-y: auto;
    background: #24579c;
  }
  // .p_cont {
  //   margin: 0 auto;
  //   width:100%;
  //   padding:10px 10px;
  //   border-bottom: 1px solid #5B78BD;
  // }
  // .p_cont2 {
  //   margin: 0 auto;
  //   width:100%;
  //   padding:10px 10px;
  //   border: 0;
  // }
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
    table-layout: fixed;
    .table_tr {
      height:40px;
      line-height: 40px;
      // color:#6CB4EC;
      color:#fff;
      th {
        width:33.33%;
        font-size: 14px;
      }
      td{
        width: 33.33%;
        text-align: center;
        font-size:14px;
        // color:#6CB4EC;
        color:#fff;
        border-top: 1px solid rgba(255,255,255,.05);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fxdtP{
        cursor:pointer;
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
  .check_res {
    display:inline-block;
    margin-left:4px;
    font-size:16px;
    color:#2698ED;
    cursor: pointer;
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
  .span_cor2 {
    float: left;
    display:inline-block;
    font-size:14px;
    color:#5097CB;
  }
  .tag_bg {
    width:80px;
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
  @import "../assets/loading.css";
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

  // 分页
  .page-box{
    .ivu-page{
      .ivu-page-next, 
      .ivu-page-prev{
        border:1px solid #269cdb;
        background:rgba(38,156,219,.5);
        a{
          color:#fff;
        }
      }
      .ivu-page-disabled{
        a{
          color:#666;
        }
      }
      .ivu-page-options{
        .ivu-page-options-elevator{
          input{
            text-align: center;
          }
        }
      }
      .ivu-page-item{
        border-color: #2d8cf0;
        background:rgba(38,156,219,.5);
        a{
          color:#fff;
        }
      }
      .ivu-page-item-active{
        border-color: #fff;
        a{
          color:#fff;
        }
      }
    }
  }


  .bar::-webkit-scrollbar{width:6px;height:6px;}
  .bar::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .bar::-webkit-scrollbar-thumb{background-color:rgba(204, 204,204,1);border-radius:5px;}
  .bar::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .bar::-webkit-scrollbar-corner{background-color:#dadada;}
</style>