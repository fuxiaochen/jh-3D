<template>
	<div :class="!getStranger?'itemGD flash-before':'itemGD flash-after'">
		<div class="title">污染物监测报警</div>
		<div>
			<Pollutants :key="freshTimes"/>
		</div>
	</div>
</template>

<script>
	import Pollutants from '../left/echarts/pollutants/index'

	export default {
		name: "pollutants",
		data() {
			return {
				getStranger: false,
				freshTimes: 1,
				timer: null
			}
		},
		components: {
			Pollutants
		},
		mounted() {
			this.timer = setInterval(() => {
				this.freshTimes = new Date().getTime();
			}, 60000)
		},
		beforeDestroy() {
			clearInterval(this.timer)
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

	.flash-before
		background-image url("../../../assets/home/left/wuran-kuang.png")

	.flash-after
		background-image url("../../../assets/home/middle/flash.gif")
</style>
