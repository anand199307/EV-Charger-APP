// // Checkbox.js
// import React, { useState } from "react";

// const Checkbox = ({ index, initialItemState }) => {
//   const [itemState, setItemState] = useState(initialItemState);

//   const handleClick = () => {
//     setItemState(!itemState);
//   };

//   return (
//     <div
//       className={`w-8 h-[1.125rem] rounded-full relative cursor-pointer ${
//         itemState ? "bg-[#8CC63F]" : "bg-[#8A92A6]"
//       }`}
//       onClick={handleClick}
//     >
//       <div
//         className={`absolute w-2 h-2 border rounded-full bg-white ${
//           itemState ? "left-[1.25rem] top-1" : "left-1 top-1"
//         }`}
//       ></div>
//     </div>
//   );
// };

// export default Checkbox;

// Checkbox.js
import React, { useState } from "react";

const Checkbox = ({ index, initialItemState, onCheckboxChange }) => {
  const [itemState, setItemState] = useState(initialItemState);

  const handleClick = () => {
    setItemState(!itemState);
    onCheckboxChange(index, !itemState);
  };

  return (
    <div
      className={`w-[1.667vw] h-[1.8vh] rounded-full relative cursor-pointer ${
        itemState ? "bg-[#8CC63F]" : "bg-[#8A92A6]"
      }`}
      onClick={handleClick}
    >
      <div
        className={`absolute w-[0.417vw] h-[0.8vh] border rounded-full bg-white ${
          itemState ? "left-[1.042vw] top-1" : "left-1 top-1"
        }`}
      ></div>
    </div>
  );
};

export default Checkbox;
