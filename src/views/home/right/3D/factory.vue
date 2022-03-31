<template>
	<div class="factory">
		<div v-show="openDoorsSOS" class="open-door-sos">
			<a-button class="sos-btn" @click="openAllDoors(1)">门禁全开</a-button>
			<a-button class="sos-btn" @click="openAllDoors(0)">门禁全关</a-button>
		</div>
		<div class="alarm-contain">
			<AlarmBox @getEventFromChild="getChildData"/>
		</div>
		<div v-show="loading" class="loading-full-screen">
			<div class="my-model-load">正在载入，请稍后... {{currentLoad}}/{{totalLoad}}</div>
			<div class="sk-circle">
				<div class="sk-circle1 sk-child"></div>
				<div class="sk-circle2 sk-child"></div>
				<div class="sk-circle3 sk-child"></div>
				<div class="sk-circle4 sk-child"></div>
				<div class="sk-circle5 sk-child"></div>
				<div class="sk-circle6 sk-child"></div>
				<div class="sk-circle7 sk-child"></div>
				<div class="sk-circle8 sk-child"></div>
				<div class="sk-circle9 sk-child"></div>
				<div class="sk-circle10 sk-child"></div>
				<div class="sk-circle11 sk-child"></div>
				<div class="sk-circle12 sk-child"></div>
			</div>
		</div>

		<div id="video-window" v-show="videoItems.length > 0"></div>

		<div id="my-parking"></div>
		<div class="controls" :style="{top: right}">
			<div class="controls-box">
				<div class="floors" :style="{top:0}">
					<div v-for="(item,k) in floors" :class=" item.dictName === currentFloor ?'active-item':'item '"
						 @click="selectFloor(item,k)">{{item.dictName}}
					</div>
				</div>
			</div>
		</div>

		<div :class="!showHistory ? 'left-menu-floor hide-menu':'left-menu-floor'" id="left-menu-floor">
			<div>
				<a-menu
					style="width: 256px"
					:default-selected-keys="['1']"
					:open-keys.sync="floorOpenKeys"
					mode="inline"
					@click="handleClickDevice">
					<a-sub-menu key="sub1">
						<span slot="title"><a-icon type="setting"/><span style="font-size: 20px">设备类型</span></span>
						<a-menu-item v-for="(item,index) in floorMenuItem" :key="item.key">
							<span :title="item.name" class="menuItem" style="font-size: 20px;">{{item.name}}</span>
						</a-menu-item>
					</a-sub-menu>
					<a-menu-item key="chemicalCount" @click="getCountData">
						<a-icon type="fund"/>
						<span class="menuItem" style="font-size: 20px">化学品存储</span>
					</a-menu-item>
					<a-menu-item key="orderCount" @click="getCountData">
						<a-icon type="fund"/>
						<span class="menuItem" style="font-size: 20px">工单</span>
					</a-menu-item>
					<a-menu-item key="dangerCount" @click="getCountData">
						<a-icon type="fund"/>
						<span class="menuItem" style="font-size: 20px">危害辨识</span>
					</a-menu-item>
				</a-menu>
			</div>
		</div>

		<div :class="!showStatistic ? 'left-menu-build hide-menu':'left-menu-build'" id="left-menu-build">
			<div>
				<a-menu
					style="width: 256px"
					:default-selected-keys="['1']"
					:open-keys.sync="openKeys"
					mode="inline"
					@click="handleClickBuildAll">
					<a-sub-menu key="sub1">
						<span slot="title"><a-icon type="setting"/><span style="font-size: 20px">园区统计</span></span>
						<a-menu-item v-for="(item,index) in buildMenuItem" :key="item.key">
							<span :title="item.name" class="menuItem" style="font-size: 20px">{{item.name}}</span>
						</a-menu-item>
					</a-sub-menu>
					<a-menu-item key="walkingPath">
						<a-icon type="fund"/>
						<span class="menuItem" style="font-size: 20px">人员轨迹</span>
					</a-menu-item>
				</a-menu>
			</div>
		</div>

		<div :class="!userPath ? 'walk-history show-history':'walk-history'">
			<div id="walk">
				<div v-show="seeStrange">
					<div class="my-title">
						<span @click="repairBuilding" class="return-prev"><a-icon type="left"/></span>
						<span>当前位置：{{transferTypesToText(getPosition.building,'1')}}栋{{getPosition.floorName}}</span>
					</div>
					<div class="search-input">
						<div>
							<a-input v-model="staffDetail.employeeId" @blur="getStaffDetailById" ref="getStaffId"
									 placeholder="请输入工号"/>
						</div>
						<div class="btn">
							<a-button @click="getStaffPathById">搜索</a-button>
						</div>
					</div>
					<div class="search-time">
						<div class="time">
							<a-date-picker :defaultValue="moment(staffDetail.date, 'YYYY-MM-DD')"
										   @change="historyDateChange" placeholder="选择日期"/>
						</div>
						<div class="time">
							<a-time-picker :default-value="moment('00:00', 'HH:mm')" format="HH:mm"
										   @change="historyDateChange2" placeholder="开始时间"/>
						</div>
						<div class="time">
							<a-time-picker :default-value="moment('23:59', 'HH:mm')" format="HH:mm"
										   @change="historyDateChange3" placeholder="结束时间"/>
						</div>
					</div>
				</div>
				<div v-show="staffPath" class="search-result">
					<img :src="require('../../../../assets/home/walkPath/split-line.png')" alt="" width="100%">
					<div class="user-detail">
						<div class="avatar" :style="{'background-image': 'url('+staffDetail.avatar+')'}"></div>
						<div class="user">
							<p>
								<span>姓名</span>
								<span>{{staffDetail.employeeName}}</span>
							</p>
							<p>
								<span>部门</span>
								<span>{{staffDetail.departmentName}}</span>
							</p>
							<p>
								<span>工号</span>
								<span>{{staffDetail.employeeId}}</span>
							</p>
						</div>
					</div>
					<img :src="require('../../../../assets/home/walkPath/split-line.png')" alt="" width="100%">

					<div v-if="strangerWalkPath.length > 0" class="path-list">
						<div class="item" v-for="(item,k) in strangerWalkPath" :key="k">
							<div class="title">
								<span>{{k+1}}: {{transferTypesToText(item.id.split('#')[0],'1')}}#{{transferTypesToText(item.id.split('#')[0],'3',item.id.split('#')[1])}}</span>
								<span v-show="item.listdata.length > 0 " class="check"
									  @click="getFinalPath(item)">查看轨迹</span>
							</div>
							<div v-for="(val,j) in item.listdata" class="record" :key="j">
								<div class="path-box">
									<div class="path-start" v-if="j === 0">起</div>
									<div class="path-pass" v-else-if="j !== 0 && j !== item.listdata.length-1 ">经</div>
									<div class="path-end" v-else>终</div>
									<span>&nbsp;{{val.door_name}}</span>
								</div>
								<div class="my-time">{{val.cnTime.split(' ')[1]}}</div>
							</div>
						</div>
					</div>

					<div v-if="staffHistory.length > 0" class="path-list">
						<div class="item" v-for="(item,k) in staffHistory" :key="k">
							<div class="title">
								<span>{{k+1}}: {{transferTypesToText(item.id.split('#')[0],'1')}}#{{transferTypesToText(item.id.split('#')[0],'3',item.id.split('#')[1])}}</span>
								<span v-show="item.listdata.length > 0 && item.name === 1" class="check"
									  @click="getModel(item)">查看轨迹</span>
							</div>
							<div v-for="(val,j) in item.listdata" class="record" :key="j">
								<div class="path-box">
									<div class="path-start" v-if="j === 0">起</div>
									<div class="path-pass" v-else-if="j !== 0 && j !== item.listdata.length-1 ">经</div>
									<div class="path-end" v-else>终</div>
									<span>&nbsp;{{val.door_name}}</span>
								</div>
								<div class="my-time">{{val.cnTime.split(' ')[1]}}</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="scene">
			<div ref="myCube" id="cube">
				<div v-for="item in direction" :class="'cube__face cube__face--'+item.className ">{{item.direct}}</div>
			</div>
		</div>

		<a-button id="reload-btn" @click="playAirPlain">无人机画面</a-button>

	</div>
</template>

<script>
	import * as THREE from 'three'
	import moment from 'moment';
	import {createBuildingNameLabel, createChemical, createDeviceBoard, createEmergency} from '@/common/3D/createCard';
	import {createCountCard} from "@/common/3D/countCard";
	import {formatFullDate} from "../../../../common/date";
	import {
		getCamera,
		getLeakData,
		getSingleDevice,
		getChemicalAll,
		getChemicalCount,
		getDangerBuild,
		getDangerCount,
		getDoorData,
		getIdentifyAll,
		getOrderBuild,
		getOrderCount,
		getSafetyvalvegroup,
		getWorkOrderAll,
		loginToServer,
		openDoors,
		playCustomCountVideo,
		playLiveVideo,
		replayRecord,
		startCloudControl,
		stopPlayVideo
	} from '../../../../common/3D/factory'
	import {createSafetyCard} from "@/common/3D/safetyCard"

	import {LineMaterial} from 'three/examples/jsm/lines/LineMaterial'
	import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry'
	import {Line2} from 'three/examples/jsm/lines/Line2'
	// 页面一些功能抽离，如加载器、资源释放工具、A*算法
	import {FactoryObject} from "@/common/3D/loaders";
	import Task from '../../../../common/astar/task'
	import AlarmBox from '../../../../components/alarmBox'
	// 资源释放
	import ResourceTracker from "@/common/3D/dispose";
	import {createSprite} from "../../../../common/3D/sprite";
	import SockJS from "sockjs-client";
	import Stomp from "stompjs";

	let myFactoryObj = new FactoryObject()
	const loadingManager = new THREE.LoadingManager();

	import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
	import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

	let gltfLoader = new GLTFLoader(loadingManager);
	let dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('/static/3D/draco/gltf/');
	gltfLoader.setDRACOLoader(dracoLoader);

	let obList = new THREE.Group();
	let fabN1List = new THREE.Group();
	let fabN2List = new THREE.Group();
	let cupList = new THREE.Group();
	let cwaList = new THREE.Group();
	let cwbList = new THREE.Group();
	let cyvList = new THREE.Group();
	let sgList = new THREE.Group();
	let shvcList = new THREE.Group();
	let wfaList = new THREE.Group();
	let whfaList = new THREE.Group();
	let tsList = new THREE.Group();
	let l40List = new THREE.Group();

	let resMgr999 = new ResourceTracker() // 厂区名称
	let track999 = resMgr999.track.bind(resMgr999)

	let resMgrLabel = new ResourceTracker();// 立体3D卡片
	let trackLabel = resMgrLabel.track.bind(resMgrLabel)

	let resMgrLine = new ResourceTracker();// 立体3D卡片
	let trackLine = resMgrLine.track.bind(resMgrLine)

	let resMgrDevice = new ResourceTracker();// 立体3D卡片
	let trackDevice = resMgrDevice.track.bind(resMgrDevice)

	let resMgrModel = new ResourceTracker();
	let trackModel = resMgrModel.track.bind(resMgrModel);
	const loopTime = 10 * 1000;
	let myCurve = null;
	let mesh999 = null;


	// 资源释放
	let resMgr = myFactoryObj.resourceTrack;
	let track = resMgr.track.bind(resMgr)

	let doorTimer = null;

	let AStar = {};
	AStar.Task = Task;

	// three.js的一些依赖 及控件，控制缩放旋转的
	const TWEEN = require('@tweenjs/tween.js')
	let scene = null;
	let scene2 = null;
	let camera = null;

	let renderer = myFactoryObj.renderer();
	let renderer2 = myFactoryObj.renderer2();

	let myControls = null;
	let animationID = null;
	let clock = new myFactoryObj.THREE.Clock();//声明一个时钟对象

	let oldChildren = [];// 存储每次的重新赋值的模型
	let currentModel = null;// 当前屏幕上的模型
	let currentMesh = []

	let device = [];//一个模型上的所有设备
	let deviceType = [];//一类设备
	let oldOneMaterial = [];

	let deviceBuildingList = {
		"-1": [],
		"0": [],
		"1": [],
		"2": [],
		"3": [],
		"4": [],
		"5": [],
		"6": [],
		"7": [],
		"8": [],
		"9": []
	}

	window.stairList = [];
	let textureList = []; // => 贴图列表，渲染的时候流动
	let myDoors = [];

	let RollTexture = null;
	let cssObjectList = [];

	let arrows = {
		left: [],
		right: [],
		top: [],
		bottom: []
	};
	let yingbiangui = null;

	let blockList = [];

	export default {
		name: "factory",
		data() {
			return {
				currentLoad: 0,
				totalLoad: 0,
				openDoorsSOS: false,
				floorHeight: [-2, 4, 11, 18, 25, 32, 39, 46],
				videoItems: [],
				direction: [
					{
						direct: '南',
						className: 'front'
					},
					{
						direct: '北',
						className: 'back'
					},
					{
						direct: '东',
						className: 'right'
					},
					{
						direct: '西',
						className: 'left'
					},
					{
						direct: '上',
						className: 'top'
					},
					{
						direct: '下',
						className: 'bottom'
					}
				],
				buildingItem: true,
				showVideoWindow: false,
				walkPathObj: {
					name: '',
					number: '',
					time: ''
				},
				staffPath: false,
				seeStrange: false,
				staffHistory: [],
				strangerWalkPath: [],
				staffDetail: {
					employeeName: '',
					employeeId: null,
					departmentName: '',
					avatar: '',
					date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
					startTime: '00:00',
					endTime: '23:59'
				},
				showHistory: false,
				showStatistic: false,
				userPath: false,
				loadedNum: 0,
				loadedIndex: 0,
				allPathList: [],
				tempNumber: 1,
				stateNumber: 10,
				chemicalBoard: false,
				dangerWasteBoard: false,
				monitorGasBoard: false,
				workOrderBoard: false,
				dangerIdentifyBoard: false,
				monitorWaterBoard: false,
				monitor: false,
				door: false,
				floorMenu: false,
				buildMenu: false,
				showMenu: false,
				floorMenuItem: [
					{
						key: 'camera',
						name: '监控'
					},
					{
						key: 'temperatureDetector',
						name: '消防-温感探测器'
					},
					{
						key: 'smokeDetector',
						name: '烟感探测器'
					},
					{
						key: 'suctionDetector',
						name: '吸气式探测器'
					},
					{
						key: 'manualButton',
						name: '手动报警按钮'
					},
					{
						key: 'hydrantButton',
						name: '消防栓报警按钮设备'
					},
					{
						key: 'emergencyLighting',
						name: '应急照明'
					},
					{
						key: 'EvacuationLights',
						name: '疏散指示灯'
					},
					{
						key: 'Safetyvalvegroup',
						name: '安全阀组'
					},
					{
						key: 'waterFlow',
						name: '水流指示器'
					},
					{
						key: 'delugeValve',
						name: '雨淋阀'
					},
					{
						key: 'GD',
						name: 'GD'
					},
					{
						key: 'LEAK',
						name: 'LEAK'
					},
					{
						key: 'jitai',
						name: '机台'
					},
				],
				buildMenuItem: [
					{
						key: 'chemical',
						name: '化学品存储'
					}, {
						key: 'dangerWaste',
						name: '危废储量'
					}, {
						key: 'monitorGas',
						name: '废气检测'
					}, {
						key: 'workOrder',
						name: '工单'
					}, {
						key: 'dangerIdentify',
						name: '危害辨识'
					}, {
						key: 'monitorWater',
						name: '废水监测'
					}
				],
				floors: [],
				currentFloor: '',
				currentBuilding: 'building_factory',
				right: '-200px',
				loading: true,
				temp: {
					x: 10,
					y: 20,
					z: 0
				},
				deviceBoardList: [{
					x: 0,
					y: 0,
				},],
				temperature: 0,
				tagTitle: '',

				openKeys: [],
				floorOpenKeys: [],
				yanGan: false,
				wenGan: false,
				sheXiang: false,

				dictionaryList: [],
				buildingList: [],
				buildingListMenu: [],
				deviceTypeList: [],
				getPosition: {
					building: 'building_factory',
					buildingName: '',
					floor: '9999',
					floorName: '',
					type: '',
					equipNum: '',
				},
				chemicalCountData: [],
				tempCameraCode: null,// 监控code，用来打开云台
				activeDevice: null,
				buildingPositionList: [],
				singlePathObj: {
					building: '',
					floor: ''
				}
			}
		},
		components: {
			AlarmBox
		},
		created() {
			//获取楼栋字典列表数组
			let data = {
				"dictNum": "building",
			}
			this.$http.get2("/sys/dict/cf", data).then(res => {
				this.dictionaryList = res.data.data
			});
		},
		methods: {


			seeVideo(camCode, start, end) {
				let divDom = document.getElementById('my-video');
				setTimeout(() => {
					replayRecord(camCode, divDom, this, start, end) //调试视频回放功能
				}, 50)
			},
			// 无人机画面
			playAirPlain() {
				let divDom = document.getElementById('video-window');
				playCustomCountVideo(this, '34010000001310000005', divDom)
			},
			// SOS  打开关闭所有门禁
			openAllDoors(type) {
				let obj = {
					"building": this.getPosition.building,
					"floor": this.getPosition.floor,
					"type": type
				};
				this.$http.post2('/bigscreen/open/sos/doors', {"buildingAndFloorVo": obj}).then(res => {
					if (res.data.code === 1) {
						this.$message('success', type === 1 ? '操作成功！门禁即将全部打开...' : '操作成功！门禁即将全部关闭...')
					} else {
						this.$message('error', res.data.msg)
					}
				})
			},
			moment,
			// get Today Date
			getTodayDate() {
				function format(m) {
					return m < 10 ? '0' + m : m
				}

				let y = format(new Date().getFullYear());
				let m = format(new Date().getMonth() + 1);
				let d = format(new Date().getDate())
				return `${y}/${m}/${d}`
			},

			//主园区级统计（化学品存储、工单、危害辨识）
			async handleClickBuildAll(e) {
				resMgrLabel && resMgrLabel.dispose()
				console.log(scene2)
				if (this.loading) return;
				if (e.key === 'chemical') {  //主园区化学品存储
					let res = await getChemicalAll(this);
					let tempArr = res.data.data;
					console.log(tempArr)
					tempArr.forEach(item => {
						if (item.reserveScrrenList.length > 0) {
							item.postion = eval(item.postion);
							this.createCard(item.reserveScrrenList, e.key, item.postion);
						}
					})
				} else if (e.key === 'workOrder') {  //主园区工单
					let res = await getWorkOrderAll(this);
					console.log(this.buildingPositionList)
					res.data.data.map(item => {
						let result = this.buildingPositionList.filter(key => {
							return key.name === item.alias
						})

						this.createIdentifyCard(item, 'test2', result);
					})

				} else if (e.key === 'dangerIdentify') {  //主园区危害辨识
					let res = await getIdentifyAll(this);
					res.data.data.map(item => {
						let result = this.buildingPositionList.filter(key => {
							return key.name === item.alias
						})
						this.createIdentifyCard(item, 'test1', result);
					})

				} else if (e.key === 'walkingPath') {
					// this.getNewUserPath()
					this.userPath = true;
					this.showStatistic = false;
					this.showHistory = false;
					this.seeStrange = true;
				}
			},
			//主园区级卡片  化学品存储
			async createCard(item, type, position) {
				if (this.loading) return;
				let container3D = await createChemical(item, type);
				const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D)); // 使用 CSS3DObject 将 DomElement 转换为 3d 元素
				objectContainer.scale.set(0.1, 0.1, 0.1);
				cssObjectList.push(objectContainer)
				objectContainer.position.set(position[0], position[1], position[2]);
				scene2.add(objectContainer); // 将转换好的 3d 元素添加到场景
			},
			//主园区级卡片  工单、危害辨识
			async createIdentifyCard(item, type, result) {
				if (this.loading) return;
				let container3D = await createChemical(item, type);
				const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D)); // 使用 CSS3DObject 将 DomElement 转换为 3d 元素
				objectContainer.scale.set(0.1, 0.1, 0.1);
				cssObjectList.push(objectContainer)
				objectContainer.position.set(result[0].pos[0] - 50, result[0].pos[1] + 30, result[0].pos[2]);
				scene2.add(objectContainer); // 将转换好的 3d 元素添加到场景
			},

			//楼栋级统计(工单、危害辨识)
			async handleClickBuild(e) {
				this.removeUseless();
				if (this.loading) return;
				let obj = {
					building: this.getPosition.buildingName,
					factoryName: "N1",
				};
				if (e.key === 'orderCount') {
					let res = await getOrderBuild(obj, this);
					this.orderBuildCard(res.data.data, e.key);
				} else if (e.key === 'dangerCount') {
					let res = await getDangerBuild(obj, this);
					this.orderBuildCard(res.data.data, e.key);
				}
			},

			//楼栋级卡片
			async orderBuildCard(item, type) {
				if (this.loading) return;
				let container3D = await createCountCard(item, type);
				const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D)); // 使用 CSS3DObject 将 DomElement 转换为 3d 元素
				objectContainer.scale.set(0.025, 0.025, 0.025);
				// cssObjectList.push(objectContainer)
				objectContainer.position.set(0, 7, 0);
				scene2.add(objectContainer); // 将转换好的 3d 元素添加到场景
			},

			//楼层级统计 化学品存储等
			async getCountData(e) {
				this.removeUseless();
				if (this.loading) return;
				let obj = {
					building: this.getPosition.buildingName,
					factoryName: "N1",
					floor: this.getPosition.floorName
				};
				if (e.key === 'chemicalCount') {
					let res = await getChemicalCount(obj, this);
					this.countCard(res.data.data, e.key);
				} else if (e.key === 'orderCount') {
					let res = await getOrderCount(obj, this);
					this.countCard(res.data.data, e.key);
				} else if (e.key === 'dangerCount') {
					let res = await getDangerCount(obj, this);
					this.countCard(res.data.data, e.key);
				}
			},
			//楼层级卡片 化学品存储等展示
			async countCard(item, type) {
				if (this.loading) return;
				let container3D = await createCountCard(item, type);
				const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D)); // 使用 CSS3DObject 将 DomElement 转换为 3d 元素
				objectContainer.scale.set(0.18, 0.18, 0.18);
				// cssObjectList.push(objectContainer)
				objectContainer.position.set(-90, 30, -5);
				objectContainer.name = item.type;
				scene2.add(objectContainer); // 将转换好的 3d 元素添加到场景
			},

			// 关闭监控视频的
			closeVideoWindow() {
				stopPlayVideo(this);
				this.showVideoWindow = false;
				document.getElementById('my-video').innerHTML = ''
			},
			// 打开云台控制
			openCloudControl() {
				startCloudControl(this, this.tempCameraCode)
			},

			// 轨迹时间改变
			historyDateChange(date, dateString) {
				this.staffDetail.date = dateString
			},
			historyDateChange2(date, dateString) {
				this.staffDetail.startTime = dateString
			},
			historyDateChange3(date, dateString) {
				this.staffDetail.endTime = dateString
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
			//获取楼栋列表(所有楼栋的字典值、url、position)
			async getMenu() {
				// this.loadOuterHouse('/static/3D/models/yuan_mini2.gltf')
				let data = {
					"building": "",
					"floor": "",
				}
				let res = await this.$http.post2("/bigscreen/filtrate/ball", data).then(resp => {
					let temp = resp.data.data
					this.buildingList = temp
					this.buildingListMenu = temp
					return temp
				});
				let result = res.filter(item => {
					return item.dictNo === "building_factory"
				})

				this.loadOuterHouse(result[0].url);
				//  this.loadOuterHouse('/static/3D/new/n1/5f_mini.gltf');
			},
			//获取设备列表
			getDeviceMenu() {
				this.deviceTypeList = []
				let data = {
					"dictNum": "device_type",
				}
				this.$http.get2("/sys/dict/cf", data).then(res => {
					let tempDeviceData = res.data.data
					tempDeviceData.forEach(device => {
						device.children.forEach(deviceItem => {
							this.deviceTypeList.push(deviceItem)
						})
					})
				});
			},

			preLoadModel(url, arr, num, type) {
				// myFactoryObj.loadModel.load(`${url}`, gltf => {
				gltfLoader.load(`${url}`, gltf => {
					gltf.scene['buildingIndex'] = num;
					gltf.scene['name'] = 'n1-' + num;
					arr.add(gltf.scene);
					if (type) {
						scene.add(trackModel(arr))
					}
					gltf.scene.children.forEach(item => {

						try {
							oldChildren.push({
								'name': item.name,
								'material': item.material
							})
							currentMesh.push(item)
						} catch (e) {
							console.log(e)
						}

						if (item.name.includes('device')) {
							if (!(item.name.includes('door') || item.name.includes('gate'))) { //=>门直接展示
								item.visible = false;
							}
							deviceBuildingList[num].push(item)
						}

						if (item.name.includes('yingbiangui')) {
							item.visible = true;
							yingbiangui = item;
						}
					})
				})
			},

			// 加载园区主页---------------Home
			loadOuterHouse(url) {
				let self = this;
				this.right = '-800px'
				this.floors = []
				gltfLoader.load(`${url}`, obj => {
					console.log(obj)

					this.showStatistic = true;
					this.showHistory = false;
					this.userPath = false;

					oldChildren = myFactoryObj.keepMeshMaterial(obj.scene.children)

					this.loading = false;
					currentModel = obj.scene
					obj.scene.name = 'home'


					scene.add(trackModel(obj.scene))
					setTimeout(() => {
						myFactoryObj.scaleModelNext(obj.scene, currentModel);
					}, 300)


					let doorList22 = []
					setTimeout(() => {
						obj.scene.children.forEach(item => {

							if (item.name.includes('fang_')) {
								item.geometry.computeBoundingSphere();
								let pos = item.geometry.boundingSphere.center;
								blockList.push({x: Number(pos.x.toFixed(0)), y: 1, z: Number(pos.z.toFixed(0))})
							}

							if (item.name.includes('staircase')) {
								item.geometry.computeBoundingSphere();
								let pos = item.geometry.boundingSphere.center;
								doorList22.push({x: Number(pos.x.toFixed(0)), y: 1, z: Number(pos.z.toFixed(0))})
							}


							if (item.name.includes('custom_building')) {
								item.visible = false;
								item.geometry.computeBoundingSphere();
								let pos = item.geometry.boundingSphere.center;
								let name = item.name.split('custom_building_');
								this.buildingPositionList.push({
									name: name[1],
									pos: [pos.x, pos.y, pos.z]
								})

								function f2(temp) {
									console.log(temp)
									self.loading = true;
									resMgrLabel && resMgrLabel.dispose()
									resMgr999 && resMgr999.dispose()
									myFactoryObj.scaleModelPrev(currentModel, scene);

									setTimeout(() => {
										self.loadBuildingByName(temp, 1)
									}, 600)
								}

								let container3D = createBuildingNameLabel(name[1], f2);
								const objectContainer = track999(new myFactoryObj.CSS3DObject(container3D));
								cssObjectList.push(objectContainer)
								objectContainer.scale.set(0.2, 0.2, 0.2);
								objectContainer.name = item.name;
								objectContainer.position.set(pos.x, pos.y + 14, pos.z)
								scene2.add(objectContainer);
							}
						})
						this.buildingPositionList.forEach(item => {
							if (item.name === 'ts') {// 变电站改名字了，匹配不上。。。
								item.name = 'biandianzhan'
							}
						})
						console.log(JSON.stringify(doorList22))
					}, 1500)


					// 本地调试JavaScript版的A星算法
					// setTimeout(()=>{
					// 	console.log(JSON.stringify(blockList))
					// 	let task = new AStar.Task();
					// 	task.setStart(-25, -47);
					// 	task.setEnd(-33, -53);
					// 	task.setWallFromArray(blockList);
					// 	let path = task.findPath(400, 180)// 两个参数是x y的最大坐标
					// 	console.log(path)
					//
					// 	let list = [];
					// 	path.forEach(item => {
					// 		list.push(track(new myFactoryObj.THREE.Vector3(item.x, 1, item.z)))
					// 	})
					// 	console.log(list)
					//
					// 	this.autoDrawLine(list)// 筛选线段之后，离开执行绘制第一段
					//
					// },20000)
				});
			},

			// 选择楼层
			async selectFloor(data, k) {
				console.log(data,k)
				resMgrLabel && resMgrLabel.dispose();
				resMgrLine && resMgrLine.dispose()

				// 切换楼层时，隐藏设备
				let index = Number(data.modelSort) + 1;
				this.showStatistic = false;
				this.getPosition.floor = data.dictItemVal;
				this.getPosition.floorName = data.dictName;
				this.currentFloor = data.dictName;
				let bName = this.getPosition.buildingName;

				console.log(bName)

				this.singlePathObj.building = bName;

				// 如果是模型和设备分离的，则在切换楼层的时候，单独加载设备模型
				if (bName === 'building_ob' || bName === 'building_fab_n1' || bName === 'building_warehouse' || bName === 'building_wastewater_station' || bName === 'building_fab_n2' || bName === 'building_cup') {
					let obj = {
						"building": this.getPosition.buildingName,
						"floor": this.getPosition.floor
					}
					console.log(obj)
					resMgrDevice && resMgrDevice.dispose();
					let res = await this.$http.post2("/bigscreen/filtrate/bf", obj).then(res => {
						return res.data.data[0].children
					})
					let url = res[0].url;

					gltfLoader.load(`${url}`, gltf => {
						scene.add(trackDevice(gltf.scene));
						gltf.scene.children.forEach(item => {
							if (item.name.includes('device')) {
								if (!(item.name.includes('door') || item.name.includes('gate') || item.name.includes('yingbiangui'))) { //=>门直接展示
									item.visible = false;
								}
								deviceBuildingList[index].push(item)
							}
						})
					})
				}


				if (bName === 'building_ob') {
					obList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_fab_n1') {

					fabN1List.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
					console.log(fabN1List)
				} else if (bName === 'building_fab_n2') {
					fabN2List.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_cup') {
					if (k === 7) {
						index = index - 2
					} else {
						index = index - 1
					}
					cupList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_postion8') {
					cwaList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_postion9') {
					cwbList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_silane_station') {
					shvcList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_special_gas_station') {
					sgList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_supply_station') {
					cyvList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index - 1 ? 0 : 1000
					})
				} else if (bName === 'building_substation') {
					tsList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_wastewater_station') {
					if (k === 3) {
						index = index - 2
					} else {
						index = index - 1
					}
					wfaList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				} else if (bName === 'building_warehouse') {
					index = index - 1
					whfaList.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				}else if (bName === 'building_l40') {
					index = index - 1
					l40List.children.forEach(item => {
						item.position.y = item.buildingIndex <= index ? 0 : 1000
					})
				}

			},


			formatFloor(building, floor) {
				if (building === 'building_ob') {
					switch (floor) {
						case "F1":
							return 1;
						case 'F2':
							return 2;
						case "F3":
							return 3;
						case 'F4':
							return 4;
						case "F5":
							return 5;
						case 'F6':
							return 6;
						case "F7":
							return 7;
						case "RF":
							return 8
					}
				} else if (building === 'building_fab_n1' || building === 'building_fab_n2') {
					switch (floor) {
						case "F1":
							return 1;
						case 'F2':
							return 2;
						case 'F2.5':
							return 3;
						case "F3":
							return 4;
						case 'F4':
							return 5;
						case "RF":
							return 6
					}
				} else if (building === 'building_cup') {
					switch (floor) {
						case "B1":
							return -1;
						case "F1":
							return 1;
						case 'F2':
							return 2;
						case 'F2.5':
							return 3;
						case "F3":
							return 4;
						case 'F4':
							return 5;
						case "R1":
							return 6;
						case "R2":
							return 7
					}
				} else if (building === 'building_warehouse' || building === 'building_wastewater_station' ||
					building === 'building_postion9' || building === 'building_postion8' ||
					building === 'building_silane_station' || building === 'building_substation' ||
					building === 'building_supply_station' || building === 'building_special_gas_station') {
					switch (floor) {
						case "B1":
							return -1;
						case "F1":
							return 1;
						case 'F2':
							return 2;
						case "RF":
							return 3
						case "R1":
							return 3
					}
				}else if(building === 'building_l40'){
					switch (floor) {
						case "truss层":
							return 3;
						case '无尘室':
							return 2;
						case "下夹层":
							return 1
					}
				}
			},


			//点击显示一类设备
			handleClickDevice(e) {
				console.log(e)
				console.log(deviceBuildingList)
				this.activeDevice = e.key.toLowerCase();
				if (this.loading) return;
				console.log(this.currentBuilding, this.currentFloor)
				let index = this.formatFloor(this.currentBuilding, this.currentFloor);
				console.log(index)
				deviceBuildingList[index].forEach(item => {
					if (!item.name.includes('door')) {
						let my_name = item.name.toLowerCase()
						item.visible = !!my_name.includes(e.key.toLowerCase());
					}
				})

				// device.forEach(item => {
				// 	if (!item.name.includes('door')) {
				// 		改变物体颜色
				// 		myFactoryObj.restoreMeshMaterial(scene.children[2].children, oldChildren);
				// 		oldOneMaterial = oldChildren.filter(itemOld => {
				// 			let temp = deviceType.map(itemNew => itemNew.name);
				// 			return temp.includes(itemOld.name);
				// 		})
				// 		item.visible = !!item.name.includes(e.key);
				// 	}
				// })
			},


			formatBuilding(build, floor) {
				if (build === 'building_fab_n1') {
					switch (floor) {
						case '8010':
							return [1, 'F1']
						case '8011':
							return [2, 'F2']
						case '8012':
							return [3, 'F2.5']
						case '8013':
							return [4, 'F3']
						case '8014':
							return [5, 'F4']
						case '8008':
							return [6, 'RF']
					}
				} else if (build === 'building_fab_n2') {
					switch (floor) {
						case '8020':
							return [1, 'F1']
						case '8021':
							return [2, 'F2']
						case '8022':
							return [3, 'F2.5']
						case '8023':
							return [4, 'F3']
						case '8024':
							return [5, 'F4']
						case '8008':
							return [6, 'RF']
					}
				} else if (build === 'building_ob') {
					switch (floor) {
						case '8001':
							return [1, 'F1']
						case '8002':
							return [2, 'F2']
						case '8003':
							return [3, 'F3']
						case '8004':
							return [4, 'F4']
						case '8005':
							return [5, 'F5']
						case '8006':
							return [6, 'F6']
						case '8007':
							return [6, 'F7']
						case '8008':
							return [6, 'RF']
					}
				} else if (build === 'building_cup') {
					switch (floor) {
						case '8025':
							return [-1, 'B1']
						case '8026':
							return [1, 'F1']
						case '8027':
							return [2, 'F2']
						case '8010':
							return [3, 'F2.5']
						case '8028':
							return [4, 'F3']
						case '8029':
							return [5, 'F4']
						case '8008':
							return [6, 'R1']
						case '8009':
							return [7, 'R2']
					}
				} else if (build === "building_special_gas_station") {
					switch (floor) {
						case '8035':
							return [1, 'F1']
					}
				}
			},


			// 子组件传过来的值------查看告警信息
			getChildData(e) {
				console.log(e)
				let self = this;
				if (e.category === 'alarm_category_offline222') {
					let divDom = document.getElementById('my-video');
					setTimeout(() => {
						let str1 = formatFullDate(new Date(e.almTime).getTime() - 15000);
						let str2 = formatFullDate(new Date(e.almTime).getTime());
						let start = "2021-09-09 00:00:00";
						let end = "2021-09-11 23:59:59";
						replayRecord('34010200581314000396', divDom, self, start, end) //调试视频回放功能
					}, 50)
				} else {
					self.loading = true;
					resMgrLabel && resMgrLabel.dispose()
					resMgrModel && resMgrModel.dispose()
					resMgrLine && resMgrLine.dispose()
					resMgr999 && resMgr999.dispose()
					resMgrDevice && resMgrDevice.dispose()
					let data = {
						dictNo: e.almBuilding,
						dictItemVal: e.almFloor,
						alarmStatus: e.alarmStatus,
						en: e.en,
						modelEquipNo: e.modelEquipNo,
						modelSort: this.formatBuilding(e.almBuilding, e.almFloor)[0]
					};

					this.getPosition.building = e.almBuilding;
					this.getPosition.floor = e.almFloor;

					this.currentBuilding = e.almBuilding;
					this.currentFloor = e.almFloor;
					console.log(data.modelSort)


					function formatBF(name, url, index) {
						name = name.replace(/building_/, '')
						switch (name) {
							case 'ob':
								setTimeout(() => {// 加载顶楼
									self.preLoadModel(`/static/3D/new/ob/ob_${data.modelSort}f_mini.gltf`, obList, index)
								}, 3000)
								scene.add(trackModel(obList))
								break;
							case 'fab_n1':
								setTimeout(() => {// 加载顶楼
									self.preLoadModel(`/static/3D/new/n1/${data.modelSort}f_mini.gltf`, fabN1List, index)
								}, 3000)
								scene.add(trackModel(fabN1List))
								break
							case 'fab_n2':
								setTimeout(() => {// 加载顶楼
									self.preLoadModel(`/static/3D/new/n2/${data.modelSort}f_mini.gltf`, fabN2List, index)
								}, 3000)
								scene.add(trackModel(fabN2List))
								break
							case 'cup':
								setTimeout(() => {// 加载顶楼
									self.preLoadModel(`/static/3D/new/cup/cup_${data.modelSort}f_mini.gltf`, cupList, index)
								}, 3000)
								scene.add(trackModel(cupList))
								break
							case 'wfa':
								setTimeout(() => {// 加载顶楼
									self.preLoadModel(`/static/3D/new/wfa/wfa_${data.modelSort}f_mini.gltf`, wfaList, index)
								}, 3000)
								scene.add(trackModel(wfaList))
								break
							case 'whfa':
								setTimeout(() => {// 加载顶楼
									self.preLoadModel(`/static/3D/new/whfa/whfa_${data.modelSort}f_mini.gltf`, whfaList, index)
								}, 3000)
								scene.add(trackModel(whfaList))
								break
							case 'cwa':
								self.preLoadModel(url, cwaList, index)
								scene.add(trackModel(cwaList))
								break
							case 'cwb':
								self.preLoadModel(url, cwbList, index)
								scene.add(trackModel(cwbList))
								break
							case 'cyvc':
								self.preLoadModel(url, cyvList, index)
								scene.add(trackModel(cyvList))
								break
							case 'special_gas_station':
								self.preLoadModel(url, sgList, index)
								scene.add(trackModel(sgList))
								break
							case 'shvc':
								self.preLoadModel(url, shvcList, index)
								scene.add(trackModel(shvcList))
								break
							case 'ts':
								self.preLoadModel(url, tsList, index)
								scene.add(trackModel(tsList))
								break
							case 'l40':
								self.preLoadModel(url, l40List, index)
								scene.add(trackModel(l40List))
								break
						}
					}

					async function loadAlarmDevice(bName,index) {
// 如果是模型和设备分离的，则在切换楼层的时候，单独加载设备模型
						if (bName === 'building_ob' || bName === 'building_fab_n1' || bName === 'building_warehouse' || bName === 'building_wastewater_station' || bName === 'building_fab_n2' || bName === 'building_cup') {
							let obj = {
								"building": e.almBuilding,
								"floor": e.almFloor
							}
							console.log(obj)
							resMgrDevice && resMgrDevice.dispose();
							let res = await self.$http.post2("/bigscreen/filtrate/bf", obj).then(res => {
								return res.data.data[0].children
							})
							let url = res[0].url;

							gltfLoader.load(`${url}`, gltf => {
								scene.add(trackDevice(gltf.scene));
								gltf.scene.children.forEach(item => {
									if (item.name.includes('device')) {
										if (!(item.name.includes('door') || item.name.includes('gate') || item.name.includes('yingbiangui'))) { //=>门直接展示
											item.visible = false;
										}
										if(item.name === e.modelEquipNo){// 如果是当前的告警设备，则展示出来
											item.visible = true;
										}
										deviceBuildingList[index].push(item)
									}
								})
							})
						}
					}


					function cb() {
						let pos = JSON.parse(e.position);
						let data2 = {
							equipNum: e.modelEquipNo,
							building: e.almBuilding,
							floor: e.almFloor,
							visible: true,
							x: pos[0],
							y: pos[1] + Number(data.modelSort) * 5,
							z: pos[2],
							name: e.cnTypes,
							en: e.en
						}
						console.log(data2)
						let type = e.modelEquipNo.split('_')[1];
						let specialType = null;
						if(type === 'GD'){
							specialType = 'gd'
							type = 'gd'
						}
						self.initSpriteLabel(type, data2,specialType)
					}

					let obj = {
						"building": e.almBuilding,
						"floor": e.almFloor
					}
					this.$http.post2("/bigscreen/filtrate/bf", obj).then(res => {
						let temps = this.transferTypesToText(e.almBuilding, '2');
						this.floors = temps.filter(item => {
							return item.dictItemVal !== "9999"
						})
						let result = this.floors.filter(item => {
							return item.dictItemVal === e.almFloor
						})
						this.currentBuilding = e.almBuilding;
						this.currentFloor = result[0].dictName;
						let url = res.data.data[0].children[0].url;
						formatBF(e.almBuilding, url, data.modelSort);
						loadAlarmDevice(e.almBuilding,data.modelSort);
						setTimeout(() => {
							cb()
							self.loading = false;
							self.showStatistic = false;
							self.showHistory = true;
						}, 5500)
					})
				}
			},

			// 初始化3D立体标签
			initSpriteLabel(type, objData, specialType) {
				console.log(type)
				let self = this;
				resMgrLabel && resMgrLabel.dispose();
				switch (type) {
					case 'Safetyvalvegroup':
						let dataGroup = {
							"building": objData.building,
							"floor": objData.floor,
							"equipNum": "device_Safetyvalvegroup_1006",
						};

					async function getGroup() {
						let groupData = await getSafetyvalvegroup(self, dataGroup)
						let container3D = createSafetyCard(groupData.data.data[0].equipmentStatusList, 'Safetyvalvegroup');
						const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D));
						objectContainer.scale.set(0.03, 0.03, 0.03);
						cssObjectList.push(objectContainer)
						objectContainer.position.set(objData.x, objData.y + 3, objData.z)
						scene2.add(objectContainer);
					}

						getGroup();
						break;
					case 'door':
						let data = {
							"building": objData.building,
							"equipNum": objData.equipNum,
							"floor": objData.floor,
						};

					async function getData() {
						let res = await getDoorData(self, data);

						function cb(status) {
							self.controlDoors(res.data[0], status)
						}

						let container3D = createDeviceBoard('door', cb, res.data[0]);
						const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D));
						objectContainer.scale.set(0.23, 0.23, 0.23);
						objectContainer.position.set(objData.x, objData.y + 28, objData.z)
						cssObjectList.push(objectContainer)
						scene2.add(objectContainer);
					}

						getData()
						break;
					case 'gate':
						let data3 = {
							"building": objData.building,
							"equipNum": objData.equipNum,
							"floor": objData.floor,
						};

					async function getData2() {
						let res = await getDoorData(self, data3);

						function cb3(status) {
							self.controlDoors(res.data[0], status)
						}

						let container3D3 = createDeviceBoard('gate', cb3, res.data[0]);
						const objectContainer3 = trackLabel(new myFactoryObj.CSS3DObject(container3D3));
						objectContainer3.scale.set(0.23, 0.23, 0.23);
						cssObjectList.push(objectContainer3)
						objectContainer3.position.set(objData.x, objData.y + 26, objData.z)
						scene2.add(objectContainer3);
					}

						getData2()
						break;
					case 'smokeDetector':
						let container3D3 = createDeviceBoard('smokeDetector', null, objData);
						const objectContainer3 = trackLabel(new myFactoryObj.CSS3DObject(container3D3));
						objectContainer3.scale.set(0.23, 0.23, 0.23);
						cssObjectList.push(objectContainer3)
						objectContainer3.position.set(objData.x, objData.y + 26, objData.z)
						scene2.add(objectContainer3);
						break;
					case 'camera':
						if (!objData.visible) return;
						let data2 = {
							"building": objData.building,
							"equipNum": objData.equipNum,
							"floor": objData.floor,
						};

					async function getCameraData() {
						let res = await getCamera(self, data2);
						self.tempCameraCode = res.data.equipMessage

						let divDom = document.getElementById('video-window');

						function cb2() {
							playCustomCountVideo(self, res.data.equipMessage, divDom)
							// playLiveVideo(self, divDom, res.data.equipMessage)
						}

						let k = self.getPosition.floor === '9999' ? 6 : 8;

						let container3D2 = createDeviceBoard('camera', cb2, res.data);
						const objectContainer2 = trackLabel(new myFactoryObj.CSS3DObject(container3D2));
						objectContainer2.scale.set(0.03 * k, 0.03 * k, 0.03 * k);
						if (self.getPosition.building === 'building_factory') {
							cssObjectList.push(objectContainer2)
						}
						cssObjectList.push(objectContainer2);
						objectContainer2.position.set(objData.x, objData.y + 2 * k + 8, objData.z)
						scene2.add(objectContainer2); // 将转换好的 3d 元素添加到场景
					}

						getCameraData()
						break
					case 'gd':
						let data1 = {
							"building": objData.building,
							"deviceNum": specialType ? objData.equipNum:objData.name,
							"floor": objData.floor,
						};
					async function getData3() {
						let res = await getSingleDevice(self, data1);
						console.log(res)

						function cb(status) {
							console.log(222)
						}

						let container3D = createDeviceBoard('GD', cb, res.data.data);
						const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D));
						objectContainer.scale.set(0.2, 0.2, 0.2);
						cssObjectList.push(objectContainer);
						objectContainer.position.set(objData.x, objData.y + 17, objData.z)
						scene2.add(objectContainer);
					}

						getData3()
						break;
					case 'leak':
						let data4 = {
							"building": objData.building,
							"deviceNum": objData.equipNum,
							"floor": objData.floor,
						};

					async function getData4() {
						let res = await getLeakData(self, data4);
						console.log(res)

						function cb(status) {
							console.log(222)
						}

						let container3D = createDeviceBoard('LEAK', cb, res.data.data);
						const objectContainer = trackLabel(new myFactoryObj.CSS3DObject(container3D));
						objectContainer.scale.set(0.2, 0.2, 0.2);
						cssObjectList.push(objectContainer);
						objectContainer.position.set(objData.x, objData.y + 17, objData.z)
						scene2.add(objectContainer);
					}

						getData4()
						break;
				}
			},


			async getFloors(building, type) {
				console.log(building, type)
				let obj = {
					"building": building,
					"floor": "",
				}
				let res = await this.$http.post2("/bigscreen/filtrate/bf", obj).then(res2 => {
					let tempFloor = res2.data.data[0].children
					tempFloor.forEach(item => {
						item['dictName'] = this.transferTypesToText(building, '3', item.dictItemVal)
					})
					return tempFloor
				})
				this.getPosition.building = building;
				this.getPosition.buildingName = building;
				this.currentBuilding = building;

				if (type === 2) {
					this.showStatistic = false;
					this.showHistory = false;
					this.userPath = true;
				} else {
					this.showStatistic = false;
					this.showHistory = true;
					this.userPath = false;
				}

				this.floors = [];

				this.right = '160px';
				this.floors = res.filter(item => {
					return item.dictItemVal !== "9999"
				})
			},

			//3D场景
			init3D() {
				let self = this;
				let el = document.getElementById('my-parking');
				scene = new myFactoryObj.THREE.Scene();// 场景
				scene2 = new myFactoryObj.THREE.Scene();// 卡片场景
				camera = new myFactoryObj.THREE.PerspectiveCamera(45, el.offsetWidth / el.offsetHeight, 1, 1000);
				// camera.position.set(0, 5, 30);
				camera.position.set(0, 80, 360)
				camera.lookAt(0, 0, 0);
				camera.updateProjectionMatrix();
				let ambientLight = new myFactoryObj.THREE.AmbientLight(0xffffff, 0.5)
				let pointLight = new myFactoryObj.THREE.PointLight(0xffffff, 0.5);
				scene.add(ambientLight)
				camera.add(pointLight);
				scene.add(camera);
				// 容器
				el.appendChild(renderer.domElement);
				el.appendChild(renderer2.domElement);

				myControls = myFactoryObj.orbitControls(camera, renderer, renderer2)

				localStorage.setItem('target', JSON.stringify(myControls.target))

				function clickOn3dModel(e) {
					let getBoundingClientRect = el.getBoundingClientRect()
					let x = ((e.clientX - getBoundingClientRect.left) / el.offsetWidth) * 2 - 1;
					let y = -((e.clientY - getBoundingClientRect.top) / el.offsetHeight) * 2 + 1;
					let standardVector = new myFactoryObj.THREE.Vector3(x, y, 1);
					let worldVector = standardVector.unproject(camera);
					let ray = worldVector.sub(camera.position).normalize();
					// 创建射线投射器对象
					let rayCaster = new myFactoryObj.THREE.Raycaster(camera.position, ray);
					rayCaster.camera = camera;
					return rayCaster.intersectObjects(scene.children, true)
				}

				function onMouseClick(event) {
					try {
						let intersects = clickOn3dModel(event);
						let selectObject = intersects[0].object;
						let realPosition = selectObject.geometry.boundingSphere.center;
						self.temp.x = Math.round(realPosition.x * 100) / 100;
						self.temp.y = Math.round(realPosition.y * 100) / 100;
						self.temp.z = Math.round(realPosition.z * 100) / 100;

						if (intersects[0]) {// 点击模型,根据不同的类型，执行不同的事件
							let name = intersects[0].object.name;
							if(!intersects[0].object.visible){
								return
							}
							console.log(intersects[0])


							// 改变物体颜色-------重新贴材质
							// myFactoryObj.restoreMeshMaterial(currentMesh, oldChildren);
							// let oldOneMaterial = oldChildren.filter(item => item.name === name)[0]
							// intersects[0].object.material = new THREE.MeshPhongMaterial({
							// 	color: 0xff0000,
							// 	map: oldOneMaterial.material.map
							// });


							if (name && name.includes('device')) {

								let type = name.split('_')[1].toLowerCase();
								let str = name.split('_')

								let _data = {
									equipNum: str[0] + '_' + str[1] + '_' + str[2],
									visible: intersects[0].object.visible,
									building: self.getPosition.building,
									floor: self.getPosition.floor,
									x: self.temp.x,
									y: self.temp.y,
									z: self.temp.z,
									name:name
								}
								self.initSpriteLabel(type, _data)
							}
						}
					} catch (e) {
					}
				}

				el.addEventListener('click', onMouseClick, false);
			},

			// 加载楼栋模型-----
			loadBuildingByName(name, type, cb) {
				resMgrModel && resMgrModel.dispose();
				obList = new THREE.Group();
				fabN1List = new THREE.Group();
				setTimeout(() => {
					name = name.replace(/building_/, '')
					console.log(name)
					switch (name) {
						case 'ob':
							for (let i = 0; i <= 9; i++) {
								this.preLoadModel(`/static/3D/new/ob/ob_${i}f_mini.gltf`, obList, i)
							}
							scene.add(trackModel(obList))
							this.getFloors('building_ob', type ? type : 2);
							break;
						case 'fab_n1':
							for (let i = 0; i <= 7; i++) {
								this.preLoadModel(`/static/3D/new/n1/${i}f_mini.gltf`, fabN1List, i)
							}
							scene.add(trackModel(fabN1List))
							this.getFloors('building_fab_n1', type ? type : 2)
							break
						case 'fab_n2':
							for (let i = 0; i <= 7; i++) {
								this.preLoadModel(`/static/3D/new/n2/${i}f_mini.gltf`, fabN2List, i)
							}
							scene.add(trackModel(fabN2List))
							this.getFloors('building_fab_n2', type ? type : 2)
							break
						case 'cup':
							for (let i = -1; i <= 8; i++) {
								this.preLoadModel(`/static/3D/new/cup/cup_${i}f_mini.gltf`, cupList, i)
							}
							scene.add(trackModel(cupList))
							this.getFloors('building_cup', type ? type : 2)
							break
						case 'wfa':
							for (let i = -1; i <= 4; i++) {
								this.preLoadModel(`/static/3D/new/wfa/wfa_${i}f_mini.gltf`, wfaList, i)
							}
							scene.add(trackModel(wfaList))
							this.getFloors('building_wastewater_station', type ? type : 2)
							break
						case 'whfa':
							for (let i = -1; i <= 4; i++) {
								this.preLoadModel(`/static/3D/new/whfa/whfa_${i}f_mini.gltf`, whfaList, i)
							}
							scene.add(trackModel(whfaList))
							this.getFloors('building_warehouse', type ? type : 2)
							break
						case 'cwa':
							for (let i = 0; i <= 2; i++) {
								this.preLoadModel(`/static/3D/models/cwa/cwa_${i}f_mini.gltf`, cwaList, i)
							}
							scene.add(trackModel(cwaList))
							this.getFloors('building_postion8', type ? type : 2)
							break
						case 'cwb':
							for (let i = 0; i <= 2; i++) {
								this.preLoadModel(`/static/3D/models/cwb/cwb_${i}f_mini.gltf`, cwbList, i)
							}
							scene.add(trackModel(cwbList))
							this.getFloors('building_postion9', type ? type : 2)
							break
						case 'cyvc':
							for (let i = 0; i <= 2; i++) {
								this.preLoadModel(`/static/3D/models/cyv/cyv_${i}f_mini.gltf`, cyvList, i)
							}
							scene.add(trackModel(cyvList))
							this.getFloors('building_supply_station', type ? type : 2)
							break
						case 'sgvc':
							for (let i = 0; i <= 2; i++) {
								this.preLoadModel(`/static/3D/models/sg/sg_${i}f_mini.gltf`, sgList, i)
							}
							scene.add(trackModel(sgList))
							this.getFloors('building_special_gas_station', type ? type : 2)
							break
						case 'shvc':
							for (let i = 0; i <= 2; i++) {
								this.preLoadModel(`/static/3D/models/shvc/shvc_${i}f_mini.gltf`, shvcList, i)
							}
							scene.add(trackModel(shvcList))
							this.getFloors('building_silane_station', type ? type : 2)
							break
						case 'ts':
							for (let i = 0; i <= 3; i++) {
								this.preLoadModel(`/static/3D/models/ts/ts_${i}f_mini.gltf`, tsList, i)
							}
							scene.add(trackModel(tsList))
							this.getFloors('building_substation', type ? type : 2)
							break
						case 'l40':
							for (let i = 1; i <= 4; i++) {
								this.preLoadModel(`/static/3D/models/l40/L40_${i}f_mini.gltf`, l40List, i)
							}
							scene.add(trackModel(l40List))
							this.getFloors('building_l40', type ? type : 2)
							break
					}
					setTimeout(() => {
						this.loading = false;
						cb && cb(name)
					}, 10000)
				}, 2000)
			},

			// 获取SOS路线
			getSOS(building, floor, index) {
				let data = {
					"building": building,
					"floor": floor
				};
				this.$http.post2('/bigscreen/query/sos/points', data).then(res => {
					let list2 = JSON.parse(res.data.data);
					let arr2 = {
						left: {
							"1": [],
							"2": [],
							"3": [],
							"4": [],
							"5": [],
							"6": []
						},
						right: {
							"1": [],
							"2": [],
							"3": [],
							"4": [],
							"5": [],
							"6": []
						},
						bottom: {
							"1": [],
							"2": [],
							"3": [],
							"4": [],
							"5": [],
							"6": []
						},
						top: {
							"1": [],
							"2": [],
							"3": [],
							"4": [],
							"5": [],
							"6": []
						}
					};
					list2.map(item => {
						let _name = item.name.split('_')[1];
						let index = item.name.split('_')[2];
						arr2[_name][index].push(item)
					})
					this.paintSOS(arr2, index)
				})
			},
			// 绘制逃生路线==> 每层楼
			paintSOS(obj, index) {
				let self = this;

				function copyMap(arr) {
					for (let i in arr) {
						console.log(i)
						if (arr[i].length > 0) {
							let direction = arr[i][0].name.split('_')[1];
							let distance = 0;// 距离
							let startPoint = 0;
							let endPoint = 0;
							let position = [0, 0, 0];
							if (direction === 'left' || direction === 'right') {
								arr[i].map(item => {
									if (item.name.split('_')[3] === '1') {
										startPoint = item.x
									} else if (item.name.split('_')[3] === '3') {
										endPoint = item.x
									} else {
										position = [item.x, self.floorHeight[index - 1], item.z]
									}
								})
								distance = Math.abs(endPoint - startPoint);
							} else {
								arr[i].map(item => {
									if (item.name.split('_')[3] === '1') {
										startPoint = item.z
									} else if (item.name.split('_')[3] === '3') {
										endPoint = item.z
									} else {
										position = [item.x + 1.2, self.floorHeight[index - 1], item.z]
									}
								})
								distance = Math.abs(endPoint - startPoint);
							}
							let RollMat = trackLine(new THREE.MeshLambertMaterial());
							let RollTexture = new THREE.TextureLoader().load(`/static/img/${direction}.png`, function (map) {
								RollMat.map = map;
								RollMat.needsUpdate = true;
								RollMat.transparent = true;
								RollMat.side = THREE.DoubleSide;
							});
							RollTexture.wrapS = THREE.RepeatWrapping;
							RollTexture.wrapT = THREE.RepeatWrapping;
							arrows[direction].push(trackLine(RollTexture));
							let geometry = null;
							if (direction === 'left' || direction === 'right') {
								geometry = trackLine(new THREE.PlaneGeometry(distance, 3, distance));
								let mesh = trackLine(new THREE.Mesh(geometry, RollMat));
								mesh.position.set(...position);
								mesh.rotateX(-Math.PI / 2)
								scene.add(mesh);
							} else {
								geometry = trackLine(new THREE.PlaneGeometry(3, distance, distance));
								let mesh = trackLine(new THREE.Mesh(geometry, RollMat));
								mesh.rotateX(-Math.PI / 2)
								mesh.position.set(...position);
								scene.add(mesh);
							}
						}
					}
				}

				for (const k in obj) {
					copyMap(obj[k])
				}

				if (yingbiangui) {
					yingbiangui.visible = true;
					// 应变柜立体标签
					let container3D = createEmergency();
					const objectContainer3 = trackLabel(new myFactoryObj.CSS3DObject(container3D));
					objectContainer3.scale.set(0.2, 0.2, 0.2);
					// cssObjectList.push(objectContainer3);
					let pos = yingbiangui.geometry.boundingSphere.center;
					objectContainer3.position.set(pos.x, self.floorHeight[index - 1] + 28, pos.z)
					scene2.add(objectContainer3);
				}

			},
			// 切换到指定楼层，展示逃生路线
			async switchFloorAndShowSOS() {
				resMgrLine && resMgrLine.dispose();
				resMgr999 && resMgr999.dispose();
				resMgrLabel && resMgrLabel.dispose();
				resMgrModel && resMgrModel.dispose();

				this.loading = true;

				function formatBuilding(name) {
					let result = null
					let val = name.split('-');
					if (val[0] === 'Office') {
						let num = val[1].split('F')[0];
						if (num === 'R') {
							num = 8
						}
						result = ['building_ob', 'F' + num, '800' + num, num]
					} else if (val[0] === 'Fab_n1') {
						let num = Number(val[1].split('F')[0]);
						result = ['building_fab_n1', 'F' + num, '801' + (num - 1), num]
					}
					return result
				}

				let processId = localStorage.getItem('processInstanceId');
				let result = await this.$http.get3("/emergency/event/queryOne", {processInstanceId: processId}).then(res => {
					if (res) {
						return res.data.data.eventLocation
					}
				});

				let myResult = formatBuilding(result);
				let data = {
					dictItemVal: myResult[2],
					dictName: myResult[1],
					building: myResult[0]
				}


				this.getPosition.building = data.building;
				this.getPosition.floor = data.dictItemVal;
				this.getPosition.floorName = data.dictName;
				this.currentFloor = data.dictName;
				let obj = {
					"building": data.building,
					"floor": data.dictItemVal
				}
				console.log(this.getPosition)
				// let res = await this.$http.post2("/bigscreen/filtrate/bf", obj).then(res => {
				// 	return res.data.data[0].children
				// })
				// let url = res[0].url

				setTimeout(() => {
					if (myResult[0] === 'building_ob') {
						this.preLoadModel(`/static/3D/new/ob/ob_${myResult[3]}f_mini.gltf`, obList, myResult[3], 1)
					} else if (myResult[0] === 'building_fab_n1') {
						this.preLoadModel(`/static/3D/new/n1/${myResult[3]}f_mini.gltf`, fabN1List, myResult[3], 1)
					} else if (myResult[0] === 'building_fab_n2') {
						this.preLoadModel(`/static/3D/new/n2/n2_${myResult[3]}f_mini.gltf`, fabN1List, myResult[3], 1)
					}
					this.loading = false;
					setTimeout(() => {
						this.getSOS(data.building, data.dictItemVal, myResult[3]);
						this.openDoorsSOS = true // 开启所有门禁的按钮展示出来
					}, 1500)
				}, 500)
			},

			// 门禁控制
			async controlDoors(resp, status) {
				let controlData = {
					"building": resp.building,
					"floor": resp.floor,
					"type": resp.equipType,
					"equipNumAndStates": JSON.stringify([
						{equipNum: resp.equipNum, equipState: status}
					]),
					"equipTypeChild": resp.equipTypeChild,
					"openDoorTime": '0005'
				}

				let res = await openDoors(this, controlData);
				if (res) {
					this.removeUseless();
					this.initAllDoors(resp.equipNum)
				}
			},

			// 初始化所有的门禁开关状态----根据楼栋+楼层
			initAllDoors(door) {
				let data = {
					"building": this.getPosition.building,
					"equipNum": door || '',// 如果指定的门，则获取指定的门，否则获取全部
					"floor": this.getPosition.floor,
				}
				this.$http.post2('/bigscreen/query/door/info', data).then(res => {
					let list = res.data.data;
					list.forEach(item => {
						myDoors.forEach(key => {
							let str = key.name.split('_');
							let doorIndex = str[0] + '_' + str[1] + '_' + str[2]
							if (item.equipNum === doorIndex) {
								if (item.equipState === '10' || item.equipState === '12') {
									key.visible = false
								} else if (item.equipState === '11') {
									key.visible = true
								}
							}
						})
					})
				})
			},

			// 移除不必要的东西----alarm-circle是扩散波纹;scroll-tube是轨迹线
			removeUseless() {
				try {
					scene.children.forEach(item => { // 移除特定名称的外部物体---流动的贴图
						if (item.name === 'scroll-tube') {
							item.geometry.dispose();
							item.material.dispose();
							scene.remove(item);
						}
					})
					scene.children.forEach(item => {// 波纹扩散
						if (item.name === 'alarm-circle') {
							item.geometry.dispose();
							item.material.dispose();
							scene.remove(item);
						}
					})
					textureList = [];
					textureList.length = 0

				} catch (e) {
				}
			},

			// 根据工号查询员工信息----鼠标移出立即执行
			getStaffDetailById(e) {
				this.$http.get3('/personnelAccessRecord/queryPersonInfo', {employeeId: e.target.value}).then(res => {
					if (res.data.data) {
						let result = res.data.data;
						this.staffDetail.employeeName = result.staffName;
						this.staffDetail.employeeId = result.jobNumber;
						this.staffDetail.departmentName = result.department;
						this.staffDetail.avatar = result.photoUrl;
						this.staffPath = true;
					} else {
						this.$message('error', res.data.msg)
					}
				})
			},

			// 根据员工工号及时间查询轨迹
			getStaffPathById() {
				//this.smokeAlarm([0,12,0]) =>烟感告警时调用,参数是三维坐标
				if (this.staffDetail.employeeId) {
					if (this.staffDetail.date && this.staffDetail.startTime && this.staffDetail.startTime) {
						let st = new Date(this.staffDetail.date + ' ' + this.staffDetail.startTime).getTime();
						let et = new Date(this.staffDetail.date + ' ' + this.staffDetail.endTime).getTime();
						let data = {
							employeeId: this.staffDetail.employeeId,
							startTime: st,
							endTime: et
						};
						this.staffHistory = [];
						this.$http.get3('/personnelAccessRecord/queryPersonnelAccessRecord', data).then(res => {
							if (res.data.code === 0) {
								this.$message('error', res.data.msg)
							} else {
								if (res.data.data.recordList.length === 0) {
									this.$message('error', '轨迹记录列表为空！')
								} else {
									let arr = res.data.data.recordList;
									let obj = {
										"building_ob": [],
										"building_fab_n1": [],
										"building_fab_n2": [],
										"building_cup": []
									};
									arr.map(item => {
										let name = item.id.split('#')[0];
										let index = Number(item.id.split('#')[2]);
										obj[name].push(index)
										if (item.listdata.length > 0) {
											item.listdata.map(k => {
												k['cnTime'] = formatFullDate(Number(k.add_date))
											})
										}
									})

									for (let key in obj) {
										if (obj[key].length > 0) {
											obj[key].sort();
											let val = obj[key][0];
											let result = arr.filter(k => {
												return Number(k.id.split('#')[2]) === val
											})
											result[0].name = 1
										}
									}
									console.log(arr)
									this.staffHistory = arr;

									this.staffDetail.avatar = res.data.data.relcard.photo;
								}
							}
						})
					} else {
						this.$message('error', '请选择时间！')
					}
				} else {
					this.$message('error', '工号不能为空！')
				}
			},

			// 楼栋恢复透明之前
			repairBuilding() {
				this.userPath = false;
				this.showStatistic = true;
				this.showHistory = false;
				// obList.children.forEach(item=>{
				// 	if(item.buildingIndex === 9){
				// 		item.visible = true
				// 	}else if(item.buildingIndex >0 && item.buildingIndex < 9){
				// 		item.children.forEach(k => {
				// 			if(k.name.includes('waiguan')){
				// 				k.visible = false
				// 			}
				// 			if (k.type === 'Mesh') {
				// 				if(k.name.includes('dimian')){
				// 					k.material.transparent = false;//是否透明
				// 					k.material.opacity = 1;//透明度
				// 				}else if(k.name.includes('qiang')){
				// 					k.material.transparent = false;//是否透明
				// 					k.material.opacity = 1;//透明度
				// 				}
				// 			}
				// 		})
				// 	}
				// })
			},


			// 加载轨迹模型 && 播放轨迹
			getModel(data) {
				console.log(data)
				this.loading = true;

				resMgrLine && resMgrLine.dispose();
				resMgr999 && resMgr999.dispose();
				resMgrLabel && resMgrLabel.dispose();
				resMgrModel && resMgrModel.dispose()

				let val = data.id.split('#');
				this.loadBuildingByName(val[0], 2, this.seeWalkPath)
			},
			async seeWalkPath() {
				let st = new Date(this.staffDetail.date + ' ' + this.staffDetail.startTime).getTime();
				let et = new Date(this.staffDetail.date + ' ' + this.staffDetail.endTime).getTime();
				let myObj = {
					"building": this.getPosition.building,
					"employeeId": this.staffDetail.employeeId,
					"startTime": st,
					"endTime": et
				}

				let result = await this.$http.get3("/personnelAccessRecord/queryNewPersonnelAccessRecord", myObj).then(res => {
					this.loading = false;
					return res.data.data
				})
				console.log(result)


				function formatBuilding(build, floor) {
					if (build === 'building_fab_n1') {
						switch (floor) {
							case '8010':
								return [1, 'F1']
							case '8011':
								return [2, 'F2']
							case '8012':
								return [3, 'F2.5']
							case '8013':
								return [4, 'F3']
							case '8014':
								return [5, 'F4']
							case '8008':
								return [6, 'RF']
						}
					} else if (build === 'building_fab_n2') {
						switch (floor) {
							case '8020':
								return [1, 'F1']
							case '8021':
								return [2, 'F2']
							case '8022':
								return [3, 'F2.5']
							case '8023':
								return [4, 'F3']
							case '8024':
								return [5, 'F4']
							case '8008':
								return [6, 'RF']
						}
					} else if (build === 'building_ob') {
						switch (floor) {
							case '8001':
								return [1, 'F1']
							case '8002':
								return [2, 'F2']
							case '8003':
								return [3, 'F3']
							case '8004':
								return [4, 'F4']
							case '8005':
								return [5, 'F5']
							case '8006':
								return [6, 'F6']
							case '8007':
								return [6, 'F7']
							case '8008':
								return [6, 'RF']
						}
					} else if (build === 'building_cup') {
						switch (floor) {
							case '8025':
								return [0, 'B1']
							case '8026':
								return [2, 'F1']
							case '8027':
								return [3, 'F2']
							case '8010':
								return [4, 'F2.5']
							case '8028':
								return [5, 'F3']
							case '8029':
								return [6, 'F4']
							case '8008':
								return [7, 'R1']
							case '8009':
								return [8, 'R2']
						}
					}
				}

				result.forEach((item, index) => {
					setTimeout(() => {
						let list = [];

						let k = formatBuilding(item.budiling, item.floor)[0] - 1;
						console.log(k)
						let fabList = [-1, 6, 13, 20, 27, 34, 41, 48];
						let num = item.budiling.includes('building_fab_n') ? fabList[k] - 2 : k * 7 - 2;

						item.axisNList.forEach(item => {
							list.push(track(new myFactoryObj.THREE.Vector3(item.x, num, item.y)))
						})

						let data = {
							dictItemVal: item.floor,
							dictName: formatBuilding(item.budiling, item.floor)[1],
							modelSort: k
						}
						console.log(data)
						this.selectFloor(data, k)
						this.autoDrawLine(list, result);

					}, 9000 * index)
				})
			},

			// 绘制一整条管道+流动效果
			drawATube(arr, data) {
				// function createTag(tag, i) {
				// 	let end = track(createSprite(tag));
				// 	let pos = JSON.parse(data.listdata[i].position);
				// 	pos[1] += 6;
				// 	end.position.set(pos[0], pos[1], pos[2]);
				// 	end.name = 'scroll-tube'
				// 	scene.add(end)
				// }
				//
				// // 添加起点,经过点，终点的雪碧图
				// for (let i = 0; i < data.listdata.length; i++) {
				// 	if (i === 0) {
				// 		createTag('start', i);
				// 	} else if (i === data.listdata.length - 1) {
				// 		createTag('end', i);
				// 	} else {
				// 		createTag('pass', i);
				// 	}
				// }


				myCurve = trackLine(new THREE.CatmullRomCurve3(arr));
				let tubeGeometry = trackLine(new THREE.TubeGeometry(myCurve, 150, 0.3, 20, false));
				// tubeGeometry.vertices = myCurve.getPoints(100);
				// tubeGeometry.faces.push( new THREE.Face3( 2, 1, 0 ), new THREE.Face3( 2, 0, 3 ) );

				let textureLoader = trackLine(new THREE.TextureLoader());
				let texture1 = trackLine(textureLoader.load('/static/img/arrow9.png'));
				texture1.wrapS = THREE.RepeatWrapping
				texture1.wrapT = THREE.RepeatWrapping
				texture1.repeat.x = 40;
				textureList.push(texture1)
				let tubeMaterial = trackLine(new THREE.MeshPhongMaterial({
					map: texture1,
					transparent: true
				}));
				tubeMaterial.depthWrite = false;
				let mesh = trackLine(new THREE.Mesh(tubeGeometry, tubeMaterial)); //网格模型对象Mesh
				mesh.material.transparent = true;
				mesh.name = 'scroll-tube'
				scene.add(mesh); //网格模型添加到场景中

				// this.animateBlock(arr)
			},

			changePosition(t) {
				const position = myCurve.getPointAt(t); // t: 当前点在线条上的位置百分比，后面计算
				mesh999.position.copy(position);
			},
			changeLookAt(t) {
				const position = myCurve.getPointAt(t);
				const tangent = myCurve.getTangentAt(t);
				const lookAtVec = tangent.add(position); // 位置向量和切线向量相加即为所需朝向的点向量
				mesh999.lookAt(lookAtVec);
			},
			animateBlock() {
				myCurve.curveType = 'chordal'; // 曲线类型
				myCurve.closed = false; // 曲线是否闭合
				const points = myCurve.getPoints(100); // 50等分获取曲线点数组
				const line = new THREE.LineLoop(
					new THREE.BufferGeometry().setFromPoints(points),
					new THREE.LineBasicMaterial({color: 0x00ff00})
				); // 绘制实体线条，仅用于示意曲线，后面的向量线条同理，相关代码就省略了
				scene.add(line);
				const geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 0.1);
				const material = new THREE.MeshBasicMaterial(0xffffff);
				mesh999 = new THREE.Mesh(geometry, material);
			},

			autoDrawLine(arr, data) {

				resMgrLine && resMgrLine.dispose();
				resMgrLabel && resMgrLabel.dispose()

				let curve = trackLine(new myFactoryObj.THREE.CatmullRomCurve3(arr));
				let geometry = trackLabel(new THREE.SphereGeometry(2, 20, 20));
				let material = trackLabel(new THREE.MeshBasicMaterial({color: 0xff0000}));
				let sphere = trackLabel(new THREE.Mesh(geometry, material));
				scene.add(sphere);

				curve.autoClose = false;
				let points = curve.getPoints(100);
				let length = points.length;
				let val = 0;

				let pos = [points[0].x, points[0].y, points[0].z]
				createTag('start', pos)

				function createTag(tag, pos) {
					let end = trackLabel(createSprite(tag));
					pos[1] += 8;
					end.position.set(pos[0], pos[1], pos[2]);
					end.name = 'scroll-tube'
					scene.add(end)
				}

				const draw = () => {
					if (val === length - 1) {
						// this.drawATube(arr,data)
						let pos = [points[99].x, points[99].y, points[99].z]
						createTag('end', pos);
						return
					}

					let subPoints1 = points[val];
					let subPoints2 = points[(val + 1) % length];
					sphere.position.set(subPoints2.x, subPoints2.y, subPoints2.z)

					let subPoints = [];
					subPoints.push(subPoints1);
					subPoints.push(subPoints2);

					// 1、使用线连接

					let testArr = [];
					subPoints.forEach(item => {
						testArr.push(item.x, item.y, item.z)
					})

					let geometry = trackLine(new LineGeometry())
					geometry.setPositions(testArr)

					let material = trackLine(new LineMaterial({
						color: 0xff0000,
						linewidth: 3
					}))
					material.resolution.set(window.innerWidth, window.innerHeight)
					let line = trackLine(new Line2(geometry, material))
					line.computeLineDistances()
					scene.add(line)

					val++;
					setTimeout(draw, 50);
				}
				draw()
			},

			epsilon(value) {
				return Math.abs(value) < 1e-10 ? 0 : value;
			},
			getCameraCSSMatrix(matrix) {
				let elements = matrix.elements;
				return 'matrix3d(' +
					this.epsilon(elements[0]) + ',' +
					this.epsilon(-elements[1]) + ',' +
					this.epsilon(elements[2]) + ',' +
					this.epsilon(elements[3]) + ',' +
					this.epsilon(elements[4]) + ',' +
					this.epsilon(-elements[5]) + ',' +
					this.epsilon(elements[6]) + ',' +
					this.epsilon(elements[7]) + ',' +
					this.epsilon(elements[8]) + ',' +
					this.epsilon(-elements[9]) + ',' +
					this.epsilon(elements[10]) + ',' +
					this.epsilon(elements[11]) + ',' +
					this.epsilon(elements[12]) + ',' +
					this.epsilon(-elements[13]) + ',' +
					this.epsilon(elements[14]) + ',' +
					this.epsilon(elements[15]) +
					')';
			},

			// 调整镜头位置
			changeCameraDirection(pos) {
				let option1 = {
					x: camera.position.x,
					y: camera.position.y,
					z: camera.position.z
				};
				let tween1 = new TWEEN.Tween(option1).to({
					x: pos[0],
					y: pos[1],
					z: pos[2]
				}, 2000).onUpdate(function (e) {
					camera.position.set(e.x, e.y, e.z);
				}).delay(10)
				tween1.easing(TWEEN.Easing.Linear.None);
				tween1.start();
			},
			// 设置透明度
			opacityEveryMesh() {
				console.log(scene)
				scene.children.map(item => {
					if (item.type === "Group") {
						item.children.forEach(key => {
							if (key.type === 'Mesh' && key.name.includes('dimian')) {
								val.material.transparent = true;//是否透明
								val.material.opacity = 0.6;//透明度
							}
						})
					}
				})

			},

			clickFace(param) {
				switch (param) {
					case 'front':
						this.changeCameraDirection([0, 5, 50])
						break;
					case 'back':
						this.changeCameraDirection([0, 5, -50])
						break;
					case 'left':
						this.changeCameraDirection([-50, 5, 0])
						break;
					case 'right':
						this.changeCameraDirection([50, 5, 0])
						break;
					case 'top':
						this.changeCameraDirection([0, 50, 0])
						break;
					case 'bottom':
						this.changeCameraDirection([0, -50, 0])
						break;
				}
			},

			render() {
				renderer.render(scene, camera);
				renderer2.render(scene2, camera);
				animationID = requestAnimationFrame(this.render);
				myControls.update(clock.getDelta());
				TWEEN.update()

				let time = Date.now();
				let t = (time % loopTime) / loopTime; // 计算当前时间进度百分比

				if (mesh999) {
					this.changePosition(t);
					this.changeLookAt(t);
				}

				// 指南针旋转跟随camera
				if (this.$refs.myCube) {
					this.$refs.myCube.style.transform = `translateZ(-300px) ${this.getCameraCSSMatrix(camera.matrixWorldInverse)}`;
				}
				// 管道贴图流动
				if (textureList.length > 0) {
					textureList.map(item => {
						item.offset.x -= 0.03
					})
				}

				if (arrows) {
					for (let k in arrows) {
						if (arrows[k].length > 0) {
							if (k === 'left') {
								arrows[k].map(item => {
									item.offset.x += 0.005
								})
							}
							if (k === 'right') {
								arrows[k].map(item => {
									item.offset.x -= 0.005
								})
							}
							if (k === 'top') {
								arrows[k].map(item => {
									item.offset.y -= 0.005
								})
							}
							if (k === 'bottom') {
								arrows[k].map(item => {
									item.offset.y += 0.005
								})
							}
						}
					}
				}

				// 管道贴图流动
				if (RollTexture) {
					RollTexture.offset.x -= 0.03
				}

				// 立体标签面朝自己
				if (cssObjectList.length > 0) {
					cssObjectList.map(item => {
						item.lookAt(camera.position)
					})
				}
			},

			formatBuildingForPath(build, floor) {
				if (build === 'building_fab_n1') {
					switch (floor) {
						case '8010':
							return [1, 'F1']
						case '8011':
							return [2, 'F2']
						case '8012':
							return [3, 'F2.5']
						case '8013':
							return [4, 'F3']
						case '8014':
							return [5, 'F4']
						case '8008':
							return [6, 'RF']
					}
				} else if (build === 'building_fab_n2') {
					switch (floor) {
						case '8020':
							return [1, 'F1']
						case '8021':
							return [2, 'F2']
						case '8022':
							return [3, 'F2.5']
						case '8023':
							return [4, 'F3']
						case '8024':
							return [5, 'F4']
						case '8008':
							return [6, 'RF']
					}
				} else if (build === 'building_ob') {
					switch (floor) {
						case '8001':
							return [1, 'F1']
						case '8002':
							return [2, 'F2']
						case '8003':
							return [3, 'F3']
						case '8004':
							return [4, 'F4']
						case '8005':
							return [5, 'F5']
						case '8006':
							return [6, 'F6']
						case '8007':
							return [6, 'F7']
						case '8008':
							return [6, 'RF']
					}
				} else if (build === 'building_cup') {
					switch (floor) {
						case '8025':
							return [-1, 'B1']
						case '8026':
							return [1, 'F1']
						case '8027':
							return [2, 'F2']
						case '8010':
							return [3, 'F2.5']
						case '8028':
							return [4, 'F3']
						case '8029':
							return [5, 'F4']
						case '8008':
							return [6, 'R1']
						case '8009':
							return [7, 'R2']
					}
				}
			},


			getFinalPath(value) {
				this.loading = true;

				resMgrLine && resMgrLine.dispose();
				resMgr999 && resMgr999.dispose();
				// resMgrLabel && resMgrLabel.dispose();
				// resMgrModel && resMgrModel.dispose()

				// this.loadBuildingByName('building_fab_n2',2,this.seeStrangerPath)
				this.seeStrangerPath()
			},

			// 查看陌生人轨迹记录--回放
			async seeStrangerPath() {
				let myObj = {
					"building": this.getPosition.buildingName
				}
				let result = await this.$http.get3("/strangerPersonnelAccessRecord/queryNewPersonnelAccessRecord", myObj).then(res => {
					this.loading = false;
					return res.data.data
				})

				function formatBuilding(build, floor) {
					if (build === 'building_fab_n1') {
						switch (floor) {
							case '8010':
								return [1, 'F1']
							case '8011':
								return [2, 'F2']
							case '8012':
								return [3, 'F2.5']
							case '8013':
								return [4, 'F3']
							case '8014':
								return [5, 'F4']
							case '8008':
								return [6, 'RF']
						}
					} else if (build === 'building_fab_n2') {
						switch (floor) {
							case '8020':
								return [1, 'F1']
							case '8021':
								return [2, 'F2']
							case '8022':
								return [3, 'F2.5']
							case '8023':
								return [4, 'F3']
							case '8024':
								return [5, 'F4']
							case '8008':
								return [6, 'RF']
						}
					} else if (build === 'building_ob') {
						switch (floor) {
							case '8001':
								return [1, 'F1']
							case '8002':
								return [2, 'F2']
							case '8003':
								return [3, 'F3']
							case '8004':
								return [4, 'F4']
							case '8005':
								return [5, 'F5']
							case '8006':
								return [6, 'F6']
							case '8007':
								return [6, 'F7']
							case '8008':
								return [6, 'RF']
						}
					} else if (build === 'building_cup') {
						switch (floor) {
							case '8025':
								return [-1, 'B1']
							case '8026':
								return [1, 'F1']
							case '8027':
								return [2, 'F2']
							case '8010':
								return [3, 'F2.5']
							case '8028':
								return [4, 'F3']
							case '8029':
								return [5, 'F4']
							case '8008':
								return [6, 'R1']
							case '8009':
								return [7, 'R2']
						}
					}
				}

				if (result.length > 0) {
					result.forEach((item, index) => {
						setTimeout(() => {
							let list = [];

							let k = formatBuilding(item.budiling, item.floor)[0] - 1;
							let fabList = [-1, 6, 13, 20, 27, 34, 41, 48];
							let num = item.budiling.includes('building_fab_n') ? fabList[k] - 2 : k * 7 - 2;

							item.axisNList.forEach(item => {
								list.push(track(new myFactoryObj.THREE.Vector3(item.x, num, item.y)))
							})

							let data = {
								dictItemVal: item.floor,
								dictName: formatBuilding(item.budiling, item.floor)[1],
								modelSort: k
							}
							this.selectFloor(data, k)
							this.autoDrawLine(list)

						}, 15000 * index)
					})
				} else {
					this.$message('error', '暂无轨迹记录')
				}
			},

			// 跳转到陌生人闯入的楼层
			async switchInFloorWithStranger() {
				let myFaceData = JSON.parse(localStorage.getItem('faceBasicData'));
				let self = this;
				let myObj = {
					"building": this.singlePathObj.building
				}
				let result = await this.$http.get3("/strangerPersonnelAccessRecord/queryNewPersonnelAccessRecord", myObj).then(res => {
					this.loading = false;
					return res.data.data
				})
				console.log(this.singlePathObj.building)
				console.log(this.singlePathObj.floor)


				let k = this.formatBuildingForPath(this.singlePathObj.building, this.singlePathObj.floor)[0] - 1;
				let data = {
					dictItemVal: this.singlePathObj.floor,
					dictName: this.formatBuildingForPath(this.singlePathObj.building, this.singlePathObj.floor)[1],
					modelSort: k
				}
				setTimeout(() => {
					this.selectFloor(data, k);
					if (result && result.length > 0) {
						let k = this.formatBuilding(result[0].budiling, result[0].floor)[0];
						deviceBuildingList[k].forEach(item => {
							if (item.name.includes('camera')) {
								item.visible = true
							}
							if (item.name === myFaceData.equipNum) {
								let type = item.name.split('_')[1];
								let pos = item.geometry.boundingSphere.center;

								let _data = {
									equipNum: myFaceData.equipNum,
									visible: true,
									building: self.getPosition.building,
									floor: self.getPosition.floor,
									x: pos.x,
									y: pos.y + 5,
									z: pos.z
								}
								self.initSpriteLabel(type, _data);

								// 播放视频回放
								// let myData = self.$store.state.faceBasic;
								// console.log(myData)
								// let start = formatFullDate(Number(myData.receiveTime / 1000) - 20000);
								// let end = formatFullDate(Number(myData.receiveTime / 1000));
								// console.log(start,end)
								// self.seeVideo(myData.equipMessage, start, end)
							}
						})
					} else {
						let k = this.formatBuilding(this.singlePathObj.building, this.singlePathObj.floor)[0];
						deviceBuildingList[k].forEach(item => {
							if (item.name.includes('camera')) {
								item.visible = true
							}
							if (item.name === myFaceData.equipNum) {
								let type = item.name.split('_')[1];
								let str = item.name.split('_');
								let pos = item.geometry.boundingSphere.center;

								let _data = {
									equipNum: myFaceData.equipNum,
									visible: true,
									building: self.getPosition.building,
									floor: self.getPosition.floor,
									x: pos.x,
									y: pos.y + 5,
									z: pos.z
								}
								self.initSpriteLabel(type, _data)
							}
						})
					}
				}, 5000)
			},
			// 获取陌生人轨迹----
			getStrangerPath(data) {
				console.log(data)
				if (data.pictureUrl === '') {
					this.$message('error', '无人脸图片！')
					return;
				}

				this.loading = true;

				resMgrLine && resMgrLine.dispose();
				resMgr999 && resMgr999.dispose();
				resMgrLabel && resMgrLabel.dispose();
				resMgrModel && resMgrModel.dispose();
				resMgrDevice && resMgrDevice.dispose();

				this.userPath = true;
				this.showStatistic = false;
				this.showHistory = false;
				this.staffPath = true;

				this.staffDetail.employeeName = data.staffName;
				this.staffDetail.departmentName = '未知';
				this.staffDetail.avatar = data.pictureUrl;
				this.staffDetail.employeeId = '未知';

				let url = data.pictureUrl;
				// let url = 'http://192.168.92.22:8089/tempimg/20211224/1640326989463.jpg'
				// let url = '/static/img/777777.jpg'


				let Img = new Image(), dataURL = '';
				Img.src = url + "?v=" + Math.random(); // 处理缓存,fix缓存bug,有缓存，浏览器会报错;
				Img.setAttribute("crossOrigin", 'Anonymous') // 解决控制台跨域报错的问题（没用就跟后台沟通添加跨域）
				Img.onload = () => { //要先确保图片完整获取到，这是个异步事件
					let canvas = document.createElement("canvas"), //创建canvas元素
						width = Img.width, //确保canvas的尺寸和图片一样
						height = Img.height;
					canvas.width = width;
					canvas.height = height;
					canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
					dataURL = canvas.toDataURL('image/jpeg'); //转换图片为dataURL

					let hikUrl = dataURL.split('data:image/jpeg;base64,')[1];

					let formData = new FormData();
					formData.append('facePicBinaryData', hikUrl)

					this.$http.postHik('/hikDoorInfo/sub/getFacePicture', formData).then(res => {

						this.$http.postDaHua('/stranger/queryFaceToFace', formData).then(resp => {
							console.log(resp)

							console.log(res)

							if (res.data.data || resp.data.data) {
								setTimeout(() => {
									this.$http.get3('/strangerPersonnelAccessRecord/queryStrangerPersonnelAccessRecord').then(res => {
										let arr = res.data.data.recordList;
										if (arr.length === 0) {
											this.$message('error', '查无数据！')
											return;
										}
										arr.map((item, k) => {
											if (item.listdata.length > 0) {
												item.listdata.map(k => {
													k['cnTime'] = formatFullDate(Number(k.add_date))
												})
											}
											if (k === 0) {
												this.singlePathObj.building = item.id.split('#')[0];
												this.singlePathObj.floor = item.id.split('#')[1];
											}
										})
										console.log(this.singlePathObj)
										this.strangerWalkPath = arr;
										this.loadBuildingByName(this.singlePathObj.building, 2, this.switchInFloorWithStranger)
									})
								}, 2000)
							} else {
								let obj = {
									addDate: data.receiveTime,
									equipMessage: data.equipMessage,
									location: data.location
								}
								this.$http.get3('/strangerPersonnelAccessRecord/query/single/stranger/personnel/record', obj).then(res => {
									let arr = res.data.data.recordList;
									if (arr.length === 0) {
										this.$message('error', '查无数据！')
										return;
									}
									arr.map(item => {
										if (item.listdata.length > 0) {
											item.listdata.map(k => {
												k['cnTime'] = formatFullDate(Number(k.add_date))
											})
										}
										this.singlePathObj.building = item.id.split('#')[0];
										this.singlePathObj.floor = item.id.split('#')[1];
									})
									console.log(this.singlePathObj)
									this.strangerWalkPath = arr;
									this.loadBuildingByName(this.singlePathObj.building, 2, this.switchInFloorWithStranger)
								})
							}
						})
					})
				};
			},
			// 监控上大屏
			initCameraWebsocket() {
				let divDom = document.getElementById('video-window');
				let url = this.$socket_xy;
				let socket = new SockJS(url + "/gs-guide-websocket", null, {
					timeout: 15000,
				});
				this.stompClient = Stomp.over(socket);
				this.stompClient.connect({}, (frame) => {
					this.stompClient.subscribe("/topic/toscreen", msg => {
						if (msg.body) {
							playCustomCountVideo(this, msg.body, divDom)
						}
					});
				})
			}
		},
		mounted() {
			this.getMenu();
			this.getDeviceMenu();
			this.init3D();
			this.render();
			this.getTodayDate();

			loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
				this.currentLoad = itemsLoaded;
				this.totalLoad = itemsTotal;
			}
			loadingManager.onLoad = (url, itemsLoaded, itemsTotal) => {
				this.loading = false;
				this.currentLoad = 0;
				this.totalLoad = 0;
			}

			// 监听store 内的值变化
			this.$store.watch(
				(state) => state.strangerPath,
				(value) => {
					console.log(`watch value ${value}`)
					if (value) {
						let data = this.$store.state.faceBasic;
						localStorage.setItem('faceBasicData', JSON.stringify(data));
						this.getStrangerPath(data)
					}
				}
			)

			this.$store.watch(
				(state) => state.showSOS,
				(value) => {
					console.log(`watch value ${value}`)
					if (value) {
						this.switchFloorAndShowSOS();
					}
				}
			)


			// setTimeout(()=>{
			// 	let data = {"receiveTime":"1638788142901000","equipMessage":"34010200581314000733","pictureUrl":"/static/img/9999999999.jpg","staffName":"陌生人","location":"2700_N2-2F-C051-6号梯进南侧白光区人脸","dept":"","equipNum":"device_camera_1083"}
			//
			// 	this.seeVideo(34010200581314000733,'2021-12-28 00:00:00','2021-12-29 00:00:00')
			// },10000)

			setTimeout(() => {
				if (!window.token) {// 宇视监控，必须登录后才能调用
					loginToServer(this);
				}

				this.initCameraWebsocket()

			}, 3000)
		},
		beforeDestroy() {
			try {
				this.removeUseless();
			} catch (e) {
			}
		}
	}

</script>

<style lang="stylus" scoped>
	#reload-btn {
		position: absolute;
		top: 40px;
		left: 1520px;
		z-index: 9;
		font-size: 18px;
		font-weight: 700
	}

	.test-btn
		position fixed
		right 20px
		top 100px
		width 100px
		height 600px
		border 1px solid #00FFFF
		display flex
		flex-direction column

	.scene
		width 100px
		height 100px
		margin 10px
		perspective 400px
		position absolute
		top 0
		right 20px

	#cube
		width 100px
		height 100px
		position relative
		transform-style preserve-3d
		transform translateZ(-300px)

	.cube__face
		position absolute
		width 100px
		height 100px
		border 1px solid #CDCECF
		line-height 100px
		font-weight bold
		text-align center
		color #AEB2B5
		font-size 40px
		border-radius 10px
		cursor pointer

	.cube__face--front
		background #E2E8EC

	.cube__face--right
		background #E2E8EC

	.cube__face--back
		background #E2E8EC

	.cube__face--left
		background #E2E8EC

	.cube__face--top
		background #E2E8EC

	.cube__face--bottom
		background #E2E8EC

	.cube__face--front
		transform rotateY(0deg) rotateX(180deg) translateZ(-50px)

	.cube__face--right
		transform rotateY(90deg) rotateX(180deg) translateZ(-50px)

	.cube__face--back
		transform rotateY(180deg) rotateX(180deg) translateZ(-50px)

	.cube__face--left
		transform rotateY(-90deg) rotateX(180deg) translateZ(-50px)

	.cube__face--top
		transform rotateX(-90deg) rotateX(180deg) translateZ(-50px)

	.cube__face--bottom
		transform rotateX(90deg) rotateX(180deg) translateZ(-50px)

	.factory
		position relative

		.alarm-contain
			position absolute
			right 260px
			top -80px

		.loading-full-screen
			width: 1920px;
			height: 1080px;
			position: fixed;
			left 0
			top 0
			z-index 999999

			.my-model-load
				position absolute
				width: 200px
				height: 30px
				font-size 16px
				font-weight 500
				top 46%
				left 48%

			.sk-circle
				width: 100px;
				height: 100px;
				position: absolute;
				left 50%
				top 50%

			.sk-circle .sk-child
				width: 100%;
				height: 100%;
				position: absolute;
				left: calc(50% - 50px);
				top: calc(50% - 50px);

			.sk-circle .sk-child:before
				content: '';
				display: block;
				margin: 0 auto;
				width: 15%;
				height: 15%;
				background-color: #fff;
				border-radius: 100%;
				-webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
				animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;

			.sk-circle .sk-circle2
				-webkit-transform: rotate(30deg);
				-ms-transform: rotate(30deg);
				transform: rotate(30deg);

			.sk-circle .sk-circle3
				-webkit-transform: rotate(60deg);
				-ms-transform: rotate(60deg);
				transform: rotate(60deg);

			.sk-circle .sk-circle4
				-webkit-transform: rotate(90deg);
				-ms-transform: rotate(90deg);
				transform: rotate(90deg);

			.sk-circle .sk-circle5
				-webkit-transform: rotate(120deg);
				-ms-transform: rotate(120deg);
				transform: rotate(120deg);

			.sk-circle .sk-circle6
				-webkit-transform: rotate(150deg);
				-ms-transform: rotate(150deg);
				transform: rotate(150deg);

			.sk-circle .sk-circle7
				-webkit-transform: rotate(180deg);
				-ms-transform: rotate(180deg);
				transform: rotate(180deg);

			.sk-circle .sk-circle8
				-webkit-transform: rotate(210deg);
				-ms-transform: rotate(210deg);
				transform: rotate(210deg);

			.sk-circle .sk-circle9
				-webkit-transform: rotate(240deg);
				-ms-transform: rotate(240deg);
				transform: rotate(240deg);

			.sk-circle .sk-circle10
				-webkit-transform: rotate(270deg);
				-ms-transform: rotate(270deg);
				transform: rotate(270deg);

			.sk-circle .sk-circle11
				-webkit-transform: rotate(300deg);
				-ms-transform: rotate(300deg);
				transform: rotate(300deg);

			.sk-circle .sk-circle12
				-webkit-transform: rotate(330deg);
				-ms-transform: rotate(330deg);
				transform: rotate(330deg);

			.sk-circle .sk-circle2:before
				-webkit-animation-delay: -1.1s;
				animation-delay: -1.1s;

			.sk-circle .sk-circle3:before
				-webkit-animation-delay: -1s;
				animation-delay: -1s;

			.sk-circle .sk-circle4:before
				-webkit-animation-delay: -0.9s;
				animation-delay: -0.9s;

			.sk-circle .sk-circle5:before
				-webkit-animation-delay: -0.8s;
				animation-delay: -0.8s;

			.sk-circle .sk-circle6:before
				-webkit-animation-delay: -0.7s;
				animation-delay: -0.7s;

			.sk-circle .sk-circle7:before
				-webkit-animation-delay: -0.6s;
				animation-delay: -0.6s;

			.sk-circle .sk-circle8:before
				-webkit-animation-delay: -0.5s;
				animation-delay: -0.5s;

			.sk-circle .sk-circle9:before
				-webkit-animation-delay: -0.4s;
				animation-delay: -0.4s

			.sk-circle .sk-circle10:before
				-webkit-animation-delay: -0.3s;
				animation-delay: -0.3s;

			.sk-circle .sk-circle11:before
				-webkit-animation-delay: -0.2s;
				animation-delay: -0.2s

			.sk-circle .sk-circle12:before
				-webkit-animation-delay -0.1s;
				animation-delay -0.1s

			@-webkit-keyframes sk-circleBounceDelay {
				0%, 80%, 100% {
					-webkit-transform: scale(0);
					transform: scale(0);
				}
				40% {
					-webkit-transform: scale(1);
					transform: scale(1)
				}
			}

			@keyframes sk-circleBounceDelay {
				0%, 80%, 100% {
					-webkit-transform: scale(0);
					transform: scale(0);
				}
				40% {
					-webkit-transform: scale(1);
					transform: scale(1);
				}
			}

	#chemical
		.test
			position: relative;
			width: 200px;
			height: 150px;
			background-image url("../../../../assets/3D/popup-jt.png")
			background-size: 100% 100%

	.compass
		position absolute
		right 20px
		top 20px

	#video-window
		width 1620px
		height 180px
		/*border 1px solid #36ecff*/
		position fixed
		left 140px
		bottom 20px
		z-index 11
		display flex
		justify-content flex-start
		align-items center

		.video-item
			position absolute
			width 300px
			height 170px
			border 1px solid red
			margin-right 20px

			.close
				position absolute
				width 20px
				right 10px
				top 10px
				z-index 113
				cursor pointer

		.btns
			position absolute
			left 0
			bottom 0
			z-index 112

			.ant-btn
				color #ffffff
				font-size 20px
				font-weight 700
				width 100px
				height 40px
				background-image url("../../../../assets/3D/btn-bg.png")

	.pic-loading
		position absolute
		width 120px
		left 50%
		top 50%
		transform translate(-50%, -50%)

	#my-parking
		width 1860px
		height 930px

	.controls
		width 100px
		min-height 50px
		position: absolute;
		top -800px
		right 30px !important
		bottom 150px
		display flex
		justify-content center
		transition all .3s linear

		.controls-box
			width 80px
			height 600px
			background-image url("../../../../assets/3D/floor-back.png")
			display flex
			flex-direction column
			position: relative;
			border none

			#active-png
				display block
				position absolute
				left 0
				top 49%
				transform translateY(-50%)
				width 100px

			.floors
				width 100%
				height 600px
				position absolute
				left 0
				transition all 0.3s linear
				padding 50px 0
				display flex
				flex-direction column
				justify-content space-between
				align-items center

				.active-item
					cursor: pointer;
					width 78px
					height 50px
					text-align center
					font-size 24px
					line-height 50px
					color #00FFFFFF
					/*background-image url("../../../../assets/3D/floor1.png")*/
					background-size 100% 100%

				.item
					cursor: pointer;
					width 78px
					height 50px
					text-align center
					color #FFFFFF
					font-size 24px
					line-height 50px
					/*background-image url("../../../../assets/3D/floor.png")*/
					background-size 100% 100%

	.walk-history
		position absolute
		transition all .3s linear
		left 0
		top 0
		background-color rgba(0, 0, 0, .4)
		padding 5px
		border-radius 4px
		width 400px
		font-size 20px
		color: #36ECFF

		#walk
			text-align left

			.return-prev
				padding 4px 10px 4px 0
				cursor pointer

			.my-title
				font-weight bold
				font-size 24px

	.show-history
		left -500px !important
		transition all .3s linear

	.select-area
		width auto
		height 44px
		position absolute
		left 50%
		bottom 10px
		transform translateX(-50%)

		.custom-slick-arrow
			i
				font-size 20px
				color #fff

		.box-build
			padding 0 30px
			display flex !important
			justify-content space-around
			align-items center
			cursor pointer

			.build-item-active
				margin 0 10px
				/*background-image url("../../../../assets/3D/build-bg1.png")*/
				/*background-size cover*/
				/*background-position center*/
				background-color #008f9e
				width 110px
				height 50px
				font-weight 500
				font-size 20px
				line-height 50px
				color #FFFFFF
				box-shadow: 0 0 10px #36ecff, 0 0 5px #36ecff;

			.build-item
				margin 0 10px
				background-color rgba(0, 143, 158, .3)
				/*background-image url("../../../../assets/3D/build-bg.png")*/
				/*background-size cover*/
				/*background-position center*/
				width 110px
				height 50px
				font-weight 500
				font-size 20px
				line-height 50px
				color #FFFFFF
				border-bottom 1px solid rgba(0, 143, 158, .5)

	.chemical
		.board
			padding 5px
			width 200px
			height 120px

	.dangerWaste
		.board
			padding 5px
			width 200px
			height 120px

	.monitorGas
		.board
			padding 5px
			width 200px
			height 120px

	.workOrder
		.board
			padding 5px
			width 200px
			height 120px

	.dangerIdentify
		.board
			padding 5px
			width 200px
			height 120px

	.monitorWater
		.board
			padding 5px
			width 200px
			height 120px


	.tag
		.board
			padding 10px 0
			width 200px
			height 115px
			/*background-color #081C21*/

			.view-btn
				text-align center

	.boardItem
		position absolute
		top 0
		left 0
		color #FFFFFF
		border-radius 4px
		width 200px
		height 115px
		/*background-color transparent*/

		.arrow
			width: 0;
			height: 0;
			position absolute
			left 50%
			transform translateX(-50%)
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-top: 15px solid #081B21;

		.board
			font-size 16px
			background-image url("../../../../assets/3D/popup.png")
			background-size 100% 100%
			position relative

			.jt
				position absolute
				left 100px
				top 150px

			h3
				padding 2px 0
				color #FFFFFF

			.item
				display flex
				margin-bottom 2px

				.name
					width 110px
					text-align right

				.number
					margin-right 15px
					color #00FFFF

				.unit
					color #FFFF00

	.left-menu-floor, .left-menu-build, .left-menu-build-item
		position absolute
		left 0
		top 0
		transition all .3s linear

	.hide-menu
		left -400px
		transition all .3s linear

	.left-menu-build-item
		/*width 256px*/
		height 80px
		background-color #0A1D30
		color #FFFFFF
		z-index 9999

		.buildingItemMenu
			width 100%
			height 40px
			line-height 40px
			font-size 20px
			cursor pointer
			display block
			text-align left

			.iconClass
				margin 0 15px
</style>
<style lang="stylus">
	.factory
		position relative

		.imosSdk-video
			width 100%
			height 100%

		.open-door-sos
			position absolute
			top 40px
			left 800px
			z-index 99
			width 200px
			display flex
			justify-content space-between

			.sos-btn
				background-color: transparent;
				color: #01B7C2;
				border: 1px solid #01B7C2;
				border-radius: 4px;

		.custom-floors
			position: absolute;
			right: 40px;
			top 100px;
			z-index 88

		.realtime-video
			position fixed
			left 20px
			top 100px
			width 1200px
			height 800px
			border 1px solid #ddd
			z-index 999

		::-webkit-scrollbar {
			width: 6px;
			/*background-color: #030409*/
		}

		::-webkit-scrollbar-thumb {
			border-radius: 4px;
			border: 1px solid #F4F4F4;
		}

		.left-menu-build, .left-menu-build-item, .left-menu-floor
			.ant-menu
				background none
				color #FFFFFF

			.ant-menu-submenu > .ant-menu
				background-color rgba(10, 29, 48, .6)

			.ant-menu-sub.ant-menu-inline > .ant-menu-item
				text-align left
				margin 0

			.ant-menu-inline .ant-menu-item
				margin 0
				text-align left

			.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title
				text-align left

		.walk-history
			.search-input
				font-size 18px
				margin 10px 0
				display flex
				justify-content space-between

				div
					width calc(100% - 132px)

					.ant-input
						background-color #082527
						border-color #36ECFF
						color #fff
						font-size 18px
						height 40px

				.btn
					width 127px

					.ant-btn
						width 100%
						background-color #082527
						border-color #36ECFF
						color #fff
						font-size 18px
						height 40px

			.search-time
				display flex
				justify-content space-between

				.time
					width calc(33% - 2px)

					.ant-calendar-picker, .ant-time-picker
						width 100% !important
						height 40px
						font-size 18px

						.ant-calendar-picker-input, .ant-time-picker-input
							background-color #082527
							border-color #36ECFF
							color #fff
							height 40px
							font-size 18px

			.search-result
				.user-detail
					margin 10px 0
					display flex
					align-items center
					justify-content space-between

					.avatar
						width 80px
						height 100px
						border-radius 4px
						background-position center
						background-size cover

						img
							display block
							border-radius 4px

					.user
						width calc(100% - 100px)

						p
							margin 6px 0

							span:first-child
								padding-right 20px

				.path-list
					padding 0 !important
					margin-right 0
					max-height 520px
					overflow-y scroll
					font-size 20px

					.item
						margin-bottom 20px

						.title
							display flex
							justify-content space-between
							align-items center
							font-size 20px

							.check
								border-radius 4px
								cursor pointer
								font-size 16px
								background-color #082527
								border 1px solid #36ECFF
								color #fff
								padding 2px 14px

						.record
							margin-left 10px
							width calc(100% - 10px)
							border-bottom 1px solid #26505C
							margin-top 10px
							display flex
							justify-content space-between

							div
								font-size 18px

							.my-time
								color #fff

							.path-box
								display flex
								align-items center

								span
									width 270px
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									-o-text-overflow: ellipsis;

								div
									width 24px
									height 24px
									border-radius 50%
									line-height 24px
									text-align center
									color #fff
									font-size 14px

								.path-start
									background-color #36ecff

								.path-pass
									background-color #0492d4

								.path-end
									background-color #d34355

	.select-area
		.ant-carousel, .slick-slider, .slick-list, .slick-track
			height inherit

		.ant-carousel .slick-dots
			position absolute
			top 52px

	.ant-carousel .slick-dots-bottom
		bottom -5px

		.ant-menu
			color #FFFFFF

			.ant-menu-submenu-title
				text-align left
				margin 0

			.ant-menu-item
				text-align left
				margin 0

				.ant-menu-item::after
					border-right none
</style>
