<template>
	<div class="pollutants">
		<div class="monitor">
			<div class="monitor-one">废水监测</div>
			<div class="data-list">
				<div class="item" v-for="(item,k) in wasteData" :key="k"><span>{{item.gsName}}</span><span v-if="item.unit && item.unit !== ''" class="value-unit">({{item.unit}})</span></div>
				<div class="item" v-for="(item,k) in wasteData" :key="k+11">
					<span v-if="item.almStatus === '0'" style="color: rgb(54, 236, 255)">{{item.readValue.toFixed(2)}}</span>
					<span v-if="item.almStatus === '1'" style="color: orangered">{{item.readValue.toFixed(2)}}</span>
					<span v-if="item.almStatus === '2'" style="color: red">{{item.readValue.toFixed(2)}}</span>
				</div>
			</div>
		</div>
		<div class="concentration">
			<div class="concentration-text">非甲烷浓度</div>
			<div class="concentration-one" style="padding-left:20px">
				<Detect1 :detectValue="detect1"/>
				<div class="concentration-title">有机排口1</div>
			</div>
			<div class="concentration-one">
				<Detect2 :detectValue="detect2"/>
				<div class="concentration-title">有机排口2</div>
			</div>
			<div class="concentration-one">
				<Detect3 :detectValue="detect3"/>
				<div class="concentration-title">有机排口3</div>
			</div>
			<div class="concentration-one">
				<Detect4 :detectValue="detect4"/>
				<div class="concentration-title">有机排口4</div>
			</div>
			<div class="concentration-one">
				<Detect5 :detectValue="detect5"/>
				<div class="concentration-title">有机排口5</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Detect1 from "./detect1";
	import Detect2 from "./detect2";
	import Detect3 from "./detect3";
	import Detect4 from "./detect4";
	import Detect5 from "./detect5";

	export default {
		name: "index",
		components: {
			Detect1,
			Detect2,
			Detect3,
			Detect4,
			Detect5,
		},
		data() {
			return {
				pointerBtn: 1,
				wasteData:[],
				detect1:0,
				detect2:0,
				detect3:0,
				detect4:0,
				detect5:0,
			};
		},
		methods: {
			solidBtnN1() {
				this.pointerBtn = 1
			},
			solidBtnN2() {
				this.pointerBtn = 2
			},
			getWasteData(){
				this.wasteData = [];
				let obj = {
					"pageNum": 1,
					"pageSize": 20
				};
				this.$http.post2('/chemical/page/gas',obj).then(res=>{
					let arr = res.data.data.list;
					arr.map(item=>{
						if(!item.gsName.includes('有机排口')){
							this.wasteData.push(item)
						}
						if(item.gsName === '有机排口1'){
							this.detect1 = item.readValue.toFixed(2)
						}
						if(item.gsName === '有机排口2'){
							this.detect2 = item.readValue.toFixed(2)
						}
						if(item.gsName === '有机排口3'){
							this.detect3 = item.readValue.toFixed(2)
						}
						if(item.gsName === '有机排口4'){
							this.detect4 = item.readValue.toFixed(2)
						}
						if(item.gsName === "有机排口5"){
							this.detect5 = item.readValue.toFixed(2)
						}
					})
				})
			}
		},
		mounted() {
			this.getWasteData()
		}
	};
</script>


<style lang="stylus" scoped>
	.pollutants {
		font-family: "MicrosoftYaHei-Bold";
		font-weight: bold;
		width: 100%;
		height: 278px;
		position: relative;
		left: 0;
		top: 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.monitor {
			width 100%
			height 100px
			margin: 49px 0 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
			.monitor-text {
				text-align left
				width 90px;
				font-size: 12px;
				font-family: "MicrosoftYaHei-Bold";
				font-weight: bold;
				color: #ffffff;
			}

			.monitor-one {
				width 17px;
				height 67px
				margin-right: 5px;
				font-size: 16.5px;
				line-height: 17px;
				color: #36ECFF;
			}

			.monitor-two {
				display: flex;
				align-content: center;
				justify-content: center;
				padding: 0 15px 0 25px
			}

			.monitor-three {
				padding: 0
			}
		}

		.concentration {
			width 100%
			height 120px
			margin: 0 0 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
			flex-wrap: nowrap;

			.concentration-text {
				width 17px;
				height 100px
				font-size: 16.5px;
				line-height: 17px;
				color: #36ECFF;
				margin-top: 10px;
			}

			.concentration-title {
				width 79px;
				height 18px
				display: flex;
				align-content: center;
				justify-content: center;
				font-size: 16.5px;
				line-height: 17px;
				color: #ffffff;
				margin: 10px 0 0 6px;
			}

			.concentration-one {
				padding: 0 10px
			}
		}
	}
	.data-list {
		display flex
		justify-content flex-end
		flex-wrap wrap
		width 92%
		height 72px
		.item {
			width 11%
			height 36px
			border 1px solid #00FFFF
			box-sizing border-box
			font-size 12px
			display flex
			flex-direction column
			justify-content center
			span {
				line-height 12px
			}
		}
	}
</style>
