<template>
	<div :class="!getStranger?'itemGD leak flash-before':'itemGD leak flash-after'">
		<div class="title">机台漏气/漏液监测</div>
		<div class="echarts">
			<div class="echarts-left">
				<GdEcharts />
			</div>
			<div class="echarts-left">
				<Leak />
			</div>
		</div>
		<div class="concentration" style="margin-top: -10px">
        	<div class="store-list">
				<div class="listItem">
					<span style='margin:0 20px 0 8px'>告警类型</span><span>告警楼层</span><span>设备编号</span><span>告警时间</span>
				</div>
				<div id="box">
					<div id="con1"
							ref="con1"
							:class="{anim:animate===true}"
							:style="{'margin-top':marginTop}">
						<div class="list" :style='{"background-color":item.color}' v-for="(item,index) in storeList" :key="index">
							<span>{{item.type}}</span>
							<span>{{item.build+'-'+item.floor}}</span>
							<span style="width: 135px;overflow: hidden;height:20px;white-space: nowrap;text-overflow: ellipsis;">{{item.equipNo}}</span>
							<span>{{item.almTime}}</span>
						</div>
					</div>
				</div>
			</div>
  	    </div>
	</div>
</template>

<script>
	import GdEcharts from '../left/echarts/gd'
	import Leak from '../left/echarts/leak'
	export default {
		name: "gdLeak",
		components:{
			GdEcharts,Leak
		},
		data() {
			return {
				pointerBtn: 1,
				animate: false,
				getStranger:false,
				marginTop: '-43px',
				data1: null,
				data2: null,
				data3: null,
				data4: null,
				storeList: null,
			};
		},
		// components:{
		// 	GdEcharts,Leak,
		// 	// 监听来自websocket的消息,告警闪烁
		// 	liveFace4(){
		// 		this.getStranger = true;
		// 		setTimeout(()=>{
		// 			this.getStranger = false;
		// 		},3000)
		// 	}
		// },
		methods: {
			//列表滚动
			scroll() {
				try {
					this.marginTop = "-36px";
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
      getDict(){
			  return this.$http.get2('/sys/dict/cf',{dictNum:'building'}).then(res => {
			    return res.data.data
        })
      },
			async getData() {
			  let result = await this.getDict();
        console.log(result)

        function formatBuild(build,floor) {
          let a = '';
          let b = '';
          result.map(item=>{
            if(item.dictNo === build){
              a = item.dictName;
              item.children.map(item => {
                if(item.dictItemVal === floor){
                  b = item.dictName
                }
              })
            }
          })
          return [a,b]
        }

				this.$http.post2("/bigscreen/query/grid/gl").then(res => {
          console.log(res)
					this.storeList = res.data.data.gridViewForGdOrLeakInfoList;
          this.storeList.map(item =>{
            item['build'] = formatBuild(item.location.split('&&')[0],item.location.split('&&')[1])[0];
            item['floor'] = formatBuild(item.location.split('&&')[0],item.location.split('&&')[1])[1]
          })
					for (let i in this.storeList) {
						if (i % 2 === 0) {
							this.storeList[i].color = '#0D3239'
						} else {
							this.storeList[i].color = '#2D1119'
						}
					}
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
	}
</script>

<style lang="stylus" scoped>
#box {
		width: 100%;
		height: 98px;
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
		margin-bottom: 8px;
		justify-content: space-between;
		span{
			width: 33.3%;

		}
	}
	.itemGD
		width 100%
		height 283px
		position relative
		.title
			position absolute
			top -14px
			left 25px
			font-size 22px
			font-weight bold
			color #36ECFF
		.echarts
			height 148px
		.concentration {
			width 100%
			height 110px
			padding: 0 30px 0 23px;
			display: flex;
			align-content: center;
			justify-content: flex-start;
			flex-wrap:nowrap;
			.store-list{
				width: 100%;
				height: 110px;
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
	.flash-before
		background-image url("../../../assets/home/middle/人脸识别实时监测.png")
		background-repeat no-repeat
	.flash-after
		background-image url("../../../assets/home/middle/flash.gif")
	.leak
		.echarts
			display flex
			.echarts-left
				width 50%
				height 148px
</style>
