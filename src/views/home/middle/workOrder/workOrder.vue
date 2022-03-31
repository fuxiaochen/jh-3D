<template>
	<div class="workOrder-box">
		<div class="itemGD leak">
			<div class="title">特殊工单统计</div>
			<div>
				<Specialorder/>
			</div>
		</div>
		<div class="itemGD danger">
			<div class="title">隐患排查</div>
			<div class="echarts">
				<Risks />
			</div>
		</div>
		<div class="itemGD contaminants">
			<div class="title">消防报警检测</div>
			<div>
				<Firefighting/>
			</div>
		</div>
	</div>
</template>

<script>
	import Specialorder from '../echarts/specialorder/index'
	import Risks from '../echarts/risks/index'
	import Firefighting from '../echarts/firefighting/index'
	export default {
		name: "workOrder-box",
		components:{
			Specialorder,Risks,Firefighting
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="stylus" scoped>
	.workOrder-box
		color #FFFFFF
		width 100%
		height 938px
		.itemGD
			width 100%
			height 283px
			position relative
			.title
				position absolute
				top -14px
				left 25px
				font-size 22px
				font-weight bold
				color #36ECFF

		.leak
			background-image url("../../../../assets/home/middle/特殊工单统计.png")
			background-size: 100% 100%;
			background-repeat no-repeat
			.echarts
				display flex
				.echarts-middle
					width 50%
					height 278px
					/*background:rgba(0, 255, 255,.2)*/
		.danger
			margin 52px 0
			background-image url("../../../../assets/home/middle/安全隐患.png")
			background-size: 100% 100%;
			background-repeat no-repeat
		.contaminants
			background-image url("../../../../assets/home/middle/消防报警监测.png")
			background-size: 100% 100%;
			background-repeat no-repeat

</style>
