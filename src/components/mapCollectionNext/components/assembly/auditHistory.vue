<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 19:50:14
 * @LastEditTime: 2019-12-04 18:21:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <d-drawer width="440" v-model="showHistroy" title="图谱审核记录">
    <div class="map-histroy-body">
      <div class="map-histroy-header">
        <span>{{histroyData.mapName}}</span>
        <span class="map-state">（{{histroyData.currentAuditState}}）</span>
      </div>
      <Collapse simple v-model="current">
        <!-- <Panel name="0">sdfsdf</Panel> -->
        <Panel :name="index | format" v-for="(item,index) in auditRecordData" :key="index">
          第{{auditRecordData.length-index}}次提交
          <p slot="content">
            <Timeline>
              <TimelineItem :color="stateColor[it.auditStateValue]" v-for="(it,i) in item" :key="i">
                <div class="stateItem">
                  <h3 :style="{color:stateFontColor[it.auditStateValue]}">{{it.auditStateValue}}</h3>
                  <p class="p-name-phone">
                    <span class="auditUserName">{{it.auditUserName}}</span>
                    <span class="gang">|</span>
                    <span>{{it.auditUserPhone}}</span>
                  </p>
                  <p>{{it.auditTime}}</p>
                  <p>{{it.auditDeptName}}</p>
                  <p class="backReason">{{it.auditComment}}</p>
                </div>
              </TimelineItem>
            </Timeline>
          </p>
        </Panel>
      </Collapse>
    </div>
    <div class="map-histroy-footer">
      <Button @click="showHistroy = false">关闭</Button>
    </div>
  </d-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    histroyData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    format(val) {
      return val.toString();
    }
  },
  data() {
    return {
      showHistroy: this.value,
      stateFontColor: {
        提交: "#19be6b",
        通过: "#19be6b",
        退回: "#ed4014",
        审核中: "#2d8cf0"
      },
      stateColor: {
        提交: "green",
        通过: "green",
        退回: "red",
        审核中: "blue"
      },
      current: null,
      histroyList: this.histroyData
    };
  },
  computed: {
    auditRecordData() {
      return this.histroyData.auditRecordData;
    }
    // current() {
    //   debugger;
    //   return this.auditRecordData && this.auditRecordData.length > 0
    //     ? this.histroyData.auditRecordData.length - 1 + ""
    //     : "0";
    // }
  },
  components: {
    DDrawer: () => import("@/components/assembly/Drawer")
  },
  watch: {
    value: {
      handler(val) {
        this.showHistroy = val;
      },
      immediate: true
    },
    showHistroy(val) {
      if (!val) {
        this.histroyList = {};
      } else {
        setTimeout(() => {
          this.current =
            this.histroyList.auditRecordData &&
            this.histroyList.auditRecordData.length > 0
              ? this.histroyList.auditRecordData.length - 1 + ""
              : "0";
        }, 200);
      }
      this.$emit("handleHistroy", val);
      // this.current = this.histroyData.auditRecordData.length - 1 + "";
    },
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
.map-histroy-header {
  font-family: "SourceHanSansSC-regular";
  padding-bottom: 16px;
  span {
    color: #333;
    font-size: 14px;
    line-height: 28px;
    font-weight: bold;
  }
  .map-state {
    color: #3e84ee;
    font-weight: normal;
  }
}
.map-histroy-body {
  margin-bottom: 53px;
  /deep/.ivu-collapse-simple {
    border: none;
    background: none;
    .ivu-collapse-item {
      // border: none;
      .ivu-collapse-header {
        font-size: 13px;
        height: 38px;
        line-height: 38px;
        padding-left: 16px;
        color: #666;
        position: relative;
        border-bottom: 1px solid transparent;
        i {
          margin-right: 3px;
          position: absolute;
          right: 6px;
          top: 10px;
        }
        i:before {
          font-size: 16px;
          color: #999;
        }
      }
      .ivu-collapse-content {
        background: none;
        padding: 0 16px;
        .ivu-collapse-content-box {
          overflow: hidden;
          padding-bottom: 16px;
        }
      }
    }
  }
  /deep/.ivu-timeline {
    .ivu-timeline-item {
      padding: 0 0 12px 0;
      .ivu-timeline-item-tail {
        left: 6px;
        border-left: 1px solid #ccc;
      }
      .ivu-timeline-item-head {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: 1px solid transparent;
      }
      .ivu-timeline-item-head-green {
        background-color: #19be6b;
      }
      .ivu-timeline-item-head-red {
        background-color: #ed4014;
      }
      .ivu-timeline-item-head-blue {
        background-color: #2d8cf0;
      }
    }
  }
  .stateItem {
    h3 {
      font-size: 14px;
    }
    .p-name-phone {
      font-size: 13px;
      .auditUserName {
        font-weight: bold;
      }
      .gang {
        color: #cccccc;
        padding: 0 3px;
      }
    }
    .backReason {
      color: #ed4014;
    }
    font-size: 12px;
    color: #666;
  }
}
.map-histroy-footer {
  width: 440px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
