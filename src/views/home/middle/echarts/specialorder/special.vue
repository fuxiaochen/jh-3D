<template>
	<div class="my-order2">
		<div id="special" style="width:140px;height:140px"></div>
		<div class="right-list">
			<span class="item" style="background-color: #d34355">未施工: {{orderData.numW}}</span>
			<span class="item" style="background-color: #ff8f40">施工中: {{orderData.numY}}</span>
			<span class="item" style="background-color: #36ecff">已完成: {{orderData.numZ}}</span>
		</div>
	</div>
</template>

<script>
	import * as echarts from "echarts";

	export default {
		name: "special",
		data() {
			return {
				orderData: {
					numW:0,
					numY:0,
					numZ:0
				}
			};
		},
		methods: {
			initData2(data) {
				let myChart2 = echarts.init(document.getElementById("special"));

				let option = {
					title: {
						text: "今日特殊工单总数",
						left: '58',
						y: "center",
						textAlign: 'middle',
						textStyle: {
							fontSize: "12",
							color: "#FFFFFF",
							fontFamily: "MicrosoftYaHei-Bold",
							fontWeight: "Bold",
						},
						subtext: data.numT,
						subtextStyle: {
							fontSize: "14",
							color: "#FFFFFF",
							fontFamily: "MicrosoftYaHei-Bold",
							fontWeight: "Bold",
						},
					},
					legend: {
						show:false,
						orient: "vertical",
						top: "center",
						itemWidth: 0,
						selectedMode:false,
						right: "0",
						data: ["已合规", "未合规"],
						textStyle: {
							color: "#fff",
							fontSize: 14,
							fontWeight: "Bold",
							lineHeight: 24
						},
						formatter: function (name) {
							if (name == "动火") {
								return "未合规" + data.numW;
							} else {
								return "已合规开始作业:" + data.numY + "\n" + "未合规确认:" + data.numW;
							}
						},
					},
					tooltip: {
						trigger: 'item',
						show: true
					},
					series: [
						{
							type: "pie",
							clockWise: true,
							radius: ["75%", "91%"],
							center: ['45%', '50%'],
							z: 1,
							itemStyle: {
								normal: {
									label: {
										show: false,
									},
									labelLine: {
										show: false,
									},
								},
							},
							hoverAnimation: false,
							data: [
								{
									name: "未施工",
									value: data.numW,
									itemStyle: {
										normal: {
											color: "#d34355",
										},
									},
								},
								{
									name: "施工中",
									value: data.numY,
									itemStyle: {
										normal: {
											color: "#ff8f40",
										},
									},
								},
								{
									name: "已完成",
									value: data.numZ,
									itemStyle: {
										normal: {
											color: "#36ecff",
										},
									},
								},
							],
						},
					],
				};
				myChart2.setOption(option);
			},
			getData() {
				this.$http.post("/largeScreen/normalState/order").then((res) => {
					this.initData2(res.data.data);
					this.orderData = res.data.data
				});
			},
		},
		mounted() {
			this.getData();
		},
	};
</script>
<style lang="stylus" scoped>
	.my-order2
		width 240px
		min-height 120px
		display flex
		justify-content space-between
		align-items center
		.right-list
			display flex
			flex-direction column
			justify-content flex-start
			.item
				text-align left
				padding 1px 5px
				font-size 15px
				border-radius 4px
				margin-bottom 10px
</style>






