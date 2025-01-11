// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import Cancel from "../../assets/host/cancel.svg";
// import Save from "../../assets/host/save.svg";
// import addIcon from "../../assets/add.svg";

// const Button = ({
//   backgroundColor,
//   content,
//   width,
//   searchicon,
//   font,
//   radius,
//   color,
//   border,
//   back,
//   cancel,
//   type,
//   save,
//   edit,
//   to,
//   padding,
//   onClick,
//   transId,
//   height,
// }) => {
//   const navigate = useNavigate();
//   const [showId, setshowId] = useState(false);

//   const handleClick = () => {
//     navigate(to);
//   };

//   const handleButtonClick = () => {
//     handleClick();
//     if (onClick && typeof onClick === "function") {
//       onClick();
//     }
//   };

//   console.log(content);

//   return (
//     <button
//       className={`text-white text-center py-2 px-3.5 self-center h-[50px] cursor-pointer`}
//       type={type}
//       style={{
//         background: `${backgroundColor}`,
//         width: `${width}`,
//         fontSize: `${font}`,
//         borderRadius: `${radius}`,
//         color: `${color}`,
//         border: `${border}`,
//         height: `${height}`,
//         padding: `${padding}`,
//       }}
//       onClick={() => {
//         setshowId(true);
//         handleButtonClick();
//       }}
//     >
//       <div className="flex gap-4 justify-center items-center rounded-lg">
//         {searchicon && <img src={addIcon} alt="add" className="w-6 h-6" />}
//         {back && (
//           <FontAwesomeIcon
//             icon={faAngleLeft}
//             className="w-5 h-5 text-[#D0D5DD]"
//           />
//         )}
//         {edit && <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />}
//         {cancel && <img src={Cancel} alt="cancel" />}
//         {save && <img src={Save} alt="save" />}
//         {showId ? transId : content}
//       </div>
//     </button>
//   );
// };

// export default Button;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cancel from "../../assets/host/cancel.svg";
import Save from "../../assets/host/save.svg";
import addIcon from "../../assets/add.svg";
import exportIcon from "../../assets/Transaction/exportAllIcon.svg";
import filterIcon from "../../assets/Transaction/filtersquare.svg";

const Button = ({
  backgroundColor,
  content,
  width,
  searchicon,
  font,
  radius,
  color,
  border,
  back,
  cancel,
  type,
  save,
  ExportIcon,
  FilterIcon,
  edit,
  to,
  padding,
  onClick,
  height,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  const handleButtonClick = () => {
    handleClick();
    if (onClick && typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <button
      className={`text-white text-center py-[0.417vw] px-[0.729vw] self-center cursor-pointer font-medium`}
      type={type}
      style={{
        background: `${backgroundColor}`,
        width: `${width}`,
        fontSize: `${font}`,
        borderRadius: `${radius}`,
        color: `${color}`,
        border: `${border}`,
        height: `${height}`,
        padding: `${padding}`,
      }}
      onClick={handleButtonClick}
    >
      <div className="flex gap-2 justify-center items-center rounded-lg font-semibold">
        {searchicon && <img src={addIcon} alt="add" className="w-[1.25vw]" />}
        {back && (
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="w-[1.042vw] h-[2vh] text-[#D0D5DD]"
          />
        )}
        {edit && (
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="w-[1.042vw] h-[2vh]"
          />
        )}
        {cancel && (
          <img src={Cancel} alt="cancel" className="w-[1.042vw] h-[2vh]" />
        )}
        {save && <img src={Save} alt="save" className="w-[1.042vw] h-[2vh]" />}
        {ExportIcon && <img src={exportIcon} alt="exportIcon" />}
        {FilterIcon && <img src={filterIcon} alt="filterIcon" />}
        {content}
      </div>
    </button>
  );
};

export default Button;
