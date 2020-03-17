<template>
  <div>
    <Table stripe max-height="400" :columns="columns1" :data="recordLists"></Table>
    <!-- 添加出入境记录@on-ok="savaPersonnelInfo()"
    @on-cancel="cancel()"-->
    <Modal v-model="editAddRecordShow" :title="editAddTitle" :mask-closable="false">
      <Form
        :model="editAddRecordList"
        ref="enterRecord"
        label-position="right"
        :label-width="130"
        :rules="ruleValidate"
      >
        <FormItem label="出境时间" prop="outBoundTime">
          <DatePicker
            type="date"
            placeholder="请选择出境时间"
            format="yyyy-MM-dd"
            v-model="editAddRecordList.outBoundTime"
            @on-change="outBoundTimeChange"
            ref="outBoundTime"
            :options="startTimeOption"
            style="width: 100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="出境方式" prop="outBoundWayValue">
          <Select v-model="editAddRecordList.outBoundWayValue">
            <Option
              :key="index"
              v-for="(item,index) in optionList.outBoundWay"
              :value="item.value"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="出境理由" prop="outBoundReasonValue">
          <Select v-model="editAddRecordList.outBoundReasonValue">
            <Option
              :key="index"
              v-for="(item,index) in optionList.outBoundReason"
              :value="item.value"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="出境前往国家" prop="outBoundToCountry">
          <i-input v-model="editAddRecordList.outBoundToCountry" placeholder="出境前往国家"></i-input>
        </FormItem>
        <FormItem label="出境口岸（通道）" prop="outBoundChannel">
          <i-input v-model="editAddRecordList.outBoundChannel" placeholder="请选择出境口岸（通道）"></i-input>
        </FormItem>
        <FormItem label="入境时间">
          <DatePicker
            type="date"
            placeholder="请选择入境时间"
            v-model="editAddRecordList.entryTime"
            @on-change="entryTimeChange"
            :options="endTimeOption"
            style="width: 100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="入境口岸（通道）">
          <i-input v-model="editAddRecordList.entryChannel" placeholder="请选择入境口岸（通道）"></i-input>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="危害等级" prop="harmLevelValue">
              <Select v-model="editAddRecordList.harmLevelValue">
                <Option
                  :key="index"
                  v-for="(item,index) in optionList.harmLevel"
                  :value="item.value"
                >{{ item.displayName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="风险等级" prop="riskLevelValue">
              <Select v-model="editAddRecordList.riskLevelValue">
                <Option
                  :key="index"
                  v-for="(item,index) in optionList.riskLevel"
                  :value="item.value"
                >{{ item.displayName }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="savaPersonnelInfo">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="modelDelete"
      title="确认删除"
      width="320"
      @on-ok="deleteListYea()"
      @on-cancel="cancel"
    >
      <p>确认删除该条出入境记录？</p>
    </Modal>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import * as apis from "@/api/collection/index.js";
import moment from "moment";
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    idNumber: {
      type: String,
      default: ""
    },
    /* villageMapID:{
      type: String,
      default:''
    }, */
    recordLists: {
      type: Array,
      default: () => {
        return null;
      }
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      newIdNumber: "",
      index: 0,
      modelDelete: false,
      latitude: "0", //lat
      longitude: "0", //lng
      editAddTitle: "添加出入境记录",
      editAddRecordList: {
        entryChannel: "",
        entryTime: "",
        id: "",
        outBoundChannel: "",
        outBoundReason: "",
        outBoundReasonValue: "",
        outBoundTime: "",
        outBoundToCountry: "",
        outBoundWay: "",
        outBoundWayValue: "",
        riskLevel: "", //风险
        riskLevelValue: "", //风险
        harmLevel: "", //危害
        harmLevelValue: "" //危害
      },
      optionList: {
        outBoundReason: [], //出境理由
        outBoundToCountry: [], //出境前往国家
        outBoundWay: [], //出境方式
        riskLevel: [], //风险
        harmLevel: [] //危害
      },
      editAddRecordShow: false, //编辑出入境记录
      columns1: [
        { type: "index", width: 60, align: "center" },
        {
          title: "出境时间",
          key: "outBoundTime",
          render: (h, params) => {
            return h(
              "div",
              params.row.outBoundTime
                ? this.$moment(params.row.outBoundTime).format("YYYY-MM-DD")
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
                ? this.$moment(params.row.entryTime).format("YYYY-MM-DD")
                : ""
            );
          },
          align: "center"
        },
        { title: "入境口岸（通道）", key: "entryChannel", align: "center" },
        { title: "危害等级", key: "harmLevel", width: 90, align: "center" },
        { title: "风险等级", key: "riskLevel", width: 90, align: "center" },
        {
          title: "操作",
          key: "address",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    backgroundColor: "#2eb7f5"
                  },
                  on: {
                    click: () => {
                      this.editList(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteList(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      ruleValidate: {
        outBoundTime: [
          {
            // type: "string",
            required: true,
            message: "请选择出境时间",
            trigger: "change",
            pattern: /.+/
          }
        ],
        outBoundWayValue: [
          { required: true, message: "请选择出境方式", trigger: "change" }
        ],
        outBoundReasonValue: [
          { required: true, message: "请选择出境理由", trigger: "change" }
        ],
        outBoundToCountry: [
          { required: true, message: "请选择出境前往国家", trigger: "blur" }
        ],
        outBoundChannel: [
          { required: true, message: "请选择出境口岸（通道）", trigger: "blur" }
        ],
        riskLevelValue: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        harmLevelValue: [
          { required: true, message: "请选择危害等级", trigger: "change" }
        ]
      },
      startTimeOption: {},
      endTimeOption: {}
    };
  },
  mounted() {
    this.getExitEnterInfo();
    this.outBoundTimeChange(this.editAddRecordList.outBoundTime);
    this.entryTimeChange(this.editAddRecordList.entryTime);
  },
  watch: {
    name: {
      handler(val) {
        this.newName = val;
      },
      immediate: true
    },
    idNumber: {
      handler(val) {
        apis
          .GET_NEW_PERSON_INFO_BY_ID(val, this.$route.query.collectId)
          .then(res => {
            if (res.code == 200) {
              console.log(res);
              this.newName = res.data.personInfo.name;
              this.newIdNumber = res.data.personInfo.idNumber;
            }
          });
      },
      immediate: true
    },
    recordLists: {
      handler(val) {},
      immediate: true,
      deep: true
    }
  },
  //方法集合
  methods: {
    // 获取出入境信息
    getExitEnterInfo() {
      // OUTBOUND_REASON  出境理由
      apis.GET_REASON_LIST("OUTBOUND_REASON").then(res => {
        if (res.code == 200) {
          this.optionList.outBoundReason = res.data;
        }
      });
      // OUTBOUND_WAY  出境方式
      apis.GET_REASON_LIST("OUTBOUND_WAY").then(res => {
        if (res.code == 200) {
          this.optionList.outBoundWay = res.data;
        }
      });
      // HARM_LEVEL 危害等级
      apis.GET_REASON_LIST("HARM_LEVEL").then(res => {
        if (res.code == 200) {
          this.optionList.harmLevel = res.data;
        }
      });
      // RISK_LEVEL 风险等级
      apis.GET_REASON_LIST("RISK_LEVEL").then(res => {
        if (res.code == 200) {
          this.optionList.riskLevel = res.data;
        }
      });
    },
    editList(data) {
      // console.log(data.row);
      if (!data) {
        // 添加
        this.editAddRecordList = {};
      } else {
        // 编辑
        this.editAddTitle = "编辑出入境记录";
        this.index = data.index;
        this.editAddRecordList = JSON.parse(
          JSON.stringify(this.recordLists[data.index])
        );
        this.editAddRecordList.entryTime = this.editAddRecordList.entryTime
          ? this.$moment(this.editAddRecordList.entryTime).format("YYYY-MM-DD")
          : "";
        this.editAddRecordList.outBoundTime = this.editAddRecordList
          .outBoundTime
          ? this.$moment(this.editAddRecordList.outBoundTime).format(
              "YYYY-MM-DD"
            )
          : "";
        console.log(this.editAddRecordList);
      }
      this.editAddRecordShow = true;
    },
    deleteList(data) {
      this.index = data.index;
      this.modelDelete = true;
    },
    deleteListYea() {
      const that = this;
      var params = JSON.parse(JSON.stringify(that.recordLists[that.index]));
      apis.deleteEenterPersonnelInfo(params.id).then(res => {
        if (res.code == 200) {
          that.$parent.$parent.getOutboundinfoList(that.newIdNumber);
          that.modelDelete = false;
        } else {
          console.log(res);
        }
      });
    },
    // 起始时间变化
    outBoundTimeChange(religionStartTime, type) {
      const that = this;
      this.endTimeOption = {
        disabledDate(religionEndTime) {
          return (
            religionEndTime < new Date(religionStartTime) - 8.64e7 ||
            religionEndTime > Date.now()
          );
        }
      };
    },
    // 结束时间变化
    entryTimeChange(religionEndTime, type) {
      this.startTimeOption = {
        disabledDate(religionStartTime) {
          return (
            religionStartTime > new Date(religionEndTime) ||
            religionStartTime > Date.now()
          );
        }
      };
    },

    savaPersonnelInfo() {
      const that = this;

      that.$refs["enterRecord"].validate(valid => {
        let form = that.fillFormValue();
        if (that.editAddTitle == "编辑出入境记录") {
          var params = JSON.parse(JSON.stringify(that.recordLists[that.index]));
          form.id = params.id;
        }
        if (valid) {
          apis.savaEditPersonnelInfo(form).then(res => {
            if (res.code == 200) {
              that.$parent.$parent.getOutboundinfoList(that.newIdNumber);
              that.outBoundTimeChange("");
              that.entryTimeChange("");
            } else {
              console.log(res);
              that.$Message.error(res.msg);
            }
            that.editAddRecordShow = false;
          });
        } else {
          that.$Message.error("缺少必填项！");
        }
      });
    },
    //
    fillFormValue() {
      let form = this.editAddRecordList;
      // 危害
      let harmLevelObj = this.optionList.harmLevel.find(
        x => x.value == form.harmLevelValue
      );
      form.harmLevel = harmLevelObj ? harmLevelObj.displayName : "";
      // 风险riskLevel
      let riskLevelObj = this.optionList.riskLevel.find(
        x => x.value == form.riskLevelValue
      );
      form.riskLevel = riskLevelObj ? riskLevelObj.displayName : "";
      //出境理由 outBoundReason
      let outBoundReasonObj = this.optionList.outBoundReason.find(
        x => x.value == form.outBoundReasonValue
      );
      form.outBoundReason = outBoundReasonObj
        ? outBoundReasonObj.displayName
        : "";
      //出境方式 outBoundWay
      let outBoundWayObj = this.optionList.outBoundWay.find(
        x => x.value == form.outBoundWayValue
      );
      form.outBoundWay = outBoundWayObj ? outBoundWayObj.displayName : "";
      // 采集Id
      form.collectId = this.$route.query.collectId;
      // form.belongArea = this.$route.query.areaCode;
      // form.mapId = this.villageMapID;
      form.outBoundTime = form.outBoundTime
        ? moment(form.outBoundTime).format("YYYY-MM-DD")
        : "";
      /* if (form.outBoundTime == undefined) {
        form.outBoundTime = "";
      }
      form.outBoundTime = moment(form.outBoundTime).format("YYYY-MM-DD");
      if (form.outBoundTime == "Invalid date") {
        form.outBoundTime = "";
      } */
      if (form.entryTime == undefined) {
        form.entryTime = "";
      }
      form.entryTime = moment(form.entryTime).format("YYYY-MM-DD");
      if (form.entryTime == "Invalid date") {
        form.entryTime = "";
      }
      form.name = this.newName;
      form.idNumber = this.newIdNumber;
      if (this.$parent.$parent.coordinate.lng == undefined) {
        form.latitude = "0";
        form.longitude = "0";
      } else {
        form.latitude = this.$parent.$parent.coordinate.lat;
        form.longitude = this.$parent.$parent.coordinate.lng;
      }
      form.id = "";
      let {
        createId,
        createTime,
        creater,
        updateId,
        updateTime,
        updater,
        ...data
      } = form;
      return data;
    },
    // 退出
    cancel() {
      this.$refs["enterRecord"].resetFields();
      this.editAddRecordShow = false;
      this.outBoundTimeChange("");
      this.entryTimeChange("");
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>