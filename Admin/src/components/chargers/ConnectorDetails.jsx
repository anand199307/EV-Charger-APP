import React, { useEffect, useState } from "react";
import InputBox from "../common/InputBox";
import Plus from "../../assets/plus.svg";
import Ghost from "../../assets/Ghost.svg";
import Checkbox from "../common/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { ChargerAllList } from "../../api/ChargerApi";
import {
  setEditConnectorData,
  updateConnectorSave,
} from "../../store/slices/HostSlice";

const ConnectorDetails = ({
  isVisible,
  toggleVisibility,
  handleConnector,
  createConnectorData,
  error,
  editchargerDetails,
}) => {
  const createChargerdata = useSelector((state) => state?.host?.chargerSave);
  const createConnectorId = useSelector((state) => state.host.connectorSave);
  const editChargerId = createChargerdata?.Connectors;
  const [selectedConnector, setSelectedConnector] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [chargerData, setChargerData] = useState(null);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const dispatch = useDispatch();

  const handleCheckboxChange = (id) => {
    const isCheckedValue = id === 1 ? true : false;

    setIsChecked(isCheckedValue);
    dispatch(
      updateConnectorSave({
        key: "hourly_charge",
        value: isCheckedValue,
      })
    );

    dispatch(
      updateConnectorSave({
        key: "unit_charge",
        value: isCheckedValue,
      })
    );
  };
  useEffect(() => {
    const fetchChargerData = async () => {
      try {
        const chargerResponse = await ChargerAllList();
        setChargerData(chargerResponse?.data?.response?.data);
      } catch (error) {
        console.error("error in list", error);
      }
    };

    if (!chargerData) {
      fetchChargerData();
    }

    if (editChargerId && editChargerId.length > 0 && !selectedCharger) {
      const defaultChargerId = editChargerId[0].charger_id;
      const defaultCharger = chargerData?.find(
        (charger) => charger.id === defaultChargerId
      );
      setSelectedCharger(defaultCharger);
    }
  }, [editChargerId, chargerData, selectedCharger]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    if (name === "charger") {
      const selectedCharger = chargerData?.find(
        (charger) => charger.id === value
      );
      setSelectedCharger(selectedCharger);
      dispatch(
        updateConnectorSave({
          key: "charger_id",
          value: selectedCharger?.id,
        })
      );
    }
  };

  const chargerOptions = chargerData?.map((charger) => (
    <option key={charger.id} value={charger.id}>
      {charger.name}
    </option>
  ));

  const handleConnectorChange = (event) => {
    const selectedId = event.target.value;
    const selectedConnector = editChargerId.find(
      (connector) => connector.id === selectedId
    );

    setSelectedConnector(selectedId);
    dispatch(setEditConnectorData(selectedConnector));
  };

  const form = [
    {
      id: 1,
      name: "charger",
      label: "Charger",
    },
    {
      id: 2,
      name: "oem_connector_number",
      label: "OEM Connector Number",
      placeholder: "Enter OEM connector number",
      type: "text",
    },
    {
      id: 3,
      name: "connector_type",
      label: "Connector type",
      type: "number",
    },
    {
      id: 4,
      name: "tariff_rate",
      label: "Tariff Rate",
      placeholder: "Enter tariff rate",
    },
    {
      id: 5,
      name: "max_unit_hour",
      label: "Max unit per hour",
      placeholder: "Max unit per hour",
    },
    {
      id: 6,
      name: "capacity",
      label: "Capacity",
      placeholder: "Capacity",
    },
  ];

  const stationData = [
    {
      id: 2,
      title: "Hourly charge Support",
      value: "hourly_charge",
    },
    {
      id: 3,
      title: "Unit charge",
      value: "unit_charge",
    },
  ];

  return (
    <div className="border-b-2 transition duration-300">
      <div className="w-full flex justify-between py-3">
        <h2 className="text-[1.042vw] font-semibold">
          Connector Details<span className="text-[#F43F5E]">*</span>
        </h2>
        <img
          src={isVisible ? Ghost : Plus}
          alt={isVisible ? "Ghost icon" : "Plus icon"}
          onClick={toggleVisibility}
          className="cursor-pointer  hover:border hover:rounded-lg hover:bg-slate-100 w-6 h-6"
        />
      </div>

      {isVisible && (
        <div>
          <p className="text-[0.729vw] text-[#6B7280]">
            Add the connector details
          </p>

          <form>
            {editchargerDetails && (
              <div>
                <label className="text-[0.729vw] text-[#6B7280]">
                  Choose Connector <span className="text-[#F43F5E]">*</span>
                </label>
                <select
                  className="w-full border outline-none text-[#9CA3AF] pl-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
                  name="Connectors"
                  value={selectedConnector.id}
                  onChange={(event) => handleConnectorChange(event)} // Assign the onChange event handler
                >
                  {editChargerId &&
                    editChargerId.map((connector, index) => (
                      <option key={index} value={connector.id}>
                        {connector.id}
                      </option>
                    ))}
                  {/* Add a default option */}
                  <option value="" disabled selected hidden>
                    Select Connector
                  </option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-7 pb-6">
              {form.map((forms) => (
                <div key={forms?.id} className="flex flex-col gap-2">
                  <label className="text-[0.729vw] text-[#6B7280]">
                    {forms.label} <span className="text-[#F43F5E]">*</span>
                  </label>
                  {forms.name === "charger" ? (
                    <select
                      name={forms.name}
                      value={
                        selectedCharger ? selectedCharger.id : createConnectorId
                      }
                      onChange={handleSelectChange}
                      className="w-full border outline-none text-[#9CA3AF] pl-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
                    >
                      <option value="default" hidden>
                        {forms.name === "charger" && <p>Choose Charger</p>}
                        {forms.name === "oem_connector_number" && (
                          <p>Choose OEM</p>
                        )}
                      </option>
                      <option value="" disabled selected hidden>
                        Select Charger
                      </option>
                      {chargerOptions}
                    </select>
                  ) : (
                    <>
                      <InputBox
                        type="text"
                        name={forms.name}
                        value={
                          createConnectorId
                            ? createConnectorId[forms?.name]
                            : createConnectorData[forms?.name]?.id
                        }
                        onChange={(e) => {
                          handleConnector(forms.name, e.target.value);
                        }}
                        placeholder={forms.placeholder}
                      />
                      {error[forms.name] && <p>{error[forms.name]}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div>
              <p className="text-[0.729vw] text-[#6B7280] mb-4">
                Other <span className="text-[#F43F5E]">*</span>
              </p>
              <div className="flex gap-4 mb-3">
                {stationData?.map((data, index) => (
                  <div className="">
                    <div key={data.id} className="flex gap-7">
                      <div>
                        <h3 className="text-[0.800vw] font-semibold text-[#111827]">
                          {data.title}
                        </h3>
                      </div>
                      <Checkbox
                        initialItemState={!isChecked}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConnectorDetails;
