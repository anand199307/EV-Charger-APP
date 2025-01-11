import React, { useEffect, useState } from "react";
import InputBox from "../common/InputBox";
import Plus from "../../assets/plus.svg";
import Ghost from "../../assets/Ghost.svg";
import { useDispatch } from "react-redux";
import { updatePropertySave } from "../../store/slices/HostSlice";
import { City, Country, Province } from "../../api/HostApi";

const LocationDetails = ({
  isVisible,
  toggleVisibility,
  editfform,
  onChange,
}) => {
  const dispatch = useDispatch();

  const [countryData, setCountryData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [provinceData, setProvinceData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const formDetail = form.find((forms) => forms.name === name);

    if (formDetail) {
      if (formDetail.class === "dropdown") {
        if (name === "country") {
          const selectedCountry = countryData?.response?.data?.find(
            (country) => country.name === value
          );
          setSelectedCountry(selectedCountry);
          setSelectedProvince(null);
          dispatch(
            updatePropertySave({
              key: "country_id",
              value: selectedCountry?.id,
              nestedKey: "location_details",
            })
          );
        } else if (name === "state") {
          const selectedProvince = provinceData?.data?.find(
            (province) => province.name === value
          );
          setSelectedProvince(selectedProvince);
          setSelectedCity(null);
          dispatch(
            updatePropertySave({
              key: "province_id",
              value: selectedProvince?.id,
              nestedKey: "location_details",
            })
          );
        } else if (name === "city") {
          const selectedCity = cityData?.data?.data.find(
            (city) => city.name === value
          );
          setSelectedCity(selectedCity);
          dispatch(
            updatePropertySave({
              key: "city_id",
              value: selectedCity?.id,
              nestedKey: "location_details",
            })
          );
        }
      } else {
        onChange(name, value);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryResponse = await Country();
        setCountryData(countryResponse);
        // console.log("selectedCountry", selectedCountry);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }

      try {
        if (selectedCountry) {
          const provinceResponse = await Province(selectedCountry?.id);
          setProvinceData(provinceResponse);
          // console.log("selectedProvince", selectedProvince);
        }
      } catch (error) {
        console.error("Error fetching province data:", error);
      }

      try {
        if (selectedProvince) {
          const cityResponse = await City(selectedProvince?.id);
          // console.log("City Response:", cityResponse);
          setCityData(cityResponse);
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchData();
  }, [selectedCountry, selectedProvince]);

  const form = [
    {
      id: 1,
      name: "country",
      label: "Country",
      class: "dropdown",
    },
    {
      id: 2,
      name: "state",
      label: "State",
      class: "dropdown",
    },
    {
      id: 3,
      name: "city",
      label: "City",
      class: "dropdown",
    },
    {
      id: 4,
      name: "postal_index_code",
      label: "Pincode",
      placeholder: "Enter Pincode ",
    },
  ];

  const countryOptions = countryData?.response?.data?.map((country) => {
    return (
      <option key={country.id} value={country.name}>
        {country.name}
      </option>
    );
  });

  const stateOptions = provinceData?.data?.map((province) => {
    return (
      <option key={province.id} value={province.name}>
        {province.name}
      </option>
    );
  });

  const cityOptions = cityData?.data?.data.map((city) => (
    <option key={city.id} value={city.name}>
      {city.name}
    </option>
  ));

  return (
    <div className="border-b-2 transition duration-300">
      <div className="w-full flex justify-between py-3 items-center">
        <h2 className="text-[1.042vw] font-semibold">
          Location Details<span className="text-[#F43F5E]">*</span>
        </h2>
        <img
          src={isVisible ? Ghost : Plus}
          onClick={toggleVisibility}
          className="cursor-pointer hover:border hover:rounded-lg hover:bg-slate-100 w-6 h-6"
        />
      </div>

      {isVisible && (
        <div className="flex flex-col gap-3">
          <p className="text-[0.729vw] text-[#6B7280]">
            {editfform
              ? "Edit the location of the charger"
              : "Add the location of the charger"}
          </p>

          <form>
            <div className="flex justify-between px-1 items-center">
              <label className="text-[0.729vw] text-[#6B7280] flex my-2">
                Address <span className="text-[#F43F5E]">*</span>
              </label>
              <p className="text-[0.729vw] text-[#8CC63F] font-normal">
                Use map
              </p>
            </div>

            <textarea
              name="address_line1"
              onChange={(e) => {
                onChange("address_line1", e.target.value, "location_details");
              }}
              placeholder="Enter Address Here"
              className="h-[8.4vh] resize-none rounded-lg border border-[#E5E7EB] outline-none placeholder:text-[#9CA3AF] text-gray-700 w-full p-4 text-[0.729vw]"
            />

            <div className="flex justify-between px-1 items-center">
              <label className="text-[0.729vw] text-[#6B7280] flex my-2">
                Address <span className="text-[#F43F5E]">*</span>
              </label>
              <p className="text-[0.729vw] text-[#8CC63F] font-normal">
                Use map
              </p>
            </div>

            <textarea
              name="address_line2"
              onChange={(e) => {
                onChange("address_line2", e.target.value, "location_details");
              }}
              placeholder="Enter Address Here"
              className="h-[8.4vh] resize-none rounded-lg border border-[#E5E7EB] outline-none placeholder:text-[#9CA3AF] text-gray-700 w-full p-4 text-[0.729vw]"
            />
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-7 pb-6">
              {form.map((forms) => (
                <div key={forms?.id} className="flex flex-col gap-2">
                  <label className="text-[0.729vw] text-[#6B7280]">
                    {forms.label} <span className="text-[#F43F5E]">*</span>
                  </label>

                  {forms.class === "dropdown" ? (
                    <select
                      name={forms.name}
                      className="w-full cursor-pointer border outline-none placeholder-[#9CA3AF] text-gray-700 pl-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
                      onChange={handleSelectChange}
                      value={
                        forms.name === "state"
                          ? selectedProvince?.name || "DefaultState"
                          : forms.name === "city"
                          ? selectedCity?.name || "DefaultCity"
                          : forms.name === "country"
                          ? selectedCountry?.name || "DefaultCountry"
                          : ""
                      }
                    >
                      {forms.name === "state" ? (
                        <>
                          <option value="DefaultState" disabled hidden>
                            Select State
                          </option>
                          {stateOptions}
                        </>
                      ) : null}
                      {forms.name === "city" ? (
                        <>
                          <option value="DefaultCity" disabled hidden>
                            Select City
                          </option>
                          {cityOptions}
                        </>
                      ) : null}

                      {forms.name === "country" ? (
                        <>
                          <option value="DefaultCountry" disabled hidden>
                            Select Country
                          </option>
                          {countryOptions}
                        </>
                      ) : null}
                    </select>
                  ) : (
                    <InputBox
                      type="text"
                      name={forms.name}
                      onChange={(e) => {
                        onChange(
                          forms.name,
                          e.target.value,
                          "location_details"
                        );
                      }}
                      placeholder={forms?.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;
