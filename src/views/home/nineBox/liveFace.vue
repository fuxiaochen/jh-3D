<template>
	<div :class="!getStranger?'itemGD danger flash-before':'itemGD danger flash-after'">
		<div class="see-stranger" @click="seeStranger">
			查看陌生人轨迹
		</div>
		<div class="title">陌生人闯入报警</div>
		<div class="people">
			<div class="people-pic">
				<div class="see-img" @click="showBigImage = true">查看大图</div>
				<div style="width: 180px;height: 200px;overflow:hidden;display: flex;
					align-items: center;
					flex-wrap:wrap;
					position: relative;">
					<div :style="{backgroundImage: 'url(' + liveFace4 + ')'}" class="urlstaly" />
					<img class="mark1"  src='../../../assets/home/left/矩形.png' alt="" />
					<div class="mark" />
				</div>
			</div>
			<div class="people-info">
				<div class="base-info">
					<div class="name" style="magin:0">姓名：{{liveFace}}</div>
					<div class="name">检测时间：{{formatTime(liveFace1)}}</div>
					<div class="name">检测类型：{{liveFace2}}</div>
					<div class="name">门禁/人脸抓拍位置：{{liveFace3}}</div>
				</div>
			</div>
		</div>
		<div class="big-image" v-show="showBigImage">
			<img :src="bigImage" alt="" width="100%">
			<a-button id="close-image" @click="showBigImage = false">关闭</a-button>
		</div>
	</div>
</template>

<script>
	import {formatDate} from "../../../utils/date";
	export default {
		name: "liveFace",
		props:['flashTimes'],
		data() {
			return {
				getStranger: false,
				showBigImage:false
			}
		},
		methods: {
			formatTime(data) {
				if (data) {
					return formatDate(data / 1000)
				}
			},
			seeStranger() {
				console.log('查看陌生人轨迹');
				this.$store.commit('changeStrangeStatus', true);
				//触发一次, 20秒后置反
				setTimeout(() => {
					this.$store.commit('changeStrangeStatus', false);
				}, 20000)
			}
		},
		computed:{
			// 监听来自websocket的消息,这里获取实时人脸信息
			liveFace(){
				return this.$store.state.faceBasic.staffName
			},
			bigImage(){
				return this.$store.state.faceBasic.backPictureUrl
			},
			liveFace1(){
				return Number(this.$store.state.faceBasic.receiveTime)
			},
			liveFace2(){
				return this.$store.state.faceBasic.receiveType
			},
			liveFace3(){
				return this.$store.state.faceBasic.location
			},
			liveFace4() {
				let times = Number(this.flashTimes);
				if (times === 100) {// 永久闪烁
					this.getStranger = true;
				} else if (times === 0) {// 从不闪烁
					this.getStranger = false;
				} else {
					this.getStranger = true;// 多少秒闪烁
					setTimeout(() => {
						this.getStranger = false;
					}, times * 1000)
				}
				return this.$store.state.faceBasic.pictureUrl
			}
		}
  }
</script>

<style lang="stylus" scoped>
	.itemGD
		width 100%
		height 283px
		position relative
		.big-image
			position fixed
			right 660px
			top 100px
			width 600px
			min-height 200px
			max-height 950px
			padding 10px 10px 60px
			overflow hidden
			z-index 11111
			border-radius 6px
			background-color rgba(255,255,255,.95)
			img
				max-width 500px
			#close-image
				position absolute
				right calc(50% - 50px)
				bottom 10px
				z-index 11112
				width 100px
		.see-stranger
			position absolute
			right 20px
			top 20px
			width fit-content
			padding 0 8px
			height 24px
			line-height 24px
			border 1px solid #36ecff
			color #fff
			border-radius 4px
			cursor pointer
		.title
			position absolute
			top -14px
			left 25px
			font-size 22px
			font-weight bold
			color #36ECFF
	.flash-before
		background-image url("../../../assets/home/middle/人脸识别实时监测.png")
	.flash-after
		background-image url("../../../assets/home/middle/flash.gif")
	.danger
		background-repeat: no-repeat;
		.people{
			display: flex;
			justify-content: center;
			width 100%
			height 278px
			padding: 45px 0 0 0;
			.people-pic{
				width: 180px;
				height: 200px;
				display: flex;
				align-items: center;
				flex-wrap:wrap;
				position: relative;
				.see-img{
					position absolute
					right 0
					top 0
					width 80px
					height 30px
					border-radius 4px
					background-color rgba(0,255,255,.6)
					line-height 30px
					text-align center
					cursor: pointer;
					z-index 8

				}
				/*background:rgba(0, 255, 255,.1) ;*/
				.urlstaly{
					align-self: center;
					background-position center;
					background-repeat no-repeat
					background-size cover
					width 180px
					height 200px
				}
				img{
					align-self: center;
				}

				.mark{
					position: absolute;
					bottom: 0;
					left: 0;
					width 180px
					height 77px
					background-image: url("../../../assets/home/left/scan.png")
					background-size : 100% 100%;
					animation: mymove1 3s linear infinite;
					@keyframes mymove1 {
						0% {
							bottom: -90px;
						}

						100% {
							bottom: 230px
						}
					}
				}
				.mark1{
					position: absolute;
					width 180px
					height 200px
					bottom: 0;
					left: 0;
				}
			}
			.people-info{
				width: 310px;
				height: 195px;
				margin-left:50px;
				/*background:rgba(0, 255, 255,.3) ;*/
				.base-info{
					font-family: "MicrosoftYaHei-Bold";
					font-weight:bold;
					font-size: 19px;
					text-align: left;
					margin: 20px  0 0 0;
					color #fff
					.name{
						display flex
						justify-content flex-start
						margin: 10px  0 0 0;
					}
				}
			}
		}
</style>
