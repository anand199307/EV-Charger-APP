import React, { useState } from "react";
import PropertyDetails from "../host/PropertyDetails";
import LocationDetails from "../../../components/chargers/LocationDetails";
import Button from "../../../components/common/Button";
import AmenitiesDetails from "../../../components/chargers/AmenitiesDetails";

const PropertyAddnewForm = ({ selectCostomer }) => {
  const [chargerDetailsVisible, setChargerDetailsVisible] = useState(true);
  const [locationDetailsVisible, setLocationDetailsVisible] = useState(false);
  const [connectorDetailsVisible, setConnectorDetailsVisible] = useState(false);
  console.log(selectCostomer);

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

  const handleAmentiesDetailsToggle = () => {
    setLocationDetailsVisible(!locationDetailsVisible);
    setChargerDetailsVisible(false);
    setConnectorDetailsVisible(false);
  };

  return (
    <div className="flex justify-center items-center w-[50%] gap-2 m-auto">
      <div className="w-full">
        <h2 className="text-[1.25vw] font-semibold py-7">Add Property</h2>
        <div className="my-3">
          <PropertyDetails
            isVisible={chargerDetailsVisible}
            toggleVisibility={handleChargerDetailsToggle}
          />

          <LocationDetails
            isVisible={locationDetailsVisible}
            toggleVisibility={handleLocationDetailsToggle}
          />

          {/* <AmenitiesDetails
            isVisible={locationDetailsVisible}
            toggleVisibility={handleAmentiesDetailsToggle}
          /> */}
        </div>
        <Button
          backgroundColor="#8CC63F"
          content="Create Property"
          width="10.417vw"
          searchicon={true}
          radius="0.25rem"
          color="white"
          font="0.833vw"
        />
      </div>
    </div>
  );
};

export default PropertyAddnewForm;
