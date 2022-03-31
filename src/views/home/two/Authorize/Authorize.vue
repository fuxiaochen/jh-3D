<template>
	<div class="Authorize">
		<div class="itemGD leak">
			<div class="title">自动化授权</div>
				<div class="echarts">
				<Automation />
			</div>
		</div>
		<div class="itemGD danger">
			<div class="title">应急事件统计</div>
			<div class="echarts">
				<Emergency />
			</div>
		</div>
		<div class="itemGD contaminants">
			<div class="title">机台状态</div>
			<div>
				<Pollutants/>
			</div>
		</div>
	</div>
</template>

<script>
	import Emergency from '../echarts/emergency/index'
	// import Leak from '../echarts/leak'
	import Automation from '../echarts/solid/index'
	import Pollutants from '../echarts/pollutants/index'
	export default {
		name: "Authorize",
		components:{
			Automation,Emergency,Pollutants
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="stylus" scoped>
.Authorize
    display flex
    color #FFFFFF
    width 100%
    height 100%
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
			background-image url("../../../../assets/home/two/10-自动化授权.png")
			background-size 100% 100%
			.echarts
				display flex
		.danger
			background-image url("../../../../assets/home/two/11-应急事件统计.png")
			background-size 100% 100%
			margin 0 20px
		.contaminants
			background-image url("../../../../assets/home/two/12-机台状态.png")
			background-size 100% 100%

</style>
