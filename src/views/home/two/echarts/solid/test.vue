<template>
	<div>
		{{title}}
	</div>
</template>

<script>
	export default {
		name: "test",
		props:['title'],
		mounted() {
			console.log(this.title)
		}
	}
</script>

<style scoped>

</style>
