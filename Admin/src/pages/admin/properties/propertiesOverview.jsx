import React from "react";
import StationManagement from "../../../components/common/Properties/StationManagement";
import StationPerformance from "../../../components/common/Properties/StationPerformance";
import StationConnectors from "../../../components/common/Properties/StationConnectors";
import Charging from "../../../assets/Properties/charging.svg";
import Edit from "../../../assets/Properties/edit.svg";

const propertiesOverview = ({
  activeButton,
  setActiveButton,
  selectCostomer,
}) => {
  // const station_mgt = [
  //   {
  //     title: "Station Management",
  //     subtitle1: [
  //       {
  //         id: 1,
  //         title: "Location",
  //         subtitle: "Windsor Castle",
  //         para: "Bharathi Nagar",
  //         img: Edit,
  //       },
  //       {
  //         id: 2,
  //         title: "Tariff",
  //         subtitle: "Basic Tariff",
  //         para: "Bharathi Nagar",
  //         img: Edit,
  //       },
  //       {
  //         id: 3,
  //         title: "Station Type",
  //         subtitle: "Private Station",
  //         para: "Bharathi Nagar",
  //         img: Edit,
  //       },
  //     ],
  //   },
  // ];

  const station_performance = [
    {
      id: 1,
      title: "Station Performance",
      link: "This Month",
      card: [
        {
          id: 1,
          title: "Money Generated",
          price: "2700$",
          count: "10% Increase",
        },
        {
          id: 2,
          title: "Charge Sessions",
          price: "270",
          count: "10% Increase",
        },
        {
          id: 3,
          title: "Energy Delivered",
          price: "367kwh",
          count: "10% Increase",
        },
        {
          id: 4,
          title: "Station Uptime",
          price: "27",
          count: "10% Increase",
        },
      ],
    },
  ];

  const station_connectors = [
    {
      id: 1,
      title: "Station Connectors",
      number: 5,
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
      <div className="w-[22.396vw]">
        {/* {station_mgt.map((stations) => ( */}
          <StationManagement
            // key={stations.id}
            // stationData={stations}
            selectCostomer={selectCostomer}
          />
        {/* ))} */}
      </div>

      <div className="w-[29.583vw]">
        {station_performance.map((performance) => (
          <StationPerformance
            key={performance.id}
            performanceData={performance}
          />
        ))}
      </div>

      <div className="w-[32.031vw]">
        {station_connectors.map((connectors) => (
          <StationConnectors
            key={connectors.id}
            connectorsData={connectors}
            setActiveButton={setActiveButton}
            activeButton={activeButton}
          />
        ))}
      </div>
    </div>
  );
};

export default propertiesOverview;
