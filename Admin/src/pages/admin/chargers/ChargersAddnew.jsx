import React, { useEffect, useState } from "react";
import ChargerDetails from "../../../components/chargers/ChargerDetails";
import ConnectorDetails from "../../../components/chargers/ConnectorDetails";
import LocationChargeDetails from "../../../components/chargers/LocationChargeDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  createCharger,
  createConnector,
  editCharger,
  editConnector,
  setEditChargerData,
  updateChargerSave,
  updateConnectorSave,
} from "../../../store/slices/HostSlice";
import { useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ChargerView } from "../../../api/PropertyApi";

const ChargersAddnew = ({
  createChargerdata,
  createConnectorData,
  editchargerDetails,
  setChargerActive,
}) => {
  const [chargerDetailsVisible, setChargerDetailsVisible] = useState(true);
  const [locationDetailsVisible, setLocationDetailsVisible] = useState(false);
  const [connectorDetailsVisible, setConnectorDetailsVisible] = useState(false);
  const createConnectorId = useSelector((state) => state.host.connectorSave);
  const { id } = useParams();
  const [error, setError] = useState("");
  const editChargerId = useSelector((state) => {
    const { Connectors, ...chargerDataWithoutConnectors } = {
      ...state.host.chargerSave,
    };
    return chargerDataWithoutConnectors;
  });

  const profileView = async (data) => {
    try {
      const chargerDetailsResponse = await ChargerView(data);
      const chargerDetailsData = chargerDetailsResponse?.data?.response?.data;
      dispatch(setEditChargerData(chargerDetailsData));
    } catch (error) {
      console.error("Error fetching charger details", error);
    }
  };

  useEffect(() => {
    if (editchargerDetails) {
      profileView(id);
    }
    return () => {
      dispatch(setEditChargerData(null));
    };
  }, [id]);

  const handleChargerDetailsToggle = () => {
    setChargerDetailsVisible(!chargerDetailsVisible);
    setLocationDetailsVisible(false);
    setConnectorDetailsVisible(false);
  };

  const handleLocationDetailsToggle = () => {
    setLocationDetailsVisible(!locationDetailsVisible);
    setChargerDetailsVisible(false);
    setConnectorDetailsVisible(false);
  };

  const handleConnectorDetailsToggle = () => {
    setConnectorDetailsVisible(!connectorDetailsVisible);
    setChargerDetailsVisible(false);
    setLocationDetailsVisible(false);
  };

  const dispatch = useDispatch();

  const handleChargerbtncreate = () => {
    const errors = {};
    if (
      !createChargerdata.name ||
      !createChargerdata.property_id ||
      !createChargerdata.serial_number ||
      !createChargerdata.oem_company ||
      !createChargerdata.latitude ||
      !createChargerdata.longitude ||
      !createChargerdata.land_mark
    ) {
      Object.keys(createChargerdata).forEach((key) => {
        if (!createChargerdata[key]) {
          errors[key] = `${key} is required`;
        }
      });

      setError(errors);
      return;
    }

    // If all fields are filled, dispatch the action to create the charger
    dispatch(createCharger({ ...createChargerdata }));
  };

  const handleChargerbtnEdit = () => {
    dispatch(editCharger({ id: id, payload: editChargerId }));
  };

  const handleConnectorbtnCreate = () => {
    const errors = {};
    if (
      !createConnectorData.oem_connector_number ||
      !createConnectorData.charger_id ||
      !createConnectorData.connector_type ||
      !createConnectorData.tariff_rate ||
      !createConnectorData.max_unit_hour ||
      !createConnectorData.capacity
    ) {
      // If any field is empty, set validation error
      Object.keys(createConnectorData).forEach((key) => {
        if (!createConnectorData[key]) {
          errors[key] = `${key} is required`;
        }
      });

      // Update error state with validation errors
      setError(errors);
      return; // Stop further execution
    }

    dispatch(createConnector({ ...createConnectorData }));
  };

  const handleConnectorbtnEdit = () => {
    dispatch(
      editConnector({
        id: id,
        payload: createConnectorId,
      })
    );
  };

  const handlecharger = (key, value) => {
    const errors = { ...error };
    if (value === "") {
      errors[key] = `${key} is required`;
    } else {
      delete errors[key];
    }
    setError(errors);

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
        errorMessage = "Please enter a valid value";
      }
    }

    // Perform validation similar to handleCharger
    const errors = { ...error };
    if (errorMessage !== "") {
      errors[key] = errorMessage;
    } else {
      delete errors[key];
    }
    setError(errors);

    dispatch(
      updateConnectorSave({ key, value: processedValue, error: errorMessage })
    );
  };

  return (
    <>
      <div className="flex justify-center items-center w-[100%] m-auto min-h-[70vh]">
        <div className="w-[40%]">
          <h2 className="text-[1.25vw] font-semibold py-7">
            {editchargerDetails ? "Edit Chargers" : "Add Chargers"}
          </h2>
          <div>
            <ChargerDetails
              isVisible={chargerDetailsVisible}
              toggleVisibility={handleChargerDetailsToggle}
              handlecharger={handlecharger}
              createChargerdata={createChargerdata}
              error={error}
            />
            <LocationChargeDetails
              isVisible={locationDetailsVisible}
              toggleVisibility={handleLocationDetailsToggle}
              handlecharger={handlecharger}
              createChargerdata={createChargerdata}
              error={error}
            />
            <div className="flex justify-center mt-4">
              <Button
                backgroundColor="#8CC63F"
                content={
                  editchargerDetails ? "Update Charger" : "Create Charger"
                }
                width="100%"
                radius="0.5rem"
                color="white"
                font="0.833vw"
                onClick={
                  editchargerDetails
                    ? handleChargerbtnEdit
                    : handleChargerbtncreate
                }
                height="5vh"
              />
            </div>
            <ConnectorDetails
              isVisible={connectorDetailsVisible}
              toggleVisibility={handleConnectorDetailsToggle}
              createConnectorData={createConnectorData}
              handleConnector={handleConnector}
              error={error}
              editchargerDetails={editchargerDetails}
            />
            <div className="flex justify-center mt-4">
              <Button
                backgroundColor="#8CC63F"
                content={
                  editchargerDetails ? "Update Connector" : "Create Connector"
                }
                width="100%"
                radius="0.5rem"
                color="white"
                font="0.833vw"
                onClick={
                  editchargerDetails
                    ? handleConnectorbtnEdit
                    : handleConnectorbtnCreate
                }
                height="5vh"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChargersAddnew;
