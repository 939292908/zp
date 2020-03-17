<!--
 * @Author: your name
 * @Date: 2019-12-25 11:16:45
 * @LastEditTime : 2019-12-25 17:25:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\src\components\mapCollectionNext\components\assembly\relationModal.vue
 -->
<template>
  <Modal
    v-model="showModal"
    title="图谱人员关系变更"
    @on-ok="handleChangeRelation"
    @on-cancel="cancel"
    width="420"
    :mask-closable="false"
    :loading="loading"
  >
    <Form ref="form" :model="form" :rules="rule" :label-width="82">
      <FormItem label="关系人" prop="relationPerson">
        <p>{{relationName}}（{{currentIdNumber}}）</p>
      </FormItem>
      <FormItem label="关系指向人" prop="workPerson">
        <Select
          v-model="form.workPerson"
          style="width:90%"
          clearable
          filterable
          @on-change="handleRelationPerson"
        >
          <Option
            v-for="(item,index) in workPersonList"
            :value="item.idNumber"
            :key="item.index"
          >{{ item.name }}：{{item.idNumber}}</Option>
        </Select>
      </FormItem>
      <FormItem label="身份/称谓" prop="relationType">
        <Select
          v-model="form.relationType"
          style="width:90%"
          clearable
          filterable
          @on-change="handleRelation"
        >
          <Option
            v-for="(item,index) in relationList"
            :value="item.id"
            :key="item.index"
          >{{ item.displayName }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div v-if="workPersonValue && relationForm.displayName">
      <label>变更结果：</label>
      <span class="info">{{relationName}}（{{currentIdNumber}}）</span>是
      <span class="info">{{workPersonValue}}</span>的
      <span class="info">{{relationForm.displayName}}</span>
    </div>
  </Modal>
</template>

<script>
import * as apis from "@/api/collection/index";
import { getDisplayList } from "@/tools/units";
export default {
  name: "relationModal",
  props: {
    collectId: {
      type: String,
      default: ""
    },
    currentIdNumber: {
      //要修改关系的人的身份证号
      type: String,
      default: ""
    },
    relationName: {
      //要修改关系的人的姓名
      type: String,
      default: ""
    },
    mapType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showModal: false,
      form: {
        workPerson: "",
        relationType: ""
      },
      rule: {
        workPerson: {
          required: true,
          message: "关系归属人不能为空！",
          trigger: "change"
        },
        relationType: {
          required: true,
          message: "身份/称谓不能为空！",
          trigger: "change"
        }
      },
      loading: false,
      workPersonList: [],
      relationList: [],
      workPersonValue: "",
      relationForm: {
        displayName: "", //身份/称谓
        relationType: "", //身份/称谓
        relationName: "", //关系名称
        relationDirection: "" //关系方向
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs["form"].resetFields();
      this.relationForm = {};
      this.workPersonValue = "";
    },
    handleShowModal() {
      this.showModal = true;
    },
    cancel() {
      this.resetForm();
      this.showModal = false;
    },
    handleChangeRelation() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.save();
        } else {
          this.$Message.error("请完善信息！");
          setTimeout(() => {
            this.loading = false;
            this.showModal = true;
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 0);
        }
      });
    },
    handleRelationPerson(value) {
      if (value) {
        let workPerson = this.workPersonList.filter(
          x => x.idNumber == this.form.workPerson
        )[0];
        this.workPersonValue =
          workPerson.name + "（" + workPerson.idNumber + "）";
      }
    },
    handleRelation(value) {
      if (value) {
        let relation = this.relationList.filter(
          x => x.id == this.form.relationType
        )[0];
        this.relationForm.displayName = relation.displayName;
        this.relationForm.relationType = relation.id;
        this.relationForm.relationName = relation.name;
      }
    },
    save() {
      this.loading = true;
      let params = {
        collectId: this.collectId,
        newPersonInfo: {
          idNumber: this.currentIdNumber
        },
        relation: this.relationForm,
        workObjectPersonIdNumber: this.form.workPerson
      };
      apis
        .POST_UPDATA_PERSON_RELATION(params)
        .then(res => {
          if (res.code === 200) {
            this.$Message.success("关系变更成功！");
            this.loading = false; // 关闭加载状态
            this.showModal = false; // 关闭当前模态
            this.resetForm();
            this.$emit("on-updata");
          } else {
            this.$Message.error(res.msg || "关系变更失败！");
          }
        })
        .catch(() => {
          this.showModal = false;
          this.loading = false;
        });
    }
  },
  watch: {
    currentIdNumber: {
      handler(val) {
        if (val && this.collectId) {
          apis.GET_EXCLUDE_PERSONINFO_LIST(val, this.collectId).then(res => {
            if (res.code == 200) {
              this.workPersonList = res.data;
            }
          });
        }
      },
      immediate: true
    },
    mapType: {
      handler(val) {
        if (val) {
          getDisplayList(val).then(res => {
            let data = res[0];
            if (data.code == 200) {
              if (val == 1 || val == 2) {
                this.relationList = data.data.filter(
                  x => x.id != 64 && x.id != 65
                );
              }
              if (val == 6) {
                this.relationList = data.data.filter(x => x.id != 66);
              }
            }
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ivu-modal-body {
  padding: 16px !important;
}

/deep/ .ivu-modal-close {
  right: 8px;
  top: 8px;
}
.alert {
  font-size: 12px;
  color: #ce4343;
}
.info {
  color: #ce4343;
  word-break: break-all;
}
</style>
