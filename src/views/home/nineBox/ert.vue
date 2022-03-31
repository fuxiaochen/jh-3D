<template>
	<div class="itemGD contaminants">
		<div class="title">ERT组织成员表</div>
		<div>
			<Organization/>
		</div>
	</div>
</template>

<script>
	import Organization from '../middle/echarts/organization/index'
	export default {
		name: "ert",
		components:{
			Organization
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
		background-image: url("../../../assets/home/middle/ERT组织成员表.png");
		background-repeat no-repeat
</style>
