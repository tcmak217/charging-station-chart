import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

function Chart({ csvJson }) {
  const myChart = useRef(null);
  const [chart, setChart] = useState(null);

  const items = ["1_1", "1_2", "1_3", "1_4"];

  useEffect(() => {
    // initialize the echarts instance
    let stackedChart = echarts.init(myChart.current);
    // Draw the chart
    stackedChart.setOption({
      title: {
        text: "Stacked chart",
      },
      xAxis: { type: "time" },
      yAxis: { type: "value" },
      dataZoom: { type: "inside" },
      series: [],
      legend: {},
      toolbox: {
        feature: {
          saveAsImage: {},
          magicType: { show: true, type: ["stack", "tiled"] },
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { snap: false, type: "cross" },
        alwaysShowContent: true,
      },
    });
    setChart(stackedChart);
  }, []);

  useEffect(() => {
    if (Object.keys(csvJson).length !== 0) {
      let newChart;
      if (chart === null) {
        console.log("chart is null");
        newChart = echarts.init(myChart.current);
      } else {
        console.log("chart exist");
        // console.log(chart);
        newChart = chart;
      }

      newChart.setOption({
        series: items.map((item) => {
          return {
            name: item,
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {},
            stack: "x",
            data: csvJson
              .filter((row) => {
                return row.ID === item;
              })
              .map((row) => {
                return [row.Date, row["Current Sum(A)"]];
              }),
          };
        }),
        legend: {
          data: items,
        },
      });
    }
  }, [csvJson]);

  return (
    <div id="main" ref={myChart}>
      Chart
    </div>
  );
}

export default Chart;
