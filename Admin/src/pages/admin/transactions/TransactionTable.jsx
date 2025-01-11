import React, { useState } from "react";
import TransactionIndex from "../../../components/transaction/TransactionIndex";
import TableHeader from "../../../components/common/TableHeader";
import { useSelector } from "react-redux";

const TransactionTable = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handleDateRangeSelect = (selectedRange) => {
    setSelectedDateRange(selectedRange);
  };

  return (
    <>
      {!props.ischargerActive && (
        <div className=" mx-10 px-5 pb-5 border rounded-lg mt-7 ">
          <div className="flex justify-end py-6">
            <TableHeader
              placeholder="Search Recharge by User or Number"
              style={{ width: "22vw" }}
              date
              onChange={(e) => setSearchTerm(e.target.value)}
              handleDateRangeSelect={handleDateRangeSelect}
              // searchQuery={props.searchQuery}
              // handleSearchInputChange={props.handleSearchInputChange}
            />
          </div>

          <div>
            <TransactionIndex
              limit={limit}
              tableData={tableData}
              setTableData={setTableData}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionTable;
