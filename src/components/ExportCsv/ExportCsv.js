import React from "react";
import Papa from "papaparse";
import moment from "moment";
import { saveAs } from "file-saver";

function ExportCsv({ csvJson }) {
  const unparseToCsv = () => {
    let exportJson = csvJson.map((row) => {
      return { ...row, Date: moment(row.Date) };
    });
    let csv = Papa.unparse(exportJson);
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
