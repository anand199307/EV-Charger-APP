import React, { useState } from "react";
import TableHeader from "../common/TableHeader";
import PropertiesView from "./PropertiesView";
import { useDispatch, useSelector } from "react-redux";
import Table from "../common/Table";
import PropertyAddForm from "../../pages/admin/host/PropertyAddForm";
import { updatePropertySave } from "../../store/slices/HostSlice";

function PropertiesIndex(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectCostomer, setSelectCostomer] = useState(null);
  const isDeleteButtonVisible = selectedRows.length > 0;
  // const [searchTerm, setSearchTerm] = useState([]);
  const dispatch = useDispatch();
  const propertySave = useSelector((state) => state.host.propertySave);
  const [modalshow, setModalShow] = useState(false);

  const handleDeleteSelectedRows = () => {
    const updatedData = props.tableData.filter(
      (row) => !selectedRows.includes(row?.id)
    );
    props.setTableData(updatedData);
    setSelectedRows([]);
  };

  const onInputChanges = (key, value, nestedKey = null) => {
    if (
      key === "address_line1" ||
      key === "address_line2" ||
      key === "postal_index_code"
    ) {
      dispatch(
        updatePropertySave({
          key: key,
          value: value,
          nestedKey: "location_details",
        })
      );
    } else {
      dispatch(updatePropertySave({ key, value }));
    }
  };
  // console.log(propertySave);

  return (
    <>
      {!props.ispropertyActive && (
        <div className="flex gap-5">
          <div className="w-[70%] px-5 pb-5 border rounded-lg flex flex-col items-center">
            <div className="w-full flex justify-between py-5">
              <div className="flex gap-7 items-center text-[0.833vw]">
                {/* <div className="border py-2.5 px-4 rounded-lg flex gap-2">
                  <img src={Filters} alt="filters" />
                  Filters
                </div> */}
                <div>{selectedRows?.length} row selected</div>
              </div>

              <TableHeader
                isDeleteButtonVisible={isDeleteButtonVisible}
                handleDeleteSelectedRows={handleDeleteSelectedRows}
                onChange={(e) => props.setSearchTerm(e.target.value)}
                propertiesactives={() => props.setpropertyActive(true)}
              />
            </div>

            <Table
              data={props.data}
              columns={props.columns}
              datas={props.datas}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              selectCostomer={selectCostomer}
              setSelectCostomer={setSelectCostomer}
              searchTerm={props.searchTerm}
              setTableData={props.setTableData}
              tableData={props.tableData}
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}
              limit={props.limit}
              totalPages={props.totalPages}
              properties
            />
          </div>
          <div className="w-[30%] px-[1.25vw] border rounded-lg py-[2.083vw]">
            {selectCostomer === null ? (
              <p className="text-[0.833vw]">Please Click</p>
            ) : (
              <PropertiesView
                selectCostomer={selectCostomer}
                setTableData={props.setTableData}
                tableData={props.tableData}
              />
            )}
          </div>
        </div>
      )}

      {props.ispropertyActive && (
        <div className="w-[50%] m-auto">
          <PropertyAddForm
            onChange={onInputChanges}
            setModalShow={setModalShow}
            propertySave={propertySave}
          />
        </div>
      )}
    </>
  );
}

export default PropertiesIndex;
