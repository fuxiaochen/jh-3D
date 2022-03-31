<template>
    <div class="flow-process">
        <div class="flow-left" >
            <div id="container" style="position: relative;"></div>
        </div>
        <div class="bagImg" v-show="endData">
				<div style="height:250px;padding-top:150px;font-size: 24px;font-weight: 400;color: #36ECFF;">
					应急流程结束，是否返回平时状态？
				</div>
				<a-button style="margin:30px 0 0 0" type="primary" @click="endImage">确定</a-button>
				<a-button style="margin:30px 0 0 15%" type="primary" @click="endData = false">取消</a-button>
		</div>
        <div class="flow-right" v-if="this.processNumber">
            <div class="flow-text">
               <a-icon type="close" @click="process()" style="fontSize:25px" />
            </div>
            <PeopleNotice v-show="processNumber == 'userAlarm'" @changeComponent1Data="component1DataChange" />
            <StartPlan v-show="processNumber == 'startPlan'" @changeComponent1Data="component1DataChange" />
            <SystemAlarm v-show="processNumber == 'systemAlarm'" @changeComponent1Data="component1DataChange"/>
            <VideoCenter v-show="processNumber == 'supervisionCenter'" @changeComponent1Data="component1DataChange"/>
            <SceneConfirm v-show="processNumber == 'sceneConfirm'" @changeComponent1Data="component1DataChange"/>
            <InitialStrain v-show="processNumber == 'initialStrain'" @changeComponent1Data="component1DataChange"/>
            <PersonnelEvacuating v-show="processNumber == 'personnelEvacuating'" @changeComponent1Data="component1DataChange"/>
            <Notice v-show="processNumber == 'notification'" @changeComponent1Data="component1DataChange"/>
            <DepartmentERT v-show="processNumber == 'deptErt'" @changeComponent1Data="component1DataChange"/>
            <DepartmentRescue v-show="processNumber == 'deptErtQj'" @changeComponent1Data="component1DataChange"/>
            <RegionERT v-show="processNumber == 'areaErt'" @changeComponent1Data="component1DataChange"/>
            <RegionRescue v-show="processNumber == 'areaErtQj'" @changeComponent1Data="component1DataChange"/>
            <EstablishERT v-show="processNumber == 'factoryErt'" @changeComponent1Data="component1DataChange"/>
            <Involution v-show="processNumber == 'involution'" @changeComponent1Data="component1DataChange"/>
            <b v-show="processNumber == 'falseAlarm'" style="color:#000000;font-size:20px">误报警</b>
            <b v-show="processNumber == 'startEvent'" style="color:#000000;font-size:20px">开始</b>
        </div>
    </div>
</template>

<script>
    import PeopleNotice from './children/peopleNotice'
    import SystemAlarm from './children/systemAlarm'
    import VideoCenter from './children/videoCenter'
    import SceneConfirm from './children/sceneConfirm'
    import InitialStrain from './children/initialStrain'
    import PersonnelEvacuating from './children/personnelEvacuating'
    import Notice from './children/notice'
    import DepartmentERT from './children/departmentERT'
    import DepartmentRescue from './children/departmentRescue'
    import RegionERT from './children/regionERT'
    import RegionRescue from './children/regionRescue'
    import EstablishERT from './children/establishERT'
    import Involution from './children/involution'
    import StartPlan from './children/startPlan'
    // import {Graph} from "@antv/x6";
    const { Graph } = X6
	import SockJS from "sockjs-client";
	import Stomp from "stompjs";
import { LOD } from 'three'

    export default {
        inject:['reload'],
        name: "flowchart",
        components:{
            PeopleNotice,
            StartPlan,
            SystemAlarm,
            VideoCenter,
            SceneConfirm,
            InitialStrain,
            PersonnelEvacuating,
            Notice,
            DepartmentERT,
            DepartmentRescue,
            RegionERT,
            RegionRescue,
            EstablishERT,
            Involution,
        },
        computed: {
            processInstanceId() {
                return localStorage.getItem('processInstanceId')
            }
        },
        data() {
            return {
                graph: null,
                colorList: null,
                processNumber: '',
                fromdata: {
                    // 节点
                    nodes: [
                        {
                            id: "startEvent", // String，可选，节点的唯一标识
                            x: 290, // Number，必选，节点位置的 x 值
                            y: -20, // Number，必选，节点位置的 y 值
                            width: 93, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "开始", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "startPlan", // String，节点的唯一标识
                            shape: 'polygon',
                            x: 275, // Number，必选，节点位置的 x 值
                            y: 30, // Number，必选，节点位置的 y 值
                            width: 122, // Number，可选，节点大小的 width 值
                            height: 45, // Number，可选，节点大小的 height 值
                            portMarkup: [
                                {
                                    tagName: 'circle',
                                    selector: 'portBody'
                                }
                            ],
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                    refPoints: '0,10 10,0 20,10 10,20'
                                },
                                label: {
                                    text: "0.启动预案", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "userAlarm", // String，节点的唯一标识
                            x: 105, // Number，必选，节点位置的 x 值
                            y: 110, // Number，必选，节点位置的 y 值
                            width: 93, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    refPoints: '0,10 10,0 20,10 10,20',
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "1.人员通报", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "systemAlarm", // String，可选，节点的唯一标识
                            x: 440, // Number，必选，节点位置的 x 值
                            y: 110, // Number，必选，节点位置的 y 值
                            width: 93, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "2.系统Alarm", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "supervisionCenter", // String，节点的唯一标识
                            shape: 'polygon',
                            x: 274, // Number，必选，节点位置的 x 值
                            y: 160, // Number，必选，节点位置的 y 值
                            width: 122, // Number，可选，节点大小的 width 值
                            height: 45, // Number，可选，节点大小的 height 值
                            portMarkup: [
                                {
                                    tagName: 'circle',
                                    selector: 'portBody'
                                }
                            ],
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    refPoints: '0,10 10,0 20,10 10,20'
                                },
                                label: {
                                    text: "3.监控中心", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "sceneConfirm", // String，节点的唯一标识
                            shape: 'polygon',
                            x: 274, // Number，必选，节点位置的 x 值
                            y: 240, // Number，必选，节点位置的 y 值
                            width: 122, // Number，可选，节点大小的 width 值
                            height: 45, // Number，可选，节点大小的 height 值
                            portMarkup: [
                                {
                                    tagName: 'circle',
                                    selector: 'portBody'
                                }
                            ],
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    refPoints: '0,10 10,0 20,10 10,20'
                                },
                                label: {
                                    text: "4.现场确认", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "falseAlarm", // String，可选，节点的唯一标识
                            x: 100, // Number，必选，节点位置的 x 值
                            y: 260, // Number，必选，节点位置的 y 值
                            width: 86, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a00", // 背景颜色
                                    stroke: "#2ab9cd00", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "误报警", // 文本
                                    fill: "#ffffff00", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "initialStrain", // String，节点的唯一标识
                            shape: 'polygon',
                            x: 275, // Number，必选，节点位置的 x 值
                            y: 320, // Number，必选，节点位置的 y 值
                            width: 122, // Number，可选，节点大小的 width 值
                            height: 45, // Number，可选，节点大小的 height 值
                            portMarkup: [
                                {
                                    tagName: 'circle',
                                    selector: 'portBody'
                                }
                            ],
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    refPoints: '0,10 10,0 20,10 10,20'
                                },
                                label: {
                                    text: "5.初期应变", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "notification", // String，可选，节点的唯一标识
                            x: 290, // Number，必选，节点位置的 x 值
                            y: 460, // Number，必选，节点位置的 y 值
                            width: 93, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "7.通报", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "personnelEvacuating", // String，可选，节点的唯一标识
                            x: 290, // Number，必选，节点位置的 x 值
                            y: 405, // Number，必选，节点位置的 y 值
                            width: 93, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值

                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "6.人员疏散", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "deptErt", // String，可选，节点的唯一标识
                            x: 280, // Number，必选，节点位置的 x 值
                            y: 520, // Number，必选，节点位置的 y 值
                            width: 111, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "8.成立部门ERT", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "deptErtQj", // String，节点的唯一标识
                            shape: 'polygon',
                            x: 275, // Number，必选，节点位置的 x 值
                            y: 570, // Number，必选，节点位置的 y 值
                            width: 122, // Number，可选，节点大小的 width 值
                            height: 45, // Number，可选，节点大小的 height 值
                            portMarkup: [
                                {
                                    tagName: 'circle',
                                    selector: 'portBody'
                                }
                            ],
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    refPoints: '0,10 10,0 20,10 10,20'
                                },
                                label: {
                                    text: "9.部门ERT抢救", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "areaErt", // String，可选，节点的唯一标识
                            x: 280, // Number，必选，节点位置的 x 值
                            y: 640, // Number，必选，节点位置的 y 值
                            width: 111, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "10.成立区域ERT", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "areaErtQj", // String，节点的唯一标识
                            shape: 'polygon',
                            x: 275, // Number，必选，节点位置的 x 值
                            y: 695, // Number，必选，节点位置的 y 值
                            width: 122, // Number，可选，节点大小的 width 值
                            height: 45, // Number，可选，节点大小的 height 值
                            portMarkup: [
                                {
                                    tagName: 'circle',
                                    selector: 'portBody'
                                }
                            ],
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    refPoints: '0,10 10,0 20,10 10,20'
                                },
                                label: {
                                    text: "11.区域ERT抢救", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "factoryErt", // String，可选，节点的唯一标识
                            x: 280, // Number，必选，节点位置的 x 值
                            y: 790, // Number，必选，节点位置的 y 值
                            width: 111, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "12.成立全厂ERT", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "involution", // String，可选，节点的唯一标识
                            x: 290, // Number，必选，节点位置的 x 值
                            y: 860, // Number，必选，节点位置的 y 值
                            width: 93, // Number，可选，节点大小的 width 值
                            height: 24, // Number，可选，节点大小的 height 值
                            attrs: {
                                body: {
                                    fill: "#081f3a", // 背景颜色
                                    stroke: "#2ab9cd", // 边框颜色
                                    rx: 5,
                                    ry: 5,
                                },
                                label: {
                                    text: "13.复位", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                    ],
                    // 边
                    edges: [
                        {
                            source: "startEvent", // String，必须，起始节点 id
                            target: "startPlan", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "startPlan", // String，必须，起始节点 id
                            target: "userAlarm", // String，必须，目标节点 id
                            vertices: [
                                {x: 150, y: 55},
                            ],
                            attrs: {
                                 line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "startPlan", // String，必须，起始节点 id
                            target: "systemAlarm", // String，必须，目标节点 id
                            vertices: [
                                {x: 485, y: 55},
                            ],
                            attrs: {
                                 line: {
                                     targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "userAlarm", // String，必须，起始节点 id
                            target:  {x: 335, y: 122}, // String，必须，目标节点 id
                            id:'systemAlarm1',
                            attrs: {
                                 line: {
                                    targetMarker: {
                                        tagName: 'circle', // 圆
                                        r: 0,
                                    },
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        //共同线1-3 2-3
                        {
                            source:  {x: 334, y: 122}, // String，必须，起始节点 id
                            target: "supervisionCenter", // String，必须，目标节点 id
                            id:'systemAlarm2',
                            attrs: {
                                 line: {
                                     targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "systemAlarm", // String，必须，起始节点 id
                            target:  {x: 333, y: 122}, // String，必须，目标节点 id
                            id:'systemAlarm3',
                            attrs: {
                                 line: {
                                    targetMarker: {
                                        tagName: 'circle', // 圆
                                        r: 0,
                                    },
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "supervisionCenter", // String，必须，起始节点 id
                            target: "sceneConfirm", // String，必须，目标节点 id
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '无火势',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                            connector: {
                                name: 'rounded',
                                args: {
                                    radius: 10,
                                },
                            },
                        },
                        //3-5 隐藏线
                        {
                            source: "supervisionCenter", // String，必须，起始节点 id
                            target: "initialStrain", // String，必须，目标节点 id
                            id: "supervisionCenter2",
                            vertices: [
                                {x: 70, y: 182},
                                {x: 70, y: 342},
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b799000", // 指定 path 元素的填充色
                                },
                            },
                        },
                         //4-6 隐藏线
                        {
                            source: "sceneConfirm", // String，必须，起始节点 id
                            target: 'personnelEvacuating', // String，必须，目标节点 id
                            id: "sceneConfirm1",
                            vertices: [
                                {x: 120, y: 260},
                                {x: 120, y: 417},
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b799000", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "sceneConfirm", // String，必须，起始节点 id
                            target: "falseAlarm", // String，必须，目标节点 id
                            id:'falseAlarm1',
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b799000", // 指定 path 元素的填充色
                                },
                            },
                            connector: {
                                name: 'rounded',
                                args: {
                                    radius: 10,
                                },
                            },
                        },
                        {
                            source: "personnelEvacuating", // String，必须，起始节点 id
                            target: "notification", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "sceneConfirm", // String，必须，起始节点 id
                            target: "initialStrain", // String，必须，目标节点 id
                            id: "sceneConfirm2",
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '火势小',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "initialStrain", // String，必须，起始节点 id
                            target: "personnelEvacuating", // String，必须，目标节点 id
                            
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '灭火失败',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        // 3-6 隐藏线
                        {
                            source: 'supervisionCenter', // String，必须，起始节点 id
                            target: 'personnelEvacuating', // String，必须，目标节点 id
                            id:"userAlarm1",
                            vertices: [
                                {x: 70, y: 182},
                                {x: 70, y: 417},
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b79900", // 指定 path 元素的填充色
                                },
                            },
                        },
                        //3-7 隐藏线
                        {
                            source: "supervisionCenter", // String，必须，起始节点 id
                            target: "notification", // String，必须，目标节点 id
                            id:'notification1',
                            vertices: [
                                {x: 0, y: 183},
                                {x: 0, y: 475},
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b799000", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "notification", // String，必须，起始节点 id
                            target: "involution", // String，必须，目标节点 id
                            vertices: [
                                {x: 335, y: 485},
                                {x: 335, y: 502},
                                {x: 150, y: 502},
                                {x: 150, y: 872},
                            ],
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '灭火成功',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                         //5-7 隐藏线
                        {
                            source: "initialStrain", // String，必须，起始节点 id
                            target: "notification", // String，必须，目标节点 id
                            id: "initialStrain1",
                            vertices: [
                                {x: 720, y: 342},
                                {x: 720, y: 475},
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b799000", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "notification", // String，必须，起始节点 id
                            target: "deptErt", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '灭火失败',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            source: "deptErt", // String，必须，起始节点 id
                            target: "deptErtQj", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "deptErtQj", // String，必须，起始节点 id
                            target: "areaErt", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "areaErt", // String，必须，起始节点 id
                            target: "areaErtQj", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "areaErtQj", // String，必须，起始节点 id
                            target: "factoryErt", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '抢救失败',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            source: "factoryErt", // String，必须，起始节点 id
                            target: "involution", // String，必须，目标节点 id
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '抢救成功',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                        },
                        //  抢救成功1
                        {
                            source: {x: 520, y: 593}, // String，必须，起始节点 id
                            target: {x: 520, y: 720}, // String，必须，目标节点 id
                            id: "involution1",
                             vertices: [
                                {x: 520, y: 875},
                            ],
                            attrs: {
                                line: {
                                    targetMarker: {
                                        tagName: 'circle', // 圆
                                        r: 0,
                                    },
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        //  抢救成功2
                        {
                            source: {x: 520, y: 720}, // String，必须，起始节点 id
                            target: "involution", // String，必须，目标节点 id
                            id: "involution2",
                             vertices: [
                                {x: 520, y: 875},
                            ],
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                        },
                        {
                            source: "deptErtQj", // String，必须，起始节点 id
                            target: {x: 520, y: 593}, // String，必须，目标节点 id
                            id:"deptErtQj1",
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '抢救成功',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            source: "areaErtQj", // String，必须，起始节点 id
                            target: {x: 520, y: 720}, // String，必须，目标节点 id
                            id: "areaErtQj1",
                            attrs: {
                                line: {
                                    targetMarker: 'block',
                                    stroke: "#1b7990", // 指定 path 元素的填充色
                                },
                            },
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '抢救成功',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
                fireResult: 1,
                noticeData: {
                    dept: '',                  //部门
                    notifier: '',              //通报人
                    contactNumber: '',         //联系方式
                    notifyTime: null,          //通报时间
                    regionLocation: '',        //区域位置
                    machineNumber: '',         //机台编号
                    columnA: '',               //柱位
                    burningMaterial: '',       //燃烧物质
                    fireSmall: 0,              //小
                    fireBig: 0,                //火势大
                    monitorCenterRemind: false,  //监控中心提醒

                    outfireSuccess: 0,         //灭火成功
                    outfireSuccessTime: null,  //灭火成功时间
                    outfireFail: 0,            //灭火失败
                    outfireFailTime: null,     //灭火时间
                    outfireFailCause: '',      //灭火失败原因
                    fireSmallControler: '',    //火势小管制人
                    fireBigControler: '',      //火势大管制人
                    injuries: '',              //受伤情况
                    woundedPersonList: [],     //人员受伤情况

                    monitorCallTime: null,    //调阅监控时间
                    monitorSituation: 0,      //监控火势情况


                },

                departmentList: [
                    {
                        id: 1,
                        name: '研发部',
                    },
                    {
                        id: 2,
                        name: '市场部',
                    }
                ],
                positionList: [
                    {
                        id: 1,
                        name: 'OB_F1',
                    },
                    {
                        id: 2,
                        name: 'OB_F2',
                    }
                ],
                jitaibianhaoList: [
                    {
                        id: 1,
                        name: '机台编号1',
                    },
                    {
                        id: 2,
                        name: '机台编号2',
                    },
                    {
                        id: 3,
                        name: '不清楚',
                    },
                ],
                zhuweiList: [
                    {
                        id: 1,
                        name: '柱位1',
                    },
                    {
                        id: 2,
                        name: '柱位2',
                    },
                    {
                        id: 3,
                        name: '不清楚',
                    }
                ],
                ranshaoList: [
                    {
                        id: 1,
                        name: '物质1',
                    },
                    {
                        id: 2,
                        name: '物质2',
                    },
                    {
                        id: 3,
                        name: '不清楚',
                    }
                ],
                endData:false
            }
        },
        methods: {
            init() {
                this.graph = new Graph({
                    container: document.getElementById("container"),
                    width: 950,
                    height: 960,
                    interacting: {
                        nodeMovable: false,
                        edgeMovable: false,
                    }
                });
                this.graph.fromJSON(this.fromdata);
                this.graph.centerContent()
                //节点点击事件
                this.graph.on('node:click', ({ e, x, y, node, view }) => {
                     for(let i of this.colorList){
                        if(localStorage.getItem('seeId') == 2){
                            if(node.id == i.taskKey){
                            this.colorChange(this.colorList)
                            this.processNumber = node.id
                            node.attr('body/stroke', 'orange')
                         }
                        }else if(localStorage.getItem('seeId') == 1){
                            if(i.isFinish == null && node.id == i.taskKey){
                                this.colorChange(this.colorList)
                                this.processNumber = node.id
                                node.attr('body/stroke', 'orange')
                            }
                        }else{
                            if(node.id == i.taskKey){
                            this.colorChange(this.colorList)
                            this.processNumber = node.id
                            node.attr('body/stroke', 'orange')
                            }
                        }
                    }
                })
            },
            //选择节点，边时重置颜色
            component1DataChange(params,data){
                // this.processNumber = params
                this.colorList = data
                const nodes = this.graph.getNodes()
                const edges = this.graph.getEdges()
                nodes.forEach(node => {
                    for(let i of data){
                        edges.forEach(edge => {
                            if(edge.source.cell == i.preTaskKey && edge.target.cell == i.taskKey){
                                edge.attr('line/strokeDasharray', 5)
                                edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                                edge.attr('line/stroke', '#1b7990')
                            }
                            // 3-6
                            if(i.preTaskKey == 'supervisionCenter' && i.taskKey == 'personnelEvacuating'){
                                if (edge.id == 'userAlarm1'){
                                    edge.appendLabel({
                                    attrs: {
                                        label: {
                                            text: '火势大/灭火失败',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    }
                                    })
                                }
                            }
                            if(i.preTaskKey == 'userAlarm' && i.taskKey == 'supervisionCenter'){
                                if (edge.id == 'systemAlarm1'||edge.id == 'systemAlarm2'){
                                  edge.attr('line/strokeDasharray', 5)
                                  edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                                }
                            }
                            if(i.preTaskKey == 'systemAlarm' && i.taskKey == 'supervisionCenter'){
                                if (edge.id == 'systemAlarm3'||edge.id == 'systemAlarm2'){
                                  edge.attr('line/strokeDasharray', 5)
                                  edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                                }
                            }
                            // 3-5
                            if(i.preTaskKey == 'supervisionCenter' && i.taskKey == 'initialStrain'){
                                if (edge.id == 'supervisionCenter2'){
                                  edge.attr('line/strokeDasharray', 5)
                                  edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                                }
                            }
                            // 5-7
                            if(i.preTaskKey == 'initialStrain' && i.taskKey == 'notification'){
                                if ( edge.id == 'initialStrain1'){
                                    edge.appendLabel({
                                    attrs: {
                                        label: {
                                            text: '灭火成功',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    }
                                    })
                                }
                            }
                            // 3-7
                            if(i.preTaskKey == 'supervisionCenter' && i.taskKey == 'notification'){
                                if (edge.id == 'notification1'){
                                  edge.appendLabel({
                                    attrs: {
                                         label: {
                                            text: '灭火成功',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 13, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    }
                                    })
                                }
                            }
                            //4-6
                            if(i.preTaskKey == 'sceneConfirm' && i.taskKey == 'personnelEvacuating'){
                                if (edge.id == 'sceneConfirm1'){
                                    edge.appendLabel({
                                    attrs: {
                                         label: {
                                            text: '火势大',
                                            fill: "#ffffff", // 文字颜色
                                            fontSize: 12, // 文字大小
                                        },
                                        body: {
                                            fill: "#081f3a00", // 背景颜色
                                            stroke: "#2ab9cd00", // 边框颜色
                                        },
                                    }
                                    })
                                  
                                }
                            }
                            // if(i.preTaskKey == 'sceneConfirm' && i.taskKey == 'falseAlarm'){
                            //     if (edge.id == 'falseAlarm1'){
                            //       edge.attr('line/strokeDasharray', 5)
                            //       edge.attr('line/stroke', '#1b7990')
                            //       edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                            //     }
                            //     if (node.id == 'falseAlarm'){
                            //       node.attr('body/fill', '#081f3a')
                            //       node.attr('body/stroke', '#2ab9cd')
                            //       node.attr('label/fill', '#ffffff')
                            //     }
                            // }
                            // if(i.preTaskKey == 'sceneConfirm' && i.taskKey == 'initialStrain'){
                            //     if (edge.id == 'sceneConfirm2' || edge.id == 'initialStrain1'){
                            //       edge.attr('line/strokeDasharray', 5)
                            //       edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                            //     }
                            // }
                            // if(i.preTaskKey == 'userAlarm' && i.taskKey == 'personnelEvacuating'){
                            //     if (edge.id == 'userAlarm1' || edge.id == 'personnelEvacuating2'){
                            //       edge.attr('line/strokeDasharray', 5)
                            //       edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                            //     }
                            // }
                            // if(i.preTaskKey == 'initialStrain' && i.taskKey == 'personnelEvacuating'){
                            //     if (edge.id == 'initialStrain2' || edge.id == 'personnelEvacuating2'){
                            //       edge.attr('line/strokeDasharray', 5)
                            //       edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                            //     }
                            // }
                            if(i.preTaskKey == 'deptErtQj' && i.taskKey == 'involution'){
                                if (edge.id == 'deptErtQj1' || edge.id == 'involution1'|| edge.id == 'involution2'){
                                  edge.attr('line/strokeDasharray', 5)
                                  edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                                }
                            }
                            if(i.preTaskKey == 'areaErtQj' && i.taskKey == 'involution'){
                                if (edge.id == 'areaErtQj1' || edge.id == 'involution1'){
                                  edge.attr('line/strokeDasharray', 5)
                                  edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                                }
                            }
                        })
                        if (i.isFinish == '1'){
                            if(node.id == i.taskKey){
                                node.attr('body/stroke', 'white')
                            }
                        }
                        if (i.isFinish == '0'){
                            if(node.id == i.taskKey){
                                node.attr('body/stroke', 'green')
                            }
                        }
                    }

                })
            },
            colorChange(data){
                const nodes = this.graph.getNodes()
                const edges = this.graph.getEdges()

                nodes.forEach(node => {
                    for(let i of data){
                        if (i.isFinish == null){
                            nodes.forEach(node => {
                                if(node.id == i.taskKey){
                                    node.attr('body/stroke', 'white')
                                }
                            })
                        }
                        if (i.isFinish == '0'){
                            if(node.id == i.taskKey){
                                node.attr('body/stroke', 'green')
                            }
                        }
                    }

                })
            },
            onChange() {

            },
            endImage() {
                this.reload()
            },
            process() {
                this.processNumber = ''
            },
            //通报人选择部门
            handleDepartment() {

            },
            //保存通报人信息
            saveNoticeData() {
            },

            //通报时间选择
            onChangeNotifyTime(value, dateString) {
                this.noticeData.notifyTime = dateString
            },
            //成功时间选择
            onChangeSuccessTime(value, dateString) {
                this.noticeData.outfireSuccessTime = dateString
            },
            //失败时间选择
            onChangeOutfireFailTime(value, dateString) {
                this.noticeData.outfireFailTime = dateString
            },
            //调阅监控时间选择
            onChangeMonitorCallTime(value, dateString) {
                this.noticeData.monitorCallTime = dateString
            },


            //时间选择
            onOk(value) {
            },

            //火势大小选择
            onChangeFireSmall(e) {
                this.noticeData.fireSmall = e.target.value
                this.noticeData.outfireSuccess = 0
            },
            //火势提示
            onChangeFireSelect(e) {

            },
            //显示节点流程信息
            onChangeFireSuccess1() {
                let data = localStorage.getItem('processInstanceId')
                 this.$http.get3('/fire/dept/ert/queryOne?processInstanceId=' + data).then(res => {
                    let tempData = res.data.data;
                    if(res.data.data){
                        let peopledata = "8.1事故部门主管:" + tempData.deptCharge + ",时间：" + tempData.notificationDeptTime + "\n" +
                        "8.2部门ERT集合广播:" + ",广播时间：" + tempData.radioGatherTime + ",集结点：" + tempData.rallyPoint + "\n"
                        "8.4部门ERT抢救计划:" + ",抢救措施：" + tempData.emergencyMeasures + ",烟雾处置措施：" + tempData.smokeDisposalMeasures + ",废水处置措施：" + tempData.wastewaterDisposaMeasures
                        this.$store.commit("setProcessERT",peopledata)
                    }else {
                        this.$store.commit("setProcessERT",null)
                    }
                })
                this.$http.get3('/fire/deptErt/rescue/queryOne?processInstanceId=' + data).then(res => {
                        let tempData = res.data.data;
                        if(res.data.data){
                            let aes = ''
                            if(Number(tempData.fireSuccess) == 1){
                                aes = '灭火成功,时间：' + tempData.fireSuccessTime
                            }else{
                                aes = '灭火失败,时间：' + tempData.fireFailureTime
                            }
                            let peopledata = "9.1灭火情况:" + aes
                            this.$store.commit("setProcessDepartment",peopledata)
                        }else {
                            this.$store.commit("setProcessDepartment",null)
                        }
                })
                this.$http.get3('/fire/factory/ert/queryOne?processInstanceId='+ data).then((res) => {
                    let tempData = res.data.data;
                    if(res.data.data){
                        let peopledata = "12.1总指挥官:" + tempData.commander + ",时间：" + tempData.extensionTime + "\n" +
                        "12.6建立指挥中心:" + ",时间：" + tempData.commandTime + ",位置：" + tempData.location + "\n"+
                        "12.8灭火时间:" + tempData.fireFightTime
                        this.$store.commit("setProcessEstablishERT",peopledata)
                    }else {
                        this.$store.commit("setProcessEstablishERT",null)
                    }
                })
                this.$http.get3('/fire/involution/queryOne?processInstanceId='+ data).then((res) => {
                    let tempData = res.data.data;
                    if(res.data.data){
                        let peopledata = "13.2现场环境清理，完成时间:" + tempData.environmentalCleanTime+ "\n"
                        ",13.4器材复归，完成时间：" + tempData.equipmentDetectionTime + "\n"
                        "13.5管制解除，完成时间：" + tempData.deregulationTime + "\n"
                        "13.6回报指挥官，解除状况或人员复归确认"+ ",指挥官："  + tempData.commander
                        this.$store.commit("setProcessInvolution",peopledata)
                    }else {
                        this.$store.commit("setProcessInvolution",null)
                    }
                })
                this.$http.get3('/fire/initial/strain/queryOne?processInstanceId='+ data).then((res) => {
                        let tempData = res.data.data;
                        if(res.data.data){
                            let aes = ''
                            let file = ''
                            let pople = ''
                            if(Number(tempData.fireSuccess) == 1){
                                aes = '灭火成功'
                            }else{
                                aes = '灭火失败'
                            }
                            if(Number(tempData.fireBehavior) == 1){
                                file = '火势小'
                            }else if (Number(tempData.fireBehavior) == 2){
                                file = '火势大'
                            }
                            if(Number(tempData.trappeds) == 1){
                                pople = '无'
                            }else if (Number(tempData.trappeds) == 2){
                                pople = '有'
                            }else {
                                pople = '不清楚'
                        }
                            let peopledata = "5.1现场确认:" + aes + ",处理人：" + tempData.fireSuccessHandler + "\n" +
                            "5.2灭火结果:" + aes + ",火势情况" + file +
                            ",人员被困情况：" + pople
                            this.$store.commit("setProcessStrain",peopledata)
                        }else {
                            this.$store.commit("setProcessStrain",null)
                      }
                })
                 this.$http.get3('/fire/notification/queryOne?processInstanceId=' + data).then(res => {
                    let tempData = res.data.data;
					if(res.data.data){
                        let peopledata = "7.1事故部门主管:" + tempData.deptCharge + ",时间：" + tempData.notificationDeptTime + "\n" +
                        "7.2值班主管:" + tempData.dutyCharge + ",时间：" + tempData.notificationDutyTime + "\n"
                        "7.3风控主管:" + tempData.sceneryCharge + ",时间：" + tempData.notificationSceneryTime + "\n"
                        this.$store.commit("setProcessNotice",peopledata)
                    }else {
                        this.$store.commit("setProcessNotice",null)
                    }
                })
                 this.$http.get3('/fire/person/report/queryOne?processInstanceId=' + data).then(res => {
                    let tempData = res.data.data;
                    if(res.data.data){
                        let peopledata = "1.1通报人:" + tempData.notifier + "部门/承揽商：" + tempData.dept
                        + "联系电话：" + tempData.contactNumber + "通报时间：" + tempData.notifyTime + "\n" +
                        "1.2通报状况:" + "区域位置：" + tempData.regionLocation+ "机台编号：" + tempData.machineNumber +
                        "柱位：" + tempData.columnA
                        this.$store.commit("setProcessPeople",peopledata)
                    }else {
                        this.$store.commit("setProcessPeople",null)
                    }
                })
                    this.$http.get3('/fire/person/evacuate/queryOne?processInstanceId='+ data).then((res) => {
                            let tempData = res.data.data;
                            if(res.data.data){
                                let aes = ''
                                let aes1 = ''
                                let file = ''
                                let pople = ''
                                if(Number(tempData.liftLinkage) == 1){
                                    aes = '是'
                                }else{
                                    aes = '否'
                                }
                                if(Number(tempData.forcedDraftLinkage) == 1){
                                    aes1 = '是'
                                }else{
                                    aes1 = '否'
                                }
                                if(Number(tempData.flameDoorLinkage) == 1){
                                    file = '是'
                                }else if (Number(tempData.flameDoorLinkage) == 2){
                                    file = '否'
                                }
                                if(Number(tempData.purgingSystemLinkage) == 1){
                                    pople = '是'
                                }else if (Number(tempData.purgingSystemLinkage) == 2){
                                    pople = '否'
                                }
                                let peopledata = "6.1系统联动情况:" + ",电梯联动情况：" + aes + ",防火门联动情况：" + file + ",排烟系统联动情况：" + aes1
                                ",正压送风系统联动情况" + pople
                                this.$store.commit("setProcessEvacuating",peopledata)
                            }else {
                                this.$store.commit("setProcessEvacuating",null)
                            }
                   })
                     this.$http.get3('/fire/area/ert/queryOne?processInstanceId=' + data).then(res => {
                        let tempData = res.data.data;
                        if(res.data.data){
                            let peopledata = "10.1指挥官:" + tempData.commander + ",时间：" + tempData.reportTime + "\n" +
                            "10.2区域RET集合广播:" + ",广播时间：" + tempData.broadcastTime + ",集结点：" + tempData.assemblyPoint + "\n"
                            "10.4区域ERT抢救计划:" + ",抢救措施：" + tempData.rescueMeasure + ",烟雾处置措施：" + tempData.smokeMeasure + ",废水处置措施：" + tempData.wasteWaterMeasure
                            this.$store.commit("setProcessRegion",peopledata)
                        }else {
                            this.$store.commit("setProcessRegion",null)
                        }
                })
                    this.$http.get3('/fire/AreaErt/Rescue/queryOne?processInstanceId=' + data).then(res => {
                    let tempData = res.data.data;
                    if(res.data.data) {
                        let aes = ''
                        if(Number(tempData.fireSuccess) == 1){
                            aes = '灭火成功'+ ",灭火成功时间：" + tempData.fireSuccessTime
                        }else{
                            aes = '灭火失败'+ ",灭火失败时间：" + tempData.fireFailureTime
                        }
                        if(res.data.data){
                            let peopledata = "11.1灭火情况:" + aes
                            this.$store.commit("setProcessRescue",peopledata)
                        }
                    }else {
                        this.$store.commit("setProcessRescue",null)
                    }
                })
                    this.$http.get3('/fire/scene/confirm/queryOne?processInstanceId='+ data).then((res) => {
                            let tempData = res.data.data;
                            if(res.data.data){
                                let aes = ''
                                let file = ''
                                let pople = ''
                                if(Number(tempData.realAlarm) == 1){
                                    aes = '真实情况'
                                }else{
                                    aes = '误报警'
                                }
                                if(Number(tempData.fireBehavior) == 1){
                                    file = '火势小'
                                }else if (Number(tempData.fireBehavior) == 2){
                                    file = '火势大'
                                }
                                if(Number(tempData.trappeds) == 1){
                                    pople = '无'
                                }else if (Number(tempData.trappeds) == 2){
                                    pople = '有'
                                }else {
                                    pople = '不清楚'
                                }
                                let peopledata = "4.1汇报人员:" + tempData.userName + ",时间：" + tempData.discoveryTime + "\n" +
                                "4.2确认结果:" + aes + ",火势情况" + file +
                                ",人员被困情况：" + pople
                                this.$store.commit("setProcessConfirm",peopledata)
                            }else {
                                this.$store.commit("setProcessConfirm",null)
                            }
                })
                    this.$http.get3('/fire/system/alarm/queryOne?processInstanceId=' + data).then(res => {
                    let tempData = res.data.data;
                    if(res.data.data){
                        let systemdata = "2.1Alarm位置:" + tempData.regionalLocation + ",Alarm时间：" + tempData.alarmTime
                        "柱位：" + tempData.columnA
                        this.$store.commit("setProcessSystem",systemdata)
                    }else {
                        this.$store.commit("setProcessSystem",'')
                    }
                })
                    this.$http.get3('/fire/supervision/center/queryOne?processInstanceId='+ data).then((res) => {
                            let tempData = res.data.data;
                            if(res.data.data){
                                let aes = ''
                                let file = ''
                                if(tempData.isSeeScene == 1){
                                    aes = '能看到现场情况'
                                }else{
                                    aes = '不能看到现场情况'
                                }
                                if(tempData.monitorSituation == 1){
                                    file = '无火势'
                                }else if (tempData.monitorSituation == 2){
                                    file = '火势小'
                                }else {
                                    file = '火势大'
                                }
                                let videoCenter = ''
                                if(tempData.ercDutyPersonList.length > 0){
                                    videoCenter = "3.1确认人:" + tempData.ercDutyPersonList[0].userName + "，能否看到现场情况：" + aes
                                    + "，火势大小：" + file
                                }else {
                                    videoCenter = "3.1能否看到现场情况：" + aes
                                        + "，火势大小：" + file
                                }
                                this.$store.commit("setProcessVideo",videoCenter)
                            }
                            else {
                                this.$store.commit("setProcessVideo",null)
                            }
                })

            },

            //火势成功失败选择
            onChangeFireSuccess() {
                let data = {
                    processInstanceId:localStorage.getItem('processInstanceId')
                }
                this.$http.get3('/fire/disposal/process/config/taskKeyList', data).then(res => {
                    if(localStorage.getItem('seeId') == 1){
                        for(let i in res.data.data){
                            if(res.data.data[i].isFinish == '0'){
                                this.component1DataChange(res.data.data[i-1].taskKey,res.data.data)
                            }
                        }
                    }else {
                        for(let i of res.data.data){
                            if(i.isFinish == '0'){
                                if(i.preTaskKey == "userAlarm"){
                                    this.$http.get3('/fire/person/report/queryOne?processInstanceId=' + localStorage.getItem('processInstanceId')).then(res => {
                                        if(res.data.data){
                                            let tempData = res.data.data;
                                            this.$store.commit('setInformpeople',tempData.notifier);
                                        }
                                    })
                                }
                                if(i.preTaskKey == "systemAlarm"){
                                    this.$http.get3('/fire/system/alarm/queryOne?processInstanceId=' + localStorage.getItem('processInstanceId')).then(res => {
                                        let tempData = res.data.data;
                                        if(res.data.data){
                                            let data1 = tempData.smokeList.concat(tempData.vesdaList)
                                            let data2 = tempData.otherList.concat(data1)
                                            let alarmNoData = ''
                                            for(let i of data2){
                                                if(i.deviceCode){
                                                    alarmNoData = alarmNoData + i.deviceCode + ','
                                                }
                                            }
                                            alarmNoData = alarmNoData.substring(0, alarmNoData.lastIndexOf(','));
                                            this.$store.commit('setAlarmNo',alarmNoData);
                                        }
                                    })
                                }
                                this.component1DataChange(i.taskKey,res.data.data)
                            }
                        }
                    }
                })
            },

            //受伤情况
            woundedPerson() {

            },
            //获取4模块所有信息
            moduleInformation() {
                // let data = {
                //     processInstanceId:localStorage.getItem('processInstanceId')
                // }
                let data = localStorage.getItem('processInstanceId')
                //获取应急器材数据
                this.$http.get3('/fire/large/screen/supportEquipmentData', {processInstanceId: data}).then(res =>{
                    if(res.data.data){
                       let storeList = res.data.data
                       this.$store.commit('setStoreList', storeList) 
                    }else{
                        this.$store.commit('setStoreList', '') 
                    }
				})
                //获取人员疏散统计数据
				this.$http.get3('/fire/large/screen/personEvacuateData', {processInstanceId: data}).then(res =>{
                    if(res.data.data){
                       let shouldarrive = res.data.data
                        this.$store.commit('setShouldarrive', shouldarrive)
                    }else{
                        this.$store.commit('setShouldarrive', '') 
                    }
				})
                 //获取ERT人员数据
				this.$http.get3('/fire/large/screen/emergencyUserData', {processInstanceId: data}).then(res =>{
                    if(res.data.data){
                       let ertList = res.data.data
                    this.$store.commit('setertList', ertList)
                    }else{
                        this.$store.commit('setertList', '') 
                    }
				})
            },
            initWebSocket() {
				let url = 'http://192.168.81.220:8385';
				let socket = new SockJS(url + '/gs-guide-websocket', null, {timeout: 15000});
				try {
					this.stompClient = Stomp.over(socket);
					this.stompClient.connect({}, frame => {
						// 订阅服务端提供的某个topic---切换流程图节点
						this.stompClient.subscribe('/topic/toggleTaskKey', msg => {
                            console.log('55555',msg.body);
                           this.onChangeFireSuccess();
                           this.onChangeFireSuccess1();
                           this.moduleInformation();
						});
                        // 订阅服务端提供的某个topic---切换大屏
                        this.stompClient.subscribe("/topic/swichScreen", (msg) => {
                            let body = JSON.parse(msg.body)
                            localStorage.setItem("processInstanceId", body.processId);
                            this.reload()
                        });
					})
				} catch (e) {
				} finally {
					this.disconnect();
				}
			},
			disconnect() {
				try {
					if (this.stompClient) {
						this.stompClient.disconnect();
					}
				}catch (e) {
				}
				finally {
				}
			},


        },
        mounted() {
            this.init();
			this.initWebSocket();
            this.onChangeFireSuccess();
            this.onChangeFireSuccess1();
            this.moduleInformation();

        },
    };
</script>

<style>
    @keyframes ant-line {
        to {
            stroke-dashoffset: -1000
        }
    }
</style>
<style lang="stylus" scoped>
    .flow-process
        width 1680px
        height 900px
        display flex

        .flow-left
            width 970px
            height 960px
            margin-left -40px
            overflow-y: scroll;

        .bagImg
            width: 680px;
            height: 400px;
            position: absolute;
            top: 150px;
            right: 600px;
            z-index 1000
            box-sizing: border-box;
            color: rgba(0,0,0,.65);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5;
            list-style: none;
            background-image url("./img/bg.png")
            background-size 100% 100%
            background-repeat no-repeat
            background-clip: padding-box;
            border: 0;
            color: #1d5f76;
            border-radius: 4px;
            -webkit-box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
            box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
            pointer-events: auto;

        .flow-left::-webkit-scrollbar { width: 0 !important }

        .flow-right
            width 860px
            height 800px
            position: fixed;
            top:150px;
            right:530px;
            z-index:99
            background-color #f8f8f8
            .flow-text
                position:absolute;
                color: #000000;
                right: 10px;
                top: 10px
                width:50px

            h3
                text-align left

        .noticeBaseData
            padding 0 0 0 23px

            .gutter-box
                margin 5px 0

                .noticeBaseData-item
                    display flex
                    width 100%

                    .desc
                        width 90px
                        font-weight bold
                        line-height 30px

                    .value
                        line-height 30px
                        text-align left
                        width calc(100% - 90px)

            .fireSmall
                width 780px
                height 200px
                background-color #F8F8F8
                box-shadow 2px 2px 3px #c1c1c1

                .result
                    text-align left
                    margin-left 5px

                    h4
                        margin-left 28px
                        font-weight 500

</style>
<style lang="stylus">
    .flow-process .flow-right
        .ant-select
            width 100%

        .ant-calendar-picker-input
            width: 100%;

        .ant-calendar-picker-icon
            display none !important
</style>
