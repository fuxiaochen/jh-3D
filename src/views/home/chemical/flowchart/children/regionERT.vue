<template>
    <div class="regionERT">
        <h2><b>9.成立区域RET</b></h2>
        <template>
            <a-form-model
                    ref="dynamicValidateForm"
                    :model="baseData"
                    :rules="rules"
            >
                <p><b>9.1通报指挥官成立区域ERT</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="指挥官" prop="departmentCharge">
                            <a-input v-model="baseData.departmentCharge" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="分机" prop="departmentPhone">
                            <a-input v-model="baseData.departmentPhone" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="时间" prop="departmentDate">
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="baseData.departmentDate" @change="departmentDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>

                <p><b>9.2区域RET集合广播</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="广播时间" prop="broadcastDate">
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="baseData.broadcastDate" @change="broadcastDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="集结点" prop="broadcastPosition">
                            <a-input v-model="baseData.broadcastPosition" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                    <div class="noticeDepartItem">
                        <a-form-model-item label="集结完毕时间" prop="broadcastOverDate">
                            <a-date-picker :valueFormat="valueFormat" show-time v-model="baseData.broadcastOverDate" @change="broadcastOverDate" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <div class="fm-box" style="margin:0 0 15px 40px">
                    <span><span>广播词:监控中心报告，监控中心报告，目前(☆☆)区域发生气体/液体泄漏，请(☆☆)部门ERT成员
                            立即至(☆☆)集合。（间隔1.5S，重复两次）</span></span>
                </div>

                <p><b>9.3现场指挥官在集结点进行任务分配</b></p>
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

                <p><b>9.4区域RET抢救计划</b></p>
                <div class="noticeDepart">
                    <div class="noticeDepartItem">
                        <a-form-model-item label="抢救措施：" prop="rescueMeasures">
                            <a-input v-model="baseData.rescueMeasures" :disabled="isDisabled"/>
                        </a-form-model-item>
                    </div>
                </div>
                <p><b>9.5支援器材清单</b></p>
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
        name: "regionERT",
        data() {
            return {
                valueFormat: "YYYY-MM-DD HH:mm:ss",
                equipmentVisible: false,
                equipmentListVisible: false,
                selectedRowKeys: [], // Check here to configure the default column
                selectedRowKeys1: [], // Check here to configure the default column
                selectedRowKeys2: [], // Check here to configure the default column
                selectedRowKeys3: [], // Check here to configure the default column
                selectedRowKeys4: [], // Check here to configure the default column
                selectedRowKeys5: [], // Check here to configure the default column
                selectedRowKeys6: [], // Check here to configure the default column
                personModalList6:[],
                foukId: null,
                pagination: {
                    total: 0,
                    pageNum: 1,
                    current: 1,
                    pageSize: 10, //每页中显示10条数据
                    showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
                    showQuickJumper: true,
                },
                loading: false,
                loading1: false,
                loading2: false,
                loading3: false,
                loading4: false,
                loading5: false,
                commandVisible:false,     //抢救组
                shwoPersonList:false,
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
                        key: "locaDescription",
                        dataIndex: "locaDescription",
                        ellipsis: true,
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
                personModalList:[],
                personModalList1:[],
                personModalList2:[],
                personModalList3:[],
                personModalList4:[],
                personModalList5:[],
                tableData:null,
                tableData1:null,
                tableData2:null,
                tableData3:null,
                tableData4:null,
                tableData5:null,
                tableData6:null,
                commandList:false,
                isDisabled:false,
                seeDisabled:false,
                equipmentObj: {
                    equipmentName: '',
                    equipmentNum: '',
                    equipmentLocation: ''
                },
                equipmentList: [],
                departmentList1: [],
                departmentList: [],
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

                confirmPersonVisible:false,     //抢救组
                confirmPersonList:false,
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
                    departmentCharge: [{required: true, message: '请输入指挥官', trigger: 'blur'}],
                    departmentPhone: [{required: true, message: '请输入分机', trigger: 'blur'}],
                    departmentDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    broadcastDate: [{required: true, message: '请选择时间', trigger: 'change'}],
                    broadcastPosition: [{required: true, message: '请输入集结点', trigger: 'blue'}],
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
            start() {
                this.loading = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.loading = false;
                    this.selectedRowKeys = [];
                }, 1000);
                },
            start1() {
                this.loading1 = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.loading1 = false;
                    this.selectedRowKeys1 = [];
                }, 1000);
                },
            start2() {
                this.loading2 = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.loading2 = false;
                    this.selectedRowKeys2 = [];
                }, 1000);
                },
            start3() {
                this.loading3 = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.loading3 = false;
                    this.selectedRowKeys3 = [];
                }, 1000);
                },
            start4() {
                this.loading4 = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.loading4 = false;
                    this.selectedRowKeys4 = [];
                }, 1000);
                },
            start5() {
                this.loading5 = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.loading5 = false;
                    this.selectedRowKeys5 = [];
                }, 1000);
                },
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
            },
            onSelectChange1(selectedRowKeys) {
                this.selectedRowKeys1 = selectedRowKeys;
            },
            onSelectChange2(selectedRowKeys) {
                this.selectedRowKeys2 = selectedRowKeys;
            },
            onSelectChange3(selectedRowKeys) {
                this.selectedRowKeys3 = selectedRowKeys;
            },
            onSelectChange4(selectedRowKeys) {
                this.selectedRowKeys4 = selectedRowKeys;
            },
            onSelectChange5(selectedRowKeys) {
                this.selectedRowKeys5 = selectedRowKeys;
            },
             onSelectChange6(selectedRowKeys, selectedRows) {
                this.selectedRowKeys6 = selectedRowKeys;
            },
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

                        }
                        this.$http.post3('/chemAreaErt/executeProcess', data).then(res => {
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
                    id: this.foukId,
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

                }
                this.$http.post3('/chemAreaErt/saveOrUpdate', data).then(res => {
                })
            },
            //回显测试
            viewData() {
                this.$http.get3('/chemAreaErt/queryOne?processInstanceId=' + this.processInstanceId).then(res => {
                    if (res.data.data){
                    let tempData = res.data.data;
                    if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
                    this.baseData = {
                        departmentCharge:tempData.deptCharge,
                        departmentPhone:tempData.deptChargeExt,
                        departmentDate:tempData.notificationDeptTime,
                        broadcastDate:tempData.radioGatherTime,
                        broadcastPosition:tempData.rallyPoint,
                        broadcastOverDate:tempData.gatherFinishTime,
                        personModalList:tempData.commanderTaskList,
                        rescueMeasures:tempData.emergencyMeasures,
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
                    this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='areaErt'){
                                this.isDisabled = true
                            }
                            if(i.isFinish == '1' && i.taskKey =='areaErt'){
                                this.seeDisabled = true
                            }
                        }
                    })
                    }
                })
            },
            //分页器发生改变
            handleTableChange(pagination) {
                this.pagination.pageNum = pagination.current;
                this.pagination.current = pagination.current;
                this.pagination.pageSize = pagination.pageSize;
                this.getPageList();
            },
            getPageList() {
                let data1 = {
                    pageNum:this.pagination.pageNum,
                    pageSize:this.pagination.pageSize,
                    startDate: '',
                    endDate: '',
                    regionalLocation: '',
                    materialsType: '',
                    materialsCategory: '',
                }
                // 应急器材
                this.$http.get3("/materialmanage/getEmergencyMaterialByCondition", data1).then((res) => {
                    this.equipmentList = res.data.data.dataList;
                    this.pagination.total = JSON.parse(res.data.data.total);
                });
            },
            //添加指挥官
            handleConfirmPerson(){
                if(!this.selectedRowKeys){
                    this.$message('error','抢救组不能为空！')
                }
                if(this.selectedRowKeys){
                    this.personModalList = []
                    this.tableData.forEach(item=>{
                        this.selectedRowKeys.forEach( key=>{
                            if(item.id == key){
                                this.personModalList.push(item)
                            }
                        })
                    })

                }
                
                this.commandVisible = false
            },
            //添加抢救组
            handleConfirmPerson1(){
                if(!this.selectedRowKeys1){
                    this.$message('error','抢救组不能为空！')
                }
                if(this.selectedRowKeys1){
                    this.personModalList1 = []
                    this.tableData1.forEach(item=>{
                        this.selectedRowKeys1.forEach( key=>{
                            if(item.id == key){
                                this.personModalList1.push(item)
                            }
                        })
                    })

                }
                this.confirmPersonVisible = false
            },
            //添加管制组
            handleHelpers(){
                if(!this.selectedRowKeys3){
                    this.$message('error','抢救组不能为空！')
                }
                if(this.selectedRowKeys3){
                    this.personModalList3 = []
                    this.tableData3.forEach(item=>{
                        this.selectedRowKeys3.forEach( key=>{
                            if(item.id == key){
                                this.personModalList3.push(item)
                            }
                        })
                    })

                }
                this.helpersVisible = false
            },
            //添加除污组
            handledecontamination(){
                if(!this.selectedRowKeys5){
                    this.$message('error','除污组不能为空！')
                }
                if(this.selectedRowKeys5){
                    this.personModalList5 = []
                    this.tableData5.forEach(item=>{
                        this.selectedRowKeys5.forEach( key=>{
                            if(item.id == key){
                                this.personModalList5.push(item)
                            }
                        })
                    })
                }
                this.decontaminationVisible = false
            },
            //添加急救组
            handlefirstAid(){
                if(!this.selectedRowKeys2){
                    this.$message('error','急救组不能为空！')
                }
                if(this.selectedRowKeys2){
                    this.personModalList2 = []
                    this.tableData2.forEach(item=>{
                        this.selectedRowKeys2.forEach( key=>{
                            if(item.id == key){
                                this.personModalList2.push(item)
                            }
                        })
                    })
                }
                this.firstAidVisible = false
            },
            //添加支援组
            handlesupport() {
                if(!this.selectedRowKeys4){
                    this.$message('error','支援组不能为空！')
                }
                if(this.selectedRowKeys4){
                    this.personModalList4 = []
                    this.tableData4.forEach(item=>{
                        this.selectedRowKeys4.forEach( key=>{
                            if(item.id == key){
                                this.personModalList4.push(item)
                            }
                        })
                    })

                }
                this.supportVisible = false
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
            
            onChange(value) {
                console.log('ssss',value);
                let data = value[1].substring(0, value[1].indexOf('（'))
                 this.equipmentObj.equipmentName = data
                 this.equipmentObj.equipmentLocation = value[0]
            },
            displayRender({ labels }) {
                return labels[labels.length - 1];
            },
            // 获取器材位置列表
			gitConfirmList() {
				this.$http.get3("/materialmanage/getEmergencyMaterialLocationTree").then((res) => {
					this.departmentList = res.data.data;
				});
                let data1 = {
                    pageNum:1,
                    pageSize:10,
                    startDate: '',
                    endDate: '',
                    regionalLocation: '',
                    materialsType: '',
                    materialsCategory: '',
                }
                let data2 = {
                    pageNum:1,
                    pageSize:10000,
                    startDate: '',
                    endDate: '',
                    regionalLocation: '',
                    materialsType: '',
                    materialsCategory: '',
                }
                let data = {
                    pageNum:1,
                    pageSize:20000,
                }
                // 指挥官
				this.$http.get3("/personDepartment/getDepartmentByCondition", data).then((res) => {
                    let data = []
                    for (let i of res.data.data.dataList){
                        i.key = i.id
                        data.push(i)
                    }
					this.tableData = data;
				});
                // 应急器材
                 this.$http.get3("/materialmanage/getEmergencyMaterialByCondition", data1).then((res) => {
                    this.equipmentList = res.data.data.dataList;
                    this.pagination.total = JSON.parse(res.data.data.total);
                 });
                // 全部应急器材
                 this.$http.get3("/materialmanage/getEmergencyMaterialByCondition", data2).then((res) => {
                    this.tableData6 = res.data.data.dataList;
                 });
                // 抢救组
				this.$http.get3("/emergencyRescue/getRescueByCondition", data).then((res) => {
                    let data = []
                    for (let i of res.data.data.dataList){
                        i.key = i.id
                        data.push(i)
                    }
					this.tableData1 = data;
                    this.tableData4 = data;
                    this.tableData5 = data;
				});
                // 急救组
				this.$http.get3("/emergencyTreatment/getTreatmentByCondition", data).then((res) => {
                    let data = []
                    for (let i of res.data.data.dataList){
                        i.key = i.id
                        data.push(i)
                    }
					this.tableData2 = data;
				});
                // 安管组
				this.$http.get3("/emergencySafety/getSafetyByCondition", data).then((res) => {
                    let data = []
                    for (let i of res.data.data.dataList){
                        i.key = i.id
                        data.push(i)
                    }
					this.tableData3 = data;
				});
			},
            //添加应急器材
            equipmentConfirmPerson(){
                if(!this.selectedRowKeys6){
                    this.$message('error','应急器材不能为空！')
                }
                if(this.selectedRowKeys6){
                    this.personModalList6 = []
                    this.tableData6.forEach(value=>{
                        if(value.materialItemList.length > 0){
                            value.materialItemList.forEach( item=>{
                                this.selectedRowKeys6.forEach( key=>{
                                    if(item.iid == key){
                                        this.personModalList6.push(item)
                                    }
                                })
                            })
                        }
                    })
                }
                this.equipmentVisible = false
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
        computed: {
            hasSelected() {
            return this.selectedRowKeys.length > 0;
            },
            hasSelected1() {
            return this.selectedRowKeys1.length > 0;
            },
            hasSelected2() {
            return this.selectedRowKeys2.length > 0;
            },
            hasSelected3() {
            return this.selectedRowKeys3.length > 0;
            },
            hasSelected4() {
            return this.selectedRowKeys4.length > 0;
            },
            hasSelected5() {
            return this.selectedRowKeys5.length > 0;
            },
        },
        mounted(){
            this.viewData()
            this.gitConfirmList()
        }
    }
</script>

<style lang="stylus" scoped>
    .regionERT
        // border 1px solid #2c3e50
        padding 10px
        width 100%
        height 780px
        overflow auto
        text-align left

        .noticeDepart
            display flex
            justify-content start

            .noticeDepartItem
                width 36%
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
    .regionERT
        .ant-form-item
            display flex

        .ant-form-item-label
            width 105px
</style>