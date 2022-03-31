<template>
	<div class="itemGD contaminants">
		<div class="title">消防报警检测</div>
		<div>
			<fireFighting/>
		</div>
	</div>
</template>

<script>
	import fireFighting from '../middle/echarts/firefighting/index'
	export default {
		name: "fireAlarm",
		components:{
			fireFighting
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
		background-image url("../../../assets/home/middle/消防报警监测.png")
		background-size: 100% 100%;
		background-repeat no-repeat
</style>
