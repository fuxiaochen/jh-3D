<template>
	<div class="GD-box">
		<div class="itemGD leak">
			<div class="title">GD/LEAK</div>
			<div class="echarts">
				<div class="echarts-left">
					<GdEcharts />
				</div>
				<div class="echarts-left">
					<Leak />
				</div>
			</div>
		</div>
		<div class="itemGD danger">
			<div class="title">危废/危化品统计</div>
			<div class="echarts">
				<Solid />
			</div>
		</div>
		<div class="itemGD contaminants">
			<div class="title">污染物排放</div>
			<div>
				<Pollutants/>
			</div>
		</div>
	</div>
</template>

<script>
	import GdEcharts from '../echarts/gd'
	import Leak from '../echarts/leak'
	import Solid from '../echarts/solid/index'
	import Pollutants from '../echarts/pollutants/index'
	export default {
		name: "GD",
		components:{
			GdEcharts,Leak,Solid,Pollutants
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="stylus" scoped>
	.GD-box
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
			background-image url("../../../../assets/home/left/GD-kuang.png")
			.echarts
				display flex
				.echarts-left
					width 50%
					height 278px
					/*background:rgba(0, 255, 255,.2)*/
		.danger
			margin 52px 0
			background-image url("../../../../assets/home/left/weihua-kuang.png")
		.contaminants
			background-image url("../../../../assets/home/left/wuran-kuang.png")

</style>
