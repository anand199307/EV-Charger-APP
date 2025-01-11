import React, { useEffect, useState } from "react";
import InputBox from "../InputBox";
import Checkbox from "../CheckBox";
import { Amenitieslist } from "../../../api/PropertyApi";
import Edit from "../../../assets/Properties/edit.svg";

const StationManagement = ({ stationData, selectCostomer }) => {
  const [editModes, setEditModes] = useState({});
  const [editedTexts, setEditedTexts] = useState({});

  const locationDetails = selectCostomer?.location?.address_line1;

  // const [itemStates, setItemStates] = useState(
  //   stationData.subtitle2[0]?.text.map(() => false)
  // );

  // Initialize editModes and editedTexts with ids on initial render
  // useState(() => {
  //   const initialEditModes = {};
  //   const initialEditedTexts = {};
  //   stationData.subtitle1.forEach((data) => {
  //     initialEditModes[data.id] = false;
  //     initialEditedTexts[data.id] = data.subtitle;
  //   });
  //   setEditModes(initialEditModes);
  //   setEditedTexts(initialEditedTexts);
  // });

  // const handleCheckboxChange = (index, newState) => {
  //   setItemStates((prevItemStates) => {
  //     const updatedItemStates = [...prevItemStates];
  //     updatedItemStates[index] = newState;
  //     return updatedItemStates;
  //   });
  // };

  const handleEditClick = (id) => {
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [id]: !prevEditModes[id],
    }));
  };

  const handleInputChange = (e, id) => {
    const newValue = e.target.value;
    setEditedTexts((prevEditedTexts) => ({
      ...prevEditedTexts,
      [id]: newValue,
    }));
  };

  const [selectedAmenities, setSelectedAmenities] = useState("");
  const [amenitieslistData, setamenitieslistData] = useState(null);

  const handleInputChangeAmenities = (e) => {
    const selectAmenities = e.target.value;
    setSelectedAmenities(selectAmenities);
  };

  useEffect(() => {
    const fetchAmenitiesData = async () => {
      try {
        const AmenitiesResponse = await Amenitieslist();
        setamenitieslistData(AmenitiesResponse?.data?.response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAmenitiesData();
  }, []);

  return (
    <div>
      <h2 className="text-[1.25vw] font-semibold pb-6">Station Management</h2>
      <div className="flex flex-col gap-4">
        {/* {stationData?.subtitle1.map((data) => ( */}
        <div>
          <h4 className="text-[0.625vw] pb-1">
            {selectCostomer?.location.city_id}
          </h4>
          <div className="flex justify-between">
            <div>
              <h2 className="text-[0.833vw] font-medium text-[#000]">
                {selectCostomer.name}
              </h2>
              <p className="text-[0.625vw] text-[#6B7280]">
                {editModes[selectCostomer.id] ? (
                  <InputBox
                    type="text"
                    value={editedTexts[selectCostomer.id]}
                    onChange={(e) => handleInputChange(e, selectCostomer.id)}
                  />
                ) : (
                  locationDetails
                )}
              </p>
            </div>
            <button>
              <img
                src={Edit}
                alt="edit"
                onClick={() => handleEditClick(selectCostomer.id)}
                className="w-[0.729vw]"
              />
            </button>
          </div>
        </div>
        {/* ))} */}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <h1 className="text-[1.25vw] font-semibold">Station Amenities</h1>
        <select
          className="w-full border outline-none text-[#9CA3AF] pl-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
          name="amenities"
          value={selectedAmenities.id}
          onChange={(e) => handleInputChangeAmenities(e)}
        >
          <option selected disabled hidden>
            Select Amenities List
          </option>
          {amenitieslistData &&
            amenitieslistData.map((amenity, index) => (
              <option key={index} value={amenity.name}>
                {amenity.name}
              </option>
            ))}
        </select>
        {/* {stationData?.subtitle2.map((data) => (
          <div key={data.id}>
            <h3 className="text-[1.25vw] font-semibold py-5">{data.title}</h3>
            <div className="flex flex-col gap-4">
              {data.text.map((text, index) => (
                <div key={text.id} className="flex justify-between">
                  <div>
                    <h3 className="text-[0.625vw] font-medium">{text.title}</h3>
                    <p className="text-[0.625vw] font-medium text-[#6B7280]">
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
        ))} */}
      </div>
    </div>
  );
};

export default StationManagement;

/* <div  
                    className={`w-8 h-[1.125rem] rounded-full relative cursor-pointer ${
                      itemStates[index] ? "bg-[#8CC63F]" : "bg-[#8A92A6]"
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <div
                      className={`absolute w-2 h-2 border rounded-full bg-white ${
                        itemStates[index]
                          ? "left-[1.25rem] top-1"
                          : "left-1 top-1"
                      }`}
                    ></div>
                  </div> */

//  const handleClick = (index) => {
//    const updatedItemStates = [...itemStates];
//    updatedItemStates[index] = !updatedItemStates[index];
//    setItemStates(updatedItemStates);
//  };
