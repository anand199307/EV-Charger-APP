import React from "react";
import photoprofile from "../../../../assets/Customer/Profilephoto.svg";
import locationpic from "../../../../assets/Customer/Iconlocation.svg";
import calendericon from "../../../../assets/Customer/Iconcalender.svg";
import carcustomer from "../../../../assets/Customer/customercar.svg";
import OptionButton from "../../../../components/common/OptionButton";
import EyeIcon from "../../../../assets/Customer/eye.svg";
import { Link } from "react-router-dom";

const CustomerCard = ({ selectCostomer }) => {
  const styleOverride = {
    border: "none",
  };
  return (
    <div>
      {selectCostomer && (
        <div className="w-full h-auto flex flex-col gap-20 pl-9">
          <div className="flex justify-between">
            <h1 className="text-[#000] text-[1.042vw] font-semibold">
              Customers Details
            </h1>
            {/* <OptionButton
              key={selectCostomer?.id}
              isActive={selectCostomer?.status}
              option
              options={[
                <div className="flex flex-col gap-3 justify-start m-auto">
                  <Link
                    to={`/customers/${selectCostomer.id}`}
                    className="flex gap-2"
                  >
                    <img src={EyeIcon} alt="EyeIcon" className="w-[1.25vw]" />
                    <p className="text-[0.833vw]">View</p>
                  </Link>
                </div>,
              ]}
            /> */}
          </div>
          <div className="h-[262px] w-[23vw] rounded-[44.049px] bg-[#3A57E8] border border-[#3A57E8]  flex gap-4">
            <div
              className="w-[9vw] h-[257.687px] rounded-[44.049px]  -ml-7"
              style={{
                background: "rgba(255, 255, 255, 0.24)",
                transform: "rotate(-10.455deg)",
                backdropFilter: "blur(11.012269020080566px)",
              }}
            >
              <div
                className=" h-[180.687px] rounded-[44.049px] m-auto flex flex-col justify-center items-center  gap-3"
                style={{
                  background: "var(--Primary, #8CC63F)",
                }}
              >
                <div className="flex gap-3">
                  <img src={photoprofile} alt="photoprofile" />
                  <p className="text-white text-[0.918vw] mt-1 font-bold">
                    Owner
                  </p>
                </div>
                <h1 className="text-white text-[0.746vw] text-center">
                  ID : {selectCostomer?.id}
                </h1>
                <h2 className="text-white text-[0.918vw] text-center underline">
                  {selectCostomer?.first_name} {selectCostomer?.last_name}
                </h2>
              </div>
              <div>
                <div
                  className=" h-[44.049px] rounded-[44.049px] m-3 flex gap-4 justify-center bg-white"
                  // style={{ background: "rgba(255, 255, 255, 0.24)" }}
                >
                  <Link
                    to={`/customers/${selectCostomer.id}`}
                    className="text-[0.918vw] text-center mt-1"
                  >
                    <OptionButton
                      key={selectCostomer?.id}
                      isActive={selectCostomer?.status}
                      active
                      style={styleOverride}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="w-[12.135vw] h-[234px] rounded-[44.049px] flex flex-col gap-3 m-auto justify-center px-5"
              style={{
                background: "rgba(255, 255, 255, 0.24)",
              }}
            >
              <h1 className="text-white text-[0.833vw] font-bold">Address</h1>
              <div className="flex gap-5">
                <img src={locationpic} alt="locationpic" />
                <p className="text-white text-[0.833vw]">
                  {selectCostomer?.location?.address_line1}
                </p>
              </div>
              <h1 className="text-white text-[0.833vw] font-bold">
                Last Charge Time
              </h1>
              <div className="flex gap-5">
                <img src={calendericon} alt="locationpic" />
                <p className="text-white text-[0.833vw]">
                  {selectCostomer?.location?.created_at}
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              className="w-[30.625vw] h-[215px]"
              src={carcustomer}
              alt="carcustomer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;
