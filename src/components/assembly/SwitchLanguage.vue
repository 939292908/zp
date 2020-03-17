<template>
  <div class="language">
    <Dropdown @on-click="switchLanguage">
      <Button type="primary">
        {{ language }}
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <Dropdown-menu slot="list">
        <Dropdown-item name="ch">ch</Dropdown-item>
        <Dropdown-item name="en">en</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
  </div>
</template>

<script>
  export default{
    name : 'SwitchLanguage',
    data () {
      return {
        language: 'language'
      }
    },
    methods : {
      switchLanguage (name) {
        this.language = name;
        this.$emit('switchLanguage', name);
      }
    }
  }
</script>

<style lang="less">
  // .ivu-dropdown{
  //   width:85px;
  //   position:absolute;
  //   right:50px;
  //   top:25px;
  //   z-index:99999;
  //   .ivu-dropdown-rel{
  //     .ivu-btn{
  //       width:100%;
  //       padding:5px 5px 6px;
  //     }
  //   }
  //   .ivu-select-dropdown{
  //     .ivu-dropdown-menu{
  //       min-width:100%;
  //     }
  //   }
  // }
</style>