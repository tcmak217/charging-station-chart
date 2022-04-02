import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./CsvUpload.css";

function CsvUpload() {
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
        console.log(event.target.result);
        setCsvString(event.target.result);
      };

      fileReader.readAsText(file);
    }
  };

  useEffect(() => {
    const results = Papa.parse(csvString, { header: true });
    console.log(results);
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
