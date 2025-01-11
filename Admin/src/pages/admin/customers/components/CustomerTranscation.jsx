import React from "react";
import { Link } from "react-router-dom";
import StepperButton from "../../../../components/common/StepperButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const CustomerTranscation = ({ title, color, data }) => {
  return (
    <div>
      <div className="flex items-center justify-between px-3">
        <div className="text-[18px] font-bold">{title}</div>
        <Link className={`text-[12px] underline`} style={{ color: color }}>
          View All
        </Link>
      </div>
      <div>
        {data?.map((data) => {
          return (
            <div className="h-[208px] w-[25vw] rounded-[32px] border border-[#C9C8C8] my-6 relative overflow-hidden">
              <div className="flex absolute">
                <div
                  className={`h-[14px] w-[12.5vw] border-b border-[#C9C8C8] bg-[${color}]`}
                ></div>
                <div
                  className={`h-[14px] w-[12.5vw] border-b border-[#C9C8C8] opacity-25 bg-[${color}]`}
                ></div>
                <div className="h-[14px] w-[12.5vw] bg-[#3A57E8] border-b border-[#C9C8C8]"></div>
                <div
                  className="h-[14px] w-[12.5vw] border-b border-[#C9C8C8]"
                  style={{
                    background:
                      "linear-gradient(72deg, #FFF 20.17%, rgba(255, 255, 255, 0.46) 96.42%) ",
                  }}
                ></div>
              </div>

              <div className="flex flex-col gap-3 m-8">
                <h1 className="text-[26px] font-bold">
                  {data.transnumber}
                  <span className="text-[10px]">{data.txt3}</span>
                </h1>
                <div className="flex items-center">
                  {data?.btn?.map((btn) => {
                    return (
                      <div>
                        <StepperButton
                          backgroundColor="#F5F7FF"
                          content={btn.text}
                          transId={btn.number}
                          width="125px"
                          type="button"
                          radius="24px"
                          height="33px"
                          color="#000"
                          font="14px"
                        />
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div className="flex gap-3">
                    <div
                      className={`w-[28px] h-[28px] rounded-[50%] border-[5px] border-[${color}] opacity-25 flex items-center justify-center`}
                    >
                      <FontAwesomeIcon
                        className="w-[10px] h-[10px]"
                        icon={faCircle}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4>{data.txt}</h4>
                      <h5>{data.txt1}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerTranscation;
