import React, { useState } from "react";
import InputBox from "../common/InputBox";
import Plus from "../../assets/plus.svg";
import Ghost from "../../assets/Ghost.svg";
import StationManagement from "../common/Properties/StationManagement";
import AmentiesProperty from "./AmentiesProperty";

const AmenitiesDetails = ({ isVisible, toggleVisibility, editfform }) => {
  // const station_mgt = [
  //   {
  //     id: 1,
  //     title: "Food Court",
  //     select: "Yes",
  //   },
  //   {
  //     id: 2,
  //     title: "Free Parking",
  //     select: "Yes",
  //   },
  //   {
  //     id: 3,
  //     title: "Rest Area",
  //     select: "Yes",
  //   },
  //   {
  //     id: 4,
  //     title: "Air filter",
  //     select: "Yes",
  //   },
  //   {
  //     id: 5,
  //     title: "Wi-Fi",
  //     select: "Yes",
  //   },
  //   {
  //     id: 6,
  //     title: "Stores",
  //     select: "Yes",
  //   },
  // ];

  const station_mgt = [
    {
      subtitle2: [
        {
          title: "",
          text: [
            {
              id: 1,
              title: "Food Court",
              select: "Yes",
            },
            {
              id: 2,
              title: "Free Parking",
              select: "Yes",
            },
            {
              id: 3,
              title: "Rest Area",
              select: "Yes",
            },
            {
              id: 4,
              title: "Air filter",
              select: "Yes",
            },
            {
              id: 5,
              title: "Wi-Fi",
              select: "Yes",
            },
            {
              id: 6,
              title: "Stores",
              select: "Yes",
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="border-b-2 transition duration-300">
      <div className="w-full flex justify-between py-3">
        <h2 className="text-xl font-semibold">
          Amenities Details<span className="text-[#F43F5E]">*</span>
        </h2>
        <img
          src={isVisible ? Ghost : Plus}
          onClick={toggleVisibility}
          className="cursor-pointer hover:border hover:rounded-lg hover:bg-slate-100"
        />
      </div>

      {isVisible && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[#6B7280]">
            {editfform
              ? "Edit the location of the charger"
              : "Add the location of the charger"}
          </p>

          <form>
            <div className="w-[26.875rem]">
              {station_mgt.map((stations) => (
                <AmentiesProperty key={stations.id} stationData={stations} />
              ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AmenitiesDetails;
