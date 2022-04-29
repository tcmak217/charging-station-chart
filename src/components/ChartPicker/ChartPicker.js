import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./ChartPicker.css";

function ChartPicker({ chartDataType, handleSetChartDataType }) {
  const handleChange = (event) => {
    handleSetChartDataType(event.target.value);
  };

  return (
    <div className="ChartPicker">
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chartDataType}
            label="Chart data"
            onChange={handleChange}
          >
            <MenuItem value={"Current"}>Charger Current(A)</MenuItem>
            <MenuItem value={"Switch"}>No. of EV plugged-in</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default ChartPicker;
