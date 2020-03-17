<template>
  <div>
    <!-- 在线 -->
    <div class="online-count">
      <i class="iconfont icon-geren1"></i>
      <span>在线：&nbsp;{{$store.state.onlinecount || 1}}</span>
    </div>
    <div class="r_btn" @click="switchModal">
      <div
        :class=" index == modalCur ? 'btn current ' + item.class : 'btn ' + item.class "
        v-for="(item,index) in modalList"
        :key="index"
        :data-index="index"
      >
        <i :class="'iconfont ' + item.childClass"></i>
        <!-- <span>{{ $t(item.text) }}</span> -->
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchView",
  //props : ['modal'],
  data() {
    return {
      modalCur: null,
      //modalList: this.modal
      list: [],
      // modalList: [
      // 	{
      // 		class: 'personal',
      // 		childClass: 'icon-geren',
      // 		text: 'message.index.personal'
      // 	},
      // 	{
      // 		class: 'news',
      // 		childClass: 'icon-xiaoxi',
      // 		text: 'message.index.message'
      // 	},
      // 	{
      // 		class: 'app',
      // 		childClass: 'icon-yingyong',
      // 		text: 'message.index.application'
      // 	}
      // ]
      modalList: [
        {
          class: "personal",
          childClass: "icon-geren",
          text: "个人"
        },
        // {
        //   class: "news",
        //   childClass: "icon-xiaoxi",
        //   text: "消息"
        // },
        {
          class: "app",
          childClass: "icon-yingyong",
          text: "应用"
        }
      ]
    };
  },
  created() {
    //this.$i18n.locale='ch';
  },
  methods: {
    switchModal(evt) {
      evt.stopPropagation();
      var obj =
        evt.target.tagName.toLocaleLowerCase() == "div"
          ? evt.target
          : evt.target.parentNode;
      this.modalCur = obj.dataset.index;
      this.$emit("viewIndex", obj.dataset.index);
    }
    // switchLanguage (name) {
    // 	this.$i18n.locale = name;
    // 	console.log(this.modalList)
    // }
  }
};
</script>

<style lang="less" scoped>
.post(a) {
  position: absolute;
}

.online-count {
  .post(a);
  z-index: 99;
  right: 380px;
  height: 30px;
  top: 16px;
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 14px;
  i {
    margin-right: 5px;
    .iconfont {
      font-size: 20px !important;
    }
    .icon-geren:before {
      content: "\e60f";
    }
	}
}
.r_btn {
  // width: 471px;
  width: 306px;
  height: 38px;
  top: 14px;
  right: 18px;
  .post(a);
  z-index: 99;
  .btn {
    width: 157px;
    height: 38px;
    line-height: 38px;
    float: left;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    .post(a);
    // background:url(../../../static/images/check.png) 0 0 no-repeat;
    background: url(../../../static/images/check-two.png) 0 0 no-repeat;
    background-size: 100% 100%;
    span:nth-child(2) {
      background: -webkit-linear-gradient(top, #fff, #74c2ff); /* 背景色渐变 */
      -webkit-background-clip: text; /* 规定背景的划分区域 */
      -webkit-text-fill-color: transparent; /* 防止字体颜色覆盖 */
    }
  }
  .current {
    // background:url(../../../static/images/checked.png) 0 0 no-repeat;
    background: url(../../../static/images/checked-two.png) 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .personal {
    // left:0;
    left: 14px;
  }
  .news {
    // left:140px;
    left: 148px;
  }
  .app {
    // left:280px;
    // left: 282px;
    left: 148px;
  }
}
@media screen and (max-width: 1620px) {
  .result-search-box {
    left: 59%;
	}
	.online-count{
    // right: 288px;
    right: 318px;
	}
  .r_btn {
    width: 256px;
    .personal {
      // left:0;
      left: -1px;
    }
    .btn {
      width: 140px;
    }
    .news {
      // left:98px;
      left: 98px;
    }
    .app {
      // left:196px;
      // left: 197px;
      // left: 98px;
      left: 118px;
    }
  }
  .upload-picture {
    left: 59%;
  }
}
</style>
