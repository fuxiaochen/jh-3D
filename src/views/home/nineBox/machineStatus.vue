<template>
	<div class="itemGD contaminants">
		<div class="title">机台状态</div>
		<div>
			<Pollutants/>
		</div>
	</div>
</template>

<script>
	import Pollutants from '../two/echarts/pollutants/index'
	export default {
		name: "machineStatus",
		components:{
			Pollutants
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
	.contaminants
		background-image url("../../../assets/home/two/12-机台状态.png")
		background-size 100% 100%
</style>
