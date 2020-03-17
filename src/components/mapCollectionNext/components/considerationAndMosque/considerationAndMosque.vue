<template>
  <div class="displayInformation">
    <consideration
      ref="consideration"
      :agencyId="agencyId"
      :isAddcm="isAddcm"
      :villageAllInfo="villageAllInfo"
      :optionList="optionList"
    ></consideration>
    <mosque
      ref="mosque"
      :agencyId="agencyId"
      :isAddcm="isAddcm"
      :villageAllInfo="villageAllInfo"
      :optionList="optionList"
    ></mosque>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import consideration from "./consideration";
import mosque from "./mosque";
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";
export default {
  components: {
    consideration,
    mosque
  },
  props: {
    villageAllInfo: {
      type: Object,
      default() {
        return null;
      }
    },
    isAddcm: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    villageAllInfo: {
      handler(val) {},
      immediate: true,
      deep: true
    },
    isAddcm: {
      handler(val) {},
      immediate: true
    }
  },
  data() {
    //这里存放数据
    return {
      modal1: true,
      agencyId: "",
      optionConfig: OPTIONS_LIST,
      optionList: {
        genderList: [], //性别
        nationalityList: [], //民族
        personTagList: [], //标签
        personStateList: [], //人员状态
        fiveOnePropertyList: [], //五位一体
        politicsStatusList: [], //政治面貌
        professionList: [], //职业
        relationTypeList: [], //关系名称
        displayNameTypeList: [], //身份/称谓
        displayNameAllTypeList: [],
        proviceAddressList: [],
        positionPartyList: [],
        positionMosqueList: []
      }
    };
  },
  created() {
    this.getOptionList();
  },
  mounted() {
    console.log(this.villageAllInfo);
  },

  //方法集合
  methods: {
    showConsideration(id) {
      this.agencyId = id;
      this.$refs["consideration"].modal1 = true;
    },
    showMosque(id) {
      this.agencyId = id;
      this.$refs["mosque"].modal1 = true;
    },
    // 获取清单
    getOptionList() {
      // 村两委PARTY_POSITION
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.PARTY_POSITION,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.PARTY_POSITION
        })
        .then(res => {
          this.optionList.positionPartyList = res;
        });
      // 清真寺MOSQUE_POSITION
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.MOSQUE_POSITION,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.MOSQUE_POSITION
        })
        .then(res => {
          this.optionList.positionMosqueList = res;
        });
      //性别
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.GENDER,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.GENDER
        })
        .then(res => {
          this.optionList.genderList = res;
        });
      //民族
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.NATIONALITY,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.NATIONALITY
        })
        .then(res => {
          this.optionList.nationalityList = res;
        });
      //标签
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.PERSON_TAG,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.PERSON_TAG
        })
        .then(res => {
          this.optionList.personTagList = res;
        });
      //人员状态（大类）
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.STATE_STRONG,
          apiFun: comApis.GET_PERSON_STATE_BIG_LIST,
          params: OPTIONS_LIST.STATE_STRONG
        })
        .then(res => {
          this.optionList.personStateList = res;
          this.optionList.personStateList.forEach(x => {
            x.label = x.displayName;
            x.children = [];
            x.loading = false;
          });
        });
      //五位一体
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.FIVE_ONE_PROPERTY,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.FIVE_ONE_PROPERTY
        })
        .then(res => {
          this.optionList.fiveOnePropertyList = res;
        });
      //政治面貌
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.POLITICS_STATUS,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.POLITICS_STATUS
        })
        .then(res => {
          this.optionList.politicsStatusList = res;
        });
      //职业
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.PROFESSION,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.PROFESSION
        })
        .then(res => {
          this.optionList.professionList = res;
        });
      //获取省的数据
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.BELONG_PROVICE,
          apiFun: comApis.GET_AREA_TREE_BY_CODE,
          validParams: true,
          params: "Root"
        })
        .then(res => {
          if (res) {
            // 把新疆的数据放在最前面
            let tmpArr = res.childAreaList.filter(x => {
              return x.code != "650000000000";
            });
            let tmpCodeArr = res.childAreaList.filter(x => {
              return x.code == "650000000000";
            });
            let tmp_arr = tmpCodeArr.concat(tmpArr);
            let arr = tmp_arr.map(x => {
              return {
                id: x.id,
                code: x.code,
                value: x.code,
                name: x.name,
                label: x.displayName,
                parentId: x.parentId,
                parentCode: x.parentCode,
                longitude: x.longitude,
                latitude: x.latitude,
                loading: false,
                children: []
              };
            });
            this.optionList.proviceAddressList = arr;
          }
        });
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.infoModal {
  /deep/.ivu-modal-body {
    padding: 0 !important;
  }
}
/deep/.information {
  width: 100%;
  height: 100%;
  display: flex;
  /* border: 1px solid #e0e3e6;
  border-bottom: 0 solid #e0e3e6; */
  .actionTab {
    width: 110px;
    // flex: 0 0 110;
    float: left;
    height: 100%;
    background: #ffffff;
    .tab {
      border-bottom: 1px solid #e0e3e6;
      font-size: 14px;
      height: 46px;
      color: #666666;
      text-align: center;
      line-height: 46px;
      position: relative;
      cursor: pointer;
      i {
        position: absolute;
        top: -13px;
        right: 6px;
        width: 12px;
        height: 12px;
        color: #999999;
        cursor: pointer;
      }
    }
    .tab.act {
      color: #0668c8;
      font-weight: bold;
    }
  }
  .actionContent {
    float: left;
    width: calc(100% - 110px);
    flex: 0 0 auto;
    height: 100%;
  }
}
</style>