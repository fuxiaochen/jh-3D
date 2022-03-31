<template>
  <div id="malfunction" style="width:110px;height:30px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "malfunction",
  data() {
    return {
      data: 70,
    };
  },
  methods: {
    initData2(aaa) {
      let myChart2 = echarts.init(document.getElementById("malfunction"));
      let option = {
        tooltip: {
          show: false,
          backgroundColor: "#030409", //背景颜色（此时为默认色）
          textStyle: {
            fontSize: 16,
          },
          // trigger: 'axis',
          // axisPointer: {
          //    type: 'shadow'
          // }
        },
        legend: {
          show: false,
        },
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          type: "value",

          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            splitLine: {
              show: false,
            },
            show: false,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisPointer: {
              label: {
                show: false,
                margin: 30,
              },
            },
          },
          {
            type: "category",
            inverse: false,
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
              formatter: function (value) {
                return value.toLocaleString() + "%";
              },
            },
            data: "70",
          },
        ],
        series: [
          {
            z: 3,
            //name: 'value',
            type: "bar",
            barWidth: "10",
            show: false,
            animationDuration: 1500,
            data: "90",
            itemStyle: {
              normal: {
                color: "#FF8F40",
                barBorderRadius: 5,
              },
            },
            label: {
              show: false,
              position: "right",
              color: "#fff",
              fontSize: 14,
              offset: [10, 0],
            },
          },
          {
            name: "背景",
            type: "bar",
            show: false,
            barWidth: 10,
            barGap: "-100%",
            z: 1,
            animationDuration: 1500,
            data: [10],
            itemStyle: {
              normal: {
                color: "#030409",
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






