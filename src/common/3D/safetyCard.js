export function createSafetyCard(baseData, type) {
    switch (type) {
        case 'Safetyvalvegroup':
            let chemicalTemp = `<div class="test" style="position:relative;width: 400px;color:#FFFFFF;font-size: 30px;
						            background-color: rgba(8,28,33,.6);border: 1px solid #BBBBBB;border-radius: 10px;padding:10px">
                                    <div class="header" style="display: flex;width: 100%;text-align: left;padding: 0 20px">
                                        <div class="type" style="width: 70%">设备类型</div>
                                        <div class="state" style="width: 30%">状态</div>
                                    </div>
                                     ${baseData.map(item =>{
                                        return `<div class="body">
                                            <div class="body-item" style="display: flex;width: 100%;text-align: left;height: 50px;line-height:50px;padding: 0 20px">
                                                <div class="name" style="width: 70%">${item.equipTypeChild.split('_')[1] === 'signalvalve'?'信号阀':''
                                                ||item.equipTypeChild.split('_')[1] === 'pressureswitch'?'压力开关设备':''
                                                ||item.equipTypeChild.split('_')[1] === 'wetalarmvalve'?'报警阀(湿式)':''}</div>
                                                <div class="value" style="width: 30%">${item.equipState}</div>
                                            </div>
                                        </div>`}).join('')            
                                    }
                                </div>`
            let chemicalCountDiv = document.createElement('div');   // 创建节点
            chemicalCountDiv.setAttribute("id", "SafetyvalvegroupDiv");   // 设置属性
            chemicalCountDiv.innerHTML = chemicalTemp;   // 设置text值
            document.body.appendChild(chemicalCountDiv);   // 添加节点
            return chemicalCountDiv
    }
}