<template>
    <div class="bottom">
        <div v-if="this.emergencyData" class="specialorder">
            <div class="concentration-one">
                <div class="concentration-left">
                    <div>应到</div>
                    <div>已到</div>
                    <div>未到</div>
                </div>
                <div class="concentration-two">
                    <Should :shouldarrive="emergencyData.supposedNum"/>
				<Should1 :shouldarrive="emergencyData.supposedNum" :arrived="emergencyData.attendanceNum"/>
				<Should2 :shouldarrive="emergencyData.supposedNum" :unarrived="emergencyData.absentNum"/>
                </div>
            </div>

            <div class="concentration-text">
                添加时间:
                <span
                    style="color:#ffffff;"
                >{{this.emergencyData.createTime}}</span>
            </div>
        </div>
        <div v-else class="bottom-img">
            <img src="@/assets/home/fighting/无数据.png" alt />
            <div>暂无数据</div>
        </div>
    </div>
</template>

<script>
import Should from "./should";
import Should1 from "./should1";
import Should2 from "./should2";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
    name: "index",
    components: {
        Should,
        Should1,
        Should2,
    },
    data() {
        return {
            emergencyData:null
            // emergencyData:{
            //     supposedNum:0,
            //     attendanceNum:0,
            //     absentNum:0,
            //     principal:'',
            //     createTime:''
            // }
        };
    },
    watch:{
        "$store.state.shouldarrive": function (newVal, oldVal) {
            this.emergencyData = newVal;
        },
    },
    methods: {
        // 初始化websocket
        // initWebSocket() {
        //     let url = this.$socket_zjb;
        //     let socket = new SockJS(url + "/gs-guide-websocket", null, {
        //         timeout: 15000,
        //     });
        //     try {
        //         this.stompClient = Stomp.over(socket);
        //         this.stompClient.connect({}, (frame) => {
        //             this.stompClient.subscribe("/topic/evacuation", (msg) => {
        //                 if (msg) {
        //                     let data = JSON.parse(msg.body);
        //                     this.emergencyData.localcommander =
        //                         data.localcommander;
        //                     this.emergencyData.shouldarrive = data.shouldarrive;
        //                     this.emergencyData.arrived = data.arrived;
        //                     this.emergencyData.unarrived =
        //                         data.shouldarrive - data.arrived;
        //                     this.emergencyData.addTime = data.addTime;
        //                 }
        //             });
        //         });
        //     } catch (e) {}
        // },
        disconnect() {
            try {
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
            } catch (e) {}
        },
    },
    mounted() {
        // this.initWebSocket();
    },
};
</script>


<style lang="stylus" scoped>
.bottom {
    .bottom-img {
        width: 100%;
        padding: 13% 0 0 0;
        text-align: center;
    }

    .specialorder {
        font-family: 'MicrosoftYaHei-Bold';
        font-weight: bold;
        width: 100%;
        height: 245px;
        position: relative;
        left: 0;
        top: 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .concentration-text {
            width: 440px;
            height: 40px;
            padding-left:5px
            font-size: 19px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #36ECFF;
        }

        .concentration-one {
            display: flex;
            justify-content: flex-start;
            padding: 10px 0 0 15px;

            .concentration-left {
                width: 80px;
                height: 170px;
                font-size: 22px;
                font-family: PangMenZhengDao;
                font-weight: 400;
                color: #FFFFFF;
                display: flex;
                justify-content: space-around;
                flex-direction: column;
            }
        }

        .concentration-two {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            width: 275px;
            height: 160px;
        }

        .concentration-three {
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;
            width: 80px;
            height: 190px;

            .three-text {
                font-size: 19px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #36ECFF;
            }
        }
    }
}
</style>
