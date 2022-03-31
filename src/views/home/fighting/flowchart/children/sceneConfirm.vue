<template>
	<div id="scene-confirm">
		<h2><b>4. 现场确认</b></h2>
		<template>
			<a-form-model
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
			>
				<p><b>4.1*汇报人员</b></p>

				<div class="report-person">
					<a-form-model-item prop="name">
						<div class="box"><span class="left">姓名：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.name" placeholder="请输入确认人员姓名" :disabled="isDisabled" /></div></div>
					</a-form-model-item>

					<a-form-model-item prop="phone">
						<div class="box"><span class="left">分机: </span><div class="right"><a-input allowClear v-model="dynamicValidateForm.phone" placeholder="请输入分机号码" :disabled="isDisabled" /></div></div>
					</a-form-model-item>

					<a-form-model-item prop="time">
						<div class="box"><span class="left">时间：</span><div class="right">
							<a-date-picker style="width:100%" show-time v-model="dynamicValidateForm.time" :disabled="isDisabled" /></div>
						</div>
					</a-form-model-item>

				</div>
				<p><b>4.2*火灾确认广播是否推出？</b></p>

				<div style="padding-left: 40px">
					<a-form-model-item  prop="fireOpen">
						<a-radio-group v-model="dynamicValidateForm.fireOpen" :disabled="isDisabled">
							<a-radio :value="0">
								是
							</a-radio>
							<a-radio :value="1">
								否
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
				</div>

				<div v-show="dynamicValidateForm.fireOpen === 0" class="fm-box"><span class="left">请选择广播推出时间：</span><div class="right">
					<a-date-picker style="width:100%" show-time v-model="dynamicValidateForm.date" :disabled="isDisabled" /></div>
				</div>

				<p><b>4.3*确认结果？</b></p>
				<div style="padding-left: 40px">
					<a-form-model-item  prop="result">
						<a-radio-group v-model="dynamicValidateForm.result" name="radioGroup" :disabled="isDisabled">
							<a-radio :value="1">
								真实事故
							</a-radio>
							<a-radio :value="2">
								误报警
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
				</div>


				<div style="padding-left: 40px" v-show="dynamicValidateForm.result === 1" class="fire-level">
					<p>*火势情况: </p>

					<div>
						<a-form-model-item>
							<a-radio-group v-model="dynamicValidateForm.fireLevel"  :disabled="isDisabled">
								<a-radio :value="1">
									火势小，单人单支手提式灭火器可扑灭（*现场人员执行初期灭火）
								</a-radio>
								<a-radio :value="2">
									火势大，非单人单支手提式灭火器可扑灭（*通知现场确认人员临时管制）
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div v-show="dynamicValidateForm.fireLevel === 2 " class="big-fire" style="margin-left: -40px" >
							<div class="add-new-user">
								<a-button type="dashed" style="width: 20%" @click="controlPersonVisible = true"  :disabled="isDisabled">
									<a-icon type="plus" /> 添加管制人
								</a-button>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<a-button type="dashed" style="width: 20%" @click="controlPersonList = true">
									<a-icon type="menu" /> 查看管制人列表
								</a-button>
							</div>
						</div>
					</div>

					<p>*人员被困情况: </p>

					<div>
						<a-form-model-item  prop="locked">
							<a-radio-group v-model="dynamicValidateForm.locked" :disabled="isDisabled">
								<a-radio :value="0">
									无
								</a-radio>
								<a-radio :value="1">
									有
								</a-radio>
								<a-radio :value="2">
									不清楚
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div v-show="dynamicValidateForm.locked === 1" class="add-new-user">
							<a-button type="dashed" style="width: 20%" @click="confirmPersonVisible = true" :disabled="isDisabled">
								<a-icon type="plus" /> 添加被困人员
							</a-button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<a-button type="dashed" style="width: 20%" @click="confirmPersonList = true">
								<a-icon type="menu" /> 查看被困人员列表
							</a-button>
						</div>
					</div>

					<p>*火灾类型: </p>

					<div class="check-group-list">
						
						<a-checkbox-group @change="listonChange">
								<a-form-model-item  prop="locked">
							<a-radio-group v-model="dynamicValidateForm.type" >
								<div class="box"><a-radio value="A">A类火灾（固体）
									<span v-if="dynamicValidateForm.type == 'A'">燃烧物：<a-input v-model="dynamicValidateForm.typeA" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
								<div class="box"><a-radio value="B">B类火灾（液体）
									<span v-if="dynamicValidateForm.type == 'B'">燃烧物：<a-input v-model="dynamicValidateForm.typeA" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
								<div class="box"><a-radio value="C">C类火灾（气体）
									<span v-if="dynamicValidateForm.type == 'C'">燃烧物：<a-input v-model="dynamicValidateForm.typeA" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
								<div class="box"><a-radio value="E">E类火灾（带电）
									<span v-if="dynamicValidateForm.type == 'E'">燃烧物：<a-input v-model="dynamicValidateForm.typeA" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
								<div class="box"><a-radio value="F">F类火灾（烹饪）
									<span v-if="dynamicValidateForm.type == 'F'">燃烧物：<a-input v-model="dynamicValidateForm.typeA" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
							</a-radio-group>
						</a-form-model-item>
						</a-checkbox-group>
					</div>

				</div>
				<div style="padding-left: 40px" v-show="variableObj.result === 2">
					<div class="alarm-reason">
						<span>报警原因：</span>
						<a-input v-model="dynamicValidateForm.falseAlarmCause" placeholder="请输入报警原因" :disabled="isDisabled"/>
					</div>
					<div class="alarm-reason" v-if="dynamicValidateForm.date">
						<span style="width:30%">若已推送火警广播，则需发布误警报广播，广播时间：</span><a-date-picker style="width:30%" show-time disabled v-model="dynamicValidateForm.date" :disabled="isDisabled"/>
					</div>
					<p>误警报广播词:监控中心报告，监控中心报告，先前XXXXX发生消防警报，经确认为虚惊事 件，现场人员请勿惊慌安心工作。（间隔1.5S，重复两次）</p>
				</div>
			</a-form-model>
		</template>

		<a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加受伤人信息"
			:visible="confirmPersonVisible"
			@ok="handleConfirmPerson"
			@cancel="confirmPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">部门/厂商：</span><div class="right"><a-input allowClear v-model="confirmPersonObj.dept" placeholder="请输入部门名称" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">姓名: </span><div class="right"><a-input allowClear v-model="confirmPersonObj.userName" placeholder="请输入姓名" /></div></div>
				<div class="box"><span class="left">受伤情况：</span><div class="right">
					<a-input allowClear v-model="confirmPersonObj.injuries" placeholder="请输入受伤情况" />
					</div>
				</div>
			</div>
		</a-modal>

		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加管制人信息"
			:visible="controlPersonVisible"
			@ok="handleControlPerson"
			@cancel="controlPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">姓名：</span><div class="right"><a-input allowClear v-model="controlPersonObj.name" placeholder="请输入确认人员姓名" /></div></div>
			</div>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="受伤人信息列表"
			:visible="confirmPersonList"
			@ok="confirmPersonList = false"
			@cancel="confirmPersonList = false">
			<a-table bordered :data-source="confirmList" :rowKey="(record,index)=>{return index}" :key="confirmList.userName" :columns="columns"></a-table>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="管制人信息列表"
			:visible="controlPersonList"
			@ok="controlPersonList = false"
			@cancel="controlPersonList = false">
			<a-table bordered :data-source="controlList" :rowKey="(record,index)=>{return index}" :key="controlList.userName" :columns="columns2"></a-table>
		</a-modal>

	</div>
</template>

<script>
	export default {
		name: "sceneConfirm",
		data() {
			return {
				confirmPersonVisible:false,
                isDisabled: true,
				processInstanceId: localStorage.getItem('processInstanceId'),
				confirmPersonObj:{
					dept:null,
					userName:null,
					injuries:null
				},
				controlPersonVisible:false,
				controlPersonObj:{
					name:'',
				},
				confirmPersonList:false,
				controlPersonList:false,
				columns: [
					{
						title: '部门/厂商',
						dataIndex: 'dept',
					},
					{
						title: '姓名',
						dataIndex: 'userName',
					},
					{
						title: '受伤情况',
						dataIndex: 'injuries',
					}
				],
				columns2: [
					{
						title: '姓名',
						dataIndex: 'userName',
					}
				],
				rules: {
					fireOpen: [{ required: true, message: '请选择现场情况', trigger: 'change' }],
					fireLevel:[{ required: true, message: '请选择现场情况', trigger: 'change' }],
					name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
					phone:[{ required: true, message: '请输入电话', trigger: 'blur' }],
					date:[{ required: true, message: '请选择时间', trigger: 'blur' }],
					time:[{ required: true, message: '请选择时间', trigger: 'blur' }],
					result:[{ required: true, message: '请选择时间', trigger: 'blur' }],
				},
				dynamicValidateForm: {
					time:'',
					fireLevel:'',
					fireOpen:'',
					falseAlarmCause:'',
					result:'',
					name:'',
					phone:'',
					date:'',
					type:'',
					typeA:'',
					list:{
						typeA:'',
						typeB:'',
						typeC:'',
						typeD:'',
						typeE:''
					}
				},
				variableObj:{
					seeHappended:0,
					seefire:0,
					fireOpen:null,
					result:null,
					fireLevel:null,
					locked:null
				},
				confirmList:[],
				controlList:[]
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let pople = ''
						for(let i of this.controlList){
							pople = pople + i.userName + ','
						}
						pople = pople.substring(0, pople.length - 1);
						let data = {
							userName: this.dynamicValidateForm.name,
							ext: this.dynamicValidateForm.phone,
							discoveryTime: this.dynamicValidateForm.time,
							radioLaunch: this.dynamicValidateForm.fireOpen,
							radioLaunchTime: this.dynamicValidateForm.date,
							realAlarm: this.dynamicValidateForm.result,//22222222222222222222
							fireBehavior: this.dynamicValidateForm.fireLevel,
							controler: pople,
							trappeds: this.dynamicValidateForm.locked,
							fireType: this.dynamicValidateForm.type,
							burningMaterial: this.dynamicValidateForm.typeA,
							falseAlarm: '',
							falseAlarmCause: this.dynamicValidateForm.falseAlarmCause,
							falseAlarmRadioTime: this.dynamicValidateForm.date,
							processInstanceId: this.processInstanceId,
							woundedPersonList: this.confirmList,
						}
						this.$http.post3('/fire/scene/confirm/excuteProcess',data).then((res) => {
							this.isDisabled = true
							let data = {
                                    processInstanceId:this.processInstanceId
                                }
                                this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                                    for(let i of res.data.data){
                                        if(i.taskKey == 'falseAlarm'){
											this.$router.push('/contingencyManage/event')
                                        }
                                        if(i.isFinish == '0'){
                                            this.$emit("changeComponent1Data", i.taskKey,res.data.data)
                                        }
                                    }
                                })
						})
					} else {
						return false;
					}
				});
			},
			saveData(){
				let pople = ''
						for(let i of this.controlList){
							pople = pople + i.userName + ','
						}
						pople = pople.substring(0, pople.length - 1);
						let data = {
							userName: this.dynamicValidateForm.name,
							ext: this.dynamicValidateForm.phone,
							discoveryTime: this.dynamicValidateForm.time,
							radioLaunch: this.dynamicValidateForm.fireOpen,
							radioLaunchTime: this.dynamicValidateForm.date,
							realAlarm: this.dynamicValidateForm.result,//22222222222222222222
							fireBehavior: this.dynamicValidateForm.fireLevel,
							controler: pople,
							trappeds: this.dynamicValidateForm.locked,
							fireType: this.dynamicValidateForm.type,
							burningMaterial: this.dynamicValidateForm.typeA,
							falseAlarm: '',
							falseAlarmCause: this.dynamicValidateForm.falseAlarmCause,
							falseAlarmRadioTime: this.dynamicValidateForm.date,
							processInstanceId: this.processInstanceId,
							woundedPersonList: this.confirmList,
						}
						this.$http.post3('/fire/scene/confirm/saveOrUpdate',data).then((res) => {
						})
			},
			viewData(){
				this.$http.get3('/fire/scene/confirm/queryOne?processInstanceId='+ this.processInstanceId).then((res) => {
					let tempData = res.data.data;
					// let aes = ''
					// let file = ''
					// let pople = ''
					// if(Number(tempData.realAlarm) == 1){
					// 	aes = '真实情况'
					// }else{
					// 	aes = '误报警'
					// }
					// if(Number(tempData.fireBehavior) == 1){
					// 	file = '火势小'
					// }else if (Number(tempData.fireBehavior) == 2){
					// 	file = '火势大'
					// }
					// if(Number(tempData.trappeds) == 1){
					// 	pople = '无'
					// }else if (Number(tempData.trappeds) == 2){
					// 	pople = '有'
					// }else {
					// 	pople = '不清楚'
					// }
					// if(res.data.data){
                    //     let peopledata = "4.1汇报人员:" + tempData.userName + ",时间：" + tempData.discoveryTime + "\n" +
                    //     "4.2确认结果:" + aes + ",火势情况" + file + 
                    //     ",人员被困情况：" + pople
                    //     this.$store.commit("setProcessConfirm",peopledata)
                    // }
					this.dynamicValidateForm.name = tempData.userName,
					this.dynamicValidateForm.phone = tempData.ext,
					this.dynamicValidateForm.time = tempData.discoveryTime,
					this.dynamicValidateForm.fireOpen = Number(tempData.radioLaunch),
					this.dynamicValidateForm.date = tempData.radioLaunchTime,
					this.dynamicValidateForm.result = Number(tempData.realAlarm),
					this.dynamicValidateForm.fireLevel = Number(tempData.fireBehavior)
					if(tempData.controllerList){
						this.controlList = tempData.controllerList
					}
					this.dynamicValidateForm.locked = Number(tempData.trappeds),
					this.dynamicValidateForm.type = tempData.fireType,
					this.dynamicValidateForm.typeA = tempData.burningMaterial,
					this.dynamicValidateForm.falseAlarmCause = tempData.falseAlarmCause,
					this.confirmList = tempData.woundedPersonList
					let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='sceneConfirm'){
                                this.isDisabled = true
                            }
                        }
                    })
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			// 灾害类型勾选
			listonChange(checkedValues) {
			},
			confirmPersonChange(e,val){// 确认人信息---时间
				this.dynamicValidateForm.date = val
			},
			seeWhatHappend(e){
				this.variableObj.fireOpen = e.target.value // => 看到现场情况 、、 看不到现场情况的切换
			},
			seeResult(e){
				this.variableObj.result = e.target.value // => 看到现场情况 、、 看不到现场情况的切换
			},
			seeFire(e){
				this.variableObj.seefire = e.target.value // => 火势大小的切换
			},
			seeLocked(e){
				this.variableObj.locked = e.target.value // => 火势大小的切换
			},
			seeFireLevel(e){
				this.variableObj.fireLevel = e.target.value // => 火势大小的切换
			},
			confirmReport(e,val){
				this.dynamicValidateForm.time = val
			},
			handleConfirmPerson(){
				if(this.confirmPersonObj.userName){
					this.confirmList.push({
						dept: this.confirmPersonObj.dept,
						userName: this.confirmPersonObj.userName,
						injuries: this.confirmPersonObj.injuries
					})
					this.confirmPersonVisible = false
				}else{
					this.$message('error','受伤人姓名不能为空！')
				}
			},
			handleControlPerson(){
				if(this.controlPersonObj.name){
					this.controlList.push({
						userName:this.controlPersonObj.name
					})
					this.controlPersonVisible = false
				}else{
					this.$message('error','管制人姓名不能为空！')
				}
			}
		},
        mounted(){
            this.viewData()
        }
	}
</script>

<style lang="stylus" scoped>
	#scene-confirm
		
		padding 10px
		margin 20px
		width calc(100% - 40px)
		text-align left
		.alarm-reason
			display flex
			align-items center
			margin-bottom 10px
			span
				width 80px
			.ant-input
				width 400px
		.report-person
			display flex
			justify-content space-between
			align-items center
			padding-left 40px
			.ant-form-item
				width 32.5%
				.box
					width 100%
					display flex
					align-items center
					.left
						width 50px
					.right
						width calc(100% - 50px)
		.fm-box
			width 400px
			display flex
			align-items center
			margin-bottom 20px
			padding-left 40px
			.left
				width 150px
			.right
				width calc(100% - 150px)




		.confirm-person-modal
			.confirm-person
				.box
					margin-bottom 15px
		/*.ant-form-item*/
		/*	padding-left 40px*/
		.add-new-user
			display flex
			justify-content center
			margin-bottom 20px
		.list
			.list-item
				display flex
				align-items center
				margin-bottom 10px
				.ant-form-item
					width 31%
					margin-bottom 0
					.box
						width 100%
						display flex
						justify-content flex-start
						align-items center
						.right
							width calc(100% - 60px)
						.left
							width 50px
		.second-step
			padding-left 40px
			.fire-radio-group
				margin-top 10px
				display flex
				flex-direction column
				.ant-radio-wrapper
					margin 5px 0
		.big-fire
			display flex
			justify-content space-between
			flex-direction column
			padding-left 40px
			.items
				width 280px
				display flex
				justify-content space-between
				align-items center
		.submit-btn
			display flex
			justify-content center
			margin-top 20px

</style>
<style lang="stylus">
	#scene-confirm
		.box
			.ant-calendar-picker
				width 100%
		.check-group-list
			.ant-col
				margin-bottom 15px
			.ant-checkbox-wrapper
				display flex
				align-items center
				.box
					display flex
					align-items center
					span
						width 300px
</style>
