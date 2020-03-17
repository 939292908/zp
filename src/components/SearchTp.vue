<template>
  <div class="index" @click="uploadImg=false;">
    <!-- <div class="itap">
      <span class="name">巴州涉稳重点人员图谱式管理系统</span>
    </div> -->
    <!-- 图片标题 -->
    <div class="div-title" @click="toIndex" style="cursor:pointer;" title="返回主页"><img :src="'./static/images/search/search-tp'+this.$config.project.localSuffix+'.png'"></div>
    <!-- 搜索框 -->
    <div class="wrapper">
      <div class="box">

        <div class="search-box">
          <i-button class="search-default" :disabled="!hasFunAuth(constantFunMap.FUN_SearchTp_Data_ID)" @click="toSearchTpPage">搜索一下</i-button>
          <!-- <span class="search-btn" @click="toSearchTpPage">
            <span>搜索一下</span>
          </span> -->
          <div class="input">
            <!-- <i class="iconfont icon-tianjiazhaopian" @click="uploadImages"></i> -->
            <!-- <i class="iconfont icon-tianjiazhaopian" @click.stop="uploadImg=!uploadImg"></i>
            <i class="iconfont icon-yuyin"></i> -->
            <input type="text" placeholder="请输入查询关键字"  v-model="keyword" @keyup.enter="toSearchTpPage"/>
          </div>
        </div>
      </div>
      <div class="upload-picture" v-show="uploadImg" @click.stop="uploadImg=!uploadImg">
        <ul class="upload-list">
          <li v-for="(item,index) in uploadList" :key="index">
            <span class="img"><i class="iconfont icon-tupian"></i></span>
            <span class="name">{{item.name}}</span>
            <span class="size">{{item.sizes+'KB'}}</span>
            <span class="progress"><Progress :percent="100"></Progress></span>
            <!-- <span @click.native="handleRemove(item)"><i class="iconfont icon-guanbi2fill"></i></span> -->
            <Icon type="md-close-circle" @click.native="handleRemove(item)"></Icon>
          </li>
        </ul>
        <Upload
          ref="upload"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          action="http://10.23.66.142:2489/iTap_OrientService/Vertex/v1/searchByKeyword" type="drag">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击上传文件，或者直接将文件拖到这里</p>
          </div>
        </Upload>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SearchTp',
  components: {},
  data () {
    return {
      uploadImg: false,
      keyword : '',
      uploadList: []
    }
  },
  methods : {
    toIndex () {
      this.$router.push({
        path: '/index',
      });
    },
    uploadImages () {
      this.uploadImg = true;
    },
    switchLanguage (name) {
      //this.$i18n.locale = name;
      //this.$refs.switchView.switchLanguage(name);
    },
    handleBeforeUpload(file) {
        // 创建一个 FileReader 对象
        let reader = new FileReader()
        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
        // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
        // 读取文件作为 URL 可访问地址
        reader.readAsDataURL(file);
        const me = this;
        me.uploadList = [];
        reader.onloadend = function (e) {
            file.url = reader.result;
            //console.log(file.url);
            if (file.name.indexOf('jpg') == -1 && file.name.indexOf('png') == -1) {
              me.uploadList = [];
              return false;
            };
            me.uploadList.push(file);
            for(var i = 0; i < me.uploadList.length; i++){
              let j = me.uploadList[i].size/1024+'';
              let x = (j+'').indexOf(".");
              me.uploadList[i].sizes = j.substring(0,x);
            };
        };
        //console.log(file.url);
    },
    handleRemove(file) {
      this.uploadImg=!this.uploadImg;
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    getViewIndex (index) {
      var me = this;
      me.newsModalShow = false;
      me.appModalShow = false;
      me.personModalShow = false;
      if (index == '0') {
        me.personModalShow = true;
      }else if(index == '1'){
        me.newsModalShow = true;
      }else if(index == '2'){
        me.appModalShow = true;
      }
    },
    toSearchTpPage () {
      var me = this;
      sessionStorage.setItem('keywordTp', this.keyword);
      if (this.uploadList.length) {
        sessionStorage.setItem('name', this.uploadList[0].name);
        sessionStorage.setItem('url', this.uploadList[0].url);
      }else if (this.keyword.length && !this.uploadList.length) {
        sessionStorage.setItem('name', '');
        sessionStorage.setItem('url', '');
      }else if (!this.keyword.length && this.uploadList.length){
        sessionStorage.setItem('keywordTp', '');
      }

      if (!this.keyword.length && !this.uploadList.length) {
        this.$Message.error('请输入查询关键字');
        return false;
      }
      me.$router.push({
        path: '/visualition',
        query: {
          keyword: this.keyword
        }
      });
    },
    // 关键字搜索记录
    getKeyWords () {
      let url = this.path+'HomePageController/v1/addHistoryRecord',me=this;
      let params = new URLSearchParams();
      params.append('params', '{"keyWord": "'+me.keyword+'"}');
      params.append('token', this.token);
      this.$axios.post(url, params)
      .then(response => {
        if (response.data.code != 200) {
          //alert(response.data.msg);
          return false;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  mounted(){

  },
  created() {

  }
}
</script>

<style lang="less" scoped>
  @widthH:100%;
  .post(r){
    position:relative;
  }
  .post(a){
    position:absolute;
  }
  .index{
    width:@widthH;
    height:@widthH;
    .post(a);
    z-index: 999;
    overflow-x: hidden;
    overflow-y: hidden;
    .itap{
      width: 40%;
      height:8.4%;
      left: 50%;
      text-align: center;
      .post(a);
      top: 0;
      z-index: 99;
      background: url(../../static/images/itap-icon.png) 0 0 no-repeat;
      background-size: 100% 100%;
      margin-left: -20%;
      .name{
        // width:194px;
        width:100%;
        height:33px;
        display:inline-block;
        .post(a);
        left:50%;
        top:50%;
        text-align: center;
        margin-left:-50%;
        margin-top:-16.5px;
        font-size: 22px;
        font-weight: normal;
        color:#fff;
        font-family:Adobe Heiti Std R;
        background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;
      }
    }
    .div-title {
      position: relative;
      width:240px;
      height:80px;
      margin: 0 auto;
      /*left:50%;
      margin-left:-50%;*/
      top:100px;
      img{
        width:100%;
      }
    }
    .wrapper{
      width:600px;
      position:absolute;
      left:50%;
      margin-left:-300px;
      top:210px;
      .box{
        width:600px;
        height:74px;

        .search-box{
          width: 100%;
          height: 74px;
        }
        .search-box{
          width: 100%;
          height: 74px;
          position: absolute;
          bottom: 0;
          z-index: 99;
          .search-btn{
            .post(a);
            top:0;
            right:0;
            width:104px;
            height:48px;
            line-height:48px;
            text-align: center;
            cursor: pointer;
            color:#fff;
            margin-top:13px;
            font-size:16px;
            font-weight:bold;
            display:inline-block;
            background:url(../../static/images/search-btn.png) 0 0 no-repeat;
            background-size:100% 100%;
            span{
              background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
              -webkit-background-clip: text;         /* 规定背景的划分区域 */
              -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
            }
          }
          .input{
            .post(a);
            left:0;
            right:96px;
            .iconfont{
              font-size:20px;
              color:#b7deff;
              cursor:pointer;
              text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
            }
            i:nth-child(1){
              .post(a);
              right:55px;
              top:22px;
            }
            i:nth-child(2){
              .post(a);
              right:25px;
              top:20px;
            }
            input{
              width:100%;
              padding:0 90px 0 30px;
              height:74px;
              line-height:74px;
              // text-indent: 30px;
              outline: none;
              border:none;
              font-size:16px;
              color:#fff;
              background:url(../../static/images/input.png) 0 0 no-repeat;
              background-size:100% 100%;
            }
            input::-webkit-input-placeholder{
              color:rgba(255,255,255,.5);
            }
          }
        }
      }
      .upload-picture{
        .post(a);
        left:10px;
        right:0;
        top:62px;
        z-index:99;
        background-color: rgba(2, 18, 58, 0.45);
        box-shadow: 0px 5px 14px 0px
          #011435;
        .upload-list{
          li{
            color: #44b6ff;
            .img{
              margin: 0 10px 0 10px;
              position: relative;
              top: 3px;
              .iconfont{
                font-size:20px;
              }
            }
            .name{
              display: inline-block;
              line-height: 24px;
            }
            .size{
              position: relative;
              top: 1px;
              margin: 0 20px;
            }
            .progress{
              display:inline-block;
              width:200px;
              height:30px;
            }
            .ivu-icon{
              font-size:17px;
              cursor: pointer;
              position: relative;
              top: 1px;
            }
          }
        }
      }
    }
  }
  .search-default{
    .post(a);
    top:0;
    right:0;
    width:104px;
    height:48px;
    text-align: center;
    cursor: pointer;
    color:#fff; 
    border-radius: 0;
    border: none;
    background:url(../../static/images/search-btn.png) 0 0 no-repeat;
    background-size:100% 100%;
    margin-top: 13px;
    /deep/ span{
      font-size:16px;
      font-weight:bold;      
      background: -webkit-linear-gradient(top, #fff , #74c2ff);     /* 背景色渐变 */
      -webkit-background-clip: text;         /* 规定背景的划分区域 */
      -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
    }
  }
</style>

<style lang="less">
  // 上传图片组件css
  .upload-picture{
    .ivu-upload{
      .ivu-upload-drag{
        border:1px solid rgba(0,0,0,0);
        background: none;
        color: #44b6ff;
        font-size:14px;
      }
      .ivu-upload-list{
        li{
          color: #44b6ff;
          font-size:12px;
          i{
            color: #44b6ff;
            font-size:14px;
          }
        }
        .ivu-upload-list-file{}
      }
    }
  }
</style>
