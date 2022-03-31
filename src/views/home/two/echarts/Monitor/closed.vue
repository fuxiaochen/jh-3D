<template>
  <div id="closed" style="width:580px;height:125px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "closed",
  data() {
    return {
      data: 70,
    };
  },
  methods: {
    initData2(aaaa) {
      let myChart2 = echarts.init(document.getElementById("closed"));

      let yList = aaaa.toatalDataList;
      let yList1 = aaaa.lxDataList;
      let xList = aaaa.nameDataList;
      let xData = xList.map((item, index) => {
        return {
          value: item,
          textStyle: {
            color: "#FFFFFF",
          },
        };
      });
      let dom = 400;
      let barWidth = dom / 20;
      let colors = [
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
	          {
		          offset: 0,
		          color: "#FFFFFF",
	          },
	          {
		          offset: 0.5,
		          color: "#9E9E9E",
	          },
	          {
		          offset: 1,
		          color: "#9E9E9E",
	          },
          ],
        },
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
	          {
		          offset: 0,
		          color: "#36ECFF",
	          },
	          {
		          offset: 0.5,
		          color: "#00B7C1",
	          },
	          {
		          offset: 1,
		          color: "#00B7C1",
	          },
          ],
        },
      ];
      let option = {
        backgroundColor: "#03040900",
        //提示框
        tooltip: {
          trigger: "axis",
          show: false,
          formatter: "{b} : {c}",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        /**区域位置*/
          grid: {
              left: '7%',
              right: '0%',
              top: '17%',
              bottom: '35%',
            },
        /**图例大小*/
        //  legend: {
        //   type: 'plain',
        //   left: 0,
        //   top: 20,
        //   itemGap: 20,
        //   itemWidth: 35,
        //   itemHeight: 20
        // },
        //X轴
        xAxis: {
          nameTextStyle: {
            color: "#FFFFFF",
            padding: [10, 0, 0, 0],
          },
          data: xData,
          show: true,
          type: "category",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#00B7C1",
            },
          },
          axisLabel: {
            padding: [10, 0, 0, 0],
            fontSize: 12,
          },
        },
        yAxis: {
          minInterval: 10,
          show: true,
          splitNumber: 3,
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          axisLabel: {
            color: "#FFFFFF",
          },
        },
        series: [
          {
            type: "bar",
            barWidth: barWidth,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colors[0 % 7];
                },
              },
            },
            label: {
              show: true,
              position: [barWidth / 2, -(barWidth + 20)],
              color: "#ffffff",
              fontSize: 12,
              fontStyle: "bold",

                padding: [20, 0, 0,-8],
            },
            data: yList1,
          },
          {
            type: "bar",
            barWidth: barWidth,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colors[1 % 7];
                },
              },
            },
            label: {
              show: true,
              position: [barWidth / 2, -(barWidth + 20)],
              color: "#ffffff",
              fontSize: 12,
              fontStyle: "bold",

                padding: [20, 0, 0,-7],
            },
            data: yList,
          },
          {
            z: 2,
            type: "pictorialBar",
            data: yList1,
            symbol: "diamond",
            symbolOffset: [-13.5, "50%"],
            symbolSize: [barWidth, barWidth * 0.5],
            itemStyle: {
              normal: {
                color: function (params) {
                  return colors[0 % 7];
                },
              },
            },
          },
          {
            z: 2,
            type: "pictorialBar",
            data: yList,
            symbol: "diamond",
            symbolOffset: [13.5, "50%"],
            symbolSize: [barWidth, barWidth * 0.5],
            itemStyle: {
              normal: {
                color: function (params) {
                  return colors[1 % 7];
                },
              },
            },
          },
          {
            z: 3,
            type: "pictorialBar",
            symbolPosition: "end",
            data: yList1,
            symbol: "diamond",
            symbolOffset: [-13.5, "-50%"],
            symbolSize: [barWidth, barWidth * 0.5],
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: function (params) {
                  return "#ffffff";
                },
              },
            },
          },
          {
            z: 3,
            type: "pictorialBar",
            symbolPosition: "end",
            data: yList,
            symbol: "diamond",
            symbolOffset: [13.5, "-50%"],
            symbolSize: [barWidth, barWidth * 0.5],
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: function (params) {
                  return "#36ECFF";
                },
              },
            },
          },
        ],
      };
      myChart2.setOption(option);
    },
    getData() {
          this.$http.post("/largeScreen/normalState/securityEquipmentTest").then(res => {
          this.initData2(res.data.data);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>






