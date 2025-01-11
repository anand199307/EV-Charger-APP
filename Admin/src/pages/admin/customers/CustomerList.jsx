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

const CustomerList = ({
  searchTerm,
  selectedDateRange,
  limit,
  tableData,
  setTableData,
  setTotalPages,
  totalPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await CustomerList();
        setTableData(customerResponse?.data?.users);
        const totalCount = customerResponse?.data?.total;
        const totalPagesCount = Math.ceil(totalCount / limit);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("error in list", error);
      }
    };

    fetchData();
  }, [currentPage, limit]);

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
                  {/* <div className="flex gap-1 items-center">
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
                  </div> */}
                </div>
              </td>
              <td className="text-center text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                {item.connectorCount}
              </td>
              <td className="text-center text-[0.833vw] text-black whitespace-no-wrap border-b border-gray-200">
                <div className="text-[#232D42] text-[0.833vw]"></div>
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
                        <div className="flex gap-2">
                          <img
                            src={EyeIcon}
                            alt="EyeIcon"
                            className="w-[1.25vw]"
                          />
                          <p className="text-[0.833vw]">More Info</p>
                        </div>
                        <Link className="flex gap-2 items-center">
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

export default CustomerList;
