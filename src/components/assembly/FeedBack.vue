<template>
	<div class="feedback">
		<h2>意见反馈</h2>
		<span class="close-feedback" @click="closeFeedbackModal"><i class="iconfont icon-guanbi1"></i></span>
		<div class="input-box">
			<textarea name="" id="" cols="30" rows="10" placeholder="填写反馈内容" maxlength="400" v-model="fknr"></textarea>
			<span>400字以内</span>
		</div>
		<input type="button" value="提交反馈" @click="submitFeedback"/>
	</div>
</template>

<script>
	export default {
		name: 'feedback',
  	//props: ['name'],
  	data () {
  		return {
  			fknr: '',
  			token: '',
  			path: this.$config.home
  		}
  	},
  	methods: {
  		closeFeedbackModal () {
  			this.$emit('closeFeedbackModal', false);
  		},
  		submitFeedback () {
  			var me = this;
  			me.$emit('initFeedMessage');
  		// 	if (!me.fknr.length) {
	   //      me.$Message.error('请输入要填写的内容！');
	   //      return false;
	   //    }
	   //    var url = me.path+'HomePageController/v1/feedbackQuestion';
			 //  var params = new URLSearchParams();
				// params.append('params', '{"feedbackContent":"'+me.fknr+'"}');
	   //    params.append('token', this.token);
			 //  this.$axios.post(url,params).then((response)=>{
	   //      if (response.data.code != 200) {
	   //      	return false;
			 //  	};
			 //  	me.$Message.success('反馈成功 ！');
			 //  	me.closeFeedbackModal();
			 //  	me.$emit('initFeedMessage');
	   //    }).catch((response)=>{
	   //      console.log(response);
	   //    })
  		}
  	}
	}
</script>

<style lang="less" scoped>
	.feedback{
		width:597px;
		height:259px;
		position:absolute;
		right:13px;
		bottom:4px;
		z-index:999999;
		background:url(../../../static/images/feedback-bg.png) 0 0 no-repeat;
		h2{
			font-size: 16px;
			color:#8ebeef;
			margin:10px 0 12px 27px;
		}
		.close-feedback{
			position:absolute;
			right:15px;
			top:6px;
			cursor:pointer;
			i{
				color:#fff;
				font-size: 18px;
			}
		}
		.input-box{
			width:575px;
			padding:5px;
			height:159px;
			position:relative;
			margin:0 auto 4px;
			background:url(../../../static/images/feedback-textarea.png) 0 0 no-repeat;
			background-size:100% 100%;
			textarea{
				width:100%;
				height:115px !important;
				padding:10px 20px;
				border:none;
				resize: none;
				outline: none;
				color:#526693;
				font-size:14px;
				background:rgba(0,0,0,0);
			}
			span{
				display:inline-block;
				height:30px;
				line-height:30px;
				background:#7e9fd1;
				color:#526693;
				font-size:14px;
				position:absolute;
				bottom:6px;
				left:6px;
				right:6px;
				text-align: right;
				padding-right:10px;
			}
		}
		input{
			width:129px;
			height:42px;
			display:block;
			line-height:42px;
			font-size:14px;
			color:#bce2ff;
			background:url(../../../static/images/modal-btn.png) 0 0 no-repeat;
			background-size:100% 100%;
			outline: none;
			border:none;
			text-align: center;
			cursor: pointer;
			margin:0 auto;
		}
	}
</style>

<style>
	textarea::-webkit-scrollbar{width:6px;height:6px;}
	textarea::-webkit-scrollbar-track{border-radius:5px;background:none;}
	textarea::-webkit-scrollbar-thumb{background-color:rgba(32,76,157,1);border-radius:5px;}
	textarea::-webkit-scrollbar-thumb:hover{background-color:rgba(45,183,245,1);}
	textarea::-webkit-scrollbar-corner{background-color:#dadada;}
</style>

