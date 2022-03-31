<template>
	<div class="identify-box">
		<div class="itemIdentify AI"></div>
		<div class="itemIdentify face"></div>
		<div class="itemIdentify ERT"></div>
	</div>
</template>

<script>
	export default {
		name: "identify"
	}
</script>

<style lang="stylus" scoped>
	.identify-box
		color #FFFFFF
		width 100%
		height 938px
		.itemIdentify
			width 100%
			height 278px
		.AI
			background rgba(0, 255, 255,.1)
		.face
			margin 52px 0
			background rgba(0, 255, 255,.2)
		.ERT
			background rgba(0, 255, 255,.3)

</style>

