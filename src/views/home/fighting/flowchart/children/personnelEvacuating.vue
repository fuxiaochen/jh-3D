<template>
	<div id="personnelEvacuating">
		<h2><b>6. 人员疏散</b></h2>
		<a-form-model
			ref="dynamicValidateForm"
			:model="dynamicValidateForm"
			:rules="rules">
			<p><b>6.1*系统联动情况</b></p>
			<div class="connect-status">
				<ul>
					<li>
						<a-form-model-item prop="elevator">
							<span>*电梯联动情况：</span>
							<a-radio-group name="radioGroup" v-model="dynamicValidateForm.elevator" :disabled="isDisabled">
								<a-radio :value="1">
									是
								</a-radio>
								<a-radio :value="2">
									否
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</li>
					<li>
						<a-form-model-item prop="door">
							<span>*门禁联动情况：</span>
							<a-radio-group name="radioGroup" v-model="dynamicValidateForm.door" :disabled="isDisabled">
								<a-radio :value="1">
									是
								</a-radio>
								<a-radio :value="2">
									否
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</li>
					<li>
						<a-form-model-item prop="fire">
							<span>*防火门联动情况：</span>
							<a-radio-group name="radioGroup" v-model="dynamicValidateForm.fire" :disabled="isDisabled">
								<a-radio :value="1">
									是
								</a-radio>
								<a-radio :value="2">
									否
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</li>
					<li>
						<a-form-model-item prop="smoke">
							<span>*排烟系统联动情况：</span>
							<a-radio-group name="radioGroup" v-model="dynamicValidateForm.smoke" :disabled="isDisabled">
								<a-radio :value="1">
									是
								</a-radio>
								<a-radio :value="2">
									否
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</li>
					<li>
						<a-form-model-item prop="wind">
							<span>*正压送风系统联动情况：</span>
							<a-radio-group name="radioGroup" v-model="dynamicValidateForm.wind" :disabled="isDisabled">
								<a-radio :value="1">
									是
								</a-radio>
								<a-radio :value="2">
									否
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</li>
				</ul>
			</div>
			<p><b>6.2*疏散条件：初期灭火失败或现场火势较大，非单人单支手提式灭火器可扑灭</b></p>
			<div class="stop-fire">
				<div class="broadcast">
					<ul>
						<li>
							<a-form-model-item prop="time">
								<span>*广播疏散时间：</span>
								<a-date-picker style="width:240px" show-time v-model="dynamicValidateForm.time" :disabled="isDisabled"/>
							</a-form-model-item>
						</li>
						<li>
							<a-form-model-item prop="point">
								<span>*广播集合地点：</span>
								<a-input style="width:240px" placeholder="广播集合地点" v-model="dynamicValidateForm.point" :disabled="isDisabled"/>
							</a-form-model-item>
						</li>
						<li>
							<a-form-model-item prop="area">
								<span>*广播疏散区域：</span>
								<a-input style="width:240px" placeholder="广播疏散区域" v-model="dynamicValidateForm.area" :disabled="isDisabled"/>
							</a-form-model-item>
						</li>
						<li>
							<a-form-model-item prop="reportTime">
								<span>*现场ERC人员汇报人员清点情况：</span>
								<a-date-picker style="width:240px" show-time v-model="dynamicValidateForm.reportTime" :disabled="isDisabled"/>
								<a href="http://nhoaaps01/Em/EmergencyEvacuation/home/index" title="点名系统"  target="_blank" :disabled="isDisabled" style="padding-left:20px">点名系统</a>
							</a-form-model-item>
						</li>
						<li>
							<a-form-model-item prop="allPerson">
								<span>*应到人数：</span>
								<a-input style="width:240px" placeholder="请输入应到人数" v-model="dynamicValidateForm.allPerson" :disabled="isDisabled"/>
							</a-form-model-item>
						</li>
						<li>
							<a-form-model-item prop="inPerson">
								<span>*实到人数：</span>
								<a-input style="width:240px" placeholder="请输入实到人数" v-model="dynamicValidateForm.inPerson" :disabled="isDisabled"/>
							</a-form-model-item>
						</li>
						<li>
							<a-form-model-item prop="outPerson">
								<span>*未到人数：</span>
								<a-input style="width:240px" placeholder="请输入未到人数" v-model="dynamicValidateForm.outPerson" :disabled="isDisabled"/>
							</a-form-model-item>
						</li>
					</ul>

				</div>
				<div class="big-fire" style="margin-left: -40px">
					<div class="add-new-user">
						<a-button type="dashed" style="width: 20%" @click="controlPersonVisible = true" :disabled="isDisabled">
							<a-icon type="plus" /> 添加未到人
						</a-button>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<a-button type="dashed" style="width: 20%" @click="controlPersonList = true">
							<a-icon type="menu" /> 查看未到人列表
						</a-button>
					</div>
				</div>
			</div>
			<p><b>6.3*将CCTV疏散场景组调至大屏</b></p>
			<div style="padding-left: 40px">
				<a-form-model-item prop="screen">
					<span>*时间：</span>
					<a-date-picker style="width:240px" show-time v-model="dynamicValidateForm.screen" :disabled="isDisabled"/>
				</a-form-model-item>
			</div>

			<div class="submit-btn">
				<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled">
					下一步
				</a-button>
				<a-button type="primary" style="margin-left: 20px" html-type="submit" @click="saveData()" :disabled="isDisabled">
					暂存
				</a-button>
			</div>
		</a-form-model>

		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加未到人信息"
			:visible="controlPersonVisible"
			@ok="handleControlPerson"
			@cancel="controlPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px">
					<span class="left">姓名：</span>
					<div class="right"><a-input allowClear v-model="controlPersonObj.name" placeholder="请输入姓名" /></div>
				</div>
				<div class="box" style="margin-bottom: 15px">
					<span class="left">原因：</span>
					<div class="right">
						<a-input allowClear v-model="controlPersonObj.reason" placeholder="请输入原因" /></div>
				</div>
				<div class="box" style="margin-bottom: 15px">
					<span class="left">时间：</span>
					<div class="right">
						<a-date-picker style="width:100%" show-time @change="outPersonTimeChange" />
					</div>
				</div>
			</div>
		</a-modal>
		<a-modal
			:width="1000"
			class="control-person-modal"
			title="未到人信息列表"
			:visible="controlPersonList"
			@ok="controlPersonList = false"
			@cancel="controlPersonList = false">
			<a-table bordered :data-source="controlList" :rowKey="(record,index)=>{return index}" :columns="columns2"></a-table>
		</a-modal>

	</div>
</template>

<script>
	export default {
		name: "personnelEvacuating",
		data(){
			return{
				controlPersonVisible:false,
				controlPersonList:false,
                isDisabled: true,
				controlPersonObj:{
					name:'',
					reason:'',
					time:''
				},
				columns2:[
					{
						title: '姓名',
						dataIndex: 'userName',
					},
					{
						title: '原因',
						dataIndex: 'cause',
					},
					{
						title: '时间',
						dataIndex: 'findTime',
					}
				],
				controlList:[],
				dynamicValidateForm:{
					elevator:'',
					door:'',
					fire:'',
					smoke:'',
					wind:'',
					time:'',
					point:'',
					area:'',
					reportTime:'',
					allPerson:'',
					inPerson:'',
					outPerson:'',
					screen:''
				},
				rules:{
					elevator: [{ required: true, message: '请选择电梯联动情况', trigger: 'change' }],
					door: [{ required: true, message: '请选择门禁联动情况', trigger: 'change' }],
					fire: [{ required: true, message: '请选择防火门联动情况', trigger: 'change' }],
					smoke: [{ required: true, message: '请选择排烟系统联动情况', trigger: 'change' }],
					wind: [{ required: true, message: '请选择送风系统联动情况', trigger: 'change' }],
					time: [{ required: true, message: '请输入广播疏散时间', trigger: 'change' }],
					point: [{ required: true, message: '请输入疏散地点', trigger: 'blur' }],
					area: [{ required: true, message: '请输入疏散区域', trigger: 'blur' }],
					reportTime: [{ required: true, message: '请选择点名时间', trigger: 'change' }],
					allPerson: [{ required: true, message: '请输入应到人数', trigger: 'blur' }],
					inPerson: [{ required: true, message: '请输入实到人数', trigger: 'blur' }],
					outPerson: [{ required: true, message: '请选择未到人数', trigger: 'blur' }],
					screen: [{ required: true, message: '请选择时间', trigger: 'blur' }]
				},
				processInstanceId: localStorage.getItem('processInstanceId')
			}
		},
		methods:{
			handleControlPerson(){
				if(this.controlPersonObj.name){
					this.controlList.push({
						userName:this.controlPersonObj.name,
						cause:this.controlPersonObj.reason,
						findTime:this.controlPersonObj.time,
					})
					this.controlPersonVisible = false
				}else{
					this.$message('error','未到人姓名不能为空！')
				}
			},
			screenTimeChange(e,val){
				this.dynamicValidateForm.screen = val
			},
			failedTimeChange(e,val){
				this.dynamicValidateForm.time = val
			},
			reportTimeChange(e,val){
				this.dynamicValidateForm.reportTime = val
			},
			outPersonTimeChange(e,val){
				this.controlPersonObj.time = val
			},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						if(this.dynamicValidateForm.outPerson !== '0'){
							if(this.controlList.length < 1){
								this.$message('error','未到人员信息为空！')
							}
						}
						let pople = ''
						for(let i of this.controlList){
							pople = pople + i.userName + ','
						}
						pople = pople.substring(0, pople.length - 1);
						let data = {
							liftLinkage: this.dynamicValidateForm.elevator,
							entranceGuardLinkage: this.dynamicValidateForm.door,
							flameDoorLinkage: this.dynamicValidateForm.fire,
							purgingSystemLinkage: this.dynamicValidateForm.wind,
							forcedDraftLinkage: this.dynamicValidateForm.smoke,
							
							radioEvacuateTime: this.dynamicValidateForm.time,
							rallyPoint: this.dynamicValidateForm.point,
							evacuateArea: this.dynamicValidateForm.area,
							radioRollTime: this.dynamicValidateForm.reportTime,
							supposedNum: this.dynamicValidateForm.allPerson,
							attendanceNum: this.dynamicValidateForm.inPerson,
							absentNum: this.dynamicValidateForm.outPerson,
							ajustTime: this.dynamicValidateForm.screen,
							notRollUserList: this.controlList,
							processInstanceId: this.processInstanceId,
						}
						this.$http.post3('/fire/person/evacuate/excuteProcess',data).then((res) => {
							this.isDisabled = true
							let data = {
                                    processInstanceId:this.processInstanceId
                                }
                                this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                                    for(let i of res.data.data){
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
					liftLinkage: this.dynamicValidateForm.elevator,
					entranceGuardLinkage: this.dynamicValidateForm.door,
					flameDoorLinkage: this.dynamicValidateForm.fire,
					purgingSystemLinkage: this.dynamicValidateForm.wind,
					forcedDraftLinkage: this.dynamicValidateForm.smoke,
					
					radioEvacuateTime: this.dynamicValidateForm.time,
					rallyPoint: this.dynamicValidateForm.point,
					evacuateArea: this.dynamicValidateForm.area,
					radioRollTime: this.dynamicValidateForm.reportTime,
					supposedNum: this.dynamicValidateForm.allPerson,
					attendanceNum: this.dynamicValidateForm.inPerson,
					absentNum: this.dynamicValidateForm.outPerson,
					ajustTime: this.dynamicValidateForm.screen,
					notRollUserList: this.controlList,
					processInstanceId: this.processInstanceId,
				}
				this.$http.post3('/fire/person/evacuate/saveOrUpdate',data).then((res) => {
				})
			},
			viewData(){
				this.$http.get3('/fire/person/evacuate/queryOne?processInstanceId='+ this.processInstanceId).then((res) => {
					let tempData = res.data.data;
					// let aes = ''
					// let aes1 = ''
					// let file = ''
					// let pople = ''
					// if(Number(tempData.liftLinkage) == 1){
					// 	aes = '是'
					// }else{
					// 	aes = '否'
					// }
					// if(Number(tempData.forcedDraftLinkage) == 1){
					// 	aes1 = '是'
					// }else{
					// 	aes1 = '否'
					// }
					// if(Number(tempData.flameDoorLinkage) == 1){
					// 	file = '是'
					// }else if (Number(tempData.flameDoorLinkage) == 2){
					// 	file = '否'
					// }
					// if(Number(tempData.purgingSystemLinkage) == 1){
					// 	pople = '是'
					// }else if (Number(tempData.purgingSystemLinkage) == 2){
					// 	pople = '否'
					// }
					// if(res.data.data){
                    //     let peopledata = "6.1系统联动情况:" + ",电梯联动情况：" + aes + ",防火门联动情况：" + file + ",排烟系统联动情况：" + aes1 
                    //     ",正压送风系统联动情况" + pople
                    //     this.$store.commit("setProcessEvacuating",peopledata)
                    // }
					this.dynamicValidateForm.elevator = Number(tempData.liftLinkage) 
					this.dynamicValidateForm.door = Number(tempData.entranceGuardLinkage) 
					this.dynamicValidateForm.fire = Number(tempData.flameDoorLinkage) 
					this.dynamicValidateForm.wind = Number(tempData.purgingSystemLinkage) 
					this.dynamicValidateForm.smoke = Number(tempData.forcedDraftLinkage) 

					this.dynamicValidateForm.time = tempData.radioEvacuateTime
					this.dynamicValidateForm.point = tempData.rallyPoint
					this.dynamicValidateForm.area = tempData.evacuateArea
					this.dynamicValidateForm.reportTime = tempData.radioRollTime
					this.dynamicValidateForm.allPerson = tempData.supposedNum
					this.dynamicValidateForm.inPerson = tempData.attendanceNum
					this.dynamicValidateForm.outPerson = tempData.absentNum
					this.dynamicValidateForm.screen = tempData.ajustTime
					if(tempData.notRollUserList){
						this.controlList = tempData.notRollUserList
					}
					let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='personnelEvacuating'){
                                this.isDisabled = true
                            }
                        }
                    })
				})
			},
		},
        mounted(){
            this.viewData()
        }
	}
</script>

<style lang="stylus" scoped>
#personnelEvacuating
	text-align left
	
	padding 10px
	width 100%
	height 800px
	overflow-y: auto;
	font-size 18px
	.big-fire
		display flex
		justify-content space-between
		flex-direction column
		padding-left 40px
		.add-new-user
			display flex
			justify-content center
			margin-bottom 20px
		.items
			width 280px
			display flex
			justify-content space-between
			align-items center
	.ant-form-item
		margin-bottom 0
	.connect-status
		ul
			padding-left 40px
			li
				list-style none
				font-size 18px
	.stop-fire
		.broadcast
			ul
				padding-left 40px
				li
					list-style none
					font-size 18px
	.submit-btn
		display flex
		justify-content center
		margin-top 20px
</style>
