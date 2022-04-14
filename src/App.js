import React, { useState } from "react";
import CsvUpload from "./components/CsvUpload/CsvUpload";
import Chart from "./components/Chart/Chart";
import FetchData from "./components/FetchData/FetchData";
import ChartPicker from "./components/ChartPicker/ChartPicker";
import Login from "./components/Login/Login";

function App() {
  const [csvJson, setCsvJson] = useState({});
  const [chartDataType, setChartDataType] = useState("Current");
  const [token, setToken] = useState("");
  const [isTokenExist, setIsTokenExist] = useState(false);

  const handleSetCsvJson = (csvJson) => {
    setCsvJson(csvJson);
  };

  const handleSetChartDataType = (chartDataType) => {
    setChartDataType(chartDataType);
  };

  const handleSetToken = (token) => {
    setToken(token);
  };

  const handleSetIsTokenExist = (isTokenExist) => {
    setIsTokenExist(isTokenExist);
  };

  return (
    <>
      <CsvUpload
        csvJson={csvJson}
        handleSetCsvJson={handleSetCsvJson}
      ></CsvUpload>
      <Login
        handleSetToken={handleSetToken}
        handleSetIsTokenExist={handleSetIsTokenExist}
        isTokenExist={isTokenExist}
      ></Login>
      <FetchData
        token={token}
        csvJson={csvJson}
        handleSetCsvJson={handleSetCsvJson}
        isTokenExist={isTokenExist}
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
