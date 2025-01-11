import React from "react";
import TableHeader from "../../../components/common/TableHeader";
import PromoTable from "./PromoTable";
import PromoAddnew from "./PromoAddnew";

const PromoCodeTable = ({ ispromoActive, setPromoActive }) => {
  return (
    <>
      {!ispromoActive ? (
        <div className=" mx-10 px-5 pb-5 border rounded-lg my-[6vw]">
          <div className="w-full flex justify-end py-[1.25vw]">
            <TableHeader activePromo={() => setPromoActive(true)} />
          </div>

          <PromoTable />
        </div>
      ) : 
        <div>
          <PromoAddnew />
        </div>}
    </>
  );
};

export default PromoCodeTable;
