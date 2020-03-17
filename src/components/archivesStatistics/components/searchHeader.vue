<template>
    <div class="search-header">
      <h3>{{title}}</h3>
      <div class="search" v-if="isShowSearch">
        <Button class="search-btn" @click="onSearch(searchText)">搜索</Button>
        <Input v-model="searchText" search @on-search="onSearch" placeholder="输入姓名、身份证号、地址信息搜索，多个条件用空格隔开" />
      </div>
    </div>
</template>

<script>

export default {
  name: "searchHeader",
  props: {
    title:{
      type:String,
      default:null
    },
    isShowSearch:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      searchText: ""
    }
  },
  methods: {
    onSearch ( text ) {
      // alert(text)
        let routeData = this.$router.resolve({
        name:'Archives',
        query:{
          searchText:text,
        }
      })
      window.open(routeData.href, '_blank');
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
    height: 42px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    margin-top: 6px;
  h3 {
    float: left;
    font-size: 18px;
    margin-top: 4px;
  }
  .search {
    width: 65%;
    float: right;
    .ivu-input-wrapper {
      float: right;
      width: 60%;
      margin-right: 20px;
    }
    button {
      float: right;
      background-color: #0668C8;
      color: #fff;
    }
  }
}
</style>

