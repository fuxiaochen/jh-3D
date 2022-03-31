//点击楼栋级(工单、危害辨识)、楼层级(化学品存储、工单、危害辨识)同类卡片
//
export function createCountCard(baseData, type) {
	switch (type) {
		case 'chemicalCount':
			let chemicalTemp = `<div class="test" style="position:relative;width: 1000px;left:500px;color:#FFFFFF;
						    background-color: rgba(8,28,33,.6);border: 1px solid #BBBBBB;border-radius: 10px;padding:10px">
							<div class="header" style="width: 100%;height: 60px;line-height:60px;font-size: 30px;background-color: rgba(8,28,33,.8);
										display: flex;justify-content: space-between;padding: 0 20px">
								<div style="width: 35%;text-align: left;margin-right: 2%">化学品存储类型</div>
								<div style="width: 25%;text-align: left;margin-right: 2%">存储位置</div>
								<div style="width: 25%;text-align: left">当前存储</div>
								<div style="width: 10%;text-align: left">状态</div>
							</div>
							${baseData.map(item =>{
								return `<div class="body" style="width: 100%;line-height:60px;font-size: 30px;
				                            display: flex;justify-content: space-between;padding: 0 20px;border-bottom:1px solid #FFFFFF ">
							                <div style="width: 35%;text-align: left;margin-right: 2%">${item.chemicalType}</div>
											<div style="width: 25%;text-align: left;margin-right: 2%">${item.storageLocation}</div>
											<div style="width: 25%;text-align: left">${item.labst}</div>
											<div style="width: 10%;text-align: left">${item.labst}</div>
										</div>`
							}).join('')}
						</div>`
			let chemicalCountDiv = document.createElement('div');   // 创建节点
			chemicalCountDiv.setAttribute("id", "chemicalCountDiv");   // 设置属性
			chemicalCountDiv.innerHTML = chemicalTemp;   // 设置text值
			document.body.appendChild(chemicalCountDiv);   // 添加节点
			return chemicalCountDiv
			break;

		case 'orderCount':
            let workOrderTemp = `<div class="header" style="position:relative;left:500px;color:#FFFFFF;width: 400px;height: 50px;line-height:50px;
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

		case 'dangerCount':
            let dangerIdentifyTemp = `<div class="header" style="position:relative;left:500px;color:#FFFFFF;width: 500px;height: 50px;line-height:50px;
                                    font-size: 26px;background-color: rgba(10,29,48,.8);display: flex;padding: 0 20px">
                                    <div style="width: 80%;text-align: left">危害辨识类型</div>
                                    <div style="width: 20%;text-align: left">数量</div>
							    </div>
                                <div id="identifyParent" style="position:relative;left:500px;color:#FFFFFF;width: 500px;height:210px;overflow-y: scroll;
						             background-color: rgba(10,29,48,.8);">
                                    <div id="identifyChildren" style="width: 100%;height: auto;">
                                        ${baseData.map(item =>{
                                        return `<div class="body" style="width: 100%;height: 50px;line-height:50px;font-size: 26px;
                                                     display: flex;justify-content: space-between;padding: 0 20px">
                                                     <div style="width: 80%;text-align: left">${item.item}</div>
                                                     <div style="width: 20%;text-align: left;padding-left: 8px">${item.total}</div>
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
            return dangerIdentifyDiv;
	}
}
