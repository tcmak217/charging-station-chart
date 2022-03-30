document.addEventListener("DOMContentLoaded", function (event) {
  let csvData = [];
  function interpolation(timeData, data) {
    let interpolatedData = [];
    let last = "0";
    let index = data.length - 1;
    // console.log("timeData: ", timeData, "data: ", data);

    for (time of timeData) {
      //   console.log(
      //     moment(time).isSame(moment(data[index][0])),
      //     moment(time),
      //     moment(data[index][0])
      //   );
      if (index >= 0 && moment(time).isSame(moment(data[index][0]))) {
        // console.log(data[index]);
        interpolatedData.push([time, data[index][1]]);
        last = data[index][1];
        index--;
      } else if (index >= 0 && moment(time).isAfter(moment(data[index][0]))) {
        interpolatedData.push([time, last]);
        index--;
        while (index >= 0 && moment(time).isAfter(moment(data[index][0]))) {
          index--;
        }
      } else {
        interpolatedData.push([time, last]);
      }
    }
    console.log("interpolatedData: ", interpolatedData);
    return interpolatedData;
  }
  function readFile(e) {
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    Papa.parse(file, {
      complete: function (results) {
        // console.log(results.data);
        let timeData = [
          ...new Set(
            results.data
              .filter(
                (row) =>
                  row[2] === "1_1" ||
                  row[2] === "1_2" ||
                  row[2] === "1_3" ||
                  row[2] === "1_4" ||
                  row[2] === "ID"
              )
              .map((row) => moment(row[1]).format())
              .filter((row) => row != "Invalid date")
          ),
        ].reverse();
        // console.log(timeData);

        csvData.push({
          id: "1_1",
          name: results.data.filter((row) => {
            return row[2] === "1_1";
          })[0][3],
          data: interpolation(
            timeData,
            results.data
              .filter((row) => {
                return row[2] === "1_1";
              })
              .map((row) => {
                return [
                  row[2] === "ID" ? "Date" : moment(row[1]).format(),
                  row[12],
                ];
              })
          ),
        });

        csvData.push({
          id: "1_2",
          name: results.data.filter((row) => {
            return row[2] === "1_2";
          })[0][3],
          data: interpolation(
            timeData,
            results.data
              .filter((row) => {
                return row[2] === "1_2";
              })
              .map((row) => {
                return [
                  row[2] === "ID" ? "Date" : moment(row[1]).format(),
                  row[12],
                ];
              })
          ),
        });

        csvData.push({
          id: "1_3",
          name: results.data.filter((row) => {
            return row[2] === "1_3";
          })[0][3],
          data: interpolation(
            timeData,
            results.data
              .filter((row) => {
                return row[2] === "1_3";
              })
              .map((row) => {
                return [
                  row[2] === "ID" ? "Date" : moment(row[1]).format(),
                  row[12],
                ];
              })
          ),
        });

        csvData.push({
          id: "1_4",
          name: results.data.filter((row) => {
            return row[2] === "1_4";
          })[0][3],
          data: interpolation(
            timeData,
            results.data
              .filter((row) => {
                return row[2] === "1_4";
              })
              .map((row) => {
                return [
                  row[2] === "ID" ? "Date" : moment(row[1]).format(),
                  row[12],
                ];
              })
          ),
        });

        console.log("csvData", csvData);
        myChart.setOption({
          series: csvData.map((data) => {
            return {
              name: data.name,
              type: "line",
              data: data.data,
              areaStyle: {},
              symbol: "none",
              //   stack: "Total",
            };
          }),
          legend: {
            data: csvData.map((data) => data.name),
          },
        });
        // console.log("Finished:", results.data);
        // console.log("Filtered:", csvData);
      },
    });
  }
  document
    .getElementById("myUploadFile")
    .addEventListener("change", readFile, false);

  // Initialize the echarts instance based on the prepared dom
  var myChart = echarts.init(document.getElementById("main"));

  // Specify the configuration items and data for the chart
  var option = {
    title: {
      text: "ECharts Getting Started Example",
    },
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
    xAxis: { type: "time" },
    yAxis: { type: "value" },
    dataZoom: { type: "inside" },
    series: [],
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);
});
