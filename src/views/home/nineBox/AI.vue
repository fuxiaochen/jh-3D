<template>
	<div :class="!getStranger?'itemGD leak flash-before':'itemGD leak flash-after'">
		<div class="title">安全行为分析</div>
		<div>
			<template>
				<div class="check">
					<div class="left">
						<div id="clothes">
							<div class="box">
								<div @click="showImage">
									<img :src="alarmAIPhoto" alt="" width="100%">
								</div>
								<div class="text">
									<p>报警类型：<span>{{$store.state.alarmAI.type}}</span></p>
									<p>检测时间：<span>{{$store.state.alarmAI.time}}</span></p>
									<p>摄像位置：<span>{{$store.state.alarmAI.area}}</span></p>
								</div>
							</div>
							<div class="bagImg" v-show="showImg">
								<div class="bagImg-text">安全隐患智能抓拍图片</div>
								<div style="height: 530px; padding:10px 20px 10px">
									<img :src="alarmAIPhoto" alt="" width="100%">
								</div>
								<a-button style="margin:10px 0 0 45%" type="primary" @click="showImage">确定</a-button>
							</div>
						</div>
					</div>
					<div class="right">
						<div id="box">
							<div id="events" ref="con1" :class="{anim:animate === true}"
							     :style="{'margin-top':marginTop}">
								<div class="right-one" v-for="(item,index) in list" :key="index">
									<img :src='require("./img/"+item.name+".png")' alt="">
									<div class="right-test">{{item.value}}次 <br/>{{formatText(item.name)}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AI",
		props:['flashTimes'],
		data() {
			return {
				getStranger: false,
				eventObj: {},
				list: [],
				animate: false,
				marginTop: '0px',
				showImg: false,
			}
		},
		computed: {
			alarmAIPhoto() {
				this.getStranger = true;
				setTimeout(() => {
					this.getStranger = false;
				}, Number(this.flashTimes) * 1000)
				return this.$store.state.alarmAI.photo
			}
		},
		methods: {
			formatText(key) {
				let list = [
					{
						name: 'helmet',
						text: '安全帽'
					},
					{
						name: 'safetyVest',
						text: '安全背心'
					},
					{
						name: 'fireworks',
						text: '烟火检测'
					},
					{
						name: 'jobCard',
						text: '工牌检测'
					},
					{
						name: 'identityClothing',
						text: '防护衣'
					},
					{
						name: 'climbSafetyBelt',
						text: '安全带'
					},
					{
						name: 'fireExtinguisher',
						text: '灭火器'
					},
					{
						name: 'elevatedFloorOpening',
						text: '高架地板开孔'
					}
				];
				let result = list.filter(item => {
					return item.name === key
				})
				return result[0].text
			},
			getAIEvent() {
				this.$http.get('/baidu/AI/getAIEventCount', {}).then(res => {
					if (res && res.data.code === 1) {
						this.eventObj = res.data.data[0];
						for (let i in this.eventObj) {
							this.list.push({
								name: i,
								value: this.eventObj[i],
								img: `../../../views/home/middle/echarts/check/img/${i}.png`
							})
						}
						setInterval(this.scroll, 3000);
					}
				})
			},
			scroll() {
				try {
					this.marginTop = "-80px";
					this.animate = !this.animate;
					let that = this;
					setTimeout(function () {
						that.list.push(that.list[0]);
						that.list.shift();
						that.marginTop = "0px";
						that.animate = !that.animate;
					}, 500);
				} catch (e) {
				}
			},
			showImage() {
				this.showImg = !this.showImg;
			}
		},
		mounted() {
			this.getAIEvent()
		}
	}
</script>

<style lang="stylus" scoped>
	#clothes
		font-weight bold
		margin auto
		height 231px
		width 350px
		position relative
		margin-top 20px
		background-image url("./img/bg-box22.png")
		text-align left
		padding 20px

		.bagImg
			width 1000px
			height 640px
			position fixed
			top 150px
			right 450px
			z-index 1000
			box-sizing: border-box;
			color: rgba(0, 0, 0, .65);
			font-size: 14px;
			font-variant: tabular-nums;
			line-height: 1.5;
			list-style: none;
			background-color: #fff;
			background-clip: padding-box;
			border: 0;
			border-radius: 4px;
			-webkit-box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
			box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
			pointer-events: auto;

			.bagImg-text
				margin 15px 0 0
				height 30px
				color: rgba(0, 0, 0, .85);
				font-weight: 500;
				font-size: 16px;
				line-height: 22px;
				word-wrap: break-word;
				text-align center

		div
			height 100px
			overflow-y hidden

			img
				cursor zoom-in

		.text
			position absolute
			left 20px
			bottom 5px
			z-index 8
			width 100%
			height 100px

			p
				width calc(100% - 40px)
				font-size 18px
				margin 3px 0
				overflow hidden
				white-space nowrap
				text-overflow ellipsis

	.itemGD
		width 100%
		height 283px
		position relative

		.title
			position absolute
			top -14px
			left 25px
			font-size 22px
			font-weight bold
			color #36ECFF

	.flash-before
		background-image url("../../../assets/home/middle/特殊工单统计.png")

	.flash-after
		background-image url("../../../assets/home/middle/flash.gif")

	.leak
		background-repeat no-repeat

		.echarts
			display flex

			.echarts-middle
				width 50%
				height 278px

	.check {
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


		.left {
			margin: 12px 0 0 0;
			width: 67%;
			height: 100%;
		}

		.right {
			margin: 12px 0 0 0;
			width 33%
			height 100%
			color #fff
			padding-top 20px
			transition all .3s linear

			#box {
				height 230px;
				overflow hidden
				transition all .3s linear
			}

			.right-one {
				display: flex;
				width 100%
				height 70px
				margin-bottom 10px
				align-items: center
				justify-content: flex-start
				flex-wrap: nowrap;
				color #ffffff
				transition all .3s linear

				.right-test {
					width 40%
					font-weight: bold;
					color: #23FFFC;
					font-size: 16px
				}
			}
		}
	}
</style>
