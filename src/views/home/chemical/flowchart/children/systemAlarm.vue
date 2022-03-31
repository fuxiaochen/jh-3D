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
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="alarmData.alarmDate" @change="alarmDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="位置" prop="position">
                            <a-input v-model="alarmData.position" :disabled="isDisabled"></a-input>
                            <!-- <a-select 
                                    style="width:200px" 
                                    v-model:value="alarmData.position"
                                    placeholder="请选择" :disabled="isDisabled"
                            >
                                <a-select-option
                                        v-for="item in positionList"
                                        :value="item.dictItemTxt"
                                        :key="item.id"
                                >{{item.dictItemTxt}}
                                </a-select-option>
                            </a-select> -->
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>2.1Alarm类型</b></p>
                <div class="rescueData">
                    <template>
                        <a-form-model-item prop="materialType">
                            <a-radio-group v-model="alarmData.materialType" name="radioGroup" :disabled="isDisabled">
                                <a-radio :value="1">
                                    GD
                                </a-radio>
                                <a-radio :value="2">
                                   LEAK
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                        <div class="rescueData" v-if="this.alarmData.materialType == 1">
                            <div class="add-new-user">
                                <a-button type="dashed" style="width: 20%" @click="otherVisible = true" :disabled="isDisabled">
                                    <a-icon type="plus"/>
                                    添加GD种类
                                </a-button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a-button type="dashed" style="width: 20%" @click="otherListVisible = true">
                                    <a-icon type="menu"/>
                                    查看GD种类
                                </a-button>
                            </div>
                        </div>
                        <div class="noticeBaseData-item" v-if="this.alarmData.materialType == 1">
                            <a-form-model-item prop="hiAlarm">
                                <a-radio-group v-model="alarmData.hiAlarm" name="radioGroup" :disabled="isDisabled">
                                    <a-radio :value="1">
                                        HI Alarm
                                    </a-radio>
                                    <a-radio :value="2">
                                         HIHI Alarm  
                                    </a-radio>
                                </a-radio-group>
                            </a-form-model-item>
                        </div>
                        <div class="noticeBaseData-item" v-if="this.alarmData.materialType == 2">
                            <div class="desc" style="margin-bottom: 24px;">*柱位：</div>
                            <div class="value" >
                                <a-form-model-item prop="columnA">
                                    <a-input v-model="alarmData.columnA" :disabled="isDisabled"></a-input>
                                </a-form-model-item>
                            </div>
                        </div>
                    </template>
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
                title="添加GD种类"
                :visible="otherVisible"
                @ok="handleConfirmOther"
                @cancel="otherVisible = false">
            <div class="confirm-person">
                <div class="box" style="margin-bottom: 15px"><span class="left">机台编号: </span>
                    <div class="right">
                        <a-input allowClear v-model="otherObj.machineNumber" placeholder="请输入机台编号"/>
                    </div>
                </div>
                <div class="box" style="margin-bottom: 15px"><span class="left">GD种类: </span>
                    <div class="right">
                        <a-input allowClear v-model="otherObj.gdType" placeholder="请输入GD种类"/>
                    </div>
                </div>
                <div class="box"><span class="left">GD读值：</span>
                    <div class="right">
                        <a-input allowClear v-model="otherObj.readValue" placeholder="请输入GD读值"/>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="查看GD种类"
                :visible="otherListVisible"
                @ok="otherListVisible = false"
                @cancel="otherListVisible = false">
            <a-table bordered :data-source="otherList" :rowKey="(record,index)=>{return index}"
                     :key="otherList.machineNumber"
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
                valueFormat: "YYYY-MM-DD HH:mm:ss",
                smokeVisible: false,        //烟感设备信息添加
                smokeListVisible: false,
                isDisabled:false,
                seeDisabled:false,
                smokeObj: {
                    columnss: '',
                    deviceCode: '',
                },
                smokeList: [],
                positionList: [],
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
                foukId: null,
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
                    machineNumber: '',
                    gdType: '',
                    readValue: '',
                },
                otherList: [],
                otherColumns: [
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

                alarmData: {
                    alarmDate: '',
                    position: '',
                    alarmType1: false,
                    alarmType2: false,
                    alarmType3: false,
                    materialType: '',
                    hiAlarm: '',
                    columnA: '',
                },
                rules: {
                    alarmDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    position: [{required: true, message: '请输入位置', trigger: 'blur'}],
                    alarmType: [{type: 'array', required: true, message: '请选择Alarm类型', trigger: 'change'}],
                    materialType: [{required: true, message: '请选择物质类型', trigger: 'blur'}],
                    hiAlarm: [{required: true, message: '请选择', trigger: 'blur'}],
                    columnA: [{required: true, message: '请选择', trigger: 'blur'}],
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
                            machineList:this.otherList,
                            materialType: this.alarmData.materialType,
                            hiAlarm: this.alarmData.hiAlarm,
                            columnA: this.alarmData.columnA,
                        }
                        this.$http.post3('/chemSystemAlarm/executeProcess', data).then(res => {
                            if (res.data.code === 1) {
                                let data = {
                                    processInstanceId:this.processInstanceId
                                }
                                this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                                    for(let i of res.data.data){
                                        if(i.isFinish == '0'){
                                            this.$emit("changeComponent1Data", i.taskKey,res.data.data)
                                            this.$store.commit('setShowUser',false)
                                            console.log('222',$store.state.showUser);
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
                    processInstanceId: this.processInstanceId,
                    alarmTime: this.alarmData.alarmDate,
                    regionalLocation: this.alarmData.position,
                    machineList:this.otherList,
                    hiAlarm: this.alarmData.hiAlarm,
                    columnA: this.alarmData.columnA,
                    materialType: this.alarmData.materialType,
                }
                this.$http.post3('/chemSystemAlarm/saveOrUpdate', data).then(res => {
                })
            },
            //回显测试
            viewData() {
                this.$http.get3('/chemSystemAlarm/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    if (res.data.data){
                        let tempData = res.data.data;
                        if(tempData && tempData.id){
                            this.foukId = tempData.id
                        }
                        this.alarmData = {
                            alarmDate: tempData.alarmTime,
                            position: tempData.regionalLocation,
                            materialType:Number(tempData.materialType),
                            hiAlarm:Number(tempData.hiAlarm),
                            columnA:Number(tempData.columnA),
                        }
                        this.otherList = tempData.machineList
                        let data = {
                            processInstanceId:this.processInstanceId
                        }
                        this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                            for(let i of res.data.data){
                                if(i.isFinish == '1' && i.taskKey =='systemAlarm' ){
                                    this.isDisabled = true
                                }
                                if(i.isFinish == '1' && i.taskKey =='systemAlarm' ){
                                    this.seeDisabled = true
                                }
                            }
                        })
                    }
                })
                this.$http.get3('/chem/disposal/process/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    if(res.data.data){
                        localStorage.setItem('seeLeak',res.data.data.divulgeType)
                    }
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
                if (this.otherObj.machineNumber) {
                    this.otherList.push({
                        machineNumber: this.otherObj.machineNumber,
                        gdType: this.otherObj.gdType,
                        readValue: this.otherObj.readValue,
                    })
                    this.otherVisible = false
                } else {
                    this.$message('error', '机台编号不能为空')
                }
            },
            // 获取区域位置列表
			gitConfirmList() {
				let data = {
					dictNo: 'emergency_regional_location'
				}
				this.$http.get3("/sys/dict/item",data).then((res) => {
					this.positionList = res.data.data;
				});
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
            this.gitConfirmList()
        }
    }
</script>

<style lang="stylus" scoped>
    .systemAlarm
        // border 1px solid #2c3e50
        padding 10px
        // margin 20px
        width calc(100% - 40px)
        height 780px
        text-align left

        .noticeDepart
            display flex

            .noticeDepartItem
                width 40%
                display flex
        .noticeBaseData-item
            display flex
            align-items center

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