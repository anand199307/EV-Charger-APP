import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import OptionButton from "../OptionButton";
import { Link } from "react-router-dom";
import Icondelete from "../../../assets/Customer/trash.png";
import EyeIcon from "../../../assets/Customer/eye.svg";
import ArrowRight from "../../../assets/Properties/arrow-right.svg";

const StationConnectors = ({ connectorsData, setActiveButton, arrow }) => {
  const numberOfConnectors = connectorsData.text.length;

  const handleViewClick = () => {
    setActiveButton("Maintenance");
  };

  return (
    <div>
      <h2 className="text-[1.25vw] font-semibold pb-6">
        {connectorsData.title} <span>({numberOfConnectors})</span>
      </h2>

      <div className="flex flex-col gap-[2.083vw]">
        {connectorsData?.text.map((texts) => {
          let imgBackgroundColor = "";

          switch (texts.subtitle) {
            case "Charging":
              imgBackgroundColor = "#3A57E8";
              break;
            case "Error":
              imgBackgroundColor = "#FC5A5A";
              break;
            case "Available":
              imgBackgroundColor = "#8CC63F";
              break;
            default:
              imgBackgroundColor = "orange";
          }


          return (
            <div key={texts.id} className="flex items-center justify-between">
              <div className="flex gap-3">
                <img
                  src={texts.img}
                  alt="charging"
                  className="border rounded-full p-2 w-[2.917vw] h-[6.6vh]"
                  style={{
                    backgroundColor: imgBackgroundColor,
                  }}
                />
                <div>
                  <h3 className="text-[0.729vw] text-[#6B7280]">
                    {texts.title}
                  </h3>
                  <h2 className="text-[1.042vw] font-semibold">
                    {texts.subtitle}
                    <span className="text-[0.729vw] text-[#6B7280] font-normal pl-4">
                      {texts.textarea}
                    </span>
                  </h2>
                </div>
              </div>

              {arrow ? (
                <img src={ArrowRight} alt="right-arrow" />
              ) : (
                <OptionButton
                  option
                  options={[
                    <div className="flex flex-col gap-3 justify-start m-auto">
                      <Link
                        className="flex gap-2"
                        onClick={() => {
                          handleViewClick(texts.id);
                        }}
                      >
                        <img
                          src={EyeIcon}
                          alt="EyeIcon"
                          className="w-[1.25vw]"
                        />
                        <p className="text-[0.833vw]">View</p>
                      </Link>
                      <Link className="flex gap-2 items-center">
                        <FontAwesomeIcon
                          icon={faPenSquare}
                          className="w-[1.25vw] h-[2vh]"
                        />
                        <p className="text-[0.833vw]">Edit info</p>
                      </Link>

                      <Link className="flex gap-2 items-center">
                        <img
                          src={Icondelete}
                          alt="DeleteIcon"
                          className="w-[1.25vw]"
                        />
                        <p className="text-[0.833vw] text-red-700">
                          Delete Customer
                        </p>
                      </Link>
                    </div>,
                  ]}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StationConnectors;
