<template>
	<div class="solid">
		<div class='success'>
			<div class='top-text'> 授权数量</div>
			<PhosphoricAcid1 :staffCount="22222222" :title="'hello'" :contractorCount="contractorCount.success" style="padding-left:20px"/>
			<div class="buttom-text">
				<img src="./img/方块1.png" alt="">
				<span style="padding-left:5px"> 承揽商   {{contractorCount.successPercent}}%   {{contractorCount.success}}</span>
			</div>
			<div class="buttom-text">
				<img src="./img/方块2.png" alt="">
				<span style="padding-left:5px"> 员工  </span>
				<span style="color:#00000000">员</span>
				<span> {{staffCount.successPercent}}%   {{staffCount.success}}</span>
			</div>
		</div>
		<div class='success'>
			<div class='top-text'>取消授权数量</div>
			<Photoresist1 style="padding-left:20px"/>
			<div class="buttom-text">
				<img src="./img/方块1.png" alt="">
				<span style="padding-left:5px"> 承揽商   {{contractorCount.cancelPercent}}%   {{contractorCount.cancel}}</span>
			</div>
			<div class="buttom-text">
				<img src="./img/方块2.png" alt="">
				<span style="padding-left:5px"> 员工  </span>
				<span style="color:#00000000">员</span>
				<span> {{staffCount.cancelPercent}}%   {{staffCount.cancel}}</span>
			</div>
		</div>
		<div class='success'>
			<div class='top-text'>授权失败数量</div>
			<Isopropanol1 v-bind:title="'测试标题'" style="padding-left:20px"/>
			<div class="buttom-text">
				<img src="./img/方块1.png" alt="">
				<span style="padding-left:5px"> 承揽商   {{failAuthorizationCount.contractorPercent}}%   {{failAuthorizationCount.contractor}}</span>
			</div>
			<div class="buttom-text">
				<img src="./img/方块2.png" alt="">
				<span style="padding-left:5px"> 员工  </span>
				<span style="color:#00000000">员</span>
				<span> {{failAuthorizationCount.staffPercent}}%   {{failAuthorizationCount.staff}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Photoresist1 from "./photoresist1";
	import Isopropanol1 from "./isopropanol1";
	import PhosphoricAcid1 from "./phosphoricAcid1";

	export default {
		name: "index",
		components: {
			Photoresist1,
			Isopropanol1,
			PhosphoricAcid1
		},
		data() {
			return {
				pointerBtn: 1,
				failAuthorizationCount: {
					contractor: 0,
					staff: 0,
					contractorPercent:0,
					staffPercent:0
				},
				contractorCount: {
					cancel: 0,
					success: 0,
					cancelPercent:0,
					successPercent:0
				},
				staffCount: {
					cancel: 0,
					success: 0,
					cancelPercent:0,
					successPercent:0
				}
			};
		},
		methods: {
			solidBtnN1() {
				this.pointerBtn = 1
			},
			solidBtnN2() {
				this.pointerBtn = 2
			},
			getData(){
				this.$http.get("/largeScreen/normalState/getAuthorization",{}).then(res => {
					if (res) {
						let data = res.data.data;
						this.failAuthorizationCount.contractor = data.failAuthorizationCount.contractor;
						this.failAuthorizationCount.staff = data.failAuthorizationCount.staff;
						let total1 = data.failAuthorizationCount.contractor + data.failAuthorizationCount.staff;
						this.failAuthorizationCount.contractorPercent = total1 === 0 ? 0 : (data.failAuthorizationCount.contractor / total1).toFixed(2) * 100
						this.failAuthorizationCount.staffPercent = total1 === 0 ? 0 : (data.failAuthorizationCount.staff / total1).toFixed(2) * 100

						this.contractorCount.cancel = data.contractorCount.cancel;
						this.contractorCount.success = data.contractorCount.success;
						let total2 = data.contractorCount.success + data.staffCount.success;
						let total3 = data.contractorCount.cancel + data.staffCount.cancel;
						this.contractorCount.successPercent = total2 === 0 ? 0 : (data.contractorCount.success / total2).toFixed(2) * 100
						this.contractorCount.cancelPercent = total3 === 0 ? 0 : (data.contractorCount.cancel / total3).toFixed(2) * 100

						this.staffCount.cancel = data.staffCount.cancel;
						this.staffCount.success = data.staffCount.success;
						let total5 = data.staffCount.cancel + data.contractorCount.cancel;
						let total4 = data.staffCount.success + data.contractorCount.success
						this.staffCount.cancelPercent = total5 === 0 ? 0 : (data.staffCount.cancel / total5).toFixed(2) * 100
						this.staffCount.successPercent = total4 === 0 ? 0 : (data.staffCount.success / total4).toFixed(2) * 100
					}
				});
			}
		},
		mounted() {
			this.getData()
		}
	};
</script>


<style lang="stylus" scoped>

	.solid {
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
		padding: 49px 0 0 0;

		.success {
			width: 31.5%;
			height: 278px
			color #fff
			.top-text {
				font-size: 22px;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #36ECFF;
			}

			.buttom-text {
				padding: 0 0 0 25px
				display flex
				justify-content: flex-start
				font-size: 14px;
				white-space: pre;
				font-family: Microsoft YaHei;
				font-weight: bold;
			}
		}
	}
</style>
