import React, { useState } from "react";
import { Link } from "react-router-dom";
import OptionButton from "../../../components/common/OptionButton";
import PaginationButtons from "../../../components/common/PaginationButtons";
import Icondelete from "../../../assets/Customer/trash.png";
import EyeIcon from "../../../assets/Customer/eye.svg";
import Edit from "../../../assets/Table/edit.svg";

const PropertiesTransactions = () => {
  const DashboardData = [
    {
      id: 1,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: "completed",
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 2,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: "cancelled",
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 3,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: "initiated",
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 4,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: "suspended",
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 5,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: "interrupted",
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 6,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: 60,
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 7,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: 60,
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 8,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: 60,
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 9,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: 60,
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
    {
      id: 10,
      transactionId: "92974c72ec16dc7345",
      transactionNumber: "977f128c26a76f44ea4",
      time: "12.05 PM,Nov 11",
      totalConsumptions: "0.025 Units (1.5kWh)",
      evsc: "EVSC 1 (Type-2)",
      charger: "Dora 22 KW AC ",
      status: 60,
      amount: "Processed (Rs.100)",
      Duration: "0 Mins",
      actions: "",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const totalPages = Math.ceil(DashboardData.length / rowsPerPage);

  const currentData = DashboardData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePreviousPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2 className="text-[1.042vw] font-semibold tracking-wider py-[1.875vw]">
        Transaction History
      </h2>

      <table className="w-full border rounded-lg">
        <thead className="border-b">
          <tr className="bg-gray-50 h-[8vh] gap-2">
            <th className=" w-1/6 text-justify text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide px-3">
              Transaction ID
            </th>
            <th className=" w-1/6 text-justify text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide ">
              Time
            </th>
            <th className="w-1/6 text-justify text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Charger
            </th>
            <th className="w-1/8 text-center text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Total Consumptions
            </th>
            <th className="w-1/6 text-center text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Duration
            </th>
            <th className="w-1/6 text-center text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Status
            </th>
            <th className="px-5 text-center text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Refund Amount
            </th>
            <th className="w-1/6 text-center text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="w-full ">
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-[1.042vw] whitespace-no-wrap border-b border-gray-200">
                <div className="text-[#232D42] text-[0.833vw]">
                  <h1>{item.transactionId} </h1>
                  <h2> {item.transactionNumber}</h2>
                </div>
              </td>
              <td className="pr-1 py-[0.833vw] text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                {item.time}
              </td>
              <td className="pr-1 py-[0.833vw] whitespace-no-wrap border-b border-gray-200 text-[0.833vw]">
                <div>
                  <p>{item.evsc}</p>
                  <p>{item.charger}</p>
                </div>
              </td>
              <td className="pr-1 py-[0.833vw] text-center text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                {item.totalConsumptions}
              </td>
              <td className="pr-1 py-[0.833vw] text-center text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                {item.Duration}
              </td>
              <td
                className={
                  "text-white uppercase text-[0.833vw] text-center whitespace-no-wrap border-b border-gray-200"
                }
              >
                <div
                  className={`py-[0.625vw] font-medium rounded-lg ${
                    item.status === "completed"
                      ? "bg-red-500"
                      : item.status === "initiated"
                      ? "bg-blue-500"
                      : item.status === "interrupted"
                      ? "bg-green-500"
                      : item.status === "suspended"
                      ? "bg-gray-800"
                      : item.status === "cancelled"
                      ? "bg-orange-500"
                      : ""
                  }`}
                >
                  {item.status}
                </div>
              </td>

              <td className="px-[1.25vw] py-[0.833vw] whitespace-no-wrap border-b border-gray-200 text-center text-[0.833vw]">
                {item.amount}
              </td>
              <td className=" py-[1.458vw] flex justify-center whitespace-no-wrap border-b border-gray-200">
                <OptionButton
                  option
                  table
                  opt
                  options={[
                    <div className="flex flex-col gap-3 justify-start m-auto">
                      <Link className="flex gap-2">
                        <img
                          src={EyeIcon}
                          alt="EyeIcon"
                          className="w-[1.25vw]"
                        />
                        <p className="text-[0.833vw]">View</p>
                      </Link>
                      <Link className="flex gap-2">
                        <img
                          src={Edit}
                          alt="edit"
                          className="w-[1.25vw] h-[2vh]"
                        />
                        <p className="text-[0.833vw]">Edit info</p>
                      </Link>

                      <Link className="flex gap-2 items-center">
                        <img
                          src={Icondelete}
                          alt="DeleteIcon"
                          className="w-[1.25vw]"
                        />
                        <p className="text-[0.833vw] text-red-700">
                          Delete Properties
                        </p>
                      </Link>
                    </div>,
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full px-[2.292vw] border py-[1.042vw]">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousClick={handlePreviousPage}
          onNextClick={handleNextPage}
        />
      </div>
    </div>
  );
};

export default PropertiesTransactions;
