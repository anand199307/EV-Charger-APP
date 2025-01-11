import React from "react";
import CustomerView from "./CustomerView";
import CustomerTranscation from "./CustomerTranscation";
import CircleBlue from "../../../../assets/Customer/BlueCircle.svg";
import CircleGreen from "../../../../assets/Customer/greenCircle.svg";
import TimeIcon from "../../../../assets/Customer/TimeIcon.svg";
import GameIcon from "../../../../assets/Customer/gameicons.svg";
import WeightIcon from "../../../../assets/Customer/mdi_weight.svg";
import ParcelIcon from "../../../../assets/Customer/uil_parcel.svg";
import CusomerDetails from "./CusomerDetails";

const lastHist = [
  {
    id: 1,
    transnumber: "#127777489-BN-SA",
    // btn: "Transaction ID",
    // btn1: "Charger ID",
    img: CircleGreen,
    txt: "Windsor Castle",
    txt1: "bharathi nagar, salem",
    btn: [
      {
        id: 1,
        number: "123456789",
        text: "Transaction ID",
      },
      {
        id: 2,
        number: "123456789",
        text: "Charger ID",
      },
    ],
  },
  {
    id: 2,
    transnumber: "#127777489-BN-SA",
    img: CircleGreen,
    txt: "Windsor Castle",
    txt1: "bharathi nagar, salem",
    btn: [
      {
        id: 1,
        number: "123456789",
        text: "Transaction ID",
      },
    ],
  },
];

const walletHistory = [
  {
    id: 1,
    transnumber: "2000",
    txt3: "Rs",
    txt1: "UPI Ref no: 3222844854845",
    txt: "Received at 11AM, 28 JAN 2023 ",
    btn: [
      {
        id: 1,
        number: "123456789",
        text: "Reference id",
      },
    ],
  },
  {
    id: 2,
    transnumber: "1500",
    txt3: "Rs",
    txt: "Received at 11AM, 28 JAN 2023 ",
    txt1: "UPI Ref no: 3222844854845",
    btn: [
      {
        id: 1,
        number: "123456789",
        text: "Reference id",
      },
    ],
  },
];

const vehicletypeData = [
  { pics: ParcelIcon, count: "10", text: "Charges" },
  { pics: WeightIcon, count: "50", text: "Energy Consumed", text1: "kWh" },
  { pics: GameIcon, count: "501", text: "Distance Travelled", text1: "Km" },
  {
    pics: TimeIcon,
    count: "10",
    text: "Estimated Charging Time",
    text1: "Mins",
  },
  { pics: GameIcon, count: "51", text: "Distance Travelled", text1: "Km" },
  {
    pics: TimeIcon,
    count: "10",
    text: "Estimated Charging Time",
    text1: "Mins",
  },
];

const CustomerProfile = ({ data }) => {
  return (
    <div>
      <CusomerDetails data={data} />
      <div className=" w-full flex gap-10">
        <div className="w-full">
          <CustomerView data={vehicletypeData} />
        </div>
        <div className="w-full flex gap-5">
          <CustomerTranscation
            title="Last Charging History"
            color={"#8CC63F"}
            data={lastHist}
          />
          <CustomerTranscation
            title="Wallet History"
            color={"#3A57E8"}
            data={walletHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
