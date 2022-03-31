<template>
	<div class="specialorder">
		<div class="monitor">
			<div class="monitor-three">
				<Angry/>
				<div class="monitor-text">{{numLists.fwNumY}}/{{numLists.fwNumT}}</div>
			</div>
			<div class="monitor-three">
				<Hanging/>
				<div class="monitor-text">{{numLists.rsNumY}}/{{numLists.rsNumT}}</div>
			</div>
			<div class="monitor-three">
				<Elevated/>
				<div class="monitor-text">{{numLists.awNumY}}/{{numLists.awNumT}}</div>
			</div>
			<div class="monitor-three">
				<High/>
				<div class="monitor-text">{{numLists.fiNumY}}/{{numLists.fiNumT}}</div>
			</div>
			<div class="monitor-three">
				<Interrupt/>
				<div class="monitor-text">{{numLists.lwNumY}}/{{numLists.lwNumT}}</div>
			</div>
			<div class="monitor-three">
				<Sensor/>
				<div class="monitor-text">{{numLists.fgNumY}}/{{numLists.fgNumT}}</div>
			</div>
			<div class="monitor-three">
				<Xianban/>
				<div class="monitor-text">{{numLists.xbNumY}}/{{numLists.xbNumT}}</div>
			</div>
		</div>
		<div class="concentration">
			<div class="concentration-one">
				<Special/>
			</div>
			<div class="right">
				<Wrapper/>
			</div>
		</div>
	</div>
</template>

<script>
	import Angry from "./angry";
	import Hanging from "./hanging";
	import Elevated from "./Elevated";
	import Special from "./Special";
	import Wrapper from "./Wrapper";
	import High from "./high";
	import Interrupt from "./interrupt";
	import Sensor from "./sensor";
	import Xianban from './xianban'

	export default {
		name: "index",
		components: {
			Angry,
			Hanging,
			Elevated,
			Special,
			Wrapper,
			Interrupt,
			Sensor,
			High,
			Xianban
		},
		data() {
			return {
				pointerBtn: 1,
				toggle: true,
				numLists: {
					"numY": 2,
					"fwR": 50.00,
					"numW": 3,
					"lwNumY": 0,
					"fwNumY": 1,
					"lwNumT": "0",
					"lwR": 0,
					"fiNumT": 0,
					"fgNumY": 0,
					"fiNumY": 0,
					"rsNumT": "0",
					"fiR": 0.00,
					"rsR": 0,
					"fgR": 0,
					"awNumY": 1,
					"fgNumT": "0",
					"rsNumY": 0,
					"awNumT": 3,
					"numT": 5,
					"awR": 33.33,
					"tR": 40.00,
					"fwNumT": 2,
					"xbNumT": 36,
					"xbNumW": 36,
					"xbNumY": 0,
					"xbR": 0
				},
			};
		},
		methods: {
			getData() {
				this.$http.post("/largeScreen/normalState/order").then((res) => {
					this.numLists = res.data.data;
				});
			},
			solidBtnN1() {
				this.pointerBtn = 1;
			},
			solidBtnN2() {
				this.pointerBtn = 2;
			},
		},
		created() {
			this.getData();
		},
	};
</script>


<style lang="stylus" scoped>
	.specialorder {
		font-family: 'MicrosoftYaHei-Bold';
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
			width: 100%;
			height: 80px;
			margin: 40px 0 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;

			.monitor-text {
				width: 60px;
				height: 52px;
				font-size: 23px;
				text-align: left;
				padding-left: 6px;
				font-family: 'DS-Digital-Bold';
				font-weight: bold;
				color: #36ECFF;
			}

			.monitor-one {
				width: 17px;
				height: 67px;
				font-size: 16.5px;
				line-height: 17px;
				color: #36ECFF;
			}

			.monitor-two {
				display: flex;
				align-content: center;
				justify-content: center;
				padding: 0 15px 0 15px;
			}

			.monitor-three {
				text-align center
				padding: 0 10px;
			}
		}

		.concentration {
			width: 100%;
			height: 120px;
			margin: 0 0 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
			flex-wrap: nowrap;

			.concentration-text {
				width: 17px;
				height: 100px;
				font-size: 16.5px;
				line-height: 17px;
				color: #36ECFF;
				margin-top: 10px;
			}

			.concentration-title {
				width: 79px;
				height: 18px;
				display: flex;
				align-content: center;
				justify-content: center;
				font-size: 16.5px;
				line-height: 17px;
				color: #ffffff;
				margin: 10px 0 0 6px;
			}

			.concentration-one {
				padding: 0 0 0 10px;
			}
		}

		.right {
			width: 320px
		}
	}
</style>
