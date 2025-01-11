import React from "react";
import customerIcon from "../../../assets/sidebar/User.svg";
import CustomerTable from "./CustomerTable";
import Header from "../../../components/common/Header";

const Customers = () => {
  return (
    <>
      <div>
        <Header title="Customers" icon={customerIcon} />
      </div>
      <div className="py-12 px-7">
        <CustomerTable />
      </div>
    </>
  );
};

export default Customers;
