<template>
    <div class="departmentERT">
        <h2><b>8.成立部门ERT</b></h2>
        <template>
            <a-form-model
                    ref="dynamicValidateForm"
                    :model="baseData"
                    :rules="rules"
            >
               <p><b>8.1通报部门主管成立部门ERT</b></p>
                <div class="noticeDepart" >
                    <div class="noticeDepartItem">
                        <a-form-model-item label="事故部门主管" prop="departmentCharge"> 
                            <a-input v-model="baseData.departmentCharge" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="分机" prop="departmentPhone">
                            <a-input v-model="baseData.departmentPhone" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="时间" prop="departmentDate">
                            <a-date-picker show-time @change="departmentDate"  v-model="baseData.departmentDate"  :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>8.2部门ERT集合广播</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="广播时间" prop="broadcastDate">
                            <a-date-picker show-time v-model="baseData.broadcastDate" @change="broadcastDate"  :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="集结点" prop="broadcastPosition">
                            <a-input v-model="baseData.broadcastPosition" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="集结完毕时间" prop="broadcastOverDate">
                            <a-date-picker show-time v-model="baseData.broadcastOverDate" @change="broadcastOverDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>8.3现场指挥官在集结点进行任务分配</b></p>
                <div class="rescueData">
                    <div class="add-new-user" style="margin-top: 20px">
                        <a-button type="dashed" style="width: 20%" @click="commandVisible = true" :disabled="isDisabled">
                            <a-icon type="plus" /> 添加指挥官
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="shwoPersonList = true">
                            <a-icon type="menu" /> 查看指挥官
                        </a-button>
                    </div>
                    <div class="add-new-user" style="margin-top: 20px">
                        <a-button type="dashed" style="width: 20%" @click="confirmPersonVisible = true" :disabled="isDisabled">
                            <a-icon type="plus" /> 添加抢救组
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="confirmPersonList = true">
                            <a-icon type="menu" /> 查看抢救组
                        </a-button>
                    </div>
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="helpersVisible = true" :disabled="isDisabled">
                            <a-icon type="plus" /> 添加管制组
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="helpersPersonList = true">
                            <a-icon type="menu" /> 查看管制组
                        </a-button>
                    </div>
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="supportVisible = true" :disabled="isDisabled">
                            <a-icon type="plus" /> 添加支援组
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="supportPersonList = true">
                            <a-icon type="menu" /> 查看支援组
                        </a-button>
                    </div>
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="decontaminationVisible = true" :disabled="isDisabled">
                            <a-icon type="plus" /> 添加除污组
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="decontaminationPersonList = true">
                            <a-icon type="menu" /> 查看除污组
                        </a-button>
                    </div>
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="firstAidVisible = true" :disabled="isDisabled">
                            <a-icon type="plus" /> 添加急救组
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="firstAidPersonList = true">
                            <a-icon type="menu" /> 查看急救组
                        </a-button>
                    </div>
                </div>

                <p><b>8.4部门ERT抢救计划</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="抢救措施" prop="rescueMeasures">
                            <a-input v-model="baseData.rescueMeasures" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="烟雾处置措施" prop="smokeMeasures">
                            <a-input v-model="baseData.smokeMeasures" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="废水处置措施" prop="wasteWaterMeasures">
                            <a-input v-model="baseData.wasteWaterMeasures" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>8.5支援器材清单</b></p>
                <div class="rescueData">
                    <div class="add-new-user">
                        <a-button type="dashed" style="width: 20%" @click="equipmentVisible = true" :disabled="isDisabled">
                            <a-icon type="plus"/>
                            添加器材
                        </a-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a-button type="dashed" style="width: 20%" @click="equipmentListVisible = true">
                            <a-icon type="menu"/>
                            查看器材清单
                        </a-button>
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
                :width="1000"
                class="control-person-modal"
                title="添加器材"
                :visible="equipmentVisible"
                @ok="equipmentConfirmPerson"
                @cancel="equipmentVisible = false">
             <a-table :columns="personColumns1" :data-source="equipmentList" :pagination="pagination" @change="handleTableChange" rowKey="id">
                <a-table
                    slot="expandedRowRender"
                    slot-scope="text, index"
                    :row-selection="{selectedRowKeys: selectedRowKeys6, onChange: onSelectChange6}"
                    :columns="innerColumns"
                    :data-source="equipmentList[index].materialItemList"
                    id="iid"
                    rowKey="iid"
                >
                </a-table>
            </a-table>
       </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="器材清单"
                :visible="equipmentListVisible"
                @ok="equipmentListVisible = false"
                @cancel="equipmentListVisible = false">
            <a-table bordered :data-source="personModalList6" :rowKey="(record,index)=>{return index}"
                     :columns="innerColumns"></a-table>
        </a-modal>

        <a-modal
                destroyOnClose
                class="confirm-person-modal"
                title="添加指挥官信息"
                :width="1000"
                :visible="commandVisible"
                @ok="handleConfirmPerson"
                @cancel="commandVisible = false">
            <div class="confirm-person"  
                >
                 <div style="margin-bottom: 16px">
                    <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
                        取消选择
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected">
                        {{ `已选择 ${selectedRowKeys.length} 个` }}
                        </template>
                    </span>
                    </div>
                    <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :columns="personColumns"
                    :data-source="tableData"
                    />
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="指挥官信息列表"
                :visible="shwoPersonList"
                @ok="shwoPersonList = false"
                @cancel="shwoPersonList = false">
            <a-table bordered :data-source="personModalList" :rowKey="(record,index)=>{return index}" :columns="personColumns"></a-table>
        </a-modal>
        <a-modal
                destroyOnClose
                :width="1000"
                :rowKey="(record,index)=>{return index}"
                class="confirm-person-modal"
                title="添加抢救组信息"
                :visible="confirmPersonVisible"
                @ok="handleConfirmPerson1"
                @cancel="confirmPersonVisible = false">
            <div class="confirm-person">
                <div style="margin-bottom: 16px">
                    <a-button type="primary" :disabled="!hasSelected1" :loading="loading1" @click="start1">
                        取消选择
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected1">
                        {{ `已选择 ${selectedRowKeys1.length} 个` }}
                        </template>
                    </span>
                    </div>
                    <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys1, onChange: onSelectChange1 }"
                    :columns="personColumns"
                    :data-source="tableData1"
                    />
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="抢救组信息列表"
                :visible="confirmPersonList"
                @ok="confirmPersonList = false"
                @cancel="confirmPersonList = false">
            <a-table bordered :data-source="personModalList1" :rowKey="(record,index)=>{return index}" :columns="personColumns"></a-table>
        </a-modal>

        <a-modal
                destroyOnClose
                :width="1000"
                class="confirm-person-modal"
                title="添加管制组信息"
                :visible="helpersVisible"
                @ok="handleHelpers"
                @cancel="helpersVisible = false">
            <div class="confirm-person">
                <div style="margin-bottom: 16px">
                    <a-button type="primary" :disabled="!hasSelected3" :loading="loading3" @click="start3">
                        取消选择
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected3">
                        {{ `已选择 ${selectedRowKeys3.length} 个` }}
                        </template>
                    </span>
                    </div>
                    <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys3, onChange: onSelectChange3 }"
                    :columns="personColumns"
                    :data-source="tableData3"
                    />
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="管制组信息列表"
                :visible="helpersPersonList"
                @ok="helpersPersonList = false"
                @cancel="helpersPersonList = false">
            <a-table bordered :data-source="personModalList3" :rowKey="(record,index)=>{return index}" :columns="personColumns"></a-table>
        </a-modal>

        <a-modal
                destroyOnClose
                :width="1000"
                class="confirm-person-modal"
                title="添加支援组信息"
                :visible="supportVisible"
                @ok="handlesupport"
                @cancel="supportVisible = false">
            <div class="confirm-person">
                <div style="margin-bottom: 16px">
                    <a-button type="primary" :disabled="!hasSelected4" :loading="loading4" @click="start4">
                        取消选择
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected4">
                        {{ `已选择 ${selectedRowKeys4.length} 个` }}
                        </template>
                    </span>
                    </div>
                    <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys4, onChange: onSelectChange4 }"
                    :columns="personColumns"
                    :data-source="tableData4"
                    />
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="支援组信息列表"
                :visible="supportPersonList"
                @ok="supportPersonList = false"
                @cancel="supportPersonList = false">
             <a-table bordered :data-source="personModalList4" :rowKey="(record,index)=>{return index}" :columns="personColumns"></a-table>
        </a-modal>

        <a-modal
                destroyOnClose
                :width="1000"
                class="confirm-person-modal"
                title="添加除污组信息"
                :visible="decontaminationVisible"
                @ok="handledecontamination"
                @cancel="decontaminationVisible = false">
            <div class="confirm-person">
                <div style="margin-bottom: 16px">
                    <a-button type="primary" :disabled="!hasSelected5" :loading="loading5" @click="start5">
                        取消选择
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected5">
                        {{ `已选择 ${selectedRowKeys5.length} 个` }}
                        </template>
                    </span>
                    </div>
                    <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys5, onChange: onSelectChange5 }"
                    :columns="personColumns"
                    :data-source="tableData5"
                    />
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="除污组信息列表"
                :visible="decontaminationPersonList"
                @ok="decontaminationPersonList = false"
                @cancel="decontaminationPersonList = false">
            <a-table bordered :data-source="personModalList5" :rowKey="(record,index)=>{return index}" :columns="personColumns"></a-table>
        </a-modal>

        <a-modal
                destroyOnClose
                :width="1000"
                class="confirm-person-modal"
                title="添加急救组信息"
                :visible="firstAidVisible"
                @ok="handlefirstAid"
                @cancel="firstAidVisible = false">
            <div class="confirm-person">
                <div style="margin-bottom: 16px">
                    <a-button type="primary" :disabled="!hasSelected2" :loading="loading2" @click="start2">
                        取消选择
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected2">
                        {{ `已选择 ${selectedRowKeys2.length} 个` }}
                        </template>
                    </span>
                    </div>
                    <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys2, onChange: onSelectChange2 }"
                    :columns="personColumns"
                    :data-source="tableData2"
                    />
            </div>
        </a-modal>
        <a-modal
                :width="1000"
                class="control-person-modal"
                title="急救组信息列表"
                :visible="firstAidPersonList"
                @ok="firstAidPersonList = false"
                @cancel="firstAidPersonList = false">
             <a-table bordered :data-source="personModalList2" :rowKey="(record,index)=>{return index}" :columns="personColumns"></a-table>
       </a-modal>
    </div>
</template>

<script>
    export default {
        name: "departmentERT",
        data() {
            return {
                equipmentVisible: false,
                equipmentListVisible: false,
                isDisabled: false,
                pagination: {
                    total: 0,
                    pageNum: 1,
                    current: 1,
                    pageSize: 10, //每页中显示10条数据
                    showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
                    showQuickJumper: true,
                },
                selectedRowKeys: [], // Check here to configure the default column
                selectedRowKeys1: [], // Check here to configure the default column
                selectedRowKeys2: [], // Check here to configure the default column
                selectedRowKeys3: [], // Check here to configure the default column
                selectedRowKeys4: [], // Check here to configure the default column
                selectedRowKeys5: [], // Check here to configure the default column
                selectedRowKeys6: [], // Check here to configure the default column
                loading: false,
                loading1: false,
                loading2: false,
                loading3: false,
                loading4: false,
                loading5: false,
                equipmentObj: {
                    equipmentName: '',
                    equipmentNum: '',
                    equipmentLocation: ''
                },
                equipmentList: [],
                departmentList: [],
                departmentList1: [],
                equipmentColumns: [
                    {
                        title: '器材',
                        dataIndex: 'equipmentName',
                    }, {
                        title: '数量(套)',
                        dataIndex: 'equipmentNum',
                    }, {
                        title: '器材位置',
                        dataIndex: 'equipmentLocation',
                    },
                ],
                 innerColumns: [
                    {
                        title: "子类物资名称",
                        dataIndex: "maItemTxt",
                        key: "maItemTxt",
                    },
                    {
                        title: "数量",
                        dataIndex: "amount",
                        key: "amount",
                    },
                    {
                        title: "位置",
                        dataIndex: "position",
                        key: "position",
                    },
                ],
                confirmPersonVisible:false,     //抢救组
                commandVisible:false,     //抢救组
                confirmPersonList:false,
                shwoPersonList:false,
                personModalList:[],
                personModalList1:[],
                personModalList2:[],
                personModalList3:[],
                personModalList4:[],
                personModalList5:[],
                personModalList6:[],
                tableData:null,
                tableData1:null,
                tableData2:null,
                tableData3:null,
                tableData4:null,
                tableData5:null,
                tableData6:null,
                commandList:false,
                confirmPersonObj:{
                    name:null,
                    phone:null,
                    date:null
                },
                confirmList:[],
                confirmColumns: [
                    {
                        title: '抢救组',
                        dataIndex: 'userName',
                    }
                ],
                 personColumns1: [
                {
                    title: "应急物资类型",
                    // key: "materialsCategory", 应急物资类型 编号需要查询
                    key: "materialsTypeValue",
                    dataIndex: "materialsTypeValue",
                    ellipsis: true,
                    // scopedSlots: { customRender: "materialsType" },
                },
                {
                    title: "数量",
                    dataIndex: "quantity",
                    key: "quantity",
                    ellipsis: true,
                },
                {
                    title: "区域位置",
                    key: "regionalLocation",
                    scopedSlots: { customRender: "regionalLocation" },
                },
            ],
                personColumns: [
                    {
                        title: '姓名',
                        dataIndex: 'staff',
                    },
                    {
                        title: '分机号',
                        dataIndex: 'phone',
                    },
                    {
                        title: '部门',
                        dataIndex: 'departName',
                    },
                    {
                        title: '组别',
                        dataIndex: 'roleName',
                    }
                ],

                helpersVisible:false,           //管制组
                helpersPersonList:false,
                helpersObj:{
                    name:null,
                    phone:null,
                    date:null
                },
                helpersList:[],
                helpersColumns: [
                    {
                        title: '管制组',
                        dataIndex: 'userName',
                    }
                ],

                supportVisible:false,           //支援组
                supportPersonList:false,
                supportObj:{
                    name:null,
                    phone:null,
                    date:null
                },
                supportList:[],
                supportColumns: [
                    {
                        title: '支援组',
                        dataIndex: 'userName',
                    }
                ],

                decontaminationVisible:false,       //除污组
                decontaminationPersonList:false,
                decontaminationObj:{
                    name:null,
                    phone:null,
                    date:null
                },
                decontaminationList:[],
                decontaminationColumns: [
                    {
                        title: '除污组',
                        dataIndex: 'userName',
                    }
                ],
                
                firstAidVisible:false,              //急救组
                firstAidPersonList:false,
                firstAidObj:{
                    name:null,
                    phone:null,
                    date:null
                },
                firstAidList:[],
                firstAidColumns: [
                    {
                        title: '急救组',
                        dataIndex: 'userName',
                    }
                ],
                 tabData: [],
                baseData: {
                    departmentCharge: '',
                    departmentPhone: '',
                    departmentDate: '',
                    broadcastDate: '',
                    broadcastPosition: '',
                    broadcastOverDate: '',
                    commander: '',
                    rescueGroup: '',
                    controlGroup: '',
                    supportGroup: '',
                    clearGroup: '',
                    aidGroup: '',
                    rescueMeasures: '',
                    smokeMeasures: '',
                    wasteWaterMeasures: '',
                },
                rules: {
                    departmentCharge: [{required: true, message: '请输入事故部门主管', trigger: 'blur'}],
                    departmentPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    departmentDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    broadcastDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    broadcastPosition: [{required: true, message: '请选择集结点', trigger: 'blue'}],
                    broadcastOverDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    rescueMeasures: [{required: true, message: '请输入抢救措施', trigger: 'change'}],
                    smokeMeasures: [{required: true, message: '请输入烟雾处置措施', trigger: 'change'}],
                    wasteWaterMeasures: [{required: true, message: '请输入废水处置措施', trigger: 'change'}],
                    commander: [{required: true, message: '请输入指挥官', trigger: 'change'}],
                },
                processInstanceId:localStorage.getItem('processInstanceId')
            }
        },
        methods: {
             personColumns: [
                    {
                        title: '姓名',
                        dataIndex: 'staff',
                    },
                    {
                        title: '分机号',
                        dataIndex: 'phone',
                    },
                    {
                        title: '部门',
                        dataIndex: 'departName',
                    },
                    {
                        title: '组别',
                        dataIndex: 'roleName',
                    }
                ],
            //表单提交
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //指挥官
                        var str = JSON.stringify(this.selectedRowKeys)  
                        str = str.replace("]","");  
                        str = str.replace("[","");
                        var str1 = JSON.stringify(this.selectedRowKeys1)  
                        str1 = str1.replace("]","");  
                        str1 = str1.replace("[","");
                        var str2 = JSON.stringify(this.selectedRowKeys2)  
                        str2 = str2.replace("]","");  
                        str2 = str2.replace("[","");
                        var str3 = JSON.stringify(this.selectedRowKeys3)  
                        str3 = str3.replace("]","");  
                        str3 = str3.replace("[","");
                        var str4 = JSON.stringify(this.selectedRowKeys4)  
                        str4 = str4.replace("]","");  
                        str4 = str4.replace("[","");
                        var str5 = JSON.stringify(this.selectedRowKeys5)  
                        str5 = str5.replace("]","");  
                        str5 = str5.replace("[","");
                        var str6 = JSON.stringify(this.selectedRowKeys6)  
                        str6 = str6.replace("]","");  
                        str6 = str6.replace("[","");

                        let data = {
                            processInstanceId:this.processInstanceId,
                            deptCharge:this.baseData.departmentCharge,
                            deptChargeExt:this.baseData.departmentPhone,
                            notificationDeptTime:this.baseData.departmentDate,

                            radioGatherTime:this.baseData.broadcastDate,
                            rallyPoint:this.baseData.broadcastPosition,
                            gatherFinishTime:this.baseData.broadcastOverDate,

                            commanderTask:str,
                            rescueTask:str1,
                            controlTask:str3,
                            supportTask:str4,
                            cleanerTask:str5,
                            emergencyTask:str2,
                            supportEquipment:str6,

                            emergencyMeasures:this.baseData.rescueMeasures,
                            smokeDisposalMeasures:this.baseData.smokeMeasures,
                            wastewaterDisposaMeasures:this.baseData.wasteWaterMeasures,
                        }
                        this.$http.post3('/fire/dept/ert/excuteProcess', data).then(res => {
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
            // 保存数据
            saveData() {
                var str = JSON.stringify(this.selectedRowKeys)  
                        str = str.replace("]","");  
                        str = str.replace("[","");
                        var str1 = JSON.stringify(this.selectedRowKeys1)  
                        str1 = str1.replace("]","");  
                        str1 = str1.replace("[","");
                        var str2 = JSON.stringify(this.selectedRowKeys2)  
                        str2 = str2.replace("]","");  
                        str2 = str2.replace("[","");
                        var str3 = JSON.stringify(this.selectedRowKeys3)  
                        str3 = str3.replace("]","");  
                        str3 = str3.replace("[","");
                        var str4 = JSON.stringify(this.selectedRowKeys4)  
                        str4 = str4.replace("]","");  
                        str4 = str4.replace("[","");
                        var str5 = JSON.stringify(this.selectedRowKeys5)  
                        str5 = str5.replace("]","");  
                        str5 = str5.replace("[","");
                        var str6 = JSON.stringify(this.selectedRowKeys6)  
                        str6 = str6.replace("]","");  
                        str6 = str6.replace("[","");

                let data = {
                    processInstanceId:this.processInstanceId,
                    deptCharge:this.baseData.departmentCharge,
                    deptChargeExt:this.baseData.departmentPhone,
                    notificationDeptTime:this.baseData.departmentDate,

                    radioGatherTime:this.baseData.broadcastDate,
                    rallyPoint:this.baseData.broadcastPosition,
                    gatherFinishTime:this.baseData.broadcastOverDate,

                    commanderTask:str,
                    rescueTask:str1,
                    controlTask:str3,
                    supportTask:str4,
                    cleanerTask:str5,
                    emergencyTask:str2,
                    supportEquipment:str6,

                    emergencyMeasures:this.baseData.rescueMeasures,
                    smokeDisposalMeasures:this.baseData.smokeMeasures,
                    wastewaterDisposaMeasures:this.baseData.wasteWaterMeasures,

                }
                this.$http.post3('/fire/dept/ert/saveOrUpdate', data).then(res => {
                    this.$message("success", "保存成功");
                })
            },
            //回显测试
            viewData() {
                this.$http.get3('/fire/dept/ert/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    let tempData = res.data.data;
                    // if(res.data.data){
                    //     let peopledata = "8.1事故部门主管:" + tempData.deptCharge + ",时间：" + tempData.notificationDeptTime + "\n" +
                    //     "8.2部门ERT集合广播:" + ",广播时间：" + tempData.radioGatherTime + ",集结点：" + tempData.rallyPoint + "\n"
                    //     "8.4部门ERT抢救计划:" + ",抢救措施：" + tempData.emergencyMeasures + ",烟雾处置措施：" + tempData.smokeDisposalMeasures + ",废水处置措施：" + tempData.wastewaterDisposaMeasures
                    //     this.$store.commit("setProcessERT",peopledata)
                    // }
                    this.baseData = {
                        departmentCharge:tempData.deptCharge,
                        departmentPhone:tempData.deptChargeExt,
                        departmentDate:tempData.notificationDeptTime,
                        broadcastDate:tempData.radioGatherTime,
                        broadcastPosition:tempData.rallyPoint,
                        broadcastOverDate:tempData.gatherFinishTime,
                        commander:tempData.commanderTask,
                        rescueMeasures:tempData.emergencyMeasures,
                        smokeMeasures:tempData.smokeDisposalMeasures,
                        wasteWaterMeasures:tempData.wastewaterDisposaMeasures,
                    }
                    
                    this.personModalList = tempData.commanderTaskList;
                    if(tempData.rescueTaskList){
                      this.personModalList1 = tempData.rescueTaskList;
                    }
                    if(tempData.controlTaskList){
                      this.personModalList3 = tempData.controlTaskList;
                    }
                    if(tempData.supportTaskList){
                      this.personModalList4 = tempData.supportTaskList;
                    }
                    if(tempData.cleanerTaskList){
                      this.personModalList5 = tempData.cleanerTaskList;
                    }
                    if(tempData.emergencyTaskList){
                      this.personModalList2 = tempData.emergencyTaskList;
                    }
                    if (tempData.supportEquipmentList){
                       this.personModalList6 = tempData.supportEquipmentList;
                    }
                    let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='deptErt'){
                                this.isDisabled = true
                            }
                        }
                    })
                })
            },
             onSelectChange6(selectedRowKeys, selectedRows) {
                this.selectedRowKeys6 = selectedRowKeys;
            },

            //添加抢救组
            handleConfirmPerson(){
                if(this.confirmPersonObj.name){
                    this.confirmList.push({
                        userName:this.confirmPersonObj.name,
                    })
                    this.confirmPersonVisible = false
                }else{
                    this.$message('error','抢救组不能为空！')
                }
            },
            
            //添加管制组
            handleHelpers(){
                if(this.helpersObj.name){
                    this.helpersList.push({
                        userName:this.helpersObj.name,
                    })
                    this.helpersVisible = false
                }else{
                    this.$message('error','管制组不能为空！')
                }
            },
            //添加除污组
            handledecontamination(){
                if(this.decontaminationObj.name){
                    this.decontaminationList.push({
                        userName:this.decontaminationObj.name,
                    })
                    this.decontaminationVisible = false
                }else{
                    this.$message('error','除污组不能为空！')
                }
            },
            //添加急救组
            handlefirstAid(){
                if(this.firstAidObj.name){
                    this.firstAidList.push({
                        userName:this.firstAidObj.name,
                    })
                    this.firstAidVisible = false
                }else{
                    this.$message('error','急救组不能为空！')
                }
            },
            //添加支援组
            handlesupport() {
                if (this.supportObj.name) {
                    this.supportList.push({
                        userName: this.supportObj.name,
                    })
                    this.supportVisible = false
                } else {
                    this.$message('error', '支援组不能为空！')
                }
            },
            //添加器材按钮
            handleConfirmequipment() {
                if (this.equipmentObj.equipmentName) {
                    this.equipmentList.push({
                        equipmentName: this.equipmentObj.equipmentName,
                        equipmentNum: this.equipmentObj.equipmentNum,
                        equipmentLocation: this.equipmentObj.equipmentLocation,
                    })
                    this.equipmentVisible = false
                } else {
                    this.$message('error', '器材不能为空')
                }
            },

            //通知事故主管时间
            departmentDate(value, dateString) {
                this.baseData.departmentDate = dateString
            },
            //广播时间
            broadcastDate(value, dateString) {
                this.baseData.broadcastDate = dateString
            },
            //集结完毕时间
            broadcastOverDate(value, dateString) {
                this.baseData.broadcastOverDate = dateString
            },
        },
        mounted(){
            this.viewData()
        }
    }
</script>

<style lang="stylus" scoped>
    .departmentERT
        
        padding 10px
        width 100%
        height 800px
        overflow auto
        text-align left

        .noticeDepart
            display flex

            .noticeDepartItem
                width 50%
                display flex
                justify-content start

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
    .departmentERT
        .ant-form-item
            display flex

        .ant-form-item-label
            width 105px
</style>