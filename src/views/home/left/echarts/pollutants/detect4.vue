<template>
	<div id="detect4" style="width:86px;height:86px"></div>
</template>

<script>
	import * as echarts from "echarts";

	export default {
		name: "detect4",
		props:['detectValue'],
		data() {
			return {
				data: 90,
			};
		},
		methods: {
			initData2(aaa) {
				let myChart2 = echarts.init(document.getElementById("detect4"));
				let option = {
					title: [
						{
							text: aaa+'\n'+'mg/m3',
							x: "center",
							top: "30%",
							textStyle: {
								fontSize: "14",
								color: "#FFFFFF",
								fontFamily: "MicrosoftYaHei-Bold",
								foontWeight: "Bold",
							},
						},
					],
					polar: {
						radius: ["99%", "88%"],
						center: ["50%", "50%"],
					},
					angleAxis: {
						max: 100,
						show: false,
					},
					radiusAxis: {
						type: "category",
						show: true,
						axisLabel: {
							show: false,
						},
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
					},
					series: [
						{
							name: "",
							type: "bar",
							roundCap: true,
							barWidth: 110,
							showBackground: true,
							backgroundStyle: {
								color: "#36ECFF",
							},
							data: [aaa],
							coordinateSystem: "polar",
							itemStyle: {
								normal: {
									color: "#0C333A",
								},
							},
						},
						{
							name: "",
							type: "pie",
							startAngle: 80,
							radius: ["75%"],
							hoverAnimation: false,
							center: ["50%", "50%"],
							itemStyle: {
								color: "rgba(66, 66, 66, .1)",
								borderWidth: 1,
								borderColor: "#3D5E83",
							},
							data: [100],
						},
					],
				};
				myChart2.setOption(option);
			},
		},
		watch: {
			detectValue(newV,oldV) {
				this.initData2(newV);
			}
		},
		mounted() {
			this.initData2(this.detectValue);
		}
	};
</script>






