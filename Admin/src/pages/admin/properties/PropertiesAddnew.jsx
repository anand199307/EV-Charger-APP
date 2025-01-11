import React, { useState } from "react";
import Button from "../../../components/common/Button";
import OptionButton from "../../../components/common/OptionButton";
import { Link, useLocation, useParams } from "react-router-dom";
import Icondelete from "../../../assets/Customer/trash.png";
import PropertiesOverview from "./propertiesOverview";
import PropertiesMaintenance from "./propertiesMaintenance";
import { useSelector } from "react-redux";
import Header from "../../../components/common/Header";
import PropertiesTransactions from "./PropertiesTransactions";
import PropertyAddnewForm from "./PropertyAddnewForm";

const PropertiesAddnew = () => {
  const data = useSelector((state) => state.host.propertySave);
  const [activeButton, setActiveButton] = useState("Overview");

  const handleSectionChange = (section) => {
    setActiveButton(section);
  };

  const status = data ? data.status : null;

  const button = [
    {
      id: 1,
      btn: "Overview",
    },
    {
      id: 2,
      btn: "Maintenance",
    },
    {
      id: 2,
      btn: "Transactions",
    },
  ];

  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      {location.state.propertyItem ? (
        <PropertyAddnewForm selectCostomer={location?.state?.selectCostomer} />
      ) : (
        <>
          <div>
            <Header overview />
          </div>

          <div className="w-[95%] m-auto mt-8">
            <div className="flex justify-between">
              <div className="flex gap-5">
                {button.map((buttons) => (
                  <div key={buttons.id}>
                    <Button
                      backgroundColor={
                        activeButton === buttons.btn ? "white" : "#F9FAFB"
                      }
                      content={buttons.btn}
                      radius="6249.9375rem"
                      color="black"
                      border={
                        activeButton === buttons.btn
                          ? "1px solid #8CC63F"
                          : "1px solid transparent"
                      }
                      font="0.677vw"
                      // height="3.2vh"
                      padding="0.38rem 0.75rem"
                      onClick={() => handleSectionChange(buttons.btn)}
                    />
                  </div>
                ))}
              </div>

              <OptionButton
                key={data?.id}
                isActive={status}
                option
                active
                options={[
                  <div className="flex flex-col gap-3 justify-start m-auto">
                    <Link className="flex gap-2 items-center">
                      <img
                        src={Icondelete}
                        alt="DeleteIcon"
                        className="w-[1.25vw]"
                      />
                      <p className="text-[0.833vw] text-red-700">
                        Delete Property
                      </p>
                    </Link>
                  </div>,
                ]}
              />
            </div>

            {activeButton === "Overview" ? (
              <PropertiesOverview
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                selectCostomer={location?.state?.selectCostomer}
              />
            ) : activeButton === "Maintenance" ? (
              <PropertiesMaintenance setActiveButton={setActiveButton} />
            ) : activeButton === "Transactions" ? (
              <PropertiesTransactions setActiveButton={setActiveButton} />
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default PropertiesAddnew;
