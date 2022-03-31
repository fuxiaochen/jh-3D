<template>
  <div id="closed2" style="width:420px;height:50px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "closed2",
  data() {
    return {
      data: 70,
    };
  },
  methods: {
    initData2() {
      let myChart2 = echarts.init(document.getElementById("closed2"));

      let option = {
        grid: {
          left: "-18%",
          bottom: "0",
          right: "0",
          top: "50%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          show: false,
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            axisLabel: {
              verticalAlign: "bottom",
              align: "left",
              padding: [0, 0, 15, 15],
              textStyle: {
                color: "#FFFFFF",
                fontWeight: 'bold',
                fontSize: "18",
              },
            },
            data: ["氧气瓶  1"],
            inverse: true,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
            },
            data: [49],
          },
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#36ecff",
                  },
                  {
                    offset: 1,
                    color: "#a2f7ff",
                  },
                ]),
              },
            },
            barWidth: 20,
            data: [49],
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: [50],
            itemStyle: {
              normal: {
                color: "#27a4b3",
                barBorderRadius: 30,
              },
            },
          },
        ],
      };
      myChart2.setOption(option);
    },
  },
  mounted() {
    this.initData2(this.data);
  },
};
</script>






