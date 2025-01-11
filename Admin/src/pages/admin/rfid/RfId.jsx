import React from "react";
import Header from "../../../components/common/Header";
import X from "../../../assets/x.svg";
import RfidTable from "./RfidTable";

const RfId = () => {
  return (
    <>
      <div>
        <Header title="RFIDs" />
      </div>
      <div>
        <RfidTable />
      </div>
    </>
  );
};

export default RfId;
