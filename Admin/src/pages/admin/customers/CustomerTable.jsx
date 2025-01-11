import React, { useEffect, useState } from "react";
import CustomerIndex from "../../../components/customer/CustomerIndex";
import { useSelector } from "react-redux";
import { CustomerList } from "../../../api/ChargerApi";

const columns = [
  { key: "selected", checkbox: true },
  { key: "name", label: "Name" },
  { key: "user_vehicle", label: "Vehicle" },
  { key: "email", label: "Email" },
  { key: "phone_number", label: "Phone" },
  { key: "wallet_amount", label: "Wallet" },
  { key: "delete", label: "" },
];

const CustomerTable = () => {
  const [tableData, setTableData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  // const data = useSelector((state) => state.tableCart.dataTable);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [typingTimeout, setTypingTimeout] = useState(null);
  // const [searchResults, setSearchResults] = useState(data);

  // const handleSearchInputChange = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);

  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }

  //   const timeoutId = setTimeout(() => {
  //     const filteredResults = data.filter((item) =>
  //       item.name.toLowerCase().includes(query.toLowerCase())
  //     );

  //     // console.log("Search Query:", query);
  //     // console.log("Filtered Results:", filteredResults);

  //     setSearchResults(filteredResults);
  //   }, 500);

  //   setTypingTimeout(timeoutId);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await CustomerList();
        setTableData(customerResponse?.data?.users);
        const totalCount = customerResponse?.data?.total;
        const totalPagesCount = Math.ceil(totalCount / limit);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("error in list", error);
      }
    };

    fetchData();
  }, [currentPage, limit]);

  return (
    <div>
      <CustomerIndex
        // data={data}
        columns={columns}
        tableData={tableData}
        setTableData={setTableData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        totalPages={totalPages}
        // searchQuery={searchQuery}
        // handleSearchInputChange={handleSearchInputChange}
      />
    </div>
  );
};

export default CustomerTable;
