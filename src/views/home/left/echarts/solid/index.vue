<template>
	<div class="solid">
		<button class="solid-btn2" :class="{'active': pointerBtn ===1 }" @click="solidBtnN1">A1</button>
		<button class="solid-btn" :class="{'active': pointerBtn ===2 }" @click="solidBtnN2">A2</button>
		<div class="itemSolid photoresist">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_49HF_LIA51:wasteObj.N2CDS_F2L10_U0201_LIA51A}}L</div>
				<Photoresist :value="HF" :pointer="pointerBtn"/>
			</div>
			<div class="photoresist-text">氢氟酸<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_49HF_LIA51 / 12000).toFixed(2)*100:(wasteObj.N2CDS_F2L10_U0201_LIA51A / 15000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
		<div class="itemSolid isopropanol">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_NH4OH_LIA51:wasteObj.N2CDS_F2L10_U1101_LIA51A}}L</div>
				<Isopropanol :value="NH4OH" :pointer="pointerBtn"/>
			</div>
			<div class="isopropanol-text">氨水<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_NH4OH_LIA51 / 15000).toFixed(2)*100:(wasteObj.N2CDS_F2L10_U1101_LIA51A / 12000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
		<div class="itemSolid EKC">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_H2O2_LIA51:wasteObj.N2CDS_C1L10_U1401_LIA51A}}L</div>
				<Ekc :value="H2O2" :pointer="pointerBtn"/>
			</div>
			<div class="ekc-text">双氧水<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_H2O2_LIA51 / 15000).toFixed(2)*100:(wasteObj.N2CDS_C1L10_U1401_LIA51A / 12000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
		<div class="itemSolid HF">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_H2SO4_LIA51:wasteObj.N2CDS_F2L10_U0101_LIA51A}}L</div>
				<HF :value="H2SO4" :pointer="pointerBtn"/>
			</div>
			<div class="photoresist-text">硫酸<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_H2SO4_LIA51 / 18000).toFixed(2)*100:(wasteObj.N2CDS_F2L10_U0101_LIA51A / 15000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
		<div class="itemSolid phosphoricAcid">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_WPGMEA_LIA01:wasteObj.N2CDS_F2C1_W04_LIA11}}L</div>
				<PhosphoricAcid :value="WPGMEA" :pointer="pointerBtn"/>
			</div>
			<div class="photoresist-text">废光阻<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_WPGMEA_LIA01 / 15000).toFixed(2)*100:(wasteObj.N2CDS_F2C1_W04_LIA11 / 15000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
		<div class="itemSolid nitricAcid">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_WEKC265_LIA01:wasteObj.N2CDS_F2L10_W06_LIA11A}}L</div>
				<NitricAcid :value="WEKC265" :pointer="pointerBtn"/>
			</div>
			<div class="photoresist-text">废去光阻<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_WEKC265_LIA01 / 25000).toFixed(2)*100:(wasteObj.N2CDS_F2L10_W06_LIA11A / 8000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
		<div class="itemSolid copperSulphate">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_WH3PO4_LIA01:wasteObj.N2CDS_F2L10_W01_LIA11}}L</div>
				<CopperSulphate :value="WH3PO4" :pointer="pointerBtn"/>
			</div>
			<div class="isopropanol-text">废磷酸<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_WH3PO4_LIA01 / 12000).toFixed(2)*100:(wasteObj.N2CDS_F2L10_W01_LIA11 / 8000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
		<div class="itemSolid sulphuricAcid">
			<div>
				<div class="photoresist-top">{{pointerBtn === 1 ? wasteObj.N1GC_CDS_WHF_LIA01:wasteObj.N2CDS_F2L10_W03_LIA11}}L</div>
				<SulphuricAcid :value="WHF" :pointer="pointerBtn"/>
			</div>
			<div class="photoresist-text">废氢氟酸<br>
				{{(pointerBtn === 1 ? (wasteObj.N1GC_CDS_WHF_LIA01 / 12000).toFixed(2)*100:(wasteObj.N2CDS_F2L10_W03_LIA11 / 12000).toFixed(2)*100).toFixed(0)}}%
			</div>
		</div>
	</div>
</template>

<script>
	import Photoresist from "./photoresist";
	import Isopropanol from "./isopropanol";
	import Ekc from "./ekc";
	import HF from "./hf";
	import PhosphoricAcid from "./phosphoricAcid";
	import NitricAcid from "./nitricAcid";
	import CopperSulphate from "./copperSulphate";
	import SulphuricAcid from "./sulphuricAcid";

	export default {
		name: "index",
		components: {
			Photoresist,
			Isopropanol,
			Ekc,
			HF,
			PhosphoricAcid,
			NitricAcid,
			CopperSulphate,
			SulphuricAcid,
		},
		data() {
			return {
				pointerBtn: 1,
				wasteObj:{
					N1GC_CDS_49HF_LIA51:0,
					N1GC_CDS_NH4OH_LIA51:0,
					N1GC_CDS_H2O2_LIA51:0,
					N1GC_CDS_H2SO4_LIA51:0,
					N1GC_CDS_WPGMEA_LIA01:0,
					N1GC_CDS_WEKC265_LIA01:0,
					N1GC_CDS_WH3PO4_LIA01:0,
					N1GC_CDS_WHF_LIA01:0,

					N2CDS_F2L10_U0201_LIA51A:0,
					N2CDS_F2L10_U1101_LIA51A:0,
					N2CDS_C1L10_U1401_LIA51A:0,
					N2CDS_F2L10_U0101_LIA51A:0,
					N2CDS_F2C1_W04_LIA11:0,
					N2CDS_F2L10_W06_LIA11A:0,
					N2CDS_F2L10_W01_LIA11:0,
					N2CDS_F2L10_W03_LIA11:0,
				}
			}
		},
		computed:{
			// 参数：获取到的读值-容量值-一阶告警-二阶告警
			HF() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_49HF_LIA51 + '-12000-8000-9000-2000-1500'
				} else {
					return this.wasteObj.N2CDS_F2L10_U0201_LIA51A + '-15000-11000-12000-3000-2500'
				}
			},
			NH4OH() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_NH4OH_LIA51 + '-15000-14000-14500-2500-2000'
				} else {
					return this.wasteObj.N2CDS_F2L10_U1101_LIA51A + '-12000-11000-11500-3000-2500'
				}
			},
			H2O2() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_H2O2_LIA51 + '-15000-14000-14500-3000-2000'
				} else {
					return this.wasteObj.N2CDS_C1L10_U1401_LIA51A + '-12000-11000-11500-3000-2500'
				}
			},
			H2SO4() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_H2SO4_LIA51 + '-18000-17500-17800-3500-2500'
				} else {
					return this.wasteObj.N2CDS_F2L10_U0101_LIA51A + '-15000-11000-12000-3000-2500'
				}
			},
			WPGMEA() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_WPGMEA_LIA01 + '-15000-13000-14000'
				} else {
					return this.wasteObj.N2CDS_F2C1_W04_LIA11 + '-15000-11000-12000'
				}
			},
			WEKC265() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_WEKC265_LIA01 + '-25000-13000-14000'
				} else {
					return this.wasteObj.N2CDS_F2L10_W06_LIA11A + '-8000-7000-7500'
				}
			},
			WH3PO4() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_WH3PO4_LIA01 + '-12000-10000-11000'
				} else {
					return this.wasteObj.N2CDS_F2L10_W01_LIA11 + '-8000-7000-7500'
				}
			},
			WHF() {
				if (this.pointerBtn === 1) {
					return this.wasteObj.N1GC_CDS_WHF_LIA01 + '-12000-10000-11000'
				} else {
					return this.wasteObj.N2CDS_F2L10_W03_LIA11 + '-12000-10000-11000'
				}
			}
		},
		methods: {
			solidBtnN1() {
				this.pointerBtn = 1
			},
			solidBtnN2() {
				this.pointerBtn = 2
			},
			getWasteData() {
				this.$http.post2('/chemical/page/dangerWaste', {"pageNum": 1, "pageSize": 100}).then(res => {
					let data = res.data.data.list;
					data.map(item => {
						for (const key in this.wasteObj) {
							if (item.tagName === key) {
								this.wasteObj[key] = item.labst.toFixed(0);
							}
						}
					})
					console.log(this.wasteObj)
				})
			}
		},
		mounted() {
			this.getWasteData()
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
		padding 30px 0 10px
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.solid-btn {
			width: 35px;
			height: 26px;
			position: absolute;
			top: 16px;
			right: 20px;
			background-color: #ffffff00
			font-weight: bold;
			border: 1px solid #36ECFF;
			border-radius: 3px;
			cursor pointer
		}

		.solid-btn2 {
			width: 35px;
			height: 26px;
			position: absolute;
			top: 16px;
			right: 60px;
			background-color: #ffffff00
			font-weight: bold;
			border: 1px solid #36ECFF;
			border-radius: 3px;
			cursor pointer
		}

		.active {
			color: #000000
			border 0
			background-color: #36ECFF
		}

		.photoresist {
			width: 95px;
			height: 105px;
			margin: 40px 10px 16px 36px;
			display: flex;
			flex-wrap: nowrap;
		}

		.isopropanol {
			width: 106px;
			height: 105px;
			margin: 40px 10px 16px 20px;
			display: flex;
			flex-wrap: nowrap;
		}

		.EKC {
			width: 125px;
			height: 105px;
			margin: 40px 10px 16px 20px;
			display: flex;
			flex-wrap: nowrap;
		}

		.HF {
			width: 95px;
			height: 105px;
			margin: 40px 10px 16px 40px;
			display: flex;
			flex-wrap: nowrap;
		}

		.phosphoricAcid {
			width: 95px;
			height: 105px;
			margin: 0 10px 16px 36px;
			display: flex;
			flex-wrap: nowrap;
		}

		.nitricAcid {
			width: 106px;
			height: 105px;
			margin: 0 10px 16px 20px;
			display: flex;
			flex-wrap: nowrap;
		}

		.copperSulphate {
			width: 125px;
			height: 105px;
			margin: 0 10px 16px 20px;
			display: flex;
			flex-wrap: nowrap;
		}

		.sulphuricAcid {
			width: 95px;
			height: 105px;
			margin: 0 10px 16px 40px;
			display: flex;
			flex-wrap: nowrap;
		}

		.photoresist-top {
			height: 25px;
			width: 57px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			color: #36ECFF;
			font-size: 14px;
			background-image: url('./img/deng.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: relative
			top: 2px;
			z-index: 8
		}

		.photoresist-text {
			height: 105px;
			width: auto;
			display: flex;
			align-items: center;
			font-weight: bold;
			color: #36ECFF;
			font-size: 16px;
		}

		.isopropanol-text {
			height: 105px;
			width: auto;
			font-weight: bold;
			display: flex;
			align-items: center;
			color: #36ECFF;
			font-size: 16px;
		}

		.ekc-text {
			height: 105px;
			width: 90px;
			display: flex;
			font-weight: bold;
			align-items: center;
			justify-content: flex-start;
			color: #36ECFF;
			font-size: 16px;
		}
		.itemSolid{
			width 130px
			margin 10px 10px 10px
		}
	}
</style>
