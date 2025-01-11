import React, { useState } from "react";
import Header from "../../../components/common/Header";
import HeroSection from "../../../components/common/HeroSection";
import PromoCodeTable from "./PromoCodeTable";
import X from "../../../assets/x.svg";

const PromoCode = () => {
  const [ispromoActive, setPromoActive] = useState(false);
  return (
    <>
      {!ispromoActive ? (
        <div>
          <Header
            title="Promo Codes"
            para="Manage the Promo codes of your HELIOS App"
          />
          <HeroSection />
        </div>
      ) : (
        <div className="py-4 px-5 border-b-2">
          <img
            src={X}
            onClick={() => setPromoActive(false)}
            className="cursor-pointer border rounded-lg p-1"
          />
        </div>
      )}

      <div>
        <PromoCodeTable
          ispromoActive={ispromoActive}
          setPromoActive={setPromoActive}
        />
      </div>
    </>
  );
};

export default PromoCode;
