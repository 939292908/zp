<!-- 21 -->
<template>
  <div class="main_cont" @click="handleWrapperClick($event)">
    <app-header 
      ref="appHeader"
      :items="statusList"
      title="搜索结果"
      :keyword="keyword"
      :showSearch="true"
      @on-search="getAllDataByKeyWord">
      <span @click="backSearch" style="cursor:pointer;">全文检索></span>
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
    <div class="row">
      <!-- <div class="row-title">
        <span>{{'搜索到'+archivesPage.pageTotal+'个实体'}}</span>
        <span>，{{ '用时'+executeTime+'秒' }}</span>
      </div> -->
      <div class="fullText-box">
        <div class="container">
          <Tabs v-model="currentTabPaneName" :animated="false">
            <!-- 1、图谱 -->
            <TabPane :index=1 :label=" '图谱('+ archivesPageTp.pageTotal+')' " name="tupu">
              <div class="row-filters">
                <span class="filter-label">图谱类型：</span>
                <CheckboxGroup class="checkBoxButton" label="图谱类型：" v-model="mapTypeValue" @on-change="handleMapType">
                  <Checkbox
                    :key="index"
                    v-for="(item,index) in mapTypeList"
                    :label="item.id"
                    :style="{'background':item.backgroundColor,'color':item.color}"
                  >{{item.shortName}}</Checkbox>
                </CheckboxGroup>
              </div>
              <div class="row-title">
                <span>{{'搜索到'+archivesPageTp.pageTotal+'个图谱'}}</span>
                <span v-show="archivesPageTp.executeTime">，{{ '用时'+archivesPageTp.executeTime+'秒' }}</span>
              </div>
              <div class="row-cont">
                <!-- 图谱列表 -->
                <ul>
                  <li v-for="(item,index) in archivesPageTp.data" :key="index" class="tp_li">
                    <!-- 1 -->
                    <div v-html="item.property.TPMC" class="tpmc" @click="toArchivesJoin(item)">                      
                    </div>
                    <span class="tpType" v-html="item.property.label" :style="{background:$config.topTagColors[item.property.label]}"></span>
                    <!-- 2 -->
                    <p v-html="item.property.CJRDW" class="cjrdw"></p>
                    <!-- 3 -->
                    <p v-html="item.property.MAP_DESCRIPTION" class="map_description"></p>
                  </li>
                </ul>
              </div>
            </TabPane>
            <!-- 2、人员 -->
            <TabPane :index=2 :label=" '人员('+ archivesPage.pageTotal+')' " name="person">
              <div class="row-title">
                <span>{{'搜索到'+archivesPage.pageTotal+'个人员'}}</span>
                <span v-show="archivesPage.executeTime">，{{ '用时'+archivesPage.executeTime+'秒' }}</span>
              </div>
              <div class="row-cont">
                <!-- 人员列表 -->
                <ul>
                  <li v-for="(item,index) in archivesPage.data" :key="index" class="person_li">
                    <div class="person_xm">
                      <h2>
                        <span v-html="item.property.XM" @click="toVisualition(item.property.TEMPSFZHM)"></span>
                        <div class="pedigree-detail-btn person-detail-btn" @click="showPeopleDetail(item)" :style="{background: '#fff'}">人员档案<Icon type="ios-arrow-forward" /></div>
                        <div class="pedigree-detail-btn" v-if="item.archiveId"  @click="toPedigreeDetail(item)" :style="{background: setBackground(item.riskLevel)}">谱系档案<Icon type="ios-arrow-forward" /></div>
                      </h2>
                      <!-- <p>{{item.property.XM}}</p> -->
                    </div>
                    <div class="person_infor">
                      <div class="avatar"><img :src="getImagePath(item.property.picUrl)" /></div>
                      <div class="infor_box">
                        <ul>
                          <!-- 姓名 -->
                          <li class="xm">
                            <span>姓　　名：</span>
                            <span v-html="item.property.XM"></span>
                          </li>
                          <!-- 身份证 -->
                          <li class="id_number">
                            <span>身份证号：</span>
                            <span v-html="item.property.SFZHM" ></span>
                          </li>
                          <!-- 户籍地 -->
                          <li class="hjd">
                            <span>户籍地址：</span>
                            <span v-html="item.property.HJD"></span>
                          </li>
                          <!-- 个人简介 -->
                          <li class="person_description">
                            <span>个人简介：</span>
                            <span class="info" v-html="item.property.PERSON_DESCRIPTION"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </TabPane>
            <!-- 3、案件 -->
            <TabPane v-if="isShowCaseAndClue" :index=3 :label=" '案件('+ archivesPageCase.pageTotal+')' " name="case">
              <div class="row-title">
                <span>{{'搜索到'+archivesPageCase.pageTotal+'个案件'}}</span>
                <span v-show="archivesPageCase.executeTime">，{{ '用时'+archivesPageCase.executeTime+'秒' }}</span>
              </div>
              <!-- 案件列表 -->
              <div class="row-cont">
                <ul>
                  <li v-for="(item,index) in archivesPageCase.data" :key="index" class="tp_li">
                    <!-- 1 -->
                    <div v-html="item.property.name" class="tpmc" @click="toCaseDetail(item)">                      
                    </div>
                    <!-- 2 -->
                    <div class="title-info">
                      <span v-html="item.property.categoryName" class="cjrdw"></span> -
                      <span v-html="item.property.typeName" class="cjrdw"></span> -
                      <span v-html="item.property.deptName" class="cjrdw"></span> -
                      <span class="cjrdw">采集时间: </span>
                      <span v-html="item.property.createTime" class="cjrdw"></span>
                    </div>
                    <!-- 3 -->
                    <p v-html="item.property.intro" class="map_description"></p>
                  </li>
                </ul>
              </div>
            </TabPane>
            <!-- 4、线索 -->
            <TabPane v-if="isShowCaseAndClue" :index=4 :label=" '线索('+ archivesPageClue.pageTotal+')' " name="clue">
              <div class="row-title">
                <span>{{'搜索到'+archivesPageClue.pageTotal+'条线索'}}</span>
                <span v-show="archivesPageClue.executeTime">，{{ '用时'+archivesPageClue.executeTime+'秒' }}</span>
              </div>
              <!-- 线索列表 -->
              <div class="row-cont">
                <ul>
                  <li v-for="(item,index) in archivesPageClue.data" :key="index" class="tp_li">
                    <!-- 1 -->
                    <div v-html="item.property.name" class="tpmc" @click="toCaseDetail(item)">                      
                    </div>
                    <!-- 2 -->
                    <div class="title-info">
                      <span v-html="item.property.categoryName" class="cjrdw"></span> -
                      <span v-html="item.property.typeName" class="cjrdw"></span> -
                      <span v-html="item.property.deptName" class="cjrdw"></span> -
                      <span class="cjrdw">采集时间: </span>
                      <span v-html="item.property.createTime" class="cjrdw"></span>
                    </div>
                    <!-- 3 -->
                    <p v-html="item.property.intro" class="map_description"></p>
                  </li>
                </ul>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
    <!-- 1、图谱 分页 -->
    <div class="page-box">
      <Page :total="currentTabPane.data.pageTotal" :page-size="currentTabPane.data.pageSize" :current="currentTabPane.data.pageIndex" @on-change="currentTabPane.api" show-elevator/>
    </div>

    <!-- 个人信息 -->
    <transition name="personInforArea">
      <ArchivalInfor
        v-show="statusList.PersonInforShow"
        @listenToChild="hidePersonInfor"
        :tpInfo="personDataItem"
        :onlyShowBasicInformation="true"
      ></ArchivalInfor>
    </transition>

    <!-- 获取档案列表数据 -->
    <loading color="white"  v-model="statusList.archivesLoadingShow"></loading>
    <loading color="white"  v-model="statusList.archivesLoadingShowTp"></loading>
  </div>
</template>

<script>
  import switchView from '@/components/assembly/SwitchView'
  import PersonInfor from '@/components/assembly/PersonInfor'
  import ArchivalInfor from "@/components/assembly/ArchivalInfor/archivalInfor";
  import personModal from '@/components/assembly/PersonModal'
  import newsModal from '@/components/assembly/NewsModal'
  import appModal from '@/components/assembly/AppList'
  import * as commonApi from '@/api/common.js'
  import * as apis from '@/api/search/index'
  import * as collectionApis from '@/api/collection/index'
  import Loading from '@/components/assembly/Loading'
  import appHeader from "@/components/assembly/AppHeader";
	export default {
    name: 'Result',
    components: { appHeader, PersonInfor,switchView,personModal,newsModal,appModal,Loading,ArchivalInfor },
    data () {
      return {
        mapTypeList: [],
        mapTypeValue: [],
        currentTabPaneName: "tupu", // tab切换 current TabPane
        personDataItem: { // 人员列表 current人
          properties: {
            SFZHM: ""
          }
        },
        path : this.$config.joinPath,
        token: '',
        // keyword: sessionStorage.keyword,
        keyword: '',
        showMap: false,// 控制元素显示/隐藏
        showRecord: false,
        activeIndex:-1,
        activeIndex2:-1,
        nodeLength : 0,
        datalist:[],
        dataMapList:[],
        mapNumber:'',
        curEneityAllData:{
          fxpf: '',
          type: 'mark',
          rybq: [],
          imgSrc: '',
          labelBgColor: [],
          eneityBasicInfo : '',
          eneityTrajectoryInfo : {
            //dataTypes: ["all","PERMANENT_RESIDENTS", "INTERNET_BAR", "HOTEL"],
            dataTypes: [],
            data: [],
            datas: [],
            mapData: [],
            photoData: [],
            startTime: "2018-01-01",
            endTime: '',
            showDate : false,
            photoNode : [],
            //isShow : '',
            // photoData: {
            //   '0': '0.png',
            //   '1': '1.png',
            //   '2': '2.png'
            // }
          },
          eneityCorrelationInfo : {
            data: []
          }
        },
        statusList : {
          myNavModalShow:false,
          PersonInforShow : false,
          uploadImg: false,
          changeLogShow: false,
          guidelinesShow: false,
          personModalShow: false,
          newsModalShow: false,
          appModalShow: false,
          archivesLoadingShow: false,
          archivesLoadingShowTp: false,
        },
        entityPropList: [],
        linksPropList: [],
        labelColors: [],
        uploadList: [],
        tplxMapping: [],
        // 人员数据
        archivesPage: {
          data: [],
          executeTime : 0,
          pageTotal: 0,
          pageSize: 12,
          pageIndex: 1
        },
        // 图谱数据
        archivesPageTp: {
          data: [],
          executeTime : 0,
          pageTotal: 0,
          pageSize: 12,
          pageIndex: 1
        },
        // 案件数据
        archivesPageCase: {
          data: [],
          executeTime : 0,
          pageTotal: 0,
          pageSize: 12,
          pageIndex: 1
        },
        // 线索数据
        archivesPageClue: {
          data: [],
          executeTime : 0,
          pageTotal: 0,
          pageSize: 12,
          pageIndex: 1
        },
        rid_id: '',
        node_type: ''
      }
    },
    computed: {
      // 是否显示 案件/线索
      isShowCaseAndClue() {
        return this.$config.project.locale == 'aks';
      },
      // 当前TabPane
      currentTabPane() {
        switch (this.currentTabPaneName) {
          case 'tupu':
            return {
              data: this.archivesPageTp,
              api: this.getDataTp,
            }
            break;
          case 'person':
            return {
              data: this.archivesPage,
              api: this.getDataPeople,
            }
            break;
          case 'case':
            return {
              data: this.archivesPageCase,
              api: this.getDataCase,
            }
            break;
          case 'clue':
            return {
              data: this.archivesPageClue,
              api: this.getDataClue,
            }
            break;
        }
      },
    },
    methods:{
      // 获取图谱类型数据
      getMapTypes() {
        collectionApis.GET_DRAW_TP_TYPE_LIST().then(res=>{
          if(res.code == 200) {
            let data = res.data
            data.forEach(x => {
              x.backgroundColor = '#fff';
              x.color = "#515a6e";
            });
            this.mapTypeList = data;
            // this.mapTypeValue = data.map(x=>x.id)
          }
        })
      },
      // 图谱类型帅选
      handleMapType(val) {
        this.mapTypeList.map(x => {
          if (val.indexOf(x.id) != -1) {
            x.backgroundColor = this.$config.topTagColors[x.shortName];
            x.color = "#ffffff";
          } else {
            x.backgroundColor = "#fff";
            x.color = "#515a6e";
          }
        });
        this.getDataTp();
      },
      // 获取人员列表
      getDataPeople(page=1) {
        let me = this;
        me.archivesPage.pageIndex = page;
        if(me.keyword == ''){
          this.$Message.warning('搜索不能为空！');
          return;
        }
        me.statusList.archivesLoadingShow = true;

        let params = {
          keyword:me.keyword,
          pageIndex:me.archivesPage.pageIndex,
          pageSize:12,
          flag: 0
        }
        apis.intelligentSearch(params)
        .then(response => {
          if (!response.data) {
            this.statusList.archivesLoadingShow = false;
            this.nodeLength = 0;
            this.archivesPage.executeTime = '';
            this.archivesPage.pageTotal = 0;
            this.archivesPage.data = [];
            return false;
          }
          if (response.code == 200) {
            this.statusList.archivesLoadingShow = false;
            this.archivesPage.data = response.data.data;
            this.archivesPage.executeTime = response.data.executeTime;
            this.archivesPage.pageTotal = response.data.total;
            
            // 搜索结果高亮
            this.highlightResultByKeyWord(this.archivesPage.data, this.keyword);
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
      },
      // 获取图谱列表
      getDataTp(page=1) {
        let me=this;
        me.archivesPageTp.pageIndex = page;
        if(me.keyword == ''){
          this.$Message.warning('搜索不能为空！');
          return;
        }
        me.statusList.archivesLoadingShowTp = true;
        let paramsTp = {
          keyword:me.keyword,
          pageIndex:me.archivesPageTp.pageIndex,
          pageSize:12,
          flag: 1,
          mapTypes: me.mapTypeValue.join()
        }
        apis.intelligentSearchTp(paramsTp)
        .then(response => {
          if (!response.data) {
            this.statusList.archivesLoadingShowTp = false;
            this.archivesPageTp.executeTime = '';
            this.archivesPageTp.pageTotal = 0;
            me.archivesPageTp.data = [];
            return false;
          }
          if (response.code == 200) {
            me.statusList.archivesLoadingShowTp = false;
            let data = response.data.data;
            me.archivesPageTp.data = data;
            me.archivesPageTp.executeTime = response.data.executeTime;
            me.archivesPageTp.pageTotal = response.data.total;            
            // 搜索结果高亮
            me.highlightResultByKeyWord(me.archivesPageTp.data, me.keyword);
            console.log('me.archivesPageTp.data',me.archivesPageTp)
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShowTp = false;
          console.log(error);
        });
      },
      // 获取案件列表
      getDataCase(page=1) {
        let me=this;
        me.archivesPageCase.pageIndex = page;
        if(me.keyword == ''){
          this.$Message.warning('搜索不能为空！');
          return;
        }
        me.statusList.archivesLoadingShowTp = true;
        let params = {
          keyword:me.keyword,
          pageIndex:me.archivesPageCase.pageIndex,
          pageSize:12,
          flag: 0
        }
        apis.getDataCaseList(params)
        .then(res => {
          if (!res.data) {
            me.statusList.archivesLoadingShowTp = false;
            me.archivesPageCase.executeTime = '';
            me.archivesPageCase.pageTotal = 0;
            me.archivesPageCase.data = [];
            return false;
          }
          if (res.code == 200) {
            me.statusList.archivesLoadingShowTp = false;
            // 统一数据结构
            let data = res.data.data.map(item => {
              return {property: item}
            });
            me.archivesPageCase.data = data;
            me.archivesPageCase.executeTime = res.data.executeTime;
            me.archivesPageCase.pageTotal = res.data.total;            
            // 搜索结果高亮
            me.highlightResultByKeyWord(me.archivesPageCase.data, me.keyword);
            console.log('me.archivesPageCase.data',res,me.archivesPageCase)
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShowTp = false;
          console.log(error);
        });
      },
      // 获取线索列表
      getDataClue(page=1) {
        let me=this;
        me.archivesPageClue.pageIndex = page;
        if(me.keyword == ''){
          this.$Message.warning('搜索不能为空！');
          return;
        }
        me.statusList.archivesLoadingShowTp = true;
        let params = {
          keyword:me.keyword,
          pageIndex:me.archivesPageClue.pageIndex,
          pageSize:12,
          flag: 1
        }
        apis.getDataCaseList(params)
        .then(res => {
          if (!res.data) {
            me.statusList.archivesLoadingShowTp = false;
            me.archivesPageClue.executeTime = '';
            me.archivesPageClue.pageTotal = 0;
            me.archivesPageClue.data = [];
            return false;
          }
          if (res.code == 200) {
            me.statusList.archivesLoadingShowTp = false;
            // 统一数据结构
            let data = res.data.data.map(item => {
              return {property: item}
            });
            me.archivesPageClue.data = data;
            me.archivesPageClue.executeTime = res.data.executeTime;
            me.archivesPageClue.pageTotal = res.data.total;            
            // 搜索结果高亮
            me.highlightResultByKeyWord(me.archivesPageClue.data, me.keyword);
            console.log('me.archivesPageClue.data',res,me.archivesPageClue)
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShowTp = false;
          console.log(error);
        });
      },
      // 搜索获取所有信息
      getAllDataByKeyWord (keyword) {
        this.keyword = keyword;
        if(this.keyword == ''){
          this.$Message.warning('搜索不能为空！');
          return;
        }
        this.getDataPeople();
        this.getDataTp();
        if(this.isShowCaseAndClue) {
          this.getDataCase();
          this.getDataClue();
        }
      },
      // 高亮搜索文字
      highlightResultByKeyWord(data, keyword) {
        let keywordArr = keyword.trim().split(" ").sort((a,b) => b.length - a.length);
        keywordArr = [...new Set(keywordArr)]; // 搜索key
        // 数据data
        data.forEach(item => {
          for(let key in item.property){
            // 1. 先保存一个临时身份证号码，防止被高亮span标签影响（点击跳转用）
            item.property.TEMPSFZHM = item.property.SFZHM;
            // 不处理字段
            if (typeof item.property[key]!="string" || key=="picUrl" || key=="label") continue;
            // 2. 处理字段 与key匹配
            keywordArr.forEach(keywordItem => { 
              var regex = /<span.*?>(.*?)<\/span>/ig;
              var spanContentStr = regex.exec(item.property[key]); // span标签中内容
              if ( 
                keywordItem // keywordItem不能为空
                && item.property[key].indexOf(keywordItem) != -1 // 数据中有
                && (!spanContentStr || spanContentStr[1].indexOf(keywordItem) == -1) // 没有span 或不能在span中出现
                ) {
                //  3. 全局正则校验 替换
                var reg = new RegExp(keywordItem ,"g");
                var highlightText = `<span class='search-highlight'>${keywordItem}</span>`;
                item.property[key] = item.property[key].replace(reg, highlightText);
              }
            })
          }
        })
      },
      
      backIndex(){
        this.$router.push({
          path: '/index',
        });
      },
      backSearch(){
        this.$router.push({
          path: '/fullTextSearch',
        });
      },
      toEdit(){
        window.open('http://103.229.213.147:6060/ITAP/servlet/front/JKS?type=YHDL2&PAGE=front%2FZP_SWJP.jsp%3FJZBH%3D%26ZPLX%3D%E6%B6%89%E7%A8%B3%E9%AB%98%E5%8D%B1%E4%BA%BA%E5%91%98%E5%AE%B6%E8%B0%B1%E5%9B%BE&USERID='+ sessionStorage.userName +'&PASSWORD='+ sessionStorage.passWord +'&SJH=13122223333&SFZH=000000000000000000&XM=%E7%AE%A1%E7%90%86%E5%91%98&JH=000000&TIME=&IP=&ZZJGDM=', '_blank');
      },
      setIndex(index,rid) {
          this.showRecord = false;
          this.activeIndex = (this.activeIndex == index ? -1 : index);
          this.activeIndex2 = -1;
          // this.getMap(rid);
      },
      toVisualition (sfzhm) {
        this.$router.push({
          path: '/visualition',
          query: {
            keyword: sfzhm,
            name: '全文检索'
          }
        });
      },
      join (tpid,rid) {
        this.$router.push({
          path: '/join',
          query: {
            tpid : tpid,
            rid : rid
          }
        });
      },
      overlaptp (tpid,rid) {
        this.$router.push({
          path: '/overlaptp',
          query: {
            tpid : tpid,
            rid : rid,
          }
        });
      },
      showMapF(index) {
        setIndex(index);
      },
      showAr(index) {
        this.activeIndex = -1;
        this.activeIndex2 = (this.activeIndex2 == index ? -1 : index);

      },
      toArchives(index) {
        this.node_type = this.datalist[index].node_type;
        this.rid_id = this.datalist[index].rid;
        sessionStorage.setItem('id', this.rid_id);
        this.$router.push({
          path: '/archives',
        });
      },
       // 点击跳转串并页面
      toJoin(mapNumber) {
        sessionStorage.mapNumber = mapNumber || '';
        this.$router.push({
          path: '/join',
        });
        // this.$router.push({
        //   name: 'Join',
        //   params: {
        //     tpbh: mapNumber
        //   }
        // });
      },
      // 跳转叠加页面
      toOverlap(item) {
        sessionStorage.mapNumber = item.tpbh || '';
        sessionStorage.djtps = item.tpms || '';
        this.$router.push({
          path: '/overlap',
        });
      },
      //跳转公共出图页面
      toArchivesJoin (item) {
        let tpid = item.rid.replace('i','#').replace('_',':');
        console.log(item);
        var path = '/archivesjoin';
        var query = {
            tpids : tpid,
            rid : item.rid,
            sfzhm : null,
            mc : '全文检索',
            pageName : ''
          }
        if(item.property.mapType==9){
          path = '/collectMarkerProfile';
          query = {
            collectId: item.property.collectId,
            areaCode: item.property.villageCode,
            state: 1
          }
        }else if(item.property.mapType==8){
          path = '/collectMarkerExitEnter';
          query = {
            collectId: item.property.collectId,
            areaCode: item.property.villageCode,
            state: 1
          }
        }

        let route = this.$router.resolve({
          path: path,
          query: query
        });
        window.open(route.href,'_blank')
      },
      //跳转 案件详情页
      toCaseDetail (item) {
        console.log(item)
        var path = '/caseManager/addCaseInfo';
        var query = {
            status : 2,
            state : 1,
            caseId : item.property.id,
          }
        let route = this.$router.resolve({
          path: path,
          query: query
        });
        window.open(route.href,'_blank')
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
      getMap(rid) {
        var me = this ;
        this.dataMapList  =[];
        let url = this.path + '/RiskAssessController/v1/getTpMsgByRyid';
        let params = new URLSearchParams();
        params.append('rid', rid);
        params.append('token', this.token);
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
            me.dataMapList = response.data.data.tpData;
            console.log(me.dataMapList)
        })
        .catch(error => {
          console.log(error);
        });
      },
      getEntityLinksConfig () {
        let me = this;
        commonApi.getInitializeConfig()
        .then(response => {
          if (response.code != 200) {
            return false;
          }
          me.entityPropList = response.data.nodeConfig;
          me.linksPropList = response.data.linkConfig;
          me.iconsList = response.data.nodeIconConfig;
          me.labelColors = response.data.labelColors;
          me.tplxMapping = response.data.tplxMapping;
          me.iconsList.map(item=>{
            for(let i in item){
              if (i=='path_1') {
                item['path_n'] = item[i];
              }
            }
          })
          //me.opt = me.buildOpt();
        })
        .catch(error => {
          console.log(error);
        });
      },
      /**
       * 获取轨迹信息/查看档案轨迹信息
       * @function getTrajectoryInfo
       * @author Erbing
       */
      getTrajectoryInfo () {
        let me = this;
        let params = new URLSearchParams();
        let url = me.path+'/GraphicalController/v1/nodePathAnalysis';
        //params.append('params', JSON.stringify(arg));
        params.append('token', me.token);
        params.append('nodeID', me.rid_id);
        this.$axios.post(url, params)
        .then(response => {
          if (response.data.code != 200) {
            return false;
          }
          me.curEneityAllData.eneityTrajectoryInfo.dataTypes = response.data.data.dataTypes;
          me.curEneityAllData.eneityTrajectoryInfo.data = response.data.data.data;
          me.curEneityAllData.eneityTrajectoryInfo.datas = response.data.data.data;
          me.curEneityAllData.eneityTrajectoryInfo.mapData = response.data.data.mapData;
          // var dtpz = me.curEneityAllData.eneityTrajectoryInfo.mapData.mrpz;
          // var data = me.curEneityAllData.eneityTrajectoryInfo.mapData;
          // var obj = JSON.stringify(dtpz);
          // obj = (new Function("","return "+obj))();
          // intinizMap(obj,data,"V1");
        })
        .catch(error => {
          console.log(error);
        });
      },
      hidePersonInfor (data) {
        this.statusList.PersonInforShow = data;
      },
      switchTrajectory (name) {
        if (name == 'all') {
          this.curEneityAllData.eneityTrajectoryInfo.datas = this.curEneityAllData.eneityTrajectoryInfo.data;
          return false;
        };
        this.curEneityAllData.eneityTrajectoryInfo.datas = [];
        //this.curEneityAllData.eneityTrajectoryInfo.datas = this.curEneityAllData.eneityTrajectoryInfo.data;
        for (var i = 0; i < this.curEneityAllData.eneityTrajectoryInfo.data.length; i ++) {
          if (this.curEneityAllData.eneityTrajectoryInfo.data[i].nodeType == name) {
            this.curEneityAllData.eneityTrajectoryInfo.datas.push(this.curEneityAllData.eneityTrajectoryInfo.data[i]);
            //this.curEneityAllData.eneityTrajectoryInfo.datas.splice(i,1);
            // return this.curEneityAllData.eneityTrajectoryInfo.datas;
          }
        }
        console.log(name);
        console.log(this.curEneityAllData.eneityTrajectoryInfo.datas);
      },
      changeTime (date,type) {
        if (type == 'start') {
          this.curEneityAllData.eneityTrajectoryInfo.startTime = date;
        }else{
          this.curEneityAllData.eneityTrajectoryInfo.endTime = date;
        };
        //this.getPhotos();
      },
      toPedigreeDetail (item) {
        // 判断是否有访问页面的权限
      // if (this.hasFunAuth(this.constantFunMap.FUN_Archives_View_ID)) {
        let routeData = this.$router.resolve({
          path: "/pedigreeDetail", //archivesmap
          query: {
            archiveId: item.archiveId,
            title: item.archiveName,
            mc: "谱系档案"
          }
        });
          window.open(routeData.href, "_blank");
        // } else {
        //   this.$Message.info(this.constantNoAuthData);
        // }
      },
      showPeopleDetail(item) {
        // this.personDataItem.properties.SFZHM = item.property.SFZHM;
        this.personDataItem = {
          properties: {
            SFZHM: item.property.TEMPSFZHM
          }
        };
        this.statusList.PersonInforShow = true;
        console.log(item);
      },
       // 设置标签背景色
      setBackground (riskLevel) {
        switch (riskLevel) {
          case 4:
            return '#D74348'
            break;
          case 3:
            return '#ED8F21'
            break;
          case 2:
            return '#D9C919'
            break;
          case 1:
            return '#4264D7'
            break;

          default:
            return '#A8ACB3'
            break;
        }
      }
    },
    created() {
      this.keyword = this.$route.query.keyword;
      this.getMapTypes();
      this.getDataPeople();
      this.getDataTp();
      if(this.isShowCaseAndClue) {
        this.getDataCase();
        this.getDataClue();
      }
      this.getEntityLinksConfig();
      console.log('activeIndex+',this.activeIndex);
    },
    watch: {
      currentTabPaneName: {
        handler(val) {
          console.log(val);

        },
        deep: true,
        immediate: true
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "css/fullText.less";
</style>

<style lang="less">
  @import "../../assets/loading.css";
  @import "css/fullTextScope.less";
</style>
