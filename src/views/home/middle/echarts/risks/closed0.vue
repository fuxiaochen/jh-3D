<template>
  <div id="closed0" style="width:580px;height:185px"></div>
</template>

<script>
import * as echarts from "echarts";
let myChart2 = null;
export default {
  name: "closed0",
  data() {
    return {
      dataList: null,
      rotate: 0,
      end: 30,
      fontSize: 14,
    };
  },
  methods: {
    initData2() {
      myChart2 = echarts.init(document.getElementById("closed0"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          borderWidth: 0,
          top: 35,
          bottom: 30,
          right: 0,
          left: 30,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          x: "4%",
          top: "0",
          textStyle: {
            color: "#90979c",
          },
          data: ["安全隐患", "交通事故", "虚惊事故", "异常事故"],
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#ffffff",
              },
            },

            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
                rotate: this.rotate,  //字体倾斜度数
                interval: 0,//interval 是指间隔多少个类别画栅格，为 0 时则每个数据都画，为 1 时间隔 1 个画，以此类推
                textStyle:{//字体颜色
                    fontSize: this.fontSize //字体大小
                }
            },
            data: this.dataList.dateList,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#ffffff",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            splitArea: {
              show: false,
            },
          },
        ],
            "dataZoom": [{
            "show": false,
            "height": 10,
            "xAxisIndex": [
                0
            ],
            bottom: 30,
            "start": 0,
            "end": this.end,
            handleSize: '110%',
            handleStyle:{
                color:"#d3dee5",

            },
               textStyle:{
                color:"#fff"},
               borderColor:"#90979c"

        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
        }],
        series: [
          {
            name: "安全隐患",
            type: "bar",
            stack: "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#36ecff",
                    },
                    {
                      offset: 1,
                      color: "#00b7c1",
                    },
                  ],
                  false
                ),
                label: {
                  show: false,
                  textStyle: {
                    color: "#fff",
                  },
                  position: "inside",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: this.dataList.listA,
          },
          {
            name: "交通事故",
            type: "bar",
            stack: "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#50c7ff",
                    },
                    {
                      offset: 1,
                      color: "#0492d4",
                    },
                  ],
                  false
                ),
                label: {
                  show: false,
                  textStyle: {
                    color: "#fff",
                  },
                  position: "inside",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: this.dataList.listB,
          },
          {
            name: "虚惊事故",
            type: "bar",
            stack: "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#ff9ba8",
                    },
                    {
                      offset: 1,
                      color: "#d34355",
                    },
                  ],
                  false
                ),
                label: {
                  show: false,
                  textStyle: {
                    color: "#fff",
                  },
                  position: "inside",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: this.dataList.listD,
          },
          ,
          {
            name: "异常事故",
            type: "bar",
            stack: "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#ff7979",
                    },
                    {
                      offset: 1,
                      color: "#ff0000",
                    },
                  ],
                  false
                ),
                label: {
                  show: false,
                  textStyle: {
                    color: "#fff",
                  },
                  position: "inside",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: this.dataList.listE,
          },
          {
            name: "总数",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "#36ecff",
                barBorderRadius: 0,
                label: {
                  show: false,
                  position: "top",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: this.dataList.list,
          },
        ],
      };
      myChart2.setOption(option);
    },
    aaa(a,b) {
      myChart2.clear();
      this.rotate = 0;
      this.fontSize = 14;
      this.dataList = a;
      if (b == "year" || b == "month") {
        this.end = 15;
      }
      this.initData2();
    },
    getData(caseType, dateType) {
      let data = {
        caseType: caseType,
        dateType: dateType,
      };
      this.$http
        .get("/largeScreen/normalState/hazardIdentification", data)
        .then((res) => {
          this.dataList = res.data.data;
          this.initData2();
        });
    },
  },
  mounted() {
    this.getData(2, "day");
  },
};
</script>






