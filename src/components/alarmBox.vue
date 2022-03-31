<template>
	<div v-if="list.length > 0" class="alarm-box">
		<a-button class="my-btn-all" @click="showAllList = true">查看全部</a-button>
		<div class="all-alarm" v-show="showAllList">
			<div class="close-btn">
				<a-icon type="close-circle" style="font-size: 30px" @click="showAllList = false"/>
			</div>
			<a-table
				id="my-table"
				:columns="columns"
				:rowClassName="tableRowClass"
				:data-source="baseFaceList"
				:pagination="pagination" bordered @change="handleTableChange" rowKey="id">
				<template slot="cnPosition" slot-scope="scope">
					<span style="color: #36ecff;cursor: pointer;margin-right: 10px" @click="checkAndClose(scope)">
						查看
					</span>
					<span v-if="scope.disposalState !== '3'"
						  style="color: rgba(255,255,0,0.9);cursor: pointer;margin-right: 10px"
						  @click="confirmAlarmMessage(scope)">
						确认
					</span>
					<span v-else style="color: rgb(150, 150, 150);cursor: not-allowed">
						已确认
					</span>
				</template>
				<template slot="myLevel" slot-scope="scope">
					<span v-if="scope.alarmLevel === 1" class="bgc-span" style="background-color: #ff0000">1</span>
					<span v-if="scope.alarmLevel === 2" class="bgc-span" style="background-color: #f86300">2</span>
					<span v-if="scope.alarmLevel === 3" class="bgc-span" style="background-color: #33B5FF">3</span>
				</template>
			</a-table>
		</div>
		<div class="roll">
			<div class="box" :class="{marquee_top:animate}">
				<div class="contents" v-for="(item, index) in list" :key="index">
					<div style="display: flex;align-items: center;padding-left: 5px">
						<img src="../assets/3D/alarm.gif" alt="" width="35">
						<div class="text"><span
							class="building">{{item.cnTime}}&nbsp;&nbsp;{{item.cnBuilding}}#{{item.cnFloor}}</span>
							<span class="alarm-name">{{item.cnTypes}}({{item.cnPosition}})</span></div>
					</div>
					<div style="display: flex;justify-content: flex-end;align-items: center">
						<div class="check-btn" @click="checkDetails(item)">查看</div>
					</div>
				</div>
			</div>
		</div>
		<div class="big-image" v-show="showBigImage">
			<img :src="bigImage" alt="" width="100%">
			<a-button id="close-image" @click="closeBigImage">关闭</a-button>
		</div>
	</div>
</template>

<script>
	import SockJS from "sockjs-client";
	import Stomp from "stompjs";
	import {getSingleDevice} from '../common/3D/factory'

	export default {
		name: "alarmBox",
		data() {
			return {
				list: [],
				showBigImage: false,
				getListTimer: null,
				bigImage: '',
				top: 0,
				timer: null,
				animate: false,
				showAllList: false,
				setInTime: '', // 定时器,
				dictionaryList: [],
				cnTextList: [],
				columns: [
					{
						title: '序号',
						dataIndex: 'index',
						width: 80,
						key: 'index',
						customRender: (text, record, index) => `${index + 1}`
					},
					{title: '告警类型', dataIndex: 'cnTypes', key: 'visitorName', ellipsis: true},
					{title: '告警楼栋', width: 120, dataIndex: 'cnBuilding', key: 'visitorCompany', ellipsis: true},
					{title: '告警楼层', width: 120, dataIndex: 'cnFloor', key: 'openType', ellipsis: true},
					{title: '告警等级', width: 120, scopedSlots: {customRender: 'myLevel'}},
					{title: '告警位置', width: 280, dataIndex: 'cnPosition', key: 'doorPoint', ellipsis: true},
					{title: '告警时间', dataIndex: 'almTime', key: 'distributionTime', ellipsis: true},
					{title: '确认时间', dataIndex: 'confirmTime', key: 'confirmTime', ellipsis: true},
					{title: '操作', width: 140, scopedSlots: {customRender: 'cnPosition'}}
				],
				baseFaceList: [],
				pagination: {
					total: 0,
					pageNum: 1,
					current: 1,
					pageSize: 10,//每页中显示10条数据
					// showSizeChanger: true,
					showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
					showQuickJumper: true
				}
			}
		},
		created() {
			//获取楼栋字典列表数组
			let data = {
				"dictNum": "building",
			}
			this.$http.get2("/sys/dict/cf", data).then(res => {
				this.dictionaryList = res.data.data
			});
			this.$http.get2("/sys/dict/cf", {"dictNum": 'alarm_category'}).then(res => {
				this.cnTextList = res.data.data
			});
		},
		methods: {
			closeBigImage() {
				this.showBigImage = false;
				// this.showAllList = true;
			},
			async checkDetails(item) {
				console.log(item)
				// 如果是未处理的告警类型，则不提供查看功能
				if(item.category === "alarm_category_perimeter" || item.category === 'chemical_alarm_tank_reserve' || item.category === 'chemical_warning_tank_reserve') return;
				if (item.category === 'alarm_category_stranger' || item.category === 'alarm_category_aiidentify') {
					if (item.alarmOriginalPic) {
						this.bigImage = item.alarmOriginalPic;
					} else {
						this.bigImage = item.almImgUrl
					}
					this.showBigImage = true;
				} else if(item.category === 'alarm_category_gdorleak'){
					this.showAllList = false;
					if(item.types.includes('gd_alarm')){// 如果是gd的告警
						let obj = {
							"building": item.almBuilding,
							"deviceNum": item.modelEquipNo,
							"floor": item.almFloor,
						};
						let result = await getSingleDevice(this,obj);
						item.position = result.data.data.position
					}
					this.$emit('getEventFromChild', item)
				}else {
					this.showAllList = false;
					this.$emit('getEventFromChild', item)
				}
			},

			checkAndClose(item) {
				this.checkDetails(item);
				// this.showAllList = false
			},

			// 类别类型转中文
			transferTypesToText(data, type, floor) {
				if (type === '1') {
					let res = this.dictionaryList.filter(item => {
						return item.dictNo === data
					})
					if (res.length > 0) {
						return res[0].dictName
					} else {
						return 'N/A'
					}
				} else if (type === '2') {
					let res = this.dictionaryList.filter(item => {
						return item.dictNo === data
					})
					if (res.length > 0) {
						return res[0].children
					} else {
						return 'N/A'
					}
				} else if (type === '3') {
					let res = this.dictionaryList.filter(item => {
						return item.dictNo === data
					})
					if (res.length > 0) {
						let result = res[0].children.filter(item => {
							return item.dictItemVal === floor
						})
						return result[0].dictName
					} else {
						return 'N/A'
					}
				}
			},
			// 报警类型字典值转换----
			alarmTransferText(parent, child) {
				let res = this.cnTextList.filter(item => {
					return item.dictNo === parent
				})
				if (res.length > 0) {
					let result = res[0].children.filter(item => {
						return item.dictItemVal === child
					})
					return result[0].dictName
				} else {
					return 'N/A'
				}
			},
			// 滚动告警列表
			showMarquee() {
				if (this.list.length > 0) {
					this.animate = true
					setTimeout(() => {
						this.list.push(this.list[0])
						this.list.shift()
						this.animate = false
					}, 3500)
				}
			},

			//分页器发生改变
			handleTableChange(pagination) {
				this.pagination.pageNum = pagination.current;
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
				this.getList()
			},

			// 告警确认
			confirmAlarmMessage(data) {
				this.$http.get2('/voice/confirm/alarm', {
					id: data.id,
					isCurrentBroadcast: data.isCurrentBroadcast
				}).then(res => {
					console.log(res)
					if (res.data.code === 1) {
						this.$message('success', '确认成功！');
						this.getList()
					} else {
						this.$message('error', res.data.msg)
					}
				})
			},

			getList() {
				this.$http.post2('/voice/query/alarm/today', {}).then(res => {
					let list = res.data.data;
					list.map(item => {
						item['cnBuilding'] = item.almBuilding ? this.transferTypesToText(item.almBuilding, '1') : '';
						item['cnFloor'] = item.almFloor ? this.transferTypesToText(item.almBuilding, '3', item.almFloor) : '';
						try {
							item['cnTime'] = item.almTime.split(' ')[1];
							let str = item.almLocaltion.split('_');
							item['cnPosition'] = (item.en === '' || !item.en) ? str[str.length - 1] : str[str.length - 1] + ' - ' + item.en;
							item['cnTypes'] = this.alarmTransferText(item.category, item.types)
						} catch (e) {
							//alarm_category_stranger
						}
					})
					this.baseFaceList = list;
				})
			},

			// 获取今日告警
			getAlarmList() {
				this.$http.post2('/voice/query/alarm/today', {}).then(res => {
					let list = res.data.data;
					list.map(item => {
						item['cnBuilding'] = item.almBuilding ? this.transferTypesToText(item.almBuilding, '1') : '';
						item['cnFloor'] = item.almFloor ? this.transferTypesToText(item.almBuilding, '3', item.almFloor) : '';
						try {
							item['cnTime'] = item.almTime.split(' ')[1];
							let str = item.almLocaltion.split('_');
							item['cnPosition'] = str[str.length - 1];
							item['cnTypes'] = this.alarmTransferText(item.category, item.types)
						} catch (e) {
							//alarm_category_stranger
						}
					})
					this.list = list;
				})
			},

			tableRowClass(record) {
				if (record.isCurrentBroadcast === '1') {
					return 'color-light'
				} else {
					if (record.disposalState === '3') {
						return 'color-gray'
					}
				}
				return ''
			},


			// 初始化websocket
			initWebSocket() {
				let url = this.$socket_xy;
				let socket = new SockJS(url + '/gs-guide-websocket', null, {timeout: 15000});
				try {
					this.stompClient = Stomp.over(socket);
					this.stompClient.connect({}, frame => {
						this.stompClient.subscribe('/topic/broadcast', msg => {
							if (JSON.parse(msg.body) === 'ALARM_SUCCESS_BROADCAST') {
								this.getAlarmList();
								this.getList()
							}
						})
					})
				} catch (e) {
				}
			},
			disconnect() {
				try {
					if (this.stompClient) {
						this.stompClient.disconnect();
					}
				} catch (e) {
				}
			},
		},
		mounted() {
			this.getAlarmList()
			this.setInTime = setInterval(this.showMarquee, 3000);
			// this.initWebSocket();
			this.getList()


			this.getListTimer = setInterval(() => {
				this.getAlarmList();
				this.getList()
			}, 5000)

		},
		beforeDestroy() {
			clearInterval(this.setInTime);
			clearInterval(this.getListTimer)
			this.disconnect()
		}
	}
</script>

<style lang="stylus" scoped>
	.big-image
		position fixed
		left 400px
		top 140px
		width 1120px
		min-height 600px
		max-height 800px
		padding 20px 20px 50px
		overflow hidden
		z-index 11111
		background-color #ffffff

		#close-image
			position absolute
			right calc(50% - 50px)
			bottom 10px
			z-index 11112
			width 100px

	.all-alarm
		position fixed
		left 210px
		top 190px
		width 1500px
		height 730px
		z-index 88
		background-color rgba(37, 46, 61, .9)
		padding 10px

		.close-btn
			position absolute
			right -15px
			top -15px
			cursor pointer

	.alarm-box
		width 800px
		display flex
		justify-content space-between
		align-items center

		.my-btn-all
			background-color: transparent;
			color: #01b7c2;
			border: 1px solid #01b7c2;
			border-radius: 4px;
			margin-top 20px;
			margin-right 10px

		.roll
			width 740px
			height 46px
			overflow-y hidden
			margin-top 16px
			padding 0 10px 0 0
			font-size 20px
			font-weight 500

			.contents
				height 46px
				display flex
				align-items center
				justify-content space-between
				text-align left
				font-size 20px
				background-image url("../assets/3D/alarm-bg2.png")
				background-repeat no-repeat
				background-size contain

				.text
					padding-left 10px
					max-width 510px
					overflow hidden
					white-space: nowrap;
					text-overflow: ellipsis;

				.alarm-name
					/*color #f11933*/
					color #fff

				.check-btn
					font-size 18px
					color rgba(255, 255, 0, 0.9)
					cursor: pointer;

		.marquee_top
			transition: all 0.5s linear;
			margin-top: -46px;
</style>
<style lang="stylus">
	#my-table
		tr
			font-size 18px

		.bgc-span
			padding 4px 15px
			border-radius 4px

		.ant-table-bordered .ant-table-thead > tr > th
			background-color #252e3d !important

		tr:hover td
			background-color: transparent !important

		.color-gray
			background-color: rgba(96, 207, 255, .2) !important

			td
				color rgb(150, 150, 150) !important

		.color-light
			/*background-color:red !important*/
			background-image url("../assets/header/alarm.png")
			background-repeat no-repeat
			background-size cover
			background-position center

		/*animation: glow 300ms linear infinite alternate;*/

		.ant-pagination-total-text, .ant-pagination-options-quick-jumper
			color #fff

	.close-btn
		position absolute
		right -15px
		top -15px

		.anticon-close-circle
			font-size 30px

	@keyframes glow {
		0% {
			border-color: #fd6969;
			box-shadow: 0 0 5px rgba(253, 105, 105, .2), inset 0 0 5px rgba(253, 105, 105, .1), 0 1px 5px #fd6969;
		}
		100% {
			border-color: #ff0000;
			box-shadow: 0 0 20px rgba(255, 0, 0, .6), inset 0 0 10px rgba(255, 0, 0, .4), 0 1px 5px #ff0000;
		}
	}
</style>

