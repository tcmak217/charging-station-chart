import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import moment from "moment";

function Chart({ csvJson }) {
  const myChart = useRef(null);
  const [chart, setChart] = useState(null);

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
        newChart = chart;
      }

      let tempData = csvJson.filter((row) => {
        return row.ID === "1_1";
      });
      console.log(tempData);

      newChart.setOption({
        series: tempData.map((row) => {
          return {
            name: row.ID,
            type: "line",
            data: [moment(row.Date).format(), parseInt(row["Current Sum(A)"])],
            areaStyle: {},
            symbol: "none",
            //   stack: "Total",
          };
        }),
        // legend: {
        //   // data: ["1_1", "1_2", "1_ 3", "1_4"],
        //   data: tempData.map((row) => row.ID),
        // },
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
