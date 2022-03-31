<template>
	<div class="itemGD leak">
		<div class="title">安防设备监测</div>
		<div class="echarts">
			<Monitor />
		</div>
	</div>
</template>

<script>
	import Monitor from '../two/echarts/Monitor/index'
	export default {
		name: "safetyWatch",
		components:{
			Monitor
		}
	}
</script>

<style lang="stylus" scoped>
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
		background-image url("../../../assets/home/two/13-安防设备监测.png")
		background-size 100% 100%
		.echarts
			display flex
</style>
