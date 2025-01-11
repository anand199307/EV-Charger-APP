import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OptionButton from "../common/OptionButton";
import EyeIcon from "../../assets/Customer/eye.svg";
import Icondelete from "../../assets/Customer/trash.png";
import FoodCourt from "../../assets/Properties/food_court.svg";
import Parking from "../../assets/Properties/parking.svg";
import { City, HostAllList, HostList, Province } from "../../api/HostApi";
import { PropertyAllList } from "../../api/PropertyApi";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PropertiesView = ({ selectCostomer }) => {
  const [customerProvinceData, SetcustomerProvinceData] = useState(null);
  const [customerCityData, SetCustomerCityData] = useState(null);
  const [customerHostData, setCustomerHostData] = useState(null);
  const [propertyItem, setPropertyItem] = useState(false);

  const countryId = selectCostomer?.location?.country_id;
  const stateId = selectCostomer?.location?.province_id;
  const cityId = selectCostomer?.location?.city_id;
  const hostId = selectCostomer?.host_id;

  useEffect(() => {
    const fetchData = async () => {
      if (selectCostomer) {
        try {
          const stateResponse = await Province(countryId);
          SetcustomerProvinceData(stateResponse);
        } catch (error) {
          console.error("Error fetching state data:", error);
        }

        try {
          const cityResponse = await City(stateId);
          SetCustomerCityData(cityResponse);
        } catch (error) {
          console.error("Error fetching city data:", error);
        }

        try {
          const hostResponse = await PropertyAllList();
          setCustomerHostData(hostResponse?.data?.data);
        } catch (error) {
          console.error("error in list", error);
        }
      }
    };

    fetchData();
  }, [selectCostomer, stateId, countryId]);

  const state = customerProvinceData?.data?.find(
    (state) => state?.id === stateId
  );

  const city = customerCityData?.data?.data?.find(
    (city) => city.name === cityId
  );

  const host = customerHostData?.find((host) => host?.id === hostId);
  const navigate = useNavigate();

  const propertyProfileView = () => {
    navigate(`/properties/${selectCostomer.id}`, {
      state: { selectCostomer, propertyItem: false },
    });
  };

  const propertyProfileEdit = () => {
    navigate(`/properties/${selectCostomer.id}`, {
      state: { selectCostomer, propertyItem: true },
    });
  };

  return (
    <div key={selectCostomer?.id}>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          {selectCostomer?.img && (
            <img src={selectCostomer?.img} alt={selectCostomer?.subtitle} />
          )}
          <h2 className="text-[0.938vw] font-semibold">
            {selectCostomer?.name}
          </h2>
        </div>

        {selectCostomer && (
          <OptionButton
            key={selectCostomer?.id}
            isActive={selectCostomer?.status}
            option
            active
            options={[
              <div className="flex flex-col gap-3 justify-start m-auto">
                <div
                  onClick={propertyProfileView}
                  className="flex gap-2 items-center"
                >
                  <img src={EyeIcon} alt="EyeIcon" className="w-[1.25vw]" />
                  <p className="text-[0.833vw]">View</p>
                </div>
                <div className="flex gap-2" onClick={propertyProfileEdit}>
                  <FontAwesomeIcon icon={faPenSquare} className="w-4 h-4" />
                  <p className="text-[0.833vw]">Edit info</p>
                </div>
                <div className="flex gap-2 items-center">
                  <img
                    src={Icondelete}
                    alt="DeleteIcon"
                    className="w-[1.25vw]"
                  />
                  <p className="text-[0.833vw] text-red-700">Delete Property</p>
                </div>
              </div>,
            ]}
          />
        )}
      </div>

      <div className="py-5">
        <h2 className="text-[0.729vw] font-semibold">Details</h2>
        <ul className="flex flex-col gap-5 justify-between text-[0.729vw] text-[#6B7280] py-2">
          <li className="w-full flex justify-between">
            Property ID <span> {selectCostomer?.uuid}</span>
          </li>
          <li className="flex justify-between">
            Host <span> {host?.host_name}</span>
          </li>
          <li className="flex justify-between">
            Contact <span> {host?.phone_number}</span>
          </li>
          <li className="flex justify-between">
            Property Pincode
            <span> {selectCostomer?.location?.postal_index_code}</span>
          </li>
          <li className="flex justify-between">
            City <span> {city?.name}</span>
          </li>
          <li className="flex justify-between">
            State <span> {state?.name}</span>
          </li>
        </ul>
      </div>

      <div className="">
        <h2 className="text-[0.729vw] font-semibold">Amentities</h2>
        <ul className="flex flex-col gap-5 text-[0.729vw] text-[#6B7280] py-2">
          <li className="flex gap-5">
            <div className="border rounded-lg p-0.5">
              <img
                src={FoodCourt}
                alt="contents"
                className="rounded-lg bg-[#F3F4F6] p-1.5 border w-[1.975vw]"
              />
            </div>
            <h4 className="flex items-center">
              {selectCostomer?.propertyAmentities1}
            </h4>
          </li>
          <li className="flex gap-5">
            <div className="border rounded-lg p-0.5">
              <img
                src={Parking}
                alt="contents"
                className="rounded-lg bg-[#F3F4F6] p-1.5 border w-[1.975vw]"
              />
            </div>
            <h4 className="flex items-center">
              {selectCostomer?.propertyAmentities2}
            </h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertiesView;
