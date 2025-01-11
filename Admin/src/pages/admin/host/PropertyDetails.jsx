import React, { useEffect, useState } from "react";
import Plus from "../../../assets/plus.svg";
import Ghost from "../../../assets/Ghost.svg";
import InputBox from "../../../components/common/InputBox";
import Profile from "../../../assets/host/image 13.svg";
import { useDispatch, useSelector } from "react-redux";
import { HostList } from "../../../api/HostApi";
import { readUser } from "../../../services/localStorage.service";
import { updatePropertySave } from "../../../store/slices/HostSlice";
import { fetchSignedUrl, putImage } from "../../../store/slices/HostSlice";
import { uploadImageAPI } from "../../../api/HostApi";

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const base64String = reader.result;
      if (file?.type?.startsWith("image/")) {
        const image = new Image();
        image.src = base64String;
        image.onload = () => {
          resolve(base64String);
        };
        image.onerror = (error) => reject(error);
      } else {
        reject(new Error("The provided file is not an image."));
      }
    });

    reader.readAsDataURL(file);
  });
};

const PropertyDetails = ({
  isVisible,
  toggleVisibility,
  editfform,
  onChange,
  host,
}) => {
  const user = readUser();
  const save = useSelector((state) => state.host.save);

  const [hostData, setHostData] = useState(null);
  const [selectedHost, setSelectedHost] = useState(null);

  const dispatch = useDispatch();

  const signedUrl1 = useSelector((state) => state.host.url);
  // console.log(signedUrl1);
  const [selectedBill, setSelectedBill] = useState(null);

  const form = [
    {
      id: 1,
      name: "host_name",
      label: "Host",
      placeholder: "host@heliosevc.in",
      defaultValue: save?.host_name || "",
    },
    {
      id: 2,
      name: "name",
      label: "Property Name ",
      placeholder: " New Charger",
    },
    {
      id: 3,
      name: "eb_number",
      label: "EB Number  ",
      placeholder: "Enter EB Number",
    },
  ];

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const hostResponse = await HostList(user.account_id);
        setHostData(hostResponse?.data?.hostsWithPropertiesCount);
      } catch (error) {
        console.error("error in list", error);
      }
    };
    fetchHost();
  }, []);
  // console.log(hostData);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const formDetail = form.find((forms) => forms.name === name);

    if (name === "host_name") {
      const selectedHost = hostData?.find((host) => host.host_name === value);
      setSelectedHost(selectedHost);
      dispatch(
        updatePropertySave({
          key: "host_id",
          value: selectedHost?.id,
        })
      );
      // console.log("Selected host ID:", selectedHost?.id);
    } else {
      onChange(name, value);
    }
  };

  const hostOptions = hostData?.map((host) => (
    <option key={host.id} value={host.host_name}>
      {host.host_name}
    </option>
  ));

  const handleBrowseClick = async (e) => {
    const data = e.target.files[0];
    // console.log(e.target.files);
    // console.log({ data });

    try {
      const signedUrl = await dispatch(
        fetchSignedUrl({ fileType: data.type, uuid: 1, imageType: data.name })
      );
      // console.log(signedUrl);
      // console.log(signedUrl?.payload?.response?.url);
      // setSelectedBill(signedUrl?.payload?.response?.url.split("?").shift());

      const imageUrl = signedUrl?.payload?.response?.url.split("?").shift();

      if (imageUrl) {
        const uploadResponse = await dispatch(
          putImage(
            signedUrl?.payload?.response?.url,
            // data.type,
            // data.name,
            data
          )
        );
        // console.log(uploadResponse);
      } else {
        console.error("Failed to get signed URL");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setSelectedBill(data);
  };

  return (
    <div className="border-b-2 transition duration-300">
      <div className="w-full flex justify-between py-3 items-center">
        <h2 className="text-[1.042vw] font-semibold">
          Property Details<span className="text-[#F43F5E]">*</span>
        </h2>
        <img
          src={isVisible ? Ghost : Plus}
          onClick={toggleVisibility}
          className="cursor-pointer  hover:border hover:rounded-lg hover:bg-slate-100 w-6 h-6"
        />
      </div>

      {isVisible && (
        <div className="pb-6">
          <p className="text-[0.729vw] text-[#6B7280]">
            {editfform
              ? "Edit the charger details"
              : "Add the property details"}
            <span className="text-[#F43F5E]">*</span>
          </p>

          <form className="grid grid-cols-2 gap-x-6 gap-y-7 pt-[1.458vw]">
            {form?.map((forms) => (
              <div key={forms?.id} className="flex flex-col gap-2">
                <label className="text-[0.729vw] text-[#6B7280]">
                  {forms.label} <span className="text-[#F43F5E]">*</span>
                </label>
                {forms.name === "host_name" && !host ? (
                  <select
                    name={forms.name}
                    className="w-full cursor-pointer border outline-none placeholder-[#9CA3AF] text-gray-700 pl-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
                    onChange={handleSelectChange}
                    // style={{ color: "#9CA3AF" }}
                  >
                    <option value="" disabled selected hidden>
                      Select Host
                    </option>
                    {hostOptions}
                  </select>
                ) : (
                  <InputBox
                    type="text"
                    name={forms.name}
                    placeholder={forms.placeholder}
                    onChange={(e) => {
                      onChange(forms.name, e.target.value, "location_details");
                    }}
                    value={host && forms.defaultValue}
                  />
                )}
              </div>
            ))}
            <div className="w-[100%] flex flex-col gap-2">
              <label className="text-[0.729vw] text-[#6B7280]">
                Upload EB Bill
              </label>
              <div className="flex flex-col gap-3 ">
                <div className="h-[10vh] rounded-lg flex items-center justify-center border-dashed border-2">
                  {selectedBill ? (
                    <img
                      src={
                        selectedBill
                          ? URL.createObjectURL(selectedBill)
                          : Profile
                      }
                      alt="profile"
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <label className="text-[0.729vw] text-[#6B7280] cursor-pointer pl-2">
                      <span>
                        Drop your file here or
                        <span className="text-[#8CC63F] pl-0.5">
                          click to browse
                        </span>
                      </span>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        // onChange={(e) => {
                        //   const file = e?.target?.files[0];
                        //   console.log(file);
                        //   if (file) {
                        //     const fileURL = URL.createObjectURL(file);
                        //     onChange("eb_bill_copy", fileURL);
                        //     setSelectedBill(file);
                        //   }
                        // }}
                        onChange={(e) => handleBrowseClick(e)}
                        accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .mp4, .avi, .mkv, .jpg, .jpeg, .png"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
