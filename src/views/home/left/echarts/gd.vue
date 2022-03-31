<template>
	<div id="gd" style="width:300px;height:148px"></div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		name: "gd",
		data(){
			return{
				numLists:null
			}
		},
		methods:{
			initData2(data) {
				let myChart2 = echarts.init(document.getElementById("gd"));
				let seriesData = [
					{
						name: "正常",
						value: data.gdNormalStatistical,
					},
					// {
					// 	name: "故障",
					// 	value: data.gdNum2,
					// },
					{
						name: "预警",
						value: data.gdWarntatistical,
					},
					{
						name: "报警",
						value: data.gdAlarmtatistical,
					},
					// {
					// 	name: "隔离",
					// 	value: data.gdNum5,
					// },
					// {
					// 	name: "离线",
					// 	value: data.gdNum7,
					// }
				];
				let option = {
					color:["#0492D4", "#36ecff","#d34355","#ff8f40","#ffffff"],
					tooltip: {
						trigger: 'item'
					},
					title: {
						text: "GD总数\n" + (data.gdNormalStatistical+data.gdWarntatistical+data.gdAlarmtatistical),
						top: '47%',
						textAlign: "center",
						left: "33%",
						textStyle: {
							color: "#fff",
							fontSize: 14,
							fontWeight: 400
						},
					},
					legend: {
						type: "scroll",
						orient: "vertical",
						top: 40,
						left:180,
						selectedMode:false,
						textStyle: {
							color: "#fff",
							fontSize: 14,
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
							{
								name:'离线',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAVCAYAAAB7R6/OAAAAbElEQVQoke3SMQqDQBBG4S9mIUjAKkdKGm3iGbePIaews7G2DJ4i2BiQBa0tfDDNP29mmjnFGK2Q4xGSsECFGiWuATc857rjspwIGHFeu5NtNf/CJoewHyF9mCVffFJhwAsNWvwC+jl8o0vXTJtMDfM5eFdYAAAAAElFTkSuQmCC'
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
							radius: ['48%', '62%'],
							center: ['35%', '55%'],
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
			getData() {
				this.$http.post2("/bigscreen/query/grid/gl").then(res => {
					// this.numLists = res.data.data
					this.initData2(res.data.data.gridViewForGdNum)
				});
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>



