import React from "react";
import Header from "../../../components/common/Header";
import WalletIndex from "./WalletIndex";
// import { useSelector } from "react-redux";

const Wallet = () => {
  // const data = useSelector((state) => state.tableCart.dataTable);

  return (
    <>
      <div>
        <Header
          title="Wallet Recharges"
          para="Manage the Recharges of your users"
        />
      </div>
      <div>
        <WalletIndex />
      </div>
    </>
  );
};

export default Wallet;
