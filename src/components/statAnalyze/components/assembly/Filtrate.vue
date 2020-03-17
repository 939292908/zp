<template>
  <i-form :model="formData" :label-width="80" class="condition-box">
    <Row class="search-row">
      <FormItem style="width:300px;float:left;" label="单位选择：">
        <!-- <Select v-model="formData.code">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>-->
        <!-- :apiParams="cityParams" -->
        <tree-filter
          :apiKey="optionConfig.CITY_AREA_TREE"
          ref="cityTree"
          select-type="all"
          :tree-props="cityTreeProps"
          v-model="strPath"
          placeholder="请选择单位"
          :apiFun="cityApis"
          @on-select-change="handleCitySelectChange"
          @on-clear="handleDeptPath"
        ></tree-filter>
      </FormItem>

      <FormItem style="width:300px;float:left;" label="采集人员：">
        <Input v-model="formData.userNameOrAccount" placeholder="请输入民警姓名或警号"></Input>
      </FormItem>
    </Row>
    <Row class="search-row time">
      <FormItem style="width:276px;float:left;" label="采集时间：">
        <RadioGroup v-model="formData.monthType" type="button" @on-change="handleCheckTime">
          <Radio :key="index" v-for="(item,index) in timeList" :label="item.value">{{item.name}}</Radio>
        </RadioGroup>
        <span class="line">|</span>
      </FormItem>
      <div style="float:left;">
        <DatePicker
          style="width:180px"
          type="datetime"
          placeholder="开始时间"
          v-model="formData.timeFrom"
          @on-change="onStartTimeChange"
          :options="startTimeOption"
          format="yyyy-MM-dd hh:mm:ss"
        ></DatePicker>
        <span span="1">至</span>
        <DatePicker
          style="width:180px"
          type="datetime"
          placeholder="结束时间"
          v-model="formData.timeTo"
          @on-change="onEndTimeChange"
          :options="endTimeOption"
          format="yyyy-MM-dd hh:mm:ss"
        ></DatePicker>
      </div>

      <FormItem style="margin-left: -80px;">
        <Button type="primary" style="float:left;" @click="searchClick(formData)">查看</Button>
        <Button style="float:left;" @click="resetData()">刷新</Button>
      </FormItem>
    </Row>
  </i-form>
</template>

<script>
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";
import TreeFilter from "@/components/assembly/TreeFilter";
import * as apis from "@/api/mapJoin/index.js";

export default {
  name: "Filtrate",
  components: { TreeFilter },
  props: {
    // 搜索click事件
    searchClick: {
      type: Function,
      default: () => {}
    },
    // 重置分页
    resetPage: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      dataForward: 0,
      strPath: "", // 单位选择
      formData: {
        code: null,
        tierPath: null,
        monthType: "2", // 天/周/月
        userNameOrAccount: null, //采集人员
        timeFrom: null,
        timeTo: null,
        pageIndex: "1",
        pageSize: "10"
      },
      concreteTime: "00:00:00",
      startTimeOption: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      endTimeOption: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      timeList: [
        {
          value: "1",
          name: "当天"
        },
        {
          value: "2",
          name: "本周"
        },
        {
          value: "3",
          name: "本月"
        }
      ],
      optionConfig: OPTIONS_LIST,
      cityApis: comApis.GET_DEPT_TREE_INFO,
      cityTreeProps: {
        children: "children",
        title: "displayName",
        id: "id"
      },
      nowDate: new Date()
    };
  },
  mounted() {
    this.getConcreteTime();
  },
  methods: {
    // 起始时间变化
    onStartTimeChange(timeFrom, type) {
      this.endTimeOption = {
        disabledDate(timeTo) {
          return timeTo < new Date(timeFrom) - 8.64e7 || timeTo > Date.now();
        }
      };
    },
    // 结束时间变化
    onEndTimeChange(timeTo, type) {
      this.startTimeOption = {
        disabledDate(timeFrom) {
          return timeFrom > new Date(timeTo) || timeFrom > Date.now();
        }
      };
    },
    // 获取具体的时间段
    getConcreteTime() {
      apis.GET_RELEVANCE_TP_INFO().then(res => {
        if (res.code === 200) {
          this.dataForward = res.data.dataForward;
          this.concreteTime =
            res.data.dataForward == -1
              ? " " + res.data.dataValue + ":00"
              : " 00:00:00";
        }
        this.getWeek();
        let data =
          this.dataForward == -1
            ? this.nowDate
            : new Date(this.nowDate.getTime() + 86400000);
        this.formData.timeTo =
          this.$moment(data).format("YYYY-MM-DD") + this.concreteTime;
        this.onStartTimeChange(this.formData.timeFrom);
        this.onEndTimeChange(this.formData.timeTo);
        this.searchClick(this.formData);
      });
    },
    // 选择归属区划信息
    handleCitySelectChange(cur) {
      this.formData.code = cur.code;
      this.formData.tierPath = cur.path.id;
    },
    // 重置
    resetData() {
      this.strPath = "";
      this.formData = {
        code: null,
        tierPath: null,
        monthType: null, // 天/周/月
        userNameOrAccount: null, //采集人员
        timeFrom: null,
        timeTo: null,
        pageIndex: "1",
        pageSize: "10"
      };
      this.resetPage();
      this.searchClick(this.formData);
    },

    // 清空单位选择
    handleDeptPath(val) {},
    // 获取当天时间
    getToday() {
      let data =
        this.dataForward == -1
          ? new Date(this.nowDate.getTime() - 86400000)
          : this.nowDate;
      this.formData.timeFrom =
        this.$moment(data).format("YYYY-MM-DD") + this.concreteTime;
    },
    // 获取本周的时间
    getWeek() {
      var weekFirstDay =
        this.dataForward == -1
          ? new Date(this.nowDate - this.nowDate.getDay() * 86400000)
          : new Date(this.nowDate - (this.nowDate.getDay() - 1) * 86400000);
      this.formData.timeFrom =
        this.$moment(weekFirstDay).format("YYYY-MM-DD") + this.concreteTime;
    },
    // 获取本月时间
    getMouth() {
      // var monthFirstDay = new Date(
      //   this.nowDate.getFullYear(),
      //   this.nowDate.getMonth(),
      //   1
      // );
      var monthFirstDay =
        this.dataForward == -1
          ? new Date(this.nowDate - this.nowDate.getDate() * 86400000)
          : new Date(this.nowDate - (this.nowDate.getDate() - 1) * 86400000);
      this.formData.timeFrom =
        this.$moment(monthFirstDay).format("YYYY-MM-DD") + this.concreteTime;
    },
    handleCheckTime(val) {
      switch (val) {
        case "1":
          this.getToday();
          break;
        case "2":
          this.getWeek();
          break;
        case "3":
          this.getMouth();
          break;
        default:
          break;
      }
      let data =
        this.dataForward == -1
          ? this.nowDate
          : new Date(this.nowDate.getTime() + 86400000);
      this.formData.timeTo =
        this.$moment(data).format("YYYY-MM-DD") + this.concreteTime;
      this.onStartTimeChange(this.formData.timeFrom);
      this.onEndTimeChange(this.formData.timeTo);
    }
  }
};
</script>
<style lang='less' scoped>
.city {
  width: 300px;
}
.line {
  color: #bbb;
  padding-left: 9px;
  font-size: 14px;
  vertical-align: middle;
}
.ivu-radio-group-button .ivu-radio-wrapper {
  height: 27px;
  line-height: 1.5;
  box-shadow: none;
}
/deep/ .condition-box.ivu-form .ivu-form-item-label {
  font-size: 14px;
}
.ivu-form-item {
  margin-bottom: 0;
}
/deep/ .ivu-form-item-content {
  line-height: 30px;
}
</style>
