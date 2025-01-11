import React, { useState } from "react";
import InputBox from "../../../components/common/InputBox";
import Button from "../../../components/common/Button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../store/slices/TableSlice";
import { handleChange } from "./FormFunction";
import AdminInfoForm from "./AdminInfoForm";
import Modal from "../../../components/common/modal/Modal";
const AdminInfo = () => {
  const params = useParams();
  const [modalshow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState("new");

  const rfidhandle = () => {
    setModalShow(true);
  };

  const data = useSelector((state) => state.tableCart.dataTable);
  // console.log(data);
  const selectedData = data?.find((item) => item.id == params.id);
  // console.log(selectedData);

  const [inputValue, setInputValue] = useState(selectedData || {});
  // console.log({ inputValue });

  const AdminInfoBoxes = [
    {
      id: 1,
      name: "admin",
      label: "First Name",
      placeholder: "Enter first name",
    },
    {
      id: 2,
      name: "admin_num",
      label: "Last Name",
      placeholder: "Enter last name",
    },
  ];

  const [inputBoxes, setInputBoxes] = useState(AdminInfoBoxes);
  const [editableInputs, setEditableInputs] = useState({});

  const handleEditClick = (id) => {
    setEditableInputs({ ...editableInputs, [id]: true });
  };

  const handleSaveClick = (id) => {
    setEditableInputs({ ...editableInputs, [id]: false });
  };

  // const handleInputChange = (id, event) => {
  //   const { name, value } = event.target;
  //   // const updatedInputBoxes = inputBoxes.map((input) => {
  //   //   if (input.id === id) {
  //   //     return { ...input, [name]: value };
  //   //   }
  //   //   return input;
  //   // });
  //   // setInputBoxes(updatedInputBoxes);
  // };

  // const handleChange = (e) => {
  //   setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  //   dispatch(update({ id: params.id, currentData: inputValue }));
  //   console.log({ inputValue });
  // };

  const handleDeleteClick = (id) => {
    setInputBoxes((boxes) => boxes.filter((input) => input.id !== id));
  };

  return (
    <div className="w-full mt-[3.333vw]">
      <div className="ml-20">
        <h4 className="text-sm text-[#6B7280]">Admin Details</h4>
        <div className="flex flex-col gap-4  mt-6 mb-6">
          {inputBoxes.map((input) => (
            <div key={input.id} className="flex items-center">
              <div className="w-[32rem] mr-6">
                {editableInputs[input.id] ? (
                  <InputBox
                    type="text"
                    name={input.name}
                    label={input.label}
                    placeholder={input.placeholder}
                    value={inputValue[input.name]}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="w-full placeholder-[#9CA3AF] h-10 bg-[#F9FAFB] rounded-lg border outline-none ">
                    {inputValue[input?.name]}
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  backgroundColor="#8CC63F"
                  content="Edit"
                  width="101px"
                  edit={true}
                  radius="0.25rem"
                  onClick={() => {
                    setModalInfo("edit");
                    rfidhandle();
                  }}
                  color="white"
                  font="1rem"
                />
                <Button
                  backgroundColor="#8CC63F"
                  content="Delete"
                  width="101px"
                  edit={true}
                  radius="0.25rem"
                  onClick={() => handleDeleteClick(input.id)}
                  color="white"
                  font="1rem"
                />
              </div>
            </div>
          ))}
        </div>
        <Button
          backgroundColor="#8CC63F"
          content="Add new"
          width="144px"
          searchicon={true}
          radius="0.25rem"
          onClick={() => {
            setModalInfo("new");
            rfidhandle();
          }}
          color="white"
          font="1rem"
        />
      </div>
      {modalshow && (
        <Modal modalshow={modalshow} setModalShow={setModalShow}>
          {modalInfo === "new" ? (
            <AdminInfoForm />
          ) : (
            modalInfo === "edit" && <AdminInfoForm edithost1 />
          )}
        </Modal>
      )}
    </div>
  );
};

export default AdminInfo;
