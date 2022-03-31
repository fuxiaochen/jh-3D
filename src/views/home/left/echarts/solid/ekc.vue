<template>
	<div id="ekc" style="width:57px;height:85px"></div>
</template>

<script>
	import * as echarts from "echarts";

	export default {
		name: "ekc",
		props:['value'],
		data() {
			return {
				data: 30,
			};
		},
		methods: {
			initData2(aaa,color) {
				let myChart2 = echarts.init(document.getElementById("ekc"));
				var data = aaa; //百分比
				const createSvg = (shadowColor, shadowBlur) => `
				    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
				        x="0px" y="0px"
				        viewBox="0 0 32 128"
				        xml:space="preserve"
				    >
				        <style>
				            .st2 {
				                fill: transparent;
				                stroke: ${shadowColor};
				                stroke-width: ${shadowBlur}px;
				                filter: url(#chart-inset-shadow);
				            }
				        </style>
				        <defs>
				            <filter id="chart-inset-shadow" width="200%" height="200%" x="-50%" y="-50%">
				                <feGaussianBlur in="SourceGraphic" result="gass" stdDeviation="${
									shadowBlur * 0.85
								}" />
				                <feMerge>
				                    <feMergeNode in="gass" />
				                </feMerge>
				            </filter>
				        </defs>
				        <path class="st2" d="M0 0 L32 0 L32 128 L0 128 Z" />
				    </svg>
				`;

				const svgString = createSvg("#2ec1d3", 10);
				const svg = new Blob([svgString], {
					type: "image/svg+xml;charset=utf-8",
				});

				const DOMURL = window.URL || window.webkitURL || window;
				const insetShadowUrl = DOMURL.createObjectURL(svg);

				let option = {
					backgroundColor: "#04050a",
					tooltip: {
						trigger: "none",
					},
					grid: {
						top: '0%',
						bottom: '7%',
					},
					xAxis: {
						data: ["百分比"],
						axisTick: {
							show: false,
						},
						axisLine: {
							show: false,
						},
						axisLabel: {
							show: false,
							textStyle: {
								color: "#ffffff",
							},
						},
					},
					yAxis: {
						splitLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLine: {
							show: false,
						},
						axisLabel: {
							show: false,
						},
					},
					series: [
						{
							name: "中间立体圆",
							type: "pictorialBar",
							symbolSize: [45, 5],
							symbolOffset: [23.5, -3],
							z: 12,
							itemStyle: {
								normal: {
									color: color,
								},
							},
							data: [
								{
									value: data,
									symbolPosition: "end",
								},
							],
						},
						{
							name: "最底部立体圆",
							type: "pictorialBar",
							symbolSize: [45, 10],
							symbolOffset: [23, 5],
							z: 12,
							itemStyle: {
								normal: {
									color:color,
								},
							},
							data: [100 - data],
						},
						{
							stack: "1",
							type: "pictorialBar",
							symbol: "image://" + insetShadowUrl,
							silent: true,
							barWidth: 48,
							label: {
								show: false,
								position: 'inside',
								color: "#ffffff",
								fontSize: 12,
								formatter: aaa + "%",
							},
							barGap: "-100%", // Make series be overlap
							data: [100],
						},
						{
							//底部立体柱
							stack: "1",
							type: "bar",
							itemStyle: {
								normal: {
									color: color,
									opacity: 0.7,
								},
							},
							silent: true,
							barWidth: 50,
							barGap: "-100%", // Make series be overlap
							data: [data],
						},
					],
				};
				myChart2.setOption(option);
			},
		},
		watch: {
			value(n, o) {
				let color = '#36Ecff';
				let readValue = Number(n.split('-')[0]);
				let containerValue = Number(n.split('-')[1]);
				let alarm1 = Number(n.split('-')[2]);
				let alarm2 = Number(n.split('-')[3]);
        let alarm3 = Number(n.split('-')[4]);
        let alarm4 = Number(n.split('-')[5]);
				let percent = ((readValue / containerValue).toFixed(2) * 100).toFixed(0)
				if (readValue < containerValue) {
          if (readValue < alarm2) {
            if (readValue < alarm1 && readValue > alarm3) {
              color = '#36Ecff'
            } else if(readValue > alarm1 || (readValue < alarm3 && readValue > alarm4) ) {
              color = '#ff8f40'
            }else if(readValue < alarm4 ) {
              color = '#D34355'
            }
          } else {
            color = '#D34355'
          }
				} else {
					color = '#ff0000'
				}
				this.initData2(percent, color);
			}
		},
		mounted() {
			this.initData2(0, '#36Ecff');
		},
	};
</script>




