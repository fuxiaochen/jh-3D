<template>
	<div class="itemGD leak">
		<div class="title">自动化授权</div>
		<div class="echarts">
			<Automation />
		</div>
	</div>
</template>

<script>
	import Automation from '../two/echarts/solid/index'
	export default {
		name: "autoPermission",
		components:{
			Automation
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
		background-image url("../../../assets/home/two/10-自动化授权.png")
		background-size 100% 100%
		.echarts
			display flex
</style>
