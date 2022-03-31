<template>
	<div class="security">
		<div class="itemGD leak">
			<div class="title">应急器材</div>
				<div class="echarts">
				<Monitor />
			</div>
		</div>
		<div class="itemGD danger">
			<div class="title">人员疏散统计</div>
			<div class="echarts">
				<Emergency />
			</div>
		</div>
	</div>
</template>

<script>
	import Monitor from '../echarts/Monitor/index'
	import Emergency from '../echarts/emergency/index'
	export default {
		name: "security",
		components:{
			Monitor,Emergency
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="stylus" scoped>
.security
    display flex
    color #FFFFFF
    width 100%
    height 100%
		.itemGD
			width 100%
			height 232px
			position relative
			.title
				position absolute
				top -14px
				left 25px
				font-size 22px
				font-weight bold
				color #36ECFF

		.leak
			background-image url("../../../../assets/home/fighting/框2.png")
			background-size 100% 100%
			.echarts
				display flex
		.danger
			background-image url("../../../../assets/home/fighting/人员疏散统计.png")
			background-size 100% 100%
			margin-left: 10px


</style>
