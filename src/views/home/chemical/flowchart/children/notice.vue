<template>
    <div class="noticeDetail">
        <h2><b>5.通报</b></h2>
        <template>
            <a-form-model
                    ref="dynamicValidateForm"
                    :model="noticeData"
                    :rules="rules"
            >
                <p><b>5.1通知厂务/设备值班至现场处理</b></p>
                 <div class="add-new-user" style="text-align:center;margin-bottom:15px">
                    <a-button type="dashed" style="width: 30%" @click="confirmPersonVisible1 = true" :disabled="isDisabled">
                        <a-icon type="plus"/>
                        添加厂务/设备值班信息
                    </a-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a-button type="dashed" style="width: 30%" @click="confirmPersonList1 = true">
                        <a-icon type="menu"/>
                        查看厂务/设备值班列表
                    </a-button>
                </div>
                <p><b>5.2通报事故部门主管</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem" style="width:39%">
                        <a-form-model-item label="事故部门主管" prop="departmentCharge">
                            <a-input v-model="noticeData.departmentCharge" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="分机" prop="departmentPhone">
                            <a-input v-model="noticeData.departmentPhone" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="时间" prop="departmentDate">
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.departmentDate" @change="departmentDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <p><b>5.3根据事故等级进行电话通报</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="值班主管" prop="dutyCharge">
                            <a-input v-model="noticeData.dutyCharge" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="分机" prop="dutyPhone">
                            <a-input v-model="noticeData.dutyPhone" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="时间" prop="dutyDate">
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.dutyDate" @change="dutyDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="风控主管" prop="riskCharge">
                            <a-input v-model="noticeData.riskCharge" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="分机" prop="riskPhone">
                            <a-input v-model="noticeData.riskPhone" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="时间" prop="riskDate">
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.riskDate" @change="riskDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="ERI(无线电)" prop="ERI">
                            <a-input v-model="noticeData.ERI" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="时间" prop="ERIDate">
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.ERIDate" @change="ERIDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>5.4发送初期应变失败简讯</b></p>
                <div class="send">
                    <a-form-model-item style="margin-left: 40px" prop="send">
                        <a-radio-group v-model="noticeData.send" name="radioGroup" @change="sendChange" :disabled="isDisabled">
                            <a-radio :value="1">
                                达到简讯速报发送时机
                            </a-radio>
                            <a-radio :value="0">
                                未达到简讯速报发送时机
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </div>
                <div class="sendDate" v-if="noticeData.send === 1">
                    <a-form-model-item label="时间" prop="sendDate">
                        <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.sendDate" @change="sendDate" :disabled="isDisabled"/>
                        <a href="http://nhoaaps01.chn.nexchip/AlarmSystem/Login.aspx#" title="发送简讯"  target="_blank" :disabled="isDisabled" style="padding-left:20px">发送简讯</a>

                    </a-form-model-item>
                </div>

                <p><b>5.5人员疏散</b></p>          
                	<p v-if="showUser" style="margin-left: 40px">  疏散条件：Gas（毒性/腐蚀性/易燃易爆气体泄漏到环境中，或窒息性气体泄漏到通风不良环境中）</p>
                	<p v-if="!showUser" style="margin-left: 40px">  疏散条件：Leak（酸、碱、有机大量泄漏/现场状况不明有安全疑虑）</p>  
                <div class="send">
                    <a-form-model-item style="margin-left: 40px" prop="isEvacuationCondition">
                        <a-radio-group v-model="noticeData.isEvacuationCondition" name="radioGroup" :disabled="isDisabled">
                            <a-radio :value="1">
                                达到疏散条件
                            </a-radio>
                            <a-radio :value="0">
                                未达疏散条件，时间： <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.notEvacuationTime"  :disabled="isDisabled"/>
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </div>
                <p v-show="noticeData.isEvacuationCondition == 1">〖请求疏散〗</p>
                <div class="event" v-show="noticeData.isEvacuationCondition == 1">
                    <a-form-model-item style="margin-left: 40px" prop="isAgreeEvacuation">
                        <a-radio-group v-model="noticeData.isAgreeEvacuation" name="radioGroup" :disabled="isDisabled">
                            <a-radio :value="1">
                                同意疏散
                            </a-radio>
                            <a-radio :value="0">
                                不同意疏散 
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </div>
                <div class="eventDetail" v-if="noticeData.isAgreeEvacuation == 1 && noticeData.isEvacuationCondition == 1">
                    <div class="noticeDepart">
                        <div class="noticeDepartItem">
                            <a-form-model-item label="下令主管" prop="agreeCharge">
                                <a-input v-model="noticeData.agreeCharge" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="时间" prop="agreeTime">
                                <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.agreeTime"  :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                    </div>
                    <div class="noticeDepart">
                        <div class="noticeDepartItem">
                            <a-form-model-item label="广播疏散时间" prop="radioEvacuateTime">
                                <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.radioEvacuateTime" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="集合地点" prop="rallyPoint">
                                <a-input v-model="noticeData.rallyPoint" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="疏散区域" prop="evacuateArea">
                                <a-input v-model="noticeData.evacuateArea" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                    </div>
                    <a-form-model-item prop="radioRollTime">
						<div class="box"><span class="star">*</span><span class="left" style="font-weight:bold">现场ERC人员回报人员清点情况，点名时间：</span><a-date-picker  :valueFormat="valueFormat" show-time v-model="noticeData.radioRollTime"  :disabled="isDisabled"/></div>
					</a-form-model-item>
                    <div class="noticeDepart">
                        <div class="noticeDepartItem">
                            <a-form-model-item label="应到" prop="supposedNum">
                                <a-input style="width:90%" v-model="noticeData.supposedNum" :disabled="isDisabled"/><span> 人</span>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="实到" prop="attendanceNum">
                                <a-input style="width:90%" v-model="noticeData.attendanceNum" :disabled="isDisabled"/><span> 人</span>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="未到人员" prop="absentNum">
                                <a-input style="width:90%" v-model="noticeData.absentNum" :disabled="isDisabled"/><span> 人</span>
                            </a-form-model-item>
                        </div>
                    </div>
                    <div class="add-new-user" style="text-align:center;margin-bottom:15px">
                        <a-button type="dashed" style="width: 30%" @click="confirmPersonVisible = true" :disabled="isDisabled">
                            <a-icon type="plus"/>
                            添加未点名人员信息
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 30%" @click="confirmPersonList = true">
                            <a-icon type="menu"/>
                            查看未点名人员列表
                        </a-button>
                    </div>
                    <p style="margin-left: 40px">     疏散广播词：监控中心报告，监控中心报告，目前 (☆☆)区域发生(☆☆)泄漏。请(☆☆)区域
                     所有人员立刻由安全门疏散至(☆☆)地点集合。各部门自行集合点名并将结果回报监控中心。
                    （间隔1.5S，重复两次）</p>
                </div>
                <div class="pollutant" v-if="noticeData.isAgreeEvacuation == 0 && noticeData.isEvacuationCondition == 1">
                    <div class="noticeDepart">
                        <div class="noticeDepartItem">
                            <a-form-model-item label="主管" prop="notAgreeCharge">
                                <a-input v-model="noticeData.notAgreeCharge" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="时间" prop="notAgreeTime">
                                <a-date-picker :valueFormat="valueFormat" show-time v-model="noticeData.notAgreeTime"  :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="原因" prop="notAgreeCause">
                                <a-input v-model="noticeData.notAgreeCause" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                    </div>
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
        </template>
        <a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加未点名人员信息"
			:visible="confirmPersonVisible"
			@ok="handleConfirmPerson"
			@cancel="confirmPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">未点名人员找到时间：：</span><div class="right"> <a-date-picker :valueFormat="valueFormat" show-time v-model="confirmPersonObj.findTime" :disabled="isDisabled"/></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">姓名: </span><div class="right"><a-input allowClear v-model="confirmPersonObj.userName" placeholder="请输入姓名" /></div></div>
				<div class="box"><span class="left">原因：</span><div class="right">
					<a-input allowClear v-model="confirmPersonObj.cause" placeholder="请输入原因" />
					</div>
				</div>
			</div>
		</a-modal>
        <a-modal
			:width="1000"
			class="control-person-modal"
			title="未点名人员信息列表"
			:visible="confirmPersonList"
			@ok="confirmPersonList = false"
			@cancel="confirmPersonList = false">
			<a-table bordered :data-source="confirmList" :rowKey="(record,index)=>{return index}" :key="confirmList.userName" :columns="columns"></a-table>
		</a-modal>
        <a-modal
			destroyOnClose
			class="confirm-person-modal"
			title="添加厂务/设备值班信息"
			:visible="confirmPersonVisible1"
			@ok="handleConfirmPerson1"    
			@cancel="confirmPersonVisible1 = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">部门: </span><div class="right"><a-input allowClear v-model="confirmPersonObj1.dept" placeholder="请输入部门" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">姓名: </span><div class="right"><a-input allowClear v-model="confirmPersonObj1.userName" placeholder="请输入姓名" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">分机: </span><div class="right"><a-input allowClear v-model="confirmPersonObj1.ext" placeholder="请输入分机" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">时间：</span><div class="right"> <a-date-picker :valueFormat="valueFormat" show-time v-model="confirmPersonObj1.discoveryTime" :disabled="isDisabled"/></div></div>

			</div>
		</a-modal>
        <a-modal
			:width="1000"
			class="control-person-modal"
			title="厂务/设备值班信息列表"
			:visible="confirmPersonList1"
			@ok="confirmPersonList1 = false"
			@cancel="confirmPersonList1 = false">
			<a-table bordered :data-source="confirmList1" :rowKey="(record,index)=>{return index}" :columns="columns1"></a-table>
		</a-modal>
    </div>
</template>

<script>
    export default {
        name: "notice",
        data() {
            return {
                valueFormat: "YYYY-MM-DD HH:mm:ss",
                isDisabled:false,
                seeDisabled:false,
                showUser:false,
                confirmPersonVisible:false,
                confirmPersonVisible1:false,
                confirmPersonList:false,
                confirmPersonList1:false,
                confirmPersonObj:{
					findTime:null,
					userName:null,
					cause:null
				},
                confirmPersonObj1:{
					dept:null,
					userName:null,
					discoveryTime:null,
					ext:null
				},
                columns: [
					{
						title: '未点名人员找到时间',
						dataIndex: 'findTime',
					},
					{
						title: '姓名',
						dataIndex: 'userName',
					},
					{
						title: '原因',
						dataIndex: 'cause',
					}
				],
                columns1: [
					{
						title: '部门',
						dataIndex: 'dept',
					},
					{
						title: '姓名',
						dataIndex: 'userName',
					},
					{
						title: '分机',
						dataIndex: 'ext',
					},
					{
						title: '时间',
						dataIndex: 'discoveryTime',
					}
				],
                confirmList:[],
                confirmList1:[],
                foukId: null, 
                noticeData: {
                    departmentCharge: '',
                    departmentPhone: '',
                    departmentDate: "",
                    dutyCharge: '',
                    dutyPhone: '',
                    dutyDate: null,
                    riskCharge: '',
                    riskPhone: '',
                    riskDate: null,
                    ERI: '',
                    ERIDate: '',
                    isEvacuationCondition: '',
                    notEvacuationTime: '',
                    agreeCharge: '',
                    agreeTime: '',
                    radioEvacuateTime: '',
                    rallyPoint: '',
                    evacuateArea: '',
                    supposedNum: '',
                    attendanceNum: '',
                    absentNum: '',
                    notAgreeCharge: '',
                    notAgreeTime: '',
                    notAgreeCause: '',
                    radioRollTime: '',
                    isAgreeEvacuation: '',
                    send: '',
                    sendDate: null,
                    eventNotice: false,
                    eventDate: null,
                    eventPeople: '',
                    pollutant: false,
                    pollutantDate: null,
                    pollutantPeople: '',
                },
                rules: {
                    departmentCharge: [{required: true, message: '请输入事故部门主管', trigger: 'blur'}],
                    agreeCharge: [{required: true, message: '请输入同意疏散主管', trigger: 'blur'}],
                    departmentPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    rallyPoint: [{required: true, message: '请输入集合地点', trigger: 'blur'}],
                    evacuateArea: [{required: true, message: '请输入疏散区域', trigger: 'blur'}],
                    supposedNum: [{required: true, message: '请输入应到人数量', trigger: 'blur'}],
                    attendanceNum: [{required: true, message: '请输入实到人数量', trigger: 'blur'}],
                    absentNum: [{required: true, message: '请输入未到人数量', trigger: 'blur'}],
                    notAgreeCause: [{required: true, message: '请输入原因', trigger: 'blur'}],
                    agreeTime: [{required: true, message: '请选择时间', trigger: 'change'}],
                    radioEvacuateTime: [{required: true, message: '请选择时间', trigger: 'change'}],
                    radioRollTime: [{required: true, message: '请选择时间', trigger: 'change'}],
                    departmentDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    notAgreeTime: [{required: true, message: '请选择时间', trigger: 'change'}],
                    dutyCharge: [{required: true, message: '请输入值班主管', trigger: 'blur'}],
                    notAgreeCharge: [{required: true, message: '请输入不同意疏散主管主管', trigger: 'blur'}],
                    dutyPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    dutyDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    riskCharge: [{required: true, message: '请输入风控主管', trigger: 'blur'}],
                    riskPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    riskDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    ERI: [{required: true, message: '请输入ERI(无线电)', trigger: 'blur'}],
                    ERIDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    notEvacuationTime: [{required: true, message: '请选择时间', trigger: 'change'}],
                    isEvacuationCondition: [{required: true, message: '请选择', trigger: 'blur'}],
                    isAgreeEvacuation: [{required: true, message: '请选择', trigger: 'blur'}],
                    send: [{required: true, message: '请选择', trigger: 'blur'}],
                    sendDate: [{required: true, message: '请选择', trigger: 'change'}],
                    eventNotice: [{required: true, message: '请勾选', trigger: 'change'}],
                    radioGroup: [{required: true, message: '请勾选', trigger: 'change'}],
                    eventDate: [{required: true, message: '请选择', trigger: 'change'}],
                    eventPeople: [{required: true, message: '请选择', trigger: 'blur'}],
                    pollutant: [{required: true, message: '请勾选', trigger: 'change'}],
                    pollutantDate: [{required: true, message: '请选择', trigger: 'change'}],
                    pollutantPeople: [{required: true, message: '请选择', trigger: 'blur'}],
                },
                processInstanceId:localStorage.getItem('processInstanceId'),
            }
        },
        methods: {
            //表单提交
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = {
                            processInstanceId:this.processInstanceId,
                            deptCharge:this.noticeData.departmentCharge,
                            deptChargeExt:this.noticeData.departmentPhone,
                            notificationDeptTime:this.noticeData.departmentDate,

                            dutyCharge:this.noticeData.dutyCharge,
                            dutyChargeExt:this.noticeData.dutyPhone,
                            notificationDutyTime:this.noticeData.dutyDate,

                            sceneryCharge:this.noticeData.riskCharge,
                            sceneryChargeExt:this.noticeData.riskPhone,
                            notificationSceneryTime:this.noticeData.riskDate,

                            eriNumber:this.noticeData.ERI,
                            notificationEriTime:this.noticeData.ERIDate,

                            smsDelivery:this.noticeData.send,
                            smsDeliveryTime:this.noticeData.sendDate,
                            isEvacuationCondition:this.noticeData.isEvacuationCondition,
                            isAgreeEvacuation:this.noticeData.isAgreeEvacuation,
                            notEvacuationTime:this.noticeData.notEvacuationTime,
                            agreeCharge:this.noticeData.agreeCharge,
                            agreeTime:this.noticeData.agreeTime,
                            radioEvacuateTime:this.noticeData.radioEvacuateTime,
                            rallyPoint:this.noticeData.rallyPoint,
                            evacuateArea:this.noticeData.evacuateArea,
                            supposedNum:this.noticeData.supposedNum,
                            attendanceNum:this.noticeData.attendanceNum,
                            absentNum:this.noticeData.absentNum,
                            notAgreeCharge:this.noticeData.notAgreeCharge,
                            notAgreeTime:this.noticeData.notAgreeTime,
                            notAgreeCause:this.noticeData.notAgreeCause,
                            radioRollTime:this.noticeData.radioRollTime,

                            economicLoss:this.noticeData.eventNotice,
                            economicLossTime:this.noticeData.eventDate,
                            economicLossUser:this.noticeData.eventPeople,

                            polluteEnvir:this.noticeData.pollutant,
                            polluteEnvirTime:this.noticeData.pollutantDate,
                            polluteEnvirUser:this.noticeData.pollutantPeople
                        }
                        this.$http.post3('/chemNotification/executeProcess', data).then(res => {
                            if (res.data.code === 1) {
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
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            saveData(){
                 let data = {
                    id: this.foukId,
                    processInstanceId:this.processInstanceId,
                    deptCharge:this.noticeData.departmentCharge,
                    deptChargeExt:this.noticeData.departmentPhone,
                    notificationDeptTime:this.noticeData.departmentDate,

                    dutyCharge:this.noticeData.dutyCharge,
                    dutyChargeExt:this.noticeData.dutyPhone,
                    notificationDutyTime:this.noticeData.dutyDate,

                    sceneryCharge:this.noticeData.riskCharge,
                    sceneryChargeExt:this.noticeData.riskPhone,
                    notificationSceneryTime:this.noticeData.riskDate,

                    eriNumber:this.noticeData.ERI,
                    notificationEriTime:this.noticeData.ERIDate,

                    smsDelivery:this.noticeData.send,
                    smsDeliveryTime:this.noticeData.sendDate,
                    isEvacuationCondition:this.noticeData.isEvacuationCondition,
                    isAgreeEvacuation:this.noticeData.isAgreeEvacuation,
                    notEvacuationTime:this.noticeData.notEvacuationTime,
                    agreeCharge:this.noticeData.agreeCharge,
                    agreeTime:this.noticeData.agreeTime,
                    radioEvacuateTime:this.noticeData.radioEvacuateTime,
                    rallyPoint:this.noticeData.rallyPoint,
                    evacuateArea:this.noticeData.evacuateArea,
                    supposedNum:this.noticeData.supposedNum,
                    attendanceNum:this.noticeData.attendanceNum,
                    absentNum:this.noticeData.absentNum,
                    notAgreeCharge:this.noticeData.notAgreeCharge,
                    notAgreeTime:this.noticeData.notAgreeTime,
                    notAgreeCause:this.noticeData.notAgreeCause,
                    radioRollTime:this.noticeData.radioRollTime,

                    economicLoss:this.noticeData.eventNotice,
                    economicLossTime:this.noticeData.eventDate,
                    economicLossUser:this.noticeData.eventPeople,

                    polluteEnvir:this.noticeData.pollutant,
                    polluteEnvirTime:this.noticeData.pollutantDate,
                    polluteEnvirUser:this.noticeData.pollutantPeople
                }
                this.$http.post3('/chemNotification/saveOrUpdate', data).then(res => {
                        this.$message("success", "保存成功");
                })
            },
            //回显测试
            viewData() {
                if( localStorage.getItem('seeLeak') == 1){
					this.showUser = true;
				}else if( localStorage.getItem('seeLeak') == 2){
					this.showUser = false;
				}
                this.$http.get3('/chemNotification/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    if (res.data.data){
                    let tempData = res.data.data;
                    if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
                    this.noticeData = {
                        departmentCharge:tempData.deptCharge,
                        departmentPhone:tempData.deptChargeExt,
                        departmentDate:tempData.notificationDeptTime,

                        dutyCharge:tempData.dutyCharge,
                        dutyPhone:tempData.dutyChargeExt,
                        dutyDate:tempData.notificationDutyTime,

                        riskCharge:tempData.sceneryCharge,
                        riskPhone:tempData.sceneryChargeExt,
                        riskDate:tempData.notificationSceneryTime,

                        ERI:tempData.eriNumber,
                        ERIDate:tempData.notificationEriTime,

                        send:Number(tempData.smsDelivery),
                        isEvacuationCondition:Number(tempData.isEvacuationCondition),
                        isAgreeEvacuation:Number(tempData.isAgreeEvacuation),
                        sendDate:tempData.smsDeliveryTime,
                        notEvacuationTime:tempData.notEvacuationTime,
                        agreeCharge:tempData.agreeCharge,
                        agreeTime:tempData.agreeTime,
                        radioEvacuateTime:tempData.radioEvacuateTime,
                        rallyPoint:tempData.rallyPoint,
                        evacuateArea:tempData.evacuateArea,
                        supposedNum:tempData.supposedNum,
                        attendanceNum:tempData.attendanceNum,
                        absentNum:tempData.absentNum,
                        notAgreeCharge:tempData.notAgreeCharge,
                        notAgreeTime:tempData.notAgreeTime,
                        notAgreeCause:tempData.notAgreeCause,
                        radioRollTime:tempData.radioRollTime,

                    }
                    this.confirmList1 = tempData.rcDutyPersonList
                    this.confirmList = tempData.notRollUserList
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='notification'){
                                this.isDisabled = true
                            }
                            if(i.isFinish == '1' && i.taskKey =='notification'){
                                this.seeDisabled = true
                            }
                        }
                    })
                    }
                })
            },

            handleConfirmPerson(){
				if(this.confirmPersonObj.userName){
					this.confirmList.push({
						findTime: this.confirmPersonObj.findTime,
						userName: this.confirmPersonObj.userName,
						cause: this.confirmPersonObj.cause
					})
					this.confirmPersonVisible = false
				}else{
					this.$message('error','姓名不能为空！')
				}
			},
            handleConfirmPerson1(){
				if(this.confirmPersonObj1.userName){
					this.confirmList1.push({
						dept: this.confirmPersonObj1.dept,
						userName: this.confirmPersonObj1.userName,
						ext: this.confirmPersonObj1.ext,
						discoveryTime: this.confirmPersonObj1.discoveryTime
					})
					this.confirmPersonVisible1 = false
				}else{
					this.$message('error','姓名不能为空！')
				}
			},
            //通知事故部门主管时间
            departmentDate(value, dateString) {
                this.noticeData.departmentDate = dateString
            },
            //通知值班主管时间
            dutyDate(value, dateString) {
                this.noticeData.dutyDate = dateString
            },
            //通知风控主管时间
            riskDate(value, dateString) {
                this.noticeData.riskDate = dateString
            },
            //通知ERI时间
            ERIDate(value, dateString) {
                this.noticeData.ERIDate = dateString
            },
            //达到简讯速报发送时机成功()
            sendDate(value, dateString) {
                this.noticeData.sendDate = dateString
            },
            //事件通报时间
            eventDate(value, dateString) {
                this.noticeData.eventDate = dateString
            },
            //污染物时间
            pollutantDate(value, dateString) {
                this.noticeData.pollutantDate = dateString
            },
            //发送初期应变失败简讯（选择）
            sendChange(e) {
                this.noticeData.send = e.target.value;
            },
            //事故通报
            eventNotice(e) {
                this.noticeData.eventNotice = e.target.checked
            },
            //污染物异常
            pollutant(e) {
                this.noticeData.pollutant = e.target.checked
            }
        },
        mounted(){
            this.viewData()
        }
    }
</script>

<style lang="stylus" scoped>
    .noticeDetail
        // border 1px solid #2c3e50
        padding 10px
        width calc(100% - 0)
        height 780px
        overflow auto
        text-align left

        .star 
            color #f5222d
            font-size 14px
            font-family SimSun, sans-serif
            margin-right 4px
            
        .noticeDepart
            display flex

            .noticeDepartItem
                width 37%
                display flex

        .send
            padding-left 40px

        .submit-btn
            display flex
            justify-content center
            margin-top 20px
</style>
<style lang="stylus">
    .noticeDetail
        .ant-form-item
            display flex

        .ant-form-item-label
            width 110px

</style>