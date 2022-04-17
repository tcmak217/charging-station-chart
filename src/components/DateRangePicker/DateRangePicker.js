import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker({
  startDate,
  endDate,
  handleSetStartDate,
  handleSetEndDate,
}) {
  return (
    <>
      Date range <br></br>
      From
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        selected={startDate}
        showTimeSelect
        onChange={(start) => {
          console.log(start);
          handleSetStartDate(start);
        }}
        dateFormat="dd/MM/yyyy h:mm aa"
      />
      To
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        selected={endDate}
        showTimeSelect
        onChange={(end) => {
          console.log(end);
          handleSetEndDate(end);
        }}
        minDate={startDate}
        dateFormat="dd/MM/yyyy h:mm aa"
      />
    </>
  );
}

export default DateRangePicker;
