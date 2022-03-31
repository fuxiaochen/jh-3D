<template>
	<div class="itemGD danger">
		<div class="title">隐患排查</div>
		<div class="echarts">
			<Risks />
		</div>
	</div>
</template>

<script>
	import Risks from '../middle/echarts/risks/index'
	export default {
		name: "safetyRisk",
		components:{
			Risks
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
		background-image url("../../../assets/home/middle/安全隐患.png")
		background-size: 100% 100%;
		background-repeat no-repeat
</style>
