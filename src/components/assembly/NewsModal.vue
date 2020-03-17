<template>
	<div class="newsModal">
		<div class="modal-top">
			
		</div>
		<ul @click="openMessageDetails">
			<li>
				<i class="iconfont icon-xiaoxi"></i>
				<span>通知消息</span>
			</li>
			<li>
				<i class="iconfont icon-gengxin"></i>
				<span>更新消息</span>
			</li>
			<li>
				<i class="iconfont icon-fankuixinxi"></i>
				<span>反馈消息</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'newsModal',
  	props : ['modal'],
		data () {
			return {

			}
		},
		methods: {
			openMessageDetails (evt) {
				evt.stopPropagation();
				var obj = evt.target.tagName.toLocaleLowerCase() == 'li' ? evt.target : evt.target.parentNode;
				var indexList = evt.target.tagName.toLocaleLowerCase() == 'li' ? evt.target.parentNode.children : evt.target.parentNode.parentNode.children;
				var targetIndex = this.tabIndex(obj,indexList);
				//console.log(targetIndex)
				this.$emit('openNewsModal', targetIndex);
			},
			tabIndex(obj,nodeList){
        for(let i=0;i<nodeList.length;i++){
          if(obj===nodeList[i]){
            return i;
          }
        }
      }
		}
	}
</script>

<style lang="less" scoped>
	.post(a){
  	position:absolute;
  }
	.newsModal{
		width:134px;
		height:186px;
		.post(a);
		right:175px;
		top:50px;
		z-index:99998;
		background-color: #17337f;
	  box-shadow: 0px 0px 10px 0px rgba(36, 106, 172, 0.75);
	  border: solid 1px #256cb0;
	  .modal-top{
	  	width:70px;
	  	height:6px;
	  	.post(a);
	  	top:-1px;
	  	left:50%;
	  	margin-left:-35px;
	  	background:url(../../../static/images/person-modal-top.png) 0 0 no-repeat;
	  }
	  ul{
	  	li{
	  		height: 33px;
	  		line-height: 33px;
	  		overflow:hidden; 
        text-overflow:ellipsis; 
        white-space:nowrap;
	  		i{
	  			margin: 0 15px;
	  			color: #9ca6c1;
	  		}
	  		span{
	  			color: #fff;
	  			font-size: 14px;
	  		}
	  	}
	  	li:nth-child(1){
	  		margin-top:10px;
	  	}
	  	li:hover{
	  		cursor: pointer;
	  		background: #264496;
	  	}
	  }
	}
	@media screen and (max-width: 1620px){
		.newsModal{
			right:91px;
		}
	}
</style>