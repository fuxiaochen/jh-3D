<template>
	<div class="itemGD danger">
		<div class="title">应急事件统计</div>
		<div class="echarts">
			<Emergency />
		</div>
	</div>
</template>

<script>
	import Emergency from '../two/echarts/emergency/index'
	export default {
		name: "emergency",
		components:{
			Emergency
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
	.danger
		background-image url("../../../assets/home/two/11-应急事件统计.png")
		background-size 100% 100%
</style>
