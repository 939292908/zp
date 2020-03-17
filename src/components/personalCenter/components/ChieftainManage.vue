<template>
  <div class="layout">
    <!-- 搜索/添加 -->
    <div class="search">
      <label>人员搜索</label>
      <i-input
        class="search-input"
        size="large"
        v-model="textFilter"
        clearable
        placeholder="请搜索用户名、身份证号"
        @keyup.enter.native="search"
      >
        <i-button class="search-btn" slot="append" icon="ios-search" @click.native="search"></i-button>
      </i-input>
      <div class="table-actions">
        <span v-if="hasFunAuth(constantFunMap.FUN_Center_TouMianRenWu_Add_ID)" class="button-primary" @click.prevent="showModal('add')">添加</span>
      </div>
    </div>
    <!-- 表格 -->
    <Table stripe ref="tableChieftain" class="table-chieftain" border :height='tabeHeight' :columns="columns" :data="tableData"></Table>
    <!-- 分页 -->
    <div class="page" style="margin: 10px;overflow: hidden">
      <div>
        <Page
          :total="total"
          :current="currentPageIndex"
          :page-size="pageSize"
          show-total
          show-elevator
          @on-change="handlePageChange"
        ></Page>
      </div>
    </div>
    <!-- add/editor框 -->
      <Modal
        v-model="statusList.showModal"
        :title="modalTitle+'头面人物'"
        @on-ok="modalOk"
        @on-cancel="modalCancel">
        <!-- 表单 -->
        <i-form ref="chieftainForm" class="chieftain-form" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <Form-item label="体系：" prop="system">
            <Select v-model="formValidate.system" placeholder="请选择体系">
                <Option value="1">荒地讲经堂</Option>
                <Option value="2">阿.买合苏木体系</Option>
                <Option value="3">马木提.艾山体系</Option>
            </Select>
          </Form-item>
          <Form-item label="级别：" prop="level">
            <Select v-model="formValidate.level" placeholder="请选择级别">
                <Option value="地区级">地区级</Option>
                <Option value="县市级">县市级</Option>
                <Option value="乡镇级">乡镇级</Option>
            </Select>
          </Form-item>
          <Form-item label="身份证：" prop="idNumber">
            <i-input v-model="formValidate.idNumber" :maxlength="20"></i-input>
          </Form-item>
          <Form-item label="姓名：" prop="name">
            <i-input v-model="formValidate.name" :maxlength="20" disabled></i-input>
          </Form-item>
          <Form-item label="地区：" prop="region">
            <i-input v-model="formValidate.region" :maxlength="20"></i-input>
          </Form-item>
          <Form-item label="镇：" prop="town">
            <i-input v-model="formValidate.town" :maxlength="20"></i-input>
          </Form-item>
          <Form-item label="乡：" prop="village">
            <i-input v-model="formValidate.village" :maxlength="20"></i-input>
          </Form-item>
        </i-form>
        <div slot="footer">
          <Button type="text" size="large" @click="modalCancel">取消</Button>
          <Button type="primary" size="large" @click="modalOk">确定</Button>
        </div>
      </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textFilter: "", // 搜索
      modalType: "", // 编辑(editor) / 添加(add)
      editorId: "", // 编辑id
      removeId: "", // 删除id
      total: 100, // 分页
      currentPageIndex: 1,
      pageSize: 10,
      tabeHeight: 0, // 表格高度

      statusList: {
        showModal: false, // show： 编辑 or 添加框
      },
      // 表格
      columns: [
        {
          title: "体系",
          key: "system"
        },
        {
          title: "级别",
          key: "level"
        },
        {
          title: "身份证号",
          key: "idNumber",
          width: 170,
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "地",
          key: "region"
        },
        {
          title: "镇",
          key: "town"
        },
        {
          title: "乡",
          key: "village"
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          render: (h, params) => {
            let arr = []
            if(this.hasFunAuth(this.constantFunMap.FUN_Center_TouMianRenWu_Edit_ID)) {
              arr.push(h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showModal("editor", params.row);
                    }
                  }
                },
                "编辑"
              ))
            }
            if(this.hasFunAuth(this.constantFunMap.FUN_Center_TouMianRenWu_Delete_ID)) {
              arr.push(h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.showDeleteModal(params.row);
                    }
                  }
                },
                "删除"
              ))
            }
            return h("div", arr);
          }
        }
      ],
      tableData: [
        {
          id: 1,
          system: "1",
          level: "乡镇级",
          idNumber: "123222142234341122",
          region: "地1",
          town: "镇1",
          village: "乡1",
          name: "姓名1"
        },
        {
          id: 2,
          system: "2",
          level: "地区级",
          idNumber: "234632142276345566",
          region: "地2",
          town: "镇2",
          village: "乡2",
          name: "姓名2"
        }
      ],
      // modal 表单
      formValidate: {
        system: "1",
        level: "地区级",
        idNumber: "",
        region: "",
        town: "",
        village: "",
        name: ""
      },
      // 表单校验
      ruleValidate: {
        idNumber: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          { validator: this.validateIdNumber, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    modalTitle () {
      return  this.modalType == 'editor' ? '编辑' : '添加';
    }
  },
  mounted() {
    // 设置表格高度
    this.getTabeHeight();
    window.onresize = this.getTabeHeight;
  },
  methods: {
    // ========== 获取数据 ==========
    getData() {
      // this.tableData = {}
    },
    // ========== Moldal show ==========
    showModal(type, row) { 
      this.modalType = type; // 确定功能
      this.editorId = row ? row.id : "";
      if (this.modalType == 'editor') {
        this.formValidate = JSON.parse(JSON.stringify(row));
      }
      this.statusList.showModal = true;
    },
    showDeleteModal(row) {
      this.removeId = row.id;
      // 提示框
      this.$Modal.confirm({
        title: "请确认您的操作！",
        content: "<p>是否删除！</p>",
        // 确认
        onOk: () => {
          this.removeItem();
        },
        // 取消
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    // ========== Madal 按钮事件 ==========
    // 确认
    modalOk () {
      this.$refs["chieftainForm"].validate( isOk => {
        if ( isOk ) {
          if (this.modalType == 'add') {
            this.addItem();
          } else if (this.modalType == 'editor') {
            this.editorItem();
          }
        }
      })
    },
    // 取消
    modalCancel () {
      this.closeModal();
      this.$Message.info(`取消${this.modalTitle}`);
      this.resetForm();
    },
    // 重置表单
    resetForm () {
      this.$refs.chieftainForm.resetFields();
    },
    // 关闭模态框
    closeModal () {
      this.statusList.showModal = false;
    },
    // ========== 增删改查 ==========
    addItem() {
      this.$refs["chieftainForm"].validate( isOk => {
        if ( isOk ) {
          let data = this.formValidate;
          let me = this;
          // comApis.ChangePassword(data).then(response => {
          //   if(response.code == 200){
              this.closeModal();
              this.resetForm();
              this.$Message.info("添加成功");
          //   } else {
          //     this.$Message.warning(response.msg);
          //   } 
          // })
          //  .catch(error => {
          //   console.log(error);
          // });
        }
      })

    },
    removeItem() {
      console.log(this.removeId);
      this.$Message.info("删除成功");
    },
    editorItem() {
      console.log(this.editorId);
      this.closeModal();
      this.resetForm();
      this.$Message.info("编辑成功");

    },
    search() {
      alert(this.textFilter);
    },
    // 根据身份证获取姓名
    getUserNameByIdName (id) {

    },
    // 点击同步分页
    handlePageChange(pageIndex) {
      this.currentPageIndex = pageIndex;
      this.getData();
    },
    // 获取表格高度
    getTabeHeight() {
      this.tabeHeight =  document.querySelector('.table-chieftain').offsetHeight;
    },
    // ========== 校验规则 ==========
    validateIdNumber (rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入身份证"));
      } else if (!/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        return callback(new Error("身份证输入错误！"));
      } else {
        callback();
        this.getUserNameByIdName();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@imageUrl: "../../../../";
.button-primary {
  float: right;
  display: inline-block;
  width: 93px;
  height: 36px;
  margin-top: 12px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  background: url("@{imageUrl}static/images/sure.png") 0 0 no-repeat;
  color: #ffffff;
}
.layout {
  padding: 124px 40px 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  .search {
    padding-bottom: 20px;
    display: flex;
    align-items : flex-start; 
    position: relative;
    height: 16%;
    .table-actions {
      position: absolute;
      right: 0px;
    }
    .search-input {
      width: 500px;
      /deep/ .ivu-input-icon-clear {
        right: 81px !important;
      }
    }
    .search-btn {
      width: 80px;
    }
    > label {
      padding: 8px 0 0 16px;
      width: 120px;
    }
  }
  .table-chieftain {
    height: 65%;
  }
  .page {
    height: 14%;
    padding-top: 10px;
  }
}
.chieftain-form {
  padding-right: 20px;
}
</style>

