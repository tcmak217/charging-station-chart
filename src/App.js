import React, { useState } from "react";
import CsvUpload from "./components/CsvUpload/CsvUpload";
import Chart from "./components/Chart/Chart";
import FetchData from "./components/FetchData/FetchData";

function App() {
  const [csvJson, setCsvJson] = useState({});
  const handleSetCsvJson = (csvJson) => {
    setCsvJson(csvJson);
  };
  return (
    <>
      <CsvUpload
        csvJson={csvJson}
        handleSetCsvJson={handleSetCsvJson}
      ></CsvUpload>
      <FetchData></FetchData>
      <Chart csvJson={csvJson}></Chart>
    </>
  );
}

export default App;
