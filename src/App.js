import React, { useState } from "react";
import CsvUpload from "./components/CsvUpload/CsvUpload";
import Chart from "./components/Chart/Chart";
import FetchData from "./components/FetchData/FetchData";
import ChartPicker from "./components/ChartPicker/ChartPicker";

function App() {
  const [csvJson, setCsvJson] = useState({});
  const [chartDataType, setChartDataType] = useState("Current");

  const handleSetCsvJson = (csvJson) => {
    setCsvJson(csvJson);
  };

  const handleSetChartDataType = (chartDataType) => {
    setChartDataType(chartDataType);
  };

  return (
    <>
      <CsvUpload
        csvJson={csvJson}
        handleSetCsvJson={handleSetCsvJson}
      ></CsvUpload>
      <FetchData
        csvJson={csvJson}
        handleSetCsvJson={handleSetCsvJson}
      ></FetchData>
      <ChartPicker
        chartDataType={chartDataType}
        handleSetChartDataType={handleSetChartDataType}
      ></ChartPicker>
      <Chart csvJson={csvJson} chartDataType={chartDataType}></Chart>
    </>
  );
}

export default App;
