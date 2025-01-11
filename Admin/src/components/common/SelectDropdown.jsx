import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import InputBox from "./InputBox";

const SelectDropdown = ({ inputPlaceholder, reports, onSelect, promo }) => {
  const [dropDown, setDropDown] = useState(false);
  const [selectedDropDown, setSelectedDropDown] = useState(null);

  const toggle = () => {
    setDropDown(!dropDown);
  };

  const handleReportClick = (report) => {
    setSelectedDropDown(report === selectedDropDown ? null : report);
    setDropDown(false);
    if (onSelect) {
      onSelect(report);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="items-center relative">
        <InputBox
          placeholder={inputPlaceholder}
          value={selectedDropDown?.category}
        />
        <FontAwesomeIcon
          icon={faAngleDown}
          className=" text-[#6B7280] cursor-pointer text-[0.729vw] absolute right-4 bottom-3"
          onClick={toggle}
        />
      </div>

      {dropDown && (
        <ul
          className={`rounded-lg border border-gray-300 bg-white shadow-md text-[0.729vw] mt-4 ${
            promo && "w-[15vw]"
          }`}
        >
          {reports.map((report) => (
            <li
              key={report?.id}
              className={`cursor-pointer py-[0.625vw] px-[0.625vw] tracking-wide${
                selectedDropDown === report ? " bg-[#F9FAFB] font-semibold" : ""
              }`}
              onClick={() => handleReportClick(report)}
            >
              {report?.category}
              {selectedDropDown === report && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="ml-2 text-[#111827] float-right"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
