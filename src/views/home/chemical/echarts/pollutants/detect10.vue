<template>
  <div id="detect10" style="width:580px;height:100px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "detect10",
  data() {
    return {
      data: 70,
    };
  },
  methods: {
    initData2() {
      let myChart2 = echarts.init(document.getElementById("detect10"));
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          // 会canvas的应该都能看得懂，shape是从custom传入的
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x - 10, shape.y];
          const c1 = [shape.x - 23, shape.y - 6];
          const c2 = [xAxisPoint[0] - 23, xAxisPoint[1] - 6];
          const c3 = [xAxisPoint[0] - 10, xAxisPoint[1]];
          ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        },
      });
      // 绘制右侧面
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x - 10, shape.y];
          const c2 = [xAxisPoint[0] - 10, xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 6, xAxisPoint[1] - 9];
          const c4 = [shape.x + 6, shape.y - 9];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      // 绘制顶面
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x - 10, shape.y];
          const c2 = [shape.x + 6, shape.y - 9]; //右点
          const c3 = [shape.x - 10, shape.y - 15];
          const c4 = [shape.x - 23, shape.y - 6];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      // 注册三个面图形
      echarts.graphic.registerShape("CubeLeft", CubeLeft);
      echarts.graphic.registerShape("CubeRight", CubeRight);
      echarts.graphic.registerShape("CubeTop", CubeTop);

      const VALUE = [10, 20, 10, 15, 10, 15, 20, 20, 10, 10];

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params, ticket, callback) {
            const item = params[1];
            return item.name + " : " + item.value;
          },
        },
        grid: {
          left: "0%",
          right: "2%",
          top: "7%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
          ],
          axisLine: {
            show: false,
            lineStyle: {
              color: "white",
            },
          },
          axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: "#7DFFFD",
            },
          },
          axisLabel: {
            fontSize: 12,
            fontWeight: "bold",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "white",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            fontWeight: "bold",
          },
          boundaryGap: ["20%", "5%"],
          minInterval: 10,
        },
        series: [
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#36ECFF",
                        },
                        {
                          offset: 1,
                          color: "#1C7084",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#36ECFF",
                        },
                        {
                          offset: 1,
                          color: "#1BC3EB",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#1BC3EB",
                        },
                        {
                          offset: 1,
                          color: "#25d3e3",
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: VALUE,
          },
          {
            type: "bar",
            label: {
              normal: {
                show: false,
                position: "top",
                formatter: (e) => {
                  switch (e.name) {
                    case "8:00":
                      return 0;
                    case "9:00":
                      return VALUE[1];
                    case "10:00":
                      return VALUE[2];
                  }
                },
                fontSize: 12,
                color: "#fff",
                offset: [2, -25],
              },
            },
            itemStyle: {
              color: "transparent",
            },
            tooltip: {},
            data: VALUE,
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






