<template>
  <i-table
    class="marriage-table"
    ref="marriagemap"
    :loading="loading"
    border
    stripe
    :height='tableHeight'
    :columns="columns"
    :data="tableData"
  ></i-table>
</template>
<script>
 import * as comApis from '@/api/common.js'
export default {
  name: 'MarriageRelation',
  computed: {
    tableHeight () {
      return this.tableData.length > 7 ? 374 : '';
    }
  },
  data() {
    return {
      loading:false,
      tableData:[],
      columns:[
        {
          title: "联姻宗族",
          key: "name",
          className: 'marriagePersonColor',
          render: (h, params) => {
            let row = params.row;
            return (
              <div class="familys" on-click={$event => this.handleDetailClick(row)}>
                {row.name}
              </div>
            );
          }
        },
        {
          title: "联姻对象",
          key: "marriagePerson",
          className: 'marriagePersonColor',
          render: (h, params) => {
            let row = params.row;
            return (
              <div class="marriagePerson">
                {
                  this._l(row.marriagePerson,(x)=>{
                    return (
                      <div on-click={$event => this.handlePersonClick(x.marriagePerson)}>
                        <span>{x.marriagePerson.name}</span>
                        <span>{x.marriagePerson.idNumber}</span>
                      </div>
                    )
                  })
                }
              </div>
            );
          }
        },
        {
          title: "本宗族成员",
          key: "marriagePerson",
          render: (h, params) => {
            let row = params.row;
            return (
              <div class="sourcePerson">
                {
                  this._l(row.marriagePerson,(x)=>{
                    return (
                      <div on-click={$event => this.handlePersonClick(x.sourcePerson)}>
                        <span>{x.sourcePerson.name}</span>
                        <span>{x.sourcePerson.idNumber}</span>
                      </div>
                    )
                  })
                }
              </div>
            );
          }
        },
      ]
    }
  },
 
  methods: {
    // 路由跳转到对应图谱
    handleDetailClick(item) {
      let routeData = this.$router.resolve({
        path:'/pedigreeDetail',
        query:{
          archiveId:item.archiveId,
          title:item.name,
          mc:'谱系档案'
        }
      })
      window.open(routeData.href, '_blank');
    },
    handlePersonClick(item) {

    },
    // 请求数据
  	getData(){
      this.loading = true;
      comApis.getMarriagemap(this.$route.query.archiveId).then(res=>{
        this.loading = false;
        if(res.code != 200) return;
        this.tableData = res.data;
              // this.tableData = [
        //   {
        //     name: '张三家族',
        //     marriagePerson : [
        //       {
        //         marriagePerson: {
        //           name: 'Li',
        //           idNumber: 123
        //         },
        //         sourcePerson: {
        //           name: '张三',
        //           idNumber: 123
        //         }
        //       }
        //     ]
        //   },
        // ];
        this.$emit('getMarriageRelationNum',this.tableData.length);
      })
    },
  },
  mounted() {
    // 请求数据
    this.getData();
  }
}
</script>
<style lang="less" scoped>
/deep/ th.marriagePersonColor {
  background-color: #e8b9bc;
}
/deep/ td.marriagePersonColor {
  background-color: #f9ebeb;
}
// 表格hover
/deep/ .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td{
background-color:#ebf7ff;
}
/deep/ tr.ivu-table-row-hover td{
background-color: #ebf7ff;
}

/deep/ .ivu-table{
  .ivu-table-row{
    td{
      .ivu-table-cell{
        padding-left: 0;
        padding-right: 0;
        .familys{
          padding-left: 18px;
          padding-right: 18px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
        .marriagePerson,.sourcePerson{
          > div{
            min-width: 0;
            height: 40px;
            box-sizing: border-box;
            text-align: left;
            text-overflow: ellipsis;
            vertical-align: middle;
            line-height: 40px;
            padding: 0 18px;
            > span:first-child{
              margin-right:15px;
            }
            &:not(:first-child){              
              border-top: 1px solid #e8eaec;
            }
          }
        }
      }
    }
  }
}
</style>
