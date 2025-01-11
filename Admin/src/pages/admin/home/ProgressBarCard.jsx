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
      topic: "Total Host",
      percentagevalue: "60",
    },
    {
      pic: HomeIcon,
      colorpath: "#C03221",
      count: "6",
      topic: "Total Properties",
      percentagevalue: "60",
    },
    {
      pic: GroupIcon,
      colorpath: "#F16A1B",
      count: "11",
      topic: "Total Chargers",
      percentagevalue: "60",
    },
    {
      pic: UserIcon,
      colorpath: "#212529",
      count: "60",
      topic: "Total Customer",
      percentagevalue: "60",
    },
    {
      pic: PlugIcon,
      colorpath: "#3A57E8",
      count: "-645.4",
      topic: "Energy Delivered(kWh)",
      percentagevalue: "60",
    },
    {
      pic: WalletIcon,
      colorpath: "#232D42",
      count: "6",
      topic: "Total Revenue(K)",
      percentagevalue: "60",
    },
    {
      pic: RecycleBatterIcon,
      colorpath: "#8CC63F",
      count: "26",
      topic: "Total Transaction",
      percentagevalue: "60",
    },
    {
      pic: EmissionIcon,
      colorpath: "#F9D414",
      count: "-300",
      topic: "Total CO2 Emission Saved(kg)",
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
