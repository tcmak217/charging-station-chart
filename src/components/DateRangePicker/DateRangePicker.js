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
      Date range
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          const [start, end] = update;
          handleSetStartDate(start);
          handleSetEndDate(end);
        }}
        dateFormat="dd/MM/yyyy"
      />
    </>
  );
}

export default DateRangePicker;
