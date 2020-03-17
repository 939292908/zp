<template>
  <Modal
    v-model="seeEnterInfo"
    on-cancel="closeInfo"
    :title="'出入境记录('+(total+collectTotal)+')'"
    width="80%"
  >
    <Tabs type="card" @on-click="onclickTab">
      <TabPane :label="'已归档（'+total+'）'" v-if="formal"></TabPane>
      <TabPane :label="'新增（'+collectTotal+'）'" v-if="collect"></TabPane>
    </Tabs>
    <div v-show="!collectTab">
      <Table stripe max-height="400" :columns="columns1" :data="recordLists"></Table>
      <Page
        class="pageInfo"
        :total="total"
        :page-size="pageSize"
        :page-size-opts="[5,10,15,20]"
        show-total
        show-sizer
        @on-change="pageInfo"
        @on-page-size-change="pageSizeInfo"
      />
    </div>
    <div v-show="collectTab">
      <Table stripe max-height="400" :columns="columns2" :data="recordCollectLists"></Table>
      <Page
        class="pageInfo"
        :total="collectTotal"
        :page-size="pageCollectSize"
        :page-size-opts="[5,10,15,20]"
        show-total
        show-sizer
        @on-change="collectPageInfo"
        @on-page-size-change="collectPageSizeInfo"
      />
    </div>

    <div slot="footer">
      <Button type="info" size="large" @click="closeInfo">确定</Button>
    </div>
  </Modal>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as apis from "@/api/collection/index.js";
export default {
  props: {
    idNumber: {
      type: String,
      default: ""
    },
    areaCode: {
      type: String,
      default: ""
    }
  },

  components: {},
  data() {
    //这里存放数据
    return {
      collect: true,
      formal: true,
      collectTab: true,
      seeEnterInfo: false,
      recordLists: [], //出入境信息列表
      pageIndex: 1, //当前页数
      pageSize: 5, //一页条数
      total: 0, //总条数
      recordCollectLists: [], //出入境信息列表-流水
      pageCollectIndex: 1, //当前页数-流水
      pageCollectSize: 5, //一页条数-流水
      collectTotal: 0, //总条数
      columns1: [
        { title: "序号", type: "index", width: 60, align: "center" },
        {
          title: "出境时间",
          key: "outBoundTime",
          render: (h, params) => {
            return h(
              "div",
              params.row.outBoundTime
                ? this.$moment(params.row.outBoundTime).format("YYYY-MM")
                : ""
            );
          },
          align: "center"
        },
        { title: "出境方式", key: "outBoundWay", align: "center" },
        { title: "出境理由", key: "outBoundReason", align: "center" },
        { title: "出境前往国家", key: "outBoundToCountry", align: "center" },
        { title: "出境口岸（通道）", key: "outBoundChannel", align: "center" },
        {
          title: "入境时间",
          key: "entryTime",
          render: (h, params) => {
            return h(
              "div",
              params.row.entryTime
                ? this.$moment(params.row.entryTime).format("YYYY-MM")
                : ""
            );
          },
          align: "center"
        },
        { title: "入境口岸（通道）", key: "entryChannel", align: "center" },
        { title: "危害等级", key: "harmLevel", width: 90, align: "center" },
        { title: "风险等级", key: "riskLevel", width: 90, align: "center" }
      ],
      columns2: [
        { title: "序号", type: "index", width: 60, align: "center" },
        {
          title: "出境时间",
          key: "outBoundTime",
          render: (h, params) => {
            return h(
              "div",
              params.row.outBoundTime
                ? this.$moment(params.row.outBoundTime).format("YYYY-MM")
                : ""
            );
          },
          align: "center"
        },
        { title: "出境方式", key: "outBoundWay", align: "center" },
        { title: "出境理由", key: "outBoundReason", align: "center" },
        { title: "出境前往国家", key: "outBoundToCountry", align: "center" },
        { title: "出境口岸（通道）", key: "outBoundChannel", align: "center" },
        {
          title: "入境时间",
          key: "entryTime",
          render: (h, params) => {
            return h(
              "div",
              params.row.entryTime
                ? this.$moment(params.row.entryTime).format("YYYY-MM")
                : ""
            );
          },
          align: "center"
        },
        { title: "入境口岸（通道）", key: "entryChannel", align: "center" },
        { title: "危害等级", key: "harmLevel", width: 90, align: "center" },
        { title: "风险等级", key: "riskLevel", width: 90, align: "center" }
      ]
    };
  },
  mounted() {
    if (
      this.$route.name == "ExitAndEntry" ||
      this.$route.name == "UnderAttack"
    ) {
      this.collect = false;
      this.collectTab = false;
    }
  },
  watch: {
    idNumber: {
      handler(val) {
        var idNumber = val || this.$parent.idNumber;
        this.getOutboundinfoList(val);
        if (!(this.$route.name == "ExitAndEntry")) {
          this.getCollectOutboundinfoList(val);
        }
      },
      immediate: true
    },
    areaCode: {
      handler(val) {},
      immediate: true
    },
    recordLists: {
      handler(val) {},
      immediate: true
    }
  },
  //方法集合
  methods: {
    // 切换
    onclickTab(name) {
      if (name == 0) {
        this.collectTab = true;
      } else {
        this.collectTab = false;
      }
    },
    // 关闭信息
    closeInfo() {
      this.seeEnterInfo = false;
    },
    // 选择当前第几页
    pageInfo(number) {
      console.log(number);
      this.pageIndex = number;
      this.getOutboundinfoList(
        this.$parent.markerObjDetail.personInfo.idNumber
      );
    },
    // 选择当前第几页
    collectPageInfo(number) {
      console.log(number);
      this.pageCollectIndex = number;
      this.getCollectOutboundinfoList(
        this.$parent.markerObjDetail.personInfo.idNumber
      );
    },
    // 选择一页多少个
    pageSizeInfo(number) {
      console.log(number);
      this.pageSize = number;
      this.getOutboundinfoList(
        this.$parent.markerObjDetail.personInfo.idNumber
      );
    },
    // 选择一页多少个
    collectPageSizeInfo(number) {
      console.log(number);
      this.pageCollectSize = number;
      this.getCollectOutboundinfoList(
        this.$parent.markerObjDetail.personInfo.idNumber
      );
    },
    // 获取出入境信息--流水
    getCollectOutboundinfoList(id = null) {
      const that = this;
      let idNumber = id || that.idNumber;
      let areaCode = that.areaCode || that.$route.query.areaCode;
      let villageCode = { villageCode: areaCode };
      let collectId = { collectId: that.$route.query.collectId };
      var params = {
        pageIndex: that.pageCollectIndex,
        pageSize: that.pageCollectSize
      };
      if (areaCode && idNumber) {
        apis
          .newCollectGetOutboundinfoList(idNumber, params, collectId)
          .then(res => {
            if (res.code == 200) {
              console.log(res);
              that.recordCollectLists = res.data.data;
              that.collectTotal = res.data.total;
            }
          });
      }
    },
    // 获取出入境信息--正式
    getOutboundinfoList(id = null) {
      const that = this;
      let idNumber = id || that.idNumber;
      let areaCode = that.areaCode || that.$route.query.areaCode;
      let villageCode = { villageCode: areaCode };
      let collectId = { collectId: that.$route.query.collectId };
      var params = {
        pageIndex: that.pageIndex,
        pageSize: that.pageSize
      };
      if (areaCode && idNumber) {
        apis.newGetOutboundinfoList(idNumber, params).then(res => {
          if (res.code == 200) {
            console.log(res);
            that.recordLists = res.data.data;
            that.total = res.data.total;
          }
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
/deep/.ivu-modal-content {
  .ivu-modal-body {
    // height: 450px;
    .pageInfo.ivu-page {
      text-align: center;
      margin-top: 8px;
    }
  }
}
</style>