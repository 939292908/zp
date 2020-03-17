<template>
  <div>
    <!-- 档案列表 -->
    <div class="archives-box bar">
      <!-- 计时 -->
      <div class="time-total">本次搜索耗时{{archivesData.executeTime}}秒，搜索出{{archivesData.total}}条包含关键字信息的图谱</div>
      <div class="box" v-for="(item,index) in archivesData.data" :key="index">
        <div class="cont">
          <!-- 图 -->
          <!-- <div class="img-box">
            <div class="risk-title" :style="{background: setBackground(item.riskLevel)}">{{item.riskLevel}}风险</div>
          </div> -->
          <!-- 简述 -->
          <div class="div_cont">
            <p class="header_title" :title="item.name" :style="{background: setBackground(item.riskLevel)}">
              <span class="name" @click="toArchivesMap(item)">{{ item.name }}</span>
              <span class="risk-label">
                {{ item.riskLevel == '极高' ? '极高风险' :
                    item.riskLevel == '高' ? '高风险' :
                    item.riskLevel == '中' ? '中等风险' :
                    item.riskLevel == '低' ? '低风险' : '无风险'
                 }}</span>
            </p>
            <div class="tp_box">
              <div class="div_imgcont">
                <div class="h_pdiv">
                  <p class="h_p">
                    <span class="span_cor2 label-one one-row">宗族总人数：</span>
                    <span class="span_cor cor_fz">{{ item.personCount }}</span>
                  </p>
                  <p class="h_p">
                    <span class="span_cor2 label-two">家族图谱数：</span>
                    <span class="span_cor cor_fz">{{ item.spectrumArchiveMaps.length }}</span>
                  </p>
                  <p class="h_p mtop">
                    <span class="span_cor2 label-three">目标户籍地：</span>
                    <span class="span_cor city" :title="item.householderAddress">{{ item.householderAddress }}</span>
                  </p>
                  <p class="h_p">
                    <span class="span_cor2 label-two">跨地区联姻：</span>
                    <span class="span_cor cor_fz oneRow" :title="item.diffAreaMarrigage">{{ item.diffAreaMarrigage }}</span>
                  </p>
                </div>
                <div class="archives-footer" @click="toArchivesMap(item)">查看谱系档案</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="page">
        <div>
          <Page
            :total="archivesData.total"
            :current="searchData.pageIndex"
            :page-size="searchData.pageSize"
            show-total
            show-elevator
            @on-change="handlePageChange"
          ></Page>
        </div>
      </div>
    </div>
    <!-- loading -->
    <loading color="white" v-model="statusList.archivesLoadingShow"></loading>
    <!-- <div class="archives-loading-bg" v-show="statusList.archivesLoadingShow">
      <div class="archives-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div> -->

  </div>
</template>

<script>
import * as comApis from "@/api/search/index.js";
import Loading from '@/components/assembly/Loading'
export default {
   components:{
    Loading
  },
  data() {
    return {
      searchData: {}, // 搜索筛选
      archivesData: {}, // 卡片数据
      statusList: {
        archivesLoadingShow: false // loading
      }
    };
  },
  // mounted() {},

  methods: {
    // 获取卡片列表数据
    getArchiveData(searchData) {
      this.searchData = JSON.parse(JSON.stringify(searchData)); // 保存搜索组件传来的 搜索筛选
      this.statusList.archivesLoadingShow = true;

      comApis
        .getArchivesCard(searchData)
        .then(response => {
          if (response.code == 200) {
            this.statusList.archivesLoadingShow = false;
            this.archivesData = response.data;
            this.$emit('getTotal',response.data.total);
          } else {
            this.$Message.warning(response.message);
            this.statusList.archivesLoadingShow = false;
          }
        })
        .catch(error => {
          this.statusList.archivesLoadingShow = false;
          console.log(error);
        });
    },
    toArchivesMap(item) {
      // 判断是否有访问页面的权限
      if (this.hasPageAuth(this.constantPageMap.PAGE_ArchivesMap_ID)) {
        let routeData = this.$router.resolve({
          path: "/pedigreeDetail", //archivesmap
          query: {
            archiveId: item.archiveId,
            title: item.name,
            mc: "谱系档案"
          }
        });
        window.open(routeData.href, "_blank");
      } else {
        this.$Message.info(this.constantNoAuthData);
      }
    },
    // 点击同步分页
    handlePageChange(pageIndex) {
      this.searchData.pageIndex = pageIndex;
      this.getArchiveData(this.searchData);
    },
    // 设置标签背景色
    setBackground (label) {
      switch (label) {
        case '极高':
          return '#D74348'
          break;
        case '高':
          return '#ED8F21'
          break;
        case '中':
          return '#D9C919'
          break;
        case '低':
          return '#4264D7'
          break;

        default:
          return '#A8ACB3'
          break;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.archives-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #E0E3E6;
  border-top: none;
  padding: 10px;
  .time-total {
    background-color: #fff;
    font-size: 12px;
    color: #93989D;
    padding: 0 0 4px 10px;
  }
  .box {
    width: 25%;
    float: left;
    .cont {
      padding: 10px;
      overflow: hidden;
      .img-box {
        height: 180px;
        position: relative;
        background-color: #E3E3E3;
        overflow: hidden;
        .risk-title {
          position: absolute;
          background-color: #bbb;
          font-size: 12px;
          color: #fff;
          top: 18px;
          left: -26px;
          transform: rotate(313deg);
          padding: 2px 0;
          width: 104px;
          text-align: center;
        }
      }
      .div_cont {
        box-shadow: none !important;
        background-color: #12325b;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        border: 1px solid #E3E3E3!important;
        .city {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .mtop {
          overflow: hidden;
        }
        .label-three {
          height: 38px;
          display: block;
          float: left;
        }
        .label-four {
          margin-left: 36px;
        }
        .archives-footer {
          width: 100%;
          margin: 14px auto 6px;
          text-align: center;
          border-radius: 2px;
          line-height: 40px;
          color: #666;
          font-size: 14px;
          background-color: #F0F2F5;
          cursor: pointer;
        }
        border-radius: 4px;
        .header_title {
          width: 100%;
          padding: 0 10px 0 12px;
          line-height: 48px;
          position: relative;
          color:  #fff;
          border-bottom: none;
          .name {
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            display: block;
            padding-right: 3.6em;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
          .risk-label {
            position: absolute;
            right: 8px;
            top: 0;
          }
        }
        .tp_box {
          padding: 0 15px;
          .h_p {
            overflow: hidden;
            .span_cor2 {
              float: left;
            }
            .one-row {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: block;
            }
          }
          .div_imgcont {
            padding: 10px 0;
            //height:150px;
            overflow: hidden;
            width: 100%;
            .img_width {
              float: left;
              width: 80px;
              height: 111px;
              margin-right: 20px;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}
.page {
 margin: 10px;
 overflow: hidden;
 width: 100%;
 height: 60px;
//  position: relative;
 &>div {
  //  display: inline-block;
  //  position: absolute;
  //  left: 50%;
  //  transform: translateX(-50%);
   margin-top: 16px;
 }
}
.archives-loading-bg{
  position: fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  z-index:99999;
  background:rgba(0,0,0,.5);
}
.oneRow {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
