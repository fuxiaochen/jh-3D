<template>
	<div id="wrapper" class="my-wrapper2">

		<a-carousel autoplay>
			<div class="item-every" v-for="(item,index) in piclist" :key="index+10">
				<div style="text-align: left">
					<h4 style="color: #00FFFF">{{item.mode}}类型作业</h4>
					<div style='font-size: 12px;color: #fff; overflow: hidden;width:330px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>发起日期：{{item.originator_date}}</div>
					<div style='font-size: 12px;color: #fff; overflow: hidden;width:330px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>事件种类：{{item.item}}</div>
					<p>事件部门：<span>{{item.app_dep_name}}</span></p>
					<p>事件状态：<span>{{item.phase}}</span></p>
				</div>
			</div>
		</a-carousel>

<!--		<transition-group name="list" tag="ul" mode="out-in" v-if="piclistNum === 1" >-->
<!--				<div class="item-every" v-for="(item,index) in piclist" :key="index+10">-->
<!--					<div>-->
<!--						<h4>{{item.mode}}类型作业</h4>-->
<!--						<div style='font-size: 12px; overflow: hidden;width:240px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>发起日期：{{item.originator_date}}</div>-->
<!--						<div style='font-size: 12px; overflow: hidden;width:240px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>事件种类：{{item.item}}</div>-->
<!--						<p>事件部门：<span>{{item.app_dep_name}}</span></p>-->
<!--						<p>事件状态：<span>{{item.phase}}</span></p>-->
<!--					</div>-->
<!--				</div>-->
<!--		</transition-group>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				piclist: null,
				allPiclist: null,
				piclistNum: 2,
				arr: 0,
				//文件图片配置
				config: [
					{
						position: "absolute",
						width: "134px",
						height:'129px',
						top: "0px",
						left: "10px",
						opacity: 0.2,
						zIndex: 2,
						transition: "500ms",
					},
					{
						position: "absolute",
						width: "134px",
						height:'129px',
						top: "0px",
						left: "30px",
						opacity: 1,
						zIndex: 4,
						transition: "500ms"
					},
					{
						position: "absolute",
						width: "134px",
						height:'129px',
						top: "0px",
						left: "50px",
						opacity: 0.2,
						zIndex: 2,
						transition: "500ms"
					}
				],
				config2:{
					position: "absolute",
					width: "134px",
					height:'129px',
					top: "0px",
					left: "30px",
					opacity: 1,
					zIndex: 4,
					transition: "500ms"
				},
				previous: 0,
				now: Date.now()
			};
		},
		methods: {
			//实现点击按钮切换的动画，设置时间参数防止多次点击
			turnright() {
				if (!this.allPiclist) {
					return;
				}
				if(this.arr+3 > this.allPiclist.length){
					this.arr = 0
				}
				this.piclist = this.allPiclist.slice(1 + this.arr, 4 + this.arr);
				this.config.unshift(this.config.pop());
				this.previous = this.now;
				this.arr++
			},
			// turnright: function() {
			// 	this.now = Date.now();
			// 	if (this.now - this.previous > 1000) {
			// 		this.piclist.unshift(this.piclist.pop());
			// 		// this.config.push(this.config.shift());
			// 		this.previous = this.now;
			// 	}
			// },
			getData() {
				let data = {
					caseType : 4,
					dateType : 'day'
				}
				this.$http.get("/largeScreen/normalState/hazardIdentification",data).then(res => {
					if(res.data.code == 1){
						this.piclist = res.data.data.dateList
						this.piclistNum = res.data.data.num;
						console.log(this.piclist);
					}
					this.allPiclist = res.data.data.dateList;
					this.piclist = res.data.data.dateList.slice(0, 3)
				});
			},
		},
		mounted(){
			// setInterval(()=>{
			// 	this.turnright();
			// },10000)
		},
		created(){
			this.getData()
		}
	};
</script>

<style lang='stylus' scoped>
	#wrapper {
		font-family: "MicrosoftYaHei-Bold";
 		font-weight:bold;
		margin 45px 30px 0 20px
		height: 160px;
		width: 250px;
		top: -15px;
		position: relative;
		ul {
			list-style: none;
		}
		li{
			width: 245px;
			height: 108px;
			text-align: left;
			.item-every{
				width: 245px;
				height: 130px;
				color: #fff;
				padding: 5px;
				background-image: url('./img/bg.png');
				background-repeat no-repeat
				background-size: 100% 100%;
				display flex
				h4{
					color: #00FFFF;
					font-size: 16px;
					margin-left: 70px;
				}
				p{
					font-size: 14px;
					margin-bottom: 3px;
				}
			}
		}
	}

	.prev,
	.next {
		position: absolute;
		height: 129px;
		width: 85px;
		top: 0;
		margin-top: 0;
		overflow: hidden;
		text-decoration: none;
		z-index: 5;
		opacity: 1;
		img{
			width: 105%;
		}
	}
	.prev {
		left: 23px;
	}
	.next {
		right: 35px;
	}
	/*.picleft {*/
	/*	width: 400;*/
	/*	top: 20;*/
	/*	left: 50;*/
	/*	z-index: 2;*/
	/*}*/
	/*.piccenter {*/
	/*	width: 800;*/
	/*	top: 100;*/
	/*	left: 200;*/
	/*	opacity: 1;*/
	/*	z-index: 4;*/
	/*}*/
	/*.picright {*/
	/*	width: 400;*/
	/*	top: 20;*/
	/*	left: 750;*/
	/*	z-index: 2;*/
	/*}*/
</style>
<style lang="stylus">
	.my-wrapper2
		.slick-list
			.item-every{
				width: 245px;
				height: 130px;
				color: #fff;
				padding: 5px;
				background-image: url('./img/bg.png');
				background-repeat no-repeat
				background-size: 100% 100%;
				display flex
				h4{
					color: #00FFFF;
					font-size: 16px;
					margin-left: 70px;
				}
				p{
					font-size: 14px;
					margin-bottom: 3px;
				}
			}
</style>
