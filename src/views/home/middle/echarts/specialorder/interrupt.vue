<template>
  <div id="interrupt" style="width:52px;height:52px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "interrupt",
  data() {
    return {
      data: 65,
    };
  },
  methods: {
    initData2(aaa) {
      let myChart2 = echarts.init(document.getElementById("interrupt"));

      let option = {
        title: {
          text: "有限",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: "16",
            color: "#FFFFFF",
            fontFamily: "MicrosoftYaHei-Bold",
            foontWeight: "Bold",
          },
        },

        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["80%", "96%"],
            startAngle: 50,
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
                    color: "#00c855",
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
   getData(){
				this.$http.post("/largeScreen/normalState/order").then(res => {
        this.initData2(100);
			});
			},
  },
  mounted() {
    this.getData();
  },
};
</script>






