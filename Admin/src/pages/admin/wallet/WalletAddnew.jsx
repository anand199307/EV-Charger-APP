import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WalletHeader from "../../../components/wallet/WalletHeader";
import WalletAddress from "../../../components/wallet/WalletAddress";
import WalletBillTable from "../../../components/wallet/WalletBillTable";
import InvoiceBill from "../../../components/wallet/InvoiceBill";


const WalletAddnew = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.tableCart.dataTable);
  const selectedItem = data.find((item) => item.id === parseInt(id));
  return (
    <div
      className="w-full"
      style={{
        background: `url(${require("../../../assets/wallet/bg.svg")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <article className="w-[65%] m-auto">
        <WalletHeader />
        <WalletAddress selectedItem={selectedItem} />
        <WalletBillTable />
        <InvoiceBill />
      </article>
    </div>
  );
};

export default WalletAddnew;
