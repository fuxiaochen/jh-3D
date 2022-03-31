<template>
	<div class="security-box">
		<div class="itemGD leak">
			<div class="title">安防设备监测</div>
				<div class="echarts">
				<Monitor />
			</div>
		</div>
		<div class="itemGD danger" style="visibility:hidden">
			<div class="title">应急事件统计</div>
			<div class="echarts">
				<!-- <Emergency /> -->
			</div>
		</div>
		<div class="itemGD contaminants" style="visibility:hidden">
			<div class="title">机台状态</div>
		</div>
	</div>
</template>

<script>
	import Monitor from '../echarts/Monitor/index'
	// import Leak from '../echarts/leak'
	export default {
		name: "security-box",
		components:{
			Monitor
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="stylus" scoped>
.security-box
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
			background-image url("../../../../assets/home/two/13-安防设备监测.png")
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
