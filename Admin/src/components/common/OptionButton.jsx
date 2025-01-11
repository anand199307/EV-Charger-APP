import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { readUser } from "../../services/localStorage.service";

import profile from "../../assets/header/profile.svg";
import { useLocation } from "react-router-dom";

const OptionButton = ({
  isActive,
  options,
  active,
  option,
  style,
  pro,
  opt,
  table,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef(null);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const user = readUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex gap-5 items-center relative">
        {active && (
          <button
            className="text-[0.677vw] flex items-center px-3 py-1.5"
            style={{
              border: "1px solid var(--grey-grey-20, #E5E7EB)",
              borderRadius: "0.5rem",
              ...style,
            }}
          >
            <FontAwesomeIcon
              icon={faCircle}
              className={`text-[0.4rem] pr-2 ${
                isActive ? "text-green-500" : "text-red-500"
              }`}
            />
            {isActive ? "Active" : "Inactive"}
          </button>
        )}

        {option && (
          <button
            ref={buttonRef}
            className="rounded-lg w-[2vw] h-[4.2vh]"
            style={{
              border: "1px solid var(--grey-grey-20, #E5E7EB)",
              background: "var(--grey-grey-5, #F9FAFB)",
              borderRadius: "0.5rem",
            }}
            onClick={togglePopover}
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={table ? "" : "rotate-90"}
            />
          </button>
        )}

        {isPopoverOpen && (
          <div
            className="absolute top-10 right-0 w-[10.167vw] bg-white border p-2 shadow-lg cursor-pointer "
            style={{
              zIndex: 1000,
            }}
          >
            {options.map((option, index) => (
              <div key={index}>{option}</div>
            ))}
          </div>
        )}

        {pro && (
          // <img
          //   src={profile}
          //   alt="profile"
          //   className="w-11 cursor-pointer"
          // onClick={togglePopover}
          // />
          <div
            onClick={togglePopover}
            className="border uppercase text-white rounded-full w-[2.5vw] h-[2.5vw] flex items-center justify-center bg-[#8CC63F] cursor-pointer"
          >
            {user?.first_name && user?.first_name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionButton;
