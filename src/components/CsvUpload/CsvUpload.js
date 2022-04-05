import React, { useEffect, useState } from "react";
import moment from "moment";
import Papa from "papaparse";
import "./CsvUpload.css";

function CsvUpload({ csvJson, handleSetCsvJson }) {
  const [file, setFile] = useState(null);
  const [csvString, setCsvString] = useState("");

  const fileReader = new FileReader();

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    console.log("File uploaded");
  };

  const handleFileImport = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        setCsvString(event.target.result);
      };

      fileReader.readAsText(file);
    }
  };

  useEffect(() => {
    let csvParse = {};
    if (csvString !== "") {
      csvParse = Papa.parse(csvString, { header: true });
      csvParse = csvParse.data
        .filter(
          (row) =>
            (row.ID === "1_1") |
            (row.ID === "1_2") |
            (row.ID === "1_3") |
            (row.ID === "1_4")
        )
        .map((row) => {
          return {
            Date: moment(row.Date, "MM/DD/YY hh:mm:ss a").format(),
            ID: row.ID,
            "Current Sum(A)": row["Current Sum(A)"],
          };
        });
      // console.log(csvParse);
      handleSetCsvJson(csvParse);
    }
  }, [csvString]);

  return (
    <>
      <form>
        <input
          type="file"
          id="myUploadFile"
          accept=".csv"
          onChange={handleFileUpload}
        />
        <button onClick={handleFileImport}>Import CSV file</button>
      </form>
    </>
  );
}

export default CsvUpload;
