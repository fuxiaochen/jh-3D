<template>
    <div id="home">
        <div class="header">
            <Header />
        </div>
        <div class="container-content">
            <a-button id="reload-btn" @click="reload">返回厂区</a-button>
            <div class="left">
                <div class="model">
                    <div class="factory">
                        <Factory :key="timers" />
                    </div>
                </div>
            </div>

            <div v-if="showCurrentStatus === 1" id="nine-box" class="right">
                <div class="every-box" v-for="item in selected">
                    <component :is="item.name" :flashTimes="item.times"></component>
                </div>
            </div>

            <div v-if="showCurrentStatus === 2" id="fight-block">
                <Fight />
            </div>

            <div v-if="showCurrentStatus === 3" id="fight-block2">
                <Chemical />
            </div>

            <div
                class="back"
                style="right: 125px"
                v-if="showCurrentStatus === 2  || showCurrentStatus === 3"
                @click="showCurrentStatus = 1"
            >平时状态</div>
            <div class="back" @click="showOrganization">应急组织表
            </div>
            <Organize ref="organize" />
           
        </div>
    </div>
</template>

<script>
import Header from "../../components/Header";
import Factory from "./right/3D/factory";
import Fight from "./fighting";
import Chemical from "./chemical";

import AI from "./nineBox/AI";
import autoPermission from "./nineBox/autoPermission";
import dangerProduct from "./nineBox/dangerProduct";
import emergency from "./nineBox/emergency";
import ert from "./nineBox/ert";
import fireAlarm from "./nineBox/fireAlarm";
import gdLeak from "./nineBox/gdLeak";
import Organize from "./organize/organize";
import liveFace from "./nineBox/liveFace";
import machineStatus from "./nineBox/machineStatus";
import pollutants from "./nineBox/pollutants";
import safetyRisk from "./nineBox/safetyRisk";
import safetyWatch from "./nineBox/safetyWatch";
import specialOrder from "./nineBox/specialOrder";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
    components: {
        Header,
        Factory,
        Fight,
        Chemical,
        AI,
        autoPermission,
        dangerProduct,
        emergency,
        ert,
        fireAlarm,
        gdLeak,
        liveFace,
        machineStatus,
        pollutants,
        safetyRisk,
        safetyWatch,
        specialOrder,
        Organize,
    },
    name: "App",
    data() {
        return {
            timers: 111,
            showCurrentStatus: 1,
            alarm: 1,
            boxList: [
                {
                    key: 1,
                    val: "gdLeak",
                },
                {
                    key: 2,
                    val: "specialOrder",
                },
                {
                    key: 3,
                    val: "AI",
                },
                {
                    key: 4,
                    val: "dangerProduct",
                },
                {
                    key: 5,
                    val: "safetyRisk",
                },
                {
                    key: 6,
                    val: "liveFace",
                },
                {
                    key: 7,
                    val: "pollutants",
                },
                {
                    key: 8,
                    val: "fireAlarm",
                },
                {
                    key: 9,
                    val: "ert",
                },
                {
                    key: 10,
                    val: "autoPermission",
                },
                {
                    key: 11,
                    val: "emergency",
                },
                {
                    key: 12,
                    val: "machineStatus",
                },
                {
                    key: 13,
                    val: "safetyWatch",
                },
            ],
            // selected: ['specialOrder','safetyRisk','liveFace','gdLeak','AI','fireAlarm','pollutants','dangerProduct','ert'],
            selected: [],
        };
    },
    methods: {
	    reload(){
	    	window.location.reload();
	    },
        // 获取九宫格
        getNineBoxData() {
	        this.$http.get("/largeScreen/normalState/getBigScreen", {}).then(res => {
		        this.$http.get2('/sys/dict/item', {dictNo: 'nine_box'}).then(resp2 => {
			        let list = JSON.parse(res.data.data);
			        let dictList = resp2.data.data;
			        list.map(item => {
				        this.boxList.map(val => {
					        if (val.key === item) {
						        this.selected.push({
							        name: val.val,
							        times: 0
						        });
					        }
				        });
			        });

			        dictList.map(item => {
				        this.selected.map(k => {
					        if (k.name === item.dictItemVal) {
						        k.times = item.remark
					        }
				        })
			        })
		        })
	        });
        },
        // 显示组织表人员信息
        showOrganization() {
            this.$refs.organize.showOrganization();
        },
        initWebSocket3() {
            // localStorage.setItem(
            //     "processInstanceId",
            //     "1b07fcc97d744b0fbb31dced3c8be9a4"
            // );
            // this.showCurrentStatus = 3;
            // this.$store.commit("changeShowSOS", true);
            let url = this.$socket_wrh;
            let socket = new SockJS(url + "/gs-guide-websocket", null, {
                timeout: 15000,
            });
            try {
                this.stompClient = Stomp.over(socket);
                this.stompClient.connect({}, (frame) => {
                    // 订阅服务端提供的某个topic---切换大屏
                    this.stompClient.subscribe("/topic/swichScreen", (msg) => {
                        console.log("切换大屏----------------");
                        let body = JSON.parse(msg.body)
                        localStorage.setItem("processInstanceId", body.processId);
                        if (msg.body) {
                            this.$store.commit("changeShowSOS", true);
                        }
                        if (body.eventType == "009" || body.eventType == "109") {
                            this.showCurrentStatus = 2
                        }else if (body.eventType == "008" || body.eventType == "108") {
                            this.showCurrentStatus = 3
                        }

                        // this.$http.get3('/emergency/event/queryOne', {processInstanceId:msg.body}).then(res => {
                        // 	let tempData = res.data.data;
                        // 	console.log(tempData)
                        //
                        // })
                    });
                });
            } catch (e) {}
        },
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
        },
    },
    mounted() {
        this.getNineBoxData();
        this.initWebSocket3();
    },
};
</script>

<style lang="stylus" scoped>
#home {
    .container-content {
        width: 3840px;
        display: flex;
        position: relative;

        #reload-btn {
            position: absolute;
            top: 40px;
            left: 1680px;
            z-index: 9;
			font-size: 18px;
			font-weight: 700
        }

        .right {
            width: 1920px;
            padding: 40px 20px 0;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .every-box {
                width: 600px;
            }
        }

        #fight-block {
            width: 1920px;
            padding: 0;
        }
	    #fight-block2 {
		    width: 1920px;
		    padding: 0;
	    }

        .left {
            width: 1920px;
            height: 979px;
            padding: 0 30px;
            display: flex;
            background-image: url('../../assets/3D/bg-1.jpg');

            .model {
                width: 1860px;
                height: 979px;

                .factory {
                    width: 1860px;
                    height: 950px;
                }
            }
        }
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
            background-image: url('./two/img/back.png');
            background-size: 100% 100%;
        }

        
    }
}
</style>
<style lang="stylus">
#reload-btn {
    position: absolute;
    top: 40px;
    left: 1680px;
    z-index: 9;
	font-size: 18px;
	font-weight: 700;
    background-color: transparent;
    color: #01B7C2;
    border: 1px solid #01B7C2;
    border-radius: 4px;
}

#home {
    .ant-table-bordered {
        border-color: #3792aa !important;

        .ant-table-thead {
            > tr {
                border-color: #3792aa !important;

                :hover {
                    background-color: #252e3d;
                }

                > th {
                    color: white;
                    border-color: #3792aa !important;
                    background: #375f78 !important;
                    font-weight: bold;
                }
            }
        }
    }

    .ant-table-body > table {
        border-color: #3792aa !important;
    }

    .ant-table-thead > tr {
        :hover {
            background-color: #252e3d;
        }
    }

    > th {
        color: white;
        font-weight: bold;
        border-color: #3792aa !important;
    }

    .ant-table-tbody > tr > td {
        color: white;
        border-color: #3792aa !important;

        :hover {
            background-color: #252e3d;
        }
    }
}
</style>
