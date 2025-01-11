import React, { useState, useRef, useEffect } from "react";
import "../common/modal/Modal.css";
import InputBox from "../common/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { createRfid, updateRfidSave } from "../../store/slices/HostSlice";
import Button from "../common/Button";

const RfidForm = ({ edit, setModalShow }) => {
  const [errorForm, setErrorForm] = useState({});
  const dispatch = useDispatch();
  // const rfidSave = useSelector((state) => state.host.rfidSave);

  const [rfid, setRfid] = useState({
    userId: null,
    tag_value: "",
  });

  // const handleChange = (key, value = null) => {
  //   dispatch(updateRfidSave({ key, value }));
  // };

   const handleChange = (key, value) => {
     let prev = { ...rfid };
     prev[key] = value;
     setRfid(prev);
   };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    dispatch(createRfid({ ...rfid }));
    setModalShow(false);

    // let isValid = true;
    // const newError = {};

    // if (!formValues.rfidsecret.trim()) {
    //   newError.rfidsecret = "RFID Secret is required";
    //   isValid = false;
    // }

    // if (!formValues.userid.trim()) {
    //   newError.userid = "User ID is required";
    //   isValid = false;
    // }

    // if (isValid) {
    //   console.log("Form submitted:", formValues);
    //   handlemodalclose();
    // } else {
    //   setErrorForm(newError);
    // }
  };

  const handlemodalclose = () => {
    setModalShow(false);
  };

  const form = [
    {
      id: 1,
      name: "tag_value",
      label: " RFID Secret",
      placeholder: "Enter RFID Secret",
      type: "text",
    },
    {
      id: 2,
      name: "userId",
      label: "User ID",
      placeholder: "Enter User ID",
    },
  ];

  return (
    <div>
      <h1 className="text-[1.042vw] font-bold">
        {edit ? "Edit RFID" : "Add new RFID"}
      </h1>
      <form className="flex flex-col gap-3">
        {form?.map((forms) => (
          <div key={forms?.id}>
            <label
              htmlFor="text"
              className="my-3 text-[#8A92A6] text-start text-[0.833vw] flex self-start"
            >
              {forms?.label} <span className="text-[#F43F5E]">*</span>
            </label>
            <InputBox
              type="text"
              name={forms.name}
              placeholder={forms.placeholder}
              onChange={(e) => {
                handleChange(forms.name, e.target.value);
              }}
            />
            {errorForm.rfidsecret && (
              <div className="text-red-500">{errorForm.rfidsecret}</div>
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            backgroundColor="#8CC63F"
            content="Cancel"
            width="4.115vw"
            radius="0.25rem"
            color="white"
            font="0.833vw"
            onClick={handlemodalclose}
          />
          {edit ? (
            <Button
              backgroundColor="#8CC63F"
              content="Save RFID"
              width="6.771vw"
              radius="0.25rem"
              color="white"
              font="0.833vw"
              onClick={handleModalSubmit}
            />
          ) : (
            <Button
              backgroundColor="#8CC63F"
              content="Add RFID"
              width="6.771vw"
              radius="0.25rem"
              color="white"
              font="0.833vw"
              // onClick={handleModalSubmit}
            />
          )}

          {/* <button type="submit" className="addnewbutton">
            {edit ? "Save RFID" : "Add RFID"}
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default RfidForm;
