import React, { useEffect, useRef, useState } from "react";
import CalendarIcon from "../../assets/wallet/calendar.svg";

const DateRange = ({ onDateRangeSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (range) => {
    setIsOpen(false);
    onDateRangeSelect(range);
  };

  return (
    <div ref={buttonRef} className="relative flex">
      <div className="flex gap-3 border border-[#D0D5DD] w-[10vw] pl-4 rounded-lg items-center">
        <img
          src={CalendarIcon}
          alt="calendar"
          className="w-[1.25vw] h-[2.4vh]"
        />
        <p
          className="text-[#667085] font-semibold text-[0.833vw] cursor-pointer"
          onClick={toggleDropdown}
        >
          Date Range
        </p>
      </div>

      {isOpen && (
        <div
          className="absolute top-12 w-[9.167vw] bg-white border p-2 shadow-lg cursor-pointer text-[0.729vw] font-medium pl-3"
          style={{
            zIndex: 1000,
          }}
        >
          <p className="py-2" onClick={() => handleDateSelect("today")}>
            Today
          </p>
          <p className="py-2" onClick={() => handleDateSelect("thisWeek")}>
            This Week
          </p>
          <p className="py-2" onClick={() => handleDateSelect("thisMonth")}>
            This Month
          </p>
          <p className="py-2" onClick={() => handleDateSelect("thisYear")}>
            This Year
          </p>
          <p className="py-2">Custom Date</p>
        </div>
      )}
    </div>
  );
};

export default DateRange;
