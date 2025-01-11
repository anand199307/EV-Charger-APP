import React from 'react';
import logo from "../../assets/sidebar/logo.svg"

const WalletHeader = () => {
  return (
    <div className="flex justify-between my-12">
      <div>
        <h2 className="text-[32px] font-bold">Tax Invoice</h2>
        <div className="w-[300px] flex gap-[72px]">
          <p className="text-base text-[#737982]">Invoice No.</p>
          <p className="font-medium text-base text-[#363C45]">HE2023/24-0015</p>
        </div>
        <div className="flex gap-16">
          <p className="text-base text-[#737982]">Invoice Date</p>
          <p className="font-medium text-base text-[#363C45]">17/07/23</p>
        </div>
      </div>
      <div>
        <img src={logo} alt="logo" className="w-[13vw]" />
      </div>
    </div>
  );
}

export default WalletHeader