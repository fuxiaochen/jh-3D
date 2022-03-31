<template>
	<div id="initial-strain">
		<h2><b>5. 初期应变</b></h2>
		<a-form-model
			ref="dynamicValidateForm"
			:model="dynamicValidateForm"
			:rules="rules">
			<p><b>5.1<span class="star">*</span>现场/确认人员在确保安全的前提下，执行初期灭火</b>
			</p>
			<div class="content" style="padding-left: 40px">
				<div class="result">
					<a-form-model-item prop="outFireWay">
						<a-radio-group class="result-select" v-model="dynamicValidateForm.outFireWay" @change="onChangeFireSuccess" :disabled="isDisabled||seeDisabled">
							<a-radio :value="1">
								非变电站设备（均低于600V）火灾无须断电，可直接用手提式干粉/CO2灭火器灭火
							</a-radio>
							<a-radio :style="radioStyle" :value="2">
								变电站/柴发区域（高于600V）火灾，须通知负责人断电后灭火
							</a-radio>
							<a-radio :value="3">
								气体类需先通知负责人切断供应端
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
				</div>
			</div>
			<div class="content" style="padding-left: 40px">
				<a-form-model-item  prop="stopFire">
					<a-radio-group v-model="dynamicValidateForm.stopFire" @change="changeFire" :disabled="isDisabled">
						<a-radio :value="1">
							灭火成功
						</a-radio>
						<a-radio :value="2">
							灭火失败
						</a-radio>
					</a-radio-group>
				</a-form-model-item>
			</div>
			<div v-if="dynamicValidateForm.stopFire === 1" class="stop-fire-success">
				<div class="report-person">
					<a-form-model-item prop="resultName">
						<div class="box"><span class="left">处理人：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.resultName" placeholder="请输入确认人员姓名"  :disabled="isDisabled"/></div></div>
					</a-form-model-item>

					<a-form-model-item prop="resultTime">
						<div class="box"><span class="left">处理时间：</span><div class="right">
							<a-date-picker style="width:100%" show-time v-model="dynamicValidateForm.resultTime"  :disabled="isDisabled"/></div>
						</div>
					</a-form-model-item>
				</div>
				<ul>
					<li>*灭火成功回报监控中心</li>
					<li>*观察有无复燃迹象</li>
					<li>*若未联动，则监控中心须将火警主机切换为手动状态</li>
				</ul>
			</div>

			<div v-if="dynamicValidateForm.stopFire === 2"  class="stop-fire-failed">
				<div class="report-person">
					<a-form-model-item prop="failedReason">
						<div class="box"><span class="left">失败原因：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.failedReason" placeholder="请输入失败原因"  :disabled="isDisabled"/></div></div>
					</a-form-model-item>

					<a-form-model-item prop="failedTime">
						<div class="box"><span class="left">处理时间：</span><div class="right">
							<a-date-picker style="width:100%" show-time v-model="dynamicValidateForm.failedTime"  :disabled="isDisabled"/></div>
						</div>
					</a-form-model-item>
				</div>
				<ul>
					<li>*灭火失败回报监控中心，进行人员疏散，并成立部门ERT抢救</li>
					<li>*现场进行临时管制</li>
				</ul>

				<div class="big-fire" style="margin-left: -40px" v-if="dynamicValidateForm.stopFire === 2">
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
			title="添加管制人信息"
			:visible="controlPersonVisible"
			@ok="handleControlPerson"
			@cancel="controlPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">姓名：</span><div class="right"><a-input allowClear v-model="controlPersonObj.name" placeholder="请输入管制人员姓名" /></div></div>
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
				controlPersonList:false,
				controlPersonVisible:false,
				isDisabled: true,
				radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
				controlPersonObj:{
					name:''
				},
				controlList:[],
				columns2:[
					{
						title: '姓名',
						dataIndex: 'userName',
					}
				],
				dynamicValidateForm:{
					stopFire:'',
					resultName:'',
					resultTime:null,
					failedReason:'',
					failedTime:null
				},
				rules:{
					stopFire: [{ required: true, message: '请选择灭火情况', trigger: 'change' }],
					resultName: [{ required: true, message: '请输入处理人姓名', trigger: 'blur' }],
					resultTime: [{ required: true, message: '请选择处理时间', trigger: 'blur' }],
					failedReason: [{ required: true, message: '请输入失败原因', trigger: 'blur' }],
					failedTime: [{ required: true, message: '请选择处理时间', trigger: 'blur' }],
					outFireWay: [{ required: true, message: '请选择灭火方式', trigger: 'change' }],
				},
				processInstanceId: localStorage.getItem('processInstanceId'),
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
				if(this.controlPersonObj.name){
					this.controlList.push({
						userName:this.controlPersonObj.name
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
							fireSuccess: this.dynamicValidateForm.stopFire,
							fireSuccessTime: this.dynamicValidateForm.resultTime,
							outFireWay: this.dynamicValidateForm.outFireWay,
							fireSuccessHandler: this.dynamicValidateForm.resultName,
							fireFailTime: this.dynamicValidateForm.failedTime,
							fireFailCause: this.dynamicValidateForm.failedReason,
							controler: pople,
							processInstanceId: this.processInstanceId,
						}
						this.$http.post3('/fire/initial/strain/excuteProcess',data).then((res) => {
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
			// 暂存
			saveData(){
				let pople = ''
				for(let i of this.controlList){
					pople = pople + i.userName + ','
				}
				pople = pople.substring(0, pople.length - 1);
				let data = {
					fireSuccess: this.dynamicValidateForm.stopFire,
					fireSuccessTime: this.dynamicValidateForm.resultTime,
					fireSuccessHandler: this.dynamicValidateForm.resultName,
					fireFailTime: this.dynamicValidateForm.failedTime,
					fireFailCause: this.dynamicValidateForm.failedReason,
					controler: pople,
					processInstanceId: this.processInstanceId,
				}
				this.$http.post3('/fire/initial/strain/saveOrUpdate',data).then((res) => {
				})
			},
			viewData(){
				this.$http.get3('/fire/initial/strain/queryOne?processInstanceId='+ this.processInstanceId).then((res) => {
					let tempData = res.data.data;
					// let aes = ''
					// let file = ''
					// let pople = ''
					// if(Number(tempData.fireSuccess) == 1){
					// 	aes = '灭火成功'
					// }else{
					// 	aes = '灭火失败'
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
                    //     let peopledata = "5.1现场确认:" + aes + ",处理人：" + tempData.fireSuccessHandler + "\n" +
                    //     "5.2灭火结果:" + aes + ",火势情况" + file + 
                    //     ",人员被困情况：" + pople
                    //     this.$store.commit("setProcessStrain",peopledata)
                    // }
					this.dynamicValidateForm.stopFire = Number(tempData.fireSuccess),
					this.dynamicValidateForm.resultTime = tempData.fireSuccessTime,
					this.dynamicValidateForm.outFireWay = Number(tempData.outFireWay),
					this.dynamicValidateForm.resultName = tempData.fireSuccessHandler,
					this.dynamicValidateForm.failedReason = tempData.fireFailCause,
					this.dynamicValidateForm.failedTime = tempData.fireFailTime
					if(tempData.controllerList){
						this.controlList = tempData.controllerList
					}
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='initialStrain'){
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
	#initial-strain
		
		padding 10px
		margin 20px
		width calc(100% - 40px)
		text-align left
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
