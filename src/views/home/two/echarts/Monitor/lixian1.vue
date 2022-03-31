<template>
  <div id="lixian1" style="width:60px;height:61px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "lixian1",
  data() {
    return {
      data: 40,
    };
  },
  methods: {
    initData2(aaa) {
      let myChart2 = echarts.init(document.getElementById("lixian1"));

      let option = {
        title: {
          text: "离线",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: "16",
            color: "#36ecff",
            fontFamily: "MicrosoftYaHei-Bold",
          },
        },

        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["80%", "96%"],
            startAngle: 150,
            silent: true,
            z: 1,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                name: "剩余",
                value: 100 - aaa,
                itemStyle: {
                  normal: {
                    color: "#0E333B99",
                  },
                },
              },
              {
                value: aaa,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#36ecff",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
            ],
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






