<template>
	<div id="videoCenter">
		<h2><b>3. 监控中心</b></h2>
		<template>
			<h3 v-if="showUser">气体/GD</h3>
			<h3 v-if="!showUser">液体/LEAK</h3>
			<a-form-model 
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
				v-if="showUser"
			>
				<p><b>3.1<span class="star">*</span>立刻通知ERC值班前往现场确认（携带合适的PGD/防护具）</b></p>
				<div class="add-new-user">
					<a-button type="dashed" style="width: 20%" @click="confirmPersonVisible = true" :disabled="isDisabled">
						<a-icon type="plus" /> 添加确认人
					</a-button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a-button type="dashed" style="width: 20%" @click="confirmPersonList = true">
						<a-icon type="menu" /> 查看确认人列表
					</a-button>
				</div>
				<div class="add-new-user">
					<a-button type="dashed" style="width: 20%" @click="controlPersonVisible = true" :disabled="isDisabled">
						<a-icon type="plus" /> 添加PGD
					</a-button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a-button type="dashed" style="width: 20%" @click="controlPersonList = true">
						<a-icon type="menu" /> 查看PGD列表
					</a-button>
				</div>

				<a-form-model-item prop="monitorCallTime" >
					<div style="margin-left: -40px"><span><b>3.2<span class="star">*</span>监控中心调阅现场CCTV，时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.monitorCallTime" :disabled="isDisabled"/></div>
				</a-form-model-item>
				<div class="second-step">
					<template>
						<a-form-model-item style="margin-left: -40px" prop="isSeeScene">
							<a-radio-group v-model="dynamicValidateForm.isSeeScene" name="radioGroup" @change="seeWhatHappend" :disabled="isDisabled||seeDisabled">
								<a-radio :value="1">
									能看到现场情况（将结果告知现场确认人员）
								</a-radio>
								<a-radio :value="0">
									看不到现场情况
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</template>
				</div>
				<div class="result">
					<div><span><b>3.3<span class="star">*</span>查看FMCS系统，检查附近机台GD有无读值，时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.fmcsCheckTime" :disabled="isDisabled"/></div>
						<template>
							<a-form-model-item  prop="isGdHaveValue">
								<a-radio-group v-model="dynamicValidateForm.isGdHaveValue" name="radioGroup"  @change="onChangeFireSuccess"  :disabled="isDisabled||seeDisabled">
									<a-radio :value="1">
										有，查询SDS，将危害特性告知确认人员
									</a-radio>
									<a-radio :value="0">
										无
									</a-radio>
								</a-radio-group>
							</a-form-model-item>
						</template>
						<div class="add-new-user" v-if="dynamicValidateForm.isGdHaveValue === 1">
							<a-button type="dashed" style="width: 20%" @click="confirmGDVisible = true" :disabled="isDisabled">
								<a-icon type="plus" /> 添加机台GD读值
							</a-button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<a-button type="dashed" style="width: 20%" @click="controlgasList = true">
								<a-icon type="menu" /> 查看机台GD读值
							</a-button>
						</div>
				</div>
				<div class="result">
					<div><span><b>3.4<span class="star">*</span>当人员通报听到气体泄漏声音或GD HIHI Alarm，则需推送警报确认广播，广播时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.radioTime" :disabled="isDisabled"/></div>
						<span>  警报确认广播词：监控中心报告，监控中心报告，目前(☆☆)区域疑似发生气体泄漏，ERC已至现场确认，确认
       							结果将另以广播通知。（间隔1.5S，重复两次）</span>
				</div>

				<div class="submit-btn">
					<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled || seeDisabled">
						下一步
					</a-button>
					<a-button type="primary" style="margin-left: 20px" html-type="submit" @click="saveData()" :disabled="isDisabled">
                        保存
                    </a-button>
				</div>
			</a-form-model>
			<a-form-model 
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
				v-if="!showUser"
			>
				<p><b>3.1<span class="star">*</span>立刻通知ERC值班前往现场确认（携带合适的防护具）</b></p>
				<div class="add-new-user">
					<a-button type="dashed" style="width: 20%" @click="confirmPersonVisible = true" :disabled="isDisabled">
						<a-icon type="plus" /> 添加确认人
					</a-button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a-button type="dashed" style="width: 20%" @click="confirmPersonList = true">
						<a-icon type="menu" /> 查看确认人列表
					</a-button>
				</div>

				<a-form-model-item prop="monitorCallTime" >
					<div style="margin-left: -40px"><span><b>3.2<span class="star">*</span>监控中心调阅现场CCTV，时间：</b></span><a-date-picker :valueFormat="valueFormat" show-time  v-model="dynamicValidateForm.monitorCallTime" :disabled="isDisabled"/></div>
				</a-form-model-item>
				<div class="second-step">
					<template>
						<a-form-model-item style="margin-left: -40px" prop="isSeeScene">
							<a-radio-group v-model="dynamicValidateForm.isSeeScene" name="radioGroup" @change="seeWhatHappend" :disabled="isDisabled||seeDisabled">
								<a-radio :value="1">
									能看到现场情况（将结果告知现场确认人员）
								</a-radio>
								<a-radio :value="0">
									看不到现场情况
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</template>
					<div v-if="dynamicValidateForm.isSeeScene === 1">
						<a-form-model-item prop="isDivulge">
							<a-radio-group v-model="dynamicValidateForm.isDivulge" name="radioGroup"  :disabled="isDisabled||seeDisabled">
								<a-radio :value="1">
									有泄漏
								</a-radio>
								<a-radio :value="0">
									无泄漏
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div class="success" v-if="dynamicValidateForm.isDivulge === 1">
							<a-row :gutter="2">
								<a-col class="gutter-row" :span="12">
									<a-form-model-item prop="divulgeWay">
										<a-radio-group v-model="dynamicValidateForm.divulgeWay" class="fire-radio-group" name="radioGroup" :disabled="isDisabled||seeDisabled">
											<a-radio :value="1">
												喷溅
											</a-radio>
											<a-radio :value="2">
												流动
											</a-radio>
											<a-radio :value="3">
												滴漏
											</a-radio>
											<a-radio :value="4">
												静态
											</a-radio>
										</a-radio-group>
									</a-form-model-item>
								</a-col>
							</a-row>
						</div>
					</div>
				</div>
				<div class="result">
					<div><span><b>3.3若知道泄漏物质，则查询SDS，将危害特性告知确认人员，时间： </b></span><a-date-picker :valueFormat="valueFormat" show-time  v-model="dynamicValidateForm.informStaffTime" :disabled="isDisabled"/></div>
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
		</template>

		<a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加确认人信息"
			:visible="confirmPersonVisible"
			@ok="handleConfirmPerson"
			@cancel="confirmPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">姓名：</span><div class="right"><a-input allowClear v-model="confirmPersonObj.name" placeholder="请输入确认人员姓名" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">分机: </span><div class="right"><a-input allowClear v-model="confirmPersonObj.phone" placeholder="请输入分机号码" /></div></div>
				<div class="box"><span class="left">时间：</span><div class="right">
					<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time @change="confirmPersonChange" v-model="confirmPersonObj.date" /></div></div>
			</div>
		</a-modal>

		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加PGD"
			:visible="controlPersonVisible"
			@ok="handleControlPerson"
			@cancel="controlPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">PGD种类: </span><div class="right"><a-input allowClear v-model="controlPersonObj.pgdType" placeholder="请输入PGD种类" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">sensor: </span><div class="right"><a-input allowClear v-model="controlPersonObj.sensor" placeholder="请输入sensor" /></div></div>
			</div>
		</a-modal>
		<a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加机台GD"
			:visible="confirmGDVisible"
			@ok="handleConfirmGD"
			@cancel="confirmGDVisible = false">
			<div class="confirm-Person">
				<div class="box" style="margin-bottom: 15px"><span class="left">机台编号：</span><div class="right"><a-input allowClear v-model="confirmGDObj.machineNumber" placeholder="请输入机台编号" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">GD种类: </span><div class="right"><a-input allowClear v-model="confirmGDObj.gdType" placeholder="请输入GD种类" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">GD读值: </span><div class="right"><a-input allowClear style="width:93%" v-model="confirmGDObj.readValue" placeholder="请输入GD读值" /><span class="left"> ppm</span></div></div>
			</div>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="确认人信息列表"
			:visible="confirmPersonList"
			@ok="confirmPersonList = false"
			@cancel="confirmPersonList = false">
			<a-table bordered :data-source="confirmList" :rowKey="(record,index)=>{return index}" :key="confirmList.userName" :columns="columns"></a-table>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="机台GD信息列表"
			:visible="controlgasList"
			@ok="controlgasList = false"
			@cancel="controlgasList = false">
			<a-table bordered :data-source="gasList" :rowKey="(record,index)=>{return index}" :key="gasList.machineNumber" :columns="columns2"></a-table>
		</a-modal>
		<a-modal
			:width="1000"
			class="control-person-modal"
			title="PGD信息列表"
			:visible="controlPersonList"
			@ok="controlPersonList = false"
			@cancel="controlPersonList = false">
			<a-table bordered :data-source="controlList" :rowKey="(record,index)=>{return index}" :key="controlList.pgdType" :columns="columns3"></a-table>
		</a-modal>

	</div>
</template>

<script>
	export default {
		name: "videoCenter",
		data() {
			return {
                valueFormat: "YYYY-MM-DD HH:mm:ss",
				confirmPersonVisible:false,
				isDisabled:false,
				seeDisabled:false,
				foukId: null, 
				showUser:true,
				processInstanceId: localStorage.getItem('processInstanceId'),
				confirmPersonObj:{
					name:null,
					phone:null,
					date:null
				},
				noticeData:{
					controler:null,
					outfireSuccessTime:null,
					outfireFailTime:null,
					outfireFailCause:null,
					outfireFailController:null,
				},
				controlPersonVisible:false,
				confirmGDVisible:false,
				controlPersonObj:{
					pgdType:'',
					sensor:'',
				},
				confirmGDObj:{
					machineNumber:'',
					gdType:'',
					readValue:'',
				},
				confirmPersonList:false,
				controlPersonList:false,
				controlgasList:false,
				columns: [
					{
						title: '姓名',
						dataIndex: 'userName',
					},
					{
						title: '分机号码',
						dataIndex: 'ext',
					},
					{
						title: '时间',
						dataIndex: 'discoveryTime',
					}
				],
				columns2: [
					{
						title: '机台编号',
						dataIndex: 'machineNumber',
					},
					{
						title: 'GD种类',
						dataIndex: 'gdType',
					},
					{
						title: '读值',
						dataIndex: 'readValue',
					},
				],
				columns3: [
					{
						title: 'PGD种类',
						dataIndex: 'pgdType',
					},
					{
						title: 'sensor',
						dataIndex: 'sensor',
					},
				],
				rules: {
					monitorCallTime: [{ required: true, message: '请选择现场时间', trigger: 'blur' }],
					radioTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					informStaffTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
					fmcsCheckTime: [{ required: true, message: '请选择能否看到现场情况', trigger: 'blur' }],
					isSeeScene: [{ required: true, message: '请选择现场情况', trigger: 'change' }],
					isGdHaveValue: [{ required: true, message: '请选择GD有无读值', trigger: 'change' }],
					monitorSituation:[{ required: true, message: '请选择确认人', trigger: 'change' }],
					isDivulge:[{ required: true, message: '请选择有无泄露', trigger: 'change' }],
					divulgeWay:[{ required: true, message: '请选择泄露方式', trigger: 'change' }],
				},
				dynamicValidateForm: {
					isGdHaveValue: '',
					monitorCallTime: '',
					radioTime: '',
					informStaffTime: '',
					fmcsCheckTime: '',
					isSeeScene:'',
					isDivulge:'',
					divulgeWay:'',
				},
				variableObj:{
					seeHappended:0,
					seefire:0,
				},
				confirmList:[],
				gasList:[],
				controlList:[]
			};
		},
		watch:{
			"$store.state.showUser"(value,b){
				this.showUser = !value;
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						if(this.confirmList.length < 1  || this.controlList.length < 1) {
							this.$message('error','请填写完整确认人和PGD信息！')
						}else {
							let data = {
								processInstanceId: this.processInstanceId,
								isSeeScene: this.dynamicValidateForm.isSeeScene,
								monitorCallTime: this.dynamicValidateForm.monitorCallTime,
								radioTime: this.dynamicValidateForm.radioTime,
								informStaffTime: this.dynamicValidateForm.informStaffTime,
								fmcsCheckTime: this.dynamicValidateForm.fmcsCheckTime,
								isDivulge: this.dynamicValidateForm.isDivulge,
								divulgeWay: this.dynamicValidateForm.divulgeWay,
								isGdHaveValue: this.dynamicValidateForm.isGdHaveValue,
								ercDutyPersonList: this.confirmList,
								pgdList: this.controlList,
								machineList: this.gasList,
							}
							this.$http.post3('/chemSupervisionCenter/executeProcess',data).then((res) => {
									let data = {
										processInstanceId:this.processInstanceId
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
						}
					} else {
							return false;
					}
				});
			},
			saveData(){
				let data = {
					id: this.foukId,
					processInstanceId: this.processInstanceId,
					isSeeScene: this.dynamicValidateForm.isSeeScene,
					monitorCallTime: this.dynamicValidateForm.monitorCallTime,
					radioTime: this.dynamicValidateForm.radioTime,
					informStaffTime: this.dynamicValidateForm.informStaffTime,
					fmcsCheckTime: this.dynamicValidateForm.fmcsCheckTime,
					isDivulge: this.dynamicValidateForm.isDivulge,
					divulgeWay: this.dynamicValidateForm.divulgeWay,
					isGdHaveValue: this.dynamicValidateForm.isGdHaveValue,
					ercDutyPersonList: this.confirmList,
					pgdList: this.controlList,
					machineList: this.gasList,
				}
				this.$http.post3('/chemSupervisionCenter/saveOrUpdate',data).then((res) => {
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//灭火方式选择
            onChangeFireSuccess(e) {
                this.dynamicValidateForm.isGdHaveValue = e.target.value
            },
			//成功时间选择
            onChangeSuccessTime(value, dateString) {
                this.noticeData.outfireSuccessTime = dateString
            },
			//失败时间选择
            onChangeOutfireFailTime(value, dateString) {
                this.noticeData.outfireFailTime = dateString
            },
			viewData(){
				if( localStorage.getItem('seeLeak') == 1){
					this.showUser = true;
				}else if( localStorage.getItem('seeLeak') == 2){
					this.showUser = false;
				}
				this.$http.get3('/chemSupervisionCenter/queryOne?processInstanceId='+ this.processInstanceId).then((res) => {
					if (res.data.data){
					let tempData = res.data.data;
					if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
					this.dynamicValidateForm.isSeeScene = Number(tempData.isSeeScene) 
					this.dynamicValidateForm.radioTime = tempData.radioTime
					this.dynamicValidateForm.informStaffTime = tempData.informStaffTime
					this.dynamicValidateForm.monitorCallTime = tempData.monitorCallTime
					this.dynamicValidateForm.fmcsCheckTime = tempData.fmcsCheckTime
					this.dynamicValidateForm.isDivulge = Number(tempData.isDivulge)
					this.dynamicValidateForm.divulgeWay = Number(tempData.divulgeWay)
					this.dynamicValidateForm.isGdHaveValue = Number(tempData.isGdHaveValue)

					if(tempData.controllerList){
						this.controlList = tempData.controllerList
					}
					this.confirmList = tempData.ercDutyPersonList
					this.controlList = tempData.pgdList
					this.gasList = tempData.machineList
					let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='supervisionCenter'){
                                this.isDisabled = true
                            }
                            if(i.isFinish == '1' && i.taskKey =='supervisionCenter'){
                                this.seeDisabled = true
                            }
                        }
                    })
					}
				})
			},
			confirmPersonChange(e,val){// 确认人信息---时间
				this.confirmPersonObj.date = val
			},
			cctv(e,val){// 确认人信息---时间
				this.dynamicValidateForm.monitorCallTime = val
			},
			seeWhatHappend(e){
				this.dynamicValidateForm.isSeeScene = e.target.value // => 看到现场情况 、、 看不到现场情况的切换
			},
			seeFire(e){
				this.variableObj.seefire = e.target.value // => 火势大小的切换
			},
			handleConfirmPerson(){
				if(this.confirmPersonObj.name){
					this.confirmList.push({
						userName: this.confirmPersonObj.name,
						ext: this.confirmPersonObj.phone,
						discoveryTime: this.confirmPersonObj.date
					})
					this.confirmPersonVisible = false
				}else{
					this.$message('error','确认人姓名不能为空！')
				}
			},
			handleControlPerson(){
				if(this.controlPersonObj.pgdType){
					this.controlList.push({
						pgdType:this.controlPersonObj.pgdType,
						sensor:this.controlPersonObj.sensor
					})
					this.controlPersonVisible = false
				}else{
					this.$message('error','PGD种类不能为空！')
				}
			},
			handleConfirmGD(){
				if(this.confirmGDObj.machineNumber){
					this.gasList.push({
						machineNumber:this.confirmGDObj.machineNumber,
						gdType:this.confirmGDObj.gdType,
						readValue:this.confirmGDObj.readValue,
					})
					this.confirmGDVisible = false
				}else{
					this.$message('error','机台编号不能为空！')
				}
			}
		},
        mounted(){
            this.viewData()
        }
	}
</script>

<style lang="stylus" scoped>
	.noticeBaseData-item
		height 53px
		display flex
		width 100%

		.desc
			width 90px
			height 40px
			font-weight bold
			line-height 40px

		.value
			line-height 40px
			text-align left
			width calc(100% - 90px)
	#videoCenter
		border 1px solid #2c3e50
		padding 10px
		margin 20px
		width calc(100% - 40px)
		text-align left
		

		.star 
			color:#f5222d
			font-size: 14px
			font-family: SimSun, sans-serif
			margin-right: 4px
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
	#videoCenter
		.box
			.ant-calendar-picker
				width 100%
</style>
