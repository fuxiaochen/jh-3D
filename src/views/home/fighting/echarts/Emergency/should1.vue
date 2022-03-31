<template>
	<div id="should1" style="width:330px;height:60px"></div>
</template>

<script>
	import * as echarts from "echarts";

	export default {
		name: "should1",
		props:['arrived','shouldarrive'],
		data() {
			return {
				data: 70
			};
		},
		methods: {
			initData2(num,numTotal) {
				let myChart2 = echarts.init(document.getElementById("should1"));
				let option = {
					grid: {
						left: "-18%",
						right: "2%",
						bottom: "0",
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
							data: ["医药箱  2"],
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
											color: "#53ff40",
										},
										{
											offset: 1,
											color: "#bbdea8",
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
							data: [numTotal],
							itemStyle: {
								normal: {
									color: "#7C4A2700",
									barBorderRadius: 0,
								},
							},
						},
					],
				};
				myChart2.setOption(option);
			},
		},
		watch:{
			arrived(n,p){
				this.initData2(Number(n),Number(this.shouldarrive));
			},
			shouldarrive(n,p){
				this.initData2(Number(this.arrived),Number(n));
			}
		},
		mounted() {
			this.initData2(Number(this.arrived),Number(this.shouldarrive));
		},
	};
</script>






