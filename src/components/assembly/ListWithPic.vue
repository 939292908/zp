<template>
	<div>
	  <div class="entity">
			<p class="title">{{ $t('message.relation.entity') }}</p>
			<span class="entity-icon"></span>
			<div class="entity-list scrollbar">
				<ul @click="getEntity">
					<li v-for="(item,index) in modal" :key="index" :data-index = "index" :class="{li : true, cur : !item.isChecked}">
						<i :class="'iconfont '+item.icon"></i>
						<p>{{ item.type +'(' + item.count + ')' }}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'ListWithPic',
  props: {
    modal:Array,
    graph : Object
  },
  data () {
    return {
   
    }
  },
  methods : {
  	getEntity (e) {  //实体选取
  		console.log(e,'e')
			e.stopPropagation();
			let target = e.target;
			let tagName = target.tagName.toLowerCase();
			if (['i', 'p'].indexOf(tagName) != -1) {
				target = target.parentNode;
			}
			this.modal[target.dataset.index].isChecked = !this.modal[target.dataset.index].isChecked;
			this.$forceUpdate();
			let condition =  this.modal.filter(ele=>ele.isChecked);
			this.changeCondition(condition,this.modal[target.dataset.index].isChecked);
		},
		changeCondition(condition,type){
			this.$parent.qParams.nodeNames = condition.map(ele=>ele.name);
			this.$parent.queryByCondition(type);
		}
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
	.entity{
		.post(r);
		padding-left:9px;
		height:317px;
		border-bottom:1px solid #183e85;
		.title{
			color: #3aa8fb;
			font-size: 14px;
			margin-bottom:10px;
		}
		.entity-icon{
			width:6px;
			height:3px;
			background:#55a9f8;
			display:inline-block;
			.post(a);
			right:0;
			bottom:-2px;
		}
		.entity-list{
			// height:241px;
			height:246px;
			overflow:hidden;
			overflow-y:auto;
			ul{
				li{
					width: 107px;
					height: 77px;
					text-align: center;
					cursor: pointer;
					background-color: rgba(27, 155, 237, 0.1);
					border: solid 1px rgba(37, 82, 176, 0.5);
					float:left;
					margin:0 5px 5px 0;
					// img{
					// 	margin:13px 0 3px;
					// }
					.iconfont{
						font-size:30px;
						color:#0099fc;
					}
					p{
						overflow:hidden;
				    text-overflow:ellipsis;
				    white-space:nowrap
					}
				}
				.cur{
			  	color:#fff;
			  	background-color: rgba(58, 192, 255, 0.4) !important;
				  border: solid 1px rgba(101, 176, 247, 0.6) !important;
			  }
			}
		}
	}
</style>
