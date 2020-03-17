<template>
  <div class="useHelp" @click.stop="ifCloseGuidelinesShow">
    <div class="title">
      帮助
      <!-- <i class="iconfont icon-guanbi1 close" @click="closeGuidelinesShow"></i> -->
      <Icon @click="closeGuidelinesShow" class="close-nav" type="md-close" />
    </div>
    <div class="content">
      <Tabs :value="guideType" @click="switchGuide()">
        <TabPane label="使用帮助" name="使用帮助" :index="index1">
          <div class="entireInput">
            <!-- <div class="inputDiv">
              <Input
                search
                enter-button="Search"
                v-model="keyWordUseHelp"
                placeholder="请搜索标题、内容"
              />
            <input type="text"placeholder="请搜索标题、内容" />-->
            <!-- <i class="iconfont icon-guanbi1 close" @click="clearUseHelpKeyWord"></i> 
            </div>
            <div class="button" @click="searchUseHelp">搜索</div>-->
            <Input
              search
              clearable
              enter-button="搜索"
              @on-search="searchUseHelp"
              v-model="keyWordUseHelp"
              placeholder="请搜索标题、内容"
              style="width: 80%"
            />
          </div>
          <div class="articleList">
            <div
              v-for="(item,index) in useHelpInfoList"
              :key="index"
              :class="index == openIndex?'act list':'list'"
            >
              <div class="resume">{{ index+1 }}. {{item.title}}</div>
              <div class="articleContent">
                <div class="introShow" v-html="item.intro"></div>
                <div class="open" @click="openInfo(index)">
                  <span>
                    <i class="iconfont icon-xiangxia1"></i>
                  </span>
                </div>
                <div class="close" @click="closeInfo(index)">
                  <span>
                    <i class="iconfont icon-xiangshang"></i>
                  </span>
                </div>
              </div>

              <div class="template download">
                <div class="li" v-for="(file,i) in item.files" :key="i">
                  <i class="iconfont icon-wenjian1"></i>
                  <a :href="$config.helpFilePath+file.linkName" download>{{file.fileName}}</a>
                </div>
              </div>
            </div>
          </div>
          <Page
            class="useHelpPageInfo"
            :total="useHelpInfoTotal"
            size="small"
            :page-size="useHelpInfoPageSize"
            :current="useHelpInfoPageIndex"
            @on-change="changeUseHelpInfoPageInfo"
            show-total
          />
        </TabPane>
        <TabPane label="常见问题" name="常见问题" :index="index2">
          <div class="entireInput">
            <!-- <div class="inputDiv">
              <input type="text" v-model="keyWordProblem" placeholder="请搜索标题、内容" />
              <i class="iconfont icon-guanbi1 close" @click="clearProblemKeyWord"></i>
            </div>
            <div class="button" @click="searchProblem">搜索</div>-->
            <Input
              search
              clearable
              enter-button="搜索"
              @on-search="searchProblem"
              v-model="keyWordProblem"
              placeholder="请搜索标题、内容"
              style="width: 80%"
            />
          </div>
          <div class="articleList">
            <div
              v-for="(item,index) in problemInfoList"
              :key="index"
              :class="index == openIndex?'act list':'list'"
            >
              <div class="resume">{{ index+1 }}. {{item.title}}</div>
              <!-- <div class="articleContent" v-html="item.intro"></div> -->
              <div class="articleContent">
                <div class="introShow" v-html="item.intro"></div>
                <div class="open" @click="openInfo(index)">
                  <span>
                    <i class="iconfont icon-xiangxia1"></i>
                  </span>
                </div>
                <div class="close" @click="closeInfo(index)">
                  <span>
                    <i class="iconfont icon-xiangshang"></i>
                  </span>
                </div>
              </div>
              <div class="template download">
                <div class="li" v-for="(file,i) in item.files" :key="i">
                  <i class="iconfont icon-wenjian1"></i>
                  <a :href="$config.helpFilePath+file.linkName" download>{{file.fileName}}</a>
                </div>
              </div>
            </div>
          </div>
          <Page
            class="problemPageInfo"
            :total="problemInfoTotal"
            size="small"
            :page-size="problemInfoPageSize"
            :current="problemInfoPageIndex"
            @on-change="changeProblemInfoPageInfo"
            show-total
          />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as apis from "@/api/collection/index.js";
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      open: true,
      openIndex: null,
      guideType: "",
      index1: 1,
      index2: 2,
      keyWordUseHelp: "", //使用帮助关键字
      keyWordProblem: "", //常见问题关键字
      fileDownloadPath: this.$config.fileDownloadPath,
      useHelpInfoPageIndex: 1, //当前页
      useHelpInfoPageSize: 10, //当前页条数
      useHelpInfoTotal: 0,
      useHelpInfoList: null, //使用帮助列表
      problemInfoPageIndex: 1, //当前页
      problemInfoPageSize: 10, //当前页条数
      problemInfoTotal: 0,
      problemInfoList: null //常见问题列表
    };
  },
  mounted() {
    this.init();
  },
  watch: {},
  //方法集合
  methods: {
    init() {
      const that = this;
      var problemInfoParams = {
        pageIndex: that.problemInfoPageIndex,
        pageSize: that.problemInfoPageSize
      };
      var useHelpInfoParams = {
        pageIndex: that.useHelpInfoPageIndex,
        pageSize: that.useHelpInfoPageSize
      };
      that.requestUseHelp(useHelpInfoParams);
      that.requestProblem(problemInfoParams);
    },
    openInfo(index) {
      this.openIndex = index;
    },
    closeInfo(index) {
      this.openIndex = null;
    },
    // 请求用户帮助列表
    requestUseHelp(useHelpInfoParams) {
      const that = this;
      apis.useHelpInfo(useHelpInfoParams).then(res => {
        if (res.code == 200) {
          that.useHelpInfoList = res.data.data;
          that.useHelpInfoTotal = res.data.total;
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // 请求常见问题列表
    requestProblem(problemInfoParams) {
      const that = this;
      apis.problemInfo(problemInfoParams).then(res => {
        if (res.code == 200) {
          that.problemInfoList = res.data.data;
          that.problemInfoTotal = res.data.total;
        } else {
          that.$Message.error(res.msg);
        }
      });
    },
    // 搜索用户帮助
    searchUseHelp() {
      const that = this;
      var useHelpInfoParams = {
        pageIndex: that.useHelpInfoPageIndex,
        pageSize: that.useHelpInfoPageSize,
        keyWord: that.keyWordUseHelp
      };
      this.requestUseHelp(useHelpInfoParams);
    },
    // 搜索常见问题
    searchProblem() {
      const that = this;
      var problemInfoParams = {
        pageIndex: that.problemInfoPageIndex,
        pageSize: that.problemInfoPageSize,
        keyWord: that.keyWordProblem
      };
      this.requestProblem(problemInfoParams);
    },
    // 清除使用帮助关键字
    clearUseHelpKeyWord() {
      this.keyWordUseHelp = "";
    },
    // 清除常见问题关键字
    clearProblemKeyWord() {
      this.keyWordProblem = "";
    },
    // 分页 使用帮助
    changeUseHelpInfoPageInfo(number) {
      const that = this;
      var useHelpParams = {
        pageIndex: number,
        pageSize: that.useHelpInfoPageSize
      };
      this.requestUseHelp(useHelpParams);
    },
    // 分页 常见问题
    changeProblemInfoPageInfo(number) {
      const that = this;
      var problemInfoParams = {
        pageIndex: number,
        pageSize: that.problemInfoPageSize
      };
      this.requestProblem(problemInfoParams);
    },
    getType(name) {
      this.guideType = name;
      this.openIndex = null;
      console.log(this.guideType, "222222");
    },
    switchGuide(name) {
      this.getType(name);
    },
    closeGuidelinesShow() {
      this.$emit("closeGuidelinesModal", false);
    },
    ifCloseGuidelinesShow(evt) {
      if (evt.target.className == "close-btn") {
        return false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.useHelp {
  // position: absolute;
  position: fixed;
  right: 0;
  top: 67px;
  z-index: 99998;
  width: 29.5%;
  height: calc(100% - 67px;);
  background: #ffffff;
  box-shadow: 0px 7px 20px 0px rgba(40, 71, 117, 0.4) !important;
  .title {
    width: 100%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    position: relative;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    background: #0668c8;
    border-bottom: 1px solid #0668c8;
    .close-nav {
      font-size: 24px;
      float: right;
      line-height: 42px;
      padding-right: 4px;
      cursor: pointer;
    }
    .close {
      position: absolute;
      right: 7px;
      color: #ffffff;
    }
  }
  .content {
    font-size: 12px;
    color: #666666;
    // height: 100%;
    // overflow-y: auto;
    height: calc(100% - 32px);
    overflow: hidden;
    .ivu-tabs {
      height: 100%;
      /deep/.ivu-tabs-content.ivu-tabs-content-animated {
        height: calc(100% - 56px);
      }
    }
  }
}
/deep/.ivu-tabs-tabpane {
  padding: 0 1px 0 14px;
  position: relative;
  .entireInput {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    margin-bottom: 15px;
    .inputDiv {
      position: relative;
      width: 244px;
      border: 1px solid rgba(224, 227, 230, 1);
      padding: 0px 7px;
      input {
        height: 28px;
        line-height: 17px;
        border-radius: 2px;
        color: rgb(153, 153, 153);
        font-size: 12px;
        text-align: left;
        border: none;
        width: 100%;
        outline: none;
      }
      i {
        position: absolute;
        right: 5px;
        top: 2px;
      }
    }
    .button {
      width: 59px;
      height: 28px;
      line-height: 28px;
      border-radius: 4px;
      cursor: pointer;
      background-color: rgba(6, 104, 200, 1);
      color: #ffffff;
      font-size: 12px;
      text-align: center;
      border: none;
      outline: none;
      margin-left: 6px;
    }
  }
  .articleList {
    height: calc(100% - 94px);
    overflow: auto;
    position: relative;
    padding-bottom: 20px;

    .list {
      padding: 16px 10px 11px 0;
      border-bottom: 1px solid #ececec;
      position: relative;
      .resume {
        color: #666666;
        font-size: 14px;
        margin-bottom: 7px;
        font-weight: bold;
      }
      .open,
      .close {
        text-align: center;
        position: absolute;
        bottom: -7px;
        left: 0;
        width: 100%;
        height: 36px;
        background-image: linear-gradient(
          -180deg,
          rgba(245, 246, 247, 0) 0,
          #ffffff 95%
        );
        span {
          cursor: pointer;
          display: block;

          cursor: pointer;
          display: block;
          position: absolute;
          bottom: 0;
          left: 49%;
          z-index: 99999;
          i {
            color: #999;
          }
        }
      }
      .close {
        span {
          display: none;
        }
      }
      .articleContent {
        max-height: 76px;
        overflow: hidden;
        position: relative;
        .introShow {
          // height: 64px;
        }
      }
      .template {
        .li {
          display: inline-block;
          padding: 6px 5px 2px;
          i {
            color: #0668c8;
            font-size: 14px;
          }
          a {
            font-size: 12px;
            color: #333333;
            text-decoration: underline;
          }
        }
      }
    }
    .list.act {
      .articleContent {
        max-height: 100% !important;
      }
      .open {
        span {
          display: none;
        }
      }
      .close {
        position: inherit;
        height: 22px;
        span {
          display: block;
        }
      }
    }
  }
}
/deep/.useHelpPageInfo.ivu-page,
/deep/.problemPageInfo {
  width: 100%;
  height: 36px;
  text-align: center;
  position: absolute;
  bottom: 0px;
  left: 12px;
  background: #ffffff;
}
.problemPageInfo /deep/.ivu-tabs {
  height: 100%;
  .ivu-tabs-content-animated {
    height: 100%;
  }
}
/deep/.ivu-input-icon {
  right: 55px;
}
</style>
