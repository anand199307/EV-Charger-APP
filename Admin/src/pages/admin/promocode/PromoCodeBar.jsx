import React from "react";
import locationIcon from "../../../assets/Dashboard/Location.svg";
import UserIcon from "../../../assets/Dashboard/3 User.svg";
import HomeIcon from "../../../assets/Dashboard/home.svg";
import GroupIcon from "../../../assets/Dashboard/Group.svg";
import PlugIcon from "../../../assets/Dashboard/plug.svg";
import WalletIcon from "../../../assets/Dashboard/Wallet.svg";
import RecycleBatterIcon from "../../../assets/Dashboard/recycling-battery.svg";
import EmissionIcon from "../../../assets/Dashboard/Emission.svg";
import Card from "../../../components/common/Card";

const ProgressBarCard = () => {
  const cardData = [
    {
      pic: locationIcon,
      colorpath: "#1AA053",
      count: "3",
      topic: "Active Promo Codes",
      percentagevalue: "60",
    },
    {
      pic: HomeIcon,
      colorpath: "#C03221",
      count: "600",
      topic: "Amount Redeem",
      percentagevalue: "60",
    },
    {
      pic: GroupIcon,
      colorpath: "#F16A1B",
      count: "22",
      topic: "Promo Code Users",
      percentagevalue: "60",
    },
    {
      pic: UserIcon,
      colorpath: "#212529",
      count: "3",
      topic: "Promo Codes",
      percentagevalue: "60",
    },
  ];

  return (
    <div className="h-[20vh] cardScrolling flex gap-5 px-3 relative top-[2.083vw]">
      {cardData.map((items) => (
        <Card
          className=" min-w-[14.583vw]"
          pathColor={items.colorpath}
          title={items.topic}
          percentageValue={items.percentagevalue}
          icon={items.pic}
          count={items.count}
        />
      ))}
    </div>
  );
};

export default ProgressBarCard;
