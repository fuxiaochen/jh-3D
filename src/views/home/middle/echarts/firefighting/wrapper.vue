
<template>
	<div id="wrapper">
		<transition-group name="list" tag="ul" mode="out-in">
			<li v-for="(item,index) in piclist" :key="index+10" :style="config[index]">
				<div class="item-every">
					<div>
						<h4>高处类型作业</h4>
						<p>工单名称：<span>{{item.applyCname}}</span></p>
						<p>承揽商：<span>{{item.guardName}}</span></p>
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
						opacity: 0.1,
						zIndex: 2,
						transition: "500ms"
					}
				],
				previous: 0,
				now: Date.now()
			};
		},
		methods: {
			//实现点击按钮切换的动画，设置时间参数防止多次点击
			turnleft: function() {
				this.now = Date.now();
				if (this.now - this.previous > 1000) {
					this.config.push(this.config.shift());
					this.previous = this.now;
				}
			},
			turnright: function() {
				this.now = Date.now();
				if (this.now - this.previous > 1000) {
					this.config.unshift(this.config.pop());
					this.previous = this.now;
				}
			},
			getData() {
      this.$http.get("/largeScreen/normalState/orderDetail").then((res) => {
        this.piclist = res.data.data;
      });
    },
		},
		mounted(){
			setTimeout(()=>{
				this.turnright();
			},10000)
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
		margin: auto;
		height: 160px;
		width: 295px;
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
				padding: 5px;
				background-image: url('./img/bg.png');
				background-repeat no-repeat
				background-size: 100% 100%;
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
