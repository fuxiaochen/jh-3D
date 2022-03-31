<template>
	<div id="leak" style="width:300px;height:278px"></div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		name: "leak",
		methods:{
			initData2() {
				let myChart2 = echarts.init(document.getElementById("leak"));
				let seriesData = [
					{
						name: "正常",
						value: "2000",
					},
					{
						name: "报警",
						value: "2000",
					},
					{
						name: "隔离",
						value: "2000",
					}
				];
				let option = {
					color:["#0492D4", "#DFEBFF","#CD4153"],
					tooltip: {
						trigger: 'item'
					},
					title: {
						text: "LEAK总数\n   6000",
						x: "60",
						y: "120",
						textStyle: {
							color: "#fff",
							fontSize: 18,
							fontWeight: 400
						},
					},
					legend: {
						type: "scroll",
						orient: "vertical",
						top: 100,
						left:180,
						selectedMode:false,
						textStyle: {
							color: "#fff",
							fontSize: 16,
							fontWeight: 100,
						},
						itemWidth: 6,
						itemHight: 21,
						data: [
							{
								name:'正常',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAVCAYAAAB7R6/OAAAAkklEQVQoU2NkwAYmXTVkYfgfxMDAEMgIlq+vZ2IRCbVk+McQ9J+RMZCR4b8iTB8j88QrUxgYGYIZGRgksBnGyDLp6ncGhv8cWK1iYGAYVQAJmWEQDv///8Hmix//GRh2M/z/t/4vM+smsIL/////ZmBk2MbA+H/9328ftzGU23xGpKjJVz3/vnm1n6HR8Qe2RAMA4r1gxexzQxcAAAAASUVORK5CYII='
							},
							{
								name:'报警',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAVCAYAAAB7R6/OAAAAi0lEQVQoU2NkwAGuWIfK/edgDGBElr/uHK72+/+/IEZGhiCG//9NGBgZGRmvOIQaMDD/D2L4zxD0n5FRG91AxivOod//MzBw4LJqVAEkZIZxODAyMPz7z8Bw6v+//+uRvPn/D+N/xkP/GBjWszMwrFfft/opOBwuO4WsZfj/fysL07+NmnvXv0VPOAB0vWHXknAe0wAAAABJRU5ErkJggg=='
							},
							{
								name:'隔离',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAVCAYAAAB7R6/OAAAAbUlEQVQoU+3SvQkCYRCE4WcjfxCj60gQxEC0UL3IGgQjCzC1AzEc+bLj4BoQN9x9h4WZKROTZIFtDe9J1tjjiB1WlaTDASdsMBuKGvDGcupVAz6Y/4Ef9+GFfhz3ExeccauqNOCOa1tW1WPciy/NHFqwRCWYewAAAABJRU5ErkJggg=='
							},
						],
						formatter: function(name) { //图表名称+数值
							let pieLegendVale = {};
							seriesData.filter(item => {
								if (item.name === name) {
									pieLegendVale = item;
								}
							});
							return pieLegendVale.name + " " + pieLegendVale.value
						},
					},
					series: [
						{

							type: 'pie',
							radius: ['33%', '47%'],
							center: ['35%', '50%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center'
							},
							itemStyle:{
								borderColor: '#030409',
								borderWidth: 2
							},
							// emphasis: {
							// 	label: {
							// 		show: true,
							// 		fontSize: '40',
							// 		fontWeight: 'bold'
							// 	}
							// },
							labelLine: {
								show: false
							},
							data:seriesData
						}
					]
				};
				myChart2.setOption(option);
			},
		},
		mounted() {
			this.initData2()
		}
	}
</script>



