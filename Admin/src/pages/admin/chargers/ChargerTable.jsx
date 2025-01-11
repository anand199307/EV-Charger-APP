import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChargerIndex from "../../../components/chargers/ChargerIndex";
import TableHeader from "../../../components/common/TableHeader";
import ChargersAddnew from "./ChargersAddnew";
import {
  updateConnectorSave,
  editCharger,
  updateChargerSave,
} from "../../../store/slices/HostSlice";
import { ChargerList } from "../../../api/ChargerApi";

const ChargerTable = (props) => {
  // const data = useSelector((state) => state.tableCart.dataTable);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [editchargerDetails, setEditchargerDetails] = useState(false);

  const createChargerdata = useSelector((state) => state.host.chargerSave);
  const createConnectorData = useSelector((state) => state.host.connectorSave);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleDateRangeSelect = (selectedRange) => {
    // console.log(selectedDateRange);
    setSelectedDateRange(selectedRange);
  };

  const handlecharger = (key, value = null) => {
    dispatch(updateChargerSave({ key, value }));
  };

  const handleConnector = (key, value = null) => {
    let processedValue = value;
    let errorMessage = "";

    if (key === "tariff_rate") {
      const isValidDecimal = /^\d+(\.\d{1,2})?$/.test(value);

      if (!isValidDecimal && value !== "") {
        errorMessage = "Please enter a valid decimal number";
      }

      if (isValidDecimal) {
        processedValue = parseFloat(value);
      }
    } else if (key === "max_unit_hour" || key === "capacity") {
      const isValidInteger = /^\d+$/.test(value);

      if (!isValidInteger && value !== "") {
        errorMessage = "Please enter a valid integer";
      }

      if (isValidInteger) {
        processedValue = parseInt(value, 10);
      }
    } else if (key === "oem_connector_number" || key === "connector_type") {
      if (typeof value !== "string") {
        errorMessage = "Please enter a valid  value";
      }
    }

    setError((prevErrors) => ({
      ...prevErrors,
      [key]: errorMessage,
    }));
    dispatch(
      updateConnectorSave({ key, value: processedValue, error: errorMessage })
    );
  };

  const [tableData, setTableData] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <>
      {!props.ischargerActive && (
        <div className=" mx-10 px-5 pb-5 border rounded-lg mt-7 ">
          <div className="flex justify-end py-[1.25vw]">
            <TableHeader
              // searchQuery={props.searchQuery}
              // handleSearchInputChange={props.handleSearchInputChange}
              onChange={(e) => setSearchTerm(e.target.value)}
              actives={() => props.setChargerActive(true)}
              handleDateRangeSelect={handleDateRangeSelect}
            />
          </div>

          <div>
            <ChargerIndex
              limit={limit}
              tableData={tableData}
              setTableData={setTableData}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setChargerActive={props.setChargerActive}
              ischargerActive={props.ischargerActive}
              setEditchargerDetails={setEditchargerDetails}
            />
          </div>
        </div>
      )}

      {props.ischargerActive && (
        <div>
          <ChargersAddnew
            createChargerdata={createChargerdata}
            createConnectorData={createConnectorData}
            handlecharger={handlecharger}
            handleConnector={handleConnector}
            setChargerActive={props.setChargerActive}
            editchargerDetails={editchargerDetails}
            setEditchargerDetails={setEditchargerDetails}
            error={error}
          />
        </div>
      )}

      {/* <div className="ml-9 mt-6">
        <Charger />
      </div> */}
    </>
  );
};

export default ChargerTable;
