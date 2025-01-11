import React, { useState } from "react";
import Table from "../common/Table";
import TableHeader from "../common/TableHeader";
import Filters from "../../assets/Table/Filters.svg";
import CustomerCard from "../../pages/admin/customers/components/CustomerCard";
import { useSelector } from "react-redux";

const CustomerIndex = (props) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectCostomer, setSelectCostomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // const isDeleteButtonVisible = selectedRows.length > 0;
  // const data = useSelector((state) => state.tableCart.dataTable);
  // console.log(data);

  return (
    <div className="flex gap-5 ">
      <div className="w-[70%] px-5 pb-5 border rounded-lg flex flex-col items-center">
        <div className="w-full flex justify-between py-5">
          <div className="flex gap-7 items-center">
            {/* <div className="border py-2.5 px-4 rounded-lg flex gap-2">
              <img src={Filters} alt="filters" />
              Filters
            </div> */}
            <div className="text-[0.833vw]">
              {selectedRows.length} row selected
            </div>
          </div>

          <TableHeader
            onChange={(e) => setSearchTerm(e.target.value)}
            // isDeleteButtonVisible={isDeleteButtonVisible}
            // searchQuery={props.searchQuery}
            // handleSearchInputChange={props.handleSearchInputChange}
          />
        </div>
        <Table
          // data={props.data}
          columns={props.columns}
          datas={props.datas}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          selectCostomer={selectCostomer}
          setSelectCostomer={setSelectCostomer}
          searchTerm={searchTerm}
          setTableData={props.setTableData}
          tableData={props.tableData}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          limit={props.limit}
          totalPages={props.totalPages}
          customers
          // searchQuery={props.searchQuery}
          // handleSearchInputChange={props.handleSearchInputChange}
        />
      </div>
      <div className="w-[30%] px-[1.25vw] border rounded-lg py-[2.083vw]">
        {selectCostomer === null ? (
          <p className="text-[0.833vw]">Please Click</p>
        ) : (
          <CustomerCard selectCostomer={selectCostomer} />
        )}
      </div>
    </div>
  );
};

export default CustomerIndex;
