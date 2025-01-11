import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icondelete from "../../assets/Customer/trash.png";
import Edit from "../../assets/Table/edit.svg";
import OptionButton from "../common/OptionButton";
import PaginationButtons from "../common/PaginationButtons";
import { useSelector } from "react-redux";
import Checkbox from "../common/CheckBox";
import "../common/modal/Modal.css";
import RfidForm from "./RfidForm";
import {
  normalizeSearchTerm,
  filterDataBySearch,
} from "../../components/common/Functions/searchFunctions";
import Modal from "../common/modal/Modal";

const RfidIndex = ({ searchTerm }) => {
  const data = useSelector((state) => state.tableCart.dataTable);
  const [modalshow, setModalShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const rfidhandle = () => {
    setModalShow(true);
  };

  const filteredBySearch = filterDataBySearch(data, searchTerm);

  const handleCheckboxChange = (newState) => {
    setIsChecked(newState);
  };

  const totalPages = Math.ceil(filteredBySearch.length / rowsPerPage);

  const currentData = filteredBySearch.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePreviousPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table className="w-[100%] border rounded-lg">
        <thead className="border-b">
          <tr className="bg-gray-50 h-[8vh]  gap-2">
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              RFID REFERENCE
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide ">
              USER
            </th>
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              ACTIVE STATUS
            </th>
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              CREATED AT
            </th>
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="w-full">
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="w-2/12 text-[0.833vw] whitespace-no-wrap border-b py-[2vw] border-gray-200 text-center">
                <div className="text-[#101828] font-medium text-[0.833vw]">
                  <h2> {item.ifsc_number}</h2>
                </div>
              </td>
              <td className="w-2/12 text-[0.833vw] whitespace-no-wrap border-b border-gray-200 text-center">
                <div className="text-[#232D42] text-[0.833vw]">
                  <h1>{item.name} </h1>
                  <h2> {item.num}</h2>
                </div>
              </td>
              <td
                className={
                  "w-2/12 text-[0.833vw] whitespace-no-wrap border-b border-gray-200 text-center"
                }
              >
                <td className="flex justify-center whitespace-no-wrap  border-gray-200">
                  <Checkbox
                    initialItemState={!isChecked}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </td>
              </td>
              <td className="w-2/12 text-[0.833vw] whitespace-no-wrap border-b border-gray-200 text-center">
                {item.date}
                {item.time}
              </td>
              <td
                className={
                  "w-2/12 text-[0.833vw] whitespace-no-wrap border-b border-gray-200 text-center"
                }
              >
                <td className="w-1/12 text-[0.833vw] whitespace-no-wrap border-gray-200 text-center">
                  <div className="flex justify-center m-auto">
                    <OptionButton
                      option
                      table
                      opt
                      options={[
                        <div className="flex flex-col gap-3 justify-start m-auto">
                          <Link onClick={rfidhandle} className="flex gap-2">
                            <img
                              src={Edit}
                              alt="edit"
                              className="w-[1.25vw] h-[2vh]"
                            />
                            <p className="text-[0.833vw]">Edit</p>
                          </Link>

                          <Link className="flex gap-2 items-center">
                            <img
                              src={Icondelete}
                              alt="DeleteIcon"
                              className="w-[1.25vw]"
                            />
                            <p className="text-[0.833vw] text-red-700">
                              Delete
                            </p>
                          </Link>
                        </div>,
                      ]}
                    />
                  </div>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full px-[2vw]  border py-[1.25vw]">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousClick={handlePreviousPage}
          onNextClick={handleNextPage}
        />
      </div>
      <div>
        {modalshow && (
          <Modal modalshow={modalshow} setModalShow={setModalShow}>
            <RfidForm setModalShow={setModalShow} edit />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default RfidIndex;
