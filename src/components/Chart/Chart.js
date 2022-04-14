import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import * as echarts from "echarts";

function Chart({ csvJson, chartDataType }) {
  const myChart = useRef(null);
  const [chart, setChart] = useState(null);

  const sortByTime = (data) => {
    return data.sort((a, b) => moment(a.Date).diff(moment(b.Date)));
  };

  const removeDuplicatedData = (data) => {
    return Array.from(new Set(data));
  };

  const extractNames = (idList, csvJson) => {
    // console.log("idList", idList, "csvJson", csvJson);
    return idList.map((id) => {
      return { ID: id, Name: csvJson.filter((row) => row.ID === id)[0].Name };
    });
  };

  const interpolation = (csvJson) => {
    const idList = ["1_1", "1_2", "1_3", "1_4"];

    // Extract date column from csvJson and sort it by time
    const sortedDate = sortByTime(csvJson).map((data) => data.Date);
    // console.log("sortedDate", sortedDate);

    // Remove all duplicated value
    const uniqueDate = removeDuplicatedData(sortedDate);
    // console.log("uniqueDate", uniqueDate);

    // Split csvJson into 4 objects grouped by ID
    const splitData = idList.map((id) => {
      return {
        ID: id,
        data: sortByTime(
          csvJson.filter((item) => {
            return item.ID === id;
          })
        ),
      };
    });
    // console.log("splitData", splitData);

    // Substitute the Date column with uniqueDate
    // Set Current Sum(A) to null if there is no value on that data point in the original dataset (require interpolation)
    const interpolatedData = idList.map((id) => {
      return {
        ID: id,
        data: uniqueDate.map((date) => {
          return {
            Date: date,
            ID: id,
            "Current Sum(A)": splitData
              .filter((data) => {
                return data.ID === id;
              })[0]
              .data.filter((row) => {
                return row.Date === date;
              })[0]
              ? splitData
                  .filter((data) => {
                    return data.ID === id;
                  })[0]
                  .data.filter((row) => {
                    return row.Date === date;
                  })[0]["Current Sum(A)"]
              : null,
            Switch: splitData
              .filter((data) => {
                return data.ID === id;
              })[0]
              .data.filter((row) => {
                return row.Date === date;
              })[0]
              ? splitData
                  .filter((data) => {
                    return data.ID === id;
                  })[0]
                  .data.filter((row) => {
                    return row.Date === date;
                  })[0].Switch
              : null,
          };
        }),
      };
    });

    // Use previous value to interpolate the dataset
    interpolatedData.forEach((row) => {
      let prevCurrentValue = "0";
      let prevSwitchValue = 0;

      row.data.forEach((row) => {
        if (row["Current Sum(A)"] === null) {
          row["Current Sum(A)"] = prevCurrentValue;
        } else {
          prevCurrentValue = row["Current Sum(A)"];
        }

        if (row.Switch === null) {
          row.Switch = prevSwitchValue;
        } else {
          prevSwitchValue = row.Switch;
        }
      });
    });
    console.log("interpolatedData", interpolatedData);

    return interpolatedData;
  };

  const idList = ["1_1", "1_2", "1_3", "1_4"];

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
      const nameList = extractNames(idList, csvJson);
      console.log("nameList", nameList);
      let newChart;
      if (chart === null) {
        console.log("chart is null");
        newChart = echarts.init(myChart.current);
      } else {
        console.log("chart exist");
        // console.log(chart);
        newChart = chart;
      }

      const interpolatedData = interpolation(csvJson);

      newChart.setOption({
        series: idList.map((id) => {
          return {
            name: nameList.filter((row) => {
              return row.ID === id;
            })[0].Name,
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {},
            stack: "x",
            data: interpolatedData
              .filter((row) => {
                return row.ID === id;
              })[0]
              .data.map((row) => {
                return [
                  row.Date,
                  chartDataType === "Current"
                    ? row["Current Sum(A)"]
                    : chartDataType === "Switch"
                    ? row.Switch
                    : row["Current Sum(A)"],
                ];
              }),
          };
        }),
        legend: {
          data: nameList.map((row) => {
            return row.Name;
          }),
        },
      });
    }
  }, [csvJson, chartDataType]);

  return (
    <div id="main" ref={myChart}>
      Chart
    </div>
  );
}

export default Chart;
