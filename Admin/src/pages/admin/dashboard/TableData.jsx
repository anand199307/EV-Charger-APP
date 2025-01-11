import React from "react";

const TableData = ({ DashboardData }) => {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 h-[9vh] gap-2">
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Transaction ID
            </th>
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Total Consumptions
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Charger
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Status
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Amount
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {DashboardData.map((item) => (
            <tr key={item.id}>
              <td className="p-[1.5vw] text-center whitespace-no-wrap border-b border-gray-200">
                <div className="text-[#232D42] text-[0.833vw] text-center">
                  <h1>{item.transactionId} </h1>
                  <h2> {item.transactionNumber}</h2>
                </div>
              </td>
              <td className=" text-center text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                {item.totalConsumptions} kwh
              </td>
              <td className="pr-1 py-4 text-center text-[0.833vw] whitespace-no-wrap border-b border-gray-200">
                {item.charger}E
              </td>
              <td className="text-[0.833vw] whitespace-no-wrap border-b border-gray-200">
                <h1 className="text-[0.833vw] text-[#232D42]">
                  Charging({item.status}%)
                </h1>

                <div className="w-[5.99vw] h-2 bg-gray-200 rounded-full">
                  <div
                    className="w-[5.99vw] h-2 bg-[#8CC63F] rounded-full"
                    style={{ width: `${item.status}%` }}
                  ></div>
                </div>
              </td>
              <td className=" text-[0.833vw] text-center whitespace-no-wrap border-b border-gray-200">
                {item.amount}
              </td>
              <td className=" text-[0.833vw] whitespace-no-wrap border-b border-gray-200"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
