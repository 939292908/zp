<template>
  <div>
    <!-- 表格 -->
    <Table stripe border :columns="columns" :data="tableData">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="btns">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="editClick(row)"
          :disabled="canEdit"
        >编辑</Button>
        <Button type="error" size="small" @click="deleteClick(row)" :disabled="canEdit">删除</Button>
      </template>
    </Table>
    <!-- 弹框 -->
    <Modal
      :mask-closable="false"
      v-model="isShowModal"
      title="添加新涉案（线）人员"
      @on-ok="okModal"
      @on-cancel="cancelModal"
    >
      <!-- 内容 -->
      <Form class="form-panel" ref="form" :model="form" :rules="rule" :label-width="120">
        <FormItem label="身份证号码" prop="idNumber">
          <i-Input
            v-model="form.idNumber"
            placeholder="请输入身份证号码"
            @on-blur="handleIdNumber"
            @keyup.enter="handleIdNumber"
          ></i-Input>
        </FormItem>

        <FormItem label="人员姓名" prop="name">
          <i-Input v-model="form.name" placeholder="请输入人员姓名" :disabled="isPersonInfoLedger"></i-Input>
        </FormItem>
        <Row>
          <Col>
            <FormItem label="户籍地" prop="hukouAddressPath">
              <Cascader
                :disabled="isPersonInfoLedger"
                ref="hukouAdress"
                v-model="form.hukouAddressPath"
                :data="proviceAddressList"
                :load-data="loadHukouData"
                @on-change="handleHukouAdressSelectChange"
                @on-visible-change="getVisibleChange"
              ></Cascader>
            </FormItem>
          </Col>
          <Col span="24">
            <!-- class="detail-address"
            style="padding-left:10px;"-->
            <FormItem prop="householdAddress">
              <i-input
                v-model="form.householdAddress"
                placeholder="请输入详细地址"
                :disabled="isPersonInfoLedger"
              ></i-input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="通讯工具" prop="communicationTool">
          <i-Input v-model="form.communicationTool" placeholder="请输入通讯工具"></i-Input>
        </FormItem>

        <FormItem label="人员状态" prop="state">
          <Select v-model="form.state" placeholder="请选择人员状态" :disabled="isPersonInfoLedger">
            <Option
              :title="item.displayName"
              v-for="(item,index) in stateList"
              :value="item.value"
              :key="index"
            >{{ item.displayName }}</Option>
          </Select>
        </FormItem>
      </Form>
      <!-- 底部 -->
      <div slot="footer" class="noIdNumber-footer-box">
        <div class="noIdNumber-footer-btns">
          <div class="btn ok-btn" @click="okModal">保存</div>
          <div class="btn cancel-btn" @click="cancelModal">取消</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";
import * as tool from "../../../../tools/units.js";
import * as apis from "@/api/collection/index.js";
export default {
  name: "CasePersonInfo",
  mounted() {
    this.init();
  },
  data() {
    const hukouAddressValidator = (rule, value, callback) => {
      if (!this.hukouAddresssRule) {
        callback(new Error("户籍地不能为空！"));
      } else {
        callback();
      }
    };
    return {
      canEdit: false,
      isPersonInfoLedger: false,
      isShowModal: false, // 模态框
      stateList: [], // 人员状态字典项
      form: {
        caseId: this.$route.query.caseId,
        id: null,
        name: null,
        idNumber: null,
        householdAddress: null,
        communicationTool: null,
        state: null,
        stateName: null,
        hukouAddressPath: [],
        //户籍地址
        householdProvince: null,
        householdProvinceCode: null,
        householdCity: null,
        householdCityCode: null,
        householdCounty: null,
        householdCountyCode: null,
        householdTown: null,
        householdTownCode: null,
        householdDetailAddress: null,
        householdVillage: null,
        householdVillageCode: null,
        householdAddressCodeTierPath: null,
        householdAddressTierPath: null,
        householdVillageCodeDiaplayName: null,
        householdAddress: null
      },
      columns: [],
      columnsTemp: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "人员姓名",
          key: "name",
          width: 220
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 170
        },
        {
          title: "户籍地址",
          render: (h, params) => {
            let row = params.row;
            let address = "";
            if (!row.householdAddress) {
              address = row.householdProvince
                ? row.householdProvince +
                  "/" +
                  row.householdCity +
                  "/" +
                  row.householdCounty +
                  "/" +
                  row.householdTown +
                  "/" +
                  row.householdVillage
                : row.householdAddress;
            } else {
              address = row.householdProvince
                ? row.householdProvince +
                  "/" +
                  row.householdCity +
                  "/" +
                  row.householdCounty +
                  "/" +
                  row.householdTown +
                  "/" +
                  row.householdVillage +
                  "/" +
                  row.householdAddress
                : row.householdAddress;
            }

            return h("div", [h("span", {}, address)]);
          }
        },
        {
          title: "通讯工具",
          key: "communicationTool",
          width: 200
        },
        {
          title: "人员状态",
          key: "stateName",
          align: "center",
          width: 160
        },
        {
          title: "操作",
          slot: "btns",
          width: 150,
          align: "center"
        }
      ],
      tableData: [],
      rule: {
        name: [
          {
            required: true,
            message: "人员姓名不能为空",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[\u4E00-\u9FA5\·A-Za-z]+$/,
            message: "姓名中除了“·”、字母、汉字，不能出现其他特殊符号",
            trigger: "blur"
          },
          {
            max: 50,
            message: "最多不能超过50位",
            trigger: "change"
          }
        ],
        idNumber: [
          {
            required: true,
            message: "身份证号码不能为空",
            trigger: "blur"
          },
          {
            required: true,
            pattern: this.$config.idNumberVerify,
            message: "身份证号格式错误",
            trigger: "blur"
          }
        ],
        hukouAddressPath: [
          {
            required: true,
            type: "array",
            validator: hukouAddressValidator,
            trigger: "change"
          }
        ],
        householdAddress: [
          {
            required: true,
            message: "户籍地详细地址不能为空",
            trigger: "blur"
          }
        ],
        communicationTool: [
          {
            max: 50,
            message: "最多不能超过50位",
            trigger: "change"
          }
        ],
        state: [
          {
            required: true,
            message: "人员状态不能为空",
            trigger: "blur"
          }
        ]
      },
      proviceAddressList: [],
      optionConfig: OPTIONS_LIST,
      hukouAddresssRule: null
    };
  },
  methods: {
    init() {
      this.setColumns(); // 设置表头
      this.getStateList(); // 人员状态字典项
      this.getOptionList();
    },
    // 选择户籍地地址的事件
    handleHukouAdressSelectChange(value, selectedData) {
      this.hukouAddresssRule = value != 0;
      if (value.length == 0) {
        this.householdProvince = null;
        this.householdProvinceCode = null;
        this.householdCity = null;
        this.householdCityCode = null;
        this.householdCounty = null;
        this.householdCountyCode = null;
        this.householdTown = null;
        this.householdTownCode = null;
        this.householdDetailAddress = null;
        this.householdVillage = null;
        this.householdVillageCode = null;
        this.householdAddressCodeTierPath = null;
        this.householdAddressTierPath = null;
        this.householdVillageCodeDiaplayName = null;
        this.householdAddress = null;
      }
      if (value.length == 5 || value.length == 4) {
        // 省
        this.form.householdProvinceCode = selectedData[0].code;
        this.form.householdProvince = selectedData[0].label;
        // 市
        this.form.householdCityCode = selectedData[1].code;
        this.form.householdCity = selectedData[1].label;
        // 县
        this.form.householdCountyCode = selectedData[2].code;
        this.form.householdCounty = selectedData[2].label;
        // 镇
        this.form.householdTownCode = selectedData[3].code;
        this.form.householdTown = selectedData[3].label;
        // 村
        this.form.householdVillageCode =
          selectedData[selectedData.length - 1].code;
        this.form.householdVillage =
          selectedData[selectedData.length - 1].label;
      }
      this.form.householdAddressCodeTierPath = value.join("/");
      this.form.householdAddressTierPath = selectedData
        .map(x => x.label)
        .join("/");
      console.log(this.form, 22);
    },
    // 获取地址弹窗状态
    getVisibleChange(value) {
      this.addressVisibleChange = value;
    },
    getOptionList() {
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
            this.proviceAddressList = arr;
          }
        });
    },
    // 级联选择器 加载下一级'户籍地址'
    loadHukouData(item, callback) {
      if (!this.addressVisibleChange) return; //弹窗关闭状态' 跳过loadData方法 (否则影响显示结果)
      tool.loadAddressData(item, callback);
    },
    // 编辑
    editClick(row) {
      if (row.idNumber) {
        apis.GET_LEGER_INFOMATION(row.idNumber).then(res => {
          if (res.code == 200) {
            this.isPersonInfoLedger = res.data != null;
          }
        });
      }
      if (row.householdProvinceCode) {
        row.hukouAddressPath = [
          row.householdProvinceCode,
          row.householdCityCode,
          row.householdCountyCode,
          row.householdTownCode,
          row.householdVillageCode
        ];
        this.hukouAddresssRule = tool.setAddressByCodeArr(
          row.hukouAddressPath,
          this.proviceAddressList
        );
      } else {
        this.hukouAddresssRule = false;
      }
      this.form = JSON.parse(JSON.stringify(row));
      this.isShowModal = true;
    },
    // 删除
    deleteClick(row) {
      this.$Modal.confirm({
        title: "确认以下操作",
        content:
          "<p>是否删除该人员？</p>" +
          "<p>姓名：" +
          row.name +
          "</p>" +
          "<p>身份证号：" +
          row.idNumber +
          "</p>",
        onOk: () => {
          apis.DELETE_CASE_PEOPLE(row.id).then(res => {
            if (res.code == 200) {
              this.tableData = this.tableData.filter(item => item.id != row.id);
              this.$Message.success("人员删除成功");
            } else {
              me.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    // 模态框-确认
    okModal() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.addOrEditCasePeople(this.form).then(res => {
            if (res.code == 200) {
              if (res.data.isAdd) {
                // 新增成功
                this.tableData.unshift(this.buildTableData([res.data])[0]);
                this.$Message.success("人员添加成功");
              } else {
                this.tableData.forEach(item => {
                  // 编辑成功
                  if (item.id == this.buildTableData([res.data])[0].id) {
                    Object.assign(item, this.buildTableData([res.data])[0]);
                    this.$Message.success("人员编辑成功");
                  }
                });
              }
            } else {
              this.$Message.error(res.msg);
            }
            this.resetForm();
          });
          this.isShowModal = false;
        }
      });
    },
    // 模态框-取消
    cancelModal() {
      this.isShowModal = false;
      this.resetForm();
    },
    // 添加/编辑 涉案人员
    addOrEditCasePeople(data) {
      // data.id 为空时新增
      return apis.POST_CASE_PEOPLE_ADD_OR_EDIT(data);
    },
    // 获取人员状态字典项
    getStateList() {
      tool.getPersonStateList(this).then(res => {
        this.stateList = res;
        this.getCasePeopleList(); // 涉案人员列表
      });
    },
    // 获取涉案人员列表
    getCasePeopleList() {
      apis.GET_CASE_PEOPLE_LIST(this.form.caseId).then(res => {
        if (res.code == 200) {
          this.tableData = this.buildTableData(res.data);
        } else {
          me.$Message.error(res.msg);
        }
      });
    },
    // 设置表头
    setColumns() {
      this.columns = this.columnsTemp;
    },
    // 构建table数据
    buildTableData(dataArr) {
      return dataArr.map(item => {
        let stateItem = this.stateList.find(ele => ele.value == item.state);
        if (stateItem) item.stateName = stateItem.displayName;
        return item;
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
      this.form.id = null;
      this.form.stateName = null;
      this.form.hukouAddressPath = [];
      this.form.householdProvince = null;
      this.form.householdProvinceCode = null;
      this.form.householdCity = null;
      this.form.householdCityCode = null;
      this.form.householdCounty = null;
      this.form.householdCountyCode = null;
      this.form.householdTown = null;
      this.form.householdTownCode = null;
      this.form.householdDetailAddress = null;
      this.form.householdVillage = null;
      this.form.householdVillageCode = null;
      this.form.householdAddressCodeTierPath = null;
      this.form.householdAddressTierPath = null;
      this.form.householdVillageCodeDiaplayName = null;
      this.form.householdAddress = null;
      this.isPersonInfoLedger = false;
    },
    // 添加按钮click事件
    addBtnClick(caseId) {
      console.log(this.form);

      this.isShowModal = true;
      this.form.caseId = caseId;
    },
    // 通过身份证获取人员信息
    handleIdNumber() {
      let me = this;
      let idNumber = this.form.idNumber;
      if (idNumber) {
        apis.GET_LEGER_INFOMATION(idNumber).then(res => {
          if (res.code == 200) {
            let data = res.data ? res.data : {};
            data.hukouAddressPath = data.householdProvinceCode
              ? [
                  data.householdProvinceCode,
                  data.householdCityCode,
                  data.householdCountyCode,
                  data.householdTownCode,
                  data.householdVillageCode
                ]
              : [];

            if (data) {
              me.hukouAddresssRule = tool.setAddressByCodeArr(
                data.hukouAddressPath,
                this.proviceAddressList
              );
            }
            data.caseId = me.form.caseId;
            data.id = me.form.id;
            data.idNumber = me.form.idNumber;
            me.resetForm();
            Object.assign(me.form, data);
            this.isPersonInfoLedger = res.data != null;
          }
        });
      }
    }
  },
  watch: {
    "form.state": {
      handler(val) {
        // form 中添加 状态名属性
        if (val)
          this.form.stateName = this.stateList.find(
            item => item.value == val
          ).displayName;
      },
      immediate: true
    },
    "$route.query.status": {
      handler(val) {
        if (val) {
          if (val == 0 || val == 1) {
            this.canEdit = false;
          }
          if (val == 2) {
            this.canEdit = true;
          }
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-table-body {
  max-height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
}
// 无证人员 模态框底部
.noIdNumber-footer-box {
  overflow: hidden;
  .noIdNumber-footer-btns {
    float: right;
    .btn {
      float: left;
      width: 70px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      margin-right: 12px;
      cursor: pointer;
      border: 1px solid #000;
      border-radius: 2px;
      border: 1px solid #ccc;
      background-color: #fff;
      color: #333;
    }
    .ok-btn {
      border: 1px solid rgba(0, 0, 0, 0);
      background-color: #0668c8;
      color: #fff;
    }
  }
}
</style>
