<template>
	<div class="solid">
		<div class="fire">
			<img src="../../../../../assets/3D/firegif.gif" alt="">
		</div>
		<div class="solid-text">
			<div class="left-text">告警时间：
				<span class="text-time">{{responseTime}}</span>
			</div>
			<div class="left-text">通报人：
				<span class="text-time">{{$store.state.informpeople}}</span>
			</div>
			<div class="left-text">区域位置：
				<span class="text-time">{{eventLocation}}</span>
			</div>
		</div>
		<div class="solid-text1">
			<div class="left-text">预案启动人员：
				<span class="text-time">{{eventCreator}}</span>
			</div>
			<div class="left-text">总指挥：
				<span class="text-time">{{commander}}</span>
			</div>
			<div class="left-text">告警设备：
				<span class="text-time">{{$store.state.AlarmNo}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				pointerBtn: 1,
				responseTime: '',
				notifier: '',
				eventLocation: '',
				eventCreator: '',
				commander: '',
				equipment: '',
			};
		},
		methods: {
			solidBtnN1() {
				this.pointerBtn = 1
			},
			solidBtnN2() {
				this.pointerBtn = 2
			},
			getDataList() {
				this.$http.get3('/emergency/event/queryOne', {processInstanceId:localStorage.getItem('processInstanceId')}).then(res => {
					let tempData = res.data.data;
					this.responseTime = tempData.responseTime
					this.notifier = tempData.notifier
					this.eventLocation = tempData.eventLocation
					this.eventCreator = tempData.eventCreator
					this.commander = tempData.commander
					this.equipment = tempData.equipment
				})
			}
		},
		mounted() {
			this.getDataList();
		}
	};
</script>


<style lang="stylus" scoped>

	.solid {
		font-family: "MicrosoftYaHei-Bold";
		font-weight: bold;
		width: 100%;
		height: 140px;
		position: relative;
		left: 0;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items center
		padding: 0px 0 0 0;
		.fire{
			width 250px
			height 120px
			background-image url("../../../../../assets/3D/fire-bg.png")
		}

		.solid-text {
			width: 300px;
			padding: 0 0 0 40px;
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			align-items center

			.left-text {
				width: 450px;
				height: 48px;
				font-size: 22px;
				padding: 12px 0;
				text-align: left;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #36ECFF;
				overflow hidden
				text-overflow: ellipsis;
				white-space:nowrap;

				.text-time {
					color: #ffffff;
					overflow hidden
					text-overflow: ellipsis;
					white-space:nowrap;
				}
			}
		}

		.solid-text1 {
			width: 320px;
			padding: 0 60px 0 60px;
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			align-items center

			.left-text {
				width: 320px;
				height: 48px;
				font-size: 22px;
				padding: 12px 20px 0  0;
				text-align: left;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #36ECFF;
				overflow hidden
				text-overflow: ellipsis;
				white-space:nowrap;

				.text-time {
					color: #ffffff;
					overflow hidden
					text-overflow: ellipsis;
					white-space:nowrap;
				}
			}
		}

	}
</style>
