import React from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";

function ExportCsv({ csvJson }) {
  const unparseToCsv = () => {
    let csv = Papa.unparse(csvJson);
    console.log(csv);
    let blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "example.csv");
  };

  return (
    <>
      <button onClick={unparseToCsv} disabled={!Object.keys(csvJson).length}>
        Export as CSV
      </button>
    </>
  );
}

export default ExportCsv;
