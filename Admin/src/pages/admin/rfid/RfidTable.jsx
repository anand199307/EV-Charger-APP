import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableHeader from "../../../components/common/TableHeader";
import RfidIndex from "../../../components/rfid/RfidIndex";

const RfidTable = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  // const [ischargerActive, setChargerActive] = useState(false);


  return (
    <>
      {!props.ischargerActive && (
        <div className=" mx-10 px-5 pb-5 border rounded-lg mt-7 ">
          <div className="flex justify-end py-6">
            <TableHeader
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <RfidIndex
              searchTerm={searchTerm}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RfidTable;
