<template>
  <div class="regional-container">
    <!-- 头部 -->
    <app-header
      ref="appHeader"
      :items="statusList"
      title="行政区划维护"
      :showSearch="false"
    ></app-header>
    <!-- 左菜单 -->
    <side-bar></side-bar>
    <!-- 右主体 -->
    <div class="content">
      <div class="wrapper">
        <div class="title">行政区划&nbsp;&nbsp;&nbsp;
          <span class="title-area">
            (
            <span>省级:&nbsp;{{provinceNumber}}&nbsp;&nbsp;</span>
            <span>市级:&nbsp;{{cityNumber}}&nbsp;&nbsp;</span>
            <span>区/县级:&nbsp;{{areaNumber}}&nbsp;&nbsp;</span>
            <span>街道/乡镇:&nbsp;{{streetNumber}}&nbsp;&nbsp;</span>
            <span>村级:&nbsp;{{villageNumber}}</span>
            )
          </span>
        </div>
        <div class="wrapper-detail">
          <div class="wrapper-content">
            <div class="wrapper-left">
              <ul>
                <li>
                  <span class="wrapper-left-padding">省级:
                    <!-- <p>({{provinceNumber}})</p> -->
                  </span>
                  <ul class="wrapper-left-inline">
                    <li
                      v-for="(item,index) in provinceList"
                      :key="index"
                      :class="{actives: isProvinceIndex == index ? true : false}"
                      @click="provinceClick(index,item)"
                      :style="{border: item.state==0 ? '1px solid orange' : null}"
                    >{{item.displayName}}</li>
                    <span @click="addDateProvince('formValidate')"> <i class="iconfont icon-jiahao1"></i></span>
                  </ul>
                </li>
                <li>
                  <span class="wrapper-left-padding">市级:
                    <p>({{cityNumbers}})</p>
                  </span>
                  <ul class="wrapper-left-inline">
                    <li
                      v-for="(item,index) in cityList"
                      :key="index"
                      :class="{actives: isCityIndex == index ? true : false}"
                      @click="cityClick(index,item)"
                      :style="{border: item.state==0 ? '1px solid orange' : null}"
                    >{{item.displayName}}</li>
                    <span @click="addDateCity('formValidate')"> <i class="iconfont icon-jiahao1"></i></span>
                  </ul>
                </li>
                <li>
                  <span class="wrapper-left-padding">区/县级:
                    <p>({{areaNumbers}})</p>
                  </span>
                  <ul class="wrapper-left-inline">
                    <li
                      v-for="(item,index) in areaList"
                      :key="index"
                      :class="{actives: isAreaIndex == index ? true : false}"
                      @click="areaClick(index,item)"
                      :style="{border: item.state==0 ? '1px solid orange' : null}"
                    >{{item.displayName}}</li>
                    <span @click="addDateArea('formValidate')"> <i class="iconfont icon-jiahao1"></i></span>
                  </ul>
                </li>
                <li>
                  <span class="wrapper-left-padding">街道/乡镇:
                    <p>({{streetNumbers}})</p>
                  </span>
                  <ul class="wrapper-left-inline">
                    <li
                      v-for="(item,index) in streetList"
                      :key="index"
                      :class="{actives: isStreetIndex == index ? true : false}"
                      @click="streetClick(index,item)"
                      :style="{border: item.state==0 ? '1px solid orange' : null}"
                    >{{item.displayName}}</li>
                    <span @click="addDateStreet('formValidate')"> <i class="iconfont icon-jiahao1"></i></span>
                  </ul>
                </li>
                <li>
                  <span class="wrapper-left-padding">村级:
                    <p>({{villages}})</p>
                  </span>
                  <ul class="wrapper-left-inline">
                    <li
                      v-for="(item,index) in villageList"
                      :key="index"
                      :class="{active: isVillageIndex == index ? true : false}"
                      @click="villageClick(index,item)"
                      :style="{border: item.state==0 ? '1px solid orange' : null}"
                    >{{item.displayName}}</li>
                    <span @click="addDateVillage('formValidate')"> <i class="iconfont icon-jiahao1"></i></span>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="wrapper-right">
              <div class="wrapper-right-title">
                {{ isTitle ? '行政区划详情' : '行政区划详情添加' }}
              </div>
              <div class="wrapper-right-messagecontent">
                <div class="wrapper-right-areamessage">
                  <i-form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="80"
                  >
                    <Form-item label="隶属区划名称:">
                      <!-- <i-input
                        v-model="formValidate.parentName"
                        placeholder="隶属区划名称"
                        disabled
                      ></i-input> -->
                      <span>{{formValidate.parentName}}</span>
                    </Form-item>
                    <Form-item
                      label="区划编码:"
                      prop="areaNunber"
                    >
                      <i-input
                        :disabled="isTitle"
                        v-model="formValidate.areaNunber"
                        placeholder="区划编码"
                      ></i-input>
                    </Form-item>
                    <Form-item
                      label="区划名称:"
                      prop="areaName"
                    >
                      <i-input
                        v-model="formValidate.areaName"
                        placeholder="区划名称"
                        @input="nameChange"
                      ></i-input>
                    </Form-item>
                    <Form-item label="别名:">
                      <i-input
                        v-model="formValidate.Name"
                        placeholder="别名"
                      ></i-input>
                    </Form-item>
                    <Form-item
                      label="坐标经度:"
                      prop="Latitude"
                    >
                      <i-input
                        v-model="formValidate.Latitude"
                        placeholder="坐标经度"
                      ></i-input>
                    </Form-item>
                    <Form-item
                      label="坐标纬度:"
                      prop="Longitude"
                    >
                      <i-input
                        v-model="formValidate.Longitude"
                        placeholder="坐标纬度"
                      >
                      </i-input>
                    </Form-item>
                    <Form-item label="是否置顶:">
                      <Radio-group v-model="formValidate.upTop">
                        <Radio label="0"><span>置顶</span></Radio>
                        <Radio label="9999"><span>不置顶</span></Radio>
                      </Radio-group>
                    </Form-item>
                  </i-form>
                </div>
                <div class="wrapper-right-personmessage">
                  <ul v-if="isTitle">
                    <li> <span>创建人:&nbsp;&nbsp;&nbsp;</span><span>{{formValidate.createPeople}}</span></li>
                    <li> <span>创建时间:&nbsp;&nbsp;&nbsp;</span><span>{{formValidate.createTime}}</span></li>
                    <li> <span>修改人:&nbsp;&nbsp;&nbsp;</span><span>{{formValidate.editorPeople}}</span></li>
                    <li> <span>修改时间:&nbsp;&nbsp;&nbsp;</span><span>{{formValidate.editorTime}}</span></li>
                  </ul>
                </div>
              </div>

              <div class="wrapper-right-bottom">
                <span
                  v-if="hasFunAuth(constantFunMap.FUN_Regional_STOP_ID) && isShow"
                  @click="remove('formValidate')"
                  style="background-color: #ff8000;"
                >停用</span>
                <span
                  style="background-color: green;"
                  v-if="hasFunAuth(constantFunMap.FUN_Regional_START_ID) && !isShow"
                  @click="start('formValidate')"
                >启用</span>
                <span @click="resetFields()">取消</span>
                <span
                  v-if="hasFunAuth(constantFunMap.FUN_Regional_SAVE_ID) && isSave"
                  @click="save('formValidate')"
                >保存</span>
                <span
                  v-if="(hasFunAuth(constantFunMap.FUN_Regional_SAVE_ID) && !isSave)"
                  @click="addList('formValidate')"
                >保存</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appHeader from "@/components/assembly/AppHeader";
import SideBar from "@/components/assembly/Sidebar";
import switchRightView from "@/components/assembly/SwitchRightView";
import * as apis from "@/api/system/regional.js";
import * as api from "@/api/common.js";
import { hasQuery } from "../../../tools/units.js";
import { OPTIONS_LIST } from "@/api/config.js";
export default {
  components: {
    switchRightView,
    SideBar,
    appHeader
  },
  props: {},
  data() {
    return {
      parentCode: {
        provinceCode: "Root",
        cityCode: "",
        areaCode: "",
        streetCode: "",
        villageCode: ""
      }, //各级父级的code
      isTitle: false, //区分查看和编辑的title
      isShow: true, //停用启用按钮的切换
      isSave: true, //修改和添加按钮切换
      isProvinceIndex: 0,//省级选中索引
      isCityIndex: 0,//市级选中索引
      isAreaIndex: 0,//区县选中索引
      isStreetIndex: 0,//街道选中索引
      isVillageIndex: 0,//村级选中索引
      provinceNumber: 0, //省级数量（头部信息汇总）
      cityNumber: 0, //市级数量（头部信息汇总）
      areaNumber: 0, //区级数量（头部信息汇总）
      streetNumber: 0, //街道数量（头部信息汇总）
      villageNumber: 0, //村级数量（头部信息汇总）
      selectedProvindeItem:null,//省级选中的数据
      selectedCityItem:null,//市选中的数据
      selectedAreaItem:null,//区县选中的数据
      selectedStreetItem:null,//街道选中的数据
      selectedVillageItem:null,//村选中的数据
      currentClickType:null,//p:省，c:市，a:区，s:街道：v:村
      isAddcity: "",
      isAddarea: "",
      isAddstreet: "",
      idsAddvillage: "",
      provinceList: [],
      cityList: [],
      areaList: [],
      streetList: [],
      villageList: [],
      formValidate: {
        areaNunber: "", //区域编码
        parentName: "", // 隶属区划名称
        areaName: "", //区划名称
        Name: "", //别名
        administrativeArea: "", //隶属区划Code
        Latitude: "", //经度
        Longitude: "", //维度
        upTop: "9999", //置顶
        createPeople: "", //创建人
        createTime: "", //创建时间
        editorPeople: "", //修改人
        editorTime: "", //修改时间
        state: 0,
        id: "" //主键id值
      },
      ruleValidate: {
        areaNunber: [
          { required: true, message: "区域编码不能为空", trigger: "blur" }
        ],
        areaName: [
          { required: true, message: "区划名称不能为空", trigger: "blur" }
        ],
        Latitude: [
          // {
          //   required: true,
          //   message: "坐标不能为空",
          //   trigger: "blur"
          // },
          {
            // required: true,
            pattern: /^\d{1,8}(\.\d{1,8})?$/,
            message: "坐标格式错误",
            trigger: "blur"
          }
        ],
        Longitude: [
          // {
          //   required: true,
          //   message: "坐标不能为空",
          //   trigger: "blur"
          // },
          {
            // required: true,
            pattern: /^\d{1,8}(\.\d{1,8})?$/,
            message: "坐标格式错误",
            trigger: "blur"
          }
        ]
      },
      statusList: {
        isDeleteModal: false, // 删除确认框 展示
        uploadImg: false,
        personModalShow: false,
        newsModalShow: false,
        appModalShow: false,
        changeLogShow: false,
        guidelinesShow: false,
        messageDetailsShow: false,
        feedbackShow: false,
        PersonInforShow: false,
        nodesDetailedShow: false,
        ShowMultiModal: false,
        tpList: false,
        historyModalShow: false,
        loadingTpmcShow: false,
        myNavModalShow: false
      }
    };
  },
  watch: {},
  computed: {
    // provinceNumber: function() {
    //   return this.provinceList.length;
    // }, //省级
    cityNumbers: function() {
      if (this.cityList && this.cityList.length > 0) {
        return this.cityList.length;
      }
    }, //市级
    areaNumbers: function() {
      if (this.areaList && this.areaList.length > 0) {
        return this.areaList.length;
      }
    }, //区级
    streetNumbers: function() {
      if (this.streetList && this.streetList.length > 0) {
        return this.streetList.length;
      }
    }, //街道
    villages: function() {
      if (this.villageList && this.villageList > 0) {
        return this.villageList.length;
      }
    } //村级
  },
  methods: {    
    // 添加省级数据(加号)
    addDateProvince(name) {
      this.currentClickType = 'p'
      if (!this.parentCode.provinceCode) {
        this.$Message.info("请选择上级区划");
        return false;
      }
      this.isTitle = false;
      this.isSave = false;
      this.isShow = true;
      this.resetFields()
      if (this.provinceList && this.provinceList.length > 0) {
        this.formValidate.administrativeArea = this.provinceList[0].parentCode;
        this.formValidate.parentName = this.provinceList[0].parentName;
        // this.formValidate.parentName = this.provinceList[0].parentName;
      }
      this.formValidate.upTop = "9999";
    },
    // 添加市级数据(加号)
    addDateCity(name) {
      this.currentClickType = 'c'
      if (!this.isAddcity && !this.selectedProvindeItem) {
        this.$Message.info("请选择上级区划");
        return false;
      }
      this.isTitle = false;
      this.isSave = false;
      this.isShow = true;
      if (this.cityList && this.cityList.length > 0) {
        this.resetFields();
        this.formValidate.administrativeArea = this.cityList[0].parentCode;
        this.formValidate.parentName = this.cityList[0].parentName;
      } else {
        let  parentNamed = this.selectedProvindeItem.name;
        var code = this.selectedProvindeItem.code;
        this.resetFields();
        // for (var key in this.formValidate) {
        //   if (key == "areaName") {
        //     var parentNamed = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   } else if(key == 'areaNunber'){
        //     var code = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   }
        //   else {
        //     this.formValidate[key] = "";
        //   }
        // }
        // this.$refs[name].resetFields();
        this.formValidate.parentName = parentNamed;
        this.formValidate.administrativeArea = code;
      }
      this.formValidate.upTop = "9999";
    },
    // 添加区县数据(加号)
    addDateArea(name) {
      this.currentClickType = 'a'
      if (!this.isAddarea && !this.selectedCityItem) {
        this.$Message.info("请选择上级区划");
        return false;
      }
      this.isTitle = false;
      this.isSave = false;
      this.isShow = true;
      if (this.areaList && this.areaList.length > 0) {
        this.resetFields()
        this.formValidate.administrativeArea = this.areaList[0].parentCode;
        this.formValidate.parentName = this.areaList[0].parentName;
      } else {
        let  parentNamed = this.selectedCityItem.name;
        var code = this.selectedCityItem.code;
        this.resetFields();
        // for (var key in this.formValidate) {
        //   if (key == "areaName") {
        //     var parentNamed = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   } else if(key == 'areaNunber'){
        //     var code = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   }
        //    else {
        //     this.formValidate[key] = "";
        //   }
        // }
        // this.$refs[name].resetFields();
        this.formValidate.parentName = parentNamed;
        // this.formValidate.parentCode = code;
        this.formValidate.administrativeArea = code;
      }
      this.formValidate.upTop = "9999";
    },
    // 添加街道/乡镇数据(加号)
    addDateStreet(name) {
      this.currentClickType = 's'
      if (!this.isAddstreet && !this.selectedAreaItem) {
        this.$Message.info("请选择上级区划");
        return false;
      }
      this.isTitle = false;
      this.isSave = false;
      this.isShow = true;
      if (this.streetList && this.streetList.length > 0) {
        this.resetFields()
        // for (var key in this.formValidate) {
        //   this.formValidate[key] = "";
        // }
        // this.$refs[name].resetFields();
        this.formValidate.administrativeArea = this.streetList[0].parentCode;
        this.formValidate.parentName = this.streetList[0].parentName;
      } else {
        let  parentNamed = this.selectedAreaItem.name;
        var code = this.selectedAreaItem.code;
        this.resetFields();
        // for (var key in this.formValidate) {
        //   if (key == "areaName") {
        //     var parentNamed = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   } else if(key == 'areaNunber'){
        //     var code = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   }
        //    else {
        //     this.formValidate[key] = "";
        //   }
        // }
        // this.$refs[name].resetFields();
        this.formValidate.parentName = parentNamed;
        // this.formValidate.parentCode = code;
        this.formValidate.administrativeArea = code;
      }
      this.formValidate.upTop = "9999";
    },
    // 添加村级数据(加号)
    addDateVillage(name) {
      this.currentClickType = 'v'
      if (!this.idsAddvillage && !this.selectedStreetItem) {
        this.$Message.info("请选择上级区划");
        return false;
      }
      this.isTitle = false;
      this.isSave = false;
      this.isShow = true;
      if (this.villageList && this.villageList.length > 0) {
        this.resetFields()
        // for (var key in this.formValidate) {
        //   this.formValidate[key] = "";
        // }
        // this.$refs[name].resetFields();
        this.formValidate.administrativeArea = this.villageList[0].parentCode;
        this.formValidate.parentName = this.villageList[0].parentName;
      } else {
        let  parentNamed = this.selectedStreetItem.name;
        var code = this.selectedStreetItem.code;
        this.resetFields();
        // for (var key in this.formValidate) {
        //   if (key == "areaName") {
        //     var parentNamed = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   } else if (key == 'areaNunber'){
        //     var code = this.formValidate[key];
        //     this.formValidate[key] = "";
        //   }
        //    else {
        //     this.formValidate[key] = "";
        //   }
        // }
        // this.$refs[name].resetFields();
        this.formValidate.parentName = parentNamed;
        // this.formValidate.parentCode = code;
        this.formValidate.administrativeArea = code;
      }
      this.formValidate.upTop = "9999";
    },
    // 省级数据点击事件
    provinceClick(index, item) {
      this.currentClickType = 'p'
      this.resetFields();
      this.isSave = true;
      this.isTitle = true;
      this.isProvinceIndex = index;
      this.selectedProvindeItem = item;
      this.initFormValidate(item);
      var code = item.code;
      this.parentCode.provinceCode = "Root";
      this.parentCode.cityCode = "";
      this.parentCode.areaCode = "";
      this.parentCode.streetCode = "";
      this.parentCode.villageCode = "";
      this.isAddcity = item.code;
      this.isAddarea = "";
      this.isAddstreet = "";
      this.idsAddvillage = "";
      this.selectedCityItem = null
      this.selectedAreaItem = null
      this.selectedStreetItem = null
      this.selectedVillageItem = null
      this.getAreaTreeData(code).then(res => {
        this.cityList = res.data;
        if (this.cityList && this.cityList.length > 0) {
          this.parentCode.cityCode = this.cityList[0].parentCode;
        }
        this.areaList = [];
        this.streetList = [];
        this.villageList = [];
        this.isCityIndex = null;
      });
    },
    // 市级数据点击事件
    cityClick(item, items) {
      this.currentClickType = 'c'
      this.resetFields();
      this.isSave = true;
      this.isTitle = true;
      this.isCityIndex = item;
      this.selectedCityItem = items;
      this.initFormValidate(items);
      var code = this.cityList[item].code;
      this.parentCode.cityCode = items.parentCode;
      this.parentCode.areaCode = "";
      this.parentCode.streetCode = "";
      this.parentCode.villageCode = "";
      this.isAddarea = this.cityList[item].code;
      this.isAddstreet = "";
      this.idsAddvillage = "";
      this.selectedAreaItem = null
      this.selectedStreetItem = null
      this.selectedVillageItem = null
      this.getAreaTreeData(code).then(res => {
        this.areaList = res.data;
        if (this.areaList && this.areaList.length > 0) {
          this.parentCode.areaCode = this.areaList[0].parentCode;
        }
        this.streetList = [];
        this.villageList = [];
        this.isAreaIndex = null;
      });
    },
    // 区县级数据点击事件
    areaClick(item, items) {
      this.currentClickType = 'a'
      this.resetFields();
      this.isSave = true;
      this.isTitle = true;
      this.isAreaIndex = item;
      this.selectedAreaItem = items;
      this.initFormValidate(items);
      var code = this.areaList[item].code;
      this.parentCode.areaCode = items.parentCode;
      this.parentCode.streetCode = "";
      this.parentCode.villageCode = "";
      this.isAddstreet = this.areaList[item].code;
      this.idsAddvillage = "";
      this.selectedStreetItem = null
      this.selectedVillageItem = null
      this.getAreaTreeData(code).then(res => {
        this.streetList = res.data;
        if (this.streetList && this.streetList.length > 0) {
          this.parentCode.streetCode = this.streetList[0].parentCode;
        }
        this.villageList = [];
        this.isStreetIndex = null;
      });
    },
    // 街道乡镇点击事件
    streetClick(item, items) {
      this.currentClickType = 's'
      this.resetFields();
      this.isSave = true;
      this.isTitle = true;
      this.isStreetIndex = item;
      this.selectedStreetItem = items;
      this.initFormValidate(items);
      var code = this.streetList[item].code;
      this.parentCode.streetCode = items.parentCode;
      this.parentCode.villageCode = "";
      this.idsAddvillage = this.streetList[item].code;
      this.selectedVillageItem = null
      this.getAreaTreeData(code).then(res => {
        this.villageList = res.data;
        if (this.villageList && this.villageList) {
          this.parentCode.villageCode = this.villageList[0].parentCode;
        }
        this.isVillageIndex = null;
      });
    },
    // 村级数据点击事件
    villageClick(item, items) {
      this.currentClickType = 'v'
      this.resetFields();
      this.isSave = true;
      this.isTitle = true;
      this.isVillageIndex = item;
      this.selectedVillageItem = items;
      this.initFormValidate(items);
      this.parentCode.villageCode = items.parentCode;
    },
    // 区划名称change事件
    nameChange() {
      this.formValidate.Name = this.formValidate.areaName;
    },
    // 获取对应的地区数据
    circleListData() {
      var me = this;
      let clickType = this.currentClickType
      let parentCode = 'Root'
      switch(clickType) {
        case 'p':
          parentCode = 'Root'
          break;
        case 'c':
          parentCode = me.selectedProvindeItem.code
          break;
        case 'a':
          parentCode = me.selectedCityItem.code
          break;
        case 's':
          parentCode = me.selectedAreaItem.code
          break;
        case 'v':
          parentCode = me.selectedStreetItem.code
          break;
      }
      this.getAreaTreeData(parentCode).then(res => {        
          fn(clickType,res.data)
      });
      function fn(clickType,data) {
        switch(clickType) {
          case 'p':
            me.provinceList = data;
            if(me.selectedProvindeItem) {
              let tmpIndex = me.provinceList.findIndex(x=>x.code == me.selectedProvindeItem.code)
              me.isProvinceIndex = tmpIndex
            }
            break;
          case 'c':
            me.cityList = data;
            if(me.selectedCityItem) {
              let tmpIndex = me.cityList.findIndex(x=>x.code == me.selectedCityItem.code)
              me.isCityIndex = tmpIndex
            }
            break;
          case 'a':
            me.areaList = data;
            if(me.selectedAreaItem) {
              let tmpIndex = me.areaList.findIndex(x=>x.code == me.selectedAreaItem.code)
              me.isAreaIndex = tmpIndex
            }
            break;
          case 's':
            me.streetList = data;
            if(me.selectedStreetItem) {
              let tmpIndex = me.streetList.findIndex(x=>x.code == me.selectedStreetItem.code)
              me.isStreetIndex = tmpIndex
            }
            break;
          case 'v':
            me.villageList = data;
            if(me.selectedVillageItem) {
              let tmpIndex = me.villageList.findIndex(x=>x.code == me.selectedVillageItem.code)
              me.isVillageIndex = tmpIndex
            }
            break;
        }
      }
      // for (var key in me.parentCode) {
      //   if (me.parentCode[key] && me.parentCode[key] == "Root") {
      //     var code = me.parentCode[key];
      //     this.getAreaTreeData(code).then(res => {
      //         me.provinceList = res.data;
      //         if(me.selectedProvindeItem) {
      //           let tmpIndex = me.provinceList.findIndex(x=>x.code == me.selectedProvindeItem.code)
      //           me.isProvinceIndex = tmpIndex
      //         }
      //         // me.isProvinceIndex = null;
      //         // me.isVillageIndex = null;
      //         // me.isCityIndex = null;
      //         // me.isAreaIndex = null;
      //         // me.isStreetIndex = null;
      //         // me.cityList = [];
      //         // me.areaList = [];
      //         // me.streetList = [];
      //         // me.villageList = [];
      //     });
      //   } else if (me.parentCode[key] && key == "cityCode") {
      //     var code = me.parentCode[key];
      //     this.getAreaTreeData(code).then(res => {
      //       me.cityList = res.data;
      //       if(me.selectedCityItem) {
      //         let tmpIndex = me.cityList.findIndex(x=>x.code == me.selectedCityItem.code)
      //         me.isCityIndex = tmpIndex
      //       }
      //       // me.areaList = [];
      //       // me.streetList = [];
      //       // me.villageList = [];
      //       // me.isCityIndex = null;
      //     });
      //   } else if (me.parentCode[key] && key == "areaCode") {
      //     console.log(me.parentCode[key]);
      //     var code = me.parentCode[key];
      //     this.getAreaTreeData(code).then(res => {
      //       me.areaList = res.data;
      //       if(me.selectedAreaItem) {
      //         let tmpIndex = me.areaList.findIndex(x=>x.code == me.selectedAreaItem.code)
      //         me.isAreaIndex = tmpIndex
      //       }
      //       // me.streetList = [];
      //       // me.villageList = [];
      //       // me.isAreaIndex = null;
      //     });
      //   } else if (me.parentCode[key] && key == "streetCode") {
      //     console.log(me.parentCode[key]);
      //     var code = me.parentCode[key];
      //     this.getAreaTreeData(code).then(res => {
      //       me.streetList = res.data;
      //       if(me.selectedStreetItem) {
      //         let tmpIndex = me.streetList.findIndex(x=>x.code == me.selectedStreetItem.code)
      //         me.isStreetIndex = tmpIndex
      //       }
      //       // me.villageList = [];
      //       // me.isStreetIndex = null;
      //     });
      //   } else if (me.parentCode[key] && key == "villageCode") {
      //     console.log(me.parentCode[key]);
      //     var code = me.parentCode[key];
      //     this.getAreaTreeData(code).then(res => {
      //       me.villageList = res.data;
      //       if(me.selectedVillageItem) {
      //         let tmpIndex = me.villageList.findIndex(x=>x.code == me.selectedVillageItem.code)
      //         me.isVillageIndex = tmpIndex
      //       }
      //       // me.isVillageIndex = null;
      //     });
      //   }
      // }
    },
    // 根据Code获取行政区划的数据
    getAreaTreeData(code) {
      var promise = new Promise((resolve,reject)=>{
        apis.GET_AREA_TREE_BY_CODE(code).then(res => {
          if (res.code == 200) {
            resolve(res)
          } else {
            reject(res)
          }
        });
      })
      return promise;
    },
    //初始划省数据
    getDeptList() {
      this.isTitle = false;
      var me = this;
      var root = "Root";
      this.getAreaTreeData(root).then(res=>{
        this.provinceList = res.data;
        me.isProvinceIndex = null;
        me.isVillageIndex = null;
        me.isCityIndex = null;
        me.isAreaIndex = null;
        me.isStreetIndex = null;
        this.cityList = [];
        this.areaList = [];
        this.streetList = [];
        this.villageList = [];
      })
      apis.getRegionalCount().then(res => {
        if (res.code == 200) {
          if (res.data && res.data.length > 0) {
            me.provinceNumber = res.data[0].areaCount; //省级
            me.cityNumber = res.data[1].areaCount; //市级
            me.areaNumber = res.data[2].areaCount; //区级
            me.streetNumber = res.data[3].areaCount; //街道
            me.villageNumber = res.data[4].areaCount; //村级
          }
        }
      });
    },
    // 获取父级的Name
    getParentName(items) {
      let parentName = items.parentName
      if(!parentName) {
        let provinceItem = this.provinceList.filter(x=>{
          return x.code == items.parentCode
        })
        if(provinceItem.length > 0) {
          return provinceItem[0].name
        }
        let cityItem = this.cityList.filter(x=>{
          return x.code == items.parentCode
        })
        if(cityItem.length > 0) {
          return cityItem[0].name
        }
        let areaItem = this.areaList.filter(x=>{
          return x.code == items.parentCode
        })
        if(areaItem.length > 0) {
          return areaItem[0].name
        }
        let streetItem = this.streetList.filter(x=>{
          return x.code == items.parentCode
        })
        if(streetItem.length > 0) {
          return streetItem[0].name
        }
        return ""
      }
      return parentName
    },
    //初始化表单数据
    initFormValidate(items,flag = false) {
      let parentName = this.getParentName(items)  
      this.formValidate.parentName = parentName;
      this.formValidate.administrativeArea = items.parentCode;
      this.formValidate.Name = items.displayName;
      this.formValidate.areaName = items.name;
      this.formValidate.Latitude = items.centerLatitude;
      this.formValidate.Longitude = items.centerLongitude;
      this.formValidate.areaNunber = items.code;
      this.formValidate.upTop = items.areaOrder.toString();
      this.formValidate.id = items.id;
      this.formValidate.id = items.id;
      this.isShow = items.state == 0 ? true : false;
      this.formValidate.createPeople = items.creater;
      this.formValidate.createTime = items.createTime
        ? this.$moment(items.createTime).format("YYYY-MM-DD")
        : null;
      this.formValidate.editorPeople = items.updater;
      this.formValidate.editorTime = items.updateTime
        ? this.$moment(items.updateTime).format("YYYY-MM-DD")
        : null;
      if(flag) {
        if(this.currentClickType == 'p') {
          this.selectedProvindeItem = items;
        }
        if(this.currentClickType == 'c') {
          this.selectedCityItem = items;
        }
        if(this.currentClickType == 'a') {
          this.selectedAreaItem = items;
        }
        if(this.currentClickType == 's') {
          this.selectedStreetItem = items;
        }
        if(this.currentClickType == 'v') {
          this.selectedVillageItem = items;
        }
      }
      
    },
    // 保存事件(编辑))
    save(name) {
      var me = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            code: me.formValidate.areaNunber,
            name: me.formValidate.areaName,
            displayName: me.formValidate.Name,
            parentCode: me.formValidate.administrativeArea,
            centerLatitude: me.formValidate.Latitude,
            centerLongitude: me.formValidate.Longitude,
            areaOrder: me.formValidate.upTop,
            state: "",
            id: me.formValidate.id
          };
          this.$Modal.confirm({
            title: "确认保存",
            onOk: () => {
              // 保存接口
              me.formValidate.state = 1;
              data.state = me.formValidate.state;
              apis.saveList(data).then(res => {
                if (res.code == 200) {
                  me.$Message.success("保存成功!");
                  const data = me.formValidate.administrativeArea;
                  me.initFormValidate(res.data,true);
                  apis.deleteDate(data).then(res => {
                    me.circleListData();
                    me.removeOptionByKey()
                  });                  
                  me.isSave = true;
                } else {
                  me.$Message.error(res.msg)
                }
              });
            },
            onCancel: () => {
              // me.$Message.info("保存取消");
            }
          });
        } else {
          this.$Message.error("请完善表单信息!");
        }
      });
    },
    removeOptionByKey() {
      this.$store.dispatch('removeOptionByKey',[OPTIONS_LIST.CITY_AREA_TREE,OPTIONS_LIST.BELONG_PROVICE])
    },
    // 保存事件(新增))
    addList(name) {
      var me = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            code: me.formValidate.areaNunber,
            name: me.formValidate.areaName,
            displayName: me.formValidate.Name,
            parentCode: me.formValidate.administrativeArea,
            centerLatitude: me.formValidate.Latitude,
            centerLongitude: me.formValidate.Longitude,
            areaOrder: me.formValidate.upTop,
            state: "",
            id: me.formValidate.id
          };
          this.$Modal.confirm({
            title: "确认保存",
            onOk: () => {
              // 保存接口
              me.formValidate.state = 1;
              data.state = me.formValidate.state;
              apis.addList(data).then(res => {
                if (res.code == 200) {
                  me.$Message.success("保存成功!");
                  const data = me.formValidate.administrativeArea;
                  me.initFormValidate(res.data,true);
                  apis.deleteDate(data).then(res => {
                    me.circleListData();
                    me.removeOptionByKey()
                  });                  
                  me.isSave = true;
                  me.isTitle = true;
                } else {
                  me.$Message.warning(res.msg);
                } 
              });
            },
            onCancel: () => {
              // me.$Message.info("保存取消");
            }
          });
        } else {
          this.$Message.error("请完善表单信息!");
        }
      });
    },
    // 取消按钮事件
    // 清空表单值和验证
    resetFields() {
      for (var key in this.formValidate) {
        this.formValidate[key] = "";
      }
      this.$refs['formValidate'].resetFields();
    },
    // 停用事件
    remove(name) {
      var me = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          //遍历各级的父级parentCode刷新列表数据
          var data = {
            code: me.formValidate.areaNunber,
            name: me.formValidate.areaName,
            displayName: me.formValidate.Name,
            parentCode: me.formValidate.administrativeArea,
            centerLatitude: me.formValidate.Latitude,
            centerLongitude: me.formValidate.Longitude,
            areaOrder: me.formValidate.upTop,
            state: "",
            id: this.formValidate.id
          };
          this.$Modal.confirm({
            title: "确认启用",
            onOk: () => {
              // 停用接口
              me.formValidate.state = 0;
              data.state = me.formValidate.state;
              apis.stopList(data).then(res => {
                if (res.code == 200) {
                  // me.circleListData();
                  me.$Message.info("启用确定");
                  const data = me.formValidate.administrativeArea;
                  apis.deleteDate(data).then(res => {
                    me.circleListData();
                    me.removeOptionByKey()
                  });
                  me.isShow = false;
                } else {
                  me.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {
              // me.$Message.info("启用取消");
            }
          });
        } else {
          this.$Message.error("请完善表单信息!");
        }
      });
    },
    // 启用事件
    start(name) {
      var me = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          //遍历各级的父级parentCode刷新列表数据
          var data = {
            code: me.formValidate.areaNunber,
            name: me.formValidate.areaName,
            displayName: me.formValidate.Name,
            parentCode: me.formValidate.administrativeArea,
            centerLatitude: me.formValidate.Latitude,
            centerLongitude: me.formValidate.Longitude,
            areaOrder: me.formValidate.upTop,
            state: "",
            id: this.formValidate.id
          };
          this.$Modal.confirm({
            title: "确认停用",
            onOk: () => {
              // 停用接口
              me.formValidate.state = 1;
              data.state = me.formValidate.state;
              apis.stopList(data).then(res => {
                if (res.code == 200) {
                  // me.circleListData();
                  me.$Message.info("停用确定");
                  me.isShow = true;
                  const data = me.formValidate.administrativeArea;
                  apis.deleteDate(data).then(res => {
                    me.circleListData();
                    me.removeOptionByKey()
                  });
                } else {
                  me.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {
              // me.$Message.info("停用取消");
            }
          });
        } else {
          this.$Message.error("请完善表单信息!");
        }
      });
    }
  },
  created() {
    this.getDeptList();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@widthH: 100%;
@imageUrl: "../../../../";
@borderColor: #dcdfe6;
.post(r) {
  position: relative;
}
.post(a) {
  position: absolute;
}
.regional-container {
  width: @widthH;
  height: @widthH;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  color: #68a4f6;
  overflow-x: hidden;
  overflow-y: hidden;
  .content {
    .post(a);
    left: 240px;
    top: 67px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    background: #fff;
    .wrapper {
      position: absolute;
      top: 2px;
      left: 0;
      right: 0;
      bottom: 6px;
      border: solid 2px #91b5ff;
      border-radius: 5px 5px 0 0;
      box-shadow: 0px 0px 9px #666 inset;
      .title {
        position: absolute;
        top: -3px;
        left: -2px;
        right: -2px;
        border-radius: 5px 5px 0 0;
        height: 44px;
        line-height: 44px;
        background-color: #c7d7eb;
        overflow: hidden;
        font-size: 16px;
        padding-left: 16px;
        color: #2698ed;
        .title-area {
          font-size: 14px;
          span {
            display: inline-block;
            height: 15px;
            margin-top: 15px;
            margin-right: 15px;
            line-height: 15px;
            border-right: solid 2px #91b5ff;
            &:last-child {
              border-right: none;
              margin-right: 0;
            }
          }
        }
        span {
        }
      }
    }
    .wrapper-detail {
      position: absolute;
      top: 41px;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      padding: 20px 40px;
      color: #333;
      .wrapper-title {
        width: 100%;
        height: 70px;
        line-height: 70px;
        font-size: 18px;
        padding: 0 20px;
        border: 1px solid @borderColor;
        background: #ffffff;
      }
      .wrapper-content {
        // padding: 20px 40px;
        height: 100%;
        display: flex;
        border: 1px solid @borderColor;
        .wrapper-left {
          width: 100%;
          height: 100%;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-right: 1px solid @borderColor;
          background: #ffffff;
          height: calc(100%);
          overflow-y: auto;
          ul {
            li {
              overflow: hidden;
              border-top: 1px solid @borderColor;
              border-bottom: 1px solid @borderColor;
              padding: 15px 0;
              &:first-child {
                border-top: none;
              }
              &:last-child {
                border-bottom: none;
              }
              .wrapper-left-padding {
                padding-left: 20px;
                width: 100px;
                margin-top: 6px;
                float: left;
                max-height: 40px;
                line-height: 30px;
                p {
                  line-height: 20px;
                }
              }
              .wrapper-left-inline {
                width: calc(100% - 100px);
                min-height: 27px;
                float: right;
                // background-color: blue;
                overflow: hidden;
                font-size: 12px;
                text-align: center;
                .active {
                  background-color: #0668c8;
                  color: #fff;
                }
                .actives {
                  border: 1px solid #0668c8 !important;
                  color: #0668c8 !important;
                }
                li {
                  float: left;
                  padding: 2px 8px;
                  border: 1px solid #ccc;
                  border-radius: 2px;
                  margin-right: 10px;
                  margin-top: 10px;
                  color: #333;
                  line-height: 20px;
                  cursor: pointer;
                  min-width: 84px;
                  min-height: 27px;
                }
                span {
                  float: left;
                  width: 50px;
                  min-height: 23px !important;
                  text-align: center;
                  background-color: #c7d7eb;
                  margin-right: 10px;
                  margin-top: 10px;
                  cursor: pointer;
                  padding-top: 3px;
                  vertical-align: top;
                }
              }
            }
          }
          .wrapper-grid::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .wrapper-grid::-webkit-scrollbar-track {
            border-radius: 5px;
            background: none;
          }
          .wrapper-grid::-webkit-scrollbar-thumb {
            background-color: rgba(32, 76, 157, 1);
            border-radius: 5px;
          }
          .wrapper-grid::-webkit-scrollbar-thumb:hover {
            background-color: rgba(45, 183, 245, 1);
          }
          .wrapper-grid::-webkit-scrollbar-corner {
            background-color: #dadada;
          }
        }
        .wrapper-right {
          flex: 0 0 300px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background: #ffffff;
          border-left: 1px solid @borderColor;
          .wrapper-right-title {
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
            font-size: 16px;
            background-color: #c7d7eb;
          }
          .wrapper-right-messagecontent {
            // height:100%;
            height: calc(100% - 88px);
            display: flex;
            flex-direction: column;
            .wrapper-right-areamessage {
              flex: 1;
              padding-top: 15px;
              padding-right: 20px;
            }
            .wrapper-right-personmessage {
              flex: 1;
              margin: 0 20px;
              border-top: 1px solid @borderColor;
              ul {
                height: 100%;
                li {
                  padding: 5px 0 5px 0;
                }
              }
              padding-bottom: 15px;
            }
          }
          .wrapper-right-bottom {
            height: 44px;
            padding: 10px;
            border-top: 1px solid @borderColor;
            span {
              width: 40px;
              height: 20px;
              line-height: 18px;
              float: right;
              font-size: 12px;
              text-align: center;
              border: 1px solid @borderColor;
              border-radius: 2px;
              cursor: default;
              &:first-child {
                float: left;
                background-color: #ff8000;
                color: #fcfcfc;
              }
              &:last-child {
                margin-right: 10px;
                color: #fcfcfc;
                background-color: #184af0;
              }
            }
          }
          .ivu-tree {
            height: 100%;
            overflow-y: auto;
          }
          .ivu-tree::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .ivu-tree::-webkit-scrollbar-track {
            border-radius: 5px;
            background: none;
          }
          .ivu-tree::-webkit-scrollbar-thumb {
            background-color: rgba(32, 76, 157, 1);
            border-radius: 5px;
          }
          .ivu-tree::-webkit-scrollbar-thumb:hover {
            background-color: rgba(45, 183, 245, 1);
          }
          .ivu-tree::-webkit-scrollbar-corner {
            background-color: #dadada;
          }
        }
      }
    }
  }
}
</style>


<style lang="less" scoped>
.ivu-form .ivu-form-item-label {
  padding: 12px 12px 10px 0;
  padding-top: 12px !important;
}
.ivu-form-item-content {
  line-height: 20px !important;
}
.ivu-form-item {
  margin-bottom: 3px !important;
  vertical-align: top;
  .ivu-input-wrapper {
    .ivu-form-item-error-tip {
      z-index: 1000 !important;
    }
  }
}
.ivu-input {
  height: 20px;
}

input {
  line-height: 1 !important;
  height: 20px !important;
  border-radius: 0 !important;
}
.ivu-input .ivu-input-default {
  line-height: 1 !important;
  height: 20px !important;
  border-radius: 0 !important;
}
.ivu-form-item-content {
  .ivu-radio-group {
    .ivu-radio-wrapper {
      font-size: 12px;
      /* vertical-align: middle; */
      vertical-align: top !important;
      display: inline-block;
      position: relative;
      white-space: nowrap;
      margin-right: 8px;
      cursor: pointer;
      margin-top: -2px;
    }
  }
}
</style>

