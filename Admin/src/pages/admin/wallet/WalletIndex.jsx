import React, { useState } from "react";
import TableHeader from "../../../components/common/TableHeader";
import WalletTable from "../../../components/wallet/WalletTable";

const WalletIndex = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateRangeSelect = (selectedRange) => {
    // console.log(selectedDateRange);
    setSelectedDateRange(selectedRange);
  };

  //  const handleSearchChange = (value) => {
  //    setSearchTerm(value);
  //  };

  return (
    <>
      {!props.ischargerActive && (
        <div className=" mx-10 px-5 pb-5 border rounded-lg mt-7 ">
          <div className="w-full flex justify-end py-6">
            <TableHeader
              placeholder="Search Recharge by User or Number"
              style={{ width: "22vw" }}
              date
              onChange={(e) => setSearchTerm(e.target.value)}
              handleDateRangeSelect={handleDateRangeSelect}
            />
          </div>

          <div>
            <WalletTable
              searchTerm={searchTerm}
              selectedDateRange={selectedDateRange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WalletIndex;
