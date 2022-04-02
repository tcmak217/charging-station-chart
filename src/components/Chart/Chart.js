import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

function Chart() {
  useEffect(() => {
    // initialize the echarts instance
    let myChart = echarts.init(document.getElementById("main"));
    // Draw the chart
    myChart.setOption({
      title: {
        text: "Stacked chart",
      },
      tooltip: {},
      xAxis: {
        data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
      },
      yAxis: {},
      series: [
        {
          name: "sales",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  }, []);

  return <div id="main">Chart</div>;
}

export default Chart;
