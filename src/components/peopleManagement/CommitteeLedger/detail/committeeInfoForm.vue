<!--
 * @Author: your name
 * @Date: 2019-12-16 16:19:08
 * @LastEditTime : 2019-12-19 11:07:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\CommitteeLedger\detail\committeeInfoForm.vue
 -->
<template>
  <Form class="form-panel" ref="personInfoForm" :model="form" :rules="rule" :label-width="100">
    <div class="panel-form">
      <FormItem label="职位" prop="positionValue">
        <Select filterable v-model="form.positionValue" disabled>
          <Option
            v-for="item in optionList.positionList"
            :value="item.value"
            :key="item.value"
          >{{ item.displayName }}</Option>
        </Select>
      </FormItem>
      <Row>
        <Col span="13">
          <FormItem label="任职时间" prop="workYear">
            <Select
              v-model="form.workYear"
              style="width:90%"
              placeholder="年份"
              @on-change="handleStartYear"
              disabled
            >
              <Option
                v-for="item in startYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}年</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <Select
            v-model="form.workMouth"
            style="width:90%"
            placeholder="月份(选填)"
            clearable
            disabled
          >
            <Option v-for="item in 12" :value="item" :key="item">{{ item }}月</Option>
          </Select>
        </Col>
        <Col span="4"></Col>
      </Row>
    </div>
    <div class="panel-form">
      <FormItem label="分管工作" prop="work">
        <i-input v-model.trim="form.work" placeholder="请输入分管工作" disabled></i-input>
      </FormItem>

      <Row>
        <Col span="13">
          <FormItem label="离任时间" prop="departureYear">
            <Select
              v-model="form.departureYear"
              style="width:90%"
              placeholder="年份"
              @on-change="handleEndYear"
              disabled
            >
              <Option
                v-for="item in endYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}年</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <Select
            v-model="form.departureMouth"
            style="width:90%"
            placeholder="月份(选填)"
            clearable
            disabled
          >
            <Option v-for="item in 12" :value="item" :key="item">{{ item }}月</Option>
          </Select>
        </Col>
        <Col span="4">
          <Checkbox v-model="form.working" style="line-height:32px" disabled>在任</Checkbox>
        </Col>
      </Row>
    </div>
  </Form>
</template>

<script>
import * as tool from "@/tools/units";
export default {
  name: "committeeInfoForm",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      form: {
        positionValue: "", //职位
        workYear: null, //任职年份
        workMouth: null, //任职月份
        departureYear: null, //离任年份
        departureMouth: null, //离任月份
        work: "", //分管工作
        working: false //是否在任
      },
      rule: {
        positionValue: {
          required: true,
          message: "职位不能为空！",
          trigger: "change"
        },
        work: {
          required: true,
          message: "分管工作不能为空！",
          trigger: "blur"
        },
        workYear: {
          required: true,
          message: "任职年份不能为空！",
          trigger: "blur",
          type: "number"
        },
        departureYear: {
          required: true,
          message: "离职年份不能为空！",
          trigger: "blur",
          type: "number"
        }
      },
      optionList: {
        positionList: []
      },
      maxYear: new Date().getFullYear(),
      minYear: 1899
    };
  },
  mounted() {
    this.getOptionList();
  },
  computed: {
    startYearList() {
      let arr = [];
      for (let i = this.maxYear; i > 1899; i--) {
        arr.push({
          value: i,
          label: i
        });
      }
      return arr;
    },
    endYearList() {
      let arr = [];
      let year = new Date().getFullYear();
      for (let i = new Date().getFullYear(); i > this.minYear; i--) {
        arr.push({
          value: i,
          label: i
        });
      }
      return arr;
    }
  },
  methods: {
    handleStartYear() {
      this.minYear = this.form.workYear - 1;
    },
    handleEndYear() {
      this.maxYear = this.form.departureYear;
    },
    getOptionList() {
      //职位
      tool.getPartyPositionList(this).then(res => {
        this.optionList.positionList = res;
      });
    },
    bindFormValue(form) {
      let data = this.form;
      data.workYear = +form.workStartTime.substring(0, 4);
      data.workMouth = +form.workStartTime.substring(4, 6);
      data.positionValue = form.positionValue;
      data.work = form.work;
      if (form.workEndTime) {
        data.departureYear = +form.workEndTime.substring(0, 4);
        data.departureMouth = +form.workEndTime.substring(4, 6);
      } else {
        data.working = true;
      }
      this.form = data;
      this.$nextTick(() => {
        this.handleStartYear();
        this.handleEndYear();
      });
    }
  },
  watch: {
    data: {
      handler(val) {
        this.bindFormValue(val);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/form.less";
/deep/.ivu-input[disabled],
fieldset[disabled] .ivu-input,
/deep/.ivu-select-disabled .ivu-select-selection,
/deep/.ivu-select-input[disabled] {
  color: #666;
}
/deep/.ivu-select-input[disabled][placeholder^="请选择"] {
  -webkit-text-fill-color: #ccc;
}
/deep/.ivu-select-input[disabled] {
  -webkit-text-fill-color: #666;
}
/deep/.ivu-input-number-input[disabled] {
  color: #666;
}
/deep/.ivu-input-number-disabled .ivu-input-number-input {
  opacity: 1;
}
/deep/.ivu-checkbox-disabled.ivu-checkbox-checked .ivu-checkbox-inner:after {
  border-color: #666;
}
</style>
