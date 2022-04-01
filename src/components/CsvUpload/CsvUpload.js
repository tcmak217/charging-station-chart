import React from "react";
import "./CsvUpload.css";

function CsvUpload() {
  return (
    <>
      <form>
        <input type="file" id="myUploadFile" accept=".csv" />
      </form>
    </>
  );
}

export default CsvUpload;
