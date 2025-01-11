import React from "react";
import TableData from "./TableData";
import RightIcon from "../../../assets/Dashboard/Stroke.svg";

const DashboardTable = () => {
  return (
    <div className="border h-auto w-[95%] shadow-md rounded-[0.625vw]">
      <div className="container mx-auto py-4 flex flex-col gap-[15px]">
        <div className="flex flex-col gap-[10px] px-4">
          <h1 className="text-[#232D42] text-[0.99vw]">Last Transactions</h1>
          <div className="flex gap-[5px]">
            <img className="w-[0.958vw]" src={RightIcon} alt="RightIcon" />
            <h5>{DashboardData.length} New Acquired</h5>
          </div>
        </div>
        <TableData DashboardData={DashboardData} />
      </div>
    </div>
  );
};

export default DashboardTable;

const DashboardData = [
  {
    transactionId: "92974c72ec16dc7345",
    transactionNumber: "977f128c26a76f44ea4",
    totalConsumptions: 0,
    charger: "2107",
    status: 60,
    amount: "Processing",
  },
  {
    transactionId: "92974c72ec16dc7345",
    transactionNumber: "977f128c26a76f44ea4",
    totalConsumptions: 0,
    charger: "2107",
    status: 60,
    amount: "Processing",
  },
  {
    transactionId: "92974c72ec16dc7345",
    transactionNumber: "977f128c26a76f44ea4",
    totalConsumptions: 0,
    charger: "2107",
    status: 60,
    amount: "Processing",
  },
];
