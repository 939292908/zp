<template>
  <div class="wrapper">
    <div class="top list">
      <div class="title">
        已匹配到的身份证号
        <span>( {{data.matchList.length}} )</span>
        <i class="iconfont icon-guanbi1" @click="handleClose"></i>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <i-input v-model="keyword" clearable placeholder="请输入关键字" @keyup.enter="handleSearch">
          <Icon type="ios-search" slot="suffix" @click="handleSearch" />
        </i-input>
        <i-button style="margin-left:10px;" size="small" type="primary" @click="handleSearch">搜索</i-button>
      </div>
      <!-- 列表 -->
      <div class="content">
        <div class="showMsg" v-if="showMsg">无搜索结果</div>
        <div
          :class="'item ' + (index == avtiveIndex ? 'active' : false)"
          :key="index"
          v-for="(item,index) in personList"
          @click="handleItemEvent(item, index)"
        >
          <div class="left">
            <img :src="getImagePath(item.picUrl)" alt />
          </div>
          <div class="center">
            <div class="userName">{{item.userName}}</div>
            <div class="idNumber">{{item.idNumber}}</div>
            <div class="tagCount text">{{$config.properties.RYBQ}}数：{{item.tagCount}}</div>
            <div class="text">出现频次：{{item.appearNum}}</div>
          </div>
          <div class="right">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom list">
      <div class="title">
        未匹配到的身份证号
        <span>( {{data.unMatchList.length}} )</span>
      </div>
      <div class="content">
        <table class="table-list">
          <thead>
            <tr>
              <th align="center" width="70px">序号</th>
              <th align="left" class="relation">
                身份证号
                <i class="iconfont icon-document" @click="handleCopyEvent"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item,index) in data.unMatchList">
              <td align="center">{{index + 1}}</td>
              <td align="left">{{item}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <textarea name="copy" id="copyObj" cols="30" rows="10" v-model="copyObj"></textarea>
  </div>
</template>
<script>
export default {
  name: "zPerson",
  data() {
    return {
      keyword: "",
      copyObj: "",
      personList: [],
      avtiveIndex: -1
    };
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          matchList: [
            // {
            //   picUrl: null,
            //   userName: "板合提亚尔·巴拉提z",
            //   idNumber: "652900197801010128",
            //   tagCount: "6"
            // }
          ],
          unMatchList: []
        };
      }
    }
  },
  computed: {
    showMsg() {
      return this.personList.length == 0 
    }
  },
  methods: {
    // 搜索事件
    handleSearch() {
      if(!this.keyword || this.keyword == "") {
        this.personList = this.data.matchList;
      } else {
        this.personList = this.data.matchList.filter(item => item.stateStrong.indexOf(this.keyword) != -1)
      }
    },
    // 复制事件
    handleCopyEvent() {
      let arr = this.data.unMatchList.map(x => x.idNumber);
      this.copyObj = arr.join(",");
      this.$nextTick(() => {
        let doc = document.getElementById("copyObj");
        doc.select();
        document.execCommand("Copy");
        this.$Message.info("复制成功");
      });
    },
    // 关闭事件
    handleClose() {
      this.$emit("on-close");
    },
    // 已匹配的身份证号点击事件
    handleItemEvent(item, index) {
      this.avtiveIndex = index;
      this.$emit("on-item-click", item, index);
    }
  },
  watch: {
    'data.matchList': {
      handler(val) {
        this.personList = val;
      },
      immediate: true
    },
  }
};
</script>
<style lang="less" scoped>
.search {
  display: inline-flex;
  align-items: center;
  margin: 8px 0 0 10px;
  /deep/ .ivu-input {
    width: 225px;
  }
  /deep/ .ivu-checkbox-group {
    .ivu-checkbox-group-item {
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 2px 8px;
      font-size: 13px;
    }
    .ivu-checkbox {
      display: none;
    }
  }
  /deep/ button {
    height: 28px;
    border-radius: 1px;
    min-width: 48px;
    padding: 1px 10px 2px;
  }
}
.list {
  overflow: hidden;
  .title {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #e3e3e3;
    padding: 0 12px;
    > span {
      font-weight: bold;
    }
  }
  .content {
    overflow-y: auto;
    height: calc(100% - 72px);
    .showMsg {
      text-align: center;
      margin-top: 20px;
    }
  }
}
.top {
  height: 60%;
  .title {
    position: relative;
    > i {
      position: absolute;
      right: 15px;
      cursor: pointer;
    }
  }
  .content {
    .item {
      width: 100%;
      height: 80px;
      color: #000000;
      font-size: 14px;
      border-bottom: 1px solid #e3e3e3;
      padding: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .left {
        flex: 0 0 61px;
        img {
          width: 52px;
          height: 55px;
        }
      }
      .center {
        flex: auto;
        .userName {
          font-size: 14px;
          color: #333333;
        }
        .idNumber,
        .tagCount {
          font-size: 12px;
          color: #999999;
        }
        .text {
          display: inline;
          font-size: 12px;
          color: #999999;
          margin-right: 4px;
        }
      }
      .right {
        color: #aaaaaa;
        display: flex;
        align-items: center;
        flex: 0 0 18px;
      }
      &.active,
      &:hover {
        background: #f7f7f7;
      }
    }
  }
}
.bottom {
  height: 40%;
  .title {
    color: #e60012;
    border-top: 1px solid #e3e3e3;
  }
  .content {
    padding: 16px 12px;
    .table-list {
      width: 100%;
      font-size: 12px;
      border-collapse: collapse;
      border: 1px solid #e3e3e3;
      border-bottom: 0px solid #e3e3e3;
      thead {
        background: #e8eaeb;
        color: #101010;
        font-weight: bold;
        tr {
          height: 28px;
        }
        .relation {
          position: relative;
          > i {
            position: absolute;
            top: 2px;
            right: 10px;
            color: #969899;
          }
        }
      }
      tbody {
        tr {
          height: 34px;
          border-bottom: 1px solid #e3e3e3;
        }
      }
    }
  }
}
#copyObj {
  position: absolute;
  left: -99999px;
  top: -99999px;
}
</style>
