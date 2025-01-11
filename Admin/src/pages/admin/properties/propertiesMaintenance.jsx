import React from "react";
import StationConnectors from "../../../components/common/Properties/StationConnectors";
import Charging from "../../../assets/Properties/charging.svg";
import Charger from "../../../components/common/Properties/Charger";

const PropertiesMaintenance = () => {
  const station_connectors = [
    {
      id: 1,
      title: "Components",
      text: [
        {
          id: 1,
          img: Charging,
          title: "EVSE One",
          subtitle: "Charging",
          textarea: "200kW Used | Chotta Bheem",
        },
        {
          id: 2,
          img: Charging,
          title: "EVSE Two",
          subtitle: "Available",
          textarea: "200kW Used | Bheem",
        },
        {
          id: 3,
          img: Charging,
          title: "EVSE Three",
          subtitle: "Charging",
          textarea: "200kW Used | Dora",
        },
        {
          id: 4,
          img: Charging,
          title: "EVSE Four",
          subtitle: "Charging",
          textarea: "200kW Used | Tom & Jerry",
        },
        {
          id: 5,
          img: Charging,
          title: "EVSE Five",
          subtitle: "Error",
          textarea: "200kW Used | Tom & Jerry",
        },
      ],
    },
  ];

  return (
    <div className="flex w-[100%] mt-[3.333vw] gap-20">
      <div className="w-[26vw]">
        {station_connectors.map((connectors) => (
          <StationConnectors
            key={connectors.id}
            connectorsData={connectors}
            arrow
          />
        ))}
      </div>
      <div className="">
        <Charger />
      </div>
    </div>
  );
};

export default PropertiesMaintenance;
