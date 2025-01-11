import React from "react";

const CustomerView = ({ data }) => {
  return (
    <div>
      <h1 className="text-[18px] text-[#000] font-bold my-3">TATA Nexon EV</h1>
      <div className="grid grid-cols-2 gap-5">
        {data.map((vehicletype) => (
          <div className="h-[164.5px] w-full rounded-[32px] border border-[#C9C8C8]">
            <div className="flex justify-between p-5 w-full">
              <div>
                <h1 className="text-[48px] text-[#000">
                  {vehicletype.count}
                  <span className="text-[16px] text-[#000]">
                    {vehicletype.text1}
                  </span>
                </h1>
                <p className="text-[14px] text-[#000]">{vehicletype.text}</p>
              </div>
              <div className="">
                <img className="w-8 h-10" src={vehicletype.pics} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerView;
