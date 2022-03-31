import axios from "axios";
let imosSdk = window.imosSdk;
let iframeObj = null;
let videoNum = 0;
let fullscreen = false;

/** 请求功能抽离，将要的数据返回出去，入参：接口所需字段 */
//获取 主园区级 化学品存储
export const getChemicalAll = (that) => {
	return that.$http.post2('/bigscreen/query/chemical/reserve/fac').then(res => {
		if (res.data.code === 1) {
			return res
		} else {
			that.$message('error', res.data.msg)
		}
	})
};
//获取 主园区级 工单统计
export const getWorkOrderAll = (that) => {
	return that.$http.post2('/bigscreen/query/special/order/info/each').then(res => {
		if (res.data.code === 1) {
			return res
		} else {
			that.$message('error', res.data.msg)
		}
	})
}
//获取 主园区级 危害辨识
export const  getIdentifyAll=(that) =>{
    return that.$http.post2('/bigscreen/query/harm/identfy/info/fac/each').then(res=>{
        if(res.data.code === 1){
            return res
        }else {
            that.$message('error', res.data.msg)
        }
    })
};


//获取楼栋级 工单统计 @params obj => 楼栋、厂区
export const getOrderBuild =(obj,that) =>{
    let data = {
        "building": obj.building,
        "factoryName": obj.factoryName,
    };
    return that.$http.post2('/bigscreen/query/special/order/info',data).then(res=>{
        if(res.data.code === 1){
            return res
        }else {
            that.$message('error', res.data.msg)
        }
    })
};
//获取楼栋级 危害辨识统计 @params obj => 楼栋、厂区
export const getDangerBuild =(obj,that) =>{
    let data = {
        "building": obj.building,
        "factoryName": obj.factoryName,
    };
    return that.$http.post2('/bigscreen/query/harm/identfy/info',data).then(res=>{
        if(res.data.code === 1){
            return res
        }else {
            that.$message('error', res.data.msg)
        }
    })
};

//获取 楼层级 化学品存储 @@params obj => 楼栋、楼层、厂区
export const getChemicalCount =(obj,that) =>{
	let data = {
		"building": obj.building,
		"factoryName": obj.factoryName,
		"floor": obj.floor
	};
	return that.$http.post2('/bigscreen/query/chemical/reserve',data).then(res=>{
		if(res.data.code === 1){
			return res
		}else {
			that.$message('error', res.data.msg)
		}
	})
};

//获取 楼层级 工单统计 @params obj => 楼栋、楼层、厂区
export const getOrderCount =(obj,that) =>{
	let data = {
		"building": obj.building,
		"factoryName": obj.factoryName,
		"floor": obj.floor
	};
	return that.$http.post2('/bigscreen/query/special/order/info',data).then(res=>{
		if(res.data.code === 1){
			return res
		}else {
			that.$message('error', res.data.msg)
		}
	})
};

//获取 楼层级 危害辨识 @params obj => 楼栋、楼层、厂区
export const getDangerCount =(obj,that) =>{
	let data = {
		"building": obj.building,
		"factoryName": obj.factoryName,
		"floor": obj.floor
	}
	return that.$http.post2('/bigscreen/query/harm/identfy/info',data).then(res=>{
		if(res.data.code === 1){
			return res
		}else {
			that.$message('error', res.data.msg)
		}
	})
}


// 获取单个设备信息 @params obj => 楼栋、楼层、设备编号
export const getSingleDevice = (that, obj) => {
	let data = {
		"building": obj.building,
		"floor": obj.floor,
		"deviceNum": obj.deviceNum
	};
	return that.$http.get2('/bigscreen/uniform/query/equip', data).then(res => {
		if (res.data.code === 1) {
			return res
		} else {
			that.$message('error', res.data.msg)
		}
	})
}

export const getLeakData = (that, obj) => {
	let data = {
		"building": obj.building,
		"floor": obj.floor,
		"deviceNum": obj.deviceNum
	};
	return that.$http.get2('/bigscreen/uniform/query/leak', data).then(res => {
		if (res.data.code === 1) {
			return res
		} else {
			that.$message('error', res.data.msg)
		}
	})
}

// 获取安全阀组 @params obj => 楼栋、楼层、设备编号
export const getSafetyvalvegroup = (that,obj) => {
    let data = {
        "building": obj.building,
        "floor": obj.floor,
        "equipNum": obj.equipNum
    };
    return that.$http.post2('/bigscreen/query/device/safetyvalvegroup', data).then(res => {
        if (res.data.code === 1) {
            return res
        } else {
            that.$message('error', res.data.msg)
        }
    })
}

// 门禁控制 @params obj => 楼栋、楼层、设备类型、门禁列表
export const openDoors = (that,data) => {
	return that.$http.post2('/bigscreen/query/device/opendoor', data).then(res => {
		if (res.data.code === 1) {
			that.$message('success', res.data.msg)
			return res
		} else {
			that.$message('error', res.data.msg)
		}
	})
}

// 获取设备信息，单个或者一类型
export const getDoorData = (that,data) =>{
	return that.$http.post2('/bigscreen/query/door/info', data).then(res => {
		if(res.data.code === 1){
			return res.data
		}else{
			that.$message('error',res.data.msg)
		}
	})
}

// 获取监控设备信息，单个或者一类型
export const getCamera = (that,data) =>{
	return that.$http.post2('/bigscreen/query/device/monitor', data).then(res => {
		if(res.data.code === 1){
			return res.data
		}else{
			that.$message('error',res.data.msg)
		}
	})
}

// 登录到宇视监控平台
export const loginToServer = (that) => {
	let ipAddress = '192.168.81.1';
	let userName = 'loadmin';
	let password = 'UNVunv123';
	that.$http.uniPost("/VIID/login/v2").then(res => {
		let accessCode = res.data.AccessCode;
		let md1 = forge.md.md5.create(); //md5
		let md2 = forge.md.md5.create(); //md5
		md1.update(password); //md5
		let passwordMd5 = md1.digest().toHex(); //md5
		let base64Username = window.btoa(userName);
		let loginSignatureTemp = base64Username + accessCode + passwordMd5;
		md2.update(loginSignatureTemp); //md5
		let loginSignature = md2.digest().toHex(); //md5
		let data = {
			UserName: userName,
			AccessCode: accessCode,
			LoginSignature: loginSignature
		};

		that.$http.uniPost("/VIID/login/v2",data).then(r => {
			let loginResult = r.data.ErrCode;
			switch (loginResult) { //判断返回值：12351是‘用户不存在’；50004是‘密码错误，登录失败’
				case 50004:
					that.$message('error', "宇视平台: " + r.data.ErrMsg);
					break;
				case 12351:
					that.$message('error', "宇视平台: " + r.data.ErrMsg);
					break;
				case undefined:
					window.token = r.data.AccessToken;
					imosSdk.init(ipAddress, window.token, 9).then(res => {
						that.$message('success', "宇视平台登录成功");
					}).catch( err => {
						that.$message('error', err);
					});
					break;
			}
		}).catch(e => {
			that.$message('error', "宇视平台服务器连接异常");
		});
	}).catch(error => {
		that.$message('error', "宇视平台服务器连接异常");
	});
}

// 播放监控
export const playLiveVideo = (that,divDom,camCode) => {
	if (!window.token) {
		that.$message('error', "token不存在，请先登录！");
		return;
	}
	if(iframeObj){ // 如果当前正在播放，先销毁这个播放，再重新创建一个
		imosSdk.playStop(iframeObj.id, e => {
		});
	}
	iframeObj = imosSdk.createPanelWindow();
	divDom.appendChild(iframeObj)
	let cameraCode = camCode;


	if(cameraCode === '' || !cameraCode){
		that.$message('error','监控cameraCode丢失，无法播放画面！')
	}else{
		that.showVideoWindow = true;
		imosSdk.playLive(iframeObj.id, cameraCode, cameraCode, e => {
			}, 1
		);
		cameraCode = null;
	}
}

function removeVideo(id, videoContainer,that) {
	imosSdk.playStop(id, e => {});
	videoNum--;
	videoContainer.removeChild(document.getElementById(id));
	if(videoNum === 0){
		that.videoItems = []
	}
}

function dbclick(id) {
	if (!fullscreen) {
		imosSdk.goFullScreen(id, result => {
			if (result.ErrCode === 0) {
				console.log('全屏执行成功');
				fullscreen = true
			}
		})
	} else {
		imosSdk.exitFullScreen(id, result => {
			if (result.ErrCode === 0) {
				console.log('退出执行成功');
				fullscreen = false
			}
		})
	}
}


function createSpeDiv(frame,videoContainer,that) {
	let divDom = document.createElement("div");
	divDom.id = frame.id;
	divDom.videoId = frame.id;
	divDom.open = 'mini';
	divDom.style.position = 'relative';
	divDom.style.width = '300px';
	divDom.style.height = '180px';
	divDom.style.marginRight = '20px';
	divDom.innerHTML ='<div class="close-camera" id="close-'+frame.id+'" style="position: absolute;right: 5px;top: 5px;width: 20px;height: 20px;z-index: 9;cursor: pointer">' +
		'<img src="/static/3D/images/guanbi.png" alt="" width="20px">' +
		'</div>'
	divDom.appendChild(frame);
	videoContainer.appendChild(divDom);
	document.getElementById(frame.id).ondblclick = function (e) {// 雙擊打開
		videoContainer.style.overflow = 'hidden'
		console.log(this)
		if (!fullscreen) {
			fullscreen = true
			this.style.position = 'fixed';
			this.style.width = '1920px';
			this.style.height = '1080px';
			this.style.zIndex = '9999';
			this.style.left = 0;
			this.style.top = 0;
		} else {
			fullscreen = false
			this.style.position = 'relative';
			this.style.width = '300px';
			this.style.zIndex = '9';
			this.style.height = '180px';
		}
	}
	divDom = null;
	document.getElementById('close-'+frame.id).onclick = function () {
		fullscreen = false
		removeVideo(frame.id,videoContainer,that)
	}
	

}

export const playCustomCountVideo = (that,cameraCode,videoContainer) =>{
	if (!window.token) {
		alert("请先登录");
		return;
	}
	that.videoItems.push(1)
	
	if(videoNum >= 5){
		let myId = videoContainer.firstElementChild.id;
		removeVideo(myId,videoContainer)
	}
	videoNum++;
	iframeObj = imosSdk.createPanelWindow();
	// 如果窗格创建已经到达上限
	if (iframeObj === null) {
		return;
	}
	
	createSpeDiv(iframeObj,videoContainer,that);
	
	
	if(cameraCode === '' || !cameraCode){
		that.$message('error','监控cameraCode丢失，无法播放画面！')
	}else{
		imosSdk.playLive(iframeObj.id, cameraCode, cameraCode, e => {
			}, 1
		);
		cameraCode = null;
	}
	
}

// 停止播放监控
export const stopPlayVideo = (that) => {
	if (!window.token) {
		that.$message('error', "token不存在，请先登录！");
		return;
	}
	if(iframeObj){
		imosSdk.playStop(iframeObj.id, e => {
		});
	}
}

// 启动云台控制
export const startCloudControl = (that, camCode) => {
	let cameraCode = camCode;
	if (!window.token) {
		that.$message('error', "token不存在，请先登录！");
		return;
	}
	// that.$http.uniPost(`/VIID/ptz/start/${cameraCode}`)

	axios({
		method: "POST",
		url: `http://192.168.92.22:81/VIID/VIID/ptz/start/${cameraCode}`,
		headers: {
			Authorization: window.token
		},
		contentType: "application/json"
	}).then(res => {
		if (res.data.ErrCode === 0) {
			that.$message('success', "云台控制启动成功!");
		} else {
			that.$message('error', res.data.ErrMsg);
		}
	})
}

export const replayRecord = (cameraCode,divDom,that,start,end) => {
	console.log(start)
	console.log(end)
	if (!window.token) {
		that.$message('error', "token不存在，请先登录！");
		return;
	}
	iframeObj = imosSdk.createPanelWindow();
	divDom.appendChild(iframeObj);
	that.showVideoWindow = true;
	imosSdk.playRecord(
		iframeObj.id,
		cameraCode,
		cameraCode,
		start,
		end,
		function (e) {
			console.log(e);
		}
	);

}

