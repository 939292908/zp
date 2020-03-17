<template>
<div class="noIdNumber-content-box">
  <div class="noIdNumber">
    <!-- 搜索 -->
    <div class="search-box">
      <Input
        v-model="reqData.keyWord"
        search
        @on-search="onSearch"
        placeholder="虚拟身份证、虚拟姓名"
        width="50"
      />
      <Button class="search-btn" @click="onSearch">搜索</Button>
    </div>
    <!-- 表 -->
    <div class="table-box">
      <Table stripe border :columns="columns" :data="tableData" @on-row-click="rowClick">
        <template slot-scope="{ row }" slot="operation">
          <Icon 
          type="md-checkmark-circle"
          :class="{
              checkedBtn: true,
              checkedActive: row.idNumber == idNumber,
            }"/>
        </template>
    </Table>
    <!-- loading -->
    <Loading color="white" v-model="showLoading"></Loading>
    </div>
    <!-- 分页 -->
    <div class="page">
      <div>
        <Page
          :total="pageInfo.total"
          :current="pageInfo.pageIndex"
          :page-size="pageInfo.pageSize"
          show-total
          show-elevator
          @on-change="handlePageChange"
        ></Page>
      </div>
    </div>
  </div>
  <div class="noIdNumberAdd">
    <p class="noIdNumberAdd-title">新建无证人员号码</p>
    <div class="msg-box">
      <div class="left-text">注：</div>
      <div class="msg-list">
        <p>1. 无证人员号码可根据所选性别、出生日期、户籍地自动生成，可手动修改。</p>
        <p> 2. 无证人员号码可直接手动编写输入。</p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="info-box">
      <div class="info-title">
        <span class="text-title">可选填</span>
        <span>（如需自动生成无证人员号码，请填写）</span>
      </div>
      <ul class="info-list">
        <li>
          <div class="label">性别</div>
          <div class="item">
            <Select v-model="addData.gender">
              <Option
                :key="index"
                v-for="(item,index) in optionList.genderList"
                :value="item.value"
              >{{ item.displayName }}</Option>
            </Select>
          </div>
        </li>
        <li>
          <div class="label">出生日期</div>
          <div class="item">
            <DatePicker
              style="width:100%"
              type="year"
              placeholder="请选择该人员的大致出生日期"
              format="yyyy"
              v-model="addData.year"
              :options="startTimeOption"
        ></DatePicker>
          </div>
        </li>
        <li>
          <div class="label">户籍地</div>
          <div class="item">
            <Cascader
              ref="hukouAdress"
              change-on-select
              v-model="addData.areaCodeList"
              :data="optionList.proviceAddressList"
              :load-data="loadHukouData"
              @on-change="handleHukouAdressSelectChange"
            ></Cascader>
          </div>
        </li>
        <li class="idNumber">
          <div class="label">无证人员号码</div>
          <div class="item card-num-group">
            <i-input
              class="card-num"
              v-model="addData.WZIdNumber"
              :disabled="true"
            ></i-input>
            <span class="not-id-people" @click="noIdNumberBtnClick">自动生成</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部按钮 -->
    <div class="noIdNumber-footer-box">
        <div class="noIdNumber-footer-btns">
          <div class="btn ok-btn" @click="okClick">确认选用</div>
          <div class="btn cancel-btn" @click="cancelClick">取消</div>
        </div>
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
    </div>
  </div>
</div>
</template>
<script>
import * as apis from "@/api/collection/index.js";
import Loading from '@/components/assembly/Loading'
import { OPTIONS_LIST } from "@/api/config.js";
import * as comApis from "@/api/common.js";

export default {
  name: "NoIdNumber",
  components: {
    Loading
  },
  mounted () {
    this.getOptionList();
  },
  data () {
    return {
      showLoading: false,
      // 添加人时，参数
      addData: {
        gender: "",
        year: "",
        areaCodeList: [],
        areaCode: "",
        areaCodePath: "",
        WZIdNumber:"",
        villageCode: "",
        village: "",
        addressCodeTierPath: "",
        addressTierPath: "",
      },
      // 字典项
      optionList: {
        genderList: [],
        proviceAddressList: [],
      },
      // 可选时间跨度
      startTimeOption: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      // 请求参数
      reqData: {
        keyWord: "", // 搜索内容
        pageIndex: 1,
        pageSize: 10,
        personType: '1'
      },
      // 选中的身份证
      idNumber: "",
      // 分页信息
      pageInfo: {
          total: 0,
          pageIndex: 1,
          pageSize: 10,
        },
      // 表头
      columns: [
        {
            title: '序号',
            width: 60,
            className: 'rowNum',
            key: 'rowNum'
        },
        {
            title: '虚拟身份证号',
            width: 168,
            key: 'idNumber'
        },
        {
            title: '虚拟姓名',
            width: 168,
            key: 'name'
        },
        {
            title: '户籍地',
            key: 'domicil'
        },
        {
            title: '简介',
            key: 'intro'
        },
        {
            title: '操作',
            slot: 'operation',
            width: 80,
            align: 'center'
        }
      ],
      // 表data
      tableData: []
    }
  },
  methods: {
    okClick() {
      if (!this.addData.WZIdNumber) {
        this.$Message.warning("请创建无证人员");
        return;
      }
      this.$emit("getNoIdNumberDataByAdd",this.addData);
      this.resetData();
    },
    cancelClick() {
      this.$emit("cancelClickToAdd");
      this.resetData();
    },
    // 无证人员按钮事件
    noIdNumberBtnClick() {
      this.showLoading = true;
      let params = this.buildNoIdNumberReqData(this.addData);
      console.log(this.addData,params);
      apis.GET_NO_IDNUMBER_BY_DATA(params).then(res => {
         console.log(res);
        if (res.code === 200) {
          this.addData.WZIdNumber = res.data;
          // this.$emit("getNoIdNumberfromTable",this.idNumber);
        }
        this.showLoading = false;
      })
      .catch(() => {
        this.showLoading = false;
        console.log("获取无证人员身份证失败");
        
      });
    },
    // 构建 获取无证人员身份证 数据
    buildNoIdNumberReqData(data) {
      let params = {
        areaCode: data.villageCode,
        gender: data.gender,
        year: data.year ? this.$moment(data.year).format("YYYY") : ""
      }
      return params;
    },
    // 获取清单
    getOptionList() {
      //性别
      this.$store
        .dispatch("getOptionsByKey", {
          key: OPTIONS_LIST.GENDER,
          apiFun: comApis.GET_OPTIONS_LIST,
          params: OPTIONS_LIST.GENDER
        })
        .then(res => {
          this.optionList.genderList = res;
        });
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
            this.optionList.proviceAddressList = arr;
          }
        });
      },
      // 选择户籍地地址的事件
      handleHukouAdressSelectChange(value, selectedData) {
        this.addData.villageCode = selectedData[selectedData.length - 1].code;
        this.addData.village = selectedData[selectedData.length - 1].label;
        this.addData.addressCodeTierPath = value.join("/");
        this.addData.addressTierPath = selectedData.map(x => x.label).join("/");
        // this.addData.villageCode = cur.code;
        // this.addData.village = cur.title;
        // this.addData.addressCodeTierPath = cur.path.id;
        // this.addData.addressTierPath = cur.path.title;
      },
      loadHukouData(item, callback) {
      if (item) {
        item.loading = true;
        comApis.GET_AREA_TREE_BY_CODE(item.code).then(res => {
          if (res.code == 200) {
            if (res.data.childAreaList) {
              let arr = res.data.childAreaList.map(x => {
                let obj = {
                  id: x.id,
                  code: x.code,
                  value: x.code,
                  name: x.name,
                  label: x.displayName,
                  parentId: x.parentId,
                  parentCode: x.parentCode,
                  longitude: x.longitude,
                  latitude: x.latitude
                };
                if (x.expanded == true) {
                  obj.loading = false;
                  obj.children = [];
                }
                return obj;
              });
              item.children = arr;
            } else {
              item.children = [];
            }
          }
          item.loading = false;
          callback();
        });
      }
    },
    // 获取无证人员data列表
    getNoIdNumberData (data) {
      this.showLoading = true;
       apis.POST_ON_ID_NUMBER_LIST(data).then(res => {
        //  console.log(res);
        if (res.code === 200) {
          this.tableData = res.data.data; // 表data
          this.pageInfo.total = res.data.total; // 分页total
        }
        this.showLoading = false;
      })
      .catch(() => {
        this.showLoading = false;
        console.log("获取无证人员失败");
        
      });
    },
    // 搜索
    onSearch () {
      this.reqData.pageIndex = 1;
      this.getNoIdNumberData(this.reqData);
    },
    // 行click事件
    rowClick (data) {
      console.log(data);
      this.idNumber = data.idNumber;
      this.$emit("getNoIdNumberfromTable",this.idNumber);
    },
    // 分页事件
    handlePageChange(index) {
      this.reqData.pageIndex = index;
      this.getNoIdNumberData(this.reqData);
    },
    // 重置
    resetData() {
      // 请求参数
      this.reqData = {
        keyWord: "",
        pageIndex: 1,
        pageSize: 10,
        personType: '1'
      };
      // 分页data
      this.pageInfo = {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
      };
      // 添加人时，参数
      this.addData = {
        gender: "",
        year: "",
        areaCodeList: [],
        areaCode: "",
        areaCodePath: "",
        WZIdNumber:"",
        villageCode: "",
        village: "",
        addressCodeTierPath: "",
        addressTierPath: "",
      },
      // table
      this.tableData = [];
      // 选中的身份证
      this.idNumber = "";
    },
  },
  props: {
  },
  watch: {
  }
};
</script>
<style lang="less" scoped>
.noIdNumber-content-box {
  display: flex;
  .noIdNumber {
    width: 60%;
    border-right: 1px solid #e8eaec;
    overflow: hidden;
    float: left;
    .search-box {
      width: 80%;
      padding-right: 100px;
      position: relative;
      margin: 16px auto;
      .search-btn {
        width: 80px;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #0668C8;
        color: #fff;
      }
    }
    .table-box {
      margin-right: 16px;
      .checkedBtn {
        font-size: 24px;
        color: #D1DAE3;
        cursor: pointer;
        &.checkedActive {
          color: #0668C8;
        }
      }
    }
    .page {
      margin-top: 16px;
      margin-bottom: 16px;
    }
    /deep/ .ivu-table-tbody {
      cursor: pointer;
      .rowNum {
        text-align: center;
      }
    }
  }
  .noIdNumberAdd {
    float: left;
    width: 40%;
    padding: 20px;
    position: relative;
    .noIdNumberAdd-title {
      font-size: 14px;
      color: #666;
      font-weight: 700;
    }
    .msg-box {
      color: #999;
      font-size: 12px;
      overflow: hidden;
      margin-top: 12px;
      line-height: 20px;
      .left-text {
        float: left;
        margin-right: 2px;
      }
      .msg-list {
        float: left;
      }
    }
    .info-box {
      background-color:#F7F7F7;
      border-radius: 4px;
      padding: 12px;
      margin-top: 12px;
      padding-right: 40px;
      margin-bottom: 76px;
      .info-title {
        font-size: 12px;
        color: #999;
        margin-bottom: 12px;
      }
      .text-title {
        font-size: 14px;
        font-weight: 700;
        color: #666;
      }
      .info-list {
        position: relative;
        > li {
          overflow: hidden;
          margin-bottom: 12px;
          .label {
            width: 100px;
            float: left;
            color: #666;
            font-size: 14px;
            line-height: 30px;
            text-align: right;
            padding-right: 16px;
          }
          .item {
            float: left;
            width: calc(100% - 100px);
          }
          // 表单 身份证
          .card-num-group {
            position: relative;
            .not-id-people {
              position: absolute;
              right: 10px;
              top: 6px;
              border: 1px solid #0668C8;
              color: #0668C8;
              width: 60px;
              height: 20px;
              line-height: 19px;
              border-radius: 2px;
              background-color: rgba(239, 246, 253, 1);
              font-size: 12px;
              text-align: center;
              cursor: pointer;
            }
            .card-num {
              margin-right: 4px;
            }
          }
        }
        .idNumber {
          position: absolute;
          width: 100%;
          bottom: -100px;
        }
      }
    }
  }
}
// 底部按钮
.noIdNumber-footer-box {
  overflow: hidden;
  position: absolute;
  right: 0;
  bottom: -40px;
  .noIdNumber-footer-btns {
    float: right;
    .btn {
      float: left;
      width: 78px;
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
      border: 1px solid rgba(0,0,0,0);
      background-color: #0668C8;
      color: #fff;
    }
  }
}
</style>

