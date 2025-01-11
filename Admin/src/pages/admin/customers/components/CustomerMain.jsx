import React, { useEffect, useState } from "react";
import CustomerProfile from "./CustomerProfile";
import customerIcon from "../../../../assets/sidebar/User.svg";
// import { data } from "../CustomerTable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../../../components/common/Header";

const CustomerMain = ({ selectCostomer }) => {
  const data = useSelector((state) => state.tableCart);
  const params = useParams();
  const customerId = params.id;
  const [customerData, setCustomerData] = useState([]);

  const filterCustomer = (id) => {
    // console.log(data.dataTable);
    const datas = data.dataTable?.map((customer) => {
      if (customer.id === id) setCustomerData(customer);
    });
    // console.log(datas);
  };
  useEffect(() => {
    filterCustomer(+customerId);
  }, [customerId]);
  // data
  return (
    <div className="customerScrolling">
      <div className="">
        <Header
          title={`Customers / ${customerData.name}`}
          icon={customerIcon}
        />
      </div>
      <div className="py-12 w-[98%] px-7 h-[85vh] customerScrolling">
        <CustomerProfile data={customerData} />
      </div>
    </div>
  );
};

export default CustomerMain;
