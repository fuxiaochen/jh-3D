<template>
	<div class="warn">
		<div class="title">
			<img class="jiao" src="../../../../assets/home/jiao.png" alt="">
			<div class="desc">实时告警</div>
		</div>
		<div class="search"></div>
		<div class="detail" v-for="(item,index) in fireList" :key="index">
			<div class="date">
				<div class="icon">{{item.number}}</div>
				<div class="time">{{item.date}}</div>
				<div class="warn-fire" @click="change">{{item.type}}</div>
			</div>
			<div class="info">
				<div>告警位置信息：{{item.position}}</div>
				<div>告警状态：<span :style="{'color':item.color}">{{item.state}}</span></div>
				<div>告警图片：</div>
				<img :src=item.img alt="">
			</div>
			<div class="button">
				<a-button class="btn">告警视频</a-button>
				<a-button class="btn">告警处置</a-button>
				<a-button class="btn">应急响应</a-button>
			</div>
		</div>
<!--		<div class="detail">-->
<!--			<div class="date">-->
<!--				<div class="icon">1</div>-->
<!--				<div class="time">2020-09-03 13:14</div>-->
<!--				<div class="warn-fire">火灾告警</div>-->
<!--			</div>-->
<!--			<div class="info">-->
<!--				<div>告警位置信息：A区3栋-102</div>-->
<!--				<div>告警状态：未处置</div>-->
<!--				<div>告警图片：</div>-->
<!--				<img src="../../../../assets/home/huo.png" alt="">-->
<!--			</div>-->
<!--			<div class="button">-->
<!--				<a-button type="primary">告警视频</a-button>-->
<!--				<a-button type="primary">告警处置</a-button>-->
<!--				<a-button type="primary">应急响应</a-button>-->
<!--			</div>-->
<!--		</div>-->
	</div>
</template>

<script>
	export default {
		name: "warn",
		data(){
			return{
				fireList:[
					{
						number:1,
						date:'2020-09-03 13:14',
						type:'火灾告警',
						position:'A区3栋-102',
						state:'未处置',
						color:'#FFFF00',
						img:require('../../../../assets/home/huo.png')
					},
					{
						number:2,
						date:'2020-09-03 13:14',
						type:'烟雾告警',
						position:'A区3栋-102',
						state:'已处置',
						color: '#00FFFF',
						img:require('../../../../assets/home/yan.png')
					},
				]
			}
		},
		methods:{
			change(){
				this.$router.replace('/war')
			}
		}
	}
</script>

<style lang="stylus" scoped>
.warn{
	width: 340px;
	height: 798px;
	color: #FFFFFF;
	padding-top: 50px;
	/*background:rgba(0, 255, 255,.2) ;*/
	.title{
		display: flex;
		position: relative;
		height: 28px;
		margin-bottom: 10px;
		.jiao{
			align-self: center;
			width: 11px;
			height: 20px;
		}
		.desc{
			font-size: 18px;
			margin-left: 8px;
		}
	}
	.search{
		width: 100%;
		height: 30px;
		margin-bottom: 20px;
		/*background:rgba(0, 255, 255,.3) ;*/
	}
	.detail{
		.date{
			display: flex;
			.icon{
				width: 20px;
				height: 20px;
				background-color: #00FFFF;
				border-radius: 50%;
			}
			.time{
				margin: 0 70px 0 10px;
			}
			.warn-fire{
				width: 77px;
				height: 24px;
				cursor pointer
				background-color: #D34355;
				border: 1px solid #D34355;
			}
		}
		.info{
			height: 190px;
			text-align: left;
			font-size: 16px;
			position: relative;
			img{
				position: absolute;
				top: 60px;
				left: 80px;
			}
		}
		.button{
			margin: 30px 0;
			.btn{
				width: 70px;
				height: 27px;
				padding: 0;
				margin-right: 15px;
				background-color: #00FFFF;
				border:1px solid #00FFFF;
			}
		}


	}
}
</style>
