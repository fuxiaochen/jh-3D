<template>
    <div id="chemical">
        <div class="body">
            <div class="title">
                <div class="title-img" v-if="dataList && !dataList.fixTime">{{dataList.responseTime}} {{dataList.eventLocation}} {{dataList.eventType | toFixed}}</div>
                <div class="title-img" v-if="dataList && dataList.fixTime">{{dataList.fixTime}} {{dataList.fixLocation}} {{dataList.eventType | toFixed}}</div>
            </div>
            <div class="top">
                <div class="Authorize1">
                    <Authorize />
                </div>
                <div class="workOrder1">
                    <Process />
                </div>
                <div class="identify1">
                    <Security />
                </div>
                <div class="Process">
                    <Identify />
                </div>
            </div>
            <div class="middle">
                <Flowchart v-if="isRouterAlive"/>
            </div>
        </div>
    </div>
</template>

<script>
import Authorize from "./chemical/Authorize/Authorize";
import Security from "./chemical/security/security";
import Identify from "./chemical/identify/identify";
import Process from "./chemical/process/Process";
import Flowchart from "./chemical/flowchart/flowchart";
export default {
    components: {
        Authorize,
        Security,
        Identify,
        Flowchart,
        Process,
    },
    name: "App",
    provide (){
     return {
       reload:this.reload
     }
  },
    data() {
        return {
            two: true,
            dataList: null,
            isRouterAlive:true
        };
    },
    filters: {
        toFixed: function(money) {
       	 if (money == '009') {
				return "火灾"
			}
       	 if (money == '008') {
				return "化灾"
			}
       	 if (money == '109') {
				return "火灾演练"
			}
       	 if (money == '108') {
				return "化灾演练"
			}
        },
    },
	created(){
		this.moduleInformation()
	},
    methods: {
        //获取事件类型时间数据
        moduleInformation() {
            // let data = "f4f4a657245c486d94430262779a5490";
            let data = localStorage.getItem('processInstanceId');
            this.$http
                .get3("/emergency/event/queryOne", { processInstanceId: data })
                .then((res) => {
                    this.dataList = res.data.data;
                });
        },
         reload (){
            this.isRouterAlive = false
            this.$nextTick(function(){
                this.isRouterAlive = true
            })
        }
    },
};
</script>

<style lang="stylus" scoped>
#chemical {
    .body {
        width: 100%;
        display: flex;

        .top {
            width: 980px;
            height: 980px;
            padding: 10px 20px 0 20px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;

            .Authorize1 {
                width: 100%;
                height: 140px;
            }

            .workOrder1 {
                width: 100%;
                height: 231px;
            }

            .identify1 {
                width: 100%;
                height: 232px;
                margin-top: 30px;
            }

            .Process {
                width: 100%;
                height: 232px;
                margin-top: 30px;
            }
        }

        .middle {
            width: 930px;
            padding: 20px;
            display: flex;
        }

        .title {
            width: 930px;
            height: 40px;
            position: absolute;
            top: -60px;
            right: 360px;
            background-image: url('../../assets/home/fighting/事件类型.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;

            .title-img {
                padding: 7px 0 0 52px;
                text-align: left;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
}
</style>
