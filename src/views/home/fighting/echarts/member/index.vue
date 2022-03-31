<template>
	<div class="organization">
		<div class="bottom">
			<div v-if="$store.state.ertList.length > 0" class="store-list">
				<div class="listItem">
					<div  style="width:30%">角色</div>
					<div>姓名</div>
					<div>等级</div>
					<div>电话</div>
				</div>

				<div id="box">
					<div id="con1"
					     ref="con1"
					     :class="{anim:animate===true}"
					     :style="{'margin-top':marginTop}">
						<div class="list" v-for="(item,index) in $store.state.ertList" :key="index">
							<span  style="width:40%">{{item.departmentName}}</span>
							<span style="width:25%">{{item.userName}}</span>
							<span>{{item.roleName}}</span>
							<span>{{item.phone}}</span>
						</div>
					</div>
				</div>

			</div>
			<div v-else class="bottom-img">
				<img src="../../../../../assets/home/fighting/无数据.png" alt="">
				<div>暂无数据</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: "index",
		components: {},
		data() {
			return {
				animate: false,
				marginTop: '-50px',
				aaa:null,
			};
		},
		methods: {
			//列表滚动
			scroll() {
				if(this.$store.state.ertList.length < 1) return
				this.marginTop = "-50px";
				this.animate = !this.animate;
				let that = this;
				setTimeout(function () {
					that.$store.state.ertList.push(that.$store.state.ertList[0]);
					that.$store.state.ertList.shift();
					that.marginTop = "0px";
					that.animate = !that.animate;
				}, 500);
			}
		},
		mounted() {
			this.timer1 = setInterval(this.scroll, 3000);
		},
		beforeDestroy() {
			clearInterval(this.timer1)
		}
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
	#box {
		width: 100%;
		height: 150px;
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
		height: 43px;
		line-height 35px
		display: flex;
		/*background-color: #42b983;*/
		margin-bottom: 10px;
		justify-content: space-between;

		span {
			width: 33.3%;
			margin:auto 0;
			line-height:17px;
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

	.organization {
		font-family: "MicrosoftYaHei-Bold";
		font-weight: bold;
		width: 100%;
		height: 230px;
		position: relative;
		left: 0;
		top: 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.top {
			width 100%
			height 50px
			margin: 40px 30px 0 20px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
		}

		.bottom {
			width 100%
			height 220px
			margin: 25px 30px 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
			flex-wrap: nowrap;
			.bottom-img{
				width 100%
				padding 11% 0 0 0 
				text-align: center
			}

			.store-list {
				width: 100%;
				height: 220px;
				/*background:rgba(0, 255, 255,.2) ;*/

				.listItem {
					width: 100%;
					height: 30px;
					color: #00FFFF;
					padding-top: 2px;
					min-height: unset;
					margin-bottom: 2px;
					/*border: 1px solid #00FFFF;*/
					display: flex;
					justify-content: space-around;
					align-self: center;

					div {
						font-size: 19px;
						font-weight: bold;
						width 25%;
						text-align center
					}
				}
			}

		}

	}
</style>
