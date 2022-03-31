<template>
		<div id="videoCenter">
		<h2><b>3. 监控中心</b></h2>
		<template>
			<h3 v-if="showUser">人员通报</h3>
			<h3 v-if="!showUser">系统 Alarm</h3>
			<a-form-model 
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
			>
				<p><b>3.1<span class="star">*</span>立刻通知ERC值班前往现场确认（4min内到达现场）</b></p>
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
					<div style="margin-left: -40px"><span><b>3.2<span class="star">*</span>监控中心调阅现场CCTV，时间：</b></span><a-date-picker show-time @change="cctv" v-model="dynamicValidateForm.monitorCallTime" :disabled="isDisabled"/></div>
				</a-form-model-item>
				<div class="second-step" v-if="showUser">
					<template>
						<a-form-model-item style="margin-left: -40px" prop="isSeeScene">
							<a-radio-group v-model="dynamicValidateForm.isSeeScene" name="radioGroup" @change="seeWhatHappend" :disabled="isDisabled||seeDisabled">
								<a-radio :value="1">
									能看到现场情况
								</a-radio>
								<a-radio :value="0">
									看不到现场情况
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</template>
					<div v-if="dynamicValidateForm.isSeeScene === 1">
						<a-form-model-item prop="monitorSituation">
							<a-radio-group v-model="dynamicValidateForm.monitorSituation" class="fire-radio-group" name="radioGroup" @change="seeFire" :disabled="isDisabled||seeDisabled">
								<a-radio :value="1">
									无火势（<span class="star">*</span>若未联动，则监控中心须将火警主机切换为手动状态）
								</a-radio>
								<a-radio :value="2">
									火势小,单人单支手提式灭火器可扑灭（<span class="star">*</span>通知现场确认人员执行初期灭火）
								</a-radio>
								<a-radio :value="3">
									火势大,非单人单支手提式灭火器可扑灭（<span class="star">*</span>通知现场确认人员临时管制）
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div class="success" v-if="dynamicValidateForm.monitorSituation === 3">
							<a-row :gutter="2">
								<a-col class="gutter-row" :span="12">
									<div class="gutter-box">
										<div class="noticeBaseData-item">
											<div class="desc" style="width:300px">现场进行临时管制，管制人：</div>
											<div class="value">
												<a-form-model-item prop="fireSmallControler">
													<a-input v-model="noticeData.controler" :disabled="isDisabled"></a-input>
												</a-form-model-item>
											</div>
										</div>
									</div>
								</a-col>
							</a-row>
						</div>
					</div>
				</div>
				<div class="second-step"  v-if="!showUser">
					<template>
						<a-form-model-item style="margin-left: -40px" prop="isSeeScene">
							<a-radio-group v-model="dynamicValidateForm.isSeeScene" name="radioGroup" @change="seeWhatHappend" :disabled="isDisabled||seeDisabled">
								<a-radio :value="1">
									能看到现场情况
								</a-radio>
								<a-radio :value="0">
									看不到现场情况
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</template>
					<div v-if="dynamicValidateForm.isSeeScene === 1">
						<a-form-model-item prop="monitorSituation">
							<a-radio-group v-model="dynamicValidateForm.monitorSituation" class="fire-radio-group" name="radioGroup" @change="seeFire" :disabled="isDisabled||seeDisabled">
								<a-radio :value="2">
									火势小/火势已灭，若未联动，则监控中心须将火警主机切换为手动状态。
								</a-radio>
								<a-radio :value="3">
									火势很大，非单人单支手提式灭火器可扑灭
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</div>
				</div>

				<!-- <div class="big-fire" style="margin-left: -40px" v-if="dynamicValidateForm.region === 1 && dynamicValidateForm.fireLevel === 3">
					<div class="add-new-user" v-if="dynamicValidateForm.region === 1 && dynamicValidateForm.fireLevel === 3">
						<a-button type="dashed" style="width: 20%" @click="controlPersonVisible = true" :disabled="isDisabled">
							<a-icon type="plus" /> 添加管制人
						</a-button>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<a-button type="dashed" style="width: 20%" @click="controlPersonList = true">
							<a-icon type="menu" /> 查看管制人列表
						</a-button>
					</div>
				</div> -->

				<!-- //3.3 判断是否为人员通报进入 -->
                    <div class="result" v-if="showUser">
						<p><b>3.3<span class="star">*</span>现场通报人回报初期灭火结果</b></p>
                                <a-form-model-item prop="outfireSuccess">
                                    <a-radio-group class="result-select" v-model="noticeData.outfireSuccess"
                                                   @change="onChangeFireSuccess" :disabled="isDisabled||seeDisabled">
                                        <a-radio :value="1">
                                            灭火成功
                                        </a-radio>
                                        <a-radio :value="2">
                                            灭火失败
                                        </a-radio>
                                    </a-radio-group>
                                </a-form-model-item>
                                <div class="success" style="margin-left: 40px" v-if="noticeData.outfireSuccess === 1">
                                    <h4>灭火成功回报监控中心</h4>
                                    <h4>观察有无复燃迹象</h4>
                                    <h4>若未联动，则监控中心须将火警主机切换为手动状态</h4>
                                    <h4>若已联动广播，则监控中心须立即将广播隔离或广播输出线拔掉</h4>
                                    <a-row :gutter="2">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="gutter-box">
                                                <div class="noticeBaseData-item1">
													<div style="width: 700px"><span><b>成功时间：</b></span>
													<a-date-picker show-time
															v-model="noticeData.outfireSuccessTime"
															placeholder="时间选择"
															@change="onChangeSuccessTime"
															@ok="onOk" :disabled="isDisabled"/>
													</div>
                                                   
                                                </div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                                <div class="fail" v-if="noticeData.outfireSuccess === 2">
                                    <a-row :gutter="2">
                                        <a-col class="gutter-row" :span="12">
                                            <div class="gutter-box">
                                                <div class="noticeBaseData-item">
													<div style="width: 700px"><span><b>失败时间：</b></span>
													<a-date-picker show-time
															v-model="noticeData.outfireFailTime"
															placeholder="时间选择"
															@change="onChangeOutfireFailTime"
															@ok="onOk" :disabled="isDisabled"/>
													</div>
                                                </div>
                                            </div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="8">
                                            <div class="gutter-box">
                                                <div class="noticeBaseData-item">
                                                    <div class="desc" style="width:70px">失败原因：</div>
                                                    <div class="value">
                                                        <a-form-model-item prop="outfireFailCause">
                                                            <a-input v-model="noticeData.outfireFailCause" :disabled="isDisabled"></a-input>
                                                        </a-form-model-item>
                                                    </div>
                                                </div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="2">
                                        <a-col class="gutter-row" :span="12">
                                            <div class="gutter-box">
                                                <div class="noticeBaseData-item">
                                                    <div class="desc" style="width:300px">现场进行临时管制，管制人：</div>
                                                    <div class="value">
                                                        <a-form-model-item prop="fireSmallControler">
                                                            <a-input v-model="noticeData.outfireFailController" :disabled="isDisabled"></a-input>
                                                        </a-form-model-item>
                                                    </div>
                                                </div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                            </div>

				<div class="submit-btn">
					<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled">
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
					<a-date-picker style="width:100%" show-time @change="confirmPersonChange" v-model="confirmPersonObj.date" /></div></div>
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
			title="确认人信息列表"
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
			<a-table bordered :data-source="controlList" :rowKey="(record,index)=>{return index}" :key="controlList.name" :columns="columns2"></a-table>
		</a-modal>

	</div>
</template>

<script>
	export default {
		name: "videoCenter",
		data() {
			return {
				confirmPersonVisible:false,
				isDisabled: true,
				showUser:true,
				processInstanceId: localStorage.getItem('processInstanceId'),
				confirmPersonObj:{
					name:null,
					phone:null,
					date:null
				},
				noticeData:{
					outfireSuccess:null,
					controler:null,
					outfireSuccessTime:null,
					outfireFailTime:null,
					outfireFailCause:null,
					outfireFailController:null,
				},
				controlPersonVisible:false,
				controlPersonObj:{
					name:'',
				},
				confirmPersonList:false,
				controlPersonList:false,
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
						title: '姓名',
						dataIndex: 'userName',
					}
				],
				rules: {
					monitorCallTime: [{ required: true, message: '请选择现场时间', trigger: 'blur' }],
					isSeeScene: [{ required: true, message: '请选择现场情况', trigger: 'change' }],
					monitorSituation:[{ required: true, message: '请选择现场情况', trigger: 'change' }],
				},
				dynamicValidateForm: {
					monitorCallTime: '',
					isSeeScene:'',
					monitorSituation:''
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
				let pople = ''
				for(let i of this.controlList){
					pople = pople + i.userName + ','
				}
				pople = pople.substring(0, pople.length - 1);
				let data = {
					processInstanceId: this.processInstanceId,
					isSeeScene: this.dynamicValidateForm.isSeeScene,
					monitorCallTime: this.dynamicValidateForm.monitorCallTime,
					monitorSituation: this.dynamicValidateForm.monitorSituation,
					outfireSuccess: this.noticeData.outfireSuccess,
					controler: this.noticeData.controler,
					outfireSuccessTime: this.noticeData.outfireSuccessTime,
					outfireFailCause: this.noticeData.outfireFailCause,
					outfireFailTime: this.noticeData.outfireFailTime,
					outfireFailController: this.noticeData.outfireFailController,
				}
				this.$http.post3('/fire/supervision/center/excuteProcess',data).then((res) => {
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
			},
			saveData(){
				let data = {
					id: this.foukId,
					processInstanceId: this.processInstanceId,
					isSeeScene: this.dynamicValidateForm.isSeeScene,
					monitorCallTime: this.dynamicValidateForm.monitorCallTime,
					monitorSituation: this.dynamicValidateForm.monitorSituation,
					outfireSuccess: this.noticeData.outfireSuccess,
					controler: this.noticeData.controler,
					outfireSuccessTime: this.noticeData.outfireSuccessTime,
					outfireFailCause: this.noticeData.outfireFailCause,
					outfireFailTime: this.noticeData.outfireFailTime,
					outfireFailController: this.noticeData.outfireFailController,
				}
				this.$http.post3('/fire/supervision/center/saveOrUpdate',data).then((res) => {
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//灭火方式选择
            onChangeFireSuccess(e) {
                this.noticeData.outfireSuccess = e.target.value
            },
			viewData1(){
				let data = {
					processInstanceId:this.processInstanceId
				}
				this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
					for(let i of res.data.data){
						if(i.taskKey == 'systemAlarm'){
							this.showUser = false
						}
					}
				})
			},
			viewData(){
				this.$http.get3('/fire/supervision/center/queryOne?processInstanceId='+ this.processInstanceId).then((res) => {
					let tempData = res.data.data;
					if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
					this.dynamicValidateForm.isSeeScene = Number(tempData.isSeeScene) 
					this.dynamicValidateForm.monitorCallTime = tempData.monitorCallTime
					this.dynamicValidateForm.monitorSituation = Number(tempData.monitorSituation)
					this.noticeData.outfireSuccess = Number(tempData.outfireSuccess)
					this.noticeData.controler = tempData.controler
					this.noticeData.outfireSuccessTime = tempData.outfireSuccessTime
					this.noticeData.outfireFailCause = tempData.outfireFailCause
					this.noticeData.outfireFailTime = tempData.outfireFailTime
					this.noticeData.outfireFailController = tempData.outfireFailController
					if(tempData.controllerList){
						this.controlList = tempData.controllerList
					}
					this.confirmList = tempData.ercDutyPersonList
					let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='supervisionCenter'){
                                this.isDisabled = true
                            }
							if(i.preTaskKey == 'systemAlarm' && i.taskKey == 'supervisionCenter'){
                                this.showUser = false
                            }
                        }
                    })
				})
			},
			confirmPersonChange(e,val){// 确认人信息---时间
				this.confirmPersonObj.date = val
			},
			cctv(e,val){// 确认人信息---时间
				this.dynamicValidateForm.monitorCallTime = val
			},
			seeWhatHappend(e){
				this.variableObj.isSeeScene = e.target.value // => 看到现场情况 、、 看不到现场情况的切换
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
            this.viewData1()
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
		
		padding 10px
		margin 20px
		width calc(100% - 40px)
		text-align left
		.confirm-person-modal
			.confirm-person
				display flex
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
