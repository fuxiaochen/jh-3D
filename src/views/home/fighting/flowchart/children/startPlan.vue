<template>
    <div class="startPlan">
        <h2><b>0.启动预案</b></h2>
        <template>
            <a-form-model
                    ref="dynamicValidateForm"
                    :model="noticeData"
                    :rules="rules"
            >
                <h3>火灾报警</h3>
                    <a-row :gutter="2">
                        <a-col class="gutter-row" :span="10">
                            <div class="gutter-box">
                                <div class="noticeBaseData-item">
                                    <div class="value">
                                        <a-form-model-item prop="fireSmall">
                                            <a-radio-group v-model="noticeData.fireSmall" :disabled="isDisabled">
                                                <a-radio :value="1">
                                                    人员通报 
                                                </a-radio>
                                                <a-radio :value="2">
                                                    系统Alarm
                                                </a-radio>
                                            </a-radio-group>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row>

                <div class="submit-btn">
                    <a-button type="primary" html-type="submit" @click="eventAdd()" :disabled="isDisabled">
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
        name: "startPlan",
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
                    monitorCallTime: null,    //调阅监控时间
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
            eventAdd(){
                let data ={
                    processInstanceId:this.processInstanceId,
                    type: this.noticeData.fireSmall
                }
                this.$http.post3('/fire/disposal/process/excuteProcess', data).then(res => {
                    if (res.data.code === 1) {
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
                        this.$router.push('/contingencyManage/event/flow')
                        
                    }
                })
            },
            saveData(){
                let data = {
                    processInstanceId: this.processInstanceId,
                    type: this.noticeData.fireSmall
                }
                this.$http.post3('/fire/disposal/process/saveOrUpdate', data).then(res => {
                })
            },
            //回显测试
            viewData() {
                this.$http.get3('/fire/disposal/process/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    let tempData = res.data.data;
                    this.noticeData.fireSmall = Number(tempData.type)
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='startPlan'){
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
    .startPlan
        
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
                    height 40px
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
                    margin-top 50px

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
    .startPlan
        .ant-select
            width 100%

        .ant-calendar-picker-input
            width: calc(100% - 30px);

        .ant-calendar-picker-icon
            display none !important
</style>