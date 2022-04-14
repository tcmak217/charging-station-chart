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
      Start Date
      <DatePicker
        selected={startDate}
        onChange={(date) => handleSetStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      End Date
      <DatePicker
        selected={endDate}
        onChange={(date) => handleSetEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
}

export default DateRangePicker;
