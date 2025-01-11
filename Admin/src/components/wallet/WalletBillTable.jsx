import React from 'react'

const WalletBillTable = () => {
  return (
    <div
      style={{
        border: "1px solid #E2E5E9",
        borderRadius: "12px 12px 0px 0px",
      }}
      className="bg-[#8CC63F] my-10"
    >
      <table className="w-full">
        <thead className="">
          <tr className="border-b text-[#FFF]">
            <th className="py-3 text-start px-5">HSN/SAC</th>
            <th>Rate</th>
            <th>Taxable Value</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          <tr>
            <td className="py-3 px-5 text-lg font-bold">
              Services Rendered EV Charging
            </td>
            <td className="text-center font-bold">$20.00</td>
            <td className="text-center font-bold">$20.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WalletBillTable