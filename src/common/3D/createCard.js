//点击楼层单个设备的卡片
export function createDeviceBoard(type,cb,res) {
	console.log(res)
	if(!res || res.length < 1) return

	function statusToText(status) {
		switch (status) {
			case '0':
				return '其他'
			case '1':
				return '报警'
			case '2':
				return '故障'
			case '3':
				return '屏蔽'
			case '4':
				return '联动'
			case '5':
				return '隔离'
			case '6':
				return '预警'
			case '7':
				return '离线'
			case '9':
				return '正常'
			case '10':
				return '门禁开'
			case '11':
				return '门禁关'
			case '12':
				return '门禁常开'
			case '13':
				return '门禁常关'
			case '14':
				return '开门超时'
			default:
				return 'N/A'
		}
	}

	switch (type) {
		case 'tagBoard':
			let temp = `<div class="test" style="position:relative;width: 200px;height: 120px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
			    <div class="board" style="width: 200px;height: 120px;font-size: 14px">
			        <div  style="display: flex;margin-bottom: 2px;padding-top:10px;">
				        <div  style="width: 110px;text-align: right;color: #FFFFFF">设备类型：</div>
				        <div  style="color: #FFFF00">类型一</div>
			        </div>
			        <div  style="display: flex;margin-bottom: 2px">
				        <div  style="width: 110px;text-align: right;color: #FFFFFF">存储位置：</div>
				        <div  style="color: #00FFFF">11</div>
			        </div>
			        <div  style="display: flex;margin-bottom: 2px">
				        <div  style="width: 110px;text-align: right;color: #FFFFFF">当前储量：</div>
				        <div  style="color: #00FFFF">22</div>
			        </div>
			        <div  style="display: flex;margin-bottom: 2px">
				        <div style="width: 110px;text-align: right;color: #FFFFFF">状态：</div>
				        <div  style="color: #00FFFF">33</div>
			        </div>
			    </div>
			</div>`
			let chemicalDiv = document.createElement('div');   // 创建节点
			chemicalDiv.setAttribute("id", "chemical");   // 设置属性
			chemicalDiv.innerHTML = temp;   // 设置text值
			document.body.appendChild(chemicalDiv);   // 添加节点
			return chemicalDiv
		case 'door':
			let temp2 = `
				<div class="test" style="position:relative;width: 300px;height: 230px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 300px;height: 230px;font-size: 14px;padding:10px;">
				        <div style="display: flex;margin-bottom: 5px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">门禁名称：</div>
					        <div style="color: #FFFF00;width: calc(100% - 80px);text-align: left">${res.name ? res.name:'N/A'}</div>
				        </div>
				        <div style="display: flex;margin-bottom: 5px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">门禁编号：</div>
					        <div style="color: #00FFFF">${res.equipMessage?res.equipMessage:'N/A'}</div>
				        </div>
				        <div style="display: flex;margin-bottom: 5px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">门禁状态：</div>
					        <div style="color:${Number(res.equipState) > 8 && Number(res.equipState) < 13 ? '#00FFFF':'#c51a1b'};font-weight: bold">${statusToText(res.equipState)}</div>
				        </div>
				         <div style="display: flex;justify-content: space-around;margin-bottom: 5px;width:100%;">
					        <button id="open-btn" style="display: ${(res.equipState === '11' || res.equipState === '9') ? 'block' : 'none'};width: 70px;height: 30px;margin-right:10px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">打开</button>
					        <button id="open-always-btn" style="display: ${(res.equipState === '11' || res.equipState === '9') ? 'block' : 'none'};width: 70px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">常开</button>
					        <button id="close-btn" style="display: ${(res.equipState === '10' || res.equipState === '12') ? 'block' : 'none'};width: 70px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">关闭</button>
				         </div>
				    </div>
				</div>`
			let chemicalDiv2 = document.createElement('div');   // 创建节点
			chemicalDiv2.setAttribute("id", "chemical");   // 设置属性
			chemicalDiv2.innerHTML = temp2;   // 设置text值
			document.body.appendChild(chemicalDiv2);   // 添加节点

			document.getElementById('open-btn').addEventListener('click',function () {
				cb(10)
			})
			document.getElementById('open-always-btn').addEventListener('click',function () {
				cb(12)
			})
			document.getElementById('close-btn').addEventListener('click',function () {
				cb(11)
			})
			return chemicalDiv2
		case 'gate':
			console.log(55555555555)
			let gateTemp = `
				<div class="test" style="position:relative;width: 300px;height: 230px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 300px;height: 230px;font-size: 14px;padding:10px;">
				        <div style="display: flex;margin-bottom: 5px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">闸机名称：</div>
					        <div style="color: #FFFF00;width: calc(100% - 80px);text-align: left">${res.name ? res.name:'N/A'}</div>
				        </div>
				        <div style="display: flex;margin-bottom: 5px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">闸机编号：</div>
					        <div style="color: #00FFFF">${res.equipMessage?res.equipMessage:'N/A'}</div>
				        </div>
				        <div style="display: flex;margin-bottom: 5px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">闸机状态：</div>
					        <div style="color: #00FFFF">${statusToText(res.equipState)}</div>
				        </div>
				         <div style="display: flex;justify-content: space-between;margin-bottom: 5px;width:100%;">
				            <button id="gate-in" style="width: 60px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">刷进</button>
					        <button id="gate-out" style="width: 60px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">刷出</button>
					        <button id="gate-open" style="width: 60px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">常开</button>
					        <button id="gate-close" style="width: 60px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">关闭</button>
				         </div>
				    </div>
				</div>`
			let gateDiv2 = document.createElement('div');   // 创建节点
			gateDiv2.setAttribute("id", "gateDiv2");   // 设置属性
			gateDiv2.innerHTML = gateTemp;   // 设置text值
			document.body.appendChild(gateDiv2);   // 添加节点

			document.getElementById('gate-in').addEventListener('click',function () {
				cb(10)
			})
			document.getElementById('gate-out').addEventListener('click',function () {
				cb(12)
			})
			document.getElementById('gate-open').addEventListener('click',function () {
				cb(11)
			})
			document.getElementById('gate-close').addEventListener('click',function () {
				cb(12)
			})
			console.log(44444444444)
			return gateDiv2
		case 'camera':
			let temp3 = `
				<div class="test" style="position:relative;width: 300px;height: 230px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 300px;height: 230px;font-size: 16px;padding:10px;">
				        <div style="display: flex;margin-bottom: 5px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">监控名称：</div>
					        <div style="color: #FFFF00;width: calc(100% - 80px);text-align: left">${res.monitorPos ?res.monitorPos:'N/A' }</div>
				        </div>
					        <div style="display: flex;margin-bottom: 5px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备编号：</div>
					        <div style="color: #00FFFF">${(res.equipMessage === '' || !res.equipMessage) ? 'N/A' : res.equipMessage}</div>
					    </div>
				        <div style="display: flex;margin-bottom: 5px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备状态：</div>
					        <div style="color: ${res.equipState === '9'? '#00FFFF':'#FF0000'}">${res.equipState === '9'? '正常':'异常'}</div>
				        </div>
				        <div><button id="prev-btn" style="width: 100px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .2);cursor: pointer">打开监控</button></div>
				    </div>
				</div>`
			let chemicalDiv3 = document.createElement('div');   // 创建节点
			chemicalDiv3.setAttribute("id", "chemical");   // 设置属性
			chemicalDiv3.innerHTML = temp3;   // 设置text值
			document.body.appendChild(chemicalDiv3);   // 添加节点
			document.getElementById('prev-btn').addEventListener('click',function () {
				cb()
			})
			return chemicalDiv3
		case 'other':
			let tempSmoke = `
				<div class="test" style="position:relative;width: 200px;height: 180px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 200px;height: 180px;font-size: 16px;padding:10px">
				        <div style="display: flex;margin-bottom: 10px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备名称：</div>
					        <div style="color: #FFFF00">测试设备</div>
				        </div>
				        <div style="display: flex;margin-bottom: 10px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备编号：</div>
					        <div style="color: #00FFFF">N/A</div>
				        </div>
				        <div style="display: flex;margin-bottom: 2px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备状态：</div>
					        <div style="color: #00FFFF">N/A</div>
				        </div>
				    </div>
				</div>`
			let smokeDiv = document.createElement('div');   // 创建节点
			smokeDiv.setAttribute("id", "other");   // 设置属性
			smokeDiv.innerHTML = tempSmoke;   // 设置text值
			document.body.appendChild(smokeDiv);   // 添加节点
			return smokeDiv;
		case 'gui':
			let tempSmoke2 = `
				<div class="test" style="position:relative;width: 200px;height: 180px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 200px;height: 180px;font-size: 16px;padding:10px">
				        <div style="display: flex;margin-bottom: 10px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备名称：</div>
					        <div style="color: #FFFF00">测试设备</div>
				        </div>
				        <div style="display: flex;margin-bottom: 10px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备编号：</div>
					        <div style="color: #00FFFF">N/A</div>
				        </div>
				        <div style="display: flex;margin-bottom: 2px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备状态：</div>
					        <div style="color: #00FFFF">N/A</div>
				        </div>
				    </div>
				</div>`
			let smokeDiv2 = document.createElement('div');   // 创建节点
			smokeDiv2.setAttribute("id", "gui");   // 设置属性
			smokeDiv2.innerHTML = tempSmoke2;   // 设置text值
			document.body.appendChild(smokeDiv2);   // 添加节点
			return smokeDiv2
		case 'smokeDetector':
			let tempSmoke3 = `
				<div class="test" style="position:relative;width: 200px;height: 180px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 200px;height: 180px;font-size: 16px;padding:10px">
				        <div style="display: flex;margin-bottom: 10px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备名称：</div>
					        <div style="color: #FFFF00">烟感</div>
				        </div>
				        <div style="display: flex;margin-bottom: 10px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备编号：</div>
					        <div style="color: #00FFFF">${res.en}</div>
				        </div>
				        <div style="display: flex;margin-bottom: 2px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备状态：</div>
					        <div style="color: #00FFFF">${res.name}</div>
				        </div>
				    </div>
				</div>`
			let smokeDiv3 = document.createElement('div');   // 创建节点
			smokeDiv3.setAttribute("id", "tempSmoke3");   // 设置属性
			smokeDiv3.innerHTML = tempSmoke3;   // 设置text值
			document.body.appendChild(smokeDiv3);   // 添加节点
			return smokeDiv3
		case 'GD':
			let tempSmoke4 = `
				<div class="test" style="position:relative;width: 200px;height: 180px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 200px;height: 180px;font-size: 16px;padding:10px">
				        <div style="display: flex;margin-bottom: 10px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备名称：</div>
					        <div style="color: #FFFF00">GD</div>
				        </div>
				        <div style="display: flex;margin-bottom: 10px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备编号：</div>
					        <div style="color: #00FFFF">${res.equipMessage}</div>
				        </div>
				        <div style="display: flex;margin-bottom: 2px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备状态：</div>
					        <div style="color:${Number(res.equipState) > 8 && Number(res.equipState) < 13 ? '#00FFFF':'#c51a1b'};font-weight: bold">${statusToText(res.equipState)}</div>
				        </div>
				    </div>
				</div>`
			let smokeDiv4 = document.createElement('div');   // 创建节点
			smokeDiv4.setAttribute("id", "tempSmoke4");   // 设置属性
			smokeDiv4.innerHTML = tempSmoke4;   // 设置text值
			document.body.appendChild(smokeDiv4);   // 添加节点
			return smokeDiv4
		case 'LEAK':
			console.log('进入leak----------------')
			let tempSmoke5 = `
				<div class="test" style="position:relative;width: 200px;height: 180px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 200px;height: 180px;font-size: 14px;padding:5px">
				        <div style="display: flex;margin-bottom: 10px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备名称：</div>
					        <div style="color: #FFFF00">LEAK</div>
				        </div>
				        <div style="display: flex;margin-bottom: 10px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">回路线段：</div>
					        <div style="color: #00FFFF">${res.loop}/${res.lineSegment}</div>
				        </div>
				        <div style="display: flex;margin-bottom: 2px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备状态：</div>
					        <div style="color:${Number(res.leakStatus) > 8 && Number(res.leakStatus) < 13 ? '#00FFFF':'#c51a1b'};font-weight: bold">${statusToText(res.leakStatus)}</div>
				        </div>
				    </div>
				</div>`
			let smokeDiv5 = document.createElement('div');   // 创建节点
			smokeDiv5.setAttribute("id", "tempSmoke5");   // 设置属性
			smokeDiv5.innerHTML = tempSmoke5;   // 设置text值
			document.body.appendChild(smokeDiv5);   // 添加节点
			return smokeDiv5
	}
}

//点击 主园区级 同类卡片
export function createChemical(baseData, type) {
	switch (type) {
        //化学品存储
		case 'chemical':
			let chemicalTemp = `
				<div class="test" style="position:relative;width: 1000px;left:500px;color:#FFFFFF;background-color: rgba(10,29,48,.8);border: 1px solid #BBBBBB;border-radius: 10px;padding:10px">
					<div class="header" style="width: 100%;height: 50px;line-height:50px;font-size: 30px;background-color: rgba(8,28,33,.8);
								display: flex;justify-content: space-between;padding: 0 20px">
						<div style="width: 35%;text-align: left;margin-right: 2%">化学品存储类型</div>
						<div style="width: 25%;text-align: left;margin-right: 2%">存储位置</div>
						<div style="width: 25%;text-align: left">当前存储</div>
						<div style="width: 10%;text-align: left">状态</div>
					</div>
					${baseData.map(item =>{
						return `
							<div class="body" style="width: 100%;line-height:50px;font-size: 30px;
	                            display: flex;justify-content: space-between;padding: 0 20px;border-top:1px solid #FFFFFF ">
				                <div style="width: 35%;text-align: left;margin-right: 2%">${item.chemicalType}</div>
								<div style="width: 25%;text-align: left;margin-right: 2%">${item.storageLocation}</div>
								<div style="width: 25%;text-align: left">${item.labst}</div>
								<div style="width: 10%;text-align: left">${item.labst}</div>
							</div>`
					}).join('')}
				</div>`;
			let chemicalCountDiv = document.createElement('div');   // 创建节点
			chemicalCountDiv.setAttribute("id", "chemicalCountDiv");   // 设置属性
			chemicalCountDiv.innerHTML = chemicalTemp;   // 设置text值
			document.body.appendChild(chemicalCountDiv);   // 添加节点
			return chemicalCountDiv;
        //工单
		case 'workOrder':
            let workOrderTemp = `
				<div class="header" style="position:relative;left:500px;color:#FFFFFF;width: 400px;height: 50px;line-height:50px;
                    font-size: 26px;background-color: rgba(10,29,48,.8);display: flex;padding: 0 20px">
                    <div style="width: 80%;text-align: left">工单类型</div>
                    <div style="width: 20%;text-align: left">数量</div>
			    </div>
                <div id="workOrderParent" style="position:relative;left:500px;color:#FFFFFF;width: 400px;height:210px;overflow-y: scroll;background-color: rgba(10,29,48,.8);">
                    <div id="workOrderChildren" style="width: 100%;height: auto;">
                        ${baseData.map(item =>{
                        return `<div class="body" style="width: 100%;height: 50px;line-height:50px;font-size: 26px;display: flex;justify-content: space-between;padding: 0 20px">
                                <div style="width: 80%;text-align: left">${(item.applyOperation === 'AW' ? '高处':'')
                                        || (item.applyOperation === 'FI' ? '消防中断':'')
                                        || (item.applyOperation === 'FW' ? '动火':'')
                                        || (item.applyOperation === 'LW' ? '有限':'')
                                        || (item.applyOperation === 'RS' ? '吊挂':'')
                                        || (item.applyOperation === 'FG' ? 'GD&Leak':'')}
                                </div>
                                <div style="width: 20%;text-align: left;padding-left: 8px">${item.total}</div>
                                </div>`
                    }).join('')}
                    </div>
		        </div>`;
            let workOrderDiv = document.createElement('div');   // 创建节点
            workOrderDiv.setAttribute("id", "workOrderDiv");   // 设置属性
            workOrderDiv.innerHTML = workOrderTemp;   // 设置text值
            document.body.appendChild(workOrderDiv);   // 添加节点
            let workOrderParent = document.getElementById('workOrderParent');
            let workOrderChildren = document.getElementById('workOrderChildren');
            setInterval(function () {
                if(workOrderParent.scrollTop>=workOrderChildren.clientHeight-workOrderParent.clientHeight){
                    workOrderParent.scrollTop = 0;
                }else {
                    workOrderParent.scrollTop += 35
                }
            },2000);
            return workOrderDiv;
        //危害辨识
        case 'dangerIdentify':
            let dangerIdentifyTemp = `
				<div class="header"
					style="position:relative;left:500px;color:#FFFFFF;width: 500px;height: 50px;line-height:50px;
                        font-size: 26px;background-color: rgba(10,29,48,.8);display: flex;padding: 0 20px">
                        <div style="width: 80%;text-align: left">危害辨识类型</div>
                        <div style="width: 20%;text-align: left">数量</div>
				    </div>
                    <div id="identifyParent" style="position:relative;left:500px;color:#FFFFFF;width: 500px;height:210px;overflow-y: scroll;;
			             background-color: rgba(10,29,48,.8);">
                        <div id="identifyChildren" style="width: 100%;height: auto;">
                            ${baseData.map(item =>{
                            return `
								<div class="body" style="width: 100%;height: 50px;line-height:50px;font-size: 26px;
                                         display: flex;justify-content: space-between;padding: 0 20px">
                                     <div style="width: 80%;text-align: left">${item.item}</div>
                                     <div style="width: 20%;text-align: left;padding-left: 15px">${item.total}</div>
                                     </div>`
                            }).join('')}
                        </div>
			        </div>`;
            let dangerIdentifyDiv = document.createElement('div');   // 创建节点
            dangerIdentifyDiv.setAttribute("id", "dangerIdentifyDiv");   // 设置属性
            dangerIdentifyDiv.innerHTML = dangerIdentifyTemp;   // 设置text值
            document.body.appendChild(dangerIdentifyDiv);   // 添加节点
            let identifyParent = document.getElementById('identifyParent');
            let identifyChildren = document.getElementById('identifyChildren');
            setInterval(function () {
                if(identifyParent.scrollTop>=identifyChildren.clientHeight-identifyParent.clientHeight){
                    identifyParent.scrollTop = 0;
                }else {
                    identifyParent.scrollTop += 35
                }
            },2000);
            return dangerIdentifyDiv
		case 'test1':
			let dangerIdentifyTemp2 = `
				<div style="position:relative;left:500px;width: 500px;height: 40px;line-height: 40px;border-bottom: 1px solid #f2f2f2;font-size: 32px;font-weight: bold;background-color: rgba(10,29,48,.8);">${baseData.building}</div>
				<div class="header"
					style="position:relative;left:500px;color:#FFFFFF;width: 500px;height: 50px;line-height:50px;
                        font-size: 26px;background-color: rgba(10,29,48,.8);display: flex;padding: 0 20px">
                        <div style="width: 80%;text-align: left">危害辨识类型</div>
                        <div style="width: 20%;text-align: left">数量</div>
				    </div>
                    <div id="identifyParent2" style="position:relative;left:500px;color:#FFFFFF;width: 500px;height:210px;overflow-y: scroll;;
			             background-color: rgba(10,29,48,.8);">
                        <div id="identifyChildren2" style="width: 100%;height: auto;">
                            ${baseData.hazardIdentificationTypeTotalList.map(item =>{
				return `
								<div class="body" style="width: 100%;height: 50px;line-height:50px;font-size: 26px;
                                         display: flex;justify-content: space-between;padding: 0 20px">
                                     <div style="width: 80%;text-align: left">${item.item}</div>
                                     <div style="width: 20%;text-align: left;padding-left: 15px">${item.total}</div>
                                     </div>`
			}).join('')}
                        </div>
			        </div>`;
			let dangerIdentifyDiv2 = document.createElement('div');   // 创建节点
			dangerIdentifyDiv2.setAttribute("id", type);   // 设置属性
			dangerIdentifyDiv2.innerHTML = dangerIdentifyTemp2;   // 设置text值
			document.body.appendChild(dangerIdentifyDiv2);   // 添加节点
			let identifyParent2 = document.getElementById('identifyParent2');
			let identifyChildren2 = document.getElementById('identifyChildren2');
			setInterval(function () {
				if(identifyParent2.scrollTop>=identifyChildren2.clientHeight-identifyParent2.clientHeight){
					identifyParent2.scrollTop = 0;
				}else {
					identifyParent2.scrollTop += 35
				}
			},2000);
			return dangerIdentifyDiv2;
		case 'test2':
			let workOrderTemp2 = `
				<div style="position:relative;left:500px;width: 400px;height: 40px;line-height: 40px;border-bottom: 1px solid #f2f2f2;font-size: 32px;font-weight: bold;background-color: rgba(10,29,48,.8);">${baseData.building}</div>
				<div class="header" style="position:relative;left:500px;color:#FFFFFF;width: 400px;height: 50px;line-height:50px;
                    font-size: 26px;background-color: rgba(10,29,48,.8);display: flex;padding: 0 20px">
                    <div style="width: 80%;text-align: left">工单类型</div>
                    <div style="width: 20%;text-align: left">数量</div>
			    </div>
                <div id="workOrderParent3" style="position:relative;left:500px;color:#FFFFFF;width: 400px;height:210px;overflow-y: scroll;background-color: rgba(10,29,48,.8);">
                    <div id="workOrderChildren3" style="width: 100%;height: auto;">
                        ${baseData.specialWorkPermitTypeTotalList.map(item =>{
							return `<div class="body" style="width: 100%;height: 50px;line-height:50px;font-size: 26px;display: flex;justify-content: space-between;padding: 0 20px">
                                <div style="width: 80%;text-align: left">${(item.applyOperation === 'AW' ? '高处':'')
									|| (item.applyOperation === 'FI' ? '消防中断':'')
									|| (item.applyOperation === 'FW' ? '动火':'')
									|| (item.applyOperation === 'LW' ? '有限':'')
									|| (item.applyOperation === 'RS' ? '吊挂':'')
									|| (item.applyOperation === 'FG' ? 'GD&Leak':'')}
                                </div>
                                <div style="width: 20%;text-align: left;padding-left: 8px">${item.total}</div>
                                </div>`
						}).join('')}
                    </div>
		        </div>`;
			let workOrderDiv2 = document.createElement('div');   // 创建节点
			workOrderDiv2.setAttribute("id", "workOrderDiv");   // 设置属性
			workOrderDiv2.innerHTML = workOrderTemp2;   // 设置text值
			document.body.appendChild(workOrderDiv2);   // 添加节点
			let workOrderParent3 = document.getElementById('workOrderParent3');
			let workOrderChildren3 = document.getElementById('workOrderChildren3');
			setInterval(function () {
				if(workOrderParent3.scrollTop>=workOrderChildren3.clientHeight-workOrderParent3.clientHeight){
					workOrderParent3.scrollTop = 0;
				}else {
					workOrderParent3.scrollTop += 35
				}
			},2000);
			return workOrderDiv2;
	}
}

//点击 楼层级的设备卡片
export function createTagBoard(i) {
    switch (i) {
        case 'tagBoard':
            let temp = `
				<div style="width: 300px;height:200px;color:#FFFFFF;position: absolute;top:20px;left: 500px;background-image: url('/static/3D/images/popup.png');background-size: 100% 100%">
				   <div class="board" style="width: 200px;height: 150px;font-size: 14px">
				        <div  style="display: flex;margin-bottom: 2px;padding-top:10px;">
					        <div  style="width: 110px;text-align: right;color: #FFFFFF">化学品类型：</div>
					        <div  style="color: #FFFF00">类型一</div>
				        </div>
				        <div  style="display: flex;margin-bottom: 2px">
					        <div  style="width: 110px;text-align: right;color: #FFFFFF">当前储量：</div>
					        <div  style="color: #00FFFF">1000T</div>
				        </div>
				        <div  style="display: flex;margin-bottom: 2px">
					        <div  style="width: 110px;text-align: right;color: #FFFFFF">状态：</div>
					        <div  style="color: #00FFFF">33</div>
				        </div>
				        <div><button style="width: 100px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .1);cursor: pointer">预览</button></div>
				    </div>
				  </div>`
            let chemicalDiv = document.createElement('div');   // 创建节点
            chemicalDiv.setAttribute("id", "chemical");   // 设置属性
            chemicalDiv.innerHTML = temp;   // 设置text值
            document.body.appendChild(chemicalDiv);   // 添加节点
            return chemicalDiv
        case 'shexiang':
            let temp2 = `
				<div class="test" style="position:relative;width: 200px;height: 150px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 200px;height: 150px;font-size: 14px">
				        <div  style="display: flex;margin-bottom: 2px;padding-top:10px;">
					        <div  style="width: 110px;text-align: right;color: #FFFFFF">设备类型：</div>
					        <div  style="color: #FFFF00">类型一</div>
				        </div>
				        <div  style="display: flex;margin-bottom: 2px">
					        <div  style="width: 110px;text-align: right;color: #FFFFFF">存储位置：</div>
					        <div  style="color: #00FFFF">11</div>
				        </div>
				        <div  style="display: flex;margin-bottom: 2px">
					        <div  style="width: 110px;text-align: right;color: #FFFFFF">当前储量：</div>
					        <div  style="color: #00FFFF">22</div>
				        </div>
				        <div  style="display: flex;margin-bottom: 2px">
					        <div  style="width: 110px;text-align: right;color: #FFFFFF">状态：</div>
					        <div  style="color: #00FFFF">33</div>
				        </div>
				        <div><button style="width: 100px;height: 30px;color: #FFFFFF;border: none;background: rgba(0, 255, 255, .1);cursor: pointer">预览</button></div>
				    </div>
				</div>`
            let chemicalDiv2 = document.createElement('div');   // 创建节点
            chemicalDiv2.setAttribute("id", "chemical");   // 设置属性
            chemicalDiv2.innerHTML = temp2;   // 设置text值
            document.body.appendChild(chemicalDiv2);   // 添加节点
            return chemicalDiv2
    }
}

// 应变柜
export function createEmergency() {
	let temp2 = `
				<div class="test" style="position:relative;width: 300px;height: 230px;background-image: url('/static/3D/images/pop-info.png');background-size: 100% 100%">
				    <div class="board" style="width: 300px;height: 230px;font-size: 14px;padding:10px;">
				        <div style="display: flex;margin-bottom: 5px;">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备名称：</div>
					        <div style="color: #FFFF00;width: calc(100% - 80px);text-align: left">紧急应变柜</div>
				        </div>
				        <div style="display: flex;margin-bottom: 5px">
					        <div style="width: 80px;text-align: right;color: #FFFFFF">设备状态：</div>
					        <div style="{color:#00FFFF;font-weight: bold}">正常</div>
				        </div>
				    </div>
				</div>`
	let chemicalDiv2 = document.createElement('div');   // 创建节点
	chemicalDiv2.setAttribute("id", "chemical2");   // 设置属性
	chemicalDiv2.innerHTML = temp2;   // 设置text值
	document.body.appendChild(chemicalDiv2);   // 添加节点
	return chemicalDiv2
}


// 楼栋名称
export function createBuildingNameLabel(name,cb) {
	let str = '';
	if(name === 'ob'){
		str = 'OFFICE'
	}
	if(name === 'fab_n1'){
		str = 'N1 A1'
	}
	if(name === 'fab_n2'){
		str = 'N1 A2'
	}
	if(name === 'carport'){
		str = '车棚'
	}
	if(name === 'whfa'){
		str = '仓库栋'
	}
	if(name === 'wfa'){
		str = '废水站'
	}
	if(name === 'cup'){
		str = '综合动力站'
	}
	if(name === 'guanqu'){
		str = '大宗气体站'
	}
	if(name === 'cwb'){
		str = '化仓B'
	}
	if(name === 'cwa'){
		str = '化仓A'
	}
	if(name === 'shvc'){
		str = '硅烷站'
	}
	if(name === 'sgvc'){
		str = '特气站'
	}
	if(name === 'cyvc'){
		str = '化学品供应站'
	}
	if(name === 'ts'){
		str = '110变电站'
	}
	if(name === 'l40' || name === 'L40'){
		str = 'L40'
	}
	
	
	
	let temp3 = `
		<div class="test" style="position:relative;cursor: pointer;width: 150px;height: 40px;background-image: url('/static/img/name2.png');background-size: 100% 100%">
		    <div class="board" style="width: 150px;height: 20px;font-size: 18px;padding:10px;text-align: center">
		        <div style="display: flex;margin-bottom: 5px;">
			        <div style="color: #ffff;text-align: center;width: 100%">${str}</div>
		        </div>
		    </div>
		</div>`
	let chemicalDiv3 = document.createElement('div');   // 创建节点
	chemicalDiv3.setAttribute("id", "chemical");   // 设置属性
	chemicalDiv3.innerHTML = temp3;   // 设置text值
	chemicalDiv3.onclick = function(){
		cb && cb(name)
		console.log(33333,name)
	}
	
	document.body.appendChild(chemicalDiv3);   // 添加节点
	return chemicalDiv3
}

