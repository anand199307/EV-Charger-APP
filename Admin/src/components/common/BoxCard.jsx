import React from "react";

const BoxCard = ({ boxClassnName, children, style }) => {
  return (
    <div className={`border border-blue-500  ${boxClassnName}`} style={style}>{children}</div>
  );
};

export default BoxCard;
