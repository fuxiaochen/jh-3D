<template>
	<div class="organization">
		<div class="top">
			<a-select
				label-in-value
				style="width: 130px;height:30px;font-weight: bold;"
				@change="handleChange"
				:default-value="{ key: provinceData[0].name }"
				placeholder="请选择部门"
			>
				<a-select-option v-for="item in provinceData" :key="item.name" :value="item.value">
					{{ item.name }}
				</a-select-option>
			</a-select>
		</div>
		<div class="bottom">
			<div class="store-list">
				<div class="listItem">
					<span style='margin:0 20px 0 10px'>角色</span><span>人员</span><span style='margin:0 0 0 20px'>部门</span><span>分机号</span>
				</div>
				<div id="box">
					<div id="con1"
					     ref="con1"
					     :class="{anim:animate===true}"
					     :style="{'margin-top':marginTop}">
						<div class="list" :style='{"background-color":item.color}' v-for="(item,index) in storeList"
						     :key="index">
							<span>{{item.roleName}}</span>
							<span>{{item.staff}}</span>
							<span>{{item.depart_name}}</span>
							<span>{{item.extension_number}}</span>
						</div>
					</div>
				</div>
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
				defaultValue: 0,
				provinceData: [
					{
						name: '公司ERT',
						value: 0
					},
					{
						name: '研发栋ERT',
						value: 1
					},
					{
						name: '生产车间ERT',
						value: 2
					},
					{
						name: '综合动力站ERT',
						value: 3
					}
				],
				pointerBtn: 1,
				animate: false,
				marginTop: '0px',
				storeList: null,
			};
		},
		methods: {
			handleChange(value) {
				this.storeList = [];
				clearInterval(this.timer1)
				this.defaultValue = value.key;
				this.getData()
			},
			getData() {
				// this.$http.post("/largeScreen/normalState/orgList").then((res) => {
				// 	this.provinceData = res.data.data;
				// 	this.defaultValue = {};
				// 	this.defaultValue.key = res.data.data[0].orgNo;
				// 	this.defaultValue.name = res.data.data[0].orgName;
				//
				// });

				this.$http.get("/largeScreen/normalState/ertOrgMembers", {"organizationType": this.defaultValue}).then((res) => {
					if (res) {
						let data = res.data.data;
						let arr = [];
						for (const k in data) {
							if (data[k].length > 0) {
								data[k].forEach(item => {
									arr.push(item)
								})
							}
						}
						this.storeList = arr;
						if (arr.length > 3) {
							this.timer1 = setInterval(this.scroll, 1500);
						}
						for (let i in this.storeList) {
							if (i % 2 === 0) {
								this.storeList[i].color = '#0D3239'
							} else {
								this.storeList[i].color = '#2D1119'
							}
						}
					}
				});
			},
			//列表滚动
			scroll() {
				try {
					this.marginTop = "-40px";
					this.animate = !this.animate;
					let that = this;
					setTimeout(function () {
						that.storeList.push(that.storeList[0]);
						that.storeList.shift();
						that.marginTop = "0px";
						that.animate = !that.animate;
					}, 500);
				} catch (e) {
				}

			},
			solidBtnN1() {
				this.pointerBtn = 1
			},
			solidBtnN2() {
				this.pointerBtn = 2
			}
		},
		mounted() {

		},
		created() {
			this.getData()
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
		height: 145px;
		line-height: 28px;
		overflow: hidden;
		/*background-color: #FFDAB9;*/
		transition: all 0.5s ease-in-out;
	}

	.anim {
		transition: all 0.5s ease-in-out;
	}

	#con1 .list {
		width: 100%;
		height: 28px;
		display: flex;
		/*background-color: #42b983;*/
		margin-bottom: 12px;
		justify-content: space-between;

		span {
			width: 33.3%;

		}
	}

	.organization {
		color: #ffffff;
		font-family: "MicrosoftYaHei-Bold";
		font-weight: bold;
		width: 100%;
		height: 240px;
		position: relative;
		left: 0;
		top: 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.top {
			width 100%
			height 20px
			margin: 40px 30px 0 20px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
		}

		.bottom {
			width 100%
			height 120px
			margin: 0 30px 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
			flex-wrap: nowrap;

			.store-list {
				width: 100%;
				height: 120px;
				/*background:rgba(0, 255, 255,.2) ;*/

				.listItem {
					width: 100%;
					height: 28px;
					color: #00FFFF;
					padding-top: 2px;
					min-height: unset;
					margin-bottom: 2px;
					/*border: 1px solid #00FFFF;*/
					display: flex;
					justify-content: space-around;
					align-self: center;

					span {
						font-size: 16px;
					}
				}
			}

		}

	}
</style>
