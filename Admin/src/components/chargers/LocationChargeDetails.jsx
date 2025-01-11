import React from "react";
import InputBox from "../common/InputBox";
import Plus from "../../assets/plus.svg";
import Ghost from "../../assets/Ghost.svg";
import { useSelector } from "react-redux";

const LocationChargeDetails = ({
  isVisible,
  toggleVisibility,
  handlecharger,
  createChargerdata,
  error,
}) => {
  const editChargerId = useSelector((state) => state.host.chargerSave);

  const form = [
    {
      id: 1,
      name: "latitude",
      label: "Latitude",
      placeholder: "Enter latitude Value",
    },
    {
      id: 2,
      name: "longitude",
      label: "Longitude",
      placeholder: "Enter longitude Value ",
    },
  ];

  return (
    <div className="border-b-2 transition duration-300">
      <div className="w-full flex justify-between py-3 items-center">
        <h2 className="text-[1.042vw] font-semibold">
          Location Details
          <span className="text-[#F43F5E]">*</span>
        </h2>
        <img
          src={isVisible ? Ghost : Plus}
          alt={isVisible ? "Ghost icon" : "Plus icon"}
          onClick={toggleVisibility}
          className="cursor-pointer hover:border hover:rounded-lg hover:bg-slate-100 w-6 h-6"
        />
      </div>

      {isVisible && (
        <div className="flex flex-col gap-3">
          <p className="text-[0.729vw] text-[#6B7280]">
            Add the location of the charger
          </p>

          <form>
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-7 pb-6">
              {form.map((forms) => (
                <div key={forms?.id} className="flex flex-col gap-2">
                  <label className="text-[0.729vw] text-[#6B7280]">
                    {forms.label} <span className="text-[#F43F5E]">*</span>
                  </label>
                  <InputBox
                    type="text"
                    name={forms.name}
                    value={
                      editChargerId
                        ? editChargerId?.[forms?.name]
                        : createChargerdata?.[forms?.name]
                    }
                    onChange={(e) => {
                      const floatValue = parseFloat(e.target.value);
                      // Check if floatValue is NaN
                      if (!isNaN(floatValue)) {
                        handlecharger(forms.name, floatValue);
                      }
                    }}
                    placeholder={forms?.placeholder}
                  />
                  {error && error[forms.name] && (
                    <p className="text-red-500 text-sm">{error[forms.name]}</p>
                  )}
                </div>
              ))}
            </div>
            <label className="text-[0.729vw] text-[#6B7280] flex my-2">
              Landmark <span className="text-[#F43F5E]">*</span>
            </label>

            <textarea
              name="land_mark"
              onChange={(e) => {
                handlecharger("land_mark", e.target.value);
              }}
              value={
                editChargerId
                  ? editChargerId.land_mark
                  : createChargerdata?.land_mark
              }
              placeholder="Enter landmark Here"
              className="h-[8.4vh] resize-none rounded-lg border w-[50%] border-[#E5E7EB] outline-none placeholder:text-[#9CA3AF] text-gray-700  p-4 text-[0.729vw]"
            />

            {error && error.land_mark && (
              <p className="text-red-500 text-sm">{error.land_mark}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default LocationChargeDetails;
