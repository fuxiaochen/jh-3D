<template>
  <div class="firefighting">
    <div class="monitor">
      <div class="monitor-three">
        <div class="monitor-text1">正常设备</div>
        <div class="monitor-text" style="color:#36ECFF">{{data2}}</div>
          <Normal />
        </div>
      <div class="monitor-three">
        <div class="monitor-text1">故障设备</div>
        <div class="monitor-text" style="color:#FF8F40">{{data4}}</div>
          <Malfunction />
        </div>
      <div class="monitor-three">
        <div class="monitor-text1">报警设备</div>
        <div class="monitor-text" style="color:#D34355">{{data1}}</div>
          <Alarms />
        </div>
      <div class="monitor-three">
        <div class="monitor-text1">屏蔽设备</div>
        <div class="monitor-text" style="color:#666666">{{data3}}</div>
          <Shield />
        </div>
    </div>
    <div class="concentration">
        <div class="store-list">
					<div class="listItem">
							<span style='margin:0 30px 0 8px'>区域</span><span>是否告警</span><span>告警时间</span>
					</div>
					<div id="box">
						<div id="con1"
						     ref="con1"
						     :class="{anim:animate===true}"
						     :style="{'margin-top':marginTop}">
							<div class="list" :style='{"background-color":item.color}' v-for="(item,index) in storeList" :key="index">
								<span>{{item.spot_location}}</span>
								<span>{{item.isWarning}}</span>
             				   <span>{{item.alm_time}}</span>
							</div>
						</div>
					</div>
				</div>
    </div>
  </div>
</template>

<script>
	import Normal from "./normal";
	import Shield from "./shield";
	import Alarms from "./alarms";
	import Malfunction from "./malfunction";
	import Wrapper from "./Wrapper";

	export default {
		name: "index",
		components: {
			Normal,
			Shield,
			Alarms,
			Malfunction,
			Wrapper,
		},
		data() {
			return {
				pointerBtn: 1,
				animate: false,
				marginTop: '-43px',
				data1: null,
				data2: null,
				data3: null,
				data4: null,
				storeList: null,
			};
		},
		methods: {
			//列表滚动
			scroll() {
				try {
					this.marginTop = "-43px";
					this.animate = !this.animate;
					let that = this;
					setTimeout(function () {
						that.storeList.push(that.storeList[0]);
						that.storeList.shift();
						that.marginTop = "0px";
						that.animate = !that.animate;
					}, 500);
				}catch (e) {
				}
			},
			solidBtnN1() {
				this.pointerBtn = 1
			},
			solidBtnN2() {
				this.pointerBtn = 2
			},
			getData() {
				this.$http.post("/largeScreen/normalState/fireAlarmDetectionStatic").then(res => {
					this.storeList = res.data.data.listData;

					for (let i in this.storeList) {
						if (i % 2 === 0) {
							this.storeList[i].color = '#0D3239'
						} else {
							this.storeList[i].color = '#2D1119'
						}
					}
					this.data1 = res.data.data.staticData[0].gdNum1
					this.data2 = res.data.data.staticData[0].gdNum9
					this.data3 = res.data.data.staticData[0].gdNum3
					this.data4 = res.data.data.staticData[0].gdNum2
				});
			},
		},
		mounted() {
			this.timer1 = setInterval(this.scroll, 1500);
			this.getData()
		},
		created() {
			this.getData()
		}
	};
</script>


<style lang="stylus" scoped>
#box {
		width: 100%;
		height: 125px;
		line-height: 30px;
		overflow: hidden;
		/*background-color: #FFDAB9;*/
		transition: all 0.5s ease-in-out;
	}
	.anim {
		transition: all 0.5s ease-in-out;
	}
	#con1 .list{
		width: 100%;
		height: 28px;
		display: flex;
		/*background-color: #42b983;*/
		margin-bottom: 15px;
		justify-content: space-between;
		span{
			width: 33.3%;

		}
	}

.firefighting {
	font-family: "MicrosoftYaHei-Bold";
  font-weight:bold;
  color: #FFFFFF;

  width: 100%;
  height: 240px;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .monitor{
    width 100%
    height 80px
    margin: 40px 30px 0 20px;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    .monitor-text{
      padding: 0 0 5px 10px
      width 100px;
      height 28px
      font-size:22px;
      font-family: "PangMenZhengDao";
      font-weight:normal
      color:#ffffff;
    }
    .monitor-text1{
      padding-left: 10px
      width 100px;
      height 28px
      font-weight:normal
      font-size:23px;
      font-family: "PangMenZhengDao";
      color:#ffffff;
    }
    .monitor-one{
      width 17px;
      height 67px
      font-size:16.5px;
      line-height: 17px;
      color:#36ECFF;
    }
    .monitor-two{
      display: flex;
      align-content: center;
      justify-content: center;
      padding: 0 15px 0 15px
    }
    .monitor-three{
      display: flex;
      align-content: center;
      text-align left;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 15px
    }
  }
  .concentration{
    width 100%
    height 120px
    margin: 0 30px 0 23px;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-wrap:nowrap;
    .store-list{
				width: 100%;
				height: 120px;
				/*background:rgba(0, 255, 255,.2) ;*/
				.listItem{
					width: 100%;
					height: 28px;
					color: #00FFFF;
					padding-top: 2px;
					min-height: unset;
					margin-bottom: 2px;
					/*border: 1px solid #00FFFF;*/
					display:flex;
					justify-content: space-around;
					align-self: center;
					span{
						color: #FFFFFF;
						font-size: 16px;
					}
				}
			}

  }

}
</style>
