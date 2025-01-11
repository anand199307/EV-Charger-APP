import React, { useEffect, useState } from "react";
import LocationDetails from "../../../components/chargers/LocationDetails";
import PropertyDetails from "./PropertyDetails";
import Button from "../../../components/common/Button";
import { useDispatch } from "react-redux";
import {
  createProperty,
  updatePropertySave,
} from "../../../store/slices/HostSlice";

const PropertyAddForm = ({
  editfform,
  propertySave,
  onChange,
  host,
  setModalShow,
  selectCostomer,
}) => {
  const [chargerDetailsVisible, setChargerDetailsVisible] = useState(true);
  const [locationDetailsVisible, setLocationDetailsVisible] = useState(false);
  const [connectorDetailsVisible, setConnectorDetailsVisible] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(updatePropertySave({ key: "host_id", value: selectCostomer?.id }));
  }, [selectCostomer]);

  const handleProperty = () => {
    dispatch(createProperty({ ...propertySave }));
    setModalShow(false);
  };

  return (
    <div className="flex justify-center items-center w-[100%]">
      <div className="w-full">
        <h2 className="text-[1.25vw] font-semibold pt-7">
          {editfform ? "Edit Chargers" : "Add Property"}
        </h2>
        <p className="text-[#9CA3AF] text-[0.729vw] font-normal pb-2">
          Enter the Valid Property Details as per the Documents You Provided
        </p>
        <div>
          {host ? (
            <PropertyDetails
              isVisible={chargerDetailsVisible}
              toggleVisibility={handleChargerDetailsToggle}
              propertySave={propertySave}
              onChange={onChange}
              host
            />
          ) : (
            <PropertyDetails
              isVisible={chargerDetailsVisible}
              toggleVisibility={handleChargerDetailsToggle}
              propertySave={propertySave}
              onChange={onChange}
            />
          )}

          <LocationDetails
            isVisible={locationDetailsVisible}
            toggleVisibility={handleLocationDetailsToggle}
            propertySave={propertySave}
            onChange={onChange}
          />

          <div className="mt-5">
            <Button
              backgroundColor="#8CC63F"
              content="Create Property"
              width="100%"
              searchicon={true}
              radius="0.25rem"
              color="white"
              font="0.833vw"
              onClick={handleProperty}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAddForm;
