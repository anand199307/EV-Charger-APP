import React from "react";
import phonepic from "../../../../assets/Customer/Iconphone.svg";
import locationpic from "../../../../assets/Customer/Iconlocation.svg";
import calendericon from "../../../../assets/Customer/Iconcalender.svg";
import carcustomer from "../../../../assets/Customer/customercar.svg";
import MailIcon from "../../../../assets/Customer/sms.svg";
import OptionButton from "../../../../components/common/OptionButton";
import Icondelete from "../../../../assets/Customer/trash.png";
import { Link,  } from "react-router-dom";
import BoxCard from "../../../../components/common/BoxCard";
function CusomerDetails({ data }) {
  const styleOverride = {
    border: "none"
  }

  return (
    <div>
      <div className="flex">
        <div>
          <BoxCard
            boxClassnName="h-[262px] w-[95%] rounded-[44.049px] bg-[#3A57E8] flex gap-3  mx-8
       "
          >
            <div
              className="w-[189.411px] h-[257.687px] rounded-[44.049px]  -ml-7"
              style={{
                background: "rgba(255, 255, 255, 0.24)",
                transform: "rotate(-10.455deg)",
                backdropFilter: "blur(11.012269020080566px)",
              }}
            >
              <div
                className="w-[189.411px] h-[180.687px] rounded-[44.049px] m-auto flex flex-col justify-center items-center  gap-3"
                style={{
                  background: "var(--Primary, #8CC63F)",
                }}
              >
                <div className="flex gap-3">
                  <img src={data?.img} alt="photoprofile" />
                  <p className="text-white text-[17.62px] mt-1">Owner</p>
                </div>
                <h1 className="text-white text-[14.316px] text-center">
                  ID : {data?.id}
                </h1>
                <h2 className="text-white text-[17.62px] text-center underline">
                  {data?.name}
                </h2>
              </div>
              <div
                className="w-[154px] h-[44.049px] rounded-[44.049px] m-3 flex gap-4 justify-center"
                style={{ background: "rgba(255, 255, 255, 0.24)" }}
              >
                <p className="text-white text-center mt-1">
                  <OptionButton
                    key={data?.id}
                    isActive={data?.status}
                    active
                    style={styleOverride}
                  />
                </p>
              </div>
            </div>
            <div
              className="w-[233px] h-[234px] rounded-[44.049px] flex flex-col gap-3 m-auto justify-center px-5"
              style={{
                background: "rgba(255, 255, 255, 0.24)",
              }}
            >
              <h1 className="text-white text-base font-bold">Basic Details</h1>
              <div className="flex gap-5">
                <img src={locationpic} alt="locationpic" />
                <p className="text-white text-[16px]">{data?.address}</p>
              </div>
              <div className="flex gap-5">
                <img src={MailIcon} alt="locationpic" />
                <h1 className="text-white text-[16px]">{data?.mail}</h1>
              </div>
              <div className="flex gap-5">
                <img src={phonepic} alt="locationpic" />
                <p className="text-white text-[16px]">{data?.phone}</p>
              </div>
            </div>
            <div
              className="w-[233px] h-[234px] rounded-[44.049px] flex flex-col items-start m-auto p-5"
              style={{
                background: "rgba(255, 255, 255, 0.24)",
              }}
            >
              <h1 className="text-white text-base font-bold">
                Last Charge Time
              </h1>
              <div className="flex gap-5">
                <img src={calendericon} alt="locationpic" />
                <p className="text-white text-[16px]">
                  {data?.date} {data?.time}
                </p>
              </div>
            </div>
          </BoxCard>
        </div>
        <div>
          <div>
            <img
              className="w-[100%] h-[288px] ml-7"
              src={carcustomer}
              alt="carcustomer"
            />
          </div>
        </div>

        {/* <div>
          <OptionButton
            options={[
              <div className="flex flex-col gap-3 justify-start m-auto">
                <Link className="flex gap-2">
                  <img src={Icondelete} alt="EyeIcon" />
                  <p className="text-base text-red-500">Delete Customer</p>
                </Link>
              </div>
            ]}
          />
        </div> */}
      </div>
    </div>
  );
}

export default CusomerDetails;
