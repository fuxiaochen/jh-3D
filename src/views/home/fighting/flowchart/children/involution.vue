<template>
	<div id="involution">
		<h2><b>13. 复归</b></h2>
		<template>
			<a-form-model
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
			>
			<a-form-model-item>
				<p style="margin-left: -40px"><b>13.1*现场环境侦测（多次）</b></p>
				<div class="add-new-user">
					<a-button type="dashed" style="width: 20%" @click="confirmPersonVisible = true" :disabled="isDisabled">
						<a-icon type="plus" /> 添加环境侦测
					</a-button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a-button type="dashed" style="width: 20%" @click="confirmPersonList = true">
						<a-icon type="menu" /> 查看环境侦测
					</a-button>
				</div>
			</a-form-model-item>

				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>13.2*现场环境清理，完成时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.TVdate"  :disabled="isDisabled"/></div>
				</a-form-model-item>
				<p><b>13.2*保护好现场，待调查</b></p>
				<p><b>13.3*系统复归</b></p>
				<div>
						<a-form-model-item prop="fireLevel">
							<a-radio-group v-model="dynamicValidateForm.fireLevel" class="fire-radio-group" name="radioGroup" @change="seeFire" :disabled="isDisabled">
								<a-radio :value="1">
									系统复归
								</a-radio>
								<a-radio :value="0">
									系统未触发
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					<div v-if="dynamicValidateForm.fireLevel === 1">
						<div style="margin: 5px 0 0 40px"><span><b>电梯复归，时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.elevatorDetectionTime"  :disabled="isDisabled"/></div>
						<div style="margin: 5px 0 0 40px"><span><b>门禁复归，时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.doorDetectionTime"  :disabled="isDisabled"/></div>
						<div style="margin: 5px 0 0 40px"><span><b>防火门复归，时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.fireDoorDetectionTime"  :disabled="isDisabled"/></div>
						<div style="margin: 5px 0 0 40px"><span><b>排烟系统复位，时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.smokeSystemTime"  :disabled="isDisabled"/></div>
						<div style="margin: 5px 0 50px 40px"><span><b>正压送风系统复归，时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.positiveAirSystemDetectionTime"  :disabled="isDisabled"/></div>
					</div>
					</div>
					<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>13.4*器材复归，完成时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.equipmentDetectionTime" :disabled="isDisabled"/></div>
				</a-form-model-item>
					<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>13.5*管制解除，完成时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.deregulationTime" :disabled="isDisabled"/></div>
				</a-form-model-item>
				<a-form-model-item>
				<p style="margin-left: -40px"><b>13.6*回报指挥官，解除状况或人员复归确认</b></p>
				<div class="add-new-user">
					<span style="margin-left: -20px;width:80px"><b>指挥官：</b></span><div class="right"><a-input allowClear v-model="confirmPersonObj.commander" placeholder="请输入总指挥官" :disabled="isDisabled" /></div>
					<span style="margin-left: 20px;width:60px"><b>分机：</b></span><div class="right"><a-input allowClear v-model="confirmPersonObj.ext" placeholder="请输入分机" :disabled="isDisabled" /></div>
					<span style="margin-left: 20px;width:60px"><b>时间：</b></span><div class="right"><a-date-picker show-time v-model="confirmPersonObj.reportTime" :disabled="isDisabled" /> </div>
				</div>
				</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>13.7*发布复归广播，时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.radioBroadcastTime" :disabled="isDisabled" /></div>
					<div>  复归广播词：监控中心报告，监控中心报告，先前(☆☆)发生火灾，现已处理完毕，现场环境确认无异常，请同仁返回岗位安心工作。（间隔1.5S，重复两次）</div>
				</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>13.8*发送复归简讯（前提是有人员疏散/发送初期应变失败简讯），时间：</b><a-date-picker show-time v-model="dynamicValidateForm.newsTime" :disabled="isDisabled" /></span>
					<a href="http://nhoaaps01.chn.nexchip/AlarmSystem/Login.aspx#" title="发送简讯"  target="_blank" :disabled="isDisabled" style="padding-left:20px">发送简讯</a></div>
				</a-form-model-item>
				<p><b>13.9*对外通报</b></p>
				<div>
						<a-form-model-item prop="region">
							<a-radio-group v-model="dynamicValidateForm.region" class="fire-radio-group" name="radioGroup" @change="seeFire">
								<a-radio :value="1">
									事故造成人员伤亡或者直接经济损失，工安课须于一小时内向新站区管委会安监局进行通报 
									<div v-if="dynamicValidateForm.region === 1" style="margin-top:10px"><span><b>通报时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.accidentNotificationTime" :disabled="isDisabled" /><span style='margin-left:20px'><b>通报人：</b></span><a-input v-model="inputPople" :disabled="isDisabled" /></div> 
								</a-radio>
								<a-radio :value="2">
									污染物异常大量泄漏或其他造成污染环境或危害人体健康之情况，环保课须于一小时内向新站区管委会环保局进行通报
									<div v-if="dynamicValidateForm.region === 2" style="margin-top:10px"><span><b>通报时间：</b></span><a-date-picker show-time v-model="dynamicValidateForm.pollutantNotificationTime" :disabled="isDisabled" /><span style='margin-left:20px'><b>通报人：</b></span><a-input v-model="inputPople1" :disabled="isDisabled" /></div> 
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</div>
					<p><b>13.9*开立异常事件调查单</b></p>
				<div class="submit-btn">
					<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled">
						结束
					</a-button>
					<a-button type="primary" style="margin-left: 20px" html-type="submit" @click="saveData()" :disabled="isDisabled">
						暂存
					</a-button>
				</div>
			</a-form-model>
		</template>

		<a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加环境侦测信息"
			:visible="confirmPersonVisible"
			@ok="handleConfirmPerson"
			@cancel="confirmPersonVisible = false">
			<div class="confirm-person">
				<div class="box"><span class="left">时间：</span><div class="right">
					<a-date-picker style="width:100%" show-time @change="confirmPersonChange" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">GD种类：</span><div class="right"><a-input allowClear v-model="confirmPersonObj.name" placeholder="请输入GD种类" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">读值: ppm</span><div class="right"><a-input allowClear v-model="confirmPersonObj.phone" placeholder="请输入读值" /></div></div>
			</div>
		</a-modal>

		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加回报指挥官信息"
			:visible="controlPersonVisible"
			@ok="handleControlPerson"
			@cancel="controlPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">指挥官：</span><div class="right"><a-input allowClear v-model="controlPersonObj.name" placeholder="请输入指挥官姓名" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">分机：</span><div class="right"><a-input allowClear v-model="controlPersonObj.phone" placeholder="请输入分机号码" /></div></div>
				<div class="box"><span class="left">时间：</span><div class="right">
					<a-date-picker style="width:100%" show-time @change="controlPersonChange" /></div></div>
			</div>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="环境侦测信息列表"
			:visible="confirmPersonList"
			@ok="confirmPersonList = false"
			@cancel="confirmPersonList = false">
			<a-table bordered :data-source="confirmList" :rowKey="(record,index)=>{return index}" :key="confirmList.gdType" :columns="columns"></a-table>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="指挥官信息列表"
			:visible="controlPersonList"
			@ok="controlPersonList = false"
			@cancel="controlPersonList = false">
			<a-table bordered :data-source="controlList" :rowKey="(record,index)=>{return index}" :key="controlList.name" :columns="columns2"></a-table>
		</a-modal>

	</div>
</template>

<script>
	export default {
		name: "involution",
		data() {
			return {
				confirmPersonVisible:false,
				isDisabled: true,
				processInstanceId: localStorage.getItem('processInstanceId'),
				inputPople:null,
				inputPople1:null,
				confirmPersonObj:{
					name:null,
					phone:null,
					date:null
				},
				controlPersonVisible:false,
				controlPersonObj:{
					name:null,
					phone:null,
					commander:null,
					ext:null,
					reportTime:null,
					date:null
				},
				confirmPersonList:false,
				controlPersonList:false,
				columns: [
					{
						title: '时间',
						dataIndex: 'ppm',
					},
					{
						title: 'GD种类',
						dataIndex: 'gdType',
					},
					{
						title: '读值',
						dataIndex: 'readValue',
					}
				],
				columns2: [
					{
						title: '指挥官',
						dataIndex: 'name',
					},
					{
						title: '分机',
						dataIndex: 'phone',
					},
					{
						title: '时间',
						dataIndex: 'date',
					},
				],
				rules: {
					TVdate: [{ required: true, message: '请选择完成时间', trigger: 'blur' }],
					newDate: [{ required: true, message: '请选择环境侦测', trigger: 'change' }],
					region: [{ required: true, message: '请选择对外通报', trigger: 'change' }],
					fireLevel:[{ required: true, message: '请选择系统复归情况', trigger: 'change' }],
				},
				dynamicValidateForm: {
					TVdate: '',
					elevatorDetectionTime: '',
					doorDetectionTime: '',
					fireDoorDetectionTime: '',
					smokeSystemTime: '',
					positiveAirSystemDetectionTime: '',
					equipmentDetectionTime: '',
					deregulationTime: '',
					newsTime: '',
					accidentNotificationTime: '',
					pollutantNotificationTime: '',
					region:'',
					fireLevel:''
				},
				variableObj:{
					seeHappended:0,
					seefire:0,
				},
				confirmList:[],
				controlList:[]
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let data = {
							commander: this.confirmPersonObj.commander,
							ext: this.confirmPersonObj.ext,
							reportTime: this.confirmPersonObj.reportTime,
							elevatorDetection: this.dynamicValidateForm.region,
							environmentalCleanTime: this.dynamicValidateForm.TVdate,
							elevatorDetectionTime: this.dynamicValidateForm.elevatorDetectionTime,
							doorDetectionTime: this.dynamicValidateForm.doorDetectionTime,
							fireDoorDetectionTime: this.dynamicValidateForm.fireDoorDetectionTime,
							smokeSystemTime: this.dynamicValidateForm.smokeSystemTime,
							positiveAirSystemDetectionTime: this.dynamicValidateForm.positiveAirSystemDetectionTime,
							triggerSystem:  this.dynamicValidateForm.fireLevel,
							equipmentDetectionTime: this.dynamicValidateForm.equipmentDetectionTime,
							deregulationTime: this.dynamicValidateForm.deregulationTime,
							radioBroadcastTime: this.dynamicValidateForm.radioBroadcastTime,
							newsTime: this.dynamicValidateForm.newsTime,
							accidentNotificationTime: this.dynamicValidateForm.accidentNotificationTime,
							accidentNotificationPerson: this.inputPople,
							pollutantNotificationTime: this.dynamicValidateForm.pollutantNotificationTime,
							pollutantNotificationPerson: this.inputPople1,
							envirDetectionList: this.confirmList,
							processInstanceId: this.processInstanceId,
						}
						this.$http.post3('/fire/involution/excuteProcess',data).then((res) => {
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
							this.$router.push('/contingencyManage/event')
						})
					} else {
						return false;
					}
				});
			},
			saveData(){
				let data = {
					commander: this.confirmPersonObj.commander,
					ext: this.confirmPersonObj.ext,
					reportTime: this.confirmPersonObj.reportTime,
					elevatorDetection: this.dynamicValidateForm.region,
					environmentalCleanTime: this.dynamicValidateForm.TVdate,
					elevatorDetectionTime: this.dynamicValidateForm.elevatorDetectionTime,
					doorDetectionTime: this.dynamicValidateForm.doorDetectionTime,
					fireDoorDetectionTime: this.dynamicValidateForm.fireDoorDetectionTime,
					smokeSystemTime: this.dynamicValidateForm.smokeSystemTime,
					positiveAirSystemDetectionTime: this.dynamicValidateForm.positiveAirSystemDetectionTime,
					triggerSystem:  this.dynamicValidateForm.fireLevel,
					equipmentDetectionTime: this.dynamicValidateForm.equipmentDetectionTime,
					deregulationTime: this.dynamicValidateForm.deregulationTime,
					radioBroadcastTime: this.dynamicValidateForm.radioBroadcastTime,
					newsTime: this.dynamicValidateForm.newsTime,
					accidentNotificationTime: this.dynamicValidateForm.accidentNotificationTime,
					accidentNotificationPerson: this.inputPople,
					pollutantNotificationTime: this.dynamicValidateForm.pollutantNotificationTime,
					pollutantNotificationPerson: this.inputPople1,
					envirDetectionList: this.confirmList,
					processInstanceId: this.processInstanceId,
				}
				this.$http.post3('/fire/involution/saveOrUpdate',data).then((res) => {
				})
			},
			viewData(){
				this.$http.get3('/fire/involution/queryOne?processInstanceId='+ this.processInstanceId).then((res) => {
					let tempData = res.data.data;
					this.confirmPersonObj.commander = tempData.commander,
					this.confirmPersonObj.ext = tempData.ext,
					this.confirmPersonObj.reportTime = tempData.reportTime,
					this.dynamicValidateForm.TVdate = tempData.environmentalCleanTime,
					this.dynamicValidateForm.region = Number(tempData.elevatorDetection),
					this.dynamicValidateForm.elevatorDetectionTime = tempData.elevatorDetectionTime,
					this.dynamicValidateForm.doorDetectionTime = tempData.doorDetectionTime,
					this.dynamicValidateForm.fireDoorDetectionTime = tempData.fireDoorDetectionTime,
					this.dynamicValidateForm.smokeSystemTime = tempData.smokeSystemTime,
					this.dynamicValidateForm.positiveAirSystemDetectionTime = tempData.positiveAirSystemDetectionTime,
					this.dynamicValidateForm.fireLevel = Number(tempData.triggerSystem),
					this.dynamicValidateForm.equipmentDetectionTime = tempData.equipmentDetectionTime,
					this.dynamicValidateForm.deregulationTime = tempData.deregulationTime,
					this.dynamicValidateForm.radioBroadcastTime = tempData.radioBroadcastTime,
					this.dynamicValidateForm.newsTime = tempData.newsTime,
					this.dynamicValidateForm.accidentNotificationTime = tempData.accidentNotificationTime,
					this.dynamicValidateForm.pollutantNotificationTime = tempData.pollutantNotificationTime,
					this.inputPople= tempData.accidentNotificationPerson,
					this.inputPople1= tempData.accidentNotificationPerson,
					this.confirmList = tempData.envirDetectionList
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='involution'){
                                this.isDisabled = true
                            }
                        }
                    })
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			confirmPersonChange(e,val){// 确认人信息---时间
				this.confirmPersonObj.date = val
			},
			controlPersonChange(e,val){// 确认人信息---时间
				this.controlPersonObj.date = val
			},
			cctv(e,val){// 确认人信息---时间
				this.dynamicValidateForm.TVdate = val
			},
			seeWhatHappend(e){
				this.variableObj.seeHappended = e.target.value // => 看到现场情况 、、 看不到现场情况的切换
			},
			seeFire(e){
				this.variableObj.seefire = e.target.value // => 火势大小的切换
			},
			handleControlPerson(){
				if(this.controlPersonObj.name){
					this.confirmList.push({
						gdType: this.controlPersonObj.name,
						readValue: this.controlPersonObj.phone,
						ppm: this.controlPersonObj.date
					})
					this.controlPersonVisible = false
				}else{
					this.$message('error','指挥官姓名不能为空！')
				}
			},
			handleConfirmPerson(){
				if(this.confirmPersonObj.date){
					this.confirmList.push({
						gdType:this.confirmPersonObj.name,
						readValue: this.confirmPersonObj.phone,
						ppm: this.confirmPersonObj.date
					})
					this.confirmPersonVisible = false
				}else{
					this.$message('error','侦测时间不能为空！')
				}
			}
		},
        mounted(){
            this.viewData()
        }
	}
</script>

<style lang="stylus" scoped>
	#involution
		
		padding 10px
		width 100%
		text-align left
		height 800px
		overflow-y: auto;
		text-align left
		.confirm-person-modal
			.confirm-person
				.box
					margin-bottom 15px
		.ant-form-item
			padding-left 40px
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
	#involution
		.box
			.ant-calendar-picker
				width 100%
</style>
