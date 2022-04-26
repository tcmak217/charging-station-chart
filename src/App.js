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
  const [projectID, setProjectID] = useState();

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

  const handleProjectID = (projectID) => {
    setProjectID(projectID);
  };

  return (
    <>
      <h1>Charging station usage chart</h1>
      <CsvUpload
        csvJson={csvJson}
        handleSetCsvJson={handleSetCsvJson}
      ></CsvUpload>
      <Login
        handleSetToken={handleSetToken}
        handleSetIsTokenExist={handleSetIsTokenExist}
        isTokenExist={isTokenExist}
        handleProjectID={handleProjectID}
      ></Login>
      <FetchData
        token={token}
        csvJson={csvJson}
        handleSetCsvJson={handleSetCsvJson}
        isTokenExist={isTokenExist}
        projectID={projectID}
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
