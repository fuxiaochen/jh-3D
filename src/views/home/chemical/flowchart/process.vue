<template>
    <div class="flow-process">
        <div class="flow-left">
            <div id="container" style="position: relative;"></div>
        </div>
        <div class="flow-right">
            <PeopleNotice v-show="processNumber == 'userAlarm'" :processNumber="processNumber" @changeComponent1Data="component1DataChange" />
            <StartPlan v-show="processNumber == 'startPlan'" :processNumber="processNumber" @changeComponent1Data="component1DataChange" />
            <SystemAlarm v-show="processNumber == 'systemAlarm'" @changeComponent1Data="component1DataChange"/>
            <VideoCenter v-show="processNumber == 'supervisionCenter'" @changeComponent1Data="component1DataChange"/>
            <SceneConfirm v-show="processNumber == 'sceneConfirm'" @changeComponent1Data="component1DataChange"/>
            <InitialStrain v-show="processNumber == 'initialStrain'" @changeComponent1Data="component1DataChange"/>
            <Notice v-show="processNumber == 'notification'" @changeComponent1Data="component1DataChange"/>
            <DepartmentERT v-show="processNumber == 'deptErt'" @changeComponent1Data="component1DataChange"/>
            <DepartmentRescue v-show="processNumber == 'deptErtQj'" @changeComponent1Data="component1DataChange"/>
            <RegionERT v-show="processNumber == 'areaErt'" @changeComponent1Data="component1DataChange"/>
            <RegionRescue v-show="processNumber == 'areaErtQj'" @changeComponent1Data="component1DataChange"/>
            <EstablishERT v-show="processNumber == 'factoryErt'" @changeComponent1Data="component1DataChange"/>
            <Involution v-show="processNumber == 'involution'" @changeComponent1Data="component1DataChange"/>
            <b v-show="processNumber == 'endEvent'" style="color:#000000;font-size:20px">误报警</b>
            <b v-show="processNumber == 'startEvent'" style="color:#000000;font-size:20px">开始</b>
        </div>
    </div>
</template>

<script>
    import PeopleNotice from './peopleNotice'
    import SystemAlarm from './systemAlarm'
    import VideoCenter from './videoCenter'
    import SceneConfirm from './sceneConfirm'
    import InitialStrain from './initialStrain'
    import Notice from './notice'
    import DepartmentERT from './departmentERT'
    import DepartmentRescue from './departmentRescue'
    import RegionERT from './regionERT'
    import RegionRescue from './regionRescue'
    import EstablishERT from './establishERT'
    import Involution from './involution'
    import StartPlan from './startPlan'
    import {Graph} from "@antv/x6";

    export default {
        name: "process",
        components:{
            PeopleNotice,
            StartPlan,
            SystemAlarm,
            VideoCenter,
            SceneConfirm,
            InitialStrain,
            Notice,
            DepartmentERT,
            DepartmentRescue,
            RegionERT,
            RegionRescue,
            EstablishERT,
            Involution,
        },
        data() {
            return {
                valueFormat: "YYYY-MM-DD",
                graph: null,
                colorList: null,
                processNumber: this.$store.state.eventType,
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
                            id: "notification", // String，节点的唯一标识
                            x: 290, // Number，必选，节点位置的 x 值
                            y: 350, // Number，必选，节点位置的 y 值
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
                                    text: "5.通报", // 文本
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "endEvent", // String，可选，节点的唯一标识
                            x: 105, // Number，必选，节点位置的 x 值
                            y: 250, // Number，必选，节点位置的 y 值
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
                                    fill: "#ffffff", // 文字颜色
                                    fontSize: 12, // 文字大小
                                },
                            },
                        },
                        {
                            id: "initialStrain", // String，节点的唯一标识
                            shape: 'polygon',
                            x: 274, // Number，必选，节点位置的 x 值
                            y: 420, // Number，必选，节点位置的 y 值
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
                                    text: "6.初期应变", // 文本
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
                                    text: "7.成立部门ERT", // 文本
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
                                    text: "8.部门ERT抢救", // 文本
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
                                    text: "9.成立区域ERT", // 文本
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
                                    text: "10.区域ERT抢救", // 文本
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
                                    text: "11.成立全厂ERT", // 文本
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
                                    text: "12.复位", // 文本
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
                                            text: '',
                                            fill: "#ffffff00", // 文字颜色
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
                        {
                            source: "sceneConfirm", // String，必须，起始节点 id
                            target: "notification", // String，必须，目标节点 id
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '真实事件',
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
                            source: "sceneConfirm", // String，必须，起始节点 id
                            target: "endEvent", // String，必须，目标节点 id
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            text: '虚惊事件',
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
                            source: "notification", // String，必须，起始节点 id
                            target: "initialStrain", // String，必须，目标节点 id
                            labels: [
                                {
                                    attrs: {
                                        label: {
                                            fill: "#ffffff00", // 文字颜色
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
                                            text: '止漏失败',
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
                            source: "initialStrain", // String，必须，起始节点 id
                            target:  {x: 520, y: 444}, // String，必须，目标节点 id
                             id: "initialStrain2",
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
                                            text: '止漏成功',
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
                            source: {x: 520, y: 442}, // String，必须，起始节点 id
                            target: {x: 520, y: 593}, // String，必须，目标节点 id
                            id: "initialStrain3",
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
                                            text: '止漏失败',
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
                                            text: '止漏成功',
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
                        //  止漏成功1
                        {
                            source: {x: 520, y: 593}, // String，必须，起始节点 id
                            target: {x: 520, y: 720}, // String，必须，目标节点 id
                            id: "involution1",
                             vertices: [
                                {x: 520, y: 870},
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
                        //  止漏成功2
                        {
                            source: {x: 520, y: 720}, // String，必须，起始节点 id
                            target: "involution", // String，必须，目标节点 id
                            id: "involution2",
                             vertices: [
                                {x: 520, y: 870},
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
                                            text: '止漏成功',
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
                                            text: '止漏成功',
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

                    outfireSuccess: 0,         //止漏成功
                    outfireSuccessTime: null,  //止漏成功时间
                    outfireFail: 0,            //止漏失败
                    outfireFailTime: null,     //止漏时间
                    outfireFailCause: '',      //止漏失败原因
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
                ]
            }
        },
        methods: {
            init() {
                this.graph = new Graph({
                    container: document.getElementById("container"),
                    width: 760,
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
                            if(i.isFinish == '1' && node.id == i.taskKey){
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
                this.processNumber = params
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
                            // 6-12
                            if(i.preTaskKey == 'initialStrain' && i.taskKey == 'involution'){
                                if (edge.id == 'initialStrain3' ||edge.id == 'initialStrain2' || edge.id == 'involution1'|| edge.id == 'involution2'){
                                  edge.attr('line/strokeDasharray', 5)
                                  edge.attr('line/style/animation', 'ant-line 30s infinite linear')
                                }
                            }
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
            colorChange(data){
                const nodes = this.graph.getNodes()
                const edges = this.graph.getEdges()

                nodes.forEach(node => {
                    for(let i of data){
                        if (i.isFinish == '1'){
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
            //火势成功失败选择
            onChangeFireSuccess() {

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
                                this.component1DataChange(i.taskKey,res.data.data)
                            }
                        }
                    }
                })
            },

            //受伤情况
            woundedPerson() {

            }


        },
        mounted() {
            this.init();
            // this.onChangeFireSuccess();
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
        height 900px
        display flex
        
        
        .flow-left
            width 790px
            height 900px
            overflow-x: auto;
            background-color #030A24

        .flow-right
            width 860px
            height 900px
            overflow auto
            background-color #f8f8f8

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
// <style lang="stylus">
//     .flow-process .flow-right
//         .ant-select
//             width 100%

//         .ant-calendar-picker-input
//             width: 100%;

//         .ant-calendar-picker-icon
//             display none !important
// </style>