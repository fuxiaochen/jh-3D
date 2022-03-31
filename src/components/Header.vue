<template>
	<div id="header">
		<div class="nav header-left">
			<div class="image">
				<img src="../assets/home/logo.png" alt="">
			</div>
			<div class="line">
				<img src="../assets/header/line.png" alt="">
			</div>
			<div class="title">智慧安环一体化平台-3D展示</div>
			<div class="date">
				<div class="left">{{time.hour}}:{{time.minute}}:{{time.second}}</div>
				<div class="right">
					<div class="week">{{time.week}}</div>
					<div class="day">{{time.year+'-'+ time.month+'-'+time.day}}</div></div>
			</div>
		</div>
		<div class="nav header-right">
			<div class="image">
				<img src="../assets/home/logo.png" alt="">
			</div>
			<div class="line">
				<img src="../assets/header/line.png" alt="">
			</div>
			<div class="title">智慧安环一体化平台</div>
			<div class="date">
				<div class="left">{{time.hour}}:{{time.minute}}:{{time.second}}</div>
				<div class="right">
					<div class="week">{{time.week}}</div>
					<div class="day">{{time.year+'-'+ time.month+'-'+time.day}}</div></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Header",
		data(){
			return{
				timer:null,
				time: {
					year: 0,
					month: 0,
					day: 0,
					hour: 0,
					minute: 0,
					second: 0,
					week: 0,
				},
			}
		},
		methods: {
			formatTime(m) {
				return m < 10 ? "0" + m : m;
			},
			formatWeek(n) {
				switch (n) {
					case 1:
						return "星期一";
					case 2:
						return "星期二";
					case 3:
						return "星期三";
					case 4:
						return "星期四";
					case 5:
						return "星期五";
					case 6:
						return "星期六";
					case 7:
						return "星期日";
				}
			},
			getCurrentDate() {
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
				let day = new Date().getDate();
				let hour = new Date().getHours();
				let minute = new Date().getMinutes();
				let second = new Date().getSeconds();
				let week = new Date().getDay();
				this.time.year = year;
				this.time.month = this.formatTime(month);
				this.time.day = this.formatTime(day);
				this.time.hour = this.formatTime(hour);
				this.time.minute = this.formatTime(minute);
				this.time.second = this.formatTime(second);
				this.time.week = this.formatWeek(week);
			},
		},
		mounted(){
			this.getCurrentDate();
			this.timer = setInterval(this.getCurrentDate,1000)
		},
		destroyed(){//退出组件时，销毁定时器
			clearInterval(this.timer)
		}
	}
</script>

<style lang="stylus" scoped>
#header{
	width 3840px
	display: flex;
	.nav{
		display: flex;
		position: relative;
		.image{
			align-self: center;
			margin: 0 30px 0 30px;
		}
		.title{
			align-self: center;
			font-size: 40px;
			color: #FFFFFF;
		}
		.date{
			position: absolute;
			top:10px;
			right: 30px;
			display: flex;
			color: #00FFFF;
			font-family: electronicFont;
			.left{
				font-size: 40px;
			}
			.right{
				margin-top: 15px;
				text-align: left;
				margin-left: 10px;
				.week{
					font-size: 12px;
					height: 15px;
				}
			}

		}
	}
	.header-left{
		width: 1920px;
		height: 81px;
		position relative
		/*background-color #0E7FBA*/
		.line{
			position: absolute;
			right: 30px;
			bottom:0px
			img{
				display: block;
			}
		}
	}
	.header-right{
		width: 1920px;
		height: 81px;
		position relative
		/*background-color #2c3e50*/
		.line{
			position: absolute;
			left: 30px;
			bottom:0px
			img{
				display: block;
			}
		}
	}
}
</style>
