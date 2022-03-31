<template>
    <div class="noticeDetail">
        <h2><b>7.通报</b></h2>
        <template>
            <a-form-model
                    ref="dynamicValidateForm"
                    :model="noticeData"
                    :rules="rules"
            >
                <p><b>7.1通报事故部门主管</b></p>
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
                            <a-date-picker show-time v-model="noticeData.departmentDate" @change="departmentDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <p><b>7.2根据事故等级进行电话通报</b></p>
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
                            <a-date-picker show-time v-model="noticeData.dutyDate" @change="dutyDate" :disabled="isDisabled"/>
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
                            <a-date-picker show-time v-model="noticeData.riskDate" @change="riskDate" :disabled="isDisabled"/>
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
                            <a-date-picker show-time v-model="noticeData.ERIDate" @change="ERIDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>7.3发送初期应变失败简讯</b></p>
                <div class="send">
                    <a-form-model-item style="margin-left: -40px" prop="send">
                        <a-radio-group v-model="noticeData.send" name="radioGroup" @change="sendChange" :disabled="isDisabled">
                            <a-radio :value="1">
                                达到简讯速报发送时机
                            </a-radio>
                            <a-radio :value="2">
                                未达到简讯速报发送时机
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </div>
                <div class="sendDate" v-if="noticeData.send === 1">
                    <a-form-model-item label="时间" prop="sendDate">
                        <a-date-picker show-time v-model="noticeData.sendDate" @change="sendDate" :disabled="isDisabled"/>
                        <a href="http://nhoaaps01.chn.nexchip/AlarmSystem/Login.aspx#" title="发送简讯"  target="_blank" :disabled="isDisabled" style="padding-left:20px">发送简讯</a>
                    </a-form-model-item>
                </div>

                <p><b>7.4对外通报</b></p>
                <div class="event">
                    <a-form-model-item prop="eventNotice">
                        <a-checkbox class="checkBox" v-model="noticeData.eventNotice"
                                    @change="eventNotice" :disabled="isDisabled">
                            事故造成人员伤亡或者直接经济损失，工安课须于一小时内向新站区管委会安监局进行通报
                        </a-checkbox>
                    </a-form-model-item>
                </div>
                <div class="eventDetail" v-if="this.noticeData.eventNotice">
                    <div class="noticeDepart">
                        <div class="noticeDepartItem">
                            <a-form-model-item label="通报时间" prop="eventDate">
                                <a-date-picker show-time v-model="noticeData.eventDate" @change="eventDate" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="通报人" prop="eventPeople">
                                <a-input v-model="noticeData.eventPeople" :disabled="isDisabled"/>
                            </a-form-model-item>

                        </div>
                    </div>
                </div>
                <div class="pollutant">
                    <a-form-model-item prop="pollutant">
                        <a-checkbox class="checkBox" v-model="noticeData.pollutant"
                                    @change="pollutant" :disabled="isDisabled">
                            污染物异常大量泄漏或其他造成污染环境或危害人体健康之情况，环保课须于一小时内向新站区管
                            委会环保局进行通报
                        </a-checkbox>
                    </a-form-model-item>
                </div>
                <div class="pollutantDetail" v-if="this.noticeData.pollutant">
                    <div class="noticeDepart">
                        <div class="noticeDepartItem">
                            <a-form-model-item label="通报时间" prop="pollutantDate">
                                <a-date-picker show-time v-model="noticeData.pollutantDate" @change="pollutantDate" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>
                        <div class="noticeDepartItem">
                            <a-form-model-item label="通报人" prop="pollutantPeople">
                                <a-input v-model="noticeData.pollutantPeople" :disabled="isDisabled"/>
                            </a-form-model-item>

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
        </template>
    </div>
</template>

<script>
    export default {
        name: "notice",
        data() {
            return {
                isDisabled: true,
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
                    departmentPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    departmentDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    dutyCharge: [{required: true, message: '请输入值班主管', trigger: 'blur'}],
                    dutyPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    dutyDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    riskCharge: [{required: true, message: '请输入风控主管', trigger: 'blur'}],
                    riskPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    riskDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    ERI: [{required: true, message: '请输入ERI(无线电)', trigger: 'blur'}],
                    ERIDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    send: [{required: true, message: '请选择', trigger: 'blur'}],
                    sendDate: [{required: true, message: '请选择', trigger: 'change'}],
                    eventNotice: [{required: true, message: '请勾选', trigger: 'change'}],
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

                            notificationEri:this.noticeData.ERI,
                            notificationEriTime:this.noticeData.ERIDate,

                            smsDelivery:this.noticeData.send,
                            smsDeliveryTime:this.noticeData.sendDate,

                            economicLoss:this.noticeData.eventNotice,
                            economicLossTime:this.noticeData.eventDate,
                            economicLossUser:this.noticeData.eventPeople,

                            polluteEnvir:this.noticeData.pollutant,
                            polluteEnvirTime:this.noticeData.pollutantDate,
                            polluteEnvirUser:this.noticeData.pollutantPeople
                        }
                        this.$http.post3('/fire/notification/excuteProcess', data).then(res => {
                            this.isDisabled = true
                            if (res.data.code === 1) {
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
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            saveData(){
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

                    notificationEri:this.noticeData.ERI,
                    notificationEriTime:this.noticeData.ERIDate,

                    smsDelivery:this.noticeData.send,
                    smsDeliveryTime:this.noticeData.sendDate,

                    economicLoss:this.noticeData.eventNotice,
                    economicLossTime:this.noticeData.eventDate,
                    economicLossUser:this.noticeData.eventPeople,

                    polluteEnvir:this.noticeData.pollutant,
                    polluteEnvirTime:this.noticeData.pollutantDate,
                    polluteEnvirUser:this.noticeData.pollutantPeople
                }
                this.$http.post3('/fire/notification/saveOrUpdate', data).then(res => {
                        this.$message("success", "暂存成功");
                })
            },
            //回显测试
            viewData() {
                this.$http.get3('/fire/notification/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    let tempData = res.data.data;
					// if(res.data.data){
                    //     let peopledata = "7.1事故部门主管:" + tempData.deptCharge + ",时间：" + tempData.notificationDeptTime + "\n" +
                    //     "7.2值班主管:" + tempData.dutyCharge + ",时间：" + tempData.notificationDutyTime + "\n"
                    //     "7.3风控主管:" + tempData.sceneryCharge + ",时间：" + tempData.notificationSceneryTime + "\n"
                    //     this.$store.commit("setProcessNotice",peopledata)
                    // }
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

                        ERI:tempData.notificationEri,
                        ERIDate:tempData.notificationEriTime,

                        send:Number(tempData.smsDelivery),
                        sendDate:tempData.smsDeliveryTime,

                        eventNotice:eval(tempData.economicLoss),
                        eventDate:tempData.economicLossTime,
                        eventPeople:tempData.economicLossUser,

                        pollutant:eval(tempData.polluteEnvir),
                        pollutantDate:tempData.polluteEnvirTime,
                        pollutantPeople:tempData.polluteEnvirUser
                    }
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='notification'){
                                this.isDisabled = true
                            }
                        }
                    })
                })
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
        
        padding 10px
        width calc(100% - 0)
        height 800px
        overflow auto
        text-align left

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