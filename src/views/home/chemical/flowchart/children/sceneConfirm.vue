<template>
	<div id="scene-confirm">
		<h2><b>4. 现场确认</b></h2>
		<h3 v-if="showUser">气体/GD</h3>
		<h3 v-if="!showUser">液体/LEAK</h3>
		<template>
			<a-form-model
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
				v-if="showUser"
			>
				<p><b>4.1<span class="star">*</span>汇报人员</b></p>

				<div class="report-person">
					<a-form-model-item prop="notifier">
						<div class="box"><span class="left">姓名：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.notifier" placeholder="请输入确认人员姓名" :disabled="isDisabled" /></div></div>
					</a-form-model-item>

					<a-form-model-item prop="tel">
						<div class="box"><span class="left">分机: </span><div class="right"><a-input allowClear v-model="dynamicValidateForm.tel" placeholder="请输入分机号码" :disabled="isDisabled" /></div></div>
					</a-form-model-item>

					<a-form-model-item prop="notifyTime">
						<div class="box"><span class="left">时间：</span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.notifyTime" :disabled="isDisabled" /></div>
						</div>
					</a-form-model-item>

				</div>
				<p><b>4.2<span class="star">*</span>确认过程</b></p>

				

				<div class="fm-box"><span><span>4.2.1<span class="star">*</span>PGD区域入口环境量测，时间：</span></span><div class="right">
					<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.inletMeasureTime" :disabled="isDisabled" /></div>
				</div>
				<div style="padding-left: 40px">
					<a-form-model-item  prop="isInletPgdValue">
						<a-radio-group v-model="dynamicValidateForm.isInletPgdValue" name="radioGroup" :disabled="isDisabled || seeDisabled">
							<a-radio :value="1">
								PGD有读值
							</a-radio>
							<a-radio :value="0">
								PGD无读值
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
				</div>


				<div style="padding-left: 40px" v-if="dynamicValidateForm.isInletPgdValue === 1" class="fire-level">
					<div class="add-new-user">
						<a-button type="dashed" style="width: 20%" @click="controlPersonVisible1 = true"  :disabled="isDisabled">
							<a-icon type="plus" /> 添加PGD
						</a-button>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<a-button type="dashed" style="width: 20%" @click="controlPersonList1 = true">
							<a-icon type="menu" /> 查看PGD列表
						</a-button>
					</div>

					<p  v-if="dynamicValidateForm.isInletPgdValue === 1"><span class="star">*</span>PGD量测周界环境（四周）、MAU进气口和正在充填中的槽车作业区: </p>

					<div  v-if="dynamicValidateForm.isInletPgdValue === 1">
						<a-form-model-item  prop="isGirthPgdValue">
							<a-radio-group v-model="dynamicValidateForm.isGirthPgdValue" :disabled="isDisabled">
								<a-radio :value="1">
									PGD有读值，判断结果为外气干扰
								</a-radio>
								<a-radio :value="0">
									 PGD无读值
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div v-if="dynamicValidateForm.isGirthPgdValue === 1" class="add-new-user">
							<a-button type="dashed" style="width: 20%" @click="controlPersonVisible3 = true" :disabled="isDisabled">
								<a-icon type="plus" /> 添加PGD
							</a-button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<a-button type="dashed" style="width: 25%" @click="controlPersonList3 = true">
								<a-icon type="menu" /> 查看PGD列表
							</a-button>
						</div>
					</div>

					<p><span class="star">*</span>通报值班主管和风控主管: </p>

					<div class="check-group-list">
								<div class="box">
									<span>值班主管： <a-input style="width:20%" v-model="dynamicValidateForm.dutyCharge" :disabled="isDisabled"  /></span>
									<span>分机： <a-input style="width:20%" v-model="dynamicValidateForm.dutyChargeExt" :disabled="isDisabled"  /></span>
									<span>时间： <a-date-picker style="width:20%" :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.notifyDutyTime" :disabled="isDisabled" /></span>
								</div>
								<div class="box" style="margin: 15px 0">
									<span>风控主管： <a-input style="width:20%" v-model="dynamicValidateForm.sceneryCharge" :disabled="isDisabled"  /></span>
									<span>分机： <a-input style="width:20%" v-model="dynamicValidateForm.sceneryChargeExt" :disabled="isDisabled"  /></span>
									<span>时间： <a-date-picker style="width:20%" :valueFormat="valueFormat" show-time v-model="dynamicValidateForm.notifysceneryTime" :disabled="isDisabled" /></span>
								</div>
					</div>
					
					<div>
						<a-form-model-item  prop="isGasToxic">
							<a-radio-group v-model="dynamicValidateForm.isGasToxic" :disabled="isDisabled">
								<a-radio :value="1">
									干扰气体具有毒性/腐蚀性/易燃易爆性
								</a-radio>
								<a-radio :value="0">
									干扰气体不具有毒性/腐蚀性/易燃易爆性
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</div>
					<div  v-if="dynamicValidateForm.isGasToxic === 1">
						<div class="fm-box"><span><span><span class="star">*</span>全厂区环境量测，寻找无读值安全集合点，安全集合点位置：</span></span><div class="right">
							<a-input v-model="dynamicValidateForm.safeRallyPoint" :disabled="isDisabled"  /></div>
						</div>
						<div class="fm-box"><span><span><span class="star">*</span>通知值班主管请求疏散至安全集合点。</span></span>
						</div>
						<div class="fm-box"><span><span><span class="star">*</span>联系环保课，通知环保局，通知环保局时间：</span></span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.notifyEpaTime" :disabled="isDisabled" /></div>
						</div>
					</div>
					<div  v-if="dynamicValidateForm.isGasToxic === 0">
						<div class="fm-box"><span><span><span class="star">*</span>若之前有推送警报确认广播，则需发布虚惊广播，广播时间：</span></span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.radioTime" :disabled="isDisabled" /></div>
						</div>
						<div class="fm-box"><span><span>警报确认广播词：监控中心报告，监控中心报告，先前(☆☆)区域发生疑似气体泄漏，
                            经确认为外气干扰，现场人员请勿惊慌安心工作。（间隔1.5S，重复两次）</span></span>
						</div>
					</div>
				</div>
				<div class="fm-box"><span><span>4.2.2<span class="star">*</span>机台/报警点附近环境量测，时间：</span></span><div class="right">
					<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.cabinetMeasureTime" :disabled="isDisabled" /></div>
				</div>
				<div style="padding-left: 40px">
						<a-form-model-item  prop="isCabinetPgdValue">
							<a-radio-group v-model="dynamicValidateForm.isCabinetPgdValue" name="radioGroup" :disabled="isDisabled || seeDisabled">
								<a-radio :value="1">
									PGD有读值
								</a-radio>
								<a-radio :value="0">
									PGD无读值
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</div>


				<div style="padding-left: 40px" v-if="dynamicValidateForm.isCabinetPgdValue === 1" class="fire-level">
					<div class="add-new-user">
						<a-button type="dashed" style="width: 20%" @click="controlPersonVisible2 = true"  :disabled="isDisabled">
							<a-icon type="plus" /> 添加PGD
						</a-button>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<a-button type="dashed" style="width: 20%" @click="controlPersonList2 = true">
							<a-icon type="menu" /> 查看PGD列表
						</a-button>
					</div>

					<p  v-if="dynamicValidateForm.isCabinetPgdValue === 1"><span class="star">*</span>查看附近机台有无PM作业:</p>

					<div  v-if="dynamicValidateForm.isCabinetPgdValue === 1">
						<a-form-model-item  prop="isCabinetPmA">
							<a-radio-group v-model="dynamicValidateForm.isCabinetPmA" :disabled="isDisabled">
								<a-radio :value="1">
									有PM，机台编号：<a-input style="width:200px" v-model="dynamicValidateForm.machineNumberA" placeholder="请输入机台编号" :disabled="isDisabled"/>
								</a-radio>
								<a-radio :value="0">
									 无PM
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div v-if="dynamicValidateForm.isCabinetPmA === 1">
							<span class="star">*</span>查看PM使用物质，与干扰表比对有无干扰
						</div>
						<div v-if="dynamicValidateForm.isCabinetPmA === 1">
							<a-form-model-item   isCabinetPmA prop="isDisturbA">
								<a-radio-group v-model="dynamicValidateForm.isDisturbA" :disabled="isDisabled">
									<a-radio :value="1">
										有干扰，且PM擦拭位置量测到读值
									</a-radio>
									<a-radio :value="0">
										不干扰/（有干扰，但PM擦拭位置未量测到读值）
									</a-radio>
								</a-radio-group>
							</a-form-model-item>
						</div>
					</div>
					<div  v-if="dynamicValidateForm.isDisturbA === 1">
						<div class="fm-box"><span><span>判断结果：PM干扰导致GD发报，若有违规，现场纠正，开立危辨单</span></span></div>
						<div class="fm-box"><span><span><span class="star">*</span>若之前有推送警报确认广播，则需发布虚惊广播，广播时间：</span></span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.radioTimeA" :disabled="isDisabled" /></div>
						</div>
						<div class="fm-box"><span><span> 警报确认广播词：监控中心报告，监控中心报告，先前(☆☆)区域发生疑似气体泄漏，
                             经确认为虚惊事件，现场人员请勿惊慌安心工作。（间隔1.5S，重复两次）</span></span>
						</div>
					</div>
					<div  v-if="dynamicValidateForm.isDisturbA === 0 || dynamicValidateForm.isCabinetPmA === 0">
						<div class="fm-box"><span><span> 判断结果：真实泄漏，已泄漏到环境中</span></span>
						</div>
						<div class="fm-box"><span><span class="star">*</span>撤离现场，并进行管制</span>
						</div>
					</div>
				</div>
				
				<div style="padding-left: 40px" v-if="dynamicValidateForm.isCabinetPgdValue === 0" class="fire-level">

					<p><span class="star">*</span>查看附近机台有无PM作业:</p>

					<div>
						<a-form-model-item  prop="isCabinetPmB">
							<a-radio-group v-model="dynamicValidateForm.isCabinetPmB" :disabled="isDisabled">
								<a-radio :value="1">
									有PM，机台编号：<a-input style="width:200px" v-model="dynamicValidateForm.machineNumberB" placeholder="请输入机台编号" :disabled="isDisabled"/>
								</a-radio>
								<a-radio :value="0">
									 无PM
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div v-if="dynamicValidateForm.isCabinetPmB === 1">
							<p><span class="star">*</span>查看PM使用物质，与干扰表比对有无干扰</p>
						</div>
						<div>
							<a-form-model-item  prop="isDisturbB">
							<a-radio-group v-model="dynamicValidateForm.isDisturbB" :disabled="isDisabled">
								<a-radio :value="1">
									有干扰，且PM擦拭位置量测到读值
								</a-radio>
								<a-radio :value="0">
									不干扰/（有干扰，但PM擦拭位置未量测到读值）
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						</div>
					</div>
					<div  v-if="dynamicValidateForm.isDisturbB === 1">
						<div class="fm-box"><span><span>判断结果：PM干扰导致GD发报，若有违规，现场纠正，开立危辨单</span></span></div>
						<div class="fm-box"><span><span><span class="star">*</span>若之前有推送警报确认广播，则需发布虚惊广播，广播时间：</span></span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.radioTimeB" :disabled="isDisabled" /></div>
						</div>
						<div class="fm-box"><span><span> 警报确认广播词：监控中心报告，监控中心报告，先前(☆☆)区域发生疑似气体泄漏，
                             经确认为虚惊事件，现场人员请勿惊慌安心工作。（间隔1.5S，重复两次）</span></span>
						</div>
					</div>
					<div  v-if="dynamicValidateForm.isDisturbB === 0">
						<div class="fm-box"><span><span><span class="star">*</span>确认GD本体，采样管拔除、交换测试（持续3-5min）</span></span>
						</div>
						<a-form-model-item  prop="isGdShowValueA">
							<a-radio-group v-model="dynamicValidateForm.isGdShowValueA" :disabled="isDisabled">
								<a-radio :value="1">
									交换后未发报GD本体显示读值
								</a-radio>
								<a-radio :value="0">
									交换后未发报GD本体不显示读值
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div style="padding-left: 40px" v-if="dynamicValidateForm.isGdShowValueA === 0">
							<div class="fm-box"><span><span> 判断结果：GD本体故障，通知损防处理</span></span>
							</div>
							<div class="alarm-reason" v-if="dynamicValidateForm.date">
								<span style="width:30%">若之前有推送警报确认广播，则需发布虚惊广播，广播时间：</span><a-date-picker :valueFormat="valueFormat" style="width:30%" show-time  v-model="dynamicValidateForm.radioTimeC" :disabled="isDisabled" />
							</div>
							<p>  警报确认广播词：监控中心报告，监控中心报告，先前(☆☆)区域发生疑似气体泄漏，经确认为虚惊事件，现场人员请勿惊慌安心工作。
                                      （间隔1.5S，重复两次）</p>
						</div>
						<div style="padding-left: 40px" v-if="dynamicValidateForm.isGdShowValueA === 1">
							<div class="fm-box"><span><span> 判断结果：真实泄漏，未泄漏到环境中</span></span>
							</div>
							<div class="fm-box"><span><span><span class="star">*</span>在现场附近进行管制</span></span>
						</div>
						</div>
					</div>
					<div  v-if="dynamicValidateForm.isCabinetPmB === 0">
						<div class="fm-box"><span><span><span class="star">*</span>确认GD本体，采样管拔除、交换测试（持续3-5min）</span></span>
						</div>
						<a-form-model-item  prop="isGdShowValueB">
							<a-radio-group v-model="dynamicValidateForm.isGdShowValueB" :disabled="isDisabled">
								<a-radio :value="1">
									交换后未发报GD本体显示读值
								</a-radio>
								<a-radio :value="0">
									交换后未发报GD本体不显示读值
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<div style="padding-left: 40px" v-if="dynamicValidateForm.isGdShowValueB === 0">
							<div class="fm-box"><span><span> 判断结果：GD本体故障，通知损防处理</span></span>
							</div>
							<div class="alarm-reason">
								<span style="width:30%">若之前有推送警报确认广播，则需发布虚惊广播，广播时间：</span><a-date-picker :valueFormat="valueFormat" style="width:30%" show-time v-model="dynamicValidateForm.radioTimeD" :disabled="isDisabled"/>
							</div>
							<p>  警报确认广播词：监控中心报告，监控中心报告，先前(☆☆)区域发生疑似气体泄漏，经确认为虚惊事件，现场人员请勿惊慌安心工作。
                                      （间隔1.5S，重复两次）</p>
						</div>
						<div style="padding-left: 40px" v-if="dynamicValidateForm.isGdShowValueB === 1">
							<div class="fm-box"><span><span> 判断结果：真实泄漏，未泄漏到环境中</span></span>
							</div>
							<div class="fm-box"><span><span><span class="star">*</span>在现场附近进行管制</span></span>
						</div>
						</div>
					</div>
				</div>

				<div class="submit-btn">
					<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled ||seeDisabled">
						下一步
					</a-button>
					<a-button type="primary" style="margin-left: 20px" html-type="submit" @click="saveData()" :disabled="isDisabled">
                        保存
                    </a-button>
				</div>
			</a-form-model>
		</template>

		<template>
			<a-form-model
				ref="dynamicValidateForm"
				:model="dynamicValidateForm"
				:rules="rules"
				v-if="!showUser"
			>
				<p><b>4.1<span class="star">*</span>汇报人员</b></p>

				<div class="report-person">
					<a-form-model-item prop="notifier">
						<div class="box"><span class="left">姓名：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.notifier" placeholder="请输入确认人员姓名" :disabled="isDisabled" /></div></div>
					</a-form-model-item>

					<a-form-model-item prop="tel">
						<div class="box"><span class="left">分机: </span><div class="right"><a-input allowClear v-model="dynamicValidateForm.tel" placeholder="请输入分机号码" :disabled="isDisabled" /></div></div>
					</a-form-model-item>

					<a-form-model-item prop="notifyTime">
						<div class="box"><span class="left">时间：</span><div class="right">
							<a-date-picker :valueFormat="valueFormat" style="width:100%" show-time v-model="dynamicValidateForm.notifyTime" :disabled="isDisabled" /></div>
						</div>
					</a-form-model-item>

				</div>
				<p><b>4.2<span class="star">*</span>确认结果</b></p>
				<div style="padding-left: 40px">
					<a-form-model-item  prop="isRealDivulge">
						<a-radio-group v-model="dynamicValidateForm.isRealDivulge" name="radioGroup" :disabled="isDisabled || seeDisabled">
							<a-radio :value="1">
								真实泄漏 
							</a-radio>
							<a-radio :value="0">
								非真实泄漏/误警报
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
				</div>
				<div v-if="dynamicValidateForm.isRealDivulge == 1">
					<div>
						<a-form-model-item  prop="divulgeType" style="margin-left:40px">
							<a-radio-group v-model="dynamicValidateForm.divulgeType" :disabled="isDisabled">分类：
								<a-radio :value="1">
										酸
								</a-radio>
								<a-radio :value="2">
										碱
								</a-radio>
								<a-radio :value="3">
										有机
								</a-radio>
								<a-radio :value="4">
									其他：<a-input style="width:200px" v-model="dynamicValidateForm.divulgeTypeOther" placeholder="请输入" :disabled="isDisabled"/>
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</div>
					<div class="report-person1">
						<a-form-model-item prop="name">
							<div class="box"><span class="left">泄漏物质：</span><div class="right"><a-input allowClear v-model="dynamicValidateForm.divulgeMaterial" placeholder="请输入泄漏物质" :disabled="isDisabled" /></div></div>
						</a-form-model-item>

						<a-form-model-item prop="name">
							<div class="box"><span class="left">泄漏面积: </span><div class="right"><a-input allowClear style="width:220px" v-model="dynamicValidateForm.divulgeArea" placeholder="请输入泄漏面积" :disabled="isDisabled" /><span> m2</span></div></div>
						</a-form-model-item>
					</div>
					<div>
						<a-form-model-item  prop="divulgeSpeed" style="margin-left:40px">
							<a-radio-group v-model="dynamicValidateForm.divulgeSpeed" :disabled="isDisabled">泄漏速度：
								<a-radio :value="1">
									滴漏，<a-input style="width:80px" v-model="dynamicValidateForm.didSpeed"  :disabled="isDisabled"/><span> 滴/秒</span>
								</a-radio>
								<a-radio :value="2">
										流淌
								</a-radio>
								<a-radio :value="3">
										喷溅
								</a-radio>
								<a-radio :value="0">
									其他：<a-input style="width:200px" v-model="dynamicValidateForm.divulgeSpeedOther" :disabled="isDisabled"/>
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</div>
					<div class="check-group-list" style="margin-left:40px">
						<a-checkbox-group @change="listonChange">
								<a-form-model-item  prop="divulgeSource">
							<a-radio-group v-model="dynamicValidateForm.divulgeSource" >泄漏源：
								<div class="box"><a-radio value="1">设备机台

									<span v-if="dynamicValidateForm.divulgeSource == '1'">，编号：<a-input v-model="dynamicValidateForm.equipmentMachineNumber" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
								<div class="box"><a-radio value="2">管线
									<span v-if="dynamicValidateForm.divulgeSource == '2'">，管线标示：<a-input v-model="dynamicValidateForm.lineMarking" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
								<div class="box"><a-radio value="3">贮槽/桶/瓶罐
									<span v-if="dynamicValidateForm.divulgeSource == '3'">，阀门:<a-input v-model="dynamicValidateForm.valve" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
								<div class="box"><a-radio value="4">槽车
								</a-radio> 
								</div>
								<div class="box"><a-radio value="5">Exhaust
								</a-radio> 
								</div>
								<div class="box"><a-radio value="6">其他，
									<span v-if="dynamicValidateForm.divulgeSource == '6'"><a-input v-model="dynamicValidateForm.divulgeSourceOther" :disabled="isDisabled"  /></span>
								</a-radio> 
								</div>
							</a-radio-group>
						</a-form-model-item>
						</a-checkbox-group>
					</div>
					<div>
						<a-form-model-item  prop="hazardProfile" style="margin-left:40px">
							<a-radio-group v-model="dynamicValidateForm.hazardProfile" :disabled="isDisabled">危害特性： 
								<a-radio :value="1">
									毒性
								</a-radio>
								<a-radio :value="2">
										腐蚀性
								</a-radio>
								<a-radio :value="3">
										易燃性
								</a-radio>
								<a-radio :value="3">
										氧化性
								</a-radio>
								<a-radio :value="3">
										非易燃/非毒性
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
					</div>
					<div class="noticeBaseData-item" style="margin-bottom: 10px;margin-left:40px" >
						<div class="desc">人员受伤情况：</div>
						<div class="value">
							<a-form-model-item prop="injuries">
								<a-radio-group v-model="dynamicValidateForm.injuries" :disabled="isDisabled">
									<a-radio :value="0">
										无
									</a-radio>
									<a-radio :value="1">
										有，送保健室处理
									</a-radio>
								</a-radio-group>
							</a-form-model-item>
						</div>
					</div>
					<div class="woundedPerson" v-if="dynamicValidateForm.injuries === 1">
						<div class="add-new-user">
							<a-button type="dashed" style="width: 20%" @click="confirmPersonVisible = true" :disabled="isDisabled">
								<a-icon type="plus"/>
								添加受伤人员信息
							</a-button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<a-button type="dashed" style="width: 20%" @click="confirmPersonList = true">
								<a-icon type="menu"/>
								查看受伤人员列表
							</a-button>
						</div>
					</div>
					<div class="fm-box"><span><span><span class="star">*</span>在现场附近进行管制</span></span></div>
				</div>
				<div v-if="dynamicValidateForm.isRealDivulge == 0" style="margin-left:40px">
					<div class="alarm-reason">
						<span style="width:50px">原因：</span><a-input allowClear style="width:30%" v-model="dynamicValidateForm.falseAlarmCause" placeholder="请输入原因" :disabled="isDisabled" /><span style="width:30%"> ，若有违规情况，开立危辨单</span>
					</div>
					<div class="alarm-reason">
						<span style="width:50%">若之前有推送警报确认广播，则需发布虚惊广播，广播时间：</span><a-date-picker :valueFormat="valueFormat" style="width:30%" show-time v-model="dynamicValidateForm.radioTimeE" :disabled="isDisabled"/>
					</div>
					<p>   警报确认广播词：监控中心报告，监控中心报告，先前(☆☆)区域发生大量不明液体泄漏，经确认为
         				虚惊事件，现场人员请勿惊慌安心工作。（间隔1.5S，重复两次）</p>
				</div>
				<div class="submit-btn">
					<a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')" :disabled="isDisabled ||seeDisabled">
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
			title="添加受伤人信息"
			:visible="confirmPersonVisible"
			@ok="handleConfirmPerson"
			@cancel="confirmPersonVisible = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">部门/厂商：</span><div class="right"><a-input allowClear v-model="confirmPersonObj.dept" placeholder="请输入部门名称" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">姓名: </span><div class="right"><a-input allowClear v-model="confirmPersonObj.userName" placeholder="请输入姓名" /></div></div>
				<div class="box"><span class="left">受伤情况：</span><div class="right">
					<a-input allowClear v-model="confirmPersonObj.injuries" placeholder="请输入受伤情况" />
					</div>
				</div>
			</div>
		</a-modal>

		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加PGD"
			:visible="controlPersonVisible1"
			@ok="handleControlPerson1"
			@cancel="controlPersonVisible1 = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">PGD种类: </span><div class="right"><a-input allowClear v-model="controlPersonObj1.pgdType" placeholder="请输入PGD种类" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">sensor: </span><div class="right"><a-input allowClear v-model="controlPersonObj1.sensor" placeholder="请输入sensor" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">GD读值: </span><div class="right"><a-input allowClear style="width:93%" v-model="controlPersonObj1.readValue" placeholder="请输入GD读值" /><span class="left"> ppm</span></div></div>
			</div>
		</a-modal>
		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加PGD"
			:visible="controlPersonVisible2"
			@ok="handleControlPerson2"
			@cancel="controlPersonVisible2 = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">PGD种类: </span><div class="right"><a-input allowClear v-model="controlPersonObj2.pgdType" placeholder="请输入PGD种类" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">sensor: </span><div class="right"><a-input allowClear v-model="controlPersonObj2.sensor" placeholder="请输入sensor" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">GD读值: </span><div class="right"><a-input allowClear style="width:93%" v-model="controlPersonObj2.readValue" placeholder="请输入GD读值" /><span class="left"> ppm</span></div></div>
			</div>
		</a-modal>
		<a-modal
			destroyOnClose
			class="control-person-modal"
			title="添加PGD"
			:visible="controlPersonVisible3"
			@ok="handleControlPerson3"
			@cancel="controlPersonVisible3 = false">
			<div class="confirm-person">
				<div class="box" style="margin-bottom: 15px"><span class="left">PGD种类: </span><div class="right"><a-input allowClear v-model="controlPersonObj3.pgdType" placeholder="请输入PGD种类" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">sensor: </span><div class="right"><a-input allowClear v-model="controlPersonObj3.sensor" placeholder="请输入sensor" /></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">GD读值: </span><div class="right"><a-input allowClear style="width:93%" v-model="controlPersonObj3.readValue" placeholder="请输入GD读值" /><span class="left"> ppm</span></div></div>
				<div class="box" style="margin-bottom: 15px"><span class="left">位置: </span><div class="right"><a-input allowClear v-model="controlPersonObj3.location" placeholder="请输入位置" /></div></div>
			</div>
		</a-modal>
		<a-modal
			:width="1000"
			class="control-person-modal"
			title="PGD信息列表"
			:visible="controlPersonList1"
			@ok="controlPersonList1 = false"
			@cancel="controlPersonList1 = false">
			<a-table bordered :data-source="controlList1" :rowKey="(record,index)=>{return index}" :key="controlList1.pgdType" :columns="columns2"></a-table>
		</a-modal>
		<a-modal
			:width="1000"
			class="control-person-modal"
			title="PGD信息列表"
			:visible="controlPersonList2"
			@ok="controlPersonList2 = false"
			@cancel="controlPersonList2 = false">
			<a-table bordered :data-source="controlList2" :rowKey="(record,index)=>{return index}" :key="controlList2.pgdType" :columns="columns2"></a-table>
		</a-modal>
		<a-modal
			:width="1000"
			class="control-person-modal"
			title="PGD信息列表"
			:visible="controlPersonList3"
			@ok="controlPersonList3 = false"
			@cancel="controlPersonList3 = false">
			<a-table bordered :data-source="controlList3" :rowKey="(record,index)=>{return index}" :key="controlList3.pgdType" :columns="columns3"></a-table>
		</a-modal>

		<a-modal
			:width="1000"
			class="control-person-modal"
			title="受伤人信息列表"
			:visible="confirmPersonList"
			@ok="confirmPersonList = false"
			@cancel="confirmPersonList = false">
			<a-table bordered :data-source="confirmList" :rowKey="(record,index)=>{return index}" :key="confirmList.userName" :columns="columns"></a-table>
		</a-modal>


	</div>
</template>

<script>
	export default {
		name: "sceneConfirm",
		data() {
			return {
                valueFormat: "YYYY-MM-DD HH:mm:ss",
				confirmPersonVisible:false,
                isDisabled:false,
				foukId: null,
                seeDisabled:false,
				processInstanceId: localStorage.getItem('processInstanceId'),
				confirmPersonObj:{
					dept:null,
					userName:null,
					injuries:null
				},
				controlPersonVisible1:false,
				showUser:true,
				controlPersonVisible2:false,
				controlPersonVisible3:false,
				controlPersonObj1:{
					pgdType:'',
					sensor:'',
					readValue:'',
				},
				controlPersonObj2:{
					pgdType:'',
					sensor:'',
					readValue:'',
				},
				controlPersonObj3:{
					pgdType:'',
					sensor:'',
					readValue:'',
					location:'',
				},
				confirmPersonList:false,
				controlPersonList1:false,
				controlPersonList2:false,
				controlPersonList3:false,
				columns: [
					{
						title: '部门/厂商',
						dataIndex: 'dept',
					},
					{
						title: '姓名',
						dataIndex: 'userName',
					},
					{
						title: '受伤情况',
						dataIndex: 'injuries',
					}
				],
				columns2: [
					{
						title: 'PGD种类',
						dataIndex: 'pgdType',
					},
					{
						title: 'sensor',
						dataIndex: 'sensor',
					},
					{
						title: '读值',
						dataIndex: 'readValue',
					},
				],
				columns3: [
					{
						title: 'PGD种类',
						dataIndex: 'pgdType',
					},
					{
						title: 'sensor',
						dataIndex: 'sensor',
					},
					{
						title: '读值',
						dataIndex: 'readValue',
					},
					{
						title: '位置',
						dataIndex: 'location',
					},
				],
				rules: {
					fireOpen: [{ required: true, message: '请选择现场情况', trigger: 'change' }],
					fireLevel:[{ required: true, message: '请选择现场情况', trigger: 'change' }],
					notifier:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
					tel:[{ required: true, message: '请输入分机', trigger: 'blur' }],
					date:[{ required: true, message: '请选择时间', trigger: 'blur' }],
					notifyTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
					inletMeasureTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
					isGasToxic:[{ required: true, message: '请选择干扰气体是否有毒', trigger: 'blur' }],
					isGirthPgdValue:[{ required: true, message: '请选择周界环境PGD是否有读值', trigger: 'blur' }],
					isCabinetPgdValue:[{ required: true, message: '请选择机台附近环境PGD是否有读值', trigger: 'blur' }],
					isDisturbA:[{ required: true, message: '请选择是否有干扰', trigger: 'blur' }],
					isRealDivulge:[{ required: true, message: '请选择是否真实泄露', trigger: 'blur' }],
					divulgeType:[{ required: true, message: '请选择泄露分类', trigger: 'blur' }],
					divulgeSpeed:[{ required: true, message: '请选择泄露速度', trigger: 'blur' }],
					isDisturbB:[{ required: true, message: '请选择GD是否有读值', trigger: 'blur' }],
					isGdShowValueB:[{ required: true, message: '请选择GD是否有读值', trigger: 'blur' }],
					isGdShowValueA:[{ required: true, message: '请选择是否有干扰', trigger: 'blur' }],
					isCabinetPmA:[{ required: true, message: '请选择有无PM作业', trigger: 'blur' }],
					isCabinetPmB:[{ required: true, message: '请选择有无PM作业', trigger: 'blur' }],
					dutyCharge:[{ required: true, message: '请输入值班主管', trigger: 'blur' }],
					dutyChargeExt:[{ required: true, message: '请输入值班主管分机', trigger: 'blur' }],
					notifyDutyTime:[{ required: true, message: '请选择通报值班主管时间', trigger: 'blur' }],
					sceneryCharge:[{ required: true, message: '请输入风控主管', trigger: 'blur' }],
					sceneryChargeExt:[{ required: true, message: '请输入风控主管分机', trigger: 'blur' }],
					notifysceneryTime:[{ required: true, message: '请选择通报风控主管时间', trigger: 'blur' }],
					isInletPgdValue:[{ required: true, message: '请选择入口环境PGD是否有读值', trigger: 'blur' }],
					divulgeSource:[{ required: true, message: '请选择泄露源', trigger: 'blur' }],
					hazardProfile:[{ required: true, message: '请选择危害特性', trigger: 'blur' }],
					result:[{ required: true, message: '请选择时间', trigger: 'blur' }],
				},
				dynamicValidateForm: {
					notifier:'',
					fireLevel:'',
					fireOpen:'',
					falseAlarmCause:'',
					radioTimeE:'',
					result:'',
					notifyTime:'',
					inletMeasureTime:'',
					isGirthPgdValue:'',
					isCabinetPgdValue:'',
					isDisturbA:'',
					isDisturbB:'',
					divulgeType:'',
					divulgeSpeed:'',
					divulgeTypeOther:'',
					didSpeed:'',
					equipmentMachineNumber:'',
					valve:'',
					divulgeSourceOther:'',
					hazardProfile:'',
					lineMarking:'',
					divulgeSource:'',
					divulgeSpeedOther:'',
					divulgeArea:'',
					divulgeMaterial:'',
					isGdShowValueA:'',
					radioTimeA:'',
					radioTimeB:'',
					machineNumberA:'',
					isCabinetPmA:'',
					isCabinetPmB:'',
					isGdShowValueB:'',
					radioTimeD:'',
					isRealDivulge:'',
					machineNumberB:'',
					dutyCharge:'',
					dutyChargeExt:'',
					notifyDutyTime:'',
					sceneryCharge:'',
					sceneryChargeExt:'',
					safeRallyPoint:'',
					cabinetMeasureTime:'',
					radioTime:'',
					notifyEpaTime:'',
					isGasToxic:'',
					notifysceneryTime:'',
					isInletPgdValue:'',
					tel:'',
					
					date:'',
					type:'',
					typeA:'',
					list:{
						typeA:'',
						typeB:'',
						typeC:'',
						typeD:'',
						typeE:''
					}
				},
				variableObj:{
					seeHappended:0,
					seefire:0,
					fireOpen:null,
					result:null,
					fireLevel:null,
					locked:null
				},
				confirmList:[],
				controlList1:[],
				controlList2:[],
				controlList3:[]
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let data = {
							userName: this.dynamicValidateForm.name,
							ext: this.dynamicValidateForm.phone,
							inletMeasureTime: this.dynamicValidateForm.inletMeasureTime,
							isGirthPgdValue: this.dynamicValidateForm.isGirthPgdValue,
							isCabinetPgdValue: this.dynamicValidateForm.isCabinetPgdValue,
							isDisturbA: this.dynamicValidateForm.isDisturbA,
							radioTimeA: this.dynamicValidateForm.radioTimeA,
							radioTimeB: this.dynamicValidateForm.radioTimeB,
							machineNumberA: this.dynamicValidateForm.machineNumberA,
							isCabinetPmA: this.dynamicValidateForm.isCabinetPmA,
							isCabinetPmB: this.dynamicValidateForm.isCabinetPmB,
							isGdShowValueB: this.dynamicValidateForm.isGdShowValueB,
							radioTimeD: this.dynamicValidateForm.radioTimeD,
							isRealDivulge: this.dynamicValidateForm.isRealDivulge,
							isDisturbB: this.dynamicValidateForm.isDisturbB,
							divulgeType: this.dynamicValidateForm.divulgeType,
							divulgeTypeOther: this.dynamicValidateForm.divulgeTypeOther,
							notifier: this.dynamicValidateForm.notifier,
							tel: this.dynamicValidateForm.tel,
							notifyTime: this.dynamicValidateForm.notifyTime,
							didSpeed: this.dynamicValidateForm.didSpeed,
							equipmentMachineNumber: this.dynamicValidateForm.equipmentMachineNumber,
							valve: this.dynamicValidateForm.valve,
							divulgeSourceOther: this.dynamicValidateForm.divulgeSourceOther,
							hazardProfile: this.dynamicValidateForm.hazardProfile,
							lineMarking: this.dynamicValidateForm.lineMarking,
							divulgeSource: this.dynamicValidateForm.divulgeSource,
							divulgeSpeedOther: this.dynamicValidateForm.divulgeSpeedOther,
							divulgeSpeed: this.dynamicValidateForm.divulgeSpeed,
							divulgeArea: this.dynamicValidateForm.divulgeArea,
							radioTimeE: this.dynamicValidateForm.radioTimeE,
							divulgeMaterial: this.dynamicValidateForm.divulgeMaterial,
							isGdShowValueA: this.dynamicValidateForm.isGdShowValueA,
							machineNumberB: this.dynamicValidateForm.machineNumberB,
							dutyCharge: this.dynamicValidateForm.dutyCharge,
							dutyChargeExt: this.dynamicValidateForm.dutyChargeExt,
							notifyDutyTime: this.dynamicValidateForm.notifyDutyTime,
							sceneryCharge: this.dynamicValidateForm.sceneryCharge,
							sceneryChargeExt: this.dynamicValidateForm.sceneryChargeExt,
							safeRallyPoint: this.dynamicValidateForm.safeRallyPoint,
							cabinetMeasureTime: this.dynamicValidateForm.cabinetMeasureTime,
							radioTime: this.dynamicValidateForm.radioTime,
							notifyEpaTime: this.dynamicValidateForm.notifyEpaTime,
							isGasToxic: this.dynamicValidateForm.isGasToxic,
							notifySceneryTime: this.dynamicValidateForm.notifysceneryTime,
							isInletPgdValue: this.dynamicValidateForm.isInletPgdValue,
							processInstanceId: localStorage.getItem('processInstanceId'),
							pgdListA: this.controlList1,
							pgdListB: this.controlList3,
							pgdListC: this.controlList2,
							woundedPersonList: this.confirmList,
						}
						this.$http.post3('/chemSceneConfirm/executeProcess',data).then((res) => {
							let data = {
                                    processInstanceId:this.processInstanceId
                                }
                                this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                                    for(let i of res.data.data){
                                        if(i.taskKey == 'falseAlarm'){
											this.$router.push('/contingencyManage/event')
                                        }
                                        if(i.isFinish == '0'){
                                            this.$emit("changeComponent1Data", i.taskKey,res.data.data)
                                        }
                                    }
                                })
						})
						this.seeDisabled = true
					} else {
						return false;
					}
				});
			},
			saveData(){
						let data = {
							id: this.foukId,
							userName: this.dynamicValidateForm.name,
							ext: this.dynamicValidateForm.phone,
							inletMeasureTime: this.dynamicValidateForm.inletMeasureTime,
							isGirthPgdValue: this.dynamicValidateForm.isGirthPgdValue,
							machineNumberA: this.dynamicValidateForm.machineNumberA,
							isCabinetPgdValue: this.dynamicValidateForm.isCabinetPgdValue,
							isDisturbA: this.dynamicValidateForm.isDisturbA,
							radioTimeA: this.dynamicValidateForm.radioTimeA,
							radioTimeB: this.dynamicValidateForm.radioTimeB,
							isCabinetPmA: this.dynamicValidateForm.isCabinetPmA,
							isCabinetPmB: this.dynamicValidateForm.isCabinetPmB,
							isGdShowValueB: this.dynamicValidateForm.isGdShowValueB,
							radioTimeD: this.dynamicValidateForm.radioTimeD,
							isRealDivulge: this.dynamicValidateForm.isRealDivulge,
							isDisturbB: this.dynamicValidateForm.isDisturbB,
							divulgeType: this.dynamicValidateForm.divulgeType,
							divulgeTypeOther: this.dynamicValidateForm.divulgeTypeOther,
							notifier: this.dynamicValidateForm.notifier,
							tel: this.dynamicValidateForm.tel,
							notifyTime: this.dynamicValidateForm.notifyTime,
							didSpeed: this.dynamicValidateForm.didSpeed,
							equipmentMachineNumber: this.dynamicValidateForm.equipmentMachineNumber,
							valve: this.dynamicValidateForm.valve,
							divulgeSourceOther: this.dynamicValidateForm.divulgeSourceOther,
							hazardProfile: this.dynamicValidateForm.hazardProfile,
							lineMarking: this.dynamicValidateForm.lineMarking,
							divulgeSource: this.dynamicValidateForm.divulgeSource,
							divulgeSpeedOther: this.dynamicValidateForm.divulgeSpeedOther,
							divulgeSpeed: this.dynamicValidateForm.divulgeSpeed,
							divulgeArea: this.dynamicValidateForm.divulgeArea,
							radioTimeE: this.dynamicValidateForm.radioTimeE,
							divulgeMaterial: this.dynamicValidateForm.divulgeMaterial,
							isGdShowValueA: this.dynamicValidateForm.isGdShowValueA,
							machineNumberB: this.dynamicValidateForm.machineNumberB,
							dutyCharge: this.dynamicValidateForm.dutyCharge,
							dutyChargeExt: this.dynamicValidateForm.dutyChargeExt,
							notifyDutyTime: this.dynamicValidateForm.notifyDutyTime,
							sceneryCharge: this.dynamicValidateForm.sceneryCharge,
							sceneryChargeExt: this.dynamicValidateForm.sceneryChargeExt,
							safeRallyPoint: this.dynamicValidateForm.safeRallyPoint,
							cabinetMeasureTime: this.dynamicValidateForm.cabinetMeasureTime,
							radioTime: this.dynamicValidateForm.radioTime,
							notifyEpaTime: this.dynamicValidateForm.notifyEpaTime,
							isGasToxic: this.dynamicValidateForm.isGasToxic,
							notifySceneryTime: this.dynamicValidateForm.notifysceneryTime,
							isInletPgdValue: this.dynamicValidateForm.isInletPgdValue,
							discoveryTime: this.dynamicValidateForm.time,
							radioLaunch: this.dynamicValidateForm.fireOpen,
							radioLaunchTime: this.dynamicValidateForm.date,
							realAlarm: this.dynamicValidateForm.result,//22222222222222222222
							processInstanceId: localStorage.getItem('processInstanceId'),
							pgdListA: this.controlList1,
							pgdListB: this.controlList3,
							pgdListC: this.controlList2,
							woundedPersonList: this.confirmList,
						}
						this.$http.post3('/chemSceneConfirm/saveOrUpdate',data).then((res) => {
						})
			},
			viewData(){
				if( localStorage.getItem('seeLeak') == 1){
					this.showUser = true;
				}else if( localStorage.getItem('seeLeak') == 2){
					this.showUser = false;
				}
				this.$http.get3('/chemSceneConfirm/queryOne?processInstanceId='+ localStorage.getItem('processInstanceId')).then((res) => {
					if (res.data.data){
					let tempData = res.data.data;
					if(tempData && tempData.id){
                        this.foukId = tempData.id
                    }
					this.dynamicValidateForm.isInletPgdValue = tempData.isInletPgdValue,
					this.dynamicValidateForm.inletMeasureTime = tempData.inletMeasureTime,
					this.dynamicValidateForm.isGirthPgdValue = tempData.isGirthPgdValue,
					this.dynamicValidateForm.isCabinetPgdValue = tempData.isCabinetPgdValue,
					this.dynamicValidateForm.isDisturbA = tempData.isDisturbA,
					this.dynamicValidateForm.radioTimeA = tempData.radioTimeA,
					this.dynamicValidateForm.radioTimeB = tempData.radioTimeB,
					this.dynamicValidateForm.machineNumberA = tempData.machineNumberA,
					this.dynamicValidateForm.isCabinetPmA = tempData.isCabinetPmA,
					this.dynamicValidateForm.isCabinetPmB = tempData.isCabinetPmB,
					this.dynamicValidateForm.isGdShowValueB = tempData.isGdShowValueB,
					this.dynamicValidateForm.radioTimeD = tempData.radioTimeD,
					this.dynamicValidateForm.isRealDivulge = Number(tempData.isRealDivulge),
					this.dynamicValidateForm.injuries = Number(tempData.injuries),
					this.dynamicValidateForm.isDisturbB = tempData.isDisturbB,
					this.dynamicValidateForm.divulgeType = Number(tempData.divulgeType),
					this.dynamicValidateForm.divulgeTypeOther = tempData.divulgeTypeOther,
					this.dynamicValidateForm.notifier = tempData.notifier,
					this.dynamicValidateForm.tel = tempData.tel,
					this.dynamicValidateForm.notifyTime = tempData.notifyTime,
					this.dynamicValidateForm.didSpeed = tempData.didSpeed,
					this.dynamicValidateForm.equipmentMachineNumber = tempData.equipmentMachineNumber,
					this.dynamicValidateForm.valve = tempData.valve,
					this.dynamicValidateForm.divulgeSourceOther = tempData.divulgeSourceOther,
					this.dynamicValidateForm.hazardProfile = Number(tempData.hazardProfile),
					this.dynamicValidateForm.lineMarking = tempData.lineMarking,
					this.dynamicValidateForm.divulgeSource = Number(tempData.divulgeSource),
					this.dynamicValidateForm.divulgeSpeedOther = tempData.divulgeSpeedOther,
					this.dynamicValidateForm.divulgeSpeed = Number(tempData.divulgeSpeed),
					this.dynamicValidateForm.divulgeArea = tempData.divulgeArea,
					this.dynamicValidateForm.radioTimeE = tempData.radioTimeE,
					this.dynamicValidateForm.divulgeMaterial = tempData.divulgeMaterial,
					this.dynamicValidateForm.isGdShowValueA = tempData.isGdShowValueA,
					this.dynamicValidateForm.machineNumberB = tempData.machineNumberB,
					this.dynamicValidateForm.dutyCharge = tempData.dutyCharge,
					this.dynamicValidateForm.dutyChargeExt = tempData.dutyChargeExt,
					this.dynamicValidateForm.notifyDutyTime = tempData.notifyDutyTime,
					this.dynamicValidateForm.sceneryCharge = tempData.sceneryCharge,
					this.dynamicValidateForm.sceneryChargeExt = tempData.sceneryChargeExt,
					this.dynamicValidateForm.safeRallyPoint = tempData.safeRallyPoint,
					this.dynamicValidateForm.cabinetMeasureTime = tempData.cabinetMeasureTime,
					this.dynamicValidateForm.notifyEpaTime = tempData.notifyEpaTime,
					this.dynamicValidateForm.isGasToxic = tempData.isGasToxic,
					this.dynamicValidateForm.notifysceneryTime = tempData.notifySceneryTime
					if(tempData.pgdListA){
						this.controlList1 = tempData.pgdListA
					}
					if(tempData.pgdListB){
						this.controlList2 = tempData.pgdListB
					}
					if(tempData.pgdListC){
						this.controlList3 = tempData.pgdListC
					}
					this.dynamicValidateForm.locked = Number(tempData.trappeds),
					this.dynamicValidateForm.type = tempData.fireType,
					this.dynamicValidateForm.typeA = tempData.burningMaterial,
					this.dynamicValidateForm.falseAlarmCause = tempData.falseAlarmCause,
					this.confirmList = tempData.woundedPersonList
					let data = {
                        processInstanceId:this.processInstanceId
                    }
                    this.$http.get3('/chem/disposal/process/config/taskKeyList', data).then(res => {
                        for(let i of res.data.data){
                            if(i.isFinish == '1' && i.taskKey =='sceneConfirm'){
                                this.isDisabled = true
                            }
							if(i.isFinish == '1' && i.taskKey =='sceneConfirm'){
                                this.seeDisabled = true
                            }
                        }
                    })
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			// 灾害类型勾选
			listonChange(checkedValues) {
			},
			confirmPersonChange(e,val){// 确认人信息---时间
				this.dynamicValidateForm.date = val
			},
			seeWhatHappend(e){
				this.variableObj.fireOpen = e.target.value // => 看到现场情况 、、 看不到现场情况的切换
			},
			seeResult(e){
				this.variableObj.result = e.target.value // => 看到现场情况 、、 看不到现场情况的切换
			},
			seeFire(e){
				this.variableObj.seefire = e.target.value // => 火势大小的切换
			},
			seeLocked(e){
				this.variableObj.locked = e.target.value // => 火势大小的切换
			},
			seeFireLevel(e){
				this.variableObj.fireLevel = e.target.value // => 火势大小的切换
			},
			confirmReport(e,val){
				this.dynamicValidateForm.time = val
			},
			handleConfirmPerson(){
				if(this.confirmPersonObj.userName){
					this.confirmList.push({
						dept: this.confirmPersonObj.dept,
						userName: this.confirmPersonObj.userName,
						injuries: this.confirmPersonObj.injuries
					})
					this.confirmPersonVisible = false
				}else{
					this.$message('error','受伤人姓名不能为空！')
				}
			},
			handleControlPerson1(){
				if(this.controlPersonObj1.pgdType){
					this.controlList1.push({
						pgdType:this.controlPersonObj1.pgdType,
						readValue:this.controlPersonObj1.readValue,
						sensor:this.controlPersonObj1.sensor,
					})
					this.controlPersonVisible1 = false
				}else{
					this.$message('error','PGD种类不能为空！')
				}
			},
			handleControlPerson2(){
				if(this.controlPersonObj2.pgdType){
					this.controlList2.push({	
						pgdType:this.controlPersonObj2.pgdType,
						readValue:this.controlPersonObj2.readValue,
						sensor:this.controlPersonObj2.sensor,
					})
					this.controlPersonVisible2 = false
				}else{
					this.$message('error','PGD种类不能为空！')
				}
			},
			handleControlPerson3(){
				if(this.controlPersonObj3.pgdType){
					this.controlList3.push({
						pgdType:this.controlPersonObj3.pgdType,
						readValue:this.controlPersonObj3.readValue,
						sensor:this.controlPersonObj3.sensor,
						location:this.controlPersonObj3.location,
					})
					this.controlPersonVisible3 = false
				}else{
					this.$message('error','PGD种类不能为空！')
				}
			}
		},
        mounted(){
            this.viewData()
        }
	}
</script>

<style lang="stylus" scoped>
	#scene-confirm
		// border 1px solid #2c3e50
		padding 10px
		// margin 20px
		width calc(100% - 40px)
		height 780px
		text-align left
		.star 
			color:#f5222d
			font-size: 14px
			font-family: SimSun, sans-serif
			margin-right: 4px
		.alarm-reason
			display flex
			align-items center
			margin-bottom 10px
			span
				width 80px
			.ant-input
				width 400px
		.report-person
			display flex
			justify-content space-between
			align-items center
			padding-left 40px
			.ant-form-item
				width 32.5%
				.box
					width 100%
					display flex
					align-items center
					.left
						width 50px
					.right
						width calc(100% - 50px)
		.report-person1
			display flex
			align-items center
			padding-left 40px
			.ant-form-item
				width 48%
				margin-right 20px
				.box
					width 100%
					display flex
					align-items center
					.left
						width 90px
					.right
						width calc(100% - 90px)
		.fm-box
			display flex
			align-items center
			margin-bottom 20px
			font-weight:bold
			padding-left 40px




		.confirm-person-modal
			.confirm-person
				.box
					margin-bottom 15px
		/*.ant-form-item*/
		/*	padding-left 40px*/
		.add-new-user
			display flex
			justify-content center
			margin-bottom 20px
		.list
			.list-item
				display flex
				align-items center
				margin-bottom 10px
				.ant-form-item
					width 31%
					margin-bottom 0
					.box
						width 100%
						display flex
						justify-content flex-start
						align-items center
						.right
							width calc(100% - 60px)
						.left
							width 50px
		.second-step
			padding-left 40px
			.fire-radio-group
				margin-top 10px
				display flex
				flex-direction column
				.ant-radio-wrapper
					margin 5px 0
		.big-fire
			display flex
			justify-content space-between
			flex-direction column
			padding-left 40px
			.items
				width 280px
				display flex
				justify-content space-between
				align-items center
		.submit-btn
			display flex
			justify-content center
			margin-top 20px

</style>
<style lang="stylus">
	#scene-confirm
		.box
			.ant-calendar-picker
				width 100%
		.check-group-list
			.ant-col
				margin-bottom 15px
			.ant-checkbox-wrapper
				display flex
				align-items center
				.box
					display flex
					align-items center
					span
						width 300px
</style>
