<template>
	<div id="initial-strain">
		<h2><b>6.事故部门初期应变</b></h2>
		<a-form-model
			ref="dynamicValidateForm"
			:model="dynamicValidateForm"
			:rules="rules">
			<p><b>6.1<span class="star">*</span>现场/确认人员在确保安全的前提下，执行初期灭火</b>
			</p>
			<a-form-model-item prop="aidMeasures">
				<div class="box"><span class="left">初期应变计划抢救措施：</span><a-input type="textarea" allowClear v-model="dynamicValidateForm.aidMeasures" placeholder="请输入初期应变计划抢救措施"  :disabled="isDisabled"/></div>
			</a-form-model-item>
			<p><b>6.2<span class="star">*</span>厂务/设备值班在确保安全的前提下，切断泄漏物质供应端，进行止漏</b>
			
			<div class="content" style="padding-left: 40px">
				<a-form-model-item  prop="isSeepageSuccess">
					<a-radio-group v-model="dynamicValidateForm.isSeepageSuccess" :disabled="isDisabled||seeDisabled">
						<a-radio :value="1">
							止漏成功
						</a-radio>
						<a-radio :value="0">
							止漏失败
						</a-radio>
					</a-radio-group>
				</a-form-model-item>
			</div>
			<div v-if="dynamicValidateForm.isSeepageSuccess === 1" class="stop-fire-success">
				<div class="report-person" style="margin:0 0 10px -40px">
					<a-form-model-item prop="seepageSuccessPerson">
						<div class="box"><span class="left">处理人：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.seepageSuccessPerson" placeholder="请输入确认人员姓名"  :disabled="isDisabled"/></div></div>
					</a-form-model-item>
					<a-form-model-item prop="seepageSuccessTime">
						<div class="box"><span class="left">处理时间：</span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.seepageSuccessTime"  :disabled="isDisabled"/></div>
						</div>
					</a-form-model-item>
				</div>
				<ul style="margin-left:-40px">
					<li><span class="star">*</span>止漏成功回报监控中心</li>
					<li v-if="!showUser"><span class="star">*</span>用吸液棉进行围堵/用吸酸车处理，处理完时间：<a-date-picker :valueFormat="valueFormat" style="width:50%" show-time v-model="dynamicValidateForm.seepageSuccessFinishTime"  :disabled="isDisabled"/></li>
					<li v-if="showUser"><span class="star">*</span>通知厂务加大排风换气</li>
				</ul>
				<div class="report-person" style="margin:0 0 10px -40px">
					<a-form-model-item prop="aerationPerson">
						<div class="box"><span class="left">处理人：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.aerationPerson" placeholder="请输入确认人员姓名"  :disabled="isDisabled"/></div></div>
					</a-form-model-item>

					<a-form-model-item prop="informTime">
						<div class="box"><span class="left">通知时间：</span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.informTime"  :disabled="isDisabled"/></div>
						</div>
					</a-form-model-item>
				</div>
				<div style="margin:0 0 10px -40px">
					发送初期应变止漏成功简讯（前提是有发真实泄漏简讯），时间：<a-date-picker :valueFormat="valueFormat" style="width:30%" show-time v-model="dynamicValidateForm.successMsgTime"  :disabled="isDisabled"/>
					<a href="http://nhoaaps01.chn.nexchip/AlarmSystem/Login.aspx#" title="发送简讯"  target="_blank" :disabled="isDisabled" style="padding-left:20px">发送简讯</a>
				</div>
			</div>

			<div v-if="dynamicValidateForm.isSeepageSuccess === 0"  class="stop-fire-failed">
				<div class="report-person">
					<a-form-model-item prop="seepageFailReason">
						<div class="box"><span class="left">失败原因：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.seepageFailReason" placeholder="请输入失败原因"  :disabled="isDisabled"/></div></div>
					</a-form-model-item>

					<a-form-model-item prop="seepageFailTime">
						<div class="box"><span class="left">时间：</span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.seepageFailTime"  :disabled="isDisabled"/></div>
						</div>
					</a-form-model-item>
				</div>
				<ul>
					<li><span class="star">*</span>止漏失败回报监控中心</li>
					<li><span class="star">*</span>现场进行临时管制</li>
				</ul>

				<div class="big-fire" style="margin-left: -40px" v-if="dynamicValidateForm.isSeepageSuccess === 0">
					<div class="add-new-user">
						<a-button type="dashed" style="width: 20%" @click="controlPersonVisible = true"  :disabled="isDisabled">
							<a-icon type="plus" /> 添加管制人
						</a-button>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<a-button type="dashed" style="width: 20%" @click="controlPersonList = true">
							<a-icon type="menu" /> 查看管制人列表
						</a-button>
					</div>
					<div>
						发送初期应变止漏成功简讯（前提是有发真实泄漏简讯），时间：<a-date-picker :valueFormat="valueFormat" style="width:30%" show-time v-model="dynamicValidateForm.failMsgTime"  :disabled="isDisabled"/>
						<a href="http://nhoaaps01.chn.nexchip/AlarmSystem/Login.aspx#" title="发送简讯"  target="_blank" :disabled="isDisabled" style="padding-left:20px">发送简讯</a>
					</div>
				</div>


			</div>

			<div class="submit-btn">
				<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled||seeDisabled">
					下一步
				</a-button>
				<a-button type="primary" style="margin-left: 20px" html-type="submit" @click="saveData()" :disabled="isDisabled">
					保存
				</a-button>
			</div>

		</a-form-model>

		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加管制人信息"
			:visible="controlPersonVisible"
			@ok="handleControlPerson"
			@cancel="controlPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">管制人：</span><div class="right"><a-input allowClear v-model="controlPersonObj.userName" placeholder="请输入管制人员姓名" /></div></div>
			</div>
		</a-modal>
		<a-modal
			:width="1000"
			class="control-person-modal"
			title="管制人信息列表"
			:visible="controlPersonList"
			@ok="controlPersonList = false"
			@cancel="controlPersonList = false">
			<a-table bordered :data-source="controlList" :rowKey="(record,index)=>{return index}" :columns="columns2"></a-table>
		</a-modal>

	</div>
</template>

<script>
	export default {
		name: "initialStrain",
		data(){
			return{
				valueFormat: "YYYY-MM-DD HH:mm:ss",
				controlPersonList:false,
				controlPersonVisible:false,
				isDisabled:false,
				showUser:false,
				seeDisabled:false,
				foukId: null, 
				controlPersonObj:{
					userName:''
				},
				controlList:[],
				 radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
				columns2:[
					{
						title: '管制人姓名',
						dataIndex: 'userName',
					}
				],
				dynamicValidateForm:{
					aidMeasures:'',
					isSeepageSuccess:'',
					seepageSuccessPerson:'',
					seepageSuccessTime:'',
					seepageSuccessFinishTime:'',
					aerationPerson:'',
					informTime:'',
					successMsgTime:'',
					seepageFailTime:'',
					seepageFailReason:'',
					failMsgTime:'',
				},
				rules:{
					isSeepageSuccess: [{ required: true, message: '请选择是否止漏成功', trigger: 'change' }],
					seepageSuccessPerson: [{ required: true, message: '请输入处理人姓名', trigger: 'blur' }],
					aidMeasures: [{ required: true, message: '请输入初期应变计划抢救措施', trigger: 'blur' }],
					seepageFailReason: [{ required: true, message: '请输入止漏失败原因', trigger: 'blur' }],
					aerationPerson: [{ required: true, message: '请输入处理人姓名', trigger: 'blur' }],
					seepageSuccessTime: [{ required: true, message: '请选择处理时间', trigger: 'blur' }],
					seepageSuccessFinishTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					informTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					successMsgTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					seepageFailTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					failMsgTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					
				}
			}
		},
		methods:{
			changeFire(e){
				this.dynamicValidateForm.stopFire = e.target.value
			},
			 //灭火方式选择
            onChangeFireSuccess(e) {
                this.dynamicValidateForm.outFireWay = e.target.value
            },
			failedTimeChange(e,val){
				this.dynamicValidateForm.failedTime = val
			},
			resultTimeChange(e,val){
				this.dynamicValidateForm.resultTime = val
			},
			handleControlPerson(){
				if(this.controlPersonObj.userName){
					this.controlList.push({
						userName:this.controlPersonObj.userName
					})
					this.controlPersonVisible = false
				}else{
					this.$message('error','管制人姓名不能为空！')
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let pople = ''
						for(let i of this.controlList){
							pople = pople + i.userName + ','
						}
						pople = pople.substring(0, pople.length - 1);
						let data = {
							aidMeasures: this.dynamicValidateForm.aidMeasures,
							isSeepageSuccess: this.dynamicValidateForm.isSeepageSuccess,
							seepageSuccessPerson: this.dynamicValidateForm.seepageSuccessPerson,
							informTime: this.dynamicValidateForm.informTime,
							seepageSuccessTime: this.dynamicValidateForm.seepageSuccessTime,
							seepageSuccessFinishTime: this.dynamicValidateForm.seepageSuccessFinishTime,
							aerationPerson: this.dynamicValidateForm.aerationPerson,
							successMsgTime: this.dynamicValidateForm.successMsgTime,
							seepageFailTime: this.dynamicValidateForm.seepageFailTime,
							seepageFailReason: this.dynamicValidateForm.seepageFailReason,
							failMsgTime: this.dynamicValidateForm.failMsgTime,
							controlPeople: pople,
							
							processInstanceId: localStorage.getItem('processInstanceId'),
						}
						this.$http.post3('/chemInitialStrain/executeProcess',data).then((res) => {
							let data = {
                                    processInstanceId:localStorage.getItem('processInstanceId')
                                }
                                this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                                    for(let i of res.data.data){
                                        if(i.isFinish == '0'){
                                            this.$emit("changeComponent1Data", i.taskKey,res.data.data)
                                        }
                                    }
                                })
						})
						this.seeDisabled = true
					} else {
						return false;
					}
				});
			},
			// 保存
			saveData(){
				let pople = ''
				for(let i of this.controlList){
					pople = pople + i.userName + ','
				}
				pople = pople.substring(0, pople.length - 1);
				let data = {
					id: this.foukId,
					isSeepageSuccess: this.dynamicValidateForm.isSeepageSuccess,
					seepageSuccessPerson: this.dynamicValidateForm.seepageSuccessPerson,
					informTime: this.dynamicValidateForm.informTime,
					seepageSuccessTime: this.dynamicValidateForm.seepageSuccessTime,
					seepageSuccessFinishTime: this.dynamicValidateForm.seepageSuccessFinishTime,
					aidMeasures: this.dynamicValidateForm.aidMeasures,
					aerationPerson: this.dynamicValidateForm.aerationPerson,
					successMsgTime: this.dynamicValidateForm.successMsgTime,
					seepageFailTime: this.dynamicValidateForm.seepageFailTime,
					seepageFailReason: this.dynamicValidateForm.seepageFailReason,
					failMsgTime: this.dynamicValidateForm.failMsgTime,
					controlPeople: pople,
					
					processInstanceId: localStorage.getItem('processInstanceId'),
				}
				this.$http.post3('/chemInitialStrain/saveOrUpdate',data).then((res) => {
				})
			},
			viewData(){
				if (localStorage.getItem('seeLeak') == 2){
					this.showGD = false;
				}else if (localStorage.getItem('seeLeak') == 1){
					this.showGD = true;
				}
				this.$http.get3('/chemInitialStrain/queryOne?processInstanceId='+ localStorage.getItem('processInstanceId')).then((res) => {
					if (res.data.data){
					let tempData = res.data.data;
					if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
					this.dynamicValidateForm.isSeepageSuccess = Number(tempData.isSeepageSuccess),
					this.dynamicValidateForm.aidMeasures = tempData.aidMeasures,
					this.dynamicValidateForm.seepageSuccessPerson = tempData.seepageSuccessPerson
					this.dynamicValidateForm.informTime = tempData.informTime
					this.dynamicValidateForm.aerationPerson = tempData.aerationPerson
					this.dynamicValidateForm.seepageSuccessTime = tempData.seepageSuccessTime
					this.dynamicValidateForm.seepageSuccessFinishTime = tempData.seepageSuccessFinishTime
					this.dynamicValidateForm.successMsgTime = tempData.successMsgTime
					this.dynamicValidateForm.seepageFailTime = tempData.seepageFailTime
					this.dynamicValidateForm.seepageFailReason = tempData.seepageFailReason
					this.dynamicValidateForm.failMsgTime = tempData.failMsgTime

					
					
					if(tempData.controlPeopleList){
						this.controlList = tempData.controlPeopleList
					}
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='initialStrain'){
                                this.isDisabled = true
                            }
							if(i.isFinish == '1' && i.taskKey =='initialStrain'){
                                this.seeDisabled = true
                            }
                        }
                    })
					}
				})
			},
		},
        mounted(){
            this.viewData()
        }
	}
</script>

<style lang="stylus" scoped>
	#initial-strain
		// border 1px solid #2c3e50
		padding 10px
		// margin 20px
		width calc(100% - 40px)
		height 780px
		text-align left
		.star 
			color:#f5222d
			font-size: 14px
			font-family: SimSun, sans-serif
			margin-right: 4px
		.stop-fire-success,.stop-fire-failed
			padding-left 80px
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
			.report-person
				display flex
				justify-content space-between
				align-items center
				.ant-form-item
					width 49%
					margin-bottom 5px
					.box
						width 100%
						display flex
						align-items center
						.left
							width 70px
						.right
							width calc(100% - 70px)
		.submit-btn
			display flex
			justify-content center
			margin-top 20px
</style>
