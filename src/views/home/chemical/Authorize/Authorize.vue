<template>
	<div class="Authorize">
		<div class="itemGD leak">
				<div class="echarts">
				<Automation />
			</div>
		</div>
	</div>
</template>

<script>
	import Emergency from '../echarts/emergency/index'
	// import Leak from '../echarts/leak'
	import Automation from '../echarts/solid/index'
	import Pollutants from '../echarts/pollutants/index'
	export default {
		name: "Authorize",
		components:{
			Automation,Emergency,Pollutants
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="stylus" scoped>
.Authorize
    display flex
    color #FFFFFF
    width 100%
    height 100%
		.itemGD
			width 100%
			height 120px
			position relative
			.title
				position absolute
				top -14px
				left 25px
				font-size 22px
				font-weight bold
				color #36ECFF

		.leak
			background-size 100% 100%
			.echarts
				display flex

</style>
