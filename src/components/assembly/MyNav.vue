<template>
  <div class="app-list my-nav" @click.stop="ifCloseAppListShow">
    <div class="app-sidebar tarbar">
      <div class="sidebar-top">
        <div class="polygon"></div>  
      </div>
      <div class="close-btn" @click="closemyNavModal"></div>
      <div class="sidebar-bottom">
        <div class="polygon"></div>  
      </div>
    </div>
    <div class="cont-box">
      <!-- 头部 -->
      <div class="nav-title">
        我的导航
        <Icon @click="closemyNavModal" class="close-nav" type="md-close" />
      </div>
      <!-- 按钮 -->
      <div class="nav-btn">
        <span v-if="statusList.modalType!='editor'" @click="isShowModal(false,'editor')">
          <Icon type="md-create" />
          编辑
        </span>
        <span v-if="statusList.modalType!='editor'" @click="isShowModal(true,'add')">
          <Icon class="showAdd-btn" type="md-attach" />
          添加
        </span>
        <span v-if="statusList.modalType=='editor'" @click="isShowModal(false,'')">
          <Icon type="md-checkbox-outline" />
          保存
        </span>
      </div>
      <!-- 提示：无权限(隐藏) -->
      <div v-if="!(hasPageAuth(constantPageMap.PAGE_Search_ID) 
              || hasPageAuth(constantPageMap.PAGE_SearchTp_ID)
              || hasPageAuth(constantPageMap.PAGE_OverlapTp_ID)
              || hasPageAuth(constantPageMap.PAGE_Join_ID)
              || hasPageAuth(constantPageMap.PAGE_MultiJoin_ID)
              || hasPageAuth(constantPageMap.PAGE_Archives_ID)
              || hasPageAuth(constantPageMap.PAGE_Collect_Old_ID)
              || hasPageAuth(constantPageMap.PAGE_Collect_ID)
              || hasManCenterAuth())" 
            style="padding:20px;text-align:center;">暂无可访问的应用</div>
      <!-- 导航列表 -->
      <ul class="linkList">
        <li v-for="(item,index) in dataList" :key="item.id">
          <!-- 编辑 -->
          <div v-if="statusList.modalType=='editor'" @click="toEditor(item)" :class="{editorType:item.id==statusList.editorId,editorItem:true}">
            {{ item.name }}
            <div class="delete-btn" @click.stop="deleteItem(item.id)">
              <Icon type="md-close" />
            </div>
          </div>
          <!-- 正常 -->
          <a v-if="statusList.modalType!='editor'" :href="isHttp(item.src)" target="_BLANK">{{ item.name }}</a>
          <!-- <div v-if="statusList.modalType!='editor'" @click="toOpen(item.src)">{{ item.name }}</div> -->
        </li>
      </ul>
    </div>
        <!-- 我的导航(添加框) -->
    <myNavAdd 
      ref="myNavAdd"
      v-show="statusList.showModal" 
      :statusList="statusList" 
      :itemData="itemData"
      @isShowModal="isShowModal" 
      @getDataList="getDataList">
    </myNavAdd>
  </div>
</template>

<script>
import myNavAdd from '@/components/assembly/MyNavAdd'
import * as comApis from '@/api/common.js'

export default {
  name: 'myNav',
  components: { myNavAdd },
  data () {
    return {
      //appDataList: this.modal
      token : '',
      path: this.$config.home,
      dataList: [],
      itemData: {},
      statusList: {
        showModal: false, //弹框状态
        modalType: '', //类型(editor编辑/add添加)
        editorId:'-1', //谁处于编辑状态
      }
    }
  },
  created(){
    // 获取数据
    // this.getDataList();
  },
  watch:{
    '$route'(to, from) {
      //to.path == '/' || to.path == '/search'? this.bgImg = false : this.bgImg = true;
    }
  },
  methods : {
    // 获取数据
    // getAppData () {
    //   var me = this;
    //   var url = me.path+'HomePageController/v1/getToolsList';
    //   var params = new URLSearchParams();
    //   params.append('token', me.token);
    //   this.$axios.post(url,params).then((response)=>{
    //     if (response.data.code == 200) {
    //       me.appModalData = response.data.data;
    //       console.log(me.appModalData)
    //     }else{
    //       console.log(response.data.message);
    //     }
    //   }).catch((response)=>{
    //     console.log(response);
    //   })
    // },
    // toOpen(link) {
    //   console.log(link);
      
    //   window.open(link,"_BLANK")
    // },
    // 改AppHeader组件中状态 关闭自己
    closemyNavModal () {
      this.$emit('closemyNavModal', false); // 关闭myNav
      this.isShowModal(false,''); // 关闭myNavAdd
    },
    // 开关 + 改功能 MyNavAdd组件 
    // isShow：显示/隐藏(弹框),
    // type：add/editor(弹框功能)
    isShowModal (isShow,type) {
      this.$refs["myNavAdd"].resetFormDate(); // 重置
      this.statusList.showModal = isShow;
      this.statusList.modalType = type;
      
    },
    // 获取数据
    getDataList() {
      comApis.getMyNavList().then(response => {
        let me = this;
        if(response.code == 200){
          console.log('请求了导航列表数据！');
          console.log(response);
          // 过滤一下数据
          let data = response.data.filter(item => item.name && item.src);
          this.dataList = data;
        // let data = [
        //   { id: 1, name: "百度", src: "https://www.baidu.com", sort:1 },
        //   { id: 2, name: "谷歌", src: "www.google.com", sort:2 },
        //   { id: 3, name: "iView", src: "https://www.iviewui.com", sort:3 },
        // ];
        //   this.dataList = data;
        }      
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 用于子组件MyNavAdd，传数据来更新列表
    // updateList(data) {
    //   data.sort((a, b) => b.sort - a.sort); // 根据sort排序
    //   this.dataList = data;
    // },
    // item 展示在form
    toEditor (item) {
      // 1.高亮颜色
      this.statusList.editorId = item.id;
      // 2.item 展示在form
      item = JSON.parse(JSON.stringify(item)); // 1.确保点击相同编辑对象能触发子组件中watch，2.且编辑时不影响item展示
      this.itemData = item; // 父传子，子监听props，进行赋值
      // 3.显示编辑框 
      this.isShowModal(true,'editor');
    },
    // 删除 item
    deleteItem(id) {
      console.log(id);
      let naviIDs = id;
      comApis.delMyNavItem(naviIDs).then(response => {
        let me = this;
        if(response.code == 200){
          this.getDataList();
          this.isShowModal(false,'editor'); // 关闭
          this.$refs["myNavAdd"].resetFormDate(); // 重置
          this.$Message.success("删除成功！");
        } else {
           this.$Message.warning("删除失败！");
        }   
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 输入的链接 是否携带 Https
    isHttp(link) {
      console.log(link);
      if (link.indexOf("http") != -1) {
        return link;
      } else {
        return "http://" + link;
      }
    },



    ifCloseAppListShow (evt) {
      if (evt.target.className == 'close-btn') {
        return false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .post(a){
    position:absolute;
  }
  .app-list{
    width:383px;
    border: 2px solid #183a8e;
    background: rgba(4,28,91,.99);
    // .post(a);
    position: fixed;
    right:0;
    top:49px;
    // bottom:15px;
    bottom: 0;
    z-index: 999988;
    border-left:none;
    .app-sidebar{
      width: 17px;
      .post(a);
      top: 0;
      bottom: 0;
      left: -17px;
      .sidebar-top{
        .post(a);
        width: 9px;
        height:28.6%;
        top: 0;
        right: 1px;

        .polygon{
          .post(a);
          bottom:43px;
          top:0;
          left:0;
          right:0;
          width:0;
          border-right:10px solid rgba(4,28,91,.99);
          border-top:0px solid transparent;
          border-bottom:10px solid transparent;
        }
      }
      .sidebar-bottom{
        .post(a);
        width: 9px;
        top:71.9%; 
        height: 28.1%; 
        bottom: 0;
        right: 1px;
        .polygon{
          .post(a);
          top:40px;
          left:0;
          right:0;
          bottom:0;
          width:0;
          border-right:10px solid rgba(4,28,91,.99);
          border-top:10px solid transparent;
          border-bottom:0px solid transparent;
        } 
      }
      .close-btn{
        position: absolute;
        top: 28.6%;
        left: 0;
        width: 17px;
        height: 43.3%; 
        z-index: 99;
        cursor: pointer;
        background: url("../../../static/images/app/sidebar-center.png") 0 0 no-repeat;
        background-size: 100% 100%;
      }
    }
    // 内容样式
    .cont-box{
      height: 100%;
      overflow-y: auto;
      .nav-title {
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        color: #fff;
        padding-left: 16px;
        cursor: default;
        background:linear-gradient(180deg,rgba(10,53,167,0.95),rgba(4,33,110,0.95));
        border-bottom: 1px solid rgba(22,61,168,1);
        .close-nav {
          font-size: 24px;
          float: right;
          line-height: 44px;
          padding-right: 4px;
          cursor: pointer;
        }
      }
      .nav-btn {
        font-size: 14px;
        color: #fff;
        overflow: hidden;
        padding: 10px 0;
        span {
          float: right;
          margin-right: 20px;
          cursor: pointer;
          i {
            color:rgba(92,185,255,1);
          }
          .showAdd-btn{
            transform: rotate(45deg);
          }
        }
      }
      .linkList {
        overflow: hidden;
        padding-left: 30px;
        padding-top: 10px;
        li {
          float: left;
          margin-right: 16px;
          margin-bottom: 14px;
          font-size: 16px;
          background:rgba(58,192,255,0.4);
          border-radius: 2px;
          a {
            display: block;
            padding: 2px 14px;
            color: #fff;
          }
          .editorItem {
            padding: 2px 14px;
            color: #fff;
            cursor: pointer;
            position: relative;
            .delete-btn {
              position: absolute;
              border-radius: 50%;
              background-color: rgba(255,255,255,.7);
              width: 12px;
              height: 12px;
              right: -6px;
              top: -6px;
              font-size: 12px;
              line-height: 10px;
              color: #000;
            }
          }

          .editorType {
            background-color: rgba(255,255,255,0.3);
            font-weight: 600;
            color: #000;
          }
        }
      }
    }
  }
</style>

<style>
  .cont-box::-webkit-scrollbar{width:6px;height:6px;}
  .cont-box::-webkit-scrollbar-track{border-radius:5px;background:none;}
  .cont-box::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
  .cont-box::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
  .cont-box::-webkit-scrollbar-corner{background-color:#dadada;}
</style>
