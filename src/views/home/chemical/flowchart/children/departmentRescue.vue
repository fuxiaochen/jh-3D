<template>
    <div class="departmentRescue">
        <h2><b>8.部门ERT抢救</b></h2>
        <template>
            <a-form-model
                ref="dynamicValidateForm"
                :model="rescueData"
                :rules="rules"
            >
                <p><b>8.1管制组现场管制，并划分冷暖热区</b></p>
                <p class="padding-left-40"><span class="star">*</span>现场环境持续侦测</p>
                <div class="rescueData padding-left-40">
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 40%" @click="environmentVisible = true" :disabled="isDisabled">
                            <a-icon type="plus"/>
                            添加环境持续检测
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 40%" @click="environmentListVisible = true">
                            <a-icon type="menu"/>
                            查看环境持续检测
                        </a-button>
                    </div>
                </div>

                <p class="padding-left-40"><span class="star">*</span>根据现场环境情况时刻调整冷暖热区划分</p>
                <div class="rescueData padding-left-40">
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 40%" @click="coldWarmVisible = true" :disabled="isDisabled">
                            <a-icon type="plus"/>
                            调整冷暖热区划分
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 40%" @click="coldWarmListVisible = true">
                            <a-icon type="menu"/>
                            查看冷暖热区划分
                        </a-button>
                        <div class="record">
                            <a-form-model-item label="记录栏" prop="coldRecord">
                                <a-input v-model="rescueData.coldRecord" :disabled="isDisabled"/>
                            </a-form-model-item>
                        </div>

                    </div>
                </div>

	            <p><b>8.2支援组支援器材</b></p>
	            <div class="support-group">
		            <a-form-model-item prop="supportTime">
			            <div class="item">
				            <p><span><span class="star">*</span>器材支援到位时间：</span></p>
				            <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.supportTime" @change="supportTimeChange" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
		            <a-form-model-item prop="supportRemark">
			            <div class="item">
				            <p><span>记录栏：</span></p>
				            <a-input style="width:200px" v-model="rescueData.supportRemark" placeholder="记录" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
	            </div>

	            <p><b>8.3抢救组进行着装</b></p>
	            <div class="support-group">
		            <a-form-model-item prop="clothesTime">
			            <div class="item">
				            <p><span><span class="star">*</span>着装完成时间：</span></p>
				            <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.clothesTime" @change="clothesTimeChange" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
		            <a-form-model-item prop="clothesRemark">
			            <div class="item">
				            <p><span>记录栏：</span></p>
				            <a-input style="width:200px" v-model="rescueData.clothesRemark" placeholder="记录" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
	            </div>

	            <p><b>8.4除污组架设除污站</b></p>
	            <div class="support-group">
		            <a-form-model-item prop="cleanTime">
			            <div class="item">
				            <p><span><span class="star">*</span>除污站架设完成时间：</span></p>
				            <a-date-picker :valueFormat="valueFormat" style="width:200px" v-model="rescueData.cleanTime" show-time @change="cleanTimeChange" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
		            <a-form-model-item prop="cleanRemark">
			            <div class="item">
				            <p><span>记录栏：</span></p>
				            <a-input style="width:200px" v-model="rescueData.cleanRemark" placeholder="记录" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
	            </div>

	            <p><b>8.5急救组架设急救站</b></p>
	            <div class="support-group">
		            <a-form-model-item prop="rescueTime">
			            <div class="item">
				            <p><span><span class="star">*</span>急救站架设完成时间：</span></p>
				            <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.rescueTime" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
		            <a-form-model-item prop="rescueRemark">
			            <div class="item">
				            <p><span>记录栏：</span></p>
				            <a-input style="width:200px" v-model="rescueData.rescueRemark" placeholder="记录" :disabled="isDisabled"/>
			            </div>
		            </a-form-model-item>
	            </div>

	            <p><b>8.6抢救组进入事故现场止漏</b></p>
	            <div class="big-fire" style="margin-left: -40px">
		            <div class="add-new-user">
			            <a-button type="dashed" style="width: 20%" @click="rescueGroup = true" :disabled="isDisabled">
				            <a-icon type="plus" /> 添加事故抢救组
			            </a-button>
			            &nbsp;&nbsp;&nbsp;&nbsp;
			            <a-button type="dashed" style="width: 20%" @click="rescueGroupShow = true">
				            <a-icon type="menu" /> 查看事故抢救组
			            </a-button>
		            </div>
	            </div>
                <div class="content" style="padding-left: 40px">
                    <a-form-model-item  prop="isSeepageSuccess">
                        <a-radio-group v-model="rescueData.isSeepageSuccess"  :disabled="isDisabled||seeDisabled">
                            <a-radio :value="1">
                                止漏成功
                            </a-radio>
                            <a-radio :value="0">
                                止漏失败
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </div>
	            <div class="rescue-method" v-if="rescueData.isSeepageSuccess == 1">
                    <div class="item" style="margin-bottom:10px">
                        <span><span class="star">*</span>时间：</span>
                        <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.seepageSuccessTime" :disabled="isDisabled"/>
                    </div>
		            <p> *止漏成功回报监控中心</p>
                    <p v-if="!showUser"> *用吸液棉进行围堵/用吸酸车处理</p>
		            <p v-if="showUser"> *通知厂务加大排风换气</p>
		            <p> *撤至除污站进行除污，再到急救站进行健康评估</p>
                    <div class="item" style="margin-bottom:10px">
                        <span><span class="star">*</span>发送部门ERT止漏成功简讯（前提是有发初期应变止漏失败简讯），时间:</span>
                        <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.successMsgTime" :disabled="isDisabled"/>
                    </div>
		            <p> *除污组除污</p>
                    <div class="selectDetail">
                        <div class="support-group">
                            <a-form-model-item prop="rescueTime">
                                <div class="item">
                                    <span><span class="star">*</span> 抢救组完成除污,时间：</span>
                                    <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.rescueFinishedDescaleTime" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                            <a-form-model-item prop="rescueRemark">
                                <div class="item">
                                    <span>记录栏：</span>
                                    <a-input style="width:200px" v-model="rescueData.rescueFinishedDescaleRecordBar" placeholder="记录" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                        </div>
                    </div>

                    <div class="selectDetail">
                        <div class="support-group" >
                           <a-form-model-item prop="rescueTime">
                                <div class="item">
                                    <p><span><span class="star">*</span> 现场完成除污,时间：</span></p>
                                    <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.sceneFinishedDescaleTime" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                            <a-form-model-item prop="rescueRemark">
                                <div class="item">
                                    <p><span>记录栏：</span></p>
                                    <a-input style="width:200px" v-model="rescueData.sceneFinishedDescaleRecordBar" placeholder="记录" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                        </div>
                    </div>

                    <div class="selectDetail">
                        <div class="support-group">
                           <a-form-model-item prop="rescueTime">
                                <div class="item">
                                    <p><span><span class="star">*</span> 自身完成除污,时间：</span></p>
                                    <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.selfFinishedDescaleTime" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                            <a-form-model-item prop="rescueRemark">
                                <div class="item">
                                    <p><span>记录栏：</span></p>
                                    <a-input style="width:200px" v-model="rescueData.selfFinishedDescaleRecordBar" placeholder="记录" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                        </div>
                    </div>
		            <p> *急救组健康评估</p>
                    <div class="selectDetail">
                        <div class="support-group" >
                             <a-form-model-item prop="rescueTime">
                                <div class="item">
                                    <p><span><span class="star">*</span> 抢救组完成健康评估,时间：</span></p>
                                    <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.rescueFinishedHeathTime" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                            <a-form-model-item prop="rescueRemark">
                                <div class="item">
                                    <p><span>记录栏：</span></p>
                                    <a-input style="width:200px" v-model="rescueData.rescueFinishedHeathRecordBar" placeholder="记录" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                        </div>
                    </div>

                    <div class="selectDetail">
                        <div class="support-group" >
                             <a-form-model-item prop="rescueTime">
                                <div class="item">
                                    <p><span><span class="star">*</span> 其余参与人员完成健康评估,时间：</span></p>
                                    <a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.otherFinishedHeathTime" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                            <a-form-model-item prop="rescueRemark">
                                <div class="item">
                                    <p><span>记录栏：</span></p>
                                    <a-input style="width:200px" v-model="rescueData.otherFinishedHeathRecordBar" placeholder="记录" :disabled="isDisabled"/>
                                </div>
                            </a-form-model-item>
                        </div>
                    </div>
	            </div>


	            <div v-if="rescueData.isSeepageSuccess === 0" class="stop-fire-failed padding-left-40">
		            <div class="reason-time">
			            <a-form-model-item prop="seepageFailTime">
				            <span>时间：<a-date-picker :valueFormat="valueFormat" style="width:200px" show-time v-model="rescueData.seepageFailTime" :disabled="isDisabled"/></span>
			            </a-form-model-item>
			            <a-form-model-item prop="seepageFailReason">
				            <span>原因：<a-input style="width:800px"  v-model="rescueData.seepageFailReason" placeholder="请输入原因" :disabled="isDisabled"/></span>
			            </a-form-model-item>
                        <span class="star">*</span>止漏失败回报监控中心
                        <a-form-model-item prop="failMsgTime">
                            <span class="star">*</span>发送部门ERT止漏失败简讯（前提是有发初期应变止漏失败简讯），时间：<a-date-picker :valueFormat="valueFormat"  v-model="rescueData.failMsgTime"  style="width:200px" show-time :disabled="isDisabled"/>
                            
                            <a href="http://nhoaaps01.chn.nexchip/AlarmSystem/Login.aspx#" title="发送简讯"  target="_blank" :disabled="isDisabled" style="padding-left:20px">发送简讯</a>
                        </a-form-model-item>
		            </div>
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
            title="添加环境持续检测"
            :visible="environmentVisible"
            @ok="handleConfirmEnvironment"
            @cancel="environmentVisible = false">
            <div class="confirm-person">
                <div class="box" style="margin-bottom: 15px"><span class="left">时间：</span>
                    <div class="right">
                        <a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="environmentObj.ppm" @change="environmentChange"/>
                    </div>
                </div>
                <div class="box" style="margin-bottom: 15px"><span class="left">GD种类: </span>
                    <div class="right">
                        <a-input v-model="environmentObj.gdType" :disabled="isDisabled"></a-input>
                        <!-- <a-select
                                v-model="environmentObj.gdType"
                                style="width:100%"
                                placeholder="请选择应GD种类"
                        >
                            <a-select-option
                                    v-for="item in departmentList"
                                    :value="item.dictItemTxt"
                                    :key="item.id"
                            >{{item.dictItemTxt}}
                            </a-select-option>
                        </a-select> -->
                    </div>
                </div>
                <div class="box"><span class="left">读值(ppm)：</span>
                    <div class="right">
                        <a-input allowClear v-model="environmentObj.readValue" placeholder="请输入读值"/>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal
            :width="1000"
            class="control-person-modal"
            title="确认环境持续检测列表"
            :visible="environmentListVisible"
            @ok="environmentListVisible = false"
            @cancel="environmentListVisible = false">
            <a-table bordered :data-source="environmentList" :rowKey="(record,index)=>{return index}" :key="environmentList.gdType"
                     :columns="environmentColumns"></a-table>
        </a-modal>

        <a-modal
            destroyOnClose
            class="confirm-person-modal"
            title="添加调整冷暖热区划分"
            :visible="coldWarmVisible"
            @ok="handleConfirmColdWarm"
            @cancel="coldWarmVisible = false">
            <div class="confirm-person">
                <div class="box" style="margin-bottom: 15px"><span class="left">管制时间：</span>
                    <div class="right">
                        <a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="coldWarmObj.controlTime" @change="coldWarmChange"/>
                    </div>
                </div>
                <div class="box" style="margin-bottom: 15px"><span class="left">热区: </span>
                    <div class="right">
                        <a-input allowClear v-model="coldWarmObj.hotArea" placeholder="请输入GD"/>
                    </div>
                </div>
                <div class="box"><span class="left">暖区：</span>
                    <div class="right">
                        <a-input allowClear v-model="coldWarmObj.warmArea" placeholder="请输入读值"/>
                    </div>
                </div>
                <div class="box"><span class="left">冷区：</span>
                    <div class="right">
                        <a-input allowClear v-model="coldWarmObj.coldArea" placeholder="请输入读值"/>
                    </div>
                </div>
            </div>
        </a-modal>
        <a-modal
            :width="1000"
            class="control-person-modal"
            title="确认调整冷暖热区划分"
            :visible="coldWarmListVisible"
            @ok="coldWarmListVisible = false"
            @cancel="coldWarmListVisible = false">
            <a-table bordered :data-source="coldWarmList" :rowKey="(record,index)=>{return index}" :key="coldWarmList.controlTime"
                     :columns="coldWarmColumns"></a-table>
        </a-modal>

	    <a-modal
		    destroyOnClose
		    class="confirm-person-modal"
		    title="添加事故抢救组"
		    :visible="rescueGroup"
		    @ok="saveRescueGroupData"
		    @cancel="rescueGroup = false">
		    <div class="rescue-group">
			    <a-form-model-item label="抢救一组">
				    <a-input style="width:100%" v-model="addRescueGroup.rescueGroupNo" placeholder="抢救一组"/>
			    </a-form-model-item>
			    <a-form-model-item label="进入时间">
				    <a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="addRescueGroup.entryTime" @change="rescueGroupEnterChange" />
			    </a-form-model-item>
			    <a-form-model-item label="出来时间">
				    <a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="addRescueGroup.leaveTime" @change="rescueGroupLeaveChange" />
			    </a-form-model-item>
		    </div>
	    </a-modal>
	    <a-modal
		    :width="1000"
		    class="control-person-modal"
		    title="确认事故抢救组"
		    :visible="rescueGroupShow"
		    @ok="rescueGroupShow = false"
		    @cancel="rescueGroupShow = false">
		    <a-table bordered :data-source="rescueGroupList" :rowKey="(record,index)=>{return index}" :columns="rescueGroupColumns"></a-table>
	    </a-modal>

    </div>
</template>

<script>
	import moment from 'moment'
    export default {
        name: "departmentRescue",
        data(){
            return{
                valueFormat: "YYYY-MM-DD HH:mm:ss",
	            checkboxValue: [],
	            departmentList: [],
                isDisabled:false,      
                seeDisabled:false,     
                showUser:false,     
                foukId: null, 
                environmentVisible:false,       //环境持续检测
                environmentListVisible:false,
                environmentObj:{
                    ppm:'',
                    gdType:'',
                    readValue:''
                },
                environmentList:[],
                environmentColumns:[
                    {
                        title: '时间',
                        dataIndex: 'ppm',
                    },{
                        title: 'GD种类',
                        dataIndex: 'gdType',
                    },{
                        title: '读值(ppm)',
                        dataIndex: 'readValue',
                    },
                ],

                coldWarmVisible:false,      //冷热区划分
                coldWarmListVisible:false,
                coldWarmObj:{
                    controlTime:'',
                    hotArea:'',
                    warmArea:'',
                    coldArea:'',
                },
                coldWarmList:[],
                coldWarmColumns:[
                    {
                        title: '时间',
                        dataIndex: 'controlTime',
                    },{
                        title: '热区',
                        dataIndex: 'hotArea',
                    },{
                        title: '暖区',
                        dataIndex: 'warmArea',
                    },{
                        title: '冷区',
                        dataIndex: 'coldArea',
                    },
                ],

                rescueGroup:false,      //事故抢救组
                rescueGroupShow:false,
                addRescueGroup:{
                    rescueGroupNo:'',
                    entryTime:'',
                    leaveTime:''
                },
                rescueGroupList:[],
                rescueGroupColumns:[
                    {
                        title: '小组名称',
                        dataIndex: 'rescueGroupNo',
                    },
                    {
                        title: '进入时间',
                        dataIndex: 'entryTime',
                    },
                    {
                        title: '离开时间',
                        dataIndex: 'leaveTime',
                    },
                ],

                rescueData:{
                    coldRecord:'',
	                supportTime:'',
                    supportRemark:'',
	                clothesTime:'',
	                clothesRemark:'',
	                cleanTime:'',
	                cleanRemark:'',
	                rescueTime:'',
	                rescueRemark:'',
	                isSeepageSuccess:'',
	                seepageSuccessTime:'',
	                successMsgTime:'',
	                rescueFinishedDescaleTime:'',
	                rescueFinishedDescaleRecordBar:'',
	                sceneFinishedDescaleTime:'',
	                sceneFinishedDescaleRecordBar:'',
	                selfFinishedDescaleTime:'',
	                selfFinishedDescaleRecordBar:'',
	                rescueFinishedHeathTime:'',
	                rescueFinishedHeathRecordBar:'',
	                otherFinishedHeathTime:'',
	                otherFinishedHeathRecordBar:'',
	                seepageFailTime:'',
	                seepageFailReason:'',
	                failMsgTime:'',
	                //抢救措施：字段
                    savePerson:false,
	                saveTime:'',

                    closeGasSystem:false,
                    closeGasTime:'',

                    rescueMeasure:false,
                    rescueMeasureTime:'',


                    closeEquipment:false,
                    closeEquipmentTime:'',

                    removeDangerGoods:false,
                    removeTime:'',

                    outfire:false,
                    waterFire:false,
                    fireExtinguisher:false,
                    kitchenFire:false,

                    // 灭火失败
                    fireSuccess:'',
                    fireFailureTime:'',
                    fireFailureReason:'',

	                // 灭火成功的字段
	                fireSuccessTime:'',
	                exhaustTime:'',
	                newsFireSuccessTime:'',

	                rescuePollutionTime:'',
	                rescuePollutionBar:'',

	                scenePollutionTime:'',
	                scenePollutionBar:'',
                    
	                selfPollutionTime:'',
	                selfPollutionBar:'',
                    
	                healthyTime:'',
	                healthyBar:'',
                    
	                otherHealthyTime:'',
	                otherHealthyBar:'',

                },
                rules:{
					supportTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
	                clothesTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
	                cleanTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
	                seepageFailTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
	                failMsgTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
	                seepageFailReason:[{ required: true, message: '请输入止漏失败原因', trigger: 'blur' }],
	                rescueTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
	                stopFire:[{ required: true, message: '请选择', trigger: 'change' }],
	                isSeepageSuccess:[{ required: true, message: '请选择', trigger: 'change' }],
                    //抢救字段
                    saveTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                    closeGasTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                    rescueMeasureTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                    closeEquipmentTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                    removeTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                    //灭火失败
                    fireFailureTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
                    fireFailureReason:[{ required: true, message: '请输入原因', trigger: 'blur' }],
                    fireSuccess:[{ required: true, message: '请选择', trigger: 'blur' }],
	                // 灭火成功的字段
	                fireSuccessTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
	                exhaustTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
	                newsFireSuccessTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
	                rescuePollutionTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
	                scenePollutionTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
	                selfPollutionTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
	                healthyTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
	                otherHealthyTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
                },
                processInstanceId:localStorage.getItem('processInstanceId')
            }
        },
        methods:{
            //回显测试
             viewData() {
                if( localStorage.getItem('seeLeak') == 1){
					this.showUser = true;
				}else if( localStorage.getItem('seeLeak') == 2){
					this.showUser = false;
				}
                this.$http.get3('/chemDeptErtRescue/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    if (res.data.data){
                    let tempData = res.data.data;
                    if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
                    this.rescueData = {
                        coldRecord:tempData.controlRecordBar,

                        supportTime:tempData.supportTime,
                        supportRemark:tempData.supportRecordBar,

                        clothesTime:tempData.rescueTime,
                        clothesRemark:tempData.rescueRecordBar,

                        cleanTime:tempData.pollutionTime,
                        cleanRemark:tempData.pollutionRecordBar,

                        rescueTime:tempData.emergencyTime,
                        rescueRemark:tempData.emergencyRecordBar,
                        //抢救措施：字段
                        
                        isSeepageSuccess:Number(tempData.isSeepageSuccess),
                        seepageSuccessTime:tempData.seepageSuccessTime,
                        successMsgTime:tempData.successMsgTime,
                        rescueFinishedDescaleTime:tempData.rescueFinishedDescaleTime,
                        rescueFinishedDescaleRecordBar:tempData.rescueFinishedDescaleRecordBar,
                        sceneFinishedDescaleTime:tempData.sceneFinishedDescaleTime,
                        sceneFinishedDescaleRecordBar:tempData.sceneFinishedDescaleRecordBar,
                        selfFinishedDescaleTime:tempData.selfFinishedDescaleTime,
                        selfFinishedDescaleRecordBar:tempData.selfFinishedDescaleRecordBar,
                        rescueFinishedHeathTime:tempData.rescueFinishedHeathTime,
                        rescueFinishedHeathRecordBar:tempData.rescueFinishedHeathRecordBar,
                        otherFinishedHeathTime:tempData.otherFinishedHeathTime,
                        otherFinishedHeathRecordBar:tempData.otherFinishedHeathRecordBar,
                        seepageFailTime:tempData.seepageFailTime,
                        seepageFailReason:tempData.seepageFailReason,
                        failMsgTime:tempData.failMsgTime,
                        
                       
                    }
                    this.environmentList = tempData.envirDetectionList,
                    this.coldWarmList = tempData.coldWarmAreaList,
                    this.rescueGroupList = tempData.rescueGroupList
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='deptErtQj'){
                                this.isDisabled = true
                            }
                            if(i.isFinish == '1' && i.taskKey =='deptErtQj'){
                                this.seeDisabled = true
                            }
                        }
                    })
                    }
                })
            },
            //表单提交
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = {
                            processInstanceId:this.processInstanceId,
                            envirDetectionList:this.environmentList,
                            coldWarmAreaList:this.coldWarmList,

                            controlRecordBar:this.rescueData.coldRecord,
                            supportTime:this.rescueData.supportTime,
                            supportRecordBar:this.rescueData.supportRemark,
                            rescueTime:this.rescueData.clothesTime,
                            rescueRecordBar:this.rescueData.clothesRemark,
                            pollutionTime:this.rescueData.cleanTime,
                            pollutionRecordBar:this.rescueData.cleanRemark,
                            emergencyTime:this.rescueData.rescueTime,
                            emergencyRecordBar:this.rescueData.rescueRemark,

                            rescueGroupList:this.rescueGroupList,
                            //抢救措施：字段 
                            
                            isSeepageSuccess:this.rescueData.isSeepageSuccess,
                            seepageSuccessTime:this.rescueData.seepageSuccessTime,
                            rescueFinishedDescaleTime:this.rescueData.rescueFinishedDescaleTime,
                            rescueFinishedDescaleRecordBar:this.rescueData.rescueFinishedDescaleRecordBar,
                            sceneFinishedDescaleTime:this.rescueData.sceneFinishedDescaleTime,
                            sceneFinishedDescaleRecordBar:this.rescueData.sceneFinishedDescaleRecordBar,
                            selfFinishedDescaleTime:this.rescueData.selfFinishedDescaleTime,
                            selfFinishedDescaleRecordBar:this.rescueData.selfFinishedDescaleRecordBar,
                            rescueFinishedHeathTime:this.rescueData.rescueFinishedHeathTime,
                            rescueFinishedHeathRecordBar:this.rescueData.rescueFinishedHeathRecordBar,
                            otherFinishedHeathTime:this.rescueData.otherFinishedHeathTime,
                            otherFinishedHeathRecordBar:this.rescueData.otherFinishedHeathRecordBar,
                            seepageFailTime:this.rescueData.seepageFailTime,
                            seepageFailReason:this.rescueData.seepageFailReason,
                            failMsgTime:this.rescueData.failMsgTime,

                            savePerson:this.rescueData.savePerson,
                            saveTime:this.rescueData.saveTime,

                            closeGasSystem:this.rescueData.closeGasSystem,
                            closeGasTime:this.rescueData.closeGasTime,

                            rescueMeasure:this.rescueData.rescueMeasure,
                            rescueMeasureTime:this.rescueData.rescueMeasureTime,


                            closeEquipment:this.rescueData.closeEquipment,
                            closeEquipmentTime:this.rescueData.closeEquipmentTime,

                            removeDangerGoods:this.rescueData.removeDangerGoods,
                            removeTime:this.rescueData.removeTime,

                            outfire:this.rescueData.outfire,
                            waterFire:this.rescueData.outfire,
                            fireExtinguisher:this.rescueData.outfire,
                            kitchenFire:this.rescueData.outfire,

                            //灭火失败
                            fireSuccess:this.rescueData.fireSuccess,
                            fireFailureTime:this.rescueData.fireFailureTime,
                            fireFailureReason:this.rescueData.fireFailureReason,

                            //灭火成功
                            fireSuccessTime:this.rescueData.fireSuccessTime,
                            exhaustTime:this.rescueData.exhaustTime,
                            newsFireSuccessTime:this.rescueData.newsFireSuccessTime,
                            
                            rescuePollutionTime:this.rescueData.rescuePollutionTime,
                            rescuePollutionBar:this.rescueData.rescuePollutionBar,

                            scenePollutionTime:this.rescueData.scenePollutionTime,
                            scenePollutionBar:this.rescueData.scenePollutionBar,

                            selfPollutionTime:this.rescueData.selfPollutionTime,
                            selfPollutionBar:this.rescueData.selfPollutionBar,

                            healthyTime:this.rescueData.healthyTime,
                            healthyBar:this.rescueData.healthyBar,

                            otherHealthyTime:this.rescueData.otherHealthyTime,
                            otherHealthyBar:this.rescueData.otherHealthyBar,
                        }
                        this.$http.post3('/chemDeptErtRescue/executeProcess', data).then(res => {
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
                        this.seeDisabled = true
                    } else {
                        return false;
                    }
                });
            },
            //保存
            saveData() {
                let data = {
                    id:this.foukId,
                    processInstanceId:this.processInstanceId,
                    envirDetectionList:this.environmentList,
                    coldWarmAreaList:this.coldWarmList,

                    controlRecordBar:this.rescueData.coldRecord,
                    supportTime:this.rescueData.supportTime,
                    supportRecordBar:this.rescueData.supportRemark,
                    rescueTime:this.rescueData.clothesTime,
                    rescueRecordBar:this.rescueData.clothesRemark,
                    pollutionTime:this.rescueData.cleanTime,
                    pollutionRecordBar:this.rescueData.cleanRemark,
                    emergencyTime:this.rescueData.rescueTime,
                    emergencyRecordBar:this.rescueData.rescueRemark,

                    rescueGroupList:this.rescueGroupList,
                    //抢救措施：字段
                     
                    isSeepageSuccess:this.rescueData.isSeepageSuccess,
                    seepageSuccessTime:this.rescueData.seepageSuccessTime,
                    successMsgTime:this.rescueData.successMsgTime,
                    rescueFinishedDescaleTime:this.rescueData.rescueFinishedDescaleTime,
                    rescueFinishedDescaleRecordBar:this.rescueData.rescueFinishedDescaleRecordBar,
                    sceneFinishedDescaleTime:this.rescueData.sceneFinishedDescaleTime,
                    sceneFinishedDescaleRecordBar:this.rescueData.sceneFinishedDescaleRecordBar,
                    selfFinishedDescaleTime:this.rescueData.selfFinishedDescaleTime,
                    selfFinishedDescaleRecordBar:this.rescueData.selfFinishedDescaleRecordBar,
                    rescueFinishedHeathTime:this.rescueData.rescueFinishedHeathTime,
                    rescueFinishedHeathRecordBar:this.rescueData.rescueFinishedHeathRecordBar,
                    otherFinishedHeathTime:this.rescueData.otherFinishedHeathTime,
                    otherFinishedHeathRecordBar:this.rescueData.otherFinishedHeathRecordBar,
                    seepageFailTime:this.rescueData.seepageFailTime,
                    seepageFailReason:this.rescueData.seepageFailReason,
                    failMsgTime:this.rescueData.failMsgTime,


                    savePerson:this.rescueData.savePerson,
                    saveTime:this.rescueData.saveTime,

                    closeGasSystem:this.rescueData.closeGasSystem,
                    closeGasTime:this.rescueData.closeGasTime,

                    rescueMeasure:this.rescueData.rescueMeasure,
                    rescueMeasureTime:this.rescueData.rescueMeasureTime,


                    closeEquipment:this.rescueData.closeEquipment,
                    closeEquipmentTime:this.rescueData.closeEquipmentTime,

                    removeDangerGoods:this.rescueData.removeDangerGoods,
                    removeTime:this.rescueData.removeTime,

                    outfire:this.rescueData.outfire,
                    waterFire:this.rescueData.outfire,
                    fireExtinguisher:this.rescueData.outfire,
                    kitchenFire:this.rescueData.outfire,

                    //灭火失败
                    fireSuccess:this.rescueData.fireSuccess,
                    fireFailureTime:this.rescueData.fireFailureTime,
                    fireFailureReason:this.rescueData.fireFailureReason,

                    //灭火成功
                    fireSuccessTime:this.rescueData.fireSuccessTime,
                    exhaustTime:this.rescueData.exhaustTime,
                    newsFireSuccessTime:this.rescueData.newsFireSuccessTime,
                    
                    rescuePollutionTime:this.rescueData.rescuePollutionTime,
                    rescuePollutionBar:this.rescueData.rescuePollutionBar,

                    scenePollutionTime:this.rescueData.scenePollutionTime,
                    scenePollutionBar:this.rescueData.scenePollutionBar,

                    selfPollutionTime:this.rescueData.selfPollutionTime,
                    selfPollutionBar:this.rescueData.selfPollutionBar,

                    healthyTime:this.rescueData.healthyTime,
                    healthyBar:this.rescueData.healthyBar,

                    otherHealthyTime:this.rescueData.otherHealthyTime,
                    otherHealthyBar:this.rescueData.otherHealthyBar,
                }
                this.$http.post3('/chemDeptErtRescue/saveOrUpdate', data).then(res => {
                        this.$message("success", "保存成功");
                })
            },
            //添加现场环境持续检测
            handleConfirmEnvironment(){
                if(this.environmentObj.gdType){
                    this.environmentList.push({
                        ppm: this.environmentObj.ppm,
                        gdType:this.environmentObj.gdType,
                        readValue: this.environmentObj.readValue
                    })
                    this.environmentVisible = false
                }else {
                    this.$message('error', 'GD种类不能为空！')
                }
            },
            //添加调整冷暖热区划分
            handleConfirmColdWarm(){
                if(this.coldWarmObj.controlTime){
                    this.coldWarmList.push({
                        controlTime: this.coldWarmObj.controlTime,
                        hotArea:this.coldWarmObj.hotArea,
                        warmArea: this.coldWarmObj.warmArea,
                        coldArea: this.coldWarmObj.coldArea
                    })
                    this.coldWarmVisible = false
                }else {
                    this.$message('error', '管制时间不能为空')
                }
            },
            // 添加事故抢救组
            saveRescueGroupData(){
                if(this.addRescueGroup.rescueGroupNo){
                    this.rescueGroupList.push({
                        rescueGroupNo:this.addRescueGroup.rescueGroupNo,
                        entryTime:this.addRescueGroup.entryTime,
                        leaveTime:this.addRescueGroup.leaveTime
                    })
                    this.rescueGroup = false
                }else{
                    this.$message('error','救援小组名称不能为空！')
                }
            },
	        moment,
        	// 时间选择框的变化
            //抢救组完成其他健康评估
	        otherHealthyTimeChange(e,val){
		        this.rescueData.otherHealthyTime = val
	        },
            //抢救组完成健康评估
	        healthyTimeChange(e,val){
		        this.rescueData.healthyTime = val
	        },
            //自身完成除污
	        selfPollutionTimeChange(e,val){
		        this.rescueData.selfPollutionTime = val
	        },
            //现场完成除污
	        scenePollutionTimeChange(e,val){
		        this.rescueData.scenePollutionTime = val
	        },
            // 获取区域位置列表
			gitConfirmList() {
				let data = {
					dictNo: 'gd_type'
				}
				this.$http.get3("/sys/dict/item",data).then((res) => {
					this.departmentList = res.data.data;
				});
			},
            //抢救组完成除污
	        rescuePollutionTimeChange(e,val){
		        this.rescueData.rescuePollutionTime = val
	        },
            //发送部门ERT灭火成功简讯
	        newsFireSuccessTimeChange(e,val){
		        this.rescueData.newsFireSuccessTime = val
	        },
            //启动事故排烟
	        exhaustTimeChange(e,val){
		        this.rescueData.exhaustTime = val
	        },
            //灭火成功
	        fireSuccessTimeChange(e,val){
		        this.rescueData.fireSuccessTime = val
	        },

            //搬离
            removeTimeChange(e,val){
                this.rescueData.removeTime = val
            },
            //机台
            closeEquipmentTimeChange(e,val){
                this.rescueData.closeEquipmentTime = val
            },
            //空调
            rescueMeasureTimeChange(e,val){
                this.rescueData.rescueMeasureTime = val
            },
            //化学气体
            closeGasTimeChange(e,val){
                this.rescueData.closeGasTime = val
            },
            //救出受伤/被困人员时间
            saveTimeChange(e,val){
                this.rescueData.saveTime = val
            },
            //事故抢救组进入时间(单个数组)
            rescueGroupEnterChange(e,val){
                this.addRescueGroup.entryTime = val
            },
            //事故抢救组出来时间(单个数组)
            rescueGroupLeaveChange(e,val){
                this.addRescueGroup.leaveTime = val
            },
            //急救站架设完成时间
	        rescueTimeChange(e,val){
		        this.rescueData.rescueTime = val
	        },
            //除污站架设完成时间
	        cleanTimeChange(e,val){
		        this.rescueData.cleanTime = val
	        },

            //着装完成时间
            clothesTimeChange(e,val){
                this.rescueData.clothesTime = val
            },
            //器材支援到位时间
            supportTimeChange(e,val){
                this.rescueData.supportTime = val
            },
            //添加调整冷暖热区划分时间
            coldWarmChange(value,dateString){
                this.coldWarmObj.controlTime = dateString
            },
            //添加现场环境持续检测时间
            environmentChange(value,dateString){
                this.environmentObj.ppm = dateString
            },





	        stopFireChange(e){
	        	this.rescueData.fireSuccess = e.target.value
	        },

        },
        mounted(){
            this.viewData()
            this.gitConfirmList()
        }


    }
</script>


<style lang="stylus" scoped>
    .departmentRescue
        // border 1px solid #2c3e50
        padding 10px
        height 780px
        overflow auto
        width 100%
        text-align left
        .star 
            color:#f5222d
            font-size: 14px
            font-family: SimSun, sans-serif
            margin-right: 4px
        .padding-left-40
            padding-left 40px
        .rescueData
            margin-bottom 10px
            .record
                display flex
        .support-group
            padding-left 40px
            display flex
            justify-content flex-start
            align-items center
            .item
                margin-right 20px
                display flex
                align-items center
                p
                    margin-bottom 0
        .support-group1
            padding-left 40px
            display flex
            justify-content flex-start
            align-items center
            .item
                margin-right 20px
                display flex
                align-items center
                p
                    margin-bottom 0
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
        .rescue-method
            padding-left 40px
            .selectDetail
                display flex
            ul
                li
                    list-style none
                    margin-bottom 10px
        .success-failed
            display flex
            justify-content flex-start
        .stop-fire-failed
            margin-top 10px
        .stop-fire-succeed
            padding-left 40px
            .box-list
                display flex
                align-items center
                .ant-form-item
                    margin-bottom 0
                    margin-right 10px
            ul
                li
                    list-style none
                    margin-bottom 10px
                    div
                        margin-bottom 10px
        .submit-btn
            display flex
            justify-content center
            margin-top 20px
</style>
<style lang="stylus">
    .departmentRescue
        .ant-form-item
            display flex
</style>
