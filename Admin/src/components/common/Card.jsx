import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import locationIcon from "../../assets/Dashboard/Location.svg";

const Card = ({
  pathColor,
  title,
  percentageValue,
  icon,
  count,
  className,
}) => {
  return (
    <div
      className="m-auto w-[18.583vw] p-[1.25vw] h-[13.8889vh] rounded-lg flex gap-4 justify-center bg-white"
      style={{
        boxShadow: "0px 10px 30px 0px rgba(17, 38, 146, 0.05)",
      }}
    >
      <div className="min-w-[3.646vw] h-[6.4815vh] relative">
        <CircularProgressbar
          value={percentageValue}
          strokeWidth={5}
          trailWidth={5}
          styles={buildStyles({
            pathColor: pathColor,
            trailColor: "#E9ECEF",
          })}
        />
        <div className="w-[3.646vw] h-[6.4815vh] absolute top-0 left-0 flex justify-center items-center">
          <img src={icon} alt="Icon" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[#8A92A6] text-[0.833vw] w-[95%]">{title}</h2>
        <p className="text-[#232D42] text-[0.99vw]">{count}</p>
      </div>
    </div>
  );
};

export default Card;
