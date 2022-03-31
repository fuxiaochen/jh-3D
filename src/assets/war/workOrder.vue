
<template>
	<div id="workOrder" style="width:170px;height:170px"></div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		name: "workOrder",
		methods:{
			initData2() {
				let myChart2 = echarts.init(document.getElementById("workOrder"));
				var seriesData = [
					{
						name: "已完成",
						value: "100",
					},
					{
						name: "未完成",
						value: "9",
					}
				];
				let legendData = [
					{
						name:'已完成',
						value:'11'
					},
					{
						name:'未完成',
						value:'9'
					}];
				var colorList = ["#0492d4", "#70b9dc"];
				let option = {
					title: {
						text: "今日特殊工单\n20",
						x: "center",
						y: "50",
						textStyle: {
							color: "#fff",
							fontSize: 12,
							fontWeight: 300
						},
						// subtext: '20',
						// subtextStyle: {
						// 	color: '#fff',
						// 	fontSize: 10,
						// 	fontWeight: 'bold'
						// }
					},
					tooltip: {
						trigger: "item",
						borderColor: "rgba(255,255,255,.3)",
						backgroundColor: "rgba(13,5,30,.6)",
						borderWidth: 2,
						padding: 5,
						formatter: function (parms) {
							var str =
								parms.marker +
								"" +
								parms.data.name +
								"</br>" +
								"数量：" +
								parms.data.value +
								"</br>" +
								"占比：" +
								parms.percent +
								"%";
							return str;
						},
					},
					legend: {
						type: "scroll",
						orient: "vertical",
						icon: "circle",
						top: 110,
						left:40,
						textStyle: {
							color: "#fff",
							fontSize: 14,
							fontWeight: 100,
						},
						data: legendData,
						formatter: function(name) { //图表名称+数值
							let pieLegendVale = {};
							legendData.filter(item => {
								if (item.name === name) {
									pieLegendVale = item;
								}
							});
							return pieLegendVale.name + " " + pieLegendVale.value
						},
					},
					series: [
						{
							type: "pie",
							center: ["50%", "35%"],
							radius: ["60%", "46%"],
							clockwise: true,
							avoidLabelOverlap: true,
							hoverOffset: 12,
							itemStyle: {
								normal: {
									color: function (params) {
										return colorList[params.dataIndex];
									},
								},
							},
							label: {
								show: false,
								position: "outside",
								formatter: "{a|{b}：{d}%}\n{hr|}",
								rich: {
									hr: {
										backgroundColor: "t",
										borderRadius: 3,
										width: 3,
										height: 3,
										padding: [3, 3, 0, -12],
									},
									a: {
										padding: [-30, 15, -20, 15],
									},
								},
							},
							labelLine: {
								normal: {
									length: 20,
									length2: 30,
									lineStyle: {
										width: 1,
									},
								},
							},
							data: seriesData,
						},
					],
				};
				myChart2.setOption(option);
			},
		},
		mounted() {
			this.initData2()
		}
	}
</script>


