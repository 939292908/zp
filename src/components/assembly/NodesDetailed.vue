<template>
  <div class="nodesDetailed">
    <div class="nodesDetailed-sidebar">
      <div class="sidebar-top"></div>
      <div class="close-btn" @click="closeNodesDetailed"></div>
      <div class="sidebar-bottom"></div>
    </div>
    <div class="cont-box">
      <div class="grid-box">
        <div class="head-left"></div>
        <div class="title">
          <span>明细信息</span>
          <span @click="closeNodesDetailed">
            <i class="iconfont close icon-guanbi1"></i>
          </span>
        </div>
        <div class="infor-details" v-if="!(this.modal && this.modal.allData[0]) ? false : true ">
          <div class="person-label">
            <div class="label-infor">
              <div class="activity-inofr">
                <div class="header">
                  <i
                    :class="this.modal && this.modal.allData[0].nodeType == 'YS_SJJZXX' ? 'iconfont icon-cellfone' : this.modal.allData[0].nodeType == 'YS_YHKXX' ? 'iconfont icon-WY' : this.modal.allData[0].nodeType == 'KDGSXX' ? 'iconfont icon-kuaidigongsi' : '' "
                  ></i>
                </div>
                <!-- 物流信息 -->
                <div
                  class="label"
                  v-if="this.modal && this.modal.allData[0].nodeType == 'KDGSXX' ? true : false "
                >
                  <ul>
                    <!-- <li><span>发货人</span><span>{{}}</span></li> -->
                    <li>
                      <span>承运商</span>
                      <span>{{this.modal && this.modal.allData[0].properties.NAME}}</span>
                    </li>
                    <li>
                      <span>联系电话</span>
                      <span>{{this.modal && this.modal.allData[0].properties.KFDH}}</span>
                    </li>
                  </ul>
                </div>

                <!-- 话单信息 -->
                <div
                  class="label label-hd"
                  v-if="this.modal && this.modal.allData[0].nodeType == 'YS_SJJZXX' ? true : false "
                >
                  <ul>
                    <li>
                      <span>电话号码</span>
                      <span>{{this.modal && this.modal.allData[0].properties.YDDH}}</span>
                    </li>
                    <li>
                      <span>机主姓名</span>
                      <span>{{this.modal && this.modal.allData[0].properties.XM}}</span>
                    </li>
                    <li>
                      <span>证件号码</span>
                      <span>{{this.modal && this.modal.allData[0].properties.ZJHM}}</span>
                    </li>
                    <!-- <li><span>运营商</span><span>{{}}</span></li> -->
                  </ul>
                </div>

                <!-- 资金交易信息 -->
                <div
                  class="label label-zj"
                  v-if="this.modal && this.modal.allData[0].nodeType == 'YS_YHKXX' ? true : false "
                >
                  <ul>
                    <li>
                      <span>姓名</span>
                      <span>{{this.modal && this.modal.allData[0].properties.XM}}</span>
                    </li>
                    <li>
                      <span>身份号码</span>
                      <span>{{this.modal && this.modal.allData[0].properties.GMSFZHM}}</span>
                    </li>
                    <li>
                      <span>联系电话</span>
                      <span>{{this.modal && this.modal.allData[0].properties.LXDH}}</span>
                    </li>
                    <li>
                      <span>银行账号</span>
                      <span>{{this.modal && this.modal.allData[0].properties.YHZH}}</span>
                    </li>
                    <li>
                      <span>开户银行</span>
                      <span>{{this.modal && this.modal.allData[0].properties.KHYX_DWMC}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="border-bottom"></div>
          </div>
          <div class="node-info">
            <span
              class="node-title"
            >{{this.modal && this.modal.allData[0].nodeType == 'YS_SJJZXX' ? '话单信息' : this.modal && this.modal.allData[0].nodeType == 'YS_YHKXX' ? '资金交易信息' : this.modal.allData[0].nodeType == 'KDGSXX' ? '物流信息' : '' }}</span>
            <div class="node-date">
              <DatePicker
                type="date"
                v-model="startDate"
                :options="startTimeOptions"
                format="yyyy-MM-dd"
                placeholder="开始日期"
                style="width: 110px"
                @on-change="selectStartDate"
              ></DatePicker>
              <span>至</span>
              <DatePicker
                type="date"
                v-model="endDate"
                :options="endTimeOptions"
                format="yyyy-MM-dd"
                placeholder="结束日期"
                style="width: 110px"
                @on-change="selectEndDate"
              ></DatePicker>
            </div>
          </div>

          <!-- 物流信息 -->
          <!-- <div class="node-cont-list bar" v-if="this.modal.allData[0].nodeType == 'KDGSXX' ? true : false ">
            <div class="list" v-for="(item,index) in this.modal.allData[0].LSXX.data" :key="index">
              <div class="timeline-head">
                <ul>
                  <li><span>货物名称：</span><span>{{item.HW_WPMC}}</span></li>
                  <li><span>物流单号：</span><span>{{item.YDH}}</span></li>
                  <li @click="toDetailsPage(modal.allData[0].nodeType,modal.allData[0].id)"><i class="iconfont icon-chakan"></i></li>
                </ul>
              </div>
              <Timeline>
                <TimelineItem>
                  <div class="icon send">
                    <span>发</span>
                  </div>
                  <div class="content-date">
                    <p class="time">{{item.JJSJ.substring(0, 10)}}</p>
                  </div>
                  <div class="content-infor">
                    <ul>
                      <li><span class="xm">{{item.JJR_XM}}</span><span>{{item.JJR_LXDH}}</span></li>
                      <li>{{item.SFD+(!item.JJR_XZZ_DZMC ? '' : item.JJR_XZZ_DZMC)}}</li>
                    </ul>
                  </div>
                </TimelineItem>
                <TimelineItem>
                  <div class="icon collect">
                    <span>收</span>
                  </div>
                  <div class="content-date">
                    <p class="time">{{!item.SHSJ ? '' : item.SHSJ.substring(0, 10)}}</p>
                  </div>
                  <div class="content-infor">
                    <ul>
                      <li><span class="xm">{{item.SJR_XM}}</span><span>{{item.SJR_LXDH}}</span></li>
                      <li>{{item.SJD+(!item.SJR_XZZ_DZMC ? '' : item.SJR_XZZ_DZMC)}}</li>
                    </ul>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </div>-->
          <div
            class="node-cont-list bar"
            v-if="this.modal && this.modal.allData[0].nodeType == 'KDGSXX' ? true : false "
          >
            <div
              class="list"
              v-for="(item,index) in (this.modal && this.modal.allData[0].LSXX.data)"
              :key="index"
            >
              <div class="timeline-head">
                <ul @click="toDetailsPage">
                  <li>
                    <span>货物名称：</span>
                    <span>{{item.HW_WPMC}}</span>
                  </li>
                  <li>
                    <span>物流单号：</span>
                    <span>{{item.YDH}}</span>
                  </li>
                  <li>
                    <i class="iconfont icon-chakan"></i>
                  </li>
                </ul>
              </div>
              <Timeline>
                <TimelineItem>
                  <div class="icon send">
                    <span>发</span>
                  </div>
                  <div class="content-date">
                    <p class="time">{{item.JJSJ.substring(0, 10)}}</p>
                  </div>
                  <div class="content-infor">
                    <ul>
                      <li>
                        <span class="xm">{{item.JJR_XM}}</span>
                        <span>{{item.JJR_LXDH}}</span>
                      </li>
                      <li>{{item.SFD+(!item.JJR_XZZ_DZMC ? '' : item.JJR_XZZ_DZMC)}}</li>
                    </ul>
                  </div>
                </TimelineItem>
                <TimelineItem>
                  <div class="icon collect">
                    <span>收</span>
                  </div>
                  <div class="content-date">
                    <p class="time">{{!item.SHSJ ? '' : item.SHSJ.substring(0, 10)}}</p>
                  </div>
                  <div class="content-infor">
                    <ul>
                      <li>
                        <span class="xm">{{item.SJR_XM}}</span>
                        <span>{{item.SJR_LXDH}}</span>
                      </li>
                      <li>{{item.SJD+(!item.SJR_XZZ_DZMC ? '' : item.SJR_XZZ_DZMC)}}</li>
                    </ul>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </div>

          <!-- 话单信息 -->
          <div
            class="node-cont-list bar"
            v-if="this.modal && this.modal.allData[0].nodeType == 'YS_SJJZXX' ? true : false "
          >
            <div class="list list-hd">
              <Timeline>
                <TimelineItem
                  v-for="(item,index) in (this.modal && this.modal.allData[0].LSXX.data)"
                  :key="index"
                >
                  <div :class="item.TH_LX == '呼入' ? 'icon collect': 'icon send'">
                    <span>{{item.TH_LX}}</span>
                  </div>
                  <div class="content-date content-date-hd">
                    <p class="time">{{item.TH_KSSJ.substring(0, 10)}}</p>
                    <p class="content">{{ item.TH_KSSJ.substring(11,19) }}</p>
                  </div>
                  <div class="content-infor">
                    <ul @click="toDetailsPage">
                      <li>
                        <span class="phone">{{item.DF_YDDH}}</span>
                        <span>{{item.DF_XM}}</span>
                        <span>
                          <i class="iconfont icon-chakan"></i>
                        </span>
                      </li>
                      <li>
                        <span>通话时长：</span>
                        <span>{{item.TH_THSC+'分钟'}}</span>
                      </li>
                    </ul>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </div>

          <!-- 资金交易信息 -->
          <div
            class="node-cont-list node-cont-list-zj bar"
            v-if="this.modal && this.modal.allData[0].nodeType == 'YS_YHKXX' ? true : false "
          >
            <div class="list list-zj">
              <Timeline>
                <TimelineItem
                  v-for="(item,index) in (this.modal && this.modal.allData[0].LSXX.data)"
                  :key="index"
                >
                  <div :class="item.JYFX == '转入' ? 'icon collect': 'icon send'">
                    <span>{{item.JYFX}}</span>
                  </div>
                  <div class="content-date content-date-zj">
                    <p class="time">{{item.JYSJ.substring(0, 10)}}</p>
                    <p class="content">{{ item.JYSJ.substring(11,19) }}</p>
                  </div>
                  <div class="content-infor">
                    <ul @click="toDetailsPage">
                      <li>
                        <span class="zh-id">{{item.JYYH_ZH}}</span>
                        <span>{{item.JYR_XM}}</span>
                        <span>
                          <i class="iconfont icon-chakan"></i>
                        </span>
                      </li>
                      <li>
                        <span>交易金额：</span>
                        <span>{{item.JYJE_JE}}</span>
                      </li>
                    </ul>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "NodesDetailed",
  props: ["modal"],
  data() {
    return {
      //nodeDetailsAllData: this.modal,
      //nodeTitle: '物流信息',
      startTimeOptions: {}, //开始日期设置
      endTimeOptions: {}, //结束日期设置\
      startDate: this.modal && this.modal.beginDate,
      endDate: this.modal && this.modal.endDate
    };
  },
  methods: {
    closeNodesDetailed() {
      this.$emit("closeNodesDetailed", false);
    },
    toDetailsPage(e) {
      //modal.allData[0].nodeType,modal.allData[0].id
      //console.log(e.target.tagName.toLowerCase())
      e.stopPropagation();
      let target = e.target;
      let tagName = target.tagName.toLowerCase();
      if (["i"].indexOf(tagName) != -1) {
        var route = this.$router.resolve({
          path: "/detailsPage",
          query: {
            type: this.modal && this.modal.allData[0].nodeType,
            id: this.modal && this.modal.allData[0].id,
            startDate: moment(this.startDate).format("YYYY-MM-DD"),
            endDate: moment(this.endDate).format("YYYY-MM-DD")
          },
          target: "_blank"
        });
        window.open(route.href, "_blank");
      }

      // var route = this.$router.resolve({
      //   path: '/detailsPage',
      //   query: {
      //     type : nodeType,
      //     id : id,
      //     startDate : moment(this.startDate).format('YYYY-MM-DD'),
      //     endDate : moment(this.endDate).format('YYYY-MM-DD')
      //   },
      //   target: '_blank'
      // })
      // window.open(route.href,'_blank')
    },
    selectStartDate(e) {
      //console.log(date);
      this.startDate = e;
      this.endTimeOptions = {
        disabledDate: date => {
          let startTime = this.startDate
            ? new Date(this.startDate).valueOf()
            : "";
          return date && date.valueOf() < startTime;
        }
      };
      this.$emit("changePage", e, "start");
    },
    selectEndDate(e) {
      //console.log(date);
      this.endDate = e;
      let endTime = this.endDate
        ? new Date(this.endDate).valueOf() - 1 * 24 * 60 * 60 * 1000
        : "";
      this.startTimeOptions = {
        disabledDate(date) {
          return date && date.valueOf() > endTime;
        }
      };
      this.$emit("changePage", e, "end");
    }
  },
  created() {},
  mounted() {
    //this.nodeDetailsAllData = this.modal;
  }
};
</script>

<style lang="less" scoped>
.nodesDetailed {
  width: 535px;
  padding-left: 8px;
  position: absolute;
  right: 0;
  top: 68px;
  bottom: 6px;
  z-index: 999;
  .nodesDetailed-sidebar {
    width: 17px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -9px;
    .sidebar-top {
      position: absolute;
      width: 9px;
      height: 20.8%;
      //height: 246px;
      top: 44px;
      right: 0;
      background: url("../../../static/images/sidebar-top.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .sidebar-bottom {
      position: absolute;
      width: 9px;
      height: 24.5%;
      // height: 246px;
      bottom: 0;
      right: 0;
      background: url("../../../static/images/sidebar-bottom.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .close-btn {
      position: absolute;
      top: 28%;
      width: 17px;
      height: 43.7%;
      z-index: 99;
      cursor: pointer;
      background: url("../../../static/images/close-btn.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
  }
  .cont-box {
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(left top, #11296d, #0c1837);
    .grid-box {
      width: 100%;
      height: 100%;
      position: absolute;
      background: url("../../../static/images/grid.png") repeat repeat;
      .head-left {
        width: 9px;
        height: 44px;
        position: absolute;
        left: -9px;
        top: 0;
        background: url("../../../static/images/vertical-line.jpg") repeat-x;
        background-size: 100% 100%;
      }
      .title {
        width: 100%;
        /* height: 47px;
          line-height: 47px; */
        height: 44px;
        line-height: 44px;
        position: relative;
        background: url("../../../static/images/vertical-line.jpg") repeat-x;
        background-size: 100% 100%;
        span:nth-child(1) {
          font-size: 16px;
          color: #fff;
          margin-left: 6px;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #fff;
        }
        span:nth-child(3) {
          font-size: 14px;
          margin: 0 10px 0 16px;
          color: #5cb9ff;
        }
        span:nth-child(4) {
          font-size: 14px;
          color: #5cb9ff;
        }
        .iconfont {
          font-size: 20px;
          position: absolute;
          top: 1px;
          right: 12px;
          color: #fff;
          cursor: pointer;
        }
      }
      .infor-details {
        position: absolute;
        right: 8px;
        top: 45px;
        bottom: 0;
        /* left: 8px; */
        left: 0;
        .person-label {
          position: relative;
          padding: 22px 14px 27px 23px;
          margin-bottom: 18px;
          .label-infor {
            width: 100%;
            .activity-inofr {
              overflow: hidden;
              .header {
                float: left;
                width: 72px;
                height: 89px;
                line-height: 89px;
                text-align: center;
                border-radius: 4px;
                background: #fff;
                .iconfont {
                  font-size: 50px;
                  color: #009aed;
                }
              }
              .label {
                margin: 7px 0 0 83px;
                overflow: hidden;
                ul {
                  li {
                    span {
                      display: inline-block;
                      font-size: 14px;
                    }
                    span:nth-child(1) {
                      width: 65px;
                      text-align: right;
                      color: #3a8bbf;
                    }
                    span:nth-child(2) {
                      text-align: left;
                      margin-left: 22px;
                      color: #e5edf3;
                    }
                  }
                }
              }
              .label-hd {
                margin-top: 0 !important;
              }
              .label-zj {
                margin-top: 0 !important;
              }
            }
          }
          .border-bottom {
            height: 1px;
            background: #254b81;
            position: absolute;
            bottom: 0;
            left: 10px;
            right: 10px;
          }
        }
        .node-info {
          height: 23px;
          padding: 0 19px 0 22px;
          margin-bottom: 25px;
          overflow: hidden;
          .node-title {
            float: left;
            font-size: 16px;
            color: #fff;
          }
          .node-date {
            float: right;
            height: 23px;
          }
        }
        .node-cont-list {
          position: absolute;
          right: 8px;
          top: 204px;
          bottom: 0;
          left: 23px;
          overflow-y: auto;
          .list {
            border-bottom: 1px dashed #3e4b6d;
            margin-bottom: 17px;
            .timeline-head {
              margin-bottom: 23px;
              ul {
                overflow: hidden;
                li {
                  float: left;
                  font-size: 14px;
                  span:nth-child(1) {
                    color: #3a8bbf;
                  }
                  span:nth-child(2) {
                    color: #e5edf3;
                  }
                }
                li:nth-child(1) {
                  width: 118px;
                  margin-right: 62px;
                }
                li:nth-child(3) {
                  float: right;
                  margin-right: 20px;
                  .icon-chakan {
                    color: #5cb9ff;
                    font-size: 20px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .list-hd {
            border: none;
          }
          .list-zj {
            border: none;
          }
        }
        .node-cont-list-zj {
          top: 220px;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.node-date {
  .ivu-date-picker {
    .ivu-date-picker-rel {
      .ivu-input-wrapper {
        .ivu-input-icon {
          height: 23px;
          line-height: 23px;
          color: #5cb9ff;
        }
        .ivu-input {
          border-radius: 2px;
          background: none;
          height: 23px;
          color: #5cb9ff;
          background-color: #1c326e;
          border: solid 1px #375f91;
        }
      }
    }
    .ivu-select-dropdown {
      .ivu-picker-panel-body-wrapper {
        .ivu-picker-panel-body {
          .ivu-date-picker-header {
            .ivu-date-picker-header-label {
              color: #495060;
            }
          }
        }
      }
    }
  }
}
span.ivu-date-picker-cells-cell {
  color: #495060;
}
.ivu-date-picker-cells-focused {
  em {
    background: #2d8cf0;
    color: #fff;
  }
}

.node-cont-list {
  .ivu-timeline {
    //时间轴
    .ivu-timeline-item {
      padding: 0 0 11px 0;
      .ivu-timeline-item-tail {
        left: 135px;
        border-left: 1px dashed #e7e7e7;
      }
      .ivu-timeline-item-head {
        width: 36px;
        height: 36px;
        background: #a9c500;
        border-radius: 36px;
        left: 117px;
        border: none;
      }
      .ivu-timeline-item-content {
        font-size: 14px;
        color: #3a8bbf;
        padding: 0 0 10px 0;
        margin-right: 27px;
        position: relative;
        top: 0;
        .content-date {
          // width:20%;
          width: 80px;
          float: left;
          margin-top: 8px;
          .time {
            color: #5cb9ff;
            text-align: right;
          }
          .content {
            font-size: 12px;
            text-align: right;
          }
        }
        .content-date-hd {
          margin-top: 0;
        }
        .content-date-zj {
          margin-top: 0;
        }
        .content-infor {
          margin-left: 179px;
          li:first-child {
            overflow: hidden;
            span {
              color: #e5edf3;
              float: left;
            }
            span.xm {
              width: 50px;
              margin-right: 10px;
            }
            span.zh-id {
              width: 158px;
              display: inline-block;
              margin-right: 28px;
            }
            span.phone {
              margin-right: 28px;
            }
            span:nth-child(3) {
              float: right;
              margin-right: 20px;
              position: relative;
              top: 5px;
              cursor: pointer;
              .icon-chakan {
                font-size: 20px;
                color: #5cb9ff;
              }
            }
          }
          li:nth-child(2) {
            color: #7e8e9a;
          }
        }
        .icon {
          width: 36px;
          height: 36px;
          color: #fff;
          border-radius: 36px;
          font-size: 12px;
          line-height: 36px;
          text-align: center;
          position: absolute;
          left: 117px;
        }
        .send {
          background: #009aed;
        }
        .collect {
          background: #1ac1a3;
        }
      }
    }
  }
}
</style>
