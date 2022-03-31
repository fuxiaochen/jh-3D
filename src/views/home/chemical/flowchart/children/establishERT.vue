<template>
	<div class="establishERT">
		<h2><b>11. 成立全厂ERT</b></h2>
		<template>
			<a-form-model
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
			>
			<a-form-model-item>
				<p style="margin-left: -40px"><b>11.1<span class="star">*</span>通报总经理成立全厂ERT</b></p>
				<div class="add-new-user">
					<span style="margin-left: -40px;width:80px"><b>总指挥官：</b></span><div class="right"><a-input allowClear v-model="confirmPersonObj.commander" placeholder="请输入总指挥官"  :disabled="isDisabled"/></div>
					<span style="margin-left: 20px;width:60px"><b>分机：</b></span><div class="right"><a-input allowClear v-model="confirmPersonObj.ext" placeholder="请输入分机" :disabled="isDisabled" /></div>
					<span style="margin-left: 20px;width:60px"><b>时间：</b></span><div class="right"><a-date-picker :valueFormat="valueFormat" show-time v-model="confirmPersonObj.extensionTime"  :disabled="isDisabled"/> </div>
				</div>
			</a-form-model-item>

				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>11.2<span class="star">*</span>拨打119，通知消防队处理，时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.TVdate"  :disabled="isDisabled"/></div>
				</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>11.3<span class="star">*</span>通知保安到南门进行引导，并交通管制，时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.newDate" :disabled="isDisabled"/></div>
				</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>11.4<span class="star">*</span>消防队进厂时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.approachDate"  :disabled="isDisabled"/></div>
				</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px"><span><b>11.5<span class="star">*</span>与消防队进行汇报，简报时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.noticeDate " :disabled="isDisabled"/>
					<span style="margin-left: 20px"><b>文件交接时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.noticeDate1"  :disabled="isDisabled"/></div>
				</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="display:flex">
						<div style="margin-left: -40px"><span><b>11.6<span class="star">*</span>建立指挥中心，时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.establishDate"  :disabled="isDisabled"/></div>
						<span style="margin-left: 20px"><b>位置：</b></span><div class="right"><a-input allowClear v-model="local" placeholder="请输入位置"  :disabled="isDisabled"/></div>
					</div>
				</a-form-model-item>
				<a-form-model-item prop="newDate" >
				<p style="margin-left: -40px"><b>11.7<span class="star">*</span>任务分配</b></p>
				<div class="add-new-user">
					<a-button type="dashed" style="width: 20%" @click="confirmPersonVisible = true" :disabled="isDisabled">
						<a-icon type="plus" /> 添加协助支援
					</a-button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a-button type="dashed" style="width: 20%" @click="confirmPersonList = true">
						<a-icon type="menu" /> 查看协助支援
					</a-button>
				</div>
				<div class="add-new-user">
					<a-button type="dashed" style="width: 20%" @click="helpersVisible = true" :disabled="isDisabled">
						<a-icon type="plus" /> 添加环境监测
					</a-button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a-button type="dashed" style="width: 20%" @click="helpersPersonList = true">
						<a-icon type="menu" /> 查看环境监测
					</a-button>
				</div>
			</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px;display:flex"><span><b>11.8<span class="star">*</span>止漏时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.endDate"  :disabled="isDisabled"/>
					<span style="margin-left: 20px"><b>消防队离厂时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.liveDate"  :disabled="isDisabled"/></div>
				</a-form-model-item>
				<a-form-model-item prop="TVdate" >
					<div style="margin-left: -40px;display:flex"><span><b>11.9<span class="star">*</span>发送全厂ERT灭火成功简讯，时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.toDate"  :disabled="isDisabled"/>
					<a href="http://nhoaaps01.chn.nexchip/AlarmSystem/Login.aspx#" title="发送简讯"  target="_blank" :disabled="isDisabled" style="padding-left:20px">发送简讯</a>
					</div>
					
				</a-form-model-item>
				
				<div class="submit-btn">
					<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled || seeDisabled">
						下一步
					</a-button>
					<a-button type="primary" style="margin-left: 20px" html-type="submit" @click="saveData()" :disabled="isDisabled">
                        保存
                    </a-button>
				</div>
			</a-form-model>
		</template>

		<a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加环境侦测信息"
			:visible="helpersVisible"
			@ok="handleHelpers"
			@cancel="helpersVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">环境监测：</span><div class="right">
					<a-input allowClear v-model="helpersObj.name" placeholder="请输入环境监测人" /></div></div>
			</div>
		</a-modal>
		<a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加协助支援信息"
			:visible="confirmPersonVisible"
			@ok="handleConfirmPerson"
			@cancel="confirmPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">协助支援：</span><div class="right">
					<a-input allowClear v-model="confirmPersonObj.name" placeholder="请输入协助支援人" /></div></div>
			</div>
		</a-modal>

		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加总指挥官信息"
			:visible="controlPersonVisible"
			@ok="handleControlPerson"
			@cancel="controlPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">指挥官：</span><div class="right"><a-input allowClear v-model="controlPersonObj.name" placeholder="请输入指挥官姓名" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">分机：</span><div class="right"><a-input allowClear v-model="controlPersonObj.phone" placeholder="请输入分机号码" /></div></div>
				<div class="box"><span class="left">时间：</span><div class="right">
					<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time @change="controlPersonChange" /></div></div>
			</div>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="环境侦测信息列表"
			:visible="confirmPersonList"
			@ok="confirmPersonList = false"
			@cancel="confirmPersonList = false">
			<a-table bordered :data-source="controlList" :rowKey="(record,index)=>{return index}" :key="controlList.userName" :columns="columns"></a-table>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="指挥官信息列表"
			:visible="controlPersonList"
			@ok="controlPersonList = false"
			@cancel="controlPersonList = false">
			<a-table bordered :data-source="confirmList" :rowKey="(record,index)=>{return index}" :key="confirmList.name" :columns="columns2"></a-table>
		</a-modal>
		<a-modal
			:width="1000"
			class="control-person-modal"
			title="环境监测信息列表"
			:visible="helpersPersonList"
			@ok="helpersPersonList = false"
			@cancel="helpersPersonList = false">
			<a-table bordered :data-source="helpersList" :rowKey="(record,index)=>{return index}" :key="helpersList.userName" :columns="columns3"></a-table>
		</a-modal>

	</div>
</template>

<script>
	export default {
		name: "establishERT",
		data() {
			return {
                valueFormat: "YYYY-MM-DD HH:mm:ss",
				confirmPersonVisible:false,
				helpersVisible:false,
				foukId: null, 
				isDisabled:false,
				seeDisabled:false,
				inputPople:null,
				local:null,
				local1:null,
				confirmPersonObj:{
					name:null,
					phone:null,
					date:null,
					extensionTime:null,
					ext:null,
					commander:null,
				},
				helpersObj:{
					name:null,
					phone:null,
					date:null
				},
				controlPersonVisible:false,
				controlPersonObj:{
					name:null,
					phone:null,
					date:null
				},
				confirmPersonList:false,
				controlPersonList:false,
				helpersPersonList:false,
				columns: [
					{
						title: '协助支援',
						dataIndex: 'userName',
					}
				],
				columns2: [
					{
						title: '总指挥官',
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
				columns3: [
					{
						title: '环境监测',
						dataIndex: 'userName',
					}
				],
				rules: {
					TVdate: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					newDate: [{ required: true, message: '请选择任务分配', trigger: 'change' }],
					region: [{ required: true, message: '请选择总指挥', trigger: 'change' }],
					fireLevel:[{ required: true, message: '请选择系统复归情况', trigger: 'change' }],
				},
				dynamicValidateForm: {
					TVdate: '', // 通知119时间
					newDate: '', // 通知保安时间
					approachDate: '', // 119进厂时间
					noticeDate: '', // 119简报时间
					noticeDate1: '', // 119文件交接时间
					establishDate: '', // 建立指挥中心时间
					endDate: '', // 灭火时间
					liveDate: '', // 离场时间
					toDate: '', // 成功简报时间
					region:'',
					fireLevel:''
				},
				variableObj:{
					seeHappended:0,
					seefire:0,
				},
				confirmList:[],
				helpersList:[],
				controlList:[]
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let pople = ''
						for(let i of this.helpersList){
							pople = pople + i.userName + ','
						}
						pople = pople.substring(0, pople.length - 1);
						let popleList = ''
						for(let i of this.controlList){
							popleList = popleList + i.userName + ','
						}
						popleList = popleList.substring(0, popleList.length - 1);
						let data = {
							commander: this.confirmPersonObj.commander,
							ext: this.confirmPersonObj.ext,
							extensionTime: this.confirmPersonObj.extensionTime,
							callBrigadeTime: this.dynamicValidateForm.TVdate,
							notifySecurityPersonTime: this.dynamicValidateForm.newDate,
							brigadeArrivalTime: this.dynamicValidateForm.approachDate,
							presentationTime: this.dynamicValidateForm.noticeDate,
							docHandoverTime: this.dynamicValidateForm.noticeDate1,
							commandCenterTime: this.dynamicValidateForm.establishDate,
							commandCenterLocation: this.local,
							assistanceSupport: popleList,
							envirMonitoring: pople,
							helpSupport: this.dynamicValidateForm.endDate,
							brigadeLeaveTime: this.dynamicValidateForm.liveDate,
							successMsgTime: this.dynamicValidateForm.toDate,
							processInstanceId: localStorage.getItem('processInstanceId'),
						}
						this.$http.post3('/chemFactoryErt/executeProcess',data).then((res) => {
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
					} else {
						return false;
					}
				});
			},
            //保存
			saveData(){
				let pople = ''
						for(let i of this.helpersList){
							pople = pople + i.userName + ','
						}
						pople = pople.substring(0, pople.length - 1);
						let popleList = ''
						for(let i of this.controlList){
							popleList = popleList + i.userName + ','
						}
						popleList = popleList.substring(0, popleList.length - 1);
						let data = {
							id: this.foukId,
							commander: this.confirmPersonObj.commander,
							ext: this.confirmPersonObj.ext,
							extensionTime: this.confirmPersonObj.extensionTime,
							callBrigadeTime: this.dynamicValidateForm.TVdate,
							notifySecurityPersonTime: this.dynamicValidateForm.newDate,
							brigadeArrivalTime: this.dynamicValidateForm.approachDate,
							presentationTime: this.dynamicValidateForm.noticeDate,
							docHandoverTime: this.dynamicValidateForm.noticeDate1,
							commandCenterTime: this.dynamicValidateForm.establishDate,
							commandCenterLocation: this.local,
							assistanceSupport: popleList,
							envirMonitoring: pople,
							helpSupport: this.dynamicValidateForm.endDate,
							brigadeLeaveTime: this.dynamicValidateForm.liveDate,
							successMsgTime: this.dynamicValidateForm.toDate,
							processInstanceId: localStorage.getItem('processInstanceId'),
						}
						this.$http.post3('/chemFactoryErt/saveOrUpdate',data).then((res) => {
							this.$message("success", "保存成功");
						})
			},
			viewData(){
				this.$http.get3('/chemFactoryErt/queryOne?processInstanceId='+ localStorage.getItem('processInstanceId')).then((res) => {
					if (res.data.data){
					let tempData = res.data.data;
					if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
					this.confirmPersonObj.commander = tempData.commander,
					this.confirmPersonObj.ext = tempData.ext,
					this.confirmPersonObj.extensionTime = tempData.extensionTime,
					this.dynamicValidateForm.TVdate = tempData.callBrigadeTime,
					this.dynamicValidateForm.newDate = tempData.notifySecurityPersonTime,
					this.dynamicValidateForm.approachDate = tempData.brigadeArrivalTime,
					this.dynamicValidateForm.noticeDate = tempData.presentationTime,
					this.dynamicValidateForm.noticeDate1 = tempData.docHandoverTime,
					this.dynamicValidateForm.establishDate = tempData.commandCenterTime,
					this.local= tempData.commandCenterLocation
					if(tempData.assistanceSupportList) {
						this.controlList = tempData.assistanceSupportList
					}
					if(tempData.envirMonitorList) {
						this.helpersList = tempData.envirMonitorList
					}
					this.dynamicValidateForm.endDate = tempData.stopLeakageTime,
					this.dynamicValidateForm.liveDate = tempData.brigadeLeaveTime,
					this.dynamicValidateForm.toDate = tempData.successMsgTime
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='factoryErt'){
                                this.isDisabled = true
                            }
                            if(i.isFinish == '1' && i.taskKey =='factoryErt'){
                                this.seeDisabled = true
                            }
                        }
                    })
					}
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
			cctv(e,val){// 通知119时间---时间
				this.dynamicValidateForm.TVdate = val
			},
			cctv1(e,val){// 通知保安时间---时间
				this.dynamicValidateForm.newDate = val
			},
			cctv2(e,val){// 119进厂时间---时间
				this.dynamicValidateForm.approachDate = val
			},
			cctv3(e,val){// 119简报时间---时间
				this.dynamicValidateForm.noticeDate = val
			},
			cctv4(e,val){// 119文件交接时间---时间
				this.dynamicValidateForm.noticeDate1 = val
			},
			cctv5(e,val){// 建立指挥中心时间---时间
				this.dynamicValidateForm.establishDate = val
			},
			cctv6(e,val){// 灭火时间---时间
				this.dynamicValidateForm.endDate = val
			},
			cctv7(e,val){// 离场时间---时间
				this.dynamicValidateForm.liveDate = val
			},
			cctv8(e,val){// 成功简报时间---时间
				this.dynamicValidateForm.toDate = val
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
						name: this.controlPersonObj.name,
						phone: this.controlPersonObj.phone,
						date: this.controlPersonObj.date
					})
					this.controlPersonVisible = false
				}else{
					this.$message('error','指挥官姓名不能为空！')
				}
			},
			handleConfirmPerson(){
				if(this.confirmPersonObj.name){
					this.controlList.push({
						userName:this.confirmPersonObj.name,
					})
					this.confirmPersonVisible = false
				}else{
					this.$message('error','协助支援不能为空！')
				}
			},
			handleHelpers(){
				if(this.helpersObj.name){
					this.helpersList.push({
						userName:this.helpersObj.name,
					})
					this.helpersVisible = false
				}else{
					this.$message('error','环境监测不能为空！')
				}
			}
		},
        mounted(){
            this.viewData()
        }
	}
</script>

<style lang="stylus" scoped>
	.establishERT
		// border 1px solid #2c3e50
		padding 10px
		width 100%
		text-align left
		height 780px
		overflow-y: auto;
		.confirm-person-modal
			.confirm-person
				.box
					margin-bottom 15px
		.ant-form-item
			padding-left 40px
		.star 
			color:#f5222d
			font-size: 14px
			font-family: SimSun, sans-serif
			margin-right: 4px
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
	.establishERT
		.box
			.ant-calendar-picker
				width 100%
</style>
