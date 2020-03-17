<template>
  <div class="archives-search-box">
    <div class="search">
      <div class="title">{{searchTitle}}</div>
      <Button class="search-btn" @click="onSearch">搜索</Button>
      <Input
        v-model="searchData.keyWords"
        search
        @on-search="onSearch"
        placeholder="输入姓名、身份证号、地址信息搜索，多个条件用空格隔开"
      />
    </div>
    <div class="search-option">
      <p class="search-total"><span class="text">搜索结果</span><span class="textTotal">({{cardTotal}})</span></p>
      <!-- 家族成员数 筛选 -->
      <div class="option">
        <div class="label">家族成员数：</div>
        <ul>
          <li
            @click="personNumClick(item)"
            v-for="(item, index) in personNumData"
            :key="index"
            :class="{active:item.isSelected}"
          >{{item.label}}</li>
        </ul>
      </div>
      <!-- 风险评估 筛选 -->
      <div class="option">
        <div class="label">风险评估：</div>
        <ul>
          <li
            @click="riskClick(item)"
            v-for="(item, index) in riskData"
            :key="index"
            :class="{active:item.isSelected}"
          >{{item.label}}</li>
        </ul>
      </div>
      <!-- 跨地区联姻 筛选 -->
      <div class="option">
        <div class="label">跨地区联姻：</div>
        <ul class="regionUl">
            <!-- v-show="item.isShow" :fn="isOverflow(item)" -->
            <!-- index < showRegionNum -->
          <li
            class="regionLi"
            @click="regionClick(item)"
            v-for="(item, index) in regionData"
            :key="index"
            :fn="isOverflow(item)"
            v-show="item.isShow"
            :class="{active:item.isSelected}"
          >{{item.displayName}}</li>
          <li class="regionLabel" @click="triggerMore" v-if="regionData.length > oneRowNum">
            {{ hasHide ?'更多':'收起'}}
            <Icon v-show="hasHide" type="ios-arrow-down" />
            <Icon v-show="!hasHide" type="ios-arrow-up" />
          </li>
        </ul>
      </div>
      <!-- 选中预览 -->
      <div v-show="isShowPreview" class="preview">
        <div class="preview-title">已选条件：</div>
        <div class="content">
          <ul class="classify">
            <!-- 家族成员数 -->
            <li v-show="isShowPersonNum" class="classify-item">
              <div class="label">家族成员数 :</div>
              <ul>
                <li v-for="(item, index) in personNumActive" :key="index">
                  {{item.label}}
                  <Icon @click="personNumClick(item)" type="md-close-circle" />
                </li>
              </ul>
            </li>
            <!-- 风险评估 -->
            <li v-show="isShowRisk" class="classify-item">
              <div class="label">风险评估 :</div>
              <ul>
                <li v-for="(item, index) in riskActive" :key="index">
                  {{item.label}}
                  <Icon @click="riskClick(item)" type="md-close-circle" />
                </li>
              </ul>
            </li>
            <!-- 跨地区联姻 -->
            <li v-show="isShowRegion" class="classify-item">
              <div class="label">跨地区联姻 :</div>
              <ul>
                <li v-for="(item, index) in regionActive" :key="index">
                  {{item.displayName}}
                  <Icon @click="regionClick(item)" type="md-close-circle" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="reset" @click="resetOption">清空全部</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as comApis from "@/api/search/index.js";
// 跨地区联姻筛选
// let definedWidth = document.documentElement.clientWidth-180-140; // 定义一行宽
// let widthSum = 0; // 元素累加
// let oneRowNum = 0; // 一行容纳个数
export default {
   props: {
    searchTitle: {
      type: String,
      default: "搜索结果"
    },
    cardTotal: {
      type: Number,
      default: 0
    },
    hasLeftNav: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showRegionNum: 7,
      widthSum: 0, // 元素累加
      oneRowNum: 0, // 一行容纳个数
      definedWidth: document.documentElement.clientWidth-180-140 - (this.hasLeftNav? 250:0), // 定义一行宽

      // 定义搜索数据格式
      searchData: {
        pageIndex: 1,
        pageSize: 8,
        keyWords: "",
        countAreas: [], // 成员
        risks: [], // 风险评估
        marriageAreaCodes: [] // 跨地区联姻
      },
      // 家族成员数列表
      personNumData: [
        {
          isSelected: false,
          label: "100人以上",
          value: {
            from: 100,
            to: null
          }
        },
        {
          isSelected: false,
          label: "100-51人",
          value: {
            from: 51,
            to: 100
          }
        },
        {
          isSelected: false,
          label: "50-31人",
          value: {
            from: 31,
            to: 50
          }
        },
        {
          isSelected: false,
          label: "30-21人",
          value: {
            from: 21,
            to: 30
          }
        },
        {
          isSelected: false,
          label: "20-11人",
          value: {
            from: 11,
            to: 20
          }
        },
        {
          isSelected: false,
          label: "10-5人",
          value: {
            from: 5,
            to: 10
          }
        },
        {
          isSelected: false,
          label: "5人以下",
          value: {
            from: 0,
            to: 5
          }
        }
      ],
      // 风险评估列表
      riskData: [
        {
          isSelected: false,
          label: "极高",
          value: 4
        },
        {
          isSelected: false,
          label: "高",
          value: 3
        },
        {
          isSelected: false,
          label: "中",
          value: 2
        },
        {
          isSelected: false,
          label: "低",
          value: 1
        },
        {
          isSelected: false,
          label: "无",
          value: 0
        }
      ],
      // 跨地区联姻列表
      regionData: []
    };
  },
  computed: {
    // 跨地区联姻，筛选是否有隐藏
    hasHide() {
      return this.regionData.some(item => !item.isShow);
    },
    // 家族成员数 选中项
    personNumActive() {
      return this.personNumData.filter(item => item.isSelected);
    },
    // 风险评估 选中项
    riskActive() {
      return this.riskData.filter(item => item.isSelected);
    },
    // 跨地区联姻 选中项
    regionActive() {
      return this.regionData.filter(item => item.isSelected);
    },
    // 预览
    isShowPreview () {
      return this.isShowPersonNum || this.isShowRisk || this.isShowRegion;
    },
    // 预览-成员数
    isShowPersonNum () {
      return this.personNumActive.length > 0;
    },
    // 预览-风险
    isShowRisk () {
      return this.riskActive.length > 0;
    },
    // 预览-地区
    isShowRegion () {
      return this.regionActive.length > 0;
    },
  },
  created() {
    this.getUrlSearchData();
    this.getRegion();
    // window.onresize=()=>{
    //   console.log(document.documentElement.clientWidth-180);
    // }
  },
  mounted() {
    if (!this.$route.query.region) { this.onSearch() }; // 如果地区默认选中，则不用初始化请求(解决两次请求渲染先后问题)
  },
  methods: {
    // // 切换显示/隐藏更多
    isOverflow (item) {
      this.$nextTick(()=> {
        let itemWidth = item.name.length * 14 + 28 > 84 ? item.name.length * 14 + 28 : 84; // 每项宽
        this.widthSum += itemWidth; // 累计
        if(this.widthSum < this.definedWidth) { // 如果还在一行内
          item.isShow = true; // 显示
          this.oneRowNum++; // 计数
        } else {
          return;
        }
        // console.log(item,item.isShow,this.regionData);
      })
    },
    // 获取 地址栏传来的信息 设置默认选中
    getUrlSearchData () {
      // 获取
      let searchText = this.$route.query.searchText;
      let familyPersonNum = this.$route.query.familyPersonNum;
      let risk = this.$route.query.risk;
      // 设置
      searchText && (this.searchData.keyWords = searchText);
      familyPersonNum && this.personNumClick(this.personNumData.find( item => item.label == familyPersonNum));
      risk && this.riskClick(this.riskData.find( item => item.label == risk));
    },
    // 获取 跨地区联姻选择列表
    getRegion() {
      // $axios.then(...)
      comApis
        .getCityList()
        .then(response => {
          if (response.code == 200) {
            // this.statusList.archivesLoadingShow = false;
            response.data.map(item => item.isSelected = false);//添加高亮状态属性
            response.data.map(item => item.isShow = false);//添加显示属性
            this.regionData = response.data;
            // 获取 地址栏传来的信息 设置默认选中
            let regionCode = this.$route.query.region;
            let activeIndex = 0; // 默认选中的下标
            regionCode && this.regionClick(this.regionData.find( (item, index) => {
              activeIndex = index;
              return item.code == regionCode
            }));
            this.$nextTick(() => {
              this.$nextTick(() => {
                if(activeIndex >= this.oneRowNum) { this.triggerMore() };
              })
            })

          } else {
            this.$Message.warning(response.message);
            // this.statusList.archivesLoadingShow = false;
          }
        })
        .catch(error => {
          // this.statusList.archivesLoadingShow = false;
          console.log(error);
        });

      // let res = [
      //   {
      //     code: 650100000000,
      //     name: "乌鲁木齐市",
      //     displayName:  "乌鲁木齐市",
      //   },
      //   {
      //     code: 650200000000,
      //     name: "乌鲁木齐市2",
      //     displayName:  "乌鲁木齐市2",
      //   },
      // ];
      // res.map(item => item.isSelected = false);//添加高亮状态
      // this.regionData = res;
    },
    // 点击搜索
    onSearch() {
      console.log(this.searchData);
      this.$emit("getSearchText", this.searchData);
    },
    // 切换更多
    triggerMore() {
      if (this.hasHide) { // 如果有隐藏元素
        this.regionData.map(item => item.isShow=true) // 那么全显示
      } else {
        this.regionData.map((item, index) => { // 如果全显示，则隐藏一行以外的元素
          if (index>=this.oneRowNum) {
            item.isShow=false
          }
        })
      }
    },
    // 高亮切换
    highlight(item) {
      item.isSelected = !item.isSelected;
    },
    // 保存高亮的 家族成员数
    personNumClick(item) {
      // 1.高亮切换
      this.highlight(item);
      // 2.找出高亮
      this.searchData.countAreas = [];
      // console.log(this.personNumActive);
      this.personNumActive.forEach(item => this.searchData.countAreas.push(item.value));
      // 3.搜索
      this.onSearch();
    },
    // 保存高亮的 风险评估
    riskClick(item) {
      // 1.高亮切换
      this.highlight(item);
      // 2.找出高亮
      this.searchData.risks = [];
      this.riskActive.forEach(item => this.searchData.risks.push(item.value));
      // 3.搜索
      this.onSearch();
    },
    // 保存高亮的 跨地区联姻
    regionClick(item) {
      // 1.高亮切换
      this.highlight(item);
      // 2.找出高亮
      this.searchData.marriageAreaCodes = [];
      this.regionActive.forEach(item => this.searchData.marriageAreaCodes.push(item.code));
      // 3.搜索
      this.onSearch();
    },
    // 重置选中
    resetOption() {
      this.personNumData.map(item => (item.isSelected = false));
      this.riskData.map(item => (item.isSelected = false));
      this.regionData.map(item => (item.isSelected = false));
      this.searchData.countAreas = [];
      this.searchData.risks = [];
      this.searchData.marriageAreaCodes = [];
      // 3.搜索
      this.onSearch();
    }
  }
};
</script>
<style lang='less' scoped>
.archives-search-box {
  overflow: hidden;
  .search {
    margin-top: 20px;
    overflow: hidden;
    .title {
      float: left;
      font-size: 18px;
      color: #424A57;
      font-weight: 700;
    }
    .ivu-input-wrapper {
      float: right;
      width: 40%;
      margin-right: 20px;
      /deep/ input {
        border-radius: 0;
      }
    }
    button {
      float: right;
      background-color: #0668C8;
      color: #fff;
    }
  }
  .search-option {
    background-color: #fff;
    margin-top: 18px;
    border-radius: 4px 4px 0 0;
    padding: 14px 6px 3px 16px;
    border: 1px solid #E0E3E6;
    border-bottom: none;
    .search-total {
      margin-bottom: 10px;
      color: #101010;
      .text {
        font-size: 16px;
        color: #333;
        font-weight: 700;
        padding-right: 4px;
      }
      .textTotal {
        position: relative;
        bottom: 2px;
      }
    }
  }
  .option {
    overflow: hidden;
    .active {
      background-color: #0668C8;
      color: #fff;
    }
    .label {
      width: 100px;
      text-align: right;
      float: left;
      font-size: 14px;
      margin-top: 10px;
      color: #666;
      margin-right: 10px;
    }
    ul {
      overflow: hidden;
      font-size: 14px;
      text-align: center;
      li {
        float: left;
        padding: 2px 8px;
        border: 1px solid #ccc;
        border-radius: 2px;
        margin-right: 10px;
        margin-top: 10px;
        color: #333;
        cursor: pointer;
        min-width: 84px;
      }
    }
  }
  .preview {
    overflow: hidden;
    position: relative;
    margin-top: 10px;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    .preview-title {
      float: left;
      font-size: 14px;
      font-weight: 700;
      margin-top: 10px;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }
    .content {
      overflow: hidden;
      padding-right: 200px;
      .classify {
        float: left;
        font-size: 14px;
        margin-left: -16px;
        .classify-item {
          float: left;
          padding: 3px 4px 3px 8px;
          margin: 10px 0 10px 16px;
          background-color: #F0F2F5;
          border-radius: 2px;
          cursor: pointer;
          .label {
            float: left;
            font-size: 12px;
            color:#5A5E66;
          }
          ul {
            float: left;
            li {
              float: left;
              padding: 0 4px;
              font-size: 12px;
              font-weight: 700;
              color: #0668C8;
              i {
                color: #C0C4CC;
                font-size: 18px;
                padding-bottom: 1px;
                margin-left: 2px;
              }
            }
          }
        }
      }
    }
    .reset {
      position: absolute;
      right: 10px;
      top: 9px;
      cursor: pointer;
      width: 72px;
      line-height: 26px;
      color: #333;
      text-align: center;
      font-size: 12px;
      border: 1px solid #ccc;
      border-radius: 2px;
    }
  }
  .regionUl {
    position: relative;
    padding-right: 110px;
    .regionLabel {
      position: absolute;
      right: 0px;
      min-width: 0px;
    }
  }
}
</style>
