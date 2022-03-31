<template>
	<div id="gd" style="width:300px;height:278px"></div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		name: "gd",
		methods:{
			initData2() {
				let myChart2 = echarts.init(document.getElementById("gd"));
				let seriesData = [
					{
						name: "正常",
						value: "2000",
					},
					{
						name: "故障",
						value: "268",
					},
					{
						name: "预警",
						value: "369",
					},
					{
						name: "报警",
						value: "46",
					},
					{
						name: "隔离",
						value: "2317",
					}
				];
				let option = {
					color:["#0492D4", "#DFEBFF","#FF8F40","#CD4153","#36ECFF"],
					tooltip: {
						trigger: 'item'
					},
					title: {
						text: "GD总数\n  5000",
						x: "70",
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
						top: 80,
						left:180,
						selectedMode:false,
						textStyle: {
							color: "#fff",
							fontSize: 16,
							fontWeight: 100,
						},
						itemWidth: 8,
						itemHight: 21,
						data: [
							{
								name:'正常',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAVCAYAAAB7R6/OAAAAkklEQVQoU2NkwAYmXTVkYfgfxMDAEMgIlq+vZ2IRCbVk+McQ9J+RMZCR4b8iTB8j88QrUxgYGYIZGRgksBnGyDLp6ncGhv8cWK1iYGAYVQAJmWEQDv///8Hmix//GRh2M/z/t/4vM+smsIL/////ZmBk2MbA+H/9328ftzGU23xGpKjJVz3/vnm1n6HR8Qe2RAMA4r1gxexzQxcAAAAASUVORK5CYII='
							},
							{
								name:'故障',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAVCAYAAAB7R6/OAAAAiklEQVQoU+2SvQnCYBiEn0tEXMDSMez8yQRCxCFSC+IUSnCQz8YB0qe0tXQHC4MnYqLNN4H4tvfeHXeciJwP0yFNuiDxUh3u3WwEykmUAxOg98Lkcr7BrIAx6EPoiHKZ3TCDmFWr8H94N/m7PfgMCjyaYxvTfVANDlhB6+ryHcw+K7hz0ra6xkbzBBnUXi29YoppAAAAAElFTkSuQmCC'
							},
							{
								name:'预警',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAUCAYAAACwG3xrAAAAfklEQVQoU2NkwALUX//n5Wdg8P3PxODHCJOHCTIwMoQy/GfwYGBk4GBgYPjBaPrmvykjA0M1w38Gd6ggsplgBRWMDAzt2KyCmTCqABKSQzocPjEwMGxA9wVIcDMjA8Pql58Zdj5QZAR7M4uBgcHy/3+G1R9EGHbeYWT8iZw2AMIpXyDOpZ/SAAAAAElFTkSuQmCC'
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



