import React from "react";
import DatePicker from "react-datepicker";
import { addDays, addHours } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker({
  startDate,
  endDate,
  handleSetStartDate,
  handleSetEndDate,
}) {
  const isPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() > selectedDate.getTime();
  };

  const isNextDay = (time) => {
    const selectedDate = new Date(time);

    return (
      selectedDate.getTime() < addHours(startDate, 24).getTime() &&
      selectedDate.getTime() > startDate
    );
  };

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
        filterTime={isPassedTime}
        maxDate={new Date()}
        dateFormat="dd/MM/yyyy h:mm aa"
      />
      To
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        selected={endDate ? endDate : startDate}
        showTimeSelect
        onChange={(end) => {
          console.log(end);
          handleSetEndDate(end);
        }}
        filterTime={isNextDay}
        minDate={startDate}
        maxDate={startDate ? addDays(startDate, 1) : new Date()}
        dateFormat="dd/MM/yyyy h:mm aa"
      />
    </>
  );
}

export default DateRangePicker;
