<template>
	<div>
		<!-- 公司ERT应急组织表展示弹框 -->
		<div class="organ" v-if="organization&&storeList">
			<div class="top-title">公司ERT应急组织表（{{storeList.departmentSchedu}}）</div>
			<div class="close" @click="organization = false"></div>
			<!-- 指挥官信息 -->
			<div class="command-title">总指挥</div>
			<div
				class="command"
			>{{storeList.commanderList[0].staffName}} {{storeList.commanderList[0].position}}{{storeList.commanderList[0].extensionNumber}}</div>
			<div class="command-detail">{{storeList.commanderDuty[0].duty}}</div>
			<div class="staff-title">幕僚（专家组）</div>
			<div class="staff1-left">
				<span class="left-title">{{staff1.departmentName}}</span>
				{{staff1.department}} {{staff1.staffName}}
				{{staff1.position}} {{staff1.extensionNumber}}
			</div>
			<div class="staff1-right">{{staff1.duty}}</div>
			<div class="staff2-left">
				<span class="left-title">{{staff2.departmentName}}</span>
				{{staff2.department}} {{staff2.staffName}}
				{{staff2.position}} {{staff2.extensionNumber}}
			</div>
			<div class="staff2-right">{{staff2.duty}}</div>
			<div class="staff3-left">
				<span class="left-title">{{staff3.departmentName}}</span>
				{{staff3.department}} {{staff3.staffName}}
				{{staff3.position}} {{staff3.extensionNumber}}
			</div>
			<div class="staff3-right">{{staff3.duty}}</div>
			<div class="staff4-left">
				<span class="left-title">{{staff4.departmentName}}</span>
				{{staff4.department}} {{staff4.staffName}}
				{{staff4.position}} {{staff4.extensionNumber}}
			</div>
			<div class="staff4-right">{{staff4.duty}}</div>
			<div class="staff5-left">
				<span class="left-title">{{staff5.departmentName}}</span>
				{{staff5.department}} {{staff5.staffName}}
				{{staff5.position}} {{staff5.extensionNumber}}
			</div>
			<div class="staff5-right">{{staff5.duty}}</div>
			<div class="staff6-left">
				<span class="left-title">{{staff6.departmentName}}</span>
				{{staff6.department}} {{staff6.staffName}}
				{{staff6.position}} {{staff6.extensionNumber}}
			</div>
			<div class="staff6-right">{{staff6.duty}}</div>
			<div class="staff7-left">
				<span class="left-title">{{staff7.departmentName}}</span>
				{{staff7.department}} {{staff7.staffName}}
				{{staff7.position}} {{staff7.extensionNumber}}
			</div>
			<div class="staff7-right">{{staff7.duty}}</div>
			<div class="development-title" @click="showrRsearch">研发栋ERT</div>
			<div class="production-title" @click="showProduction">生产车间ERT</div>
			<div class="power-title" @click="showPower">综合动力站ERT</div>
		</div>
		<!-- 生产车间ERT应急组织表展示弹框 -->
		<div class="production" v-if="production&&productionList">
			<div class="production-top">
				<div class="top-title">生产车间ERT应急组织表（{{productionList.departmentSchedu}}）</div>
				<div class="production-close" @click="production = false"></div>
				<div class="production-detail">{{productionList.commanderDuty[0].duty}}</div>
				<!-- 幕僚信息 -->
				<div class="production-aideduty">{{productionList.aideDuty[0].duty}}</div>
				<div
					class="production-commanderList2"
				>{{productionList.commanderList[2][0].belongDepartment}}{{productionList.commanderList[2][0].staffName}}{{productionList.commanderList[2][0].position}}【{{productionList.commanderList[2][0].extensionNumber}}】</div>
				<div class="production-commanderList3" style="width:580px; height:90px">
					<div
						v-for="item in productionList.commanderList[3]"
						:key="item.id"
					>{{item.detailDateTempDate}}{{item.staffName}}{{item.position}}【{{item.extensionNumber}}】</div>
				</div>
				<div
					class="production-commanderList1"
				>{{productionList.commanderList[1][0].belongDepartment}}{{productionList.commanderList[1][0].staffName}}{{productionList.commanderList[1][0].position}}【{{productionList.commanderList[1][0].extensionNumber}}】</div>
				<div class="production-aideList2">
					<div
						v-for="item in productionList.aideList[2]"
						:key="item.id"
					>{{item.belongDepartment}}{{item.staffName}}{{item.position}}【{{item.extensionNumber}}】</div>
				</div>
				<div
					class="production-aideList1"
				>{{productionList.aideList[3][0].belongDepartment}}{{productionList.aideList[3][0].staffName}}{{productionList.aideList[3][0].position}}【{{productionList.aideList[3][0].extensionNumber}}】</div>
			</div>
			<div>
				<a-table
					:columns="columns"
					:data-source="productionData"
					:pagination="false"
					class="production-table"
					bordered
				>
					<template slot="name" slot-scope="text">
						<a>{{ text }}</a>
					</template>
					<template slot="equipType" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staffName}}</span>
					</template>
					<template slot="emergencyRescues" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.backupStaff}}</span>
					</template>
				</a-table>
				<div class="production-rescue">
					<div class="rescue-rescueDuty">{{productionList.rescueDuty[2].duty}}</div>
					<div class="rescue-rescueDuty">{{productionList.rescueDuty[1].duty}}</div>
					<div class="rescue-rescueDuty">{{productionList.rescueDuty[0].duty}}</div>
				</div>
			</div>
			<div>
				<a-table
					:columns="safetyColumns"
					:data-source="safetyData"
					:pagination="false"
					class="production-table"
					style="width:570px"
					bordered
				>
					<template slot="name" slot-scope="text">
						<a>{{ text }}</a>
					</template>
					<template slot="equipTypeNA" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staffName}}</span>
					</template>
					<template slot="daySafety" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staffName}}</span>
					</template>
					<template slot="emergencyRescuesNB" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.backupStaff}}</span>
					</template>
				</a-table>
				<div class="production-safetyDuty">
					<div class="rescueDuty-text">
						<div>平日：值班主管/617052</div>
						<div>假日：值班主管/617052</div>
						<div>夜间：值班主管/617000</div>
					</div>
					<div class="rescue-safetyDuty">{{productionList.safetyDuty[0].duty}}</div>
				</div>
			</div>
			<div>
				<a-table
					:columns="treatmentColumns"
					:data-source="treatmentData"
					:pagination="false"
					class="production-table"
					style="width:500px"
					bordered
				>
					<template slot="nightTreatmentNB" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.backupStaff}}</span>
					</template>
					<template slot="nightTreatment" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staff}}</span>
					</template>
				</a-table>
				<div class="anotherTop"></div>
				<div class="anotherTreatment-table">
					<div
						class="anotherTreatment"
						v-for="item in anotherTreatmentList"
						:key="item.departName"
					>
						<div class="anotherTreatment-left">{{item.departName}}</div>
						<div class="anotherTreatment-right">
							<div
								class="anotherTreatment-box"
								v-for="people in item.staffList"
								:key="people.id"
							>{{people.staff}}</div>
							<div
								class="anotherTreatment-box"
								v-for="number in Math.ceil(item.total/4)*4-item.total"
								:key="number"
							></div>
						</div>
					</div>
				</div>
				<div class="production-treatment">
					<div class="rescue-treatmentDuty">{{productionList.treatmentDuty[0].duty}}</div>
				</div>
			</div>
		</div>
		<!-- 综合动力站ERT应急组织表展示弹框 -->
		<div class="power" v-if="powerShow&&powerList">
			<div class="production-top">
				<div class="top-title">综合动力站ERT应急组织表（{{powerList.departmentSchedu}}）</div>
				<div class="production-close" @click="powerShow = false"></div>
				<!-- 指挥官信息 -->
				<div class="production-detail">{{powerList.commanderDuty[0].duty}}</div>
				<!-- 幕僚信息 -->
				<div class="production-aideduty">{{powerList.aideDuty[0].duty}}</div>
				<div
					class="production-commanderList2"
				>{{powerList.commanderList[2][0].belongDepartment}}{{powerList.commanderList[2][0].staffName}}{{powerList.commanderList[2][0].position}}{{powerList.commanderList[2][0].extensionNumber}}</div>
				<div class="production-commanderList3">
					<div
						v-for="item in powerList.commanderList[3]"
						:key="item.id"
						style="width: 250px;height:28px"
					>{{item.detailDateTempDate}}{{item.staffName}}{{item.position}}【{{item.extensionNumber}}】</div>
				</div>
				<div
					class="production-commanderList1"
				>{{powerList.commanderList[1][0].belongDepartment}}{{powerList.commanderList[1][0].staffName}}{{powerList.commanderList[1][0].position}}【{{powerList.commanderList[1][0].extensionNumber}}】</div>
				<div class="production-aideList2">
					<div
						v-for="item in powerList.aideList[2]"
						:key="item.id"
					>{{item.belongDepartment}}{{item.staffName}}{{item.position}}【{{item.extensionNumber}}】</div>
				</div>
				<div
					class="production-aideList1"
				>{{powerList.aideList[3][0].belongDepartment}}{{powerList.aideList[3][0].staffName}}{{powerList.aideList[3][0].position}}【{{powerList.aideList[3][0].extensionNumber}}】</div>
			</div>
			<div>
				<a-table
					:columns="rescueColumns"
					:data-source="rescueListData"
					:pagination="false"
					class="production-table"
					bordered
				>
					<template slot="emergencyRescuesNA" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staffName}}</span>
					</template>
					<template slot="emergencyRescuesNB" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.backupStaff}}</span>
					</template>
				</a-table>
				<div class="production-rescue">
					<div class="rescue-rescueDuty">{{powerList.rescueDuty[2].duty}}</div>
					<div class="rescue-rescueDuty">{{powerList.rescueDuty[1].duty}}</div>
					<div class="rescue-rescueDuty">{{powerList.rescueDuty[0].duty}}</div>
				</div>
			</div>
			<div>
				<a-table
					:columns="safetyListColumns"
					:data-source="safetyMiddleData"
					:pagination="false"
					class="production-table"
					style="width:570px"
					bordered
				>
					<template slot="name" slot-scope="text">
						<a>{{ text }}</a>
					</template>
					<template slot="equipTypeNA" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staffName}}</span>
					</template>
					<template slot="daySafety" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staffName}}</span>
					</template>
					<template slot="emergencyRescuesNB" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.backupStaff}}</span>
					</template>
				</a-table>
				<div class="production-safetyDuty">
					<div class="rescue-safetyDuty">{{powerList.safetyDuty[0].duty}}</div>
				</div>
			</div>
			<div>
				<a-table
					:columns="protectionColumns"
					:data-source="protectionData"
					:pagination="false"
					class="production-table"
					style="width:500px"
					bordered
				>
					<template slot="nightTreatmentNB" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.backupStaff}}</span>
					</template>
					<template slot="nightTreatment" slot-scope="scope">
						<span v-for="item in scope" :key="item.id">{{item.staffName}}</span>
					</template>
				</a-table>
				<div class="anotherTop"></div>
				<div class="anotherTreatment-table">
					<div
						class="anotherTreatment"
						v-for="item in anotherList"
						:key="item.departmentName"
					>
						<div class="anotherTreatment-left">{{item.departmentName}}</div>
						<div class="anotherTreatment-right">
							<div
								class="anotherTreatment-box"
								v-for="people in item.staffList"
								:key="people.id"
							>{{people.staffName}}</div>
							<div
								class="anotherTreatment-box"
								v-for="number in Math.ceil(item.total/4)*4-item.total"
								:key="number"
							></div>
						</div>
					</div>
				</div>
				<div class="production-power">
					<div class="rescue-treatmentDuty">{{powerList.treatmentDuty[0].duty}}</div>
				</div>
			</div>
		</div>
		<!-- 研发栋ERT应急组织表展示弹框 -->
		<div class="rsearch" v-if="rsearchShow&&rsearchList">
			<div class="production-top">
				<div class="top-title">研发栋ERT应急组织表（{{rsearchList.departmentSchedu}}）</div>
				<div class="production-close" @click="rsearchShow = false"></div>
				<!-- 指挥官信息 -->
				<div class="production-detail">{{rsearchList.commanderDuty[0].duty}}</div>
				<!-- 幕僚信息 -->
				<div class="production-aideduty">{{rsearchList.aideDuty[0].duty}}</div>
				<div
					class="production-commanderList2"
				>{{rsearchList.commanderList[0].department}}{{rsearchList.commanderList[0].staffName}}{{rsearchList.commanderList[0].position}}【{{rsearchList.commanderList[0].extensionNumber}}】</div>
				<div class="production-aideList2">
					<div
						v-for="item in rsearchList.aideList[2]"
						:key="item.id"
						style="margin-top: -9px"
					>{{item.department}}{{item.staffName}}{{item.position}}【{{item.extensionNumber}}】</div>
				</div>
			</div>
			<div>
				<div class="anotherTop1" style="margin: -5px 0 0 30px;"></div>
				<div class="anotherTreatment-table" style="margin-left: 30px;">
					<div
						class="anotherTreatment"
						v-for="item in rescueList"
						:key="item.departName"
					>
						<div class="anotherTreatment-left">{{item.departName}}</div>
						<div class="anotherTreatment-right">
							<div
								class="anotherTreatment-box"
								v-for="people in item.LeaderRescueList"
								:key="people.id"
								style="width:78px"
							>
								<div class="box-number" style="width:78px">{{people.staffName}}</div>
								<div
									class="box-number"
									style="width:78px"
								>{{people.extensionNumber}}</div>
							</div>
							<div
								class="anotherTreatment-box"
								v-for="people in item.groupRescueList"
								:key="people.id"
							>
								<div class="box-number">{{people.staffName}}</div>
								<div class="box-number">{{people.extensionNumber}}</div>
							</div>
							<div
								class="anotherTreatment-box"
								v-for="number in Math.ceil(item.total/6)*6-item.total"
								:key="number"
							>
								<div class="box-number" style="color: #ffffff00">1</div>
								<div class="box-number" style="color: #ffffff00">1</div>
							</div>
						</div>
					</div>
				</div>
				<div class="production-rescue" style="text-align:left">
					<div class="rescue-rescueDuty">{{rsearchList.rescueDuty[2].duty}}</div>
					<div class="rescue-rescueDuty">{{rsearchList.rescueDuty[1].duty}}</div>
					<div class="rescue-rescueDuty">{{rsearchList.rescueDuty[0].duty}}</div>
				</div>
			</div>
			<div>
				<div class="anotherTop2"></div>
				<div class="safetyTube-table">
					<div
						class="anotherTreatment"
						v-for="item in safetyTubeList"
						:key="item.building"
					>
						<div class="anotherTreatment-left">{{item.building}}</div>
						<div class="anotherTreatment-right">
							<div
								class="anotherTreatment-box"
								style="font-weight: bold;font-size: 14px;"
							>
								<div class="box-number">区域</div>
								<div class="box-number">成员</div>
							</div>
							<div
								class="anotherTreatment-box"
								v-for="(people,index) in item.safetyList"
								:key="people.id"
							>
								<div class="box-number">{{index}}</div>
								<div class="box-number">
									<span v-for="i in people" :key="i.id">{{i.staffName}}</span>
								</div>
							</div>
							<div
								class="anotherTreatment-box"
								v-for="number in Math.ceil(item.total/7)*7-item.total"
								:key="number"
							>
								<div class="box-number" style="color: #ffffff00">1</div>
								<div class="box-number" style="color: #ffffff00">1</div>
							</div>
						</div>
					</div>
				</div>
				<div class="production-safetyDuty">
					<div
						class="rescue-safetyDuty"
						style="text-align:left"
					>{{rsearchList.safetyDuty[0].duty}}</div>
				</div>
			</div>
			<div>
				<div class="anotherTop3"></div>
				<div class="anotherTreatment-table">
					<div
						class="anotherTreatment"
						v-for="item in aidList"
						:key="item.departName"
					>
						<div class="anotherTreatment-left">{{item.departName}}</div>
						<div class="anotherTreatment-right">
							<div
								class="anotherTreatment-box"
								style="width:80.6px;border-right: 1px solid #36ecff;border-bottom: 1px solid #36ecff;"
								v-for="people in item.staffList"
								:key="people.id"
							>{{people.staff}}</div>
							<div
								class="anotherTreatment-box"
								style="width:80.6px;border-right: 1px solid #36ecff;border-bottom: 1px solid #36ecff;"
								v-for="number in Math.ceil(item.total/5)*5-item.total"
								:key="number"
							></div>
						</div>
					</div>
				</div>
				<div class="production-power">
					<div
						class="rescue-treatmentDuty"
						style="text-align:left"
					>{{rsearchList.treatmentDuty[0].duty}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        attrs: {},
    };
    if (index === 4) {
        obj.attrs.colSpan = 0;
    }
    return obj;
};
	export default {
		name: "Organize",
		data() {
			return {
				organization: false,
				 //生产车间ERT抢救组表格参数
				columns: [
					{
						title: "部门",
						dataIndex: "department",
						customRender: renderContent,
					},
					{
						title: "课别",
						dataIndex: "courseType",
						customRender: renderContent,
					},
					{
						title: "种子教官",
						dataIndex: "seedInstructor",
						customRender: renderContent,
					},
					{
						title: "DA",
						dataIndex: "DA",
						customRender: renderContent,
					},
					{
						title: "DB",
						dataIndex: "DB",
						customRender: renderContent,
					},
					{
						title: "NA",
						dataIndex: "NA",
						width: 80,
						// scopedSlots: { customRender: "equipType" },
						customRender: renderContent,
					},
					{
						title: "NB",
						width: 80,
						dataIndex: "NB",
						// scopedSlots: { customRender: "emergencyRescues" },
						customRender: renderContent,
					},
					{
						title: "应急分机",
						dataIndex: "departExtensionNumber",
						customRender: renderContent,
					},
				],
				//生产车间ERT安管组表格参数
				safetyColumns: [
					{
						title: "MFG(生产)",
						children: [
							{
								title: "区域",
								dataIndex: "area",
								customRender: renderContent,
								// customRender: (value, row, index) => {
								// 	const obj = {
								// 		children: value,
								// 		attrs: {},
								// 	};
								// 	if (index === 0) {
								// 		obj.attrs.rowSpan = 3;
								// 	}
								// 	// These two are merged into above cell
								// 	if (index === 1) {
								// 		obj.attrs.rowSpan = 0;
								// 	}
								// 	if (index === 2) {
								// 		obj.attrs.rowSpan = 0;
								// 	}
								// 	return obj;
								// },
							},
							{
								title: "常日",
								dataIndex: "commonDay",
								// scopedSlots: { customRender: "daySafety" },
								customRender: renderContent,
							},
							{
								title: "DA",
								dataIndex: "DA",
								customRender: renderContent,
							},
							{
								title: "DB",
								dataIndex: "DB",
								customRender: renderContent,
							},
							{
								title: "NA",
								dataIndex: "NA",
								// scopedSlots: { customRender: "equipTypeNA" },
								customRender: renderContent,
							},
							{
								title: "NB",
								dataIndex: "NB",
								// scopedSlots: { customRender: "emergencyRescuesNB" },
								customRender: renderContent,
							},
							{
								title: "联系方式",
								dataIndex: "departExtensionNumber",
								customRender: renderContent,
							},
						],
					},
				],
				//综合动力站ERT安管组表格参数
				safetyListColumns: [
					{
						title: "班别",
						dataIndex: "courseType",
						customRender: renderContent,
					},
					{
						title: "DA",
						dataIndex: "DA",
						customRender: renderContent,
					},
					{
						title: "DB",
						dataIndex: "DB",
						customRender: renderContent,
					},
					{
						title: "NA",
						dataIndex: "NA",
						// scopedSlots: { customRender: "equipTypeNA" },
						customRender: renderContent,
					},
					{
						title: "NB",
						dataIndex: "NB",
						// scopedSlots: { customRender: "emergencyRescuesNB" },
						customRender: renderContent,
					},
				],
				//生产车间ERT急救组表格参数
				treatmentColumns: [
					{
						title: "晶合厂护",
						children: [
							{
								title: "部门",
								dataIndex: "departmentName",
								customRender: (value, row, index) => {
									const obj = {
										children: value,
										attrs: {},
									};
									if (index === 0) {
										obj.attrs.rowSpan = 1;
									}
									// These two are merged into above cell
									if (index === 1) {
										obj.attrs.rowSpan = 1;
									}
									if (index === 2) {
										obj.attrs.rowSpan = 1;
									}
									return obj;
								},
							},
							{
								title: "DA",
								dataIndex: "DA",
								customRender: renderContent,
							},
							{
								title: "DB",
								dataIndex: "DB",
								customRender: renderContent,
							},
							{
								title: "NA",
								dataIndex: "NA",
								// scopedSlots: { customRender: "nightTreatment" },
								customRender: renderContent,
							},
							{
								title: "NB",
								dataIndex: "NB",
								// scopedSlots: { customRender: "nightTreatmentNB" },
								customRender: renderContent,
							},
						],
					},
				],
				//综合动力站ERT急救组表格参数
				protectionColumns: [
					{
						title: "晶合厂护",
						children: [
							{
								title: "DA",
								dataIndex: "DA",
								customRender: renderContent,
							},
							{
								title: "DB",
								dataIndex: "DB",
								customRender: renderContent,
							},
							{
								title: "NA",
								dataIndex: "NA",
								// scopedSlots: { customRender: "nightTreatment" },
								customRender: renderContent,
							},
							{
								title: "NB",
								dataIndex: "NB",
								// scopedSlots: { customRender: "nightTreatmentNB" },
								customRender: renderContent,
							},
						],
					},
				],
				//综合动力站ERT急救组表格参数
				rescueColumns: [
					{
						title: "课别",
						dataIndex: "courseType",
						align: "center",
						customRender: renderContent,
					},
					{
						title: "DA",
						align: "center",
						dataIndex: "DA",
						customRender: renderContent,
					},
					{
						title: "DB",
						align: "center",
						dataIndex: "DB",
						customRender: renderContent,
					},
					{
						title: "NA",
						align: "center",
						dataIndex: "NA",
						// scopedSlots: { customRender: "emergencyRescuesNA" },
						customRender: renderContent,
					},
					{
						title: "NB",
						align: "center",
						dataIndex: "NB",
						// scopedSlots: { customRender: "emergencyRescuesNB" },
						customRender: renderContent,
					},
					{
						title: "应急分机",
						align: "center",
						dataIndex: "departExtensionNumber",
						customRender: renderContent,
					},
				],
				//综合动力站ERT抢救组表格数据
				rescueListData: null,
				//综合动力站ERT急救组表格数据
				protectionData: null,
				//综合动力站ERT安管组表格数据
				safetyMiddleData: null,
				//生产车间ERT抢救组表格数据
				productionData: null,
				//生产车间ERT急救组表格数据
				treatmentData: null,
				//生产车间ERT安管组表格数据
				safetyData: null,
				two: true,
				
				rsearch: false,
				production: false,
				powerShow: false,
				rsearchShow: false,
				storeList: null,
				rsearchList: null,
				productionList: null,
				powerList: null,
				anotherTreatmentList: null,
				anotherList: null,
				rescueList: null,
				safetyTubeList: null,
				aidList: null,
				staff1: null,
				staff2: null,
				staff3: null,
				staff4: null,
				staff5: null,
				staff6: null,
				staff7: null,
			}
		},
		methods: {
			// 显示组织表人员信息
			showOrganization() {
				this.$http.get3("/emergency/person/schedule/queryCompanyInfoToScreen").then(res => {
					this.storeList = res.data.data;
					this.staff1 = this.storeList.aideList[this.storeList.aideList.findIndex(item => item.department === "PA00")];
					this.staff2 = this.storeList.aideList[this.storeList.aideList.findIndex(item => item.department === "CA10")];
					this.staff3 = this.storeList.aideList[this.storeList.aideList.findIndex(item => item.department === "FA00")];
					this.staff4 = this.storeList.aideList[this.storeList.aideList.findIndex(item => item.department === "AA00")];
					this.staff5 = this.storeList.aideList[this.storeList.aideList.findIndex(item => item.department === "AC00")];
					this.staff6 = this.storeList.aideList[this.storeList.aideList.findIndex(item => item.department === "DA00")];
					this.staff7 = this.storeList.aideList[this.storeList.aideList.findIndex(item => item.department === "CA20")];
				});
				this.organization = true;
			},
			// 显示研发栋ERT组织表人员信息
			showrRsearch() {
				this.$http.get3("/emergency/person/schedule/queryResearchInfoToScreen").then(res => {
					this.rsearchList = res.data.data;
					this.rescueList = res.data.data.rescueList;
					this.safetyTubeList = res.data.data.safetyList;
					this.aidList = res.data.data.treatmentList;
				});
				this.rsearchShow = true;
			},
			// 显示生产车间ERT组织表人员信息
			showProduction() {
				this.$http.get3("/emergency/person/schedule/queryProductionInfoToScreen").then(res => {
					this.productionList = res.data.data;
					this.productionData = res.data.data.rescueList;
					this.safetyData = res.data.data.safetyList;
					this.treatmentData = res.data.data.treatmentList;
					this.anotherTreatmentList = res.data.data.anotherTreatmentList;
				});
				this.production = true;
			},
			// 显示综合动力站ERT组织表人员信息
			showPower() {
				this.$http.get3("/emergency/person/schedule/queryPowerInfoToScreen")
					.then((res) => {
						this.powerList = res.data.data;
						this.rescueListData = res.data.data.rescueList;
						this.safetyMiddleData = res.data.data.safetyList;
						this.protectionData = res.data.data.treatmentList;
						let topTitles =
							"DA" +
							"\n" +
							res.data.data.rescueLeaderList[0].DA +
							"\n" +
							"(组长)";
						let topTitles1 =
							"DB" +
							"\n" +
							res.data.data.rescueLeaderList[0].NA +
							"\n" +
							"(组长)";
						let topTitles2 =
							"NA" +
							"\n" +
							res.data.data.rescueLeaderList[0].DB +
							"\n" +
							"(组长)";
						let topTitles3 =
							"NB" +
							"\n" +
							res.data.data.rescueLeaderList[0].NB +
							"\n" +
							"(组长)";
						this.rescueColumns[1].title = topTitles;
						this.rescueColumns[2].title = topTitles1;
						this.rescueColumns[3].title = topTitles2;
						this.rescueColumns[4].title = topTitles3;
						this.anotherList = res.data.data.anotherTreatmentList["厂务"];
						console.log('sss',this.anotherList);
					});
				this.powerShow = true;
			},
		},
		mounted() {
			// this.showOrganization()
		}
	}
</script>

<style lang="stylus" scoped>
		.back {
            cursor: pointer;
            width: 85px;
            height: 30px;
            font-size: 14px;
            font-weight: bold;
            line-height: 29px;
            position: absolute;
            right: 25px;
            top: 10px;
            background-image: url('../two/img/back.png');
            background-size: 100% 100%;
        }
        .production {
            width: 1845px;
            font-size: 14px;
            line-height: 29px;
            position: absolute;
            white-space: pre-line;
            text-align: left;
            right: 25px;
            top: 10px;
            background-color: #252e3d;
            overflow: auto;
            overflow: -moz-scrollbars-none;
            z-index: 501;
            display: flex;
            flex-wrap: wrap;

            .production-top {
                height: 950px;
                width: 100%;
                background-image: url('../two/img/production.png');
                background-size: 100% 100%;
                background-position: no-position;
                position: relative;

                .top-title {
                    color: #36ecff;
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    letter-spacing: 8px;
                    padding-top: 50px;
                }

                .production-close {
                    width: 35px;
                    height: 35px;
                    position: absolute;
                    right: 25px;
                    top: 10px;
                    background-image: url('../two/img/return.png');
                    background-size: 100% 100%;
                    background-position: no-position;
                }

                .production-detail {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    right: 225px;
                    top: 190px;
                }

                .production-aideduty {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 122px;
                    top: 506px;
                }

                .production-commanderList2 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 807px;
                    top: 188px;
                }

                .production-commanderList3 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 707px;
                    top: 228px;
					display:flex;
					flex-wrap: wrap
                }

                .production-commanderList1 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 807px;
                    top: 334px;
                }

                .production-aideList2 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 521px;
                    top: 509px;
					width:420px
					display:flex;
					flex-wrap: wrap
                }

                .production-aideList1 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 560px;
                    top: 655px;
                }
            }

            .production-table {
                width: 600px;
                background-color: #252e3d;
                color: #fff;
                margin: -73px 0 0 25px;
                pointer-events: none;
                white-space: pre-line;
            }

            .production-rescue {
                margin: 10px 0 0 25px;
                width: 600px;
                height: 410px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                display: flex;
                background-image: url('../two/img/rescue.png');

                .rescue-rescueDuty {
                    width: 200px;
                    padding: 90px 5px 0 30px;
                }
            }

            .anotherTop {
                width: 500px;
                height: 85px;
                margin-left: 25px;
                background-image: url('../two/img/head.png');
                background-size: 100% 100%;
                background-position: no-position;
            }

            .anotherTreatment-table {
                width: 500px;
                margin-left: 25px;
                border-left: 1px solid #36ecff;

                .anotherTreatment {
                    width: 500px;
                    display: flex;

                    .anotherTreatment-left {
                        width: 140px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center; /* 水平居中 */
                        align-items: center;
                        border-right: 1px solid #36ecff;
                        border-bottom: 1px solid #36ecff;
                    }

                    .anotherTreatment-right {
                        width: 360px;
                        display: flex;
                        flex-wrap: wrap;

                        .anotherTreatment-box {
                            width: 90px;
                            display: flex;
                            justify-content: center; /* 水平居中 */
                            align-items: center;
                            border-right: 1px solid #36ecff;
                            border-bottom: 1px solid #36ecff;
                        }
                    }
                }
            }

            .production-treatment {
                margin: 10px 0 0 25px;
                width: 500px;
                height: 280px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                display: flex;
                background-image: url('../two/img/treatment.png');

                .rescue-treatmentDuty {
                    padding: 80px 45px 0;
                }
            }

            .production-safetyDuty {
                margin: 10px 0 0 25px;
                width: 570px;
                height: 600px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                background-image: url('../two/img/safety.png');

                .rescueDuty-text {
                    padding: 90px 0 0 280px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                }

                .rescue-safetyDuty {
                    width: 200px;
                    padding: 115px 0 0 30px;
                }
            }
        }

        ::-webkit-scrollbar {
            display: none;
        }

        .power {
            width: 1845px;
            font-size: 14px;
            line-height: 29px;
            position: absolute;
            white-space: pre-line;
            text-align: left;
            right: 25px;
            top: 10px;
            background-color: #252e3d;
            overflow: auto;
            overflow: -moz-scrollbars-none;
            z-index: 501;
            display: flex;
            flex-wrap: wrap;

            .production-top {
                height: 950px;
                width: 100%;
                background-image: url('../two/img/production.png');
                background-size: 100% 100%;
                background-position: no-position;
                position: relative;

                .top-title {
                    color: #36ecff;
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    letter-spacing: 8px;
                    padding-top: 50px;
                }

                .production-close {
                    width: 35px;
                    height: 35px;
                    position: absolute;
                    right: 25px;
                    top: 10px;
                    background-image: url('../two/img/return.png');
                    background-size: 100% 100%;
                    background-position: no-position;
                }

                .production-detail {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    right: 225px;
                    top: 190px;
                }

                .production-aideduty {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 122px;
                    top: 506px;
                }

                .production-commanderList2 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 807px;
                    top: 188px;
                }

                .production-commanderList3 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 707px;
                    top: 216px;
					width: 500px;
					height:90px;
					display:flex;
					flex-wrap: wrap
                }

                .production-commanderList1 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 807px;
                    top: 334px;
                }

                .production-aideList2 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 510px;
                    top: 520px;
					width:330px;
					display:flex;
					flex-wrap: wrap
                }

                .production-aideList1 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 560px;
                    top: 655px;
                }
            }

            .production-table {
                width: 600px;
                background-color: #252e3d;
                color: #fff;
                margin: -73px 0 0 25px;
                pointer-events: none;
                white-space: pre-line;
            }

            .production-rescue {
                margin: 10px 0 0 25px;
                width: 600px;
                height: 410px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                display: flex;
                background-image: url('../two/img/left.png');

                .rescue-rescueDuty {
                    width: 200px;
                    padding: 90px 5px 0 30px;
                }
            }

            .anotherTop {
                width: 500px;
                height: 85px;
                margin-left: 25px;
                background-image: url('../two/img/head.png');
                background-size: 100% 100%;
                background-position: no-position;
            }

            .anotherTreatment-table {
                width: 500px;
                margin-left: 25px;
                border-left: 1px solid #36ecff;

                .anotherTreatment {
                    width: 500px;
                    display: flex;

                    .anotherTreatment-left {
                        width: 140px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center; /* 水平居中 */
                        align-items: center;
                        border-right: 1px solid #36ecff;
                        border-bottom: 1px solid #36ecff;
                    }

                    .anotherTreatment-right {
                        width: 360px;
                        display: flex;
                        flex-wrap: wrap;

                        .anotherTreatment-box {
                            width: 90px;
                            display: flex;
                            justify-content: center; /* 水平居中 */
                            align-items: center;
                            border-right: 1px solid #36ecff;
                            border-bottom: 1px solid #36ecff;
                        }
                    }
                }
            }

            .production-power {
                margin: 10px auto;
                width: 280px;
                height: 300px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                display: flex;
                background-image: url('../two/img/right.png');

                .rescue-treatmentDuty {
                    padding: 75px 30px 0;
                }
            }

            .production-safetyDuty {
                margin: 10px auto;
                width: 250px;
                height: 220px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                background-image: url('../two/img/middle.png');

                .rescueDuty-text {
                    padding: 90px 0 0 280px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                }

                .rescue-safetyDuty {
                    padding: 55px 0 0 30px;
                }
            }
        }

        ::-webkit-scrollbar {
            display: none;
        }

        .rsearch {
            width: 1845px;
            font-size: 14px;
            line-height: 29px;
            position: absolute;
            white-space: pre-line;
            right: 25px;
            top: 10px;
            background-color: #252e3d;
            overflow: auto;
            overflow: -moz-scrollbars-none;
            z-index: 501;
            display: flex;
            flex-wrap: wrap;

            .production-top {
                height: 660px;
                width: 100%;
                background-image: url('../two/img/development/top.png');
                background-size: 100% 100%;
                background-position: no-position;
                position: relative;

                .top-title {
                    color: #36ecff;
                    font-size: 20px;
                    text-align: center;
                    font-weight: bold;
                    letter-spacing: 8px;
                    padding-top: 50px;
                }

                .production-close {
                    width: 35px;
                    height: 35px;
                    position: absolute;
                    right: 25px;
                    top: 10px;
                    background-image: url('../two/img/return.png');
                    background-size: 100% 100%;
                    background-position: no-position;
                }

                .production-detail {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    text-align: left;
                    line-height: 25px;
                    right: 220px;
                    top: 160px;
                }

                .production-aideduty {
                    color: #36ecff;
                    font-size: 14px;
                    line-height: 26px;
                    text-align: left;
                    position: absolute;
                    left: 240px;
                    top: 298px;
                }

                .production-commanderList2 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 807px;
                    top: 220px;
                }

                .production-commanderList3 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 807px;
                    top: 228px;
                }

                .production-commanderList1 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 807px;
                    top: 334px;
                }

                .production-aideList2 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 641px;
                    top: 360px;
                }

                .production-aideList1 {
                    color: #36ecff;
                    font-size: 14px;
                    position: absolute;
                    left: 560px;
                    top: 655px;
                }
            }

            .production-table {
                width: 600px;
                background-color: #252e3d;
                color: #fff;
                margin: -73px 0 0 25px;
                pointer-events: none;
                white-space: pre-line;
                text-align: center;
            }

            .production-rescue {
                margin: 10px 0 0 25px;
                width: 600px;
                height: 425px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                display: flex;
                background-image: url('../two/img/development/框3.png');

                .rescue-rescueDuty {
                    width: 200px;
                    padding: 120px 5px 0 30px;
                }
            }

            .anotherTop1 {
                width: 501px;
                height: 35px;
                margin-left: 25px;
                background-size: 100% 100%;
                background-image: url('../two/img/development/标题1.png');
                background-position: no-position;
            }

            .anotherTop2 {
                width: 601px;
                height: 35px;
                margin: -5px 0 0 25px;
                background-size: 100% 100%;
                background-image: url('../two/img/development/标题2.png');
                background-position: no-position;
            }

            .anotherTop3 {
                width: 501px;
                height: 35px;
                margin: -5px 0 0 25px;
                background-size: 100% 100%;
                background-image: url('../two/img/development/标题3.png');
                background-position: no-position;
            }

            .anotherTreatment-table {
                width: 500px;
                margin-left: 25px;
                border-left: 1px solid #36ecff;

                .anotherTreatment {
                    width: 500px;
                    display: flex;

                    .anotherTreatment-left {
                        width: 97px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center; /* 水平居中 */
                        align-items: center;
                        border-right: 1px solid #36ecff;
                        border-bottom: 1px solid #36ecff;
                    }

                    .anotherTreatment-right {
                        width: 403px;
                        display: flex;
                        flex-wrap: wrap;

                        .anotherTreatment-box {
                            width: 65px;
                            overflow: hidden;

                            .box-number {
                                width: 65px;
                                border-right: 1px solid #36ecff;
                                border-bottom: 1px solid #36ecff;
                            }
                        }
                    }
                }
            }

            .safetyTube-table {
                text-align: center;
                width: 600px;
                margin-left: 25px;
                border-left: 1px solid #36ecff;

                .anotherTreatment {
                    width: 600px;
                    display: flex;

                    .anotherTreatment-left {
                        width: 78px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center; /* 水平居中 */
                        align-items: center;
                        border-right: 1px solid #36ecff;
                        border-bottom: 1px solid #36ecff;
                    }

                    .anotherTreatment-right {
                        width: 522px;
                        display: flex;
                        flex-wrap: wrap;

                        .anotherTreatment-box {
                            width: 65.25px;
                            justify-content: center; /* 水平居中 */
                            align-items: center;
                            font-size: 12px;
                            line-height: 16px;

                            .box-number {
                                width: 65.25px;
                                height: 60px;
                                display: flex;
                                justify-content: center; /* 水平居中 */
                                align-items: center;
                                flex-direction: column;
                                border-right: 1px solid #36ecff;
                                border-bottom: 1px solid #36ecff;
                            }
                        }
                    }
                }
            }

            .production-power {
                margin: 10px auto;
                width: 420px;
                height: 420px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                display: flex;
                background-image: url('../two/img/development/框5.png');

                .rescue-treatmentDuty {
                    padding: 142px 20px 0;
                }
            }

            .production-safetyDuty {
                margin: 10px auto;
                width: 300px;
                height: 330px;
                background-color: #252e3d;
                color: #36ecff;
                background-size: 100% 100%;
                background-position: no-position;
                background-image: url('../two/img/development/框4.png');

                .rescueDuty-text {
                    padding: 90px 0 0 280px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                }

                .rescue-safetyDuty {
                    padding: 87px 0 0 30px;
                }
            }
        }

        ::-webkit-scrollbar {
            display: none;
        }

        .organ {
            text-align: center;
            width: 1845px;
            height: 950px;
            font-size: 14px;
            line-height: 29px;
            position: absolute;
            white-space: pre-line;
            text-align: left;
            right: 25px;
            top: 10px;
            background-image: url('../two/img/table.png');
            background-size: 100% 100%;
            background-position: no-position;
            z-index: 500;

            .close {
                width: 35px;
                height: 35px;
                position: absolute;
                right: 25px;
                top: 10px;
                background-image: url('../two/img/close.png');
                background-size: 100% 100%;
                background-position: no-position;
                z-index: 500;
            }

            .top-title {
                color: #36ecff;
                font-size: 20px;
                text-align: center;
                font-weight: bold;
                letter-spacing: 8px;
                margin-top: 50px;
            }

            .left-title {
                color: #ff8f40;
                font-weight: bold;
            }

            .command {
                color: #36ecff;
                font-size: 18px;
                position: absolute;
                left: 750px;
                top: 227px;
            }

            .command-title {
                font-size: 20px;
                position: absolute;
                font-weight: bold;
                left: 800px;
                top: 186px;
            }

            .command-detail {
                color: #36ecff;
                font-size: 14px;
                position: absolute;
                left: 90px;
                top: 205px;
            }

            .staff-title {
                font-size: 20px;
                position: absolute;
                font-weight: bold;
                left: 1328px;
                top: 225px;
            }

            .staff1-left {
                font-size: 14px;
                position: absolute;
                left: 1046px;
                top: 360px;
                line-height: 20px;
            }

            .staff1-right {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1159px;
                top: 310px;
            }

            .staff2-left {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1046px;
                top: 540px;
            }

            .staff2-right {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1159px;
                top: 530px;
            }

            .staff3-left {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1046px;
                top: 640px;
            }

            .staff3-right {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1159px;
                top: 625px;
            }

            .staff4-left {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1395px;
                top: 290px;
            }

            .staff4-right {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1506px;
                top: 267px;
            }

            .staff5-left {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1395px;
                top: 435px;
            }

            .staff5-right {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1506px;
                top: 390px;
            }

            .staff6-left {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1395px;
                top: 535px;
            }

            .staff6-right {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1506px;
                top: 526px;
            }

            .staff7-left {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1395px;
                top: 635px;
            }

            .staff7-right {
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 1506px;
                top: 625px;
            }

            .development-title {
                font-size: 22px;
                position: absolute;
                font-weight: bold;
                left: 110px;
                top: 798px;
                cursor: pointer;
            }

            .production-title {
                font-size: 22px;
                position: absolute;
                font-weight: bold;
                left: 775px;
                top: 798px;
                cursor: pointer;
            }

            .power-title {
                font-size: 22px;
                position: absolute;
                font-weight: bold;
                left: 1620px;
                top: 798px;
                cursor: pointer;
            }
        }
</style>
