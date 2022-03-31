
<template>
	<div id="wrapper">
		<div class="item-text" v-if="piclistNum == 3" >
				今日特殊工单已全部合规校验
		</div>
		<transition-group name="list" tag="ul" mode="out-in" v-if="piclistNum == 2" >
			<li v-for="(item,index) in piclist" :key="index+10" :style="config2">
				<div class="item-every">
					<div>
						<h4>{{item.applyOperationName}}类型作业</h4>
						<div style='font-size: 12px; overflow: hidden;width:240px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>工单名称：{{item.applyCname}}</div>
						<div style='font-size: 12px; overflow: hidden;width:240px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>承揽商：{{item.guardName}}</div>
						<p>作业人数：<span>{{item.worker}}</span></p>
						<p>作业日期：<span>{{item.workDate}}</span></p>
					</div>
					<p>{{item.workType}}</p>
				</div>
			</li>
		</transition-group>
		<transition-group name="list" tag="ul" mode="out-in" v-if="piclistNum == 1" >
			<li v-for="(item,index) in piclist" :key="index+10" :style="config2">
				<div class="item-every">
					<div>
						<h4>{{item.applyOperationName}}类型作业</h4>
						<div style='font-size: 12px; overflow: hidden;width:240px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>工单名称：{{item.applyCname}}</div>
						<div style='font-size: 12px; overflow: hidden;width:240px;height:20px;white-space: nowrap;text-overflow: ellipsis;'>承揽商：{{item.guardName}}</div>
						<p>作业人数：<span>{{item.worker}}</span></p>
						<p>作业日期：<span>{{item.workDate}}</span></p>
					</div>
					<p>{{item.workType}}</p>
				</div>
			</li>
		</transition-group>
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
				this.$http.get("/largeScreen/normalState/orderDetail").then((res) => {
					if(res.data.data.length == 1){
						this.piclist = res.data.data
						this.piclistNum = 1
					}
					this.allPiclist = res.data.data;
					this.piclist = res.data.data.slice(0, 3)
					if(res.data.data.length == 0){
						this.piclistNum = 3
					}
				});
			},
		},
		mounted(){
			this.getData()
			setInterval(()=>{
				this.turnright();
			},10000)
		}
	};
</script>

<style lang='stylus' scoped>
	#wrapper {
		font-family: "MicrosoftYaHei-Bold";
 		font-weight:bold;
		margin: auto;
		height: 160px;
		width: 295px;
		top: -15px;
		position: relative;
		.item-text{
			font-size: 18px;
			font-weight: bold;
			padding:50px 0 0  3px;
		}
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
				/*background-image: url('./img/bg.png');*/
				background-repeat no-repeat
				background-size: 100% 100%;
				background-color #103B43
				border-radius 3px
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
