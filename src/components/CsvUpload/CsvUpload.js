import React, { useState } from "react";
import "./CsvUpload.css";

function CsvUpload() {
  const [file, setFile] = useState();

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
        const csvOutput = event.target.result;
      };

      fileReader.readAsText(file);
    }
  };

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
