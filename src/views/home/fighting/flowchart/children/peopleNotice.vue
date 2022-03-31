<template>
    <div class="peopleNotice">
        <h2><b>1.人员通报</b></h2>
        <template>
            <a-form-model
                    ref="dynamicValidateForm"
                    :model="noticeData"
                    :rules="rules"
            >
                <h3>1.1通报人信息</h3>
                <div class="noticeBaseData">
                    <a-row :gutter="2">
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">部门/承揽商：</div>
                                    <div class="value">
                                        <a-form-model-item prop="dept">
                                            <a-input v-model="noticeData.dept" :disabled="isDisabled"></a-input>
                                            <!-- <a-select
                                                    v-model:value="noticeData.dept"
                                                    @change="handleDepartment" :disabled="isDisabled">
                                                <a-select-option
                                                        v-for="item in departmentList"
                                                        :value="item.name"
                                                        :key="item.id"
                                                >{{item.name}}
                                                </a-select-option>
                                            </a-select> -->
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">通报人：</div>
                                    <div class="value">
                                        <a-form-model-item prop="notifier">
                                            <a-input v-model="noticeData.notifier" :disabled="isDisabled"></a-input>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">联系电话：</div>
                                    <div class="value">
                                        <a-form-model-item prop="contactNumber">
                                            <a-input v-model="noticeData.contactNumber" :disabled="isDisabled"></a-input>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="2">
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">通报时间：</div>
                                    <div class="value">
                                        <a-form-model-item prop="notifyTime">
                                            <a-date-picker show-time v-model="noticeData.notifyTime" placeholder="时间选择"
                                                           @change="onChangeNotifyTime" @ok="onOk" :disabled="isDisabled"/>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>

                <h3>1.2通报状况</h3>
                <div class="noticeBaseData">
                    <a-row :gutter="2">
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">区域位置：</div>
                                    <div class="value">
                                        <a-form-model-item prop="regionLocation">
                                            <a-select
                                                    v-model:value="noticeData.regionLocation"
                                                    @change="handleDepartment"
                                                    placeholder="请选择" :disabled="isDisabled"
                                            >
                                                <a-select-option
                                                        v-for="item in positionList"
                                                        :value="item.dictItemTxt"
                                                        :key="item.id"
                                                >{{item.dictItemTxt}}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">机台编号：</div>
                                    <div class="value">
                                        <a-form-model-item prop="machineNumber">
                                            <a-input v-model="noticeData.machineNumber" :disabled="isDisabled"></a-input>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">柱位：</div>
                                    <div class="value">
                                        <a-form-model-item prop="columnA">
                                            <a-input v-model="noticeData.columnA" :disabled="isDisabled"></a-input>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="2">
                        <a-col class="gutter-row" :span="8">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">燃烧物质：</div>
                                    <div class="value">
                                        <a-form-model-item prop="burningMaterial">
                                            <a-input v-model="noticeData.burningMaterial" :disabled="isDisabled"></a-input>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                        </a-row>
                        <a-row :gutter="2">
                        <a-col class="gutter-row" :span="10">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="desc">火势情况：</div>
                                    <div class="value">
                                        <a-form-model-item prop="fireSmall">
                                            <a-radio-group v-model="noticeData.fireSmall" @change="onChangeFireSmall" :disabled="isDisabled || seeDisabled">
                                                <a-radio :value="1">
                                                    火势小，单人单支手提式灭火器可扑灭，监控中心提醒通报人执行初期灭火
                                                </a-radio>
                                                <a-radio :value="2">
                                                    火势大，非单人单支手提式灭火器可扑灭
                                                </a-radio>
                                            </a-radio-group>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="2">
                        <div class="fireSmall" v-if="this.noticeData.fireSmall === 1">
                                <div class="gutter-box">
                                    <div class="noticeBaseData-item">
                                        <div class="result">
                                            <a-form-model-item prop="outfireSuccess">
                                                <a-radio-group class="result-select" v-model="noticeData.outFireWay"
                                                            @change="onChangeFireSuccess" :disabled="isDisabled||seeDisabled">
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
                                </div>
                        </div>
                        <div class="fireSmall" v-if="this.noticeData.fireSmall === 2">
                            <div class="result">
                                <h4 style="margin-left: 0">监控中心提醒通报人进行临时管制</h4>
                            </div>
                        </div>
                    </a-row>
                </div>


                <div v-if="noticeData.fireSmall === 2 || noticeData.outfireSuccess === 2">
                    <h3>1.3人员受伤情况</h3>
                    <div class="noticeBaseData">
                        <a-row :gutter="2">
                            <a-col class="gutter-row" :span="10">
                                <div class="gutter-box">
                                    <div class="noticeBaseData-item" style="margin-bottom: 10px">
                                        <div class="desc">受伤详情：</div>
                                        <div class="value">
                                            <a-form-model-item prop="injuries">
                                                <a-radio-group v-model="noticeData.injuries" @change="woundedPerson" :disabled="isDisabled">
                                                    <a-radio :value="2">
                                                        不清楚
                                                    </a-radio>
                                                    <a-radio :value="0">
                                                        无
                                                    </a-radio>
                                                    <a-radio :value="1">
                                                        有
                                                    </a-radio>
                                                </a-radio-group>
                                            </a-form-model-item>
                                        </div>
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                        <div class="woundedPerson" v-if="noticeData.injuries === 1">
                            <div class="add-new-user">
                                <a-button type="dashed" style="width: 20%" @click="injuriesPersonVisible = true" :disabled="isDisabled">
                                    <a-icon type="plus"/>
                                    添加受伤人员信息
                                </a-button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a-button type="dashed" style="width: 20%" @click="injuriesPersonList = true">
                                    <a-icon type="menu"/>
                                    查看受伤人员列表
                                </a-button>
                            </div>
                        </div>
                    </div>

                    <!-- <h3>1.4监控中心通知ERC值班前往现场协助</h3>
                    <div class="noticeBaseData">
                        <div class="add-new-user">
                            <a-button type="dashed" style="width: 20%" @click="ercPersonVisible = true" :disabled="isDisabled">
                                <a-icon type="plus"/>
                                添加ERC协助成员
                            </a-button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a-button type="dashed" style="width: 20%" @click="ercPersonList = true">
                                <a-icon type="menu"/>
                                查看ERC协助成员
                            </a-button>
                        </div>
                    </div>
                    <h3>1.5监控中心调阅现场CCTV</h3>
                    <div class="noticeBaseData">
                        <a-row :gutter="2">
                            <a-col class="gutter-row" :span="8">
                                <div class="gutter-box">
                                    <div class="noticeBaseData-item">
                                        <div class="desc">时间：</div>
                                        <div class="value">
                                            <a-form-model-item prop="monitorCallTime">
                                                <a-date-picker show-time v-model="noticeData.monitorCallTime"
                                                               placeholder="时间选择" :disabled="isDisabled"
                                                               @change="onChangeMonitorCallTime" @ok="onOk"/>
                                            </a-form-model-item>
                                        </div>
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                        <div class="monitorSituation" style="text-align: left">
                            <a-form-model-item prop="monitorSituation">
                                <a-radio-group v-model="noticeData.monitorSituation" @change="woundedPerson" :disabled="isDisabled ||seeDisabled">
                                    <a-radio :style="radioStyle" :value="1">
                                        无火势/火势已灭，若未联动，则监控中心须将火警主机切换为手动状态。
                                    </a-radio>
                                    <a-radio :style="radioStyle" :value="2">
                                        火势很大，非单人单支手提式灭火器可扑灭。
                                    </a-radio>
                                    <a-radio :style="radioStyle" :value="3">
                                        看不到现场情况。
                                    </a-radio>
                                </a-radio-group>
                            </a-form-model-item>
                        </div>
                    </div> -->
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
                title="添加受伤人员信息"
                :visible="injuriesPersonVisible"
                @ok="handleConfirmPersonInjuries"
                @cancel="injuriesPersonVisible = false">
            <div class="confirm-person">
                <div class="box" style="margin-bottom: 15px"><span class="left">部门/承揽商：</span>
                    <div class="right">
                         <a-input v-model="injuriesObj.dept" :disabled="isDisabled"></a-input>
                        <!-- <a-select
                                v-model="injuriesObj.dept"
                                @change="handleDepartment"
                        >
                            <a-select-option
                                    v-for="item in departmentList"
                                    :value="item.name"
                                    :key="item.id"
                            >{{item.name}}
                            </a-select-option>
                        </a-select> -->
                    </div>
                </div>
                <div class="box" style="margin-bottom: 15px"><span class="left">姓名: </span>
                    <div class="right">
                        <a-input allowClear v-model="injuriesObj.userName" placeholder="请输入分机号码"/>
                    </div>
                </div>
                <div class="box"><span class="left">受伤情况：</span>
                    <div class="right">
                        <a-input allowClear v-model="injuriesObj.injuries" placeholder="请输入受伤情况"/>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="确认人信息列表"
                :visible="injuriesPersonList"
                @ok="injuriesPersonList = false"
                @cancel="injuriesPersonList = false">
            <a-table bordered :data-source="injuriesList" :rowKey="(record,index)=>{return index}"
                     :key="injuriesList.userName" :columns="injuriesColumns"></a-table>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: "peopleNotice",
        data() {
            return {
                checked:false,
                isDisabled: true,
                injuriesPersonVisible: false,  //添加受伤人员
                injuriesPersonList: false,
                injuriesObj: {
                    dept: '',
                    userName: '',
                    injuries: ''
                },
                injuriesList: [],
                injuriesColumns: [
                    {
                        title: '部门/承揽商',
                        dataIndex: 'dept',
                    },
                    {
                        title: '姓名',
                        dataIndex: 'userName',
                    },
                    {
                        title: '受伤详情',
                        dataIndex: 'injuries',
                    },
                ],

                ercPersonVisible: false,         //添加ERC协助成员
                ercPersonList: false,
                ercObj: {
                    userName: '',
                    ext: '',
                    discoveryTime: ''
                },
                ercList: [],
                ercColumns: [
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
                    },
                ],

                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },

                noticeData: {
                    fireSelect: '',               //自定义火势大小选取
                    result: '',               //自定义火势大小选取
                    resultSelect: '',             //自定义灭火成功/失败选择
                    processInstanceId: '',       //流程实例ID
                    dept: '',                  //部门
                    notifier: '',              //通报人
                    contactNumber: '',         //联系方式
                    notifyTime: null,          //通报时间
                    regionLocation: '',        //区域位置
                    machineNumber: undefined,         //机台编号
                    columnA: undefined,               //柱位
                    burningMaterial: undefined,       //燃烧物质
                    fireSmall: '',              //小
                    fireBig: '',                //火势大
                    monitorCenterRemind: false,  //监控中心提醒
                    outfireSuccess: '',         //灭火成功
                    outfireSuccessTime: null,  //灭火成功时间
                    outfireFail: '',            //灭火失败
                    outfireFailTime: null,     //灭火失败时间
                    outfireFailCause: '',      //灭火失败原因
                    fireSmallControler: '',    //火势小管制人
                    fireBigControler: '',      //火势大管制人
                    injuries: '',              //受伤情况   无-0，有-1，不清楚-2
                    woundedPersonList: [],     //人员受伤情况列表
                    ercDutyPersonList: [],       //ERC协助人员列表
                    monitorCallTime: null,    //调阅监控时间+
                    outFireWay: null,    //灭火方式
                    monitorSituation: '',
                },
                rules: {
                    dept: [{required: true, message: '请选择承揽商', trigger: 'blur'}],
                    notifier: [{required: true, message: '请输入通报人', trigger: 'blur'}],
                    contactNumber: [{required: true, message: '请输入联系方式', trigger: 'blur'}],
                    notifyTime: [{required: true, message: '请选择通报时间', trigger: 'change'}],
                    regionLocation: [{required: true, message: '请选择区域位置', trigger: 'blur'}],
                    // machineNumber:[{ required: true, message: '请选择机台编号', trigger: 'blur' }],
                    // columnA:[{ required: true, message: '请选择柱位', trigger: 'blur' }],
                    // burningMaterial:[{ required: true, message: '请选择燃烧物质', trigger: 'blur' }],
                    fireSmall: [{required: true, message: '请选择火势大小', trigger: 'blur'}],
                    // fireSelect: [{required: true, message: '请选择火势大小', trigger: 'blur'}],
                    monitorCenterRemind: [{required: true, message: '请勾选', trigger: 'blur'}],
                    // resultSelect: [{required: true, message: '请选择灭火结果', trigger: 'blur'}],
                    outfireSuccess: [{required: true, message: '请选择灭火结果', trigger: 'blur'}],
                    outfireSuccessTime: [{required: true, message: '请选择灭火成功时间', trigger: 'change'}],
                    outfireFailTime: [{required: true, message: '请选择灭火失败时间', trigger: 'blur'}],
                    outfireFailCause: [{required: true, message: '请选择灭火失败原因', trigger: 'blur'}],
                    fireBigControler: [{required: true, message: '请填写火势大管制人', trigger: 'blur'}],
                    fireSmallControler: [{required: true, message: '请填写火势大管制人', trigger: 'blur'}],
                    injuries: [{required: true, message: '请选择受伤情况', trigger: 'blur'}],
                    monitorCallTime: [{required: true, message: '请选择查看监控时间', trigger: 'change'}],
                    monitorSituation: [{required: true, message: '请选择查看监控情况', trigger: 'blur'}],
                    result: [{required: true, message: '请选择', trigger: 'blur'}],
                },
                departmentList: [
                    {
                        id: 1,
                        name: '研发部',
                    },
                    {
                        id: 2,
                        name: '市场部',
                    }
                ],
                positionList: [
                    {
                        id: 1,
                        name: 'OB_F1',
                    },
                    {
                        id: 2,
                        name: 'OB_F2',
                    }
                ],
                jitaibianhaoList: [
                    {
                        id: 1,
                        name: '不清楚',
                        value: '',
                    },
                    {
                        id: 2,
                        name: '机台编号1',
                        value: '机台编号1',
                    },
                    {
                        id: 3,
                        name: '机台编号2',
                        value: '机台编号2',
                    },
                ],
                zhuweiList: [
                    {
                        id: 1,
                        name: '不清楚',
                        value: '',
                    },
                    {
                        id: 2,
                        name: '柱位1',
                        value: '柱位1',
                    },
                    {
                        id: 3,
                        name: '柱位2',
                        value: '柱位2',
                    },
                ],
                ranshaoList: [
                    {
                        id: 1,
                        name: '不清楚',
                        value: '',
                    },
                    {
                        id: 2,
                        name: '物质1',
                        value: '物质1',
                    },
                    {
                        id: 3,
                        name: '物质2',
                        value: '物质2',
                    },
                ],
                processInstanceId:localStorage.getItem('processInstanceId')
            }
        },
        methods: {
            //添加受伤人员列表
            handleConfirmPersonInjuries() {
                if (this.injuriesObj.userName) {
                    this.injuriesList.push({
                        dept: this.injuriesObj.dept,
                        userName: this.injuriesObj.userName,
                        injuries: this.injuriesObj.injuries
                    })
                    this.injuriesPersonVisible = false
                } else {
                    this.$message('error', '确认人姓名不能为空！')
                }
            },

            //添加ERC协助成员列表
            handleConfirmPersonErc() {
                if (this.ercObj.userName) {
                    this.ercList.push({
                        userName: this.ercObj.userName,
                        ext: this.ercObj.ext,
                        discoveryTime: this.ercObj.discoveryTime
                    })
                    this.ercPersonVisible = false
                } else {
                    this.$message('error', '确认人姓名不能为空！')
                }
            },

            //添加ERC协助成员时间
            ercPersonChange(value, dateString) {
                this.ercObj.discoveryTime = dateString
            },

            //火势大小选择
            onChangeFireSmall(e) {
                this.noticeData.fireSmall = e.target.value
                // this.noticeData.resultSelect = 0;
                // //重置操作
                // this.noticeData.fireSmall = 0;
                // this.noticeData.fireBig = 0;
                // if (e.target.value === 1) {
                //     this.noticeData.fireSmall = 1
                // } else if (e.target.value === 2) {
                //     this.noticeData.fireBig = 1
                // }
            },

            //火势成功失败选择
            onChangeFireSuccess(e) {
                this.noticeData.outfireSuccess = e.target.value
                //重置操作
                // this.noticeData.outfireSuccess = 0
                // this.noticeData.outfireFail = 0
                // if (e.target.value === 1) {
                //     this.noticeData.outfireSuccess = 1
                // } else if (e.target.value === 2) {
                //     this.noticeData.outfireFail = 1
                // }
            },
             //灭火方式选择
            onChangeFireSuccess(e) {
                this.noticeData.outFireWay = e.target.value
            },
            //回显测试
            viewData() {
                this.$http.get3('/fire/person/report/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    let tempData = res.data.data;
                    // if(res.data.data){
                    //     let peopledata = "1.1通报人:" + tempData.notifier + "部门/承揽商：" + tempData.dept
                    //     + "联系电话：" + tempData.contactNumber + "通报时间：" + tempData.notifyTime + "\n" +
                    //     "1.2通报状况:" + "区域位置：" + tempData.regionLocation+ "机台编号：" + tempData.machineNumber + 
                    //     "柱位：" + tempData.columnA
                    //     this.$store.commit("setProcessPeople",peopledata)
                    // }
                    this.noticeData = {
                        dept: tempData.dept,
                        notifier: tempData.notifier,
                        contactNumber: tempData.contactNumber,
                        notifyTime: tempData.notifyTime,
                        regionLocation: tempData.regionLocation,
                        machineNumber: tempData.machineNumber,
                        columnA: tempData.columnA,
                        burningMaterial: tempData.burningMaterial,
                        fireSmall: Number(tempData.fireSmall),
                        outFireWay: Number(tempData.outFireWay),
                        outfireSuccess: Number(tempData.outfireSuccess),
                        monitorCenterRemind: eval(tempData.monitorCenterRemind),
                        injuries: Number(tempData.injuries),
                        injuriesList: tempData.woundedPersonList,
                    }
                    this.injuriesList = tempData.woundedPersonList
                    this.ercList = tempData.ercDutyPersonList
					let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='userAlarm'){
                                this.isDisabled = true
                            }
                        }
                    })
                })
            },

            //通报时间选择
            onChangeNotifyTime(value, dateString) {
                this.noticeData.notifyTime = dateString
            },
            //成功时间选择
            onChangeSuccessTime(value, dateString) {
                this.noticeData.outfireSuccessTime = dateString
            },
            //失败时间选择
            onChangeOutfireFailTime(value, dateString) {
                this.noticeData.outfireFailTime = dateString
            },
            //调阅监控时间选择
            onChangeMonitorCallTime(value, dateString) {
                this.noticeData.monitorCallTime = dateString
            },
            //时间选择
            onOk(value) {
            },

            //受伤情况
            woundedPerson() {
            },
            //火势提示
            onChangeFireSelect(e) {
            },
            //通报人选择部门等
            handleDepartment() {
            },
        },
        mounted(){
            this.viewData()
        }
    }
</script>

<style lang="stylus" scoped>
    .peopleNotice
        
        padding 10px
        width 100%
        height 800px
        overflow-y: auto;
        text-align left

        h3
            text-align left

        .noticeBaseData
            padding 0 0 0 23px

            .gutter-box
                margin 5px 0

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

        .fireSmall
            margin 10px 0
            width 780px
            background-color #F8F8F8

            .result
                text-align left
                margin-left 5px

                .result-select
                    margin-bottom 20px 

                h4
                    margin-left 28px
                    font-weight 500

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
    .peopleNotice
        .ant-select
            width 100%

        .ant-calendar-picker-input
            width: 100%;

</style>