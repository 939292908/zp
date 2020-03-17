<template>
  <div class="modal">
  	<div class="head">
  		<span class="title">添加实体</span>
  		<span></span>
  	</div>
  	<div class="content">
  		<ul>
  			<li class="stzj">
  				<span>实体主键</span>
  				<textarea name=""></textarea>
  			</li>
  			<li>
  				<span>实体类型</span>
  				<input type="text">
  			</li>
  			<li>
  				<span>实体属性1</span>
  				<input type="text">
  			</li>
  			<li>
  				<span>实体属性2</span>
  				<input type="text">
  			</li>
  			<li>
  				<span>实体属性3</span>
  				<input type="text">
  			</li>
  		</ul>
  		<div class="btn">
  			<span>取消</span>
  			<span>确定</span>
  		</div>
  		<div class="icon">
  			
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {

    }
  },
  methods : {

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
	.modal{
		width:377px;
		.post(a);
		right:5px;
		top:14px;
		.head{
			width:100%;
			height:46px;
			line-height:46px;
			background-image: linear-gradient(180deg, rgba(10, 53, 167, 0.95) 0%, rgba(4, 33, 110, 0.95) 100%), linear-gradient(#ffffff, #ffffff);
		  background-blend-mode: normal, normal;
			border-bottom:1px solid #163da8;
			.title{
				font-size:16px;
				color:#fff;
				margin-left:17px;
			}
		}
		.content{
			padding:12px 13px 26px 16px;
			position:relative;
			background: #102763 url(../../../static/images/grid.png) 0 0 repeat;
			ul{
				margin-bottom:20px;
				li{
					overflow:hidden;
					margin-bottom:10px;
					span{
						display:inline-block;
						width:69px;
						color: #3a8bbf;
						float:left;
					}
					input{
						color: #5cb9ff;
						text-indent: 6px;
						width:277px;
						height:30px;
						line-height:30px;
						border:1px solid #1f3b87;
						background:#061339;
					}
				}
				.stzj{
					margin-bottom:11px; 
					textarea{
						width:277px;
						height:90px;
						border:1px solid #1f3b87;
						background:#061339;
						color: #5cb9ff;
						text-indent: 6px;
						resize:none;
					}
				}
			}
			.btn{
				width:100%;
				height:42px;
				overflow:hidden;
				span{
					width:99px;
					line-height:42px;
					height:42px;
					text-align: center;
					float:right;
					color: #bce2ff;
					font-size: 14px;
					cursor:pointer;
					background:url(../../../static/images/modal-btn.png) 0 0 no-repeat;
				}
				span:nth-child(1){
					margin-left:7px;
				}
			}
			.icon{
				width:198px;
				height:6px;
				position:absolute;
				bottom:0;
				left:50%;
				margin-left:-99px;
				//background:#fff;
				border-width:0 5px 6px 5px;
        border-style:none solid solid;
        border-color:transparent transparent #fff;   
			}
		}
	}
</style>
