import React, { useState, useRef, useEffect } from "react";
import '../Dashboard/Style/Style.css';
import moment from "moment";
import Calendar from "./Calendar"; // Adjust the path if necessary
import { IoMdArrowDropdown } from "react-icons/io";

const DateRangeButton = ({ onDateChange } ) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRangeState, setDateRangeState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ]);

  const calendarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current && !calendarRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };
   

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    // console.log('Date Type Check!!!!!!!!!!!!!!!!!!!!!!!!!:', startDate, endDate);
    setDateRangeState([ranges.selection]);
    if (onDateChange) {
      onDateChange({ startDate, endDate }); // Send the dates to the parent
    }
  };
 
  const { startDate, endDate } = dateRangeState[0];


  


 
  const getDateDifference = (dates) => {
    const [startDate, endDate] = dates.map(date => moment(date).startOf('day'));
    const today = moment().startOf('day');
    const yesterday = today.clone().subtract(1, 'day');
    const startOfWeek = today.clone().startOf('week');
    const endOfWeek = today.clone().endOf('week');
    const startOfMonth = today.clone().startOf('month');
    const endOfMonth = today.clone().endOf('month');
    const startOfLastWeek = startOfWeek.clone().subtract(1, 'week');
    const endOfLastWeek = endOfWeek.clone().subtract(1, 'week');
    const startOfLastMonth = startOfMonth.clone().subtract(1, 'month').startOf('month');
    const endOfLastMonth = startOfMonth.clone().subtract(1, 'month').endOf('month');

    if (startDate.isSame(today, 'day') && endDate.isSame(today, 'day')) {
      return `Today ${today.format('D MMM YYYY')}`;
    }

    if (startDate.isSame(yesterday, 'day') && endDate.isSame(yesterday, 'day')) {
      return `Yesterday ${yesterday.format('D MMM YYYY')}`;
    }

    if (startDate.isSame(startOfWeek, 'day') && endDate.isSame(endOfWeek, 'day')) {
      return `This Week ${startOfWeek.format('D MMM')} - ${endOfWeek.format('D MMM YYYY')}`;
    }

    if (startDate.isSame(startOfLastWeek, 'day') && endDate.isSame(endOfLastWeek, 'day')) {
      return `Last Week ${startOfLastWeek.format('D MMM')} - ${endOfLastWeek.format('D MMM YYYY')}`;
    }

    if (startDate.isSame(startOfMonth, 'day') && endDate.isSame(endOfMonth, 'day')) {
      return `This Month ${startOfMonth.format('D MMM')} - ${endOfMonth.format('D MMM YYYY')}`;
    }

    if (startDate.isSame(startOfLastMonth, 'day') && endDate.isSame(endOfLastMonth, 'day')) {
      return `Last Month ${startOfLastMonth.format('D MMM')} - ${endOfLastMonth.format('D MMM YYYY')}`;
    }

    if (startDate.isSame(endDate, 'day') && !startDate.isSame(today, 'day')) {
      return `Custom ${startDate.format('D MMM YYYY')}`;
    }

    return `Custom ${startDate.format('D MMM')} - ${endDate.format('D MMM YYYY')}`;
  };

  // const handleOnChange = (ranges) => {
  //   setDateRangeState([ranges.selection]);
  // };


 


  const buttonText = getDateDifference([startDate, endDate]);

  // Extract label and dates
  const isToday = buttonText.startsWith('Today');
  const isYesterday = buttonText.startsWith('Yesterday');
  const isCustom = buttonText.startsWith('Custom');
  const label = isToday ? 'Today' : 
                 isYesterday ? 'Yesterday' : 
                 isCustom ? 'Custom' : 
                 buttonText.split(" ").slice(0, 2).join(" "); // For other ranges

  const dates = isToday || isYesterday || isCustom ? buttonText.split(" ").slice(1).join(" ") :
                 buttonText.split(" ").slice(2).join(" "); // For other ranges

  // Determine label style based on the label
  const getLabelStyle = () => {
    if (isToday || isYesterday || isCustom) {
      return { backgroundColor: "#f56e50", color: "white" }; // White background for Today, Yesterday, and Custom
    }
    return { backgroundColor: "#f56e50", color: "white" }; // Default background color
  };

  return (
    <div className="btn-primary-custom">
      <div className="col-auto">
        <button
          className="btn  d-flex align-items-center " id="Okas"  
          onClick={() => setShowCalendar(prev => !prev)}
          ref={buttonRef}
        >
          <span
            // className="btn-custom-label" id="Oka"
            
            style={getLabelStyle()}
          >
            {label}
          </span>
          &nbsp; &nbsp;
          <span className="btn-custom-date" id="Oka">{dates}</span>
          <IoMdArrowDropdown 
            className="btn-custom-dropdown" 
            style={{ marginLeft: 'auto' }}
          />
        </button>
      </div>

      {showCalendar && (
        <div ref={calendarRef}>
          <Calendar
            handleOnChange={handleOnChange}
            dateRangeState={dateRangeState}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeButton;




