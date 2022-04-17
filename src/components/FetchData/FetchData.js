import React, { useState } from "react";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

function FetchData({ csvJson, handleSetCsvJson, token, isTokenExist }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetStartDate = (startDate) => {
    setStartDate(startDate);
  };

  const handleSetEndDate = (endDate) => {
    setEndDate(endDate);
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(
        "https://open.delightintl.com/api/device-status/query",
        {
          type: "4",
          projectId: 30013,
          startDate: moment(startDate).format(),
          endDate: moment(endDate).format(),
          areas: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const parsedData = res.data.data.contents
          .filter(
            (row) =>
              (row[1] === "1_1") |
              (row[1] === "1_2") |
              (row[1] === "1_3") |
              (row[1] === "1_4")
          )
          .map((row) => {
            return {
              Date: moment(row[0], "YYYY-MM-DD hh:mm:ss").format(),
              ID: row[1],
              "Current Sum(A)": row[11].toString(),
              Name: row[2],
              Switch: row[3],
            };
          });
        handleSetCsvJson(parsedData);
        console.log(res.data.data.contents);
        console.log(parsedData);
      });
    setIsLoading(false);
  };

  return (
    <div>
      <form>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          handleSetStartDate={handleSetStartDate}
          handleSetEndDate={handleSetEndDate}
        ></DateRangePicker>
        <button onClick={handleFetch} disabled={!isTokenExist}>
          Fetch data
        </button>
        {isLoading ? <CircularProgress /> : null}
      </form>
    </div>
  );
}

export default FetchData;
