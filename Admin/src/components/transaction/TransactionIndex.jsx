import React, { useEffect, useState } from "react";
import PaginationButtons from "../common/PaginationButtons";
import { Link } from "react-router-dom";
import OptionButton from "../common/OptionButton";
import eyeIcon from "../../assets/Transaction/eye.svg";
import downloadIcon from "../../assets/Transaction/downloadicon.svg";
import instantIcon from "../../assets/Transaction/instantIcon.svg";
import stopIcon from "../../assets/Transaction/stopicon.svg";
import stoprefund from "../../assets/Transaction/stoprefundicon.svg";
import profileIcon from "../../assets/Transaction/Avatar.svg";
import { useSelector } from "react-redux";
import frameIcon from "../../assets/Transaction/Frame.svg";
import "../common/modal/Modal.css";
import {
  normalizeSearchTerm,
  filterDataBySearch,
} from "../../components/common/Functions/searchFunctions";
import { filterDataByDateRange } from "../../components/common/Functions/dateRangeFunctions";
import Modal from "../common/modal/Modal";
import { TranscationList } from "../../api/ChargerApi";

const TransactionIndex = ({
  searchTerm,
  selectedDateRange,
  limit,
  tableData,
  setTableData,
  setTotalPages,
  totalPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalshow, setModalShow] = useState(false);
  const data = useSelector((state) => state.tableCart.dataTable);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await TranscationList();
        setTableData(propertyResponse?.data?.chargingSessions);
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
  const rfidhandle = () => {
    setModalShow(true);
  };

  const handleModal = () => {
    setModalShow(false);
  };

  const calculateTimeDifference = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const differenceMs = end - start;
    const minutes = Math.floor(differenceMs / (1000 * 60));
    const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);
    return `${minutes} minutes ${seconds} seconds`;
  };

  return (
    <div>
      <table className="w-[100%] border rounded-lg">
        <thead className="border-b">
          <tr className="bg-gray-50 h-[8vh] gap-2">
            <th className="w-1/12 text-[0.833vw] text-left leading-4  text-[#8A92A6] uppercase tracking-wider px-3">
              Transaction ID
            </th>
            <th className="w-1/12 text-[0.833vw] text-center  text-[#8A92A6] uppercase tracking-wider px-2">
              Property
            </th>
            <th className="w-1/12 text-[0.833vw] text-center leading-4  text-[#8A92A6] uppercase tracking-wider px-3">
              Charger
            </th>
            <th className="w-1/12  text-[0.833vw] text-center leading-4  text-[#8A92A6] uppercase tracking-wider px-6">
              Total Consumptions
            </th>
            <th className="w-1/12 text-[0.833vw] text-center leading-4  text-[#8A92A6] uppercase tracking-wider px-2">
              Duration
            </th>
            {/* <th className="w-1/12  text-[0.833vw] text-center leading-4  text-[#8A92A6] uppercase tracking-wider">
              Status
            </th> */}
            <th className="w-1/12 text-[0.833vw] text-center leading-4  text-[#8A92A6] uppercase tracking-wider">
              Refund Amount
            </th>
            {/* <th className="w-1/12  text-[0.833vw] text-center leading-4  text-[#8A92A6] uppercase tracking-wider">
              Actions
            </th> */}
          </tr>
        </thead>

        <tbody className="w-full ">
          {tableData?.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-no-wrap border-b border-gray-200 w-3/12 p-[1.2vw]">
                <h2 className="text-[0.833vw] text-[#232D42] mb-1">
                  {item.transactionId}
                </h2>
                <h2 className="text-[0.833vw] text-[#232D42] mb-1">
                  {item.user.uuid}
                </h2>
                <div className="flex gap-3 mb-1">
                  <div className="flex gap-2">
                    <img src={profileIcon} alt="profileIcon" />
                    <p className="text-[#232D42] text-[0.521vw]">
                      {item.user.first_name} {item.user.last_names}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <img src={profileIcon} alt="profileIcon" />
                    <p className="text-[#232D42] text-[0.521vw]">
                      {item.wallet}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-[0.833vw] w-2/12 whitespace-no-wrap border-b border-gray-200 px-[0.5vw] text-center ">
                {item.charger.property.name}
              </td>
              <td
                className={
                  "text-[#232D42] text-[0.833vw] w-2/12  whitespace-no-wrap border-b border-gray-200 px-[1vw] text-center"
                }
              >
                {item.charger.name}
              </td>
              <td
                className={
                  "text-[#232D42] text-[0.833vw] w-2/12  whitespace-no-wrap border-b border-gray-200 px-[1vw] text-center"
                }
              >
                <p>{item.meterStop - item.meterStart}</p>
                <p>{item.limitType}</p>
              </td>

              <td className="text-[#232D42] text-[0.833vw] w-2/12 whitespace-no-wrap border-b border-gray-200 px-[0.5vw] text-center">
                <p>{calculateTimeDifference(item.startTime, item.endTime)}</p>
              </td>
              <td className="text-[#232D42] text-[0.833vw] w-1/12 whitespace-no-wrap border-b border-gray-200 px-[0.5vw] text-center">
                <h1> {item.refund}</h1>
              </td>
              <td className="text-center whitespace-no-wrap text-white uppercase border-b border-gray-200 ">
                <div
                  className={`p-1 text-[0.833vw] rounded-sm ${
                    item.status1 === "Completed"
                      ? "bg-[#8CC63F]"
                      : item.status1 === "Initiated"
                      ? "bg-[#546FFF]"
                      : item.status1 === "Interrupted"
                      ? "bg-[#F16A1B]"
                      : item.status1 === "Suspended"
                      ? "bg-yellow-500"
                      : item.status1 === "Cancelled"
                      ? "bg-[#C03221]"
                      : ""
                  }`}
                >
                  {item.status1}
                </div>
              </td>
              {/* <td className="text-[#232D42] text-[0.833vw] w-1/12 whitespace-no-wrap border-b border-gray-200 text-center">
                {item.title2 === "Amentities" ? (
                  <div className="">
                    {item.title2}
                    <div className="flex gap-2 mt-1 cursor-pointer justify-center">
                      <p>(Rs 100)</p>
                      <img
                        className="cursor-pointer"
                        src={frameIcon}
                        alt="frameIcon"
                        onClick={rfidhandle}
                      />
                    </div>
                  </div>
                ) : (
                  <p>-</p>
                )}
              </td> */}
              {/* <td
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
                        <Link className="flex gap-2 items-center">
                          <img
                            src={eyeIcon}
                            alt="eyeIcon"
                            className="w-[1.25vw]"
                          />

                          <p className="text-[0.833vw]">View Transaction</p>
                        </Link>
                        <Link className="flex gap-2 items-center">
                          <img
                            src={stopIcon}
                            alt="stopIcon"
                            className="w-[1.25vw]"
                          />
                          <p className="text-[0.833vw]">Stop Transaction</p>
                        </Link>
                        <Link className="flex gap-2">
                          <img
                            src={downloadIcon}
                            alt="downloadIcon"
                            className="w-[1.25vw]"
                          />

                          <p className="text-[0.8vw]">Download Invoice</p>
                        </Link>
                        <Link className="flex gap-2">
                          <img
                            src={instantIcon}
                            alt="instantIcon"
                            className="w-[1.25vw]"
                          />

                          <p className="text-[0.833vw]">Instant Refund</p>
                        </Link>
                        <Link className="flex gap-2">
                          <img
                            src={stoprefund}
                            alt="edit"
                            className="w-[1.25vw]"
                          />
                          <p className="text-[0.833vw]">Stop Refund</p>
                        </Link>
                      </div>,
                    ]}
                  />
                </td>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full px-[2vw] p-[0.3vw] border py-[1.2vw]">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousClick={handlePreviousPage}
          onNextClick={handleNextPage}
        />
      </div>
      <div>
        {modalshow && (
          <Modal modalshow={modalshow} setModalShow={setModalShow}>
            <span className="close1" onClick={handleModal}>
              &times;
            </span>
            <div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-black text-[0.833vw] font-normal">
                    Selected Mode: <span>UNIT</span>
                  </h1>
                  <h1 className="text-[0.833vw] font-normal text-black">
                    Tariff Rate: <span>Rs.25/Unit</span>
                  </h1>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h1 className="text-[#6B7280] text-[0.729vw]">
                    Target Units:
                  </h1>
                  <p className="text-[#6B7280] text-[0.729vw]">12 Units</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-[#6B7280] text-[0.729vw]">
                    Units Consumed:
                  </h1>
                  <p className="text-[#6B7280] text-[0.729vw]">12 Units</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h1 className="text-[#6B7280] text-[0.729vw]">
                    Credits Used:
                  </h1>
                  <p className="text-[#6B7280] text-[0.729vw]">300.00</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-[#6B7280] text-[0.729vw]">
                    Credits Charged:
                  </h1>
                  <p className="text-[#6B7280] text-[0.729vw]">158.85</p>
                </div>
              </div>
              <hr className="mt-3" />
              <div
                className="h-[80px] w-[30vw] flex justify-between relative items-center right-6 top-5  px-6"
                style={{
                  background: " rgba(249, 212, 20, 0.10)",
                }}
              >
                <h1 className="text-[#6B7280] text-[0.729vw]">
                  Refund Credits:
                </h1>
                <p className="text-[#6B7280] text-[0.729vw]">141.15</p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TransactionIndex;
