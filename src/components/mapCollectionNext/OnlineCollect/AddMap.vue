<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 16:56:13
 * @LastEditTime: 2019-08-23 19:04:16
 * @LastEditors: Please set LastEditors
 -->
<template>
<!-- <div>ddd</div> -->
  <div class="modal-body" :style="{'padding': stepIndex != 2 ? '16px' : '0'}">
    <div class="modal-body-content">
      <transition name="modal" mode="out-in">
        <!-- <keep-alive :include="keepAliveCom"> -->
          <component
            class="modal-content"
            ref="step"
            :is="curComponent"
            :isAdd="isAdd"
            :curSelectTp="curSelectTp"
            :collectId="collectId"
            :workObjectPersonIdNumber="workObjectPersonIdNumber"
            :relation="relation"
            @on-restart="handleRestart"
            @on-next="handleNext"
            @on-prev="handlePrev"
          ></component>
        <!-- </keep-alive> -->
      </transition>
      <div class="footer-action" v-if="showFooter">
        <Button
          type="primary"
          :disabled="saveLoading"
          v-if="stepIndex < componentArr.length -1 && !isJump "
          @click.native="handleNext"
        >下一步</Button>
        <Button v-if="!isJump" @click.native="handlePrev">{{prevButtonText}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
// import StepOne from "../components/assembly/stepOne";
// import StepTwo from "../components/assembly/stepTwo";
// // import MapGraph from "../components/assembly/mapGraph";
// import StepThree from "../components/assembly/stepThree";
export default {
  name: "AddMapCollect",
  components: {
    // StepOne,
    // StepTwo,
    // // MapGraph,
    // StepThree
    StepOne: () => import("../components/stepOne"),
    StepTwo: () => import("../components/stepTwo"),
    StepThree: () => import("../components/stepThree")
  },
  computed: {
    curComponent() {
      let cur = this.componentArr.find(x => x.value == this.stepIndex);
      return cur ? cur.component : "";
    },
    prevButtonText() {
      if (this.stepIndex == 0) {
        return "取消并返回";
      } else {
        return "上一步";
      }
    },
    showFooter() {
      return this.stepIndex != 2 && this.stepIndex != 0;
    }
  },
  data() {
    return {
      curSelectTp: this.$route.query.mapType,
      stepIndex: this.$route.query.step || 0,
      isJump: false,
      collectId: "",
      relation: null,
      workObjectPersonIdNumber: "",
      isAdd: true,
      isExcel: false, // 是否用方法二：Excel采集图谱
      componentArr: [
        {
          name: "新建图谱表单",
          value: 0,
          component: "StepOne"
        },
        {
          name: "新建工作对象",
          value: 1,
          component: "StepTwo"
        },
        {
          name: "图谱绘制",
          value: 2,
          component: "StepThree"
        }
      ],
      keepAliveCom: [], //缓存组件,
      saveLoading: false
    };
  },
  methods: {  
    // 下一步 
    handleNext() {
      // 验证是否能够通过
      const me = this;
      me.saveLoading = true;
      this.$refs.step.$refs.form
        .handleSubmit()
        .then(res => {
          me.saveLoading = false;
          if(me.$refs.step.saveLoading) me.$refs.step.saveLoading = false;
          if(me.$route.query.mapType==9){
            var collectId;
            if(typeof(res)=='string'){
              collectId = res
            }else{
              collectId = res.data.collectId;
            }
            let name = me.$refs.step.$refs.form.drawn ? "CollectMarkerProfile" :"CollectDrawProfile";
              me.$router.push({
                name: name,
                query: {
                  areaCode: me.$refs.step.$refs.form.form.belongAreaCode,
                  collectId: collectId,
                  state: me.$refs.step.$refs.form.state
                }
              });
            return;
          }else if(me.$route.query.mapType==8){
            var collectId;
            if(typeof(res)=='string'){
              collectId = res
            }else{
              collectId = res.data.collectId;
            }
            let name = me.$refs.step.$refs.form.drawn ? "CollectMarkerExitEnter" :"CollectDrawProfile";
              me.$router.push({
                name: name,
                query: {
                  areaCode: me.$refs.step.$refs.form.form.belongAreaCode,
                  collectId: collectId,
                  state: me.$refs.step.$refs.form.state
                }
              });
            return;
          }
          me.collectId = me.$route.query.collectId;
          if (res && res.data.collectId) {
            me.collectId = res.data.collectId;
          } 
          if (me.stepIndex < me.componentArr.length - 1) {
            me.stepIndex++;
            me.keepAliveCom.push(me.curComponent);
          }
          // 如果是Excel模式采集，
          if (me.isExcel) {
            me.stepIndex = 2; // 直接跳第三步
            me.collectId = me.$refs.step.ExcelCollectId; // 使用Excel采集的id跳转
          };

          let routePath = this.getStepRoutePath();          
          me.$router.push({
            path: routePath,
            query: {
              step: me.stepIndex,
              collectId: me.collectId,
              mapType: this.$route.query.mapType
            }
          });
          
        })
        .catch(error => {
          if (error) {
            me.$Message.error(error.msg);
          } 
          // else {
          //   me.$Message.error("操作失败");
          // }
          me.saveLoading = false;
          if(me.$refs.step.saveLoading) me.$refs.step.saveLoading = false;
          // console.log("验证失败");
        });
    },
    // 取消并返回、或者上一步
    handlePrev() {
      if (this.stepIndex == 0) {
        this.keepAliveCom = []; //清空组件的缓存
        this.isJump = false;
        this.isAdd = true;
        this.stepIndex = 0;
        this.$refs.step.$refs.form.handleReset();
        this.$router.push({
          path: "/onlineCollect/dashboard",
          query: {}
        });
      } else {
        this.stepIndex--;
        let collectId = this.collectId || this.$route.query.collectId;
        let query = {
          step: this.stepIndex,
          mapType: this.$route.query.mapType
        };
        if (collectId) {
          query.collectId = collectId;
          this.isAdd = false; //编辑模式
        }
        let routePath = this.getStepRoutePath();
        this.$router.replace({
          path: routePath,
          query: query
        });
      }
    },
    handleRestart() {
      this.keepAliveCom = []; //清空组件的缓存
      this.isJump = false;
      this.isAdd = true;
      this.stepIndex = 0;
      if (this.$refs.step && this.$refs.step.$refs.form) {
        this.$refs.step.$refs.form.handleReset();
      }
      this.keepAliveCom.push(this.curComponent);
      let routePath = this.getStepRoutePath();
      this.$router.replace({
        path: routePath,
        query: {}
      });
    },
    getStepRoutePath() {
      let routePath = "/onlineCollect/addMap"
      // if(this.stepIndex == 0) {
      //   routePath = "/onlineCollect/addMap"
      // } else if(this.stepIndex == 0) {
      //   routePath = "/onlineCollect/addMapInfo"
      // } else if(this.stepIndex == 0) {
      //   routePath = "/onlineCollect/addMapObject"
      // }
      return routePath
    },
    toDraw(){},
    toMarker(){},
  }
};
</script>
<style lang="less" scoped>
.modal-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #F7F7F7;
  padding: 16px;
  position: relative;
  .modal-body-content{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #e0e3e6;
  }
  .modal-content {
    flex: auto;
  }
  /deep/ .footer-action {
    flex: 0 0 60px;
    text-align: right;
    // padding: 6px 20px;
    border-top: 1px solid #ddd;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 10;
    button{
      margin: 0 4px;
      min-width: 80px;
    }
  }
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  .modal-enter,
  .modal-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>