import React, { useState } from "react";
import Header from "../../../components/common/Header";
import ChargerTable from "./ChargerTable";
import X from "../../../assets/x.svg";

const Chargers = () => {
  const [ischargerActive, setChargerActive] = useState(false);

  return (
    <>
      {!ischargerActive ? (
        <div>
          <Header title="Chargers" />
        </div>
      ) : (
        <div className="py-4 px-5 border-b-2">
          <img
            src={X}
            onClick={() => {
              setChargerActive(false);
            }}
            className="cursor-pointer border rounded-lg p-1"
          />
        </div>
      )}

      <div>
        <ChargerTable
          ischargerActive={ischargerActive}
          setChargerActive={setChargerActive}
        />
      </div>
    </>
  );
};

export default Chargers;
