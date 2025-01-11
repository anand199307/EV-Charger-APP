import React, { useEffect, useState } from "react";
import Delete from "../../assets/Table/Button.svg";
import PaginationButtons from "./PaginationButtons";
import {
  normalizeSearchTerm,
  filterDataBySearch,
} from "../../components/common/Functions/searchFunctions";
import { useDispatch } from "react-redux";
import {
  editHost,
  updateSave,
  updateSaveDetails,
} from "../../store/slices/HostSlice";
import { City, Country, HostList, HostView, Province } from "../../api/HostApi";
import { Link } from "react-router-dom";
import OptionButton from "./OptionButton";
import { CustomerList } from "../../api/ChargerApi";

const Table = (props) => {
  const [selectAll, setSelectAll] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [customerCityData, SetCustomerCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleRowClick = async (event, rowData) => {
    dispatch(updateSaveDetails(rowData));
    try {
      props.setSelectCostomer(rowData);
    } catch (error) {
      console.error("Error calling HostView API:", error);
    }
  };

  const handlePreviousPage = (newPage) => {
    props.setCurrentPage(newPage);
  };

  const handleNextPage = (newPage) => {
    props.setCurrentPage(newPage);
  };

  const slicedData = filterDataBySearch(props.tableData, props.searchTerm);

  const handleCheckboxChange = (rowId) => {
    const updatedSelectedRows = [...props.selectedRows];
    const rowIdIndex = updatedSelectedRows.indexOf(rowId);

    if (rowIdIndex !== -1) {
      updatedSelectedRows.splice(rowIdIndex, 1);
    } else {
      updatedSelectedRows.push(rowId);
    }

    props.setSelectedRows(updatedSelectedRows);

    const allRowIds = props.tableData?.map((row) => row?.id);
    setSelectAll(updatedSelectedRows?.length === allRowIds?.length);
  };

  //checkbox select
  const handleHeaderCheckboxChange = () => {
    if (!selectAll) {
      const allRowIds = props.tableData?.map((row) => row?.id);
      props.setSelectedRows(allRowIds);
      setSelectAll(true);
    } else {
      props.setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const isRowSelected = (rowId) => {
    const selectedRows = props.selectedRows || [];
    return selectedRows.some((selectedRowId) => selectedRowId === rowId);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!props.tableData) return;
      const provinceIds = props.tableData.map(
        (item) => item?.location?.province_id
      );

      try {
        const cityPromises = provinceIds.map(async (provinceId) => {
          try {
            const cityResponse = await City(provinceId);
            return cityResponse;
          } catch (error) {
            console.error(
              "Error fetching city data for province ID:",
              provinceId,
              error
            );
            throw error;
          }
        });

        const cityResponses = await Promise.all(cityPromises);
        SetCustomerCityData(cityResponses);
      } catch (error) {
        console.error("Error fetching city data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.tableData]);

  return (
    <div>
      {loading ? (
        <p className="text-[0.833vw]">Loading...</p>
      ) : (
        <>
          <table className="w-[53vw] border-collapse border rounded-lg overflow-x-scroll">
            <thead>
              <tr>
                {props?.columns?.map((column) => (
                  <th
                    key={column.key}
                    className={`text-[#8A92A6] uppercase font-medium text-[0.625vw] py-[0.625vw] ${
                      column.key === "name" && "px-16"
                    } ${column.key === "selected" && "w-[1.042vw]"}`}
                  >
                    {column.key === "selected" && column.checkbox ? (
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded-md h-5 w-[1.042vw]"
                          checked={selectAll}
                          onChange={handleHeaderCheckboxChange}
                        />
                      </label>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="w-[80%]">
              {slicedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={props.columns.length}
                    className="text-center py-4"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                slicedData.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className="border"
                      onClick={(event) => handleRowClick(event, row)}
                    >
                      {props.columns.map((column) => (
                        <td
                          key={column.key}
                          className={`text-center text-[0.833vw] py-[0.625vw] px-2 ${
                            column.key === "name" && "w-[30%]"
                          }`}
                          actions-column={column.key === "Actions"}
                        >
                          {column.key === "selected" && column.checkbox ? (
                            // Checkbox input
                            <input
                              type="checkbox"
                              checked={isRowSelected(row?.id)}
                              onChange={() => handleCheckboxChange(row?.id)}
                              className="rounded-md h-5 w-[1.042vw] mx-5"
                            />
                          ) : column.key === "user_vehicle" ? (
                            // Display user vehicle details
                            <div>
                              {row.user_vehicle.map((vehicle, index) => (
                                <div key={index}>
                                  <p> {vehicle.vehicle.car_model}</p>
                                </div>
                              ))}
                            </div>
                          ) : column.key === "name" ? (
                            // Name column
                            <div className="flex gap-3 justify-center">
                              <div>
                                <p>
                                  {props?.properties
                                    ? row?.name
                                    : row?.host_name}
                                  {props?.customers
                                    ? row.first_name + " " + row.last_name
                                    : ""}
                                </p>
                                <p className=" text-[#667085]">
                                  {props.properties ? row?.uuid : row?.uuid}
                                </p>
                              </div>
                            </div>
                          ) : column.key === "delete" ? (
                            // Delete button
                            <button
                              className="pl-5"
                              onClick={() => props.handleDeleteRow(row.id)}
                            >
                              <img
                                src={Delete}
                                alt="delete"
                                className="w-[2.083vw] h-10"
                              />
                            </button>
                          ) : column.key === "Properties" ? (
                            // Properties count
                            <div>{row.propertiesCount}</div>
                          ) : column.key === "email" ? (
                            // Email
                            <div>{row.email}</div>
                          ) : column.key === "wallet_amount" ? (
                            // Wallet amount
                            <div>{row.wallet_amount}</div>
                          ) : column.key === "phone_number" ? (
                            // Phone number
                            <div>{row.phone_number}</div>
                          ) : column.key === "Chargers" ? (
                            // Chargers
                            <div>Chargers</div>
                          ) : column.key === "City" ? (
                            // City
                            <div>
                              {
                                customerCityData
                                  ?.find((datas) =>
                                    datas?.data?.data?.find(
                                      (city) =>
                                        city.id === row?.location?.city_id
                                    )
                                  )
                                  ?.data?.data?.find(
                                    (city) => city.id === row?.location?.city_id
                                  )?.name
                              }
                            </div>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div className="w-[53vw] px-11 border p-2">
            <PaginationButtons
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}
              totalPages={props.totalPages}
              onPreviousClick={handlePreviousPage}
              onNextClick={handleNextPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
