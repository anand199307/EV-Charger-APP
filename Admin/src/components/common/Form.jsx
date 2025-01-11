import React, { useEffect } from "react";
import { useState } from "react";
import InputBox from "./InputBox";
import Profile from "../../assets/host/image 13.svg";
import Delete from "../../assets/Table/Button.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "./modal/Modal";
import { Adminformdata } from "../../pages/admin/host/AdminInfoFormData";
import Button from "./Button";
import { updateSave, uploadedImage } from "../../store/slices/HostSlice";
import { City, Country, Province } from "../../api/HostApi";

const Form = ({ showOptions, onChange, selectCostomer }) => {
  const save = useSelector((state) => state.host.save);
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [modalshow, setModalShow] = useState(false);
  const [createdEmail, setCreatedEmail] = useState("");
  const [tempMail, setTempMail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [provinceData, setProvinceData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [customerCountryData, SetcustomerCountryData] = useState(null);
  const [customerProvinceData, SetcustomerProvinceData] = useState(null);
  const [customerCityData, SetCustomerCityData] = useState(null);
  const [customerCountryDataEdit, SetcustomerCountryDataEdit] = useState(null);
  const [customerProvinceDataEdit, SetcustomerProvinceDataEdit] =
    useState(null);
  const [customerCityDataEdit, SetCustomerCityDataEdit] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const formDetail = formDetails.find((form) => form.name === name);

    if (formDetail) {
      if (formDetail.class === "dropdown" && showOptions) {
        if (name === "country") {
          const selectedCountry = countryData?.response?.data?.find(
            (country) => country.name === value
          );
          setSelectedCountry(selectedCountry);
          setSelectedProvince(null);
          dispatch(
            updateSave({
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
            updateSave({
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
            updateSave({
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

  const onEditChange = (e, nestedKey) => {
    const { name, value } = e.target;
    if (
      name === "address_line1" ||
      name === "address_line2" ||
      name === "postal_index_code"
    ) {
      dispatch(
        updateSave({
          key: name,
          value: value,
          nestedKey: nestedKey,
        })
      );
    } else {
      dispatch(updateSave({ key: name, value }));
    }

    const field = formDetails?.find((box) => box?.name === name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field?.name]:
        field && !field?.pattern?.test(value) ? field?.errorMessage : "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setTempMail(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email address",
      }));
    } else if (name === "password") {
      setTempPassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? ""
          : "Password must be at least 8 characters long and contain at least one letter and one number",
      }));
    } else if (name === "confirm_password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value === tempPassword ? "" : "Passwords do not match",
      }));
    }
  };

  const countryId = selectCostomer?.location?.country_id;
  const stateId = selectCostomer?.location?.province_id;
  const cityId = selectCostomer?.location?.city_id;
  const countryIdEdit = save?.location_details?.country_id;
  const stateIdEdit = save?.location_details?.province_id;
  const cityIdEdit = save?.location_details?.city_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let countryResponse;
        if (selectCostomer) {
          countryResponse = await Country();
          SetcustomerCountryData(countryResponse);

          const stateResponse = await Province(countryId);
          SetcustomerProvinceData(stateResponse);

          const cityResponse = await City(stateId);
          SetCustomerCityData(cityResponse);
        } else {
          countryResponse = await Country();
          setCountryData(countryResponse);

          if (selectedCountry) {
            const provinceResponse = await Province(selectedCountry?.id);
            setProvinceData(provinceResponse);

            if (selectedProvince) {
              const cityResponse = await City(selectedProvince?.id);
              setCityData(cityResponse);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectCostomer, selectedCountry, selectedProvince, countryId, stateId]);

  const country = customerCountryData?.response?.data?.find(
    (country) => country.id === countryId
  );
  const state = customerProvinceData?.data?.find(
    (state) => state.id === stateId
  );
  const city = customerCityData?.data?.data?.find((city) => city.id === cityId);

  const countryEdit = customerCountryDataEdit?.response?.data?.find(
    (country) => country.id === countryIdEdit
  );
  const stateEdit = customerProvinceDataEdit?.data?.find(
    (state) => state.id === stateIdEdit
  );
  const cityEdit = customerCityDataEdit?.data?.data?.find(
    (city) => city.id === cityIdEdit
  );

  const handleCreateHost = (e) => {
    e?.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please fix the errors before creating the host.");
    } else {
      dispatch(updateSave({ key: "email", value: tempMail }));
      dispatch(updateSave({ key: "password", value: tempPassword }));
      setCreatedEmail(tempMail);
      setModalShow(false);
    }
  };

  const countryOptions = countryData?.response?.data?.map((country) => (
    <option key={country.id} value={country.name}>
      {country.name}
    </option>
  ));

  const stateOptions = provinceData?.data?.map((province) => (
    <option key={province.id} value={province.name}>
      {province.name}
    </option>
  ));

  const cityOptions = cityData?.data?.data?.map((city) => (
    <option key={city.id} value={city.name}>
      {city.name}
    </option>
  ));

  const rfidhandle = () => {
    setModalShow(true);
  };

  const handleBrowseClick = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      // dispatch(uploadedImage());
      setSelectedFile(file);
    }
  };

  const formDetails = [
    {
      id: 1,
      name: "host_name",
      label: "Organisation Name *",
      placeholder: "Enter Organisation Name",
      pattern: /^[A-Za-z]+$/,
      errorMessage: "Only alphabets are allowed.",
    },
    {
      id: 2,
      name: "phone_number",
      label: "Host Phone Number",
      placeholder: "Enter Mobile Number",
      pattern: /^[0-9]{10}$/,
      errorMessage: "Phone Number should have 10 characters.",
    },
    {
      id: 3,
      name: "email",
      label: "Host Mail ID",
      div: "text",
      pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      errorMessage: "EMAIL FORMAT IS WRONG.",
    },
    {
      id: 4,
      name: "address_line1",
      label: "Address",
      placeholder: "Enter Address",
    },
    {
      id: 5,
      name: "country",
      label: "Country",
      class: "dropdown",
    },
    {
      id: 6,
      name: "state",
      label: "State",
      placeholder: "",
      class: "dropdown",
    },
    {
      id: 7,
      name: "city",
      label: "City",
      class: "dropdown",
    },

    {
      id: 8,
      name: "taxNumber",
      label: "Tax Identification Number",
      placeholder: "Ether Enterprises",
    },
    {
      id: 9,
      name: "gstNumber",
      label: "GST/VAT Number ",
      placeholder: "623 305",
    },
    {
      id: 10,
      name: "postal_index_code",
      label: "Pin Number",
      placeholder: "Enter Pincode",
      pattern: /^\d+$/,
      errorMessage: "Only numbers are allowed.",
    },
    {
      id: 11,
      name: "address_line2",
      label: "Address",
      placeholder: "Enter Address",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-[95%]  m-auto">
          <div className="flex w-[66%] justify-between">
            {/* <div className="flex items-start justify-between mr-4 gap-5">
              <div className="flex flex-col gap-5">
                <label className="text-sm text-[#6B7280]">Logo</label>
                <img
                  src={
                    selectedFile ? URL.createObjectURL(selectedFile) : Profile
                  }
                  alt="profile"
                  className="w-20 h-20 object-contain"
                />
              </div>

              {showOptions && (
                <div className="flex items-center">
                  <label className="text-sm text-[#6B7280] cursor-pointer mr-2">
                    <span className="border rounded-lg text-sm font-medium px-[0.75rem] py-[0.7rem]">
                      Upload
                    </span>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleBrowseClick(e);
                      }}
                      accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .mp4, .avi, .mkv, .jpg, .jpeg, .png"
                    />
                  </label>
                  <button onClick={() => setSelectedFile(null)}>
                    <img
                      src={Delete}
                      alt="delete"
                      className="border rounded-lg"
                    />
                  </button>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          showOptions={true}
          onChange={onChange}
          className=" mt-[3vw]"
        >
          <div className="grid grid-cols-3 gap-[1.25vw] w-[95%] m-auto items-center">
            {formDetails.map((form) => {
              return (
                <>
                  <div key={form.id} className="flex flex-col gap-3">
                    <label className="text-[0.729vw] text-[#6B7280]">
                      {form.label}
                    </label>
                    {form.class === "dropdown" && showOptions ? (
                      <>
                        <select
                          name={form.name}
                          className="w-full cursor-pointer border outline-none placeholder-[#9CA3AF] text-gray-700 pl-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
                          onChange={handleSelectChange}
                          value={
                            form.name === "state"
                              ? selectedProvince?.name || "DefaultState"
                              : form.name === "city"
                              ? selectedCity?.name || "DefaultCity"
                              : form.name === "country"
                              ? selectedCountry?.name || "DefaultCountry"
                              : ""
                          }
                        >
                          {form.name === "state" && (
                            <option
                              value="DefaultState"
                              disabled
                              hidden
                              // className="text-[#9CA3AF]"
                            >
                              Select State
                            </option>
                          )}
                          {form.name === "city" && (
                            <option value="DefaultCity" disabled hidden>
                              Select City
                            </option>
                          )}
                          {form.name === "country" && (
                            <option value="DefaultCountry" disabled hidden>
                              Select Country
                            </option>
                          )}
                          {form.name === "state" && stateOptions}
                          {form.name === "city" && cityOptions}
                          {form.name === "country" && countryOptions}
                        </select>
                      </>
                    ) : showOptions ? (
                      <>
                        {form?.div === "text" ? (
                          <div
                            className="flex border w-full px-[0.833vw] py-[0.417vw] text-[0.729vw] bg-[#F9FAFB] rounded-lg h-[4.6vh] cursor-pointer items-center"
                            onClick={rfidhandle}
                          >
                            {createdEmail || save[form?.name] || (
                              <span className="text-[#9CA3AF]">
                                Click here to set up Host Mail ID
                              </span>
                            )}
                          </div>
                        ) : (
                          <>
                            <InputBox
                              type="text"
                              name={form?.name}
                              placeholder={form?.placeholder}
                              value={
                                save[form?.name] ||
                                save?.location_details[form?.name]
                              }
                              onChange={(e) => {
                                onEditChange(e, "location_details");
                              }}
                              error={errors[form?.name]}
                              required
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full placeholder-[#9CA3AF] h-[5vh] bg-[#F9FAFB] rounded-lg border outline-none text-[0.729vw] flex items-center pl-3">
                        {form?.name === "state"
                          ? state?.name || "Select State"
                          : form?.name === "city"
                          ? city?.name || "Select City"
                          : form?.name === "country"
                          ? country?.name || "Select Country"
                          : selectCostomer[form?.name] ||
                            selectCostomer.location[form?.name]}
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </form>
        {modalshow && (
          <Modal modalshow={modalshow} setModalShow={setModalShow}>
            <div className="flex flex-col gap-4">
              <h1 className="text-[1.042vw]  text-[#0D0D54] font-bold">
                Setup Host Mail ID
              </h1>
              <p className="text-[0.729vw] text-[#9CA3AF] font-normal">
                Enter valid mail and Choose a strong password and don’t reuse it
                for other accounts.
              </p>
              <form className="flex flex-col gap-5 cursor-pointer">
                {Adminformdata?.map((Item1) => (
                  <div>
                    <InputBox
                      type={Item1?.type}
                      name={Item1?.name}
                      placeholder={Item1?.placeholder}
                      onChange={handleInputChange}
                      inputhost
                      required
                    />
                    {errors[Item1?.name] && (
                      <span className="text-red-500 text-[0.729vw]">
                        {errors[Item1?.name]}
                      </span>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  backgroundColor="#8CC63F"
                  content="Create Host"
                  width="100%"
                  radius="0.5rem"
                  color="white"
                  font="0.833vw"
                  onClick={handleCreateHost}
                />
              </form>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Form;
