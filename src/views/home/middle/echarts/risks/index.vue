<template>
	<div class="risks">
		<div class="monitor">
			<button class="solid-btn2" :class="{'active': pointerBtn ===1 }" @click="solidBtnN1">累计数量</button>
			<button class="solid-btn" :class="{'active': pointerBtn ===2 }" @click="solidBtnN2">部门统计</button>
			<button class="solid-btn" :class="{'active': pointerBtn ===3 }" @click="solidBtnN3">缺失统计</button>
			<button class="solid-btn" :class="{'active': pointerBtn ===4 }" @click="solidBtnN4">实时开单</button>
			<button class="solid-btn" :class="{'active': pointerBtn ===5 }" @click="solidBtnN5">安全公示</button>
		</div>
		<div class="concentration-top" v-if="pointerBtn < 4">
			<div class="concentration-select">
				<a-select
					label-in-value
					size='small'
					v-model="defaultValue"
					:default-value="{ key: 'day' }"
					style="width: 100px;height:30px;font-weight: bold;"
					@change="handleChange"
				>
					<a-select-option value="day">
						近七日
					</a-select-option>
					<a-select-option value="month">
            当月
					</a-select-option>
					<a-select-option value="year">
						近一年
					</a-select-option>
				</a-select>
			</div>
		</div>
		<div class="concentration">
			<div class="concentration-one">
				<Closed0 ref="is_child" v-if="pointerBtn == 2"/>
				<Closed12 ref="is_child" v-if="pointerBtn == 3"/>
				<Closed11 ref="is_child" v-if="pointerBtn == 1"/>
				<div style="display: flex" v-if="pointerBtn == 4">
					<Wrapper1/>
					<div class="text1">
						今日安全隐患：
						<div class="numbler">{{num}}</div>
					</div>
				</div>
				<div class="numble1" v-if="pointerBtn == 5">
					<div style="font-size: 20px;font-weight: bold;margin-bottom:10px">累积安全生产天数:</div>
					<div class="text">
						<div class="numble">{{days.substr(0,1)}}</div>
						<div class="numble">{{days.substr(1,1)}}</div>
						<div class="numble">{{days.substr(2,3)}}</div>
						<span style="font-size: 18px;font-weight: bold;padding-right:5px">天</span>
						<div class="numble">{{hours.substr(0,1)}}</div>
						<div class="numble">{{hours.substr(1,2)}}</div>
						<span style="font-size: 18px;font-weight: bold;padding-right:5px">时</span>
						<div class="numble">{{mins.substr(0,1)}}</div>
						<div class="numble">{{mins.substr(1,2)}}</div>
						<span style="font-size: 18px;font-weight: bold;padding-right:10px">分</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Closed11 from "./closed11";
	import Closed12 from "./closed12";
	import Wrapper1 from "./Wrapper1";
	import Closed0 from "./closed0";

	export default {
		name: "index",
		components: {
			Closed0,
			Closed11,
			Closed12,
			Wrapper1,
		},
		data() {
			return {
				pointerBtn: 1,
				num: 1,
				days: "000",
				mins: "00",
				hours: "00",
				defaultValue: {
					value: 'day',
					label: '近七天'
				},
				options: [{
					value: 'day',
					label: '近七天'
				}, {
					value: 'month',
					label: '当月'
				}, {
					value: 'year',
					label: '近一年'
				}],
				value: 'day'
			};
		},
		methods: {
			handleChange(value) {
				let data = {
					caseType: this.pointerBtn,
					dateType: value.key
				}
				this.$http.get("/largeScreen/normalState/hazardIdentification", data).then(res => {
					this.$refs.is_child.aaa(res.data.data, value.key); //父组件中直接调用 $refs
				});
			},
			solidBtnN1() {
				this.pointerBtn = 1;
				this.defaultValue = {
					value: 'day',
					label: '近七天'
				};
				// let data = {
				//       caseType : this.pointerBtn,
				//       dateType : 'day'
				//   }
				//     this.$http.get("/largeScreen/normalState/hazardIdentification",data).then(res => {
				//     this.$refs.is_child.aaa(res.data.data); //父组件中直接调用 $refs
				//   });
			},
			solidBtnN2() {
				this.pointerBtn = 2;
				this.defaultValue = {
					value: 'day',
					label: '近七天'
				};
				// let data = {
				//       caseType : this.pointerBtn,
				//       dateType : 'day'
				//   }
				//     this.$http.get("/largeScreen/normalState/hazardIdentification",data).then(res => {
				//     this.$refs.is_child.aaa(res.data.data); //父组件中直接调用 $refs
				//   });
			},
			solidBtnN3() {
				this.pointerBtn = 3;
				this.defaultValue = {
					value: 'day',
					label: '近七天'
				};
				// let data = {
				//       caseType : 3,
				//       dateType : 'day'
				//   }
				//     this.$http.get("/largeScreen/normalState/hazardIdentification",data).then(res => {
				//     this.$refs.is_child.aaa(res.data.data); //父组件中直接调用 $refs
				//   });
			},
			solidBtnN4() {
				this.pointerBtn = 4;
				this.defaultValue = {
					value: 'day',
					label: '近七天'
				};
				let data = {
					caseType: this.pointerBtn,
					dateType: 'day'
				}
				this.$http.get("/largeScreen/normalState/hazardIdentification", data).then(res => {
					this.num = res.data.data.num
				});
			},
			solidBtnN5() {
				this.pointerBtn = 5;
				this.defaultValue = {
					value: 'day',
					label: '近七天'
				};
				let data = {
					caseType: 5,
					dateType: 'day'
				}
				this.$http.get("/largeScreen/normalState/hazardIdentification", data).then(res => {
					this.mins = res.data.data.mins
					this.days = res.data.data.days
					this.hours = res.data.data.hours
				});
			},
		},
	};
</script>

<style scoped>
	/deep/ .ant-select-selection {
		background-color: #000 !important;
		color: #fff !important;
		border: 1px solid #36ECFF;
	}

	/deep/ .ant-select-arrow {
		color: #fff !important;
	}
</style>

<style lang="stylus" scoped>
	.risks {
		font-family: 'MicrosoftYaHei-Bold';
		font-weight: bold;
		width: 100%;
		height: 88px;
		position: relative;
		left: 0;
		top: 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.monitor {
			width: 100%;
			height: 40px;
			margin: 40px 0 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;

			.solid-btn {
				width: 70px;
				height: 26px;
				font-size: 14px;
				color: #ffffff;
				background-color: #01B7C2;
				font-weight: bold;
				border-radius: 3px;
				cursor: pointer;
				margin-left: 15px;
			}

			.solid-btn2 {
				width: 70px;
				height: 26px;
				font-size: 14px;
				color: #ffffff;
				background-color: #01B7C2;
				font-weight: bold;
				border-radius: 3px;
				cursor: pointer;
			}

			.active {
				border: 0;
				background-color: #05060c;
				border: 1px solid #36ECFF;
			}
		}


		.concentration {
			width: 100%;
			height: 185px;
			display: flex;
			align-content: center;
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

				.numbler {
					text-align center
					font-size 48px
					font-family: 'DS-Digital-Bold';
					color: #36ecff;
					font-weight: bold;
				}

				.text1 {
					width: 260px;
					padding: 40px 0 0 0
					font-size: 22px
				}

				.numble1 {
					width 580px
					height 180px
					padding 30px 0 0 50px;

					.text {
						display flex
						justify-content center
						align-items center

						.numble {
							font-size: 18px
							padding 0 10px 0 0;
							text-indent: 8px
							margin 0 5px 0 0;
							background-image: url('./img/text.png');
							background-size: 100% 100%;
							background-repeat: no-repeat;
						}
					}
				}
			}
		}

		.concentration-top {
			position absolute;
			top: 47%;
			right: 0%;
			display flex
			justify-content: flex-end
			width: 30%;
			height: 20px;
			display: flex;
			align-content: center;
			flex-wrap: nowrap;
			background-color: #fffff;

			.concentration-btn {
				width: 30px;
				height: 20px;
				background-image: url('./img/圆角.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				cursor: pointer;
				margin: 0 10px 0 50px;
			}

			.concentration-btn1 {
				width: 30px;
				height: 20px;
				background-image: url('./img/圆角2.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				cursor: pointer;
				margin: 0 10px 0 20px;
			}

			.concentration-select {
				width: 70px;
				height: 20px;
				text-align: right;
				margin: 0 80px 0 0;
			}
		}

		.right {
			width: 300px;
			height: 120px;
			background-color: #2c3e50;
		}
	}
</style>
