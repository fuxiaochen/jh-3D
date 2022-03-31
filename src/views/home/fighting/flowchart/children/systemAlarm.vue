<template>
    <div class="systemAlarm">
        <h2><b>2. 系统Alarm</b></h2>
        <template>
            <a-form-model
                    ref="dynamicValidateForm"
                    :model="alarmData"
                    :rules="rules"
            >
                <p><b>2.1Alarm位置</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="时间" prop="alarmDate">
                            <a-date-picker show-time v-model="alarmData.alarmDate" @change="alarmDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="位置" prop="position">
                            <a-input v-model="alarmData.position" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>2.1Alarm类型</b></p>
                <div class="rescueData">
                    <a-form-model-item prop="alarmType1">
                        <a-checkbox v-model="alarmData.alarmType1" @change="onChangeType1" :disabled="isDisabled">
                            烟感/温感
                        </a-checkbox>
                    </a-form-model-item>
                </div>
                <div class="rescueData" v-if="this.alarmData.alarmType1">
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="smokeVisible = true" :disabled="isDisabled">
                            <a-icon type="plus"/>
                            添加烟感信息
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="smokeListVisible = true">
                            <a-icon type="menu"/>
                            查看烟感信息
                        </a-button>
                    </div>
                </div>
                <div class="rescueData">
                    <a-form-model-item prop="alarmType2">
                        <a-checkbox v-model="alarmData.alarmType2" @change="onChangeType2" :disabled="isDisabled">
                            VESDA
                        </a-checkbox>
                    </a-form-model-item>
                </div>
                <div class="rescueData" v-if="this.alarmData.alarmType2">
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="vesdaVisible = true" :disabled="isDisabled">
                            <a-icon type="plus"/>
                            添加VESDA信息
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="vesdaListVisible = true">
                            <a-icon type="menu"/>
                            查看VESDA信息
                        </a-button>
                    </div>
                </div>
                <div class="rescueData">
                    <a-form-model-item prop="alarmType2">
                        <a-checkbox v-model="alarmData.alarmType3" @change="onChangeType3" :disabled="isDisabled">
                            其他
                        </a-checkbox>
                    </a-form-model-item>
                </div>
                <div class="rescueData" v-if="this.alarmData.alarmType3">
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="otherVisible = true" :disabled="isDisabled">
                            <a-icon type="plus"/>
                            添加其他类型
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="otherListVisible = true">
                            <a-icon type="menu"/>
                            查看其他类型
                        </a-button>
                    </div>
                </div>

                <p><b>2.3火灾确认广播是否推出</b></p>
                <div class="rescueData">
                    <template>
                        <a-form-model-item prop="broadcast">
                            <a-radio-group v-model="alarmData.broadcast" name="radioGroup" @change="broadcast" :disabled="isDisabled">
                                <a-radio :value="1">
                                    是
                                </a-radio>
                                <a-radio :value="2">
                                    否
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                    </template>
                </div>
                <div class="noticeDepart" v-if="this.alarmData.broadcast === 1 ">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="确认推出时间" prop="broadcastDate">
                            <a-date-picker show-time v-model="alarmData.broadcastDate"  @change="broadcastDate" :disabled="isDisabled"/>
                        </a-form-model-item>
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

        <a-modal
                destroyOnClose
                class="confirm-person-modal"
                title="添加烟感/温感设备信息"
                :visible="smokeVisible"
                @ok="handleConfirmSmoke"
                @cancel="smokeVisible = false">
            <div class="confirm-person">
                <div class="box" style="margin-bottom: 15px"><span class="left">具体柱位或位置: </span>
                    <div class="right">
                        <a-input allowClear v-model="smokeObj.columnss" placeholder="请输入具体柱位或位置"/>
                    </div>
                </div>
                <div class="box"><span class="left">报警设备编码：</span>
                    <div class="right">
                        <a-input allowClear v-model="smokeObj.deviceCode" placeholder="请输入报警设备编码"/>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="确认烟感/温感设备信息"
                :visible="smokeListVisible"
                @ok="smokeListVisible = false"
                @cancel="smokeListVisible = false">
            <a-table bordered :data-source="smokeList" :rowKey="(record,index)=>{return index}"
                     :key="smokeList.deviceCode"
                     :columns="smokeColumns"></a-table>
        </a-modal>

        <a-modal
                destroyOnClose
                class="confirm-person-modal"
                title="添加VESDA信息"
                :visible="vesdaVisible"
                @ok="handleConfirmVesda"
                @cancel="vesdaVisible = false">
            <div class="confirm-person">
                <div class="box" style="margin-bottom: 15px"><span class="left">具体柱位或位置: </span>
                    <div class="right">
                        <a-input allowClear v-model="vesdaObj.columnss" placeholder="请输入具体柱位或位置"/>
                    </div>
                </div>
                <div class="box"><span class="left">报警设备编码：</span>
                    <div class="right">
                        <a-input allowClear v-model="vesdaObj.deviceCode" placeholder="请输入报警设备编码"/>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="确认VESDA信息"
                :visible="vesdaListVisible"
                @ok="vesdaListVisible = false"
                @cancel="vesdaListVisible = false">
            <a-table bordered :data-source="vesdaList" :rowKey="(record,index)=>{return index}"
                     :key="vesdaList.deviceCode"
                     :columns="vesdaColumns"></a-table>
        </a-modal>

        <a-modal
                destroyOnClose
                class="confirm-person-modal"
                title="添加其他类型"
                :visible="otherVisible"
                @ok="handleConfirmOther"
                @cancel="otherVisible = false">
            <div class="confirm-person">
                <div class="box" style="margin-bottom: 15px"><span class="left">其他: </span>
                    <div class="right">
                        <a-input allowClear v-model="otherObj.other" placeholder="请输入其他类型"/>
                    </div>
                </div>
                <div class="box" style="margin-bottom: 15px"><span class="left">具体柱位或位置: </span>
                    <div class="right">
                        <a-input allowClear v-model="otherObj.columnss" placeholder="请输入具体柱位或位置"/>
                    </div>
                </div>
                <div class="box"><span class="left">报警设备编码：</span>
                    <div class="right">
                        <a-input allowClear v-model="otherObj.deviceCode" placeholder="请输入报警设备编码"/>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="确认环境持续检测列表"
                :visible="otherListVisible"
                @ok="otherListVisible = false"
                @cancel="otherListVisible = false">
            <a-table bordered :data-source="otherList" :rowKey="(record,index)=>{return index}"
                     :key="otherList.deviceCode"
                     :columns="otherColumns"></a-table>
        </a-modal>

    </div>
</template>

<script>
    export default {
        name: "systemAlarm",
        props: {
            //接收父组件传来的值
            processNumber: String
        },
        data() {
            return {
                smokeVisible: false,        //烟感设备信息添加
                smokeListVisible: false,
                isDisabled: true,
                smokeObj: {
                    columnss: '',
                    deviceCode: '',
                },
                smokeList: [],
                smokeColumns: [
                    {
                        title: '具体柱位/位置',
                        dataIndex: 'columnss',
                    }, {
                        title: '报警设备编码',
                        dataIndex: 'deviceCode',
                    },
                ],

                vesdaVisible: false,        //VESDA设备信息添加
                vesdaListVisible: false,
                vesdaObj: {
                    columnss: '',
                    deviceCode: '',
                },
                vesdaList: [],
                vesdaColumns: [
                    {
                        title: '具体柱位/位置',
                        dataIndex: 'columnss',
                    }, {
                        title: '报警设备编码',
                        dataIndex: 'deviceCode',
                    },
                ],

                otherVisible: false,        //其他设备信息添加
                otherListVisible: false,
                otherObj: {
                    other: '',
                    columnss: '',
                    deviceCode: '',
                },
                otherList: [],
                otherColumns: [
                    {
                        title: '其他',
                        dataIndex: 'other',
                    },
                    {
                        title: '具体柱位/位置',
                        dataIndex: 'columnss',
                    },
                    {
                        title: '报警设备编码',
                        dataIndex: 'deviceCode',
                    },
                ],

                alarmData: {
                    alarmDate: '',
                    position: '',
                    alarmType1: false,
                    alarmType2: false,
                    alarmType3: false,
                    broadcast: '',
                    broadcastDate: '',
                },
                rules: {
                    alarmDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    position: [{required: true, message: '请输入位置', trigger: 'blur'}],
                    alarmType: [{type: 'array', required: true, message: '请选择Alarm类型', trigger: 'change'}],
                    broadcast: [{required: true, message: '请确认广播是否推出', trigger: 'blur'}],
                    broadcastDate: [{required: true, message: '请选择时间', trigger: 'blur'}],
                },
                processInstanceId: localStorage.getItem('processInstanceId')
            }
        },
        methods: {
            //表单提交
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = {
                            processInstanceId: this.processInstanceId,
                            alarmTime: this.alarmData.alarmDate,
                            regionalLocation: this.alarmData.position,
                            smoke:this.alarmData.alarmType1,
                            vesda:this.alarmData.alarmType2,
                            other:this.alarmData.alarmType3,
                            smokeList:this.smokeList,
                            vesdaList:this.vesdaList,
                            otherList:this.otherList,
                            radioLaunch: this.alarmData.broadcast,
                            radioLaunchTime: this.alarmData.broadcastDate,
                        }
                        this.$http.post3('/fire/system/alarm/excuteProcess', data).then(res => {
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
                    processInstanceId: this.processInstanceId,
                    alarmTime: this.alarmData.alarmDate,
                    regionalLocation: this.alarmData.position,
                    smoke:this.alarmData.alarmType1,
                    vesda:this.alarmData.alarmType2,
                    other:this.alarmData.alarmType3,
                    smokeList:this.smokeList,
                    vesdaList:this.vesdaList,
                    otherList:this.otherList,
                    radioLaunch: this.alarmData.broadcast,
                    radioLaunchTime: this.alarmData.broadcastDate,
                }
                this.$http.post3('/fire/system/alarm/saveOrUpdate', data).then(res => {
                })
            },
            //回显测试
            viewData() {
                this.$http.get3('/fire/system/alarm/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    let tempData = res.data.data;
                    let data1 = tempData.smokeList.concat(tempData.vesdaList)
                    let data2 = tempData.otherList.concat(data1)
                    let alarmNoData = ''
                    for(let i of data2){
                        if(i.deviceCode){
                            alarmNoData = alarmNoData + i.deviceCode + ','
                        }
                    }
                    alarmNoData = alarmNoData.substring(0, alarmNoData.lastIndexOf(','));
                    this.$store.commit('setAlarmNo',alarmNoData);
                    this.alarmData = {
                        alarmDate: tempData.alarmTime,
                        position: tempData.regionalLocation,
                        alarmType1: eval(tempData.smoke),
                        alarmType2: eval(tempData.vesda),
                        alarmType3: eval(tempData.other),
                        broadcast:Number(tempData.radioLaunch),
                        broadcastDate: tempData.radioLaunchTime,
                    }
                    this.smokeList = tempData.smokeList
                    this.vesdaList = tempData.vesdaList
                    this.otherList = tempData.otherList
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='systemAlarm'){
                                this.isDisabled = true
                            }
                        }
                    })
                })
            },
            //温感按钮选中与否
            onChangeType1(e) {
                this.alarmData.alarmType1 = e.target.checked
            },
            //VESDA按钮选中与否
            onChangeType2(e) {
                this.alarmData.alarmType2 = e.target.checked
            },
            //其他按钮选中与否
            onChangeType3(e) {
                this.alarmData.alarmType3 = e.target.checked
            },

            //添加烟感报警相关信息
            handleConfirmSmoke() {
                if (this.smokeObj.deviceCode) {
                    this.smokeList.push({
                        alarmType:'A',
                        columnss: this.smokeObj.columnss,
                        deviceCode: this.smokeObj.deviceCode,
                    })
                    this.smokeVisible = false
                } else {
                    this.$message('error', '报警设备编码不能为空')
                }
            },

            //添加VESDA报警相关信息
            handleConfirmVesda() {
                if (this.vesdaObj.deviceCode) {
                    this.vesdaList.push({
                        alarmType:'B',
                        columnss: this.vesdaObj.columnss,
                        deviceCode: this.vesdaObj.deviceCode,
                    })
                    this.vesdaVisible = false
                } else {
                    this.$message('error', '报警设备编码不能为空')
                }
            },

            //添加其他报警相关信息
            handleConfirmOther() {
                if (this.otherObj.deviceCode) {
                    this.otherList.push({
                        alarmType:'C',
                        other: this.otherObj.other,
                        columnss: this.otherObj.columnss,
                        deviceCode: this.otherObj.deviceCode,
                    })
                    this.otherVisible = false
                } else {
                    this.$message('error', '报警设备编码不能为空')
                }
            },

            //系统告警时间
            alarmDate(value, dateString) {
                this.alarmData.alarmDate = dateString
            },
            //广播退出时间
            broadcastDate(value, dateString) {
                this.alarmData.broadcastDate = dateString
            },
            //Alarm类型
            alarmType(e) {
                this.alarmData.alarmType = e.target.value
            },
            //火灾确认广播是否推出
            broadcast(e) {
                this.alarmData.broadcast = e.target.value
            },
        },
        mounted(){
            this.viewData()
        }
    }
</script>

<style lang="stylus" scoped>
    .systemAlarm
        
        padding 10px
        margin 20px
        width calc(100% - 40px)
        text-align left

        .noticeDepart
            display flex

            .noticeDepartItem
                width 33%
                display flex

        .rescueData
            .add-new-user
                display flex
                justify-content center
                margin-bottom 20px

        .submit-btn
            display flex
            justify-content center
            margin-top 20px
</style>
<style lang="stylus">
    .systemAlarm
        .ant-form-item
            display flex

        .ant-form-item-label
            width 105px
</style>