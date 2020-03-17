<template>
  <!-- 线长比例 800 3000 5000 8000 :class="'i'+index"-->
  <div class="scale-wrapper">
    <div
      v-for="(item,index) in ratioList"
      :key="index"
      :style="{'top':((1- item / max) * 100)  + '%'}"
      :class="index == ratioIndex?'scale light':'scale'"
      @click="changeRatio(item,index)"
    >{{item}}</div>
    <div class="add circle" @click="changeScale('add')">+</div>
    <div class="sub circle" @click="changeScale('sub')">-</div>
    <input
      type="range"
      :max="max"
      :min="min"
      @change="rangeChange($event)"
      v-model="ratioValue"
      :style="inputStyle"
    />
  </div>
</template>
<script>
export default {
  name: "Scale",
  props: {
    ratio: {
      type: Array,
      default() {
        return [];
      }
    },
    max: {
      type: Number,
      default: 8000
    },
    min: {
      type: Number,
      default: 800
    },
    value: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      // ratioIndex: this.ratio.length - 1,
      ratioValue: this.value
    };
  },
  computed: {    
    ratioList() {
      let arr = JSON.parse(JSON.stringify(this.ratio));
      return arr.sort((a,b)=>{
        return b - a;
      })
    },
    ratioIndex() {
      let arr = JSON.parse(JSON.stringify(this.ratioList));
      arr.sort((a,b)=>{
        return b - a;
      })
      let index = arr.indexOf(this.ratioValue)
      return index == -1 ? arr.length - 1 : index;
    },
    inputStyle: function() {
      let percent = (this.ratioValue - this.min) / 72;
      return (
        "background:linear-gradient(to right, #76b0f7, white " +
        percent +
        "%, white)"
      );
    }
  },
  methods: {
    // 直接点击刻度事件
    changeRatio(item, index) {
      this.ratioValue = item;
      this.$emit("on-change", this.ratioValue);
    },
    // 增减按钮事件
    changeScale(type) {
      if (type == "add") {
        if(this.ratioIndex <= 0) {
          this.ratioValue = this.ratioList[0];
        } else {
          this.ratioValue = this.ratioList[this.ratioIndex - 1];
        }    
      } else {
        if(this.ratioIndex >= this.ratioList.length - 1) {
          this.ratioValue = this.ratioList[this.ratioList.length - 1];
        } else {
          this.ratioValue = this.ratioList[this.ratioIndex + 1];
        }
      }
      this.$emit("on-change", this.ratioValue);
    },
    // 拖动滑块修改值事件
    rangeChange(event) {
      // 验证当前的值最接近哪一个值
      var c = [];
      let arr = this.ratioList;
      for (var i = 1; i < arr.length; i++) {
        c.push([arr[i], arr[i - 1]]);
      }
      for (var i = 0; i < c.length; i++) {
        let item = c[i]
        if (this.ratioValue >= item[0] && this.ratioValue <= item[1]) {
          if (this.ratioValue - item[0] >= item[1] - this.ratioValue) {
            this.ratioValue = item[1];
          } else {
            this.ratioValue = item[0];
          }
          break;
        }
      }
      this.$emit("on-change", this.ratioValue);
    }
  }
};
</script>
<style lang="less" scoped>
.scale-wrapper {
  top: 50px;
  left: -20px;
  width: 129px;
  position: absolute;
  cursor: pointer;
  height: 129px;
  input[type="range"] {
    -webkit-appearance: none;
    transform: rotate(-90deg);
    outline: none;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    cursor: pointer;
    position: absolute;
    top: 50%;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    border-radius: 10px; /*将轨道设为圆角的*/
    box-shadow: 0 1px 1px #def3f8, inset 0 2px 2px #4a4a4b; /*轨道内置阴影效果*/
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff;
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
    box-shadow: 0 0.125em 0.125em #3b4547; /*添加底部阴影*/
  }

  .light {
    color: #0668c8;
  }
  .scale {
    position: absolute;
    left: 80px;
    display: block;
    width: 50px;
    cursor: pointer;
  }

  .circle {
    height: 24px;
    width: 24px;
    line-height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    position: absolute;
    left: 52px;
    text-align: center;
    font-size: 24px;
    background: #fbf3f3;
    &.add {
      top: -20%;
    }
    &.sub {
      top: 110%;
    }
  }
}
</style>