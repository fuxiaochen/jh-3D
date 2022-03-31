<template>
	<div class="itemGD danger">
		<div class="title">危废/危化品统计</div>
		<div class="echarts">
			<Solid />
		</div>
	</div>
</template>

<script>
	import Solid from '../left/echarts/solid/index'
	export default {
		name: "dangerProduct",
		components:{
			Solid
		},
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
	.danger
		background-image url("../../../assets/home/left/weihua-kuang.png")
</style>
