<template>
	<div class="security">
		<div class="itemGD leak">
			<div class="title">应急成员</div>
			<div class="echarts">
				<Member/>
			</div>
		</div>
		<div class="itemGD danger">
			<div class="title">特殊工单</div>
			<div class="totla"  v-if="baseInfo.data.length > 0">工单总数： {{baseInfo.count}}</div>
			<div class="bottom">
				<div v-if="baseInfo.data.length > 0" class="store-list">
					<div class="listItem">
						<span >工单类型</span><span>作业单号</span><span style="padding:0 0 0 9px">作业单位</span><span>作业时间</span><span>联系人员</span>
					</div>
					<div id="box">
						<div id="con1"
							ref="con1"
							:class="{anim:animate===true}"
							:style="{'margin-top':marginTop}">
							<div class="list" :style='{"background-color":item.color}' v-for="(item,index) in baseInfo.data"
								:key="index">
								<span>{{item.appStatus}}</span>
								<span style="width: 18%;word-wrap:break-word;white-space:normal;">{{item.applyNo}}</span>
								<span style="width: 40%;padding:0 9px;">{{item.guardCompany}}</span>
								<span style="width: 17%;padding:0 7px 0 0;">{{item.operFromTime}} ~ {{item.operToTime}}</span>
								<span style="width: 30%;padding:0 6px 0 0;">{{item.guardShName}} - {{item.guardTel}}</span>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="bottom-img">
				<img src="@/assets/home/fighting/无数据.png" alt="">
				<div>暂无数据</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Member from "../echarts/member/index";
	// import Danger from "../echarts/danger/index";
	// // import Leak from '../echarts/leak'
	export default {
		name: "security",
		components: {
			Member
		},
		data() {
			return {
				baseInfo: [],
				animate: false,
				marginTop: '0px',
				setInTime: '' // 定时器
			};
		},
		methods: {
			getSpecialOrders() {
				let d = new Date();
				let date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
				this.$http.get3('/specialWorkPermit/getDepartDrillByCondition', {operDt: date}).then(res =>{
					this.baseInfo = res.data.data
				})
			},
			//列表滚动
			scroll() {
				if(this.baseInfo.data.length < 1) return
				this.marginTop = "-65px";
				this.animate = !this.animate;
				let that = this;
				setTimeout(function () {
					that.baseInfo.data.push(that.baseInfo.data[0]);
					that.baseInfo.data.shift();
					that.marginTop = "0";
					that.animate = !that.animate;
				}, 500);
			}
		},
		mounted() {
			this.getSpecialOrders();
			this.setInTime = setInterval(this.scroll, 5000);
		},
		beforeDestroy() {
			clearInterval(this.setInTime);
		}
	};
</script>

<style lang="stylus" scoped>
#box {
		width: 100%;
		height: 130px;
		line-height: 30px;
		margin-top: 15px;
		overflow: hidden;
		/*background-color: #FFDAB9;*/
		transition: all 0.5s ease-in-out;
	}

	.anim {
		transition: all 0.5s ease-in-out;
	}

	#con1 .list {
		width: 100%;
		height: 55px;
		line-height 35px
		display: flex;
		/*background-color: #42b983;*/
		margin-bottom: 10px;
		justify-content: space-between;

		span {
			width: 33.3%;
			margin:auto 0;
			font-size: 14px;
			line-height 17px;
			text-align: center;
			font-weight: bold;
		}
	}
	#con1 .list:nth-child(odd){
		background-color #362115
	}
	#con1 .list:nth-child(even){
		background-color #0D3239
	}

	.security {
		display: flex;
		color: #FFFFFF;
		width: 100%;
		height: 100%;
	}

	.itemGD {
		width: 100%;
		height: 232px;
		position: relative;

		.title {
			position: absolute;
			top: -14px;
			left: 25px;
			font-size: 22px;
			font-weight: bold;
			color: #36ECFF;
		}
	}

	.leak {
		background-image: url('../../../../assets/home/fighting/框2.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;

		.echarts {
			display: flex;
		}
	}

	.danger {
		background-image: url('~@/assets/home/fighting/框2.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-left: 10px;

		.totla{
			color: #36ECFF;
			width 100%
			height 35px
			padding: 15px 20px 0 0;
			display: flex;
			font-weight: bold;
			align-content: center;
			justify-content: flex-end;
		}
		.bottom{
			width 100%
			height 184px
			padding: 5px 10px 0 10px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
			flex-wrap:nowrap;
			.bottom-img{
				width 100%
				padding 11% 0 0 0 
				text-align: center
			}
			.store-list{
						width: 100%;
						height: 184px;
						/*background:rgba(0, 255, 255,.2) ;*/
						.listItem{
							width: 100%;
							height: 28px;
							color: #36ECFF;
							padding-top: 12px;
							min-height: unset;
							margin-bottom: 20px;
							/*border: 1px solid #00FFFF;*/
							display:flex;
							justify-content: space-around;
							align-self: center;
							span{
								font-size: 16px;
							}
						}
					}

		}

		.roll {
			width: 100%;
			height: 300px;
			padding: 20px;
			overflow-y hidden;

			.contents {
				height: 300px;
				display flex
				justify-content space-between
				align-items center

				.people-pic {
					width: 150px;
					height: 150px;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					position: relative;
					overflow hidden

					img {
						align-self: center;
					}

					.abnormal {
						margin-top: 10px;
						font-family: 'MicrosoftYaHei-Bold';
						font-weight: bold;
						font-size: 19px;
					}

					.mark {
						position: absolute;
						bottom: 85px;
						left: 0;
						animation: mymove1 3s linear infinite;

						@keyframes mymove1 {
							0% {
								bottom: -90px;
							}

							100% {
								bottom: 155px;
							}
						}
					}

					.mark1 {
						position: absolute;
						bottom: 0;
						left: 0;
					}
				}

				.people-info {
					width: calc(100% - 200px);
					height: auto;

					.base-info {
						font-family: 'MicrosoftYaHei-Bold';
						font-weight: 700;
						font-size: 20px;
						text-align: left;
						.name {
							margin: 10px 0
							overflow-x hidden
						}
					}
				}
			}
		}

		.marquee_top {
			transition: all 0.5s linear;
			margin-top: -300px;
		}
	}
</style>
