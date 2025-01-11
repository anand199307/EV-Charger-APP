// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import Cancel from "../../assets/host/cancel.svg";
// import Save from "../../assets/host/save.svg";
// import addIcon from "../../assets/add.svg";

// const StepperButton = ({
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

//   height,
// }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(to);
//   };

//   const handleButtonClick = () => {
//     handleClick();
//     if (onClick && typeof onClick === "function") {
//       onClick();
//     }
//   };

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
//       onClick={handleButtonClick}
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
//         {content}
//       </div>
//     </button>
//   );
// };

// export default StepperButton;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cancel from "../../assets/host/cancel.svg";
import Save from "../../assets/host/save.svg";
import addIcon from "../../assets/add.svg";

const StepperButton = ({
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
  edit,
  to,
  padding,
  onClick,
  transId,
  height,
}) => {
  const navigate = useNavigate();
  const [showId, setshowId] = useState(false);

  const handleClick = () => {
    navigate(to);
  };

  const handleButtonClick = () => {
    handleClick();
    if (onClick && typeof onClick === "function") {
      onClick();
    }
  };

  // console.log(content);

  return (
    <button
      className={`text-white text-center py-2 px-3.5 self-center h-[50px] cursor-pointer`}
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
      onClick={() => {
        setshowId(true);
        handleButtonClick();
      }}
    >
      <div className="flex gap-4 justify-center items-center rounded-lg">
        {searchicon && <img src={addIcon} alt="add" className="w-6 h-6" />}
        {back && (
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="w-5 h-5 text-[#D0D5DD]"
          />
        )}
        {edit && <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />}
        {cancel && <img src={Cancel} alt="cancel" />}
        {save && <img src={Save} alt="save" />}
        {showId ? transId : content}
      </div>
    </button>
  );
};

export default StepperButton;
