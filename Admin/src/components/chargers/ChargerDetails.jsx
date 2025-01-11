import React, { useEffect, useState } from "react";
import InputBox from "../common/InputBox";
import Plus from "../../assets/plus.svg";
import Ghost from "../../assets/Ghost.svg";
import { useDispatch, useSelector } from "react-redux";
import { PropertyAllList } from "../../api/PropertyApi";
import { updateChargerSave } from "../../store/slices/HostSlice";

const ChargerDetails = ({
  isVisible,
  toggleVisibility,
  handlecharger,
  createChargerdata,
  error,
}) => {
  const [selectedVisibility, setSelectedVisibility] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const dispatch = useDispatch();
  const [propertyData, setPropertyData] = useState(null);
  const editChargerId = useSelector((state) => state.host.chargerSave);

  const handleVisibilityChange = (id) => {
    setSelectedVisibility(id);
    const visibilityValue = id === 1;

    setVisibility(visibilityValue);
    dispatch(
      updateChargerSave({
        key: "visibility",
        value: visibilityValue ? true : false,
      })
    );
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyResponse = await PropertyAllList();
        if (
          propertyResponse &&
          propertyResponse.data &&
          propertyResponse.data.data
        ) {
          setPropertyData(propertyResponse.data.data);
        }
      } catch (error) {
        console.error("Error in fetching property:", error);
      }
    };
    fetchProperty();

    if (editChargerId) {
      setSelectedVisibility(editChargerId.visibility ? 1 : 2);
      setVisibility(editChargerId.visibility);
    }
  }, [editChargerId]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    if (name === "property") {
      const selectedProperty = propertyData?.find(
        (property) => property.name === value
      );
      dispatch(
        updateChargerSave({
          key: "property_id",
          value: selectedProperty?.id,
        })
      );
    } else {
      // Here, use handlecharger to update the state
      handlecharger(name, value);
    }
  };

  const propertyOptions = propertyData?.map((property) => (
    <option key={property?.id} value={property?.name}>
      {property?.name}
    </option>
  ));

  const form = [
    {
      id: 1,
      name: "name",
      label: "Charger Name",
      placeholder: "Bhopal New Charger",
    },
    {
      id: 2,
      name: "property",
      label: "property",
    },
    {
      id: 3,
      name: "oem_company",
      label: "OEM Company",
    },
    {
      id: 4,
      name: "serial_number",
      label: "Charger Serial Number",
      placeholder: "1000",
    },
  ];

  const visibilityStatus = [
    {
      id: 1,
      title: "Public",
      para: "Visible to the public for charging ",
      name: "visibility",
    },
    {
      id: 2,
      title: "Private",
      para: "Not visible to the public",
      name: "visibility",
    },
  ];

  return (
    <div className="border-b-2 transition duration-300">
      <div className="w-full flex justify-between py-3">
        <h2 className="text-[1.042vw] font-semibold">
          Charger Details<span className="text-[#F43F5E]">*</span>
        </h2>
        <img
          src={isVisible ? Ghost : Plus}
          alt={isVisible ? "Ghost icon" : "Plus icon"}
          onClick={toggleVisibility}
          className="cursor-pointer hover:border hover:rounded-lg hover:bg-slate-100 w-6 h-6"
        />
      </div>

      {isVisible && (
        <div className="pb-6">
          <p className="text-[0.729vw] text-[#6B7280]">
            Add the charger details
          </p>

          <form className="grid grid-cols-2 gap-x-6 gap-y-7 pt-[1.458vw]">
            {form?.map((forms) => (
              <div key={forms?.id} className="flex flex-col gap-2">
                <label className="text-[0.729vw] text-[#6B7280]">
                  {forms?.label} <span className="text-[#F43F5E]">*</span>
                </label>
                {forms?.name === "property" ? (
                  <select
                    name={forms?.name}
                    onChange={handleSelectChange}
                    value={
                      editChargerId
                        ? propertyData?.find(
                            (prop) => prop.id === editChargerId?.property_id
                          )?.name
                        : createChargerdata?.[forms?.name]
                    }
                    className="w-full border outline-none text-[#9CA3AF] pl-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
                  >
                    <option value="" hidden>
                      {forms.name === "property" && <p>Choose Property</p>}
                      {forms.name === "oem_company" && <p>Choose OEM</p>}
                    </option>
                    <option value="" disabled selected hidden>
                      Select Property
                    </option>
                    {propertyOptions}
                  </select>
                ) : (
                  <div>
                    <InputBox
                      type="text"
                      name={forms?.name}
                      value={
                        editChargerId
                          ? editChargerId?.[forms?.name]
                          : createChargerdata?.[forms?.name]
                      }
                      onChange={(e) => {
                        handlecharger(forms.name, e.target.value);
                      }}
                      placeholder={forms.placeholder}
                    />
                    {/* Display validation error only for input fields */}
                    {forms.name !== "property" &&
                      error &&
                      error[forms.name] && (
                        <p className="text-red-500 text-sm">
                          {error[forms.name]}
                        </p>
                      )}
                  </div>
                )}
              </div>
            ))}
          </form>

          <div className="w-full pt-7">
            <label className="text-[0.729vw] text-[#6B7280]">Visibility</label>
            <div className="flex gap-5">
              {visibilityStatus?.map((data) => (
                <div
                  key={data?.id}
                  className={`w-full border min-h-[8.4vh] rounded-lg ${
                    selectedVisibility === data.id
                      ? "border-2 border-[#8CC63F]"
                      : "border-[#D1D5DB]"
                  }`}
                >
                  <div className="flex gap-2 px-[1.042vw] py-[0.833vw]">
                    <input
                      type="radio"
                      checked={selectedVisibility === data.id}
                      value={
                        editChargerId
                          ? editChargerId?.[data?.name]
                          : createChargerdata?.[data?.name]
                      }
                      onChange={() => handleVisibilityChange(data.id)}
                      className={`radio-input ${
                        selectedVisibility === data.id ? "checked" : ""
                      }`}
                    />
                    <div>
                      <p className="text-[0.729vw] font-semibold">
                        {data?.title}
                      </p>
                      <p className="text-[0.729vw] text-[#6B7280] pt-2">
                        {data?.para}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargerDetails;
