import axios from 'axios'
axios.defaults.timeout = 50000; //20秒超时
axios.defaults.withCredentials = true; //允许携带跨域cookie


//获取请求地址
let baseService = null; // 右侧九宫格请求
let screenService = null; // 左侧大屏请求
let videoService = null; // 宇视监控请求
let pathService = null; // 轨迹请求
let blockService = null; // 轨迹障碍点TXT的请求
let hikService = null; // 海康陌生人人员轨迹
let daHuaService = null; // 大华陌生人人员轨迹

baseService = axios.create({
	baseURL: '/authorization/zjb/'
	// baseURL: '/auth/'
});

hikService = axios.create({
	baseURL: '/authorization/'
	// baseURL: '/hik/'
});

daHuaService = axios.create({
	baseURL: '/guest/'
	// baseURL: '/daHua/'
});

pathService = axios.create({
	baseURL: '/emergency/zjb/'
	// baseURL: '/wrh/'
})
screenService = axios.create({
	baseURL: '/all/xy/'
	// baseURL: '/xy'
})
blockService = axios.create({
	baseURL: '/txt/'
})
videoService = axios.create({ // =====>宇视监控
	baseURL: '/VIID/',
	headers: {
		"content-type": "application/json; charset=utf8"
	}
})


// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/static/config.json', false); // 同步请求，获取线上ip地址
// xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         let url = JSON.parse(xhr.responseText).LIVE_URL;
//         let url2 = JSON.parse(xhr.responseText).UNIVIEW_URL;
//         let url3 = JSON.parse(xhr.responseText).BLOCK_URL;
//         baseService = axios.create({
//             baseURL: '/authorization/zjb/'
//             //     baseURL: '/zjb/'
//         });
//         screenService = axios.create({
//             baseURL: '/all/xy/'
//             //     baseURL: '/xy'
//         })
//         pathService = axios.create({
//             baseURL: '/wrh/'
//         })
//         blockService = axios.create({
//             baseURL: '/txt/'
//         })
//         videoService = axios.create({ // =====>宇视监控
//             baseURL: '/VIID/',
//             headers: {
//                 "content-type": "application/json; charset=utf8"
//             }
//         })
//     }
// }
// xhr.send();

const $http = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            baseService.get(url, { params: params }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
	get2: (url, params) => {
        return new Promise((resolve, reject) => {
            screenService.get(url, { params: params }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    get3: (url, params) => {
        return new Promise((resolve, reject) => {
            pathService.get(url, { params: params }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getBlock: (url, params) => {
        return new Promise((resolve, reject) => {
            blockService.get(url, { params: params }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            baseService.post(url, data).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err)
            })
        })
    },
    post2: (url, data) => {
        return new Promise((resolve, reject) => {
            screenService.post(url, data).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err)
            })
        })
    },
	postHik: (url, data) => {
		return new Promise((resolve, reject) => {
			hikService.post(url, data).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	postDaHua: (url, data) => {
		return new Promise((resolve, reject) => {
			daHuaService.post(url, data).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
    uniPost: (url, data) => {
        return new Promise((resolve, reject) => {
            videoService.post(url, data ? data : null, { responseType: "json" }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default $http
