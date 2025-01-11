import React, { useState } from "react";
import Filters from "../../assets/Table/Filters.svg";
import Table from "../common/Table";
import TableHeader from "../common/TableHeader";
import HostView from "./HostView";
import Stepper from "../common/Stepper";
import HeroSection from "../common/HeroSection";
import { useDispatch } from "react-redux";
import { editHost, resetSave } from "../../store/slices/HostSlice";

function HostIndex(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectCostomer, setSelectCostomer] = useState(null);
  const isDeleteButtonVisible = selectedRows?.length > 0;
  const [searchTerm, setSearchTerm] = useState([]);
  const [showStepper, setShowStepper] = useState(false);
  const [details, setDetails] = useState(true);
  const dispatch = useDispatch();

  //delete row
  const handleDeleteRow = (id) => {
    dispatch(editHost({ id: id, status: 0, payload: {} }));
    const updatedTableData = props.tableData.filter((item) => item.id !== id);
    props.setTableData(updatedTableData);

    const updatedSelectedRows = selectedRows.filter(
      (selectedRowId) => selectedRowId !== id
    );
    props.setSelectedRows(updatedSelectedRows);
  };

  return (
    <>
      {!showStepper && (
        <div className="flex gap-5">
          <div className="w-[70%] px-5 pb-5 border rounded-lg flex flex-col items-center">
            <div className="w-[53vw] flex justify-between py-[1.042vw]">
              <div className="flex gap-7 items-center text-[0.833vw]">
                <div>{selectedRows?.length} row selected</div>
              </div>

              <TableHeader
                isDeleteButtonVisible={isDeleteButtonVisible}
                handleDeleteRow={handleDeleteRow}
                onChange={(e) => setSearchTerm(e.target.value)}
                act={() => {
                  dispatch(resetSave());
                  setShowStepper(true);
                }}
              />
            </div>
            <Table
              data={props.data}
              columns={props.columns}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              selectCostomer={selectCostomer}
              setSelectCostomer={setSelectCostomer}
              searchTerm={searchTerm}
              onChange={props?.onChange}
              setTableData={props.setTableData}
              tableData={props.tableData}
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}
              limit={props.limit}
              totalPages={props.totalPages}
              handleDeleteRow={handleDeleteRow}
            />
          </div>

          <div className="w-[30%] px-[1.25vw] border rounded-lg py-[2.083vw]">
            {selectCostomer === null ? (
              <p className="text-[0.833vw]">Please Click</p>
            ) : (
              <HostView selectCostomer={selectCostomer} />
            )}
          </div>
        </div>
      )}
      {showStepper && (
        <div>
          <HeroSection title="Host" activate={() => setShowStepper(false)} />
          <Stepper
            details={details}
            stepperCancel={() => setShowStepper(false)}
            onChange={props?.onChange}
            save={props.save}
            // setSave={props.setSave}
            onSave={props.onSave}
            activeStepIndex={props.activeStepIndex}
            setActiveStepIndex={props.setActiveStepIndex}
            handleNext={props.handleNext}
            steps={props.steps}
          />
        </div>
      )}
    </>
  );
}

export default HostIndex;
