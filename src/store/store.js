import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//存放全局的状态
const state = {
	showFireGif: false,
	userName: "",
	baseInfo: null,
	storeList: null,
	ertList: null,
	shouldarrive: null,
	faceBasic: {
		staffName: "",
		receiveTime: "",
		dept: "",
		pictureUrl: "",
		location: "",
		equipNum:'',
		receiveType:'',
		backPictureUrl:''
	},
	processInstanceId: "",
	alarmAI: {
		photo: '',
		type: 'N/A',
		time: 'N/A',
		area: 'N/A'
	},
	process: {
		peopledata: '',
		systemdata: '',
		videoCenter: '',
		confirm: '',
		strain: '',
		evacuating: '',
		notice: '',
		department: '',
		ert: '',
		region: '',
		rescue: '',
		establishERT: '',
		involution: ''
	},
	informpeople: "系统",
	AlarmNo: "",
	showSOS:null,
	strangerPath:false // 陌生人轨迹
};

//修改数据
const mutations = {
	login(state, data) {
		state.userName = data
	},
	logout(state, data) {
		state.userName = data
	},
	// 修改实时人脸
	updateFace(state, data) {
		state.faceBasic = data
	},
	setId(state, data) {
		state.processInstanceId = data
	},
	setBaseInfo(state, data) {
		state.baseInfo = data
	},
	setStoreList(state, data) {
		state.storeList = data
	},
	setertList(state, data) {
		state.ertList = data
	},
	setShouldarrive(state, data) {
		state.shouldarrive = data
	},
	// 修改流程节点展示信息 人员
	setProcessPeople(state, data) {
		state.process.peopledata = data
	},
	// // 重置流程节点展示信息
	// resetProcess(state, data) {
	// 	state.process.peopledata=data
	// 	state.process.systemdata=data
	// 	state.process.videoCenter=data
	// 	state.process.confirm=data
	// 	state.process.strain=data
	// 	state.process.evacuating=data
	// 	state.process.notice=data
	// 	state.process.ert=data
	// 	state.process.department=data
	// 	state.process.region=data
	// 	state.process.rescue=data
	// 	state.process.establishERT=data
	// 	state.process.involution=data
	// 	console.log('state.process',state.process,data,55);
	// },
	// 修改流程节点展示信息 系统
	setProcessSystem(state, data) {
		state.process.systemdata = data
	},
	// 修改流程节点展示信息 监控
	setProcessVideo(state, data) {
		state.process.videoCenter = data
	},
	// 修改流程节点展示信息 现场
	setProcessConfirm(state, data) {
		state.process.confirm = data
	},
	// 修改流程节点展示信息 初期
	setProcessStrain(state, data) {
		state.process.strain = data
	},
	// 修改流程节点展示信息 人员疏散
	setProcessEvacuating(state, data) {
		state.process.evacuating = data
	},
	// 修改流程节点展示信息 通报
	setProcessNotice(state, data) {
		state.process.notice = data
	},
	// 修改流程节点展示信息 9
	setProcessDepartment(state, data) {
		state.process.department = data
	},
	// 修改流程节点展示信息 8
	setProcessERT(state, data) {
		state.process.ert = data
	},
	// 修改流程节点展示信息 10
	setProcessRegion(state, data) {
		state.process.region = data
	},
	// 修改流程节点展示信息 11
	setProcessRescue(state, data) {
		state.process.rescue = data
	},
	// 修改流程节点展示信息 12
	setProcessEstablishERT(state, data) {
		state.process.establishERT = data
	},
	// 修改流程节点展示信息 13
	setProcessInvolution(state, data) {
		state.process.involution = data
	},
	// 修改实时ai告警信息
	updateAI(state, data) {
		state.alarmAI = data;
	},
	setAlarmNo(state, data) {
		state.AlarmNo = data
	},
	setInformpeople(state, data) {
		state.informpeople = data
	},
	changeShowSOS(state,data){
		state.showSOS = data
	},
	// 陌生人轨迹
	changeStrangeStatus(state,data){
		state.strangerPath = data
	}
}


// 复杂的业务逻辑不修改页面，后台取数据，异步操作
const actions = {}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
