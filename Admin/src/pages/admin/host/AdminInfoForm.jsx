import React, { useState } from "react";
import InputBox from "../../../components/common/InputBox";
import Button from "../../../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Adminformdata } from "./AdminInfoFormData";

const AdminInfoForm = ({ edithost1 }) => {
  const formData = { email: "", password: "", confirm_password: "" };
  const [selectedProperty, setSelectedProperty] = useState("");
  const [adminSelect, setAdminSelect] = useState(false);
  const [formValues, setFormValue] = useState(formData);
  const [errorForm, setErrorForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleSelectBoxTrue = () => {
    setAdminSelect(true);
  };

  const handleSelectBoxFalse = () => {
    setAdminSelect(false);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setAdminSelect(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-[20px] text-black tracking-tight not-italic font-bold">
        {edithost1 ? "Edit Admin" : "Add New Admin"}
      </h1>
      <p className="text-[12px] text-[9CA3AF] font-normal not-italic">
        Enter valid mail and Choose a strong password and don’t reuse it for
        other accounts.
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {Adminformdata?.map((Item1) => (
          <div>
            <InputBox
              type={Item1?.type}
              name={Item1?.name}
              placeholder={edithost1 ? Item1?.placeholder1 : Item1?.placeholder}
              value={formValues[Item1?.value]}
              onChange={handleChange}
              // required
              inputhost
            />
          </div>
        ))}
        <div>
          {edithost1 ? (
            <label
              htmlFor="text"
              className="my-3 text-[#6B7280] text-start text-[1rem] flex self-start"
            >
              Change the Assigned property :
              <span className="text-[#292D32]"> Windsor Castle</span>
            </label>
          ) : (
            <label
              htmlFor="text"
              className="my-3 text-black text-start text-[1rem] flex self-start"
            >
              Assign the property
            </label>
          )}
          <div className="items-center relative">
            <InputBox
              placeholder="Select the Property"
              value={selectedProperty}
            />
            <FontAwesomeIcon
              icon={faAngleDown}
              className="text-[#6B7280] cursor-pointer text-sm absolute right-4 bottom-3"
              onClick={handleSelectBoxTrue}
            />

            {adminSelect && (
              <div
                className="flex flex-col bg-[##E5E7EB] border boder-1 border-gray my-2 rounded-sm pb-2"
                onClick={handleSelectBoxFalse}
              >
                <p
                  className="text-[#9CA3AF] text-sm border-b border-solid border-[##E5E7EB] h-[2.75rem] p-3"
                  onClick={() => handlePropertyClick("Windsor Castle")}
                >
                  Windsor Castle
                </p>
                <p
                  className="text-[#9CA3AF] text-sm border-b border-solid border-[##E5E7EB] h-[2.75rem] p-3 mb-2"
                  onClick={() => handlePropertyClick("Salem Property 2")}
                >
                  Salem Property 2
                </p>

                <Button
                  backgroundColor="#8CC63F"
                  content="Add new"
                  width="90%"
                  searchicon={true}
                  radius="0.5rem"
                  color="white"
                  font="1rem"
                />
              </div>
            )}
          </div>
        </div>
        {edithost1 ? (
          <Button
            backgroundColor="#8CC63F"
            content="Save changes"
            width="100%"
            radius="0.5rem"
            color="white"
            font="1rem"
            onClick={handleSubmit}
          />
        ) : (
          <Button
            backgroundColor="#8CC63F"
            content="Create New Admin"
            width="100%"
            radius="0.5rem"
            color="white"
            font="1rem"
            onClick={handleSubmit}
          />
        )}
      </form>
    </div>
  );
};

export default AdminInfoForm;
