<template>
	<div>
	  <div class="relationship">
			<p class="title">{{ $t('message.relation.relationship') }}</p>
			<div class="relationship-list scrollbar">
				<ul @click="getRelationship">
					<li v-for="(item,index) in modal" :key="index" :class="{li:true, cur : !item.isChecked}" :data-index="index">{{ item.type + '(' + item.count + ')'}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'ListNopic',
  props: {
    modal:Array
  },
  data () {
    return {
   
    }
  },
  created(){
  	this.$i18n.locale='ch';
  },
  methods : {
  	getRelationship (e) {  //关系选取
  		e.stopPropagation();
			let target = e.target;
			let tagName = target.tagName.toLowerCase();
			if (['img', 'p'].indexOf(tagName) != -1) {
				target = target.parentNode;
			}
			this.modal[target.dataset.index].isChecked = !this.modal[target.dataset.index].isChecked;
			this.$forceUpdate();
			let condition =  this.modal.filter(ele=>ele.isChecked);
			this.changeCondition(condition);
		},
		changeCondition(condition){
			this.$parent.qParams.linkNames = condition.map(ele=>ele.name);
			this.$parent.queryByCondition();
		}
  }
}
</script>

<style lang="less" scoped>
	.relationship{
		padding-left:9px;
		.title{
			color: #3aa8fb;
			font-size: 14px;
			margin:7px 0 6px;
		}
		.relationship-list{
			min-height:160px;
			overflow-y:auto;
			ul{
				overflow:hidden;
				li{
					width: 107px;
					height: 36px;
					line-height: 36px;
					text-indent: 18px;
					cursor: pointer;
					float:left;
					margin:0 5px 4px 0;
					background-color: rgba(27, 155, 237, 0.1);
					border: solid 1px rgba(37, 82, 176, 0.5);
					overflow:hidden;
			    text-overflow:ellipsis;
			    white-space:nowrap
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
