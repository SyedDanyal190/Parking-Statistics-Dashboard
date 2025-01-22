import React from "react";
import PropTypes from "prop-types";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

// DateRangeFuns
const Calendar = ({ handleOnChange, dateRangeState }) => {
  return (
    <DateRangePicker
      onChange={handleOnChange}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={dateRangeState}
      direction="horizontal"
    />
  );
};

Calendar.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  dateRangeState: PropTypes.array.isRequired,
};

export default Calendar;
