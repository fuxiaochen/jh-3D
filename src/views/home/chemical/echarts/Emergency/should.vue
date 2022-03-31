<template>
	<div id="should" style="width:330px;height:60px"></div>
</template>

<script>
	import * as echarts from "echarts";

	export default {
		name: "should",
		props:['shouldarrive'],
		data() {
			return {
				data: 0,
			};
		},
		watch:{
			shouldarrive(n,p){
				this.initData2(Number(n));
			}
		},
		methods: {
			initData2(num) {
				let myChart2 = echarts.init(document.getElementById("should"));
				let option = {
					grid: {
						left: "-18%",
						bottom: "0",
						right: "2%",
						top: "50%",
						containLabel: true,
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "none",
						},
						show: false,
					},
					xAxis: {
						show: false,
						type: "value",
					},
					yAxis: [
						{
							//左侧柱状图的Y轴
							gridIndex: 0, //y轴所在的 grid 的索引
							splitLine: "none",
							axisTick: "none",
							axisLine: "none",
							show: false,
							axisLabel: {
								verticalAlign: "bottom",
								align: "left",
								padding: [0, 0, 15, 15],
								textStyle: {
									color: "#FFFFFF",
									fontWeight: 'bold',
									fontSize: "18",
								},
							},
							data: ["灭火器  4"],
							inverse: true,
						},
						{
							type: "category",
							inverse: true,
							axisTick: "none",
							axisLine: "none",
							show: true,
							axisLabel: {
								textStyle: {
									color: "#ffffff",
									fontFamily: 'PangMenZhengDao',
									fontWeight: 400,
									fontSize: "14",
								},
								formatter: function (value) {
									if (value >= 10000) {
										return (value / 10000).toLocaleString() + "万";
									} else {
										return value.toLocaleString();
									}
								},
							},
							data: [num],
						},
					],
					series: [
						{
							name: "金额",
							type: "bar",
							zlevel: 1,
							itemStyle: {
								normal: {
									barBorderRadius: 0,
									color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
										{
											offset: 0,
											color: "#36ecff",
										},
										{
											offset: 1,
											color: "#a2f7ff",
										},
									]),
								},
							},
							barWidth: 20,
							data: [num],
						},
						{
							name: "背景",
							type: "bar",
							barWidth: 20,
							barGap: "-100%",
							data: [num],
							itemStyle: {
								normal: {
									color: "#27a4b300",
									barBorderRadius: 0,
								},
							},
						},
					],
				};
				myChart2.setOption(option);
			},
		},
		mounted() {
			this.initData2(Number(this.shouldarrive));
		},
	};
</script>






