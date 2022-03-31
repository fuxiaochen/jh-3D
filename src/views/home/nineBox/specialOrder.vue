<template>
	<div class="itemGD leak">
		<div class="title">特殊工单统计</div>
		<div>
			<SpecialOrder :key="reloadIndex"/>
		</div>
	</div>
</template>

<script>
	import SpecialOrder from '../middle/echarts/specialorder/index'

	export default {
		name: "specialOrder",
		components: {
			SpecialOrder
		},
		data() {
			return {
				reloadIndex: 1,
				reloadInterval: null
			}
		},
		mounted() {
			let time = 1000 * 60 * 5;
			this.reloadInterval = setInterval(() => {
				this.reloadIndex = new Date().getTime();
			}, time)
		},
		beforeDestroy() {
			clearInterval(this.reloadInterval)
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
		background-image url("../../../assets/home/middle/特殊工单统计.png")
		background-size: 100% 100%;
		background-repeat no-repeat
		.echarts
			display flex
			.echarts-middle
				width 50%
				height 278px
</style>
