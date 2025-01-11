import React, { useState } from "react";
import InputBox from "../../../components/common/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { update } from "../../../store/slices/TableSlice";
import Profile from "../../../assets/host/image 13.svg";
import { updateSave, uploadedImage } from "../../../store/slices/HostSlice";

const BankInfo = ({ onChange, selectCostomer }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const save = useSelector((state) => state.host.save);

  const [selectedBill, setSelectedBill] = useState(null);
  const [errors, setErrors] = useState({});

  const onEditChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSave({ key: name, value }));

    const field = BankInfoBoxes.find((box) => box.name === name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field?.name]:
        field && !field.pattern.test(value) ? field.errorMessage : "",
    }));
  };

  const BankInfoBoxes = [
    {
      id: 1,
      name: "bank_name",
      label: "Bank Name",
      placeholder: "Enter Bank Name",
      pattern: /^[A-Za-z]+$/,
      errorMessage: "Only alphabets are allowed.",
    },
    {
      id: 2,
      name: "ifsc_code",
      label: "IFSC Number",
      placeholder: "Enter IFSC Number",
      pattern: /^[A-Za-z0-9]{11}$/,
      errorMessage: "IFSC Number should have 11 characters.",
    },
    {
      id: 3,
      name: "bank_account",
      label: "Account Number",
      placeholder: "Enter Account Number",
      pattern: /^\d+$/,
      errorMessage: "Only numbers are allowed.",
    },
    {
      id: 4,
      name: "payee_name",
      label: "Payee Name",
      placeholder: "Enter Bank Name",
      pattern: /^[A-Za-z]+$/,
      errorMessage: "Only alphabets are allowed.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 mt-[3vw]">
      <div className="flex gap-6 w-[95%]">
        {BankInfoBoxes.map((BankInfo) => (
          <div
            key={BankInfo.id}
            className="w-[26.667vw] flex flex-col gap-[0.625vw]"
          >
            <label className="text-[0.729vw] text-[#6B7280]">
              {BankInfo.label}
            </label>
            <InputBox
              type="text"
              name={BankInfo?.name}
              label={BankInfo?.label}
              placeholder={BankInfo?.placeholder}
              value={save[BankInfo?.name]}
              onChange={(e) => {
                onEditChange(e);
                // onChange(BankInfo.name, e.target.value);
              }}
              error={errors[BankInfo?.name]}
            />
          </div>
        ))}
      </div>
      <div className="w-[100%] flex flex-col gap-[1.042vw]">
        <label className="text-[0.729vw] text-[#6B7280]">
          Upload Bank Proof
        </label>
        <div className="flex flex-col gap-[0.625vw]">
          <div className="w-[25.99vw] h-[10vh] rounded-lg flex items-center justify-center border-dashed border-2">
            {selectedBill ? (
              <img
                src={selectedBill ? URL.createObjectURL(selectedBill) : Profile}
                alt="profile"
                className="w-20 h-20 object-contain"
              />
            ) : (
              <label className="w-[7.682rem] text-[0.729vw] text-[#6B7280] cursor-pointer">
                <span>
                  Drop your file here or
                  <span className="text-[#8CC63F] pl-0.5">click to browse</span>
                </span>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e?.target?.files[0];
                    // console.log(file);
                    if (file) {
                      // dispatch(uploadedImage());
                      setSelectedBill(file);
                    }
                  }}
                  accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .mp4, .avi, .mkv, .jpg, .jpeg, .png"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;
