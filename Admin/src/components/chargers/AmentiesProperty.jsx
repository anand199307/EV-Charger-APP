import React, { useState } from "react";
import Checkbox from "../common/CheckBox";

const AmentiesProperty = ({ stationData }) => {
  const [itemStates, setItemStates] = useState(
    stationData?.subtitle2[0]?.text.map(() => false)
  );

  const handleCheckboxChange = (index, newState) => {
    setItemStates((prevItemStates) => {
      const updatedItemStates = [...prevItemStates];
      updatedItemStates[index] = newState;
      return updatedItemStates;
    });
  };

  return (
    <div>
      <div>
        {stationData?.subtitle2.map((data) => (
          <div key={data.id}>
            <div className="gap-4 grid grid-cols-2 p-4">
              {data.text.map((text, index) => (
                <div key={text.id} className="flex justify-between">
                  <div>
                    <h3 className="text-xs font-medium">{text.title}</h3>
                    <p className="text-xs font-medium text-[#6B7280]">
                      {itemStates[index] ? "Yes" : "No"}
                    </p>
                  </div>

                  <Checkbox
                    index={index}
                    initialItemState={false}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmentiesProperty;
