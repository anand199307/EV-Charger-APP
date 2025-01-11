import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EyeIcon from "../../assets/Customer/eye.svg";
import Edit from "../../assets/Table/edit.svg";
import OptionButton from "../common/OptionButton";
import PaginationButtons from "../common/PaginationButtons";
import { filterDataBySearch } from "../../components/common/Functions/searchFunctions";
import { filterDataByDateRange } from "../../components/common/Functions/dateRangeFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { ChargerView } from "../../api/PropertyApi";
import { ChargerListData } from "../../api/ChargerApi";
import { PropertyAllList } from "../../api/PropertyApi";

const ChargerIndex = ({
  searchTerm,
  selectedDateRange,
  limit,
  tableData,
  setTableData,
  setTotalPages,
  totalPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [chargerData, setChargerData] = useState([]);
  const [showChargerAddNew, setShowChargerAddNew] = useState(false);

  const propertyIdData = PropertyAllList();
  const propertyid = propertyIdData?.data?.data.map((item) => item.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await ChargerListData(currentPage, limit);
        setTableData(propertyResponse?.data?.response?.data);
        const totalCount = propertyResponse?.data?.response?.count;
        const totalPagesCount = Math.ceil(totalCount / limit);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("error in list", error);
      }
    };
    fetchData();
  }, [currentPage, limit, setTableData, setTotalPages]);

  const filteredBySearch = filterDataBySearch(tableData, searchTerm);
  const filteredByDateRange = filterDataByDateRange(
    filteredBySearch,
    selectedDateRange
  );
  const handlePreviousPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchChargerData = async (chargerId) => {
    try {
      const response = await ChargerView(chargerId);
      return response;
    } catch (error) {
      console.error("Error fetching charger data:", error);
      throw error;
    }
  };

  const handleMoreInfo = async (event, rowData) => {
    try {
      const chargerResponse = await fetchChargerData(rowData.id);
      setChargerData(chargerResponse?.data?.response?.data);
      setShowChargerAddNew(false);
      navigate(`/chargers/${rowData.id}`, {
        state: {
          chargerData: chargerResponse?.data?.response?.data,
          showChargerAddNew: false,
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const profileView = async (data) => {
    const chargerDetailsResponse = await fetchChargerData(data.id);
    navigate(`/chargers/${data.id}`, {
      state: {
        chargerDetailsData: chargerDetailsResponse?.data?.response?.data,
        showChargerAddNew: true,
        editchargerDetails: true,
      },
    });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);

    return formattedDate;
  };

  const getOnlineStatus = (lastHeartbeat) => {
    const currentTime = new Date();

    // Get the lastHeartbeat time (assuming it's a JavaScript Date object)
    const lastHeartbeatTime = new Date(lastHeartbeat);

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime.getTime() - lastHeartbeatTime.getTime();

    // Define a threshold in milliseconds (for example, 5 minutes)
    const threshold = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Check if the time difference is less than the threshold
    const isOnline = timeDifference < threshold;

    // Return the online status
    return isOnline ? "Online" : "Offline";
  };

  return (
    <div>
      <table className="w-full border rounded-lg">
        <thead className="border-b">
          <tr className="bg-gray-50 h-[8vh]  gap-2">
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Charger
            </th>
            <th className="w-2/12 text-center text text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide ">
              Property
            </th>
            <th className="w-2/12 text-center  text text-[0.833vw] leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Charger status
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Connector
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              last heartbeat
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="w-full">
          {tableData?.map((item) => (
            <tr key={item.id}>
              <td className="w-2/12 whitespace-no-wrap border-b border-gray-200 text-center">
                <div>
                  <h1 className="text-[#232D42] text-[0.833vw]">{item.name}</h1>
                  <h2 className="text-[#667085] text-[0.729vw]">{item.uuid}</h2>
                </div>
              </td>
              <td className="w-2/12 whitespace-no-wrap border-b border-gray-200 text-center">
                <div>
                  <h1 className="text-[#232D42] text-[0.833vw]">{item.name}</h1>
                </div>
              </td>
              <td className="w-2/12  whitespace-no-wrap border-b border-gray-200">
                <div className="flex justify-center">
                  <div className="flex gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={`text-[${
                        getOnlineStatus(item.lastHeartbeat) === "Online"
                          ? "0.417vw"
                          : "0.4rem"
                      }] ${
                        getOnlineStatus(item.lastHeartbeat) === "Online"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                    <p
                      className={`${
                        getOnlineStatus(item.lastHeartbeat) === "Online"
                          ? "text-green-500"
                          : "text-red-500"
                      } text-[0.833vw] font-semibold`}
                    >
                      {getOnlineStatus(item.lastHeartbeat)}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-center text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                {item.connectorCount}
              </td>
              <td className="text-center text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                <div className="text-[#232D42] text-[0.833vw]">
                  {item.lastHeartbeat !== null && (
                    <h1>{formatDate(item.lastHeartbeat)}</h1>
                  )}
                </div>
              </td>
              <td
                className={
                  "text-black text-[0.833vw] text-center whitespace-no-wrap border-b border-gray-200"
                }
              >
                <td className=" py-[1.5vw] flex justify-center whitespace-no-wrap  border-gray-200">
                  <OptionButton
                    option
                    table
                    opt
                    options={[
                      <div className="flex flex-col justify-start m-auto gap-3">
                        <div
                          className="flex gap-2"
                          onClick={(event) => handleMoreInfo(event, item)}
                        >
                          <img
                            src={EyeIcon}
                            alt="EyeIcon"
                            className="w-[1.25vw]"
                          />
                          <p className="text-[0.833vw]">More Info</p>
                        </div>
                        <Link
                          className="flex gap-2 items-center"
                          onClick={() => profileView(item)}
                        >
                          <img
                            src={Edit}
                            alt="edit"
                            className="w-[1.25vw] h-[2vh]"
                          />
                          <p className="text-[0.833vw]">Edit</p>
                        </Link>
                      </div>,
                    ]}
                  />
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full px-11 p-2 border py-[1.3vw]">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousClick={handlePreviousPage}
          onNextClick={handleNextPage}
        />
      </div>
    </div>
  );
};

export default ChargerIndex;
